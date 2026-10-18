import { saveBook, countUsefulChars } from './bloco-05-utils.mjs';
import * as p1 from './build-bloco-05-095-part1.mjs';
import * as p2 from './build-bloco-05-095-part2.mjs';
import * as p3 from './build-bloco-05-095-part3.mjs';
import * as p4 from './build-bloco-05-095-part4.mjs';
import * as p5 from './build-bloco-05-095-part5.mjs';

const book = {
  slug: 'sensibilidade-especificidade-e-valores-preditivos',
  title: 'Sensibilidade, Especificidade e Valores Preditivos',
  area: 'Medicina Preventiva',
  materia: 'Epidemiologia Clínica e Bioestatística',
  description: 'Tratado completo de testes diagnósticos, tabela 2x2, propriedades intrínsecas (sensibilidade e especificidade), valores preditivos (VPP e VPN), teorema de Bayes, testes em paralelo e em série, razões de verossimilhança, nomograma de Fagan, modelo de Pauker-Kassirer, diretrizes STARD, manejo da zona cinzenta, critérios de Wilson & Jungner e paradoxo de Simpson.',
  sections: [
    p1.sec1,
    p1.sec2,
    p1.sec3,
    p1.sec4,
    p2.sec5,
    p2.sec6,
    p2.sec7,
    p2.sec8,
    p3.sec9,
    p3.sec10,
    p3.sec11,
    p3.sec12,
    p3.sec13,
    p4.sec14,
    p4.sec15,
    p4.sec16,
    p4.sec17,
    p5.sec18,
    p5.sec19
  ],
  references: [
    { label: 'Fletcher RH, Fletcher SW, Fletcher GS. Epidemiologia Clínica: Elementos Essenciais. 5ª ed. Artmed; 2014.', url: 'https://www.scielo.br' },
    { label: 'Sackett DL, Haynes RB, Guyatt GH, Tugwell P. Clinical Epidemiology: A Basic Science for Clinical Medicine. Little, Brown and Company; 1991.', url: 'https://pubmed.ncbi.nlm.nih.gov' },
    { label: 'Bossuyt PM, et al. STARD 2015: An Updated List of Essential Items for Reporting Diagnostic Accuracy Studies. BMJ. 2015;351:h5527.', url: 'https://www.bmj.com' },
    { label: 'Pauker SG, Kassirer JP. The threshold approach to clinical decision making. N Engl J Med. 1980;302(20):1109-1117.', url: 'https://www.nejm.org' },
    { label: 'Fagan TJ. Nomogram for Bayes theorem. N Engl J Med. 1975;293(5):257.', url: 'https://www.nejm.org' }
  ]
};

saveBook(book);
const res = countUsefulChars(book.slug);
console.log(`Aula 095 compilada com sucesso! Caracteres úteis: ${res.count} (Formato: ${res.format})`);
