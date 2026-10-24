'use strict';
/* Executar: node --test tests/clinical-calculators-audit-batch1.test.cjs
 * Auditoria 1/6 - testes matemáticos e de limites; NÃO é validação clínica.
 */
const test=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const root=path.resolve(__dirname,'..');
const html=fs.readFileSync(path.join(root,'trabalho/calculadora/index.html'),'utf8');
const audit=fs.readFileSync(path.join(root,'assets/js/clinical-calculators-audit-batch1.js'),'utf8');
const start=html.indexOf('const C=[');
const end=html.indexOf('function calcInterpret(',start);
assert.ok(start>=0&&end>start,'catálogo e função de interpretação devem existir');
const env=new Function(html.slice(start,end)+';return {C,defs,calcInterpretations};')();
new Function('defs','calcInterpretations',audit)(env.defs,env.calcInterpretations);
const {C,defs,calcInterpretations}=env;
const ids=['egfr','crcl','fena','feurea','egfrcys','pam','shock','qtc','pp','ag','winter','freewater','kclprep','adrogue','nadeficit','na3vol','agc','nac','osm','ogap','delta','calcio','eag','ldl','imc','bsa','ibw','abw','pf','rox'];
const input=[
[{cr:1,age:50,sex:'Masculino'},91.6914786098],
[{age:50,w:70,cr:1,sex:'Masculino'},87.5],
[{un:20,pc:2,pn:140,uc:100},(20*2)/(140*100)*100],
[{uu:100,pc:2,pu:100,uc:100},2],
[{cr:1,cys:1,age:50,sex:'Feminino'},74.03624845635],
[{pas:120,pad:80},280/3],
[{hr:100,pas:100},1],
[{qt:400,hr:60,method:'Fridericia',sex:'Masculino'},400],
[{pas:120,pad:80},40],
[{na:140,cl:105,hco:24},11],
[{hco:12},26],
[{w:70,na:154,factor:'0.60 adulto masculino'},4.2],
[{meq:20,conc:2,hours:2,vol:500,route:'Periférica'},10],
[{w:70,na:120,factor:'0.60 adulto masculino',sol:'513 NaCl 3%',ksol:0},393/43],
[{w:70,na:125,target:130,factor:'0.60 adulto masculino'},210],
[{w:70,na:120,rise:5,factor:'0.60 adulto masculino'},1000*5*42/(513-125)],
[{na:140,cl:105,hco:20,alb:2},20],
[{na:130,glu:500,method:'1.6 Katz'},136.4],
[{na:140,glu:90,bun:14},290],
[{meas:310,na:140,glu:90,bun:14},20],
[{ag:24,hco:14},1.2],
[{ca:8,alb:2},9.6],
[{a1c:7},154.2],
[{ct:200,hdl:50,tg:150},120],
[{w:80,h:180,age:30},80/(1.8*1.8)],
[{w:80,h:180},2],
[{h:180,sex:'Masculino',age:30},50+2.3*(180/2.54-60)],
[{w:100,ideal:70,age:30},82],
[{pao:80,fio:40},200],
[{spo:94,fio:60,rr:24,time:'12 h'},(94/0.6)/24]
];
test('catálogo auditado corresponde aos primeiros 30 registros e traz referências',()=>{
  assert.deepEqual(C.slice(0,30).map(row=>row[4]),ids);
  assert.ok(html.includes('/assets/js/clinical-calculators-audit-batch1.js?v=20261024-batch1'));
  for(const id of ids){assert.ok(defs[id]?.reference,id+' sem fonte');assert.equal(defs[id]?.auditDate,'2026-10-24');}
});
ids.forEach((id,i)=>test('cálculo 1/6: '+String(i+1).padStart(2,'0')+' '+id,()=>{
  const [v,expected]=input[i];
  assert.equal(defs[id].validate?.(v)||'','',id+' recusou valores válidos');
  const [actual]=defs[id].calc(v);
  assert.ok(Number.isFinite(actual),id+': resultado não finito');
  assert.ok(Math.abs(actual-expected)<0.0001,id+': '+actual+' difere de '+expected);
}));
const rejection=[
['egfr',{cr:1,age:12,sex:'Feminino'}],
['crcl',{age:140,w:70,cr:1,sex:'Masculino'}],
['qtc',{qt:400,hr:300,method:'Bazett',sex:'Masculino'}],
['pp',{pas:80,pad:120}],
['pam',{pas:80,pad:120}],
['winter',{hco:28}],
['freewater',{w:70,na:140,factor:'0.60 adulto masculino'}],
['kclprep',{meq:40,conc:2,hours:1,vol:500,route:'Central'}],
['kclprep',{meq:20,conc:2,hours:2,vol:100,route:'Periférica'}],
['na3vol',{w:70,na:122,rise:12,factor:'0.60 adulto masculino'}],
['delta',{ag:11,hco:24}],
['ldl',{ct:160,hdl:100,tg:390}],
['imc',{w:60,h:160,age:12}],
['ibw',{h:150,sex:'Feminino',age:30}],
['abw',{w:50,ideal:70,age:30}],
['pf',{pao:80,fio:10}],
['rox',{spo:110,fio:60,rr:24,time:'6 h'}]
];
rejection.forEach(([id,v],i)=>test('bloqueio inválido '+(i+1)+' '+id,()=>assert.ok(defs[id].validate(v),id+' deveria bloquear valores inválidos')));
test('cálculo do sódio hiperglicemia: opções diferem e o sexo participa do QTc',()=>{
  const katz=defs.nac.calc({na:130,glu:500,method:'1.6 Katz'})[0];
  const hillier=defs.nac.calc({na:130,glu:500,method:'2.4 Hillier'})[0];
  assert.ok(Math.abs(katz-136.4)<1e-8&&Math.abs(hillier-139.6)<1e-8);
  assert.match(calcInterpretations.qtc(455,'ms',{sex:'Masculino'}),/acima do limite/);
  assert.match(calcInterpretations.qtc(455,'ms',{sex:'Feminino'}),/abaixo do limiar/);
});
test('ROX varia segundo tempo desde início de CNAF',()=>{
  assert.match(calcInterpretations.rox(3.2,'',{time:'2 h'}),/intermediário/);
  assert.match(calcInterpretations.rox(3.2,'',{time:'12 h'}),/maior risco de falha/);
});
