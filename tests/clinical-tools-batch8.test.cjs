'use strict';
/* LURIA - Lote 8: verificações estruturais, intervalos e fluxos não aditivos.
 * Execução: node --test tests/clinical-tools-batch8.test.cjs
 * Não constitui validação clínica prospectiva nem teste de interface no navegador. */
const test=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs'),path=require('node:path');
const read=p=>fs.readFileSync(path.resolve(__dirname,'..',p),'utf8');
const src=read('assets/js/work-scores.js');
let selected=[];
const output={'#score-value':{textContent:''},'#score-text':{textContent:''},'#score-note':{textContent:''}};
const documentStub={
  readyState:'loading',addEventListener(){},
  querySelector:s=>output[s]||null,
  querySelectorAll:s=>s==='#score-form select'?selected.map(v=>({value:String(v)})):[]
};
const injectable=src.replace('(() => {','return (() => {')
 .replace('  document.readyState==="loading"?document.addEventListener("DOMContentLoaded",mount):mount();',
          '  return {scores,calculateGeneric,customRender};');
const {scores,calculateGeneric,customRender}=new Function('document','localStorage',injectable)(
  documentStub,{getItem:()=>null}
);
const ids=['pesi','rockall','tokyochole','tokyocholang','kdigoaki','kdigockd','pasi','abcde'];
for(const id of ids){
  test(id+' replaces its reference-only placeholder once',()=>{
    const matches=scores.filter(s=>s.id===id);
    assert.equal(matches.length,1,'score ID duplication');
    const s=matches[0];
    assert.notEqual(s.custom,'reference','score still a placeholder');
    assert.ok(s.reference&&s.desc&&s.safetyNote&&s.auditDate,'metadata incomplete');
    if(s.custom)assert.equal(typeof customRender[s.custom],'function');
    else assert.ok(s.questions?.length,'score has no questions');
  });
}
const evaluate=(id,v)=>{
  selected=v;
  calculateGeneric(scores.find(s=>s.id===id));
  return {value:output['#score-value'].textContent,desc:output['#score-text'].textContent,note:output['#score-note'].textContent};
};
test('Rockall 0 and 11 are attainable',()=>{
  assert.equal(evaluate('rockall',[0,0,0,0,0]).value,'0');
  assert.equal(evaluate('rockall',[2,2,3,2,2]).value,'11');
});
test('Tokyo cholecystitis requires A+B to classify severity',()=>{
  assert.match(evaluate('tokyochole',[1,0,1,0,0,0,0,1,0,0,0,0,0]).desc,/não classificada/);
  assert.match(evaluate('tokyochole',[1,1,0,0,0,0,0,0,0,0,0,0,0]).desc,/Suspeita/);
  assert.match(evaluate('tokyochole',[1,1,1,0,0,0,0,0,0,0,0,0,0]).desc,/grau I/);
  assert.match(evaluate('tokyochole',[1,1,1,0,0,1,0,0,0,0,0,0,0]).desc,/grau II/);
  assert.match(evaluate('tokyochole',[1,1,1,0,0,0,0,1,0,0,0,0,0]).desc,/grau III/);
});
test('Tokyo cholangitis requires A+(B or C), with two moderate or one severe',()=>{
  assert.match(evaluate('tokyocholang',[0,1,1,...Array(11).fill(0)]).desc,/não classificada/);
  assert.match(evaluate('tokyocholang',[1,1,0,...Array(11).fill(0)]).desc,/Suspeita/);
  assert.match(evaluate('tokyocholang',[1,1,1,...Array(11).fill(0)]).desc,/grau I/);
  assert.match(evaluate('tokyocholang',[1,1,1,1,0,0,0,0,...Array(6).fill(0)]).desc,/grau I/);
  assert.match(evaluate('tokyocholang',[1,1,1,1,1,0,0,0,...Array(6).fill(0)]).desc,/grau II/);
  assert.match(evaluate('tokyocholang',[1,1,1,...Array(5).fill(0),1,0,0,0,0,0]).desc,/grau III/);
});
test('KDIGO AKI uses highest stage rather than sum',()=>{
  assert.match(evaluate('kdigoaki',[0,0,0,0]).value,/Sem critério/);
  assert.equal(evaluate('kdigoaki',[2,1,0,0]).value,'KDIGO LRA 2');
  assert.equal(evaluate('kdigoaki',[1,3,0,0]).value,'KDIGO LRA 3');
  assert.equal(evaluate('kdigoaki',[0,0,3,0]).value,'KDIGO LRA 3');
});
test('PASI uses region weights, reaches 0 and 72',()=>{
  assert.equal(evaluate('pasi',Array(16).fill(0)).value,'0 / 72');
  assert.equal(evaluate('pasi',Array(4).fill([6,4,4,4]).flat()).value,'72 / 72');
  assert.equal(evaluate('pasi',[6,4,4,4,...Array(12).fill(0)]).value,'7.2 / 72');
});
test('ABCDE never returns a fabricated risk score',()=>{
  assert.match(evaluate('abcde',[0,0,0,0,0]).desc,/não afasta melanoma/);
  assert.match(evaluate('abcde',[0,0,0,0,1]).desc,/1 sinal/);
});
test('Score cards require complete data',()=>{
  assert.equal(evaluate('rockall',[0,0,'',0,0]).value,'—');
});
const makeForm=(fields,selectIds)=>{
  const f={innerHTML:'',
    querySelector:s=>fields[s]||null,
    querySelectorAll:s=>s==='input,select'?Object.values(fields):s==='select'?selectIds.map(id=>fields[id]):[]};
  return f;
};
test('PESI age must be exact and uses year-for-point, no age buckets',()=>{
  const fields={'#pesi_age':{value:'62'}};
  for(let i=0;i<10;i++)fields['#pesi_q'+i]={value:'0'};
  const f=makeForm(fields,Array.from({length:10},(_,i)=>'#pesi_q'+i));
  const s=scores.find(s=>s.id==='pesi');
  customRender.pesi(f,s);
  assert.match(f.innerHTML,/Idade exata/);
  fields['#pesi_age'].oninput();
  assert.equal(output['#score-value'].textContent,'62 pontos');
  fields['#pesi_q0'].value='10';
  fields['#pesi_q0'].onchange();
  assert.equal(output['#score-value'].textContent,'72 pontos');
  assert.match(output['#score-text'].textContent,/Classe II/);
  fields['#pesi_age'].value='0';
  fields['#pesi_age'].oninput();
  assert.equal(output['#score-value'].textContent,'—');
});
test('KDIGO CKD displays G/A and does not confirm without 3 months or injury marker',()=>{
  const fields={
    '#ckd_gfr':{value:'42'},'#ckd_acr':{value:'120'},
    '#ckd_duration':{value:'1'},'#ckd_marker':{value:'0'},
    '#ckd_cause':{value:'Causa em investigação'}
  };
  const form=makeForm(fields,['#ckd_duration','#ckd_marker']);
  customRender.kdigockd(form,scores.find(s=>s.id==='kdigockd'));
  fields['#ckd_gfr'].oninput();
  assert.equal(output['#score-value'].textContent,'G3b A2');
  assert.match(output['#score-text'].textContent,/compatíveis/);
  fields['#ckd_duration'].value='0';
  fields['#ckd_duration'].onchange();
  assert.match(output['#score-text'].textContent,/não confirmam DRC/);
  fields['#ckd_duration'].value='1';fields['#ckd_gfr'].value='85';fields['#ckd_acr'].value='15';fields['#ckd_gfr'].oninput();
  assert.equal(output['#score-value'].textContent,'G2 A1');
  assert.match(output['#score-text'].textContent,/não confirmam DRC/);
  fields['#ckd_marker'].value='1';fields['#ckd_marker'].onchange();
  assert.match(output['#score-text'].textContent,/compatíveis/);
  fields['#ckd_acr'].value='';fields['#ckd_acr'].oninput();
  assert.equal(output['#score-value'].textContent,'—');
});
test('Score asset version updated for new batch',()=>{
  const h=read('trabalho/scores/index.html');
  assert.match(h,/work-scores\.js\?v=20261030-batch8/);
});
