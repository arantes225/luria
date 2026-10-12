const assert=require('node:assert/strict');
const E=require('../assets/js/plantao-engine.js');
const cases=require('../data/plantao-cases-v2.json');
require('node:test').test('clinical scoring retains penalties and diagnosis/disposition contributions',()=>{
for(const c of cases){
 const ids=c.actions.map(a=>a.id);assert.equal(new Set(ids).size,ids.length);
 for(const a of c.actions){assert(Number.isFinite(a.points));assert(Number.isFinite(a.time_min));for(const id of a.requires_all||[])assert(ids.includes(id));}
 for(const cat of ['anamnese','exame','iniciais','laboratorio','imagem','hipoteses','destino'])assert(c.actions.some(a=>a.category===cat),c.slug+': '+cat);
 const rules=c.completion_rules;
 const state={performed:[...new Set([...rules.required_actions,...rules.recommended_actions])],outcomes:rules.success_outcomes,penalties:0,criticalElapsed:0,diagnosis:{correct:true},disposition:{correct:true}};
 assert.equal(E.score(c,state).total,100);
 assert.equal(E.score(c,{...state,penalties:20}).total,80,'Positive actions must never erase a harmful-action penalty');
 const noClinical={...state,diagnosis:{correct:false},disposition:{correct:false}};
 assert.equal(E.score(c,noClinical).raw-E.score(c,{...noClinical,penalties:26}).raw,26,'Penalty must remain independent of diagnosis/disposition bonuses');
 assert.equal(E.score(c,state).earned-E.score(c,noClinical).earned,30,'Current diagnosis and disposition bonuses total 30');
 assert.equal(E.score(c,{...state,criticalElapsed:rules.max_minutes+5}).total,95);
 const empty={performed:[],outcomes:[],penalties:0,criticalElapsed:0};
 assert.equal(E.score(c,empty).total,0);
 if(['anaphylaxis-ed','af-unstable-ed'].includes(c.slug)){
  const a=c.actions.find(a=>a.id==='dest_ward');assert.equal(E.resolve(c,empty,a).correct,false);assert.equal(E.resolve(c,state,a).correct,true);
 }
}
const sepsis=cases.find(c=>c.slug==='septic-shock-ed');assert(E.done(sepsis,['amp_sulbactam'],'antibiotic'));
const vf=cases.find(c=>c.slug==='vf-arrest-ed');assert(E.done(vf,['lidocaine'],'amiodarone'));
const ana=cases.find(c=>c.slug==='anaphylaxis-ed'),a=ana.actions.find(a=>a.id==='salbutamol');
assert(E.resolve(ana,{performed:[],outcomes:[]},a).points<0);
assert(E.resolve(ana,{performed:['epi_im'],outcomes:['responding']},a).points>0);
console.log('PASS: four cases, six groups, 213 unique case actions, contextual penalties, equivalent therapies, diagnosis and disposition scoring.');

});

require('node:test').test('surplus benefits never erase configured penalties or count them twice',()=>{
 const c=cases.find(c=>c.slug==='anaphylaxis-ed');
 const state={performed:c.completion_rules.required_actions,outcomes:[],criticalElapsed:0,penalties:0,diagnosis:{correct:true},disposition:{correct:true},clinicalEvents:Array.from({length:40},()=>({level:'benefica'}))};
 assert.equal(E.score(c,state).earned,70+15+15+40*2);
 assert.equal(E.score(c,state).total,100,'Correct care can retain the maximum');
 // Current catalog wrong diagnosis = 4. Local wrong diagnoses retain their
 // configured magnitude of 6; other severity amounts come from existing data.
 const penalties=new Set([4,...c.actions.filter(a=>a.points<0).map(a=>Math.abs(a.points))]);
 for(const penalty of penalties){
  const result=E.score(c,{...state,penalties:penalty});
  assert.equal(result.penalties,penalty);
  assert.equal(result.total,100-penalty);
  assert.equal(result.raw,100-penalty);
  assert.equal(E.score(c,{...state,diagnosis:{correct:false},penalties:penalty}).total,100-penalty,'Incorrect diagnosis plus high bonuses cannot reach 100');
 }
 assert.equal(E.score(c,{...state,penalties:26,criticalElapsed:c.completion_rules.max_minutes+5}).total,100-26-5);
 assert.equal(E.score(c,{...state,penalties:200}).total,0);
 assert.equal(E.score(c,{...state,dead:true}).total,0);
 assert.equal(E.score(c,{...state,clinicalEvents:[...state.clinicalEvents,{level:'mortal'}]}).total,0);
 const noBonus={...state,clinicalEvents:[],diagnosis:null};
 assert.equal(E.score(c,noBonus).earned,70+15,'Absent diagnosis loses its existing 15 credit, without inventing a penalty');
 assert.equal(E.score(c,noBonus).penalties,0);
});

require('node:test').test('only explicit registered electrical and antimicrobial equivalents count',()=>{
 const af=cases.find(c=>c.slug==='af-unstable-ed');
 assert(E.done(af,['cardioversion'],'sync_cardioversion'));
 assert(E.done(af,['sync_cardioversion'],'cardioversion'));
 for(const id of ['unsync_shock','defibrillate','shock1']){
  assert.equal(E.done(af,[id],'sync_cardioversion'),false);
  assert.equal(E.done(af,[id],'cardioversion'),false);
 }
 const sepsis=cases.find(c=>c.slug==='septic-shock-ed');
 for(const id of ['antibiotic','amp_sulbactam']){
  const action=sepsis.actions.find(a=>a.id===id);
  assert(E.done(sepsis,[id],'antibiotic'));
  assert.equal(action.effects.outcome,'treated');
  assert.equal(action.time_min,1);
 }
 for(const id of ['vancomycin','ceftriaxone','cefepime','meropenem','piperacillin_tazo'])assert.equal(E.done(sepsis,[id],'antibiotic'),false,'No new pharmacological equivalence: '+id);
});
