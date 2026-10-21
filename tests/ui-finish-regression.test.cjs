const {test}=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const {JSDOM}=require('jsdom');

test('Flashcards keeps retired metrics inside their hidden wrapper and the live workspace outside',t=>{
  const dom=new JSDOM(fs.readFileSync('flashcards/index.html','utf8'));
  t.after(()=>dom.window.close());
  const d=dom.window.document;
  assert(d.querySelector('.flash-quick-metrics').closest('[hidden]'));
  const workspace=d.querySelector('.flash-section.active .qs-home-workspace');
  assert(workspace);
  assert.equal(workspace.closest('[hidden],[aria-hidden="true"]'),null);
  assert(workspace.querySelector('#review-launcher'));
  assert(workspace.querySelector('#flash-home-decks-search'));
  assert(workspace.querySelector('.flash-home-actions [data-flash-tab="create"]'));
  for(const id of ['quick-metric-due','quick-metric-correct','quick-metric-retention','quick-metric-reviews']){
    assert.equal(d.querySelectorAll('#'+id).length,1,id);
    assert(workspace.contains(d.getElementById(id)),id+' must receive updates in the live workspace');
  }
  assert.equal(d.querySelector('.flash-review-action-switch').parentElement.className,'flash-switches-inline');
});

test('Affected pages contain no visible standalone escaped newline between scripts',t=>{
  for(const file of ['caderno.html','caderno/index.html','configuracoes.html','configuracoes/index.html',
    'trabalho/gestor-plantoes/index.html','trabalho/plantoes/index.html',
    'trabalho/divisor-plantao/index.html','trabalho/financeiro/index.html']){
    const dom=new JSDOM(fs.readFileSync(file,'utf8'));
    const d=dom.window.document,walker=d.createTreeWalker(d.body,dom.window.NodeFilter.SHOW_TEXT);
    let node;
    while((node=walker.nextNode())){
      if(!node.parentElement.closest('script,style'))assert(!/^\s*\\n\s*$/.test(node.textContent),file);
    }
    dom.window.close();
  }
});
