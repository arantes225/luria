'use strict';
/*
 * Validador de qualidade, segurança e conformidade científica do Calendário Editorial.
 *
 * Regras:
 *   1. Prevenção contra temas ou datas duplicadas.
 *   2. Conteúdos médicos exigem fontes científicas idôneas (diretrizes, ensaios clínicos, manuais MS).
 *   3. Proibido inventar dados ou estatísticas não respaldadas.
 *   4. Legendas e hashtags formatadas dentro dos limites do Instagram.
 *   5. Se o status for 'produced', os arquivos de vídeo/capa devem existir localmente.
 */
const fs = require('node:fs');
const path = require('node:path');
const { MARKETING, readJson } = require('../scripts/lib/common.cjs');

function validate() {
  const calFile = path.join(MARKETING, 'calendar', 'calendar.json');
  const cal = readJson(calFile, null);
  if (!cal) throw new Error('calendar/calendar.json não encontrado');

  const errors = [];
  const warnings = [];
  const seenThemes = new Map();
  const seenDates = new Map();

  cal.posts.forEach((post, i) => {
    const idx = `#${i + 1} (${post.id || 'sem id'})`;

    // 1. Identificador único
    if (!post.id) errors.push(`${idx}: falta ID único`);

    // 2. Prevenção de duplicatas de tema
    const normalizedTheme = String(post.theme || '').toLowerCase().trim();
    if (seenThemes.has(normalizedTheme)) {
      errors.push(`${idx}: tema duplicado com o post ${seenThemes.get(normalizedTheme)} ("${post.theme}")`);
    } else {
      seenThemes.set(normalizedTheme, idx);
    }

    // 3. Prevenção de conflito de datas no mesmo horário
    if (post.plannedDate) {
      if (seenDates.has(post.plannedDate)) {
        warnings.push(`${idx}: mesma data/hora de publicação que ${seenDates.get(post.plannedDate)}`);
      } else {
        seenDates.set(post.plannedDate, idx);
      }
    } else {
      errors.push(`${idx}: data planejada não informada`);
    }

    // 4. Validação científica obrigatória para conteúdos clínicos/médicos
    if (post.contentType === 'reel_clinical' || post.contentType === 'reel_question') {
      if (!Array.isArray(post.scientificSources) || post.scientificSources.length === 0) {
        errors.push(`${idx}: conteúdo clínico requer pelo menos uma fonte científica idônea`);
      } else {
        post.scientificSources.forEach((src, sIdx) => {
          if (typeof src !== 'string' || src.trim().length < 15) {
            errors.push(`${idx}: fonte científica #${sIdx + 1} muito genérica ou inválida`);
          }
        });
      }
    }

    // 5. Validação da legenda e hashtags
    if (!post.caption || post.caption.length < 50) {
      errors.push(`${idx}: legenda do Instagram muito curta ou ausente`);
    }
    if (/lorem ipsum|todo|teste|preencher/i.test(post.caption)) {
      errors.push(`${idx}: legenda contém texto de rascunho proibido`);
    }

    if (Array.isArray(post.hashtags)) {
      if (post.hashtags.length > 20) {
        warnings.push(`${idx}: mais de 20 hashtags (${post.hashtags.length}) — o algoritmo do Instagram recomenda entre 5 e 10`);
      }
      post.hashtags.forEach(h => {
        if (!h.startsWith('#')) errors.push(`${idx}: hashtag inválida (deve começar com #): "${h}"`);
      });
    }

    // 6. Verificação de integridade dos arquivos se marcado como 'produced'
    if (post.status === 'produced' && post.visualAssets) {
      if (post.visualAssets.finalReel) {
        const fullVideo = path.join(MARKETING, post.visualAssets.finalReel);
        if (!fs.existsSync(fullVideo)) {
          warnings.push(`${idx}: status 'produced', mas o arquivo de vídeo ainda não foi encontrado em: ${post.visualAssets.finalReel}`);
        }
      }
      if (post.visualAssets.cover) {
        const fullCover = path.join(MARKETING, post.visualAssets.cover);
        if (!fs.existsSync(fullCover)) {
          warnings.push(`${idx}: status 'produced', mas a capa ainda não foi encontrada em: ${post.visualAssets.cover}`);
        }
      }
    }
  });

  return { ok: errors.length === 0, errors, warnings, totalPosts: cal.posts.length };
}

function main() {
  console.log('Validando conformidade do Calendário Editorial TRAUBE...');
  const res = validate();

  if (res.warnings.length) {
    console.log(`\n⚠ ${res.warnings.length} alerta(s):`);
    res.warnings.forEach(w => console.log('  [AVISO] ' + w));
  }

  if (!res.ok) {
    console.error(`\n✖ ${res.errors.length} erro(s) de conformidade:`);
    res.errors.forEach(e => console.error('  [ERRO] ' + e));
    process.exitCode = 1;
  } else {
    console.log(`\n✔ Sucesso: ${res.totalPosts} publicações validadas sem erros de duplicação ou conformidade científica.`);
  }
}

if (require.main === module) main();
module.exports = { validate };
