/* Same-origin presentation context for the original editors and clinical simulator. */
(() => {
 'use strict';
 if(window.parent===window)return;
 let frame;try{frame=window.frameElement;}catch{return;}
 if(!frame||!['room-native-editor','room-native-simulator'].includes(frame.id))return;
 const room=frame.dataset.roomId,kind=frame.dataset.nativeKind,caseId=frame.dataset.caseId||null;
 const uuid=/^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
 if(!uuid.test(room||'')||!['questions','flashcards','simulator'].includes(kind)||caseId&&!uuid.test(caseId))return;
 window.LuriaRoomEmbed=Object.freeze({roomId:room,kind,caseId,activityCreatedAt:frame.dataset.activityCreatedAt||null});
 document.documentElement.classList.add('room-native-embed');
 window.addEventListener('luria:clinical-session',event=>{
  const data=event.detail;if(kind!=='simulator'||!uuid.test(data?.id||'')||data?.case_id!==caseId)return;
  window.parent.postMessage({type:'luria:room-clinical-session',room_id:room,case_id:caseId,session_id:data.id,status:data.status},location.origin);
 });
})();
