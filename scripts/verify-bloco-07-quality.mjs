import fs from 'fs';
import path from 'path';
import { countUsefulChars } from './bloco-07-utils.mjs';

export function verifyBook(slug) {
  const p = path.join(process.cwd(), 'apostilas', slug, 'index.html');
  if (!fs.existsSync(p)) {
    console.log(`[ERRO] Arquivo não encontrado: ${p}`);
    return false;
  }
  const html = fs.readFileSync(p, 'utf-8');
  const useful = countUsefulChars(html);
  
  const text = html.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
  const paras = text.split(/(?<=[.!?])\s+/).filter(s => s.trim().length >= 180);
  const seen = new Set();
  const dups = [];
  for (const s of paras) {
    const k = s.toLowerCase();
    if (seen.has(k)) dups.push(s);
    seen.add(k);
  }
  console.log(`[VERIFICADO] Slug: ${slug} | Úteis: ${useful} | Parágrafos >=180: ${paras.length} | Duplicatas: ${dups.length}`);
  if (useful < 60000) {
    console.log(`[ALERTA] Déficit de caracteres: faltam ${60000 - useful}`);
    return false;
  }
  if (dups.length > 0) {
    console.log(`[ALERTA] Encontradas ${dups.length} duplicatas! Exemplo: ${dups[0].slice(0, 100)}...`);
    return false;
  }
  return true;
}

const target = process.argv[2];
if (target) {
  verifyBook(target);
}
