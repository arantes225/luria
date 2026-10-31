const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");

const root = path.join(__dirname, "..");
const read = file => fs.readFileSync(path.join(root, file), "utf8");
const client = read("assets/js/professor-alex-gemini.mjs");
const edge = read("supabase/functions/professor-alex-gemini/index.ts");
const page = read("professor-alex/index.html");
const css = read("assets/css/professor-alex-layout-20261021.css");
const pwa = read("assets/js/pwa.js");
const sw = read("service-worker.js");

function simulatePhoneticBubble(correction) {
  const elements = [];
  let submissions = 0, stoppedListening = 0, stoppedAudio = 0;
  const input = { value: "" };
  const feed = { children: [], scrollTop: 0, scrollHeight: 400, appendChild(node) { node.isConnected = true; this.children.push(node); } };
  const form = { dispatchEvent() { submissions++; return true; } };
  const doc = {
    getElementById(id) {
      return ({ "alex-chat-feed": feed, "alex-prompt": input })[id] || null;
    },
    createElement(tag) {
      const el = {
        tag, textContent: "", className: "", disabled: false, isConnected: true,
        children: [], attrs: {}, listeners: {},
        appendChild(...children) { this.children.push(...children); },
        append(...children) { this.children.push(...children); },
        setAttribute(k,v) { this.attrs[k] = v; },
        addEventListener(k,handler) { this.listeners[k] = handler; },
      };
      elements.push(el);
      return el;
    },
  };
  const code = client.slice(
    client.indexOf("function renderPhoneticCorrection(correction) {"),
    client.indexOf("\nfunction renderStudyAction(plan)")
  );
  assert.ok(code.startsWith("function renderPhoneticCorrection"));
  const ctx = {
    document: doc, form,
    liveTranscriptConfidence: .9, liveTranscriptFromSpeech: true,
    stopLiveListening() { stoppedListening++; },
    stopCurrentVoicePlayback() { stoppedAudio++; },
    Event: class { constructor(type,options) { this.type=type; this.options=options; } },
  };
  vm.runInNewContext(code+"\nthis.render=renderPhoneticCorrection;",ctx);
  ctx.render(correction);
  const button = elements.find(e=>e.tag==="button");
  return { elements, button, feed, input, ctx,
    click() { button.listeners.click(); },
    get submissions() { return submissions; },
    get stoppedListening() { return stoppedListening; },
    get stoppedAudio() { return stoppedAudio; }
  };
}

test("CEP -> sepse displays a confirmation badge, then asks the corrected question with one click",()=>{
  const t=simulatePhoneticBubble({
    recognized:"CEP",corrected_term:"sepse",corrected_prompt:"Me explica sobre sepse",
    action_label:"✓ Sim! Me explica sobre Sepse",
  });
  assert.equal(t.submissions,0,"No automatic medical submission");
  assert.ok(t.elements.some(e=>e.textContent==="🎙️ Correção Fonética de Áudio (STT)"));
  assert.equal(t.button.textContent,"✓ Sim! Me explica sobre Sepse");
  assert.ok(t.elements.some(e=>e.textContent.includes('Ouvi "CEP". Você quis dizer "sepse"?')));
  t.click();
  assert.equal(t.input.value,"Me explica sobre sepse");
  assert.equal(t.submissions,1);
  assert.equal(t.ctx.liveTranscriptFromSpeech,false);
  assert.equal(t.ctx.liveTranscriptConfidence,null);
  assert.equal(t.stoppedListening,1);
  assert.equal(t.stoppedAudio,1);
  t.click();
  assert.equal(t.submissions,1,"Repeated taps cannot duplicate a request");
});

test("Provider text is not inserted with unsafe HTML",()=>{
  const t=simulatePhoneticBubble({recognized:"<img src=x onerror=alert(1)>",corrected_term:"sepse",corrected_prompt:"Me explica sobre sepse"});
  assert.equal(t.submissions,0);
  assert.doesNotMatch(client.slice(client.indexOf("function renderPhoneticCorrection"),client.indexOf("function renderStudyAction")), /\.innerHTML\s*=/);
  assert.ok(t.elements.some(e=>e.textContent.includes("<img src=x")));
});

test("Voice_input is true only for recognized microphone messages, never correction-button resubmits",()=>{
  assert.match(client,/let liveTranscriptFromSpeech = false/);
  assert.match(client,/const submittedFromSpeech = liveTranscriptFromSpeech/);
  assert.match(client,/voice_input: submittedFromSpeech/);
  assert.match(client,/liveTranscriptFromSpeech = true;\s*if \(input\) input.value = finalText/);
  assert.match(client,/liveTranscriptFromSpeech = false;\s*input.value = correctedPrompt/);
  assert.match(edge,/const isVoiceInput = data.voice_input === true/);
  assert.match(page,/new CustomEvent\("luria:leco:dictation"/);
  assert.match(client,/window\.addEventListener\("luria:leco:dictation"/);
  assert.match(client,/document\.getElementById\("alex-prompt"\)\?\.addEventListener\("input"/);
});

test("Server proposes CEP -> sepse only for an actual STT result and validates model proposals",()=>{
  assert.match(edge,/function knownPhoneticCorrection\(transcript: string\)/);
  assert.match(edge,/makePhoneticCorrection\("CEP", "sepse", "Me explica sobre sepse"\)/);
  assert.match(edge,/isVoiceInput \? knownPhoneticCorrection\(prompt\) : null/);
  assert.match(edge,/phonetic_correction: knownCorrection/);
  assert.match(edge,/function parseModelPhoneticCorrection\(answer: string, transcript: string\)/);
  assert.match(edge,/!normal\(transcript\)\.includes\(normal\(recognized\)\)/);
  assert.match(edge,/!normal\(correctedPrompt\)\.includes\(normal\(correctedTerm\)\)/);
  assert.match(edge,/clarification_code: "ambiguous_transcription"/);
  assert.match(client,/renderPhoneticCorrection\(data.phonetic_correction\)/);
});

test("PWA and accessible styling have a consistent fresh release",()=>{
  const release="20261030-leco-stt-v1";
  assert.ok(page.includes("professor-alex-gemini.mjs?v="+release));
  assert.ok(page.includes("pwa.js?v="+release));
  assert.ok(pwa.includes('const release = "'+release+'"'));
  assert.ok(sw.includes('CACHE_VERSION = "luria-pwa-'+release+'"'));
  assert.ok(client.includes("professor-alex-layout-20261021.css?v=stt1"));
  assert.ok(css.includes(".alex-stt-correction-apply:focus-visible"));
  assert.ok(css.includes("@media(max-width:600px)"));
});
