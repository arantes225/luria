/* LURIA: carrega o módulo V16 somente quando um caso usa a mulher idosa. */
(()=>{
 "use strict";
 const img=document.getElementById("plantao-patient-image");
 if(!img)return;
 const images=/(?:luria-mulher-idosa-v16-base|02-mulher-idosa-acordada|01-mulher-idosa-olhos-fechados|16-mulher-idosa-acordada|07-mulher-idosa-olhos-fechados)\.webp(?:\?|$)/;
 let requested=false;
 function detect(){
  if(requested || !images.test(img.getAttribute("src")||""))return;
  requested=true;
  const script=document.createElement("script");
  script.src="/assets/js/plantao-mulher-idosa-v16.js?v=20261013-v16-publicado";
  script.async=true;
  script.onerror=()=>{requested=false;console.warn("LURIA: não foi possível carregar a mulher idosa V16.")};
  document.head.appendChild(script);
 }
 const observer=new MutationObserver(detect);
 observer.observe(img,{attributes:true,attributeFilter:["src"]});
 detect();
})();