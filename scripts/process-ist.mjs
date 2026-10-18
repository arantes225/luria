// scripts/process-ist.mjs
import fs from 'fs';
import path from 'path';
import { countUsefulChars } from './bloco-07-utils.mjs';

const htmlPath = path.join(process.cwd(), 'apostilas', 'infeccoes-sexualmente-transmissiveis', 'index.html');
const rawHtml = fs.readFileSync(htmlPath, 'utf8');

// Parse sections using cheerio or regex
// Let's find each <section class="book-section ..."> ... </section>
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

const bookData = {
  slug: 'infeccoes-sexualmente-transmissiveis',
  title: 'Infecções Sexualmente Transmissíveis (IST)',
  subtitle: 'Diretrizes Clínicas PCDT IST 2026 · Abordagem Sindrômica e Etiológica · Sífilis, Gonorreia, Clamídia, Úlceras Genitais e Verrugas Anogenitais',
  area: 'Ginecologia e Obstetrícia',
  materia: 'Ginecologia Geral e Infecciosa',
  sections: sections
};

const usefulChars = countUsefulChars(rawHtml);
console.log(`IST: ${sections.length} seções extraídas. Caracteres úteis do index.html: ${usefulChars}`);

const jsonPath = path.join(process.cwd(), 'apostilas', 'infeccoes-sexualmente-transmissiveis', 'content.json');
fs.writeFileSync(jsonPath, JSON.stringify(bookData, null, 2), 'utf8');
console.log(`Saved IST content.json (${fs.statSync(jsonPath).size} bytes)`);
