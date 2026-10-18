// Bloco 5 - Aula 098: Crupe e Epiglotite (Parte 4: Seções 16 a 19)

export const sec16 = {
  id: 'ventilacao-mecanica-invasiva-na-obstrucao-alta-pediatrica',
  title: '16. Princípios da Ventilação Mecânica Protetora na Obstrução Alta e Desmame Ventilatório',
  body_html: `
<h3>Particularidades da Ventilação Mecânica na Obstrução Laríngea e Subglótica</h3>
<p>Quando a intubação orotraqueal se torna imperativa em uma criança com obstrução alta (seja por epiglotite bacteriana, traqueíte necrosante ou crupe grave exaustivo), a mecânica ventilatória do paciente apresenta características fisiopatológicas radicalmente distintas das pneumopatias parenquimatosas como a SARA pediátrica (PARDS):</p>

<ul>
  <li><strong>Complacência Pulmonar Preservada com Resistência de Vias Aéreas Elevadíssima:</strong> O parênquima pulmonar e os alvéolos encontram-se habitualmente complacentes e sadios, mas a passagem do fluxo gasoso através do tubo orotraqueal de menor calibre (frequentemente 3,0 ou 3,5 mm) em uma laringe edemaciada gera altíssima resistência resistiva ($R_{\\text{va}}$);</li>
  <li><strong>Pressão de Pico ($P_{\\text{pico}}$) versus Pressão de Platô ($P_{\\text{platô}}$):</strong> Durante a ventilação mecânica, o monitor do ventilador exibirá pressões de pico elevadas (frequentemente entre 30 e 35 cmH2O) decorrentes puramente da resistência ao fluxo aéreo pelo tubo estreito. No entanto, ao realizar uma pausa inspiratória de 0,5 segundo, a <strong>Pressão de Platô alveolar será baixa e perfeitamente normal ($&lt; 20\\text{ cmH2O}$)</strong>, comprovando que o alvéolo não está sob estresse de barotrauma alveolar;</li>
  <li><strong>Tempo Expiratório Prolongado e Prevenção do Auto-PEEP:</strong> Como o estreitamento anatômico prolonga a constante de tempo do sistema respiratório ($\\tau = R \\times C$), o ventilador mecânico deve ser ajustado com <strong>frequências respiratórias mais baixas e tempos expiratórios mais longos (relação I:E de 1:2,5 a 1:3)</strong> para assegurar o esvaziamento pulmonar completo e impedir o aprisionamento aéreo dinâmico (auto-PEEP / hiperinsuflação dinâmica);</li>
  <li><strong>PEEP Fisiológica / Moderada:</strong> Ajusta-se a PEEP entre <strong>4 e 6 cmH2O</strong> para manter a capacidade residual funcional e contrabalançar o colapso traqueal expiratório, sem necessidade de titulações agressivas de PEEP alta.</li>
</ul>

<h3>O Teste de Fuga Aérea (Cuff Leak Test) para Extubação Segura</h3>
<p>A decisão de extubar uma criança intubada por patologia laringotraqueal obstrutiva requer comprovação formal da regressão do edema peritubário. Extubar uma criança cuja mucosa subglótica continua severamente inchada em torno do tubo resultará invariavelmente em falha de extubação, estridor imediato e necessidade de reintubação traumática de emergência:</p>

<ol>
  <li><strong>Técnica Operacional do Teste de Escape de Ar:</strong>
    <ul>
      <li>Aspira-se completamente a cavidade oral e o tubo orotraqueal;</li>
      <li>Se o tubo tiver balonete (cuff), desinsufla-se totalmente o balonete com uma seringa;</li>
      <li>Com o paciente sedado e sem esforço respiratório espontâneo excessivo, oclui-se manualmente o tubo ou ajusta-se a pressão inspiratória no ventilador para 20 a 25 cmH2O;</li>
      <li>Ausculta-se com o estetoscópio posicionado sobre a laringe (cartilagem tireoide/cricoide): se for audível o escape característico de ar vazando ao redor do tubo com pressões <strong>$&le; 20 - 25\\text{ cmH2O}$</strong>, o <strong>Teste de Fuga é considerado POSITIVO (Favorável)</strong>, indicando espaço aéreo peritubário suficiente para permitir a respiração pós-extubação;</li>
    </ul>
  </li>
  <li><strong>Manejo do Teste de Fuga Negativo (Sem Escape a 25-30 cmH2O):</strong> Indica persistência de edema laringotraqueal compressivo. Administra-se <strong>Dexametasona intravenosa (0,25 a 0,5 mg/kg por dose a cada 6 horas por 4 a 6 doses consecutivas — 24 horas antes da nova tentativa de extubação)</strong> para acelerar a reabsorção do edema e repete-se o teste no dia seguinte.</li>
</ol>
`
};

export const sec17 = {
  id: 'intoxicacoes-por-produtos-causticos-e-queimadura-de-via-aerea',
  title: '17. Ingestão e Inalação de Substâncias Cáusticas e Queimaduras Térmicas de Via Aérea',
  body_html: `
<h3>O Estridor por Agressão Química e Térmica Aguda</h3>
<p>No pronto-socorro infantil, nem todo estridor acompanhado de dor e sialorreia decorre de infecção bacteriana ou viral. A <strong>ingestão acidental de cáusticos (álcalis ou ácidos concentrados domésticos)</strong> e a <strong>inalação de ar superaquecido em incêndios e queimaduras faciais</strong> constituem emergências que mimetizam a clínica da epiglotite aguda com risco iminente de colapso de via aérea:</p>

<table class="book-table">
  <thead>
    <tr>
      <th>Agente Agressor</th>
      <th>Mecanismo Fisiopatológico de Lesão</th>
      <th>Quadro Clínico Chave</th>
      <th>Manejo da Via Aérea e Conduta Proibida</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>Ingestão de Álcalis Fortes</strong><br>(Soda cáustica, desentupidores de pia, baterias de botão)</td>
      <td><strong>Necrose de Liquefação Profunda:</strong> Os álcalis saponificam os lipídios das membranas celulares e desnaturam as proteínas teciduais, penetrando rapidamente nas camadas profundas da faringe, epiglote e esôfago.</td>
      <td>Dor retroesternal e orofaríngea intensa, sialorreia sanguinolenta, edema maciço de lábios e língua, disfagia e estridor inspiratório.</td>
      <td><strong>Intubação endotraqueal precoce antes da obliteração total da glote!</strong><br><strong>PROIBIDO:</strong> Induzir vômito, realizar lavagem gástrica ou ofertar substâncias neutralizantes (reação exotérmica agrava a necrose).</td>
    </tr>
    <tr>
      <td><strong>Ingestão de Ácidos Fortes</strong><br>(Ácido muriático, limpadores de vaso sanitário)</td>
      <td><strong>Necrose de Coagulação:</strong> Forma uma escara tecidual espessa e endurecida que limita a penetração profunda, mas causa necrose grave da mucosa superficial supraglótica e gástrica.</td>
      <td>Queimadura e ulcerações acinzentadas em orofaringe, hematêmese, estridor e choque hipovolêmico/dor.</td>
      <td>Avaliação laringoscópica precoce por fibra óptica; intubação com tubo sem balonete se houver edema progressivo. Endoscopia digestiva alta entre 12 e 24 horas.</td>
    </tr>
    <tr>
      <td><strong>Inalação de Fumaça e Ar Aquecido</strong><br>(Vítimas de incêndio em ambiente fechado)</td>
      <td>Lesão térmica direta na mucosa das vias aéreas superiores associada à lesão química por toxinas inaladas (ácido clorídrico, cianeto, monóxido de carbono).</td>
      <td>Queimadura de vibrissas nasais, fuligem na orofaringe e escarro carbonáceo, rouquidão de instalação rápida e estridor bifásico.</td>
      <td><strong>Intubação Orotraqueal IMEDIATA antes do pico do edema (que ocorre entre 6 e 24 horas)!</strong> Postergar a intubação torna a via aérea anatomicamente irreconhecível.</td>
    </tr>
  </tbody>
</table>
`
};

export const sec18 = {
  id: 'algoritmo-decisorio-sinoptico-de-estridor-pediatrico',
  title: '18. Algoritmo Decisório Passo a Passo do Estridor Agudo na Emergência Pediátrica',
  body_html: `
<h3>Fluxograma Mental do Emergencista Pediátrico</h3>
<p>Ao receber uma criança com estridor respiratório na sala de triagem ou pronto-socorro, o raciocínio clínico deve ser executado de forma algorítmica e metódica em 4 etapas sequenciais:</p>

<ol>
  <li><strong>Etapa 1: Triagem de Toxicidade e Estabilidade Imediata:</strong>
    <ul>
      <li>A criança apresenta silêncio respiratório, cianose em repouso, bradicardia ou letargia? $\rightarrow$ <strong>Via aérea falhada iminente:</strong> Oxigênio a 100%, Ambu a quatro mãos com cânula de Guedel, preparo imediato de laringoscopia por médico mais experiente e retaguarda para cricotireoidostomia por agulha;</li>
      <li>Se clinicamente estável, prosseguir para Etapa 2 sem manipular invasivamente a criança;</li>
    </ul>
  </li>
  <li><strong>Etapa 2: Análise da Febre e Velocidade de Instalação:</strong>
    <ul>
      <li><strong>Início Súbito sem Febre durante brincadeira/alimentação:</strong> Hipótese número 1 = <strong>Aspiração de Corpo Estranho</strong> (Broncoscopia rígida de urgência);</li>
      <li><strong>Início Noturno Súbito sem Febre em criança atópica que melhora em poucas horas:</strong> Hipótese = <strong>Crupe Espasmódico</strong> (Corticoide oral);</li>
      <li><strong>Quadro Febril Agudo / Subagudo:</strong> Prosseguir para Etapa 3;</li>
    </ul>
  </li>
  <li><strong>Etapa 3: Avaliação da Tríade dos 3 Ds vs Tosse Ladrante:</strong>
    <ul>
      <li><strong>Febre Alta Tóxica (&gt; 39°C), Ausência de Tosse, Disfagia Severa com Sialorreia Ativa (Drooling) e Posição de Tripé:</strong> Hipótese = <strong>Epiglotite Aguda Bacteriana</strong> $\rightarrow$ NÃO USAR ABAIXADOR DE LÍNGUA, manter com os pais, transporte imediato ao Centro Cirúrgico para intubação sob anestesia inalatória por anestesiologista sênior com cirurgião pediátrico paramentado para via aérea cirúrgica;</li>
      <li><strong>Febre Baixa/Moderada, Pródromos Catarrais de 1 a 3 dias, Rouquidão e Tosse Ladrante Marcante:</strong> Hipótese = <strong>Crupe Viral (Laringotraqueobronquite)</strong> $\rightarrow$ Prosseguir para Etapa 4;</li>
    </ul>
  </li>
  <li><strong>Etapa 4: Conduta Estratificada no Crupe Pelo Escore de Westley:</strong>
    <ul>
      <li><strong>Sem estridor em repouso (Leve):</strong> Dexametasona 0,6 mg/kg dose única VO e alta com orientações de retorno;</li>
      <li><strong>Estridor audível em repouso (Moderado a Grave):</strong> Dexametasona 0,6 mg/kg + Nebulização com L-Adrenalina 1:1.000 (0,5 mL/kg, máx. 5 mL pura) + <strong>Observação médica obrigatória de 2 a 4 horas</strong>;</li>
      <li><strong>Ausência de melhora após adrenalina ou piora rápida com febre alta e secreção purulenta:</strong> Hipótese = <strong>Traqueíte Bacteriana</strong> $\rightarrow$ Internação em UTI, laringotraqueoscopia/broncoscopia rígida para desbridamento de rolhas e Ceftriaxona + Vancomicina IV.</li>
    </ul>
  </li>
</ol>
`
};

export const sec19 = {
  id: 'bateria-de-questoes-comentadas-top-tier-complementares-crupe',
  title: '19. Questões de Concursos Médicos Top-Tier: Queimadura, Caústicos e Inalação',
  body_html: `
<h3>Questões com Discussão Profunda de Gabarito e Raciocínio Clínico</h3>

<h4>Questão 6: FMUSP — Vítima de Incêndio e Conduta em Via Aérea Superior</h4>
<p><strong>Enunciado:</strong> Um menino de 5 anos é resgatado pelos bombeiros de um incêndio residencial em quarto fechado. Ele dá entrada na sala de emergência 20 minutos após o resgate. Apresenta queimaduras de 2º grau superficial na face e pescoço, vibrissas nasais chamuscadas e presença de fuligem em torno dos lábios e orofaringe. Ele está consciente, orientado, com voz ligeiramente rouca e estridor inspiratório discreto à ausculta da traqueia. A saturação de oxigênio é de 98% sob máscara não reinalante com reservatório a 15 L/min. A conduta imediata mandatória em relação à via aérea desta criança é:</p>
<p>A) Manter vigilância na enfermaria com micronebulização fria de soro fisiológico e aguardar o resultado da gasometria arterial.<br>
B) Realizar intubação orotraqueal imediata em ambiente controlado antes que a progressão do edema inflamatório da mucosa faringolaríngea oblitere as referências anatômicas da glote.<br>
C) Prescrever corticoterapia sistêmica venosa e liberar o paciente caso a saturação permaneça estável nas próximas 2 horas.<br>
D) Indicar cricotireoidostomia cirúrgica imediata com bisturi pelo risco de intoxicação por monóxido de carbono.<br>
E) Proceder à lavagem gástrica copiosa com carvão ativado.</p>
<p><strong>Gabarito Oficial: Alternativa B.</strong></p>
<p><strong>Comentário Detalhado:</strong><br>
• <strong>Alternativa B (Correta):</strong> Nas queimaduras de vias aéreas superiores decorrentes de inalação de ar superaquecido e fumaça tóxica, o edema inflamatório de epiglote e mucosa laríngea progride de forma insidiosa e avassaladora ao longo das primeiras 6 a 24 horas. Sinais como fuligem oral, vibrissas chamuscadas, rouquidão precoce e estridor são <strong>critérios formais inegociáveis de INTUBAÇÃO OROTRAQUEAL PRECOCE</strong>! Postergar a intubação para "esperar piorar" faz com que o médico se depare horas depois com uma via aérea irreconhecível, com tecidos totalmente tumefeitos e fenda glótica obliterada, resultando em falha catastrófica de intubação e óbito por asfixia. Alternativa B impecável.</p>
`
};
