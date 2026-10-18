// scripts/boost-bloco-05-108.mjs
import fs from 'fs';
import path from 'path';
import { saveBook, countUsefulChars } from './bloco-05-utils.mjs';

const file = path.join(process.cwd(), 'apostilas', 'infeccao-urinaria-na-crianca', 'content.json');
const data = JSON.parse(fs.readFileSync(file, 'utf-8'));

const extraSec = {
  id: 'bacteriuria-assintomatica-e-armadilhas-provas',
  title: 'Bacteriúria Assintomática vs ITU Verdadeira: Algoritmo de Decisão e Armadilhas de Prova',
  body_html: `
<h3>Bacteriúria Assintomática na População Pediátrica: Quando NÃO Tratar</h3>
<p>A diferenciação entre <strong>Bacteriúria Assintomática (BA)</strong> e <strong>Infecção do Trato Urinário verdadeira (Cistite ou Pielonefrite)</strong> representa um dos tópicos mais cobrados em exames de residência médica e no ENAMED, além de constituir um pilar fundamental da segurança do paciente e do stewardship de antimicrobianos. A BA é definida pelo isolamento de uropatógeno em contagem significativa em cultura de urina estéril na ausência absoluta de sinais clínicos sistêmicos (febre, toxemia, recusa alimentar) ou sintomas do trato urinário inferior (disúria, polaciúria, urgência miccional, dor suprapúbica).</p>

<p>Na infância, a prevalência de bacteriúria assintomática é de aproximadamente 1% a 2% em meninas saudáveis em idade pré-escolar e escolar, e discretamente menor em meninos circuncidados. Diversos ensaios clínicos randomizados e estudos prospectivos multicêntricos demonstraram categoricamente que <strong>o tratamento com antibióticos de crianças com bacteriúria assintomática NÃO previne episódios sintomáticos futuros de pielonefrite, NÃO protege contra o desenvolvimento de novas cicatrizes renais e NÃO preserva a taxa de filtração glomerular</strong>. Ao contrário, a antibioticoterapia desnecessária seleciona uropatógenos multirresistentes (como cepas produtoras de ESBL), altera a microbiota comensal intestinal e perineal e aumenta em até três vezes a incidência subsequente de infecções urinárias sintomáticas recorrentes por perda da flora protetora competitiva de baixa virulência.</p>

<p><strong>Regra de Ouro Editorial LURIA:</strong> Em pediatria, NUNCA se trata bacteriúria assintomática em crianças hígidas, nem mesmo na presença de refluxo vesicoureteral leve a moderado (graus I a III). As únicas exceções protocolares restritas em que a BA exige rastreamento e antibioticoterapia guiada por antibiograma são:
1. Pacientes pediátricos que serão submetidos a procedimentos urológicos invasivos com quebra de barreira mucosa (ex.: dilatação uretral, cirurgias endoscópicas urológicas, nefrolitotripsia percutânea);
2. Pacientes neutropênicos graves pós-quimioterapia ou receptores de transplante renal nos primeiros 3 a 6 meses de pós-operatório sob imunossupressão profunda.</p>

<table class="book-table">
  <thead>
    <tr>
      <th>Parâmetro Clínico-Laboratorial</th>
      <th>Bacteriúria Assintomática (BA)</th>
      <th>Infecção do Trato Urinário Sintomática</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>Sinais e Sintomas Clínicos</strong></td>
      <td>Ausência total de manifestações clínicas ou febre. Urina límpida na micção espontânea.</td>
      <td>Lactentes: febre sem foco, irritabilidade, vômitos, perda de peso. Crianças maiores: disúria, polaciúria, febre alta com calafrios na pielonefrite.</td>
    </tr>
    <tr>
      <td><strong>Sedimentoscopia (EAS / Tipo 1)</strong></td>
      <td>Frequentemente leucocitúria ausente ou mínima (&lt; 10.000/mL). Rara bacteriúria isolada sem resposta imune.</td>
      <td>Piúria intensa (&gt; 10 leucócitos por campo ou &gt; 10.000/mL), esterase leucocitária positiva e teste de nitrito positivo (em Gram-negativos).</td>
    </tr>
    <tr>
      <td><strong>Urocultura Quantitativa</strong></td>
      <td>Crescimento de bactéria única (frequentemente <em>E. coli</em> de baixa virulência sem fímbrias P).</td>
      <td>Crescimento significativo compatível com o método estéril de coleta (&gt;= 50.000 UFC/mL no cateterismo ou &gt;= 100.000 UFC/mL no jato médio).</td>
    </tr>
    <tr>
      <td><strong>Reagentes de Fase Aguda (PCR / Procalcitonina)</strong></td>
      <td>Estritamente normais. Ausência de inflamação sistêmica.</td>
      <td>Elevados na pielonefrite aguda (PCR &gt; 20-40 mg/L, procalcitonina &gt; 0,5 ng/mL).</td>
    </tr>
    <tr>
      <td><strong>Conduta Médica Padrão</strong></td>
      <td><strong>NÃO PRESCREVER ANTIBIÓTICOS.</strong> Orientar higiene adequada, ingesta hídrica e investigar constipação intestinal associada.</td>
      <td><strong>Iniciar antibioticoterapia empírica imediata</strong> após coleta estéril (Amoxicilina-Clavulanato, Cefuroxima ou Cefalosporinas de 3ª geração).</td>
    </tr>
  </tbody>
</table>

<h3>Disfunção do Trato Urinário Inferior e Constipação (Síndrome de Eliminação Disfuncional)</h3>
<p>Um dos fatores de risco mais negligenciados para ITU recorrente em crianças com controle esfincteriano adquirido é a <strong>Disfunção do Trato Urinário Inferior e Intestinal (DTUI / Bowel and Bladder Dysfunction - BBD)</strong>. A retenção voluntária de fezes leva à formação de fecalomas volumosos na ampola retal, que comprimem mecanicamente a parede posterior da bexiga urinária, elevando as pressões intravesicais de enchimento, diminuindo a capacidade funcional da bexiga e impedindo o esvaziamento vesical completo. Esse resíduo pós-miccional estagnado atua como meio de cultura primário para bactérias que ascendem do períneo.</p>
<p>Adicionalmente, crianças que postergam a micção (hábito comum em ambiente escolar) desenvolvem hiperatividade detrusora ou dissinergia vesicoesfincteriana funcional. O manejo primordial de crianças em idade escolar com ITUs de repetição deve priorizar:</p>
<ul>
  <li>Correção agressiva da constipação intestinal (desimpactação com polietilenoglicol - PEG 4000, dieta rica em fibras e treinamento de hábito intestinal diário pós-prandial);</li>
  <li>Reeducação miccional programada a cada 2 a 3 horas com postura ergonômica adequada no vaso sanitário (uso de apoio para os pés garantindo relaxamento completo da musculatura do assoalho pélvico);</li>
  <li>Estímulo rigoroso à ingesta de líquidos ao longo de todo o dia escolar.</li>
</ul>
`
};

data.sections.push(extraSec);
saveBook('infeccao-urinaria-na-crianca', data);
console.log('Aula 108 boosted successfully!');
