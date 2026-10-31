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
const data = sandbox.window.LuriaDiabetesData;

test('Diabetes has a dedicated route and loads the data before the UI', () => {
  assert.match(html, /data-page="trabalho_diabetes"/);
  assert.ok(html.indexOf('work-diabetes-data.js') < html.indexOf('work-diabetes.js'));
  assert.match(html, /ui-navigation-v2\.js/);
  assert.match(hub, /'Diabetes'.*'diabetes\/'/);
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
  assert.match(html, /luria-lazy-vendors\.js/);
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
