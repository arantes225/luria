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

test("Live conversation auto-plays audio and has no manual replay control", () => {
  assert.doesNotMatch(page, /<script[^>]+professor-alex-voice\.js/);
  assert.doesNotMatch(page, /alex-replay-audio|Ouvir resposta/);
  assert.doesNotMatch(client, /replayVoiceButton|rememberVoiceReply|Ouvir resposta/);
  assert.match(edge, /generativelanguage\.googleapis\.com\/v1beta\/interactions/);
  assert.match(edge, /generation_config: \{ speech_config: \[\{ voice: "Puck" \}\] \}/);
  assert.match(edge, /step\.type === "model_output"/);
  assert.match(edge, /audioPart\?\.data/);
  assert.match(client, /unlockLiveAudio\(\);/);
  assert.match(client, /liveAudioContext\.decodeAudioData\(bytes\.buffer\)/);
  assert.match(client, /source\.start\(0\)/);
  assert.match(client, /playGeminiPuckAudio\(data\.audio/);
  assert.match(client, /speakText\(data\.answer, onFinishedSpeaking\)/);
  assert.match(client, /if \(!isLiveActive\) return;/);
  assert.match(client, /!currentPuckSource && !audioPlaybackPending/);
  assert.match(client, /stopCurrentVoicePlayback\(\)/);
});

test("Fast answer format is sent to server and controls output budget", () => {
  assert.match(page, /data-alex-depth="rapida"/);
  assert.match(page, /data-alex-depth="aula"/);
  assert.match(client, /depth: document\.querySelector/);
  assert.match(edge, /const depth = data\.depth === "aula"/);
  assert.match(edge, /FORMATO DÚVIDA RÁPIDA/);
  assert.match(edge, /maxOutputTokens: depth === "aula"/);
  assert.match(edge, /thinkingBudget: 0/);
});

test("Gemini 3.8 TTS uses correct voice field and fast model for short replies", () => {
  assert.match(edge, /voice:\s*"Puck"/);
  assert.doesNotMatch(edge, /prebuiltVoiceConfig:\s*\{/);
  assert.match(edge, /gemini-3\.8-flash-lite-tts/);
  assert.match(edge, /depth === "aula" \? TTS_MODEL : TTS_FAST_MODEL/);
  assert.match(edge, /audioError = "tts_unavailable"/);
  assert.doesNotMatch(client, /rememberVoiceReply/);
});
