(function scaleModule() {
  "use strict";
  const C=window.LuriaShiftCore;
  if(!C)return;
  const $=id=>document.getElementById(id);
  const fmt=t=>C.formatMoney(t);
  let view="month", cursor=new Date(), editingId=null, manualDue=false;
  const labelMonth=d=>d.toLocaleDateString("pt-BR",{month:"long",year:"numeric"});
  const iso=d=>`${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,"0")}-${String(d.getDate()).padStart(2,"0")}`;
  const addDays=(d,n)=>new Date(d.getFullYear(),d.getMonth(),d.getDate()+n);
  function getWeekStart(date){ const d=new Date(date.getFullYear(),date.getMonth(),date.getDate());d.setDate(d.getDate()-d.getDay());return d;}
  function shiftsOn(day){return C.getShifts().filter(s=>s.date===day).sort((a,b)=>(a.startTime||"").localeCompare(b.startTime||""));}
  function summary(){
    const list=C.getShifts().filter(s=>s.date?.slice(0,7)===iso(cursor).slice(0,7)&&s.status!=="trocado");
    $("stat-total-shifts").textContent=`${list.length} plantões`;
    $("stat-total-hours").textContent=`${list.reduce((a,s)=>a+C.num(s.duration),0).toLocaleString("pt-BR",{maximumFractionDigits:2})} horas`;
    $("stat-total-earned").textContent=fmt(list.reduce((a,s)=>a+C.num(s.value),0));
    $("stat-paid-count").textContent=`${list.filter(s=>C.paymentState(s)==="recebido").length} de ${list.length} pagos`;
  }
  function chip(s){
    const state=C.paymentState(s), color=state==="recebido"?"paid":state==="atrasado"?"late":"pending";
    return `<button class="shift-calendar-event ${color}" type="button" data-edit="${C.escapeHtml(s.id)}" title="Editar plantão">${C.escapeHtml(s.startTime||"Plantão")} · ${C.escapeHtml(s.place||"Local")} <strong>${fmt(s.value)}</strong></button>`;
  }
  function renderMonth(){
    const first=new Date(cursor.getFullYear(),cursor.getMonth(),1),start=getWeekStart(first);
    const days=Array.from({length:42},(_,i)=>addDays(start,i));
    const weekdays=["Dom","Seg","Ter","Qua","Qui","Sex","Sáb"];
    $("shift-calendar").innerHTML=`<div class="shift-month-grid">${weekdays.map(w=>`<div class="shift-weekday">${w}</div>`).join("")}${days.map(d=>{
      const date=iso(d),same=d.getMonth()===cursor.getMonth(),today=date===C.isoToday();
      return `<div class="shift-day ${same?"":"other-month"} ${today?"today":""}"><button class="shift-day-number" data-add="${date}" type="button" aria-label="Adicionar plantão em ${C.formatDate(date)}">${d.getDate()} +</button><div class="shift-day-events">${shiftsOn(date).map(chip).join("")}</div></div>`;
    }).join("")}</div>`;
    $("shift-calendar-title").textContent=labelMonth(cursor);
  }
  function renderWeek(){
    const start=getWeekStart(cursor),last=addDays(start,6);
    $("shift-calendar-title").textContent=`${C.formatDate(iso(start))} – ${C.formatDate(iso(last))}`;
    $("shift-calendar").innerHTML=`<div class="shift-week-planner">${Array.from({length:7},(_,i)=>{
      const date=addDays(start,i),key=iso(date),list=shiftsOn(key);
      return `<article class="shift-week-column"><div class="shift-week-head"><strong>${date.toLocaleDateString("pt-BR",{weekday:"short",day:"2-digit"})}</strong><button type="button" data-add="${key}" aria-label="Adicionar em ${C.formatDate(key)}">+</button></div><div class="shift-week-agenda">${list.length?list.map(s=>`<div class="shift-week-block"><span>${C.escapeHtml(s.startTime||"07:00")} – ${C.escapeHtml(s.endTime||"19:00")}</span>${chip(s)}</div>`).join(""):'<p>Livre</p>'}</div></article>`;
    }).join("")}</div>`;
  }
  function renderList(){
    const list=C.getShifts().sort((a,b)=>`${b.date||""} ${b.startTime||""}`.localeCompare(`${a.date||""} ${a.startTime||""}`));
    $("shifts-list-container").innerHTML=list.length?list.map(s=>{
      const state=C.paymentState(s);
      const due=s.expectedDate?` · Prev. ${C.formatDate(s.expectedDate)}`:" · Sem previsão informada";
      return `<article class="shift-item-card"><div class="shift-item-header"><div><span class="shift-item-date">${C.formatDate(s.date)}</span><strong class="shift-item-place">${C.escapeHtml(s.place||"Local não informado")}</strong><small class="shift-item-meta">${C.escapeHtml(s.sector||"Setor não informado")} · ${C.escapeHtml(s.startTime||"–")}–${C.escapeHtml(s.endTime||"–")} · ${C.num(s.duration).toLocaleString("pt-BR")}h${due}</small><small class="shift-item-meta">Pagador: ${C.escapeHtml(s.payer||s.place||"Não informado")}</small></div><div class="shift-item-val-box"><span class="shift-item-value">${fmt(s.value)}</span><span class="shift-status-badge ${state==="recebido"?"status-paid":"status-pending"}">${({recebido:"Recebido",parcial:"Parcial",atrasado:"Atrasado",vence:"Vence hoje",cedido:"Cedido",pendente:"A receber"})[state]}</span><small>${state==="cedido"?"Sem cobrança":`Saldo ${fmt(C.outstanding(s))}`}</small></div></div><div class="shift-item-actions"><button type="button" class="shift-action-btn" data-edit="${C.escapeHtml(s.id)}">Editar</button>${state!=="recebido"&&state!=="cedido"?`<button type="button" class="shift-action-btn" data-paid="${C.escapeHtml(s.id)}">Recebido</button>`:""}<button type="button" class="shift-action-btn danger" data-delete="${C.escapeHtml(s.id)}">Remover</button></div></article>`;
    }).join(""):'<div class="shift-empty-state"><h3>Sem plantões cadastrados</h3><p>Use “Adicionar plantão” para começar.</p></div>';
  }
  function render(){
    $("shift-view-month").setAttribute("aria-pressed",String(view==="month"));
    $("shift-view-week").setAttribute("aria-pressed",String(view==="week"));
    if(view==="month")renderMonth();else renderWeek();
    summary();renderList();
  }
  function calcDue(){
    if(manualDue)return;
    const name=$("shift-payer").value.trim()||$("shift-place").value.trim();
    const institution=C.getInstitutions().find(i=>i.name.toLowerCase()===name.toLowerCase());
    $("shift-expected-date").value=C.expectedDate($("shift-date").value,institution);
    $("shift-due-hint").textContent=institution?.paymentRule&&institution.paymentRule!=="none"?"Previsão pela regra da instituição. Pode ser editada.":"Informe uma data prevista ou configure uma regra no Financeiro.";
  }
  function calcValue(){
    if($("shift-price-mode").value!=="hour")return;
    const minutes=C.durationMinutes($("shift-date").value,$("shift-start-time").value,$("shift-end-date").value,$("shift-end-time").value);
    if(minutes>0&&minutes<=72*60){
      $("shift-val").value=C.cents(minutes/60*C.num($("shift-hour-rate").value)).toFixed(2);
    }
  }
  function updatePrice(recompute=true){
    const hourly=$("shift-price-mode").value==="hour";
    $("shift-hour-wrap").hidden=!hourly;
    if(hourly&&recompute)calcValue();
  }
  function openModal(s=null,day=""){
    const dialog=$("shift-modal"),form=$("add-shift-form");
    form.reset();
    editingId=s?.id||null;manualDue=Boolean(s?.expectedDate);
    $("shift-modal-title").textContent=s?"Editar plantão":"Adicionar plantão";
    const now=C.isoToday();
    $("shift-date").value=s?.date||day||now;
    $("shift-place").value=s?.place||"";
    $("shift-payer").value=s?.payer||s?.place||"";
    $("shift-sector").value=s?.sector||"";
    $("shift-start-time").value=s?.startTime||"07:00";
    $("shift-end-time").value=s?.endTime||"19:00";
    $("shift-end-date").value=s?.endDate||"";
    $("shift-price-mode").value=s?.priceMode||"total";
    $("shift-hour-rate").value=s?.hourRate==null?"":s.hourRate;
    $("shift-val").value=s?.value==null?"":C.num(s.value).toFixed(2);
    $("shift-expected-date").value=s?.expectedDate||"";
    $("shift-withheld-tax").value=s?.withheldTax||"";
    $("shift-payer-fee").value=s?.payerFee||"";
    $("shift-received-amount").value=s?.receivedAmount||"";
    $("shift-status").value=s?.status==="trocado"?"trocado":"pendente";
    $("shift-notes").value=s?.notes||"";
    $("shift-error").textContent="";
    if(!s)calcDue();
    updatePrice(false); 
    if(!dialog.open)dialog.showModal();
    $("shift-place").focus();
  }
  function save(e){
    e.preventDefault();
    const old=C.getShifts(),prior=old.find(s=>s.id===editingId);
    const date=$("shift-date").value,place=$("shift-place").value.trim(),payer=$("shift-payer").value.trim()||place;
    const startTime=$("shift-start-time").value,endTime=$("shift-end-time").value,endDate=$("shift-end-date").value;
    const duration=C.durationMinutes(date,startTime,endDate,endTime);
    const value=C.cents($("shift-val").value), withheldTax=C.cents($("shift-withheld-tax").value),payerFee=C.cents($("shift-payer-fee").value),receivedAmount=C.cents($("shift-received-amount").value);
    const error=$("shift-error");
    if(!date||!place||!payer){error.textContent="Informe data e instituição.";return;}
    if(!Number.isFinite(duration)||duration<=0||duration>72*60){error.textContent="Escolha início e fim válidos (duração de 1 minuto a 72 horas).";return;}
    if([value,withheldTax,payerFee,receivedAmount].some(v=>v<0)||value<withheldTax+payerFee+receivedAmount-0.009){
      error.textContent="Os valores precisam ser positivos e descontos + recebimento não podem ultrapassar o bruto.";return;
    }
    const s={...prior,id:editingId||`shift_${Date.now()}_${Math.random().toString(36).slice(2,8)}`,date,place,payer,
      sector:$("shift-sector").value.trim(),startTime,endTime,endDate,duration:duration/60,
      priceMode:$("shift-price-mode").value,hourRate:C.cents($("shift-hour-rate").value),value,withheldTax,payerFee,
      receivedAmount,expectedDate:$("shift-expected-date").value,
      receivedDate:prior?.receivedDate||"",status:$("shift-status").value,notes:$("shift-notes").value.trim()};
    const next=prior?old.map(x=>x.id===editingId?s:x):[...old,s];
    if(!C.saveShifts(next))return;
    $("shift-modal").close();render();
  }
  function exportCsv(){
    const shifts=C.getShifts();
    if(!shifts.length){alert("Não há plantões cadastrados.");return;}
    const header=["Data","Início","Data fim","Fim","Hospital","Pagador","Setor","Horas","Valor bruto","Retenção tributária","Taxa do pagador","Recebido em conta","Previsão","Observações"];
    const fields=s=>[s.date,s.startTime,s.endDate,s.endTime,s.place,s.payer,s.sector,s.duration,s.value,s.withheldTax,s.payerFee,s.receivedAmount,s.expectedDate,s.notes];
    const csv=[header,...shifts.map(fields)].map(row=>row.map(v=>`"${String(v==null?"":v).replace(/"/g,'""')}"`).join(";")).join("\r\n");
    const url=URL.createObjectURL(new Blob(["\ufeff"+csv],{type:"text/csv;charset=utf-8"}));
    const a=document.createElement("a");a.href=url;a.download=`luria_escala_${C.isoToday()}.csv`;a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);
  }
  function init(){
    if(!$("shift-calendar"))return;
    $("shift-view-month").addEventListener("click",()=>{view="month";render();});
    $("shift-view-week").addEventListener("click",()=>{view="week";render();});
    $("shift-prev").addEventListener("click",()=>{cursor=view==="month"?new Date(cursor.getFullYear(),cursor.getMonth()-1,1):addDays(cursor,-7);render();});
    $("shift-next").addEventListener("click",()=>{cursor=view==="month"?new Date(cursor.getFullYear(),cursor.getMonth()+1,1):addDays(cursor,7);render();});
    $("shift-today").addEventListener("click",()=>{cursor=new Date();render();});
    $("shift-add").addEventListener("click",()=>openModal());
    $("shift-modal-close").addEventListener("click",()=>$("shift-modal").close());
    $("shift-cancel").addEventListener("click",()=>$("shift-modal").close());
    $("shift-calendar").addEventListener("click",e=>{const edit=e.target.closest("[data-edit]"),add=e.target.closest("[data-add]");if(edit)openModal(C.getShifts().find(s=>s.id===edit.dataset.edit));else if(add)openModal(null,add.dataset.add);});
    $("shifts-list-container").addEventListener("click",e=>{
      const btn=e.target.closest("button[data-edit],button[data-paid],button[data-delete]");
      if(!btn)return;
      const list=C.getShifts(),id=btn.dataset.edit||btn.dataset.paid||btn.dataset.delete;
      const s=list.find(x=>x.id===id);if(!s)return;
      if(btn.dataset.edit)openModal(s);
      if(btn.dataset.paid!==undefined){s.receivedAmount=C.payableGross(s);s.status="pago";s.receivedDate=C.isoToday();if(C.saveShifts(list))render();}
      if(btn.dataset.delete!==undefined&&confirm("Remover este plantão e seu registro financeiro?")){if(C.saveShifts(list.filter(x=>x.id!==id)))render();}
    });
    ["shift-date","shift-place","shift-payer"].forEach(id=>$(id).addEventListener("change",calcDue));
    $("shift-expected-date").addEventListener("input",()=>{manualDue=true;});
    ["shift-start-time","shift-end-time","shift-end-date","shift-hour-rate"].forEach(id=>$(id).addEventListener("input",calcValue));
    $("shift-price-mode").addEventListener("change",updatePrice);
    $("add-shift-form").addEventListener("submit",save);
    $("export-shifts-btn").addEventListener("click",exportCsv);
    $("shift-place").setAttribute("list","shift-institutions-options");
    $("shift-payer").setAttribute("list","shift-institutions-options");
    $("shift-institutions-options").innerHTML=C.getInstitutions().map(i=>`<option value="${C.escapeHtml(i.name)}"></option>`).join("");
    window.addEventListener("storage",render);
    render();
  }
  document.addEventListener("DOMContentLoaded",init);
})();