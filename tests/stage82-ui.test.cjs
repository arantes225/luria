const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const { fixture } = require('./fixtures/plantao.cjs');
const cases = require('../data/plantao-cases-v2.json');
const tick = () => new Promise(resolve => setTimeout(resolve, 20));

test('emergency: OSCE control removed, return opens case library without browser history', async () => {
  const f = await fixture();
  try {
    const doc = f.el('plantao-library').ownerDocument;
    assert.equal(doc.querySelector('[data-case-library-view="osce"]'), null);
    assert.equal(doc.body.dataset.caseLibraryView, 'home');
    await f.click('data-start-case', cases[0].id);
    assert.equal(f.el('plantao-simulator').hidden, false);
    f.el('plantao-back').click();
    await tick();
    assert.equal(doc.body.dataset.caseLibraryView, 'library');
    assert.equal(f.el('plantao-library').hidden, false);
    assert.equal(f.el('plantao-simulator').hidden, true);
    assert.equal(doc.defaultView.location.pathname, '/plantao/sala-emergencia/');
    assert.deepEqual(f.errors, []);
  } finally { f.close(); }
});

test('emergency: return preserves the selected library view and specialty', async () => {
  const f = await fixture();
  try {
    await f.click('data-case-library-view', 'library');
    const doc=f.el('plantao-library').ownerDocument;
    const chip=doc.querySelector('[data-specialty-chip="Clínica Médica"]');
    chip.click();
    await f.click('data-start-case', cases[0].id);
    f.el('plantao-back').click();
    await tick();
    assert.equal(doc.body.dataset.caseLibraryView, 'library');
    assert.equal(doc.querySelector('[data-specialty-chip="Clínica Médica"]').classList.contains('active'),true);
    assert.deepEqual(f.errors, []);
  } finally { f.close(); }
});

const { page, read, settle } = require('./fixtures/frontend.cjs');
async function community(t, hash = '') {
  const f = page(t, 'amigos/index.html'), {w,d} = f, calls = [];
  w.history.replaceState(null, '', '/amigos/' + hash);
  let friends = [{user_id:'friend-1',display_name:'Amiga de teste',luria_id:'FRIEND01'}];
  w.docmapUser = {id:'owner'};
  w.LuriaDialog = {confirm:async()=>true};
  w.supabaseClient = {
    rpc:async(name,args)=>{
      calls.push({name,args});
      if(name==='my_friends')return {data:friends,error:null};
      if(name==='lookup_luria_user')return {data:[{user_id:'friend-2',display_name:'Novo amigo',luria_id:'FRIEND02'}],error:null};
      if(name==='add_friend_by_luria_id')friends=[...friends,{user_id:'friend-2',display_name:'Novo amigo',luria_id:args.p_luria_id}];
      if(name==='remove_friend')friends=friends.filter(f=>f.user_id!==args.p_friend_user_id);
      return {data:[],error:null};
    },
    from:()=>({select(){return this},eq(){return this},maybeSingle:async()=>({data:{luria_id:'OWNER001',studyrat_variant:'blue'},error:null})}),
    channel:()=>({on(){return this},subscribe(){return this}}), removeChannel(){}
  };
  w.eval(read('assets/js/studyrats.js'));
  w.eval(read('assets/js/amigos.js'));
  w.eval(read('assets/js/community-navigation.js'));
  await settle();await tick();
  return {...f,calls};
}
test('community: three accessible areas, deep links and keyboard navigation', async t => {
  const {w,d,errors}=await community(t,'#studyrats-card');
  const friends=d.getElementById('community-tab-friends'),rooms=d.getElementById('community-tab-rooms');
  assert.equal(d.querySelectorAll('.community-nav [role="tab"]').length,3);
  assert.equal(d.getElementById('community-friends-panel').hidden,false);
  assert.equal(d.getElementById('community-rooms-panel').hidden,true);
  assert.equal(d.getElementById('friends-ref-add-toggle').hidden,false);
  rooms.click();
  assert.equal(d.getElementById('community-rooms-panel').hidden,false);
  rooms.dispatchEvent(new w.KeyboardEvent('keydown',{key:'Home',bubbles:true,cancelable:true}));
  await tick();
  assert.equal(d.activeElement,friends);
  assert.equal(friends.getAttribute('aria-selected'),'true');
  assert.equal(d.getElementById('community-rooms-panel').hidden,true);
  w.history.replaceState(null,'','/amigos/#community-rooms');
  w.dispatchEvent(new w.HashChangeEvent('hashchange'));
  assert.equal(d.getElementById('community-friends-panel').hidden,true);
  assert.deepEqual(errors,[]);
});
test('community: existing challenge draft survives tab switches; cancel still works', async t => {
  const {w,d,errors}=await community(t);
  const title=d.getElementById('studyrats-challenge-title');
  d.getElementById('community-tab-friends').click();await tick();
  d.getElementById('studyrats-toggle-create').click();
  assert.equal(d.getElementById('studyrats-create').hidden,false);
  title.value='Rascunho preservado';
  d.getElementById('community-tab-rooms').click();await tick();
  d.getElementById('community-tab-friends').click();await tick();
  assert.equal(d.getElementById('studyrats-challenge-title'),title);
  assert.equal(title.value,'Rascunho preservado');
  assert.equal(d.getElementById('studyrats-create').hidden,false);
  d.getElementById('studyrats-cancel').click();
  assert.equal(d.getElementById('studyrats-create').hidden,true);
  assert.deepEqual(errors,[]);
});
test('community: existing add/remove and challenge submission retain their RPC payloads', async t => {
  const {w,d,calls,errors}=await community(t);
  assert.match(d.getElementById('friends-list').textContent,/Amiga de teste/);
  const input=d.getElementById('friend-id-input');input.value='FRIEND02';
  d.getElementById('add-friend').click();await tick();
  assert.equal(calls.filter(c=>c.name==='add_friend_by_luria_id').length,1);
  assert.match(d.getElementById('friends-list').textContent,/Novo amigo/);
  d.querySelector('[data-remove-friend="friend-2"]').click();await tick();
  assert.equal(calls.filter(c=>c.name==='remove_friend').length,1);
  assert.doesNotMatch(d.getElementById('friends-list').textContent,/Novo amigo/);
  d.getElementById('community-tab-rooms').click();await tick();
  d.getElementById('studyrats-toggle-create').click();
  d.getElementById('studyrats-challenge-title').value='Semana de revisão';
  d.querySelector('#studyrats-friends input[value="friend-1"]').checked=true;
  d.getElementById('studyrats-start').click();await tick();
  const create=calls.filter(c=>c.name==='create_studyrats_challenge_v2');
  assert.equal(create.length,1);assert.equal(create[0].args.p_title,'Semana de revisão');
  assert.deepEqual(Array.from(create[0].args.p_friend_user_ids),['friend-1']);
  assert.equal(d.getElementById('studyrats-create').hidden,true);
  assert.deepEqual(errors,[]);
});
test('community: no duplicate component IDs and initialization remains single', async t => {
  const {w,d,errors}=await community(t);
  const ids=[...d.querySelectorAll('[id]')].map(e=>e.id);
  assert.equal(new Set(ids).size,ids.length);
  const list=d.getElementById('friends-list');
  w.eval(read('assets/js/community-navigation.js'));
  d.getElementById('community-tab-rooms').click();await tick();
  d.getElementById('community-tab-friends').click();await tick();
  assert.equal(d.getElementById('friends-list'),list);
  assert.equal(d.getElementById('community-tab-friends').getAttribute('aria-selected'),'true');
  assert.deepEqual(errors,[]);
});

test('community: switching tabs preserves query parameters despite the root base URL', async t => {
  const {w,d,errors}=await community(t);
  w.history.replaceState(null,'','/amigos/?reference=kept');
  d.getElementById('community-tab-rooms').click();
  assert.equal(w.location.pathname,'/amigos/');assert.equal(w.location.search,'?reference=kept');
  assert.equal(w.location.hash,'#community-rooms');
  d.getElementById('community-tab-friends').click();
  assert.equal(w.location.search,'?reference=kept');
  assert.equal(w.location.hash,'#community-friends');
  assert.deepEqual(errors,[]);
});
