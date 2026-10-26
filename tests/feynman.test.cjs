const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const root = path.resolve(__dirname, "..");
const read = file => fs.readFileSync(path.join(root, file), "utf8");

const page = read("feynman/index.html");
const client = read("assets/js/feynman.mjs");
const edge = read("supabase/functions/professor-alex-gemini/index.ts");
const migration = read("supabase/migrations/20261026110000_feynman_sessions.sql");
const learn = read("aprender/index.html");

test("Feynman is a distinct five-minute learning experience in Aprender", () => {
  assert.match(learn, /href="\/feynman\/"/);
  assert.match(page, /Você é o professor agora/);
  assert.match(page, /Aluno iniciante/);
  assert.match(page, /Aluno questionador/);
  assert.match(page, /Banca examinadora/);
  assert.match(client, /const SESSION_SECONDS = 5 \* 60/);
});

test("Feynman asks one Socratic question at a time and produces a structured report", () => {
  assert.match(edge, /Responda como aluno, não como tutor/);
  assert.match(edge, /somente UMA pergunta curta/);
  assert.match(edge, /score \(inteiro 0-100\)/);
  assert.match(edge, /mastered \(array de strings\)/);
  assert.match(edge, /gaps \(array de strings\)/);
  assert.match(edge, /errors \(array de strings\)/);
  assert.match(edge, /next_steps \(array de strings\)/);
  assert.match(edge, /responseMimeType = "application\/json"/);
});

test("Voice uncertainty is confirmed and medical alternatives receive contextual preference", () => {
  assert.match(client, /recognition\.maxAlternatives = 5/);
  assert.match(client, /contextualTranscript/);
  assert.match(client, /pendingConfidence < \.65/);
  assert.match(client, /Foi isso mesmo/);
  assert.match(edge, /data\.voice_input === true/);
  assert.match(edge, /Não entendi bem esse termo/);
});

test("Feynman sessions are owner-isolated with RLS and do not auto-create study content", () => {
  assert.match(migration, /enable row level security/i);
  assert.match(migration, /user_id = \(select auth\.uid\(\)\)/g);
  assert.match(migration, /revoke all on table public\.feynman_sessions from public, anon/i);
  assert.match(client, /from\("feynman_sessions"\)/);
  assert.doesNotMatch(client, /from\("(?:flashcards|error_notebook|question_items)"\)/);
  assert.match(page, /Rever apostilas/);
  assert.match(page, /Fazer questões/);
  assert.match(page, /Revisar flashcards/);
  assert.match(page, /Abrir caderno de erros/);
});

test("Feynman controls cost by reusing Alex, limiting output and using device speech", () => {
  assert.match(client, /functions\.invoke\("professor-alex-gemini"/);
  assert.match(client, /channel: "chat", voice_input:/);
  assert.match(edge, /feynmanAction === "finish" \? 900 : 180/);
  assert.match(edge, /thinkingLevel: experience === "feynman"/);
  assert.doesNotMatch(client, /fetch\([^)]*generativelanguage\.googleapis\.com/);
});
