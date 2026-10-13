// Separate, opt-in development scope. Never registers the platform service worker.
const CACHE='luria-alex-lab-v2';
const URLS=['./','./index.html','./lab.css','./lab.mjs','./icon.svg','./manifest.webmanifest','../../assets/js/professor-alex-mascot.mjs','../../assets/css/professor-alex-mascot.css','../../assets/vendor/three.module.min.mjs','../../assets/vendor/three.core.min.mjs'];
self.addEventListener('install',event=>event.waitUntil(caches.open(CACHE).then(cache=>cache.addAll(URLS)).then(()=>self.skipWaiting())));
self.addEventListener('activate',event=>event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k.startsWith('luria-alex-lab-')&&k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',event=>{if(event.request.method!=='GET'||new URL(event.request.url).origin!==self.location.origin)return;event.respondWith(caches.match(event.request).then(hit=>hit||fetch(event.request)));});
