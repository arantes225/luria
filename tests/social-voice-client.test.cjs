const test=require('node:test'),assert=require('node:assert/strict');
const {page,read}=require('./fixtures/frontend.cjs');
const {A,B}=require('./fixtures/social-db.cjs');
const tick=()=>new Promise(r=>setTimeout(r,10));
test('failed leave survives reload, retries only the owning account and releases the old connection before rejoining',async t=>{
 const calls=[],leases=new Map();let user=A,offline=false;
 const setup=w=>{
  Object.defineProperty(w.navigator,'mediaDevices',{value:{getUserMedia:async()=>{const track={kind:'audio',enabled:true,stop(){}};return{getTracks:()=>[track],getAudioTracks:()=>[track]};}}});
  w.RTCPeerConnection=class{constructor(){this.connectionState='connected';this.iceGatheringState='complete';}addEventListener(){}addTransceiver(){return{mid:'0'};}async createOffer(){return{type:'offer',sdp:'m=audio'};}async setLocalDescription(value){this.localDescription=value;}async setRemoteDescription(){}close(){}};
  w.AbortSignal.timeout=()=>undefined;w.supabaseClient={auth:{getSession:async()=>({data:{session:{access_token:'private-jwt',user:{id:user}}}})}};
  w.fetch=async(url,options)=>{
   const body=JSON.parse(options.body),action=url.split('/').pop();calls.push({user,action,client:body.client_id});
   if(offline)throw new w.TypeError('Load failed');let status=200,result={};
   if(action==='ice')result={iceServers:[{urls:'stun:stun.cloudflare.com:3478'}]};
   if(action==='join'){if(leases.has(user))status=409;else leases.set(user,body.client_id);result={sessionId:'fixture',error:'Outra aba'};}
   if(action==='leave'){if(leases.has(user)&&leases.get(user)!==body.client_id)status=403;else leases.delete(user);result={left:true};}
   if(action==='publish')result={sessionDescription:{type:'answer',sdp:'m=audio'}};if(action==='heartbeat')result={peers:[]};
   return{ok:status===200,status,json:async()=>result};
  };w.eval(read('assets/js/social-voice.js'));
 };
 const first=page(t,'amigos/index.html').w;setup(first);await first.TraubeVoice.join(A,{send:async()=>{}});const oldClient=leases.get(A);assert.equal(first.sessionStorage.getItem('traube:voice:pending-leaves'),null);
 offline=true;await first.TraubeVoice.leave();const saved=first.sessionStorage.getItem('traube:voice:pending-leaves');assert(saved.includes(oldClient));assert.doesNotMatch(saved,/private-jwt|Bearer|credential/);assert.equal(first.TraubeVoice.getState().active,false);
 const next=page(t,'amigos/index.html').w;setup(next);next.sessionStorage.setItem('traube:voice:pending-leaves',saved);offline=false;user=B;
 await next.TraubeVoice.join(A,{send:async()=>{}});assert.equal(leases.get(A),oldClient);assert(!calls.some(c=>c.user===B&&c.action==='leave'&&c.client===oldClient));await next.TraubeVoice.leave();
 user=A;await next.TraubeVoice.join(A,{send:async()=>{}});assert.notEqual(leases.get(A),oldClient);const cleanup=calls.findLastIndex(c=>c.user===A&&c.action==='leave'&&c.client===oldClient);const newJoin=calls.findLastIndex(c=>c.user===A&&c.action==='join');assert(cleanup<newJoin);assert.equal(next.sessionStorage.getItem('traube:voice:pending-leaves'),null);await next.TraubeVoice.leave();
 offline=true;await assert.rejects(next.TraubeVoice.join(A,{send:async()=>{}}),/conexão de rede foi interrompida/);assert.equal(next.TraubeVoice.getState().active,false);
});
test('voice client captures audio only, stops both normal and late captures and never clears a newer call',async t=>{
 const {w}=page(t,'amigos/index.html');const calls=[],captureRequests=[];
 const track=()=>({kind:'audio',enabled:true,stopped:false,stop(){this.stopped=true;}});
 const first=track(),second=track();const replacements=[],parameters=[];const sender={replaceTrack:async value=>replacements.push(value),getParameters:()=>({encodings:[{dtx:'disabled'}]}),setParameters:async value=>parameters.push(value)};const media=t=>({getTracks:()=>[t],getAudioTracks:()=>[t]});
 Object.defineProperty(w.navigator,'mediaDevices',{value:{getUserMedia:options=>{assert.equal(options.video,false);assert.equal(options.audio.echoCancellation,true);return new Promise(resolve=>captureRequests.push(resolve));}}});
 w.RTCPeerConnection=class {
  constructor(config){assert.equal(config.iceServers[0].urls,'turns:turn.cloudflare.com:443?transport=tcp');this.iceGatheringState='complete';this.connectionState='connected';this.localDescription=null;}
  addEventListener(){}addTransceiver(){return{mid:'0',sender};}async createOffer(){return{type:'offer',sdp:'m=audio 9 UDP/TLS/RTP/SAVPF 111\r\n'};}
  async setLocalDescription(description){this.localDescription=description;}async setRemoteDescription(){}close(){}
 };
 w.AbortSignal.timeout=()=>undefined;
 w.supabaseClient={auth:{getSession:async()=>({data:{session:{access_token:'test'}}})}};
 w.fetch=async(url,options)=>{calls.push({url,body:JSON.parse(options.body),keepalive:options.keepalive});return{ok:true,status:200,json:async()=>url.endsWith('/ice')?{iceServers:[{urls:'turns:turn.cloudflare.com:443?transport=tcp',username:'temporary',credential:'temporary-password'}]}:url.endsWith('/heartbeat')?{peers:[]}:url.endsWith('/publish')?{sessionDescription:{type:'answer',sdp:'m=audio'}}:{sessionId:'fake'}};};
 w.eval(read('assets/js/social-voice.js'));const channel={send:async()=>{}};
 const old=w.TraubeVoice.join(A,channel);await tick();assert.equal(captureRequests.length,1);await w.TraubeVoice.leave();
 const current=w.TraubeVoice.join(B,channel);await tick();captureRequests[1](media(second));await current;assert.equal(w.TraubeVoice.getState().active,true);
 captureRequests[0](media(first));await old;assert.equal(first.stopped,true);assert.equal(second.stopped,false);
 assert.equal(second.enabled,false);assert.equal(replacements.at(-1),null);assert.equal(parameters.at(-1).encodings[0].maxBitrate,64000);assert.equal(parameters.at(-1).encodings[0].dtx,'enabled');
 await w.TraubeVoice.mute(false);assert.equal(second.enabled,true);assert.equal(replacements.at(-1),second);await w.TraubeVoice.setPushToTalk(true);assert.equal(second.enabled,false);await w.TraubeVoice.pushToTalk(true);assert.equal(second.enabled,true);await w.TraubeVoice.pushToTalk(false);assert.equal(replacements.at(-1),null);
 w.TraubeVoice.mute(true);assert.equal(second.enabled,false);
 w.supabaseClient.auth.getSession=()=>{throw new Error('Unload must not wait for auth');};w.dispatchEvent(new w.Event('pagehide'));
 assert.equal(second.stopped,true);assert.equal(w.TraubeVoice.getState().active,false);assert(calls.some(c=>c.url.endsWith('/leave')&&c.url.includes('/'+B+'/')&&c.keepalive===true));await tick();
 assert(calls.filter(c=>c.url.endsWith('/leave')).some(c=>c.url.includes('/'+A+'/')));assert(calls.filter(c=>c.url.endsWith('/leave')).some(c=>c.url.includes('/'+B+'/')));
});

test('ICE gathering keeps available routes when another TURN port stalls and cancels closed attempts',async t=>{
 for(const mode of ['partial','relay','empty','closed'])await t.test(mode,async t=>{
  const {w}=page(t,'amigos/index.html');const calls=[],timers=new Map();let connection,timerId=100000,stopped=false;
  const nativeTimeout=w.setTimeout.bind(w),nativeClear=w.clearTimeout.bind(w);
  w.setTimeout=(fn,delay)=>{if([10000,800].includes(delay)){const id=++timerId;timers.set(id,{fn,delay});return id;}return nativeTimeout(fn,delay);};w.clearTimeout=id=>timers.delete(id)||nativeClear(id);
  const track={kind:'audio',enabled:true,stop(){stopped=true;}};Object.defineProperty(w.navigator,'mediaDevices',{value:{getUserMedia:async()=>({getTracks:()=>[track],getAudioTracks:()=>[track]})}});
  const candidate=mode==='empty'?'':`a=candidate:fixture 1 udp 1 192.0.2.1 12345 typ ${mode==='relay'?'relay':'host'}\r\n`;
  w.RTCPeerConnection=class {
   constructor(){connection=this;this.connectionState='connected';this.iceGatheringState='gathering';this.handlers=new Map();}
   addEventListener(type,fn){if(!this.handlers.has(type))this.handlers.set(type,new Set());this.handlers.get(type).add(fn);}removeEventListener(type,fn){this.handlers.get(type)?.delete(fn);}
   addTransceiver(){return{mid:'0'};}async createOffer(){return{type:'offer',sdp:'m=audio\r\n'+candidate};}async setLocalDescription(value){this.localDescription=value;}async setRemoteDescription(){}
   close(){this.connectionState='closed';for(const fn of [...(this.handlers.get('connectionstatechange')||[])])fn();}
  };
  w.AbortSignal.timeout=()=>undefined;w.supabaseClient={auth:{getSession:async()=>({data:{session:{access_token:'test'}}})}};
  w.fetch=async(url,options)=>{calls.push({url,body:JSON.parse(options.body)});return{ok:true,status:200,json:async()=>url.endsWith('/ice')?{iceServers:[{urls:'turns:turn.cloudflare.com:443?transport=tcp'}]}:url.endsWith('/heartbeat')?{peers:[]}:url.endsWith('/publish')?{sessionDescription:{type:'answer',sdp:'m=audio'}}:{sessionId:'fixture'}};};
  w.eval(read('assets/js/social-voice.js'));const joining=w.TraubeVoice.join(A,{send:async()=>{}});const outcome=joining.then(()=>null,error=>error);await tick();assert(!calls.some(c=>c.url.endsWith('/join')));
  if(mode==='closed')await w.TraubeVoice.leave();else [...timers.values()].find(timer=>timer.delay===(mode==='relay'?800:10000)).fn();
  const error=await outcome;
  if(['partial','relay'].includes(mode)){assert.equal(error,null);assert(calls.some(c=>c.url.endsWith('/publish')&&c.body.sessionDescription.sdp.includes(candidate)));await w.TraubeVoice.leave();}
  else{assert(!calls.some(c=>c.url.endsWith('/join')));assert(stopped);if(mode==='empty')assert.match(error.message,/Não foi encontrada uma rota/);else assert.equal(error,null);}
  assert.equal(connection.handlers.get('icecandidate').size,0);assert.equal(connection.handlers.get('icegatheringstatechange').size,0);assert.equal(timers.size,0);
 });
});

test('voice prepares the offer before allocating SFU and waits for transport before subscriptions',async t=>{
 const {w}=page(t,'amigos/index.html');const calls=[];let connection,iceRequests=0;
 const track={kind:'audio',enabled:true,stop(){}};Object.defineProperty(w.navigator,'mediaDevices',{value:{getUserMedia:async()=>({getTracks:()=>[track],getAudioTracks:()=>[track]})}});
 w.RTCPeerConnection=class {
  constructor(config){connection=this;this.config=config;this.connectionState='connecting';this.iceGatheringState='complete';this.handlers=new Map();}
  getConfiguration(){return this.config;}setConfiguration(config){this.config=config;this.refreshed=true;}
  addEventListener(type,fn){if(!this.handlers.has(type))this.handlers.set(type,new Set());this.handlers.get(type).add(fn);}removeEventListener(type,fn){this.handlers.get(type)?.delete(fn);}
  addTransceiver(){return{mid:'0'};}async createOffer(){return{type:'offer',sdp:'m=audio'};}async setLocalDescription(value){this.localDescription=value;}async setRemoteDescription(){}close(){this.connectionState='closed';}
 };
 w.AbortSignal.timeout=()=>undefined;w.supabaseClient={auth:{getSession:async()=>({data:{session:{access_token:'test'}}})}};
 w.fetch=async(url)=>{calls.push(url);if(url.endsWith('/join'))assert(connection.localDescription);return{ok:true,status:200,json:async()=>url.endsWith('/ice')?{iceServers:[{urls:'turns:turn.cloudflare.com:443?transport=tcp',credential:'temporary-'+(++iceRequests)}],expiresAt:Date.now()+(iceRequests===1?1:600000)}:url.endsWith('/heartbeat')?{peers:[]}:url.endsWith('/publish')?{sessionDescription:{type:'answer',sdp:'m=audio'}}:{sessionId:'fixture'}};};
 w.eval(read('assets/js/social-voice.js'));const joining=w.TraubeVoice.join(A,{send:async()=>{throw new w.TypeError('Load failed');}});await tick();assert(calls.some(url=>url.endsWith('/publish')));await w.TraubeVoice.sync();assert(!calls.some(url=>url.endsWith('/heartbeat')));
 connection.connectionState='connected';for(const fn of [...connection.handlers.get('connectionstatechange')])fn();await joining;assert(calls.some(url=>url.endsWith('/heartbeat')));assert.equal(iceRequests,2);assert.equal(connection.refreshed,true);assert.equal(connection.config.iceServers[0].credential,'temporary-2');await w.TraubeVoice.leave();
});
