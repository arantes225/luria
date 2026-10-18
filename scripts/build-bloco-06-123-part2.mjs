// Bloco 6 - Aula 123: Febre sem Sinais Localizatórios - Part 2
export const sec3 = {
  id: 'estratificacao-de-risco-neonatos-ate-28-dias',
  title: '3. Estratificação de Risco no Período Neonatal (< 28 dias): A Abordagem de "Tolerância Zero"',
  body_html: `
<h3>O Princípio Biológico da "Tolerância Zero" no Recém-Nascido Febril</h3>
<p>No atendimento pediátrico, a presença de febre confirmada ($\ge 38,0$ ºC) em um recém-nascido com menos de 28 dias de vida é considerada uma <strong>EMERGÊNCIA MÉDICA GRAVE</strong>. Nessa faixa etária, não existe o conceito de "baixo risco clínico" que autorize a alta domiciliar ou a observação ambulatorial sem exames invasivos.</p>

<p>As razões fisiopatológicas para essa conduta categórica decorrem da profunda <strong>imaturidade imunológica do neonato</strong>:</p>
<ul>
  <li>Imaturidade da barreira hematoencefálica (altíssima permeabilidade para a passagem de bactérias periféricas diretamente para o líquor cefalorraquidiano);</li>
  <li>Diminuição fisiológica do sistema do complemento sérico e dos níveis de fibronectina (deprimindo a opsonização bacteriana);</li>
  <li>Quimiotaxia de neutrófilos e atividade bactericida fagocítica amplamente deficitárias;</li>
  <li>Incapacidade fisiológica de restringir infecções bacterianas a focos anatômicos localizados: qualquer foco menor evolui rapidamente para bacteremia generalizada e sepse neonatal;</li>
  <li>Quadro clínico frustro: o neonato séptico não apresenta rigidez de nuca clássica (a fontanela pode estar normotensa ou discretamente abaulada apenas nas fases finais), manifestando-se apenas com instabilidade térmica (frequentemente hipotermia em vez de febre!), letargia, sucção débil no seio materno, vômitos, icterícia tardia e gemência expiratória intermitente.</li>
</ul>

<h3>A Investigação Laboratorial Obrigatória: O "Screening Séptico Completo"</h3>
<p>Todo recém-nascido com $< 28$ dias com febre sem foco identificável deve ser <strong>obrigatoriamente INTERNADO EM LEITO HOSPITALAR</strong> e submetido imediatamente ao rastreamento laboratorial e liquórico exaustivo (Sepse Workup):</p>

<div class="formula-box">
  <p><strong>Protocolo Mandatório do Screening Séptico Neonatal:</strong></p>
  <ol>
    <li><strong>Hemograma Completo com Contagem de Plaquetas:</strong> Avaliação do índice neutrofílico (relação I/T - Imaturos/Totais $\ge 0,20$ sugere fortemente infecção bacteriana);</li>
    <li><strong>Provas de Fase Aguda Inflamatórias:</strong> Proteína C-Reativa (PCR) quantitativa e Procalcitonina sérica;</li>
    <li><strong>Hemocultura em Duas Amostras:</strong> Coleta com antissepsia rigorosa de sítios periféricos distintos antes de qualquer dose de antibiótico;</li>
    <li><strong>Urina Tipo 1 (EAS) e Urocultura Quantitativa:</strong> <strong>OBRIGATORIAMENTE COLETADA POR PUNÇÃO SUPRAPÚBICA (PSP) OU CATETERISMO VESICAL ALIVIADOR ESTÉRIL</strong>. <em>É terminantemente proibido o uso de saco coletor autoadesivo em neonatos!</em>;</li>
    <li><strong>Punção Lombar (PL) Diagnóstica com Análise Completa do Líquor:</strong> Citometria total e específica (pleocitose), bioquímica (glicorraquia pareada com glicemia sérica e proteinorraquia), bacterioscopia pelo Gram e cultura bacteriana quantitativa com antibiograma;</li>
    <li><strong>Radiografia de Tórax em Duas Projeções:</strong> Mesmo na ausência de sintomas respiratórios expressivos, para descartar pneumonia neonatal subclínica precoce.</li>
  </ol>
</div>

<h3>Esquema Antimicrobiano Empírico Parenteral de Escolha no Neonato</h3>
<p>Imediatamente após a conclusão das coletas de culturas biológicas (sangue, urina e líquor), <strong>inicia-se antibioticoterapia venosa empírica de amplo espectro na primeira hora</strong>:</p>

<table class="book-table">
  <thead>
    <tr>
      <th>Esquema Antimicrobiano Parenteral de Primeira Linha</th>
      <th>Doses e Posologias Neonatais Padronizadas</th>
      <th>Espectro Microbiológico Coberto no Período Neonatal</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>Ampicilina IV + Gentamicina IV</strong><br>(ou Ampicilina IV + Cefotaxima IV)</td>
      <td><strong>Ampicilina:</strong> $100$ a $200$ mg/kg/dia divididos de 6/6h ou 8/8h (na meningite neonatal, eleva-se para $200-300$ mg/kg/dia).<br><strong>Gentamicina:</strong> $4$ a $5$ mg/kg/dia em dose única diária a cada 24 horas.<br><em>(Ou Cefotaxima: $100-150$ mg/kg/dia divididos de 8/8h).</em></td>
      <td>
        <ul>
          <li><strong><em>Streptococcus agalactiae</em> (Strepto do Grupo B - GBS):</strong> Principal causador de sepse precoce e meningite, coberto pela Ampicilina;</li>
          <li><strong><em>Listeria monocytogenes</em>:</strong> Bastonete gram-positivo transmitido por via transplacentária ou canal de parto, coberto soberanamente pela Ampicilina (cefalosporinas NÃO Cobrem Listeria!);</li>
          <li><strong><em>Escherichia coli</em> e Bacilos Gram-Negativos Entéricos:</strong> Cobertos pela Gentamicina ou pela Cefotaxima.</li>
        </ul>
      </td>
    </tr>
  </tbody>
</table>

<div class="book-case">
  <h4>Atenção Máxima para a Pegadinha Fatal da Ceftriaxona no Período Neonatal:</h4>
  <p><strong>Por que a Ceftriaxona é FORMALMENTE CONTRAINDICADA em Recém-Nascidos (< 28 dias)?</strong></p>
  <ul>
    <li>1. <strong>Risco de Kernicterus (Encefalopatia Bilirrubínica):</strong> A Ceftriaxona possui altíssima afinidade de ligação pela albumina sérica, deslocando competitivamente a bilirrubina indireta. Isso faz com que a fração de bilirrubina livre tóxica no sangue se eleve agudamente, atravessando a barreira hematoencefálica e impregnando os gânglios da base cerebrais;</li>
    <li>2. <strong>Risco de Precipitação Fatal com Cálcio:</strong> A Ceftriaxona forma sais insolúveis de ceftriaxona cálcica quando infundida concomitantemente com soluções contendo cálcio (como gluconato de cálcio ou nutrição parenteral total), precipitando cristais irreversíveis na microcirculação pulmonar e renal;</li>
    <li>3. <strong>Indução de "Lama Biliar" e Colestase Química.</strong></li>
  </ul>
  <p><em>Portanto, se a banca de prova colocar como alternativa "Ceftriaxona para recém-nascido de 15 dias de vida", descarte a opção imediatamente! A cefalosporina de 3ª geração indicada no neonato é a <strong>Cefotaxima</strong>.</em></p>
</div>
`
};

export const sec4 = {
  id: 'lactentes-jovens-de-29-a-90-dias-rochester-e-boston',
  title: '4. Lactentes Jovens de 29 a 90 Dias: Critérios de Baixo Risco de Rochester, Boston e Philadelphia',
  body_html: `
<h3>O Dilema dos Lactentes de 1 a 3 Meses de Vida</h3>
<p>No intervalo etário de <strong>29 a 90 dias de vida</strong>, a fisiologia imunológica da criança encontra-se em uma fase de transição complexa: os anticorpos maternos transferidos por via transplacentária (IgG) sofrem catabolismo progressivo, enquanto a produção de imunoglobulinas endógenas e a resposta linfocitária do lactente ainda estão amadurecendo. Embora alguns desses lactentes possam apresentar infecções bacterianas graves e fulminantes, muitos apresentam apenas viroses respiratórias autolimitadas.</p>

<p>Para evitar a internação hospitalar indiscriminada e procedimentos invasivos dolorosos em crianças saudáveis, a literatura pediátrica mundial desenvolveu os consagrados <strong>Critérios de Baixo Risco</strong> (destacando-se os Critérios de Rochester, Boston e Philadelphia):</p>

<h3>Os Critérios Clássicos de Baixo Risco de Rochester (Rochester Criteria)</h3>
<p>Formulados pela Universidade de Rochester (Nova York) por Dagan e Powell, são os critérios laboratoriais e clínicos mais cobrados em concursos:</p>

<table class="book-table">
  <thead>
    <tr>
      <th>Eixo de Avaliação</th>
      <th>Critérios Obrigatórios para Ser Classificado como "BAIXO RISCO"</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>1. Critérios Clínicos de História</strong></td>
      <td>
        <ul>
          <li>Nascido a termo ($\ge 37$ semanas gestacionais) e sem complicações no parto;</li>
          <li>Sem histórico de hospitalização ou internação prévia;</li>
          <li>Sem tratamento prévio com antibióticos;</li>
          <li>Sem doenças crônicas ou de base (sem cardiopatias, neuropatias ou malformações).</li>
        </ul>
      </td>
    </tr>
    <tr>
      <td><strong>2. Critérios de Exame Físico</strong></td>
      <td>
        <ul>
          <li><strong>Bom estado geral preservado</strong>: criança ativa, alerta, corada, hidratada e responsiva;</li>
          <li>Sem qualquer sinal de toxemia sistêmica ou letargia;</li>
          <li>Ausência de qualquer foco infeccioso localizatório (ouvidos normais, tórax limpo, pele e partes moles sem celulite ou artrite).</li>
        </ul>
      </td>
    </tr>
    <tr>
      <td><strong>3. Critérios Laboratoriais Rigorosos</strong></td>
      <td>
        <ul>
          <li><strong>Leucócitos no sangue periférico:</strong> entre <strong>$5.000$ e $15.000/\text{mm}^3$</strong>;</li>
          <li><strong>Contagem de neutrófilos bastonetes (formas jovens imaturas):</strong> $< 1.500/\text{mm}^3$ (ou relação I/T $< 0,15$ a $0,20$);</li>
          <li><strong>Exame de Urina Tipo 1 (EAS):</strong> normal ($< 10$ leucócitos por campo de 400x);</li>
          <li><strong>Leucócitos fecais:</strong> $< 5$ leucócitos por campo (caso haja diarreia associada).</li>
        </ul>
      </td>
    </tr>
  </tbody>
</table>

<div class="formula-box">
  <p><strong>O Poder dos Critérios de Rochester:</strong></p>
  <p>O <strong>Valor Preditivo Negativo (VPN)</strong> dos Critérios de Rochester preenchidos na sua totalidade é de impressionantes <strong>$98,5\%$ a $99\%$</strong>! Isso significa que um lactente de 29 a 90 dias que satisfaça rigorosamente a TODOS os critérios de Rochester tem menos de 1% a 1,5% de probabilidade de apresentar uma Infecção Bacteriana Oculta.</p>
</div>

<h3>Conduta Prática e Manejo nos Lactentes de 29 a 90 Dias</h3>
<ul>
  <li><strong>Se a Criança Preenche TODOS os Critérios de Baixo Risco de Rochester:</strong>
    <ul>
      <li>Pode ser manejada <strong>ambulatorialmente em domicílio SEM ANTIBIÓTICO</strong>, desde que: (1) Os pais sejam esclarecidos e tenham telefone de contato; (2) Tenham condições de retornar imediatamente ao hospital em caso de piora; e (3) Haja <strong>retorno presencial obrigatório agendado em 24 a 48 horas</strong> para reavaliação clínica e leitura das culturas;</li>
      <li><em>Alternativa clássica de Boston:</em> Administrar uma dose profilática intramuscular de Ceftriaxona ($50$ mg/kg) no momento da alta ambulatorial e reavaliar no dia seguinte (conduta menos adotada hoje na era pós-vacinas conjugadas).</li>
    </ul>
  </li>
  <li><strong>Se a Criança NÃO PREENCHE qualquer um dos critérios de baixo risco (ALTO RISCO):</strong>
    <ul>
      <li><strong>Internação hospitalar obrigatória</strong>;</li>
      <li>Coleta de <strong>Líquor por Punção Lombar</strong>, hemoculturas e urocultura por cateterismo;</li>
      <li>Início imediato de <strong>Ceftriaxona IV ($50-75$ mg/kg/dia)</strong> ou Cefotaxima IV (associada a Ampicilina se houver suspeita de meningite por <em>Listeria</em>).</li>
    </ul>
  </li>
</ul>

<h3>A Moderna Diretriz da Academia Americana de Pediatria (AAP 2021) para 8 a 60 Dias</h3>
<p>Em diretriz histórica publicada em 2021, a AAP refinou a abordagem dos lactentes de 29 a 60 dias incorporando novos <strong>Biomarcadores Inflamatórios de Alta Sensibilidade</strong>:</p>
<ol>
  <li><strong>Procalcitonina Sérica:</strong> Considerada de baixo risco quando <strong>$< 0,5$ ng/mL</strong>;</li>
  <li><strong>Proteína C-Reativa (PCR) Quantitativa:</strong> Considerada de baixo risco quando <strong>$< 20$ mg/L</strong>;</li>
  <li><strong>Contagem Absoluta de Neutrófilos (ANC):</strong> Considerada de baixo risco quando <strong>$< 4.000/\text{mm}^3$</strong> (ou leucócitos $< 15.000/\text{mm}^3$).</li>
</ol>
<p>Na vigência de bom estado geral, urina normal e biomarcadores baixos (procalcitonina $< 0,5$ e PCR $< 20$), a diretriz da AAP autoriza a <strong>DISPENSA DA PUNÇÃO LOMBAR em lactentes entre 29 e 60 dias</strong>, mantendo apenas acompanhamento clínico vigilante ambulatorial.</p>
`
};
