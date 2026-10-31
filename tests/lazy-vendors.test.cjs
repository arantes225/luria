const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const root = path.join(__dirname, '..');
const source = name => fs.readFileSync(path.join(root, name), 'utf8');

function fixture() {
  const scripts = [];
  const window = {};
  const document = {
    createElement(tag) {
      assert.equal(tag, 'script');
      return {
        dataset: {},
        remove() { this.removed = true; }
      };
    },
    head: {
      appendChild(script) {
        scripts.push(script);
      }
    }
  };
  vm.runInNewContext(source('assets/js/luria-lazy-vendors.js'), { window, document });
  return { scripts, window };
}

test('Optional vendors are not downloaded during loader initialization', () => {
  const f = fixture();
  assert.equal(f.scripts.length, 0);
  assert.equal(typeof f.window.TraubeLazyVendors.ensure, 'function');
});

test('Concurrent calls for one vendor share a single request', async () => {
  const f = fixture();
  const first = f.window.TraubeLazyVendors.ensure('xlsx');
  const second = f.window.TraubeLazyVendors.ensure(['xlsx']);
  assert.equal(f.scripts.length, 1);
  assert.equal(f.scripts[0].src, '/assets/vendor/xlsx-0.20.3-mini.js');
  f.window.XLSX = { read() {}, utils: { sheet_to_json() {} } };
  f.scripts[0].onload();
  await Promise.all([first, second]);
  await f.window.TraubeLazyVendors.ensure('xlsx');
  assert.equal(f.scripts.length, 1, 'already-loaded library should be reused');
});


test('SheetJS mini is selected for XLSX, with full parser reserved for legacy XLS/CSV', async () => {
  const f = fixture();
  const lightweight = f.window.TraubeLazyVendors.ensureSpreadsheet('Plano Medicina.xlsx');
  assert.equal(f.scripts.length, 1);
  assert.equal(f.scripts[0].src, '/assets/vendor/xlsx-0.20.3-mini.js');
  f.window.XLSX = { read() {}, utils: { sheet_to_json() {} } };
  f.scripts[0].onload();
  await lightweight;
  await f.window.TraubeLazyVendors.ensureSpreadsheet('revisao.XLSX');
  assert.equal(f.scripts.length, 1);
  const legacy = f.window.TraubeLazyVendors.ensureSpreadsheet('cronograma_antigo.xls');
  await Promise.resolve();
  await Promise.resolve();
  assert.equal(f.scripts.length, 2);
  assert.equal(f.scripts[1].src, '/assets/vendor/xlsx-0.20.3.js');
  f.scripts[1].onload();
  await legacy;
  await f.window.TraubeLazyVendors.ensureSpreadsheet('lista.csv');
  assert.equal(f.scripts.length, 2);
});

test('If the mini asset fails, full SheetJS is used as fallback', async () => {
  const f = fixture();
  const pending = f.window.TraubeLazyVendors.ensureSpreadsheet('teste.xlsx');
  f.scripts[0].onerror();
  await Promise.resolve();
  await Promise.resolve();
  assert.equal(f.scripts.length, 2);
  assert.equal(f.scripts[1].src, '/assets/vendor/xlsx-0.20.3.js');
  f.window.XLSX = { read() {}, utils: { sheet_to_json() {} } };
  f.scripts[1].onload();
  await pending;
});

test('Independent vendor imports stay independent and work with CDN scripts', async () => {
  const f = fixture();
  const pending = f.window.TraubeLazyVendors.ensure(['pdfjs', 'tesseract']);
  assert.equal(f.scripts.length, 2);
  assert.match(f.scripts[0].src, /pdf\.min\.js$/);
  assert.match(f.scripts[1].src, /tesseract\.min\.js$/);
  f.window.pdfjsLib = { getDocument() {} };
  f.window.Tesseract = { recognize() {} };
  for (const script of f.scripts) script.onload();
  await pending;
});

test('A network failure removes a failed request so retry can succeed', async () => {
  const f = fixture();
  const first = f.window.TraubeLazyVendors.ensure('jszip');
  f.scripts[0].onerror();
  await assert.rejects(first, /Não foi possível carregar jszip/);
  assert.equal(f.scripts[0].removed, true);
  const second = f.window.TraubeLazyVendors.ensure('jszip');
  assert.equal(f.scripts.length, 2);
  f.window.JSZip = { loadAsync() {} };
  f.scripts[1].onload();
  await second;
  await assert.rejects(f.window.TraubeLazyVendors.ensure('unsupported'), /Biblioteca desconhecida/);
});

test('All supported page entrypoints defer optional libraries to their import/export functions', () => {
  const pages = [
    ['flashcards/index.html', 'assets/js/flashcards.js'],
    ['flashcards.html', 'assets/js/flashcards.js'],
    ['configuracoes/flashcards/index.html', 'assets/js/flashcards.js'],
    ['cronograma/index.html', 'assets/js/cronograma.js'],
    ['cronograma.html', 'assets/js/cronograma.js'],
    ['configuracoes/cronograma/index.html', 'assets/js/cronograma.js'],
    ['questoes-simulados/index.html', 'assets/js/questoes-simulados.js'],
    ['questoes-simulados.html', 'assets/js/questoes-simulados.js']
  ];
  const optional = /(?:xlsx-0\.20\.3\.js|pdf\.min\.js|tesseract\.min\.js|jszip\.min\.js|sql-wasm\.js|fzstd@[^"']+\.js|jspdf\.umd\.min\.js)/;
  for (const [page, file] of pages) {
    const html = source(page);
    const scriptSrc = [...html.matchAll(/<script\b[^>]*\bsrc="([^"]+)"[^>]*>/g)].map(m => m[1]);
    assert.ok(scriptSrc.some(s => s.includes('luria-lazy-vendors.js')), page + ': missing loader');
    assert.ok(scriptSrc.some(s => s.includes(path.basename(file))), page + ': missing entrypoint');
    assert.ok(scriptSrc.findIndex(s => s.includes('luria-lazy-vendors.js'))
      < scriptSrc.findIndex(s => s.includes(path.basename(file))), page + ': loader must execute first');
    assert.equal(scriptSrc.some(src => optional.test(src)), false, page + ': eager optional dependency');
  }
  for (const [file, functions] of [
    ['assets/js/flashcards.js', ['parseSpreadsheetImport', 'openAnkiDatabase', 'exportSelectedFlashcardsPdf']],
    ['assets/js/cronograma.js', ['parseWorkbookFile', 'parsePdfFile']],
    ['assets/js/questoes-simulados.js', ['extractQuestionsFromPdf', 'extractOfficialAnswerKeyFromPdfBlob', 'ocrQuestionLineRecordsFromCanvas', 'createAnswerDigitWorker', 'recognizeAnswerGridByNumber']]
  ]) {
    const js = source(file);
    for (const name of functions) {
      const re = new RegExp('async function ' + name + '\\s*\\([\\s\\S]{0,260}?\\)\\s*\\{[\\s\\S]{0,620}?window\\.TraubeLazyVendors\\.ensure');
      assert.match(js, re, file + ': missing on-demand check in ' + name);
    }
  }
});
