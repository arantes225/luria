const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { workerFixture, resource } = require('./fixtures/service-worker.cjs');

test('public resources are fetched anonymously, stored and recovered offline by exact URL', async () => {
  let online = true;
  const f = workerFixture({ fetch: async req => { if (!online) throw Error('offline'); return resource(req, 'current public bytes'); } });
  for (const url of ['/assets/css/ui-v2-foundations.css?v=2', '/assets/js/app.js?v=release',
    '/assets/fonts/inter/InterVariable.woff2', '/assets/vendor/library.wasm', '/manifest.webmanifest?v=5']) {
    let result = await f.run(url); await result.done();
    assert.equal(await result.response.text(), 'current public bytes');
    online = false;
    result = await f.run(url); await result.done();
    assert.equal(await result.response.text(), 'current public bytes');
    online = true;
  }
  assert.ok(f.calls.every(call => call.request.credentials === 'omit'));
});

test('private requests bypass interception and never fall back to public caches', async () => {
  const cases = [
    ['/assets/js/app.js', { headers: { Authorization: 'Bearer account-A' } }],
    ['/assets/js/app.js', { headers: { apikey: 'secret' } }],
    ['/assets/js/app.js', { headers: { Cookie: 'session=account-A' } }],
    ['/assets/js/app.js', { credentials: 'include' }], ['/assets/js/app.js', { cache: 'no-store' }],
    ['/assets/js/app.js', { headers: { 'Cache-Control': 'no-store' } }],
    ['/assets/js/..%2f..%2fapi/private.js', {}], ['/assets/js/private%5cfile.js', {}],
    ['/assets/img/logos/private.png?token=secret', {}], ['/assets/img/logos/private.png?X-Amz-Signature=secret', {}],
    ['/assets/js/app.js?v=1&access_token=secret', {}], ['/assets/js/app.js?v=1&v=2', {}],
    ['/assets/css/style.css?patient=123', {}], ['/assets/css/style.css?cachebust=123', {}],
    ['/admin/', { mode: 'navigate' }], ['/admin/index.html', { mode: 'navigate' }],
    ['/api/history.json', {}], ['/rest/v1/profiles', {}], ['/auth/v1/token', {}],
    ['/functions/v1/private', {}], ['/storage/v1/object/sign/private/file.png', {}],
    ['https://project.supabase.co/rest/v1/profiles', {}],
    ['https://project.supabase.co/storage/v1/object/public/images/a.png', {}],
    ['/assets/js/app.js', { method: 'POST', body: 'test' }],
    ['/assets/img/logos/logo.png', { headers: { Range: 'bytes=0-20' } }],
  ];
  const f = workerFixture();
  await f.seed(f.STATIC_CACHE, '/dashboard/', resource('/dashboard/', 'public shell'));
  for (const [url, options] of cases) {
    const result = await f.run(url, options);
    assert.equal(result.response, null, url);
    assert.equal(result.pending.length, 0, url);
  }
  assert.equal(f.calls.length, 0);
});

test('browser navigation defaults to include but known public shells are fetched anonymously', async () => {
  let online = true;
  const f = workerFixture({ fetch: async req => { if (!online) throw Error('offline'); return resource(req, 'public navigation'); } });
  let result = await f.run('/dashboard/?v=2', { mode: 'navigate', credentials: 'include' }); await result.done();
  assert.equal(await result.response.text(), 'public navigation');
  assert.equal(f.calls[0].request.credentials, 'omit');
  online = false;
  result = await f.run('/dashboard/?v=2', { mode: 'navigate', credentials: 'include' }); await result.done();
  assert.equal(await result.response.text(), 'public navigation');
  assert.equal((await f.run('/admin/', { mode: 'navigate', credentials: 'include' })).response, null);
  assert.equal((await f.run('/dashboard/', { mode: 'navigate', credentials: 'include', headers: { Authorization: 'Bearer A' } })).response, null);
});

test('account A and B authenticated requests cannot reuse cached private/public responses', async () => {
  const f = workerFixture();
  await f.seed(f.RUNTIME_CACHE, '/assets/js/app.js', resource('/assets/js/app.js', 'account A', { Authorization: 'private' }));
  for (const account of ['A', 'B']) {
    const result = await f.run('/assets/js/app.js', { headers: { Authorization: 'Bearer account-' + account } });
    assert.equal(result.response, null);
  }
  const publicRequest = await f.run('/assets/js/app.js'); await publicRequest.done();
  assert.equal(publicRequest.response.status, 503);
  assert.equal((await (await f.caches.open(f.RUNTIME_CACHE)).keys()).length, 0);
});

for (const headers of [
  { 'Cache-Control': 'private, max-age=300' }, { 'Cache-Control': 'public, no-store' },
  { 'Cache-Control': 'NO-CACHE' }, { 'Cache-Control': 'max-age=0, must-revalidate' },
  { 'Cache-Control': 'proxy-revalidate' }, { Authorization: 'private' }, { 'Set-Cookie': 'session=private' },
  { Vary: 'Authorization' }, { Vary: 'Cookie' }, { Vary: '*' }, { 'Content-Type': 'application/json' },
]) {
  test(`non-cacheable response is returned online but never stored: ${JSON.stringify(headers)}`, async () => {
    const url = '/assets/css/ui-v2-foundations.css?v=2';
    const f = workerFixture({ fetch: async req => resource(req, 'network body', headers) });
    const result = await f.run(url); await result.done();
    assert.equal(await result.response.text(), 'network body');
    assert.equal(f.writes.length, 0);
    const cached = await (await f.caches.open(f.RUNTIME_CACHE)).match(f.request(url));
    assert.equal(cached, undefined);
  });
}

test('new private response revokes every previous exact copy in active caches', async () => {
  const url = '/dashboard/';
  const f = workerFixture({ fetch: async req => resource(req, 'private network response', { 'Cache-Control': 'private' }) });
  for (const name of [f.STATIC_CACHE, f.RUNTIME_CACHE]) await f.seed(name, url, resource(url, 'former public shell'));
  const result = await f.run(url, { mode: 'navigate' }); await result.done();
  assert.equal(await result.response.text(), 'private network response');
  for (const name of [f.STATIC_CACHE, f.RUNTIME_CACHE]) assert.equal(await (await f.caches.open(name)).match(f.request(url)), undefined);
});

test('temporary server failure preserves exact offline copy, access denial does not return it', async () => {
  let status = 503;
  const f = workerFixture({ fetch: async req => resource(req, 'server response', {}, status) });
  for (const url of ['/dashboard/', '/content/weekly/manifest.json']) {
    const name = url.includes('/weekly/') ? f.WEEKLY_CONTENT_CACHE : f.RUNTIME_CACHE;
    await f.seed(name, url, resource(url, 'public offline copy'));
    let result = await f.run(url); await result.done();
    assert.equal(await result.response.text(), 'public offline copy');
    const cache = await f.caches.open(name);
    assert.ok(await cache.match(f.request(url)));
    for (const denial of [401, 403]) {
      status = denial;
      await f.seed(name, url, resource(url, 'public offline copy'));
      result = await f.run(url); await result.done();
      assert.equal(result.response.status, denial);
      assert.equal(await cache.match(f.request(url)), undefined);
    }
    status = 503;
  }
});

test('F01: old static plain URL/new runtime v2 cannot satisfy a different offline version', async () => {
  const f = workerFixture();
  const base = '/assets/css/ui-v2-foundations.css';
  await f.seed(f.STATIC_CACHE, base, resource(base, 'old static'));
  await f.seed(f.RUNTIME_CACHE, base + '?v=2', resource(base, 'new runtime'));
  for (const suffix of ['?v=3', '?v=1', '?v=2&extra=1']) {
    const result = await f.run(base + suffix); await result.done();
    if (suffix.includes('extra')) assert.equal(result.response, null);
    else assert.equal(result.response.status, 503);
  }
  const exact = await f.run(base + '?v=2'); await exact.done();
  assert.equal(await exact.response.text(), 'new runtime');
});

test('active runtime exact match precedes static exact match, never searches legacy/foreign caches', async () => {
  const f = workerFixture();
  const url = '/assets/js/app.js?v=2';
  await f.seed('luria-pwa-v281-mobile-flow-static', url, resource(url, 'legacy'));
  await f.seed('another-application', url, resource(url, 'foreign'));
  let result = await f.run(url); await result.done();
  assert.equal(result.response.status, 503);
  await f.seed(f.STATIC_CACHE, url, resource(url, 'static exact'));
  await f.seed(f.RUNTIME_CACHE, url, resource(url, 'runtime exact'));
  result = await f.run(url); await result.done();
  assert.equal(await result.response.text(), 'runtime exact');
});

test('offline missing navigation gets an explicit 503, never a different dashboard/login shell', async () => {
  const f = workerFixture();
  await f.seed(f.STATIC_CACHE, '/dashboard/', resource('/dashboard/', 'dashboard'));
  await f.seed(f.STATIC_CACHE, '/login/', resource('/login/', 'login'));
  const result = await f.run('/flashcards/', { mode: 'navigate' }); await result.done();
  assert.equal(result.response.status, 503);
  assert.match(await result.response.text(), /Sem conexão/);
  assert.equal((await f.run('/private-history/', { mode: 'navigate' })).response, null);
});

test('navigation refresh preserves response headers including existing CSP, and recovers after network failure', async () => {
  let online = true;
  const csp = "default-src 'self'; script-src 'self'; script-src-attr 'none'";
  const f = workerFixture({ fetch: async req => { if (!online) throw Error('offline'); return resource(req, 'fresh page', { 'Content-Security-Policy': csp }); } });
  let result = await f.run('/dashboard/', { mode: 'navigate' }); await result.done();
  assert.equal(result.response.headers.get('Content-Security-Policy'), csp);
  online = false;
  result = await f.run('/dashboard/', { mode: 'navigate' }); await result.done();
  assert.equal(await result.response.text(), 'fresh page');
  assert.equal(result.response.headers.get('Content-Security-Policy'), csp);
  online = true;
  result = await f.run('/dashboard/', { mode: 'navigate' }); await result.done();
  assert.equal(result.response.status, 200);
});

test('cached script is immediate and navigation keeps its bounded wait/background update', async () => {
  let complete;
  const f = workerFixture({ fetch: () => new Promise(resolve => { complete = resolve; }) });
  await f.seed(f.RUNTIME_CACHE, '/assets/js/app.js?v=2', resource('/assets/js/app.js', 'cached code'));
  const code = await f.run('/assets/js/app.js?v=2');
  assert.equal(await code.response.text(), 'cached code');
  complete(resource('/assets/js/app.js', 'fresh code')); await code.done();
  await f.seed(f.RUNTIME_CACHE, '/dashboard/', resource('/dashboard/', 'cached page'));
  const pending = f.run('/dashboard/', { mode: 'navigate' });
  await new Promise(resolve => setImmediate(resolve)); f.timeout(2500);
  const page = await pending;
  assert.equal(await page.response.text(), 'cached page');
  complete(resource('/dashboard/', 'fresh page')); await page.done();
  assert.equal(await (await (await f.caches.open(f.RUNTIME_CACHE)).match(f.request('/dashboard/'))).text(), 'fresh page');
});

test('apostila navigation fetches the existing index route but preserves the complete version query', async () => {
  let online = true;
  const f = workerFixture({ fetch: async req => { if (!online) throw Error('offline'); return resource(req, 'apostila'); } });
  let result = await f.run('/apostilas/cardiologia/?v=2', { mode: 'navigate' }); await result.done();
  assert.equal(f.calls[0].request.url, f.origin + '/apostilas/cardiologia/index.html?v=2');
  online = false;
  result = await f.run('/apostilas/cardiologia/?v=2', { mode: 'navigate' }); await result.done();
  assert.equal(await result.response.text(), 'apostila');
  result = await f.run('/apostilas/cardiologia/?v=3', { mode: 'navigate' }); await result.done();
  assert.equal(result.response.status, 503);
});

test('weekly prefetch accepts only same-origin client/public JSON URLs and omits cookies', async () => {
  const f = workerFixture({ fetch: async req => resource(req, '{}') });
  const data = { type: 'LURIA_PREFETCH_WEEKLY_CONTENT', urls: ['/content/weekly/2026-W40/questions-g1-v1.json',
    '/content/weekly/private.json?token=secret', 'https://evil.org/content/weekly/a.json', '/admin/', '/content/weekly/a.js'] };
  await f.dispatch('message', { data, source: { url: 'https://evil.org/' } }).done();
  assert.equal(f.calls.length, 0);
  await f.dispatch('message', { data, source: { url: f.origin + '/dashboard/' } }).done();
  assert.equal(f.calls.length, 1);
  assert.equal(f.calls[0].request.credentials, 'omit');
  assert.equal(f.writes[0].name, f.WEEKLY_CONTENT_CACHE);
  const cached = await f.run(data.urls[0]);
  assert.equal(await cached.response.text(), '{}');
  assert.equal(f.calls.length, 1);
});

test('public images keep their TTL/offline fallback and never accept signed URLs', async () => {
  let online = true;
  const url = '/assets/img/plantao/case.png?v=2';
  const f = workerFixture({ fetch: async req => { if (!online) throw Error('offline'); return resource(req, 'image'); } });
  const result = await f.run(url); await result.done();
  assert.equal(result.response.status, 200);
  const stored = await (await f.caches.open(f.PLANTAO_IMAGE_CACHE)).match(f.request(url));
  assert.ok(Number(stored.headers.get('sw-cached-at')) > 0);
  online = false;
  assert.equal((await f.run(url)).response.status, 200);
  assert.equal((await f.run(url + '&signature=private')).response, null);
});

test('install/activate purge owned legacy caches without touching unrelated caches', async () => {
  const f = workerFixture({ fetch: async req => resource(req) });
  for (const name of ['luria-pwa-v281-mobile-flow-static', 'luria-weekly-content-v1', 'luria-plantao-images-v3', 'unrelated-app']) {
    await f.caches.open(name);
  }
  await f.caches.open(f.RUNTIME_CACHE);
  await f.dispatch('install').done();
  assert.equal(f.skipped(), 1);
  assert.equal(f.calls.length, 0);
  await f.dispatch('activate').done();
  assert.equal(f.claimed(), 1);
  assert.ok(f.entries.has('unrelated-app'));
  assert.ok(f.entries.has(f.RUNTIME_CACHE));
  assert.deepEqual(f.deleted.sort(), ['luria-plantao-images-v3', 'luria-pwa-v281-mobile-flow-static', 'luria-weekly-content-v1'].sort());
  assert.equal(f.writes.filter(entry => entry.name === f.STATIC_CACHE).length, f.APP_SHELL.length);
});

test('optional shell resource failure cannot prevent activation or other public precache entries', async () => {
  const f = workerFixture({ fetch: async req => {
    if (req.url.includes('pwa-icon-192')) throw Error('optional unavailable');
    return resource(req);
  } });
  await f.dispatch('install').done(); await f.dispatch('activate').done();
  assert.equal(f.claimed(), 1);
  assert.ok(f.writes.some(entry => entry.url.endsWith('/dashboard/')));
  assert.ok(f.calls.some(entry => entry.request.url.includes('pwa-icon-192')));
  assert.ok(!f.writes.some(entry => entry.url.includes('pwa-icon-192')));
});

test('cache storage/quota unavailability never breaks successful online fetch', async () => {
  const f = workerFixture({ storageFailure: true, fetch: async req => resource(req, 'online') });
  const result = await f.run('/assets/js/app.js?v=2'); await result.done();
  assert.equal(await result.response.text(), 'online');
});

test('APP_SHELL contains existing public files and exact current foundational CSS versions', () => {
  const f = workerFixture();
  for (const url of f.APP_SHELL) {
    const file = url.split('?')[0].replace(/^\//, '') + (url.split('?')[0].endsWith('/') ? 'index.html' : '');
    assert.ok(fs.existsSync(path.resolve(__dirname, '..', file)), file);
    assert.equal(f.context.publicResource(f.request(url)), true, url);
  }
  assert.ok(f.APP_SHELL.includes('/assets/css/ui-v2-foundations.css?v=2'));
  assert.ok(!f.APP_SHELL.includes('/assets/css/ui-v2-foundations.css'));
  assert.ok(!f.APP_SHELL.includes('/assets/js/app.js'));
});
