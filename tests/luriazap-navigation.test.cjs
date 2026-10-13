const {test} = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const {JSDOM} = require('jsdom');
const source = fs.readFileSync('assets/js/app.js', 'utf8');
const markup = source.slice(source.indexOf('function sidebarMarkup('), source.indexOf('\nasync function carregarPerfil('));
const gateStart = source.indexOf('function aplicarEntitlementsNaNavegacao(');
const gate = source.slice(gateStart, source.indexOf('\nfunction ', gateStart + 1));

function fixture(page, entry) {
  const dom = new JSDOM('<body><aside id="sidebar"></aside></body>', {runScripts:'outside-only',url:'https://fixture.invalid/'});
  const w = dom.window;
  w.page = page;
  if (entry) w.document.body.dataset.plantaoEntry = entry;
  w.getProfileTitle = () => '';
  w.luriaLogoSourceForTheme = () => '/logo.png';
  w.luriaIcon = () => '';
  w.eval(markup);
  w.document.getElementById('sidebar').innerHTML = w.sidebarMarkup({email:'fixture@example.invalid'});
  return dom;
}

test('LuriaZap has its own active study link without activating the simulator', () => {
  for (const [page, entry, active] of [
    ['plantao', 'phone', '/plantao/luriazap/'],
    ['plantao', 'emergency', '/plantao/sala-emergencia/'],
    ['dashboard', null, '/dashboard/']
  ]) {
    const dom = fixture(page, entry), d = dom.window.document;
    try {
      const links = d.querySelectorAll('nav a.active');
      assert.equal(links.length, 1);
      assert.equal(links[0].getAttribute('href'), active);
      assert.equal(d.querySelectorAll('nav a[href="/plantao/luriazap/"]').length, 1);
      assert.equal(d.querySelector('nav a[href="/plantao/luriazap/"]').textContent.trim(), 'LuriaZap');
    } finally { dom.window.close(); }
  }
  const work = fixture('trabalho_dashboard');
  try { assert.equal(work.window.document.querySelector('nav a[href="/plantao/luriazap/"]'), null); }
  finally { work.window.close(); }
});

test('the independent link retains the existing Plantão entitlement gate', () => {
  for (const enabled of [true, false]) {
    const dom = fixture('plantao', 'phone'), w = dom.window;
    try {
      w.temFeature = (_, key) => key === 'plantao' && enabled;
      w.LuriaDialog = {alert(){}};
      const mapping = source.match(/const PLUS_NAV_FEATURES = \{[\s\S]*?\n\};/)[0];
      w.eval(mapping + '\n' + gate + '\naplicarEntitlementsNaNavegacao({});');
      for (const href of ['/plantao/luriazap/', '/plantao/sala-emergencia/']) {
        const link = w.document.querySelector(`nav a[href="${href}"]`);
        assert.equal(link.getAttribute('aria-disabled'), enabled ? null : 'true');
        if (!enabled) {
          const event = new w.MouseEvent('click', {bubbles:true,cancelable:true});
          assert.equal(link.dispatchEvent(event), false);
        }
      }
    } finally { w.close(); }
  }
});
