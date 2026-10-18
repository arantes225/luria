// Bloco 5 - Aula 115: Assembler de Vieses, Confundimento e Causalidade
import { saveBook } from './bloco-05-utils.mjs';
import { sec1, sec2 } from './build-bloco-05-115-part1.mjs';
import { sec3, sec4 } from './build-bloco-05-115-part2.mjs';
import { sec5, sec6 } from './build-bloco-05-115-part3.mjs';
import { sec7 } from './build-bloco-05-115-part4.mjs';
import { sec8 } from './build-bloco-05-115-part5.mjs';
import { sec9, sec10 } from './build-bloco-05-115-part6.mjs';
import { sec11 } from './build-bloco-05-115-part7.mjs';
import { sec12 } from './build-bloco-05-115-part8.mjs';

const book = {
  slug: 'vieses-confundimento-e-causalidade',
  title: 'Vieses, Confundimento e Causalidade',
  area: 'Medicina Preventiva',
  materia: 'Epidemiologia Geral e Inferência Causal Avançada',
  description: 'Tratado completo de Vieses, Confundimento e Causalidade em Epidemiologia para residência médica e ENAMED: taxonomia dos erros aleatórios e sistemáticos; o espectro completo dos vieses de seleção (viés de admissão hospitalar de Berkson, viés do trabalhador sadio, viés de autoseleção do voluntário, perdas de seguimento/atrição e viés de detecção); vieses de aferição e informação (viés de memória/recordatório, viés do observador/entrevistador, o Efeito Hawthorne e erros de classificação diferencial versus não diferencial); Fator de Confundimento: critérios diagnósticos epidemiológicos clássicos de Rothman, métodos de controle no desenho (randomização, restrição, pareamento/matching) e na análise (estratificação de Mantel-Haenszel e modelagem multivariada); Modificação de Efeito (interação biológica) versus confundimento e o algoritmo diagnóstico da estratificação passo a passo; os nove critérios de causalidade de Sir Austin Bradford Hill detalhados um a um, com destaque para a soberania e primazia inegociável da temporalidade; inferência causal contemporânea: Gráficos Acíclicos Direcionados (DAGs de Judea Pearl), cadeias causais e mediadores, causas comuns (backdoor paths), efeito comum e o perigo do viés de colisor (collider stratification bias); o Paradoxo de Simpson; análise de sensibilidade para confundimento residual, o E-Value de VanderWeele e a triangulação metodológica em epidemiologia etiológica; guia prático de identificação de vieses em provas e o modelo contrafatual de Rubin com variáveis instrumentais (two-stage least squares); vieses cognitivos na decisão médica (teoria dual de Kahneman: disponibilidade, ancoragem, confirmação e encerramento prematuro) e vieses algorítmicos em inteligência artificial na saúde; crônicas metodológicas: falhas epidemiológicas históricas (o desastre da TRH desmascarado pelo ensaio WHI e o paradoxo dos betacarotenos no CARET); casos clínicos estruturados e bateria de questões comentadas com análise minuciosa de distratores.',
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
    sec12
  ],
  references: [
    {
      title: 'Rothman, Kenneth J., Greenland, Sander & Lash, Timothy L. — Modern Epidemiology (3rd Edition). Lippincott Williams & Wilkins, 2008',
      url: 'https://shop.lww.com'
    },
    {
      title: 'Hernán, Miguel A. & Robins, James M. — Causal Inference: What If. Chapman & Hall/CRC, 2024',
      url: 'https://www.hsph.harvard.edu/miguel-hernan/causal-inference-book/'
    },
    {
      title: 'Bradford Hill, Austin — The Environment and Disease: Association or Causation? Proceedings of the Royal Society of Medicine, 1965',
      url: 'https://www.ncbi.nlm.nih.gov/pmc/articles/PMC1898525/'
    },
    {
      title: 'Pearl, Judea — Causality: Models, Reasoning, and Inference (2nd Edition). Cambridge University Press, 2009',
      url: 'https://www.cambridge.org'
    },
    {
      title: 'VanderWeele, T. J. & Ding, P. — Sensitivity Analysis in Observational Research: Introducing the E-Value. Annals of Internal Medicine, 2017',
      url: 'https://www.acpjournals.org/doi/10.7326/M16-2607'
    },
    {
      title: 'Lawlor, D. A., Tilling, K., & Davey Smith, G. — Triangulation in aetiological epidemiology. International Journal of Epidemiology, 2016',
      url: 'https://academic.oup.com/ije/article/45/6/1866/2617185'
    }
  ]
};

const count = saveBook(book);
console.log(`[SUCESSO] Aula 115 compilada com ${count} caracteres úteis.`);
