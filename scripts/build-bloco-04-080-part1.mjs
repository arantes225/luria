// Bloco 4 - Aula 080: Investigação de Surtos e Epidemias (Parte 1: Seções 1 a 4)

export const sec1 = {
  id: 'conceitos-fundamentais-e-padroes-de-ocorrencia',
  title: '1. Conceitos Fundamentais: Endemia, Epidemia, Surto, Pandemia e Curvas Epidêmicas',
  body_html: `
<h3>O Espectro da Ocorrência das Doenças na População</h3>
<p>Em epidemiologia e vigilância em saúde, as doenças e agravos manifestam-se na coletividade segundo diferentes padrões espaço-temporais. A compreensão rigorosa desses padrões é a pedra fundamental para que o médico identifique prontamente variações anômalas na incidência e acione os mecanismos de resposta oportuna:</p>

<table class="book-table">
  <thead>
    <tr>
      <th>Padrão de Ocorrência</th>
      <th>Definição Operacional e Epidemiológica Rigorosa</th>
      <th>Exemplos Típicos de Aplicação Prática</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>Endemia</strong></td>
      <td>Presença contínua e habitual de uma doença ou agente infeccioso em uma determinada área geográfica ou grupo populacional, mantendo uma frequência estável e esperada ao longo de sucessivos anos (incidência dentro da faixa endêmica histórica).</td>
      <td>Malária na bacia amazônica brasileira; Doença de Chagas em regiões rurais do semiárido nordestino; Febre Amarela silvestre nos corredores florestais endêmicos.</td>
    </tr>
    <tr>
      <td><strong>Epidemia</strong></td>
      <td>Elevação nítida, inesperada e estatisticamente significativa do número de casos de uma doença ou evento em uma comunidade ou região, claramente em excesso em relação à frequência habitual e esperada para aquele período do ano e população.</td>
      <td>Epidemias sazonais de Dengue em municípios do Sudeste durante o verão; surto ampliado de Febre Chikungunya em área previamente indene.</td>
    </tr>
    <tr>
      <td><strong>Surto</strong></td>
      <td>Uma epidemia restrita a um espaço geográfico delimitado e bem circunscrito ou restrita a uma instituição/coletividade fechada (creche, escola, asilo, quartel, fábrica, festa de casamento, banquete, embarcação, hospital). <strong>Atenção para regra de ouro de concurso:</strong> a ocorrência de um <strong>ÚNICO CASO</strong> de uma doença há muito tempo erradicada ou inexistente na região (como Varíola, Poliomielite ou Febre Amarela urbana) já constitui formalmente um SURTO / EMERGÊNCIA SANITÁRIA.</td>
      <td>Surto de toxinfecção alimentar por <em>Staphylococcus aureus</em> após consumo de maionese em banquete de casamento; surto de escabiose em uma instituição de longa permanência para idosos (ILPI); 1 caso confirmado de sarampo em município com transmissão interrompida.</td>
    </tr>
    <tr>
      <td><strong>Pandemia</strong></td>
      <td>Epidemia de proporções continentais ou globais que atinge simultaneamente múltiplos países em mais de uma região da Organização Mundial da Saúde (OMS), com transmissão comunitária sustentada entre humanos em escala intercontinental.</td>
      <td>Pandemia de COVID-19 (SARS-CoV-2 a partir de 2020); Pandemia de Influenza A H1N1 em 2009; Pandemia de Cólera ao longo do século XIX e XX; Pandemia de HIV/AIDS.</td>
    </tr>
  </tbody>
</table>

<h3>A Morfologia da Curva Epidêmica (Epi Curve) e Mecanismos de Transmissão</h3>
<p>A curva epidêmica é a representação gráfica da distribuição temporal dos casos de um surto ou epidemia, construída colocando-se no eixo horizontal (eixo das abscissas - X) a data ou hora de início dos primeiros sintomas e no eixo vertical (eixo das ordenadas - Y) o número de novos casos (incidência). A análise do formato, simetria, amplitude e cauda da curva permite deduzir instantaneamente o modo de transmissão do agente, a natureza da exposição, a provável fonte e a duração da janela de incubação:</p>

<table class="book-table">
  <thead>
    <tr>
      <th>Tipo de Curva Epidêmica</th>
      <th>Características Gráficas e Morfológicas</th>
      <th>Mecanismo Fisiopatológico e Dinâmica de Exposição</th>
      <th>Exemplos Clássicos de Prova</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>1. Fonte Pontual / Fonte Comum Maciça (Point Source)</strong></td>
      <td>Curva unimodal, com subida vertiginosa (íngreme) e rápida até um pico agudo, seguida por declínio gradual mais lento (formato log-normal assimétrico). Todos os casos ocorrem dentro de um intervalo de tempo equivalente a <strong>um único período de incubação do agente infeccioso</strong>.</td>
      <td>A população suscetível foi exposta simultaneamente a um mesmo veículo ou fonte contaminada durante um período muito curto e concentrado (horas ou um único evento social). Não há transmissão secundária pessoa a pessoa.</td>
      <td>Surto de gastrenterite estafilocócica em festa de casamento (período de incubação de 2 a 6 horas); ingestão de alimento contaminado por <em>Salmonella enterica</em> em refeitório escolar; exposição a gás tóxico em vazamento industrial.</td>
    </tr>
    <tr>
      <td><strong>2. Fonte Contínua / Comum Prolongada (Continuous Common Source)</strong></td>
      <td>Curva com subida relativamente rápida, mas que atinge um platô prolongado sem um pico agudo isolado, mantendo-se elevada enquanto a fonte de contaminação permanecer ativa no ambiente. A amplitude temporal de ocorrência dos casos supera em muito o período de incubação do agente. A curva só declina quando a fonte comum é finalmente identificada e interrompida.</td>
      <td>Exposição mantida e ininterrupta ao longo de dias, semanas ou meses a uma mesma fonte contaminada permanente no ambiente.</td>
      <td>Contaminação persistente da rede pública de abastecimento de água potável por <em>Vibrio cholerae</em> (o clássico surto da Broad Street investigado por John Snow em Londres em 1854) ou por <em>Cryptosporidium</em>; poço artesiano contaminado em vilarejo rural.</td>
    </tr>
    <tr>
      <td><strong>3. Fonte Intermitente (Intermittent Common Source)</strong></td>
      <td>Curva caracterizada por múltiplos picos irregulares e desiguais, intercalados por períodos sem registro de casos.</td>
      <td>A exposição à fonte comum não é contínua nem pontual, ocorrendo de maneira esporádica e repetida em momentos específicos no tempo.</td>
      <td>Vazamento intermitente de efluentes industriais em rio utilizado para captação de água apenas nos finais de semana; lote de produto alimentício contaminado distribuído em remessas sucessivas a mercados locais.</td>
    </tr>
    <tr>
      <td><strong>4. Propagada / Progressiva / Pessoa a Pessoa (Propagated Epidemic)</strong></td>
      <td>Curva clássica com sucessivas ondas ou picos múltiplos progressivamente maiores e mais largos, separados por um intervalo correspondente ao período médio de incubação da doença. A cauda da curva é longa e prolongada.</td>
      <td>A transmissão ocorre de pessoa a pessoa (por via respiratória de gotículas/aerossóis, contato direto, via sexual ou fecal-oral) ou mediada por vetor biológico em gerações sucessivas de infectados primários, secundários e terciários. O número reprodutivo básico ($R_0$) sustenta a amplificação progressiva.</td>
      <td>Surtos comunitários de Sarampo, Varicela, Coqueluche, Influenza, Caxumba, Tuberculose em albergues e surtos urbanos de Hepatite A em escolas infantis.</td>
    </tr>
    <tr>
      <td><strong>5. Mista (Mista: Fonte Comum seguida de Propagação Secundária)</strong></td>
      <td>Inicia-se com um pico agudo típico de fonte pontual (indivíduos infectados pelo consumo inicial de água ou alimento contaminado), seguido por ondas subsequentes menores decorrentes da transmissão pessoa a pessoa entre contatos domiciliares dos casos primários.</td>
      <td>Agentes infecciosos que possuem alta capacidade de contaminação alimentar e subsequente transmissibilidade fecal-oral ou respiratória inter-humana direta.</td>
      <td>Surto de Norovírus ou <em>Shigella sonnei</em> em navio de cruzeiro (alimento contaminado deflagra o surto e o contato próximo entre passageiros propaga as infecções secundárias nas cabines); surto de Febre Tifoide.</td>
    </tr>
  </tbody>
</table>

<h3>Estimativa do Momento Provável da Exposição através da Curva Epidêmica</h3>
<p>Em um surto de fonte pontual, quando o agente infeccioso etiológico já é conhecido ou fortemente presumido, a curva epidêmica permite calcular retrospectivamente o <strong>momento exato da contaminação/exposição comum</strong>:</p>
<ol>
  <li>Identifica-se a data/hora de início dos sintomas do <strong>primeiro caso do surto</strong> e subtrai-se o <strong>período mínimo de incubação</strong> do agente;</li>
  <li>Identifica-se a data/hora de início dos sintomas do <strong>último caso do surto</strong> (ou pico) e subtrai-se o <strong>período máximo de incubação</strong> (ou mediano) do agente;</li>
  <li>O intervalo temporal sobreposto resultante dessas duas subtrações delimita a <em>janela crítica provável em que ocorreu a refeição, o evento social ou a contaminação ambiental</em>.</li>
</ol>
`
};

export const sec2 = {
  id: 'o-canal-endemico-e-diagrama-de-controle',
  title: '2. O Canal Endêmico, Diagrama de Controle e a Identificação do Limiar Epidêmico',
  body_html: `
<h3>O Conceito de Canal Endêmico e sua Finalidade na Vigilância</h3>
<p>Como a autoridade sanitária determina se o número de casos de pneumonia ou meningite observados em um município em determinado mês do ano é apenas uma flutuação sazonal esperada ou se representa o início silencioso de uma epidemia catastrófica? A resposta técnica baseia-se na construção do <strong>Diagrama de Controle</strong> (também denominado <strong>Canal Endêmico</strong> ou Corredor Endêmico).</p>

<p>O Diagrama de Controle é um instrumento estatístico de monitoramento prospectivo contínuo que estabelece a faixa de variação esperada (faixa endêmica) para uma doença em uma dada comunidade ao longo dos 12 meses do ano ou das 52 semanas epidemiológicas. Ele permite discriminar a variabilidade aleatória e sazonal de um excesso patológico de casos.</p>

<h3>Metodologia de Construção Estatística do Diagrama de Controle</h3>
<p>Para construir um canal endêmico fidedigno, o Ministério da Saúde e o CDC recomendam cumprir as seguintes etapas metodológicas:</p>
<ol>
  <li><strong>Série Histórica Mínima:</strong> Coletam-se os dados de incidência mensal ou semanal da doença nos últimos <strong>3 a 5 anos</strong> anteriores consecutivos;</li>
  <li><strong>Exclusão Obrigatória dos Anos Epidêmicos:</strong> Se em algum dos anos da série histórica ocorreu uma epidemia comprovada ou surto atípico, os dados daquele ano inteiro (ou daquele período anômalo) <strong>DEVEM SER FORMALMENTE EXCLUÍDOS DO CÁLCULO</strong>. Se os anos epidêmicos não fossem expurgados, a média histórica seria artificialmente inflacionada para cima, mascarando futuros surtos reais (baixa sensibilidade do sistema de vigilância);</li>
  <li><strong>Cálculo dos Parâmetros Centrais e de Dispersão:</strong> Para cada mês do ano, calculam-se a média aritmética ($\bar{X}$) e o desvio-padrão ($DP$) dos casos observados na série histórica expurgada (em distribuições com assimetria acentuada, utilizam-se a mediana e os quartis ou média geométrica).</li>
</ol>

<h3>As Faixas do Diagrama de Controle e Limiar Epidêmico</h3>
<table class="book-table">
  <thead>
    <tr>
      <th>Faixa / Zona do Canal Endêmico</th>
      <th>Delimitação Estatística Padronizada</th>
      <th>Interpretação Epidemiológica e Ação Sanitária</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>Zona de Sucesso (Hipoendemia)</strong></td>
      <td>Abaixo do Limite Inferior:<br>$$Casos &lt; \bar{X} - 1,96 \times DP$$ (ou abaixo do primeiro quartil $Q_1$).</td>
      <td>Incidência substancialmente abaixo da expectativa histórica. Pode indicar sucesso expressivo de programas preventivos e campanhas de vacinação, melhoria socioambiental, OU, alternativamente, grave <strong>subnotificação e desestruturação da vigilância local</strong> (exige investigação de sensibilidade).</td>
    </tr>
    <tr>
      <td><strong>Faixa Endêmica (Zona de Segurança)</strong></td>
      <td>Entre a Média Histórica e o Limite Inferior:<br>$$\bar{X} - 1,96 \times DP \le Casos \le \bar{X}$$ (ou entre $Q_1$ e a mediana).</td>
      <td>Situação epidemiológica sob pleno controle. A incidência situa-se na metade inferior dos parâmetros históricos aceitáveis. Vigilância de rotina mantida.</td>
    </tr>
    <tr>
      <td><strong>Zona de Alerta</strong></td>
      <td>Entre a Média Histórica e o Limite Superior (Limiar Epidêmico):<br>$$\bar{X} &lt; Casos \le \bar{X} + 1,96 \times DP$$ (ou entre a mediana e o terceiro quartil $Q_3$).</td>
      <td>A incidência está acima da média histórica, mas ainda não ultrapassou o teto máximo de variabilidade aleatória aceitável (não é epidemia ainda). <strong>Acende o sinal de alerta sanitário:</strong> intensificação da busca ativa, revisão de estoques de insumos, conferência da rede assistencial e investigação de clusters locais.</td>
    </tr>
    <tr>
      <td><strong>Zona Epidêmica (Epidemia Declarada)</strong></td>
      <td>Acima do Limite Superior / Limiar Epidêmico:<br>$$Casos &gt; \bar{X} + 1,96 \times DP$$ (ou acima de $Q_3$).</td>
      <td><strong>EPIDEMIA INSTALADA.</strong> A incidência superou a barreira superior estatística tolerável. A autoridade sanitária deve desencadear formalmente o plano de contingência, acionar centros de operações de emergência (COE), reforçar equipes de campo e mobilizar recursos hospitalares e laboratoriais extraordinários.</td>
    </tr>
  </tbody>
</table>
`
};

export const sec3 = {
  id: 'os-dez-passos-da-investigacao-de-campo',
  title: '3. Os Dez Passos Padronizados da Investigação de Surtos (Metodologia CDC / Ministério da Saúde)',
  body_html: `
<h3>O Roteiro Sistemático de Investigação Epidemiológica de Campo</h3>
<p>A investigação de um surto não pode ser conduzida de forma errática ou assistemática. Para garantir a fidedignidade dos dados, a segurança das inferências e a tempestividade das intervenções, o <em>Centers for Disease Control and Prevention</em> (CDC) e a Secretaria de Vigilância em Saúde e Ambiente do Ministério da Saúde (SVSA/MS) estruturaram um roteiro padronizado e universalmente consagrado em <strong>dez passos lógicos</strong>.</p>

<p>Embora apresentados de forma didática sequencial, na prática de campo muitos passos ocorrem de maneira <strong>simultânea e dinâmica</strong>. Medidas cautelares de controle imediato, por exemplo, nunca devem ser retardadas até o relatório final se houver risco grave à população.</p>

<table class="book-table">
  <thead>
    <tr>
      <th>Passo Metodológico</th>
      <th>Objetivo Primordial da Etapa</th>
      <th>Ações Práticas Executadas no Campo</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>Passo 1: Preparar o Trabalho de Campo</strong></td>
      <td>Garantir a infraestrutura operacional, científica, administrativa e de biossegurança antes do deslocamento.</td>
      <td>Revisar a literatura médica e fichas técnicas da doença presumida; reunir Equipamentos de Proteção Individual (EPIs); providenciar kits de coleta de espécimes clínicos (swabs, meios de transporte Cary-Blair ou Stuart, gelo seco, tubos com EDTA); alinhar credenciais jurídicas de inspeção com a autoridade de saúde local; estabelecer canal oficial de comunicação interinstitucional.</td>
    </tr>
    <tr>
      <td><strong>Passo 2: Confirmar a Existência do Surto / Epidemia</strong></td>
      <td>Determinar se os casos notificados representam um excesso real sobre a frequência esperada ou se decorrem de artefatos de informação.</td>
      <td>Comparar a incidência atual com a série histórica do canal endêmico. Descartar artefatos comuns: alterações recentes no fluxo de notificação, introdução de novos testes diagnósticos de alta sensibilidade na rede, chegada de novo médico hipernotificador, mudanças na definição de caso ou aumento populacional abrupto (migração, grandes eventos de massa).</td>
    </tr>
    <tr>
      <td><strong>Passo 3: Confirmar o Diagnóstico Clínico e Laboratorial</strong></td>
      <td>Garantir que a afecção sob investigação está corretamente diagnosticada e descartar erros laboratoriais.</td>
      <td>Entrevistar diretamente os primeiros pacientes e examinar prontuários médicos; verificar sinais e sintomas patognomônicos; colher amostras biológicas representativas (sangue, fezes, líquor, swab) e ambientais (água, alimentos) para encaminhamento imediato ao Laboratório Central de Saúde Pública (LACEN) ou laboratório de referência nacional (Fiocruz, Instituto Adolfo Lutz, Instituto Evandro Chagas).</td>
    </tr>
    <tr>
      <td><strong>Passo 4: Elaborar a Definição Operacional de Caso e Realizar a Busca Ativa</strong></td>
      <td>Padronizar critérios objetivos para identificar todos os indivíduos acometidos no território sem deixar de fora os casos oligossintomáticos.</td>
      <td>Construir a definição de caso baseada em 4 elementos inegociáveis: <strong>Tempo, Lugar, Pessoa e Manifestações Clínicas</strong>. Categorizar em caso Suspeito, Provável e Confirmado. Realizar busca ativa retrospectiva e prospectiva em prontuários de UPAs, UBS, hospitais privados, laboratórios, farmácias e absenteísmo escolar/laboral.</td>
    </tr>
    <tr>
      <td><strong>Passo 5: Descrever a Epidemia quanto ao Tempo, Espaço e Pessoa (Epidemiologia Descritiva)</strong></td>
      <td>Mapear a distribuição das características populacionais e traçar a linha do tempo e geografia do agravo.</td>
      <td>Construir a <strong>Curva Epidêmica</strong> (Tempo); desenhar mapas de pontos georreferenciados (<em>spot maps</em>) e taxas de ataque por bairro ou setor censitário (Espaço/Lugar); calcular taxas de ataque específicas por faixa etária, sexo, ocupação profissional e fatores de risco (Pessoa).</td>
    </tr>
    <tr>
      <td><strong>Passo 6: Formular Hipóteses Plausíveis</strong></td>
      <td>Propor explicações coerentes sobre a fonte de infecção, o veículo transmissor, o modo de contaminação e a população vulnerável.</td>
      <td>Cruzar os achados da epidemiologia descritiva com o período de incubação provável e hábitos comuns dos afetados; entrevistar informantes-chave e grupos de convivência; formular hipóteses específicas (ex.: "O consumo de salada de maionese caseira servida no almoço de domingo do restaurante X foi o veículo causal do surto de diarreia").</td>
    </tr>
    <tr>
      <td><strong>Passo 7: Testar as Hipóteses através de Estudos Analíticos</strong></td>
      <td>Submeter as hipóteses levantadas a testes epidemiológicos e estatísticos rigorosos para comprovar associação causal.</td>
      <td>Desenhar um estudo epidemiológico analítico adequado à situação:
        <ul>
          <li><strong>Estudo de Coorte Histórica / Retrospectiva:</strong> Quando a população sob risco é bem conhecida e delimitada (ex.: todos os 120 convidados de uma festa de casamento); calcula-se a Taxa de Ataque e o <strong>Risco Relativo (RR)</strong> para cada alimento/exposição;</li>
          <li><strong>Estudo de Caso-Controle:</strong> Quando a população exposta é ampla, aberta ou desconhecida (ex.: surto comunitário difuso em um município); selecionam-se casos e controles não doentes, calculando-se o <strong>Odds Ratio (OR)</strong> de exposição aos suspeitos.</li>
        </ul>
      </td>
    </tr>
    <tr>
      <td><strong>Passo 8: Refinar as Hipóteses e Conduzir Estudos Complementares</strong></td>
      <td>Aprofundar a investigação se as hipóteses iniciais forem refutadas ou inconclusivas, ou buscar mecanismos finos de contaminação.</td>
      <td>Realizar inspeção sanitária de rastreamento na cadeia de fornecedores de alimentos (<em>trace-back analysis</em>); isolamento do patógeno em sobras de comida ou amostras de água; genotipagem molecular do agente por eletroforese em gel de campo pulsado (PFGE) ou Sequenciamento de Nova Geração (NGS) para comprovar clonalidade dos isolados dos pacientes e do alimento.</td>
    </tr>
    <tr>
      <td><strong>Passo 9: Implementar Medidas de Prevenção e Controle Imediatas</strong></td>
      <td>Interromper a cadeia de transmissão e prevenir novos casos.</td>
      <td><strong>ATENÇÃO:</strong> Esta etapa é implementada assim que houver evidências operacionais suficientes, mesmo antes do encerramento formal dos estudos analíticos! Inclui: interdição sanitária de restaurantes ou cozinhas industriais; recall cautelar de lotes de alimentos ou fármacos contaminados; quimioprofilaxia de contatos íntimos; vacinação de bloqueio em até 72h; tratamento precoce dos doentes; desinfecção de redes de água e educação em saúde.</td>
    </tr>
    <tr>
      <td><strong>Passo 10: Comunicar as Conclusões e Divulgar o Relatório Final</strong></td>
      <td>Prestar contas à comunidade científica, aos gestores públicos e à população com transparência ética.</td>
      <td>Elaborar relatório epidemiológico técnico minucioso com introdução, métodos, resultados descritivos/analíticos e recomendações estruturais; redigir notas de esclarecimento à imprensa e sociedade civil evitando pânico desnecessário; implementar vigilância contínua para monitorar a cessação completa do surto.</td>
    </tr>
  </tbody>
</table>
`
};

export const sec4 = {
  id: 'definicao-de-caso-e-busca-ativa',
  title: '4. A Definição Operacional de Caso e as Estratégias de Busca Ativa em Campo',
  body_html: `
<h3>Os Quatro Componentes Inegociáveis da Definição de Caso</h3>
<p>Em uma investigação epidemiológica de campo, a <strong>definição de caso</strong> é o instrumento metodológico padronizado que estabelece com clareza absoluta quem deve e quem não deve ser contabilizado como acometido pelo evento. Uma definição de caso deficiente pode arruinar toda a investigação: se for ampla demais, incluirá falsos-positivos (indivíduos com outras afecções banais), diluindo a força de associação estatística; se for excessivamente restrita, excluirá os casos oligossintomáticos ou atípicos, subestimando o impacto real da epidemia.</p>

<p>Toda definição de caso operacional deve conter obrigatoriamente quatro dimensões:</p>
<ul>
  <li><strong>1. Critérios Clínicos:</strong> Conjunto mínimo de sinais e sintomas obrigatórios (ex.: febre $\ge 38^\circ\\text{C}$ de início súbito acompanhada de exantema maculopapular e pelo menos um sintoma respiratório entre tosse, coriza ou conjuntivite);</li>
  <li><strong>2. Critério de Tempo:</strong> Período cronológico estrito de interesse em que os sintomas devem ter se iniciado (ex.: "indivíduos com início dos sintomas entre 1º de outubro e 15 de novembro de 2026");</li>
  <li><strong>3. Critério de Espaço / Lugar:</strong> Delimitação geográfica ou institucional específica da área de risco (ex.: "residentes ou frequentadores do bairro Esperança ou alunos matriculados na Escola Municipal X");</li>
  <li><strong>4. Critério de Pessoa:</strong> Características demográficas, ocupacionais ou hábitos do grupo vulnerável (ex.: "crianças menores de 5 anos de idade" ou "trabalhadores da fábrica metalúrgica Y").</li>
</ul>

<h3>A Hierarquia Operacional das Categorias de Caso</h3>
<p>Durante a evolução da investigação no território, os indivíduos rastreados são classificados em três categorias operacionais progressivas:</p>

<table class="book-table">
  <thead>
    <tr>
      <th>Categoria Operacional</th>
      <th>Critérios de Inclusão e Nível de Certeza</th>
      <th>Função Prática na Investigação de Campo</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>Caso Suspeito (Definição Ampla e Sensível)</strong></td>
      <td>Indivíduo que preenche os critérios clínicos básicos de tempo, lugar e pessoa, sem necessidade de exames específicos ou vínculo epidemiológico comprovado.</td>
      <td><strong>Máxima Sensibilidade:</strong> Serve para "jogar a rede o mais longe possível" na busca ativa, captando rapidamente todos os potenciais doentes nos prontuários para isolamento inicial e coleta de amostras.</td>
    </tr>
    <tr>
      <td><strong>Caso Provável (Definição de Especificidade Intermediária)</strong></td>
      <td>Caso suspeito que, além do quadro clínico compatível nas coordenadas de tempo e lugar, apresenta <strong>Vínculo Epidemiológico Direto</strong> demonstrado com outro caso confirmado (contato próximo, domiciliar ou escolar) OU achados laboratoriais inespecíficos altamente sugestivos (ex.: leucopenia com plaquetopenia em arboviroses, teste rápido de antígeno preliminar reagente).</td>
      <td>Permite desencadear medidas de bloqueio no território e iniciar tratamentos específicos mesmo antes de laudos culturais definitivos de referência.</td>
    </tr>
    <tr>
      <td><strong>Caso Confirmado (Definição de Alta Especificidade)</strong></td>
      <td>Caso que possui comprovação inquestionável através de <strong>Critério Laboratorial Específico Padrão-Ouro</strong> (isolamento do agente em cultura, RT-PCR positivo, soroconversão de IgG pareada, sorologia IgM positiva validada) OU, em situações de epidemia já consolidada e ampla transmissão comunitária, por <strong>Critério Clínico-Epidemiológico rigoroso</strong> devidamente normatizado.</td>
      <td>Compõe a base de dados final consolidada para cálculo das medidas analíticas de associação, taxas de ataque finais e encerramento oficial do relatório no SINAN.</td>
    </tr>
    <tr>
      <td><strong>Caso Descartado</strong></td>
      <td>Caso suspeito inicial que, após investigação minuciosa, apresenta comprovação laboratorial negativa em amostras colhidas em tempo hábil e preservadas adequadamente, OU no qual se confirmou diagnóstico médico alternativo incompatível com o surto.</td>
      <td>Excluído do numerador do cálculo da taxa de ataque da epidemia.</td>
    </tr>
  </tbody>
</table>
`
};
