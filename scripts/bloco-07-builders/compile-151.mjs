// scripts/bloco-07-builders/compile-151.mjs
import { saveBook, countUsefulChars } from '../bloco-07-utils.mjs';
import * as p1 from './build-151-part1.mjs';
import * as p2 from './build-151-part2.mjs';
import * as p3 from './build-151-part3.mjs';
import * as p4 from './build-151-part4.mjs';
import * as p5 from './build-151-part5.mjs';

const book = {
  slug: 'anemias',
  title: 'Anemias no Adulto',
  subtitle: 'Tratado Completo de Hematologia Clínica: Eritropoiese, Classificação Cinética e Morfológica, Anemia Ferropriva vs Doença Crônica, Hepcidina, Megaloblastose por B12 e Folato, Anemias Hemolíticas Imunes e Microangiopatias Trombóticas (PTT vs SHU), Aplasia Medular e Mielodisplasia',
  area: 'Clínica Médica',
  sections: [
    p1.sec1,
    p1.sec2,
    p2.sec3,
    p2.sec4,
    p3.sec5,
    p4.sec6,
    p5.sec7
  ]
};

saveBook(book.slug, book);

let total = 0;
for (const s of book.sections) {
  total += countUsefulChars(s.body_html);
}
console.log(`Compilado ${book.slug}: ${total} caracteres úteis.`);
