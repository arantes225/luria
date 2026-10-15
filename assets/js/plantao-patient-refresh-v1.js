/* Troca os retratos legados do simulador pelos pares frontais novos em web e PWA. */
(()=>{
 "use strict";
 const groups=[
  {slug:"adult-man",rx:/(?:luria-homem-adulto-v7|plantao-homem-adulto|0[36]-homem-adulto)/i},
  {slug:"adult-woman",rx:/(?:luria-mulher-adulta-v5|0[34]-mulher-adulta|0[45]-mulher-adulta-negra)/i},
  {slug:"baby",rx:/(?:0[15]-bebe|1[12]-bebe)/i},
  {slug:"boy",rx:/(?:0[79]-menino|0?8-menino|13-menino)/i}
 ];
 const isPwa=()=>document.documentElement.classList.contains("pwa-standalone")
  ||document.documentElement.dataset.pwa==="standalone"
  ||window.matchMedia?.("(display-mode: standalone)")?.matches
  ||window.navigator.standalone===true;
 const getGroup=value=>{
  let name=String(value||"");
  try{name=decodeURIComponent(name)}catch{}
  return groups.find(group=>group.rx.test(name))||null;
 };
 const closed=value=>/(?:dorm|fech|closed|sleep)/i.test(String(value||""));
 const path=(group,isClosed,pwa)=>{
  const state=isClosed?"closed":"awake";
  const stem="/assets/img/plantao"+(pwa?" pwa/":"/")+"patient-frontal-"+group.slug+"-"+state;
  return stem+(pwa?"-pwa":"")+".webp";
 };
 function canonicalPair(awake,asleep){
  const source=String(awake||asleep||"");
  const group=getGroup(source)||getGroup(asleep);
  if(!group)return null;
  let decoded=source;try{decoded=decodeURIComponent(source)}catch{}
  const pwa=decoded.includes("/plantao pwa/")||isPwa();
  return {awake:path(group,false,pwa),closed:path(group,true,pwa)};
 }
 const monitor=window.PlantaoMonitor;
 if(monitor&&typeof monitor.update==="function"&&!monitor.__frontalPatientsWrapped){
  const original=monitor.update.bind(monitor);
  monitor.update=function(v,options={}){
   const pair=canonicalPair(options.patient_image,options.unconscious_image);
   return original(v,pair?{...options,patient_image:pair.awake,unconscious_image:pair.closed}:options);
  };
  monitor.__frontalPatientsWrapped=true;
 }
 function replaceImage(image){
  if(!(image instanceof HTMLImageElement))return;
  const src=image.getAttribute("src")||"";
  const group=getGroup(src);
  if(!group)return;
  let decoded=src;try{decoded=decodeURIComponent(src)}catch{}
  image.src=path(group,closed(decoded),decoded.includes("/plantao pwa/")||isPwa());
 }
 function scan(root=document){
  if(root instanceof HTMLImageElement)replaceImage(root);
  root.querySelectorAll?.("img[src]").forEach(replaceImage);
 }
 scan();
 new MutationObserver(records=>{
  for(const record of records){
   if(record.type==="attributes")replaceImage(record.target);
   else record.addedNodes.forEach(node=>scan(node));
  }
 }).observe(document.documentElement,{subtree:true,childList:true,attributes:true,attributeFilter:["src"]});
})();