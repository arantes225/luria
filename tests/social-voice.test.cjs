const test=require('node:test'),assert=require('node:assert/strict');
const A='11111111-1111-4111-8111-111111111111',B='22222222-2222-4222-8222-222222222222',C='33333333-3333-4333-8333-333333333333',ROOM='aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa';
const SDP={type:'offer',sdp:'v=0\r\nm=audio 9 UDP/TLS/RTP/SAVPF 111\r\na=mid:0\r\n'};
test('voice authorization, audio-only signaling, room isolation, single connection and abandoned track cleanup',async t=>{
 const {default:worker,RoomVoice}=await import('../cloudflare/study-voice/worker.mjs');
 const original=global.fetch;t.after(()=>{global.fetch=original;});let sessions=0,closes=0,alarms=[],stored={};
 const ctx={blockConcurrencyWhile:fn=>fn(),storage:{get:async key=>stored[key],put:async(k,v)=>{stored[k]=v;},setAlarm:async when=>alarms.push(when),deleteAlarm:async()=>{}}};
 const env={ALLOWED_ORIGINS:'https://luria.test',SUPABASE_URL:'https://db.test',SUPABASE_PUBLISHABLE_KEY:'public-test-key',SFU_APP_ID:'test-app',SFU_APP_SECRET:'test-secret',VOICE_ACCOUNTING_KEY:'server-accounting-secret'};
 let active=A;
 global.fetch=async(url,options={})=>{
  if(url==='https://db.test/auth/v1/user')return Response.json({id:active});
  if(url.includes('social_voice_authorize'))return active===C?Response.json({error:'denied'},{status:403}):Response.json({enabled:true,capacity:2,members:[A,B]});
  if(url.includes('social_voice_account')){assert.equal(JSON.parse(options.body).p_key,'server-accounting-secret');return Response.json({allowed:true,remaining_seconds:10800,daily_seconds:10800,expires_at:new Date(Date.now()+120000).toISOString(),server_now:new Date().toISOString(),max_capacity:8});}
  if(url.includes('social_voice_expire'))return Response.json(1);
  assert.match(url,/^https:\/\/rtc.live.cloudflare.com\/v1\/apps\/test-app\/sessions/);
  assert.equal(options.headers.Authorization,'Bearer test-secret');
  if(url.endsWith('sessions/new'))return Response.json({sessionId:'sfu-'+(++sessions)});
  if(options.method==='GET')return Response.json({tracks:[{mid:'0',status:'active'}]});
  const body=JSON.parse(options.body||'{}');if(url.endsWith('tracks/close')){closes++;assert.equal(body.force,true);return Response.json({tracks:body.tracks});}
  if(url.endsWith('tracks/new'))return Response.json({tracks:body.tracks.map((track,i)=>({...track,mid:String(i)})),sessionDescription:{type:body.sessionDescription?'answer':'offer',sdp:SDP.sdp}});
  return Response.json({});
 };
 const object=new RoomVoice(ctx,env);await new Promise(r=>setImmediate(r));env.ROOM_VOICE={idFromName:name=>{assert.equal(name,ROOM);return name;},get:()=>({fetch:(url,options)=>object.fetch(new Request(url,options))})};
 const request=async(action,body={},origin='https://luria.test')=>worker.fetch(new Request(`https://voice.test/rooms/${ROOM}/${action}`,{method:'POST',headers:{Origin:origin,Authorization:'Bearer fixture','Content-Type':'application/json'},body:JSON.stringify({client_id:active,...body})}),env);
 await t.test('reject unknown origin and nonmembers before SFU allocation',async()=>{
  assert.equal((await request('join',{},'https://evil.test')).status,403);active=C;assert.equal((await request('join')).status,403);assert.equal(sessions,0);active=A;
  assert.equal((await request('ice',{},'https://evil.test')).status,403);active=C;assert.equal((await request('ice')).status,403);active=A;
 });
 await t.test('serialize concurrent joins and disallow duplicate tabs',async()=>{
  const results=await Promise.all([request('join'),request('join')]);assert.equal(results[0].status,200);assert.equal(results[1].status,200);assert.equal(sessions,1);
  assert.equal((await request('join',{client_id:C})).status,409);
  const prefixed=await worker.fetch(new Request(`https://voice.test/api/study-voice/rooms/${ROOM}/heartbeat`,{method:'POST',headers:{Origin:'https://luria.test',Authorization:'Bearer fixture'},body:JSON.stringify({client_id:A})}),env);assert.equal(prefixed.status,200);
 });
 await t.test('publish microphone; forbid arbitrary remote session IDs and foreign room publishers',async()=>{
  assert.equal((await request('publish',{sessionDescription:SDP,mid:'0'})).status,200);active=B;await request('join');await request('publish',{sessionDescription:SDP,mid:'0'});
  const peers=await(await request('heartbeat')).json();assert.equal(peers.peers.length,1);assert.equal(peers.peers[0].user_id,A);
  assert.equal((await request('subscribe',{users:[C],sessionId:'stolen'})).status,403);
  assert.equal((await request('subscribe',{users:[A]})).status,200);
 });
 await t.test('reject camera, data channels and mixed SDP and close the failed allocation',async()=>{
  active=B;await request('leave');await object.alarm();const before=closes;await request('join');const response=await request('publish',{sessionDescription:{...SDP,sdp:SDP.sdp+'m=video 9 UDP/TLS/RTP/SAVPF 96\r\n'},mid:'0'});assert.equal(response.status,502);await object.alarm();assert(closes>before);
 });
 await t.test('expired sessions stop forwarding audio and storage keeps no bearer tokens',async()=>{
  object.peers[A].expires=Date.now()-1;await object.alarm();assert.equal(object.peers[A],undefined);assert(closes>=2);assert(alarms.length>0);assert.doesNotMatch(JSON.stringify(stored),/Bearer|fixture|test-secret/);
 });
 await t.test('administrative pause prevents new allocations and renewals while still allowing cleanup',async()=>{
  active=A;env.VOICE_ENABLED='true';assert.equal((await request('join')).status,200);const before=sessions;
  env.VOICE_ENABLED='false';assert.equal((await request('join')).status,403);assert.equal((await request('heartbeat')).status,403);assert.equal(sessions,before);
  assert.equal((await request('leave')).status,200);assert.equal(object.peers[A].closing,true);await object.alarm();assert.equal(object.peers[A],undefined);
  env.VOICE_ENABLED='invalid';assert.equal((await request('join')).status,403);env.VOICE_ENABLED='true';
 });
});

test('TURN credentials require room authorization, expire quickly, are rate limited and never persist secrets',async t=>{
 const {RoomVoice}=await import('../cloudflare/study-voice/worker.mjs');const original=global.fetch;t.after(()=>{global.fetch=original;});const stored={};
 const ctx={blockConcurrencyWhile:fn=>fn(),storage:{get:async key=>structuredClone(stored[key]),put:async(key,value)=>{stored[key]=structuredClone(value);},setAlarm:async()=>{},deleteAlarm:async()=>{}}};
 const env={TURN_KEY_ID:'test-turn-key',TURN_KEY_API_TOKEN:'long-term-secret'};const object=new RoomVoice(ctx,env);await new Promise(r=>setImmediate(r));let issued=0;
 global.fetch=async(url,options)=>{issued++;assert.equal(url,'https://rtc.live.cloudflare.com/v1/turn/keys/test-turn-key/credentials/generate-ice-servers');assert.equal(options.headers.Authorization,'Bearer long-term-secret');assert.deepEqual(JSON.parse(options.body),{ttl:600});return Response.json({iceServers:[{urls:'stun:stun.cloudflare.com:3478'},{urls:['turns:turn.cloudflare.com:443?transport=tcp'],username:'temporary-user',credential:'temporary-password'}],secret:'must-not-be-forwarded'},{status:201});};
 const request=()=>new Request('https://voice.internal/ice',{method:'POST',body:JSON.stringify({uid:A,allowed:[A],capacity:2,body:{client_id:A}})});
 const first=await object.fetch(request());assert.equal(first.status,200);assert.equal(first.headers.get('cache-control'),'no-store');const value=await first.json();assert.equal(value.iceServers[1].credential,'temporary-password');assert(value.expiresAt>Date.now()+590000);assert.equal(value.secret,undefined);assert.doesNotMatch(JSON.stringify(stored),/secret|password|temporary-user/);assert.equal(Object.keys(object.peers).length,0);
 for(let i=0;i<3;i++)assert.equal((await object.fetch(request())).status,200);assert.equal((await object.fetch(request())).status,429);assert.equal(issued,4);
 env.TURN_KEY_ID='';assert.equal((await object.fetch(request())).status,503);env.TURN_KEY_API_TOKEN='';assert.deepEqual((await(await object.fetch(request())).json()).iceServers,[{urls:'stun:stun.cloudflare.com:3478'}]);
});

test('slow abandoned-call cleanup never blocks a healthy participant heartbeat',async t=>{
 const {RoomVoice}=await import('../cloudflare/study-voice/worker.mjs');const original=global.fetch;t.after(()=>{global.fetch=original;});
 const ctx={blockConcurrencyWhile:fn=>fn(),storage:{get:async()=>undefined,put:async()=>{},setAlarm:async()=>{},deleteAlarm:async()=>{}}};const object=new RoomVoice(ctx,{SFU_APP_ID:'test-app',SFU_APP_SECRET:'test-secret'});await new Promise(r=>setImmediate(r));
 object.peers[A]={clientId:A,sessionId:'healthy',published:true,mids:['0'],expires:Date.now()+120000,started:Date.now(),window:Date.now(),requests:0};object.peers[B]={clientId:B,sessionId:'abandoned',published:true,mids:['0'],closing:true,expires:Date.now()-1};
 let finishCleanup;global.fetch=()=>new Promise(resolve=>{finishCleanup=resolve;});const cleanup=object.alarm();await new Promise(r=>setImmediate(r));
 const heartbeat=object.fetch(new Request('https://voice.internal/heartbeat',{method:'POST',body:JSON.stringify({uid:A,allowed:[A,B],capacity:2,body:{client_id:A}})}));
 let timeout;const result=await Promise.race([heartbeat,new Promise((_,reject)=>{timeout=setTimeout(()=>reject(new Error('Heartbeat blocked by cleanup')),1000);})]);clearTimeout(timeout);assert.equal(result.status,200);assert.equal((await result.json()).peers.length,0);
 finishCleanup(Response.json({tracks:[{mid:'0'}]}));await cleanup;assert.equal(object.peers[B],undefined);assert(object.peers[A]);
});

test('cleanup releases expired SFU sessions and already-closed tracks but retains unresolved resources',async t=>{
 const {RoomVoice}=await import('../cloudflare/study-voice/worker.mjs');const original=global.fetch;t.after(()=>{global.fetch=original;});
 const persisted={};const ctx={blockConcurrencyWhile:fn=>fn(),storage:{get:async key=>structuredClone(persisted[key]),put:async(key,value)=>{persisted[key]=structuredClone(value);},setAlarm:async()=>{},deleteAlarm:async()=>{}}};
 const object=new RoomVoice(ctx,{SFU_APP_ID:'test-app',SFU_APP_SECRET:'test-secret'});await new Promise(r=>setImmediate(r));
 const seed=()=>{object.peers[A]={sessionId:'expired-fixture',expires:Date.now()-1,clientId:A};};
 seed();Object.assign(object.peers[A],{published:true,mids:['0']});global.fetch=async()=>Response.json({errorCode:'session_error'},{status:425});await object.close(A);assert.equal(object.peers[A],undefined);assert(object.cleanup['expired-fixture']);await object.save();assert.equal(persisted.peers[A],undefined);assert(persisted.cleanup['expired-fixture']);
 const restored=new RoomVoice(ctx,{SFU_APP_ID:'test-app',SFU_APP_SECRET:'test-secret'});await new Promise(r=>setImmediate(r));assert.equal(restored.peers[A],undefined);assert(restored.cleanup['expired-fixture']);
 global.fetch=async()=>Response.json({errorCode:'session_error'},{status:410});await object.close('expired-fixture',true);assert.equal(object.cleanup['expired-fixture'],undefined);
 seed();Object.assign(object.peers[A],{published:true,mids:['0','1']});global.fetch=async(url,options)=>{assert.equal(options.method,'PUT');assert.deepEqual(JSON.parse(options.body).tracks,[{mid:'0'},{mid:'1'}]);return Response.json({tracks:[{mid:'0'},{mid:'1',errorCode:'close_track_error'}]});};await object.close(A);assert.equal(object.peers[A],undefined);
 seed();Object.assign(object.peers[A],{published:true,mids:['0'],uncertain:true});let inspected=false;global.fetch=async(url,options)=>{if(options.method==='GET'){inspected=true;return Response.json({tracks:[{mid:'0',status:'active'},{mid:'1',status:'active'}]});}assert(inspected);assert.equal(JSON.parse(options.body).tracks.length,2);return Response.json({tracks:[{mid:'0'},{mid:'1'}]});};await object.close(A);assert.equal(object.peers[A],undefined);
 for(const status of ['inactive','active']){seed();Object.assign(object.peers[A],{published:true,mids:['0']});global.fetch=async(url,options)=>{if(options.method==='PUT')throw new DOMException('Fixture timeout','TimeoutError');return Response.json({tracks:[{mid:'0',status}]});};await object.close(A);if(status==='inactive')assert.equal(object.peers[A],undefined);else assert.equal(object.peers[A].closing,true);}
 global.fetch=async()=>Response.json({errorCode:'session_error'},{status:410});seed();await object.close(A);assert.equal(object.peers[A],undefined);
 for(const results of [[{mid:'0',errorCode:'close_track_error'}],[{mid:'0',errorCode:'internal_error'}],[]]){
  seed();global.fetch=async(url,options)=>options.method==='GET'?Response.json({tracks:[{mid:'0',status:'active'}]}):Response.json({tracks:results});
  await object.close(A);if(results[0]?.errorCode==='close_track_error')assert.equal(object.peers[A],undefined);else assert.equal(object.peers[A].closing,true);
 }
 global.fetch=async()=>Response.json({errorCode:'backend_error'},{status:503});seed();await object.close(A);assert.equal(object.peers[A].closing,true);
 const request=()=>new Request('https://voice.internal/join',{method:'POST',body:JSON.stringify({uid:A,allowed:[A],capacity:2,body:{client_id:A}})});
 let cleanupReads=0;global.fetch=async(url,options)=>{if(options.method==='GET'){cleanupReads++;return Response.json({errorCode:'session_error'},{status:410});}return Response.json({sessionId:'replacement-fixture'});};
 assert.equal((await object.handle(request())).status,409);assert.equal(cleanupReads,0);
 object.peers[A].lastCleanupAttempt=Date.now()-31000;assert.equal((await object.handle(request())).status,409);assert.equal(cleanupReads,0);await object.alarm();assert.equal((await object.handle(request())).status,200);assert.equal(cleanupReads,1);assert.equal(object.peers[A].sessionId,'replacement-fixture');
 object.peers[A].closing=true;const leave=clientId=>new Request('https://voice.internal/leave',{method:'POST',body:JSON.stringify({uid:A,allowed:[A],capacity:2,body:{client_id:clientId}})});
 assert.equal((await object.handle(leave(B))).status,403);assert(object.peers[A]);assert.equal((await object.handle(leave(A))).status,200);assert.equal(object.peers[A].closing,true);await object.alarm();assert.equal(object.peers[A],undefined);
 object.peers[B]={sessionId:'unrelated-fixture',expires:Date.now()-1,clientId:B};const readCount=cleanupReads;assert.equal((await object.handle(leave(A))).status,200);assert.equal(cleanupReads,readCount);assert(object.peers[B]);
 global.fetch=async()=>{throw new DOMException('Fixture timeout','TimeoutError');};await assert.rejects(object.sfu('sessions/fixture/tracks/close','PUT',{tracks:[],force:true}),error=>error.name==='TimeoutError'&&error.code==='sfu_close_TimeoutError');
});
