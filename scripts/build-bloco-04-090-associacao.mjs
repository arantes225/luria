import { saveBook } from './bloco-04-utils.mjs';
import { sec1, sec2, sec3, sec4 } from './build-bloco-04-090-part1.mjs';
import { sec5, sec6, sec7, sec8 } from './build-bloco-04-090-part2.mjs';
import { sec9, sec10, sec11 } from './build-bloco-04-090-part3.mjs';
import { sec12, sec13 } from './build-bloco-04-090-part4.mjs';
import { sec14, sec15 } from './build-bloco-04-090-part5.mjs';
import { sec16 } from './build-bloco-04-090-part6.mjs';

const book = {
  slug: 'medidas-de-associacao-e-impacto',
  title: 'Medidas de Associação e Impacto',
  area: 'Medicina Preventiva',
  materia: 'Epidemiologia Geral e Bioestatística em Saúde',
  description: 'Tratado completo de Medidas de Associação e Impacto para concursos de Residência Médica e ENAMED: a tabela de contingência 2x2 e a lógica analítica; medidas de efeito relativo (Risco Relativo em coortes e ensaios clínicos, Odds Ratio em caso-controle e Razão de Prevalências em transversais); suposição de doença rara (rare disease assumption); interpretação rigorosa do Intervalo de Confiança de 95% (IC 95%), valor nulo (1,0) e valor de p; medidas de impacto potencial e benefício absoluto: Risco Atribuível nos expostos (RA / Diferença de Riscos), Fração Atribuível nos expostos (FA), Fração Atribuível Populacional (FAP), Redução Absoluta do Risco (RAR), Número Necessário para Tratar (NNT) e Número Necessário para Causar Dano (NNH); 4 casos clínicos estruturados em cardiologia, oncologia ocupacional e ensaios clínicos; os 9 critérios de causalidade de Sir Austin Bradford Hill e a primazia da temporalidade; ameaças à validade interna (viés de seleção, viés de Berkson, viés de aferição, viés de memória, efeito Hawthorne e fator de confundimento); métodos de controle de confundimento no desenho (randomização, pareamento, restrição) e na análise (estratificação e regressão multivariada); diferença conceitual entre confundimento e modificação de efeito (interação biológica); gráficos acíclicos direcionados (DAGs); robustez causal e E-Value; o Paradoxo de Simpson e viés de colisor; integração entre epidemiologia e testes diagnósticos: sensibilidade, especificidade, valores preditivos (VPP/VPN e Teorema de Bayes), Razões de Verossimilhança (LR+/LR-) e nomograma de Fagan; Curva ROC (AUC e Índice de Youden para definição do ponto de corte ótimo); síntese quantitativa de evidências: metanálise, interpretação visual do Forest Plot (diamante e peso dos estudos), modelos de efeitos fixos vs aleatórios, quantificação da heterogeneidade pelo teste Q e estatística I² de Higgins, e avaliação do viés de publicação através do Funnel Plot e teste de Egger; e bateria avançada de 10 questões comentadas com análise exaustiva de distratores.',
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
      title: 'Rothman, Kenneth J., Greenland, Sander & Lash, Timothy L. — Epidemiologia Moderna (3ª Edição). Medidas de Associação e Impacto',
      url: 'https://www.artmed.com.br'
    },
    {
      title: 'Gordis, Leon — Epidemiologia (6ª Edição). Capítulo 12: Comparação de Grupos: Risco Relativo e Odds Ratio e Capítulo 13: Da Associação à Causalidade',
      url: 'https://www.elsevier.com.br'
    },
    {
      title: 'Bradford Hill, Austin — The Environment and Disease: Association or Causation? Proceedings of the Royal Society of Medicine, 1965',
      url: 'https://www.ncbi.nlm.nih.gov/pmc/articles/PMC1898525/'
    },
    {
      title: 'Higgins, J. P. T. & Green, S. — Cochrane Handbook for Systematic Reviews of Interventions. The Cochrane Collaboration, 2024',
      url: 'https://training.cochrane.org/handbook'
    },
    {
      title: 'Fletcher, Robert H. & Fletcher, Suzanne W. — Epidemiologia Clínica: Elementos Essenciais (5ª Edição). Diagnóstico e Prognóstico',
      url: 'https://www.artmed.com.br'
    },
    {
      title: 'Hernán, Miguel A. & Robins, James M. — Causal Inference: What If. Chapman & Hall/CRC, 2024',
      url: 'https://www.hsph.harvard.edu/miguel-hernan/causal-inference-book/'
    }
  ]
};

const charCount = saveBook(book);
console.log(`[AULA 090 CONCLUÍDA COM SUCESSO] Total de caracteres didáticos úteis: ${charCount}`);
