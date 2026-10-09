const {test}=require('node:test');
const assert=require('node:assert/strict');
const vm=require('node:vm');
const {ownerFixture,source}=require('./fixtures/app-client.cjs');
const turn=()=>new Promise(resolve=>setImmediate(resolve));
async function passometroFixture() {
  const f=ownerFixture(),c=f.context;await c.LuriaLocalOwnerStore.ready;
  const timers=new Map(),cloud=new Map(),writes=[];let sequence=0;
  Object.assign(c,{STORAGE_KEY:'luria:passometro:v1',SYNC_TABLE:'fixture',RETENTION_MS:1e12,state:{decks:[],userId:'A',syncTimer:null},renderDecks(){},$:()=>({hidden:false,reset(){},replaceChildren(){}}),closeDialog(){},resetPatientForm(){},setTimeout:fn=>{timers.set(++sequence,fn);return sequence},clearTimeout:id=>timers.delete(id)});
  c.supabaseClient.from=()=>({select:()=>({eq:async(_,id)=>({data:[...cloud.values()].filter(x=>x.user_id===id)})}),upsert:async row=>{writes.push(row);cloud.set(row.user_id+':'+row.deck_id,{...row});return {}},delete:()=>({eq:(_,owner)=>({eq:async(_,id)=>{cloud.delete(owner+':'+id);return {}}})})});
  const html=source('trabalho/passometro/index.html');
  vm.runInContext(html.slice(html.indexOf('    function localDecks(){'),html.indexOf('    function activeDeck(){')),c);
  const hook=html.indexOf('    window.addEventListener("luria:owner-changed"');
  vm.runInContext(html.slice(hook,html.indexOf('    window.addEventListener("focus"',hook)),c);
  return {...f,cloud,writes,timers,tick:async()=>{const pending=[...timers.values()];timers.clear();for(const fn of pending)await fn();await turn();}};
}
const deck=id=>({id,createdAt:Date.now(),updatedAt:Date.now(),patients:[{name:'FICTITIOUS'}]});
test('Passometro leaves ownerless legacy untouched and restores only the current account',async()=>{
  const f=await passometroFixture(),c=f.context;
  c.localStorage.setItem(c.STORAGE_KEY,JSON.stringify([deck('LEGACY')]));
  c.state.decks=[deck('A_ONLY')];c.persistLocal();
  f.change('B');await c.load();assert.equal(c.state.decks.length,0);assert.equal(f.writes.length,0);
  f.change('A');await c.load();assert.equal(c.state.decks[0].id,'A_ONLY');
  assert.equal(JSON.parse(c.localStorage.getItem(c.STORAGE_KEY))[0].id,'LEGACY');
});
test('Passometro drops a queued write after changing accounts',async()=>{
  const f=await passometroFixture();f.context.queueDeckSync(deck('A_PENDING'));f.change('B');await f.tick();assert.equal(f.writes.length,0);
});
async function timerFixture() {
  const f=ownerFixture(),c=f.context;await c.LuriaLocalOwnerStore.ready;
  const inserts=[];let clock=Date.now(),fail=false;
  c.Date=class extends Date{static now(){return clock}};
  c.document={addEventListener(){}};c.setTimeout=()=>1;c.clearTimeout=()=>{};c.crypto=require('node:crypto').webcrypto;
  c.supabaseClient.from=()=>({insert:async p=>{inserts.push(p);return {error:fail?{message:'FAKE_FAILURE'}:null}}});
  const app=source('assets/js/app.js'),a=app.indexOf('(function installLuriaStudyTimer()');
  vm.runInContext(app.slice(a,app.indexOf('})();',a)+5),c);await turn();
  return {...f,inserts,advance:ms=>{clock+=ms},fail:value=>{fail=value}};
}
test('timer never adopts an unowned session and restores the right owner',async()=>{
  const f=await timerFixture(),c=f.context,t=c.LuriaStudyTimer;
  await t.start('A_STUDY');f.advance(2000);t.pause();f.change('B');assert.equal(t.getState(),null);
  f.change('A');assert.equal(t.getState().kind,'A_STUDY');assert.equal(t.getElapsedSeconds(),2);
});
test('timer coalesces concurrent finishes and retains a failed session before starting another',async()=>{
  const f=await timerFixture(),t=f.context.LuriaStudyTimer;
  await t.start('FIRST');f.advance(5000);
  await Promise.all([t.finish(),t.finish()]);assert.equal(f.inserts.length,1);assert.equal(t.getState(),null);
  await t.start('UNSAVED');f.advance(3000);f.fail(true);await t.start('REPLACEMENT');
  assert.equal(t.getState().kind,'UNSAVED');assert.equal(t.getElapsedSeconds(),3);
  f.fail(false);await t.start('REPLACEMENT');assert.equal(t.getState().kind,'REPLACEMENT');
});
test('timer response for A cannot clear a new session belonging to B',async()=>{
  const f=await timerFixture(),c=f.context,t=c.LuriaStudyTimer;let resolve;
  c.supabaseClient.from=()=>({insert:()=>new Promise(done=>{resolve=done})});
  await t.start('A');f.advance(2000);const pending=t.finish();await turn();
  f.change('B');await t.start('B');resolve({error:null});await pending;
  assert.equal(t.getState().kind,'B');assert.equal(t.getState().ownerId,'B');
});
test('Passometro schedules independent decks and does not recreate a queued deletion',async()=>{
  const f=await passometroFixture(),c=f.context;
  c.state.decks=[deck('ONE'),deck('TWO')];c.save('ONE');c.save('TWO');await f.tick();
  assert.deepEqual(f.writes.map(x=>x.deck_id).sort(),['ONE','TWO']);
  c.queueDeckSync(c.state.decks[0]);await c.deleteRemoteDeck('ONE');await f.tick();
  assert.equal(f.cloud.has('A:ONE'),false);
});
test('Passometro removes a clean stale local copy after remote deletion',async()=>{
  const f=await passometroFixture(),c=f.context;c.state.decks=[deck('REMOVED')];c.save('REMOVED');await f.tick();
  f.cloud.clear();await c.refreshFromCloud({migrateLocal:true});assert.equal(c.state.decks.length,0);assert.equal(f.cloud.size,0);
});
test('Passometro retains failed writes and retries after reconnect',async()=>{
  const f=await passometroFixture(),c=f.context,original=c.supabaseClient.from;
  c.supabaseClient.from=()=>({upsert:async()=>({error:{message:'FAKE_OFFLINE'}})});
  c.state.decks=[deck('OFFLINE')];c.save('OFFLINE');await f.tick();assert.ok(c.syncMeta().dirty.OFFLINE);
  c.supabaseClient.from=original;await c.syncWhenReady();assert.ok(f.cloud.has('A:OFFLINE'));assert.equal(c.syncMeta().dirty.OFFLINE,undefined);
});
test('timer does not discard an in-memory session when local storage refuses writes',async()=>{
  const f=await timerFixture(),c=f.context;c.localStorage.setItem=()=>{throw new Error('FAKE_QUOTA')};
  await c.LuriaStudyTimer.start('UNSAVED');f.advance(2000);await c.LuriaStudyTimer.start('NEW');
  assert.equal(c.LuriaStudyTimer.getState().kind,'UNSAVED');assert.equal(f.inserts.length,0);
});
module.exports={passometroFixture,timerFixture,deck,turn};

test('Passometro refuses a stale migration snapshot after a local tombstone',async()=>{
 const f=await passometroFixture(),c=f.context,d=deck('DELETED');
 await c.deleteRemoteDeck(d.id);
 assert.equal(await c.upsertDeck(d,'A'),false);
 assert.equal(f.writes.length,0);assert.equal(f.cloud.size,0);
});
test('timer never inserts twice when cleanup fails after the server acknowledges',async()=>{
 const f=await timerFixture(),c=f.context,t=c.LuriaStudyTimer;
 await t.start('CLEANUP');f.advance(2000);
 const remove=c.localStorage.removeItem;c.localStorage.removeItem=()=>{throw Error('FAKE_QUOTA')};
 assert.equal(await t.finish(),false);assert.equal(f.inserts.length,1);assert.equal(t.getState().kind,'CLEANUP');
 c.localStorage.removeItem=remove;assert.equal(await t.finish(),true);assert.equal(f.inserts.length,1);assert.equal(t.getState(),null);
});

test('Passometro closes and clears clinical dialogs when the owner changes',async()=>{
 const {JSDOM}=require('jsdom');const f=await passometroFixture(),c=f.context;
 const html=source('trabalho/passometro/index.html'),dom=new JSDOM(html);try{
  c.document=dom.window.document;c.$=selector=>c.document.querySelector(selector);c.$$=selector=>[...c.document.querySelectorAll(selector)];
  c.syncAllOtherFields=()=>{};c.syncGoFields=()=>{};c.setSwitch=(k,v)=>{c.state.switches[k]=v};
  vm.runInContext(html.slice(html.indexOf('    function closeDialog(id){'),html.indexOf('    $$("[data-close-dialog]")')),c);
  vm.runInContext(html.slice(html.indexOf('    function resetPatientForm(){'),html.indexOf('    function setSwitch(')),c);
  const dialog=c.$('#pm-patient-dialog');dialog.setAttribute('open','');
  c.$('#pm-patient-form input[name="name"]').value='A PRIVATE';c.$('#pm-view-paper').textContent='A PRIVATE';
  f.change('B');assert.equal(dialog.hasAttribute('open'),false);assert.equal(c.$('#pm-patient-form input[name="name"]').value,'');assert.equal(c.$('#pm-view-paper').textContent,'');
 }finally{dom.window.close()}
});
