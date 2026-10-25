const test=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs');
const {JSDOM,VirtualConsole}=require('jsdom');
const code=fs.readFileSync('assets/js/ui-navigation-v2.js','utf8');
const wait=()=>new Promise(resolve=>setTimeout(resolve,35));
function fixture(t,{installed=true,ios=false,width=390,height=844,touch=true,work=false,authenticated=true,page,pathname,context,embedded=false}={}){
 const study=['/dashboard/','/cronograma/','/aprender/','/consolidar/','/jogos/','/desafio-diario/','/plantao/sala-emergencia/','/estatisticas/','/aplicar/','/amigos/'];
 const professional=['/trabalho/','/trabalho/paciente/','/trabalho/passometro/','/trabalho/prontuario-rapido/','/trabalho/prescricao/','/trabalho/calculadora/','/trabalho/scores/','/trabalho/diagnostico/','/trabalho/fluidos-eletrólitos/','/trabalho/gestor-plantoes/','/trabalho/pcr/historico/'];
 const paths=work?professional:study,errors=[],console=new VirtualConsole();console.on('jsdomError',e=>errors.push(e.message));
 const dom=new JSDOM(`<html ${embedded?'class="room-native-embed"':''}><body class="${authenticated?'app-ready':''}" data-ui-nav="v2" data-ui-context="${context||(work?'work':'study')}" data-page="${page||(work?'trabalho_dashboard':'dashboard')}" ${work?'data-ui-work="v2" data-ui-work-navigation="hub"':''}><div class="app-shell"><aside id="sidebar" class="sidebar"><div class="sidebar-top"><a class="brand" href="${paths[0]}">LURIA</a></div><nav>${paths.map(href=>`<a href="${href}">${href}</a>`).join('')}<a href="/admin/" hidden>Admin</a></nav>${work?'<a class="work-pcr-button" href="/trabalho/pcr/">PCR</a>':''}<a class="luria-mode-footer-switch" href="${work?'/dashboard/':'/trabalho/'}">Trocar ambiente</a></aside><div id="sidebar-backdrop"></div><header class="topbar"><button id="menu-open">Menu</button><div class="luria-notifications"><button id="luria-profile-toggle">Perfil</button><div id="luria-profile-menu" hidden><a href="/configuracoes/">Configurações</a></div></div></header><main class="main"><div class="page"><button id="page-action">Ação</button><section id="plantao-simulator" hidden></section></div></main></div></body></html>`,{url:'https://fixture.invalid'+(pathname||paths[0]),runScripts:'outside-only',pretendToBeVisual:true,virtualConsole:console});
 const w=dom.window,d=w.document,media=new Map(),enabled=new Set(['flashcards','plantao','questions','error_notebook']);
 Object.defineProperty(w.navigator,'standalone',{value:ios});Object.defineProperty(w.navigator,'maxTouchPoints',{value:touch?1:0});
 w.docmapUser=authenticated?{id:'test-user'}:null;w.LuriaEntitlements={enabled:key=>enabled.has(key)};w.LuriaDialog={alert:message=>{w.lastAlert=message;}};
 let isInstalled=installed,viewWidth=width,viewHeight=height;
 const matches=query=>query==='(display-mode: standalone)'?isInstalled:query==='(pointer: coarse)'?touch:query.includes('max-height: 600px')?(viewWidth<=767||viewWidth<=980&&viewHeight<=600):query==='(max-width: 980px)'?viewWidth<=980:false;
 w.matchMedia=query=>{if(!media.has(query))media.set(query,{get matches(){return matches(query);},listeners:[],addEventListener(_,fn){this.listeners.push(fn);}});return media.get(query);};
 w.HTMLDialogElement.prototype.showModal=function(){this.setAttribute('open','');};
 w.HTMLDialogElement.prototype.close=function(){if(!this.open)return;this.removeAttribute('open');this.dispatchEvent(new w.Event('close'));};
 // jsdom has no layout; model visible controls for the focus-related shell adapter.
 w.HTMLElement.prototype.getClientRects=function(){return this.closest('[hidden]')?[]:[{width:44,height:44}];};
 w.eval(code);d.dispatchEvent(new w.Event('DOMContentLoaded'));
 t.after(()=>w.close());
 return {w,d,enabled,errors,async ready(){await wait();},async resize(nextWidth,nextHeight=844){viewWidth=nextWidth;viewHeight=nextHeight;for(const m of media.values())for(const fn of m.listeners)fn();await wait();},async installed(value){isInstalled=value;for(const m of media.values())for(const fn of m.listeners)fn();await wait();}};
}

test('bottom navigation follows the shared mobile breakpoint independently of installation or input',async t=>{
 for(const options of [{width:1440},{width:981},{width:1024,installed:false},{authenticated:false},{context:'public'},{embedded:true}]){
  const f=fixture(t,options);await f.ready();assert.equal(f.d.getElementById('ui-mobile-navigation'),null,JSON.stringify(options));
 }
 for(const options of [{},{width:320},{width:412},{width:768},{width:980},{width:844,height:390},{installed:false},{width:390,touch:false},{installed:false,ios:true}]){
  const f=fixture(t,options);await f.ready();assert.equal(f.d.querySelectorAll('#ui-mobile-navigation > *').length,4,JSON.stringify(options));
 }
});

test('study shortcuts use real destinations, keep the web sidebar and track nested modules',async t=>{
 const f=fixture(t,{page:'flashcards',pathname:'/flashcards/revisao/'});await f.ready();
 const rail=f.d.getElementById('ui-mobile-navigation');assert.deepEqual([...rail.querySelectorAll('a')].map(n=>n.getAttribute('href')),['/dashboard/','/aprender/','/consolidar/']);
 assert.deepEqual([...rail.children].map(n=>n.textContent),['Dashboard','Apostilas','Consolidar','Mais']);
 assert.equal(rail.querySelector('[aria-current]').textContent,'Consolidar');assert.equal(f.d.getElementById('menu-open').hidden,true);
 for(const [page,pathname,label] of [['questoes','/questoes-simulados/','Consolidar'],['erros','/caderno-erros/','Consolidar'],['caderno','/caderno/','Apostilas'],['plantao','/plantao/sala-emergencia/','Mais']]){
  const nested=fixture(t,{page,pathname});await nested.ready();assert.equal(nested.d.querySelector('#ui-mobile-navigation [aria-current]').textContent,label);
 }
 const original=f.d.querySelector('#sidebar a[href="/dashboard/"]');await f.resize(1440);
 assert.equal(f.d.getElementById('ui-mobile-navigation'),null);assert.equal(f.d.getElementById('menu-open').hidden,false);assert.equal(original.isConnected,true);
 await f.resize(390);assert.equal(f.d.querySelectorAll('#ui-mobile-navigation').length,1);assert.deepEqual(f.errors,[]);
});

test('More groups available modules, closes on cancel and destination, and restores focus',async t=>{
 const f=fixture(t);await f.ready();const more=f.d.getElementById('ui-mobile-more'),sheet=f.d.getElementById('ui-mobile-tools');
 more.click();assert.equal(sheet.open,true);assert.equal(more.getAttribute('aria-expanded'),'true');assert.equal(f.d.activeElement,sheet.querySelector('[data-mobile-close]'));
 assert(sheet.querySelector('a[href="/configuracoes/"]'),"settings remain available while the profile popup is closed");assert(sheet.querySelectorAll('section').length>=4);assert(!sheet.querySelector('a[href="/admin/"]'));
 assert(sheet.querySelector('a[href="/flashcards/"]'));assert(sheet.querySelector('a[href="/plantao/sala-emergencia/"]'));
 for(const link of sheet.querySelectorAll('a')){const route=decodeURIComponent(link.pathname);assert(fs.existsSync('.'+route+'index.html'),route);}
 sheet.dispatchEvent(new f.w.Event('cancel',{cancelable:true}));assert.equal(sheet.open,false);assert.equal(f.d.activeElement,more);
 more.click();const target=sheet.querySelector('a[href="/amigos/"]');target.addEventListener('click',e=>e.preventDefault());target.click();assert.equal(sheet.open,false);
 more.click();sheet.querySelector('[data-mobile-close]').click();assert.equal(sheet.open,false);assert.equal(more.getAttribute('aria-expanded'),'false');
});

test('account restrictions and changes never become unguarded links',async t=>{
 const f=fixture(t);await f.ready();f.enabled.delete('flashcards');f.w.dispatchEvent(new f.w.Event('docmap:access-updated'));await f.ready();
 const card=f.d.querySelector('#ui-mobile-tools a[href="/flashcards/"]');assert.equal(card.getAttribute('aria-disabled'),'true');
 const click=new f.w.MouseEvent('click',{bubbles:true,cancelable:true});assert.equal(card.dispatchEvent(click),false);assert(f.w.lastAlert);
 const admin=f.d.querySelector('#sidebar a[href="/admin/"]');admin.hidden=false;await f.ready();assert(f.d.querySelector('#ui-mobile-tools a[href="/admin/"]'));
 admin.hidden=true;await f.ready();assert(!f.d.querySelector('#ui-mobile-tools a[href="/admin/"]'));
 f.w.docmapUser=null;f.w.dispatchEvent(new f.w.Event('luria:owner-changed'));await f.ready();assert.equal(f.d.getElementById('ui-mobile-navigation'),null);
});

test('Work shortcuts use its tools and preserve PCR and environment destinations',async t=>{
 const f=fixture(t,{work:true,page:'trabalho_scores',pathname:'/trabalho/scores/'});await f.ready();
 const rail=f.d.getElementById('ui-mobile-navigation');assert.equal(rail.children.length,6);assert.equal(rail.querySelector('[aria-current]').textContent,'Ferramentas');
 assert(rail.querySelector('a[href="/trabalho/prescricao/"]'));assert(rail.querySelector('[data-mobile-pcr][href="/trabalho/pcr/"]'));
 f.d.getElementById('ui-mobile-tools-trigger').click();const sheet=f.d.getElementById('ui-mobile-tools');assert.equal(sheet.open,true);assert.equal(sheet.querySelector('h2').textContent,'Ferramentas médicas');
 assert(sheet.querySelector('a[href="/trabalho/bulario/"]'));assert(sheet.querySelector('section[data-mobile-medical="false"]').hidden);
 sheet.querySelector('[data-mobile-close]').click();f.d.getElementById('ui-mobile-more').click();assert(sheet.querySelector('a[href="/dashboard/"]'));assert(sheet.querySelector('a[href="/trabalho/pcr/historico/"]'));
});

test('focus sessions, clinical cases and fullscreen suspend only the bottom navigation',async t=>{
 const f=fixture(t,{page:'plantao',pathname:'/plantao/sala-emergencia/'});await f.ready();const sim=f.d.getElementById('plantao-simulator');
 sim.hidden=false;await f.ready();assert.equal(f.d.body.dataset.uiMobileNavigation,undefined);assert.equal(f.d.getElementById('menu-open').hidden,false);
 sim.hidden=true;await f.ready();assert.equal(f.d.body.dataset.uiMobileNavigation,'true');
 f.d.body.classList.add('flash-review-session-active');await f.ready();assert.equal(f.d.body.dataset.uiMobileNavigation,undefined);
 f.d.body.classList.remove('flash-review-session-active');await f.ready();assert.equal(f.d.body.dataset.uiMobileNavigation,'true');
 const overlay=f.d.createElement('div');overlay.id='luria-session-overlay';f.d.body.append(overlay);await f.ready();assert.equal(f.d.body.dataset.uiMobileNavigation,undefined);overlay.hidden=true;await f.ready();assert.equal(f.d.body.dataset.uiMobileNavigation,'true');
 Object.defineProperty(f.d,'fullscreenElement',{configurable:true,value:f.d.querySelector('main')});f.d.dispatchEvent(new f.w.Event('fullscreenchange'));await f.ready();assert.equal(f.d.body.dataset.uiMobileNavigation,undefined);
 Object.defineProperty(f.d,'fullscreenElement',{configurable:true,value:null});f.d.dispatchEvent(new f.w.Event('fullscreenchange'));await f.ready();assert.equal(f.d.body.dataset.uiMobileNavigation,'true');
 const rail=f.d.getElementById('ui-mobile-navigation');await f.installed(false);assert.equal(f.d.getElementById('ui-mobile-navigation'),rail,'installation never selects the navigation model');
 f.d.getElementById('ui-mobile-more').click();await f.resize(1440);assert.equal(f.d.getElementById('ui-mobile-tools'),null);assert.equal(f.d.getElementById('menu-open').hidden,false);
});
