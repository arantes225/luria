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
    fena:(una,pna,ucr,pcr)=>pna>0&&ucr>0?100*(una*pcr)/(pna*ucr):NaN
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
    if(c==='balance'){const ins=qa('[data-balance-in]').reduce((s,x)=>s+(Number(x.value)||0),0), outs=qa('[data-balance-out]').reduce((s,x)=>s+(Number(x.value)||0),0), h=n('balance-hours');out('balance-result',valid(h)&&h>0?`Balanço: ${fmt(ins-outs,' mL')} · taxa líquida: ${fmt((ins-outs)/h,' mL/h')}`:'Informe o intervalo.');out('urine-result',valid(h)&&h>0?`Diurese registrada: ${fmt((Number(qa('[data-balance-out]')[0]?.value)||0)/h,' mL/h')} · informe peso e período para calcular mL/kg/h.`:'Diurese: —');}
    if(c==='draft'){const goal=q('#draft-goal').value.trim(),monitor=q('#draft-monitor').value.trim(),review=q('#draft-review').checked; q('#draft-output').textContent=`RASCUNHO PARA REVISÃO HUMANA\n\nObjetivo/hipótese: ${goal||'não informado'}\nMonitorização/reavaliação: ${monitor||'não informada'}\nRevisão de segurança: ${review?'marcada pelo usuário':'pendente'}\n\nNão é prescrição. Confirmar paciente, peso, função renal/cardiopulmonar, gestação/pediatria/UTI, solução institucional, fontes adicionais, limites e responsável antes de qualquer uso assistencial.`;}
  }));
})();

