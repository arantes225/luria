'use strict';
/* LURIA – batch 6 isolated structure, numerical and guard tests.
   Run: node --test tests/clinical-tools-batch6.test.cjs.
   These are not prospective clinical validation or user-interface tests. */
const test=require('node:test'),assert=require('node:assert/strict');
const fs=require('node:fs'),path=require('node:path');
const read=p=>fs.readFileSync(path.resolve(__dirname,'..',p),'utf8');
const source=read('assets/js/work-scores.js');
const e=source.replace('(() => {','return (() => {')
 .replace('  document.readyState==="loading"?document.addEventListener("DOMContentLoaded",mount):mount();',
          '  return {scores};');
const scores=new Function('document','localStorage',e)({readyState:'loading',addEventListener(){}},{getItem:()=>null}).scores;
const scoreCases=[
 ['mews',0,14,5],['decaf',0,6,5],['cpot',0,8,4],['bps',3,12,3],
 ['mnutric',0,9,5],['oesil',0,4,4],['smartcop',0,11,8],['sic',0,6,3]
];
for(const [id,min,max,n] of scoreCases){
 test('score '+id+' has unique ID, correct bounds, reference and limits',()=>{
  const rows=scores.filter(s=>s.id===id);
  assert.equal(rows.length,1,'duplicated score ID');
  const x=rows[0];assert.equal(x.questions.length,n);
  assert.ok(x.reference&&x.safetyNote&&x.auditDate&&x.desc);
  assert.equal(x.questions.reduce((a,q)=>a+Math.min(...q.options.map(o=>+o.value)),0),min);
  assert.equal(x.questions.reduce((a,q)=>a+Math.max(...q.options.map(o=>+o.value)),0),max);
  assert.equal(typeof x.interpret(max),'string');
 });
}
test('SIC requires INR+platelets >2 and recognizes restricted SOFA organs',()=>{
 assert.match(source,/s.id==="sic" && vals.length===3/);
 assert.match(source,/Number\(vals\[0\]\)\+Number\(vals\[1\]\)<=2/);
 const sic=scores.find(s=>s.id==='sic');
 assert.match(sic.questions[2].label,/respiratório, cardiovascular, hepático e renal/);
});
test('SMART-COP documents age-adjusted respiratory and oxygen thresholds',()=>{
 const s=scores.find(x=>x.id==='smartcop');
 assert.match(s.questions[3].label,/≤50 anos FR ≥25/);
 assert.match(s.questions[6].label,/PaO₂ <70/);
});
const C=[],defs={},cats=[],calcInterpretations={};
new Function('C','defs','cats','render','calcInterpretations','window',
 read('assets/js/clinical-calculators-batch4.js'))(C,defs,cats,()=>{},calcInterpretations,{});
const cases=[
 ['gmi',{mean:150,days:14},6.898],
 ['glucosecv',{mean:150,sd:45},30],
 ['glucosetir',{target:800,observed:1000},80],
 ['nnt',{control:30,treated:20},10],
 ['posttestlr',{pre:10,lr:9},50],
 ['freeandrogen',{test:2,shbg:50},4],
 ['correctwbc',{wbc:10000,nrbc:25},8000],
 ['vis',{dop:5,dob:2,epi:.1,norepi:.05,mil:.2,vaso:.0001},25],
 ['qpqs',{rvd:2,rvvti:20,lvd:2,lvvti:20},1],
 ['rvsp',{trv:3,rap:5},41],
 ['avacontinuity',{d:2,vl:20,va:80},Math.PI/4],
 ['o2er',{ca:20,cv:15},25],
 ['pco2gap',{pv:48,pa:40},8]
];
for(const [id,v,want] of cases){
 test('calc '+id+' unique, referenced and matches independent numerical fixture',()=>{
  const rows=C.filter(x=>x[4]===id);assert.equal(rows.length,1);
  const d=defs[id];assert.ok(d.reference&&d.formula&&d.auditDate&&d.fields.length>0);
  const [value]=d.calc(v);assert.ok(Number.isFinite(value));
  assert.ok(Math.abs(value-want)<1e-9,id+': '+value+' != '+want);
 });
}
const invalid=[
 ['gmi',{mean:150,days:5}],
 ['glucosetir',{target:900,observed:400}],
 ['nnt',{control:20,treated:30}],
 ['posttestlr',{pre:100,lr:2}],
 ['freeandrogen',{test:1,shbg:0}],
 ['vis',{dop:-1,dob:0,epi:0,norepi:0,mil:0,vaso:0}],
 ['qpqs',{rvd:0,rvvti:10,lvd:2,lvvti:20}],
 ['rvsp',{trv:3,rap:-5}],
 ['avacontinuity',{d:2,vl:20,va:0}],
 ['o2er',{ca:15,cv:20}],
 ['pco2gap',{pv:-1,pa:40}]
];
for(const [id,v] of invalid){
 test('calc '+id+' rejects invalid inputs',()=>assert.throws(()=>defs[id].calc(v)));
}
test('zero-allowed inputs and script references are explicit',()=>{
 for(const id of ['glucosecv','glucosetir','nnt','freeandrogen','correctwbc','vis','rvsp','o2er','pco2gap'])
  assert.equal(defs[id].allowZero,true,id);
 const calcHtml=read('trabalho/calculadora/index.html');
 const scoreHtml=read('trabalho/scores/index.html');
 assert.match(calcHtml,/clinical-calculators-batch4\.js\?v=20261030-batch6/);
 assert.match(scoreHtml,/work-scores\.js\?v=20261030-batch6/);
 assert.match(calcHtml,/typeof d\.validate==='function'/);
});
