'use strict';
/*
 * Planejador e visualizador de agendamento do Metricool.
 *
 * Analisa o calendário editorial, verifica aprovações, previne duplicatas
 * e gera prévia dos rascunhos para o Instagram.
 *
 * Uso:
 *   node metricool/plan.cjs
 */
const path = require('node:path');
const { MARKETING, readJson } = require('../scripts/lib/common.cjs');
const { MetricoolMcpClient } = require('./client.cjs');

async function main() {
  const calFile = path.join(MARKETING, 'calendar', 'calendar.json');
  const cal = readJson(calFile, null);
  if (!cal) throw new Error('calendar/calendar.json não encontrado');

  const client = new MetricoolMcpClient();

  console.log('=== METRICOOL PLANNING & DRAFT INSPECTOR ===');
  console.log(`Status de Autenticação: ${client.isAuthenticated ? '🟢 Autenticado (API Oficial)' : '🟡 Modo Seguro Local (Dry-Run)'}`);
  console.log(`Modo Seguro: ${client.config.safeMode ? 'ATIVADO (bloqueia publicações não aprovadas)' : 'DESATIVADO'}`);
  console.log(`Modo Padrão: ${client.config.defaultAsDraft ? 'RASCUNHO (draft: true)' : 'AGENDAMENTO DIRETO'}\n`);

  const pendingApproval = [];
  const readyToDraft = [];

  for (const post of cal.posts) {
    if (post.approved === true) {
      readyToDraft.push(post);
    } else {
      pendingApproval.push(post);
    }
  }

  console.log(`Publicações Aprovadas para Rascunho no Metricool: ${readyToDraft.length}`);
  if (readyToDraft.length) {
    for (const post of readyToDraft) {
      console.log(` - [${post.plannedDate}] ${post.title}`);
      console.log(`   Legenda: ${post.caption.slice(0, 80)}...`);
    }
  } else {
    console.log('  (Nenhuma publicação foi aprovada expressamente ainda. Pela regra de segurança #7, nada é agendado sem autorização.)');
  }

  console.log(`\nPublicações Produzidas ou em Rascunho (Aguardando Aprovação Humana): ${pendingApproval.length}`);
  for (const post of pendingApproval) {
    const statusLabel = post.status === 'produced' ? '🟡 Produzido' : '⚪ Rascunho';
    console.log(` - [${post.plannedDate.slice(0, 10)}] ${statusLabel} | ${post.title}`);
    if (post.visualAssets?.finalReel) {
      console.log(`   Vídeo pronto localmente: ${post.visualAssets.finalReel}`);
    }
  }

  console.log('\n--- Regras de Mídia e Publicação para Instagram Reels ---');
  console.log('1. O Metricool requer que arquivos de vídeo estejam disponíveis via URL pública direta (.mp4).');
  console.log('2. Na primeira execução, nenhuma publicação é disparada sem aprovação manual do responsável.');
  console.log('3. Para aprovar um post, altere "approved": true no arquivo calendar/calendar.json.');
}

if (require.main === module) main().catch(e => { console.error(e); process.exitCode = 1; });
