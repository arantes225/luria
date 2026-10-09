const {test}=require('node:test'),assert=require('node:assert/strict'),vm=require('node:vm');
const {source}=require('./fixtures/app-client.cjs');
const turn=()=>new Promise(resolve=>setImmediate(resolve));
async function fixture(deferLoad=false){
  const elements={},requests=[];let stored={note:''};
  const el=id=>elements[id]??=( {value:'',textContent:'',hidden:false,addEventListener(type,fn){this[type]=fn},focus(){}} );
  const note=el('note');note.dataset={chartField:'note'};
  const c={document:{getElementById:el,querySelectorAll:()=>[note]},location:{hash:''},URLSearchParams,history:{replaceState(){}},confirm:()=>true,setTimeout:()=>1,clearTimeout(){},fetch:async(_url,options)=>{
    const body=JSON.parse(options.body);
    if(body.action==='load'&&!deferLoad)return {ok:true,json:async()=>({chart:{content:stored}})};
    if(body.action==='load')return new Promise(resolve=>requests.push({body,finish(content){resolve({ok:true,json:async()=>({chart:{content}})})}}));
    return new Promise(resolve=>requests.push({body,finish(ok=true){if(ok)stored=body.action==='clear'?{}:body.content;resolve({ok,json:async()=>({expires_at:null})});}}));
  }};
  vm.runInNewContext(source('assets/js/quick-chart-external.js'),c);
  if(!deferLoad){el('external-username').value='fixture-user';el('external-pin').value='0000';await el('external-enter').click();}
  return {el,note,requests,stored:()=>stored};
}
test('quick chart serializes saves and confirms the latest editor value',async()=>{
  const f=await fixture();f.note.value='FIRST';const a=f.el('external-save').click();await turn();
  f.note.value='LATEST';const b=f.el('external-save').click();await turn();assert.equal(f.requests.length,1);
  f.requests[0].finish();await turn();assert.equal(f.requests.length,2);f.requests[1].finish();await Promise.all([a,b]);
  assert.equal(f.stored().note,'LATEST');assert.equal(f.note.value,'LATEST');assert.equal(f.el('external-save-state').textContent,'Salvo agora');
});
test('quick chart waits for in-flight save before clear and preserves edits made during clear',async()=>{
  const f=await fixture();f.note.value='BEFORE';const saving=f.el('external-save').click();await turn();
  const clearing=f.el('external-clear').click();await turn();assert.equal(f.requests.length,1);
  f.requests[0].finish();await turn();assert.equal(f.requests[1].body.action,'clear');
  f.note.value='AFTER';const after=f.el('external-save').click();f.requests[1].finish();await turn();
  f.requests[2].finish();await Promise.all([saving,clearing,after]);assert.equal(f.note.value,'AFTER');assert.equal(f.stored().note,'AFTER');
});

async function managerFixture(signInImmediately=false){
 const {ownerFixture}=require('./fixtures/app-client.cjs');const f=ownerFixture(signInImmediately?null:"A"),c=f.context;await c.LuriaLocalOwnerStore.ready;
 const elements={},requests=[],loads=[];
 const el=id=>elements[id]??={value:'',textContent:'',disabled:false,addEventListener(type,fn){this[type]=fn}};
 c.document={getElementById:el};c.location={search:'',origin:'https://fixture.invalid'};
 c.supabaseClient.from=table=>{let owner,payload;const query={
  select(){return this},eq(_,id){owner=id;return this},
  maybeSingle:async()=>{loads.push({table,owner});return {data:table==='profiles'?{username:owner.toLowerCase()}:null,error:null}},
  upsert(value){payload=value;return this},
  single(){return new Promise(resolve=>requests.push({payload,finish(){resolve({data:payload,error:null})}}))},
  then(resolve){requests.push({payload,finish(){resolve({error:null})}})}
 };return query};
 vm.runInContext(source('assets/js/quick-chart-manager.js'),c);if(signInImmediately)f.change('A');await turn();
 return {...f,el,requests,loads};
}
test('internal chart serializes save/clear and preserves subsequent edits',async()=>{
 const f=await managerFixture(),note=f.el('quick-chart-note');note.value='BEFORE';
 const saving=f.el('quick-chart-save-note').click();await turn();const clearing=f.el('quick-chart-clear').click();await turn();
 assert.equal(f.requests.length,1);f.requests[0].finish();await turn();assert.equal(f.requests.length,2);
 note.value='AFTER';const next=f.el('quick-chart-save-note').click();f.requests[1].finish();await turn();assert.equal(f.requests.length,3);
 f.requests[2].finish();await Promise.all([saving,clearing,next]);assert.equal(note.value,'AFTER');assert.equal(f.requests[2].payload.content.note,'AFTER');
});
test('internal chart clears owner data and ignores an old account save response',async()=>{
 const f=await managerFixture(),note=f.el('quick-chart-note');note.value='A PRIVATE';
 const pending=f.el('quick-chart-save-note').click();await turn();f.change('B');assert.equal(note.value,'');
 f.requests[0].finish();await pending;await turn();assert.equal(note.value,'');assert.equal(f.el('quick-chart-public-address').textContent,'https://fixture.invalid/b');
 note.value='B PRIVATE';const second=f.el('quick-chart-save-note').click();await turn();assert.equal(f.requests[1].payload.owner_id,'B');f.requests[1].finish();await second;
 f.change(null);assert.equal(note.value,'');
});

test('internal chart initializes once when initial Auth and owner event overlap',async()=>{
 const f=await managerFixture(true);assert.equal(f.loads.length,2,'one profile and one chart request');
});

test('public chart ignores a late login response after another portal was selected',async()=>{
 const f=await fixture(true);
 f.el('external-username').value='account-a';f.el('external-pin').value='0000';const a=f.el('external-enter').click();await turn();
 f.el('external-username').value='account-b';f.el('external-pin').value='1111';const b=f.el('external-enter').click();await turn();
 f.requests[0].finish({note:'A PRIVATE'});await turn();assert.equal(f.note.value,'');assert.equal(f.requests[1].body.username,'account-b');
 f.requests[1].finish({note:'B PRIVATE'});await Promise.all([a,b]);assert.equal(f.note.value,'B PRIVATE');
});
