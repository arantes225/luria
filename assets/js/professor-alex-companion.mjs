import './professor-alex-mascot.mjs?v=20261014-ready2';
import {bindAlex} from './professor-alex-integration.mjs?v=20261014-ready2';

const contexts={
 dashboard:['Seu dia na LURIA','Escolha uma atividade ou confira seu progresso.','/aprender/','Explorar formas de aprender'],
 aprender:['Como você quer aprender?','Explore as apostilas, suas anotações ou o estudo guiado.','/apostilas/','Abrir apostilas'],
 flashcards:['Revisão com flashcards','Tente lembrar antes de revelar a resposta e avalie como foi sua recordação.','/consolidar/','Ver atividades de revisão'],
 questoes:['Treino com questões','Leia o enunciado com atenção e revise o raciocínio depois da resposta.','/consolidar/','Ver atividades de revisão'],
 caderno:['Suas anotações','Organize conceitos com suas próprias palavras para facilitar a revisão.','/aprender/','Voltar a Aprender'],
 cronograma:['Seu planejamento','Distribua estudo e revisão em blocos que caibam na sua rotina.','/aprender/','Escolher uma atividade'],
 professor_alex:['Professor Alex','Escolha um tema, uma dúvida ou seu material para preparar a aula.','/aprender/','Voltar a Aprender']
};

export function mountAlexCompanion({userId,isAdmin=false}={}) {
 if(!userId||document.querySelector('luria-alex-companion'))return null;
 const host=document.createElement('luria-alex-companion'),shadow=host.attachShadow({mode:'open'});
 const abort=new AbortController(),opts={signal:abort.signal},key='luria:alex:companion:'+userId;
 let prefs={x:1,y:1,minimized:false};try{const saved=JSON.parse(localStorage.getItem(key));if(saved&&Number.isFinite(saved.x)&&Number.isFinite(saved.y))prefs={x:Math.max(0,Math.min(1,saved.x)),y:Math.max(0,Math.min(1,saved.y)),minimized:saved.minimized===true};}catch{}
 const css=document.createElement('link');css.rel='stylesheet';css.href=new URL('../css/professor-alex-companion.css?v=20261014-ready2',import.meta.url).href;
 shadow.append(css);shadow.innerHTML+='<div class="help" hidden role="region" aria-label="Ajuda do Alex"><button class="close" aria-label="Fechar ajuda">×</button><h2></h2><button class="minimize">Minimizar Alex</button><p></p><a class="context-link"></a><p><a class="tutoring" href="/professor-alex/" hidden>Abrir tutoria com o Alex</a></p></div><div class="robot"></div><button class="restore" hidden aria-label="Restaurar Alex">Alex</button>';
 const robot=shadow.querySelector('.robot'),help=shadow.querySelector('.help'),restore=shadow.querySelector('.restore'),grip=robot;
 const source=document.querySelector('professor-alex-mascot'),parent=source?.parentElement,next=source?.nextSibling;
 const hero=parent?.closest('.alex-hero');
 const old=source?{size:source.size,interactive:source.interactive,hidden:parent.hidden,display:parent.style.display,columns:hero?.style.gridTemplateColumns}:null;
 const alex=source||document.createElement('professor-alex-mascot');if(!alex.id)alex.id='alex-companion';
 alex.setAttribute('draggable-companion','');alex.size=128;alex.interactive=true;if(parent){parent.hidden=true;parent.style.display='none';if(document.body.dataset.page==='aprender'&&hero)hero.style.gridTemplateColumns='minmax(0,1fr)';}
 const integration=bindAlex(alex);let drag=null,destroyed=false;
 const save=()=>{try{localStorage.setItem(key,JSON.stringify(prefs));}catch{}};
 const bounds=()=>{const viewport=window.visualViewport;const left=(viewport?.offsetLeft||0)+12,top=(viewport?.offsetTop||0)+76;const width=viewport?.width||innerWidth,height=viewport?.height||innerHeight;return {left,top,right:Math.max(left,(viewport?.offsetLeft||0)+width-host.offsetWidth-12),bottom:Math.max(top,(viewport?.offsetTop||0)+height-host.offsetHeight-28)};};
 function position(){const b=bounds();host.style.left=(b.left+(b.right-b.left)*prefs.x)+'px';host.style.top=(b.top+(b.bottom-b.top)*prefs.y)+'px';help.classList.toggle('down',prefs.y<.5);help.classList.toggle('left',prefs.x<.5);
  if(!help.hidden){const viewport=window.visualViewport,edge=(viewport?.offsetTop||0)+(viewport?.height||innerHeight)-12;help.style.maxHeight=Math.max(80,edge-b.top)+'px';help.style.overflow='auto';const x=parseFloat(host.style.left),y=parseFloat(host.style.top),w=help.offsetWidth,h=help.offsetHeight;help.style.left=(Math.max(b.left,Math.min((viewport?.offsetLeft||0)+(viewport?.width||innerWidth)-w-12,x))-x)+'px';help.style.right='auto';help.style.top=(Math.max(b.top,Math.min(edge-h,y-h-8))-y)+'px';help.style.bottom='auto';help.style.margin='0';}
 }
 function minimize(value){prefs.minimized=value;help.hidden=true;robot.hidden=value;restore.hidden=!value;host.style.width=value?'64px':'';if(value)alex.remove();else robot.append(alex);position();save();}
 function setAccess(value){shadow.querySelector('.tutoring').hidden=value!==true;}
 let taps=[];
 function toggleHelp(){const now=performance.now();taps=taps.filter(time=>now-time<1600);taps.push(now);if(taps.length>=3){help.hidden=true;integration.react('affection');return;}help.hidden=!help.hidden;position();if(!help.hidden)integration.react('hint');}
 const context=contexts[document.body.dataset.page]||['Estou por aqui','Use esta página para seguir sua atividade. Você pode mover ou minimizar o Alex a qualquer momento.','/dashboard/','Abrir meu painel'];
 help.querySelector('h2').textContent=context[0];help.querySelector('p').textContent=context[1];const link=help.querySelector('.context-link');link.href=context[2];link.textContent=context[3];
 alex.addEventListener('alex-react',toggleHelp,opts);
 shadow.querySelector('.close').addEventListener('click',()=>{help.hidden=true;alex.button?.focus();},opts);
 shadow.querySelector('.minimize').addEventListener('click',()=>{minimize(true);restore.focus();},opts);
 restore.addEventListener('click',()=>{minimize(false);alex.button?.focus();},opts);
 grip.style.touchAction='none';grip.addEventListener('dragstart',event=>event.preventDefault(),opts);
 let suppressClickUntil=0;
 grip.addEventListener('pointerdown',event=>{if(event.button!==0||event.isPrimary===false)return;event.preventDefault();alex.button.focus({preventScroll:true});drag={id:event.pointerId,x:event.clientX,y:event.clientY,lastX:event.clientX,lastY:event.clientY,left:parseFloat(host.style.left),top:parseFloat(host.style.top),moved:false,angle:null,turn:0};alex.button.setPointerCapture(event.pointerId);},opts);
 grip.addEventListener('pointermove',event=>{if(!drag||event.pointerId!==drag.id)return;const dx=event.clientX-drag.x,dy=event.clientY-drag.y;if(!drag.moved&&Math.hypot(dx,dy)<6)return;drag.moved=true;taps=[];help.hidden=true;const velocityX=(event.clientX-drag.lastX)/18,velocityY=(event.clientY-drag.lastY)/18;const samples=event.getCoalescedEvents?.()||[];for(const point of samples.length?samples:[event]){const stepX=point.clientX-drag.lastX,stepY=point.clientY-drag.lastY;if(Math.hypot(stepX,stepY)>3){const angle=Math.atan2(stepY,stepX);if(drag.angle!==null){let delta=angle-drag.angle;delta=Math.atan2(Math.sin(delta),Math.cos(delta));drag.turn+=delta;}drag.angle=angle;drag.lastX=point.clientX;drag.lastY=point.clientY;}}event.preventDefault();alex.setDragMotion(true,velocityX,velocityY);drag.lastX=event.clientX;drag.lastY=event.clientY;const b=bounds();prefs.x=(Math.max(b.left,Math.min(b.right,drag.left+dx))-b.left)/(b.right-b.left||1);prefs.y=(Math.max(b.top,Math.min(b.bottom,drag.top+dy))-b.top)/(b.bottom-b.top||1);position();},opts);
 const stop=event=>{if(!drag||event.pointerId!==drag.id)return;const dizzy=drag.moved&&Math.abs(drag.turn)>Math.PI*2.5;if(drag.moved){suppressClickUntil=performance.now()+500;save();host.dispatchEvent(new CustomEvent('alex-drag-end',{detail:{turn:drag.turn,dizzy},bubbles:true}));}drag=null;alex.setDragMotion(false);if(dizzy)integration.react('dizzy');};grip.addEventListener('pointerup',stop,opts);grip.addEventListener('pointercancel',stop,opts);grip.addEventListener('lostpointercapture',stop,opts);
 grip.addEventListener('click',event=>{if(performance.now()<suppressClickUntil){event.preventDefault();event.stopImmediatePropagation();}}, {...opts,capture:true});
 grip.addEventListener('keydown',event=>{if(!['ArrowLeft','ArrowRight','ArrowUp','ArrowDown'].includes(event.key))return;event.preventDefault();const b=bounds();prefs.x=Math.max(0,Math.min(1,prefs.x+({ArrowLeft:-20,ArrowRight:20}[event.key]||0)/(b.right-b.left||1)));prefs.y=Math.max(0,Math.min(1,prefs.y+({ArrowUp:-20,ArrowDown:20}[event.key]||0)/(b.bottom-b.top||1)));position();save();},opts);
 shadow.addEventListener('keydown',event=>{if(event.key==='Escape'){help.hidden=true;alex.button?.focus();}},opts);
 window.addEventListener('resize',position,opts);window.visualViewport?.addEventListener('resize',position,opts);window.visualViewport?.addEventListener('scroll',position,opts);
 shadow.querySelector('link').addEventListener('load',()=>{position();alex._resize();alex._schedule();},opts);
 document.body.append(host);setAccess(isAdmin);minimize(prefs.minimized);if(!prefs.minimized)integration.react('welcome');
 return {host,alex,setAccess,destroy(){if(destroyed)return;destroyed=true;abort.abort();integration.destroy();alex.setDragMotion(false);alex.removeAttribute('draggable-companion');alex.remove();host.remove();if(parent){alex.size=old.size;alex.interactive=old.interactive;parent.insertBefore(alex,next);parent.hidden=old.hidden;parent.style.display=old.display;if(hero)hero.style.gridTemplateColumns=old.columns;}}};
}
