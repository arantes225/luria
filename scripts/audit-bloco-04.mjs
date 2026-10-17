import { BLOCO_04_AULAS, countUsefulChars } from './bloco-04-utils.mjs';

console.log('Nº | Slug | Formato | Caracteres úteis | Déficit 60k | Situação');
console.log('---|---|---|---:|---:|---');

let passed = 0;
let pending = 0;

for (const aula of BLOCO_04_AULAS) {
  const audit = countUsefulChars(aula.slug);
  const def = Math.max(0, 60000 - audit.count);
  const num = String(aula.aula).padStart(3, '0');
  let situacao = 'não iniciado';
  if (audit.count >= 60000) {
    situacao = 'passou na triagem de extensão';
    passed++;
  } else if (audit.count > 0) {
    situacao = 'precisa expandir';
    pending++;
  } else {
    pending++;
  }
  console.log(`${num} | ${aula.slug} | ${audit.format === 'none' ? '-' : audit.format} | ${audit.count} | ${def} | ${situacao}`);
}

console.log(`\nConsolidado Bloco 4: ${passed} / ${BLOCO_04_AULAS.length} acima de 60k úteis. Pendentes de expansão: ${pending}.`);
