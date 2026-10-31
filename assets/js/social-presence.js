/* Optional friend presence. One private owner channel, ephemeral state, no database heartbeats. */
(() => {
 'use strict';
 if(window.TraubeStudyPresence)return;
 let channel=null,uid=null,allowed=false,generation=0;
 async function stop(){generation++;const old=channel;channel=null;uid=null;allowed=false;if(old)await window.supabaseClient.removeChannel(old);}
 async function publish(){if(!channel||!uid||!allowed)return;await channel.track({user_id:uid,studying:!!window.TraubeStudyTimer?.getState()?.running});}
 async function start(){
  const user=window.docmapUser;if(!user?.id||!window.supabaseClient?.realtime)return;
  await stop();const g=generation;uid=user.id;
  const {data,error}=await window.supabaseClient.from('profiles').select('share_study_status').eq('user_id',uid).maybeSingle();
  if(error||g!==generation||!data?.share_study_status)return;allowed=true;
  await window.supabaseClient.realtime.setAuth();if(g!==generation)return;
  channel=window.supabaseClient.channel('social-presence:'+uid,{config:{private:true,presence:{key:uid}}});
  channel.subscribe(result=>{if(result==='SUBSCRIBED'&&g===generation)publish().catch(()=>{});});
 }
 window.TraubeStudyPresence={refresh:start,stop};
 window.addEventListener('luria:study-timer',()=>publish().catch(()=>{}));
 window.addEventListener('luria:owner-changed',()=>stop().catch(()=>{}));
 window.addEventListener('pagehide',()=>stop().catch(()=>{}));
 if(window.docmapUser)start().catch(()=>{});else window.addEventListener('docmap:ready',()=>start().catch(()=>{}),{once:true});
})();
