// scripts/bloco07_group_a/generate-cancer-colorretal.mjs
import { saveBook, countUsefulChars } from '../bloco-07-utils.mjs';
import { secCancerColorretalExpansao } from './cancer-colorretal-expansao.mjs';
import { secCancerColorretalExpansao2 } from './cancer-colorretal-expansao2.mjs';
import { secCancerColorretalExpansao3 } from './cancer-colorretal-expansao3.mjs';
import { secCancerColorretalExpansao4 } from './cancer-colorretal-expansao4.mjs';
import fs from 'fs';
import path from 'path';

const slug = 'cancer-colorretal';

const baseSections = [
  {
    id: 'introducao-epidemiologia-e-rastreamento',
    title: '1. Introdução, Epidemiologia Global e Diretrizes de Rastreamento Populacional',
    body_html: `
<p>O Câncer Colorretal (CCR) compreende as neoplasias malignas que acometem o intestino grosso, englobando o cólon (ceco, ascendente, transverso, descendente e sigmoide) e o reto. Representa a terceira neoplasia maligna mais frequentemente diagnosticada em ambos os sexos e a segunda causa de morte relacionada ao câncer no mundo ocidental, com quase 2 milhões de novos casos e cerca de 1 milhão de mortes anuais. No Brasil, o Instituto Nacional de Câncer (INCA) estima aproximadamente 45.000 novos casos anuais, ocupando a segunda posição em incidência tanto em homens (atrás apenas do câncer de próstata) quanto em mulheres (atrás do câncer de mama), com elevadíssima concentração nas regiões Sul e Sudeste.</p>

<h3>Diretrizes Contemporâneas de Rastreamento (Screening) na População de Risco Habitual</h3>
<p>O rastreamento do câncer colorretal é um dos mais eficazes e custo-efetivos de toda a oncologia, pois permite não apenas o diagnóstico precoce de carcinomas incipientes, mas a <strong>prevenção primária real através da ressecção endoscópica de pólipos adenomatosos e lesões pré-malignas precursoras</strong>.</p>

<table class="book-table">
  <thead>
    <tr>
      <th>População / Categoria de Risco</th>
      <th>Idade de Início do Rastreamento</th>
      <th>Métodos de Rastreamento Aceitos e Intervalos</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>Risco Habitual (Média da População Geral)</strong></td>
      <td><strong>45 anos</strong> (diretriz global atualizada pela <em>American Cancer Society</em> e USPSTF, reduzindo a idade inicial clássica de 50 para 45 anos devido ao aumento alarmante de CCR em adultos jovens &lt; 50 anos). Mantido até os 75 anos (entre 76 e 85 anos, decisão individualizada).</td>
      <td>• <strong>Colonoscopia Completa a cada 10 anos (Método Padrão-Ouro / Preferencial)</strong>: avalia todo o cólon e íleo terminal com capacidade diagnóstica e terapêutica imediata (polipectomia).<br>• <strong>Pesquisa de Sangue Oculto nas Fezes por Imunoquímica (FIT) anual</strong> (teste quantitativo de anticorpos humanos específicos para globina, não exigindo restrição alimentar de carnes ou ferro). Se o FIT for positivo, <strong>a colonoscopia diagnóstica imediata é mandatória</strong>.<br>• <em>Alternativas:</em> Retossigmoidoscopia flexível a cada 5 anos; Teste de DNA fecal multialvo associado a FIT (sDNA-FIT / Cologuard) a cada 3 anos; Colonografia por Tomografia Computadorizada (Colonoscopia Virtual) a cada 5 anos.</td>
    </tr>
    <tr>
      <td><strong>Histórico Familiar de CCR em Parente de 1º Grau</strong></td>
      <td>• Se parente de 1º grau com CCR antes dos 60 anos, ou dois parentes de 1º grau em qualquer idade: <strong>Iniciar aos 40 anos OU 10 anos antes da idade do diagnóstico do familiar mais jovem</strong> (o que ocorrer primeiro).</td>
      <td><strong>Colonoscopia a cada 5 anos</strong> (métodos fecais não são indicados nesta população de alto risco familiar).</td>
    </tr>
    <tr>
      <td><strong>Portadores de Doença Inflamatória Intestinal (RCU ou Crohn Colônico)</strong></td>
      <td><strong>8 a 10 anos após o início dos sintomas</strong> (ou <strong>IMEDIATO se coexistir Colangite Esclerosante Primária - CEP</strong>).</td>
      <td>Colonoscopia com cromoendoscopia e biópsias a cada 1 a 2 anos (ou anual vitalícia na presença de CEP).</td>
    </tr>
  </tbody>
</table>
`
  },
  {
    id: 'carcinogenese-molecular-duas-vias-principais',
    title: '2. Carcinogênese Molecular: A Via Clássica do Adenoma-Carcinoma versus Via da Instabilidade de Microssatélites (MMR)',
    body_html: `
<p>O desenvolvimento do câncer colorretal não é um evento estocástico repentino, mas uma marcha progressiva de acúmulo sequencial de aberrações genéticas e epigenéticas que transformam o epitélio colônico normal em adenoma benigno, adenoma com displasia de alto grau e, finalmente, adenocarcinoma invasor ao longo de 10 a 15 anos. Essa carcinogênese opera por <strong>duas vias moleculares fundamentais</strong>:</p>

<h3>1. Via Clássica do Adenoma-Carcinoma (Via da Instabilidade Cromossômica - CIN / Supressão Gênica de Fearon e Vogelstein)</h3>
<p>Responsável por <strong>80% a 85% de todos os casos de CCR esporádicos</strong>. Caracteriza-se pelo acúmulo ordenado e sequencial de mutações e perdas alélicas em genes supressores de tumor e proto-oncogenes:</p>
<ol>
  <li><strong>Passo 1 — Mutação Inicial no Gene APC (Cromossomo 5q21):</strong> O gene <em>Adenomatous Polyposis Coli</em> (APC) é o "porteiro" (<em>gatekeeper</em>) da proliferação celular da cripta colônica. Em condições normais, a proteína APC forma um complexo de destruição que fosforila e degrada a <strong>beta-catenina citoplasmática</strong>. A mutação inativadora bialélica do APC impede a degradação da beta-catenina, que se acumula no citosol, transloca-se para o núcleo e ativa a transcrição contínua dos fatores TCF/LEF, estimulando oncogenes como <em>c-MYC</em> e <em>Ciclina D1</em>. Isso gera a <strong>cripta aberrante inicial e o adenoma precoce</strong>;</li>
  <li><strong>Passo 2 — Mutação no Proto-Oncogene KRAS (Cromossomo 12p12):</strong> Ocorre em cerca de 40% a 50% dos adenomas intermediários. O gene KRAS codifica uma proteína G pequena transdutora de sinal intracelular (via MAPK/ERK). Mutações nos códons 12, 13 ou 61 mantêm o KRAS constitutivamente ligado ao GTP (ativo), estimulando proliferação celular autônoma descontrolada e crescimento tumoral volumoso do adenoma;</li>
  <li><strong>Passo 3 — Perda Alélica no Cromossomo 18q (Gene SMAD4 / DCC):</strong> A inativação de <em>SMAD4</em> interrompe a via inibitória de crescimento mediada pelo TGF-beta, propiciando a transição de adenoma intermediário para adenoma avançado com displasia de alto grau;</li>
  <li><strong>Passo 4 — Mutação Inativadora no Gene Supressor TP53 (Cromossomo 17p13):</strong> O "guardião do genoma". A perda da proteína p53 funcional anula a capacidade da célula de interromper o ciclo celular em G1 para reparo de DNA e bloqueia a apoptose programada. Ocorre a <strong>invasão através da muscular da mucosa, transformando o adenoma em adenocarcinoma invasor definitivo</strong> com potencial angiogênico e metastático.</li>
</ol>

<h3>2. Via da Instabilidade de Microssatélites (MSI / Deficiência do Sistema de Reparo - dMMR)</h3>
<p>Responsável por <strong>15% a 20% dos casos de CCR</strong> (englobando a Síndrome de Lynch hereditária e os tumores esporádicos com hipermetilação):</p>
<ul>
  <li><strong>Mecanismo Molecular do Sistema MMR (<em>Mismatch Repair</em>):</strong> As enzimas de reparo do DNA (codificadas pelos genes <strong>MLH1, MSH2, MSH6 e PMS2</strong>) atuam como revisoras de prova que detectam e corrigem erros de pareamento de bases nitrogenadas e pequenas inserções ou deleções geradas pela DNA polimerase durante a replicação celular, particularmente em sequências repetitivas simples do genoma denominadas <strong>microssatélites</strong>;</li>
  <li><strong>Consequência da Perda de MMR:</strong> A deficiência de reparo provoca o acúmulo de centenas a milhares de mutações ao longo do DNA (instabilidade de microssatélites de alto grau - <strong>MSI-H</strong>). Isso gera uma hipermutação fenotípica (<em>hypermutated tumor</em>) com síntese de uma carga massiva de <strong>neoantígenos peptídicos estranhos</strong>;</li>
  <li><strong>Via Serrilhada / Fenótipo Metilador de Ilhas CpG (CIMP):</strong> Na via esporádica (responsável por 80% dos tumores MSI-H), a inativação do sistema decorre da <strong>hipermetilação epigenética aberrante do promotor do gene MLH1</strong>, intimamente associada à <strong>mutação ativadora no gene BRAF (V600E)</strong>, originando-se a partir de <strong>pólipos sésseis serrilhados</strong> no cólon direito;</li>
  <li><strong>Características Clínicas dos Tumores MSI-H:</strong> Predomínio no <strong>cólon direito</strong>, histologia com carcinoma mucinoso ou células em anel de sinete, <strong>infiltrado linfocítico intratumoral denso exuberante (células inflamatórias semelhantes a Crohn)</strong>, melhor prognóstico em estádios precoces e <strong>resposta extraordinária aos inibidores de checkpoint imune anti-PD-1 (Pembrolizumabe / Nivolumabe)</strong>.</li>
</ul>
`
  },
  {
    id: 'polipos-colorretais-classificacao-e-potencial-maligno',
    title: '3. Morfologia dos Pólipos Colorretais: Adenomas Tubulares, Vilosos e Pólipos Sésseis Serrilhados',
    body_html: `
<p>Pólipo define-se macroscopicamente como qualquer massa circunscrita de tecido que se projeta da superfície da mucosa para o interior da luz intestinal. A correta classificação histológica e morfológica é a base para a prevenção do câncer colorretal e estratificação dos intervalos de colonoscopia.</p>

<table class="book-table">
  <thead>
    <tr>
      <th>Tipo Histológico de Pólipo</th>
      <th>Arquitetura Microscópica / Histopatológica</th>
      <th>Potencial de Degeneração Maligna</th>
      <th>Características Clínicas e Endoscópicas</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>Adenoma Tubular</strong></td>
      <td>Glândulas tubulares ramificadas compactadas revestidas por epitélio displásico cilíndrico, com pelo menos 75% a 80% do componente tubular.</td>
      <td><strong>Potencial maligno baixo a moderado</strong> (~5% de risco de adenocarcinoma se &lt; 1 cm).</td>
      <td><strong>É o pólipo neoplásico MAIS COMUM (representa 70% a 80% de todos os adenomas)</strong>. Frequentemente pedunculado (com haste fibrovascular) e &lt; 1 cm.</td>
    </tr>
    <tr>
      <td><strong>Adenoma Viloso</strong></td>
      <td>Projeções digitiformes longas, delgadas e papilares (semelhantes a vilosidades do intestino delgado) que constituem pelo menos 75% a 80% da massa tumoral.</td>
      <td><strong>ALTÍSSIMO potencial de malignização (risco de 30% a 50% de conter adenocarcinoma invasor!)</strong>.</td>
      <td>Menos comum (5% a 10%), habitualmente <strong>séssil (sem pedículo, base larga)</strong>, volumoso (&gt; 2 cm) e localizado no <strong>reto e sigmoide</strong>. Pode produzir grandes quantidades de muco rico em potássio, causando diarreia mucorreica volumosa com hipocalemia severa (<strong>Síndrome de McKittrick-Wheelock</strong>).</td>
    </tr>
    <tr>
      <td><strong>Adenoma Tubuloviloso</strong></td>
      <td>Arquitetura mista contendo entre 25% e 75% de componente viloso entremeado por glândulas tubulares.</td>
      <td>Potencial maligno intermediário (cerca de 15% a 25%).</td>
      <td>Comportamento e risco proporcionais à porcentagem de componente viloso e tamanho total.</td>
    </tr>
    <tr>
      <td><strong>Pólipo Séssil Serrilhado (SSP / SSL)</strong></td>
      <td>Criptas basais dilatadas horizontalmente em formato de "T" ou "L" (aspecto em bota ou âncora), com serrilhamento que atinge a profundidade da base da cripta. Ausência de displasia citológica convencional típica nas fases iniciais.</td>
      <td><strong>Elevado potencial oncogênico</strong> através da <strong>Via Serrilhada / CIMP / Mutação BRAF V600E</strong>, progredindo rapidamente para adenocarcinoma com instabilidade de microssatélites (MSI-H).</td>
      <td>Lesões planas ou sésseis rasas, recobertas por muco aderente com bordas indistintas, localizadas predominantemente no <strong>CÓLON DIREITO (ceco e ascendente)</strong>. Frequentemente negligenciadas em colonoscopias rápidas ou mal preparadas.</td>
    </tr>
    <tr>
      <td><strong>Pólipo Hiperplásico</strong></td>
      <td>Serrilhamento restrito ao terço superior / superficial da cripta; base das criptas estreita e arquitetura normal, sem atipias citológicas.</td>
      <td><strong>Lesão puramente BENIGNA, SEM potencial maligno</strong> intrínseco.</td>
      <td>Comum no <strong>reto e sigmoide distal</strong>, habitualmente diminutos (&lt; 5 mm), com coloração semelhante à mucosa adjacente normal.</td>
    </tr>
  </tbody>
</table>

<div class="clinical-box info-box">
  <h4>Conceito de Adenoma Avançado e Vigilância Pós-Polipectomia</h4>
  <p>Define-se como <strong>Adenoma Avançado</strong> a presença de qualquer um dos seguintes critérios: <strong>Tamanho &gt;= 10 mm (1 cm)</strong> OU <strong>Componente viloso presente (&gt; 25%)</strong> OU <strong>Displasia de alto grau</strong>. Pacientes com 1 a 2 adenomas tubulares pequenos (&lt; 10 mm) com displasia de baixo grau repetem colonoscopia em <strong>7 a 10 anos</strong>; pacientes com adenoma avançado ou &gt;= 3 adenomas repetem em <strong>3 anos</strong>; pacientes com &gt; 10 adenomas na mesma colonoscopia repetem em <strong>1 ano</strong> e devem ser investigados para síndromes de polipose hereditária.</p>
</div>
`
  },
  {
    id: 'sindromes-hereditarias-paf-e-lynch',
    title: '4. Síndromes Hereditárias de Câncer Colorretal: Polipose Adenomatosa Familiar (PAF) e Síndrome de Lynch (HNPCC)',
    body_html: `
<p>Cerca de 5% a 10% de todos os cânceres colorretais originam-se no contexto de síndromes hereditárias autossômicas dominantes bem caracterizadas por mutações germinativas monogênicas.</p>

<h3>1. Polipose Adenomatosa Familiar (PAF Clássica e Atenuada)</h3>
<p>A PAF é uma doença hereditária autossômica dominante de penetrância completa (100%) decorrente de mutação germinativa inativadora heterozigota no gene <strong>APC</strong> no cromossomo 5q21:</p>
<ul>
  <li><strong>Quadro Fenotípico Clássico:</strong> Desenvolvimento de <strong>centenas a milhares (&gt; 100 a milhares) de adenomas colorretais</strong> disseminados por todo o cólon e reto a partir da segunda década de vida (adolescência e início da idade adulta);</li>
  <li><strong>Risco Neoplásico:</strong> <strong>100% de risco cumulativo de câncer colorretal até os 40 a 50 anos de idade</strong> se o cólon não for removido cirurgicamente profilaticamente;</li>
  <li><strong>Variantes Clínicas Clássicas:</strong>
    <ul>
      <li><em>Síndrome de Gardner:</em> Tríade composta por PAF + <strong>Osteomas benignos</strong> (mandíbula, crânio) + <strong>Tumores desmoides</strong> (fibromatose mesentérica/abdominal agressiva mutilante) + Dentes supranumerários inclusos e cistos epidermoides de pele;</li>
      <li><em>Síndrome de Turcot Tipo 2:</em> Associação de PAF com <strong>Meduloblastoma</strong> do sistema nervoso central (enquanto a Síndrome de Turcot Tipo 1 associa Glioblastoma Multiforme à Síndrome de Lynch);</li>
    </ul>
  </li>
  <li><strong>Rastreamento:</strong> Retossigmoidoscopia ou colonoscopia anual a partir dos <strong>10 a 12 anos de idade</strong>;</li>
  <li><strong>Conduta Cirúrgica Curativa Profilática:</strong>
    <ul>
      <li><strong>Proctocolectomia Total com Bolsa Ileal em J e Anastomose Íleo-Anal (IPAA):</strong> Procedimento de escolha padrão se houver envolvimento retal denso (&gt; 20-30 pólipos retais) ou displasia de alto grau no reto;</li>
      <li><strong>Colectomia Total com Anastomose Íleo-Retal (IRA):</strong> Opção para pacientes jovens com reto praticamente poupado (&lt; 10-20 pólipos facilmente removíveis por polipectomia endoscópica), exigindo retoscopia de vigilância do reto residual a cada 6 meses por toda a vida.</li>
    </ul>
  </li>
</ul>

<h3>2. Síndrome de Lynch (Câncer Colorretal Hereditário Não Polipose - HNPCC)</h3>
<p>A Síndrome de Lynch é a causa mais frequente de câncer colorretal hereditário (responsável por 3% a 5% de todos os CCRs), causada por mutação germinativa em um dos genes do sistema de reparo de DNA: <strong>MLH1, MSH2 (juntos responsáveis por &gt; 80%-90% dos casos), MSH6, PMS2 ou deleção no gene EPCAM</strong> (que silencia o promotor de MSH2 por hipermetilação epigenética):</p>
<ul>
  <li><strong>Comportamento Oncológico:</strong> Caracteriza-se por <strong>CCR de início precoce (idade média de 40 a 45 anos)</strong>, com nítido <strong>predomínio no cólon direito / proximal (&gt; 70%)</strong>, pólipos raros ou isolados com rápida e acelerada progressão de adenoma para carcinoma (2 a 3 anos em vez dos 10 anos habituais), e alta taxa de <strong>tumores metacrônicos e sincrônicos</strong> (risco de 30% de novo CCR em 10 anos);</li>
  <li><strong>Tumores Extraintestinais do Espectro de Lynch:</strong> O tumor extraintestinal mais frequente na mulher com Lynch é o <strong>Câncer de Endométrio</strong> (risco cumulativo de 40% a 60%, superando o próprio risco de CCR em portadoras de mutação MSH6!), seguido de <strong>Câncer de Ovário</strong> (10%-12%), tumores do trato urinário urotelial (pelve renal e ureter), adenocarcinoma gástrico, intestino delgado (duodeno/jejuno), árvore biliar e glioblastoma multiforme;</li>
  <li><strong>Critérios Clínicos Consagrados de Triagem:</strong>
    <ul>
      <li><strong>Critérios de Amsterdam II (Regra do 3-2-1-0):</strong> Pelo menos <strong>3 familiares</strong> com câncer associado ao espectro de Lynch (um sendo parente de 1º grau dos outros dois); acometimento de pelo menos <strong>2 gerações sucessivas</strong>; pelo menos <strong>1 caso diagnosticado antes dos 50 anos</strong>; e <strong>0 casos de PAF</strong> excluídos;</li>
      <li><strong>Critérios de Bethesda Revisados:</strong> Selecionam tumores para teste de instabilidade de microssatélites (MSI) e imuno-histoquímica de MMR. Incluem qualquer indivíduo com CCR diagnosticado antes dos 50 anos, tumores sincrônicos/metacrônicos ou histologia típica com linfócitos intratumorais densos em &lt; 60 anos;</li>
    </ul>
  </li>
  <li><strong>Rastreamento e Cirurgia Oncológica:</strong> Colonoscopia a cada <strong>1 a 2 anos iniciando aos 20 a 25 anos</strong> (ou 2 a 5 anos antes do caso mais jovem na família). Diante de CCR diagnosticado, a cirurgia recomendada pelas diretrizes mundiais é a <strong>Colectomia Total com Anastomose Íleo-Retal</strong> (em vez de hemicolectomia segmentar) para prevenir o risco proibitivo de tumores metacrônicos subsequentes no cólon remanescente, mantendo vigilância anual do reto. Em mulheres que completaram prole (&gt; 40-45 anos), indica-se histerectomia com salpingo-ooforectomia profilática redutora de risco concomitante.</li>
</ul>
`
  },
  {
    id: 'quadro-clinico-direito-versus-esquerdo-e-estadiamento',
    title: '5. Quadro Clínico: Cólon Direito versus Cólon Esquerdo, Estadiamento e o Papel do CEA',
    body_html: `
<p>O quadro clínico do adenocarcinoma colorretal varia drasticamente em função da topografia anatômica da lesão primária, refletindo as diferenças no diâmetro do lúmen intestinal, consistência do bolo fecal e biologia tumoral.</p>

<h3>Diferenças Clínicas: Cólon Direito versus Cólon Esquerdo e Reto</h3>
<table class="book-table">
  <thead>
    <tr>
      <th>Parâmetro Semiológico</th>
      <th>Cólon Direito (Ceco e Ascendente)</th>
      <th>Cólon Esquerdo (Descendente e Sigmoide)</th>
      <th>Reto (Médio e Inferior)</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>Características Anatômicas Locais</strong></td>
      <td>Lúmen colônico amplo e complacente; conteúdo fecal <strong>líquido a semilíquido</strong>; tumores morfologicamente polipoides, vegetantes e ulcerados friáveis.</td>
      <td>Lúmen estreito e inelástico; conteúdo fecal <strong>sólido e moldado</strong>; tumores morfologicamente <strong>estenosantes, anulares circunferenciais ("em mordida de maçã")</strong>.</td>
      <td>Ampola retal expansível delimitada pelo assoalho pélvico e esfíncteres anais.</td>
    </tr>
    <tr>
      <td><strong>Sintoma Clínico Dominante</strong></td>
      <td><strong>Sangramento Oculto Crônico e Anemia Ferropriva Inexplicável:</strong> Fadiga, astenia, palidez cutânea, perda de peso insidiosa e massa palpável indolor na fossa ilíaca direita. Raramente obstrui.</td>
      <td><strong>Alteração do Hábito Intestinal e Obstrução Mecânica:</strong> Constipação progressiva alternada com diarreia falsa de escape, dor abdominal em cólica, distensão gasosa e <strong>fezes em fita (fezes afiladas de pequeno calibre)</strong>. Principal causa de obstrução colônica aguda.</td>
      <td><strong>Síndrome Retal Típica:</strong> <strong>Hematoquezia / Retorragia</strong> (sangue vivo rutilante misturado ou recobrindo as fezes), <strong>Tenesmo retal</strong> contínuo, sensação de evacuação incompleta dolorosa e urgência evacuatória.</td>
    </tr>
  </tbody>
</table>

<div class="clinical-box warning-box">
  <h4>Regra de Ouro Semiológica para Concursos e Pronto-Socorro</h4>
  <p><strong>Todo paciente idoso (&gt; 50 anos) com ANEMIA FERROPRIVA DE INÍCIO RECENTE SEM CAUSA APARENTE tem CÂNCER DE CÓLON DIREITO até que se prove o contrário por colonoscopia completa!</strong> NUNCA atribuir sangramento digestivo baixo à doença hemorroidária em indivíduos &gt; 45-50 anos sem realizar colonoscopia prévia.</p>
</div>

<h3>Estadiamento Locorregional e Sistêmico</h3>
<ol>
  <li><strong>Colonoscopia Completa com Biópsia:</strong> Confirmação anatomopatológica e avaliação de tumores sincrônicos (presentes em 3% a 5% dos pacientes no momento do diagnóstico). Se houver tumor estenosante intransponível, a colonoscopia virtual por TC ou nova colonoscopia precoce pós-operatória é mandatória;</li>
  <li><strong>Tomografia Computadorizada de Tórax, Abdome e Pelve com Contraste:</strong> Estadiamento sistêmico obrigatório para pesquisa de metástases hepáticas viscerais (principal sítio hematogênico devido à drenagem portal mesentérica), metástases pulmonares e linfonodomegalias retroperitoneais;</li>
  <li><strong>Estadiamento Específico do Câncer de Reto:</strong> A TC é insuficiente para o reto. É <strong>MANDATÓRIO realizar Ressonância Magnética de Alta Resolução da Pelve (ou Ecoendoscopia Retal tridimensional)</strong> para avaliar três parâmetros anatômicos cruciais:
    <ul>
      <li>Profundidade da invasão na gordura mesorretal (estádio T);</li>
      <li>Comprometimento dos linfonodos mesorretais (estádio N);</li>
      <li>Relação milimétrica do tumor com a <strong>Fáscia Mesorretal / Margem de Ressecção Circunferencial (CRM)</strong> e invasão venosa extramural (EMVI).</li>
    </ul>
  </li>
</ol>

<h3>O Papel do Antígeno Carcinoembrionário (CEA)</h3>
<p>O CEA é uma glicoproteína oncofetal amplamente utilizada na prática clínica:</p>
<ul>
  <li><strong>O CEA NÃO SERVE PARA DIAGNÓSTICO NEM PARA RASTREAMENTO POPULACIONAL</strong>, devido à baixa sensibilidade em lesões iniciais e falsos-positivos frequentes em tabagistas, hepatopatas, cirróticos e pacientes com doença inflamatória intestinal ativa;</li>
  <li><strong>Utilidade Clínica Formal:</strong>
    <ul>
      <li><strong>Dosagem Pré-Operatória Basal:</strong> Estabelece um valor de referência prognóstico e auxilia na detecção de doença metastática oculta inicial (níveis pré-operatórios &gt; 5-10 ng/mL associam-se a pior prognóstico);</li>
      <li><strong>Monitorização de Recidiva no Seguimento Pós-Operatório:</strong> É o método mais sensível para detectar recidiva precoce. Dosado a cada 3 a 6 meses nos primeiros 3 a 5 anos pós-ressecção. Uma ascensão progressiva e confirmada do CEA antecede a documentação radiológica da metástase em vários meses, deflagrando investigação por TC multidetectores ou PET/CT para resgate cirúrgico curativo de metástases hepáticas ou pulmonares isoladas.</li>
    </ul>
  </li>
</ul>
`
  },
  {
    id: 'tratamento-cirurgico-do-colon-ressecção-oncologica',
    title: '6. Tratamento Cirúrgico do Câncer de Cólon: Princípios Oncológicos, Margens e Linfadenectomia',
    body_html: `
<p>A cirurgia curativa do adenocarcinoma colônico exige a aplicação rigorosa de três princípios oncológicos universais:</p>
<ol>
  <li><strong>Margens Cirúrgicas Longitudinais Adequadas:</strong> Ressecção de no mínimo <strong>5 cm de margem longitudinal proximal e distal</strong> da parede colônica sadia a partir da borda macroscópica do tumor;</li>
  <li><strong>Ligadura Vascular Alta na Origem dos Troncos Mesentéricos:</strong> A dissecção e ligadura dos pedículos vasculares arteriais e venosos primários deve ser realizada na sua emergência anatômica junto à aorta ou veia mesentérica superior (ligadura alta central), garantindo a remoção em monobloco dos linfonodos apicais e intermediários;</li>
  <li><strong>Excisão Completa do Mesocólon (CME - <em>Complete Mesocolic Excision</em>):</strong> Dissecar a fáscia de Toldt intacta com a fáscia mesocólica íntegra, removendo o mesocólon revestido por seu invólucro peritoneal intacto sem rupturas da lâmina adiposa contendo os vasos linfáticos e linfonodos regionais;</li>
  <li><strong>Contagem Linfonodal Mínima Obrigatória:</strong> A AJCC, CAP e NCCN determinam que <strong>pelo menos 12 LINFONODOS REGIONAIS devem ser isolados e histologicamente analisados</strong> na peça cirúrgica para que o estadiamento seja considerado oncológica e patologicamente adequado. Amostragens com menos de 12 linfonodos configuram fator de alto risco para subestadiamento, indicando quimioterapia adjuvante mesmo em tumores classificados preliminarmente como estádio II.</li>
</ol>

<h3>Táticas Cirúrgicas Padronizadas Conforme a Topografia Tumoral</h3>
<table class="book-table">
  <thead>
    <tr>
      <th>Topografia do Tumor Primário</th>
      <th>Procedimento Cirúrgico Oncológico Padrão</th>
      <th>Vasos Ligados na Raiz e Extensão da Ressecção</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>Ceco e Cólon Ascendente</strong></td>
      <td><strong>Hemicolectomia Direita Oncológica</strong> com anastomose íleo-transversa (terminoterminal ou látero-lateral).</td>
      <td>Ligadura alta da <strong>artéria ileocólica</strong>, <strong>artéria cólica direita</strong> e ramo direito da <strong>artéria cólica média</strong>. Ressecção dos últimos 10 a 15 cm de íleo terminal, ceco, ascendente, ângulo hepático e terço proximal do cólon transverso.</td>
    </tr>
    <tr>
      <td><strong>Flexura Hepática e Cólon Transverso Proximal/Médio</strong></td>
      <td><strong>Hemicolectomia Direita Ampliada (ou Colectomia Transversa)</strong>.</td>
      <td>Ligadura da artéria ileocólica, cólica direita e <strong>ligadura no tronco da artéria cólica média na borda inferior do pâncreas</strong>, ressecando desde o íleo terminal até a flexura esplênica.</td>
    </tr>
    <tr>
      <td><strong>Flexura Esplênica e Cólon Descendente</strong></td>
      <td><strong>Hemicolectomia Esquerda Oncológica</strong> com anastomose colo-retal ou colo-sigmoide.</td>
      <td>Ligadura da <strong>artéria cólica esquerda</strong> na sua origem da artéria mesentérica inferior (AMI) e ramos esquerdos da cólica média, com mobilização completa do ângulo esplênico.</td>
    </tr>
    <tr>
      <td><strong>Cólon Sigmoide</strong></td>
      <td><strong>Sigmoidectomia Oncológica / Colectomia Esquerda Baixa</strong>.</td>
      <td>Ligadura alta da <strong>artéria mesentérica inferior (AMI)</strong> na emergência aórtica (ou preservando a artéria cólica esquerda com ligadura das artérias sigmoideas) associada à ligadura da <strong>veia mesentérica inferior (VMI)</strong> na borda inferior do pâncreas. Margem distal no reto superior (abaixo da junção retossigmoide) para garantir segurança oncológica.</td>
    </tr>
  </tbody>
</table>
`
  },
  {
    id: 'manejo-do-cancer-de-reto-tme-e-tnt',
    title: '7. Manejo Moderno do Câncer de Reto: Excisão Total do Mesorreto (TME), Quimiorradioterapia e TNT',
    body_html: `
<p>O câncer de reto (definido anatomicamente como a neoplasia cujo bordo inferior localiza-se <strong>a até 15 cm da margem anal</strong> pela retossigmoidoscopia rígida) diverge fundamentalmente do câncer de cólon devido ao confinamento anatômico no estreito espaço ósseo da pelve verdadeira, adjacência com estruturas vitais (nervos autonômicos da ereção e continência urinária, vasos ilíacos, vagina e próstata) e ausência de revestimento peritoneal na porção subperitoneal (reto médio e inferior), o que predispõe a altas taxas de recidiva locorregional se os princípios cirúrgicos e neoadjuvantes modernos não forem seguidos.</p>

<h3>1. O Padrão-Ouro Cirúrgico: Excisão Total do Mesorreto (TME - Heald, 1982)</h3>
<p>O mesorreto é o coxim adiposo circunferencial que envolve a parede retal, contido pela fáscia própria do reto (fáscia mesorretal). Ele contém a totalidade da drenagem vascular e linfonodal regional do reto:</p>
<ul>
  <li><strong>A Técnica do Plano Sagrado:</strong> A cirurgia da TME consiste na dissecção anatômica minuciosa, afiada e precisa no <strong>"plano sagrado" avascular</strong> situado entre a fáscia própria do reto e a fáscia pré-sacral parietal anterior à concavidade sacral;</li>
  <li><strong>Integridade do Espécime:</strong> O mesorreto deve ser removido com sua cápsula fascial perfeitamente lisa, cilíndrica e intacta ("como um charuto embrulhado"), sem desgarros ou conificações que exponham o tecido tumoral;</li>
  <li><strong>Preservação dos Nervos Autonômicos Pélvicos:</strong> A dissecção cuidadosa no plano da TME identifica e preserva os <strong>nervos hipogástricos simpáticos</strong> (responsáveis pela ejaculação no homem e continência fecal voluntária) e os <strong>nervos esplâncnicos pélvicos parassimpáticos / plexo pélvico (nervi erigentes)</strong> (responsáveis pela ereção peniana, lubrificação vaginal e contração detrusora vesical), prevenindo disfunções urinárias e sexuais graves;</li>
  <li><strong>Margens Cirúrgicas Críticas:</strong>
    <ul>
      <li><strong>Margem de Ressecção Circunferencial (CRM):</strong> É a distância entre a célula tumoral mais profunda (ou linfonodo acometido) e a fáscia mesorretal dissecada. A presença de <strong>CRM &lt;= 1 mm é considerada MARGEM POSITIVA</strong>, elevando em quatro vezes o risco de recidiva pélvica fatal;</li>
      <li><strong>Margem Longitudinal Distal:</strong> No reto, uma margem distal intramural de <strong>no mínimo 1 a 2 cm</strong> de parede retal livre abaixo do polo inferior do tumor é oncologicamente segura (em tumores ultra-baixos do reto inferior, tolera-se margem distal de 1 cm ou até 0,5 cm se houver congelação intraoperatória negativa).</li>
    </ul>
  </li>
</ul>

<h3>2. Escolha entre Preservação Esfincteriana e Amputação Abdominoperineal</h3>
<table class="book-table">
  <thead>
    <tr>
      <th>Procedimento Cirúrgico</th>
      <th>Indicações Anatômicas Precisas</th>
      <th>Aspectos Técnicos e Consequências Funcionais</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>Ressecção Anterior Baixa do Reto (LAR / RAR) com TME</strong></td>
      <td>Tumores do <strong>terço superior (&gt; 10 a 15 cm da margem anal)</strong> e <strong>terço médio (5 a 10 cm da margem anal)</strong>, ou reto inferior onde seja possível obter margem distal &gt;= 1 cm livre do anel anorretal e complexo esfincteriano.</td>
      <td><strong>Preservação esfincteriana com anastomose coloanal ou colorretal mecânica ultrabaixa</strong> com grampeador duplo (técnica de duplo grampeamento). Obrigatoriamente acompanhada de <strong>ileostomia de proteção em alça temporária</strong> (fechada após 8 a 12 semanas) para mitigar as consequências catastróficas de deiscência da anastomose ultrabaixa na pelve.</td>
    </tr>
    <tr>
      <td><strong>Amputação Abdominoperineal do Reto (Cirurgia de Miles) com TME Cilíndrica Extranevadora</strong></td>
      <td>Tumores do <strong>terço inferior do reto (&lt; 5 cm da margem anal)</strong> que <strong>invadem diretamente o complexo esfincteriano anal (esfíncter interno e externo) ou músculo elevador do ânus</strong>, ou na impossibilidade anatômica de obter margem distal livre mantendo continência fecal.</td>
      <td>Ressecção em monobloco por via combinada abdominal e perineal de todo o reto, aparelho esfincteriano anal e pele perianal, associada a <strong>COLOSTOMIA TERMINAL DEFINITIVA E VITALÍCIA na fossa ilíaca esquerda</strong>.</td>
    </tr>
  </tbody>
</table>

<h3>3. A Revolução do Tratamento Neoadjuvante: Terapia Neoadjuvante Total (TNT) e Watch-and-Wait</h3>
<p>Tradicionalmente, pacientes com câncer de reto localmente avançado (cT3-T4 ou cN+) recebiam Quimiorradioterapia Neoadjuvante Longa convencional (50,4 Gy em 28 frações com 5-FU ou Capecitabina), seguida de cirurgia após 8 semanas e quimioterapia adjuvante. Entretanto, a aderência à quimioterapia adjuvante pós-operatória era inferior a 50% devido às complicações e estomas.</p>

<div class="clinical-box info-box">
  <h4>A Estratégia Contemporânea de TNT (Total Neoadjuvant Therapy)</h4>
  <p>Consolidada pelos grandes ensaios clínicos multicêntricos <strong>RAPIDO</strong> (Lancet Oncol 2021) e <strong>PRODIGE 23</strong> (Lancet Oncol 2021), a TNT tornou-se o novo padrão-ouro internacional:</p>
  <ul>
    <li>Consiste na <strong>administração de TODA a terapia sistêmica (quimioterapia em dose plena com regimes como FOLFIRINOX ou FOLFOX/CAPOX) associada à radioterapia (longa ou de curso curto 5x5 Gy) ANTES da intervenção cirúrgica</strong>;</li>
    <li><em>Resultados Extraordinários:</em> Dobra as taxas de <strong>Resposta Patológica Completa (pCR de até 28% a 30%)</strong>, reduz drasticamente a taxa de metástases sistêmicas à distância e melhora a sobrevida livre de doença.</li>
  </ul>
</div>

<h4>A Abordagem "Watch-and-Wait" (Protocolo de Angelita Habr-Gama)</h4>
<p>Pioneirizada no Brasil pela Profa. Dra. Angelita Habr-Gama no Hospital das Clínicas da USP e consagrada mundialmente, a estratégia <strong>Watch-and-Wait (Observar e Esperar)</strong> revolucionou o manejo do câncer de reto:</p>
<ul>
  <li>Se após o término da quimiorradioterapia/TNT o paciente apresentar <strong>Resposta Clínica Completa (cCR)</strong> — definida por ausência total de tumor palpável ao toque retal digital minucioso, apenas cicatriz esbranquiçada plana sem ulceração à retossigmoidoscopia de alta definição e ausência de lesão tumoral ou linfonodal suspeita na RM de pelve de alta resolução;</li>
  <li>O paciente pode ser <strong>poupado da ressecção cirúrgica mutilante (inclusive evitando a amputação de Miles e o colostoma permanente)</strong>, sendo incluído em um programa rigoroso de acompanhamento estrito mensal/trimestral nos primeiros 2 anos;</li>
  <li>Cerca de 70% a 75% dos pacientes com cCR sustentam a resposta livre de tumor por toda a vida; os 25% restantes que apresentam recidiva local luminal precoce (<em>regrowth</em>) podem ser resgatados com cirurgia oncológica preservando as taxas de sobrevida global.</li>
</ul>
`
  },
  {
    id: 'casos-clinicos-e-questoes-comentadas',
    title: '8. Casos Clínicos Desafiadores e Questões Comentadas de Alto Rendimento',
    body_html: `
<div class="case-study">
  <h4>Caso Clínico 1: Câncer de Cólon Obstrutivo e Conduta de Emergência</h4>
  <p><strong>História:</strong> Homem de 62 anos dá entrada no pronto-socorro com parada de eliminação de gases e fezes há 4 dias, distensão abdominal progressiva acentuada, vômitos biliosos e dor em cólica difusa. Relata que nos últimos 3 meses vinha apresentando afilamento das fezes ("fezes em fita") e episódios de sangramento escuro intermitente nas fezes.</p>
  <p><strong>Exame Físico:</strong> REG, desidratado ++/4+, taquicárdico (FC: 104 bpm), afebril, PA: 130x85 mmHg. Abdome francamente distendido, hipertimpânico difusamente, doloroso sem descompressão dolorosa positiva. Toque retal com ampola vazia, sem massas palpáveis a até 8 cm da margem anal.</p>
  <p><strong>Propedêutica de Imagem:</strong> Tomografia de abdome e pelve com contraste evidenciando lesão estenosante anular circunferencial obstrutiva no cólon sigmoide médio, com dilatação marcante de todo o cólon a montante (diâmetro cecal medindo 8,5 cm com paredes finas, sem pneumoperitônio). Ausência de metástases hepáticas grosseiras à TC.</p>
  <p><strong>Discussão e Conduta Cirúrgica de Emergência:</strong>
  1. Trata-se de abdome agudo obstrutivo mecânico baixo por adenocarcinoma estenosante de cólon sigmoide, com dilatação cecal iminente de rotura (&gt; 8-9 cm - Lei de Laplace).<br>
  2. Conduta pré-operatória: ressuscitação com Ringer Lactato, passagem de sonda nasogástrica descompressiva e antibioticoterapia de amplo espectro.<br>
  3. <strong>Opção Cirúrgica Padrão na Urgência:</strong> <strong>Cirurgia de Hartmann (Sigmoidectomia oncológica com ligadura alta da artéria mesentérica inferior e ressecção em monobloco do mesocólon com &gt; 12 linfonodos, sepultamento do coto retal e colostomia terminal na fossa ilíaca esquerda)</strong>. A confecção de anastomose primária imediata com preparo de cólon intraoperatório pode ser considerada apenas por cirurgiões experientes em pacientes perfeitamente estáveis sem peritonite; caso contrário, o procedimento de Hartmann é a conduta mais segura para salvar a vida do paciente, com reconstrução eletiva do trânsito após 3 a 6 meses.</p>
</div>

<div class="question-block">
  <h4>Questão de Concurso 1 (USP / Cirurgia Geral)</h4>
  <p>Mulher de 56 anos realiza colonoscopia após teste de sangue oculto nas fezes positivo (FIT+). O exame revelou lesão ulcerada e vegetante de 4 cm localizada no ceco, a 3 cm da válvula ileocecal. A biópsia confirmou adenocarcinoma moderadamente diferenciado invasor. A tomografia computadorizada de tórax, abdome e pelve com contraste não demonstrou metástases à distância (cT3 cN0 cM0). Assinale a alternativa que descreve a conduta cirúrgica oncológica padrão para esta paciente:</p>
  <p>A) Colectomia segmentar restrita ao ceco com margem de 2 cm e dissecção exclusiva dos linfonodos contíguos da parede cecal.<br>
  B) Hemicolectomia direita oncológica com ligadura na raiz dos vasos ileocólicos, cólicos direitos e ramo direito dos cólicos médios, remoção de no mínimo 12 linfonodos e anastomose íleo-transversa.<br>
  C) Proctocolectomia total com anastomose íleo-anal e confecção de bolsa ileal em J devido ao risco de pólipos sincrônicos no cólon esquerdo.<br>
  D) Ressecção endoscópica por dissecção da submucosa (ESD) seguida de radioterapia conformacional pélvica complementar.<br>
  E) Hemicolectomia esquerda com ligadura alta da artéria mesentérica inferior e colostomia terminal protetora.</p>
  <p><strong>Gabarito Comentado:</strong> <strong>Alternativa B</strong>. Para adenocarcinoma localizado no ceco, a cirurgia padrão-ouro é a <strong>hemicolectomia direita com linfadenectomia oncológica central</strong> (ligadura na raiz dos vasos tributários) e análise de pelo menos 12 linfonodos regionais (elimina A). Proctocolectomia total é restrita a síndromes hereditárias como PAF ou Lynch (elimina C). Lesão T3 invasora não é passível de ESD e radioterapia não tem indicação primária em câncer de cólon intraperitoneal (elimina D). A lesão é no cólon direito, tornando hemicolectomia esquerda um erro grosseiro de topografia (elimina E).</p>
</div>

<div class="question-block">
  <h4>Questão de Concurso 2 (ENARE / Coloproctologia)</h4>
  <p>Paciente masculino de 48 anos é diagnosticado com adenocarcinoma de reto médio localizado a 7 cm da margem anal. O estadiamento por Ressonância Magnética de alta resolução da pelve demonstrou tumor invadindo a gordura mesorretal além da muscular própria por 4 mm (cT3b), com 3 linfonodos suspeitos no mesorreto (cN1), fáscia mesorretal livre com margem circunferencial prevista de 5 mm e ausência de invasão do esfíncter anal. As tomografias de tórax e abdome não revelaram metástases à distância (cM0). Considerando as diretrizes contemporâneas para o câncer de reto localmente avançado, a melhor estratégia terapêutica é:</p>
  <p>A) Amputação abdominoperineal do reto imediata (cirurgia de Miles) sem qualquer tratamento pré-operatório para evitar disseminação linfática.<br>
  B) Ressecção anterior baixa do reto imediata com preservação esfincteriana sem neoadjuvância, indicando radioterapia apenas se a margem cirúrgica for positiva.<br>
  C) Terapia Neoadjuvante Total (TNT) com quimioterapia sistêmica e quimiorradioterapia pélvica, seguida de reavaliação clínica e por RM de pelve para planejar cirurgia com Excisão Total do Mesorreto (TME) ou acompanhamento estrito com Watch-and-Wait se resposta clínica completa.<br>
  D) Colostomia em alça definitiva de desvio sem ressecção tumoral associada a cuidados paliativos exclusivos.<br>
  E) Eletrocoagulação endoscópica com plasma de argônio associada a quimioterapia oral com capecitabina isolada.</p>
  <p><strong>Gabarito Comentado:</strong> <strong>Alternativa C</strong>. Para tumores de reto localmente avançados (cT3 e/ou N+), a abordagem moderna padrão é a <strong>Terapia Neoadjuvante Total (TNT)</strong>, demonstrada pelos estudos RAPIDO e PRODIGE 23 por elevar a resposta patológica completa e sobrevida livre de metástases. Se houver resposta clínica completa, pode-se poupar a cirurgia via protocolo de <em>Watch-and-Wait</em>; se houver lesão residual, procede-se à cirurgia com Excisão Total do Mesorreto (TME). Como o tumor está a 7 cm e não invade esfíncteres, a cirurgia de Miles imediata é conduta errônea e mutilante (elimina A).</p>
</div>

<div class="question-block">
  <h4>Questão de Concurso 3 (UNICAMP / Cirurgia Geral)</h4>
  <p>Sobre as síndromes de polipose e câncer colorretal hereditário, assinale a assertiva correta:</p>
  <p>A) A Síndrome de Lynch caracteriza-se pelo desenvolvimento de mais de 1.000 adenomas colorretais na infância e mutação no gene APC.<br>
  B) Na Polipose Adenomatosa Familiar (PAF), o risco cumulativo de câncer colorretal ao longo da vida aproxima-se de 100% até os 40 a 50 anos, sendo a mutação no gene APC o evento patogênico central.<br>
  C) A Síndrome de Gardner associa a polipose colônica clássica a glioblastomas multiformes de alta malignidade no sistema nervoso central.<br>
  D) O câncer de ovário seroso é a neoplasia extraintestinal mais frequente nas mulheres portadoras de Síndrome de Lynch.<br>
  E) Pacientes com Síndrome de Lynch apresentam mutações ativadoras constitutivas no oncogene KRAS transmitidas de forma autossômica recessiva.</p>
  <p><strong>Gabarito Comentado:</strong> <strong>Alternativa B</strong>. A PAF decorre de mutação autossômica dominante no gene <em>APC</em> e confere 100% de risco de câncer colorretal se não tratada com proctocolectomia profilática (assertiva perfeita). Lynch tem poucos pólipos e decorre de genes de reparo MMR, não APC (elimina A). Gardner tem osteomas e tumores desmoides; quem tem tumor do SNC é Turcot (elimina C). O tumor extraintestinal mais comum na mulher com Lynch é o <strong>câncer de endométrio</strong> (elimina D). Lynch é autossômica dominante nos genes de reparo MMR (MLH1, MSH2, MSH6, PMS2), e não KRAS recessiva (elimina E).</p>
</div>
`
  },
  {
    id: 'sintese-pratica-e-referencias',
    title: '9. Síntese Prática, Fluxograma de Conduta e Referências Bibliográficas',
    body_html: `
<div class="summary-box">
  <h4>Guia de Conduta Rápida no Câncer Colorretal</h4>
  <ul>
    <li><strong>Rastreamento Populacional (Risco Habitual):</strong> Início aos <strong>45 anos</strong>. Colonoscopia a cada 10 anos ou FIT anual. Se parente de 1º grau com CCR &lt; 60 anos: iniciar aos 40 anos ou 10 anos antes do familiar mais jovem, repetindo a cada 5 anos.</li>
    <li><strong>Carcinogênese:</strong>
      <ul>
        <li><em>Via do Adenoma-Carcinoma (80%-85%):</em> Mutação no <em>APC</em> (porteiro da beta-catenina) -> <em>KRAS</em> -> <em>SMAD4</em> (18q) -> <em>TP53</em>.</li>
        <li><em>Via da Instabilidade de Microssatélites (15%-20%):</em> Perda das enzimas de reparo MMR (MLH1, MSH2, MSH6, PMS2) -> MSI-H. Predomínio no cólon direito, resposta a anti-PD-1 (imunoterapia).</li>
      </ul>
    </li>
    <li><strong>Pólipos:</strong> Adenomas Tubulares (mais comuns, baixo risco), Adenomas Vilosos (alto risco de malignidade: 30%-50%, mucorreia/hipocalemia), Pólipos Sésseis Serrilhados (cólon direito, mutação BRAF V600E).</li>
    <li><strong>Síndromes Hereditárias:</strong>
      <ul>
        <li><em>PAF:</em> &gt; 100 adenomas, mutação no gene APC (5q21), risco de CCR de 100%. Cirurgia profilática: proctocolectomia total com bolsa ileal (IPAA) ou colectomia com IRA. Variantes: Gardner (osteomas, desmoides) e Turcot tipo 2 (meduloblastoma).</li>
        <li><em>Síndrome de Lynch (HNPCC):</em> Mutação em MMR, cólon direito predominante, poucos pólipos, início jovem (&lt; 50 anos). Critérios de Amsterdam II (3-2-1-0). Risco alto de câncer de endométrio em mulheres. Cirurgia: colectomia total com IRA.</li>
      </ul>
    </li>
    <li><strong>Quadro Clínico:</strong> Cólon Direito (sangramento oculto, anemia ferropriva crônica, massa); Cólon Esquerdo (alteração do hábito, obstrução, fezes em fita, "mordida de maçã"); Reto (hematoquezia viva, tenesmo, urgência fecal).</li>
    <li><strong>Cirurgia de Cólon:</strong> Margem de segurança de 5 cm longitudinal + ligadura alta dos troncos vasculares na raiz + <strong>no mínimo 12 linfonodos ressecados</strong>.</li>
    <li><strong>Câncer de Reto (&lt; 15 cm da margem anal):</strong>
      <ul>
        <li>RM de pelve de alta resolução mandatória para avaliar estádio T, N e Fáscia Mesorretal / CRM (&gt; 1 mm = livre).</li>
        <li>Padrão-ouro: <strong>Excisão Total do Mesorreto (TME)</strong> no plano sagrado com preservação dos nervos autonômicos.</li>
        <li>Lesões localmente avançadas (cT3-T4 ou N+): <strong>Terapia Neoadjuvante Total (TNT)</strong> com quimioterapia plena e radioterapia prévias. Se Resposta Clínica Completa (cCR): elegível para protocolo de <strong>Watch-and-Wait (Observar e Esperar) de Angelita Habr-Gama</strong>.</li>
        <li>Cirurgia de Miles (amputação abdominoperineal com colostomia definitiva) indicada apenas se invasão direta do complexo esfincteriano.</li>
      </ul>
    </li>
  </ul>
</div>

<h3>Referências Bibliográficas Fundamentais</h3>
<ol>
  <li>Benson AB, Venook AP, Al-Hawary MM, et al. Colon Cancer, Version 2.2023, NCCN Clinical Practice Guidelines in Oncology. <em>J Natl Compr Canc Netw</em>. 2023;21(3):289-315.</li>
  <li>Benson AB, Venook AP, Al-Hawary MM, et al. Rectal Cancer, Version 3.2023, NCCN Clinical Practice Guidelines in Oncology. <em>J Natl Compr Canc Netw</em>. 2023;21(4):393-420.</li>
  <li>Bahadoer RR, Dijkstra EA, van Etten B, et al. Short-course radiotherapy followed by chemotherapy before total mesorectal excision (TME) versus preoperative chemoradiotherapy, TME, and optional adjuvant chemotherapy for locally advanced rectal cancer (RAPIDO): a randomised, open-label, phase 3 trial. <em>Lancet Oncol</em>. 2021;22(1):29-42.</li>
  <li>Conroy T, Bosset JF, Etienne PL, et al. Neoadjuvant chemotherapy with FOLFIRINOX and preoperative chemoradiotherapy for patients with locally advanced rectal cancer (PRODIGE 23): a multicentre, randomised, open-label, phase 3 trial. <em>Lancet Oncol</em>. 2021;22(5):702-715.</li>
  <li>Habr-Gama A, Perez RO, Nadalin W, et al. Operative versus nonoperative treatment for stage 0 distal rectal cancer following chemoradiation therapy: long-term results. <em>Ann Surg</em>. 2004;240(4):711-717.</li>
</ol>
`
  }
];

const finalSections = [
  baseSections[0],
  secCancerColorretalExpansao[0],
  baseSections[1],
  baseSections[2],
  baseSections[3],
  secCancerColorretalExpansao[1],
  baseSections[4],
  baseSections[5],
  secCancerColorretalExpansao2[0],
  secCancerColorretalExpansao3[0],
  baseSections[6],
  secCancerColorretalExpansao[2],
  secCancerColorretalExpansao2[1],
  baseSections[7],
  secCancerColorretalExpansao4[0],
  secCancerColorretalExpansao4[1],
  secCancerColorretalExpansao2[2],
  secCancerColorretalExpansao3[1],
  baseSections[8]
];

const bookData = {
  slug,
  title: 'Câncer Colorretal: Da Carcinogênese à TME e TNT',
  subtitle: 'Vias moleculares, pólipos, síndromes hereditárias (PAF e Lynch), ressecção oncológica de cólon e manejo multimodal do reto',
  area: 'Cirurgia Geral',
  materia: 'Coloproctologia e Cirurgia Oncológica',
  sections: finalSections
};

saveBook(slug, bookData);

const indexPath = path.join(process.cwd(), 'apostilas', slug, 'index.html');
const html = fs.readFileSync(indexPath, 'utf-8');
const chars = countUsefulChars(html);
console.log(`[AULA 152 - SUCESSO] ${slug} compilado: ${chars} caracteres úteis.`);
