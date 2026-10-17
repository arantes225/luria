import fs from 'fs';
import path from 'path';
import { htmlToBlocks, countUsefulChars, saveBook } from './bloco-03-utils.mjs';

function appendSectionToBook(slug, sectionId, sectionTitle, htmlContent) {
  const jsonPath = path.join('apostilas', slug, 'content.json');
  const payload = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));

  payload.o = payload.o.filter(item => item[0] !== sectionId && item[0] !== 'referencias');
  payload.q = payload.q.filter(item => item[0] !== sectionId && item[0] !== 'referencias');

  payload.o.push([sectionId, sectionTitle]);
  payload.q.push([sectionId, 0, htmlToBlocks(sectionTitle, htmlContent)]);

  payload.o.push(['referencias', 'Referências Oficiais e Diretrizes']);
  payload.q.push([
    'referencias',
    0,
    [
      ['2', 'Referências Oficiais e Diretrizes'],
      [
        'o',
        [
          '<a href="https://www.gov.br/saude" target="_blank" rel="noopener noreferrer">Ministério da Saúde - Protocolos e Diretrizes Clínicas</a>',
          '<a href="https://www.conitec.gov.br" target="_blank" rel="noopener noreferrer">CONITEC - Recomendações e Diretrizes Nacionais</a>',
          '<a href="https://www.sbp.com.br" target="_blank" rel="noopener noreferrer">Sociedade Brasileira de Pediatria (SBP) / Colégio Brasileiro de Cirurgiões (CBC)</a>'
        ],
        'reference-list'
      ]
    ]
  ]);

  saveBook(payload);
}

// 1. Vigilância em Saúde: Questões comentadas de concursos recentes e ENARE/ENAMED
const q055 = `
<h3>Questões Comentadas de Concursos e Residência com Análise de Distratores</h3>
<div class="book-question">
  <h4>Questão Comentada 1: ENARE 2024 / Residência Médica — Sistemas de Informação e Mortalidade Infantil</h4>
  <p><strong>Enunciado:</strong> Durante reunião do Conselho Municipal de Saúde, o Secretário Municipal de Saúde apresenta os indicadores epidemiológicos do último ano. Observou-se uma redução no Coeficiente de Mortalidade Infantil (CMI) de 18 para 11 óbitos por mil nascidos vivos, porém com persistência de alta proporção de óbitos neonatais precoces (0 a 6 dias de vida). Para calcular fidedignamente o CMI e investigar as causas evitáveis desses óbitos neonatais, quais sistemas de informação em saúde e documentos-fonte oficiais do Ministério da Saúde devem ser obrigatoriamente vinculados (linkage)?</p>
  <p>A) SIH/SUS (AIH) e SIA/SUS (BPA).<br>
  B) SIM (Declaração de Óbito) e SINASC (Declaração de Nascido Vivo).<br>
  C) SINAN (Ficha de Investigação) e SI-PNI (Boletim de Imunização).<br>
  D) SISAB (Ficha de Atendimento Individual) e CNES (Cadastro de Estabelecimentos).</p>
  <p><strong>Gabarito Oficial: Alternativa B.</strong></p>
  <p><strong>Comentário Detalhado dos Distratores:</strong><br>
  • <strong>Alternativa B (Correta):</strong> O Coeficiente de Mortalidade Infantil (CMI) é definido como o número de óbitos em crianças menores de 1 ano de idade por mil nascidos vivos residentes no mesmo espaço geográfico e ano. O numerador provém obrigatoriamente do <strong>SIM (Sistema de Informações sobre Mortalidade)</strong> através das Declarações de Óbito (DO), enquanto o denominador é fornecido pelo <strong>SINASC (Sistema de Informações sobre Nascidos Vivos)</strong> através das Declarações de Nascido Vivo (DNV). A técnica de linkage entre esses dois bancos permite identificar fatores maternos e perinatais de risco associados aos óbitos neonatais precoces.<br>
  • <strong>Alternativa A (Incorreta):</strong> O SIH/SUS e o SIA/SUS registram dados administrativos de faturamento de internações hospitalares (AIH) e procedimentos ambulatoriais (BPA), sofrendo viés de cobertura do setor privado e subnotificação.<br>
  • <strong>Alternativa C (Incorreta):</strong> O SINAN e o SI-PNI monitoram agravos transmissíveis de notificação e imunizações, não servindo de denominador universal de nascidos vivos.<br>
  • <strong>Alternativa D (Incorreta):</strong> O SISAB/e-SUS e o CNES registram a produção da atenção primária e o cadastro físico e de recursos humanos dos estabelecimentos de saúde, sem abranger a totalidade dos óbitos.</p>
</div>

<div class="book-question">
  <h4>Questão Comentada 2: ENAMED 2025 / Medicina Preventiva — Vigilância Sanitária e Poder de Polícia</h4>
  <p><strong>Enunciado:</strong> Um auditor fiscal da Vigilância Sanitária Municipal, durante inspeção de rotina em um hospital geral privado, constata que a Central de Material e Esterilização (CME) está reprocessando produtos para saúde de uso único não passíveis de reprocessamento segundo lista da ANVISA, além de apresentar falhas críticas nos testes biológicos de autoclave. Diante da constatação de risco sanitário grave e iminente à saúde da população, qual medida administrativa cautelar deve ser adotada de imediato pelo auditor sanitário?</p>
  <p>A) Aplicar imediatamente pena de multa em valor máximo e cassar a licença de funcionamento sem direito a recurso administrativo.<br>
  B) Determinar a interdição cautelar imediata do setor de esterilização e apreensão dos materiais irregulares, lavrando o respectivo auto de infração.<br>
  C) Encaminhar representação prévia ao Ministério Público para obtenção de mandado judicial de busca e apreensão.<br>
  D) Notificar o diretor clínico concedendo prazo improrrogável de 30 dias para regularização antes de qualquer intervenção física.</p>
  <p><strong>Gabarito Oficial: Alternativa B.</strong></p>
  <p><strong>Comentário Detalhado dos Distratores:</strong><br>
  • <strong>Alternativa B (Correta):</strong> No exercício do <strong>Poder de Polícia Sanitária</strong>, a autoridade sanitária tem competência legal conferida pela Lei 6.437/1977 e Lei 8.080/1990 para aplicar medidas preventivas e acauteladoras imediatas diante de risco grave ou iminente à saúde pública. A <strong>interdição cautelar</strong> (parcial ou total) e a apreensão de produtos são atos administrativos autoexecutórios que prescindem de prévia autorização judicial e independem do término do processo administrativo sancionatório.<br>
  • <strong>Alternativa A (Incorreta):</strong> A aplicação de penalidade definitiva (como multa ou cancelamento de alvará) exige instauração de processo administrativo com garantia constitucional do contraditório e ampla defesa prévios.<br>
  • <strong>Alternativa C (Incorreta):</strong> O poder de polícia administrativa sanitária é dotado de <strong>autoexecutoriedade</strong>, não necessitando de intervenção do Poder Judiciário ou do Ministério Público para interdições emergenciais de proteção à vida.<br>
  • <strong>Alternativa D (Incorreta):</strong> Conceder prazo de 30 dias diante de risco iminente de infecção hospitalar massiva por materiais cirúrgicos contaminados configuraria prevaricação e negligência da fiscalização sanitária.</p>
</div>
`;

// 2. Trauma Torácico: Casos e Questões
const q057 = `
<h3>Questões Comentadas de Cirurgia do Trauma e Análise Crítica</h3>
<div class="book-question">
  <h4>Questão Comentada 1: USP / Colégio Brasileiro de Cirurgiões — Hemotórax Maciço e Indicação Cirúrgica</h4>
  <p><strong>Enunciado:</strong> Homem de 32 anos é admitido na sala de trauma após ferimento por projétil de arma de fogo em hemitórax esquerdo no 4º espaço intercostal na linha axilar média. Apresenta-se sudoreico, pálido, confuso, com PA: 75/40 mmHg, FC: 138 bpm e SpO2: 89%. Murmúrio vesicular abolido em todo o hemitórax esquerdo com macicez à percussão. A equipe instala imediatamente acesso venoso duplo calibroso, inicia protocolo de transfusão maciça (1:1:1) com ácido tranexâmico e realiza toracostomia com dreno tubular 32 Fr em selo d'água no 5º EIC esquerdo. No momento da inserção, observa-se a saída imediata em jato de 1.700 mL de sangue escuro pelo frasco de drenagem. Qual a conduta indicada a seguir?</p>
  <p>A) Realizar angiotomografia computadorizada de tórax para identificar o vaso sangrante antes da decisão operatória.<br>
  B) Clampar o dreno de tórax para permitir o tamponamento hidrostático pleural e aguardar resposta hemodinâmica aos hemoderivados.<br>
  C) Encaminhar o paciente imediatamente ao centro cirúrgico para toracotomia exploradora de emergência.<br>
  D) Instalar sistema de aspiração contínua a -20 cmH2O no frasco de drenagem e aguardar 4 horas de observação clínica.</p>
  <p><strong>Gabarito Oficial: Alternativa C.</strong></p>
  <p><strong>Comentário Detalhado dos Distratores:</strong><br>
  • <strong>Alternativa C (Correta):</strong> O paciente preenche o critério clássico definitivo do ATLS de <strong>Hemotórax Maciço com indicação mandatória de Toracotomia de Urgência no Centro Cirúrgico</strong>: drenagem inicial imediata &ge; 1.500 mL de sangue (ou débito contínuo &gt; 200 mL/h nas primeiras 2 a 4 horas com necessidade transfusional). A cirurgia visa hemostasia direta de lesão em vasos da parede (mamária interna, intercostais) ou estruturas hilares/cardíacas.<br>
  • <strong>Alternativa A (Incorreta):</strong> Paciente hemodinamicamente instável NÃO deve ser transportado para a tomografia computadorizada. O exame tomográfico é formalmente contraindicado nessa situação pelo altíssimo risco de parada cardiorrespiratória no tomógrafo.<br>
  • <strong>Alternativa B (Incorreta):</strong> Clampar o dreno torácico na vigência de hemorragia maciça não estanca o sangramento de artérias de alta pressão e pode transformar o quadro em um hemotórax hipertensivo com desvio mediastinal e colapso circulatório fatal.<br>
  • <strong>Alternativa D (Incorreta):</strong> A drenagem inicial já ultrapassou o limiar cirúrgico de 1.500 mL; postergar a toracotomia por 4 horas em paciente chocado culminará em exsanguinação, coagulopatia de consumo, hipotermia e óbito.</p>
</div>

<div class="book-question">
  <h4>Questão Comentada 2: UNIFESP — Tamponamento Cardíaco e Ultrassonografia eFAST</h4>
  <p><strong>Enunciado:</strong> Paciente jovem dá entrada no pronto-socorro após sofrer ferimento por arma branca na região precordial esquerda ('área de Ziedler'). Ao exame: PA 80/50 mmHg, FC 125 bpm, bulhas cardíacas hipofonéticas e turgência jugular a 45°. Durante a inspiração espontânea profunda, observa-se queda adicional de 16 mmHg na pressão arterial sistólica. O médico emergencista realiza o eFAST na sala de trauma. Qual achado ultrassonográfico confirma o diagnóstico sindrômico e qual a conduta definitiva?</p>
  <p>A) Presença de lâmina anecoica intrapericárdica com colapso diastólico do ventrículo direito; toracotomia / esternotomia cirúrgica de emergência.<br>
  B) Ausência de deslizamento pleural no ápice esquerdo; punção torácica com jelco 14G no 2º espaço intercostal.<br>
  C) Líquido livre no recesso hepatorrenal de Morison; laparotomia exploradora imediata com controle de danos.<br>
  D) Dilatação da artéria pulmonar principal sem derrame pericárdico; trombólise sistêmica imediata com alteplase.</p>
  <p><strong>Gabarito Oficial: Alternativa A.</strong></p>
  <p><strong>Comentário Detalhado dos Distratores:</strong><br>
  • <strong>Alternativa A (Correta):</strong> A clínica apresenta a clássica <strong>Tríade de Beck</strong> (hipotensão, hipofonese de bulhas e turgência jugular) associada a <strong>Pulso Paradoxal</strong> (queda da PAS &gt; 10 mmHg na inspiração), patognomônica de Tamponamento Cardíaco Agudo por ferimento em área de Ziedler (delimitada superiormente pela clavícula, medialmente pela linha paraesternal direita, inferiormente pelo rebordo costal e lateralmente pela linha axilar anterior esquerda). O ultrassom eFAST na janela subxifóidea revela lâmina anecoica (sangue no pericárdio) e colapso diastólico da parede livre do ventrículo direito. A conduta definitiva é a exploração cirúrgica imediata (esternotomia mediana ou toracotomia anterolateral esquerda) para cardiorrafia.<br>
  • <strong>Alternativa B (Incorreta):</strong> Descreve o diagnóstico e manejo do pneumotórax hipertensivo, e não do tamponamento cardíaco.<br>
  • <strong>Alternativa C (Incorreta):</strong> O recesso de Morison avalia hemoperitônio abdominal, que não justificaria a hipofonese de bulhas e o pulso paradoxal.<br>
  • <strong>Alternativa D (Incorreta):</strong> Descreve tromboembolismo pulmonar maciço, hipótese incompatível com o mecanismo de trauma penetrante na área cardíaca.</p>
</div>
`;

// 3. Diarreia Aguda: Questões e farmacologia aplicada
const q058 = `
<h3>Questões Comentadas de Pediatria e Casos de Farmacoterapia Aplicada</h3>
<div class="book-question">
  <h4>Questão Comentada 1: SBP / Prova de Título em Pediatria — Manejo do Plano B de Reidratação Oral</h4>
  <p><strong>Enunciado:</strong> Lactente de 11 meses é trazido à Unidade Básica de Saúde pela mãe devido a quadro de diarreia aquosa profusa e vômitos há 2 dias. Ao exame físico: irritado, sedento bebendo avidamente o líquido oferecido, olhos discretamente encovados, lágrimas ausentes ao choro, saliva escassa e sinal da prega cutânea desaparecendo em cerca de 1,5 segundo. Não há sinais de choque. Qual a classificação do estado de hidratação e o plano de manejo terapêutico segundo as normas do Ministério da Saúde?</p>
  <p>A) Sem desidratação (Plano A): prescrever aumento de líquidos caseiros no domicílio, zinco oral por 10 dias e retorno se piora.<br>
  B) Desidratação clínica (Plano B): administrar Solução de Sais de Reidratação Oral na unidade na dose de 50 a 100 mL/kg em 4 a 6 horas com reavaliações frequentes.<br>
  C) Desidratação grave com choque (Plano C): puncionar veia calibrosa de imediato e infundir Soro Fisiológico a 0,9% 30 mL/kg em 30 minutos.<br>
  D) Diarreia com intolerância à lactose: suspender imediatamente a amamentação e prescrever fórmula à base de proteína de soja sem lactose.</p>
  <p><strong>Gabarito Oficial: Alternativa B.</strong></p>
  <p><strong>Comentário Detalhado dos Distratores:</strong><br>
  • <strong>Alternativa B (Correta):</strong> A criança preenche pelo menos dois critérios de <strong>Desidratação Clínica / Moderada</strong> segundo a tabela do Ministério da Saúde (irritabilidade, sede ávida, olhos encovados, turgor diminuído com retorno em 1 a 2 segundos). A conduta mandatória é a aplicação do <strong>Plano B</strong> na própria unidade de saúde, ofertando SRO em pequenos volumes frequentes com colher ou copo na dose estimada de <strong>50 a 100 mL/kg em um período de 4 a 6 horas</strong>. Se houver vômitos persistentes que impeçam a ingestão oral, pode-se utilizar ondansetrona oral ou proceder à gastróclise por sonda nasogástrica. A amamentação deve ser mantida.<br>
  • <strong>Alternativa A (Incorreta):</strong> O Plano A destina-se exclusivamente a crianças sem sinais clínicos de desidratação para prevenir perdas em domicílio.<br>
  • <strong>Alternativa C (Incorreta):</strong> O Plano C reserva-se à desidratação grave com sinais de choque, letargia ou incapacidade total de ingerir líquidos.<br>
  • <strong>Alternativa D (Incorreta):</strong> O aleitamento materno NUNCA deve ser suspenso durante episódios diarreicos; fórmulas de soja não são indicadas para gastroenterite comum e podem induzir alergias.</p>
</div>

<div class="book-question">
  <h4>Questão Comentada 2: UNICAMP — Disenteria e Antibioticoterapia Racional</h4>
  <p><strong>Enunciado:</strong> Menino de 4 anos é atendido na UPA com quadro de febre de 39,2 °C, dor abdominal intensa em cólica e evacuações frequentes com presença de fezes mucossanguinolentas e tenesmo retal. A criança apresenta-se toxêmica e prostrada. O médico suspeita de disenteria bacteriana por <em>Shigella</em>. Considerando as diretrizes atuais do Ministério da Saúde e da Sociedade Brasileira de Pediatria, qual a conduta antimicrobiana de primeira linha indicada e qual fármaco é formalmente contraindicado?</p>
  <p>A) Prescrever Ciprofloxacino oral; é formalmente contraindicado o uso de Loperamida.<br>
  B) Prescrever Ampicilina oral; é formalmente contraindicada a suplementação de Zinco.<br>
  C) Prescrever Metronidazol oral; é formalmente contraindicada a reidratação com SRO.<br>
  D) Prescrever Sulfametoxazol-Trimetoprima; é formalmente contraindicado o uso de paracetamol.</p>
  <p><strong>Gabarito Oficial: Alternativa A.</strong></p>
  <p><strong>Comentário Detalhado dos Distratores:</strong><br>
  • <strong>Alternativa A (Correta):</strong> O <strong>Ciprofloxacino oral (15 mg/kg/dose a cada 12 horas por 3 dias)</strong> é o antimicrobiano de primeira escolha preconizado pela OMS, Ministério da Saúde e SBP para o tratamento da shigelose em crianças com comprometimento sistêmico (a azitromicina oral por 3 a 5 dias é excelente alternativa). A <strong>Loperamida e outros antidiarreicos inibidores da motilidade intestinal são absolutamente proscritos</strong> em pediatria, especialmente na disenteria, pois paralisam o trânsito, aumentam a absorção transmural de toxinas invasivas e elevam drasticamente o risco de perfuração colônica, bacteremia e megacólon tóxico.<br>
  • <strong>Alternativa B (Incorreta):</strong> A <em>Shigella</em> apresenta taxas mundiais e nacionais de resistência à ampicilina superiores a 70%; ademais, o sulfato de zinco é obrigatório e protetor, nunca contraindicado.<br>
  • <strong>Alternativa C (Incorreta):</strong> O metronidazol é direcionado a protozoários (como amebíase invasiva), não sendo terapia de primeira linha para shigelose comum.<br>
  • <strong>Alternativa D (Incorreta):</strong> O SMX-TMP possui elevadíssima taxa de resistência em cepas brasileiras de <em>Shigella</em>, tendo sido abandonado como primeira escolha.</p>
</div>
`;

// 4. Trauma Pélvico e Geniturinário: Questões e Algoritmo Urológico
const q067 = `
<h3>Questões Comentadas de Cirurgia do Trauma e Urologia de Emergência</h3>
<div class="book-question">
  <h4>Questão Comentada 1: ENARE 2024 / Trauma Pélvico — Fratura em Livro Aberto e Cinta Pélvica</h4>
  <p><strong>Enunciado:</strong> Pedestre de 26 anos é atropelado por caminhão em alta velocidade e dá entrada na sala de emergência imobilizado em prancha longa. Na avaliação primária: via aérea pérvia, expansibilidade torácica simétrica sem murmúrios anormais. Na etapa C: pele fria, sudoreica, tempo de enchimento capilar de 4 segundos, PA: 70/40 mmHg, FC: 135 bpm. Ao exame físico da pelve, observa-se instabilidade importante do anel com afastamento da sínfise púbica superior a 3 cm (compressão anteroposterior tipo livro aberto). Não há sangramento externo evidente em membros. Qual a primeira medida mecânica de controle de danos a ser executada imediatamente na sala de emergência para conter a hemorragia retroperitoneal?</p>
  <p>A) Encaminhar o paciente imediatamente para a sala de hemodinâmica para angioembolização pélvica.<br>
  B) Aplicar cinta pélvica ou lençol ajustado rigorosamente sobre os trocanteres maiores do fêmur.<br>
  C) Realizar tração esquelética transfemoral bilateral imediata para estabilizar a bacia.<br>
  D) Realizar palpação e compressão bimanual das cristas ilíacas repetidamente para testar a mobilidade da fratura.</p>
  <p><strong>Gabarito Oficial: Alternativa B.</strong></p>
  <p><strong>Comentário Detalhado dos Distratores:</strong><br>
  • <strong>Alternativa B (Correta):</strong> No trauma pélvico instável com choque hemorrágico, a conduta mecânica inicial prioritária e salvadora de vidas é a aplicação de <strong>cinta pélvica comercial ou lençol posicionado no nível dos trocanteres maiores</strong> (e não sobre as cristas ilíacas). Essa manobra promove o fechamento do anel pélvico, reduz o volume da cavidade retroperitoneal e restabelece a pressão de tamponamento que estanca o sangramento do volumoso plexo venoso pré-sacral e superfícies ósseas esponjadas.<br>
  • <strong>Alternativa A (Incorreta):</strong> Paciente com choque grave classe IV descompensado requer estabilização mecânica e ressuscitação volêmica hemostática balanceada na sala de emergência ou laparotomia/packing pré-peritoneal imediato antes de cogitar transporte para hemodinâmica.<br>
  • <strong>Alternativa C (Incorreta):</strong> A tração esquelética é procedimento ortopédico tardio para cisalhamento vertical, não sendo medida imediata de hemostasia na sala de emergência.<br>
  • <strong>Alternativa D (Incorreta):</strong> A palpação e manipulação repetitiva da pelve fraturada é formalmente contraindicada pelo ATLS, pois desaloja coágulos frágeis recém-formados e reativa hemorragias venosas fatais.</p>
</div>

<div class="book-question">
  <h4>Questão Comentada 2: USP / CBC — Trauma de Uretra e Conduta Proibida</h4>
  <p><strong>Enunciado:</strong> Homem de 29 anos sofre queda a cavaleiro sobre barra de ferro de andaime de construção civil. Dá entrada no pronto-atendimento queixando-se de dor perineal intensa e incapacidade de urinar, apresentando bexigoma palpável no hipogástrio. À inspeção da genitália externa, observa-se hematoma perineal volumoso em 'asa de borboleta' e presença de gota de sangue vivo exteriorizando-se pelo meato uretral externo (uretrorragia franca). Qual a conduta formalmente PROSCRITA e qual o procedimento diagnóstico inicial indicado?</p>
  <p>A) Proscrita a sondagem vesical de demora às cegas; o exame inicial obrigatório é a Uretrocistografia Retrógrada.<br>
  B) Proscrita a cistostomia suprapúbica; o exame inicial obrigatório é a Tomografia Computadorizada de Abdome com contraste venoso.<br>
  C) Proscrita a antibioticoterapia profilática; o exame inicial obrigatório é a Uretroscopia rígida imediata sob anestesia.<br>
  D) Proscrita a compressão local do períneo; o exame inicial obrigatório é a Ressonância Magnética da pelve.</p>
  <p><strong>Gabarito Oficial: Alternativa A.</strong></p>
  <p><strong>Comentário Detalhado dos Distratores:</strong><br>
  • <strong>Alternativa A (Correta):</strong> A presença de <strong>uretrorragia</strong> associada a mecanismo de queda a cavaleiro (típico de lesão de uretra bulbar anterior) ou fratura pélvica (lesão de uretra membranosa posterior) é sinal de alerta máximo para lesão de uretra. É <strong>estritamente proibido tentar introduzir sonda vesical de demora (Foley) às cegas</strong>, pois a ponta da sonda pode transformar uma laceração uretral parcial em secção total transmural, criar falsos trajetos nos tecidos moles e introduzir bactérias no hematoma. O exame padrão-ouro inicial obrigatório é a <strong>Uretrocistografia Retrógrada (UCR)</strong>. Para alívio do bexigoma na emergência, está indicada a <strong>Cistostomia Suprapúbica por punção ou cirúrgica</strong>.<br>
  • <strong>Alternativa B (Incorreta):</strong> A cistostomia suprapúbica é exatamente o procedimento seguro e indicado para desviar a urina; a TC com contraste venoso não delineia adequadamente a anatomia da uretra anterior.<br>
  • <strong>Alternativa C (Incorreta):</strong> A uretroscopia rígida em uretra lacerada recente pode provocar trauma adicional; a uretrocistografia retrógrada é o método de imagem radiológico de escolha.<br>
  • <strong>Alternativa D (Incorreta):</strong> A ressonância magnética não é exame de emergência para trauma agudo de uretra e retarda a descompressão vesical.</p>
</div>
`;

console.log('Finalizando reforço dos 4 cadernos...');
appendSectionToBook('vigilancia-em-saude', 'sec-questoes-comentadas-enare-vigilancia', 'Questões Comentadas de Concursos e Residência com Análise de Distratores', q055);
appendSectionToBook('trauma-toracico', 'sec-questoes-cirurgia-trauma-toracico', 'Questões Comentadas de Cirurgia do Trauma e Análise Crítica', q057);
appendSectionToBook('diarreia-aguda', 'sec-questoes-pediatria-diarreia-shigelose', 'Questões Comentadas de Pediatria e Casos de Farmacoterapia Aplicada', q058);
appendSectionToBook('trauma-pelvico-e-geniturinario', 'sec-questoes-trauma-pelvico-uretra-cb', 'Questões Comentadas de Cirurgia do Trauma e Urologia de Emergência', q067);
console.log('Reforço finalizado!');
