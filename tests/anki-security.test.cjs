const {test} = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const {JSDOM,requestInterceptor} = require('jsdom');
const source = fs.readFileSync('assets/js/flashcards.js','utf8');
function declaration(name) {
  const start = source.search(new RegExp('^(?:async )?function '+name+'\\(', 'm'));
  assert.ok(start >= 0, name);
  const rest = source.slice(start + 1).search(/^(?:async )?function \w+\(/m);
  return source.slice(start, rest < 0 ? undefined : start + 1 + rest);
}
function fixture(t) {
  const requests=[];
  const dom=new JSDOM('<div id="import-summary"></div><div id="import-preview-wrap"><table><tbody id="import-preview-body"></tbody></table></div><button id="import-cards"></button><div id="review-front"></div>',{url:'http://fixture.invalid/',runScripts:'outside-only',resources:{interceptors:[requestInterceptor(request=>{requests.push(request.url);return new Response('');})]}});
  t.after(()=>dom.window.close());
  const w=dom.window;
  w.ankiDeckAreaMap=new Map();w.ankiDeckSubjectMap=new Map();w.ankiDeckThemeMap=new Map();
  for(const name of ['stripAnkiHtml','ankiMediaReferenceCount','replaceClozeForFront','replaceClozeForBack','fieldsToFlashcard','escapeFlashHtml','truncateText'])w.eval(declaration(name));
  return {w,requests};
}
for(const [name,input,expected] of [
  ['legitimate HTML','<p>Primeira <strong>linha</strong></p><div>Segunda<br>Terceira</div>','Primeira linha\nSegunda\nTerceira'],
  ['plain text','Texto simples\nsegunda linha','Texto simples\nsegunda linha'],
  ['cloze syntax','A {{c1::resposta::dica}} e {{c2::outra}}','A {{c1::resposta::dica}} e {{c2::outra}}'],
  ['entities and Unicode','&lt;b&gt; &amp; &quot;çã&quot; &#x1F9E0;&nbsp;β','<b> & "çã" 🧠 β'],
  ['formatting and paragraphs','<h2>Título</h2><ul><li><em>Um</em></li><li><u>Dois</u></li></ul>','Título\nUm\nDois'],
  ['sound markers','Frente [sound:audio.mp3] válida','Frente  válida']
])test('Anki preserves '+name,t=>{
  const {w,requests}=fixture(t);
  assert.equal(w.stripAnkiHtml(input),expected);
  assert.deepEqual(requests,[]);
});

function mappingFixture(t) {
  const f=fixture(t),w=f.w;
  w.document.body.insertAdjacentHTML('beforeend','<section id="anki-deck-map"><div id="anki-deck-map-list"></div></section><span id="anki-import-format"></span><p id="anki-media-note"></p><input id="import-file" type="file">');
  w.importFileKind='anki';w.ankiImportStats={packageFormat:'Anki legado',sourceDecks:['Root::Deck A','Root::Deck B'],mediaReferences:2};
  w.importRows=w.ankiImportStats.sourceDecks.map(source_deck=>({source_deck,front_text:'Frente',back_text:'Verso',area:'Clínica',materia:'',theme:null}));
  w.ankiDeckAreaMap=new Map(w.ankiImportStats.sourceDecks.map(deck=>[deck,'Clínica']));
  w.FLASHCARD_SUBJECTS_BY_AREA={'Clínica':['Matéria']};w.normalizeFlashAreaName=value=>value;
  for(const name of ['sourceDeckDefaultArea','renderAnkiDeckMap','renderImportPreview','resetImportUi'])w.eval(declaration(name));
  const change=(selector,value)=>{const el=w.document.querySelector(selector);el.value=value;el.dispatchEvent(new w.Event('change',{bubbles:true}));};
  return {...f,change};
}

test('Anki preview keeps per-deck themes through taxonomy changes and safely clears them',t=>{
  const {w,change,requests}=mappingFixture(t);w.renderImportPreview();
  assert.equal(w.document.querySelector('[data-anki-deck-theme="0"]').value,'');
  const theme='<img src=x onerror=alert(1)> & tema';
  change('[data-anki-deck-theme="0"]',theme);
  change('[data-anki-deck-subject="0"]','Matéria');
  change('[data-anki-deck-area="0"]','Clínica');
  assert.equal(w.importRows[0].theme,theme);assert.equal(w.importRows[1].theme,null);
  assert.equal(w.document.querySelector('[data-anki-deck-theme="0"]').value,theme);
  assert.equal(w.document.querySelectorAll('#anki-deck-map img, #anki-deck-map script').length,0);
  change('[data-anki-deck-theme="0"]','  ');
  assert.equal(w.importRows[0].theme,null);
  w.resetImportUi();assert.equal(w.ankiDeckThemeMap.size,0);assert.equal(w.ankiDeckSubjectMap.size,0);
  assert.deepEqual(requests,[]);
});

test('Anki import sends the selected theme and null for an unthemed deck through the existing RPC',async t=>{
  const {w,change}=mappingFixture(t);w.renderImportPreview();
  change('[data-anki-deck-theme="0"]','Tema personalizado');
  const calls=[];w.flashUser={id:'fixture-owner'};
  w.flashSb={from:()=>({insert:()=>({select:()=>({single:async()=>({data:{id:'fixture-import'},error:null})})})}),rpc:async(name,args)=>{calls.push({name,args});return{data:2,error:null};}};
  w.setFlashStatus=()=>{};for(const name of ['loadMetrics','loadReviewQueue','loadLibrary'])w[name]=async()=>{};
  w.eval(declaration('wireImport'));w.wireImport();w.document.getElementById('import-cards').click();
  for(let i=0;i<8;i++)await new Promise(resolve=>setImmediate(resolve));
  assert.equal(calls.length,1);assert.equal(calls[0].name,'bulk_create_flashcards');
  assert.equal(calls[0].args.p_cards[0].theme,'Tema personalizado');assert.equal(calls[0].args.p_cards[1].theme,null);
  assert.equal(calls[0].args.p_cards[0].front_text,'Frente');assert.equal(w.ankiDeckThemeMap.size,0);
});

test('Anki starts each package with fresh subject and theme mappings before building its preview',async t=>{
  const {w}=mappingFixture(t);w.ankiDeckThemeMap.set('Root::Deck A','Anterior');w.ankiDeckSubjectMap.set('Root::Deck A','Anterior');
  w.isAnkiPackageFile=()=>true;let parsed=false,preview=false;
  w.parseAnkiPackage=async()=>{parsed=true;assert.equal(w.ankiDeckThemeMap.size,0);assert.equal(w.ankiDeckSubjectMap.size,0);return[];};
  w.renderImportPreview=()=>{preview=true;};w.eval(declaration('parseImportFile'));
  await w.parseImportFile({name:'next.apkg'});assert.ok(parsed&&preview);
});
test('Anki malicious handlers, URLs and embedded documents remain inert',async t=>{
  const {w,requests}=fixture(t);
  w.auditExecuted=0;
  const attacks=[
    '<img src="https://audit.invalid/image" onerror="window.auditExecuted++">',
    '<svg onload="window.auditExecuted++"><image href="https://audit.invalid/svg"/></svg>',
    '<script src="https://audit.invalid/script">window.auditExecuted++</script>',
    '<iframe src="https://audit.invalid/frame" srcdoc="<script>parent.auditExecuted++</script>"></iframe>',
    '<object data="https://audit.invalid/object">objeto</object><embed src="https://audit.invalid/embed">',
    '<a href="javascript:window.auditExecuted++" onclick="window.auditExecuted++">Resposta</a>',
    '<link rel="stylesheet" href="https://audit.invalid/style"><style>@import "https://audit.invalid/css"</style>',
    '<template><img src="https://audit.invalid/nested" onerror="window.auditExecuted++"></template>',
    '</template><img src="https://audit.invalid/breakout" onerror="window.auditExecuted++"><template>',
    '<math><mtext><table><mglyph><style><!--</style><img title="--><img src=https://audit.invalid/mxss onerror=window.auditExecuted++>">'
  ];
  for(const attack of attacks) {
    const text=w.stripAnkiHtml('Legítimo '+attack+' fim');
    assert.equal(typeof text,'string');
    w.document.getElementById('review-front').textContent=text;
    assert.equal(w.document.getElementById('review-front').children.length,0);
  }
  await new Promise(resolve=>setImmediate(resolve));
  assert.equal(w.auditExecuted,0);
  assert.deepEqual(requests,[]);
});
test('Anki cloze conversion retains hints, answers and extra fields',t=>{
  const {w}=fixture(t);
  const card=w.fieldsToFlashcard(['<b>Conduta</b>: {{c1::ação::dica}} e {{c2::β}}','<p>Explicação &amp; revisão</p>']);
  assert.equal(card.front,'Conduta: [dica] e […]');
  assert.equal(card.back,'Conduta: ação e β\n\nExplicação & revisão');
});
test('Anki mixed input stays text through conversion, preview and stored payload fields',t=>{
  const {w,requests}=fixture(t);
  const card=w.fieldsToFlashcard(['<b>Frente</b><img src="https://audit.invalid/a" onerror="window.auditExecuted=1">','&lt;img src=x onerror=window.auditExecuted=1&gt;<br><em>Verso</em>']);
  assert.equal(card.front,'Frente');
  assert.equal(card.back,'<img src=x onerror=window.auditExecuted=1>\nVerso');
  w.importRows=[{front_text:card.front,back_text:card.back,source_deck:'<img src=x>',area:'Clínica'}];
  w.importFileKind='anki';w.ankiImportStats={sourceDecks:['Deck']};
  w.eval(declaration('renderImportPreview'));
  w.renderImportPreview(false);
  const body=w.document.getElementById('import-preview-body');
  assert.equal(body.querySelectorAll('img,script,iframe').length,0);
  assert.ok(body.textContent.includes('<img src=x onerror=window.auditExecuted=1>'));
  const stored=JSON.parse(JSON.stringify({front_text:card.front,back_text:card.back}));
  w.document.getElementById('review-front').textContent=stored.back_text;
  assert.equal(w.document.getElementById('review-front').children.length,0);
  assert.equal(w.auditExecuted,undefined);assert.deepEqual(requests,[]);
});
test('Anki package reader passes raw SQLite fields only through the inert converter',async t=>{
  const {w,requests}=fixture(t);
  let closed=false;
  const rows=[{flds:'<b>Pergunta</b>\u001fResposta <img src=https://audit.invalid/p onerror="window.auditExecuted=1">',deck_id:'1'}];
  w.openAnkiDatabase=async()=>({format:'fixture',database:{close(){closed=true;}}});
  w.setFlashStatus=()=>{};
  w.sqliteTableNames=()=>new Set(['notes','cards']);w.readAnkiDeckMap=()=>new Map([['1','Deck']]);
  w.readSqlRows=()=>rows;w.sourceDeckDefaultArea=()=>'';
  w.ankiDeckAreaMap=new Map();w.ankiDeckSubjectMap=new Map();
  w.eval(declaration('parseAnkiPackage'));
  const result=await w.parseAnkiPackage({name:'synthetic.apkg'});
  assert.equal(result[0].front_text,'Pergunta');assert.equal(result[0].back_text,'Resposta');
  assert.equal(w.ankiImportStats.mediaReferences,1);assert.equal(closed,true);
  assert.equal(w.auditExecuted,undefined);assert.deepEqual(requests,[]);
});

test('Anki encoded HTML stays literal in the actual library and review renderers',async t=>{
  const {w,requests}=fixture(t);
  const literal='<img src=https://audit.invalid/render onerror=window.auditExecuted=1>';
  const converted=w.fieldsToFlashcard([literal.replace(/</g,'&lt;').replace(/>/g,'&gt;'),'Resposta &lt;script&gt;window.auditExecuted=1&lt;/script&gt;']);
  const card={id:'synthetic-card',front_text:converted.front,back_text:converted.back,active:true};
  for(const id of ['library-list','library-empty','library-count','review-empty','review-stage','review-position','review-session-copy','review-back','review-answer','rating-actions','show-answer']){
    const node=w.document.createElement('div');node.id=id;w.document.body.appendChild(node);
  }
  w.filteredLibraryCards=()=>[card];w.selectedFlashcardIds=new Set();
  w.formatDueDate=()=>'';w.updateFlashBulkToolbar=()=>{};w.renderLibraryDecks=()=>{};
  w.eval(declaration('renderLibrary'));w.renderLibrary();
  const library=w.document.getElementById('library-list');
  assert.equal(library.querySelectorAll('img,script,iframe').length,0);
  assert.equal(library.querySelector('.library-card-front').textContent.trim(),literal);
  w.reviewSessionActive=true;w.reviewIndex=0;w.reviewQueue=[card];
  w.setTaxonomyChip=()=>{};w.setFlashStatus=()=>{};w.updateRatingLabels=()=>{};
  w.setReviewImage=async(_id,path)=>assert.equal(path,undefined);
  w.eval(declaration('renderCurrentReview'));await w.renderCurrentReview();
  for(const [id,text] of [['review-front',card.front_text],['review-back',card.back_text]]){
    const node=w.document.getElementById(id);assert.equal(node.textContent,text);assert.equal(node.children.length,0);
  }
  await new Promise(resolve=>setImmediate(resolve));
  assert.equal(w.auditExecuted,undefined);assert.deepEqual(requests,[]);
});
