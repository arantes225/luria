'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const source = fs.readFileSync(
  path.join(__dirname, '..', 'assets/js/questoes-simulados.js'),
  'utf8'
);
const start = source.indexOf('function prepareImportedPdfQuestionRecords(');
const end = source.indexOf('async function importPdf() {', start);
assert.ok(start >= 0 && end > start, 'PDF import normalizer is available');

// Evaluate only the pure normalization helper; no browser or Supabase setup.
const prepare = new Function(
  source.slice(start, end) + '\nreturn prepareImportedPdfQuestionRecords;'
)();

test('PDF numbering can restart without a unique-key collision or central-bank linkage', () => {
  const questions = [
    { question_number: 1, order_index: 1, raw_text: '1) Primeira pergunta', source_label: 'PDF A' },
    { question_number: 1, order_index: 2, raw_text: '1) Segunda pergunta', source_label: 'PDF B' },
    { question_number: 2, order_index: 3, raw_text: '2) Terceira pergunta' }
  ];
  const result = prepare(
    questions,
    [{ question_number: 1, blob: 'ambiguous' }, { question_number: 2, blob: 'unambiguous' }],
    { 1: 'A', 2: 'C' }
  );

  assert.deepEqual(result.questions.map(q => q.question_number), [1, 2, 3]);
  assert.deepEqual(result.questions.map(q => q.order_index), [1, 2, 3]);
  assert.deepEqual(result.questions.map(q => q.question_bank_id), [null, null, null]);
  assert.deepEqual(result.answers, [null, null, 'C']);
  assert.deepEqual(result.images.map(x => x.question_number), [3]);
  assert.equal(result.skippedImages, 1);
  assert.equal(result.repeatedNumbers, 1);
  assert.equal(result.questions[0].raw_text, '1) Primeira pergunta');
  assert.equal(result.questions[1].raw_text, '1) Segunda pergunta');
  assert.equal(result.questions[0].source_label, 'PDF A');
  assert.deepEqual(questions.map(q => q.question_number), [1, 1, 2], 'original records must not be mutated');
});

test('Unique printed numbers retain their answer and image associations after renumbering', () => {
  const result = prepare(
    [{ question_number: 15, raw_text: '15) Texto' }, { question_number: 27, raw_text: '27) Texto' }],
    [{ question_number: 27, blob: 'image-for-27' }],
    { 15: 'D', 27: 'B' }
  );
  assert.deepEqual(result.questions.map(q => q.question_number), [1, 2]);
  assert.deepEqual(result.answers, ['D', 'B']);
  assert.deepEqual(result.images.map(x => x.question_number), [2]);
  assert.equal(result.skippedImages, 0);
});

test('Invalid or missing PDF numbers cannot collide and do not inherit unrelated answer keys', () => {
  const result = prepare(
    [{ question_number: null, raw_text: 'unlabeled' }, { question_number: 0, raw_text: 'zero' }],
    [{ question_number: 7, blob: 'unmatched' }],
    { 0: 'A', 7: 'D' }
  );
  assert.deepEqual(result.questions.map(q => q.question_number), [1, 2]);
  assert.deepEqual(result.answers, [null, null]);
  assert.equal(result.skippedImages, 1);
  assert.deepEqual(result.images, []);
});

test('Correct 99 blocks outrank 106 false blocks and match structured answer key', () => {
  const start = source.indexOf('function questionSetConfidence(');
  const end = source.indexOf('function normalizeLine(', start);
  assert.ok(start >= 0 && end > start);
  const score = new Function(source.slice(start,end) + '\nreturn questionSetConfidence;')();
  const make = ns => ns.map(n => ({
    question_number:n, stem:'Enunciado', alternatives:{A:'A',B:'B',C:'C',D:'D'}, raw_text:'x'.repeat(100)
  }));
  const key = Object.fromEntries(Array.from({length:99},(_,i)=>[i+1,i===76?'X':'B']));
  const good = make(Array.from({length:99},(_,i)=>i+1));
  const bad = make([...Array.from({length:99},(_,i)=>i+1),1,3,4,6,13,25,54]);
  assert.equal(good.length,99);
  assert.equal(bad.length,106);
  assert.ok(score(good,key)>score(bad,key));
  assert.ok(score(good,{})>score(bad,{}));
  assert.match(source,/const completeSequentialKey/);
  assert.match(source,/Nenhuma lista foi criada/);
});
