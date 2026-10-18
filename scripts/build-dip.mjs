// scripts/build-dip.mjs
import fs from 'fs';
import path from 'path';
import { saveBook, countUsefulChars } from './bloco-07-utils.mjs';
import { secDipExpansao } from './builders/dip-expansion.mjs';

const slug = 'doenca-inflamatoria-pelvica';
const htmlPath = path.join(process.cwd(), 'apostilas', slug, 'index.html');
const rawHtml = fs.readFileSync(htmlPath, 'utf8');

// Parse existing sections from index.html
const sections = [];
const lines = rawHtml.split('\n');
let inSection = false;
let currentAttrs = '';
let currentLines = [];

for (const line of lines) {
  if (line.includes('<section') && !line.includes('class="book-page"')) {
    if (inSection && currentLines.length > 0) {
      const body = currentLines.join('\n');
      const titleMatch = body.match(/<h[12][^>]*>(.*?)<\/h[12]>/i);
      const title = titleMatch ? titleMatch[1].replace(/<[^>]+>/g, '').trim() : 'Seção';
      const idMatch = currentAttrs.match(/id="([^"]+)"/i) || currentAttrs.match(/id='([^']+)'/i);
      const id = idMatch ? idMatch[1] : title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
      sections.push({ id, title, body_html: body.trim() });
    }
    inSection = true;
    currentAttrs = line;
    currentLines = [];
  } else if (inSection) {
    if (line.includes('</section>')) {
      const body = currentLines.join('\n');
      const titleMatch = body.match(/<h[12][^>]*>(.*?)<\/h[12]>/i);
      const title = titleMatch ? titleMatch[1].replace(/<[^>]+>/g, '').trim() : 'Seção';
      const idMatch = currentAttrs.match(/id="([^"]+)"/i) || currentAttrs.match(/id='([^']+)'/i);
      const id = idMatch ? idMatch[1] : title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
      sections.push({ id, title, body_html: body.trim() });
      inSection = false;
      currentAttrs = '';
      currentLines = [];
    } else {
      currentLines.push(line);
    }
  }
}

// Append new comprehensive expansion sections
for (const sec of secDipExpansao) {
  sections.push(sec);
}

const bookData = {
  slug,
  title: 'Doença Inflamatória Pélvica (DIP) e Cervicites',
  subtitle: 'Critérios de Hager Modificados (CDC/MS 2026) · Classificação e Estadiamento de Monif I-IV · Síndrome de Fitz-Hugh-Curtis e Abscesso Tubo-Ovariano · Protocolos Ambulatoriais e Hospitalares',
  area: 'Ginecologia e Obstetrícia',
  materia: 'Ginecologia Infecciosa e Emergências Ginecológicas',
  sections: sections
};

saveBook(slug, bookData);

const newHtml = fs.readFileSync(path.join(process.cwd(), 'apostilas', slug, 'index.html'), 'utf8');
const chars = countUsefulChars(newHtml);
console.log(`[SUCESSO] ${slug} compilado e expandido: ${chars} caracteres úteis.`);
