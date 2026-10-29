(function divisorModule(){
  "use strict";
  const $=id=>document.getElementById(id);
  const num=v=>Number.isFinite(Number(v))?Number(v):0;
  const toMin=v=>{const [h,m]=String(v||"00:00").split(":").map(Number);return h*60+m;};
  const clock=m=>{const day=Math.floor(m/1440),n=((m%1440)+1440)%1440;return `${String(Math.floor(n/60)).padStart(2,"0")}:${String(n%60).padStart(2,"0")}${day>0?` (+${day} dia${day>1?"s":""})`:""}`;};
  const formatDuration=m=>`${Math.floor(m/60)}h${m%60?`${String(m%60).padStart(2,"0")}min`:""}`;
  function settings(){
    const start=$("div-start").value;
    const hours=Number($("div-hours").value);
    const totalMin=Math.round(hours*60),docs=Math.floor(num($("div-docs").value));
    const names=($("div-names").value||"").split(",").map(s=>s.trim());
    const mode=$("div-mode").value;
    return {start,startMin:toMin(start),totalMin,docs,names,mode};
  }
  function even(total,n){
    const base=Math.floor(total/n),left=total-base*n;
    return Array.from({length:n},(_,i)=>base+(i<left?1:0));
  }
  function renderCustom(){
    const {totalMin,docs,names,mode}=settings(),root=$("div-custom-wrap");
    root.hidden=mode!=="personalizado";
    if(mode!=="personalizado")return;
    const original=root.querySelectorAll(".div-custom-row");
    const preserve=Array.from(original).map(el=>num(el.querySelector(".div-hours")?.value)*60+num(el.querySelector(".div-minutes")?.value));
    const parts=preserve.length===docs?preserve.map(x=>Math.round(x)):even(Math.max(1,totalMin),Math.max(1,docs));
    $("div-custom-list").innerHTML=parts.map((duration,i)=>`<div class="div-custom-row"><strong>${i+1}. ${escapeHtml(names[i]||`Plantonista ${i+1}`)}</strong><label>Horas<input class="div-hours" type="number" min="0" max="72" step="1" value="${Math.floor(duration/60)}" aria-label="Horas do plantonista ${i+1}"></label><label>Minutos<input class="div-minutes" type="number" min="0" max="59" step="1" value="${duration%60}" aria-label="Minutos do plantonista ${i+1}"></label></div>`).join("");
    renderFeedback();
  }
  function escapeHtml(str){return String(str||"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;");}
  function customDurations(){
    return [...document.querySelectorAll(".div-custom-row")].map(row=>{
      const h=Number(row.querySelector(".div-hours").value),m=Number(row.querySelector(".div-minutes").value);
      if(!Number.isInteger(h)||!Number.isInteger(m)||h<0||h>72||m<0||m>59)return NaN;
      return h*60+m;
    });
  }
  function renderFeedback(){
    const {totalMin}=settings(),parts=customDurations(),sum=parts.reduce((a,b)=>a+b,0);
    const diff=totalMin-sum;
    $("div-custom-feedback").textContent=parts.some(x=>!Number.isFinite(x))?"Há períodos inválidos. Informe horas e minutos inteiros.":diff===0?"Todas as horas do plantão estão distribuídas.":diff>0?`Faltam ${formatDuration(diff)} para cobrir o plantão.`:`A divisão excede o plantão em ${formatDuration(-diff)}.`;
    $("div-custom-feedback").classList.toggle("fin-late",diff!==0);
  }
  function calculate(){
    const {start,startMin,totalMin,docs,names,mode}=settings(),out=$("div-output");
    const error=$("div-feedback");
    error.textContent="";
    if(!/^\d{2}:\d{2}$/.test(start)||!Number.isFinite(startMin)||totalMin<1||totalMin>72*60||docs<1||docs>12){
      error.textContent="Informe início, duração de 1 minuto a 72 horas e de 1 a 12 profissionais.";out.textContent="";return;
    }
    const rounds=mode==="rodadas"?2:1,n=mode==="personalizado"?docs:docs*rounds;
    const slots=mode==="personalizado"?customDurations():even(totalMin,n);
    if(slots.length!==n||slots.some(m=>!Number.isFinite(m)||m<=0)||slots.reduce((a,b)=>a+b,0)!==totalMin){
      error.textContent="Ajuste as durações individuais para que sejam positivas e somem exatamente a duração total do plantão.";out.textContent="";return;
    }
    const lines=[`DIVISÃO DE PLANTÃO / DESCANSO (${formatDuration(totalMin)} · início ${start} · fim ${clock(startMin+totalMin)})`,`Equipe: ${docs} profissional(is) · ${mode==="personalizado"?"períodos personalizados":mode==="rodadas"?"2 rodadas":"blocos iguais"}`,"────────────────────────────────────────────"];
    let elapsed=0;
    slots.forEach((min,i)=>{
      const doctor=names[i%docs]||`Plantonista ${i%docs+1}`;
      const round=mode==="rodadas"?`Rodada ${Math.floor(i/docs)+1} · `:"";
      lines.push(`• ${round}${doctor}: ${clock(startMin+elapsed)} → ${clock(startMin+elapsed+min)} (${formatDuration(min)})`);
      elapsed+=min;
    });
    out.textContent=lines.join("\n");
  }
  function init(){
    if(!$("div-calc-btn"))return;
    ["div-mode","div-docs","div-hours","div-names"].forEach(id=>$(id).addEventListener("change",renderCustom));
    $("div-custom-list").addEventListener("input",renderFeedback);
    $("div-equal-btn").addEventListener("click",()=>{
      const {totalMin,docs}=settings(),parts=even(Math.max(1,totalMin),Math.max(1,docs));
      [...document.querySelectorAll(".div-custom-row")].forEach((row,i)=>{
        row.querySelector(".div-hours").value=Math.floor(parts[i]/60);
        row.querySelector(".div-minutes").value=parts[i]%60;
      });renderFeedback();
    });
    $("div-calc-btn").addEventListener("click",calculate);
    $("div-copy-btn").addEventListener("click",async()=>{
      if(!$("div-output").textContent)return;
      try{await navigator.clipboard.writeText($("div-output").textContent);$("div-copy-btn").textContent="Copiado!";setTimeout(()=>$("div-copy-btn").textContent="Copiar divisão",1500);}catch(_){alert("Não foi possível copiar automaticamente. Selecione o resultado para copiar.");}
    });
    renderCustom();calculate();
  }
  document.addEventListener("DOMContentLoaded",init);
  window.LuriaShiftDivisor={even,formatDuration};
})();