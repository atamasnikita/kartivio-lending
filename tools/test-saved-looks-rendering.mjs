import assert from 'node:assert/strict';
import {execFileSync} from 'node:child_process';
import {mkdir, readFile} from 'node:fs/promises';
import {createServer} from 'node:http';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {chromium, webkit} from 'playwright';

const root = fileURLToPath(new URL('../', import.meta.url));
const server = createServer(async (request, response) => {
  const pathname = new URL(request.url, 'http://localhost').pathname;
  const file = path.resolve(root, '.' + decodeURIComponent(pathname.endsWith('/') ? pathname + 'index.html' : pathname));
  if (!file.startsWith(root)) {response.writeHead(403).end(); return;}
  try {
    const types = {'.html': 'text/html', '.js': 'application/javascript', '.css': 'text/css', '.jpg': 'image/jpeg', '.png': 'image/png'};
    response.setHeader('Content-Type', types[path.extname(file)] || 'application/octet-stream');
    response.setHeader('Cache-Control', 'no-store');
    response.end(await readFile(file));
  } catch {response.writeHead(404).end();}
});
await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
const url = process.env.APP_PREVIEW_URL || `http://127.0.0.1:${server.address().port}/app/`;
assert.ok(['127.0.0.1', 'localhost'].includes(new URL(url).hostname), 'Use a local preview only');
const screenshots = '/tmp/kartivio-looks-rendering';
await mkdir(screenshots, {recursive: true});

function installFixture() {
  localStorage.setItem('kartivio.access_token', 'local-preview');
  localStorage.setItem('kartivio.last_auth_provider', 'telegram');
  localStorage.setItem('kartivio.api_base', location.origin);
  localStorage.setItem('kartivio.product_analytics_disabled', '1');
  const fixture = window.__looksRendering = {
    loads: 0, completed: 0, fail: false,
    items: [
      {id: 'look-one', title: 'Основа', revision: 1, images: [{id: 'photo-one'}]},
      {id: 'look-two', title: 'Вдвоем', revision: 1, images: [{id: 'photo-two'}, {id: 'photo-three'}]},
    ],
    selection: {look_id: 'look-one', image_ids: ['photo-one'], revision: 1},
  };
  window.KartivioLooksAdapter = {
    async load() {
      const version = ++fixture.loads;
      await new Promise(resolve => setTimeout(resolve, 80));
      fixture.completed = version;
      if (fixture.fail) {fixture.fail = false; throw new Error('Test refresh unavailable');}
      return {
        items: fixture.items.map(item => ({...item, images: item.images.map(image => ({
          ...image,
          preview_url: `/app/assets/reference/reference-prompt-roses.jpg?photo=${image.id}&signature=${version}`,
        }))})),
        selection: fixture.selection, max_photos: 3, max_looks: 5,
      };
    },
    async select(value) {fixture.selection = value;},
  };
}

async function assertEditorLayout(page, clearance) {
  const layout = await page.locator('#savedLookEditor').evaluate(dialog => {
    const rect = element => {
      const {top, right, bottom, left, height} = element.getBoundingClientRect();
      return {top, right, bottom, left, height};
    };
    const body = dialog.querySelector('.look-editor-body');
    return {
      dialog: rect(dialog), head: rect(dialog.querySelector('.look-dialog-head')),
      close: rect(dialog.querySelector('[data-look-close="editor"]')),
      body: rect(body), footer: rect(dialog.querySelector('.look-editor-footer')),
      bodyScrollHeight: body.scrollHeight, bodyClientHeight: body.clientHeight,
      viewport: {width: innerWidth, height: innerHeight},
    };
  });
  assert.ok(layout.dialog.top >= clearance.top - 1, 'Editor overlaps the top safe area');
  assert.ok(layout.dialog.bottom <= layout.viewport.height - clearance.bottom + 1, 'Editor overlaps the bottom safe area');
  assert.ok(layout.dialog.left >= 8 && layout.dialog.right <= layout.viewport.width - 8, 'Editor has no horizontal breathing room');
  assert.ok(layout.close.top >= layout.dialog.top && layout.close.bottom <= layout.head.bottom, 'Close button is clipped');
  assert.ok(layout.body.height > 0, 'Editor body is collapsed');
  assert.ok(layout.body.bottom <= layout.footer.top + 1, 'Body overlaps editor actions');
  assert.ok(layout.footer.bottom <= layout.dialog.bottom + 1, 'Editor actions are clipped');
  assert.ok(layout.close.height >= 44, 'Close button lost its touch target');
  if (layout.viewport.width <= 600) assert.ok(layout.dialog.height <= 680, 'Mobile editor is stretched to full screen');
  return layout;
}

async function assertConfirmLayout(page, clearance) {
  await page.waitForFunction(() => document.getElementById('savedLookConfirm').classList.contains('is-visible'));
  await page.locator('#savedLookConfirm').evaluate(dialog => Promise.all(dialog.getAnimations().map(animation => animation.finished)));
  const layout = await page.locator('#savedLookConfirm').evaluate(dialog => {
    const {top, bottom} = dialog.getBoundingClientRect();
    return {top, bottom, viewportHeight: innerHeight, buttons: [...dialog.querySelectorAll('.look-confirm-actions button')].map(button => {
      const bounds = button.getBoundingClientRect();
      const style = getComputedStyle(button);
      const text = document.createRange();
      text.selectNodeContents(button);
      const textBounds = text.getBoundingClientRect();
      return {top: bounds.top, bottom: bounds.bottom, height: bounds.height, width: bounds.width,
        fontSize: style.fontSize, fontWeight: style.fontWeight,
        textFits: textBounds.left >= bounds.left && textBounds.right <= bounds.right && textBounds.top >= bounds.top && textBounds.bottom <= bounds.bottom};
    })};
  });
  assert.ok(layout.top >= clearance.top - 1 && layout.bottom <= layout.viewportHeight - clearance.bottom + 1, 'Confirmation overlaps a safe area');
  const [cancel, accept] = layout.buttons;
  assert.equal(cancel.top, accept.top, 'Confirmation button tops differ');
  assert.equal(cancel.height, accept.height, 'Confirmation button heights differ');
  assert.equal(cancel.height, 48, 'Confirmation buttons lost their touch target');
  assert.ok(Math.abs(cancel.width - accept.width) <= 1, 'Confirmation button widths differ');
  assert.equal(cancel.fontSize, accept.fontSize, 'Confirmation button font sizes differ');
  assert.equal(cancel.fontWeight, accept.fontWeight, 'Confirmation button font weights differ');
  assert.ok(cancel.textFits && accept.textFits, 'Confirmation button text is clipped');
}

async function testDialogs(page, name, viewport, telegramInsets) {
  const clearance = telegramInsets ? {top: 120, bottom: 50} : {top: 16, bottom: 16};
  await page.locator('#savedLookPicker [data-look-close="picker"]').click();
  await page.waitForFunction(() => !document.getElementById('savedLookPicker').open);
  await page.locator('[data-nav="profile"]').click();
  if (telegramInsets) await page.evaluate(() => {
    const style = document.documentElement.style;
    style.setProperty('--tg-safe-top', '47px');
    style.setProperty('--tg-controls-offset', '57px');
    style.setProperty('--tg-safe-bottom', '34px');
  });
  await page.locator('#savedLooksList [data-look-id="look-one"]').click();
  await page.waitForFunction(() => document.getElementById('savedLookEditor').classList.contains('is-visible'));
  await page.locator('#savedLookEditor').evaluate(dialog => Promise.all(dialog.getAnimations().map(animation => animation.finished)));
  await assertEditorLayout(page, clearance);
  await page.screenshot({path: `${screenshots}/${name}-editor.png`});

  const confirm = page.locator('#savedLookConfirm');
  await page.locator('#savedLookEditor [data-draft-remove="0"]').click();
  await assertConfirmLayout(page, clearance);
  await page.screenshot({path: `${screenshots}/${name}-delete-photo.png`});
  await confirm.locator('#lookConfirmCancel').click();
  await page.waitForFunction(() => !document.getElementById('savedLookConfirm').open);
  assert.equal(await page.locator('#lookEditorPhotos .look-editor-photo').count(), 2, 'Cancelling deletion removed a photo');

  await page.locator('#deleteSavedLookButton').click();
  await assertConfirmLayout(page, clearance);
  await confirm.locator('#lookConfirmCancel').click();
  await page.waitForFunction(() => !document.getElementById('savedLookConfirm').open);

  if (viewport.width <= 600) {
    await page.locator('#savedLookName').focus();
    await page.setViewportSize({width: viewport.width, height: 480});
    const compact = await assertEditorLayout(page, clearance);
    assert.ok(compact.bodyScrollHeight > compact.bodyClientHeight, 'Short viewport does not scroll inside the editor');
    await page.locator('#savedLookEditor .look-editor-body').evaluate(body => {body.scrollTop = body.scrollHeight;});
    await assertEditorLayout(page, clearance);
    await page.screenshot({path: `${screenshots}/${name}-short-viewport.png`});
    await page.setViewportSize(viewport);
  }

  await page.locator('#savedLookEditor [data-draft-remove="0"]').click();
  await assertConfirmLayout(page, clearance);
  await confirm.locator('#lookConfirmAccept').click();
  await page.waitForFunction(() => !document.getElementById('savedLookConfirm').open);
  assert.equal(await page.locator('#lookEditorPhotos .look-editor-photo').count(), 1, 'Confirmed deletion did not update the draft');
  await page.locator('#savedLookEditor [data-look-close="editor"]').click();
  await assertConfirmLayout(page, clearance);
  assert.equal(await confirm.locator('#lookConfirmCancel').textContent(), 'Не сохранять');
  await confirm.locator('#lookConfirmCancel').click();
  await page.waitForFunction(() => !document.getElementById('savedLookEditor').open && !document.getElementById('savedLookConfirm').open);

  await page.locator('#addSavedLookButton').click();
  await page.waitForFunction(() => document.getElementById('savedLookEditor').classList.contains('is-visible'));
  await page.locator('#savedLookEditor').evaluate(dialog => Promise.all(dialog.getAnimations().map(animation => animation.finished)));
  await assertEditorLayout(page, clearance);
  assert.equal(await page.locator('#saveSavedLookButton').isDisabled(), true);
  await page.locator('#savedLookEditor [data-look-close="editor"]').click();
  await page.waitForFunction(() => !document.getElementById('savedLookEditor').open);
}

async function run(browserType, name, viewport, reducedMotion = 'no-preference', telegramInsets = false) {
  const browser = await browserType.launch();
  try {
    const page = await browser.newPage({viewport, reducedMotion});
    const errors = [];
    let previewRequests = 0;
    page.on('pageerror', error => errors.push(error.message));
    page.on('request', request => {if (request.url().includes('signature=')) previewRequests++;});
    await page.addInitScript(installFixture);
    await page.route('**/healthz', route => route.fulfill({
      contentType: 'application/json', body: '{"ok":true}',
      headers: {'Access-Control-Allow-Origin': new URL(url).origin, 'Access-Control-Allow-Credentials': 'true'},
    }));
    await page.route('**/v1/**', route => {
      const fixtures = {
        '/v1/me': {id: 'local-preview', display_name: 'Test', is_admin: false, has_paid_payments: false},
        '/v1/wallet': {balance_credits: 20, items: []},
        '/v1/account/identities': {providers: ['telegram'], linked_telegram: true},
        '/v1/first-photoset-offer/state': {eligible: false, status: 'not_started'},
        '/v1/plans': {topups: []},
      };
      return route.fulfill({contentType: 'application/json', body: JSON.stringify(fixtures[new URL(route.request().url()).pathname] || {items: [], has_more: false})});
    });
    await page.route('**/__looks-mock.js', route => route.fulfill({
      contentType: 'application/javascript', body: `(${installFixture.toString()})();`,
    }));
    if (process.argv.includes('--baseline')) {
      const body = execFileSync('git', ['show', '58adbbc:app/saved-looks.js'], {cwd: root, encoding: 'utf8'});
      await page.route('**/saved-looks.js?*', route => route.fulfill({contentType: 'application/javascript', body}));
    }
    if (process.argv.includes('--dialogs-baseline')) {
      const body = execFileSync('git', ['show', 'ab1d75c:app/saved-looks.css'], {cwd: root, encoding: 'utf8'});
      await page.route('**/saved-looks.css?*', route => route.fulfill({contentType: 'text/css', body}));
    }
    await page.goto(url, {waitUntil: 'domcontentloaded'});
    await page.waitForFunction(() => document.querySelectorAll('#lookPickerList [data-look-id]').length === 2);
    await page.getByRole('button', {name: 'Студия', exact: true}).click();
    await page.locator('#chooseSavedLookButton').click();
    await page.waitForFunction(() => document.getElementById('savedLookPicker').classList.contains('is-visible') &&
      [...document.querySelectorAll('#lookPickerList img, #savedLookSource img')].every(image => image.complete && image.naturalWidth));
    await page.evaluate(() => {
      window.__stableRows = [...document.querySelectorAll('#lookPickerList [data-look-id]')];
      window.__stableImages = [...document.querySelectorAll('#lookPickerList img')];
      window.__stableSource = document.querySelector('#savedLookSource img');
      window.__originalUrls = window.__stableImages.map(image => image.src);
    });
    const initialRequests = previewRequests;
    const picker = page.locator('#savedLookPicker');
    for (let iteration = 0; iteration < 4; iteration++) {
      await picker.getByRole('button', {name: 'Закрыть выбор образа', exact: true}).click();
      await page.waitForFunction(() => !document.getElementById('savedLookPicker').open);
      const loads = await page.evaluate(() => window.__looksRendering.loads);
      await page.locator('#chooseSavedLookButton').click();
      await page.waitForFunction(previous => window.__looksRendering.completed > previous, loads);
      assert.equal(await page.evaluate(() => window.__stableRows.every((row, index) =>
        row === document.querySelectorAll('#lookPickerList [data-look-id]')[index])), true, 'Refresh replaced a row');
      assert.equal(await page.evaluate(() => window.__stableImages.every((image, index) =>
        image === document.querySelectorAll('#lookPickerList img')[index] && image.src === window.__originalUrls[index])), true, 'Refresh replaced or reloaded a preview');
      assert.equal(await page.evaluate(() => window.__stableSource === document.querySelector('#savedLookSource img')), true, 'Refresh replaced the selected source');
      await page.locator('#lookPickerList [data-look-id="look-two"]').hover();
    }
    assert.equal(previewRequests, initialRequests, 'Reopening fetched unchanged previews again');
    await page.screenshot({path: `${screenshots}/${name}.png`});

    await page.locator('#lookPickerList [data-look-id="look-two"]').click();
    await page.waitForFunction(() => !document.getElementById('savedLookPicker').open);
    assert.equal(await page.evaluate(() => window.KartivioLooks.snapshot().look_id), 'look-two');
    assert.equal(await page.locator('#savedLookSource img').count(), 2);
    await page.locator('#chooseSavedLookButton').click();
    await page.locator('#lookPickerList [data-look-id="look-two"][aria-pressed="true"]').waitFor();
    assert.equal(await page.evaluate(() => window.__stableRows[1] === document.querySelector('#lookPickerList [data-look-id="look-two"]')), true, 'Selection replaced its row');

    await page.evaluate(() => {
      const first = window.__looksRendering.items[0];
      first.title = 'Обновленное название';
      first.images.push({id: 'photo-four'});
      first.revision++;
      window.__looksRendering.items.reverse();
    });
    await page.evaluate(() => window.KartivioLooks.load('local-preview'));
    assert.equal(await page.locator('#lookPickerList [data-look-id="look-one"] strong').textContent(), 'Обновленное название');
    assert.equal(await page.locator('#lookPickerList [data-look-id="look-one"] img').count(), 2);
    assert.equal(await page.evaluate(() => window.__stableImages[0] === document.querySelector('#lookPickerList [data-look-id="look-one"] img')), true, 'Adding a photo replaced an unchanged one');
    assert.equal(await page.evaluate(() => document.getElementById('lookPickerList').firstElementChild.dataset.lookId), 'look-two');

    await page.evaluate(() => {document.querySelector('#lookPickerList img').src = '/__expired-preview.png';});
    await page.waitForFunction(() => {
      const image = document.querySelector('#lookPickerList img');
      return image.complete && image.naturalWidth && image.src.includes('signature=');
    });

    await picker.getByRole('button', {name: 'Закрыть выбор образа', exact: true}).click();
    await page.waitForFunction(() => !document.getElementById('savedLookPicker').open);
    await page.evaluate(() => {window.__looksRendering.fail = true;});
    await page.locator('#chooseSavedLookButton').click();
    await page.locator('#lookPickerNote').getByText('Не удалось обновить образы. Попробуй ещё раз.', {exact: true}).waitFor();
    assert.equal(await page.locator('#lookPickerList [data-look-id]').count(), 2, 'A failed refresh cleared the list');

    await page.evaluate(() => {window.__looksRendering.items = window.__looksRendering.items.filter(item => item.id !== 'look-two');});
    await page.evaluate(() => window.KartivioLooks.load('local-preview'));
    assert.equal(await page.locator('#lookPickerList [data-look-id]').count(), 1);
    assert.equal(await page.evaluate(() => window.KartivioLooks.snapshot()), null, 'A deleted look remained selected');
    await testDialogs(page, name, viewport, telegramInsets);
    assert.deepEqual(errors, []);
    console.log(`PASS ${name}: stable previews, selection, updates, errors, compact editor, safe areas, aligned confirmation actions`);
  } finally {
    await browser.close();
  }
}

try {
  await run(chromium, 'desktop', {width: 1365, height: 900});
  await run(chromium, 'mobile', {width: 390, height: 844});
  await run(chromium, 'small-mobile', {width: 320, height: 568});
  await run(webkit, 'ios-telegram-insets', {width: 390, height: 844}, 'no-preference', true);
  await run(webkit, 'ios-reduced-motion', {width: 390, height: 844}, 'reduce');
} finally {
  await new Promise(resolve => server.close(resolve));
}
