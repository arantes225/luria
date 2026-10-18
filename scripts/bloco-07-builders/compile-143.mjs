// scripts/bloco-07-builders/compile-143.mjs
import { saveBook, countUsefulChars } from '../bloco-07-utils.mjs';
import * as p1 from './build-143-part1.mjs';
import * as p2 from './build-143-part2.mjs';
import * as p3 from './build-143-part3.mjs';
import * as p4 from './build-143-part4.mjs';

const book = {
  slug: 'cardiopatias-congenitas',
  title: 'Cardiopatias Congênitas',
  subtitle: 'Tratado Completo de Cardiologia Pediátrica: Fisiologia Fetal, Transição Neonatal, Shunts, Lesões Obstrutivas, Cardiopatias Cianóticas, Teste do Coraçãozinho e Prostaglandinas',
  area: 'Pediatria',
  sections: [
    p1.sec1,
    p1.sec2,
    p1.sec3,
    p2.sec4,
    p2.sec5,
    p3.sec6,
    p3.sec7,
    p4.sec8
  ]
};

saveBook(book.slug, book);

let total = 0;
for (const s of book.sections) {
  total += countUsefulChars(s.body_html);
}
console.log(`Compilado ${book.slug}: ${total} caracteres úteis.`);
