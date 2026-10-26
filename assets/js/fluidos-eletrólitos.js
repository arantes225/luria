(function(){
  'use strict';
  const q=(s,r=document)=>r.querySelector(s), qa=(s,r=document)=>Array.from(r.querySelectorAll(s));
  const n=(id)=>Number.parseFloat(q('#'+id)?.value);
  const valid=(...v)=>v.every(Number.isFinite);
  const out=(id,text)=>{const el=q('#'+id);if(el)el.textContent=text;};
  const fmt=(v,u='')=>Number.isFinite(v)?`${v.toFixed(1)}${u}`:'Dados insuficientes';
  const calc={
    maintenance:w=>w<=10?4*w:w<=20?40+2*(w-10):60+1*(w-20),
    osmolality:(na,g,b)=>2*na+g/18+b/2.8,
    anionGap:(na,cl,hco3,k)=>na-cl-hco3+(k?0:0),
    correctedNa:(na,g)=>na+0.024*(g-100),
    waterDeficit:(w,na,target,factor)=>w*factor*(na/target-1),
    fena:(una,pna,ucr,pcr)=>pna>0&&ucr>0?100*(una*pcr)/(pna*ucr):NaN,
    adrogueMadias:(w,factor,naInf,naSerum)=>(naInf-naSerum)/(w*factor+1),
    correctedCa:(ca,alb)=>ca+0.8*(4-alb),
    bicarbDeficit:(w,hco3)=>(0.4*w)*(24-hco3),
    winterPco2:hco3=>1.5*hco3+8,
    metAlkPco2:hco3=>0.7*(hco3-24)+40,
    holidaySegar24:w=>w<=10?100*w:w<=20?1000+50*(w-10):1500+20*(w-20)
  };
  window.LURIA_FLUIDS={calc};
  qa('[data-fluids-tab]').forEach(tab=>tab.addEventListener('click',()=>{qa('[data-fluids-tab]').forEach(x=>x.classList.toggle('is-active',x===tab));qa('[data-fluids-panel]').forEach(x=>x.classList.toggle('is-active',x.dataset.fluidsPanel===tab.dataset.fluidsTab));}));
  qa('[data-alert]').forEach(x=>x.addEventListener('change',()=>{const messages=qa('[data-alert]:checked').map(a=>a.dataset.message);const el=q('#fluid-alerts');el.classList.toggle('has-alert',messages.length>0);el.textContent=messages.length?messages.map(m=>`• ${m}`).join('\n'):'Nenhum alerta selecionado.';}));
  qa('[data-calc]').forEach(btn=>btn.addEventListener('click',()=>{const c=btn.dataset.calc;
    if(c==='maintenance'){const w=n('calc-weight');out('out-maintenance',valid(w)&&w>0?`${fmt(calc.maintenance(w),' mL/h')} · ${fmt(calc.maintenance(w)*24,' mL/24h')}`:'Informe um peso válido.');}
    if(c==='osmolality'){const v=[n('calc-na'),n('calc-glucose'),n('calc-bun')];out('out-osmolality',valid(...v)?`${fmt(calc.osmolality(...v),' mOsm/kg')}`:'Informe Na, glicose e BUN.');}
    if(c==='anion-gap'){const v=[n('calc-ag-na'),n('calc-ag-cl'),n('calc-ag-hco3')];out('out-anion-gap',valid(...v)?`${fmt(calc.anionGap(...v),' mmol/L')}`:'Informe Na, Cl e HCO₃.');}
    if(c==='corrected-na'){const v=[n('calc-cna'),n('calc-cglucose')];out('out-corrected-na',valid(...v)?`${fmt(calc.correctedNa(...v),' mmol/L')} · fator 2,4 mEq/L por 100 mg/dL`:'Informe Na e glicose.');}
    if(c==='water-deficit'){const v=[n('calc-water-weight'),n('calc-water-na'),n('calc-water-target')];const factor=q('#calc-water-sex').checked?.6:.5;out('out-water-deficit',valid(...v)&&v.every(x=>x>0)&&v[1]>v[2]?`${fmt(calc.waterDeficit(...v,factor),' L')}`:'Sem déficit estimável com esses dados.');}
    if(c==='fena'){const v=[n('calc-fena-una'),n('calc-fena-pna'),n('calc-fena-ucr'),n('calc-fena-pcr')];out('out-fena',valid(...v)&&v.every(x=>x>0)?`${fmt(calc.fena(...v),' %')}`:'Informe as quatro medidas.');}
    if(c==='adrogue'){const w=n('calc-am-weight'),naS=n('calc-am-na'),naI=n('calc-am-inf'),f=Number.parseFloat(q('#calc-am-factor')?.value||'0.6');if(valid(w,naS,naI,f)&&w>0){const dNa=calc.adrogueMadias(w,f,naI,naS);const volFor6=Math.abs(dNa)>0.01?Math.round((6/Math.abs(dNa))*1000):0;out('out-adrogue',`ΔNa por 1 L: ${dNa>=0?'+':''}${dNa.toFixed(2)} mEq/L · Vol. p/ variar 6 mEq/L: ~${volFor6} mL (${Math.round(volFor6/24)} mL/h)`);}else{out('out-adrogue','Informe peso, Na sérico e solução.');}}
    if(c==='corrected-ca'){const ca=n('calc-ca-total'),alb=n('calc-ca-alb');out('out-corrected-ca',valid(ca,alb)&&ca>0&&alb>0?`${fmt(calc.correctedCa(ca,alb),' mg/dL')} (Ref: 8,5–10,5 mg/dL)`:'Informe Ca total e albumina.');}
    if(c==='bicarb-deficit'){const w=n('calc-bic-weight'),h=n('calc-bic-hco3');out('out-bicarb-deficit',valid(w,h)&&w>0&&h<24?`Déficit: ${fmt(calc.bicarbDeficit(w,h),' mEq')} (Repor 50% em 2–4h se pH < 7,10)`:'Informe peso e HCO₃ < 24 mEq/L.');}
    if(c==='gasometry'){const ph=n('calc-gas-ph'),pco2=n('calc-gas-pco2'),hco3=n('calc-gas-hco3');if(valid(ph,pco2,hco3)){let res='';if(ph<7.35&&hco3<22){const w=calc.winterPco2(hco3);res=`Acidose Metabólica · PaCO₂ esperada (Winter): ${(w-2).toFixed(1)}–${(w+2).toFixed(1)} mmHg (${pco2>w+2?'+ Acidose Resp. associada':pco2<w-2?'+ Alcalose Resp. associada':'Compensada'})`;}else if(ph>7.45&&hco3>26){const e=calc.metAlkPco2(hco3);res=`Alcalose Metabólica · PaCO₂ esperada: ${(e-2).toFixed(1)}–${(e+2).toFixed(1)} mmHg`;}else if(ph<7.35&&pco2>45){res=`Acidose Respiratória · HCO₃ esperado: Aguda ~${(24+0.1*(pco2-40)).toFixed(1)} / Crônica ~${(24+0.35*(pco2-40)).toFixed(1)} mEq/L`;}else if(ph>7.45&&pco2<35){res=`Alcalose Respiratória · HCO₃ esperado: Aguda ~${(24-0.2*(40-pco2)).toFixed(1)} / Crônica ~${(24-0.4*(40-pco2)).toFixed(1)} mEq/L`;}else{res=`pH ${ph.toFixed(2)} · Avaliar distúrbio misto ou compensado`;}out('out-gasometry',res);}else{out('out-gasometry','Informe pH, PaCO₂ e HCO₃.');}}
    if(c==='peds-plan'){const w=n('calc-peds-w');if(valid(w)&&w>0){out('out-peds-plan',`Plano B (TRO 4h): ${Math.round(w*50)} a ${Math.round(w*100)} mL SRO VO · Plano C (Choque): Bolus ${Math.round(w*20)} mL SF 0,9% IV · Holliday 24h: ${Math.round(calc.holidaySegar24(w))} mL/dia`);}else{out('out-peds-plan','Informe o peso da criança.');}}
    if(c==='balance'){const ins=qa('[data-balance-in]').reduce((s,x)=>s+(Number(x.value)||0),0), outs=qa('[data-balance-out]').reduce((s,x)=>s+(Number(x.value)||0),0), h=n('balance-hours');out('balance-result',valid(h)&&h>0?`Balanço: ${fmt(ins-outs,' mL')} · taxa líquida: ${fmt((ins-outs)/h,' mL/h')}`:'Informe o intervalo.');out('urine-result',valid(h)&&h>0?`Diurese registrada: ${fmt((Number(qa('[data-balance-out]')[0]?.value)||0)/h,' mL/h')} · informe peso e período para calcular mL/kg/h.`:'Diurese: —');}
    if(c==='draft'){const goal=q('#draft-goal').value.trim(),monitor=q('#draft-monitor').value.trim(),review=q('#draft-review').checked; q('#draft-output').textContent=`RASCUNHO PARA REVISÃO HUMANA\n\nObjetivo/hipótese: ${goal||'não informado'}\nMonitorização/reavaliação: ${monitor||'não informada'}\nRevisão de segurança: ${review?'marcada pelo usuário':'pendente'}\n\nNão é prescrição. Confirmar paciente, peso, função renal/cardiopulmonar, gestação/pediatria/UTI, solução institucional, fontes adicionais, limites e responsável antes de qualquer uso assistencial.`;}
  }));
})();