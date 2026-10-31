const {test} = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const {JSDOM} = require('jsdom');
const html=fs.readFileSync('dashboard/index.html','utf8');
const settingsHtml=fs.readFileSync('configuracoes/index.html','utf8');
const code=fs.readFileSync('assets/js/dashboard-cards.js','utf8');
const preferenceCode=fs.readFileSync('assets/js/dashboard-preferences.js','utf8');
const settingsCode=fs.readFileSync('assets/js/dashboard-layout-settings.js','utf8');
const app=fs.readFileSync('assets/js/app.js','utf8');
const featureCheck=app.slice(app.indexOf('function temFeature('),app.indexOf('function limiteFeature('));
const preference='luria:dashboard-layout';
function fixture({owner='A',storage=new Map(),failure=false,entitlements=null,admin=false}={}) {
  const dom=new JSDOM(html,{runScripts:'outside-only',pretendToBeVisual:true,url:'http://fixture.invalid/dashboard/'});
  const w=dom.window,d=w.document;let id=owner;
  d.body.dataset.dashboardPresentationReady='true';
  w.docmapUser=owner?{id:owner}:null;w.docmapEntitlements=entitlements;w.docmapIsAdmin=admin;
  w.TraubeLocalOwnerStore={
    get ownerId(){return id;},key:base=>id?base+':'+id:null,
    read:base=>{if(failure)throw Error('Storage blocked');return storage.get(base+':'+id);},
    write:(base,value)=>{if(failure)throw Error('Storage full');if(!id)return false;storage.set(base+':'+id,value);return true;},
    remove:base=>storage.delete(base+':'+id)
  };
  w.fetch=()=>{throw Error('Presentation must not fetch');};
  const metrics={answered:12};w.luriaDashboardMetrics=metrics;
  const root=d.createElement('div');root.id='dashboard-alternative';root.innerHTML='<button id="classic-action">Existing action</button>';d.querySelector('.topbar').after(root);
  let actions=0;const original=root.firstElementChild;original.onclick=()=>actions++;
  const settingsDom=new JSDOM(settingsHtml);d.body.insertAdjacentHTML('beforeend',settingsDom.window.document.querySelector('.dashboard-layout-setting').outerHTML);settingsDom.window.close();
  const alerts=[];w.TraubeDialog={alert:message=>alerts.push(message)};
  w.eval(featureCheck);w.eval(preferenceCode);w.eval(settingsCode);w.eval(code);
  return {dom,w,d,storage,root,original,metrics,alerts,actions:()=>actions,
    choose:view=>d.querySelector(`#dashboard-layout-options input[value="${view}"]`).click(),
    owner:value=>{id=value;w.docmapUser=value?{id:value}:null;w.dispatchEvent(new w.Event('luria:owner-changed'));}};
}
test('only two Settings choices; changing preference preserves classic DOM, actions and metrics',()=>{
  const f=fixture();try{
    assert.deepEqual([...f.d.querySelectorAll('#dashboard-layout-options input')].map(x=>x.value),['classic','cards']);
    assert.equal(f.d.querySelector('#dashboard-view-switch'),null);
    assert.equal(f.d.body.dataset.dashboardView,'classic');
    for(let i=0;i<10;i++){f.choose('cards');f.choose('classic');}
    f.original.click();assert.equal(f.actions(),1);assert.equal(f.root.firstElementChild,f.original);
    assert.equal(f.w.luriaDashboardMetrics,f.metrics);assert.deepEqual(f.metrics,{answered:12});
    f.choose('cards');assert.equal(f.d.getElementById('dashboard-apps').hidden,false);
    assert.equal(f.d.querySelector('#dashboard-layout-options input:checked').value,'cards');
  }finally{f.dom.window.close();}
});
test('Settings and Dashboard share one preference across reload, accounts and storage events',()=>{
  const storage=new Map(),a=fixture({storage});a.choose('cards');a.dom.window.close();const f=fixture({storage});
  try{
    assert.equal(f.d.body.dataset.dashboardView,'cards');f.owner('B');assert.equal(f.d.body.dataset.dashboardView,'classic');
    f.choose('cards');f.choose('classic');f.owner('A');assert.equal(f.d.body.dataset.dashboardView,'cards');
    storage.set(preference+':A','classic');f.w.dispatchEvent(new f.w.StorageEvent('storage',{key:preference+':A'}));
    assert.equal(f.d.body.dataset.dashboardView,'classic');assert.equal(f.d.querySelector('input:checked').value,'classic');
    f.choose('cards');f.owner(null);assert.equal(f.d.body.dataset.dashboardView,'classic');
    assert.equal(storage.get(preference+':A'),'cards');assert.equal(storage.get(preference+':B'),'classic');
    assert(!storage.has(preference+':null'));
  }finally{f.dom.window.close();}
});
test('numeric retired and invalid preferences migrate to Classic; guests and temporary selector are not adopted',()=>{
  for(const old of ['1','2','3','4','5','0','broken','',null]){
    const storage=new Map([['luria:dashboard-view:v1:A','cards'],[preference+':guest','cards']]);
    if(old!==null)storage.set(preference+':A',old);
    const f=fixture({storage});try{
      assert.equal(f.d.body.dataset.dashboardView,'classic');assert.equal(f.d.querySelector('input:checked').value,'classic');
      if(old!==null)assert.equal(storage.get(preference+':A'),'classic');
      assert(!storage.has('luria:dashboard-view:v1:A'));assert.equal(storage.get(preference+':guest'),'cards');
    }finally{f.dom.window.close();}
  }
});
test('blocked storage rejects an unsaved selection and keeps the safe Classic fallback',()=>{
  const f=fixture({failure:true});try{
    f.choose('cards');assert.equal(f.d.body.dataset.dashboardView,'classic');assert.equal(f.d.querySelector('input:checked').value,'classic');
    assert.match(f.d.getElementById('dashboard-layout-status').textContent,/Não foi possível salvar/);
    assert.equal(f.w.TraubeDashboardPreference.write('2'),false);
  }finally{f.dom.window.close();}
});
test('cleanup failure cannot invalidate an already saved Cards preference',()=>{
  const f=fixture({storage:new Map([[preference+':A','cards']])});try{
    f.w.TraubeLocalOwnerStore.remove=()=>{throw Error('Cleanup blocked');};
    assert.equal(f.w.TraubeDashboardPreference.read(),'cards');
  }finally{f.dom.window.close();}
});
test('all card actions use existing access decisions without duplicate legacy alerts',()=>{
  const f=fixture({entitlements:{features:{flashcards:{enabled:false}}}});try{
    const card=f.d.querySelector('[data-dashboard-feature="flashcards"]');let legacy=0;card.addEventListener('click',e=>{legacy++;e.preventDefault();});
    const click=()=>card.dispatchEvent(new f.w.MouseEvent('click',{bubbles:true,cancelable:true}));
    assert.equal(click(),false);assert.equal(f.alerts.length,1);assert.equal(legacy,0);
    f.w.docmapEntitlements.features.flashcards.enabled=true;f.w.dispatchEvent(new f.w.Event('docmap:access-updated'));
    assert.equal(click(),true);assert.equal(legacy,0);f.owner(null);assert.equal(click(),false);
    f.owner('A');f.w.docmapIsAdmin=true;f.w.dispatchEvent(new f.w.Event('docmap:access-updated'));
    for(const link of f.d.querySelectorAll('[data-dashboard-app]'))assert.equal(link.dispatchEvent(new f.w.MouseEvent('click',{bubbles:true,cancelable:true})),true);
  }finally{f.dom.window.close();}
});
test('16 real local module routes grouped once into five categories; approved CSP unchanged',()=>{
  const dom=new JSDOM(html),d=dom.window.document;try{
    const links=[...d.querySelectorAll('[data-dashboard-app]')];assert.equal(links.length,16);assert.equal(new Set(links.map(x=>x.getAttribute('href'))).size,16);
    assert.deepEqual([...d.querySelectorAll('.dashboard-app-category')].map(x=>x.querySelectorAll('[data-dashboard-app]').length),[6,4,2,3,1]);
    for(const link of links){const href=link.getAttribute('href');assert(!href.startsWith('/trabalho/'));assert(fs.existsSync('.'+href+'index.html'),href);assert(link.querySelector('svg'));}
    const {expectedPolicy,pages}=require('../scripts/sync-csp.cjs');
    for(const path of ['dashboard/index.html','configuracoes/index.html','configuracoes.html']){
      const text=fs.readFileSync(path,'utf8'),parsed=new JSDOM(text);
      assert.equal(parsed.window.document.querySelector('[http-equiv="Content-Security-Policy"]').content,expectedPolicy(text,pages.resources?.[path]),path);parsed.window.close();
    }
  }finally{dom.window.close();}
});
test('the actual renderer retains Classic agenda, study session, streak and progress for old and new preferences',()=>{
  const renderer=fs.readFileSync('assets/js/dashboard-layouts.js','utf8').split('/* PWA dashboard topbar')[0];
  assert(!/function layout[2345]\(/.test(renderer));
  for(const value of ['1','2','3','4','5','classic','cards']){
    const f=fixture({storage:new Map([[preference+':A',value]])});try{
      f.root.remove();f.w.luriaCurrentStreak=3;f.w.luriaDashboardAreaSummary=[{area:'Clínica',completed:2,total:4}];
      f.w.eval(renderer);const root=f.d.getElementById('dashboard-alternative');
      assert.equal(root.dataset.rendered,'true');assert(root.querySelector('.dl-layout-1'));
      assert(root.querySelector('[data-luria-study-start]'));assert(root.querySelector('.dl-agenda-large'));
      assert.match(root.querySelector('.dl-streak').textContent,/3 dias seguidos/);assert.match(root.querySelector('.dl-areas').textContent,/50%/);
      const action=root.querySelector('[data-luria-study-start]');f.w.dispatchEvent(new f.w.Event('docmap:ready'));assert.equal(root.querySelector('[data-luria-study-start]'),action);
      assert.equal(f.d.body.dataset.dashboardView,value==='cards'?'cards':'classic');
    }finally{f.dom.window.close();}
  }
});

