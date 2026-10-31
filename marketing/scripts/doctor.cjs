'use strict';
/*
 * Script de diagnóstico do ambiente do TRAUBE Marketing Studio.
 *
 * Uso:
 *   node scripts/doctor.cjs
 */
const fs = require('node:fs');
const path = require('node:path');
const { spawnSync } = require('node:child_process');
const { MARKETING, REPO, chromePath, ffmpegPath } = require('./lib/common.cjs');

console.log('=== TRAUBE MARKETING STUDIO — DIAGNÓSTICO DO SISTEMA ===\n');

let allOk = true;

// 1. Node.js
const nodeVer = process.version;
const major = parseInt(nodeVer.slice(1).split('.')[0], 10);
if (major >= 24) {
  console.log(`✔ Node.js: ${nodeVer} (Compatível)`);
} else {
  console.log(`✖ Node.js: ${nodeVer} (Necessário >= 24.0.0)`);
  allOk = false;
}

// 2. Navegador Chrome/Chromium
const chrome = chromePath();
if (chrome && fs.existsSync(chrome)) {
  console.log(`✔ Navegador Chromium: ${chrome}`);
} else {
  console.log(`✖ Navegador Chromium não encontrado. Defina a variável CHROME_PATH.`);
  allOk = false;
}

// 3. FFmpeg embutido do Remotion
const ffmpeg = ffmpegPath();
try {
  const res = spawnSync(ffmpeg, ['-version'], { encoding: 'utf8', windowsHide: true });
  if (res.status === 0) {
    const firstLine = res.stdout.split('\n')[0].trim();
    console.log(`✔ FFmpeg: ${firstLine}`);
  } else {
    console.log(`✖ FFmpeg retornou status ${res.status}`);
    allOk = false;
  }
} catch (e) {
  console.log(`✖ Falha ao executar FFmpeg: ${e.message}`);
  allOk = false;
}

// 4. Branch Git
try {
  const branch = spawnSync('git', ['branch', '--show-current'], { cwd: REPO, encoding: 'utf8', windowsHide: true }).stdout.trim();
  console.log(`✔ Branch Git ativa: ${branch} ${branch === 'marketing/studio-pipeline' ? '(Isolada e segura)' : '⚠ Atenção: não está na branch de marketing'}`);
} catch (e) {
  console.log(`⚠ Não foi possível verificar branch: ${e.message}`);
}

// 5. Verificação das pastas essenciais
const requiredDirs = [
  'capture',
  'calendar',
  'metricool',
  'flow/prompts',
  'flow/clips',
  'public/assets/logos',
  'public/audio',
  'public/captures',
  'dist/reels',
  'dist/covers'
];

let dirsOk = true;
for (const d of requiredDirs) {
  const p = path.join(MARKETING, d);
  if (!fs.existsSync(p)) {
    fs.mkdirSync(p, { recursive: true });
  }
}
console.log(`✔ Estrutura de diretórios: 100% verificada e inicializada`);

console.log(`\nDiagnóstico final: ${allOk ? '✔ SISTEMA 100% OPERACIONAL E PRONTO PARA PRODUÇÃO' : '✖ PENDÊNCIAS ENCONTRADAS'}`);
if (!allOk) process.exitCode = 1;
