'use strict';
// node --test tests/clinical-calculators-barcelona.test.cjs
const test=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const vm=require('node:vm');
const root=path.join(__dirname,'..');
const script=fs.readFileSync(path.join(root,'assets/js/clinical-calculators-barcelona.js'),'utf8');
const page=fs.readFileSync(path.join(root,'trabalho/calculadora/index.html'),'utf8');
const worker=fs.readFileSync(path.join(root,'service-worker.js'),'utf8');
const scope={window:{}};
vm.runInNewContext(script,scope,{filename:'clinical-calculators-barcelona.js'});
const {hadlock,hadlockAcFl,classify}=scope.window.TraubeBarcelona;
const base={weeks:'32',days:'2',pct:'8',uaFlow:'presente',uaPct:'50',mcaPct:'50',cprPct:'50',utaPct:'50'};
function result(extra){return classify({...base,...extra});}
test('integração inclui módulo/CSS, ordem e cache offline PWA',()=>{
  assert.match(page,/clinical-calculators-barcelona\.js\?v=20261106-1/);
  assert.match(page,/clinical-calculators-barcelona\.css\?v=20261106-1/);
  assert.ok(page.indexOf('clinical-calculators-batch4.js')<page.indexOf('clinical-calculators-barcelona.js'));
  assert.match(worker,/clinical-calculators-barcelona\.js\?v=20261106-1/);
  assert.match(worker,/clinical-calculators-barcelona\.css\?v=20261106-1/);
});
test('Hadlock BPD HC AC FL e variante AC FL: g com entradas em mm',()=>{
  const h=hadlock(80,290,270,60);
  const a=80/10, b=290/10, c=270/10, d=60/10;
  const expected=Math.pow(10,1.3596+0.0064*b+0.0424*c+0.174*d+0.00061*a*c-0.00386*c*d);
  assert.ok(Math.abs(h-expected)<1e-7);
  assert.ok(h>1700&&h<1800);
  assert.ok(hadlockAcFl(270,60)>1700);
  assert.throws(()=>hadlock(800,290,270,60));
});
test('Doppler: RCP e uterinas são médias aritméticas, sem estimar percentis',()=>{
  const r=result({uaPi:'1.2',mcaPi:'1.8',utaR:'0.8',utaL:'1.0',cprPct:'',utaPct:''});
  assert.ok(Math.abs(r.cpr-1.5)<1e-10);
  assert.ok(Math.abs(r.utaMean-0.9)<1e-10);
  assert.ok(r.warnings.some(w=>w.includes('percentil NÃO')));
});
const examples=[
  ['PIG/PEG',{},'peg'],
  ['RCF I peso p2',{pct:'2'},'i'],
  ['RCF I ACM',{mcaPct:'3'},'i'],
  ['RCF I RCP',{cprPct:'3'},'i'],
  ['RCF I artéria umbilical',{uaPct:'97'},'i'],
  ['RCF I uterinas',{utaPct:'97'},'i'],
  ['RCF II diástole ausente',{uaFlow:'ausente',repeated:'sim'},'ii'],
  ['RCF III diástole reversa',{uaFlow:'reverso',repeated:'sim'},'iii'],
  ['RCF III ducto venoso',{dvPct:'97',repeated:'sim'},'iii'],
  ['RCF IV DV onda a reversa',{dvFlow:'reverso',repeated:'sim'},'iv'],
  ['RCF IV CTG',{ctg:'patologica'},'iv'],
  ['RCF IV STV 28s',{weeks:'28',stv:'2.5'},'iv'],
  ['Sem RCF por peso, mas Doppler alterado',{pct:'12',uaFlow:'ausente'},'nao-pequeno'],
  ['Doppler incompleto',{uaPct:'',mcaPct:'',cprPct:'',utaPct:''},'incompleto'],
  ['Percentil não informado',{pct:''},'incompleto']
];
for(const [label,inputs,expected] of examples){
  test(label,()=>assert.equal(result(inputs).code,expected));
}
test('achados com repetição exigida não são falsamente confirmados',()=>{
  const r=result({uaFlow:'ausente'});
  assert.equal(r.code,'ii');
  assert.equal(r.confirmed,false);
  assert.ok(r.warnings.some(x=>x.includes('confirmação seriada')));
});
test('gestação abaixo 26s não avalia STV como patológica pelo corte ≥26s',()=>{
  const r=result({weeks:'25',stv:'1.0'});
  assert.equal(r.code,'peg');
  assert.ok(r.warnings.some(w=>w.includes('26 semanas')));
});
test('não atribui estágio grave quando percentil não informado',()=>{
  const r=result({pct:'',dvFlow:'reverso'});
  assert.equal(r.code,'incompleto');
  assert.ok(r.warnings.some(w=>w.includes('urgente')));
});
test('rejeita entradas inconsistentes',()=>{
  for(const v of [{days:'7'},{weeks:'19'},{pct:'101'},{pct:'-1'},{uaPi:'-2'},{stv:'-1'}]){
    assert.throws(()=>result(v));
  }
});
