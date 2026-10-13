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
  assert.equal(typeof f.window.LuriaLazyVendors.ensure, 'function');
});

test('Concurrent calls for one vendor share a single request', async () => {
  const f = fixture();
  const first = f.window.LuriaLazyVendors.ensure('xlsx');
  const second = f.window.LuriaLazyVendors.ensure(['xlsx']);
  assert.equal(f.scripts.length, 1);
  assert.equal(f.scripts[0].src, '/assets/vendor/xlsx-0.20.3.js');
  f.window.XLSX = { read() {} };
  f.scripts[0].onload();
  await Promise.all([first, second]);
  await f.window.LuriaLazyVendors.ensure('xlsx');
  assert.equal(f.scripts.length, 1, 'already-loaded library should be reused');
});

test('Independent vendor imports stay independent and work with CDN scripts', async () => {
  const f = fixture();
  const pending = f.window.LuriaLazyVendors.ensure(['pdfjs', 'tesseract']);
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
  const first = f.window.LuriaLazyVendors.ensure('jszip');
  f.scripts[0].onerror();
  await assert.rejects(first, /Não foi possível carregar jszip/);
  assert.equal(f.scripts[0].removed, true);
  const second = f.window.LuriaLazyVendors.ensure('jszip');
  assert.equal(f.scripts.length, 2);
  f.window.JSZip = { loadAsync() {} };
  f.scripts[1].onload();
  await second;
  await assert.rejects(f.window.LuriaLazyVendors.ensure('unsupported'), /Biblioteca desconhecida/);
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
      const re = new RegExp('async function ' + name + '\\s*\\([\\s\\S]{0,260}?\\)\\s*\\{[\\s\\S]{0,620}?window\\.LuriaLazyVendors\\.ensure');
      assert.match(js, re, file + ': missing on-demand check in ' + name);
    }
  }
});
