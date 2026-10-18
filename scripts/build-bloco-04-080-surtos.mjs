import { saveBook } from './bloco-04-utils.mjs';
import { sec1, sec2, sec3, sec4 } from './build-bloco-04-080-part1.mjs';
import { sec5, sec6, sec7, sec8 } from './build-bloco-04-080-part2.mjs';
import { sec9, sec10, sec11 } from './build-bloco-04-080-part3.mjs';

const book = {
  slug: 'investigacao-de-surtos-e-epidemias',
  title: 'Investigação de Surtos e Epidemias',
  area: 'Medicina Preventiva',
  materia: 'Epidemiologia Geral e Vigilância em Saúde',
  description: 'Tratado completo de Investigação de Surtos e Epidemias para concursos de Residência Médica e ENAMED: conceitos fundamentais (endemia, epidemia, surto, pandemia); morfologia de curvas epidêmicas (fonte pontual, contínua, intermitente, propagada e mista); canal endêmico e diagrama de controle com exclusão obrigatória de anos atípicos; os 10 passos padronizados da investigação de campo segundo o CDC e Ministério da Saúde; elaboração rigorosa de definições operacionais de caso (suspeito, provável e confirmado) e estratégias de busca ativa; epidemiologia analítica em surtos com cálculo e interpretação de taxas de ataque globais e específicas por alimento, Risco Relativo (RR), Risco Atribuível (RA) e Odds Ratio (OR); etiologia clínica e diagnósticos diferenciais das doenças transmitidas por alimentos (DTA) baseados no período de incubação (S. aureus, B. cereus, C. perfringens, Salmonella, Campylobacter, Shigella, Norovírus e C. botulinum); 4 casos clínicos estruturados e comentados; bateria avançada de 10 questões de provas com distratores minuciosamente analisados; epidemiologia molecular e rastreamento retrógrado de cadeias (trace-back analysis); diretrizes para elaboração do relatório final de investigação.',
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
      title: 'Ministério da Saúde — Guia de Vigilância em Saúde (5ª Edição Revisada e Atualizada)',
      url: 'https://www.gov.br/saude/pt-br/assuntos/saude-de-a-a-z/g/guia-de-vigilancia-em-saude'
    },
    {
      title: 'Centers for Disease Control and Prevention (CDC) — Principles of Epidemiology in Public Health Practice: Investigating an Outbreak',
      url: 'https://www.cdc.gov/csels/dsepd/ss1978/lesson6/index.html'
    },
    {
      title: 'World Health Organization (WHO) — Outbreak Surveillance and Response in Humanitarian Emergencies: Field Manual',
      url: 'https://www.who.int/publications/i/item/9789241548489'
    },
    {
      title: 'Gordis, Leon — Epidemiologia (6ª Edição). Seção II: Emprego da Epidemiologia na Identificação das Causas das Doenças',
      url: 'https://www.elsevier.com.br'
    },
    {
      title: 'Rouquayrol, M. Z. & Gurgel, M. — Epidemiologia & Saúde (8ª Edição). Vigilância Epidemiológica e Investigação de Epidemias',
      url: 'https://www.medbookeditora.com.br'
    }
  ]
};

const charCount = saveBook(book);
console.log(`[AULA 080 CONCLUÍDA COM SUCESSO] Total de caracteres didáticos úteis: ${charCount}`);
