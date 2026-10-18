// Bloco 6 - Aula 120: Assembler de Medicina Baseada em Evidências
import { saveBook, countUsefulChars } from './bloco-06-utils.mjs';
import { sec1, sec2 } from './build-bloco-06-120-part1.mjs';
import { sec3, sec4 } from './build-bloco-06-120-part2.mjs';
import { sec5, sec6 } from './build-bloco-06-120-part3.mjs';
import { sec7, sec8 } from './build-bloco-06-120-part4.mjs';
import { sec9, sec10 } from './build-bloco-06-120-part5.mjs';
import { sec11 } from './build-bloco-06-120-part6.mjs';
import { sec12, sec13 } from './build-bloco-06-120-part7.mjs';
import { sec14, sec15 } from './build-bloco-06-120-part8.mjs';
import { sec16 } from './build-bloco-06-120-part9.mjs';
import fs from 'fs';
import path from 'path';

const book = {
  slug: 'medicina-baseada-em-evidencias',
  title: 'Medicina Baseada em Evidências',
  subtitle: 'Tratado Avançado de Epidemiologia Clínica, Bioestatística Aplicada e Tomada de Decisão em Saúde',
  area: 'Medicina Preventiva',
  materia: 'Epidemiologia Geral e Bioestatística Clínica',
  description: 'Tratado completo de Medicina Baseada em Evidências para concursos de residência médica e ENAMED: epistemologia e origens da MBE na Universidade McMaster, definição clássica e a tríade indissociável de David Sackett (melhor evidência científica externa, perícia clínica médica e valores/preferências do paciente); formulação da dúvida clínica através do modelo estruturado PICO e suas variações metodológicas (PIRD para acurácia diagnóstica, PECO/PFO para prognóstico e etiologia, PICo qualitativo); a evolução histórica da hierarquia de evidências: desconstrução da pirâmide rígida tradicional e ascensão do modelo contemporâneo de Murad (2016) com fronteiras onduladas e a Revisão Sistemática atuando como lente de aumento integrada; métricas de efeito relativo e benefício absoluto: Taxa de Eventos no Controle (CER), Taxa no Experimental (EER), Risco Relativo (RR), Redução Relativa do Risco (RRR), Redução Absoluta do Risco (RRA/ARR), Número Necessário para Tratar (NNT) e Número Necessário para Causar Dano (NNH) com regras de arredondamento ético; raciocínio diagnóstico bayesiano: probabilidade pré-teste, falácias do resultado binário, Sensibilidade, Especificidade, Razão de Verossimilhança Positiva (LR+) e Negativa (LR-), Teorema de Bayes em odds e o Nomograma de Fagan; sistema GRADE (alta, moderada, baixa, muito baixa; os 5 critérios de rebaixamento e 3 de elevação da certeza) e graduação da força das recomendações (forte vs condicional); a Colaboração Cochrane e o protocolo PRISMA 2020 em 4 fases com ferramentas RoB 2 e ROBINS-I; Tomada de Decisão Compartilhada (Shared Decision Making - SDM), o modelo de três passos de Elwyn e instrumentos de auxílio à decisão (PtDAs com Icon Arrays / Cates Plots); modelo de limiares diagnósticos e terapêuticos de Pauker-Kassirer (limiar de teste, zona de teste e limiar de tratamento); integridade científica e combate a fraudes metodológicas: a crise de reprodutibilidade de Ioannidis, p-hacking e inflação de erro alfa cumulativo, HARKing, relato seletivo de desfechos e registro prévio de protocolo (ClinicalTrials.gov/PROSPERO); análise de sobrevida, dados censurados à direita, curvas de Kaplan-Meier (step-function, mediana de sobrevida), teste de log-rank e regressão de riscos proporcionais de Cox com Hazard Ratio (HR); curvas ROC (Receiver Operating Characteristic), área sob a curva (AUC / C-Statistic) e o Índice de Youden (J) para ponto de corte ótimo; guia prático de leitura crítica de artigos médicos (validade interna, magnitude do efeito e aplicabilidade/validade externa); Avaliação de Tecnologias em Saúde (ATS), farmacoeconomia no SUS pela CONITEC, custo-efetividade, custo-utilidade, anos de vida ajustados pela qualidade (QALY) e razão de custo-efetividade incremental (ICER); Prevenção Quaternária de Jamoulle, proteção contra sobremedicalização, sobrediagnóstico (overdiagnosis), sobretratamento (overtreatment), cascatas iatrogênicas e protocolos de desprescrição sistemática; Diretrizes de Prática Clínica (Guidelines), critérios de validação internacional com AGREE II (6 domínios), manejo rigoroso de conflitos de interesse e a campanha Choosing Wisely; casos clínicos estruturados e bateria de 7 questões comentadas com análise minuciosa de distratores.',
  sections: [
    sec1,
    sec2,
    sec3,
    sec4,
    sec5,
    sec6,
    sec7,
    sec8,
    sec9,
    sec10,
    sec11,
    sec12,
    sec13,
    sec14,
    sec15,
    sec16
  ],
  references: [
    {
      title: 'Sackett, D. L., Rosenberg, W. M., Gray, J. A., Haynes, R. B., & Richardson, W. S. — Evidence based medicine: what it is and what it isn\'t. BMJ, 1996',
      url: 'https://www.bmj.com/content/312/7023/71'
    },
    {
      title: 'Guyatt, G., Rennie, D., Meade, M. O., & Cook, D. J. — Users\' Guides to the Medical Literature: A Manual for Evidence-Based Clinical Practice (3rd Edition). McGraw-Hill, 2015',
      url: 'https://jamaevidence.mhmedical.com'
    },
    {
      title: 'Murad, M. H., Asi, N., Alsawas, M., & Alahdab, F. — New evidence pyramid. BMJ Evidence-Based Medicine, 2016',
      url: 'https://ebm.bmj.com/content/21/4/125'
    },
    {
      title: 'Schünemann, H. J., Brożek, J., Guyatt, G. H., & Oxman, A. D. — GRADE handbook for grading quality of evidence and strength of recommendations using the GRADE approach. The GRADE Working Group, 2013',
      url: 'https://gdt.gradepro.org/app/handbook/handbook.html'
    },
    {
      title: 'Pauker, S. G. & Kassirer, J. P. — The threshold approach to clinical decision making. New England Journal of Medicine, 1980',
      url: 'https://www.nejm.org/doi/full/10.1056/NEJM198011133032003'
    },
    {
      title: 'Elwyn, G., Frosch, D., Thomson, R., et al. — Shared decision making: a model for clinical practice. Journal of General Internal Medicine, 2012',
      url: 'https://link.springer.com/article/10.1007/s11606-012-2077-6'
    },
    {
      title: 'Ioannidis, J. P. A. — Why most published research findings are false. PLoS Medicine, 2005',
      url: 'https://journals.plos.org/plosmedicine/article?id=10.1371/journal.pmed.0020124'
    }
  ]
};

saveBook(book.slug, book);

const content = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'apostilas', book.slug, 'content.json'), 'utf-8'));
let totalChars = 0;
for (const s of content.sections) {
  if (s.body_html) totalChars += countUsefulChars(s.body_html);
}
console.log(`[SUCESSO] Aula 120 (${book.slug}) compilada com ${totalChars} caracteres úteis.`);
