import { saveBook, countUsefulChars } from './bloco-06-utils.mjs';
import * as p1 from './build-bloco-06-116-part1.mjs';
import * as p2 from './build-bloco-06-116-part2.mjs';
import * as p3 from './build-bloco-06-116-part3.mjs';
import * as p4 from './build-bloco-06-116-part4.mjs';

const book = {
  slug: 'sindromes-glomerulares',
  title: 'Síndromes Glomerulares',
  subtitle: 'Tratado Avançado de Glomerulopatias e Doenças Renais Glomerulares para Concursos e Residência Médica',
  area: 'Clínica Médica',
  materia: 'Nefrologia Clínica',
  description: 'Tratado exaustivo sobre doenças glomerulares no adulto. Ultraestrutura da barreira de filtração glomerular (endotélio fenestrado, membrana basal com colágeno IV e podócitos com fendas de filtração), síndrome nefrítica vs síndrome nefrótica, hematúria dismórfica e cilindros hemáticos, GNPE vs Nefropatia por IgA (Berger), podocitopatias (Doença por Lesões Mínimas e GESF), Glomerulopatia Membranosa com Anti-PLA2R e trombose de veia renal, Glomerulonefrite Membranoproliferativa (imunocomplexos vs complemento C3NeF), GNRP com crescentes celulares (Tipos I, II e III), Doença de Goodpasture, vasculites ANCA (GPA e PAM), Nefrite Lúpica (Classes I a VI ISN/RPS com imunofluorescência Full-House), microangiopatias trombóticas (SHU e PTT com esquizócitos), nefropatia diabética, amiloidose renal (Vermelho Congo e verde-maçã), indicações e complicações de biópsia renal, casos clínicos e questões comentadas.',
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
    { label: 'Kidney Disease: Improving Global Outcomes (KDIGO) Glomerular Diseases Work Group. KDIGO 2021 Clinical Practice Guideline for the Management of Glomerular Diseases. Kidney Int. 2021;100(4S):S1-S276.', url: 'https://kdigo.org' },
    { label: 'Feehally J, Floege J, Tonelli M, Johnson RJ. Comprehensive Clinical Nephrology. 6th ed. Elsevier; 2019.', url: 'https://www.elsevier.com' },
    { label: 'Jennette JC, et al. Heptinstall\'s Pathology of the Kidney. 7th ed. Wolters Kluwer; 2014.', url: 'https://shop.lww.com' },
    { label: 'Beck LH Jr, et al. M-type phospholipase A2 receptor as target antigen in idiopathic membranous nephropathy. N Engl J Med. 2009;361(1):11-21.', url: 'https://www.nejm.org' },
    { label: 'Bajema IM, et al. The 2018 Revision of the International Society of Nephrology/Renal Pathology Society classification for lupus nephritis. Kidney Int. 2018;93(4):789-796.', url: 'https://www.kidney-international.org' }
  ]
};

saveBook(book.slug, book);

// Verify useful chars with bloco-06-utils
import fs from 'fs';
import path from 'path';
const content = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'apostilas', book.slug, 'content.json'), 'utf-8'));
let totalChars = 0;
for (const s of content.sections) {
  if (s.body_html) totalChars += countUsefulChars(s.body_html);
}
console.log(`Aula 116 compilada com sucesso! Caracteres úteis: ${totalChars} (Seções: ${content.sections.length})`);
