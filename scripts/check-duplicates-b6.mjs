import fs from 'fs';
import path from 'path';

const slug = process.argv[2] || 'anemias-na-infancia';
const dir = path.join('apostilas', slug);

let text = '';

const jsonPath = path.join(dir, 'content.json');
const htmlPath = path.join(dir, 'index.html');

if (fs.existsSync(jsonPath)) {
  const data = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));
  if (Array.isArray(data.sections)) {
    for (const sec of data.sections) {
      if (sec.body_html) {
        text += ' ' + sec.body_html.replace(/<[^>]+>/g, ' ');
      }
    }
  }
}

if (!text && fs.existsSync(htmlPath)) {
  const html = fs.readFileSync(htmlPath, 'utf8');
  text = html.replace(/<[^>]+>/g, ' ');
}

text = text.replace(/\s+/g, ' ').trim();

// Divide por sentenças / parágrafos
const paras = text.split(/(?<=[.!?])\s+/).filter(p => p.trim().length >= 180);
const seen = new Set();
const dups = [];

for (const p of paras) {
  const norm = p.trim().toLowerCase();
  if (seen.has(norm)) {
    dups.push(p);
  }
  seen.add(norm);
}

console.log(`[CHECK DUPLICATES BLOCO 6] Slug: ${slug} | Total texto limpo: ${text.length} chars | Sentenças/Parágrafos >=180: ${paras.length} | Duplicatas: ${dups.length}`);
if (dups.length > 0) {
  console.log('Exemplos de duplicatas:', dups.slice(0, 3));
}
