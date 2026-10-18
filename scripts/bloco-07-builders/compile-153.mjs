// scripts/bloco-07-builders/compile-153.mjs
import { saveBook, countUsefulChars } from '../bloco-07-utils.mjs';
import * as p1 from './build-153-part1.mjs';
import * as p2 from './build-153-part2.mjs';
import * as p3 from './build-153-part3.mjs';
import * as p4 from './build-153-part4.mjs';
import * as p5 from './build-153-part5.mjs';
import * as p6 from './build-153-part6.mjs';

const book = {
  slug: 'diabetes-mellitus-tipo-1-e-cetoacidose',
  title: 'Diabetes Mellitus Tipo 1 e Cetoacidose Diabética',
  subtitle: 'Tratado Completo de Endocrinologia e Terapia Intensiva Pediátrica: Autoimunidade, Autoanticorpos (Anti-GAD, IA2, ZnT8, IAA), Fisiopatologia da CAD, Protocolo Rígido de Hidratação 24-48h, Insulina Contínua sem Bolus, Reposição de Potássio, Manejo Hiperosmolar do Edema Cerebral, Esquema Basal-Bolus, CGM, Lua de Mel e Complicações Crônicas',
  area: 'Pediatria',
  sections: [
    p1.sec1,
    p1.sec2,
    p2.sec3,
    p2.sec4,
    p3.sec5,
    p3.sec6,
    p4.sec7,
    p5.sec8,
    p6.sec9
  ]
};

saveBook(book.slug, book);

let total = 0;
for (const s of book.sections) {
  total += countUsefulChars(s.body_html);
}
console.log(`Compilado ${book.slug}: ${total} caracteres úteis.`);
