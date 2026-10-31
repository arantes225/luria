const {test}=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const {JSDOM}=require('jsdom');
const navigation=fs.readFileSync('assets/js/ui-navigation-v2.js','utf8');
const hub=fs.readFileSync('assets/js/work-dashboard.js','utf8');
const settle=async w=>{const frame=w.__fixtureFrame||w.requestAnimationFrame.bind(w);for(let i=0;i<3;i++)await new Promise(resolve=>frame(resolve));};
function fixture(t,{mobile=false,admin=true,page='trabalho_bulario',installed=false}={}) {
 const dom=new JSDOM('<html '+(installed?'data-pwa="standalone"':'')+'><body class="app-ready" data-ui-nav="v2" data-ui-context="work" data-ui-work="v2" data-ui-work-navigation="hub" data-page="'+page+'"><div class="app-shell"><aside id="sidebar"><div class="sidebar-top"><a class="brand" href="/dashboard/"><img id="traube-brand-logo"></a></div><nav><a href="/trabalho/">Dashboard</a><a href="/trabalho/paciente/">Paciente</a><a href="/trabalho/passometro/">Passômetro</a><a href="/trabalho/gestor-plantoes/">Plantões</a>'+(admin?'<a id="admin-nav-link" href="/admin/">◆ Admin</a>':'')+'<a id="beta-testers-nav-link" href="/beta-testers/">Beta Testers</a></nav><a class="work-pcr-button" href="/trabalho/pcr/">PCR</a><a class="traube-mode-footer-switch" href="/dashboard/">Estudos</a></aside><div id="sidebar-backdrop"></div><main class="main"><div class="page"><header class="topbar"><button id="menu-open">Menu</button><div class="traube-notifications"><button id="traube-profile-toggle">Perfil</button><div id="traube-profile-menu" hidden><a href="/configuracoes/#perfil">Perfil</a><button id="traube-profile-logout">Sair</button></div></div></header><div id="work-dashboard-content"></div><input id="clinical-control" value="preservado"></div></main></div></body></html>',{url:'https://fixture.invalid/trabalho/bulario/',runScripts:'outside-only',pretendToBeVisual:true});
 const observers=[],NativeObserver=dom.window.MutationObserver;
 dom.window.MutationObserver=class extends NativeObserver {constructor(fn){super(fn);observers.push(this);}};
 t.after(()=>{observers.forEach(o=>o.disconnect());dom.window.close();});
 dom.window.matchMedia=()=>({matches:mobile,addEventListener(){}});
 dom.window.docmapUser={id:'work-test-user'};
 dom.window.__fixtureFrame=dom.window.requestAnimationFrame.bind(dom.window);
 // Companion behavior is covered separately; this fixture runs only the shell.
 dom.window.eval(navigation.replace(/import\('[^']*professor-alex-companion[^']*'\)/g,'Promise.resolve({mountAlexCompanion:()=>({destroy(){},setAccess(){}})})'));
 return dom.window;
}
test('Work preserves its desktop hub and uses mobile shortcuts without changing clinical controls',async t=>{
 for(const mobile of [false,true]) {
  const w=fixture(t,{mobile,installed:mobile}),d=w.document;await settle(w);
  assert.equal(d.getElementById('sidebar').inert,true);
  assert.equal(d.getElementById('sidebar').getAttribute('aria-hidden'),'true');
  assert.equal(d.getElementById('menu-open').hidden,true);
  assert.equal(d.querySelector('.work-hub-return').getAttribute('href'),'/trabalho/');
  assert.equal(d.querySelector('.work-hub-pcr').getAttribute('href'),'/trabalho/pcr/');
  assert.equal(d.querySelector('.ui-topbar-brand').getAttribute('href'),'/trabalho/');
  assert.equal(d.querySelectorAll('#ui-mobile-navigation > *').length,mobile?6:0);
  d.getElementById('menu-open').click();assert.equal(d.body.classList.contains('sidebar-open'),false);
  assert.notEqual(d.querySelector('main').inert,true);
  assert.equal(d.getElementById('clinical-control').value,'preservado');
 }
});
test('Work profile preserves environment switching and only existing administrative permission',async t=>{
 for(const admin of [false,true]) {
  const w=fixture(t,{admin}),d=w.document;await settle(w);
  assert.equal(!!d.querySelector('[data-work-account="admin-nav-link"]'),admin);
  assert.equal(d.querySelector('[data-work-account="beta-testers-nav-link"]').getAttribute('href'),'/beta-testers/');
  assert.equal(d.querySelector('.ui-environment-options a').getAttribute('href'),'/dashboard/');
  if(admin){d.getElementById('admin-nav-link').remove();await settle(w);assert.equal(d.querySelector('[data-work-account="admin-nav-link"]'),null);}
 }
});
test('Work shell settles without mutation loops and restores direct page visits without duplicated controls',async t=>{
 const w=fixture(t,{mobile:true}),d=w.document;await settle(w);
 let frames=0;const frame=w.requestAnimationFrame.bind(w);w.requestAnimationFrame=fn=>{frames++;return frame(fn);};
 await settle(w);assert.equal(frames,0);
 d.body.classList.add('sidebar-open');d.querySelector('main').inert=true;w.dispatchEvent(new w.Event('pageshow'));await settle(w);
 w.dispatchEvent(new w.Event('docmap:ready'));await settle(w);
 assert.equal(d.body.classList.contains('sidebar-open'),false);
 assert.equal(d.querySelector('main').inert,false);
 assert.equal(d.querySelectorAll('.work-hub-navigation').length,1);
 assert.equal(d.querySelectorAll('#traube-brand-logo').length,1);
 assert.equal(d.querySelectorAll('[data-work-account="beta-testers-nav-link"]').length,1);
});
test('Work Dashboard groups ten real routes, provides PCR, and ignores retired presentation preferences',async t=>{
 const w=fixture(t,{page:'trabalho_dashboard'}),d=w.document;
 w.localStorage.setItem('traube:work-dashboard-layout:guest','simple');w.eval(hub);await settle(w);
 assert.equal(d.querySelectorAll('.work-hub-category').length,3);
 assert.equal(d.querySelectorAll('.work-hub-card').length,10);
 const links=[...d.querySelectorAll('.work-hub-card,.work-hub-emergency')];
 for(const link of links) {
  const route=decodeURIComponent(link.getAttribute('href')).replace(/^\//,'');
  assert.ok(fs.existsSync(route+'index.html'),route);
  assert.ok(link.querySelector('svg[aria-hidden="true"]'));
 }
 assert.equal(new Set(links.map(l=>l.href)).size,11);
 assert.equal(d.querySelector('.work-hub-patient').getAttribute('href'),'/trabalho/paciente/');
 assert.equal(d.querySelector('.work-hub-return').hidden,true);
 assert.equal(d.querySelector('.work-hub-emergency').getAttribute('href'),'/trabalho/pcr/');
});
test('all authenticated Work pages share the hub adapter and preserve the public access page',()=>{
 const walk=dir=>fs.readdirSync(dir,{withFileTypes:true}).flatMap(e=>e.isDirectory()?walk(dir+'/'+e.name):[dir+'/'+e.name]);
 const paths=walk('trabalho').filter(p=>p.endsWith('.html')&&fs.readFileSync(p,'utf8').includes('data-ui-work="v2"'));
 assert.equal(paths.length,23);
 for(const path of paths) {
  const html=fs.readFileSync(path,'utf8');
  assert.match(html,/data-ui-work-navigation="hub"/);
  const css=require('../scripts/check-css.cjs').stylesForPage(path);
  assert.equal(css.filter(href=>href.includes('/ui-app.css?')).length,1);
  const shared=fs.readFileSync('assets/css/ui-app.css','utf8');
  assert.ok(shared.indexOf('/* work-navigation.css')<shared.indexOf('/* ui-navigation-v2.css'));
 }
 assert.doesNotMatch(fs.readFileSync('trabalho/prontuario/index.html','utf8'),/work-navigation|data-ui-work-navigation/);
});

test('installed Study navigation uses its three hubs and shared tools dialog',async t=>{
 const dom=new JSDOM('<html data-pwa="standalone"><body class="app-ready" data-ui-nav="v2" data-ui-context="study"><div class="app-shell"><aside id="sidebar"><div class="sidebar-top"></div><nav><a href="/dashboard/">Início</a><a href="/aprender/">Estudar</a><a href="/consolidar/">Revisar</a></nav></aside><main class="main"><header class="topbar"><button id="menu-open">Menu</button></header></main></div></body></html>',{url:'https://fixture.invalid/dashboard/',runScripts:'outside-only',pretendToBeVisual:true});
 const s=dom.window,observers=[],NativeObserver=s.MutationObserver;
 s.MutationObserver=class extends NativeObserver{constructor(fn){super(fn);observers.push(this);}};
 t.after(()=>{observers.forEach(o=>o.disconnect());s.close();});
 s.matchMedia=()=>({matches:true,addEventListener(){}});s.docmapUser={id:'study-test-user'};
 s.HTMLDialogElement.prototype.showModal=function(){this.setAttribute('open','');};
 s.HTMLDialogElement.prototype.close=function(){if(this.open){this.removeAttribute('open');this.dispatchEvent(new s.Event('close'));}};
 s.eval(navigation);await settle(s);
 assert.equal(s.document.querySelectorAll('#ui-mobile-navigation a').length,3);
 assert.equal(s.document.querySelector('.work-hub-navigation'),null);
 s.document.getElementById('ui-mobile-more').click();assert.equal(s.document.getElementById('ui-mobile-tools').open,true);assert.equal(s.document.body.classList.contains('sidebar-open'),false);
 s.document.getElementById('ui-mobile-tools').dispatchEvent(new s.Event('cancel',{cancelable:true}));assert.equal(s.document.getElementById('ui-mobile-tools').open,false);
});
