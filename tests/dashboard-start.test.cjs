const {test}=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs');
const {JSDOM,VirtualConsole}=require('jsdom');
const html=fs.readFileSync('dashboard/index.html','utf8');
const cardsCode=fs.readFileSync('assets/js/dashboard-cards.js','utf8');
const preferenceCode=fs.readFileSync('assets/js/dashboard-preferences.js','utf8');
function fixture(t,{preference='cards',presentation=false}={}){
  const dom=new JSDOM(html,{url:'https://luria.test/dashboard/',runScripts:'outside-only',pretendToBeVisual:true,virtualConsole:new VirtualConsole()});
  const w=dom.window,d=w.document;let id=null,settle;
  const storage=new Map([['luria:dashboard-layout:A',preference]]);
  w.LuriaLocalOwnerStore={get ownerId(){return id;},ready:new Promise(resolve=>{settle=resolve}),key:base=>id?base+':'+id:null,read:base=>id?storage.get(base+':'+id):null,write:()=>true,remove:()=>{}};
  if(presentation)d.body.dataset.dashboardPresentationReady='true';
  w.eval(preferenceCode);w.eval(cardsCode);
  t.after(()=>w.close());
  return {w,d,resolve:async()=>{id='A';settle(id);await Promise.resolve();},ready:()=>{d.body.dataset.dashboardPresentationReady='true';w.dispatchEvent(new w.Event('luria:dashboard-presentation-ready'));}};
}
test('saved Cards is never preceded by Classic while Auth resolves the account',async t=>{
  const f=fixture(t);assert.equal(f.d.body.dataset.dashboardView,'pending');
  f.w.dispatchEvent(new f.w.Event('pageshow'));f.w.dispatchEvent(new f.w.Event('docmap:ready'));
  f.ready();assert.equal(f.d.body.dataset.dashboardView,'pending');
  await f.resolve();assert.equal(f.d.body.dataset.dashboardView,'cards');
  assert.equal(f.d.getElementById('dashboard-apps').hidden,false);
  assert.equal(f.d.getElementById('dashboard-loading').hidden,true);
  assert.equal(f.d.getElementById('dashboard-content').getAttribute('aria-busy'),'false');
});
test('Classic waits for account preference and final presentation, regardless of their order',async t=>{
  for(const first of ['owner','presentation']){
    const f=fixture(t,{preference:'classic'});assert.equal(f.d.body.dataset.dashboardView,'pending');
    if(first==='owner'){await f.resolve();assert.equal(f.d.body.dataset.dashboardView,'pending');f.ready();}
    else{f.ready();assert.equal(f.d.body.dataset.dashboardView,'pending');await f.resolve();}
    assert.equal(f.d.body.dataset.dashboardView,'classic');
    assert.equal(f.d.getElementById('dashboard-loading').hidden,true);
  }
});
test('startup has an accessible loading/retry state before scripts are available',()=>{
  const dom=new JSDOM(html,{virtualConsole:new VirtualConsole()}),d=dom.window.document;
  assert.equal(d.body.dataset.dashboardView,'pending');
  assert.equal(d.getElementById('dashboard-content').getAttribute('aria-busy'),'true');
  assert.equal(d.getElementById('dashboard-loading').getAttribute('role'),'status');
  assert.equal(d.querySelector('#dashboard-loading a').getAttribute('href'),'/dashboard/');dom.window.close();
});
