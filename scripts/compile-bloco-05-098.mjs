import { saveBook, countUsefulChars } from './bloco-05-utils.mjs';
import * as p1 from './build-bloco-05-098-part1.mjs';
import * as p2 from './build-bloco-05-098-part2.mjs';
import * as p3 from './build-bloco-05-098-part3.mjs';
import * as p4 from './build-bloco-05-098-part4.mjs';

const book = {
  slug: 'crupe-e-epiglotite',
  title: 'Crupe e Epiglotite',
  area: 'Pediatria',
  materia: 'Emergências Pediátricas e Pneumopediatria',
  description: 'Tratado exaustivo sobre emergências de via aérea superior na infância. Aborda a anatomia da via aérea pediátrica (Lei de Poiseuille e anel cricoide), fisiopatologia do estridor inspiratório vs bifásico, Crupe Viral por Parainfluenza, Epiglotite Aguda bacteriana (Hib e Streptococcus) com tríade dos 3 Ds e posição de tripé, Traqueíte Bacteriana com pseudomembranas obstrutivas, aspiração de corpo estranho, escores de Westley e Taussig, corticoterapia com dexametasona, adrenalina nebulizada, intubação em centro cirúrgico, ventilação mecânica protetora e cricotireoidostomia por punção.',
  sections: [
    p1.sec1,
    p1.sec2,
    p1.sec3,
    p1.sec4,
    p1.sec5,
    p2.sec6,
    p2.sec7,
    p2.sec8,
    p2.sec9,
    p2.sec10,
    p3.sec11,
    p3.sec12,
    p3.sec13,
    p3.sec14,
    p3.sec15,
    p4.sec16,
    p4.sec17,
    p4.sec18,
    p4.sec19
  ],
  references: [
    { label: 'Sociedade Brasileira de Pediatria (SBP). Tratado de Pediatria. 5ª ed. Manole; 2022.', url: 'https://www.sbp.com.br' },
    { label: 'American Academy of Pediatrics (AAP). Pediatric Advanced Life Support (PALS) Provider Manual. AHA/AAP; 2020.', url: 'https://www.aap.org' },
    { label: 'Russell KF, et al. Glucocorticoids for croup. Cochrane Database Syst Rev. 2011;(1):CD001955.', url: 'https://www.cochranelibrary.com' },
    { label: 'Bjornson CL, Johnson DW. Croup in children. CMAJ. 2013;185(15):1317-1323.', url: 'https://www.cmaj.ca' },
    { label: 'Tibor LM, et al. Pediatric infectious epiglottitis: A review. Int J Pediatr Otorhinolaryngol. 2010;74(12):1352-1356.', url: 'https://pubmed.ncbi.nlm.nih.gov' }
  ]
};

saveBook(book);
const res = countUsefulChars(book.slug);
console.log(`Aula 098 compilada com sucesso! Caracteres úteis: ${res.count} (Formato: ${res.format})`);
