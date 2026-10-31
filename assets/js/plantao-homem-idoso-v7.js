/* TRAUBE · Homem idoso V7, aprovado: base fixa; só tórax e região ocular animam. */
(()=>{
  "use strict";
  const base=document.getElementById("plantao-patient-image");
  const scene=base?.closest(".plantao-scene");
  if(!scene)return;
  const rig=document.createElement("div");
  rig.className="luria-elderly-man-v7-rig";
  rig.hidden=true;
  const parts=[
    ["chest","luria-homem-idoso-v7-torax.webp"],
    ["eyes","luria-homem-idoso-v7-olhos-fechados.webp"]
  ];
  for(const [kind,file] of parts){
    const img=document.createElement("img");
    img.className="luria-elderly-man-v7-"+kind;
    img.src="/assets/img/plantao/"+file;
    img.alt="";
    img.draggable=false;
    img.decoding="async";
    img.setAttribute("aria-hidden","true");
    rig.appendChild(img);
  }
  scene.appendChild(rig);
  const chest=rig.querySelector(".luria-elderly-man-v7-chest");
  const fraction=value=>{
    const t=String(value||"center").toLowerCase();
    if(t==="left"||t==="top")return 0;
    if(t==="right"||t==="bottom")return 1;
    if(t==="center")return .5;
    const n=Number.parseFloat(t);
    return Number.isFinite(n)?Math.max(0,Math.min(1,t.endsWith("%")?n/100:n)):.5;
  };
  let pending=false;
  function render(){
    pending=false;
    const src=base.getAttribute("src")||"";
    const active=/luria-homem-idoso-v7-aberto\.webp(?:\?|$)/.test(src);
    scene.classList.toggle("luria-elderly-man-v7",active);
    rig.hidden=!active;
    if(!active)return;
    const box=base.getBoundingClientRect(),parent=scene.getBoundingClientRect();
    if(box.width<=0||box.height<=0)return;
    const style=getComputedStyle(base),positions=style.objectPosition.split(/\s+/);
    let iw=box.width,ih=box.height;
    if(style.objectFit==="cover"||style.objectFit==="contain"){
      const scale=style.objectFit==="cover"
        ?Math.max(box.width/1672,box.height/941)
        :Math.min(box.width/1672,box.height/941);
      iw=1672*scale;ih=941*scale;
    }
    rig.style.left=(box.left-parent.left+(box.width-iw)*fraction(positions[0]))+"px";
    rig.style.top=(box.top-parent.top+(box.height-ih)*fraction(positions[1]||"center"))+"px";
    rig.style.width=iw+"px";
    rig.style.height=ih+"px";
    scene.dataset.luriaEyes=base.dataset.luriaEyes||"auto";
    const rr=Number.parseFloat(base.dataset.luriaRr);
    scene.dataset.luriaBreath=Number.isFinite(rr)&&rr<=0?"stopped":"active";
    // Respeita a frequência respiratória calculada no atendimento.
    chest.style.animationDuration=(rr>0?Math.max(.75,Math.min(9,60/rr)):3.9)+"s";
  }
  function schedule(){if(!pending){pending=true;requestAnimationFrame(render)}}
  new MutationObserver(schedule).observe(base,{
    attributes:true,attributeFilter:["src","data-luria-eyes","data-luria-rr"]
  });
  if(window.ResizeObserver){
    const observer=new ResizeObserver(schedule);
    observer.observe(scene);
    observer.observe(base);
  }
  base.addEventListener("load",schedule);
  window.addEventListener("resize",schedule,{passive:true});
  window.addEventListener("orientationchange",schedule,{passive:true});
  schedule();
})();