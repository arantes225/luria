// scripts/bloco-07-builders/build-153-part1.mjs

export const sec1 = {
  id: "fisiopatologia-autoimune-e-genetica-dm1",
  title: "1. Fisiopatologia Autoimune, Imunogenética e História Natural do Diabetes Mellitus Tipo 1",
  body_html: `
<p>O Diabetes Mellitus Tipo 1 (DM1) é uma doença metabólica crônica de natureza autoimune organoespecífica, caracterizada pela destruição seletiva e imunologicamente mediada das <strong>células beta pancreáticas situadas nos ilhéus de Langerhans</strong>, culminando na deficiência absoluta e irreversível de insulina. Representa a endocrinopatia mais frequente da infância e adolescência, respondendo por mais de 85% a 90% de todos os casos de diabetes diagnosticados em indivíduos com menos de 18 anos.</p>

<p><strong>A Base Imunogenética da Suscetibilidade:</strong> O DM1 desenvolve-se a partir de uma complexa interação entre predisposição poligênica individual e fatores ambientais gatilhos. O principal sítio genético associado ao risco de DM1 reside na região do <strong>Complexo Principal de Histocompatibilidade (MHC) de Classe II</strong>, localizado no braço curto do cromossomo 6p21 (região HLA):</p>
<ul>
  <li>Mais de 90% dos indivíduos brancos diagnosticados com DM1 expressam os alelos de alto risco <strong>HLA-DR3 (DRB1*0301-DQB1*0201)</strong> ou <strong>HLA-DR4 (DRB1*0401-DQB1*0302)</strong>.</li>
  <li>Indivíduos que herdam concomitantemente ambos os alelos (heterozigotos compostos <strong>DR3/DR4 ou DQ2/DQ8</strong>) apresentam o mais alto risco relativo conhecido para o desenvolvimento da autoimunidade pancreática.</li>
  <li>Por outro lado, determinados alelos conferem proteção dominante quase absoluta contra o DM1, com destaque para o alelo <strong>HLA-DQB1*0602</strong>, cuja presença é extremamente rara em pacientes diabéticos.</li>
  <li>Polimorfismos em genes não relacionados ao HLA também participam da suscetibilidade, incluindo o gene da própria insulina (<em>INS</em>), o gene do antígeno citotóxico de linfócito T 4 (<em>CTLA-4</em>, regulador negativo da ativação imune), o gene da tirosina fosfatase de linfócito (<em>PTPN22</em>) e o receptor de alta afinidade da interleucina-2 (<em>IL2RA / CD25</em>).</li>
</ul>

<h3>1.1. O Painel de Autoanticorpos Ilhéu-Específicos</h3>
<p>A fase pré-clínica do DM1 caracteriza-se pela presença assintomática de autoanticorpos circulantes contra antígenos das células beta. Embora a destruição celular seja primariamente executada por linfócitos T citotóxicos autorreativos (imunidade celular), a mensuração sorológica desses anticorpos atua como biomarcador de alta sensibilidade e especificidade para o diagnóstico etiológico e estratificação de risco:</p>

<table class="book-table">
  <thead>
    <tr>
      <th>Autoanticorpo Específico</th>
      <th>Antígeno Alvo Celular</th>
      <th>Características Clínicas e Epidemiológicas</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>Anti-GAD65</strong><br>(Anticorpo Anti-Descarboxilase do Ácido Glutâmico)</td>
      <td>Enzima citoplasmática neuronal e neuroendócrina (isoforma de 65 kDa) que sintetiza o neurotransmissor GABA.</td>
      <td>É o autoanticorpo mais frequentemente positivo no diagnóstico em adolescentes e adultos jovens (&gt; 70-80%). Destaca-se por sua <strong>alta persistência no soro</strong>, permanecendo positivo por meses ou anos após o diagnóstico. Marcador fundamental no diabetes autoimune latente do adulto (LADA).</td>
    </tr>
    <tr>
      <td><strong>Anti-IA2</strong><br>(Anticorpo Anti-Tirosina Fosfatase)</td>
      <td>Glicoproteína transmembrana associada às vesículas secretoras de insulina (família das tirosina-fosfatases).</td>
      <td>Presente em cerca de 60% a 70% dos novos diagnósticos, particularmente em crianças mais jovens. Sua positividade correlaciona-se com <strong>progressão rápida e agressiva</strong> para a destruição total das células beta e apresentação inicial com cetoacidose diabética.</td>
    </tr>
    <tr>
      <td><strong>Anti-Insulina (IAA)</strong><br>(Autoanticorpo Anti-Insulina Nativa)</td>
      <td>Molécula de insulina endógena e seus precursores.</td>
      <td>É frequentemente o <strong>primeiro anticorpo a positivar na primeira infância</strong> (lactentes e crianças &lt; 5 anos). Sua prevalência é inversamente proporcional à idade ao diagnóstico. <em>Aviso Laboratorial Crítico:</em> A dosagem de IAA só tem valor diagnóstico se for colhida <strong>ANTES do início da insulinoterapia exógena</strong> ou em até 10 a 14 dias após, pois o uso de insulina terapêutica induz a síntese de anticorpos anti-insulina exógena secundários.</td>
    </tr>
    <tr>
      <td><strong>Anti-ZnT8</strong><br>(Anticorpo Anti-Transportador de Zinco 8)</td>
      <td>Proteína carreadora que transporta zinco para dentro dos grânulos secretores das células beta, essencial para a hexamerização e cristalização da insulina.</td>
      <td>Presente em 60% a 80% dos casos. É um excelente marcador de complementação: sua dosagem eleva a taxa de detecção sorológica de autoimunidade para mais de 98% dos pacientes quando os demais anticorpos resultam negativos.</td>
    </tr>
    <tr>
      <td><strong>ICA (Islet Cell Antibodies)</strong><br>(Anticorpos Anti-Célula das Ilhotas)</td>
      <td>Complexo antigênico citoplasmático de ilhéus pancreáticos avaliado por imunofluorescência indireta em tecido de pâncreas de primatas.</td>
      <td>Método clássico histórico. Atualmente em desuso nos centros de referência, sendo amplamente substituído pelos ensaios imunoenzimáticos específicos (GAD, IA2, ZnT8 e IAA).</td>
    </tr>
  </tbody>
</table>

<h3>1.2. A História Natural em Três Estágios (Classificação ADA / ISPAD)</h3>
<p>A Sociedade Internacional de Diabetes Pediátrico e do Adolescente (ISPAD) e a American Diabetes Association (ADA) consolidaram a evolução do DM1 em três estágios clínicos e biológicos:</p>
<ul>
  <li><strong>Estágio 1 (Autoimunidade Ativa com Normoglicemia):</strong> Presença confirmada de <strong>dois ou mais autoanticorpos ilhéu-específicos positivos</strong>, porém com glicemia de jejum e teste de tolerância oral à glicose (TOTG) estritamente normais. Indivíduos no Estágio 1 apresentam risco cumulativo de progressão para diabetes clínico próximo a 100% ao longo da vida (cerca de 44% em 5 anos e 84% em 15 anos).</li>
  <li><strong>Estágio 2 (Autoimunidade com Disglicemia Assintomática):</strong> Persistência de múltiplos autoanticorpos associada ao surgimento de intolerância à glicose ou glicemia de jejum alterada (Glicemia de jejum entre 100 e 125 mg/dL; TOTG 2 horas entre 140 e 199 mg/dL; ou HbA1c entre 5,7% e 6,4%), ainda sem sintomas clínicos evidentes de descompensação osmótica. O risco de progressão para o Estágio 3 em 2 a 5 anos é de cerca de 75%.</li>
  <li><strong>Estágio 3 (Diabetes Mellitus Clínico Manifesto):</strong> Ocorre a perda crítica de mais de 80% a 90% da massa de células beta funcionais. O paciente abre o quadro clássico com hiperglicemia franca sustentada e a tétrade sintomática osmótica, ou debuta diretamente em emergência hiperglicêmica aguda (Cetoacidose Diabética).</li>
</ul>

<div class="clinical-box highlight">
  <h4>A Tétrade Clínica Clássica de Abertura do DM1</h4>
  <ol>
    <li><strong>Poliúria:</strong> Quando a glicemia ultrapassa o limiar de reabsorção tubular renal (geralmente entre 180 e 200 mg/dL), a glicose satura os transportadores SGLT2 no túbulo contorcido proximal e é excretada na urina. A glicose intraluminal atua como agente osmótico não reabsorvível, impedindo a reabsorção de água e eletrólitos e provocando <strong>diurese osmótica maciça</strong>. Na criança que já havia adquirido continência urinária noturna, a reemergência súbita de <em>enurese noturna secundária</em> é um sinal de alerta de altíssimo valor diagnóstico! Em lactentes, os pais queixam-se de fraldas excessivamente pesadas e encharcadas.</li>
    <li><strong>Polidipsia:</strong> A perda contínua de água livre na urina contrai o volume intravascular e eleva a osmolalidade plasmática efetiva, estimulando os osmorreceptores hipotalâmicos centrais que disparam sede intensa e ingestão compulsiva de líquidos (inclusive acordando durante a madrugada para beber água).</li>
    <li><strong>Polifagia com Perda Ponderal Paradoxal:</strong> Na ausência absoluta de insulina, as células dos tecidos periféricos insulino-dependentes (músculo esquelético e tecido adiposo) são incapazes de captar e internalizar a glicose circulante via transportadores GLUT4. As células entram em estado de inanição intracelular crônica, estimulando os centros da fome no hipotálamo (polifagia). Paralelamente, o organismo desvia seu metabolismo para a quebra catabólica acelerada de reservas endógenas: proteólise muscular intensa e lipólise desenfreada no tecido adiposo, resultando em <strong>emagrecimento rápido e expressivo (perda de 5 a 10 kg em poucas semanas) associado a fraqueza e fadiga incapacitante</strong>.</li>
    <li><strong>Candidíase Vulvovaginal / Dermatite Perineal Fúngica de Repetição:</strong> A glicosúria volumosa cria um microambiente favorável para a proliferação excessiva de <em>Candida albicans</em> na região perineal e genital de meninas e lactentes, manifestando-se por prurido intenso, eritema em placas e corrimento espesso grumoso.</li>
  </ol>
</div>
`
};

export const sec2 = {
  id: "cetoacidose-diabetica-fisiopatologia-e-criterios",
  title: "2. Cetoacidose Diabética (CAD): Cascata Fisiopatológica e Critérios Diagnósticos Rigorosos",
  body_html: `
<p>A Cetoacidose Diabética (CAD) representa a complicação metabólica aguda mais frequente, grave e potencialmente letal do Diabetes Mellitus Tipo 1 na faixa etária pediátrica. Em países em desenvolvimento e em regiões brasileiras com menor cobertura assistencial, a CAD é a forma de manifestação inicial do DM1 em até 35% a 60% das crianças, decorrente do atraso no reconhecimento dos sintomas de alerta por familiares e profissionais de saúde. Nos pacientes com diagnóstico prévio já estabelecido, a omissão voluntária ou inadvertida de doses de insulina e infecções intercorrentes agudas (virais ou bacterianas) são os principais fatores precipitantes.</p>

<h3>2.1. A Cascata Fisiopatológica Hormonal da CAD</h3>
<p>O evento fisiopatológico deflagrador da cetoacidose diabética é a coexistência de dois distúrbios neuroendócrinos graves:</p>
<div class="clinical-box highlight">
  <p><strong>Deficiência Absoluta ou Quase Absoluta de Insulina</strong><br>
  <strong>+</strong><br>
  <strong>Hipersecreção Maciça dos Hormônios Contrarreguladores (Glucagon, Cortisol, Catecolaminas e GH)</strong></p>
</div>

<p>A ruptura desse equilíbrio hormonal dispara uma tempestade metabólica descontrolada que atinge três órgãos-alvo fundamentais:</p>

<h4>A. No Fígado: Hiperprodução de Glicose e Cetogênese Acelerada</h4>
<ul>
  <li><strong>Hiperglicemia Desenfreada:</strong> A carência de insulina associada ao pico de glucagon e adrenalina ativa potentemente a enzima glicogênio fosforilase (induzindo glicogenólise hepática) e as enzimas-chave da gliconeogênese (fosfoenolpiruvato carboxiquinase e frutose-1,6-bisfosfatase), utilizando aminoácidos (alanina e glutamina) e glicerol provenientes da periferia para produzir quantidades maciças de nova glicose, elevando a glicemia para níveis &gt; 300 a 800 mg/dL.</li>
  <li><strong>A Via da Cetogênese Hepática:</strong> A ausência de insulina hiperativa a enzima <strong>Lipase Hormônio-Sensível (LHS)</strong> nos adipócitos, provocando lipólise desgovernada com liberação de toneladas de Ácidos Graxos Livres (AGLs) na circulação portal. Ao chegarem aos hepatócitos, os AGLs normalmente seriam impedidos de entrar nas mitocôndrias pela presença de malonil-CoA. Contudo, na CAD, os níveis de malonil-CoA despencam; a enzima <strong>Carnitina Palmitoil Transferase 1 (CPT-1)</strong> é desinibida e transporta os AGLs para dentro da matriz mitocondrial, onde sofrem beta-oxidação acelerada gerando quantidades torrenciais de Acetil-CoA.</li>
  <li>Como a via do ciclo de Krebs está saturada e os intermediários (oxaloacetato) são drenados para a gliconeogênese, o excesso de Acetil-CoA é condensado pelas enzimas HMG-CoA sintase e liase na via da <strong>Cetogênese</strong>, gerando os três corpos cetônicos:
    <ol>
      <li><strong>Acetoacetato:</strong> O primeiro cetoácido formado.</li>
      <li><strong>Beta-Hidroxibutirato:</strong> Formado pela redução do acetoacetato via enzima beta-hidroxibutirato desidrogenase sob um ambiente celular com elevada relação NADH/NAD+ (típico da acidose e hipoperfusão tecidual). <strong>Na CAD em pico de gravidade, a proporção entre Beta-Hidroxibutirato e Acetoacetato salta da relação fisiológica normal de 1:1 para até 6:1 ou 10:1!</strong> Portanto, o beta-hidroxibutirato é o cetoácido predominante e o marcador padrão-ouro da CAD.</li>
      <li><strong>Acetona:</strong> Cetoácido volátil e metabolicamente inerte, derivado da descarboxilação espontânea do acetoacetato. É excretada pelos pulmões através da respiração, conferindo o clássico <em>hálito cetônico adocicado (aroma de maçã podre ou removedor de esmalte)</em>.</li>
    </ol>
  </li>
</ul>

<h4>B. A Acidose Metabólica de Ânion Gap Elevado</h4>
<p>O acetoacetato e o beta-hidroxibutirato são ácidos orgânicos fortes que se dissociam completamente em pH fisiológico, liberando prótons H+ na circulação. Os íons hidrogênio consomem e exaurem rapidamente os estoques do principal tampão extracelular: o <strong>Bicarbonato sérico (HCO3-)</strong>. Instala-se <strong>Acidose Metabólica com Hiato Aniônico Elevado (Anion Gap &gt; 12-16 mEq/L)</strong>, onde:</p>
<p><em>Anion Gap = Na+ - (Cl- + HCO3-)</em></p>

<p>Para compensar a acidose respiratoriamente, os quimiorreceptores do tronco encefálico e corpos carotídeos hiperestimulam o centro respiratório, gerando o padrão clássico da <strong>Respiração de Kussmaul</strong>: incursões respiratórias amplas, profundas, rápidas e ruidosas, desenhadas para eliminar CO2 e reduzir a pCO2 arterial (&lt; 15 a 20 mmHg) na tentativa de frear a queda do pH sanguíneo.</p>

<h4>C. O Colapso Hidroeletrolítico e Renal</h4>
<p>A diurese osmótica maciça induzida pela glicosúria promove uma perda hídrica devastadora: <strong>o déficit hídrico total na CAD pediátrica varia habitualmente de 5% a 10% do peso corporal total (cerca de 50 a 100 mL/kg de desidratação líquida)</strong>. Juntamente com a água, os túbulos renais perdem quantidades críticas de eletrólitos (sódio, potássio, magnésio, cloreto e fosfato). A hipovolemia resultante reduz a taxa de filtração glomerular, agravando a retenção de escórias, a acidose lática secundária por má perfusão periférica e elevando a glicemia a patamares ainda mais dramáticos.</p>

<h3>2.2. Critérios Diagnósticos Oficiais da CAD (ISPAD / SBP / ADA)</h3>
<p>O diagnóstico laboratorial e sindrômico de Cetoacidose Diabética na pediatria exige a comprovação inequívoca e simultânea da tríade:</p>

<div class="clinical-box highlight">
  <h4>A Tríade Diagnóstica Obrigatória da Cetoacidose Diabética</h4>
  <ol>
    <li><strong>HIPERGLICEMIA:</strong> Glicemia plasmática &gt; <strong>200 mg/dL</strong> (11,1 mmol/L). <em>Nota:</em> Em situações raras, como uso de inibidores de SGLT2, gestação ou jejum prolongado, pode ocorrer a chamada "CAD Euglicêmica" com glicemias &lt; 200 mg/dL, mas a acidose e a cetonemia permanecem obrigatórias.</li>
    <li><strong>ACIDOSE METABÓLICA:</strong> pH venoso &lt; <strong>7,30</strong> (ou pH arterial &lt; 7,25) <strong>OU</strong> Bicarbonato sérico (HCO3-) &lt; <strong>15 mEq/L</strong>.</li>
    <li><strong>CETONEMIA OU CETONÚRIA COMPROVADA:</strong>
      <ul>
        <li><strong>Beta-hidroxibutirato sanguíneo &gt;= 3,0 mmol/L</strong> (mensurado por tiras reagentes de punção capilar — padrão-ouro absoluto de escolha pela ISPAD); OU</li>
        <li><strong>Cetonúria moderada a intensa (&gt;= 2+ ou &gt;= ++ em fita reagente de urina)</strong>. <em>Aviso Laboratorial Crítico:</em> A fita de urina reage pelo método do nitroprussiato, que detecta exclusivamente acetoacetato e acetona, NÃO detectando beta-hidroxibutirato. Por essa razão, a cetonúria pode subestimar a gravidade inicial da CAD ou permanecer falsamente positiva durante a fase de recuperação quando o paciente já está curado.</li>
      </ul>
    </li>
  </ol>
</div>

<h3>2.3. Estratificação de Gravidade da CAD Pediátrica</h3>
<p>A estratificação da gravidade baseia-se exclusivamente no grau de acidose metabólica e nos níveis de bicarbonato (e <strong>NÃO no valor numérico da glicemia</strong>):</p>
<table class="book-table">
  <thead>
    <tr>
      <th>Gravidade da CAD</th>
      <th>pH Venoso / Gasometria</th>
      <th>Bicarbonato Sérico (HCO3-)</th>
      <th>Quadro Clínico e Local de Internação Recomendado</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>CAD LEVE</strong></td>
      <td><strong>7,20 a 7,29</strong></td>
      <td><strong>10 a 14 mEq/L</strong></td>
      <td>Criança lúcida, estável, sem vômitos incoercíveis, desidratação leve (~5%). Pode ser manejada em enfermaria pediátrica ou sala de observação com equipe treinada.</td>
    </tr>
    <tr>
      <td><strong>CAD MODERADA</strong></td>
      <td><strong>7,10 a 7,19</strong></td>
      <td><strong>5 a 9 mEq/L</strong></td>
      <td>Sonolência, desidratação evidente (~7%), vômitos frequentes, taquipneia de Kussmaul evidente. Internação em enfermaria com leito de alta vigilância ou UTI Pediátrica.</td>
    </tr>
    <tr>
      <td><strong>CAD GRAVE</strong></td>
      <td><strong>&lt; 7,10</strong></td>
      <td><strong>&lt; 5 mEq/L</strong></td>
      <td>Respiração de Kussmaul profunda e extenuante, dor abdominal intensa simulando abdome agudo, sonolência profunda, estupor ou coma, desidratação grave (&gt;= 10%). <strong>INTERNAÇÃO MANDATÓRIA EM UNIDADE DE TERAPIA INTENSIVA PEDIÁTRICA (UTIP)</strong>.</td>
    </tr>
  </tbody>
</table>
`
};
