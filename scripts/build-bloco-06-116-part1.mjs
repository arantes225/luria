// Bloco 6 - Aula 116: Síndromes Glomerulares (Parte 1: Seções 1 a 5)

export const sec1 = {
  id: 'anatomia-ultraestrutural-da-barreira-de-filtracao-glomerular',
  title: '1. Anatomia Funcional e Ultraestrutura da Barreira de Filtração Glomerular',
  body_html: `
<h3>A Arquitetura Tridimensional do Glomérulo Renal</h3>
<p>O glomérulo renal representa uma das estruturas microvasculares mais especializadas e sofisticadas da biologia humana. Inserido no interior da cápsula de Bowman, cada glomérulo é composto por um tufo capilar anastomosado originado da arteríola aferente e drenado pela arteríola eferente, sustentado centralmente por uma matriz mesangial e células mesangiais contráteis com propriedades fagocíticas e imunorreguladoras.</p>

<p>A função primordial do glomérulo é a produção contínua do ultrafiltrado plasmático (cerca de 180 litros por dia no adulto jovem saudável, correspondendo a um ritmo de filtração glomerular de 120 mL/min/1,73m²), permitindo a passagem livre de água, eletrólitos, glicose e pequenas moléculas, enquanto retém com eficácia quase absoluta os elementos celulares do sangue (eritrócitos, leucócitos, plaquetas) e as macromoléculas plasmáticas (notadamente a albumina e as imunoglobulinas).</p>

<h3>Os Três Componentes Estruturais da Barreira de Filtração Glomerular</h3>
<p>A integridade e seletividade da filtração dependem de três camadas teciduais dispostas em série:</p>

<table class="book-table">
  <thead>
    <tr>
      <th>Camada da Barreira Glomerular</th>
      <th>Ultraestrutura e Componentes Moleculares</th>
      <th>Mecanismo Biofísico de Restrição</th>
      <th>Lesão Histopatológica Típica</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>1. Endotélio Capilar Fenestrado</strong></td>
      <td>Células endoteliais especializadas contendo fenestrações transcelulares circulares de <strong>70 a 100 nanômetros</strong> de diâmetro. A superfície luminal é revestida por um <strong>Glicocálix Endotelial</strong> rico em proteoglicanos e sialoproteínas carregadas negativamente.</td>
      <td><strong>Seletividade de Tamanho para Células:</strong> Impede a passagem de hemácias, leucócitos e plaquetas para o espaço urinário. Não retém albumina isoladamente devido ao diâmetro avantajado das fenestras.</td>
      <td>Endoteliose capilar na pré-eclâmpsia; trombose e edema endotelial na Microangiopatia Trombótica (SHU / PTT).</td>
    </tr>
    <tr>
      <td><strong>2. Membrana Basal Glomerular (MBG)</strong></td>
      <td>Estrutura acelular espessa (300 a 350 nm) formada pela fusão das lâminas basais do endotélio e dos podócitos. Composta por uma rede tridimensional insolúvel de <strong>Colágeno Tipo IV (cadeias $\\alpha_3, \\alpha_4, \\alpha_5$), Laminina-521, Nidogênio e Heparan Sulfato</strong>.</td>
      <td><strong>Seletividade Dupla (Carga e Tamanho):</strong> O heparan sulfato confere <strong>eletronegatividade estrita (barreira de carga)</strong>, repelindo a albumina polianiônica. A malha de colágeno IV forma poros moleculares de <strong>4 a 5 nm (barreira de tamanho)</strong>.</td>
      <td>Síndrome de Alport (mutações nas cadeias do colágeno IV); Doença da Membrana Basal Fina; Doença de Goodpasture (anticorpos anti-colágeno $\\alpha_3$).</td>
    </tr>
    <tr>
      <td><strong>3. Células Epiteliais Viscerais (Podócitos) e Fendas de Filtração</strong></td>
      <td>Células com arquitetura arborizada emitindo prolongamentos secundários (pedicelos) que se interdigitam ao redor dos capilares. Os espaços entre pedicelos adjacentes (fendas de 25 a 60 nm) são ocluídos pelo <strong>Diafragma de Fenda (Slit Diaphragm)</strong>, ancorado por <strong>Nefrina, Podocina, CD2AP e $\\alpha$-actinina-4</strong>.</td>
      <td><strong>A Barreira Definitiva de Macromoléculas:</strong> Os poros do diafragma de fenda possuem raio efetivo de <strong>4 nm</strong>, bloqueando rigidamente a passagem de proteínas plasmáticas com peso molecular superior a 60-70 kDa.</td>
      <td>Fusão e apagamento difuso dos pedicelos podocitários na Doença por Lesões Mínimas e na Glomeruloesclerose Segmentar e Focal (GESF).</td>
    </tr>
  </tbody>
</table>

<h3>A Dualidade Seletiva: Restrição por Tamanho versus Restrição por Carga</h3>
<ul>
  <li><strong>Restrição por Tamanho (Size-Selectivity):</strong> Moléculas esféricas com raio molecular inferior a 20 Ångströms (como água, ureia, creatinina, sódio) são filtradas livremente sem restrição. Moléculas com raio superior a 42 Ångströms são completamente barradas. A albumina humana possui um raio molecular de aproximadamente 36 Ångströms e peso molecular de 66 a 69 kDa, situando-se em uma zona limítrofe crítica;</li>
  <li><strong>Restrição Eletrostática por Carga (Charge-Selectivity):</strong> O pH fisiológico plasmático (7,40) confere à molécula de albumina uma <strong>carga líquida fortemente negativa (polianiônica)</strong>. Como a membrana basal e os pedicelos são intensamente recobertos por polímeros polianiônicos de heparan sulfato e podocalixina, ocorre repulsão eletrostática mútua. A perda seletiva das cargas negativas glomerulares (fenômeno central da Doença por Lesões Mínimas) acarreta proteinúria maciça puramente seletiva de albumina.</li>
</ul>
`
};

export const sec2 = {
  id: 'paradigma-clinico-sindrome-nefritica-versus-sindrome-nefrotica',
  title: '2. O Paradigma Fundamental: Síndrome Nefrítica versus Síndrome Nefrótica no Adulto',
  body_html: `
<h3>As Duas Grandes Vias da Doença Glomerular</h3>
<p>O acometimento inflamatório ou degenerativo dos glomérulos renais manifesta-se clinicamente através de duas grandes síndromes clássicas da medicina interna, cujo domínio semiótico, fisiopatológico e laboratorial é imperativo para qualquer médico assistente:</p>

<table class="book-table">
  <thead>
    <tr>
      <th>Parâmetro Clínico-Laboratorial</th>
      <th>Síndrome Nefrítica Clássica</th>
      <th>Síndrome Nefrótica Plena</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>Mecanismo Fisiopatológico Central</strong></td>
      <td><strong>Processo Inflamatório Glomerular Exsudativo e Proliferativo.</strong> Ruptura mecânica das alças capilares glomerulares por influxo de neutrófilos e imunocomplexos com perda de integridade endotelial.</td>
      <td><strong>Disfunção Eletrostática e Estrutural Podocitária Severa.</strong> Perda das cargas negativas e/ou retração e apagamento difuso dos pedicelos podocitários sem proliferação celular endotelial.</td>
    </tr>
    <tr>
      <td><strong>Quadro Clínico Cardeal</strong></td>
      <td><strong>Tríade Nefrítica Clássica:</strong><br>1. <strong>Hematúria Dismórfica</strong> (macro ou microscópica);<br>2. <strong>Hipertensão Arterial Sistêmica</strong> volumétrica;<br>3. <strong>Edema Periorbital Matutino</strong> e oligúria.</td>
      <td><strong>Tétrade Nefrótica Clássica:</strong><br>1. <strong>Proteinúria Maciça Nefrótica</strong> ($&gt; 3,5\\text{ g}/24\\text{h}$);<br>2. <strong>Hipoalbuminemia Severa</strong> ($&lt; 3,0\\text{ g/dL}$);<br>3. <strong>Edema Generalizado Grave (Anasarca)</strong>;<br>4. <strong>Dislipidemia Mista</strong> e lipidúria.</td>
    </tr>
    <tr>
      <td><strong>Exame do Sedimento Urinário (EAS / Sumário)</strong></td>
      <td><strong>Sedimento Ativo / Inflamatório:</strong> Hemácias dismórficas (&gt; 80%), <strong>Cilindros Hemáticos Patognomônicos</strong>, piúria e cilindros leucocitários discretos.</td>
      <td><strong>Sedimento Pobre / Celularmente Inativo:</strong> Cilindros hialinos, corpos ovais graxos, <strong>Cilindros Graxos e Gotículas Lipídicas com birefringência em Cruz de Malta</strong> sob luz polarizada.</td>
    </tr>
    <tr>
      <td><strong>Faixa de Proteinúria de 24 Horas</strong></td>
      <td>Subnefrótica (habitualmente entre <strong>0,5 e 2,0 g/24 horas</strong>; raramente ultrapassa 3,0 g).</td>
      <td><strong>Maciça Nefrótica:</strong> $\ge 3,5\\text{ g}/24\\text{h}$ no adulto (ou $\ge 50\\text{ mg/kg/dia}$ / Relação Proteína/Creatinina em amostra isolada $\ge 2,0\\text{ mg/mg}$).</td>
    </tr>
    <tr>
      <td><strong>Fisiopatologia do Edema</strong></td>
      <td><strong>Superenchimento (Overfill):</strong> Retenção primária renal de sódio e água nos túbulos coletores distais mediada por inflamação e queda da TFG $\\rightarrow$ <strong>Hipervolemia com Renina e Aldosterona suprimidas!</strong></td>
      <td>Mista: Clássico <strong>Subenchimento (Underfill)</strong> por queda da pressão oncótica capilar ($&lt; 2,0\\text{ g/dL}$ de albumina) associado a ativação de canais ENaC por plasmina urinária.</td>
    </tr>
    <tr>
      <td><strong>Complicações Sistêmicas Mais Graves</strong></td>
      <td>Congestão circulatória hipervolêmica aguda, <strong>Edema Agudo de Pulmão Cardiogênico</strong>, Encefalopatia Hipertensiva e Lesão Renal Aguda oligoanúrica.</td>
      <td><strong>Fenômenos Tromboembólicos Graves</strong> (trombose de veia renal, TEP, TVP) e <strong>Infecções Bacterianas Graves</strong> por germes encapsulados (peritonite espontânea por pneumococo).</td>
    </tr>
  </tbody>
</table>

<h3>A Hematúria Dismórfica e os Cilindros Hemáticos: Como Reconhecer a Origem Glomerular</h3>
<p>Diferenciar a hematúria de origem glomerular da hematúria urológica (nefrolitíase, tumores de bexiga, hiperplasia prostática, cistite) é uma das competências fundamentais da nefrologia clínica:</p>

<ul>
  <li><strong>Dismorfismo Eritrocitário:</strong> Ao atravessarem as fendas rompidas da membrana basal glomerular inflamada e percorrerem os túbulos renais sob variações extremas de osmolaridade e pH urinário, os eritrócitos sofrem distorções morfológicas profundas na sua membrana lipídica. A presença de <strong>mais de 40% a 50% de hemácias dismórficas</strong> no sedimento confirma origem glomerular;</li>
  <li><strong>Acantócitos e Células G1:</strong> São hemácias com projeções espiculares vesiculares irregulares na membrana em formato de "cabeça do Mickey Mouse". A presença de <strong>mais de 5% de acantócitos é patognomônica de sangramento glomerular ativo</strong>;</li>
  <li><strong>Cilindros Hemáticos:</strong> Formados pelo aprisionamento de hemácias na matriz de mucoproteína de Tamm-Horsfall no interior dos túbulos coletores distais. Sua presença no laudo <strong>fecha com 100% de certeza o diagnóstico de glomerulonefrite ativa</strong>.</li>
</ul>
`
};

export const sec3 = {
  id: 'glomerulonefrite-pos-estreptococica-gnpe-e-nefropatia-por-iga',
  title: '3. Glomerulopatias Nefríticas Paradigmáticas: GNPE e Nefropatia por IgA (Doença de Berger)',
  body_html: `
<h3>1. Glomerulonefrite Difusa Aguda Pós-Estreptocócica (GNPE)</h3>
<p>A <strong>GNPE</strong> é o protótipo universal da síndrome nefrítica aguda na infância e em adultos jovens, desencadeada por uma resposta imunológica anômala secundária à infecção prévia por cepas nefritogênicas de <strong><em>Streptococcus pyogenes</em> (Streptococcus beta-hemolítico do Grupo A - SBHGA)</strong> que expressam antígenos específicos como o receptor de plasmina associado à nefrite (NAPlr) e a exotoxina pirogênica B estreptocócica (SPEB).</p>

<h4>A Cronologia Clínica Obrigatória (O Período de Latência Inegociável):</h4>
<table class="book-table">
  <thead>
    <tr>
      <th>Foco Prévio da Infecção Bacteriana</th>
      <th>Cepas Nefritogênicas de SBHGA</th>
      <th>Período de Latência Rigoroso</th>
      <th>Sorologia Estreptocócica de Escolha</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>Faringoamigdalite Aguda</strong></td>
      <td>Sorotipos <strong>M 1, 4, 12, 25</strong></td>
      <td><strong>1 a 3 semanas</strong><br>(Média de 7 a 21 dias)</td>
      <td><strong>ASLO (Antiestreptolisina O):</strong> Positiva em &gt; 85% a 90% dos casos de infecção de orofaringe.</td>
    </tr>
    <tr>
      <td><strong>Piodermite / Impetigo Cutâneo</strong></td>
      <td>Sorotipos <strong>M 2, 49, 55, 57, 60</strong></td>
      <td><strong>2 a 6 semanas</strong><br>(Média de 14 a 42 dias)</td>
      <td><strong>Anti-DNAse B (Antidesoxirribonuclease B):</strong> A ASLO frequentemente é negativa ou pouco elevada nas infecções de pele devido à inativação lipídica pelo colesterol cutâneo.</td>
    </tr>
  </tbody>
</table>

<h4>Consumo do Sistema Complemento:</h4>
<p>A formação de imunocomplexos circulantes e <em>in situ</em> deflagra ativação intensa da <strong>Via Alternativa do Complemento</strong>, levando a <strong>QUEDA ABRUPTA E MARCADA DOS NÍVEIS SÉRICOS DE C3 E CH50</strong> (com níveis de C4 normais ou discretamente reduzidos). A hipocomplementemia transitória está presente em mais de 90% dos pacientes e <strong>deve obrigatoriamente normalizar em até 6 a 8 semanas</strong> após o início do quadro. A persistência de C3 consumido além de 8 semanas impõe a realização de biópsia renal mandatória para descartar Nefrite Lúpica ou Glomerulonefrite Membranoproliferativa.</p>

<h4>Histopatologia e Microscopia Eletrônica:</h4>
<p>À microscopia óptica, observa-se glomerulonefrite proliferativa difusa com hipercelularidade endotelial e mesangial associada a neutrófilos nos capilares. À microscopia eletrônica, o achado patognomônico e célebre de provas é a presença de <strong>Depósitos Densos Subepiteliais Proeminentes em Formato de Corcovas ou Ombros de Camelo ("HUMPS")</strong>.</p>

<h3>2. Nefropatia por IgA (Doença de Berger)</h3>
<p>A <strong>Nefropatia por IgA</strong> é a glomerulonefrite primária mais comum em todo o planeta, acometendo preferencialmente adultos jovens do sexo masculino (proporção de 2:1 a 3:1 entre a segunda e terceira décadas de vida). Caracteriza-se pelo defeito genético e epigenético na O-glicosilação da imunoglobulina A1 na região da dobradiça molecular (formação de <strong>IgA1 deficiente em galactose</strong>), deflagrando produção de autoanticorpos IgG anti-IgA e deposição de imunocomplexos na matriz mesangial glomerular.</p>

<h4>Apresentações Clínicas Clássicas:</h4>
<ol>
  <li><strong>Hematúria Macroscópica Recorrente Sinfrangítica:</strong> Episódios de urina colúrica escura que surgem <strong>concomitantemente (em menos de 24 a 48 horas) a infecções de vias aéreas superiores</strong> ou exercícios físicos extenuantes. <strong>NÃO HÁ PERÍODO DE LATÊNCIA!</strong> (a hematúria eclode junto com o quadro gripal);</li>
  <li><strong>Micro-hematúria Glomerular Assintomática e Proteinúria Subnefrótica Persistente:</strong> Detectada em exames admissionais de rotina em adultos jovens hígidos;</li>
  <li><strong>Complemento Sérico (C3 e C4) Estritamente NORMAL:</strong> Ao contrário da GNPE, a Nefropatia por IgA cursa com níveis normais de complemento em mais de 95% dos pacientes.</li>
</ol>
`
};

export const sec4 = {
  id: 'sindrome-nefrotica-doenca-por-lesoes-minimas-gesf-e-membranosa',
  title: '4. As Três Grandes Glomerulopatias Nefróticas do Adulto: DLM, GESF e Nefropatia Membranosa',
  body_html: `
<h3>1. Doença por Lesões Mínimas (DLM / Nefrose Lipoide)</h3>
<p>Representa a causa mais frequente de síndrome nefrótica em crianças (mais de 85% dos casos pediátricos) e responde por cerca de 10% a 15% dos casos no adulto. É uma podocitopatia pura imunomediada por citocinas secretadas por linfócitos T anômalos que neutralizam as cargas elétricas polianiônicas da membrana basal:</p>

<ul>
  <li><strong>Quadro Clínico:</strong> Síndrome nefrótica súbita e pura, com anasarca dramática em poucos dias. Ausência habitual de hipertensão, hematúria macroscópica ou perda de função renal;</li>
  <li><strong>Proteinúria Altamente Seletiva:</strong> Mais de 85% a 90% da proteína perdida na urina é puramente albumina (sem passagem de macromoléculas maiores como imunoglobulina G);</li>
  <li><strong>Achados Histopatológicos:</strong>
    <ul>
      <li><em>Microscopia Óptica:</em> Glomérulos de <strong>aspecto rigorosamente NORMAL</strong> (daí o nome "lesões mínimas");</li>
      <li><em>Imunofluorescência:</em> <strong>Negativa</strong> (sem depósitos de anticorpos ou complemento);</li>
      <li><em>Microscopia Eletrônica:</em> <strong>Fusão, retração e apagamento difuso dos pedicelos podocitários</strong>;</li>
    </ul>
  </li>
  <li><strong>Resposta Terapêutica:</strong> Extraordinária e rápida resposta aos <strong>Corticosteroides Sistêmicos (Prednisona 1 mg/kg/dia no adulto)</strong>, com remissão completa da proteinúria em mais de 90% dos casos. Em adultos idosos com DLM súbita, é mandatório rastrear <strong>Linfoma de Hodgkin</strong> oculto.</li>
</ul>

<h3>2. Glomeruloesclerose Segmentar e Focal (GESF)</h3>
<p>A <strong>GESF</strong> é a causa primária mais prevalente de síndrome nefrótica em adultos no Brasil e nos Estados Unidos (especialmente em afrodescendentes e homens jovens). É caracterizada pela lesão e esclerose que acomete <strong>menos de 50% de todos os glomérulos da amostra de biópsia (focal)</strong> e apenas <strong>uma porção ou segmento do tufo glomerular individual (segmentar)</strong>.</p>

<table class="book-table">
  <thead>
    <tr>
      <th>Classificação da GESF</th>
      <th>Mecanismos Etiológicos e Fatores Associados</th>
      <th>Apresentação Clínica Típica</th>
      <th>Abordagem Terapêutica</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>GESF Primária (Idiopática)</strong></td>
      <td>Presença de <strong>Fator de Permeabilidade Circulante</strong> não identificado que lesa os podócitos. Polimorfismos no gene <strong>APOL1</strong> em afrodescendentes.</td>
      <td>Síndrome nefrótica abrupta, proteinúria não seletiva maciça, hipoalbuminemia severa, edema grave.</td>
      <td>Imunossupressão agressiva com corticoterapia prolongada (prednisona por 16 a 24 semanas) &plusmn; inibidores de calcineurina (ciclosporina/tacrolimus).</td>
    </tr>
    <tr>
      <td><strong>GESF Secundária (Hiperfluxo / Hiperfiltração)</strong></td>
      <td>Sobrecarga hemodinâmica crônica sobre glomérulos remanescentes: <strong>Obesidade mórbida, agenesia renal unilateral, perda cirúrgica de néfrons, refluxo vesicoureteral crônico, anemia falciforme</strong>.</td>
      <td>Proteinúria de instalação insidiosa e lenta, com níveis de albumina sérica frequentemente normais ou discretamente reduzidos e <strong>ausência de anasarca franca</strong>.</td>
      <td><strong>NÃO RESPONDEM A CORTICOIDES!</strong> Tratamento estritamente hemodinâmico com bloqueio do SRAA (iECA / BRA) e inibidores de SGLT2 para reduzir a hipertensão intraglomerular.</td>
    </tr>
    <tr>
      <td><strong>GESF Associada a Toxinas e Vírus</strong></td>
      <td><strong>HIV (Nefropatia Associada ao HIV - HIVAN com variante colapsante fulminante)</strong>, uso de heroína intravenosa, infecção por Parvovírus B19 e Citomegalovírus.</td>
      <td>Insuficiência renal rapidamente progressiva com rins aumentados de volume na ultrassonografia.</td>
      <td>Tratamento antirretroviral (TARV) e suporte nefroprotetor.</td>
    </tr>
  </tbody>
</table>

<h3>3. Glomerulopatia Membranosa (Nefropatia Membranosa)</h3>
<p>É a causa mais comum de síndrome nefrótica em indivíduos brancos acima dos 50 a 60 anos de idade. Caracteriza-se pelo espessamento homogêneo difuso da membrana basal glomerular decorrente do acúmulo de imunocomplexos subepiteliais (entre a MBG e o podócito):</p>

<ul>
  <li><strong>Etiologia Primária Autoimune (70% a 80% dos casos):</strong> Descoberta revolucionária de autoanticorpos circulantes do tipo IgG4 direcionados contra o <strong>Receptor da Fosfolipase A2 do tipo M (Anti-PLA2R)</strong> expresso na superfície dos podócitos humanos. Títulos elevados de anti-PLA2R correlacionam-se diretamente com a gravidade da proteinúria e o risco de progressão;</li>
  <li><strong>Etiologias Secundárias (20% a 30%):</strong> Mandatório rastrear <strong>Neoplasias Sólidas Ocultas em Idosos (carcinoma de cólon, pulmão, estômago, próstata e mama)</strong>, infecção crônica pelo <strong>Vírus da Hepatite B (HBV)</strong>, Lúpus Eritematoso Sistêmico (Nefrite Lúpica Classe V) e uso de fármacos (captopril, sais de ouro, penicilamina e AINEs);</li>
  <li><strong>O Risco Tromboembólico Máximo:</strong> A nefropatia membranosa é a glomerulopatia que apresenta a <strong>MAIOR TAXA DE TROMBOSE DE VEIA RENAL (TVR) E TROMBOEMBOLISMO PULMONAR (TEP)</strong> de toda a medicina interna! Ocorre em até 30% a 40% dos pacientes com albumina sérica &lt; 2,0 g/dL, justificando anticoagulação profilática com varfarina ou NOACs;</li>
  <li><strong>Histopatologia Típica:</strong>
    <ul>
      <li><em>Microscopia Óptica (Coloração pela Prata - Jones):</em> Espessamento difuso da MBG com projeções espiculares perpendiculares de matriz extracelular entre os depósitos imunes, assumindo o aspecto de <strong>"Espículas" ou "Dentes de Pente" (Spikes)</strong>;</li>
      <li><em>Imunofluorescência:</em> Deposição granular fina e difusa de IgG e C3 ao longo de todas as alças capilares.</li>
    </ul>
  </li>
</ul>
`
};

export const sec5 = {
  id: 'glomerulonefrite-membranoproliferativa-gnmp-e-crioglobulinemia',
  title: '5. Glomerulonefrite Membranoproliferativa (Mesangiocapilar) e Doenças por Imunocomplexos',
  body_html: `
<h3>A Dupla Agressão: Espessamento de Parede e Hipercelularidade Mesangial</h3>
<p>A <strong>Glomerulonefrite Membranoproliferativa (GNMP)</strong>, historicamente denominada glomerulonefrite mesangiocapilar, caracteriza-se por um padrão histológico glomerular misto e exuberante que combina <strong>espessamento pronunciado das paredes dos capilares glomerulares com proliferação acentuada de células mesangiais e infiltração leucocitária</strong>. Clinicamente, manifesta-se de forma variada como síndrome nefrítica associada a proteinúria nefrótica (síndrome nefrítico-nefrótica mista), hipertensão severa e insuficiência renal progressiva crônica, associada a <strong>consumo crônico e prolongado de complemento sérico (C3 e C4 permanentemente deprimidos)</strong>.</p>

<h3>A Nova Classificação Imunopatológica da GNMP</h3>
<p>A classificação clássica antiga dividia a GNMP em Tipos I, II e III com base puramente na localização ultraestrutural dos depósitos à microscopia eletrônica. Atualmente, a classificação internacional foi revolucionada pela <strong>Imunofluorescência</strong>, dividindo a doença em duas grandes vias etiopatogênicas fundamentais:</p>

<table class="book-table">
  <thead>
    <tr>
      <th>Classificação Atual por Imunofluorescência</th>
      <th>Fisiopatologia Imunológica Central</th>
      <th>Principais Associações Clínicas Sistêmicas</th>
      <th>Comportamento do Complemento Sérico</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>1. GNMP Mediada por Imunocomplexos / Imunoglobulinas</strong><br>(IF: Positiva intensa para IgG/IgM e C3/C4)</td>
      <td>Deposição crônica de imunocomplexos circulantes insolúveis no mesângio e espaço subendotelial ativando a via clássica.</td>
      <td><strong>Infecção Crônica pelo Vírus da Hepatite C (HCV) associada à Crioglobulinemia Mista Essencial</strong>; Hepatite B; Lúpus Eritematoso Sistêmico; Gamopatias Monoclonais (Mieloma Múltiplo / Doença de Depósito de Cadeia Leve).</td>
      <td><strong>Consumo Profundo e Persistente de C4 e C3</strong> (C4 indetectável pela crioglobulinemia com fator reumatoide positivo).</td>
    </tr>
    <tr>
      <td><strong>2. GNMP Mediada pelo Complemento (Glomerulopatia por C3)</strong><br>(IF: Positiva isolada para C3 com ausência total de imunoglobulinas)</td>
      <td>Desregulação congênita ou adquirida grave da <strong>Via Alternativa do Complemento</strong> sem envolvimento de anticorpos.</td>
      <td>Presença de autoanticorpo <strong>C3 Nephritic Factor (C3NeF)</strong> que estabiliza a C3 convertase alternativa, levando a clivagem descontrolada contínua de C3 sérico; mutações nos genes do Fator H, Fator I ou CD46.</td>
      <td><strong>Queda profunda isolada de C3 com C4 estritamente NORMAL</strong>. Inclui a Doença de Depósitos Densos (antigo Tipo II com depósitos em fita intramembranosa na MBG).</td>
    </tr>
  </tbody>
</table>

<h3>O Aspecto Histopatológico Patognomônico: Duplo Contorno da Membrana Basal (Tram-Track)</h3>
<p>À microscopia óptica corada pela prata metenamina (PAMS), o achado arquitetural mais celebrado em provas de residência médica é o aspecto de <strong>Duplo Contorno da Membrana Basal Glomerular (em trilhos de trem / tram-track appearance)</strong>. Esse fenômeno surge porque as células mesangiais ativadas e os monócitos insinuam prolongamentos citoplasmáticos interpondo-se entre a célula endotelial e a membrana basal (interposição mesangial circunferencial), secretando nova matriz de membrana basal por baixo de si mesmos e duplicando o contorno da alça capilar.</p>
`
};
