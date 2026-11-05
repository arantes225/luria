'use strict';
const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const root = path.resolve(__dirname, '..');
const read = p => fs.readFileSync(path.join(root, p), 'utf8');
const html = read('trabalho/diabetes/index.html');
const script = read('assets/js/work-diabetes.js');
const css = read('assets/css/work-diabetes.css');
const hub = read('assets/js/work-dashboard.js');
const sandbox = { window: {} };
vm.runInNewContext(read('assets/js/work-diabetes-data.js'), sandbox);
const data = sandbox.window.TraubeDiabetesData;

test('Diabetes has a dedicated route and loads the data before the UI', () => {
  assert.match(html, /data-page="trabalho_diabetes"/);
  assert.ok(html.indexOf('work-diabetes-data.js') < html.indexOf('work-diabetes.js'));
  assert.match(html, /ui-navigation-v2\.js/);
  assert.match(hub, /'Diabetes'.*'diabetes\/'/);
  assert.match(read('trabalho/index.html'), /href="\/trabalho\/diabetes\/"/);
  assert.match(read('trabalho/diabetes/index.html'), /traube-lazy-vendors\.js/);
});
test('Clinical case module is not part of the hub', () => {
  assert.doesNotMatch(script, /['"]casos['"]\s*,\s*['"]Casos/);
  assert.doesNotMatch(script, /Casos Clínicos/);
  assert.doesNotMatch(html, /Casos Clínicos/);
});
test('Catalog has unique identifiers and traceable clinical sources', () => {
  assert.ok(data.drugs.length >= 20);
  assert.ok(data.topics.length >= 30);
  assert.equal(new Set(data.drugs.map(d => d.id)).size, data.drugs.length);
  assert.ok(data.drugs.every(d => d.doses.length > 0 && /^https:\/\//.test(d.source)));
  assert.ok(data.sources.every(s => /^https:\/\//.test(s.url)));
  for (const drug of data.drugs) {
    if (!drug.eff) continue;
    assert.equal(drug.eff.length, 2);
    assert.ok(drug.eff[0] > 0 && drug.eff[1] >= drug.eff[0]);
  }
});
test('The simulator refuses a joint numeric prediction and has a renal guard', () => {
  assert.match(script, /selected\.length===1/);
  assert.match(script, /Combinação selecionada: sem modelo de eficácia conjunta validado/);
  assert.match(script, /renal<60/);
  assert.match(script, /single\.drug\.starter/);
  assert.match(script, /Não utilizar como calculadora de prescrição/);
});
test('Styles remain scoped and include mobile layout', () => {
  assert.match(css, /\.diabetes-app/);
  assert.match(css, /@media\(max-width:750px\)/);
  assert.match(css, /prefers-reduced-motion/);
});


test('Paper diary uses browser PDF generator and a manual transcription-only workflow', () => {
  const pdf = read('assets/js/work-diabetes-paper.js');
  assert.match(html, /work-diabetes-paper\.js/);
  assert.match(html, /traube-lazy-vendors\.js/);
  assert.match(html, /jspdf@4\.2\.1/);
  assert.match(script, /id="dm-download-paper"/);
  assert.match(script, /id="dm-paper-grid"/);
  assert.match(script, /id="dm-create-paper-grid"/);
  assert.match(pdf, /Array\.from\(\{length:7\}/);
  assert.match(pdf, /const timeSlots/);
  assert.match(pdf, /new Doc\(\{orientation:'landscape',unit:'mm',format:'a4'/);
  assert.match(pdf, /Nenhuma medição foi salva na Traube/);
  assert.doesNotMatch(pdf, /localStorage|sessionStorage|\.from\('.*'\)\.insert/);
  assert.doesNotMatch(pdf, /recognize|OCR|Tesseract/i);
  assert.match(pdf, /formula injection/);
});

test('Traube diary has only required identifying fields and one paper week', () => {
  const paper=read('assets/js/work-diabetes-paper.js');
  assert.match(paper, /'Nome completo:'|Nome completo:/);
  assert.match(paper, /Data inicial:/);
  assert.match(paper, /Carimbo do médico/);
  assert.match(paper, /TRAUBE/);
  assert.match(paper, /Traube_Diario_Glicemico_7_dias\.pdf/);
 assert.match(paper, /Leve a folha preenchida na próxima consulta/);
 assert.match(paper, /M,194,9\.8,BLUE,'bold'/);
  assert.doesNotMatch(paper, /Medicamentos em uso|Médico\(a\):|Período:|Orientações de horários:/);
  assert.doesNotMatch(paper, /doc\.addPage\(/);
  assert.match(script, /Baixar PDF · 7 dias/);
  assert.doesNotMatch(script, /14 dias/);
  assert.equal(JSON.parse(read('manifest.webmanifest')) .short_name, 'TRAUBE');
  assert.match(read('assets/js/app.js'), /<strong>TRAUBE<\/strong>/);
});


test('Generated Traube PDF uses the existing official logo, including 5% watermark',()=>{
 const paper=read('assets/js/work-diabetes-paper.js');
 assert.match(paper, /\/assets\/img\/logos\/logo-icone-original\.png/);
 assert.match(paper, /doc\.addImage\(brand\.icon/);
 assert.match(paper, /mark\.globalAlpha=0\.05/);
 assert.match(paper, /doc\.addImage\(brand\.watermark/);
 assert.match(paper, /loadOfficialLogo\(\)/);
 assert.doesNotMatch(paper, /data:image\/svg\+xml|iconLeaf|drawLeaf/);
});


test('Diabetes is discoverable in sidebar, mobile tools and first dashboard screen', () => {
  const app = read('assets/js/app.js');
  const mobile = read('assets/js/ui-navigation-v2.js');
  const index = read('trabalho/index.html');
  const css = read('assets/css/work-dashboard.css');
  const sw = read('service-worker.js');
  assert.match(app, /page === "trabalho_diabetes"[^]*?href="\/trabalho\/diabetes\/"/);
  assert.match(mobile, /\/diabetes\|calculadora\|scores/);
  assert.match(hub, /work-hub-diabetes-featured/);
  assert.match(index, /class="work-hub-diabetes-featured" href="\/trabalho\/diabetes\/"/);
  assert.ok(index.indexOf('work-hub-diabetes-featured') < index.indexOf('work-hub-patient'));
  assert.match(css, /work-hub-diabetes-featured/);
  assert.match(sw, /traube-pwa-20261105-diabetes-runtime1/);
  assert.match(index, /work-dashboard\.js\?v=20261102-diabetes-visible/);
  assert.match(html, /ui-navigation-v2\.js\?v=20261102-diabetes-visible/);
});


test('Diabetes fully initializes and the ten real tabs, medications and paper grid work', () => {
  const { JSDOM } = require('jsdom');
  const dom = new JSDOM('<!doctype html><html lang="pt-BR"><body><div id="diabetes-app"><div class="diabetes-loading">Carregando…</div></div></body></html>', {
    url:'https://www.resibulando.online/trabalho/diabetes/',
    runScripts:'outside-only'
  });
  try {
    const {window:w} = dom;
    w.eval(read('assets/js/work-diabetes-data.js'));
    assert.doesNotThrow(() => w.eval(script), 'Every tab template must be resolvable at startup');
    const root = w.document.getElementById('diabetes-app');
    assert.ok(root.querySelector('.dm-hero'), 'The loading placeholder must be replaced');
    assert.equal(root.querySelectorAll('[role="tab"]').length, 10);
    for(const tab of root.querySelectorAll('[role="tab"]')) {
      tab.click();
      assert.equal(tab.getAttribute('aria-selected'),'true',tab.id);
      assert.ok(!w.document.getElementById(tab.getAttribute('aria-controls')).hidden,tab.id);
      assert.equal(root.querySelectorAll('[role="tabpanel"]:not([hidden])').length,1);
    }
    root.querySelector('[data-tab="simulador"]').click();
    const drug = w.document.getElementById('dm-drug');
    assert.ok(drug.options.length >= 20);
    drug.value = 'metformina';
    drug.dispatchEvent(new w.Event('change', {bubbles:true}));
    w.document.getElementById('dm-add').click();
    assert.match(w.document.getElementById('dm-selected').textContent,/Metformina/);
    assert.match(w.document.getElementById('dm-result').textContent,/HbA1c inicial/);
    drug.value = 'empagliflozina';
    drug.dispatchEvent(new w.Event('change', {bubbles:true}));
    w.document.getElementById('dm-add').click();
    assert.match(w.document.getElementById('dm-result').textContent,/sem modelo de eficácia conjunta validado/);
    root.querySelector('[data-tab="monitor"]').click();
    assert.ok(w.document.getElementById('dm-download-paper'));
    assert.doesNotThrow(() => w.eval(read('assets/js/work-diabetes-paper.js')));
    w.document.getElementById('dm-paper-start').value = '2026-11-01';
    w.document.getElementById('dm-create-paper-grid').click();
    assert.equal(root.querySelectorAll('.dm-paper-table tbody tr').length,7);
  } finally {
    dom.window.close();
  }
});
test('Diabetes displays a retryable alert instead of infinite loading on runtime failure', () => {
  const { JSDOM } = require('jsdom');
  const dom = new JSDOM('<!doctype html><html><body><div id="diabetes-app">Carregando…</div></body></html>', {
    url:'https://www.resibulando.online/trabalho/diabetes/',
    runScripts:'outside-only'
  });
  try {
    dom.window.TraubeDiabetesData = {drugs:[],topics:[],sources:null};
    dom.window.console.error = () => {};
    assert.doesNotThrow(() => dom.window.eval(script));
    assert.match(dom.window.document.getElementById('diabetes-app').textContent, /Não foi possível carregar a central Diabetes/);
    assert.ok(dom.window.document.getElementById('dm-reload'));
  } finally {
    dom.window.close();
  }
});
