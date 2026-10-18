// scripts/bloco-07-builders/compile-155.mjs
import { sec1, sec2 } from './build-155-part1.mjs';
import { sec3, sec4 } from './build-155-part2.mjs';
import { sec5, sec6, sec7 } from './build-155-part3.mjs';
import { saveBook, countUsefulChars } from '../bloco-07-utils.mjs';

const sections = [sec1, sec2, sec3, sec4, sec5, sec6, sec7];

const bookData = {
  slug: 'saude-mental-na-atencao-primaria',
  title: 'Saúde Mental na Atenção Primária à Saúde',
  subtitle: 'Rede de Atenção Psicossocial (RAPS), Reforma Psiquiátrica e Modalidades de Internação (Lei 10.216/2001), Apoio Matricial e eMulti/NASF, Transtornos Mentais Comuns (Ansiedade, Depressão e Insônia), Desprescrição Segura de Benzodiazepínicos, Estratificação de Risco de Suicídio e Entrevista Motivacional',
  area: 'Medicina Preventiva',
  materia: 'Medicina de Família e Comunidade / Saúde Coletiva e Psiquiatria Comunitária',
  description: 'Tratado de Saúde Mental na Atenção Primária: a Rede de Atenção Psicossocial (RAPS) e o papel ordenador da Atenção Básica e dos CAPS, Lei da Reforma Psiquiátrica (internações voluntária, involuntária e compulsória), apoio matricial e o Projeto Terapêutico Singular (PTS), manejo prático dos Transtornos Mentais Comuns (GAD-7, PHQ-9 e higiene do sono/TCC-I), o desafio da desprescrição segura de benzodiazepínicos e manejo de abstinência, rastreamento e conduta estratificada diante do risco de suicídio e ferramentas de intervenção breve e entrevista motivacional (OARS e FRAMES) com casos e questões comentadas.',
  sections
};

console.log('--- Compilando Aula 155: saude-mental-na-atencao-primaria ---');
saveBook('saude-mental-na-atencao-primaria', bookData);

let totalChars = 0;
for (const s of sections) {
  const chars = countUsefulChars(s.body_html);
  console.log(`Seção "${s.id}": ${chars} caracteres úteis.`);
  totalChars += chars;
}
console.log(`\nTOTAL DE CARACTERES ÚTEIS AULA 155: ${totalChars}`);
