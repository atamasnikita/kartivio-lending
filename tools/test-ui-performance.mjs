import assert from 'node:assert/strict';
import {mkdir} from 'node:fs/promises';
import {chromium, webkit} from 'playwright';
import {createPerformanceFixture} from './ui-performance-fixture.mjs';

const screenshots = '/tmp/kartivio-ui-performance';
await mkdir(screenshots, {recursive: true});
const {server, fixture} = createPerformanceFixture();
await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
const origin = `http://127.0.0.1:${server.address().port}`;
const countRequests = (path, method) => fixture.requests.filter(item => item.path === path && (!method || item.method === method)).length;

async function waitScreen(page, name) {
  await page.waitForFunction(name => document.querySelector(`[data-screen="${name}"]`).classList.contains('screen-active'), name);
  await page.locator(`[data-screen="${name}"]`).evaluate(element => Promise.all(element.getAnimations().map(animation => animation.finished)));
}

async function testRuntime(browser, name, viewport) {
  fixture.requests.length = 0;
  for (const item of fixture.items) {item.likes_count = 0; item.liked_by_me = false;}
  const page = await browser.newPage({viewport, deviceScaleFactor: name.includes('mobile') ? 2 : 1});
  const errors = [];
  page.on('pageerror', error => errors.push(String(error)));
  await page.route('**/*', route => {
    const url = new URL(route.request().url());
    return url.origin === origin || url.protocol === 'data:' ? route.continue() : route.abort();
  });
  await page.goto(origin + '/app/');
  await page.waitForFunction(() => document.querySelector('#bootSplash.is-hidden') && document.querySelector('#templatesGrid [data-template-id]'))
    .catch(async error => {
      await page.screenshot({path: `${screenshots}/${name}-failure.png`});
      console.log({errors, requests: fixture.requests});
      throw error;
    });
  assert.equal(countRequests('/v1/plans'), 1, 'Cookie hydration loads plans twice');
  assert.equal(countRequests('/v1/templates'), 1, 'Cookie hydration loads the catalog twice');
  await page.evaluate(() => showTemplateShowcase());
  const sections = page.locator('#templatesGrid [data-template-filter]');
  assert.equal(await sections.count(), 13, 'Deferred categories disappeared');
  assert.ok(await page.locator('#templatesGrid [data-template-id]').count() < 120, 'All rows rendered at startup');
  await page.waitForFunction(() => {
    const images = [...document.querySelectorAll('#templatesGrid [data-template-id] img')].slice(0, 4);
    return images.length === 4 && images.every(image => image.complete && image.naturalWidth > 0);
  });
  const image = page.locator('#templatesGrid img').first();
  assert.ok((await image.getAttribute('srcset')).includes('480w'), 'Responsive previews are missing');
  assert.ok((await image.evaluate(element => element.currentSrc)).endsWith('.webp'), 'Browser chose a full JPEG instead of a variant');
  await page.screenshot({path: `${screenshots}/${name}-feed.png`});

  await page.evaluate(() => {window.__firstCard = document.querySelector('#templatesGrid [data-template-id]'); window.__firstImage = window.__firstCard.querySelector('img');});
  const firstCard = page.locator('#templatesGrid [data-template-id]').first();
  const id = await firstCard.getAttribute('data-template-id');
  const button = firstCard.locator('[data-action="toggle-like"]');
  const beforeFull = fixture.requests.filter(item => item.path.includes('_full.')).length;
  const beforeLikes = countRequests(`/v1/templates/${id}/like`);
  await button.click();
  await page.waitForFunction(id => document.querySelector(`[data-template-id="${id}"] [aria-pressed="true"]`), id);
  assert.equal(countRequests(`/v1/templates/${id}/like`), beforeLikes + 1);
  assert.equal(fixture.requests.filter(item => item.path.includes('_full.')).length, beforeFull, 'Like preloads the full image');
  assert.ok(await page.evaluate(() => window.__firstImage === document.querySelector('#templatesGrid img')), 'Like replaced an existing image');
  assert.equal(await page.locator('#templatesGrid [data-template-filter="favorites"] [data-template-id]').count(), 1);
  await page.waitForFunction(id => !document.querySelector(`[data-template-id="${id}"] button`).disabled, id);
  await button.press('Enter');
  await page.waitForFunction(id => document.querySelector(`[data-template-id="${id}"] [aria-pressed="false"]`), id);
  assert.equal(await page.locator('#templatesGrid [data-template-filter="favorites"]').count(), 0);
  assert.equal(await page.locator('#templateModal').evaluate(element => element.classList.contains('is-visible')), false, 'Keyboard like opened the template');
  fixture.failLike = true;
  await button.click();
  await page.waitForFunction(id => !document.querySelector(`[data-template-id="${id}"] button`).disabled, id);
  assert.equal(await button.getAttribute('aria-pressed'), 'false', 'Failed like corrupted local state');
  await page.evaluate(async id => {
    await Promise.all([toggleTemplateLike(id, true), toggleTemplateLike(id, true)]);
  }, id);
  assert.equal(countRequests(`/v1/templates/${id}/like`), beforeLikes + 4, 'Duplicate like requests were not deduplicated');
  let releaseDetail, detailCaptured;
  const captured = new Promise(resolve => {detailCaptured = resolve;});
  const released = new Promise(resolve => {releaseDetail = resolve;});
  await page.route(`${origin}/v1/templates/${id}`, async route => {
    const response = await route.fetch();
    const json = await response.json();
    detailCaptured();
    await released;
    await route.fulfill({json});
  });
  await page.evaluate(id => {window.__delayedDetail = loadTemplateDetail(id);}, id);
  await captured;
  await page.evaluate(id => toggleTemplateLike(id, false), id);
  releaseDetail();
  await page.evaluate(() => window.__delayedDetail);
  assert.equal(await button.getAttribute('aria-pressed'), 'false', 'A stale detail response restored a removed like');
  await page.unroute(`${origin}/v1/templates/${id}`);
  const modalSwitch = await page.evaluate(async id => {
    const current = state.templates.find(item => item.id === id);
    const other = state.templates.find(item => item.id !== id);
    openTemplateModal(current);
    const pending = toggleTemplateLike(id, true);
    openTemplateModal(other);
    const initiallyEnabled = !templateLikeButton.disabled;
    await pending;
    const finallyEnabled = !templateLikeButton.disabled;
    closeTemplateModal();
    return initiallyEnabled && finallyEnabled;
  }, id);
  assert.ok(modalSwitch, 'A pending like locks a different template modal');
  await firstCard.press('Enter');
  await page.waitForFunction(() => document.querySelector('#templateModal').classList.contains('is-visible'));
  assert.ok(fixture.requests.some(item => item.path.includes('_full.')), 'Full image does not load when opening the template');
  await page.waitForFunction(() => {
    const image = document.querySelector('#templateModalMediaSlot img');
    return image && image.currentSrc.includes('_full.') && image.complete && image.naturalWidth > 0;
  });
  await page.evaluate(() => closeTemplateModal());

  fixture.mediaDelay = 120;
  const initialModalSource = await page.evaluate(() => {
    openTemplateModal(state.templates.find(item => item.id === '20261012-template-119'));
    return document.querySelector('#templateModalMediaSlot img').src;
  });
  assert.ok(initialModalSource.includes('_preview.'), 'An uncached modal does not show a ready preview first');
  await page.waitForFunction(() => document.querySelector('#templateModalMediaSlot img')?.currentSrc.includes('119_full.'));
  const lateImage = page.waitForResponse(response => response.url().includes('118_full.'));
  await page.evaluate(() => {
    openTemplateModal(state.templates.find(item => item.id === '20261012-template-118'));
    closeTemplateModal();
    openTemplateModal(state.templates.find(item => item.id === '20261012-template-119'));
  });
  await (await lateImage).finished();
  await page.evaluate(() => new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve))));
  assert.ok((await page.locator('#templateModalMediaSlot img').getAttribute('src')).includes('119_full.'), 'A closed template overwrote the current modal image');
  await page.evaluate(() => closeTemplateModal());
  fixture.mediaDelay = 0;

  const lower = sections.last();
  const beforeHeight = await lower.evaluate(element => element.getBoundingClientRect().height);
  await lower.scrollIntoViewIfNeeded();
  await page.waitForFunction(() => document.querySelector('#templatesGrid [data-template-filter="Категория 12"] [data-template-id]'));
  const afterHeight = await lower.evaluate(element => element.getBoundingClientRect().height);
  assert.ok(Math.abs(beforeHeight - afterHeight) <= 12, `Deferred row changed height by ${afterHeight - beforeHeight}px`);
  await page.screenshot({path: `${screenshots}/${name}-lower-row.png`});
  await lower.locator('.template-section-open').click();
  await page.waitForFunction(() => document.querySelector('#templatesGrid.tools-grid'));
  assert.equal(await page.locator('#templatesGrid [data-template-id]').count(), 10, 'Opening a deferred category lost templates');
  await page.evaluate(() => showTemplateShowcase());
  await page.locator('#templateSearchInput').fill('Портрет 120');
  await page.waitForFunction(() => document.querySelector('#templatesGrid .tool-card strong')?.textContent === 'Портрет 120');
  assert.equal(await page.locator('#templatesGrid [data-template-id]').count(), 1, 'Search cannot find a deferred template');
  await page.locator('#templateSearchInput').fill('');

  await page.locator('[data-nav="history"]').click();
  await waitScreen(page, 'history');
  await page.waitForFunction(() => document.querySelector('#historyList img')?.complete);
  await page.evaluate(() => {window.__historyImage = document.querySelector('#historyList img');});
  const historyRequests = countRequests('/v1/generations');
  await page.locator('[data-nav="feed"]').click();
  await waitScreen(page, 'feed');
  await page.locator('[data-nav="history"]').click();
  await waitScreen(page, 'history');
  assert.equal(countRequests('/v1/generations'), historyRequests, 'Fresh history was fetched again');
  assert.ok(await page.evaluate(() => window.__historyImage === document.querySelector('#historyList img')), 'Fresh history images were replaced');
  await page.locator('#historyMoreButton').click();
  await page.waitForFunction(() => document.querySelectorAll('#historyList .history-item').length === 24);
  assert.ok(await page.evaluate(() => window.__historyImage === document.querySelector('#historyList img')), 'Appending history replaced existing rows');
  await page.screenshot({path: `${screenshots}/${name}-history.png`});
  assert.deepEqual(errors, [], 'Browser errors');
  console.log(`${name}: catalog deduplication, stable likes/history, deferred categories/search, image selection passed`);
  await page.close();
}

let chromiumBrowser, webkitBrowser;
try {
  chromiumBrowser = await chromium.launch();
  await testRuntime(chromiumBrowser, 'desktop-chromium', {width: 1440, height: 900});
  await testRuntime(chromiumBrowser, 'mobile-chromium', {width: 390, height: 844});
  webkitBrowser = await webkit.launch();
  await testRuntime(webkitBrowser, 'mobile-webkit', {width: 390, height: 844});

  fixture.failVariants = true;
  const fallback = await chromiumBrowser.newPage();
  await fallback.goto(origin + '/app/');
  await fallback.waitForFunction(() => {
    const image = document.querySelector('#templatesGrid img');
    return image && !image.hasAttribute('srcset') && image.complete && image.naturalWidth > 0;
  });
  await fallback.close();
  fixture.failVariants = false;
  fixture.rejectedSession = true;
  for (const item of fixture.items) {item.likes_count = 0; item.liked_by_me = false;}
  const rejected = await chromiumBrowser.newPage();
  await rejected.addInitScript(() => {window.IntersectionObserver = undefined;});
  await rejected.goto(origin + '/app/');
  await rejected.waitForFunction(() => document.querySelector('#bootSplash.is-hidden'));
  assert.ok(await rejected.locator('#authGate').isVisible(), 'Expired cookie hint grants access');
  await rejected.evaluate(async () => {
    await ensurePublicDataLoaded({auth: false});
    showTemplateShowcase();
  });
  assert.equal(await rejected.locator('#templatesGrid [data-template-id]').count(), 130, 'Without IntersectionObserver some sections are missing');
  await rejected.close();
  console.log('JPEG fallback and expired-session/no-observer fallback passed');
} finally {
  await chromiumBrowser?.close();
  await webkitBrowser?.close();
  await new Promise(resolve => server.close(resolve));
}
