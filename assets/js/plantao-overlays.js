/* Top-layer dialogs keep case panels out of transformed/scrolling app containers. */
(()=>{
 'use strict';
 for(const [id,closeId,titleId] of [
  ['plantao-patient-sheet','plantao-patient-sheet-close','plantao-patient-sheet-title'],
  ['plantao-report-overlay','plantao-report-close','plantao-report-exam']
 ]){
  const content=document.getElementById(id);if(!content)continue;
  const dialog=document.createElement('dialog');dialog.id=id+'-dialog';dialog.className='plantao-layer-dialog';
  dialog.setAttribute('aria-labelledby',titleId);document.body.append(dialog);dialog.append(content);
  const close=()=>document.getElementById(closeId)?.click();
  dialog.addEventListener('cancel',event=>{event.preventDefault();close()});
  dialog.addEventListener('click',event=>{if(event.target===dialog)close()});
  const sync=()=>{if(content.hidden){if(dialog.open)dialog.close()}else if(!dialog.open)dialog.showModal()};
  new MutationObserver(sync).observe(content,{attributes:true,attributeFilter:['hidden']});
  sync();
 }
})();