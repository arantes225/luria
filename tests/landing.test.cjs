const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const { JSDOM } = require('jsdom');
const html = fs.readFileSync('index.html', 'utf8');
const script = fs.readFileSync('assets/js/landing.js', 'utf8');

function fixture() {
  const dom = new JSDOM(html, { url: 'http://localhost/', runScripts: 'outside-only' });
  let calls = 0;
  dom.window.supabaseClient = { auth: { getSession: async () => {
    calls += 1;
    return { data: { session: null }, error: null };
  } } };
  dom.window.eval(script);
  return { dom, document: dom.window.document, calls: () => calls };
}

test('landing retains unique control references and identifies its illustrative preview', () => {
  const dom = new JSDOM(html);
  const doc = dom.window.document;
  const ids = [...doc.querySelectorAll('[id]')].map(node => node.id);
  assert.equal(new Set(ids).size, ids.length);
  assert.equal(doc.querySelectorAll('h1').length, 1);
  const toggle = doc.getElementById('mobile-nav-toggle');
  const nav = doc.getElementById(toggle.getAttribute('aria-controls'));
  assert.equal(nav.getAttribute('role'), 'navigation');
  assert.ok(nav.getAttribute('aria-label'));
  const preview = doc.querySelector('.product-preview');
  assert.equal(preview.getAttribute('role'), 'img');
  assert.ok(preview.getAttribute('aria-label'));
  assert.equal(preview.querySelectorAll('a,button,input,select,textarea').length, 0);
  assert.equal(preview.querySelector('.preview-sidebar').getAttribute('role'), 'presentation');
  dom.window.close();
});

test('landing reuses the identical logo asset for its images and favicon', () => {
  assert.deepEqual(fs.readFileSync('assets/img/logos/logo-principal.png'), fs.readFileSync('assets/img/logos/logo-icone-original.png'));
  const dom = new JSDOM(html, { url: 'http://localhost/' });
  const logo = dom.window.document.querySelector('.landing-brand img').src;
  assert.equal(dom.window.document.querySelector('.preview-brand-row img').src, logo);
  assert.equal(dom.window.document.querySelector('link[rel="icon"]').href, logo);
  dom.window.close();
});

test('mobile navigation keeps click/link behavior and Escape restores its trigger', () => {
  const f = fixture();
  const toggle = f.document.getElementById('mobile-nav-toggle');
  const nav = f.document.getElementById('mobile-nav');
  for (const target of [toggle, nav.querySelector('a')]) {
    toggle.click();
    assert.equal(nav.hidden, false);
    assert.equal(toggle.getAttribute('aria-expanded'), 'true');
    target.focus();
    target.dispatchEvent(new f.dom.window.KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));
    assert.equal(nav.hidden, true);
    assert.equal(toggle.getAttribute('aria-expanded'), 'false');
    assert.equal(toggle.getAttribute('aria-label'), 'Abrir menu');
    assert.equal(f.document.activeElement, toggle);
  }
  toggle.click();
  nav.querySelector('a').click();
  assert.equal(nav.hidden, true);
  toggle.click();
  toggle.click();
  assert.equal(nav.hidden, true);
  assert.equal(f.document.getElementById('footer-year').textContent, String(new Date().getFullYear()));
  assert.equal(f.calls(), 1);
  f.dom.window.close();
});

test('Escape outside the mobile disclosure does not change other controls', () => {
  const f = fixture();
  f.document.getElementById('mobile-nav-toggle').click();
  const faq = f.document.querySelector('summary');
  faq.dispatchEvent(new f.dom.window.KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));
  assert.equal(f.document.getElementById('mobile-nav').hidden, false);
  assert.equal(faq.parentElement.open, false);
  f.dom.window.close();
});
