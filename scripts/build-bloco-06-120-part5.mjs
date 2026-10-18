// Bloco 6 - Aula 120: Seções 9 e 10 de Aprofundamento Metodológico em MBE
export const sec9 = {
  id: 'limiares-de-decisao-clinica-pauker-kassirer',
  title: '9. Limiares de Decisão Diagnóstica e Terapêutica: O Modelo de Pauker-Kassirer',
  body_html: `
<h3>Quando Parar de Testar e Iniciar o Tratamento? O Modelo de Limiares</h3>
<p>Em 1980, os médicos Stephen Pauker e Jerome Kassirer publicaram no <em>New England Journal of Medicine (NEJM)</em> uma obra-prima da epistemologia clínica que estabeleceu as bases quantitativas da tomada de decisão médica sob incerteza: <strong>A Teoria dos Limiares de Decisão (Threshold Model)</strong>.</p>

<p>Todo médico, ao avaliar um paciente, opera sobre um eixo contínuo de <strong>Probabilidade de Doença</strong> variando de $0\\%$ a $100\\%$. Sobre essa reta, existem <strong>dois limiares decisórios críticos</strong> determinados pela relação risco-benefício do tratamento e do teste:</p>

<ol>
  <li><strong>Limiar de Testagem (Testing Threshold / Limiar Diagnóstico Inferior - $T_t$):</strong>
    <ul>
      <li>É a probabilidade de doença abaixo da qual a suspeita clínica é tão remota e improvável que <strong>NENHUM EXAME COMPLEMENTAR DEVE SER SOLICITADO</strong>;</li>
      <li>Se a probabilidade estimada pelo médico estiver situada <strong>abaixo de $T_t$</strong>, a conduta correta é: <strong>NÃO TESTAR E NÃO TRATAR</strong> (alta médica com orientações de alarme e acompanhamento expectante);</li>
      <li>Solicitar exames abaixo desse limiar é uma iatrogenia diagnóstica que expõe o paciente a radiação desnecessária e à armadilha dos falsos-positivos.</li>
    </ul>
  </li>
  <li><strong>Zona de Testagem (Testing Zone / Intervalo de Incerteza Diagnóstica):</strong>
    <ul>
      <li>Situa-se <strong>entre o Limiar de Testagem ($T_t$) e o Limiar de Tratamento ($T_{rx}$)</strong>;</li>
      <li>É a <strong>ÚNICA FAIXA PROBABILÍSTICA ONDE A SOLICITAÇÃO DE EXAMES DIAGNÓSTICOS TEM JUSTIFICATIVA MÉDICA E ÉTICA</strong>! O resultado do teste tem o poder potencial de elevar a probabilidade acima do limiar de tratamento ou derrubá-la abaixo do limiar de descarte.</li>
    </ul>
  </li>
  <li><strong>Limiar de Tratamento (Treatment Threshold / Limiar Terapêutico Superior - $T_{rx}$):</strong>
    <ul>
      <li>É a probabilidade de doença acima da qual a certeza clínica é tão substancial que <strong>O TRATAMENTO DEVE SER IMEDIATAMENTE INICIADO, SENDO INÚTIL E DANOSO SOLICITAR EXAMES COMPLEMENTARES ADICIONAIS</strong>;</li>
      <li>Se a probabilidade estiver <strong>acima de $T_{rx}$</strong>, a conduta mandatória é: <strong>TRATAR IMEDIATAMENTE SEM PERDA DE TEMPO</strong> (ex.: paciente com dor torácica típica com supra de ST no ECG não deve aguardar dosagem de troponina para ser transferido para o cateterismo!).</li>
    </ul>
  </li>
</ol>

<table class="book-table">
  <thead>
    <tr>
      <th>Faixa de Probabilidade no Modelo de Pauker-Kassirer</th>
      <th>Status da Incerteza Clínica</th>
      <th>Conduta Médica Padrão Baseada em Evidências</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>Probabilidade $< T_t$</strong> (Abaixo do Limiar de Teste)</td>
      <td>Doença extremamente improvável; risco de falso-positivo do teste supera o benefício.</td>
      <td><strong>NÃO TESTAR E NÃO TRATAR.</strong> Observação clínica vigilante; investigar outros diagnósticos.</td>
    </tr>
    <tr>
      <td><strong>$T_t \le \text{Probabilidade} \le T_{rx}$</strong> (Zona de Teste)</td>
      <td>Incerteza clínica genuína; o resultado do exame modificará a conduta prática.</td>
      <td><strong>SOLICITAR O TESTE DIAGNÓSTICO ÍNDICE.</strong> Aguardar o resultado para reclassificar a probabilidade pós-teste.</td>
    </tr>
    <tr>
      <td><strong>Probabilidade $> T_{rx}$</strong> (Acima do Limiar de Tratamento)</td>
      <td>Certeza diagnóstica suficiente; atrasar o tratamento por causa de exame traz risco de morte.</td>
      <td><strong>INICIAR TRATAMENTO IMEDIATO.</strong> Não solicitar testes diagnósticos adicionais confirmatórios.</td>
    </tr>
  </tbody>
</table>
`
};

export const sec10 = {
  id: 'vieses-de-publicacao-e-p-hacking-na-pesquisa-clinica',
  title: '10. Fraudes Metodológicas, p-Hacking, HARKing e a Crise de Reprodutibilidade na Ciência',
  body_html: `
<h3>A Crise de Reprodutibilidade e a Epidemia de Falsos-Positivos</h3>
<p>Em 2005, o professor de epidemiologia da Universidade de Stanford <strong>John Ioannidis</strong> publicou um dos artigos mais citados da história moderna da ciência médica: <em>"Why Most Published Research Findings Are False"</em>. Nesse estudo bioestatístico, Ioannidis demonstrou matematicamente que <strong>a maioria das conclusões publicadas em revistas científicas biomédicas é falsa ou possui magnitudes de efeito infladas</strong>, decorrentes de pressões acadêmicas de produtivismo ("publicar ou perecer" - <em>publish or perish</em>), conflitos de interesse da indústria farmacêutica e práticas espúrias de manipulação de dados.</p>

<p>As três condutas metodologicamente antiéticas mais combatidas pela MBE contemporânea incluem:</p>

<ol>
  <li><strong>p-Hacking (Pescaria de Dados ou Data Dredging):</strong>
    <ul>
      <li>O pesquisador coleta um banco massivo de dados com centenas de variáveis e realiza dezenas de testes estatísticos sucessivos sem hipótese prévia fundamentada, testando combinações aleatórias até que, por puro acaso probabilístico, um valor de $p < 0,05$ apareça!;</li>
      <li><strong>A Matemática do Erro Alfa Cumulativo:</strong> Se um pesquisador realizar 20 comparações independentes com nível de significância de 5% ($\\alpha = 0,05$), a probabilidade de encontrar <strong>pelo menos um falso-positivo por pura obra do acaso é de nada menos que $1 - (1 - 0,05)^{20} \\approx \\mathbf{64,2\\%}$!</strong>;</li>
      <li>Para corrigir essa inflação artificial de significância, exige-se a aplicação de métodos de ajuste para comparações múltiplas (como a <strong>Correção de Bonferroni</strong> ou a taxa de falsas descobertas de Benjamini-Hochberg).</li>
    </ul>
  </li>
  <li><strong>HARKing (Hypothesizing After the Results are Known):</strong>
    <ul>
      <li>Prática espúria na qual o pesquisador inspeciona os dados do estudo já concluído, identifica uma associação bizarra que emergiu ao acaso e redige a introdução do artigo fingindo que aquela era a hipótese primária que ele pretendia testar desde o início.</li>
    </ul>
  </li>
  <li><strong>Relato Seletivo de Desfechos (Outcome Switching):</strong>
    <ul>
      <li>O protocolo inicial de um ensaio clínico previa como desfecho primário a "mortalidade cardiovascular". Ao término do seguimento, o fármaco não reduziu a mortalidade ($p = 0,42$; resultado negativo). Contudo, em uma análise secundária post-hoc de subgrupo, observou-se uma discreta queda na pontuação de uma escala de cansaço. Os autores reescrevem o artigo transformando a escala de cansaço no desfecho principal e omitem o fracasso na mortalidade.</li>
    </ul>
  </li>
</ol>

<div class="book-case">
  <h4>A Blindagem Obrigatória da Ciência Aberta (Open Science)</h4>
  <p>Para aniquilar o p-hacking e o HARKing, as revistas do Comitê Internacional de Editores de Revistas Médicas (ICMJE) tornaram obrigatório o <strong>Registro Prévio de Protocolo (Preregistration)</strong> em plataformas públicas (ClinicalTrials.gov / ReBEC para ensaios clínicos, PROSPERO para revisões sistemáticas) <strong>ANTES da inclusão do primeiro paciente</strong>. O protocolo público congela irrevogavelmente os desfechos primários e o plano analítico, permitindo que revisores e leitores comparem o artigo publicado contra o que foi prometido no protocolo original.</p>
</div>
`
};
