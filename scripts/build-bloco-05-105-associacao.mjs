// Bloco 5 - Aula 105: Assembler de Desenhos de Estudos Epidemiológicos
import { saveBook } from './bloco-05-utils.mjs';
import { sec1, sec2 } from './build-bloco-05-105-part1.mjs';
import { sec3, sec4 } from './build-bloco-05-105-part2.mjs';
import { sec5, sec6 } from './build-bloco-05-105-part3.mjs';
import { sec7 } from './build-bloco-05-105-part4.mjs';
import { sec8 } from './build-bloco-05-105-part5.mjs';
import { sec9 } from './build-bloco-05-105-part6.mjs';
import { sec10 } from './build-bloco-05-105-part7.mjs';
import { sec11 } from './build-bloco-05-105-part8.mjs';

const book = {
  slug: 'desenhos-de-estudos-epidemiologicos',
  title: 'Desenhos de Estudos Epidemiológicos',
  area: 'Medicina Preventiva',
  materia: 'Epidemiologia Geral e Desenhos Metodológicos',
  description: 'Tratado completo de Desenhos de Estudos Epidemiológicos para residência médica e ENAMED: epistemologia e taxonomia dos estudos observacionais e intervencionistas; estudos ecológicos de agregados populacionais e a Falácia Ecológica de Robinson; estudos transversais seccionais, prevalência pontual, Razão de Prevalências e viés de Neyman (sobrevivência seletiva); estudos de caso-controle retrospectivos, seleção da base de controles, Odds Ratio pelo produto cruzado e suposição de doença rara; estudos de coorte prospectiva e retrospectiva (histórica), incidência acumulada, densidade de incidência, Risco Relativo, Risco Atribuível nos expostos (RA) e Fração Atribuível Populacional (FAP); ensaios clínicos randomizados, sigilo de alocação, cegamento e a evolução da pirâmide de evidências científicas (modelo de Guyatt a Murad); desenhos híbridos contemporâneos (caso-controle aninhado, caso-coorte e caso-cruzado); matriz comparativa universal e algoritmo decisório rápido para provas; validade interna versus externa, ensaios explicativos versus pragmáticos, erro aleatório e erro sistemático; farmacoepidemiologia, vigilância pós-comercialização, diretrizes da rede EQUATOR (STROBE, CONSORT, PRISMA); bioética na pesquisa clínica, Resoluções CNS 466/12 e 510/16, sistema CEP/CONEP, Plataforma Brasil, TCLE versus Termo de Assentimento e regras éticas de uso de placebo; casos clínicos estruturados e bateria de questões comentadas com análise minuciosa de distratores.',
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
    sec11
  ],
  references: [
    {
      title: 'Fletcher, Robert H. & Fletcher, Suzanne W. — Epidemiologia Clínica: Elementos Essenciais (5ª Edição). Artmed, 2014',
      url: 'https://www.artmed.com.br'
    },
    {
      title: 'Rothman, Kenneth J., Greenland, Sander & Lash, Timothy L. — Epidemiologia Moderna (3ª Edição). Artmed, 2011',
      url: 'https://www.artmed.com.br'
    },
    {
      title: 'Gordis, Leon — Epidemiologia (6ª Edição). Elsevier Brasil, 2020',
      url: 'https://www.elsevier.com.br'
    },
    {
      title: 'Murad, M. H., Asi, N., Alsawas, M., & Alahdab, F. — New evidence pyramid. BMJ Evidence-Based Medicine, 2016',
      url: 'https://ebm.bmj.com/content/21/4/125'
    },
    {
      title: 'Ministério da Saúde do Brasil — Diretrizes Metodológicas: Elaboração de Revisões Sistemáticas e Metanálises. Brasília, 2023',
      url: 'https://www.gov.br/saude'
    }
  ]
};

const count = saveBook(book);
console.log(`[SUCESSO] Aula 105 compilada com ${count} caracteres úteis.`);
