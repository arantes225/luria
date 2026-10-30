'use strict';
/* LURIA – regression checks for batch 5; these are mathematical/structural tests,
 * not prospective clinical validation. Run: node --test tests/clinical-tools-batch5.test.cjs */
const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const read = p => fs.readFileSync(path.join(__dirname, '..', p), 'utf8');
const scoreSource = read('assets/js/work-scores.js');
const evalSource = scoreSource.replace('(() => {', 'return (() => {')
  .replace('  document.readyState==="loading"?document.addEventListener("DOMContentLoaded",mount):mount();',
           '  return { scores };');
const scores = new Function('document','localStorage',evalSource)(
  {readyState:'loading',addEventListener(){}},{getItem:()=>null}
).scores;
const scoreIds = ['ariscat','aims65','hestia','orbit','pram','sarcf','khorana','plasmic','scorten','westhaven','bap65'];
const scoreMax = [123,5,11,7,12,10,6,7,7,4,4];
for (let i=0;i<scoreIds.length;i++) {
  test('Score ' + scoreIds[i] + ': structure, bounds and provenance', ()=>{
    const score = scores.find(s=>s.id===scoreIds[i]);
    assert.ok(score, 'missing '+scoreIds[i]);
    assert.ok(score.reference && score.safetyNote && score.auditDate);
    assert.ok(score.questions.length);
    assert.equal(scores.filter(s=>s.id===score.id).length,1,'duplicate score ID');
    const min=score.questions.reduce((a,q)=>a+Math.min(...q.options.map(x=>+x.value)),0);
    const max=score.questions.reduce((a,q)=>a+Math.max(...q.options.map(x=>+x.value)),0);
    assert.equal(min,0);assert.equal(max,scoreMax[i]);
    assert.equal(typeof score.interpret(min),'string');
    assert.equal(typeof score.interpret(max),'string');
  });
}
const C=[],defs={},cats=[],calcInterpretations={};
new Function('C','defs','cats','render','calcInterpretations','window',
  read('assets/js/clinical-calculators-batch4.js'))(
    C,defs,cats,()=>{},calcInterpretations,{}
);
const examples=[
 ['tonicity',{na:140,glu:180},290],
 ['protein24h',{prot:100,vol:1500},1500],
 ['na24h',{na:100,vol:1200},120],
 ['ca24h',{ca:15,vol:1000},150],
 ['oxalate24h',{ox:20,vol:1500},30],
 ['feua',{uu:80,pc:1,pu:4,uc:100},20],
 ['fepo4',{uu:40,pc:1,pu:4,uc:100},10],
 ['feca',{uu:10,pc:1,pu:10,uc:100},1],
 ['femg',{uu:7,pc:1,pu:2,uc:100},5],
 ['pvr',{mpap:35,pawp:15,co:5},4],
 ['cpo',{map:90,co:5},450/451],
 ['lvotco',{d:2,vti:20,hr:70},Math.PI*70*20/1000],
 ['bernoulli',{v:3},36],
 ['jtc',{qtc:450,qrs:150},300],
 ['fracshort',{dd:50,ds:30},40],
 ['ddimerage',{age:70},700],
 ['waistheight',{waist:90,height:180},0.5]
];
for(const [id,values,expected] of examples) {
  test('Calculator '+id+': numerical example and reference',()=>{
    const d=defs[id];assert.ok(d,'missing '+id);
    assert.equal(C.filter(r=>r[4]===id).length,1,'duplicate id');
    assert.ok(d.reference&&d.formula&&d.auditDate);
    const [result]=d.calc(values);
    assert.ok(Number.isFinite(result),'non-finite');
    assert.ok(Math.abs(result-expected)<1e-9, 'unexpected: '+result+' vs '+expected);
  });
}
for(const [id,values] of [
  ['pvr',{mpap:10,pawp:30,co:5}],
  ['feua',{uu:1,pc:1,pu:0,uc:1}],
  ['lvotco',{d:0,vti:20,hr:70}],
  ['ddimerage',{age:5}],
  ['jtc',{qtc:100,qrs:200}]
]) {
  test('Calculator '+id+': invalid input rejected',()=>assert.throws(()=>defs[id].calc(values)));
}
test('UI calls calculator-specific validation and respects explicit zero policy',()=>{
  const html=read('trabalho/calculadora/index.html');
  assert.match(html,/typeof d\.validate==='function'/);
  assert.match(html,/d\.allowZero/);
  assert.match(html,/clinical-calculators-batch4\.js\?v=20261030-batch7/);
  const scoreHtml=read('trabalho/scores/index.html');
  assert.match(scoreHtml,/work-scores\.js\?v=20261030-batch9/);
});

test('Generic scores use querySelectorAll and BAP-65 has dedicated I–V classification',()=>{
  assert.match(scoreSource,/const vals=\$\$\("#score-form select"\)\.map\(x=>x\.value\)/);
  const bap=scores.find(x=>x.id==='bap65');
  assert.equal(bap.custom,'bap65');
  assert.match(scoreSource,/bap65\(f,s\)/);
  assert.match(scoreSource,/bap===0\?\(age\?'II':'I'\)/);
  const aims=scores.find(x=>x.id==='aims65');
  assert.ok(aims.questions.some(x=>x.label==='Idade >65 anos'));
});
