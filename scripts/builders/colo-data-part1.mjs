// scripts/builders/colo-data-part1.mjs

export const secColo1 = [
  {
    id: 'resumo-executivo-30-segundos-colo',
    title: 'Em 30 Segundos: Pontos Vitais para a Prática e Provas (Diretrizes MS/INCA 2026)',
    body_html: `
      <p>O rastreamento do câncer do colo do útero e o manejo das lesões intraepiteliais precursoras representam um dos temas com maior regularidade de cobrança em provas de residência médica e concursos no Brasil. O conhecimento estrito das <strong>Diretrizes Brasileiras para o Rastreamento do Câncer do Colo do Útero do Ministério da Saúde / INCA</strong> é mandatória:</p>
      
      <div class="clinical-box">
        <h4>Regras de Ouro do Rastreamento do Câncer do Colo Uterino:</h4>
        <ul>
          <li><strong>População-Alvo do Rastreamento:</strong> Mulheres (ou pessoas com colo do útero) na faixa etária de <strong>25 aos 64 anos</strong> que já iniciaram atividade sexual;</li>
          <li><strong>Periodicidade do Exame Citopatológico (Papanicolau):</strong> Exame <strong>anual</strong>. Após <strong>dois exames anuais consecutivos normais/negativos</strong>, a periodicidade passa a ser <strong>trienal (a cada 3 anos)</strong>;</li>
          <li><strong>Conduta no ASC-US (Atipias de Células Escamosas de Significado Indeterminado, possivelmente não neoplásicas):</strong>
            <ul>
              <li>Mulheres &ge; 30 anos: repetir citopatologia em <strong>6 meses</strong>;</li>
              <li>Mulheres de 25 a 29 anos: repetir citopatologia em <strong>12 meses</strong>;</li>
              <li>Mulheres < 25 anos (caso realizado indevidamente): manter rotina de rastreamento iniciando apenas aos <strong>25 anos</strong>;</li>
              <li>Se na repetição houver qualquer resultado alterado (&ge; ASC-US): encaminhar para <strong>colposcopia</strong>.</li>
            </ul>
          </li>
          <li><strong>Conduta na LSIL / Lesão Intraepitelial de Baixo Grau (NIC I / Efeito Citopático do HPV):</strong>
            <ul>
              <li>Mulheres &ge; 30 anos: repetir citopatologia em <strong>6 meses</strong>;</li>
              <li>Mulheres de 25 a 29 anos: repetir citopatologia em <strong>12 meses</strong>;</li>
              <li>Mulheres < 25 anos: não encaminhar para colposcopia imediata; alta taxa de clareamento espontâneo (> 80-90%);</li>
              <li>Se duas citologias consecutivas com LSIL: encaminhar para <strong>colposcopia</strong>.</li>
            </ul>
          </li>
          <li><strong>Conduta no ASC-H (Atipias de Células Escamosas não sendo possível afastar Lesão de Alto Grau):</strong>
            <ul>
              <li><strong>Colposcopia imediata</strong>, independentemente da faixa etária. Não se repete citopatologia!</li>
            </ul>
          </li>
          <li><strong>Conduta no HSIL / Lesão Intraepitelial de Alto Grau (NIC II / NIC III):</strong>
            <ul>
              <li><strong>Colposcopia imediata</strong> para todas as pacientes;</li>
              <li>Possibilidade de estratégia "Ver e Tratar" (excisão tipo 1/2 com CAF/EZPEC ambulatorial imediata se lesão de alto grau totalmente visível no ectocolo em mulher &ge; 25 anos sem suspeita de invasão).</li>
            </ul>
          </li>
          <li><strong>Conduta no AGC (Células Glandulares Atípicas / antigas AGUS):</strong>
            <ul>
              <li><strong>Colposcopia imediata com avaliação criteriosa do canal endocervical</strong> (escovado endocervical ou curetagem endocervical);</li>
              <li>Em mulheres com <strong>idade &ge; 35 anos</strong> ou com sangramento uterino anormal ou fatores de risco para neoplasia de endométrio: realizar obrigatoriamente <strong>ultrassonografia transvaginal e amostragem endometrial (histeroscopia com biópsia de endométrio)</strong>.</li>
            </ul>
          </li>
        </ul>
      </div>
    `
  },
  {
    id: 'historia-natural-hpv-oncoprotes-e6-e7',
    title: '1. História Natural da Infecção pelo HPV e Mecanismos Oncogenéticos das Oncoproteínas E6 e E7',
    body_html: `
      <h3>O Papilomavírus Humano (HPV) como Agente Etiológico Necessário</h3>
      <p>O Papilomavírus Humano (HPV) é um vírus de DNA de fita dupla circular, não envelopado, pertencente à família <em>Papillomaviridae</em>. O DNA do HPV é identificado em mais de 99% de todos os casos de carcinomas invasores do colo uterino no mundo, sendo formalmente reconhecido pela Organização Mundial da Saúde (OMS) como um <strong>fator etiológico necessário, porém não suficiente por si só</strong>, para o desenvolvimento da neoplasia maligna cervical.</p>

      <h4>Classificação dos Tipos de HPV e Potencial Oncogênico</h4>
      <ul>
        <li><strong>HPVs de Alto Risco Oncogênico:</strong> Tipos <strong>16, 18</strong>, 31, 33, 35, 39, 45, 51, 52, 56, 58, 59 e 68. Os subtipos <strong>16 e 18</strong> são responsáveis por aproximadamente <strong>70% a 75%</strong> de todos os carcinomas cervicais invasores globalmente, com o tipo 16 apresentando predileção por carcinoma epidermoide/escamoso e o tipo 18 apresentando forte associação com <em>adenocarcinomas endocervicais</em>;</li>
        <li><strong>HPVs de Baixo Risco Oncogênico:</strong> Tipos <strong>6 e 11</strong>. Não causam câncer cervical, sendo responsáveis por mais de 90% dos <strong>condilomas acuminados</strong> (verrugas anogenitais benignas) e papilomatose respiratória recorrente.</li>
      </ul>

      <h3>A Zona de Transformação e a Junção Escamocolunar (JEC)</h3>
      <p>O colo uterino é revestido externamente pelo epitélio estratificado pavimentoso não queratinizado da ectocérvice e internamente pelo epitélio colunar simples mucíparo da endocérvice. A linha de encontro entre esses dois tecidos denomina-se <strong>Junção Escamocolunar (JEC)</strong>. Ao longo da vida reprodutiva, influenciada pela acidez vaginal e pelos hormônios esteroides, a ectopia colunar sofre um processo fisiológico de diferenciação denominado <em>metaplasia escamosa</em>, originando a <strong>Zona de Transformação (ZT)</strong>. As células metaplásicas jovens e as células basais imaturas da ZT encontram-se em alta atividade proliferativa e são as células-alvo primárias para a infecção e integração viral do HPV.</p>

      <h3>Mecanismos Moleculares Oncogenéticos: O Papel das Oncoproteínas E6 e E7</h3>
      <p>Na infecção produtiva benigna (episomal), o DNA viral replica-se no núcleo celular de forma circular e independente do genoma da célula hospedeira, expressando as proteínas de capsídeo tardias (L1 e L2) e gerando o efeito citopático típico visto na citopatologia (a <strong>coilocitose</strong>: halo perinuclear claro com atipia nuclear). Todavia, na progressão neoplásica para neoplasia intraepitelial de alto grau (NIC II/III) e câncer invasor, ocorre a <strong>integração física do genoma do HPV ao DNA genômico celular</strong> do hospedeiro, interrompendo o gene viral regulador <em>E2</em>. A perda do freio exercido por E2 resulta na superexpressão desregulada e contínua de duas oncoproteínas virais precoces cruciais:</p>

      <table class="book-table">
        <thead>
          <tr>
            <th>Oncoproteína Viral</th>
            <th>Proteína Celular Alvo</th>
            <th>Mecanismo Molecular Subjacente</th>
            <th>Consequência Celular Oncogenética</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>Oncoproteína E6</strong></td>
            <td><strong>Proteína p53</strong> (o "guardião do genoma")</td>
            <td>E6 recruta a ubiquitina ligase celular E6AP (E6-Associated Protein), promovendo a marcação por ubiquitinação e subsequente <strong>degradação proteassomal da p53</strong>.</td>
            <td>Sem p53 funcional, a célula perde a capacidade de paralisar o ciclo celular na fase G1 para reparo de DNA danificado e torna-se incapaz de deflagrar apoptose em resposta a mutações genéticas, acumulando instabilidade cromossômica acelerada.</td>
          </tr>
          <tr>
            <td><strong>Oncoproteína E7</strong></td>
            <td><strong>Proteína do Retinoblastoma (pRb)</strong></td>
            <td>E7 liga-se avidamente à forma hipofosforilada da proteína pRb, provocando sua dissociação e consequente <strong>liberação constitutiva do fator de transcrição E2F</strong>.</td>
            <td>O fator E2F livre estimula a transcrição de genes essenciais para a transição descontrolada da fase G1 para a fase S do ciclo celular (síntese de DNA celular), permitindo divisão mitótica autônoma perpétua, independente de fatores de crescimento externos.</td>
          </tr>
        </tbody>
      </table>

      <div class="note-box">
        <h4>História Natural: Clareamento Viral vs Persistência</h4>
        <p>A infecção genital pelo HPV é extremamente prevalente, atingindo até 80% das mulheres sexualmente ativas em algum momento da vida. Contudo, na grande maioria (cerca de 85% a 90% dos casos), o sistema imunológico competente é capaz de promover o <strong>clareamento viral espontâneo</strong> em um período médio de 12 a 24 meses sem deixar sequelas citológicas. Apenas uma minoria de mulheres desenvolve <strong>infecção viral persistente por HPV oncogênico</strong> (especialmente tipos 16 e 18), sendo esta persistência ao longo de anos o verdadeiro pré-requisito biológico para a evolução gradual: Infecção transitória &rarr; NIC I &rarr; NIC II &rarr; NIC III &rarr; Carcinoma invasor, um processo biológico lento que costuma demandar de 10 a 20 anos.</p>
      </div>
    `
  },
  {
    id: 'diretrizes-rastreamento-inca-faixa-etaria-periodicidade',
    title: '2. Diretrizes Brasileiras de Rastreamento (Ministério da Saúde / INCA 2026)',
    body_html: `
      <h3>População-Alvo e Limites Etários</h3>
      <p>As Diretrizes Brasileiras para o Rastreamento do Câncer do Colo do Útero estabelecem critérios epidemiológicos sólidos fundamentados na história natural da neoplasia e na melhor evidência de custo-efetividade para a saúde pública:</p>

      <ul>
        <li><strong>Início do Rastreamento aos 25 Anos:</strong> Em mulheres com menos de 25 anos, a infecção pelo HPV e as lesões precursoras de baixo grau (NIC I) são altamente frequentes, porém apresentam taxa espontânea de regressão imunológica superior a 90%. Realizar exames citopatológicos nessa faixa etária gera diagnósticos falso-positivos, sobrediagnóstico, ansiedade psicológica e procedimentos excisionais iatrogênicos desnecessários no colo uterino (que aumentam o risco obstétrico futuro de incompetência istmocervical e prematuridade). Portanto, <strong>o rastreamento é formalmente desaconselhado antes dos 25 anos</strong>, mesmo em mulheres com atividade sexual precoce;</li>
        <li><strong>Término do Rastreamento aos 64 Anos:</strong> Aos 64 anos de idade, o rastreamento deve ser <strong>interrompido definitivamente</strong> caso a mulher apresente pelo menos <strong>dois exames citopatológicos negativos consecutivos realizados nos últimos 5 anos</strong>. A história natural de desenvolvimento de lesão invasora demanda mais de uma década; em mulheres com histórico rastreador negativo regular, o surgimento de novo câncer invasor em idade senil é evento raríssimo. Se a mulher nunca realizou preventivo ou tem histórico desconhecido aos 64 anos, realizam-se dois exames com intervalo de 1 ano; se ambos normais, cessa-se o seguimento.</li>
      </ul>

      <h3>Periodicidade e Intervalo Entre os Exames</h3>
      <p>O intervalo entre os exames citopatológicos deve seguir rigorosamente a regra dos exames anuais seguida de espaçamento trienal:</p>
      <div class="prescription-box">
        <h4>Cronograma Oficial do Ministério da Saúde:</h4>
        <ol>
          <li>A mulher deve realizar o exame citopatológico (Papanicolau) <strong>anualmente</strong>;</li>
          <li>Após <strong>dois exames anuais consecutivos negativos</strong> para displasia ou neoplasia maligna, o intervalo entre os exames passa a ser de <strong>3 em 3 anos (trienal)</strong>;</li>
          <li>Se a paciente apresentar novo preventivo alterado ou quebra de acompanhamento prolongado, o protocolo de investigação específico deve ser acionado.</li>
        </ol>
      </div>

      <h3>Populações Especiais e Adaptações de Conduta</h3>
      <table class="book-table">
        <thead>
          <tr>
            <th>População Especial</th>
            <th>Regra de Rastreamento Especificada</th>
            <th>Justificativa Clínica</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>Mulheres Imunossuprimidas / Vivendo com HIV</strong></td>
            <td>Iniciar o rastreamento <strong>logo após o início da atividade sexual</strong> (independentemente de ter 25 anos). Rastreamento <strong>semestral no primeiro ano</strong>; após dois resultados semestrais normais, manter seguimento <strong>anual contínuo</strong> enquanto durar a imunossupressão. Se contagem de LT-CD4+ < 200 céls/mm³, manter periodicidade semestral.</td>
            <td>Imunocomprometimento grave reduz a taxa de clareamento do HPV e acelera a progressão para lesões de alto grau e câncer invasor.</td>
          </tr>
          <tr>
            <td><strong>Gestantes</strong></td>
            <td>Seguir rigorosamente a <strong>mesma rotina e periodicidade</strong> das mulheres não gestantes (não há contraindicação para coleta citopatológica ectocervical com espátula de Ayre e endocervical cuidadosa com escova).</td>
            <td>O diagnóstico de lesões invasoras não deve ser postergado pelo ciclo gravídico.</td>
          </tr>
          <tr>
            <td><strong>Mulheres Histerectomizadas</strong></td>
            <td>Se histerectomia total por <strong>causa benigna</strong> (ex.: miomatose) e sem histórico de NIC II/III ou câncer prévio: <strong>dispensa o rastreamento citopatológico de cúpula vaginal</strong>.<br>Se histerectomia por NIC II/III prévia: manter citopatologia anual da cúpula vaginal por 5 anos antes de espaçar ou descontinuar. Se histerectomia subtotal (colo preservado): manter rotina normal dos 25 aos 64 anos.</td>
            <td>A cúpula vaginal de mulher sem colo e sem antecedente prévio de lesão neoplásica possui risco virtualmente desprezível de carcinoma de vagina.</td>
          </tr>
          <tr>
            <td><strong>Mulheres Virgens (Sem Atividade Sexual Pregressa)</strong></td>
            <td><strong>Não devem ser submetidas ao rastreamento citopatológico</strong>.</td>
            <td>Como a transmissão do HPV ocorre quase que exclusivamente por contato sexual, o risco de câncer de colo de útero em mulheres sem coito vaginal é infundado.</td>
          </tr>
        </tbody>
      </table>
    `
  }
];
