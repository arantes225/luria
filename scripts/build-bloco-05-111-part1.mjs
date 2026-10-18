// scripts/build-bloco-05-111-part1.mjs
// Aula 111: Doença Renal Crônica (DRC) - Parte 1: Seções 1 a 4

export const sec1 = {
  id: 'definicao-kdigo-estadiamento-ckd-epi-2021',
  title: '1. Definição Conceitual KDIGO, Estadiamento Prognóstico G1-G5 / A1-A3 e Equação CKD-EPI 2021',
  body_html: `
<h3>Conceito Unificado e Critérios Diagnósticos Internacionais (KDIGO 2012 / 2024)</h3>
<p>A <strong>Doença Renal Crônica (DRC)</strong> é definida formalmente pelas diretrizes internacionais do <em>Kidney Disease: Improving Global Outcomes (KDIGO)</em> como a presença de <strong>anormalidades estruturais ou funcionais dos rins, presentes por um período superior a 3 meses (&gt; 90 dias)</strong>, com implicações diretas e mensuráveis para a saúde do indivíduo. A exigência cronológica de persistência temporal por no mínimo 90 dias é o pilar semiológico fundamental para diferenciar a DRC da Lesão Renal Aguda (LRA) e das afecções subagudas autolimitadas.</p>

<p>Para o diagnóstico definitivo de Doença Renal Crônica, o paciente deve apresentar <strong>pelo menos um</strong> dos seguintes critérios clínicos, laboratoriais, histológicos ou de imagem mantidos por mais de 3 meses:</p>
<ol>
  <li><strong>Marcadores de Dano Renal Estrutural ou Parenquimatoso (um ou mais):</strong>
    <ul>
      <li><strong>Albuminúria Persistente Elevada:</strong> Razão Albumina/Creatinina Urinária (RAC) em amostra isolada de urina <strong>$\ge 30$ mg/g de creatinina ($\ge 3$ mg/mmol)</strong> ou excreção urinária de albumina em urina de 24 horas $\ge 30$ mg/24h;</li>
      <li><strong>Anormalidades no Sedimento Urinário:</strong> Hematúria glomerular microscópica persistente (com hemácias dismórficas ou cilindros hemáticos), leucocitúria estéril crônica associada a nefropatias tubulointersticiais crônicas ou cilindros granulosos céreos;</li>
      <li><strong>Distúrbios Eletrolíticos e Tubulares Renais:</strong> Síndromes espoliadoras de potássio ou magnésio, acidose tubular renal (ATR tipos 1, 2 ou 4) ou glicosúria renal normoglicêmica secundária a lesão tubular congênita ou adquirida;</li>
      <li><strong>Anormalidades Histológicas Diagnosticadas por Biópsia Renal:</strong> Glomeruloesclerose segmentar e focal (GESF), nefropatia membranosa, nefrite lúpica crônica, esclerose vascular arteriolar grave ou fibrose intersticial com atrofia tubular avançada (IFTA);</li>
      <li><strong>Anormalidades Estruturais Detectadas por Exames de Imagem:</strong> Rins com dimensões reduzidas e perda da diferenciação cortiçomedular ao ultrassom, rins policísticos bilaterais volumosos (Doença Renal Policística Autossômica Dominante - DRPAD), estenose crítica de artéria renal, cicatrizes corticais secundárias a refluxo vesicoureteral crônico ou hidronefrose obstrutiva crônica;</li>
      <li><strong>Histórico de Transplante Renal Prévio:</strong> Todo receptor de aloenxerto renal é classificado por definição como portador de DRC crônica (categoria de base com risco imunológico contínuo).</li>
    </ul>
  </li>
  <li><strong>Redução da Taxa de Filtração Glomerular Estimada (TFGe):</strong>
    <ul>
      <li><strong>TFGe $&lt; 60$ mL/min/1,73 m²</strong> mantida por período <strong>$&gt; 3$ meses</strong>, <em>com ou sem outros marcadores de dano renal concomitantes</em>.</li>
    </ul>
  </li>
</ol>

<p><strong>A Regra de Ouro dos 60 mL/min/1,73 m²:</strong> Em um indivíduo que apresente TFGe de 52 mL/min/1,73 m² persistente por mais de 3 meses, o diagnóstico de Doença Renal Crônica é firmado formalmente, <em>mesmo que o ultrassom renal seja rigorosamente normal e a urina não contenha nenhuma proteína ou alteração de sedimento</em>. Por outro lado, um indivíduo com TFGe normal de 105 mL/min/1,73 m² que apresente RAC urinária de 180 mg/g mantida por 4 meses <em>também tem Doença Renal Crônica</em> (Estágio G1A2).</p>

<h3>O Sistema Bidimensional de Classificação e Estadiamento Prognóstico: G1-G5 e A1-A3</h3>
<p>O consenso KDIGO estabeleceu a matriz bidimensional de estadiamento que combina a categoria da Taxa de Filtração Glomerular (letra <strong>G</strong>) com a categoria de Albuminúria persistente (letra <strong>A</strong>). Esta combinação fornece uma predição fidedigna do risco cumulativo de progressão para doença renal terminal dialítica, mortalidade cardiovascular por todas as causas e complicações sistêmicas:</p>

<table class="book-table">
  <thead>
    <tr>
      <th>Categoria G (TFGe)</th>
      <th>Faixa de TFGe (mL/min/1,73 m²)</th>
      <th>Denominação Clínica e Significado Fisiopatológico</th>
      <th>Conduta Clínica e Frequência de Monitorização</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>G1</strong></td>
      <td><strong>$\ge 90$</strong></td>
      <td>Filtração Glomerular Normal ou Elevada (Hiperfiltração). Diagnóstico de DRC exige dano renal estrutural/albuminúria concomitante.</td>
      <td>Rastreamento de fatores de risco cardiovasculares e nefroproteção precoce. Monitorar 1x ao ano.</td>
    </tr>
    <tr>
      <td><strong>G2</strong></td>
      <td><strong>60 a 89</strong></td>
      <td>Redução Leve da TFG. Também exige marcador de dano estrutural persistente $> 3$ meses para firmar DRC.</td>
      <td>Controle rigoroso de PA e glicemia; manejo de albuminúria. Monitorar 1x ao ano.</td>
    </tr>
    <tr>
      <td><strong>G3a</strong></td>
      <td><strong>45 a 59</strong></td>
      <td>Redução Leve a Moderada da TFG. Diagnosticador autônomo de DRC independe de albuminúria.</td>
      <td>Ajuste posológico de drogas de excreção renal; nefroproteção com iSGLT2 e bloqueadores SRAA. Monitorar 1 a 2x/ano.</td>
    </tr>
    <tr>
      <td><strong>G3b</strong></td>
      <td><strong>30 a 44</strong></td>
      <td>Redução Moderada a Grave da TFG. Início de manifestações endócrinas e metabólicas (anemia, DMO-DRC inicial).</td>
      <td>Avaliação seriada de PTH, fósforo, cálcio, bicarbonato e hemograma. Monitorar 2 a 3x/ano.</td>
    </tr>
    <tr>
      <td><strong>G4</strong></td>
      <td><strong>15 a 29</strong></td>
      <td>Redução Grave da TFG. Síndrome pré-urêmica e distúrbios metabólicos francos.</td>
      <td><strong>Encaminhamento obrigatório ao Nefrologista</strong>; planejamento e preparo de acesso vascular definitivo (FAV). Monitorar a cada 2-3 meses.</td>
    </tr>
    <tr>
      <td><strong>G5</strong></td>
      <td><strong>$&lt; 15$</strong></td>
      <td>Falência Renal / Doença Renal Crônica Terminal.</td>
      <td>Início oportuno de Terapia Renal Substitutiva (Hemodiálise, Diálise Peritoneal) ou Transplante Renal preemptivo.</td>
    </tr>
  </tbody>
</table>

<table class="book-table">
  <thead>
    <tr>
      <th>Categoria A (Albuminúria)</th>
      <th>Razão Albumina/Creatinina Urinária (RAC)</th>
      <th>Albuminúria em Urina de 24h</th>
      <th>Significado Clínico e Risco Vascular</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>A1</strong></td>
      <td><strong>$&lt; 30$ mg/g</strong> ($&lt; 3$ mg/mmol)</td>
      <td>$&lt; 30$ mg/24 horas</td>
      <td>Normal a discretamente aumentada. Menor taxa relativa de eventos adversos renais e coronarianos.</td>
    </tr>
    <tr>
      <td><strong>A2</strong></td>
      <td><strong>30 a 300 mg/g</strong> (3 a 30 mg/mmol)</td>
      <td>30 a 300 mg/24 horas</td>
      <td><strong>Aumento Moderado (antiga Microalbuminúria)</strong>. Marcador primário de disfunção endotelial sistêmica e dano capilar glomerular precoce. Risco cardiovascular significativamente elevado.</td>
    </tr>
    <tr>
      <td><strong>A3</strong></td>
      <td><strong>$&gt; 300$ mg/g</strong> ($&gt; 30$ mg/mmol)</td>
      <td>$&gt; 300$ mg/24 horas</td>
      <td><strong>Aumento Severo (antiga Macroalbuminúria)</strong>. Inclui a faixa nefrótica ($RAC > 2.200$ mg/g ou $> 3.500$ mg/24h). Risco extremo de perda rápida de TFG e óbito cardiovascular.</td>
    </tr>
  </tbody>
</table>

<h3>A Equação Oficial de Filtração Glomerular: CKD-EPI 2021 sem Ajuste Racial</h3>
<p>Durante mais de uma década, a estimativa da TFG baseava-se na equação CKD-EPI 2009, que incluía um coeficiente multiplicador positivo de 1,159 para indivíduos autodeclarados negros. Essa inclusão gerava distorções diagnósticas graves, superestimando a função renal e retardando o encaminhamento nefrológico e a listagem para transplante renal nessa população vulnerável.</p>
<p>Em 2021, a <em>National Kidney Foundation (NKF)</em> e a <em>American Society of Nephrology (ASN)</em> publicaram a <strong>Equação CKD-EPI 2021 Creatinina (Refit sem raça)</strong>, adotada oficialmente pelo KDIGO 2024 e pela Sociedade Brasileira de Nefrologia (SBN):</p>
<div class="formula-box">
  <p><strong>Equação CKD-EPI 2021 (Creatinina):</strong></p>
  <p>$$TFGe = 142 \times \min\left(\frac{Cr}{k}, 1\right)^\alpha \times \max\left(\frac{Cr}{k}, 1\right)^{-1,200} \times 0,9938^{\text{Idade}} \times [1,012\ \text{se mulher}]$$</p>
  <p><em>Onde:</em></p>
  <ul>
    <li>Para mulheres: $k = 0,7$; $\alpha = -0,241$; fator multiplicador de sexo = $1,012$;</li>
    <li>Para homens: $k = 0,9$; $\alpha = -0,302$; fator multiplicador de sexo = $1,000$;</li>
    <li>$Cr$ = creatinina sérica expressa em mg/dL; Idade expressa em anos completos;</li>
    <li><strong>Não há nenhum coeficiente ou modificador racial na equação.</strong></li>
  </ul>
</div>

<p><strong>Papel Adicional da Cistatina C (CKD-EPI 2021 Creatinina-Cistatina C):</strong> A cistatina C é uma proteína de baixo peso molecular produzida de forma constante por todas as células nucleadas do organismo e metabolizada exclusivamente no túbulo proximal. Não depende de massa muscular, atividade física ou dieta cárnea. A dosagem de cistatina C e o cálculo da equação combinada creatinina-cistatina C são formalmente recomendados para <strong>confirmar o diagnóstico de DRC em pacientes limítrofes (TFGe entre 45 e 59 mL/min sem albuminúria)</strong>, idosos fragilizados sarcopênicos, atletas fisiculturistas com grande massa muscular, amputados e portadores de doenças neuromusculares degenerativas.</p>
`
};

export const sec2 = {
  id: 'fisiopatologia-hiperfiltracao-progressao-fibrotica',
  title: '2. Fisiopatologia da Hiperfiltração Adaptativa de Brenner e Mecanismos da Progressão Fibrótica',
  body_html: `
<h3>A Hipótese Nefrônica de Brenner: O Paradoxo da Sobrecarga Hemodinâmica</h3>
<p>Um dos marcos conceituais mais brilhantes da medicina interna contemporânea foi elucidado por Barry M. Brenner na década de 1980: o mecanismo universal pelo qual qualquer nefropatia crônica primária (seja ela nefropatia diabética, nefroesclerose hipertensiva, glomerulonefrite primária ou perda cirúrgica de massa renal), uma vez ultrapassado um limiar crítico de perda de néfrons, <strong>torna-se progressiva e autossustentada</strong>, mesmo que a doença etiológica inicial tenha sido curada ou controlada.</p>

<p><strong>A Cascata da Hiperfiltração Glomerular Adaptativa:</strong></p>
<ol>
  <li><strong>Perda Inicial de Néfrons Funcionantes:</strong> A agressão primária destrói uma fração da população original de aproximadamente 1 a 1,2 milhão de néfrons por rim. Para preservar a homeostase global e a depuração de ureia, o organismo deflagra mecanismos adaptativos hemodinâmicos nos néfrons remanescentes sobreviventes;</li>
  <li><strong>Vasodilatação Marcada da Arteríola Aferente:</strong> Ocorre vasodilatação preferencial da arteríola aferente (mediada por óxido nítrico e prostaglandinas), permitindo que uma fração maior da pressão arterial sistêmica seja transmitida diretamente para o tufo capilar glomerular;</li>
  <li><strong>Vasoconstrição da Arteríola Eferente Mediada por Angiotensina II:</strong> A ativação intrarrenal exacerbada do sistema renina-angiotensina-aldosterona (SRAA) promove intensa contração da arteríola eferente de saída;</li>
  <li><strong>Hipertensão Intraglomerular e Hiperfiltração Nefrônica:</strong> O descompasso entre vasodilatação de entrada e vasoconstrição de saída eleva vertiginosamente a <strong>pressão hidrostática intracapilar glomerular ($P_{CG}$)</strong> e o fluxo plasmático por néfron ($SNGFR$). O néfron sobrevivente dobra sua carga de filtração individual;</li>
  <li><strong>Dano Mecânico e Tensão de Cisalhamento sobre os Podócitos:</strong> O estiramento mecânico crônico das alças capilares submetidas à hiperpressão provoca alargamento dos pedicelos podocitários, ruptura dos diafragmas de fenda (<em>slit diaphragms</em>) e desprendimento podocitário (podocitopenia irreversível), uma vez que os podócitos são células terminalmente diferenciadas incapazes de replicação mitótica eficaz;</li>
  <li><strong>Albuminúria e Toxicidade Tubular Direta:</strong> A perda da barreira de tamanho e carga elétrica glomerular permite a passagem massiva de albumina e macromoléculas para a luz tubular. A reabsorção excessiva de proteínas pelas células do túbulo proximal sobrecarrega a via lisossomal e ativa fatores de transcrição pró-inflamatórios nucleares (como o NF-$\kappa$B), deflagrando a secreção paracrina de citocinas inflamatórias no interstício renal;</li>
  <li><strong>Fibrose Tubulointersticial Progressiva e Glomeruloesclerose:</strong> O TGF-$\beta_1$, PDGF e a endotelina-1 ativam a diferenciação de fibroblastos e pericitos em miofibroblastos contráteis, depositando matriz extracelular densa de colágeno, colabando capilares peritubulares e destruindo progressivamente os néfrons remanescentes em um ciclo vicioso de falência nefrônica progressiva.</li>
</ol>

<h3>A Albuminúria como Toxina Renal e Marcador Substituto de Perda Nefrônica</h3>
<p>A albuminúria não é um mero marcador espectador de lesão de membrana; ela é um <strong>agente tóxico direto sobre o epitélio tubular</strong>. O grau de albuminúria correlaciona-se de forma estrita e linear com a velocidade de declínio anual da TFGe (normalmente $&lt; 1$ mL/min/1,73 m²/ano no envelhecimento fisiológico saudável, mas acelerado para $5$ a $12$ mL/min/ano em pacientes com nefropatia diabética descompensada e albuminúria severa $A3$). A redução da albuminúria constitui o alvo terapêutico nefroprotetor primordial da nefrologia moderna.</p>
`
};

export const sec3 = {
  id: 'pilares-nefroprotecao-farmacoterapia-moderna',
  title: '3. Os Pilares Modernos da Nefroproteção: iSGLT2, Bloqueio do SRAA, Agonistas GLP-1 e Finerenona',
  body_html: `
<h3>A Revolução Quádrupla da Nefroproteção Baseada em Ensaios Clínicos</h3>
<p>O paradigma terapêutico da Doença Renal Crônica passou por uma transformação histórica nos últimos cinco anos. O manejo clássico, restrito ao controle pressórico e inibição do SRAA com IECA ou BRA, evoluiu para uma <strong>terapia quádrupla combinada modificadora de desfecho renal e cardiovascular</strong>, validada pelos maiores ensaios clínicos globais (DAPA-CKD, EMPA-KIDNEY, CREDENCE, FIDELIO-DKD, FIGARO-DKD e FLOW):</p>

<h3>1. Inibidores do Co-transportador Sódio-Glicose 2 (iSGLT2) — Dapagliflozina e Empagliflozina</h3>
<p>Os iSGLT2 consagraram-se como o <strong>pilar farmacológico nefroprotetor mais revolucionário do século XXI</strong>. O benefício independe da presença de diabetes mellitus:</p>
<ul>
  <li><strong>Mecanismo Hemodinâmico Renal Específico:</strong> Em condições patológicas de hiperfiltração, a absorção proximal excessiva de sódio e glicose reduz o aporte de cloreto de sódio à mácula densa (no túbulo distal inicial). A mácula densa interpreta erroneamente esse baixo aporte como hipoperfusão sistêmica e inibe a liberação de adenosina, provocando vasodilatação inadequada da arteríola aferente. Ao inibir o SGLT2 no túbulo contorcido proximal, as gliflozinas <strong>aumentam a entrega de sódio e cloreto à mácula densa</strong>, ativando vigorosamente o <strong>feedback tubuloglomerular</strong>. A liberação local de adenosina induz <strong>vasoconstrição fisiológica da arteríola aferente</strong>, normalizando a pressão hidrostática intraglomerular e abolindo a hiperfiltração mecânica deletéria;</li>
  <li><strong>O Fenômeno do "Dip" Inicial da TFGe:</strong> Nas primeiras 2 a 4 semanas de uso de iSGLT2, observa-se uma redução fisiológica esperada e benigna da TFGe de <strong>$2$ a $5$ mL/min/1,73 m² (queda de 10% a 20%)</strong>. Esse "dip" hemodinâmico reflete o alívio imediato da hiperpressão intraglomerular e <strong>NÃO denota toxicidade renal</strong>; após essa acomodação inicial, a curva de perda anual da TFG é drasticamente atenuada (protegendo o rim a longo prazo). O medicamento <em>não deve ser suspenso</em> frente a essa oscilação inicial;</li>
  <li><strong>Evidências Clínicas Robustas:</strong>
    <ul>
      <li><em>DAPA-CKD (2020):</em> Dapagliflozina 10 mg/dia reduziu em 39% o desfecho composto renal de perda sustentada $\ge 50\%$ da TFG, falência renal terminal ou óbito por causas renais ou cardiovasculares em pacientes com e sem DM2 portadores de TFGe de 25 a 75 mL/min e RAC de 200 a 5.000 mg/g;</li>
      <li><em>EMPA-KIDNEY (2023):</em> Empagliflozina 10 mg/dia demonstrou benefício nefroprotetor consistente incluindo pacientes com TFGe de até 20 mL/min e mesmo naqueles sem albuminúria;</li>
    </ul>
  </li>
  <li><strong>Prescrição Prática e Regra de Segurança:</strong>
    <ul>
      <li>Iniciar <strong>Dapagliflozina 10 mg VO 1x/dia</strong> ou <strong>Empagliflozina 10 mg VO 1x/dia</strong> para pacientes com DRC e TFGe $\ge 20$ mL/min/1,73 m² associada a albuminúria $A2$ ou $A3$;</li>
      <li>Uma vez iniciada com TFGe $\ge 20$, a droga pode ser mantida até o início da diálise ou transplante;</li>
      <li>Orientação de higiene urogenital mandatória (prevenção de candidíase vulvovaginal e balanopostite fúngica) e suspensão temporária em dias de grandes cirurgias ou jejum prolongado (prevenção de cetoacidose diabética euglicêmica).</li>
    </ul>
  </li>
</ul>

<h3>2. Bloqueadores do Sistema Renina-Angiotensina-Aldosterona (IECA ou BRA)</h3>
<p>Historicamente a primeira linha formal de nefroproteção com benefício comprovado em ensaios pioneiros (RENAAL, IDNT):</p>
<ul>
  <li><strong>Mecanismo Hemodinâmico:</strong> Bloqueiam a síntese (IECA: enalapril, ramipril, lisinopril) ou a ação no receptor AT1 (BRA: losartana, valsartana, candesartana) da Angiotensina II, promovendo <strong>vasodilatação seletiva da arteríola eferente</strong>, o que reduz a pressão intraglomerular e a albuminúria;</li>
  <li><strong>Regra Fundamental de Prescrição: NUNCA ASSOCIAR IECA + BRA:</strong> Grandes ensaios clínicos (ONTARGET, ALTITUDE) demonstraram que a dupla inibição simultânea do SRAA com IECA somado a BRA (ou inibidor direto de renina alisquireno) <strong>não oferece benefício nefroprotetor adicional</strong> e aumenta dramaticamente o risco de hipercalemia grave refratária, LRA hemodinâmica e óbito;</li>
  <li><strong>Monitorização de Segurança (Regra dos 30%):</strong> Deve-se dosar potássio sérico e creatinina 1 a 2 semanas após iniciar ou titular a dose. <strong>Um aumento de creatinina sérica de até 30% em relação ao basal é clinicamente tolerável e esperado</strong> (reflete a vasodilatação eferente descompressiva). O IECA/BRA só deve ser suspenso ou reduzido se a elevação da creatinina superar 30% ou se o potássio sérico persistir $> 5,5$ mEq/L refratário a medidas dietéticas e diuréticos.</li>
</ul>

<h3>3. Antagonistas do Receptor Mineralocorticoide Não Esteroidais (Finerenona)</h3>
<p>A aldosterona atua no receptor mineralocorticoide promovendo não apenas retenção de sódio, mas inflamação vascular, estresse oxidativo e fibrose tecidual renal e miocárdica:</p>
<ul>
  <li><strong>Limitação dos Antagonistas Clássicos (Espironolactona):</strong> A espironolactona é um antagonista esteroidal de longa meia-vida com alto risco de hipercalemia severa em portadores de DRC com TFG deprimida, além de efeitos antiandrogênicos (ginecomastia dolorosa e disfunção erétil);</li>
  <li><strong>A Inovação da Finerenona:</strong> A finerenona é um <strong>antagonista não esteroidal altamente seletivo</strong> do receptor mineralocorticoide, com distribuição tecidual equilibrada entre coração e rim e menor meia-vida, apresentando potente ação anti-inflamatória e antifibrótica com incidência significativamente menor de hipercalemia;</li>
  <li><strong>Evidências Clínicas (FIDELIO-DKD e FIGARO-DKD):</strong> Em pacientes diabéticos tipo 2 com DRC em uso de dose máxima tolerada de IECA ou BRA, a Finerenona (10 a 20 mg/dia) reduziu significativamente desfechos combinados renais (queda $\ge 40\%$ da TFG ou falência renal) e eventos cardiovasculares maiores (infarto, AVC e internação por insuficiência cardíaca);</li>
  <li><strong>Critérios de Segurança:</strong> Exige dosagem sérica prévia de potássio: só pode ser iniciada se <strong>$K^+ \le 4,8$ mEq/L</strong> (se $K^+ > 5,0$, não iniciar); monitorar potássio sérico no primeiro mês e a cada 4 meses.</li>
</ul>

<h3>4. Agonistas do Receptor de GLP-1 (Semaglutida) — O Estudo FLOW</h3>
<p>O ensaio clínico global <strong>FLOW (2024)</strong> avaliou o uso de <strong>Semaglutida 1,0 mg subcutânea semanal</strong> em pacientes diabéticos tipo 2 com DRC estabelecida de alto risco (TFGe de 25 a 75 mL/min associada a albuminúria A2/A3). O estudo foi interrompido precocemente por eficácia esmagadora:</p>
<ul>
  <li>Redução de <strong>24% no risco relativo do desfecho primário composto renal</strong> (progressão para falência renal, perda $\ge 50\%$ da TFG e morte por causas renais ou cardiovasculares);</li>
  <li>Redução de 20% na mortalidade por todas as causas e desaceleração consistente do declínio anual da taxa de filtração glomerular;</li>
  <li>Indicação formal respaldada pela ADA e KDIGO como droga modificadora de sobrevida na DRC diabética.</li>
</ul>

<h3>Metas de Pressão Arterial e Controle Glicêmico</h3>
<ul>
  <li><strong>Pressão Arterial (Diretrizes KDIGO 2021/2024):</strong> Em pacientes adultos com DRC, a meta preconizada é <strong>Pressão Arterial Sistólica (PAS) $&lt; 120$ mmHg</strong>, quando tolerada, avaliada por medida padronizada de consultório (AOBP - medida oscilométrica automatizada seriada);</li>
  <li><strong>Controle Glicêmico:</strong> Meta individualizada de <strong>HbA1c entre 6,5% e 8,0%</strong>; em pacientes em estágios avançados G4-G5 ou com alto risco de hipoglicemia severa, alvos menos rígidos (HbA1c ~ 7,5% a 8,0%) são mais seguros devido à redução da depuração renal de insulina e menor gliconeogênese renal.</li>
</ul>
`
};

export const sec4 = {
  id: 'manejo-sindrome-uremica-dmo-anemia-disturbios-eletroliticos',
  title: '4. Manejo Clínico da Síndrome Urêmica: DMO-DRC, Anemia, Acidose Metabólica e Sobrecarga Hídrica',
  body_html: `
<h3>O Espectro da Síndrome Urêmica e as Complicações Crônicas da DRC</h3>
<p>À medida que a massa nefrônica funcionante declina abaixo de 30 a 45 mL/min/1,73 m² (estágios G3b a G5), instalam-se distúrbios multissistêmicos complexos decorrentes da perda das funções exócrinas (filtração e excreção) e endócrinas dos rins:</p>

<h3>1. Distúrbio Mineral e Ósseo da DRC (DMO-DRC) e Hiperparatireoidismo Secundário (HPTS)</h3>
<p>O DMO-DRC é uma desordem sistêmica do metabolismo mineral que envolve alterações bioquímicas séricas (cálcio, fósforo, PTH e vitamina D), anormalidades da remodelação e mineralização óssea (osteodistrofia renal) e calcificação vascular e de tecidos moles:</p>
<ul>
  <li><strong>Fisiopatologia da Cascata do HPTS:</strong>
    <ol>
      <li><strong>Retenção de Fósforo e Hiperfosfatemia:</strong> A queda da filtração glomerular reduz a excreção líquida de fosfato. Para compensar, os osteócitos secretam precocemente o <strong>Fator de Crescimento de Fibroblastos 23 (FGF-23)</strong> associado ao co-receptor tecidual <em>Klotho</em>, que induz fosfatúria nos túbulos remanescentes;</li>
      <li><strong>Deficiência de Calcitriol (1,25-dihidroxivitamina D3):</strong> Níveis séricos extremamente elevados de FGF-23 inibem a enzima renal <strong>1-$\alpha$-hidroxilase</strong> (CYP27B1) no túbulo proximal, colapsando a conversão da 25-hidroxivitamina D na forma biologicamente ativa: o calcitriol. Sem calcitriol, a absorção intestinal de cálcio despenca, induzindo hipocalcemia iônica;</li>
      <li><strong>Hipertrofia e Hiperplasia das Paratireoides:</strong> A combinação de <em>hipocalcemia iônica</em>, <em>hiperfosfatemia direta</em> e <em>falta de ativação dos receptores de vitamina D (VDR) e de cálcio (CaSR)</em> estimula a transcrição e secreção massiva de <strong>Hormônio Paratireoidiano (PTH)</strong> pelas quatro glândulas paratireoides. Instala-se o <strong>Hiperparatireoidismo Secundário (HPTS)</strong>;</li>
      <li><strong>Osteíte Fibrosa Cística e Calcificação Vascular:</strong> O PTH excessivo promove reabsorção osteoclástica descontrolada, com substituição do tecido ósseo por fibrose peritrabecular e microfraturas (doença óssea de alto turnover). Além disso, o produto fosfocálcico elevado ($Cálcio \times Fósforo > 55\text{ mg}^2/\text{dL}^2$) induz diferenciação osteoblástica das células musculares lisas da túnica média das artérias (Arteriolopatia Calcificante Urêmica / Calcifilaxia e Esclerose de Mönckeberg), elevando a rigidez arterial e o risco de infarto agudo do miocárdio e AVC.</li>
    </ol>
  </li>
  <li><strong>Manejo Farmacológico do DMO-DRC:</strong>
    <ul>
      <li><strong>Controle Dietético de Fósforo:</strong> Restrição dietética para 800 a 1.000 mg/dia, priorizando a eliminação de alimentos industrializados ultraprocessados com aditivos de fósforo inorgânico (refrigerantes escuros à base de cola, embutidos, queijos processados), cuja absorção intestinal é próxima de 100%;</li>
      <li><strong>Quelantes Intestinais de Fósforo:</strong> Administrados <em>obrigatoriamente junto às principais refeições</em> para quelar o fósforo alimentar na luz gastrointestinal e eliminá-lo nas fezes:
        <ul>
          <li><em>Quelantes Não Cálcicos (Sevelamer / Carbonato de Sevelamer):</em> Polímero sintético que não contém cálcio nem alumínio. É o <strong>quelante de primeira escolha</strong> em pacientes hipercalcêmicos ($Ca > 10,2$ mg/dL), com evidência de calcificação vascular na radiografia/tomografia ou com PTH suprimido (risco de doença óssea adinâmica);</li>
          <li><em>Quelantes Cálcicos (Carbonato de Cálcio e Acetato de Cálcio):</em> Baixo custo e alta disponibilidade no SUS. O acetato de cálcio quela mais fósforo com menor sobrecarga elementar de cálcio que o carbonato. <strong>Limitação:</strong> Não devem ser prescritos se o paciente já apresentar hipercalcemia ou calcificação vascular periférica; dose máxima diária de cálcio elementar quelante não deve exceder 1.500 mg/dia;</li>
        </ul>
      </li>
      <li><strong>Reposição de Calcitriol e Ativadores do VDR (Paricalcitol):</strong> Indicados quando o PTH sérico permanece acima da meta alvo e o paciente não apresenta hiperfosfatemia grave descontrolada nem hipercalcemia. O calcitriol suprime diretamente a transcrição do gene do PTH na paratireoide;</li>
      <li><strong>Calcimiméticos (Cinacalcet e Etelcalcetida):</strong> Agentes alostéricos que aumentam a sensibilidade do Receptor Sensível ao Cálcio (CaSR) na superfície das células principais da paratireoide. Reduzem o PTH de forma potente <strong>enquanto reduzem concomitantemente o cálcio sérico e o fósforo</strong> (não aumentam o risco de calcificação vascular). Droga de escolha no paciente dialítico com HPTS grave associado a cálcio sérico no limite superior ou elevado;</li>
      <li><strong>Paratireoidectomia Subtotal ou Total com Autoimplante:</strong> Indicada no HPTS refratário ao tratamento clínico máximo com PTH persistentemente $> 800$ a $1.000$ pg/mL associado a dor óssea intratável, prurido urêmico incoercível, calcifilaxia ou hipercalcemia severa.</li>
    </ul>
  </li>
</ul>

<h3>2. Anemia da Doença Renal Crônica</h3>
<p>Caracteriza-se tipicamente como uma <strong>anemia normocítica e normocrômica</strong> decorrente primordialmente da <strong>deficiência relativa e absoluta da produção renal de Eritropoietina (EPO)</strong> pelas células peritubulares do córtex renal profundo, associada à inflamação crônica urêmica:</p>
<ul>
  <li><strong>Fisiopatologia Complementar:</strong>
    <ul>
      <li><em>Deficiência de Eritropoietina:</em> A perda da massa de fibroblastos intersticiais peritubulares impede a secreção de EPO em resposta à hipóxia tecidual;</li>
      <li><em>Sobrecarga de Hepcidina e Aprisionamento de Ferro:</em> O estado microinflamatório crônico da uremia estimula a secreção hepática de <strong>Hepcidina</strong>. A hepcidina degrada a <em>ferroportina</em> nos enterócitos e macrófagos, bloqueando a absorção intestinal de ferro e impedindo a liberação do ferro estocado no sistema reticuloendotelial (ferropenia funcional / anemia de doença crônica);</li>
      <li><em>Redução da Meia-Vida das Hemácias:</em> As toxinas urêmicas promovem eriptose prematura, encurtando a sobrevida dos eritrócitos de 120 para 60 a 90 dias;</li>
    </ul>
  </li>
  <li><strong>Manejo da Reposição Marcial (Ferro) — A Regra Pré-EPO:</strong>
    <p>Antes de iniciar qualquer agente estimulador da eritropoiese (alfaepoetina), o paciente <strong>deve ter seus estoques de ferro obrigatoriamente repostos</strong>. Aplicar EPO em paciente com ferropenia acarreta eritropoiese ineficaz com falha terapêutica:</p>
    <ul>
      <li><strong>Alvos Laboratoriais KDIGO de Ferro:</strong>
        <ul>
          <li><strong>Saturação de Transferrina (SatTransf):</strong> Manter entre <strong>20% e 50%</strong> (se $< 20\%$, reposição de ferro é mandatória);</li>
          <li><strong>Ferritina Sérica:</strong> Manter entre <strong>100 e 500 ng/mL</strong> em pacientes não dialíticos (G3-G5), e entre <strong>200 e 500 ng/mL</strong> em pacientes em hemodiálise (G5D);</li>
        </ul>
      </li>
      <li><strong>Via de Administração do Ferro:</strong> Em pacientes em hemodiálise, a via <strong>intravenosa (Sacarato de Hidróxido de Ferro / Noripurum)</strong> é a via de escolha inequívoca devido à absorção oral bloqueada pela hepcidina e facilidade de infusão durante a sessão; em pré-diálise, o ferro oral pode ser testado por 3 meses, convertendo para IV se intolerância gastrointestinal ou refratariedade;</li>
    </ul>
  </li>
  <li><strong>Agentes Estimuladores da Eritropoiese (Alfaepoetina):</strong>
    <ul>
      <li><strong>Gatilho de Início:</strong> Iniciar alfaepoetina (recombinante humana) apenas quando a <strong>Hemoglobina sérica estiver $&lt; 10,0$ g/dL</strong> (geralmente entre 9,0 e 10,0 g/dL);</li>
      <li><strong>Alvo Terapêutico Estrito de Hemoglobina:</strong> Manter a Hemoglobina entre <strong>10,0 e 11,5 g/dL (nunca ultrapassar 11,5 - 12,0 g/dL)</strong>;</li>
      <li><strong>Atenção de Prova (Ensaios CHOIR e CREATE):</strong> Tentar normalizar a hemoglobina para patamares fisiológicos ($> 13,0$ g/dL) em portadores de DRC usando doses elevadas de alfaepoetina associa-se a <strong>aumento expressivo de AVC isquêmico fatal, hipertensão descompensada, trombose do acesso vascular (fístula) e mortalidade cardiovascular global</strong>.</li>
    </ul>
  </li>
</ul>

<h3>3. Acidose Metabólica Crônica</h3>
<p>O rim saudável secreta diariamente cerca de 50 a 100 mEq de prótons ($H^+$) derivados do metabolismo proteico através da síntese tubular de amônia ($NH_4^+$) e acidez titulável (fosfato). Na DRC com TFGe $< 30$ a $45$ mL/min, a amoniogênese declina, retendo íons hidrogênio e ânions orgânicos (sulfatos e fosfatos), gerando inicialmente acidose com ânion gap normal e posteriormente acidose metabólica com ânion gap aumentado.</p>
<ul>
  <li><strong>Impactos Clínicos Deletérios:</strong> A acidose metabólica crônica estimula a via ubiquitina-proteassoma com <strong>catabolismo proteico muscular acelerado (sarcopenia e desnutrição urêmica)</strong>, desmineralização óssea profunda (tamponamento do excesso de $H^+$ pelos cristais de hidroxiapatita óssea com liberação de cálcio) e aceleração da progressão fibrótica renal;</li>
  <li><strong>Alvo e Reposição Terapêutica:</strong> O KDIGO recomenda suplementação oral de <strong>Bicarbonato de Sódio</strong> para manter o bicarbonato sérico persistentemente <strong>$\ge 22$ mEq/L (alvo entre 22 e 26 mEq/L)</strong>. A dose inicial típica é de 1 a 3 g/dia de bicarbonato de sódio em pó ou cápsulas, monitorando a sobrecarga de sódio e pressão arterial.</li>
</ul>

<h3>4. Hipercalemia e Sobrecarga Hídrica na DRC Avançada</h3>
<ul>
  <li><strong>Manejo da Hipercalemia Crônica:</strong> Restrição dietética de alimentos ricos em potássio (frutas secas, banana, abacate, água de coco, chocolate), otimização de diuréticos de alça caliuréticos (furosemida) e introdução de novos trocadores de potássio seletivos: <strong>Patiromer</strong> e <strong>Ciclossilicato de Sódio e Zircônio (ZS-9 / Lokelma)</strong>, que permitem manter os fármacos nefroprotetores bloqueadores do SRAA mesmo em pacientes propensos à hipercalemia;</li>
  <li><strong>Manejo da Sobrecarga Hídrica:</strong> Restrição sódica dietética rigorosa ($&lt; 2,0$ g de sódio elementar ou $< 5,0$ g de sal de cozinha por dia) e uso de <strong>Furosemida em doses tituladas progressivas</strong> (em estágios G4-G5, os túbulos respondem apenas a doses elevadas de 40 a 160 mg/dia); hidroclorotiazida e outros tiazídicos perdem eficácia isolada quando a TFGe cai abaixo de 30 mL/min, mas podem ser associados em sinergismo sinérgico sequencial de néfron.</li>
</ul>
`
};
