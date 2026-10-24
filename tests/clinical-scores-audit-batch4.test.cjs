'use strict';
/* LURIA — auditoria escores 20–49 (30 ferramentas).
 * Executar: node --test tests/clinical-scores-audit-batch4.test.cjs
 * Atenção: testes estruturais e de regressão NÃO são validação prospectiva.
 */
const test=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const source=fs.readFileSync(path.resolve(__dirname,'../assets/js/work-scores.js'),'utf8');
const evalSource=source.replace('(() => {','return (() => {')
 .replace('  document.readyState==="loading"?document.addEventListener("DOMContentLoaded",mount):mount();',
          '  return {scores,calcGrace,calcPsi,calcRts,calcHints};');
const env=new Function('document','localStorage',evalSource)({
 readyState:'loading',addEventListener(){}
},{getItem:()=>null});
const scores=env.scores;
const ids=[
 'padua','apfel','bishop','apgar','mascc','stopbang','grace','timi_ua','rcri','cha2ds2va',
 'crb65','psi','ichscore','hunthess','mfisher','caprini','ciwaar','rts','hints','cage',
 'fagerstrom','framingham','centor','sirs','nyha','geneva','fourts','mmrc','bode','asa'
];
const get=id=>scores.find(x=>x.id===id);
const opts=q=>q.options.map(o=>Number(o.value));
const extrema=q=>[Math.min(...opts(q)),Math.max(...opts(q))];
test('30 escores seguem a ordem real do catálogo, todos com fonte e data',()=>{
 assert.deepEqual(scores.slice(19,49).map(x=>x.id),ids);
 assert.equal(new Set(ids).size,30);
 for(const id of ids){
   const x=get(id);assert.ok(x);assert.ok(x.reference,id);
   assert.equal(x.auditDate,'2026-10-24',id);
   assert.ok(x.safetyNote,id+' sem ressalva');
 }
});
ids.forEach((id,i)=>test('escore '+(20+i)+' '+id+' — estrutura e interpretação',()=>{
 const x=get(id);
 assert.ok(x.name&&x.desc&&x.category);
 if(x.custom){assert.ok(['grace','psi','rts','hints','framingham'].includes(x.custom));return;}
 assert.ok(x.questions?.length>0,id);
 for(const q of x.questions){
   assert.ok(q.label&&q.options?.length>=2,id+': '+q.label);
   assert.equal(new Set(q.options.map(a=>a.text)).size,q.options.length,id+': opções duplicadas');
   for(const a of q.options){assert.ok(Number.isFinite(Number(a.value)),id+' valor inválido');}
 }
 const lows=x.questions.map(q=>extrema(q)[0]),highs=x.questions.map(q=>extrema(q)[1]);
 const min=lows.reduce((sum,n)=>sum+n,0),max=highs.reduce((sum,n)=>sum+n,0);
 if(id==='ciwaar')assert.equal(min,-999);else assert.ok(min>=-1,id+' mínimo negativo inesperado');
 assert.ok(max>=min&&max<1000);
 assert.ok(typeof x.interpret(min===-999?0:min)==='string');
 assert.ok(typeof x.interpret(max)==='string');
}));
const maxFor=id=>get(id).questions.reduce((s,q)=>s+Math.max(...opts(q)),0);
const minFor=id=>get(id).questions.reduce((s,q)=>s+Math.min(...opts(q)),0);
[
 ['padua',0,20],['apfel',0,4],['bishop',0,13],['apgar',0,10],
 ['mascc',0,26],['stopbang',0,8],['timi_ua',0,7],['rcri',0,6],
 ['cha2ds2va',0,8],['crb65',0,4],['ichscore',0,6],
 ['hunthess',1,5],['mfisher',0,4],['cage',0,4],['fagerstrom',0,10],
 ['centor',-1,5],['sirs',0,4],['nyha',1,4],['geneva',0,22],
 ['fourts',0,8],['mmrc',0,4],['bode',0,10],['asa',1,6]
].forEach(([id,lo,hi])=>test('pontos limites '+id,()=>{
 assert.equal(minFor(id),lo,id+' mínimo');
 assert.equal(maxFor(id),hi,id+' máximo');
}));
test('Caprini 2013 tem idade única e procedimento principal único',()=>{
 const c=get('caprini');
 assert.equal(c.questions[0].label,'Idade');
 assert.deepEqual(opts(c.questions[0]),[0,1,2,3]);
 assert.match(c.questions[1].label,/uma categoria principal/);
 assert.deepEqual(opts(c.questions[1]),[0,1,2,5]);
 assert.ok(c.questions.length>=30);
 assert.equal(c.questions.filter(q=>q.label.startsWith('Idade')).length,1);
 assert.equal(c.questions.filter(q=>q.label.startsWith('Procedimento')).length,1);
 assert.ok(c.questions.some(q=>/trombofilia/i.test(q.label)));
 assert.ok(c.questions.some(q=>/quimioterapia/i.test(q.label)));
});
test('RCRI mantém 6 critérios e creatinina ≥2,0mg/dL',()=>{
 const s=get('rcri');assert.equal(s.questions.length,6);
 assert.match(s.questions[5].label,/≥2,0/);
 assert.match(s.reference,/2024/);
});
test('Apgar tem 5 domínios clínicos e minuto neutro para pontuação',()=>{
 const x=get('apgar');assert.equal(x.questions.length,6);
 assert.deepEqual(opts(x.questions[5]),[0,0,0]);
 assert.equal(maxFor('apgar'),10);
});
test('CIWA-Ar impede cálculo se a cooperação for impossível',()=>{
 const c=get('ciwaar');
 assert.deepEqual(opts(c.questions[c.questions.length-1]),[0,-999]);
 assert.match(source,/s.id==="ciwaar"&&vals\[vals.length-1\]==="-999"/);
 assert.match(c.safetyNote,/não utilizar/i);
});
test('HINTS impede padrão falsamente periférico sem treinamento',()=>{
 assert.match(source,/id="h_train"/);
 assert.match(source,/h_train"\)\.value!==1/);
 assert.match(get('hints').safetyNote,/treinado/i);
});
test('GRACE, PSI, RTS e Framingham não recebem classificação genérica sem equação',()=>{
 for(const id of ['grace','psi','rts','framingham']){
  assert.ok(get(id).custom,id);
 }
 assert.match(source,/A Classe I exige algoritmo clínico específico/);
});
test('BODE usa cortes de VEF1, caminhada, mMRC e IMC originais',()=>{
 const q=get('bode').questions;
 assert.match(q[0].options[1].text,/≤21/);
 assert.match(q[1].options[0].text,/≥65/);
 assert.match(q[2].options[0].text,/0–1/);
 assert.match(q[3].options[0].text,/≥350/);
});
test('Genebra revisado conforme diretriz atual de TEP',()=>{
 const q=get('geneva').questions;assert.equal(q.length,8);
 assert.deepEqual(opts(q[6]),[0,3,5]);
 assert.equal(maxFor('geneva'),22);
 assert.match(get('geneva').reference,/2026/);
});
test('mFisher distingue 0–4 com base na HSA e hemorragia intraventricular',()=>{
 assert.deepEqual(opts(get('mfisher').questions[0]),[0,1,2,3,4]);
});
