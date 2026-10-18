// Bloco 5 - Aula 098: Crupe e Epiglotite (Parte 1: Seções 1 a 5)

export const sec1 = {
  id: 'anatomia-fisiologia-e-obstrucao-de-via-aerea-alta-pediatrica',
  title: '1. Anatomia Funcional, Fisiologia da Via Aérea Pediátrica e a Síndrome do Estridor',
  body_html: `
<h3>Peculiaridades Anatômicas da Via Aérea Superior da Criança</h3>
<p>O manejo das emergências respiratórias altas na faixa etária pediátrica exige do médico uma compreensão cristalina das diferenças anatômicas e biomecânicas fundamentais que distinguem a criança do adulto. Em lactentes e pré-escolares, a via aérea não é simplesmente uma versão miniaturizada do trato respiratório adulto; ela possui características estruturais singulares que a tornam <strong>extraordinariamente vulnerável ao colapso obstrutivo agudo e à asfixia rápida</strong>:</p>

<ul>
  <li><strong>Ponto de Menor Calibre Anatômico:</strong> No adulto, a porção mais estreita da laringe situa-se no nível das cordas vocais verdadeiras (fenda glótica). Na criança menor de 8 anos, a região mais estreita situa-se abaixo das cordas vocais, no <strong>espaço subglótico delimitado pelo anel da cartilagem cricoide</strong>. Como a cartilagem cricoide é a única estrutura cartilaginosa da árvore traqueobrônquica que forma um anel circular completo e rígido de 360 graus, qualquer processo inflamatório ou edema na mucosa subglótica não tem como se expandir para fora — expande-se obrigatoriamente para dentro da luz da via aérea, provocando estreitamento crítico da área de secção transversa;</li>
  <li><strong>A Lei de Poiseuille e a Resistência Aérea:</strong> De acordo com os princípios físicos da dinâmica dos fluidos de Poiseuille, a resistência ao fluxo aéreo laminar ($R$) através de um conduto cilíndrico é <strong>inversamente proporcional à quarta potência do seu raio ($R \\propto \\frac{1}{r^4}$)</strong>. No fluxo turbulento (que predomina na presença de obstruções), a resistência é inversamente proporcional à quinta potência do raio ($R \\propto \\frac{1}{r^5}$). Em um lactente cujo diâmetro subglótico basal é de cerca de 4 mm, um edema inflamatório circunferencial de meros <strong>1 mm de espessura reduz o diâmetro da luz em 50% (de 4 mm para 2 mm)</strong>, o que acarreta um <strong>aumento de 16 vezes na resistência das vias aéreas</strong> e reduz a área de fluxo em 75%! No adulto, um edema de 1 mm reduz o calibre de 8 mm para 6 mm, aumentando a resistência em apenas cerca de 3 vezes;</li>
  <li><strong>Epiglote Flácida e em Formato de Ômega ($\Omega$):</strong> A epiglote infantil é proporcionalmente mais longa, estreita, flexível e orientada em ângulo posterior mais agudo sobre a laringe, dificultando a visualização glótica direta durante a laringoscopia convencional;</li>
  <li><strong>Occipício Proeminente e Língua Volumosa:</strong> Em posição supina neutra, o occipício aumentado flexiona passivamente o pescoço sobre o tórax, enquanto a macroglossia relativa projeta a base da língua contra a parede posterior da orofaringe, gerando obstrução mecânica funcional imediata (justificando o posicionamento com coxim sob as escápulas — <em>sniffing position</em> pediátrico).</li>
</ul>

<h3>A Fisiopatologia e Semiótica do Estridor Respiratório</h3>
<p>O <strong>Estridor</strong> é um som respiratório rude, agudo e musical, produzido pela turbulência acelerada do ar através de uma via aérea de grande calibre parcialmente obstruída (obedecendo ao Efeito Bernoulli). A cronologia do estridor em relação ao ciclo ventilatório é a chave mestra para a localização topográfica da lesão obstrutiva:</p>

<table class="book-table">
  <thead>
    <tr>
      <th>Fase do Ciclo Respiratório</th>
      <th>Topografia Anatômica do Obstáculo</th>
      <th>Mecanismo Fisiopatológico</th>
      <th>Principais Exemplos Etiológicos</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>Estridor Estritamente Inspiratório</strong></td>
      <td><strong>Região Supraglótica</strong> (acima das cordas vocais)</td>
      <td>Durante a inspiração, a pressão negativa intraluminal gerada pelo diafragma colapsa as estruturas moles flácidas extratorácicas supraglóticas para dentro do lúmen.</td>
      <td>Laringomalácia, Epiglotite Aguda, abscesso retrofaríngeo.</td>
    </tr>
    <tr>
      <td><strong>Estridor Bifásico (Inspiratório e Expiratório)</strong></td>
      <td><strong>Região Glótica e Subglótica</strong> (laringe média/inferior)</td>
      <td>O anel cricoide rígido não colapsa na inspiração nem se expande na expiração; o estreitamento fixo gera turbulência em ambas as fases.</td>
      <td>Crupe Viral (Laringotraqueobronquite), Crupe Espasmódico, estenose subglótica congênita ou pós-intubação.</td>
    </tr>
    <tr>
      <td><strong>Estridor Expiratório (ou Sibilos Monofônicos)</strong></td>
      <td><strong>Região Traqueal Baixa e Brônquica Intraterácica</strong></td>
      <td>Durante a expiração, a pressão pleural positiva comprime a traqueia intratorácica contra o obstáculo intraluminal.</td>
      <td>Traqueíte bacteriana, corpo estranho em traqueia distal ou compressão extrínseca por anel vascular.</td>
    </tr>
  </tbody>
</table>
`
};

export const sec2 = {
  id: 'crupe-viral-laringotraqueobronquite-aguda',
  title: '2. Crupe Viral (Laringotraqueobronquite Aguda): Etiopatogenia, Quadro Clínico e Sinal da Torre',
  body_html: `
<h3>Etiopatogenia e Epidemiologia do Crupe Viral</h3>
<p>A <strong>Laringotraqueobronquite Aguda</strong>, universalmente conhecida pelo termo anglo-saxão <strong>Crupe Viral</strong>, representa a causa mais frequente de obstrução respiratória alta aguda na infância, respondendo por mais de 80% a 90% dos atendimentos de estridor em serviços de emergência pediátrica mundiais. Apresenta nítido predomínio sazonal no final do outono e início do inverno nos climas temperados e durante períodos chuvosos nos trópicos.</p>

<ul>
  <li><strong>Faixa Etária Típica:</strong> Incide predominantemente em crianças entre <strong>6 meses e 3 anos de idade</strong>, com pico epidemiológico estrito no <strong>segundo ano de vida (em torno de 12 a 24 meses)</strong>. É incomum em menores de 3 meses (devido a anticorpos maternos transplacentários protetores) e torna-se progressivamente mais raro após os 5 a 6 anos com o alargamento das dimensões anatômicas da laringe;</li>
  <li><strong>Agentes Etiológicos:</strong> O <strong>Vírus Parainfluenza Humano (HPIV) Tipo 1</strong> é o patógeno soberano, sendo isolado em 65% a 75% dos casos clínicos bem documentados. O <strong>Parainfluenza Tipo 2</strong> associa-se a surtos mais brandos, e o <strong>Parainfluenza Tipo 3</strong> costuma associar-se a acometimento bronquiolar baixo concomitante. Outros vírus incluem o Vírus Sincicial Respiratório (VSR), Adenovírus, Rinovírus, Enterovírus e Influenza A e B (este último frequentemente causando quadros mais graves e febris).</li>
</ul>

<h3>Fisiopatologia do Crupe Viral</h3>
<p>A infecção viral inicia-se nas mucosas do nariz e da nasofaringe, disseminando-se caudalmente ao longo do epitélio respiratório ciliado até alcançar a laringe e a traqueia. A replicação viral induz infiltração inflamatória rica em histiócitos, linfócitos e plasmócitos na lâmina própria e submucosa, associada a edema exsudativo proeminente, vasodilatação e hiperprodução de muco espesso viscoso. Como essa reação ocorre primordialmente na mucosa subglótica delimitada pelo rígido anel cricoide, instala-se uma estenose funcional dinâmica que restringe dramaticamente o fluxo de ar inspiratório.</p>

<h3>A Tríade Clínica Clássica do Crupe</h3>
<p>O quadro clínico instala-se tipicamente de forma subaguda, precedido por 1 a 3 dias de pródromos catarrais inespecíficos de vias aéreas superiores (coriza hialina, congestão nasal, odinofagia leve e febre baixa em torno de 38°C a 38,5°C). De forma súbita, habitualmente durante a madrugada (pico circadiano de cortisol mais baixo e resfriamento das vias aéreas), o quadro clínico explode com a clássica <strong>Tríade Patognomônica do Crupe</strong>:</p>

<ol>
  <li><strong>Tosse Laringea Típica (Tosse "de Cachorro" ou Tosse "Crupina" / Tosse Ladrante):</strong> Tosse metálica, seca, ressonante e estridente, provocada pela vibração do fluxo aéreo através das cordas vocais e da mucosa subglótica edemaciada;</li>
  <li><strong>Rouquidão ou Disfonia:</strong> Comprometimento inflamatório direto das cordas vocais verdadeiras;</li>
  <li><strong>Estridor Inspiratório:</strong> Inicialmente audível apenas quando a criança se agita, chora ou corre; nos casos graves, torna-se contínuo, audível em repouso e mesmo à distância.</li>
</ol>

<h3>Achado Radiológico Clássico: O Sinal da Torre de Igreja (Steeple Sign)</h3>
<p>O diagnóstico do crupe viral é <strong>estritamente clínico</strong>. A realização de radiografias simples de pescoço NÃO é mandatória e JAMAIS deve postergar a terapêutica farmacológica em uma criança com desconforto respiratório. Contudo, quando realizada (frequentemente para descartar corpo estranho ou epiglotite em casos atípicos), a <strong>Radiografia Simples de Pescoço em Incidência Ântero-Posterior (AP)</strong> revela o famoso <strong>Sinal da Torre de Igreja (ou Sinal do Lápis Pontiagudo / Steeple Sign)</strong>:</p>

<p>Normalmente, as paredes laterais da traqueia subglótica formam uma concavidade quadrada ampla com as cordas vocais. No crupe, o edema inflamatório circunferencial simétrico da mucosa subglótica oblitera os recessos laterais do ventrículo laríngeo, afunilando progressivamente a coluna de ar em direção às cordas vocais, assumindo o aspecto triangular afunilado característico da torre de uma igreja gótica ou de um lápis apontado para cima.</p>
`
};

export const sec3 = {
  id: 'estratificacao-de-gravidade-escores-de-westley-e-taussig',
  title: '3. Estratificação de Gravidade do Crupe: Escores de Westley e Taussig e Sinais de Iminência de Falência Respiratória',
  body_html: `
<h3>Por que Estratificar a Gravidade do Crupe na Triagem de Emergência?</h3>
<p>A gravidade da obstrução laríngea no crupe viral é extremamente dinâmica, podendo alternar rapidamente entre estabilidade e exaustão muscular catastrófica. O uso de escores clínicos validados padroniza a avaliação multiprofissional na sala de emergência e guia a tomada de decisão em relação à indicação de adrenalina nebulizada, observação hospitalar ou encaminhamento para leito de terapia intensiva.</p>

<h3>O Escore de Gravidade de Westley (O Padrão-Ouro Internacional)</h3>
<p>O <strong>Escore de Westley</strong> avalia cinco parâmetros clínicos objetivos, graduando a pontuação de 0 a 17 pontos:</p>

<table class="book-table">
  <thead>
    <tr>
      <th>Parâmetro Clínico</th>
      <th>0 Pontos</th>
      <th>1 Ponto</th>
      <th>2 Pontos</th>
      <th>3 Pontos</th>
      <th>4 a 5 Pontos</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>Estridor Inspiratório</strong></td>
      <td>Ausente</td>
      <td>Presente apenas com agitação / choro</td>
      <td><strong>Presente em Repouso</strong></td>
      <td>-</td>
      <td>-</td>
    </tr>
    <tr>
      <td><strong>Retrações Torácicas (Tiragem)</strong></td>
      <td>Ausente</td>
      <td>Tiragem leve (subcostal discreta)</td>
      <td>Tiragem moderada (intercostal / fúrcula)</td>
      <td><strong>Tiragem grave</strong> (esternal acentuada)</td>
      <td>-</td>
    </tr>
    <tr>
      <td><strong>Entrada de Ar (Ausculta Pulmonar)</strong></td>
      <td>Normal / Simétrica</td>
      <td>Diminuída discretamente</td>
      <td><strong>Acentuadamente diminuída</strong></td>
      <td>-</td>
      <td>-</td>
    </tr>
    <tr>
      <td><strong>Cianose</strong></td>
      <td>Ausente</td>
      <td>-</td>
      <td>-</td>
      <td>-</td>
      <td><strong>4 pts:</strong> Com agitação<br><strong>5 pts:</strong> <strong>Em Repouso / Ar Ambiente</strong></td>
    </tr>
    <tr>
      <td><strong>Nível de Consciência</strong></td>
      <td>Normal / Alerta</td>
      <td>-</td>
      <td>-</td>
      <td>-</td>
      <td><strong>5 pts:</strong> <strong>Alterado (Letargia / Sonolência / Agitação)</strong></td>
    </tr>
  </tbody>
</table>

<h3>Classificação e Condutas Pelo Escore de Westley</h3>
<ul>
  <li><strong>Crupe Leve (Westley 0 a 2 pontos):</strong> Tosse ladrante e rouquidão ocasionais; <strong>SEM estridor em repouso</strong> (estridor apenas quando chora) e sem tiragens subcostais. Conduta: <strong>Dexametasona oral dose única</strong> e alta domiciliar com orientações de sinais de alarme;</li>
  <li><strong>Crupe Moderado (Westley 3 a 5 pontos):</strong> <strong>Estridor audível em repouso</strong> associado a retrações subcostais e intercostais leves a moderadas, mas com boa entrada de ar pulmonar e nível de consciência preservado. Conduta: <strong>Dexametasona</strong> associada a <strong>Nebulização com Adrenalina</strong> e observação clínica mínima de 2 a 4 horas;</li>
  <li><strong>Crupe Grave (Westley 6 a 11 pontos):</strong> Estridor inspiratório (e frequentemente expiratório) exuberante em repouso, retrações esternais graves com batimento de asa de nariz, entrada de ar diminuída e agitação psicomotora por hipóxia tecidual. Conduta: <strong>Nebulização com Adrenalina imediata repetida</strong> + Dexametasona IV/IM + internação hospitalar mandatória;</li>
  <li><strong>Iminência de Falência Respiratória (Westley $\ge 12$ pontos):</strong> <strong>Silêncio respiratório</strong> (o estridor diminui ou desaparece porque a criança não tem mais força muscular para mobilizar fluxo turbulento!), letargia profunda, palidez acinzentada, bradicardia paradoxal e sudorese fria. Conduta: <strong>Intubação Traqueal de Emergência em Sala de Choque por profissional mais experiente</strong> com tubo de menor calibre.</li>
</ul>

<h3>O Escore de Taussig</h3>
<p>Alternativa simplificada ao Westley, o <strong>Escore de Taussig</strong> avalia Estridor (0-3), Entrada de Ar (0-3), Retrações (0-3), Cor (0-3) e Nível de Consciência (0-3), somando até 15 pontos, com pontos de corte semelhantes (Leve: &le; 4; Moderado: 5-8; Grave: &ge; 9).</p>
`
};

export const sec4 = {
  id: 'tratamento-farmacologico-do-crupe-dexametasona-e-adrenalina',
  title: '4. Farmacoterapia Baseada em Evidências do Crupe: Corticoterapia Sistêmica, Adrenalina Nebulizada e o Efeito Rebote',
  body_html: `
<h3>1. Corticoterapia Sistêmica: O Pilar Inegociável para TODOS os Casos de Crupe</h3>
<p>O uso sistemático de corticosteroides é a intervenção de maior impacto na história da pediatria respiratória moderna: ensaios clínicos randomizados e meta-análises da Cochrane demonstraram categoricamente que uma única dose de corticoide reduz a necessidade e a frequência de nebulizações com adrenalina, diminui as taxas de admissão hospitalar em mais de 50%, reduz o tempo de permanência em pronto-socorro e elimina praticamente a necessidade de intubação orotraqueal.</p>

<table class="book-table">
  <thead>
    <tr>
      <th>Fármaco e Via</th>
      <th>Posologia Padronizada</th>
      <th>Início de Ação e Meia-Vida</th>
      <th>Vantagens e Considerações Clínicas</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>Dexametasona Oral / IV / IM</strong><br>(Fármaco de Escolha)</td>
      <td><strong>0,6 mg/kg em DOSE ÚNICA</strong><br>(Dose máxima: <strong>16 mg</strong>).<br>Estudos comprovam eficácia idêntica com <strong>0,15 mg/kg</strong> em crupe leve.</td>
      <td>Início em <strong>1 a 2 horas</strong>.<br>Meia-vida biológica longa de <strong>36 a 72 horas</strong>.</td>
      <td>A longa meia-vida cobre perfeitamente todo o período crítico de pico inflamatório da doença (48-72h), tornando desnecessárias doses repetidas. A via oral é tão eficaz quanto a parenteral.</td>
    </tr>
    <tr>
      <td><strong>Prednisolona / Prednisona Oral</strong><br>(Alternativa de 2ª Linha)</td>
      <td><strong>1 a 2 mg/kg/dia</strong> fracionada em 1 ou 2 tomadas, mantida por 2 a 3 dias.</td>
      <td>Início em 2 a 4 horas.<br>Meia-vida intermediária (12 a 36h).</td>
      <td>Apresenta meia-vida mais curta que a dexametasona, exigindo repetição da dose no dia seguinte; sabor amargo pode induzir vômitos.</td>
    </tr>
    <tr>
      <td><strong>Budesonida Inalatória</strong><br>(Alternativa para Vômitos Intratáveis)</td>
      <td><strong>2 mg (4 mL de suspensão 0,5 mg/mL)</strong> via nebulização facial.</td>
      <td>Início rápido local em <strong>30 minutos</strong>.</td>
      <td>Pode ser associada na mesma nebulização da adrenalina em pacientes que vomitam a dexametasona oral e quando se deseja evitar punção dolorosa. Alto custo.</td>
    </tr>
  </tbody>
</table>

<h3>2. Adrenalina Nebulizada (Epinefrina): O Resgate da Obstrução Moderada a Grave</h3>
<p>A nebulização com adrenalina é reservada estritamente para o <strong>Crupe Moderado a Grave (presença de estridor em repouso e/ou tiragens torácicas evidentes)</strong>. A adrenalina atua através de potente estímulo sobre os <strong>receptores adrenérgicos $\alpha_1$ da microvasculatura da mucosa subglótica</strong>, induzindo constrição arteriolar intensa, diminuição da pressão hidrostática capilar e reabsorção expressiva do edema na laringe em poucos minutos:</p>

<ul>
  <li><strong>Apresentação e Dose:</strong> Utiliza-se <strong>Adrenalina 1:1.000 (1 mg/mL) pura (L-adrenalina convencional de parada)</strong> na dose de <strong>0,5 mL/kg por nebulização (máximo de 5 mL por dose)</strong>, completada com soro fisiológico 0,9% até volume de 4 a 5 mL se a criança for menor, fluindo sob oxigênio a 6-8 L/min;</li>
  <li><strong>Início e Duração do Efeito:</strong> O efeito descongestionante é quase milagroso: inicia-se em <strong>3 a 5 minutos</strong>, atinge o pico com 30 minutos e <strong>esvai-se após cerca de 2 horas (duração média de 90 a 120 minutos)</strong>;</li>
  <li><strong>O Mito e a Realidade do "Efeito Rebote":</strong> Historicamente, acreditava-se que após a metabolização da adrenalina o edema laríngeo retornava pior do que antes da medicação (efeito rebote farmacológico verdadeiro). Estudos hemodinâmicos modernos comprovaram que não há piora supra-basal: o que ocorre é simplesmente a <strong>cessação do efeito vasoconstritor da adrenalina enquanto o corticoide ainda não atingiu seu pico de ação</strong>, fazendo a criança retornar ao grau de obstrução inflamatória original. Por esse motivo fundamental, <strong>TODA CRIANÇA QUE RECEBE ADRENALINA NEBULIZADA DEVE OBRIGATORIAMENTE PERMANECER EM OBSERVAÇÃO CLÍNICA NO HOSPITAL POR NO MÍNIMO 2 A 4 HORAS</strong> antes de se considerar a alta.</li>
</ul>

<h3>Medidas Tradicionais Desaconselhadas</h3>
<p>O uso de <strong>umidificação a vapor quente ou frio (tendas de névoa)</strong> foi amplamente estudado e <strong>NÃO demonstrou qualquer benefício clínico objetivo</strong> em reduzir escores de estridor ou tempo de internação; pode agitar desnecessariamente o lactente. Sedativos e antitussígenos são formalmente contraindicados pelo risco de depressão respiratória mascarar a falência de via aérea.</p>
`
};

export const sec5 = {
  id: 'epiglotite-aguda-emergencia-cirurgica-e-infecciosa',
  title: '5. Epiglotite Aguda (Supraglotite): Etiologia, Tríade dos 3 Ds, Posição de Tripé e Sinal do Polegar',
  body_html: `
<h3>Definição e Gravidade da Epiglotite Aguda</h3>
<p>A <strong>Epiglotite Aguda</strong> (mais apropriadamente denominada <em>Supraglotite</em>) é uma infecção bacteriana celulítica fulminante de rápida progressão que acomete a epiglote, as pregas ariepiglóticas, as cartilagens aritenoides e os tecidos moles da laringe supraglótica. Representa uma das <strong>mais temidas e dramáticas emergências respiratórias pediátricas</strong>, na qual a luz laríngea pode ser completamente obliterada por um edema inflamatório maciço em questão de poucas horas, levando à asfixia mecânica total e parada cardiorrespiratória se o médico assistente falhar na abordagem da via aérea.</p>

<h3>Mudança Epidemiológica Histórica com a Vacina Pentavalente</h3>
<p>Historicamente, mais de 95% de todos os casos de epiglotite infantil eram causados pelo <strong><em>Haemophilus influenzae</em> tipo b (Hib)</strong>, com pico de incidência em pré-escolares de 2 a 6 anos de idade. Com a introdução universal da <strong>vacina conjugada contra o Hib (incorporada no Brasil no PNI pela vacina Tetravalente em 2002 e atual Pentavalente aos 2, 4 e 6 meses)</strong>, a incidência pediátrica de epiglotite por Hib despencou em mais de 98% a 99% nas regiões com alta cobertura vacinal.</p>

<p>Atualmente, os casos esporádicos ocorrem em:</p>
<ol>
  <li>Crianças não vacinadas ou com esquema vacinal incompleto (por hesitação vacinal ou atraso);</li>
  <li>Crianças maiores e adolescentes vacinados imunocompetentes nos quais a etiologia passou a ser dominada por <strong><em>Streptococcus pyogenes</em> (Streptococcus beta-hemolítico do Grupo A - SBHGA)</strong>, <strong><em>Streptococcus pneumoniae</em> (Pneumococo)</strong> e <strong><em>Staphylococcus aureus</em> (incluindo cepas de CA-MRSA)</strong>;</li>
  <li>Adultos jovens e idosos diabéticos.</li>
</ol>

<h3>Quadro Clínico Dramático: A Tríade dos 3 Ds</h3>
<p>Diferentemente do crupe viral (que evolui em dias com pródromos catarrais), a epiglotite aguda possui uma <strong>instalação hiperaguda e fulminante (evolução em menos de 6 a 12 horas)</strong>. A criança é subitamente acometida por <strong>febre alta tóxica (39°C a 40°C)</strong>, prostração intensa e evolui rapidamente com a clássica <strong>Tríade dos Três "Ds"</strong>:</p>

<ul>
  <li><strong>1. Disfagia (Disfagia Severa com Odinofagia Excruciante):</strong> A dor de garganta é tão dilacerante que a criança recusa categoricamente engolir qualquer líquido, alimento ou a própria saliva;</li>
  <li><strong>2. Drooling (Sialorreia Abundante / Baba Ativa):</strong> Incapaz de deglutir devido ao edema obstrutivo e à odinofagia, a criança apresenta saliva escorrendo continuamente pelos cantos da boca;</li>
  <li><strong>3. Distress (Desconforto Respiratório Agudo / Angústia Respiratória):</strong> Respiração difícil, estridor estritamente inspiratório (supraglótico) de timbre mais abafado e voz empastada ("voz de batata quente" — <em>muffled voice</em>). <strong>AUSÊNCIA DE TOSSE LADRANTE!</strong> A ausência de tosse é um divisor de águas entre crupe e epiglotite.</li>
</ul>

<h3>A Postura Protetora Obrigatória: Posição de Tripé (Sniffing Position)</h3>
<p>Diante do desespero respiratório, a criança assume instintivamente uma atitude corporal protetora típica: senta-se inclinada para a frente, apoiando as duas palmas das mãos abertas sobre os joelhos ou o leito (formando um tripé com os braços), com o <strong>pescoço hiperextendido e a mandíbula projetada para a frente com a boca semiaberta</strong>. Essa posição alinha os eixos anatômicos da orofaringe e da laringe, mantendo a epiglote túrgida tracionada para longe da fenda glótica pela gravidade e permitindo a passagem do mínimo fluxo aéreo vital.</p>

<h3>O Achado Radiológico: O Sinal do Polegar (Thumbprint Sign)</h3>
<p>O exame radiológico só pode ser realizado se a criança estiver clinicamente estável e <strong>SEMPRE acompanhada na sala de raio-X por médico habilitado em via aérea difícil munido de material de intubação e cricotireoidostomia</strong>. A <strong>Radiografia Simples de Pescoço em Incidência Perfil Lateral</strong> revela o patognomônico <strong>Sinal do Polegar (Thumbprint Sign)</strong>: a epiglote normal, que se projeta como uma lâmina delgada e esguia, encontra-se globosa, arredondada e espessada, assemelhando-se visualmente à ponta de um polegar humano adulto invadindo a coluna aérea da hipofaringe.</p>
`
};
