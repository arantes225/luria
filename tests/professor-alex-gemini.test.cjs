const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const root = path.resolve(__dirname, "..");
const page = fs.readFileSync(path.join(root, "professor-alex/index.html"), "utf8");
const client = fs.readFileSync(path.join(root, "assets/js/professor-alex-gemini.mjs"), "utf8");
const edge = fs.readFileSync(path.join(root, "supabase/functions/professor-alex-gemini/index.ts"), "utf8");
const migration = fs.readFileSync(path.join(root, "db/professor_alex_daily_quota.sql"), "utf8");

test("Professor Alex page loads the real integration and supports safe files", () => {
  assert.match(page, /professor-alex-gemini\.mjs/);
  assert.match(page, /accept="\.pdf,\.txt,\.md"/);
  assert.match(client, /functions\.invoke\("professor-alex-gemini"/);
  assert.match(client, /client\.auth\.getSession/);
});

test("Gemini secret stays in backend and requests require authentication", () => {
  assert.doesNotMatch(client, /Deno\.env|x-goog-api-key|generativelanguage\.googleapis\.com/);
  assert.match(edge, /Deno\.env\.get\("CLIENT_GEMINI"\)/);
  assert.match(edge, /auth\.getUser\(token\)/);
  assert.match(edge, /origin_not_allowed/);
  assert.match(edge, /MAX_PDF_BASE64/);
  assert.match(edge, /provider_status: response\.status/);
  assert.match(edge, /gemini_key_invalid/);
  assert.match(edge, /gemini_model_unavailable/);
  assert.doesNotMatch(edge, /console\.log\(.*apiKey/);
  assert.match(client, /gemini_key_invalid/);
  assert.match(client, /gemini_billing_required/);
});

test("Daily request quota uses atomic update, RLS and is not exposed to clients", () => {
  assert.match(migration, /enable row level security/i);
  assert.match(migration, /on conflict \(user_id, usage_date\) do update/i);
  assert.match(migration, /grant execute on function .* to service_role/i);
  assert.match(migration, /revoke all on function .* from public, anon, authenticated/i);
});

test("Concise and safe voice handling avoids spending Gemini tokens on an ambiguous transcript", () => {
  assert.match(edge, /ambiguous_transcription/);
  assert.match(edge, /channel === "voice"/);
  assert.match(edge, /Você quis dizer.*sepse/);
  assert.match(edge, /maxOutputTokens: mode === "estourado" \? 3300 : channel === "voice" \? 650 : 1500/);
  assert.match(edge, /MAX_HISTORY_ITEMS/);
  assert.match(client, /shouldSendAlexHistory/);
  assert.match(client, /payload\.history = alexHistory\.slice\(-4\)/);
  assert.match(client, /data\.clarification/);
  assert.match(edge, /não comece uma aula/);
  assert.match(page, /alex-stop-response/);
  assert.match(client, /stopAlexResponse/);
  assert.match(client, /speechGeneration/);
  assert.match(edge, /low_transcription_confidence/);
  assert.match(edge, /voiceConfidence < 0\.65/);
  assert.match(client, /payload\.voice_confidence/);
  assert.match(client, /liveTranscriptConfidence/);
  assert.match(client, /professor-alex-site-index\.json/);
  assert.match(client, /site_context/);
  assert.match(client, /Não encontrei esse termo no conteúdo da LURIA/);
  assert.match(edge, /sourceMode/);
  assert.match(edge, /MAX_SITE_CONTEXT_CHARS/);
  assert.match(edge, /Fonte restrita/);
});
