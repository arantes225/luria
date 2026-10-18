import { saveBook, countUsefulChars } from './bloco-05-utils.mjs';
import * as p1 from './build-bloco-05-100-part1.mjs';
import * as p2 from './build-bloco-05-100-part2.mjs';
import * as p3 from './build-bloco-05-100-part3.mjs';
import * as p4 from './build-bloco-05-100-part4.mjs';
import * as p5 from './build-bloco-05-100-part5.mjs';

const book = {
  slug: 'testes-diagnosticos-e-curvas-roc',
  title: 'Testes Diagnósticos e Curvas ROC',
  area: 'Medicina Preventiva',
  materia: 'Epidemiologia Clínica e Bioestatística',
  description: 'Tratado avançado de curvas ROC (Receiver Operating Characteristic), AUC/Estatística C, Sensibilidade vs 1-Especificidade, seleção do ponto de corte ótimo, índice J de Youden, teste de DeLong, Net Reclassification Improvement (NRI), calibração vs discriminação, Decision Curve Analysis (DCA), razões de verossimilhança multiníveis e contínuas, curvas Precision-Recall, curvas ROC tempo-dependentes, protocolo TRIPOD e farmacoeconomia diagnóstica.',
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
    p4.sec19,
    p4.sec20,
    p5.sec21,
    p5.sec22
  ],
  references: [
    { label: 'Hanley JA, McNeil BJ. The meaning and use of the area under a receiver operating characteristic (ROC) curve. Radiology. 1982;143(1):29-36.', url: 'https://pubs.rsna.org' },
    { label: 'DeLong ER, DeLong DM, Clarke-Pearson DL. Comparing the areas under two or more correlated receiver operating characteristic curves: a nonparametric approach. Biometrics. 1988;44(3):837-845.', url: 'https://pubmed.ncbi.nlm.nih.gov' },
    { label: 'Youden WJ. Index for rating diagnostic tests. Cancer. 1950;3(1):32-35.', url: 'https://acsjournals.onlinelibrary.wiley.com' },
    { label: 'Pencina MJ, D\'Agostino RB Sr, D\'Agostino RB Jr, Vasan RS. Evaluating the added predictive ability of a new marker: from area under the ROC curve to reclassification and beyond. Stat Med. 2008;27(2):157-172.', url: 'https://onlinelibrary.wiley.com' },
    { label: 'Vickers AJ, Elkin EB. Decision curve analysis: a novel method for evaluating prediction models. Med Decis Making. 2006;26(6):565-574.', url: 'https://journals.sagepub.com' }
  ]
};

saveBook(book);
const res = countUsefulChars(book.slug);
console.log(`Aula 100 compilada com sucesso! Caracteres úteis: ${res.count} (Formato: ${res.format})`);
