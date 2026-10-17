const {test}=require('node:test');
const assert=require('node:assert/strict');
const {read,declaration,page}=require('./fixtures/frontend.cjs');

test('PDF layout choices resolve to implemented extraction presets on both question routes',t=>{
  const source=read('assets/js/questoes-simulados.js');
  const presets=source.slice(source.indexOf('const QS_SOURCE_PROFILES ='),source.indexOf('function currentExtractionSettings'));
  for(const file of ['questoes-simulados.html','questoes-simulados/index.html']){
    const {w,d}=page(t,file);
    w.eval(presets+'\nwindow.layoutPresets=QS_SOURCE_PROFILES;');
    const options=[...d.querySelectorAll('#qs-source-profile option')];
    assert.equal(options.length,7);
    for(const option of options)assert.equal(w.layoutPresets[option.value]?.label,option.textContent.trim());
  }
});

test('Neutral PDF layouts preserve numbered questions, generated-page filtering and structured answer keys',t=>{
  const source=read('assets/js/questoes-simulados.js');const {w}=page(t,'questoes-simulados/index.html');
  const names=['normalizeLine','normalizeSourceSpecificLine','isPdfHeaderLine','isAnswerKeyStart','extractStructuredAnswerKey'];
  w.eval(names.map(n=>declaration(source,n)).join('\n')+'\nwindow.pdfApi={normalizeSourceSpecificLine,isPdfHeaderLine,extractStructuredAnswerKey};');
  const api=w.pdfApi;
  for(const profile of ['numbered','blocks','commented','compact'])assert.equal(api.normalizeSourceSpecificLine('Questão 12: Uma pessoa com febre',profile),'12) Uma pessoa com febre');
  assert.equal(api.isPdfHeaderLine('Prova gerada em 17/10/2026'),true);
  assert.equal(api.isPdfHeaderLine('A pessoa apresenta dor torácica'),false);
  assert.deepEqual({...api.extractStructuredAnswerKey(['GABARITO','1) A 2) C 3) X'])},{1:'A',2:'C',3:'X'});
});
