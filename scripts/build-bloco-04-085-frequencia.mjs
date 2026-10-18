import { saveBook } from './bloco-04-utils.mjs';
import { sec1, sec2, sec3, sec4 } from './build-bloco-04-085-part1.mjs';
import { sec5, sec6, sec7, sec8 } from './build-bloco-04-085-part2.mjs';
import { sec9, sec10, sec11 } from './build-bloco-04-085-part3.mjs';
import { sec12, sec13 } from './build-bloco-04-085-part4.mjs';

const book = {
  slug: 'medidas-de-frequencia-incidencia-e-prevalencia',
  title: 'Medidas de Frequência: Incidência e Prevalência',
  area: 'Medicina Preventiva',
  materia: 'Epidemiologia Geral e Bioestatística em Saúde',
  description: 'Tratado completo de Medidas de Frequência em Saúde para concursos de Residência Médica e ENAMED: fundamentos matemáticos de quantificação coletiva (razões, proporções, taxas/coeficientes e índices); prevalência pontual vs prevalência periodal e dinâmica de determinantes (fatores que elevam e reduzem a prevalência); incidência acumulada (risco individual) e densidade de incidência (tempo-pessoa em coortes dinâmicas); a relação fundamental no estado estacionário P ≈ I × D e suas implicações clínicas na introdução de terapias curativas vs de sobrevida prolongada; coeficientes de mortalidade geral e específica, padronização de taxas por método direto e indireto (RMP/SMR); taxa de letalidade como medida de gravidade intrínseca; razão de mortalidade materna (RMM: causas obstétricas diretas vs indiretas); coeficiente de mortalidade infantil (CMI) e seus três componentes cronológicos (neonatal precoce de 0 a 6 dias, neonatal tardio de 7 a 27 dias e pós-neonatal de 28 a 364 dias) e a transição epidemiológica no Brasil; natimortalidade e mortalidade perinatal; transição demográfica em quatro fases e a tripla carga de doenças brasileira; tábuas de vida e expectativa de vida ao nascer; análise de sobrevida de Kaplan-Meier com censuras e teste de Log-Rank; curvas de mortalidade proporcional por idade de Nelson de Moraes (Tipos I, II, III e IV); indicadores sintéticos de carga global de doença (APVP e DALY: YLL + YLD); 4 casos clínicos estruturados e bateria avançada de 10 questões de concursos com análise exaustiva de distratores.',
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
    sec13
  ],
  references: [
    {
      title: 'Ministério da Saúde — Rede Interagencial de Informação para a Saúde (RIPSA): Indicadores Básicos para a Saúde no Brasil (IDB)',
      url: 'https://www.gov.br/saude/pt-br/assuntos/saude-de-a-a-z/i/indicadores-de-saude'
    },
    {
      title: 'Gordis, Leon — Epidemiologia (6ª Edição). Capítulo 3: Medição da Ocorrência das Doenças: I. Morbidade e Capítulo 4: II. Mortalidade',
      url: 'https://www.elsevier.com.br'
    },
    {
      title: 'Rothman, Kenneth J. — Epidemiologia Moderna (3ª Edição). Medidas de Frequência e Associação',
      url: 'https://www.artmed.com.br'
    },
    {
      title: 'Rouquayrol, M. Z. & Gurgel, M. — Epidemiologia & Saúde (8ª Edição). Indicadores de Saúde e Transição Demográfica',
      url: 'https://www.medbookeditora.com.br'
    },
    {
      title: 'World Health Organization (WHO) — The Global Health Observatory: Maternal and Child Mortality Indicators',
      url: 'https://www.who.int/data/gho'
    }
  ]
};

const charCount = saveBook(book);
console.log(`[AULA 085 CONCLUÍDA COM SUCESSO] Total de caracteres didáticos úteis: ${charCount}`);
