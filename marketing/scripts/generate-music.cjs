'use strict';
/*
 * Gerador de trilha sonora ambiente 100% royalty-free e livre para uso comercial.
 * Síntese aditiva com acordes suaves (foco, calmaria, estética médica moderna),
 * renderizada via PCM 16-bit 48kHz diretamente pelo FFmpeg embutido no Remotion.
 * Duração exata: 30 segundos com fade-in e fade-out.
 */
const fs = require('node:fs');
const path = require('node:path');
const { spawn } = require('node:child_process');
const { MARKETING, ffmpegPath } = require('./lib/common.cjs');

const SAMPLE_RATE = 48000;
const DURATION = 30.0;
const TOTAL_SAMPLES = Math.round(SAMPLE_RATE * DURATION);

// Progressão harmônica: Cm9 -> Abmaj9 -> Fm9 -> Bbadd9 (profunda, moderna e calma)
const CHORDS = [
  { start: 0.0, end: 7.5, notes: [130.81, 155.56, 196.00, 233.08, 293.66, 392.00] }, // C3, Eb3, G3, Bb3, D4, G4
  { start: 7.5, end: 15.0, notes: [103.83, 155.56, 196.00, 261.63, 311.13, 392.00] }, // Ab2, Eb3, G3, C4, Eb4, G4
  { start: 15.0, end: 22.5, notes: [87.31, 130.81, 155.56, 207.65, 261.63, 349.23] },  // F2, C3, Eb3, Ab3, C4, F4
  { start: 22.5, end: 30.0, notes: [116.54, 174.61, 233.08, 293.66, 349.23, 440.00] }  // Bb2, F3, Bb3, D4, F4, A4
];

function synthesize() {
  const buf = Buffer.alloc(TOTAL_SAMPLES * 4); // 2 canais * 16 bits (2 bytes) = 4 bytes por amostra
  let pos = 0;

  for (let i = 0; i < TOTAL_SAMPLES; i++) {
    const t = i / SAMPLE_RATE;
    let sampleL = 0;
    let sampleR = 0;

    // Fade in (1.5s) e fade out (2.5s)
    let masterEnv = 1.0;
    if (t < 1.5) masterEnv = t / 1.5;
    else if (t > 27.5) masterEnv = Math.max(0, (30.0 - t) / 2.5);

    for (const chord of CHORDS) {
      if (t >= chord.start - 0.5 && t <= chord.end + 0.5) {
        const chordLocal = t - chord.start;
        const chordDuration = chord.end - chord.start;
        // Envelope do acorde: ataque suave, sustentação, decaimento
        let chordEnv = 1.0;
        if (chordLocal < 0.6) chordEnv = Math.max(0, chordLocal / 0.6);
        else if (chordLocal > chordDuration - 0.8) chordEnv = Math.max(0, (chordDuration - chordLocal) / 0.8);

        chord.notes.forEach((freq, idx) => {
          // Harmônicos com pesos suaves (estilo piano elétrico / pad quente)
          const h1 = Math.sin(2 * Math.PI * freq * t);
          const h2 = 0.35 * Math.sin(2 * Math.PI * (freq * 2) * t);
          const h3 = 0.12 * Math.sin(2 * Math.PI * (freq * 3) * t);
          // LFO sutil para movimento estéreo
          const lfo = Math.sin(2 * Math.PI * 0.25 * t + idx);
          const pan = 0.5 + 0.25 * lfo;

          const noteSample = (h1 + h2 + h3) * chordEnv * 0.18;
          sampleL += noteSample * (1 - pan);
          sampleR += noteSample * pan;
        });
      }
    }

    // Pulso rítmico suave a cada 0.5s (120 bpm) com frequência grave abafada
    const beatPhase = (t * 2) % 1.0;
    const pulseEnv = Math.exp(-beatPhase * 9.0);
    const pulse = 0.08 * Math.sin(2 * Math.PI * 65.41 * t) * pulseEnv;
    sampleL += pulse * 0.5;
    sampleR += pulse * 0.5;

    // Limitador suave e master
    const outL = Math.max(-1.0, Math.min(1.0, sampleL * masterEnv * 0.9));
    const outR = Math.max(-1.0, Math.min(1.0, sampleR * masterEnv * 0.9));

    buf.writeInt16LE(Math.round(outL * 32767), pos);
    buf.writeInt16LE(Math.round(outR * 32767), pos + 2);
    pos += 4;
  }
  return buf;
}

async function main() {
  const outDir = path.join(MARKETING, 'public', 'audio');
  fs.mkdirSync(outDir, { recursive: true });
  const outFile = path.join(outDir, 'traube-ambient-focus-30s.mp3');

  console.log('Sintetizando trilha sonora ambiente para TRAUBE (30s, 48kHz stereo)...');
  const pcm = synthesize();

  const ffmpeg = ffmpegPath();
  await new Promise((resolve, reject) => {
    const child = spawn(ffmpeg, [
      '-y',
      '-f', 's16le',
      '-ar', String(SAMPLE_RATE),
      '-ac', '2',
      '-i', 'pipe:0',
      '-c:a', 'libmp3lame',
      '-b:a', '192k',
      outFile
    ], { windowsHide: true });

    child.on('error', reject);
    child.on('close', code => {
      if (code === 0) resolve();
      else reject(new Error('FFmpeg de áudio saiu com código ' + code));
    });

    child.stdin.write(pcm);
    child.stdin.end();
  });

  const stats = fs.statSync(outFile);
  console.log(`✔ Trilha gerada: ${outFile} (${Math.round(stats.size / 1024)} KB, licença: CC0 / Royalty-Free Comercial)`);
}

if (require.main === module) {
  main().catch(e => { console.error(e); process.exitCode = 1; });
}

module.exports = { synthesize };
