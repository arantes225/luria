const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');
const { JSDOM } = require('jsdom');
const { expectedPolicy, pages } = require('../scripts/sync-csp.cjs');
const root = path.join(__dirname, '..');

for (const file of pages) test('CSP: ' + file, () => {
  const html = fs.readFileSync(path.join(root, file), 'utf8');
  const dom = new JSDOM(html, { url: 'https://luria.invalid/' + file });
  try {
    const doc = dom.window.document;
    const meta = doc.querySelector('meta[http-equiv="Content-Security-Policy"]');
    assert.equal(meta.content, expectedPolicy(html));
    const directives = Object.fromEntries(meta.content.split(';').map(d => d.trim().split(/\s+/)).map(([key, ...values]) => [key, values]));
    assert.deepEqual(directives['script-src-attr'], ["'none'"]);
    assert.ok(directives['script-src'].includes("'self'"));
    assert.ok(directives['script-src'].every(s => s === "'self'" || /^'sha256-[A-Za-z0-9+/]+=*'$/.test(s)));
    assert.deepEqual(directives['object-src'], ["'none'"]);
    assert.deepEqual(directives['base-uri'], ["'self'"]);
    assert.deepEqual(directives['form-action'], ["'self'"]);
    for (const directive of ['style-src', 'font-src', 'connect-src', 'worker-src']) {
      assert.ok(!directives[directive].some(value => /(?:cdn\.jsdelivr\.net|cdnjs\.cloudflare\.com)/.test(value)), directive);
    }
    assert.ok(directives['connect-src'].includes('https://sxdsfklllilhdyuamvvg.supabase.co'));
    assert.ok(directives['connect-src'].includes('wss://sxdsfklllilhdyuamvvg.supabase.co'));
    assert.ok(!directives['frame-ancestors'], 'must not claim header-only protection via meta');
    const firstResource = doc.querySelector('script,style,link[href],base');
    assert.ok(meta.compareDocumentPosition(firstResource) & 4, 'CSP precedes resource loading');
    const arbitrary = "document.body.dataset.cspInjected='executed';";
    assert.ok(!directives['script-src'].includes("'sha256-" + crypto.createHash('sha256').update(arbitrary).digest('base64') + "'"));
    for (const script of doc.scripts) {
      if (script.hasAttribute('src')) {
        assert.equal(new URL(script.src).origin, 'https://luria.invalid');
        assert.ok(fs.existsSync(path.join(root, decodeURIComponent(new URL(script.src).pathname))), script.src);
      } else if (script.textContent.trim()) {
        const hash = crypto.createHash('sha256').update(script.textContent).digest('base64');
        assert.ok(directives['script-src'].includes("'sha256-" + hash + "'"));
      }
    }
  } finally { dom.window.close(); }
});

test('CSP generator rejects inline event attributes and javascript URLs', () => {
  const html = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
  for (const injection of ['<button onclick="alert(1)">x</button>', '<a href="javascript:alert(1)">x</a>']) {
    assert.throws(() => expectedPolicy(html.replace('</body>', injection + '</body>')), /Migrate inline/);
  }
});

test('CSP hashes survive CRLF and reject stale script content', () => {
  const html = fs.readFileSync(path.join(root, 'login/index.html'), 'utf8');
  assert.equal(expectedPolicy(html.replace(/\r?\n/g, '\n')), expectedPolicy(html.replace(/\r?\n/g, '\r\n')));
  assert.notEqual(expectedPolicy(html.replace('history.replaceState', 'history.pushState')), expectedPolicy(html));
});

test('CSP generator refuses unreviewed external and data script loaders', () => {
  const html = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
  for (const src of ['https://unreviewed.invalid/a.js', '//unreviewed.invalid/a.js', 'data:text/javascript,alert(1)']) {
    assert.throws(() => expectedPolicy(html.replace('</body>', '<script src="' + src + '"></script></body>')), /Review external/);
  }
});
