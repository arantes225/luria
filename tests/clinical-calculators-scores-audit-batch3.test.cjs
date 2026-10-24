'use strict';
/* node --test tests/clinical-calculators-scores-audit-batch3.test.cjs
 * Auditoria 3/6 = calculadoras 61–71 (11) + escores 1–19 (19)
 */
const test=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path');
const root=path.resolve(__dirname,'..');
const read=p=>fs.readFileSync(path.join(root,p),'utf8');
const html=read('trabalho/calculadora/index.html'),exp=read('assets/js/clinical-calculators-expansion.js');
const aa=['assets/js/clinical-calculators-audit-batch1.js','assets/js/clinical-calculators-audit-batch2.js','assets/js/clinical-calculators-audit-batch3.js'].map(read);
const s=html.indexOf('const C=['),e=html.indexOf('function calcInterpret(',s);
assert.ok(s>=0&&e>s);
const lib=new Function(html.slice(s,e)+';return {C,defs,calcInterpretations};')();
new Function('C','defs','calcInterpretations','cats','render',exp)(lib.C,lib.defs,lib.calcInterpretations,['Todos','Favoritas'],()=>{});
for(const script of aa)new Function('C','defs','calcInterpretations',script)(lib.C,lib.defs,lib.calcInterpretations);
const {C,defs,calcInterpretations}=lib;
const ids=['gestgain','burnnine','burnfluid','mifflin','tdee','protein','caconv','plateletconv','fib4','meld3','light'];
const examples=[
 [{pre:65,now:61,ig:16},-4],
 [{age:30,head:'0',front:'18',back:'0',armr:'9',arml:'0',legr:'0',legl:'0',per:'0'},27],
 [{w:70,scq:25,age:45},3500],
 [{w:70,h:170,age:30,sex:'Masculino'},1617.5],
 [{bmr:1500,factor:'1.55'},2325],
 [{w:70,target:1.2},84],
 [{ca:8.016},2],
 [{plt:0},0],
 [{age:66,ast:40,alt:40,plt:200},66*40/(200*Math.sqrt(40))],
 [{age:52,cr:1,bil:1,inr:1,na:137,alb:3.5,sex:'Masculino',dial:'Não'},6],
 [{pp:3.5,sp:7,pl:150,sl:300,uln:225},0]
];
test('calculadoras 61–71 na ordem prevista e referenciadas',()=>{
 assert.deepEqual(C.slice(60,71).map(x=>x[4]),ids);
 assert.match(html,/clinical-calculators-audit-batch3\.js\?v=20261024-batch3/);
 for(const id of ids){assert.ok(defs[id]?.reference);assert.equal(defs[id].auditDate,'2026-10-24');}
});
ids.forEach((id,i)=>test('lote3 cálculo '+(i+61)+' '+id,()=>{
 const [input,want]=examples[i];
 assert.equal(defs[id].validate(input),'');
 const [result]=defs[id].calc(input);
 assert.ok(Number.isFinite(result));assert.ok(Math.abs(result-want)<.000001, id+': '+result+' ≠ '+want);
}));
const blocked=[
 ['burnnine',{...examples[1][0],age:10}],
 ['burnfluid',{w:70,scq:15,age:45}],
 ['mifflin',{w:70,h:170,age:12,sex:'Masculino'}],
 ['tdee',{bmr:1500,factor:'3'}],
 ['protein',{w:70,target:5}],
 ['caconv',{ca:30}],
 ['plateletconv',{plt:-1}],
 ['fib4',{age:34,ast:30,alt:30,plt:200}],
 ['meld3',{age:17,cr:1,bil:1,inr:1,na:137,alb:3.5,sex:'Masculino',dial:'Não'}],
 ['light',{pp:3,sp:0,pl:140,sl:200,uln:180}]
];
blocked.forEach(([id,value],i)=>test('bloqueio lote3 '+(i+1)+' '+id,()=>assert.ok(defs[id].validate(value))));
test('classificações FIB-4 por idade, MELD 3.0 e Light',()=>{
 assert.match(calcInterpretations.fib4(1.6,'',{age:65}),/abaixo do limiar/);
 assert.match(calcInterpretations.fib4(1.6,'',{age:45}),/intermediário/);
 assert.match(calcInterpretations.light(0),/transudato/);
 assert.match(calcInterpretations.light(1),/exsudato/);
 assert.equal(defs.light.calc({pp:4,sp:6,pl:170,sl:280,uln:200})[0],3);
 assert.equal(defs.meld3.calc({age:55,cr:1,bil:1,inr:1,na:137,alb:3.5,sex:'Masculino',dial:'Não'})[0],6);
});
const script=read('assets/js/work-scores.js');
const evaluator=script.replace('(() => {','return (() => {').replace(
 '  document.readyState==="loading"?document.addEventListener("DOMContentLoaded",mount):mount();',
 '  return {scores};');
const state=new Function('document','localStorage',evaluator)({readyState:'loading',addEventListener(){}},{getItem:()=>null});
const scoreIds=['gcs','news2','qsofa','sofa','heart','cha2ds2vasc','hasbled','wellspe','perc','wellsdvt','spesi','curb65','nihss','abcd2','childpugh','meldna','gbs','bisap','alvarado'];
test('19 escores presentes em sequência e documentação clínica',()=>{
 assert.deepEqual(state.scores.slice(0,19).map(s=>s.id),scoreIds);
 for(const s of state.scores.slice(0,19)){
  assert.ok(s.reference,s.id);assert.ok(s.safetyNote,s.id);assert.equal(s.auditDate,'2026-10-24');
 }
});
const sums={gcs:[3,15],qsofa:[0,3],heart:[0,10],cha2ds2vasc:[0,9],hasbled:[0,9],wellspe:[0,12.5],wellsdvt:[-2,9],spesi:[0,6],curb65:[0,5],nihss:[0,42],abcd2:[0,7],childpugh:[5,15],bisap:[0,5],alvarado:[0,10]};
Object.entries(sums).forEach(([id,[min,max]])=>test('pontuação de limites '+id,()=>{
 const score=state.scores.find(s=>s.id===id);assert.ok(score.questions?.length);
 const lows=score.questions.map(q=>Math.min(...q.options.map(o=>Number(o.value))));
 const highs=score.questions.map(q=>Math.max(...q.options.map(o=>Number(o.value))));
 assert.equal(lows.reduce((a,b)=>a+b,0),min);
 assert.equal(highs.reduce((a,b)=>a+b,0),max);
 assert.ok(score.interpret(min));assert.ok(score.interpret(max));
}));
test('PERC exige confirmação da probabilidade pré-teste baixa',()=>{
 const score=state.scores.find(s=>s.id==='perc');
 assert.equal(score.questions.length,9);
 assert.match(score.questions[8].label,/pré-teste/);
 assert.match(script,/s.id==="perc"&&vals\[vals.length-1\]==="1"/);
});
test('NEWS2 Escala 2 exige hipercapnia confirmada',()=>{
 assert.match(script,/n_hyper/);
 assert.match(script,/n_scale"\)\.value===2&&\+\$\("#n_hyper"\)\.value!==1/);
});
test('SOFA clássico corrige faixas de catecolaminas e creatinina',()=>{
 assert.match(script,/Dopamina >5 a ≤15/);
 assert.match(script,/Dopamina >15/);
 assert.match(script,/≥5,0 ou diurese <200/);
});
test('MELD-Na histórico não aplica correção de sódio se MELD ≤11',()=>{
 assert.match(script,/meld>11\?meld\+1\.32/);
 assert.match(script,/MELD-Na histórico/);
});
test('NEWS2, SOFA, MELD-Na e Glasgow-Blatchford têm métodos específicos',()=>{
 for(const id of ['news2','sofa','meldna','gbs'])assert.ok(state.scores.find(s=>s.id===id).custom);
});
