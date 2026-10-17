import fs from 'fs';

const bloco3 = [
  { num: 47, slug: 'trauma-atendimento-inicial-abcde', title: 'Trauma: Atendimento Inicial e ABCDE', area: 'Cirurgia Geral' },
  { num: 48, slug: 'imunizacoes-na-infancia', title: 'Imunizações na Infância', area: 'Pediatria' },
  { num: 49, slug: 'gestacao-ectopica', title: 'Gestação Ectópica', area: 'Ginecologia e Obstetrícia' },
  { num: 50, slug: 'financiamento-e-gestao-do-sus', title: 'Financiamento e Gestão do SUS', area: 'Medicina Preventiva' },
  { num: 51, slug: 'dpoc', title: 'Doença Pulmonar Obstrutiva Crônica (DPOC)', area: 'Clínica Médica' },
  { num: 52, slug: 'traumatismo-cranioencefalico', title: 'Traumatismo Cranioencefálico', area: 'Cirurgia Geral' },
  { num: 53, slug: 'desidratacao-e-terapia-de-reidratacao', title: 'Desidratação e Terapia de Reidratação', area: 'Pediatria' },
  { num: 54, slug: 'doenca-trofoblastica-gestacional', title: 'Doença Trofoblástica Gestacional', area: 'Ginecologia e Obstetrícia' },
  { num: 55, slug: 'vigilancia-em-saude', title: 'Vigilância em Saúde', area: 'Medicina Preventiva' },
  { num: 56, slug: 'pneumonias-adquiridas-na-comunidade', title: 'Pneumonias Adquiridas na Comunidade', area: 'Clínica Médica' },
  { num: 57, slug: 'trauma-toracico', title: 'Trauma Torácico', area: 'Cirurgia Geral' },
  { num: 58, slug: 'diarreia-aguda', title: 'Diarreia Aguda na Infância', area: 'Pediatria' },
  { num: 59, slug: 'sangramento-na-segunda-metade-da-gestacao', title: 'Sangramento na Segunda Metade da Gestação', area: 'Ginecologia e Obstetrícia' },
  { num: 60, slug: 'vigilancia-epidemiologica', title: 'Vigilância Epidemiológica', area: 'Medicina Preventiva' },
  { num: 61, slug: 'tuberculose-pulmonar', title: 'Tuberculose Pulmonar', area: 'Clínica Médica' },
  { num: 62, slug: 'trauma-abdominal', title: 'Trauma Abdominal', area: 'Cirurgia Geral' },
  { num: 63, slug: 'doenca-do-refluxo-gastroesofagico-na-infancia', title: 'Doença do Refluxo Gastroesofágico na Infância', area: 'Pediatria' },
  { num: 64, slug: 'placenta-previa-e-descolamento-prematuro-de-placenta', title: 'Placenta Prévia e Descolamento Prematuro de Placenta', area: 'Ginecologia e Obstetrícia' },
  { num: 65, slug: 'vigilancia-sanitaria', title: 'Vigilância Sanitária', area: 'Medicina Preventiva' },
  { num: 66, slug: 'derrame-pleural', title: 'Derrame Pleural', area: 'Clínica Médica' },
  { num: 67, slug: 'trauma-pelvico-e-geniturinario', title: 'Trauma Pélvico e Geniturinário', area: 'Cirurgia Geral' },
  { num: 68, slug: 'desnutricao-e-deficiencias-nutricionais', title: 'Desnutrição e Deficiências Nutricionais', area: 'Pediatria' },
  { num: 69, slug: 'assistencia-ao-parto', title: 'Trabalho de Parto e Assistência ao Parto', area: 'Ginecologia e Obstetrícia' }
];

console.log('Nº | Slug | Área | Situação no workspace atual');
console.log('---|---|---|---');
for (const item of bloco3) {
  const dir = 'apostilas/' + item.slug;
  const exists = fs.existsSync(dir);
  let status = 'NÃO EXISTE';
  if (exists) {
    const hasHtml = fs.existsSync(dir + '/index.html');
    const hasJson = fs.existsSync(dir + '/content.json');
    status = `EXISTE (HTML: ${hasHtml}, JSON: ${hasJson})`;
  }
  console.log(`${String(item.num).padStart(3, '0')} | ${item.slug} | ${item.area} | ${status}`);
}
