const {test}=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const {JSDOM,VirtualConsole}=require('jsdom');
const theme=fs.readFileSync('assets/js/ui-theme-v2.js','utf8');
const settle=()=>new Promise(resolve=>setTimeout(resolve,60));
function fixture(t,page='flashcards'){
 const dom=new JSDOM(`<body data-ui-nav="v2" data-ui-context="study" ${page==='dashboard'?'id="traube-dashboard" data-dashboard-view="pending"':''}><div class="app-shell"><main class="main">Modelo inicial</main></div></body>`,{url:'https://traube.test/'+page+'/?source=test#section',runScripts:'outside-only',pretendToBeVisual:true,virtualConsole:new VirtualConsole()});
 const w=dom.window,b=w.document.body;let owner=null;
 w.matchMedia=()=>({matches:false,addEventListener(){}});
 w.TraubeLocalOwnerStore={read:()=>owner?JSON.stringify({appearance:'dark',identity:'pink'}):null};
 w.eval(theme);t.after(()=>w.close());
 return {w,b,account:()=>{owner='A';b.classList.add('app-ready');w.dispatchEvent(new w.Event('docmap:ready'));},navigation:()=>{b.dataset.uiNavigationReady='true';w.dispatchEvent(new w.Event('traube:ui-navigation-ready'));}};
}
test('startup waits for account theme and final navigation in either arrival order',async t=>{
 for(const first of ['account','navigation']){
  const f=fixture(t);await settle();assert.equal(f.b.dataset.uiStartup,'pending');
  assert.equal(f.w.document.querySelector('.ui-startup').getAttribute('role'),'status');
  if(first==='account'){f.account();await settle();assert.equal(f.b.dataset.uiStartup,'pending');f.navigation();}
  else{f.navigation();await settle();assert.equal(f.b.dataset.uiStartup,'pending');f.account();}
  await settle();assert.equal(f.b.dataset.uiStartup,'ready');assert.equal(f.b.dataset.uiAppearance,'dark');assert.equal(f.b.dataset.uiIdentity,'pink');assert.equal(f.w.document.querySelector('.ui-startup'),null);
 }
});
test('Dashboard is exposed only after its selected model or recovery state is prepared',async t=>{
 for(const recovery of [false,true]){
  const f=fixture(t,'dashboard');f.account();f.navigation();await settle();assert.equal(f.b.dataset.uiStartup,'pending');
  if(recovery){const fallback=f.w.document.createElement('section');fallback.id='dashboard-fallback-shell';f.b.querySelector('.main').append(fallback);}
  else f.b.dataset.dashboardView='cards';
  await settle();assert.equal(f.b.dataset.uiStartup,'ready');
 }
});
test('a failed or delayed startup retains a native reload link with the original route',async t=>{
 const f=fixture(t);await settle();assert.equal(f.b.dataset.uiStartup,'pending');assert.equal(f.w.document.querySelector('.ui-startup a').href,'https://traube.test/flashcards/?source=test#section');
});
