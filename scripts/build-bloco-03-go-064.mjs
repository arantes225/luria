import { saveBook } from './bloco-03-utils.mjs';

const book064 = {
  slug: 'placenta-previa-e-descolamento-prematuro-de-placenta',
  title: 'Placenta Prévia e Descolamento Prematuro de Placenta',
  area: 'Ginecologia e Obstetrícia',
  materia: 'Obstetrícia e Tococirurgia',
  description: 'Tratado monográfico aprofundado sobre as duas maiores causas de hemorragia anteparto e mortalidade materna no terceiro trimestre: Placenta Prévia (PP) e Descolamento Prematuro de Placenta (DPP). Inclui: definições ultrassonográficas modernas (PP vs Inserção Baixa com corte de 20 mm), migração placentária fisiológica por trofotropismo, semiologia das quatro características clássicas, proibição categórica do toque vaginal digital, espectro do acretismo placentário (Acreta, Increta e Percreta) associado a cesáreas prévias, técnica cirúrgica multidisciplinar da histerectomia puerperal com placenta in situ e controle vascular intervencionista; fisiopatologia molecular do DPP, vasculopatia decidual e aterose aguda na pré-eclâmpsia, descompressão súbita e uso de cocaína/crack, cascata de tromboplastina tecidual e CIVD com hipofibrinogenemia precoce, classificação anatomoclínica de Sher (Graus 1 a 3B), conduta na dicotomia feto vivo (cesariana imediata) vs feto morto (parto vaginal com amniotomia precoce e crioprecipitado), manejo conservador escalonado do Útero de Couvelaire (suturas de B-Lynch e ligaduras vasculares), casos clínicos práticos e questões de residência médica comentadas.',
  sections: [
    {
      id: 'introducao-impacto-perinatal-epidemiologia',
      title: '1. Introdução, Epidemiologia Crítica e Impacto na Mortalidade Materno-Fetal',
      body_html: `
<h3>Magnitude do Problema na Tococirurgia e Obstetrícia Contemporânea</h3>
<p>Dentre as etiologias hemorrágicas da segunda metade da gestação, o <strong>Descolamento Prematuro de Placenta (DPP)</strong> e a <strong>Placenta Prévia (PP)</strong> respondem em conjunto por mais de <strong>80% a 85% de todas as internações obstétricas de urgência por sangramento anteparto</strong>. Tratam-se de afecções potencialmente devastadoras que sobrecarregam os leitos de terapia intensiva obstétrica e neonatal, exigindo do obstetra agilidade decisória, rigor técnico cirúrgico e domínio da fisiologia hemostática.</p>
<p>Epidemiologicamente, guardam particularidades determinantes:</p>
<ul>
  <li><strong>Descolamento Prematuro de Placenta:</strong> Incide em <strong>0,5% a 1,2% de todas as gestações</strong> (aproximadamente 1 em cada 100 a 150 partos). Apesar dos avanços em terapia intensiva, permanece como a <em>causa obstétrica individual mais associada a óbito fetal intrauterino agudo</em> (letalidade perinatal de 15% a 30%) e a principal causa de Coagulação Intravascular Disseminada (CIVD) grave com hipofibrinogenemia fulminante no ciclo gravídico-puerperal;</li>
  <li><strong>Placenta Prévia e Espectro de Acretismo:</strong> A placenta prévia ocorre em aproximadamente <strong>0,3% a 0,5% das gestações a termo</strong> (1 em cada 200 a 300 partos). Sua incidência absoluta vem crescendo vertiginosamente nas últimas três décadas em todo o mundo ocidental, impulsionada diretamente pela <em>epidemia cesarista global</em>, pelo aumento da idade materna no primeiro parto e pela disseminação das técnicas de fertilização <em>in vitro</em>. A combinação de placenta prévia sobre uma cicatriz uterina prévia estabelece o maior fator de risco para o <strong>Espectro do Acretismo Placentário (PAS — Placenta Accreta Spectrum)</strong>, patologia cirúrgica de morbidade extrema historicamente associada a perdas sanguíneas volumosas (média de 3.000 a 5.000 mL) e necessidade de histerectomia puerperal de urgência.</li>
</ul>
`
    },
    {
      id: 'placenta-previa-definicao-classificacao-moderna',
      title: '2. Placenta Prévia: Definições Ultrassonográficas Padronizadas e Trofotropismo',
      body_html: `
<h3>A Nomenclatura Padronizada Contemporânea</h3>
<p>Historicamente, a literatura obstétrica utilizava termos vagos e imprecisos como "placenta prévia total", "parcial", "marginal" e "lateral", frequentemente definidos por palpação digital transvaginal às cegas (método proscrito e perigoso). Com a consolidação da ultrassonografia transvaginal de alta frequência no pré-natal, as diretrizes internacionais da <em>Society for Maternal-Fetal Medicine (SMFM)</em>, do <em>Royal College of Obstetricians and Gynaecologists (RCOG)</em> e da <em>FEBRASGO</em> unificaram e padronizaram os critérios diagnósticos baseados na mensuração milimétrica da distância entre a borda placentária inferior e o orifício interno do colo uterino (OIC):</p>

<table class="book-table">
  <thead>
    <tr>
      <th>Classificação Ultrassonográfica Atual</th>
      <th>Critério Anatômico Mensurado pela USTV (após 20 Semanas)</th>
      <th>Implicação Clínica e Planejamento da Via de Parto</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>Placenta Prévia (Definitiva)</strong></td>
      <td>O tecido placentário recobre total ou parcialmente o orifício interno do colo uterino, ou a sua borda inferior atinge exatamente a margem interna do colo (<strong>Distância borda-OIC = 0 mm</strong>).</td>
      <td><strong>Contraindicação absoluta ao parto vaginal!</strong> O tecido placentário funcionante obstrui mecanicamente a descida da apresentação fetal. A tentativa de dilatação cervical provocaria a separação dos cotilédones com hemorragia materna exsanguinante imediata. <strong>Indicação formal de Cesariana Eletiva planejada entre 36+0 e 37+6 semanas</strong> em pacientes assintomáticas estáveis.</td>
    </tr>
    <tr>
      <td><strong>Placenta de Inserção Baixa</strong></td>
      <td>A borda placentária inferior localiza-se no segmento inferior do útero a uma distância <strong>entre 1 e 20 mm (0,1 a 2,0 cm) do orifício interno do colo uterino</strong>, aproximando-se do colo mas sem cobri-lo.</td>
      <td><strong>Permite-se a tentativa individualizada de parto vaginal monitorizado</strong>, especialmente se a borda placentária encontrar-se a mais de 10 a 20 mm do OIC no início do trabalho de parto e a paciente for multípara. A apresentação cefálica insinuada atua como um tampão mecânico direto ("compressão por tamponamento"), contendo pequenos sangramentos marginais. Todavia, a equipe cirúrgica e reserva hemostática devem estar de prontidão imediata caso surja sangramento com a dilatação.</td>
    </tr>
    <tr>
      <td><strong>Placenta Normoinserida</strong></td>
      <td>A borda placentária inferior localiza-se a uma distância <strong>superior a 20 mm (&gt; 2,0 cm) do orifício interno do colo</strong>.</td>
      <td>Placenta tópica anatômica perfeitamente normal; evolução obstétrica convencional e via de parto por indicação obstétrica habitual.</td>
    </tr>
  </tbody>
</table>

<h3>Fisiopatologia da Migração Placentária e Trofotropismo</h3>
<p>O conceito de <strong>migração placentária fisiológica</strong> (ou trofotropismo) explica por que a imensa maioria dos diagnósticos precoces de placenta baixa identificados no segundo trimestre resolve-se espontaneamente até o nascimento:</p>
<ul>
  <li>No exame morfológico de rotina realizado entre 18 e 22 semanas de gestação, cerca de <strong>3% a 6% das gestantes</strong> apresentam placentas no segmento inferior aproximando-se do colo uterino;</li>
  <li>Contudo, <strong>mais de 90% a 95% dessas placentas estarão normoinseridas (&gt; 20 mm do OIC) na 32ª a 36ª semana de gestação</strong>;</li>
  <li><strong>Mecanismo Biológico:</strong> A placenta humana em desenvolvimento possui tropismo positivo (crescimento orientado) em direção às áreas miometriais de maior aporte sanguíneo e oxigenação tecidual (o fundo e corpo uterinos). Simultaneamente, o segmento inferior do útero (istmo) começa a sofrer alongamento e estiramento longitudinal passivo acelerado a partir da 24ª semana, "afastando" a inserção placentária do polo inferior em direção ao fundo;</li>
  <li><strong>Regra Propedêutica:</strong> O laudo de "placenta prévia" emitido antes de 20 a 24 semanas de gestação deve ser classificado provisoriamente apenas como <em>placenta de implantação baixa de segundo trimestre</em>. Recomenda-se agendar <strong>ultrassonografia transvaginal seriada com 32 semanas</strong> para reavaliação definitiva da migração. Se a borda placentária anterior recobrir o OIC por mais de 25 mm na 20ª semana, a chance de persistência como placenta prévia a termo ultrapassa 80% a 90%.</li>
</ul>
`
    },
    {
      id: 'placenta-previa-semiologia-tetrade-toque-proibido',
      title: '3. Placenta Prévia: A Tétrade Clínica das "4 Características" e a Proibição do Toque',
      body_html: `
<h3>Quadro Clínico Cardinal: A Tétrade Mnemônica</h3>
<p>O quadro clínico clássico da placenta prévia manifesta-se de forma inconfundível quando analisado pelas quatro características semiológicas fundamentais:</p>
<ol>
  <li><strong>Indolor:</strong> A perda sanguínea não decorre de traumatismo miometrial ou de descolamento de grandes hematomas hipertensivos. Ocorre pelo simples descolamento mecânico passivo da margem placentária adelgaçada em virtude da formação das contrações fisiológicas indolores de Braxton-Hicks e distensão do segmento inferior. O abdome materno apresenta-se indolor à palpação e não há irritabilidade miometrial;</li>
  <li><strong>Espontâneo:</strong> O sangramento inicia-se subitamente na ausência de qualquer fator precipitante evidente, ocorrendo classicamente durante a noite ou nas primeiras horas da manhã, com a paciente em repouso absoluto no leito ("a paciente acorda inundada em sangue");</li>
  <li><strong>Vermelho-Vivo (Rutilante):</strong> O sangue extravasado provém diretamente dos ramos terminais da circulação arterial uterina que irrigam o espaço interviloso do segmento inferior. É sangue oxigenado arterial fresco, fluido e desprovido de coágulos envelhecidos escuros;</li>
  <li><strong>Recorrente (Repetitivo):</strong> É o sinal evolutivo mais marcante. O primeiro episódio de sangramento é tipicamente precoce (entre 28 e 32 semanas), de pequeno a moderado volume, cessando espontaneamente com o repouso no leito. Todavia, episódios subsequentes repetem-se ao longo das semanas, em intervalos progressivamente mais curtos e com perdas hemáticas progressivamente mais vultosas.</li>
</ol>

<h3>Exame Físico Geral e Obstétrico na Placenta Prévia</h3>
<ul>
  <li><strong>Tônus Uterino:</strong> Estritamente <strong>NORMAL</strong>. Entre as contrações fisiológicas esporádicas, o útero permanece totalmente flácido, elástico e depressível à palpação ("útero macio");</li>
  <li><strong>Estática Fetal:</strong> Alta frequência de <strong>apresentações fetais anômalas</strong> (apresentação pélvica em 20% a 25% dos casos, situação transversa ou oblíqua). Como a placenta volumosa ocupa o segmento inferior e o estreito superior da bacia materna, ela impede a insinuação cefálica fisiológica da apresentação;</li>
  <li><strong>Vitalidade Fetal:</strong> A cardiotocografia basal revela <strong>frequência cardíaca fetal normal (110 a 160 bpm) e padrão reativo preservado</strong> nos episódios iniciais. Ao contrário do DPP, não há descolamento maciço do centro da placenta; a oxigenação fetal só é comprometida caso a mãe entre em choque hipovolêmico descompensado.</li>
</ul>

<h3>A Proibição Categórica do Toque Vaginal Digital</h3>
<div style="border-left: 4px solid #d9534f; padding: 10px 15px; margin: 15px 0; background-color: #fdf7f7;">
<h4 style="color: #d9534f; margin-top: 0;">ALERTA CIRÚRGICO CRÍTICO — PROIBIÇÃO ABSOLUTA</h4>
<p><strong>NUNCA realizar exame de toque vaginal digital em gestante com sangramento na segunda metade antes de afastar formalmente a placenta prévia por ultrassonografia!</strong></p>
<p>A penetração inadvertida do dedo examinador através do colo dilatado ou entreaberto perfura ou desseca a esponja vascular placentária que recobre o orifício interno. O trauma mecânico direto rompe as arteríolas deciduais e os lagos venosos, transformando uma perda discreta em uma <strong>hemorragia exsanguinante fulminante de 1.000 a 2.000 mL em segundos</strong>. O exame de escolha para avaliação ginecológica é o <strong>exame especular gentil</strong> com espéculo estéril lubrificado com soro, permitindo confirmar a saída de sangue pelo canal cervical e afastar sangramentos locais da vagina e ectocérvice.</p>
</div>
`
    },
    {
      id: 'espectro-acretismo-placentario-pas',
      title: '4. Espectro do Acretismo Placentário (PAS): Classificação, Fatores de Risco e Diagnóstico',
      body_html: `
<h3>Conceito e Fisiopatologia da Invasão Trofoblástica Iatrogênica</h3>
<p>O <strong>Espectro do Acretismo Placentário (PAS — Placenta Accreta Spectrum)</strong>, outrora denominado genericamente de placenta acreta, compreende um espectro patológico de adesão e invasão trofoblástica patológica e profunda das vilosidades coriônicas no interior do miométrio uterino, decorrente da ausência congênita ou adquirida da <strong>camada basal da decídua (decídua de Nitabuch)</strong>.</p>
<p>Quando a decídua esponjosa é lesada ou destruída por incisões uterinas prévias (histerotomia de cesarianas, miomectomias transmurais, curetagens repetidas para esvaziamento uterino ou embolização de artérias uterinas), o sinciciotrofoblasto e o trofoblasto extraviloso invasor não encontram a barreira celular reguladora natural, proliferando e infiltrando-se diretamente entre as fibras miometriais e seus eixos vasculares calibrosos.</p>

<h3>Classificação Histopatológica Clássica das Formas de Acretismo</h3>
<table class="book-table">
  <thead>
    <tr>
      <th>Grau Histopatológico</th>
      <th>Frequência Relativa</th>
      <th>Profundidade da Invasão Vilositária e Relação Anatômica</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>Placenta Acreta (Verdadeira ou Aderente)</strong></td>
      <td><strong>75% a 80%</strong></td>
      <td>As vilosidades coriônicas fixam-se diretamente sobre o miométrio superficial na ausência da decídua basal, <em>sem invadir a intimidade das fibras musculares miometriais</em>. Não há plano de clivagem natural para a dequitação espontânea.</td>
    </tr>
    <tr>
      <td><strong>Placenta Increta</strong></td>
      <td><strong>15% a 18%</strong></td>
      <td>As vilosidades coriônicas e o tecido trofoblástico <em>invadem profundamente a espessura da camada muscular do miométrio</em>, alcançando até a metade ou dois terços da parede miometrial uterina.</td>
    </tr>
    <tr>
      <td><strong>Placenta Percreta</strong></td>
      <td><strong>5% a 7%</strong></td>
      <td>As vilosidades coriônicas <em>atravessam completamente toda a espessura da parede miometrial, perfuram a serosa peritoneal uterina</em> e invadem diretamente estruturas e órgãos pélvicos adjacentes, prioritariamente a <strong>parede posterior da bexiga urinária (assoalho vesical)</strong>, o paramétrio, a fáscia retovaginal e os vasos ilíacos.</td>
    </tr>
  </tbody>
</table>

<h3>A Combinação Explosiva: Placenta Prévia + Cesárea Anterior</h3>
<p>O principal fator de risco epidemiológico para o desenvolvimento do espectro do acretismo placentário é a <strong>associação concomitante de placenta prévia e cicatriz de cesárea prévia</strong>. O risco relativo eleva-se geometricamente com o número cumulativo de histerotomias anteriores:</p>
<ul>
  <li>Em gestante com <em>Placenta Prévia SEM cesárea prévia</em>: Risco de acretismo é de <strong>1% a 3%</strong>;</li>
  <li>Em gestante com <em>Placenta Prévia + 1 cesárea prévia</em>: O risco de acretismo salta para <strong>10% a 14%</strong>;</li>
  <li>Em gestante com <em>Placenta Prévia + 2 cesáreas prévias</em>: O risco de acretismo atinge <strong>25% a 40%</strong>;</li>
  <li>Em gestante com <em>Placenta Prévia + 3 ou mais cesáreas prévias</em>: O risco de acretismo ultrapassa <strong>50% a 65%</strong>!</li>
</ul>

<h3>Achados Ultrassonográficos no Doppler Colorido e Ressonância Magnética</h3>
<p>O diagnóstico antenatal do acretismo é indispensável para organizar o parto eletivo com equipe multidisciplinar em centro terciário. Os sinais ultrassonográficos sugestivos incluem:</p>
<ol>
  <li><strong>Presença de Lacunas Placentárias Anormais ("Lagos Vasculares"):</strong> Múltiplas áreas vasculares anecoicas irregulares de contornos bizarros no parênquima placentário, exibindo fluxo sanguíneo turbulento de alta velocidade ao Doppler colorido ("aspecto em queijo suíço");</li>
  <li><strong>Perda da Zona Hiperecogênica Miometrial Retroplacentária ("Clear Zone"):</strong> Desaparecimento do espaço hipoecoico normal que separa a placenta do miométrio subjacente;</li>
  <li><strong>Adelgaçamento Extremo do Miométrio Retroplacentário:</strong> Espessura miometrial inferior a 1,0 mm subjacente à placenta no segmento inferior;</li>
  <li><strong>Hipervascularização Caótica na Interface Bexiga-Miométrio:</strong> Vasos tortuosos calibrosos cruzando a parede miometrial em direção à mucosa vesical com pontes vasculares contínuas (sinal patognomônico de placenta percreta com invasão vesical);</li>
  <li><strong>Ressonância Magnética (RM) Pélvica:</strong> Indicada principalmente nos casos de placenta posterior (onde o ultrassom sofre atenuação sônica) e para mapear com extrema precisão a profundidade de invasão vesical e paramedial da placenta percreta antes da incisão cirúrgica.</li>
</ol>
`
    },
    {
      id: 'manejo-cirurgico-acretismo-histerectomia',
      title: '5. Manejo Cirúrgico do Acretismo: Equipe Multidisciplinar e Cesárea com Placenta in Situ',
      body_html: `
<h3>O Princípio Cirúrgico Universal: NÃO TENTAR DESCOLAR A PLACENTA ACRETA</h3>
<p>O maior erro que um cirurgião obstetra pode cometer diante de uma placenta acreta é tentar forçar a dequitação manual dos cotilédones aderidos. Como as vilosidades estão inseridas diretamente nas artérias miometriais sem o leito da decídua basal, a tração forçada do cordão umbilical ou a clivagem digital arranca o miométrio, abrindo dezenas de seios vasculares de alto fluxo que sangram a taxas superiores a 500 a 1.000 mL por minuto, precipitando parada cardíaca e morte materna na mesa cirúrgica em menos de 10 minutos.</p>

<h3>Protocolo Cirúrgico Padrão-Ouro para Placenta Prévia Acreta</h3>
<p>O manejo contemporâneo do acretismo placentário exige planejamento cirúrgico eletivo rigoroso e execução protocolada:</p>
<ol>
  <li><strong>Planejamento do Parto Eletivo com 34+0 a 35+6 Semanas:</strong>
    <p>O parto cesáreo deve ser agendado eletivamente antes do início do trabalho de parto ou sangramento espontâneo, após ciclo completo de corticoterapia antenatal (Betametasona 12 mg IM em duas doses com intervalo de 24 horas);</p>
  </li>
  <li><strong>Estrutura Hospitalar Terciária e Equipe Multidisciplinar Dedicada:</strong>
    <p>A cirurgia deve ser realizada em hospital com UTI adulta, banco de sangue com capacidade de ativação imediata de transfusão maciça e equipe cirúrgica composta por: 2 obstetras experientes, 1 ginecologista oncológico ou cirurgião pélvico avançado, 1 urologista (para cateterização preventiva pré-operatória de ureteres com cateter duplo J), radiologista intervencionista e anestesiologista habilitado em monitorização invasiva contínua;</p>
  </li>
  <li><strong>Via de Acesso Abdominal Ampla:</strong>
    <p>Incisão laparotômica mediana infraumbilical ampla (com extensão supraumbilical contornando a cicatriz umbilical se necessário) para permitir ampla exposição do retroperitônio e vasos ilíacos;</p>
  </li>
  <li><strong>Histerotomia Corporal Fúndica Alta (Longe da Placenta):</strong>
    <p>O cirurgião realiza a incisão miometrial no <strong>fundo uterino ou corpo alto</strong>, em uma área completamente livre de tecido placentário (previamente mapeada por ultrassom intraoperatório transdérmico). O concepto é extraído rapidamente pelo fundo;</p>
  </li>
  <li><strong>Clampeamento Rápido do Cordão e Histerorrafia Rápida com Placenta in Situ:</strong>
    <p>O cordão umbilical é ligado rente à sua inserção placentária e devolvido à cavidade uterina. <strong>A placenta NÃO é tocada, nem tracionada, nem descolada!</strong> A incisão fúndica miometrial é rapidamente suturada com pontos contínuos de hemostasia para evitar sangramentos adicionais;</p>
  </li>
  <li><strong>Histerectomia Puerperal com Placenta in Situ (Cirurgia Definitiva):</strong>
    <p>Prossegue-se imediatamente para a realização da <strong>Histerectomia Total Abdominal com a placenta retida intacta dentro do útero</strong>. A dissecção é realizada de forma retroperitoneal cuidadosa, isolando os ureteres bilateralmente e ligando as artérias uterinas em sua origem e os vasos do ligamento largo;</p>
  </li>
  <li><strong>Manejo da Invasão Vesical na Placenta Percreta:</strong>
    <p>Caso haja invasão da parede vesical posterior, não se deve tracionar a serosa. O urologista realiza a ressecção parcial cuneiforme da parede vesical infiltrada em monobloco com o útero, procedendo à reconstrução e rafia vesical primária em dois planos com drenagem vesical por 14 a 21 dias;</p>
  </li>
  <li><strong>Controle Vascular Intervencionista Pré-Operatório:</strong>
    <p>Em centros de excelência, o radiologista intervencionista realiza a introdução profilática de <strong>cateteres com balão oclusivo temporário nas artérias ilíacas internas (hipogástricas) ou na aorta abdominal infra-renal</strong> antes da cesariana. Durante a histerectomia, os balões são insuflados temporariamente, interrompendo o fluxo pélvico e permitindo uma dissecção operatória em campo cirúrgico praticamente exangue.</p>
  </li>
</ol>
`
    },
    {
      id: 'dpp-fisiopatologia-vasculopatia-tromboplastina',
      title: '6. Descolamento Prematuro de Placenta (DPP): Fisiopatologia e Cascata de CIVD',
      body_html: `
<h3>Fisiopatologia da Lesão Vascular Decidual e Formação do Hematoma</h3>
<p>O <strong>Descolamento Prematuro de Placenta (DPP)</strong> é a separação intempestiva e extemporânea da placenta normalmente inserida no corpo uterino, ocorrendo em gestações de 20 ou mais semanas completas antes da expulsão do concepto.</p>
<p>A sequência patogênica primária desenrola-se da seguinte maneira:</p>
<ol>
  <li><strong>Vasculopatia Materna Decidual:</strong> Em mais de 50% a 60% das pacientes, o evento inicial é uma alteração intrínseca das artérias espiraladas da decídua basal decorrente de hipertensão arterial crônica ou pré-eclâmpsia. Essas arteríolas apresentam endarterite obliterante, aterose aguda, necrose fibrinoide e fragilidade endotelial extrema;</li>
  <li><strong>Ruptura Arterial e Formação do Hematoma Retroplacentário:</strong> A ruptura espontânea de um vaso sob alta pressão gera uma coleção de sangue arterial na interface decidua-miométrio. Com a expansão do hematoma, ocorre a clivagem dissecante e a separação progressiva da placa basal placentária do miométrio subjacente;</li>
  <li><strong>Isquemia Placentária e Asfixia Fetal Fulminante:</strong> À medida que a placenta é descolada, a área funcional de vilosidades em contato com a circulação materna decai criticamente. Um descolamento superior a <strong>30% a 50% da área placentária</strong> resulta invariavelmente em sofrimento fetal agudo grave; descolamentos &gt; 50% cursam com asfixia fetal intraútero irreversível e óbito fetal;</li>
  <li><strong>A Dinâmica do Sangramento Externo vs Oculto:</strong>
    <ul>
      <li><strong>Sangramento Externo (80% dos casos):</strong> O sangue disseca entre a parede uterina e as membranas corioamnióticas, escapando pelo canal endocervical para a vagina na forma de sangue vermelho-escuro com coágulos;</li>
      <li><strong>Sangramento Oculto (20% dos casos):</strong> O hematoma permanece estritamente retido atrás da placenta. Ocorre frequentemente quando a placenta é fúndica, as margens placentárias permanecem aderidas, o sangue extravasa para o interior da cavidade amniótica (líquido hemotócico ou "em vinho do Porto") ou a cabeça fetal encontra-se firmemente insinuada na bacia impedindo a descida do sangue. <strong>O sangramento oculto cursa com maior incidência de CIVD, choque materno e morte fetal</strong>.</li>
    </ul>
  </li>
</ol>

<h3>A Tempestade Hemostática: Cascata de Tromboplastina e Coagulopatia de Consumo</h3>
<p>A decídua e o tecido placentário constituem os tecidos do corpo humano com a maior concentração de <strong>fator tecidual (tromboplastina tecidual)</strong>. Com a ruptura vascular e a hipertensão hidrostática do hematoma, toneladas de tromboplastina penetram diretamente na circulação venosa sistêmica materna através dos seios uterinos rotos:</p>
<ul>
  <li>A tromboplastina ativa massivamente o <strong>Fator VII e o Fator X</strong>, disparando a cascata da coagulação pela via extrínseca de forma descontrolada;</li>
  <li>Ocorre a conversão acelerada de protrombina em trombina em todo o leito microvascular materno, com geração desorganizada de polímeros de fibrina que se depositam nos capilares de múltiplos órgãos (rins, fígado, pulmões, cérebro);</li>
  <li>Esse processo consome em velocidade recorde as reservas maternas de plaquetas e de fatores solúveis de coagulação (fatores V, VIII e, de modo absolutamente fulminante, o <strong>FIBRINOGÊNIO</strong>);</li>
  <li>Simultaneamente, a plasmina é ativada de forma compensatória, degradando a fibrina e liberando produtos de degradação da fibrina (PDFs e D-dímero), que exercem potente ação anticoagulante e antiplaquetária secundária;</li>
  <li>O resultado é o estabelecimento da <strong>Coagulação Intravascular Disseminada (CIVD)</strong> associada à <strong>hipofibrinogenemia profunda (&lt; 100 mg/dL)</strong>, determinando diátese hemorrágica generalizada com sangramento em locais de punção venosa, hematúria e sangramentos viscerais incontroláveis.</li>
</ul>
`
    },
    {
      id: 'dpp-etiologia-fatores-risco-cocaina',
      title: '7. DPP: Fatores de Risco Maiores, Descompressão Súbita e o Papel da Cocaína/Crack',
      body_html: `
<h3>Estratificação dos Fatores de Risco no Descolamento Prematuro de Placenta</h3>
<p>A identificação precoce dos fatores de risco permite antecipar o diagnóstico e preparar os recursos hemostáticos necessários na sala de emergência:</p>

<table class="book-table">
  <thead>
    <tr>
      <th>Fator de Risco Clínico</th>
      <th>Mecanismo Fisiopatológico Direto</th>
      <th>Risco Relativo / Associação</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>Síndromes Hipertensivas da Gravidez (Pré-eclâmpsia, Hipertensão Crônica)</strong></td>
      <td>Aterose aguda, vasoespasmo arteriolar decidual, necrose fibrinoide das artérias espiraladas e lesão endotelial sistêmica.</td>
      <td><strong>Presente em mais de 50% a 60% de todos os casos de DPP!</strong> É o fator predisponente individual mais importante na prática médica.</td>
    </tr>
    <tr>
      <td><strong>Uso de Drogas Ilícitas Vasoconstritoras (Cocaína e Crack)</strong></td>
      <td>A cocaína bloqueia a recaptação neuronal de catecolaminas (noradrenalina), gerando picos hipertensivos súbitos e vasoconstrição arteriolar decidual violenta, levando a infarto e ruptura vascular aguda.</td>
      <td>Risco de DPP de até <strong>10% a 15% após uso agudo</strong> no terceiro trimestre. O quadro cursa tipicamente com dor abdominal hiperaguda lancinante e hipertonia miometrial minutos após o uso.</td>
    </tr>
    <tr>
      <td><strong>Trauma Abdominal Contuso Direto (Acidentes de Trânsito, Agressões Físicas)</strong></td>
      <td>Forças mecânicas de deformação e cisalhamento entre a parede miometrial elástica e a placenta inelástica.</td>
      <td>Desencadeia o descolamento em 1% a 5% dos traumas leves e em <strong>mais de 30% a 50% dos traumas graves com choque</strong>. Pode manifestar-se com sangramento oculto até 24 horas após o impacto.</td>
    </tr>
    <tr>
      <td><strong>Descompressão Uterina Súbita</strong></td>
      <td>Redução abrupta e instantânea da pressão e da área da superfície interna da cavidade uterina, fazendo com que a placenta sofra clivagem mecânica.</td>
      <td>Ocorre classicamente na: (1) <strong>Amniodrenagem terapêutica rápida no polidrâmnio</strong>; (2) <strong>Amniorrexe com saída explosiva de grande volume de líquido amniótico</strong>; e (3) <strong>Parto vaginal do primeiro feto em gestação gemelar</strong>.</td>
    </tr>
    <tr>
      <td><strong>Tabagismo Materno Ativo</strong></td>
      <td>A nicotina induz vasoconstrição decidual e o monóxido de carbono (CO) provoca hipóxia tecidual crônica e necrose celular.</td>
      <td>Eleva o risco relativo de DPP em <strong>2 a 3 vezes</strong>, com efeito sinérgico devastador quando associado à hipertensão arterial.</td>
    </tr>
    <tr>
      <td><strong>Rotura Prematura de Membranas Ovulares Pré-Termo (RPMO)</strong></td>
      <td>Inflamação e infecção bacteriana decidual ascendente (corioamnionite) e descompressão parcial.</td>
      <td>Eleva o risco relativo em 3 a 5 vezes, especialmente quando associada a período de latência prolongado.</td>
    </tr>
    <tr>
      <td><strong>DPP em Gestação Anterior</strong></td>
      <td>Persistência de defeitos estruturais e vasculares no leito vascular endometrial e predisposição a vasculopatias.</td>
      <td>Recorrência de <strong>5% a 15% após 1 episódio prévio</strong> e <strong>&gt; 25% após 2 episódios prévios</strong>.</td>
    </tr>
  </tbody>
</table>
`
    },
    {
      id: 'dpp-quadro-clinico-tetrade-sher',
      title: '8. DPP: A Tétrade Clínica Cardinal e a Classificação Anatomoclínica de Sher',
      body_html: `
<h3>A Tétrade Clínica Cardinal do DPP</h3>
<p>O diagnóstico de Descolamento Prematuro de Placenta fundamenta-se na identificação da clássica tétrade semiológica obstétrica:</p>
<ol>
  <li><strong>Dor Abdominal Súbita, Contínua e em Cólica Lancinante:</strong> Presente em mais de 85% a 90% dos casos. É uma dor constante que não cessa no intervalo das contrações, localizada inicialmente no sítio de inserção da placenta e que rapidamente se irradia para todo o abdome e região lombar (especialmente nas placentas de inserção posterior);</li>
  <li><strong>Hipertonia Uterina Sustentada ("Útero Lenhoso" ou "Útero em Tábua"):</strong> O miométrio perde a sua capacidade de relaxamento fisiológico entre as contrações, tornando-se pétreo, tenso e extremamente doloroso à palpação superficial. Ocorre em virtude da irritação mecânica das fibras miometriais pelo sangue extravasado e pelas altas concentrações locais de prostaglandinas liberadas pela decídua lesionada;</li>
  <li><strong>Sangramento Vaginal Escuro com Coágulos (ou Sangramento Oculto):</strong> Presente em 80% das pacientes como perda hemática de coloração escura amarronzada com coágulos, decorrente da retenção do sangue retroplacentário antes da sua descida pelo colo;</li>
  <li><strong>Sofrimento Fetal Agudo Grave ou Óbito Fetal Intraútero:</strong> Bradicardia fetal sustentada, desacelerações tardias repetitivas (DIP 2) e perda da variabilidade na cardiotocografia, culminando em óbito em cerca de 15% a 30% das pacientes na admissão.</li>
</ol>

<h3>Classificação de Sher: Estratificação de Risco e Prognóstico</h3>
<p>A classificação clássica proposta por Sher em 1981 permanece como o mais robusto sistema de estratificação anatomoclínica para tomada de decisão tocúrgica:</p>

<table class="book-table">
  <thead>
    <tr>
      <th>Classificação de Sher</th>
      <th>Achados Clínicos Maternos</th>
      <th>Condição da Vitalidade Fetal</th>
      <th>Parâmetros Laboratoriais e Fibrinogênio</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>Grau 1 (Forma Leve)</strong><br>(~40% dos casos)</td>
      <td>Sangramento genital escasso a moderado; tônus uterino normal ou levemente aumentado; ausência de dor intensa; estabilidade hemodinâmica materna.</td>
      <td><strong>Feto VIVO com padrão cardiotocográfico normal</strong> (ausência de sofrimento fetal agudo).</td>
      <td>Coagulograma normal; fibrinogênio sérico normal (&gt; 250 a 300 mg/dL). Diagnóstico frequentemente retrospectivo no exame pós-parto da placenta.</td>
    </tr>
    <tr>
      <td><strong>Grau 2 (Forma Intermediária)</strong><br>(~45% dos casos)</td>
      <td>Sangramento vaginal evidente (ou oculto); <strong>dor abdominal intensa e contínua</strong>; <strong>hipertonia uterina evidente</strong> e taquissistolia miometrial; taquicardia materna compensatória e hipotensão ortostática.</td>
      <td><strong>Feto VIVO com SOFRIMENTO FETAL AGUDO manifesto</strong> (desacelerações tardias mantidas, bradicardia fetal acentuada).</td>
      <td>Hipofibrinogenemia inicial (fibrinogênio sérico entre 150 e 250 mg/dL); início de consumo plaquetário; ausência de diátese hemorrágica franca.</td>
    </tr>
    <tr>
      <td><strong>Grau 3A (Forma Grave sem Coagulopatia)</strong><br>(~8% dos casos)</td>
      <td>Sangramento vaginal volumoso (ou hematoma oculto volumoso); dor abdominal excruciante lancinante; <strong>abdome em tábua generalizado</strong>; choque hipovolêmico materno descompensado.</td>
      <td><strong>ÓBITO FETAL CONFIRMADO intraútero.</strong></td>
      <td>Fibrinogênio sérico mantido <strong>&ge; 150 mg/dL</strong>; ausência de coagulopatia clínica evidente no leito.</td>
    </tr>
    <tr>
      <td><strong>Grau 3B (Forma Grave com CIVD Franca)</strong><br>(~7% dos casos)</td>
      <td>Quadro idêntico ao Grau 3A associado a <strong>diátese hemorrágica sistêmica</strong> (sangramento em locais de punção, hematúria, gengivorragia).</td>
      <td><strong>ÓBITO FETAL CONFIRMADO intraútero.</strong></td>
      <td><strong>CIVD instalada:</strong> Fibrinogênio sérico <strong>&lt; 150 mg/dL (frequentemente &lt; 100 mg/dL)</strong>; plaquetopenia grave (&lt; 50.000 a 80.000/mm³); prolongamento do TP e TTPa; níveis altíssimos de D-dímero.</td>
    </tr>
  </tbody>
</table>
`
    },
    {
      id: 'dpp-conduta-resolutiva-feto-vivo-vs-feto-morto',
      title: '9. Conduta Resolutiva no DPP: A Dicotomia Crítica Feto Vivo vs Feto Morto',
      body_html: `
<h3>O Algoritmo de Decisão Tocúrgica Imediata</h3>
<p>O manejo obstétrico do Descolamento Prematuro de Placenta rege-se por uma dicotomia essencial que norteia a escolha da via de parto:</p>

<div style="border-left: 4px solid #0275d8; padding: 10px 15px; margin: 15px 0; background-color: #f0f7fd;">
<h4 style="color: #0275d8; margin-top: 0;">CENÁRIO 1: DPP COM FETO VIVO (CÓDIGO VERMELHO)</h4>
<p><strong>Conduta Padrão-Ouro: CESARIANA DE EMERGÊNCIA IMEDIATA!</strong></p>
<p>Se o feto estiver vivo e apresentar sinais de sofrimento agudo (ou risco de asfixia iminente), a conduta mandatória é a <strong>cesariana de emergência realizada pela via mais rápida possível</strong> (tempo decisão-parto ideal &lt; 15 a 20 minutos). A única exceção que autoriza o parto vaginal com feto vivo é o caso raríssimo de uma parturiente multípara em <strong>período expulsivo iminente (dilatação total e apresentação no assoalho pélvico plano +4 de De Lee)</strong>, com previsão de nascimento nos próximos 5 minutos.</p>
</div>

<div style="border-left: 4px solid #d9534f; padding: 10px 15px; margin: 15px 0; background-color: #fdf7f7;">
<h4 style="color: #d9534f; margin-top: 0;">CENÁRIO 2: DPP COM FETO MORTO (COM MÃE HEMODINAMICAMENTE ESTÁVEL)</h4>
<p><strong>Conduta Padrão-Ouro: PARTO VAGINAL MONITORIZADO!</strong></p>
<p>Quando o feto já se encontra em óbito intraútero no momento do diagnóstico, o foco absoluto do obstetra volta-se exclusivamente para a <strong>sobrevivência e segurança da mãe</strong>. A realização de cesariana em uma paciente com feto morto e CIVD grave acarreta uma taxa de mortalidade materna de até 15% a 25% por choque hemorrágico incoercível no leito operatório e infecção puerperal grave.</p>
<p><strong>Protocolo do Parto Vaginal no Feto Morto:</strong></p>
<ul>
  <li><strong>Amniotomia Precoce Imediata:</strong> É o primeiro e mais importante gesto obstétrico. Romper as membranas ovulares imediatamente alcança três objetivos vitais: (1) Reduz a pressão intrauterina e a compressão sobre a veia cava; (2) Diminui o extravasamento de tromboplastina placentária para a circulação materna, freando o consumo de fibrinogênio; e (3) Acelera a velocidade da dilatação cervical e encurta a duração do parto;</li>
  <li><strong>Correção Agressiva da Hipofibrinogenemia:</strong> Transfusão imediata de <strong>Crioprecipitado</strong> (10 a 15 unidades) ou concentrado de fibrinogênio para manter o fibrinogênio sérico acima de 150 mg/dL antes e durante o trabalho de parto;</li>
  <li><strong>Condução com Ocitocina em Infusão Controlada:</strong> O miométrio costuma ser hiper-reativo; pode-se titular ocitocina com extremo cuidado se o trabalho de parto não progredir espontaneamente;</li>
  <li><strong>Quando Indicar Cesariana no Feto Morto?</strong> A cesariana é indicada estritamente se houver: (1) <strong>Deterioração hemodinâmica materna refratária</strong> à reposição de sangue e cristaloides; (2) Sangramento vaginal maciço incontrolável; ou (3) <strong>Falha de progressão do trabalho de parto em curto prazo</strong> (geralmente tolerando-se um limite de até 4 a 6 horas).</li>
</ul>
</div>
`
    },
    {
      id: 'utero-couvelaire-manejo-conservador-b-lynch',
      title: '10. Útero de Couvelaire: Apoplexia Uteroplacentária e Tratamento Conservador Escalonado',
      body_html: `
<h3>Anatomopatologia da Apoplexia Uteroplacentária de Couvelaire</h3>
<p>Descrito originalmente pelo obstetra francês Alexandre Couvelaire em 1912, o <strong>Útero de Couvelaire</strong> consiste na <em>infiltração miometrial difusa de sangue e sufusões hemorrágicas dissecantes</em> sob altíssima pressão hidrostática a partir do hematoma retroplacentário.</p>
<p>Macroscopically, o útero apresenta um aspecto aterrador na laparotomia: a parede miometrial exibe coloração marmórea, azulada, arroxeada ou negra mosqueada, estendendo-se sob a serosa peritoneal e para as folhas dos ligamentos largos, tubas uterinas e estroma ovariano. O miométrio infiltrado perde temporariamente a sua contratilidade elástica fisiológica, predispondo à <strong>atonia uterina puerperal grave com ausência do globo de segurança de Pinard</strong> e hemorragia volumosa pós-dequitação.</p>

<h3>Algoritmo de Conduta Conservadora Escalonada</h3>
<p>A obstetrícia moderna consagrou o conceito de que <strong>o Útero de Couvelaire NÃO é indicação imediata de histerectomia puerperal</strong>. O músculo uterino é capaz de recuperar sua contratilidade assim que o hematoma é evacuado e os uterotônicos são administrados. A conduta deve seguir rigorosamente os degraus da cirurgia hemostática conservadora:</p>
<ol>
  <li><strong>Degrau 1: Esvaziamento e Massagem Bimanual Vigorosa:</strong>
    <p>Extração rápida da placenta, curetagem delicada com compressa montada de todos os coágulos intracavitários e início imediato da manobra de compressão bimanual de Hamilton (uma mão cerrada na vagina comprimindo a parede anterior e a outra mão transabdominal comprimindo a parede posterior uterina);</p>
  </li>
  <li><strong>Degrau 2: Farmacoterapia Uterotônica em Altas Doses:</strong>
    <ul>
      <li><strong>Ocitocina:</strong> 5 UI em bolus EV lento (3 minutos) + 20 a 40 UI em infusão contínua em 500 mL de Ringer Lactato a 120-250 mL/hora;</li>
      <li><strong>Metilergonovina (Methergin):</strong> 0,2 mg IM profundo (contraindicada se hipertensão arterial, pré-eclâmpsia ou doença vascular);</li>
      <li><strong>Misoprostol:</strong> 800 a 1.000 &mu;g por via retal ou sublingual (análogo potente de PGE1);</li>
      <li><strong>Carbetocina:</strong> 100 &mu;g EV dose única (agonista de ação prolongada);</li>
    </ul>
  </li>
  <li><strong>Degrau 3: Suturas Compressivas Miometriais Hemostáticas:</strong>
    <p>A técnica de escolha consagrada mundialmente é a <strong>Sutura de B-Lynch</strong> (ou variantes de Hayman / Cho). Utilizando fio inabsorvível ou absorvível de absorção lenta e monofilamentar (Monocryl ou PDS nº 1 com agulha curva romba de 70 mm), o cirurgião passa duas alças de compressão vertical que envolvem o fundo uterino como "alças de suspensório", colabando mecanicamente as paredes anterior e posterior do útero e obliterando o leito vascular retroplacentário sangrante;</p>
  </li>
  <li><strong>Degrau 4: Desvascularização Pélvica Escalonada:</strong>
    <p>Caso a atonia persista, realiza-se a <strong>ligadura bilateral das artérias uterinas (técnica de O'Leary)</strong> na altura do segmento inferior, seguida se necessário pela ligadura dos ramos ascendentes da artéria ovariana e, em mãos experientes, pela <strong>ligadura bilateral das artérias ilíacas internas (hipogástricas)</strong>;</p>
  </li>
  <li><strong>Degrau 5: Histerectomia Puerperal de Resgate (Subtotal ou Total):</strong>
    <p>Indicada exclusivamente se todos os degraus conservadores falharem e a paciente apresentar sangramento persistente com risco de coagulopatia e choque irreversível. A histerectomia subtotal é preferida por ser mais rápida e associada a menor perda sanguínea, salvo se o colo uterino ou segmento inferior estiverem diretamente lacerados.</p>
  </li>
</ol>
`
    },
    {
      id: 'terapia-transfusional-fibrinogenio-crioprecipitado',
      title: '11. Terapia Transfusional Guiada por Metas, Fibrinogênio e o Papel do Crioprecipitado',
      body_html: `
<h3>Metas Hemostáticas Laboratoriais na Hemorragia Obstétrica Maciça</h3>
<p>O manejo hemostático moderno abandonou a reposição empírica desregulada de fluidos em favor da <strong>terapia transfusional guiada por metas analíticas precoces</strong>:</p>

<table class="book-table">
  <thead>
    <tr>
      <th>Parâmetro Laboratorial</th>
      <th>Meta Alvo na Hemorragia Ativa</th>
      <th>Estratégia de Intervenção e Hemocomponente Específico</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>Fibrinogênio Sérico</strong></td>
      <td><strong>&gt; 150 a 200 mg/dL</strong><br>(Alvo primário fundamental no DPP).</td>
      <td>• Se fibrinogênio &lt; 150 mg/dL: Administrar <strong>Crioprecipitado</strong> na dose de <strong>1 unidade para cada 10 kg de peso (habitualmente 10 unidades)</strong>, ou <strong>Concentrado de Fibrinogênio</strong> liofilizado (dose de 2 a 4 g EV em bolus);<br>• Cada pool de 10 unidades de crioprecipitado eleva o fibrinogênio sérico em cerca de 75 a 100 mg/dL.</td>
    </tr>
    <tr>
      <td><strong>Hemoglobina (Hb)</strong></td>
      <td><strong>&ge; 7,0 a 8,0 g/dL</strong></td>
      <td>Transfusão de <strong>Concentrado de Hemácias (CH)</strong> na proporção balanceada 1:1:1 dentro do protocolo de transfusão maciça.</td>
    </tr>
    <tr>
      <td><strong>Contagem de Plaquetas</strong></td>
      <td><strong>&gt; 50.000/mm³</strong><br>(&gt; 75.000 a 100.000/mm³ se sangramento microvascular ativo).</td>
      <td>Transfusão de <strong>Concentrado de Plaquetas</strong> (1 unidade a cada 10 kg de peso ou 1 aférese de plaquetas).</td>
    </tr>
    <tr>
      <td><strong>Coagulograma (TP e TTPa)</strong></td>
      <td>Razão de TP/TTPa <strong>&lt; 1,5 vezes o controle (INR &lt; 1,5)</strong></td>
      <td>Transfusão de <strong>Plasma Fresco Congelado (PFC)</strong> na dose de 15 a 20 mL/kg de peso corporal.</td>
    </tr>
    <tr>
      <td><strong>Cálcio Ionizado Sérico</strong></td>
      <td><strong>&gt; 1,1 a 1,3 mmol/L</strong></td>
      <td>O citrato dos conservantes das bolsas de sangue quela o cálcio iônico circulante, induzindo hipotensão e piora da contratilidade miocárdica e miometrial. Administrar <strong>1 g de Gluconato de Cálcio a 10% EV</strong> a cada 4 unidades de hemoderivados transfundidos.</td>
    </tr>
    <tr>
      <td><strong>Temperatura Corpórea Central</strong></td>
      <td><strong>&gt; 36,0 ºC</strong></td>
      <td>Aquecedores ativos de fluidos intravenosos e mantas térmicas de ar forçado. A hipotermia inibe irreversivelmente os complexos enzimáticos da cascata de coagulação.</td>
    </tr>
  </tbody>
</table>
`
    },
    {
      id: 'casos-clinicos-estruturados-detalhados',
      title: '12. Casos Clínicos Estruturados e Tomada de Decisão Tococirúrgica na Prática',
      body_html: `
<h3>Caso Clínico 1: Placenta Prévia Centro-Total com Suspeita de Acretismo e Hemorragia Maciça</h3>
<p><strong>Identificação:</strong> Gestante de 35 anos, G3P2 (duas cesarianas prévias), idade gestacional de 34 semanas e 2 dias, admitida na urgência obstétrica após apresentar sangramento vaginal vermelho-vivo súbito abundante em domicílio (estimado em 600 mL). Ao dar entrada, o sangramento arrefece para um fluxo discreto e contínuo.</p>
<p><strong>Exame Físico:</strong> Lúcida, ansiosa, pálida 2+/4+. PA = 100/60 mmHg, FC = 98 bpm (Índice de Choque = 98/100 = 0,98 — indicando perda volumosa compensada). Palpação abdominal: útero totalmente indolor, tônus perfeitamente normal e flácido, altura uterina compatível com a idade gestacional. Feto em situação transversa com dorso superior. Cardiotocografia basal reativa com FCF de 138 bpm.</p>
<p><strong>Avaliação Ultrassonográfica Especializada:</strong></p>
<p>A ultrassonografia transvaginal de urgência evidencia placenta anterior que recobre inteiramente o orifício interno do colo uterino (placenta prévia completa). O estudo Doppler colorido revela perda da zona hipoecoica retroplacentária sobre a cicatriz de cesárea prévia, com múltiplas lacunas placentárias irregulares ("queijo suíço") e vasos tortuosos de alto débito invadindo o miométrio do segmento inferior, configurando <strong>Espectro do Acretismo Placentário (Placenta Increta/Percreta provável)</strong>.</p>
<p><strong>Conduta e Estratégia Cirúrgica:</strong></p>
<ol>
  <li>Paciente internada na UTI obstétrica com repouso absoluto no leito, puncionados 2 acessos venosos 14G, reservadas 4 bolsas de concentrado de hemácias, 4 de PFC e 10 unidades de crioprecipitado;</li>
  <li>Completado o esquema de Betametasona para maturação pulmonar fetal e iniciada infusão de Sulfato de Magnésio para neuroproteção fetal;</li>
  <li>Doze horas após a admissão, a paciente apresenta novo episódio de hemorragia vaginal volumosa rutilante com coágulos e hipotensão (PA = 85/50 mmHg, FC = 120 bpm, SIO = 1,41). Acionada a equipe multidisciplinar de resposta rápida e ativado o Protocolo de Transfusão Maciça;</li>
  <li><strong>Cirurgia Realizada:</strong> Laparotomia exploradora mediana ampla xifopúbica. Realizada histerotomia corporal fúndica alta e extração rápida de feto viável (Apgar 6/8). O cordão umbilical foi clampeado rente à placenta e a histerotomia fúndica suturada rapidamente com a <strong>placenta mantida intacta in situ</strong>;</li>
  <li>Realizada histerectomia puerperal total com a placenta retida. Durante a dissecção vesicouterina, foi identificada protrusão de cotilédones na serosa uterina com neovascularização abundante, poupando a mucosa vesical. Procedimento concluído com perda estimada de 1.800 mL, reposição balanceada 1:1:1 e paciente extubada na UTI com excelente recuperação.</li>
</ol>

<h3>Caso Clínico 2: DPP Grave com Óbito Fetal, CIVD Franca e Manejo Conservador de Couvelaire</h3>
<p><strong>Identificação:</strong> Gestante de 28 anos, secundigesta (um parto vaginal prévio há 4 anos), com 37 semanas de gestação, sem pré-natal regular, admitida em sala vermelha obstétrica com dor abdominal excruciante e perda sanguínea escura por via vaginal iniciada há 4 horas. Relata que parou de sentir os movimentos fetais há 3 horas.</p>
<p><strong>Exame Físico:</strong> Estado geral grave, torporosa, sudoreica, palidez 3+/4+. PA = 80/40 mmHg, FC = 130 bpm (Índice de Choque = 130/80 = 1,62 — choque hemorrágico descompensado). Presença de sangramento persistente em locais de punção venosa periférica prévia. Palpação abdominal: <strong>hipertonia lenhosa sustentada do útero ("útero em tábua")</strong>, abdome extremamente doloroso à palpação de todos os quadrantes. A ausculta com sonar Doppler fetal e ultrassonografia à beira do leito confirmam <strong>óbito fetal intraútero</strong>.</p>
<p><strong>Investigação Laboratorial Imediata:</strong></p>
<ul>
  <li>Hemoglobina = 6,2 g/dL; Plaquetas = 48.000/mm³;</li>
  <li>Tempo de Protrombina com INR = 2,4; TTPa prolongado (relação &gt; 2,0);</li>
  <li><strong>Fibrinogênio sérico = 55 mg/dL (CIVD com hipofibrinogenemia profunda!)</strong>;</li>
  <li>D-dímero &gt; 10.000 ng/mL; Lactato arterial = 4,8 mmol/L.</li>
</ul>
<p><strong>Conduta Obstétrica e Tococirúrgica Adotada:</strong></p>
<p>Trata-se de <strong>Descolamento Prematuro de Placenta Grau 3B de Sher com feto morto e CIVD grave instalada</strong>. A paciente encontrava-se com colo fechado, desfavorável e choque descompensado refratário a fluidos:</p>
<ol>
  <li>Ativação imediata do Protocolo de Transfusão Maciça: infusão rápida de Concentrado de Hemácias aquecido, Plasma Fresco Congelado e Concentrado de Plaquetas, associada a <strong>15 unidades de Crioprecipitado</strong> para restaurar o fibrinogênio sérico acima de 150 mg/dL e 1 g de Ácido Tranexâmico EV;</li>
  <li>Como a paciente mantinha sangramento maciço incoercível e colo impenetrável sem condições de indução rápida, indicou-se laparotomia de emergência sob anestesia geral;</li>
  <li>Cesariana com evacuação de feto em óbito e drenagem de hematoma retroplacentário maciço de aproximadamente 1.600 mL (descolamento total de 100% da placenta);</li>
  <li>O útero apresentava aspecto patognomônico de <strong>Útero de Couvelaire</strong>, com atonia franca e coloração negro-azulada difusa. Realizada massagem de Hamilton, infusão de Ocitocina em altas doses, Misoprostol retal e aplicação bem-sucedida de <strong>Sutura Compressiva de B-Lynch</strong> associada à ligadura bilateral das artérias uterinas (técnica de O'Leary);</li>
  <li>Houve retração miometrial satisfatória e hemostasia segura, <strong>evitando-se a histerectomia puerperal</strong>. Paciente encaminhada à UTI, recebendo suporte transfusional guiado por metas, com alta hospitalar no 6º dia pós-operatório sem sequelas.</li>
</ol>
`
    },
    {
      id: 'questoes-concursos-comentadas-completas',
      title: '13. Questões de Provas de Residência Médica e ENAMED com Gabaritos Exaustivos',
      body_html: `
<h3>Questão 1 (ENAMED / Revalidação de Diploma)</h3>
<p>Uma gestante de 33 semanas, G2P1 (uma cesárea anterior há 2 anos), procura o serviço de urgência obstétrica queixando-se de sangramento vaginal vermelho-vivo abundante de início súbito e espontâneo durante o repouso. Nega dor abdominal ou contrações. Ao exame físico: paciente normotensa e corada; útero flácido, indolor e com tônus normal; cardiotocografia reativa com batimentos cardíacos fetais normais (145 bpm). O residente de plantão prepara-se para realizar o exame de toque vaginal digital bimanual para avaliar a dilatação cervical. Diante desse quadro clínico, a assertiva correta referente à conduta imediata e aos riscos do procedimento é:</p>
<p><strong>A)</strong> O toque vaginal digital é mandatório para classificar a placenta prévia em centro-total ou parcial antes de qualquer exame de imagem.<br>
<strong>B)</strong> O toque vaginal digital é formalmente contraindicado pelo risco iminente de dilaceração placentária mecânica e hemorragia maciça catastrófica; o exame propedêutico padrão-ouro de escolha é a ultrassonografia transvaginal.<br>
<strong>C)</strong> A ultrassonografia transvaginal é proscrita na placenta prévia, devendo ser realizada exclusivamente a ultrassonografia transabdominal com repleção vesical máxima.<br>
<strong>D)</strong> A ausência de dor abdominal confirma que o sangramento decorre exclusivamente de descolamento prematuro de placenta oculto leve, devendo-se indicar amniotomia imediata.<br>
<strong>E)</strong> Deve-se iniciar infusão de ocitocina imediatamente para estimular o encaixamento da apresentação fetal e promover o tamponamento do sangramento.</p>
<p><strong>Gabarito Comentado:</strong></p>
<p><strong>Alternativa B está CORRETA.</strong> Diante de sangramento na segunda metade da gestação com a tétrade clássica de Placenta Prévia (sangramento indolor, espontâneo, vermelho-vivo e em paciente com cesárea prévia), o <strong>toque vaginal digital é formalmente PROIBIDO</strong> antes de comprovar a localização placentária por ultrassonografia. A introdução do dedo no colo pode perfurar o leito vascular placentário e deflagrar hemorragia exsanguinante fulminante. O método padrão-ouro é a <strong>ultrassonografia transvaginal</strong>, exame totalmente seguro que não provoca sangramento e possui acurácia diagnóstica superior a 98%.<br>
<em>Análise dos distratores:</em><br>
A: Errada e perigosa; o toque é proscrito.<br>
C: Errada; a USTV é o exame de escolha padrão-ouro.<br>
D: Errada; DPP cursa tipicamente com dor contínua e hipertonia miometrial.<br>
E: Errada; ocitocina em placenta prévia provocaria descolamento placentário maciço e morte materna.</p>

<h3>Questão 2 (Residência Médica / USP)</h3>
<p>A respeito da classificação e do manejo do Espectro do Acretismo Placentário (PAS — Placenta Accreta Spectrum), assinale a afirmativa correta:</p>
<p><strong>A)</strong> Na placenta percreta, as vilosidades coriônicas limitam-se à superfície miometrial sem invadir sua espessura, permitindo a dequitação manual forçada do leito placentário sob tração controlada do cordão.<br>
<strong>B)</strong> O principal fator de risco para o acretismo placentário é a associação de placenta prévia e cicatriz de cesárea anterior; em pacientes com placenta prévia e três ou mais cesáreas prévias, o risco de acretismo supera 50% a 60%.<br>
<strong>C)</strong> O tratamento cirúrgico padrão-ouro da placenta prévia acreta envolve a realização de histerotomia segmentar transversa baixa através do leito da placenta para permitir a visualização direta da invasão trofoblástica.<br>
<strong>D)</strong> A histerectomia puerperal profilática está formalmente contraindicada no acretismo placentário devido ao risco de choque séptico pós-operatório.<br>
<strong>E)</strong> A ausência de vasos anômalos na ultrassonografia transabdominal exclui o diagnóstico de placenta acreta com 100% de sensibilidade.</p>
<p><strong>Gabarito Comentado:</strong></p>
<p><strong>Alternativa B está CORRETA.</strong> A associação sinérgica entre placenta prévia e número de cesáreas anteriores é o fator epidemiológico determinante do acretismo placentário: salta de 1% a 3% na ausência de cesárea para 10%-14% com 1 cesárea, 25%-40% com 2 cesáreas e <strong>mais de 50% a 65% em mulheres com 3 ou mais cesáreas anteriores</strong>.<br>
<em>Análise dos distratores:</em><br>
A: Incorreta; na percreta as vilosidades ultrapassam a serosa e invadem órgãos adjacentes; tração do cordão provoca hemorragia fatal.<br>
C: Incorreta; a histerotomia deve ser fúndica alta LONGE da placenta.<br>
D: Incorreta; a histerectomia com a placenta in situ é a técnica padrão-ouro de escolha.<br>
E: Incorreta; o ultrassom transabdominal tem limitações e a USTV e RM são necessárias.</p>

<h3>Questão 3 (Residência Médica / UNIFESP)</h3>
<p>Primigesta de 32 semanas, portadora de Pré-Eclâmpsia grave com proteinúria maciça, é admitida com dor abdominal em cólica violenta contínua há 1 hora, associada a sangramento genital escuro moderado. Ao exame físico: PA = 170/110 mmHg, FC = 115 bpm; palpação abdominal evidenciando hipertonia uterina contínua ("útero em tábua") e ausência de relaxamento miometrial; ausculta fetal por sonar Doppler demonstrando bradicardia fetal sustentada a 80 bpm com desacelerações tardias. Os exames laboratoriais de urgência colhidos na admissão mostram fibrinogênio sérico de 130 mg/dL e plaquetas de 85.000/mm³. De acordo com a classificação de Sher e os protocolos de conduta obstétrica, assinale o diagnóstico e a conduta recomendada:</p>
<p><strong>A)</strong> Descolamento Prematuro de Placenta Grau 1; aguardar 48 horas para corticoterapia antes de qualquer intervenção.<br>
<strong>B)</strong> Descolamento Prematuro de Placenta Grau 2 com sofrimento fetal agudo; cesariana de emergência imediata, reposição de crioprecipitado e administração de ácido tranexâmico.<br>
<strong>C)</strong> Placenta de inserção baixa sangrante; indicar indução do parto com ocitocina em altas doses.<br>
<strong>D)</strong> Descolamento Prematuro de Placenta Grau 3B; indução de parto vaginal com misoprostol retal.<br>
<strong>E)</strong> Rotura de seio marginal placentário; repouso no leito e alta hospitalar com sulfato ferroso.</p>
<p><strong>Gabarito Comentado:</strong></p>
<p><strong>Alternativa B está CORRETA.</strong> A paciente apresenta critérios clássicos de <strong>Descolamento Prematuro de Placenta Grau 2 de Sher</strong>: gestante com pré-eclâmpsia (fator de risco maior em > 50%), dor intensa contínua, sangramento escuro, hipertonia lenhosa sustentada, sofrimento fetal agudo manifesto (bradicardia fetal grave) e início de consumo hemostático (fibrinogênio < 150 mg/dL). Na presença de <strong>FETO VIVO</strong>, a conduta imperativa é a <strong>Cesariana de Emergência Imediata</strong>, associada à reposição de <strong>Crioprecipitado</strong> para elevar o fibrinogênio acima de 150-200 mg/dL e administração precoce de Ácido Tranexâmico EV.<br>
<em>Análise dos distratores:</em><br>
A: Grau 1 não apresenta sofrimento fetal ou hipertonia acentuada.<br>
C e E: Diagnósticos incorretos e condutas letais.<br>
D: Grau 3 exige óbito fetal intraútero comprovado.</p>

<h3>Questão 4 (Residência Médica / ENARE)</h3>
<p>No manejo do Descolamento Prematuro de Placenta (DPP) grave com constatação inequívoca de óbito fetal intraútero à admissão (Grau 3 de Sher), em paciente que se apresenta hemodinamicamente estável após infusão de hemoderivados e cristaloides, qual é a via de parto preferencial preconizada pelas diretrizes obstétricas nacionais e internacionais e qual é o gesto obstétrico inicial fundamental?</p>
<p><strong>A)</strong> Cesariana de emergência imediata; realização de histerectomia profilática.<br>
<strong>B)</strong> Parto pela via vaginal; realização de amniotomia precoce imediata.<br>
<strong>C)</strong> Parto vaginal; tocolítico intravenoso contínuo para reverter a hipertonia miometrial.<br>
<strong>D)</strong> Cesariana sob anestesia peridural pura; curetagem uterina profilática pós-dequitação.<br>
<strong>E)</strong> Conduta expectante sem intervenção até que o trabalho de parto espontâneo se inicie após 40 semanas.</p>
<p><strong>Gabarito Comentado:</strong></p>
<p><strong>Alternativa B está CORRETA.</strong> Quando o feto já se encontra em <strong>óbito intraútero (DPP Grau 3)</strong> e a mãe mantém <strong>estabilidade hemodinâmica</strong>, a via de parto preferencial de escolha é a <strong>VAGINAL</strong>. A cesariana em paciente com CIVD grave e hematoma volumoso eleva drasticamente o risco cirúrgico de sangramento incoercível da parede e infecção puerperal. O gesto obstétrico primário e mandatório é a <strong>Amniotomia Precoce Imediata</strong>, que reduz a pressão intrauterina, freia a passagem de tromboplastina placentária para a circulação materna, diminui o sangramento e acelera o parto.<br>
<em>Análise dos distratores:</em><br>
A: Errada; cesariana no feto morto aumenta a mortalidade materna.<br>
C: Errada; tocolíticos são formalmente contraindicados no DPP com feto morto.<br>
D: Errada; anestesia de neuroeixo é contraindicada na CIVD grave.<br>
E: Absurdo que levaria à sepse materna e choque irreversível.</p>

<h3>Questão 5 (Residência Médica / AMRIGS)</h3>
<p>Durante a realização de cesariana em paciente multípara com DPP grave, após a extração fetal e dequitação placentária com remoção de volumoso hematoma retroplacentário, o cirurgião observa que o útero apresenta-se flácido, hipotônico, com sufusões hemorrágicas difusas violáceas e arroxeada infiltrando toda a serosa miometrial e as folhas dos ligamentos largos, caracterizando Útero de Couvelaire. Qual é a conduta sequencial hemostática correta a ser adotada pela equipe cirúrgica?</p>
<p><strong>A)</strong> Realizar histerectomia puerperal imediata, pois o útero de Couvelaire é necrótico e irreversível.<br>
<strong>B)</strong> Realizar massagem uterina bimanual contínua, administrar uterotônicos parenterais/retais em doses máximas (ocitocina, metilergonovina se normotensa, misoprostol), aplicar sutura hemostática compressiva de B-Lynch e ligaduras vasculares escalonadas, reservando a histerectomia apenas para falha das medidas conservadoras.<br>
<strong>C)</strong> Injetar heparina de baixo peso molecular no miométrio para reverter a trombose intramiometrial.<br>
<strong>D)</strong> Realizar o fechamento imediato da parede abdominal com compressas cavitárias sem qualquer uterotônico.<br>
<strong>E)</strong> Realizar salpingooforectomia bilateral de urgência para estancar o fluxo gonadal.</p>
<p><strong>Gabarito Comentado:</strong></p>
<p><strong>Alternativa B está CORRETA.</strong> O <strong>Útero de Couvelaire (apoplexia uteroplacentária)</strong> resulta da infiltração dissecante de sangue entre os feixes miometriais. Embora tenha coloração arroxeada alarmante, o útero de Couvelaire <strong>NÃO é indicação mandatória primária de histerectomia</strong>. A grande maioria dos casos responde eficazmente à conduta conservadora escalonada: massagem bimanual, uterotônicos em doses máximas, suturas compressivas mecânicas (sutura de B-Lynch) e ligaduras vasculares (técnica de O'Leary). A histerectomia é medida de resgate reservada para falha da hemostasia.<br>
<em>Análise dos distratores:</em><br>
A: Errada; histerectomia precipitada mutila desnecessariamente a paciente.<br>
C: Errada; heparina aumentaria o sangramento e a mortalidade.<br>
D e E: Proscritas e desprovidas de qualquer respaldo técnico.</p>

<h3>Questão 6 (Residência Médica / CERMAM)</h3>
<p>Em relação ao papel biológico e laboratorial do fibrinogênio sérico no diagnóstico e manejo do Descolamento Prematuro de Placenta, assinale a assertiva correta:</p>
<p><strong>A)</strong> O fibrinogênio na gestante no terceiro trimestre tem valores normais idênticos aos de homens adultos jovens (entre 150 e 200 mg/dL).<br>
<strong>B)</strong> Devido ao estado fisiológico de hipercoagulabilidade da gestação a termo, o fibrinogênio sérico normal situa-se entre 400 e 600 mg/dL; portanto, um nível de fibrinogênio sérico de 150 a 200 mg/dL em gestante com DPP indica consumo patológico grave e risco iminente de CIVD.<br>
<strong>C)</strong> A hipofibrinogenemia na gestação só deve ser tratada quando os níveis séricos atingirem valores inferiores a 20 mg/dL.<br>
<strong>D)</strong> O hemocomponente de escolha para repor fibrinogênio em concentrações elevadas com menor sobrecarga de volume é o concentrado de hemácias lavadas.<br>
<strong>E)</strong> A dosagem de fibrinogênio sérico é irrelevante no DPP, pois a cascata de coagulação na gravidez não utiliza fatores solúveis.</p>
<p><strong>Gabarito Comentado:</strong></p>
<p><strong>Alternativa B está CORRETA.</strong> No terceiro trimestre, o organismo materno encontra-se em hipercoagulabilidade fisiológica protetora contra hemorragias de parto, elevando o fibrinogênio para <strong>400 a 600 mg/dL</strong>. Por essa razão, níveis de fibrinogênio entre 150 e 200 mg/dL (que fora da gravidez seriam considerados normais) representam <strong>depleção e consumo severo por tromboplastina no DPP</strong>. Níveis &lt; 150 mg/dL exigem reposição imediata de Crioprecipitado ou concentrado de fibrinogênio para atingir a meta hemostática &gt; 150-200 mg/dL.<br>
<em>Análise dos distratores:</em><br>
A: Errada; a gestante tem níveis basais muito superiores aos do adulto normal.<br>
C: Errada; esperar atingir 20 mg/dL levaria ao choque hemorrágico fatal.<br>
D: Errada; o concentrado de hemácias não contém fibrinogênio; o crioprecipitado é o derivado rico em fibrinogênio.<br>
E: Totalmente sem fundamento fisiológico.</p>

<h3>Questão 7 (Residência Médica / SMS-RJ)</h3>
<p>Uma gestante de 38 semanas dá entrada em trabalho de parto ativo. Imediatamente após a rotura espontânea da bolsa amniótica, observa-se a exteriorização de líquido amniótico francamente sanguinolento de coloração vermelho-viva. A parturiente permanece assintomática, normotensa e sem dor anormal, mas a monitorização cardiotocográfica contínua passa a registrar bradicardia fetal extrema e persistente a 65 bpm com padrão prévio sinusoidal. Qual é o diagnóstico patognomônico e a origem biológica do sangue exteriorizado?</p>
<p><strong>A)</strong> Descolamento prematuro de placenta; sangue de origem puramente materna decídua.<br>
<strong>B)</strong> Vasa prévia com laceração de vasos de cordão velamentoso; sangue de origem puramente fetal.<br>
<strong>C)</strong> Placenta prévia de inserção baixa; sangue de lagos venosos miometriais maternos.<br>
<strong>D)</strong> Rotura de seio marginal placentário; sangue venoso materno da periferia coriônica.<br>
<strong>E)</strong> Laceração de colo uterino por papilomavírus humano; sangue capilar superficial materno.</p>
<p><strong>Gabarito Comentado:</strong></p>
<p><strong>Alternativa B está CORRETA.</strong> O sangramento vermelho-vivo que surge imediatamente associado à rotura das membranas corioamnióticas, acompanhado de choque e bradicardia fetal fulminante em mãe estável e indolor, é o quadro patognomônico de <strong>Vasa Prévia Rota</strong>. A peculiaridade biológica crucial é que <strong>o sangue perdido é de origem estritamente FETAL</strong>. Em virtude da volemia fetal reduzida (~250 mL), a perda de escassos 50 a 100 mL de sangue fetal acarreta choque hipovolêmico descompensado agudo e óbito em minutos se não realizada cesariana imediata.<br>
<em>Análise dos distratores:</em><br>
A, C, D e E: Em todas essas etiologias o sangue é de origem materna e não induz colapso cardíaco fetal instantâneo em segundos após a amniorrexe.</p>

<h3>Questão 8 (Residência Médica / IAMSPE)</h3>
<p>Dentre as etiologias de sangramento anteparto da segunda metade da gestação, qual afecção caracteriza-se classicamente por ser um diagnóstico de exclusão, cursando com sangramento vermelho-vivo de pequena intensidade no início do trabalho de parto, tônus uterino estritamente normal, ausência de dor abdominal contínua e vitalidade fetal 100% preservada, confirmando-se no pós-parto pela presença de um coágulo aderido à margem placentária?</p>
<p><strong>A)</strong> Rotura de seio marginal placentário.<br>
<strong>B)</strong> Descolamento prematuro de placenta oculto Grau 3B.<br>
<strong>C)</strong> Placenta percreta com invasão de assoalho vesical.<br>
<strong>D)</strong> Rotura uterina consumada com sinal de Clark.<br>
<strong>E)</strong> Síndrome de Bandl-Frommel com anel patológico.</p>
<p><strong>Gabarito Comentado:</strong></p>
<p><strong>Alternativa A está CORRETA.</strong> A <strong>Rotura do Seio Marginal</strong> é o clássico diagnóstico de exclusão das hemorragias anteparto: sangramento vermelho-vivo discreto ou moderado, tônus uterino normal, ausência de sofrimento fetal e sem evidência ecográfica de placenta prévia ou hematoma retroplacentário central. A confirmação diagnóstica definitiva é histopatológica após o parto, ao demonstrar coágulo recente aderido à borda lateral da placenta.<br>
<em>Análise dos distratores:</em><br>
B: Cursa com feto morto e hipertonia miometrial lenhosa.<br>
C: Acretismo grave associado a hemorragias volumosas e invasão vesical.<br>
D: Rotura consumada cursa com choque, peritonite e recuo da apresentação.<br>
E: Iminência de rotura cursa com hipertonia e dor em cólica violenta crescente.</p>

<h3>Questão 9 (Residência Médica / SCMSP)</h3>
<p>Mulher de 36 anos, G4P3 (três cesarianas prévias), idade gestacional de 32 semanas, com diagnóstico pré-natal bem estabelecido de placenta prévia centro-total anterior e suspeita ultrassonográfica de placenta percreta invadindo a parede vesical posterior. A paciente encontra-se assintomática e em repouso no leito hospitalar. A respeito do planejamento do momento e da técnica cirúrgica padrão-ouro para esse caso segundo as diretrizes do ACOG e RCOG, assinale a conduta correta:</p>
<p><strong>A)</strong> Realizar histerotomia transversa segmentar baixa com descolamento manual forçado da placenta para tentar salvar o útero.<br>
<strong>B)</strong> Programar cesariana eletiva planejada entre 34+0 e 35+6 semanas com equipe multidisciplinar em centro terciário, realizando histerotomia fúndica alta longe da placenta, extração fetal, sutura da incisão com a placenta in situ, seguida de histerectomia total com a placenta mantida dentro do útero.<br>
<strong>C)</strong> Aguardar o início do trabalho de parto espontâneo com 41 semanas para garantir maturidade pulmonar fetal máxima.<br>
<strong>D)</strong> Realizar indução de parto vaginal com misoprostol associado a balão de Krause.<br>
<strong>E)</strong> Administrar metotrexato por via intravenosa no pré-operatório para promover a necrose completa da placenta antes da cesariana.</p>
<p><strong>Gabarito Comentado:</strong></p>
<p><strong>Alternativa B está CORRETA.</strong> No espectro do acretismo placentário (PAS) associado a placenta prévia e cesáreas prévias, o planejamento cirúrgico eletivo deve ocorrer entre <strong>34+0 e 35+6 semanas</strong> em hospital terciário de referência com equipe multidisciplinar experiente (obstetras, ginecologista oncológico, urologista, UTI e banco de sangue com protocolo de transfusão maciça). A técnica cirúrgica padrão-ouro visa minimizar sangramentos maciços: incisão mediana ampla, <strong>histerotomia corporal fúndica alta (longe da placenta)</strong>, extração fetal rápida, clampeamento do cordão sem tracionar a placenta e <strong>histerectomia puerperal em monobloco com a placenta mantida intacta in situ</strong>.<br>
<em>Análise dos distratores:</em><br>
A: Errada e fatal; tentar descolar a placenta percreta causa hemorragia incontrolável.<br>
C: Errada; aguardar o termo eleva o risco de trabalho de parto espontâneo de urgência.<br>
D: Errada; placenta prévia é contraindicação absoluta a parto vaginal.<br>
E: Errada; metotrexato pré-operatório não possui benefício comprovado e eleva a morbidade materna.</p>

<h3>Questão 10 (Residência Médica / HC-UFPR)</h3>
<p>Parturiente de 23 anos, secundigesta (um parto vaginal anterior a termo), com 38 semanas de gestação e hipertensão gestacional controlada, dá entrada em trabalho de parto na maternidade. Apresenta dilatação cervical de 8 cm, 100% apagado, bolsa íntegra, contrações dolorosas e sangramento escuro discreto. A cardiotocografia basal revela padrão fetal tranquilizador da categoria I (FCF = 140 bpm, com acelerações e boa variabilidade). O tônus uterino é discretamente elevado, porém há relaxamento palpável entre as contrações, configurando suspeita de Descolamento Prematuro de Placenta Grau 1 de Sher leve em fase inicial. Qual é a conduta obstétrica mais apropriada para a condução do caso?</p>
<p><strong>A)</strong> Realizar cesariana de emergência imediata sob anestesia geral, mesmo com o feto em ótimas condições e dilatação avançada.<br>
<strong>B)</strong> Realizar amniotomia precoce imediata, manter monitorização cardiotocográfica contínua da FCF e permitir a evolução do trabalho de parto por via vaginal, estando a equipe cirúrgica de prontidão para cesariana imediata se surgir sofrimento fetal.<br>
<strong>C)</strong> Administrar tocolítico intravenoso potente para interromper o trabalho de parto e postergar o nascimento para 40 semanas.<br>
<strong>D)</strong> Realizar punção e drenagem do hematoma retroplacentário por via transvaginal guiada por agulha.<br>
<strong>E)</strong> Administrar heparina não fracionada em infusão contínua para prevenir a trombose das artérias espiraladas.</p>
<p><strong>Gabarito Comentado:</strong></p>
<p><strong>Alternativa B está CORRETA.</strong> No DPP Grau 1 (leve) em gestação a termo, com <strong>feto vivo e vitalidade perfeitamente preservada</strong> (categoria I), associado a <strong>dilatação cervical avançada (8 cm) em paciente multípara</strong>, a conduta obstétrica autorizada é o <strong>parto por via vaginal monitorizado</strong>. O gesto técnico mandatório é a <strong>amniotomia precoce imediata</strong>, que reduz a pressão intrauterina, previne a expansão retrógrada do descolamento, diminui a liberação de tromboplastina para o sangue materno e acelera o período expulsivo. A equipe cirúrgica deve permanecer de prontidão imediata caso surja qualquer desaceleração anormal da FCF que imponha cesariana de urgência.<br>
<em>Análise dos distratores:</em><br>
A: Não é obrigatória na fase avançada com feto hígido e parto iminente.<br>
C: Tocolítico é contraindicado no DPP.<br>
D: Inexistente e causaria infecção e sangramento cataclísmico.<br>
E: Heparina é contraindicada na hemorragia anteparto ativa.</p>
`
    },
    {
      id: 'manejo-conservador-dpp-pre-termo',
      title: '14. Critérios Rígidos para Conduta Conservadora de Exceção no DPP Pré-Termo Leve',
      body_html: `
<h3>A Conduta Conservadora no DPP: Uma Exceção Rigorosamente Selecionada</h3>
<p>Embora a regra cardeal da obstetrícia dite que "o tratamento definitivo do Descolamento Prematuro de Placenta é o parto", existe um cenário clínico de extrema exceção no qual a <strong>conduta conservadora e expectante com postergação do nascimento</strong> pode ser adotada com segurança com o objetivo primordial de propiciar a maturação pulmonar fetal:</p>
<p><strong>Critérios Cumulativos Obrigatórios de Inclusão (Todos Devem Estar Presentes):</strong></p>
<ul>
  <li><strong>1. Idade Gestacional Muito Pré-Termo:</strong> Típica entre <strong>24+0 e 33+6 semanas de gestação</strong> (especialmente antes de 32 semanas, onde a morbimortalidade por imaturidade pulmonar e hemorragia peri-intraventricular neonatal é extrema);</li>
  <li><strong>2. Descolamento Prematuro Parcial Leve (Grau 1 de Sher):</strong> Descolamento retroplacentário limitado a uma pequena fração marginal da placenta (hematoma retroplacentário &lt; 25% a 30% da área placentária);</li>
  <li><strong>3. Sangramento Genital Escasso ou em Remissão:</strong> Sangramento de pequeno volume que cessa ou reduz acentuadamente após repouso;</li>
  <li><strong>4. Estabilidade Hemodinâmica Materna Rigorosa:</strong> Pressão arterial controlada, frequência cardíaca normal e ausência de sintomas de hipoperfusão;</li>
  <li><strong>5. Ausência de Hipertonia Uterina Sustentada:</strong> Útero com tônus normal ou apenas irritabilidade miometrial leve transitória;</li>
  <li><strong>6. Vitalidade Fetal Estritamente Normal e Reativa:</strong> Cardiotocografia contínua demonstrando padrão de Categoria I (ausência de desacelerações tardias ou variáveis graves) e perfil biofísico fetal normal com Doppler de artéria umbilical com fluxo diastólico presente e normal;</li>
  <li><strong>7. Coagulograma e Níveis de Fibrinogênio Normais:</strong> Fibrinogênio sérico &ge; 250 a 300 mg/dL e contagem de plaquetas preservada;</li>
  <li><strong>8. Internação em Hospital Terciário com UTI e Centro Cirúrgico Imediato 24 Horas:</strong> Capacidade de transferir a paciente para a sala cirúrgica e extrair o feto em menos de 10 a 15 minutos a qualquer momento.</li>
</ul>

<h3>Protocolo de Tratamento e Vigilância Hospitalar</h3>
<ol>
  <li><strong>Corticoterapia Antenatal Imediata:</strong> Administração de <strong>Betametasona 12 mg IM em duas doses</strong> com intervalo de 24 horas (ou Dexametasona 6 mg IM a cada 12 horas por 4 doses) para acelerar a produção de surfactante pulmonar alveolar e reduzir enterocolite necrosante e hemorragia intraventricular;</li>
  <li><strong>Neuroproteção Fetal com Sulfato de Magnésio:</strong> Se a idade gestacional for &lt; 32 semanas e houver risco de parto prematuro iminente nos próximos dias;</li>
  <li><strong>Monitorização Materno-Fetal Contínua:</strong> Cardiotocografia contínua ou seriada (3 vezes ao dia), ultrassonografia seriada com Doppler a cada 48 a 72 horas para acompanhar as dimensões do hematoma retroplacentário e a circulação fetoplacentária, e dosagem seriada diária de hemograma, plaquetas e fibrinogênio sérico;</li>
  <li><strong>Critérios de Interrupção Imediata da Conduta Conservadora:</strong> Surgimento de qualquer sinal de sofrimento fetal agudo na cardiotocografia, recrudescimento da dor abdominal, aparecimento de hipertonia uterina sustentada, piora do sangramento vaginal com instabilidade materna, queda do fibrinogênio sérico para &lt; 200 mg/dL ou atingimento de 34 a 35 semanas completas de gestação.</li>
</ol>
`
    },
    {
      id: 'acretismo-placentario-estrategias-conservadoras-utero',
      title: '15. Preservação Uterina no Acretismo Placentário e Alternativas Cirúrgicas Conservadoras',
      body_html: `
<h3>A Conduta Conservadora no Acretismo Placentário (Preservação Uterina)</h3>
<p>Embora a cesariana com histerectomia puerperal em monobloco com a placenta <em>in situ</em> represente o padrão-ouro de segurança para evitar hemorragias maciças no acretismo placentário grave, existem situações excepcionais nas quais a <strong>preservação cirúrgica do útero</strong> é solicitada pela paciente por forte desejo de fertilidade futura ou adotada pelo cirurgião em casos selecionados de acretismo focal superficial.</p>

<p><strong>Modalidades de Manejo Conservador da Placenta Acreta:</strong></p>
<ol>
  <li><strong>Técnica de Deixar a Placenta In Situ (Tratamento Conservador Puro):</strong>
    <p>O concepto é extraído por histerotomia fúndica alta. O cordão umbilical é ligado rente à sua inserção cotiledonar. <strong>Nenhuma tentativa de descolamento manual é realizada</strong>. A histerotomia é suturada e a cavidade abdominal é fechada, deixando a placenta aderida dentro do útero para que ocorra a sua necrose avascular e reabsorção biológica espontânea lenta ao longo de meses.</p>
    <ul>
      <li><em>Monitorização:</em> Acompanhamento ambulatorial rigoroso semanal com ultrassonografia com Doppler para documentar a perda de vascularização placentária e dosagens de &beta;-hCG sérico;</li>
      <li><em>Tempo de Reabsorção:</em> Varia de <strong>2 a 6 meses</strong>;</li>
      <li><em>Complicações Maiores:</em> Alto índice de <strong>infecção puerperal grave / sepse intrauterina (20% a 30%)</strong> e <strong>hemorragia tardia com necessidade de histerectomia de urgência secundária em até 20% a 40% das pacientes</strong>;</li>
      <li><em>Papel do Metotrexato Pós-Parto:</em> <strong>NÃO É RECOMENDADO!</strong> Antigamente prescrevia-se metotrexato sistêmico para acelerar a lise placentária pós-parto. Contudo, estudos clínicos demonstraram que o trofoblasto a termo não possui células em divisão rápida suficientes para justificar o antimetabólito, e o fármaco eleva dramaticamente o risco de necrose tecidual séptica acelerada, supressão medular e morte materna por infecção.</li>
    </ul>
  </li>
  <li><strong>Ressecção Miometrial Focal e Reconstrução Uterina (Técnica Triple-P ou Cirurgia Local):</strong>
    <p>Aplicável exclusivamente nos casos de <strong>acretismo focal parcial</strong> que acomete uma área restrita e bem delimitada do miométrio anterior (&lt; 25% a 30% da circunferência uterina). Envolve: (1) Delimitação e desvascularização local prévia; (2) Ressecção cuneiforme em bloco de toda a área miometrial infiltrada juntamente com a placenta aderida; e (3) Histerorrafia reconstrutiva primária do defeito miometrial com sutura hemostática em múltiplos planos. Apresenta alta taxa de sucesso de preservação uterina quando realizada por cirurgiões altamente capacitados em centros especializados.</p>
  </li>
</ol>
`
    }
  ],
  references: [
    {
      title: 'SMFM Consult Series #44 — Management of Bleeding in the Late Preterm Period (Reaffirmed 2024)',
      url: 'https://publications.smfm.org'
    },
    {
      title: 'RCOG Green-top Guideline No. 27a — Placenta Praevia and Placenta Accreta: Diagnosis and Management',
      url: 'https://www.rcog.org.uk'
    },
    {
      title: 'ACOG Practice Bulletin No. 262 — Placenta Accreta Spectrum',
      url: 'https://www.acog.org'
    },
    {
      title: 'FEBRASGO — Tratado de Obstetrícia: Descolamento Prematuro de Placenta e Placenta Prévia',
      url: 'https://www.febrasgo.org.br'
    },
    {
      title: 'Ministério da Saúde do Brasil — Manual de Gestação de Alto Risco e Urgências Obstétricas (2022/2024)',
      url: 'https://www.gov.br/saude'
    }
  ]
};

const chars = saveBook(book064);
console.log(`[CONCLUIDO] Aula 064 - Placenta Previa e DPP gravada com ${chars} caracteres uteis.`);
