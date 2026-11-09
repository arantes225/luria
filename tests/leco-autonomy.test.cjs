const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const root = path.resolve(__dirname, '..');
const source = fs.readFileSync(path.join(root, 'assets/js/leco-autonomy.mjs'), 'utf8');
const alex = fs.readFileSync(path.join(root, 'assets/js/professor-alex-gemini.mjs'), 'utf8');
const page = fs.readFileSync(path.join(root, 'professor-alex/index.html'), 'utf8');

test('Leco conecta comandos naturais a operações autenticadas', () => {
  for (const term of ['schedule_events', 'study_topics', 'social_command', 'question_sets', 'flashcards']) assert.match(source, new RegExp(term));
  assert.match(source, /\.eq\("user_id", user\.id\)/);
  assert.match(source, /LuriaDialog\?\.confirm/);
});

test('Professor Alex intercepta ações operacionais antes da resposta textual', () => {
  assert.match(alex, /LuriaLecoAutonomy\?\.handleLecoCommand/);
  assert.match(alex, /event\.preventDefault\(\)/);
  assert.match(page, /assets\/js\/leco-autonomy\.mjs/);
});
