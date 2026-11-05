const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const { JSDOM } = require('jsdom');
const html = fs.readFileSync('index.html', 'utf8');
const script = fs.readFileSync('assets/js/modo-estudo-landing.js', 'utf8');
const css = fs.readFileSync('assets/css/modo-estudo-landing.css', 'utf8');

function fixture(session = null) {
  const dom = new JSDOM(html, { url: 'http://localhost/', runScripts: 'outside-only', pretendToBeVisual: true });
  const redirects = [];
  dom.window.matchMedia = () => ({ matches: false, addEventListener() {}, removeEventListener() {} });
  dom.window.IntersectionObserver = class { observe() {} unobserve() {} disconnect() {} };
  dom.window.supabaseClient = { auth: { getSession: async () => ({ data: { session }, error: null }) } };
  dom.window.traubeSitePath = (p) => { redirects.push(p); return p; };
  return { dom, document: dom.window.document, redirects };
}

test('home landing has unique ids, a single h1 and the brand assets', () => {
  const dom = new JSDOM(html, { url: 'http://localhost/' });
  const doc = dom.window.document;
  const ids = [...doc.querySelectorAll('[id]')].map(n => n.id);
  assert.equal(new Set(ids).size, ids.length);
  assert.equal(doc.querySelectorAll('h1').length, 1);
  assert.ok(doc.querySelector('link[rel="manifest"]'));
  for (const file of ['ludwig-traube-retrato.webp', 'ludwig-traube-assinatura.webp']) {
    assert.ok(fs.existsSync('assets/img/traube/' + file), file);
    assert.ok(html.includes('/assets/img/traube/' + file), file);
  }
  dom.window.close();
});

test('every local image, stylesheet and script referenced by the home exists', () => {
  const refs = [...html.matchAll(/(?:src|href)="(\/[^"?#]+)/g)].map(m => m[1]).filter(p => /\.(png|jpe?g|webp|css|js|woff2)$/.test(p));
  assert.ok(refs.length > 5);
  for (const ref of refs) assert.ok(fs.existsSync(ref.slice(1)), ref);
});

test('home has no inline script and no invented plan price', () => {
  assert.equal(/<script(?![^>]*\bsrc=)[^>]*>/i.test(html), false);
  assert.equal(/R\$\s*\d/.test(html), false);
  assert.ok(html.includes('plan__price'));
});

test('motion respects prefers-reduced-motion', () => {
  assert.ok(/@media \(prefers-reduced-motion: reduce\)/.test(css));
  assert.ok(/matchMedia\('\(prefers-reduced-motion: reduce\)'\)/.test(script));
});

test('visitors without a session stay on the landing', async () => {
  const f = fixture(null);
  f.dom.window.eval(script);
  await new Promise(r => setTimeout(r, 20));
  assert.deepEqual(f.redirects, []);
  f.dom.window.close();
});

test('logged-in visitors are sent to the dashboard', async () => {
  const f = fixture({ user: { id: 'u1' } });
  try { f.dom.window.eval(script); } catch (_) {}
  await new Promise(r => setTimeout(r, 20));
  assert.deepEqual(f.redirects, ['/dashboard/']);
  f.dom.window.close();
});
