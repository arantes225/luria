function sharedCss(name) {
  const text=fs.readFileSync("assets/css/ui-app.css","utf8");
  const marker="/* "+name+" — base compartilhada */";
  const start=text.indexOf(marker);
  assert(start>=0,name+" shared section");
  // Source files also contain comments: use the next section boundary.
  const next=text.indexOf(" — base compartilhada */",start+marker.length);
  return text.slice(start,next<0?undefined:text.lastIndexOf("/* ",next));
}
const {test} = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const {JSDOM} = require('jsdom');
const code = fs.readFileSync('assets/js/dashboard-ui-v2.js', 'utf8');
const dashboardCode = fs.readFileSync('assets/js/dashboard.js', 'utf8');
const dashboardCss = fs.readFileSync('assets/css/dashboard-ui-v2.css', 'utf8');
const html = fs.readFileSync('dashboard/index.html', 'utf8');
// The navigation adapter schedules repairs through requestAnimationFrame.
const settle = () => new Promise(resolve => setTimeout(resolve, 50));
const dateKey = date => `${date.getFullYear()}-${String(date.getMonth()+1).padStart(2,'0')}-${String(date.getDate()).padStart(2,'0')}`;
function fixture(theme = 'light', saved = null, mobile = false) {
  const dom = new JSDOM(html, {url:'http://localhost/dashboard/', runScripts:'outside-only', pretendToBeVisual:true});
  const w = dom.window;
  Object.defineProperty(w, 'innerWidth', {value:mobile ? 390 : 1440, configurable:true});
  // jsdom has no inert reflection, and its RAF teardown can race a closed window.
  Object.defineProperty(w.HTMLElement.prototype, "inert", {
    get(){return this.hasAttribute("inert");},
    set(value){this.toggleAttribute("inert", Boolean(value));}, configurable:true
  });
  w.requestAnimationFrame = callback => w.setTimeout(callback, 0);
  w.cancelAnimationFrame = id => w.clearTimeout(id);
  const profile = w.document.createElement('div'); profile.id = 'luria-profile-menu';
  w.document.querySelector('.topbar').append(profile);
  w.document.documentElement.dataset.theme = theme;
  w.matchMedia = query => ({matches:query.includes('980') ? mobile : false, addEventListener(){}});
  let owner = 'A'; const storage = new Map();
  if (saved) storage.set('luria:dashboard-ui:v2:A', JSON.stringify(saved));
  w.TraubeLocalOwnerStore = {
    key:base => owner ? base+':'+owner : null,
    read:base => storage.get(base+':'+owner),
    write:(base,value) => {if (!owner) return false; storage.set(base+':'+owner,value);return true;}
  };
  const root = w.document.createElement('div');root.id='dashboard-alternative';
  root.innerHTML = '<div class="dl-grid"><div class="dl-agenda-study-pair"><section class="dl-agenda-large"><h3>Atividades</h3></section><section class="dl-study-now-card"><div data-luria-study-panel><h3>Estudar agora</h3><button data-luria-study-start>Iniciar</button><button class="active" data-luria-study-time="30">30 min</button></div></section></div><section class="dl-areas"><h3>Progresso</h3><div><span>Clínica</span><div class="dl-area-track"></div><strong>25%</strong></div></section></div>';
  w.document.querySelector('.topbar').after(root);
  w.eval(fs.readFileSync("assets/js/ui-theme-v2.js", "utf8"));
  w.eval(fs.readFileSync("assets/js/ui-navigation-v2.js", "utf8"));
  w.eval(code);
  w.document.dispatchEvent(new w.Event('DOMContentLoaded'));
  w.dispatchEvent(new w.Event('docmap:ready'));
  return {dom,w,root,storage,owner:value=>{owner=value;w.dispatchEvent(new w.Event('luria:owner-changed'));},click:(dimension,value)=>w.document.querySelector(`[data-ui-theme-control="${dimension}"][value="${value}"]`).click()};
}
test('Dashboard maps legacy light/dark/pink without writing account preferences', async () => {
  for (const [theme,appearance,identity] of [['light','light','blue'],['dark','dark','blue'],['leila-mood','light','pink'],['pink','light','pink'],['rosa','light','pink']]) {
    const f=fixture(theme);await settle();
    assert.equal(f.w.document.body.dataset.uiAppearance,appearance);
    assert.equal(f.w.document.body.dataset.uiIdentity,identity);
    assert.equal(f.w.document.documentElement.dataset.theme,theme);
    assert.equal(f.storage.size,0);
    f.dom.window.close();
  }
});
test('four combinations preserve nodes, study handlers and legacy theme; restore per account', async () => {
  const f=fixture();await settle();const start=f.root.querySelector('[data-luria-study-start]');let starts=0;start.onclick=()=>starts++;
  for (const appearance of ['light','dark']) for (const identity of ['blue','pink']) {
    f.click('appearance',appearance);f.click('identity',identity);await settle();
    assert.equal(f.w.document.body.dataset.uiAppearance,appearance);assert.equal(f.w.document.body.dataset.uiIdentity,identity);
    assert.equal(f.root.querySelector('[data-luria-study-start]'),start);start.click();
    assert.equal(f.w.document.documentElement.dataset.theme,'light');
    assert.equal(f.w.document.querySelectorAll('[data-ui-theme-control][aria-pressed="true"]').length,2);
  }
  assert.equal(starts,4);f.owner('B');assert.equal(f.w.document.body.dataset.uiAppearance,'light');assert.equal(f.w.document.body.dataset.uiIdentity,'blue');
  f.owner('A');assert.equal(f.w.document.body.dataset.uiAppearance,'dark');assert.equal(f.w.document.body.dataset.uiIdentity,'pink');
  f.dom.window.close();
});
test('corrupt or unavailable storage keeps themes usable and reports unsaved preference', async () => {
  const f=fixture('leila-mood',{appearance:'broken',identity:'pink'});await settle();
  assert.equal(f.w.document.body.dataset.uiAppearance,'light');
  f.w.TraubeLocalOwnerStore.write=()=>{throw Error('quota');};f.click('appearance','dark');
  assert.equal(f.w.document.body.dataset.uiAppearance,'dark');assert.match(f.w.document.getElementById('ui-theme-status').textContent,/Não foi possível salvar/);
  f.dom.window.close();
});
test('rerender preserves session-controller h3, restores review node, and separates pending data from zero', async () => {
  const f=fixture();await settle();const review=f.w.document.getElementById('ui-review-summary');
  assert.equal(review.querySelector('#ui-review-flashcards').textContent,'—');
  assert.ok(f.root.querySelector('[data-luria-study-panel] h3'));assert.ok(f.root.querySelector('.dl-agenda-large h2'));
  assert.equal(f.root.querySelector('.dl-agenda-study-pair').firstElementChild.className,'dl-study-now-card');
  const rendererHtml=f.root.innerHTML.replace(review.outerHTML,'');f.root.innerHTML=rendererHtml;
  f.w.luriaDashboardMetrics={'metric-flashcards':'0 pendentes','metric-errors':'3 ativos'};f.w.dispatchEvent(new f.w.Event('luria:dashboard-data'));await settle();
  assert.equal(f.w.document.querySelectorAll('#ui-review-summary').length,1);assert.equal(f.w.document.getElementById('ui-review-summary'),review);
  assert.equal(review.querySelector('#ui-review-flashcards').textContent,'0');assert.equal(review.querySelector('#ui-review-errors').textContent,'3');
  assert.equal(review.querySelector('#ui-review-errors').getAttribute('aria-label'),'3 ativos');
  assert.equal(f.root.querySelector('[role="progressbar"]').getAttribute('aria-valuenow'),'25');
  f.dom.window.close();
});
test('compact metrics keep existing counts; streak grammar and weekly labels do not invent history', async () => {
  const f=fixture();await settle();
  f.w.luriaDashboardTodayLessons={completed:2,total:4};
  f.w.dispatchEvent(new f.w.Event('luria:dashboard-data'));await settle();
  assert.equal(f.w.document.getElementById('ui-review-lessons').textContent,'2');
  f.w.luriaDashboardMetrics={'metric-flashcards':'1.234 pendentes'};
  f.w.dispatchEvent(new f.w.Event('luria:dashboard-data'));await settle();
  assert.equal(f.w.document.getElementById('ui-review-flashcards').textContent,'1.234');
  for(const count of [0,1,2]) {
    const streak=f.w.document.createElement('section');streak.className='dl-streak';
    streak.innerHTML='<h3>Ofensiva</h3><div class="dl-streak-value"><strong>'+count+' dias seguidos</strong></div><div class="dl-weekdays">'+['Seg','Ter','Qua','Qui','Sex','Sáb','Dom'].map((day,index)=>'<span class="'+(index<2?(count===1?'active':'on'):'')+'"><i></i>'+day+'</span>').join('')+'</div>';
    f.root.append(streak);await settle();
    assert.equal(streak.querySelector('.ui-streak-number').textContent,String(count));
    assert.equal(streak.querySelector('.ui-streak-label').textContent,count===1?'dia seguido':'dias seguidos');
    assert.equal(streak.querySelectorAll('[aria-current="date"]').length,1);
    assert.equal(streak.querySelectorAll('.dl-weekdays > span').length,7);
    assert.deepEqual([...streak.querySelectorAll('.dl-weekdays i')].map(n=>n.textContent),['S','T','Q','Q','S','S','D']);
    assert.equal(streak.querySelectorAll('.ui-week-marked,.dl-weekdays > .active,.dl-weekdays > .on').length,0);
    assert.match(streak.querySelector('.dl-weekdays').getAttribute('aria-label'),/histórico diário.*indisponível/);
    const today=(new f.w.Date().getDay()+6)%7;
    assert.equal(streak.querySelectorAll('.ui-week-future').length,6-today);
    assert.equal(streak.querySelector('.dl-weekdays > span').textContent,'S');
    assert.equal(streak.querySelectorAll('.ui-streak-note').length,1);
    assert.equal(streak.querySelector('h2,h3').textContent,'Sua ofensiva');
    assert.match(streak.querySelector('.ui-streak-note').textContent,count===0?/Comece sua sequência/:/Continue construindo/);
  }
  // Detach the observed UI before jsdom tears down its browsing context.
  f.w.document.body.remove(); await settle();
  f.dom.window.close();
});
test('streak days distinguish logged activity, no recorded activity, today and unavailable history on desktop and mobile', async () => {
  for (const mobile of [false,true]) {
    const f=fixture('light',null,mobile);await settle();
    const streak=f.w.document.createElement('section');streak.className='dl-streak';
    streak.innerHTML='<h3>Ofensiva</h3><div class="dl-streak-value"><strong>5 dias seguidos</strong></div><div class="dl-weekdays">'+['Seg','Ter','Qua','Qui','Sex','Sáb','Dom'].map(day=>'<span><i></i>'+day+'</span>').join('')+'</div>';
    f.root.querySelector('.dl-grid').append(streak);await settle();
    const today=(new f.w.Date().getDay()+6)%7, monday=new f.w.Date();monday.setHours(0,0,0,0);monday.setDate(monday.getDate()-today);
    const recordedIndexes=[Math.max(0,today-1),today];
    const recordedDates=recordedIndexes.map(index=>{const date=new f.w.Date(monday);date.setDate(date.getDate()+index);return dateKey(date);});
    f.w.luriaDashboardWeekActivity={status:'available',dates:recordedDates};
    f.w.dispatchEvent(new f.w.Event('luria:dashboard-data'));await settle();
    const days=[...streak.querySelectorAll('.dl-weekdays > span')];
    assert.deepEqual(days.map((day,index)=>day.classList.contains('ui-week-marked')?index:null).filter(index=>index!==null),[...new Set(recordedIndexes)]);
    assert.equal(days.filter(day=>day.classList.contains('ui-week-today')).length,1);
    assert.match(streak.querySelector('.ui-streak-legend').textContent,/Atividade registrada.*Sem atividade.*Hoje/);
    for(const appearance of ['light','dark'])for(const identity of ['blue','pink']){
      f.click('appearance',appearance);f.click('identity',identity);
      assert.equal(f.w.document.body.dataset.uiAppearance,appearance);
      assert.equal(f.w.document.body.dataset.uiIdentity,identity);
      assert.equal(streak.querySelectorAll('.ui-week-marked').length,new Set(recordedIndexes).size);
    }

    f.w.luriaDashboardWeekActivity={status:'available',dates:[]};
    f.w.dispatchEvent(new f.w.Event('luria:dashboard-data'));await settle();
    assert.equal(streak.querySelectorAll('.ui-week-marked').length,0);
    assert.equal(streak.querySelectorAll('.ui-week-empty').length,today+1);
    assert.equal(streak.querySelectorAll('.ui-week-future').length,6-today);
    assert.ok(days.slice(0,today+1).every(day=>/sem atividade registrada/.test(day.getAttribute('aria-label'))));

    f.w.luriaDashboardWeekActivity={status:'unavailable',dates:[]};
    f.w.dispatchEvent(new f.w.Event('luria:dashboard-data'));await settle();
    assert.equal(streak.querySelectorAll('.ui-week-marked,.ui-week-empty').length,0);
    assert.ok(days.slice(0,today+1).every(day=>/histórico indisponível/.test(day.getAttribute('aria-label'))));
    assert.match(streak.querySelector('.ui-streak-legend').textContent,/dias sem marcação não confirmam ausência/);
    f.w.document.body.remove();await settle();f.dom.window.close();
  }
});
test('weekly streak activity reads only positive-duration study sessions and preserves unavailable state on query error', async () => {
  const f=fixture();await settle();
  const start=f.w.Date ? new f.w.Date() : new Date();start.setHours(0,0,0,0);
  const delta=start.getDay()===0?-6:1-start.getDay();start.setDate(start.getDate()+delta);
  const first=new f.w.Date(start);const second=new f.w.Date(start);second.setDate(second.getDate()+2);
  const rows=[
    {started_at:new f.w.Date(first.setHours(12)).toISOString(),ended_at:new f.w.Date(first).toISOString(),duration_seconds:60},
    {started_at:new f.w.Date(second.setHours(12)).toISOString(),ended_at:new f.w.Date(second).toISOString(),duration_seconds:'120'},
    {started_at:new f.w.Date(start).toISOString(),ended_at:new f.w.Date(start).toISOString(),duration_seconds:0},
    {started_at:new f.w.Date(start).toISOString(),ended_at:new f.w.Date(start).toISOString(),duration_seconds:null},
    {started_at:'invalid-date',ended_at:'invalid-date',duration_seconds:60}
  ];
  const ranges=[],filters=[],warnings=[];
  const builder={
    select(columns){assert.equal(columns,'started_at,ended_at,duration_seconds');return this;},
    not(...filter){filters.push(filter);return this;},
    gte(field,value){ranges.push([field,value]);return this;},
    lt(field,value){ranges.push([field,value]);return Promise.resolve({data:rows,error:null});}
  };
  f.w.dashboardSb={from(table){assert.equal(table,'study_sessions');return builder;}};
  f.w.console.warn=(...args)=>warnings.push(args);
  const loader=dashboardCode.slice(dashboardCode.indexOf('async function loadDashboardWeekActivity() {'),dashboardCode.indexOf('\n}',dashboardCode.indexOf('async function loadDashboardWeekActivity() {'))+2).replace('async function loadDashboardWeekActivity()', 'async function ()');
  f.w.eval(`
    function startOfDay(date){return new Date(date.getFullYear(),date.getMonth(),date.getDate());}
    function addDays(date,amount){const result=startOfDay(date);result.setDate(result.getDate()+amount);return result;}
    function startOfWeek(date){const day=date.getDay();return addDays(date,day===0?-6:1-day);}
    function toISODate(date){return date.getFullYear()+"-"+String(date.getMonth()+1).padStart(2,"0")+"-"+String(date.getDate()).padStart(2,"0");}
    window.loadDashboardWeekActivity=${loader};
  `);
  await f.w.loadDashboardWeekActivity();
  assert.equal(f.w.luriaDashboardWeekActivity.status,'available');
  assert.deepEqual(Array.from(f.w.luriaDashboardWeekActivity.dates),[dateKey(first),dateKey(second)]);
  assert.deepEqual(ranges.map(([field])=>field),['started_at','started_at']);
  assert.deepEqual(filters,[['ended_at','is',null],['duration_seconds','is',null]]);
  const nextMonday=new f.w.Date(start);nextMonday.setDate(nextMonday.getDate()+7);
  assert.equal(ranges[0][1],start.toISOString());assert.equal(ranges[1][1],nextMonday.toISOString());
  f.w.dashboardSb={from:()=>({select(){return this;},not(){return this;},gte(){return this;},lt(){return Promise.resolve({data:null,error:new Error('offline')});}})};
  await f.w.loadDashboardWeekActivity();
  assert.equal(f.w.luriaDashboardWeekActivity.status,'unavailable');
  assert.deepEqual(Array.from(f.w.luriaDashboardWeekActivity.dates),[]);
  assert.match(warnings[0][0],/histórico semanal de estudo/);
  f.dom.window.close();
});
test('streak colors follow shared primary theme tokens in all appearance and identity combinations', () => {
  assert.match(dashboardCss,/--ui-streak-color:var\(--color-primary\)/);
  assert.match(dashboardCss,/--ui-streak-surface:var\(--color-primary-subtle\)/);
  assert.doesNotMatch(dashboardCss,/data-ui-appearance="dark"\] :is\(\.dl-streak,.dl5-streak\)/);
  assert.doesNotMatch(dashboardCss,/--ui-streak-(?:color|surface):#[0-9A-Fa-f]{3,8}/);
  const f=fixture();for(const appearance of ['light','dark'])for(const identity of ['blue','pink']){
    f.click('appearance',appearance);f.click('identity',identity);
    assert.equal(f.w.document.body.dataset.uiAppearance,appearance);assert.equal(f.w.document.body.dataset.uiIdentity,identity);
  }
  f.dom.window.close();
});
test('summary preserves lesson/agenda counts and percent meaning when separating its labels', async () => {
  const f=fixture();await settle();
  const summary=f.w.document.createElement('section');summary.className='dl-day-summary';
  summary.innerHTML='<h3>Resumo do dia</h3><div class="dl-summary-body"><div class="dl-ring"><div><strong>25%</strong><small>aulas concluídas</small></div></div><div><strong>4 aulas hoje</strong><span>1 concluída</span><span>3 atividades na agenda</span></div></div>';
  f.root.querySelector('.dl-grid').append(summary);await settle();
  assert.equal(summary.parentElement,f.root.querySelector('.dl-agenda-large'));
  assert.equal(summary.querySelector('.dl-ring').getAttribute('aria-label'),'25% das aulas de hoje concluídas');
  assert.deepEqual([...summary.querySelectorAll('.ui-summary-stat strong')].map(n=>n.textContent),['1','3']);
  assert.deepEqual([...summary.querySelectorAll('.ui-summary-stat > span')].map(n=>n.textContent),['aula concluída','atividades na agenda']);
  assert.equal(summary.querySelector('.ui-summary-total').textContent,'4 aulas hoje');
  f.w.dispatchEvent(new f.w.Event('luria:dashboard-data'));await settle();
  assert.equal(summary.querySelectorAll('.ui-summary-stat').length,2);
  f.dom.window.close();
});

test('dashboard relocates rendered streak and cat nodes once and refreshes them on rerender', async t => {
  const f = fixture(); t.after(() => f.w.close()); await settle();
  assert.equal(f.w.document.querySelector('.ui-theme-controls'), null);
  assert.equal(f.w.document.querySelectorAll('#luria-profile-menu [data-ui-theme-control]').length, 4);
  for (const days of [1, 2]) {
    const grid = f.root.querySelector('.dl-grid');
    const streak = f.w.document.createElement('section'); streak.className = 'dl-streak';
    streak.innerHTML = '<div class="dl-streak-value"><strong>'+days+' dias seguidos</strong></div>';
    const cat = f.w.document.createElement('section'); cat.className = 'dl-cat';
    cat.innerHTML = '<a href="/caderno-erros/">Pulo</a>';
    grid.append(streak, cat); await settle();
    assert.equal(f.w.document.querySelector('.ui-header-streak').firstElementChild, streak);
    assert.equal(grid.lastElementChild, cat);
    assert.equal(f.w.document.querySelectorAll('.dl-streak').length, 1);
    assert.equal(f.w.document.querySelectorAll('.dl-cat').length, 1);
    assert.equal(streak.querySelector('.ui-streak-number').textContent, String(days));
    grid.replaceChildren(); await settle();
  }
});
test('mobile sidebar is inert when closed; page remains usable and Escape restores the trigger', async () => {
  const f=fixture('light',null,true);await settle();
  const sidebar=f.w.document.getElementById('sidebar');const main=f.w.document.getElementById('dashboard-content');
  assert.equal(sidebar.inert,true);f.w.document.getElementById('menu-open').click();await settle();
  assert.equal(sidebar.inert,false);assert.equal(main.inert,false);
  f.w.document.dispatchEvent(new f.w.KeyboardEvent('keydown',{key:'Escape'}));await settle();
  assert.equal(sidebar.inert,true);assert.equal(main.inert,false);assert.equal(f.w.document.activeElement.id,'menu-open');
  f.dom.window.close();
});
test('adapter is inactive on protected pages', () => {
  const dom=new JSDOM('<body data-page="plantao"><button>Preservado</button></body>',{runScripts:'outside-only'});
  const before=dom.window.document.documentElement.outerHTML;dom.window.eval(code);
  assert.equal(dom.window.document.documentElement.outerHTML,before);dom.window.close();
});
test('a failed render has visible recovery links without changing activities', async () => {
  const f=fixture();await settle();f.root.dataset.rendered='false';await settle();
  const fallback=f.w.document.getElementById('dashboard-fallback-shell');
  assert.equal(fallback.hidden,false);assert.match(fallback.textContent,/Não foi possível exibir/);
  assert.ok(fallback.querySelector('a[href="/configuracoes/"]'));
  f.root.dataset.rendered='true';await settle();assert.equal(fallback.hidden,true);
  f.dom.window.close();
});
test('all new style rules are opt-in, including media queries; protected entries do not load them', () => {
  const dom=new JSDOM('<html><head></head><body></body></html>');
  for (const file of ['ui-v2-foundations.css','dashboard-ui-v2.css','ui-navigation-v2.css','education-ui-v2.css','work-ui-v2.css','admin-ui-v2.css','pcr-ui-v2.css']) {
    const style=dom.window.document.createElement('style');style.textContent=(["ui-v2-foundations.css","ui-navigation-v2.css"].includes(file)?sharedCss(file):fs.readFileSync('assets/css/'+file,'utf8'));dom.window.document.head.append(style);
    assert.ok(style.sheet,'CSS must parse');let rules=0;
    const selectors=text=>{
      let depth=0,start=0;const result=[];
      for(let i=0;i<text.length;i++){if('(['.includes(text[i]))depth++;else if(')]'.includes(text[i]))depth--;else if(text[i]===','&&depth===0){result.push(text.slice(start,i));start=i+1;}}
      return [...result,text.slice(start)];
    };
    const inspect=list=>{for(const rule of list){if(rule.selectorText){rules++;for(const selector of selectors(rule.selectorText))assert.ok(/\[data-ui(?:-shell|-nav|-work|-admin|-pcr)?="v2"\]/.test(selector),selector);}else if(rule.cssRules)inspect(rule.cssRules);else if(rule.style?.getPropertyValue('font-family'))assert.equal(rule.style.getPropertyValue('font-family'),'"Traube Inter"');}};
    inspect(style.sheet.cssRules);assert.ok(rules>0);
  }
  for(const file of ['index.html','login/index.html','trabalho/prontuario/index.html']) {
    assert.doesNotMatch(fs.readFileSync(file,'utf8'),/ui-v2|data-ui="v2"/);
  }
  dom.window.close();
});
test('existing study dialog gets a name, isolates background and returns focus after Escape', async () => {
  const f=fixture();await settle();const opener=f.root.querySelector('[data-luria-study-start]');opener.focus();
  const overlay=f.w.document.createElement('div');overlay.id='luria-session-overlay';
  overlay.innerHTML='<section role="dialog"><h2>Estudar agora</h2><button class="luria-intel-close">Fechar</button><button>Iniciar sessão</button></section>';
  overlay.querySelector('.luria-intel-close').onclick=()=>overlay.remove();f.w.document.body.append(overlay);await settle();
  assert.equal(f.w.document.activeElement,overlay.querySelector('.luria-intel-close'));
  assert.equal(f.w.document.querySelector('.app-shell').inert,true);
  assert.equal(overlay.querySelector('[role="dialog"]').getAttribute('aria-labelledby'),'luria-session-overlay-title');
  f.w.document.dispatchEvent(new f.w.KeyboardEvent('keydown',{key:'Escape'}));await settle();
  assert.equal(f.w.document.querySelector('.app-shell').inert,false);assert.equal(f.w.document.activeElement,opener);
  f.dom.window.close();
});


test("migrated modules load foundations once and keep PCR priority ahead of the work bridge", () => {
  const paths = ["dashboard","cronograma","aprender","consolidar","flashcards","caderno-erros","questoes-simulados","estatisticas","desafio-diario","editais","amigos","plantao/sala-emergencia","trabalho","trabalho/passometro","trabalho/prontuario-rapido","trabalho/prescricao","trabalho/calculadora","trabalho/scores","trabalho/diagnostico","trabalho/fluidos-eletrólitos","trabalho/gestor-plantoes","trabalho/pcr","trabalho/pcr/executar","trabalho/pcr/historico","admin"];
  for (const path of paths) {
    // This guard inspects link order; legacy inline styles are outside its scope.
    const html = fs.readFileSync(path+"/index.html", "utf8").replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, "");
    const dom = new JSDOM(html);
    const styles = require("../scripts/check-css.cjs").stylesForPage(path+"/index.html").map(href=>href.split("?")[0].split("/").pop());
    assert.equal(styles.filter(name => name === "ui-app.css").length, 1, path);
    const foundation = styles.indexOf("ui-app.css");
    for (const name of styles.filter(name => /^(ui-navigation|education|dashboard|flashcards|community|plantao|work|admin|pcr)-.*v2\.css$/.test(name))) assert.ok(styles.indexOf(name) > foundation, path+": "+name);
    if (styles.includes("pcr-ui-v2.css")) assert.ok(styles.indexOf("pcr-ui-v2.css") < styles.indexOf("work-ui-v2.css"), path);
    dom.window.close();
  }
});
