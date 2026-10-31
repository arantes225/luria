const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");

const root = path.resolve(__dirname, "..");
const src = fs.readFileSync(path.join(root, "assets/js/professor-alex-gemini.mjs"), "utf8");
const page = fs.readFileSync(path.join(root, "professor-alex/index.html"), "utf8");
const worker = fs.readFileSync(path.join(root, "service-worker.js"), "utf8");
const pwa = fs.readFileSync(path.join(root, "assets/js/pwa.js"), "utf8");
const edge = fs.readFileSync(path.join(root, "supabase/functions/professor-alex-gemini/index.ts"), "utf8");
const speechCode = src.slice(src.indexOf("function splitSpeechIntoChunks("), src.indexOf("\nfunction initLiveVoiceMode()"));
assert.ok(speechCode.startsWith("function splitSpeechIntoChunks"), "speech helper available");

function speechHarness() {
  const spoken = [], retries = [], timers = [];
  const status = { textContent: "" };
  let completed = 0;
  class Utterance { constructor(text) { this.text = text; } }
  const synth = {
    paused: false, cancel() {}, speak(u) { spoken.push(u); },
    resume() {}, getVoices() { return [{ lang: "pt-BR" }]; },
  };
  let nextTimer = 1;
  const context = {
    window: { speechSynthesis: synth, SpeechSynthesisUtterance: Utterance },
    SpeechSynthesisUtterance: Utterance,
    document: {
      getElementById(id) { return id === "alex-status-text" ? status : null; },
      querySelector() { return null; },
    },
    console: { warn() {} },
    speechGeneration: 0, audioPlaybackPending: false,
    speechStartWatchdog: null, speechFinishWatchdog: null,
    activeSpeechUtterance: null,
    hideSpeechRetry() {}, showSpeechRetry(text, onComplete) { retries.push({ text, onComplete }); },
    setStopResponseVisible() {},
    setTimeout(callback, delay) {
      const timer = { id: nextTimer++, callback, delay, canceled: false };
      timers.push(timer);
      return timer.id;
    },
    clearTimeout(id) {
      const timer = timers.find(x => x.id === id);
      if (timer) timer.canceled = true;
    },
  };
  vm.runInNewContext(speechCode + "\nthis.runSpeech = speakText;", context);
  return {
    context, synth, status, spoken, retries, timers,
    say(text) { context.runSpeech(text, () => completed++); },
    get completed() { return completed; },
  };
}

test("Leco starts speech, clears the playback flag and finishes just once", () => {
  const t = speechHarness();
  t.say("**Olá**, tudo bem?");
  assert.equal(t.spoken[0].text, "Olá, tudo bem?");
  assert.equal(t.context.activeSpeechUtterance, t.spoken[0]);
  assert.equal(t.context.audioPlaybackPending, true);
  t.spoken[0].onstart();
  assert.match(t.status.textContent, /Leco está falando/);
  t.spoken[0].onend();
  t.spoken[0].onend();
  assert.equal(t.completed, 1);
  assert.equal(t.context.activeSpeechUtterance, null);
  assert.equal(t.context.audioPlaybackPending, false);
});

test("Leco breaks long responses into short speech chunks", () => {
  const t = speechHarness();
  const phrase = "uma explicação médica completa para revisão de conteúdo ";
  t.say(phrase.repeat(12));
  let index = 0;
  while (index < t.spoken.length && index < 50) {
    const u = t.spoken[index++];
    assert.ok(u.text.length <= 180, "speech chunk <= 180 characters");
    u.onstart();
    u.onend();
  }
  assert.ok(index > 1, "multiple chunks were sent");
  assert.equal(t.completed, 1);
});

test("Blocked or broken speech does not trap the microphone or the composer", () => {
  const t = speechHarness();
  t.say("A resposta clínica.");
  t.spoken[0].onerror({ error: "not-allowed" });
  assert.equal(t.completed, 1, "reopens listening after failed synthesis");
  assert.equal(t.context.audioPlaybackPending, false);
  assert.equal(t.retries.length, 1);
  assert.match(t.status.textContent, /áudio não iniciou/);
});

test("Safari silent speech times out and gives a tap-to-hear fallback", () => {
  const t = speechHarness();
  t.say("Uma resposta sem onstart.");
  assert.equal(t.timers[0].delay, 2100);
  t.timers[0].callback();
  const retry = t.timers.at(-1);
  assert.equal(retry.delay, 1400);
  retry.callback();
  assert.equal(t.retries.length, 1);
  assert.equal(t.context.audioPlaybackPending, false);
  assert.equal(t.completed, 1);
});

test("Live voice can interrupt an in-flight answer and accepts fresh questions", () => {
  assert.match(src, /function newConversationTurn\(\)/);
  assert.match(src, /activeResponseController\.abort\(\)/);
  assert.match(src, /if \(!isCurrentTurn\(\)\) return;/);
  assert.match(src, /if \(isLiveActive\) stopLiveListening\?\.\(\)/);
  assert.match(src, /recognition\.interimResults = true/);
  assert.match(src, /newConversationTurn\(\); \/\/ barge-in/);
  assert.match(src, /function interruptAndListen\(\)/);
  assert.match(src, /startLiveListening = startListening/);
  assert.doesNotMatch(src, /speakText\(SpeechRec \? "Pronto! Pode perguntar\."/);
  assert.match(page, /id="alex-interrupt-and-talk"/);
});

test("Planning cards render in chat and keep confirmation before writes", () => {
  assert.match(src, /function renderStudyAction\(plan\) \{\s+const feed = document\.getElementById/);
  assert.match(src, /action: "apply_study_action"/);
  assert.match(src, /Confirmar e aplicar/);
  assert.match(edge, /const question_count = Math\.max\(0/);
  assert.match(edge, /Number\(item\.question_count \?\? 10\)/);
  assert.match(edge, /Number\(item\.flashcard_count \?\? 15\)/);
  assert.match(edge, /p_apply: false/);
  assert.match(edge, /p_apply: true/);
});

test("PCM response is decoded separately from WAV and playback is guarded", () => {
  assert.ok(src.includes("getInt16(i * 2, true) / 32768"));
  assert.ok(src.includes("liveAudioContext.decodeAudioData(bytes.buffer)"));
  assert.ok(src.includes("puckPlaybackWatchdog"));
  assert.ok(src.includes("speechFinishWatchdog"));
});

test("Zero or stale speech recognition confidence cannot block voice answers", () => {
  assert.match(src, /liveTranscriptConfidence > 0 && liveTranscriptConfidence <= 1/);
  assert.match(src, /liveTranscriptConfidence = null;\n    const hasMaterial/);
  assert.match(src, /Number\.isFinite\(confidence\) && confidence > 0 && confidence <= 1/);
});

test("Installed PWA references updated voice script and cache release", () => {
  const release = "20261030-leco-stt-v1";
  assert.ok(worker.includes("luria-pwa-" + release));
  assert.ok(pwa.includes('const release = "' + release + '"'));
  assert.ok(page.includes("/assets/js/pwa.js?v=" + release));
  assert.ok(page.includes("/assets/js/professor-alex-gemini.mjs?v=" + release));
});
