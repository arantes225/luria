// Leco live listening with server-side transcription.
//
// The browser's built-in SpeechRecognition guesses the most likely words and
// often rewrites medical terms. Here the browser only records each utterance
// (with echo cancellation), detects when the learner stops talking, encodes the
// audio as a small 16 kHz WAV and sends it to the authenticated Edge Function,
// which transcribes it with Gemini. The DOM and Supabase wiring stay in the
// caller: this module receives callbacks so the logic can be unit tested.

export const TARGET_SAMPLE_RATE = 16000;
const MIN_LEVEL = 0.012;
const INITIAL_NOISE_FLOOR = 0.004;
const MAX_NOISE_FLOOR = 0.05;
const PRE_ROLL_MS = 380;

export function rms(samples) {
  const length = samples?.length || 0;
  if (!length) return 0;
  let sum = 0;
  for (let i = 0; i < length; i++) sum += samples[i] * samples[i];
  return Math.sqrt(sum / length);
}

export function mergeChunks(chunks) {
  let total = 0;
  for (const chunk of chunks) total += chunk.length;
  const merged = new Float32Array(total);
  let offset = 0;
  for (const chunk of chunks) { merged.set(chunk, offset); offset += chunk.length; }
  return merged;
}

// Box-filter decimation: averaging the source window avoids most aliasing for
// speech when going from 44.1/48 kHz to 16 kHz.
export function downsample(samples, inputRate, outputRate = TARGET_SAMPLE_RATE) {
  if (!samples.length || inputRate <= outputRate) return { samples, sampleRate: inputRate };
  const ratio = inputRate / outputRate;
  const length = Math.floor(samples.length / ratio);
  const output = new Float32Array(length);
  for (let i = 0; i < length; i++) {
    const start = Math.floor(i * ratio);
    const end = Math.min(samples.length, Math.max(start + 1, Math.floor((i + 1) * ratio)));
    let sum = 0;
    for (let j = start; j < end; j++) sum += samples[j];
    output[i] = sum / (end - start);
  }
  return { samples: output, sampleRate: outputRate };
}

export function floatToPcm16(samples) {
  const pcm = new Int16Array(samples.length);
  for (let i = 0; i < samples.length; i++) {
    const clamped = Math.max(-1, Math.min(1, samples[i]));
    pcm[i] = clamped < 0 ? Math.round(clamped * 0x8000) : Math.round(clamped * 0x7fff);
  }
  return pcm;
}

export function encodeWav(pcm, sampleRate = TARGET_SAMPLE_RATE) {
  const dataBytes = pcm.length * 2;
  const buffer = new ArrayBuffer(44 + dataBytes);
  const view = new DataView(buffer);
  const writeText = (offset, text) => { for (let i = 0; i < text.length; i++) view.setUint8(offset + i, text.charCodeAt(i)); };
  writeText(0, "RIFF");
  view.setUint32(4, 36 + dataBytes, true);
  writeText(8, "WAVE");
  writeText(12, "fmt ");
  view.setUint32(16, 16, true);          // PCM chunk size
  view.setUint16(20, 1, true);           // PCM format
  view.setUint16(22, 1, true);           // mono
  view.setUint32(24, sampleRate, true);
  view.setUint32(28, sampleRate * 2, true);
  view.setUint16(32, 2, true);           // block align
  view.setUint16(34, 16, true);          // bits per sample
  writeText(36, "data");
  view.setUint32(40, dataBytes, true);
  for (let i = 0; i < pcm.length; i++) view.setInt16(44 + i * 2, pcm[i], true);
  return new Uint8Array(buffer);
}

export function encodeUtteranceToWav(chunks, inputRate) {
  const merged = mergeChunks(chunks);
  const reduced = downsample(merged, inputRate);
  return encodeWav(floatToPcm16(reduced.samples), reduced.sampleRate);
}

export function bytesToBase64(bytes) {
  let binary = "";
  const step = 0x8000;
  for (let i = 0; i < bytes.length; i += step) binary += String.fromCharCode.apply(null, bytes.subarray(i, i + step));
  return btoa(binary);
}

// Voice activity detector as a pure state machine fed with one RMS level per
// audio frame. While the assistant is speaking the threshold is raised so that
// echo leaking past the echo canceller does not interrupt it.
export function createVad(options = {}) {
  const startMs = options.startMs ?? 120;
  const minSpeechMs = options.minSpeechMs ?? 350;
  const silenceMs = options.silenceMs ?? 1000;
  const maxSpeechMs = options.maxSpeechMs ?? 30000;
  const sustainMs = options.sustainMs ?? 350;
  const playbackSustainMs = options.playbackSustainMs ?? 550;
  const playbackBoost = options.playbackBoost ?? 1.8;
  let noiseFloor = INITIAL_NOISE_FLOOR;
  let speaking = false;
  let voicedRun = 0;
  let voicedMs = 0;
  let speechMs = 0;
  let silenceRun = 0;
  let sustainedFired = false;
  let startedDuringPlayback = false;

  function reset() {
    speaking = false; voicedRun = 0; voicedMs = 0; speechMs = 0; silenceRun = 0;
    sustainedFired = false; startedDuringPlayback = false;
  }

  function threshold(playback) {
    return Math.max(MIN_LEVEL, noiseFloor * 3) * (playback ? playbackBoost : 1);
  }

  function push(level, frameMs, context = {}) {
    const events = [];
    const playback = Boolean(context.playback);
    const voiced = level >= threshold(playback);
    if (!speaking) {
      if (voiced) voicedRun += frameMs;
      else {
        voicedRun = Math.max(0, voicedRun - frameMs);
        noiseFloor = Math.min(MAX_NOISE_FLOOR, noiseFloor * 0.95 + level * 0.05);
      }
      if (voicedRun >= startMs) {
        speaking = true;
        startedDuringPlayback = playback;
        voicedMs = voicedRun;
        speechMs = voicedRun;
        silenceRun = 0;
        events.push({ type: "start" });
      }
      return events;
    }
    speechMs += frameMs;
    if (voiced) { voicedMs += frameMs; silenceRun = 0; } else silenceRun += frameMs;
    const needed = startedDuringPlayback ? playbackSustainMs : sustainMs;
    if (!sustainedFired && voicedMs >= needed) {
      sustainedFired = true;
      events.push({ type: "sustained" });
    }
    if (silenceRun >= silenceMs || speechMs >= maxSpeechMs) {
      events.push({ type: "end", valid: voicedMs >= minSpeechMs, speechMs, voicedMs, reason: speechMs >= maxSpeechMs ? "max" : "silence" });
      reset();
    }
    return events;
  }

  return { push, reset, get noiseFloor() { return noiseFloor; }, get speaking() { return speaking; } };
}

export function isServerSttSupported(win = globalThis.window) {
  return Boolean(win?.navigator?.mediaDevices?.getUserMedia && (win.AudioContext || win.webkitAudioContext));
}

// ?stt=device or localStorage traube_leco_stt=device keeps the old browser
// recognizer, which also serves as the automatic fallback.
export function shouldUseServerStt(win = globalThis.window) {
  if (!isServerSttSupported(win)) return false;
  try {
    const query = new URLSearchParams(win.location?.search || "").get("stt");
    if (query === "device") return false;
    if (query === "server") return true;
    if (win.localStorage?.getItem("traube_leco_stt") === "device") return false;
  } catch { /* Storage can be blocked; default to server transcription. */ }
  return true;
}

export function createLiveListener(options) {
  const {
    transcribe, onTranscript, onSpeechStart, onStatus, onError,
    isPlaybackActive = () => false,
    win = globalThis.window,
  } = options;
  let ctx = null;
  let stream = null;
  let source = null;
  let processor = null;
  let sink = null;
  let paused = false;
  let destroyed = false;
  let capturing = false;
  let chunks = [];
  let preRoll = [];
  let preRollMs = 0;
  let queue = Promise.resolve();
  const vad = createVad(options.vad);

  function resetCapture() {
    capturing = false;
    chunks = [];
    vad.reset();
  }

  function handleFrame(input) {
    if (destroyed) return;
    const frame = new Float32Array(input);
    const frameMs = (frame.length / ctx.sampleRate) * 1000;
    if (paused) { preRoll = []; preRollMs = 0; return; }
    const level = rms(frame);
    const events = vad.push(level, frameMs, { playback: isPlaybackActive() });
    if (!capturing) {
      preRoll.push(frame);
      preRollMs += frameMs;
      while (preRollMs > PRE_ROLL_MS && preRoll.length > 1) preRollMs -= (preRoll.shift().length / ctx.sampleRate) * 1000;
    } else chunks.push(frame);
    for (const event of events) {
      if (event.type === "start") {
        capturing = true;
        chunks = preRoll.slice();
        preRoll = []; preRollMs = 0;
      } else if (event.type === "sustained") {
        try { onSpeechStart?.(); } catch (error) { console.warn("[Leco STT] onSpeechStart", error?.name); }
      } else if (event.type === "end") {
        const utterance = chunks;
        chunks = []; capturing = false;
        if (event.valid && utterance.length) enqueue(utterance);
      }
    }
  }

  function enqueue(utterance) {
    const rate = ctx.sampleRate;
    onStatus?.("🎙️ Transcrevendo sua fala...");
    queue = queue.then(async () => {
      if (destroyed) return;
      try {
        const wav = encodeUtteranceToWav(utterance, rate);
        const result = await transcribe(wav);
        if (destroyed) return;
        const text = String(result?.transcript || "").trim();
        if (!text) { onStatus?.("🎙️ Não entendi nada. Pode repetir?"); return; }
        onTranscript?.({ text, uncertain: result?.uncertain === true });
      } catch (error) {
        if (!destroyed) onError?.({ fatal: false, code: error?.code || error?.name || "transcription_failed", error });
      }
    });
  }

  async function start() {
    if (destroyed || ctx) return;
    const Context = win.AudioContext || win.webkitAudioContext;
    // Created synchronously inside the user gesture so iOS lets it run.
    ctx = new Context();
    try { ctx.resume?.(); } catch { /* resumed again after getUserMedia */ }
    try {
      stream = await win.navigator.mediaDevices.getUserMedia({
        audio: { echoCancellation: true, noiseSuppression: true, autoGainControl: true, channelCount: 1 },
      });
    } catch (error) {
      const denied = error?.name === "NotAllowedError" || error?.name === "SecurityError";
      try { await ctx.close?.(); } catch { /* ignore */ }
      ctx = null;
      onError?.({ fatal: true, code: denied ? "not-allowed" : "no-microphone", error });
      return;
    }
    if (destroyed) { stream.getTracks().forEach(track => track.stop()); return; }
    try { await ctx.resume?.(); } catch { /* keep going; frames simply will not arrive */ }
    source = ctx.createMediaStreamSource(stream);
    processor = ctx.createScriptProcessor(2048, 1, 1);
    sink = ctx.createGain();
    sink.gain.value = 0; // Keep the node graph alive without playing the mic back.
    processor.onaudioprocess = event => handleFrame(event.inputBuffer.getChannelData(0));
    source.connect(processor);
    processor.connect(sink);
    sink.connect(ctx.destination);
    paused = false;
  }

  function pause() { paused = true; resetCapture(); preRoll = []; preRollMs = 0; }
  function resume() { if (!destroyed) paused = false; }

  function destroy() {
    destroyed = true;
    resetCapture();
    try { processor && (processor.onaudioprocess = null); } catch { /* ignore */ }
    for (const node of [source, processor, sink]) { try { node?.disconnect(); } catch { /* ignore */ } }
    try { stream?.getTracks().forEach(track => track.stop()); } catch { /* ignore */ }
    try { ctx?.close?.(); } catch { /* ignore */ }
    ctx = stream = source = processor = sink = null;
  }

  return { start, pause, resume, destroy, get started() { return Boolean(stream); }, get paused() { return paused; } };
}
