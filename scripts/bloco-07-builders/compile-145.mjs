// scripts/bloco-07-builders/compile-145.mjs
import { sec1, sec2 } from './build-145-part1.mjs';
import { sec3 } from './build-145-part2.mjs';
import { sec4, sec5 } from './build-145-part3.mjs';
import { sec6, sec7, sec8 } from './build-145-part4.mjs';
import { saveBook, countUsefulChars } from '../bloco-07-utils.mjs';

const sections = [sec1, sec2, sec3, sec4, sec5, sec6, sec7, sec8];

const bookData = {
  slug: 'saude-da-mulher-na-aps',
  title: 'Saúde da Mulher na Atenção Primária à Saúde',
  subtitle: 'PNAISM, Acolhimento Centrado na Pessoa, Rastreamento Oncológico (MS/INCA), Planejamento Reprodutivo e Elegibilidade OMS, Pré-Natal Compartilhado, Enfrentamento da Violência de Gênero, Climatério e Equidade',
  area: 'Medicina Preventiva',
  materia: 'Medicina de Família e Comunidade / Ginecologia e Obstetrícia na APS',
  description: 'Tratado de Saúde da Mulher na Atenção Básica: Diretrizes da PNAISM, Método Clínico Centrado na Pessoa, rastreamento de câncer de colo de útero e mama (MS/INCA), critérios médicos de elegibilidade contraceptiva da OMS e nova Lei de Planejamento Familiar (Lei 14.443/2022), rotina de pré-natal compartilhado, abordagem da violência doméstica e sexual segundo a Lei Maria da Penha com profilaxia de ISTs e notificação compulsória, manejo do climatério e atenção à saúde da mulher negra, indígena e LGBTQIA+.',
  sections
};

console.log('--- Compilando Aula 145: saude-da-mulher-na-aps ---');
saveBook('saude-da-mulher-na-aps', bookData);

let totalChars = 0;
for (const s of sections) {
  const chars = countUsefulChars(s.body_html);
  console.log(`Seção "${s.id}": ${chars} caracteres úteis.`);
  totalChars += chars;
}
console.log(`\nTOTAL DE CARACTERES ÚTEIS AULA 145: ${totalChars}`);
