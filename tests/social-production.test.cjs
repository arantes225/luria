const test=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),{execFileSync}=require('node:child_process');
const root=path.resolve(__dirname,'..'),output=path.join(root,'build/pages');
test('production artifact retains official data and domain while excluding backend and secret directories',()=>{
 execFileSync(process.execPath,['scripts/build-pages.cjs'],{cwd:root,timeout:60000});
 const read=p=>fs.readFileSync(path.join(output,p),'utf8');
 assert.equal(read('CNAME').trim(),'www.resibulando.online');
 assert.match(read('assets/js/supabase.js'),/sxdsfklllilhdyuamvvg\.supabase\.co/);
 assert.doesNotMatch(read('assets/js/supabase.js'),/kvprgusgfptslbhigsab/);
 assert.match(read('assets/js/social-voice.js'),/https:\/\/luria-study-voice\.lfab225\.workers\.dev\/api\/study-voice/);
 for(const file of ['amigos.html','amigos/index.html'])assert.match(read(file),/connect-src[^;]+https:\/\/luria-study-voice\.lfab225\.workers\.dev/);
 for(const file of ['.git','.dev.vars','.dev.vars.production','cloudflare','db','supabase','docs','tests','scripts','node_modules','package-lock.json'])assert.equal(fs.existsSync(path.join(output,file)),false,file);
 assert.ok(fs.existsSync(path.join(output,'apostilas/pre-natal-baixo-risco/index.html')));
 assert.ok(fs.existsSync(path.join(output,'assets/img/logos/logo-principal.png')));
 assert.ok(fs.existsSync(path.join(output,'.nojekyll')));
 // The 3D mascot uses native ES modules. Verify the published artifact, not
 // just the source tree, so missing modules cannot silently hide Alex again.
 for(const file of ['professor-alex/index.html','assets/js/professor-alex-page.mjs','assets/js/professor-alex-mascot.mjs','assets/vendor/three.module.min.mjs','assets/vendor/three.core.min.mjs','assets/css/professor-alex-mascot.css','assets/css/professor-alex-page.css']){
  assert.equal(read(file),fs.readFileSync(path.join(root,file),'utf8'),file);
 }
});
