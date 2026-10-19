// scripts/bloco07_group_a/generate-cancer-gastrico.mjs
import { saveBook, countUsefulChars } from '../bloco-07-utils.mjs';
import { secCancerGastricoExpansao } from './cancer-gastrico-expansao.mjs';
import { secCancerGastricoExpansao2 } from './cancer-gastrico-expansao2.mjs';
import { secCancerGastricoExpansao3 } from './cancer-gastrico-expansao3.mjs';
import { secCancerGastricoExpansao4 } from './cancer-gastrico-expansao4.mjs';
import { secCancerGastricoExpansao5 } from './cancer-gastrico-expansao5.mjs';
import fs from 'fs';
import path from 'path';

const slug = 'cancer-gastrico';

const baseSections = [
  {
    id: 'introducao-epidemiologia-fatores-de-risco',
    title: '1. Introdução, Epidemiologia Global e Fatores de Risco Etiopatogênicos',
    body_html: `
<p>O câncer gástrico permanece como uma das neoplasias malignas de maior letalidade no mundo contemporâneo, ocupando a quinta posição em incidência global e a quarta causa de morte por câncer em nível mundial, com mais de 1 milhão de novos diagnósticos e cerca de 770.000 óbitos anuais. No Brasil, o Instituto Nacional de Câncer (INCA) estima aproximadamente 21.000 novos casos a cada triênio, situando-se como o quarto tumor maligno mais comum no sexo masculino e o sexto entre as mulheres (excetuando-se os tumores de pele não melanoma), com acentuada concentração regional nas regiões Norte, Nordeste e Sul.</p>

<p>A imensa maioria (&gt; 90% a 95%) dos tumores gástricos malignos primários corresponde a <strong>adenocarcinomas</strong> originados do epitélio glandular da mucosa gástrica. Os 5% a 10% restantes abrangem linfomas gástricos primários (destacando-se o Linfoma MALT associado à infecção bacteriana e o Linfoma Difuso de Grandes Células B), tumores estromais gastrointestinais (GIST), tumores neuroendócrinos (carcinoides) e sarcomas.</p>

<h3>Fatores de Risco Ambientais, Dietéticos e Microbianos</h3>
<table class="book-table">
  <thead>
    <tr>
      <th>Fator de Risco</th>
      <th>Mecanismo Biológico / Fisiopatológico Detalhado</th>
      <th>Magnitude e Relevância Clínica</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>Infecção pelo Helicobacter pylori</strong></td>
      <td>Bactéria classificada pela OMS/IARC como <strong>Carcinógeno Humano Grupo 1</strong>. Cepas portadoras de fatores de virulência como CagA (proteína citotóxica fosforilada pela tirosina quinase que desorganiza o citoesqueleto via via SHP-2/ERK) e VacA desencadeiam inflamação crônica, estresse oxidativo, dano ao DNA celular, perda progressiva de glândulas oxínticas e deflagram a cascata de Pelayo Correa.</td>
      <td>Fator de risco isolado mais prevalente; eleva o risco relativo de adenocarcinoma gástrico distal (não cárdia) em 3 a 6 vezes. A erradicação bacteriana reduz a incidência de câncer em populações de alto risco.</td>
    </tr>
    <tr>
      <td><strong>Dieta Rica em Sal e Alimentos Curados / Defumados</strong></td>
      <td>Alimentos preservados em sal (salmouras, peixes secos) e carnes processadas ricas em <strong>compostos N-nitrosos (nitratos e nitritos)</strong>. O excesso de sal cloreto de sódio exerce agressão osmótica tópica direta, destruindo a camada de muco protetora gástrica e acelerando a colonização por <em>H. pylori</em>; os nitratos são convertidos por bactérias intragástricas redutoras em nitrosaminas, potentes agentes mutagênicos alquilantes de DNA.</td>
      <td>Forte correlação com a elevada incidência histórica em países asiáticos (Japão, Coreia do Sul) e populações que consomem dietas tradicionais com conservação por salga/defumação.</td>
    </tr>
    <tr>
      <td><strong>Tabagismo e Etilismo</strong></td>
      <td>O alcatrão e os hidrocarbonetos aromáticos policíclicos da fumaça inalada dissolvem-se na saliva e são deglutidos, expondo a mucosa a aminas carcinogênicas. O fumo induz hipóxia tecidual e mutações no TP53.</td>
      <td>Aumenta o risco de câncer gástrico tanto cárdico quanto não cárdico em 1,5 a 2,5 vezes, com relação dose-resposta direta dependente da carga tabágica (maços-ano).</td>
    </tr>
    <tr>
      <td><strong>Gastrite Crônica Atrófica e Metaplasia Intestinal</strong></td>
      <td>A atrofia glandular com perda das células parietais provoca <strong>hipocloridria e acloridria</strong>. O aumento do pH intragástrico (&gt; 4,0-5,0) anula o efeito bactericida da barreira ácida, favorecendo a colonização por microbiota anaeróbia colonizadora de orofaringe e intestino, produtora de enzimas conversoras de nitratos em nitrosaminas carcinogênicas.</td>
      <td>Lesões pré-malignas consagradas. A presença de metaplasia intestinal incompleta (tipo III, cólica) confere risco aumentado e exige rastreamento endoscópico bienal (protocolos OLGA/OLGIM).</td>
    </tr>
    <tr>
      <td><strong>Anemia Perniciosa (Gastrite Autoimune Tipo A)</strong></td>
      <td>Destruição autoimune mediada por anticorpos anti-célula parietal e anti-fator intrínseco, acometendo seletivamente o <strong>corpo e fundo gástrico</strong> (poupando o antro). Cursa com acloridria absoluta, hipergastrinemia secundária extrema e má-absorção de vitamina B12.</td>
      <td>Eleva o risco de adenocarcinoma gástrico em cerca de 3 vezes e associa-se a <strong>Tumores Neuroendócrinos Gástricos Tipo 1</strong> secundários à hiperplasia das células enterocromafim-símile (ECL) induzida pela gastrina.</td>
    </tr>
    <tr>
      <td><strong>Gastrectomia Parcial Prévia (Câncer do Coto Gástrico)</strong></td>
      <td>Pacientes submetidos à gastrectomia parcial por doença benigna (como cirurgias clássicas de Billroth II há mais de 15 a 20 anos). O refluxo enterogástrico crônico de bile e secreção pancreática gera gastrite crônica alcalina severa, atrofia e degeneração neoplásica.</td>
      <td>O risco de câncer do coto gástrico eleva-se significativamente após 15 a 20 anos da cirurgia inicial, demandando vigilância endoscópica periódica.</td>
    </tr>
    <tr>
      <td><strong>Infecção pelo Vírus Epstein-Barr (EBV)</strong></td>
      <td>O vírus EBV infecta as células epiteliais gástricas, promovendo hipermetilação aberrante e disseminada de promotores gênicos (CIMP-positivo), silenciando genes supressores de tumor como CDKN2A (p16).</td>
      <td>Responsável por cerca de 8% a 10% de todos os adenocarcinomas gástricos mundiais; subtipo molecular caracterizado por excelente sobrevida e alta imunogenicidade (infiltrado linfoide exuberante - carcinoma gástrico com estroma linfoide).</td>
    </tr>
  </tbody>
</table>
`
  },
  {
    id: 'classificacoes-histologicas-lauren-e-bormann',
    title: '2. Classificações Morfológicas e Histopatológicas: Bormann e Lauren',
    body_html: `
<p>O adenocarcinoma gástrico é uma doença biologicamente heterogênea. Para fins de conduta cirúrgica, planejamento de margens e predição prognóstica, duas classificações históricas continuam sendo a espinha dorsal de provas e da rotina cirúrgica mundial: a classificação macroscópica de Bormann e a classificação microscópica de Lauren.</p>

<h3>Classificação Macroscópica de Bormann (Câncer Gástrico Avançado)</h3>
<p>Aplicada exclusivamente aos tumores invasores que ultrapassam a camada submucosa e atingem a muscular própria ou camadas mais profundas (câncer gástrico avançado):</p>

<table class="book-table">
  <thead>
    <tr>
      <th>Tipo de Bormann</th>
      <th>Morfologia Macroscópica / Aspecto Endoscópico</th>
      <th>Comportamento Biológico e Prognóstico</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>Bormann I</strong></td>
      <td><strong>Polipoide ou Vegetante:</strong> Massa tumoral volumosa que se projeta intraluminalmente, bem delimitada da mucosa adjacente normal, sem ulceração central significativa.</td>
      <td>Lesão expansiva, menor taxa de invasão transmural precoce; prognóstico comparativamente favorável dentro do grupo avançado.</td>
    </tr>
    <tr>
      <td><strong>Bormann II</strong></td>
      <td><strong>Ulcerado Bem Delimitado:</strong> Cratera ulcerosa nítida e profunda, circundada por <strong>bordas elevadas em relevo e abruptamente demarcadas</strong> da mucosa sadia circunvizinha.</td>
      <td>Comportamento localizado, bordas nítidas facilitam a obtenção de margens cirúrgicas microscópicas livres.</td>
    </tr>
    <tr>
      <td><strong>Bormann III</strong></td>
      <td><strong>Ulceroinfiltrativo:</strong> Cratera ulcerosa com <strong>bordas rasas, irregulares e infiltrativas</strong>, que se fundem insidiosamente e gradualmente à parede gástrica adjacente sem limite preciso.</td>
      <td><strong>É o tipo macroscópico MAIS FREQUENTE na prática clínica (cerca de 50% dos casos)</strong>. Elevado potencial de invasão vascular, linfática e linfonodal.</td>
    </tr>
    <tr>
      <td><strong>Bormann IV</strong></td>
      <td><strong>Infiltrativo Difuso (Linite Plástica / <em>Linitis Plastica</em>):</strong> Infiltração difusa e circunferencial de todas as camadas da parede gástrica por células tumorais isoladas e intensa proliferação estromal desmoplásica (fibrose intensa), sem úlcera verdadeira dominante. O estômago perde a distensibilidade, tornando-se uma "garrafa de couro" rígida e inelástica.</td>
      <td><strong>Pior prognóstico de todos os subtipos</strong>. Apresenta disseminação peritoneal precoce (carcinomatose) e metástases linfonodais maciças; limites cirúrgicos macroscópicos virtualmente imperceptíveis, exigindo margens de ressecção amplas (&gt; 6 a 8 cm) ou gastrectomia total.</td>
    </tr>
  </tbody>
</table>

<h3>Classificação Histológica de Lauren (1965): Intestinal versus Difuso</h3>
<div class="clinical-box warning-box">
  <h4>A Dicotomia de Lauren: Tabela Fundamental para Concursos e Especialização</h4>
  <p>A classificação histopatológica de Pekka Lauren divide os adenocarcinomas gástricos em dois grupos biológicos fundamentalmente distintos:</p>
</div>

<table class="book-table">
  <thead>
    <tr>
      <th>Parâmetro</th>
      <th>Tipo Intestinal de Lauren</th>
      <th>Tipo Difuso de Lauren</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>Diferenciação Celular e Arquitetura</strong></td>
      <td><strong>Bem a moderadamente diferenciado</strong>. Forma estruturas tubulares e glandulares nítidas que mimetizam glândulas colônicas/intestinais normais, com secreção de mucina intraluminal. Células coesas com junções intercelulares preservadas.</td>
      <td><strong>Indiferenciado / Pouco diferenciado</strong>. Células neoplásicas isoladas ou em pequenos ninhos soltos, sem formação de glândulas. Apresenta as clássicas <strong>Células em Anel de Sinete</strong>: vacúolo intracitoplasmático gigante repleto de mucina ácida que rechaça e comprime o núcleo contra a periferia celular.</td>
    </tr>
    <tr>
      <td><strong>Base Genética e Molecular</strong></td>
      <td>Instabilidade de microssatélites (MSI-H), mutações no gene <em>TP53</em>, amplificação de <em>HER2/neu</em> (ERBB2), hipermetilação de promotores e associação com <em>H. pylori</em> via cascata de Pelayo Correa.</td>
      <td><strong>Perda de expressão da E-caderina (gene CDH1 no cromossomo 16q22)</strong>. Mutações germinativas hereditárias em <em>CDH1</em> ou hipermetilação somática do promotor causam perda das junções de oclusão epiteliais, permitindo migração e invasão celular individual agressiva.</td>
    </tr>
    <tr>
      <td><strong>Perfil Epidemiológico</strong></td>
      <td>Mais prevalente em <strong>idosos (60 a 75 anos)</strong>, com <strong>predomínio marcante no sexo masculino (2:1)</strong>. Apresenta forte correlação com fatores ambientais (sal, fumo, H. pylori, dieta) e maior incidência em áreas de alta endemicidade. É o subtipo cuja incidência vem caindo no mundo.</td>
      <td>Acomete indivíduos mais <strong>jovens (30 a 50 anos)</strong>, com <strong>distribuição igual entre os sexos (1:1)</strong> ou discreto predomínio feminino. Sem relação evidente com gastrite atrófica ou fatores ambientais. Apresenta incidência global estável ou em discreta ascensão.</td>
    </tr>
    <tr>
      <td><strong>Topografia Gástrica Preferencial</strong></td>
      <td>Predomina no <strong>antro gástrico e pequena curvatura distal</strong> (estômago distal).</td>
      <td>Distribuição difusa, frequente no corpo gástrico proximal, cárdia e fundo; forma típica da <strong>linite plástica (Bormann IV)</strong>.</td>
    </tr>
    <tr>
      <td><strong>Padrão de Disseminação Metastática</strong></td>
      <td>Disseminação primordialmente por via <strong>hematogênica</strong> (metástases hepáticas viscerais confluentes volumosas) e linfonodal regional sequencial.</td>
      <td>Disseminação precoce por <strong>via transcelômica / peritoneal</strong> (carcinomatose peritoneal microscópica, ascite maligna e implantes ovarianos de Krukenberg) e linfática difusa.</td>
    </tr>
    <tr>
      <td><strong>Margem Cirúrgica Recomendada</strong></td>
      <td>Margem macroscópica de segurança de <strong>pelo menos 3 a 5 cm</strong> livre de tumor.</td>
      <td>Margem macroscópica ampla de <strong>pelo menos 6 a 8 cm</strong> (ou gastrectomia total), devido à infiltração submucosa microscópica insidiosa que se estende muito além da borda visível da neoplasia.</td>
    </tr>
    <tr>
      <td><strong>Prognóstico Relativo</strong></td>
      <td>Prognóstico comparativamente mais favorável em estádios equivalentes.</td>
      <td>Prognóstico sombrio e biologia tumoral agressiva com resistência relativa à quimioterapia convencional.</td>
    </tr>
  </tbody>
</table>

<h3>Câncer Gástrico Hereditário Difuso (HDGC) e a Mutação no Gene CDH1</h3>
<p>A síndrome do Câncer Gástrico Difuso Hereditário (HDGC) é uma desordem genética autossômica dominante de alta penetrância decorrente de mutações germinativas heterozigotas no gene supressor de tumor <strong>CDH1</strong> (que codifica a proteína de adesão celular E-caderina):</p>
<ul>
  <li><strong>Risco Cumulativo ao Longo da Vida:</strong> Portadores masculinos apresentam risco cumulativo de até 70% a 80% de desenvolver adenocarcinoma gástrico difuso até os 80 anos; mulheres portadoras apresentam risco de 60% a 70% de câncer gástrico difuso e <strong>risco cumulativo de 40% a 50% de Carcinoma Lobular da Mama</strong>;</li>
  <li><strong>Conduta Profilática Padrão-Ouro:</strong> Diante de indivíduo assintomático com teste genético positivo para mutação patogênica em <em>CDH1</em>, a endoscopia com biópsias aleatórias é ineficaz para detectar focos microscópicos de células em anel de sinete na lâmina própria ("agulha no palheiro"). <strong>A recomendação formal é a GASTRECTOMIA TOTAL PROFILÁTICA COM RECONSTRUÇÃO EM Y DE ROUX</strong>, realizada habitualmente no início da vida adulta (entre 20 e 30 anos de idade), após aconselhamento genético multidisciplinar. O exame anatomopatológico da peça de gastrectomia total profilática revela microfocos de carcinoma em células em anel de sinete in situ em mais de 90% dos pacientes!</li>
</ul>
`
  },
  {
    id: 'diagnostico-clinico-endoscopico-e-metastases',
    title: '3. Quadro Clínico, Propedêutica Diagnóstica e Metástases Linfáticas e Celômicas Clássicas',
    body_html: `
<p>O adenocarcinoma gástrico é notoriamente assintomático ou oligossintomático em suas fases incipientes (câncer gástrico precoce), manifestando sintomas inespecíficos semelhantes à dispepsia funcional (desconforto epigástrico leve, queimação pós-prandial ou plenitude precoce). Com a invasão tumoral progressiva e o avanço locorregional, surgem os sinais de alarme clássicos:</p>
<ul>
  <li>Perda ponderal involuntária acentuada e anorexia profunda;</li>
  <li>Dor epigástrica constante e intratável;</li>
  <li>Náuseas e vômitos pós-prandiais de repetição (tumores antrais obstrutivos do trato de saída gástrico);</li>
  <li>Disfagia progressiva para sólidos e pastosos (tumores do cárdia e junção esofagogástrica);</li>
  <li>Anemia ferropriva crônica decorrente de perda sanguínea oculta contínua, ou episódios de hemorragia digestiva alta exteriorizados por melena ou hematêmese.</li>
</ul>

<h3>Os Cinco Sinais e Epônimos de Metástase à Distância Clássicos</h3>
<p>No exame físico do paciente com câncer gástrico avançado, o cirurgião e o clínico devem pesquisar ativamente locais clássicos de disseminação metastática à distância, que contraindicam cirurgias ressectivas com intuito curativo por indicarem estádio IV (doença metastática disseminada):</p>

<table class="book-table">
  <thead>
    <tr>
      <th>Epônimo / Sinal Clínico</th>
      <th>Topografia Anatômica Exata</th>
      <th>Via e Mecanismo de Disseminação Neoplásica</th>
      <th>Significado Clínico</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>Gânglio / Nódulo de Virchow</strong> (Sinal de Troisier)</td>
      <td>Linfonodomegalia na <strong>fossa supraclavicular esquerda</strong> (entre as inserções do músculo esternocleidomastoideo e clavícula).</td>
      <td>Disseminação linfática retrógrada através do <strong>ducto torácico</strong>, que desemboca no ângulo venoso jugulo-subclávio esquerdo.</td>
      <td>Indica doença metastática linfática sistêmica avançada (Estádio IV).</td>
    </tr>
    <tr>
      <td><strong>Gânglio / Nódulo de Irish</strong></td>
      <td>Linfonodomegalia na <strong>região axilar anterior esquerda</strong>.</td>
      <td>Disseminação linfática transpeitoral a partir da cadeia linfonodal torácica e supraclavicular.</td>
      <td>Indica metástase à distância (M1).</td>
    </tr>
    <tr>
      <td><strong>Nódulo da Irmã Maria José</strong> (<em>Sister Mary Joseph</em>)</td>
      <td>Nódulo endurecido, palpável ou visível, ulcerado ou cicatricial na <strong>cicatriz umbilical</strong>.</td>
      <td>Disseminação peritoneal ou retroperitoneal direta através dos remanescentes fibrosos do ligamento falciforme, ligamento redondo do fígado ou vasos linfáticos umbilicais obliterados.</td>
      <td>Indica carcinomatose peritoneal disseminada (M1).</td>
    </tr>
    <tr>
      <td><strong>Prateleira de Blumer</strong> (<em>Blumer's Shelf</em>)</td>
      <td>Massa tumoral nodular endurecida palpável na <strong>parede anterior do reto</strong> ao toque retal (fundo de saco de Douglas retovesical no homem ou retouterino na mulher).</td>
      <td>Disseminação transcelômica gravitacional: células neoplásicas desprendidas da serosa gástrica caem pelo líquido peritoneal e implantam-se por gravidade no ponto mais declive da pelve.</td>
      <td>Confirma carcinomatose peritoneal pélvica extensa (M1).</td>
    </tr>
    <tr>
      <td><strong>Tumor de Krukenberg</strong></td>
      <td>Massa pélvica palpável correspondente ao <strong>aumento ovariano volumoso bilateral</strong> decorrente de metástase de células em anel de sinete mucoprodutoras.</td>
      <td>Disseminação transcelômica ou linfática retrógrada para os estromas ovarianos.</td>
      <td>Metástase à distância ovariana específica em mulheres jovens com tumor difuso (M1).</td>
    </tr>
  </tbody>
</table>
`
  },
  {
    id: 'estadiamento-locorregional-tnm-e-laparoscopia',
    title: '4. Estadiamento Locorregional, Laparoscopia de Estadiamento e Classificação TNM',
    body_html: `
<p>O estadiamento do adenocarcinoma gástrico é indispensável para selecionar os pacientes candidatos à ressecção cirúrgica curativa direta, à quimioterapia perioperatória neoadjuvante ou ao tratamento paliativo exclusivo.</p>

<h3>Exames Obrigatórios no Algoritmo de Estadiamento</h3>
<ol>
  <li><strong>Endoscopia Digestiva Alta (EDA) com Biópsias Múltiplas:</strong> Estabelece a topografia da lesão em relação ao cárdia e piloro, a extensão longitudinal e fornece fragmentos para análise histológica (subtipo de Lauren) e testes de biomarcadores moleculares obrigatórios: pesquisa de superexpressão de <strong>HER2 por imuno-histoquímica e FISH</strong>, instabilidade de microssatélites (MSI-H / dMMR), expressão de <strong>PD-L1 (CPS - <em>Combined Positive Score</em>)</strong> e Claudina-18.2;</li>
  <li><strong>Tomografia Computadorizada com Contraste de Tórax, Abdome e Pelve:</strong> Exame padrão para pesquisa de metástases à distância (pulmonares, hepáticas viscerais, linfonodomegalias aórticas e retroperitoneais extra-regionais) e avaliação da invasão grosseira de órgãos adjacentes;</li>
  <li><strong>Ecoendoscopia (Ultrassonografia Endoscópica - EUS):</strong> É o exame de maior acurácia diagnóstica para o estadiamento local das categorias <strong>T</strong> (profundidade da invasão da parede gástrica) e <strong>N</strong> (linfonodos perigástricos contíguos):
    <ul>
      <li>Diferencia com precisão o <strong>Câncer Gástrico Precoce (T1a limitado à mucosa vs T1b invadindo a submucosa)</strong> do câncer avançado (T2 invadindo a muscular própria; T3 invadindo a subserosa; T4 perfurando a serosa visceral ou invadindo órgãos adjacentes);</li>
      <li>Orienta a elegibilidade para ressecção endoscópica primária (mucosectomia / ESD);</li>
    </ul>
  </li>
  <li><strong>Laparoscopia de Estadiamento com Citologia Lavado Peritoneal:</strong> Procedimento minimamente invasivo fundamental na rotina oncológica contemporânea.</li>
</ol>

<div class="clinical-box info-box">
  <h4>Indicações Obrigatórias da Laparoscopia de Estadiamento</h4>
  <p>A tomografia convencional apresenta baixa sensibilidade (inferior a 30%-40%) para detectar implantes peritoneais milimétricos na superfície serosa intestinal e no omento. A laparoscopia de estadiamento está <strong>formalmente indicada para todos os tumores potencialmente ressecáveis classificados como &gt;= cT2 e/ou cN+ e em todos os casos de tumor de Lauren difuso ou Bormann IV (linite plástica)</strong> antes de iniciar qualquer plano de tratamento cirúrgico curativo ou quimioterapia:</p>
  <ul>
    <li>Permite inspeção visual direta de todo o peritônio parietal, superfície diafragmática, omento e pelve, identificando implantes microscópicos com biópsia por congelação imediata;</li>
    <li>Realiza <strong>Lavado Peritoneal com Coleta para Análise Citológica Oncológica</strong>: a presença de células neoplásicas malignas no líquido peritoneal (citologia oncogênica positiva) classifica o paciente como <strong>Estádio IV (doença M1)</strong>, poupando o doente de uma laparotomia exploradora desnecessária e mórbida ("laparotomia em branco") e direcionando-o para protocolo de quimioterapia sistêmica.</li>
  </ul>
</div>

<h3>Sistema de Estadiamento TNM (AJCC/UICC 8ª Edição)</h3>
<table class="book-table">
  <thead>
    <tr>
      <th>Categoria T (Tumor Primário)</th>
      <th>Profundidade Histopatológica da Invasão Mural</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>Tis</strong></td>
      <td>Carcinoma in situ / displasia de alto grau intraepitelial sem invasão da lâmina própria.</td>
    </tr>
    <tr>
      <td><strong>T1a</strong></td>
      <td>Tumor invade a <strong>lâmina própria ou muscular da mucosa</strong> (câncer gástrico precoce mucoso).</td>
    </tr>
    <tr>
      <td><strong>T1b</strong></td>
      <td>Tumor invade a camada <strong>submucosa</strong> (câncer gástrico precoce submucoso).</td>
    </tr>
    <tr>
      <td><strong>T2</strong></td>
      <td>Tumor invade a camada <strong>muscular própria</strong>.</td>
    </tr>
    <tr>
      <td><strong>T3</strong></td>
      <td>Tumor invade o tecido conjuntivo <strong>subseroso</strong> sem perfurar o peritônio visceral que reveste a serosa.</td>
    </tr>
    <tr>
      <td><strong>T4a</strong></td>
      <td>Tumor <strong>perfura a serosa visceral (peritônio visceral)</strong>.</td>
    </tr>
    <tr>
      <td><strong>T4b</strong></td>
      <td>Tumor <strong>invade estruturas ou órgãos vizinhos adjacentes</strong> (pâncreas, cólon transverso, fígado, diafragma, baço).</td>
    </tr>
  </tbody>
</table>

<table class="book-table">
  <thead>
    <tr>
      <th>Categoria N (Linfonodos Regionais)</th>
      <th>Número Absoluto de Linfonodos Regionais Comprometidos</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>N0</strong></td>
      <td>Nenhum linfonodo regional metastático.</td>
    </tr>
    <tr>
      <td><strong>N1</strong></td>
      <td>Metástase em <strong>1 a 2 linfonodos</strong> regionais.</td>
    </tr>
    <tr>
      <td><strong>N2</strong></td>
      <td>Metástase em <strong>3 a 6 linfonodos</strong> regionais.</td>
    </tr>
    <tr>
      <td><strong>N3a</strong></td>
      <td>Metástase em <strong>7 a 15 linfonodos</strong> regionais.</td>
    </tr>
    <tr>
      <td><strong>N3b</strong></td>
      <td>Metástase em <strong>16 ou mais linfonodos</strong> regionais.</td>
    </tr>
  </tbody>
</table>
`
  },
  {
    id: 'tratamento-cirurgico-linfadenectomia-d2-e-reconstrucao',
    title: '5. Tratamento Cirúrgico Curativo: Gastrectomia, Linfadenectomia D2 e Reconstrução em Y de Roux',
    body_html: `
<p>O único tratamento com potencial curativo definitivo para o adenocarcinoma gástrico é a ressecção cirúrgica oncológica com margens microscópicas livres (ressecção R0), associada à dissecção sistemática das cadeias linfáticas perigástricas e dos troncos arteriais celíacos (linfadenectomia D2 padronizada pela <em>Japanese Gastric Cancer Association</em> - JGCA).</p>

<h3>1. Definição da Extensão da Gastrectomia: Subtotal versus Total</h3>
<p>A escolha entre gastrectomia subtotal e gastrectomia total é ditada pela <strong>topografia tumoral</strong> e pelo <strong>subtipo histológico de Lauren</strong>, garantindo sempre margens cirúrgicas oncológicas adequadas:</p>
<ul>
  <li><strong>Gastrectomia Subtotal Distal (com preservação do fundo gástrico):</strong>
    <ul>
      <li>Indicada para tumores localizados no <strong>antro gástrico e terço inferior / distal do estômago</strong>;</li>
      <li>Margem proximal de segurança necessária: pelo menos <strong>3 a 5 cm</strong> no tipo Intestinal de Lauren;</li>
      <li><em>Vantagens Fisiológicas:</em> A preservação de cerca de 20% a 30% do coto gástrico proximal proporciona melhor estado nutricional pós-operatório, menor perda ponderal, melhor qualidade de vida e menor taxa de esofagite alcalina de refluxo quando comparada à gastrectomia total, com <strong>exata sobrevida oncológica a longo prazo</strong> comprovada por ensaios randomizados;</li>
    </ul>
  </li>
  <li><strong>Gastrectomia Total:</strong>
    <ul>
      <li>Indicada para tumores localizados no <strong>terço médio (corpo gástrico) e terço proximal / superior (fundo e cárdia)</strong>;</li>
      <li>Indicada obrigatoriamente para o <strong>tipo Difuso de Lauren (linite plástica / células em anel de sinete)</strong>, no qual a infiltração submucosa microscópica requer margem cirúrgica ampla (&gt; 6 a 8 cm), tornando tecnicamente impossível preservar um coto proximal sadio;</li>
      <li>Envolve a ressecção em monobloco de todo o estômago desde o duodeno proximal até 2 cm acima da junção esofagogástrica no esôfago distal, associada à omentectomia total e ressecção da lâmina anterior do mesocólon transverso.</li>
    </ul>
  </li>
</ul>

<h3>2. A Linfadenectomia D2 Padrão-Ouro</h3>
<p>A drenagem linfática gástrica é dividida em 16 estações linfonodais numeradas pela JGCA. A extensão da linfadenectomia classifica-se em:</p>
<ul>
  <li><strong>Linfadenectomia D1:</strong> Ressecção exclusiva dos linfonodos perigástricos contíguos (estações 1 a 6); associada a alta taxa de recidiva locorregional em tumores invasores (&gt;= T2);</li>
  <li><strong>Linfadenectomia D2 (Padrão Mundial Atual):</strong> Engloba a ressecção em monobloco dos <strong>linfonodos perigástricos (estações 1 a 6) PLUS os linfonodos situados ao longo dos troncos vasculares arteriais principais do tronco celíaco (estações 7 a 11 e 12a)</strong>:
    <ul>
      <li>Estação 7: Artéria gástrica esquerda;</li>
      <li>Estação 8a: Artéria hepática comum (ramo anterossuperior);</li>
      <li>Estação 9: Tronco celíaco;</li>
      <li>Estação 10: Hilo esplênico (dissecada na gastrectomia total se tumor de corpo proximal invadindo grande curvatura);</li>
      <li>Estação 11p e 11d: Artéria esplênica proximal e distal;</li>
      <li>Estação 12a: Artéria hepática própria no ligamento hepatoduodenal.</li>
    </ul>
  </li>
  <li><strong>Número Mínimo Obrigatório de Linfonodos Ressecados:</strong> Para um estadiamento patológico fidedigno e controle oncológico pleno, as diretrizes da UICC/AJCC e NCCN exigem a ressecção e análise histopatológica de <strong>NO MÍNIMO 16 LINFONODOS (idealmente entre 25 e 30 linfonodos ou mais)</strong>.</li>
</ul>

<div class="clinical-box warning-box">
  <h4>Esplenectomia de Rotina: Conduta Abolida!</h4>
  <p>Historicamente, a linfadenectomia D2 na gastrectomia total incluía a esplenectomia de rotina (esplenectomia distal com ou sem pancreatectomia caudal) para facilitar a dissecção da estação 10 (hilo esplênico). O ensaio clínico randomizado japonês <strong>JCOG 0110</strong> demonstrou categoricamente que a esplenectomia profilática de rotina NÃO agrega nenhum ganho de sobrevida global e eleva de forma proibitiva a morbidade pós-operatória (fístulas pancreáticas, coleções subfrênicas e complicações infecciosas). A remoção do baço é restrita aos casos com invasão tumoral direta por contiguidade macroscópica.</p>
</div>

<h3>3. Reconstrução do Trânsito Digestivo: O Padrão-Ouro em Y de Roux</h3>
<p>Após a gastrectomia (total ou subtotal), a reconstrução do trânsito com <strong>Alça Jejunal em Y de Roux</strong> é a técnica preferencial mandatória:</p>
<ul>
  <li><strong>Na Gastrectomia Total:</strong> Realiza-se a anastomose esofagojejunal término-lateral (com grampeador circular mecânico nº 25) associada a enteroanastomose jejunojejunal (pé de galinha do Y de Roux) a <strong>50 a 60 cm abaixo da anastomose esofágica</strong>. Esse comprimento da alça alimentar é o comprimento crítico necessário para impedir completamente que as secreções biliares e pancreáticas refluam para o esôfago, prevenindo a temida e incapacitante <strong>esofagite alcalina de refluxo</strong>;</li>
  <li><strong>Na Gastrectomia Subtotal:</strong> Realiza-se a gastrojejunostomia em Y de Roux (ou gastroduodenostomia à Billroth I em casos selecionados no Japão). A clássica reconstrução à Billroth II (gastrojejunostomia em alça) está em desuso oncológico pelo alto índice de gastrite alcalina do coto e risco aumentado de câncer do coto a longo prazo.</li>
</ul>
`
  },
  {
    id: 'quimioterapia-perioperatoria-e-criterios-de-câncer-precoce',
    title: '6. Câncer Gástrico Precoce (Critérios de Ressecção Endoscópica) e Protocolo Quimioterápico FLOT',
    body_html: `
<h3>1. Câncer Gástrico Precoce (Early Gastric Cancer - EGC)</h3>
<p>Define-se estritamente como a neoplasia restrita à mucosa (T1a) ou submucosa (T1b), <strong>independentemente da presença de metástases linfonodais regionais (T1 qualquer N)</strong>. Apresenta taxa de sobrevida em 5 anos superior a 90% a 95% quando tratado adequadamente.</p>

<p>Para lesões muito incipientes, a <strong>Dissecção Endoscópica da Submucosa (ESD - <em>Endoscopic Submucosal Dissection</em>)</strong> proporciona cura oncológica completa sem ressecção cirúrgica gástrica, desde que preenchidos os <strong>Critérios Japoneses Padronizados (Critérios Absolutos e Expandidos)</strong>:</p>

<table class="book-table">
  <thead>
    <tr>
      <th>Categoria de Indicação</th>
      <th>Critérios Histopatológicos Estritos de Elegibilidade para ESD</th>
      <th>Risco de Metástase Linfonodal Estimado</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>Critérios Absolutos Clássicos</strong></td>
      <td>• Adenocarcinoma do tipo <strong>Intestinal bem diferenciado</strong><br>• Confinado estritamente à <strong>mucosa (T1a)</strong><br>• Tamanho da lesão <strong>&lt;= 2 cm</strong><br>• <strong>Sem ulceração ativa</strong> (sem cicatriz de úlcera prévia)<br>• Ausência absoluta de invasão linfovascular microscópica.</td>
      <td>Risco linfonodal virtualmente nulo (&lt; 0,1%). Ressecção endoscópica em monobloco com margens livres é curativa definitiva.</td>
    </tr>
    <tr>
      <td><strong>Critérios Expandidos</strong></td>
      <td>• Tipo Intestinal, T1a (mucoso), <strong>sem úlcera de qualquer tamanho</strong> (&gt; 2 cm); OU<br>• Tipo Intestinal, T1a (mucoso), <strong>ulcerado com tamanho &lt;= 3 cm</strong>; OU<br>• Tipo Intestinal, com <strong>invasão submucosa superficial (T1b SM1: invasão &lt; 500 mcm da muscular da mucosa) e tamanho &lt;= 3 cm</strong>; OU<br>• Tipo <strong>Indiferenciado / Difuso, T1a (mucoso), sem ulceração e tamanho &lt;= 2 cm</strong>.</td>
      <td>Risco linfonodal &lt; 1%. Se a peça pós-ESD demonstrar invasão submucosa &gt; 500 mcm (SM2), margens positivas ou invasão angiolinfática, <strong>a gastrectomia com linfadenectomia D2 cirúrgica de resgate é mandatória</strong>.</td>
    </tr>
  </tbody>
</table>

<h3>2. Terapia Multimodal no Câncer Avançado: O Protocolo Quimioterápico FLOT</h3>
<p>Em pacientes com câncer gástrico avançado locorregionalmente (&gt;= cT2 e/ou cN+), a cirurgia imediata isolada associa-se a elevadas taxas de recidiva sistêmica e sobrevida medíocre. O estudo clássico europeu <strong>FLOT4</strong> (Al-Batran et al.) consolidou a <strong>Quimioterapia Perioperatória com o regime FLOT</strong> como o padrão-ouro de tratamento:</p>
<ul>
  <li><strong>Composição do Esquema FLOT:</strong> Combinação tripla de <strong>5-Fluorouracil (5-FU) + Leucovorina + Oxaliplatina + Docetaxel</strong>;</li>
  <li><strong>Cronograma Perioperatório:</strong> 4 ciclos neoadjuvantes administrados a cada 2 semanas ANTES da cirurgia radical, seguidos da gastrectomia com linfadenectomia D2, seguidos de mais 4 ciclos adjuvantes pós-operatórios;</li>
  <li><strong>Benefícios Comprovados:</strong> A quimioterapia perioperatória induz <em>downstaging</em> tumoral marcante, erradica micrometástases sistêmicas ocultas, eleva as taxas de ressecção R0 para &gt; 85% e proporciona regressão patológica completa (pCR) em cerca de 15% a 20% dos casos, conferindo ganho expressivo e sustentado de sobrevida global em 5 anos.</li>
</ul>
`
  },
  {
    id: 'casos-clinicos-e-questoes-comentadas',
    title: '7. Casos Clínicos Desafiadores e Questões Comentadas de Alto Rendimento',
    body_html: `
<div class="case-study">
  <h4>Caso Clínico 1: Adenocarcinoma de Antro Gástrico e Conduta Cirúrgica</h4>
  <p><strong>História:</strong> Homem de 66 anos, ex-tabagista e hipertenso, procura o serviço de cirurgia com história de epigastralgia em queimação, saciedade precoce e emagrecimento de 6 kg nos últimos 4 meses. Nega hematêmese. Exame físico sem visceromegalias, ausência de linfonodomegalias supraclaviculares ou nódulos umbilicais, toque retal normal.</p>
  <p><strong>Propedêutica Realizada:</strong>
  1. EDA: lesão úlcero-vegetante de 3,5 cm localizada na pequena curvatura do antro gástrico, a 4 cm do piloro, com margens infiltrativas (Bormann III). Biópsias confirmam adenocarcinoma tubular bem diferenciado (Tipo Intestinal de Lauren), HER2 negativo e com estabilidade de microssatélites (MSS).<br>
  2. Ecoendoscopia: lesão invadindo a camada muscular própria (uT2), com dois linfonodos perigástricos aumentados e arredondados na cadeia gástrica direita (uN1).<br>
  3. TC de Tórax, Abdome e Pelve: espessamento parietal antral com linfonodomegalias perigástricas regionais, sem evidência de metástases hepáticas, pulmonares ou ascite.<br>
  4. Laparoscopia de Estadiamento: ausência de implantes peritoneais ou carcinomatose; citologia do lavado peritoneal negativa para células neoplásicas.</p>
  <p><strong>Plano Terapêutico e Conduta Padrão:</strong>
  • Por se tratar de tumor locorregionalmente avançado (cT2 cN1 M0), o paciente é encaminhado para <strong>Quimioterapia Perioperatória no esquema FLOT (4 ciclos pré-operatórios)</strong>.<br>
  • Após reestadiamento demonstrando estabilidade/regressão parcial, o paciente é submetido à cirurgia curativa: <strong>Gastrectomia Subtotal Distal com Linfadenectomia D2 (dissecção das estações 1 a 6 e 7 a 11, ressecando &gt; 16 linfonodos) com margem cirúrgica proximal &gt; 5 cm e reconstrução do trânsito digestivo em Y de Roux</strong>.<br>
  • Evolução pós-operatória favorável, seguindo para os 4 ciclos restantes do protocolo FLOT adjuvante.</p>
</div>

<div class="question-block">
  <h4>Questão de Concurso 1 (USP / Cirurgia Geral)</h4>
  <p>Mulher de 35 anos apresenta história de dor abdominal vaga e perda ponderal de 8 kg em 3 meses. Realiza endoscopia digestiva alta que demonstra estômago com pregas espessadas, inelástico e com ausência de distensibilidade à insuflação gasosa, com mucosa eritematosa difusa sem úlceras isoladas nítidas (aspecto compatível com linite plástica / Bormann IV). As biópsias revelaram proliferação difusa de células neoplásicas isoladas com volumoso vacúolo citoplasmático de mucina rechaçando o núcleo (células em anel de sinete). Em relação a este caso clínico e ao subtipo histológico de Lauren, assinale a assertiva correta:</p>
  <p>A) Trata-se do subtipo intestinal de Lauren, que cursa comumente com mutações no gene KRAS e excelente resposta à quimioterapia neoadjuvante isolada.<br>
  B) O tumor corresponde ao subtipo difuso de Lauren, intimamente associado a alterações funcionais na molécula de adesão celular E-caderina (gene CDH1), caracterizado por alta agressividade biológica e disseminação preferencial por via peritoneal.<br>
  C) A cirurgia indicada para este caso é a gastrectomia subtotal com margem de segurança de 2 cm e linfadenectomia restrita D1 para evitar complicações.<br>
  D) A laparoscopia de estadiamento é dispensável neste cenário, pois a tomografia com contraste exclui fidedignamente implantes peritoneais microscópicos.<br>
  E) A presença de células em anel de sinete restritas ao estômago exclui a possibilidade de acometimento ovariano secundário (tumor de Krukenberg).</p>
  <p><strong>Gabarito Comentado:</strong> <strong>Alternativa B</strong>. O aspecto em linite plástica com células em anel de sinete é patognomônico do <strong>subtipo difuso de Lauren</strong>, associado à perda da E-caderina (gene <em>CDH1</em>), com acometimento frequente de pacientes jovens e mulheres e grande propensão à carcinomatose peritoneal e tumor de Krukenberg (elimina A, E). Exige gastrectomia total com margens amplas (&gt; 6-8 cm) e linfadenectomia D2 (elimina C). A laparoscopia de estadiamento é mandatória em tumores difusos/Bormann IV para avaliar carcinomatose e citologia peritoneal oculta (elimina D).</p>
</div>

<div class="question-block">
  <h4>Questão de Concurso 2 (ENARE / Cirurgia Oncológica)</h4>
  <p>No planejamento cirúrgico oncológico de um adenocarcinoma gástrico distal (terço inferior / antro) moderadamente diferenciado (tipo intestinal de Lauren), cT3 cN1 M0, assinale a opção que descreve a conduta cirúrgica e técnica de ressecção ganglionar recomendada pelas diretrizes internacionais:</p>
  <p>A) Gastrectomia em cunha local por videolaparoscopia sem linfadenectomia, mantendo IBP contínuo no pós-operatório.<br>
  B) Gastrectomia subtotal com linfadenectomia D2 englobando cadeias perigástricas e dos ramos do tronco celíaco com remoção de no mínimo 16 linfonodos, reconstrução em Y de Roux e preservação esplênica.<br>
  C) Gastrectomia total associada obrigatoriamente a esplenectomia e pancreatectomia caudal de rotina em todos os casos para garantir ressecção da cadeia 10.<br>
  D) Gastrectomia proximal com anastomose esofagogástrica direta à Billroth I sem dissecção linfonodal do tronco celíaco.<br>
  E) Esofagogastrectomia trans-hiatal com dissecção restrita às estações linfonodais 1 e 2.</p>
  <p><strong>Gabarito Comentado:</strong> <strong>Alternativa B</strong>. Para adenocarcinoma de antro gástrico (tipo intestinal), a <strong>gastrectomia subtotal com linfadenectomia D2 (com pelo menos 16 a 25 linfonodos)</strong> e reconstrução em Y de Roux oferece sobrevida idêntica à gastrectomia total, com melhor preservação nutricional (elimina C, D). A esplenectomia profilática de rotina foi abolida pelo estudo JCOG 0110 por elevar a morbidade sem benefício oncológico (elimina C). Ressecção local é erro crasso oncológico para lesões T3N1 (elimina A).</p>
</div>

<div class="question-block">
  <h4>Questão de Concurso 3 (UNICAMP / Cirurgia Geral)</h4>
  <p>Durante a avaliação física de uma paciente de 54 anos com perda ponderal progressiva e vômitos frequentes, constata-se a presença de massa nodular indolor e endurecida na região supraclavicular esquerda e outro nódulo pigmentado e infiltrativo na cicatriz umbilical. Esses achados semióticos correspondem, respectivamente, a:</p>
  <p>A) Nódulo de Irish e Nódulo da Irmã Maria José.<br>
  B) Gânglio de Virchow e Prateleira de Blumer.<br>
  C) Gânglio de Virchow e Nódulo da Irmã Maria José.<br>
  D) Gânglio de Irish e Tumor de Krukenberg.<br>
  E) Prateleira de Blumer e Nódulo de Irish.</p>
  <p><strong>Gabarito Comentado:</strong> <strong>Alternativa C</strong>. A linfonodomegalia supraclavicular esquerda por metástase de adenocarcinoma gástrico é o clássico <strong>Gânglio de Virchow (Sinal de Troisier)</strong>, decorrente da drenagem pelo ducto torácico. O implante tumoral metastático umbilical é denominado <strong>Nódulo da Irmã Maria José</strong>. Nódulo de Irish situa-se na axila esquerda; Prateleira de Blumer situa-se no fundo de saco peritoneal palpável ao toque retal; Tumor de Krukenberg é a metástase ovariana.</p>
</div>
`
  },
  {
    id: 'sintese-pratica-e-referencias',
    title: '8. Síntese Prática, Fluxograma Decisório e Referências Bibliográficas',
    body_html: `
<div class="summary-box">
  <h4>Guia de Conduta Rápida no Câncer Gástrico</h4>
  <ul>
    <li><strong>Epidemiologia e Fatores de Risco:</strong> <em>H. pylori</em> (principal fator Grupo 1, CagA), sal, nitratos, defumados, gastrite atrófica/metaplasia intestinal, anemia perniciosa, tabagismo e EBV.</li>
    <li><strong>Classificação de Lauren:</strong>
      <ul>
        <li><em>Intestinal:</em> Idosos, homens, antro/distal, bem diferenciado/tubular, ambiental/H. pylori, disseminação hematogênica (fígado), margem 3-5 cm.</li>
        <li><em>Difuso:</em> Jovens, mulheres, corpo/fundo, indiferenciado/células em anel de sinete, perda de E-caderina (gene <em>CDH1</em>), disseminação peritoneal precoce, pior prognóstico, margem 6-8 cm (ou total).</li>
      </ul>
    </li>
    <li><strong>Classificação de Bormann (Avançado):</strong> I (polipoide), II (ulcerado de bordas nítidas), III (ulceroinfiltrativo - mais comum), IV (infiltrativo difuso / linite plástica - pior prognóstico).</li>
    <li><strong>Sinais de Metástase à Distância (M1):</strong> Virchow (supraclavicular esquerdo), Irish (axilar esquerdo), Irmã Maria José (umbigo), Prateleira de Blumer (fundo de saco ao toque retal), Tumor de Krukenberg (ovário bilateral).</li>
    <li><strong>Estadiamento:</strong> EDA com biópsias + TC tórax/abdome/pelve + Ecoendoscopia (T e N) + <strong>Laparoscopia de Estadiamento com Citologia Peritoneal</strong> (obrigatória em &gt;= T2, N+ ou difuso).</li>
    <li><strong>Tratamento Cirúrgico:</strong>
      <ul>
        <li>Antro/terço inferior = Gastrectomia Subtotal; Corpo/cárdia ou Difuso/Linite = Gastrectomia Total.</li>
        <li><strong>Linfadenectomia D2 obrigatória</strong> (mínimo de 16 linfonodos ressecados; padrão 25 a 30). Esplenectomia de rotina PROSCRITA (estudo JCOG 0110).</li>
        <li>Reconstrução em <strong>Y de Roux com alça de 50-60 cm</strong> para evitar esofagite alcalina.</li>
      </ul>
    </li>
    <li><strong>Quimioterapia Perioperatória:</strong> Protocolo <strong>FLOT</strong> (5-FU, Leucovorina, Oxaliplatina, Docetaxel) - 4 ciclos neoadjuvantes + cirurgia + 4 ciclos adjuvantes para tumores &gt;= cT2 ou N+.</li>
    <li><strong>Câncer Precoce (T1a/T1b):</strong> Elegível para ESD se preencher critérios japoneses (T1a intestinal sem úlcera &lt;= 2 cm para critérios absolutos).</li>
  </ul>
</div>

<h3>Referências Bibliográficas Fundamentais</h3>
<ol>
  <li>Japanese Gastric Cancer Association. Japanese Gastric Cancer Treatment Guidelines 2021 (6th edition). <em>Gastric Cancer</em>. 2023;26(1):1-25.</li>
  <li>Al-Batran SE, Homann N, Pauligk C, et al. Perioperative chemotherapy with fluorouracil plus leucovorin, oxaliplatin, and docetaxel versus fluorouracil or capecitabine plus cisplatin and epirubicin for locally advanced, resectable gastric or gastro-oesophageal junction adenocarcinoma (FLOT4): a randomised, phase 2/3 trial. <em>The Lancet</em>. 2019;393(10184):1948-1957.</li>
  <li>Sano T, Sasako M, Mizusawa J, et al. Randomized controlled trial to evaluate splenectomy in total gastrectomy for proximal gastric carcinoma (JCOG0110). <em>Ann Surg</em>. 2017;265(2):277-283.</li>
  <li>Blair VR, McLeod M, Carneiro F, et al. Hereditary diffuse gastric cancer: updated clinical practice guidelines. <em>Lancet Oncol</em>. 2020;21(8):e386-e397.</li>
  <li>Lordick F, Carneiro F, Cascinu S, et al. Gastric cancer: ESMO Clinical Practice Guideline for diagnosis, treatment and follow-up. <em>Ann Oncol</em>. 2022;33(10):1005-1020.</li>
</ol>
`
  }
];

const finalSections = [
  baseSections[0],
  baseSections[1],
  secCancerGastricoExpansao[0],
  baseSections[2],
  baseSections[3],
  secCancerGastricoExpansao2[0],
  baseSections[4],
  secCancerGastricoExpansao[1],
  secCancerGastricoExpansao3[0],
  secCancerGastricoExpansao2[1],
  secCancerGastricoExpansao4[0],
  baseSections[5],
  secCancerGastricoExpansao[2],
  secCancerGastricoExpansao4[1],
  secCancerGastricoExpansao5[0],
  baseSections[6],
  secCancerGastricoExpansao2[2],
  secCancerGastricoExpansao3[1],
  baseSections[7]
];

const bookData = {
  slug,
  title: 'Câncer Gástrico: Diagnóstico, Estadiamento e Cirurgia Oncológica',
  subtitle: 'Epidemiologia, classificações de Lauren e Bormann, linfadenectomia D2, reconstrução em Y de Roux, metástases e protocolo FLOT',
  area: 'Cirurgia Geral',
  materia: 'Cirurgia Oncológica do Trato Digestivo Alto',
  sections: finalSections
};

saveBook(slug, bookData);

const indexPath = path.join(process.cwd(), 'apostilas', slug, 'index.html');
const html = fs.readFileSync(indexPath, 'utf-8');
const chars = countUsefulChars(html);
console.log(`[AULA 147 - SUCESSO] ${slug} compilado: ${chars} caracteres úteis.`);
