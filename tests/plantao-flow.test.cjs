const assert=require('node:assert/strict');
const E=require('../assets/js/plantao-engine.js'),cases=require('../data/plantao-cases-v2.json');
const {fixture}=require('./fixtures/plantao.cjs');
require('node:test').test('full clinical flows preserve penalties, completion and integer persistence',async t=>{
 const plans={
 'anaphylaxis-ed':['epi_im','monitor','iv_access','oxygen','crystalloid','dx_0','dest_ward'],
 'af-unstable-ed':['cardioversion','monitor','iv_access','ecg','sedation','dx_0','dest_ward'],
 'septic-shock-ed':['antibiotic','crystalloid','norepi','cultures','lactate','monitor','iv_access','oxygen','dx_0','dest_icu'],
 // Only the current shared shock control is selected. Pads/IVIO/ROSC are not
 // selectable in this catalog; pretending to click them cannot complete a case.
 'vf-arrest-ed':['cpr','defibrillate','defibrillate','epi','defibrillate','amiodarone','causes','dx_0','dest_icu']};
 for(const c of cases)await t.test(c.slug,async st=>{
  const f=await fixture();st.after(()=>{f.close();assert.deepEqual(f.errors,[])});await f.click('data-start-case',c.id);
  assert.equal((f.el('plantao-action-tabs').innerHTML.match(/data-case-category=/g)||[]).length,6);
  await f.click('data-case-category','exames');assert.equal(f.el('plantao-action-drawer').hidden,false);assert.equal(f.el('plantao-action-tabs').inert,true);f.el('plantao-action-close').click();assert.equal(f.el('plantao-action-drawer').hidden,true);
  if(c.slug==='vf-arrest-ed'){
    const available=await f.actionIds();
    for(const id of ['pads','ivio','rosc'])assert.equal(available.has(id),false,id+' is not a selectable action');
    for(const id of ['cpr','defibrillate','iv_access','epi','amiodarone','causes'])assert(available.has(id),id);
  }
  for(const id of plans[c.slug]){if(f.writes.at(-1)?.state?.dead)break;await f.click('data-case-action',id);}
  const final=f.writes.at(-1);assert.equal(final.status,'completed',JSON.stringify({case:c.slug,performed:final.state?.performed,dead:final.state?.dead,reason:final.state?.deathReason}));assert.equal(final.result.disposition.correct,true);
  if(c.slug==='vf-arrest-ed'){
    assert.equal(final.state.dead,false);
    assert.deepEqual(final.state.performed,['cpr','causes','catalog_dx_3','generic_dest_icu']);
    assert.deepEqual(final.result.missing_required,['shock1']);
    assert.deepEqual(final.state.outcomes,[],'No fabricated ROSC');
    const violations=final.state.sequenceViolations;
    assert.deepEqual(violations.map(v=>v.action_id),['shock1','shock1','epi','shock1','amiodarone']);
    assert(violations.every(v=>v.blocked));
    const penalties=violations.reduce((n,v)=>n+v.penalty,0);
    assert.equal(penalties,5*2,'Existing sequence penalties, no new mandatory steps');
    assert.equal(final.state.penalties,penalties);
    assert.deepEqual(final.state.clinicalEvents.map(e=>[e.action_id,e.level]),[['cpr','essencial'],['causes','benefica'],['catalog_dx_3','neutra'],['generic_dest_icu','neutra']]);
    // One of two required actions = 35, diagnosis/destination = 15 each,
    // one beneficial event = 2. The old 100 expectation ignored five blocks.
    assert.equal(final.score,70/2+15+15+2-penalties);
  }else assert.equal(final.score,100,c.slug);
 });
 await t.test('diagnostic penalty remains visible in final score',async st=>{
 const c=cases.find(c=>c.slug==='anaphylaxis-ed'),f=await fixture();st.after(()=>{f.close();assert.deepEqual(f.errors,[])});await f.click('data-start-case',c.id);
 await f.click('data-case-action','dx_1');
 for(const id of plans[c.slug])await f.click('data-case-action',id);
 assert.equal(f.writes.at(-1).state.penalties,4,'Current UI records a wrong diagnosis penalty');
 assert.equal(f.writes.at(-1).score,100-4,'Wrong diagnostic choice is deducted exactly once after bonuses');
 });
 await t.test('unsafe discharge',async st=>{
 const c=cases.find(c=>c.slug==='anaphylaxis-ed');
 const early=await fixture();st.after(()=>{early.close();assert.deepEqual(early.errors,[])});await early.click('data-start-case',c.id);await early.click('data-case-action','dx_0');await early.click('data-case-action','dest_discharge');assert.equal(early.writes.at(-1).state.disposition.correct,false);assert.equal(early.writes.at(-1).result.death,true);assert.equal(early.writes.at(-1).score,0);
 });
});

require('node:test').test('synchronized cardioversion uses the registered action and preserves deadlines',async t=>{
 const c=cases.find(c=>c.slug==='af-unstable-ed');
 for(const id of ['cardioversion','sync_cardioversion'])await t.test(id,async st=>{
  const f=await fixture();st.after(()=>{f.close();assert.deepEqual(f.errors,[])});
  await f.click('data-start-case',c.id);
  assert((await f.actionIds()).has(id));
  await f.click('data-case-action',id);
  const first=f.writes.at(-1).state;
  assert.deepEqual(first.performed,['cardioversion']);
  assert(first.outcomes.includes('converted'));
  assert.equal(first.elapsed_seconds,30,'Keep the registered 0.5 minute duration');
  assert.equal(first.vitals.rhythm,'Ritmo sinusal');
  assert.equal(first.penalties,0);
  assert(E.done(c,first.performed,'sync_cardioversion'));
  const count=f.writes.length;
  await f.click('data-case-action',id==='cardioversion'?'sync_cardioversion':'cardioversion');
  assert.equal(f.writes.length,count,'Aliases do not award the same action twice');
  for(const step of ['monitor','iv_access','ecg','sedation','dx_0','dest_ward'])await f.click('data-case-action',step);
  assert.equal(f.writes.at(-1).score,100);
  assert.equal(f.writes.at(-1).state.dead,false);
 });
 for(const id of ['unsync_shock','defibrillate'])await t.test('non-synchronized: '+id,async st=>{
  const f=await fixture();st.after(()=>{f.close();assert.deepEqual(f.errors,[])});
  await f.click('data-start-case',c.id);await f.click('data-case-action',id);
  const final=f.writes.at(-1);
  assert.equal(final.state.dead,true);assert.equal(final.score,0);
  assert.equal(E.done(c,final.state.performed,'sync_cardioversion'),false);
  assert.equal(final.state.outcomes.includes('converted'),false);
 });
 await t.test('late cardioversion cannot reverse a missed critical window',async st=>{
  const f=await fixture();st.after(()=>{f.close();assert.deepEqual(f.errors,[])});
  await f.click('data-start-case',c.id);
  await f.click('data-case-action','monitor'); // 1 minute
  await f.click('data-case-action','ecg'); // 1.5 minutes
  await f.click('data-case-action','sync_cardioversion'); // 2: existing >= deadline
  const final=f.writes.at(-1);
  assert.equal(final.state.elapsed_seconds,120);
  assert.equal(final.state.dead,true);assert.equal(final.score,0);
  assert.equal(E.done(c,final.state.performed,'sync_cardioversion'),false);
 });
});

function savedSession(c,minutes){
 return {id:'test-session',case_id:c.id,status:'in_progress',elapsed_minutes:Math.ceil(minutes),state:{elapsed_seconds:minutes*60,vitals:c.initial_vitals,performed:[],outcomes:[],criticalElapsed:minutes}};
}
require('node:test').test('sepsis recognizes only the case antibiotic contract within the existing window',async t=>{
 const c=cases.find(c=>c.slug==='septic-shock-ed');
 for(const id of ['antibiotic','amp_sulbactam']){
  for(const [start,dead] of [[8.5,false],[9,true],[9.25,true]])await t.test(id+' completes at '+(start+1)+' minutes',async st=>{
   const f=await fixture({session:savedSession(c,start)});st.after(()=>{f.close();assert.deepEqual(f.errors,[])});
   await f.resume();assert((await f.actionIds()).has(id));await f.click('data-case-action',id);
   const actual=f.writes.at(-1);
   assert.equal(actual.state.elapsed_seconds,(start+1)*60);
   assert.equal(actual.state.dead,dead);
   assert.equal(E.done(c,actual.state.performed,'antibiotic'),!dead);
   assert.equal(actual.state.outcomes.includes('treated'),!dead);
   if(dead){assert.equal(actual.score,0);assert.match(actual.state.deathReason,/antimicrobiano/);}
   else{
    assert.equal(actual.state.clinicalEvents[0].time,start+1);
    await f.click('data-case-action','iv_access'); // Cross 10 after the timely intervention.
    assert.equal(f.writes.at(-1).state.dead,false);
    assert(E.done(c,f.writes.at(-1).state.performed,'antibiotic'));
   }
  });
 }
 await t.test('non-equivalent vancomycin does not satisfy the antibiotic rule',async st=>{
  const f=await fixture({session:savedSession(c,8.5)});st.after(()=>{f.close();assert.deepEqual(f.errors,[])});
  await f.resume();await f.click('data-case-action','vancomycin');
  assert.equal(f.writes.at(-1).state.dead,false);
  assert.equal(E.done(c,f.writes.at(-1).state.performed,'antibiotic'),false);
  await f.click('data-case-action','iv_access');
  assert.equal(f.writes.at(-1).state.dead,true);
  assert.match(f.writes.at(-1).state.deathReason,/antimicrobiano/);
 });
 await t.test('no antibiotic by the boundary remains fatal',async st=>{
  const f=await fixture({session:savedSession(c,9.75)});st.after(()=>{f.close();assert.deepEqual(f.errors,[])});
  await f.resume();await f.click('data-case-action','check_pulse');
  const final=f.writes.at(-1);
  assert.equal(final.state.elapsed_seconds,600);
  assert.equal(final.state.dead,true);assert.equal(final.score,0);
  assert.equal(E.done(c,final.state.performed,'antibiotic'),false);
 });
});

require('node:test').test('VF remains finalizable without artificial pads, IVIO or ROSC selections',async t=>{
 const c=cases.find(c=>c.slug==='vf-arrest-ed'),f=await fixture();t.after(()=>{f.close();assert.deepEqual(f.errors,[])});
 await f.click('data-start-case',c.id);
 for(const id of ['cpr','causes','dx_0','dest_icu'])await f.click('data-case-action',id);
 const final=f.writes.at(-1);
 assert.equal(final.status,'completed');assert.equal(final.state.dead,false);
 assert.equal(final.state.penalties,0);assert.deepEqual(final.state.sequenceViolations,[]);
 assert.deepEqual(final.state.outcomes,[]);
 assert.deepEqual(final.result.missing_required,['shock1']);
 assert.equal(final.score,70/2+15+15+2);
});

require('node:test').test('diagnosis selection keeps accepted and absent hypothesis behavior',async t=>{
 const c=cases.find(c=>c.slug==='anaphylaxis-ed'),f=await fixture();t.after(()=>{f.close();assert.deepEqual(f.errors,[])});
 await f.click('data-start-case',c.id);await f.click('data-case-action','epi_im');
 const count=f.writes.length;
 await f.click('data-case-action','dest_ward');
 assert.equal(f.writes.length,count,'No diagnosis: existing UI refuses finalization without a new penalty');
 assert.equal(f.writes.at(-1).state.diagnosis,null);
 assert.equal(f.writes.at(-1).state.penalties,0);
 await f.click('data-case-action','dx_0');
 assert.equal(f.writes.at(-1).state.diagnosis.correct,true);
 assert.equal(f.writes.at(-1).state.penalties,0);
});
