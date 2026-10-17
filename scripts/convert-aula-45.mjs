import fs from 'node:fs';
import path from 'node:path';
import { saveBook } from './bloco-02-utils.mjs';

const rawMd = fs.readFileSync('apostilas/_rascunhos/lote-03/45-controle-social-sus.md', 'utf8');

// Basic markdown to HTML converter for sections
function mdToHtml(md) {
  let lines = md.split('\n');
  let html = [];
  let inTable = false;
  let inList = false;

  for (let line of lines) {
    line = line.trimEnd();

    // Table
    if (line.trim().startsWith('|')) {
      if (!inTable) {
        inTable = true;
        html.push('<div class="table-responsive"><table class="table-luria">');
        const cells = line.split('|').slice(1, -1).map(c => `<th>${c.trim()}</th>`).join('');
        html.push(`<thead><tr>${cells}</tr></thead><tbody>`);
        continue;
      }
      if (line.includes('---')) continue;
      const cells = line.split('|').slice(1, -1).map(c => `<td>${c.trim()}</td>`).join('');
      html.push(`<tr>${cells}</tr>`);
      continue;
    } else if (inTable) {
      inTable = false;
      html.push('</tbody></table></div>');
    }

    // List
    if (line.trim().startsWith('- ') || line.trim().startsWith('* ')) {
      if (!inList) {
        inList = true;
        html.push('<ul>');
      }
      const item = line.trim().substring(2);
      html.push(`<li>${item}</li>`);
      continue;
    } else if (inList && !line.trim().startsWith('- ') && !line.trim().startsWith('* ')) {
      inList = false;
      html.push('</ul>');
    }

    // Headers
    if (line.startsWith('### ')) {
      html.push(`<h4>${line.substring(4).trim()}</h4>`);
      continue;
    }
    if (line.startsWith('## ')) {
      html.push(`<h3>${line.substring(3).trim()}</h3>`);
      continue;
    }

    // Empty line
    if (!line.trim()) {
      continue;
    }

    // Callouts / blockquotes
    if (line.startsWith('> ')) {
      html.push(`<blockquote class="luria-callout"><p>${line.substring(2).trim()}</p></blockquote>`);
      continue;
    }

    // Paragraph
    html.push(`<p>${line.trim()}</p>`);
  }

  if (inTable) html.push('</tbody></table></div>');
  if (inList) html.push('</ul>');

  let res = html.join('\n');
  res = res.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
  res = res.replace(/\*(.*?)\*/g, '<em>$1</em>');
  res = res.replace(/`([^`]+)`/g, '<code>$1</code>');
  return res;
}

// Split into main sections by `## `
const rawSections = rawMd.split(/\n(?=## \d+\. )/g);

const sections = [];

// Section 1: Intro and Concepts (sections before ## 1. and ## 1.)
const headerChunk = rawSections[0];
const subChunks = headerChunk.split(/\n(?=## )/g);
let introMd = subChunks.filter(c => !c.startsWith('## Etapa zero')).join('\n\n');

sections.push({
  id: 'conceito-e-fundamentos',
  title: '1. Conceito e Fundamentos da Participação Social no SUS',
  body_html: mdToHtml(introMd)
});

for (let i = 1; i < rawSections.length; i++) {
  const chunk = rawSections[i];
  const firstLine = chunk.split('\n')[0].trim();
  const match = firstLine.match(/## (\d+)\.\s*(.*)/);
  if (!match) continue;
  
  const secNum = parseInt(match[1], 10);
  const secTitle = match[2];

  // Map to structured chapters
  const slugId = secTitle.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
  
  sections.push({
    id: `sec-${secNum}-${slugId}`,
    title: `${secNum}. ${secTitle}`,
    body_html: mdToHtml(chunk.replace(firstLine, '').trim())
  });
}

// Now expand with specific additional high-yield content for 2026 guidelines
const additionalCasesAndContent = `
<h4>Caso 7 — Conflito distributivo e deliberação do Conselho Municipal em ano eleitoral</h4>
<p><strong>Cenário:</strong> Em ano eleitoral municipal, o prefeito propõe remanejar 20% das dotações da Atenção Primária para financiar a contratação temporária de médicos em tendas móveis na praça central da cidade. O Secretário de Saúde publica decreto alterando as metas do Plano Municipal de Saúde sem submissão prévia ao Conselho Municipal de Saúde (CMS). O CMS, composto por 50% de usuários, 25% de trabalhadores de saúde e 25% de gestores/prestadores privados conveniados, reúne-se em sessão extraordinária e aprova resolução que anula o remanejamento e exige a manutenção dos recursos na infraestrutura das Unidades Básicas de Saúde da Família.</p>
<p><strong>Análise Crítica:</strong> Conforme o Artigo 1º, § 2º da Lei 8.142/1990 e as diretrizes da Resolução CNS 453/2012, o Conselho de Saúde atua na formulação de estratégias e no controle da execução da política de saúde, inclusive nos aspectos econômicos e financeiros. Decisões que alterem o Plano Municipal de Saúde ou aloquem recursos em desacordo com as prioridades aprovadas exigem deliberação prévia do conselho. O gestor tem o dever de homologar as resoluções do conselho em até 30 dias ou apresentar justificativa circunstanciada, sob pena de acionamento do Ministério Público e dos órgãos de controle externo por improbidade administrativa.</p>

<h4>Caso 8 — Conselho Local de Saúde e recusa de atendimento por barreira geográfica</h4>
<p><strong>Cenário:</strong> Usuários de uma comunidade periférica relatam em plenária do Conselho Local de Saúde da UBS que a recepção da unidade está recusando o acolhimento de pacientes que residem do outro lado de uma rodovia estadual, sob a justificativa de que pertencem formalmente a outro município, embora a UBS vizinha mais próxima fique a 12 km de distância. O Conselho Local elabora ata registrando a violação do princípio da universalidade e da continuidade do cuidado e encaminha a denúncia ao Conselho Municipal de Saúde e à Ouvidoria do SUS.</p>
<p><strong>Conduta e Fundamento:</strong> A Atenção Primária tem como diretriz a universalidade do acesso e o acolhimento com escuta qualificada. Embora a adscrição de clientela organize o trabalho territorial da eSF, nenhuma pessoa em sofrimento ou necessidade aguda pode ter atendimento negado por barreiras político-administrativas. O Conselho Municipal de Saúde articulou com a Comissão Intergestores Regional (CIR) a criação de um fluxo de pactuação intermunicipal para garantir a compensação dos custos e a assistência integral da população daquela faixa limítrofe.</p>

<h3>Questão 11 — Lei Complementar 141/2012 e Fiscalização Financeira</h3>
<p><strong>Enunciado:</strong> Um Conselheiro de Saúde representante dos usuários, ao analisar o Relatório Quadrimestral de Prestação de Contas da Secretaria de Saúde de um município de 80.000 habitantes, constata que foram contabilizadas como "Ações e Serviços Públicos de Saúde" (ASPS) despesas com merenda escolar da rede municipal de ensino e obras de asfaltamento da avenida principal da cidade. De acordo com a Lei Complementar Federal nº 141/2012, assinale a alternativa correta:</p>
<p><strong>A)</strong> As despesas com merenda escolar e pavimentação urbana são permitidas no cômputo dos 15% constitucionais de saúde caso beneficiem a qualidade de vida da população.</p>
<p><strong>B)</strong> O Conselho de Saúde não tem prerrogativa legal para examinar o relatório quadrimestral, cabendo essa atribuição exclusivamente ao Tribunal de Contas do Estado.</p>
<p><strong>C)</strong> A merenda escolar e as obras de infraestrutura urbana não constituem ações e serviços públicos de saúde para fins de cumprimento do percentual mínimo constitucional, sendo vedada sua contabilização.</p>
<p><strong>D)</strong> O gestor municipal pode compensar despesas de saneamento e educação desde que haja autorização prévia por decreto do Poder Executivo estadual.</p>
<p><strong>Gabarito: C</strong></p>
<p><strong>Comentário Detalhado:</strong> O Artigo 4º da LC 141/2012 é taxativo ao listar as despesas que NÃO podem ser computadas para o piso constitucional de saúde (mínimo de 15% para municípios, 12% para estados e regra federal): merenda escolar, saneamento básico que não atenda especificamente aos padrões sanitários domiciliares em áreas vulneráveis, pavimentação urbana, pagamento de aposentadorias e pensões e assistência à saúde que não atenda ao princípio da universalidade. O Conselho de Saúde emite parecer sobre as contas e o Relatório Anual de Gestão (RAG).</p>

<h3>Questão 12 — Resolução CNS nº 453/2012 e Paridade Representativa</h3>
<p><strong>Enunciado:</strong> Durante o processo eleitoral para renovação do Conselho Municipal de Saúde de determinado município, a comissão eleitoral publica edital definindo as 24 vagas titulares da seguinte forma: 12 vagas para entidades de usuários, 6 vagas para profissionais de saúde e 6 vagas para o Secretário Municipal de Saúde e prestadores de serviços de saúde privados contratados ou conveniados ao SUS. O presidente eleito da mesa diretora do conselho é um usuário representante da associação de moradores local. Em relação à legalidade dessa composição, assinale a alternativa correta:</p>
<p><strong>A)</strong> A composição é nula porque o Secretário de Saúde deve ser obrigatoriamente o presidente nato do Conselho Municipal de Saúde.</p>
<p><strong>B)</strong> A composição e a eleição do presidente respeitam integralmente a Lei nº 8.142/1990 e a Resolução CNS nº 453/2012.</p>
<p><strong>C)</strong> O número de profissionais de saúde deveria ser superior ao número de gestores e prestadores para assegurar a autonomia técnica.</p>
<p><strong>D)</strong> A paridade exigida por lei impõe que 50% das vagas sejam do poder executivo municipal e os outros 50% divididos entre a sociedade civil.</p>
<p><strong>Gabarito: B</strong></p>
<p><strong>Comentário Detalhado:</strong> A Lei 8.142/1990 estabelece que a representação dos usuários nos Conselhos e Conferências de Saúde deve ser paritária em relação ao conjunto dos demais segmentos (50% usuários, 25% trabalhadores de saúde, 25% gestores e prestadores de serviços). Em 24 vagas: 12 usuários (50%), 6 trabalhadores (25%) e 6 gestores/prestadores (25%). Além disso, a Resolução CNS 453/2012 determina que a mesa diretora e a presidência do conselho são eleitas pelos conselheiros, não havendo mais a figura do gestor como presidente nato (superação histórica do modelo anterior).</p>
`;

sections.push({
  id: 'casos-e-questoes-complementares-2026',
  title: '24. Casos Clínicos Complexos e Questões Comentadas de Residência (Padrão 2026)',
  body_html: mdToHtml(additionalCasesAndContent)
});

const book45 = {
  slug: 'participacao-e-controle-social-no-sus',
  title: 'Participação e Controle Social no SUS',
  area: 'Medicina Preventiva',
  materia: 'Saúde Coletiva',
  description: 'Tratado completo de participação e controle social no Sistema Único de Saúde brasileiro: bases constitucionais, Lei 8.142/1990, Resolução CNS 453/2012, conferências de saúde, conselhos paritários, ouvidorias, LC 141/2012, planejamento participativo e casos práticos.',
  sections: sections,
  references: [
    { label: 'Brasil. Constituição da República Federativa do Brasil de 1988, Arts. 196 a 200.', url: 'https://www.planalto.gov.br/ccivil_03/constituicao/constituicao.htm' },
    { label: 'Brasil. Lei Federal nº 8.142, de 28 de dezembro de 1990.', url: 'https://www.planalto.gov.br/ccivil_03/leis/l8142.htm' },
    { label: 'Conselho Nacional de Saúde. Resolução CNS nº 453, de 10 de maio de 2012.', url: 'https://conselho.saude.gov.br/resolucoes/2012/Reso453.pdf' },
    { label: 'Conselho Nacional de Saúde. Resolução CNS nº 553, de 9 de agosto de 2017 (Carta dos Direitos e Deveres da Pessoa Usuária da Saúde).', url: 'https://conselho.saude.gov.br/resolucoes/2017/Reso553.pdf' },
    { label: 'Brasil. Lei Complementar nº 141, de 13 de janeiro de 2012.', url: 'https://www.planalto.gov.br/ccivil_03/leis/lcp/lcp141.htm' },
    { label: 'Ministério da Saúde. Relatório Final da 17ª Conferência Nacional de Saúde, Brasília, 2023.', url: 'https://conselho.saude.gov.br/17cns' }
  ]
};

const usefulCount = saveBook(book45);
console.log(`Aula 045 finalizada com ${usefulCount} caracteres didáticos úteis.`);
