(()=>{"use strict";
const RX=/patient-frontal-(adult-man|adult-woman|baby|boy|elderly-man|elderly-woman|pregnant|girl)-(awake|closed)(-pwa)?\.webp(?:[?#]|$)/;
const WEB={
 "adult-man":[[.445,.305,.025,.015,-.08],[.55,.305,.024,.015,.04]],
 "adult-woman":[[.45,.295,.026,.016,-.12],[.55,.295,.024,.015,-.06]],
 baby:[[.44,.35,.024,.014,-.22],[.55,.35,.022,.013,-.12]],
 boy:[[.45,.30,.023,.014,-.15],[.54,.30,.021,.013,-.1]],
 "elderly-man":[[.41,.23,.027,.017,-.04],[.48,.23,.026,.017,.04]],
 "elderly-woman":[[.38,.24,.026,.017,-.04],[.45,.24,.025,.017,.04]],
 pregnant:[[.39,.23,.026,.016,-.03],[.45,.23,.026,.016,.03]],
 girl:[[.382,.25,.026,.017,-.02],[.449,.25,.026,.017,.02]]
};
const PWA={
 "adult-man":[[.30,.25,.055,.022,-.08],[.48,.25,.052,.022,.04]],
 "adult-woman":[[.28,.25,.055,.022,-.12],[.46,.25,.052,.022,-.06]],
 baby:[[.30,.31,.052,.02,-.22],[.49,.31,.05,.019,-.12]],
 boy:[[.29,.27,.05,.02,-.15],[.47,.27,.048,.019,-.1]],
 "elderly-man":[[.18,.227,.047,.01,-.04],[.40,.227,.047,.01,.04]],
 "elderly-woman":[[.128,.238,.047,.01,-.04],[.342,.238,.047,.01,.04]],
 pregnant:[[.173,.222,.047,.01,-.03],[.362,.222,.047,.01,.03]],
 girl:[[.125,.25,.047,.01,-.02],[.32,.25,.047,.01,.02]]
};
const style=document.createElement("style");style.textContent=
"#plantao-simulator .plantao-scene.luria-frontal-patient{position:relative;isolation:isolate;overflow:hidden}"+
".luria-frontal-canvas{position:absolute;inset:0;width:100%;height:100%;z-index:3;pointer-events:none;user-select:none}";
document.head.append(style);
const base=document.getElementById("plantao-patient-image"),scene=base&&base.closest(".plantao-scene");if(!base||!scene)return;
function makeFrames(open,shut,region,iw,ih){
 const [nx,ny,nrx,nry,angle]=region,x=nx*iw,y=ny*ih,rx=nrx*iw,ry=nry*ih;
 const patch=document.createElement("canvas");patch.width=Math.ceil(rx*3.4+16);patch.height=Math.ceil(ry*6.6+12);
 const p=patch.getContext("2d",{willReadFrequently:true});p.translate(patch.width/2,patch.height/2);p.rotate(-angle);p.drawImage(open,-x,-y);
 const closed=document.createElement("canvas");closed.width=patch.width;closed.height=patch.height;
 const cp=closed.getContext("2d",{willReadFrequently:true});cp.translate(closed.width/2,closed.height/2);cp.rotate(-angle);cp.drawImage(shut,0,0,shut.naturalWidth,shut.naturalHeight,-x,-y,iw,ih);
 const source=p.getImageData(0,0,patch.width,patch.height).data,target=cp.getImageData(0,0,patch.width,patch.height).data,out=[];
 for(let stage=0;stage<=lidSteps;stage++){
  const q=stage/lidSteps,frame=document.createElement("canvas");frame.width=patch.width;frame.height=patch.height;
  const f=frame.getContext("2d"),pixels=f.createImageData(frame.width,frame.height);
  for(let py=0;py<frame.height;py++)for(let px=0;px<frame.width;px++){
   const u=(px-frame.width/2)/(rx+2),v=py-frame.height/2,radius=Math.sqrt(((px-frame.width/2)/(rx*1.65))**2+(v/(ry*2.7))**2),index=(py*frame.width+px)*4;
   if(radius>=1)continue;
   const alpha=clamp((1-radius)/.25,0,1);let sy=v,ty=v,mix=q;
   if(Math.abs(u)<1){
    const arch=Math.pow(1-u*u,.65),upper=-ry*.88*arch,lower=ry*.66*arch,anchor=-ry*2.5-2,floor=ry*2.3+2,closedLine=ry*.48*arch;
    const edge=upper+(closedLine-upper)*q;
    if(v>=anchor&&v<=floor){
     if(v<edge){sy=anchor+(v-anchor)*(upper-anchor)/(edge-anchor);ty=anchor+(v-anchor)*(closedLine-anchor)/(edge-anchor)}
     else if(v<lower&&q<1){mix=0}
     else{sy=lower+(v-lower)*(floor-lower)/(floor-lower);ty=closedLine+(v-lower)*(floor-closedLine)/(floor-lower)}
    }
   }
   if(q===1){sy=v;ty=v;mix=1}
   for(let k=0;k<3;k++)pixels.data[index+k]=sample(source,frame.width,frame.height,px,sy+frame.height/2,k)*(1-mix)+sample(target,frame.width,frame.height,px,ty+frame.height/2,k)*mix;
   pixels.data[index+3]=Math.round(alpha*255);
  }
  f.putImageData(pixels,0,0);out.push(frame);
 }
 return {frames:out,x,y,angle};
}
const CHEST_WEB={
 "adult-man":[.50,.68,.23,.15,1],
 "adult-woman":[.50,.68,.23,.15,1],
 baby:[.50,.66,.24,.15,1],
 boy:[.50,.68,.23,.15,1],
 "elderly-man":[.50,.67,.23,.15,1],
 "elderly-woman":[.50,.67,.23,.15,1],
 pregnant:[.50,.68,.24,.16,1],
 girl:[.50,.68,.23,.15,1]
};
const CHEST_PWA={
 "adult-man":[.50,.65,.37,.14,1],
 "adult-woman":[.50,.65,.37,.14,1],
 baby:[.50,.62,.38,.14,1],
 boy:[.50,.64,.36,.14,1],
 "elderly-man":[.50,.64,.36,.14,1],
 "elderly-woman":[.50,.64,.36,.14,1],
 pregnant:[.50,.65,.38,.15,1],
 girl:[.50,.64,.36,.14,1]
};
let canvas=null,ctx=null,timer=0,queueRaf=0,loopRaf=0,readyKey="",activeKey="",frames=[],eyes=[],chest=[],rendering=false,blinkStart=0,lastFrame=0,breathPhase=0;
const lidSteps=28,closeMs=145,holdMs=28,openMs=190,totalMs=closeMs+holdMs+openMs;
function makeBreathPatch(photo,region,iw,ih){
 const [nx,ny,nrx,nry,strength]=region,x=nx*iw,y=ny*ih,rx=Math.max(1,nrx*iw),ry=Math.max(1,nry*ih);
 const patch=document.createElement("canvas");patch.width=Math.ceil(rx*2);patch.height=Math.ceil(ry*2);
 const p=patch.getContext("2d");
 p.drawImage(photo,x-rx,y-ry,rx*2,ry*2,0,0,patch.width,patch.height);
 p.globalCompositeOperation="destination-in";
 p.save();p.translate(patch.width/2,patch.height/2);p.scale(rx,ry);
 const mask=p.createRadialGradient(0,0,.42,0,0,1);
 mask.addColorStop(0,"rgba(255,255,255,1)");mask.addColorStop(.62,"rgba(255,255,255,.94)");mask.addColorStop(1,"rgba(255,255,255,0)");
 p.fillStyle=mask;p.beginPath();p.arc(0,0,1,0,Math.PI*2);p.fill();p.restore();
 return {patch,x,y,rx,ry,strength};
}
function stop(){
 clearTimeout(timer);timer=0;blinkStart=0;lastFrame=0;
 if(loopRaf){cancelAnimationFrame(loopRaf);loopRaf=0}
}
function draw(progress,breath=0){
 if(!ctx||!canvas)return;
 ctx.clearRect(0,0,canvas.width,canvas.height);
 for(const c of chest){
  const b=clamp(breath,0,1)*c.strength;
  ctx.save();ctx.translate(c.x,c.y-1.5*b);ctx.scale(1+.003*b,1+.008*b);
  ctx.drawImage(c.patch,-c.rx,-c.ry);ctx.restore();
 }
 const step=Math.round(clamp(progress,0,1)*lidSteps);
 for(const e of eyes){const fr=e.frames[step];ctx.save();ctx.translate(e.x,e.y);ctx.rotate(e.angle);ctx.drawImage(fr,-fr.width/2,-fr.height/2);ctx.restore()}
}
function schedule(){
 clearTimeout(timer);
 if(!readyKey||base.dataset.luriaEyes==="closed"||base.dataset.luriaEyes==="stopped"||reduceMotion.matches||document.hidden)return;
 timer=setTimeout(()=>{blinkStart=performance.now();if(!loopRaf)startMotion()},2800+Math.random()*3800);
}
function startMotion(){
 if(loopRaf||!readyKey||reduceMotion.matches||document.hidden||base.dataset.luriaEyes==="closed"||base.dataset.luriaEyes==="stopped")return;
 lastFrame=0;
 const tick=now=>{
  if(!readyKey||document.hidden||reduceMotion.matches||base.dataset.luriaEyes==="closed"||base.dataset.luriaEyes==="stopped"){loopRaf=0;return}
  const dt=lastFrame?Math.min(64,now-lastFrame):0;lastFrame=now;
  const rr=Number(base.dataset.luriaRr)||14;
  if(rr>0)breathPhase=(breathPhase+dt*(rr/60)*(Math.PI*2)/1000)%(Math.PI*2);
  const breath=rr>0?(1-Math.cos(breathPhase))*.5:0;
  let blink=0;
  if(blinkStart){
   const elapsed=now-blinkStart;
   if(elapsed<closeMs){const t=elapsed/closeMs;blink=1-Math.pow(1-t,1.35)}
   else if(elapsed<closeMs+holdMs)blink=1;
   else if(elapsed<totalMs){const t=(elapsed-closeMs-holdMs)/openMs;blink=1-Math.pow(t,1.2)}
   else{blinkStart=0;schedule()}
  }
  draw(blink,breath);loopRaf=requestAnimationFrame(tick);
 };
 loopRaf=requestAnimationFrame(tick);
}
async function setup(src,match){
 if(rendering||src===readyKey)return;rendering=true;stop();
 try{
  const shut=await image(closedPath(base.src)),open=await image(base.src),iw=open.naturalWidth,ih=open.naturalHeight;
  if((base.getAttribute("src")||"")!==src)return;
  const eyeProfile=match[3]?PWA[match[1]]:WEB[match[1]],chestProfile=match[3]?CHEST_PWA[match[1]]:CHEST_WEB[match[1]];
  if(!eyeProfile||!chestProfile)return;
  eyes=eyeProfile.map(region=>makeFrames(open,shut,region,iw,ih));
  chest=[makeBreathPatch(open,chestProfile,iw,ih)];
  canvas=document.createElement("canvas");canvas.className="luria-frontal-canvas";canvas.setAttribute("aria-hidden","true");canvas.width=iw;canvas.height=ih;ctx=canvas.getContext("2d");
  scene.querySelector(".luria-frontal-canvas")?.remove();scene.append(canvas);readyKey=src;activeKey=src;
  const computed=getComputedStyle(base);canvas.style.objectFit=computed.objectFit;canvas.style.objectPosition=computed.objectPosition;
  base.classList.add("plantao-patient-image-frontal");scene.classList.add("luria-frontal-patient");
  draw(base.dataset.luriaEyes==="closed"?1:0,0);
  if(base.dataset.luriaEyes!=="closed"){startMotion();schedule()}
 }catch(error){console.warn("Plantão: não foi possível preparar a animação do paciente.",error)}
 finally{rendering=false;if((base.getAttribute("src")||"")!==src)queue()}
}
function queue(){
 if(queueRaf)return;
 queueRaf=requestAnimationFrame(()=>{
  queueRaf=0;
  const src=base.getAttribute("src")||"",match=src.match(RX);
  if(!match||match[2]!=="awake"){
   stop();scene.classList.remove("luria-frontal-patient");base.classList.remove("plantao-patient-image-frontal");
   if(canvas)canvas.remove();canvas=null;ctx=null;readyKey="";activeKey="";chest=[];eyes=[];return;
  }
  if(activeKey!==src){activeKey=src;readyKey="";setup(src,match);return}
  if(base.dataset.luriaEyes==="closed"){stop();draw(1,0)}
  else if(base.dataset.luriaEyes==="stopped"){stop();draw(0,0)}
  else if(readyKey){startMotion();if(!timer&&!blinkStart)schedule()}
 });
}
const reduceMotion=matchMedia("(prefers-reduced-motion: reduce)");
new MutationObserver(queue).observe(base,{attributes:true,attributeFilter:["src","data-luria-eyes","data-luria-rr","style"]});
base.addEventListener("load",queue);window.addEventListener("resize",queue,{passive:true});window.addEventListener("orientationchange",queue,{passive:true});
document.addEventListener("visibilitychange",()=>document.hidden?stop():queue());
reduceMotion.addEventListener?.("change",()=>reduceMotion.matches?stop():queue());
queue();
})();
(()=>{const s=document.createElement('style');s.textContent="/* Ajustes do leito e do menu clínico para a faixa de tablet/notebook compacto. */\n@media (min-width:681px) and (max-width:980px){\n #plantao-standard-bedside .plantao-scene{\n  height:auto!important;min-height:0!important;align-self:start!important;\n  aspect-ratio:3/2!important;overflow:hidden!important;\n }\n #plantao-standard-bedside .plantao-scene>img{\n  width:100%!important;height:100%!important;aspect-ratio:auto!important;\n  object-fit:cover!important;object-position:center 42%!important;\n }\n}\n#plantao-standard-bedside .plantao-action-rail .plantao-action-tab,\n#plantao-standard-bedside .plantao-action-rail .plantao-pwa-patient-tab{\n box-sizing:border-box;min-height:58px!important;height:58px!important;\n display:flex!important;align-items:center!important;justify-content:flex-start!important;\n gap:10px!important;padding:7px 11px!important;text-align:left!important;\n border-radius:12px!important;\n}\n#plantao-standard-bedside .plantao-action-rail .plantao-action-tab>span:first-child,\n#plantao-standard-bedside .plantao-action-rail .plantao-pwa-patient-tab>span:first-child{\n flex:0 0 22px;width:22px;height:22px;display:inline-flex;align-items:center;justify-content:center;\n margin:0!important;color:currentColor;\n}\n#plantao-standard-bedside .plantao-action-rail .plantao-action-tab>span:first-child svg,\n#plantao-standard-bedside .plantao-action-rail .plantao-pwa-patient-tab>span:first-child svg{\n width:21px;height:21px;display:block;fill:none;stroke:currentColor;stroke-width:1.85;\n stroke-linecap:round;stroke-linejoin:round;\n}\n#plantao-standard-bedside .plantao-action-rail .plantao-action-tab>span:last-child,\n#plantao-standard-bedside .plantao-action-rail .plantao-pwa-patient-tab strong{\n min-width:0;flex:1;line-height:1.16;font-size:13px!important;font-weight:500;\n}\n#plantao-standard-bedside .plantao-action-rail .plantao-action-tabs{\n display:flex;flex-direction:column;gap:7px!important;\n}\n@media(max-width:680px){\n #plantao-standard-bedside .plantao-action-rail .plantao-action-tab,\n #plantao-standard-bedside .plantao-action-rail .plantao-pwa-patient-tab{\n  min-height:56px!important;height:56px!important;padding:6px 7px!important;gap:5px!important;\n }\n #plantao-standard-bedside .plantao-action-rail .plantao-action-tab>span:first-child,\n #plantao-standard-bedside .plantao-action-rail .plantao-pwa-patient-tab>span:first-child{\n  flex-basis:19px;width:19px;height:19px;\n }\n #plantao-standard-bedside .plantao-action-rail .plantao-action-tab>span:first-child svg,\n #plantao-standard-bedside .plantao-action-rail .plantao-pwa-patient-tab>span:first-child svg{\n  width:19px;height:19px;\n }\n #plantao-standard-bedside .plantao-action-rail .plantao-action-tab>span:last-child,\n #plantao-standard-bedside .plantao-action-rail .plantao-pwa-patient-tab strong{\n  font-size:11px!important;\n }\n}";document.head.append(s)})();
(()=>{"use strict";
const icons={
 patient:'<circle cx="12" cy="8" r="3.3"/><path d="M5.3 20c.5-3.4 2.8-5.4 6.7-5.4s6.2 2 6.7 5.4"/>',
 anamnese:'<path d="M20 11.5a7.7 7.7 0 0 1-8 7.5 8.6 8.6 0 0 1-3.5-.7L4 20l1.3-3.7A7.2 7.2 0 0 1 4 11.5 7.7 7.7 0 0 1 12 4a7.7 7.7 0 0 1 8 7.5Z"/><path d="M8 11h8M8 14h5"/>',
 exame:'<path d="M9 3h6M10 3v6l-5 9a2 2 0 0 0 1.8 3h10.4a2 2 0 0 0 1.8-3l-5-9V3"/><path d="M8 15h8"/>',
 iniciais:'<path d="M13.2 2 5.5 13h5.7L10.8 22 18.5 11h-5.7L13.2 2Z"/>',
 exames:'<rect x="5" y="4" width="14" height="17" rx="2"/><path d="M8 8h8M8 12h8M8 16h5"/>',
 intervir:'<path d="M12 4v16M4 12h16"/><circle cx="12" cy="12" r="9"/>',
 hipoteses:'<path d="M9 9a3 3 0 1 1 5.4 1.8c-1.4 1.6-2.4 2-2.4 4.2"/><path d="M12 19h.01"/><circle cx="12" cy="12" r="9"/>',
 conduta:'<path d="m6 12 4 4 8-9"/><circle cx="12" cy="12" r="9"/>',
 avaliacao:'<circle cx="10.5" cy="10.5" r="6.5"/><path d="m16 16 4 4M8 10h5M8 13h3"/>',
 suporte:'<path d="M13 2 5.5 13h5.5L10.8 22 18.5 11H13l.1-9Z"/>'
};
icons.fisico=icons.exame;
const make=(path)=>'<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">'+path+'</svg>';
function paint(){
 const patient=document.querySelector("#plantao-standard-bedside #plantao-pwa-patient-tab>span:first-child");
 if(patient&&patient.dataset.iconReady!=="1"){patient.innerHTML=make(icons.patient);patient.dataset.iconReady="1"}
 document.querySelectorAll("#plantao-standard-bedside .plantao-action-tab").forEach(button=>{
  const key=button.dataset.caseCategory||"",icon=icons[key],slot=button.querySelector(":scope>span:first-child");
  if(icon&&slot&&slot.dataset.iconReady!=="1"){slot.innerHTML=make(icon);slot.dataset.iconReady="1"}
 });
}
paint();
const host=document.querySelector("#plantao-standard-bedside");
if(host)new MutationObserver(paint).observe(host,{childList:true,subtree:true});
})();