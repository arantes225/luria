// scripts/bloco-07-builders/compile-148.mjs
import { saveBook, countUsefulChars } from '../bloco-07-utils.mjs';
import * as p1 from './build-148-part1.mjs';
import * as p2 from './build-148-part2.mjs';
import * as p3 from './build-148-part3.mjs';
import * as p4 from './build-148-part4.mjs';
import * as p5 from './build-148-part5.mjs';

const book = {
  slug: 'febre-reumatica',
  title: 'Febre Reumática',
  subtitle: 'Tratado Completo de Reumatologia e Cardiologia Pediátrica: Fisiopatologia Imunológica, Critérios de Jones AHA 2015, Cardite Subclínica, Coreia de Sydenham, Cardiopatia Reumática Crônica, Gestação e Profilaxias',
  area: 'Pediatria',
  sections: [
    p1.sec1,
    p1.sec2,
    p2.sec3,
    p2.sec4,
    p3.sec5,
    p3.sec6,
    p4.sec7,
    p4.sec8,
    p5.sec9,
    p5.sec10
  ]
};

saveBook(book.slug, book);

let total = 0;
for (const s of book.sections) {
  total += countUsefulChars(s.body_html);
}
console.log(`Compilado ${book.slug}: ${total} caracteres úteis.`);
