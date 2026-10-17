import fs from 'fs';
import path from 'path';
import { saveBook } from './bloco-03-utils.mjs';

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
        // Check if separator line
        if (cells.every(c => /^:?-+:?$/.test(c))) {
          // separator, ignore
        } else {
          tableRows.push(cells);
        }
      }
    } else {
      if (inTable) {
        // flush table
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

  // Headers: ### -> <h4>, ## -> <h3>
  html = html.replace(/^####\s+(.*)$/gm, '<h5>$1</h5>');
  html = html.replace(/^###\s+(.*)$/gm, '<h4>$1</h4>');
  html = html.replace(/^##\s+(.*)$/gm, '<h3>$1</h3>');

  // Bold / Italic
  html = html.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
  html = html.replace(/\*([^*]+)\*/g, '<em>$1</em>');

  // Bullet lists
  html = html.replace(/^[*-]\s+(.*)$/gm, '<li>$1</li>');
  html = html.replace(/((?:<li>.*<\/li>\s*)+)/g, '<ul>$1</ul>');

  // Blockquotes
  html = html.replace(/^>\s+(.*)$/gm, '<blockquote>$1</blockquote>');

  // Paragraphs
  const blocks = html.split(/\n\s*\n/);
  const finalBlocks = [];
  for (const b of blocks) {
    const trimmed = b.trim();
    if (!trimmed) continue;
    if (trimmed.startsWith('<h') || trimmed.startsWith('<ul') || trimmed.startsWith('<ol') || trimmed.startsWith('<table') || trimmed.startsWith('<blockquote')) {
      finalBlocks.push(trimmed);
    } else {
      finalBlocks.push(`<p>${trimmed.replace(/\n/g, '<br>')}</p>`);
    }
  }

  return finalBlocks.join('\n');
}

export function compileMarkdownToBook(meta, mdFilePath) {
  const mdContent = fs.readFileSync(mdFilePath, 'utf8');

  // Split by ## sections
  const h2Parts = mdContent.split(/\n(?=##\s+)/g);
  const sections = [];

  for (let i = 0; i < h2Parts.length; i++) {
    const part = h2Parts[i].trim();
    if (!part) continue;

    const match = part.match(/^##\s+([^\n]+)\n([\s\S]*)$/);
    if (!match) continue;

    const rawTitle = match[1].trim();
    const bodyMd = match[2].trim();

    // Skip section 0 (benchmarking / stage zero metadata) and audit / plan sections if metadata only
    if (/^0\.\s*etapa zero/i.test(rawTitle) || /plano da camada visual/i.test(rawTitle) || /status ainda não certificado/i.test(rawTitle)) {
      continue;
    }

    // Clean title for id and display
    const title = rawTitle.replace(/^\d+[\.\-]?\s*/, '').trim();
    const id = 'sec-' + (i + 1) + '-' + title.toLowerCase()
      .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '')
      .slice(0, 40);

    const bodyHtml = mdToHtml(bodyMd);

    sections.push({
      id,
      title,
      body_html: bodyHtml
    });
  }

  const references = meta.references || [
    { label: 'Ministério da Saúde - Atenção Especializada e Urgências', url: 'https://www.gov.br/saude' },
    { label: 'CONITEC - Diretrizes Nacionais', url: 'https://www.gov.br/conitec' },
    { label: 'Diretrizes Oficiais das Sociedades de Especialidade Médica', url: 'https://www.gov.br/saude' }
  ];

  const book = {
    slug: meta.slug,
    title: meta.title,
    area: meta.area,
    materia: meta.materia || meta.area,
    description: meta.description || `${meta.title} — Livro-Texto Completo LURIA`,
    sections,
    references
  };

  return saveBook(book);
}

// If executed directly with slug and mdPath
const args = process.argv.slice(2);
if (args.length >= 2) {
  const [slug, mdPath, title, area, materia] = args;
  compileMarkdownToBook({ slug, title: title || slug, area: area || 'Clínica Médica', materia: materia || area }, mdPath);
}
