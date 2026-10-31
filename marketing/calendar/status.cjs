'use strict';
/*
 * Exibe o status consolidado do Calendário Editorial da TRAUBE.
 *
 * Uso:
 *   node calendar/status.cjs
 */
const path = require('node:path');
const { MARKETING, readJson } = require('../scripts/lib/common.cjs');

function main() {
  const calFile = path.join(MARKETING, 'calendar', 'calendar.json');
  const cal = readJson(calFile, null);
  if (!cal) {
    console.error('Calendário não encontrado em calendar/calendar.json');
    process.exitCode = 1;
    return;
  }

  console.log(`=== CALENDÁRIO EDITORIAL TRAUBE ===`);
  console.log(`Versão: ${cal.version} | Fuso: ${cal.timezone} | Total de postagens: ${cal.posts.length}\n`);

  const counts = { draft: 0, produced: 0, approved: 0, scheduled: 0, published: 0 };
  const byType = {};

  cal.posts.forEach((p, idx) => {
    counts[p.status] = (counts[p.status] || 0) + 1;
    byType[p.contentType] = (byType[p.contentType] || 0) + 1;

    const dateStr = new Date(p.plannedDate).toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' });
    const statusIcon = p.approved ? '🟢 [APROVADO]' : p.status === 'produced' ? '🟡 [PRODUZIDO - AGUARDANDO APROVAÇÃO]' : '⚪ [RASCUNHO]';

    console.log(`${idx + 1}. [${dateStr}] ${p.title}`);
    console.log(`   Tipo: ${p.contentType} | Status: ${statusIcon}`);
    console.log(`   Tema: ${p.theme}`);
    console.log(`   Fontes científicas: ${p.scientificSources.length} referência(s)`);
    if (p.visualAssets.finalReel) console.log(`   Vídeo final: ${p.visualAssets.finalReel}`);
    if (p.visualAssets.cover) console.log(`   Capa: ${p.visualAssets.cover}`);
    console.log('');
  });

  console.log('--- Resumo por Status ---');
  for (const [st, c] of Object.entries(counts)) {
    console.log(` - ${st.padEnd(12)}: ${c}`);
  }

  console.log('\n--- Resumo por Tipo de Conteúdo ---');
  for (const [tp, c] of Object.entries(byType)) {
    console.log(` - ${tp.padEnd(16)}: ${c}`);
  }
}

if (require.main === module) main();
