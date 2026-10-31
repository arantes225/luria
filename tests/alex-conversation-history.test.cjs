const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const {pathToFileURL} = require('node:url');

const root = path.resolve(__dirname, '..');
const USER_A = '00000000-0000-4000-8000-000000000001';
const USER_B = '00000000-0000-4000-8000-000000000002';
const historyModule = pathToFileURL(path.join(root, 'assets/js/alex-conversation-history.mjs')).href;

function installStorage(t) {
  const values = new Map();
  globalThis.sessionStorage = {
    getItem: key => values.get(key) ?? null,
    setItem: (key, value) => values.set(key, String(value)),
    removeItem: key => values.delete(key)
  };
  t.after(() => { delete globalThis.sessionStorage; });
  return values;
}

test('Alex remembers consecutive turns without keyword heuristics and isolates users', async t => {
  installStorage(t);
  const {getAlexConversation, rememberAlexTurn} = await import(historyModule);
  rememberAlexTurn(USER_A, 'Me explique sepse', 'Sepse é disfunção orgânica associada à infecção.');
  rememberAlexTurn(USER_A, 'E o lactato?', 'Lactato pode ajudar na avaliação de hipoperfusão.');
  assert.deepEqual(getAlexConversation(USER_A).map(x => x.role), ['user','model','user','model']);
  assert.match(getAlexConversation(USER_A)[0].text, /sepse/);
  assert.match(getAlexConversation(USER_A)[3].text, /Lactato/);
  assert.deepEqual(getAlexConversation(USER_B), []);
});

test('Alex bounds the context window, supports reset, and expires old sessions', async t => {
  const values = installStorage(t);
  const {getAlexConversation, rememberAlexTurn, clearAlexConversation} = await import(historyModule);
  for (let i = 0; i < 8; i++) rememberAlexTurn(USER_A, 'Pergunta ' + i, 'Resposta ' + i);
  const history = getAlexConversation(USER_A);
  assert.equal(history.length, 12);
  assert.equal(history[0].text, 'Pergunta 2');
  clearAlexConversation(USER_A);
  assert.deepEqual(getAlexConversation(USER_A), []);
  values.set('traube:alex:conversation:v1:' + USER_A, JSON.stringify({updatedAt:Date.now() - 13*60*60*1000, messages:history}));
  assert.deepEqual(getAlexConversation(USER_A), []);
});

test('Both chat entrypoints send context to Gemini and include explicit new conversation reset', () => {
  const main = fs.readFileSync(path.join(root, 'assets/js/professor-alex-gemini.mjs'), 'utf8');
  const compact = fs.readFileSync(path.join(root, 'assets/js/professor-alex-companion.mjs'), 'utf8');
  const edge = fs.readFileSync(path.join(root, 'supabase/functions/professor-alex-gemini/index.ts'), 'utf8');
  const page = fs.readFileSync(path.join(root, 'professor-alex/index.html'), 'utf8');
  assert.match(main, /history:\s*sessionHistory\.slice\(-12\)/);
  assert.doesNotMatch(main, /shouldSendAlexHistory/);
  assert.match(main, /rememberAlexTurn\(session\.user\.id/);
  assert.match(compact, /history:\s*getAlexConversation\(userId\)/);
  assert.match(compact, /rememberAlexTurn\(userId, query, data\.answer\)/);
  assert.match(edge, /rawHistory = Array\.isArray\(data\.history\) \? data\.history\.slice\(-12\)/);
  assert.match(page, /id="alex-new-conversation"/);
  assert.match(compact, /clearAlexConversation\(userId\)/);
});
