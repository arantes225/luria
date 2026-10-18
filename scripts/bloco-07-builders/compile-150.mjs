// scripts/bloco-07-builders/compile-150.mjs
import { sec1, sec2 } from './build-150-part1.mjs';
import { sec3 } from './build-150-part2.mjs';
import { sec4, sec5 } from './build-150-part3.mjs';
import { sec6, sec7 } from './build-150-part4.mjs';
import { saveBook, countUsefulChars } from '../bloco-07-utils.mjs';

const sections = [sec1, sec2, sec3, sec4, sec5, sec6, sec7];

const bookData = {
  slug: 'saude-do-adulto-e-do-idoso-na-aps',
  title: 'Saúde do Adulto e do Idoso na Atenção Primária à Saúde',
  subtitle: 'Transição Demográfica e Epidemiológica, PNSPI e Capacidade Funcional, Caderneta de Saúde do Idoso, Escalas de Katz e Lawton, Os 5 Gigantes da Geriatria, Iatrogenia e Critérios de Beers/STOPP-START, Prevenção de Sarcopenia e Rastreamentos',
  area: 'Medicina Preventiva',
  materia: 'Medicina de Família e Comunidade / Geriatria e Saúde Coletiva',
  description: 'Tratado completo de Saúde do Adulto e do Idoso na Atenção Primária: análise detalhada da transição demográfica e epidemiológica brasileira, diretrizes da Política Nacional de Saúde da Pessoa Idosa (PNSPI), avaliação multidimensional (Caderneta de Saúde, Katz e Lawton), os Grandes Gigantes da Geriatria (Instabilidade/Quedas, Imobilidade, Incontinência, Iatrogenia/Polifarmácia com critérios de Beers 2023 e STOPP/START, Insuficiência Cognitiva e Demências/Delirium), sarcopenia e fragilidade de Linda Fried, rastreamentos no adulto/idoso e casos clínicos com questões comentadas.',
  sections
};

console.log('--- Compilando Aula 150: saude-do-adulto-e-do-idoso-na-aps ---');
saveBook('saude-do-adulto-e-do-idoso-na-aps', bookData);

let totalChars = 0;
for (const s of sections) {
  const chars = countUsefulChars(s.body_html);
  console.log(`Seção "${s.id}": ${chars} caracteres úteis.`);
  totalChars += chars;
}
console.log(`\nTOTAL DE CARACTERES ÚTEIS AULA 150: ${totalChars}`);
