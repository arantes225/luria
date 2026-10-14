async function initLab() {
const local=location.protocol==='file:'||['localhost','127.0.0.1','[::1]'].includes(location.hostname);
if(local) {
  const {EXPRESSIONS,ANIMATIONS}=await import('../../assets/js/professor-alex-mascot.mjs');
  const $=id=>document.getElementById(id),alex=$('alex');$('lab').hidden=false;$('restricted').hidden=true;
  const labels=['Feliz','Atento','Pensativo','Surpreso','Confuso','Animado','Piscando','Estourado'];
  const motionLabels=['Acenar','Comemorar','Pensar','Explicar','Digitar','Ler','Demonstrar dúvida','Modo estourado','Repousar','Despertar','Cena de empolgação','Cena estourado','Confirmar','Tentar de novo','Indicar dica','Procurar','Aguardar','Escutar','Incentivar','Alongar','Agradecer','Receber carinho','Ficar tontinho'];
  const icons=['↗','✧','⋯','≋','⌨','▤','?','!','☾','☀','✦','♨','✓','↔','→','⌕','◌','◖','♡','↟','⌄','♥','↻'];
  const faces=[
    '<path d="M9 15 Q16 3 23 15 M35 15 Q42 3 49 15"/><path d="M24 21 Q29 29 34 21"/>',
    '<ellipse cx="16" cy="12" rx="4" ry="7"/><ellipse cx="42" cy="12" rx="4" ry="7"/><path d="M27 24h4"/>',
    '<path d="M9 12q7 9 14 0 M35 15q7-10 14 0 M26 24q3-3 6 0"/>',
    '<circle cx="16" cy="12" r="6"/><circle cx="42" cy="12" r="6"/><circle cx="29" cy="25" r="2"/>',
    '<path d="M9 5q7-5 14 0 M35 3q7-5 14 0 M26 24q3 3 6 0"/><ellipse cx="16" cy="14" rx="3" ry="5"/><ellipse cx="42" cy="14" rx="3" ry="6"/>',
    '<path d="m9 8 13 6-13 4 m40-10-13 6 13 4 M23 23q6 9 12 0"/>',
    '<ellipse cx="16" cy="12" rx="4" ry="7"/><path d="M35 15q7-10 14 0 M27 24h4"/>',
    '<path d="m8 7 15 7-4 4-8-1z m42 0-15 7 4 4 8-1z M24 26q5-7 10 0"/>'
  ];
  EXPRESSIONS.forEach((name,i)=>{const b=document.createElement('button');b.dataset.expression=name;b.setAttribute('aria-pressed',String(i===0));b.innerHTML='<svg viewBox="0 0 58 32" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">'+faces[i]+'</svg><span>'+labels[i]+'</span>';b.onclick=()=>{alex.animation='idle';alex.expression=name;document.querySelectorAll('[data-expression]').forEach(x=>x.setAttribute('aria-pressed',String(x===b)));$('status').textContent=labels[i]+' · Em repouso';};$('expressions').append(b);});
  ANIMATIONS.forEach((name,i)=>{const b=document.createElement('button');b.dataset.animation=name;b.innerHTML='<span class="symbol" aria-hidden="true">'+icons[i]+'</span>'+motionLabels[i];b.onclick=()=>{alex.playAnimation(name);$('status').textContent=motionLabels[i]+'…';};$('animations').append(b);});
  alex.addEventListener('alex-ready',()=>{$('status').textContent='Feliz · Em repouso';});
  if(alex.renderer)$('status').textContent='Feliz · Em repouso';
  alex.setView(-Math.PI/6,0);
  alex.addEventListener('alex-animation-end',()=>{$('status').textContent=labels[EXPRESSIONS.indexOf(alex.expression)]+' · Em repouso';});
  alex.addEventListener('alex-react',()=>{$('status').textContent='Olá! · Acenando';});
  alex.addEventListener('alex-error',()=>{$('status').textContent='WebGL 2 indisponível neste navegador';});
  $('reset').onclick=()=>{alex.animation='idle';$('status').textContent=labels[EXPRESSIONS.indexOf(alex.expression)]+' · Em repouso';};
  document.querySelectorAll('[data-device]').forEach(b=>b.onclick=()=>{document.querySelectorAll('[data-device]').forEach(x=>x.setAttribute('aria-pressed',String(x===b)));$('stage').classList.toggle('mobile',b.dataset.device==='mobile');});
  document.querySelectorAll('button[data-theme]').forEach(b=>b.onclick=()=>{const theme=b.dataset.theme;document.documentElement.dataset.theme=theme==='pink'?'leila-mood':theme;document.body.dataset.uiAppearance=theme==='dark'?'dark':'light';document.body.dataset.uiIdentity=theme==='pink'?'pink':'blue';document.querySelectorAll('button[data-theme]').forEach(x=>x.setAttribute('aria-pressed',String(x===b)));});
  const rotate=deg=>{alex.setView(deg*Math.PI/180,0);$('yaw').value=deg;$('yaw-value').textContent=deg+'°';};
  document.querySelectorAll('[data-view]').forEach(b=>b.onclick=()=>{rotate(Number(b.dataset.view));document.querySelectorAll('[data-view]').forEach(x=>x.classList.toggle('selected',x===b));});
  $('yaw').oninput=e=>{rotate(Number(e.target.value));document.querySelectorAll('[data-view]').forEach(x=>x.classList.remove('selected'));};
  $('intensity').oninput=e=>{alex.intensity=e.target.value;$('intensity-value').textContent=Math.round(alex.intensity*100)+'%';};
  $('size').oninput=e=>{alex.size=e.target.value;$('size-value').textContent=alex.size+' px';};
  $('speaking').onchange=e=>{alex.speaking=e.target.checked;};$('interactive').onchange=e=>{alex.interactive=e.target.checked;};
  const media=matchMedia('(prefers-reduced-motion: reduce)'),updateMotion=()=>{$('motion-preference').hidden=!media.matches;};media.addEventListener('change',updateMotion);updateMotion();
  if(location.protocol==='file:'){$('offline').disabled=true;$('offline').textContent='PWA: usar servidor local';}
  $('offline').onclick=async()=>{try{if(!('serviceWorker' in navigator))throw new Error('Service Worker indisponível');const registration=await navigator.serviceWorker.register('./sw.js',{scope:'./'});await navigator.serviceWorker.ready;const sw=registration.installing||registration.waiting||registration.active;if(sw?.state==='installing')await new Promise((resolve,reject)=>sw.addEventListener('statechange',()=>{if(sw.state==='activated')resolve();if(sw.state==='redundant')reject(new Error('Falha no cache offline'));}));$('offline-status').textContent='Cache local preparado. Instale pelo navegador ou teste sem conexão.';}catch(e){$('offline-status').textContent='Teste offline indisponível: '+e.message;}};
}
}
initLab();
