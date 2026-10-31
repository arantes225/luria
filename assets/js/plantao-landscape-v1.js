/* TRAUBE: modo paisagem guiado apenas durante casos no PWA de celular. */
(()=>{
  "use strict";
  const simulator=document.getElementById("plantao-simulator");
  const standard=document.getElementById("plantao-standard-bedside");
  const disaster=document.getElementById("plantao-disaster-stage");
  if(!simulator||!standard)return;
  const guide=document.createElement("div");
  guide.id="traube-landscape-hint";
  guide.setAttribute("role","dialog");
  guide.setAttribute("aria-modal","true");
  guide.setAttribute("aria-labelledby","traube-rotate-heading");
  guide.hidden=true;
  guide.innerHTML='<div class="traube-rotate-panel">'+
    '<div class="traube-rotate-brand">TRAUBE · SALA DE EMERGÊNCIA</div>'+
    '<div class="traube-rotate-graphic" aria-hidden="true"><span class="traube-rotate-phone"></span></div>'+
    '<h2 id="traube-rotate-heading">Gire o celular</h2>'+
    '<p>Para iniciar o atendimento, coloque o aparelho na horizontal.</p>'+
    '<p class="traube-rotate-tip">Se não girar, desative o bloqueio de orientação do iPhone.</p>'+
    '<button id="traube-rotate-back" type="button">Voltar aos casos</button></div>';
  document.body.appendChild(guide);
  guide.querySelector("#traube-rotate-back")?.addEventListener("click",()=>{
    document.getElementById("plantao-back")?.click();
  });
  const portrait=window.matchMedia("(orientation: portrait)");
  const installed=window.matchMedia("(display-mode: standalone)");
  const coarse=window.matchMedia("(pointer: coarse)");
  let pending=false;
  function isInstalledPwa(){
    return installed.matches||navigator.standalone===true||
      document.documentElement.classList.contains("pwa-standalone")||
      document.documentElement.dataset.pwa==="standalone";
  }
  function update(){
    pending=false;
    const mobile=coarse.matches && Math.min(screen.width,screen.height)<=650;
    const active=!simulator.hidden&&!standard.hidden&&(disaster?.hidden!==false)&&mobile&&isInstalledPwa();
    const rotate=active&&portrait.matches;
    document.body.classList.toggle("traube-case-landscape",active&&!rotate);
    document.body.classList.toggle("traube-case-portrait",rotate);
    guide.hidden=!rotate;
  }
  function schedule(){if(!pending){pending=true;requestAnimationFrame(update)}}
  new MutationObserver(schedule).observe(simulator,{attributes:true,attributeFilter:["hidden"]});
  new MutationObserver(schedule).observe(standard,{attributes:true,attributeFilter:["hidden"]});
  if(disaster)new MutationObserver(schedule).observe(disaster,{attributes:true,attributeFilter:["hidden"]});
  new MutationObserver(schedule).observe(document.documentElement,{attributes:true,attributeFilter:["class","data-pwa"]});
  window.addEventListener("resize",schedule,{passive:true});
  window.addEventListener("orientationchange",schedule,{passive:true});
  window.addEventListener("pageshow",schedule);
  window.addEventListener("focus",schedule);
  portrait.addEventListener?.("change",schedule);
  installed.addEventListener?.("change",schedule);
  coarse.addEventListener?.("change",schedule);
  schedule();
})();