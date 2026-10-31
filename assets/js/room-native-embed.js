/* Same-origin presentation context for the original editors and clinical simulator. */
(() => {
 'use strict';
 if(window.parent===window)return;
 let frame;try{frame=window.frameElement;}catch{return;}
 if(!frame||!['room-native-editor','room-native-simulator'].includes(frame.id))return;
 const room=frame.dataset.roomId,kind=frame.dataset.nativeKind,caseId=frame.dataset.caseId||null;
 const uuid=/^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
 if(!uuid.test(room||'')||!['questions','flashcards','simulator'].includes(kind)||caseId&&!uuid.test(caseId))return;
 window.TraubeRoomEmbed=Object.freeze({roomId:room,kind,caseId,activityCreatedAt:frame.dataset.activityCreatedAt||null});
 document.documentElement.classList.add('room-native-embed');
 // The room retains its global companion; the nested module needs no second one.
 function removeNestedCompanion(){const existing=document.querySelector('professor-alex-mascot');if(existing){existing.remove();return;}const observer=new MutationObserver(()=>{const companion=document.querySelector('professor-alex-mascot');if(companion){companion.remove();observer.disconnect();}});observer.observe(document.body,{childList:true});window.addEventListener('pagehide',()=>observer.disconnect(),{once:true});}
 if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',removeNestedCompanion,{once:true});else removeNestedCompanion();
 window.addEventListener('traube:clinical-session',event=>{
  const data=event.detail;if(kind!=='simulator'||!uuid.test(data?.id||'')||data?.case_id!==caseId)return;
  window.parent.postMessage({type:'traube:room-clinical-session',room_id:room,case_id:caseId,session_id:data.id,status:data.status},location.origin);
 });
 window.addEventListener('traube:clinical-exit',()=>{
  if(kind==='simulator')window.parent.postMessage({type:'traube:room-simulator-close',room_id:room,case_id:caseId},location.origin);
 });
})();
