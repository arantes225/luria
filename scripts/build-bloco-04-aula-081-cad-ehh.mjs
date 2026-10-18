import { saveBook } from './bloco-04-utils.mjs';

const book = {
  slug: 'cetoacidose-diabetica-e-estado-hiperosmolar',
  title: 'Cetoacidose Diabética e Estado Hiperosmolar',
  area: 'Clínica Médica',
  materia: 'Endocrinologia e Emergências Clínicas',
  description: 'Tratado completo e aprofundado sobre as Emergências Hiperglicêmicas Agudas no Adulto: Cetoacidose Diabética (CAD) e Estado Hiperglicêmico Hiperosmolar (EHH). Baseado nos consensos atualizados da Sociedade Brasileira de Diabetes (SBD) e American Diabetes Association (ADA). Abrange fisiopatologia comparada molecular, cetogênese hepática mitocondrial, critérios laboratoriais de estratificação de gravidade, protocolo intensivo de hidratação e sódio corrigido, algoritmo estrito de manejo do potássio ("regra de ouro"), insulinoterapia venosa contínua, critérios formais de resolução e transição para via subcutânea com sobreposição basal obrigatória, indicações restritas de bicarbonato, manejo de complicações fatais (edema cerebral, hipofosfatemia, hipocalemia), casos clínicos desafiadores e questões de concursos comentadas com todos os distratores.',
  sections: [
    {
      id: 'fisiopatologia-comparada-cad-vs-ehh',
      title: '1. Fisiopatologia Comparada da CAD versus Estado Hiperglicêmico Hiperosmolar',
      body_html: `
<h3>O Espectro das Crises Hiperglicêmicas Agudas</h3>
<p>A Cetoacidose Diabética (CAD) e o Estado Hiperglicêmico Hiperosmolar (EHH) representam os dois extremos fenotípicos de uma mesma síndrome de emergência metabólica decorrente da perda da homeostase glicêmica. Embora ambas compartilhem a elevação patológica dos níveis séricos de glicose e a ativação de hormônios contra-reguladores (glucagon, catecolaminas, cortisol e hormônio do crescimento), os mecanismos fisiopatológicos subjacentes diferem fundamentalmente no grau de deficiência insulínica, determinando cursos clínicos, manifestações laboratoriais e desfechos prognósticos substancialmente distintos.</p>

<h3>Fisiopatologia Molecular da Cetoacidose Diabética (CAD)</h3>
<p>O evento primário na CAD é a <strong>deficiência absoluta (ou quase absoluta) de insulina circulante</strong>, somada a um aumento drástico e desproporcional dos hormônios contrarreguladores. Esse desbalanço hormonal desencadeia uma cascata catabólica em três órgãos-alvo principais:</p>
<ol>
  <li><strong>Tecido Adiposo e Lipólise Descontrolada:</strong> A ausência de insulina remove o freio inibitório sobre a enzima <em>Lipase Hormônio-Sensível (LHS)</em> nos adipócitos. A LHS ativada cliva maciçamente os triglicerídeos de reserva em glicerol e <strong>Ácidos Graxos Livres (AGLs)</strong>, que são despejados na circulação porta e sistêmica em concentrações colossais.</li>
  <li><strong>Fígado e Cetogênese Mitocondrial:</strong> No hepatócito, os AGLs entram na mitocôndria através da enzima <em>Carnitina Palmitoil Transferase-1 (CPT-1)</em>. Em condições fisiológicas normais, a CPT-1 é bloqueada pelo malonil-CoA (um produto da síntese insulínica). Na CAD, a relação glucagon/insulina excessivamente elevada suprime o malonil-CoA, ativando ao máximo a CPT-1. Os AGLs sofrem intensa beta-oxidação mitocondrial, gerando quantidades maciças de acetil-CoA que sobrecarregam e saturam a capacidade do Ciclo de Krebs. O excesso de acetil-CoA é desviado para a via da <strong>cetogênese</strong>, produzindo <strong>ácido acetoacético (acetoacetato)</strong> e <strong>ácido beta-hidroxibutírico (beta-hidroxibutirato)</strong>, além de acetona volátil (responsável pelo hálito cetônico característico).</li>
  <li><strong>Acidose Metabólica com Ânion-Gap Elevado:</strong> O acetoacetato e o beta-hidroxibutirato são ácidos orgânicos fortes que se dissociam completamente em pH sanguíneo, liberando íons hidrogênio (H+) no plasma. Esses íons consomem rapidamente os estoques circulantes de bicarbonato (HCO3-), gerando uma grave <strong>acidose metabólica com ânion-gap aumentado</strong>.</li>
  <li><strong>Gliconeogênese, Glicogenólise e Diurese Osmótica:</strong> Simultaneamente, o fígado acelera a produção de nova glicose a partir de aminoácidos e glicerol. Quando a glicemia ultrapassa o limiar de reabsorção tubular renal de glicose (aproximadamente 180 mg/dL), desenvolve-se <strong>glicosúria maciça</strong>, que arrasta água e eletrólitos por diurese osmótica, culminando em desidratação moderada a grave (déficit hídrico médio de 5 a 7 litros, correspondendo a 10% do peso corporal).</li>
</ol>

<h3>Fisiopatologia do Estado Hiperglicêmico Hiperosmolar (EHH)</h3>
<p>O EHH ocorre quase exclusivamente em pacientes com Diabetes Mellitus Tipo 2, predominantemente idosos com acesso restrito a água ou portadores de infecções graves (pneumonia, infecção do trato urinário). O dado fisiopatológico definidor do EHH é a existência de uma <strong>deficiência RELATIVA de insulina</strong>:</p>
<ul>
  <li>A concentração residual de insulina portal no EHH (cerca de 1/10 da necessária para captação periférica de glicose) é <strong>suficiente para inibir a Lipase Hormônio-Sensível no tecido adiposo</strong>. Portanto, a lipólise é bloqueada, não há liberação expressiva de AGLs para o fígado e a <strong>cetogênese é praticamente ausente</strong> (não há produção significativa de cetoácidos nem acidose metabólica).</li>
  <li>Por outro lado, essa pequena quantidade de insulina é <strong>insuficiente para promover a captação celular de glicose no músculo ou frear a gliconeogênese hepática</strong>. Como a cetose não se desenvolve, o paciente não apresenta dor abdominal, náuseas precoces ou taquipneia acidótica (respiração de Kussmaul); assim, o quadro instala-se de forma lenta e insidiosa ao longo de dias a semanas.</li>
  <li>A glicosúria osmótica mantida por semanas acarreta <strong>desidratação profunda e extrema (déficit de 8 a 12 litros de água, equivalente a 15% a 20% do peso corporal)</strong>. A perda desproporcional de água livre em relação aos solutos eleva a glicemia a patamares vertiginosos (&gt; 600 a 1.200 mg/dL) e resulta em <strong>hiperosmolaridade sérica efetiva extrema (&gt; 320 mOsm/kg)</strong>, provocando desidratação neuronal intracelular, rebaixamento progressivo do nível de consciência, letargia e coma hiperosmolar.</li>
</ul>

<h3>Comparativo Síntese: Fisiopatologia e Repercussões</h3>
<table class="book-table">
  <thead>
    <tr>
      <th>Parâmetro de Comparação</th>
      <th>Cetoacidose Diabética (CAD)</th>
      <th>Estado Hiperglicêmico Hiperosmolar (EHH)</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>População Típica</strong></td>
      <td>DM Tipo 1 (crianças, adolescentes e adultos jovens) ou DM2 sob estresse catabólico extremo.</td>
      <td>DM Tipo 2 (idosos institucionalizados, acamados, demenciados ou com restrição hídrica).</td>
    </tr>
    <tr>
      <td><strong>Nível de Insulina Circulante</strong></td>
      <td><strong>Deficiência Absoluta</strong> (indetectável).</td>
      <td><strong>Deficiência Relativa</strong> (suficiente para bloquear a lipólise).</td>
    </tr>
    <tr>
      <td><strong>Lipólise e Cetogênese</strong></td>
      <td><strong>Maciças.</strong> Produção desenfreada de acetoacetato e beta-hidroxibutirato.</td>
      <td><strong>Mínimas ou Ausentes.</strong> Sem acúmulo patológico de corpos cetônicos.</td>
    </tr>
    <tr>
      <td><strong>Tempo de Instalação dos Sintomas</strong></td>
      <td>Agudo e rápido: <strong>&lt; 24 a 48 horas</strong>.</td>
      <td>Insidioso e progressivo: <strong>vários dias a semanas</strong>.</td>
    </tr>
    <tr>
      <td><strong>Déficit Hídrico Médio</strong></td>
      <td>Moderado a Grave: <strong>5 a 7 Litros</strong> (cerca de 100 mL/kg).</td>
      <td>Profundo e Extremo: <strong>8 a 12 Litros</strong> (150 a 200 mL/kg).</td>
    </tr>
    <tr>
      <td><strong>Osmolaridade Plasmática Efetiva</strong></td>
      <td>Normal ou levemente aumentada (&lt; 320 mOsm/kg).</td>
      <td><strong>Extremamente Elevada (&gt; 320 mOsm/kg)</strong>.</td>
    </tr>
    <tr>
      <td><strong>Acidose Metabólica</strong></td>
      <td><strong>Presente e Marcante (pH &lt; 7,30 e HCO3 &lt; 15) com Ânion-Gap Elevado</strong>.</td>
      <td><strong>Ausente</strong> (pH &gt; 7,30 e HCO3 &gt; 18 mEq/L; ânion-gap normal).</td>
    </tr>
    <tr>
      <td><strong>Mortalidade Hospitalar</strong></td>
      <td>Baixa em centros de referência (&lt; 1% a 3%).</td>
      <td><strong>Alta (10% a 20%)</strong> devido à idade avançada, sepse associada e choque hipovolêmico.</td>
    </tr>
  </tbody>
</table>
`
    },
    {
      id: 'criterios-diagnosticos-laboratoriais-estritos',
      title: '2. Critérios Diagnósticos Laboratoriais Estritos e Estratificação de Gravidade',
      body_html: `
<h3>Tabela Oficial de Diagnóstico e Estratificação da CAD e EHH (Diretrizes SBD / ADA)</h3>
<p>O diagnóstico definitivo e a correta classificação de gravidade fundamentam-se na gasometria arterial ou venosa, dosagem de eletrólitos séricos, glicemia plasmática e pesquisa quantitativa de corpos cetônicos séricos ou urinários:</p>
<table class="book-table">
  <thead>
    <tr>
      <th>Parâmetro Laboratorial</th>
      <th>CAD Leve</th>
      <th>CAD Moderada</th>
      <th>CAD Grave</th>
      <th>Estado Hiperglicêmico Hiperosmolar (EHH)</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>Glicemia Plasmática (mg/dL)</strong></td>
      <td>&gt; 200 a 250</td>
      <td>&gt; 200 a 250</td>
      <td>&gt; 200 a 250</td>
      <td><strong>&gt; 600</strong> (comum &gt; 800 a 1.200)</td>
    </tr>
    <tr>
      <td><strong>pH Arterial</strong></td>
      <td>7,25 a 7,29</td>
      <td>7,00 a 7,24</td>
      <td><strong>&lt; 7,00</strong></td>
      <td><strong>&gt; 7,30</strong> (frequentemente normal &ge; 7,35)</td>
    </tr>
    <tr>
      <td><strong>Bicarbonato Sérico (mEq/L)</strong></td>
      <td>15 a 18</td>
      <td>10 a &lt; 15</td>
      <td><strong>&lt; 10</strong></td>
      <td><strong>&gt; 18</strong></td>
    </tr>
    <tr>
      <td><strong>Cetonúria (Fita Reagente)</strong></td>
      <td>Positiva (&ge; 2+)</td>
      <td>Positiva (&ge; 3+)</td>
      <td>Positiva (&ge; 3+)</td>
      <td>Negativa ou Traços (&le; 1+)</td>
    </tr>
    <tr>
      <td><strong>Cetonemia (Beta-hidroxibutirato)</strong></td>
      <td>Positiva (&gt; 3,0 mmol/L)</td>
      <td>Positiva (&gt; 3,0 mmol/L)</td>
      <td>Positiva (&gt; 3,0 mmol/L)</td>
      <td>Normal ou discretamente elevada (&lt; 3,0 mmol/L)</td>
    </tr>
    <tr>
      <td><strong>Osmolaridade Efetiva (mOsm/kg)</strong></td>
      <td>Variável (&lt; 320)</td>
      <td>Variável (&lt; 320)</td>
      <td>Variável (&lt; 320)</td>
      <td><strong>&gt; 320 mOsm/kg</strong></td>
    </tr>
    <tr>
      <td><strong>Ânion-Gap Sérico (mEq/L)</strong></td>
      <td><strong>&gt; 10 a 12</strong></td>
      <td><strong>&gt; 12</strong></td>
      <td><strong>&gt; 12</strong></td>
      <td>Normal ou discretamente variável (&le; 12)</td>
    </tr>
    <tr>
      <td><strong>Estado Neurológico / Sensório</strong></td>
      <td>Alerta / Lúcido</td>
      <td>Alerta ou Sonolento</td>
      <td><strong>Estupor ou Coma</strong></td>
      <td><strong>Estupor ou Coma Profundo</strong></td>
    </tr>
  </tbody>
</table>

<h3>Fórmulas Matemáticas Obrigatórias na Emergência</h3>
<p>Para o manejo seguro e preciso das crises hiperglicêmicas, o médico deve dominar três cálculos matemáticos fundamentais:</p>

<h4>1. Ânion-Gap Sérico (Hiato Aniônico)</h4>
<p>O ânion-gap reflete a concentração plasmática de ânions não mensurados rotineiramente no laboratório (como cetoácidos, lactato, sulfato e proteínas aniônicas):</p>
<p><strong>Ânion-Gap = Sódio - (Cloreto + Bicarbonato) = Na+ - (Cl- + HCO3-)</strong></p>
<p>O valor de referência normal situa-se entre <strong>8 e 12 mEq/L</strong> (ou 10 &plusmn; 2). Na CAD estabelecida, a presença de acetoacetato e beta-hidroxibutirato eleva o ânion-gap para valores que frequentemente ultrapassam 16 a 25 mEq/L. A normalização do ânion-gap é o indicador mais fidedigno de interrupção da cetogênese.</p>

<h4>2. Osmolaridade Sérica Efetiva (Tonicidade Plasmática)</h4>
<p>Diferente da osmolaridade total, a osmolaridade efetiva considera apenas os solutos impermeáveis à membrana celular que exercem pressão osmótica real capaz de desidratar o compartimento intracelular (a ureia é excluída da fórmula por ser livremente permeável à membrana plasmática):</p>
<p><strong>Osmolaridade Efetiva = 2 &times; Na+ (mEq/L) + [Glicemia (mg/dL) / 18]</strong></p>
<p>Valores superiores a <strong>320 mOsm/kg</strong> definem a hipertonicidade extrema característica do Estado Hiperglicêmico Hiperosmolar e correlacionam-se diretamente com o grau de rebaixamento do sensório.</p>

<h4>3. Sódio Sérico Corrigido (Fórmula de Katz)</h4>
<p>A hiperglicemia acentuada atua como um potente agente osmótico no espaço intravascular, atraindo água livre do espaço intracelular para o plasma. Essa expansão aquosa dilui os eletrólitos circulantes, gerando uma <strong>falsa hiponatremia dilucional</strong>. Para estimar a real tonicidade sódica após a futura correção da glicemia, aplica-se a clássica equação:</p>
<p><strong>Na+ Corrigido = Na+ Medido + 1,6 &times; [(Glicemia - 100) / 100]</strong></p>
<p><em>Exemplo Clínico:</em> Paciente com Na+ dosado de 128 mEq/L e glicemia de 600 mg/dL:
<br>Na+ Corrigido = 128 + 1,6 &times; [(600 - 100) / 100] = 128 + 1,6 &times; 5 = 128 + 8 = <strong>136 mEq/L</strong>.
<br>Embora o laboratório acuse hiponatremia (128 mEq/L), o sódio real corrigido é rigorosamente normal (136 mEq/L), determinando a escolha da solução de hidratação seguinte.</p>

<h3>Particularidade Diagnóstica: Beta-Hidroxibutirato versus Fita de Cetonúria</h3>
<p>A fita reagente urinária tradicional utiliza a reação do nitroprussiato, que <strong>detecta exclusivamente o acetoacetato</strong> e não reage com o beta-hidroxibutirato. No momento da admissão de uma CAD grave, o ambiente intracelular mitocondrial encontra-se em estado altamente reduzido, com relação NADH/NAD+ muito elevada. Essa condição desvia quase todo o acetoacetato para a formação de <strong>beta-hidroxibutirato</strong> (que chega a representar mais de 80% a 90% dos corpos cetônicos circulantes). Consequentemente, a fita de urina pode subestimar a gravidade inicial da acidose. Pior ainda: durante o tratamento correto com insulina e hidratação, o beta-hidroxibutirato é oxidado de volta a acetoacetato para ser excretado, fazendo com que a cetonúria urinária de fita permaneça paradoxalmente positiva por dias, mesmo após a cura clínica da CAD. Portanto, a <strong>dosagem sérica direta de beta-hidroxibutirato no sangue capilar/venoso (&gt; 3,0 mmol/L)</strong> é o padrão-ouro laboratorial indiscutível para o diagnóstico e seguimento.</p>
`
    },
    {
      id: 'protocolo-intensivo-passo-a-passo-fluidos-potassio-insulina',
      title: '3. Protocolo Intensivo de Manejo: Hidratação, Potássio e Insulinoterapia',
      body_html: `
<h3>Etapa 1: Ressuscitação Volêmica e Reposição Hidroeletrolítica</h3>
<p>A prioridade clínica inicial absoluta no paciente em crise hiperglicêmica é a restauração imediata do volume intravascular, da perfusão tecidual e da filtração glomerular, reduzindo os níveis de hormônios do estresse e clareando parte da glicose por via renal:</p>
<ol>
  <li><strong>Primeira Hora (Fase de Expansão Rápida):</strong> Infundir <strong>Soro Fisiológico a 0,9% (NaCl 0,9%) em dose de 1.000 a 1.500 mL/h</strong> (ou 15 a 20 mL/kg na primeira hora) em acesso venoso periférico calibroso. Em caso de choque hipovolêmico franco, a infusão pode ser mais agressiva; se houver insuficiência cardíaca ou renal conhecida, reduzir a taxa para evitar congestão pulmonar.</li>
  <li><strong>Segunda Hora em Diante (Hidratação de Manutenção Baseada no Sódio Corrigido):</strong> Avalia-se o valor do Sódio Corrigido (pela fórmula de Katz):
    <ul>
      <li><em>Se Na+ Corrigido estiver NORMAL ou ELEVADO (&ge; 135 mEq/L):</em> Mudar a hidratação para <strong>Solução Salina Hipotônica a 0,45% (NaCl 0,45%) na velocidade de 250 a 500 mL/h</strong>, fornecendo água livre para corrigir a hiperosmolaridade intracelular.</li>
      <li><em>Se Na+ Corrigido estiver BAIXO (&lt; 135 mEq/L):</em> Manter a infusão com <strong>Soro Fisiológico a 0,9% (NaCl 0,9%) na velocidade de 250 a 500 mL/h</strong>.</li>
    </ul>
  </li>
  <li><strong>A Regra dos 200 a 250 mg/dL (Adição Precoce de Glicose):</strong> Quando a glicemia plasmática atingir <strong>200 a 250 mg/dL na CAD (ou 300 mg/dL no EHH)</strong>, deve-se <strong>acrescentar imediatamente Soro Glicosado a 5% (SG 5%)</strong> à hidratação venosa (habitualmente SF 0,45% com SG 5% na proporção 1:1, a 150-250 mL/h).
    <br><em>Justificativa Fisiopatológica Crucial:</em> A glicemia cai muito mais rapidamente do que o tempo necessário para oxidar os cetoácidos e fechar o ânion-gap. Se não for ofertada glicose exógena nesse momento, o paciente desenvolverá hipoglicemia severa que forçará a suspensão prematura da insulina, perpetuando a cetoacidose. O objetivo é manter a glicemia entre 150 e 200 mg/dL na CAD (e entre 200 e 300 mg/dL no EHH) <strong>enquanto se sustenta a infusão contínua de insulina até a completa resolução da acidose</strong>.</li>
</ol>

<h3>Etapa 2: Manejo do Potássio (A Regra de Ouro da Segurança)</h3>
<p>Todo paciente em CAD apresenta um <strong>déficit corporal total de potássio profundo (perda de 3 a 5 mEq/kg)</strong> decorrente da diurese osmótica maciça e da excreção urinária de cetoácidos como sais de potássio. No entanto, o potássio sérico inicial na admissão encontra-se frequentemente <strong>normal ou paradoxalmente elevado</strong> devido a três mecanismos fisiológicos simultâneos: (1) ausência de insulina, que impede a captação de potássio para dentro das células; (2) hiperosmolaridade plasmática, que arrasta água e potássio intracelular para o espaço extracelular por arraste de solvente; e (3) acidemia, onde íons H+ entram nas células trocados por íons K+ que saem para o plasma.</p>
<p>A administração de insulina e a hidratação venosa promovem um influxo celular súbito e colossal de potássio. Se a reposição não for manejada com rigor milimétrico, o paciente desenvolverá hipocalemia aguda fulminante com parada cardíaca em fibrilação ventricular ou assistolia. O algoritmo oficial de manejo do potássio estabelece condutas estritas:</p>
<table class="book-table">
  <thead>
    <tr>
      <th>Potássio Sérico na Admissão</th>
      <th>Conduta em Relação à Insulina</th>
      <th>Reposição Específica de Potássio</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>K+ &lt; 3,3 mEq/L (Hipocalemia)</strong></td>
      <td><strong>NUNCA INICIAR INSULINA! ADIAR O INÍCIO!</strong></td>
      <td>Repor <strong>20 a 30 mEq de KCl por hora</strong> por via intravenosa contínua com monitorização eletrocardiográfica. Iniciar insulina <em>somente após o K+ subir para &ge; 3,3 mEq/L</em>.</td>
    </tr>
    <tr>
      <td><strong>K+ entre 3,3 e 5,2 mEq/L (Normal)</strong></td>
      <td><strong>Iniciar a insulinoterapia venosa imediatamente.</strong></td>
      <td>Acrescentar <strong>20 a 30 mEq de KCl para CADA LITRO de soro de hidratação infundido</strong>, mantendo o potássio plasmático na faixa segura entre 4,0 e 5,0 mEq/L.</td>
    </tr>
    <tr>
      <td><strong>K+ &gt; 5,2 mEq/L (Hipercalemia)</strong></td>
      <td><strong>Iniciar a insulinoterapia venosa imediatamente.</strong></td>
      <td><strong>NÃO repor potássio</strong> no momento. Dosar o potássio sérico a cada 2 horas; assim que cair para &lt; 5,2 mEq/L, adicionar imediatamente 20-30 mEq de KCl por litro de soro.</td>
    </tr>
  </tbody>
</table>

<h3>Etapa 3: Insulinoterapia Venosa Contínua (Bomba de Infusão)</h3>
<p>O objetivo precípuo da insulina na CAD não é a mera redução da glicemia, mas sim a <strong>supressão definitiva da lipólise periférica e o bloqueio da cetogênese mitocondrial hepática</strong>. A via de escolha absoluta em ambiente hospitalar é a infusão venosa contínua de <strong>Insulina Regular</strong> através de bomba de infusão volumétrica:</p>
<ul>
  <li><strong>Dose de Infusão:</strong> Prescrever Insulina Regular venosa contínua na taxa fixa de <strong>0,1 U/kg/hora</strong> (ou iniciar com bólus inicial opcional de 0,1 U/kg IV seguido de 0,1 U/kg/h contínuo). Diluição padrão: 100 U de Insulina Regular em 100 mL de SF 0,9% (concentração de 1 U/mL). Desprezar os primeiros 20 a 50 mL da solução no equipo para saturar os sítios plásticos de adesão da insulina antes de conectar ao paciente.</li>
  <li><strong>Meta Horária de Queda Glicêmica:</strong> A velocidade ideal de redução da glicemia plasmática é de <strong>50 a 70 mg/dL por hora</strong>.
    <ul>
      <li><em>Se a glicemia não cair pelo menos 50 mg/dL na primeira hora:</em> Checar o acesso venoso e a hidratação; dobrar a velocidade de infusão da insulina (ex: elevar para 0,2 U/kg/h) até obter a taxa de queda alvo.</li>
      <li><em>Se a glicemia cair mais de 100 mg/dL em 1 hora:</em> Reduzir a taxa de infusão pela metade para prevenir alterações osmóticas bruscas no sistema nervoso central.</li>
    </ul>
  </li>
  <li><strong>Protocolo Alternativo na CAD Leve em Enfermaria:</strong> Em serviços sem vaga de UTI para CAD leve e não complicada, diretrizes recentes validam o uso de análogos de insulina ultrarrápida (Lispro ou Aspart) por via subcutânea a cada 1 ou 2 horas na dose de 0,15 a 0,2 U/kg/dose, associado à hidratação adequada.</li>
</ul>
`
    },
    {
      id: 'criterios-resolucao-cad-transicao-subcutanea',
      title: '4. Critérios de Resolução da CAD e Transição Segura para Insulina Subcutânea',
      body_html: `
<h3>Critérios Laboratoriais Estritos de Resolução da CAD</h3>
<p>Um dos erros mais comuns e graves na sala de emergência é julgar que a cetoacidose foi curada apenas porque a glicemia normalizou (&lt; 200 mg/dL). A CAD só é considerada clinicamente e laboratorialmente <strong>RESOLVIDA</strong> quando todos os seguintes parâmetros forem simultaneamente documentados:</p>
<ol>
  <li><strong>Glicemia Plasmática &lt; 200 mg/dL; E</strong></li>
  <li><strong>Pelo menos DOIS dos três seguintes critérios laboratoriais:</strong>
    <ul>
      <li><strong>Bicarbonato Sérico &ge; 15 mEq/L;</strong></li>
      <li><strong>pH Venoso &gt; 7,30 (ou pH arterial &gt; 7,35);</strong></li>
      <li><strong>Ânion-Gap Sérico Normalizado (&le; 12 mEq/L).</strong></li>
    </ul>
  </li>
  <li>Além disso, o paciente deve encontrar-se com <strong>estabilidade clínica, nível de consciência normal e capacidade plena de ingerir alimentos por via oral</strong> sem náuseas ou vômitos.</li>
</ol>
<p><em>Critérios de Resolução do Estado Hiperglicêmico Hiperosmolar (EHH):</em> Resolução da hiperosmolaridade sérica efetiva (<strong>Osmolaridade Efetiva &lt; 315 mOsm/kg</strong>), recuperação do nível de consciência prévio do paciente, glicemia &lt; 250-300 mg/dL e estabilidade hemodinâmica.</p>

<h3>A Regra Vital da Sobreposição na Transição para Insulina Subcutânea (SC)</h3>
<p>A meia-vida plasmática da Insulina Regular administrada por via intravenosa é extremamente curta, durando apenas <strong>4 a 5 minutos</strong>. Se a bomba de infusão venosa for desligada abruptamente sem a presença prévia de insulina no tecido celular subcutâneo, os níveis de insulina caem para zero em poucos minutos. Como a circulação ainda se encontra saturada de hormônios contra-reguladores residuais, a lipólise recomeça instantaneamente, deflagrando <strong>cetoacidose de rebote em menos de 30 a 60 minutos</strong> e obrigando o reinício de todo o protocolo intensivo na UTI.</p>
<p>Para prevenir essa catástrofe iatrogênica, as diretrizes da SBD e ADA estabelecem o seguinte protocolo mandatória de transição:</p>
<ul>
  <li><strong>Momento Ideal:</strong> Planejar a transição preferencialmente próximo aos horários das grandes refeições (café da manhã ou almoço).</li>
  <li><strong>Dose de Insulina Subcutânea:</strong>
    <ul>
      <li><em>Se o paciente já usava insulina ambulatorialmente antes da descompensação:</em> Reiniciar a dose diária prévia conhecida (ajustando se houver fator precipitante superado).</li>
      <li><em>Se for paciente recém-diagnosticado virgem de insulina:</em> Iniciar esquema basal-bolus com dose total de <strong>0,5 a 0,7 U/kg/dia</strong>, dividida em 50% de insulina basal (NPH ou análogo longo Glargina/Degludeca) e 50% fracionada em 3 doses de insulina rápida/ultrarrápida antes das refeições.</li>
    </ul>
  </li>
  <li><strong>A Janela de Sobreposição Obrigatória:</strong> Administrar a dose de insulina basal subcutânea (NPH ou análogo Glargina/Degludeca) associada a uma dose prandial e oferecer a refeição ao paciente. <strong>MANTER A BOMBA DE INSULINA VENOSA LIGADA POR MAIS 2 HORAS APÓS A INJEÇÃO SUBCUTÂNEA</strong> (se for utilizado o análogo Glargina, aguardar 2 a 3 horas; se for NPH, aguardar 2 horas). Somente após esse período de absorção tecidual comprovada é que a bomba venosa deve ser definitivamente desligada.</li>
</ul>
`
    },
    {
      id: 'indicacao-estrita-bicarbonato-fosfato',
      title: '5. O Papel Restrito do Bicarbonato de Sódio e o Manejo do Fósforo',
      body_html: `
<h3>Por que o Uso Indiscriminado de Bicarbonato de Sódio é Prejudicial?</h3>
<p>Durante décadas, acreditava-se intuitivamente que infundir bicarbonato de sódio corrigiria prontamente a acidose da CAD e salvaria o paciente. Ensaios clínicos randomizados modernos sepultaram essa conduta, demonstrando que a administração empírica de bicarbonato não reduz a mortalidade, não acelera a resolução da acidose e <strong>induz graves efeitos deletérios fisiopatológicos</strong>:</p>
<ol>
  <li><strong>Acidose Paradoxal do Sistema Nervoso Central (Efeito Bohr Cerebral):</strong> O bicarbonato infundido no sangue reage com íons H+, gerando água e CO2 (<em>HCO3- + H+ &harr; H2O + CO2</em>). O bicarbonato iônico é uma molécula polar carregada que <strong>não atravessa a barreira hematoencefálica</strong>. Em contrapartida, o gás CO2 lipofílico difunde-se livremente e instantaneamente para dentro do líquor e das células gliais cerebrais. No tecido cerebral, o CO2 hidrata-se formando ácido carbônico, provocando uma <strong>queda abrupta e severa do pH liquórico cerebral</strong>, agravando o rebaixamento do nível de consciência e precipitando coma neurológico.</li>
  <li><strong>Piora Drástica da Hipocalemia:</strong> A elevação rápida do pH plasmático força a entrada em massa de potássio extracelular para dentro das células, colapsando o K+ sérico e precipitando arritmias ventriculares fatais.</li>
  <li><strong>Desvio da Curva de Dissociação da Hemoglobina para a Esquerda:</strong> A alcalinização plasmática aguda aumenta a afinidade da hemoglobina pelo oxigênio, dificultando a liberação de O2 para os tecidos periféricos isquêmicos e agravando a hipóxia celular.</li>
  <li><strong>Sobrecarga Hiperosmolar de Sódio:</strong> O bicarbonato de sódio a 8,4% é uma solução hiperosmolar agressiva que eleva o sódio plasmático e pode desencadear sobrecarga volêmica e edema agudo de pulmão.</li>
</ol>

<h3>Indicação Estrita e Protocolo de Bicarbonato na CAD</h3>
<p>Diante dos riscos documentados, o consenso internacional da ADA e SBD restringe a indicação de bicarbonato de sódio <strong>exclusivamente aos pacientes com Acidose Refratária com pH Arterial &lt; 6,90</strong> após a primeira hora de hidratação vigorosa (cenário de alto risco de colapso hemodinâmico por contratilidade miocárdica deprimida e vasodilatação periférica extrema induzidas pela acidose crítica):</p>
<table class="book-table">
  <thead>
    <tr>
      <th>Parâmetro de Decisão</th>
      <th>pH Arterial &ge; 6,90</th>
      <th>pH Arterial &lt; 6,90 (Indicação Estrita)</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>Recomendação Oficial</strong></td>
      <td><strong>FORMALMENTE CONTRAINDICADO!</strong></td>
      <td><strong>Indicado sob monitorização estrita em UTI.</strong></td>
    </tr>
    <tr>
      <td><strong>Solução e Diluição</strong></td>
      <td>Nenhuma infusão de bicarbonato. A insulina e a hidratação metabolizam os cetoácidos em bicarbonato endógeno.</td>
      <td>Diluir <strong>100 mEq de Bicarbonato de Sódio</strong> (aproximadamente 100 mL de bicarbonato a 8,4%) em <strong>400 mL de água destilada</strong> (tornando a solução isotônica), associando <strong>20 mEq de KCl</strong>.</td>
    </tr>
    <tr>
      <td><strong>Velocidade e Meta</strong></td>
      <td>—</td>
      <td>Infundir por via intravenosa ao longo de <strong>2 horas</strong>. Reavaliar a gasometria arterial: se o pH persistir &lt; 6,90, repetir a infusão; assim que o <strong>pH atingir &ge; 7,00, suspender imediatamente a infusão</strong>.</td>
    </tr>
  </tbody>
</table>

<h3>Manejo do Fósforo e Risco da Hipofosfatemia Grave</h3>
<p>De forma análoga ao potássio, a diurese osmótica induz uma perda expressiva de fosfato na urina, e a insulinoterapia promove o influxo intracelular de fósforo para fosforilação da glicose. Em sua grande maioria, a hipofosfatemia leve a moderada na CAD é assintomática e não requer reposição intravenosa sistemática.</p>
<p>No entanto, a <strong>Hipofosfatemia Grave (Fósforo Sérico &lt; 1,0 mg/dL)</strong> é uma condição de altíssimo risco biológico, pois esgota a produção intracelular de trifosfato de adenosina (ATP) e 2,3-difosfoglicerato (2,3-DPG), acarretando <strong>falência diafragmática com parada respiratória aguda, disfunção miocárdica sistólica aguda, rabdomiólise maciça, hemólise intravascular aguda e encefalopatia metabólica</strong>. Nestes casos restritos (ou na presença de anemia grave ou cardiopatia associada), deve-se repor <strong>Fosfato de Potássio na dose de 20 a 30 mmol</strong> administrado lentamente ao longo de 4 a 6 horas na hidratação de manutenção, descontando o potássio equivalente da reposição de KCl.</p>
`
    },
    {
      id: 'complicacoes-catastroficas-edema-cerebral',
      title: '6. Complicações Agudas Graves e Manejo do Edema Cerebral na CAD',
      body_html: `
<h3>Quadro Geral das Complicações Iatrogênicas e Fatais</h3>
<p>A taxa de mortalidade na CAD e no EHH decorre, em grande proporção, das complicações decorrentes do próprio tratamento intensivo administrado de forma intempestiva ou inadequada:</p>
<ul>
  <li><strong>Hipocalemia Severa:</strong> Induzida por insulina iniciada sem checagem prévia de K+ ou sem reposição associada. Gera arritmias ventriculares malignas (torsades de pointes, TV, FV) e assistolia.</li>
  <li><strong>Hipoglicemia Iatrogênica:</strong> Resultante da omissão na adição de Soro Glicosado a 5% quando a glicemia atinge 200-250 mg/dL. Desencadeia descarga adrenérgica e piora neurológica.</li>
  <li><strong>Sobrecarga Hídrica e Edema Agudo de Pulmão:</strong> Decorrente de infusão excessiva de cristaloides em pacientes idosos com cardiopatia subjacente ou nefropatia diabética.</li>
  <li><strong>Acidose Hiperclorêmica Hipervolêmica:</strong> Infusão prolongada de volumes colossais de SF 0,9% (que contém 154 mEq/L de cloro, contra 100-106 mEq/L do plasma) induz acidose metabólica hiperclorêmica com ânion-gap normal. Não deve ser confundida com persistência da cetoacidose; resolve espontaneamente com troca de fluidos por soluções balanceadas (Ringer Lactato ou Plasmalyte) ou NaCl 0,45%.</li>
  <li><strong>Tromboembolismo Venoso (TEV):</strong> A desidratação extrema e a hiperviscosidade sanguínea (em especial no EHH) elevam drasticamente o risco de trombose venosa profunda e embolia pulmonar maciça. A <strong>tromboprofilaxia profilática com Heparina Não Fracionada ou Enoxaparina</strong> é obrigatória em todo paciente em CAD/EHH hospitalizado, desde que não haja sangramento ativo.</li>
</ul>

<h3>Edema Cerebral Agudo na CAD: Fisiopatologia, Sinais Clínicos e Tratamento</h3>
<p>O <strong>Edema Cerebral Agudo</strong> é a complicação mais letal da cetoacidose diabética, respondendo por mais de 60% a 90% de todas as mortes por CAD em pacientes pediátricos e adultos jovens. Ocorre em aproximadamente 0,5% a 1% dos episódios de CAD em crianças, com taxa de mortalidade que varia de 20% a 50% e sequelas neurológicas neurológicas permanentes em até 35% dos sobreviventes.</p>
<p><strong>Mecanismo Fisiopatológico:</strong> A hiperglicemia e a hiperosmolaridade crônicas forçam os astrócitos e neurônios cerebrais a sintetizarem solutos osmolares intracelulares protetores (conhecidos como <em>osmóis idiopáticos</em>: taurina, mioinositol e glutamina) para equilibrar a osmolaridade intracelular com o plasma hiperosmolar e evitar o colapso celular. Se a hidratação venosa for excessivamente rápida com soluções hipotônicas ou se a glicemia plasmática despencar de forma vertiginosa (&gt; 100 mg/dL/hora), a osmolaridade do plasma cai abruptamente enquanto a concentração de osmóis no interior dos neurônios permanece temporariamente elevada. Essa enorme diferença de gradiente osmótico força a <strong>água livre plasmática a entrar maciçamente no encéfalo por osmose</strong>, provocando tumefação celular, edema cerebral citotóxico e vasogênico agudo, hipertensão intracraniana (HIC) fulminante e <strong>herniação uncal transtentorial ou de tonsilas cerebelares</strong> com compressão do tronco encefálico.</p>
<p><strong>Fatores de Risco Reconhecidos:</strong> Idade &lt; 5 anos, primeiro episódio de DM1 (cetoacidose inaugural), acidose inicial grave com pH &lt; 7,10, hipocapnia grave desproporcional, elevação persistente do sódio sérico não observada durante o tratamento (ausência do aumento esperado do sódio com a queda da glicemia), administração de bicarbonato de sódio e infusão de volumes excessivos (&gt; 4.000 mL/m²/dia) nas primeiras 4 horas.</p>

<h3>Reconhecimento Imediato e Protocolo de Resgate do Edema Cerebral</h3>
<table class="book-table">
  <thead>
    <tr>
      <th>Fase Clínica</th>
      <th>Sinais e Sintomas de Alerta Vermelho</th>
      <th>Conduta Imediata de Emergência</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>Sinais de Alerta Precoce (Iniciais)</strong></td>
      <td>Cefaleia de início súbito ou progressivamente lancinante durante o tratamento, letargia súbita, irritabilidade psicomotora desmotivada, vômitos em jato recorrentes e incontinência urinária após melhora prévia.</td>
      <td><strong>NÃO AGUARDAR TOMOGRAFIA DE CRÂNIO!</strong> Elevar a cabeceira a 30 graus, reduzir imediatamente a taxa de hidratação venosa pela metade e preparar terapia osmolar hiperosmolar na beira do leito.</td>
    </tr>
    <tr>
      <td><strong>Sinais de Hipertensão Intracraniana Avançada / Herniação</strong></td>
      <td><strong>Tríade de Cushing</strong> (Bradicardia severa, Hipertensão arterial sistêmica e padrão respiratório irregular/bradipneia), paralisia do 6º par craniano (abducente), anisocoria pupilar, postura de decorticação ou descerebração e rebaixamento comatoso do sensório.</td>
      <td>Administrar terapia osmolar intravenosa imediata em bólus:
        <ul>
          <li><strong>Opção 1: Manitol a 20%:</strong> <strong>0,5 a 1,0 g/kg IV</strong> infundido rapidamente em 15 a 20 minutos (repetir após 30-120 min se necessário); OU</li>
          <li><strong>Opção 2: Solução Salina Hipertônica a 3% (NaCl 3%):</strong> <strong>2,5 a 5,0 mL/kg IV</strong> infundido em 15 a 30 minutos (altamente eficaz e preferível se o paciente estiver hipotenso).</li>
        </ul>
        Intubação orotraqueal em sequência rápida protetora, evitando hiperventilação excessiva (manter PaCO2 entre 30 e 35 mmHg). Somente após estabilização hemodinâmica e administração do osmolar transportar para TC de crânio.
      </td>
    </tr>
  </tbody>
</table>
`
    },
    {
      id: 'particularidades-cad-euglicemica-isglt2',
      title: '7. Cetoacidose Diabética Euglicêmica e o Impacto dos Inibidores de SGLT2',
      body_html: `
<h3>Conceito e Definição da CAD Euglicêmica</h3>
<p>A Cetoacidose Diabética Euglicêmica (euCAD) é uma variante clínica desafiadora definida pela tríade de: <strong>(1) Acidose metabólica com ânion-gap aumentado (pH arterial &lt; 7,30 e bicarbonato &lt; 15 mEq/L); (2) Cetonemia e/ou cetonúria francamente positivas; e (3) Níveis de glicemia plasmática normais ou apenas discretamente elevados (&lt; 200 a 250 mg/dL)</strong>. Por não cursar com a hiperglicemia marcante típica, essa emergência é frequentemente subdiagnosticada na triagem de prontos-socorros, retardando o início do tratamento e levando a desfechos fatais.</p>

<h3>Mecanismo Fisiopatológico Induzido pelos Inibidores de SGLT2 (Gliflozinas)</h3>
<p>Embora descrita originalmente em situações de jejum prolongado, gestação ou consumo excessivo de álcool, a euCAD emergiu como uma das principais complicações farmacológicas contemporâneas decorrentes do uso disseminado dos inibidores de SGLT2 (<strong>Dapagliflozina e Empagliflozina</strong>). O mecanismo molecular compreende:</p>
<ol>
  <li><strong>Glicosúria Renal Sustentada e Mascaramento Glicêmico:</strong> Os iSGLT2 bloqueiam a reabsorção de glicose no túbulo proximal renal, forçando a eliminação contínua de 70 a 80 gramas de glicose na urina por dia. Esse clareamento renal artificial drena a glicose plasmática continuamente, <strong>mantendo os níveis glicêmicos abaixo de 200 mg/dL mesmo diante de uma tempestade catabólica</strong>.</li>
  <li><strong>Hipoisulinemia Relativa e Desbloqueio da Cetogênese:</strong> A glicemia normal ou mais baixa reduz o estímulo para a secreção de insulina endógena (no DM2) ou leva o paciente e médicos a reduzirem erroneamente a dose de insulina exógena (no DM1 ou DM2 insulinodependente). A queda nos níveis de insulina circulante ativa a Lipase Hormônio-Sensível nos adipócitos, disparando a liberação de ácidos graxos livres.</li>
  <li><strong>Hipersecreção Direta de Glucagon pelas Células Alfa Pancreáticas:</strong> Os iSGLT2 bloqueiam transportadores SGLT2 presentes na membrana das células alfa dos ilhéus de Langerhans, estimulando diretamente a transcrição e liberação massiva de <strong>Glucagon</strong>. A elevação extrema da relação glucagon/insulina ativa a carnitina palmitoil transferase-1 (CPT-1) no fígado, acelerando a oxidação de ácidos graxos em corpos cetônicos (acetoacetato e beta-hidroxibutirato).</li>
  <li><strong>Diminuição do Clearance Renal de Corpos Cetônicos:</strong> Os transportadores tubulares renais de sódio e ânions orgânicos passam a reabsorver mais cetoácidos circulantes para reter sódio, elevando ainda mais as concentrações plasmáticas de beta-hidroxibutirato.</li>
</ol>

<h3>Gatilhos Precipitantes e Prevenção Perioperatória</h3>
<p>A euCAD induzida por iSGLT2 raramente ocorre de forma espontânea; exige quase sempre um fator precipitante de estresse metabólico: <strong>cirurgias de médio e grande porte, infecções agudas intercorrentes (sepse, pneumonia), redução abrupta ou omissão de doses de insulina, jejum calórico prolongado ou dietas cetogênicas (baixo carboidrato e alta gordura) e abuso de álcool</strong>.</p>
<p><strong>Conduta Preventiva Obrigatória:</strong> As diretrizes da SBD e da Sociedade Brasileira de Anestesiologia estabelecem que os inibidores de SGLT2 devem ser <strong>formalmente SUSPENSOS pelo menos 3 a 4 dias antes de qualquer cirurgia eletiva</strong> de médio ou grande porte ou procedimentos que exijam jejum prolongado. Em cirurgias de urgência, a equipe deve monitorar o ânion-gap, gasometria e beta-hidroxibutirato sérico no pós-operatório mesmo se as glicemias capilares estiverem normais.</p>

<h3>Manejo Clínico da CAD Euglicêmica</h3>
<p>O manejo da euCAD obedece aos mesmos pilares da CAD tradicional, com uma adaptação estratégica essencial: como a glicemia de entrada já é &lt; 200-250 mg/dL, <strong>a infusão de Soro Glicosado a 5% ou 10% deve ser INICIADA SIMULTANEAMENTE à insulinoterapia venosa contínua desde a primeira hora</strong>. A glicose exógena é necessária para permitir que a insulina seja infundida em doses terapêuticas plenas (0,05 a 0,1 U/kg/h) a fim de suprimir a lipólise e fechar o ânion-gap sem deflagrar hipoglicemia severa.</p>
`
    },
    {
      id: 'monitorizacao-laboratorial-fluxograma-emergencia',
      title: '8. Monitorização Laboratorial Seriada e Fluxograma de Decisão na Sala Vermelha',
      body_html: `
<h3>Cronograma de Coleta Laboratorial na UTI e Emergência</h3>
<p>A condução bem-sucedida das crises hiperglicêmicas exige uma disciplina rígida de monitorização clínica e laboratorial à beira do leito para titulação de drogas e detecção precoce de complicações:</p>
<table class="book-table">
  <thead>
    <tr>
      <th>Exame / Parâmetro Clínico</th>
      <th>Frequência de Monitorização</th>
      <th>Objetivo Clínico e Limiares de Alerta</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>Glicemia Capilar na Ponta de Dedo</strong></td>
      <td><strong>A cada 1 hora</strong></td>
      <td>Ajustar a velocidade da bomba de insulina. Manter queda de 50 a 70 mg/dL/h. Iniciar SG 5% quando &lt; 250 mg/dL.</td>
    </tr>
    <tr>
      <td><strong>Potássio Sérico e Eletrólitos (Na+, Cl-)</strong></td>
      <td><strong>A cada 2 horas</strong> (nas primeiras 6h) e a cada 4h após</td>
      <td>Ajustar a reposição de KCl. Manter K+ entre 4,0 e 5,0 mEq/L. Suspender insulina se K+ cair para &lt; 3,3 mEq/L.</td>
    </tr>
    <tr>
      <td><strong>Gasometria Venosa e Cálculo do Ânion-Gap</strong></td>
      <td><strong>A cada 2 a 4 horas</strong></td>
      <td>Avaliar recuperação do pH e do bicarbonato sérico. Aferir fechamento do ânion-gap (&le; 12 mEq/L) para critérios de cura.</td>
    </tr>
    <tr>
      <td><strong>Beta-Hidroxibutirato Sérico Capilar</strong></td>
      <td><strong>A cada 2 a 4 horas</strong> (se disponível)</td>
      <td>Marcador direto de resolução da cetogênese (meta &lt; 0,6 a 1,0 mmol/L).</td>
    </tr>
    <tr>
      <td><strong>Pressão Arterial, FC, FR, Sinais Vitais e Glasgow</strong></td>
      <td><strong>A cada 1 hora</strong></td>
      <td>Detectar hipotensão por hipovolemia, taquipneia de Kussmaul ou surgimento de bradicardia/hipertensão (Edema Cerebral).</td>
    </tr>
    <tr>
      <td><strong>Balanço Hídrico e Débito Urinário</strong></td>
      <td><strong>Horário (Sondagem vesical se comatoso)</strong></td>
      <td>Garantir diurese &ge; 0,5 mL/kg/h. Detectar retenção aguda ou necrose tubular aguda associada.</td>
    </tr>
  </tbody>
</table>

<h3>Validade da Gasometria Venosa versus Gasometria Arterial</h3>
<p>Um ponto de extrema praticidade clínica e amplamente cobrado em concursos médicos é a desnecessidade de punções arteriais repetitivas dolorosas para monitorização da CAD. Estudos prospectivos multicêntricos demonstraram que a <strong>Gasometria Venosa Periférica é perfeitamente fidedigna e suficiente para o acompanhamento do tratamento</strong>:</p>
<ul>
  <li>O <strong>pH venoso</strong> é em média apenas <strong>0,03 unidades mais baixo</strong> que o pH arterial (pH arterial = pH venoso + 0,03).</li>
  <li>O <strong>Bicarbonato venoso</strong> é praticamente idêntico ao arterial (diferença média insignificante &lt; 0,5 mEq/L).</li>
  <li>Portanto, uma gasometria venosa mostrando pH de 7,27 equivale a um pH arterial de 7,30. A punção arterial é reservada apenas na admissão se houver hipoxemia pulmonar associada ou instabilidade hemodinâmica profunda que exija monitorização de PaO2 ou pressão arterial invasiva (PAI).</li>
</ul>
`
    },
    {
      id: 'fatores-precipitantes-infecciosos-nao-infecciosos',
      title: '9. Fatores Precipitantes e Investigação Diagnóstica das Causas de Base',
      body_html: `
<h3>A Regra dos "5 Is" das Emergências Hiperglicêmicas</h3>
<p>A cetoacidose diabética e o estado hiperosmolar não ocorrem no vácuo; são quase invariavelmente desencadeados por um fator desestabilizador agudo que rompe o equilíbrio metabólico frágil. A busca ativa pela etiologia de base deve ocorrer simultaneamente à ressuscitação nas primeiras horas da admissão. Didaticamente, utilizam-se os clássicos <strong>"5 Is"</strong>:</p>
<ol>
  <li><strong>Infecção (Infection):</strong> É a causa precipitante mais prevalente em todo o mundo (responsável por 40% a 55% dos casos). As principais infecções deflagradoras incluem:
    <ul>
      <li><em>Pneumonia Adquirida na Comunidade (PAC):</em> Principal causa respiratória, frequentemente oligossintomática no idoso.</li>
      <li><em>Infecção do Trato Urinário (ITU / Pielonefrite Aguda):</em> Altamente prevalente em diabéticos devido à bexiga neurogênica e glicosúria.</li>
      <li><em>Infecções de Pele e Partes Moles:</em> Úlceras infectadas no pé diabético, celulite, abscessos perineais (Gangrena de Fournier).</li>
      <li><em>Infecções Abdominais Ocultas:</em> Colecistite aguda, apendicite, diverticulite perfurada.</li>
    </ul>
    <em>Armadilha Semiológica no Leucograma:</em> A desidratação maciça e a descarga aguda de cortisol/catecolaminas na CAD induzem <strong>leucocitose fisiológica de estresse por desmarginação leucocitária (leucócitos entre 15.000 e 25.000/mm³) mesmo na ausência total de infecção</strong>. No entanto, a presença de mais de 10% de bastonetes (desvio à esquerda escalonado), febre ou hipotermia e elevação de Proteína C-Reativa / Procalcitonina indicam infecção bacteriana verdadeira.
  </li>
  <li><strong>Inadequação / Omissão Terapêutica (Inadequate Insulin / Non-compliance):</strong> Segunda causa mais comum (25% a 35%), em especial em adolescentes e adultos jovens vulneráveis socialmente. Envolve abandono voluntário do tratamento, problemas econômicos de acesso ao insumo, quebra de seringas/canetas, erro na dosagem de insulina prescrita, transtornos alimentares (diabulimia) ou descontinuação indevida durante episódios de náuseas ("se não comi, não devo tomar insulina").</li>
  <li><strong>Isquemia / Infarto (Infarction):</strong> Isquemia coronariana aguda (Infarto Agudo do Miocárdio, que no paciente diabético é frequentemente indolor ou atípico, manifestando-se apenas por náuseas e descompensação hiperglicêmica), Acidente Vascular Encefálico (isquêmico ou hemorrágico), Isquemia Mesentérica aguda e Trombose Arterial Aguda de membros inferiores.</li>
  <li><strong>Intoxicação / Iatrogenia Medicamentosa (Intoxication / Drugs):</strong>
    <ul>
      <li><em>Corticosteroides Sistêmicos:</em> Potentes estimuladores da gliconeogênese e da resistência hepática/periférica à insulina.</li>
      <li><em>Inibidores de SGLT2 (Dapagliflozina, Empagliflozina):</em> Desencadeadores de cetoacidose euglicêmica.</li>
      <li><em>Abuso de Substâncias:</em> Cocaína (induz tempestade adrenérgica colossal e abandono do autocuidado), álcool em excesso (induz cetose de jejum e desidratação).</li>
      <li><em>Antipsicóticos Atípicos (Olanzapina, Clozapina):</em> Ganho de peso e indução aguda de disfunção da célula beta.</li>
    </ul>
  </li>
  <li><strong>Iniciação / Estreia da Doença (Initial Presentation / Infant):</strong> Em 15% a 25% dos casos de DM1 em crianças e adultos jovens, a <strong>Cetoacidose Diabética é a primeira manifestação clínica reveladora</strong> do diabetes, com história prévia de semanas de polidipsia, enurese noturna secundária e perda ponderal não valorizadas.</li>
</ol>

<h3>A Síndrome do "Abdome Agudo Metabólico" na CAD</h3>
<p>Aproximadamente 40% a 50% dos pacientes com CAD (especialmente crianças e jovens) apresentam queixas gastrointestinais proeminentes: <strong>dor abdominal difusa intensa associada a náuseas, vômitos incoercíveis e descompressão dolorosa simulada</strong>. Esse fenômeno decorre da acidose metabólica grave, distensão da cápsula hepática por acúmulo lipídico agudo, gastroparesia hipocalêmica e desidratação das serosas peritoneais. Esse pseudo-abdome agudo cirúrgico <strong>reverte completamente após 4 a 6 horas de hidratação e correção da acidose</strong>. Se a dor abdominal persistir após a resolução da cetoacidose, impõe-se a investigação cirúrgica formal por tomografia computadorizada para excluir apendicite, colecistite ou isquemia mesentérica concomitantes.</p>
`
    },
    {
      id: 'casos-clinicos-alta-complexidade-cad-ehh',
      title: '10. Casos Clínicos Complexos com Discussão Fisiopatológica e Baseada em Evidências',
      body_html: `
<h3>Caso Clínico 1: CAD Inaugural com Manejo Estrito de Potássio e Sódio Corrigido</h3>
<p><strong>História Clínica:</strong> Jovem de 17 anos, sexo feminino, estudante, sem comorbidades prévias conhecidas. É trazida à sala de emergência pelos pais em estado de sonolência e torpor. A mãe refere que a paciente vinha apresentando perda ponderal de 6 kg no último mês, associada a nictúria diária, sede insaciável (bebia mais de 4 litros de água ao dia) e astenia. Há 24 horas evoluiu com dor abdominal em cólica difusa, náuseas e vômitos repetidos e respiração acelerada ruidosa. Ao exame físico na sala vermelha: Glasgow 12 (abertura ocular ao chamado, emite sons incompreensíveis, localiza dor). Desidratada grave 3+/4+ (mucosas ressecadas, olhos encovados, turgor cutâneo diminuído), febril (37,8°C). Taquipneica severa com FR 34 irpm, com incursões amplas e profundas (clássica respiração acidótica de Kussmaul) e hálito cetônico adocicado franco. PA 88/54 mmHg, FC 128 bpm, SpO2 97% em ar ambiente. Abdome doloroso difusamente à palpação, porém sem massas ou sinais de peritonite localizada.</p>
<p><strong>Exames Laboratoriais na Admissão:</strong></p>
<ul>
  <li>Glicemia plasmática: <strong>520 mg/dL</strong>.</li>
  <li>Gasometria arterial: <strong>pH 7,12; PaCO2 18 mmHg; PaO2 98 mmHg; HCO3 6,0 mEq/L; BE -21,5 mEq/L</strong>.</li>
  <li>Eletrólitos: <strong>Sódio: 130 mEq/L; Potássio: 3,1 mEq/L; Cloreto: 96 mEq/L</strong>.</li>
  <li>Urina tipo 1 (EAS): Densidade 1.030, Glicosúria 4+/4+, Cetonúria 4+/4+.</li>
  <li>Leucograma: 18.200/mm³ com 4% de bastonetes (desmarginação por estresse). Creatinina: 1,6 mg/dL; Ureia: 68 mg/dL.</li>
</ul>
<p><strong>Discussão Propedêutica e Raciocínio Clínico:</strong></p>
<ol>
  <li><em>Diagnóstico Fisiopatológico e Gravidade:</em> A paciente apresenta o quadro clássico de <strong>Cetoacidose Diabética Grave Inaugural (reveladora de DM1)</strong>, confirmada pela hiperglicemia (&gt; 250 mg/dL), pH &lt; 7,24 com bicarbonato &lt; 10 mEq/L e cetonúria maciça. O Ânion-Gap calculado acusa: <em>AG = Na+ - (Cl- + HCO3-) = 130 - (96 + 6) = 130 - 102 = <strong>28 mEq/L</strong></em> (profundamente elevado para referência &le; 12).</li>
  <li><em>A Conduta Salvadora do Potássio (Regra de Ouro):</em> O potássio sérico de entrada é de <strong>3,1 mEq/L</strong>. <strong>É FORMALMENTE PROIBIDO E CONTRAINDICADO INICIAR INSULINA NESTE MOMENTO!</strong> Se a insulina fosse infundida com K+ de 3,1, a translocação de potássio para dentro das células derrubaria o nível sérico para &lt; 2,5 mEq/L em minutos, deflagrando parada cardíaca por fibrilação ventricular. A conduta correta é:
    <ul>
      <li>Iniciar imediatamente hidratação vigorosa com <strong>Soro Fisiológico a 0,9% (1.000 a 1.500 mL na 1ª hora)</strong> associado à reposição intravenosa agressiva de <strong>KCl (20 a 30 mEq/h)</strong> sob monitor cardíaco contínuo.</li>
      <li>A insulina regular só pode ser iniciada quando a dosagem seriada confirmar <strong>K+ &ge; 3,3 mEq/L</strong>.</li>
    </ul>
  </li>
  <li><em>Cálculo do Sódio Corrigido e Hidratação Subsequente:</em>
    <br><em>Na+ Corrigido = Na+ medido + 1,6 &times; [(Glicemia - 100) / 100] = 130 + 1,6 &times; [(520 - 100) / 100] = 130 + 1,6 &times; 4,2 = 130 + 6,72 = <strong>136,7 mEq/L</strong></em>.
    <br>Como o sódio corrigido é normal/alto (&ge; 135 mEq/L), após a primeira hora de SF 0,9%, a hidratação de manutenção deve ser feita com <strong>NaCl a 0,45% (solução salina hipotônica) na velocidade de 250 a 500 mL/h</strong>.</li>
  <li><em>Adição Oportuna de Glicose e Resolução:</em> Assim que o K+ subiu para 3,8 mEq/L, iniciou-se Insulina Regular venosa contínua a 0,1 U/kg/h (5 U/h para o peso de 50 kg). Na 4ª hora de tratamento, a glicemia atingiu 220 mg/dL: imediatamente associou-se <strong>Soro Glicosado a 5%</strong> ao NaCl 0,45%, mantendo a insulina até a normalização do ânion-gap (10 mEq/L) e bicarbonato de 18 mEq/L com pH 7,34 na 10ª hora, permitindo transição segura para insulina basal-bolus subcutânea com sobreposição de 2 horas.</li>
</ol>

<h3>Caso Clínico 2: Estado Hiperglicêmico Hiperosmolar Extremo Desencadeado por Sepse</h3>
<p><strong>História Clínica:</strong> Homem de 74 anos, acamado após AVC isquêmico antigo com hemiplegia à direita e sequela cognitiva leve, portador de DM2 há 18 anos em uso domiciliar irregular de Metformina. É conduzido à UPA trazido por cuidadores após três dias de sonolência excessiva, recusa alimentar e anúria nas últimas 12 horas. Ao exame físico na sala vermelha: paciente em coma arreativo (Glasgow 7), hipotenso grave com PA 78/46 mmHg, taquicárdico com pulso filiforme (FC 132 bpm), extremamente desidratado (mucosas secas "em pergaminho", turgor cutâneo sem retração há mais de 5 segundos, olhos afundados nas órbitas). Extremidades frias e livedo reticular nos membros inferiores. Frequência respiratória de 22 irpm, com padrão respiratório eupnéico sem hálito cetônico. Ausculta pulmonar revela crepitações úmidas em terço inferior de hemitórax esquerdo com febre de 38,6°C.</p>
<p><strong>Exames Laboratoriais na Admissão:</strong></p>
<ul>
  <li>Glicemia plasmática: <strong>1.080 mg/dL</strong>.</li>
  <li>Gasometria venosa: <strong>pH 7,36; PaCO2 38 mmHg; HCO3 22 mEq/L; BE -1,2 mEq/L</strong>.</li>
  <li>Eletrólitos: <strong>Sódio: 158 mEq/L; Potássio: 4,9 mEq/L; Cloreto: 118 mEq/L</strong>.</li>
  <li>Urina tipo 1 (sondagem vesical de alívio obteve 30 mL de urina turva concentrada): Glicosúria 4+/4+, Cetonúria ausente (negativa), Leucocitúria &gt; 1.000.000/campo com bacteriúria maciça e nitrito positivo.</li>
  <li>Ureia: 148 mg/dL; Creatinina: 3,4 mg/dL (disfunção pré-renal grave).</li>
</ul>
<p><strong>Discussão Propedêutica e Raciocínio Clínico:</strong></p>
<ol>
  <li><em>Diagnóstico Fisiopatológico:</em> O paciente apresenta o quadro prototípico de <strong>Estado Hiperglicêmico Hiperosmolar (EHH) Extremo com Choque Séptico/Hipovolêmico por Foco Urinário e Pulmonar</strong>. Confirma-se pelos seguintes critérios matemáticos:
    <ul>
      <li>Hiperglicemia brutal (&gt; 600 mg/dL: 1.080 mg/dL).</li>
      <li>Ausência de acidose metabólica significativa (pH 7,36 com bicarbonato de 22 mEq/L e cetonúria negativa).</li>
      <li>Cálculo da Osmolaridade Efetiva: <em>Osmolaridade Efetiva = 2 &times; Na+ + (Glicemia / 18) = 2 &times; 158 + (1080 / 18) = 316 + 60 = <strong>376 mOsm/kg</strong></em> (patamar crítico muito acima de 320 mOsm/kg, justificando plenamente o coma profundo).</li>
      <li>Cálculo do Sódio Corrigido: <em>Na+ Corrigido = 158 + 1,6 &times; [(1080 - 100) / 100] = 158 + 1,6 &times; 9,8 = 158 + 15,68 = <strong>173,6 mEq/L</strong></em> (hipernatremia hiperosmolar gravíssima por desidratação hídrica pura estimada em mais de 10 a 12 litros).</li>
    </ul>
  </li>
  <li><em>Conduta Hemodinâmica e Infecciosa Prioritária:</em> O paciente está chocado (PA 78/46). A prioridade absoluta inicial é restaurar a volemia com <strong>expansão rápida com Soro Fisiológico a 0,9% (2.000 mL nas primeiras duas horas)</strong> associada ao início imediato de <strong>Noradrenalina</strong> para manter PAM &ge; 65 mmHg e coleta de hemoculturas e início precoce de Ceftriaxona IV na primeira hora de ouro da sepse.</li>
  <li><em>Insulinoterapia e Cuidados com a Osmolaridade:</em> Como o potássio é de 4,9 mEq/L, inicia-se Insulina Regular venosa contínua a 0,1 U/kg/h associando 20 mEq de KCl/L de soro. A meta no EHH é manter uma <strong>queda lenta e gradual da osmolaridade sérica (não excedendo 3 a 5 mOsm/kg por hora) e da glicemia (50 a 70 mg/dL/h)</strong> para prevenir o colapso hemodinâmico por desvio súbito de fluidos e edema cerebral. Assim que a glicemia atingir 300 mg/dL, acrescenta-se Soro Glicosado a 5% ao NaCl 0,45%, mantendo a glicemia entre 200 e 300 mg/dL até que a osmolaridade caia abaixo de 315 mOsm/kg e o paciente recupere o estado de alerta. Devido ao repouso no leito, hiperosmolaridade extrema e choque, institui-se <strong>Enoxaparina profilática</strong> imediata contra tromboembolismo venoso.</li>
</ol>

<h3>Caso Clínico 3: Cetoacidose Diabética Euglicêmica Induzida por Dapagliflozina</h3>
<p><strong>História Clínica:</strong> Homem de 56 anos, portador de DM2 e insuficiência cardíaca crônica com fração de ejeção de 35% (ICFEr). Encontra-se em uso regular de Dapagliflozina 10 mg/dia, Sacubitril-Valsartana 49/51 mg de 12/12h, Carvedilol 25 mg de 12/12h e Espironolactona 25 mg/dia. Foi submetido a uma colecistectomia videolaparoscópica de urgência há 48 horas devido a colecistite litiásica aguda. No segundo dia de pós-operatório, enquanto mantinha dieta oral suspensa por náuseas e íleo adinâmico prolongado, desenvolve taquipneia súbita, mal-estar inespecífico, astenia extrema e vômitos biliosos. Ao exame físico: lúcido, taquipneico com FR 28 irpm com respiração profunda, afebril, PA 115/72 mmHg, FC 98 bpm, SpO2 98% em ar ambiente. O cirurgião de plantão solicita glicemia capilar à beira do leito, que revela <strong>168 mg/dL</strong>. Julgando que a glicemia normal afastava qualquer complicação metabólica diabética, o médico prescreveu apenas antieméticos. Quatro horas depois, o paciente evolui com torpor e piora da taquipneia.</p>
<p><strong>Exames Laboratoriais Solicitados na UTI:</strong></p>
<ul>
  <li>Glicemia plasmática: <strong>174 mg/dL</strong>.</li>
  <li>Gasometria arterial: <strong>pH 7,20; PaCO2 20 mmHg; PaO2 95 mmHg; HCO3 8,0 mEq/L; BE -18,0 mEq/L</strong>.</li>
  <li>Eletrólitos: <strong>Sódio: 136 mEq/L; Potássio: 4,4 mEq/L; Cloreto: 100 mEq/L</strong>.</li>
  <li>Beta-hidroxibutirato sérico capilar: <strong>5,4 mmol/L</strong> (fortemente positivo; valor normal &lt; 0,6).</li>
  <li>Urina tipo 1: Glicosúria maciça (4+/4+) e Cetonúria (3+/4+).</li>
</ul>
<p><strong>Discussão Propedêutica e Raciocínio Clínico:</strong></p>
<ol>
  <li><em>Diagnóstico Fisiopatológico:</em> Trata-se do clássico e perigoso quadro de <strong>Cetoacidose Diabética Euglicêmica (euCAD) induzida por Inibidor de SGLT2 (Dapagliflozina)</strong>, precipitada pelo estresse cirúrgico da colecistite aguda e pelo jejum pós-operatório prolongado.</li>
  <li><em>Comprovação Laboratorial da Acidose:</em>
    <br><em>Ânion-Gap = Na+ - (Cl- + HCO3-) = 136 - (100 + 8) = 136 - 108 = <strong>28 mEq/L</strong></em>.
    <br>O paciente apresenta acidose metabólica severa com ânion-gap aumentado (&Delta;AG = 28 - 12 = 16) associada a cetonemia franca comprovada pelo beta-hidroxibutirato elevado (5,4 mmol/L) com glicemia plasmática inferior a 200 mg/dL (174 mg/dL). A dapagliflozina continuou promovendo perda forçada de glicose na urina, mascarando a elevação da glicemia enquanto desregulava o balanço glucagon/insulina e ativava a cetogênese mitocondrial.</li>
  <li><em>Protocolo de Tratamento Adaptado:</em>
    <ul>
      <li>Suspender imediatamente e em definitivo a Dapagliflozina durante toda a internação.</li>
      <li>Hidratação venosa com cristaloides com monitorização hemodinâmica criteriosa devido à insuficiência cardíaca subjacente (risco de congestão).</li>
      <li>Como a glicemia já é inferior a 200 mg/dL (174 mg/dL), é <strong>MANDATÓRIO INICIAR IMEDIATAMENTE SORO GLICOSADO A 5% EM CONJUNTO COM A INSULINA REGULAR VENOSA CONTÍNUA</strong> (0,05 a 0,1 U/kg/h) e reposição de 20-30 mEq de KCl/L de soro. A glicose exógena é necessária para fornecer substrato energético e permitir que a insulina venosa continue correndo em doses adequadas para suprimir a lipólise mitocondrial e fechar o ânion-gap sem provocar hipoglicemia fatal.</li>
    </ul>
  </li>
</ol>

<h3>Caso Clínico 4: Edema Cerebral Agudo na CAD Infantil e Conduta com Salina Hipertônica</h3>
<p><strong>História Clínica:</strong> Menino de 8 anos, 25 kg, com diagnóstico recente de DM1, dá entrada em hospital secundário em CAD moderada (glicemia 480 mg/dL, pH 7,18, HCO3 11 mEq/L, K+ 4,2 mEq/L). Foi iniciado protocolo de hidratação venosa com infusão rápida de 2.000 mL de solução salina hipotônica nas primeiras 3 horas associada a bólus venoso de insulina regular, promovendo uma queda abrupta da glicemia de 480 mg/dL para 190 mg/dL em menos de 2 horas e meia. Durante a 4ª hora de internação, a mãe chama a enfermagem em pânico afirmando que o filho começou a gritar de cefaleia súbita excruciante, evoluindo em minutos com vômitos em jato incoercíveis e rápida perda da consciência. Ao exame na sala vermelha: comatoso (Glasgow 5), sem resposta ao chamado, pupilas anisocóricas (pupila direita midriática e fixa de 6 mm; pupila esquerda de 3 mm fotorreagente), postura de decorticação aos estímulos dolorosos nos quatro membros. FC caiu subitamente de 115 para 52 bpm (bradicardia severa), PA subiu agudamente de 95/60 para 150/95 mmHg (hipertensão arterial), padrão respiratório irregular e bradipneico (Tríade de Cushing estabelecida).</p>
<p><strong>Discussão Propedêutica e Raciocínio Clínico:</strong></p>
<ol>
  <li><em>Identificação da Emergência Neurocirúrgica Clínica:</em> O paciente desenvolveu <strong>Edema Cerebral Agudo Grave com Síndrome de Hipertensão Intracraniana e Sinais Iminentes de Herniação Uncal Transtentorial</strong> (Tríade de Cushing e anisocoria por compressão do 3º par craniano oculomotor direito).</li>
  <li><em>Mecanismo Iatrogênico Desencadeador:</em> O edema foi precipitado pela <strong>queda vertiginosa da glicemia (&gt; 100 mg/dL/h) associada à infusão rápida e maciça de fluidos hipotônicos</strong>, gerando um colapso repentino da osmolaridade plasmática enquanto o encéfalo permanecia saturado de osmóis idiopáticos intracelulares, provocando influxo maciço de água para o parênquima cerebral por gradiente osmótico.</li>
  <li><em>Conduta Terapêutica Imediata (Minutos que Salvam a Vida):</em>
    <ul>
      <li><strong>NUNCA perder tempo transportando o paciente comatoso e instável para Tomografia de Crânio!</strong> O diagnóstico é puramente clínico e a intervenção deve ser instantânea.</li>
      <li>Elevar imediatamente a cabeceira a 30 graus na linha média e reduzir a taxa de fluidos intravenosos pela metade.</li>
      <li>Administrar imediatamente agente osmolar de resgate por via intravenosa rápida: <strong>Solução Salina Hipertônica a 3% (NaCl 3%) na dose de 3 a 5 mL/kg IV (aproximadamente 75 a 125 mL em 15 minutos)</strong> OU <strong>Manitol a 20% (0,5 a 1,0 g/kg = 2,5 a 5 mL/kg de manitol a 20% IV em 20 minutos)</strong>. A salina a 3% eleva a osmolaridade intravascular rapidamente, drenando a água do tecido cerebral para o vaso e abortando a herniação.</li>
      <li>Proceder à intubação orotraqueal em sequência rápida com neuroproteção, mantendo ventilação com normocapnia leve (PaCO2 entre 30 e 35 mmHg, evitando hipocapnia excessiva que causaria isquemia cerebral por vasoconstrição).</li>
      <li>Somente após reversão da bradicardia, estabilização pupilar e recuperação da pressão de perfusão cerebral é que o paciente deve ser transportado com segurança para a realização de TC de crânio.</li>
    </ul>
  </li>
</ol>
`
    },
    {
      id: 'questoes-residencia-comentadas-cad-ehh',
      title: '11. Questões de Concursos e Residência Médica com Comentários Exaustivos',
      body_html: `
<h3>Questão 1 (USP-SP / Residência Médica)</h3>
<p>Uma jovem de 19 anos, com diagnóstico prévio de Diabetes Mellitus Tipo 1, dá entrada na sala de emergência com história de 24 horas de dor abdominal em cólica, vômitos incoercíveis, respiração acelerada e sonolência. A gasometria arterial revela: pH 7,10; PaCO2 16 mmHg; HCO3 5 mEq/L; BE -22 mEq/L. Os exames laboratoriais acusam: Glicemia plasmática: 440 mg/dL; Sódio: 132 mEq/L; Potássio: 2,9 mEq/L; Cloreto: 98 mEq/L; Cetonemia fortemente positiva. O médico assistente solicita a prescrição inicial de emergência. Considerando as diretrizes atuais da Sociedade Brasileira de Diabetes e da ADA, qual a conduta imediata e mandatória em relação ao manejo do potássio e da insulina?</p>
<ul>
  <li><strong>A)</strong> Iniciar imediatamente infusão contínua de Insulina Regular venosa a 0,1 U/kg/h associada a Bicarbonato de Sódio a 8,4% para correção rápida do pH &lt; 7,15.</li>
  <li><strong>B)</strong> Não iniciar a insulinoterapia no momento; realizar expansão volêmica vigorosa associada à reposição intravenosa agressiva de Potássio (20 a 30 mEq/h) até que o K+ atinja &ge; 3,3 mEq/L.</li>
  <li><strong>C)</strong> Iniciar bólus de Insulina Regular 0,14 U/kg IV e repor potássio apenas se houver alterações no eletrocardiograma (ondas U ou depressão de ST).</li>
  <li><strong>D)</strong> Infundir Gluconato de Cálcio a 10% para estabilização de membrana miocárdica e iniciar insulina subcutânea NPH.</li>
</ul>
<p><strong>Gabarito: B</strong></p>
<p><strong>Comentário Detalhado dos Distratores:</strong></p>
<ul>
  <li><em>Alternativa A está incorreta:</em> O potássio sérico da paciente é de 2,9 mEq/L (hipocalemia grave). Iniciar insulina nesse momento causará influxo maciço de potássio para dentro das células, colapsando o nível sérico para patamares fatais (&lt; 2,0 mEq/L) com parada cardíaca em fibrilação ventricular. Além disso, o bicarbonato só possui indicação estrita se o pH for &lt; 6,90, sendo contraindicado com pH 7,10 devido ao risco de acidose liquórica paradoxal cerebral e piora da hipocalemia.</li>
  <li><em>Alternativa B está CORRETA:</em> A regra de ouro absoluta da segurança no manejo da CAD estabelece que <strong>NUNCA SE DEVE INICIAR INSULINA SE O POTÁSSIO FOR INFERIOR A 3,3 mEq/L</strong>. A conduta salvadora consiste em adiar a insulina, iniciar ressuscitação volêmica vigorosa com Soro Fisiológico a 0,9% e infundir potássio (20 a 30 mEq/hora IV) com monitorização contínua. A insulina só poderá ser iniciada após a comprovação de que o potássio sérico atingiu &ge; 3,3 mEq/L.</li>
  <li><em>Alternativa C está incorreta:</em> Não se deve aguardar lesão miocárdica manifestada no ECG para tratar hipocalemia evidente de 2,9 mEq/L antes de infundir insulina.</li>
  <li><em>Alternativa D está incorreta:</em> Gluconato de cálcio é o estabilizador de membrana indicado na <em>hipercalemia</em> grave com alterações eletrocardiográficas, e não na hipocalemia.</li>
</ul>

<h3>Questão 2 (SURCE / ENARE / Residência Médica)</h3>
<p>Um homem de 76 anos, portador de diabetes mellitus tipo 2, hipertenso e com demência vascular moderada, é trazido ao pronto-socorro em coma não responsivo. Os familiares informam quadro infeccioso respiratório e recusa de ingestão de líquidos há 5 dias. Ao exame: Glasgow 6, extremamente desidratado, PA 85/50 mmHg, FC 124 bpm, afebril, ausência de hálito cetônico e padrão respiratório sem hiperpneia. Exames laboratoriais revelam: Glicemia plasmática: 920 mg/dL; pH venoso: 7,38; Bicarbonato sérico: 24 mEq/L; Sódio: 152 mEq/L; Potássio: 4,6 mEq/L; Cloreto: 112 mEq/L; Cetonúria ausente; Ureia: 110 mg/dL; Creatinina: 2,6 mg/dL. Assinale a alternativa que apresenta, respectivamente, o valor correto da Osmolaridade Sérica Efetiva, o diagnóstico correspondente e a conduta de escolha:</p>
<ul>
  <li><strong>A)</strong> Osmolaridade Efetiva = 355 mOsm/kg; Estado Hiperglicêmico Hiperosmolar; expansão volêmica vigorosa com SF 0,9% e insulina venosa contínua com monitorização rigorosa.</li>
  <li><strong>B)</strong> Osmolaridade Efetiva = 290 mOsm/kg; Cetoacidose Diabética Moderada; administração de Bicarbonato de Sódio e Manitol.</li>
  <li><strong>C)</strong> Osmolaridade Efetiva = 420 mOsm/kg; Acidose Lática Grave por Metformina; hemodiálise de urgência imediata.</li>
  <li><strong>D)</strong> Osmolaridade Efetiva = 310 mOsm/kg; Diabetes Insipidus Central Adquirido; infusão contínua de Desmopressina nasal.</li>
</ul>
<p><strong>Gabarito: A</strong></p>
<p><strong>Comentário Detalhado dos Distratores:</strong></p>
<ul>
  <li><em>Alternativa A está CORRETA:</em> A Osmolaridade Efetiva (tonicidade plasmática) é calculada pela fórmula: <em>Osmolaridade Efetiva = 2 &times; Na+ + (Glicemia / 18) = 2 &times; 152 + (920 / 18) = 304 + 51,1 = <strong>355,1 mOsm/kg</strong></em>. O valor encontra-se expressivamente acima de 320 mOsm/kg, associado a glicemia &gt; 600 mg/dL (920 mg/dL), pH e bicarbonato normais (pH 7,38 e HCO3 24 mEq/L) e cetonúria negativa, estabelecendo com perfeição o diagnóstico de <strong>Estado Hiperglicêmico Hiperosmolar (EHH)</strong>. O tratamento prioritário consiste em ressuscitação volêmica com SF 0,9% (pois o paciente está hipotenso com PAS 85 mmHg) seguida de NaCl 0,45% (sódio corrigido muito elevado) e infusão contínua de Insulina Regular a 0,1 U/kg/h com reposição concomitante de potássio.</li>
  <li><em>Alternativas B, C e D estão incorretas:</em> Apresentam cálculos matemáticos incorretos de osmolaridade ou diagnósticos incompatíveis com a clínica e gasometria normais.</li>
</ul>

<h3>Questão 3 (UNICAMP / Residência Médica)</h3>
<p>Durante o tratamento intensivo de um paciente de 24 anos com cetoacidose diabética em leito de Unidade de Terapia Intensiva, a equipe médica colhe exames laboratoriais na 6ª hora de infusão contínua de insulina regular venosa e hidratação com solução salina. Os resultados demonstram: Glicemia capilar de 185 mg/dL; Gasometria venosa com pH de 7,34; Bicarbonato sérico de 17 mEq/L; Sódio de 138 mEq/L; Potássio de 4,2 mEq/L; Cloreto de 109 mEq/L. O paciente encontra-se lúcido, comunicativo e relata fome. Qual é o valor do Ânion-Gap, o estado da cetoacidose e a conduta terapêutica correta a seguir?</p>
<ul>
  <li><strong>A)</strong> Ânion-Gap = 12 mEq/L; CAD ainda ativa; manter a bomba de insulina venosa isolada até a glicemia atingir &lt; 100 mg/dL.</li>
  <li><strong>B)</strong> Ânion-Gap = 20 mEq/L; CAD refratária; dobrar a velocidade da infusão de insulina venosa e suspender a dieta oral.</li>
  <li><strong>C)</strong> Ânion-Gap = 12 mEq/L; CAD Resolvida; administrar insulina basal subcutânea associada à refeição e desligar a bomba venosa após 2 horas de sobreposição obrigatória.</li>
  <li><strong>D)</strong> Ânion-Gap = 8 mEq/L; CAD supercompensada; desligar a bomba de insulina venosa imediatamente sem necessidade de insulina subcutânea.</li>
</ul>
<p><strong>Gabarito: C</strong></p>
<p><strong>Comentário Detalhado dos Distratores:</strong></p>
<ul>
  <li><em>Alternativa A está incorreta:</em> A CAD já está resolvida pelos critérios oficiais. Buscar glicemias &lt; 100 mg/dL na CAD é um erro grave que induz hipoglicemia iatrogênica perigosa.</li>
  <li><em>Alternativa B está incorreta:</em> O cálculo do ânion-gap na alternativa está matematicamente errado.</li>
  <li><em>Alternativa C está CORRETA:</em> Cálculo do Ânion-Gap: <em>AG = Na+ - (Cl- + HCO3-) = 138 - (109 + 17) = 138 - 126 = <strong>12 mEq/L</strong></em>. O paciente preenche rigorosamente todos os critérios oficiais de <strong>RESOLUÇÃO DA CAD</strong>: Glicemia &lt; 200 mg/dL (185 mg/dL), pH venoso &gt; 7,30 (7,34), Bicarbonato &ge; 15 mEq/L (17 mEq/L) e Ânion-Gap normalizado (&le; 12 mEq/L), associado a estado de alerta pleno e capacidade de aceitar dieta oral. A conduta mandatória de transição consiste em prescrever a dose de insulina subcutânea basal e prandial junto com a refeição e <strong>MANTER A BOMBA VENOSA LIGADA POR MAIS 2 HORAS APÓS A APLICAÇÃO SUBCUTÂNEA</strong> (janela de sobreposição), prevenindo o rebote da cetoacidose.</li>
  <li><em>Alternativa D está incorreta:</em> Desligar a bomba imediatamente sem a sobreposição subcutânea causaria retorno imediato da lipólise e cetoacidose de rebote em menos de 1 hora devido à curtíssima meia-vida da insulina venosa (4-5 minutos).</li>
</ul>

<h3>Questão 4 (UNIFESP / Residência Médica)</h3>
<p>Menino de 9 anos, com diagnóstico inaugural de Cetoacidose Diabética, está recebendo hidratação venosa e insulinoterapia em infusão contínua na UTI pediátrica. Nas últimas 3 horas, a glicemia plasmática caiu de 580 mg/dL para 210 mg/dL. Subitamente, a criança começa a queixar-se de cefaleia intensa e apresenta vômitos em jato. Ao ser examinado, o médico constata rebaixamento agudo do nível de consciência (Glasgow caiu de 14 para 7), bradicardia de 48 bpm (estava em 110 bpm) e pupilas desiguais (pupila direita midriática e arreativa). Qual a complicação aguda instalada e a intervenção farmacológica de emergência a ser instituída imediatamente à beira do leito?</p>
<ul>
  <li><strong>A)</strong> Trombose venosa cerebral profunda; solicitar angiografia cerebral de urgência e iniciar anticoagulação plena com heparina.</li>
  <li><strong>B)</strong> Edema Cerebral Agudo com hipertensão intracraniana; administrar imediatamente Solução Salina Hipertônica a 3% (3 a 5 mL/kg IV) ou Manitol a 20% (0,5 a 1,0 g/kg IV) e elevar a cabeceira a 30 graus.</li>
  <li><strong>C)</strong> Meningite bacteriana aguda fulminante; realizar punção lombar de emergência e prescrever ceftriaxona com dexametasona.</li>
  <li><strong>D)</strong> Hipoglicemia neurogênica grave; infundir 100 mL de glicose a 50% em bólus e desligar a hidratação.</li>
</ul>
<p><strong>Gabarito: B</strong></p>
<p><strong>Comentário Detalhado dos Distratores:</strong></p>
<ul>
  <li><em>Alternativa A está incorreta:</em> A trombose venosa não é a primeira hipótese na piora neurológica hiperaguda na criança em CAD, e a anticoagulação não trata a hipertensão intracraniana aguda com herniação iminente.</li>
  <li><em>Alternativa B está CORRETA:</em> O quadro de cefaleia súbita, vômitos em jato, rebaixamento neurológico comatoso, bradicardia acentuada (componente da Tríade de Cushing) e anisocoria pupilar após queda rápida da glicemia durante o tratamento da CAD em criança é patognomônico de <strong>Edema Cerebral Agudo com Hipertensão Intracraniana e Herniação Uncal iminente</strong>. A conduta salvadora deve ser imediata na beira do leito, sem perder tempo aguardando transporte para tomografia: elevar a cabeceira a 30°, reduzir os fluidos pela metade e administrar em bólus intravenoso <strong>Salina Hipertônica a 3% (3 a 5 mL/kg)</strong> ou <strong>Manitol a 20% (0,5 a 1,0 g/kg)</strong>, revertendo o gradiente osmótico e desidratando o tecido cerebral tumefeito.</li>
  <li><em>Alternativa C está incorreta:</em> A punção lombar na presença de hipertensão intracraniana com sinais de herniação e anisocoria é absolutamente contraindicada pelo risco de precipitar herniação fatal imediata de tonsilas cerebelares através do forame magno.</li>
  <li><em>Alternativa D está incorreta:</em> A glicemia está em 210 mg/dL, não configurando hipoglicemia. O bólus de glicose hiperosmolar não trata o edema cerebral citotóxico estabelecido.</li>
</ul>

<h3>Questão 5 (ENAMED / Prova Nacional)</h3>
<p>Um paciente com DM2 de 50 anos, em uso de Empagliflozina 25 mg/dia, dá entrada no pronto-socorro com mal-estar, astenia e taquipneia profunda dois dias após ter realizado uma dieta cetogênica radical sem orientação médica. A gasometria arterial revela: pH 7,22; PaCO2 22 mmHg; HCO3 9 mEq/L; Ânion-Gap de 22 mEq/L. A glicemia plasmática dosada em jejum é de apenas 165 mg/dL. A urina tipo 1 acusa cetonúria 3+/4+ e glicosúria 4+/4+. Diante do diagnóstico de Cetoacidose Diabética Euglicêmica induzida por inibidor de SGLT2, qual das seguintes condutas é indispensável desde a primeira hora de tratamento?</p>
<ul>
  <li><strong>A)</strong> Iniciar apenas hidratação salina isolada, visto que a glicemia &lt; 200 mg/dL contraindica formalmente o uso de insulina.</li>
  <li><strong>B)</strong> Iniciar infusão venosa contínua de Insulina Regular associando obrigatoriamente Soro Glicosado a 5% (SG 5%) desde o início, para permitir o tratamento da acidose sem deflagrar hipoglicemia.</li>
  <li><strong>C)</strong> Administrar Bicarbonato de Sódio em bólus rápido, pois a euCAD não responde à insulina.</li>
  <li><strong>D)</strong> Manter a Empagliflozina para garantir a eliminação contínua da glicose pela urina e desidratar o paciente.</li>
</ul>
<p><strong>Gabarito: B</strong></p>
<p><strong>Comentário Detalhado dos Distratores:</strong></p>
<ul>
  <li><em>Alternativa A está incorreta:</em> A insulina é indispensável na CAD (euglicêmica ou hiperglicêmica) para inibir a lipólise mitocondrial e interromper a produção de cetoácidos. Apenas hidratar não desliga a cetogênese.</li>
  <li><em>Alternativa B está CORRETA:</em> Na <strong>Cetoacidose Diabética Euglicêmica</strong>, os níveis glicêmicos já se encontram abaixo de 200 mg/dL (165 mg/dL) devido à perda renal de glicose pelos iSGLT2. No entanto, o paciente necessita de insulina venosa contínua para suprimir a oxidação de ácidos graxos livres e fechar o ânion-gap. Para que a insulina possa ser infundida com segurança sem precipitar hipoglicemia severa, é <strong>obrigatório iniciar infusão de Soro Glicosado a 5% ou 10% simultaneamente à insulina desde a primeira hora</strong> de manejo, associada à suspensão da empagliflozina e hidratação adequada.</li>
  <li><em>Alternativa C está incorreta:</em> O bicarbonato só é indicado se pH &lt; 6,90. A euCAD responde perfeitamente à insulina associada à glicose exógena.</li>
  <li><em>Alternativa D está incorreta:</em> A empagliflozina é o próprio agente causal da complicação e deve ser suspensa imediatamente.</li>
</ul>

<h3>Questão 6 (USP-RP / Residência Médica)</h3>
<p>Homem de 28 anos com DM1 é admitido em CAD grave com gasometria arterial revelando pH 7,02, PaCO2 18 mmHg, HCO3 7 mEq/L e K+ de 4,8 mEq/L. O médico residente propõe infundir 150 mL de bicarbonato de sódio a 8,4% em bólus venoso direto para restabelecer o pH acima de 7,20. O médico preceptor contraindica categoricamente a infusão de bicarbonato. Qual é a principal justificativa fisiopatológica correta para a contraindicação do bicarbonato neste cenário?</p>
<ul>
  <li><strong>A)</strong> O bicarbonato administrado gera CO2 que difunde livremente pela barreira hematoencefálica, desencadeando acidose liquórica paradoxal no sistema nervoso central.</li>
  <li><strong>B)</strong> O bicarbonato bloqueia irreversivelmente a ação periférica da insulina nos receptores tirosina-quinase.</li>
  <li><strong>C)</strong> O bicarbonato desloca a curva de dissociação da hemoglobina para a direita, liberando oxigênio em excesso e gerando toxicidade por radicais livres nos tecidos.</li>
  <li><strong>D)</strong> A infusão de bicarbonato eleva agudamente o potássio plasmático, precipitando parada cardíaca em assistolia por hipercalemia.</li>
</ul>
<p><strong>Gabarito: A</strong></p>
<p><strong>Comentário Detalhado dos Distratores:</strong></p>
<ul>
  <li><em>Alternativa A está CORRETA:</em> A infusão exógena de bicarbonato gera dióxido de carbono (CO2) na circulação sanguínea. Enquanto o bicarbonato iônico tem passagem extremamente lenta e difícil pela barreira hematoencefálica, o gás CO2 lipofílico difunde-se livremente e em segundos para dentro do líquor e neurônios cerebrais. No líquido cefalorraquidiano, o CO2 hidrata-se formando ácido carbônico, provocando uma <strong>queda abrupta e severa do pH liquórico cerebral (acidose liquórica paradoxal)</strong>, agravando o edema cerebral e a disfunção neurológica. Além disso, induz hipocalemia grave e desvia a curva de hemoglobina para a esquerda. O uso de bicarbonato é formalmente restrito a pacientes com pH &lt; 6,90.</li>
  <li><em>Alternativa B está incorreta:</em> O bicarbonato não bloqueia os receptores de insulina.</li>
  <li><em>Alternativa C está incorreta:</em> A alcalinização desvia a curva de dissociação da oxi-hemoglobina para a <strong>esquerda</strong> (Efeito Bohr), dificultando a liberação de oxigênio para os tecidos hipóxicos.</li>
  <li><em>Alternativa D está incorreta:</em> O bicarbonato promove a <strong>entrada de potássio nas células</strong>, causando <strong>queda</strong> do K+ sérico (hipocalemia grave), e não hipercalemia.</li>
</ul>
`
    },
    {
      id: 'pontos-chave-enamed-protocolo-final',
      title: '12. Pontos de Alto Rendimento para o ENAMED e Diretrizes Finais',
      body_html: `
<h3>Os Dez Mandamentos do Manejo das Crises Hiperglicêmicas Agudas</h3>
<ul>
  <li><strong>1. Fisiopatologia Básica:</strong> CAD = Deficiência <em>Absoluta</em> de insulina com lipólise maciça e cetogênese (acidose com ânion-gap alto); EHH = Deficiência <em>Relativa</em> de insulina (inibe lipólise, mas não evita hiperglicemia extrema &gt; 600 e hiperosmolaridade &gt; 320 com desidratação profunda de 8-12 L).</li>
  <li><strong>2. Regra de Ouro do Potássio:</strong> NUNCA iniciar insulina se <strong>K+ &lt; 3,3 mEq/L</strong>! Repor KCl 20-30 mEq/h e iniciar insulina apenas quando K+ &ge; 3,3 mEq/L. Se K+ entre 3,3 e 5,2, iniciar insulina e acrescentar 20-30 mEq de KCl/litro de soro. Se K+ &gt; 5,2, iniciar insulina sem potássio e checar a cada 2h.</li>
  <li><strong>3. Ressuscitação Volêmica:</strong> SF 0,9% 1.000 a 1.500 mL na 1ª hora. Após, calcular o <strong>Sódio Corrigido [Na + 1,6 &times; ((Glicemia-100)/100)]</strong>: se normal ou alto (&ge; 135), mudar para NaCl 0,45%; se baixo (&lt; 135), manter SF 0,9%.</li>
  <li><strong>4. Ponto de Virada da Glicose (200-250 mg/dL):</strong> Quando a glicemia atingir <strong>200 a 250 mg/dL na CAD (ou 300 mg/dL no EHH)</strong>, acrescentar obrigatoriamente <strong>Soro Glicosado a 5% (SG 5%)</strong> à hidratação para evitar hipoglicemia enquanto a insulina venosa continua correndo para fechar o ânion-gap.</li>
  <li><strong>5. Meta da Insulinoterapia Venosa:</strong> Insulina Regular venosa contínua a <strong>0,1 U/kg/h</strong>. Meta de queda glicêmica: <strong>50 a 70 mg/dL por hora</strong>.</li>
  <li><strong>6. Critérios Oficiais de Cura da CAD:</strong> Glicemia &lt; 200 mg/dL associada a DOIS dos seguintes: Bicarbonato &ge; 15 mEq/L, pH venoso &gt; 7,30 e <strong>Ânion-Gap Normal (&le; 12 mEq/L)</strong>. A fita de cetonúria não define cura!</li>
  <li><strong>7. Sobreposição Obrigatória na Transição:</strong> Aplicar a insulina basal subcutânea (NPH ou análogo) e <strong>MANTER A BOMBA VENOSA LIGADA POR MAIS 2 HORAS</strong> para evitar cetoacidose de rebote fulminante.</li>
  <li><strong>8. Indicação Restrita do Bicarbonato:</strong> Indicado EXCLUSIVAMENTE se <strong>pH arterial &lt; 6,90</strong>. Contraindicado em pH &ge; 6,90 pelo risco de acidose liquórica paradoxal cerebral, hipocalemia e atraso na resolução dos corpos cetônicos.</li>
  <li><strong>9. Emergência do Edema Cerebral:</strong> Cefaleia súbita, vômitos em jato, bradicardia e anisocoria em criança ou jovem sob tratamento. Conduta imediata sem aguardar tomografia: <strong>Salina Hipertônica a 3% (3-5 mL/kg) ou Manitol a 20% (0,5-1,0 g/kg)</strong> e elevar cabeceira a 30°.</li>
  <li><strong>10. CAD Euglicêmica por iSGLT2:</strong> Glicemia normal ou discretamente elevada (&lt; 200-250 mg/dL) com acidose metabólica, ânion-gap elevado e cetonemia positiva em uso de dapagliflozina/empagliflozina. Suspender o iSGLT2 e infundir Insulina Venosa associada a SG 5% desde a primeira hora.</li>
</ul>

<h3>Resumo dos Parâmetros Diagnósticos e Metas Terapêuticas</h3>
<table class="book-table">
  <thead>
    <tr>
      <th>Parâmetro Clínico</th>
      <th>Alvo Terapêutico na CAD</th>
      <th>Alvo Terapêutico no EHH</th>
      <th>Ação Corretiva Imediata se Fora do Alvo</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>Velocidade de Queda da Glicemia</strong></td>
      <td>50 a 70 mg/dL por hora</td>
      <td>50 a 70 mg/dL por hora</td>
      <td>Se &lt; 50 mg/dL/h: dobrar dose da insulina. Se &gt; 100 mg/dL/h: reduzir insulina pela metade.</td>
    </tr>
    <tr>
      <td><strong>Potássio Plasmático</strong></td>
      <td>4,0 a 5,0 mEq/L</td>
      <td>4,0 a 5,0 mEq/L</td>
      <td>Se &lt; 3,3: suspender insulina e repor 20-30 mEq/h. Se &gt; 5,2: suspender reposição de K+.</td>
    </tr>
    <tr>
      <td><strong>Glicemia de Manutenção com Insulina</strong></td>
      <td>150 a 200 mg/dL</td>
      <td>200 a 300 mg/dL</td>
      <td>Iniciar SG 5% assim que atingir 200-250 mg/dL (CAD) ou 300 mg/dL (EHH).</td>
    </tr>
    <tr>
      <td><strong>Ânion-Gap Sérico</strong></td>
      <td><strong>&le; 12 mEq/L</strong> (Normal)</td>
      <td>&le; 12 mEq/L</td>
      <td>Manter a infusão contínua de insulina até fechar o ânion-gap, mesmo que a glicemia esteja normal.</td>
    </tr>
    <tr>
      <td><strong>Osmolaridade Efetiva</strong></td>
      <td>&lt; 315 mOsm/kg</td>
      <td><strong>&lt; 315 mOsm/kg</strong></td>
      <td>Reduzir a osmolaridade de forma gradual (&lt; 3-5 mOsm/kg/h) para prevenir edema cerebral.</td>
    </tr>
  </tbody>
</table>
`
    }
  ],
  references: [
    {
      title: 'Diretrizes da Sociedade Brasileira de Diabetes (SBD 2025/2026). Manejo das Crises Hiperglicêmicas Agudas no Adulto: Cetoacidose Diabética e Estado Hiperglicêmico Hiperosmolar',
      url: 'https://diretriz.diabetes.org.br'
    },
    {
      title: 'American Diabetes Association (ADA). Management of Hyperglycemic Emergencies in Adults: A Consensus Report by the ADA and EASD. Diabetes Care',
      url: 'https://diabetesjournals.org/care/article/47/1/135/153927'
    },
    {
      title: 'Ministério da Saúde do Brasil — Protocolo Clínico de Emergências Metabólicas no Diabetes Mellitus',
      url: 'https://www.gov.br/saude/pt-br/assuntos/protocolos-clinicos-e-diretrizes-terapeuticas'
    },
    {
      title: 'International Society for Pediatric and Adolescent Diabetes (ISPAD) Clinical Practice Consensus Guidelines: Diabetic Ketoacidosis and Hyperglycemic Hyperosmolar State',
      url: 'https://www.ispad.org/page/ISPADGuidelines2022'
    },
    {
      title: 'Glaser N, et al. Risk Factors for Cerebral Edema in Children with Diabetic Ketoacidosis. N Engl J Med',
      url: 'https://www.nejm.org/doi/full/10.1056/NEJM200101253440404'
    }
  ]
};

const chars = saveBook(book);
console.log(`Finished ${book.slug}: ${chars} useful characters.`);
