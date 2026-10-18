import { saveBook, countUsefulChars } from './bloco-06-utils.mjs';
import * as p1 from './build-bloco-05-118-part1.mjs';
import * as p2 from './build-bloco-05-118-part2.mjs';
import * as p3 from './build-bloco-05-118-part3.mjs';
import * as p4 from './build-bloco-05-118-part4.mjs';

const sections = [
  p1.sec1,
  p1.sec2,
  p1.sec3,
  p1.sec4,
  p1.sec5,
  p2.sec6,
  p2.sec7,
  p2.sec8,
  p2.sec9,
  p2.sec10,
  p3.sec11,
  p3.sec12,
  p3.sec13,
  p3.sec14,
  p3.sec15,
  p4.sec16,
  p4.sec17,
  p4.sec18,
  p4.sec19
];

const references = [
  {
    title: 'Sociedade Brasileira de Pediatria (SBP). Tratado de Pediatria. 5ª edição. Barueri: Manole, 2021.',
    details: 'Capítulos de Hematologia Pediátrica: Anemia Ferropriva, Doença Falciforme e Esferocitose Hereditária.'
  },
  {
    title: 'Sociedade Brasileira de Pediatria (SBP) - Departamento Científico de Hematologia e Hemoterapia.',
    details: 'Consenso sobre Anemia Ferropriva: mais que uma deficiência, uma urgência de saúde pública. Guia Prático de Atualização, 2021.'
  },
  {
    title: 'Ministério da Saúde do Brasil.',
    details: 'Programa Nacional de Suplementação de Ferro: Manual de Condutas Gerais. Secretaria de Atenção Primária à Saúde, Brasília, 2020.'
  },
  {
    title: 'Ministério da Saúde do Brasil.',
    details: 'Doença Falciforme: Diretrizes Básicas da Linha de Cuidado. Secretaria de Atenção Especializada à Saúde, Brasília, 2015/2018.'
  },
  {
    title: 'World Health Organization (WHO).',
    details: 'Guideline: Daily iron supplementation in infants and children. Geneva: World Health Organization, 2016.'
  },
  {
    title: 'Kliegman RM, St. Geme JW, Blum NJ, Shah SS, Tasker RC, Wilson KM, eds.',
    details: 'Nelson Textbook of Pediatrics. 21st ed. Philadelphia: Elsevier; 2020. Part XIX: The Blood.'
  },
  {
    title: 'National Heart, Lung, and Blood Institute (NHLBI).',
    details: 'Evidence-Based Management of Sickle Cell Disease: Expert Panel Report, 2014.'
  },
  {
    title: 'Bolton-Maggs PH, Stevens RF, Dodd NJ, et al.',
    details: 'Guidelines for the diagnosis and management of hereditary spherocytosis--2011 update. British Journal of Haematology. 2012;156(1):37-49.'
  }
];

const book = {
  slug: 'anemias-na-infancia',
  title: 'Anemias na Infância',
  subtitle: 'Tratado Completo de Hematologia Pediátrica para Concursos e Residência Médica',
  area: 'Pediatria',
  materia: 'Hematologia Pediátrica',
  order: 118,
  sections,
  references
};

let totalUseful = 0;
sections.forEach((s, idx) => {
  const chars = countUsefulChars(s.body_html);
  totalUseful += chars;
  console.log(`Seção ${idx + 1} [${s.title}]: ${chars} caracteres úteis`);
});

console.log(`\nTOTAL ÚTIL DE ANEMIAS NA INFÂNCIA: ${totalUseful} caracteres úteis.`);

saveBook(book.slug, book);
console.log(`Apostila salva com sucesso em apostilas/${book.slug}!`);
