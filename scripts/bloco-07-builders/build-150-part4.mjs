// scripts/bloco-07-builders/build-150-part4.mjs

export const sec6 = {
  id: "insuficiencia-cognitiva-demencias-sarcopenia-fragilidade-rastreamentos",
  title: "6. Insuficiência Cognitiva, Sarcopenia, Fragilidade e Rastreamentos Baseados em Evidências no Adulto e Idoso",
  body_html: `
<h3>6.1 Insuficiência Cognitiva: O Diagnóstico Diferencial dos Três 'Ds' (Demência, Delirium e Depressão)</h3>
<p>A perda cognitiva no idoso é um dos cenários clínicos mais angustiantes para a família e desafiadores para o médico da Atenção Primária. A investigação começa obrigatoriamente pela diferenciação estrita entre três condições neurossiquiátricas fundamentais:</p>

<table class="book-table">
  <thead>
    <tr>
      <th>Critério Clínico</th>
      <th>Delirium (Estado Confusional Agudo)</th>
      <th>Demência (Transtorno Neurocognitivo Maior)</th>
      <th>Depressão no Idoso (Pseudodemência)</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>Início do Quadro</strong></td>
      <td><strong>Agudo (horas a dias)</strong>, frequentemente identificável momento exato.</td>
      <td><strong>Insidioso e gradual (meses a anos)</strong>, familiares têm dificuldade de precisar o início exato.</td>
      <td>Subagudo (semanas a meses), frequentemente associado a evento estressor ou luto recente.</td>
    </tr>
    <tr>
      <td><strong>Curso Temporal</strong></td>
      <td><strong>Flutuante ao longo do dia</strong>; piora acentuada no final da tarde e noite (fenômeno do pôr do sol / <em>sundowning</em>).</td>
      <td>Progressivo e contínuo, com declínio gradual das funções corticais superiores.</td>
      <td>Relativamente estável ao longo das semanas, piora matinal clássica com apatia e anedonia.</td>
    </tr>
    <tr>
      <td><strong>Nível de Consciência e Atenção</strong></td>
      <td><strong>Alterado / Turvado</strong>; desatenção marcante (incapaz de manter o foco ou seguir ordens simples); hiperativo, hipoativo ou misto.</td>
      <td><strong>Preservado até fases muito tardias</strong>; o paciente mantém-se alerta, embora cognitivamente comprometido.</td>
      <td>Alerta e consciente; concentração diminuída por desinteresse ou ideação ruminativa negativa.</td>
    </tr>
    <tr>
      <td><strong>Postura no Exame Cognitivo</strong></td>
      <td>Incapaz de realizar o teste por desatenção ou alucinações vívidas (frequentemente visuais).</td>
      <td><strong>Tenta responder</strong>, erra as questões, minimiza as dificuldades (anosognosia) ou confabula para disfarçar falhas de memória.</td>
      <td><strong>Resposta do tipo 'Não sei' ('I don't know')</strong>, desiste precocemente dos testes sem tentar, chora facilmente e queixa-se intensamente dos próprios lapsos de memória.</td>
    </tr>
    <tr>
      <td><strong>Reversibilidade</strong></td>
      <td><strong>Potencialmente reversível</strong> com o tratamento imediato da causa clínica subjacente (ITU, pneumonia, desidratação, drogas anticolinérgicas).</td>
      <td>Geralmente irreversível nas causas neurodegenerativas (Alzheimer, Lewy, FTD), embora tratável sintomaticamente.</td>
      <td><strong>Plenamente reversível</strong> com psicoterapia e antidepressivos adequados (sertralina, escitalopram, mirtazapina).</td>
    </tr>
  </tbody>
</table>

<div class="clinical-box highlight">
  <h4>Manejo do Delirium no Idoso na APS</h4>
  <ul>
    <li>O <strong>delirium é uma emergência médica</strong> decorrente de agressão orgânica aguda sobre um cérebro vulnerável com reserva diminuída. A mortalidade hospitalar de idosos com delirium não reconhecido atinge 20% a 30%.</li>
    <li><em>Investigação Etiológica Imediata:</em> Glicemia capilar, sinais vitais completos, oximetria de pulso, exame de urina (EAS e urocultura), hemograma, eletrólitos (sódio, potássio, cálcio), função renal e hepática, ausculta pulmonar (pneumonia silenciosa sem tosse), palpação abdominal (fecaloma impactado e bexigoma / retenção urinária) e revisão rigorosa de todos os medicamentos introduzidos recentemente.</li>
    <li><em>Tratamento Não Farmacológico (Medida de Maior Eficácia):</em> Ambiente calmo e bem iluminado durante o dia, presença contínua de familiar de referência com voz tranquila, relógio e calendário visíveis no quarto para reorientação ambiental periódica, manter óculos e próteses auditivas, hidratação oral precoce e mobilização fora do leito.</li>
    <li><em>Tratamento Farmacológico:</em> <strong>Restrito apenas para casos de agitação psicomotora grave que ameacem a segurança física</strong> do próprio idoso (arrancar acessos venosos, sondas, pular da cama) ou da equipe/família. Empregar <strong>Haloperidol em doses mínimas (0,5 mg a 1,0 mg VO ou IM)</strong> por período estritamente curto (1 a 3 dias). <em>Evitar benzodiazepínicos no delirium</em> (agravam a confusão mental e prolongam o quadro!), exceto se o delirium for comprovadamente causado por abstinência alcoólica ou de sedativos.</li>
  </ul>
</div>

<h3>6.2 As Principais Etiologias de Demência na Atenção Primária</h3>
<p>As síndromes demenciais atingem cerca de 5% a 8% dos idosos com 65 anos e até 30% a 40% daqueles com mais de 85 anos. O diagnóstico precoce e a distinção etiológica orientam o aconselhamento familiar e o prognóstico:</p>

<table class="book-table">
  <thead>
    <tr>
      <th>Etiologia Demencial</th>
      <th>Fisiopatologia e Biomarcadores</th>
      <th>Apresentação Clínica e Marcos Diagnósticos</th>
      <th>Manejo Terapêutico na APS</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>Doença de Alzheimer (DA - 60% a 70% dos casos)</strong></td>
      <td>Deposição extracelular de placas beta-amiloides (A-beta-42) e formação intracelular de emaranhados neurofibrilares de proteína tau hiperfosforilada, gerando atrofia cortical temporoparietal e hipocampal bilateral.</td>
      <td>Perda insidiosa e progressiva da <strong>memória episódica recente</strong> (lembra fatos de 40 anos atrás, mas não do café da manhã); anomia (dificuldade de nomear objetos); apraxia e agnosia; preservação inicial de habilidades sociais; perda gradual de AIVDs e ABVDs.</td>
      <td><strong>Inibidores da Acetilcolinesterase (IAChE):</strong> Donepezila (5 a 10 mg/dia), Rivastigmina (oral ou adesivo transdérmico 4,6 mg a 9,5 mg/dia) ou Galantamina (8 a 24 mg/dia) para fases leve a moderada; <strong>Memantina</strong> (antagonista NMDA 10 a 20 mg/dia) adicionada nas fases moderada a grave; reabilitação neuropsicológica e suporte ao cuidador.</td>
    </tr>
    <tr>
      <td><strong>Demência Vascular (DV - 15% a 20% dos casos)</strong></td>
      <td>Lesão isquêmica cerebral cumulativa multifocal (múltiplos infartos corticais, infartos lacunares subcorticais profundos ou leucoencefalopatia isquêmica difusa de substância branca / Doença de Binswanger).</td>
      <td><strong>Evolução em degraus (stepwise deterioration)</strong> ou flutuante após eventos cerebrovasculares; predomínio precoce de <strong>disfunção executiva</strong> (dificuldade de planejamento, julgamento e abstração), apatia, lentificação psicomotora e sinais neurológicos focais (hiper-reflexia, marcha espástica ou magnética).</td>
      <td>Controle agressivo dos fatores de risco cardiovasculares (pressão arterial, diabetes, estatinas nas dislipidemias, cessação do tabagismo, antiagregação plaquetária com AAS ou anticoagulação se FA). Inibidores da colinesterase têm benefício modesto.</td>
    </tr>
    <tr>
      <td><strong>Demência por Corpos de Lewy (DCL - 10% a 15% dos casos)</strong></td>
      <td>Deposição patológica de inclusões proteicas citoplasmáticas de alfa-sinucleína (corpos de Lewy) em córtex cerebral e tronco encefálico.</td>
      <td><strong>Tríade Clínica Cardinal:</strong><br>
        1. <strong>Alucinações visuais precoces e recorrentes</strong>, vívidas e bem formadas (pessoas ou animais detalhados);<br>
        2. <strong>Flutuações cognitivas acentuadas</strong> na atenção e estado de alerta ao longo de horas ou dias;<br>
        3. <strong>Parkinsonismo espontâneo</strong> (rigidez e bradicinesia bilateral simétrica, com tremor de repouso menos evidente).<br>
        <em>Marcador precoce adicional:</em> Transtorno Comportamental do Sono REM (paciente debate-se, chuta e fala durante o sono encenando sonhos violentos anos antes do declínio cognitivo).</td>
      <td><strong>Atenção máxima à pegadinha de prova:</strong> <strong>EXTREMA SENSIBILIDADE A ANTIPSICÓTICOS TÍPICOS (Haloperidol é proscrito!)</strong>, podendo desencadear parkinsonismo fulminante irreversível, rigidez catatônica e Síndrome Neuroléptica Maligna. Tratamento de escolha: Inibidores da colinesterase (Rivastigmina tem excelente resposta) e Quetiapina em microdoses se psicose incontrolável.</td>
    </tr>
    <tr>
      <td><strong>Degeneração Lobar Frontotemporal (Demência Frontotemporal - DFT)</strong></td>
      <td>Atrofia circunscrita e assimétrica dos lobos frontais e temporais anteriores, com inclusões de proteína tau (Doença de Pick) ou TDP-43.</td>
      <td><strong>Início em faixa etária mais jovem (50 a 65 anos)</strong>; predomínio de <strong>alterações profundas de personalidade, desinibição social grosseira</strong> (comentários sexuais inapropriados, furto em lojas, desrespeito a regras), perda de empatia e simpatia, condutas compulsivas repetitivas, hiperoralidade e alterações na preferência alimentar (compulsão por doces e carboidratos). Memória e orientação espacial permanecem relativamente preservadas nas fases iniciais.</td>
      <td>Manejo ambiental rigoroso; inibidores seletivos de recaptação de serotonina (trazodona, sertralina) para reduzir impulsividade e desinibição. <em>Inibidores da acetilcolinesterase são ineficazes e podem piorar a agitação comportamental na DFT!</em></td>
    </tr>
  </tbody>
</table>

<h3>6.3 Sarcopenia e Síndrome de Fragilidade Física</h3>
<p>A <strong>Sarcopenia</strong> é uma doença muscular esquelética progressiva e generalizada associada a maior risco de quedas, fraturas, incapacidade física e mortalidade. O Consenso Europeu revisado (EWGSOP2) estabelece os critérios diagnósticos:</p>
<ol>
  <li><strong>1. Baixa Força Muscular (Critério Essencial para Sarcopenia Provável):</strong> Avaliada por <strong>dinamometria manual (Handgrip strength)</strong>: &lt; 27 kg para homens e &lt; 16 kg para mulheres; ou <strong>Teste de Levantar da Cadeira (Chair Stand Test)</strong>: tempo &gt; 15 segundos para levantar 5 vezes sem apoio dos braços.</li>
  <li><strong>2. Baixa Quantidade ou Qualidade Muscular (Confirmação Diagnóstica):</strong> Avaliada por Densitometria de Dupla Energia por Raio-X (DEXA corporal total) ou Bioimpedância elétrica.</li>
  <li><strong>3. Baixo Desempenho Físico (Sarcopenia Grave):</strong> Velocidade de marcha &le; 0,8 m/s em teste de caminhada de 4 metros; ou pontuação na bateria SPPB (<em>Short Physical Performance Battery</em>) &le; 8 pontos.</li>
</ol>
<p><em>Pilar Terapêutico Insubstituível:</em> Não há terapia farmacológica milagrosa para sarcopenia. O tratamento padrão-ouro consiste em <strong>Treinamento Físico Resistido Progressivo (musculação com pesos)</strong> associado a suporte nutricional proteico adequado (ingestão proteica de <strong>1,2 a 1,5 g/kg de peso/dia</strong> de alto valor biológico com leucina, salvo contraindicação por doença renal avançada não dialítica).</p>

<div class="clinical-box highlight">
  <h4>Critérios de Fragilidade de Linda Fried (Fenótipo de Fragilidade)</h4>
  <p>A presença de <strong>3 ou mais dos 5 critérios a seguir define o Idoso Frágil</strong> (1 ou 2 critérios definem o idoso <em>Pré-Frágil</em>; nenhum critério define o idoso <em>Robusto/Hígido</em>):</p>
  <ul>
    <li><strong>1. Perda de Peso Não Intencional:</strong> Redução &ge; 4,5 kg ou &ge; 5% do peso corpóreo no último ano.</li>
    <li><strong>2. Fadiga / Exaustão Autorreferida:</strong> Resposta positiva a perguntas sobre cansaço para qualquer esforço cotidiano na escala CES-D em mais de 3 dias na última semana.</li>
    <li><strong>3. Fraqueza Muscular:</strong> Força de preensão palmar no menor quintil da curva de distribuição populacional estratificada por sexo e IMC.</li>
    <li><strong>4. Baixa Velocidade de Marcha:</strong> Tempo para caminhar 4,6 metros no menor quintil da curva de distribuição.</li>
    <li><strong>5. Baixo Nível de Atividade Física:</strong> Gasto calórico semanal em atividades físicas no menor quintil (&lt; 383 kcal/semana para homens e &lt; 270 kcal/semana para mulheres).</li>
  </ul>
</div>

<h3>6.4 Rastreamentos Baseados em Evidências no Adulto e Idoso (Prevenção Quaternária e Diretrizes USPSTF/MS)</h3>
<p>Na Atenção Primária, a prevenção quaternária — a arte de proteger o paciente de intervenções médicas excessivas, iatrogênicas e sem benefício comprovado — atinge seu auge no cuidado do adulto e da pessoa idosa:</p>

<table class="book-table">
  <thead>
    <tr>
      <th>Condição Clínica</th>
      <th>População-Alvo e Exame Recomendado</th>
      <th>Periodicidade e Idade Limite de Interrupção</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>Hipertensão Arterial Sistêmica (HAS)</strong></td>
      <td>Todos os adultos &ge; 18 anos; medida da Pressão Arterial com manguito adequado.</td>
      <td>Anual para indivíduos com PA normal; semestral para pré-hipertensos; confirmação diagnóstica com MAPA ou MRPA.</td>
    </tr>
    <tr>
      <td><strong>Diabetes Mellitus Tipo 2 (DM2)</strong></td>
      <td>Adultos com sobrepeso/obesidade (IMC &ge; 25 kg/m²) associado a fatores de risco; ou universalmente a partir dos 35 ou 45 anos; Glicemia de jejum ou HbA1c.</td>
      <td>A cada 3 anos se normal; anual se pré-diabetes (glicemia jejum 100-125 ou HbA1c 5,7-6,4%).</td>
    </tr>
    <tr>
      <td><strong>Câncer Colorretal (CCR)</strong></td>
      <td>Homens e mulheres de risco habitual dos <strong>50 aos 75 anos de idade</strong> (USPSTF considera iniciar aos 45 anos); Sangue Oculto nas Fezes (método imunoquímico fecal - FIT anual) OU Colonoscopia.</td>
      <td>FIT anual ou bienal; Colonoscopia a cada 10 anos se normal. <strong>Interromper aos 75 anos rotineiramente; e NUNCA rastrear após os 85 anos</strong> de idade devido a riscos de perfuração e complicações anestésicas superando qualquer benefício de sobrevida.</td>
    </tr>
    <tr>
      <td><strong>Aneurisma de Aorta Abdominal (AAA)</strong></td>
      <td><strong>Homens de 65 a 75 anos que tenham histórico de tabagismo</strong> em qualquer momento da vida (&ge; 100 cigarros fumados na vida); Ultrassonografia de abdome total.</td>
      <td><strong>Exame único na vida (one-time screening)</strong>. Não recomendado para homens nunca fumantes ou mulheres de risco habitual (USPSTF Grau D).</td>
    </tr>
    <tr>
      <td><strong>Osteoporose</strong></td>
      <td>Mulheres com <strong>&ge; 65 anos de idade</strong> (ou mulheres pós-menopausa &lt; 65 anos com fatores de risco clínicos significativos avaliados por FRAX); Densitometria Óssea (coluna lombar e fêmur proximal).</td>
      <td>A cada 2 a 5 anos conforme valores de T-score basal. Em homens, indicado universalmente a partir dos 70 anos.</td>
    </tr>
    <tr>
      <td><strong>Câncer de Próstata (PSA e Toque Retal)</strong></td>
      <td>O Ministério da Saúde e o INCA <strong>NÃO recomendam o rastreamento populacional sistemático de rotina</strong> com PSA ou toque retal em homens assintomáticos, devido às altas taxas de biópsias desnecessárias, falsos-positivos, sobrediagnóstico, impotência sexual e incontinência urinária decorrentes do tratamento cirúrgico/radioterápico.</td>
      <td>Se o paciente solicitar ativamente o exame após 50 anos (ou 45 se negro ou parente de 1º grau afetado), realizar tomada de decisão compartilhada informando riscos e benefícios reais.</td>
    </tr>
  </tbody>
</table>
`
};

export const sec7 = {
  id: "casos-clinicos-e-questoes-comentadas-geriatria",
  title: "7. Casos Clínicos Estruturados e Questões Comentadas de Concursos Médicos",
  body_html: `
<h3>7.1 Casos Clínicos da Prática Geriátrica na Atenção Básica</h3>

<div class="clinical-box highlight">
  <h4>Caso Clínico 1: Polifarmácia, Cascata Iatrogênica e Queda Domiciliar</h4>
  <p><strong>Identificação:</strong> Seu Manoel, 78 anos, viúvo, comparece à consulta na UBS acompanhado de sua filha. A filha relata que o pai sofreu uma queda no corredor de casa há 3 dias durante a madrugada ao se levantar para ir urinar. Não houve fratura aparente, mas o paciente apresenta escoriações no cotovelo e queixa-se de tontura ao se levantar da cama e fraqueza nas pernas.</p>
  <p><strong>Histórico Medicamentoso Atual (Revisão da 'Sacola de Remédios'):</strong></p>
  <ul>
    <li>Hidroclorotiazida 25 mg/dia (para hipertensão há 10 anos);</li>
    <li>Anlodipino 10 mg/dia (introduzido há 6 meses);</li>
    <li>Furosemida 40 mg/dia pela manhã (prescrita há 4 meses após o paciente apresentar inchaço nos pés);</li>
    <li>Amitriptilina 25 mg à noite (prescrita há 2 meses para insônia e dores na coluna);</li>
    <li>Clonazepam 2 mg à noite (em uso contínuo por conta própria há 5 anos);</li>
    <li>Glibenclamida 5 mg/dia (para diabetes mellitus tipo 2 diagnosticado há 8 anos).</li>
  </ul>
  <p><strong>Exame Físico Dirigido:</strong></p>
  <ul>
    <li>PA deitado: 142 x 82 mmHg, FC 68 bpm;</li>
    <li>PA em pé (após 3 minutos de ortostase): 112 x 66 mmHg, FC 74 bpm (queda de 30 mmHg na PAS e 16 mmHg na PAD, caracterizando <strong>Hipotensão Ortostática Grave</strong>);</li>
    <li>Glicemia capilar de jejum: 58 mg/dL (hipoglicemia assintomática);</li>
    <li>Boca seca com mucosa jugal ressecada, marcha lentificada e insegura (TUG test = 22 segundos).</li>
  </ul>
  <p><strong>Raciocínio Clínico e Plano de Desprescrição Baseado em Evidências:</strong></p>
  <ol>
    <li><em>Identificação da Cascata Iatrogênica:</em> O anlodipino provocou edema maleolar periférico por vasodilatação pré-capilar. Em vez de suspender ou reduzir o anlodipino, foi adicionada furosemida (segundo diurético associado à hidroclorotiazida), gerando desidratação crônica e espoliação volêmica.</li>
    <li><em>Identificação de Drogas Inapropriadas segundo os Critérios de Beers:</em>
      <ul>
        <li><strong>Amitriptilina:</strong> Antidepressivo tricíclico com altíssima carga anticolinérgica (boca seca, retenção urinária, risco de delirium) e bloqueio alfa-1 adrenérgico potente, responsável direto pelo agravamento da hipotensão ortostática;</li>
        <li><strong>Clonazepam:</strong> Benzodiazepínico de ação prolongada, responsável pela sedação residual noturna, fraqueza muscular, descoordenação motora e alto risco de novas quedas e fraturas;</li>
        <li><strong>Glibenclamida:</strong> Sulfonilureia de ação longa contraindicada no idoso pelo risco extremo de hipoglicemias graves e prolongadas (glicemia de 58 mg/dL encontrada no exame!).</li>
      </ul>
    </li>
    <li><em>Conduta e Desprescrição Racional Imediata:</em>
      <ul>
        <li>Suspender imediatamente a Furosemida (edema era medicamentoso pelo anlodipino);</li>
        <li>Reduzir a dose de anlodipino para 5 mg/dia ou substituir por inibidor da ECA (Enalapril);</li>
        <li>Suspender gradualmente a Amitriptilina; para a insônia, orientar higiene do sono e atividade física diurna;</li>
        <li>Substituir a Glibenclamida por um antidiabético seguro que não induz hipoglicemia (Metformina ou inibidor de DPP-4/SGLT2);</li>
        <li>Planejar desmame lento e supervisionado do Clonazepam (redução de 25% da dose a cada 2 a 3 semanas) para evitar síndrome de abstinência benzodiazepínica aguda;</li>
        <li>Orientações de prevenção de quedas no domicílio (retirada de tapetes, luz noturna no corredor).</li>
      </ul>
    </li>
  </ol>
</div>

<div class="clinical-box highlight">
  <h4>Caso Clínico 2: Avaliação Funcional e Rastreio de Declínio Cognitivo Precoce</h4>
  <p><strong>Identificação:</strong> Dona Sebastiana, 74 anos, professora aposentada, comparece à UBS trazida pela neta. A neta relata que a avó vem esquecendo compromissos familiares recentes, repetindo as mesmas perguntas várias vezes e, na última semana, esqueceu uma panela acesa no fogão com risco de incêndio. Além disso, a neta encontrou contas de luz vencidas com cobrança de juros na gaveta da paciente.</p>
  <p><strong>Avaliação Multidimensional na APS:</strong></p>
  <ul>
    <li><strong>Escala de Katz (ABVD):</strong> 6/6 pontos (Totalmente independente para banho, vestir-se, higiene íntima, transferência, continência e alimentação).</li>
    <li><strong>Escala de Lawton (AIVD):</strong> Perda de pontuação em manejo financeiro (não consegue mais pagar contas), preparação de refeições (esquece o fogo aceso) e memória de medicação.</li>
    <li><strong>Mini-Exame do Estado Mental (MEEM):</strong> Escolaridade de 12 anos completos; pontuação obtida: 21 pontos (nota de corte para alta escolaridade no Brasil é de 26-27 pontos; perda acentuada em orientação temporal, cálculo seriado e evocação tardia de palavras).</li>
    <li><strong>Exame Clínico e Neurológico:</strong> Sem déficits motores focais, sem rigidez parkinsoniana, pares cranianos normais.</li>
  </ul>
  <p><strong>Raciocínio Diagnóstico:</strong></p>
  <ol>
    <li>O padrão de <em>preservação estrita das ABVDs (Katz 6/6) com perda inicial e evidente das AIVDs complexas (Lawton diminuído)</em> associado ao declínio da memória episódica recente caracteriza o início clínico de um <strong>Transtorno Neurocognitivo Maior (provável Doença de Alzheimer em estágio inicial)</strong>.</li>
    <li><em>Conduta Mandatória na Atenção Primária:</em> Investigar <strong>causas secundárias e potencialmente reversíveis de declínio cognitivo</strong> antes de selar o diagnóstico neurodegenerativo. Solicitar exames laboratoriais essenciais: Hemograma, Glicemia de jejum, Função renal (ureia/creatinina), Eletrólitos (sódio, potássio, cálcio), <strong>Hormônio Tireoestimulante (TSH)</strong> (hipotireoidismo é causa clássica de demência reversível), <strong>Vitamina B12 sérica</strong> e ácido fólico, Sorologia para Sífilis (VDRL - neurossífilis) e HIV, além de Tomografia de Crânio sem contraste para descartar hidrocefalia de pressão normal, hematoma subdural crônico silencioso e lesões vasculares isquêmicas extensas.</li>
  </ol>
</div>

<h3>7.2 Questões de Concursos e Residência Médica Comentadas</h3>

<div class="clinical-box highlight">
  <h4>Questão 1 (Enare / Exame Nacional de Residência)</h4>
  <p>Homem de 82 anos, previamente hígido e funcionalmente independente, é trazido à Unidade de Pronto Atendimento pela família devido a quadro súbito de desorientação temporal, agitação psicomotora e alucinações visuais com início há cerca de 36 horas. A família relata que o paciente acorda assustado durante a noite achando que há invasores em seu quarto, mas apresenta momentos de relativa lucidez durante o período da manhã. Acompanhante nega traumatismos cranianos recentes. Ao exame físico: desatento, não consegue soletrar a palavra 'MUNDO' de trás para frente, afebril, PA 130x80 mmHg, abdome discretamente doloroso à palpação profunda em hipogástrio, onde se palpa massa arredondada, fibroelástica e dolorosa estendendo-se até a cicatriz umbilical. Qual é o diagnóstico sindrômico prioritário e a conduta imediata mais apropriada?</p>
  <p>A) Doença de Alzheimer descompensada; iniciar donepezila em dose plena.<br>
  B) Demência com Corpos de Lewy; iniciar risperidona em altas doses.<br>
  C) Delirium hiperativo secundário à retenção urinária aguda (bexigoma); realizar sondagem vesical de alívio e investigar infecção urinária.<br>
  D) Acidente Vascular Cerebral Isquêmico de artéria cerebral anterior; solicitar tomografia de crânio e trombolítico.<br>
  E) Depressão maior com sintomas psicóticos; iniciar amitriptilina e fluoxetina.</p>
  <p><strong>Gabarito Oficial Comentado: Alternativa C.</strong></p>
  <p><em>Comentário Didático:</em> O paciente apresenta início <strong>agudo (36 horas)</strong> de confusão mental com <strong>curso flutuante</strong> (momentos de lucidez pela manhã e agitação noturna com alucinações) e marcante <strong>desatenção</strong> (falha no teste de soletrar inversamente). Essa tríade define inequivocamente <strong>Delirium</strong> pelo algoritmo CAM (<em>Confusion Assessment Method</em>). O exame abdominal revela um globo vesical palpável no hipogástrio (bexigoma), que é uma das causas físicas mais prevalentes e clássicas de precipitação de delirium no idoso por desconforto e dor neuropática autônoma. A conduta imediata consiste no alívio da dor mecânica mediante sondagem vesical (com descompressão lenta e fracionada da bexiga para prevenir hemorragia <em>ex-vacuo</em>) e coleta de urina para EAS e urocultura. As alternativas A e B estão incorretas porque demências têm curso insidioso de meses a anos. Antipsicóticos (risperidona) ou antidepressivos anticolinérgicos (amitriptilina) agravariam drasticamente o quadro.</p>
</div>

<div class="clinical-box highlight">
  <h4>Questão 2 (SUS-SP / Residência Médica em Clínica Médica e MFC)</h4>
  <p>Uma mulher de 79 anos comparece para avaliação de rotina na UBS. Ela possui hipertensão arterial sistêmica e osteoartrose de joelhos. Relata que nos últimos dois meses tem sentido tonturas frequentes e quedas recorrentes em sua sala de estar. Sua lista atual de medicamentos inclui: Enalapril 20 mg 2x/dia, Hidroclorotiazida 25 mg/dia, Diclofenaco de sódio 50 mg 3x/dia por conta própria para dor articular e Amitriptilina 50 mg/dia prescrita para cefaleia tensional e insônia. De acordo com os Critérios de Beers (AGS 2023) e boas práticas de farmacoterapia no idoso, qual das seguintes condutas farmacológicas é a mais indicada para reduzir o risco de novas quedas e eventos adversos graves nesta paciente?</p>
  <p>A) Aumentar a dose de amitriptilina para 75 mg/dia visando melhorar o sono e prevenir ansiedade.<br>
  B) Substituir o diclofenaco de sódio por outro AINE mais potente, como piroxicam ou indometacina.<br>
  C) Suspender o diclofenaco de sódio e a amitriptilina, ajustando o controle da dor com medidas não farmacológicas e analgésicos simples, e reavaliar o esquema anti-hipertensivo.<br>
  D) Adicionar diazepam 5 mg à noite para potencializar a sedação da amitriptilina.<br>
  E) Iniciar flunarizina para tratar a tontura da paciente.</p>
  <p><strong>Gabarito Oficial Comentado: Alternativa C.</strong></p>
  <p><em>Comentário Didático:</em> A paciente está exposta a múltiplos <strong>Medicamentos Potencialmente Inapropriados (MPI)</strong> segundo os Critérios de Beers: 1) <strong>Amitriptilina:</strong> possui bloqueio colinérgico intenso e bloqueio alfa-1 adrenérgico, gerando sedação, confusão e hipotensão ortostática grave com quedas; 2) <strong>Diclofenaco (AINE contínuo):</strong> eleva risco de sangramento digestivo, deterioração renal e neutraliza o efeito do enalapril. A conduta mandatória de desprescrição consiste na suspensão do AINE e da amitriptilina, introdução de analgesia escalonada segura (paracetamol ou dipirona associados a reabilitação com fortalecimento muscular) e aferição da PA deitado e em pé para descartar hipotensão postural iatrogênica pelos anti-hipertensivos. As alternativas A, B, D e E acrescentam mais drogas inadequadas (diazepam causa mais quedas; flunarizina causa parkinsonismo; piroxicam tem meia-vida de 50 horas com altíssimo risco de úlcera sangrante).</p>
</div>

<div class="clinical-box highlight">
  <h4>Questão 3 (USP / Secretaria Municipal de Saúde de São Paulo)</h4>
  <p>De acordo com as diretrizes do Ministério da Saúde e as evidências epidemiológicas consolidadas sobre rastreamento de neoplasias e prevenção quaternária em adultos e idosos na Atenção Primária, assinale a alternativa que descreve uma conduta CORRETA:</p>
  <p>A) O rastreamento de câncer colorretal com pesquisa de sangue oculto nas fezes (FIT) deve ser mantido indefinidamente em todos os idosos acima de 85 anos com autonomia física.<br>
  B) O rastreamento de aneurisma de aorta abdominal (AAA) com ultrassonografia de abdome é recomendado em exame único na vida para homens de 65 a 75 anos que tenham histórico de tabagismo.<br>
  C) A realização de PSA e toque retal sistemático anual é preconizada pelo INCA para todos os homens a partir dos 45 anos como política de saúde pública.<br>
  D) A mamografia de rastreamento deve ser solicitada com periodicidade anual obrigatória para mulheres até os 85 anos de idade.<br>
  E) A radiografia simples de tórax anual é recomendada para rastreamento de câncer de pulmão em idosos tabagistas pesados.</p>
  <p><strong>Gabarito Oficial Comentado: Alternativa B.</strong></p>
  <p><em>Comentário Didático:</em> O rastreamento de Aneurisma de Aorta Abdominal (AAA) com ultrassonografia abdominal possui recomendação Grau B da USPSTF e é amplamente respaldado na literatura de medicina preventiva para <strong>homens de 65 a 75 anos com histórico de tabagismo</strong> (pelo menos 100 cigarros fumados na vida), realizado em <strong>exame único na vida (one-time screening)</strong>. A alternativa A está errada porque o rastreamento de câncer colorretal não é recomendado após os 85 anos (Grau D - riscos superam benefícios). A alternativa C é falsa porque o INCA e o MS contraindicam o rastreamento populacional sistemático de câncer de próstata. A alternativa D é incorreta, pois o Ministério da Saúde recomenda mamografia bienal estritamente até os 69 anos de idade. A alternativa E é incorreta porque a radiografia de tórax não reduz mortalidade por câncer de pulmão (o método validado para tabagistas pesados selecionados é a Tomografia Computadorizada de Tórax de Baixa Dose).</p>
</div>
`
};
