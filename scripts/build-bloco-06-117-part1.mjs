// scripts/build-bloco-06-117-part1.mjs
// Aula 117: Isquemia Mesentérica - Parte 1: Seções 1 a 4

export const sec1 = {
  id: 'anatomia-circulacao-esplancnica-arcos-colaterais',
  title: '1. Anatomia Cirúrgica da Circulação Esplâncnica: Tronco Celíaco, Artérias Mesentéricas e Vias Colaterais (Riolan e Drummond)',
  body_html: `
<h3>Arquitetura Vascular da Circulação Esplâncnica</h3>
<p>O trato gastrointestinal e seus anexos glandulares recebem aproximadamente <strong>20% a 25% do débito cardíaco basal em repouso</strong>, fração hemodinâmica que pode se elevar para até <strong>35% a 40% no período pós-prandial imediato</strong> (hiperemia pós-prandial fisiológica) para suportar os intensos processos de digestão enzimática, secreção mucosa e absorção ativa de nutrientes. A vascularização arterial de todo o intestino humano provém de três ramos viscerais ventrais ímpares da aorta abdominal:</p>

<table class="book-table">
  <thead>
    <tr>
      <th>Vaso Arterial Principal</th>
      <th>Origem Anatômica Aórtica e Topografia</th>
      <th>Território de Irrigação Primário</th>
      <th>Principais Ramos Terminais e Colaterais</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>Tronco Celíaco</strong></td>
      <td>Emerge da face anterior da aorta no nível de <strong>T12 - L1</strong>, logo abaixo dos pilares diafragmáticos (hiato aórtico).</td>
      <td>Intestino anterior embrionário (<em>foregut</em>): terço distal do esôfago, estômago, duodeno proximal até a papila duodenal maior (de Vater), fígado, vesícula biliar, baço e porção superior do pâncreas.</td>
      <td>Trifurca-se no tripé de Haller: <strong>Artéria Gástrica Esquerda</strong> (coronária estomáquica), <strong>Artéria Hepática Comum</strong> e <strong>Artéria Esplênica</strong>.</td>
    </tr>
    <tr>
      <td><strong>Artéria Mesentérica Superior (AMS)</strong></td>
      <td>Origina-se da aorta abdominal no nível de <strong>L1 - L2</strong> (cerca de 1 a 2 cm abaixo do tronco celíaco), descendo obliquamente atrás do colo do pâncreas e cruzando anteriormente o processo uncinado e a terceira porção do duodeno.</td>
      <td>Intestino médio embrionário (<em>midgut</em>): duodeno distal (abaixo da papila), todo o jejuno, todo o íleo, apêndice cecal, ceco, cólon ascendente e <strong>dois terços proximais do cólon transverso</strong>.</td>
      <td>Artéria Pancreaticoduodenal Inferior (anterior e posterior), 12 a 18 artérias jejunais e ileais (que formam arcadas vasculares e vasos retos), <strong>Artéria Ileocólica</strong>, <strong>Artéria Cólica Direita</strong> e <strong>Artéria Cólica Média</strong>.</td>
    </tr>
    <tr>
      <td><strong>Artéria Mesentérica Inferior (AMI)</strong></td>
      <td>Origina-se da face ântero-lateral esquerda da aorta abdominal no nível de <strong>L3 - L4</strong> (cerca de 3 a 4 cm acima da bifurcação aórtica).</td>
      <td>Intestino posterior embrionário (<em>hindgut</em>): <strong>terço distal do cólon transverso</strong>, cólon descendente, cólon sigmoide e terço superior do reto.</td>
      <td><strong>Artéria Cólica Esquerda</strong>, artérias sigmoideas (ramos para o sigmoide) e termina como <strong>Artéria Retal Superior (Hemorroidária Superior)</strong>.</td>
    </tr>
  </tbody>
</table>

<h3>A Rede Colateral Esplâncnica: A Salvação Hemodinâmica contra a Isquemia Crônica</h3>
<p>O sistema arterial esplâncnico é dotado de uma das mais ricas e redundantes redes anastomóticas de todo o corpo humano. Três vias colaterais anatômicas mestras garantem a manutenção do fluxo sanguíneo em casos de oclusão aterosclerótica lenta e progressiva:</p>

<ol>
  <li><strong>Arcadas Pancreaticoduodenais (Anastomose Celíaco-Mesentérica):</strong>
    <p>Comunicam diretamente o Tronco Celíaco com a Artéria Mesentérica Superior. Formadas pelo encontro entre a <em>Artéria Pancreaticoduodenal Superior</em> (ramo da artéria gastroduodenal, derivada da hepática comum) e a <em>Artéria Pancreaticoduodenal Inferior</em> (primeiro ramo da AMS). Se o tronco celíaco sofrer estenose crônica intrínseca ou extrínseca (como na Síndrome do Ligamento Arqueado Mediano), o sangue da AMS sobe por essas arcadas para irrigar o fígado e o estômago de forma retrógrada;</p>
  </li>
  <li><strong>Arco Marginal de Drummond (Arcada Marginal do Cólon):</strong>
    <p>Um vaso arterial contínuo que corre paralelamente à borda mesentérica de todo o cólon, a cerca de 1 a 3 cm da parede cólica, estendendo-se ininterruptamente desde a junção ileocecal até o reto. É formado pela união terminal das artérias ileocólica, cólica direita, cólica média, cólica esquerda e sigmoideas, de onde partem os <em>vasa recta</em> terminais que penetram na parede do intestino;</p>
  </li>
  <li><strong>Arco ou Ramo Inconstante de Riolan (Arcada Meandrina / Anastomose Central):</strong>
    <p>Uma volumosa comunicação vascular anatômica embrionária que conecta diretamente a raiz do ramo esquerdo da <strong>Artéria Cólica Média (origem na AMS)</strong> com a <strong>Artéria Cólica Esquerda (origem na AMI)</strong>, trafegando profundamente no mesocólon transverso próximo ao retroperitônio. Em indivíduos saudáveis, é um vaso filiforme e quase imperceptível; contudo, na oclusão aterosclerótica crônica grave da AMS ou da aorta infra-renal, o arco de Riolan hipertrofia-se maciçamente (tornando-se um vaso tortuoso de grande calibre visível na arteriografia) para nutrir todo o intestino delgado a partir da AMI ou vice-versa;</p>
  </li>
  <li><strong>Plexo Retal Hemorroidário (Anastomose Sistêmico-Esplâncnica Inferior):</strong>
    <p>Conecta a Artéria Retal Superior (terminal da AMI) com as Artérias Retais Médias (ramos da artéria ilíaca interna / hipogástrica) e Retais Inferiores (ramos da artéria pudenda interna), permitindo fluxo colateral pélvico retrógrado em oclusões aórticas distais.</p>
  </li>
</ol>

<h3>Os Pontos Críticos de Fragilidade Isquêmica (Zonas de Bacia Hidrográfica Cólica)</h3>
<p>Embora as arcadas colaterais protejam a maior parte do intestino, existem duas regiões anatômicas onde as anastomoses periféricas são naturalmente rarefeitas, precárias ou descontínuas, tornando-as extremamente vulneráveis à hipoperfusão sistêmica:</p>
<ul>
  <li><strong>Ponto de Griffith (Ângulo Esplênico do Cólon):</strong> Localizado na flexura cólica esquerda, no limite de transição anatômica entre o território distal da Artéria Mesentérica Superior (cólica média) e o território proximal da Artéria Mesentérica Inferior (cólica esquerda). É o <strong>sítio de maior vulnerabilidade isquêmica de todo o intestino grosso</strong>;</li>
  <li><strong>Ponto de Sudeck (Junção Retossigmoide):</strong> Localizado na transição entre o ramo sigmoideo mais inferior da AMI e a Artéria Retal Superior. Em até 50% dos indivíduos, a arcada marginal de Drummond afina-se ou sofre descontinuidade anatômica nesse nível, tornando o reto superior altamente suscetível a episódios de choque circulatório e hipotensão prolongada.</li>
</ul>
`
};

export const sec2 = {
  id: 'fisiopatologia-isquemia-aguda-as-quatro-etiologias',
  title: '2. Fisiopatologia da Isquemia Mesentérica Aguda: As Quatro Etiologias Distintas (Embolia, Trombose Arterial, Trombose Venosa e IMNO)',
  body_html: `
<h3>O Espectro Fisiopatológico da Agressão Isquêmica Intestinal</h3>
<p>A <strong>Isquemia Mesentérica Aguda (IMA)</strong> é uma das mais temíveis e letais catástrofes abdominais da cirurgia de emergência, associando-se a taxas de mortalidade histórica que variam entre <strong>50% e 80%</strong>. Essa mortalidade alarmante decorre primordialmente da perda da janela diagnóstica precoce: o intestino delgado tolera no máximo <strong>4 a 6 horas de isquemia total</strong> antes do estabelecimento de necrose transmural irreversível e gangrena.</p>

<p><strong>A Cascata Tecidual de Hipóxia e Reperfusão:</strong></p>
<ol>
  <li><strong>Fase Inicial (Isquemia Mucosa - 0 a 2 horas):</strong> A mucosa intestinal é a camada metabolicamente mais ativa do corpo e a que possui maior consumo de oxigênio por grama de tecido. Sob isquemia súbita, os enterócitos desprendem-se do ápice das vilosidades (desnudamento epitelial mucoso precoce / Lesão de Gruenhagen). Ocorre hiperperistaltismo reativo espasmódico e esvaziamento reflexo agudo (vômitos e diarreia aquosa inicial);</li>
  <li><strong>Fase Intermediária (Quebra da Barreira e Translocação - 2 a 6 horas):</strong> A perda da integridade das junções oclusivas epiteliais permite o influxo maciço de endotoxinas bacterianas (lipopolissacarídeo - LPS) e translocação de bactérias entéricas para a circulação portal e linfática mesentérica. O peristaltismo cessa e instala-se íleo paralítico grave com distensão de alças;</li>
  <li><strong>Fase Avançada (Infarto Transmural e Gangrena - &gt; 6 horas):</strong> A necrose coagulativa atinge a submucosa, muscular própria e serosa. Ocorre extravasamento de líquido sanguinolento para o lúmen e cavidade peritoneal, proliferação anaeróbia intramural com produção de gás na parede intestinal (<strong>pneumatose intestinal</strong>) e gás na veia porta (<strong>aeroportia</strong>), culminando em perfuração intestinal livre, peritonite fecalóide e choque séptico distributivo;</li>
  <li><strong>A Síndrome da Lesão de Isquemia-Reperfusão:</strong> A restauração tardia do fluxo sanguíneo em um segmento intestinal que sofreu isquemia prolongada gera uma explosão massiva de <strong>Espécies Reativas de Oxigênio (radicais livres de oxigênio derivados da xantina oxidase)</strong>, ativação de neutrófilos teciduais, dano capilar endotelial sistêmico e liberação de mediadores inflamatórios (TNF-$\alpha$, IL-1, PAF), deflagrando Síndrome da Angústia Respiratória Aguda (SDRA) e falência de múltiplos órgãos.</li>
</ol>

<h3>As Quatro Etiologias Mestras da Isquemia Mesentérica Aguda</h3>
<p>A identificação imediata da causa subjacente é vital, pois a abordagem operatória e hemodinâmica diverge radicalmente entre os quatro subtipos:</p>

<table class="book-table">
  <thead>
    <tr>
      <th>Etiologia Específica</th>
      <th>Frequência Relativa</th>
      <th>Perfil Epidemiológico e Fatores de Risco</th>
      <th>Localização Anatômica Típica da Obstrução</th>
      <th>Particularidades Fisiopatológicas e Tratamento Específico</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>Embolia da Artéria Mesentérica Superior (EAMS)</strong></td>
      <td><strong>40% a 50%</strong> (a causa mais frequente de IMA)</td>
      <td>Pacientes com <strong>Fibrilação Atrial crônica</strong>, infarto agudo do miocárdio recente com trombo intracavitário em ventrículo esquerdo, miocardiopatia dilatada grave ou endocardite infecciosa.</td>
      <td>O êmbolo desprende-se do coração e impacta tipicamente <strong>3 a 8 cm distal à origem da AMS</strong>, exatamente no ponto onde o calibre do vaso afina após a emergência da <em>Artéria Pancreaticoduodenal Inferior e primeiras artérias jejunais</em>.</td>
      <td><strong>Poupamento do Jejuno Proximal:</strong> Como o êmbolo para distalmente, os primeiros ramos jejunais continuam pérvios, <strong>preservando as primeiras alças de jejuno da necrose</strong>. Tratamento: <em>Embolectomia cirúrgica com cateter de Fogarty</em> através de arteriotomia transversa da AMS.</td>
    </tr>
    <tr>
      <td><strong>Trombose da Artéria Mesentérica Superior (TAMS)</strong></td>
      <td><strong>20% a 30%</strong> (segunda causa arterial)</td>
      <td>Idosos vasculopatas com <strong>Aterosclerose sistêmica difusa</strong> grave, tabagistas pesados, com histórico prévio de doença arterial coronariana, AVC isquêmico ou doença arterial periférica.</td>
      <td>Ocorre <strong>diretamente na ORIGEM (ósteo aórtico) da AMS</strong>, onde a placa aterosclerótica calcificada estenosante sofre rotura aguda com trombose in situ sobreposta.</td>
      <td><strong>Necrose Pan-Intestinal Maciça:</strong> Por ocluir a própria raiz do vaso, bloqueia todas as artérias jejunais e a pancreaticoduodenal inferior, levando à <strong>necrose catastrófica de TODO o intestino delgado (desde o ângulo de Treitz até o cólon transverso)</strong>. Tratamento: exige revascularização complexa (<em>Bypass vascular aorto-mesentérico ou prótese retrógrada</em> da artéria ilíaca para a AMS distal) ou trombectomia com angioplastia/stent.</td>
    </tr>
    <tr>
      <td><strong>Isquemia Mesentérica Não Oclusiva (IMNO)</strong></td>
      <td><strong>20% a 25%</strong></td>
      <td>Pacientes graves internados em UTI em <strong>Choque Cardiogênico</strong> (baixo débito cardíaco), <strong>Choque Séptico</strong> refratário, hipovolemia extrema, parada cardiorrespiratória reanimada ou uso prolongado de <strong>drogas vasoconstritoras potentes em doses cavalares</strong> (Noradrenalina, Vasopressina, Adrenalina) e digitálicos em altas doses.</td>
      <td><strong>Vasoconstrição arteriolar difusa e generalizada</strong> da árvore mesentérica, <strong>SEM trombos ou êmbolos mecânicos ocluindo os grandes vasos</strong>.</td>
      <td>Ocorre espasmo arteriolar sustentado em resposta ao baixo débito na tentativa de desviar sangue para coração e cérebro. Tratamento inicial é <strong>CLÍNICO / ANGIOGRÁFICO</strong>: correção da causa do choque, suspensão de vasopressores se tolerado e <strong>infusão intra-arterial seletiva contínua de vasodilatador (Tolazolina ou Papaverina a 30-60 mg/h)</strong> diretamente na AMS via cateterismo angiográfico percutâneo. Cirurgia apenas se sinais de peritonite irreversível.</td>
    </tr>
    <tr>
      <td><strong>Trombose Venosa Mesentérica (TVM)</strong></td>
      <td><strong>5% a 15%</strong> (a causa de melhor prognóstico)</td>
      <td>Pacientes jovens ou adultos com <strong>Estados de Hipercoagulabilidade primários ou secundários</strong> (mutação do Fator V de Leiden, mutação do gene da protrombina G20210A, deficiência de Proteína C, S ou Antitrombina III, Síndrome do Anticorpo Antifosfolípide - SAF, neoplasias malignas sólidas ou hematológicas), ou <strong>Hipertensão Portal / Cirrose</strong>, pancreatite aguda e esplenectomia recente.</td>
      <td>Trombose intraluminal extensa da <strong>Veia Mesentérica Superior (VMS)</strong>, podendo estender-se para o tronco da veia porta ou veia esplênica.</td>
      <td>A oclusão da drenagem venosa gera <strong>hipertensão venosa retrógrada maciça</strong>, extravasamento de plasma e sangue para a parede intestinal (parede cólica/ileal com edema exuberante em alvo) e ascite sanguinolenta sero-hemática. Possui evolução subaguda (dias a semanas). Tratamento de escolha: <strong>Anticoagulação Plena Imediata com Heparina Não Fracionada intravenosa contínua</strong>. Cirurgia apenas se peritonite/gangrena.</td>
    </tr>
  </tbody>
</table>
`
};

export const sec3 = {
  id: 'quadro-clinico-triade-laboratorio-angiotomografia',
  title: '3. Apresentação Clínica Cardinal: A Dor Desproporcional, Marcadores Laboratoriais e Angio-TC como Padrão-Ouro',
  body_html: `
<h3>O Sinal Clínico Mais Precoce e Sensível: A Dor Abdominal Desproporcional</h3>
<p>O quadro clínico clássico da Isquemia Mesentérica Aguda embólica ou trombótica é caracterizado por um abismo semiológico que confunde médicos desavisados e atrasa o diagnóstico:</p>

<div class="formula-box">
  <p><strong>A TRÍADE CLÁSSICA PATOGNOMÔNICA DA ISQUEMIA MESENTÉRICA AGUDA:</strong></p>
  <ol>
    <li><strong>Dor Abdominal Aguda de Intensidade Dilacerante e Desesperadora</strong> (dor de escore 10/10 na escala visual analógica, refratária a doses habituais de opioides parenterais);</li>
    <li><strong>Exame Físico Abdominal Praticamente Normal nas Primeiras Horas:</strong> O abdome encontra-se <strong>flácido, depressível, sem sinais de irritação peritoneal (Blumberg negativo) e com defesa muscular ausente ou mínima</strong>;</li>
    <li><strong>Esvaziamento Intestinal Reflexo Rápido Inicial:</strong> Vômitos incoercíveis e diarreia aquosa imediata após o início da dor.</li>
  </ol>
  <p><strong>Regra Semiológica de Ouro:</strong> Paciente idoso, vasculopata ou cardiopata com fibrilação atrial que se apresenta no pronto-socorro gritando de dor abdominal lancinante, mas cujo abdome é flácido e desprovido de dor à palpação profunda ou descompressão, <strong>TEM ISQUEMIA MESENTÉRICA AGUDA ATÉ QUE SE PROVE O CONTRÁRIO</strong>.</p>
</div>

<h3>A Transição Semiológica Tardia: O Surgimento da Peritonite e Gangrena</h3>
<p>Quando o exame físico abdominal finalmente torna-se francamente positivo — com o aparecimento de <strong>defesa muscular involuntária, abdome em tábua, descompressão brusca difusa (sinal de Blumberg generalizado), distensão abdominal acentuada e desaparecimento completo dos ruídos hidroaéreos</strong> —, isso <strong>NÃO é um sinal diagnóstico precoce, mas sim uma confirmação tardia e fúnebre de que a isquemia já progrediu para INFARTO TRANSMURAL TRANSMURAL COMPLETO COM PERITONITE E GANGRENA IRREVERSÍVEL</strong>. O objetivo do médico moderno é diagnosticar o paciente <em>antes</em> do surgimento desses sinais de necrose.</p>

<h3>Marcadores Laboratoriais: O Lactato e a Acidose Metabólica</h3>
<p>Não existe nenhum biomarcador sanguíneo isolado com acurácia suficiente para diagnosticar ou descartar a isquemia mesentérica em suas primeiras horas; contudo, o painel laboratorial reflete o colapso hemodinâmico tecidual:</p>
<ul>
  <li><strong>Leucocitose Extrema com Desvio à Esquerda:</strong> Contagem de leucócitos habitualmente <strong>$&gt; 15.000$ a $20.000/\text{mm}³$ com desvio acentuado</strong> para bastonetes e metamielócitos. É a alteração laboratorial mais precoce (presente em $> 90\%$ dos pacientes);</li>
  <li><strong>Acidose Metabólica com Ânion-Gap Elevado:</strong> Queda profunda do pH arterial ($&lt; 7,20-7,30$) e do bicarbonato sérico ($&lt; 15$ mEq/L);</li>
  <li><strong>Hiperlactatemia Sérica (Elevação do Lactato Sanguíneo):</strong>
    <p>O <strong>Lactato sérico elevado ($&gt; 2,0$ a $4,0$ mmol/L)</strong> é o marcador clássico de hipóxia celular e metabolismo anaeróbio muscular. <em>Atenção crítica de prova:</em> O lactato sérico normal nas primeiras 2 a 4 horas <strong>NÃO descarta isquemia mesentérica incipiente</strong> (o fígado depura temporariamente o lactato portal na fase mucosa inicial). Entretanto, quando o lactato se eleva de forma consistente e descompassada, correlaciona-se fortemente com a presença de <strong>necrose intestinal transmural já instalada</strong> e prognóstico sombrio;</p>
  </li>
  <li><strong>D-Dímero:</strong> Apresenta sensibilidade de 96% (valor preditivo negativo alto), mas baixíssima especificidade. Um D-dímero rigorosamente normal em paciente assintomático ajuda a afastar embolia, mas não substitui a imagem;</li>
  <li><strong>Amilase e Creatina Fosfoquinase (CPK):</strong> Podem elevar-se tardiamente por isquemia pancreática e necrose da musculatura lisa intestinal.</li>
</ul>

<h3>Angiotomografia Computadorizada (Angio-TC) de Abdome e Pelve: O Padrão-Ouro Absoluto</h3>
<p>A <strong>Angio-TC de abdome total com contraste intravenoso iodado multifásica</strong> (fase sem contraste, fase arterial precoce e fase portal tardia) é o <strong>exame de escolha mandatório indiscutível</strong> para o diagnóstico definitivo da Isquemia Mesentérica Aguda, com sensibilidade e especificidade superiores a <strong>95% a 98%</strong>:</p>

<table class="book-table">
  <thead>
    <tr>
      <th>Achado Tomográfico na Angio-TC</th>
      <th>Significado Fisiopatológico e Correlação Etiológica</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>Falha de Enchimento Intraluminal na AMS</strong></td>
      <td><strong>Patognomônico de oclusão mecânica</strong>: parada abrupta do fluxo de contraste com trombo visualizado. Se localizado a 3-8 cm da origem com poupamento proximal: <strong>Embolia</strong>. Se na própria raiz aórtica com calcificação parietal aórtica severa: <strong>Trombose Arterial</strong>.</td>
    </tr>
    <tr>
      <td><strong>Falha de Enchimento na Veia Mesentérica Superior (VMS)</strong></td>
      <td><strong>Patognomônico de Trombose Venosa Mesentérica (TVM)</strong>: veia mesentérica dilatada com trombo central hipodenso e realce anelar da parede venosa.</td>
    </tr>
    <tr>
      <td><strong>Hipoatenuação e Ausência de Realce da Parede Intestinal</strong></td>
      <td>Falta de impregnação do meio de contraste pela parede da alça intestinal na fase arterial (parede "muda" ou apagada). Sinal inequívoco de <strong>hipoperfusão e isquemia intestinal transmural ativa</strong>.</td>
    </tr>
    <tr>
      <td><strong>Edema Parietal Espessado com Sinal do Duplo Halo / Alvo</strong></td>
      <td>Mais comum na Trombose Venosa Mesentérica e Colite Isquêmica: edema maciço da submucosa entre a mucosa e a serosa hiperemiadas.</td>
    </tr>
    <tr>
      <td><strong>Pneumatose Intestinal (Gás na Parede da Alça)</strong></td>
      <td>Dissecção de gás bacteriano para as camadas submucosa e subserosa do intestino delgado. <strong>Sinal tardio de necrose transmural e infarto intestinal irreversível</strong>.</td>
    </tr>
    <tr>
      <td><strong>Gás no Sistema Venoso Portal (Aeroportia)</strong></td>
      <td>Gás luminal que ganha a microcirculação venosa mesentérica e atinge as ramificações periféricas da veia porta no parênquima hepático. <strong>Sinal de gravidade extrema e gangrena extensa</strong>.</td>
    </tr>
    <tr>
      <td><strong>Pneumoperitônio Livre Extraluminal</strong></td>
      <td>Presença de ar livre subdiafragmático decorrente de <strong>perfuração intestinal transmural já consumada</strong>.</td>
    </tr>
  </tbody>
</table>

<p><strong>A Regra de Ouro da Conduta Radiológica:</strong> A suspeita clínica de isquemia mesentérica aguda é uma emergência vascular cirúrgica de tempo dependente. O paciente <strong>NÃO DEVE ser submetido à radiografia simples de abdome (inútil e atrasa o tratamento) e NÃO DEVE aguardar estabilização de creatinina para receber contraste iodado na Angio-TC</strong>: o risco de morte por necrose intestinal não diagnosticada supera infinitamente o risco teórico de nefropatia induzida por contraste.</p>
`
};

export const sec4 = {
  id: 'tratamento-cirurgico-urgencia-embolectomia-second-look',
  title: '4. Abordagem Cirúrgica de Emergência: Embolectomia com Cateter de Fogarty, Revascularização e a Laparotomia de Second-Look',
  body_html: `
<h3>Medidas Pré-Operatórias e Ressuscitação Hemodinâmica Imediata</h3>
<p>O paciente com suspeita ou confirmação de isquemia mesentérica aguda deve ser submetido imediatamente a medidas de suporte intensivo enquanto é encaminhado para o centro cirúrgico:</p>
<ol>
  <li><strong>Ressuscitação Volêmica Agressiva com Cristaloides Balanceados:</strong> A perda de líquido por sequestro em terceiro espaço na luz intestinal e na cavidade peritoneal é monumental, deflagrando hipovolemia profunda;</li>
  <li><strong>Anticoagulação Plena com Heparina Não Fracionada (HNF) Intravenosa:</strong> Administra-se bólus de 80 UI/kg seguido de infusão contínua de 18 UI/kg/h (mantendo TTPa entre 1,5 e 2,5 vezes o controle). A heparinização sistêmica imediata <strong>impede a propagação e propagação retrógrada e anterógrada do trombo no leito microvascular distal</strong> (trombose secundária dos capilares mesentéricos);</li>
  <li><strong>Antibioticoterapia Intravenosa de Amplo Espectro:</strong> Iniciada imediatamente na admissão para cobrir a translocação de bacilos Gram-negativos e anaeróbios (ex.: <em>Piperacilina-Tazobactam</em> ou <em>Ceftriaxona associada a Metronidazol</em>);</li>
  <li><strong>Descompressão Gastrointestinal com Sonda Nasogástrica Aberta:</strong> Alivia a distensão de alças, previne broncoaspiração e reduz a pressão intraluminal tecidual.</li>
</ol>

<h3>Intervenção Cirúrgica de Emergência: A Laparotomia Exploradora</h3>
<p>O princípio basilar do tratamento cirúrgico na isquemia arterial mesentérica baseia-se na seguinte regra mandatória: <strong>PRIMEIRO REVASCULARIZAR O INTESTINO (RESTAURAR O FLUXO SANGUÍNEO), E SOMENTE DEPOIS RESSECAR AS ALÇAS QUE PERMANECEREM DEFINITIVAMENTE INVIÁVEIS</strong>.</p>

<h4>1. Embolectomia Cirúrgica da AMS com Cateter de Fogarty (na Embolia)</h4>
<ul>
  <li>Realiza-se laparotomia exploradora mediana ampla;</li>
  <li>Identificação e dissecção cirúrgica da Artéria Mesentérica Superior na raiz do mesocólon transverso, logo abaixo do colo do pâncreas;</li>
  <li>Clampeamento vascular proximal e distal e realização de <strong>Arteriotomia Transversa da AMS</strong> (a incisão transversa previne estenose vascular tardia após o fechamento da sutura);</li>
  <li>Introdução do <strong>Cateter de Embolectomia de Fogarty vascular (calibres 3F ou 4F)</strong> retrógrado e anterógrado. O balão é delicadamente insuflado com soro fisiológico e tracionado, exteriorizando os êmbolos organizados e os trombos secundários de propagação distal até a obtenção de excelente refluxo e influxo arterial pulsátil vigoroso;</li>
  <li>Lavagem intraluminal com solução salina heparinizada e arteriorrafia com fio monofilamentar inabsorvível cardiovascular (Prolene 6-0), utilizando eventualmente <em>patch</em> de veia safena para evitar estreitamento do vaso.</li>
</ul>

<h4>2. Revascularização Cirúrgica Complexa (na Trombose Arterial da AMS)</h4>
<p>Na trombose arterial sobre placa aórtica calcificada, a embolectomia simples por balão é ineficaz, pois a placa estenosante na raiz aórtica obstrui novamente o vaso de imediato. A conduta exige <strong>Revascularização Vascular Cirúrgica (Bypass Aorto-Mesentérico ou Ílio-Mesentérico)</strong>:</p>
<ul>
  <li>Confecciona-se um enxerto vascular em ponte (utilizando a veia safena magna autóloga invertida ou prótese de PTFE) unindo a artéria ilíaca comum (ou aorta infrarrenal saudável) ao segmento distal pérvio da Artéria Mesentérica Superior (bypass retrógrado);</li>
  <li>Em centros terciários de radiologia intervencionista, se o paciente não apresentar peritonite franca, a <em>Trombectomia Farmacomecânica Percutânea por via endovascular com implante de Stent aórtico-mesentérico</em> pode ser considerada.</li>
</ul>

<h3>Avaliação da Viabilidade das Alças Intestinais no Intraoperatório</h3>
<p>Após a revascularização arterial com sucesso, o cirurgião deve aguardar <strong>15 a 30 minutos</strong> com as alças envolvidas em compressas úmidas aquecidas sob hiperoxigenação a 100% para avaliar a recuperação tecidual:</p>

<table class="book-table">
  <thead>
    <tr>
      <th>Parâmetro Clínico-Cirúrgico</th>
      <th>Alça Intestinal Viável (Preservada)</th>
      <th>Alça Francamente Inviável (Necrose/Gangrena)</th>
      <th>Alça Limítrofe / Duvidosa</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>Coloração da Serosa</strong></td>
      <td>Rósea ou avermelhada viva, brilhante</td>
      <td>Enegrecida, verde-escura, arroxeada opaca ("folha seca")</td>
      <td>Pálida, arroxeada clara ou mosqueada</td>
    </tr>
    <tr>
      <td><strong>Peristaltismo da Alça</strong></td>
      <td>Peristaltismo ativo espontâneo ou induzido por leve toque de pinça</td>
      <td>Completamente imóvel e aperistáltica</td>
      <td>Movimentos peristálticos discretos e lentificados</td>
    </tr>
    <tr>
      <td><strong>Pulsação Arterial no Bordo Mesentérico</strong></td>
      <td>Pulsos arteriais palpáveis e visíveis nos vasos retos marginais</td>
      <td>Ausência total de pulsações vasculares marginais</td>
      <td>Pulsos limítrofes ou de difícil palpação</td>
    </tr>
    <tr>
      <td><strong>Sangramento à Secção da Serosa</strong></td>
      <td>Sangramento ativo vermelho-vivo e contínuo ao escarificar</td>
      <td>Ausência completa de sangramento ou sangue escuro coagulado</td>
      <td>Sangramento escasso e lentificado</td>
    </tr>
    <tr>
      <td><strong>Eco-Doppler Vascular Intraoperatório e Fluorescência</strong></td>
      <td>Sinal acústico arterial audível com probe de Doppler à beira do leito; impregnação homogênea sob luz de Wood com fluoresceína IV</td>
      <td>Silêncio acústico Doppler absoluto; ausência total de fluorescência tecidual</td>
      <td>Sinal Doppler fraco ou descontínuo; fluorescência irregular em manchas</td>
    </tr>
  </tbody>
</table>

<h3>A Regra do "Dano Mínimo" e a Laparotomia de Reavaliação Programada (Second-Look)</h3>
<p>Um dos erros mais letais da cirurgia do passado era a ressecção imediata e agressiva de todos os segmentos intestinais que pareciam pálidos ou edemaciados, condenando o paciente à <strong>Síndrome do Intestino Curto catastrófica</strong> com dependência eterna de nutrição parenteral total:</p>
<ol>
  <li><strong>Ressecção Estrita do Tecido Claramente Necrosado:</strong> O cirurgião deve ressecar <strong>APENAS as alças intestinais com gangrena irreversível evidente</strong> (tecido necrótico cinzento-enegrecido perfurado ou liquefeito);</li>
  <li><strong>Preservação das Alças Duvidosas:</strong> Todos os segmentos de intestino que apresentarem viabilidade limítrofe, motilidade duvidosa ou palidez são <strong>PRESERVADOS temporariamente</strong>;</li>
  <li><strong>Não Confeccionar Anastomoses Primárias no Paciente Instável:</strong> As extremidades intestinais ressecadas podem ser fechadas com grampeador cirúrgico ou sepultadas sem anastomose (cirurgia de controle de danos / <em>damage control surgery</em>);</li>
  <li><strong>O Conceito da Laparotomia de Second-Look Obrigatória:</strong>
    <div class="formula-box">
      <p><strong>A LAPAROTOMIA DE SECOND-LOOK PROGRAMADA (REOPERAÇÃO EM 24 A 48 HORAS):</strong></p>
      <ul>
        <li>O abdome é mantido aberto em laparostomia (com sistema de curativo a vácuo / bolsa de Bogotá);</li>
        <li>O paciente retorna à Unidade de Terapia Intensiva para correção rigorosa de acidose lática, aquecimento, ressuscitação volêmica, desmame de drogas vasoativas e manutenção de anticoagulação plena;</li>
        <li><strong>A reoperação é programada obrigatoriamente dentro de 24 a 48 horas</strong>: reabre-se a cavidade para reinspecionar todas as alças que estavam limítrofes;</li>
        <li>Em mais de 50% dos casos, as alças duvidosas recuperam-se espetacularmente sob melhora da perfusão sistêmica, sendo salvas da ressecção. Resseca-se apenas o que tiver progredido para necrose definitiva e realiza-se a reconstrução definitiva do trânsito intestinal com anastomoses seguras e fechamento da parede abdominal.</li>
      </ul>
    </div>
  </li>
</ol>
`
};
