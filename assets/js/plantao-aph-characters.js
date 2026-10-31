/* Usa, no simulador web e PWA, os quatro pares e recortes da prévia APH. */
(()=>{
  'use strict';
  const base=document.getElementById('plantao-patient-image');
  const scene=base?.closest('.plantao-scene');
  if(!base||!scene)return;
  const root='/assets/img/plantao/aph/';
  const rigs={
    'homem-adulto':{
      rest:'polygon(31.7% 22.5%,45% 17.3%,45% 17.3%,31.7% 22.5%)',
      closed:'polygon(31.7% 19.9%,45% 14.7%,45% 26.5%,31.7% 31.7%)',
      mask:'radial-gradient(ellipse 3.1% 3.5% at 35.3% 24.4%,#000 66%,transparent 100%),radial-gradient(ellipse 2.9% 3.1% at 42% 20.9%,#000 66%,transparent 100%)'
    },
    'mulher-adulta':{
      rest:'polygon(32% 23.5%,45% 17.8%,45% 17.8%,32% 23.5%)',
      closed:'polygon(32% 20.5%,45% 14.8%,45% 27.2%,32% 32.9%)',
      mask:'radial-gradient(ellipse 3.1% 3.7% at 35.8% 25.7%,#000 66%,transparent 100%),radial-gradient(ellipse 3% 3.4% at 42% 21.9%,#000 66%,transparent 100%)'
    },
    'homem-idoso':{
      rest:'polygon(31.7% 24.6%,45% 18.9%,45% 18.9%,31.7% 24.6%)',
      closed:'polygon(31.7% 21.3%,45% 15.6%,45% 28.4%,31.7% 34.1%)',
      mask:'radial-gradient(ellipse 3.2% 4.1% at 35.3% 27%,#000 66%,transparent 100%),radial-gradient(ellipse 3.1% 3.5% at 42.1% 22.7%,#000 66%,transparent 100%)'
    },
    'mulher-idosa':{
      rest:'polygon(31.8% 25.8%,45.2% 20.4%,45.2% 20.4%,31.8% 25.8%)',
      closed:'polygon(31.8% 22.3%,45.2% 16.9%,45.2% 30.3%,31.8% 35.7%)',
      mask:'radial-gradient(ellipse 3.2% 4.1% at 35.3% 28.5%,#000 66%,transparent 100%),radial-gradient(ellipse 3% 3.7% at 42.2% 24.2%,#000 66%,transparent 100%)'
    }
  };
  let thorax=null,blink=null,active='';
  function clear(){
    thorax?.remove();blink?.remove();thorax=blink=null;active='';
    scene.classList.remove('aph-active','aph-eyes-closed','aph-no-breath');
  }
  function sync(){
    const match=base.getAttribute('src')?.match(/\/assets\/img\/plantao\/aph\/(homem-adulto|mulher-adulta|homem-idoso|mulher-idosa)-(aberto|fechado)\.webp(?:\?|$)/);
    if(!match){if(active)clear();return}
    const [,key,state]=match,rig=rigs[key];
    if(active!==key){
      clear();active=key;
      thorax=document.createElement('img');thorax.className='aph-thorax';thorax.alt='';thorax.setAttribute('aria-hidden','true');
      blink=document.createElement('img');blink.className='aph-blink';blink.alt='';blink.setAttribute('aria-hidden','true');
      base.after(thorax,blink);
      scene.style.setProperty('--aph-eyes-rest',rig.rest);
      scene.style.setProperty('--aph-eyes-closed',rig.closed);
      scene.style.setProperty('--aph-eye-mask',rig.mask);
      scene.style.setProperty('--aph-blink-delay',`${-Math.random()*7.6}s`);
    }
    const eyesClosed=state==='fechado'||base.dataset.traubeEyes==='closed';
    const rr=Number(base.dataset.traubeRr);
    scene.classList.add('aph-active');
    scene.classList.toggle('aph-eyes-closed',eyesClosed);
    scene.classList.toggle('aph-no-breath',!Number.isFinite(rr)||rr<=0);
    if(Number.isFinite(rr)&&rr>0)scene.style.setProperty('--aph-breath-duration',`${60/Math.min(rr,80)}s`);
    const source=base.getAttribute('src');
    if(thorax.getAttribute('src')!==source)thorax.src=source;
    const closedSource=root+key+'-fechado.webp?v=20261021';
    if(blink.getAttribute('src')!==closedSource)blink.src=closedSource;
  }
  new MutationObserver(sync).observe(base,{attributes:true,attributeFilter:['src','data-traube-eyes','data-traube-rr']});
  window.addEventListener('pagehide',clear);
  window.addEventListener('pageshow',sync);
  sync();
})();
