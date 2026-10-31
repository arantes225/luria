const {test} = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const {JSDOM,VirtualConsole} = require('jsdom');
const read=path=>fs.readFileSync(path,'utf8');
const turn=()=>new Promise(resolve=>setImmediate(resolve));
async function settle(){for(let i=0;i<6;i++)await turn();}
const deferred=()=>{let resolve;const promise=new Promise(done=>{resolve=done;});return{promise,resolve};};
const draft=id=>({id:'record-'+id,patient_id:'patient-'+id,user_id:id,initials:'DEMO-'+id,care_info:'PRIVATE-'+id,started_at:new Date(Date.now()-3000).toISOString(),ended_at:null,mode:'adult',weight:70,shock_count:0,rhythm:null,events:[{clock:'12:00:00',elapsed:'+00:00',action:'EVENT-'+id,detail:'SYNTHETIC'}]});
function fixture(t,{history=false,drafts=['A'],initialAuth=null,globalOwnership=false}={}) {
  const path=history?'trabalho/pcr/historico/index.html':'trabalho/pcr/executar/index.html';
  const errors=[],console=new VirtualConsole();
  console.on('jsdomError',error=>{if(!/navigation/i.test(error.message))errors.push(error);});
  const dom=new JSDOM(read(path),{runScripts:'outside-only',url:'http://fixture.invalid/'+path,virtualConsole:console});
  const w=dom.window;t.after(()=>w.close());
  w.HTMLDialogElement.prototype.showModal=function(){this.open=true;};
  w.HTMLDialogElement.prototype.close=function(){this.open=false;};
  w.HTMLElement.prototype.scrollIntoView=function(){};w.confirm=()=>true;
  let owner='A',sequence=0,now=Date.now(),authListener;
  const intervals=new Map(),timeouts=new Map(),rpcCalls=[],queries=[],loads=new Map(),authQueue=[],rpcQueue=[],audio=[];
  if(initialAuth)authQueue.push(initialAuth);
  w.Date.now=()=>now;
  w.setInterval=(fn,ms)=>{intervals.set(++sequence,{fn,ms});return sequence;};w.clearInterval=id=>intervals.delete(id);
  w.setTimeout=(fn,ms)=>{timeouts.set(++sequence,{fn,ms});return sequence;};w.clearTimeout=id=>timeouts.delete(id);
  let audioGate=null;
  w.Audio=class{constructor(){this.pauses=0;audio.push(this);}setAttribute(){}play(){return audioGate?audioGate.promise:Promise.resolve();}pause(){this.pauses++;}};
  w.TraubeLocalOwnerStore={ownerId:owner,ready:Promise.resolve(owner)};
  for(const id of drafts)w.localStorage.setItem('luria_pcr_draft_v1_'+id,JSON.stringify(draft(id)));
  w.supabaseClient={auth:{onAuthStateChange(listener){authListener=listener;return{data:{subscription:{unsubscribe(){}}}};},getSession(){const id=owner;const gate=authQueue.shift();return gate?gate.promise:Promise.resolve({data:{session:id?{user:{id}}:null}});}},
    rpc(name,args){rpcCalls.push({name,args,authOwner:owner});const gate=rpcQueue.shift();return gate?gate.promise:Promise.resolve({data:args.payload.id,error:null});},
    from(table){const query={table,action:'select',filters:{},values:null};
      const builder={select(){return this;},eq(key,value){query.filters[key]=value;return this;},order(){return this;},update(value){query.action='update';query.values=value;return this;},delete(){query.action='delete';return this;},
        then(resolve,reject){queries.push(query);const id=query.filters.user_id,gate=loads.get(id);const data=table==='pcr_patients'?[{id:'patient-'+id,user_id:id,initials:'HISTORY-'+id}]:[{...draft(id),ended_at:new Date().toISOString()}];return(gate?gate.promise:Promise.resolve({data,error:null})).then(resolve,reject);}};
      return builder;
    }};
  const pdfCalls=[];w.jspdf={jsPDF:class{setFont(){}splitTextToSize(s){pdfCalls.push(s);return[s];}text(){}addPage(){}setFontSize(){}save(name){pdfCalls.push(name);}}};
  if(globalOwnership){w.supabase={createClient:()=>w.supabaseClient};w.eval(read('assets/js/supabase.js'));}
  w.eval(read('assets/js/pcr-store.js'));
  w.eval(read(history?'assets/js/pcr-history.js':'assets/js/trabalho-pcr.js'));
  return {w,errors,intervals,timeouts,rpcCalls,queries,loads,authQueue,rpcQueue,audio,pdfCalls,
    change(id){owner=id;if(globalOwnership)authListener(id?'SIGNED_IN':'SIGNED_OUT',id?{user:{id}}:null);else{w.TraubeLocalOwnerStore.ownerId=id;w.dispatchEvent(new w.CustomEvent('luria:owner-changed',{detail:{ownerId:id}}));}},
    input(id,value){const el=w.document.getElementById(id);el.value=value;el.dispatchEvent(new w.Event('input',{bubbles:true}));},
    click(id){w.document.getElementById(id).click();},
    advance(ms){now+=ms;for(const timer of [...intervals.values()])if(timer.ms===1000)timer.fn();},
    holdAudio(gate){audioGate=gate;}};
}
test('PCR account A initializes its draft and keeps normal logging, timer and PDF behavior',async t=>{
  const f=fixture(t);await settle();
  assert.equal(f.w.document.getElementById('pcr-patient-initials').value,'DEMO-A');
  f.click('pcr-log-cpr');
  assert.equal(JSON.parse(f.w.localStorage.getItem('luria_pcr_draft_v1_A')).events[0].action,'Troca de compressor');
  f.advance(121000);assert.match(f.w.document.getElementById('pcr-cycle').textContent,/Ciclo 2/);
  f.click('pcr-export-log');assert.ok(f.pdfCalls.includes('Paciente: DEMO-A'));
  assert.deepEqual(f.errors,[]);
});
test('PCR logout clears patient data, notes, dialogs, timeline and timers immediately',async t=>{
  const f=fixture(t);await settle();f.click('pcr-add-note');f.input('pcr-note-text','PRIVATE NOTE A');
  f.change(null);
  assert.equal(f.w.document.getElementById('pcr-care-info').value,'');
  assert.equal(f.w.document.getElementById('pcr-note-text').value,'');
  assert.equal(f.w.document.getElementById('pcr-note-dialog').open,false);
  assert.equal(f.w.document.getElementById('pcr-log').textContent,'');
  assert.equal(f.intervals.size,0);assert.equal(f.timeouts.size,0);
  await settle();f.input('pcr-care-info','SIGNED OUT');
  assert.equal(JSON.parse(f.w.localStorage.getItem('luria_pcr_draft_v1_A')).care_info,'PRIVATE-A');
  assert.equal(f.rpcCalls.length,0);assert.equal(f.w.document.getElementById('pcr-rosc').disabled,true);
});
test('PCR A to B to A restores only owner-specific drafts without duplicate listeners',async t=>{
  const f=fixture(t,{drafts:['A','B']});await settle();
  for(const id of ['B','A','B','A']){
    f.change(id);assert.equal(f.w.document.getElementById('pcr-patient-initials').value,'');await settle();
    assert.equal(f.w.document.getElementById('pcr-patient-initials').value,'DEMO-'+id);
    assert.ok(!f.w.document.getElementById('pcr-log').textContent.includes('EVENT-'+(id==='A'?'B':'A')));
    assert.equal(f.intervals.size,2);assert.equal(f.w.document.querySelectorAll('.pcr-pwa-causes-host .pcr-causes-grid').length,1);
  }
  const before=JSON.parse(f.w.localStorage.getItem('luria_pcr_draft_v1_A')).events.length;
  f.click('pcr-log-cpr');assert.equal(JSON.parse(f.w.localStorage.getItem('luria_pcr_draft_v1_A')).events.length,before+1);
  f.input('pcr-care-info','NEW A');assert.equal(JSON.parse(f.w.localStorage.getItem('luria_pcr_draft_v1_B')).care_info,'PRIVATE-B');
});
test('PCR late initial A lookup cannot restore A after switching to B',async t=>{
  const gate=deferred(),f=fixture(t,{drafts:['A','B'],initialAuth:gate});await settle();
  f.change('B');await settle();gate.resolve({data:{session:{user:{id:'A'}}}});await settle();
  assert.equal(f.w.document.getElementById('pcr-patient-initials').value,'DEMO-B');
  assert.equal(f.intervals.size,2);assert.deepEqual(f.errors,[]);
});
test('PCR save awaiting authentication in A never sends a request after B becomes active',async t=>{
  const f=fixture(t,{drafts:['A','B']});await settle();const gate=deferred();f.authQueue.push(gate);
  f.click('pcr-rosc');await settle();f.change('B');await settle();
  gate.resolve({data:{session:{user:{id:'A'}}}});await settle();
  assert.equal(f.rpcCalls.length,0);assert.equal(f.w.document.getElementById('pcr-patient-initials').value,'DEMO-B');
});
test('PCR late save acknowledgement cannot remove A draft or modify B UI',async t=>{
  const f=fixture(t,{drafts:['A','B']});await settle();const gate=deferred();f.rpcQueue.push(gate);
  f.click('pcr-rosc');await settle();assert.equal(f.rpcCalls.length,1);
  assert.equal(f.rpcCalls[0].authOwner,'A');f.change('B');await settle();
  gate.resolve({data:'record-A',error:null});await settle();
  assert.ok(f.w.localStorage.getItem('luria_pcr_draft_v1_A'));
  assert.equal(f.w.document.getElementById('pcr-patient-initials').value,'DEMO-B');
  assert.equal(f.w.document.getElementById('pcr-rosc').disabled,false);
  assert.equal(f.w.document.getElementById('pcr-save-status').textContent,'');
});
test('PCR ended draft remains recoverable on save failure and retry preserves its record ID',async t=>{
  const f=fixture(t);await settle();const gate=deferred();f.rpcQueue.push(gate);f.click('pcr-rosc');await settle();
  gate.resolve({error:{message:'SYNTHETIC NETWORK FAILURE'}});await settle();
  assert.match(f.w.document.getElementById('pcr-rosc').textContent,/Tentar salvar/);
  const saved=JSON.parse(f.w.localStorage.getItem('luria_pcr_draft_v1_A'));assert.ok(saved.ended_at);
  f.change('B');await settle();f.change('A');await settle();
  assert.equal(f.w.document.getElementById('pcr-rosc').disabled,false);
  f.click('pcr-rosc');await settle();assert.equal(f.rpcCalls[1].args.payload.id,'record-A');
  assert.equal(f.w.localStorage.getItem('luria_pcr_draft_v1_A'),null);
});
test('PCR pending audio unlock and delayed beats cannot repopulate another account',async t=>{
  const f=fixture(t,{drafts:['A','B']});await settle();const gate=deferred();f.holdAudio(gate);f.click('pcr-metronome');await settle();
  const audio=f.audio[0];f.change('B');await settle();gate.resolve();await settle();
  assert.ok(audio.pauses>=1);assert.equal(f.timeouts.size,0);
  assert.doesNotMatch(f.w.document.getElementById('pcr-log').textContent,/som ativado/);
  assert.match(f.w.document.getElementById('pcr-metronome').textContent,/toque para ativar/);
});
test('PCR controls recover after logout and BFCache restoration uses the current account',async t=>{
  const f=fixture(t,{drafts:['A','B']});await settle();
  f.w.dispatchEvent(new f.w.Event('pagehide'));assert.equal(f.intervals.size,0);
  f.change('B');await settle();
  f.w.dispatchEvent(new f.w.PageTransitionEvent('pageshow',{persisted:true}));await settle();
  assert.equal(f.w.document.getElementById('pcr-patient-initials').value,'DEMO-B');assert.equal(f.intervals.size,2);
  f.change(null);await settle();f.change('A');await settle();f.click('pcr-log-cpr');
  assert.match(f.w.document.getElementById('pcr-log').textContent,/Troca de compressor/);
});
test('PCR history drops late A loads and shows only B patient data and draft',async t=>{
  const f=fixture(t,{history:true,drafts:['A','B']});await settle();
  const gate=deferred();f.loads.set('A',gate);f.click('pcr-history-refresh');await settle();
  f.change('B');assert.equal(f.w.document.getElementById('pcr-history-list').textContent,'');await settle();
  gate.resolve({data:[{id:'old',user_id:'A',initials:'STALE PRIVATE A'}],error:null});await settle();
  const text=f.w.document.getElementById('pcr-history-list').textContent;
  assert.match(text,/HISTORY-B/);assert.doesNotMatch(text,/STALE|HISTORY-A|PRIVATE-A/);
  f.change(null);await settle();assert.equal(f.w.document.getElementById('pcr-history-list').textContent,'');
  assert.equal(f.w.document.getElementById('pcr-pending').hidden,true);
});
test('PCR history closes owner A edit dialog and ignores late update completion in B',async t=>{
  const f=fixture(t,{history:true,drafts:['A','B']});await settle();
  f.w.document.querySelector('[data-edit-patient]').click();
  f.w.document.querySelector('[name="initials"]').value='EDITED A';
  const gate=deferred();f.loads.set('A',gate);
  f.w.document.getElementById('pcr-edit-form').dispatchEvent(new f.w.Event('submit',{bubbles:true,cancelable:true}));await settle();
  f.change('B');await settle();assert.equal(f.w.document.getElementById('pcr-edit-dialog').open,false);
  assert.equal(f.w.document.getElementById('pcr-edit-fields').textContent,'');
  gate.resolve({data:null,error:{message:'STALE FAILURE A'}});await settle();
  assert.doesNotMatch(f.w.document.getElementById('pcr-history-status').textContent,/STALE/);
  assert.equal(f.w.document.getElementById('pcr-edit-error').textContent,'');
  assert.equal(f.queries.find(q=>q.action==='update').filters.user_id,'A');
  f.w.document.querySelector('[data-edit-patient]').click();assert.equal(f.w.document.querySelector('[name="initials"]').value,'HISTORY-B');
});
test('PCR store rejects mismatched draft writes and invalidates saves even after A-B-A',async t=>{
  const f=fixture(t,{drafts:['A','B']});await settle();
  assert.throws(()=>f.w.TraubePCRStore.writeDraft('B',draft('B')),/sessão mudou/);
  const gate=deferred();f.rpcQueue.push(gate);
  const result=f.w.TraubePCRStore.save(draft('A')).then(()=>null,error=>error);await settle();
  f.change('B');await settle();f.change('A');await settle();gate.resolve({data:'record-A'});
  assert.match((await result).message,/sessão mudou/);assert.ok(f.w.localStorage.getItem('luria_pcr_draft_v1_A'));
});
test('PCR initializes and recovers with the actual global Auth ownership lifecycle',async t=>{
  const f=fixture(t,{globalOwnership:true,drafts:['A','B']});await settle();
  assert.equal(f.w.document.getElementById('pcr-patient-initials').value,'DEMO-A');assert.equal(f.intervals.size,2);
  f.change('B');await settle();assert.equal(f.w.document.getElementById('pcr-patient-initials').value,'DEMO-B');
  f.change(null);await settle();assert.equal(f.w.document.getElementById('pcr-log').textContent,'');
  f.change('A');await settle();assert.equal(f.w.document.getElementById('pcr-patient-initials').value,'DEMO-A');
  assert.equal(f.intervals.size,2);
});
test('PCR late queued timer callbacks cannot change the new owner timer or metronome',async t=>{
  const f=fixture(t,{drafts:['A','B']});await settle();const previous=[...f.intervals.values()];
  f.change('B');await settle();const timer=f.w.document.getElementById('pcr-timer').textContent;
  previous.forEach(task=>task.fn());assert.equal(f.w.document.getElementById('pcr-timer').textContent,timer);
  assert.equal(f.timeouts.size,0);assert.ok(!f.w.document.getElementById('pcr-log').textContent.includes('EVENT-A'));
});
test('PCR rhythm, shock, mode and drug controls remain operational in the new session',async t=>{
  const f=fixture(t,{drafts:['A','B']});await settle();f.change('B');await settle();
  f.w.document.querySelector('[data-rhythm="FV"]').click();assert.equal(f.w.document.getElementById('pcr-shock').disabled,false);
  f.click('pcr-shock');f.w.document.querySelector('[data-pcr-mode="pediatric"]').click();
  f.w.document.querySelector('#pcr-drugs button').click();
  const saved=JSON.parse(f.w.localStorage.getItem('luria_pcr_draft_v1_B'));
  assert.equal(saved.rhythm,'FV');assert.equal(saved.shock_count,1);assert.equal(saved.mode,'pediatric');
  assert.equal(saved.events.filter(e=>e.action==='Adrenalina').length,1);
  assert.equal(JSON.parse(f.w.localStorage.getItem('luria_pcr_draft_v1_A')).shock_count,0);
});
