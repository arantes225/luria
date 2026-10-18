// scripts/compile-bloco-07-drafts.mjs
import fs from 'fs';
import path from 'path';
import { saveBook, countUsefulChars } from './bloco-07-utils.mjs';

function mdToHtml(md) {
  let html = md;
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
        if (!cells.every(c => /^:?-+:?$/.test(c))) {
          tableRows.push(cells);
        }
      }
    } else {
      if (inTable) {
        let tableHtml = '<table class="book-table"><thead><tr>';
        for (const h of tableHeader) tableHtml += '<th>' + h + '</th>';
        tableHtml += '</tr></thead><tbody>';
        for (const row of tableRows) {
          tableHtml += '<tr>';
          for (const cell of row) tableHtml += '<td>' + cell + '</td>';
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
    for (const h of tableHeader) tableHtml += '<th>' + h + '</th>';
    tableHtml += '</tr></thead><tbody>';
    for (const row of tableRows) {
      tableHtml += '<tr>';
      for (const cell of row) tableHtml += '<td>' + cell + '</td>';
      tableHtml += '</tr>';
    }
    tableHtml += '</tbody></table>';
    outLines.push(tableHtml);
  }
  html = outLines.join('\n');
  html = html.replace(/^#### (.*$)/gim, '<h4>$1</h4>');
  html = html.replace(/^### (.*$)/gim, '<h3>$1</h3>');
  html = html.replace(/^## (.*$)/gim, '<h2>$1</h2>');
  html = html.replace(/^# (.*$)/gim, '<h1>$1</h1>');
  html = html.replace(/\*\*\*(.*?)\*\*\*/g, '<strong><em>$1</em></strong>');
  html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
  html = html.replace(/\*(.*?)\*/g, '<em>$1</em>');
  html = html.replace(/^\s*-\s+(.*$)/gim, '<li>$1</li>');
  const paragraphs = html.split(/\n\s*\n/);
  return paragraphs.map(p => {
    p = p.trim();
    if (!p) return '';
    if (p.startsWith('<h') || p.startsWith('<table') || p.startsWith('<ul') || p.startsWith('<ol') || p.startsWith('<li>') || p.startsWith('<blockquote') || p.startsWith('<div')) return p;
    return '<p>' + p.replace(/\n/g, '<br>') + '</p>';
  }).filter(Boolean).join('\n\n');
}

function parseDraftSections(mdContent) {
  const lines = mdContent.split('\n');
  const sections = [];
  let currentTitle = 'Introdução e Fundamentos';
  let currentLines = [];
  for (const line of lines) {
    if (line.startsWith('## ')) {
      if (currentLines.length > 0) {
        sections.push({
          id: currentTitle.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
          title: currentTitle,
          body_html: mdToHtml(currentLines.join('\n'))
        });
        currentLines = [];
      }
      currentTitle = line.replace(/^##\s+/, '').trim();
    } else {
      currentLines.push(line);
    }
  }
  if (currentLines.length > 0) {
    sections.push({
      id: currentTitle.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
      title: currentTitle,
      body_html: mdToHtml(currentLines.join('\n'))
    });
  }
  return sections;
}

const list = [
  { draft: 'lote-07-aula-139-endometriose.md', slug: 'endometriose', title: 'Endometriose', area: 'Ginecologia e Obstetrícia' },
  { draft: 'lote-07-aula-140-saude-crianca-aps.md', slug: 'saude-da-crianca-na-aps', title: 'Saúde da Criança na Atenção Primária', area: 'Medicina Preventiva' }
];

for (const item of list) {
  const p = path.join(process.cwd(), 'apostilas', '_rascunhos', item.draft);
  if (!fs.existsSync(p)) continue;
  const md = fs.readFileSync(p, 'utf-8');
  const sections = parseDraftSections(md);
  saveBook(item.slug, { slug: item.slug, title: item.title, area: item.area, sections });
  let chars = 0;
  for (const s of sections) chars += countUsefulChars(s.body_html);
  console.log('Compiled', item.slug, chars, 'chars.');
}
