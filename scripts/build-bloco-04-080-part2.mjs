// Bloco 4 - Aula 080: Investigação de Surtos e Epidemias (Parte 2: Seções 5 a 8)

export const sec5 = {
  id: 'taxas-de-ataque-e-estudos-analiticos-em-surtos',
  title: '5. Taxas de Ataque, Risco Relativo, Odds Ratio e Identificação do Alimento/Veículo Causal',
  body_html: `
<h3>Taxa de Ataque: O Conceito e Fórmulas Matemáticas</h3>
<p>Em investigações de surtos e epidemias, a velocidade e a intensidade com que a doença acomete a população sob risco são quantificadas através da <strong>Taxa de Ataque (TA)</strong>. A taxa de ataque é, em essência conceitual, uma <strong>Incidência Acumulada</strong> calculada para um período restrito e bem delimitado de tempo (a duração do surto). Por convenção internacional, ela é expressa quase sempre sob a forma de <strong>porcentagem (%)</strong>:</p>

<div class="formula-box">
  $$\\text{Taxa de Ataque Geral (TA)} = \\frac{\\text{Número total de casos novos do surto}}{\\text{População total exposta e sob risco no início do surto}} \\times 100$$
</div>

<h3>Taxa de Ataque Secundária (TAS)</h3>
<p>A <strong>Taxa de Ataque Secundária (TAS)</strong> mede a transmissibilidade inter-humana de um agente infeccioso a partir de casos primários. Ela avalia a capacidade de propagação de pessoa a pessoa em ambientes fechados (coabitação domiciliar, enfermarias ou dormitórios escolares):</p>

<div class="formula-box">
  $$\\text{Taxa de Ataque Secundária (TAS)} = \\frac{\\text{Número de novos casos entre contatos domiciliares (após período de incubação)}}{\\text{Total de contatos suscetíveis expostos aos casos primários}} \\times 100$$
</div>
<p><strong>Atenção para regra crítica de cálculo de concurso:</strong> no denominador da Taxa de Ataque Secundária, <strong>DEVEM SER SUBTRAÍDOS os casos primários</strong> (pois eles trouxeram a doença de fora e não foram infectados dentro do domicílio) e <strong>os indivíduos previamente imunes</strong> (indivíduos vacinados com proteção comprovada ou que já tiveram a doença anteriormente). Se esses indivíduos não forem excluídos do denominador, a transmissibilidade secundária real será subestimada!</p>

<h3>A Tabela de Taxa de Ataque Específica por Alimento (Food-Specific Attack Rate Table)</h3>
<p>Quando um surto de gastrenterite aguda ocorre após um evento social com população fechada e conhecida (casamento, banquete empresarial, almoço comemorativo), o desenho epidemiológico analítico padrão-ouro de escolha é o <strong>Estudo de Coorte Histórica (ou Retrospectiva)</strong>. Todos os participantes são entrevistados e tabulados quanto ao que comeram e beberam.</p>

<p>Para cada alimento e bebida servida no cardápio, calcula-se:</p>
<ol>
  <li><strong>Taxa de Ataque entre os Expostos ao Alimento ($TA_{exp}$):</strong> Quantos dos que comeram o alimento ficaram doentes;</li>
  <li><strong>Taxa de Ataque entre os NÃO Expostos ao Alimento ($TA_{n\\tilde{a}o-exp}$):</strong> Quantos dos que NÃO comeram o alimento ficaram doentes;</li>
  <li><strong>Risco Relativo do Alimento ($RR$):</strong> Razão entre a taxa de ataque nos que comeram e a taxa de ataque nos que não comeram:
    $$RR = \\frac{TA_{exp}}{TA_{n\\tilde{a}o-exp}}$$
  </li>
  <li><strong>Diferença de Riscos / Risco Atribuível ($RA$):</strong> A subtração direta: $RA = TA_{exp} - TA_{n\\tilde{a}o-exp}$.</li>
</ol>

<h3>Os Três Critérios Epistemológicos para Incriminar o Veículo/Alimento Causal em Provas</h3>
<p>Ao analisar a tabela de alimentos em uma questão de residência médica, o candidato deve aplicar sistematicamente três critérios inegociáveis para identificar o alimento culpado com 100% de precisão:</p>
<ul>
  <li><strong>Critério 1: Maior Taxa de Ataque entre os que consumiram o alimento ($TA_{exp}$ mais alta):</strong> O alimento causal deve ter sido ingerido por quase todos os doentes (ex.: 85% a 95% de taxa de ataque entre os que comeram);</li>
  <li><strong>Critério 2: Menor Taxa de Ataque entre os que NÃO consumiram o alimento ($TA_{n\\tilde{a}o-exp}$ mais baixa ou nula):</strong> Aqueles que se abstiveram de comer o alimento suspeito devem apresentar taxa de adoecimento muito baixa (idealmente 0% a 5%);</li>
  <li><strong>Critério 3: Maior Risco Relativo ($RR$) e Maior Diferença de Taxa de Ataque ($RA$):</strong> O alimento causador do surto é invariavelmente aquele que apresenta a <strong>maior razão $RR$</strong> e a <strong>maior diferença percentual positiva</strong> ($TA_{exp} - TA_{n\\tilde{a}o-exp}$).</li>
</ul>

<h3>Exemplo Prático Completo de Tabela de Investigação de Surto Alimentar</h3>
<table class="book-table">
  <thead>
    <tr>
      <th rowspan="2">Alimento Servido</th>
      <th colspan="3">Consumiram o Alimento (Expostos)</th>
      <th colspan="3">NÃO Consumiram o Alimento (Não Expostos)</th>
      <th rowspan="2">Risco Relativo (RR)</th>
      <th rowspan="2">Diferença de Taxa (RA)</th>
      <th rowspan="2">Interpretação Epidemiológica</th>
    </tr>
    <tr>
      <th>Doentes</th>
      <th>Total</th>
      <th>Taxa de Ataque</th>
      <th>Doentes</th>
      <th>Total</th>
      <th>Taxa de Ataque</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>Salada de Maionese Caseira</strong></td>
      <td><strong>48</strong></td>
      <td><strong>50</strong></td>
      <td><strong>96,0%</strong></td>
      <td><strong>2</strong></td>
      <td><strong>50</strong></td>
      <td><strong>4,0%</strong></td>
      <td><strong>24,0</strong></td>
      <td><strong>+92,0%</strong></td>
      <td><strong>VEÍCULO CAUSAL DO SURTO:</strong> Maior RR (24 vezes mais risco), maior diferença e quase todos os que comeram adoeceram.</td>
    </tr>
    <tr>
      <td><strong>Churrasco de Picanha</strong></td>
      <td>35</td>
      <td>70</td>
      <td>50,0%</td>
      <td>15</td>
      <td>30</td>
      <td>50,0%</td>
      <td>1,0</td>
      <td>0,0%</td>
      <td><strong>Sem associação:</strong> Taxa idêntica entre expostos e não expostos ($RR = 1,0$).</td>
    </tr>
    <tr>
      <td><strong>Arroz Branco</strong></td>
      <td>40</td>
      <td>80</td>
      <td>50,0%</td>
      <td>10</td>
      <td>20</td>
      <td>50,0%</td>
      <td>1,0</td>
      <td>0,0%</td>
      <td><strong>Sem associação:</strong> Alimento consumido pela maioria sem gradiente de risco.</td>
    </tr>
    <tr>
      <td><strong>Bolo de Morango</strong></td>
      <td>28</td>
      <td>40</td>
      <td>70,0%</td>
      <td>22</td>
      <td>60</td>
      <td>36,7%</td>
      <td>1,91</td>
      <td>+33,3%</td>
      <td>Associação fraca/confundimento: Muitos indivíduos comeram a maionese e o bolo juntos.</td>
    </tr>
    <tr>
      <td><strong>Refrigerante</strong></td>
      <td>45</td>
      <td>90</td>
      <td>50,0%</td>
      <td>5</td>
      <td>10</td>
      <td>50,0%</td>
      <td>1,0</td>
      <td>0,0%</td>
      <td>Bebida consumida homogeneamente, sem relação com o adoecimento.</td>
    </tr>
  </tbody>
</table>

<h3>Estudos de Caso-Controle em Surtos Comunitários Abertos</h3>
<p>Quando o surto ocorre na comunidade aberta (por exemplo, centenas de munícipes apresentando meningite ou diarreia sem um evento social comum restrito), é inviável e metodologicamente incorreto calcular a taxa de ataque (pois não se conhece a população exposta exata). Nesses cenários, a epidemiologia analítica utiliza o <strong>Estudo de Caso-Controle</strong>:</p>
<ol>
  <li>Selecionam-se os <strong>Casos</strong> (indivíduos que preenchem a definição de caso confirmado da doença);</li>
  <li>Selecionam-se os <strong>Controles</strong> (indivíduos com perfil demográfico semelhante, residentes na mesma área, mas que <strong>não adoeceram</strong>);</li>
  <li>Investiga-se retrospectivamente a história de exposição pregressa a potenciais fontes (fontes de água, feiras livres, restaurantes específicos, vacinação prévia);</li>
  <li>Calcula-se a medida de associação adequada: a <strong>Razão de Chances ou Odds Ratio ($OR$)</strong> através da tabela 2x2 clássica:
    $$OR = \\frac{a \\times d}{b \\times c}$$
  </li>
  <li>Aplica-se o teste estatístico do qui-quadrado ($\chi^2$) e calcula-se o Intervalo de Confiança de 95% ($IC 95\\%$). Se o $IC 95\\%$ não contiver o valor 1,0 e o $p &lt; 0,05$, a associação é estatisticamente significante.</li>
</ol>
`
};

export const sec6 = {
  id: 'etiologia-clinica-e-diagnostico-diferencial-de-surtos',
  title: '6. Etiologia Clínica, Período de Incubação e Diagnósticos Diferenciais dos Principais Surtos',
  body_html: `
<h3>O Período de Incubação como Bússola Diagnóstica nas Doenças Transmitidas por Alimentos (DTA)</h3>
<p>Nas toxinfecções alimentares agudas, o intervalo transcorrido entre a ingestão do alimento contaminado e o aparecimento dos primeiros sintomas clínicos (período de incubação) é o indicador mais sensível para deduzir o agente etiológico provável e a fisiopatologia subjacente (intoxicação pré-formada versus infecção bacteriana invasiva):</p>

<table class="book-table">
  <thead>
    <tr>
      <th>Janela de Incubação</th>
      <th>Patógeno Etiológico Clássico</th>
      <th>Fisiopatologia e Mecanismo de Ação</th>
      <th>Alimentos Típicos e Quadro Clínico Distintivo</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>Ultracurto:<br>1 a 6 Horas</strong></td>
      <td>
        • <strong><em>Staphylococcus aureus</em></strong> (enterotoxinas termorresistentes A a E);<br>
        • <strong><em>Bacillus cereus</em></strong> (síndrome emética, toxina cereulida pré-formada).
      </td>
      <td><strong>Intoxicação Pura por Toxina Pré-formada no Alimento:</strong> As bactérias multiplicaram-se no alimento deixado à temperatura ambiente e secretaram toxinas estáveis ao calor. O reaquecimento mata a bactéria viva, mas <em>NÃO destrói a toxina pré-formada</em>. Não há necessidade de colonização intestinal.</td>
      <td>
        • <strong>Sintomas:</strong> Náuseas intensas incoercíveis, <strong>vômitos em jato profusos e repetidos</strong>, cólicas abdominais moderadas, geralmente <strong>SEM FEBRE</strong> e com diarreia ausente ou branda transitória. Recuperação rápida em 24h.<br>
        • <strong>Alimentos:</strong> Maionese caseira, tortas doces recheadas, massas cremosas, arroz frito reaquecido (típico do <em>B. cereus</em> emético).
      </td>
    </tr>
    <tr>
      <td><strong>Curto a Intermediário:<br>8 a 16 Horas</strong></td>
      <td>
        • <strong><em>Clostridium perfringens</em></strong> (tipo A);<br>
        • <strong><em>Bacillus cereus</em></strong> (síndrome diarreica, enterotoxinas produzidas <em>in vivo</em>).
      </td>
      <td><strong>Toxinfecção com Formação Intestinal:</strong> Ingestão maciça de esporos bacterianos que germinam no lúmen intestinal e liberam enterotoxinas durante a esporulação no cólon.</td>
      <td>
        • <strong>Sintomas:</strong> Cólicas abdominais intensas e diarreia aquosa profusa; náuseas e vômitos são raros; febre habitualmente ausente.<br>
        • <strong>Alimentos:</strong> Carnes assadas bovinas ou de aves, ensopados e molhos preparados em grandes volumes mantidos aquecidos em estufas mornas inadequadas ($&lt; 60^\circ\\text{C}$).
      </td>
    </tr>
    <tr>
      <td><strong>Intermediário:<br>12 a 72 Horas</strong></td>
      <td>
        • <strong><em>Salmonella</em> não tifoide</strong> (<em>S. enterica</em> sorovares Enteritidis e Typhimurium);<br>
        • <strong><em>Campylobacter jejuni</em></strong>;<br>
        • <strong><em>Shigella</em> spp.</strong> (<em>S. dysenteriae, S. flexneri</em>);<br>
        • <strong><em>Escherichia coli</em> Enteroinvasiva (ECEI)</strong> ou <strong>Entero-hemorrágica (ECEH / STEC O157:H7)</strong>.
      </td>
      <td><strong>Infecção Bacteriana Invasiva / Citotóxica:</strong> Ingestão de bactérias viáveis que colonizam, invadem a mucosa dos enterócitos e da lâmina própria ileocólica, desencadeando resposta inflamatória neutrofílica transmural intensa e destruição epitelial.</td>
      <td>
        • <strong>Sintomas:</strong> <strong>FEBRE ELEVADA ($38,5^\circ\\text{C}$ a $40^\circ\\text{C}$)</strong>, calafrios, cefaleia, cólicas abdominais difusas, diarreia inflamatória profusa que frequentemente evolui para <strong>fezes com muco, pus e sangue vivo (Síndrome Disentérica)</strong>.<br>
        • <strong>Alimentos:</strong> Ovos crus ou malcozidos, aves malpassadas, leite não pasteurizado, carne moída bovina contaminada por fezes bovinas. Risco de Síndrome Hemolítico-Urêmica (SHU) na ECEH/STEC!
      </td>
    </tr>
    <tr>
      <td><strong>Viral Intermediário:<br>24 a 48 Horas</strong></td>
      <td>
        • <strong>Norovírus</strong> (Caliciviridae);<br>
        • <strong>Rotavírus</strong> (em crianças não vacinadas).
      </td>
      <td>Replicação viral com atrofia transitória das microvilosidades do intestino delgado e má absorção osmótica de carboidratos.</td>
      <td>
        • <strong>Sintomas:</strong> Início súbito de náuseas, vômitos copiosos associados a diarreia aquosa não sanguinolenta, dor abdominal e febre baixa em adultos e crianças. Altíssima contagiosidade inter-humana secundária.<br>
        • <strong>Cenários:</strong> Navios de cruzeiro, hotéis, restaurantes, escolas, frutos do mar consumidos crus (ostras) coletados em águas contaminadas por esgoto sanitário.
      </td>
    </tr>
    <tr>
      <td><strong>Longo / Neurotóxico:<br>12 a 36 Horas</strong></td>
      <td>• <strong><em>Clostridium botulinum</em></strong> (neurotoxina botulínica pré-formada tipos A, B ou E).</td>
      <td>A neurotoxina botulínica é absorvida no trato gastrointestinal, ganha a circulação hematogênica e bloqueia irreversivelmente a liberação de acetilcolina na placa motora e nas sinapses colinérgicas periféricas.</td>
      <td>
        • <strong>Sintomas:</strong> Sintomas gastrointestinais iniciais inconstantes seguidos por <strong>Paralisia Flácida Motora Descendente Simétrica</strong> sem febre e sem alteração sensorial: ptose palpebral, diplopia, midríase fixa, disfagia, disartria, fraqueza de membros e parada respiratória por paralisia do diafragma.<br>
        • <strong>Alimentos:</strong> Conservas vegetais caseiras (palmito, picles), embutidos cárneos artesanais e pescados defumados anaeróbicos.
      </td>
    </tr>
  </tbody>
</table>
`
};

export const sec7 = {
  id: 'casos-clinicos-estruturados-investigacao-surtos',
  title: '7. Casos Clínicos Estruturados e Raciocínio Prático em Epidemiologia de Campo',
  body_html: `
<h3>Caso Clínico 1: Surto Abrupto de Náuseas e Vômitos após Almoço de Confraternização</h3>
<p><strong>Cenário Clínico:</strong> Um médico plantonista de uma UPA atende, em um intervalo de três horas durante a tarde de um sábado, 22 funcionários de uma empresa de logística. Todos relatam início abrupto de náuseas intensas, salivação excessiva, múltiplos episódios de vômitos em jato incoercíveis e cólicas abdominais moderadas. Nenhum paciente refere febre ($T &lt; 37,2^\circ\\text{C}$ em todos) e apenas 4 apresentaram fezes pastosas. Todos participaram de um almoço de comemoração na sede da empresa iniciado às 12h30min, e os primeiros vômitos começaram entre 14h30min e 16h00min (cerca de 2 a 3 horas e meia após a refeição). O cardápio continha churrasco de alcatra, arroz, feijão tropeiro e uma grande tigela de salada de batata com maionese caseira preparada às 8h da manhã e deixada sobre a mesa sem refrigeração.</p>

<p><strong>Perguntas Estruturadas para Discussão Médica:</strong></p>
<ol>
  <li><em>Qual o diagnóstico sindrômico e a principal hipótese etiológica?</em> Trata-se de um <strong>Surto de Toxinfecção Alimentar Aguda por Enterotoxina Pré-formada de <em>Staphylococcus aureus</em></strong>. O período de ultracurto de incubação (2 a 4 horas), a proeminência absoluta de náuseas e vômitos em jato, a ausência de febre e o histórico de maionese mantida em temperatura ambiente são patognomônicos.</li>
  <li><em>Qual o mecanismo fisiopatológico da doença?</em> As cepas enterotoxigênicas de <em>S. aureus</em> (frequentemente inoculadas por manipuladores com ferimentos na pele ou portadores nasais assintomáticos) multiplicam-se no substrato rico em proteínas e lipídios e secretam enterotoxinas termoestáveis. Uma vez ingeridas, as toxinas estimulam receptores neurais no trato gastrointestinal superior e no centro do vômito bulbar via nervo vago.</li>
  <li><em>Qual a conduta clínica e de vigilância sanitária imediata?</em>
    <ul>
      <li><strong>Clínica:</strong> Terapia de suporte com hidratação venosa isotônica e antieméticos (ondansetrona). <strong>Antimicrobianos são formalmente contraindicados</strong>, pois a bactéria viva não coloniza o hospedeiro e a doença é uma intoxicação química autolimitada;</li>
      <li><strong>Vigilância:</strong> Notificação imediata ao Centro de Vigilância Epidemiológica Municipal, coleta de amostras de vômito dos doentes e das sobras da maionese para análise bacteriológica e detecção da enterotoxina pelo LACEN, e interdição cautelar da cozinha para fiscalização de boas práticas de manipulação.</li>
    </ul>
  </li>
</ol>

<h3>Caso Clínico 2: Febre Prolongada e Icterícia com Primatas Mortos na Região</h3>
<p><strong>Cenário Clínico:</strong> Três trabalhadores rurais de uma mesma fazenda madeireira procuram o pronto-socorro regional no interior do Paraná com história de 5 a 6 dias de febre alta súbita, cefaleia retro-orbitária, lombalgia excruciante e mialgias generalizadas. Ao exame físico, o médico constata prostração profunda, icterícia escleral visível ($3+/4+$), oligúria e pulso lento e desproporcional à febre ($T = 39,4^\circ\\text{C}$ com $FC = 62$ bpm — <em>Sinal de Faget</em>). Familiares informam que, nas últimas duas semanas, foram encontrados quatro macacos bugios mortos na mata onde os operários realizavam o corte de árvores.</p>

<p><strong>Análise e Condutas Imediatas:</strong></p>
<ul>
  <li><strong>Hipótese Principal:</strong> <strong>Febre Amarela Silvestre em Fase Toxêmica Grave</strong>. A presença do Sinal de Faget (dissociação pulso-temperatura) associado a icterícia, insuficiência renal oligúrica e antecedentes de <em>epizootia de primatas não humanos (PNH)</em> fecha a suspeita clínica inequívoca;</li>
  <li><strong>Conduta de Vigilância Epidemiológica:</strong>
    <ol>
      <li><strong>Notificação Compulsória IMEDIATA (em até 24 horas)</strong> para a Secretaria Municipal, Estadual e Ministério da Saúde (CIEVS);</li>
      <li>Internação imediata em leito de Terapia Intensiva com suporte hemodinâmico, monitorização de coagulopatia e função renal;</li>
      <li>Coleta de amostra de sangue total para Biologia Molecular (RT-PCR para Febre Amarela) e sorologia (ELISA IgM) enviada com urgência ao LACEN;</li>
      <li><strong>Ações de Bloqueio de Campo no Território:</strong> Envio imediato da equipe de resposta rápida para intensificação da vacinação contra febre amarela casa a casa em todo o raio de 5 a 10 km da fazenda, além de coleta de vísceras dos primatas mortos (fígado e cérebro) para necropsia viral e borrifação de inseticida para controle vetorial de <em>Haemagogus</em> e <em>Sabethes</em>.</li>
    </ol>
  </li>
</ul>

<h3>Caso Clínico 3: Surto Escolar de Febre Alta e Diarreia Mucossanguinolenta</h3>
<p><strong>Cenário Clínico:</strong> Em uma creche comunitária com 120 crianças de 2 a 5 anos de idade, 35 alunos e 4 educadoras desenvolvem febre de $39^\circ\\text{C}$, cólicas abdominais severas tipo tenesmo e episódios frequentes de diarreia aquosa que, após 24 horas, evoluem para evacuações de pequeno volume compostas por muco espesso, pus e estrias de sangue vivo (disenteria clássica). Duas crianças evoluem com convulsões febris e sonolência.</p>

<p><strong>Avaliação Epidemiológica e Terapêutica:</strong></p>
<ul>
  <li><strong>Agente Causal Presumido:</strong> <strong><em>Shigella sonnei</em> ou <em>Shigella flexneri</em></strong> (Disenteria Bacilar / Shigelose). A shigelose caracteriza-se pela baixíssima dose infectante (bastam 10 a 100 bactérias para desencadear a doença), permitindo rápida transmissão fecal-oral direta de pessoa a pessoa em creches através de mãos contaminadas, fômites e brinquedos;</li>
  <li><strong>Condutas Mandatórias:</strong>
    <ul>
      <li>Isolamento de contato das crianças sintomáticas com afastamento temporário da creche até resolução dos sintomas e coprocultura negativa;</li>
      <li>Coleta de fezes frescas em meio de transporte Cary-Blair para coprocultura e antibiograma no LACEN;</li>
      <li>Tratamento antimicrobiano empírico guiado pelas diretrizes do Ministério da Saúde para disenteria infantil: <strong>Ceftriaxona parenteral ou Azitromicina oral</strong> (ou Ciprofloxacino conforme perfil de sensibilidade local), encurtando o curso clínico e reduzindo a excreção fecal do patógeno;</li>
      <li>Reforço incondicional dos protocolos de lavagem de mãos, higienização de fraldários e desinfecção de brinquedos com hipoclorito de sódio.</li>
    </ul>
  </li>
</ul>

<h3>Caso Clínico 4: Investigação de Disseminação Incomum em Hospital (Infecção Relacionada à Assistência à Saúde - IRAS)</h3>
<p><strong>Cenário Clínico:</strong> A Comissão de Controle de Infecção Hospitalar (CCIH) de um hospital terciário detecta 8 casos consecutivos de bacteremia por <em>Burkholderia cepacia</em> em pacientes internados na Unidade de Terapia Intensiva Coronariana ao longo de 10 dias. Todos os pacientes eram submetidos a monitorização de pressão arterial invasiva (PAI) e punção venosa profunda.</p>

<p><strong>Etapas Práticas de Resolução:</strong></p>
<ol>
  <li><strong>Confirmação do Diagnóstico e Surto:</strong> Hemoculturas confirmadas por espectrometria de massa (MALDI-TOF). A incidência basal histórica de <em>B. cepacia</em> naquele hospital era de zero casos nos últimos dois anos. Portanto, 8 casos configuram um <strong>grave surto nosocomial</strong>;</li>
  <li><strong>Formulação de Hipótese:</strong> A <em>Burkholderia cepacia</em> é uma bactéria ambiental oportunista com capacidade notável de sobreviver e multiplicar-se em soluções aquosas e desinfetantes antissépticos contaminados;</li>
  <li><strong>Investigação de Foco:</strong> Coletam-se culturas ambientais de todas as soluções utilizadas nos procedimentos: clorexidina alcoólica a 2%, água destilada estéril, soluções de heparina para flushing de cateteres e géis de ultrassonografia;</li>
  <li><strong>Confirmação e Ação:</strong> Isola-se a mesma cepa de <em>B. cepacia</em> em frascos multidose de solução de heparina utilizados para lavagem das linhas de pressão arterial invasiva. Ação sanitária: recolhimento imediato e descarte de todos os frascos do lote, notificação imediata à Anvisa pelo sistema Notivisa e implementação de frascos de dose única. O surto é cessado imediatamente.</li>
</ol>
`
};

export const sec8 = {
  id: 'sintese-de-alto-rendimento-e-armadilhas-enamed',
  title: '8. Síntese de Alto Rendimento e Diretrizes para Provas do ENAMED e Residência',
  body_html: `
<h3>Tabela Sinóptica das Regras de Ouro na Investigação de Surtos</h3>
<table class="book-table">
  <thead>
    <tr>
      <th>Conceito / Ponto Crítico</th>
      <th>Regra Inegociável para Concursos Médicos</th>
      <th>Pegadinha Recorrente de Prova</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>Conceito de Surto com 1 Caso</strong></td>
      <td>A ocorrência de <strong>UM ÚNICO CASO</strong> de doença erradicada (Poliomielite, Varíola) ou ausente da região (Febre Amarela urbana, Sarampo) <strong>já é considerada formalmente um surto e emergência de saúde pública</strong>.</td>
      <td>Afirmar que é necessário no mínimo 3 ou 5 casos confirmados para declarar formalmente um surto.</td>
    </tr>
    <tr>
      <td><strong>Cálculo do Canal Endêmico</strong></td>
      <td>Na série histórica dos últimos 3 a 5 anos, <strong>DEVE-SE EXCLUIR OS ANOS EPIDÊMICOS</strong> do cálculo da média e desvio-padrão.</td>
      <td>Incluir todos os anos na média indiscriminadamente, o que elevaria artificialmente o teto e mascararia novos surtos reais.</td>
    </tr>
    <tr>
      <td><strong>Momento das Medidas de Controle</strong></td>
      <td>As medidas de prevenção e bloqueio profilático devem ser iniciadas <strong>IMEDIATAMENTE</strong> diante de evidências plausíveis, sem esperar pelo relatório final ou término dos estudos analíticos.</td>
      <td>Aguardar o isolamento bacteriológico definitivo e o encerramento do estudo de coorte para interditar o restaurante ou vacinar contatos.</td>
    </tr>
    <tr>
      <td><strong>Denominador da Taxa de Ataque Secundária</strong></td>
      <td>No cálculo da TAS, <strong>subtraem-se do denominador os casos primários e as pessoas comprovadamente imunes</strong>.</td>
      <td>Dividir o número de casos secundários pelo total bruto de moradores da residência sem excluir o caso índice ou os indivíduos vacinados.</td>
    </tr>
    <tr>
      <td><strong>Identificação do Alimento Culpado</strong></td>
      <td>É o alimento com <strong>maior Taxa de Ataque nos expostos, menor Taxa de Ataque nos não expostos, maior Risco Relativo ($RR$) e maior Diferença de Risco ($RA$)</strong>.</td>
      <td>Confundir o alimento mais consumido em termos brutos com o alimento causal da toxinfecção.</td>
    </tr>
    <tr>
      <td><strong>Curva de Fonte Pontual vs Propagada</strong></td>
      <td>Fonte Pontual tem subida rápida unimodal e duração de 1 período de incubação; Fonte Propagada tem ondas sucessivas e separadas pelo período de incubação (transmissão pessoa a pessoa).</td>
      <td>Classificar um surto de sarampo em creche como fonte comum por achar que a creche é o "lugar comum".</td>
    </tr>
  </tbody>
</table>
`
};
