const {test}=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const vm=require('node:vm');
const {JSDOM}=require('jsdom');
const navigation=fs.readFileSync('assets/js/ui-navigation-v2.js','utf8');
const settle=()=>new Promise(resolve=>setTimeout(resolve,35));
function trackObservers(w) {
 const observers=[];const Observer=w.MutationObserver;
 w.MutationObserver=class extends Observer {constructor(callback){super(callback);observers.push(this)}};
 return ()=>{observers.forEach(observer=>observer.disconnect());w.close()};
}

test('installed study navigation reuses permitted routes, highlights sections and opens More',async()=>{
 const dom=new JSDOM(`<html data-pwa="standalone"><body data-ui-nav="v2" data-ui-context="study" data-page="flashcards"><div class="app-shell"><aside id="sidebar" class="sidebar"><div class="sidebar-top"></div><button id="sidebar-close">Fechar</button><nav><a href="/dashboard/">Início</a><a href="/aprender/">Aprender</a><a href="/consolidar/">Consolidar</a></nav></aside><div id="sidebar-backdrop"></div><main class="main"><header class="topbar"><button id="menu-open">Menu</button></header><div id="luria-search-overlay" hidden></div></main></div></body>`,{url:'https://example.test/flashcards/',runScripts:'outside-only',pretendToBeVisual:true});
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

function workerFixture({cached,fetch,timeout}={}) {
 const listeners={},writes=[];let timer;
 const context={URL,Request,Response,Promise,console,clearTimeout:()=>{},setTimeout:fn=>{timer=fn;return 1},fetch:fetch||(()=>new Promise(()=>{})),caches:{match:async()=>cached?.clone(),open:async()=>({put:async(req,response)=>writes.push(await response.text()),keys:async()=>[],match:async()=>cached?.clone()})},self:{location:{origin:'https://example.test'},addEventListener:(name,fn)=>listeners[name]=fn}};
 vm.runInNewContext(fs.readFileSync('service-worker.js','utf8'),context);
 return {writes,run:async(path,mode='cors')=>{let response;const pending=[];listeners.fetch({request:{method:'GET',url:'https://example.test'+path,mode},respondWith:p=>response=p,waitUntil:p=>pending.push(p)});await new Promise(resolve=>setImmediate(resolve));if(timeout)timer?.();return {response:await response,pending}}};
}
test('cached script renders without waiting for a stalled connection',async()=>{
 const f=workerFixture({cached:new Response('cached script')});const {response}=await f.run('/assets/js/app.js?v=release');assert.equal(await response.text(),'cached script');
});
test('cached page falls back after bounded network wait and refresh completes in background',async()=>{
 let complete;const f=workerFixture({cached:new Response('cached page'),fetch:()=>new Promise(resolve=>complete=resolve),timeout:true});const {response,pending}=await f.run('/dashboard/','navigate');assert.equal(await response.text(),'cached page');complete(new Response('fresh page'));await Promise.all(pending);assert.deepEqual(f.writes,['fresh page']);
});
test('uncached offline navigation returns a usable response instead of undefined',async()=>{
 const f=workerFixture({fetch:async()=>{throw new Error('offline')}});const {response}=await f.run('/unknown/','navigate');assert.equal(response.status,503);assert.match(await response.text(),/Sem conexão/);
});

test('PWA update leaves editing uninterrupted and reuses worker registration',async()=>{
 const dom=new JSDOM('<html><head></head><body data-ui-nav="v2"><textarea>Minha anotação</textarea></body>',{url:'https://example.test/',runScripts:'outside-only',pretendToBeVisual:true});
 const w=dom.window;let registrations=0,updates=0;const sw=new w.EventTarget();sw.controller={};sw.register=async()=>{registrations++;return {update:async()=>updates++}};
 Object.defineProperty(w.navigator,'serviceWorker',{value:sw});w.matchMedia=()=>({matches:true});w.eval(fs.readFileSync('assets/js/pwa.js','utf8'));w.dispatchEvent(new w.Event('load'));await settle();sw.dispatchEvent(new w.Event('controllerchange'));
 assert.ok(w.document.getElementById('luria-pwa-update-action'));assert.equal(w.document.querySelector('textarea').value,'Minha anotação');w.dispatchEvent(new w.Event('online'));await settle();assert.equal(registrations,1);assert.ok(updates>=2);dom.window.close();
});
