// Bloco 5 - Aula 108: Infecção Urinária na Criança - Part 2
export const sec3 = {
  id: 'metodos-de-coleta-esteril-e-ponto-de-corte-urocultura',
  title: '3. Métodos de Coleta de Urina, Contaminação e Pontos de Corte da Urocultura',
  body_html: `
<h3>A Técnica de Coleta: O Divisor de Águas Diagnóstico</h3>
<p>O diagnóstico definitivo de infecção urinária em pediatria depende formalmente da demonstração de bacteriúria significativa em urocultura quantitativa. No entanto, o resultado microbiológico é completamente desprovido de valor se o método de coleta da amostra for inadequado ou contaminado por bactérias comensais da pele perineal, prepúcio ou genitália externa.</p>

<p>A escolha da técnica de coleta é rigorosamente pautada em um critério fisiológico primordial: <strong>a criança possui controle esfincteriano voluntário ("desfraldada") ou não?</strong></p>

<h3>1. Crianças Sem Controle Esfincteriano (Lactentes e Neonatos)</h3>
<p>Em crianças que ainda usam fraldas, a urina JAMAIS pode ser coletada "ao acaso". As diretrizes da Sociedade Brasileira de Pediatria (SBP) e da Academia Americana de Pediatria (AAP) padronizam três métodos:</p>

<ol>
  <li><strong>Punção Suprapúbica (PSP): O Padrão-Ouro Supremo de Esterilidade</strong>
    <ul>
      <li>Procedimento médico invasivo realizado sob assepsia estrita: introdução de agulha perpendicular 1 a 2 cm acima da sínfise púbica na linha média com aspiração direta do conteúdo vesical;</li>
      <li><strong>Condição Técnica Obrigatória:</strong> A bexiga deve estar repleta de urina (verificada por percussão maciça ou, idealmente, guiada em tempo real por ultrassonografia à beira do leito);</li>
      <li><strong>Vantagem:</strong> Risco de contaminação comensal praticamente zero;</li>
      <li><strong>Critério Diagnóstico:</strong> O isolamento de <strong>QUALQUER NÚMERO DE COLÔNIAS de bactérias gram-negativas (mesmo que seja $\ge 1$ UFC/mL!)</strong> confirma inequivocamente infecção urinária! Para cocos gram-positivos, adota-se habitualmente $\ge 1.000$ UFC/mL.</li>
    </ul>
  </li>
  <li><strong>Cateterismo Vesical Aliviador (Sondagem Vesical): O Método de Escolha Prático de Emergência</strong>
    <ul>
      <li>Passagem asséptica de sonda uretral de fino calibre (sonda de alívio nº 4 a 6 Fr no neonato e lactente) após antissepsia perineal rigorosa com clorexidina aquosa, desprezando-se as primeiras gotas e coletando a urina diretamente no frasco estéril;</li>
      <li><strong>Vantagem:</strong> Excelente acurácia diagnóstica, muito menos invasivo que a PSP e realizável com facilidade em prontos-socorros;</li>
      <li><strong>Ponto de Corte Diagnóstico:</strong> Considera-se urocultura positiva a contagem <strong>$\ge 50.000$ UFC/mL</strong> de um único patógeno (embora a diretriz europeia da EAU e alguns consensos aceitem $\ge 10.000$ a $50.000$ UFC/mL diante de leucocitúria evidente e sintomas clínicos exuberantes).</li>
    </ul>
  </li>
  <li><strong>Saco Coletor Autoadesivo Perineal: O Grande Vilão das Bancas de Residência!</strong>
    <ul>
      <li>Bolsa plástica adesiva colada ao redor dos genitais após higiene local;</li>
      <li><strong>A Regra de Ouro Inegociável de Provas: O SACO COLETOR SÓ SERVE PARA EXCLUIR O DIAGNÓSTICO (Alto Valor Preditivo Negativo)!</strong>
        <ul>
          <li>Se a urina do saco coletor apresentar EAS/sedimento perfeitamente normal e urocultura <strong>NEGATIVA</strong>, a ITU está confiavelmente <strong>DESCARTADA</strong>;</li>
          <li>Porém, se a urocultura do saco coletor vier positiva, <strong>A TAXA DE FALSOS-POSITIVOS POR CONTAMINAÇÃO PERINEAL SUPERA 70% A 85%!</strong>;</li>
          <li><strong>Conduta Médica Obrigatória: JAMAIS INICIE TRATAMENTO OU INVESTIGAÇÃO INVASIVA BASEANDO-SE EM UROCULTURA POSITIVA DE SACO COLETOR!</strong> O resultado positivo em saco coletor é nulo e imprestável: exige-se <strong>OBRIGATORIAMENTE NOVA COLETA IMEDIATA POR CATETERISMO VESICAL OU PUNÇÃO SUPRAPÚBICA</strong> para confirmação antes de qualquer decisão clínica definitiva!</li>
        </ul>
      </li>
    </ul>
  </li>
</ol>

<h3>2. Crianças Com Controle Esfincteriano (Pré-Escolares Maiores e Escolares)</h3>
<ul>
  <li><strong>Jato Médio Espontâneo com Higiene Prévia Rigorosa:</strong>
    <ul>
      <li>Higienização cuidadosa da genitália externa com água e sabão neutro (em meninos, retração suave do prepúcio; em meninas, afastamento dos grandes lábios);</li>
      <li>Despreza-se o primeiro jato inicial de urina (cerca de 20 mL, que realiza a lavagem mecânica da uretra distal colonizada) e coleta-se o <strong>jato médio</strong> diretamente no frasco estéril sem encostar na pele;</li>
      <li><strong>Ponto de Corte Diagnóstico (Critério de Kass):</strong> Contagem <strong>$\ge 100.000$ UFC/mL ($10^5$ UFC/mL)</strong> de uma única espécie bacteriana.</li>
    </ul>
  </li>
</ul>

<table class="book-table">
  <thead>
    <tr>
      <th>Método de Coleta de Urina</th>
      <th>População Indicada</th>
      <th>Ponto de Corte para Urocultura Positiva</th>
      <th>Taxa de Contaminação Estimada</th>
      <th>Interpretação e Valor Clínico Prático</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>Punção Suprapúbica (PSP)</strong></td>
      <td>Lactentes sem controle esfincteriano e neonatos (ideal guiada por USG).</td>
      <td><strong>Qualquer crescimento bacteriano ($\ge 1$ UFC/mL)</strong> para bacilos gram-negativos.</td>
      <td>$< 1\\%$ (Mínima)</td>
      <td><strong>Padrão-Ouro de Certeza Absoluta</strong>. Indicado em anatomia genital ambígua, fimose grave ou falha de sondagem.</td>
    </tr>
    <tr>
      <td><strong>Cateterismo Vesical (Sondagem)</strong></td>
      <td>Lactentes sem controle esfincteriano em emergência / enfermaria.</td>
      <td><strong>$\ge 50.000$ UFC/mL</strong> (de uma única espécie).</td>
      <td>$5\\%$ a $10\\%$</td>
      <td><strong>Método de Escolha na Prática Clínica</strong>. Rápido, seguro e com alta acurácia microbiológica.</td>
    </tr>
    <tr>
      <td><strong>Jato Médio Espontâneo</strong></td>
      <td>Crianças continentes com controle esfincteriano estabelecido.</td>
      <td><strong>$\ge 100.000$ UFC/mL</strong> (critério clássico de Kass).</td>
      <td>$10\\%$ a $20\\%$</td>
      <td>Método ambulatorial de rotina para escolares cooperativos. Requer higiene e desprezo do jato inicial.</td>
    </tr>
    <tr>
      <td><strong>Saco Coletor Autoadesivo</strong></td>
      <td>Lactentes assintomáticos apenas como triagem inicial rápida.</td>
      <td>Não se aceita para confirmação diagnóstica!</td>
      <td><strong>$> 70\\% - 85\\%$ (Altíssima!)</strong></td>
      <td><strong>Exclusivo para afastar ITU se negativo</strong>. Se positivo, urocultura é inválida; exige recoleção por cateterismo.</td>
    </tr>
  </tbody>
</table>

<h3>A Interpretação Crítica da Urina Tipo I (EAS / Fita Reagente)</h3>
<p>Enquanto aguardamos as 48 a 72 horas para a liberação do laudo da urocultura quantitativa com antibiograma, o exame de urina tipo 1 (EAS) fornece dados imediatos de extrema valia:</p>

<ul>
  <li><strong>Esterase Leucocitária (Fita Reagente):</strong> Enzima liberada por neutrófilos lisados no trato urinário. Reflete <strong>Piúria / Leucocitúria</strong>. Possui <strong>alta sensibilidade (85% a 90%)</strong>, mas baixa especificidade (pode estar presente em febre de qualquer origem, apendicite aguda, vulvovaginite ou balanopostite);</li>
  <li><strong>Teste do Nitrito (Fita Reagente):</strong> Bactérias uropatogênicas que possuem a enzima nitrato-redutase (como a <em>E. coli</em>, <em>Klebsiella</em> e <em>Proteus</em>) convertem o nitrato endógeno alimentar em nitrito. Possui <strong>especificidade espetacular (> 98%)</strong>: nitrito positivo confirma praticamente a presença de bacteriúria gram-negativa! Contudo, sua <strong>sensibilidade é baixa (50%)</strong> porque exige que a urina permaneça retida na bexiga por no mínimo 4 horas (o lactente esvazia a bexiga a cada 30 minutos!) e bactérias gram-positivas (como <em>Enterococcus</em>) não produzem nitrito;</li>
  <li><strong>Leucocitúria no Sedimento:</strong> Considera-se piúria significativa a presença de $> 5$ a 10 leucócitos por campo de grande aumento (400x) ou $> 10$ leucócitos por microlitro ($mm^3$) em câmara de contagem de Neubauer;</li>
  <li><strong>Presença de Cilindros Leucocitários:</strong> Achado patognomônico de <strong>acometimento do parênquima renal (Pielonefrite Aguda)</strong>, confirmando que a leucocitúria teve origem nos túbulos renais.</li>
</ul>
`
};

export const sec4 = {
  id: 'investigacao-por-imagem-usg-ucrm-dmsa-dtpa',
  title: '4. Investigação por Imagem: USG de Vias Urinárias, UCRM (RVU Graus I a V) e Cintilografias (DMSA vs DTPA/MAG3)',
  body_html: `
<h3>O Racional da Investigação Radiológica na Criança com ITU</h3>
<p>Diferente do adulto jovem em quem a cistite é frequentemente um evento isolado sem alterações anatômicas subjacentes, <strong>toda criança com diagnóstico confirmado de ITU febril (Pielonefrite) tem a obrigação clínica de ser investigada por imagem</strong>. O objetivo primário dessa abordagem radiológica não é apenas documentar a infecção atual, mas sim <strong>detectar anomalias congênitas do trato urinário (CAKUT)</strong>, diagnosticar e graduar o <strong>Refluxo Vesicoureteral (RVU)</strong> e rastrear precocemente a formação de <strong>cicatrizes renais permanentes</strong>.</p>

<p>O arsenal de imagem fundamenta-se em quatro exames complementares de indicações perfeitamente definidas:</p>

<h3>1. Ultrassonografia de Rins e Vias Urinárias (USG-RVU): O Exame de Triagem Inicial Universal</h3>
<ul>
  <li><strong>Quando Realizar?</strong> É o exame de imagem inicial obrigatório em <strong>TODAS as crianças após o primeiro episódio comprovado de ITU febril</strong>, independentemente da idade ou do sexo;</li>
  <li><strong>Momento Ideal:</strong> Em crianças com boa resposta clínica ao antibiótico nas primeiras 48 horas, o USG deve ser realizado ambulatorialmente após a resolução da fase aguda. Contudo, em crianças com má resposta clínica, febre persistente após 48-72 horas de antibiótico venoso adequado, toxemia grave ou oligúria, o <strong>USG deve ser realizado com urgência nas primeiras 24 horas</strong> para descartar complicações mecânicas obstrutivas ou supurativas agudas (abcesso intrarrenal ou perinéfrico, uropatia obstrutiva com pionefrose);</li>
  <li><strong>O que o USG Avalia?</strong> Tamanho, formato e simetria renal; diferenciação corticomedular; presença de hidronefrose (dilatação da pelve e cálices renais); dilatação ureteral; duplicação do sistema pielocalicial; espessamento parietal e debris na bexiga; e ureterocele;</li>
  <li><strong>Limitação Crítica:</strong> O USG de rins <strong>NÃO É CAPAZ DE DIAGNOSTICAR COM SEGURANÇA O REFLUXO VESICOURETERAL (RVU)</strong>, principalmente os graus I a III sem dilatação expressiva, e é pouco sensível para cicatrizes renais pequenas! Um USG normal não afasta RVU.</li>
</ul>

<h3>2. Uretrocistografia Miccional (UCRM): O Padrão-Ouro Absoluto para Refluxo Vesicoureteral</h3>
<p>A <strong>Uretrocistografia Miccional (UCRM)</strong> consiste na cateterização uretral retrógrada com infusão lenta de contraste iodado radiopaco até o preenchimento vesical pleno sob radioscopia, registrando-se radiografias dinâmicas seriadas durante o enchimento vesical e, obrigatoriamente, <strong>durante a fase de micção ativa e após o esvaziamento</strong>.</p>

<ul>
  <li><strong>O que a UCRM Avalia com Maestria Exclusiva?</strong>
    <ul>
      <li>Diagnóstico definitivo e estadiamento anatômico do <strong>Refluxo Vesicoureteral (RVU)</strong>;</li>
      <li>Avaliação anatômica precisa da uretra masculina, sendo o <strong>padrão-ouro soberano para o diagnóstico de Válvula de Uretra Posterior (VUP)</strong> (evidenciada por dilatação fusiforme e balonamento da uretra prostática posterior proximal à válvula com afilamento abrupto distal);</li>
      <li>Detecção de divertículos vesicais, bexiga de esforço trabeculada e refluxo intra-renal (tubular).</li>
    </ul>
  </li>
  <li><strong>Classificação Internacional do Refluxo Vesicoureteral (Graus I a V da International Reflux Study Committee):</strong>
    <table class="book-table">
      <thead>
        <tr>
          <th>Grau do RVU</th>
          <th>Achado Radiológico na UCRM</th>
          <th>Prognóstico de Resolução Espontânea e Conduta Típica</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><strong>Grau I</strong></td>
          <td>O contraste reflui exclusivamente para o ureter, <strong>sem alcançar a pelve renal nem os cálices</strong>. Não há nenhuma dilatação ureteral.</td>
          <td>Altíssima probabilidade de <strong>resolução espontânea (> 80-90%)</strong> com o crescimento da criança. Conduta conservadora.</td>
        </tr>
        <tr>
          <td><strong>Grau II</strong></td>
          <td>O contraste ascende e preenche o ureter, a pelve renal e os cálices, mas <strong>SEM QUALQUER DILATAÇÃO</strong> das estruturas coletoras. A anatomia dos cálices permanece nítida com fórnices preservados.</td>
          <td>Excelente taxa de <strong>resolução espontânea (> 70-80%)</strong>. Conduta clínica conservadora sem cirurgia inicial.</td>
        </tr>
        <tr>
          <td><strong>Grau III</strong></td>
          <td>Refluxo até a pelve e cálices com <strong>dilatação leve a moderada do ureter e pelve renal</strong>. Os fórnices calicinais sofrem discreto arredondamento e leve embotamento.</td>
          <td>Taxa intermediária de resolução espontânea (aproximadamente 50%). Vigilância clínica estreita e profilaxia.</td>
        </tr>
        <tr>
          <td><strong>Grau IV</strong></td>
          <td><strong>Dilatação moderada a acentuada com tortuosidade ureteral</strong>. Embotamento completo dos ângulos dos cálices com impressão papilar totalmente apagada, mas anatomia geral ainda identificável.</td>
          <td>Baixa taxa de resolução espontânea (< 20-30%). Alto risco de lesão renal. Frequente necessidade de correção cirúrgica.</td>
        </tr>
        <tr>
          <td><strong>Grau V</strong></td>
          <td><strong>Refluxo Maciço Grave:</strong> Ureter massivamente dilatado e tortuoso em "saca-rolhas" (megaureter acentuado). Dilatação calicial extrema com cálices convexos e atrofia do parênquima renal adjacente; refluxo intra-renal exuberante.</td>
          <td>Resolução espontânea virtualmente nula (< 5%). Risco altíssimo de urosepse e destruição renal progressiva. <strong>Indicação cirúrgica formal</strong> (reimplante ureterovesical ou injeção endoscópica).</td>
        </tr>
      </tbody>
    </table>
  </li>
  <li><strong>Indicações Formais Atuais da UCRM segundo as Diretrizes Internacionais (Estratégia "Bottom-Up" versus "Top-Down"):</strong>
    <p>A UCRM é um exame invasivo, com irradiação gonadal e desconforto psíquico. Atualmente, a AAP e a SBP recomendam realizar a UCRM após a <strong>primeira ITU febril</strong> se:</p>
    <ul>
      <li>O USG de rins e vias urinárias apresentar alterações anatômicas (hidronefrose, dilatação ureteral, assimetria renal ou espessamento vesical);</li>
      <li>Houver infecção por germes não habituais (outros que não a <em>E. coli</em>, como <em>Pseudomonas</em> ou <em>Proteus</em>);</li>
      <li>Presença de sepse urinária, uremia ou oligúria;</li>
      <li>Criança com <strong>segundo episódio confirmado de ITU febril recorrente</strong> (mesmo que o USG prévio tenha sido normal).</li>
    </ul>
  </li>
</ul>

<h3>3. Cintilografia Renal com DMSA (Ácido Dimercaptossuccínico marcado com Tecnécio-99m): O Padrão-Ouro para Cicatriz Renal</h3>
<ul>
  <li><strong>O que o DMSA Avalia?</strong> O radiofármaco fixa-se estritamente nas células do túbulo contorcido proximal viáveis e funcionantes do córtex renal. Ele avalia com máxima sensibilidade a <strong>Massa Parenquimatosa Renal Funcionará e a Função Renal Relativa Diferencial</strong> (em condições normais, cada rim responde por aproximadamente 50% $\pm 5\%$ da função global);</li>
  <li><strong>Na Fase Aguda da Infecção:</strong> O DMSA evidencia áreas de hipocaptação cortical focal ou multifocal ("defeitos de perfusão / áreas frias"), que correspondem às zonas de inflamação e isquemia aguda da Pielonefrite;</li>
  <li><strong>O Diagnóstico Definitivo de CICATRIZ RENAL CRÔNICA:</strong> O DMSA deve ser obrigatoriamente <strong>agendado e realizado 6 MESES APÓS O EPISÓDIO AGUDO DE ITU FEBRIL</strong>. Se após 6 meses da cura a área fria hipocaptante persistir associada à perda focal de contorno e atrofia cortical, confirma-se o diagnóstico definitivo de <strong>Cicatriz Renal Permanente (Nefropatia do Refluxo)</strong>.</li>
</ul>

<h3>4. Cintilografia Renal com DTPA ou MAG3: A Avaliação Dinâmica do Trato Obstrutivo</h3>
<p>Diferente do DMSA que é estático, o <strong>DTPA (Ácido Dietilenotriaminopentacético)</strong> e o <strong>MAG3 (Mecaptoacetiltriglicina)</strong> são radiofármacos de eliminação rápida que avaliam a <strong>dinâmica de excreção e o esvaziamento das vias urinárias</strong>, sendo ideais para o diagnóstico diferencial entre hidronefrose obstrutiva verdadeira versus dilatação não obstrutiva do sistema coletor:</p>
<ul>
  <li><strong>O Teste do Diurético com Furosemida (Estudo Renográfico Diurético):</strong> Injeta-se o radiofármaco e aguarda-se o enchimento da pelve renal. Em seguida, administra-se Furosemida intravenosa (1 mg/kg) e calcula-se o <strong>Tempo de Meia-Eliminação ($T_{1/2}$)</strong> do radiofármaco:
    <ul>
      <li>$T_{1/2} < 10$ minutos: Eliminação rápida e normal (dilatação não obstrutiva hipotônica);</li>
      <li>$T_{1/2} > 20$ minutos com curva ascendente platô contínua que não esvazia após o diurético: <strong>Uropatia Obstrutiva Verdadeira</strong> (clássica da <strong>Estenose de Junção Ureteropélvica - JUP</strong>, exigindo intervenção cirúrgica de pieloplastia desmembrada de Hynes-Anderson).</li>
    </ul>
  </li>
</ul>
`
};
