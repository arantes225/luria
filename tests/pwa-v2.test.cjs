const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const { JSDOM } = require('jsdom');
const pwaSource = fs.readFileSync('assets/js/pwa.js', 'utf8');
const navigationSource = fs.readFileSync('assets/js/ui-navigation-v2.js', 'utf8');
const settle = () => new Promise(resolve => setImmediate(resolve));

function pwaFixture({ modern = true, installed = true } = {}) {
  const dom = new JSDOM(`<!doctype html><html><head><meta name="viewport" content="width=device-width, initial-scale=1"></head><body ${modern ? 'data-ui-nav="v2"' : ''}><button id="action">Abrir</button></body></html>`, {
    url: 'https://example.test/dashboard/',
    runScripts: 'outside-only',
    pretendToBeVisual: true
  });
  const { window: w } = dom;
  w.matchMedia = () => ({ matches: installed, addEventListener() {} });
  Object.defineProperty(w.navigator, 'standalone', { configurable: true, value: installed });
  w.eval(pwaSource);
  return dom;
}

test('installed v2 uses web responsive CSS instead of obsolete standalone overrides', () => {
  const dom = pwaFixture();
  const { document } = dom.window;
  assert.equal(document.documentElement.classList.contains('pwa-v2-standalone'), true);
  assert.equal(document.documentElement.classList.contains('pwa-standalone'), false);
  assert.equal(document.documentElement.dataset.pwa, 'standalone');
  assert.ok(document.getElementById('luria-pwa-v2-safe-area'));
  assert.match(document.getElementById('luria-pwa-v2-safe-area').textContent, /safe-area-inset-top/);
  assert.doesNotMatch(document.querySelector('meta[name="viewport"]').content, /user-scalable=no|maximum-scale=1/);
  const click = new dom.window.MouseEvent('dblclick', { bubbles: true, cancelable: true });
  document.getElementById('action').dispatchEvent(click);
  assert.equal(click.defaultPrevented, false);
  dom.window.close();
});

test('old screens keep their standalone class, browser mode keeps web layout', () => {
  const old = pwaFixture({ modern: false });
  assert.equal(old.window.document.documentElement.classList.contains('pwa-standalone'), true);
  assert.equal(old.window.document.getElementById('luria-pwa-v2-safe-area'), null);
  old.window.close();
  const browser = pwaFixture({ modern: true, installed: false });
  assert.equal(browser.window.document.documentElement.classList.contains('pwa-standalone'), false);
  assert.equal(browser.window.document.documentElement.classList.contains('pwa-v2-standalone'), false);
  browser.window.close();
});

test('mobile drawer restores button interaction even with a hidden persistent overlay', async () => {
  const dom = new JSDOM(`<!doctype html><body data-ui-nav="v2" data-ui-context="study">
    <div class="app-shell">
      <aside id="sidebar"><button id="sidebar-close" type="button">Fechar</button><nav><a href="/dashboard/">Dashboard</a></nav></aside>
      <div id="sidebar-backdrop"></div>
      <main class="main"><header class="topbar"><button id="menu-open" type="button">Menu</button></header>
        <button id="important-action" type="button">Começar</button>
        <div id="luria-search-overlay" hidden></div>
      </main>
    </div></body>`, { url: 'https://example.test/dashboard/', runScripts: 'outside-only', pretendToBeVisual: true });
  const w = dom.window;
  w.matchMedia = () => ({ matches: true, addEventListener() {} });
  w.eval(navigationSource);
  w.document.dispatchEvent(new w.Event('DOMContentLoaded'));
  await settle();
  const body = w.document.body;
  const main = w.document.querySelector('.main');
  let actions = 0;
  w.document.getElementById('important-action').addEventListener('click', () => actions++);
  w.document.getElementById('menu-open').click();
  await settle();
  assert.equal(body.classList.contains('sidebar-open'), true);
  assert.equal(main.inert, true);
  w.document.getElementById('sidebar-close').click();
  await settle();
  assert.equal(body.classList.contains('sidebar-open'), false);
  assert.equal(main.inert, false);
  w.document.getElementById('important-action').click();
  assert.equal(actions, 1);
  dom.window.close();
});

test('service worker preloads v2 assets and matches versioned offline code by pathname', () => {
  const sw = fs.readFileSync('service-worker.js', 'utf8');
  for (const asset of ['ui-v2-foundations.css', 'ui-navigation-v2.css', 'education-ui-v2.css', 'ui-navigation-v2.js', 'pwa.js']) {
    assert.ok(sw.includes('/assets/' + (asset.endsWith('.js') ? 'js/' : 'css/') + asset));
  }
  assert.match(sw, /ignoreSearch: true/);
});

test('dashboard layout choice is not replaced by layout 1 in installed mode', () => {
  const js = fs.readFileSync('assets/js/dashboard-layouts.js', 'utf8');
  assert.match(js, /const nextLayout = allowed\.has\(selected\) \? selected : "1"/);
  assert.doesNotMatch(js, /standalonePwa\s*\?\s*"1"/);
});

test('every redesigned core page loads the current PWA updater', () => {
  const paths = [
    'dashboard/index.html', 'aprender/index.html', 'consolidar/index.html',
    'cronograma/index.html', 'flashcards/index.html',
    'questoes-simulados/index.html', 'resolver-questoes/index.html',
    'caderno/index.html', 'caderno-erros/index.html', 'estatisticas/index.html',
    'amigos/index.html', 'apostilas/index.html'
  ];
  for (const page of paths) {
    const markup = fs.readFileSync(page, 'utf8');
    assert.match(markup, /pwa\.js\?v=20261010-pwa279/, page);
    assert.match(markup, /data-ui-nav="v2"/, page);
  }
});

test('installed PWA actively checks and offers current service worker on resume', () => {
  assert.match(pwaSource, /controllerchange/);
  assert.match(pwaSource, /luria-pwa-update-action/);
  assert.match(pwaSource, /updateViaCache:\s*"none"/);
  const worker = fs.readFileSync('service-worker.js', 'utf8');
  assert.match(worker, /luria-pwa-v279-installed-client-refresh/);
});
