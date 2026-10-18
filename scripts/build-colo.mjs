// scripts/build-colo.mjs
import fs from 'fs';
import path from 'path';
import { saveBook, countUsefulChars } from './bloco-07-utils.mjs';
import { secColo1 } from './builders/colo-data-part1.mjs';
import { secColo2 } from './builders/colo-data-part2.mjs';
import { secColo3 } from './builders/colo-data-part3.mjs';
import { secColo4 } from './builders/colo-data-part4.mjs';
import { secColo5 } from './builders/colo-data-part5.mjs';
import { secColo6 } from './builders/colo-data-part6.mjs';
import { secColo7 } from './builders/colo-data-part7.mjs';

const slug = 'rastreamento-e-lesoes-precursoras-do-cancer-do-colo-uterino';

const sections = [
  ...secColo1,
  ...secColo2,
  ...secColo3,
  ...secColo4,
  ...secColo5,
  ...secColo6,
  ...secColo7
];

const bookData = {
  slug,
  title: 'Rastreamento e Lesões Precursoras do Câncer do Colo Uterino',
  subtitle: 'Diretrizes Brasileiras MS / INCA 2026 · Oncogênese Viral do HPV (E6/E7) · Condutas no ASC-US, LSIL, ASC-H, HSIL e AGC · Colposcopia, CAF e Conização a Frio',
  area: 'Ginecologia e Obstetrícia',
  materia: 'Patologia do Trato Genital Inferior e Colposcopia',
  sections: sections,
  references: [
    { title: 'Ministério da Saúde / Instituto Nacional de Câncer (INCA) — Diretrizes Brasileiras para o Rastreamento do Câncer do Colo do Útero', url: 'https://www.inca.gov.br' },
    { title: 'Federação Brasileira das Associações de Ginecologia e Obstetrícia (FEBRASGO) — Manual de Trato Genital Inferior e Colposcopia', url: 'https://www.febrasgo.org.br' },
    { title: 'World Health Organization (WHO) — Comprehensive Cervical Cancer Control: A Guide to Essential Practice', url: 'https://www.who.int' },
    { title: 'International Federation of Cervical Pathology and Colposcopy (IFCPC) — 2011 Colposcopic Terminology', url: 'https://ifcpc.org' },
    { title: 'The 2014 Bethesda System for Reporting Cervical Cytology — Definitions, Criteria, and Explanatory Notes (Springer)', url: 'https://link.springer.com' }
  ]
};

saveBook(slug, bookData);

// Also sync cancer-colo-utero-hpv if it exists
const oldDir = path.join(process.cwd(), 'apostilas', 'cancer-colo-utero-hpv');
if (fs.existsSync(oldDir)) {
  saveBook('cancer-colo-utero-hpv', { ...bookData, slug: 'cancer-colo-utero-hpv' });
}

const indexPath = path.join(process.cwd(), 'apostilas', slug, 'index.html');
const rawHtml = fs.readFileSync(indexPath, 'utf8');
const chars = countUsefulChars(rawHtml);
console.log(`[SUCESSO] ${slug} compilado via saveBook: ${chars} caracteres úteis.`);
