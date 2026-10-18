import { saveBook, countUsefulChars } from './bloco-05-utils.mjs';
import * as p1 from './build-bloco-05-103-part1.mjs';
import * as p2 from './build-bloco-05-103-part2.mjs';
import * as p3 from './build-bloco-05-103-part3.mjs';
import * as p4 from './build-bloco-05-103-part4.mjs';

const book = {
  slug: 'tuberculose-na-infancia',
  title: 'Tuberculose na Infância',
  area: 'Pediatria',
  materia: 'Infectologia Pediátrica e Pneumologia',
  description: 'Tratado completo de Tuberculose na Infância e Adolescência conforme as diretrizes do Ministério da Saúde e da OMS. Fisiopatologia da primo-infecção, imunidade celular em lactentes, formas pulmonares (linfadenopatia hilar, pneumonia caseosa, epituberculose e cavernas), formas graves (meningoencefalite tuberculosa com aracnoidite basal e TB miliar), Sistema de Escore de Pontos do Ministério da Saúde para diagnóstico paucibacilar sem escarro, Prova Tuberculínica (PPD) e IGRA, lavado gástrico de 3 manhãs, Teste Rápido Molecular (TRM-TB GeneXpert), algoritmo do recém-nascido exposto à mãe bacilífera, quimioprofilaxia primária, tratamento da ILTB com esquema 3HP, esquema RHZ pediátrico de 6 meses, TB osteoarticular (Mal de Pott) e pleurite tuberculosa com dosagem de ADA.',
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
    { label: 'Ministério da Saúde. Manual de Recomendações para o Controle da Tuberculose no Brasil. 2ª ed. Brasília: Ministério da Saúde; 2019.', url: 'https://www.gov.br/saude' },
    { label: 'Sociedade Brasileira de Pediatria (SBP). Tuberculose na Criança e no Adolescente: Diagnóstico e Tratamento. Departamento Científico de Pneumologia e Infectologia; 2021.', url: 'https://www.sbp.com.br' },
    { label: 'World Health Organization (WHO). Guidance for national tuberculosis programmes on the management of tuberculosis in children. 2nd ed. Geneva: WHO; 2014.', url: 'https://www.who.int' },
    { label: 'Sant\'Anna CC, et al. Scoring system for the diagnosis of pulmonary tuberculosis in children. Pediatr Infect Dis J. 2004;23(4):307-310.', url: 'https://pubmed.ncbi.nlm.nih.gov' },
    { label: 'Marais BJ, et al. The natural history of childhood intra-thoracic tuberculosis: a critical review of literature from the pre-chemotherapy era. Int J Tuberc Lung Dis. 2004;8(4):392-402.', url: 'https://pubmed.ncbi.nlm.nih.gov' }
  ]
};

saveBook(book);
const res = countUsefulChars(book.slug);
console.log(`Aula 103 compilada com sucesso! Caracteres úteis: ${res.count} (Formato: ${res.format})`);
