/* LURIA | Gestante V1 — foto original preservada, olhos e respiração locais.
   As palpebras usam textura da propria imagem acordada: sem trocar a paciente. */
(()=>{
  "use strict";
  const base=document.getElementById("plantao-patient-image");
  const scene=base?.closest(".plantao-scene");
  if(!base||!scene)return;

  const variants=[
    {test:/gestante_acordada_triste_1300x900_100kb\.webp(?:\?|$)/,
      reference:[1300,900],
      eyes:[[517,321,22,11,-0.24],[577,298,19,10,-0.24]],kind:"desktop"},
    {test:/14-gestante-acordada\.webp(?:\?|$)/,
      reference:[941,1672],
      eyes:[[367,661,22,12,-0.25],[436,643,21,11,-0.20]],kind:"pwa"}
  ];

  const rig=document.createElement("div");
  rig.className="luria-pregnant-v1-rig";
  rig.hidden=true;
  const breath=document.createElement("img");
  breath.className="luria-pregnant-v1-chest";
  breath.alt="";
  breath.draggable=false;
  breath.setAttribute("aria-hidden","true");
  const lids=document.createElement("img");
  lids.className="luria-pregnant-v1-eyes";
  lids.alt="";
  lids.draggable=false;
  lids.setAttribute("aria-hidden","true");
  rig.append(breath,lids);
  scene.appendChild(rig);

  const cache=new Map();
  let waiting=false;
  let activeSrc="";

  // Cada palpebra e produzida apenas a partir da pele da foto original.
  // Nao e usada a fotografia alternativa da gestante com olhos fechados,
  // pois nela mudam rosto, cabelos, tronco e posicao do leito.
  function paintClosedEyes(variant){
    const width=base.naturalWidth,height=base.naturalHeight;
    if(!width||!height)return "";
    const out=document.createElement("canvas");
    out.width=width;
    out.height=height;
    const ctx=out.getContext("2d");
    if(!ctx)return "";
    const sx=width/variant.reference[0],sy=height/variant.reference[1];

    for(const eye of variant.eyes){
      const [originalX,originalY,originalRx,originalRy,angle]=eye;
      const x=originalX*sx,y=originalY*sy;
      const rx=originalRx*sx,ry=originalRy*sy;
      const pad=Math.max(5,Math.round(6*Math.max(sx,sy)));
      const stamp=document.createElement("canvas");
      stamp.width=Math.ceil(2*(rx+pad));
      stamp.height=Math.ceil(2*(ry+pad));
      const c=stamp.getContext("2d");
      if(!c)continue;
      c.translate(stamp.width/2,stamp.height/2);
      c.rotate(angle);
      const left=-rx-pad,top=-ry-pad;
      const sw=2*(rx+pad),sh=2*(ry+pad);
      // Pele real retirada logo abaixo de cada olho da mesma mulher.
      const sourceY=Math.min(height-sh,Math.max(0,y+ry+3*sy));
      const sourceX=Math.max(0,Math.min(width-sw,x-sw/2));
      c.drawImage(base,sourceX,sourceY,sw,sh,left,top,sw,sh);

      // Sombra e sulco delicados do olho fechado, acompanhando sua inclinacao.
      c.beginPath();
      c.moveTo(-rx*.77,-ry*.02);
      c.quadraticCurveTo(-rx*.10,ry*.30,rx*.78,-ry*.09);
      c.strokeStyle="rgba(80,42,43,.49)";
      c.lineWidth=Math.max(.85,1.25*sx);
      c.lineCap="round";
      c.stroke();
      c.beginPath();
      c.moveTo(-rx*.62,ry*.18);
      c.quadraticCurveTo(0,ry*.38,rx*.60,ry*.08);
      c.strokeStyle="rgba(228,153,131,.28)";
      c.lineWidth=Math.max(.65,1*sx);
      c.stroke();

      // Bordas com feather: sem retangulo, tremor ou deslocamento do rosto.
      c.globalCompositeOperation="destination-in";
      c.save();
      c.scale(1,Math.max(.25,ry/rx));
      const fade=c.createRadialGradient(0,0,rx*.48,0,0,rx*1.18);
      fade.addColorStop(0,"rgba(0,0,0,1)");
      fade.addColorStop(.62,"rgba(0,0,0,1)");
      fade.addColorStop(1,"rgba(0,0,0,0)");
      c.fillStyle=fade;
      c.fillRect(-rx-pad,-(ry+pad)*rx/ry,2*(rx+pad),2*(ry+pad)*rx/ry);
      c.restore();
      ctx.drawImage(stamp,x-stamp.width/2,y-stamp.height/2);
    }
    return out.toDataURL("image/png");
  }

  function fraction(value){
    const s=String(value||"center").toLowerCase();
    if(s==="left"||s==="top")return 0;
    if(s==="right"||s==="bottom")return 1;
    if(s==="center")return .5;
    const n=parseFloat(s);
    return Number.isFinite(n)?Math.max(0,Math.min(1,s.endsWith("%")?n/100:n)):.5;
  }

  function render(){
    waiting=false;
    const src=base.getAttribute("src")||"";
    const variant=variants.find(item=>item.test.test(src));
    const active=Boolean(variant);
    rig.hidden=!active;
    scene.classList.toggle("luria-pregnant-v1",active);
    scene.classList.toggle("luria-pregnant-v1-pwa",active&&variant.kind==="pwa");
    if(!active){
      activeSrc="";
      return;
    }
    if(!base.complete||!base.naturalWidth)return;
    const box=base.getBoundingClientRect();
    const parent=scene.getBoundingClientRect();
    if(!box.width||!box.height)return;

    const style=getComputedStyle(base);
    const pos=style.objectPosition.split(/\s+/);
    let width=box.width,height=box.height;
    const nw=base.naturalWidth,nh=base.naturalHeight;
    if(style.objectFit==="cover"||style.objectFit==="contain"){
      const scale=style.objectFit==="cover"
        ?Math.max(box.width/nw,box.height/nh)
        :Math.min(box.width/nw,box.height/nh);
      width=nw*scale;
      height=nh*scale;
    }
    rig.style.left=(box.left-parent.left+(box.width-width)*fraction(pos[0]))+"px";
    rig.style.top=(box.top-parent.top+(box.height-height)*fraction(pos[1]||"center"))+"px";
    rig.style.width=width+"px";
    rig.style.height=height+"px";

    // Refaz somente quando a fonte muda; resize nao recria textura dos olhos.
    const cacheKey=src+"|"+nw+"x"+nh;
    if(activeSrc!==cacheKey){
      activeSrc=cacheKey;
      breath.src=base.currentSrc||src;
      try{
        if(!cache.has(cacheKey))cache.set(cacheKey,paintClosedEyes(variant));
        lids.src=cache.get(cacheKey);
      }catch(error){
        // Se o navegador impedir a leitura do canvas, a foto-base continua intacta.
        lids.removeAttribute("src");
        console.warn("[LURIA] Gestante: overlay dos olhos indisponivel",error);
      }
    }
    scene.dataset.luriaEyes=base.dataset.luriaEyes||"auto";
    const rr=Number.parseFloat(base.dataset.luriaRr);
    scene.dataset.luriaBreath=Number.isFinite(rr)&&rr<=0?"stopped":"active";
    breath.style.animationDuration=(rr>0?Math.max(.9,Math.min(9,60/rr)):3.8)+"s";
  }
  function schedule(){
    if(!waiting){
      waiting=true;
      requestAnimationFrame(render);
    }
  }
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
