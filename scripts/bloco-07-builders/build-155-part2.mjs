// scripts/bloco-07-builders/build-155-part2.mjs

export const sec3 = {
  id: "transtornos-mentais-comuns-ansiedade-depressao-insonia",
  title: "3. Abordagem dos Transtornos Mentais Comuns (TMC): Ansiedade, Depressão Leve a Moderada e Insônia na Atenção Básica",
  body_html: `
<h3>3.1 O Conceito Epidemiológico de Transtornos Mentais Comuns (TMC)</h3>
<p>Formulado originalmente por David Goldberg e Paul Huxley, o conceito de <strong>Transtornos Mentais Comuns (TMC)</strong> engloba um conjunto de sintomas psíquicos altamente prevalentes na população geral — destacando-se manifestações ansiosas, sintomas depressivos, fadiga crônica, insônia, irritabilidade, dificuldade de concentração e queixas somatoformes (dores inespecíficas, cefaleia, desconforto gastrintestinal). No Brasil, estudos epidemiológicos em áreas de cobertura da Estratégia Saúde da Família apontam que <strong>entre 30% e 50% de todos os usuários atendidos na atenção primária apresentam critérios para TMC</strong>.</p>

<p>Na imensa maioria das vezes, esses quadros não atingem o limiar de gravidade para diagnósticos psiquiátricos clássicos graves (como esquizofrenia ou depressão psicótica), refletindo um sofrimento emocional expressivo intimamente vinculado a determinantes sociais da saúde: desemprego, violência urbana e doméstica, pobreza, discriminação e sobrecarga de cuidados familiares. O manejo desses transtornos é de <strong>competência clínica resolutiva prioritária da equipe de Atenção Primária</strong>, não devendo ser encaminhado burocraticamente a serviços especializados de saúde mental.</p>

<h3>3.2 Transtornos de Ansiedade na APS: Avaliação e Manejo Escalonado</h3>
<p>O <strong>Transtorno de Ansiedade Generalizada (TAG)</strong> caracteriza-se por ansiedade e preocupação excessivas, desproporcionais e de difícil controle na maioria dos dias por pelo menos <strong>6 meses</strong>, associadas a sintomas físicos de tensão muscular, inquietação ('nervos à flor da pele'), fadiga fácil, dificuldade de concentração ('branco mental'), irritabilidade e alteração do sono (dificuldade de conciliar o sono).</p>

<div class="clinical-box highlight">
  <h4>Instrumento de Triagem Rápida na APS: Escala GAD-7 (Generalized Anxiety Disorder 7)</h4>
  <p>Questionário autoaplicável de 7 itens que avalia as últimas duas semanas (pontuação de 0 a 21):</p>
  <ul>
    <li><strong>0 a 4 pontos:</strong> Ansiedade mínima (orientação e suporte habitual);</li>
    <li><strong>5 a 9 pontos:</strong> Ansiedade leve (intervenções não farmacológicas, higiene do sono, psicoeducação e suporte comunitário);</li>
    <li><strong>10 a 14 pontos:</strong> Ansiedade moderada (psicoterapia estruturada, TCC e considerar farmacoterapia de 1ª linha);</li>
    <li><strong>15 a 21 pontos:</strong> Ansiedade grave (indicação formal de farmacoterapia com ISRS associada à psicoterapia e reavaliações frequentes na APS).</li>
  </ul>
</div>

<p><em>Diagnóstico Diferencial Clínico e Físico da Ansiedade:</em> Antes de firmar o diagnóstico de transtorno primário de ansiedade, é dever do médico de família afastar condições médicas orgânicas e substâncias que mimetizam ou deflagram crises de pânico e taquicardia: <strong>Hipertireoidismo</strong> (solicitar dosagem de TSH/T4 livre), arritmias cardíacas paroxísticas (eletrocardiograma), feocromocitoma, uso excessivo de cafeína, abuso de estimulantes (cocaína, anfetaminas, moderadores de apetite), asma descompensada e abstinência alcoólica leve a moderada.</p>

<h3>3.3 Transtornos Depressivos: Depressão Leve, Moderada e Risco de Cronicidade</h3>
<p>A avaliação da depressão na Atenção Primária utiliza a escala <strong>PHQ-9 (Patient Health Questionnaire-9)</strong>, alinhada aos critérios diagnósticos do DSM-5. A presença de pelo menos um dos dois sintomas cardinais nos últimos 14 dias é mandatória:</p>
<ol>
  <li><strong>Humor deprimido</strong> na maior parte do dia, quase todos os dias;</li>
  <li><strong>Anedonia (perda acentuada de interesse ou prazer)</strong> em todas ou quase todas as atividades habituais.</li>
</ol>
<p><em>Sintomas Acessórios:</em> Alterações do sono (insônia terminal ou hipersonia), alterações ponderais (perda ou ganho de peso não intencional), fadiga ou perda de energia diária, agitação ou retardo psicomotor observado por terceiros, sentimentos de culpa excessiva ou inutilidade, diminuição da capacidade de pensar/concentrar-se e <strong>pensamentos recorrentes de morte ou ideação suicida</strong>.</p>

<table class="book-table">
  <thead>
    <tr>
      <th>Gravidade Depressiva (PHQ-9)</th>
      <th>Pontuação</th>
      <th>Estratégia Terapêutica Escalonada na APS (Diretrizes NICE / MS)</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>Depressão Leve</strong></td>
      <td>5 a 9 pontos</td>
      <td>
        - <strong>Conduta Não Farmacológica como Primeira Linha:</strong> Psicoeducação ativa, aconselhamento focado em problemas, estímulo à atividade física regular (caminhada de 150 min/semana tem eficácia equivalente a antidepressivos em depressão leve!), participação em grupos terapêuticos e comunitários da UBS (hortas comunitárias, rodas de conversa);<br>
        - <em>Evitar a prescrição rotineira de antidepressivos</em> como primeira conduta (reavaliar clinicamente em 2 a 4 semanas).
      </td>
    </tr>
    <tr>
      <td><strong>Depressão Moderada</strong></td>
      <td>10 a 14 pontos</td>
      <td>
        - Psicoterapia estruturada (Terapia Cognitivo-Comportamental ou Terapia Interpessoal);<br>
        - <strong>Farmacoterapia de 1ª Linha com Inibidores Seletivos da Recaptação de Serotonina (ISRS)</strong>: Sertralina (50 a 100 mg/dia) ou Escitalopram (10 a 20 mg/dia) ou Fluoxetina (20 a 40 mg/dia);<br>
        - Acompanhamento quinzenal inicial na APS; orientar que a melhora clínica surge após <strong>2 a 4 semanas</strong> de uso contínuo e que efeitos colaterais iniciais (náuseas, cefaleia, aumento transitório de ansiedade) são autolimitados e cessam em 7 a 10 dias.
      </td>
    </tr>
    <tr>
      <td><strong>Depressão Grave</strong></td>
      <td>&ge; 15 pontos</td>
      <td>
        - Indicação formal e imediata de associação: <strong>Farmacoterapia Plena + Psicoterapia Intensiva</strong>;<br>
        - Rastreio ativo e aprofundado de risco de suicídio;<br>
        - Suporte multiprofissional com eMulti e acompanhamento compartilhado ou matriciado com CAPS se refratariedade ou ideação suicida estruturada.
      </td>
    </tr>
  </tbody>
</table>

<h3>3.4 Farmacologia Prática dos Antidepressivos de Primeira Linha no SUS</h3>
<p>O médico de família deve dominar a farmacocinética, indicações e perfis de segurança dos antidepressivos disponíveis na RENAME (Relação Nacional de Medicamentos Essenciais):</p>
<table class="book-table">
  <thead>
    <tr>
      <th>Fármaco / Classe</th>
      <th>Dose Inicial e Faixa Terapêutica</th>
      <th>Vantagens e Perfil de Indicação</th>
      <th>Efeitos Adversos e Contraindicações</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>Sertralina (ISRS)</strong></td>
      <td>Inicial: 25 a 50 mg/dia pela manhã;<br>Manutenção: 50 a 200 mg/dia.</td>
      <td><strong>Perfil de segurança padrão-ouro:</strong> Menor taxa de interações medicamentosas via citocromo P450; <strong>antidepressivo de escolha no cardiopata pós-IAM</strong> (estudo SADHART) e seguro na gestação e lactação.</td>
      <td>Desconforto gastrointestinal transitório (náuseas, diarreia leve), cefaleia nos primeiros dias, disfunção sexual a longo prazo (anorgasmia, retardo ejaculatório).</td>
    </tr>
    <tr>
      <td><strong>Fluoxetina (ISRS)</strong></td>
      <td>Inicial: 20 mg/dia pela manhã;<br>Manutenção: 20 a 60 mg/dia.</td>
      <td>Ação mais ativadora e anorexígena discreta; <strong>meia-vida muito longa de seu metabólito ativo (norfluoxetina de 7 a 14 dias)</strong>, tornando-a ideal para pacientes com adesão irregular que esquecem comprimidos esporádicos (não gera síndrome de descontinuação abrupta).</td>
      <td>Pode piorar insônia e ansiedade inicial se tomada à noite; potente inibidor do CYP2D6 (eleva níveis de outros fármacos); evitar em idosos com perda de peso severa.</td>
    </tr>
    <tr>
      <td><strong>Escitalopram / Citalopram (ISRS)</strong></td>
      <td>Inicial: 10 mg/dia;<br>Manutenção: 10 a 20 mg/dia.</td>
      <td>Inibidor mais seletivo da recaptação de serotonina, excelente tolerabilidade, rápido início de resposta e baixa sedação.</td>
      <td>Risco de <strong>prolongamento do intervalo QTc no ECG</strong> em doses acima de 20 mg/dia de escitalopram ou 40 mg/dia de citalopram (especialmente em idosos com cardiopatia estrutural).</td>
    </tr>
    <tr>
      <td><strong>Amitriptilina / Nortriptilina (Tricíclicos - ADT)</strong></td>
      <td>Inicial: 25 mg à noite;<br>Manutenção: 75 a 150 mg/dia.</td>
      <td>Alta eficácia sedativa em insônia associada; excelente efeito adjuvante em dor neuropática crônica, enxaqueca e fibromialgia. Baixo custo.</td>
      <td><strong>Altíssima carga anticolinérgica:</strong> boca seca, constipação, retenção urinária, ganho de peso; hipotensão postural grave; <strong>cardiotoxicidade com alargamento de QRS e arritmias ventriculares fatais em superdose</strong> (altíssimo risco em pacientes com ideação suicida!); contraindicado em idosos frágeis (Beers).</td>
    </tr>
  </tbody>
</table>

<h3>3.5 Insônia na Atenção Primária: Higiene do Sono e TCC-I</h3>
<p>A insônia é uma das queixas mais comuns na APS e o principal gatilho para a prescrição iatrogênica de benzodiazepínicos. Define-se insônia crônica pela dificuldade em iniciar ou manter o sono, ou despertar precoce matinal, pelo menos <strong>3 noites por semana por &ge; 3 meses</strong>, gerando prejuízo diurno significativo.</p>

<div class="clinical-box highlight">
  <h4>Regras de Ouro da Higiene do Sono e Terapia Cognitivo-Comportamental para Insônia (TCC-I)</h4>
  <ul>
    <li><strong>Manter Horários Regulares de Despertar:</strong> Levantar-se impreterivelmente no mesmo horário todos os dias (inclusive aos finais de semana e feriados), fortalecendo o ciclo circadiano biológico;</li>
    <li><strong>Regra do Quarto e da Cama:</strong> A cama deve ser utilizada <strong>exclusivamente para dormir e para atividade sexual</strong>. Não ler, não assistir televisão, não trabalhar no computador e não alimentar-se na cama;</li>
    <li><strong>A Regra dos 20 Minutos (Controle de Estímulos):</strong> Se não conseguir conciliar o sono após aproximadamente 20 minutos deitado, <strong>levantar-se da cama</strong>, sair do quarto, ir para um ambiente com pouca luz e realizar uma atividade relaxante monótona (ler um livro impresso). Retornar para a cama apenas quando sentir sonolência real;</li>
    <li><strong>Evitar Telas Emissoras de Luz Azul:</strong> Desligar smartphones, tablets, computadores e televisores no mínimo 60 a 90 minutos antes de deitar (a luz azul suprime a secreção fisiológica de melatonina pela glândula pineal);</li>
    <li><strong>Restrição de Substâncias Estimulantes:</strong> Não consumir cafeína (café, chás escuros, refrigerantes à base de cola, energéticos, chocolates) após as 14h ou 16h;</li>
    <li><strong>Mito do Álcool como Sedativo:</strong> Esclarecer que o álcool facilita a indução do sono, porém fragmenta a arquitetura do sono REM e profundo, gerando múltiplos microdespertares e sono não reparador;</li>
    <li><strong>Exercício Físico Diurno:</strong> Praticar atividades físicas preferencialmente pela manhã ou tarde; evitar exercícios aeróbicos extenuantes nas 2 a 3 horas antes de deitar (a elevação da temperatura corporal e tônus simpático impede a indução do sono).</li>
  </ul>
</div>
`
};

export const sec4 = {
  id: "benzodiazepinicos-e-protocolo-de-desprescricao-segura",
  title: "4. Uso Abusivo de Benzodiazepínicos na APS e Protocolo Estruturado de Desprescrição Segura",
  body_html: `
<h3>4.1 A Epidemia Silenciosa dos Benzodiazepínicos na Atenção Básica</h3>
<p>Os <strong>benzodiazepínicos (BZD)</strong> — como clonazepam, diazepam, alprazolam, lorazepam e bromazepam — figuram entre os medicamentos mais prescritos e consumidos cronicamente no Brasil, afetando desproporcionalmente mulheres adultas e pessoas idosas atendidas na rede básica de saúde. Desenvolvidos na década de 1960 como ansiolíticos e hipnóticos com menor risco de letalidade aguda em superdose comparados aos barbitúricos, os BZDs possuem <strong>indicação clínica restrita e legítima apenas para uso em curto prazo (máximo de 2 a 4 semanas)</strong> no controle de crises de ansiedade agudas incapacitantes ou insônia transitória reativa.</p>

<p>Contudo, a rotina dos serviços de saúde perpetuou o chamado 'renovamento mecânico de receitas azuis' sem reavaliação médica continuada, transformando tratamentos agudos em dependências químicas de décadas. Os mecanismos farmacológicos subjacentes explicam essa armadilha:</p>
<ul>
  <li><em>Mecanismo de Ação:</em> Os BZDs são moduladores alostéricos positivos dos receptores GABA-A centrais. Ao se ligarem a sítios específicos entre as subunidades alfa e gama, aumentam a frequência de abertura do canal de cloro induzida pelo GABA, provocando hiperpolarização neuronal generalizada e inibição do SNC.</li>
  <li><em>Tolerância Farmacológica:</em> O uso contínuo por mais de 2 a 4 semanas promove a <em>dessensibilização e internalização (down-regulation) dos receptores GABA-A</em>, exigindo doses progressivamente maiores para alcançar o mesmo efeito ansiolítico ou hipnótico.</li>
  <li><em>Dependência Física e Psíquica Profunda:</em> O indivíduo torna-se incapaz de dormir ou relaxar sem o comprimido, desenvolvendo um pavor irracional de ficar sem a receita ('efeito muleta').</li>
</ul>

<div class="clinical-box highlight">
  <h4>Consequências Clínicas Graves do Uso Crônico de Benzodiazepínicos</h4>
  <ul>
    <li><strong>Declínio Cognitivo e Risco de Demência:</strong> Comprometimento da memória anterógrada, lentificação psicomotora e aumento significativo do risco de desenvolvimento de síndromes demenciais a longo prazo;</li>
    <li><strong>Instabilidade Postural, Quedas e Fraturas:</strong> Em idosos, o relaxamento muscular central e a sedação residual diurna elevam em até 50% a 70% o risco de quedas domiciliares e fraturas catastróficas de fêmur proximal;</li>
    <li><strong>Acidentes Automobilísticos e de Trabalho:</strong> Prejuízo grave no tempo de reação reflexa e na vigilância motora;</li>
    <li><strong>Efeito Paradoxal:</strong> Especialmente em idosos e crianças, os BZDs podem desencadear agitação psicomotora violenta, desinibição comportamental, agressividade e confusão mental aguda (delirium);</li>
    <li><strong>Supressão Respiratória em Pneumopatas:</strong> Agravamento de apneia obstrutiva do sono e retenção de CO2 em portadores de DPOC crônica.</li>
  </ul>
</div>

<h3>4.2 Síndrome de Abstinência Benzodiazepínica Aguda: Os Perigos da Interrupção Abrupta</h3>
<p>Um dos erros clínicos mais perigosos na Atenção Primária é a suspensão súbita e desavisada do benzodiazepínico em usuários crônicos. A retirada abrupta desencadeia a <strong>Síndrome de Abstinência Benzodiazepínica</strong>, potencialmente fatal:</p>

<table class="book-table">
  <thead>
    <tr>
      <th>Gravidade da Abstinência</th>
      <th>Manifestações Clínicas e Sinais de Alarme</th>
      <th>Fisiopatologia Central</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>Sintomas Leves a Moderados</strong></td>
      <td>Ansiedade rebote intensa ('pior que a inicial'), insônia de rebote grave, tremores finos de extremidades, sudorese, taquicardia, palpitações, cefaleia, hiperacusia e hipersensibilidade à luz e toques.</td>
      <td>Desinibição glutamatérica inicial e perda do tônus gabaérgico exógeno.</td>
    </tr>
    <tr>
      <td><strong>Sintomas Graves e Potencialmente Fatais</strong></td>
      <td><strong>Crises convulsivas generalizadas tônico-clônicas</strong> (que podem evoluir para Estado de Mal Epiléptico refratário), <strong>Delirium tremens benzodiazepínico</strong>, alucinações auditivas e táteis, despersonalização, delírios paranoides e instabilidade autonômica com pico hipertensivo e hipertermia.</td>
      <td>Tempestade autonômica e hiperexcitabilidade cortical maciça por supressão abrupta do freio inibitório central.</td>
    </tr>
  </tbody>
</table>

<h3>4.3 Protocolo Estruturado de Desprescrição Segura (Protocolo de Heather Ashton)</h3>
<p>A desprescrição na Atenção Primária deve ser um processo <strong>planejado, gradual, consentido e pactuado em decisão compartilhada com o paciente</strong>, jamais punitivo ou impositivo:</p>

<div class="clinical-box highlight">
  <h4>Etapas Práticas do Protocolo de Desprescrição Gradual na APS</h4>
  <ol>
    <li><strong>1. Construção de Aliança Terapêutica e Psicoeducação:</strong>
      <ul>
        <li>Explicar com empatia e sem julgamento os riscos do medicamento e a diferença entre dependência farmacológica e vício moral;</li>
        <li>Garantir que a medicação <em>não será retirada abruptamente</em> e que o paciente terá controle sobre o ritmo do desmame;</li>
        <li>Tratar comorbidades psiquiátricas subjacentes: se houver transtorno ansioso ou depressivo ativo, <strong>introduzir previamente um antidepressivo seguro (ex.: Sertralina ou Escitalopram)</strong> e aguardar 4 a 6 semanas de remissão dos sintomas antes de iniciar a redução do benzodiazepínico.</li>
      </ul>
    </li>
    <li><strong>2. Conversão para Benzodiazepínico de Meia-Vida Longa (Substituição por Diazepam):</strong>
      <ul>
        <li>Pacientes em uso de BZDs de ação curta ou intermediária e alta potência (como <strong>Alprazolam, Lorazepam ou Clonazepam</strong>) apresentam flutuações plasmáticas bruscas que geram picos de ansiedade entre as doses diárias, dificultando o desmame;</li>
        <li>Converte-se a dose total diária para o equivalente em <strong>Diazepam</strong> (que possui meia-vida de eliminação longa de 24 a 48h com metabólitos ativos de até 100h, proporcionando níveis plasmáticos extremamente estáveis sem sintomas de retirada entre as tomadas).</li>
        <li><em>Tabela de Equivalência de Doses:</em>
          <br><strong>Diazepam 10 mg &asymp; Clonazepam 0,5 mg &asymp; Alprazolam 0,5 mg &asymp; Lorazepam 1 mg &asymp; Bromazepam 6 mg</strong>.
        </li>
      </ul>
    </li>
    <li><strong>3. Esquema de Redução Gradual de Doses:</strong>
      <ul>
        <li>Reduzir cerca de <strong>10% a 25% da dose total a cada 2 a 4 semanas</strong>;</li>
        <li>À medida que a dose diminui, a velocidade de desmame deve ser ainda mais lenta (as últimas etapas são as mais difíceis fisiologicamente);</li>
        <li>A duração total do desmame habitualmente varia de <strong>8 semanas a 6 meses</strong> (ou até 1 ano em dependências de mais de 10-20 anos de duração);</li>
        <li>Utilizar apresentações em gotas (solução oral) para permitir reduções milimétricas fracionadas quando os comprimidos não permitirem partição segura.</li>
      </ul>
    </li>
    <li><strong>4. Suporte Psicológico e Manejo de Sintomas Intercorrentes:</strong>
      <ul>
        <li>Consultas frequentes de retorno (quinzenais ou mensais) para reforço positivo e validação do progresso;</li>
        <li>Se surgirem sintomas moderados de abstinência, <em>manter a dose atual por mais 2 semanas até estabilização</em>, sem retroceder ou aumentar doses;</li>
        <li>Oferecer suporte com técnicas de relaxamento muscular progressivo e mindfulness pela equipe eMulti.</li>
      </ul>
    </li>
  </ol>
</div>

<h3>4.4 As Drogas 'Z' (Zolpidem, Zopiclona, Eszopiclona): O Mito da Segurança Absoluta</h3>
<p>Frequentemente promovidos pela indústria farmacêutica e prescritos por médicos como alternativas 'inócuas e não viciantes' aos benzodiazepínicos, os hipnóticos do grupo 'Z' (com destaque absoluto para o <strong>Zolpidem</strong>) tornaram-se uma nova epidemia de dependência na atenção primária. O zolpidem atua seletivamente na subunidade alfa-1 do receptor GABA-A:</p>
<ul>
  <li><em>Riscos Idênticos aos Benzodiazepínicos:</em> Provoca tolerância em poucas semanas de uso contínuo, dependência física profunda, abstinência com insônia de rebote excruciante e risco de convulsões se interrompido subitamente;</li>
  <li><em>Comportamentos Complexos do Sono e Sonambulismo:</em> Forte propensão a induzir episódios de amnésia anterógrada associada a <strong>comportamentos motores complexos inconscientes</strong> (preparar e comer refeições inteiras durante a noite sem se lembrar, compras compulsivas pela internet, dirigir automóveis sob efeito do remédio e desinibição sexual grave com risco de acidentes e violência);</li>
  <li><em>Desprescrição do Zolpidem:</em> Segue o mesmo rigor escalonado de desmame lento (redução semanal ou quinzenal de 2,5 mg a 5 mg) acompanhado de psicoterapia TCC-I.</li>
</ul>
`
};
