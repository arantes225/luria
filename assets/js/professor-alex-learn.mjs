import './professor-alex-mascot.mjs?v=20261014-actions1';
import {bindAlex} from './professor-alex-integration.mjs?v=20261014-actions1';

const alex=document.querySelector('.alex-visual professor-alex-mascot');
if(alex){
  const integration=bindAlex(alex);let welcomed=false;
  const welcome=()=>{if(!welcomed&&!alex.closest('[data-admin-only]').hidden){welcomed=true;integration.react('welcome');}};
  window.addEventListener('docmap:ready',welcome);
  if(window.docmapIsAdmin===true)welcome();
  document.getElementById('alex-home-file')?.addEventListener('change',event=>{if(event.target.files?.length)integration.react('material');});
  document.querySelector('.alex-ask input[name="q"]')?.addEventListener('focus',()=>integration.react('question'));
  window.addEventListener('pagehide',event=>{if(!event.persisted){integration.destroy();window.removeEventListener('docmap:ready',welcome);}});
}
