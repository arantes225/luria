import { saveBook } from './bloco-02-utils.mjs';

const book = {
  slug: 'endocardite-infecciosa',
  title: 'Endocardite Infecciosa',
  area: 'Clínica Médica',
  materia: 'Cardiologia e Infectologia',
  description: 'Tratado clínico-cirúrgico completo sobre Endocardite Infecciosa: fisiopatologia endotelial, microbiologia clássica e fastidiosa, critérios de Duke-ISCVID 2023 e ESC 2023, multimodalidade de imagem, antibioticoterapia direcionada, indicações cirúrgicas e profilaxia.',
  sections: [
    {
      id: 'fisiopatologia-endotelial-vegetacao',
      title: '1. Definição, Epidemiologia Contemporânea e Fisiopatologia da Vegetação Endocárdica',
      body_html: `
<h3>Conceito Anatômico-Clínico e Transição Epidemiológica</h3>
<p>A endocardite infecciosa (EI) consiste na infecção microbiana da superfície endotelial do coração, acometendo predominantemente os folhetos valvares nativos (endocardite de valva nativa — EVN), próteses valvares mecânicas ou biológicas (endocardite de valva protética — EVP) e dispositivos cardíacos eletrônicos implantáveis (DCEI, como marca-passos definitivos e cardiodesfibriladores implantáveis), além do endocárdio mural adjacente a defeitos septais ou cordoalhas tendíneas. A lesão anatomopatológica elementar e patognomônica da doença é a <strong>vegetação endocárdica</strong>: uma massa amorfa e friável composta por agregados plaquetários, malha densa de fibrina, colônias de microrganismos em alta densidade populacional (frequentemente organizadas em biofilmes) e escassas células inflamatórias nas camadas profundas.</p>
<p>Historicamente, no Brasil e em países em desenvolvimento, a cardiopatia reumática crônica representava o principal substrato estrutural predisponente, determinando quadros subagudos em adultos jovens colonizados por estreptococos orais do grupo <em>viridans</em>. Nas últimas três décadas, entretanto, consolidou-se uma profunda transição epidemiológica: embora a valvopatia reumática permaneça relevante no Sistema Único de Saúde (SUS), observa-se expressivo crescimento da endocardite associada à assistência à saúde (nosocomial e não nosocomial relacionada a hemodiálise, cateteres venosos centrais de longa permanência e quimioterapia), da endocardite em idosos portadores de calcificação degenerativa valvar aórtica ou mitral, do acometimento de próteses valvares cirúrgicas ou transcateter (TAVI) e da endocardite infecciosa em usuários de drogas injetáveis (UDI). Consequentemente, o <em>Staphylococcus aureus</em> ultrapassou os estreptococos orais como agente etiológico globalmente mais prevalente nas coortes contemporâneas (como o registro ICE-PCS e o EURO-ENDO).</p>

<h3>Patogênese Sequencial: Do Endotélio Íntegro à Vegetação Séptica</h3>
<p>O endotélio valvar normal e íntegro apresenta notável resistência intrínseca à colonização e à formação de trombos, propriedade assegurada pela expressão contínua de prostaciclinas, óxido nítrico, trombomodulina e sulfato de heparan. O desenvolvimento da endocardite infecciosa requer, via de regra, a convergência sequencial de quatro eventos fisiopatológicos fundamentais: lesão endotelial mecânica ou inflamatória, formação da endocardite trombótica não bacteriana (ETNB), bacteremia transitória ou persistente com aderência microbiana mediada por adesinas específicas, e maturação da vegetação com evasão imune.</p>

<h4>1. Lesão Endotelial Hemodinâmica e Efeito Venturi</h4>
<p>A injúria endotelial inicial decorre habitualmente de jatos sanguíneos turbulentos de alta velocidade gerados por gradientes pressóricos através de orifícios estenóticos ou regurgitantes. Pela física dos fluidos e pelo <strong>efeito Venturi</strong>, quando um jato de sangue atravessa um orifício estreito sob alta pressão para uma câmara receptora de menor pressão, a queda abrupta da pressão lateral imediatamente a jusante (<em>downstream</em>) do orifício produz intenso estresse de cisalhamento (<em>shear stress</em>) e deposição preferencial de plaquetas na face de menor pressão da estrutura valvar. Esse princípio hemodinâmico explica com precisão cirúrgica a topografia clássica das vegetações:</p>
<ul>
  <li><strong>Insuficiência mitral e estenose mitral:</strong> o jato regurgitante dirige-se do ventrículo esquerdo (alta pressão sistólica) para o átrio esquerdo (baixa pressão); por conseguinte, as vegetações instalam-se classicamente na <strong>face atrial</strong> dos folhetos mitrais e na parede atrial posterior (lesão de jato de MacCallum).</li>
  <li><strong>Insuficiência aórtica:</strong> o jato regurgitante diastólico retorna da aorta para a via de saída do ventrículo esquerdo; assim, as vegetações localizam-se preferencialmente na <strong>face ventricular</strong> das cúspides semilunares aórticas, podendo produzir lesões satélite de impacto ("<em>kissing lesions</em>") no folheto anterior da valva mitral ou nas cordoalhas tendíneas.</li>
  <li><strong>Comunicação interventricular (CIV):</strong> o <em>shunt</em> esquerda-direita de alta velocidade lesa o endocárdio do ventrículo direito adjacente à borda direita do defeito septal, onde a vegetação se aloja.</li>
</ul>

<h4>2. Endocardite Trombótica Não Bacteriana (ETNB) e Endotelialite Inflamatória</h4>
<p>Uma vez desnudado o endotélio valvar, ocorre exposição direta do colágeno subendotelial, da fibronectina, da laminina, da vitronectina e do fator tecidual à corrente sanguínea. A ativação da cascata de coagulação e a adesão plaquetária mediada pelo fator de von Willebrand (vWF) e pelas integrinas GPIIb/IIIa resultam na formação de um microtrombo estéril de plaquetas e fibrina denominado <strong>endocardite trombótica não bacteriana (ETNB)</strong> — historicamente conhecida como endocardite marântica quando associada a estados de hipercoagulabilidade neoplásica ou como endocardite de Libman-Sacks no lúpus eritematoso sistêmico. Alternativamente, mesmo na ausência de lesão mecânica prévia, patógenos altamente virulentos como o <em>Staphylococcus aureus</em> conseguem invadir o endotélio morfologicamente intacto caso haja expressão endotelial induzida por citocinas (TNF-alfa, IL-1) de integrinas beta-1 (VLA) que se ligam à fibronectina plasmática, criando uma ponte molecular para a internalização bacteriana.</p>

<h4>3. Bacteremia, MSCRAMMs e Biofilme</h4>
<p>Para que a ETNB se converta em vegetação infectada, uma bacteremia (espontânea durante a mastigação e escovação dentária em pacientes com doença periodontal grave, ou induzida por procedimentos invasivos odontológicos, gastrointestinais, geniturinários ou punções vasculares) deve expor o trombo estéril a microrganismos dotados de capacidade de aderência. Os cocos Gram-positivos expressam proteínas de superfície especializadas denominadas <strong>MSCRAMMs</strong> (<em>Microbial Surface Components Recognizing Adhesive Matrix Molecules</em>):</p>
<ul>
  <li><strong><em>Staphylococcus aureus</em>:</strong> expressa fatores de aglutinação A e B (<em>ClfA</em> e <em>ClfB</em>, que se ligam ao fibrinogênio e à fibrina), proteínas ligadoras de fibronectina A e B (<em>FnBPA</em> e <em>FnBPB</em>, essenciais para invasão endotelial direta), proteína A estafilocócica (que bloqueia a porção Fc das imunoglobulinas IgG, impedindo a opsonização) e coagulase, que promove a deposição adicional de fibrina ao redor da colônia bacteriana.</li>
  <li><strong><em>Streptococcus</em> do grupo <em>viridans</em> (ex.: <em>S. sanguinis</em>, <em>S. mutans</em>, <em>S. mitis</em>):</strong> sintetizam polissacarídeos extracelulares insolúveis de alto peso molecular (dextranos e glucanos) a partir da sacarose, além de adesinas de superfície como FimA e proteínas ligadoras de ácido lipoteicoico, conferindo extraordinária afinidade pela matriz de fibrina-plaquetas de valvas previamente lesadas.</li>
  <li><strong><em>Enterococcus faecalis</em>:</strong> expressa a proteína de superfície Esp, a adesina de colágeno <em>Ace</em> (<em>Adhesin of Collagen from Enterococci</em>) e substância de agregação codificada por plasmídeos responsivos a feromônios, promovendo formação de biofilmes densos.</li>
</ul>

<h4>4. Santuário Metabólico, Inércia Antimicrobiana e Destruição Tecidual</h4>
<p>À medida que os microrganismos proliferam no interior da malha de fibrina, estimulam nova agregação plaquetária (via fator tecidual monocitário e ativação direta de plaquetas) que recobre as colônias com camadas concêntricas de trombo. Forma-se, assim, um <strong>santuário avascular e paucicelular</strong>: os neutrófilos polimorfonucleares não conseguem penetrar a densa barreira de fibrina, e as bactérias situadas no núcleo profundo da vegetação atingem densidades de 10⁹ a 10¹¹ unidades formadoras de colônias (UFC) por grama de tecido. Nessa região central hipóxica e carente de nutrientes, as bactérias entram em fase estacionária de crescimento (dormência metabólica ou estado <em>persister</em>), reduzindo drasticamente a síntese de parede celular e de proteínas. Esse fenômeno explica por que a cura da endocardite infecciosa exige <strong>antibióticos bactericidas em altas doses parenterais por tempo prolongado (4 a 6 semanas)</strong>, e por que antibióticos que atuam exclusivamente na parede em divisão ativa (beta-lactâmicos) podem exibir efeito inóculo ou necessitar de sinergismo com aminoglicosídeos ou rifampicina (em próteses com biofilme estafilocócico).</p>

<table class="book-table">
  <thead>
    <tr>
      <th>Característica Clínica e Patológica</th>
      <th>Endocardite Aguda ("Maligna")</th>
      <th>Endocardite Subaguda ("Lenta")</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>Protótipo Microbiológico</strong></td>
      <td><em>Staphylococcus aureus</em>, <em>Streptococcus pneumoniae</em>, <em>Streptococcus pyogenes</em>, <em>Neisseria gonorrhoeae</em></td>
      <td><em>Streptococcus</em> do grupo <em>viridans</em>, <em>Streptococcus gallolyticus</em>, <em>Enterococcus</em> spp., grupo HACEK</td>
    </tr>
    <tr>
      <td><strong>Substrato Valvar Preexistente</strong></td>
      <td>Frequentemente acomete valvas <strong>morfologicamente normais</strong> (50–60% dos casos), além de próteses e valvas lesadas</td>
      <td>Quase invariavelmente requer valva previamente anormal (reumática, prolapso mitral com regurgitação, bicúspide, calcificada)</td>
    </tr>
    <tr>
      <td><strong>Evolução Temporal</strong></td>
      <td>Fulminante (dias a poucas semanas); rápida deterioração hemodinâmica e choque séptico</td>
      <td>Insidiosa (semanas a meses); febre baixa vespertina, sudorese noturna, perda ponderal, anemia de doença crônica</td>
    </tr>
    <tr>
      <td><strong>Potencial Destrutivo Local e Metastático</strong></td>
      <td>Elevadíssimo: perfuração rápida de cúspides, ruptura de cordoalhas, abscessos anulares e êmbolos sépticos supurativos à distância</td>
      <td>Destruição valvar progressiva e mais lenta; embolizações costumam produzir infartos assépticos (raramente abcedados) e ricos fenômenos imunológicos</td>
    </tr>
  </tbody>
</table>
`
    },
    {
      id: 'microbiologia-clinica-correlacoes',
      title: '2. Microbiologia Clínica Detalhada e Correlações Epidemiológicas de Prova',
      body_html: `
<h3>Panorama Etiológico e Associação com Porta de Entrada</h3>
<p>A identificação precisa do agente etiológico na endocardite infecciosa não apenas determina o regime antimicrobiano e sua duração, mas também aponta diretamente para a porta de entrada anatômica e obriga o clínico a investigar patologias ocultas subjacentes (como neoplasias gastrointestinais). Mais de 80% a 85% de todos os casos de EI com cultura positiva são causados por cocos Gram-positivos (estafilococos, estreptococos e enterococos).</p>

<h4>1. Estafilococos: <em>Staphylococcus aureus</em> e Estafilococos Coagulase-Negativos (ECN)</h4>
<p>O <strong><em>Staphylococcus aureus</em></strong> é hoje o agente global nº 1 da endocardite infecciosa em casuísticas internacionais, liderando três cenários clínicos clássicos: endocardite aguda em valva nativa previamente normal, endocardite relacionada a cuidados de saúde (cateteres de hemodiálise, acessos venosos centrais, feridas operatórias) e endocardite em usuários de drogas endovenosas. Apresenta tropismo tanto pelas câmaras esquerdas (onde cursa com altas taxas de insuficiência cardíaca aguda por destruição valvar, abscessos perivalvares e embolização para o sistema nervoso central) quanto pela valva tricúspide em usuários de drogas injetáveis. As cepas resistentes à meticilina/oxacilina (<strong>MRSA</strong>) predominam em infecções nosocomiais, pacientes dialíticos e institucionalizados, embora cepas comunitárias (CA-MRSA) também ocorram.</p>
<p>Os <strong>estafilococos coagulase-negativos (ECN)</strong>, liderados pelo <em>Staphylococcus epidermidis</em>, são comensais cutâneos dotados de extraordinária capacidade de produção de <em>slime</em> (biofilme polissacarídico intercelular) sobre biomateriais sintéticos. Por essa razão, o <em>S. epidermidis</em> é o principal agente da <strong>endocardite de valva protética (EVP) precoce</strong> (aquela que se manifesta nos primeiros 12 meses — especialmente nos primeiros 60 dias — após a cirurgia de troca valvar) e de infecções de cabos de marca-passo/CDI, apresentando elevadas taxas de resistência à oxacilina (MRSE).</p>
<p>Merece destaque especial em provas de residência um estafilococo coagulase-negativo (embora frequentemente positivo no teste de fator de aglutinação em lâmina): o <strong><em>Staphylococcus lugdunensis</em></strong>. Diferentemente do <em>S. epidermidis</em>, o <em>S. lugdunensis</em> acomete predominantemente <strong>valvas nativas</strong> (sobretudo aórtica e mitral), tendo como porta de entrada a pele da região inguinal, perineal e extremidades inferiores (ex.: pós-vasectomia, cateterismo via artéria femoral, infecções cutâneas perineais). Seu comportamento clínico mimetiza o <em>S. aureus</em> em virulência, causando destruição valvar fulminante, formação de abscessos anulares e necessidade cirúrgica em mais de 50% dos casos, embora a maioria das cepas mantenha sensibilidade à oxacilina e até à penicilina.</p>

<h4>2. Estreptococos Orais (Grupo <em>Viridans</em>)</h4>
<p>Os estreptococos do grupo <em>viridans</em> (alfa-hemolíticos e não hemolíticos da microbiota orofaríngea: <em>Streptococcus mitis</em>, <em>S. sanguinis</em>, <em>S. mutans</em>, <em>S. salivarius</em>, <em>S. oralis</em>) continuam sendo a causa mais comum de endocardite comunitária subaguda em valvas nativas previamente lesadas (especialmente na cardiopatia reumática crônica e no prolapso da valva mitral com degeneração mixomatosa e sopro regurgitante). Um subgrupo particular dentro dos estreptococos orais é o <strong>grupo <em>Streptococcus anginosus</em></strong> (anteriormente chamado de <em>Streptococcus milleri</em>, englobando <em>S. anginosus</em>, <em>S. constellatus</em> e <em>S. intermedius</em>): ao contrário dos demais <em>viridans</em>, esse grupo possui acentuada tendência à formação de <strong>abscessos piogênicos metastáticos</strong> (abscesso cerebral, hepático, esplênico, empiema pleural) e abscessos do anel valvar, exigindo rastreamento tomográfico ativo de coleções ocultas.</p>

<h4>3. <em>Streptococcus gallolyticus</em> (Antigo <em>Streptococcus bovis</em>) e Neoplasia Colônica</h4>
<p>O complexo <em>Streptococcus bovis</em> / <em>Streptococcus equinus</em> (estreptococos do grupo D de Lancefield não enterocócicos) sofreu reclassificação taxonômica crucial para a prática clínica e para as provas de residência. O antigo <em>Streptococcus bovis</em> biótipo I é hoje denominado <strong><em>Streptococcus gallolyticus</em> subespécie <em>gallolyticus</em></strong>. Esse microrganismo habita o trato gastrointestinal humano e apresenta uma associação patogênica e epidemiológica fortíssima (50% a 80% dos casos) com <strong>adenomas vilosos/tubulovilosos avançados e adenocarcinoma colorretal</strong>, além de diverticulose e hepatopatia crônica. A bactéria expressa proteínas pilus (Pil1) que se ligam com alta afinidade ao colágeno tipo I e IV superexpresso na mucosa displásica ou neoplásica do cólon, facilitando a translocação bacteriana silenciosa para a circulação porta e sistêmica, frequentemente meses ou anos antes que o tumor produza sintomas intestinais ou sangramento digestivo.</p>
<p><strong>Regra de Ouro para Residência Médica:</strong> Todo paciente com bacteremia ou endocardite infecciosa por <em>Streptococcus gallolyticus</em> (<em>S. bovis</em>) tem <strong>indicação formal e obrigatória de colonoscopia completa</strong> durante a internação (assim que estabilizado hemodinamicamente) para investigação de neoplasia ou pólipos pré-malignos do cólon. Caso a colonoscopia seja normal e haja disfunção hepática ou biliar, investiga-se também o trato hepatobiliar. Já o biótipo II/2 (<em>Streptococcus gallolyticus</em> subsp. <em>pasteurianus</em>) associa-se mais frequentemente a neoplasias hepatobiliares/pancreáticas e meningite neonatal/geriátrica.</p>

<h4>4. <em>Enterococcus</em> spp.</h4>
<p>Os enterococos (coco Gram-positivo em cadeias curtas ou pares, catalase-negativo, capaz de crescer em NaCl a 6,5% e hidrolisar bile-esculina) respondem por 10% a 15% das endocardites infecciosas, sendo representados em cerca de 90% das vezes pelo <strong><em>Enterococcus faecalis</em></strong> e em menos de 5% a 10% pelo <strong><em>Enterococcus faecium</em></strong> (este último frequentemente multirresistente à ampicilina e à vancomicina — VRE). Acometem tipicamente homens idosos submetidos a manipulação geniturinária (cistoscopia, ressecção transuretral de próstata, sondagem vesical de demora), mulheres jovens no pós-parto/pós-abortamento ou pacientes com patologias gastrointestinais. De forma semelhante ao <em>S. gallolyticus</em>, estudos recentes demonstraram que a endocardite por <em>Enterococcus faecalis</em> de foco criptogênico (sem foco urinário óbvio) associa-se a lesões neoplásicas ou adenomatosas colorretais em até 25% a 30% dos casos, razão pela qual a Diretriz da Sociedade Europeia de Cardiologia (ESC 2023) passou a recomendar colonoscopia eletiva também nesses pacientes.</p>

<h4>5. Grupo HACEK e Estreptococos Nutricionalmente Variantes</h4>
<p>O acrônimo <strong>HACEK</strong> reúne cinco gêneros de bacilos e cocobacilos Gram-negativos fastidiosos, colonizadores habituais da cavidade oral e do trato respiratório superior, que causam cerca de 1% a 3% das endocardites comunitárias subagudas (frequentemente cursando com vegetações volumosas e embolização sistêmica):</p>
<ul>
  <li><strong>H</strong> — <em>Haemophilus</em> spp. (especialmente <em>Haemophilus parainfluenzae</em>; <em>Aggregatibacter aphrophilus</em> anteriormente era classificado como <em>Haemophilus aphrophilus</em>).</li>
  <li><strong>A</strong> — <em>Aggregatibacter</em> spp. (<em>Aggregatibacter actinomycetemcomitans</em>, fortemente associado à periodontite agressiva, e <em>A. aphrophilus</em> / <em>A. paraphrophilus</em>).</li>
  <li><strong>C</strong> — <em>Cardiobacterium</em> spp. (<em>Cardiobacterium hominis</em> e <em>C. valvarum</em>).</li>
  <li><strong>E</strong> — <em>Eikenella corrodens</em> (associada a mordeduras humanas, manipulação dentária e uso de drogas injetáveis em que o usuário lambe a agulha antes da injeção).</li>
  <li><strong>K</strong> — <em>Kingella</em> spp. (<em>Kingella kingae</em> e <em>K. denitrificans</em>).</li>
</ul>
<p>Historicamente, os organismos HACEK eram uma causa clássica de endocardite com hemoculturas negativas porque exigiam incubação prolongada de 14 a 21 dias. Com os sistemas automatizados modernos de hemocultura (como BACTEC e BacT/ALERT), entretanto, <strong>os microrganismos HACEK crescem dentro do período padrão de 5 dias</strong> na imensa maioria dos casos. Já os estreptococos nutricionalmente variantes — atualmente classificados nos gêneros <strong><em>Abiotrophia defectiva</em></strong> e <strong><em>Granulicatella</em> spp.</strong> (<em>G. adiacens</em>, <em>G. elegans</em>) — exigem piridoxal (vitamina B6) ou L-cisteína no meio de cultura para crescerem (apresentando satelitismo ao redor de colônias de <em>S. aureus</em> em ágar sangue), cursam com taxas mais altas de falha terapêutica e recidiva, e são tratados de forma análoga aos enterococos ou estreptococos com CIM elevada para penicilina.</p>

<h4>6. Endocardite Infecciosa em Usuários de Drogas Injetáveis (UDI) e de Câmaras Direitas</h4>
<p>A endocardite de câmaras direitas representa 5% a 10% do total de casos de EI e ocorre majoritariamente em usuários de drogas endovenosas, portadores de DCEI (marca-passo/CDI), cateteres venosos centrais de longa permanência ou cardiopatias congênitas com <em>shunt</em>. A <strong>valva tricúspide</strong> é acometida em mais de 90% dos casos em usuários de drogas injetáveis (devido ao bombardeamento endotelial repetido por micropartículas de talco, celulose e amido presentes nos diluentes das drogas ilícitas, somado à carga bacteriana da pele do próprio paciente). O <strong><em>Staphylococcus aureus</em></strong> responde por 60% a 90% das endocardites tricúspides em UDI. Outros agentes peculiares nesse grupo incluem <em>Pseudomonas aeruginosa</em> e <em>Serratia marcescens</em> (associadas ao uso de água não estéril na diluição de pentazocina e heroína), <em>Candida</em> spp. (especialmente <em>Candida parapsilosis</em> e <em>C. tropicalis</em>, ou <em>C. albicans</em> quando heroína marrom é dissolvida em suco de limão contaminado) e infecções polimicrobianas.</p>

<h4>7. Endocardite com Hemoculturas Negativas (EIHN) e Endocardite Fúngica</h4>
<p>As hemoculturas permanecem negativas em 10% a 20% dos pacientes com diagnóstico confirmado de endocardite infecciosa. A <strong>causa mais comum em absoluto</strong> de endocardite com hemoculturas negativas é o <strong>uso prévio de antimicrobianos</strong> antes da coleta das amostras sanguíneas (responsável por mais da metade dos casos, frequentemente envolvendo estreptococos orais ou estafilococos coagulase-negativos parcialmente suprimidos). As verdadeiras endocardites com hemoculturas negativas por patógenos intracelulares obrigatórios ou fastidiosos exigem diagnóstico sorológico, biologia molecular (PCR de sangue ou tecido valvar explantado) ou imuno-histoquímica:</p>
<ul>
  <li><strong><em>Coxiella burnetii</em> (Agente da Febre Q crônica):</strong> é a principal causa zoonótica mundial de EIHN verdadeira. Adquirida pela inalação de aerossóis de placenta, líquido amniótico, leite ou fezes de gado bovino, ovino e caprino. Acomete pacientes com valvopatia prévia ou prótese valvar e confirma-se por sorologia demonstrando <strong>IgG antifase I &ge; 1:800</strong> (critério maior de Duke) ou PCR positiva. O tratamento requer doxiciclina (100 mg VO 12/12h) associada à hidroxicloroquina (200 mg VO 8/8h, que alcaliniza o vacúolo fagolisossomal permitindo a ação bactericida da doxiciclina) por 18 meses (valva nativa) a 24 meses (valva protética).</li>
  <li><strong><em>Bartonella</em> spp. (<em>B. quintana</em> e <em>B. henselae</em>):</strong> <em>Bartonella quintana</em> é transmitida pelo piolho corporal humano (<em>Pediculus humanus corporis</em>) e acomete classicamente pessoas em situação de rua, etilistas crônicos e populações vulneráveis sem acesso à higiene ("febre das trincheiras"). <em>Bartonella henselae</em> associa-se ao contato com gatos (arranhadura/pulga do gato) e valvopatia prévia. Ambas causam endocardite predominantemente aórtica, com destruição valvar acentuada e títulos elevados de IgG (&ge; 1:800, podendo haver reação cruzada com <em>Chlamydia</em>). Curiosamente, a endocardite por <em>Bartonella</em> frequentemente induz positividade para <strong>PR3-ANCA (c-ANCA)</strong> e glomerulonefrite pauci-imune, mimetizando granulomatose com poliangiíte.</li>
  <li><strong><em>Tropheryma whipplei</em> (Agente da Doença de Whipple):</strong> causa endocardite afebril, indolente, em homens de meia-idade com artralgias migratórias crônicas, diarreia/má absorção ou sem sintomas gastrointestinais prévios. O diagnóstico quase sempre é firmado na valva explantada por histopatologia (macrófagos repletos de inclusões <strong>PAS-positivas</strong> resistentes à diastase), imuno-histoquímica ou PCR específica para <em>T. whipplei</em>.</li>
  <li><strong>Outros agentes raros e fúngicos:</strong> <em>Brucella</em> spp. (ingestão de laticínios não pasteurizados, exposição ocupacional veterinária/abatedouros), <em>Legionella</em> spp. (pós-operatório hospitalar), <em>Mycoplasma</em> spp., micobactérias não tuberculosas de crescimento rápido (como <em>Mycobacterium chimaera</em>, transmitida por aerossóis de dispositivos permutadores de calor contaminados durante circulação extracorpórea em cirurgia cardíaca, manifestando-se meses a anos após o implante protético com febre, pancitopenia e granulomas sistêmicos — sarcoide-símile) e fungos (<strong><em>Candida</em> spp.</strong>, que geralmente cresce em hemoculturas convencionais e forma grandes vegetações friáveis em próteses, usuários de CVC/nutrição parenteral total e UDI, e <strong><em>Aspergillus</em> spp.</strong>, cujas hemoculturas são quase sempre negativas, exigindo pesquisa de galactomanana sérica ou histologia do êmbolo arterial/valva após cirurgia cardíaca).</li>
</ul>

<table class="book-table">
  <thead>
    <tr>
      <th>Cenário Clínico-Epidemiológico</th>
      <th>Agente(s) Mais Provável(is)</th>
      <th>Peculiaridade Clínica / Investigação Mandatória</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Valva nativa previamente lesada + manipulação dentária ou má conservação oral</td>
      <td><em>Streptococcus</em> grupo <em>viridans</em> (<em>mitis, sanguinis, mutans</em>), grupo HACEK</td>
      <td>Curso subagudo; fenômenos imunológicos frequentes; avaliar saúde bucal completa</td>
    </tr>
    <tr>
      <td>Idoso com pólipos/neoplasia colônica oculta ou diverticulose</td>
      <td><em>Streptococcus gallolyticus</em> subsp. <em>gallolyticus</em> (antigo <em>S. bovis</em> I)</td>
      <td>Colonoscopia obrigatória durante a internação (associação em 50–80% com lesão colônica)</td>
    </tr>
    <tr>
      <td>Manipulação urológica / trato gastrointestinal / idoso</td>
      <td><em>Enterococcus faecalis</em> (e <em>E. faecium</em>)</td>
      <td>Resistência intrínseca às cefalosporinas isoladas; considerar colonoscopia se foco oculto</td>
    </tr>
    <tr>
      <td>Usuário de drogas injetáveis (UDI) com febre + infiltrados pulmonares cavitados</td>
      <td><em>Staphylococcus aureus</em> (&gt; 70%), <em>Pseudomonas aeruginosa</em>, <em>Candida</em> spp.</td>
      <td>Acometimento tricúspide predominante; sopro pode estar ausente; êmbolos sépticos pulmonares</td>
    </tr>
    <tr>
      <td>Prótese valvar precoce (&lt; 12 meses, sobretudo &lt; 2 meses da cirurgia)</td>
      <td><em>Staphylococcus epidermidis</em> (ECN), <em>S. aureus</em>, BGN nosocomiais, <em>Candida</em></td>
      <td>Elevada incidência de abscesso perivalvar, deiscência de prótese e bloqueio atrioventricular</td>
    </tr>
    <tr>
      <td>Prótese valvar tardia (&gt; 12 meses da cirurgia)</td>
      <td>Microbiologia semelhante à valva nativa (<em>S. viridans</em>, <em>S. aureus</em>, ECN, enterococos)</td>
      <td>Associada a bacteremias comunitárias; melhor prognóstico relativo que a EVP precoce</td>
    </tr>
    <tr>
      <td>Etilista em situação de rua, infestado por piolhos, hemoculturas negativas e c-ANCA (+)</td>
      <td><em>Bartonella quintana</em></td>
      <td>Sorologia IgG &ge; 1:800 ou PCR; tratar com doxiciclina + gentamicina (ou rifampicina)</td>
    </tr>
    <tr>
      <td>Exposição rural a gado/ovinos/parto animal + hemoculturas negativas</td>
      <td><em>Coxiella burnetii</em> (Febre Q)</td>
      <td>IgG antifase I &ge; 1:800 (Critério Maior de Duke); doxiciclina + hidroxicloroquina por 18–24m</td>
    </tr>
  </tbody>
</table>
`
    },
    {
      id: 'manifestacoes-clinicas-fenomenos-vasculares-imunologicos',
      title: '3. Manifestações Clínicas, Exame Físico e Fenômenos Vasculares vs. Imunológicos',
      body_html: `
<h3>Apresentação Clínica Geral e Sinais Cardíacos</h3>
<p>A expressão clínica da endocardite infecciosa é notavelmente polimórfica, variando desde uma síndrome febril aguda fulminante com choque séptico e edema agudo de pulmão até quadros subagudos arrastados de febre de origem indeterminada, emagrecimento, mialgias, lombalgia (por espondilodiscite hematogênica associada, muito característica de enterococos e estafilococos) ou déficit neurológico focal súbito como primeira manifestação.</p>
<p>A <strong>febre</strong> é o sintoma cardinal e mais sensível da doença, presente em <strong>85% a 95% dos pacientes</strong>. Entretanto, a ausência de febre não exclui o diagnóstico: pacientes muito idosos, imunossuprimidos, portadores de insuficiência cardíaca avançada, insuficiência renal crônica dialítica, caquexia, uso prévio de antimicrobianos ou antitérmicos e infecções por agentes menos virulentos (como estafilococos coagulase-negativos ou <em>Tropheryma whipplei</em>) podem cursar de forma subfebril ou afebril.</p>
<p>O <strong>sopro cardíaco</strong> é detectado à ausculta em aproximadamente <strong>80% a 85% dos pacientes</strong> ao longo da evolução. Embora o achado clássico de livro-texto seja o surgimento de um <strong>sopro regurgitante novo</strong> ou a piora acentuada de um sopro preexistente (que constitui Critério Menor de Duke quando não há ecocardiograma disponível, ou sinal de alerta para complicação mecânica), na maioria dos casos subagudos o sopro auscultado na admissão corresponde à lesão valvar preexistente. Em contrapartida, na endocardite aguda de valva tricúspide em usuários de drogas injetáveis, o sopro regurgitante tricúspide (sopro holossistólico na borda esternal esquerda baixa que aumenta com a inspiração profunda — <strong>manobra de Rivero-Carvallo</strong>) está ausente na admissão em até 50% dos casos devido às baixas pressões vigentes nas câmaras direitas.</p>

<h3>Distinção Fisiopatológica Clássica: Fenômenos Vasculares vs. Fenômenos Imunológicos</h3>
<p>Uma das cobranças mais recorrentes em provas de residência médica e do ENAMED é a correta distinção entre os sinais periféricos decorrentes de microembolização/isquemia séptica direta (<strong>fenômenos vasculares</strong>) e aqueles originados pela deposição de imunocomplexos circulantes (antígeno bacteriano + anticorpo + complemento) com vasculite leucocitoclástica de pequenos vasos (<strong>fenômenos imunológicos</strong>). Ambos constituem Critérios Menores na classificação de Duke-ISCVID 2023.</p>

<h4>1. Fenômenos Vasculares (Critério Menor de Duke)</h4>
<p>Resultam da fragmentação da vegetação friável com embolização arterial sistêmica ou pulmonar, obstrução luminal, infarto tecidual e invasão bacteriana direta da parede vascular:</p>
<ul>
  <li><strong>Lesões de Janeway:</strong> máculas ou placas eritematosas ou hemorrágicas, irregulares, <strong>totalmente indolores</strong> (não sensíveis à palpação), localizadas caracteristicamente nas regiões <strong>palmares e plantares</strong> (eminências tenar e hipotenar, planta dos pés). Histopatologicamente, correspondem a microembolizações sépticas dérmicas com microabscessos, necrose focal e infiltrado neutrofílico, sem vasculite por imunocomplexos. São mais frequentes na endocardite aguda por <em>Staphylococcus aureus</em>.</li>
  <li><strong>Hemorragias conjuntivais:</strong> petéquias lineares ou puntiformes na conjuntiva tarsal (palpebral) e bulbar; embora inespecíficas isoladamente (podem ocorrer após cirurgia cardíaca ou vômitos), no contexto de febre e sopro integram os fenômenos vasculares de Duke.</li>
  <li><strong>Hemorragias subungueais ("em estilhaço" ou <em>splinter hemorrhages</em>):</strong> estrias lineares avermelhadas a marrom-escuras, de 1 a 3 mm, que não desaparecem à digitopressão, situadas no leito ungueal proximal/médio (quando distais, costumam decorrer de microtraumatismos ocupacionais banais).</li>
  <li><strong>Embolia arterial maior e infartos viscerais:</strong> oclusão de artérias cerebrais (território da artéria cerebral média é o mais comum), esplênicas (dor no quadrante superior esquerdo com irradiação para o ombro esquerdo — sinal de Kehr — e atrito esplênico), renais (dor lombar e hematúria macro/microscópica), mesentéricas ou de extremidades (isquemia arterial aguda de membro).</li>
  <li><strong>Infartos pulmonares sépticos:</strong> típicos da endocardite de câmaras direitas (tricúspide/pulmonar). Manifestam-se por dor torácica pleurítica, tosse, hemoptise, dispneia e múltiplos nódulos pulmonares periféricos mal definidos que rapidamente sofrem cavitação à radiografia ou tomografia de tórax.</li>
  <li><strong>Aneurismas infecciosos (historicamente chamados de "aneurismas micóticos"):</strong> dilatações arteriais saculares resultantes da embolização séptica para os <em>vasa vasorum</em> ou para a luz arterial (tipicamente em pontos de bifurcação arterial, especialmente nos ramos distais da artéria cerebral média, artérias viscerais ou femorais), enfraquecendo a camada média e adventícia. Podem cursar silenciosamente até sofrerem ruptura catastrófica (hemorragia subaracnóidea ou intraparenquimatosa).</li>
  <li><strong>Hemorragia intracraniana:</strong> decorrente de transformação hemorrágica de acidente vascular cerebral isquêmico cardioembólico, arterite séptica necrosante ou ruptura de aneurisma micótico.</li>
</ul>

<h4>2. Fenômenos Imunológicos (Critério Menor de Duke)</h4>
<p>Resultam da estimulação antigênica contínua do sistema imune humoral (típica de quadros subagudos com mais de 2 a 3 semanas de evolução), gerando hipergamaglobulinemia policlonal, consumo de complemento (queda de C3, C4 e CH50) e deposição endotelial de imunocomplexos:</p>
<ul>
  <li><strong>Nódulos de Osler:</strong> nódulos subcutâneos pequenos (2 a 5 mm), violáceos ou eritematosos, <strong>intensamente dolorosos à palpação</strong>, localizados tipicamente nas <strong>polpas digitais</strong> das mãos e dos pés (e, ocasionalmente, nas regiões tenar/hipotenar). Histopatologicamente, decorrem de vasculite por deposição de imunocomplexos nas arteríolas dérmicas e no corpo glômico (embora microêmbolos também possam participar na gênese inicial). <em>Mnemônico clássico de prova: <strong>O</strong>sler = <strong>O</strong>uch! (doloroso, imunológico, polpa digital); <strong>J</strong>aneway = indolor, vascular, palma/planta.</em></li>
  <li><strong>Manchas de Roth:</strong> lesões hemorrágicas retinianas ovais ou em formato de canoa, visíveis à fundoscopia direta, caracterizadas por um halo hemorrágico periférico com um <strong>centro pálido ou esbranquiçado</strong> (constituído por exsudato de fibrina, plaquetas e infiltrado linfocitário decorrente de vasculite retiniana mediada por imunocomplexos). Embora associadas classicamente à endocardite subaguda (presentes em 2% a 5% dos casos), também podem ser vistas em leucemias agudas, anemia perniciosa grave, lúpus e retinopatia diabética/hipertensiva.</li>
  <li><strong>Glomerulonefrite mediada por imunocomplexos:</strong> acometimento renal caracterizado por hematúria dismórfica, cilindros hemáticos no sedimento urinário, proteinúria subnefrótica (ou raramente nefrótica) e perda aguda ou subaguda da função renal com <strong>hipocomplementemia (queda de C3 e C4)</strong>. O padrão histopatológico mais comum à biópsia renal é a glomerulonefrite proliferativa difusa ou focal endocapilar (frequentemente com crescentes nas formas graves) e depósitos granulares subendoteliais/mesangiais de C3 e IgG/IgM ("aspecto em céu estrelado" à imunofluorescência). O tratamento baseia-se na erradicação da infecção com antibióticos adequados, devendo-se evitar imunossupressão intempestiva sem controle infeccioso.</li>
  <li><strong>Fator Reumatoide (FR) positivo:</strong> anticorpo IgM anti-porção Fc da IgG humana, que se torna positivo em cerca de 40% a 50% das endocardites subagudas com evolução superior a 6 semanas, negativando-se após a cura microbiológica.</li>
</ul>

<table class="book-table">
  <thead>
    <tr>
      <th>Sinal Clínico / Achado</th>
      <th>Categoria nos Critérios de Duke</th>
      <th>Mecanismo Fisiopatológico</th>
      <th>Localização e Características Semiológicas</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>Lesões de Janeway</strong></td>
      <td>Fenômeno Vascular (Critério Menor)</td>
      <td>Microembolização séptica com necrose dérmica e microabscessos</td>
      <td>Máculas eritemato-hemorrágicas <strong>indolores</strong> nas palmas das mãos e plantas dos pés</td>
    </tr>
    <tr>
      <td><strong>Nódulos de Osler</strong></td>
      <td>Fenômeno Imunológico (Critério Menor)</td>
      <td>Deposição de imunocomplexos e vasculite arteriolar dérmica</td>
      <td>Nódulos violáceos subcutâneos <strong>dolorosos</strong> nas polpas digitais das mãos e pés</td>
    </tr>
    <tr>
      <td><strong>Manchas de Roth</strong></td>
      <td>Fenômeno Imunológico (Critério Menor)</td>
      <td>Vasculite retiniana por imunocomplexos com tampão central de fibrina</td>
      <td>Hemorragias retinianas ovais com <strong>centro branco/pálido</strong> à fundoscopia</td>
    </tr>
    <tr>
      <td><strong>Hemorragias em estilhaço</strong></td>
      <td>Fenômeno Vascular (Critério Menor)</td>
      <td>Microembolização capilar do leito ungueal</td>
      <td>Estrias lineares marrom-avermelhadas no terço proximal/médio subungueal</td>
    </tr>
    <tr>
      <td><strong>Aneurisma Micótico</strong></td>
      <td>Fenômeno Vascular (Critério Menor)</td>
      <td>Embolização séptica para os <em>vasa vasorum</em> ou parede arterial</td>
      <td>Dilatação sacular em bifurcações arteriais (especialmente artéria cerebral média)</td>
    </tr>
    <tr>
      <td><strong>Glomerulonefrite + Queda de C3/C4</strong></td>
      <td>Fenômeno Imunológico (Critério Menor)</td>
      <td>Deposição glomerular de imunocomplexos circulantes e complemento</td>
      <td>Hematúria dismórfica, cilindros hemáticos, injúria renal aguda hipocomplementêmica</td>
    </tr>
  </tbody>
</table>
`
    },
    {
      id: 'criterios-duke-iscvid-esc-2023',
      title: '4. Diagnóstico Clínico-Laboratorial: Critérios de Duke-ISCVID 2023 e Diretriz ESC 2023',
      body_html: `
<h3>A Evolução dos Critérios Diagnósticos (De Durack 1994 e Li 2000 a Duke-ISCVID 2023 e ESC 2023)</h3>
<p>O diagnóstico da endocardite infecciosa fundamenta-se na integração entre evidência microbiológica contínua na corrente sanguínea e demonstração anatômica/funcional de acometimento endocárdico. Em 2023, a <em>International Society for Cardiovascular Infectious Diseases</em> (ISCVID) e a <em>European Society of Cardiology</em> (ESC) atualizaram os clássicos Critérios de Duke Modificados (Li et al., 2000), incorporando avanços de biologia molecular (PCR 16S/18S, metagenômica), novos patógenos considerados "típicos" na presença de próteses intracardíacas, modalidades avançadas de imagem (TC cardíaca sincronizada ao ECG e 18F-FDG PET/CT) e o critério maior cirúrgico de inspeção direta.</p>

<h3>Técnica Correta de Coleta de Hemoculturas</h3>
<p>Antes de iniciar qualquer antimicrobiano, é mandatória a coleta de <strong>pelo menos 3 pares de hemoculturas</strong> (cada par composto por 1 frasco aeróbio e 1 frasco anaeróbio, contendo 10 mL de sangue em cada frasco para adultos, totalizando 60 mL de sangue), obtidos por <strong>punções venosas periféricas independentes</strong> (nunca coletar exclusivamente através de cateteres venosos centrais prévios, devido ao alto risco de contaminação por colonizantes de lúmen). Como a bacteremia na endocardite infecciosa é <strong>contínua e de baixa magnitude</strong> (frequentemente 1 a 100 UFC/mL), não é necessário aguardar picos febris para realizar a coleta: nos quadros subagudos e hemodinamicamente estáveis, recomenda-se espaçar o primeiro e o último par por pelo menos 30 a 60 minutos (para documentar o caráter persistente da bacteremia); já nos pacientes em sepse grave ou choque séptico com indicação de antibioticoterapia empírica imediata na primeira hora, os 3 pares devem ser colhidos de sítios periféricos distintos em intervalo curto (15 a 30 minutos) antes da primeira dose do antibiótico.</p>

<h3>Critérios Maiores de Duke-ISCVID 2023 / ESC 2023</h3>

<h4>I. Critério Maior Microbiológico</h4>
<p>Preenche o Critério Maior Microbiológico qualquer uma das seguintes situações laboratoriais:</p>
<ul>
  <li><strong>Patógenos típicos clássicos em &ge; 2 hemoculturas independentes (qualquer substrato valvar — nativo ou protético):</strong> <em>Staphylococcus aureus</em>, <em>Staphylococcus lugdunensis</em>, <em>Enterococcus faecalis</em>, todas as espécies de <em>Streptococcus</em> (exceto <em>Streptococcus pneumoniae</em> e <em>Streptococcus pyogenes</em>, que não são considerados típicos), <em>Granulicatella</em> spp., <em>Abiotrophia</em> spp., <em>Gemella</em> spp. e microrganismos do grupo HACEK.</li>
  <li><strong>Novidade Duke-ISCVID 2023 — Patógenos considerados típicos em &ge; 2 hemoculturas APENAS no contexto de material protético intracardíaco (prótese valvar cirúrgica, TAVI, anel de anuloplastia, DCEI ou tubo valvulado):</strong> estafilococos coagulase-negativos (ex.: <em>S. epidermidis</em>), <em>Corynebacterium striatum</em> e <em>C. jeikeium</em>, <em>Serratia marcescens</em>, <em>Pseudomonas aeruginosa</em>, <em>Cutibacterium acnes</em>, micobactérias não tuberculosas (especialmente <em>Mycobacterium chimaera</em>) e <em>Candida</em> spp.</li>
  <li><strong>Hemoculturas persistentemente positivas para microrganismos compatíveis (não típicos) com EI:</strong> &ge; 2 hemoculturas positivas colhidas com intervalo &gt; 12 horas entre si; OU todas de 3, ou a maioria de &ge; 4 hemoculturas independentes positivas (sendo o intervalo entre a primeira e a última amostra &ge; 1 hora).</li>
  <li><strong><em>Coxiella burnetii</em> (Sorologia ou Cultura):</strong> uma única hemocultura positiva OU título de anticorpos <strong>IgG antifase I &gt; 1:800</strong> por imunofluorescência indireta (ou PCR positiva no sangue).</li>
  <li><strong><em>Bartonella</em> spp. (<em>B. quintana</em> ou <em>B. henselae</em> — Novo Critério Maior Duke-ISCVID 2023):</strong> título de anticorpos <strong>IgG &ge; 1:800</strong> por imunofluorescência indireta.</li>
  <li><strong>Biologia molecular (PCR / sequenciamento de amplicons 16S/18S rRNA ou metagenômica <em>shotgun</em>):</strong> identificação de <em>Coxiella burnetii</em>, <em>Bartonella</em> spp. ou <em>Tropheryma whipplei</em> no sangue; ou identificação de qualquer bactéria/fungo compatível em tecido valvar explantado ou material embólico estéril.</li>
</ul>

<h4>II. Critério Maior de Imagem Cardiovascular (Ecocardiografia, TC Cardíaca e 18F-FDG PET/CT)</h4>
<ul>
  <li><strong>Vegetação ao Ecocardiograma (ETT/ETE) ou TC Cardíaca:</strong> massa intracardíaca oscilante ou não oscilante aderida a folheto valvar, aparelho subvalvar, endocárdio mural no trajeto de jato regurgitante ou material protético implantado.</li>
  <li><strong>Lesão destrutiva ou paravalvar ao ETT/ETE ou TC Cardíaca:</strong> abscesso perivalvar, pseudoaneurisma, fístula intracardíaca, perfuração de cúspide/folheto ou aneurisma valvar.</li>
  <li><strong>Nova deiscência parcial de prótese valvar:</strong> identificada ao ETT/ETE ou TC cardíaca (especialmente quando associada a regurgitação paravalvar nova em comparação com exame prévio).</li>
  <li><strong>Tomografia por Emissão de Pósitrons com 18F-Fluordesoxiglicose (18F-FDG PET/CT) ou Cintilografia com Leucócitos Marcados com SPECT/CT:</strong> hipercaptação metabólica anormal intensa (focal ou heterogênea) ao redor de <strong>prótese valvar</strong> (cirúrgica ou TAVI), enxerto aórtico ou eletrodos intracardíacos. <em>Atenção: na Diretriz ESC 2023, o 18F-FDG PET/CT tem máxima especificidade para próteses implantadas há mais de 3 meses (evitando falsos-positivos inflamatórios do pós-operatório imediato), embora o Duke-ISCVID 2023 reconheça padrões focais intensos mesmo antes de 3 meses.</em></li>
</ul>

<h4>III. Critério Maior Cirúrgico (Novo no Duke-ISCVID 2023)</h4>
<p>Evidência direta e inequívoca de endocardite infecciosa documentada por <strong>inspeção visual intraoperatória</strong> pelo cirurgião cardiovascular (observação direta de vegetação, abscesso, perfuração ou destruição infecciosa de prótese/valva), mesmo quando os exames de imagem pré-operatórios foram inconclusivos e antes da confirmação histopatológica ou microbiológica do tecido.</p>

<h3>Critérios Menores de Duke-ISCVID 2023 / ESC 2023</h3>
<ol>
  <li><strong>Condição cardíaca predisponente ou uso de drogas injetáveis:</strong> história prévia de endocardite infecciosa, prótese valvar cirúrgica ou transcateter (TAVI), reparo valvar prévio, cardiopatia congênita cianótica ou não cianótica (exceto CIA tipo <em>ostium secundum</em> isolada), regurgitação ou estenose valvar moderada/grave de qualquer etiologia (incluindo reumática e degenerativa), miocardiopatia hipertrófica obstrutiva, presença de dispositivo cardíaco eletrônico implantável (marca-passo/CDI) ou uso ativo de drogas endovenosas.</li>
  <li><strong>Febre documentada:</strong> temperatura corporal &ge; 38,0 °C.</li>
  <li><strong>Fenômenos vasculares (clínicos ou detectados apenas por imagem assintomática):</strong> embolia arterial sistêmica maior, infartos pulmonares sépticos, abscesso cerebral ou esplênico, aneurisma infeccioso (micótico), hemorragia intracraniana, hemorragias conjuntivais, lesões de Janeway ou púrpura pustulosa. <em>Nota importante: a detecção de êmbolos silenciosos (cerebrais, esplênicos, vertebrais ou renais) por RM, TC ou PET/CT de corpo inteiro conta integralmente como Critério Menor vascular!</em></li>
  <li><strong>Fenômenos imunológicos:</strong> glomerulonefrite mediada por imunocomplexos, nódulos de Osler, manchas de Roth ou fator reumatoide (FR) positivo.</li>
  <li><strong>Evidência microbiológica que não preenche Critério Maior:</strong> hemocultura positiva isolada para microrganismo compatível que não preenche os requisitos de critério maior, ou cultura/PCR/amplicon/metagenômica positiva de sítio estéril extracardíaco para patógeno compatível, ou sorologia positiva para patógeno compatível com EI que não atinge o limiar de Critério Maior.</li>
  <li><strong>Evidência de imagem que não preenche Critério Maior (Duke-ISCVID 2023):</strong> captação metabólica anormal ao 18F-FDG PET/CT dentro dos primeiros 3 meses após implante de prótese valvar, enxerto aórtico ou DCEI.</li>
  <li><strong>Exame físico (apenas se ecocardiograma não estiver disponível):</strong> ausculta de novo sopro regurgitante valvar (a piora ou mudança de sopro preexistente isolada não é suficiente).</li>
</ol>

<h3>Classificação Diagnóstica Final de Duke</h3>
<table class="book-table">
  <thead>
    <tr>
      <th>Categoria Diagnóstica</th>
      <th>Requisitos Clínicos, Microbiológicos ou Anatomopatológicos</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>Endocardite Infecciosa DEFINITIVA</strong></td>
      <td>
        <strong>Critérios Patológicos:</strong> (1) Microrganismos demonstrados por cultura, histologia ou PCR/sequenciamento em vegetação, êmbolo séptico ou abscesso intracardíaco; OU (2) Lesão patológica ativa (vegetação ou abscesso intracardíaco confirmado por histopatologia demonstrando endocardite ativa).<br>
        <strong>Critérios Clínicos (qualquer uma das 3 combinações):</strong><br>
        • <strong>2 Critérios Maiores</strong>; OU<br>
        • <strong>1 Critério Maior + 3 Critérios Menores</strong>; OU<br>
        • <strong>5 Critérios Menores</strong>.
      </td>
    </tr>
    <tr>
      <td><strong>Endocardite Infecciosa POSSÍVEL</strong></td>
      <td>
        • <strong>1 Critério Maior + 1 ou 2 Critérios Menores</strong>; OU<br>
        • <strong>3 ou 4 Critérios Menores</strong>.
      </td>
    </tr>
    <tr>
      <td><strong>Endocardite Infecciosa REJEITADA</strong></td>
      <td>
        • Diagnóstico diferencial firme e alternativo que explique os achados; OU<br>
        • Ausência de recorrência clínica com antibioticoterapia &le; 4 dias; OU<br>
        • Ausência de evidência patológica de EI na cirurgia ou autópsia com antibioticoterapia &le; 4 dias; OU<br>
        • Não preenche critérios para EI possível.
      </td>
    </tr>
  </tbody>
</table>
`
    },
    {
      id: 'papel-ett-ete-tc-pet-ct',
      title: '5. Multimodalidade de Imagem Cardiovascular: ETT, ETE, TC Cardíaca e 18F-FDG PET/CT',
      body_html: `
<h3>Ecocardiograma Transtorácico (ETT) vs. Ecocardiograma Transesofágico (ETE)</h3>
<p>A ecocardiografia é o pilar propedêutico de primeira linha na suspeita de endocardite infecciosa, devendo ser realizada precocemente (idealmente nas primeiras 24 horas) em todo paciente com suspeita clínica. A escolha e a sequência entre o <strong>Ecocardiograma Transtorácico (ETT)</strong> e o <strong>Ecocardiograma Transesofágico (ETE)</strong> constituem tema clássico de prova.</p>
<p>O <strong>ETT</strong> é não invasivo, amplamente disponível à beira do leito, permite excelente avaliação hemodinâmica da função sistólica biventricular e das pressões pulmonares, e visualiza com boa resolução estruturas anteriores (como a valva tricúspide e a via de saída do ventrículo direito). Contudo, sua sensibilidade para detecção de vegetações em <strong>valvas nativas é de aproximadamente 60% a 75%</strong>, caindo drasticamente para <strong>30% a 50% em valvas protéticas</strong> (devido à reverberação acústica e à sombra posterior gerada pelos anéis metálicos ou hastes protéticas). Já o <strong>ETE</strong> posiciona o transdutor de alta frequência no esôfago, imediatamente atrás do átrio esquerdo, sem interposição de parênquima pulmonar ou arcabouço costal, alcançando <strong>sensibilidade de 90% a 96% em valvas nativas e de 85% a 92% em valvas protéticas</strong>, com especificidade superior a 90% em ambos os cenários, além de ser francamente superior no diagnóstico de vegetações pequenas (&lt; 5 mm), perfurações de folhetos e <strong>abscessos perivalvares/pseudoaneurismas</strong>.</p>

<h4>Indicações Formais de Ecocardiograma Transesofágico (ETE) segundo ESC 2023 / SBC</h4>
<ul>
  <li><strong>ETT negativo ou inconclusivo na presença de moderada ou alta suspeita clínica de EI:</strong> um ETT normal jamais descarta endocardite quando a probabilidade pré-teste é intermediária ou alta.</li>
  <li><strong>Portadores de prótese valvar cardíaca (cirúrgica ou TAVI) ou dispositivos cardíacos eletrônicos implantáveis (DCEI):</strong> o ETE é obrigatório mesmo que o ETT inicial seja negativo ou positivo, devido à necessidade de avaliar deiscência protética e extensão perianular.</li>
  <li><strong>ETT positivo para endocardite infecciosa:</strong> o ETE continua indicado na imensa maioria dos pacientes com ETT positivo (exceto na endocardite isolada de valva tricúspide nativa com janela transtorácica inequívoca e excelente resposta clínica) para descartar complicações locais silenciosas, como abscesso do anel aórtico, pseudoaneurisma e fístula.</li>
  <li><strong>Bacteremia por <em>Staphylococcus aureus</em>, <em>Staphylococcus lugdunensis</em> ou fungemia por <em>Candida</em> spp.:</strong> pela alta prevalência de endocardite oculta (até 25% das bacteremias por <em>S. aureus</em> cursam com EI), o ETE é fortemente recomendado, especialmente se houver bacteremia persistente (&gt; 48–72h), foco comunitário, hemodiálise ou cardiopatia estrutural.</li>
  <li><strong>Repetição do ETE em 5 a 7 dias:</strong> se a suspeita clínica de EI permanece alta e tanto o ETT quanto o primeiro ETE foram negativos (vegetações muito incipientes ou abscessos em fase fleimosa inicial podem só se tornar visíveis após 5 a 7 dias de evolução).</li>
</ul>

<h3>Quando Solicitar TC Cardíaca e 18F-FDG PET/CT?</h3>
<p>A <strong>Tomografia Computadorizada Cardíaca (Angio-TC cardíaca sincronizada ao ECG)</strong> apresenta acurácia equivalente ou superior ao ETE na caracterização anatômica da <strong>extensão perivalvar da infecção</strong> (abscessos da raiz aórtica, pseudoaneurismas do corpo fibroso intervalvar mitro-aórtico, fístulas aorto-cavitárias e deiscência de próteses mecânicas com intensa sombra acústica ao ETE). Além disso, permite a avaliação simultânea da árvore coronariana em pacientes com indicação de cirurgia cardíaca de urgência, evitando a realização de cineangiocoronariografia invasiva em portadores de vegetações aórticas friáveis (onde a passagem do cateter pela raiz aórtica acarreta risco de embolização iatrogênica).</p>
<p>O <strong>18F-FDG PET/CT</strong> revolucionou o diagnóstico da <strong>endocardite de valva protética (EVP)</strong> e de infecções de bolso/eletrodos de DCEI quando o ETE é duvidoso ou negativo. Na EVP, a incorporação do PET/CT aos critérios de Duke eleva a sensibilidade diagnóstica de ~70% para <strong>&gt; 90%</strong>. Adicionalmente, o PET/CT de corpo inteiro identifica focos embólicos sépticos periféricos silenciosos (esplênicos, renais, espondilodiscite, aneurismas micóticos periféricos) e portas de entrada ocultas (como tumores colônicos hipermetabólicos). Deve-se recordar sua limitação primordial: o 18F-FDG PET/CT apresenta <strong>baixa sensibilidade em valvas nativas</strong> (pois as vegetações nativas são pequenas, avasculares, com poucos leucócitos ativados e constante movimento rápido dos folhetos) e <strong>não deve ser utilizado para avaliar o parênquima cerebral</strong> (devido ao intenso metabolismo glicolítico fisiológico do córtex cerebral).</p>

<table class="book-table">
  <thead>
    <tr>
      <th>Modalidade de Imagem</th>
      <th>Sensibilidade EVN</th>
      <th>Sensibilidade EVP</th>
      <th>Principal Vantagem / Indicação de Escolha</th>
      <th>Principal Limitação Clínica</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>ETT (Transtorácico)</strong></td>
      <td>60% – 75%</td>
      <td>30% – 50%</td>
      <td>Exame inicial obrigatório em toda suspeita; avalia função ventricular e valva tricúspide</td>
      <td>Baixa sensibilidade para vegetações &lt; 5 mm, próteses e abscessos perivalvares</td>
    </tr>
    <tr>
      <td><strong>ETE (Transesofágico)</strong></td>
      <td>90% – 96%</td>
      <td>85% – 92%</td>
      <td>Padrão-ouro ecocardiográfico para vegetações, perfuração de cúspides e complicações locais</td>
      <td>Sombra acústica de próteses metálicas na região anterior da raiz aórtica</td>
    </tr>
    <tr>
      <td><strong>TC Cardíaca (Sincronizada)</strong></td>
      <td>80% – 85%</td>
      <td>88% – 93%</td>
      <td>Superior ou complementar ao ETE para <strong>abscessos perivalvares e pseudoaneurismas</strong>; avalia coronárias</td>
      <td>Menor sensibilidade para vegetações muito pequenas (&lt; 4 mm) e perfurações finas de folhetos; uso de contraste</td>
    </tr>
    <tr>
      <td><strong>18F-FDG PET/CT</strong></td>
      <td>&lt; 35% (Baixa)</td>
      <td>85% – 93%</td>
      <td>Reclassifica "EI Possível" em "EI Definitiva" na <strong>prótese valvar (&gt; 3 meses)</strong>; rastreia êmbolos extracardíacos</td>
      <td>Falsos-positivos nos primeiros 3 meses pós-cirurgia (inflamação cicatricial / colas cirúrgicas); não avalia cérebro</td>
    </tr>
    <tr>
      <td><strong>SPECT/CT com Leucócitos Marcados</strong></td>
      <td>Baixa</td>
      <td>65% – 90%</td>
      <td>Altíssima especificidade para infecção protética, inclusive nos <strong>primeiros 3 meses pós-operatórios</strong></td>
      <td>Execução trabalhosa, menor resolução espacial e menor disponibilidade que o PET/CT</td>
    </tr>
  </tbody>
</table>
`
    },
    {
      id: 'antibioticoterapia-empirica-valva-nativa-protetica',
      title: '6. Antibioticoterapia Empírica na Endocardite de Valva Nativa e Protética',
      body_html: `
<h3>Princípios Gerais da Terapia Empírica após Coleta das Hemoculturas</h3>
<p>A escolha do esquema antimicrobiano empírico na endocardite infecciosa depende de três variáveis clínicas determinantes: (1) se o paciente recebeu ou não antibióticos prévios e qual a gravidade clínica na chegada (apresentação aguda séptica vs. subaguda indolente); (2) se o acometimento ocorre em <strong>valva nativa (EVN) ou prótese valvar tardia (&ge; 12 meses após a cirurgia)</strong> versus <strong>prótese valvar precoce (&lt; 12 meses após a cirurgia) ou associada a cuidados de saúde/nosocomial</strong>; e (3) o perfil epidemiológico local de resistência estafilocócica (prevalência de MRSA).</p>
<p>Nas endocardites subagudas comunitárias em pacientes hemodinamicamente estáveis e sem complicações neurológicas ou insuficiência cardíaca, é perfeitamente aceitável e recomendável aguardar 24 a 48 horas pelo crescimento preliminar das 3 hemoculturas para iniciar terapia guiada. Já nos quadros agudos, sépticos ou com deterioração hemodinâmica, a antibioticoterapia empírica parenteral em doses bactericidas máximas deve ser iniciada imediatamente após a coleta dos 3 pares de hemoculturas.</p>

<h4>1. Endocardite Comunitária em Valva Nativa (EVN) ou Prótese Tardia (&ge; 12 meses)</h4>
<p>Nesse cenário, o espectro empírico deve cobrir obrigatoriamente <strong>estafilococos (incluindo <em>S. aureus</em> sensível à meticilina — MSSA), estreptococos (orais e <em>S. gallolyticus</em>) e enterococos</strong>:</p>
<ul>
  <li><strong>Esquema padrão (Primeira linha ESC 2023 / SBC para apresentações subagudas ou sem risco elevado de MRSA):</strong> associação de uma aminopenicilina (<strong>Ampicilina 12 g/dia IV</strong> dividida em 2 g a cada 4 horas) + penicilina antiestafilocócica (<strong>Oxacilina 12 g/dia IV</strong> dividida em 2 g a cada 4 horas) + aminoglicosídeo sinérgico nos primeiros dias (<strong>Gentamicina 3 mg/kg/dia IV ou IM</strong> em dose única diária) enquanto se aguardam as culturas. No Brasil, quando há indisponibilidade ou necessidade de simplificar o duplo beta-lactâmico na fase inicial até as culturas, ou em apresentações agudas comunitárias graves onde se teme tanto MSSA quanto MRSA ou enterococo, utiliza-se amplamente <strong>Vancomicina + Gentamicina</strong> ou <strong>Ampicilina + Oxacilina + Gentamicina</strong>.</li>
  <li><strong>Pacientes alérgicos a beta-lactâmicos ou em cenários com risco de MRSA comunitário:</strong> <strong>Vancomicina 30 a 60 mg/kg/dia IV</strong> dividida em 2 ou 3 doses (guiada por vancocinemia com vale de 15–20 mcg/mL ou razão ASC24h/CIM entre 400 e 600) associada a <strong>Gentamicina 3 mg/kg/dia IV</strong> em dose única diária (ou Ceftriaxona 2 g IV 12/12h se o objetivo for cobrir HACEK/Gram-negativos sem nefrotoxicidade adicional).</li>
</ul>

<h4>2. Endocardite em Prótese Valvar Precoce (&lt; 12 meses da cirurgia) ou Associada a Cuidados de Saúde (Nosocomial / Hemodiálise)</h4>
<p>Na EVP precoce e na endocardite nosocomial, os agentes predominantes são os <strong>estafilococos resistentes à meticilina (<em>S. epidermidis</em> MRSE e <em>S. aureus</em> MRSA), enterococos e bacilos Gram-negativos hospitalares (incluindo <em>Pseudomonas aeruginosa</em> e enterobactérias)</strong>. Por conseguinte, o esquema empírico não pode basear-se em oxacilina:</p>
<ul>
  <li><strong>Esquema de escolha:</strong> <strong>Vancomicina</strong> (30 mg/kg/dia IV dividida em 2 doses, com dose de ataque de 25–30 mg/kg em pacientes graves) <strong>+ Gentamicina</strong> (3 mg/kg/dia IV em dose única diária) <strong>+ Rifampicina</strong> (900 a 1.200 mg/dia IV ou VO dividida em 2 ou 3 doses).</li>
  <li><strong>Cuidado farmacológico crítico com a Rifampicina (Pegadinha clássica de prova!):</strong> A rifampicina exerce papel singular e insubstituível na erradicação de estafilococos sésseis aderidos em biofilmes de próteses valvares. Todavia, ela possui uma alta taxa de mutação espontânea da subunidade beta da RNA-polimerase bacteriana (gene <em>rpoB</em>) quando exposta a uma elevada carga planctônica de estafilococos na corrente sanguínea. Por essa razão, as diretrizes (ESC 2023 e AHA) determinam que a <strong>Rifampicina SÓ DEVE SER INICIADA 3 A 5 DIAS APÓS</strong> o início efetivo da vancomicina e da gentamicina, quando a bacteremia já tiver sido clareada e a carga bacteriana reduzida, prevenindo a emergência rápida de resistência à rifampicina!</li>
  <li>Caso haja forte suspeita de bacilo Gram-negativo não fermentador nosocomial (UTI, queimados, sepse relacionada a cateter), associa-se uma cefalosporina antipseudomonas (<strong>Cefepima 2 g IV 8/8h</strong>) ou carbapenêmico (<strong>Meropenem 2 g IV 8/8h</strong>).</li>
</ul>

<table class="book-table">
  <thead>
    <tr>
      <th>Cenário Clínico</th>
      <th>Esquema Empírico Recomendado</th>
      <th>Racional Microbiológico e Observações de Prova</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>EVN Comunitária ou EVP Tardia (&ge; 12 meses)</strong></td>
      <td>Ampicilina 2 g IV 4/4h + Oxacilina 2 g IV 4/4h + Gentamicina 3 mg/kg/dia IV 24/24h</td>
      <td>Cobre <em>S. viridans</em>, <em>S. gallolyticus</em> e <em>Enterococcus</em> (ampicilina + gentamicina) e <em>S. aureus</em> MSSA (oxacilina). Desescalonar em 48–72h conforme cultura.</td>
    </tr>
    <tr>
      <td><strong>EVN Comunitária em Alérgico a Penicilina (ou suspeita de MRSA)</strong></td>
      <td>Vancomicina 15–20 mg/kg IV 8/8h ou 12/12h + Gentamicina 3 mg/kg/dia IV 24/24h</td>
      <td>Cobre MRSA, MSSA, estreptococos e enterococos sensíveis à vancomicina. Monitorar função renal e nível sérico de vancomicina.</td>
    </tr>
    <tr>
      <td><strong>EVP Precoce (&lt; 12 meses) ou Nosocomial / Associada à Assistência</strong></td>
      <td>Vancomicina 15–20 mg/kg IV 12/12h + Gentamicina 3 mg/kg/dia IV + <strong>Rifampicina 300–450 mg VO/IV 8/8h ou 12/12h (iniciar após 3–5 dias)</strong></td>
      <td>Cobre MRSE (<em>S. epidermidis</em>), MRSA e enterococos. A rifampicina penetra o biofilme protético, mas deve aguardar 3–5 dias para evitar mutação <em>rpoB</em>.</td>
    </tr>
  </tbody>
</table>
`
    },
    {
      id: 'antibioticoterapia-direcionada-patogenos',
      title: '7. Antibioticoterapia Direcionada por Patógeno: Posologias, Sinergismo e Duração',
      body_html: `
<h3>1. Tratamento da Endocardite por Estreptococos Orais (<em>Viridans</em>) e <em>Streptococcus gallolyticus</em></h3>
<p>A escolha do regime terapêutico para estreptococos orais e do grupo <em>S. gallolyticus</em> é estritamente guiada pela <strong>Concentração Inibitória Mínima (CIM ou MIC) para a Penicilina</strong>:</p>
<ul>
  <li><strong>Cepas plenamente sensíveis à penicilina (CIM &le; 0,125 mg/L) — Regime padrão de 4 semanas (sem aminoglicosídeo, preferido em idosos e nefropatas):</strong> Penicilina G Cristalina 12 a 18 milhões UI/dia IV (contínua ou dividida a cada 4h), OU Ampicilina 12 g/dia IV (2 g 4/4h), OU <strong>Ceftriaxona 2 g/dia IV ou IM em dose única diária (24/24h)</strong> durante <strong>4 semanas</strong> em valva nativa (e <strong>6 semanas</strong> em valva protética).</li>
  <li><strong>Cepas plenamente sensíveis à penicilina (CIM &le; 0,125 mg/L) — Regime encurtado de 2 semanas (com sinergismo aminoglicosídico):</strong> Penicilina G, Ampicilina ou Ceftriaxona 2 g/dia associada a <strong>Gentamicina 3 mg/kg/dia IV/IM em dose única diária</strong> por apenas <strong>2 semanas</strong>. <em>Condições obrigatórias para usar o esquema de 2 semanas:</em> aplica-se <strong>exclusivamente a valva nativa não complicada</strong> (proibido em prótese valvar, abscesso cardíaco, êmbolos extracardíacos ou clearance de creatinina &lt; 50 mL/min).</li>
  <li><strong>Cepas plenamente sensíveis em alérgicos a beta-lactâmicos:</strong> Vancomicina 30 mg/kg/dia IV em 2 doses por 4 semanas (EVN) ou 6 semanas (EVP).</li>
  <li><strong>Cepas com sensibilidade intermediária / reduzida à penicilina (CIM entre 0,25 e 2,0 mg/L):</strong> Na <strong>valva nativa</strong>, utiliza-se Penicilina G (24 milhões UI/dia) ou Ampicilina (12 g/dia) ou Ceftriaxona (2 g/dia) por <strong>4 semanas</strong>, associada a <strong>Gentamicina 3 mg/kg/dia IV nas primeiras 2 semanas</strong>. Na <strong>valva protética</strong>, utiliza-se beta-lactâmico em dose máxima por <strong>6 semanas</strong> associado a Gentamicina por 2 a 6 semanas.</li>
</ul>

<h3>2. Tratamento da Endocardite por <em>Staphylococcus</em> spp. (<em>S. aureus</em> e Estafilococos Coagulase-Negativos)</h3>
<p>A distinção fundamental no manejo estafilocócico reside em duas perguntas: a cepa é sensível à meticilina/oxacilina (MSSA/MSSE) ou resistente (MRSA/MRSE)? E o acometimento ocorre em <strong>valva nativa (EVN)</strong> ou em <strong>valva protética (EVP)</strong>?</p>

<h4>A. Endocardite Estafilocócica em Valva Nativa (EVN)</h4>
<ul>
  <li><strong>Estafilococos sensíveis à meticilina (MSSA / MSSE):</strong> <strong>Oxacilina 12 g/dia IV</strong> (2 g a cada 4 horas) por <strong>4 a 6 semanas</strong>. Alternativa para pacientes com alergia não anafilática à penicilina: <strong>Cefazolina 6 g/dia IV</strong> (2 g a cada 8 horas) por 4 a 6 semanas. <em>Atenção para provas: a Vancomicina é comprovadamente inferior aos beta-lactâmicos antiestafilocócicos (oxacilina/cefazolina) no tratamento do MSSA, cursando com clareamento mais lento da bacteremia e maior mortalidade!</em></li>
  <li><strong>Regra crucial sobre a Gentamicina e a Rifampicina na EVN por <em>S. aureus</em>:</strong> Antigamente, associava-se gentamicina nos primeiros 3 a 5 dias da EVN por <em>S. aureus</em>. Estudos clínicos randomizados demonstraram que na <strong>valva nativa</strong>, a adição de gentamicina <strong>NÃO reduz a mortalidade nem as complicações embólicas, mas aumenta significativamente a nefrotoxicidade aguda</strong>. Da mesma forma, a adição de rifampicina na EVN não traz benefício e eleva hepatotoxicidade e interações medicamentosas. Portanto, na <strong>valva nativa</strong> estafilocócica, usa-se <strong>monoterapia</strong> (oxacilina para MSSA; vancomicina ou daptomicina para MRSA) sem gentamicina e sem rifampicina!</li>
  <li><strong>Estafilococos resistentes à meticilina (MRSA) ou alergia anafilática a beta-lactâmicos:</strong> <strong>Vancomicina 30 a 60 mg/kg/dia IV</strong> dividida em 2 a 3 doses por <strong>4 a 6 semanas</strong>, OU <strong>Daptomicina 10 mg/kg/dia IV em dose única diária</strong> por 4 a 6 semanas (a daptomicina em alta dose — 10 mg/kg/dia, superior à dose de 4–6 mg/kg usada em pele — é excelente para bacteremia/endocardite por MRSA ou quando a CIM da vancomicina é &gt; 1 mg/L; lembrar que a daptomicina exige monitorização semanal de CPK pelo risco de miopatia rabdomiolítica e é inativada pelo surfactante alveolar, não tratando pneumonia hematogênica parenquimatosa isolada, embora trate embolia séptica tricúspide).</li>
  <li><strong>Terapia encurtada de 2 semanas para EVN tricúspide isolada não complicada em UDI por MSSA:</strong> Em usuários de drogas injetáveis com endocardite restrita à valva tricúspide por MSSA, vegetação &lt; 20 mm, excelente resposta clínica/microbiológica inicial (&lt; 96h), ausência de empiema ou focos metastáticos e ausência de imunossupressão grave (CD4 &gt; 200), pode-se utilizar Oxacilina 2 g IV 4/4h por apenas <strong>2 semanas</strong>.</li>
</ul>

<h4>B. Endocardite Estafilocócica em Valva Protética (EVP)</h4>
<p>Na presença de prótese valvar, a erradicação do biofilme estafilocócico exige <strong>terapia tripla</strong> e duração mínima de <strong>&ge; 6 semanas</strong>:</p>
<ul>
  <li><strong>EVP por MSSA / MSSE:</strong> <strong>Oxacilina 12 g/dia IV</strong> (2 g 4/4h) por <strong>&ge; 6 semanas</strong> + <strong>Rifampicina 900–1.200 mg/dia IV ou VO</strong> (dividida em 2 ou 3 doses, iniciada após 3 a 5 dias de oxacilina) por <strong>&ge; 6 semanas</strong> + <strong>Gentamicina 3 mg/kg/dia IV/IM</strong> (em 1 ou 2 doses) durante as <strong>primeiras 2 semanas</strong>.</li>
  <li><strong>EVP por MRSA / MRSE:</strong> <strong>Vancomicina 30–60 mg/kg/dia IV</strong> (ou Daptomicina 10 mg/kg/dia IV) por <strong>&ge; 6 semanas</strong> + <strong>Rifampicina 900–1.200 mg/dia IV ou VO</strong> (iniciada após 3 a 5 dias) por <strong>&ge; 6 semanas</strong> + <strong>Gentamicina 3 mg/kg/dia IV</strong> durante as <strong>primeiras 2 semanas</strong>.</li>
</ul>

<h3>3. Tratamento da Endocardite por <em>Enterococcus</em> spp. (Sinergismo Obrigatório e Duplo Beta-Lactâmico)</h3>
<p>Os enterococos são intrinsecamente tolerantes aos beta-lactâmicos e aos glicopeptídeos quando administrados isoladamente: a ampicilina, a penicilina e a vancomicina exercem efeito meramente <strong>bacteriostático</strong> contra o <em>Enterococcus</em>. Para obter <strong>efeito bactericida</strong> indispensável à cura da endocardite enterocócica, é <strong>obrigatória a terapia combinada sinérgica</strong>, na qual o agente ativo na parede celular facilita a entrada do aminoglicosídeo ou satura de forma complementar todas as proteínas ligadoras de penicilina (PBPs):</p>
<ul>
  <li><strong>1ª Opção para <em>Enterococcus faecalis</em> (Esquema de Duplo Beta-Lactâmico — Ampicilina + Ceftriaxona):</strong> <strong>Ampicilina 12 g/dia IV</strong> (2 g a cada 4 horas) associada a <strong>Ceftriaxona 4 g/dia IV</strong> (<strong>2 g a cada 12 horas</strong>) durante <strong>6 semanas</strong> (tanto em EVN quanto em EVP). <em>Mecanismo farmacodinâmico cobrado em prova:</em> O <em>E. faecalis</em> é intrinsecamente resistente à ceftriaxona em monoterapia porque ela não se liga às PBPs 4 e 5. Contudo, a ampicilina satura parcialmente as PBPs 4 e 5, enquanto a ceftriaxona em dose alta (2 g 12/12h) satura totalmente as PBPs 2 e 3, produzindo bloqueio completo da síntese do peptideoglicano e potente sinergismo bactericida! Esse esquema apresenta a mesma eficácia de cura da associação Ampicilina + Gentamicina, com <strong>muito menor nefrotoxicidade e ototoxicidade</strong>, além de ser ativo mesmo contra cepas de <em>E. faecalis</em> com resistência de alto nível aos aminoglicosídeos (<strong>HLAR</strong> — <em>High-Level Aminoglycoside Resistance</em>, definida por CIM de gentamicina &gt; 500 mg/L).</li>
  <li><strong>2ª Opção para <em>Enterococcus faecalis</em> não-HLAR (Esquema Clássico com Aminoglicosídeo):</strong> <strong>Ampicilina 12 g/dia IV</strong> (2 g 4/4h) por 4 a 6 semanas + <strong>Gentamicina 3 mg/kg/dia IV</strong> em dose única diária (nas diretrizes recentes ESC 2023, a gentamicina pode ser administrada por apenas 2 semanas para reduzir toxicidade vestibulococlear e renal, mantendo-se a ampicilina por 4 a 6 semanas).</li>
  <li><strong>Cepas resistentes à ampicilina ou pacientes alérgicos a beta-lactâmicos (não-HLAR):</strong> <strong>Vancomicina 30 mg/kg/dia IV</strong> (15 mg/kg 12/12h) + <strong>Gentamicina 3 mg/kg/dia IV</strong> por <strong>6 semanas</strong>.</li>
  <li><strong>Cepas resistentes à vancomicina (VRE — geralmente <em>Enterococcus faecium</em>):</strong> <strong>Daptomicina 10–12 mg/kg/dia IV</strong> associada a um beta-lactâmico (ampicilina, ceftarolina ou ertapenem para efeito <em>seesaw</em> sinérgico) ou fosfomicina/gentamicina, OU <strong>Linezolida 600 mg IV ou VO 12/12h</strong> por &ge; 6 semanas (monitorando rigorosamente plaquetopenia/mielossupressão e neuropatia óptica/periférica após 14 dias de uso).</li>
</ul>

<h3>4. Tratamento do Grupo HACEK, Endocardite Fúngica e Transição Sequencial Oral (Estudo POET)</h3>
<ul>
  <li><strong>Grupo HACEK:</strong> Como diversas cepas produzem beta-lactamases que inativam a ampicilina, o fármaco de escolha é a <strong>Ceftriaxona 2 g/dia IV ou IM em dose única diária</strong> por <strong>4 semanas na EVN</strong> e por <strong>6 semanas na EVP</strong> (alternativa em alérgicos: Ciprofloxacino 400 mg IV 12/12h ou 500 mg VO 12/12h).</li>
  <li><strong>Endocardite Fúngica (<em>Candida</em> spp. e <em>Aspergillus</em> spp.):</strong> Apresenta mortalidade superior a 40%–50% e requer quase invariavelmente <strong>tratamento combinado antifúngico + troca valvar cirúrgica precoce</strong>. Para <em>Candida</em> spp., o tratamento de escolha consiste em <strong>equinocandina em alta dose</strong> (Caspofungina 150 mg/dia IV, Micafungina 150 mg/dia IV ou Anidulafungina 200 mg/dia IV) OU <strong>Anfotericina B Lipossomal</strong> (3 a 5 mg/kg/dia IV), com ou sem adição de flucitosina (25 mg/kg VO 6/6h). Após a cirurgia e estabilização (se a cepa for sensível ao fluconazol, como a maioria das <em>C. albicans</em> e <em>C. parapsilosis</em>), mantém-se terapia supressiva oral com <strong>Fluconazol 400–800 mg/dia VO</strong> por longo prazo (ou indefinidamente se o paciente não puder ser operado ou mantiver prótese). Para <em>Aspergillus</em> spp., o fármaco de escolha é o <strong>Voriconazol</strong> (6 mg/kg IV 12/12h no 1º dia, seguido de 4 mg/kg 12/12h) associado à cirurgia.</li>
  <li><strong>Transição para Antibioticoterapia Oral Domiciliar (OPAT / Estudo POET e Diretriz ESC 2023):</strong> Historicamente, exigia-se internação ou terapia intravenosa durante todo o ciclo de 4 a 6 semanas. Com base no ensaio clínico randomizado <strong>POET</strong> (<em>Partial Oral Treatment of Endocarditis</em>), a Diretriz ESC 2023 recomenda que pacientes clinicamente estáveis com endocardite de câmaras esquerdas causada por estreptococos, <em>E. faecalis</em>, <em>S. aureus</em> ou ECN possam ser transicionados para <strong>terapia antimicrobiana oral combinada (sempre com 2 antibióticos de classes diferentes e alta biodisponibilidade)</strong> após completarem pelo menos <strong>10 dias de terapia intravenosa efetiva</strong> (ou pelo menos 7 dias após cirurgia valvar corretiva), desde que preencham todos os critérios de segurança: ausência de febre por &gt; 48h, PCR em queda acentuada, ausência de insuficiência cardíaca descompensada, e realização obrigatória de <strong>ETE pré-transição</strong> descartando abscesso perivalvar ou progressão da lesão.</li>
</ul>

<table class="book-table">
  <thead>
    <tr>
      <th>Agente Etiológico</th>
      <th>Substrato Valvar</th>
      <th>Esquema Antimicrobiano de 1ª Escolha</th>
      <th>Duração Total</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong><em>Streptococcus</em> oral / <em>S. gallolyticus</em></strong> (CIM penicilina &le; 0,125 mg/L)</td>
      <td>Valva Nativa (EVN)</td>
      <td>Penicilina G 12–18 mi UI/dia IV, Ampicilina 2 g IV 4/4h ou Ceftriaxona 2 g IV 24/24h (isolados por 4 sem; ou + Gentamicina 3 mg/kg/d por 2 sem)</td>
      <td>4 semanas (ou 2 sem se combinado com Gentamicina em EVN não complicada)</td>
    </tr>
    <tr>
      <td><strong><em>Staphylococcus aureus</em> MSSA</strong></td>
      <td>Valva Nativa (EVN)</td>
      <td><strong>Oxacilina 2 g IV 4/4h</strong> (ou Cefazolina 2 g IV 8/8h). <em>Sem gentamicina e sem rifampicina!</em></td>
      <td>4 a 6 semanas (2 sem se tricúspide isolada não complicada em UDI)</td>
    </tr>
    <tr>
      <td><strong><em>Staphylococcus aureus</em> MRSA</strong></td>
      <td>Valva Nativa (EVN)</td>
      <td><strong>Vancomicina 15–20 mg/kg IV 8/8h–12/12h</strong> ou <strong>Daptomicina 10 mg/kg/dia IV</strong></td>
      <td>4 a 6 semanas</td>
    </tr>
    <tr>
      <td><strong><em>Staphylococcus</em> spp. (MSSA / MRSA / ECN)</strong></td>
      <td>Valva Protética (EVP)</td>
      <td>Oxacilina (se MSSA) ou Vancomicina (se MRSA/MRSE) + <strong>Rifampicina 900–1200 mg/d</strong> (após 3–5d) + <strong>Gentamicina 3 mg/kg/d</strong> (nas 2 primeiras sem)</td>
      <td>&ge; 6 semanas (Gentamicina apenas por 2 semanas)</td>
    </tr>
    <tr>
      <td><strong><em>Enterococcus faecalis</em></strong></td>
      <td>EVN ou EVP</td>
      <td><strong>Ampicilina 2 g IV 4/4h + Ceftriaxona 2 g IV 12/12h</strong> (preferencial em idosos/IRC e HLAR) OU Ampicilina + Gentamicina 3 mg/kg/dia</td>
      <td>6 semanas (Ampicilina + Ceftriaxona) ou 4–6 semanas (Ampicilina + Gentamicina)</td>
    </tr>
    <tr>
      <td><strong>Grupo HACEK</strong></td>
      <td>EVN ou EVP</td>
      <td><strong>Ceftriaxona 2 g IV/IM 24/24h</strong> (ou Ciprofloxacino em alérgicos)</td>
      <td>4 semanas (EVN) ou 6 semanas (EVP)</td>
    </tr>
  </tbody>
</table>
`
    },
    {
      id: 'indicacoes-cirurgicas-emergencia-urgencia',
      title: '8. Tratamento Cirúrgico na Endocardite Infecciosa: Os Três Pilares e o Timing Operatório',
      body_html: `
<h3>Os Três Grandes Pilares de Indicação Cirúrgica</h3>
<p>Cerca de 50% dos pacientes acometidos por endocardite infecciosa de câmaras esquerdas necessitam de intervenção cirúrgica (plastia ou substituição valvar com desbridamento radical de tecidos necróticos e reconstrução anular) durante a fase ativa da doença (enquanto ainda estão em uso de antibioticoterapia). As diretrizes internacionais (ESC 2023, AHA/ACC e SBC) organizam todas as indicações cirúrgicas na fase aguda em exatamente <strong>três pilares fisiopatológicos</strong>:</p>
<ol>
  <li><strong>Insuficiência Cardíaca (IC) por disfunção valvar aguda</strong> (principal causa de indicação cirúrgica e principal causa de óbito na EI).</li>
  <li><strong>Infecção não controlada localmente ou microbiologicamente</strong> (extensão perivalvar, febre/bacteremia persistente ou microrganismos refratários à cura clínica isolada).</li>
  <li><strong>Prevenção de tromboembolismo sistêmico</strong> (baseada no tamanho da vegetação e na ocorrência de eventos embólicos prévios).</li>
</ol>
<p>Quanto ao <em>timing</em> (momento) da intervenção, a Diretriz ESC 2023 define três categorias temporais precisas:</p>
<ul>
  <li><strong>Cirurgia de Emergência (dentro de 24 horas):</strong> indicada quando há colapso hemodinâmico iminente ou instalado (edema agudo de pulmão refratário ou choque cardiogênico).</li>
  <li><strong>Cirurgia de Urgência (dentro de 3 a 5 dias):</strong> indicada na maioria das situações de IC sem choque, complicações perivalvares (abscesso, pseudoaneurisma, fístula) e vegetações de alto risco embólico.</li>
  <li><strong>Cirurgia Não Urgente (dentro da mesma internação hospitalar, após 1 a 2 semanas):</strong> indicada em regurgitações graves bem toleradas hemodinamicamente e sem outros motivos de urgência.</li>
</ul>

<h3>Pilar 1: Insuficiência Cardíaca (IC) — A Indicação Mais Comum</h3>
<p>A destruição aguda dos folhetos valvares (especialmente a perfuração das cúspides aórticas ou a ruptura de cordoalhas mitrais) impõe sobrecarga abrupta de volume a um ventrículo esquerdo não complacente e não adaptado, precipitando elevação dramática da pressão diastólica final do VE e congestão pulmonar grave:</p>
<ul>
  <li><strong>Indicação de EMERGÊNCIA (&lt; 24h):</strong> Endocardite aórtica ou mitral (nativa ou protética) cursando com regurgitação aguda grave, obstrução valvar ou fístula intracardíaca que cause <strong>edema agudo de pulmão refratário ou choque cardiogênico</strong>. <em>Nota: na insuficiência aórtica aguda grave por EI, o uso de balão intra-aórtico (BIA) é <strong>absolutamente contraindicado</strong>, pois a insuflação diastólica do balão agrava o refluxo para o ventrículo esquerdo!</em></li>
  <li><strong>Indicação de URGÊNCIA (3 a 5 dias):</strong> Endocardite aórtica ou mitral com regurgitação grave ou obstrução causando sintomas de insuficiência cardíaca (NYHA II–IV) ou sinais ecocardiográficos de intolerância hemodinâmica (fechamento precoce da valva mitral na diástole antes do complexo QRS no caso de IAo aguda, pressões de enchimento elevadas ou hipertensão pulmonar moderada/grave).</li>
</ul>

<h3>Pilar 2: Infecção Não Controlada (Extensão Perivalvar, Bacteremia Persistente e Agentes Difíceis)</h3>
<p>A extensão da infecção além do anel valvar ocorre em 10% a 40% das endocardites aórticas nativas e em 56% a 100% das endocardites de prótese valvar, sendo o principal preditor de mortalidade operatória e falha do tratamento clínico isolado:</p>
<ul>
  <li><strong>Complicações locais paravalvares (Indicação de URGÊNCIA em 3–5 dias):</strong> presença de <strong>abscesso perivalvar</strong>, <strong>pseudoaneurisma</strong>, <strong>fístula intracardíaca</strong>, vegetação em crescimento progressivo apesar de antibioticoterapia adequada ou deiscência protética. <em>Dica Semiológica e Eletrocardiográfica de Ouro para Residência:</em> Como o nó atrioventricular (AV) e o feixe de His transitam pelo septo interventricular membranoso em íntima contiguidade anatômica com a cúspide não coronariana e a cúspide coronariana direita da valva aórtica, o <strong>surgimento de um bloqueio atrioventricular novo (mesmo BAV de 1º grau com prolongamento do intervalo PR &gt; 200 ms, BAV de 2º grau, BAV total ou bloqueio de ramo esquerdo novo)</strong> em um paciente com endocardite infecciosa é altamente específico de <strong>abscesso perivalvar do anel aórtico</strong>, exigindo ETE/TC cardíaca imediata e cirurgia de urgência!</li>
  <li><strong>Infecção clinicamente persistente (Indicação de URGÊNCIA):</strong> febre persistente e <strong>hemoculturas persistentemente positivas após 5 a 7 dias</strong> de antibioticoterapia apropriada, desde que tenham sido descartados focos metastáticos extracardíacos drenáveis (como abscesso esplênico, renal ou espondilodiscite) e febre induzida por fármacos (beta-lactâmicos).</li>
  <li><strong>Microrganismos com baixa probabilidade de cura apenas com antibióticos (Indicação de URGÊNCIA):</strong> endocardite causada por <strong>fungos (<em>Candida</em> spp., <em>Aspergillus</em> spp.)</strong> ou bactérias multirresistentes (MRSA com falha clínica, VRE, bacilos Gram-negativos não-HACEK como <em>Pseudomonas aeruginosa</em> e <em>Serratia marcescens</em>), ou endocardite de prótese valvar causada por estafilococos ou bacilos Gram-negativos não-HACEK.</li>
</ul>

<h3>Pilar 3: Prevenção de Embolização Sistêmica (Os Limiares de 10 mm e 15 mm)</h3>
<p>Eventos embólicos ocorrem em 20% a 50% dos pacientes com EI, acometendo preferencialmente o sistema nervoso central e o baço nas lesões esquerdas, e os pulmões nas lesões direitas. O risco de nova embolização é máximo antes do início dos antibióticos e durante a <strong>primeira semana de antibioticoterapia</strong>, caindo substancialmente após 14 dias de tratamento efetivo. Por isso, a cirurgia para prevenção de embolia tem máximo benefício quando realizada precocemente (em 3 a 5 dias):</p>
<ul>
  <li><strong>Vegetação &ge; 10 mm + Evento embólico prévio (Classe I — URGÊNCIA):</strong> cirurgia indicada em pacientes com endocardite aórtica ou mitral (nativa ou protética) que apresentem vegetação persistente &ge; 10 mm após a ocorrência de um ou mais episódios embólicos (sintomáticos ou silenciosos na imagem) sob antibioticoterapia adequada.</li>
  <li><strong>Vegetação &ge; 10 mm + Estenose ou Regurgitação valvar grave ou baixo risco cirúrgico (Classe I / IIa — URGÊNCIA):</strong> cirurgia indicada quando a vegetação mede &ge; 10 mm e associa-se a disfunção valvar grave (mesmo sem embolia prévia).</li>
  <li><strong>Vegetação muito grande isolada (&gt; 15 mm ou &gt; 30 mm) sem embolia prévia e sem disfunção valvar grave:</strong> a cirurgia de urgência pode ser considerada (Classe IIb na ESC 2023) quando a vegetação isolada mede &ge; 15 mm (especialmente se for possível preservar e reparar a valva nativa em vez de trocá-la por prótese).</li>
</ul>

<h4>Indicações Cirúrgicas na Endocardite de Câmaras Direitas (Tricúspide)</h4>
<p>A endocardite isolada de valva tricúspide apresenta prognóstico muito mais favorável que a esquerda, respondendo ao tratamento clínico isolado em 85% a 90% dos casos. A cirurgia na EI tricúspide reserva-se a situações específicas: (1) insuficiência cardíaca direita refratária a diuréticos secundária a regurgitação tricúspide grave; (2) bacteremia persistente por &gt; 7 dias (ex.: <em>S. aureus</em>, <em>P. aeruginosa</em>) ou endocardite fúngica apesar de terapia antimicrobiana adequada; ou (3) <strong>vegetação tricúspide persistente &gt; 20 mm associada a êmbolos pulmonares sépticos recorrentes</strong>, com ou sem insuficiência cardíaca direita.</p>

<table class="book-table">
  <thead>
    <tr>
      <th>Pilar de Indicação</th>
      <th>Situação Clínica ou Ecocardiográfica</th>
      <th>Timing Cirúrgico (ESC 2023)</th>
      <th>Classe de Recomendação</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>1. Insuficiência Cardíaca</strong></td>
      <td>IAo ou IM aguda grave com <strong>edema agudo de pulmão refratário ou choque cardiogênico</strong></td>
      <td><strong>Emergência (&lt; 24h)</strong></td>
      <td>Classe I</td>
    </tr>
    <tr>
      <td><strong>1. Insuficiência Cardíaca</strong></td>
      <td>IAo ou IM aguda grave com sintomas de IC ou sinais ecocardiográficos de má tolerância hemodinâmica</td>
      <td><strong>Urgência (3–5 dias)</strong></td>
      <td>Classe I</td>
    </tr>
    <tr>
      <td><strong>2. Infecção Não Controlada</strong></td>
      <td><strong>Abscesso perivalvar, pseudoaneurisma, fístula</strong> ou vegetação em crescimento</td>
      <td><strong>Urgência (3–5 dias)</strong></td>
      <td>Classe I</td>
    </tr>
    <tr>
      <td><strong>2. Infecção Não Controlada</strong></td>
      <td>Endocardite causada por <strong>fungos ou microrganismos multirresistentes</strong> (BGN não-HACEK, VRE)</td>
      <td><strong>Urgência (3–5 dias)</strong></td>
      <td>Classe I</td>
    </tr>
    <tr>
      <td><strong>2. Infecção Não Controlada</strong></td>
      <td>Hemoculturas persistentemente positivas após 5–7 dias de ATB adequado (excluídos focos extracardíacos)</td>
      <td><strong>Urgência (3–5 dias)</strong></td>
      <td>Classe IIa</td>
    </tr>
    <tr>
      <td><strong>3. Prevenção de Embolia</strong></td>
      <td><strong>Vegetação &ge; 10 mm</strong> após &ge; 1 episódio embólico sob ATB, ou associada a lesão valvar grave</td>
      <td><strong>Urgência (3–5 dias)</strong></td>
      <td>Classe I</td>
    </tr>
    <tr>
      <td><strong>3. Prevenção de Embolia</strong></td>
      <td><strong>Vegetação isolada &ge; 15 mm</strong> sem embolia prévia e sem lesão valvar grave</td>
      <td><strong>Urgência (3–5 dias)</strong></td>
      <td>Classe IIb</td>
    </tr>
    <tr>
      <td><strong>EI Câmaras Direitas (Tricúspide)</strong></td>
      <td><strong>Vegetação tricúspide &gt; 20 mm</strong> com embolia pulmonar séptica recorrente ou IC direita refratária</td>
      <td><strong>Urgência (3–5 dias)</strong></td>
      <td>Classe I</td>
    </tr>
  </tbody>
</table>
`
    },
    {
      id: 'complicacoes-neurologicas-anticoagulacao-dcei',
      title: '9. Manejo das Complicações Neurológicas, Anticoagulação e Infecções de Dispositivos (DCEI)',
      body_html: `
<h3>Complicações Neurológicas e o Timing da Cirurgia Cardíaca com Circulação Extracorpórea</h3>
<p>As complicações neurológicas sintomáticas acometem 15% a 30% dos pacientes com endocardite infecciosa (e lesões isquêmicas silenciosas são detectadas na ressonância magnética cerebral em até 60% a 80% dos casos), decorrendo majoritariamente da embolização de vegetações (sobretudo mitrais anteriores e por <em>S. aureus</em>). Quando um paciente sofre um evento neurológico agudo, mas concomitantemente apresenta indicação formal de cirurgia cardíaca (insuficiência cardíaca, abscesso perivalvar ou alto risco embólico residual), surge um dilema crucial: a heparinização plena em dose alta exigida pela circulação extracorpórea (CEC) e a hipotensão durante a perfusão podem causar transformação hemorrágica fatal ou expansão do hematoma intracraniano.</p>
<p>As diretrizes atuais (ESC 2023 e AHA) estabeleceram regras claras que são amplamente exploradas em provas de residência:</p>
<ul>
  <li><strong>Após Ataque Isquêmico Transitório (AIT) ou AVC Isquêmico Silencioso (sem hemorragia e sem coma):</strong> A cirurgia cardíaca indicada (por IC, infecção não controlada ou risco embólico) <strong>NÃO deve ser adiada</strong>, podendo ser realizada com segurança imediatamente!</li>
  <li><strong>Após AVC Isquêmico Sintomático Não Hemorrágico (excluída hemorragia por TC/RM de crânio e desde que o paciente não esteja em coma profundo):</strong> Se houver insuficiência cardíaca descompensada, infecção não controlada, abscesso ou risco embólico persistente alto, a cirurgia cardíaca <strong>não deve ser postergada</strong> (pode ser realizada precocemente na primeira semana). Apenas nos casos de infarto cerebral extenso com grande efeito de massa ou coma profundo o prognóstico neurológico é reservado e a cirurgia deve ser adiada/reavaliada.</li>
  <li><strong>Após Hemorragia Intracraniana (AVC hemorrágico parenquimatoso ou hemorragia subaracnóidea):</strong> O risco de deterioração neurológica catastrófico durante a CEC é altíssimo. Portanto, na presença de <strong>hemorragia intracraniana</strong>, a cirurgia cardíaca deve ser <strong>adiada por pelo menos 4 semanas (1 mês)</strong>, sempre que a condição hemodinâmica permitir. Caso o paciente apresente hemorragia intracraniana, deve-se realizar angiotomografia, angiorressonância ou angiografia cerebral digital para pesquisar <strong>aneurisma infeccioso (micótico)</strong> roto, que deve ser tratado por embolização endovascular ou clipagem neurocirúrgica antes da cirurgia cardíaca.</li>
  <li><strong>Trombólise no AVC Isquêmico Cardioembólico da Endocardite Infecciosa (Pegadinha clássica!):</strong> Se um paciente com endocardite infecciosa apresenta um AVC isquêmico agudo com &lt; 4,5 horas de evolução, a <strong>trombólise intravenosa com Alteplase (rt-PA) é CONTRAINDICADA</strong> (Classe III), pois os êmbolos sépticos causam arterite necrosante focal e a administração de trombolítico acarreta risco proibitivo (&gt; 20%) de transformação hemorrágica intracraniana maciça! O tratamento de reperfusão indicado para oclusão de grande vaso cerebral proximal (M1, carótida interna, basilar) na EI é a <strong>trombectomia mecânica endovascular</strong>.</li>
</ul>

<h3>Manejo da Anticoagulação e Antiagregação na Endocardite Infecciosa</h3>
<p>A endocardite infecciosa não é indicação para iniciar anticoagulação ou antiagregação plaquetária de rotina; pelo contrário, iniciar anticoagulantes apenas por causa da vegetação não previne embolias e aumenta o risco de hemorragia cerebral. E se o paciente já fazia uso prévio de varfarina ou anticoagulante oral direto (DOAC) por fibrilação atrial ou prótese valvar mecânica?</p>
<ul>
  <li><strong>Na ausência de AVC:</strong> Se o paciente usa anticoagulante oral (varfarina) por prótese mecânica e está instável ou com programação cirúrgica/invasiva ou sepse por <em>S. aureus</em>, costuma-se suspender a varfarina e substituir temporariamente por heparina não fracionada (HNF) ou heparina de baixo peso molecular sob rigorosa monitorização.</li>
  <li><strong>Na presença de AVC isquêmico em portador de prótese mecânica:</strong> Suspende-se a anticoagulação oral por 1 a 2 semanas (ou substitui-se cautelosamente por HNF após descartar transformação hemorrágica em TC seriada nos casos de pequeno infarto).</li>
  <li><strong>Na presença de hemorragia intracraniana:</strong> <strong>Suspender imediatamente toda anticoagulação e antiagregação</strong> e reverter o efeito anticoagulante (vitamina K / complexo protrombínico para varfarina; sulfato de protamina para heparina). Nos portadores de prótese valvar mecânica que sofreram hemorragia intracraniana, a anticoagulação com heparina não fracionada só deve ser reintroduzida com extrema cautela após discussão multidisciplinar (habitualmente após 1 a 2 semanas, quando a estabilidade tomográfica do sangramento for confirmada).</li>
</ul>

<h3>Endocardite Associada a Dispositivos Cardíacos Eletrônicos Implantáveis (DCEI — Marca-passo e CDI)</h3>
<p>A infecção de um marca-passo definitivo ou cardiodesfibrilador implantável pode restringir-se à loja subcutânea do gerador ou estender-se pelos cabos-eletrodos transvenosos até o endocárdio atrial direito e a valva tricúspide. O diagnóstico apoia-se em hemoculturas, ETE e 18F-FDG PET/CT. O princípio terapêutico fundamental e inegociável da infecção de DCEI é que <strong>a antibioticoterapia isolada falha quase invariavelmente e cursa com altíssima mortalidade e recidiva</strong>. Portanto:</p>
<ul>
  <li>Em toda endocardite de DCEI (ou infecção de loja do gerador), está indicada a <strong>extração completa e precoce de todo o sistema (gerador + todos os cabos-eletrodos)</strong>, preferencialmente por via percutânea transvenosa (com bainhas mecânicas ou a laser em centros especializados), a menos que haja vegetações gigantes nos cabos (&gt; 20 mm), situação em que se considera extração cirúrgica aberta ou aspiração percutânea prévia pelo risco de embolia pulmonar séptica maciça.</li>
  <li>Após a retirada do sistema infectado, deve-se reavaliar se o paciente ainda possui indicação real de estimulação cardíaca (até 30% não precisam mais de reimplante!). Caso o reimplante seja indispensável (ex.: bloqueio atrioventricular total dependente de marca-passo), utiliza-se estimulação temporária ativa e o <strong>novo dispositivo definitivo deve ser implantado no hemitórax contralateral</strong> (ou opta-se por marca-passo sem cabos — <em>leadless pacemaker</em> — ou CDI subcutâneo), <strong>somente após as hemoculturas de controle permanecerem negativas por pelo menos 72 horas</strong> (ou por 14 dias se havia vegetação valvar associada).</li>
</ul>
`
    },
    {
      id: 'complicacoes-extracardiacas-abscesso-esplenico',
      title: '10. Complicações Extracardíacas: Abscesso Esplênico, Espondilodiscite e Aneurismas Micóticos',
      body_html: `
<h3>Abscesso Esplênico vs. Infarto Esplênico Não Complicado</h3>
<p>O baço é um dos órgãos mais frequentemente acometidos por fenômenos embólicos nas endocardites de câmaras esquerdas. Cerca de 30% a 40% dos pacientes apresentam <strong>infartos esplênicos</strong> à tomografia de abdome, a maioria dos quais são assintomáticos ou causam dor moderada no hipocôndrio esquerdo e evoluem para resolução espontânea apenas com o tratamento antimicrobiano da endocardite. Em cerca de 5% dos casos, contudo, o infarto sofre colonização bacteriana secundária ou decorre de êmbolo séptico virulento (<em>S. aureus</em>, estreptococos do grupo <em>anginosus</em>, enterococos), evoluindo para um <strong>abscesso esplênico</strong> verdadeiro.</p>
<p>Clinicamente, deve-se suspeitar de abscesso esplênico em todo paciente com endocardite que mantenha <strong>febre persistente, bacteremia refratária ou recorrência da febre</strong> associada a dor abdominal superior esquerda, dor pleurítica na base esquerda, derrame pleural reacional à esquerda ou esplenomegalia dolorosa. A tomografia computadorizada com contraste ou a ressonância magnética (e o 18F-FDG PET/CT) diferenciam o infarto simples (lesão hipodensa periférica clássica em formato de cunha com base voltada para a cápsula esplênica e sem captação periférica exuberante) do abscesso esplênico (lesão arredondada ou multiloculada com liquefação central, gás no interior e realce capsular periférico).</p>
<p><strong>Conduta Cirúrgica Crítica (Regra de Prova):</strong> Quando um paciente com endocardite infecciosa apresenta simultaneamente um <strong>abscesso esplênico</strong> e indicação de cirurgia de troca valvar cardíaca, o abscesso esplênico deve ser erradicado <strong>ANTES da cirurgia cardíaca</strong> (por <strong>esplenectomia</strong> ou, em casos selecionados de coleção única acessível, drenagem percutânea guiada por imagem), a fim de evitar que a bacteremia contínua oriunda do baço abcedado infecte imediatamente a nova prótese valvar recém-implantada! Caso ambos os procedimentos precisem ocorrer na mesma internação de urgência e a condição clínica permita, realiza-se a esplenectomia previamente à troca valvar.</p>

<h3>Complicações Osteoarticulares (Espondilodiscite e Artrite Séptica)</h3>
<p>Manifestações musculoesqueléticas ocorrem em até 40% das endocardites (artralgias e mialgias imunomediadas), mas cerca de 5% a 10% desenvolvem infecção osteoarticular hematogênica metastática verdadeira, sobretudo <strong>espondilodiscite piogênica</strong> (infecção do disco intervertebral e dos platôs vertebrais adjacentes, predominando na coluna lombar) e artrite séptica mono ou oligoarticular. Os agentes mais fortemente implicados na associação com espondilodiscite são o <strong><em>Streptococcus gallolyticus</em>, o <em>Enterococcus faecalis</em>, o <em>Staphylococcus aureus</em> e os estafilococos coagulase-negativos</strong>.</p>
<p>Portanto, diante de qualquer paciente com lombalgia inflamatória intensa associada a febre, é mandatório solicitar ressonância magnética da coluna (exame mais sensível e específico) e, inversamente, diante de um diagnóstico de espondilodiscite espontânea hematogênica por cocos Gram-positivos, deve-se sempre realizar ecocardiograma para rastrear endocardite infecciosa subjacente! Quando a endocardite coexiste com espondilodiscite, a duração total da antibioticoterapia deve ser estendida para <strong>6 semanas</strong> (ou até a normalização clínica e inflamatória do foco vertebral).</p>

<h3>Aneurismas Infecciosos (Micóticos) Intracranianos e Extracranianos</h3>
<p>Os aneurismas infecciosos ocorrem em 2% a 4% das endocardites infecciosas (sendo provavelmente subdiagnosticados quando silenciosos) e localizam-se, em mais de 60% das vezes, na circulação cerebral — tipicamente nos <strong>ramos distais periféricos da artéria cerebral média</strong> (diferentemente dos aneurismas saculares congênitos não infecciosos, que se localizam nas bifurcações proximais do polígono de Willis). Muitos aneurismas micóticos pequenos não rotos regridem completamente apenas com a antibioticoterapia bactericida. Contudo, aneurismas rotos (que causam hemorragia subaracnóidea ou hematoma intraparenquimatoso), aneurismas muito volumosos ou aqueles que aumentam de tamanho em exames seriados de angio-TC/angio-RM ou arteriografia digital exigem <strong>intervenção endovascular (embolização com molas/<em>coils</em> ou cola biológica) ou neurocirúrgica</strong>, obrigatoriamente antes de qualquer cirurgia cardíaca que necessite de heparinização sistêmica.</p>
`
    },
    {
      id: 'profilaxia-antibiotica-endocardite',
      title: '11. Profilaxia Antibiótica da Endocardite Infecciosa (Diretrizes SBC, AHA e ESC 2023)',
      body_html: `
<h3>Mudança de Paradigma na Profilaxia da Endocardite</h3>
<p>A profilaxia antimicrobiana da endocardite infecciosa sofreu uma drástica restrição a partir das diretrizes da AHA (2007) e da ESC (2009/2015/2023), acompanhadas pela Sociedade Brasileira de Cardiologia (SBC). Compreendeu-se que a imensa maioria dos casos de endocardite por estreptococos orais não decorre de procedimentos odontológicos esporádicos, mas sim de <strong>bacteremias transitórias diárias e cumulativas provocadas pela mastigação, uso de fio dental e escovação dentária</strong> em indivíduos com gengivite e periodontite. Dessa forma, a manutenção de rigorosa higiene oral e visitas odontológicas regulares é mais eficaz que o antibiótico profilático isolado, e a antibioticoprofilaxia ficou restrita apenas à intersecção entre <strong>(1) pacientes de ALTÍSSIMO RISCO cardiovascular</strong> e <strong>(2) procedimentos ODONTOLÓGICOS de alto risco</strong>.</p>
<p><em>Observação sobre o contexto brasileiro (Diretriz SBC de Valvopatias):</em> Enquanto a AHA e a ESC restringem a profilaxia estritamente aos portadores de próteses, EI prévia e cardiopatias congênitas selecionadas, a diretriz brasileira da SBC pondera que, devido à alta prevalência de febre reumática e precariedade de saúde bucal no país, a profilaxia odontológica também pode ser considerada em pacientes portadores de <strong>valvopatia reumática crônica nativa com lesão anatômica significativa</strong>. Nas questões de residência que cobram literalmente a AHA/ESC, todavia, valvopatias nativas adquiridas (prolapso mitral, estenose aórtica, febre reumática sem prótese) NÃO têm indicação formal de profilaxia; por isso, deve-se conhecer com exatidão os critérios clássicos de altíssimo risco.</p>

<h3>1. QUEM tem Indicação Formal de Profilaxia? (Pacientes de Alto Risco — AHA / ESC 2023)</h3>
<ul>
  <li><strong>1. Portadores de qualquer prótese valvar cardíaca:</strong> mecânica, biológica ou homoenxerto, implantada por cirurgia convencional ou transcateter (TAVI), ou pacientes nos quais foi utilizado <strong>qualquer material protético para reparo/plastia valvar</strong> (como anéis de anuloplastia, cordas artificiais ou clipes mitrais/tricúspides).</li>
  <li><strong>2. Pacientes com episódio prévio de Endocardite Infecciosa:</strong> mesmo que não possuam prótese valvar.</li>
  <li><strong>3A. Cardiopatia Congênita (CC) cianótica não corrigida:</strong> qualquer cardiopatia congênita cianótica não corrigida, incluindo pacientes submetidos apenas a <em>shunts</em> paliativos (como Blalock-Taussig) ou condutos paliativos.</li>
  <li><strong>3B. Cardiopatia Congênita corrigida com material protético nos primeiros 6 meses:</strong> cardiopatia congênita submetida a correção completa (cirúrgica ou percutânea) com uso de material protético (<em>patch</em>, prótese de Amplatzer, tubo), <strong>APENAS durante os primeiros 6 meses após o procedimento</strong> (tempo necessário para a completa endotelização do material protético).</li>
  <li><strong>3C. Cardiopatia Congênita corrigida com defeito residual junto ao material protético:</strong> cardiopatia congênita corrigida que permaneça com <strong>defeito residual (<em>shunt</em> ou regurgitação residual) no local ou adjacente ao local do material protético</strong> (o que impede a endotelização completa da prótese por tempo indeterminado).</li>
  <li><strong>4. Receptores de transplante cardíaco que desenvolvem valvopatia regurgitante no enxerto:</strong> além de portadores de dispositivos de assistência ventricular de longa permanência (LVAD, adicionados como Classe I na Diretriz ESC 2023).</li>
</ul>
<p><strong>Quem NÃO tem indicação de profilaxia (Pegadinhas clássicas de prova!):</strong> Prolapso da valva mitral (com ou sem sopro), valva aórtica bicúspide nativa, estenose ou insuficiência aórtica/mitral degenerativa nativa, comunicação interatrial (CIA) tipo <em>ostium secundum</em> isolada, comunicação interventricular (CIV) ou persistência do canal arterial (PCA) corrigidas há mais de 6 meses sem defeito residual, miocardiopatia hipertrófica obstrutiva, portadores de marca-passo definitivo ou CDI, e portadores de <em>stents</em> coronarianos ou enxertos vasculares periféricos.</p>

<h3>2. QUAL Procedimento Exige Profilaxia?</h3>
<ul>
  <li><strong>INDICAÇÃO FORMAL (Procedimentos Odontológicos de Alto Risco):</strong> Exclusivamente procedimentos odontológicos que envolvam <strong>manipulação do tecido gengival</strong>, <strong>manipulação da região periapical dos dentes</strong> ou <strong>perfuração da mucosa oral</strong> (ex.: extração dentária, cirurgia periodontal, raspagem e alisamento radicular subgengival, implante dentário, tratamento endodôntico/canal além do ápice, biópsia de mucosa oral e profilaxia/limpeza dentária com sangramento gengival previsto).</li>
  <li><strong>Procedimentos Odontológicos que NÃO exigem profilaxia:</strong> Injeção de anestésico local rotineira através de mucosa não infectada, realização de radiografias dentárias, colocação ou ajuste de aparelhos ortodônticos/próteses removíveis, queda natural de dentes decíduos ("dentes de leite") e sangramento labial ou de mucosa oral por trauma.</li>
  <li><strong>Procedimentos Não Odontológicos (Gastrointestinais, Geniturinários, Respiratórios e Obstétricos):</strong> A profilaxia antibiótica visando prevenir endocardite <strong>NÃO É RECOMENDADA</strong> para endoscopia digestiva alta, colonoscopia (com ou sem polipectomia), cistoscopia, parto vaginal ou cesariana, histerectomia, ecocardiograma transesofágico ou broncoscopia sem incisão. <em>Exceção:</em> se o paciente de alto risco for submetido a procedimento invasivo respiratório com incisão da mucosa (ex.: amigdalectomia, adenoidectomia) ou drenagem de infecção ativa estabelecida (ex.: drenagem de abscesso cutâneo ou procedimento urológico na vigência de infecção urinária ativa por enterococo), o antibiótico usado deve conter cobertura ativa contra o patógeno daquela infecção.</li>
</ul>

<h3>3. Regimes Antimicrobianos Profiláticos (Dose Única 30 a 60 Minutos Antes do Procedimento)</h3>
<p>O alvo microbiológico exclusivo da profilaxia odontológica são os <strong>estreptococos orais do grupo <em>viridans</em></strong>. Caso o antibiótico não tenha sido administrado antes do procedimento por esquecimento, ele ainda pode ser administrado em até 2 horas após o término da manipulação odontológica. <em>Nota importante da atualização AHA / ESC 2023:</em> a <strong>Clindamicina NÃO é mais recomendada</strong> para profilaxia odontológica em alérgicos à penicilina devido à alta frequência de reações adversas graves e colite pseudomembranosa por <em>Clostridioides difficile</em>!</p>

<table class="book-table">
  <thead>
    <tr>
      <th>Situação Clínica do Paciente</th>
      <th>Antibiótico Recomendado</th>
      <th>Dose em Adultos (30–60 min antes)</th>
      <th>Dose Pediátrica (30–60 min antes)</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>Via Oral Padrão (Sem alergia à penicilina)</strong></td>
      <td><strong>Amoxicilina</strong></td>
      <td><strong>2 g VO</strong> (dose única)</td>
      <td><strong>50 mg/kg VO</strong> (máx. 2 g)</td>
    </tr>
    <tr>
      <td><strong>Incapaz de Ingerir Medicação Oral (Sem alergia)</strong></td>
      <td><strong>Ampicilina</strong> OU <strong>Cefazolina / Ceftriaxona</strong></td>
      <td>Ampicilina <strong>2 g IV ou IM</strong>; ou Cefazolina/Ceftriaxona <strong>1 g IV ou IM</strong></td>
      <td>Ampicilina 50 mg/kg IV/IM; ou Cefazolina/Ceftriaxona 50 mg/kg IV/IM</td>
    </tr>
    <tr>
      <td><strong>Alérgico à Penicilina — Via Oral</strong></td>
      <td><strong>Cefalexina</strong> (se alergia não anafilática)<br>OU <strong>Azitromicina / Claritromicina</strong><br>OU <strong>Doxiciclina</strong></td>
      <td>Cefalexina <strong>2 g VO</strong>;<br>Azitromicina ou Claritromicina <strong>500 mg VO</strong>;<br>Doxiciclina <strong>100 mg VO</strong></td>
      <td>Cefalexina 50 mg/kg VO;<br>Azitromicina/Claritromicina 15 mg/kg VO;<br>Doxiciclina: 2,2 mg/kg se &lt; 45 kg (100 mg se &gt; 45 kg)</td>
    </tr>
    <tr>
      <td><strong>Alérgico à Penicilina — Via Parenteral</strong></td>
      <td><strong>Cefazolina ou Ceftriaxona</strong> (se não anafilática; evitar se anafilaxia/angioedema/urticária imediata à penicilina)</td>
      <td><strong>1 g IV ou IM</strong></td>
      <td><strong>50 mg/kg IV ou IM</strong></td>
    </tr>
  </tbody>
</table>
`
    },
    {
      id: 'casos-clinicos-comentados',
      title: '12. Casos Clínicos Aplicados à Prática e às Provas de Residência',
      body_html: `
<h3>Caso Clínico 1 — Endocardite Subaguda e a Conexão Cólon-Coração</h3>
<p><strong>Vinheta Clínica:</strong> Homem de 68 anos, hipertenso e portador de estenose aórtica degenerativa moderada conhecida, procura atendimento médico por quadro arrastado há 6 semanas de febre vespertina (38,2 °C), sudorese noturna profusa, astenia progressiva, lombalgia mecânico-inflamatória e perda ponderal de 5 kg. Nega procedimentos dentários recentes. Ao exame físico: hipocorado (++/4+), PA 128 × 64 mmHg, FC 94 bpm, temperatura axilar de 38,3 °C. Fundo de olho revela lesão hemorrágica oval com centro esbranquiçado na retina direita. Nas mãos, observam-se dois pequenos nódulos violáceos dolorosos nas polpas digitais do 2º e 3º quirodáctilos esquerdos. Ausculta cardíaca demonstra sopro sistólico ejetivo rude em foco aórtico (3+/6+) acompanhado de sopro diastólico aspirativo (2+/6+) em foco aórtico acessório. Baço palpável a 3 cm do rebordo costal esquerdo. Exames laboratoriais: Hb 9,6 g/dL (normocítica/normocrômica, com leve microcitose associada e ferritina baixa), leucócitos 12.400/mm³, VHS 88 mm/1ªh, PCR 112 mg/L, fator reumatoide positivo, sedimento urinário com hematúria dismórfica (35 hemácias/campo). Três pares de hemoculturas periféricas positivam em 18 horas para <em>Streptococcus gallolyticus</em> subsp. <em>gallolyticus</em> com CIM para penicilina = 0,06 mg/L. O ecocardiograma transesofágico (ETE) evidencia vegetação móvel de 8 mm aderida à face ventricular da cúspide coronariana direita da valva aórtica, com insuficiência aórtica moderada e ausência de abscesso perivalvar.</p>
<p><strong>Discussão e Conduta Racional:</strong> O paciente preenche critérios definitivos de Duke-ISCVID 2023 para endocardite infecciosa de valva nativa aórtica: possui <strong>2 Critérios Maiores</strong> (hemoculturas positivas em 3 amostras para microrganismo típico — <em>S. gallolyticus</em> — e ecocardiograma demonstrando vegetação valvar), além de <strong>4 Critérios Menores</strong> (condição cardíaca predisponente — estenose aórtica prévia; febre &ge; 38,0 °C; fenômenos imunológicos ricamente documentados por manchas de Roth, nódulos de Osler, fator reumatoide positivo e glomerulonefrite; além de esplenomegalia). Como a cepa é plenamente sensível à penicilina (CIM &le; 0,125 mg/L) e trata-se de paciente idoso de 68 anos com acometimento glomerular, o tratamento antimicrobiano de escolha é <strong>Ceftriaxona 2 g IV 24/24h (ou Penicilina G Cristalina 18 milhões UI/dia IV) em monoterapia por 4 semanas</strong>, evitando-se o esquema curto de 2 semanas com gentamicina devido ao risco de nefrotoxicidade somada à glomerulonefrite e à possível espondilodiscite associada (que deve ser investigada com RM de coluna lombar devido à lombalgia; se confirmada espondilodiscite, estende-se para 6 semanas). Por fim, a conduta propedêutica complementar <strong>obrigatória</strong> ainda durante a internação é a realização de <strong>colonoscopia total</strong>, visto que até 70%–80% das endocardites por <em>Streptococcus gallolyticus</em> subsp. <em>gallolyticus</em> decorrem de translocação através de adenomas avançados ou adenocarcinoma colorretal silencioso.</p>

<h3>Caso Clínico 2 — Abscesso Anular Aórtico e Choque Cardiogênico</h3>
<p><strong>Vinheta Clínica:</strong> Mulher de 54 anos, submetida há 3 meses a substituição valvar aórtica por prótese biológica devido a estenose aórtica bicúspide calcificada, dá entrada na sala de emergência com febre alta (39,4 °C), calafrios trementes há 5 dias e dispneia rapidamente progressiva nas últimas 12 horas, evoluindo para ortopneia franca e escarro róseo espumoso. Ao exame: PA 84 × 40 mmHg, FC 118 bpm, FR 34 irpm, SpO2 86% em ar ambiente, extremidades frias e moteadas, estertores crepitantes difusos até os ápices pulmonares. Na palma da mão direita, notam-se máculas eritemato-hemorrágicas indolores. Ausculta cardíaca revela bulhas hipofonéticas e sopro diastólico curto em foco aórtico. O eletrocardiograma na admissão mostra taquicardia sinusal com <strong>intervalo PR de 280 ms (BAV de 1º grau acentuado) e bloqueio de ramo esquerdo novo</strong> (ECG pós-operatório de 1 mês atrás tinha PR de 160 ms e QRS estreito). O ETT é limitado pela sombra acústica protética, mas o ETE de emergência demonstra deiscência parcial do anel da bioprótese aórtica com refluxo paravalvar grave, fechamento precoce da valva mitral na diástole e uma cavidade ecolúcida espessada de 14 mm na região do septo membranoso compatível com abscesso perivalvar.</p>
<p><strong>Discussão e Conduta Racional:</strong> Trata-se de <strong>endocardite de valva protética (EVP) precoce</strong> (&lt; 12 meses da cirurgia) complicada por dois eventos catastróficos: insuficiência aórtica paravalvar aguda grave com edema agudo de pulmão e choque cardiogênico, e <strong>abscesso perivalvar da raiz aórtica</strong> invadindo o sistema de condução no septo interventricular membranoso (denunciado classicamente pelo surgimento de BAV de 1º grau acentuado e BRE novo). Após coleta imediata de 3 pares de hemoculturas periféricas, inicia-se antibioticoterapia empírica para EVP precoce com <strong>Vancomicina + Gentamicina</strong> (postergando o início da Rifampicina por 3 a 5 dias). O suporte hemodinâmico deve ser feito com intubação orotraqueal, ventilação com pressão positiva, diurético de alça e inotrópico/vasopressor, lembrando que o <strong>balão intra-aórtico (BIA) é absolutamente contraindicado</strong> na insuficiência aórtica grave. A conduta definitiva salvadora de vida é a <strong>cirurgia cardíaca de EMERGÊNCIA (&lt; 24 horas)</strong> para explante da prótese infectada, desbridamento radical do abscesso perivalvar, reconstrução do anel aórtico com retalho de pericárdio bovino, implante de nova prótese e implante de marca-passo epicárdico definitivo caso o bloqueio de condução seja irreversível.</p>

<h3>Caso Clínico 3 — Endocardite de Câmaras Direitas em Usuário de Drogas Injetáveis</h3>
<p><strong>Vinheta Clínica:</strong> Jovem de 26 anos, usuário ativo de cocaína e heroína endovenosas, comparece ao pronto-socorro com febre alta (39,5 °C), dor torácica ventilatório-dependente bilateral, tosse produtiva com laivos hemoptoicos e dispneia há 7 dias. Ao exame físico: estado geral regular, taquipneico (FR 28 irpm), PA 110 × 70 mmHg, FC 112 bpm, múltiplas marcas de venopunção nos antebraços com flebite superficial. Ausculta cardíaca com bulhas rítmicas, normofonéticas, <strong>sem sopros audíveis</strong> mesmo à manobra de Rivero-Carvallo. Tomografia computadorizada de tórax evidencia múltiplos nódulos pulmonares periféricos bilaterais de 1 a 3 cm, vários deles exibindo cavitação central e sinal do halo invertido, além de derrame pleural laminar bilateral. Hemoculturas (3 pares) isolam <em>Staphylococcus aureus</em> sensível à oxacilina (MSSA) em todas as amostras. O ETT revela vegetação móvel de 14 mm no folheto anterior da valva tricúspide com regurgitação tricúspide leve a moderada e função preservada do ventrículo direito.</p>
<p><strong>Discussão e Conduta Racional:</strong> O caso ilustra a tríade clássica da <strong>endocardite infecciosa de valva tricúspide em usuário de drogas injetáveis</strong>: febre, ausência de sopro cardíaco na admissão (presente em até metade dos casos pela baixa pressão nas câmaras direitas) e múltiplos infiltrados pulmonares nodulares periféricos que evoluem rapidamente para cavitação (<strong>embolia pulmonar séptica</strong>). A ausência de sopro na admissão jamais deve afastar a hipótese de EI tricúspide. Como o agente isolado é um MSSA, a vegetação mede 14 mm (&lt; 20 mm), não há insuficiência cardíaca direita refratária e não há empiema pleural, o tratamento inicial é eminentemente <strong>clínico (não cirúrgico)</strong>, com <strong>Oxacilina 2 g IV a cada 4 horas</strong> (sem gentamicina e sem rifampicina). A cirurgia na EI tricúspide só seria indicada se houvesse persistência da bacteremia por &gt; 7 dias apesar de oxacilina adequada, insuficiência cardíaca direita refratária ou vegetação tricúspide persistente &gt; 20 mm com embolias pulmonares sépticas recorrentes.</p>

<h3>Caso Clínico 4 — Endocardite Enterocócica e Nefrotoxicidade</h3>
<p><strong>Vinheta Clínica:</strong> Homem de 76 anos, portador de doença renal crônica estágio 3b (TFGe = 36 mL/min/1,73 m², creatinina basal de 1,8 mg/dL) e hiperplasia prostática benigna submetida a ressecção transuretral da próstata (RTU) há 5 semanas, evolui com febre diária (38,4 °C), adinamia e piora de sopro regurgitante mitral prévio. Três pares de hemoculturas isolam <em>Enterococcus faecalis</em> sensível à ampicilina e à vancomicina, porém com resistência de alto nível à gentamicina (HLAR positivo: CIM de gentamicina &gt; 500 mg/L). O ETE confirma vegetação de 9 mm no folheto posterior da valva mitral nativa, com insuficiência mitral moderada e sem complicações perivalvares.</p>
<p><strong>Discussão e Conduta Racional:</strong> O paciente apresenta endocardite mitral nativa por <em>Enterococcus faecalis</em> secundária a manipulação urológica prévia. Dois fatores proíbem o uso de gentamicina neste caso: primeiramente, a cepa apresenta <strong>resistência de alto nível aos aminoglicosídeos (HLAR)</strong> (geralmente mediada pela enzima bifuncional modificadora de aminoglicosídeos AAC(6')-Ie-APH(2'')-Ia), o que abole por completo o sinergismo bactericida entre beta-lactâmico e gentamicina; em segundo lugar, trata-se de idoso de 76 anos com doença renal crônica prévia (TFGe 36 mL/min), no qual o aminoglicosídeo provocaria nefrotoxicidade e ototoxicidade proibitivas. Como a ampicilina isolada é apenas bacteriostática contra o enterococo, o tratamento de escolha absoluto (1ª linha ESC 2023) é o <strong>duplo beta-lactâmico sinérgico: Ampicilina 2 g IV 4/4h (ajustada para a função renal) + Ceftriaxona 2 g IV 12/12h durante 6 semanas</strong>. A saturação complementar das PBPs 2, 3, 4 e 5 garante atividade bactericida plena sem nefrotoxicidade aminoglicosídica.</p>

<h3>Caso Clínico 5 — Endocardite com Hemoculturas Negativas e Glomerulonefrite ANCA-Positiva</h3>
<p><strong>Vinheta Clínica:</strong> Homem de 49 anos, etilista pesado e em situação de rua, é trazido ao hospital por fraqueza extrema, dispneia aos médios esforços, perda ponderal de 8 kg em 2 meses e febre intermitente. Ao exame físico, apresenta má higiene corporal com escoriações por pediculose do corpo (<em>Pediculus humanus corporis</em>), palidez cutâneo-mucosa, edema de membros inferiores (++/4+) e sopro diastólico aspirativo (3+/6+) no 3º espaço intercostal esquerdo. Exames mostram Hb 7,8 g/dL, creatinina 2,9 mg/dL, ureia 110 mg/dL, complemento C3 consumido (48 mg/dL), EAS com hematúria dismórfica acentuada e cilindros hemáticos, e pesquisa de anticorpos anticitoplasma de neutrófilos positiva com padrão citoplasmático (<strong>c-ANCA / anti-PR3 positivo</strong>). Três pares de hemoculturas permanecem negativos após 5 dias de incubação, sem uso prévio de antibióticos. O ETE revela vegetação de 11 mm na valva aórtica com perfuração de cúspide e insuficiência aórtica importante.</p>
<p><strong>Discussão e Conduta Racional:</strong> Este é um caso clássico de alta complexidade diagnóstica: paciente vulnerável em situação de rua com infestação por piolhos corporais, endocardite aórtica destrutiva com <strong>hemoculturas negativas</strong> (sem antibiótico prévio) e glomerulonefrite rapidamente progressiva associada a positividade para <strong>c-ANCA (PR3-ANCA)</strong>. O agente etiológico é a <strong><em>Bartonella quintana</em></strong>. A endocardite subaguda — muito particularmente a causada por <em>Bartonella</em> spp. — é a principal imitadora infecciosa das vasculites ANCA-associadas (granulomatose com poliangiíte), induzindo anticorpos anti-PR3 em até 60% dos casos! Se o médico iniciar pulsoterapia imunossupressora com metilprednisolona e ciclofosfamida achando tratar-se de vasculite primária sem tratar a endocardite, o paciente evoluirá a óbito por sepse. A confirmação diagnóstica faz-se por sorologia demonstrando <strong>IgG anti-<em>Bartonella quintana</em> &ge; 1:800</strong> (Critério Maior no Duke-ISCVID 2023) ou PCR específica no sangue/valva, e o tratamento baseia-se em <strong>Doxiciclina 100 mg VO/IV 12/12h por 4 a 6 semanas associada a Gentamicina 3 mg/kg/dia IV por 2 semanas</strong> (ou Rifampicina se disfunção renal grave impedir o uso de gentamicina) aliado à troca valvar aórtica cirúrgica.</p>

<h3>Caso Clínico 6 — Complicação Neurológica e Indicação Cirúrgica por Risco Embólico</h3>
<p><strong>Vinheta Clínica:</strong> Mulher de 42 anos, portadora de prolapso da valva mitral com degeneração mixomatosa, está no 6º dia de internação sob tratamento com Oxacilina 2 g IV 4/4h para endocardite infecciosa mitral nativa por <em>Staphylococcus aureus</em> (MSSA). Na manhã do 6º dia, apresenta início súbito de hemiparesia direita proporcionada e afasia motora (NIHSS = 10) há 90 minutos. Tomografia de crânio sem contraste exclui sangramento agudo, e angiotomografia cerebral evidencia oclusão proximal do segmento M1 da artéria cerebral média esquerda. Após reperfusão bem-sucedida, a paciente recupera o nível de consciência (Glasgow 15, mantendo apenas leve disfasia), e TC de crânio de controle em 24 horas mostra área isquêmica restrita ao núcleo lentiforme esquerdo, sem transformação hemorrágica. Novo ETE realizado no mesmo dia revela persistência de vegetação móvel de <strong>16 mm</strong> no folheto anterior da valva mitral com insuficiência mitral grave.</p>
<p><strong>Discussão e Conduta Racional:</strong> Este caso aborda duas decisões críticas de prova: (1) Qual a conduta de reperfusão na fase hiperaguda (90 minutos) do AVC isquêmico na endocardite infecciosa? A <strong>trombólise intravenosa com Alteplase (rt-PA) é contraindicada</strong> pelo risco altíssimo de hemorragia intracraniana secundária à arterite séptica e aneurismas micóticos ocultos; portanto, a conduta correta foi a <strong>trombectomia mecânica endovascular</strong> para a oclusão de M1. (2) Qual a conduta cirúrgica cardíaca e seu <em>timing</em> agora que a paciente teve um evento embólico na vigência de antibioticoterapia e permanece com vegetação de 16 mm (&ge; 10 mm) e insuficiência mitral grave? Há indicação formal Classe I de <strong>cirurgia cardíaca de URGÊNCIA (em 3 a 5 dias)</strong> pelo Pilar 3 (prevenção de nova embolia: vegetação &ge; 10 mm após evento embólico). Como a paciente teve um AVC isquêmico <strong>não hemorrágico</strong> e não está em coma nem apresenta infarto hemisférico maligno, a cirurgia cardíaca <strong>não deve ser adiada por 4 semanas</strong> (o adiamento de &ge; 4 semanas aplica-se apenas quando há <strong>hemorragia intracraniana</strong>). A cirurgia precoce previne um segundo evento embólico potencialmente fatal.</p>
`
    },
    {
      id: 'questoes-comentadas-residencia',
      title: '13. Questões Comentadas de Residência Médica e ENAMED',
      body_html: `
<h3>Questão Comentada 1 — Microbiologia e Investigação Complementar Obrigatória</h3>
<p><strong>Enunciado:</strong> Homem de 65 anos é internado para investigação de febre vespertina há 4 semanas, perda ponderal de 4 kg e surgimento de sopro holossistólico regurgitante em foco mitral (3+/6+). O ecocardiograma transtorácico revela vegetação de 9 mm aderida à face atrial do folheto anterior da valva mitral. Duas hemoculturas colhidas em sítios periféricos distintos isolam <em>Streptococcus gallolyticus</em> subespécie <em>gallolyticus</em> (CIM para penicilina = 0,03 mg/L). O paciente nega queixas gastrointestinais ou hematoquezia e apresenta função renal normal. Além de iniciar antibioticoterapia adequada com ceftriaxona ou penicilina cristalina, qual é a conduta propedêutica obrigatória durante o acompanhamento deste paciente?</p>
<ul>
  <li>A) Solicitar cistoscopia e ultrassonografia prostática transretal para pesquisa de adenocarcinoma de próstata.</li>
  <li>B) Solicitar colonoscopia completa para investigação de neoplasia ou pólipos adenomatosos colorretais.</li>
  <li>C) Solicitar tomografia computadorizada de seios da face e avaliação odontológica, visto tratar-se de estreptococo exclusivo da microbiota gengival.</li>
  <li>D) Solicitar sorologia para febre Q (<em>Coxiella burnetii</em>) e biópsia de medula óssea antes de definir a duração do antibiótico.</li>
  <li>E) Realizar cineangiocoronariografia invasiva de emergência e indicar troca valvar mitral nas primeiras 24 horas.</li>
</ul>
<p><strong>Gabarito: Alternativa B.</strong></p>
<p><strong>Comentário Detalhado:</strong></p>
<ul>
  <li><strong>Alternativa A (Incorreta):</strong> A manipulação e as patologias do trato geniturinário/prostático em homens idosos associam-se classicamente à endocardite por <em>Enterococcus faecalis</em>, e não pelo <em>Streptococcus gallolyticus</em>.</li>
  <li><strong>Alternativa B (Correta):</strong> O <em>Streptococcus gallolyticus</em> subsp. <em>gallolyticus</em> (antigo <em>Streptococcus bovis</em> biótipo I) apresenta associação em 50% a 80% dos casos com lesões pré-malignas (adenomas vilosos/tubulovilosos) ou adenocarcinoma colorretal invasivo, além de diverticulose. Mesmo na completa ausência de sintomas intestinais ou sangramento oculto, a realização de colonoscopia total é obrigatória durante a internação (após estabilização clínica inicial).</li>
  <li><strong>Alternativa C (Incorreta):</strong> Embora a avaliação odontológica faça parte do cuidado geral de pacientes com EI, o <em>S. gallolyticus</em> é um estreptococo do grupo D habitante do trato gastrointestinal, distinto dos estreptococos orais do grupo <em>viridans</em> (<em>S. mitis, S. mutans, S. sanguinis</em>).</li>
  <li><strong>Alternativa D (Incorreta):</strong> O agente etiológico já foi isolado em duas hemoculturas com critério maior preenchido; <em>Coxiella burnetii</em> é pesquisada na endocardite com hemoculturas negativas.</li>
  <li><strong>Alternativa E (Incorreta):</strong> O paciente está hemodinamicamente estável, sem insuficiência cardíaca descompensada, sem abscesso e com vegetação &lt; 10 mm sem eventos embólicos; portanto, não possui indicação cirúrgica de emergência.</li>
</ul>

<h3>Questão Comentada 2 — Fenômenos Vasculares vs. Imunológicos nos Critérios de Duke</h3>
<p><strong>Enunciado:</strong> Durante a visita médica a uma paciente de 31 anos internada com suspeita de endocardite infecciosa subaguda em valva mitral reumática, o preceptor solicita que o residente classifique corretamente os achados do exame físico e laboratorial segundo a fisiopatologia e os Critérios de Duke-ISCVID 2023. Assinale a alternativa que apresenta <strong>exclusivamente fenômenos imunológicos</strong> da endocardite infecciosa:</p>
<ul>
  <li>A) Nódulos de Osler nas polpas digitais, manchas de Roth à fundoscopia, glomerulonefrite com consumo de complemento e fator reumatoide positivo.</li>
  <li>B) Lesões de Janeway nas regiões palmares e plantares, nódulos de Osler, hemorragias em estilhaço subungueais e fator reumatoide positivo.</li>
  <li>C) Manchas de Roth, aneurisma micótico da artéria cerebral média, hemorragias conjuntivais e glomerulonefrite proliferativa.</li>
  <li>D) Lesões de Janeway, infarto esplênico, embolia séptica pulmonar e hemorragia intracraniana.</li>
  <li>E) Nódulos de Osler, petéquias palatinas, lesões de Janeway e abscesso perivalvar aórtico.</li>
</ul>
<p><strong>Gabarito: Alternativa A.</strong></p>
<p><strong>Comentário Detalhado:</strong></p>
<ul>
  <li><strong>Alternativa A (Correta):</strong> Nos critérios de Duke, os quatro <strong>fenômenos imunológicos</strong> (decorrentes da deposição de imunocomplexos circulantes e vasculite/ativação do complemento) são exatamente: (1) <strong>Nódulos de Osler</strong> (nódulos subcutâneos dolorosos nas polpas digitais); (2) <strong>Manchas de Roth</strong> (hemorragias retinianas ovais com centro pálido); (3) <strong>Glomerulonefrite mediada por imunocomplexos</strong>; e (4) <strong>Fator Reumatoide positivo</strong>.</li>
  <li><strong>Alternativa B (Incorreta):</strong> As lesões de Janeway (máculas indolores palmo-plantares por microembolia séptica) e as hemorragias em estilhaço pertencem ao grupo dos fenômenos vasculares.</li>
  <li><strong>Alternativa C (Incorreta):</strong> O aneurisma infeccioso (micótico) e as hemorragias conjuntivais são fenômenos vasculares.</li>
  <li><strong>Alternativa D (Incorreta):</strong> Todos os itens listados nesta alternativa são fenômenos puramente vasculares.</li>
  <li><strong>Alternativa E (Incorreta):</strong> Lesões de Janeway são fenômenos vasculares e o abscesso perivalvar é um Critério Maior de imagem (complicação estrutural local).</li>
</ul>

<h3>Questão Comentada 3 — Antibioticoterapia Direcionada para <em>Staphylococcus aureus</em></h3>
<p><strong>Enunciado:</strong> Homem de 38 anos, sem comorbidades prévias e sem próteses cardíacas, é admitido com febre alta (39,2 °C) há 6 dias e sopro holossistólico mitral novo. Três pares de hemoculturas isolam <em>Staphylococcus aureus</em> sensível à oxacilina/meticilina (CIM de oxacilina &le; 0,5 mg/L — MSSA). O ecocardiograma transesofágico confirma vegetação de 7 mm na valva mitral nativa, com regurgitação moderada, função ventricular esquerda normal e ausência de abscesso perivalvar. O paciente não tem história de alergia medicamentosa e apresenta creatinina de 0,9 mg/dL. De acordo com as diretrizes atuais (ESC 2023 / AHA / SBC), qual é o esquema antimicrobiano de primeira escolha?</p>
<ul>
  <li>A) Vancomicina 15–20 mg/kg IV de 12/12h associada a Gentamicina 3 mg/kg/dia IV por 6 semanas.</li>
  <li>B) Oxacilina 2 g IV de 4/4h associada a Rifampicina 600 mg VO de 12/12h e Gentamicina 3 mg/kg/dia IV por 6 semanas.</li>
  <li>C) Oxacilina 2 g IV de 4/4h em monoterapia por 4 a 6 semanas.</li>
  <li>D) Ceftriaxona 2 g IV de 24/24h associada a Gentamicina 3 mg/kg/dia IV por 2 semanas.</li>
  <li>E) Daptomicina 6 mg/kg/dia IV associada a Linezolida 600 mg VO de 12/12h por 4 semanas.</li>
</ul>
<p><strong>Gabarito: Alternativa C.</strong></p>
<p><strong>Comentário Detalhado:</strong></p>
<ul>
  <li><strong>Alternativa A (Incorreta):</strong> A vancomicina possui atividade bactericida mais lenta e maiores taxas de falha terapêutica e mortalidade que os beta-lactâmicos antiestafilocócicos (oxacilina ou cefazolina) no tratamento do MSSA, sendo reservada para MRSA ou alergia anafilática a beta-lactâmicos.</li>
  <li><strong>Alternativa B (Incorreta):</strong> A terapia tripla (oxacilina + rifampicina + gentamicina) é indicada exclusivamente para endocardite de <strong>valva protética (EVP)</strong> por MSSA. Na <strong>valva nativa (EVN)</strong>, tanto a gentamicina quanto a rifampicina são contraindicadas (Classe III), pois não aumentam a taxa de cura e elevam significativamente a nefrotoxicidade e a hepatotoxicidade.</li>
  <li><strong>Alternativa C (Correta):</strong> Na endocardite de valva nativa (EVN) causada por <em>S. aureus</em> sensível à meticilina (MSSA), o tratamento padrão-ouro é a monoterapia com <strong>Oxacilina 12 g/dia IV (2 g a cada 4 horas) durante 4 a 6 semanas</strong> (ou Cefazolina 2 g IV 8/8h em casos de alergia não anafilática à penicilina).</li>
  <li><strong>Alternativa D (Incorreta):</strong> O esquema de 2 semanas com ceftriaxona + gentamicina aplica-se apenas à EVN não complicada por estreptococos orais/<em>S. gallolyticus</em> plenamente sensíveis à penicilina.</li>
  <li><strong>Alternativa E (Incorreta):</strong> Daptomicina (na dose de 10 mg/kg/dia, e não 6 mg/kg/dia) é opção para MRSA, e a linezolida é bacteriostática.</li>
</ul>

<h3>Questão Comentada 4 — Tratamento Sinérgico da Endocardite por <em>Enterococcus faecalis</em></h3>
<p><strong>Enunciado:</strong> Paciente masculino de 78 anos, portador de doença renal crônica não dialítica (clearance de creatinina estimado = 38 mL/min) e hipoacusia neurossensorial bilateral prévia, recebe diagnóstico definitivo de endocardite infecciosa em valva aórtica nativa causada por <em>Enterococcus faecalis</em> sensível à ampicilina e à vancomicina. Considerando a necessidade de efeito bactericida sinérgico e o perfil de segurança do paciente, qual é o regime antimicrobiano de primeira escolha segundo a Diretriz ESC 2023?</p>
<ul>
  <li>A) Ampicilina 2 g IV de 4/4h em monoterapia por 4 semanas.</li>
  <li>B) Ceftriaxona 2 g IV de 12/12h em monoterapia por 6 semanas.</li>
  <li>C) Ampicilina 2 g IV de 4/4h (ajustada à função renal) associada a Ceftriaxona 2 g IV de 12/12h por 6 semanas.</li>
  <li>D) Vancomicina IV associada a Amicacina 15 mg/kg/dia IV por 6 semanas.</li>
  <li>E) Oxacilina 2 g IV de 4/4h associada a Rifampicina 300 mg VO de 8/8h por 6 semanas.</li>
</ul>
<p><strong>Gabarito: Alternativa C.</strong></p>
<p><strong>Comentário Detalhado:</strong></p>
<ul>
  <li><strong>Alternativa A (Incorreta):</strong> Os enterococos são intrinsecamente tolerantes às penicilinas; a ampicilina isolada exerce ação meramente bacteriostática, resultando em altas taxas de recidiva na endocardite.</li>
  <li><strong>Alternativa B (Incorreta):</strong> Os enterococos possuem resistência intrínseca às cefalosporinas em monoterapia, pois a ceftriaxona isolada não se liga às PBPs 4 e 5 enterocócicas.</li>
  <li><strong>Alternativa C (Correta):</strong> A associação de <strong>Ampicilina + Ceftriaxona (duplo beta-lactâmico)</strong> promove saturação complementar e total das proteínas ligadoras de penicilina (PBPs 2, 3, 4 e 5) do <em>Enterococcus faecalis</em>, gerando potente sinergismo bactericida sem a nefrotoxicidade e a ototoxicidade da gentamicina, além de ser eficaz mesmo em cepas HLAR. É o esquema de escolha em idosos, nefropatas e portadores de déficit auditivo prévio.</li>
  <li><strong>Alternativa D (Incorreta):</strong> A combinação de vancomicina + aminoglicosídeo é intensamente nefrotóxica e ototóxica, sendo proibitiva neste paciente quando há opção segura de duplo beta-lactâmico.</li>
  <li><strong>Alternativa E (Incorreta):</strong> O <em>Enterococcus faecalis</em> é resistente à oxacilina.</li>
</ul>

<h3>Questão Comentada 5 — Complicação Eletrocardiográfica e Conduta Cirúrgica</h3>
<p><strong>Enunciado:</strong> Homem de 58 anos encontra-se no 8º dia de antibioticoterapia intravenosa apropriada para endocardite infecciosa em valva aórtica nativa causada por <em>Streptococcus anginosus</em>. Apesar do tratamento, o paciente mantém febre diária de 38,6 °C. Na avaliação matinal, observa-se queda da frequência cardíaca para 48 bpm, e o eletrocardiograma revela surgimento de bloqueio atrioventricular de 2º grau Mobitz II intermitente com bloqueio atrioventricular total (o ECG da admissão mostrava ritmo sinusal normal com PR de 160 ms). Qual é a complicação anatômica mais provável e a conduta imediata indicada?</p>
<ul>
  <li>A) Embolização coronariana séptica para a artéria circunflexa; indicar trombólise sistêmica com alteplase.</li>
  <li>B) Intoxicação digitálica ou efeito adverso da ceftriaxona sobre o nó sinusal; manter conduta expectante e suspender o antibiótico por 48 horas.</li>
  <li>C) Abscesso perivalvar do anel aórtico invadindo o septo interventricular membranoso; realizar ETE/TC cardíaca imediata, marca-passo provisório e cirurgia cardíaca de urgência.</li>
  <li>D) Miocardite imunomediada reacional (fenômeno de Osler-Libman); iniciar pulsoterapia com metilprednisolona 1 g/dia por 3 dias.</li>
  <li>E) Pericardite constritiva aguda; realizar pericardiocentese de alívio subxifóidea.</li>
</ul>
<p><strong>Gabarito: Alternativa C.</strong></p>
<p><strong>Comentário Detalhado:</strong></p>
<ul>
  <li><strong>Alternativa A (Incorreta):</strong> Embora êmbolos coronarianos possam ocorrer na EI aórtica, o distúrbio de condução atrioventricular associado a febre persistente é a assinatura clássica da extensão perianular ao septo membranoso; além disso, trombólise é contraindicada na EI.</li>
  <li><strong>Alternativa B (Incorreta):</strong> Ceftriaxona não causa bloqueio atrioventricular avançado, e suspender o antibiótico sem abordar a complicação mecânica seria fatal.</li>
  <li><strong>Alternativa C (Correta):</strong> O nó atrioventricular e o feixe de His localizam-se no septo interventricular membranoso, imediatamente adjacentes ao anel aórtico (entre a cúspide não coronariana e a coronariana direita). O surgimento de qualquer bloqueio atrioventricular novo (1º, 2º ou 3º grau) ou bloqueio de ramo novo na vigência de endocardite aórtica tem especificidade superior a 95% para <strong>abscesso perivalvar</strong>, que constitui indicação formal (Classe I, Pilar 2 — infecção não controlada localmente) de <strong>cirurgia cardíaca de urgência</strong>.</li>
  <li><strong>Alternativa D (Incorreta):</strong> Trata-se de destruição supurativa direta do anel valvar (muito típica do grupo <em>Streptococcus anginosus</em> e do <em>S. aureus</em>), na qual corticoterapia isolada agravaria a sepse.</li>
  <li><strong>Alternativa E (Incorreta):</strong> Pericardite constritiva é uma condição crônica fibrótica e não cursa com BAV agudo por abscesso septal.</li>
</ul>

<h3>Questão Comentada 6 — Profilaxia Antibiótica em Procedimentos Odontológicos</h3>
<p><strong>Enunciado:</strong> Cinco pacientes comparecem ao ambulatório de cardiologia solicitando prescrição de antibiótico profilático porque serão submetidos, na semana seguinte, a extração dentária de molar incluso com manipulação gengival e periapical. À luz das diretrizes internacionais (AHA / ESC 2023), para qual dos pacientes abaixo a <strong>profilaxia antibiótica para endocardite infecciosa está formalmente INDICADA</strong>?</p>
<ul>
  <li>A) Mulher de 28 anos portadora de prolapso da valva mitral com espessamento mixomatoso dos folhetos e insuficiência mitral moderada.</li>
  <li>B) Homem de 62 anos submetido há 2 anos a implante de marca-passo definitivo bicameral por doença do nó sinusal e portador de estenose aórtica calcificada moderada.</li>
  <li>C) Criança de 9 anos submetida há 3 anos a fechamento cirúrgico completo de comunicação interventricular (CIV) com <em>patch</em> de pericárdio bovino, sem <em>shunt</em> residual ao ecocardiograma atual.</li>
  <li>D) Homem de 74 anos submetido há 8 meses a implante transcateter de valva aórtica (TAVI), sem história de alergia medicamentosa.</li>
  <li>E) Mulher de 45 anos portadora de comunicação interatrial (CIA) tipo <em>ostium secundum</em> não corrigida e miocardiopatia hipertrófica septal assimétrica.</li>
</ul>
<p><strong>Gabarito: Alternativa D.</strong></p>
<p><strong>Comentário Detalhado:</strong></p>
<ul>
  <li><strong>Alternativa A (Incorreta):</strong> O prolapso da valva mitral (mesmo com regurgitação) é uma valvopatia nativa adquirida e foi retirado das indicações formais de profilaxia pelas diretrizes AHA/ESC desde 2007/2009.</li>
  <li><strong>Alternativa B (Incorreta):</strong> Portadores de marca-passo definitivo ou cardiodesfibrilador implantável (DCEI) e portadores de estenose aórtica degenerativa nativa não têm indicação de profilaxia odontológica.</li>
  <li><strong>Alternativa C (Incorreta):</strong> Nas cardiopatias congênitas corrigidas com material protético sem defeito residual, a profilaxia é indicada <strong>apenas nos primeiros 6 meses após o procedimento</strong> (até a endotelização completa do material). Como a cirurgia ocorreu há 3 anos e não há defeito residual, não há indicação.</li>
  <li><strong>Alternativa D (Correta):</strong> Portadores de <strong>qualquer prótese valvar cardíaca</strong> — seja mecânica, biológica cirúrgica ou transcateter (<strong>TAVI</strong>) — integram o grupo de altíssimo risco e têm indicação formal (Classe I) de profilaxia com <strong>Amoxicilina 2 g VO 30 a 60 minutos antes</strong> de procedimentos odontológicos que manipulem a gengiva ou a região periapical.</li>
  <li><strong>Alternativa E (Incorreta):</strong> A CIA é uma cardiopatia congênita acianótica (não cianótica) e a miocardiopatia hipertrófica não faz parte das indicações de profilaxia.</li>
</ul>

<h3>Questão Comentada 7 — Critérios de Duke-ISCVID 2023 e Papel do 18F-FDG PET/CT</h3>
<p><strong>Enunciado:</strong> Paciente masculino de 71 anos, submetido há 18 meses a troca valvar aórtica por prótese mecânica, apresenta febre (38,4 °C) há 10 dias sem foco infeccioso aparente. Foram colhidos 3 pares de hemoculturas que cresceram <em>Staphylococcus epidermidis</em> nos 3 pares. O ecocardiograma transtorácico (ETT) e o ecocardiograma transesofágico (ETE) mostraram prótese normofuncionante, sem vegetações visíveis, mas com artefato de reverberação acústica metálica importante no anel posterior. Qual é o próximo exame de imagem mais indicado para confirmar o diagnóstico de endocardite protética e como esse exame impacta a classificação de Duke?</p>
<ul>
  <li>A) Ressonância magnética cardíaca com gadolínio, pois constitui o único Critério Maior de imagem para próteses mecânicas.</li>
  <li>B) 18F-FDG PET/CT (e/ou Angio-TC cardíaca sincronizada), cuja hipercaptação focal periprotética constitui Critério Maior de imagem, reclassificando o caso como Endocardite Definitiva.</li>
  <li>C) Cintilografia miocárdica com tálio-201 sob estresse farmacológico com dipiridamol.</li>
  <li>D) Repetir apenas o ecocardiograma transtorácico em 30 dias após suspender todos os antibióticos.</li>
  <li>E) Cateterismo cardíaco esquerdo com ventriculografia e passagem retrógrada pela prótese mecânica.</li>
</ul>
<p><strong>Gabarito: Alternativa B.</strong></p>
<p><strong>Comentário Detalhado:</strong></p>
<ul>
  <li><strong>Alternativa A (Incorreta):</strong> Na presença de prótese valvar metálica, a ressonância magnética cardíaca sofre artefatos de suscetibilidade magnética e não é o exame de escolha para vegetações ou hipermetabolismo perivalvar.</li>
  <li><strong>Alternativa B (Correta):</strong> Na endocardite de valva protética (especialmente com mais de 3 meses de implante), quando o ETE é negativo ou inconclusivo devido à sombra acústica metálica, o <strong>18F-FDG PET/CT</strong> e a <strong>TC cardíaca sincronizada</strong> são recomendados como Classe I pela Diretriz ESC 2023. A presença de hipercaptação metabólica anormal periprotética no 18F-FDG PET/CT constitui um <strong>Critério Maior de Imagem</strong>, que somado ao Critério Maior Microbiológico (no Duke-ISCVID 2023, <em>S. epidermidis</em> em &ge; 2 hemoculturas é considerado patógeno típico na presença de prótese intracardíaca!) confirma o diagnóstico de Endocardite Infecciosa Definitiva.</li>
  <li><strong>Alternativa C (Incorreta):</strong> Cintilografia de perfusão miocárdica avalia isquemia coronariana, e não infecção endocárdica.</li>
  <li><strong>Alternativa D (Incorreta):</strong> Aguardar 30 dias em uma EVP estafilocócica expõe o paciente a deiscência protética e óbito; se a repetição do ETE for necessária, faz-se em 5 a 7 dias, associada à imagem multimodal imediata.</li>
  <li><strong>Alternativa E (Incorreta):</strong> A passagem retrógrada de cateter através de prótese mecânica aórtica com suspeita de endocardite é contraindicada pelo risco de travamento de disco e embolização séptica.</li>
</ul>

<h3>Questão Comentada 8 — Endocardite com Hemoculturas Negativas (Etiologia Zoonótica)</h3>
<p><strong>Enunciado:</strong> Fazendeiro de 56 anos, criador de ovinos e caprinos no interior de Minas Gerais, portador de valvopatia mitral reumática, é investigado por quadro de 3 meses de febre baixa, hepatomegalia discreta, plaquetopenia leve, fadiga e piora da classe funcional. Três pares de hemoculturas convencionais resultaram negativos após 14 dias de incubação (sem uso prévio de antimicrobianos). O ETE evidencia pequenas vegetações nodulares nos folhetos mitrais com insuficiência mitral moderada a grave. A pesquisa sorológica por imunofluorescência indireta revela títulos de anticorpos <strong>IgG antifase I = 1:3.200</strong>. Qual é o agente etiológico, como esse título sorológico é classificado nos Critérios de Duke e qual é o tratamento antimicrobiano de primeira escolha?</p>
<ul>
  <li>A) <em>Brucella melitensis</em>; Critério Menor de Duke; Ceftriaxona + Gentamicina por 4 semanas.</li>
  <li>B) <em>Coxiella burnetii</em>; Critério Maior de Duke; Doxiciclina associada a Hidroxicloroquina por 18 a 24 meses.</li>
  <li>C) <em>Tropheryma whipplei</em>; Critério Maior de Duke; Penicilina G Cristalina por 2 semanas.</li>
  <li>D) <em>Bartonella henselae</em>; Critério Menor de Duke; Azitromicina em monoterapia por 5 dias.</li>
  <li>E) <em>Aspergillus fumigatus</em>; Critério Maior de Duke; Anfotericina B desoxicolato por 14 dias.</li>
</ul>
<p><strong>Gabarito: Alternativa B.</strong></p>
<p><strong>Comentário Detalhado:</strong></p>
<ul>
  <li><strong>Alternativa A (Incorreta):</strong> A sorologia com anticorpos IgG antifase I é específica da febre Q crônica (<em>Coxiella burnetii</em>), e não da brucelose (diagnosticada por soroaglutinação de Wright/Rosa Bengala ou hemocultura prolongada).</li>
  <li><strong>Alternativa B (Correta):</strong> A <strong><em>Coxiella burnetii</em></strong> (agente da Febre Q, adquirida pelo contato ocupacional com aerossóis de parto/placenta/leite de ovinos, caprinos e bovinos) é a causa zoonótica mais comum de endocardite com hemoculturas negativas no mundo. Um título de <strong>IgG antifase I &gt; 1:800</strong> constitui um <strong>Critério Maior Microbiológico</strong> nos Critérios de Duke. Como a bactéria sobrevive no interior do fagolisossoma ácido dos macrófagos, o tratamento exige a associação de <strong>Doxiciclina (100 mg 12/12h) + Hidroxicloroquina (200 mg 8/8h, para alcalinizar o vacúolo intracelular)</strong> por período prolongado de <strong>18 meses em valva nativa e 24 meses em valva protética</strong>.</li>
  <li><strong>Alternativa C (Incorreta):</strong> <em>Tropheryma whipplei</em> não é diagnosticada por IgG antifase I, mas sim por PCR ou histologia PAS-positiva na valva, e exige tratamento prolongado (ceftriaxona seguida de sulfametoxazol-trimetoprim ou doxiciclina + hidroxicloroquina por &ge; 12 meses).</li>
  <li><strong>Alternativa D (Incorreta):</strong> <em>Bartonella henselae</em> associa-se a gatos e no Duke-ISCVID 2023 seu título &ge; 1:800 também passou a ser Critério Maior, mas o enunciado descreve exposição a ovinos/caprinos e sorologia antifase I clássica de <em>Coxiella burnetii</em>.</li>
  <li><strong>Alternativa E (Incorreta):</strong> Endocardite por <em>Aspergillus</em> ocorre geralmente no pós-operatório cardíaco ou em imunossuprimidos graves, pesquisa-se galactomanana e trata-se com voriconazol + cirurgia.</li>
</ul>

<h3>Questão Comentada 9 — Manejo das Complicações Neurológicas e Timing Cirúrgico</h3>
<p><strong>Enunciado:</strong> Mulher de 48 anos com endocardite infecciosa em valva mitral nativa por <em>Staphylococcus aureus</em> evolui, no 5º dia de antibioticoterapia, com cefaleia súbita explosiva e rebaixamento do nível de consciência, seguido de melhora parcial nas horas seguintes. A tomografia computadorizada de crânio demonstra hemorragia subaracnóidea na fissura sylviana direita com pequeno hematoma parenquimatoso adjacente de 2,5 cm. A arteriografia cerebral identifica um aneurisma sacular distal de 5 mm no ramo M3 da artéria cerebral média direita, que é submetido com sucesso a embolização endovascular com micro-molas. O ecocardiograma mostra insuficiência mitral grave, porém a paciente encontra-se hemodinamicamente compensada com vasodilatador e diurético em doses baixas. Quanto à realização da cirurgia cardíaca de troca/plastia valvar mitral (que exige circulação extracorpórea e heparinização plena), qual é a recomendação das diretrizes atuais (ESC 2023 / AHA)?</p>
<ul>
  <li>A) Realizar a cirurgia cardíaca de emergência nas primeiras 12 horas após a hemorragia intracraniana, independentemente do estado neurológico.</li>
  <li>B) Adiar a cirurgia cardíaca eletiva/urgente por pelo menos 4 semanas (1 mês) após a hemorragia intracraniana, mantendo rigoroso controle hemodinâmico e antibioticoterapia.</li>
  <li>C) Iniciar anticoagulação plena com varfarina imediatamente (INR alvo 3,0–4,0) para dissolver a vegetação mitral residual e evitar a cirurgia.</li>
  <li>D) Contraindicar definitivamente qualquer cirurgia cardíaca pelo resto da vida da paciente.</li>
  <li>E) Administrar alteplase intravenosa antes de encaminhar ao centro cirúrgico.</li>
</ul>
<p><strong>Gabarito: Alternativa B.</strong></p>
<p><strong>Comentário Detalhado:</strong></p>
<ul>
  <li><strong>Alternativa A (Incorreta):</strong> Realizar circulação extracorpórea (que exige heparinização sistêmica maciça) nos primeiros dias após uma hemorragia intracraniana acarreta risco altíssimo de ressangramento cerebral catastrófico e morte encefálica.</li>
  <li><strong>Alternativa B (Correta):</strong> Diferentemente do AVC isquêmico não hemorrágico (no qual a cirurgia cardíaca não precisa ser adiada se o paciente não estiver em coma), na presença de <strong>hemorragia intracraniana</strong> (parenquimatosa ou subaracnóidea por ruptura de aneurisma micótico), as diretrizes determinam o <strong>adiamento da cirurgia cardíaca por pelo menos 4 semanas (30 dias)</strong> sempre que a condição hemodinâmica permitir, e a oclusão endovascular/neurocirúrgica prévia do aneurisma micótico roto.</li>
  <li><strong>Alternativa C (Incorreta):</strong> Anticoagulação é formalmente contraindicada na hemorragia intracraniana e não dissolve vegetações infecciosas.</li>
  <li><strong>Alternativa D (Incorreta):</strong> A cirurgia não é contraindicada para sempre; após 4 semanas de estabilização do sangramento cerebral, a troca/reparo valvar pode ser realizada com segurança.</li>
  <li><strong>Alternativa E (Incorreta):</strong> Trombolítico em paciente com hemorragia intracraniana e endocardite é contraindicação absoluta.</li>
</ul>

<h3>Questão Comentada 10 — Endocardite de Prótese Precoce e Farmacodinâmica da Rifampicina</h3>
<p><strong>Enunciado:</strong> Paciente de 63 anos foi submetido a troca valvar mitral por prótese mecânica há 45 dias. Retorna ao hospital com febre alta, calafrios e queda do estado geral. Após a coleta de 3 pares de hemoculturas periféricas, o médico assistente decide iniciar esquema antimicrobiano empírico para endocardite de valva protética (EVP) precoce. Assinale a alternativa que apresenta os fármacos corretos e a orientação farmacodinâmica adequada quanto ao momento de introdução de cada droga:</p>
<ul>
  <li>A) Iniciar apenas Rifampicina em monoterapia nos primeiros 5 dias para esterilizar o biofilme mecânico e, no 6º dia, associar Oxacilina.</li>
  <li>B) Iniciar Penicilina G Benzatina intramuscular a cada 21 dias associada a Ciprofloxacino oral.</li>
  <li>C) Iniciar Vancomicina + Gentamicina imediatamente após a coleta das hemoculturas e adicionar a Rifampicina somente 3 a 5 dias depois, quando a bacteremia já estiver controlada, para prevenir a emergência de resistência por mutação no gene <em>rpoB</em>.</li>
  <li>D) Iniciar Ceftriaxona em monoterapia, visto que o principal agente da EVP precoce aos 45 dias é o <em>Streptococcus mitis</em>.</li>
  <li>E) Iniciar Anfotericina B desoxicolato + Fluconazol empiricamente para todos os pacientes e aguardar 21 dias pelas hemoculturas sem cobertura bacteriana.</li>
</ul>
<p><strong>Gabarito: Alternativa C.</strong></p>
<p><strong>Comentário Detalhado:</strong></p>
<ul>
  <li><strong>Alternativa A (Incorreta):</strong> Usar rifampicina em monoterapia ou na presença de alta carga bacteriana circulante seleciona rapidamente mutantes resistentes em questão de 24 a 48 horas.</li>
  <li><strong>Alternativa B (Incorreta):</strong> Penicilina benzatina é usada na profilaxia secundária de febre reumática e não atinge níveis séricos bactericidas para tratar endocardite infecciosa.</li>
  <li><strong>Alternativa C (Correta):</strong> Na EVP precoce (&lt; 12 meses da cirurgia, especialmente nos primeiros 60 dias), os agentes predominantes são os estafilococos coagulase-negativos resistentes à meticilina (<em>S. epidermidis</em> MRSE) e o <em>S. aureus</em> (MRSA). O esquema empírico padrão é <strong>Vancomicina + Gentamicina + Rifampicina</strong> (podendo-se associar cefepima se houver suspeita de BGN nosocomial). A <strong>Rifampicina</strong> é essencial porque penetra o biofilme aderido ao anel protético e mata bactérias em fase estacionária, porém <strong>só deve ser iniciada 3 a 5 dias após o início da vancomicina e da gentamicina</strong>, quando a carga planctônica intravascular já caiu, impedindo a seleção de cepas resistentes por mutação da RNA-polimerase (<em>rpoB</em>).</li>
  <li><strong>Alternativa D (Incorreta):</strong> Os estreptococos orais causam EVP tardia (&gt; 12 meses); aos 45 dias pós-operatórios predominam MRSE e MRSA, contra os quais a ceftriaxona é ineficaz.</li>
  <li><strong>Alternativa E (Incorreta):</strong> A cobertura empírica bacteriana imediata após coleta de culturas é mandatória na EVP aguda.</li>
</ul>
`
    }
  ],
  references: [
    {
      label: 'Delgado V, Ajmone Marsan N, de Waha S, et al. 2023 ESC Guidelines for the management of endocarditis. European Heart Journal. 2023;44(39):3948-4042.',
      url: 'https://academic.oup.com/eurheartj/article/44/39/3948/7243107'
    },
    {
      label: 'Fowler VG, Durack DT, Selton-Suty C, et al. The 2023 Duke-International Society for Cardiovascular Infectious Diseases Criteria for Infective Endocarditis: Updating the Modified Duke Criteria. Clinical Infectious Diseases. 2023;77(4):518-526.',
      url: 'https://academic.oup.com/cid/article/77/4/518/7151107'
    },
    {
      label: 'Tarasoutchi F, Montera MW, Ramos AIO, et al. Atualização das Diretrizes Brasileiras de Valvopatias – 2020. Arquivos Brasileiros de Cardiologia. 2020;115(4):720-775.',
      url: 'https://abccardiol.org/article/atualizacao-das-diretrizes-brasileiras-de-valvopatias-2020/'
    },
    {
      label: 'Baddour LM, Wilson WR, Bayer AS, et al. Infective Endocarditis in Adults: Diagnosis, Antimicrobial Therapy, and Management of Complications: A Scientific Statement for Healthcare Professionals From the American Heart Association. Circulation. 2015;132(15):1435-1486.',
      url: 'https://www.ahajournals.org/doi/10.1161/CIR.0000000000000296'
    },
    {
      label: 'Iversen K, Ihlemann N, Gill SU, et al. Partial Oral versus Intravenous Antibiotic Treatment of Endocarditis (POET Trial). New England Journal of Medicine. 2019;380(5):415-424.',
      url: 'https://www.nejm.org/doi/full/10.1056/NEJMoa1808312'
    },
    {
      label: 'Wilson WR, Gewitz M, Lockhart PB, et al. Prevention of Viridans Group Streptococcal Infective Endocarditis: A Scientific Statement From the American Heart Association. Circulation. 2021;143(20):e963-e978.',
      url: 'https://www.ahajournals.org/doi/10.1161/CIR.0000000000000969'
    }
  ]
};

saveBook(book);
