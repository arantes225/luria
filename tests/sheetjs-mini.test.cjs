const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const root = path.join(__dirname, '..');

function sheetjs(file) {
  const code = fs.readFileSync(path.join(root, 'assets/vendor', file), 'utf8');
  const context = vm.createContext({});
  vm.runInContext(code, context, { filename: file, timeout: 4000 });
  const xlsx = context.XLSX;
  assert.equal(xlsx?.version, '0.20.3');
  assert.equal(typeof xlsx.read, 'function');
  assert.equal(typeof xlsx.utils.sheet_to_json, 'function');
  assert.equal(typeof xlsx.SSF.parse_date_code, 'function');
  return xlsx;
}

test('Mini build reads a real XLSX workbook with diacritics, dates and multiple sheets', () => {
  const small = sheetjs('xlsx-0.20.3-mini.js');
  const workbook = small.utils.book_new();
  small.utils.book_append_sheet(workbook,
    small.utils.aoa_to_sheet([
      ['Matéria', 'Dia', 'Observação'],
      ['Pré-natal', 45292, 'Revisão'],
      ['Ginecologia', 45302, 'Ação']
    ]), 'Cronograma');
  small.utils.book_append_sheet(workbook,
    small.utils.aoa_to_sheet([
      ['Frente', 'Verso'],
      ['O que é DPP?', 'Data provável do parto'],
      ['O que é pré-eclâmpsia?', 'Hipertensão após 20 semanas']
    ]), 'Flashcards');
  const bytes = small.write(workbook, { bookType: 'xlsx', type: 'binary' });
  const parsed = small.read(bytes, { type: 'binary', cellDates: false });
  assert.deepEqual(Array.from(parsed.SheetNames), ['Cronograma', 'Flashcards']);
  const schedule = small.utils.sheet_to_json(parsed.Sheets.Cronograma,
    { header: 1, defval: '', raw: true });
  assert.deepEqual(Array.from(schedule[1]), ['Pré-natal', 45292, 'Revisão']);
  const cards = small.utils.sheet_to_json(parsed.Sheets.Flashcards, { defval: '' });
  assert.equal(cards[0].Frente, 'O que é DPP?');
  assert.equal(cards[1].Verso, 'Hipertensão após 20 semanas');
  const date = small.SSF.parse_date_code(45292);
  assert.deepEqual([date.y, date.m, date.d], [2024, 1, 1]);
});

test('The complete reader remains available for CSV and legacy files', () => {
  const full = sheetjs('xlsx-0.20.3.js');
  const csv = 'Matéria,Dia\nMedicina,01/03/2026\nCirurgia,02/03/2026';
  const workbook = full.read(csv, { type: 'string' });
  const rows = full.utils.sheet_to_json(workbook.Sheets[workbook.SheetNames[0]],
    { header: 1, defval: '' });
  assert.equal(rows.length, 3);
  assert.equal(rows[1][0], 'Medicina');
});
