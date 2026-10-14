const test=require('node:test'),assert=require('node:assert/strict');
test('same-origin voice proxy preserves authorization, origin and body; assets bypass signaling',async()=>{
 const {default:site}=await import('../cloudflare/study-voice/site.mjs');const {default:voice}=await import('../cloudflare/study-voice/worker.mjs');const room='aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa';let forwarded=0,assets=0;
 const voiceEnv={ALLOWED_ORIGINS:'https://luria.test',SFU_APP_ID:'fixture',SFU_APP_SECRET:'secret',SUPABASE_URL:'https://db.test',SUPABASE_PUBLISHABLE_KEY:'public',VOICE_ACCOUNTING_KEY:'fixture-key'};
 const env={ASSETS:{fetch:async()=>{assets++;return new Response('asset');}},STUDY_VOICE:{fetch:async request=>{forwarded++;return voice.fetch(request,voiceEnv);}}};
 const request=origin=>new Request('https://luria.test/api/study-voice/rooms/'+room+'/ice',{method:'POST',headers:origin?{Origin:origin}:{},body:JSON.stringify({client_id:room})});
 assert.equal((await site.fetch(request('https://luria.test'),env)).status,401);assert.equal((await site.fetch(request('https://evil.test'),env)).status,403);assert.equal((await site.fetch(request(),env)).status,403);assert.equal(forwarded,3);
 const original=new Request('https://luria.test/api/study-voice/rooms/'+room+'/leave',{method:'POST',headers:{Origin:'https://luria.test',Authorization:'Bearer test'},body:JSON.stringify({client_id:room})});
 env.STUDY_VOICE.fetch=async request=>{assert.equal(request,original);assert.equal(request.headers.get('Authorization'),'Bearer test');assert.equal(request.headers.get('Origin'),'https://luria.test');assert.deepEqual(await request.json(),{client_id:room});return Response.json({left:true},{headers:{'Cache-Control':'no-store'}});};assert.equal((await site.fetch(original,env)).headers.get('cache-control'),'no-store');
 assert.equal(await(await site.fetch(new Request('https://luria.test/amigos/'),env)).text(),'asset');assert.equal(assets,1);assert.equal((await site.fetch(request('https://luria.test'),{ASSETS:env.ASSETS})).status,503);
});
