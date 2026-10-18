// scripts/compile-bloco-06-drafts.mjs
import fs from 'fs';
import path from 'path';
import { saveBook, countUsefulChars } from './bloco-06-utils.mjs';

function mdToHtml(md) {
  let html = md;

  // Process tables: lines starting with |
  const lines = html.split('\n');
  const outLines = [];
  let inTable = false;
  let tableHeader = [];
  let tableRows = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    if (line.startsWith('|') && line.endsWith('|')) {
      const cells = line.slice(1, -1).split('|').map(c => c.trim());
      if (!inTable) {
        inTable = true;
        tableHeader = cells;
        tableRows = [];
      } else {
        if (cells.every(c => /^:?-+:?$/.test(c))) {
          // separator, ignore
        } else {
          tableRows.push(cells);
        }
      }
    } else {
      if (inTable) {
        let tableHtml = '<table class="book-table"><thead><tr>';
        for (const h of tableHeader) tableHtml += `<th>${h}</th>`;
        tableHtml += '</tr></thead><tbody>';
        for (const row of tableRows) {
          tableHtml += '<tr>';
          for (const cell of row) tableHtml += `<td>${cell}</td>`;
          tableHtml += '</tr>';
        }
        tableHtml += '</tbody></table>';
        outLines.push(tableHtml);
        inTable = false;
        tableHeader = [];
        tableRows = [];
      }
      outLines.push(lines[i]);
    }
  }

  if (inTable) {
    let tableHtml = '<table class="book-table"><thead><tr>';
    for (const h of tableHeader) tableHtml += `<th>${h}</th>`;
    tableHtml += '</tr></thead><tbody>';
    for (const row of tableRows) {
      tableHtml += '<tr>';
      for (const cell of row) tableHtml += `<td>${cell}</td>`;
      tableHtml += '</tr>';
    }
    tableHtml += '</tbody></table>';
    outLines.push(tableHtml);
  }

  html = outLines.join('\n');

  // Convert headings
  html = html.replace(/^#### (.*$)/gim, '<h4>$1</h4>');
  html = html.replace(/^### (.*$)/gim, '<h3>$1</h3>');
  html = html.replace(/^## (.*$)/gim, '<h2>$1</h2>');
  html = html.replace(/^# (.*$)/gim, '<h1>$1</h1>');

  // Bold & Italics
  html = html.replace(/\*\*\*(.*?)\*\*\*/g, '<strong><em>$1</em></strong>');
  html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
  html = html.replace(/\*(.*?)\*/g, '<em>$1</em>');

  // Lists
  html = html.replace(/^\s*-\s+(.*$)/gim, '<li>$1</li>');

  // Wrap loose lines in <p>
  const paragraphs = html.split(/\n\s*\n/);
  const formatted = paragraphs.map(p => {
    p = p.trim();
    if (!p) return '';
    if (p.startsWith('<h') || p.startsWith('<table') || p.startsWith('<ul') || p.startsWith('<ol') || p.startsWith('<li>') || p.startsWith('<blockquote') || p.startsWith('<div')) {
      return p;
    }
    return `<p>${p.replace(/\n/g, '<br>')}</p>`;
  }).filter(Boolean).join('\n\n');

  return formatted;
}

function parseDraftSections(mdContent) {
  const lines = mdContent.split('\n');
  const sections = [];
  let currentTitle = 'Introdução e Fundamentos';
  let currentLines = [];

  for (const line of lines) {
    if (line.startsWith('## ')) {
      if (currentLines.length > 0) {
        const mdText = currentLines.join('\n');
        sections.push({
          id: currentTitle.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
          title: currentTitle,
          body_html: mdToHtml(mdText)
        });
        currentLines = [];
      }
      currentTitle = line.replace(/^##\s+/, '').trim();
    } else {
      currentLines.push(line);
    }
  }

  if (currentLines.length > 0) {
    const mdText = currentLines.join('\n');
    sections.push({
      id: currentTitle.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
      title: currentTitle,
      body_html: mdToHtml(mdText)
    });
  }

  return sections;
}

export const DRAFT_MAPPINGS = [
  { draft: 'lote-07-aula-121-itu-pielonefrite.md', slug: 'infeccao-do-trato-urinario-e-pielonefrite', title: 'Infecção do Trato Urinário e Pielonefrite', area: 'Clínica Médica' },
  { draft: 'lote-07-aula-125-rastreamento-prevencao-quaternaria.md', slug: 'rastreamento-e-prevencao-quaternaria', title: 'Rastreamento e Prevenção Quaternária', area: 'Medicina Preventiva' },
  { draft: 'lote-07-aula-126-cirrose-complicacoes.md', slug: 'cirrose-e-suas-complicacoes', title: 'Cirrose e suas Complicações', area: 'Clínica Médica' },
  { draft: 'lote-07-aula-127-hemorragia-digestiva-alta.md', slug: 'hemorragia-digestiva-alta', title: 'Hemorragia Digestiva Alta', area: 'Cirurgia Geral' },
  { draft: 'lote-07-aula-128-sepse-choque-septico-pediatrico.md', slug: 'sepse-e-choque-septico-pediatrico', title: 'Sepse e Choque Séptico Pediátrico', area: 'Pediatria' },
  { draft: 'lote-07-aula-130-historia-natural-niveis-prevencao.md', slug: 'niveis-de-prevencao-e-historia-natural-da-doenca', title: 'Níveis de Prevenção e História Natural da Doença', area: 'Medicina Preventiva' },
  { draft: 'lote-07-aula-131-hepatites-virais.md', slug: 'hepatites-virais', title: 'Hepatites Virais', area: 'Clínica Médica' },
  { draft: 'lote-07-aula-132-hemorragia-digestiva-baixa.md', slug: 'hemorragia-digestiva-baixa', title: 'Hemorragia Digestiva Baixa', area: 'Cirurgia Geral' },
  { draft: 'lote-07-aula-133-meningites-encefalites.md', slug: 'meningites-e-encefalites', title: 'Meningites e Encefalites', area: 'Pediatria' },
  { draft: 'lote-07-aula-135-imunizacoes-pni-2026.md', slug: 'imunizacao-e-programa-nacional-de-imunizacoes', title: 'Imunização e Programa Nacional de Imunizações', area: 'Medicina Preventiva' },
  { draft: 'lote-07-aula-136-hemorragia-digestiva-integrada.md', slug: 'hemorragia-digestiva', title: 'Hemorragia Digestiva Integrada', area: 'Clínica Médica' },
  { draft: 'lote-07-aula-137-drge-hernia-hiatal.md', slug: 'doenca-do-refluxo-e-hernia-hiatal', title: 'Doença do Refluxo Gastroesofágico e Hérnia Hiatal', area: 'Cirurgia Geral' },
  { draft: 'lote-07-aula-138-crises-convulsivas-estado-mal.md', slug: 'crises-convulsivas-e-estado-de-mal-epileptico', title: 'Crises Convulsivas e Estado de Mal Epiléptico', area: 'Pediatria' }
];

export function compileAllDrafts() {
  for (const item of DRAFT_MAPPINGS) {
    const draftPath = path.join(process.cwd(), 'apostilas', '_rascunhos', item.draft);
    if (!fs.existsSync(draftPath)) {
      console.log(`[WARN] Draft not found: ${item.draft}`);
      continue;
    }
    const md = fs.readFileSync(draftPath, 'utf-8');
    const sections = parseDraftSections(md);
    const bookData = {
      slug: item.slug,
      title: item.title,
      area: item.area,
      sections: sections
    };
    saveBook(item.slug, bookData);
    let chars = 0;
    for (const s of sections) chars += countUsefulChars(s.body_html);
    console.log(`Compiled ${item.slug} (${item.title}): ${chars} useful chars.`);
  }
}

compileAllDrafts();
