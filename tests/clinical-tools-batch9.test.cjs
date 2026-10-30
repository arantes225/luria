'use strict';
/* LURIA clinical tool batch 9 — isolated regression fixtures.
 * node --test tests/clinical-tools-batch9.test.cjs
 * NOT a substitute for clinical validation, permission/licensing, or browser E2E testing. */
const test=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs'),path=require('node:path');
const read=p=>fs.readFileSync(path.resolve(__dirname,'..',p),'utf8');
const source=read('assets/js/work-scores.js');
let result={
 '#score-value':{textContent:''},
 '#score-text':{textContent:''},
 '#score-note':{textContent:''}
};
const documentStub={readyState:'loading',addEventListener(){},querySelector:s=>result[s]||null,querySelectorAll:()=>[]};
const injectable=source.replace('(() => {','return (() => {')
 .replace('  document.readyState==="loading"?document.addEventListener("DOMContentLoaded",mount):mount();',
          '  return {scores,customRender};');
const {scores,customRender}=new Function('document','localStorage',injectable)(
 documentStub,{getItem:()=>null}
);
const ids=['gold','gina','pecarntce','mdq','duke'];
for(const id of ids){
 test(id+' replaces one existing reference-only entry',()=>{
   const matches=scores.filter(s=>s.id===id);
   assert.equal(matches.length,1);
   const s=matches[0];
   assert.equal(s.custom,id);
   assert.ok(s.reference&&s.safetyNote&&s.auditDate);
   assert.equal(typeof customRender[id],'function');
 });
}
function fill(id,values){
  const fields=Object.fromEntries(Object.entries(values).map(([k,v])=>['#'+k,{value:String(v)}]));
  const elements=Object.values(fields);
  const form={innerHTML:'',querySelector:s=>fields[s]||null,querySelectorAll:s=>
    s==='input,select'?elements:s==='select'?elements:[]};
  customRender[id](form,scores.find(x=>x.id===id));
  const any=elements.find(x=>typeof x.oninput==='function'||typeof x.onchange==='function');
  assert.ok(any,'no input event handlers for '+id);
  (any.oninput||any.onchange)();
  return {value:result['#score-value'].textContent,text:result['#score-text'].textContent,
    note:result['#score-note'].textContent,form,fields};
}
const gold={
 g_mode:'gold2026',g_ratio:.62,g_fev:70,
 g_symmethod:'mmrc',g_sym:1,g_mod:0,g_hosp:0
};
test('GOLD 2026 and PCDT 2025 do not share exacerbation threshold',()=>{
 assert.equal(fill('gold',gold).value,'GOLD 2 | Grupo A');
 assert.equal(fill('gold',{...gold,g_mod:1}).value,'GOLD 2 | Grupo E');
 assert.equal(fill('gold',{...gold,g_mode:'pcdt2025',g_mod:1}).value,'GOLD 2 | Grupo A');
 assert.equal(fill('gold',{...gold,g_mode:'pcdt2025',g_mod:2}).value,'GOLD 2 | Grupo E');
 assert.equal(fill('gold',{...gold,g_mode:'pcdt2025',g_hosp:1}).value,'GOLD 2 | Grupo E');
});
test('GOLD different symptom scales and all spirometric grades',()=>{
 assert.equal(fill('gold',{...gold,g_fev:82,g_symmethod:'mmrc',g_sym:2}).value,'GOLD 1 | Grupo B');
 assert.equal(fill('gold',{...gold,g_fev:51,g_symmethod:'cat',g_sym:10}).value,'GOLD 2 | Grupo B');
 assert.equal(fill('gold',{...gold,g_fev:49,g_symmethod:'cat',g_sym:9}).value,'GOLD 3 | Grupo A');
 assert.equal(fill('gold',{...gold,g_fev:29}).value,'GOLD 4 | Grupo A');
});
test('GOLD does not label nonobstructive spirometry as COPD',()=>{
 assert.match(fill('gold',{...gold,g_ratio:.7}).value,/Sem obstrução/);
 assert.equal(fill('gold',{...gold,g_ratio:.0}).value,'—');
 assert.equal(fill('gold',{...gold,g_symmethod:'mmrc',g_sym:5}).value,'—');
 assert.equal(fill('gold',{...gold,g_mod:1.5}).value,'—');
});
const gina={gi_relief:'saba',gi_day:0,gi_night:0,gi_activity:0,gi_saba:0};
test('GINA 2026 returns controlled, partly controlled and uncontrolled categories',()=>{
 assert.equal(fill('gina',gina).value,'0/4 critérios');
 assert.match(fill('gina',gina).text,/bem controlada/);
 assert.match(fill('gina',{...gina,gi_day:1}).text,/parcialmente controlada/);
 assert.match(fill('gina',{...gina,gi_day:1,gi_night:1,gi_activity:1}).text,/não controlada/);
});
test('GINA differentiates AIR reliever from SABA in the symptom-control tool',()=>{
 assert.match(fill('gina',{...gina,gi_relief:'air',gi_saba:'na'}).value,/Avaliação parcial/);
 assert.equal(fill('gina',{...gina,gi_relief:'air',gi_saba:1}).value,'—');
 assert.equal(fill('gina',{...gina,gi_relief:'saba',gi_saba:'na'}).value,'—');
});
const pecarn={pe_age:24,pe_elig:1,pe_gcs:15,pe_ams:0,pe_fracture:0,
  pe_mechanism:0,pe_loc:0,pe_sign1:0,pe_sign2:0};
test('PECARN exact boundary month 23 -> <2; month 24 -> 2-17',()=>{
 assert.match(fill('pecarntce',{...pecarn,pe_age:23}).text,/menor de 2 anos/);
 assert.match(fill('pecarntce',{...pecarn,pe_age:24}).text,/2 a 17 anos/);
 assert.match(fill('pecarntce',{...pecarn,pe_age:216}).value,/—/);
});
test('PECARN separates high, intermediate and very-low categories',()=>{
 assert.match(fill('pecarntce',pecarn).value,/Muito baixo/);
 assert.equal(fill('pecarntce',{...pecarn,pe_gcs:14}).value,'Alto risco');
 assert.equal(fill('pecarntce',{...pecarn,pe_ams:1}).value,'Alto risco');
 assert.equal(fill('pecarntce',{...pecarn,pe_sign2:1}).value,'Risco intermediário');
 assert.equal(fill('pecarntce',{...pecarn,pe_age:14,pe_sign1:1}).value,'Risco intermediário');
 assert.equal(fill('pecarntce',{...pecarn,pe_elig:0}).value,'Não aplicável');
});
const mdq={mdq_count:7,mdq_same:1,mdq_impact:2};
test('MDQ requires all three conditions and does not diagnose bipolar disorder',()=>{
 assert.equal(fill('mdq',mdq).value,'Rastreio positivo');
 assert.equal(fill('mdq',{...mdq,mdq_count:6}).value,'Rastreio não positivo');
 assert.equal(fill('mdq',{...mdq,mdq_same:0}).value,'Rastreio não positivo');
 assert.equal(fill('mdq',{...mdq,mdq_impact:1}).value,'Rastreio não positivo');
 assert.equal(fill('mdq',{...mdq,mdq_count:14}).value,'—');
 assert.match(fill('mdq',mdq).note,/não estabelece nem afasta/);
});
const duke={du_audit:1,du_pathology:0,du_major:0,du_minor:0};
test('Duke-ISCVID 2023 definite clinical or pathologic arrangements',()=>{
 assert.match(fill('duke',{...duke,du_major:2}).value,/Definitiva/);
 assert.match(fill('duke',{...duke,du_major:1,du_minor:3}).value,/Definitiva/);
 assert.match(fill('duke',{...duke,du_minor:5}).value,/Definitiva/);
 assert.match(fill('duke',{...duke,du_pathology:1}).value,/Definitiva/);
});
test('Duke possible and nondefinitive outcomes plus incomplete data',()=>{
 assert.match(fill('duke',{...duke,du_major:1,du_minor:1}).value,/Possível/);
 assert.match(fill('duke',{...duke,du_minor:3}).value,/Possível/);
 assert.match(fill('duke',duke).value,/não suficientes/);
 assert.equal(fill('duke',{...duke,du_audit:0,du_major:2}).value,'Critérios incompletos');
 assert.equal(fill('duke',{...duke,du_minor:7}).value,'—');
});
test('Score route references the batch 9 version',()=>{
 assert.match(read('trabalho/scores/index.html'),/work-scores\.js\?v=20261030-batch9/);
});
