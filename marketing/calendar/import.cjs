'use strict';
/*
 * Importador e mesclador de itens do Calendário Editorial existente da LURIA.
 *
 * Suporta importação a partir de JSON ou Markdown com deduplicação automática.
 *
 * Uso:
 *   node calendar/import.cjs --file caminho/para/arquivo.json
 */
const fs = require('node:fs');
const path = require('node:path');
const { MARKETING, readJson, writeJson, args } = require('../scripts/lib/common.cjs');

function main() {
  const a = args();
  const calFile = path.join(MARKETING, 'calendar', 'calendar.json');
  const cal = readJson(calFile, { version: '1.0.0', timezone: 'America/Sao_Paulo', posts: [] });

  const targetFile = a.file || a._[0];
  if (!targetFile) {
    console.log('Uso: node calendar/import.cjs --file <arquivo>');
    console.log('Formatos suportados: .json (array de posts ou objeto com chave posts).');
    return;
  }

  const incoming = readJson(path.resolve(process.cwd(), targetFile));
  const newPosts = Array.isArray(incoming) ? incoming : (incoming.posts || []);

  const existingIds = new Set(cal.posts.map(p => p.id));
  const existingThemes = new Set(cal.posts.map(p => String(p.theme || '').toLowerCase().trim()));

  let added = 0;
  let skipped = 0;

  newPosts.forEach(post => {
    const normTheme = String(post.theme || '').toLowerCase().trim();
    if (existingIds.has(post.id) || existingThemes.has(normTheme)) {
      skipped++;
      return;
    }

    cal.posts.push({
      id: post.id || `post-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
      theme: post.theme || 'Sem tema',
      contentType: post.contentType || 'reel_clinical',
      plannedDate: post.plannedDate || new Date().toISOString(),
      title: post.title || post.theme,
      script: post.script || {},
      scientificSources: post.scientificSources || [],
      visualAssets: post.visualAssets || {},
      caption: post.caption || '',
      hashtags: post.hashtags || ['#ResidenciaMedica', '#LURIA'],
      status: 'draft',
      approved: false,
      publicationLink: null
    });
    added++;
  });

  cal.lastUpdated = new Date().toISOString();
  writeJson(calFile, cal);
  console.log(`✔ Importação concluída: ${added} novo(s) post(s) adicionados, ${skipped} duplicata(s) ignoradas.`);
}

if (require.main === module) main();
