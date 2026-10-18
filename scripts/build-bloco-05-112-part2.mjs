// scripts/build-bloco-05-112-part2.mjs
// Aula 112: Diverticulite Aguda - Parte 2: Seções 5 a 8 (Complicada, Cirurgia, Casos e Questões)

export const sec5 = {
  id: 'manejo-diverticulite-complicada-drenagem-hartmann-seguimento',
  title: '5. Manejo da Diverticulite Complicada: Drenagem Percutânea de Abscessos, Cirurgia de Urgência e Rastreamento Pós-Agudo',
  body_html: `
<h3>Manejo Escalonado dos Abscessos Intra-abdominais (Hinchey Ib e II)</h3>
<p>A presença de abscesso intracavitário define a diverticulite aguda complicada. A conduta terapêutica é categoricamente ditada pelo <strong>diâmetro do abscesso medido na Tomografia Computadorizada</strong> e pelo acesso percutâneo seguro:</p>

<table class="book-table">
  <thead>
    <tr>
      <th>Tamanho da Coleção / Abscesso</th>
      <th>Estadiamento Tomográfico</th>
      <th>Conduta Terapêutica Primária Recomendada</th>
      <th>Mecanismo e Taxa de Resolução Clínica</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>Abscessos Pequenos (&lt; 3 a 4 cm)</strong></td>
      <td>Hinchey Ib inicial (microabscessos mesocólicos restritos)</td>
      <td><strong>Tratamento Clínico Exclusivo</strong>: Internação hospitalar, repouso digestivo com dieta líquida estrita/jejum, hidratação intravenosa e <strong>Antibioticoterapia Intravenosa de Amplo Espectro</strong> (Ceftriaxona + Metronidazol ou Piperacilina-Tazobactam) por 7 a 14 dias.</td>
      <td>A vascularização do mesocólon permite boa penetração tecidual dos antimicrobianos. Mais de <strong>80% a 85% dos abscessos $&lt; 3$ cm reabsorvem-se e cicatrizam espontaneamente</strong> sem necessidade de procedimento invasivo.</td>
    </tr>
    <tr>
      <td><strong>Abscessos Grandes ($\ge 3$ a 4 cm)</strong></td>
      <td>Hinchey Ib volumoso ou Hinchey II (Abscesso pélvico ou mesocólico acessível)</td>
      <td><strong>DRENAGEM PERCUTÂNEA GUIADA POR TOMOGRAFIA COMPUTADORIZADA (ou Ultrassom)</strong> associada a Antibioticoterapia Intravenosa contínua.</td>
      <td><strong>Padrão-ouro internacional absoluto</strong>. A drenagem percutânea esvazia a cavidade séptica, alivia a pressão local, converte uma cirurgia de urgência de altíssimo risco (que exigiria estoma definitivo) em um procedimento eletivo programado seguro de ressecção de intervalo em campo não séptico (cirurgia em tempo único sem colostomia).</td>
    </tr>
    <tr>
      <td><strong>Abscessos Grandes Inacessíveis à Drenagem Percutânea ou com Falha Clínica</strong></td>
      <td>Hinchey Ib/II interposto entre alças intestinais sem janela radiológica segura</td>
      <td>Indicação de <strong>Intervenção Cirúrgica de Urgência</strong>: ressecção cólica de emergência ou laparoscopia com lavagem e drenagem cirúrgica de coleções.</td>
      <td>Indicada também se o paciente persistir com sepse descompensada, febre alta e piora do estado geral após 48 a 72 horas da drenagem percutânea.</td>
    </tr>
  </tbody>
</table>

<h3>Indicações Formais de Intervenção Cirúrgica de Urgência (Hinchey III e IV)</h3>
<p>A cirurgia de emergência imediata é mandatória nas seguintes situações clínicas:</p>
<ol>
  <li><strong>Peritonite Generalizada Purulenta ou Fecal (Hinchey III e IV):</strong> Perfuração livre do cólon com abdome em tábua, descompressão brusca difusa e choque séptico;</li>
  <li><strong>Pneumoperitônio Maciço à Distância:</strong> Presença de grande volume de gás livre intra-abdominal sob as cúpulas diafragmáticas associado a sinais de peritonite clínica;</li>
  <li><strong>Diverticulite Complicada com Choque Séptico Refratário à Ressuscitação;</strong></li>
  <li><strong>Obstrução Intestinal Mecânica Completa do Cólon:</strong> Provocada pelo edema inflamatório circumferential ou estenose fibrótica do sigmoide bloqueado (obstrução colônica aguda em alça fechada com risco de perfuração do ceco por hiperdistensão);</li>
  <li><strong>Falha Inquestionável do Tratamento Conservador ou da Drenagem Percutânea</strong> após 48 a 72 horas com deterioração clínica.</li>
</ol>

<h3>Opções Operatórias na Urgência: Hartmann vs Ressecção Primária com Anastomose</h3>
<p>O debate entre as técnicas cirúrgicas na diverticulite perfurada evoluiu significativamente com a publicação de grandes ensaios clínicos (como os ensaios <em>DILALA</em> e <em>LADIES</em>):</p>

<table class="book-table">
  <thead>
    <tr>
      <th>Técnica Cirúrgica de Urgência</th>
      <th>Etapas Anatômicas do Procedimento</th>
      <th>Indicações Clínicas de Primeira Linha</th>
      <th>Vantagens e Desvantagens Estruturais</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>Cirurgia de Hartmann (Sigmoidectomia com Colostomia Terminal)</strong></td>
      <td><strong>Ressecção do segmento acometido do cólon sigmoide</strong>; fechamento por sutura e sepultamento do coto retal na pelve (coto retal cego à Hartmann); e exteriorização da extremidade proximal do cólon descendente como uma <strong>Colostomia Terminal na Fossa Ilíaca Esquerda</strong>.</td>
      <td><strong>O padrão-ouro absoluto em pacientes instáveis hemodinamicamente (em choque séptico sob altas doses de noradrenalina), imunossuprimidos graves e na Peritonite Fecal Maciça (Hinchey IV)</strong>.</td>
      <td>Procedimento rápido e salvador de vida; elimina o foco infeccioso sem o perigo de deiscência de anastomose em campo com peritonite grosseira. <em>Desvantagens:</em> Necessidade de uma segunda cirurgia de grande porte para reconstrução do trânsito intestinal meses depois; mais de <strong>40% a 50% dos pacientes nunca revertem a colostomia</strong> (permanecem com estoma definitivo para o resto da vida devido à idade e morbidades).</td>
    </tr>
    <tr>
      <td><strong>Ressecção Primária com Anastomose e Ileostomia de Proteção (PRA)</strong></td>
      <td>Ressecção do cólon sigmoide doente; confecção de <strong>anastomose colorretal primária imediata</strong> (mecânica ou manual) e confecção concomitante de uma <strong>ileostomia de proteção em alça</strong> (para desviar temporariamente o trânsito fecal da anastomose).</td>
      <td>Pacientes <strong>hemodinamicamente estáveis</strong> com peritonite purulenta (<strong>Hinchey III</strong>) ou Hinchey IV selecionados sem choque séptico, operados por cirurgião colorretal experiente.</td>
      <td>Evita a colostomia terminal de Hartmann; a reversão da ileostomia em alça meses depois é um procedimento muito mais simples, rápido e com menor morbidade do que a reversão de Hartmann. Aprovada formalmente pelas diretrizes da WSES e ASCRS em pacientes estáveis.</td>
    </tr>
    <tr>
      <td><strong>Lavagem e Drenagem Peritoneal Laparoscópica (Laparoscopic Lavage)</strong></td>
      <td>Laparoscopia exploradora de urgência, aspiração do pus, lavagem exaustiva da cavidade com vários litros de soro aquecido e colocação de drenos, <strong>SEM ressecar o cólon sigmoide perfurado</strong>.</td>
      <td>Técnica controversa; reservada para Hinchey III em centros selecionados. Ensaios clínicos demonstraram taxas mais elevadas de abscessos secundários e reintervenções cirúrgicas precoces em comparação com a ressecção primária.</td>
    </tr>
  </tbody>
</table>

<h3>A Regra Obrigatória do Seguimento Pós-Agudo: A Colonoscopia após 6 a 8 Semanas</h3>
<p>Após a resolução clínica completa do episódio agudo de diverticulite (tratada clínica ou cirurgicamente), a conduta médica <strong>NÃO ESTÁ ENCERRADA</strong>:</p>
<div class="formula-box">
  <p><strong>RASTREAMENTO OBRIGATÓRIO DE CÂNCER COLORRETAL:</strong></p>
  <p>Todo paciente que se recupera de um episódio de diverticulite aguda (especialmente se complicada ou se não realizou colonoscopia nos últimos 1 a 2 anos) deve ser submetido formalmente a uma <strong>COLONOSCOPIA TOTAL após 6 a 8 semanas da resolução da crise</strong>.</p>
  <p><strong>Fundamentação Oncológica e Diagnóstica:</strong></p>
  <ul>
    <li>O <strong>Adenocarcinoma de Cólon Obstrutivo ou Perfurado</strong> pode se manifestar tomograficamente e clinicamente de forma rigorosamente idêntica à diverticulite aguda (espessamento parietal circunferencial do sigmoide com borramento da gordura pericólica e microperfuração);</li>
    <li>Em pacientes com diverticulite complicada tratada clinicamente, a incidência de adenocarcinoma colorretal oculto subjacente ou pólipos adenomatosos avançados atinge <strong>8% a 11%</strong> (quase 1 em cada 10 pacientes);</li>
    <li>Aguardar 6 a 8 semanas permite a cicatrização completa do processo inflamatório transmural, tornando a realização da colonoscopia segura e minimizando o risco de perfuração mecânica iatrogênica durante o exame.</li>
  </ul>
</div>

<h3>Indicações Contemporâneas para Colectomia Eletiva de Intervalo</h3>
<p>O antigo dogma cirúrgico de indicar colectomia eletiva profilática para todo paciente após dois episódios de diverticulite aguda não complicada foi completamente abandonado pela ASCRS e WSES. A indicação cirúrgica eletiva é atualmente <strong>individualizada</strong>:</p>
<ol>
  <li><strong>Episódio Prévio de Diverticulite Complicada Tratada Conservadoramente:</strong> Pacientes que apresentaram abscesso pélvico volumoso drenado por via percutânea (Hinchey Ib/II) possuem risco de recidiva superior a 40% a 50%, recomendando-se ressecção eletiva do sigmoide (sigmoidectomia laparoscópica com anastomose primária) após 3 a 6 meses;</li>
  <li><strong>Presença de Fístulas Crônicas Estabelecidas:</strong>
    <ul>
      <li><em>Fístula Colovesical (a mais comum, 65% das fístulas):</em> Ocorre mais em homens e mulheres histerectomizadas (nas quais o útero não está presente para interpor-se como barreira anatômica entre o sigmoide e a bexiga). Manifesta-se clinicamente pela tríade patognomônica de <strong>Pneumatúria</strong> (eliminação de ar na urina com urina borbulhante), <strong>Fecalúria</strong> (fezes na urina) e infecções urinárias de repetição polimicrobianas por flora entérica. Exame mais sensível: TC com contraste oral/retal (presença de ar na bexiga na ausência de cateterismo vesical prévio);</li>
      <li><em>Fístula Colovaginal (em mulheres histerectomizadas):</em> Eliminação de fezes e gases pela vagina;</li>
    </ul>
  </li>
  <li><strong>Estenose Cólica Fibrótica com Obstrução Parcial Recorrente:</strong> Pacientes com suboclusão crônica do sigmoide;</li>
  <li><strong>Pacientes Imunossuprimidos Crônicos:</strong> Transplantados e pacientes sob quimioterapia que sofrem um primeiro episódio têm altíssimo risco de perfuração livre letal na recidiva, justificando cirurgia eletiva após o primeiro episódio;</li>
  <li><strong>Impacto Negativo Severo e Intratável na Qualidade de Vida</strong> por episódios frequentes de recidiva não complicada.</li>
</ol>
`
};

export const sec6 = {
  id: 'casos-clinicos-estruturados-diverticulite',
  title: '6. Casos Clínicos Estruturados e Raciocínio Diagnóstico-Cirúrgico Passo a Passo',
  body_html: `
<h3>Caso Clínico 1: Dor na FIE, Febre e Abscesso Pericólico Volumoso</h3>
<div class="book-case">
  <p><strong>Identificação:</strong> Homem de 61 anos, hipertenso, obeso (IMC 33 kg/m²), procura a emergência cirúrgica queixando-se de dor contínua de intensidade progressiva na Fossa Ilíaca Esquerda há 5 dias, associada a febre diária de até 38,7 ºC e parada de eliminação de fezes há 48 horas.</p>
  <p><strong>Exame Físico:</strong> REG, febril (T 38,4 ºC), taquicárdico (FC 102 bpm), PA 125/80 mmHg. Abdome distendido em andar inferior; palpação extremamente dolorosa na FIE, com presença de <strong>massa palpável mal delimitada e dolorosa (plastrão)</strong>, com descompressão brusca duvidosa restrita à FIE. Ausência de dor ou descompressão nos demais quadrantes abdominais.</p>
  <p><strong>Laboratório:</strong> Leucócitos: 16.800/mm³ com 8% de bastonetes (desvio à esquerda significativo); Proteína C Reativa (PCR): 185 mg/L; Creatinina: 1,0 mg/dL.</p>
  <p><strong>Tomografia Computadorizada de Abdome e Pelve com Contraste IV:</strong> Evidencia múltiplos divertículos no cólon sigmoide, espessamento parietal circunferencial acentuado da parede do sigmoide (8 mm), densificação densa da gordura pericólica e uma <strong>coleção líquida organizada com realce anelar periférico pelo meio de contraste medindo 5,2 cm de maior diâmetro no mesocólon adjacente</strong>, contendo pequenos focos de gás intraluminal. Ausência de pneumoperitônio livre ou líquido livre nos demais recessos peritoneais.</p>
  <p><strong>Discussão Diagnóstica e Conduta Terapêutica Estruturada:</strong></p>
  <ul>
    <li><em>Diagnóstico e Estadiamento:</em> <strong>Diverticulite Aguda Complicada com Grande Abscesso Mesocólico / Pericólico (Classificação de Hinchey Modificada Estágio Ib)</strong>;</li>
    <li><em>Decisão Clínica vs Intervencionista:</em>
      <ul>
        <li>O paciente apresenta um abscesso de <strong>5,2 cm (claramente $\ge 4$ cm)</strong> em paciente hospitalizado com resposta inflamatória sistêmica franca;</li>
        <li>O tratamento puramente clínico com antibióticos isolados em abscessos $\ge 4$ cm associa-se a taxa de falha superior a 50%, com risco de rotura secundária para o peritônio;</li>
        <li>Indicação imediata de cirurgia laparotômica de urgência seria excessivamente invasiva e culminaria com alta probabilidade em sigmoidectomia à Hartmann com colostomia definitiva;</li>
      </ul>
    </li>
    <li><em>Conduta Terapêutica Padrão-Ouro:</em>
      <ol>
        <li>Internação hospitalar e jejum oral inicial;</li>
        <li>Antibioticoterapia intravenosa de amplo espectro imediata: <strong>Ceftriaxona 2 g IV 1x/dia + Metronidazol 500 mg IV a cada 8 horas</strong>;</li>
        <li><strong>DRENAGEM PERCUTÂNEA GUIADA POR TOMOGRAFIA COMPUTADORIZADA COM INSERÇÃO DE CATETER DE PIGTAIL</strong>: Procedimento minimamente invasivo que drena o pus, descomprime o foco infeccioso e promove defervescência clínica rápida em 24 a 48 horas;</li>
        <li>Manter dreno até débito seroso mínimo ($< 10-15$ mL/dia) e resolução tomográfica;</li>
        <li>Após alta hospitalar, agendar <strong>Colonoscopia total após 6 a 8 semanas</strong> para excluir neoplasia colorretal oculta;</li>
        <li>Encaminhar para <strong>sigmoidectomia eletiva laparoscópica de intervalo</strong> com anastomose primária após 2 a 3 meses.</li>
      </ol>
    </li>
  </ul>
</div>

<h3>Caso Clínico 2: Peritonite Fecal e Choque Séptico (Indicação de Hartmann)</h3>
<div class="book-case">
  <p><strong>Identificação:</strong> Mulher de 73 anos, portadora de artrite reumatoide em uso crônico de Prednisona 20 mg/dia há 5 anos, é admitida na sala de emergência em estado crítico, com quadro de dor abdominal difusa súbita de início há 12 horas que se iniciou na FIE e generalizou-se por todo o abdome.</p>
  <p><strong>Exame Físico:</strong> Paciente torporosa, sudoreica, taquipneica (FR 32 irpm com uso de musculatura acessória), extremidades frias com tempo de enchimento capilar de 5 segundos. FC 136 bpm, <strong>PA 70/40 mmHg (PAM 50 mmHg)</strong>, febril (T 39,1 ºC). Abdome difusamente distendido, <strong>em tábua (hipertonia involuntária generalizada)</strong>, com descompressão brusca dolorosa intensamente positiva em todos os quatro quadrantes abdominais (Sinal de Blumberg generalizado). Ruídos hidroaéreos completamente abolidos.</p>
  <p><strong>Laboratório e Imagem:</strong> Gasometria arterial: pH 7,18, pO2 62 mmHg, pCO2 28 mmHg, HCO3- 10 mEq/L, Lactato 5,8 mmol/L (acidose metabólica lática grave com hiperlactatemia). TC de abdome rápida: <strong>volumoso pneumoperitônio livre sob as duas cúpulas diafragmáticas</strong>, grande quantidade de líquido livre com densidade de exsudato em toda a cavidade peritoneal e cólon sigmoide com espessamento parietal e solução de descontinuidade da parede (perfuração cólica macroscópica livre).</p>
  <p><strong>Discussão e Conduta Cirúrgica de Emergência:</strong></p>
  <ul>
    <li><em>Diagnóstico e Gravidade:</em> <strong>Diverticulite Aguda Complicada Perfurada com Peritonite Generalizada e Choque Séptico Refratário (Classificação de Hinchey Estágio IV / Peritonite Fecal)</strong> em paciente imunossuprimida por corticoterapia crônica;</li>
    <li><em>Ressuscitação Hemodinâmica Imediata ("Golden Hour"):</em>
      <ol>
        <li>Intubação orotraqueal e ventilação mecânica protetora;</li>
        <li>Acesso venoso central e início imediato de <strong>Noradrenalina em infusão contínua</strong> visando PAM $\ge 65$ mmHg;</li>
        <li>Ressuscitação com cristaloide balanceado (Ringer Lactato);</li>
        <li>Antibioticoterapia empírica imediata de amplo espectro na primeira hora: <strong>Piperacilina-Tazobactam 4,5 g IV</strong> associada a Vancomicina;</li>
      </ol>
    </li>
    <li><em>Tratamento Cirúrgico Imediato:</em>
      <ul>
        <li><strong>Laparotomia Exploradora Mediana de Urgência Imediata</strong>;</li>
        <li>Lavagem exaustiva da cavidade peritoneal com mais de 10 litros de solução salina isotônica morna para remoção completa de fezes e pus;</li>
        <li><strong>Procedimento Cirúrgico de Escolha: CIRURGIA DE HARTMANN (Sigmoidectomia com Colostomia Terminal em FIE e Fechamento/Sepultamento do Coto Retal)</strong>;</li>
        <li><em>Por que NÃO fazer anastomose primária?</em> A paciente está em <strong>choque séptico sob altas doses de noradrenalina</strong>, possui acidose metabólica severa ($pH = 7,18$), é imunossuprimida crônica por corticoide e apresenta peritonite fecal com contaminação grosseira. Qualquer tentativa de anastomose colorretal primária neste cenário teria taxa de deiscência catastrófica superior a 60% com morte da paciente. A prioridade absoluta é o controle do foco com mínima morbidade cirúrgica imediata (cirurgia de controle de danos / salvamento de vida).</li>
      </ul>
    </li>
  </ul>
</div>

<h3>Caso Clínico 3: Pneumatúria e Fecalúria: O Rastreio da Fístula Colovesical</h3>
<div class="book-case">
  <p><strong>Identificação:</strong> Homem de 66 anos comparece ao ambulatório de coloproctologia referindo que teve dois episódios de dor na FIE tratados como infecção intestinal nos últimos 8 meses. Há 3 semanas, começou a perceber a <strong>eliminação de ar na urina ("urina borbulhante e com chiado ao final da micção")</strong> e saída de pequenas partículas escuras com odor fecalóide pelo meato uretral. Relata múltiplos episódios de disúria e urina turva no período, tratados repetidamente como ITU com antibióticos.</p>
  <p><strong>Exame Físico:</strong> Bom estado geral, eupnéico, afebril. Abdome flácido, indolor à palpação, sem visceromegalias ou massas palpáveis. Toque retal: próstata de tamanho normal e indolor; ausência de massas intraluminais.</p>
  <p><strong>Exames Complementares:</strong> EAS: incontáveis leucócitos por campo, presença de bactérias polimicrobianas e debris vegetais amorfos microscópicos. Urocultura: crescimento polimicrobiano com $&gt; 100.000$ UFC/mL de <em>Escherichia coli</em> associada a <em>Klebsiella pneumoniae</em> e <em>Enterococcus faecalis</em>.</p>
  <p><strong>Discussão e Raciocínio Clínico:</strong></p>
  <ul>
    <li><em>Sinais Patognomônicos:</em> O paciente descreve a clássica associação de <strong>Pneumatúria</strong> (passagem de ar durante a micção) e <strong>Fecalúria</strong> (passagem de material fecalóide na urina), que constituem sinais patognomônicos de <strong>FÍSTULA COLOVESICAL</strong>;</li>
    <li><em>Etiologia Principal:</em> A diverticulite aguda do cólon sigmoide responde por mais de <strong>65% a 70% de todas as fístulas colovesicais</strong> no adulto (muito mais frequente que câncer colorretal ou doença de Crohn);</li>
    <li><em>Exame Propedêutico de Escolha:</em> <strong>Tomografia Computadorizada de Abdome e Pelve com Contraste Oral e Intravenoso (SEM contraste retal ou vesical inicial)</strong>: o achado tomográfico cardinal é a presença de <strong>ar no interior da bexiga urinária (gás intravesical)</strong> em paciente que não passou por cateterismo vesical recente, associado a espessamento da parede vesical adjacente à massa diverticular do sigmoide aderida;</li>
    <li><em>Tratamento Definitivo:</em> O tratamento é cirúrgico eletivo após preparo: <strong>Sigmoidectomia com ressecção do trajeto fistuloso, desbridamento da parede vesical comprometida com sutura primária da bexiga em plano duplo</strong>, interposição de grande omento entre o cólon e a bexiga para prevenir recidivas, e anastomose colorretal primária, mantendo cateter vesical de demora por 7 a 14 dias para permitir descompressão e cicatrização da bexiga.</li>
  </ul>
</div>
`
};

export const sec7 = {
  id: 'questoes-concurso-comentadas-diverticulite',
  title: '7. Questões de Concursos de Residência Médica e Título de Cirurgia Geral Comentadas Passo a Passo',
  body_html: `
<h3>Questão 1 (USP-SP / Residência Médica)</h3>
<p>Homem de 58 anos é admitido no pronto-socorro com queixa de dor na fossa ilíaca esquerda há 3 dias, febrícula (37,9 ºC) e constipação. Ao exame físico, apresenta-se em bom estado geral, hidratado, com abdome plano, doloroso à palpação na FIE, com leve defesa muscular voluntária e sinal de Blumberg duvidoso localizado restrito à FIE. Leucograma revela 11.200 leucócitos/mm³ e PCR de 38 mg/L. A Tomografia Computadorizada de abdome e pelve com contraste intravenoso demonstra espessamento parietal do cólon sigmoide (5 mm) com borramento da gordura pericólica, sem coleções líquidas, sem ar extraluminal e sem pneumoperitônio livre (Classificação de Hinchey 0). Com base nas diretrizes internacionais contemporâneas (WSES / AGA), qual é a conduta médica correta?</p>

<ol type="A">
  <li>Indicar colonoscopia de urgência nas primeiras 24 horas para visualização direta do orifício diverticular e hemostasia endoscópica profilática.</li>
  <li>Internação hospitalar imediata em leito cirúrgico e laparotomia exploradora com sigmoidectomia à Hartmann devido ao risco iminente de deiscência colônica.</li>
  <li>Tratamento ambulatorial com repouso, dieta leve líquida e analgesia com analgésicos comuns (dipirona/paracetamol), sendo o uso sistemático de antibióticos dispensável neste momento para paciente imunocompetente sem sepse.</li>
  <li>Prescrição obrigatória de antibioticoterapia intravenosa com ciprofloxacino e metronidazol por 21 dias em regime de internação hospitalar mandatória.</li>
</ol>

<p><strong>Gabarito Oficial: Alternativa C.</strong></p>
<p><strong>Comentário Editorial Detalhado:</strong> Grandes ensaios clínicos randomizados multicêntricos contemporâneos (ensaios AVOD e DIABOLO) provaram que em pacientes imunocompetentes com diverticulite aguda não complicada leve (Hinchey 0) comprovada por TC, o uso rotineiro de antibióticos não acelera a melhora da dor nem reduz complicações ou recidivas. As diretrizes da WSES e AGA recomendam <strong>tratamento sintomático ambulatorial com dieta líquida/branda e analgesia</strong>, reservando antibióticos para imunossuprimidos, gestantes, pacientes com sinais de sepse/SIRS ou PCR $> 140$ mg/L (Alternativa C correta). Colonoscopia na fase aguda é <strong>formalmente contraindicada</strong> (risco de perfuração livre - elimina A). Cirurgia de Hartmann é conduta para peritonite fecal Hinchey IV (elimina B).</p>

<hr>

<h3>Questão 2 (ENAMED / Revalidação e Residência Médica)</h3>
<p>Mulher de 64 anos, com quadro de diverticulite aguda há 6 dias tratada em domicílio de forma irregular, procura a emergência com piora da dor na fossa ilíaca esquerda e febre alta diária. A Tomografia Computadorizada de abdome total com contraste IV revela diverticulite de sigmoide associada a uma <strong>coleção líquida hipodensa organizada com realce periférico parietal medindo 5,5 cm no maior eixo</strong>, localizada no mesocólon e adjacente à parede anterior do abdome (Hinchey Ib volumoso). A paciente encontra-se estável hemodinamicamente, lúcida, afebril no momento e com abdome doloroso na FIE sem sinais de peritonite difusa. Qual é a conduta padrão-ouro preconizada para esta paciente?</p>

<ol type="A">
  <li>Drenagem percutânea da coleção guiada por Tomografia Computadorizada associada à antibioticoterapia intravenosa de amplo espectro.</li>
  <li>Manter tratamento ambulatorial exclusivo apenas dobrando a dose de antibiótico oral, visto que coleções menores de 10 cm não demandam intervenção.</li>
  <li>Encaminhar imediatamente para realização de colonoscopia descompressiva para drenar o abscesso através do lúmen intestinal.</li>
  <li>Laparotomia exploradora de emergência para realização de colectomia total com anastomose ileorretal primária sem estoma.</li>
</ol>

<p><strong>Gabarito Oficial: Alternativa A.</strong></p>
<p><strong>Comentário Editorial Detalhado:</strong> As diretrizes internacionais estabelecem o corte de <strong>3 a 4 cm</strong> para a conduta em abscessos diverticulares:
- Abscessos pequenos ($&lt; 3$ a 4 cm): Tratamento exclusivamente clínico com internação e antibioticoterapia venosa (reabsorção espontânea $> 80\%$);
- Abscessos volumosos ($\ge 3$ a 4 cm): <strong>DRENAGEM PERCUTÂNEA GUIADA POR TC</strong> associada a antibióticos venosos (Alternativa A correta). A drenagem percutânea evita laparotomia de urgência com estoma, controla a sepse e permite realizar posteriormente ressecção eletiva de intervalo em tempo único sem colostomia.</p>

<hr>

<h3>Questão 3 (SURCE - Seleção Unificada para Residência Médica do Ceará)</h3>
<p>Homem de 70 anos é levado ao pronto-socorro com quadro de choque séptico, hipotensão refratária a volume necessitando de noradrenalina em altas doses, taquipneico e confuso. O exame físico revela abdome tenso, difusamente doloroso com contratura involuntária e rigidez generalizada (abdome em tábua). A tomografia computadorizada confirma perfuração livre de divertículo de sigmoide com fezes na grande cavidade peritoneal (Hinchey IV). Qual é o procedimento cirúrgico clássico mais indicado para este paciente?</p>

<ol type="A">
  <li>Laparoscopia diagnóstica com lavagem peritoneal isolada e manutenção do segmento cólico perfurado in situ.</li>
  <li>Cirurgia de Hartmann (sigmoidectomia com colostomia terminal em fossa ilíaca esquerda e sepultamento do coto retal).</li>
  <li>Colectomia total com anastomose ileorretal primária sem ileostomia de proteção.</li>
  <li>Colocação de prótese metálica autoexpansível por colonoscopia para ocluir a perfuração cólica.</li>
</ol>

<p><strong>Gabarito Oficial: Alternativa B.</strong></p>
<p><strong>Comentário Editorial Detalhado:</strong> No paciente com <strong>Diverticulite Hinchey IV (Peritonite Fecal Generalizada)</strong> associada a <strong>choque séptico e instabilidade hemodinâmica grave</strong>, o procedimento salvador de vida padrão-ouro indiscutível é a <strong>Cirurgia de Hartmann</strong> (Alternativa B). A anastomose primária está formalmente contraindicada pelo risco extremo de deiscência em paciente chocado sob drogas vasoativas e acidose metabólica. A lavagem isolada sem ressecção (Alternativa A) é ineficaz e proscrita na peritonite fecal.</p>

<hr>

<h3>Questão 4 (UNICAMP - Universidade Estadual de Campinas)</h3>
<p>Homem de 62 anos recuperou-se com sucesso de um quadro de diverticulite aguda de cólon sigmoide não complicada há 7 semanas, tendo recebido alta hospitalar com resolução completa dos sintomas e exames inflamatórios normais. Qual conduta é formalmente recomendada no acompanhamento pós-agudo deste paciente e qual a sua justificativa médica primordial?</p>

<ol type="A">
  <li>Prescrever enema baritado semanal para prevenir a formação de novos pseudodivertículos no reto.</li>
  <li>Indicar colonoscopia total entre 6 e 8 semanas após a resolução do quadro agudo para descartar formalmente a presença de adenocarcinoma colorretal subjacente que pode mimetizar o quadro tomográfico e clínico de diverticulite.</li>
  <li>Indicar sigmoidectomia laparoscópica profilática mandatória imediata para todos os pacientes após o primeiro episódio para evitar recidivas.</li>
  <li>Proibir terminantemente a ingestão de sementes, nozes, pipoca e grãos por toda a vida devido ao risco comprovado de impactação intraluminal.</li>
</ol>

<p><strong>Gabarito Oficial: Alternativa B.</strong></p>
<p><strong>Comentário Editorial Detalhado:</strong> O adenocarcinoma de cólon pode se manifestar de forma indistinguível da diverticulite (espessamento parietal circunferencial com perfuração focal). A incidência de neoplasia cólica oculta pós-diverticulite atinge até 8% a 11% nos casos complicados. Portanto, a realização de <strong>Colonoscopia total após 6 a 8 semanas</strong> (quando o processo inflamatório agudo cicatrizou, tornando o procedimento seguro) é mandatória (Alternativa B correta). A proibição de sementes e pipoca (Alternativa D) é um mito popular refutado por grandes estudos epidemiológicos prospectivos (como o <em>Health Professionals Follow-up Study</em>), que comprovaram que sementes e nozes não aumentam o risco de diverticulite.</p>

<hr>

<h3>Questão 5 (UERJ - Universidade do Estado do Rio de Janeiro)</h3>
<p>Em relação à Classificação de Hinchey Modificada para diverticulite aguda por Tomografia Computadorizada, correlacione o estágio com o respectivo achado anatomopatológico:</p>

<ol type="A">
  <li>Estágio Ia corresponde a abscesso pélvico à distância; Estágio II corresponde a peritonite purulenta difusa.</li>
  <li>Estágio Ib corresponde a abscesso pericólico ou mesocólico confinado; Estágio II corresponde a abscesso pélvico ou intra-abdominal à distância.</li>
  <li>Estágio III corresponde a peritonite fecal com fezes livres; Estágio IV corresponde a abscesso retroperitoneal restrito.</li>
  <li>Estágio 0 corresponde a abscesso mesocólico com gás livre; Estágio Ia corresponde a peritonite fecal generalizada.</li>
</ol>

<p><strong>Gabarito Oficial: Alternativa B.</strong></p>
<p><strong>Comentário Editorial Detalhado:</strong> Na classificação de Hinchey modificada por TC:
- Estágio 0: Diverticulite não complicada leve (apenas espessamento cólico e leve inflamação pericólica);
- Estágio Ia: Inflamação pericólica confinada / flegmão com microbolhas mesocólicas;
- Estágio Ib: <strong>Abscesso pericólico ou mesocólico confinado</strong>;
- Estágio II: <strong>Abscesso pélvico, retroperitoneal ou abdominal à distância</strong>;
- Estágio III: Peritonite purulenta generalizada;
- Estágio IV: Peritonite fecal generalizada. Portanto, a Alternativa B é a correta.</p>

<hr>

<h3>Questão 6 (IAMSPE - Instituto de Assistência Médica ao Servidor Público Estadual)</h3>
<p>Homem de 65 anos com história de episódios recorrentes de diverticulite de sigmoide procura atendimento ambulatorial queixando-se de eliminação de ar e "bolhas de gás" durante a micção (pneumatúria) e saída de fragmentos alimentares escuros na urina (fecalúria). Ao exame de urina, constata-se urocultura polimicrobiana com crescimento de <em>Escherichia coli</em> e <em>Enterococcus faecalis</em>. Qual é o diagnóstico e o exame tomográfico inicial mais apropriado?</p>

<ol type="A">
  <li>Fístula colovesical secundária à diverticulite; Tomografia Computadorizada de abdome e pelve com contraste oral e venoso evidenciando gás no interior da bexiga urinária.</li>
  <li>Divertículo vesical congênito infectado; cistoscopia rígida imediata com biópsia transmural de colo vesical.</li>
  <li>Carcinoma urotelial de pelve renal; urografia excretora com contraste iodado retrógrado em altas doses.</li>
  <li>Abscesso perinefrítico espontâneo; cintilografia renal estática com DMSA.</li>
</ol>

<p><strong>Gabarito Oficial: Alternativa A.</strong></p>
<p><strong>Comentário Editorial Detalhado:</strong> A associação de <strong>Pneumatúria + Fecalúria + ITU polimicrobiana de repetição</strong> é o quadro clássico patognomônico de <strong>FÍSTULA COLOVESICAL</strong> (Alternativa A). A causa primordial disparada no adulto é a doença diverticular do sigmoide (responsável por cerca de 65% a 70% dos casos). O exame diagnóstico inicial padrão-ouro é a <strong>TC de abdome e pelve</strong>, que demonstra gás no interior do lúmen da bexiga em paciente não cateterizado, além de espessamento focal da parede vesical adjacente à massa diverticular colônica.</p>
`
};

export const sec8 = {
  id: 'conclusao-recomendações-finais-referencias-diverticulite',
  title: '8. Síntese Terapêutica Integrada e Referências Internacionais Oficiais',
  body_html: `
<h3>Algoritmo Prático de Decisão Clínica na Diverticulite Aguda</h3>
<ol>
  <li><strong>Diagnóstico Tomográfico Precoce:</strong> Todo paciente com dor na FIE suspeita deve ser submetido à TC de abdome e pelve com contraste IV. <strong>Proscrita a colonoscopia e o enema baritado na fase aguda</strong>;</li>
  <li><strong>Estratificação por Hinchey:</strong>
    <ul>
      <li><em>Hinchey 0 / Ia (Não Complicada):</em> Paciente imunocompetente, sintomas leves $\rightarrow$ tratamento sintomático ambulatorial <strong>sem antibióticos</strong> com dieta líquida/branda; se imunossuprimido, febril ou leucocitose acentuada $\rightarrow$ Amoxicilina-Clavulanato oral por 7 a 10 dias;</li>
      <li><em>Hinchey Ib / II (Abscesso):</em> Internação hospitalar + Ceftriaxona + Metronidazol IV; se coleção $\ge 3$ a 4 cm $\rightarrow$ <strong>Drenagem Percutânea Guiada por TC</strong>;</li>
      <li><em>Hinchey III / IV (Peritonite Generalizada):</em> Cirurgia de Emergência Imediata $\rightarrow$ <strong>Cirurgia de Hartmann</strong> (paciente instável ou peritonite fecal) ou Ressecção Primária com Anastomose e Ileostomia de Proteção (paciente estável selecionado);</li>
    </ul>
  </li>
  <li><strong>Rastreamento Oncológico Mandatório:</strong> <strong>Colonoscopia total após 6 a 8 semanas da resolução da crise</strong> para excluir adenocarcinoma colorretal oculto;</li>
  <li><strong>Cirurgia Eletiva de Intervalo:</strong> Indicada se abscesso prévio drenado por via percutânea, fístulas colovesicais/colovaginais, imunossupressão ou episódios frequentes refratários que impactam a qualidade de vida.</li>
</ol>
`
};

export const bookReferencesDiverticulite = [
  {
    title: 'World Society of Emergency Surgery (WSES) — Guidelines for the management of acute left-sided colonic diverticulitis',
    url: 'https://wjes.biomedcentral.com/articles/10.1186/s13017-020-00313-4'
  },
  {
    title: 'American Gastroenterological Association (AGA) — Institute Guideline on the Management of Acute Diverticulitis',
    url: 'https://www.gastrojournal.org/article/S0016-5085(15)01432-8/fulltext'
  },
  {
    title: 'American Society of Colon and Rectal Surgeons (ASCRS) — Clinical Practice Guidelines for the Treatment of Left-Sided Colonic Diverticulitis',
    url: 'https://journals.lww.com/dcrjournal/fulltext/2020/06000/the_american_society_of_colon_and_rectal.8.aspx'
  },
  {
    title: 'New England Journal of Medicine (NEJM) — Randomized Clinical Trial of Antibiotics in Uncomplicated Diverticulitis (AVOD Trial)',
    url: 'https://www.nejm.org/doi/full/10.1056/NEJMoa1200234'
  },
  {
    title: 'Colégio Brasileiro de Cirurgiões (CBC) e Sociedade Brasileira de Coloproctologia (SBCP) — Diretrizes Nacionais para Diverticulite Aguda',
    url: 'https://sbcp.org.br/'
  }
];
