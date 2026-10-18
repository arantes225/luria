// scripts/bloco07_group_a/dii-expansao4.mjs
export const secDiiExpansao4 = [
  {
    id: 'fisiopatologia-da-dor-e-nutricao-dii',
    title: '4.3 Manejo Nutricional, Deficiências de Micronutrientes, Anemia e Terapia Nutricional Enteral Exclusiva (EEN)',
    body_html: `
<p>O comprometimento do estado nutricional é universalmente prevalente nos pacientes com Doença Inflamatória Intestinal ativa, decorrente da combinação sinérgica entre anorexia induzida por citocinas inflamatórias (TNF-alfa e IL-1beta atuando no hipotálamo), má-absorção transmural da mucosa entérica, perdas proteicas e sanguíneas intraluminais continuadas e consumo hipermetabólico sistêmico.</p>

<h3>Deficiências Específicas de Micronutrientes e Mecanismos de Absorção</h3>
<table class="book-table">
  <thead>
    <tr>
      <th>Nutriente / Micronutriente</th>
      <th>Topografia de Absorção Fisiológica</th>
      <th>Fisiopatologia da Deficiência na DII</th>
      <th>Manifestações Clínicas e Conduta de Reposição</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>Ferro (Anemia Ferropriva)</strong></td>
      <td>Duodeno e jejuno proximal.</td>
      <td>Perda crônica contínua por sangramento microscópico ou macroscópico da mucosa ulcerada, associada a bloqueio funcional da absorção e retenção de ferro nos macrófagos mediado pelo aumento da <strong>hepcidina hepática</strong> estimulada pela IL-6 (anemia de doença crônica mista).</td>
      <td>Fadiga crônica, palidez, queda de rendimento. Na DII com atividade inflamatória moderada/grave (PCR &gt; 10 mg/L ou Hb &lt; 10 g/dL), <strong>o ferro endovenoso (carboximaltose férrica ou sacarato de hidróxido de ferro) é a via de escolha</strong>, pois o ferro oral é mal tolerado, mal absorvido e pode agravar a inflamação mucosa por estresse oxidativo intraluminal.</td>
    </tr>
    <tr>
      <td><strong>Vitamina B12 (Cobalamina)</strong></td>
      <td><strong>Íleo terminal exclusivo</strong> (via complexo B12-fator intrínseco captado pelos receptores de cubilina/amnionless).</td>
      <td>Acometimento inflamatório transmural do íleo terminal na Doença de Crohn ileal ou <strong>ressecção cirúrgica ileocecal prévia &gt; 20 a 30 cm</strong>.</td>
      <td>Anemia megaloblástica, glossite atrófica e manifestações neurológicas desmielinizantes (degeneração combinada subaguda da medula: parestesias, perda de propriocepção e ataxia). Reposição intramuscular periódica para toda a vida.</td>
    </tr>
    <tr>
      <td><strong>Ácido Fólico (Folato)</strong></td>
      <td>Jejuno proximal.</td>
      <td>Ingesta reduzida e inibição competitiva da absorção intestinal causada pela <strong>Sulfassalazina</strong> e pelo <strong>Metotrexato</strong>.</td>
      <td>Anemia megaloblástica e leucopenia. Suplementação oral diária obrigatória (1 a 5 mg/dia) para todos os usuários desses fármacos.</td>
    </tr>
    <tr>
      <td><strong>Vitamina D e Cálcio</strong></td>
      <td>Duodeno e jejuno (Vitamina D regula a calbindina epitelial).</td>
      <td>Má-absorção de gorduras (vitaminas lipossolúveis A, D, E, K saponificadas com cálcio livre), baixa exposição solar e uso prolongado de corticosteroides sistêmicos.</td>
      <td>Osteopenia precoce, osteoporose grave e risco elevado de fraturas patológicas vertebrais. Triagem com densitometria óssea e reposição preventiva de colecalciferol e carbonato/citrato de cálcio.</td>
    </tr>
    <tr>
      <td><strong>Zinco e Magnésio</strong></td>
      <td>Jejuno e íleo.</td>
      <td>Perdas volumosas em fezes diarreicas de alto débito e fístulas enterocutâneas ativas.</td>
      <td>Dermatite acrodermatite-símile, alopecia, retardo na cicatrização de feridas e fístulas cirúrgicas, disgeusia e hipocalemia refratária (magnésio baixo).</td>
    </tr>
  </tbody>
</table>

<h3>Terapia Nutricional Enteral Exclusiva (EEN) na Doença de Crohn Pediátrica</h3>
<p>Em crianças e adolescentes com Doença de Crohn luminal ativa, a <strong>Nutrição Enteral Exclusiva (EEN - <em>Exclusive Enteral Nutrition</em>)</strong> com fórmulas líquidas poliméricas ou oligoméricas por 6 a 8 semanas consecutivas (sem qualquer outro alimento sólido) é recomendada pelas diretrizes mundiais (ECCO/ESPGHAN) como <strong>terapia de primeira linha para indução de remissão clínica</strong>, apresentando eficácia equivalente à corticoterapia sistêmica, com taxas superiores de cicatrização mucosa completa, sem os efeitos deletérios do corticoide no crescimento linear pôndero-estatural e na densidade mineral óssea.</p>
`
  },
  {
    id: 'algoritmo-terapeutico-e-monitorizacao-tdm',
    title: '6.2 Monitorização Terapêutica de Fármacos (TDM), Dosagem de Nível Sérico e Anticorpos Antidroga',
    body_html: `
<p>A perda secundária de resposta aos agentes biológicos anti-TNF atinge cerca de 30% a 50% dos pacientes nos primeiros 12 a 24 meses de tratamento. O manejo moderno exige a utilização da <strong>Monitorização Farmacológica Terapêutica (TDM - <em>Therapeutic Drug Monitoring</em>)</strong>:</p>

<h3>Classificação dos Mecanismos de Perda de Resposta</h3>
<table class="book-table">
  <thead>
    <tr>
      <th>Cenário de TDM</th>
      <th>Nível Sérico de Infliximabe / Adalimumabe</th>
      <th>Nível de Anticorpos Antidroga (ADA)</th>
      <th>Interpretação e Conduta Médica Correta</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>Falha Mecânica / Farmacocinética Não Imunogênica</strong></td>
      <td><strong>Subterapêutico</strong> (ex: Infliximabe &lt; 5 mcg/mL ou Adalimumabe &lt; 7,5 mcg/mL).</td>
      <td><strong>Negativos / Ausentes</strong>.</td>
      <td>O fármaco está sendo hiperdepurado (perda por diarréia, alto clearance por grande carga inflamatória tecidual ou IMC elevado), mas o sistema imune não gerou neutralização. <strong>Conduta: Otimização de Dose</strong> (aumentar a dose de Infliximabe para 10 mg/kg ou encurtar o intervalo de infusão para a cada 4 ou 6 semanas).</td>
    </tr>
    <tr>
      <td><strong>Falha Imunogênica</strong></td>
      <td><strong>Indetectável ou Muito Baixo</strong>.</td>
      <td><strong>Títulos Altos e Positivos</strong>.</td>
      <td>O organismo desenvolveu anticorpos neutralizantes contra a molécula quimérica. Otimizar a dose do mesmo fármaco é inútil e perigoso (risco de reações transfusionais graves). <strong>Conduta: Troca de Agente Biológico (<em>Switch</em>)</strong> para outro anti-TNF com estrutura diferente (ex: troca de Infliximabe por Adalimumabe) ou para outra classe mecânica (Vedolizumabe ou Ustequinumabe).</td>
    </tr>
    <tr>
      <td><strong>Falha Farmacodinâmica Não Responsiva</strong></td>
      <td><strong>Terapêutico Alto</strong> (ex: Infliximabe &gt; 10-15 mcg/mL).</td>
      <td><strong>Negativos</strong>.</td>
      <td>A via do TNF-alfa foi plenamente bloqueada, mas a doença continua ativa utilizando rotas inflamatórias alternativas (IL-23, integrinas, JAK). <strong>Conduta: Troca Fora de Classe (<em>Swap</em>)</strong> para outro mecanismo biológico (ex: inibidor de IL-23 ou JAKi).</td>
    </tr>
  </tbody>
</table>
`
  }
];
