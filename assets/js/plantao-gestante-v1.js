/* TRAUBE · Gestante V1.
 * Mantem o quadro original imovel; respiracao e olhos em camadas isoladas.
 * Suporta imagem horizontal da web e vertical do PWA.
 */
(()=>{
  "use strict";
  const base=document.getElementById("plantao-patient-image");
  const scene=base?.closest(".plantao-scene");
  if(!scene || scene.querySelector(".traube-pregnant-v1-rig"))return;

  const variants={
    landscape:{
      match:/gestante_acordada_triste_1300x900_100kb\.webp(?:\?|$)/,
      closed:"/assets/img/plantao/gestante_dormindo_triste_1300x900_100kb.webp"
    },
    portrait:{
      match:/14-gestante-acordada\.webp(?:\?|$)/,
      closed:"/assets/img/plantao pwa/02-gestante-olhos-fechados.webp"
    }
  };
  const rig=document.createElement("div");
  rig.className="traube-pregnant-v1-rig";
  rig.hidden=true;
  rig.setAttribute("aria-hidden","true");
  const breath=document.createElement("div");
  breath.className="traube-pregnant-v1-breath";
  const breathingImage=document.createElement("img");
  breathingImage.alt="";
  breathingImage.draggable=false;
  breath.appendChild(breathingImage);
  const eyes=document.createElement("div");
  eyes.className="traube-pregnant-v1-eyes";
  const closedImage=document.createElement("img");
  closedImage.alt="";
  closedImage.draggable=false;
  eyes.appendChild(closedImage);
  rig.append(breath,eyes);
  scene.appendChild(rig);

  const fraction=value=>{
    const t=String(value||"center").toLowerCase();
    if(t==="left"||t==="top")return 0;
    if(t==="right"||t==="bottom")return 1;
    if(t==="center")return .5;
    const n=parseFloat(t);
    return Number.isFinite(n)?Math.min(1,Math.max(0,t.endsWith("%")?n/100:n)):.5;
  };
  let pending=false;
  let currentVariant="";
  let currentSource="";
  function render(){
    pending=false;
    const src=base.getAttribute("src")||"";
    const key=Object.keys(variants).find(k=>variants[k].match.test(src));
    const active=Boolean(key);
    scene.classList.toggle("traube-pregnant-v1",active);
    rig.hidden=!active;
    if(!active)return;

    if(currentVariant!==key || currentSource!==src){
      currentVariant=key;
      currentSource=src;
      rig.dataset.variant=key;
      breathingImage.src=base.src;
      closedImage.src=variants[key].closed;
    }

    const box=base.getBoundingClientRect();
    const parent=scene.getBoundingClientRect();
    if(box.width<=0||box.height<=0)return;

    const styles=getComputedStyle(base);
    const pos=styles.objectPosition.trim().split(/\s+/);
    const naturalW=base.naturalWidth||(key==="portrait"?941:1300);
    const naturalH=base.naturalHeight||(key==="portrait"?1672:900);
    let width=box.width,height=box.height;
    if(styles.objectFit==="cover"||styles.objectFit==="contain"){
      const x=box.width/naturalW,y=box.height/naturalH;
      const scale=styles.objectFit==="cover"?Math.max(x,y):Math.min(x,y);
      width=naturalW*scale;
      height=naturalH*scale;
    }
    rig.style.left=(box.left-parent.left+(box.width-width)*fraction(pos[0]))+"px";
    rig.style.top=(box.top-parent.top+(box.height-height)*fraction(pos[1]||"center"))+"px";
    rig.style.width=width+"px";
    rig.style.height=height+"px";

    scene.dataset.traubeEyes=base.dataset.traubeEyes||"auto";
    const rr=Number.parseFloat(base.dataset.traubeRr);
    scene.dataset.traubeBreath=Number.isFinite(rr)&&rr<=0?"stopped":"active";
    breath.style.animationDuration=(rr>0?Math.min(9,Math.max(.75,60/rr)):3.75)+"s";
  }
  function schedule(){
    if(!pending){pending=true;requestAnimationFrame(render);}
  }
  new MutationObserver(schedule).observe(base,{
    attributes:true,
    attributeFilter:["src","data-traube-eyes","data-traube-rr","style","class"]
  });
  if(window.ResizeObserver){
    const resize=new ResizeObserver(schedule);
    resize.observe(scene);
    resize.observe(base);
  }
  base.addEventListener("load",schedule);
  window.addEventListener("resize",schedule,{passive:true});
  window.addEventListener("orientationchange",schedule,{passive:true});
  schedule();
})();
