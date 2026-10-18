// Bloco 5 - Aula 115: Seção 11 de Vieses Cognitivos e Vieses em Inteligência Artificial em Saúde
export const sec11 = {
  id: 'vieses-cognitivos-do-medico-e-vieses-algoritmicos-em-saude',
  title: '11. Vieses Cognitivos na Decisão Médica, Heurísticas de Kahneman e Vieses Algorítmicos em IA',
  body_html: `
<h3>A Psicologia Cognitiva da Decisão Clínica: O Sistema 1 e o Sistema 2</h3>
<p>O raciocínio clínico e a prescrição médica não ocorrem em um vácuo puramente matemático. Conforme demonstrado pelos psicólogos Daniel Kahneman (laureado com o Prêmio Nobel de Economia em 2002) e Amos Tversky em sua monumental obra sobre tomada de decisão sob incerteza, a mente do médico opera através de dois modos fundamentais de processamento cognitivo (Teoria do Processo Dual):</p>

<ol>
  <li><strong>Sistema 1 (Rápido, Automático, Intuitivo e Inconsciente):</strong>
    <ul>
      <li>Opera com baixíssimo consumo de energia metabólica, baseado em reconhecimento imediato de padrões visuais e clínicos (ex.: bater o olho em uma criança com estridor respiratório em repouso e tiragem subcostal e diagnosticar imediatamente laringite estridulosa);</li>
      <li>Embora seja indispensável para o pronto-socorro e situações de emergência vital, o Sistema 1 é altamente suscetível a <strong>atalhos mentais imperfeitos (Heurísticas Cognitivas)</strong> que induzem a erros diagnósticos catastróficos.</li>
    </ul>
  </li>
  <li><strong>Sistema 2 (Lento, Analítico, Reflexivo, Deliberado e Lógico):</strong>
    <ul>
      <li>Exige esforço consciente, concentração focal e alto gasto energético (ex.: calcular o gradiente alvéolo-arterial de oxigênio ou ponderar a probabilidade pós-teste através do nomograma de Fagan);</li>
      <li>É o sistema acionado quando o caso clínico é atípico, refratário ou desafiador, atuando como o "auditor crítico" que fiscaliza e corrige os equívocos impulsivos do Sistema 1.</li>
    </ul>
  </li>
</ol>

<h3>Os Principais Vieses Cognitivos Médicos Cobrados em Concursos</h3>
<p>As bancas de residência médica cobram cada vez mais a identificação dos vieses cognitivos que precipitam o erro médico no ambiente hospitalar:</p>

<table class="book-table">
  <thead>
    <tr>
      <th>Viés Cognitivo do Médico</th>
      <th>Mecanismo Psicológico e Comportamental</th>
      <th>Exemplo Clínico Clássico de Erro Diagnóstico</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>Viés de Disponibilidade</strong><br>(Availability Bias)</td>
      <td>A probabilidade de um diagnóstico é superestimada simplesmente porque aquele agravo está "vívido e fresco" na memória recente do médico (ex.: atendeu um caso dramático de embolia pulmonar na noite anterior ou leu sobre febre maculosa naquela manhã).</td>
      <td>O médico atende um paciente jovem com dor torácica atípica e solicita imediatamente angiotomografia de tórax e D-dímero para TEP, ignorando diagnósticos muito mais frequentes como costocondrite ou espasmo esofagiano.</td>
    </tr>
    <tr>
      <td><strong>Viés de Ancoragem</strong><br>(Anchoring Bias)</td>
      <td>O médico fixa-se obstinadamente em uma informação ou impressão diagnóstica inicial preliminar (frequentemente trazida pelo colega que passou o plantão ou por um exame triado na porta), tornando-se incapaz de mudar de ideia mesmo diante de novos dados clínicos conflitantes.</td>
      <td>O paciente recebe a etiqueta de "crise de ansiedade e ataque de pânico" na triagem da enfermagem; mesmo apresentando sudorese fria, palidez e taquicardia progressiva, o plantonista demora 4 horas para solicitar o eletrocardiograma que revelaria infarto com supra de ST!</td>
    </tr>
    <tr>
      <td><strong>Viés de Confirmação</strong><br>(Confirmation Bias)</td>
      <td>Tendência seletiva de valorizar apenas os achados que confirmam a hipótese clínica inicial favorita do médico, enquanto exames contraditórios ou sintomas atípicos são desprezados, minimizados ou rotulados como "erros laboratoriais".</td>
      <td>O médico tem certeza de que o paciente tem febre tifoide; ao receber três hemoculturas negativas e um leucograma normal, insiste no antibiótico e alega que "o laboratório do hospital não presta".</td>
    </tr>
    <tr>
      <td><strong>Encerramento Prematuro</strong><br>(Premature Closure)</td>
      <td>Aceitação cômoda de um primeiro diagnóstico plausível, cessando precocemente qualquer busca ativa por patologias adicionais ou comorbidades concomitantes graves ("Quando o diagnóstico é feito, o cérebro do médico para de pensar").</td>
      <td>Diagnosticar hemorroida externa sangrante em um homem de 68 anos e não solicitar a colonoscopia que revelaria um adenocarcinoma obstrutivo de sigmoide sincrônico.</td>
    </tr>
  </tbody>
</table>

<h3>A Nova Fronteira: Vieses Algorítmicos em Inteligência Artificial em Saúde</h3>
<p>Com a incorporação veloz de modelos de <em>Machine Learning</em> e redes neurais profundas para triagem radiológica, predição de sepse e alocação de leitos hospitalares, a epidemiologia clínica estendeu o conceito de viés para os algoritmos de inteligência artificial:</p>

<ul>
  <li><strong>Viés de Base de Treinamento (Training Data Bias):</strong> Se um modelo preditivo de melanoma cutâneo for treinado quase exclusivamente em bancos de dados com fotografias de indivíduos caucasianos de pele clara da Europa e América do Norte, sua sensibilidade para detectar lesões acrais em pacientes pretos ou pardos será catastrófica;</li>
  <li><strong>Viés de Rótulo Histórico (Historical Labeling Bias):</strong> Se um algoritmo for treinado em prontuários eletrônicos históricos onde médicos preconceituosos prescreviam menos analgesia com opioides para minorias étnicas, o algoritmo "aprenderá" essa discriminação institucional como uma regra clínica objetiva, perpetuando a iniquidade;</li>
  <li><strong>Viés de Automatização (Automation Bias):</strong> Tendência acrítica da equipe de saúde de confiar cegamente nas recomendações e alertas emitidos pelo computador, abrindo mão do exame físico minucioso e do julgamento clínico independente à beira do leito.</li>
</ul>
`
};
