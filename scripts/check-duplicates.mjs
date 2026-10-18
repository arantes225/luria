import { countUsefulChars } from './bloco-05-utils.mjs';

const slug = process.argv[2] || 'sensibilidade-especificidade-e-valores-preditivos';
const res = countUsefulChars(slug);
const text = res.text || '';
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

console.log(`[CHECK DUPLICATES] Slug: ${slug} | Úteis: ${res.count} | Sentenças/Parágrafos >=180: ${paras.length} | Duplicatas: ${dups.length}`);
if (dups.length > 0) {
  console.log('Exemplos de duplicatas:', dups.slice(0, 3));
}
