const {test}=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const {workerFixture,resource}=require('./fixtures/service-worker.cjs');
const {JSDOM}=require('jsdom');
const navigation=fs.readFileSync('assets/js/ui-navigation-v2.js','utf8');
const settle=()=>new Promise(resolve=>setTimeout(resolve,35));
function trackObservers(w) {
 const observers=[];const Observer=w.MutationObserver;
 w.MutationObserver=class extends Observer {constructor(callback){super(callback);observers.push(this)}};
 return ()=>{observers.forEach(observer=>observer.disconnect());w.close()};
}

test('installed study navigation reuses permitted routes, highlights sections and opens More',async()=>{
 const dom=new JSDOM(`<html data-pwa="standalone"><body data-ui-nav="v2" data-ui-context="study" data-page="flashcards"><div class="app-shell"><aside id="sidebar" class="sidebar"><div class="sidebar-top"></div><button id="sidebar-close">Fechar</button><nav><a href="/dashboard/">Início</a><a href="/aprender/">Aprender</a><a href="/consolidar/">Consolidar</a></nav></aside><div id="sidebar-backdrop"></div><main class="main"><header class="topbar"><button id="menu-open">Menu</button></header><div id="traube-search-overlay" hidden></div></main></div></body>`,{url:'https://example.test/flashcards/',runScripts:'outside-only',pretendToBeVisual:true});
 const w=dom.window;const close=trackObservers(w);w.matchMedia=()=>({matches:true,addEventListener(){}});w.eval(navigation);w.document.dispatchEvent(new w.Event('DOMContentLoaded'));await settle();
 const rail=w.document.getElementById('ui-mobile-navigation');assert.ok(rail);assert.equal(rail.querySelectorAll('a').length,3);assert.equal(rail.querySelector('[aria-current="page"]').getAttribute('href'),'/consolidar/');
 rail.querySelector('button').click();assert.equal(w.document.body.classList.contains('sidebar-open'),true);
 w.document.dispatchEvent(new w.KeyboardEvent('keydown',{key:'Escape',bubbles:true}));assert.equal(w.document.body.classList.contains('sidebar-open'),false);assert.equal(rail.querySelector('button').getAttribute('aria-expanded'),'false');
 w.document.getElementById('sidebar').classList.add('updated');await settle();assert.equal(w.document.querySelectorAll('#ui-mobile-navigation').length,1);close();
});

test('no bottom navigation is invented for missing or hidden account routes',async()=>{
 const dom=new JSDOM('<html data-pwa="standalone"><body data-ui-nav="v2"><aside id="sidebar"><nav><a href="/dashboard/">Início</a></nav></aside></body>',{url:'https://example.test/',runScripts:'outside-only',pretendToBeVisual:true});
 const close=trackObservers(dom.window);dom.window.matchMedia=()=>({matches:true,addEventListener(){}});dom.window.eval(navigation);dom.window.document.dispatchEvent(new dom.window.Event('DOMContentLoaded'));await settle();assert.equal(dom.window.document.getElementById('ui-mobile-navigation'),null);close();
});

test('cached script renders without waiting for a stalled connection',async()=>{
 const f=workerFixture({fetch:()=>new Promise(()=>{})});
 await f.seed(f.RUNTIME_CACHE,'/assets/js/app.js?v=release',resource('/assets/js/app.js','cached script'));
 const {response}=await f.run('/assets/js/app.js?v=release');assert.equal(await response.text(),'cached script');
});
test('cached page falls back after bounded network wait and refresh completes in background',async()=>{
 let complete;const f=workerFixture({fetch:()=>new Promise(resolve=>complete=resolve)});
 await f.seed(f.RUNTIME_CACHE,'/dashboard/',resource('/dashboard/','cached page'));f.writes.length=0;
 const pending=f.run('/dashboard/',{mode:'navigate'});await new Promise(resolve=>setImmediate(resolve));f.timeout(2500);
 const {response,pending:background}=await pending;assert.equal(await response.text(),'cached page');
 complete(resource('/dashboard/','fresh page'));await Promise.all(background);assert.deepEqual(f.writes.map(write=>write.text),['fresh page']);
});
test('uncached offline public navigation returns a usable response instead of undefined',async()=>{
 const f=workerFixture();const {response}=await f.run('/flashcards/',{mode:'navigate'});assert.equal(response.status,503);assert.match(await response.text(),/Sem conexão/);
});

test('PWA update leaves editing uninterrupted and reuses worker registration',async()=>{
 const dom=new JSDOM('<html><head></head><body data-ui-nav="v2"><textarea>Minha anotação</textarea></body>',{url:'https://example.test/',runScripts:'outside-only',pretendToBeVisual:true});
 const w=dom.window;let registrations=0,updates=0;const sw=new w.EventTarget();sw.controller={};sw.register=async()=>{registrations++;return {update:async()=>updates++}};
 Object.defineProperty(w.navigator,'serviceWorker',{value:sw});w.matchMedia=()=>({matches:true});w.eval(fs.readFileSync('assets/js/pwa.js','utf8'));w.dispatchEvent(new w.Event('load'));await settle();sw.dispatchEvent(new w.Event('controllerchange'));
 assert.ok(w.document.getElementById('traube-pwa-update-action'));assert.equal(w.document.querySelector('textarea').value,'Minha anotação');w.dispatchEvent(new w.Event('online'));await settle();assert.equal(registrations,1);assert.ok(updates>=2);dom.window.close();
});
