'use strict';
/* LURIA clinical batch 11: SAPS 3 2005 and 2026 C-SSRS outpatient screener.
 * node --test tests/clinical-tools-batch11.test.cjs
 * Mathematical and structural checks only: NOT clinical validation or browser E2E. */
const test=require('node:test'),assert=require('node:assert/strict');
const fs=require('node:fs'),path=require('node:path');
const read=p=>fs.readFileSync(path.join(__dirname,'..',p),'utf8');
const code=read('assets/js/work-scores.js');
let selected=[];
const domFields={"#score-value":{textContent:""},"#score-text":{textContent:""},"#score-note":{textContent:""}};
const doc={readyState:'loading',addEventListener(){},
 querySelector:s=>domFields[s]||null,
 querySelectorAll:s=>s==='#score-form select'?selected.map(v=>({value:String(v)})):[]
};
const src=code.replace('(() => {','return (() => {')
 .replace('  document.readyState==="loading"?document.addEventListener("DOMContentLoaded",mount):mount();',
  '  return {scores,calculateGeneric,customRender};');
const {scores,calculateGeneric,customRender}=new Function('document','localStorage',src)(
 doc,{getItem:()=>null}
);
const byId=id=>scores.find(x=>x.id===id);
test('SAPS3 and C-SSRS use unique existing ids, not reference placeholders',()=>{
 for(const id of ['saps3','cssrs']){
  const xs=scores.filter(x=>x.id===id);assert.equal(xs.length,1);
  assert.notEqual(xs[0].custom,'reference');
  assert.ok(xs[0].reference&&xs[0].safetyNote&&xs[0].auditDate);
 }
 assert.equal(scores.length,new Set(scores.map(x=>x.id)).size);
 assert.equal(scores.filter(x=>x.custom==='reference').length,6);
});
const saps=byId('saps3');
const optionValue=(index,fragment)=> {
 const x=saps.questions[index].options.find(o=>o.text.includes(fragment));
 assert.ok(x,'missing SAPS3 option '+index+': '+fragment);
 return x.value;
};
const indexOfPart=phrase=>{
 const i=saps.questions.findIndex(q=>q.label.includes(phrase));
 assert.ok(i>=0,phrase);return i;
};
const si=indexOfPart('Estado cirúrgico'),ai=indexOfPart('Local anatômico');
const cv=indexOfPart('Motivo cardiovascular'),neuro=indexOfPart('Motivo neurológico');
const baseline=()=>saps.questions.map(q=>q.options[0].value);
const score=values=>{
 selected=values;calculateGeneric(saps);
 return {value:domFields['#score-value'].textContent,text:domFields['#score-text'].textContent,note:domFields['#score-note'].textContent};
};
test('SAPS3 official admission offset = 16 for baseline planned surgical scenario',()=>{
 const a=baseline();a[si]=0;a[ai]=0;
 assert.equal(score(a).value,'16 pontos');
});
test('SAPS3 unsurgical admission adds 5 points and requires anatomical NA',()=>{
 const a=baseline();a[si]=5;a[ai]=99;
 assert.equal(score(a).value,'21 pontos');
 a[ai]=0;assert.equal(score(a).value,'—');
 a[si]=0;a[ai]=99;assert.equal(score(a).value,'—');
});
test('SAPS3 requires all 30 items and never estimates mortality directly',()=>{
 assert.equal(saps.questions.length,30);
 const a=baseline();a[si]=0;a[ai]=0;a[0]='';assert.equal(score(a).value,'—');
 assert.match(score(baseline().map((x,i)=>i===si?5:i===ai?99:x)).text,/NÃO converter diretamente/);
});
test('SAPS3 age, stay, shock and comorbidities have documented point thresholds',()=>{
 const a=baseline();a[si]=0;a[ai]=0;
 a[0]=18;a[1]=6;a[2]=5;a[3]=3;a[4]=11;a[9]=3;a[10]=3;a[cv]=5;
 assert.equal(score(a).value,'16 pontos'.replace('16','70')); // 16+18+6+5+3+11+3+3+5=70
});
test('SAPS3 arrhythmia with seizures is not counted as -9',()=>{
 const a=baseline();a[si]=0;a[ai]=0;a[cv]=-5;a[neuro]=-4;
 assert.equal(score(a).value,'12 pontos'); // 16-4 after combined reason priority
});
test('SAPS3 max single physiology categories add documented points',()=>{
 const a=baseline();a[si]=0;a[ai]=0;
 const phys=[15,5,7,8,7,2,3,13,11,11];
 for(let i=0;i<phys.length;i++)a[20+i]=phys[i];
 assert.equal(score(a).value,'98 pontos'); // 16 + (15+5+7+8+7+2+3+13+11+11)=98
});
function cssrs(v){
 const fields=Object.fromEntries(Object.entries(v).map(([key,val])=>['#'+key,{value:String(val)}]));
 const f={innerHTML:'',querySelector:s=>fields[s]||null,
 querySelectorAll:s=>s==='select'?Object.values(fields):[]};
 customRender.cssrs(f,byId('cssrs'));
 const on=Object.values(fields).find(x=>typeof x.onchange==='function');
 assert.ok(on,'missing CSSRS change listener');
 on.onchange();
 return {value:domFields['#score-value'].textContent,text:domFields['#score-text'].textContent,
 note:domFields['#score-note'].textContent};
}
const c0={css1:0,css2:0,css3:'na',css4:'na',css5:'na',css6:0,css6recent:'na'};
test('C-SSRS negative answers do not label person safe/low risk',()=>{
 const r=cssrs(c0);
 assert.equal(r.value,'Nenhum item positivo transcrito');
 assert.match(r.text,/NÃO significa ausência/);
});
test('C-SSRS item 1 or 2: clinical referral, not fabricated percentage',()=>{
 assert.equal(cssrs({...c0,css1:1}).value,'Encaminhamento para avaliação');
 const q2={...c0,css2:1,css3:0,css4:0,css5:0};
 assert.equal(cssrs(q2).value,'Encaminhamento para avaliação');
 assert.equal(cssrs({...q2,css3:1}).value,'Encaminhamento para avaliação');
});
test('C-SSRS intent/plan or behavior within 3 months requires urgent review',()=>{
 const q2={...c0,css2:1,css3:0,css4:0,css5:0};
 for(const v of [{...q2,css4:1},{...q2,css5:1},
   {...c0,css6:1,css6recent:1}]){
   const r=cssrs(v);
   assert.equal(r.value,'Avaliação urgente + precauções');
   assert.match(r.text,/imediata/);
 }
});
test('C-SSRS lifetime behavior more than 3 months ago still triggers referral',()=>{
 assert.equal(cssrs({...c0,css6:1,css6recent:0}).value,'Encaminhamento para avaliação');
});
test('C-SSRS skips items 3-5 only when item2 negative, checks lifetime hierarchy',()=>{
 assert.equal(cssrs({...c0,css3:0}).value,'Inconsistência');
 assert.equal(cssrs({...c0,css2:1}).value,'Inconsistência');
 assert.equal(cssrs({...c0,css6recent:1}).value,'Inconsistência');
 assert.equal(cssrs({...c0,css6:1}).value,'Inconsistência');
 assert.equal(cssrs({...c0,css1:''}).value,'—');
});
test('Score script cache version is current',()=>{
 assert.match(read('trabalho/scores/index.html'),/work-scores\.js\?v=20261102-batch11/);
});
