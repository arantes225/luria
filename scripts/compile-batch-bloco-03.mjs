import { compileMarkdownToBook } from './compile-draft-to-v2.mjs';

const batch = [
  {
    num: 50,
    slug: 'financiamento-e-gestao-do-sus',
    title: 'Financiamento e Gestão do SUS',
    area: 'Medicina Preventiva',
    materia: 'Gestão e Economia da Saúde',
    mdPath: 'apostilas/_rascunhos/lote-03-050-financiamento-gestao-sus.md'
  },
  {
    num: 51,
    slug: 'dpoc',
    title: 'Doença Pulmonar Obstrutiva Crônica (DPOC)',
    area: 'Clínica Médica',
    materia: 'Pneumologia',
    mdPath: 'apostilas/_rascunhos/lote-03-051-dpoc.md'
  },
  {
    num: 52,
    slug: 'traumatismo-cranioencefalico',
    title: 'Traumatismo Cranioencefálico',
    area: 'Cirurgia Geral',
    materia: 'Neurocirurgia e Trauma',
    mdPath: 'apostilas/_rascunhos/lote-03-052-traumatismo-cranioencefalico.md'
  },
  {
    num: 53,
    slug: 'desidratacao-e-terapia-de-reidratacao',
    title: 'Desidratação e Terapia de Reidratação',
    area: 'Pediatria',
    materia: 'Emergências Pediátricas e Terapia Hidroeletrolítica',
    mdPath: 'apostilas/_rascunhos/lote-03-053-desidratacao-terapia-reidratacao-pediatria.md'
  },
  {
    num: 55,
    slug: 'vigilancia-em-saude',
    title: 'Vigilância em Saúde',
    area: 'Medicina Preventiva',
    materia: 'Vigilância e Sistemas de Informação',
    mdPath: 'apostilas/_rascunhos/lote-03-055-vigilancia-em-saude.md'
  },
  {
    num: 57,
    slug: 'trauma-toracico',
    title: 'Trauma Torácico',
    area: 'Cirurgia Geral',
    materia: 'Cirurgia Torácica e Trauma',
    mdPath: 'apostilas/_rascunhos/lote-03-057-trauma-toracico.md'
  },
  {
    num: 58,
    slug: 'diarreia-aguda',
    title: 'Diarreia Aguda na Infância',
    area: 'Pediatria',
    materia: 'Gastroenterologia e Infectologia Pediátrica',
    mdPath: 'apostilas/_rascunhos/lote-03-058-diarreia-aguda-pediatria.md'
  },
  {
    num: 65,
    slug: 'vigilancia-sanitaria',
    title: 'Vigilância Sanitária',
    area: 'Medicina Preventiva',
    materia: 'Regulação Sanitária e Proteção da Saúde',
    mdPath: 'apostilas/_rascunhos/lote-04-aula-065-vigilancia-sanitaria.md'
  },
  {
    num: 66,
    slug: 'derrame-pleural',
    title: 'Derrame Pleural',
    area: 'Clínica Médica',
    materia: 'Pneumologia e Cirurgia Torácica',
    mdPath: 'apostilas/_rascunhos/lote-04-aula-066-derrame-pleural.md'
  },
  {
    num: 67,
    slug: 'trauma-pelvico-e-geniturinario',
    title: 'Trauma Pélvico e Geniturinário',
    area: 'Cirurgia Geral',
    materia: 'Urologia e Cirurgia do Trauma',
    mdPath: 'apostilas/_rascunhos/lote-04-aula-067-trauma-pelvico-geniturinario.md'
  }
];

for (const item of batch) {
  console.log(`Compilando Aula ${item.num}: ${item.title}...`);
  try {
    compileMarkdownToBook(item, item.mdPath);
  } catch (err) {
    console.error(`Erro ao compilar Aula ${item.num}:`, err.message);
  }
}
