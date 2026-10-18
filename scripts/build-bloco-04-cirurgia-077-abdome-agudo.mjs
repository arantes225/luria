import { saveBook } from './bloco-04-utils.mjs';

const book = {
  slug: 'abdome-agudo-abordagem-inicial',
  title: 'Abdome Agudo: Abordagem Inicial',
  area: 'Cirurgia Geral',
  materia: 'Cirurgia Geral e Urgências Abdominais',
  description: 'Tratado completo de Abordagem Inicial do Abdome Agudo para concursos de Residência Médica e ENAMED: definição conceitual e neuroanatomia da dor abdominal (dor visceral por fibras C amielínicas com localização embriológica na linha média; dor somática/parietal por fibras A-delta com peritonismo localizado e defesa muscular; dor referida e sinal de Kehr); as 5 grandes síndromes cirúrgicas: inflamatório (apendicite, colecistite, diverticulite), perfurativo (úlcera péptica perfurada, diverticulite perfurada com pneumoperitônio e sinais de Joubert, Popper e Rigler), obstrutivo (bridas, volvo, hérnias estranguladas e neoplasias colônicas com níveis hidroaéreos e empilhamento de moedas), isquêmico/vascular (isquemia mesentérica aguda com dor desproporcional ao exame físico, acidose lática grave e fibrilação atrial) e hemorrágico (gravidez ectópica rota, rotura esplênica/hepática e aneurisma de aorta abdominal roto); propedêutica armada sequencial com a rotina clássica de abdome agudo no Rx (tórax PA, abdome em ortostase e decúbito dorsal; raio horizontal em decúbito lateral esquerdo), ultrassonografia / POCUS e tomografia computadorizada multislice com contraste iodado; indicações formais de laparotomia imediata vs laparoscopia diagnóstica; 4 casos clínicos estruturados e questões comentadas na íntegra.',
  sections: [
    {
      id: 'definicao-e-principios-gerais',
      title: '1. Definição Conceitual, Epidemiologia e Princípios Gerais do Abdome Agudo',
      body_html: `
<h3>Conceito e Definição Médica do Abdome Agudo</h3>
<p>O <strong>abdome agudo</strong> define-se como uma síndrome clínica caracterizada por dor abdominal de início súbito, intensidade moderada a grave e duração tipicamente inferior a 7 dias (frequentemente com evolução inferior a 24 a 48 horas), que demanda avaliação médica urgente, diagnóstico etiológico precoce e tomada de decisão rápida quanto à necessidade imperiosa de intervenção cirúrgica de emergência versus tratamento conservador/medicamentoso.</p>
<p>Na prática cirúrgica, o abdome agudo representa uma das apresentações mais frequentes e desafiadoras nos serviços de pronto-atendimento hospitalar, respondendo por aproximadamente 5% a 10% de todas as admissões em unidades de emergência no Brasil e no mundo. Atrasos diagnósticos ou hesitações na conduta operatória associam-se a curvas dramáticas de aumento da morbidade pós-operatória, choque séptico ou hemorrágico irreversível, síndrome de disfunção de múltiplos órgãos (MODS) e óbito.</p>

<h3>Classificação Geral: Abdome Agudo Cirúrgico vs Abdome Agudo Clínico</h3>
<p>Um dos preceitos mais consolidados da propedêutica cirúrgica é a diferenciação mandatória entre as causas cirúrgicas e as causas <em>clínicas/médicas</em> de dor abdominal aguda. Realizar uma laparotomia branca ou desnecessária em um paciente com abdome agudo de etiologia médica (ex: cetoacidose diabética, porfiria intermitente aguda ou infarto do miocárdio de parede inferior) impõe estresse anestésico-cirúrgico gravíssimo com mortalidade elevada:</p>
<table class="book-table">
  <thead>
    <tr>
      <th>Etiologia Clínica (Não Cirúrgica)</th>
      <th>Fisiopatologia da Dor Abdominal Simuladora</th>
      <th>Pistas Diagnósticas Fundamentais no Exame Clínico/Laboratorial</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>Cetoacidose Diabética (CAD)</strong></td>
      <td>Desidratação celular, gastroparesia aguda por hipocalemia/hiperosmolaridade e estiramento da cápsula de Glisson hepática.</td>
      <td>Hiperglicemia grave (&gt; 250 mg/dL), cetonúria/cetonemia, respiração de Kussmaul, hálito cetônico e dor difusa sem peritonismo verdadeiro. A dor abdominal desaparece completamente com hidratação e insulinoterapia.</td>
    </tr>
    <tr>
      <td><strong>Infarto Agudo do Miocárdio (IAM de Parede Inferior)</strong></td>
      <td>Isquemia miocárdica com dor referida no epigástrio via fibras simpáticas cardíacas compartilhadas com raízes torácicas inferiores (T1-T5).</td>
      <td>Idoso, hipertenso, diabético; dor epigástrica associada a náuseas, diaforese fria e hipotensão. ECG com supradesnivelamento de ST em DII, DIII e aVF; elevação de troponina.</td>
    </tr>
    <tr>
      <td><strong>Pneumonia Lobar Inferior (Basal)</strong></td>
      <td>Inflamação da pleura parietal diafragmática inervada pelos nervos intercostais inferiores (T7-T11), projetando dor em hipocôndrio direito ou esquerdo.</td>
      <td>Febre alta, tosse produtiva, taquipneia, estertores crepitantes localizados em base pulmonar; RX de tórax revela consolidação alveolar com broncograma aéreo.</td>
    </tr>
    <tr>
      <td><strong>Crise Falcêmica (Crise de Sequestro / Vaso-Oclusão)</strong></td>
      <td>Vaso-oclusão microvascular mesentérica e infartos ósseos ou esplênicos repetidos por hemácias falcizadas em pacientes com anemia falciforme (HbSS).</td>
      <td>Criança ou jovem negro, palidez mucocutânea intensa, icterícia escleral, dores ósseas concomitantes e reticulocitose acentuada.</td>
    </tr>
    <tr>
      <td><strong>Porfiria Aguda Intermitente (PAI)</strong></td>
      <td>Deficiência da porfobilinogênio desaminase com acúmulo neurotóxico de ALA e PBG, causando neuropatia autonômica visceral intensa.</td>
      <td>Dor abdominal em cólica intensa, desproporcional ao exame físico, sem irritação peritoneal, associada a constipação grave, neuropatia periférica motora, alterações psiquiátricas e urina que escurece à luz ("vinho tinto").</td>
    </tr>
    <tr>
      <td><strong>Saturnismo (Intoxicação por Chumbo)</strong></td>
      <td>Espasmo doloroso da musculatura lisa intestinal por inibição enzimática celular pelo chumbo.</td>
      <td>História ocupacional (baterias, fundições, tintas antigas); cólica saturnina violenta, linha gengival azulada (linha de Burton), anemia microcítica com pontilhado basófilo.</td>
    </tr>
    <tr>
      <td><strong>Insuficiência Adrenal Aguda (Crise Addisoniana)</strong></td>
      <td>Déficit de cortisol e aldosterona com hipoperfusão esplâncnica, hipercalemia e hipotensão refratária.</td>
      <td>Hipotensão postural/choque refratário a aminas vasoativas, hiponatremia, hipercalemia, hipoglicemia e hiperpigmentação cutânea prévia.</td>
    </tr>
  </tbody>
</table>
`
    },
    {
      id: 'neuroanatomia-da-dor-abdominal',
      title: '2. Neuroanatomia e Fisiologia da Dor Abdominal: Visceral, Somática/Parietal e Referida',
      body_html: `
<h3>As Três Dimensões Neuroanatômicas da Dor Abdominal</h3>
<p>A compreensão minuciosa das vias neurais aferentes que inervam as vísceras intra-abdominais e a parede parietal do peritônio constitui a base mais refinada do raciocínio semiológico do cirurgião. Todo o diagnóstico sindrômico e a evolução temporal das queixas repousam na distinção entre <strong>dor visceral</strong>, <strong>dor somática/parietal</strong> e <strong>dor referida</strong>:</p>

<h3>1. Dor Visceral (Esplâncnica ou Profunda)</h3>
<ul>
  <li><strong>Mecanismo Neurofisiológico:</strong> É deflagrada pela estimulação de nociceptores localizados na parede das vísceras ocas e nas cápsulas dos órgãos sólidos parenquimatosos. Os estímulos nocivos específicos para a dor visceral são:
    <ul>
      <li><strong>Distensão mecânica súbita ou aumento de tensão parietal</strong> (ex: obstrução intraluminal de delgado, cólica biliar por cálculo impactado no cístico, cólica nefrética por cálculo ureteral);</li>
      <li><strong>Espasmo ou contração muscular vigorosa</strong> da musculatura lisa visceral contra uma resistência;</li>
      <li><strong>Isquemia tecidual / hipóxia</strong> por oclusão vascular ou trombose;</li>
      <li><strong>Inflamação química e tração mesentérica</strong>.</li>
      <li><em>Importante:</em> O peritônio visceral e as vísceras são completamente insensíveis a estímulos físicos cortantes, térmicos ou perfurantes (cortar, pinçar ou queimar a mucosa do intestino durante procedimentos não gera dor consciente!).</li>
    </ul>
  </li>
  <li><strong>Tipo de Fibra Nervosa Transmissora:</strong> Fibras do <strong>Tipo C amielínicas</strong> de condução lenta (velocidade de 0,5 a 2 m/s). Essas fibras acompanham os plexos simpáticos autonômicos (esplâncnicos) e penetram a medula espinhal bilateralmente através de múltiplas raízes sensitivas dorsais;</li>
  <li><strong>Características Clínicas da Dor Visceral:</strong>
    <ul>
      <li><strong>Dor surda, vaga, imprecisa, mal delimitada e difusa</strong>, descrita pelo paciente como queimação profunda, peso, aperto ou cólica ("aponta a dor espalmando a mão sobre o centro do abdome");</li>
      <li><strong>Localização Topográfica Embriológica Estrita na Linha Média:</strong> Devido à inervação bilateral simétrica e ao fato de o trato digestivo primitivo ser uma estrutura tubular medial única na embriogênese, a dor visceral é sempre percebida na linha média do abdome, correspondendo à origem embriológica do órgão afetado:
        <ol>
          <li><strong>Intestino Anterior (Foregut):</strong> Esôfago distal, estômago, duodeno proximal (até a ampola de Vater), fígado, vesícula biliar e pâncreas. <em>Topografia da dor:</em> <strong>Epigástrio</strong> (segmentos medulares T5 a T8);</li>
          <li><strong>Intestino Médio (Midgut):</strong> Duodeno distal, jejuno, íleo, apêndice cecal, ceco, cólon ascendente e os dois terços proximais do cólon transverso. <em>Topografia da dor:</em> <strong>Região Periumbilical / Mesogástrio</strong> (segmentos medulares T9 a T11);</li>
          <li><strong>Intestino Posterior (Hindgut):</strong> Terço distal do cólon transverso, cólon descendente, sigmoide, reto e bexiga. <em>Topografia da dor:</em> <strong>Hipogástrio</strong> (segmentos medulares T11 a L1);</li>
        </ol>
      </li>
      <li><strong>Sintomas Autonômicos Neurovegetativos Ricos:</strong> Como as fibras aferentes C estimulam intensamente os centros autonômicos do tronco encefálico, a dor visceral é quase invariavelmente acompanhada por náuseas, vômitos, sudorese fria profusa, palidez cutânea, taquicardia ou bradicardia reflexa e inquietação motora (o paciente com cólica nefrética ou biliar rola na maca buscando uma posição de alívio sem sucesso).</li>
    </ul>
  </li>
</ul>

<h3>2. Dor Somática ou Parietal (Cérebro-Espinhal)</h3>
<ul>
  <li><strong>Mecanismo Neurofisiológico:</strong> É deflagrada quando o processo patológico ultrapassa a serosa visceral e atinge o <strong>peritônio parietal anterior e posterior</strong>, o diafragma ou o mesentério periférico. Estímulos típicos: inflamação bacteriana bacteriolítica direta, contato com bile, suco gástrico ácido clorídrico, fezes, sangue ou urina;</li>
  <li><strong>Tipo de Fibra Nervosa Transmissora:</strong> Fibras do <strong>Tipo A-delta mielínicas</strong> de condução rápida (velocidade de 6 a 30 m/s). Essas fibras trafegam diretamente pelos nervos sensitivos cérebro-espinhais periféricos (nervos intercostais inferiores T7-T12 e raízes lombares L1);</li>
  <li><strong>Características Clínicas da Dor Somática:</strong>
    <ul>
      <li><strong>Dor aguda, pontual, cortante, lancinante ("em facada") e de altíssima intensidade</strong>;</li>
      <li><strong>Localização Precisa e Bem Delimitada:</strong> O paciente consegue apontar com a ponta de um único dedo o local exato da dor (coincide perfeitamente com a projeção anatômica do foco patológico subjacente);</li>
      <li><strong>Sinais Clássicos de Irritação Peritoneal (Peritonismo):</strong> A estimulação dos nervos sensitivos parietais deflagra arcos reflexos motores espinhais imediatos:
        <ol>
          <li><strong>Defesa Muscular Involuntária:</strong> Contração espasmódica tônica da musculatura da parede abdominal que não cede à distração ou expiração suave; nos casos graves de peritonite química generalizada (úlcera péptica perfurada), a contratura é global e pétrea, caracterizando o célebre <strong>"abdome em tábua"</strong>;</li>
          <li><strong>Descompressão Dolorosa Brusca (Sinal de Blumberg generalizado ou localizado):</strong> Ao comprimir profundamente a parede abdominal e soltar a mão de forma abrupta, as duas lâminas do peritônio inflamado friccionam-se com velocidade, deflagrando um pico lancinante de dor;</li>
          <li><strong>Agravação pelo Movimento:</strong> O paciente com dor somática/parietal permanece absolutamente imóvel no leito, com os joelhos fletidos (para relaxar a tensão muscular abdominal), evitando qualquer tosse, respiração profunda ou sobressalto da maca, pois qualquer deslocamento do peritônio intensifica dramaticamente o sofrimento.</li>
        </ol>
      </li>
    </ul>
  </li>
</ul>

<h3>3. Dor Referida</h3>
<p>Define-se como a sensação dolorosa percebida em um local cutâneo ou anatômico distante do órgão acometido pela lesão original. Resulta da <strong>convergência de fibras aferentes viscerais profundas e fibras sensitivas somáticas cutâneas sobre os mesmos neurônios de segunda ordem no corno posterior da substância cinzenta da medula espinhal</strong>. Como o córtex cerebral está habituado a processar informações da superfície cutânea (somatotopia bem desenvolvida), ele interpreta erroneamente o sinal nociceptivo como originário do dermátomo cutâneo correspondente:</p>
<table class="book-table">
  <thead>
    <tr>
      <th>Epônimo / Padrão de Dor Referida</th>
      <th>Origem Patológica Real (Órgão Acometido)</th>
      <th>Localização da Dor Percebida e Dermátomo Correlato</th>
      <th>Mecanismo Neuroanatômico Específico</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>Sinal de Kehr</strong></td>
      <td>Irritação da cúpula diafragmática esquerda por sangue (hemoperitônio por rotura de baço) ou abscesso subfrênico.</td>
      <td><strong>Ombro esquerdo (região escapular / supraclavicular).</strong></td>
      <td>O peritônio da face inferior do diafragma é inervado pelo <strong>Nervo Frênico</strong> (raízes cervicais C3, C4 e C5). Essas mesmas raízes originam os <em>nervos supraclaviculares</em> (dermátomo C3-C4 do ombro).</td>
    </tr>
    <tr>
      <td><strong>Dor de Boas</strong></td>
      <td>Colecistite aguda ou cólica biliar (distensão da vesícula biliar).</td>
      <td><strong>Ângulo inferior da escápula direita e região interescapular dorsal.</strong></td>
      <td>Fibras simpáticas da vesícula e cápsula hepática convergem para segmentos medulares torácicos T7 a T9, compartilhando vias com os nervos sensitivos cutâneos intercostais posteriores direitos.</td>
    </tr>
    <tr>
      <td><strong>Dor Pancreática em Faixa</strong></td>
      <td>Pancreatite aguda (inflamação do espaço retroperitoneal e pâncreas).</td>
      <td><strong>Epigástrio com irradiação dorsal bilateral em barra ou faixa ("dor em cinto").</strong></td>
      <td>Fibras aferentes do plexo celíaco e gânglios simpáticos retroperitoneais convergem para T7 a T10 na medula dorsal.</td>
    </tr>
    <tr>
      <td><strong>Cólica Ureteral com Irradiação Genital</strong></td>
      <td>Litíase ureteral distal com migração de cálculo para terço inferior.</td>
      <td><strong>Flanco lombar irradiando para fossa ilíaca, bolsa escrotal ou grandes lábios.</strong></td>
      <td>O ureter médio e distal compartilha ramos com o nervo genitofemoral e nervo ilioinguinal (segmentos L1-L2).</td>
    </tr>
  </tbody>
</table>
`
    },
    {
      id: 'as-cinco-grandes-sindromes-abdome-agudo',
      title: '3. As Cinco Grandes Síndromes de Abdome Agudo: Sistematização Didática',
      body_html: `
<h3>A Estruturação Racional do Diagnóstico Sindrômico</h3>
<p>Diante de um paciente com dor abdominal aguda, o objetivo primordial do cirurgião não é fechar imediatamente o diagnóstico anatomopatológico exato nos primeiros minutos, mas sim <strong>enquadrar o quadro clínico em uma das 5 Grandes Síndromes Cirúrgicas de Abdome Agudo</strong>. Essa sistematização lógica direciona a prioridade da estabilização hemodinâmica, a escolha sequencial dos exames complementares e a janela temporal máxima para a intervenção operatória:</p>
<ol>
  <li><strong>Abdome Agudo Inflamatório / Infeccioso</strong>;</li>
  <li><strong>Abdome Agudo Perfurativo</strong>;</li>
  <li><strong>Abdome Agudo Obstrutivo</strong>;</li>
  <li><strong>Abdome Agudo Isquêmico / Vascular</strong>;</li>
  <li><strong>Abdome Agudo Hemorrágico</strong>.</li>
</ol>

<table class="book-table">
  <thead>
    <tr>
      <th>Síndrome de Abdome Agudo</th>
      <th>Etiologias Prevalentes na População Geral</th>
      <th>Perfil Temporal e Características Semiológicas Marcantes</th>
      <th>Sinais de Alerta Imediatos</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>1. Inflamatório</strong></td>
      <td>Apendicite aguda, colecistite aguda litiásica, diverticulite aguda de cólon, pancreatite aguda e DIP (doença inflamatória pélvica).</td>
      <td><strong>Instalação gradual / insidiosa (horas a dias)</strong>. Dor inicialmente visceral (vaga, medial) que evolui para somática localizada; febre baixa a moderada, anorexia, leucocitose com desvio e irritação peritoneal circunscrita ao quadrante.</td>
      <td>Descompressão dolorosa (Blumberg), plastrão inflamatório palpável, SIRS e piora progressiva em 24 a 48 horas.</td>
    </tr>
    <tr>
      <td><strong>2. Perfurativo</strong></td>
      <td>Úlcera péptica perfurada (duodenal ou gástrica), diverticulite perfurada livre (Hinchey III/IV), perfuração neoplásica e corpos estranhos perfurantes.</td>
      <td><strong>Instalação hiperaguda súbita / catastrófica ("em facada")</strong>. O paciente sabe relatar o minuto exato da dor. Dor generalizada de altíssima intensidade; postura imóvel; <strong>abdome em tábua com contratura involuntária difusa</strong>.</td>
      <td>Pneumoperitônio nos exames radiológicos; desaparecimento da macicez hepática (Sinal de Joubert); taquicardia e choque séptico precoce.</td>
    </tr>
    <tr>
      <td><strong>3. Obstrutivo</strong></td>
      <td>Bridas e aderências pós-operatórias (delgado), neoplasia colorretal estenosante (cólon), hérnias inguinais/ventrais encarceradas, volvo de sigmoide/ceco e intussuscepção.</td>
      <td><strong>Tríade Clássica: Dor abdominal em cólica intermitente + vômitos (biliosos ou fecaloides) + parada de eliminação de gases e fezes</strong>. Distensão abdominal progressiva; ruídos hidroaéreos com timbres metálicos de luta (iniciais) evoluindo para silêncio abdominal.</td>
      <td>Dor contínua intensa (perda do padrão de cólica), febre, leucocitose marcante e peritonismo: indicam <strong>estrangulamento isquêmico com necrose da alça</strong>!</td>
    </tr>
    <tr>
      <td><strong>4. Isquêmico / Vascular</strong></td>
      <td>Isquemia mesentérica aguda embólica (artéria mesentérica superior), trombose arterial mesentérica, trombose venosa mesentérica e colite isquêmica não oclusiva (NOMI).</td>
      <td><strong>O Paradoxo Clínico: Dor abdominal excruciante, refratária a opioides, totalmente desproporcional à escassez de achados no exame físico inicial</strong> (abdome flácido sem peritonismo nas primeiras horas). Frequentemente em cardiopatas, idosos ou portadores de fibrilação atrial.</td>
      <td>Elevação explosiva do lactato sérico, acidose metabólica grave, hematoquezia ("fezes em geleia de morango") e peritonismo tardio (necrose transmural com perfuração).</td>
    </tr>
    <tr>
      <td><strong>5. Hemorrágico</strong></td>
      <td>Gravidez ectópica rota, rotura espontânea ou traumática de baço ou fígado (ex: adenoma hepático roto), rotura de aneurisma de aorta abdominal (AAA) e cisto ovariano hemorrágico.</td>
      <td><strong>Dor abdominal súbita e intensa associada imediatamente a choque hipovolêmico</strong>: palidez cutaneomucosa profunda, sudorese fria, taquicardia, hipotensão arterial postural, síncope e tontura ortostática. Distensão por hemoperitônio volumoso.</td>
      <td>Instabilidade hemodinâmica refratária à infusão volêmica inicial; queda aguda de hematócrito/hemoglobina; líquido livre anecoico maciço ao POCUS (FAST).</td>
    </tr>
  </tbody>
</table>
`
    },
    {
      id: 'sindrome-perfurativa-e-sinais-radiologicos',
      title: '4. Síndrome do Abdome Agudo Perfurativo: Etiologias, Pneumoperitônio e os Sinais de Joubert, Popper e Rigler',
      body_html: `
<h3>Fisiopatologia do Perfurativo: Da Irritação Química à Peritonite Fecal</h3>
<p>O abdome agudo perfurativo resulta da descontinuidade transmural da parede de uma víscera oca do trato gastrointestinal com extravasamento do seu conteúdo intraluminal para a cavidade peritoneal livre. A resposta peritoneal inicial depende estritamente do segmento anatômico perfurado:</p>
<ul>
  <li><strong>Perfurações Gastroduodenais (Úlcera Péptica):</strong> O extravasamento inicial é constituído por ácido clorídrico luminal com pH &lt; 2, pepsina ativada e bile. Gera uma <strong>peritonite química asséptica hiperaguda extremamente violenta</strong>. O paciente experimenta dor cortante súbita de início fulminante ("facada"), com contratura reflexa maciça de toda a musculatura da parede abdominal anterior — o clássico <em>abdome em tábua</em>. Se não operado nas primeiras 6 a 12 horas, a colonização bacteriana secundária sobreposta deflagra peritonite bacteriana purulenta e choque séptico refratário;</li>
  <li><strong>Perfurações do Trato Digestivo Baixo (Cólon e Reto):</strong> Decorrentes de diverticulite aguda necrosante perfurada, neoplasia obstrutiva com perfuração cecal diastática por hipertensão intraluminal (Lei de Laplace) ou traumatismo. Provocam <strong>peritonite bacteriana fecal fétida imediata</strong>, pois o conteúdo colônico abriga concentrações astronômicas de bactérias entéricas anaeróbias (<em>Bacteroides fragilis</em>) e gram-negativas (<em>Escherichia coli</em>). A evolução para sepse fulminante, hipotensão e choque endotóxico ocorre em poucas horas.</li>
</ul>

<h3>Semiologia do Pneumoperitônio e Epônimos Clássicos de Prova</h3>
<p>A presença de ar livre na cavidade peritoneal (<strong>pneumoperitônio</strong>) é a assinatura fisiopatológica do abdome agudo perfurativo. A identificação dos sinais clínicos e radiológicos clássicos é alvo onipresente em provas de residência:</p>

<h3>1. Sinal de Joubert (Semiologia Física à Percussão)</h3>
<p>Consiste no <strong>desaparecimento da macicez hepática normal à percussão da linha axilar média e hemiclavicular direita</strong>, sendo substituída por <strong>timpanismo nítido</strong> no hipocôndrio direito. Fisiopatologia: o ar livre que escapou da víscera perfurada é menos denso que as estruturas sólidas e ascende ventralmente, interpondo-se entre a face diafragmática do fígado e a parede torácica anterior/lateral quando o paciente está em decúbito dorsal ou semi-ortostase.</p>
<p><em>Diagnóstico diferencial:</em> <strong>Sinal de Chilaiditi</strong> (interposição colônica congênita ou transitória do cólon entre o fígado e a cúpula diafragmática em paciente assintomático) e <em>Síndrome de Chilaiditi</em> (a mesma interposição acompanhada de dor abdominal simuladora).</p>

<h3>2. Sinal de Popper (Semiologia Radiológica Clássica)</h3>
<p>Visualização de <strong>ar livre subdiafragmático na radiografia simples de tórax em posição ortostática (PA) ou cúpulas diafragmáticas</strong>. Apresenta-se como uma meia-lua hipertransparente radiolucente (gás negro) desenhando a concavidade inferior de uma ou ambas as cúpulas diafragmáticas, destacando o contorno superior do diafragma contra a base pulmonar e a borda superior do fígado ou estômago. É o achado mais frequente e rápido para confirmar pneumoperitônio no pronto-socorro (sensibilidade de 70% a 85% com volumes gasosos de apenas 1 a 2 mL de ar!).</p>

<h3>3. Sinal de Rigler (Sinal da Parede Dupla ao Raio-X em Decúbito Dorsal)</h3>
<p>Em pacientes graves, acamados, politraumatizados ou em choque que <em>não conseguem manter a posição ortostática</em> para radiografia de tórax em pé, a radiografia de abdome em decúbito dorsal tradicional pode demonstrar o <strong>Sinal de Rigler (ou Sinal da Dupla Parede)</strong>:</p>
<ul>
  <li>Em condições fisiológicas normais, a parede da alça intestinal só é visível pela sua superfície interna (mucosa), em virtude do contraste entre o gás intraluminal e a densidade de partes moles da parede tecidual. A superfície serosa externa não é discernível porque está em contato íntimo com o líquido peritoneal e alças adjacentes de densidade radiológica idêntica;</li>
  <li>Quando ocorre <em>pneumoperitônio volumoso</em>, o ar livre envolve a superfície serosa externa da alça, enquanto o gás fisiológico continua preenchendo a luz interna. Dessa forma, <strong>ambos os lados da parede intestinal (a mucosa interna e a serosa externa) são demarcados por gás hipertransparente</strong>, tornando a parede da alça intestinal nítida como uma linha radiopaca fina flutuando na cavidade abdominal.</li>
</ul>

<h3>Outros Sinais Radiológicos Notáveis de Pneumoperitônio</h3>
<ul>
  <li><strong>Sinal do Ligamento Falciforme:</strong> O gás livre intraperitoneal contorna e delineia radiologicamente o ligamento falciforme hepático como uma densidade linear vertical na linha média do hipocôndrio direito e epigástrio;</li>
  <li><strong>Sinal da Bola de Futebol Americano (Football Sign):</strong> Mais frequente em neonatos com enterocolite necrosante perfurada ou grandes pneumoperitônios; todo o abdome assume formato oval com hipertransparência radiológica global delimitada pela reflexão peritoneal parietal.</li>
</ul>
`
    },
    {
      id: 'sindrome-obstrutiva-padroes-radiologicos',
      title: '5. Síndrome do Abdome Agudo Obstrutivo: Causas em Delgado vs Cólon, Semiologia e Padrões Radiológicos',
      body_html: `
<h3>Fisiopatologia Geral e Mecanismos de Obstrução</h3>
<p>O abdome agudo obstrutivo é definido pela interrupção mecânica ou funcional do trânsito anterógrado do conteúdo digestivo (líquidos, secreções gastrointestinais e gases intraluminais). A montante do ponto de bloqueio, o trato digestivo acumula volumes expressivos de saliva, suco gástrico, bile, secreções pancreáticas e entéricas (somando mais de 6 a 8 litros diários de fluidos secretados), além de ar deglutido (composto em 70% a 80% por nitrogênio não absorvível) e gases gerados pela fermentação bacteriana.</p>
<p>O aumento progressivo da pressão hidrostática intraluminal acarreta:</p>
<ol>
  <li><strong>Hiperperistaltismo Inicial Compensatório:</strong> O músculo liso da alça contrai-se vigorosamente na tentativa de transpor o obstáculo físico, gerando a dor característica em cólica paroxística intermitente e os <em>ruídos hidroaéreos aumentados com timbre metálico de luta</em>;</li>
  <li><strong>Comprometimento da Microcirculação Parietal:</strong> Quando a pressão intraluminal excede a pressão capilar venosa (20 a 30 mmHg), o retorno venoso da alça é bloqueado, gerando edema transmural maciço, aumento da permeabilidade e transudação de líquido para o terceiro espaço peritoneal (hipovolemia grave desidratante com hemoconcentração);</li>
  <li><strong>Isquemia Arterial e Necrose (Estrangulamento):</strong> Se a pressão persistir em elevação ou se a obstrução for em <em>alça fechada</em> (ex: volvo de sigmoide ou hérnia encarcerada onde os dois pontos de entrada e saída da alça estão ocluídos), a perfusão arterial é aniquilada. A alça sofre necrose isquêmica transmural, gangrena e perfuração bacteriana secundária.</li>
</ol>

<h3>Diferenciação Anatômica: Obstrução de Intestino Delgado vs Cólon</h3>
<table class="book-table">
  <thead>
    <tr>
      <th>Parâmetro de Comparação</th>
      <th>Obstrução Alta / Delgado (Jejuno-Íleo)</th>
      <th>Obstrução Baixa / Intestino Grosso (Cólon)</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>Etiologias Mais Frequentes</strong></td>
      <td><strong>1º Bridas / Aderências peritoneais pós-operatórias (&gt; 60%)</strong>;<br>2º Hérnias ventrais ou inguinais estranguladas (15-20%);<br>3º Neoplasias de delgado ou estenoses por Doença de Crohn.</td>
      <td><strong>1º Neoplasia Colorretal Estenosante (Adenocarcinoma de cólon esquerdo/sigmoide: 60%)</strong>;<br>2º Volvo de sigmoide ou ceco (15%);<br>3º Estenose diverticular crônica por diverticulite de repetição.</td>
    </tr>
    <tr>
      <td><strong>Tempo de Instalação e Sintomas</strong></td>
      <td>Instalação rápida e precoce. <strong>Vômitos precoces, abundantes e biliosos</strong>. Parada de eliminação de fezes pode ser tardia (ainda esvazia o conteúdo retal).</td>
      <td>Instalação insidiosa e progressiva. Vômitos tardios ou ausentes (fecaloides tardiamente). <strong>Parada de eliminação de fezes e gases é imediata e marcante</strong>.</td>
    </tr>
    <tr>
      <td><strong>Magnitude da Distensão Abdominal</strong></td>
      <td>Discreta a moderada, predominantemente central (mesogástrio).</td>
      <td><strong>Distensão abdominal maciça e exuberante</strong>, periférica ("em moldura"), com timpanismo difuso.</td>
    </tr>
    <tr>
      <td><strong>Padrão Radiológico ao Raio-X</strong></td>
      <td>Alças centrais dilatadas (&gt; 3 cm); <strong>pregueado mucoso com válvulas coniventes transversais completas ("empilhamento de moedas")</strong> atravessando todo o diâmetro da alça; níveis hidroaéreos múltiplos mais altos que largos ("escada de pintor"). Ausência de gás no cólon distal e ampola retal vazia.</td>
      <td>Alças periféricas dilatadas (&gt; 6 cm no cólon transverso/descendente e &gt; 9 a 12 cm no ceco); <strong>haustrações cólicas espaçadas que não cruzam todo o lúmen</strong> da alça.</td>
    </tr>
  </tbody>
</table>

<h3>A Importância Crítica da Válvula Ileocecal: Competente vs Incompetente</h3>
<p>Em pacientes com obstrução mecânica colônica baixa (ex: tumor de retossigmoide), o comportamento da válvula ileocecal dita o prognóstico emergencial:</p>
<ul>
  <li><strong>Válvula Ileocecal Competente (em 75% dos indivíduos):</strong> A válvula permite a passagem do conteúdo do íleo para o cólon, mas fecha-se hermeticamente impedindo o refluxo do cólon para o delgado. Cria-se uma situação dramática de <strong>obstrução em alça fechada</strong> entre o tumor estenosante e a válvula ileocecal continente. Pela <em>Lei de Laplace</em> ($Tensão = Pressão \times Raio$), o segmento que possui o maior raio anatômico sofrerá a maior tensão parietal para uma mesma pressão intraluminal. O <strong>ceco</strong> é a estrutura de maior diâmetro do trato digestivo; portanto, quando o diâmetro cecal atinge <strong>&ge; 9 a 12 cm</strong>, o risco de isquemia transmural e <strong>perfuração cecal diastática com peritonite fecal catastrófica</strong> é iminente!</li>
  <li><strong>Válvula Ileocecal Incompetente (em 25% dos indivíduos):</strong> O gás e líquido sob pressão no cólon refluem livremente para o íleo terminal, descomprimindo parcialmente o cólon às custas de distensão secundária de alças de delgado. A apresentação clínica simula uma obstrução mista de delgado e grosso com vômitos fecaloides.</li>
</ul>

<h3>Padrões Radiológicos Especiais: O Volvo de Sigmoide</h3>
<p>Ocorre em pacientes idosos com constipação crônica, megacólon chagásico ou uso crônico de neurolépticos, que desenvolvem um mesocólon sigmoide longo e com base estreita propensa à torção sobre o próprio eixo vascular:</p>
<ul>
  <li><strong>Achados Radiográficos:</strong> Sinal do <strong>"U invertido"</strong>, sinal do <strong>"grão de café"</strong> ou sinal do <strong>"bico de pássaro"</strong> na radiografia e enema opaco/TC: grande alça cólica em formato de ferradura cujas extremidades convergem para a fossa ilíaca esquerda e cuja cúpula atinge o hipocôndrio direito;</li>
  <li><strong>Conduta Inicial:</strong> Se o paciente estiver estável, afebril, sem leucocitose com desvio e sem sinais de irritação peritoneal (sem necrose transmural), o tratamento inicial de escolha é a <strong>descompressão colonoscópica / retossigmoidoscopia rígida com passagem de tubo retal</strong> (taxa de sucesso &gt; 80%). A cirurgia definitiva (sigmoidectomia eletiva) é agendada no mesmo internamento hospitalar devido ao altíssimo risco de recidiva (&gt; 50%).</li>
</ul>
`
    },
    {
      id: 'sindrome-isquemica-e-vascular',
      title: '6. Síndrome do Abdome Agudo Isquêmico / Vascular: Isquemia Mesentérica Aguda, Trombose e Embolia',
      body_html: `
<h3>Fisiopatologia da Isquemia Intestinal Aguda</h3>
<p>O abdome agudo isquêmico decorre da interrupção crítica do suprimento sanguíneo arterial ou da drenagem venosa do território esplâncnico, resultando em hipóxia tecidual, metabolismo anaeróbico celular, morte de enterócitos mucosos, quebra da barreira epitelial com translocação bacteriana maciça e, finalmente, necrose transmural com perfuração intestinal e peritonite purulenta/fecal. É a síndrome de abdome agudo mais letal da cirurgia, com taxas históricas de mortalidade oscilando entre <strong>50% e 80%</strong>, amplificadas pelo atraso diagnóstico decorrente do exame físico inicial enganosamente inocente.</p>

<h3>Os Quatro Subtipos Etiopatogênicos da Isquemia Mesentérica Aguda</h3>
<table class="book-table">
  <thead>
    <tr>
      <th>Subtipo de Isquemia Mesentérica</th>
      <th>Frequência Relativa</th>
      <th>Fatores de Risco e Mecanismo Fisiopatológico</th>
      <th>Topografia Vascular Mais Acometida</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>1. Embolia da Artéria Mesentérica Superior (AMS)</strong></td>
      <td><strong>40% a 50%</strong> (causa mais comum)</td>
      <td>Êmbolo de origem cardíaca decorrente de <strong>Fibrilação Atrial (FA) não anticoagulada</strong>, trombo mural pós-IAM de ventrículo esquerdo ou endocardite infecciosa. A AMS é vulnerável por possuir grande calibre e emergir da aorta abdominal em ângulo agudo (~45°).</td>
      <td>O êmbolo tipicamente aloja-se <strong>3 a 8 cm distal à emergência da AMS</strong>, poupando a artéria cólica média e jejunais proximais, mas necrosando o íleo e cólon ascendente.</td>
    </tr>
    <tr>
      <td><strong>2. Trombose da Artéria Mesentérica Superior (AMS)</strong></td>
      <td>25% a 30%</td>
      <td>Aterosclerose grave e generalizada de longa data em idosos tabagistas, vasculites ou estados de hipercoagulabilidade. Pacientes com história prévia de <strong>"angina mesentérica"</strong> (dor abdominal pós-prandial intensa que induz fobia alimentar e perda de peso acentuada).</td>
      <td>Ocorre <strong>no próprio óstio da AMS</strong> na aorta, gerando isquemia catastrófica maciça desde o ângulo de Treitz até o meio do cólon transverso.</td>
    </tr>
    <tr>
      <td><strong>3. Isquemia Mesentérica Não Oclusiva (NOMI)</strong></td>
      <td>15% a 20%</td>
      <td>Vasoespasmo difuso reflexo da microcirculação mesentérica deflagrado por baixo débito cardíaco, choque cardiogênico ou hipovolêmico, uso de aminas vasoconstritoras em altas doses (noradrenalina, vasopressina) e digitalização excessiva. Não há trombo na luz dos grandes vasos.</td>
      <td>Necrose focal ou descontínua difusa com preservação dos pulsos nos grandes troncos vasculares.</td>
    </tr>
    <tr>
      <td><strong>4. Trombose Venosa Mesentérica (TVM)</strong></td>
      <td>5% a 10%</td>
      <td>Hipercoagulabilidade primária (Fator V de Leiden, mutação da protrombina, deficiência de proteína C/S, síndrome antifosfolípide) ou secundária (cirrose com hipertensão portal, pancreatite grave, neoplasia intra-abdominal, infecção intra-abdominal/pileflebite).</td>
      <td>Veia mesentérica superior e sistema venoso portal; início mais insidioso (dias a semanas), com ingurgitamento venoso maciço e edema hemorrágico parietal.</td>
    </tr>
  </tbody>
</table>

<h3>A Apresentação Clínica Paradóxica e Sinais Laboratoriais</h3>
<p>O estigma semiológico clássico da isquemia mesentérica aguda é a <strong>dor abdominal desproporcional ao exame físico</strong>. O paciente descreve uma dor excruciante, visceral contínua e difusa, acompanhada de sofrimento intenso e agitação, enquanto a palpação abdominal nas primeiras horas revela um abdome absolutamente flácido, depressível, sem dor à descompressão e sem qualquer defesa muscular. Essa incongruência induz médicos inexperientes a rotularem errônea e fatalmente o paciente como portador de distúrbio de ansiedade ou cólica inespecífica.</p>
<p>À medida que a isquemia progride para necrose transmural (janela de oportunidade perdida):</p>
<ul>
  <li>Surgem <strong>febre, taquicardia descompensada, distensão abdominal e sinais evidentes de irritação peritoneal</strong> (Blumberg positivo e abdome tenso);</li>
  <li>Ocorrem evacuações sanguinolentas mucosas escuras denominadas classicamente de <strong>"fezes em geleia de morango" (currant jelly stools)</strong>, sinalizando esfacelo necrótico e descamação hemorrágica de toda a mucosa intestinal;</li>
  <li><strong>Marcadores Laboratoriais de Alarme:</strong> <strong>Acidose metabólica com hiato aniônico elevado e hiperlactatemia severa (&gt; 4 a 6 mmol/L)</strong>, leucocitose neutrofílica extrema (&gt; 20.000 a 30.000/$mm^3$) com desvio à esquerda e elevação expressiva do D-dímero (sensibilidade &gt; 95%, excelente para exclusão quando normal).</li>
</ul>

<h3>Propedêutica Padrão-Ouro e Abordagem Terapêutica</h3>
<p>O exame padrão-ouro moderno de escolha imediata é a <strong>Angiotomografia Computadorizada (Angio-TC) de Abdome e Pelve com contraste iodado nas fases arterial e venosa</strong>:</p>
<ul>
  <li>Demonstra a falha de enchimento endoluminal do vaso (trombo ou êmbolo), ausência ou hipoatenuação do realce parietal da alça intestinal isquêmica ("alça apagada"), edema transmural e, nos estágios irreversíveis avançados, <strong>pneumatose intestinal</strong> (gás na parede da alça) e <strong>aeroportia</strong> (gás no sistema venoso portal intra-hepático migrado das alças necrosadas);</li>
  <li><em>Conduta:</em> Ressuscitação com cristaloides, correção de eletrólitos, início imediato de anticoagulação plena com <strong>Heparina não fracionada IV</strong> (exceto se houver sangramento ativo) e <strong>Laparotomia Exploradora Imediata de Emergência</strong> para embolectomia cirúrgica retrógrada com cateter de Fogarty ou revascularização arterial associada à ressecção das alças inviáveis e programação de <em>Second-Look</em> laparotômico obrigatório após 24 a 48 horas.</li>
</ul>
`
    },
    {
      id: 'sindrome-hemorragica-e-choque',
      title: '7. Síndrome do Abdome Agudo Hemorrágico: Choque Hipovolêmico, Gravidez Ectópica, Rotura Visceral e Aneurisma de Aorta',
      body_html: `
<h3>Fisiopatologia do Abdome Agudo Hemorrágico</h3>
<p>O abdome agudo hemorrágico decorre do extravasamento agudo de sangue livre para o interior da cavidade peritoneal (<strong>hemoperitônio</strong>) ou para o espaço retroperitoneal. A sua marca clínica indelével é a convergência de <strong>dor abdominal súbita com sinais explícitos de choque hipovolêmico / hemorrágico classe III ou IV</strong> (palidez cutâneo-mucosa proeminente, sudorese pegajosa fria, taquicardia &gt; 120 bpm, hipotensão postural ou sustentada com PA sistólica &lt; 90 mmHg, tempo de enchimento capilar &gt; 3 segundos e oligúria).</p>
<p>O sangue livre na cavidade peritoneal atua como um irritante químico moderado, deflagrando dor peritoneal difusa com sensibilidade à palpação, porém a intensidade do peritonismo e da defesa muscular é substancialmente menor do que a provocada pelo suco gástrico ácido ou fezes da síndrome perfurativa.</p>

<h3>As Principais Etiologias na Sala de Emergência</h3>
<ol>
  <li><strong>Gravidez Ectópica Rota (Etiologia Ginecológica Mais Prevalente):</strong>
    <ul>
      <li>Mulher jovem em idade fértil, com histórico de atraso menstrual recente ou sangramento vaginal irregular atípico;</li>
      <li>A implantação do blastocisto ocorre mais comumente na tuba uterina (região ampolar em 70-80% e ístmica em 12%). O trofoblasto invade a delgada parede tubária e os vasos maternos, culminando em rotura tubária aguda com hemoperitônio maciço;</li>
      <li><em>Semiologia:</em> Dor pélvica súbita e intensa unilateral que se generaliza, hipotensão, síncope, dor excruciante à mobilização do colo uterino ao toque vaginal bimanual (<strong>Sinal de Proust</strong> ou "grito de Douglas" pelo abaulamento doloroso do fundo de saco posterior de Douglas preenchido por sangue) e Sinal de Kehr (dor no ombro por irritação frênica diafragmática);</li>
      <li><em>Conduta:</em> Teste imunológico de gravidez rápido ($\beta$-hCG urinário ou sérico quantitativo) + USG transvaginal (útero vazio com cavidade endometrial espessada associado a massa anexial heterogênea e líquido livre no fundo de saco). Paciente instável com choque: <strong>Laparotomia ou Laparoscopia imediata com salpingectomia</strong> e transfusão de sangue sem esperar exames demorados!</li>
    </ul>
  </li>
  <li><strong>Rotura de Aneurisma de Aorta Abdominal (AAA Roto):</strong>
    <ul>
      <li>Etiologia de extrema gravidade em homens idosos (&gt; 65 anos), hipertensos e tabagistas;</li>
      <li><em>Tríade Clássica de Prova:</em> <strong>Dor lombar ou abdominal aguda de forte intensidade + Hipotensão arterial / Choque + Massa abdominal pulsátil e expansiva à palpação na linha média</strong> (presente em ~50% dos casos);</li>
      <li>Se a rotura for para o espaço retroperitoneal contido, o paciente pode apresentar um tampão temporário com dor lombar simuladora de cólica nefrética e equimoses em flancos (<strong>Sinal de Grey-Turner</strong>) ou periumbilical (<strong>Sinal de Cullen</strong>); se romper livremente para a cavidade peritoneal, o colapso hemodinâmico e o choque exanguinante são imediatos;</li>
      <li><em>Conduta:</em> Paciente chocado com tríade clínica e suspeita de AAA roto: <strong>indicação cirúrgica imediata (laparotomia exploradora para clampeamento aórtico ou reparo endovascular EVAR)</strong> sem realização de tomografia computadorizada! A angio-TC só é admitida se o paciente mantiver estabilidade hemodinâmica limítrofe para planejamento anatômico.</li>
    </ul>
  </li>
  <li><strong>Rotura Espontânea ou Neoplásica de Vísceras Maciças (Baço e Fígado):</strong>
    <ul>
      <li>Rotura esplênica em vigência de esplenomegalia infecciosa (Mononucleose infecciosa por vírus Epstein-Barr, malária ou calazar) ou hematológica após tosse vigorosa ou trauma trivial;</li>
      <li>Rotura de <strong>Adenoma Hepático</strong> em mulheres jovens usuárias de anticoncepcionais orais combinados de longa data (apresentam-se com dor súbita em QSD e hemoperitônio por necrose intratumoral);</li>
      <li>Rotura de Carcinoma Hepatocelular (CHC) em cirróticos.</li>
    </ul>
  </li>
  <li><strong>Rotura de Cisto Ovariano Hemorrágico:</strong>
    <ul>
      <li>Comum na segunda metade do ciclo menstrual (fase lútea após a ovulação); dor súbita em fossa ilíaca após relação sexual vigorosa; o sangramento costuma ser autolimitado e o tratamento é frequentemente conservador com observação estrita e analgesia, operando-se apenas os raros casos com instabilidade hemodinâmica ou queda sustentada da hemoglobina.</li>
    </ul>
  </li>
</ol>
`
    },
    {
      id: 'propedutica-armada-sequencial',
      title: '8. Propedêutica Armada Sequencial: A Rotina Radiológica de Abdome Agudo e Variações Técnicas',
      body_html: `
<h3>O Fluxograma Propedêutico Racional na Emergência</h3>
<p>O acesso desenfreado e acrítico a exames de imagem avançados não substitui a anamnese detalhada e o exame físico meticuloso. A propedêutica armada no abdome agudo deve obedecer a uma sequência lógica estrita, guiada pelo estado hemodinâmico do paciente. A primeira pergunta fundamental é: <strong>O paciente está hemodinamicamente estável ou instável?</strong></p>
<ul>
  <li><strong>Paciente Instável (em choque descompensado com peritonismo franco ou evisceração):</strong> Proscrição absoluta de deslocamentos para salas de tomografia computadorizada! Exige estabilização na sala de reanimação (dois acessos venosos calibrosos, ressuscitação balanceada com sangue e cristaloides, coleta de sangue para tipagem e gasometria), ultrassonografia à beira do leito (POCUS/FAST) e transferência direta para a sala de cirurgia para <strong>Laparotomia Exploradora Imediata</strong>;</li>
  <li><strong>Paciente Estável ou Compensado:</strong> Realização sequencial dos exames radiológicos e laboratoriais estruturados.</li>
</ul>

<h3>A Rotina Clássica de Abdome Agudo ao Raio-X</h3>
<p>A "Rotina de Abdome Agudo" compreende classicamente a realização de <strong>três incidências radiográficas fundamentais</strong>:</p>
<ol>
  <li><strong>Radiografia de Tórax em Posição Ortostática (PA):</strong>
    <ul>
      <li><em>Objetivos:</em> Identificar <strong>pneumoperitônio subdiafragmático</strong> (Sinal de Popper) com sensibilidade muito superior à radiografia de abdome em pé, pois o feixe de raios-X incide paralelamente à cúpula do diafragma; afastar <strong>patologias torácicas que mimetizam abdome agudo clínico</strong> (pneumonia de lobo inferior, pneumotórax, derrame pleural, atelectasias basais); detectar elevação diafragmática assimétrica em abscessos subfrênicos.</li>
    </ul>
  </li>
  <li><strong>Radiografia Simples de Abdome em Posição Ortostática (Ortostase):</strong>
    <ul>
      <li><em>Objetivos:</em> Detectar <strong>níveis hidroaéreos patológicos</strong> gerados pela separação de líquido e gás dentro de alças intestinais distendidas (típicos do abdome agudo obstrutivo); visualizar distensão de cólon e sinais de volvo de sigmoide ("grão de café").</li>
    </ul>
  </li>
  <li><strong>Radiografia Simples de Abdome em Decúbito Dorsal (AP):</strong>
    <ul>
      <li><em>Objetivos:</em> Avaliar a distribuição geral dos gases intestinais (se há gás até a ampola retal ou se o cólon está desprovido de ar); mensurar o diâmetro transversal das alças (delgado &gt; 3 cm, cólon &gt; 6 cm, ceco &gt; 9 a 12 cm); identificar o <strong>pregueado mucoso</strong> (válvulas coniventes do delgado com padrão de "empilhamento de moedas" versus haustrações do cólon); detectar <strong>calcificações anormais</strong> (cálculos biliares radiopacos no íleo biliar, nefrolitíase, apendicolitos calcificados na FID em 10-15%, calcificações pancreáticas da pancreatite crônica); pesquisar o <strong>Sinal de Rigler</strong> (ar livre delineando ambas as faces da parede intestinal) e apagamento da sombra do músculo psoas (retroperitônio inflamado).</li>
    </ul>
  </li>
</ol>

<h3>E se o Paciente não Consegue Ficar de Pé? A Incidência de Laurell</h3>
<p>Quando o paciente encontra-se gravemente debilitado, acamado, idoso fraturado ou incapaz de permanecer em pé por tontura ortostática para o Raio-X de tórax e abdome em ortostase, é <strong>FORMALMENTE PROIBIDO DISPENSAR A PESQUISA DE PNEUMOPERITÔNIO</strong>. Deve-se solicitar obrigatoriamente a:</p>
<p><strong>Radiografia de Abdome em Decúbito Lateral Esquerdo com Raios Horizontais (Incidência de Laurell)</strong>:</p>
<ul>
  <li><em>Por que decúbito lateral ESQUERDO e não direito?</em> Porque, ao colocar o paciente deitado sobre o lado esquerdo, o ar livre peritoneal flutua e ascende para o ponto mais alto, interpondo-se entre a <strong>borda lateral do fígado e a parede abdominal lateral direita</strong> (onde existe uma densidade homogênea radiopaca de partes moles). Isso permite a visualização límpida da faixa de gás hipertransparente;</li>
  <li>Se o paciente fosse colocado em decúbito lateral direito, o ar livre acumular-se-ia no flanco esquerdo, confundindo-se com a bolha de gás fisiológica gástrica e o ângulo esplênico do cólon!</li>
</ul>
`
    },
    {
      id: 'usg-e-tomografia-multislice',
      title: '9. Ultrassonografia e Tomografia Computadorizada Multislice: O Padrão-Ouro na Avaliação Abdominal',
      body_html: `
<h3>O Papel da Ultrassonografia de Abdome e o POCUS</h3>
<p>A ultrassonografia (USG) é um método não invasivo, isento de radiação ionizante e contrastes nefrotóxicos, de baixo custo e passível de execução imediata à beira do leito (Point-of-Care Ultrasound - POCUS). Suas principais indicações e limitações no contexto do abdome agudo são:</p>
<ul>
  <li><strong>Principais Indicações de Escolha:</strong>
    <ol>
      <li><strong>Abdome Agudo Inflamatório Biliar:</strong> É o <strong>exame de primeira linha e padrão-ouro para afecções da vesícula e vias biliares</strong> (sensibilidade &gt; 95% para colelitíase e colecistite aguda litiásica: demonstra cálculo impactado, espessamento de parede &gt; 4 mm, líquido pericolecístico e sinal de Murphy ultrassonográfico);</li>
      <li><strong>Abdome Agudo Ginecológico e Obstétrico:</strong> USG transvaginal e pélvica de escolha primária na suspeita de gravidez ectópica, rotura de cisto ovariano, torção anexial (com Doppler de fluxo ovariano) e doença inflamatória pélvica (abscesso tubo-ovariano);</li>
      <li><strong>Abdome Agudo em Crianças e Gestantes:</strong> Populações especialmente vulneráveis à radiação ionizante da TC. Na criança com suspeita de apendicite ou intussuscepção ("sinal do alvo / pseudorrim") e na gestante em qualquer trimestre, a USG abdominal é sempre o primeiro exame de imagem indicado;</li>
      <li><strong>Protocolo FAST / E-FAST:</strong> Rastreio de líquido livre anecoico intra-abdominal (hemoperitônio) em quatro janelas anatômicas: espaço hepatorrenal (bolsa de Morison), esplenorrenal, pelve/suprapúbico e pericárdico.</li>
    </ol>
  </li>
  <li><strong>Limitações Estruturais da Ultrassonografia:</strong> Método operador-dependente; visualização amplamente prejudicada pelo <strong>gás intraluminal abundante em pacientes com distensão obstrutiva</strong> (o ar reflete totalmente as ondas de ultrassom, criando sombra acústica difusa e cegueira diagnóstica), obesidade acentuada e incapacidade de avaliar satisfatoriamente o retroperitônio profundo (pâncreas e aorta infrarrenal).</li>
</ul>

<h3>Tomografia Computadorizada (TC) Multislice: O Padrão-Ouro Indiscutível</h3>
<p>A <strong>Tomografia Computadorizada Computadorizada Helicoidal de Abdome Total e Pelve com Contraste Iodado Intravenoso</strong> revolucionou o manejo do abdome agudo, consolidando-se como o <strong>exame de imagem com maior sensibilidade (&gt; 95%) e especificidade (&gt; 95%)</strong> na esmagadora maioria das afecções cirúrgicas do adulto e do idoso. A TC reduziu a taxa histórica de laparotomias não terapêuticas ("laparotomias brancas") de cerca de 20% para menos de 3% a 5% dos casos.</p>

<table class="book-table">
  <thead>
    <tr>
      <th>Patologia Cirúrgica</th>
      <th>Sensibilidade / Especificidade da TC</th>
      <th>Achados Tomográficos Patognomônicos</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>Apendicite Aguda (Adultos e Idosos)</strong></td>
      <td>&gt; 98% / &gt; 98%</td>
      <td>Apêndice dilatado com diâmetro transverso <strong>&gt; 6 mm</strong>, parede espessada com realce anelar ("em alvo"), borramento e densificação da gordura mesoapendicular e pericecal, apendicolito hiperdenso intraluminal, líquido livre ou coleções/abscessos bloqueados.</td>
    </tr>
    <tr>
      <td><strong>Diverticulite Aguda de Cólon</strong></td>
      <td>&gt; 95% / &gt; 97%</td>
      <td>Espessamento parietal colônico segmentar (&gt; 4 mm), divertículos múltiplos inflamados, ingurgitamento vascular do mesocólon ("sinal da cauda de cometa"), bolhas de ar extraluminais pericólicas ou líquido livre. Permite <strong>classificação de Hinchey (I a IV)</strong> guiando drenagem percutânea vs cirurgia.</td>
    </tr>
    <tr>
      <td><strong>Isquemia Mesentérica Aguda</strong></td>
      <td>&gt; 93% / &gt; 96%</td>
      <td>Falha de enchimento vascular arterial (êmbolo na AMS) ou venoso na fase contrastada; afilamento da parede ("alça de papel") ou espessamento por edema submucoso; <strong>pneumatose intestinal</strong> (ar na parede) e <strong>gás no sistema venoso portal (aeroportia)</strong> em fases necróticas avançadas.</td>
    </tr>
    <tr>
      <td><strong>Pancreatite Aguda Necrosante</strong></td>
      <td>&gt; 90% (após 72h)</td>
      <td>Áreas parenquimatosas sem realce após contraste venoso indicando necrose pancreática; coleções peripancreáticas agudas; <strong>Classificação de Balthazar / Escore de Gravidade Tomográfica (MCTSI)</strong>.</td>
    </tr>
    <tr>
      <td><strong>Abdome Agudo Obstrutivo</strong></td>
      <td>&gt; 95% / &gt; 95%</td>
      <td>Identificação exata do <strong>ponto de transição (zona de afilamento abrupto entre alça dilatada a montante e colabada a jusante)</strong>; identifica etiologia (hérnia interna, bezoar, intussuscepção, tumor estenosante) e sinais de sofrimento/estrangulamento isquêmico da alça (ausência de realce parietal, pneumatose).</td>
    </tr>
  </tbody>
</table>

<h3>Uso de Meios de Contraste na TC de Abdome Agudo: Mitos e Fatos</h3>
<ul>
  <li><strong>Contraste Iodado Intravenoso (IV):</strong> É <strong>absolutamente indispensável</strong> na avaliação do abdome agudo na grande maioria dos casos. Sem contraste IV, é impossível avaliar a perfusão da parede intestinal (isquemia/estrangulamento), realce mucoso de apêndice inflamado, coleções purulentas capsuladas (realce em anel de abscesso) e tromboembolismo vascular mesentérico. Apenas na suspeita pura de litíase urinária (nefrolitíase) ou para rastreio inicial de hemoperitônio agudo maciço a TC sem contraste isolada é aceitável;</li>
  <li><strong>Contraste Oral / Retal:</strong> Seu uso rotineiro caiu em desuso nos grandes centros de trauma e emergência. O contraste oral retarda a realização da tomografia em 60 a 120 minutos (tempo necessário para o líquido transitar até o íleo distal), aumenta o risco de vômitos e broncoaspiração em pacientes desidratados e suboclusos e não agrega sensibilidade superior à tomografia multislice moderna com contraste intravenoso de alta resolução com reconstruções multiplanares (sagital e coronal). O contraste retal reserva-se para suspeita de fístulas cólicas baixas, trauma colorretal penetrante ou anastomoses baixas.</li>
</ul>
`
    },
    {
      id: 'decisao-cirurgica-laparotomia-vs-laparoscopia',
      title: '10. Decisão Cirúrgica de Emergência: Laparotomia Exploradora Imediata vs Videolaparoscopia e Tratamento Não Operatório',
      body_html: `
<h3>Indicações Formais de Laparotomia Exploradora Imediata</h3>
<p>O cirurgião nunca deve hesitar em indicar a intervenção cirúrgica imediata quando houver evidência incontestável de ameaça iminente à vida. A indicação de <strong>Laparotomia Exploradora Imediata de Emergência</strong> é mandatória nas seguintes situações:</p>
<ol>
  <li><strong>Instabilidade Hemodinâmica / Choque Hipovolêmico ou Séptico Refratário</strong> associado a suspeita de afecção abdominal aguda (hemoperitônio maciço, sepse biliar ou fecal grave descompensada);</li>
  <li><strong>Pneumoperitônio Volumoso com Sinais Claros de Peritonite Difusa Generalizada</strong> (dor generalizada e abdome em tábua por perfuração de víscera oca);</li>
  <li><strong>Peritonite Bacteriana Generalizada / Irritação Peritoneal Difusa</strong> (descompressão dolorosa em todos os quatro quadrantes e defesa muscular involuntária global);</li>
  <li><strong>Sinais de Estrangulamento ou Gangrena de Alça em Abdome Obstrutivo</strong> (dor contínua lancinante que perdeu o ritmo de cólica, acidose metabólica, febre alta, taquicardia extrema e peritonismo sobre a alça);</li>
  <li><strong>Evisceração Aguda</strong> de alças intestinais ou ferimento penetrante por arma de fogo / branca com choque ou peritonite.</li>
</ol>

<h3>O Papel Moderno da Videolaparoscopia no Abdome Agudo</h3>
<p>A videolaparoscopia diagnóstica e terapêutica consolidou-se como o procedimento padrão-ouro em diversas patologias agudas, superando a via aberta convencional em desfechos como menor dor pós-operatória, menor taxa de infecção de sítio cirúrgico, recuperação ileal mais rápida e menor incidência tardia de hérnias incisionais e bridas obstrutivas:</p>
<ul>
  <li><strong>Indicações Primárias Eletivas no Abdome Agudo:</strong> Apendicite aguda em todas as suas fases (incluindo obesos e gestantes no 1º e 2º trimestres), colecistite aguda litiásica precoce, gravidez ectópica rota em pacientes estáveis, úlcera péptica perfurada com rafia e colocação de tampão epiploico de Graham laparoscópico (em pacientes estáveis com diagnóstico precoce) e torção anexial ovariana;</li>
  <li><strong>Papel Diagnóstico na Dor Abdominal Indeterminada:</strong> Em mulheres jovens em idade fértil com dor em fossa ilíaca direita e propedêutica inconclusiva (dúvida persistente entre apendicite aguda incipiente, rotura de cisto hemorrágico ou DIP), a laparoscopia permite visualização direta de todos os órgãos pélvicos e resolução cirúrgica simultânea;</li>
  <li><strong>Contraindicações Absolutas e Relativas da Laparoscopia:</strong>
    <ul>
      <li><em>Contraindicação Absoluta:</em> <strong>Instabilidade hemodinâmica grave / Choque profundo</strong>. A insuflação do pneumoperitônio com $CO_2$ eleva a pressão intra-abdominal para 12 a 15 mmHg, o que comprime a veia cava inferior, reduz abruptamente o retorno venoso e a pré-carga cardíaca e pode deflagrar colapso circulatório irreversível e parada cardiorrespiratória em pacientes hipovolêmicos descompensados;</li>
      <li><em>Contraindicações Relativas:</em> Distensão abdominal maciça extrema com alças colônicas &gt; 8 a 10 cm ("abdome hostil" com risco elevadíssimo de perfuração iatrogênica da alça pelo trocarte ou pinças), coagulopatia grave refratária e múltiplas cirurgias prévias com aderências densas em bloco.</li>
    </ul>
  </li>
</ul>

<h3>Quando Optar pelo Tratamento Não Operatório (Conservador)?</h3>
<p>Nem todo abdome agudo requer bisturi. Diversas condições agudas altamente frequentes são manejadas primariamente com sucesso mediante terapia clínica estrita e vigilância continuada em enfermaria cirúrgica:</p>
<table class="book-table">
  <thead>
    <tr>
      <th>Condição Cirúrgica</th>
      <th>Critérios Rígidos para Tratamento Conservador</th>
      <th>Estratégia Terapêutica Adotada</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>Suboclusão Intestinal por Bridas / Aderências</strong></td>
      <td>Ausência de febre, sem taquicardia persistente, sem leucocitose com desvio, abdome compressível sem peritonismo (sem sinais de estrangulamento).</td>
      <td>Descompressão com <strong>Sonda Nasogástrica (SNG) aberta em sifonagem</strong>, hidratação venosa vigorosa com correção hidroeletrolítica, jejum oral e infusão de contraste hidrossolúvel (Gastrografin) por SNG (tem valor diagnóstico e terapêutico osmótico). Resolução espontânea em 70-80% dos casos em 24 a 48 horas.</td>
    </tr>
    <tr>
      <td><strong>Diverticulite Aguda Não Complicada (Hinchey Ia / Ib pequeno)</strong></td>
      <td>Sem peritonite difusa, sem abscesso volumoso (&lt; 3-4 cm) e sem pneumoperitônio livre distante.</td>
      <td>Dieta líquida ou repouso intestinal associado a antibioticoterapia venosa ou oral (Ciprofloxacino + Metronidazol ou Amoxicilina-Clavulanato) por 7 a 10 dias. Em casos selecionados de Hinchey Ia leve em pacientes imunocompetentes, as diretrizes modernas admitem apenas suporte sintomático e hidratação sem antibióticos.</td>
    </tr>
    <tr>
      <td><strong>Plastrão Apendicular Bloqueado (Massa em FID &gt; 5 a 7 dias)</strong></td>
      <td>Paciente estável, dor localizada circunscrita em FID, abscesso bloqueado circundado por omento e alças.</td>
      <td>Antibioticoterapia de amplo espectro venosa, drenagem percutânea por TC se coleção &gt; 3-4 cm, e <strong>apendicectomia de intervalo tardia após 6 a 12 semanas</strong> (associada a colonoscopia para descartar tumor cecal no paciente &gt; 40 anos).</td>
    </tr>
    <tr>
      <td><strong>Pancreatite Aguda Biliar Leve a Moderada</strong></td>
      <td>Ausência de disfunção orgânica persistente, sem sinais de peritonite.</td>
      <td>Hidratação vigorosa nas primeiras 24h, analgesia escalonada, realimentação oral precoce assim que tolerada e <strong>colecistectomia videolaparoscópica no mesmo internamento hospitalar</strong> antes da alta.</td>
    </tr>
  </tbody>
</table>
`
    },
    {
      id: 'populacoes-especiais-abdome-agudo',
      title: '11. Populações Especiais no Abdome Agudo: Gestantes, Idosos e Pacientes Imunocomprometidos',
      body_html: `
<h3>O Desafio Diagnóstico em Grupos de Alto Risco</h3>
<p>Determinados subgrupos de pacientes apresentam respostas fisiopatológicas modificadas e barreiras anatômicas ou imunológicas que mascaram a sintomatologia clássica do abdome agudo, transformando o diagnóstico em uma corrida contra o tempo:</p>

<h3>1. A Paciente Gestante</h3>
<ul>
  <li><strong>Deslocamento Anatômico pelo Útero Gravídico:</strong> A partir do segundo trimestre, o fundo uterino em expansão cefálica desloca progressivamente o ceco e o apêndice cecal para cima e para fora. No terceiro trimestre, o apêndice pode estar localizado no <strong>flanco direito ou mesmo no hipocôndrio direito</strong>, mimetizando colecistite aguda ou pielonefrite;</li>
  <li><strong>Modificações Fisiológicas da Gestação:</strong> Leucocitose fisiológica de até 12.000 a 16.000/$mm^3$ (e até 25.000 no trabalho de parto/puerpério imediato) sem desvio, náuseas e vômitos matinais habituais e elevação fisiológica da fosfatase alcalina por produção placentária;</li>
  <li><strong>Relaxamento da Musculatura Abdominal:</strong> O estiramento crônico da parede abdominal anterior atenua a defesa muscular e o sinal de Blumberg, mascarando peritonites graves;</li>
  <li><strong>Patologia Cirúrgica Não Obstétrica Mais Frequente:</strong> <strong>Apendicite aguda</strong> (incidência de ~1:1.000 a 1:2.000 gestações). O atraso cirúrgico &gt; 24h eleva o risco de perfuração com peritonite e aumenta a mortalidade fetal de menos de 1,5% para mais de 20% a 35%;</li>
  <li><strong>Escolha de Imagem:</strong> USG de abdome e pelve inicial; se inconclusiva ou duvidosa, o exame subsequente de escolha é a <strong>Ressonância Magnética (RM) de Abdome sem gadolínio</strong>. A TC só deve ser realizada se a RM for indisponível e a suspeita cirúrgica for alta (a radiação ionizada controlada nunca deve atrasar uma laparotomia necessária).</li>
</ul>

<h3>2. A População Idosa (&gt; 65 a 70 anos)</h3>
<ul>
  <li><strong>Imunossenescência e Mascaramento dos Sinais Sistêmicos:</strong> O idoso apresenta resposta inflamatória atenuada. Menos de 30% a 50% dos idosos com apendicite ou colecistite perfurada apresentam febre significativa ou leucocitose marcante na admissão;</li>
  <li><strong>Paredes Abdominais Hipotróficas e Flácidas:</strong> A atrofia da musculatura reto-abdominal reduz a rigidez e a defesa reflexa, tornando a descompressão dolorosa sutil ou ausente mesmo na presença de peritonite purulenta;</li>
  <li><strong>Manifestações Inespecíficas:</strong> O abdome agudo no idoso frequentemente se manifesta primariamente por <strong>Delirium agudo hipoativo ou hiperativo</strong>, descompensação inexplicada de insuficiência cardíaca ou diabetes, quedas da própria altura e recusa alimentar;</li>
  <li><strong>Etiologias Prevalentes:</strong> Doença diverticular complicada, neoplasias obstrutivas de cólon, colecistite aguda com alta incidência de perfuração e isquemia mesentérica aguda. A TC de abdome deve ser indicada com limiar extremamente baixo no idoso.</li>
</ul>

<h3>3. O Paciente Imunocomprometido e Neutropênico</h3>
<ul>
  <li><strong>Ausência de Neutrófilos Funcionais:</strong> Em pacientes sob quimioterapia aplasiante (neutrófilos &lt; 500/$mm^3$), pós-transplante de órgãos ou com AIDS avançada, a ausência de neutrófilos impede a formação do infiltrado purulento e da reação inflamatória clássica. O paciente pode ter necrose transmural do ceco sem desenvolver peritonismo;</li>
  <li><strong>Tiflite / Enterocolite Neutropênica:</strong> Entidade típica em pacientes com leucemia em fase pós-quimioterapia, caracterizada por edema transmural e necrose ulcerada do ceco e cólon ascendente por invasão de <em>Pseudomonas</em> e fungos. Manejo primariamente clínico com repouso intestinal, antibioticoterapia de amplo espectro com cobertura antipseudomonas e antifúngicos (opera-se apenas se houver perfuração livre documentada com pneumoperitônio ou sangramento maciço incontrolável).</li>
</ul>
`
    },
    {
      id: 'casos-clinicos-estruturados-abdome-agudo',
      title: '12. Casos Clínicos Estruturados e Discussões Práticas Baseadas em Evidências',
      body_html: `
<div class="book-case">
  <h3>Caso Clínico 1: Abdome Agudo Perfurativo com Sinal de Joubert</h3>
  <p><strong>Identificação:</strong> Homem de 48 anos, comerciante, tabagista e etilista moderado, usuário crônico de diclofenaco e prednisona para dor lombar crônica sem uso de gastroprotetor, é admitido na sala de trauma com dor abdominal fulminante.</p>
  <p><strong>História e Exame Físico:</strong> Refere que a dor começou há exatamente 3 horas de forma instantânea, "como se tivesse levado uma facada no estômago", que se espalhou por todo o abdome em minutos. Encontra-se deitado na maca, imóvel, em decúbito dorsal com pernas fletidas, sudoreico, pálido e com respiração superficial curta. Ao menor sobressalto na maca, grita de dor. Sinais vitais: PA: 130/85 mmHg, FC: 112 bpm, FR: 26 irpm, Temp: 37,1°C, SatO2: 97%. Exame abdominal: abdome completamente plano, <strong>"em tábua" com contratura muscular involuntária generalizada</strong> e dor insuportável à palpação superficial em todos os quadrantes. À percussão torácica e abdominal, nota-se <strong>timpanismo nítido na linha axilar média direita sobre a projeção hepática (Sinal de Joubert)</strong>.</p>
  
  <h4>Discussão Clínica Passo a Passo:</h4>
  <p><strong>1. Enquadramento Sindrômico:</strong> Trata-se de um <strong>Abdome Agudo Perfurativo</strong> clássico. O perfil de instalação instantânea ("em facada"), a postura imóvel no leito, a rigidez cadavérica em tábua do abdome por peritonite química violenta e o histórico de uso abusivo de anti-inflamatórios não esteroidais (AINEs) sem IBP direcionam diretamente para <strong>úlcera péptica perfurada</strong> (gástrica ou duodenal na parede anterior do bulbo).</p>
  <p><strong>2. Significado do Sinal de Joubert:</strong> O timpanismo à percussão onde deveria haver macicez hepática traduz ar livre subdiafragmático interposto (pneumoperitônio).</p>
  <p><strong>3. Propedêutica Imediata e Conduta Cirúrgica:</strong></p>
  <ul>
    <li>Solicitada rotina de abdome agudo: o RX de tórax em ortostase confirmou pneumoperitônio volumoso em meia-lua subdiafragmática bilateral (<strong>Sinal de Popper</strong>);</li>
    <li>Conduta: jejum absoluto, sonda nasogástrica calibrosa aberta em sifonagem, dois acessos venosos calibrosos, expansão com Ringer Lactato, antibioticoterapia de amplo espectro cobrindo gram-negativos e anaeróbios (ex: Ceftriaxona + Metronidazol ou Ampicilina-Sulbactam) e IBP intravenoso;</li>
    <li><strong>Encaminhamento imediato ao Centro Cirúrgico para Laparotomia Exploradora ou Laparoscopia</strong> para rafia primária da perfuração com colocação de tampão vascularizado de grande omento (<strong>Técnica de Graham</strong>) e lavagem copiosa da cavidade com soro fisiológico aquecido.</li>
  </ul>
</div>

<div class="book-case">
  <h3>Caso Clínico 2: Abdome Agudo Isquêmico com Apresentação Paradoxal</h3>
  <p><strong>Identificação:</strong> Mulher de 73 anos, hipertensa, diabética e portadora de Fibrilação Atrial crônica em uso irregular de varfarina (RNI admissional de 1,2), procura a emergência com dor abdominal de início há cerca de 5 horas.</p>
  <p><strong>Exame Físico Inicial:</strong> A paciente chora e debate-se na maca, referindo que a dor é a mais insuportável de toda a sua vida ("nota 10 de 10"), localizada difusamente no meio da barriga, sem irradiação. Já recebeu duas ampolas de morfina sem nenhum alívio. PA: 150/90 mmHg, pulso irregular com FC de 138 bpm, FR: 24 irpm. Ao examinar o abdome: <strong>o abdome é globoso, flácido, depressível, absolutamente indolor à descompressão e sem qualquer defesa muscular reflexa</strong>. RHA diminuídos.</p>
  <p><strong>Laboratório:</strong> Hemograma com 19.500 leucócitos/$mm^3$ (desvio até metamielócitos 8%), Gasometria arterial com pH 7,26, $HCO_3^-$ 14 mEq/L, $PaCO_2$ 30 mmHg e <strong>Lactato Sérico de 6,8 mmol/L (VR &lt; 2,0)</strong>.</p>
  
  <h4>Discussão Clínica Passo a Passo:</h4>
  <p><strong>1. Reconhecimento do Paradoxo Semiológico:</strong> A presença de <strong>dor abdominal excruciante refratária a analgésicos potentes associada a um exame físico inicial totalmente inocente e flácido</strong> é o estigma definitivo do <strong>Abdome Agudo Isquêmico / Vascular (Isquemia Mesentérica Aguda)</strong>. A paciente possui o perfil epidemiológico clássico: cardiopata com Fibrilação Atrial desanticoagulada (êmbolo cardíaco migrado para a Artéria Mesentérica Superior).</p>
  <p><strong>2. Confirmação Diagnóstica e Conduta:</strong></p>
  <ul>
    <li>O lactato elevado (&gt; 6 mmol/L) associado a leucocitose marcante traduz sofrimento celular anaeróbico grave de enterócitos;</li>
    <li>Realizada <strong>Angiotomografia Computadorizada de Abdome com contraste IV imediata</strong>: visualizada falha de enchimento endoluminal em corte transversal da AMS 4 cm após sua origem (êmbolo), com afilamento da parede do jejuno distal e íleo;</li>
    <li>Conduta de emergência: ressuscitação volêmica intensiva, anticoagulação imediata com heparina não fracionada em bólus IV e <strong>Laparotomia Exploradora Imediata</strong> para embolectomia de AMS com cateter de Fogarty, avaliação da viabilidade das alças e programação de cirurgia de revisão (second-look) em 24h.</li>
  </ul>
</div>

<div class="book-case">
  <h3>Caso Clínico 3: Abdome Agudo Obstrutivo em Alça Fechada por Bridas</h3>
  <p><strong>Identificação:</strong> Homem de 56 anos, com histórico de laparotomia prévia há 12 anos por trauma abdominal penetrante com enterectomia parcial, dá entrada com parada de eliminação de gases e fezes há 36 horas associada a dor abdominal em cólica intensa e episódios repetidos de vômitos verde-escuros abundantes (biliosos).</p>
  <p><strong>Exame Físico:</strong> Desidratado ++/4+, olhos fundos, mucosas secas. PA: 105/70 mmHg, FC: 104 bpm. Abdome distendido na linha média, com cicatriz cirúrgica mediana xifopúbica. Ausculta abdominal revela <strong>ruídos hidroaéreos aumentados com timbre metálico e borborigmos de luta</strong> que coincidem com os paroxismos dolorosos do paciente. À palpação, abdome tenso, porém sem peritonismo localizado ou generalizado.</p>
  <p><strong>Radiografia de Abdome em Pé e Deitado:</strong> Dilatação acentuada de múltiplas alças de intestino delgado no centro do abdome (calibre de 4,5 cm), com visualização do <strong>pregueado das válvulas coniventes atravessando toda a parede ("empilhamento de moedas")</strong> e múltiplos <strong>níveis hidroaéreos escalonados ("escada de pintor")</strong>. Ausência completa de gás na moldura cólica e ampola retal desprovida de fezes e ar.</p>
  
  <h4>Discussão Clínica Passo a Passo:</h4>
  <p><strong>1. Diagnóstico Sindrômico:</strong> <strong>Abdome Agudo Obstrutivo Alto (Intestino Delgado)</strong> mecânico por bridas/aderências pós-operatórias (etiologia responsável por mais de 60% dos casos de obstrução de delgado no adulto com cirurgia prévia).</p>
  <p><strong>2. Decisão Terapêutica Inicial:</strong> O paciente não apresenta sinais clínicos de estrangulamento isquêmico (não há febre, dor contínua fixa, peritonismo, acidose lática ou leucocitose com desvio). Dessa forma, está plenamente indicado o <strong>Tratamento Não Operatório (Conservador) Inicial sob vigilância estrita</strong>:</p>
  <ul>
    <li>Passagem imediata de <strong>Sonda Nasogástrica aberta em sifonagem</strong> para descompressão mecânica do estômago e delgado proximal (prevenindo vômitos, aspiração brônquica e progressão da distensão);</li>
    <li>Ressuscitação volêmica vigorosa com Ringer Lactato venoso para reposição das perdas para o terceiro espaço e correção de desidratação;</li>
    <li>Instalação de contraste hidrossolúvel (Gastrografin) por SNG após descompressão: se o contraste atingir o cólon em radiografia de controle após 8 a 24 horas, o teste prevê resolução conservadora bem-sucedida em mais de 90% dos casos;</li>
    <li>Se, em qualquer momento da internação (geralmente avaliado nas primeiras 24 a 48h), o paciente desenvolver dor contínua refratária, febre, taquicardia descompensada ou leucocitose, a conduta é convertida imediatamente para <strong>Laparotomia ou Laparoscopia para brisiotomia / lise de bridas</strong>.</li>
  </ul>
</div>

<div class="book-case">
  <h3>Caso Clínico 4: Abdome Agudo Hemorrágico por Gravidez Ectópica Rota</h3>
  <p><strong>Identificação:</strong> Mulher de 28 anos, previamente hígida, é trazida inconsciente pelos familiares à emergência após sofrer síncope no banheiro de casa.</p>
  <p><strong>Exame Físico:</strong> Torporosa, letárgica (Glasgow 11), palidez cutâneo-mucosa extrema (4+/4+), sudorese fria em extremidades, pulsos periféricos filiformes. PA: 60/35 mmHg, FC: 142 bpm, FR: 28 irpm. Familiares relatam que a paciente queixava-se de cólicas em baixo-ventre há 2 dias e pequeno sangramento vaginal em borra de café, com histórico de atraso menstrual de 3 semanas. Ao exame abdominal: abdome distendido, difusamente doloroso à palpação profunda, com descompressão dolorosa moderada em hipogástrio e fossa ilíaca direita. Ao toque bimanual, nota-se <strong>dor excruciante e grito da paciente à mobilização do colo uterino (Sinal de Proust)</strong>, com abaulamento doloroso do fundo de saco de Douglas.</p>
  <p><strong>POCUS Imediato na Sala Vermelha:</strong> Ultrassonografia à beira do leito demonstra grande quantidade de líquido livre anecoico no espaço de Morison (hepatorrenal) e na pelve profunda (fundo de saco preenchido por fluido livre móvel). O útero apresenta cavidade endometrial vazia sem saco gestacional intrauterino.</p>
  
  <h4>Discussão Clínica Passo a Passo:</h4>
  <p><strong>1. Enquadramento Sindrômico e Diagnóstico:</strong> Trata-se de um <strong>Abdome Agudo Hemorrágico com Choque Hipovolêmico / Hemorrágico Classe IV Grave</strong> secundário a <strong>Gravidez Ectópica Tubária Rota com Hemoperitônio Maciço</strong>.</p>
  <p><strong>2. Conduta Salvadora Imediata:</strong></p>
  <ul>
    <li><em>NUNCA ENVIAR A PACIENTE PARA SALA DE TOMOGRAFIA!</em> A instabilidade hemodinâmica profunda proíbe qualquer exame demorado fora da sala de ressuscitação;</li>
    <li>Acionamento imediato do <strong>Protocolo de Transfusão Maciça</strong>: infusão imediata de concentrado de hemácias O negativo não cruzado, plasma fresco congelado e plaquetas (relação 1:1:1);</li>
    <li>Acesso venoso calibroso duplo e infusão restritiva de Ringer Lactato aquecido com hipotensão permissiva (meta de PAM ~ 60 mmHg para não aumentar o sangramento);</li>
    <li><strong>Encaminhamento Imediato para Laparotomia Exploradora de Emergência</strong> (incisão de Pfannenstiel ou mediana infraumbilical rápida) para hemostasia direta e <strong>salpingectomia total unilateral</strong> do anexo acometido.</li>
  </ul>
</div>
`
    },
    {
      id: 'questoes-comentadas-residencia-abdome-agudo',
      title: '13. Questões Comentadas de Residência Médica e Revalida/ENAMED',
      body_html: `
<div class="book-case">
  <p><strong>Questão 1 (Residência Médica / USP / ENARE):</strong><br>
  Homem de 52 anos dá entrada na Unidade de Emergência com queixa de dor abdominal de forte intensidade e instalação súbita, iniciada há cerca de 4 horas no epigástrio e atualmente difusa por todo o abdome. Ao exame clínico: encontra-se em decúbito dorsal imóvel, taquicárdico (FC 115 bpm), com expressão facial de sofrimento agudo e sudorese fria. A palpação abdominal evidencia rigidez involuntária generalizada ("abdome em tábua"). À percussão do tórax e abdome, constata-se a perda da macicez hepática fisiológica, substituída por timpanismo na linha hemiclavicular direita. Qual é a denominação semiológica desse achado à percussão e qual o exame radiográfico mais sensível para sua confirmação inicial?</p>
  
  <p>A) Sinal de Rigler; Radiografia de abdome em decúbito dorsal com raios verticais.<br>
  B) Sinal de Joubert; Radiografia de tórax em posição ortostática (PA).<br>
  C) Sinal de Popper; Radiografia de abdome em decúbito lateral direito com raios horizontais.<br>
  D) Sinal de Kehr; Ultrassonografia de vias biliares à beira do leito.<br>
  E) Sinal de Chilaiditi; Tomografia computadorizada de abdome sem contraste.</p>
  
  <h4>Comentário Detalhado:</h4>
  <p><strong>Alternativa Correta: B.</strong></p>
  <ul>
    <li>O desaparecimento da macicez hepática à percussão toracoabdominal com surgimento de timpanismo no hipocôndrio direito é denominado <strong>Sinal de Joubert</strong>. Ele decorre da interposição de gás livre intraperitoneal (pneumoperitônio) sobre a face anterior do fígado;</li>
    <li>O exame inicial mais rápido e sensível para demonstrar o pneumoperitônio é a <strong>Radiografia de Tórax em Posição Ortostática (PA)</strong>, que revela o gás em meia-lua subdiafragmática (<strong>Sinal de Popper</strong>);</li>
    <li><em>Erro da A:</em> O Sinal de Rigler é o delineamento radiológico de ambas as faces da parede da alça intestinal por gás na radiografia em decúbito dorsal;</li>
    <li><em>Erro da C:</em> A incidência com raios horizontais é realizada em <strong>decúbito lateral ESQUERDO</strong> (Incidência de Laurell), e não direito;</li>
    <li><em>Erro da D:</em> Sinal de Kehr é dor no ombro esquerdo referida por hemoperitônio irritando o diafragma;</li>
    <li><em>Erro da E:</em> Chilaiditi é a interposição colônica assintomática e anatômica entre o fígado e o diafragma.</li>
  </ul>
</div>

<div class="book-case">
  <p><strong>Questão 2 (SUS-SP / Revalida INEP):</strong><br>
  Mulher de 78 anos, portadora de hipertensão e fibrilação atrial em uso de digoxina e enalapril (sem anticoagulação formal), apresenta dor abdominal periumbilical de início súbito há 6 horas. A paciente relata dor de intensidade 10/10, desproporcional ao toque do examinador, pois o abdome apresenta-se flácido, depressível e sem descompressão dolorosa. A gasometria arterial revela pH 7,24, HCO3- 12 mEq/L e lactato de 7,2 mmol/L. Qual é o diagnóstico sindrômico mais provável e a conduta diagnóstica padrão-ouro de escolha?</p>
  
  <p>A) Abdome agudo perfurativo; solicitar radiografia simples de tórax e abdome em ortostase.<br>
  B) Abdome agudo inflamatório por diverticulite; prescrever ceftriaxona com metronidazol e alta.<br>
  C) Abdome agudo isquêmico por embolia de artéria mesentérica superior; realizar Angiotomografia Computadorizada de abdome total com contraste iodado intravenoso.<br>
  D) Abdome agudo obstrutivo por volvo de sigmoide; indicar descompressão colonoscópica de urgência.<br>
  E) Abdome agudo hemorrágico por rotura de aneurisma aórtico; indicar laparotomia exploradora sem imagem.</p>
  
  <h4>Comentário Detalhado:</h4>
  <p><strong>Alternativa Correta: C.</strong></p>
  <ul>
    <li>O quadro de <strong>dor abdominal desproporcional ao exame físico</strong> (dor atroz com abdome flácido e inocente) em idosa com Fibrilação Atrial sem anticoagulação e <strong>acidose metabólica com hiperlactatemia severa</strong> fecha o diagnóstico inequívoco de <strong>Abdome Agudo Isquêmico / Vascular (Isquemia Mesentérica Aguda)</strong>;</li>
    <li>O padrão-ouro confirmatório moderno é a <strong>Angio-TC de abdome e pelve com contraste intravenoso</strong> nas fases arterial e venosa, que localiza com precisão o êmbolo na Artéria Mesentérica Superior (AMS) e avalia o grau de isquemia da parede das alças;</li>
    <li>As outras alternativas trazem síndromes incompatíveis com o quadro de FA, dor desproporcional e acidose lática.</li>
  </ul>
</div>

<div class="book-case">
  <p><strong>Questão 3 (ENAMED / AMRIGS / Unicamp):</strong><br>
  Sobre a neurofisiologia da dor abdominal no contexto do abdome agudo, assinale a alternativa cientificamente correta:</p>
  
  <p>A) A dor visceral é conduzida por fibras mielínicas do tipo A-delta de velocidade rápida, transmitindo sensação dolorosa nítida e precisamente localizada no quadrante acometido.<br>
  B) As afecções inflamatórias do intestino anterior embrionário (estômago, duodeno proximal e vias biliares) manifestam dor visceral percebida tipicamente no hipogástrio.<br>
  C) A dor somática ou parietal é transmitida por fibras amielínicas do tipo C, sendo difusa, mal delimitada e acompanhada por intensa resposta neurovegetativa autonômica.<br>
  D) A dor somática/parietal decorre da inflamação do peritônio parietal anterior, sendo transmitida por nervos espinhais periféricos, caracterizando-se por dor aguda, bem localizada e acompanhada de defesa muscular e sinal de Blumberg.<br>
  E) A dor referida na ponta do ombro esquerdo por irritação do diafragma (Sinal de Kehr) ocorre devido à estimulação de fibras do plexo lombossacro que convergem para L1-L2.</p>
  
  <h4>Comentário Detalhado:</h4>
  <p><strong>Alternativa Correta: D.</strong></p>
  <ul>
    <li>A <strong>dor somática ou parietal</strong> é mediada por fibras mielínicas A-delta rápidas que trafegam pelos nervos sensitivos cérebro-espinhais periféricos (nervos intercostais inferiores). Ela é pontual, cortante, precisa e deflagra reflexos motores de defesa muscular involuntária e dor à descompressão súbita (Sinal de Blumberg);</li>
    <li><em>Erro da A e C:</em> A dor visceral é transmitida por fibras <strong>C amielínicas lentas</strong> (e não A-delta), sendo vaga e difusa; a dor somática é que é transmitida por fibras A-delta;</li>
    <li><em>Erro da B:</em> O intestino anterior (foregut) projeta dor visceral no <strong>epigástrio</strong> (e não no hipogástrio); o hipogástrio recebe aferências do intestino posterior (hindgut);</li>
    <li><em>Erro da E:</em> O sinal de Kehr decorre do <strong>Nervo Frênico</strong>, que possui raízes cervicais <strong>C3 a C5</strong> (e não plexo lombossacro L1-L2).</li>
  </ul>
</div>

<div class="book-case">
  <p><strong>Questão 4 (UNESP / Cirurgia Geral):</strong><br>
  Homem de 62 anos, previamente hígido, apresenta parada de eliminação de gases e fezes há 4 dias, acompanhada de distensão abdominal progressiva maciça. Refere vômitos alimentares tardios. Ao exame clínico: desidratado, afebril, abdome difusamente distendido e hipertimpânico, indolor à palpação superficial e sem sinais de peritonite. A radiografia simples de abdome em decúbito dorsal revela dilatação volumosa da moldura cólica (cólon descendente com 7 cm de diâmetro) com ceco medindo 11,5 cm de diâmetro transverso. Não há gás na ampola retal. Qual é o mecanismo fisiopatológico mais provável para a dilatação cecal desproporcional e qual o risco imediato?</p>
  
  <p>A) Obstrução alta de delgado por brida com válvula ileocecal incompetente; risco de broncoaspiração maciça.<br>
  B) Obstrução colônica baixa em alça fechada com válvula ileocecal competente; risco iminente de perfuração diastática do ceco.<br>
  C) Íleo paralítico metabólico por hipopotassemia grave; risco de insuficiência renal aguda pré-renal.<br>
  D) Volvo de ceco com torção de mesocólon; risco de infarto esplênico concomitante.<br>
  E) Colite pseudomembranosa fulminante; risco de megacólon tóxico por infecção por Clostridioides difficile.</p>
  
  <h4>Comentário Detalhado:</h4>
  <p><strong>Alternativa Correta: B.</strong></p>
  <ul>
    <li>O paciente apresenta uma obstrução colônica baixa mecânica (provavelmente adenocarcinoma de retossigmoide). A presença de <strong>válvula ileocecal continente/competente</strong> impede o refluxo descompressivo para o íleo, transformando o cólon em um sistema de <strong>obstrução em alça fechada</strong>;</li>
    <li>Pela <strong>Lei de Laplace</strong> ($Tensão = Pressão \times Raio$), o ceco, por apresentar o maior raio luminal de todo o intestino grosso, sofre a maior tensão parietal para uma dada pressão gasosa intraluminal. Quando o diâmetro cecal atinge ou ultrapassa <strong>9 a 12 cm</strong>, o risco de isquemia microvascular e <strong>perfuração cecal diastática com peritonite fecal catastrófica</strong> torna-se iminente, demandando descompressão ou intervenção operatória imediata;</li>
    <li>As demais hipóteses desconsideram a mecânica de alça fechada e a Lei de Laplace.</li>
  </ul>
</div>

<div class="book-case">
  <p><strong>Questão 5 (ENARE / Residência Médica):</strong><br>
  Uma paciente de 31 anos, primigesta na 28ª semana de gestação, é admitida com dor no quadrante superior direito (flanco e hipocôndrio direito) iniciada há 24 horas, associada a náuseas e febre de 38,2°C. O hemograma revela leucocitose de 18.000/$mm^3$ com 6% de bastões. A palpação no hipocôndrio direito é intensamente dolorosa. Qual é a causa não obstétrica cirúrgica mais provável de abdome agudo nesta paciente e qual o primeiro exame de imagem indicado?</p>
  
  <p>A) Colecistite aguda litiásica; Tomografia computadorizada de abdome total com contraste iodado.<br>
  B) Pielonefrite aguda direita; Ressonância nuclear magnética de abdome total com gadolínio.<br>
  C) Apendicite aguda; Ultrassonografia de abdome total com transdutor de compressão graduada.<br>
  D) Síndrome HELLP; Laparotomia exploradora mediana imediata com cesariana de urgência.<br>
  E) Torção de cisto ovariano; Videolaparoscopia com pneumoperitônio de alta pressão (&gt; 18 mmHg).</p>
  
  <h4>Comentário Detalhado:</h4>
  <p><strong>Alternativa Correta: C.</strong></p>
  <ul>
    <li>A <strong>apendicite aguda</strong> é a emergência cirúrgica não obstétrica mais comum durante a gestação (~1:1.500 gestações);</li>
    <li>No 3º trimestre gestacional (a paciente está na 28ª semana), o crescimento uterino <strong>desloca o ceco e o apêndice cefalicamente para o flanco direito ou hipocôndrio direito</strong>, mimetizando colecistite ou pielonefrite;</li>
    <li>O primeiro exame de imagem a ser realizado em gestantes com suspeita de abdome agudo é a <strong>Ultrassonografia abdominal e pélvica</strong> (isenta de radiação ionizante). Caso o USG seja inconclusivo, o exame de resgate indicado é a Ressonância Magnética (RM) sem gadolínio;</li>
    <li>O uso de contraste iodado ou radiação por TC só é aceito se a RM for inacessível e houver risco de atraso cirúrgico.</li>
  </ul>
</div>

<div class="book-case">
  <p><strong>Questão 6 (USP-SP / Cirurgia Geral):</strong><br>
  Em relação às indicações cirúrgicas de emergência no abdome agudo, assinale a afirmativa INCORRETA:</p>
  
  <p>A) A presença de instabilidade hemodinâmica grave com choque refratário associada a sinais de irritação peritoneal é uma contraindicação absoluta à abordagem por videolaparoscopia.<br>
  B) Na suspeita de úlcera péptica perfurada com peritonite difusa em paciente estável, a laparoscopia pode ser utilizada para rafia da lesão e colocação de tampão epiploico de Graham.<br>
  C) O tratamento não operatório da suboclusão de intestino delgado por aderências inclui descompressão nasogástrica, hidratação venosa e vigilância rigorosa dos sinais de estrangulamento de alça.<br>
  D) O pneumoperitônio volumoso em paciente com abdome em tábua e peritonite generalizada autoriza a realização rotineira de enema opaco e EDA antes de qualquer decisão operatória.<br>
  E) Em pacientes com diverticulite aguda não complicada com abscesso pericolônico pequeno (&lt; 3 cm), o tratamento clínico com antibioticoterapia é a conduta inicial padrão.</p>
  
  <h4>Comentário Detalhado:</h4>
  <p><strong>Alternativa Incorreta: D.</strong></p>
  <ul>
    <li>A presença de pneumoperitônio volumoso com peritonite difusa e abdome em tábua indica formalmente <strong>Laparotomia ou Laparoscopia imediata de emergência</strong>. É <strong>formalmente contraindicada</strong> a realização de exames endoscópicos (EDA ou colonoscopia) ou enemas opacos sob pressão, pois a insuflação de ar ou introdução de líquidos aumentará o extravasamento peritoneal e o risco de choque séptico e perfuração catastrófica;</li>
    <li>Todas as demais alternativas (A, B, C e E) expressam diretrizes cirúrgicas corretas e consagradas.</li>
  </ul>
</div>
`
    },
    {
      id: 'pontos-chave-enamed-abdome-agudo',
      title: '14. Pontos de Alto Rendimento e Diretrizes Práticas de Memorização para o ENAMED',
      body_html: `
<h3>Os Dez Mandamentos do Abdome Agudo para Concursos</h3>
<ul>
  <li><strong>1. Distinção de Dor Visceral vs Somática:</strong> Visceral = fibras C amielínicas, lenta, vaga, profunda, na linha média (epigástrio, mesogástrio ou hipogástrio conforme origem embriológica) com sintomas autonômicos; Somática = fibras A-delta mielínicas, rápida, cortante, localizada com defesa muscular e Blumberg positivo.</li>
  <li><strong>2. Sinal de Kehr e Nervo Frênico:</strong> Dor referida no ombro esquerdo por sangue na cúpula diafragmática (rotura de baço). Compartilha raízes cervicais C3 a C5 pelo nervo frênico com os nervos supraclaviculares.</li>
  <li><strong>3. Tríade dos Sinais de Pneumoperitônio:</strong>
    <ul>
      <li><em>Sinal de Joubert:</em> Timpanismo à percussão no hipocôndrio direito onde deveria haver macicez hepática;</li>
      <li><em>Sinal de Popper:</em> Gás em meia-lua subdiafragmática no RX de tórax em pé;</li>
      <li><em>Sinal de Rigler:</em> Gás desenhando as duas faces da parede intestinal (mucosa e serosa) no RX deitado.</li>
    </ul>
  </li>
  <li><strong>4. Incidência de Laurell:</strong> Paciente que não fica de pé faz Raio-X em <strong>Decúbito Lateral ESQUERDO com raios horizontais</strong> para ver o gás entre o fígado e a parede lateral direita. Nunca decúbito direito!</li>
  <li><strong>5. Obstrução em Delgado vs Cólon:</strong> Delgado = bridas em 60%, vômitos precoces, distensão central, válvulas coniventes completas em "empilhamento de moedas"; Cólon = câncer em 60%, parada precoce de fezes/gases, distensão periférica em moldura com haustrações espaçadas.</li>
  <li><strong>6. Lei de Laplace e o Ceco:</strong> Ceco com diâmetro <strong>&ge; 9 a 12 cm</strong> sob válvula ileocecal competente tem risco iminente de perfuração diastática por ter o maior raio.</li>
  <li><strong>7. O Paradoxo da Isquemia Mesentérica:</strong> Dor abdominal violenta nota 10/10 com <strong>abdome flácido sem peritonite nas primeiras horas</strong> em paciente cardiopata com Fibrilação Atrial. Cursa com <strong>hiperlactatemia severa precoce</strong>. Padrão-ouro: Angio-TC com contraste IV imediata.</li>
  <li><strong>8. Contraindicação da Laparoscopia:</strong> <strong>Choque circulatório / Instabilidade hemodinâmica grave</strong> contraindica laparoscopia, pois o pneumoperitônio comprime a veia cava e colapsa o retorno venoso. Indicar Laparotomia exploradora aberta.</li>
  <li><strong>9. Sinal de Proust:</strong> Dor excruciante ao toque com abaulamento do fundo de saco de Douglas na gravidez ectópica rota com hemoperitônio maciço.</li>
  <li><strong>10. Gestante e Idoso Mascaram Sintomas:</strong> No 3º trimestre gestacional o apêndice sobe para o flanco/QSD; no idoso, a imunossenescência atenua febre, leucocitose e defesa muscular. Indicar TC de abdome precocemente no idoso e USG seguido de RM na gestante.</li>
</ul>
`
    }
  ],
  references: [
    {
      title: 'Colégio Brasileiro de Cirurgiões (CBC) — Diretrizes de Conduta no Abdome Agudo',
      url: 'https://cbc.org.br/'
    },
    {
      title: 'World Society of Emergency Surgery (WSES) — Guidelines for the Management of Acute Abdomen and Peritonitis',
      url: 'https://wses.biomedcentral.com/'
    },
    {
      title: 'American College of Radiology (ACR) — ACR Appropriateness Criteria: Acute Nonlocalized Abdominal Pain',
      url: 'https://www.acr.org/Clinical-Resources/ACR-Appropriateness-Criteria'
    },
    {
      title: 'Ministério da Saúde do Brasil — Protocolo de Acolhimento e Manejo do Paciente com Dor Abdominal Aguda',
      url: 'https://www.gov.br/saude/pt-br'
    },
    {
      title: 'Sabiston Textbook of Surgery: The Biological Basis of Modern Surgical Practice, 21st Edition: Acute Abdomen',
      url: 'https://www.elsevier.com/books/sabiston-textbook-of-surgery/townsend/978-0-323-64062-6'
    }
  ]
};

const charCount = saveBook(book);
console.log(`[ABDOME AGUDO DONE] Total characters: ${charCount}`);
