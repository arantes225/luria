import { saveBook, countUsefulChars } from '../bloco-07-utils.mjs';
import { secUlceraExpansao } from './ulcera-expansao.mjs';
import { secUlceraExpansao2 } from './ulcera-expansao2.mjs';
import { secUlceraExpansao3 } from './ulcera-expansao3.mjs';
import { secUlceraExpansao4 } from './ulcera-expansao4.mjs';
import { secUlceraExpansao5 } from './ulcera-expansao5.mjs';
import { secUlceraExpansao6 } from './ulcera-expansao6.mjs';
import fs from 'fs';
import path from 'path';

const slug = 'ulcera-peptica-e-complicacoes';

const baseSections = [
  {
    id: 'introducao-conceito-fisiopatologia-gastrica-duodenal',
    title: '1. Introdução, Anatomia Gástrica e Fisiopatologia da Doença Ulcerosa Péptica',
    body_html: `
<p>A Doença Ulcerosa Péptica (DUP) representa uma das entidades nosológicas de maior relevância histórica e prática no espectro da Cirurgia Geral e da Gastroenterologia. Caracteriza-se pela perda circunscrita de substância da mucosa do trato gastrointestinal alto que ultrapassa a camada muscular da mucosa (<em>muscularis mucosae</em>), alcançando a submucosa ou a camada muscular própria, exposta à ação corrosiva da secreção cloridropéptica (ácido clorídrico e pepsina). Quando a erosão não ultrapassa a muscular da mucosa, classifica-se estritamente como erosão epitelial superficial, e não como úlcera verdadeira.</p>

<h3>O Equilíbrio Fisiológico: Fatores Defensivos versus Agressivos</h3>
<p>A homeostase da barreira mucosa gastroduodenal depende de uma delicada equação dinâmica entre mecanismos protetores e fatores citotóxicos endógenos e exógenos:</p>

<table class="book-table">
  <thead>
    <tr>
      <th>Componente</th>
      <th>Mecanismos Fisiológicos e Moleculares</th>
      <th>Principais Agressores ou Mecanismos de Quebra</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>Fatores Defensivos da Mucosa</strong></td>
      <td>
        • <strong>Barreira Pré-Epitelial:</strong> Camada de muco insolúvel e secreção contínua de bicarbonato (HCO3-) pelas células epiteliais superficiais, mantendo um gradiente de pH neutro (~7,0) na superfície apical celular a despeito de pH intraluminal ácido (&lt; 2,0).<br>
        • <strong>Barreira Epitelial:</strong> Junções oclusivas firmes (<em>tight junctions</em> zonula occludens), restituição celular rápida após microtraumas e síntese de proteínas de choque térmico.<br>
        • <strong>Barreira Pós-Epitelial:</strong> Fluxo sanguíneo microvascular submucoso abundante (responsável por remover íons H+ retrodispersos e fornecer oxigênio, glicose e bicarbonato).<br>
        • <strong>Prostaglandinas Endógenas (PGE2 e PGI2):</strong> Estimulam a secreção de muco e bicarbonato, inibem a secreção ácida nas células parietais e mantêm a vasodilatação do leito microcirculatório.
      </td>
      <td>
        • AINEs (inibição da COX-1 e supressão da síntese de PGE2/PGI2).<br>
        • Tabagismo (reduz a secreção duodenal de bicarbonato e induz vasoconstrição da microcirculação mucosa).<br>
        • Estresse fisiológico extremo e hipoperfusão sistêmica (sepse, choque, politrauma - úlceras de estresse / Curling / Cushing).
      </td>
    </tr>
    <tr>
      <td><strong>Fatores Agressivos</strong></td>
      <td>
        • <strong>Ácido Clorídrico (HCl):</strong> Produzido pelas células parietais (oxínticas) do corpo e fundo gástrico através da bomba de prótons H+/K+-ATPase, sob estímulo da histamina (receptores H2), gastrina (receptores CCK2) e acetilcolina (receptores M3 vagais).<br>
        • <strong>Pepsinogênio / Pepsina:</strong> Convertido em pepsina ativa sob pH &lt; 3,5, exercendo digestão proteolítica da matriz tecidual.<br>
        • <strong>Refluxo Duodenogástrico:</strong> Ácidos biliares e lisolecitina que solubilizam o muco gástrico.
      </td>
      <td>
        • Infecção pelo <em>Helicobacter pylori</em>.<br>
        • Síndrome de Zollinger-Ellison (gastrinoma neuroendócrino com hipersecreção maciça de gastrina).<br>
        • Estados de hipercalcemia e hiperparatireoidismo primário.
      </td>
    </tr>
  </tbody>
</table>

<h3>Diferenças Anatômicas e Fisiopatológicas: Úlcera Duodenal versus Gástrica</h3>
<p>A localização da úlcera reflete diferentes aberrações fisiopatológicas primárias:</p>
<ul>
  <li><strong>Úlcera Duodenal:</strong> Localizada quase invariavelmente nos primeiros 2 a 3 cm do bulbo duodenal (parede anterior ou posterior). Fisiopatologicamente, cursa com <strong>HIPERSECREÇÃO ÁCIDA</strong>. Há aumento da massa de células parietais, resposta hipergastrinêmica desproporcional à alimentação e esvaziamento gástrico acelerado, associados à infecção antral predominante por <em>H. pylori</em> (que inibe as células D produtoras de somatostatina, desinibindo a secreção de gastrina pelas células G). Predomina em indivíduos jovens (30 a 55 anos) do sexo masculino;</li>
  <li><strong>Úlcera Gástrica:</strong> Ocorre predominantemente na pequena curvatura gástrica e incisura angularis. Fisiopatologicamente, cursa com <strong>HIPO ou NORMOSSECREÇÃO ÁCIDA associada a FALHA GRAVE DOS MECANISMOS DE DEFESA DA BARREIRA MUCOSA</strong>. Predomina em faixas etárias mais avançadas (55 a 70 anos), fortemente associada ao uso crônico de anti-inflamatórios não esteroidais (AINEs) e à pangastrite atrófica crônica por <em>H. pylori</em>.</li>
</ul>
`
  },
  {
    id: 'classificacao-de-johnson-e-etiologias',
    title: '2. Classificação de Johnson para Úlceras Gástricas e Principais Etiologias',
    body_html: `
<p>Em Cirurgia Geral, a localização anatômica precisa da úlcera gástrica correlaciona-se diretamente com o padrão de secreção ácida subjacente e orienta a escolha da técnica cirúrgica definitiva quando indicada. Essa correlação foi estabelecida pela clássica <strong>Classificação de Johnson</strong> (originalmente tipos I a III, posteriormente expandida para os tipos IV e V):</p>

<table class="book-table">
  <thead>
    <tr>
      <th>Tipo de Johnson</th>
      <th>Localização Anatômica Precisa</th>
      <th>Padrão de Secreção Ácida</th>
      <th>Frequência Relativa e Características Especiais</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>Tipo I</strong></td>
      <td><strong>Pequena curvatura gástrica alta ou incisura angularis</strong> (transição entre corpo e antro).</td>
      <td><strong>Hipossecreção ou Normossecreção ácida</strong> (defeito na barreira de proteção mucosa).</td>
      <td><strong>É o tipo mais frequente (55% a 60% das úlceras gástricas)</strong>. Não se associa a hiperacidez gástrica; o tratamento cirúrgico histórico de escolha quando refratário era a antrectomia incluindo a úlcera, sem necessidade de vagotomia.</td>
    </tr>
    <tr>
      <td><strong>Tipo II</strong></td>
      <td><strong>Corpo gástrico associada a úlcera duodenal ativa ou cicatrizada concomitante</strong> (úlcera dupla).</td>
      <td><strong>Hipersecreção ácida</strong> (comportamento biológico idêntico à úlcera duodenal).</td>
      <td>Representa cerca de 15% a 20% dos casos. Como há hipercloridria, se for operada exige antrectomia gástrica associada a vagotomia troncular.</td>
    </tr>
    <tr>
      <td><strong>Tipo III</strong></td>
      <td><strong>Pré-pilórica</strong> (nos 2 a 3 cm proximais ao esfíncter pilórico).</td>
      <td><strong>Hipersecreção ácida</strong> (comportamento biológico de úlcera duodenal).</td>
      <td>Representa cerca de 15% a 20% dos casos. Elevada tendência a causar estenose e obstrução do trato de saída gástrico. Exige vagotomia se abordagem cirúrgica.</td>
    </tr>
    <tr>
      <td><strong>Tipo IV</strong></td>
      <td><strong>Pequena curvatura gástrica alta, justa-cárdica</strong> (próxima à junção esofagogástrica).</td>
      <td><strong>Hipossecreção ácida</strong>.</td>
      <td>Rara (&lt; 5%), porém de manejo cirúrgico extremamente complexo devido à proximidade anatômica do cárdia e esôfago distal (risco de ressecções extensas ou gastrectomia total).</td>
    </tr>
    <tr>
      <td><strong>Tipo V</strong></td>
      <td><strong>Qualquer topografia gástrica, comumente múltipla</strong>, induzida farmacologicamente.</td>
      <td><strong>Independente de ácido</strong> (causada por toxicidade direta e perda de prostaglandinas).</td>
      <td><strong>Induzida pelo uso de AINEs ou AAS</strong>. Frequentemente assintomática até a ocorrência de complicação hemorrágica ou perfurativa súbita.</td>
    </tr>
  </tbody>
</table>

<div class="clinical-box info-box">
  <h4>Mnemônica Cirúrgica LURIA para Classificação de Johnson</h4>
  <p>Lembre-se da regra da acidez: <strong>Tipos I e IV = Hipo/Normocloridria</strong> (pequena curvatura; extremos anatômicos); <strong>Tipos II e III = Hipercloridria</strong> (comportam-se como úlceras duodenais, "2" tem duas úlceras e "3" é pré-pilórica); <strong>Tipo V = Remédios (AINEs/AAS)</strong>.</p>
</div>

<h3>As Duas Grandes Causas Etiológicas</h3>
<h4>1. Helicobacter pylori</h4>
<p>Bactéria Gram-negativa espiralada microaerofílica que coloniza o muco gástrico. Mecanismos patogênicos:</p>
<ul>
  <li>Produção massiva de <strong>urease</strong>, enzima que hidrolisa a ureia intraluminal em amônia (NH3) e dióxido de carbono. A amônia alcaliniza o microambiente pericelular, protegendo a bactéria do ácido gástrico, porém exercendo toxicidade epitelial direta violenta;</li>
  <li>Fatores de virulência bacterianos como a citotoxina vacuolizante A (<em>VacA</em>) e a proteína efetora associada à citotoxina A (<em>CagA</em>), que induzem degradação do citoesqueleto celular, recrutamento de neutrófilos e quebra das junções oclusivas;</li>
  <li>Na gastrite de predomínio antral, o <em>H. pylori</em> destrói as células D produtoras de somatostatina. Como a somatostatina é o principal freio inibitório parácrino das células G, ocorre hipergastrinemia desinibida, levando à hipersecreção ácida e úlcera duodenal;</li>
  <li>Na pangastrite, o dano atrófico difuso das glândulas oxínticas reduz a produção de ácido, predispondo à úlcera gástrica tipo I e ao adenocarcinoma gástrico.</li>
</ul>

<h4>2. Anti-inflamatórios Não Esteroidais (AINEs) e Ácido Acetilsalicílico (AAS)</h4>
<p>Os AINEs promovem dano péptico por dois mecanismos sinérgicos:</p>
<ul>
  <li><strong>Efeito Sistêmico (Inibição Enzimática da Ciclo-oxigenase 1 - COX-1):</strong> A COX-1 é constitutivamente expressa no estômago e sintetiza prostaglandinas citoprotetoras (PGE2 e PGI2). A sua inibição farmacológica suprime a secreção de muco, diminui a síntese de bicarbonato, reduz bruscamente o fluxo sanguíneo da submucosa e compromete a proliferação epitelial regenerativa;</li>
  <li><strong>Efeito Tópico Direto (Aprisionamento Iônico):</strong> Os AINEs são ácidos fracos lipofílicos. No pH intragástrico ácido (&lt; 2,0), encontram-se na forma não ionizada, atravessando livremente a membrana lipídica das células epiteliais. No interior do citosol celular (pH neutro ~7,2), os AINEs dissociam-se, liberando íons H+ e tornando-se ionizados e impermeáveis. Esse acúmulo intracelular maciço descompassa a fosforilação oxidativa mitocondrial, depletando ATP e induzindo apoptose e necrose celular.</li>
</ul>
`
  },
  {
    id: 'diagnostico-clinico-endoscopico-e-forrest',
    title: '3. Quadro Clínico, Diagnóstico Endoscópico e Classificação de Forrest para Hemorragia Digestiva Alta',
    body_html: `
<p>O quadro clínico clássico da doença ulcerosa não complicada caracteriza-se pela <strong>dispepsia ulcerosa</strong>: dor epigástrica em queimação, pontada ou sensação de vazio doloroso, que se correlaciona intimamente com os ciclos de alimentação:</p>
<ul>
  <li><strong>Úlcera Duodenal:</strong> Dor em "três tempos" (dor - come - passa). Piora no período de jejum (2 a 3 horas após as refeições) e frequentemente desperta o paciente na madrugada (entre 1h e 3h da manhã), momento do pico de secreção ácida gástrica circadiana sem o efeito tamponante do bolo alimentar. Alivia transitoriamente com a ingestão de alimentos alcalinos ou antiácidos;</li>
  <li><strong>Úlcera Gástrica:</strong> Dor em "quatro tempos" (come - dói - passa - dói). O contato direto do bolo alimentar e o estiramento gástrico desencadeiam dor logo após a refeição (30 a 60 minutos pós-prandial), podendo gerar aversão alimentar, anorexia voluntária e perda ponderal.</li>
</ul>

<div class="clinical-box warning-box">
  <h4>Atenção Obrigatória: Toda Úlcera Gástrica Exige Biópsia!</h4>
  <p>Ao contrário da úlcera duodenal (que possui risco de malignidade virtualmente nulo), <strong>toda úlcera gástrica detectada à Endoscopia Digestiva Alta (EDA) deve ser exaustivamente biopsiada (no mínimo 6 a 8 fragmentos das bordas e leito da lesão)</strong> para excluir adenocarcinoma gástrico ulcerado ou linfoma MALT. Além disso, é mandatória a realização de <strong>EDA de controle pós-tratamento em 8 a 12 semanas</strong> para documentar a cicatrização completa; se a úlcera persistir, novas biópsias são imperativas para afastar neoplasia subjacente.</p>
</div>

<h3>Hemorragia Digestiva Alta Péptica e a Classificação de Forrest</h3>
<p>A hemorragia digestiva alta (HDA) é a complicação aguda mais prevalente da DUP, manifestando-se clinicamente por hematêmese (vômitos com sangue vivo ou borra de café) e/ou melena (fezes escuras em piche, fétidas, decorrentes da degradação da hemoglobina pela microbiota entérica). Nos sangramentos maciços com trânsito hiperdinâmico, pode ocorrer hematoquezia associada a choque hipovolêmico.</p>

<p>A <strong>Classificação de Forrest</strong> estratifica o risco de ressangramento espontâneo, necessidade de intervenção hemostática endoscópica de urgência e mortalidade intra-hospitalar com base na morfologia da úlcera observada no exame endoscópico:</p>

<table class="book-table">
  <thead>
    <tr>
      <th>Classificação de Forrest</th>
      <th>Descrição Morfológica Endoscópica</th>
      <th>Risco de Ressangramento sem Tratamento</th>
      <th>Conduta Terapêutica Obrigatória</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>Forrest Ia</strong></td>
      <td><strong>Sangramento Ativo em Jato arterial pulsátil</strong> (<em>Spurting hemorrhage</em>).</td>
      <td>80% a 90% (altíssimo risco de óbito por choque).</td>
      <td><strong>EDA Terapêutica Imediata Obrigatória</strong> (terapia combinada/dupla) + IBP venoso em dose alta contínua.</td>
    </tr>
    <tr>
      <td><strong>Forrest Ib</strong></td>
      <td><strong>Sangramento Ativo Difuso / Babação contínua</strong> (<em>Oozing hemorrhage</em>).</td>
      <td>20% a 30% de ressangramento.</td>
      <td><strong>EDA Terapêutica Imediata Obrigatória</strong> (terapia combinada/dupla) + IBP venoso em dose alta contínua.</td>
    </tr>
    <tr>
      <td><strong>Forrest IIa</strong></td>
      <td><strong>Vaso Visível Não Sangrante</strong> (protuberância vascular avermelhada ou azulada no fundo da cratera ulcerosa).</td>
      <td>40% a 50% de ressangramento precoce.</td>
      <td><strong>EDA Terapêutica Imediata Obrigatória</strong> (terapia combinada/dupla hemostática) + IBP venoso em dose alta contínua.</td>
    </tr>
    <tr>
      <td><strong>Forrest IIb</strong></td>
      <td><strong>Coágulo Aderido à base da úlcera</strong> (coágulo sentinela fixo).</td>
      <td>25% a 35% de ressangramento.</td>
      <td><strong>Lavagem rigorosa com jato de água; se permanecer aderido, remoção suave do coágulo</strong> (alça fria ou pinça) para expor a base: se houver vaso visível ou sangramento subjacente, tratar como IIa ou Ia/Ib.</td>
    </tr>
    <tr>
      <td><strong>Forrest IIc</strong></td>
      <td><strong>Fundo com Hematina / Manchas planas escuras</strong> (pigmentos marrons/pretos sem protuberância).</td>
      <td>5% a 10% (baixo risco).</td>
      <td><strong>Tratamento Clínico Isolado com IBP oral</strong>; sem indicação de hemostasia endoscópica.</td>
    </tr>
    <tr>
      <td><strong>Forrest III</strong></td>
      <td><strong>Base Limpa com Fundo de Fibrina Branca / Amarelada</strong>, sem qualquer estigma de sangramento recente.</td>
      <td>&lt; 3% a 5% (baixíssimo risco).</td>
      <td><strong>Tratamento Clínico Isolado com IBP oral</strong>; sem hemostasia endoscópica. Elegível para alta hospitalar precoce se estabilidade clínica.</td>
    </tr>
  </tbody>
</table>
`
  },
  {
    id: 'manejo-da-hemorragia-digestiva-peptica',
    title: '4. Manejo Clínico, Hemodinâmico e Endoscópico do Sangramento Péptico Agudo',
    body_html: `
<p>O atendimento ao paciente com hemorragia digestiva alta péptica grave obedece a uma sequência protocolada de prioridades clínicas, onde a estabilização hemodinâmica antecede categoricamente qualquer exame invasivo.</p>

<h3>1. Ressuscitação Hemodinâmica e Suporte Inicial</h3>
<ol>
  <li><strong>Vias Aéreas e Oxigenação:</strong> Garantir via aérea pérvia. Intubação orotraqueal profilática imediata se hematêmese volumosa ativa maciça, rebaixamento do nível de consciência (Glasgow &lt;= 8) ou risco iminente de broncoaspiração maciça antes da EDA;</li>
  <li><strong>Acessos Venosos e Cristaloides:</strong> Pelo menos 2 acessos venosos periféricos calibrosos (jelco 14 ou 16G) e infusão rápida de cristaloides balanceados (Ringer Lactato) para restaurar a pressão arterial média (&gt;= 65 mmHg) e a perfusão tecidual;</li>
  <li><strong>Estratégia Transfusional Restritiva:</strong> Diretrizes e ensaios clínicos randomizados consagraram a <strong>estratégia restritiva de transfusão de concentrado de hemácias</strong>, com alvo de manter <strong>Hemoglobina entre 7,0 e 8,0 g/dL</strong> (gatilho transfusional em Hb &lt; 7,0 g/dL). A estratégia liberal (alvo Hb &gt; 9,0-10,0 g/dL) eleva a pressão venosa portal e intravascular, desestabiliza a formação do coágulo primário e aumenta comprovadamente o risco de ressangramento e mortalidade. Em coronariopatas graves sintomáticos ou IAM recente, tolera-se alvo de Hb entre 8,0 e 9,0 g/dL;</li>
  <li><strong>Correção de Coagulopatias:</strong> Reversão imediata de anticoagulantes orais (complexo protrombínico de 4 fatores para varfarina com RNI &gt; 1,5-2,0; idarucizumabe para dabigatrana; andexanet alfa ou complexo protrombínico para inibidores do fator Xa) e transfusão de plaquetas se contagem &lt; 50.000/mm³ em sangramento ativo.</li>
</ol>

<h3>2. Farmacoterapia Antissecretora Intensa com Inibidores da Bomba de Prótons (IBP)</h3>
<p>O ácido intragástrico é o principal inimigo da hemostasia: sob pH &lt; 6,0, a agregação plaquetária é completamente abolida e a pepsina ativada hidrolisa e dissolve rapidamente o tampão hemostático de fibrina recém-formado no vaso erodido. Para promover hemostasia estável, o pH intragástrico deve ser mantido <strong>acima de 6,0 de forma contínua</strong>.</p>
<ul>
  <li><strong>Esquema Farmacológico:</strong> <strong>Omeprazol ou Pantoprazol</strong> na dose de <strong>bolus de 80 mg endovenoso</strong>, seguido de:
    <ul>
      <li>Infusão contínua de <strong>8 mg/hora por 72 horas</strong> consecutivas; OU</li>
      <li>Regime intermitente de <strong>40 mg a 80 mg EV a cada 12 horas</strong> (estudos recentes comprovaram não inferioridade clínica em relação à infusão contínua contínua, com igual taxa de ressangramento e mortalidade).</li>
    </ul>
  </li>
  <li>Após as 72 horas iniciais de alto risco de ressangramento, transiciona-se para dose oral plena (40 mg VO 1 a 2 vezes ao dia).</li>
</ul>

<h3>3. Endoscopia Digestiva Alta Terapêutica</h3>
<p>A EDA deve ser realizada idealmente <strong>dentro das primeiras 24 horas da admissão</strong> (ou em até 12 horas nos pacientes com sangramento de alto volume após otimização hemodinâmica inicial).</p>
<div class="clinical-box info-box">
  <h4>Conceito Padrão-Ouro: Terapia Endoscópica Combinada (Dupla Terapia)</h4>
  <p>Nas lesões de alto risco (Forrest Ia, Ib e IIa), <strong>o tratamento endoscópico NUNCA deve ser realizado com injeção isolada de adrenalina!</strong> A adrenalina diluída (1:10.000 ou 1:20.000) atua por vasoconstrição temporária e compressão mecânica pelo volume injetado, permitindo clareamento do campo, mas associa-se a elevadas taxas de ressangramento tardio se usada isoladamente. <strong>É mandatório associar a injeção de adrenalina a um segundo método hemostático definitivo</strong>:</p>
  <ul>
    <li><strong>Método Mecânico:</strong> Aplicação de <strong>clipes metálicos hemostáticos (hemoclipes)</strong> diretamente sobre a boca do vaso sangrante (método mais eficaz e seguro); OU</li>
    <li><strong>Método Térmico:</strong> Eletrocoagulação multipolar (<em>Gold Probe</em>) ou coagulação por plasma de argônio (APC), promovendo hemostasia por termocoagulação tecidual.</li>
  </ul>
</div>

<h3>4. Manejo do Ressangramento e Falha Endoscópica</h3>
<p>Se houver ressangramento após a primeira hemostasia bem-sucedida (surgimento de nova hematêmese, hipotensão e queda do hematócrito), a conduta imediata preconizada pelas diretrizes internacionais é:</p>
<ol>
  <li><strong>Segunda Tentativa Endoscópica (<em>Re-EDA</em>):</strong> Uma nova abordagem endoscópica consegue resgatar a maioria dos pacientes com sucesso;</li>
  <li><strong>Se Falha da Segunda EDA ou Sangramento Catastrófico Refratário:</strong> Indica-se <strong>Arteriografia com Embolização Transcateter</strong> (procedimento de escolha em hospitais terciários com radiologia intervencionista, com embolização da artéria gastroduodenal para úlceras duodenais ou artéria gástrica esquerda para úlceras gástricas) OU <strong>Tratamento Cirúrgico de Urgência</strong>.</li>
</ol>
`
  },
  {
    id: 'perfuracao-peptica-e-patch-de-graham',
    title: '5. Complicações Perfurativas: Fisiopatologia, Diagnóstico e a Cirurgia do Patch de Graham',
    body_html: `
<p>A perfuração péptica aguda representa uma catástrofe abdominal de indicação cirúrgica de emergência. Ocorre em cerca de 5% a 10% dos pacientes com doença ulcerosa, predominantemente na <strong>parede anterior do bulbo duodenal</strong> ou na <strong>pequena curvatura gástrica</strong>. As úlceras da parede posterior do duodeno e do estômago tendem a penetrar em órgãos sólidos retroperitoneais (como o pâncreas, causando pancreatite por contiguidade) ou erodir vasos de grande calibre (como a artéria gastroduodenal), cursando primariamente com hemorragia maciça em vez de perfuração livre para a cavidade peritoneal.</p>

<h3>Quadro Clínico e Evolução Trifásica da Perfuração Péptica</h3>
<p>A história natural da perfuração livre clássica divide-se em três etapas clínicas temporais bem delineadas:</p>
<ol>
  <li><strong>Fase Inicial de Contaminação Química (0 a 2 horas):</strong> Início abrupto e violento de dor abdominal excruciante, descrita como uma "facada" súbita em epigástrio, que se generaliza por todo o abdome em questão de minutos. O paciente imobiliza-se no leito com respiração curta e superficial para evitar a movimentação diafragmática. Ao exame físico, constata-se rigidez muscular involuntária generalizada e difusa da parede abdominal — o clássico <strong>abdome em tábua</strong> — com descompressão dolorosa universalmente positiva;</li>
  <li><strong>Fase Intermediária de Ilusão Clínica (2 a 12 horas):</strong> Ocorre influxo massivo de exsudato inflamatório seroso peritoneal que dilui o suco gástrico corrosivo, propiciando discreto alívio transitório da sensação álgica lancinante. O abdome permanece rígido à palpação, e a desatenção nessa fase pode levar a erro diagnóstico negligente;</li>
  <li><strong>Fase Tardia de Peritonite Bacteriana Purulenta e Sepse (após 12 a 24 horas):</strong> A microbiota entérica e anaeróbia coloniza o peritônio, instalando-se peritonite purulenta difusa, íleo paralítico acentuado com distensão gasosa, desidratação maciça com choque séptico, acidose lática e falência de múltiplos órgãos.</li>
</ol>

<h3>Propedêutica Diagnóstica na Perfuração</h3>
<ul>
  <li><strong>Rotina Radiográfica de Abdome Agudo:</strong> Composta por Radiografia de Tórax em posição ortostática (em pé), Radiografia de Abdome em decúbito dorsal e em ortostase. O achado clássico é o <strong>Pneumoperitônio</strong>, visualizado como uma faixa radiotransparente (crescente gasoso) sob as cúpulas diafragmáticas (em 75% a 85% dos pacientes perfurados);</li>
  <li><strong>Sinal de Jobert:</strong> Desaparecimento da macicez hepática fisiológica à percussão na linha axilar média direita, substituída por hipertimpanismo devido à interposição de ar livre subdiafragmático entre o fígado e a parede toracoabdominal;</li>
  <li><strong>Tomografia Computadorizada de Abdome com Contraste Venoso e Oral Hidrossolúvel:</strong> É o método diagnóstico de maior acurácia (sensibilidade &gt; 98%). Identifica quantidades milimétricas de gás livre intraperitoneal ou retroperitoneal, espessamento focal da parede duodenal, extravasamento de contraste no ponto exato da perfuração e coleções líquidas purulentas periduodenais e no recesso de Morrison.</li>
</ul>

<h3>Conduta Cirúrgica: A Técnica do Patch de Graham (Úlcerorrafia com Omentoplastia)</h3>
<p>A abordagem cirúrgica de emergência (por laparoscopia ou laparotomia mediana supraumbilical) deve ser deflagrada tão logo o paciente receba ressuscitação volêmica vigorosa, antibióticos de amplo espectro cobrindo Gram-negativos e anaeróbios (como Ceftriaxona + Metronidazol ou Piperacilina-Tazobactam) e IBP venoso.</p>

<div class="clinical-box info-box">
  <h4>A Cirurgia do Patch de Graham Passo a Passo</h4>
  <p>Descrita originalmente por Roscoe Graham em 1937, a técnica consiste em:</p>
  <ol>
    <li>Localização precisa do orifício de perfuração péptica na parede anterior do bulbo duodenal ou antro gástrico;</li>
    <li><strong>Sutura Primária / Chuleio com Fios Inabsorvíveis ou de Absorção Lenta (ex: Polipropileno 3-0 ou Poliglactina/Vicryl 3-0):</strong> Passam-se três a quatro pontos simples separados transfixando todas as camadas de borda sã da úlcera, sem dar os nós imediatamente (para evitar a ruptura das bordas friáveis e edemaciadas);</li>
    <li><strong>Omentoplastia Pediculada (Patch de Omento):</strong> Mobiliza-se uma lingueta vascularizada de grande omento sadio (epíplon) e posiciona-se esse segmento adiposo sobre o defeito perfurado;</li>
    <li>Amarram-se os fios previamente passados sobre o pedículo de omento, ancorando o omento firmemente contra a úlcera, criando um tampão biológico vascularizado hermético de altíssima capacidade cicatrizante;</li>
    <li><strong>Lavagem Abdominal Ampla e Esfoliação Peritoneal:</strong> Irrigação exaustiva de toda a cavidade abdominal e pelve com soro fisiológico morno (comumente 5 a 10 litros) para remoção completa de restos alimentares, fibrina e secreções purulentas;</li>
    <li><strong>Drenagem da Cavidade:</strong> Posicionamento de dreno tubular laminar ou fechado (dreno de Jackson-Pratt ou tubular) adjacente à rafia duodenal e na goteira parietocólica direita.</li>
  </ol>
</div>

<p><strong>Biópsia da Úlcera:</strong> Se a perfuração for de localização <strong>GÁSTRICA</strong>, é <strong>obrigatória a realização de biópsia em cunha das bordas da úlcera</strong> antes do fechamento com o patch para afastar adenocarcinoma gástrico perfurado. Em perfurações puramente <strong>DUODENAIS</strong>, a biópsia é dispensada pela raridade extrema de malignidade duodenal.</p>
`
  },
  {
    id: 'estenose-pilorica-e-obstrucao-peptica',
    title: '6. Estenose Pilórica e Síndrome de Obstrução do Trato de Saída Gástrico',
    body_html: `
<p>A estenose pilórica péptica ocorre como consequência crônica de múltiplos ciclos repetidos de ulceração ativa, inflamação transmural, cicatrização e aposição de colágeno fibrótico inelástico no canal pilórico e primeiro segmento duodenal, culminando no estreitamento luminal progressivo irreversível do trato de saída gástrico (GOO - <em>Gastric Outlet Obstruction</em>).</p>

<h3>Quadro Clínico e Alterações Metabólicas Clássicas</h3>
<ul>
  <li><strong>Vômitos Tardios com Alimentos Não Digeridos:</strong> O paciente relata plenitude pós-prandial precoce, náuseas e vômitos volumosos de repetição contendo restos alimentares ingeridos há mais de 12 a 24 horas, com <strong>ausência completa de bile (vômitos não biliosos)</strong>, uma vez que a obstrução situa-se proximalmente à papila duodenal maior (onde desemboca a bile);</li>
  <li><strong>Sinal do Basculho Gástrico (Sucussão Hipocrática):</strong> Ausculta de ruído de flacidez líquida/hidroaérea ao sacudir suavemente a parede abdominal do paciente em jejum há mais de 4 a 6 horas, revelando estômago maciçamente ectasiado e atônico;</li>
  <li><strong>Desidratação e Perda Ponderal:</strong> Emagrecimento progressivo por inanição e intolerância alimentar persistente.</li>
</ul>

<h3>Distúrbio Hidroeletrolítico e Ácido-Básico Patognomônico</h3>
<div class="clinical-box warning-box">
  <h4>Conceito Mais Cobrado em Provas de Cirurgia e Clínica Médica</h4>
  <p>A perda volumosa e repetida de secreção gástrica pura pelos vômitos provoca uma tríade metabólica característica:</p>
  <p><strong>ALCALOSE METABÓLICA HIPOCLORÊMICA E HIPOCALÊMICA COM ACIDÚRIA PARADOXAL</strong>.</p>
  <ul>
    <li><strong>Hipoclorêmica e Alcalose Metabólica:</strong> Perda massiva de ácido clorídrico (H+ e Cl-) do suco gástrico. Para compensar a perda de ânions cloreto no plasma, os rins reabsorvem mais bicarbonato (HCO3-), gerando alcalose metabólica severa;</li>
    <li><strong>Hipocalêmica:</strong> A hipovolemia sistêmica ativa intensamente o eixo renina-angiotensina-aldosterona (hiperaldosteronismo secundário). No túbulo contorcido distal e coletor renal, a aldosterona tenta reter sódio e água excretando potássio (K+), esgotando as reservas de potássio corporais;</li>
    <li><strong>Acidúria Paradoxal:</strong> Com a hipocalemia extrema prolongada, os túbulos renais esgotam todo o potássio intracelular disponível para troca com o sódio. Para manter a reabsorção vital de sódio, as células tubulares renais são forçadas a secretar íons hidrogênio (H+) na urina. Assim, <strong>a urina torna-se paradoxalmente ácida em um paciente em franca alcalose metabólica sistêmica grave</strong>!</li>
  </ul>
</div>

<h3>Manejo Clínico Inicial e Opções Terapêuticas</h3>
<ol>
  <li><strong>Descompressão e Lavagem Gástrica:</strong> Passagem de sonda nasogástrica calibrosa (Faucher ou Levine 18-20 Fr) com lavagem salina copiosa para drenar o estômago atônico repleto de resíduos alimentares e restabelecer o tônus da muscular gástrica;</li>
  <li><strong>Correção Hidroeletrolítica Rigorosa:</strong> Infusão vigorosa de <strong>Soro Fisiológico a 0,9% enriquecido com Cloreto de Potássio (KCl)</strong>. A infusão de cloreto e potássio é indispensável para que o rim volte a excretar o excesso de bicarbonato e corrija a alcalose e a acidúria paradoxal;</li>
  <li><strong>Dilatação Endoscópica com Balão Hidrostático:</strong> Tratamento inicial minimamente invasivo de escolha nos centros modernos. Realiza-se dilatação seriada do piloro sob controle endoscópico e radiológico (balões de 12 a 18 mm), alcançando sucesso inicial em 70% a 80% dos casos;</li>
  <li><strong>Tratamento Cirúrgico Definitivo:</strong> Indicado nos casos refratários a 2 ou 3 sessões de dilatação endoscópica, ou na presença de fibrose periduodenal densa. As opções consagradas incluem:
    <ul>
      <li><strong>Antrectomia com Reconstrução em Y de Roux ou Billroth II associada a Vagotomia Troncular;</strong></li>
      <li><strong>Gastroenterostomia (Gastrojejunostomia em Y de Roux ou alça pré-cólica)</strong> com ou sem vagotomia troncular, técnica segura que restaura o trânsito digestivo contornando o bloco estenótico piloroduodenal.</li>
    </ul>
  </li>
</ol>
`
  },
  {
    id: 'erradicacao-h-pylori-e-terapia-farmacologica',
    title: '7. Tratamento Clínico, Regimes Contemporâneos de Erradicação do Helicobacter pylori e Profilaxia',
    body_html: `
<p>A erradicação bem-sucedida do <em>Helicobacter pylori</em> altera radicalmente a história natural da doença ulcerosa péptica, reduzindo as taxas de recidiva anual de mais de 70% para menos de 5% a 10%, além de prevenir complicações hemorrágicas e proteger contra o câncer gástrico.</p>

<h3>Regimes Terapêuticos de Erradicação do H. pylori (Consenso Brasileiro de 2024 / Diretrizes de Maastricht VI)</h3>
<p>Devido ao aumento alarmante da resistência primária da bactéria à claritromicina no Brasil e no mundo ocidental (&gt; 15% a 20%), os esquemas terapêuticos foram atualizados:</p>

<table class="book-table">
  <thead>
    <tr>
      <th>Esquema Terapêutico</th>
      <th>Composição Farmacológica e Posologia Exata</th>
      <th>Duração Obrigatória</th>
      <th>Indicação Clínica e Contexto</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>Terapia Quádrupla sem Bismuto (Concomitante) — Esquema de Primeira Linha Preferencial</strong></td>
      <td>
        • <strong>IBP em dose dobrada:</strong> Omeprazol 20 mg (ou Esomeprazol 40 mg) de 12/12h<br>
        • <strong>Amoxicilina:</strong> 1.000 mg de 12/12h<br>
        • <strong>Claritromicina:</strong> 500 mg de 12/12h<br>
        • <strong>Metronidazol:</strong> 500 mg de 12/12h
      </td>
      <td><strong>14 dias</strong></td>
      <td>Esquema empírico de primeira linha preferencial em regiões com resistência intermediária ou desconhecida à claritromicina. Taxas de erradicação &gt; 90%.</td>
    </tr>
    <tr>
      <td><strong>Terapia Quádrupla com Bismuto — Esquema Padrão-Ouro Alternativo / Segunda Linha</strong></td>
      <td>
        • <strong>IBP em dose dobrada:</strong> Omeprazol 20 mg de 12/12h<br>
        • <strong>Subcitrato ou Subsalicilato de Bismuto:</strong> 120-240 mg 4x ao dia<br>
        • <strong>Tetraciclina:</strong> 500 mg 4x ao dia<br>
        • <strong>Metronidazol:</strong> 500 mg 3x ao dia (ou 400 mg 4x ao dia)
      </td>
      <td><strong>14 dias</strong></td>
      <td>Excelente opção para pacientes alérgicos à penicilina/amoxicilina ou como terapia de resgate após falha do esquema contendo claritromicina. O bismuto exerce ação bactericida tópica direta.</td>
    </tr>
    <tr>
      <td><strong>Terapia Tripla Padrão Clássica (Uso Restrito)</strong></td>
      <td>
        • <strong>IBP:</strong> Omeprazol 20 mg de 12/12h<br>
        • <strong>Amoxicilina:</strong> 1.000 mg de 12/12h<br>
        • <strong>Claritromicina:</strong> 500 mg de 12/12h
      </td>
      <td><strong>14 dias</strong> (antigamente 7-10 dias)</td>
      <td>Permitida apenas em áreas comprovadamente com taxas de resistência bacteriana à claritromicina inferiores a 15%. Na prática brasileira contemporânea, tem sido progressivamente substituída pelos regimes quádruplos.</td>
    </tr>
  </tbody>
</table>

<h3>Controle de Cura da Erradicação</h3>
<div class="clinical-box info-box">
  <h4>Regras para o Teste de Controle de Erradicação</h4>
  <ul>
    <li>O teste de controle de cura deve ser realizado <strong>no mínimo 4 a 8 semanas após o término dos antibióticos</strong> E após <strong>pelo menos 2 a 4 semanas de suspensão de qualquer IBP</strong> (para evitar resultados falso-negativos por inibição bacteriana transitória);</li>
    <li><strong>Métodos Não Invasivos de Escolha:</strong> Teste respiratório com ureia marcada com carbono-13 (C13-UBT) ou Pesquisa de Antígeno Fecal monoclonal;</li>
    <li><strong>Sorologia (IgG anti-H. pylori) NUNCA deve ser usada para controle de cura</strong>, pois os anticorpos séricos permanecem positivos por meses a anos após a erradicação bacteriana bem-sucedida!</li>
  </ul>
</div>
`
  },
  {
    id: 'casos-clinicos-e-questoes-comentadas',
    title: '8. Casos Clínicos Desafiadores e Questões Comentadas de Alto Rendimento',
    body_html: `
<div class="case-study">
  <h4>Caso Clínico 1: Choque Hemorrágico por Úlcera Duodenal</h4>
  <p><strong>História:</strong> Homem de 58 anos, tabagista e cardiopata em uso de AAS 100 mg/dia, admitido no pronto-socorro com história de dois episódios de hematêmese volumosa com sangue vivo e fraqueza há 3 horas. Apresenta-se sudorético, pálido +++/4+, PA: 80x45 mmHg, FC: 128 bpm.</p>
  <p><strong>Conduta Inicial:</strong>
  1. Estabilização hemodinâmica imediata com infusão rápida de 1.000 mL de Ringer Lactato por dois acessos 14G, oxigênio suplementar e tipagem sanguínea com prova cruzada.<br>
  2. Administração de Omeprazol bolus 80 mg EV seguido de infusão contínua a 8 mg/h.<br>
  3. Hemoglobina inicial de 6,8 g/dL: prescrição de concentrado de hemácias com alvo restritivo de 7 a 8 g/dL.<br>
  4. Após estabilização clínica com PA: 110x70 mmHg e FC: 96 bpm, realizada EDA de urgência que revela úlcera de 18 mm na parede posterior do bulbo duodenal com sangramento em jato arterial ativo (<strong>Forrest Ia</strong>).<br>
  5. Realizada terapia endoscópica combinada: injeção de adrenalina 1:10.000 na base para hemostasia temporária e posicionamento de dois clipes metálicos hemostáticos diretamente no vaso sangrante com cessação total da hemorragia.<br>
  6. Paciente mantido em UTI sob IBP venoso por 72 horas, sem intercorrências, recebendo alta hospitalar em uso de IBP oral e esquema quádruplo para erradicação do <em>H. pylori</em>.</p>
</div>

<div class="question-block">
  <h4>Questão de Concurso 1 (USP / Cirurgia Geral)</h4>
  <p>Mulher de 72 anos, usuária crônica de cetoprofeno para osteoartrite de joelhos, dá entrada no pronto-socorro com dor abdominal súbita de fortíssima intensidade iniciada há 4 horas, em facada, generalizada por todo o abdome. Ao exame físico: fácies de sofrimento, PA: 100x60 mmHg, FC: 112 bpm, abdome francamente em tábua com descompressão brusca dolorosa em todos os quadrantes. A radiografia de tórax em ortostase revela presença de ar sob as duas cúpulas diafragmáticas (pneumoperitônio). Assinale a conduta cirúrgica mais apropriada após a ressuscitação inicial:</p>
  <p>A) Endoscopia digestiva alta de urgência com injeção de cianoacrilato para selamento do orifício de perfuração.<br>
  B) Laparoscopia ou laparotomia exploradora com úlcerorrafia primária protegida por omentoplastia pediculada (patch de Graham) e lavagem peritoneal ampla.<br>
  C) Gastrectomia total com reconstrução em Y de Roux devido à etiologia induzida por anti-inflamatórios.<br>
  D) Tratamento conservador exclusivo com passagem de sonda nasogástrica, jejum e antibióticos endovenosos por 14 dias.<br>
  E) Vagotomia troncular associada a antrectomia imediata sem sutura do orifício perfurado.</p>
  <p><strong>Gabarito Comentado:</strong> <strong>Alternativa B</strong>. Trata-se de perfuração péptica livre com peritonite purulenta aguda. A conduta padrão é o procedimento de Graham (sutura simples associada a patch de omento vascularizado) e irrigação abundante da cavidade peritoneal (elimina A, D). A EDA é formalmente contraindicada em abdome agudo perfurativo pelo risco de insuflação de ar na cavidade livre. Não há indicação de gastrectomia total para perfuração péptica simples (elimina C).</p>
</div>

<div class="question-block">
  <h4>Questão de Concurso 2 (ENARE / Residência Médica)</h4>
  <p>Em relação à Classificação de Forrest para lesões pépticas sangrantes à endoscopia digestiva alta, assinale a opção que descreve uma lesão classificada como Forrest IIa e sua respectiva conduta obrigatória:</p>
  <p>A) Sangramento arterial ativo em jato; indicação de terapia combinada com injeção de adrenalina associada a clipe mecânico ou método térmico.<br>
  B) Coágulo firmemente aderido à base da cratera ulcerosa; indicação de alta hospitalar imediata com IBP oral em dose dobrada.<br>
  C) Vaso visível não sangrante na base da úlcera; indicação mandatória de hemostasia endoscópica combinada associada a IBP venoso contínuo.<br>
  D) Base da úlcera limpa revestida por fibrina esbranquiçada; indicação de hemostasia com hemoclipes metálicos e internação em UTI por 72 horas.<br>
  E) Sangramento difuso em babação; contraindicação absoluta de métodos hemostáticos mecânicos.</p>
  <p><strong>Gabarito Comentado:</strong> <strong>Alternativa C</strong>. A classificação de Forrest IIa corresponde exatamente ao "vaso visível não sangrante", que apresenta risco de ressangramento de 40% a 50% se não tratado, demandando terapia hemostática endoscópica imediata (elimina B, D). Sangramento em jato é Forrest Ia (elimina A); base limpa é Forrest III (elimina D); sangramento em babação é Forrest Ib e DEVE ser tratado (elimina E).</p>
</div>

<div class="question-block">
  <h4>Questão de Concurso 3 (UNICAMP / Cirurgia Geral)</h4>
  <p>Paciente masculino de 48 anos com história de úlcera péptica duodenal crônica de difícil cicatrização procura o ambulatório com vômitos frequentes contendo restos alimentares de refeições ingeridas no dia anterior, sem bile, associados a perda de 8 kg em 2 meses. Exames laboratoriais revelam pH sanguíneo de 7,52, bicarbonato de 36 mEq/L, cloreto de 82 mEq/L, potássio de 2,8 mEq/L e sódio de 132 mEq/L. A urinálise demonstra urina com pH ácido (5,2). Esse quadro é compatível com síndrome de obstrução pilórica péptica. A explicação fisiopatológica correta para a presença de urina ácida em um paciente com alcalose sistêmica é:</p>
  <p>A) Aumento da filtração glomerular de ácido clorídrico decorrente da hipercloremia plasmática grave.<br>
  B) Excreção renal compensatória de íons hidrogênio para reabsorver sódio no túbulo distal perante a depleção profunda de potássio corporal (acidúria paradoxal).<br>
  C) Inibição completa da secreção de aldosterona causada pela hipovolemia sistêmica severa.<br>
  D) Presença concomitante de cetoacidose diabética descompensada gerando acidose metabólica primária oculta.<br>
  E) Hipoperfusão medular renal levando à necrose tubular aguda com incapacidade de reabsorver bicarbonato.</p>
  <p><strong>Gabarito Comentado:</strong> <strong>Alternativa B</strong>. O distúrbio clássico da obstrução pilórica é a alcalose metabólica hipoclorêmica e hipocalêmica com <em>acidúria paradoxal</em>. Perante a hipovolemia severa e a depleção extrema de potássio provocada pelo hiperaldosteronismo secundário, o túbulo renal não possui mais potássio intracelular para trocar com o sódio filtrado e é obrigado a secretar íons H+ na urina para recuperar sódio, acidificando paradoxalmente a urina.</p>
</div>
`
  },
  {
    id: 'sintese-pratica-e-referencias',
    title: '9. Síntese Prática, Fluxograma de Conduta e Referências Bibliográficas',
    body_html: `
<div class="summary-box">
  <h4>Guia de Conduta Rápida na Úlcera Péptica e Complicações</h4>
  <ul>
    <li><strong>Fisiopatologia:</strong> Duodenal (hipersecreção ácida, jovens, predomínio antral de <em>H. pylori</em>); Gástrica (hipo/normossecreção com falha defensiva da mucosa, idosos, AINEs).</li>
    <li><strong>Classificação de Johnson:</strong> Tipo I (pequena curvatura/incisura angularis - hipocloridria, mais comum); Tipo II (gástrica + duodenal concomitante - hipercloridria); Tipo III (pré-pilórica - hipercloridria); Tipo IV (alta pequena curvatura/justa-cárdica - hipocloridria); Tipo V (induzida por AINEs/AAS, qualquer localização).</li>
    <li><strong>Toda úlcera gástrica exige múltiplas biópsias</strong> (6-8 fragmentos) e EDA de controle em 8-12 semanas para excluir câncer gástrico.</li>
    <li><strong>Classificação de Forrest:</strong> Alto risco (Ia - jato, Ib - babação, IIa - vaso visível, IIb - coágulo aderido) exigem EDA terapêutica combinada (adrenalina + clipe/térmico) e IBP venoso contínuo por 72h. Baixo risco (IIc - hematina, III - base limpa) tratam-se com IBP oral.</li>
    <li><strong>HDA:</strong> Alvo transfusional restritivo (Hb 7 a 8 g/dL). Não usar adrenalina isolada! Segunda EDA no ressangramento; falha = embolização angiográfica ou cirurgia.</li>
    <li><strong>Perfuração Péptica:</strong> Parede anterior do duodeno ou pequena curvatura; dor súbita em facada, abdome em tábua, sinal de Jobert e pneumoperitônio. Conduta: ressuscitação, antibióticos e <strong>Patch de Graham</strong> (sutura simples + omentoplastia pediculada vascularizada). Biópsia obrigatória se úlcera gástrica!</li>
    <li><strong>Estenose Pilórica:</strong> Vômitos tardios não biliosos com alimentos ingeridos horas antes. Distúrbio: <strong>alcalose metabólica hipoclorêmica e hipocalêmica com acidúria paradoxal</strong>. Tratar com SF 0,9% + KCl, descompressão por SNG e dilatação por balão ou antrectomia/gastrojejunostomia.</li>
    <li><strong>Erradicação de H. pylori:</strong> Esquema quádruplo sem bismuto (IBP + Amoxicilina + Claritromicina + Metronidazol por 14 dias) ou com bismuto. Controle de cura após 4-8 semanas com teste respiratório ou antígeno fecal, SEM usar sorologia!</li>
  </ul>
</div>

<h3>Referências Bibliográficas Fundamentais</h3>
<ol>
  <li>Laine L, Barkun AN, Saltzman JR, Martel M, Leontiadis GI. ACG Clinical Guideline: Upper Gastrointestinal and Ulcer Bleeding. <em>Am J Gastroenterol</em>. 2021;116(5):899-917.</li>
  <li>Malfertheiner P, Megraud F, Rokkas T, et al. Management of Helicobacter pylori infection: the Maastricht VI/Florence consensus report. <em>Gut</em>. 2022;71(12):1724-1762.</li>
  <li>Coelho LGV, Marinho JR, Genta R, et al. IVth Brazilian Consensus Conference on Helicobacter pylori infection. <em>Arq Gastroenterol</em>. 2018;55(2):97-121.</li>
  <li>Villanueva C, Colomo A, Bosch A, et al. Transfusion strategies for acute upper gastrointestinal bleeding. <em>N Engl J Med</em>. 2013;368(1):11-21.</li>
  <li>Tarres CM, et al. Surgical management of perforated peptic ulcer disease: Graham patch versus alternatives. <em>World J Emerg Surg</em>. 2020;15:38.</li>
</ol>
`
  }
];

const finalSections = [
  baseSections[0],
  secUlceraExpansao[0],
  secUlceraExpansao3[0],
  baseSections[1],
  secUlceraExpansao5[0],
  baseSections[2],
  secUlceraExpansao3[1],
  baseSections[3],
  secUlceraExpansao[1],
  secUlceraExpansao2[0],
  baseSections[4],
  baseSections[5],
  baseSections[6],
  secUlceraExpansao4[0],
  secUlceraExpansao[2],
  baseSections[7],
  secUlceraExpansao2[1],
  secUlceraExpansao4[1],
  secUlceraExpansao6[0],
  baseSections[8]
];

const bookData = {
  slug,
  title: 'Úlcera Péptica e Complicações Cirúrgicas',
  subtitle: 'Fisiopatologia de Johnson, H. pylori, AINEs, classificação de Forrest, conduta na HDA, perfuração e estenose pilórica',
  area: 'Cirurgia Geral',
  materia: 'Cirurgia do Aparelho Digestivo e Emergências Cirúrgicas',
  sections: finalSections
};

saveBook(slug, bookData);

const indexPath = path.join(process.cwd(), 'apostilas', slug, 'index.html');
const html = fs.readFileSync(indexPath, 'utf-8');
const chars = countUsefulChars(html);
console.log(`[AULA 142 - SUCESSO] ${slug} compilado: ${chars} caracteres úteis.`);
