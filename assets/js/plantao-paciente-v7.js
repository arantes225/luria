/* Paciente V7: os recortes compartilham o mesmo quadro da imagem-base. */
(()=>{
 "use strict";
 const base=document.getElementById("plantao-patient-image");
 const scene=base?.closest(".plantao-scene");
 if(!scene)return;
 const rig=document.createElement("div");rig.className="luria-v7-rig";rig.hidden=true;
 const pieces=[["chest","luria-homem-adulto-v7-torax.webp"],["eyes","luria-homem-adulto-v7-olhos-fechados.webp"]];
 for(const [name,file] of pieces){
   const img=document.createElement("img");
   img.className="luria-v7-"+name;img.src="/assets/img/plantao/"+file;
   img.alt="";img.draggable=false;img.setAttribute("aria-hidden","true");rig.appendChild(img);
 }
 scene.appendChild(rig);
 const chest=rig.querySelector(".luria-v7-chest");
 const pct=(v)=>{
   const x=String(v||"center").toLowerCase();
   if(x==="left"||x==="top")return 0;
   if(x==="right"||x==="bottom")return 1;
   if(x==="center")return .5;
   const value=parseFloat(x);
   return Number.isFinite(value)?Math.max(0,Math.min(1,x.endsWith("%")?value/100:value)):.5;
 };
 let pending=false;
 function render(){
   pending=false;
   const active=/luria-homem-adulto-v7-aberto\.webp/.test(base.getAttribute("src")||"");
   scene.classList.toggle("luria-adult-v7",active);
   rig.hidden=!active;
   if(!active)return;
   const box=base.getBoundingClientRect(),parent=scene.getBoundingClientRect();
   if(box.width<=0||box.height<=0)return;
   const st=getComputedStyle(base),position=st.objectPosition.split(/\s+/);
   let iw=box.width,ih=box.height;
   if(st.objectFit==="cover"||st.objectFit==="contain"){
     const scale=st.objectFit==="cover" ? Math.max(box.width/1600,box.height/900) : Math.min(box.width/1600,box.height/900);
     iw=1600*scale;ih=900*scale;
   }
   rig.style.left=(box.left-parent.left+(box.width-iw)*pct(position[0]))+"px";
   rig.style.top=(box.top-parent.top+(box.height-ih)*pct(position[1]||"center"))+"px";
   rig.style.width=iw+"px";rig.style.height=ih+"px";
   scene.dataset.luriaEyes=base.dataset.luriaEyes||"auto";
   const rr=parseFloat(base.dataset.luriaRr);
   scene.dataset.luriaBreath=Number.isFinite(rr)&&rr<=0?"stopped":"active";
   chest.style.animationDuration=(rr>0?Math.min(9,Math.max(.75,60/rr)):3.5)+"s";
 }
 function schedule(){if(!pending){pending=true;requestAnimationFrame(render)}}
 new MutationObserver(schedule).observe(base,{attributes:true,attributeFilter:["src","data-luria-eyes","data-luria-rr"]});
 if(window.ResizeObserver){const observer=new ResizeObserver(schedule);observer.observe(scene);observer.observe(base)}
 base.addEventListener("load",schedule);
 window.addEventListener("resize",schedule,{passive:true});
 window.addEventListener("orientationchange",schedule,{passive:true});
 schedule();
})();