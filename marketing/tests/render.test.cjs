'use strict';
const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { MARKETING, ffmpegPath, run } = require('../scripts/lib/common.cjs');

test('Arquivos de saída da entrega obrigatória existem e estão íntegros', () => {
  const reelPath = path.join(MARKETING, 'dist', 'reels', 'reelstudyrats.mp4');
  const coverPath = path.join(MARKETING, 'dist', 'covers', 'reelstudyrats-cover.png');
  const audioPath = path.join(MARKETING, 'public', 'audio', 'luria-ambient-focus-30s.mp3');
  const rawRecording = path.join(MARKETING, 'public', 'captures', 'study-rats', 'mobile.mp4');

  assert.ok(fs.existsSync(reelPath), 'Reel final MP4 deve existir em dist/reels/');
  assert.ok(fs.existsSync(coverPath), 'Capa PNG do Reel deve existir em dist/covers/');
  assert.ok(fs.existsSync(audioPath), 'Trilha sonora oficial deve existir em public/audio/');
  assert.ok(fs.existsSync(rawRecording), 'Gravação real da tela deve existir em public/captures/study-rats/');

  assert.ok(fs.statSync(reelPath).size > 1024 * 1024, 'Reel deve ter tamanho > 1 MB');
  assert.ok(fs.statSync(coverPath).size > 50 * 1024, 'Capa deve ter tamanho > 50 KB');
});

test('Especificações técnicas do Reel: 1080x1920, 30s, H.264 e AAC', async () => {
  const reelPath = path.join(MARKETING, 'dist', 'reels', 'reelstudyrats.mp4');
  const { stdout } = await run(ffmpegPath('ffprobe'), [
    '-v', 'error',
    '-show_streams',
    '-show_format',
    '-of', 'json',
    reelPath
  ]);

  const probe = JSON.parse(stdout);
  const duration = Number(probe.format.duration);
  assert.ok(duration >= 29.5 && duration <= 30.5, `Duração deve ser 30s (atual: ${duration}s)`);

  const video = probe.streams.find(s => s.codec_type === 'video');
  assert.ok(video, 'deve possuir stream de vídeo');
  assert.equal(video.width, 1080, 'largura deve ser 1080');
  assert.equal(video.height, 1920, 'altura deve ser 1920 (9:16 vertical)');
  assert.equal(video.codec_name, 'h264', 'codec deve ser H.264 para Instagram');

  const audio = probe.streams.find(s => s.codec_type === 'audio');
  assert.ok(audio, 'deve possuir stream de áudio');
  assert.equal(audio.codec_name, 'aac', 'codec de áudio deve ser AAC');
  assert.equal(audio.sample_rate, '48000', 'taxa de áudio deve ser 48kHz');
});
