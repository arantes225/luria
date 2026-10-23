const {test}=require('node:test'),assert=require('node:assert/strict');
const {read,declaration,page,settle}=require('./fixtures/frontend.cjs');
const {resolver}=require('./fixtures/questions.cjs');
const flush=async()=>{for(let i=0;i<5;i++)await settle()};

test('Global Alex access remains available in the application top bar',t=>{
 const {w,d}=page(t,'dashboard/index.html'),source=read('assets/js/luria-command-center.js');
 const topbar=d.querySelector('.topbar');
 topbar.innerHTML='<div class="luria-notifications"><button class="luria-pomodoro-top" type="button">00:00</button></div>';
 w.d=d;w.$=(selector,root=d)=>root.querySelector(selector);
 w.eval(declaration(source,'topbar')+'\n'+declaration(source,'installSearch'));
 w.installSearch();
 const alex=d.getElementById('luria-alex-topbar');
 assert(alex);assert.equal(alex.getAttribute('href'),'/professor-alex/');
 assert.equal(alex.getAttribute('aria-label'),'Abrir Professor Alex');
 assert.equal(alex.nextElementSibling.className,'luria-pomodoro-top');
});

test('Interactive question pages use source-neutral labels for external material',()=>{
 const files=['questoes-simulados/index.html','questoes-simulados.html','registrar-questoes/index.html','registrar-questoes.html'];
 for(const file of files) assert.doesNotMatch(read(file),/medcof|medcurso|medway|aristo|estrat[eé]gia med|sanar/i,file);
});

test('Study Rats presents each hall entry route as a primary action',()=>{
 const css=read('assets/css/review-continuation-20261022.css');
 assert.match(css,/body\[data-page="study-rats"\] \.sr-hall-button--secondary/);
 assert.match(css,/background: var\(--ui-pill-gradient, linear-gradient\(135deg, #4fc3f7, #7687ff\)\) !important;/);
 assert.match(css,/color: var\(--luria-btn-text-blue, #08101f\) !important;/);
});

test('Simulation library keeps content separate from tools and preserves selection/menu handlers',t=>{
 const {w,d}=page(t,'questoes-simulados/index.html'),source=read('assets/js/questoes-simulados.js');
 w.qsState={sets:[{id:'s1',title:'Título longo '.repeat(12),total_questions:18,metrics:{answered:2,correct:1,wrong:1}}],selectedSetIds:new Set()};
 w.qsEscape=String;w.accuracy=()=> '50%';w.updateSetBulkToolbar=()=>{};
 w.closeSimulationLibraryMenus=()=>d.querySelectorAll('[data-qs-library-menu]').forEach(x=>x.hidden=true);
 w.eval(declaration(source,'renderSimulationLibrary'));w.renderSimulationLibrary();
 const card=d.querySelector('.qs-library-card');assert.equal(card.children.length,2);assert(card.children[0].classList.contains('qs-library-card-top'));assert(card.children[1].classList.contains('qs-library-main'));
 assert.equal(card.querySelectorAll('.qs-library-stat').length,3);assert.equal(card.querySelector('h3').textContent,w.qsState.sets[0].title);
 const check=card.querySelector('input');check.checked=true;check.dispatchEvent(new w.Event('change'));assert(w.qsState.selectedSetIds.has('s1'));
 const button=card.querySelector('[data-qs-library-menu-trigger]'),menu=card.querySelector('[data-qs-library-menu]');button.click();assert.equal(menu.hidden,false);button.click();assert.equal(menu.hidden,true);
 w.renderSimulationLibrary();assert(d.querySelector('[data-select-set]').checked);
});

test('Answered questions expose a working comment toggle and ordered accessible navigation',async t=>{
 const {w,d,errors}=await resolver(t);const feedback=d.getElementById('qr-feedback'),toggle=d.getElementById('qr-comment-toggle');
 assert(toggle.hidden);assert(feedback.hidden);assert.equal(feedback.dataset.questionExtras,'off');
 const source=read('resolver-questoes/index.html');const inline=source.split(/\r?\n/).find(x=>x.includes('$("qr-comment-toggle").onclick='));w.eval(inline.replaceAll('$("','document.getElementById("'));
 d.querySelector('[data-opt="A"]').click();d.getElementById('qr-confirm').click();await flush();assert.equal(toggle.hidden,false);
 toggle.click();await flush();assert.equal(feedback.hidden,false);assert.equal(toggle.getAttribute('aria-expanded'),'true');
 toggle.click();assert(feedback.hidden);d.getElementById('qr-next').click();assert(toggle.hidden);assert(feedback.hidden);
 const numbers=[...d.querySelectorAll('.qr-answer-cell')];assert.deepEqual(numbers.map(x=>x.textContent.trim()),['1','2','3']);assert(numbers.every(x=>x.getAttribute('aria-label')));assert.equal(numbers[1].getAttribute('aria-current'),'step');assert.deepEqual(errors,[]);
});

test('Question enhancements respect reader opt-out and attach only one observer',t=>{
 const {w,d}=page(t,'resolver-questoes/index.html');let observers=0;
 w.MutationObserver=class{constructor(){observers++}observe(){}};w.d=d;w.$=(s,r=d)=>r.querySelector(s);w.all=(s,r=d)=>[...r.querySelectorAll(s)];w.esc=String;
 const source=read('assets/js/luria-command-center.js');w.eval(declaration(source,'enhanceQuestion')+'\n'+declaration(source,'relatedQuestionLinks'));
 const fb=d.getElementById('qr-feedback');fb.hidden=false;fb.innerHTML='<div class="qr-result wrong"></div>';w.enhanceQuestion();w.relatedQuestionLinks();assert.equal(observers,0);assert.equal(fb.children.length,1);
 delete fb.dataset.questionExtras;w.enhanceQuestion();w.enhanceQuestion();assert.equal(observers,1);assert.equal(fb.querySelectorAll('.luria-learning-actions').length,1);
});

function errorModal(t){
 const fixture=page(t,'caderno-erros/index.html'),{w,d}=fixture,source=read('assets/js/caderno-erros.js');
 w.HTMLDialogElement.prototype.showModal=function(){this.open=true};w.HTMLDialogElement.prototype.close=function(){this.open=false;this.dispatchEvent(new w.Event('close'))};
 for(const name of ['wireNewErrorAreaPicker','prepareNewErrorImage','extractNewErrorImageText','clearNewErrorSelectedImage'])w[name]=()=>{};
 w.saveNewError=()=>{};
 w.eval('let errorCreateOpener=null;'+['wireErrorCreateDialog','openErrorCreateDialog','closeErrorCreateDialog','toggleNewErrorForm','wireNewError'].map(n=>declaration(source,n)).join('\n'));
 w.wireErrorCreateDialog();w.wireErrorCreateDialog();w.wireNewError();return fixture;
}
test('Error creation uses one existing form, preserves draft on Escape/cancel and restores focus',t=>{
 const {w,d}=errorModal(t),original=d.getElementById('error-create-form'),opener=d.getElementById('error-home-create-action');opener.focus();w.openErrorCreateDialog();
 const dialog=d.getElementById('error-create-dialog');assert(dialog.open);assert.equal(dialog.querySelector('#error-create-form'),original);assert.equal(d.querySelectorAll('#error-create-form').length,1);assert.equal(d.activeElement.id,'new-error-area-toggle');
 d.getElementById('new-error-theme').value='Rascunho';dialog.dispatchEvent(new w.Event('cancel',{cancelable:true}));assert.equal(dialog.open,false);assert.equal(d.activeElement,opener);
 w.openErrorCreateDialog();assert.equal(d.getElementById('new-error-theme').value,'Rascunho');d.getElementById('cancel-new-error').click();assert.equal(dialog.open,false);assert.equal(d.getElementById('new-error-theme').value,'Rascunho');
});
test('Error modal cannot close while its existing save is pending',t=>{
 const {w,d}=errorModal(t);w.openErrorCreateDialog();d.getElementById('save-new-error').disabled=true;w.closeErrorCreateDialog();assert(d.getElementById('error-create-dialog').open);d.getElementById('save-new-error').disabled=false;w.closeErrorCreateDialog();assert.equal(d.getElementById('error-create-dialog').open,false);
});
test('A queued close event cannot hide a reopened error creation form',t=>{
 const {w,d}=errorModal(t);w.openErrorCreateDialog();w.closeErrorCreateDialog();w.openErrorCreateDialog();
 const dialog=d.getElementById('error-create-dialog');dialog.dispatchEvent(new w.Event('close'));
 assert(dialog.open);assert.equal(dialog.querySelector('.error-create-panel').hidden,false);
});
test('Direct creation link opens its modal after library initialization',async t=>{
 const {w,d}=errorModal(t);w.history.replaceState(null,'','?tab=create');w.docmapUser={id:'synthetic'};w.supabaseClient={};
 for(const n of ['wireErrorReview','wireErrorLibrary','setErrorHomeMode'])w[n]=()=>{};
 for(const n of ['loadErrorMetrics','loadErrorAreas','loadErrorLibrary','loadErrorQueue'])w[n]=async()=>{};
 w.switchErrorTab=()=>w.closeErrorCreateDialog();w.eval(declaration(read('assets/js/caderno-erros.js'),'initErrorNotebook'));
 await w.initErrorNotebook();await flush();const dialog=d.getElementById('error-create-dialog');
 assert(dialog.open);assert.equal(dialog.querySelector('.error-create-panel').hidden,false);assert.equal(d.querySelectorAll('#error-create-form').length,1);
});
test('Modal retains the existing create payload and reports rejected save without clearing fields',async t=>{
 const {w,d}=errorModal(t),calls=[],source=read('assets/js/caderno-erros.js');let fail=false;
 w.errorSb={rpc:async(name,args)=>{calls.push({name,args});if(fail)throw Error('Offline sintético');return{error:null}}};w.uploadErrorImage=async()=>null;w.preparedNewErrorImage=null;
 w.setNewErrorStatus=(message)=>d.getElementById('new-error-status').textContent=message;
 w.clearNewErrorForm=()=>{d.getElementById('new-error-ccq').value=''};
 for(const n of ['loadErrorMetrics','loadErrorAreas','loadErrorLibrary','loadErrorQueue'])w[n]=async()=>{};
 w.eval(declaration(source,'saveNewError'));d.getElementById('new-error-area').value='Clínica Médica';d.getElementById('new-error-ccq').value='Conceito de teste';w.openErrorCreateDialog();await w.saveNewError();
 assert.equal(calls[0].name,'create_error_entry');assert.equal(calls[0].args.p_ccq,'Conceito de teste');assert.match(d.getElementById('new-error-status').textContent,/adicionado/);assert.equal(d.getElementById('save-new-error').disabled,false);
 fail=true;d.getElementById('new-error-ccq').value='Rascunho após falha';await w.saveNewError();assert.equal(d.getElementById('new-error-ccq').value,'Rascunho após falha');assert.match(d.getElementById('new-error-status').textContent,/Offline/);
});

test('Note panel relocates the same nodes and keeps live handlers and responsive tools',async t=>{
 const {w,d}=page(t,'caderno/index.html');const toolbar=d.getElementById('notebook-toolbar'),editor=d.getElementById('notebook-editor');let mediaChanged;
 const media={matches:false,addEventListener:(type,fn)=>mediaChanged=fn};w.matchMedia=()=>media;
 let clicks=0;d.getElementById('notebook-bold').addEventListener('click',()=>clicks++);editor.textContent='Rascunho preservado';
 const source=read('assets/js/caderno-notion-editor-fix.js');w.eval(source.slice(source.indexOf('/* Stage 8.1:')));d.dispatchEvent(new w.Event('DOMContentLoaded'));await flush();
 assert.equal(d.querySelector('.note-canvas > #notebook-toolbar'),toolbar);assert(d.querySelector('.note-editing-panel .note-tree'));assert(d.querySelector('.note-editing-panel .note-info'));d.getElementById('notebook-bold').disabled=false;d.getElementById('notebook-bold').click();assert.equal(clicks,1);
 assert.equal(d.querySelector('.note-editing-panel > summary').nextElementSibling,d.querySelector('.note-info'));
 media.matches=true;mediaChanged();assert.equal(toolbar.parentElement,d.querySelector('.note-canvas'));assert.equal(d.querySelector('.note-editing-panel').open,false);
 media.matches=false;mediaChanged();assert.equal(toolbar.parentElement,d.querySelector('.note-canvas'));assert.equal(editor.textContent,'Rascunho preservado');assert.equal(d.querySelectorAll('#notebook-toolbar').length,1);
});

test('Flashcard return switches view without clearing fields or interrupting a live review',async t=>{
 const {w,d}=page(t,'flashcards/index.html');d.body.dataset.ui='v2';d.body.dataset.uiContext='study';d.body.dataset.page='flashcards';w.ResizeObserver=class{observe(){}disconnect(){}};
 const calls=[];w.luriaFlashShow=view=>calls.push(view);w.eval(read('assets/js/flashcards-ui-v2.js'));
 const create=d.querySelector('[data-flash-section="create"]'),back=d.querySelector('.ui-flash-back');create.classList.add('active');d.getElementById('create-front').value='Rascunho';await flush();assert.equal(back.hidden,false);assert.equal(back.parentElement,d.querySelector('[data-flash-section]').parentElement);
 back.click();assert.deepEqual(calls,['review']);assert.equal(d.getElementById('create-front').value,'Rascunho');d.body.classList.add('flash-review-session-active');await flush();assert(back.hidden);
});

test('Error review return belongs to content and has an explicit internal destination',t=>{
 const {d}=page(t,'caderno-erros/revisao/index.html'),back=d.querySelector('.error-review-page-back');assert.equal(back.getAttribute('href'),'/caderno-erros/');assert.equal(back.closest('.topbar'),null);assert(back.closest('.error-review-topline'));
});
