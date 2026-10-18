// scripts/bloco-07-builders/build-151-part3.mjs

export const sec5 = {
  id: "anemias-hemoliticas-imunes-e-microangiopaticas",
  title: "5. Anemias Hemolíticas: Mecanismos Imunes (Anticorpos Quentes versus Frios) e Microangiopáticas (PTT versus SHU)",
  body_html: `
<p>As Anemias Hemolíticas decorrem do encurtamento patológico da sobrevida média normal dos eritrócitos (inferior a 120 dias) associado à incapacidade da medula óssea de suplantar essa perda com produção aumentada, apesar de uma resposta eritroide regenerativa intensa (IPR tipicamente &gt; 2,0 a 2,5). Clinicamente, o reconhecimento de qualquer processo hemolítico apoia-se em um conjunto de marcadores laboratoriais bioquímicos universais.</p>

<div class="clinical-box highlight">
  <h4>A Tétrade Laboratorial Universal da Hemólise</h4>
  <ol>
    <li><strong>Reticulocitose Absoluta Elevada (IPR &gt; 2,0 a 2,5):</strong> Traduz a hiperplasia e a hiperproliferação eritroide medular compensatória induzida por níveis elevados de eritropoietina.</li>
    <li><strong>Hiperbilirrubinemia Indireta (Não Conjugada):</strong> A degradação do anel heme da hemoglobina pela enzima heme-oxigenase nos macrófagos gera biliverdina e, em seguida, bilirrubina livre (indireta). Como a taxa de produção excede a capacidade de glicuronidação dos hepatócitos, a bilirrubina indireta eleva-se no plasma (geralmente entre 1,5 e 4,0 mg/dL), manifestando-se clinicamente por <strong>Icterícia leve a moderada de coloração amarelo-limão, com fezes de coloração normal ou pleiocrômicas (ausência de colúria clássica e ausência de acolia fecal)</strong>.</li>
    <li><strong>Elevação Acentuada do Lactato Desidrogenase (LDH Sérica):</strong> A enzima LDH é extremamente abundante no citosol das hemácias; a destruição de eritrócitos libera quantidades maciças de LDH no plasma, correlacionando-se diretamente com a intensidade da hemólise.</li>
    <li><strong>Queda Drástica ou Consumo Completo da Haptoglobina Sérica:</strong> A Haptoglobina é uma proteína plasmática sintetizada pelo fígado cuja função é capturar e ligar-se com altíssima avidez à hemoglobina livre liberada no plasma. O complexo Hb-Haptoglobina é rapidamente internalizado e degradado pelos macrófagos hepáticos via receptor CD163. Portanto, <strong>a presença de níveis séricos de Haptoglobina indetectáveis (&lt; 10 a 20 mg/dL) é o marcador mais sensível e precoce de hemólise intravascular e extravascular ativa</strong>.</li>
  </ol>
</div>

<h3>5.1. Hemólise Extravascular versus Hemólise Intravascular</h3>
<ul>
  <li><strong>Hemólise Extravascular (Predominante):</strong> A destruição das hemácias ocorre nos cordões sinusais do sistema reticuloendotelial, principalmente no <strong>Baço</strong> (e secundariamente no fígado). As hemácias que sofreram opsonização por anticorpos IgG ou exibem rigidez de membrana perdem deformabilidade e são fagocitadas pelos macrófagos esplênicos. <em>Clínica:</em> Presença frequente de <strong>Esplenomegalia</strong>, icterícia e formação crônica de cálculos biliares radiopacos de bilirrubinato de cálcio (litíase biliar pigmentada preta). Não há hemoglobinúria.</li>
  <li><strong>Hemólise Intravascular:</strong> As hemácias são lisadas mecanicamente ou por ataque direto do Complexo de Ataque à Membrana (MAC C5b-9 do complemento) diretamente na luz dos vasos sanguíneos. A liberação direta de tetrâmeros de hemoglobina livre no plasma satura a haptoglobina; o excesso dissocia-se em dímeros que atravessam livremente os glomérulos renais, provocando <strong>Hemoglobinúria (urina de cor escura avermelhada/acastanhada, "cor de refrigerante de cola")</strong> e oxidação da hemoglobina livre a metemoglobina com desprendimento de hemosiderina nas células tubulares renais (<strong>Hemossiderinúria</strong> detectada pela coloração de Azul da Prússia / Reação de Perls no sedimento urinário após 48 a 72 horas).</li>
</ul>

<h3>5.2. Anemias Hemolíticas Autoimunes (AHAI) e o Teste de Coombs Direto</h3>
<p>As Anemias Hemolíticas Autoimunes derivam da síntese aberrante de autoanticorpos direcionados contra antígenos presentes na superfície das próprias hemácias do indivíduo. O padrão-ouro para o diagnóstico imunológico é o <strong>Teste de Coombs Direto (Teste da Antiglobulina Direta - TAD)</strong>. O soro de Coombs contém anticorpos anti-IgG humana e anti-fração C3d do complemento; quando adicionado a uma suspensão de hemácias do paciente, se as hemácias estiverem recobertas por autoanticorpos ou complemento in vivo, ocorre aglutinação imediata em ponte visível a olho nu (Coombs Positivo).</p>

<p>As AHAIs dividem-se em duas grandes categorias imunológicas e térmicas:</p>

<table class="book-table">
  <thead>
    <tr>
      <th>Característica Clínica e Imunológica</th>
      <th>AHAI por Anticorpos QUENTES</th>
      <th>AHAI por Anticorpos FRIOS (Doença das Crioaglutininas)</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>Classe do Autoanticorpo</strong></td>
      <td><strong>IgG policlonal</strong> (raramente IgA)</td>
      <td><strong>IgM monoclonal ou policlonal</strong></td>
    </tr>
    <tr>
      <td><strong>Temperatura Ótima de Reatividade</strong></td>
      <td>Reage em temperatura corporal central (<strong>37 ºC</strong>)</td>
      <td>Reage em baixas temperaturas periféricas (<strong>0 ºC a 4 ºC</strong>; até 30 ºC)</td>
    </tr>
    <tr>
      <td><strong>Sítio Anatômico da Hemólise</strong></td>
      <td><strong>EXTRAVASCULAR no BAÇO</strong> (macrófagos esplênicos com receptores Fc-gama)</td>
      <td><strong>EXTRAVASCULAR no FÍGADO</strong> (via receptor de C3b) e parcialmente Intravascular (C5b-9)</td>
    </tr>
    <tr>
      <td><strong>Morfologia no Sangue Periférico</strong></td>
      <td><strong>Microesferócitos</strong> (esferocitose adquirida de alta intensidade)</td>
      <td><strong>Autoaglutinação de hemácias em grumos</strong> à temperatura ambiente</td>
    </tr>
    <tr>
      <td><strong>Resultado do Teste de Coombs Direto (TAD)</strong></td>
      <td><strong>Positivo para IgG</strong> (ou IgG + C3d)</td>
      <td><strong>Positivo EXCLUSIVAMENTE para Fração C3d do Complemento</strong> (a IgM dissocia-se na circulação central)</td>
    </tr>
    <tr>
      <td><strong>Doenças e Fatores Associados</strong></td>
      <td>• Idiopática (50%)<br>• Lúpus Eritematoso Sistêmico (LES)<br>• Leucemia Linfoide Crônica (LLC) e Linfomas não Hodgkin<br>• Fármacos (Alfa-metildopa, Penicilinas em altas doses, Cefalosporinas)</td>
      <td>• Infecção aguda por <em>Mycoplasma pneumoniae</em> (sorologia anti-I)<br>• Mononucleose Infecciosa por Vírus Epstein-Barr (anti-i)<br>• Doença Linfoproliferativa B clonal indolente do idoso</td>
    </tr>
    <tr>
      <td><strong>Manifestações Clínicas Específicas</strong></td>
      <td>Instalação subaguda ou aguda de palidez, icterícia, taquicardia e esplenomegalia. Quando associada a <strong>Plaquetopenia Autoimune (PTI)</strong>, recebe o nome de <strong>Síndrome de Evans</strong>.</td>
      <td><strong>Acrocianose dolorosa desencadeada pelo frio</strong> (coloração violácea/azulada nas orelhas, ponta do nariz, dedos das mãos e pés que regride ao reaquecer) por obstrução microvascular por hemácias aglutinadas.</td>
    </tr>
    <tr>
      <td><strong>Tratamento Farmacológico e Resposta</strong></td>
      <td>
        1. <strong>CORTICOTERAPIA SISTÊMICA (Prednisona 1 a 1,5 mg/kg/dia):</strong> Resposta em 80% dos casos.<br>
        2. <strong>Rituximabe (Anti-CD20)</strong> nas formas refratárias.<br>
        3. <strong>Esplenectomia Cirúrgica:</strong> Altamente eficaz (remove o principal sítio de destruição celular).
      </td>
      <td>
        1. <strong>EVITAR EXPOSIÇÃO AO FRIO (Aquecimento corporal)</strong>.<br>
        2. <strong>Corticoides e Esplenectomia são TOTALMENTE INEFICAZES E NÃO DEVEM SER REALIZADOS!</strong><br>
        3. Tratamento de escolha: <strong>Rituximabe</strong> isolado ou associado a Bendamustina; inibidor de C1s (Sutimlimabe).
      </td>
    </tr>
  </tbody>
</table>

<div class="clinical-box alert">
  <h4>Atenção de Prova: A Gênese do Esferócito na AHAI Quente</h4>
  <p>Na AHAI por anticorpos quentes, a IgG recobre o eritrócito. Ao circular pelos cordões sinusais de Billroth no baço, os macrófagos locais não conseguem englobar toda a hemácia de uma só vez; eles "abocanham" e fagocitam apenas o fragmento de membrana ligado à porção Fc do anticorpo. A hemácia perde área de membrana lipídica sem perder volume citoplasmático de hemoglobina. Por uma lei puramente geométrica, a esfera é a forma tridimensional que possui a menor relação área de superfície/volume; logo, a hemácia assume formato esférico perfeito, perdendo a palidez central e tornando-se um <strong>Microesferócito</strong>. Como o esferócito não tem flexibilidade para cruzar os poros endoteliais esplênicos de 2 a 3 micrômetros, ele é destruído nas passagens subsequentes pelo baço.</p>
</div>

<h3>5.3. Anemias Hemolíticas Microangiopáticas: PTT versus SHU</h3>
<p>As Microangiopatias Trombóticas (MAT) são síndromes clínicas gravíssimas caracterizadas pela tríade fisiopatológica comum:</p>
<ol>
  <li><strong>Anemia Hemolítica Microangiopática (AHMA):</strong> Fragmentação mecânica das hemácias que colidem contra microtrombos de fibrina e plaquetas impactados na microcirculação arteriolar e capilar, gerando os patognomônicos <strong>ESQUIZÓCITOS</strong> (hemácias em capacete, em meia-lua ou triangulares no esfregaço de sangue periférico; presença &gt; 1% de esquizócitos confirma microangiopatia).</li>
  <li><strong>Plaquetopenia de Consumo Severa:</strong> Sequestro massivo de plaquetas na formação dos microtrombos intraluminais disseminados.</li>
  <li><strong>Isquemia Tissular e Disfunção Orgânica:</strong> Oclusão mecânica da luz vascular com hipoperfusão do sistema nervoso central, rins, coração e trato gastrointestinal.</li>
</ol>

<p><em>Marcador Laboratorial Negativo Mandatório:</em> Por se tratar de trombos puramente plaquetários sem ativação difusa em cascata da coagulação secundária, <strong>o coagulograma na PTT e na SHU é RIGOROSAMENTE NORMAL (TP normal, TTPa normal, Fibrinogênio normal)</strong>, o que as diferencia de forma absoluta da Coagulação Intravascular Disseminada (CIVD, onde TP e TTPa estão prolongados e o fibrinogênio cai).</p>

<h4>A. Púrpura Trombocitopênica Trombótica (PTT / Síndrome de Moschcowitz)</h4>
<p>A PTT acomete predominantemente adultos jovens (com predomínio feminino de 3:1). A sua causa etiopatogênica é a <strong>Deficiência Severa da Metaloproteinase ADAMTS13 (&lt; 10% de atividade enzimática plasmática)</strong>.</p>
<ul>
  <li>O Fator de von Willebrand (FVW) é sintetizado pelo endotélio como multímeros ultra-grandes de alto peso molecular (UL-VWF), dotados de altíssimo potencial adesivo e pró-trombótico.</li>
  <li>A enzima ADAMTS13 é responsável por clivar fisiologicamente esses multímeros gigantes em fragmentos menores e menos reativos.</li>
  <li>Na PTT Adquirida (95% dos casos), o indivíduo sintetiza autoanticorpos neutralizantes da classe IgG dirigidos contra a enzima ADAMTS13. Na ausência da enzima, os multímeros ultra-gigantes de FVW permanecem ancorados à superfície endotelial, capturando e ativando plaquetas aos milhões espontaneamente em áreas de alto cisalhamento vascular.</li>
</ul>

<div class="clinical-box highlight">
  <h4>A Pêntade Clássica de Moschcowitz na PTT</h4>
  <p>Historicamente descrita como uma pêntade diagnóstica (presente de forma completa em apenas 20% a 30% dos pacientes contemporâneos):</p>
  <ol>
    <li><strong>Anemia Hemolítica Microangiopática (Coombs Direto NEGATIVO com esquizócitos &gt; 1-2%, LDH nas alturas e haptoglobina zero).</strong></li>
    <li><strong>Trombocitopenia Grave (frequentemente &lt; 20.000 a 30.000/mm³ com manifestações hemorrágicas mucocutâneas — petéquias, gengivorragia).</strong></li>
    <li><strong>Disfunção Neurológica Flutuante (em &gt; 65% dos casos):</strong> Cefaleia intensa, confusão mental, afasia transitória, déficits focais motores e sensitivos transitórios que mudam de lado no mesmo dia, crises convulsivas e coma.</li>
    <li><strong>Febre de Origem Inexplicada (em 50% dos casos).</strong></li>
    <li><strong>Acometimento Renal Discreto a Moderado:</strong> Proteinúria leve, micro-hematúria e elevação discreta de escórias nitrogenadas (a insuficiência renal anúrica severa é rara na PTT, predominando na SHU).</li>
  </ol>
</div>

<p><strong>Conduta e Emergência Médica na PTT:</strong> A PTT é uma emergência hematológica letal: sem tratamento, a mortalidade ultrapassa 90% dos casos em 24 a 48 horas. A tríade de conduta é:</p>
<ol>
  <li><strong>PLASMAFÉRESE TERAPÊUTICA (Plasma Exchange - PLEX) com Reposição de Plasma Fresco Congelado:</strong> Início imediato de urgência absoluta (meta: dentro das primeiras 4 a 8 horas). A plasmaférese atua de forma dupla: remove os autoanticorpos circulantes e os multímeros gigantes de FVW do sangue do paciente e repõe a enzima ADAMTS13 ativa contida no plasma doador. Realizada diariamente até contagem de plaquetas &gt; 150.000/mm³ e LDH normalizado por 2 a 3 dias consecutivos.</li>
  <li><strong>Imunossupressão Agressiva:</strong> Corticoterapia em altas doses (Metilprednisolona venosa 1 g/dia por 3 dias seguida de prednisona oral 1 mg/kg/dia) associada ao anticorpo monoclonal <strong>Rituximabe</strong> para erradicar a linhagem de plasmócitos produtores de anti-ADAMTS13.</li>
  <li><strong>Caplacizumabe (Nanocorpo Inibidor da Ligação FVW-Plaqueta):</strong> Bloqueia o domínio A1 do FVW, impedindo a ligação com a glicoproteína Ib plaquetária e abortando a microtrombose imediatamente.</li>
  <li><em>PROSCRIÇÃO FORMAL ABSOLUTA:</em> <strong>É TERMINANTEMENTE PROIBIDA A TRANSFUSÃO DE CONCENTRADO DE PLAQUETAS NA PTT!</strong> A transfusão de plaquetas atua como "jogar gasolina na fogueira", fornecendo o substrato que faltava para os multímeros gigantes formarem microtrombos em massa, desencadeando infarto agudo do miocárdio fulminante, AVE isquêmico e morte súbita imediata. Reservada exclusivamente em caso de hemorragia intracraniana ativa com risco iminente de óbito.</li>
</ol>

<h4>B. Síndrome Hemolítico-Urêmica (SHU)</h4>
<p>Distingue-se primariamente pelo predomínio absoluto da <strong>Lesão Renal Aguda Oligúrica/Anúrica Severa</strong> sobre os sintomas neurológicos:</p>
<ul>
  <li><strong>SHU Típica / Epidêmica (D+ / Associada a Diarreia):</strong> Responde por mais de 90% dos casos de SHU na infância. Causada pela ingestão de alimentos contaminados com cepas de <em>Escherichia coli</em> produtora de Toxina Shiga (STEC / sorotipo clássico O157:H7) ou <em>Shigella dysenteriae</em>. A criança apresenta pródromo de diarreia sanguinolenta (colite hemorrágica); cerca de 5 a 10 dias depois, a toxina atinge os rins via corrente sanguínea ligando-se aos receptores endoteliais Gb3 nos capilares glomerulares, gerando necrose endotelial, trombose microvascular glomerular e <strong>Insuficiência Renal Aguda anúrica necessitando de hemodiálise de urgência</strong>. O nível de ADAMTS13 é RIGOROSAMENTE NORMAL (&gt; 60%). <em>Tratamento:</em> Terapia intensiva de suporte e diálise; <strong>antibióticos e plasmaférese NÃO são recomendados na SHU típica por STEC</strong> (os antibióticos lisam as bactérias intestinais, aumentando a liberação sistêmica da toxina).</li>
  <li><strong>SHU Atípica (SHUa / Não Associada a Shiga):</strong> Causada por mutações genéticas com perda de função nas proteínas reguladoras da via alternativa do sistema complemento (Fator H, Fator I, CD46/MCP) ou ganho de função no Fator B e C3, resultando em ativação descontrolada permanente de C5b-9 na superfície endotelial glomerular. Tratamento de escolha revolucionário: <strong>Eculizumabe ou Ravulizumabe</strong> (anticorpos monoclonais inibidores da fração C5 do complemento).</li>
</ul>
`
};
