import fs from 'fs';

const drafts = [
  { num: 47, file: 'apostilas/_rascunhos/lote-03-047-trauma-atendimento-inicial-xabcde.md' },
  { num: 50, file: 'apostilas/_rascunhos/lote-03-050-financiamento-gestao-sus.md' },
  { num: 51, file: 'apostilas/_rascunhos/lote-03-051-dpoc.md' },
  { num: 52, file: 'apostilas/_rascunhos/lote-03-052-traumatismo-cranioencefalico.md' },
  { num: 53, file: 'apostilas/_rascunhos/lote-03-053-desidratacao-terapia-reidratacao-pediatria.md' },
  { num: 55, file: 'apostilas/_rascunhos/lote-03-055-vigilancia-em-saude.md' },
  { num: 57, file: 'apostilas/_rascunhos/lote-03-057-trauma-toracico.md' },
  { num: 58, file: 'apostilas/_rascunhos/lote-03-058-diarreia-aguda-pediatria.md' },
  { num: 65, file: 'apostilas/_rascunhos/lote-04-aula-065-vigilancia-sanitaria.md' },
  { num: 66, file: 'apostilas/_rascunhos/lote-04-aula-066-derrame-pleural.md' },
  { num: 67, file: 'apostilas/_rascunhos/lote-04-aula-067-trauma-pelvico-geniturinario.md' }
];

for (const d of drafts) {
  if (!fs.existsSync(d.file)) {
    console.log(d.num, 'NOT FOUND:', d.file);
    continue;
  }
  const text = fs.readFileSync(d.file, 'utf8');
  const h2Count = [...text.matchAll(/^##\s+/gm)].length;
  console.log('Aula ' + d.num + ': ' + d.file + ' -> ' + text.length + ' chars, ' + h2Count + ' H2 sections');
}
