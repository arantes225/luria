const {test}=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const {JSDOM,VirtualConsole,requestInterceptor}=require('jsdom');
const read=file=>fs.readFileSync(file,'utf8');
const app=read('assets/js/app.js'),notebook=read('assets/js/caderno.js'),admin=read('assets/js/admin.js');
function declaration(source,name,indent=''){
  const start=source.search(new RegExp('^'+indent+'(?:async )?function '+name+'\\(', 'm'));
  assert.ok(start>=0,name);
  // Function boundaries use the source's own indentation, including closures.
  const end=source.indexOf('\n'+indent+'}',start);
  assert.ok(end>=0,name+' end');return source.slice(start,end+indent.length+2);
}
function fixture(t,html=''){
  const requests=[],errors=[],console=new VirtualConsole();
  console.on('jsdomError',e=>{if(!/navigation/i.test(e.message))errors.push(e);});
  const dom=new JSDOM(html,{url:'http://fixture.invalid/caderno/',runScripts:'dangerously',virtualConsole:console,
    resources:{interceptors:[requestInterceptor(req=>{requests.push(req.url);return new Response('');})]}});
  t.after(()=>dom.window.close());const w=dom.window;
  w.eval(declaration(app,'luriaSafeContentUrl'));
  return{w,requests,errors};
}
function notebookFixture(t,html=''){
  const f=fixture(t,html),w=f.w;
  w.eval(notebook.slice(notebook.indexOf('const ALLOWED_TAGS'),notebook.indexOf('const notebookState')).replace('const ALLOWED_TAGS','window.ALLOWED_TAGS'));
  for(const name of ['escapeHtml','sanitizeHtml','prepareNotebookLazyImageHtml','notebookHtmlForSave'])w.eval(declaration(notebook,name));
  w.NOTEBOOK_LAZY_IMAGE_PLACEHOLDER='data:image/svg+xml,'+encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg"/>');
  return f;
}
function assertSafe(root){
  assert.equal(root.querySelectorAll('script,iframe,object,embed,svg,math,style,template').length,0);
  for(const node of root.querySelectorAll('*'))for(const attribute of node.attributes){
    assert.ok(!/^on/i.test(attribute.name),attribute.name);
    if(['src','href'].includes(attribute.name))assert.ok(!/^\s*(javascript|vbscript|data:text\/html):/i.test(attribute.value),attribute.value);
  }
}
const attack='<img src="https://audit.invalid/hostile" onerror="window.auditExecuted=1"><svg onload="window.auditExecuted=2"></svg><iframe src="https://audit.invalid/frame"></iframe><script>window.auditExecuted=3</script>';

test('URL validation rejects executable, obfuscated, credential and protocol-relative destinations',t=>{
  const {w}=fixture(t);
  for(const url of ['javascript:window.auditExecuted=1','JaVaScRiPt:alert(1)','java\nscript:alert(1)','&#106;avascript:alert(1)','data:text/html,<script>1</script>','vbscript:msgbox(1)','//audit.invalid/x','/\\audit.invalid/x','https://user:secret@audit.invalid','file:///tmp/a']){
    assert.equal(w.luriaSafeContentUrl(url,{relative:true}),'',url);
  }
  for(const url of ['https://example.org/a?x=1&y=2','http://example.org/doc','/amigos/?id=123','#section','?q=texto'])assert.equal(w.luriaSafeContentUrl(url,{relative:true}),url);
  assert.equal(w.luriaSafeContentUrl('mailto:study@example.invalid',{mailto:true}),'mailto:study@example.invalid');
  assert.equal(w.luriaSafeContentUrl('mailto:study@example.invalid'),'');
});

test('Caderno native formatting, Unicode, tables, alignment and study blocks survive sanitization',t=>{
  const {w,requests}=notebookFixture(t);
  const input='<h2>Título çã 🧠</h2><p style="text-align:center;line-height:1.5">Texto <strong>forte</strong> <em>ênfase</em><br>&amp; &lt;literal&gt;</p><ul><li>Item</li></ul><blockquote>Citação</blockquote><span style="color:rgb(24,72,136);background-color:#fff;font-family:Arial">Cor</span><div class="notebook-study-block warning"><div>Alerta</div></div><hr class="notebook-divider dotted"><table><tbody><tr><td colspan="2">Célula</td></tr></tbody></table>';
  const host=w.document.createElement('div');host.innerHTML=w.sanitizeHtml(input);
  assert.equal(host.querySelector('strong').textContent,'forte');assert.equal(host.querySelector('em').textContent,'ênfase');
  assert.equal(host.querySelector('p').style.textAlign,'center');assert.equal(host.querySelector('p').style.lineHeight,'1.5');
  assert.equal(host.querySelector('td').colSpan,2);assert.equal(host.querySelector('span').style.fontFamily,'Arial');
  assert.ok(host.querySelector('.notebook-study-block.warning'));assert.ok(host.querySelector('hr.dotted'));
  assert.ok(host.textContent.includes('çã 🧠'));assert.ok(host.textContent.includes('& <literal>'));assert.deepEqual(requests,[]);
});

test('Caderno sanitizer stays inert even while unwrapping disallowed containers',async t=>{
  const {w,requests}=notebookFixture(t);
  const input='<a><div><h2>Válido</h2>'+attack+'</div></a><template>'+attack+'</template><math><mtext><table><mglyph><style><!--</style><img title="--><img src=https://audit.invalid/mxss onerror=window.auditExecuted=1>">';
  const host=w.document.createElement('div');host.innerHTML=w.sanitizeHtml(input);w.document.body.append(host);
  assertSafe(host);assert.equal(host.querySelector('h2').textContent,'Válido');
  for(const node of host.querySelectorAll('*'))node.dispatchEvent(new w.Event('error'));
  await new Promise(resolve=>setImmediate(resolve));assert.equal(w.auditExecuted,undefined);assert.deepEqual(requests,[]);
  assert.equal(w.sanitizeHtml(w.sanitizeHtml(input)),w.sanitizeHtml(input));
});

test('Caderno native image policy and save/reopen retain allowed image data and formatting',t=>{
  const {w,requests}=notebookFixture(t);
  const html='<p><b>Imagem</b></p><img src="data:image/png;base64,iVBORw0KGgo=" alt="A &amp; B"><img src="/assets/img/demo.webp" alt="Local"><img src="javascript:1" onerror="window.auditExecuted=1">';
  const editor=w.document.createElement('div');editor.innerHTML=w.prepareNotebookLazyImageHtml(html);
  const saved=w.notebookHtmlForSave(editor),reopened=w.prepareNotebookLazyImageHtml(saved);
  editor.innerHTML=reopened;assertSafe(editor);assert.equal(editor.querySelectorAll('img').length,2);
  assert.equal(editor.querySelector('b').textContent,'Imagem');assert.equal(editor.querySelector('img').alt,'A & B');assert.deepEqual(requests,[]);
});

test('Caderno shared realtime updates use the actual safe rendering path and keep local edits',t=>{
  const {w,requests}=notebookFixture(t,'<div id="notebook-editor"></div>');
  const note={id:'shared-note',user_id:'author',is_shared:true,topic_id:'topic'};
  w.notebookState={user:{id:'reader'},notesById:new Map(),notesByTopic:new Map(),editorDirty:false};
  w.noteById=()=>note;w.sharedMembershipFor=()=>({mode:'edit'});w.getCurrentDocument=()=>({note});
  w.renderLibrary=()=>{};w.setSaveStatus=()=>{};
  w.eval(declaration(notebook,'applyNotebookRealtimeUpdate'));
  w.applyNotebookRealtimeUpdate({...note,content_html:'<h2>Compartilhado</h2><p><b>Preservado</b></p>'+attack});
  const editor=w.document.getElementById('notebook-editor');assertSafe(editor);assert.equal(editor.querySelector('b').textContent,'Preservado');
  editor.textContent='Edição ainda não salva';w.notebookState.editorDirty=true;
  w.applyNotebookRealtimeUpdate({...note,content_html:attack});assert.equal(editor.textContent,'Edição ainda não salva');assert.deepEqual(requests,[]);
});

test('Caderno outline parser reads hostile persisted headings without activating the source',async t=>{
  const {w,requests}=notebookFixture(t,'<div id="notebook-topic-list"></div><span id="notebook-topic-count"></span>');
  w.getCurrentDocument=()=>({note:{content_html:'<h2>Título &amp; revisão</h2>'+attack}});
  w.eval(declaration(notebook,'renderTopicList'));w.renderTopicList();
  assert.equal(w.document.getElementById('notebook-topic-count').textContent,'1');
  assert.ok(w.document.getElementById('notebook-topic-list').textContent.includes('Título & revisão'));
  await new Promise(resolve=>setImmediate(resolve));assert.deepEqual(requests,[]);assert.equal(w.auditExecuted,undefined);
});

test('Notion reader sanitizes the actual API response and preserves rich blocks and safe links',async t=>{
  const {w,requests}=notebookFixture(t,'<div id="notebook-notion-reader" hidden><div class="notebook-notion-reader"><h2 id="notebook-notion-reader-title"></h2><span id="notebook-notion-reader-updated"></span><a id="notebook-notion-open-original"></a><div id="notebook-notion-reader-content"></div></div></div>');
  w.notionSourceState={};
  const html='<h2 data-notion-block-id="heading-id" data-notion-block-type="heading_2" data-notion-editable="1">Notion</h2><pre><code>const x = 1;</code></pre><div class="notebook-study-block warning"><span class="notebook-callout-icon">💡</span><div class="notebook-callout-content"><p>Callout <b>formatado</b></p></div></div><a href="https://example.org" target="_blank">Fonte</a><a href="javascript:window.auditExecuted=1">Hostil</a>'+attack;
  w.invokeNotionFunction=async()=>({page:{title:'<Título>',url:'javascript:window.auditExecuted=1',html}});
  w.eval(declaration(notebook,'openNotionPage'));w.eval(declaration(notebook,'beginNotionEdit'));
  await w.openNotionPage({id:'page',url:'javascript:window.auditExecuted=1'});
  const content=w.document.getElementById('notebook-notion-reader-content');assertSafe(content);
  assert.equal(content.querySelector('pre code').textContent,'const x = 1;');assert.ok(content.querySelector('.notebook-callout-content b'));
  assert.equal(content.querySelector('a').href,'https://example.org/');assert.equal(content.querySelectorAll('a')[1].hasAttribute('href'),false);
  assert.equal(w.document.getElementById('notebook-notion-open-original').getAttribute('href'),'#');
  w.beginNotionEdit();assert.equal(content.querySelector('h2').getAttribute('contenteditable'),'true');
  await w.openNotionPage({id:'page'});assertSafe(content);assert.equal(content.querySelector('h2').hasAttribute('contenteditable'),false);
  assert.equal(w.auditExecuted,undefined);assert.deepEqual(requests,[]);
});

test('Notion main editor keeps block identity through reopening and saving edits',async t=>{
  const {w,requests}=notebookFixture(t,'<div id="notebook-editor"></div><h2 id="notebook-document-title"></h2><span id="notebook-document-area"></span>');
  // jsdom has no layout-based innerText; this fixture provides its text equivalent.
  Object.defineProperty(w.HTMLElement.prototype,'innerText',{get(){return this.textContent;},set(v){this.textContent=v;},configurable:true});
  const calls=[],note={id:'note',storage_source:'notion',notion_page_id:'page',topic_title:'Título',area:'Clínica'};
  let remote='<p data-notion-block-id="block-id" data-notion-block-type="paragraph" data-notion-editable="1">Original <b>forte</b></p>'+attack;
  w.notebookSb={functions:{invoke:async(_name,{body})=>{calls.push(body);if(body.action==='update_block')remote='<p data-notion-block-id="block-id" data-notion-block-type="paragraph" data-notion-editable="1">'+w.escapeHtml(body.text)+'</p>';return{data:{page:{html:remote,url:'https://notion.so/page'}}};}}};
  w.notebookState={user:{id:'owner'},notesById:new Map([['note',note]]),editorDirty:false};w.noteById=()=>note;w.getCurrentDocument=()=>({note});
  for(const name of ['openFreeNote','openNotionPage','saveCurrentNotebookContent','saveCurrentNotebook','switchView','renderDocument','setSaveStatus','setNotebookEditMode','renderTopicList','refreshNotebookInspector','renderLibrary','closeNotionReader'])w[name]=async()=>{};
  w.eval(read('assets/js/caderno-notion-editor-fix.js'));
  await w.openFreeNote('note');const editor=w.document.getElementById('notebook-editor');assertSafe(editor);
  assert.equal(editor.querySelector('b').textContent,'forte');assert.equal(editor.querySelector('p').dataset.notionBlockId,'block-id');
  editor.querySelector('p').textContent='Editado & preservado';await w.saveCurrentNotebookContent();
  assert.equal(calls.filter(c=>c.action==='update_block').length,1);assert.equal(calls.filter(c=>c.action==='append_block').length,0);
  assert.equal(calls.find(c=>c.action==='update_block').block_id,'block-id');
  await w.openFreeNote('note');assert.equal(editor.textContent,'Editado & preservado');assertSafe(editor);assert.deepEqual(requests,[]);
});

test('Admin queue renderers reject dangerous URLs and escape persisted titles and attributes',t=>{
  const {w}=fixture(t,'<div id="admin-images-list"></div><div id="admin-apostila-images-list"></div>');
  w.$=id=>w.document.getElementById(id);w.clinicalImageLabel=()=>'';w.eval(declaration(admin,'esc','  '));
  for(const name of ['renderClinicalImageReviewQueue','renderApostilaImageReviewQueue'])w.eval(declaration(admin,name,'  '));
  const row={id:1,source_url:'javascript:window.auditExecuted=1',source_name:'<img onerror="window.auditExecuted=1">',proposed_asset:{src:'data:text/html,<script>1</script>',alt:'" onerror="window.auditExecuted=1',caption:'Texto & çã'}};
  w.renderClinicalImageReviewQueue([row]);w.renderApostilaImageReviewQueue([row]);
  for(const id of ['admin-images-list','admin-apostila-images-list']){const root=w.$(id);assertSafe(root);assert.equal(root.querySelectorAll('img,a').length,0);assert.ok(root.textContent.includes(row.source_name));}
  row.source_url='https://example.org/source';row.proposed_asset.src='/assets/img/demo.webp';
  w.renderClinicalImageReviewQueue([row]);w.renderApostilaImageReviewQueue([row]);
  for(const id of ['admin-images-list','admin-apostila-images-list']){const root=w.$(id);assertSafe(root);assert.equal(root.querySelector('a').href,row.source_url);assert.equal(root.querySelector('img').alt,row.proposed_asset.alt);assert.equal(root.querySelectorAll('button').length>=2,true);}
});

test('Admin customer and feedback renderers keep user-controlled text literal',t=>{
  const {w}=fixture(t,'<span id="admin-customer-count"></span><table><tbody id="admin-customer-body"></tbody></table><div id="admin-beta-feedback-list"></div>');
  const hostile='"/><img src="https://audit.invalid/a" onerror="window.auditExecuted=1">';
  w.$=id=>w.document.getElementById(id);w.state={betaFeedback:[{display_name:hostile,email:hostile,positives:hostile,improvements:hostile}]};
  w.filteredCustomers=()=>[{user_id:'id',display_name:hostile,email:hostile,plan:'essential'}];
  for(const name of ['esc','formatNumber','formatPercent','formatDateTime','renderCustomers','renderBetaFeedback'])w.eval(declaration(admin,name,'  '));
  for(const name of ['formatSubscriptionTime','formatHours','formatCustomerMemory','formatDate'])w[name]=()=>'';
  w.renderCustomers();w.renderBetaFeedback();assertSafe(w.document.body);
  assert.equal(w.document.querySelectorAll('img').length,0);assert.equal(w.$('admin-customer-body').querySelector('strong').textContent,hostile);
  assert.equal(w.$('admin-customer-body').querySelector('select').getAttribute('aria-label'),'Plano de '+hostile);
  assert.ok(w.$('admin-beta-feedback-list').textContent.includes(hostile));assert.equal(w.auditExecuted,undefined);
});

test('Notifications loaded through the actual mocked Supabase query cannot navigate to executable URLs',async t=>{
  const {w}=fixture(t,'<div id="luria-notification-list"></div><span id="luria-notification-badge"></span>');
  const rows=[{id:'1',title:'<img onerror=1>',body:'Texto & revisão',href:'javascript:window.auditExecuted=1'},{id:'2',href:'/amigos/?id=2'}];
  w.supabaseClient={from:()=>({select(_fields,opts){this.count=opts?.head;return this;},order(){return this;},limit(){return Promise.resolve({data:rows});},is(){return Promise.resolve({count:2});}})};
  w.sb=w.supabaseClient;
  w.ensureNotificationCenter=()=>{};w.notificationIcon=()=>'';w.notificationTimeLabel=()=>'';
  w.eval(declaration(app,'escapeHtml'));w.eval(declaration(app,'loadNotifications'));
  await w.loadNotifications();const links=w.document.querySelectorAll('.luria-notification-item');
  assert.equal(links[0].getAttribute('href'),'/amigos/');assert.equal(links[1].getAttribute('href'),rows[1].href);
  assert.equal(links[0].querySelector('strong').textContent.trim(),rows[0].title);assertSafe(w.document.body);
});

const tick=()=>new Promise(resolve=>setImmediate(resolve));
function mockTables(w,tables){
  w.supabaseClient={from:table=>({select(){return this;},order(){return this;},limit(){return this;},then(resolve){resolve({data:tables[table]||[],error:null});}})};
  w.matchMedia=()=>({matches:false});w.HTMLElement.prototype.scrollIntoView=function(){};
}
test('Protocol full load, source links, image dialog and clinical bridge keep their rendering contracts',async t=>{
  const {w,errors}=fixture(t,'<input id="protocol-search"><select id="protocol-category"></select><div id="protocol-list"></div><div id="protocol-detail"></div><span id="protocol-count"></span><p id="protocol-empty"></p>');
  const sent=[];
  w.LuriaClinicalBridge={toQuickChart:value=>sent.push(value)};
  w.HTMLDialogElement.prototype.showModal=function(){this.open=true;};
  w.HTMLDialogElement.prototype.close=function(){this.open=false;this.dispatchEvent(new w.Event('close'));};
  const row={id:1,title:'Título <literal>',category:'Clínica',setting:'Ambulatório',summary:'Texto & çã',status:'verified',source_refs:[{url:'javascript:window.auditExecuted=1',label:'Hostil'},{url:'https://example.org/reference?a=1&b=2',label:'Fonte'}],image_assets:[{src:'/assets/img/demo.webp',caption:'Imagem & explicação',alt:'" onerror="window.auditExecuted=1'}]};
  mockTables(w,{clinical_protocols:[row]});w.eval(read('assets/js/trabalho-protocolos.js'));await tick();
  const detail=w.document.getElementById('protocol-detail'),links=detail.querySelectorAll('.protocol-refs a');
  assert.equal(links[0].getAttribute('href'),'#');assert.equal(links[1].getAttribute('href'),row.source_refs[1].url);assertSafe(detail);
  detail.querySelector('[data-image-src]').click();assert.equal(w.document.querySelector('dialog img').getAttribute('src'),row.image_assets[0].src);
  w.document.querySelector('dialog button').click();assert.equal(w.document.querySelector('dialog'),null);
  detail.querySelector('[data-send-note]').click();assert.equal(sent[0].title,row.title);assert.ok(sent[0].text.includes(row.summary));
  assert.equal(w.auditExecuted,undefined);assert.deepEqual(errors,[]);
});

test('Bulario full load and presentation selection escape attributes without changing dose calculations',async t=>{
  const {w,errors}=fixture(t,'<input id="drug-search"><div id="drug-list"></div><div id="drug-detail"></div><span id="drug-count"></span>');
  const hostile='1" autofocus onfocus="window.auditExecuted=1';
  const calculator={type:'mg_kg_day',renal_gate:true,min_mg_kg_day:10,max_mg_kg_day:30,default_mg_kg_day:20,min_weight_kg:1,max_weight_kg_exclusive:40,doses_per_day:3};
  const formulation={label:'Apresentação & çã',source_url:'javascript:window.auditExecuted=1',strength_mg_ml:10,calculator};
  const row={id:363,name:'Nome',active_ingredient:'Princípio ativo',data:{status:'posology_verified',leaflet_url:'data:text/html,<script>1</script>',formulations:[formulation,{...formulation,label:'Hostil',calculator:{...calculator,min_mg_kg_day:hostile,max_mg_kg_day:hostile,default_mg_kg_day:hostile}}]}};
  mockTables(w,{bulario_catalog:[row]});w.eval(read('assets/js/bulario.js'));await tick();
  const detail=w.document.getElementById('drug-detail');assertSafe(detail);
  assert.equal(detail.querySelector('.rx-presentation a').getAttribute('href'),'#');assert.equal([...detail.querySelectorAll('a')].at(-1).href,'https://consultas.anvisa.gov.br/#/bulario/');
  detail.querySelector('.rx-weight').value='10';detail.querySelector('.rx-age').value='5';detail.querySelector('.rx-renal').value='normal';
  detail.querySelector('.rx-rate').dispatchEvent(new w.Event('input',{bubbles:true}));
  assert.match(detail.querySelector('.rx-result').textContent,/200 mg\/dia/);
  detail.querySelectorAll('.rx-presentation-tab')[1].click();assertSafe(detail);
  assert.equal(detail.querySelector('.rx-rate').getAttribute('min'),hostile);assert.equal(detail.querySelector('[autofocus]'),null);
  detail.querySelectorAll('.rx-presentation-tab')[0].click();assert.equal(detail.querySelector('.rx-rate').value,'20');
  assert.equal(w.auditExecuted,undefined);assert.deepEqual(errors,[]);
});

test('Recipe full mocked load preserves list selection and rejects executable source links',async t=>{
  const ids=['recipe-list','recipe-detail','recipe-empty','recipe-count-all','recipe-count-verified','recipe-count-review','recipe-count-protocol'];
  const {w,errors}=fixture(t,'<input id="recipe-search"><select id="recipe-status-filter"></select><select id="recipe-category-filter"></select>'+ids.map(id=>'<div id="'+id+'"></div>').join(''));
  const sent=[],row={id:1,slug:'synthetic',title:'Receita <literal>',category:'Clínica',status:'verified',data:{copy_ready:true,references:[{url:'javascript:window.auditExecuted=1',label:'Hostil'},{url:'https://example.org/reference',label:'Fonte'}]}};
  w.LuriaClinicalBridge={toQuickChart:value=>sent.push(value)};mockTables(w,{recipe_bank:[row]});
  w.eval(read('assets/js/trabalho-receitas.js'));await tick();
  w.document.querySelector('#recipe-list [data-recipe-id]').click();const detail=w.document.getElementById('recipe-detail');
  assertSafe(detail);assert.equal(detail.querySelector('a').getAttribute('href'),'#');assert.equal(detail.querySelectorAll('a')[1].href,row.data.references[1].url);
  detail.querySelector('[data-send-note]').click();assert.equal(sent[0].title,row.title);assert.deepEqual(errors,[]);
});

test('Admin and public edital cards reject stored executable links and retain labels and controls',t=>{
  const row={id:1,institution:'Instituição <literal>',source_edital_url:'javascript:window.auditExecuted=1',edital_url:'data:text/html,<script>1</script>',review_status:'pending'};
  for(const [file,names,renderName,ids] of [
    ['assets/js/admin-editais.js',['esc','dateValue','moneyValue','setBadge','filteredItems','render'],'render',['admin-editais-list','admin-editais-empty','admin-editais-count']],
    ['assets/js/editais-catalog.js',['escapeHtml','normalizeNationalLabel','formatDate','formatRegistration','statusClass','filteredRows','renderCatalog'],'renderCatalog',['catalog-list','catalog-empty','catalog-count']]
  ]){
    const {w}=fixture(t,ids.map(id=>'<div id="'+id+'"></div>').join(''));
    w.$=id=>w.document.getElementById(id);w.state={items:[row],pendingCount:1};w.rows=[row];
    const source=read(file);for(const name of names)w.eval(declaration(source,name,'  '));
    w[renderName]();assertSafe(w.document.body);assert.equal(w.document.querySelector('a').getAttribute('href'),'#');
    assert.ok(w.document.body.textContent.includes(row.institution));assert.ok(w.document.querySelector('button'));
    row.source_edital_url=row.edital_url='https://example.org/edital';w[renderName]();assert.equal(w.document.querySelector('a').href,row.edital_url);
    row.source_edital_url='javascript:window.auditExecuted=1';row.edital_url='data:text/html,<script>1</script>';
  }
});

test('Both Plantao debrief renderers validate sources without changing outcome text',t=>{
  const ids=['plantao-sources','plantao-debrief-title','plantao-diagnosis','plantao-final-score','plantao-pulo'];
  const {w}=fixture(t,ids.map(id=>'<div id="'+id+'"></div>').join(''));
  w.$=id=>w.document.getElementById(id);
  w.eval(declaration(admin,'esc','  '));
  w.state={current:{title:'Caso sintético',debrief:{diagnosis:'Diagnóstico',pulo_do_gato:'Explicação'},source_refs:[{url:'javascript:window.auditExecuted=1',title:'Hostil'},{url:'https://example.org/fonte',title:'Fonte'}]},clinicalEvents:[],sequenceViolations:[],disaster:{victims:[]}};
  w.E={requiredActions:()=>[]};
  const source=read('assets/js/plantao.js');
  for(const name of ['renderDebrief','renderDisasterDebrief']){
    w.eval(declaration(source,name,'  '));w[name](80,[],[]);
    const links=w.$('plantao-sources').querySelectorAll('a');assert.equal(links[0].getAttribute('href'),'#');assert.equal(links[1].href,w.state.current.source_refs[1].url);
    assert.equal(w.$('plantao-final-score').textContent,'80');assert.equal(w.$('plantao-debrief-title').textContent,'Caso sintético');assertSafe(w.document.body);
  }
});

test('Apostila approved figures, review cards and lightbox share the URL protection',t=>{
  const {w}=fixture(t,'<div class="book-hero"></div><div id="lightbox" hidden><img></div>');
  w.eval(declaration(admin,'esc','  '));w.isAdmin=true;
  w.rows=[{id:1,review_status:'pending',source_name:'Fonte <literal>',source_url:'javascript:window.auditExecuted=1',proposed_asset:{src:'data:text/html,<script>1</script>',alt:'" onmouseover="window.auditExecuted=1',caption:'Descrição & çã'}}];
  w.ensureLightbox=()=>w.document.getElementById('lightbox');
  const source=read('assets/js/apostila-tools.js');for(const name of ['getAsset','createApprovedFigure','expandImage','renderReviewPanel'])w.eval(declaration(source,name,'  '));
  let figure=w.createApprovedFigure(w.rows[0]);assertSafe(figure);assert.equal(figure.querySelector('a').getAttribute('href'),'#');assert.equal(figure.querySelector('img').getAttribute('src'),'');
  w.renderReviewPanel();const panel=w.document.getElementById('apostila-image-curation');assert.equal(panel.querySelector('a').getAttribute('href'),'#');assert.equal(panel.querySelector('img').getAttribute('src'),'');
  // This trusted, constant fallback handler is preserved for the later CSP stage.
  assert.ok(panel.querySelector('img').getAttribute('onerror').includes('Imagem indisponível'));assert.equal(panel.querySelector('img').hasAttribute('onmouseover'),false);
  panel.querySelector('[data-apostila-image-expand]').click();assert.equal(w.document.getElementById('lightbox').hidden,false);assert.equal(w.document.querySelector('#lightbox img').getAttribute('src'),'');
  w.rows[0].source_url='https://example.org/fonte';w.rows[0].proposed_asset.src='/assets/img/demo.webp';
  figure=w.createApprovedFigure(w.rows[0]);assert.equal(figure.querySelector('a').href,w.rows[0].source_url);assert.equal(figure.querySelector('img').getAttribute('src'),w.rows[0].proposed_asset.src);
  assert.equal(figure.querySelector('img').alt,w.rows[0].proposed_asset.alt);assert.ok(figure.textContent.includes('Descrição & çã'));
});

test('Saved personal exams render safe URLs while keeping selection controls',t=>{
  const {w}=fixture(t,'<div id="exam-list"></div><div id="exam-empty"></div>');
  const source=read('assets/js/editais.js');
  const row={id:'exam-id',institution:'Instituição <literal>',edital_url:'javascript:window.auditExecuted=1',registration_url:'data:text/html,<script>1</script>',status:'planned'};
  w.filteredExams=()=>[row];w.examSortValue=()=>0;w.examSimulationMetrics=new Map();w.highlightedExamId=null;w.selectedExamIds=new Set();
  w.normalizeNationalLabel=String;w.updateExamBulkToolbar=()=>{};
  for(const name of ['examEscape','examFormatDate','examFormatMoney','examStatusLabel','examScoreLabel'])w.eval(declaration(source,name));
  w.eval(declaration(source,'renderExams'));w.renderExams();assertSafe(w.document.body);
  assert.ok(w.document.querySelectorAll('a').length>=2);for(const a of w.document.querySelectorAll('a'))assert.equal(a.getAttribute('href'),'#');
  const select=w.document.querySelector('[data-select-exam]');select.checked=true;select.dispatchEvent(new w.Event('change'));assert.equal(w.selectedExamIds.has(row.id),true);
  assert.ok(w.document.getElementById('exam-list').textContent.includes(row.institution));
});
