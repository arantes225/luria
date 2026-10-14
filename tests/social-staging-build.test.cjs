const test=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const crypto=require('node:crypto');
const {JSDOM}=require('jsdom');
const {execFileSync}=require('node:child_process');
const root=path.resolve(__dirname,'..'),output=path.join(root,'build/staging');
const config=JSON.parse(fs.readFileSync(path.join(root,'cloudflare/study-voice/staging.public.json'),'utf8'));
const text=file=>fs.readFileSync(path.join(output,file),'utf8');
test.before(()=>execFileSync(process.execPath,['scripts/build-social-staging.cjs'],{cwd:root,stdio:'pipe',timeout:60000}));
test('staging artifact isolates API and websocket endpoints without changing production sources',()=>{
 assert.ok(fs.existsSync(output),'Run node scripts/build-social-staging.cjs before this integration check');
 assert.match(fs.readFileSync(path.join(root,'assets/js/supabase.js'),'utf8'),/https:\/\/sxdsfklllilhdyuamvvg\.supabase\.co/);
 assert.ok(text('assets/js/supabase.js').includes(config.supabaseUrl));
 assert.ok(text('assets/js/supabase.js').includes(config.supabasePublishableKey));
 for(const page of ['amigos.html','amigos/index.html','login/index.html','dashboard/index.html']){
  const html=text(page);assert.ok(html.includes(new URL(config.supabaseUrl).hostname));assert.ok(!html.includes('sxdsfklllilhdyuamvvg'));
 }
 assert.match(text('service-worker.js'),/luria-pwa-social-rooms-20261013-staging/);
 assert.match(text('manifest.webmanifest'),/Homologação/);
 assert.match(text('assets/js/social-voice.js'),/const endpoint='\/api\/study-voice';/);
 assert.equal(config.voiceOrigin,null);
});
test('staging artifact excludes database definitions, secrets, tooling and Git metadata',()=>{
 for(const forbidden of ['.git','.dev.vars','db','supabase','cloudflare','tests','scripts','docs','package.json','package-lock.json','CNAME'])assert.equal(fs.existsSync(path.join(output,forbidden)),false,forbidden);
 const visit=directory=>{for(const item of fs.readdirSync(directory,{withFileTypes:true})){const file=path.join(directory,item.name);if(item.isDirectory())visit(file);else if(/\.(?:js|html|css|json|txt|svg|xml|webmanifest)$/.test(file)){const content=fs.readFileSync(file,'utf8');assert.ok(!content.includes('sxdsfklllilhdyuamvvg'),file);assert.ok(!/SFU_APP_SECRET\s*=|\bsb_secret_[A-Za-z0-9_-]+/.test(content),file);}}};
 visit(output);
});
test('staging inline scripts still match the CSP hashes',()=>{
 for(const page of ['amigos.html','amigos/index.html','login/index.html','dashboard/index.html']){
  const dom=new JSDOM(text(page));try{
   const policy=dom.window.document.querySelector('meta[http-equiv="Content-Security-Policy"]').content;
   for(const script of dom.window.document.scripts){if(script.hasAttribute('src')||!script.textContent.trim()||/^(application\/(?:ld\+)?json)$/i.test(script.type))continue;
    const hash="'sha256-"+crypto.createHash('sha256').update(script.textContent,'utf8').digest('base64')+"'";assert.ok(policy.includes(hash),page);
   }
   if(config.voiceOrigin&&page.startsWith('amigos'))assert.ok(policy.match(/connect-src[^;]+/)[0].includes(config.voiceOrigin));
  }finally{dom.window.close();}
 }
});
