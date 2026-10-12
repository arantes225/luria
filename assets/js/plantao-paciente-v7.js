(()=>{"use strict";
const base=document.getElementById("plantao-patient-image"),scene=base?.closest(".plantao-scene");if(!scene)return;
const defs=[["torax",310,340,990,475],["olhos",503,118,252,112]],nodes=defs.map(([name])=>{const i=document.createElement("img");i.className="luria-adult-v7-patch luria-adult-v7-"+name;i.src="/assets/img/plantao/luria-homem-adulto-v7-"+(name==="torax"?"torax":"olhos-fechados")+".webp";i.alt="";i.setAttribute("aria-hidden","true");base.after(i);return i});
function update(){
 const ok=/luria-homem-adulto-v7-aberto\.webp/.test(base.getAttribute("src")||"");scene.classList.toggle("luria-adult-v7",ok);nodes.forEach(n=>n.hidden=!ok);if(!ok)return;
 const box=base.getBoundingClientRect(),root=scene.getBoundingClientRect(),css=getComputedStyle(base),fit=css.objectFit,pos=css.objectPosition.split(" "),part=x=>x==="left"||x==="top"?0:x==="right"||x==="bottom"?1:(parseFloat(x)||50)/100;
 let sx=box.width/1600,sy=box.height/900,dx=0,dy=0;if(fit==="cover"||fit==="contain"){const s=fit==="cover"?Math.max(sx,sy):Math.min(sx,sy);sx=sy=s;dx=(box.width-1600*s)*part(pos[0]);dy=(box.height-900*s)*part(pos[1]||"50%");}
 defs.forEach((a,k)=>{const n=nodes[k];n.style.setProperty("left",(box.left-root.left+dx+a[1]*sx)+"px","important");n.style.setProperty("top",(box.top-root.top+dy+a[2]*sy)+"px","important");n.style.setProperty("width",a[3]*sx+"px","important");n.style.setProperty("height",a[4]*sy+"px","important")});
 scene.dataset.luriaEyes=base.dataset.luriaEyes||"auto";const rr=parseFloat(base.dataset.luriaRr);scene.dataset.luriaBreath=Number.isFinite(rr)&&rr<=0?"stopped":"active";nodes[0].style.animationDuration=(rr>0?Math.min(9,Math.max(.75,60/rr)):3.5)+"s";
}
new MutationObserver(update).observe(base,{attributes:true,attributeFilter:["src","data-luria-eyes","data-luria-rr"]});
if(window.ResizeObserver)new ResizeObserver(update).observe(scene);base.addEventListener("load",update);window.addEventListener("resize",update);update();
})();