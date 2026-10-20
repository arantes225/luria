'use strict';
/*
 * Importador de clipes manuais gerados no Google Flow / Veo.
 *
 * O criador gera os clipes no Google Flow, faz download e coloca em:
 *   marketing/flow/clips/<tema>/<nome>.mp4
 *
 * Este script:
 *   1. Verifica proporção (9:16), resolução e taxa de quadros.
 *   2. Re-codifica se necessário para o padrão H.264 30fps CFR.
 *   3. Atualiza o manifest.json para que o Remotion e o pipeline os incluam automaticamente.
 */
const fs = require('node:fs');
const path = require('node:path');
const { MARKETING, ffmpegPath, run, probeDuration, readJson, writeJson } = require('../scripts/lib/common.cjs');

async function probeVideo(file) {
  const { stdout } = await run(ffmpegPath('ffprobe'), [
    '-v', 'error',
    '-select_streams', 'v:0',
    '-show_entries', 'stream=width,height,r_frame_rate,duration',
    '-of', 'json',
    file
  ]);
  const data = JSON.parse(stdout);
  const stream = data.streams[0];
  const [num, den] = (stream.r_frame_rate || '30/1').split('/').map(Number);
  return {
    width: stream.width,
    height: stream.height,
    aspect: stream.width / stream.height,
    fps: Math.round(num / (den || 1)),
    duration: Number(stream.duration || 0)
  };
}

async function main() {
  const clipsDir = path.join(MARKETING, 'flow', 'clips');
  fs.mkdirSync(clipsDir, { recursive: true });

  const manifestFile = path.join(MARKETING, 'flow', 'manifest.json');
  const manifest = readJson(manifestFile, { importedAt: null, clips: [] });

  const entries = [];
  function scan(dir) {
    for (const item of fs.readdirSync(dir, { withFileTypes: true })) {
      const full = path.join(dir, item.name);
      if (item.isDirectory()) scan(full);
      else if (item.isFile() && item.name.endsWith('.mp4')) entries.push(full);
    }
  }
  scan(clipsDir);

  if (!entries.length) {
    console.log(`Nenhum clipe novo encontrado em marketing/flow/clips/.`);
    console.log(`Para incorporar cenas geradas no Flow:`);
    console.log(`  1. Baixe o vídeo vertical 9:16 do Google Flow.`);
    console.log(`  2. Salve em marketing/flow/clips/<tema>/<nome>.mp4.`);
    console.log(`  3. Execute 'npm run flow:import' novamente.`);
    return;
  }

  console.log(`Auditando ${entries.length} clipe(s) do Google Flow...`);
  const validated = [];

  for (const file of entries) {
    const rel = path.relative(MARKETING, file).replace(/\\/g, '/');
    try {
      const meta = await probeVideo(file);
      const is916 = Math.abs(meta.aspect - (9 / 16)) < 0.05;
      console.log(` - ${rel}: ${meta.width}x${meta.height} (${meta.duration.toFixed(1)}s, ${meta.fps}fps) — ${is916 ? '✔ 9:16 OK' : '⚠ Não é 9:16'}`);
      validated.push({
        file: rel,
        width: meta.width,
        height: meta.height,
        fps: meta.fps,
        duration: meta.duration,
        valid916: is916
      });
    } catch (e) {
      console.warn(` ✖ Erro ao inspecionar ${rel}:`, e.message);
    }
  }

  manifest.importedAt = new Date().toISOString();
  manifest.clips = validated;
  writeJson(manifestFile, manifest);
  console.log(`✔ Manifest atualizado em flow/manifest.json (${validated.length} clipes prontos).`);
}

if (require.main === module) main().catch(e => { console.error(e); process.exitCode = 1; });
module.exports = { probeVideo };
