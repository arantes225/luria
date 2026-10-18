// scripts/bloco07_group_a/dii-expansao2.mjs
export const secDiiExpansao2 = [
  {
    id: 'indices-de-atividade-clinica-e-escores',
    title: '4.2 Escores e Índices Clínicos de Atividade: Truelove-Witts, Escore de Mayo, CDAI e Classificação de Montreal',
    body_html: `
<p>A mensuração objetiva da gravidade e da extensão das DIIs é primordial para determinar a necessidade de internação hospitalar, guiar a escolha de terapias avançadas e monitorar a resposta ao tratamento.</p>

<h3>Classificação Fenotípica de Montreal (Consenso de 2005)</h3>
<table class="book-table">
  <thead>
    <tr>
      <th>Variável</th>
      <th>Doença de Crohn (DC)</th>
      <th>Retocolite Ulcerativa (RCU)</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>Idade ao Diagnóstico (A)</strong></td>
      <td>• <strong>A1:</strong> &lt; 16 anos (pediátrica)<br>• <strong>A2:</strong> 17 a 40 anos (adulto jovem, mais comum)<br>• <strong>A3:</strong> &gt; 40 anos (início tardio)</td>
      <td>—</td>
    </tr>
    <tr>
      <td><strong>Localização Anatômica (L para DC / E para RCU)</strong></td>
      <td>• <strong>L1:</strong> Ileal isolada (30%)<br>• <strong>L2:</strong> Colônica isolada (20%)<br>• <strong>L3:</strong> Ileocolônica (50%)<br>• <strong>L4:</strong> Trato gastrointestinal alto isolado ou adicionado às demais (esôfago, estômago, duodeno, jejuno proximal)</td>
      <td>• <strong>E1 (Proctite Ulcerativa):</strong> Inflamação limitada ao reto (distal à junção retossigmoide; &lt; 15 cm da margem anal)<br>• <strong>E2 (Colite Esquerda / Distal):</strong> Acomete até a flexura esplênica do cólon<br>• <strong>E3 (Colite Extensa / Pancolite):</strong> Estende-se proximalmente à flexura esplênica, envolvendo o cólon transverso e/ou ceco</td>
    </tr>
    <tr>
      <td><strong>Comportamento da Doença (B para DC)</strong></td>
      <td>• <strong>B1:</strong> Não estenosante, não fistulizante (inflamatória pura)<br>• <strong>B2:</strong> Estenosante (fibroestenoses luminais com sintomas suboclusivos)<br>• <strong>B3:</strong> Fistulizante (fístulas internas enteroentéricas, enterocutâneas, enterovesicais)<br>• <strong>Modificador "p":</strong> Doença perianal associada (ex: L3B2p)</td>
      <td>Classificação de Gravidade Clínica (S):<br>• <strong>S0:</strong> Remissão clínica<br>• <strong>S1:</strong> Leve<br>• <strong>S2:</strong> Moderada<br>• <strong>S3:</strong> Grave</td>
    </tr>
  </tbody>
</table>

<h3>Critérios de Truelove e Witts para Colite Ulcerativa Grave (Indicação de Internação)</h3>
<p>O escore de Truelove e Witts é a ferramenta de cabeceira mais clássica para estratificar o surto grave da Retocolite Ulcerativa:</p>
<ul>
  <li><strong>Critério Obrigatório:</strong> Frequência de evacuações com <strong>&gt;= 6 evacuações sanguinolentas por dia</strong>;</li>
  <li><strong>Associado a pelo menos UM dos seguintes comemorativos sistêmicos:</strong>
    <ul>
      <li>Frequência cardíaca &gt; 90 bpm (taquicardia);</li>
      <li>Temperatura axilar vespertina &gt; 37,8°C (ou &gt; 37,5°C sustentada);</li>
      <li>Hemoglobina &lt; 10,5 g/dL (anemia associada ao sangramento ativo);</li>
      <li>Velocidade de Hemossedimentação (VHS) &gt; 30 mm/1ª hora ou Proteína C-Reativa (PCR) sérica &gt; 30 mg/L.</li>
    </ul>
  </li>
  <li><em>Conduta Mandatória:</em> Internação hospitalar imediata, jejum/dieta leve, rastreamento de <em>C. difficile</em> e início de corticoterapia endovenosa plena (Metilprednisolona 60 mg/dia ou Hidrocortisona 300 mg/dia).</li>
</ul>
`
  },
  {
    id: 'casos-discursivos-e-condutas-avancadas-dii',
    title: '7.1 Casos Clínicos Discursivos Avançados e Discussão de Padrão de Resposta LURIA',
    body_html: `
<div class="case-study">
  <h4>Caso Discursivo 2: Doença de Crohn Ileocecal Estenosante e Decisão Terapêutica</h4>
  <p><strong>Cenário Clínico:</strong> Homem de 32 anos, tabagista ativo (20 maços-ano), portador de Doença de Crohn há 5 anos, procura a emergência com episódios repetidos de cólica intensa em fossa ilíaca direita após as refeições, associada a distensão abdominal, perda ponderal de 9 kg no último semestre e náuseas. Nega diarreia sanguinolenta ou febre. Exame físico: emagrecido, abdome com ruídos hidroaéreos aumentados com timbre metálico em fossa ilíaca direita, onde se palpa alça espessada e dolorosa. A entero-tomografia evidencia estenose única de 6 cm de extensão no íleo terminal, a 10 cm da válvula ileocecal, com acentuada dilatação retrógrada da alça ileal a montante (diâmetro de 4,8 cm), parede espessada com proliferação fibro-adiposa circundante (sinal do <em>creeping fat</em>) e escasso realce mucoso de contraste após injeção venosa. Ausência de fístulas ou abscessos perialça.</p>

  <p><strong>Perguntas Formuladas:</strong></p>
  <ol>
    <li>Qual é a classificação fenotípica de Montreal deste paciente e qual o comportamento predominante da estenose (inflamatório agudo versus fibroestenosante cicatricial)? Justifique pelos exames.</li>
    <li>Qual o papel do tabagismo na evolução clínica deste paciente?</li>
    <li>A introdução isolada de terapia biológica anti-TNF (Infliximabe) está indicada neste momento para reversão da obstrução mecânica? Justifique.</li>
    <li>Qual a conduta cirúrgica de escolha indicada para este caso, considerando a extensão e o segmento acometido?</li>
  </ol>

  <p><strong>Padrão de Resposta Esperado (LURIA):</strong></p>
  <ol>
    <li><strong>Classificação de Montreal:</strong> Paciente classificado como <strong>A2 L1 B2</strong> (Idade 32 anos = A2; Localização ileal = L1; Comportamento estenosante = B2). A estenose é predominantemente <strong>fibroestenosante crônica (cicatricial irreversível)</strong>, evidenciada pela marcante dilatação das alças a montante (&gt; 4 cm), proliferação gordurosa de <em>creeping fat</em> e escasso realce mucoso ao contraste venoso na entero-TC (que reflete ausência de componente inflamatório agudo preponderante).</li>
    <li><strong>Papel do Tabagismo:</strong> O tabagismo é um dos fatores de risco mais deletérios na Doença de Crohn, correlacionando-se diretamente com o desenvolvimento precoce de fenótipo fibroestenosante e fistulizante, menor resposta aos imunobiológicos e elevação de mais de três vezes na taxa de recidiva pós-operatória. A cessação imediata do tabagismo é mandatória.</li>
    <li><strong>Papel da Terapia Biológica Isolada:</strong> <strong>NÃO está indicada como conduta primária desobstrutiva</strong>. A estenose é predominantemente fibrótica e fixa, com dilatação acentuada a montante. O uso de anti-TNF em estenoses puramente fibróticas não reverte a fibrose e pode até precipitar obstrução mecânica completa pela rápida cicatrização de microerosões. A terapia biológica será essencial, no entanto, no pós-operatório para prevenir a recidiva inflamatória na nova anastomose ileocólica.</li>
    <li><strong>Conduta Cirúrgica de Escolha:</strong> <strong>Cirurgia Poupadeira e Econômica: Ressecção Ileocecal (ou Ileocolectomia Direita econômica) videolaparoscópica com margens de ressecção macroscópicas mínimas (1 a 2 cm) e anastomose íleo-transversa término-lateral ou látero-lateral</strong>. Como a estenose mede 6 cm e há dilatação significativa a montante, a estrituroplastia não é a conduta primária no íleo terminal quando associada à válvula ileocecal fibrótica. A ressecção deve ser estritamente econômica para prevenir síndrome do intestino curto.</li>
  </ol>
</div>
`
  }
];
