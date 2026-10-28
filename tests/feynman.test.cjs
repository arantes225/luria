const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const root = path.resolve(__dirname, "..");
const read = file => fs.readFileSync(path.join(root, file), "utf8");

const page = read("professor-alex/index.html");
const legacy = read("feynman/index.html");
const mode = read("assets/js/alex-feynman-mode.js");
const nav = read("assets/js/ui-navigation-v2.js");
const routes = read("assets/js/ui-routes.js");
const client = read("assets/js/feynman.mjs");
const edge = read("supabase/functions/professor-alex-gemini/index.ts");
const migration = read("supabase/migrations/20261026110000_feynman_sessions.sql");
const learn = read("aprender/index.html");

test("Feynman funciona no Professor Alex e não como página independente", () => {
  assert.ok(!learn.includes('href="/feynman/"'));
  assert.ok(!nav.includes('["/feynman/","Ensine para aprender"'));
  assert.ok(page.includes('id="alex-study-mode-feynman"'));
  assert.ok(page.includes('id="alex-feynman-panel"'));
  assert.ok(page.includes('id="feynman-topic"'));
  assert.ok(page.includes("Aluno iniciante"));
  assert.ok(page.includes("Aluno questionador"));
  assert.ok(page.includes("Banca examinadora"));
  assert.ok(page.includes('src="/assets/js/feynman.mjs?v=20261028-alex-integrated"'));
  assert.ok(mode.includes("alex:feynman-visibility"));
  assert.ok(mode.includes('url.searchParams.set("mode","feynman")'));
  assert.ok(routes.includes('params.set("mode","feynman")'));
  assert.ok(legacy.includes('canonical" href="/professor-alex/"'));
  assert.ok(!legacy.includes('id="feynman-session"'));
  assert.ok(client.includes("const SESSION_SECONDS = 5 * 60"));
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
  assert.ok(page.includes('id="alex-feynman-return-chat"'));
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
  assert.ok(client.includes("modeVisible"));
});
