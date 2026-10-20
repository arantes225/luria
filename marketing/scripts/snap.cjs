'use strict';
const path = require('node:path');
const { bundle } = require('@remotion/bundler');
const { renderStill, selectComposition } = require('@remotion/renderer');
const { MARKETING, chromePath, args } = require('./lib/common.cjs');

async function main() {
  const a = args();
  const compId = a.composition || 'ReelCommercialV1';
  const frame = parseInt(a.frame || '510', 10);
  const outName = a.out || `snap-${frame}.png`;
  const outFile = path.join(MARKETING, 'dist', outName);

  const chrome = chromePath();
  const entryPoint = path.join(MARKETING, 'remotion', 'index.tsx');

  console.log(`Empacotando e extraindo quadro ${frame} da composição ${compId}...`);
  const bundleLocation = await bundle({
    entryPoint,
    publicDir: path.join(MARKETING, 'public'),
    webpackOverride: config => config
  });

  const composition = await selectComposition({
    serveUrl: bundleLocation,
    id: compId,
    chromiumExecutablePath: chrome
  });

  await renderStill({
    composition,
    serveUrl: bundleLocation,
    output: outFile,
    chromiumExecutablePath: chrome,
    frame,
    imageFormat: 'png'
  });

  console.log(`✔ Quadro salvo com sucesso em: ${outFile}`);
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
