// No renderer import: pages decide when to load and mount their Alex component.
export const ALEX_ACTIONS = Object.freeze({
  welcome:'wake',success:'nod',error:'shakeHead',hint:'point',search:'search',
  loading:'loading',listening:'listening',encourage:'encourage',break:'stretch',
  thanks:'bow',complete:'celebrate',achievement:'celebrateScene',
  question:'thinking',material:'reading',explain:'explaining'
});
const continuous=new Set(['loading','listening','search']);
const terminal=new Set(['success','error','complete','achievement']);
const bindings=new WeakMap();

/** Bind one mascot to explicit application events; returns a disposable adapter. */
export function bindAlex(alex,{root=document,cooldown=1200}={}) {
  if(!alex)throw new TypeError('Alex component is required');
  if(bindings.has(alex))return bindings.get(alex);
  const abort=new AbortController(),options={signal:abort.signal};
  const motion=matchMedia('(prefers-reduced-motion: reduce)');
  let state=null,pending=null,lastAction=null,lastAt=-Infinity,destroyed=false;
  const play=action=>alex.playAnimation(ALEX_ACTIONS[action]);
  const reset=()=>{state=null;alex.animation='idle';alex.expression='happy';alex.removeAttribute('aria-busy');};
  function react(action,{phase='once'}={}) {
    if(destroyed||!Object.hasOwn(ALEX_ACTIONS,action)||!['once','start','end'].includes(phase))return false;
    if(phase==='end'){if(pending?.action===action){pending=null;return true;}if(state!==action)return false;reset();return true;}
    if(state&&!terminal.has(action)&&!(phase==='start'&&continuous.has(action)))return false;
    const now=performance.now();
    if(action===lastAction&&now-lastAt<cooldown&&phase!=='start'&&!terminal.has(action))return false;
    if(!alex.renderer){pending={action,phase};return true;}
    lastAction=action;lastAt=now;state=phase==='start'&&continuous.has(action)?action:null;
    if(state==='loading'||state==='search')alex.setAttribute('aria-busy','true');else alex.removeAttribute('aria-busy');
    return play(action);
  }
  alex.addEventListener('alex-ready',()=>{if(pending){const next=pending;pending=null;react(next.action,next);}},options);
  alex.addEventListener('alex-animation-end',event=>{
    if(state&&event.detail?.animation===ALEX_ACTIONS[state]&&!motion.matches&&alex.intensity>0)play(state);
  },options);
  motion.addEventListener('change',()=>{if(state)play(state);},options);
  root.addEventListener('luria:alex',event=>{
    const detail=event.detail||{};
    if(detail.target&&detail.target!==alex.id)return;
    react(detail.action,detail);
  },options);
  root.addEventListener('click',event=>{
    const trigger=event.target.closest?.('[data-alex-action]');
    if(!trigger||trigger.disabled||trigger.getAttribute('aria-disabled')==='true')return;
    if(trigger.dataset.alexTarget&&trigger.dataset.alexTarget!==alex.id)return;
    react(trigger.dataset.alexAction);
  },options);
  const binding={react,get state(){return state;},destroy(){if(destroyed)return;destroyed=true;pending=null;abort.abort();reset();bindings.delete(alex);}};
  bindings.set(alex,binding);return binding;
}
