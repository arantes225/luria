'use strict';
/*
 * Renderizador de Reels e Capas em alta qualidade utilizando Remotion + Chrome local.
 *
 * Uso:
 *   node scripts/render.cjs
 *   node scripts/render.cjs --composition ReelStudyRats --cover
 *   node scripts/render.cjs --composition ReelCover --still
 *
 * Gera:
 *   marketing/dist/reels/<nome>.mp4  (1080x1920, 30fps H.264 AAC, 30s)
 *   marketing/dist/covers/<nome>.png (1080x1920)
 */
const fs = require('node:fs');
const path = require('node:path');
const { bundle } = require('@remotion/bundler');
const { renderMedia, renderStill, selectComposition } = require('@remotion/renderer');
const { MARKETING, chromePath, logRun, args } = require('./lib/common.cjs');

async function main() {
  const a = args();
  const compId = a.composition || 'ReelStudyRats';
  const renderCoverToo = a.cover !== false;
  const isStillOnly = a.still === true;

  const chrome = chromePath();
  if (!chrome) throw new Error('Google Chrome/Edge não localizado.');

  console.log(`[1/4] Empacotando composições Remotion com webpack/esbuild...`);
  const entryPoint = path.join(MARKETING, 'remotion', 'index.tsx');
  const bundleLocation = await bundle({
    entryPoint,
    publicDir: path.join(MARKETING, 'public'),
    webpackOverride: config => config
  });

  const distReels = path.join(MARKETING, 'dist', 'reels');
  const distCovers = path.join(MARKETING, 'dist', 'covers');
  fs.mkdirSync(distReels, { recursive: true });
  fs.mkdirSync(distCovers, { recursive: true });

  if (!isStillOnly) {
    console.log(`[2/4] Selecionando composição de vídeo: ${compId}...`);
    const composition = await selectComposition({
      serveUrl: bundleLocation,
      id: compId,
      chromiumExecutablePath: chrome
    });

    const outFile = path.join(distReels, `${compId.toLowerCase()}.mp4`);
    console.log(`[3/4] Renderizando Reel MP4: ${composition.width}x${composition.height} @ ${composition.fps}fps (${composition.durationInFrames} quadros)...`);

    const startT = Date.now();
    let lastLoggedPct = -1;

    await renderMedia({
      composition,
      serveUrl: bundleLocation,
      codec: 'h264',
      outputLocation: outFile,
      chromiumExecutablePath: chrome,
      imageFormat: 'jpeg',
      jpegQuality: 92,
      crf: 16,
      pixelFormat: 'yuv420p',
      audioCodec: 'aac',
      audioBitrate: '192k',
      concurrency: 1,
      disallowParallelEncoding: true,
      chromiumOptions: {
        gl: 'angle'
      },
      onProgress: ({ progress }) => {
        const pct = Math.round(progress * 100);
        if (pct % 10 === 0 && pct !== lastLoggedPct) {
          lastLoggedPct = pct;
          console.log(`  Progresso da renderização: ${pct}%`);
        }
      }
    });

    const elapsed = Math.round((Date.now() - startT) / 1000);
    const stat = fs.statSync(outFile);
    console.log(`✔ Reel renderizado: ${outFile} (${(stat.size / (1024 * 1024)).toFixed(2)} MB em ${elapsed}s)`);

    logRun('render_reel', {
      composition: compId,
      file: path.relative(MARKETING, outFile).replace(/\\/g, '/'),
      bytes: stat.size,
      seconds: composition.durationInFrames / composition.fps,
      renderElapsedSec: elapsed
    });
  }

  if (renderCoverToo || isStillOnly) {
    const outCover = path.join(distCovers, `${compId.toLowerCase()}-cover.png`);

    if (compId === 'ReelCommercialV1') {
      console.log(`[4/4] Renderizando capa 3D fotorealista para ${compId} (quadro 195)...`);
      const comp = await selectComposition({
        serveUrl: bundleLocation,
        id: compId,
        chromiumExecutablePath: chrome
      });
      await renderStill({
        composition: comp,
        serveUrl: bundleLocation,
        output: outCover,
        outputLocation: outCover,
        chromiumExecutablePath: chrome,
        frame: 195,
        imageFormat: 'png'
      });
    } else {
      const coverCompId = 'ReelCover';
      console.log(`[4/4] Renderizando capa estática: ${coverCompId}...`);
      const coverComp = await selectComposition({
        serveUrl: bundleLocation,
        id: coverCompId,
        chromiumExecutablePath: chrome
      });
      await renderStill({
        composition: coverComp,
        serveUrl: bundleLocation,
        output: outCover,
        outputLocation: outCover,
        chromiumExecutablePath: chrome,
        imageFormat: 'png'
      });
    }

    const statCover = fs.statSync(outCover);
    console.log(`✔ Capa gerada: ${outCover} (${Math.round(statCover.size / 1024)} KB)`);

    logRun('render_cover', {
      composition: compId,
      file: path.relative(MARKETING, outCover).replace(/\\/g, '/'),
      bytes: statCover.size
    });
  }

  console.log('\nProcesso de renderização concluído com sucesso!');
}

if (require.main === module) {
  main().catch(e => {
    console.error('Falha na renderização:', e);
    process.exitCode = 1;
  });
}

module.exports = { main };
