import { saveBook } from './bloco-03-utils.mjs';

const book049 = {
  slug: 'gestacao-ectopica',
  title: 'Gestação Ectópica',
  area: 'Ginecologia e Obstetrícia',
  materia: 'Obstetrícia e Urgências Obstétricas',
  description: 'Tratado completo sobre Gestação Ectópica e Gestação de Localização Desconhecida (PUL): epidemiologia, estratificação de fatores de risco maiores e menores, anatomia cirúrgica e topografia (ampolar, ístmica, intersticial/cornual, cicatriz de cesárea, cervical, ovariana e abdominal), fisiopatologia da invasão trofoblástica, quadro clínico da tríade clássica e sinais de choque, cinética do beta-hCG quantitativo e zonas discriminatórias, achados ultrassonográficos com Doppler colorido (bagel sign, anel de fogo), critérios formais de tratamento medicamentoso com Metotrexato (MTX dose única e multidose), conduta cirúrgica (salpingostomia vs salpingectomia videolaparoscópica), controle de danos no choque hemorrágico da prenhez rota, profilaxia anti-D, fertilidade futura, casos clínicos interativos e questões de residência comentadas.',
  sections: [
    {
      id: 'epidemiologia-fatores-risco',
      title: '1. Epidemiologia, Definição e Estratificação dos Fatores de Risco',
      body_html: `
<h3>Definição Conceitual e Panorama Epidemiológico</h3>
<p>A <strong>gestação ectópica (GE)</strong> é definida como a implantação e o desenvolvimento do blastocisto fora da cavidade endometrial uterina habitual. Trata-se da principal causa de morbimortalidade materna no primeiro trimestre da gestação em todo o mundo ocidental, respondendo por cerca de 4% a 10% de todos os óbitos maternos diretamente relacionados à gravidez, prioritariamente decorrentes de hemorragia exsanguinante e choque hipovolêmico após rotura da estrutura anatômica de implantação.</p>
<p>Epidemiologicamente, a gestação ectópica incide em aproximadamente 1% a 2% de todas as gestações diagnosticadas na população geral. Contudo, entre as pacientes que buscam atendimento em serviços de urgência e emergência obstétrica com queixa de dor pélvica associada a sangramento vaginal no primeiro trimestre, essa frequência se eleva substancialmente, variando de 6% a 18%. Nas últimas três décadas, observou-se aumento na incidência absoluta de gestação ectópica, fenômeno atribuído à disseminação das infecções sexualmente transmissíveis (especialmente por <em>Chlamydia trachomatis</em> e <em>Neisseria gonorrhoeae</em>), ao aumento das técnicas de reprodução assistida (FIV/ICSI), à realização de cesarianas prévias e ao aprimoramento substancial dos métodos diagnósticos precoces (dosagens ultrassensíveis de &beta;-hCG quantitativo e ultrassonografia transvaginal de alta resolução), que permitem diagnosticar casos que anteriormente evoluiriam para reabsorção espontânea subclínica.</p>

<h3>Estratificação de Risco: Fatores Maiores, Moderados e Menores</h3>
<p>O transporte do concepto em direção à cavidade endometrial depende da integridade ciliar do epitélio tubário, da motilidade do músculo liso da tuba uterina (regulado pela relação estrogênio/progesterona) e da ausência de barreiras mecânicas intraluminais ou aderências peritubárias. A quebra desse delicado equilíbrio resulta em retenção tubária prematura do ovo fecundado no momento em que ele atinge a competência de adesão trofoblástica (estágio de blastocisto, aproximadamente 5 a 6 dias pós-fecundação).</p>
<p>Para fins de estratificação de risco nas diretrizes clínicas da FEBRASGO, ACOG e RCOG, os fatores de risco são divididos segundo a magnitude do seu <em>Odds Ratio</em> (OR):</p>

<table class="book-table">
  <thead>
    <tr>
      <th>Categoria de Risco</th>
      <th>Fatores Clínicos e Epidemiológicos</th>
      <th>Mecanismo Fisiopatológico Principal</th>
      <th>Impacto Clínico (Odds Ratio Aproximado)</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>Fatores de Alto Risco (Maiores)</strong></td>
      <td>• Gestação ectópica prévia<br>• Cirurgia tubária reconstrutora prévia<br>• Salpingite prévia / DIP comprovada<br>• Esterilização tubária falha (laqueadura prévia)<br>• Uso atual de DIU (cobre ou levonorgestrel)<br>• Exposição uterina intraútero ao dietilestilbestrol (histórico)</td>
      <td>Destruição anatômica do epitélio ciliar, estenose luminal mecânica, decorticação tubária ou bloqueio mecânico que não impede a fecundação mas impede a descida do concepto. No caso do DIU, há prevenção quase absoluta da implantação intrauterina (99,8%), mas se a concepção ocorrer, a chance relativa de ser ectópica eleva-se para 20% a 50%.</td>
      <td>OR &gt; 9,0 a 17,0<br>(Recorrência de GE atinge 10% a 15% após 1 episódio e &gt; 25% a 30% após 2 episódios).</td>
    </tr>
    <tr>
      <td><strong>Fatores de Risco Moderado</strong></td>
      <td>• Infertilidade prévia documentada (&ge; 1 ano)<br>• Reprodução humana assistida (FIV / indução de ovulação)<br>• Infecções genitais prévias documentadas (Chlamydia/Gonococo)<br>• Múltiplos parceiros sexuais<br>• Endometriose pélvica com acometimento tubário</td>
      <td>Disfunção funcional da peristalse tubária induzida por processos inflamatórios crônicos subclínicos, aderências tubo-ovarianas extrínsecas e refluxo de blastocistos transferidos em grandes volumes de meio de cultura uterino.</td>
      <td>OR entre 2,0 e 4,0.</td>
    </tr>
    <tr>
      <td><strong>Fatores de Baixo Risco (Menores)</strong></td>
      <td>• Tabagismo ativo no momento da concepção (&gt; 10-20 cigarros/dia)<br>• Cirurgia abdominal/pélvica prévia não tubária (apendicectomia complicada, cesárea prévia)<br>• Duchas vaginais regulares<br>• Coitarca precoce (&lt; 16 anos)</td>
      <td>A nicotina atua nos receptores nicotínicos tubários, paralisando os batimentos ciliares e induzindo contrações espasmódicas do istmo que retêm o ovo; cirurgias provocam aderências peritoneais extrínsecas.</td>
      <td>OR entre 1,5 e 2,0.</td>
    </tr>
  </tbody>
</table>

<p><strong>Atenção para as provas de Residência Médica e ENAMED:</strong> Cerca de <strong>50% das mulheres diagnosticadas com gestação ectópica NÃO apresentam qualquer fator de risco conhecido</strong>. Portanto, a ausência de fatores predisponentes jamais descarta a hipótese diagnóstica diante de uma mulher em idade fértil com dor pélvica e/ou atraso menstrual. Outro dado clássico: o DIU não causa gestação ectópica; ele reduz o risco absoluto global de qualquer gestação. Todavia, se a paciente usuária de DIU apresentar falha contraceptiva e teste de gravidez positivo, a probabilidade relativa de ser uma gestação ectópica é extremamente elevada (podendo chegar a 1 em cada 2 a 5 gestações confirmadas com DIU <em>in situ</em>).</p>
`
    },
    {
      id: 'anatomia-topografia-ectopica',
      title: '2. Anatomia Cirúrgica e Localizações Anatômicas da Implantação Ectópica',
      body_html: `
<h3>Topografia da Nidação Ectópica e Frequência Relativa</h3>
<p>Mais de 95% a 97% de todas as gestações ectópicas localizam-se na tuba uterina (gestações tubárias). No entanto, o ovo fertilizado pode nidificar em qualquer ponto entre o estroma ovariano e a cavidade peritoneal abdominal, determinando quadros clínicos com apresentações, tempos de evolução e riscos hemostáticos completamente distintos.</p>

<table class="book-table">
  <thead>
    <tr>
      <th>Localização Anatômica</th>
      <th>Frequência Relativa</th>
      <th>Particularidades Anatômicas e Fisiopatológicas</th>
      <th>Risco Clínico e Época Usual de Rotura</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>Ampola Tubária</strong></td>
      <td><strong>75% a 80%</strong></td>
      <td>Região mais larga da tuba uterina (diâmetro de 1 a 2 cm), com pregas mucosas ricas e epitélio ciliado exuberante. É o sítio mais frequente de fecundação e, portanto, de retenção do blastocisto.</td>
      <td>Rotura tubária relativamente mais tardia (geralmente entre 6 e 8 semanas). É o sítio preferencial para tratamento medicamentoso com metotrexato ou salpingostomia conservadora. Pode evoluir para abortamento tubário com extrusão fímbrica.</td>
    </tr>
    <tr>
      <td><strong>Istmo Tubário</strong></td>
      <td><strong>10% a 12%</strong></td>
      <td>Segmento estreito, retilíneo e muscular da tuba, com lúmen de apenas 1 a 2 mm de calibre e túnica muscular espessa.</td>
      <td><strong>Rotura precoce e catastrófica (entre 5 e 7 semanas)</strong> devido à incapacidade elástica da luz ístmica e à proximidade da arcada vascular anastomótica entre os ramos uterino e ovariano. Frequentemente requer salpingectomia segmentar ou total.</td>
    </tr>
    <tr>
      <td><strong>Fímbrias / Infundíbulo</strong></td>
      <td><strong>5%</strong></td>
      <td>Extremidade distal afunilada em contato com a cavidade peritoneal livre.</td>
      <td>Comumente resulta em abortamento tubário espontâneo para a cavidade abdominal (fundo de saco de Douglas), podendo provocar hemoperitônio de baixo débito e dor crônica ou reabsorção assintomática.</td>
    </tr>
    <tr>
      <td><strong>Intersticial / Cornual</strong></td>
      <td><strong>2% a 4%</strong></td>
      <td>Porção proximal da tuba que atravessa a espessura da parede miometrial uterina (segmento intramural de 1 a 2 cm).</td>
      <td><strong>Extrema gravidade e letalidade!</strong> O miométrio espesso permite distensão da gestação até 8 a 16 semanas sem sintomas. Quando ocorre a rotura, ela secciona os ramos terminais calibrosos da <strong>artéria uterina e da artéria ovariana</strong>, causando <strong>choque hemorrágico fulminante em minutos</strong>. Requer cornuectomia laparoscópica ou histerectomia.</td>
    </tr>
    <tr>
      <td><strong>Ovariana</strong></td>
      <td><strong>1% a 3%</strong></td>
      <td>O ovo fertilizado não abandona o folículo rompido ou implanta-se na superfície ovariana superficial.</td>
      <td>Critérios clássicos de Spiegelberg para confirmação anatomopatológica. Frequentemente confundida com cisto de corpo lúteo hemorrágico roto. Tratamento cirúrgico conservador (ressecção cuneiforme ovariana).</td>
    </tr>
    <tr>
      <td><strong>Cicatriz de Cesárea</strong></td>
      <td><strong>1% a 2%</strong> (incidência crescente)</td>
      <td>Nidação no nicho fibroso da histerotomia prévia, com invasão precoce do miométrio deficiente e da fáscia vésico-uterina.</td>
      <td>Risco elevadíssimo de acretismo placentário grave (placenta percreta), rotura uterina espontânea e hemorragia maciça. Manejo desafiador: injeção local de MTX, embolização das artérias uterinas ou ressecção histeroscópica/laparoscópica.</td>
    </tr>
    <tr>
      <td><strong>Cervical</strong></td>
      <td><strong>&lt; 1%</strong></td>
      <td>Implantação no canal endocervical abaixo do orifício interno do colo uterino.</td>
      <td>Colo uterino em aspecto de ampulheta ou "barril". Sangramento vaginal indolor vultoso. Curetagem convencional é proscrita sem controle prévio devido ao sangramento incontrolável (ausência de miométrio para hemostasia por ligaduras vivas de Pinard).</td>
    </tr>
    <tr>
      <td><strong>Abdominal</strong></td>
      <td><strong>&lt; 1%</strong></td>
      <td>Pode ser primária (rara) ou secundária (extrusão tubária ou rotura prévia com reimplantação em peritônio, omento, mesentério ou alças).</td>
      <td>Critérios de Studdiford. Pode alcançar o segundo ou terceiro trimestre. Alto risco de óbito materno por dequitação espontânea com hemorragia de difícil hemostasia. A conduta cirúrgica habitualmente envolve retirar o feto e ligar o cordão umbilical, mantendo a placenta <em>in situ</em> para reabsorção ou metotrexato pós-operatório.</td>
    </tr>
  </tbody>
</table>

<h3>Critérios Histopatológicos Clássicos de Fixação Anormal</h3>
<ul>
  <li><strong>Critérios de Spiegelberg (Gestação Ovariana):</strong>
    <ol>
      <li>A tuba uterina do lado afetado deve estar perfeitamente íntegra e separada do ovário;</li>
      <li>O saco gestacional deve ocupar a posição anatômica do ovário;</li>
      <li>O saco gestacional deve estar conectado ao útero pelo ligamento útero-ovariano (ligamento próprio do ovário);</li>
      <li>Tecido ovariano autêntico histologicamente comprovado deve ser demonstrado na parede do saco gestacional.</li>
    </ol>
  </li>
  <li><strong>Critérios de Studdiford (Gestação Abdominal Primária):</strong>
    <ol>
      <li>Ambas as tubas uterinas e ovários devem ser normais, sem evidência de trauma recente ou gestação prévia;</li>
      <li>Ausência total de qualquer fístula uteroperitoneal;</li>
      <li>A gestação deve estar confinada exclusivamente à superfície peritoneal e em estágio precoce o suficiente para excluir a possibilidade de nidação secundária após extrusão tubária.</li>
    </ol>
  </li>
</ul>
`
    },
    {
      id: 'fisiopatologia-evolucao-clinica',
      title: '3. Fisiopatologia da Nidação Ectópica, Invasão Trofoblástica e História Natural',
      body_html: `
<h3>Mecanismos Moleculares e Celulares de Invasão Tubária</h3>
<p>Na cavidade endometrial saudável, a decídua compacta materna atua como um leito altamente regulado que limita a invasão do trofoblasto extraviloso mediante a secreção de inibidores teciduais de metaloproteinases (TIMPs) e citocinas moduladoras. Pelo contrário, a tuba uterina é revestida por uma mucosa fina (endossalpinge) desprovida de submucosa verdadeira e incapaz de desenvolver uma decídua protetora espessa.</p>
<p>Quando o blastocisto se fixa na mucosa tubária, o sinciciotrofoblasto secreta metaloproteinases da matriz (MMP-2 e MMP-9) que digerem rapidamente as células epiteliais e a delgada lâmina própria. Em menos de 7 a 10 dias, o trofoblasto invade a camada muscular própria da tuba (muscularis) e erode os ramos das arteríolas tubárias. A invasão vascular leva a hemorragias no interior da parede tubária, dissecando as fibras musculares e criando um hematoma intrassalpíngeo (hematossalpinge).</p>

<h3>História Natural da Gestação Tubária: Três Vias Evolutivas</h3>
<p>Uma vez estabelecida a nidação na tuba uterina, o processo pode evoluir por três caminhos biológicos fundamentais:</p>
<ol>
  <li><strong>Rotura Tubária Aguda:</strong> A proliferação trofoblástica contínua e a distensão hemorrágica ultrapassam a complacência elástica da parede da tuba, rompendo a serosa peritoneal. A rotura expõe vasos calibrosos lacerados diretamente à cavidade peritoneal livre. O sangramento resultante é arterial ou venoso de alto fluxo, acumulando-se rapidamente no fundo de saco de Douglas (hemoperitônio maciço) e estendendo-se pelas goteiras parietocólicas até o espaço subfrênico e sub-hepático (recesso de Morison), culminando em choque hemorrágico, peritonite química e óbito caso não ocorra intervenção cirúrgica de urgência.</li>
  <li><strong>Abortamento Tubário (Extrusão Fímbrica):</strong> Mais comum nas gestações ampoladas e infundibulares. A gestação e o tecido trofoblástico se destacam da parede tubária e são empurrados pelas contrações peristálticas da tuba em direção ao óstio abdominal fímbrico, caindo na cavidade peritoneal. O descolamento pode provocar sangramento intermitente moderado, formando um hematocele pélvico encapsulado no fundo de saco de Douglas, acompanhado de dor crônica e reação inflamatória peritoneal adesiva.</li>
  <li><strong>Reabsorção Espontânea (Cura Espontânea):</strong> Em casos de trofoblasto pouco proliferativo ou embrião geneticamente anômalo, o aporte vascular precário determina morte embrionária precoce. A produção de &beta;-hCG cessa rapidamente, o tecido trofoblástico necrosa e todo o material hemático e embrionário é reabsorvido pelo epitélio tubário e pelos macrófagos peritoneais sem perfuração da parede. É esse subgrupo de gestações ectópicas biologicamente destinadas à involução espontânea que pode se beneficiar com segurança da <em>conduta expectante</em>.</li>
</ol>
`
    },
    {
      id: 'apresentacao-clinica-triade',
      title: '4. Manifestações Clínicas, Tríade Clássica e Sinais de Hemoperitônio Catastrófico',
      body_html: `
<h3>A Tríade Clínica Clássica e a Variabilidade na Prática</h3>
<p>O quadro clínico clássico da gestação ectópica é caracterizado pela seguinte tríade de sintomas:</p>
<ul>
  <li><strong>1. Atraso Menstrual (Amenorreia):</strong> Relatado por 70% a 90% das pacientes, variando tipicamente entre 6 e 8 semanas a partir da data da última menstruação (DUM). Contudo, até 15% a 20% das mulheres confundem episódios de sangramento vaginal irregular da gravidez com menstruação normal atrasada ou antecipada.</li>
  <li><strong>2. Dor Abdominal ou Pélvica:</strong> Presente em mais de 95% dos casos sintomáticos. Inicia-se habitualmente como uma dor em cólica ou pontada localizada na fossa ilíaca correspondente ao anexo afetado, decorrente do estiramento da serosa tubária pelas contrações e distensão hemática local.</li>
  <li><strong>3. Sangramento Vaginal Anormal:</strong> Presente em 60% a 80% das pacientes. Caracteriza-se tipicamente por perda hemática de pequeno a moderado volume, de coloração escura (em "borra de café" ou aspecto amarronzado/achocolatado), persistente e intermitente. Decorre da descamação decidual endometrial em virtude da produção subótima e insuficiente de progesterona e &beta;-hCG pelo sinciciotrofoblasto ectópico comprometido.</li>
</ul>

<p><strong>Atenção para o exame clínico:</strong> A tríade clássica completa está presente em <strong>menos de 50% dos casos</strong> no momento da admissão inicial. Por essa razão, a medicina de emergência moderna considera a gestação ectópica o grande "camaleão" do primeiro trimestre. Qualquer mulher em idade fértil com dor pélvica ou sangramento vaginal é considerada portadora de gestação ectópica até que se prove o contrário mediante teste quantitativo de gonadotrofina coriônica e exame ultrassonográfico.</p>

<h3>Exame Físico: Diferenciação entre Quadro Não Roto e Roto com Choque</h3>
<table class="book-table">
  <thead>
    <tr>
      <th>Parâmetro Clínico</th>
      <th>Gestação Ectópica Não Rota (Íntegra)</th>
      <th>Gestação Ectópica Rota (Emergência Cirúrgica)</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>Sinais Vitais e Perfusão</strong></td>
      <td>• PA normal, FC normal (normocárdica);<br>• Perfusão periférica preservada, mucosas coradas;<br>• Ausência de tontura ortostática ou hipotensão postural.</td>
      <td>• <strong>Choque hemorrágico descompensado:</strong> hipotensão arterial (PAS &lt; 90 mmHg), taquicardia compensatória (FC &gt; 110-120 bpm);<br>• Palidez cutâneo-mucosa grave, sudorese fria, enchimento capilar lento (&gt; 3 segundos);<br>• Síncope, lipotímia, rebaixamento do nível de consciência.</td>
    </tr>
    <tr>
      <td><strong>Palpação Abdominal</strong></td>
      <td>• Abdome flácido, depressível;<br>• Dor moderada à palpação profunda localizada na fossa ilíaca acometida;<br>• Sinal de Blumberg estritamente negativo.</td>
      <td>• Abdome tenso, com defesa voluntária ou involuntária difusa;<br>• <strong>Descompressão brusca difusamente positiva (sinal de Blumberg +)</strong> por peritonite química induzida pelo sangue livre;<br>• <strong>Sinal de Cullen</strong> (equimose periumbilical) e <strong>Sinal de Grey-Turner</strong> (equimose em flancos) em hemoperitônios volumosos tardios.</td>
    </tr>
    <tr>
      <td><strong>Sinais de Irritação Frênica</strong></td>
      <td>Ausentes.</td>
      <td><strong>Sinal de Laffon:</strong> Dor referida no ombro (especialmente direito), decorrente da irritação do nervo frênico (C3-C5) pelo sangue acumulado no espaço subdiafragmático ao adotar decúbito dorsal ou posição de Trendelenburg.</td>
    </tr>
    <tr>
      <td><strong>Exame Especular</strong></td>
      <td>Sangramento cervical discreto em borra de café saindo pelo orifício externo; colo fechado, sem lesões ativas.</td>
      <td>Sangramento vaginal escuro contínuo; ausência de restos ovulares exteriorizados pelo orifício cervical.</td>
    </tr>
    <tr>
      <td><strong>Toque Vaginal Bimanual</strong></td>
      <td>• Útero de tamanho menor ou compatível com a IG, amolecido;<br>• Massa anexial palpável dolorosa móvel em apenas 30% a 50% dos casos.</td>
      <td>• <strong>Sinal de Proust ("grito de Douglas"):</strong> Dor excruciante à palpação e mobilização do fundo de saco de Douglas posterior abaulado por coleção hemática;<br>• Dor intensa à lateralização do colo uterino (estiramento do ligamento largo e da tuba inflamada).</td>
    </tr>
  </tbody>
</table>
`
    },
    {
      id: 'diagnostico-laboratorial-bhcg-pul',
      title: '5. Diagnóstico Laboratorial: Dinâmica do β-hCG Quantitativo, Zonas Discriminatórias e Manejo da PUL',
      body_html: `
<h3>Fisiologia e Cinética da Secreção de Gonadotrofina Coriônica Humana (&beta;-hCG)</h3>
<p>O &beta;-hCG é uma glicoproteína sintetizada pelo sinciciotrofoblasto logo após a implantação, podendo ser detectada no soro materno cerca de 8 a 9 dias após a fertilização. Na gestação intrauterina viável inicial, os níveis séricos de &beta;-hCG exibem um crescimento exponencial, elevando-se em pelo menos <strong>49% a 53% a cada 48 horas</strong> (historicamente arredondado para a regra dos 66% a cada 48 horas nas diretrizes mais antigas).</p>
<p>Na gestação ectópica, a vascularização imprópria da parede tubária e a hipóxia tecidual crônica acarretam desenvolvimento trofoblástico deficiente. Como consequência direta:</p>
<ul>
  <li>Em mais de 85% dos casos de gestação ectópica, a taxa de elevação do &beta;-hCG sérico em 48 horas é <strong>anormalmente lenta (&lt; 49% a 53% em 48 horas)</strong> ou exibe um padrão em <em>platô</em>;</li>
  <li>Em cerca de 10% a 15% das gestações ectópicas em involução espontânea, os títulos decrescem continuamente, mimetizando abortamento completo em curso;</li>
  <li>Em menos de 10% a 15% das gestações ectópicas, o &beta;-hCG pode duplicar temporariamente de forma normal, demonstrando que <em>a cinética isolada do &beta;-hCG NÃO localiza a gestação</em>.</li>
</ul>

<h3>O Conceito Crucial de Zona Discriminatória Ultrassonográfica</h3>
<p>A <strong>zona discriminatória</strong> corresponde ao limiar do nível sérico de &beta;-hCG quantitativo a partir do qual um saco gestacional intrauterino <strong>DEVE ser obrigatoriamente visualizado</strong> por um operador experiente utilizando transdutor ultrassonográfico transvaginal de alta frequência (5 a 9 MHz).</p>
<ul>
  <li><strong>Zona Discriminatória da Ultrassonografia Transvaginal (USTV):</strong> Fixada entre <strong>1.500 e 2.000 mUI/mL</strong> (padrão internacional IRP). A maioria dos serviços de referência adota <strong>1.500 mUI/mL</strong> para acelerar a tomada de decisão em pacientes sintomáticas, enquanto serviços que buscam sensibilidade máxima para preservar gestações desejadas adotam o limiar conservador de até <strong>2.000 ou 3.500 mUI/mL</strong> proposto pelo ACOG em pacientes assintomáticas;</li>
  <li><strong>Zona Discriminatória da Ultrassonografia Pélvica Transabdominal:</strong> Fixada entre <strong>6.000 e 6.500 mUI/mL</strong> (raramente utilizada isoladamente hoje em dia nos centros de emergência ginecológica).</li>
</ul>

<p><strong>A Regra de Ouro do Raciocínio Clínico:</strong></p>
<blockquote>
<p>Se o &beta;-hCG quantitativo sérico for <strong>&ge; 1.500 a 2.000 mUI/mL</strong> e a ultrassonografia transvaginal demonstrar <strong>cavidade endometrial vazia (útero vazio)</strong>, o diagnóstico presuntivo de gestação ectópica deve ser imediatamente considerado, exigindo conduta ativa de investigação ou tratamento, desde que excluído abortamento completo recente comprovado.</p>
</blockquote>

<h3>Gestação de Localização Desconhecida (PUL — Pregnancy of Unknown Location)</h3>
<p>A condição de <strong>PUL</strong> não constitui uma entidade patológica definitiva, mas sim uma categoria diagnóstica provisória aplicada à paciente com teste de gravidez positivo (bioquímico) na qual o exame de ultrassonografia transvaginal minucioso não identifica saco gestacional intrauterino (nem vesícula vitelínica) e tampouco demonstra qualquer evidência conclusiva de gravidez ectópica ou restos intrauterinos.</p>

<p><strong>Fluxograma Sistemático de Investigação da Paciente com PUL Estável:</strong></p>
<ol>
  <li><strong>Passo 1: Avaliar Estabilidade Hemodinâmica:</strong> Paciente com dor abdominal intensa, sinais de peritonite ou hipotensão não é PUL para seguimento laboratorial: é cirurgia laparoscópica exploradora imediata.</li>
  <li><strong>Passo 2: Dosagem de &beta;-hCG Sérico Basal (Hora 0):</strong>
    <ul>
      <li>Se &beta;-hCG &ge; 2.000 mUI/mL sem sinal intrauterino: alta probabilidade de gestação ectópica; indicação de reavaliação ultrassonográfica por especialista sênior ou discussão de conduta medicamentosa/laparoscópica;</li>
      <li>Se &beta;-hCG &lt; 1.500 a 2.000 mUI/mL: a paciente pode ser portadora de uma gestação intrauterina muito inicial (abaixo do limiar de visibilidade ultrassonográfica), um abortamento completo em regressão espontânea ou uma gestação ectópica precoce.</li>
    </ul>
  </li>
  <li><strong>Passo 3: Repetir &beta;-hCG Quantitativo Exatamente 48 Horas Depois (Hora 48):</strong>
    <ul>
      <li><strong>Elevação &ge; 53% a 63%:</strong> Sugere fortemente gestação intrauterina evolutiva inicial. Orientar paciente sobre sinais de alarme e agendar nova USTV assim que o &beta;-hCG ultrapassar 1.500-2.000 mUI/mL para documentar o saco gestacional;</li>
      <li><strong>Queda &gt; 50%:</strong> Sugere gravidez inviável em involução (abortamento espontâneo completo ou ectópica involutiva). Manter acompanhamento ambulatorial semanal até negativação completa (&beta;-hCG &lt; 5 mUI/mL);</li>
      <li><strong>Comportamento Anômalo (Platô, elevação &lt; 49% ou queda &lt; 30%):</strong> Padrão altamente preditivo de gestação ectópica viável ou não viável persistente. Indicação formal de reavaliação ultrassonográfica seriada imediata e planejamento de conduta com Metotrexato ou videolaparoscopia.</li>
    </ul>
  </li>
</ol>
`
    },
    {
      id: 'diagnostico-ultrassonografico',
      title: '6. Diagnóstico Ultrassonográfico: Sinais Diretos, Indiretos e Doppler Colorido',
      body_html: `
<h3>Achados Ultrassonográficos Transvaginais (USTV)</h3>
<p>A ultrassonografia transvaginal de alta resolução é o exame de imagem padrão-ouro indispensável na suspeita de gestação ectópica, exibindo sensibilidade superior a 90% e especificidade de 95% a 99% quando correlacionada aos títulos séricos de &beta;-hCG.</p>

<table class="book-table">
  <thead>
    <tr>
      <th>Categoria do Achado</th>
      <th>Descrição Ultrassonográfica Semiológica</th>
      <th>Significado Clínico e Valor Preditivo</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>Sinais Diretos Patognomônicos</strong></td>
      <td>• Presença de saco gestacional extrauterino com <strong>vesícula vitelínica bem definida</strong> e/ou <strong>embrião com batimentos cardíacos presentes</strong> (BCF +) fora da cavidade endometrial (visível em 15% a 25% dos casos).</td>
      <td><strong>Confirmação diagnóstica definitiva (100% de especificidade)</strong> de gestação ectópica. A presença de embrião com BCF ativo extrauterino é contraindicação formal ao protocolo convencional de Metotrexato em dose única ambulatorial.</td>
    </tr>
    <tr>
      <td><strong>Sinal do Anel Tubário ("Bagel Sign" ou "Tubal Ring")</strong></td>
      <td>• Formação anelar anecoica circundada por uma borda ecogênica espessa e brilhante (&gt; 2 mm), bem individualizada e separada do parênquima ovariano ipsilateral (visível em 40% a 60% dos casos).</td>
      <td>Representa o saco gestacional ectópico circundado pela parede e pelo trofoblasto tubário infiltrado. Altamente sugestivo de gestação tubária íntegra.</td>
    </tr>
    <tr>
      <td><strong>Massa Anexial Complexa Não Cística</strong></td>
      <td>• Imagem sólida-cística heterogênea, irregular, localizada adjacente ao ovário ipsilateral, sem vesícula vitelínica evidente (achado mais comum, presente em 50% a 70% dos casos).</td>
      <td>Representa o hematoma tubário (hematossalpinge) resultante de hemorragias intraparietais dissecantes. Em paciente com teste de gravidez positivo e endométrio vazio, tem valor preditivo positivo &gt; 80%.</td>
    </tr>
    <tr>
      <td><strong>Sinal do Anel de Fogo ao Doppler Colorido ("Ring of Fire")</strong></td>
      <td>• Hipervascularização peritubária circunferencial exibindo fluxo de baixa resistência e alta velocidade sistodiastólica contornando a massa anexial.</td>
      <td>Representa a neovascularização trofoblástica de alta demanda metabólica. <em>Cuidado semiológico:</em> o corpo lúteo ovariano também exibe anel de fogo; o examinador deve demonstrar que a massa tubária é independente e se move separadamente do ovário ("sinal do deslizamento ovariano").</td>
    </tr>
    <tr>
      <td><strong>Achados Uterinos: Reação Decidual e Pseudossaco</strong></td>
      <td>• <strong>Pseudossaco gestacional:</strong> Coleção líquida endometrial anecoica de contornos irregulares, centralizada na luz da cavidade endometrial, desprovida de halo hiperecogênico duplo e sem vesícula vitelínica (presente em 10% a 20%);<br>• Endométrio espessado e hiperecogênico (reação decidual induzida por progesterona).</td>
      <td><strong>Armadilha clássica:</strong> Não confundir o pseudossaco (acúmulo de sangue e secreção na cavidade uterina) com saco gestacional verdadeiro intrauterino inicial. O saco verdadeiro é <em>excêntrico</em>, exibe o <em>sinal da dupla decídua</em> (decídua capsular + decídua verdadeira) e logo desenvolve vesícula vitelínica.</td>
    </tr>
    <tr>
      <td><strong>Líquido Livre Peritoneal / Hemoperitônio</strong></td>
      <td>• Lâmina anecoica no fundo de saco posterior (Douglas) pode ser fisiológica (&lt; 10 mL);<br>• Presença de <strong>líquido livre com ecogenicidade intermediária e ecos pontilhados em suspensão (vidro despolido)</strong> preenchendo o fundo de saco de Douglas, estendendo-se para fossas ilíacas e atingindo o espaço de Morison (espaço hepatorrenal).</td>
      <td>Diagnóstico de <strong>hemoperitônio ativo</strong>. Quando o sangue ultrapassa o fundo uterino e atinge o espaço hepatorrenal no FAST/ultrassom, estima-se um volume de hemoperitônio &gt; 500 a 800 mL, configurando risco iminente de colapso hemodinâmico.</td>
    </tr>
  </tbody>
</table>
`
    },
    {
      id: 'diagnostico-diferencial-pelvico',
      title: '7. Diagnóstico Diferencial Abrangente da Dor Pélvica Aguda no Primeiro Trimestre',
      body_html: `
<h3>Semiologia Diferencial na Emergência Obstétrica e Ginecológica</h3>
<p>O diagnóstico diferencial da dor pélvica associada ou não a sangramento no primeiro trimestre abrange entidades obstétricas, ginecológicas e cirúrgicas gerais. O atraso no diagnóstico correto da gestação ectópica acarreta desfechos hemorrágicos potencialmente fatais.</p>

<table class="book-table">
  <thead>
    <tr>
      <th>Diagnóstico</th>
      <th>Quadro Clínico e Características da Dor</th>
      <th>Perfil do &beta;-hCG</th>
      <th>Achados Ultrassonográficos Distintivos</th>
      <th>Armadilhas e Condutas Críticas</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>Gestação Ectópica</strong></td>
      <td>Dor unilateral aguda em pontada ou cólica; sangramento escuro intermitente; colo uterino fechado e extremamente doloroso à mobilização (Proust).</td>
      <td>Positivo; ascensão &lt; 50% em 48h ou padrão em platô; frequentemente &gt; 1.500 mUI/mL com útero vazio.</td>
      <td>Útero vazio, pseudossaco central, massa anexial complexa extraovariana, anel tubário, líquido com ecos em Douglas.</td>
      <td>Rotura pode ocorrer mesmo com valores baixos de &beta;-hCG (&lt; 500 mUI/mL). Jamais descartar por falso conforto laboratorial.</td>
    </tr>
    <tr>
      <td><strong>Ameaça ou Abortamento Espontâneo</strong></td>
      <td>Cólica hipogástrica em peso na linha média; sangramento vermelho vivo moderado a volumoso com coágulos; colo aberto no abortamento incompleto/inevitável.</td>
      <td>Positivo; níveis proporcionais ou em queda &gt; 50% no abortamento completo.</td>
      <td>Saco gestacional intrauterino tópico irregular, hematoma subcoriônico ou restos ovulares desorganizados no endométrio.</td>
      <td>No abortamento completo com útero vazio, a paciente deve ter seu &beta;-hCG acompanhado até zerar para afastar ectópica preexistente não vista.</td>
    </tr>
    <tr>
      <td><strong>Corpo Lúteo Hemorrágico Roto</strong></td>
      <td>Dor pélvica súbita e intensa após relação sexual ou esforço físico, sem sangramento vaginal ou com sangramento discreto.</td>
      <td>Pode ser <strong>positivo</strong> se coexistir com gravidez intrauterina inicial, ou <strong>negativo</strong> se ocorrer na fase lútea do ciclo não grávido.</td>
      <td>Cisto ovariano de paredes espessas com ecos internos reticulares (aspecto em teia de aranha) e fluxo periférico com anel de fogo <em>dentro</em> do parênquima do ovário.</td>
      <td>Frequentemente confunde o médico da emergência se a paciente estiver grávida. O corpo lúteo é intraovariano e sua remoção acidental no primeiro trimestre pode induzir aborto por insuficiência luteínica.</td>
    </tr>
    <tr>
      <td><strong>Torção Anexial</strong></td>
      <td>Dor pélvica unilateral excruciante, de início hiperagudo, acompanhada de náuseas e vômitos incoercíveis; ausência de sangramento vaginal.</td>
      <td>Habitualmente negativo, salvo se houver gestação tópica associada estimulada por gonadotrofinas.</td>
      <td>Ovário acentuadamente aumentado de volume (&gt; 4-5 cm), estroma heterogêneo hipoecoico com folículos periféricos rechaçados e ausência ou redução do fluxo venoso/arterial ao Doppler (sinal do redemoinho no pedículo).</td>
      <td>Emergência cirúrgica ginecológica absoluta. Laparoscopia imediata para distorção e preservação ovariana; o Doppler com fluxo arterial presente não descarta torção venosa inicial.</td>
    </tr>
    <tr>
      <td><strong>Doença Inflamatória Pélvica (DIP)</strong></td>
      <td>Dor pélvica bilateral contínua progressiva, febre, corrimento vaginal mucopurulento amarelado e dor intensa à palpação anexial bilateral.</td>
      <td><strong>Negativo</strong> (salvo raríssima coincidência).</td>
      <td>Espessamento da parede tubária (&gt; 5 mm), líquido no lúmen tubário com septos incompletos (hidrossalpinge/piossalpinge) ou complexo tubo-ovariano.</td>
      <td>Sempre solicitar &beta;-hCG antes de fechar diagnóstico de DIP em mulheres jovens. Prescrever antibióticos não resolve gravidez tubária.</td>
    </tr>
    <tr>
      <td><strong>Apendicite Aguda</strong></td>
      <td>Dor epigástrica ou periumbilical migratória que se fixa na fossa ilíaca direita (ponto de McBurney), náuseas, anorexia, febre baixa e leucocitose com desvio.</td>
      <td>Habitualmente negativo (pode coexistir com gravidez).</td>
      <td>Estrutura tubular aperistáltica, em fundo cego, não compressível, com diâmetro transverso &gt; 6 mm no quadrante inferior direito, com coprólito ou gordura adjacente hiperecogênica.</td>
      <td>O apêndice inflamado na fossa ilíaca direita mimetiza com perfeição uma gestação ectópica tubária direita. O exame ultrassonográfico guiado e o &beta;-hCG diferenciam as patologias.</td>
    </tr>
    <tr>
      <td><strong>Gestação Heterotópica</strong></td>
      <td>Coexistência simultânea de gestação intrauterina tópica viável e gestação ectópica extrauterina concomitante. Incidência de 1:30.000 em concepção natural, mas salta para <strong>1:100 a 1:500 em reprodução assistida (FIV)</strong>.</td>
      <td><strong>Positivo com curvas perfeitamente normais e ascendentes</strong> (devido à gestação tópica sadia).</td>
      <td>Saco intrauterino com embrião viável (BCF +) associado a massa anexial complexa extraovariana ou saco gestacional ectópico na tuba.</td>
      <td><strong>Pegadinha fatal de prova:</strong> Visualizar uma gestação tópica intrauterina viável NÃO descarta gestação ectópica se a paciente realizou fertilização <em>in vitro</em>! O tratamento deve ser cirúrgico (salpingectomia videolaparoscópica seletiva) para preservar a gestação intrauterina sadia. <strong>O Metotrexato sistêmico é PROSCRITO</strong> pois destruiria o feto intrauterino viável.</td>
    </tr>
  </tbody>
</table>
`
    },
    {
      id: 'conduta-clinica-metotrexato',
      title: '8. Tratamento Clínico Medicamentoso com Metotrexato (MTX): Critérios e Protocolos',
      body_html: `
<h3>Mecanismo de Ação Farmacológica do Metotrexato</h3>
<p>O <strong>Metotrexato (MTX)</strong> é um agente quimioterápico antimetabólito que atua como inibidor competitivo da enzima <strong>di-hidrofolato redutase (DHFR)</strong>. Ao bloquear a conversão do di-hidrofolato em tetra-hidrofolato (forma ativa do ácido fólico), o fármaco impede a síntese de <em>purinas</em> e <em>timidilato</em>, bloqueando a síntese de DNA e RNA e a proliferação celular. Como as células trofoblásticas do blastocisto ectópico possuem um dos índices de divisão celular e replicação mitótica mais altos do organismo humano, tornam-se o alvo primário do fármaco, evoluindo para apoptose, necrose tecidual e reabsorção macrofágica completa sem necessidade de secção cirúrgica da tuba uterina.</p>

<h3>Critérios Formais de Elegibilidade (Indicações de Tratamento Clínico)</h3>
<p>Para que a paciente seja submetida ao tratamento medicamentoso com MTX com altas taxas de sucesso (85% a 95%) e margem estrita de segurança, <strong>TODOS os seguintes critérios devem ser preenchidos simultaneamente</strong>:</p>
<ul>
  <li><strong>1. Estabilidade Hemodinâmica Rigorosa:</strong> Ausência de hipotensão arterial, taquicardia descompensada ou sinais de choque;</li>
  <li><strong>2. Títulos Séricos de &beta;-hCG Inicial &lt; 5.000 mUI/mL:</strong> Valores &gt; 5.000 mUI/mL elevam a taxa de falha para mais de 35% a 40%, embora em centros selecionados possa ser considerado com cautela se outros parâmetros forem favoráveis; taxas ideais de sucesso (&gt; 90%) ocorrem com &beta;-hCG &lt; 1.500-2.000 mUI/mL;</li>
  <li><strong>3. Diâmetro Máximo da Massa Ectópica &lt; 3,5 a 4,0 cm:</strong> Medido nos maiores eixos pela ultrassonografia transvaginal;</li>
  <li><strong>4. Ausência de Batimentos Cardíacos Fetais (BCF ausente)</strong> na massa anexial ectópica;</li>
  <li><strong>5. Ausência de Evidência de Rotura Tubária ou Hemoperitônio Volumoso</strong> (líquido livre abundante além do fundo de saco de Douglas);</li>
  <li><strong>6. Provas Laboratoriais de Segurança Normais:</strong> Hemograma sem anemia grave ou leucopenia/plaquetopenia; enzimas hepáticas normais (AST e ALT normais); creatinina sérica normal (&le; 1,2 mg/dL);</li>
  <li><strong>7. Consentimento Esclarecido e Certeza de Aderência ao Seguimento Ambulatorial:</strong> A paciente deve ter facilidade de acesso à emergência 24 horas e compromisso de retorno para as dosagens seriadas.</li>
</ul>

<h3>Contraindicações Formais ao Metotrexato</h3>
<table class="book-table">
  <thead>
    <tr>
      <th>Contraindicações Absolutas</th>
      <th>Contraindicações Relativas</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>• Instabilidade hemodinâmica ou rotura tubária evidente;<br>• Coexistência de gestação intrauterina viável (gestação heterotópica);<br>• Impossibilidade de comparecer ao seguimento laboratorial programado;<br>• Amamentação ativa no momento do diagnóstico;<br>• Disfunção hepática prévia moderada a grave ou etilismo crônico;<br>• Insuficiência renal moderada a grave (Clearance de creatinina &lt; 50 mL/min);<br>• Discrasia sanguínea (anemia grave, plaquetas &lt; 100.000/mm³, leucócitos &lt; 3.000/mm³);<br>• Doença pulmonar ativa (tuberculose, fibrose pulmonar);<br>• Úlcera péptica ativa sangrante;<br>• Hipersensibilidade prévia conhecida ao metotrexato.</td>
      <td>• Saco gestacional com &gt; 3,5 cm de diâmetro;<br>• Presença de atividade cardíaca embrionária (BCF +);<br>• Níveis séricos de &beta;-hCG &gt; 5.000 mUI/mL (aumenta o risco de falha primária);<br>• Recusa da paciente em receber derivados quimioterápicos ou transfusão de hemoderivados em eventual falha.</td>
    </tr>
  </tbody>
</table>

<h3>Protocolos Posológicos e Monitorização Laboratorial Estrita</h3>
<h4>1. Protocolo em Dose Única de Stovall (Esquema Mais Utilizado Mundialmente)</h4>
<p>Administra-se <strong>Metotrexato na dose de 50 mg/m² de superfície corporal por via intramuscular profunda</strong> no <strong>Dia 1 (D1)</strong>.</p>
<p>A superfície corporal é calculada pela fórmula clássica de Mosteller: $SC (m^2) = \sqrt{\frac{Peso (kg) \times Altura (cm)}{3600}}$.</p>

<p><strong>Cronograma Obrigatório de Monitorização Laboratorial:</strong></p>
<ul>
  <li><strong>Dia 1 (D1):</strong> Dosagem do &beta;-hCG basal pré-tratamento imediato e injeção intramuscular de MTX (50 mg/m²).</li>
  <li><strong>Dia 4 (D4):</strong> Nova dosagem de &beta;-hCG quantitativo sérico.
    <br><em>Fenômeno fisiológico esperado:</em> Em 70% a 80% das pacientes, <strong>o &beta;-hCG no D4 AUMENTA em relação ao D1</strong> (podendo subir de 10% a 30%). Esse aumento fisiológico decorre da lise celular aguda do sinciciotrofoblasto com liberação maciça de &beta;-hCG pré-formado na circulação e não reflete fracasso terapêutico!</li>
  <li><strong>Dia 7 (D7):</strong> Nova dosagem de &beta;-hCG quantitativo sérico.
    <br><strong>O Ponto de Decisão Terapêutica Fundamental:</strong>
    $$\text{Queda Percentual} = \frac{\beta\text{-hCG}_{D4} - \beta\text{-hCG}_{D7}}{\beta\text{-hCG}_{D4}} \times 100$$
    <ul>
      <li><strong>Se a queda for &ge; 15% entre o D4 e o D7:</strong> Considera-se tratamento medicamentoso bem-sucedido. A paciente entra em acompanhamento ambulatorial semanal com dosagens de &beta;-hCG até negativação completa (&lt; 5 mUI/mL);</li>
      <li><strong>Se a queda for &lt; 15% entre o D4 e o D7 (ou se o valor no D7 for superior ao do D4):</strong> Considera-se falha do primeiro ciclo. Caso a paciente mantenha estabilidade clínica e preencha todos os critérios de elegibilidade, <strong>administra-se uma SEGUNDA DOSE de MTX (50 mg/m² IM)</strong>, reiniciando a contagem como novo D1 (medindo nos novos D4 e D7 subsequentes). Se após duas (ou no máximo três) doses não houver queda &ge; 15%, ou se surgir dor intensa ou instabilidade, indica-se tratamento cirúrgico imediato.</li>
    </ul>
  </li>
</ul>

<h4>2. Protocolo de Doses Múltiplas com Resgate de Ácido Folínico</h4>
<p>Utilizado em casos selecionados com massas volumosas limítrofes ou em centros especializados. Consiste na alternância de:</p>
<ul>
  <li><strong>Metotrexato 1,0 mg/kg IM</strong> nos Dias 1, 3, 5 e 7; alternado com:</li>
  <li><strong>Ácido Folínico (Leucovorina) 0,1 mg/kg IM</strong> nos Dias 2, 4, 6 e 8 (para resgate das células da medula óssea e mucosa gastrintestinal).</li>
  <li>O protocolo é interrompido quando se obtém queda &ge; 15% do &beta;-hCG entre duas dosagens consecutivas. Apresenta taxas de cura discretamente superiores, porém com maior incidência de efeitos colaterais sistêmicos (estomatite, náuseas, alopecia discreta, hepatotoxicidade transitória e neutropenia).</li>
</ul>

<h3>Orientações Cruciais e Alerta sobre a "Dor de Separação" (Separation Pain)</h3>
<p>Cerca de 60% a 70% das pacientes tratadas com MTX apresentam dor abdominal em cólica leve a moderada entre o 3º e o 7º dia pós-injeção. Esse sintoma, conhecido como <strong>dor de separação trofoblástica</strong>, decorre do hematoma intratubário e da descamação do tecido trofoblástico necrosado. A dor de separação responde bem a analgésicos simples (paracetamol, dipirona), dura tipicamente menos de 24 a 48 horas e não se acompanha de descompressão peritoneal brusca positiva ou taquicardia.</p>
<p><strong>Proibições Estritas Durante o Tratamento com Metotrexato:</strong></p>
<ul>
  <li><strong>Anti-inflamatórios Não Esteroidais (AINEs):</strong> Reduzem a filtração glomerular e competem pela secreção tubular renal do MTX, aumentando sua meia-vida plasmática e induzindo toxicidade medular potencialmente fatal;</li>
  <li><strong>Suplementos Contendo Ácido Fólico:</strong> Neutralizam o mecanismo de ação da DHFR e reduzem a eficácia do tratamento;</li>
  <li><strong>Exposição Solar Intensa:</strong> Risco de dermatite fotossensível induzida pelo metotrexato;</li>
  <li><strong>Relações Sexuais e Exames de Toque Vaginal Bimanual Vigorosos:</strong> O aumento da pressão mecânica intrapélvica eleva o risco mecânico de rotura tubária secundária;</li>
  <li><strong>Alimentos Produtores de Gases e Bebidas Alcoólicas:</strong> O álcool potencializa a hepatotoxicidade do MTX.</li>
</ul>
`
    },
    {
      id: 'conduta-expectante-criterios',
      title: '9. Conduta Expectante: Indicações Estritas, Critérios de Inclusão e Limites de Segurança',
      body_html: `
<h3>Bases Científicas e Seleção Criteriosa</h3>
<p>A conduta expectante baseia-se na constatação de que uma proporção considerável de gestações ectópicas evolui espontaneamente para abortamento tubário completo ou reabsorção tecidual sem provocar rotura tubária ou hemoperitônio com repercussão sistêmica. Entretanto, a conduta expectante <strong>NÃO significa abandono ou alta ambulatorial</strong>; consiste em monitorização ativa e estrita no regime de vigilância contínua.</p>

<h3>Critérios Rígidos de Inclusão para Conduta Expectante (Diretrizes FEBRASGO e NICE NG126)</h3>
<p>A adoção da conduta expectante exige o cumprimento estrito de <strong>todos</strong> os seguintes parâmetros no momento da admissão:</p>
<ol>
  <li><strong>Estabilidade hemodinâmica absoluta</strong> e paciente assintomática ou oligossintomática (dor pélvica ausente ou mínima);</li>
  <li><strong>Títulos séricos basais de &beta;-hCG quantitativo &lt; 1.000 a 1.500 mUI/mL</strong> em curva <strong>claramente decrescente</strong> comprovada em dosagens seriadas prévias;</li>
  <li><strong>Massa ectópica anexial pequena</strong> (diâmetro máximo medido pela USTV &lt; 3,0 cm);</li>
  <li><strong>Ausência de embrião com batimentos cardíacos</strong> (BCF ausente);</li>
  <li><strong>Ausência de hemoperitônio relevante</strong> ao exame ultrassonográfico (líquido livre ausente ou confinado estritamente ao fundo de saco de Douglas);</li>
  <li><strong>Garantia irrestrita de comparecimento</strong> às consultas de retorno e capacidade de contatar prontamente o centro cirúrgico de emergência em caso de dor súbita ou síncope.</li>
</ol>

<h3>Protocolo de Vigilância e Critérios de Falha</h3>
<p>O protocolo preconizado pela diretriz <em>NICE NG126</em> e adaptado pela FEBRASGO estabelece:</p>
<ul>
  <li>Dosagens séricas de &beta;-hCG quantitativo nos <strong>Dias 2, 4 e 7</strong> após a triagem inicial;</li>
  <li>Caso o &beta;-hCG decline continuamente e apresente queda &gt; 15% entre as medições, as dosagens são espaçadas para <strong>intervalos semanais</strong> até a negativação completa (&beta;-hCG &lt; 5 mUI/mL);</li>
  <li>O tempo médio até a resolução espontânea completa varia de 2 a 6 semanas.</li>
</ul>

<p><strong>Critérios de Fracasso da Conduta Expectante (Indicação Imediata de Tratamento Ativo):</strong></p>
<ul>
  <li>Surgimento de dor abdominal súbita ou piora progressiva do quadro álgico;</li>
  <li>Elevação dos níveis de &beta;-hCG sérico ou estabilização em platô durante o seguimento;</li>
  <li>Aumento das dimensões da massa anexial ou aparecimento de líquido livre volumoso à ultrassonografia;</li>
  <li>Surgimento de qualquer sinal de instabilidade hemodinâmica (taquicardia, hipotensão postural). Nesses cenários, a conduta deve ser imediatamente convertida para tratamento com Metotrexato ou videolaparoscopia.</li>
</ul>
`
    },
    {
      id: 'tratamento-cirurgico-laparoscopia-laparotomia',
      title: '10. Tratamento Cirúrgico: Laparoscopia Padrão-Ouro, Técnicas Tubárias e Persistência Trofoblástica',
      body_html: `
<h3>Via de Acesso Cirúrgica: Laparoscopia vs Laparotomia</h3>
<p>O tratamento cirúrgico permanece como a intervenção definitiva para a gestação ectópica, sendo o método de escolha nas pacientes que não preenchem critérios para tratamento clínico medicamentoso ou naquelas que apresentam falha terapêutica do Metotrexato.</p>
<ul>
  <li><strong>Videolaparoscopia (Padrão-Ouro Mundial):</strong> Indicada em todas as pacientes hemodinamicamente estáveis ou com instabilidade leve compensável com infusão rápida de volume durante o preparo cirúrgico. Oferece vantagens indiscutíveis em relação à laparotomia aberta: menor perda sanguínea intraoperatória, menor tempo de internação hospitalar (alta em 24 horas), menor dor pós-operatória, menor risco de aderências pélvicas pós-operatórias subsequentes e recuperação estética e laboral acelerada;</li>
  <li><strong>Laparotomia Exploradora (Via Aberta por Pfannenstiel ou Mediana):</strong> Reservada estritamente para situações de <strong>choque hemorrágico descompensado refratário</strong>, parada cardiorrespiratória iminente por rotura catastrófica, ausência de equipamento ou equipe habilitada em videolaparoscopia na unidade de emergência, ou presença de distensão abdominal maciça e aderências complexas que impeçam a visualização ou o pneumoperitônio seguro.</li>
</ul>

<h3>Técnicas Cirúrgicas Tubárias: Salpingectomia vs Salpingostomia Linear</h3>
<table class="book-table">
  <thead>
    <tr>
      <th>Procedimento Cirúrgico</th>
      <th>Descrição Técnica Operatória</th>
      <th>Indicações Clínicas Formais</th>
      <th>Vantagens e Complicações Específicas</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>Salpingectomia Total</strong><br>(Ressecção Tubária Completa)</td>
      <td>Preensão e coagulação bipolar progressiva do mesossalpinge paralelamente à tuba uterina, seccionando a vascularização dos ramos tubários da artéria uterina e da artéria ovariana, seguida da ressecção da tuba na sua inserção cornual proximal.</td>
      <td>• Tuba uterina extensamente lesada ou rota com destruição anatômica irreversível;<br>• Hemorragia tubária incoercível no leito operatório;<br>• Gestação ectópica recorrente na mesma tuba previamente operada;<br>• Prole constituída com desejo de esterilização tubária definitiva;<br>• Presença de <strong>tuba contralateral saudável</strong> documentada no inventário pélvico cirúrgico;<br>• Paciente sem condições de aderir ao seguimento estrito de &beta;-hCG pós-operatório.</td>
      <td><strong>Vantagens:</strong> Elimina 100% o risco de prenhez ectópica persistente local e afasta a recorrência ipsilateral.<br><strong>Impacto na fertilidade:</strong> Se a tuba contralateral for normal, as taxas globais de gestação intrauterina espontânea subsequente são comparáveis às da salpingostomia, sem a ansiedade da persistência trofoblástica.</td>
    </tr>
    <tr>
      <td><strong>Salpingostomia Linear Conservadora</strong><br>(Preservação Tubária)</td>
      <td>Incisão longitudinal de 1 a 2 cm realizada na borda antimesentérica da ampola tubária sobre a área de maior distensão ectópica (utilizando bisturi elétrico ou laser). A massa gestacional e os coágulos são cuidadosamente hidrodissecados e extraídos com pinça de preensão atraumática. O leito tubário é irrigado com soro fisiológico sob pressão e a hemostasia é realizada com cauterização bipolar puntiforme de baixa potência. A incisão é deixada aberta para cicatrização por segunda intenção (não se recomenda sutura tubária primária, pois aumenta o risco de estenose e aderências).</td>
      <td>• Desejo manifesto de preservação da fertilidade futura em paciente com <strong>tuba contralateral ausente, danificada ou doente</strong> (fator tubário único);<br>• Tuba íntegra (não rota) e paciente perfeitamente estável;<br>• Acometimento localizado preferencialmente na porção ampolar.</td>
      <td><strong>Desvantagem e Risco Crítico:</strong> Risco de <strong>Trofoblasto Persistente (5% a 15% dos casos)</strong> decorrente de retenção de sinciciotrofoblasto microscopicamente infiltrado na muscular da tuba que continua proliferando e produzindo &beta;-hCG, exigindo monitorização laboratorial semanal obrigatória no pós-operatório.</td>
    </tr>
  </tbody>
</table>

<h3>Complicação Específica da Salpingostomia: Prenhez Ectópica Persistente (Trofoblasto Residual)</h3>
<p>A persistência trofoblástica ocorre quando células do trofoblasto extraviloso permanecem viáveis na parede tubária remanescente após a evacuação cirúrgica da massa. Essas células mantêm a síntese hormonal e a angiogênese, podendo ocasionar hemoperitônio tardio grave dias ou semanas após uma cirurgia aparentemente sem intercorrências.</p>
<p><strong>Protocolo de Monitorização Pós-Salpingostomia:</strong></p>
<ul>
  <li>Dosagem de &beta;-hCG quantitativo sérico no <strong>Dia 1 pós-operatório</strong> (deve apresentar queda dramática &gt; 50% em relação ao pré-operatório) e subsequentemente em <strong>intervalos semanais</strong> até atingir valores indetectáveis (&lt; 5 mUI/mL);</li>
  <li>O diagnóstico de persistência é estabelecido caso o &beta;-hCG se estabilize em platô ou volte a se elevar em duas dosagens consecutivas;</li>
  <li><strong>Conduta no Trofoblasto Persistente:</strong> Se a paciente estiver hemodinamicamente estável, o tratamento padrão de escolha é o <strong>Metotrexato em dose única (50 mg/m² IM)</strong>, que apresenta taxa de resolução superior a 95%, evitando uma nova abordagem cirúrgica.</li>
</ul>
`
    },
    {
      id: 'choque-hemorragico-prenhez-rota',
      title: '11. Manejo da Prenhez Ectópica Rota em Choque Hemorrágico: Ressuscitação e Controle de Danos',
      body_html: `
<h3>O Cenário Catastrófico da Ectópica Rota</h3>
<p>A rotura de uma gestação ectópica (especialmente ístmica ou cornual) pode precipitar a perda de mais de 1.500 a 2.500 mL de sangue para o peritônio em questão de minutos a poucas horas. A paciente apresenta-se na sala de emergência em choque hipovolêmico classe III ou IV, caracterizado por taquicardia extrema (FC &gt; 120 bpm) ou bradicardia paradoxal (reflexo vagal de Bezold-Jarisch por peritônio inundado de sangue), hipotensão severa (PAS &lt; 70-80 mmHg), alteração do estado mental, extremidades cianóticas e sinal de Blumberg francamente positivo.</p>

<h3>Protocolo Imediato de Reanimação Hemostática na Sala Vermelha</h3>
<ol>
  <li><strong>Prioridade Zero: Cirurgia Imediata (Não Atrasar o Centro Cirúrgico):</strong>
    <p>O único tratamento efetivo do choque hemorrágico por sangramento intracavitário ativo é o <em>controle hemostático cirúrgico mecânico</em>. Nenhuma infusão de fluidos substituirá o clampeamento vascular. A sala cirúrgica deve ser acionada simultaneamente à admissão do paciente;</p>
  </li>
  <li><strong>Acessos Vasculares e Monitorização:</strong>
    <p>Obtenção imediata de 2 acessos venosos periféricos de grosso calibre (cateteres 14G ou 16G em fossas antecubitais). Coleta rápida de sangue para tipagem sanguínea (ABO/Rh), prova cruzada para 4 a 6 bolsas de concentrado de hemácias, hemograma completo, coagulograma, fibrinogênio, gasometria arterial e lactato sérico;</p>
  </li>
  <li><strong>Ressuscitação com Danos Controlados e Hipotensão Permissiva:</strong>
    <p>Evitar a infusão agressiva de litros de cristaloides frios (soro fisiológico a 0,9%), que agrava a tríade letal (acidose metabólica, hipotermia e coagulopatia dilucional). Almejar uma <strong>pressão arterial sistólica alvo entre 80 e 90 mmHg (pressão arterial média entre 55 e 65 mmHg)</strong> até o momento do clampeamento cirúrgico dos vasos sangrantes (hipotensão permissiva);</p>
  </li>
  <li><strong>Ativação do Protocolo de Transfusão Maciça (PTM):</strong>
    <p>Indicado precocemente na presença de choque classe IV ou teste eFAST positivo com instabilidade. Transfundir hemocomponentes na proporção fisiológica balanceada de <strong>1:1:1</strong> (1 unidade de Concentrado de Hemácias : 1 unidade de Plasma Fresco Congelado : 1 unidade de Concentrado de Plaquetas). Administrar <strong>Ácido Tranexâmico</strong> precocemente (1 g EV em 10 minutos nas primeiras 3 horas do sangramento, seguido de 1 g EV em infusão contínua por 8 horas); monitorar níveis de <strong>fibrinogênio</strong>, transfundindo crioprecipitado se fibrinogênio sérico &lt; 150-200 mg/dL.</p>
  </li>
</ol>

<h3>Abordagem Cirúrgica de Emergência</h3>
<ul>
  <li><strong>Laparotomia Exploradora Mediana Infraumbilical Rápida:</strong> Permite acesso imediato à cavidade pélvica em menos de 60 segundos;</li>
  <li><strong>Evisceração das Alças e Sucção Rápida do Hemoperitônio:</strong> Utilização de aspirador cirúrgico calibroso para aspiração dos coágulos que obscurecem o campo visual;</li>
  <li><strong>Clampeamento Hemostático Imediato (Controle Vascular):</strong> Localização manual rápida do útero e tração superior. Aplicação imediata de pinças de Foerster ou Rochester-Pean no mesossalpinge do anexo acometido, interrompendo instantaneamente o fluxo arterial retrógrado e anterógrado. Uma vez clampeado o pedículo vascular, o sangramento cessa e a equipe de anestesiologia ganha tempo seguro para reanimar a paciente e recuperar os parâmetros vitais antes da ressecção definitiva (salpingectomia total).</li>
</ul>
`
    },
    {
      id: 'imunoprofilaxia-rh-aspectos-reprodutivos',
      title: '12. Imunoprofilaxia Rh(D), Preservação da Fertilidade e Aconselhamento',
      body_html: `
<h3>Imunoprofilaxia Anti-D na Paciente Rh Negativo</h3>
<p>Toda paciente com diagnóstico de gestação ectópica (seja ela conduzida de forma cirúrgica, medicamentosa com metotrexato ou expectante) que apresente tipagem sanguínea <strong>Rh(D) negativo</strong> com teste de <strong>Coombs indireto negativo (não sensibilizada)</strong> DEVE receber imunoglobulina humana anti-D para prevenção primária da aloimunização eritrocitária materna.</p>
<ul>
  <li><strong>Dose Recomendada:</strong>
    <ul>
      <li>Gestações ectópicas diagnosticadas no <strong>primeiro trimestre (&lt; 12 semanas)</strong>: Administra-se <strong>Imunoglobulina Anti-D na dose de 50 a 150 &mu;g (250 a 750 UI) IM</strong>;</li>
      <li>Gestações ectópicas diagnosticadas com <strong>&ge; 12 semanas</strong> (ou nos casos em que a microdose de 50 &mu;g não estiver disponível na instituição): Administra-se a <strong>dose plena padrão de 300 &mu;g (1.500 UI) IM</strong>;</li>
    </ul>
  </li>
  <li><strong>Janela de Administração:</strong> Idealmente dentro das primeiras <strong>72 horas</strong> após o evento hemorrágico ou a intervenção cirúrgica/medicamentosa, podendo ser administrada até 28 dias após com benefício profilático parcial.</li>
</ul>

<h3>Prognóstico Reprodutivo Futuro e Taxas de Recorrência</h3>
<p>O aconselhamento reprodutivo pós-gestação ectópica deve ser conduzido de maneira empática e pautada em dados científicos consistentes:</p>
<ul>
  <li><strong>Taxa Global de Fertilidade Futura:</strong> Cerca de 60% a 70% das mulheres conseguem alcançar uma gestação intrauterina viável a termo nos dois anos subsequentes ao episódio de gestação ectópica;</li>
  <li><strong>Risco de Recorrência de Gestação Ectópica:</strong>
    <ul>
      <li>Após 1 episódio de gestação ectópica prévia: O risco relativo de recorrência na gestação seguinte situa-se em torno de <strong>10% a 15%</strong> (cerca de 10 vezes superior ao da população geral);</li>
      <li>Após 2 ou mais episódios de gestação ectópica prévia: O risco de recorrência salta dramaticamente para <strong>25% a 30%</strong>;</li>
    </ul>
  </li>
  <li><strong>Intervalo Interpartal Recomendado Após Metotrexato:</strong> Em decorrência do potencial efeito teratogênico e da retenção tecidual hepática e renal do metotrexato, recomenda-se prescrever <strong>método contraceptivo altamente eficaz por no mínimo 3 a 6 meses</strong> após a última dose do medicamento antes de autorizar uma nova tentativa de concepção, reiniciando o uso de ácido fólico em dose habitual (0,4 a 5 mg/dia) após a depuração completa do fármaco;</li>
  <li><strong>Protocolo de Pré-Natal em Gestações Futuras:</strong> Orientar formalmente a paciente de que, em qualquer gestação futura subsequente, assim que houver atraso menstrual e teste positivo de gravidez, ela deve realizar <strong>ultrassonografia transvaginal precoce com 5 a 6 semanas de idade gestacional</strong> para confirmar a localização intrauterina tópica do saco gestacional antes mesmo do surgimento de qualquer sintoma.</li>
</ul>
`
    },
    {
      id: 'casos-clinicos-estruturados',
      title: '13. Casos Clínicos Estruturados e Raciocínio Diagnóstico na Prática',
      body_html: `
<h3>Caso Clínico 1: Gestação de Localização Desconhecida (PUL) e Risco de Erro de Conduta</h3>
<p><strong>Identificação:</strong> Paciente feminina, 26 anos, nuligesta, procura o pronto-atendimento obstétrico relatando atraso menstrual de 6 semanas, dor em peso discreta na fossa ilíaca esquerda há 2 dias e sangramento vaginal escuro em pequena quantidade. Nega febre, síncope ou sintomas urinários. Não utiliza método contraceptivo regular.</p>
<p><strong>Exame Físico:</strong> Bom estado geral, corada, hidratada. PA = 120/75 mmHg, FC = 76 bpm, FR = 16 irpm, afebril. Abdome flácido, sem visceromegalias, indolor à palpação superficial, discreto desconforto à palpação profunda da fossa ilíaca esquerda, sem sinais de peritonite (Blumberg negativo). Exame especular: colo sem lesões, orifício fechado com pequena quantidade de secreção hemática em borra de café. Toque vaginal: útero de tamanho normal, indolor à mobilização, sem massas palpáveis evidentes nos anexos.</p>
<p><strong>Exames Complementares Iniciais:</strong></p>
<ul>
  <li>&beta;-hCG quantitativo sérico basal (Hora 0): <strong>1.100 mUI/mL</strong>;</li>
  <li>Ultrassonografia Transvaginal (Hora 2): Endométrio homogêneo e espessado (11 mm), sem saco gestacional ou vesícula vitelínica intrauterina; ovários tópicos de aspecto ecográfico normal com corpo lúteo à esquerda; ausência de massas anexiais nítidas; ausência de líquido livre na pelve.</li>
</ul>
<p><strong>Discussão Clínica e Conduta:</strong></p>
<p>A paciente apresenta-se hemodinamicamente estável com quadro de <strong>PUL (Gestação de Localização Desconhecida)</strong>. Como o valor basal de &beta;-hCG (1.100 mUI/mL) encontra-se <em>abaixo</em> da zona discriminatória habitual da USTV (1.500 a 2.000 mUI/mL), é perfeitamente plausível que se trate de uma gestação intrauterina tópica inicial viável ainda invisível ao ultrassom, ou de um abortamento precoce completo, ou de uma gestação ectópica inicial. <strong>Conduta absolutamente errada seria prescrever Metotrexato ou indicar curetagem neste momento</strong>, pois se interromperia uma gestação intrauterina potencialmente saudável.</p>
<p><strong>Evolução:</strong> Foi mantida em conduta ambulatorial monitorada com orientações expressas sobre sinais de alarme. Retornou 48 horas depois (Hora 48): assintomática, com novo &beta;-hCG de <strong>2.150 mUI/mL</strong> (elevação de 95%). Uma nova USTV realizada no Dia 4 revelou saco gestacional intrauterino tópico de 6 mm com vesícula vitelínica evidente, confirmando gestação intrauterina tópica viável.</p>

<h3>Caso Clínico 2: Gestação Ectópica Íntegra Elegível para Metotrexato</h3>
<p><strong>Identificação:</strong> Paciente feminina, 31 anos, primigesta, com diagnóstico de infertilidade prévia por fator masculino e histórico de DIP tratada há 3 anos. Relata atraso menstrual de 7 semanas e sangramento vaginal escasso amarronzado há 5 dias, associado a pontadas esporádicas em fossa ilíaca direita. Sem queixas sistêmicas.</p>
<p><strong>Exame Físico:</strong> Estável hemodinamicamente. PA = 115/70 mmHg, FC = 72 bpm. Abdome plano, flácido, com dor localizada à palpação profunda em anexo direito, sem irritação peritoneal. Toque vaginal: colo fechado, orifício externo sem exteriorização de restos, dor leve à palpação do anexo direito.</p>
<p><strong>Exames Complementares:</strong></p>
<ul>
  <li>&beta;-hCG quantitativo sérico no Dia 1: <strong>2.800 mUI/mL</strong>;</li>
  <li>USTV: Útero com endométrio desprovido de saco gestacional (reação decidual); anexo direito evidenciando imagem em halo hiperecogênico com centro anecoico de <strong>2,4 cm no maior diâmetro (bagel sign)</strong> e fluxo periférico ao Doppler (anel de fogo); ausência de atividade cardíaca embrionária (BCF ausente); ausência de líquido livre no fundo de saco de Douglas;</li>
  <li>Laboratório pré-quimioterapia: Hemoglobina = 12,8 g/dL, Leucócitos = 6.400/mm³, Plaquetas = 240.000/mm³; AST = 22 U/L, ALT = 25 U/L; Creatinina = 0,7 mg/dL; Tipagem sanguínea = O positivo.</li>
</ul>
<p><strong>Discussão e Conduta:</strong></p>
<p>A paciente reúne todos os critérios formais para conduta clínica medicamentosa: estabilidade hemodinâmica, massa &lt; 3,5 cm (2,4 cm), BCF ausente, &beta;-hCG &lt; 5.000 mUI/mL (2.800 mUI/mL), funções hepática e renal normais e desejo de preservação tubária. Foi calculado o protocolo de Stovall em dose única: MTX 50 mg/m² IM profunda no D1. Orientou-se abstinência sexual, suspensão de AINEs e ácido fólico e repouso relativo.</p>
<p><strong>Seguimento:</strong></p>
<ul>
  <li>No D4: &beta;-hCG = 3.350 mUI/mL (aumento fisiológico de 19% decorrente da necrose trofoblástica, sem alarme);</li>
  <li>No D7: &beta;-hCG = 2.450 mUI/mL (queda de 26,8% em relação ao D4, portanto &gt; 15%);</li>
  <li>Resultado: Sucesso terapêutico do primeiro ciclo. Acompanhada com dosagens semanais de &beta;-hCG até negativação completa na 4ª semana pós-injeção.</li>
</ul>

<h3>Caso Clínico 3: Gestação Ectópica Rota em Choque Hemorrágico e Protocolo de Transfusão Maciça</h3>
<p><strong>Identificação:</strong> Mulher de 29 anos, G2P1 (cesárea prévia há 2 anos), trazida pelo SAMU com queixa de dor abdominal difusa súbita de forte intensidade seguida de lipotímia e síncope no domicílio. Acompanhante refere atraso menstrual de cerca de 8 semanas.</p>
<p><strong>Exame Físico:</strong> Estado geral grave, torporosa, sudoreica, palidez cutâneo-mucosa 3+/4+. PA = 70/40 mmHg, FC = 138 bpm (filiforme), pulsos periféricos finos, tempo de enchimento capilar de 4 segundos. Abdome francamente distendido, em tábua, com dor difusa insuportável e sinal de Blumberg positivo em todos os quadrantes. Sinal de Laffon presente (queixa de dor intensa no ombro direito antes de perder a consciência). Toque vaginal: abaulamento doloroso e tenso de fundo de saco de Douglas (sinal de Proust positivo).</p>
<p><strong>Conduta Emergencial Imediata:</strong></p>
<p>Quadro indiscutível de prenhez ectópica rota com hemoperitônio maciço e choque hemorrágico classe IV. Não há qualquer indicação de perda de tempo em tomografia computadorizada ou dosagens demoradas de laboratório:</p>
<ol>
  <li>Acionamento simultâneo do centro cirúrgico de emergência para laparotomia exploradora imediata e ativação do Protocolo de Transfusão Maciça (PTM);</li>
  <li>Puncionados dois cateteres 14G, iniciada infusão de 500 mL de Ringer Lactato aquecido com hipotensão permissiva e administração imediata de 1 g de Ácido Tranexâmico EV;</li>
  <li>Transporte imediato à sala de cirurgia sem esperar provas cruzadas (solicitadas 2 bolsas de concentrado de hemácias O negativo não compatibilizado);</li>
  <li>Laparotomia exploradora mediana rápida: aspiração de aproximadamente 1.800 mL de sangue e coágulos na cavidade peritoneal. Identificada tuba uterina esquerda rota no terço ístmico com sangramento arterial ativo em jato;</li>
  <li>Clampeamento rápido do mesossalpinge esquerdo com pinça hemostática de Foerster, cessando prontamente o sangramento. Conduzida salpingectomia total esquerda com revisão criteriosa do leito cirúrgico e lavagem abundante da cavidade;</li>
  <li>Como a paciente era Rh negativo não sensibilizada, foi administrada Imunoglobulina Anti-D 300 &mu;g IM no pós-operatório imediato. Alta hospitalar no 3º dia pós-operatório em boas condições clínicas.</li>
</ol>

<h3>Caso Clínico 4: Gestação Heterotópica Pós-Fertilização in Vitro</h3>
<p><strong>Identificação:</strong> Paciente de 34 anos, submetida à fertilização <em>in vitro</em> com transferência de dois embriões blastocistos há 4 semanas. Comparece ao pronto-socorro obstétrico com dor tipo cólica intensa em fossa ilíaca direita iniciada há 12 horas. &beta;-hCG sérico quantitativo atual: 45.000 mUI/mL.</p>
<p><strong>Exame Físico e Imagem:</strong> Paciente hemodinamicamente estável (PA = 120/80 mmHg, FC = 80 bpm). Abdome doloroso à palpação da fossa ilíaca direita, com descompressão brusca duvidosa. USTV evidencia: útero contendo saco gestacional tópico normoinserido com embrião de CCN compatível com 6 semanas e 4 dias, com batimentos cardíacos presentes e rítmicos (BCF = 135 bpm). No entanto, o anexo direito revela uma segunda massa gestacional ectópica ampolar de 3,2 cm contendo vesícula vitelínica e embrião ectópico com batimentos cardíacos fetais presentes (BCF = 128 bpm), circundada por moderada quantidade de líquido livre na pelve.</p>
<p><strong>Raciocínio Clínico e Decisão Terapêutica:</strong></p>
<p>Diagnóstico de <strong>Gestação Heterotópica</strong>. A presença do embrião intrauterino viável exclui categoricamente a possibilidade de tratamento clínico sistêmico com Metotrexato, pois o fármaco levaria à perda da gravidez intrauterina desejada. A presença de dor, líquido livre e embrião ectópico com BCF ativo impõe intervenção cirúrgica.</p>
<p><strong>Conduta:</strong> A paciente foi submetida a <strong>videolaparoscopia cirúrgica de urgência</strong>, com inventário cuidadoso da pelve sob pressão pneumoperitoneal reduzida (10-12 mmHg) e manipulação uterina mínima. Realizou-se salpingectomia total direita com hemostasia bipolar meticulosa. A gestação intrauterina tópica manteve-se perfeitamente preservada e viável, evoluindo favoravelmente no pré-natal.</p>
`
    },
    {
      id: 'questoes-concursos-comentadas',
      title: '14. Questões Inéditas e de Concursos Médicos com Comentários Exaustivos',
      body_html: `
<h3>Questão 1 (ENAMED / Revalidação de Diploma)</h3>
<p>Mulher de 28 anos, previamente hígida, usuária de DIU de cobre há 3 anos, procura a Unidade de Pronto Atendimento com quadro de atraso menstrual de 7 semanas, sangramento genital de pequena intensidade em borra de café há 4 dias e dor em pontada na fossa ilíaca direita. Ao exame físico: PA = 110/70 mmHg, FC = 78 bpm, abdome com dor à palpação profunda em fossa ilíaca direita, sem sinais de peritonite. Exame especular: presença do fio do DIU exteriorizado pelo colo uterino, com sangramento discreto. Toque vaginal: útero de tamanho normal, dor à palpação do anexo direito. O teste imunológico de gravidez urinário é positivo. Diante do quadro clínico e dos conhecimentos sobre a epidemiologia e fisiopatologia da gestação ectópica, assinale a alternativa correta:</p>
<p><strong>A)</strong> O uso de DIU de cobre aumenta o risco absoluto global de a paciente engravidar, devendo o dispositivo ser retirado imediatamente para permitir a visualização ultrassonográfica do endométrio.<br>
<strong>B)</strong> O DIU previne eficazmente a gestação intrauterina, mas caso ocorra falha contraceptiva e concepção, a proporção relativa de gestação ectópica é significativamente mais elevada do que na população geral.<br>
<strong>C)</strong> A presença do DIU <em>in situ</em> confirma que o sangramento decorre exclusivamente de endometrite bacteriana secundária ao fio do dispositivo, afastando a hipótese de gestação ectópica.<br>
<strong>D)</strong> A paciente deve receber alta hospitalar imediata com antibioticoterapia oral de amplo espectro para tratar doença inflamatória pélvica, com retorno agendado em 30 dias.<br>
<strong>E)</strong> A hipótese de gestação ectópica está descartada pelo fato de a paciente ser jovem, nulípara e não possuir antecedente de cirurgia tubária reconstrutora prévia.</p>
<p><strong>Gabarito Comentado:</strong></p>
<p><strong>Alternativa B está CORRETA.</strong> O DIU (seja ele de cobre ou de levonorgestrel) é um método contraceptivo de altíssima eficácia clínica que reduz dramaticamente a incidência <em>absoluta</em> de qualquer gravidez. No entanto, sua ação primordial se dá no ambiente intrauterino (reação inflamatória estéril espermicida e anti-implantação). Caso ocorra a rara falha contraceptiva com fecundação tubária bem-sucedida, o concepto tem uma probabilidade relativa muito maior de se implantar fora da cavidade endometrial (cerca de 1 em cada 2 a 5 gestações que ocorrem com DIU são ectópicas).<br>
<em>Análise dos distratores:</em><br>
A: Errada, pois o DIU não aumenta o risco absoluto de gravidez; a retirada precipitada do DIU sem avaliar a localização da gestação não é conduta prioritária e não afeta a acurácia do ultrassom.<br>
C: Errada, pois teste de gravidez positivo com sangramento em usuária de DIU é suspeita primária de gestação ectópica.<br>
D: Errada, pois prescrever antibióticos e dar alta sem ultrassonografia e &beta;-hCG expõe a paciente a risco iminente de rotura tubária e óbito.<br>
E: Errada, pois até 50% das pacientes com gestação ectópica não apresentam qualquer fator de risco conhecido.</p>

<h3>Questão 2 (Residência Médica / USP)</h3>
<p>Primigesta de 24 anos com queixa de dor pélvica discreta e sangramento vaginal escasso realiza ultrassonografia transvaginal que evidencia endométrio espessado (12 mm) sem saco gestacional intrauterino e sem evidência conclusiva de massas anexiais. O &beta;-hCG quantitativo sérico na admissão é de 850 mUI/mL. A paciente encontra-se assintomática no momento da reavaliação, normotensa e sem queixas álgicas. Assinale a conduta inicial mais apropriada para o caso:</p>
<p><strong>A)</strong> Indicar curetagem uterina esvaziadora imediata para diferenciar abortamento de doença trofoblástica gestacional.<br>
<strong>B)</strong> Prescrever metotrexato na dose de 50 mg/m² por via intramuscular imediatamente, pois a cavidade uterina vazia confirma gravidez ectópica.<br>
<strong>C)</strong> Indicar videolaparoscopia diagnóstica de urgência para salpingostomia bilateral profilática.<br>
<strong>D)</strong> Classificar o caso como gestação de localização desconhecida (PUL), orientar sinais de alerta e repetir o &beta;-hCG quantitativo sérico em 48 horas.<br>
<strong>E)</strong> Solicitar tomografia computadorizada de pelve com contraste para localizar o saco gestacional.</p>
<p><strong>Gabarito Comentado:</strong></p>
<p><strong>Alternativa D está CORRETA.</strong> A paciente apresenta critérios clássicos de <em>Pregnancy of Unknown Location (PUL)</em> com estabilidade clínica e &beta;-hCG sérico abaixo da zona discriminatória habitual (1.500 a 2.000 mUI/mL). Nesta faixa de valores, é perfeitamente biológico que uma gestação intrauterina normal e saudável ainda não tenha dimensões suficientes para gerar imagem anecoica de saco gestacional ao ultrassom. A conduta mandatória consiste no acompanhamento expectante ambulatorial, repetindo a dosagem de &beta;-hCG após 48 horas para avaliar a curva de elevação.<br>
<em>Análise dos distratores:</em><br>
A e B: Absurdamente incorretas e iatrogênicas. Realizar curetagem ou aplicar metotrexato neste momento provocaria a interrupção deliberada e inadvertida de uma gestação intrauterina tópica viável.<br>
C: Laparoscopia é invasiva e desnecessária na ausência de sintomas ou instabilidade.<br>
E: A TC de pelve emite radiação ionizante teratogênica e possui resolução espacial infinitamente inferior à ultrassonografia transvaginal para anexos e endométrio.</p>

<h3>Questão 3 (Residência Médica / UNIFESP)</h3>
<p>Mulher de 30 anos com gestação ectópica tubária à direita diagnosticada por ultrassonografia transvaginal (massa anexial de 2,8 cm de diâmetro, sem BCF visível e sem líquido livre em pelve) e &beta;-hCG sérico basal de 3.200 mUI/mL no Dia 1 (D1) foi tratada com Metotrexato em dose única de 50 mg/m² IM. No Dia 4 (D4), a paciente retorna assintomática e seu &beta;-hCG é de 3.750 mUI/mL. No Dia 7 (D7), o novo &beta;-hCG sérico é de 2.900 mUI/mL. Considerando a farmacocinética do fármaco e os critérios de resposta laboratorial de Stovall, qual é a interpretação correta e a conduta recomendada?</p>
<p><strong>A)</strong> Houve falha do tratamento porque o &beta;-hCG aumentou no D4 em relação ao D1; indicar laparoscopia de urgência.<br>
<strong>B)</strong> O tratamento foi bem-sucedido, pois houve queda de 22,6% nos níveis de &beta;-hCG entre o D4 e o D7 (&ge; 15%); manter seguimento ambulatorial com dosagens semanais de &beta;-hCG até negativação.<br>
<strong>C)</strong> Houve resposta inadequada, pois a queda entre o D1 e o D7 foi inferior a 15%; administrar imediatamente uma segunda dose de metotrexato.<br>
<strong>D)</strong> A paciente desenvolveu resistência trofoblástica ao metotrexato; indicar curetagem uterina com aspiração manual intrauterina.<br>
<strong>E)</strong> Suspender o seguimento clínico, pois qualquer queda no D7 comprova a cura definitiva da gestação ectópica, não necessitando de novas dosagens.</p>
<p><strong>Gabarito Comentado:</strong></p>
<p><strong>Alternativa B está CORRETA.</strong> A análise da resposta ao metotrexato no protocolo de dose única de Stovall avalia <strong>estritamente a variação percentual entre o Dia 4 e o Dia 7</strong>, desconsiderando o aumento inicial do D4 (que é fisiológico e esperado em virtude da lise do sinciciotrofoblasto). O cálculo é: $\frac{3.750 - 2.900}{3.750} \times 100 = \frac{850}{3.750} \times 100 = 22,67\%$. Como a queda foi &ge; 15%, o ciclo foi eficaz e a paciente deve prosseguir em seguimento semanal de &beta;-hCG até níveis indetectáveis (&lt; 5 mUI/mL).<br>
<em>Análise dos distratores:</em><br>
A: Errada, pois o aumento entre D1 e D4 não caracteriza falha.<br>
C: Errada, pois a métrica oficial compara D4 com D7, e não D1 com D7.<br>
D: Incorreta, curetagem não trata trofoblasto alojado na tuba uterina.<br>
E: Errada, pois a suspensão precoce do seguimento antes da negativação expõe a paciente a risco de rotura por trofoblasto remanescente.</p>

<h3>Questão 4 (Residência Médica / SUS-SP)</h3>
<p>Durante a realização de videolaparoscopia por gestação ectópica ampolar íntegra em mulher de 27 anos, nuligesta, com forte desejo reprodutivo futuro e portadora de hidrossalpinge grave com oclusão fímbrica na tuba contralateral, o cirurgião opta pela realização de salpingostomia linear conservadora. A respeito dos cuidados pós-operatórios específicos inerentes a essa técnica, assinale a assertiva correta:</p>
<p><strong>A)</strong> A paciente não necessita de qualquer controle laboratorial de &beta;-hCG no pós-operatório, pois a remoção macroscópica do concepto garante 100% de cura clínica.<br>
<strong>B)</strong> O risco de persistência trofoblástica na tuba operada varia de 5% a 15%, sendo obrigatória a monitorização seriada semanal de &beta;-hCG até valores negativos.<br>
<strong>C)</strong> A incisão da salpingostomia na borda antimesentérica deve ser obrigatoriamente fechada com sutura contínua em três planos para evitar fístulas tuboperitoneais.<br>
<strong>D)</strong> Caso o &beta;-hCG entre em platô no pós-operatório, a única conduta permitida pelas diretrizes cirúrgicas é a reoperação imediata para salpingectomia total.<br>
<strong>E)</strong> A salpingostomia linear apresenta risco significativamente menor de prenhez ectópica recorrente futura na mesma tuba do que a salpingectomia total.</p>
<p><strong>Gabarito Comentado:</strong></p>
<p><strong>Alternativa B está CORRETA.</strong> A principal desvantagem da cirurgia conservadora (salpingostomia) em relação à radical (salpingectomia) é o risco de retenção de tecido trofoblástico viável profundamente infiltrado na muscular tubária (prenhez ectópica persistente), que incide em cerca de 5% a 15% das salpingostomias. Por isso, a monitorização semanal de &beta;-hCG pós-operatório é indispensável até a negativação completa.<br>
<em>Análise dos distratores:</em><br>
A: Totalmente errada e perigosa pelo risco de sangramento tardio por trofoblasto persistente.<br>
C: Errada, a borda da salpingostomia linear deve cicatrizar por segunda intenção; a sutura da tuba provoca isquemia, fibrose e oclusão do lúmen.<br>
D: Errada, o tratamento de escolha para o trofoblasto persistente em paciente estável é clínico com Metotrexato sistêmico.<br>
E: Errada, a salpingectomia remove toda a tuba, tendo risco ZERO de ectópica ipsilateral, enquanto a salpingostomia mantém a tuba doente com risco aumentado de nova nidação ectópica.</p>

<h3>Questão 5 (Residência Médica / ENARE)</h3>
<p>Qual das seguintes localizações anatômicas de gestação ectópica caracteriza-se por permitir o desenvolvimento do concepto até idades gestacionais mais avançadas (frequentemente entre 8 e 16 semanas) em decorrência da espessura muscular miometrial que a envolve, mas que, ao romper-se, provoca sangramento catastrófico fulminante por lesão simultânea de ramos calibrosos das artérias uterina e ovariana?</p>
<p><strong>A)</strong> Gestação ectópica ístmica.<br>
<strong>B)</strong> Gestação ectópica ampolar.<br>
<strong>C)</strong> Gestação ectópica intersticial (cornual).<br>
<strong>D)</strong> Gestação ectópica fímbrica.<br>
<strong>E)</strong> Gestação ectópica cervical.</p>
<p><strong>Gabarito Comentado:</strong></p>
<p><strong>Alternativa C está CORRETA.</strong> A gestação intersticial (popularmente denominada cornual) desenvolve-se no segmento intramural da tuba uterina que atravessa o miométrio do corno uterino. O miométrio oferece suporte mecânico e vascularização abundante, permitindo que a gestação cresça até o final do primeiro trimestre ou início do segundo trimestre (8 a 16 semanas). Quando ocorre a rotura, ela secciona a arcada anastomótica entre a artéria uterina e a artéria ovariana, gerando choque hemorrágico hiperagudo e altíssima taxa de mortalidade materna se não abordada prontamente por laparotomia.<br>
<em>Análise dos distratores:</em><br>
A: A ístmica rompe-se muito precocemente (5 a 7 semanas) pelo lúmen estreito.<br>
B: A ampolar é a mais comum (80%) e rompe-se geralmente entre 6 e 8 semanas.<br>
D: A fímbrica habitualmente evolui para abortamento tubário para o peritônio.<br>
E: A cervical cursa com hemorragia vaginal indolor vultosa em aspecto de barril, sem envolvimento do miométrio cornual.</p>

<h3>Questão 6 (Residência Médica / AMRIGS)</h3>
<p>Paciente de 25 anos, primigesta, Rh negativo com Coombs indireto negativo, é admitida com diagnóstico de gestação ectópica tubária íntegra de 6 semanas, sendo submetida com sucesso ao tratamento com dose única de Metotrexato. Sobre a conduta profilática para a isoimunização Rh(D) e orientações contraceptivas desta paciente, assinale a opção correta:</p>
<p><strong>A)</strong> A profilaxia com imunoglobulina anti-D está contraindicada quando se utiliza metotrexato devido ao risco de imunossupressão grave.<br>
<strong>B)</strong> A imunoglobulina anti-D deve ser administrada na dose de 50 a 150 &mu;g (ou 300 &mu;g) por via intramuscular, e a paciente deve ser orientada a evitar nova gestação por no mínimo 3 a 6 meses.<br>
<strong>C)</strong> A profilaxia só deve ser realizada se a paciente for submetida a procedimento cirúrgico aberto, sendo desnecessária no tratamento clínico.<br>
<strong>D)</strong> A paciente pode tentar nova gestação imediatamente após a negativação do &beta;-hCG, pois o metotrexato é totalmente eliminado do organismo em 24 horas.<br>
<strong>E)</strong> Não há indicação de imunoprofilaxia no primeiro trimestre, devendo ser aguardada a 28ª semana de uma gestação futura.</p>
<p><strong>Gabarito Comentado:</strong></p>
<p><strong>Alternativa B está CORRETA.</strong> Toda paciente Rh negativo não sensibilizada (Coombs indireto negativo) com sangramento de primeiro trimestre ou gestação ectópica (independentemente de ter sido tratada cirurgicamente ou clinicamente com MTX) deve receber imunoglobulina humana anti-D em até 72 horas para prevenir a aloimunização Rh(D). Além disso, devido aos potenciais efeitos teratogênicos e à permanência tecidual hepática prolongada do metotrexato, é mandatório prescrever contracepção eficaz por pelo menos 3 a 6 meses antes de autorizar nova gravidez.<br>
<em>Análise dos distratores:</em><br>
A e C: Incorretas, pois o MTX não contraindica a imunoglobulina e a conduta medicamentosa também exige profilaxia.<br>
D: Incorreta, pois o MTX permanece nos tecidos hepáticos e renais por meses, havendo alto risco de malformações congênitas graves (síndrome metotrexato fetal) se a concepção ocorrer precocemente.<br>
E: Incorreta, a profilaxia no sangramento da primeira metade da gestação é recomendação formal consolidada pelo Ministério da Saúde e FEBRASGO.</p>
`
    }
  ],
  references: [
    {
      title: 'FEBRASGO — Protocolo de Gestação Ectópica e Gestação de Localização Desconhecida',
      url: 'https://www.febrasgo.org.br'
    },
    {
      title: 'NICE NG126 — Ectopic pregnancy and miscarriage: diagnosis and initial management',
      url: 'https://www.nice.org.uk/guidance/ng126'
    },
    {
      title: 'ACOG Practice Bulletin No. 193 — Tubal Ectopic Pregnancy',
      url: 'https://www.acog.org'
    },
    {
      title: 'RCOG Green-top Guideline No. 21 — Diagnosis and Management of Ectopic Pregnancy',
      url: 'https://www.rcog.org.uk'
    },
    {
      title: 'Ministério da Saúde do Brasil — Manual de Gestação de Alto Risco e Urgências Obstétricas',
      url: 'https://www.gov.br/saude'
    }
  ]
};

const chars = saveBook(book049);
console.log(`[CONCLUIDO] Aula 049 - Gestacao Ectopica gravada com ${chars} caracteres uteis.`);
