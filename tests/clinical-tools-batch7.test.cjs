'use strict';
/* LURIA - clinical batch 7 mathematical regression. Does not constitute clinical validation.
   Run: node --test tests/clinical-tools-batch7.test.cjs */
const test=require('node:test'), assert=require('node:assert/strict'), fs=require('node:fs'),path=require('node:path');
const read=p=>fs.readFileSync(path.resolve(__dirname,'..',p),'utf8');
const source=read('assets/js/work-scores.js');
let mockValues=[];
const fields={
 '#score-value':{textContent:''},
 '#score-text':{textContent:''},
 '#score-note':{textContent:''}
};
const dom={
 readyState:'loading', addEventListener(){},
 querySelector(s){return fields[s]||null},
 querySelectorAll(s){return s==='#score-form select'?mockValues.map(v=>({value:String(v)})):[]}
};
const src=source.replace('(() => {','return (() => {')
 .replace('  document.readyState==="loading"?document.addEventListener("DOMContentLoaded",mount):mount();','  return {scores,calculateGeneric};');
const {scores,calculateGeneric}=new Function('document','localStorage',src)(
 dom,{getItem:()=>null}
);
const cases=[
 ['ranson',-999,11,12],['haps',0,3,3],['imrie',0,8,8],
 ['adrop',0,5,5],['cds',0,8,4],['cows',0,48,11],
 ['naranjo',-4,13,10],['isthdic',-999,8,5],['cam',0,4,4]
];
for(const [id,min,max,items] of cases){
 test('score '+id+': unique active form, bounds and references',()=>{
  const xs=scores.filter(s=>s.id===id);assert.equal(xs.length,1);
  const s=xs[0];assert.ok(!s.custom,'inactive reference-only form '+id);
  assert.ok(s.reference&&s.safetyNote&&s.auditDate);
  assert.equal(s.questions.length,items);
  assert.equal(s.questions.reduce((a,q)=>a+Math.min(...q.options.map(x=>+x.value)),0),min);
  assert.equal(s.questions.reduce((a,q)=>a+Math.max(...q.options.map(x=>+x.value)),0),max);
  assert.equal(typeof s.interpret(0),'string');
 });
}
const evaluate=(id,values)=>{
 const s=scores.find(s=>s.id===id);assert.ok(s);mockValues=values;calculateGeneric(s);
 return {...Object.fromEntries(Object.entries(fields).map(([k,v])=>[k,v.textContent]))};
};
test('Ranson blocks incomplete 48h even with all other risk items selected',()=>{
 const result=evaluate('ranson',[-999,...Array(11).fill(1)]);
 assert.equal(result['#score-value'],'Incompleto');
});
test('Ranson evaluates eleven items after 48h',()=>{
 assert.equal(evaluate('ranson',[0,...Array(11).fill(1)])['#score-value'],'11');
});
test('CAM respects 1 AND 2 AND (3 OR 4) and is not simple sum',()=>{
 assert.equal(evaluate('cam',[1,1,0,1])['#score-value'],'CAM positivo');
 assert.equal(evaluate('cam',[1,0,1,1])['#score-value'],'CAM negativo');
 assert.equal(evaluate('cam',[1,1,0,0])['#score-value'],'CAM negativo');
});
test('ISTH overt DIC blocks lack of predisposing disease',()=>{
 assert.equal(evaluate('isthdic',[-999,2,3,2,1])['#score-value'],'Não aplicável');
 assert.equal(evaluate('isthdic',[0,2,3,2,1])['#score-value'],'8');
});
test('COWS and Naranjo handle maximum and signed values',()=>{
 assert.equal(evaluate('cows',Array(11).fill(0))['#score-value'],'0');
 assert.equal(evaluate('cows',[4,4,5,5,4,4,5,4,4,4,5])['#score-value'],'48');
 assert.equal(evaluate('naranjo',[0,-1,0,-1,-1,-1,0,0,0,0])['#score-value'],'-4');
});
const C=[],defs={},cats=[],intps={};
new Function('C','defs','cats','render','calcInterpretations','window',read('assets/js/clinical-calculators-batch4.js'))(
 C,defs,cats,()=>{},intps,{}
);
const fixtures=[
 ['urineosmol',{na:50,k:20,uun:280,glu:90},245],
 ['urinegap',{meas:300,na:50,k:20,uun:280,glu:90},55],
 ['efwc',{vol:1500,un:40,uk:30,pn:140},750],
 ['tyg',{tg:150,glu:100},Math.log(7500)],
 ['quicki',{glu:100,ins:10},1/3],
 ['homabeta',{glu:100,ins:10},3600/37],
 ['matsuda',{g0:100,i0:10,gm:120,im:40},10000/Math.sqrt(4800000)],
 ['newbornweightloss',{birth:3500,current:3250},100*250/3500],
 ['neonatalkcal',{vol:450,density:67,weight:3.5},450*.67/3.5],
 ['nitrogenbalance',{protein:100,uun:12},0],
 ['papi',{pas:40,pad:20,rap:10},2]
];
for(const [id,args,expected] of fixtures){
 test('calc '+id+': unique, sourced and numerically correct',()=>{
  assert.equal(C.filter(r=>r[4]===id).length,1);
  const d=defs[id];assert.ok(d.reference&&d.formula&&d.auditDate);
  const n=d.calc(args)[0];assert.ok(Number.isFinite(n));assert.ok(Math.abs(n-expected)<1e-9,n+' vs '+expected);
 });
}
for(const [id,args] of [
 ['efwc',{vol:0,un:10,uk:10,pn:140}],
 ['quicki',{glu:100,ins:0}],['homabeta',{glu:63,ins:10}],
 ['matsuda',{g0:100,i0:0,gm:120,im:40}],
 ['newbornweightloss',{birth:3500,current:3550}],
 ['neonatalkcal',{vol:450,density:67,weight:0}],
 ['papi',{pas:35,pad:40,rap:5}],['tyg',{tg:0,glu:90}]
]){
 test('calc '+id+': invalid-case guard',()=>assert.throws(()=>defs[id].calc(args)));
}
test('Zero-permissive cards have explicit policy and asset versions match',()=>{
 for(const id of ['urineosmol','urinegap','efwc','nitrogenbalance'])assert.equal(defs[id].allowZero,true);
 assert.match(read('trabalho/calculadora/index.html'),/clinical-calculators-batch4\.js\?v=20261030-batch7/);
 assert.match(read('trabalho/scores/index.html'),/work-scores\.js\?v=20261030-batch8/);
});
