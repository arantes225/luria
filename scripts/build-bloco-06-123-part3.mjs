// Bloco 6 - Aula 123: Febre sem Sinais Localizatórios - Part 3
export const sec5 = {
  id: 'lactentes-3-a-36-meses-escala-yale-itu-oculta',
  title: '5. Abordagem Diagnóstica na Criança de 3 a 36 Meses: Escala de Yale e Triagem de ITU Oculta',
  body_html: `
<h3>O Cenário Epidemiológico e Clínico dos Lactentes e Pré-Escolares (3 a 36 Meses)</h3>
<p>A faixa etária de 3 a 36 meses compreende a vasta maioria das consultas de pronto-atendimento pediátrico por febre sem sinais localizatórios (FSSL). Nesse grupo etário, o sistema imunológico encontra-se em fase ativa de maturação: a imunidade passiva transmitida pelos anticorpos maternos transplacentários (IgG) sofreu declínio acentuado por volta dos 3 a 6 meses de vida, enquanto a produção endógena de anticorpos polissacarídicos ainda é parcial.</p>

<p>Contudo, nas crianças com o esquema vacinal atualizado — contendo ao menos duas doses da vacina pneumocócica conjugada (VPC-10 ou VPC-13) e da vacina conjugada contra o <em>Haemophilus influenzae</em> tipo b (Hib) —, o risco de bacteremia oculta despencou de valores históricos de $3-5\%$ para taxas inferiores a $0,5\%$. Em contrapartida, a <strong>Infecção do Trato Urinário (ITU) Oculta</strong> ascendeu para o posto incontestável de infecção bacteriana grave (IBG) mais frequente nessa faixa de idade, acometendo entre $3\%$ e $8\%$ de todos os lactentes febris sem foco aparente.</p>

<h3>A Escala de Observação de Yale (Yale Observation Scale - YOS)</h3>
<p>Desenvolvida pioneiramente por McCarthy e colaboradores em 1982, a Escala de Observação de Yale (YOS) permanece como o instrumento semiológico clássico e padronizado para discriminar objetivamente a "toxicidade clínica" e o risco de sepse ou bacteremia em crianças de 3 a 36 meses com febre aguda. A escala avalia <strong>6 variáveis comportamentais e físicas fundamentais</strong>, pontuando cada item em três níveis de gravidade: <strong>1 ponto</strong> (normal/ótimo), <strong>3 pontos</strong> (anormalidade moderada) ou <strong>5 pontos</strong> (anormalidade severa/tóxico):</p>

<table class="book-table">
  <thead>
    <tr>
      <th>Parâmetro Semiológico Avaliado</th>
      <th>Escore 1 (Normal / Bom Estado Geral)</th>
      <th>Escore 3 (Comprometimento Moderado)</th>
      <th>Escore 5 (Gravemente Comprometido / Tóxico)</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>1. Qualidade do Choro</strong></td>
      <td>Choro forte com tonalidade habitual, ou não está chorando (tranquilo).</td>
      <td>Gemência intermitente ou choro choroso / lamentoso.</td>
      <td>Choro fraco, gemência expiratória contínua ou choro agudo e estridente.</td>
    </tr>
    <tr>
      <td><strong>2. Reação ao Estímulo dos Pais</strong></td>
      <td>Para de chorar rapidamente quando acolhido, consolado ou amamentado no colo.</td>
      <td>Chora e para de forma intermitente; consolo difícil e transitório.</td>
      <td>Choro inconsolável e persistente, ou indiferença total à presença materna/paterna.</td>
    </tr>
    <tr>
      <td><strong>3. Estado de Alerta e Vigília</strong></td>
      <td>Se acordado, permanece alerta e vigil; se dormindo, desperta prontamente ao estímulo verbal ou táctil leve.</td>
      <td>Fecha os olhos rapidamente se deixado quieto; desperta apenas após estímulo moderado repetido.</td>
      <td>Não desperta ou quase não responde a estímulos dolorosos/mecânicos; letargia e estupor.</td>
    </tr>
    <tr>
      <td><strong>4. Coloração Cutânea</strong></td>
      <td>Rósea, coloração habitual em extremidades e mucosas.</td>
      <td>Extremidades pálidas ou acrocianose discreta sem hipotermia central.</td>
      <td>Palidez cutânea generalizada, cianose labial/facial ou pele mosqueada e rendilhada (livedo reticular).</td>
    </tr>
    <tr>
      <td><strong>5. Estado de Hidratação</strong></td>
      <td>Pele turgente, mucosas orais úmidas, presença de lágrimas ativas ao choro.</td>
      <td>Mucosas orais secas, olhos discretamente encovados, saliva escassa.</td>
      <td>Pele pastosa, mucosas ressequidas, ausência absoluta de lágrimas, olhos encovados com fontanela deprimida.</td>
    </tr>
    <tr>
      <td><strong>6. Resposta Social e Interação Ambiental</strong></td>
      <td>Sorri espontaneamente ou responde com contato visual e interesse ativo pelo examinador e brinquedos.</td>
      <td>Breve sorriso hesitante, contato visual fugaz, pouco interesse no ambiente circundante.</td>
      <td>Fácies inexpressiva ("olhar parado"), ausência de contato visual e sem sorriso, indiferença absoluta ao meio.</td>
    </tr>
  </tbody>
</table>

<div class="formula-box">
  <p><strong>Interpretação Clínica e Pontuação Total da Escala de Yale (YOS):</strong></p>
  <ul>
    <li><strong>Escore Total $\le 10$ pontos:</strong> Criança em <strong>BOM ESTADO GERAL</strong>. A probabilidade de Infecção Bacteriana Grave é inferior a $1,5-2,7\%$. Condução orientada pelo perfil vacinal e busca ativa de ITU oculta.</li>
    <li><strong>Escore Total de 11 a 15 pontos:</strong> Estado geral <strong>DUBIO / MODERADAMENTE COMPROMETIDO</strong>. Risco intermediário de IBG (cerca de $26\%$). Exige investigação laboratorial pormenorizada e período de observação clínica monitorada em pronto-socorro.</li>
    <li><strong>Escore Total $\ge 16$ pontos:</strong> Criança <strong>TÓXICA / GRAVEMENTE COMPROMETIDA</strong>. Risco de Infecção Bacteriana Grave superior a $92\%$. Conduta imediata: estabilização hemodinâmica (protocolo de sepse PALS), expansão volêmica, coleta integral de exames (sangue, urina e líquor se hemodinamicamente estável) e início precoce de antibioticoterapia venosa parenteral de amplo espectro na primeira hora.</li>
  </ul>
</div>

<h3>Algoritmo Decisório na Criança de 3 a 36 Meses em Bom Estado Geral</h3>
<p>Quando a criança entre 3 e 36 meses apresenta escore de Yale $\le 10$ (sem toxemia) e o exame físico detalhado não revela nenhum foco infeccioso aparente (oroscopia sem placas, otoscopia bilateral límpida, ausculta pulmonar simétrica e sem estertores, abdome flácido, ausência de petéquias ou exantemas), o raciocínio clínico bifurca-se rigorosamente com base em dois pilares:</p>

<ol>
  <li><strong>O Status Vacinal da Criança:</strong>
    <ul>
      <li><em>Criança Totalmente Vacinada:</em> Recebeu ao menos 2 doses da vacina pneumocócica conjugada (VPC-10 ou VPC-13) e da vacina pentavalente (com componente anti-Hib). Nessa condição, o risco residual de bacteremia oculta é irrisório ($< 0,5\%$). Não há indicação de coleta rotineira de hemograma ou hemocultura em crianças sem toxemia!</li>
      <li><em>Criança Não Vacinada ou com Esquema Vacinal Atrasado (< 2 doses de VPC/Hib):</em> Risco de bacteremia oculta por <em>Streptococcus pneumoniae</em> e <em>Haemophilus influenzae</em> tipo b permanece significativo ($3-5\%$). Requer solicitação de Hemograma Completo com Leucograma e Hemocultura se febre $\ge 39,0$ ºC axilar.</li>
    </ul>
  </li>
  <li><strong>A Triagem Estratificada de Infecção do Trato Urinário (ITU) Oculta:</strong>
    <p>A ITU é a principal armadilha diagnóstica no lactente febril, pois em menores de 2 anos a pielonefrite aguda manifesta-se unicamente com febre isolada, sem disúria, polaciúria ou dor lombar perceptíveis. A Academia Americana de Pediatria (AAP) e a Sociedade Brasileira de Pediatria (SBP) estabelecem fatores de risco clínicos bem definidos para indicar a coleta de urina:</p>
  </li>
</ol>

<div class="book-case">
  <h4>Critérios Mandatórios para Coleta de Urina na Febre sem Foco (3 a 24 meses):</h4>
  <p><strong>1. Meninos:</strong></p>
  <ul>
    <li><em>Meninos Não Circuncidados:</em> Apresentam risco 4 a 10 vezes maior de colonização uretral ascendente. Deve-se coletar urina em todos os meninos não circuncidados com idade inferior a <strong>12 meses</strong> e febre $\ge 38,0$ ºC com duração $\ge 24-48$ horas;</li>
    <li><em>Meninos Circuncidados:</em> Coletar urina se idade $< 6$ meses com febre $\ge 39,0$ ºC sem foco por mais de 24 horas, ou se múltiplos fatores de risco (febre $> 48$h, história prévia de ITU, malformação renal congênita).</li>
  </ul>
  <p><strong>2. Meninas:</strong></p>
  <ul>
    <li>Coletar urina em todas as meninas com idade inferior a <strong>24 meses</strong> que apresentem <strong>febre $\ge 39,0$ ºC</strong> com duração $\ge 48$ horas, OU quando houver a presença de ao menos 2 fatores preditivos de risco da AAP:
      <ol>
        <li>Idade $< 12$ meses;</li>
        <li>Etnia branca (associação epidemiológica descrita);</li>
        <li>Temperatura axilar máxima $\ge 39,0$ ºC;</li>
        <li>Febre com duração $\ge 2$ dias (48 horas);</li>
        <li>Ausência absoluta de outro foco infeccioso alternativo.</li>
      </ol>
    </li>
  </ul>
</div>

<h3>Método de Coleta de Urina: O Erro Crasso do Saco Coletor Autoadesivo</h3>
<p>Um dos pontos mais frequentemente cobrados em concursos médicos de residência e revalidação de diplomas diz respeito ao método de amostragem urinária no lactente sem controle esfincteriano:</p>
<ul>
  <li><strong>Saco Coletor de Urina Autoadesivo:</strong> Apresenta uma taxa de <strong>falso-positivo para cultura bacteriana superior a $85\%$</strong> devido à contaminação obrigatória pela flora perineal e fecal. Seu valor reside unicamente no seu <em>alto valor preditivo negativo (VPN)</em>: se a fita reagente e o sedimento urinário forem rigorosamente límpidos (esterase leucocitária negativa e nitrito negativo), a ITU pode ser temporariamente descartada. Todavia, <strong>JAMAIS SE INICIA TRATAMENTO OU SE FECHA DIAGNÓSTICO DE ITU COM UROCULTURA DE SACO COLETOR!</strong> Se o exame de triagem vier positivo ou alterado, é compulsória a recoleta por método estéril;</li>
  <li><strong>Cateterismo Vesical Aliviador Estéril (Sondagem Vesical):</strong> É o método preferencial de rotina na pediatria de urgência. Sensibilidade e especificidade elevadíssimas ($> 95\%$). Considera-se urocultura positiva o crescimento de <strong>$\ge 50.000$ UFC/mL</strong> de um único patógeno bacteriano uropatogênico (ou $\ge 10.000$ UFC/mL se fita reagente com piúria franca);</li>
  <li><strong>Punção Suprapúbica (PSP):</strong> Padrão-ouro histórico absoluto. Indicada especialmente quando há fimose cerrada intratável, aderência labial severa ou necessidade urgente antes de início de antibióticos. Por se tratar de amostra estéril colhida diretamente da bexiga, <strong>qualquer crescimento bacteriano (mesmo $\ge 1$ única colônia de bacilo gram-negativo) é diagnóstico confirmatório de ITU</strong>.</li>
</ul>
`
};

export const sec6 = {
  id: 'sepse-bacteremia-oculta-e-artrite-osteomielite',
  title: '6. Sepse Oculta, Bacteremia Pneumocócica e Focos Profundos (Artrite/Osteomielite)',
  body_html: `
<h3>Fisiopatologia da Bacteremia Oculta</h3>
<p>Define-se <strong>Bacteremia Oculta (BO)</strong> como a presença de microrganismos bacterianos viáveis circulando na corrente sanguínea de uma criança febril que aparenta bom estado geral (escore de Yale $\le 10$) e na qual a anamnese detalhada e o exame físico minucioso não identificam qualquer foco infeccioso localizatório. Trata-se, portanto, de um diagnóstico laboratorial e microbiológico retrospectivo, firmado pelo isolamento bacteriano em hemocultura.</p>

<p>Na era pré-vacinal, o agente etiológico dominante de bacteremia oculta era o <em>Streptococcus pneumoniae</em> (responsável por mais de $85\%$ dos casos), seguido em menor proporção pelo <em>Haemophilus influenzae</em> tipo b ($10\%$) e <em>Neisseria meningitidis</em> ($1-3\%$). A relevância da identificação precoce da bacteremia oculta residia no risco de disseminação metastática hematogênica: sem intervenção antimicrobiana, cerca de $5-10\%$ dos pacientes com bacteremia pneumocócica e até $30-50\%$ daqueles com bacteremia por <em>H. influenzae</em> b ou meningococo evoluíam para <strong>meningite purulenta</strong>, choque séptico, osteomielite, artrite séptica ou celulite fulminante.</p>

<h3>A Pneumonia Oculta: Quando Indicar a Radiografia de Tórax?</h3>
<p>Outra grande armadilha clínica na febre sem sinais localizatórios em crianças pequenas é a chamada <strong>Pneumonia Oculta (ou Pneumonia Silenciosa)</strong>. Lactentes e crianças com menos de 2 anos de idade com condensação alveolar subpleural ou lobar podem, não raramente, não apresentar tiragem intercostal evidente, taquipneia ou estertoração audível à ausculta em estágios iniciais, exibindo apenas febre elevada isolada e prostração branda.</p>

<div class="formula-box">
  <p><strong>Critérios Clássicos para Solicitação de Radiografia de Tórax em Crianças com FSSL (Bachar et al. / AAP):</strong></p>
  <ul>
    <li>Criança com febre de magnitude elevada: <strong>Temperatura axilar $\ge 39,0$ ºC</strong> (ou retal $\ge 39,5$ ºC);</li>
    <li>Associada a <strong>Leucocitose importante no hemograma: Leucócitos totais $\ge 20.000/\text{mm}^3$</strong>;</li>
    <li>E/ou <strong>Neutrofilia absoluta acentuada: Contagem total de neutrófilos $\ge 10.000/\text{mm}^3$</strong>;</li>
    <li>Qualquer sinal respiratório sutil, como taquipneia limítrofe (definida pela OMS como FR $> 50$ irpm em lactentes de 2 a 11 meses e $> 40$ irpm em crianças de 12 a 59 meses) ou discreto batimento de asa de nariz intermitente.</li>
  </ul>
  <p><em>Racional Clínico:</em> Em estudos de coorte prospectivos, até $20-25\%$ das crianças febris sem sinais auscultatórios que preenchiam esses critérios de febre elevada e leucocitose $> 20.000/\text{mm}^3$ exibiam consolidação pneumônica radiológica nítida na radiografia de tórax.</p>
</div>

<h3>Conduta Frente à "Hemocultura Positiva que Retorna em 24 a 48 Horas"</h3>
<p>Um dos cenários mais emblemáticos e recorrentes em provas de residência médica de grande concorrência (como ENARE, USP, UNIFESP, UNICAMP) é o manejo da criança atendida no dia anterior com febre sem foco, da qual foi colhida hemocultura ambulatorial, e cujo laboratório de microbiologia telefona 24 a 48 horas depois avisando que o frasco <strong>"positivou para cocos gram-positivos em pares e cadeias"</strong> (compatível com <em>Streptococcus pneumoniae</em>) ou <strong>"bastonetes gram-negativos"</strong>.</p>

<p>O médico plantonista deve convocar a família <strong>IMEDIATAMENTE</strong> para reavaliação presencial no serviço de urgência, aplicando o algoritmo clássico de conduta baseado no estado clínico atual da criança:</p>

<table class="book-table">
  <thead>
    <tr>
      <th>Estado Clínico no Retorno Presencial</th>
      <th>Patógeno Identificado na Hemocultura</th>
      <th>Conduta Terapêutica Imediata Obrigatória</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>Criança Afebril e em Excelente Estado Geral</strong><br>(Yale $\le 10$, brincando, alimentando-se bem)</td>
      <td><strong><em>Streptococcus pneumoniae</em></strong><br>(Bacteremia pneumocócica autolimitada ou transitória)</td>
      <td>
        <ol>
          <li>Exame físico minucioso de cabo a rabo (descartar otite média aguda, focos osteoarticulares, petéquias);</li>
          <li>Coletar <strong>nova hemocultura de controle</strong> para verificar clareamento bacterêmico;</li>
          <li>Iniciar <strong>Amoxicilina em altas doses ($80-90$ mg/kg/dia VO)</strong> por 7 a 10 dias para erradicar colonização e prevenir recaída;</li>
          <li>Se a nova hemocultura vier negativa e a criança permanecer assintomática, seguimento ambulatorial com segurança.</li>
        </ol>
      </td>
    </tr>
    <tr>
      <td><strong>Criança Permanece Febril ou com Piora do Estado Geral</strong><br>(Yale $> 10$, prostrada, irritada, inapetente)</td>
      <td><strong>Qualquer Bactéria</strong><br>(<em>S. pneumoniae</em>, <em>H. influenzae</em>, <em>N. meningitidis</em>, <em>S. aureus</em>)</td>
      <td>
        <ol>
          <li><strong>INTERNAÇÃO HOSPITALAR IMEDIATA</strong>;</li>
          <li><strong>Realizar Punção Lombar diagnóstica compulsória</strong> (altíssimo risco de meningite purulenta secundária à bacteremia persistente);</li>
          <li>Coletar nova hemocultura pareada, urina estéril e radiografia de tórax;</li>
          <li>Instalar <strong>Ceftriaxona IV ($100$ mg/kg/dia)</strong> em dose meningítica imediatamente.</li>
        </ol>
      </td>
    </tr>
    <tr>
      <td><strong>Criança em Qualquer Estado (Mesmo afebril)</strong></td>
      <td><strong><em>Neisseria meningitidis</em></strong> ou <strong><em>Haemophilus influenzae</em> tipo b</strong></td>
      <td>
        <ol>
          <li><strong>INTERNAÇÃO HOSPITALAR OBRIGATÓRIA</strong> independente do aspecto clínico momentâneo;</li>
          <li>Screening completo com <strong>Punção Lombar</strong> imediata;</li>
          <li>Ceftriaxona parenteral IV;</li>
          <li>Notificação epidemiológica compulsória imediata e quimioprofilaxia de contatos domiciliares próximos com Rifampicina ou Ceftriaxona dose única.</li>
        </ol>
      </td>
    </tr>
  </tbody>
</table>

<h3>Focos Profundos Ocultos: A Armadilha da Artrite Séptica e Osteomielite Aguda</h3>
<p>Em lactentes com menos de 1 ano de vida, os vasos sanguíneos da metáfise óssea atravessam livremente a placa epifisária de crescimento (fise cartilaginosa), comunicando a medula óssea diretamente com o espaço articular sinovial. Em razão dessa anatomia vascular vascular particular do lactente, uma bacteremia transitória por <em>Staphylococcus aureus</em>, <em>Streptococcus pyogenes</em> ou <em>Kingella kingae</em> pode se alojar silenciosamente na metáfise fêmuro-tibial e romper para dentro da cápsula articular em questão de horas.</p>

<p>O quadro inicial é enganoso e frequentemente rotulado como febre sem sinais localizatórios até que o examinador atento perceba a <strong>pseudoparalisia antálgica do membro</strong>:</p>
<ul>
  <li>O lactente recusa-se a movimentar a perna ou o braço acometido, mantendo o membro fletido e em rotação externa (posição que maximiza o volume capsular e minimiza a dor intracapsular da articulação coxofemoral);</li>
  <li>Choro intenso e inconsolável à simples troca de fraldas ou durante a palpação gentil dos trocanteres e joelhos;</li>
  <li>A elevação da proteína C-reativa (PCR $> 20$ mg/L) e da VHS ($> 30$ mm/h) são marcadores precoces que antecedem em até 10 a 14 dias o aparecimento de lesões osteolíticas na radiografia simples;</li>
  <li>A ultrassonografia articular é o exame de imagem inicial de eleição na suspeita clínica, demonstrando prontamente espessamento sinovial e derrame articular purulento, exigindo artrocentese diagnóstica e descompressão cirúrgica de emergência.</li>
</ul>
`
};
