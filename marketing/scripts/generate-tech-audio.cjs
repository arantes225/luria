'use strict';
/*
 * Gerador de trilha sonora + Sound Design Hospitalar High-Tech (30s, 48kHz Estéreo).
 * Combina:
 *  - Base synth futurista (arpejo tecnológico 120 BPM + pads espaciais)
 *  - Efeitos sonoros de UI (whooshes de transição, cliques digitais, scanner)
 *  - Bipes reais do Monitor Multiparamétrico:
 *      * 13.0s: Chime de ativação do monitor
 *      * 13.5s - 20.0s: Bipes de Fibrilação Atrial Instável (~178 bpm irregular)
 *      * 19.6s - 20.5s: Carga do desfibrilador + Choque de Cardioversão Sincronizada
 *      * 20.8s - 25.5s: Bipes estabilizados em Ritmo Sinusal (76 bpm regular)
 */
const fs = require('node:fs');
const path = require('node:path');
const { spawn } = require('node:child_process');
const { MARKETING, ffmpegPath } = require('./lib/common.cjs');

const SAMPLE_RATE = 48000;
const DURATION = 30.0;
const TOTAL_SAMPLES = Math.round(SAMPLE_RATE * DURATION);

// Acordes cyber-medical (Dm9 -> Bbmaj7 -> Gm9 -> Asus4/A7)
const CHORDS = [
  { start: 0.0, end: 6.5, root: 73.42, notes: [146.83, 174.61, 220.00, 261.63, 329.63] },
  { start: 6.5, end: 13.0, root: 58.27, notes: [116.54, 174.61, 220.00, 293.66, 349.23] },
  { start: 13.0, end: 20.5, root: 49.00, notes: [98.00, 146.83, 174.61, 220.00, 293.66] },
  { start: 20.5, end: 25.5, root: 55.00, notes: [110.00, 164.81, 220.00, 261.63, 329.63] },
  { start: 25.5, end: 30.0, root: 73.42, notes: [146.83, 220.00, 293.66, 349.23, 440.00] }
];

// Tempos exatos dos bipes cardíacos no monitor
// Fase 1: FA instável (~178 bpm, intervalos irregulares entre 0.28s e 0.41s)
const AF_BEEPS = [];
{
  const deltas = [0.31, 0.28, 0.38, 0.29, 0.34, 0.27, 0.40, 0.32, 0.30, 0.36];
  let t = 13.45;
  let idx = 0;
  while (t < 19.65) {
    AF_BEEPS.push(t);
    t += deltas[idx % deltas.length];
    idx++;
  }
}

// Fase 2: Ritmo Sinusal restaurado pós-cardioversão (76 bpm -> 0.789s por batimento)
const SINUS_BEEPS = [];
{
  let t = 20.9;
  while (t < 25.4) {
    SINUS_BEEPS.push(t);
    t += 60 / 76;
  }
}

// Transições tecnológicas (sub-drops + digital whoosh)
const TRANSITIONS = [0.1, 6.5, 12.8, 20.5, 25.5];

function synthesize() {
  const buf = Buffer.alloc(TOTAL_SAMPLES * 4);
  const arpStep = 60 / 120 / 4; // Semicolcheia a 120 BPM (0.125s)

  for (let i = 0; i < TOTAL_SAMPLES; i++) {
    const t = i / SAMPLE_RATE;
    let L = 0;
    let R = 0;

    // Envelope mestre
    let master = 1.0;
    if (t < 0.4) master = t / 0.4;
    else if (t > 28.2) master = Math.max(0, (30.0 - t) / 1.8);

    // 1) Pad e Sub-Bass Tecnológico
    for (const c of CHORDS) {
      if (t >= c.start - 0.3 && t <= c.end + 0.3) {
        let env = 1.0;
        if (t < c.start + 0.3) env = Math.max(0, (t - (c.start - 0.3)) / 0.6);
        else if (t > c.end - 0.3) env = Math.max(0, (c.end + 0.3 - t) / 0.6);

        // Sub-bass pulsante em colcheias
        const beatPhase = (t * 2) % 1;
        const bassPulse = 0.65 + 0.35 * Math.exp(-beatPhase * 4);
        const sub = Math.sin(2 * Math.PI * c.root * t) + 0.3 * Math.sin(2 * Math.PI * c.root * 2 * t);
        L += sub * env * bassPulse * 0.22;
        R += sub * env * bassPulse * 0.22;

        // Pad espacial
        c.notes.forEach((f, nIdx) => {
          const detune = 1 + (nIdx - 2) * 0.0015;
          const wave = Math.sin(2 * Math.PI * f * detune * t) + 0.25 * Math.sin(2 * Math.PI * f * 2 * t);
          const pan = 0.5 + 0.35 * Math.sin(2 * Math.PI * 0.3 * t + nIdx);
          L += wave * env * 0.065 * (1 - pan);
          R += wave * env * 0.065 * pan;
        });

        // Arpejador Cyber (120 BPM 16th notes)
        if (t >= c.start && t < c.end) {
          const stepIndex = Math.floor(t / arpStep);
          const stepLocal = (t % arpStep) / arpStep;
          const arpEnv = Math.exp(-stepLocal * 6.5);
          const noteFreq = c.notes[stepIndex % c.notes.length] * 2;
          const arpWave = Math.sin(2 * Math.PI * noteFreq * t) + 0.4 * Math.sin(2 * Math.PI * noteFreq * 1.5 * t);
          const arpPan = (stepIndex % 2 === 0) ? 0.3 : 0.7;
          L += arpWave * arpEnv * 0.055 * (1 - arpPan);
          R += arpWave * arpEnv * 0.055 * arpPan;
        }
      }
    }

    // 2) Batida eletrônica sutil (Kick + Hi-hat digital)
    const beatDur = 0.5; // 120 BPM
    const beatLocal = t % beatDur;
    if (beatLocal < 0.12) {
      const kEnv = Math.exp(-beatLocal * 35);
      const kFreq = 52 + 110 * Math.exp(-beatLocal * 55);
      const kick = Math.sin(2 * Math.PI * kFreq * beatLocal) * kEnv * 0.28;
      L += kick;
      R += kick;
    }
    // Hi-hat no contratempo
    const hatLocal = (t + beatDur / 2) % beatDur;
    if (hatLocal < 0.04) {
      const hEnv = Math.exp(-hatLocal * 90);
      const noise = (Math.sin(i * 12.9898) * 43758.5453) % 1;
      L += noise * hEnv * 0.04;
      R += noise * hEnv * 0.04;
    }

    // 3) Transições High-Tech (Sub-drop + Scanner Sweep)
    for (const tr of TRANSITIONS) {
      const dt = t - tr;
      if (dt >= 0 && dt < 0.45) {
        const wEnv = Math.sin((dt / 0.45) * Math.PI);
        const sweepFreq = 220 + 880 * (dt / 0.45);
        const sig = Math.sin(2 * Math.PI * sweepFreq * dt) * wEnv * 0.12;
        L += sig * 0.8;
        R += sig * 1.2;
      }
    }

    // 4) Chime de conexão do Monitor ao vivo (t = 13.0s)
    if (t >= 13.0 && t < 13.35) {
      const dt = t - 13.0;
      const f = dt < 0.12 ? 880 : 1318.5;
      const env = Math.exp(-((dt % 0.12) * 14));
      const chime = Math.sin(2 * Math.PI * f * dt) * env * 0.22;
      L += chime;
      R += chime;
    }

    // 5) Bipes do Monitor em FA Instável (178 bpm, agudo de alerta 1046Hz)
    for (const bt of AF_BEEPS) {
      const dt = t - bt;
      if (dt >= 0 && dt < 0.055) {
        const env = Math.sin((dt / 0.055) * Math.PI);
        const beep = (Math.sin(2 * Math.PI * 1046.5 * dt) + 0.25 * Math.sin(2 * Math.PI * 2093 * dt)) * env * 0.20;
        L += beep * 0.75;
        R += beep * 1.15;
      }
    }

    // 6) Carga do Desfibrilador (19.65s - 20.40s) + Choque Sincronizado (20.45s)
    if (t >= 19.65 && t < 20.42) {
      const p = (t - 19.65) / 0.77;
      const chargeFreq = 500 + p * 1400;
      const charge = Math.sin(2 * Math.PI * chargeFreq * t) * (0.08 + p * 0.12);
      L += charge;
      R += charge;
    }
    if (t >= 20.45 && t < 20.75) {
      const dt = t - 20.45;
      const shockEnv = Math.exp(-dt * 18);
      const shock = (Math.sin(2 * Math.PI * 95 * dt) + 0.6 * Math.sin(2 * Math.PI * 1800 * dt)) * shockEnv * 0.38;
      L += shock;
      R += shock;
    }

    // 7) Bipes do Monitor Estabilizado em Ritmo Sinusal (76 bpm, 880Hz calmo e firme)
    for (const bt of SINUS_BEEPS) {
      const dt = t - bt;
      if (dt >= 0 && dt < 0.065) {
        const env = Math.sin((dt / 0.065) * Math.PI);
        const beep = Math.sin(2 * Math.PI * 880 * dt) * env * 0.19;
        L += beep;
        R += beep;
      }
    }

    const clamp = v => Math.max(-0.96, Math.min(0.96, v * master));
    buf.writeInt16LE(Math.round(clamp(L) * 32767), i * 4);
    buf.writeInt16LE(Math.round(clamp(R) * 32767), i * 4 + 2);
  }

  return buf;
}

async function main() {
  const outDir = path.join(MARKETING, 'public', 'audio');
  fs.mkdirSync(outDir, { recursive: true });
  const outFile = path.join(outDir, 'traube-tech-simulador-30s.mp3');

  console.log('Sintetizando trilha sonora High-Tech + Áudio do Monitor Multiparamétrico (30s)...');
  const pcmBuffer = synthesize();

  const ffmpeg = ffmpegPath();
  await new Promise((resolve, reject) => {
    const proc = spawn(ffmpeg, [
      '-y',
      '-f', 's16le',
      '-ar', String(SAMPLE_RATE),
      '-ac', '2',
      '-i', 'pipe:0',
      '-c:a', 'libmp3lame',
      '-b:a', '192k',
      outFile
    ], { stdio: ['pipe', 'ignore', 'pipe'] });

    let err = '';
    proc.stderr.on('data', d => { err += d; });
    proc.on('close', code => code === 0 ? resolve() : reject(new Error(err || `FFmpeg exited ${code}`)));
    proc.stdin.end(pcmBuffer);
  });

  const stat = fs.statSync(outFile);
  console.log(`✔ Áudio High-Tech gerado: ${outFile} (${Math.round(stat.size / 1024)} KB)`);
}

if (require.main === module) {
  main().catch(e => { console.error(e); process.exitCode = 1; });
}

module.exports = { main };
