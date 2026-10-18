// Bloco 5 - Aula 110: Assembler de Ensaios Clínicos e Revisões Sistemáticas
import { saveBook } from './bloco-05-utils.mjs';
import { sec1, sec2 } from './build-bloco-05-110-part1.mjs';
import { sec3, sec4 } from './build-bloco-05-110-part2.mjs';
import { sec5, sec6 } from './build-bloco-05-110-part3.mjs';
import { sec7 } from './build-bloco-05-110-part4.mjs';
import { sec8 } from './build-bloco-05-110-part5.mjs';
import { sec9 } from './build-bloco-05-110-part6.mjs';
import { sec10 } from './build-bloco-05-110-part7.mjs';

const book = {
  slug: 'ensaios-clinicos-e-revisoes-sistematicas',
  title: 'Ensaios Clínicos e Revisões Sistemáticas',
  area: 'Medicina Preventiva',
  materia: 'Medicina Baseada em Evidências e Bioestatística Clínica',
  description: 'Tratado completo de Ensaios Clínicos e Revisões Sistemáticas com Metanálise para concursos de residência médica e ENAMED: o pipeline de desenvolvimento farmacológico e as quatro fases dos ensaios clínicos (Fases I a IV); cálculo a priori do tamanho amostral, erro alfa, erro beta e poder do teste; técnicas avançadas de randomização (simples, em blocos permutados, estratificada e por conglomerados); níveis de cegamento (aberto, simples, duplo, triplo e quádruplo) e a técnica do duplo-simulado (double-dummy); estratégias analíticas soberanas: Análise por Intenção de Tratar (ITT) versus Análise Por Protocolo (Per-Protocol) e o dilema dos ensaios de não inferioridade; métricas de efeito e benefício absoluto: Risco Relativo, Redução Relativa do Risco (RRR), Redução Absoluta do Risco (RRA), Número Necessário para Tratar (NNT) e Número Necessário para Causar Dano (NNH); Revisões Sistemáticas: fluxograma PRISMA em 4 etapas, estratégia PICO e busca em literatura cinzenta; síntese quantitativa metanalítica: interpretação anatômica do Forest Plot (linha do nulo, peso dos estudos, diamante e intervalos de confiança); quantificação da heterogeneidade clínica e estatística (teste Q de Cochran e métrica I² de Higgins); modelos metanalíticos de Efeitos Fixos (Mantel-Haenszel) versus Efeitos Aleatórios (DerSimonian-Laird); rastreamento do Viés de Publicação através do Funnel Plot (gráfico de funil) e testes de regressão de Egger e Begg; avaliação crítica do risco de viés com a ferramenta Cochrane RoB 2 em 5 domínios; graduação da certeza da evidência científica pelo sistema GRADE (alta, moderada, baixa, muito baixa; critérios de rebaixamento e elevação da certeza); metanálise em rede (Network Meta-Analysis - NMA), comparações indiretas, métrica SUCRA e o perigo dos desfechos substitutos (surrogates); delineamentos especiais de ECR: crossover e período de washout (carryover effect), ensaios fatoriais 2x2, ensaios por conglomerados (cluster trials, correlação intraclasse e design effect) e ensaios em plataforma adaptativa (trials RECOVERY/SOLIDARITY); casos clínicos estruturados e bateria de 7 questões comentadas com análise aprofundada de distratores.',
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
    sec10
  ],
  references: [
    {
      title: 'Higgins, J. P. T., Thomas, J., Chandler, J., et al. — Cochrane Handbook for Systematic Reviews of Interventions (Version 6.4). The Cochrane Collaboration, 2023',
      url: 'https://training.cochrane.org/handbook'
    },
    {
      title: 'Guyatt, Gordon, Rennie, Drummond, Meade, Maureen O. & Cook, Deborah J. — Users\' Guides to the Medical Literature: A Manual for Evidence-Based Clinical Practice (3rd Edition). McGraw-Hill, 2015',
      url: 'https://jamaevidence.mhmedical.com'
    },
    {
      title: 'Page, M. J., McKenzie, J. E., Bossuyt, P. M., et al. — The PRISMA 2020 statement: an updated guideline for reporting systematic reviews. BMJ, 2021',
      url: 'https://www.bmj.com/content/372/bmj.n71'
    },
    {
      title: 'Sterne, J. A. C., Savović, J., Page, M. J., et al. — RoB 2: a revised tool for assessing risk of bias in randomised trials. BMJ, 2019',
      url: 'https://www.bmj.com/content/366/bmj.l4898'
    },
    {
      title: 'Schünemann, H. J., Brożek, J., Guyatt, G. H., & Oxman, A. D. — GRADE handbook for grading quality of evidence and strength of recommendations using the GRADE approach. The GRADE Working Group, 2013',
      url: 'https://gdt.gradepro.org/app/handbook/handbook.html'
    },
    {
      title: 'Ministério da Saúde do Brasil — Diretrizes Metodológicas: Sistema GRADE - Manual de Graduação da Qualidade da Evidência e Força de Recomendação para Tomada de Decisão em Saúde. Brasília, 2014',
      url: 'https://www.gov.br/saude'
    }
  ]
};

const count = saveBook(book);
console.log(`[SUCESSO] Aula 110 compilada com ${count} caracteres úteis.`);
