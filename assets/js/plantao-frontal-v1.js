/* Integration only. Images, coordinates and animation live in the unchanged gallery engine. */
(()=>{
 'use strict';
 const base=document.getElementById('plantao-patient-image');
 const scene=base?.closest('.plantao-scene');
 if(!base||!scene||!window.TraubePatient||!window.TRAUBE_CHARACTERS)return;
 const groups=[
  [/elderly-woman|mulher[-_]idosa/i,3],
  [/elderly-man|homem[-_]idoso/i,2],
  [/pregnant|gestante/i,4],
  [/baby|bebe/i,5],
  [/girl|menina/i,6],
  [/boy|menino/i,7],
  [/adult-woman|mulher[-_]adulta/i,1],
  [/adult-man|homem[-_]adulto/i,0]
 ];
 let rig=null,canvas=null,current=-1,pending=0,readyFrame=0;
 function remove(){
  cancelAnimationFrame(readyFrame);readyFrame=0;
  rig?.destroy();rig=null;canvas?.remove();canvas=null;current=-1;
  scene.classList.remove('luria-original-patient');
 }
 function sync(){
  pending=0;
  let src=base.getAttribute('src')||'';try{src=decodeURIComponent(src)}catch{}
  const entry=groups.find(([pattern])=>pattern.test(src));
  if(!entry||/ambulancia|ambulance|\/plantao\/aph\//.test(src)){remove();return}
  const index=entry[1],config=window.TRAUBE_CHARACTERS[index];
  const value=base.dataset.luriaRr;
  const rr=value!==undefined&&value!==''&&Number.isFinite(Number(value))?Number(value):17;
  const eyes=base.dataset.luriaEyes||(/closed|fechad|dormindo|sleep/i.test(src)?'closed':'auto');
  const options={rr,eyes};
  if(current===index&&rig){rig.set(options);return}
  remove();current=index;
  canvas=document.createElement('canvas');canvas.className='luria-original-canvas';canvas.hidden=true;
  canvas.setAttribute('role','img');canvas.setAttribute('aria-label',config.name+' com movimentos de olhos e respiração');
  canvas.dataset.characterId=config.id;
  canvas.addEventListener('patienterror',()=>{remove();console.error('Não foi possível carregar o personagem original.')},{once:true});
  base.before(canvas);
  rig=new window.TraubePatient(canvas,config,options);
  const instance=rig;
  function ready(){
   if(rig!==instance)return;
   if(!instance.ready){readyFrame=requestAnimationFrame(ready);return}
   readyFrame=0;canvas.hidden=false;scene.classList.add('luria-original-patient');
  }
  ready();
 }
 function queue(){if(!pending)pending=requestAnimationFrame(sync)}
 new MutationObserver(queue).observe(base,{attributes:true,attributeFilter:['src','data-luria-eyes','data-luria-rr']});
 base.addEventListener('load',queue);
 window.addEventListener('pagehide',remove);
 window.addEventListener('pageshow',queue);
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
