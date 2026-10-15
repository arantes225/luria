(()=>{"use strict";
const style=document.createElement("style");style.textContent=[
"#plantao-simulator .plantao-scene.luria-frontal-patient{position:relative;isolation:isolate;overflow:hidden}",
".luria-frontal-rig{position:absolute;inset:0;z-index:3;pointer-events:none;overflow:hidden}.luria-frontal-rig[hidden]{display:none!important}",
".luria-frontal-rig img{position:absolute;inset:0;width:100%;height:100%;pointer-events:none;user-select:none;-webkit-user-drag:none}",
".luria-frontal-rig .luria-frontal-eyelids{clip-path:inset(25% 0 75% 0);-webkit-mask-image:radial-gradient(ellipse 10% 5.8% at var(--left-eye,46%) 27%,#000 58%,transparent 100%),radial-gradient(ellipse 10% 5.8% at var(--right-eye,56%) 27%,#000 58%,transparent 100%);mask-image:radial-gradient(ellipse 10% 5.8% at var(--left-eye,46%) 27%,#000 58%,transparent 100%),radial-gradient(ellipse 10% 5.8% at var(--right-eye,56%) 27%,#000 58%,transparent 100%);-webkit-mask-composite:source-over;mask-composite:add}",
".plantao-scene.luria-frontal-patient .plantao-patient-image-frontal{transform-origin:50% 82%;animation:luriaFrontalBreath 4s ease-in-out infinite}",
"@keyframes luriaFrontalBreath{0%,100%{transform:scale(1)}50%{transform:scale(1,1.006)}}",
"#plantao-simulator .luria-frontal-rig .plantao-frontal-patient-eyes-closed{clip-path:inset(21% 0 71% 0)!important}",
"@media(prefers-reduced-motion:reduce){.plantao-scene.luria-frontal-patient .plantao-patient-image-frontal{animation:none!important}}"
].join("");document.head.append(style);
const base=document.getElementById("plantao-patient-image"),scene=base&&base.closest(".plantao-scene");if(!base||!scene)return;
let rig=null,overlay=null,timer=0,raf=0,animation=null,activeSrc="";
const rx=/patient-frontal-(elderly-man|elderly-woman|pregnant|girl)-(awake|closed)(-pwa)?\.webp(?:[?#]|$)/;
function stop(){clearTimeout(timer);cancelAnimationFrame(raf);animation&&animation.cancel();animation=null}
function closedPath(src){return src.replace(/-(awake|closed)(-pwa)?\.webp([?#].*)?$/,(m,state,pwa,tail)=>"-closed"+(pwa||"")+".webp"+(tail||""))}
function scheduleBlink(){stop();if(!rig||base.dataset.luriaEyes==="closed"||base.dataset.luriaEyes==="stopped"||matchMedia("(prefers-reduced-motion: reduce)").matches)return;timer=setTimeout(()=>{if(!overlay||!overlay.isConnected)return;animation=overlay.animate([{clipPath:"inset(25% 0 75% 0)"},{clipPath:"inset(22% 0 72% 0)",offset:.38},{clipPath:"inset(21% 0 71% 0)",offset:.52},{clipPath:"inset(21% 0 71% 0)",offset:.68},{clipPath:"inset(25% 0 75% 0)"}],{duration:230,easing:"cubic-bezier(.35,0,.25,1)"});animation.onfinish=()=>{animation=null;scheduleBlink()};},2600+Math.random()*3600)}
function render(){raf=0;const src=base.getAttribute("src")||"",match=src.match(rx),active=!!match&&match[2]==="awake";scene.classList.toggle("luria-frontal-patient",active);
if(!active){base.classList.remove("plantao-patient-image-frontal");if(rig)rig.hidden=true;stop();return}
base.classList.add("plantao-patient-image-frontal");if(!rig){rig=document.createElement("div");rig.className="luria-frontal-rig";rig.setAttribute("aria-hidden","true");overlay=document.createElement("img");overlay.className="luria-frontal-eyelids";overlay.alt="";overlay.draggable=false;rig.append(overlay);scene.append(rig)}
rig.hidden=false;const isPwa=Boolean(match[3]);rig.style.setProperty("--left-eye",isPwa?"31%":"46%");rig.style.setProperty("--right-eye",isPwa?"68%":"56%");overlay.src=closedPath(base.src);const st=getComputedStyle(base);overlay.style.objectFit=st.objectFit;overlay.style.objectPosition=st.objectPosition;
const closed=base.dataset.luriaEyes==="closed";overlay.classList.toggle("plantao-frontal-patient-eyes-closed",closed);if(closed){stop();overlay.style.clipPath="inset(21% 0 71% 0)"}else{overlay.style.clipPath="";if(activeSrc!==src||(!timer&&!animation)){activeSrc=src;scheduleBlink()}}}
function queue(){if(!raf)raf=requestAnimationFrame(render)}
new MutationObserver(queue).observe(base,{attributes:true,attributeFilter:["src","data-luria-eyes","data-luria-rr","style"]});
if(window.ResizeObserver){const o=new ResizeObserver(queue);o.observe(scene);o.observe(base)}
base.addEventListener("load",queue);window.addEventListener("resize",queue,{passive:true});window.addEventListener("orientationchange",queue,{passive:true});document.addEventListener("visibilitychange",()=>document.hidden?stop():queue());queue();
})();