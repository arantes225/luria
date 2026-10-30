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
const speechCode = src.slice(src.indexOf("function speakText(text, onComplete) {"), src.indexOf("\nfunction initLiveVoiceMode()"));
assert.ok(speechCode.startsWith("function speakText"), "speakText must be available to test");

function speechHarness() {
  const spoken = [];
  const retries = [];
  const timers = [];
  const status = { textContent: "" };
  let completed = 0;
  class Utterance { constructor(text) { this.text = text; } }
  const synth = {
    paused: false,
    cancel() {},
    speak(utterance) { spoken.push(utterance); },
    resume() {},
    getVoices() { return [{ lang: "pt-BR" }]; },
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
    speechGeneration: 0,
    audioPlaybackPending: false,
    speechStartWatchdog: null,
    activeSpeechUtterance: null,
    hideSpeechRetry() {},
    showSpeechRetry(text, onComplete) { retries.push({ text, onComplete }); },
    setStopResponseVisible() {},
    setTimeout(callback, delay) {
      const timer = { id: nextTimer++, callback, delay, canceled: false };
      timers.push(timer);
      return timer.id;
    },
    clearTimeout(id) {
      const timer = timers.find(item => item.id === id);
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

test("Speech synthesis holds a strong utterance reference and completes once", () => {
  const t = speechHarness();
  t.say("**Olá**, tudo bem?");
  assert.equal(t.spoken.length, 1);
  assert.equal(t.spoken[0].text, "Olá, tudo bem?");
  assert.equal(t.context.activeSpeechUtterance, t.spoken[0]);
  assert.equal(t.context.audioPlaybackPending, true);
  t.spoken[0].onstart();
  assert.equal(t.status.textContent, "🔊 Leco está falando...");
  t.spoken[0].onend();
  t.spoken[0].onend();
  assert.equal(t.completed, 1);
  assert.equal(t.context.activeSpeechUtterance, null);
  assert.equal(t.context.audioPlaybackPending, false);
});

test("Speech rejection offers a user gesture instead of claiming success", () => {
  const t = speechHarness();
  t.say("A resposta clínica.");
  t.spoken[0].onerror({ error: "not-allowed" });
  assert.equal(t.completed, 0);
  assert.equal(t.context.audioPlaybackPending, false);
  assert.equal(t.retries.length, 1);
  assert.equal(t.retries[0].text, "A resposta clínica.");
  assert.match(t.status.textContent, /áudio foi bloqueado/);
});

test("Silent Safari speech timeout releases the stuck session and exposes retry", () => {
  const t = speechHarness();
  t.say("Uma resposta sem onstart.");
  assert.equal(t.timers[0].delay, 4500);
  t.timers[0].callback();
  const fallbackTimer = t.timers.at(-1);
  assert.equal(fallbackTimer.delay, 3500);
  fallbackTimer.callback();
  assert.equal(t.retries.length, 1);
  assert.equal(t.context.audioPlaybackPending, false);
});

test("Voice mode works with typed prompts even without browser speech recognition", () => {
  assert.match(src, /if \(!SpeechRec\) \{[\s\S]*?liveCallBtn\.title[\s\S]*?\}/);
  assert.match(src, /speakText\(SpeechRec \? "Pronto! Pode perguntar\."/);
  assert.match(src, /if \(!SpeechRec \|\| !isLiveActive/);
  assert.match(src, /showSpeechRetry\(plainText, onComplete\)/);
  assert.doesNotMatch(src, /if \(isLiveActive\) speakText\(isEstourado \?/);
});

test("Gemini PCM is handled explicitly instead of being passed to WAV decoder", () => {
  assert.match(src, /\^audio\\\/pcm/);
  assert.match(src, /getInt16\(i \* 2, true\) \/ 32768/);
  assert.match(src, /liveAudioContext\.decodeAudioData\(bytes\.buffer\)/);
  assert.match(src, /liveAudioContext\.state !== "running"/);
});

test("Installed PWA references the same updated release and voice script", () => {
  const release = "20261030-leco-voice2";
  assert.ok(worker.includes("luria-pwa-" + release));
  assert.ok(pwa.includes('const release = "' + release + '"'));
  assert.ok(page.includes("/assets/js/pwa.js?v=" + release));
  assert.ok(page.includes("/assets/js/professor-alex-gemini.mjs?v=20261030-voice2"));
});
