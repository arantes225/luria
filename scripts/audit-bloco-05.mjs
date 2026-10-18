import { BLOCO_05_AULAS, countUsefulChars } from './bloco-05-utils.mjs';

export function auditAllBloco05() {
  const results = [];
  for (const a of BLOCO_05_AULAS) {
    const res = countUsefulChars(a.slug);
    const deficit = Math.max(0, 60000 - res.count);
    results.push({
      topic: a,
      chars: res.count,
      format: res.format,
      deficit,
      passed: res.count >= 60000
    });
  }
  return results;
}

if (process.argv[1]?.endsWith('audit-bloco-05.mjs')) {
  const results = auditAllBloco05();
  console.log('Nº | Slug | Formato | Caracteres úteis | Déficit 60k | Situação');
  console.log('---|---|---|---:|---:|---');
  let passedCount = 0;
  for (const r of results) {
    const status = r.passed
      ? 'passou na triagem de extensão'
      : r.chars > 0
      ? 'precisa expandir'
      : 'não iniciado';
    if (r.passed) passedCount++;
    const num = r.topic.aula < 100 ? '0' + r.topic.aula : String(r.topic.aula);
    console.log(`${num} | ${r.topic.slug} | ${r.format} | ${r.chars} | ${r.deficit} | ${status}`);
  }
  console.log(`\nConsolidado Bloco 5: ${passedCount} / ${results.length} acima de 60k úteis. Pendentes de expansão: ${results.length - passedCount}.`);
}
