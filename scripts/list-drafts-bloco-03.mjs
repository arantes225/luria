import fs from 'fs';

function walk(dir) {
  let res = [];
  if (!fs.existsSync(dir)) return res;
  for (const f of fs.readdirSync(dir)) {
    const p = dir + '/' + f;
    if (fs.statSync(p).isDirectory()) res = res.concat(walk(p));
    else res.push(p);
  }
  return res;
}

const drafts = walk('apostilas/_rascunhos').filter(f => f.endsWith('.md'));
console.log('Total markdown drafts in apostilas/_rascunhos:', drafts.length);

const bloco3Mapping = [
  { num: 47, term: '047', slug: 'trauma-atendimento-inicial-abcde', title: 'Trauma: Atendimento Inicial e ABCDE' },
  { num: 48, term: '048', slug: 'imunizacoes-na-infancia', title: 'Imunizações na Infância' },
  { num: 49, term: '049', slug: 'gestacao-ectopica', title: 'Gestação Ectópica' },
  { num: 50, term: '050', slug: 'financiamento-e-gestao-do-sus', title: 'Financiamento e Gestão do SUS' },
  { num: 51, term: '051', slug: 'dpoc', title: 'DPOC' },
  { num: 52, term: '052', slug: 'traumatismo-cranioencefalico', title: 'Traumatismo Cranioencefálico' },
  { num: 53, term: '053', slug: 'desidratacao-e-terapia-de-reidratacao', title: 'Desidratação e Terapia de Reidratação' },
  { num: 54, term: '054', slug: 'doenca-trofoblastica-gestacional', title: 'Doença Trofoblástica Gestacional' },
  { num: 55, term: '055', slug: 'vigilancia-em-saude', title: 'Vigilância em Saúde' },
  { num: 56, term: '056', slug: 'pneumonias-adquiridas-na-comunidade', title: 'Pneumonias Adquiridas na Comunidade' },
  { num: 57, term: '057', slug: 'trauma-toracico', title: 'Trauma Torácico' },
  { num: 58, term: '058', slug: 'diarreia-aguda', title: 'Diarreia Aguda' },
  { num: 59, term: '059', slug: 'sangramento-na-segunda-metade-da-gestacao', title: 'Sangramento na Segunda Metade da Gestação' },
  { num: 60, term: '60', slug: 'vigilancia-epidemiologica', title: 'Vigilância Epidemiológica' },
  { num: 61, term: '061', slug: 'tuberculose-pulmonar', title: 'Tuberculose Pulmonar' },
  { num: 62, term: '062', slug: 'trauma-abdominal', title: 'Trauma Abdominal' },
  { num: 63, term: '063', slug: 'doenca-do-refluxo-gastroesofagico-na-infancia', title: 'Doença do Refluxo Gastroesofágico na Infância' },
  { num: 64, term: '064', slug: 'placenta-previa-e-descolamento-prematuro-de-placenta', title: 'Placenta Prévia e Descolamento Prematuro de Placenta' },
  { num: 65, term: '065', slug: 'vigilancia-sanitaria', title: 'Vigilância Sanitária' },
  { num: 66, term: '066', slug: 'derrame-pleural', title: 'Derrame Pleural' },
  { num: 67, term: '067', slug: 'trauma-pelvico-e-geniturinario', title: 'Trauma Pélvico e Geniturinário' },
  { num: 68, term: '068', slug: 'desnutricao-e-deficiencias-nutricionais', title: 'Desnutrição e Deficiências Nutricionais' },
  { num: 69, term: 'parto', slug: 'assistencia-ao-parto', title: 'Trabalho de Parto e Assistência ao Parto' }
];

console.log('\nNº | Slug | Título | Rascunho encontrado | Tamanho (bytes)');
console.log('---|---|---|---|---:');
for (const b of bloco3Mapping) {
  const match = drafts.find(d => d.includes(b.term) || d.includes(b.slug));
  if (match) {
    const size = fs.statSync(match).size;
    console.log(`${String(b.num).padStart(3, '0')} | ${b.slug} | ${b.title} | ${match} | ${size}`);
  } else {
    console.log(`${String(b.num).padStart(3, '0')} | ${b.slug} | ${b.title} | (Nenhum rascunho correspondente) | 0`);
  }
}
