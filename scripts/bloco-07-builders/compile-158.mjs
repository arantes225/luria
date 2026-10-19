// scripts/bloco-07-builders/compile-158.mjs
import { saveBook, countUsefulChars } from '../bloco-07-utils.mjs';
import * as p1 from './build-158-part1.mjs';
import * as p2 from './build-158-part2.mjs';
import * as p3 from './build-158-part3.mjs';
import * as p4 from './build-158-part4.mjs';
import * as p5 from './build-158-part5.mjs';

const book = {
  slug: 'doencas-exantematicas',
  title: 'Doenças Exantemáticas na Infância',
  subtitle: 'Tratado Completo de Infectologia e Dermatologia Pediátrica: Diagnóstico Diferencial Semiológico, Sarampo (Koplik e Vitamina A), Rubéola (Linfonodos e SRC), Eritema Infeccioso (Parvovírus B19 e Crise Aplásica), Exantema Súbito (HHV-6), Escarlatina (Filatov, Pastia e Penicilina), Varicela (Polimorfismo e Bloqueio Pós-Exposição), Mão-Pé-Boca, Doença de Kawasaki, Mononucleose por EBV, Farmacodermias Graves (SSJ, NET, DRESS), Tabela Mestre LURIA e Calendário Vacinal do PNI',
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
