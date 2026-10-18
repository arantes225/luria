import fs from 'fs';
import path from 'path';

export const secPuerperio1 = [
  {
    id: 'conceito-cronologia-marcos-puerperio',
    title: '1. Conceito, Cronologia e Marcos Temporais do Puerpério',
    body_html: `
<h3>Definição Médica e Limites Biológicos do Período Puerperal</h3>
<p>O <strong>puerpério</strong> (popularmente denominado de resguardo, quarentena ou sobreparto) é o período cronológico e biológico que se inicia imediatamente após a dequitação placentária e a expulsão dos anexos ovulares (quarto período do parto, período de Greenberg) e se estende até o momento em que todas as modificações anatômicas, fisiológicas, histológicas e endócrinas induzidas pela gestação e pelo parto no organismo materno retornam ao seu estado pré-gravídico habitual, ou ao mais próximo possível dele. A única e fundamental exceção fisiológica a essa regressão completa ao estado pré-gestacional é o parênquima mamário, o qual atinge o seu ápice de desenvolvimento anatômico e capacidade funcional secretora justamente para sustentar a lactação exclusiva.</p>
<p>Embora a involução da maioria esmagadora dos órgãos pélvicos e das alterações hemodinâmicas ocorra de forma intensa e concentrada nas primeiras seis semanas após o parto, marcos histológicos profundos — tais como a regeneração final do sítio de inserção placentária e o remodelamento do estroma conjuntivo do colo uterino e da fáscia endopélvica — demandam meses para a sua perfeita consolidação biológica.</p>

<h3>Classificação Cronológica Tradicional e seus Fundamentos Fisiopatológicos</h3>
<p>Didática e clinicamente, a literatura obstétrica mundial e o Ministério da Saúde do Brasil dividem o puerpério em três fases cronológicas distintas e consecutivas, cada qual caracterizada por riscos clínicos peculiares, padrões hemodinâmicos próprios e demandas assistenciais específicas:</p>
<ol>
  <li><strong>Puerpério Imediato (do 1º ao 10º dia pós-parto):</strong>
    <ul>
      <li><strong>Primeiras 2 a 4 horas (Período de Greenberg):</strong> Fase hipercrítica de maior vulnerabilidade para o choque hemorrágico hipovolêmico por atonia uterina, retenção de restos placentários ou lacerações do trajeto de parto. É o momento de vigência da hemostasia mecânica (ligaduras vivas de Pinard) e trombótica;</li>
      <li><strong>Do 1º ao 10º dia:</strong> Fase de involução uterina mais acelerada, caracterizada pela descida diária de cerca de 1 a 2 cm do fundo de útero na cavidade abdominal, expulsão dos lóquios hemáticos (<em>lochia rubra</em> ou cruenta), transição para lóquios serossanguinolentos (<em>lochia serosa</em>), início da apojadura mamária (2º ao 4º dia) e grande mobilização hidroeletrolítica intravascular decorrente da reabsorção do edema intersticial acumulado durante o terceiro trimestre da gravidez.</li>
    </ul>
  </li>
  <li><strong>Puerpério Tardio (do 11º ao 45º dia pós-parto):</strong>
    <ul>
      <li>Fase marcada pelo retorno anatômico do útero para o interior da pelve verdadeira (torna-se intrapélvico e impalpável pela parede abdominal em torno do 10º ao 14º dia pós-parto);</li>
      <li>Transição e término dos lóquios amarelados e esbranquiçados (<em>lochia alba</em>), regeneração quase total da mucosa endometrial (exceto no leito de inserção placentária), readequação do tônus da musculatura lisa vascular e restauração gradual do débito cardíaco aos níveis pré-gravídicos;</li>
      <li>Período clássico da consulta de puerpério tardio (em torno de 30 a 42 dias após o parto), voltada para o rastreio de transtornos afetivos pós-parto, aconselhamento reprodutivo, inserção de métodos contraceptivos seguros para a lactação e liberação responsável da atividade sexual.</li>
    </ul>
  </li>
  <li><strong>Puerpério Remoto (além do 45º dia pós-parto):</strong>
    <ul>
      <li>Período temporalmente elástico e impreciso, estendendo-se habitualmente do 45º dia até o restabelecimento completo dos ciclos menstruais ovulatórios e da fertilidade materna prévia;</li>
      <li>Nas mulheres que <strong>não amamentam</strong>, a primeira menstruação ocorre tipicamente entre 6 e 8 semanas após o parto, com ovulação ocorrendo comumente a partir da 4ª ou 5ª semana pós-parto;</li>
      <li>Nas mulheres em <strong>aleitamento materno exclusivo e em livre demanda</strong>, a hiperprolactinemia sustentada inibe a secreção pulsátil hipotalâmica de GnRH e, consequentemente, suprime a liberação hipofisária de FSH e LH, induzindo a amenorreia lactacional fisiológica, que pode se prolongar por 6 meses ou mais.</li>
    </ul>
  </li>
</ol>

<table class="book-table">
  <thead>
    <tr>
      <th>Fase Cronológica</th>
      <th>Janela Temporal</th>
      <th>Principais Marcos Biológicos e Eventos Fisiológicos</th>
      <th>Principais Riscos e Pontos Críticos de Vigilância</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>Puerpério Imediato</strong></td>
      <td>1º ao 10º dia pós-parto</td>
      <td>Hemostasia mecânica e miotamponamento; descida rápida do fundo uterino; lóquios rubros e serosos; apojadura láctea (2º a 4º dia); natriurese e poliúria fisiológicas.</td>
      <td>Hemorragia pós-parto precoce (atonia uterina, hematomas pélvicos); ingurgitamento mamário patológico; início precoce de infecção puerperal; blues puerperal.</td>
    </tr>
    <tr>
      <td><strong>Puerpério Tardio</strong></td>
      <td>11º ao 45º dia pós-parto</td>
      <td>Útero torna-se intrapélvico (10º a 14º dia); lóquios serosos transicionam para alba e cessam; regeneração endometrial geral; restauração do débito cardíaco.</td>
      <td>Endometrite tardia; mastite puerperal aguda; abscessos mamários; tromboflebite pélvica séptica; emergência de depressão pós-parto ou psicose puerperal.</td>
    </tr>
    <tr>
      <td><strong>Puerpério Remoto</strong></td>
      <td>Após o 45º dia pós-parto</td>
      <td>Regeneração e remodelamento histológico do sítio placentário; término das repercussões endócrinas gravídicas; retorno dos ciclos ovulatórios condicionado à amamentação.</td>
      <td>Gestação não planejada por falha ou ausência de contracepção; depressão pós-parto crônica não diagnosticada; queixas sexuais (dispareunia por atrofia hipoestrogênica).</td>
    </tr>
  </tbody>
</table>
`
  },
  {
    id: 'fisiologia-involucao-uterina-loquios',
    title: '2. Fisiologia e Anatomia da Involução Uterina e Dinâmica dos Lóquios',
    body_html: `
<h3>Involução Anatômica e Redução de Massa do Útero</h3>
<p>Durante a gestação a termo, o miométrio sofre uma monumental hipertrofia de suas fibras musculares lisas (as fibras alongam-se até 10 vezes e aumentam sua espessura em cerca de 5 vezes), associada a uma hiperplasia moderada e a uma prodigiosa proliferação vascular e deposição de tecido conjuntivo elástico. Imediatamente após a saída da placenta, a massa uterina atinge aproximadamente <strong>1.000 gramas</strong>, medindo cerca de 20 centímetros de comprimento longitudinal.</p>
<p>O processo de involução uterina é um fenômeno biológico de velocidade estarrecedora: ao final da 1ª semana pós-parto, o peso do órgão cai pela metade, atingindo cerca de <strong>500 gramas</strong>; ao término da 2ª semana, reduz-se para <strong>300 gramas</strong>; e, ao final da 6ª semana (fim do puerpério tardio), atinge sua massa pré-gravídica basal de <strong>60 a 80 gramas</strong>. É fundamental enfatizar que a colossal diminuição da massa miometrial não decorre de necrose ou destruição celular, mas sim de um intenso processo de <strong>autofagia intracelular e atrofia enzimática proteolítica</strong>: o citoplasma celular é degradado por hidrolases lisossomais, o colágeno e a elastina do interstício são reabsorvidos por colagenases e as fibras miometriais individuais encolhem drasticamente em comprimento e diâmetro, sem redução substancial do número absoluto de miócitos.</p>

<h3>Palpação Abdominal e Dinâmica de Altura do Fundo Uterino</h3>
<p>A palpação abdominal diária do fundo uterino é uma das propedêuticas clínicas mais simples, elegantes e informativas da assistência puerperal:</p>
<ul>
  <li><strong>Imediatamente após o parto e a dequitação:</strong> Com a contração espástica do miométrio, o fundo uterino situa-se tipicamente <strong>ao nível da cicatriz umbilical ou logo abaixo dela</strong> (cerca de 12 a 14 cm acima da sínfise púbica), apresentando consistência lenhosa e contornos bem delimitados (Globo de Segurança de Pinard);</li>
  <li><strong>Primeiras 12 a 24 horas:</strong> Devido ao relaxamento do tônus muscular pélvico e ao enchimento eventual da bexiga urinária (que pode desviar o órgão para a direita e para cima), o fundo pode se posicionar temporariamente na altura da cicatriz umbilical ou 1 a 2 cm acima dela;</li>
  <li><strong>Do 2º dia pós-parto em diante:</strong> O útero regride a uma taxa média regular de <strong>1,0 a 2,0 centímetros por dia</strong> (aproximadamente 1 través de dedo ao dia);</li>
  <li><strong>Em torno do 10º ao 14º dia pós-parto:</strong> O fundo do útero atinge o estreito superior da pelve e afunda sob a borda superior da sínfise púbica, tornando-se <strong>intrapélvico e não mais palpável pelo exame abdominal bimanual</strong> em condições normais;</li>
  <li><strong>Subinvolução Uterina:</strong> Qualquer retardo ou interrupção na taxa de descida do fundo uterino, ou a manutenção de consistência amolecida, dolorosa e assimétrica do órgão, define a subinvolução uterina. As duas principais causas que devem ser ativamente investigadas e tratadas são a <strong>infecção puerperal (endomiometrite)</strong> e a <strong>retenção de restos ovulares e placentários</strong>.</li>
</ul>

<h3>Histologia Endometrial e Regeneração do Sítio Placentário</h3>
<p>Durante o parto, a dequitação placentária promove a clivagem da decídua na sua camada esponjosa profunda. Consequentemente, a camada basal do endométrio permanece aderida ao miométrio subjacente. É a partir do epitélio das glândulas endometriais remanescentes e do estroma dessa camada basal que se processa a regeneração de todo o revestimento da cavidade uterina.</p>
<p>Em um período de cerca de 10 a 14 dias, a quase totalidade da superfície endometrial já se encontra reepitelizada, restaurando a barreira anatômica contra microrganismos ascendentes da vagina. A grande e notável exceção reside no <strong>sítio de inserção placentária</strong>: com uma área inicial de cerca de 8 a 10 cm de diâmetro e rico em grandes vasos uteroplacentários trombosados, a regeneração dessa área não ocorre por simples cicatrização superficial com tecido de granulação (o que geraria uma densa cicatriz fibrosa e inviabilizaria implantações gestacionais futuras). A cicatrização do leito placentário ocorre por um mecanismo primoroso de <strong>esfoliação e extrusão fisiológica</strong>: ondas de proliferação celular e neovascularização crescem por baixo das tromboses vasculares obliteradas e dos tecidos residuais, empurrando-os para fora em direção à cavidade uterina, onde são eliminados nos lóquios. Esse processo de remodelamento vascular e esfoliação completa consome de <strong>6 a 8 semanas</strong>, deixando a mucosa endometrial livre de cicatrizes distorcidas.</p>

<h3>Dinâmica, Coloração e Características Fisiológicas dos Lóquios</h3>
<p>Os lóquios consistem na secreção vaginal fisiológica eliminada durante o puerpério, composta por transudatos serosos, eritrócitos, fragmentos de decídua em descamação, células epiteliais cervicais e vaginais, muco e bactérias da flora comensal do trato genital inferior. O volume total médio de lóquios eliminado por uma mulher ao longo do puerpério varia de 200 a 500 mL, com fluxo mais intenso nos primeiros quatro a cinco dias.</p>
<p>A evolução cromática e composicional dos lóquios obedece a uma sequência cronológica estrita, cujo conhecimento é essencial para a prática clínica e provas de residência:</p>
<ol>
  <li><strong>Lóquios Hemáticos ou Vermelhos (<em>Lochia rubra</em> ou cruenta):</strong> Presentes do <strong>1º ao 3º ou 4º dia pós-parto</strong>. Caracterizam-se por aspecto francamente sanguinolento e coloração vermelho-viva ou vermelho-escura, reflexo do grande extravasamento de hemácias provenientes do leito placentário recém-descolado, além de pequenos coágulos, vernix caseoso fetal residual e células deciduais fragmentadas. O odor deve ser sui generis (semelhante ao fluxo menstrual normal), jamais fétido;</li>
  <li><strong>Lóquios Serossanguinolentos ou Pardos (<em>Lochia serosa</em>):</strong> Presentes do <strong>4º ao 10º dia pós-parto</strong>. À medida que o sangramento ativo do leito placentário cessa e a exsudação serosa aumenta, a secreção adquire uma coloração castanha, amarelada ou rosada translúcida. Ao exame microscópico, há redução dramática de eritrócitos e aumento proeminente de leucócitos polimorfonucleares, células deciduais degeneradas e muco cervical denso;</li>
  <li><strong>Lóquios Esbranquiçados ou Amarelados (<em>Lochia alba</em>):</strong> Presentes a partir do <strong>10º ao 14º dia até cerca de 3 a 6 semanas pós-parto</strong>. Apresentam coloração branca-leitosa, amarelada ou pálida, sendo constituídos quase que exclusivamente por leucócitos, células epiteliais descamadas, colesterol, ésteres graxos e muco. A eliminação diminui progressivamente até a cessação completa em torno da 4ª à 6ª semana.</li>
</ol>
<p><strong>Atenção Vermelha na Prova e no Plantão:</strong> A presença de <strong>lóquios purulentos, acinzentados ou francamente fétidos (odor pútrido ou cadavérico)</strong> é a clássica <em>lochia foetida</em>, indicativo inquestionável de <strong>infecção bacteriana puerperal (endometrite anaeróbia)</strong>. Por outro lado, a <em>loquiometria</em> (retenção anormal de lóquios na cavidade uterina com ausência de saída vaginal, decorrente de oclusão do orifício cervical interno por coágulo ou flexão uterina acentuada) pode causar dor pélvica intensa, aumento do volume uterino e risco elevado de proliferação bacteriana fulminante.</p>
`
  }
];
