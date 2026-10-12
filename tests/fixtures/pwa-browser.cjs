// Isolated loopback origin: actual worker, real Chromium Cache Storage, synthetic
// private responses and controlled socket failures. No production APIs/auth run.
const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');
const root = path.resolve(__dirname, '../..');
const source = fs.readFileSync(path.join(root, 'service-worker.js'), 'utf8');
const csp = fs.readFileSync(path.join(root, 'dashboard/index.html'), 'utf8').match(/http-equiv="Content-Security-Policy" content="([^"]+)"/)[1];
let revision = 1;
let failing = false;
const probe = `
const output=document.querySelector('output');
const checks=[];
function assert(condition,label){if(!condition)throw Error(label);checks.push(label);output.textContent=checks.join('\\n');}
async function waitForController(predicate){if(predicate())return;await new Promise((resolve,reject)=>{const timer=setTimeout(()=>reject(Error('Controller timeout')),10000);function changed(){if(predicate()){clearTimeout(timer);navigator.serviceWorker.removeEventListener('controllerchange',changed);resolve();}}navigator.serviceWorker.addEventListener('controllerchange',changed);});}
async function waitForActivation(worker){if(worker.state==='activated')return;await new Promise((resolve,reject)=>{const timer=setTimeout(()=>reject(Error('Activation timeout')),10000);function changed(){if(worker.state==='activated'){clearTimeout(timer);worker.removeEventListener('statechange',changed);resolve();}}worker.addEventListener('statechange',changed);});}
async function allKeys(){const list=[];for(const name of await caches.keys())for(const req of await (await caches.open(name)).keys())list.push({name,url:req.url});return list;}
async function write(cache,url,body,type='text/css'){await (await caches.open(cache)).put(url,new Response(body,{headers:{'Content-Type':type}}));}
async function controlledFailure(value){await fetch('/__pwa_control?failure='+value);}
let registration;
document.querySelector('#register').addEventListener('click',async()=>{try{
  output.textContent='Registrando';
  await write('luria-pwa-v281-mobile-flow-static','/assets/css/ui-v2-foundations.css?v=stage75','legacy');
  await write('luria-weekly-content-v1','/content/weekly/old.json','{}','application/json');
  registration=await navigator.serviceWorker.register('/service-worker.js',{scope:'/',updateViaCache:'none'});
  await navigator.serviceWorker.ready;await waitForController(()=>!!navigator.serviceWorker.controller);
  await waitForActivation(navigator.serviceWorker.controller);
  const names=await caches.keys();
  assert(!names.includes('luria-pwa-v281-mobile-flow-static')&&!names.includes('luria-weekly-content-v1'),'PASS: registro, ativação e limpeza dos caches antigos');
  assert(navigator.serviceWorker.controller.state==='activated','PASS: página controlada pelo worker real');
  document.querySelector('#run').disabled=false;
}catch(error){output.textContent+='\\nFAIL: '+error.message;}});
document.querySelector('#run').addEventListener('click',async()=>{try{
  const css='/assets/css/ui-v2-foundations.css?v=stage75';
  assert((await fetch(css)).status===200,'PASS: CSS público online');
  const js='/assets/js/weekly-content.js?v=stage75';
  assert((await fetch(js)).status===200,'PASS: JavaScript público online');
  const page=await fetch('/flashcards/');assert(page.status===200&&await page.text(),'PASS: HTML público online');
  const current='luria-pwa-v282-cache-security';
  await write(current+'-static','/assets/css/ui-v2-foundations.css','old');
  await write(current+'-runtime','/assets/css/ui-v2-foundations.css?v=stage75-new','new');
  // Disable HTTP cache for synthetic account requests: this suite isolates the
  // worker's Cache Storage, not the server/browser's separate HTTP cache.
  assert(await (await fetch('/assets/css/ui-v2-foundations.css?v=stage75',{cache:'no-store',headers:{Authorization:'Bearer synthetic-A'}})).text()==='synthetic-A','PASS: resposta autenticada A preservada online');
  assert(await (await fetch('/assets/css/ui-v2-foundations.css?v=stage75',{cache:'no-store',headers:{Authorization:'Bearer synthetic-B'}})).text()==='synthetic-B','PASS: usuário B não recebe resposta A');
  await fetch('/assets/css/ui-v2-foundations.css?token=synthetic');
  await fetch('/assets/css/ui-v2-foundations.css?v=stage75-private');
  await fetch('/assets/css/ui-v2-foundations.css?v=stage75-no-store');
  await fetch('/admin/');await fetch('/api/private.json');
  let keys=await allKeys();
  assert(!keys.some(item=>['token=','stage75-private','stage75-no-store','/admin/','/api/'].some(value=>item.url.includes(value))),'PASS: tokens, Admin, API, private e no-store ausentes do Cache Storage');
  const exact=await (await caches.open(current+'-runtime')).match(css);
  assert(exact&&!(await exact.text()).includes('synthetic-'),'PASS: cache compartilhado contém somente CSS público');
  await controlledFailure(true);
  assert((await fetch(css)).status===200,'PASS: CSS exato após falha de rede');
  assert((await fetch(js)).status===200,'PASS: JavaScript exato após falha de rede');
  assert((await fetch('/flashcards/')).status===200,'PASS: HTML exato após falha de rede');
  assert(await (await fetch('/assets/css/ui-v2-foundations.css?v=stage75-new')).text()==='new','PASS: versão runtime exata preservada');
  assert((await fetch('/assets/css/ui-v2-foundations.css?v=stage75-other')).status===503,'PASS: F01 — versão ausente não usa CSS antigo');
  assert((await fetch('/assets/js/missing-stage75.js')).status===503,'PASS: recurso ausente recebe erro controlado');
  let privateOffline=false;try{await fetch(css,{cache:'no-store',headers:{Authorization:'Bearer synthetic-B'}});}catch{privateOffline=true;}
  assert(privateOffline,'PASS: requisição privada offline não recebe fallback público');
  await controlledFailure(false);
  assert((await fetch('/assets/css/ui-v2-foundations.css?v=stage75-recovery')).status===200,'PASS: recuperação da rede');
  assert(!document.body.dataset.cspError,'PASS: sem violações CSP no harness com política copiada do Dashboard');
  document.querySelector('#update').disabled=false;
}catch(error){output.textContent+='\\nFAIL: '+error.message;await controlledFailure(false);}});
document.querySelector('#update').addEventListener('click',async()=>{try{
  const old=navigator.serviceWorker.controller;
  await fetch('/__pwa_control?revision=2');await registration.update();
  await waitForController(()=>!!navigator.serviceWorker.controller&&navigator.serviceWorker.controller!==old);
  await waitForActivation(navigator.serviceWorker.controller);
  const names=await caches.keys();
  assert(!names.includes('luria-pwa-v282-cache-security-runtime'),'PASS: atualização remove o runtime da versão anterior');
  assert(names.some(name=>name.includes('fixture-update')),'PASS: nova versão ativa com namespace próprio');
  assert(document.querySelector('textarea').value==='Anotação sintética preservada','PASS: atualização não recarrega a página');
  output.textContent+='\\nRESULTADO: todas as verificações Chromium passaram';
}catch(error){output.textContent+='\\nFAIL: '+error.message;}});
document.querySelector('#cleanup').addEventListener('click',async()=>{try{
  for(const reg of await navigator.serviceWorker.getRegistrations())await reg.unregister();
  for(const name of await caches.keys())if(name.startsWith('luria-'))await caches.delete(name);
  output.textContent+='\\nLimpeza da origem descartável concluída';
}catch(error){output.textContent+='\\nFAIL: '+error.message;}});
document.addEventListener('securitypolicyviolation',()=>{document.body.dataset.cspError='true';});
document.querySelector('#fail-navigation').addEventListener('click',async()=>{await controlledFailure(true);output.textContent='Rede indisponível para a navegação sintética';});
document.querySelector('#restore-network').addEventListener('click',async()=>{await controlledFailure(false);output.textContent='Rede restaurada';});
`;
// Check the emitted script as well as this server file (template escaping differs).
new (require('node:vm').Script)(probe, { filename: '__pwa_probe.js' });
const server = http.createServer((req, res) => {
  const url = new URL(req.url, 'http://127.0.0.1');
  function send(type, body, cache = 'public, max-age=60') {
    res.setHeader('Content-Type', type); res.setHeader('Cache-Control', cache); res.end(body);
  }
  if (url.pathname === '/__pwa_control') {
    if (url.searchParams.has('revision')) revision = Number(url.searchParams.get('revision'));
    if (url.searchParams.has('failure')) failing = url.searchParams.get('failure') === 'true';
    return send('text/plain', 'ok', 'no-store');
  }
  if (url.pathname === '/__pwa_probe.js') return send('text/javascript', probe, 'no-store');
  if (url.pathname === '/') return send('text/html', '<!doctype html><html lang="pt-BR"><head><meta charset="utf-8"><meta http-equiv="Content-Security-Policy" content="'+csp+'"><title>Luria — verificação PWA isolada</title></head><body><h1>Etapa 7.5 — Chromium isolado</h1><p>Worker real, dados sintéticos e falhas de rede controladas.</p><button id="register">1. Registrar worker</button><button id="run" disabled>2. Verificar cache e segurança</button><button id="update" disabled>3. Verificar atualização</button><button id="cleanup">4. Limpar origem de teste</button><p><textarea>Anotação sintética preservada</textarea></p><pre><output>Aguardando registro</output></pre><button id="fail-navigation">Simular falha para navegação</button><button id="restore-network">Restaurar rede</button><p><a href="/dashboard/?v=stage75-navigation">Navegação sintética pública</a></p><script src="/__pwa_probe.js"></script></body></html>', 'no-store');
  if (url.pathname === '/service-worker.js') return send('text/javascript', revision === 1 ? source : source.replace('luria-pwa-v282-cache-security', 'luria-pwa-v282-cache-security-fixture-update'), 'no-store');
  if (failing) return req.socket.destroy();
  if (url.pathname === '/dashboard/' && url.searchParams.get('v') === 'stage75-navigation') return send('text/html', '<!doctype html><html lang="pt-BR"><head><meta charset="utf-8"><meta http-equiv="Content-Security-Policy" content="'+csp+'"><title>Navegação sintética</title></head><body><h1>Navegação sintética renderizada</h1><p>Documento público retornado pelo worker real.</p><a href="/">Voltar ao teste</a></body></html>', 'public, max-age=0');
  if (req.headers.authorization) return send('text/css', req.headers.authorization.replace('Bearer ', ''), 'private, no-store');
  if (url.searchParams.has('token')) return send('text/css', 'synthetic signed URL', 'private');
  if (url.searchParams.get('v') === 'stage75-private') return send('text/css', 'synthetic private', 'private');
  if (url.searchParams.get('v') === 'stage75-no-store') return send('text/css', 'synthetic no-store', 'no-store');
  if (url.pathname === '/admin/' || url.pathname === '/api/private.json') return send('application/json', '{}', 'private, no-store');
  let relative = decodeURIComponent(url.pathname).replace(/^\/+/, '');
  if (relative.endsWith('/')) relative += 'index.html';
  const file = path.resolve(root, relative);
  if (!file.startsWith(root + path.sep) || !fs.existsSync(file) || !fs.statSync(file).isFile()) { res.statusCode = 404; return send('text/plain', 'not found', 'no-store'); }
  const types = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.webmanifest': 'application/manifest+json', '.json': 'application/json', '.woff2': 'font/woff2', '.png': 'image/png', '.svg': 'image/svg+xml', '.webp': 'image/webp' };
  send(types[path.extname(file)] || 'application/octet-stream', fs.readFileSync(file));
});
server.listen(0, '127.0.0.1', () => console.log('Isolated PWA fixture: http://127.0.0.1:' + server.address().port + '/'));
