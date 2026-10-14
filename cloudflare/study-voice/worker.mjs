/* Voice signaling only. Cloudflare SFU transports audio, Supabase authorizes each operation. */
const UUID=/^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
const json=(value,status=200)=>new Response(JSON.stringify(value),{status,headers:{'content-type':'application/json','cache-control':'no-store'}});
function audioDescription(value,type){
 if(!value||value.type!==type||typeof value.sdp!=='string'||value.sdp.length>48000)throw new Error('SDP inválido');
 const media=value.sdp.split(/\r?\n/).filter(line=>line.startsWith('m='));
 if(media.length<1||media.length>8||media.some(line=>!line.startsWith('m=audio ')))throw new Error('Somente áudio é permitido');
 return {type,sdp:value.sdp};
}
export default {
 async fetch(request,env){
  const origin=request.headers.get('Origin'),allowed=(env.ALLOWED_ORIGINS||'').split(',').map(v=>v.trim()).filter(Boolean);
  const cors={'Access-Control-Allow-Origin':origin||'',Vary:'Origin','Access-Control-Allow-Headers':'Authorization, Content-Type','Access-Control-Allow-Methods':'POST, OPTIONS','Access-Control-Max-Age':'600'};
  const finish=res=>{const headers=new Headers(res.headers);for(const[k,v]of Object.entries(cors))headers.set(k,v);return new Response(res.body,{status:res.status,headers});};
  if(!origin||!allowed.includes(origin))return json({error:'Origem não autorizada'},403);
  if(request.method==='OPTIONS')return finish(new Response(null,{status:204}));
  if(request.method!=='POST')return finish(json({error:'Método inválido'},405));
  const match=new URL(request.url).pathname.match(/^\/(?:api\/study-voice\/)?rooms\/([^/]+)\/(ice|join|publish|subscribe|answer|heartbeat|leave)$/);
  if(!match||!UUID.test(match[1]))return finish(json({error:'Rota inválida'},404));
  if(env.VOICE_ENABLED!==undefined&&env.VOICE_ENABLED!=='true'&&match[2]!=='leave')return finish(json({error:'Chamadas de voz pausadas pelo administrador.'},403));
  if(!env.SFU_APP_ID||!env.SFU_APP_SECRET||!env.SUPABASE_URL||!env.SUPABASE_PUBLISHABLE_KEY||!env.VOICE_ACCOUNTING_KEY)return finish(json({error:'Voz ainda não configurada'},503));
  const auth=request.headers.get('Authorization');if(!auth?.startsWith('Bearer ')||auth.length>8192)return finish(json({error:'Autenticação obrigatória'},401));
  if(Number(request.headers.get('Content-Length')||0)>60000)return finish(json({error:'Requisição muito grande'},413));
  try{
   const raw=await request.text();if(raw.length>60000)return finish(json({error:'Requisição muito grande'},413));const body=JSON.parse(raw||'{}');
   if(!UUID.test(body.client_id||''))return finish(json({error:'Conexão inválida'},400));
   const headers={apikey:env.SUPABASE_PUBLISHABLE_KEY,Authorization:auth,'Content-Type':'application/json'};
   const userResponse=await fetch(env.SUPABASE_URL+'/auth/v1/user',{headers,signal:AbortSignal.timeout(8000)});
   if(!userResponse.ok){const failure=await userResponse.json().catch(()=>({}));console.warn('voice_auth_rejected',{status:userResponse.status,code:String(failure.error_code||failure.code||'unknown').slice(0,80)});return finish(json({error:'Sessão inválida'},401));}const user=await userResponse.json();if(!UUID.test(user.id||''))return finish(json({error:'Sessão inválida'},401));
   const authorization=await fetch(env.SUPABASE_URL+'/rest/v1/rpc/social_voice_authorize',{method:'POST',headers,body:JSON.stringify({p_room_id:match[1]}),signal:AbortSignal.timeout(8000)});
   if(!authorization.ok)return finish(json({error:'Participação na sala obrigatória'},403));const access=await authorization.json();
   if(!access.enabled&&match[2]!=='leave')return finish(json({error:'Voz desabilitada'},403));
   const id=env.ROOM_VOICE.idFromName(match[1]),object=env.ROOM_VOICE.get(id),action=match[2];
   const account=async(operation,error)=>{
    const response=await fetch(env.SUPABASE_URL+'/rest/v1/rpc/social_voice_account',{method:'POST',headers,body:JSON.stringify({p_action:operation,p_room_id:match[1],p_client_id:body.client_id,p_key:env.VOICE_ACCOUNTING_KEY,p_error:error||null}),signal:AbortSignal.timeout(8000)});
    if(!response.ok)throw new Error('Contabilização de voz indisponível');return response.json();
   };
   const forward=quota=>object.fetch('https://voice.internal/'+action,{method:'POST',body:JSON.stringify({uid:user.id,room_id:match[1],allowed:access.members||[],capacity:Math.min(access.capacity,quota?.max_capacity||8),quota_expires_at:quota?.expires_at,body})});
   const close=()=>object.fetch('https://voice.internal/leave',{method:'POST',body:JSON.stringify({uid:user.id,allowed:access.members||[],body})});
   const publicQuota=quota=>({remaining_seconds:quota.remaining_seconds,daily_seconds:quota.daily_seconds,expires_at:quota.expires_at,server_now:quota.server_now});
   let quota,response;
   if(action==='leave'){
    response=await forward();if(response.status!==403)await account('release');return finish(response);
   }
   if(action==='heartbeat'){
    response=await forward();if(!response.ok)return finish(response);
    quota=await account('renew');
    // Adopt only an already authenticated DO connection when activating accounting.
    if(quota.unknown_connection){quota=await account('reserve');if(quota.allowed)quota=await account('renew');}
    if(!quota.allowed){await close();return finish(json({error:quota.error},403));}
    // Apply the server quota cutoff to the DO lease as well as the client.
    response=await forward(quota);
   }else{
    quota=await account(action==='ice'?'status':action==='join'?'reserve':'check');
    if(!quota.allowed){if(action!=='ice'&&action!=='join')await close();return finish(json({error:quota.error},403));}
    response=await forward(quota);
   }
   if(!response.ok&&action==='join')await account('release');
   else if(!response.ok&&action!=='ice')await account('failure','signaling_'+action);
   if(!response.ok)return finish(response);
   return finish(json({...await response.json(),quota:publicQuota(quota)}));
  }catch{return finish(json({error:'Não foi possível conectar a voz. Tente novamente.'},502));}
 }
};

export class RoomVoice {
 constructor(ctx,env){this.ctx=ctx;this.env=env;this.peers={};this.cleanup={};this.limits={};this.queue=Promise.resolve();ctx.blockConcurrencyWhile(async()=>{this.peers=await ctx.storage.get('peers')||{};this.cleanup=await ctx.storage.get('cleanup')||{};this.limits=await ctx.storage.get('limits')||{};});}
 fetch(request){const run=this.queue.then(()=>this.handle(request));this.queue=run.catch(()=>{});return run;}
 async save(){await this.ctx.storage.put('peers',this.peers);await this.ctx.storage.put('cleanup',this.cleanup);const entries=[...Object.values(this.peers),...Object.values(this.cleanup)];if(entries.length)await this.ctx.storage.setAlarm(Math.min(...entries.map(p=>p.expires)));else await this.ctx.storage.deleteAlarm();}
 async sfu(path,method='POST',body){
  const operation=path.endsWith('/tracks/close')?'close':path.endsWith('/tracks/new')?'tracks':path.endsWith('/new')?'new':method==='GET'?'inspect':'renegotiate';
  let response;try{response=await fetch(`https://rtc.live.cloudflare.com/v1/apps/${encodeURIComponent(this.env.SFU_APP_ID)}/${path}`,{method,headers:{Authorization:'Bearer '+this.env.SFU_APP_SECRET,'Content-Type':'application/json'},body:body?JSON.stringify(body):undefined,signal:AbortSignal.timeout(['inspect','close'].includes(operation)?20000:10000)});}catch(error){throw Object.assign(new Error('Requisição SFU interrompida'),{name:error.name,code:'sfu_'+operation+'_'+error.name});}
  const value=await response.json().catch(()=>{throw Object.assign(new Error('Resposta SFU inválida'),{status:response.status,code:'sfu_non_json_response'});});if(!response.ok||value.errorCode)throw Object.assign(new Error('SFU indisponível'),{status:response.status,code:value.errorCode});return value;
 }
 async close(uid,retired=false){
  const records=retired?this.cleanup:this.peers,peer=records[uid];if(!peer)return;
  const forget=()=>{if(records[uid]===peer)delete records[uid];};
  peer.lastCleanupAttempt=Date.now();
  try{const session=peer.published&&peer.mids?.length&&!peer.uncertain?{tracks:peer.mids.map(mid=>({mid}))}:await this.sfu('sessions/'+encodeURIComponent(peer.sessionId),'GET');const tracks=(session.tracks||[]).filter(t=>t.mid!=null&&t.status!=='inactive').map(t=>({mid:t.mid}));if(tracks.length){const closed=await this.sfu('sessions/'+encodeURIComponent(peer.sessionId)+'/tracks/close','PUT',{tracks,force:true});if(tracks.some(track=>!closed.tracks?.some(result=>String(result.mid)===String(track.mid)&&(!result.errorCode||result.errorCode==='close_track_error')))){console.warn('voice_close_result',{requested:tracks.length,returned:closed.tracks?.length||0,codes:(closed.tracks||[]).map(t=>String(t.errorCode||'ok').slice(0,80)),missingMid:(closed.tracks||[]).filter(t=>t.mid==null).length});throw new Error('Fechamento incompleto');}}forget();}
  catch(error){
   if(error.status===404||(error.status===410&&error.code==='session_error')){forget();return;}
   if(!retired&&error.status===425&&error.code==='session_error'){
    peer.closing=true;peer.expires=Date.now()+300000;this.cleanup[peer.sessionId]=peer;forget();console.warn('voice_cleanup_unconnected',{status:425});return;
   }
   if(error.code?.startsWith('sfu_close_')||error.message==='Fechamento incompleto'){
    try{const checked=await this.sfu('sessions/'+encodeURIComponent(peer.sessionId),'GET');if(Array.isArray(checked.tracks)&&checked.tracks.every(track=>track.status==='inactive')){forget();return;}}
    catch(checkError){if(checkError.status===404||(checkError.status===410&&checkError.code==='session_error')){forget();return;}}
   }
   console.warn('voice_cleanup_pending',{status:error.status||0,code:typeof error.code==='string'?error.code.slice(0,80):'cleanup_incomplete',kind:error.name,published:!!peer.published,uncertain:!!peer.uncertain,mids:peer.mids?.length||0});peer.closing=true;peer.closeFailures=(peer.closeFailures||0)+1;peer.expires=Date.now()+Math.min(300000,15000*2**Math.min(5,peer.closeFailures));
  }
 }
 async alarm(){
  if(this.env.SUPABASE_URL&&this.env.VOICE_ACCOUNTING_KEY){try{const response=await fetch(this.env.SUPABASE_URL+'/rest/v1/rpc/social_voice_expire',{method:'POST',headers:{apikey:this.env.SUPABASE_PUBLISHABLE_KEY,'Content-Type':'application/json'},body:JSON.stringify({p_key:this.env.VOICE_ACCOUNTING_KEY}),signal:AbortSignal.timeout(8000)});if(!response.ok)console.warn('voice_usage_cleanup_pending');}catch{console.warn('voice_usage_cleanup_pending');}}
  for(const[uid,peer]of Object.entries(this.peers))if(peer.expires<=Date.now())await this.close(uid);for(const[id,peer]of Object.entries(this.cleanup))if(peer.expires<=Date.now())await this.close(id,true);await this.save();
 }
 async handle(request){
  const {uid,allowed,capacity,body,quota_expires_at}=await request.json(),action=new URL(request.url).pathname.slice(1),now=Date.now();
  const cutoff=Date.parse(quota_expires_at),leaseUntil=Math.min(now+120000,Number.isFinite(cutoff)?cutoff:now+120000);
  if(!UUID.test(uid||'')||!UUID.test(body.client_id||''))return json({error:'Identidade inválida'},400);
  for(const[id,limit]of Object.entries(this.limits))if(now-limit.start>60000)delete this.limits[id];
  const limit=this.limits[uid]||(this.limits[uid]={start:now,count:0});
  if(++limit.count>60)return json({error:'Muitas operações de voz. Aguarde um pouco.'},429);
  await this.ctx.storage.put('limits',this.limits);
  if(action==='ice'){
   if(!this.env.TURN_KEY_ID&&!this.env.TURN_KEY_API_TOKEN)return json({iceServers:[{urls:'stun:stun.cloudflare.com:3478'}]});
   if(!this.env.TURN_KEY_ID||!this.env.TURN_KEY_API_TOKEN)return json({error:'A rota alternativa de áudio aguarda configuração.'},503);
   if((limit.turnCount||0)>=4)return json({error:'Aguarde um minuto antes de tentar a voz novamente.'},429);
   limit.turnCount=(limit.turnCount||0)+1;await this.ctx.storage.put('limits',this.limits);
   try{
    const response=await fetch(`https://rtc.live.cloudflare.com/v1/turn/keys/${encodeURIComponent(this.env.TURN_KEY_ID)}/credentials/generate-ice-servers`,{method:'POST',headers:{Authorization:'Bearer '+this.env.TURN_KEY_API_TOKEN,'Content-Type':'application/json'},body:JSON.stringify({ttl:600}),signal:AbortSignal.timeout(8000)});
    if(!response.ok)throw new Error('TURN indisponível');const result=await response.json();
    const iceServers=(result.iceServers||[]).map(server=>({urls:server.urls,...(server.username?{username:server.username}:{}),...(server.credential?{credential:server.credential}:{})}));
    if(!iceServers.some(server=>[].concat(server.urls||[]).some(url=>/^turns?:/.test(url))))throw new Error('TURN inválido');
    return json({iceServers,expiresAt:Date.now()+600000});
   }catch{return json({error:'Não foi possível preparar a rota alternativa de áudio. Tente novamente.'},502);}
  }
  if(action==='leave'){
   const leaving=this.peers[uid];if(!leaving)return json({left:true});
   if(leaving.clientId!==body.client_id)return json({error:'Conexão não autorizada'},403);
   leaving.closing=true;leaving.expires=now;await this.save();return json({left:false,closing:true});
  }
  let expired=false;for(const p of Object.values(this.peers))if(p.expires<=now){p.closing=true;expired=true;}if(expired)await this.save();
  let peer=this.peers[uid];
  if(peer?.closing&&action==='join'&&now-(peer.lastCleanupAttempt||0)>=30000){peer.expires=now;await this.save();}
  if(peer?.closing){await this.save();return json({error:'A chamada anterior está sendo encerrada. Tente novamente em instantes.'},409);}
  try{
   if(action==='join'){
    if(peer&&peer.clientId!==body.client_id)return json({error:'Uma conexão anterior desta conta ainda está ativa. Encerre essa chamada ou aguarde sua expiração.'},409);
    if(!peer){if(Object.keys(this.peers).length>=Math.min(8,Number(capacity)||8))return json({error:'Chamada lotada'},409);
     const session=await this.sfu('sessions/new');if(!session.sessionId)throw new Error('Sessão SFU inválida');
     peer=this.peers[uid]={clientId:body.client_id,sessionId:session.sessionId,trackName:'mic-'+crypto.randomUUID(),published:false,mids:[],expires:leaseUntil,started:now,requests:0,window:now};
    }
    await this.save();return json({sessionId:peer.sessionId});
   }
   if(!peer||peer.clientId!==body.client_id)return json({error:'Conexão não autorizada'},403);
   if(now-peer.started>8*3600000){peer.closing=true;peer.expires=now;await this.save();return json({error:'Chamada expirada'},403);}
   if(now-peer.window>60000){peer.window=now;peer.requests=0;}if(++peer.requests>40)return json({error:'Muitas operações de voz'},429);
   const path='sessions/'+encodeURIComponent(peer.sessionId);let result;
   if(action==='heartbeat'){
    peer.expires=leaseUntil;await this.save();return json({peers:Object.entries(this.peers).filter(([id,p])=>id!==uid&&allowed.includes(id)&&p.published&&!p.closing).map(([user_id,p])=>({user_id,sessionId:p.sessionId,trackName:p.trackName}))});
   }
   if(action==='publish'){
    if(peer.published)return json({error:'Microfone já publicado'},409);
    const description=audioDescription(body.sessionDescription,'offer');if(!/^\d{1,3}$/.test(String(body.mid)))return json({error:'Faixa inválida'},400);
    peer.uncertain=true;await this.save();
    result=await this.sfu(path+'/tracks/new','POST',{sessionDescription:description,tracks:[{location:'local',mid:String(body.mid),trackName:peer.trackName}]});
    if(!result.tracks?.length||result.tracks.some(t=>t.errorCode))throw new Error('Publicação falhou');peer.published=true;peer.mids=result.tracks.map(t=>t.mid);peer.uncertain=false;
   }else if(action==='subscribe'){
    if(!Array.isArray(body.users)||body.users.length>7)return json({error:'Assinaturas inválidas'},400);
    const targets=[...new Set(body.users)].map(id=>[id,this.peers[id]]);
    if(targets.some(([id,p])=>id===uid||!allowed.includes(id)||!p?.published||p.closing))return json({error:'Participante indisponível'},403);
    if(!targets.length)return json({tracks:[]});
    peer.uncertain=true;await this.save();
    result=await this.sfu(path+'/tracks/new','POST',{tracks:targets.map(([,p])=>({location:'remote',sessionId:p.sessionId,trackName:p.trackName}))});
    peer.mids=[...new Set([...peer.mids,...(result.tracks||[]).filter(t=>!t.errorCode).map(t=>t.mid)])];
    peer.uncertain=(result.tracks||[]).length!==targets.length||(result.tracks||[]).some(t=>t.errorCode);
   }else if(action==='answer')result=await this.sfu(path+'/renegotiate','PUT',{sessionDescription:audioDescription(body.sessionDescription,'answer')});
   else return json({error:'Operação inválida'},400);
   peer.expires=leaseUntil;await this.save();return json(result);
  }catch(error){console.warn('voice_negotiation_failed',{action,status:error.status||0,code:typeof error.code==='string'?error.code.slice(0,80):'negotiation_failed',kind:error.name});const failed=this.peers[uid];if(failed){failed.closing=true;failed.expires=now;}await this.save();return json({error:'Falha na negociação de áudio. Entre novamente na voz.'},502);}
 }
}
