(function financeModule(){
  "use strict";
  const C=window.LuriaShiftCore;
  if(!C)return;
  const $=id=>document.getElementById(id),fmt=C.formatMoney;
  let editingPayer="",editingShift="";
  function valid(s){return s.status!=="trocado";}
  function shifts(){return C.getShifts().filter(valid);}
  function sum(list,key){return C.cents(list.reduce((a,s)=>a+C.num(key(s)),0));}
  function group(){
    const m=new Map();
    shifts().forEach(s=>{
      const name=(s.payer||s.place||"Instituição não informada").trim();
      const key=name.toLocaleLowerCase("pt-BR");
      if(!m.has(key))m.set(key,{name,shifts:[]});
      m.get(key).shifts.push(s);
    });
    return [...m.values()].sort((a,b)=>sum(b.shifts,s=>C.outstanding(s))-sum(a.shifts,s=>C.outstanding(s))||a.name.localeCompare(b.name,"pt-BR"));
  }
  function renderTotals(){
    const all=shifts(),selected=$("fin-month-select").value||C.isoToday().slice(0,7);
    const month=all.filter(s=>s.date?.slice(0,7)===selected), gross=sum(month,s=>s.value), paid=sum(month,s=>s.receivedAmount);
    const pending=sum(month,s=>C.outstanding(s)), hours=month.reduce((a,s)=>a+C.num(s.duration),0);
    $("fin-month-total").textContent=fmt(gross);
    $("fin-month-paid").textContent=fmt(paid);
    $("fin-month-pending").textContent=fmt(pending);
    $("fin-month-hourly").textContent=hours>0?fmt(gross/hours)+"/h":"—";
    $("fin-grand-total").textContent=fmt(sum(all,s=>s.value));
    $("fin-grand-paid").textContent=fmt(sum(all,s=>s.receivedAmount));
    $("fin-grand-pending").textContent=fmt(sum(all,s=>C.outstanding(s)));
    $("fin-grand-hours").textContent=`${all.reduce((a,s)=>a+C.num(s.duration),0).toLocaleString("pt-BR",{maximumFractionDigits:2})}h`;
    const overdue=all.filter(s=>C.paymentState(s)==="atrasado");
    $("fin-overdue-total").textContent=fmt(sum(overdue,s=>C.outstanding(s)));
    $("fin-overdue-count").textContent=`${overdue.length} plantão(ões) em atraso · vencimento informado`;
    return {month,all};
  }
  function ruleText(info){
    if(!info||info.paymentRule==="none")return "Sem regra de pagamento";
    if(info.paymentRule==="days")return `${info.paymentDays||0} dias após o plantão`;
    return `Dia ${info.paymentDay||15} do mês seguinte`;
  }
  function renderInstitutions(){
    const root=$("fin-hospital-breakdown");
    const settings=C.getInstitutions();
    const list=group();
    if(!list.length){root.innerHTML='<div class="fin-empty-state">Nenhum plantão cadastrado. Comece pela Escala.</div>';return;}
    root.innerHTML=`<div class="fin-institution-grid">${list.map(({name,shifts:items})=>{
      const gross=sum(items,s=>s.value),received=sum(items,s=>s.receivedAmount),
            outstanding=sum(items,s=>C.outstanding(s));
      const late=items.filter(s=>C.paymentState(s)==="atrasado");
      const institution=settings.find(i=>i.name.toLowerCase()===name.toLowerCase());
      const state=outstanding<=0.009?"Recebido":late.length?"Atrasado":items.some(s=>C.num(s.receivedAmount)>0)?"Parcial":"A receber";
      return `<article class="fin-institution-block"><div class="fin-institution-head"><div><h3>${C.escapeHtml(name)}</h3><span class="fin-institution-meta">${items.length} plantões · ${C.escapeHtml(ruleText(institution))}</span></div><span class="shift-status-badge ${outstanding<=0.009?"status-paid":"status-pending"}">${state}</span></div>
        <div class="fin-institution-numbers"><div><span>Bruto</span><strong>${fmt(gross)}</strong></div><div><span>Depositado</span><strong class="text-success">${fmt(received)}</strong></div><div><span>A cobrar</span><strong>${fmt(outstanding)}</strong></div></div>
        ${late.length?`<p class="fin-late">${late.length} plantão(ões) vencido(s) · ${fmt(sum(late,s=>C.outstanding(s)))}</p>`:""}
        <div class="fin-institution-actions"><button class="shift-action-btn" data-config="${C.escapeHtml(name)}" type="button">Prazo de pagamento</button>${outstanding>0.009?`<button class="shift-action-btn" data-charge="${C.escapeHtml(name)}" type="button">Copiar cobrança</button>`:""}</div>
        <details><summary>Ver plantões e valores</summary><div class="fin-institution-list">${items.sort((a,b)=>(a.expectedDate||a.date||"9999").localeCompare(b.expectedDate||b.date||"9999")).map(s=>{
          const st=C.paymentState(s);
          return `<div class="fin-institution-row"><div><strong>${C.formatDate(s.date)} · ${C.escapeHtml(s.place||"Hospital")}</strong><small>Prev. ${C.formatDate(s.expectedDate)} · ${st==="atrasado"?"Atrasado":st==="recebido"?"Recebido":st==="parcial"?"Parcial":st==="vence"?"Vence hoje":"Pendente"}</small></div><div><strong>${fmt(C.outstanding(s))} pendente</strong><small>Bruto ${fmt(s.value)} · Retido ${fmt(C.num(s.withheldTax)+C.num(s.payerFee))}</small>${C.outstanding(s)>0.009?`<button class="fin-mini-btn" type="button" data-pay="${C.escapeHtml(s.id)}">Registrar pagamento</button>`:""}</div></div>`;
        }).join("")}</div></details></article>`;
    }).join("")}</div>`;
  }
  function renderPending(){
    const root=$("fin-pending-table-container");
    const pending=shifts().filter(s=>C.outstanding(s)>0.009).sort((a,b)=>(a.expectedDate||"9999-99-99").localeCompare(b.expectedDate||"9999-99-99"));
    if(!pending.length){root.innerHTML='<div class="fin-empty-state success">Nenhum valor pendente nos plantões cadastrados.</div>';return;}
    root.innerHTML=`<div class="fin-table-wrap"><table class="fin-table"><thead><tr><th>Data plantão</th><th>Quem deve pagar</th><th>Previsão</th><th>Saldo</th><th>Ação</th></tr></thead><tbody>${pending.map(s=>`<tr><td>${C.formatDate(s.date)}</td><td><strong>${C.escapeHtml(s.payer||s.place||"Não informado")}</strong><small style="display:block">${C.escapeHtml(s.place||"")}</small></td><td class="${C.paymentState(s)==="atrasado"?"fin-late":""}">${C.formatDate(s.expectedDate)}${C.paymentState(s)==="atrasado"?" · Atrasado":""}</td><td>${fmt(C.outstanding(s))}</td><td><button class="fin-mini-btn" type="button" data-pay="${C.escapeHtml(s.id)}">Registrar</button></td></tr>`).join("")}</tbody></table></div>`;
  }
  function renderTaxes(month){
    const setting=C.getTaxSettings(),gross=sum(month,s=>s.value),taxWithheld=sum(month,s=>s.withheldTax),payerFees=sum(month,s=>s.payerFee);
    const rate=setting.estimatedRate,estimatedTax=rate==null?null:C.cents(gross*rate/100);
    const reserved=estimatedTax==null?null:Math.max(0,C.cents(estimatedTax-taxWithheld));
    const available=estimatedTax==null?null:C.cents(gross-estimatedTax-payerFees-setting.monthlyCosts);
    $("fin-tax-withheld").textContent=fmt(taxWithheld);
    $("fin-tax-reserve").textContent=reserved==null?"Não estimado":fmt(reserved);
    $("fin-tax-net").textContent=available==null?"Não estimado":fmt(available);
    $("fin-tax-info").textContent=rate==null?
      "Configure uma alíquota efetiva informada pelo contador para visualizar estimativas. Retenção não é cobrança adicional ao imposto devido.":
      "Estimativa sobre os plantões do mês: tributos retidos são considerados antecipações, sem duplicidade. A apuração real depende de todo o faturamento do CNPJ, pró-labore, enquadramento e escrituração.";
    $("fin-tax-extra").textContent=estimatedTax!=null&&taxWithheld>estimatedTax+0.009?
      "A retenção declarada supera o imposto estimado: peça conferência ao contador; não significa crédito automaticamente disponível.":"";
  }
  function render(){const {month}=renderTotals();renderInstitutions();renderPending();renderTaxes(month);}
  function modalOpen(id){ const el=$(id);if(!el.open)el.showModal();}
  function openInstitution(name){
    editingPayer=name;
    const i=C.getInstitutions().find(i=>i.name.toLowerCase()===name.toLowerCase())||{name,paymentRule:"none",paymentDay:15,paymentDays:30};
    $("fin-institution-name").textContent=name;
    $("fin-rule").value=i.paymentRule||"none";
    $("fin-rule-day").value=i.paymentDay||15;
    $("fin-rule-days").value=i.paymentDays??30;
    $("fin-apply-missing").checked=true;
    modalOpen("fin-institution-modal");
  }
  function saveInstitution(e){
    e.preventDefault();
    const info={name:editingPayer,paymentRule:$("fin-rule").value,paymentDay:$("fin-rule-day").value,paymentDays:$("fin-rule-days").value};
    if(!C.saveInstitution(info))return;
    if($("fin-apply-missing").checked){
      const list=C.getShifts();
      list.forEach(s=>{
        if((s.payer||s.place||"").toLowerCase()===editingPayer.toLowerCase()&&!s.expectedDate){
          s.expectedDate=C.expectedDate(s.date,info);
        }
      });
      if(!C.saveShifts(list))return;
    }
    $("fin-institution-modal").close();render();
  }
  function openPayment(id){
    const s=C.getShifts().find(s=>s.id===id);if(!s)return;
    editingShift=id;
    $("fin-pay-detail").textContent=`${s.payer||s.place} · Plantão ${C.formatDate(s.date)} · saldo ${fmt(C.outstanding(s))}`;
    $("fin-pay-amount").value=C.outstanding(s).toFixed(2);
    $("fin-pay-date").value=C.isoToday();
    $("fin-pay-error").textContent="";
    modalOpen("fin-payment-modal");
  }
  function savePayment(e){
    e.preventDefault();
    const list=C.getShifts(),s=list.find(s=>s.id===editingShift);if(!s)return;
    const amount=C.cents($("fin-pay-amount").value),remain=C.outstanding(s);
    if(!Number.isFinite(amount)||amount<=0||amount>remain+0.009){
      $("fin-pay-error").textContent=`Informe um valor positivo de até ${fmt(remain)}.`;return;
    }
    s.receivedAmount=C.cents(C.num(s.receivedAmount)+amount);
    s.receivedDate=$("fin-pay-date").value||C.isoToday();
    s.status=C.outstanding(s)<=0.009?"pago":"pendente";
    if(!C.saveShifts(list))return;
    $("fin-payment-modal").close();render();
  }
  function copyCharge(name){
    const list=shifts().filter(s=>(s.payer||s.place||"").toLowerCase()===name.toLowerCase()&&C.outstanding(s)>0.009);
    if(!list.length)return;
    const message=`Olá! Gostaria de confirmar a previsão de pagamento dos seguintes plantões na instituição ${name}:\n${list.map(s=>`• ${C.formatDate(s.date)} – ${C.escapeHtml(s.place)} – ${fmt(C.outstanding(s))} (previsto ${C.formatDate(s.expectedDate)})`).join("\n")}\nTotal em aberto: ${fmt(sum(list,s=>C.outstanding(s)))}.\nPoderiam informar a data prevista para o repasse? Obrigado!`;
    // texto de cobrança é copiado, não enviado automaticamente a terceiros
    if(navigator.clipboard?.writeText)navigator.clipboard.writeText(message).then(()=>alert("Cobrança copiada. Revise antes de enviar."),()=>prompt("Copie a mensagem:",message));
    else prompt("Copie a mensagem:",message);
  }
  function init(){
    if(!$("fin-hospital-breakdown"))return;
    $("fin-month-select").value=C.isoToday().slice(0,7);
    const settings=C.getTaxSettings();
    $("fin-tax-regime").value=["simples","presumido","real","pf","cooperativa","custom","nao_informado"].includes(settings.regime)?settings.regime:"nao_informado";
    $("fin-tax-rate").value=settings.estimatedRate??"";
    $("fin-tax-cost").value=settings.monthlyCosts||"";
    $("fin-month-select").addEventListener("change",render);
    $("fin-tax-form").addEventListener("submit",e=>{
      e.preventDefault();
      const v=$("fin-tax-rate").value;
      if(v!==""&&(!Number.isFinite(Number(v))||Number(v)<0||Number(v)>100)){alert("Informe alíquota entre 0 e 100%.");return;}
      if(C.saveTaxSettings({regime:$("fin-tax-regime").value,estimatedRate:v===""?null:Number(v),monthlyCosts:Math.max(0,C.cents($("fin-tax-cost").value))})){render();}
    });
    document.addEventListener("click",e=>{
      const el=e.target.closest("button[data-pay],button[data-config],button[data-charge]");
      if(!el)return;
      if(el.dataset.pay!==undefined)openPayment(el.dataset.pay);
      else if(el.dataset.config!==undefined)openInstitution(el.dataset.config);
      else if(el.dataset.charge!==undefined)copyCharge(el.dataset.charge);
    });
    $("fin-payment-form").addEventListener("submit",savePayment);
    $("fin-institution-form").addEventListener("submit",saveInstitution);
    ["fin-payment-close","fin-payment-cancel"].forEach(id=>$(id).addEventListener("click",()=>$("fin-payment-modal").close()));
    ["fin-institution-close","fin-institution-cancel"].forEach(id=>$(id).addEventListener("click",()=>$("fin-institution-modal").close()));
    window.addEventListener("storage",render);
    render();
  }
  document.addEventListener("DOMContentLoaded",init);
})();