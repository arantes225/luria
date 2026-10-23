const {test}=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const vm=require('node:vm');
const {stripTypeScriptTypes}=require('node:module');
const context=vm.createContext({URL,Response,Request,Headers,AbortSignal,TextDecoder,Uint8Array});
for(const file of ['source-verifier','image-download']) {
  const code=stripTypeScriptTypes(fs.readFileSync(`supabase/functions/_shared/${file}.ts`,'utf8')).replace(/^import .*;\r?\n/gm,'').replace(/^export /gm,'');
  vm.runInContext(code,context);
}
const downloadImage=vm.runInContext('downloadImage',context);
const base='https://www.luriamedicina.com.br';
const png=()=>new Response(new Uint8Array([137,80,78,71,13,10,26,10]),{headers:{'content-type':'image/png'}});
test('image URL guard rejects protocols, credentials, local/reserved IPs before fetch',async()=>{
  for(const src of ['http://public.org/x','file:///etc/passwd','https://127.1/x','https://0x7f000001/x','https://[::1]/','https://[::ffff:127.0.0.1]/','https://169.254.169.254/','https://private.internal/','https://@public.org/x']) {
    await assert.rejects(()=>downloadImage(src,base,{fetch(){assert.fail('network must not be called');}}));
  }
});
test('manual redirects revalidate every destination and never forward credentials',async()=>{
  let calls=0;
  await assert.rejects(()=>downloadImage('/image.png',base,{fetch:async(url,options)=>{
    calls++; assert.equal(options.redirect,'manual');assert.equal(options.credentials,'omit');assert.equal(options.headers,undefined);
    return new Response(null,{status:302,headers:{location:'https://10.0.0.1/secret'}});
  }}));assert.equal(calls,1);
  calls=0;await assert.rejects(()=>downloadImage('/a',base,{fetch:async()=>{calls++;return new Response(null,{status:302,headers:{location:'/again'}});}}));assert.equal(calls,4);
  const result=await downloadImage('/image.png',base,{allowedOrigins:[base],fetch:async()=>png()});assert.equal(result.bytes.length,8);
  await assert.rejects(()=>downloadImage('https://other.org/image',base,{allowedOrigins:[base],fetch(){assert.fail();}}));
});
test('download is bounded without Content-Length; signatures and MIME must match',async()=>{
  let cancelled=false;
  const stream=new ReadableStream({pull(controller){controller.enqueue(new Uint8Array(1024*1024));},cancel(){cancelled=true;}});
  await assert.rejects(()=>downloadImage('/large',base,{fetch:async()=>new Response(stream,{headers:{'content-type':'image/png'}})}),/8 MB/);assert(cancelled);
  for(const response of [new Response('<svg/>',{headers:{'content-type':'image/svg+xml'}}),new Response('<html>',{headers:{'content-type':'image/png'}}),new Response('x',{headers:{'content-type':'image/jpeg','content-length':'9000000'}})]) {
    await assert.rejects(()=>downloadImage('/bad',base,{fetch:async()=>response}));
  }
});
test('timeouts abort headers and stalled streaming bodies',async()=>{
  const keepAlive=setTimeout(()=>{},1000);
  try {
    await assert.rejects(()=>downloadImage('/slow',base,{timeoutMs:10,fetch:async(url,{signal})=>new Promise((resolve,reject)=>signal.addEventListener('abort',()=>reject(signal.reason)))}));
    await assert.rejects(()=>downloadImage('/slow-body',base,{timeoutMs:10,fetch:async()=>new Response(new ReadableStream({start(){}}),{headers:{'content-type':'image/png'}})}));
  } finally {clearTimeout(keepAlive);}
});
test('dynamic DNS limitation remains explicit: fetch does not expose the connected peer IP',async()=>{
  // Simulate a public-looking name resolving differently at connection time.
  // The URL guard cannot inspect a Response's real socket; egress is mandatory.
  const result=await downloadImage('https://changing-dns.org/image',base,{fetch:async()=>png()});
  assert.equal(result.bytes.length,8);
  assert.match(fs.readFileSync('supabase/functions/_shared/source-verifier.ts','utf8'),/TOCTOU\/rebinding/);
});
