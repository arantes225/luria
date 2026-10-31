'use strict';
const test = require('node:test');
const assert = require('node:assert/strict');
const { MetricoolMcpClient } = require('../metricool/client.cjs');

test('Metricool: modo seguro bloqueia publicação direta sem rascunho', async () => {
  const client = new MetricoolMcpClient({ safeMode: true });
  await assert.rejects(
    async () => {
      await client.createSchedulePost({
        date: '2026-10-20T18:00:00Z',
        caption: 'Teste sem aprovação',
        mediaUrls: ['https://example.invalid/video.mp4'],
        isDraft: false
      });
    },
    /Modo seguro ativado/
  );
});

test('Metricool: rejeita mídias com caminhos locais não-HTTP', async () => {
  const client = new MetricoolMcpClient({ safeMode: false });
  await assert.rejects(
    async () => {
      await client.createSchedulePost({
        date: '2026-10-20T18:00:00Z',
        caption: 'Teste com caminho local',
        mediaUrls: ['C:\\Users\\lfab2\\video.mp4'],
        isDraft: true
      });
    },
    /Metricool requer URL pública válida/
  );
});

test('Metricool: gera payload de rascunho compatível com Instagram Reels em modo offline', async () => {
  const client = new MetricoolMcpClient();
  const res = await client.createSchedulePost({
    date: '2026-10-20T18:00:00Z',
    caption: 'Legenda de rascunho para Reel da TRAUBE #ResidenciaMedica',
    mediaUrls: ['https://storage.resibulando.online/marketing/reel-studyrats.mp4'],
    isDraft: true
  });

  assert.equal(res.ok, true);
  assert.equal(res.draft, true);
  assert.equal(res.payload.info.draft, true);
  assert.equal(res.payload.info.autoPublish, false);
  assert.equal(res.payload.info.networkData.instagramData.type, 'REEL');
});
