'use strict';
// node --test tests/work-scores-interpretations.test.cjs
const test=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');

const root=path.resolve(__dirname,'..');
const script=fs.readFileSync(path.join(root,'assets/js/work-scores.js'),'utf8');
const page=fs.readFileSync(path.join(root,'trabalho/scores/index.html'),'utf8');
const css=fs.readFileSync(path.join(root,'assets/css/work-scores.css'),'utf8');
const cells=Object.fromEntries(['#score-value','#score-text','#score-note'].map(id=>[id,{textContent:''}]));
const scoreSelects=[];
const inputs=new Map();
const doc={
  querySelector(selector){return cells[selector]||inputs.get(selector.slice(1))||null;},
  querySelectorAll(selector){return selector==='#score-form select'?scoreSelects:[];}
};
const originalBoot='document.readyState==="loading"?document.addEventListener("DOMContentLoaded",mount):mount();';
assert.ok(script.includes(originalBoot),'Bootstrap da página de Scores não localizado');
const evaluator=script.replace('(() => {','return (() => {').replace(originalBoot,
  'return {scores,calculateGeneric,calcIHS4,customRender,formatNum};');
const state=new Function('localStorage','document',evaluator)({getItem:()=>null},doc);

function assertResult(id){
  assert.notEqual(cells['#score-value'].textContent,'—',id+' sem pontuação');
  const interpretation=cells['#score-text'].textContent;
  assert.equal(typeof interpretation,'string',id+' sem interpretação de texto');
  assert.ok(interpretation.length>8,id+' sem texto interpretativo');
  assert.doesNotMatch(interpretation,/^Preencha/i,id+' exibe placeholder');
}
test('rótulo e scripts de interpretações estão presentes e com versão atualizada',()=>{
  assert.match(script,/const vals=\$\$\("#score-form select"\)\.map/);
  assert.match(script,/\$\$\("input",f\)\.forEach\(el=>el\.oninput=calcIHS4\)/);
  assert.match(script,/>Interpretação clínica<\/span>/);
  assert.match(css,/\.score-result \.score-result-text/);
  assert.match(page,/work-scores\.js\?v=20261106-interpret-v2/);
  assert.match(page,/work-scores\.css\?v=20261106-interpret-v2/);
});
test('todos os escores genéricos calculam e devolvem interpretação com campos preenchidos',()=>{
  const generic=state.scores.filter(x=>!x.custom);
  assert.ok(generic.length>=80,'catálogo genérico menor que o esperado');
  for(const score of generic){
    scoreSelects.splice(0,scoreSelects.length,...score.questions.map(q=>{
      const o=q.options.find(x=>x.value!==-999&&x.value!=='-999')||q.options[0];
      return {value:String(o.value)};
    }));
    state.calculateGeneric(score);
    assertResult(score.id);
    assert.equal(cells['#score-value'].textContent,state.formatNum(
      scoreSelects.reduce((a,o)=>a+Number(o.value),0)),score.id);
  }
});
test('interpretação não apresenta undefined/NaN em nenhuma pontuação alcançável',()=>{
  let count=0;
  for(const score of state.scores.filter(x=>!x.custom)){
    let sums=new Set([0]);
    for(const q of score.questions){
      const next=new Set();
      for(const s of sums)for(const o of q.options)next.add(s+Number(o.value));
      sums=next;
    }
    for(const sum of sums){
      const text=score.interpret(sum);
      assert.equal(typeof text,'string',score.id+' '+sum);
      assert.ok(text.trim().length>8,score.id+' '+sum);
      assert.doesNotMatch(text,/undefined|NaN/,score.id+' '+sum);
      count++;
    }
  }
  assert.ok(count>1000,'Cobertura insuficiente de faixas dos escores');
});
test('CIWA-Ar não pontua paciente não cooperativo e informa motivo',()=>{
  const score=state.scores.find(s=>s.id==='ciwaar');
  assert.ok(score);
  scoreSelects.splice(0,scoreSelects.length,...score.questions.map(q=>({value:String(q.options[0].value)})));
  scoreSelects[scoreSelects.length-1].value='-999';
  state.calculateGeneric(score);
  assert.equal(cells['#score-value'].textContent,'Não aplicável');
  assert.match(cells['#score-text'].textContent,/não consegue cooperar/);
});
test('PERC não exclui TEP sem baixa probabilidade pré-teste',()=>{
  const score=state.scores.find(s=>s.id==='perc');
  assert.ok(score);
  scoreSelects.splice(0,scoreSelects.length,...score.questions.map(q=>({value:String(q.options[0].value)})));
  scoreSelects[scoreSelects.length-1].value='1';
  state.calculateGeneric(score);
  assert.equal(cells['#score-value'].textContent,'Não aplicável');
  assert.match(cells['#score-text'].textContent,/probabilidade pré-teste/);
});
test('IHS4 registra e interpreta contagens zero e não-zero',()=>{
  const fields=['ih_n','ih_a','ih_t'].map(id=>{const el={value:'0',oninput:null};inputs.set(id,el);return el;});
  const form={innerHTML:'',querySelectorAll:sel=>sel==='input'?fields:[]};
  state.customRender.ihs4(form);
  assert.ok(fields.every(f=>typeof f.oninput==='function'),'Handlers dos três campos não instalados');
  fields[0].value='1';fields[1].value='2';fields[2].value='1';
  fields[2].oninput();
  assert.equal(cells['#score-value'].textContent,'9');
  assert.match(cells['#score-text'].textContent,/moderada/);
  fields.forEach(f=>{f.value='0';});
  fields[1].oninput();
  assert.equal(cells['#score-value'].textContent,'0');
  assert.match(cells['#score-text'].textContent,/leve/);
});
