import assert from 'node:assert/strict';
import {chromium, webkit} from 'playwright';
import {createPerformanceFixture} from './ui-performance-fixture.mjs';

const {server, fixture} = createPerformanceFixture({delay: 20});
await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
const origin = `http://127.0.0.1:${server.address().port}`;
const auxiliaryPaths = ['/v1/account/identities', '/v1/referrals/me', '/v1/first-photoset-offer/state'];
const userB = {id: '33333333-3333-4333-8333-333333333333', display_name: 'Другой', has_successful_payment: false};
const jobA = {id: '44444444-4444-4444-8444-444444444444', status: 'processing',
  prompt: 'A portrait', provider_model: 'gemini-3.1-flash-image-preview', requested_credits: 10,
  output_size: '1024x1024', is_edit: false};
const jobB = {...jobA, id: '55555555-5555-4555-8555-555555555555'};
const ready = job => ({...job, status: 'done', result_image_url: origin + '/__performance-media/result_full.jpg'});

function gate() {
  let release;
  const promise = new Promise(resolve => {release = resolve;});
  return {promise, release};
}

async function boot(page) {
  await page.goto(origin + '/app/');
  await page.waitForFunction(() => document.querySelector('#bootSplash.is-hidden') && state.me?.id);
}

async function beginJob(page, job = jobA) {
  await page.evaluate(job => {
    stopActiveJobPolling({clearJob: true});
    state.activeJobId = job.id;
    state.activeJobStatus = job.status;
    renderActiveJob(job);
    window.__jobBefore = activeResult.firstElementChild;
  }, job);
}

async function holdAuxiliary(page, status = 200) {
  const blocked = gate();
  const allCaptured = gate();
  const captured = new Set();
  let accountB = false;
  for (const path of auxiliaryPaths) {
    await page.route(origin + path, async route => {
      if (accountB) {
        const json = path.includes('identities') ? {providers: ['yandex']}
          : path.includes('referrals') ? {reward_credits: 30}
          : {eligible: false, status: 'not_started'};
        return route.fulfill({json});
      }
      const response = await route.fetch();
      const json = await response.json();
      captured.add(path);
      if (captured.size === auxiliaryPaths.length) allCaptured.release();
      await blocked.promise;
      return route.fulfill({status: path.includes('identities') ? status : 200, json});
    });
  }
  return {captured, ready: allCaptured.promise, release: blocked.release, useAccountB: () => {accountB = true;}};
}

async function testRuntime(browser, name, viewport) {
  const pages = [];
  const errors = [];
  async function newPage() {
    const page = await browser.newPage({viewport});
    page.on('pageerror', error => errors.push(String(error)));
    await page.route('**/*', route => {
      const url = new URL(route.request().url());
      return url.origin === origin || url.protocol === 'data:' ? route.continue() : route.abort();
    });
    pages.push(page);
    return page;
  }
  try {
    const delayed = await newPage();
    const held = await holdAuxiliary(delayed);
    await boot(delayed);
    await held.ready;
    await delayed.waitForFunction(() => state.accountAuxiliaryPromise !== null);
    assert.equal(await delayed.evaluate(() => state.walletBalanceCredits), 100);
    assert.equal(await delayed.evaluate(() => state.referral), null);
    assert.equal(await delayed.evaluate(() => state.identitiesLoaded), false);
    assert.equal(await delayed.locator('#linkTelegramButton').isEnabled(), false);
    held.release();
    await delayed.evaluate(() => state.accountAuxiliaryPromise);
    assert.equal(await delayed.evaluate(() => state.identitiesLoaded && state.linkedProviders.has('telegram')), true);
    await delayed.close();

    const walletPage = await newPage();
    const walletGate = gate();
    const walletCaptured = gate();
    await walletPage.route(origin + '/v1/wallet?limit=1', async route => {
      walletCaptured.release();
      await walletGate.promise;
      await route.fulfill({json: {balance_credits: 100}});
    });
    await walletPage.goto(origin + '/app/');
    await walletPage.waitForFunction(() => state.privateDataRequestToken > 0);
    await walletCaptured.promise;
    assert.equal(await walletPage.evaluate(() => state.me), null);
    assert.equal(await walletPage.locator('#bootSplash').evaluate(element => element.classList.contains('is-hidden')), false);
    walletGate.release();
    await walletPage.waitForFunction(() => document.querySelector('#bootSplash.is-hidden') && state.me);
    await walletPage.close();

    const rejected = await newPage();
    await rejected.route(origin + '/v1/me', route => route.fulfill({status: 403, json: {detail: {code: 'forbidden'}}}));
    await rejected.goto(origin + '/app/');
    await rejected.waitForFunction(() => document.querySelector('#bootSplash.is-hidden'));
    assert.equal(await rejected.evaluate(() => hasActiveSession()), false);
    assert.equal(await rejected.evaluate(() => state.me), null);
    assert.equal(await rejected.locator('#authGate').evaluate(element => element.classList.contains('is-hidden')), false);
    await rejected.close();

    const accountPage = await newPage();
    const old = await holdAuxiliary(accountPage, 401);
    await boot(accountPage);
    await old.ready;
    await accountPage.evaluate(() => {window.__oldAuxiliary = state.accountAuxiliaryPromise;});
    old.useAccountB();
    await accountPage.route(origin + '/v1/me', route => route.fulfill({json: userB}));
    await accountPage.route(origin + '/v1/wallet?limit=1', route => route.fulfill({json: {balance_credits: 5}}));
    await accountPage.evaluate(async () => {
      await finalizeAuthSession({access_token: 'test-b', refresh_token: 'test-refresh-b'}, 'yandex');
      await loadPrivateData({forceServerCheck: true});
      await state.accountAuxiliaryPromise;
    });
    const refreshCount = fixture.requests.filter(request => request.path === '/v1/auth/refresh').length;
    old.release();
    await accountPage.evaluate(() => window.__oldAuxiliary);
    assert.equal(await accountPage.evaluate(() => state.me.id), userB.id);
    assert.equal(await accountPage.evaluate(() => state.walletBalanceCredits), 5);
    assert.equal(await accountPage.evaluate(() => state.referral.reward_credits), 30);
    assert.deepEqual(await accountPage.evaluate(() => [...state.linkedProviders]), ['yandex']);
    assert.equal(await accountPage.evaluate(() => hasActiveSession()), true);
    assert.equal(fixture.requests.filter(request => request.path === '/v1/auth/refresh').length, refreshCount);
    await accountPage.close();

    const criticalRace = await newPage();
    await boot(criticalRace);
    const criticalGate = gate();
    const capturedCritical = gate();
    const criticalPaths = new Set();
    let changedAccount = false;
    for (const path of ['/v1/me', '/v1/wallet?limit=1']) {
      await criticalRace.route(origin + path, async route => {
        if (changedAccount) return route.fulfill({json: path.endsWith('/me') ? userB : {balance_credits: 5}});
        criticalPaths.add(path);
        if (criticalPaths.size === 2) capturedCritical.release();
        await criticalGate.promise;
        return route.fulfill({status: path.endsWith('/me') ? 401 : 200, json: {balance_credits: 100}});
      });
    }
    await criticalRace.evaluate(() => {window.__oldPrivate = loadPrivateData({forceServerCheck: true});});
    await capturedCritical.promise;
    changedAccount = true;
    await criticalRace.evaluate(async () => {
      await finalizeAuthSession({access_token: 'test-b', refresh_token: 'test-refresh-b'}, 'yandex');
      await loadPrivateData({forceServerCheck: true});
    });
    criticalGate.release();
    assert.equal(await criticalRace.evaluate(() => window.__oldPrivate), false);
    assert.equal(await criticalRace.evaluate(() => state.me.id), userB.id);
    assert.equal(await criticalRace.evaluate(() => state.walletBalanceCredits), 5);
    await criticalRace.close();

    const logoutPage = await newPage();
    const afterLogout = await holdAuxiliary(logoutPage);
    await boot(logoutPage);
    await afterLogout.ready;
    await logoutPage.evaluate(() => {window.__logoutAuxiliary = state.accountAuxiliaryPromise;});
    await logoutPage.evaluate(() => logoutSession());
    afterLogout.release();
    await logoutPage.evaluate(() => window.__logoutAuxiliary);
    assert.equal(await logoutPage.evaluate(() => state.me), null);
    assert.equal(await logoutPage.evaluate(() => state.referral), null);
    assert.equal(await logoutPage.evaluate(() => state.firstPhotosetOfferState), null);
    assert.equal(await logoutPage.evaluate(() => state.linkedProviders.size), 0);
    await logoutPage.close();

    const orderedPage = await newPage();
    await boot(orderedPage);
    await orderedPage.evaluate(() => state.accountAuxiliaryPromise);
    for (const [path, helper, latest, field] of [
      ['/v1/wallet?limit=1', 'refreshWalletBalance', {balance_credits: 40}, 'walletBalanceCredits'],
      ['/v1/referrals/me', 'loadReferralSummary', {reward_credits: 40}, 'referral'],
    ]) {
      const olderGate = gate();
      const olderCaptured = gate();
      let requests = 0;
      await orderedPage.route(origin + path, async route => {
        requests++;
        if (requests === 1) {
          olderCaptured.release();
          await olderGate.promise;
          return route.fulfill({json: path.includes('wallet') ? {balance_credits: 100} : {reward_credits: 20}});
        }
        return route.fulfill({json: latest});
      });
      await orderedPage.evaluate(helper => {window.__olderResponse = window[helper]();}, helper);
      await olderCaptured.promise;
      await orderedPage.evaluate(helper => window[helper](), helper);
      olderGate.release();
      await orderedPage.evaluate(() => window.__olderResponse);
      const value = await orderedPage.evaluate(field => state[field], field);
      assert.equal(field === 'referral' ? value.reward_credits : value, 40);
    }
    await orderedPage.close();

    const creationPage = await newPage();
    await boot(creationPage);
    const creationGate = gate();
    const creationCaptured = gate();
    await creationPage.route(origin + '/v1/generations', async route => {
      if (route.request().method() !== 'POST') return route.continue();
      creationCaptured.release();
      await creationGate.promise;
      return route.fulfill({json: ready(jobA)});
    });
    await creationPage.evaluate(() => {
      promptInput.value = 'A test portrait';
      window.__oldCreate = handleCreate();
    });
    await creationCaptured.promise;
    await creationPage.route(origin + '/v1/me', route => route.fulfill({json: userB}));
    await creationPage.route(origin + '/v1/wallet?limit=1', route => route.fulfill({json: {balance_credits: 5}}));
    await creationPage.evaluate(async () => {
      await finalizeAuthSession({access_token: 'test-b', refresh_token: 'test-refresh-b'}, 'yandex');
      await loadPrivateData({forceServerCheck: true});
    });
    creationGate.release();
    await creationPage.evaluate(() => window.__oldCreate);
    assert.equal(await creationPage.evaluate(() => state.me.id), userB.id);
    assert.equal(await creationPage.evaluate(() => state.activeJobId), '');
    assert.equal(await creationPage.evaluate(() => state.trackedResultJobIds.size), 0);
    assert.equal(await creationPage.evaluate(() => createButton.disabled), false);
    await creationPage.close();

    const refreshPage = await newPage();
    await boot(refreshPage);
    const refreshGate = gate();
    const refreshCaptured = gate();
    await refreshPage.route(origin + '/v1/auth/refresh', async route => {
      refreshCaptured.release();
      await refreshGate.promise;
      await route.fulfill({json: {access_token: 'old-a', refresh_token: 'old-a-refresh'},
        headers: {'Set-Cookie': 'test-session=old-a; Path=/; SameSite=Lax'}}).catch(() => {});
    });
    await refreshPage.evaluate(() => {window.__oldRefresh = refreshSession();});
    await refreshCaptured.promise;
    await refreshPage.route(origin + '/v1/me', route => route.fulfill({json: userB}));
    await refreshPage.route(origin + '/v1/wallet?limit=1', route => route.fulfill({json: {balance_credits: 5}}));
    await refreshPage.context().addCookies([{name: 'test-session', value: 'b', url: origin}]);
    await refreshPage.evaluate(async () => {
      await finalizeAuthSession({access_token: 'test-b', refresh_token: 'test-refresh-b'}, 'yandex');
      await loadPrivateData({forceServerCheck: true});
    });
    assert.equal((await refreshPage.evaluate(() => window.__oldRefresh)).ok, false);
    refreshGate.release();
    await refreshPage.evaluate(() => new Promise(resolve => requestAnimationFrame(resolve)));
    assert.equal(await refreshPage.evaluate(() => state.me.id), userB.id);
    assert.equal(await refreshPage.evaluate(() => hasActiveSession()), true);
    assert.equal((await refreshPage.context().cookies()).find(cookie => cookie.name === 'test-session')?.value, 'b');
    await refreshPage.close();

    const multipartPage = await newPage();
    await boot(multipartPage);
    const uploadGate = gate();
    const uploadCaptured = gate();
    let uploadRequests = 0;
    await multipartPage.route(origin + '/v1/generations/edit', async route => {
      uploadRequests++;
      uploadCaptured.release();
      await uploadGate.promise;
      await route.fulfill({status: 401, json: {detail: {code: 'invalid_token'}}});
    });
    await multipartPage.evaluate(() => {
      const form = new FormData();
      form.append('prompt', 'A fake upload');
      window.__oldMultipart = authorizedMultipart('/v1/generations/edit', form).catch(error => error.status);
    });
    await uploadCaptured.promise;
    await multipartPage.route(origin + '/v1/me', route => route.fulfill({json: userB}));
    await multipartPage.route(origin + '/v1/wallet?limit=1', route => route.fulfill({json: {balance_credits: 5}}));
    await multipartPage.evaluate(async () => {
      await finalizeAuthSession({access_token: 'test-b', refresh_token: 'test-refresh-b'}, 'yandex');
      await loadPrivateData({forceServerCheck: true});
    });
    uploadGate.release();
    assert.equal(await multipartPage.evaluate(() => window.__oldMultipart), 401);
    assert.equal(uploadRequests, 1);
    assert.equal(await multipartPage.evaluate(() => state.me.id), userB.id);
    assert.equal(await multipartPage.evaluate(() => hasActiveSession()), true);
    await multipartPage.close();

    const retryRace = await newPage();
    await boot(retryRace);
    await retryRace.evaluate(() => state.accountAuxiliaryPromise);
    let retryRaceRequests = 0;
    await retryRace.route(origin + '/v1/generations/' + jobA.id, route => {
      retryRaceRequests++;
      return route.fulfill({status: 503, json: {detail: 'Temporary failure'}});
    });
    await retryRace.evaluate(id => {
      const original = window.setTimeout;
      window.setTimeout = (callback, delay, ...args) => {
        if (delay === 250 && !window.__releaseOldRetry) {
          window.__releaseOldRetry = () => original(callback, 0, ...args);
          return 0;
        }
        return original(callback, delay, ...args);
      };
      window.__retryRace = authorizedGetWithRetry('/v1/generations/' + id, 1)
        .catch(error => error.status);
    }, jobA.id);
    await retryRace.waitForFunction(() => typeof window.__releaseOldRetry === 'function');
    await retryRace.route(origin + '/v1/me', route => route.fulfill({json: userB}));
    await retryRace.route(origin + '/v1/wallet?limit=1', route => route.fulfill({json: {balance_credits: 5}}));
    await retryRace.evaluate(async () => {
      await finalizeAuthSession({access_token: 'test-b', refresh_token: 'test-refresh-b'}, 'yandex');
      await loadPrivateData({forceServerCheck: true});
      window.__releaseOldRetry();
    });
    assert.equal(await retryRace.evaluate(() => window.__retryRace), 503);
    assert.equal(retryRaceRequests, 1);
    assert.equal(await retryRace.evaluate(() => state.me.id), userB.id);
    await retryRace.close();

    for (const runtime of ['telegram', 'max']) {
      const miniapp = await newPage();
      const identitiesGate = gate();
      const identitiesCaptured = gate();
      await miniapp.addInitScript(runtime => {
        const sdk = {initData: 'synthetic-test-init-data', platform: 'ios', viewportHeight: 844,
          viewportStableHeight: 844, colorScheme: 'dark', initDataUnsafe: {user: {id: 1}},
          ready() {}, expand() {}, onEvent() {}, offEvent() {}};
        if (runtime === 'telegram') window.Telegram = {WebApp: sdk};
        else window.WebApp = sdk;
      }, runtime);
      let authenticationRequests = 0;
      await miniapp.route(origin + '/v1/auth/**', route => {
        authenticationRequests++;
        return route.fulfill({json: {access_token: 'miniapp-test', refresh_token: 'miniapp-refresh'}});
      });
      await miniapp.route(origin + '/v1/account/identities', async route => {
        identitiesCaptured.release();
        await identitiesGate.promise;
        return route.fulfill({json: {providers: [runtime]}});
      });
      await boot(miniapp);
      await identitiesCaptured.promise;
      assert.equal(await miniapp.evaluate(() => state.walletBalanceCredits), 100);
      assert.equal(await miniapp.evaluate(() => state.identitiesLoaded), false);
      identitiesGate.release();
      await miniapp.evaluate(() => state.accountAuxiliaryPromise);
      assert.equal(await miniapp.evaluate(runtime => state.linkedProviders.has(runtime), runtime), true);
      assert.equal(authenticationRequests, 1, `${runtime} repeats login before deferred identities arrive`);
      await miniapp.close();
    }

    const retryPage = await newPage();
    await boot(retryPage);
    let retryRequests = 0;
    await retryPage.route(origin + '/v1/generations/' + jobA.id, route => {
      retryRequests++;
      return retryRequests <= 2
        ? route.fulfill({status: 503, json: {detail: {code: 'temporarily_unavailable'}}})
        : route.fulfill({json: ready(jobA)});
    });
    await beginJob(retryPage);
    await retryPage.evaluate(id => pollActiveJob(id), jobA.id);
    assert.equal(await retryPage.evaluate(() => state.activePollFailureCount), 1);
    assert.equal(await retryPage.evaluate(() => state.activeJobStatus), 'processing');
    assert.equal(await retryPage.evaluate(() => window.__jobBefore === activeResult.firstElementChild), true);
    await retryPage.waitForFunction(() => state.activeJobStatus === 'done' && state.activePollStopped);
    assert.equal(retryRequests, 3);
    assert.equal(await retryPage.evaluate(() => state.activePollTimer), null);
    await retryPage.close();

    const pausePage = await newPage();
    await boot(pausePage);
    let pauseRequests = 0;
    await pausePage.route(origin + '/v1/generations/' + jobA.id, route => {
      pauseRequests++;
      return route.fulfill({json: pauseRequests === 1 ? jobA : ready(jobA)});
    });
    await beginJob(pausePage);
    await pausePage.evaluate(id => pollActiveJob(id), jobA.id);
    assert.equal(await pausePage.evaluate(() => window.__jobBefore === activeResult.firstElementChild), true);
    await pausePage.evaluate(() => {
      window.__offline = true;
      Object.defineProperty(navigator, 'onLine', {configurable: true, get: () => !window.__offline});
      window.dispatchEvent(new Event('offline'));
      window.__hidden = true;
      Object.defineProperty(document, 'hidden', {configurable: true, get: () => window.__hidden});
      Object.defineProperty(document, 'visibilityState', {configurable: true, get: () => window.__hidden ? 'hidden' : 'visible'});
      document.dispatchEvent(new Event('visibilitychange'));
    });
    assert.equal(await pausePage.evaluate(() => state.activePollTimer), null);
    await pausePage.evaluate(id => pollActiveJob(id), jobA.id);
    assert.equal(pauseRequests, 1);
    await pausePage.evaluate(() => {window.__offline = false; window.dispatchEvent(new Event('online'));});
    assert.equal(pauseRequests, 1, 'Online event polls a hidden tab');
    await pausePage.evaluate(() => {window.__hidden = false; document.dispatchEvent(new Event('visibilitychange'));});
    await pausePage.waitForFunction(() => state.activeJobStatus === 'done');
    assert.equal(pauseRequests, 2);
    await pausePage.close();

    const dedupPage = await newPage();
    await boot(dedupPage);
    const inFlightGate = gate();
    const inFlightCaptured = gate();
    let dedupRequests = 0;
    let inFlight = 0;
    let peak = 0;
    await dedupPage.route(origin + '/v1/generations/' + jobA.id, async route => {
      dedupRequests++;
      inFlight++;
      peak = Math.max(peak, inFlight);
      if (dedupRequests === 1) {
        inFlightCaptured.release();
        await inFlightGate.promise;
      }
      inFlight--;
      return route.fulfill({json: dedupRequests === 1 ? jobA : ready(jobA)});
    });
    await beginJob(dedupPage);
    await dedupPage.evaluate(id => {window.__dedupPoll = pollActiveJob(id);}, jobA.id);
    await inFlightCaptured.promise;
    await dedupPage.evaluate(() => {
      for (let index = 0; index < 3; index++) window.dispatchEvent(new Event('online'));
      window.dispatchEvent(new Event('pageshow'));
    });
    assert.equal(dedupRequests, 1);
    inFlightGate.release();
    await dedupPage.waitForFunction(() => state.activeJobStatus === 'done' && state.activePollRequest === null);
    assert.equal(dedupRequests, 2);
    assert.equal(peak, 1);
    await dedupPage.close();

    const backoffPage = await newPage();
    await boot(backoffPage);
    await backoffPage.route(origin + '/v1/generations/' + jobA.id, route =>
      route.fulfill({status: 503, json: {detail: {code: 'temporarily_unavailable'}}}));
    await beginJob(backoffPage);
    const backoff = await backoffPage.evaluate(async id => {
      const delays = [];
      const original = window.setTimeout;
      window.setTimeout = (callback, delay, ...arguments_) => {
        if ([2500, 5000, 10000, 15000].includes(delay)) delays.push(delay);
        return original(callback, delay, ...arguments_);
      };
      for (let index = 0; index < 5; index++) await pollActiveJob(id);
      stopActiveJobPolling({clearJob: true});
      window.setTimeout = original;
      return delays;
    }, jobA.id);
    assert.deepEqual(backoff, [2500, 5000, 10000, 15000, 15000]);
    await backoffPage.close();

    const stalePage = await newPage();
    await boot(stalePage);
    const jobGate = gate();
    const jobCaptured = gate();
    await stalePage.route(origin + '/v1/generations/' + jobA.id, async route => {
      jobCaptured.release();
      await jobGate.promise;
      return route.fulfill({json: ready(jobA)});
    });
    await stalePage.route(origin + '/v1/generations/' + jobB.id, route => route.fulfill({json: jobB}));
    await beginJob(stalePage);
    await stalePage.evaluate(id => {window.__oldPoll = pollActiveJob(id);}, jobA.id);
    await stalePage.waitForFunction(() => state.activePollRequest !== null);
    await jobCaptured.promise;
    await beginJob(stalePage, jobB);
    await stalePage.evaluate(id => pollActiveJob(id), jobB.id);
    jobGate.release();
    await stalePage.evaluate(() => window.__oldPoll);
    assert.equal(await stalePage.evaluate(() => state.activeJobId), jobB.id);
    assert.equal(await stalePage.evaluate(() => state.activeJobStatus), 'processing');
    assert.ok(await stalePage.evaluate(() => state.activePollTimer !== null));
    await stalePage.evaluate(() => logoutSession());
    assert.equal(await stalePage.evaluate(() => state.activeJobId), '');
    assert.equal(await stalePage.evaluate(() => state.activePollTimer), null);
    await stalePage.close();

    const permanentPage = await newPage();
    await boot(permanentPage);
    let permanentRequests = 0;
    await permanentPage.route(origin + '/v1/generations/' + jobA.id, route => {
      permanentRequests++;
      return route.fulfill({status: 404, json: {detail: {code: 'generation_not_found'}}});
    });
    await beginJob(permanentPage);
    await permanentPage.evaluate(id => pollActiveJob(id), jobA.id);
    assert.equal(await permanentPage.evaluate(() => state.activePollStopped), true);
    assert.equal(await permanentPage.evaluate(() => state.activePollTimer), null);
    await permanentPage.evaluate(() => window.dispatchEvent(new Event('online')));
    assert.equal(permanentRequests, 2);
    await permanentPage.close();

    const expiredPage = await newPage();
    await boot(expiredPage);
    await expiredPage.route(origin + '/v1/generations/' + jobA.id, route =>
      route.fulfill({status: 401, json: {detail: {code: 'invalid_token'}}}));
    await expiredPage.route(origin + '/v1/auth/refresh', route =>
      route.fulfill({status: 403, json: {detail: {code: 'refresh_token_invalid'}}}));
    await beginJob(expiredPage);
    await expiredPage.evaluate(id => pollActiveJob(id), jobA.id);
    assert.equal(await expiredPage.evaluate(() => hasActiveSession()), false);
    assert.equal(await expiredPage.evaluate(() => state.activeJobId), '');
    assert.equal(await expiredPage.evaluate(() => state.activePollTimer), null);
    assert.equal(await expiredPage.locator('#authGate').evaluate(element => element.classList.contains('is-hidden')), false);
    await expiredPage.close();

    assert.equal(fixture.requests.filter(request => request.method === 'POST' && request.path.startsWith('/v1/generations')).length, 0);
    assert.deepEqual(errors, []);
    console.log(`${name}: critical boot, deferred data, account guards, retry, stable progress, visibility, stale job and permanent error passed`);
  } finally {
    for (const page of pages) await page.close().catch(() => {});
  }
}

try {
  for (const [name, engine, viewport] of [
    ['desktop-chromium', chromium, {width: 1440, height: 900}],
    ['mobile-webkit', webkit, {width: 390, height: 844}],
  ]) {
    const browser = await engine.launch();
    try {await testRuntime(browser, name, viewport);} finally {await browser.close();}
  }
} finally {
  await new Promise(resolve => server.close(resolve));
}
