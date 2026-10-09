const vm=require('node:vm'),fs=require('node:fs'),assert=require('node:assert/strict');
const E=require('../assets/js/plantao-engine.js'),cases=require('../data/plantao-cases-v2.json');
async function fixture(){
 const {JSDOM}=require('jsdom');
 const dom=new JSDOM(fs.readFileSync(require('node:path').join(__dirname,'../plantao/sala-emergencia/index.html'),'utf8'),{url:'https://fixture.invalid/plantao/sala-emergencia/',runScripts:'outside-only',pretendToBeVisual:true});
 const win=dom.window,doc=win.document,handlers=[],writes=[];
 const nativeAdd=doc.addEventListener.bind(doc);
 doc.addEventListener=(name,fn,opts)=>{if(name==='click')handlers.push(fn);nativeAdd(name,fn,opts)};
 const sb={auth:{getUser:async()=>({data:{user:{id:'test-user'}}})},rpc:async(name,args)=>({data:name==='list_active_clinical_case_summaries'?cases:name==='get_active_clinical_case'?cases.filter(c=>c.id===args.p_case_id):name==='has_interconsultation_access'?false:null,error:null}),from(table){let kind='read',payload;return {
 select(){return this},eq(){return this},order(){return this},limit(){return this},
 insert(p){kind='insert';payload=p;return this},update(p){kind='update';payload=p;assert(Number.isInteger(p.elapsed_minutes));return this},
 maybeSingle:async()=>{if(kind==='update')writes.push(payload);return {data:kind==='update'?{id:'test-session'}:null,error:null}},
 single:async()=>({data:{id:'test-session',started_at:new Date().toISOString(),status:'in_progress'},error:null}),
 then(resolve){if(kind==='update')writes.push(payload);resolve({data:table==='clinical_cases'?cases:[],error:null})}
 }}};
 Object.assign(win,{supabaseClient:sb,PlantaoEngine:E,PlantaoMonitor:{update(){},react(){}},scrollTo(){},confirm:()=>true,alert:msg=>{throw Error(msg)}});
 win.setInterval=()=>1;
 win.HTMLElement.prototype.scrollIntoView=function(){};
 win.eval(fs.readFileSync(require.resolve('../assets/js/plantao.js'),'utf8'));
 await new Promise(r=>setTimeout(r,0));
 let activeCaseId;
 const click=async(key,value)=>{
   if(key==='data-start-case')activeCaseId=value;
   if(key==='data-case-action'){
     // Current UI uses the shared diagnosis/disposition catalog and a repeated shock button.
     const index=cases.findIndex(c=>c.id===activeCaseId);
     if(value==='dx_0')value='catalog_dx_'+index;
     if(value==='dx_1')value='catalog_dx_'+((index+1)%cases.length);
     if(value.startsWith('dest_'))value='generic_'+value;
     if(/^shock[123]$/.test(value))value='defibrillate';
   }
   const button=doc.createElement('button');button.setAttribute(key,value);
   for(const handler of handlers){
     const pending=handler({target:button,preventDefault(){},stopPropagation(){}});
     if(!doc.getElementById('plantao-confirm-overlay').hidden)doc.getElementById('plantao-confirm-ok').click();
     await pending;
   }
 };
 return {el:id=>doc.getElementById(id),writes,click,close:()=>win.close()};
}
require('node:test').test('full clinical flows preserve penalties, completion and integer persistence',async t=>{
 const plans={
 'anaphylaxis-ed':['epi_im','monitor','iv_access','oxygen','crystalloid','dx_0','dest_ward'],
 'af-unstable-ed':['cardioversion','monitor','iv_access','ecg','sedation','dx_0','dest_ward'],
 'septic-shock-ed':['antibiotic','crystalloid','norepi','cultures','lactate','monitor','iv_access','oxygen','dx_0','dest_icu'],
 'vf-arrest-ed':['cpr','pads','shock1','ivio','shock2','epi','shock3','amiodarone','causes','rosc','dx_0','dest_icu']};
 for(const c of cases)await t.test(c.slug,async st=>{
  const f=await fixture();st.after(f.close);await f.click('data-start-case',c.id);
  assert.equal((f.el('plantao-action-tabs').innerHTML.match(/data-case-category=/g)||[]).length,6);
  await f.click('data-case-category','exames');assert.equal(f.el('plantao-action-drawer').hidden,false);assert.equal(f.el('plantao-action-tabs').inert,true);f.el('plantao-action-close').click();assert.equal(f.el('plantao-action-drawer').hidden,true);
  for(const id of plans[c.slug]){if(f.writes.at(-1)?.state?.dead)break;await f.click('data-case-action',id);}
  const final=f.writes.at(-1);assert.equal(final.status,'completed',JSON.stringify({case:c.slug,performed:final.state?.performed,dead:final.state?.dead,reason:final.state?.deathReason}));assert.equal(final.score,100,c.slug);assert.equal(final.result.disposition.correct,true);
 });
 await t.test('diagnostic penalty remains visible in final score',async st=>{
 const c=cases.find(c=>c.slug==='anaphylaxis-ed'),f=await fixture();st.after(f.close);await f.click('data-start-case',c.id);
 await f.click('data-case-action','dx_1');
 for(const id of plans[c.slug])await f.click('data-case-action',id);
 assert.equal(f.writes.at(-1).state.penalties,4,'Current UI records a wrong diagnosis penalty');
 assert.ok(f.writes.at(-1).score<100,'Wrong diagnostic choice should remain penalized after correct steps');
 });
 await t.test('unsafe discharge',async st=>{
 const c=cases.find(c=>c.slug==='anaphylaxis-ed');
 const early=await fixture();st.after(early.close);await early.click('data-start-case',c.id);await early.click('data-case-action','dx_0');await early.click('data-case-action','dest_discharge');assert.equal(early.writes.at(-1).state.disposition.correct,false);assert.equal(early.writes.at(-1).result.death,true);assert.equal(early.writes.at(-1).score,0);
 });
});
