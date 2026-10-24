'use strict';
/* LURIA: 2ª auditoria, calculadoras 31–60.
 * node --test tests/clinical-calculators-audit-batch2.test.cjs
 * Testes aritméticos e limites; não constituem validação clínica prospectiva.
 */
const test=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const root=path.resolve(__dirname,'..');
const html=fs.readFileSync(path.join(root,'trabalho/calculadora/index.html'),'utf8');
const exp=fs.readFileSync(path.join(root,'assets/js/clinical-calculators-expansion.js'),'utf8');
const batch1=fs.readFileSync(path.join(root,'assets/js/clinical-calculators-audit-batch1.js'),'utf8');
const batch2=fs.readFileSync(path.join(root,'assets/js/clinical-calculators-audit-batch2.js'),'utf8');
const start=html.indexOf('const C=['), end=html.indexOf('function calcInterpret(',start);
assert.ok(start>=0&&end>start);
const env=new Function(html.slice(start,end)+';return {C,defs,calcInterpretations};')();
const {C,defs,calcInterpretations}=env;
new Function('C','defs','calcInterpretations','cats','render',exp)(C,defs,calcInterpretations,['Todos','Favoritas'],()=>{});
new Function('C','defs','calcInterpretations',batch1)(C,defs,calcInterpretations);
new Function('C','defs','calcInterpretations',batch2)(C,defs,calcInterpretations);
const ids=[
 'sf','pbw','dp','cstat','hs','schwartz','gir','ig','dpp','gts',
 'mgm','mcg','mmol','temp','doseml','dosekg','diurese','mkg','uacr','homair',
 'nonhdl','mentzer','anc','tsat','reticcorr','rpi','aagrad','tidalvt','pretermcorr','igultra'
];
const fixtures=[
 [{spo:95,fio:50},190],
 [{h:180,sex:'Masculino',age:40},75.116],
 [{plat:25,peep:5},20],
 [{vt:400,plat:25,peep:5},20],
 [{w:25,age:60},65],
 [{h:120,cr:.6,age:10},82.6],
 [{conc:10,rate:6,w:3},10*10*6/(3*60)],
 [{dum:'2026-01-01',today:'2026-03-12'},10],
 [{dum:'2026-01-01'},1],
 [{ml:120,factor:'15 gotas/mL'},30],
 [{pct:5},50],
 [{mg:.5,direction:'mg → mcg'},500],
 [{glu:180.182,direction:'mg/dL → mmol/L'},10],
 [{c:0,direction:'°C → °F'},32],
 [{dose:50,conc:10},5],
 [{dose:10,w:20,weightbasis:'Atual'},200],
 [{vol:0,w:70,h:6},0],
 [{dose:.1,w:70,conc:100,weightbasis:'Atual conforme prescrição'},4.2],
 [{alb:300,cr:1},300],
 [{glu:90,ins:10},900/405],
 [{total:200,hdl:50},150],
 [{mcv:65,rbc:5,micro:'Sim'},13],
 [{wbc:1000,neut:0},0],
 [{iron:80,tibc:400},20],
 [{pct:2,hct:30,normal:45},2*30/45],
 [{retic:2,hct:25},1],
 [{fio:21,atm:760,co2:40,o2:80},.21*(760-47)-50-80],
 [{pbw:70,mlkg:6},420],
 [{birth:32,chrono:0},-8],
 [{scan:'2026-01-01',weeks:10,days:'3',ref:'2026-01-15'},(10*7+3+14)/7]
];
test('lote 2 é exatamente o catálogo 31–60 e tem referências',()=>{
 assert.deepEqual(C.slice(30,60).map(x=>x[4]),ids);
 assert.match(html,/clinical-calculators-audit-batch2\.js\?v=20261024-batch2/);
 for (const id of ids){assert.ok(defs[id].reference,id);assert.equal(defs[id].auditDate,'2026-10-24');}
});
ids.forEach((id,i)=>test('fórmula 2/6: '+String(i+31).padStart(2,'0')+' '+id,()=>{
 const [input,expected]=fixtures[i];
 assert.equal(defs[id].validate?.(input)||'','',id+' rejeitou caso válido');
 const [actual]=defs[id].calc(input);
 assert.ok(Number.isFinite(actual),id+' não finito');
 assert.ok(Math.abs(actual-expected)<.0001,id+': '+actual+' vs '+expected);
}));
const failures=[
 ['sf',{spo:105,fio:21}],
 ['pbw',{h:180,sex:'Masculino',age:17}],
 ['dp',{plat:25,peep:25}],
 ['cstat',{vt:400,plat:20,peep:25}],
 ['hs',{w:3,age:0}],
 ['schwartz',{h:120,cr:.6,age:18}],
 ['gir',{conc:80,rate:6,w:3}],
 ['ig',{dum:'2026-03-12',today:'2026-01-01'}],
 ['dpp',{dum:'2026-02-30'}],
 ['gts',{ml:2500,factor:'20 gotas/mL'}],
 ['mgm',{pct:120}],
 ['temp',{c:-300,direction:'°C → °F'}],
 ['doseml',{dose:200000,conc:1}],
 ['dosekg',{dose:5000,w:25,weightbasis:'Atual'}],
 ['diurese',{vol:0,w:70,h:0}],
 ['mkg',{dose:1000,w:70,conc:100,weightbasis:'Atual conforme prescrição'}],
 ['uacr',{alb:300,cr:0}],
 ['homair',{glu:90,ins:0}],
 ['nonhdl',{total:100,hdl:150}],
 ['mentzer',{mcv:70,rbc:5,micro:'Não'}],
 ['anc',{wbc:1000,neut:110}],
 ['tsat',{iron:400,tibc:100}],
 ['reticcorr',{pct:2,hct:0,normal:45}],
 ['rpi',{retic:2,hct:0}],
 ['aagrad',{fio:21,atm:200,co2:40,o2:80}],
 ['tidalvt',{pbw:70,mlkg:12}],
 ['pretermcorr',{birth:40,chrono:0}],
 ['igultra',{scan:'2026-01-15',weeks:10,days:'3',ref:'2026-01-01'}]
];
failures.forEach(([id,v],i)=>test('bloqueio 2/6 '+(i+1)+' '+id,()=>assert.ok(defs[id].validate(v),id+' deveria rejeitar entrada')));
test('conversores anunciam e executam ida e volta',()=>{
 assert.equal(defs.mcg.calc({mg:.5,direction:'mg → mcg'})[0],500);
 assert.equal(defs.mcg.calc({mg:500,direction:'mcg → mg'})[0],.5);
 assert.ok(Math.abs(defs.mmol.calc({glu:10,direction:'mmol/L → mg/dL'})[0]-180.182)<1e-9);
 assert.equal(defs.temp.calc({c:32,direction:'°F → °C'})[0],0);
 assert.equal(defs.temp.calc({c:-40,direction:'°C → °F'})[0],-40);
});
test('equipo de 10/15/20/60 gotas é distinto',()=>{
 for(const [factor,value] of [[10,20],[15,30],[20,40],[60,120]]) {
   const label=factor===60?'60 microgotas/mL':factor+' gotas/mL';
   assert.equal(defs.gts.calc({ml:120,factor:label})[0],value);
 }
});
test('KDIGO A3 começa exatamente em 300 mg/g',()=>{
 assert.match(calcInterpretations.uacr(29.99),/A1/);
 assert.match(calcInterpretations.uacr(30),/A2/);
 assert.match(calcInterpretations.uacr(299.99),/A2/);
 assert.match(calcInterpretations.uacr(300),/A3/);
});
test('idade corrigida, anúria e ANC 0% mantêm resultados significativos',()=>{
 assert.equal(defs.pretermcorr.calc({birth:32,chrono:0})[0],-8);
 assert.equal(defs.diurese.calc({vol:0,w:70,h:6})[0],0);
 assert.equal(defs.anc.calc({wbc:1000,neut:0})[0],0);
 assert.match(calcInterpretations.diurese(0,'',{h:6}),/Anúria/);
 assert.match(calcInterpretations.anc(0),/neutropenia grave/);
});
test('data provável do parto e IG via USG usam calendário UTC corretamente',()=>{
 assert.equal(defs.dpp.calc({dum:'2026-01-01'})[1],'08/10/2026');
 assert.match(calcInterpretations.igultra((10*7+3+14)/7),/12 semanas e 3 dias/);
});
test('RPI aplica fator por hematócrito sem usuário escolher correção livre',()=>{
 assert.deepEqual(defs.rpi.fields.map(x=>x[0]),['retic','hct']);
 assert.equal(defs.rpi.calc({retic:2,hct:45})[0],2);
 assert.equal(defs.rpi.calc({retic:2,hct:35})[0],2/1.5);
 assert.equal(defs.rpi.calc({retic:2,hct:25})[0],1);
 assert.equal(defs.rpi.calc({retic:2,hct:15})[0],.8);
});
