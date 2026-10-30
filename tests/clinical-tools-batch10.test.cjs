'use strict';
/* LURIA — clinical scores batch 10 regression checks.
 * Run: node --test tests/clinical-tools-batch10.test.cjs
 * Structural and numerical tests; NOT clinical validation or browser E2E.
 */
const test=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs'),path=require('node:path');
const read=p=>fs.readFileSync(path.resolve(__dirname,'..',p),'utf8');
const source=read('assets/js/work-scores.js');
let selected=[];
const outputs={
  '#score-value':{textContent:''},
  '#score-text':{textContent:''},
  '#score-note':{textContent:''}
};
const mockDoc={
  readyState:'loading',addEventListener(){},
  querySelector:s=>outputs[s]||null,
  querySelectorAll:s=>s==='#score-form select'?selected.map(v=>({value:String(v)})):[]
};
const modified=source.replace('(() => {','return (() => {')
  .replace('  document.readyState==="loading"?document.addEventListener("DOMContentLoaded",mount):mount();',
    '  return {scores,calculateGeneric,customRender};');
const {scores,calculateGeneric,customRender}=new Function('document','localStorage',modified)(
  mockDoc,{getItem:()=>null}
);
const ids=['apache2','possum','pews'];
for(const id of ids){
  test(id+' uses its existing ID and has an active instrument',()=>{
    const instances=scores.filter(s=>s.id===id);
    assert.equal(instances.length,1);
    const s=instances[0];
    assert.notEqual(s.custom,'reference');
    assert.ok(s.reference&&s.safetyNote&&s.auditDate&&s.desc);
    if(s.custom)assert.equal(typeof customRender[s.custom],'function');
    else assert.ok(s.questions?.length);
  });
}
const scoreById=id=>scores.find(x=>x.id===id);
const calculate=(id,v)=>{
  selected=v;
  calculateGeneric(scoreById(id));
  return {value:outputs['#score-value'].textContent,desc:outputs['#score-text'].textContent,
          note:outputs['#score-note'].textContent};
};
function apache(values){
  const fields=Object.fromEntries(Object.entries(values).map(([k,v])=>['#ap_'+k,{value:String(v)}]));
  const all=Object.values(fields),form={
    innerHTML:'',
    querySelector:s=>fields[s]||null,
    querySelectorAll:s=>s==='input,select'?all:[]
  };
  customRender.apache2(form,scoreById('apache2'));
  const entry=all.find(x=>typeof x.oninput==='function'||typeof x.onchange==='function');
  assert.ok(entry,'APACHE II form must bind reactive inputs');
  (entry.oninput||entry.onchange)();
  return {value:outputs['#score-value'].textContent,desc:outputs['#score-text'].textContent,
          note:outputs['#score-note'].textContent};
}
const normal={
  age:40,temp:37,map:85,hr:90,rr:18,fio:0.21,pao:90,aa:180,
  acidmode:'ph',ph:7.4,hco:25,na:140,k:4,cr:1,arf:0,hct:40,wbc:8,gcs:15,chronic:0
};
test('APACHE II healthy reference scenario = 0',()=>{
  const v=apache(normal);
  assert.equal(v.value,'0 / 71');
  assert.match(v.desc,/fisiologia 0 \+ idade 0 \+ condição crônica 0/);
});
test('APACHE II extreme 12 physiological variables with ARF and chronic status reaches 71',()=>{
  const v=apache({
    age:80,temp:29,map:40,hr:200,rr:2,fio:.7,pao:90,aa:600,
    acidmode:'ph',ph:7.1,hco:25,na:100,k:8,cr:4,arf:1,hct:10,wbc:50,gcs:3,chronic:5
  });
  assert.equal(v.value,'71 / 71');
  assert.match(v.desc,/fisiologia 60 \+ idade 6 \+ condição crônica 5/);
});
test('APACHE II selected oxygenation depends on FiO2 and A-a gradient',()=>{
  assert.equal(apache({...normal,fio:.5,aa:400}).value,'3 / 71');
  assert.equal(apache({...normal,fio:.49,pao:50}).value,'4 / 71');
  assert.equal(apache({...normal,fio:.5,aa:''}).value,'—');
  assert.equal(apache({...normal,fio:.49,pao:''}).value,'—');
});
test('APACHE II allows HCO3 fallback and avoids treating unknown gasometry as normal',()=>{
  assert.equal(apache({...normal,acidmode:'hco',hco:14}).value,'4 / 71');
  assert.equal(apache({...normal,acidmode:'hco',hco:''}).value,'—');
  assert.equal(apache({...normal,acidmode:'ph',ph:''}).value,'—');
});
test('APACHE II doubles creatinine score only with acute renal failure',()=>{
  assert.equal(apache({...normal,cr:2.5,arf:0}).value,'3 / 71');
  assert.equal(apache({...normal,cr:2.5,arf:1}).value,'6 / 71');
});
test('APACHE II age and severe chronic health points apply only when selected',()=>{
  assert.equal(apache({...normal,age:45}).value,'2 / 71');
  assert.equal(apache({...normal,age:75,chronic:2}).value,'8 / 71');
  assert.equal(apache({...normal,age:75,chronic:5}).value,'11 / 71');
});
test('APACHE II rejects invalid or missing clinical values',()=>{
  for(const v of [{...normal,age:17},{...normal,gcs:16},{...normal,na:''},{...normal,k:11},
                  {...normal,age:40.5},{...normal,rr:12.5},{...normal,acidmode:'ph',ph:8.8}]){
    assert.equal(apache(v).value,'—');
  }
});
test('POSSUM requires all eighteen components with explicit ranges',()=>{
  const s=scoreById('possum');assert.equal(s.questions.length,19);
  const minima=s.questions.map(q=>Math.min(...q.options.map(o=>Number(o.value))));
  const maxima=s.questions.map(q=>Math.max(...q.options.map(o=>Number(o.value))));
  assert.equal(minima.slice(0,12).reduce((a,b)=>a+b,0),12);
  assert.equal(minima.slice(12,18).reduce((a,b)=>a+b,0),6);
  assert.equal(maxima.slice(0,12).reduce((a,b)=>a+b,0),88);
  assert.equal(maxima.slice(12,18).reduce((a,b)=>a+b,0),48);
  assert.equal(calculate('possum',[...Array(17).fill(1),'',0]).value,'—');
  assert.equal(calculate('possum',[...Array(18).fill(1),-999]).value,'Incompleto');
});
test('P-POSSUM uses exact regression coefficients and subtotals',()=>{
  const vals=[...Array(12).fill(1),...Array(6).fill(1),0];
  const result=calculate('possum',vals);
  const risk=100/(1+Math.exp(-(-9.065+0.1692*12+0.1550*6)));
  assert.equal(result.value,'P-POSSUM: '+risk.toLocaleString('pt-BR',{minimumFractionDigits:2,maximumFractionDigits:2})+'% mortalidade');
  assert.match(result.desc,/fisiológico 12 \/ operatório 6/);
  assert.match(result.desc,/Morbidade POSSUM estimada/);
});
test('P-POSSUM extreme categories produce a finite probability',()=>{
  const s=scoreById('possum');
  const max=s.questions.map(q=>Math.max(...q.options.map(o=>+o.value)));
  const result=calculate('possum',max);
  assert.match(result.value,/P-POSSUM:/);
  assert.ok(!result.value.includes('NaN')&&!result.value.includes('Infinity'));
  assert.match(result.desc,/fisiológico 88 \/ operatório 48/);
});
test('B-PEWS-Br score has three 0-3 domains and one 0-2 extra, maximum 11',()=>{
  const s=scoreById('pews');
  assert.equal(s.questions.length,4);
  assert.equal(s.questions.reduce((a,q)=>a+Math.min(...q.options.map(x=>x.value)),0),0);
  assert.equal(s.questions.reduce((a,q)=>a+Math.max(...q.options.map(x=>x.value)),0),11);
  assert.equal(calculate('pews',[0,0,0,0]).value,'0');
  assert.equal(calculate('pews',[3,3,3,2]).value,'11');
  assert.match(calculate('pews',[1,0,0,2]).desc,/deterioração/);
  assert.equal(calculate('pews',[0,'',0,0]).value,'—');
});
test('Asset version and nonduplication retained in batch10',()=>{
  assert.match(read('trabalho/scores/index.html'),/work-scores\.js\?v=20261030-batch10/);
  for(const id of ids)assert.equal(scores.filter(s=>s.id===id).length,1);
});
