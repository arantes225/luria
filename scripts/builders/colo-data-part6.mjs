// scripts/builders/colo-data-part6.mjs

export const secColo6 = [
  {
    id: 'situacoes-especiais-gestacao-hiv-transgenero',
    title: '13. Condutas Especiais: Gestação, Vivendo com HIV/Imunossuprimidas e Homens Transgênero',
    body_html: `
      <h3>Manejo de Lesões Precursoras na Gestação</h3>
      <p>A gestação induz alterações morfológicas e anatômicas marcantes no colo uterino: aumento do fluxo sanguíneo vascular estromal, hipertrofia tecidual, eversão fisiológica acentuada da junção escamocolunar (ectopia e ZT tipo 1 proeminente) e reação decidual do estroma ectocervical (que pode simular macroscopicamente neoplasias invasoras). A conduta deve ser cautelosa:</p>

      <h4>Princípios Fundamentais na Gestante:</h4>
      <ul>
        <li><strong>A Citopatologia é Segura e Mantida:</strong> A coleta da amostra com espátula de Ayre e escova endocervical cuidadosa (girando suavemente sem aprofundar bruscamente) é totalmente segura e permitida em qualquer idade gestacional;</li>
        <li><strong>Objetivo Primário da Colposcopia na Gestação:</strong> O único objetivo formal é <strong>excluir a presença de carcinoma invasor</strong>. Se a citopatologia demonstrar ASC-H, HSIL ou AGC, a colposcopia imediata é mandatória;</li>
        <li><strong>Biópsia Cervical Restrita à Suspeita de Invasão:</strong> A biópsia é estritamente contraindicada para lesões de baixo grau ou suspeita de NIC intraepitelial pura, devido ao risco elevado de hemorragia estromal incoercível. A biópsia dirigida só é realizada se houver suspeita inequívoca de carcinoma microinvasor ou francamente invasor;</li>
        <li><strong>Contraindicação Absoluta de Avaliação do Canal e Procedimentos Excisionais:</strong> A <strong>curetagem endocervical e a conização por alça diatérmica (CAF) são formalmente proibidas durante a gravidez</strong>, pelo risco iminente de rotura de membranas, abortamento séptico, hemorragia e perda gestacional. Se confirmada NIC II ou NIC III na gestante, <strong>a conduta é puramente expectante</strong> com reavaliação colposcópica trimestral, postergando o tratamento excisional definitivo para 6 a 12 semanas após o parto.</li>
      </ul>

      <h3>Rastreamento e Condutas em Mulheres Vivendo com HIV e Imunossuprimidas</h3>
      <p>Mulheres vivendo com HIV, transplantadas de órgãos sólidos ou usuárias crônicas de imunobiológicos/imunossupressores apresentam prevalência até 5 a 10 vezes maior de infecção persistente por múltiplos subtipos de HPV de alto risco e progressão acelerada para neoplasias invasoras:</p>
      <ul>
        <li><strong>Cronograma Especial de Rastreamento:</strong> Iniciar logo após a primeira relação sexual (mesmo antes dos 25 anos). No primeiro ano, realizar <strong>citopatologia a cada 6 meses</strong>. Se ambos os exames forem normais, manter o rastreamento <strong>anual para o resto da vida</strong> (nunca espaçar para trienal);</li>
        <li><strong>Contagem de Linfócitos T-CD4+ < 200 céls/mm³:</strong> Se houver imunodeficiência grave, a periodicidade semestral deve ser mantida indefinidamente;</li>
        <li><strong>Limiar Reduzido para Colposcopia:</strong> Diante de <strong>qualquer resultado alterado (&ge; ASC-US)</strong> em mulher vivendo com HIV, o encaminhamento para <strong>colposcopia imediata é mandatório</strong> (não se aguarda repetição em 6 ou 12 meses);</li>
        <li><strong>Taxas de Recidiva Pós-Tratamento:</strong> As taxas de persistência e recidiva de NIC II/III após conização em mulheres vivendo com HIV situam-se entre 30% e 50%. Exigem vigilância semestral prolongada com citopatologia e colposcopia.</li>
      </ul>

      <h3>Atenção Integral e Rastreamento em Homens Transgênero</h3>
      <p>Homens transgênero (indivíduos designados mulher ao nascer que se identificam com o gênero masculino) que mantêm o colo do útero <strong>têm exatamente o mesmo risco biológico de câncer cervical</strong> e necessitam ser incluídos nos programas de rastreamento:</p>
      <ul>
        <li><strong>Barreiras de Acesso e Disforia:</strong> Dificuldades no atendimento e disforia de gênero durante o exame ginecológico levam a altas taxas de abandono do preventivo;</li>
        <li><strong>Impacto da Terapia com Testosterona:</strong> A androgenoterapia induz atrofia epitelial acentuada na mucosa vaginal e cervical, simulando atrofia pós-menopáusica grave. Isso frequentemente gera laudos citopatológicos falso-positivos para ASC-US ou amostras insatisfatórias por escassez celular. O uso prévio de estrogênio tópico em creme por 7 a 14 dias antes da coleta pode ser considerado para melhorar a celularidade do esfregaço;</li>
        <li><strong>Autoamostragem Molecular (Self-sampling):</strong> A oferta de autocoleta de swab vaginal para teste molecular de DNA-HPV é uma estratégia de ponta amplamente aceita que aumenta substancialmente a adesão dessa população.</li>
      </ul>
    `
  },
  {
    id: 'sintese-final-e-revisao-rapida-para-concursos',
    title: '14. Revisão Sistemática de Alto Rendimento: Tabelas de Memorização Rápida',
    body_html: `
      <h3>Tabela Resumo: O que Fazer Frente a Cada Laudo do Papanicolau</h3>
      <table class="book-table">
        <thead>
          <tr>
            <th>Resultado do Papanicolau</th>
            <th>Faixa Etária</th>
            <th>Conduta Imediata</th>
            <th>Próximo Passo / Regra Decisória</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td rowspan="2"><strong>ASC-US</strong></td>
            <td>&ge; 30 anos</td>
            <td>Repetir citologia em 6 meses</td>
            <td>Se mantiver &ge; ASC-US &rarr; Colposcopia. Se 2 normais &rarr; Rotina trienal.</td>
          </tr>
          <tr>
            <td>25 a 29 anos</td>
            <td>Repetir citologia em 12 meses</td>
            <td>Se alterado &rarr; Colposcopia. Se normal &rarr; Rotina trienal.</td>
          </tr>
          <tr>
            <td rowspan="2"><strong>LSIL / NIC I</strong></td>
            <td>&ge; 30 anos</td>
            <td>Repetir citologia em 6 meses</td>
            <td>Se mantiver &ge; ASC-US &rarr; Colposcopia. Se 2 normais &rarr; Rotina trienal.</td>
          </tr>
          <tr>
            <td>25 a 29 anos</td>
            <td>Repetir citologia em 12 meses</td>
            <td>Se persistir alterado &rarr; Colposcopia. Se normal &rarr; Rotina trienal.</td>
          </tr>
          <tr>
            <td><strong>ASC-H</strong></td>
            <td>&ge; 25 anos</td>
            <td><strong>COLPOSCOPIA IMEDIATA</strong></td>
            <td>Biópsia dirigida das áreas atípicas maiores ou conização diagnóstica.</td>
          </tr>
          <tr>
            <td><strong>HSIL / NIC II/III</strong></td>
            <td>&ge; 25 anos</td>
            <td><strong>COLPOSCOPIA IMEDIATA</strong></td>
            <td>Biópsia dirigida OU "Ver e Tratar" com CAF/EZPEC se ZT tipo 1/2 ectocervical.</td>
          </tr>
          <tr>
            <td><strong>AGC</strong></td>
            <td>&ge; 25 anos</td>
            <td><strong>COLPOSCOPIA IMEDIATA + Canal</strong></td>
            <td>Escovado endocervical. Se &ge; 35 anos ou sangramento: USG-TV + Biópsia Endometrial.</td>
          </tr>
        </tbody>
      </table>

      <h3>Mnemônicos e Pegadinhas Clássicas de Prova</h3>
      <div class="note-box">
        <h4>As 4 Pegadinhas Mais Frequentes nas Bancas:</h4>
        <ol>
          <li><strong>"Paciente de 21 anos com LSIL no preventivo":</strong> A conduta JAMAIS é colposcopia nem CAF. A conduta correta é <em>orientar e manter rastreamento aos 25 anos</em>;</li>
          <li><strong>"ASC-US em mulher de 32 anos":</strong> A resposta NÃO é colposcopia imediata. Repete-se em 6 meses. Apenas se repetir alterado é que vai para colposcopia;</li>
          <li><strong>"ASC-H em mulher de 26 anos":</strong> A conduta NÃO é repetir em 12 meses. O "H" significa "não exclui alto grau", logo exige <em>colposcopia imediata</em> sempre;</li>
          <li><strong>"Mulher vacinada contra HPV":</strong> Não muda NADA no rastreamento! Continua fazendo Papanicolau dos 25 aos 64 anos com a mesma periodicidade trienal.</li>
        </ol>
      </div>
    `
  }
];
