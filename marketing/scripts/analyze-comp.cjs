'use strict';
const fs = require('fs');
const { spawnSync } = require('child_process');
const { ffmpegPath } = require('./lib/common.cjs');

const file = 'dist/competitor-mentoris.mp4';
const ffprobe = ffmpegPath('ffprobe');
const ffmpeg = ffmpegPath('ffmpeg');

const probe = spawnSync(ffprobe, [
  '-v', 'error',
  '-show_entries', 'stream=width,height,r_frame_rate,duration,codec_name:format=duration,size',
  '-of', 'json',
  file
]);
console.log('Metadata:\n' + probe.stdout.toString());

const times = [1, 3, 6, 9, 13, 17, 21, 26];
for (const t of times) {
  const out = `dist/comp-frame-${t}s.png`;
  spawnSync(ffmpeg, [
    '-y',
    '-ss', t.toString(),
    '-i', file,
    '-vframes', '1',
    out
  ]);
  console.log(`Saved ${out}`);
}
