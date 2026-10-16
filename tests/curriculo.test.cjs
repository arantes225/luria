const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const { JSDOM } = require('jsdom');
const core = require('../assets/js/curriculo-core.js');
const root = path.resolve(__dirname, '..');
const sandbox = { window: {} };
vm.runInNewContext(fs.readFileSync(path.join(root,'assets/js/curriculo-rubricas.js'),'utf8'),sandbox);
const rubric = sandbox.window.LuriaCurriculoRubricas[0];
test('FMUSP caps every group and applies ENAMED before the final 100 cap', () => {
  const answers = {};
  rubric.criteria.forEach(row => row.parts.forEach(part => { answers[part.id] = 999; }));
  answers.multiplier = '5';
  const score = core.score(rubric, answers);
  assert.equal(score.subtotal, 100);
  assert.equal(score.total, 100);
  assert.equal(score.multiplier,1.2);
  assert.equal(core.score(rubric,{m2:1,s1:2,multiplier:'4'}).total,7.7);
  assert.equal(core.score({...rubric,status:'pending'},answers),null);
});
test('malformed, negative, fractional and incompatible inputs cannot inflate scores', () => {
  assert.equal(core.score(rubric,{s1:-2,m1:Infinity,a1:'bad'}).total,0);
  assert.equal(core.score(rubric,{s1:1.9}).total,2);
  assert.equal(core.score(rubric,{d2:1,d3:1}).total,4);
});
test('suggestions require reviewed eligibility data and never infer it from a Lattes title',()=>{
  const items=[
    {category:'monitoria',hours:'128',reviewed:true,meta:{semesters:'2',official:true}},
    {category:'artigo',title:'PubMed ACLS',reviewed:false,meta:{index:'pubmed',separateFromIC:true}},
    {category:'pesquisa',reviewed:true,meta:{semesters:'2',funding:'yes',published:'no'}},
    {category:'curso',year:'2026',reviewed:true,meta:{course:'ACLS',certifier:'AHA',inPerson:true,validForRegistration:true}},
    {category:'curso',year:'2026',reviewed:true,meta:{course:'BLS',certifier:'AHA',inPerson:false,validForRegistration:true}}
  ];
  const suggested=core.suggestFmusp(items);
  assert.equal(suggested.m2,1);assert.equal(suggested.a1,0);assert.equal(suggested.p2,1);assert.equal(suggested.s1,1);
  assert.equal(core.score(rubric,suggested).total,7);
});
test('PSU-MG preserves the official 13-point scale and exclusive academic bands',()=>{
  const psu=sandbox.window.LuriaCurriculoRubricas.find(row=>row.institution==='PSU-MG');
  const answers={};psu.criteria.forEach(row=>row.parts.forEach(part=>{answers[part.id]=1;}));
  assert.equal(core.score(psu,answers).total,13);
  assert.equal(core.score(psu,{'mg-n1a':1,'mg-n1b':1,'mg-n2a':1}).total,3);
  assert.equal(core.score(psu,{'mg-liga1':1,'mg-repr':1}).total,1.1);
});
test('Lattes parses supported records, removes duplicates, requires review and rejects unsafe XML', () => {
  const { DOMParser } = new JSDOM('').window;
  const xml = '<CURRICULO-VITAE><ARTIGO-PUBLICADO><DADOS-BASICOS-DO-ARTIGO TITULO-DO-ARTIGO="Estudo clínico" ANO-DO-ARTIGO="2025"/></ARTIGO-PUBLICADO><ARTIGO-PUBLICADO><DADOS-BASICOS-DO-ARTIGO TITULO-DO-ARTIGO="Estudo clínico" ANO-DO-ARTIGO="2025"/></ARTIGO-PUBLICADO></CURRICULO-VITAE>';
  const items = core.parseLattes(xml,DOMParser);
  assert.equal(items.length,1); assert.equal(items[0].reviewed,false);
  assert.equal(core.merge(items,items).length,1);
  assert.throws(() => core.parseLattes('<html/>',DOMParser));
  assert.throws(() => core.parseLattes('<!DOCTYPE x [<!ENTITY y SYSTEM "file:///secret">]><CURRICULO-VITAE/>',DOMParser));
  assert.throws(() => core.parseLattes('<CURRICULO-VITAE>',DOMParser));
});
function boot(userId='user-a', storage) {
  const html = fs.readFileSync(path.join(root,'aplicar/curriculo/index.html'),'utf8');
  const dom = new JSDOM(html,{url:'https://luria.test/aplicar/curriculo/',runScripts:'outside-only'});
  const w = dom.window;
  if (storage) w.localStorage.setItem(`luria:curriculo:v1:${userId}`,storage);
  for (const script of ['curriculo-core','curriculo-rubricas','curriculo']) w.eval(fs.readFileSync(path.join(root,`assets/js/${script}.js`),'utf8'));
  w.dispatchEvent(new w.CustomEvent('docmap:ready',{detail:{user:{id:userId}}}));
  return w;
}
test('manual CRUD stays scoped to the account, survives reload and renders hostile text safely', () => {
  const w = boot();
  w.document.getElementById('cv-add').click();
  const form = w.document.getElementById('cv-form');
  form.elements.title.value='<img src=x onerror=alert(1)>';
  form.elements.year.value='2026';
  form.dispatchEvent(new w.Event('submit',{bubbles:true,cancelable:true}));
  assert.equal(w.document.querySelectorAll('#cv-items article').length,1);
  assert.equal(w.document.querySelector('#cv-items img'),null);
  const saved=w.localStorage.getItem('luria:curriculo:v1:user-a');
  assert.equal(JSON.parse(saved).items.length,1);
  const reloaded=boot('user-a',saved);
  assert.equal(reloaded.document.querySelectorAll('#cv-items article').length,1);
  w.dispatchEvent(new w.CustomEvent('docmap:ready',{detail:{user:{id:'user-b'}}}));
  assert.equal(w.document.querySelectorAll('#cv-items article').length,0);
  assert.equal(w.localStorage.getItem('luria:curriculo:v1:user-b'),null);
  reloaded.document.querySelector('#cv-items button[aria-label^="Excluir"]').click();
  assert.equal(JSON.parse(reloaded.localStorage.getItem('luria:curriculo:v1:user-a')).items.length,0);
  w.close(); reloaded.close();
});
test('rubric changes persist and malformed saved answers recover', () => {
  const w = boot('user-a',JSON.stringify({items:[],answers:{[rubric.id]:null}}));
  const input=w.document.querySelector('[data-part="s1"]'); input.value='2'; input.dispatchEvent(new w.Event('input'));
  assert.match(w.document.getElementById('cv-score').textContent,/4 \/ 100/);
  assert.equal(JSON.parse(w.localStorage.getItem('luria:curriculo:v1:user-a')).answers[rubric.id].s1,2);
  w.close();
});
test('pending institutions never display invented grades and verified coverage is explicit',()=>{
  const w=boot();
  assert.equal(w.document.querySelectorAll('.cv-institution').length,15);
  assert.match(w.document.getElementById('cv-coverage').textContent,/2 editais conferidos/);
  const option=[...w.document.getElementById('cv-exam').options].find(option=>option.textContent.startsWith('UNIFESP'));
  w.document.getElementById('cv-exam').value=option.value;
  w.document.getElementById('cv-exam').dispatchEvent(new w.Event('change'));
  assert.match(w.document.getElementById('cv-score').textContent,/indisponível/);
  assert.equal(w.document.querySelectorAll('#cv-rules input').length,0);
  w.close();
});
