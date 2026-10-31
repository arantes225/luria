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
  const dom = new JSDOM(html, { url: 'https://traube.invalid/' + file });
  try {
    const doc = dom.window.document;
    const meta = doc.querySelector('meta[http-equiv="Content-Security-Policy"]');
    assert.equal(doc.querySelectorAll('meta[http-equiv="Content-Security-Policy"]').length, 1);
    const charset = doc.querySelector('meta[charset]');
    assert.ok(charset && charset.compareDocumentPosition(meta) & 4, 'charset precedes CSP');
    const resources = pages.resources?.[file] || {};
    assert.equal(meta.content, expectedPolicy(html, resources));
    const directives = Object.fromEntries(meta.content.split(';').map(d => d.trim().split(/\s+/)).map(([key, ...values]) => [key, values]));
    assert.deepEqual(directives['script-src-attr'], ["'none'"]);
    assert.ok(directives['script-src'].includes("'self'"));
    assert.ok(directives['script-src'].every(s => s === "'self'" || /^'sha256-[A-Za-z0-9+/]+=*'$/.test(s)
      || (resources.scriptSrc || []).includes(s) || resources.wasm && s === "'wasm-unsafe-eval'"));
    assert.deepEqual(directives['object-src'], ["'none'"]);
    assert.deepEqual(directives['base-uri'], ["'self'"]);
    assert.deepEqual(directives['form-action'], [resources.formAction || "'self'"]);
    for (const directive of ['style-src', 'font-src', 'connect-src', 'worker-src']) {
      assert.ok(!(directives[directive] || directives['default-src']).some(value => /^https:\/\/(?:cdn\.jsdelivr\.net|cdnjs\.cloudflare\.com)\/?$/.test(value)), directive);
    }
    if (resources.noBackend) assert.deepEqual(directives['connect-src'], ["'none'"]);
    else if (resources.localConnect) assert.deepEqual(directives['connect-src'], ["'self'"]);
    else {
      assert.ok(directives['connect-src'].includes('https://sxdsfklllilhdyuamvvg.supabase.co'));
      if (resources.websocket !== false) assert.ok(directives['connect-src'].includes('wss://sxdsfklllilhdyuamvvg.supabase.co'));
    }
    assert.ok(!directives['frame-ancestors'], 'must not claim header-only protection via meta');
    const firstResource = doc.querySelector('script,style,link[href],base');
    assert.ok(meta.compareDocumentPosition(firstResource) & 4, 'CSP precedes resource loading');
    const arbitrary = "document.body.dataset.cspInjected='executed';";
    assert.ok(!directives['script-src'].includes("'sha256-" + crypto.createHash('sha256').update(arbitrary).digest('base64') + "'"));
    for (const script of doc.scripts) {
      if (script.hasAttribute('src')) {
        if (new URL(script.src).origin === 'https://traube.invalid') {
          assert.ok(fs.existsSync(path.join(root, decodeURIComponent(new URL(script.src).pathname))), script.src);
        } else {
          assert.ok((resources.scriptSrc || []).includes(script.getAttribute('src')), script.src);
        }
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

test('calendar base action uses the migrated listener and the existing global callback', () => {
  const source = fs.readFileSync(path.join(root, 'assets/js/cronograma.js'), 'utf8');
  const start = source.indexOf('function bindBaseScheduleButton()');
  const end = source.indexOf('\nif (document.readyState', start);
  assert.ok(start >= 0 && end > start);
  const dom = new JSDOM('<button id="apply-base-schedule">Base</button>', {runScripts: 'outside-only'});
  try {
    let calls = 0;
    dom.window.applyTraubeGenericSchedule = () => { calls++; };
    dom.window.eval(source.slice(start, end) + '\nbindBaseScheduleButton();');
    dom.window.document.getElementById('apply-base-schedule').click();
    assert.equal(calls, 1);
    delete dom.window.applyTraubeGenericSchedule;
    dom.window.document.getElementById('apply-base-schedule').click();
    assert.equal(calls, 1);
  } finally { dom.window.close(); }
});

test('reviewed external paths do not authorize other CDN scripts', () => {
  const html = fs.readFileSync(path.join(root, 'cronograma/index.html'), 'utf8');
  const resources = pages.resources['cronograma/index.html'];
  assert.throws(() => expectedPolicy(html.replace('</body>', '<script src="https://cdnjs.cloudflare.com/unreviewed.js"></script></body>'), resources), /Review external/);
  assert.equal(expectedPolicy(html, resources), expectedPolicy(html.replace(/\r?\n/g, '\r\n'), resources));
});

test('Apostila fallback capture preserves all static and dynamic image behaviors', () => {
  const source = fs.readFileSync(path.join(root, 'assets/js/apostila-image-fallback.js'), 'utf8');
  const dom = new JSDOM('<!doctype html><head></head><body></body>', {runScripts:'outside-only'});
  try {
    const {window:w} = dom;
    // The listener starts before images exist and remains single when loaded again.
    w.eval(source); w.eval(source);
    w.document.body.innerHTML = '<figure><img data-apostila-image-fallback="display-sibling"><p hidden>Fonte</p></figure>'
      + '<figure><img data-apostila-image-fallback="hidden-sibling"><p hidden>Fonte</p></figure>'
      + '<figure><img data-apostila-image-fallback="ist-figure"><p>Fonte</p></figure>'
      + '<div><img data-apostila-image-fallback="candidate"></div><img id="ordinary">';
    for (const img of w.document.querySelectorAll('img')) img.dispatchEvent(new w.Event('error'));
    const [display, hidden, ist, candidate, ordinary] = w.document.querySelectorAll('img');
    assert.equal(display.style.display,'none');assert.equal(display.nextElementSibling.hidden,false);
    assert.equal(hidden.hidden,true);assert.equal(hidden.nextElementSibling.hidden,false);
    assert.equal(ist.closest('figure').classList.contains('ist-image-unavailable'),true);
    assert.equal(candidate.hidden,true);assert.equal(candidate.parentElement.textContent,'Imagem não carregada — confira a fonte no Admin');
    assert.equal(ordinary.hidden,false);assert.equal(ordinary.style.display,'');
  } finally {dom.window.close();}
});

test('Apostila pages with declarative fallbacks register capture before their static images', () => {
  for (const file of pages.filter(page=>page.startsWith('apostilas/') && page!=='apostilas/index.html')) {
    const html = fs.readFileSync(path.join(root,file),'utf8');
    const dom = new JSDOM(html);
    try {
      const doc=dom.window.document;
      // Not every public editorial chapter uses this fallback contract.
      if (!doc.querySelector('[data-apostila-image-fallback]')) continue;
      const helper=doc.querySelector('script[src="/assets/js/apostila-image-fallback.js"]');
      assert.ok(helper && doc.head.contains(helper),file);
      assert.equal(helper.hasAttribute('defer'),false);
      for (const img of doc.images) assert.ok(helper.compareDocumentPosition(img) & 4,file);
      assert.equal(doc.querySelectorAll('[onerror]').length,0,file);
    } finally {dom.window.close();}
  }
});

test('CSP inventory follows the tracked Pages publication filter', () => {
  const {publicFiles,isPublicFile}=require('../scripts/public-files.cjs');
  const files=publicFiles(root).filter(file=>file.endsWith('.html'));
  assert(files.length>=367);
  for(const page of ['new-page/index.html','aplicar/editais/index.html','editorial.html'])assert(isPublicFile(page));
  for(const page of ['tests/fixture.html','docs/example.html','supabase/function/index.html','node_modules/a.html','build/pages/index.html'])assert(!isPublicFile(page));
  assert.equal(new Set(pages).size,pages.length);
  assert.deepEqual([...pages].sort(),files.sort());
});

for (const slug of ['infeccoes-sexualmente-transmissiveis','vulvovaginites']) {
  test('Apostila fragment navigation handles encoded accents and aliases: '+slug, () => {
    const page='apostilas/'+slug+'/';
    const parsed=new JSDOM(fs.readFileSync(path.join(root,page,'index.html'),'utf8'));
    const source=[...parsed.window.document.scripts].find(s=>s.textContent.includes('function fragmentTarget')).textContent;
    assert.ok(parsed.window.document.getElementById('tricomoníase'));
    parsed.window.close();
    for (const suffix of ['', 'index.html']) {
      const dom=new JSDOM('<base href="/"><a class="book-outline-link" href="#tricomon%C3%ADase">Encoded</a>'
        +'<a class="book-outline-link" href="#tricomoníase">Accent</a>'
        +'<a class="book-outline-link" href="#%E0%A4%A">Malformed</a>'
        +'<section id="tricomoníase"></section>',{url:'https://traube.invalid/'+page+suffix+'?origin=test#tricomon%C3%ADase',runScripts:'outside-only'});
      try {
        const w=dom.window,scrolled=[],observed=[];
        let callback;
        w.HTMLElement.prototype.scrollIntoView=function(options){scrolled.push({target:this,options});};
        w.IntersectionObserver=class {constructor(fn){callback=fn;}observe(target){observed.push(target);}};
        assert.doesNotThrow(()=>w.eval(source));
        const target=w.document.getElementById('tricomoníase');
        const links=w.document.querySelectorAll('.book-outline-link');
        for (const link of [...links].slice(0,2)) {
          const event=new w.MouseEvent('click',{bubbles:true,cancelable:true});
          link.dispatchEvent(event);
          assert.equal(event.defaultPrevented,true);
          assert.equal(scrolled.at(-1).target,target);
          assert.equal(scrolled.at(-1).options.block,'start');
          assert.equal(w.location.pathname,'/'+page+suffix);
          assert.equal(w.location.search,'?origin=test');
          assert.equal(w.location.hash,'#tricomon%C3%ADase');
        }
        callback([{target,isIntersecting:true,boundingClientRect:{top:0}}]);
        assert.ok(links[0].classList.contains('is-active') && links[1].classList.contains('is-active'));
        assert.ok(observed.every(el=>el===target));
      } finally {dom.window.close();}
    }
  });
}

test('Amenorreia chapter links stay on its document despite the root base and index alias', () => {
  const html=fs.readFileSync(path.join(root,'apostilas/amenorreia/index.html'),'utf8');
  for(const suffix of ['', 'index.html']) {
    const dom=new JSDOM(html,{url:'https://traube.invalid/apostilas/amenorreia/'+suffix});
    try {
      const doc=dom.window.document;
      assert.equal(doc.querySelector('base').getAttribute('href'),'/');
      const links=[...doc.querySelectorAll('.book-outline-link')];
      assert.equal(links.length,17);
      for(const link of links) {
        const url=new URL(link.href);
        assert.equal(url.pathname,'/apostilas/amenorreia/');
        assert.ok(doc.getElementById(decodeURIComponent(url.hash.slice(1))));
      }
    } finally {dom.window.close();}
  }
});
