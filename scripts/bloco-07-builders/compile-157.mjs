import { section1, section2 } from './build-157-part1.mjs';
import { section3, section4 } from './build-157-part2.mjs';
import { section5, section6 } from './build-157-part3.mjs';
import { section7, section8 } from './build-157-part4.mjs';
import { saveBook, countUsefulChars } from '../bloco-07-utils.mjs';

const sections = [
  section1,
  section2,
  section3,
  section4,
  section5,
  section6,
  section7,
  section8
];

const bookData = {
  title: "Doenças Anorretais: Cirurgia e Coloproctologia Essencial",
  slug: "doencas-anorretais",
  description: "Tratado completo de Proctologia e Cirurgia Colorretal abordando anatomia do canal anal, fisiopatologia e manejo da doença hemorroidária, fissura anal, abscessos e fístulas anorretais com regra de Goodsall-Salmon, doença pilonidal sacrococcígea, casos clínicos integradores e banco de questões comentadas.",
  sections: sections
};

console.log("--- Compilando Aula 157: doencas-anorretais ---");
let total = 0;
sections.forEach(s => {
  const c = countUsefulChars(s.body_html);
  total += c;
  console.log(`Seção "${s.id}": ${c} caracteres úteis.`);
});

console.log(`\nTOTAL DE CARACTERES ÚTEIS AULA 157: ${total}`);

saveBook('doencas-anorretais', bookData);
