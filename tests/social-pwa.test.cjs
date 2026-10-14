const test=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs');
const {workerFixture}=require('./fixtures/service-worker.cjs');
test('social PWA caches only public code; voice, chat and invite queries stay out of cache',()=>{
 const f=workerFixture();
 for(const asset of ['/assets/css/social-v3.css?v=2','/assets/js/social-rooms.js?v=3','/assets/js/social-voice.js?v=7','/assets/js/social-presence.js?v=1']){
  assert(f.APP_SHELL.includes(asset));assert(fs.existsSync('.'+asset.split('?')[0]));assert.equal(f.context.publicResource(f.request(asset)),true);
 }
 for(const url of ['/api/study-voice/rooms/11111111-1111-4111-8111-111111111111/join','/amigos/?invite=private-code','/amigos/?group_invite=private-code'])assert.equal(f.context.publicResource(f.request(url)),false);
 assert.equal(f.context.publicResource(f.request('/assets/js/social-rooms.js?v=3',{headers:{Authorization:'Bearer private-token'}})),false);
});
