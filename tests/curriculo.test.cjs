const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const { JSDOM } = require('jsdom');
const core = require('../assets/js/curriculo-core.js');
const pdf = require('../assets/js/curriculo-pdf.js');
const root = path.resolve(__dirname, '..');
const sandbox = { window: {} };
vm.runInNewContext(fs.readFileSync(path.join(root,'assets/js/curriculo-rubricas.js'),'utf8'),sandbox);
const rubric = sandbox.window.LuriaCurriculoRubricas[0];
test('FMUSP caps every group and applies ENAMED before the final 100 cap', () => {
  const answers = {};
  rubric.criteria.forEach(row => row.parts.forEach(part => { answers[part.id] = 999; }));
  answers.multiplier = '5';
  const score = core.score(rubric, answers);
  assert.equal(score.subtotal, 100);
  assert.equal(score.total, 100);
  assert.equal(score.multiplier,1.2);
  assert.equal(core.score(rubric,{m2:1,s1:2,multiplier:'4'}).total,7.7);
  assert.equal(core.score({...rubric,status:'pending'},answers),null);
});
test('malformed, negative, fractional and incompatible inputs cannot inflate scores', () => {
  assert.equal(core.score(rubric,{s1:-2,m1:Infinity,a1:'bad'}).total,0);
  assert.equal(core.score(rubric,{s1:1.9}).total,2);
  assert.equal(core.score(rubric,{d2:1,d3:1}).total,4);
});
test('suggestions require reviewed eligibility data and never infer it from a Lattes title',()=>{
  const items=[
    {category:'monitoria',hours:'128',reviewed:true,meta:{semesters:'2',official:true}},
    {category:'artigo',title:'PubMed ACLS',reviewed:false,meta:{index:'pubmed',separateFromIC:true}},
    {category:'pesquisa',reviewed:true,meta:{semesters:'2',funding:'yes',published:'no'}},
    {category:'curso',year:'2026',reviewed:true,meta:{course:'ACLS',certifier:'AHA',inPerson:true,validForRegistration:true}},
    {category:'curso',year:'2026',reviewed:true,meta:{course:'BLS',certifier:'AHA',inPerson:false,validForRegistration:true}}
  ];
  const suggested=core.suggestFmusp(items);
  assert.equal(suggested.m2,1);assert.equal(suggested.a1,0);assert.equal(suggested.p2,1);assert.equal(suggested.s1,1);
  assert.equal(core.score(rubric,suggested).total,7);
});
test('PSU-MG preserves the official 13-point scale and exclusive academic bands',()=>{
  const psu=sandbox.window.LuriaCurriculoRubricas.find(row=>row.institution==='PSU-MG');
  assert.match(psu.updates,/Retificacao2aosEditaisdoPSUMG2027-20261006110849\.pdf/);
  assert.match(psu.criteria.find(row=>row.id==='mg-cursos').note,/últimos 5 anos/);
  assert.match(psu.criteria.find(row=>row.id==='mg-cursos').note,/não valem documentos de instituições de ensino/);
  const answers={};psu.criteria.forEach(row=>row.parts.forEach(part=>{answers[part.id]=1;}));
  assert.equal(core.score(psu,answers).total,13);
  assert.equal(core.score(psu,{'mg-n1a':1,'mg-n1b':1,'mg-n2a':1}).total,3);
  assert.equal(core.score(psu,{'mg-liga1':1,'mg-repr':1}).total,1.1);
});
test('USP-RP uses the official 10-point curriculum matrix and block ceilings',()=>{
  const rp=sandbox.window.LuriaCurriculoRubricas.find(row=>row.institution==='USP-RP');
  assert.equal(rp.status,'reviewed');
  assert.match(rp.source,/E3650239202610417\.pdf/);
  const answers={};rp.criteria.forEach(row=>row.parts.forEach(part=>{answers[part.id]=999;}));
  assert.equal(core.score(rp,answers).subtotal,10);
  assert.equal(core.score(rp,{['rp-hospital']:1,['rp-pos5']:1,['rp-pos24']:1,['rp-e5']:1}).subtotal,1.5);
});
test('PUC-SP uses the official 100-point access-direct matrix',()=>{
  const puc=sandbox.window.LuriaCurriculoRubricas.find(row=>row.institution==='PUC-SP');
  assert.equal(puc.status,'reviewed');
  assert.match(puc.source,/Edital-RM-2027-ABAD\.pdf/);
  const answers={};puc.criteria.forEach(row=>row.parts.forEach(part=>{answers[part.id]=999;}));
  assert.equal(core.score(puc,answers).subtotal,100);
  assert.equal(core.score(puc,{['pucsp-mon6']:1,['pucsp-ic12']:1,['pucsp-idioma']:2}).total,15);
});
test('PSU-GO uses its own official 10-point entry-direct matrix',()=>{
  const go=sandbox.window.LuriaCurriculoRubricas.find(row=>row.institution==='PSU-GO');
  assert.equal(go.status,'reviewed');
  assert.match(go.source,/EntradaDiretaPSUGO2027/);
  const answers={};go.criteria.forEach(row=>row.parts.forEach(part=>{answers[part.id]=999;}));
  assert.equal(core.score(go,answers).subtotal,10);
  assert.equal(core.score(go,{['go-monitoria']:2,['go-publicacao']:2,['go-estagio']:1}).total,2);
});
test('UNICAMP uses the official 100-point 2027 access-direct matrix',()=>{
  const unicamp=sandbox.window.LuriaCurriculoRubricas.find(row=>row.institution==='UNICAMP');
  assert.equal(unicamp.status,'reviewed');
  assert.match(unicamp.source,/001-Edital-Acesso-Direto-2027\.pdf/);
  const answers={};unicamp.criteria.forEach(row=>row.parts.forEach(part=>{answers[part.id]=999;}));
  assert.equal(core.score(unicamp,answers).subtotal,100);
  assert.equal(core.score(unicamp,{['unicamp-doutorado']:1,['unicamp-mestrado']:1,['unicamp-scielo']:2}).total,25);
});
test('UFPA identifies its latest official edition and preserves the 100-point ceiling',()=>{
  const ufpa=sandbox.window.LuriaCurriculoRubricas.find(row=>row.institution==='UFPA');
  assert.equal(ufpa.status,'reviewed');
  assert.equal(ufpa.edition,'2026');
  assert.match(ufpa.source,/ANEXO-II-FICHA-AVALIACAO-CURRICULO\.pdf/);
  const answers={};ufpa.criteria.forEach(row=>row.parts.forEach(part=>{answers[part.id]=999;}));
  assert.equal(core.score(ufpa,answers).subtotal,100);
  assert.equal(core.score(ufpa,{['ufpa-monitoria-bolsa']:1,['ufpa-monitoria-voluntario']:1,['ufpa-idioma']:2}).total,16);
});

test('Santa Casa SP uses the official 2027 access-direct group only',()=>{
  const sc=sandbox.window.LuriaCurriculoRubricas.find(row=>row.institution==='Santa Casa SP');
  assert.equal(sc.status,'reviewed');
  assert.equal(sc.edition,'2027');
  assert.match(sc.source,/scmsp126\/edital_de_abertura_21_09_26_publicar_2\.pdf/);
  const answers={};sc.criteria.forEach(row=>row.parts.forEach(part=>{answers[part.id]=999;}));
  assert.equal(core.score(sc,answers).subtotal,10);
  assert.equal(core.score(sc,{['scsp-enamed5']:1,['scsp-enamed4']:1,['scsp-anais1']:1,['scsp-anais2']:1}).total,3);
});
test('PUC-Campinas applies the official 2027 access-direct matrix and disciplinary deductions',()=>{
  const puc=sandbox.window.LuriaCurriculoRubricas.find(row=>row.institution==='PUC-Campinas');
  assert.equal(puc.status,'reviewed');
  assert.match(puc.source,/PUCCampinas27_ResidenciaMedica\.pdf/);
  const answers={};puc.criteria.forEach(row=>row.parts.forEach(part=>{answers[part.id]=999;}));
  assert.equal(core.score(puc,answers).total,0);
  const positive={};puc.criteria.filter(row=>!row.deduction).forEach(row=>row.parts.forEach(part=>{positive[part.id]=999;}));
  assert.equal(core.score(puc,positive).total,100);
  assert.equal(core.score(puc,{...positive,['puccamp-sancao']:1}).total,95);
  assert.equal(core.score(puc,{['puccamp-enamed3']:1,['puccamp-enamed4']:1}).total,4);
});
test('FMABC uses the official 10-point 2027 access-direct matrix',()=>{
  const fmabc=sandbox.window.LuriaCurriculoRubricas.find(row=>row.institution==='FMABC');
  assert.equal(fmabc.status,'reviewed');
  assert.match(fmabc.source,/d16d85c3-794c-489e-b76d-72695ca65753\.pdf/);
  const answers={};fmabc.criteria.forEach(row=>row.parts.forEach(part=>{answers[part.id]=999;}));
  assert.equal(core.score(fmabc,answers).subtotal,10);
  assert.equal(core.score(fmabc,{['fmabc-progresso']:1,['fmabc-mon-ano']:1,['fmabc-artigo2']:1,['fmabc-artigo1']:1}).total,3);
});
test('SES-PE 2027 uses the official 100-point R1 table and exclusive grade bands',()=>{
  const pe=sandbox.window.LuriaCurriculoRubricas.find(r=>r.institution==='SES-PE');
  assert.equal(pe.status,'reviewed');assert.equal(pe.max,100);assert.equal(pe.edition,'2027');
  const all={};pe.criteria.forEach(r=>r.parts.forEach(p=>{all[p.id]=p.limit;}));
  assert.equal(core.score(pe,all).total,100);
  assert.equal(core.score(pe,{'pe-h90':1,'pe-h80':1}).total,30);
  assert.equal(core.score(pe,{'pe-mon':3,'pe-ic':3,'pe-ext':4,'pe-art':1,'pe-oral':5,'pe-post':5}).total,70);
});
test('UNIFESP lists all 26 direct-entry specialties and uses independent matrices',()=>{
  const all=sandbox.window.LuriaCurriculoRubricas;
  assert.equal(all.some(r=>r.institution==='SES-DF'),false);
  assert.equal(all.some(r=>r.institution==='Santa Casa BH'),false);
  const uni=all.find(r=>r.institution==='UNIFESP');
  assert.equal(uni.specialties.length,26);
  assert.equal(new Set(uni.specialties.map(x=>x.id)).size,26);
  const surgery=uni.specialties.find(x=>x.specialty==='Cirurgia Geral');
  assert.equal(surgery.status,'reviewed');assert.equal(surgery.max,12);
  const answers={};surgery.criteria.forEach(row=>row.parts.forEach(part=>answers[part.id]=999));
  assert.equal(core.score(surgery,answers).total,12);
  assert.equal(core.score(surgery,{'uni-cg-art-12':1,'uni-cg-art-outro':1}).total,2);
  const unverified=uni.specialties.find(x=>x.specialty==='Radioterapia');
  assert.equal(unverified.status,'program-specific');
  assert.equal(core.score(unverified,{}),null);
  const med=uni.specialties.find(x=>x.specialty==='Clínica Médica');
  assert.equal(core.score(med,{'uni-cm-en1':1,'uni-cm-en5':1}).total,.5);
});
test('Einstein reflects the exact announced criteria without inventing item weights',()=>{
  const ei=sandbox.window.LuriaCurriculoRubricas.find(r=>r.institution==='Einstein');
  assert.equal(ei.status,'weights-pending');
  assert.match(ei.scope,/PubMed/);
  assert.match(ei.scope,/JCR/);
  assert.equal(core.score(ei,{}),null);
});

test('Lattes parses supported records, removes duplicates, requires review and rejects unsafe XML', () => {
  const { DOMParser } = new JSDOM('').window;
  const xml = '<CURRICULO-VITAE><ARTIGO-PUBLICADO><DADOS-BASICOS-DO-ARTIGO TITULO-DO-ARTIGO="Estudo clínico" ANO-DO-ARTIGO="2025"/></ARTIGO-PUBLICADO><ARTIGO-PUBLICADO><DADOS-BASICOS-DO-ARTIGO TITULO-DO-ARTIGO="Estudo clínico" ANO-DO-ARTIGO="2025"/></ARTIGO-PUBLICADO></CURRICULO-VITAE>';
  const items = core.parseLattes(xml,DOMParser);
  assert.equal(items.length,1); assert.equal(items[0].reviewed,false);
  assert.equal(core.merge(items,items).length,1);
  assert.throws(() => core.parseLattes('<html/>',DOMParser));
  assert.throws(() => core.parseLattes('<!DOCTYPE x [<!ENTITY y SYSTEM "file:///secret">]><CURRICULO-VITAE/>',DOMParser));
  assert.throws(() => core.parseLattes('<CURRICULO-VITAE>',DOMParser));
});
function boot(userId='user-a', storage, beforeReady) {
  const html = fs.readFileSync(path.join(root,'aplicar/curriculo/index.html'),'utf8');
  const dom = new JSDOM(html,{url:'https://luria.test/aplicar/curriculo/',runScripts:'outside-only'});
  const w = dom.window;
  if (storage) w.localStorage.setItem(`luria:curriculo:v1:${userId}`,storage);
  for (const script of ['curriculo-core','curriculo-rubricas','curriculo-pdf','curriculo']) w.eval(fs.readFileSync(path.join(root,`assets/js/${script}.js`),'utf8'));
  beforeReady?.(w);
  w.dispatchEvent(new w.CustomEvent('docmap:ready',{detail:{user:{id:userId}}}));
  return w;
}
test('manual CRUD stays scoped to the account, survives reload and renders hostile text safely', () => {
  const w = boot();
  w.document.getElementById('cv-add').click();
  const form = w.document.getElementById('cv-form');
  form.elements.title.value='<img src=x onerror=alert(1)>';
  form.elements.year.value='2026';
  form.dispatchEvent(new w.Event('submit',{bubbles:true,cancelable:true}));
  assert.equal(w.document.querySelectorAll('#cv-items article').length,1);
  assert.equal(w.document.querySelector('#cv-items img'),null);
  const saved=w.localStorage.getItem('luria:curriculo:v1:user-a');
  assert.equal(JSON.parse(saved).items.length,1);
  const reloaded=boot('user-a',saved);
  assert.equal(reloaded.document.querySelectorAll('#cv-items article').length,1);
  w.dispatchEvent(new w.CustomEvent('docmap:ready',{detail:{user:{id:'user-b'}}}));
  assert.equal(w.document.querySelectorAll('#cv-items article').length,0);
  assert.equal(w.localStorage.getItem('luria:curriculo:v1:user-b'),null);
  reloaded.document.querySelector('#cv-items button[aria-label^="Excluir"]').click();
  assert.equal(JSON.parse(reloaded.localStorage.getItem('luria:curriculo:v1:user-a')).items.length,0);
  w.close(); reloaded.close();
});
test('rubric changes persist and malformed saved answers recover', () => {
  const w = boot('user-a',JSON.stringify({items:[],answers:{[rubric.id]:null}}));
  const input=w.document.querySelector('[data-part="s1"]'); input.value='2'; input.dispatchEvent(new w.Event('input'));
  assert.match(w.document.getElementById('cv-score').textContent,/4 \/ 100/);
  assert.equal(JSON.parse(w.localStorage.getItem('luria:curriculo:v1:user-a')).answers[rubric.id].s1,2);
  w.close();
});
test('institutions filter removed processes and show UNIFESP specialty picker',()=>{
  const w=boot();const d=w.document;
  assert.equal(d.querySelectorAll('.cv-institution').length,13);
  assert.match(d.getElementById('cv-coverage').textContent,/26 especialidades R1/);
  const option=[...d.getElementById('cv-exam').options].find(x=>x.textContent.startsWith('UNIFESP'));
  d.getElementById('cv-exam').value=option.value;
  d.getElementById('cv-exam').dispatchEvent(new w.Event('change'));
  const select=d.getElementById('cv-specialty');
  assert.ok(select);assert.equal(select.options.length,27);
  const surgery=[...select.options].find(x=>x.textContent.startsWith('Cirurgia Geral'));
  select.value=surgery.value;select.dispatchEvent(new w.Event('change'));
  assert.equal(d.getElementById('cv-rules').querySelectorAll('input').length>0,true);
  assert.match(d.getElementById('cv-score').textContent,/\/ 12/);
  assert.equal(JSON.parse(w.localStorage.getItem('luria:curriculo:v1:user-a')).selectedSpecialty,surgery.value);
  w.close();
});

test('currículo oferece importação PDF e exportação legível, mantendo XML e JSON', () => {
  const w = boot();
  const doc = w.document;
  for (const id of ['cv-import-pdf','cv-pdf','cv-open-pdf','cv-remove-pdf','cv-export-pdf','cv-import','cv-lattes','cv-export']) {
    assert.ok(doc.getElementById(id), `Controle ausente: ${id}`);
  }
  assert.match(doc.getElementById('cv-pdf').accept, /application\/pdf/);
  assert.match(doc.getElementById('cv-export-pdf').textContent, /PDF/);
  assert.match(doc.getElementById('cv-export').textContent, /JSON/);
  w.close();
});

test('PDF heurístico só sugere atividades datadas sob uma seção identificável', () => {
  const lines = [
    'CURRÍCULO LATTES',
    'Formação acadêmica/titulação',
    '2019 - 2025 Graduação em Medicina pela Faculdade Exemplo.',
    'Artigos completos publicados em periódicos',
    '1. Maria Silva. Estudo de prevenção cardiovascular. Revista de Medicina, 2024.',
    'Telefone: (61) 99999-9999',
    '2024',
    'Monitoria acadêmica',
    '2023 - 2024 Monitoria de Clínica Médica na graduação.',
    'Página 1 de 5'
  ];
  const items = pdf.parseLines(lines, (()=>{let n=0;return ()=>String(++n);})());
  assert.equal(items.length, 3);
  assert.deepEqual(items.map(item => item.category), ['formacao','artigo','monitoria']);
  assert.deepEqual(items.map(item => item.year), ['2025','2024','2024']);
  assert.ok(items.every(item => !item.reviewed && item.source === 'pdf'));
  assert.equal(pdf.parseLines(['Currículo', '2025 - 2026 nome pessoa'], ()=>'test').length, 0);
});


test('PDF original: upload, abertura, download e remoção percorrem os handlers reais', async () => {
  const w = boot();
  const doc = w.document;
  const attachment = doc.getElementById('cv-pdf-attached');
  const clicks = [];
  let storedOwner, removedOwner;
  const file = {
    name: 'curriculo-aluno.pdf', type: 'application/pdf', size: 1200,
    slice: () => ({ arrayBuffer: async () => Uint8Array.from([37,80,68,70,45]).buffer }),
    arrayBuffer: async () => Uint8Array.from([37,80,68,70,45]).buffer
  };
  w.LuriaCurriculoPdf.storePdf = async (owner, original) => {
    storedOwner = owner;
    assert.equal(original, file);
  };
  w.LuriaCurriculoPdf.extract = async () => ({ items: [], hasText: false, pages: 1 });
  w.LuriaCurriculoPdf.removePdf = async owner => { removedOwner = owner; };
  w.URL.createObjectURL = blob => {
    assert.equal(blob, file);
    return 'blob:https://luria.test/teste-original';
  };
  w.URL.revokeObjectURL = () => {};
  w.HTMLAnchorElement.prototype.click = function () {
    clicks.push({ href: this.href, download: this.download, target: this.target });
  };

  const input = doc.getElementById('cv-pdf');
  Object.defineProperty(input, 'files', { configurable: true, value: [file] });
  assert.equal(attachment.hidden, true);
  doc.getElementById('cv-toggle').click();
  assert.equal(doc.getElementById('cv-curriculum-panel').hidden, false);
  input.dispatchEvent(new w.Event('change', { bubbles: true }));
  await new Promise(resolve => setImmediate(resolve));
  assert.equal(storedOwner, 'user-a');
  assert.equal(attachment.hidden, false);
  assert.match(doc.getElementById('cv-pdf-filename').textContent, /curriculo-aluno.pdf/);
  assert.match(doc.getElementById('cv-status').textContent, /digitalizado/);

  doc.getElementById('cv-open-pdf').click();
  doc.getElementById('cv-download-pdf').click();
  assert.equal(clicks.length, 2);
  assert.match(clicks[0].href, /^blob:/);
  assert.equal(clicks[0].target, '_blank');
  assert.equal(clicks[1].download, 'curriculo-aluno.pdf');

  doc.getElementById('cv-remove-pdf').click();
  await new Promise(resolve => setImmediate(resolve));
  assert.equal(removedOwner, 'user-a');
  assert.equal(attachment.hidden, true);
  w.close();
});

test('PDF original continua acessível ao recarregar o cadastro na mesma conta', async () => {
  const file = { name: 'historico.pdf', type: 'application/pdf' };
  const w = boot('user-a', null, win => {
    win.indexedDB = {};
    win.LuriaCurriculoPdf.getPdf = async owner => {
      assert.equal(owner, 'user-a');
      return { blob: file, name: file.name };
    };
  });
  const doc = w.document;
  await new Promise(resolve => setImmediate(resolve));
  assert.equal(doc.getElementById('cv-pdf-attached').hidden, false);
  assert.match(doc.getElementById('cv-pdf-filename').textContent, /historico.pdf/);
  w.close();
});

test('Exportar currículo em PDF executa geração e download, não backup JSON', async () => {
  const w = boot();
  const doc = w.document;
  doc.getElementById('cv-add').click();
  const form = doc.getElementById('cv-form');
  form.elements.title.value = 'Monitoria em Clínica Médica';
  form.elements.year.value = '2025';
  form.dispatchEvent(new w.Event('submit', { bubbles: true, cancelable: true }));
  const output = { lines: [], filenames: [] };
  w.LuriaLazyVendors = { ensure: async name => assert.equal(name, 'jspdf') };
  w.jspdf = { jsPDF: class {
    setFont() {}
    setFontSize() {}
    splitTextToSize(s) { return [s]; }
    text(str) { output.lines.push(str); }
    addPage() {}
    save(filename) { output.filenames.push(filename); }
  }};
  doc.getElementById('cv-export-pdf').click();
  await new Promise(resolve => setImmediate(resolve));
  assert.deepEqual(output.filenames, ['meu-curriculo-luria.pdf']);
  assert.ok(output.lines.some(line => line.includes('Monitoria em Clínica Médica')));
  assert.match(doc.getElementById('cv-status').textContent, /PDF gerado/);
  w.close();
});

test('Validação PDF rejeita extensão falsa, conteúdo não PDF e tamanho excessivo', async () => {
  const goodHeader = { arrayBuffer: async () => Uint8Array.from([37,80,68,70,45]).buffer };
  const badHeader = { arrayBuffer: async () => Uint8Array.from([72,69,76,76,79]).buffer };
  const file = (name, size, header) => ({
    name, type: 'application/pdf', size, slice: () => header
  });
  await pdf.checkPdf(file('curriculo.pdf', 1000, goodHeader));
  await assert.rejects(pdf.checkPdf(file('curriculo.pdf', 1000, badHeader)), /não é um PDF válido/);
  await assert.rejects(pdf.checkPdf(file('curriculo.pdf', pdf.MAX_BYTES + 1, goodHeader)), /até 10 MB/);
  await assert.rejects(pdf.checkPdf({ ...file('arquivo.txt',1000,goodHeader), type: 'text/plain' }), /arquivo PDF/);
});
