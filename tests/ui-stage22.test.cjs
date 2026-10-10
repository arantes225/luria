const {test} = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const {JSDOM} = require('jsdom');
const settle = () => new Promise(resolve => setImmediate(resolve));

function page(path) {
  const dom = new JSDOM(fs.readFileSync(path, 'utf8'), {
    url:'http://fixture.invalid/' + path.replace('index.html',''),
    runScripts:'outside-only', pretendToBeVisual:true
  });
  dom.window.HTMLElement.prototype.scrollIntoView = function() {};
  dom.window.scrollTo = () => {};
  dom.window.setInterval = () => 1;
  return dom;
}

test('community layout keeps friend lookup/addition and challenge, customization and room controls usable', async t => {
  const dom = page('amigos/index.html'), w = dom.window, d = w.document;
  t.after(() => w.close());
  w.eval(fs.readFileSync('tests/fixtures/supabase-browser.js','utf8'));
  w.docmapUser = w.__fixtureOwner;
  const originalRpc = w.supabaseClient.rpc;
  let friends = [], additions = 0;
  w.supabaseClient.rpc = async (name, args) => {
    if (name === 'my_friends') return {data:friends, error:null};
    if (name === 'lookup_luria_user') return {data:[{user_id:'friend-1',display_name:'Amigo de teste',luria_id:'FRND1234'}],error:null};
    if (name === 'add_friend_by_luria_id') {
      assert.equal(args.p_luria_id,'FRND1234'); additions++;
      friends = [{user_id:'friend-1',display_name:'Amigo de teste',luria_id:'FRND1234'}];
      return {data:null,error:null};
    }
    return originalRpc(name,args);
  };
  w.eval(fs.readFileSync('assets/js/studyrats.js','utf8'));
  w.eval(fs.readFileSync('assets/js/amigos.js','utf8'));
  await settle(); await settle();
  assert.equal(d.getElementById('my-luria-id').textContent,'TEST1234');
  assert.equal(d.getElementById('friends-ref-add-panel').hidden,false);
  assert.equal(d.getElementById('friends-inbox').hidden,false);
  d.getElementById('friend-id-input').value = 'FRND1234';
  d.getElementById('add-friend').click();
  await settle(); await settle();
  assert.equal(additions,1);
  assert.match(d.getElementById('friends-list').textContent,/Amigo de teste/);
  assert.equal(d.querySelectorAll('#studyrats-friends input').length,1);
  d.getElementById('studyrats-toggle-create').click();
  assert.equal(d.getElementById('studyrats-create').hidden,false);
  d.getElementById('studyrats-cancel').click();
  assert.equal(d.getElementById('studyrats-create').hidden,true);
  d.getElementById('studyrats-toggle-customize').click();
  assert.equal(d.getElementById('studyrats-customizer').hidden,false);
  d.getElementById('studyrats-toggle-customize').click();
  assert.equal(d.getElementById('studyrats-customizer').hidden,true);
  d.getElementById('friends-create-room-toggle').click();
  assert.equal(d.getElementById('friends-create-room-panel').hidden,false);
  assert.match(d.getElementById('friends-room-code').textContent,/^[A-Z2-9]{6}$/);
  assert.equal(d.activeElement.id,'friends-room-name');
  d.getElementById('friends-create-room-close').click();
  assert.equal(d.getElementById('friends-create-room-panel').hidden,true);
  assert.equal(d.querySelector('.community-nav a').pathname,'/amigos/');
});

test('emergency library exposes its existing empty state without changing the clinical engine', async t => {
  const dom = page('plantao/sala-emergencia/index.html'), w = dom.window, d = w.document;
  t.after(() => w.close());
  w.eval(fs.readFileSync('tests/fixtures/supabase-browser.js','utf8'));
  const originalRpc = w.supabaseClient.rpc;
  w.supabaseClient.rpc = async (name,args) => {
    if (name === 'list_active_clinical_case_summaries') return {data:[],error:null};
    if (name === 'has_interconsultation_access') return {data:false,error:null};
    return originalRpc(name,args);
  };
  w.PlantaoEngine = require('../assets/js/plantao-engine.js');
  w.PlantaoMonitor = {update(){},react(){}};
  w.eval(fs.readFileSync('assets/js/plantao.js','utf8'));
  await settle(); await settle();
  assert.equal(d.getElementById('plantao-case-count').textContent,'0');
  assert.equal(d.getElementById('plantao-empty').hidden,false);
  assert.match(d.getElementById('plantao-empty').textContent,/Nenhum caso/);
  d.querySelector('[data-case-library-view="library"]').click();
  assert.equal(d.body.dataset.caseLibraryView,'library');
  assert.equal(d.getElementById('plantao-empty').hidden,false);
});

test('statistics theme repaint preserves chart data and does not repeat database queries', async t => {
  const dom = page('estatisticas/index.html'), w = dom.window, d = w.document;
  t.after(() => w.close());
  w.eval(fs.readFileSync('tests/fixtures/supabase-browser.js','utf8'));
  w.docmapUser = w.__fixtureOwner;
  w.LuriaEntitlements = {enabled:() => true};
  let queries = 0;
  const from = w.supabaseClient.from;
  w.supabaseClient.from = (...args) => {queries++; return from(...args);};
  d.body.style.setProperty('--accent','#5275ad');
  d.body.style.setProperty('--muted','#5c6a81');
  d.body.style.setProperty('--border','#d4dbe5');
  const graphs = [];
  w.Chart = class {
    constructor(canvas, config) {Object.assign(this,config);this.updates=0;graphs.push(this);}
    update(mode) {assert.equal(mode,'none');this.updates++;}
    destroy() {}
    resize() {}
  };
  w.eval(fs.readFileSync('assets/js/estatisticas.js','utf8'));
  for (let i=0;i<8;i++) await settle();
  assert.ok(graphs.length > 0, 'charts were initialized from the real statistics module');
  const beforeQueries = queries;
  const beforeData = graphs.map(g => JSON.stringify({labels:g.data.labels,values:g.data.datasets.map(x=>x.data)}));
  d.body.style.setProperty('--accent','#d78fb1');
  d.body.style.setProperty('--muted','#adb0ba');
  d.body.style.setProperty('--border','#2f333d');
  d.body.dataset.uiAppearance='dark';
  d.body.dataset.uiIdentity='pink';
  await settle();
  assert.equal(queries,beforeQueries);
  assert.equal(graphs.length,beforeData.length);
  graphs.forEach((g,i)=>{
    assert.equal(JSON.stringify({labels:g.data.labels,values:g.data.datasets.map(x=>x.data)}),beforeData[i]);
    assert.equal(g.updates,1);
    assert.equal(g.options.plugins.legend.labels.font.size,13);
    assert.equal(g.options.plugins.legend.labels.color,'#adb0ba');
  });
  assert.ok(graphs.some(g=>g.data.datasets.some(s=>s.backgroundColor==='#d78fb1'||Array.isArray(s.backgroundColor)&&s.backgroundColor.includes('#d78fb1'))));
});

test('profile polish preserves existing menu nodes and handlers without duplicating icons', async t => {
  const dom = new JSDOM('<body data-ui-nav="v2" data-ui-context="study"><div class="app-shell"><aside id="sidebar"></aside><header class="topbar"><button id="luria-profile-toggle">T</button><div id="luria-profile-menu" hidden><a href="/configuracoes/#perfil">Perfil</a><button data-restart-onboarding>Refazer onboarding</button><a href="/configuracoes/">Configurações</a><button id="luria-profile-logout">Sair</button></div></header><main class="main"><div class="page"></div></main></div></body>', {url:'http://fixture.invalid/',runScripts:'outside-only',pretendToBeVisual:true});
  const w=dom.window,d=w.document;
  t.after(()=>w.close());
  w.matchMedia=()=>({matches:false,addEventListener(){}});
  const toggle=d.getElementById('luria-profile-toggle'), menu=d.getElementById('luria-profile-menu');
  const restart=d.querySelector('[data-restart-onboarding]'),logout=d.getElementById('luria-profile-logout');
  let restarts=0,logouts=0;
  toggle.addEventListener('click',()=>{menu.hidden=!menu.hidden;});
  restart.addEventListener('click',()=>{restarts++;});logout.addEventListener('click',()=>{logouts++;});
  w.eval(fs.readFileSync('assets/js/ui-navigation-v2.js','utf8'));
  for(let i=0;i<5;i++) await new Promise(resolve=>w.setTimeout(resolve,20));
  assert.equal(d.querySelectorAll('.ui-profile-account-item').length,4);
  assert.equal(d.querySelectorAll('.ui-profile-item-icon').length,4);
  assert.equal(d.getElementById('luria-profile-logout'),logout);
  assert.equal(d.querySelector('[data-restart-onboarding]'),restart);
  toggle.click();restart.click();logout.click();
  assert.equal(restarts,1);assert.equal(logouts,1);
  w.dispatchEvent(new w.Event('docmap:ready'));
  await new Promise(resolve=>w.setTimeout(resolve,30));
  assert.equal(d.querySelectorAll('.ui-profile-item-icon').length,4);
  assert.equal(d.querySelector('.ui-profile-account-label').textContent,'Conta');
  assert.equal(d.querySelector('.ui-profile-account-item').getAttribute('href'),'/configuracoes/#perfil');
  d.dispatchEvent(new w.KeyboardEvent('keydown',{key:'Escape'}));
  assert.equal(menu.hidden,true);
});
