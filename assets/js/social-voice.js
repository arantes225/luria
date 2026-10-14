(() => {
 'use strict';
 if(window.LuriaVoice)return;
 let pc=null,stream=null,room=null,clientId=null,broadcast=null,heartbeat=null,queue=Promise.resolve(),subscribed=new Set(),muted=false,generation=0,joining=false,iceExpiresAt=0;
 const $=id=>document.getElementById(id);
 // GitHub Pages has no server routes; staging builds use their same-origin proxy.
 const endpoint='https://luria-study-voice.lfab225.workers.dev/api/study-voice';
 const status=text=>{if($('social-voice-status'))$('social-voice-status').textContent=text;};
 let lastAuthorization=null,activeContext=null;
 let uplink=null,listeningMuted=false,pushToTalk=false,statsTimer=null,quotaTimer=null,voiceQuota=null,quotaExpires=0,quotaRecorded=0,quotaRemaining=0;
 const remoteUsers=new Map(),remoteTracks=new Map();let speaking=[],voiceUsers=[],lastVoiceState='';
 const state=()=>({active:!!pc,muted,listeningMuted,pushToTalk,speaking:speaking.slice(),users:voiceUsers.slice(),remainingSeconds:voiceQuota?Math.max(0,Math.floor(quotaRemaining-(Date.now()-quotaRecorded)/1000)):null});
 function notify(){const value=state(),key=JSON.stringify({...value,remainingSeconds:null});if(key!==lastVoiceState){lastVoiceState=key;window.dispatchEvent(new CustomEvent('luria:voice-state',{detail:value}));}}
 function updateQuota(value){if(!value)return;voiceQuota=value;quotaRecorded=Date.now();quotaRemaining=Number(value.remaining_seconds)||0;if(value.expires_at)quotaExpires=Date.now()+Math.max(0,Date.parse(value.expires_at)-Date.parse(value.server_now));}
 const pendingKey='luria:voice:pending-leaves';
 const uuid=/^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
 const pendingLeaves=()=>{try{return JSON.parse(sessionStorage.getItem(pendingKey)||'[]').filter(p=>p&&uuid.test(p.userId||'')&&uuid.test(p.room||'')&&uuid.test(p.clientId||'')&&Number.isFinite(p.createdAt)&&Date.now()-p.createdAt>=0&&Date.now()-p.createdAt<600000).slice(-8);}catch{return [];}};
 const savePending=records=>{try{if(records.length)sessionStorage.setItem(pendingKey,JSON.stringify(records));else sessionStorage.removeItem(pendingKey);}catch{}};
 const remember=context=>{if(context?.userId)savePending([...pendingLeaves().filter(p=>p.clientId!==context.clientId),{room:context.room,clientId:context.clientId,userId:context.userId,createdAt:Date.now()}]);};
 const forget=context=>savePending(pendingLeaves().filter(p=>p.clientId!==context.clientId||p.userId!==context.userId));
 async function releasePending(context){
  for(const pending of pendingLeaves().filter(p=>p.room===context.room&&p.userId===context.userId)){
   try{await api('leave',{},pending);forget(pending);}catch(error){if(error.status===403)forget(pending);else throw error;}
  }
 }
 async function api(action,body={},context=activeContext,unloading=false){
  let authorization=lastAuthorization;
  if(!unloading){const{data:{session}}=await window.supabaseClient.auth.getSession();if(!session)throw new Error('Entre na sua conta para usar a voz.');if(context?.userId&&session.user?.id&&context.userId!==session.user.id)throw new Error('A conta mudou. Entre novamente na voz.');if(context&&session.user?.id)context.userId=session.user.id;authorization='Bearer '+session.access_token;lastAuthorization=authorization;}
  if(!authorization)throw new Error('Entre na sua conta para usar a voz.');
  let response;try{response=await fetch(`${endpoint}/rooms/${context.room}/${action}`,{method:'POST',headers:{Authorization:authorization,'Content-Type':'application/json'},body:JSON.stringify({client_id:context.clientId,...body}),keepalive:unloading,signal:unloading?undefined:AbortSignal.timeout(15000)});}catch(error){if(['AbortError','TimeoutError'].includes(error.name))throw new Error('O serviço de voz demorou para responder. Tente novamente.');if(error.name==='TypeError')throw new Error('A conexão de rede foi interrompida. Tente entrar na voz novamente.');throw error;}
  if(response.status===404||response.status===503)throw new Error('A chamada de voz aguarda configuração neste ambiente.');
  let result;try{result=await response.json();}catch{throw new Error('A chamada de voz aguarda configuração neste ambiente.');}
  if(!response.ok)throw Object.assign(new Error(result.error||'Não foi possível conectar a voz.'),{status:response.status});if(context===activeContext)updateQuota(result.quota);return result;
 }
 async function gather(connection){
  if(connection.iceGatheringState==='complete')return;
  await new Promise((resolve,reject)=>{
   let settled=false,relayWait;
   const candidates=()=>/^a=candidate:/m.test(connection.localDescription?.sdp||'');
   const finish=error=>{if(settled)return;settled=true;clearTimeout(timeout);clearTimeout(relayWait);connection.removeEventListener('icegatheringstatechange',changed);connection.removeEventListener('icecandidate',changed);connection.removeEventListener('connectionstatechange',changed);error?reject(error):resolve();};
   const changed=()=>{
    if(connection.connectionState==='closed')return finish(new Error('A tentativa de áudio foi encerrada.'));
    if(connection.iceGatheringState==='complete')return finish();
    // An unreachable alternative TURN port must not discard candidates already in the SDP.
    if(!relayWait&&/^a=candidate:.*\btyp relay\b/m.test(connection.localDescription?.sdp||''))relayWait=setTimeout(()=>finish(),800);
   };
   const timeout=setTimeout(()=>finish(candidates()?undefined:new Error('Não foi encontrada uma rota de áudio. Tente outra rede.')),10000);
   connection.addEventListener('icegatheringstatechange',changed);connection.addEventListener('icecandidate',changed);connection.addEventListener('connectionstatechange',changed);changed();
  });
 }
 async function negotiate(result){
  if(!result.sessionDescription)return;await pc.setRemoteDescription(result.sessionDescription);
  if(result.sessionDescription.type==='offer'){await pc.setLocalDescription(await pc.createAnswer());await gather(pc);await api('answer',{sessionDescription:pc.localDescription});}
 }
 async function connected(connection){
  const ready=()=>transportReady(connection);
  if(ready())return;
  await new Promise((resolve,reject)=>{
   const finish=error=>{clearTimeout(timeout);connection.removeEventListener('connectionstatechange',changed);connection.removeEventListener('iceconnectionstatechange',changed);error?reject(error):resolve();};
   const changed=()=>{if(ready())finish();else if(['failed','closed'].includes(connection.connectionState)||connection.iceConnectionState==='failed')finish(new Error('Não foi possível estabelecer o áudio nesta rede.'));};
   const timeout=setTimeout(()=>finish(new Error('Não foi possível estabelecer o áudio nesta rede.')),15000);
   connection.addEventListener('connectionstatechange',changed);connection.addEventListener('iceconnectionstatechange',changed);changed();
  });
 }
 const transportReady=connection=>connection&&(connection.connectionState==='connected'||['connected','completed'].includes(connection.iceConnectionState));
 async function sync(){
  if(!pc||!room||!transportReady(pc))return;const g=generation;
  const run=async()=>{
   if(g!==generation||!pc||!transportReady(pc))return;const {peers}=await api('heartbeat');if(g!==generation)return;
   if(iceExpiresAt&&iceExpiresAt-Date.now()<120000){const config=await api('ice');if(g!==generation)return;pc.setConfiguration({...pc.getConfiguration(),iceServers:config.iceServers});iceExpiresAt=config.expiresAt||0;}
   voiceUsers=(peers||[]).map(p=>p.user_id);notify();const fresh=(peers||[]).filter(p=>!subscribed.has(p.sessionId));if(!fresh.length)return;
   const result=await api('subscribe',{users:fresh.map(p=>p.user_id)});if(g!==generation)return;await negotiate(result);
   for(const track of result.tracks||[]){if(track.errorCode)continue;const peer=fresh.find(p=>p.sessionId===track.sessionId||p.trackName===track.trackName);if(peer&&track.mid!=null)remoteUsers.set(String(track.mid),peer.user_id);}
   for(const [mid,entry]of remoteTracks){entry.userId=remoteUsers.get(mid)||entry.userId;}
   for(const p of fresh)if((result.tracks||[]).some(t=>(t.sessionId===p.sessionId||t.trackName===p.trackName)&&!t.errorCode))subscribed.add(p.sessionId);
   voiceUsers=(peers||[]).map(p=>p.user_id);notify();
  };
  const task=queue.then(run);queue=task.catch(()=>{});return task;
 }
 async function join(id,channel){
  if(pc||joining)return;if(!navigator.mediaDevices?.getUserMedia||!window.RTCPeerConnection)throw new Error('Seu navegador não oferece chamada de voz.');
  joining=true;room=id;clientId=crypto.randomUUID();broadcast=channel;const g=++generation,context={room,clientId};activeContext=context;
  try{
   status('Conectando o microfone…');
   const capture=await navigator.mediaDevices.getUserMedia({audio:{echoCancellation:true,noiseSuppression:true,autoGainControl:true,channelCount:{ideal:1},sampleRate:{ideal:48000}},video:false});
   if(g!==generation){capture.getTracks().forEach(t=>t.stop());return;}
   stream=capture;muted=true;stream.getAudioTracks().forEach(track=>{track.enabled=false;});
   const{data:{session}}=await window.supabaseClient.auth.getSession();if(!session)throw new Error('Entre na sua conta para usar a voz.');context.userId=session.user?.id;
   await releasePending(context);if(g!==generation)return;
   const config=await api('ice',{},context);if(g!==generation)return;iceExpiresAt=config.expiresAt||0;
   pc=new RTCPeerConnection({iceServers:config.iceServers,bundlePolicy:'max-bundle'});const connection=pc;
   connection.addEventListener('track',event=>{if(g!==generation)return;if(event.track.kind!=='audio'){event.track.stop();return;}const mid=String(event.transceiver.mid||''),audio=document.createElement('audio');audio.autoplay=true;audio.muted=listeningMuted;audio.srcObject=new MediaStream([event.track]);audio.dataset.voiceMid=mid;$('social-voice-audio').append(audio);remoteTracks.set(mid,{audio,track:event.track,userId:remoteUsers.get(mid)});audio.play().catch(()=>{audio.controls=true;if($('social-voice-play'))$('social-voice-play').hidden=false;status('Toque em ouvir a turma para liberar o áudio.');});event.track.addEventListener('ended',()=>{audio.remove();remoteTracks.delete(mid);});});
   connection.addEventListener('connectionstatechange',()=>{if(g!==generation)return;if(connection.connectionState==='connected')status('Voz conectada.');else if(['failed','disconnected'].includes(connection.connectionState)){status('A voz perdeu conexão. Entre novamente para reconectar.');leave();}});
   const transceiver=connection.addTransceiver(stream.getAudioTracks()[0],{direction:'sendonly'});
   uplink=transceiver.sender;const codecs=window.RTCRtpSender?.getCapabilities?.('audio')?.codecs;if(codecs&&transceiver.setCodecPreferences){const opus=codecs.filter(c=>c.mimeType?.toLowerCase()==='audio/opus');if(opus.length)transceiver.setCodecPreferences([...opus,...codecs.filter(c=>c.mimeType?.toLowerCase()!=='audio/opus')]);}
   await connection.setLocalDescription(await connection.createOffer());await gather(connection);
   if(g!==generation)return;await api('join',{},context);
   if(g!==generation){remember(context);try{await api('leave',{},context);forget(context);}catch{}return;}
   const published=await api('publish',{sessionDescription:connection.localDescription,mid:transceiver.mid},context);if(g!==generation)return;await negotiate(published);
   await connected(connection);if(g!==generation)return;
   $('social-voice-join').hidden=true;$('social-voice-leave').hidden=false;$('social-voice-mute').hidden=false;await mute(true);
   if(uplink?.getParameters&&uplink.setParameters){try{const parameters=uplink.getParameters();if(parameters.encodings?.length){parameters.encodings[0].maxBitrate=64000;if('dtx' in parameters.encodings[0])parameters.encodings[0].dtx='enabled';await uplink.setParameters(parameters);}}catch{}}
   await sync();if(g!==generation)return;heartbeat=setInterval(()=>sync().catch(async error=>{if(g===generation){status(error.message);await leave();}}),45000);
   statsTimer=setInterval(()=>measure(connection,g),1000);quotaTimer=setInterval(()=>{if(g!==generation)return;const remaining=state().remainingSeconds;if($('social-voice-remaining'))$('social-voice-remaining').textContent=remaining===null?'':`${Math.floor(remaining/60)} min de voz disponíveis hoje`;if(quotaExpires&&Date.now()>=quotaExpires){status('A autorização da chamada expirou. Entre novamente na voz.');leave();}},1000);
   for(const id of ['social-voice-listen','social-voice-options'])if($(id))$(id).hidden=false;await devices();notify();
   // Presence notification failure must not close an established media connection.
   await broadcast?.send({type:'broadcast',event:'voice-changed',payload:{}}).catch(()=>{});
  }catch(error){if(g!==generation)return;status(error.name==='NotAllowedError'?'Permita o microfone para entrar na voz.':error.message);await leave();throw error;}
  finally{if(g===generation)joining=false;}
 }
 async function mute(value){const desired=!!value,g=generation,previous=muted;stream?.getAudioTracks().forEach(t=>{t.enabled=!desired;});try{await uplink?.replaceTrack?.(desired?null:stream?.getAudioTracks()[0]);}catch(error){stream?.getAudioTracks().forEach(t=>{t.enabled=!previous;});throw error;}if(g!==generation)return;muted=desired;if($('social-voice-mute'))$('social-voice-mute').textContent=muted?'Ativar microfone':'Silenciar microfone';notify();}
 async function playIncoming(){let blocked=false;await Promise.all([...remoteTracks.values()].map(entry=>entry.audio.play().catch(()=>{blocked=true;entry.audio.controls=true;})));if($('social-voice-play'))$('social-voice-play').hidden=!blocked;if(blocked)status('Use o controle de reprodução para ouvir a turma.');}
 function listen(value){listeningMuted=!!value;for(const entry of remoteTracks.values())entry.audio.muted=listeningMuted;if($('social-voice-listen'))$('social-voice-listen').textContent=listeningMuted?'Ouvir áudio':'Silenciar áudio';notify();if(!listeningMuted)return playIncoming();}
 async function devices(){const select=$('social-voice-device');if(!select||!navigator.mediaDevices.enumerateDevices)return;try{const inputs=(await navigator.mediaDevices.enumerateDevices()).filter(d=>d.kind==='audioinput');select.replaceChildren();for(const [i,device]of inputs.entries()){const option=document.createElement('option');option.value=device.deviceId;option.textContent=device.label||`Microfone ${i+1}`;select.append(option);}select.disabled=inputs.length<2;}catch{select.disabled=true;}}
 async function changeDevice(id){if(!pc||!id)return;const g=generation,capture=await navigator.mediaDevices.getUserMedia({audio:{deviceId:{exact:id},echoCancellation:true,noiseSuppression:true,autoGainControl:true,channelCount:{ideal:1},sampleRate:{ideal:48000}},video:false});if(g!==generation){capture.getTracks().forEach(t=>t.stop());return;}const old=stream;capture.getAudioTracks().forEach(t=>{t.enabled=!muted;});try{await uplink?.replaceTrack?.(muted?null:capture.getAudioTracks()[0]);if(g!==generation){capture.getTracks().forEach(t=>t.stop());return;}stream=capture;old?.getTracks().forEach(t=>t.stop());}catch(error){capture.getTracks().forEach(t=>t.stop());throw error;}}
 async function measure(connection,g){if(g!==generation||document.hidden||!connection.getStats)return;try{const reports=await connection.getStats();if(g!==generation)return;const active=new Set();reports.forEach(report=>{if(report.type==='media-source'&&report.kind==='audio'&&!muted&&Number(report.audioLevel)>.025&&activeContext?.userId)active.add(activeContext.userId);if(report.type==='inbound-rtp'&&(report.kind==='audio'||report.mediaType==='audio')&&Number(report.audioLevel)>.025){const entry=remoteTracks.get(String(report.mid))||[...remoteTracks.values()].find(e=>e.track.id===report.trackIdentifier);if(entry?.userId)active.add(entry.userId);}});speaking=[...active].sort();notify();}catch{}}
 async function leave({unloading=false}={}){
  const oldContext=activeContext,oldBroadcast=broadcast;room=null;clientId=null;broadcast=null;activeContext=null;
  generation++;joining=false;iceExpiresAt=0;clearInterval(heartbeat);clearInterval(statsTimer);clearInterval(quotaTimer);heartbeat=null;statsTimer=null;quotaTimer=null;voiceQuota=null;quotaExpires=0;uplink=null;speaking=[];voiceUsers=[];remoteUsers.clear();remoteTracks.clear();stream?.getTracks().forEach(t=>t.stop());stream=null;pc?.close();pc=null;subscribed.clear();queue=Promise.resolve();$('social-voice-audio')?.replaceChildren();
  for(const id of ['social-voice-listen','social-voice-options','social-voice-play'])if($(id))$(id).hidden=true;if($('social-voice-remaining'))$('social-voice-remaining').textContent='';notify();
  if($('social-voice-join'))$('social-voice-join').hidden=false;if($('social-voice-leave'))$('social-voice-leave').hidden=true;if($('social-voice-mute'))$('social-voice-mute').hidden=true;
  if(oldContext?.room&&oldContext.clientId){remember(oldContext);try{await api('leave',{},oldContext,unloading);forget(oldContext);}catch{}}
  await oldBroadcast?.send({type:'broadcast',event:'voice-changed',payload:{}}).catch(()=>{});
 }
 window.LuriaVoice={join,leave,sync,mute,toggleMute:()=>mute(!muted),toggleListening:()=>listen(!listeningMuted),playIncoming,changeDevice,setPushToTalk:async value=>{pushToTalk=!!value;await mute(true);notify();},pushToTalk:async pressed=>{if(pushToTalk&&pc)await mute(!pressed);},getState:state};
 window.addEventListener('pagehide',()=>{leave({unloading:true}).catch(()=>{});});
})();
