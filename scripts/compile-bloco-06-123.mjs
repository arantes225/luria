// Bloco 6 - Aula 123: Compiler & Assembler
import { sec1, sec2 } from './build-bloco-06-123-part1.mjs';
import { sec3, sec4 } from './build-bloco-06-123-part2.mjs';
import { sec5, sec6 } from './build-bloco-06-123-part3.mjs';
import { sec7, sec8 } from './build-bloco-06-123-part4.mjs';
import { sec9, sec10 } from './build-bloco-06-123-part5.mjs';
import { sec11 } from './build-bloco-06-123-part6.mjs';
import { saveBook, countUsefulChars } from './bloco-06-utils.mjs';

const references = [
  'American Academy of Pediatrics (AAP). Clinical Practice Guideline: Evaluation and Management of Well-Appearing Febrile Infants 8 to 60 Days Old. Pediatrics, v. 148, n. 2, e2021052228, 2021.',
  'Baraff LJ, et al. Practice guideline for the management of infants and children 0 to 36 months of age with fever without source. Pediatrics, v. 92, n. 1, p. 1-12, 1993.',
  'Sociedade Brasileira de Pediatria (SBP). Febre sem sinais de localização em lactentes e crianças pequenas: Guia Prático de Atualização do Departamento Científico de Pediatria Ambulatorial e Emergência. Rio de Janeiro: SBP, 2022.',
  'McCarthy PL, et al. Observation scales to identify serious illness in febrile children. Pediatrics, v. 70, n. 5, p. 802-809, 1982.',
  'Pantell RH, et al. Management of Febrile Infants: An Historical Perspective and 2021 AAP Guidelines. Current Opinion in Pediatrics, v. 34, n. 2, p. 210-217, 2022.',
  'National Institute for Health and Care Excellence (NICE). Fever in under 5s: assessment and initial management (NICE Guideline NG143). London: NICE, 2019 (updated 2021).',
  'Jaskiewicz JA, et al. Febrile infants at low risk for serious bacterial infection--an appraisal of the Boston, Rochester, and Philadelphia criteria. Collaborative Febrile Infant Study Group. Pediatrics, v. 94, n. 3, p. 390-396, 1994.',
  'McCracken GH Jr. Diagnosis and management of pneumonia in children. The Pediatric Infectious Disease Journal, v. 19, n. 9, p. 924-928, 2000.',
  'Bachar G, et al. Occult bacteremia in the era of conjugate pneumococcal vaccines. Pediatric Emergency Care, v. 23, n. 11, p. 777-781, 2007.',
  'McCrindle BW, et al. Diagnosis, Treatment, and Long-Term Management of Kawasaki Disease: A Scientific Statement for Health Professionals From the American Heart Association. Circulation, v. 135, n. 17, p. e927-e999, 2017.',
  'Feldman HA, et al. Pediatric multisystem inflammatory syndrome temporally associated with SARS-CoV-2 (MIS-C): A systematic review. JAMA Pediatrics, v. 175, n. 8, p. 834-845, 2021.',
  'World Health Organization (WHO). Pocket Book of Hospital Care for Children: Guidelines for the Management of Common Childhood Illnesses. 2. ed. Geneva: WHO, 2013.',
  'Subcommittee on Urinary Tract Infection. Reaffirmation: Urinary Tract Infection: Clinical Practice Guideline for the Diagnosis and Management of the Initial UTI in Febrile Infants and Young Children 2 to 24 Months. Pediatrics, v. 138, n. 6, e20163026, 2016.'
];

const sections = [
  sec1,
  sec2,
  sec3,
  sec4,
  sec5,
  sec6,
  sec7,
  sec8,
  sec9,
  sec10,
  sec11
];

const bookData = {
  slug: 'febre-sem-sinais-localizatorios',
  title: 'Febre sem Sinais Localizatórios (FSSL) na Infância',
  subtitle: 'Estratificação de Risco por Faixa Etária, Critérios de Rochester/Boston/AAP 2021, Escala de Yale, Triagem de ITU e Doença de Kawasaki',
  area: 'Pediatria e Emergência Pediátrica',
  materia: 'Pediatria / Infectologia Pediátrica',
  description: 'Tratado completo de abordagem clínica, diagnóstica e terapêutica da febre sem sinais localizatórios (FSSL) em neonatos (< 28 dias), lactentes jovens (29 a 90 dias) e pré-escolares (3 a 36 meses). Aborda o screening séptico neonatal, critérios de baixo risco, escala comportamental de Yale, busca ativa de ITU oculta, bacteremia e pneumonia silenciosas, casos clínicos e questões comentadas de concursos médicos.',
  sections,
  references
};

console.log('--- Compilando Aula 123: febre-sem-sinais-localizatorios ---');
saveBook('febre-sem-sinais-localizatorios', bookData);

let totalChars = 0;
for (const s of sections) {
  const chars = countUsefulChars(s.body_html);
  console.log(`Seção "${s.id}": ${chars} caracteres úteis.`);
  totalChars += chars;
}
console.log(`\nTOTAL DE CARACTERES ÚTEIS AULA 123: ${totalChars}`);
