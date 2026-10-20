const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const origin = 'https://pwa.example.test';
const source = fs.readFileSync(path.join(__dirname, '../../service-worker.js'), 'utf8');

// Cache API simulation only; policy/strategies always execute the actual worker.
function workerFixture({ fetch: network = async () => { throw new Error('offline'); }, storageFailure = false } = {}) {
  const entries = new Map(), listeners = {}, calls = [], writes = [], deleted = [], timers = new Map();
  let timerId = 0, skipped = 0, claimed = 0;
  const key = value => new URL(typeof value === 'string' ? value : value.url, origin).href;
  const caches = {
    async match() { throw new Error('Global cache search is prohibited in this fixture'); },
    async keys() { return [...entries.keys()]; },
    async delete(name) { deleted.push(name); return entries.delete(name); },
    async open(name) {
      if (storageFailure) throw new Error('Storage disabled');
      if (!entries.has(name)) entries.set(name, new Map());
      const cache = entries.get(name);
      return {
        async match(request) {
          const entry = cache.get(key(request));
          if (!entry) return undefined;
          const vary = (entry.response.headers.get('Vary') || '').split(',').map(x => x.trim()).filter(Boolean);
          const headers = new Headers(typeof request === 'string' ? {} : request.headers);
          if (vary.some(header => header === '*' || headers.get(header) !== entry.headers.get(header))) return undefined;
          return entry.response.clone();
        },
        async put(request, response) {
          const text = await response.clone().text();
          writes.push({ name, url: key(request), text });
          cache.set(key(request), { response: response.clone(), headers: new Headers(request.headers) });
        },
        async keys() { return [...cache.keys()].map(url => new Request(url)); },
        async delete(request) { return cache.delete(key(request)); },
      };
    },
  };
  const context = vm.createContext({ URL, Request, Response, Headers, console,
    setTimeout(fn, ms) { const id = ++timerId; timers.set(id, { fn, ms }); return id; },
    clearTimeout(id) { timers.delete(id); }, caches,
    fetch: async (request, init) => { calls.push({ request, init }); return network(request, init); },
    self: { location: { origin }, addEventListener: (name, listener) => { listeners[name] = listener; },
      skipWaiting: async () => { skipped++; }, clients: { claim: async () => { claimed++; } } },
  });
  vm.runInContext(source, context, { filename: 'service-worker.js' });
  const config = JSON.parse(vm.runInContext('JSON.stringify({STATIC_CACHE,RUNTIME_CACHE,WEEKLY_CONTENT_CACHE,PLANTAO_IMAGE_CACHE,APP_SHELL,INSTALL_PRECACHE:[...INSTALL_PRECACHE]})', context));
  function request(url, { mode, ...options } = {}) {
    const req = new Request(new URL(url, origin), options);
    if (mode) Object.defineProperty(req, 'mode', { value: mode });
    return req;
  }
  async function seed(name, url, response, options) { await (await caches.open(name)).put(request(url, options), response); }
  function dispatch(name, extra = {}) {
    const pending = []; let response;
    listeners[name]({ ...extra, respondWith(promise) { response = Promise.resolve(promise); }, waitUntil(promise) { pending.push(promise); } });
    return { response, pending, done: () => Promise.all(pending) };
  }
  async function run(url, options) {
    const result = dispatch('fetch', { request: request(url, options) });
    return { ...result, response: result.response ? await result.response : null };
  }
  return { ...config, origin, caches, context, calls, writes, entries, deleted, timers, request, seed, dispatch, run,
    skipped: () => skipped, claimed: () => claimed,
    timeout(ms) { for (const { fn, ms: delay } of timers.values()) if (delay === ms) fn(); },
  };
}
function resource(url, body = 'public resource', headers = {}, status = 200) {
  const pathname = new URL(typeof url === 'string' ? url : url.url, origin).pathname;
  const type = pathname.endsWith('.css') ? 'text/css' : pathname.endsWith('.js') ? 'text/javascript'
    : pathname.endsWith('.json') ? 'application/json' : pathname.endsWith('.webmanifest') ? 'application/manifest+json'
    : pathname.endsWith('.woff2') ? 'font/woff2' : pathname.endsWith('.wasm') ? 'application/wasm'
    : /\.(png|svg|webp)$/.test(pathname) ? 'image/png' : 'text/html';
  return new Response(body, { status, headers: { 'Content-Type': type, ...headers } });
}
module.exports = { workerFixture, resource };
