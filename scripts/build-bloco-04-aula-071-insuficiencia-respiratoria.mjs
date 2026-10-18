import { saveBook } from './bloco-04-utils.mjs';

const book = {
  slug: 'insuficiencia-respiratoria-aguda',
  title: 'Insuficiência Respiratória Aguda',
  area: 'Clínica Médica',
  materia: 'Pneumologia e Medicina Intensiva',
  description: 'Tratado exaustivo e aprofundado sobre Insuficiência Respiratória Aguda (IRpA) para concursos médicos e residência. Abrange fisiologia avançada das trocas gasosas, definições gasométricas estritas Tipo I e Tipo II, os 5 mecanismos fisiopatológicos clássicos de hipoxemia, cálculo e interpretação do gradiente alvéolo-arterial de oxigênio P(A-a)O2, suporte oxigenoterápico escalonado desde cateter nasal até CNAF e VNI, sequência rápida de intubação (SRI - 7 Ps), parâmetros da ventilação mecânica protetora, titulação de PEEP, posição prona, casos clínicos comentados e questões de provas com gabarito justificado.',
  sections: [
    {
      id: 'fisiologia-trocas-gasosas-definicoes',
      title: '1. Fisiologia das Trocas Gasosas e Definições Gasométricas Estritas',
      body_html: `
<h3>Fisiologia do Transporte Gasoso e Barreira Alvéolo-Capilar</h3>
<p>A homeostase respiratória depende da integridade do sistema composto por centro respiratório bulbar, motoneurônios, musculatura ventilatória acessória e diafragmática, caixa torácica, vias condutoras aéreas e a membrana alvéolo-capilar. A principal função pulmonar consiste na captação eficiente de oxigênio atmosférico (O2) para o metabolismo aeróbio celular e na eliminação contínua de dióxido de carbono (CO2), subproduto do ciclo de Krebs tecidual. As trocas gasosas no parênquima pulmonar ocorrem através da difusão passiva obedecendo à Lei de Fick, na qual o fluxo de difusão gasosa através de uma membrana tecidual é diretamente proporcional à área de superfície de troca (aproximadamente 100 a 140 metros quadrados no adulto jovem saudável) e à diferença de pressão parcial transmembrana, e inversamente proporcional à espessura da membrana (normalmente menor do que 0,5 a 1 micrômetro).</p>
<p>O dióxido de carbono possui solubilidade tecidual cerca de 20 a 24 vezes maior que o oxigênio. Essa discrepância físico-química fundamental dita que alterações na espessura da membrana alvéolo-capilar ou déficits discretos de tempo de trânsito eritrocitário comprometem precocemente a oxigenação (PaO2), enquanto a troca de CO2 permanece preservada ou até acelerada por taquipneia compensatória reflexa mediada por quimiorreceptores aórticos e carotídeos. Por outro lado, a eliminação do CO2 depende de forma estrita e quase exclusiva da <strong>ventilação alveolar minuto (VA)</strong>, expressa matematicamente pela equação: <em>PaCO2 = (k &times; VCO2) / VA</em>, onde VCO2 representa a produção metabólica de CO2 e VA é a fração do volume minuto que efetivamente ventila alvéolos perfundidos (descontado o espaço morto anatômico e fisiológico).</p>

<h3>Classificação Gasométrica Estrita da Insuficiência Respiratória Aguda</h3>
<p>Clinicamente e gasometricamente, a Insuficiência Respiratória Aguda (IRpA) define-se como a incapacidade súbita do aparelho respiratório de manter níveis fisiológicos normais de oxigenação arterial e/ou de eliminação de dióxido de carbono, em repouso e em ar ambiente (FiO2 0,21 ao nível do mar). A classificação oficial divide a síndrome em duas grandes formas fisiopatológicas fundamentais:</p>
<table class="book-table">
  <thead>
    <tr>
      <th>Parâmetro de Classificação</th>
      <th>Tipo I: Insuficiência Respiratória Hipoxêmica</th>
      <th>Tipo II: Insuficiência Respiratória Hipercápnica</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>Critério Gasométrico Estrito</strong></td>
      <td><strong>PaO2 &lt; 60 mmHg</strong> em ar ambiente (FiO2 21%) ou SpO2 &lt; 90-92%, habitualmente com PaCO2 normal ou reduzida (alcalose respiratória por hiperventilação compensatória precoce).</td>
      <td><strong>PaCO2 &gt; 50 mmHg</strong> associada a acidemia respiratória aguda com <strong>pH &lt; 7,35</strong>. Hipoxemia pode coexistir, mas é secundária ao deslocamento alveolar pelo CO2.</td>
    </tr>
    <tr>
      <td><strong>Componente Fisiopatológico Central</strong></td>
      <td><strong>Falência de Troca / Oxigenação Parenquimatosa.</strong> Acometimento da membrana alvéolo-capilar, alvéolos ocupados ou colapsados e circulação microvascular pulmonar.</td>
      <td><strong>Falência de Fole / Bomba Muscular Ventilatória.</strong> Redução do drive neurológico central, fraqueza neuromuscular, colapso de caixa torácica ou sobrecarga mecânica resistiva/elástica insustentável.</td>
    </tr>
    <tr>
      <td><strong>Gradiente Alvéolo-Arterial P(A-a)O2</strong></td>
      <td><strong>Elevado (P(A-a)O2 &gt; 15 a 20 mmHg</strong> em jovens, ou &gt; [Idade/4 + 4]), refletindo lesão intrapulmonar direta com desigualdade V/Q ou shunt.</td>
      <td><strong>Normal (P(A-a)O2 &le; 15 a 20 mmHg)</strong> quando a hipoventilação alveolar for pura. Se o gradiente estiver aumentado, há doença pulmonar de base associada (ex: DPOC descompensada com pneumonia).</td>
    </tr>
    <tr>
      <td><strong>Resposta à Oxigenoterapia Suplementar</strong></td>
      <td>Variável: corrige moderadamente em distúrbios de difusão e V/Q desigual, mas é <strong>refratária ao O2 puro isolado nos shunts verdadeiros</strong> (necessita de PEEP/pressão positiva).</td>
      <td>Corrige a hipoxemia rapidamente com baixas frações inspiradas de O2, porém a oxigenoterapia isolada <strong>não resolve e pode agravar a hipercapnia</strong> se não houver suporte ventilatório.</td>
    </tr>
    <tr>
      <td><strong>Principais Exemplos Clínicos</strong></td>
      <td>SARA (Síndrome do Desconforto Respiratório Agudo), Edema Agudo de Pulmão Cardiogênico, Pneumonia Lobar extensa, Tromboembolismo Pulmonar maciço, hemorragia alveolar.</td>
      <td>Intoxicação por opioides ou benzodiazepínicos, Miastenia Gravis, Síndrome de Guillain-Barré, ELA, tórax instável, exacerbação grave de DPOC com fadiga diafragmática.</td>
    </tr>
  </tbody>
</table>
<p>Há ainda a descrição didática da <strong>IRpA Tipo III (Perioperatória)</strong>, caracterizada por atelectasias basais secundárias à anestesia geral, redução da capacidade residual funcional e bloqueio neuromuscular residual; e a <strong>IRpA Tipo IV (Choque ou Hipoperfusão Sistêmica)</strong>, na qual a hipotensão profunda e o baixo débito cardíaco induzem fadiga extrema da musculatura respiratória, que chega a consumir até 25% a 40% de todo o débito cardíaco disponível, justificando intubação para desvio de fluxo sanguíneo aos órgãos vitais.</p>
`
    },
    {
      id: 'mecanismos-fisiopatologicos-hipoxemia',
      title: '2. Os 5 Mecanismos Fisiopatológicos Clássicos da Hipoxemia',
      body_html: `
<h3>Análise Detalhada dos Mecanismos Etiopatogênicos</h3>
<p>Compreender os cinco mecanismos clássicos de hipoxemia arterial é a habilidade mais cobrada em provas de residência médica e exames nacionais como o ENAMED, pois cada mecanismo dita uma conduta diagnóstica e terapêutica diametralmente distinta na sala de emergência:</p>

<h4>1. Redução da Pressão Parcial de Oxigênio Inspirado (Redução da PiO2)</h4>
<p>Ocorre em situações de baixas pressões barométricas (grandes altitudes) ou confinamento em ambientes tóxicos/anóxicos. A fração inspirada de oxigênio (FiO2) na atmosfera terrestre permanece constante em 20,95% (aproximadamente 21%), porém a Pressão Barométrica total (PB) diminui drasticamente à medida que se sobe em altitude. Ao nível do mar (PB = 760 mmHg), a pressão inspirada de O2 na via aérea traqueal umidificada é calculada como <em>PiO2 = (760 - 47) &times; 0,21 &asymp; 150 mmHg</em>. No alto de uma cordilheira a 4.000 metros (PB &asymp; 460 mmHg), a PiO2 cai para <em>(460 - 47) &times; 0,21 &asymp; 86 mmHg</em>. Como resultado, a pressão alveolar de oxigênio (PAO2) cai proporcionalmente, gerando hipoxemia arterial com <strong>gradiente alvéolo-arterial de oxigênio estritamente normal</strong>. A hipoxemia reverte imediatamente com a administração de oxigênio suplementar ou retorno ao nível do mar.</p>

<h4>2. Hipoventilação Alveolar Pura</h4>
<p>Neste distúrbio, a estrutura do parênquima pulmonar é perfeitamente sã, mas há uma queda abrupta no volume de ar fresco que alcança a zona de troca alveolar por minuto (queda de VA). De acordo com a Equação do Gás Alveolar, cada molécula de dióxido de carbono retida no alvéolo ocupa o espaço que seria destinado ao oxigênio. As etiologias incluem lesão ou depressão farmacológica do centro respiratório troncoencefálico (overdose por opioides, intoxicação por sedativos/álcool, TCE grave), doenças do neurônio motor inferior e junção neuromuscular (Síndrome de Guillain-Barré, Miastenia Gravis descompensada, esclerose lateral amiotrófica) e anomalias graves da mecânica da parede torácica (cifoescoliose avançada, tórax batente). O marco laboratorial incontestável é a presença de <strong>hipercapnia aguda (PaCO2 &gt; 50 mmHg com acidemia respiratória) associada a P(A-a)O2 NORMAL</strong>. A hipoxemia é corrigida com muita facilidade por pequenas doses de O2 em cateter nasal, mas a retenção de CO2 exige suporte ventilatório ou reversão farmacológica (ex: naloxona ou flumazenil).</p>

<h4>3. Desequilíbrio da Relação Ventilação/Perfusão (V/Q Desigual)</h4>
<p>É o <strong>mecanismo mais frequente de hipoxemia na prática clínica diária</strong>. Em condições ideais de repouso, a relação média ventilação-perfusão pulmonar situa-se em torno de 0,8 (ventilação alveolar global de 4 L/min para uma perfusão capilar de 5 L/min). Em afecções obstrutivas e inflamatórias como a Doença Pulmonar Obstrutiva Crônica (DPOC), a crise asmática moderada a grave e broncopneumonias focais, diversas unidades alveolares tornam-se hipoventiladas em relação ao seu fluxo sanguíneo (áreas de baixa relação V/Q, tendendo a zero). O sangue capilar que drena dessas unidades mal ventiladas deixa o pulmão com baixa saturação de oxigênio. Diferente do shunt verdadeiro, essas unidades ainda recebem ventilação parcial; portanto, a inalação de gás enriquecido com O2 aumenta a pressão alveolar local e <strong>promove correção substancial da PaO2</strong>. O gradiente P(A-a)O2 encontra-se invariavelmente <strong>elevado</strong>.</p>

<h4>4. Shunt Intrapulmonar Direita-Esquerda (Shunt Fisiológico ou Anatômico)</h4>
<p>O efeito shunt representa o extremo patológico da desigualdade V/Q, onde a relação V/Q é rigorosamente <strong>zero</strong>. Unidades alveolares encontram-se totalmente colapsadas (atelectasias obstrutivas maciças) ou completamente preenchidas por exsudato inflamatório, água ou sangue (SARA grave, broncopneumonia lobar extensa, edema agudo pulmonar alveolar, hemorragia alveolar difusa). Nessas unidades, o sangue venoso misto derivado da artéria pulmonar perfunde o alvéolo doente sem entrar em contato com qualquer ar respirado, retornando ao átrio esquerdo sem oxigenação. O marco fisiopatológico definidor é a <strong>refratariedade absoluta ou relativa à oxigenoterapia com FiO2 1,0 (oxigênio a 100%)</strong>: mesmo que o paciente respire O2 puro, o gás não atinge o capilar do alvéolo preenchido. A resolução exige a aplicação de <strong>Pressão Positiva Expiratória Final (PEEP)</strong> para recrutamento e reabertura alveolar. O gradiente P(A-a)O2 é <strong>profundamente elevado</strong>.</p>

<h4>5. Distúrbio de Difusão Alvéolo-Capilar</h4>
<p>Caracteriza-se pelo espessamento físico da barreira alvéolo-capilar (fibrose pulmonar idiopática, sarcoidose avançada, esclerodermia pulmonar, pneumoconioses) ou destruição maciça da rede capilar com diminuição da área de contato (enfisema grave). Em repouso, o tempo de trânsito normal do eritrócito pelo capilar pulmonar é de cerca de 0,75 segundos, e o equilíbrio do oxigênio é alcançado em apenas 0,25 segundos. No repouso, o paciente pode exibir apenas hipoxemia limítrofe; contudo, durante o esforço físico ou estados hipermetabólicos (sepse, taquicardia), o tempo de trânsito capilar é encurtado para 0,25 a 0,30 segundos, impossibilitando a saturação plena da hemoglobina. A característica clínica típica é a <strong>hipoxemia precipitada ou dramaticamente agravada pelo esforço</strong>, com gradiente P(A-a)O2 <strong>elevado</strong> e correção eficiente com oxigenoterapia suplementar.</p>

<table class="book-table">
  <thead>
    <tr>
      <th>Mecanismo Fisiopatológico</th>
      <th>PaCO2 Típica</th>
      <th>Gradiente P(A-a)O2</th>
      <th>Resposta ao O2 a 100%</th>
      <th>Principais Exemplos Clínicos</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>Redução da FiO2 / PiO2</strong></td>
      <td>Normal ou baixa (hiperventilação)</td>
      <td><strong>Normal (&le; 15-20 mmHg)</strong></td>
      <td>Excelente correção</td>
      <td>Grandes altitudes, inalação de fumaça sem oxigênio.</td>
    </tr>
    <tr>
      <td><strong>Hipoventilação Alveolar Pura</strong></td>
      <td><strong>Elevada (&gt; 50 mmHg)</strong></td>
      <td><strong>Normal (&le; 15-20 mmHg)</strong></td>
      <td>Excelente correção</td>
      <td>Intoxicação por opioides, miastenia gravis, Guillain-Barré.</td>
    </tr>
    <tr>
      <td><strong>Desequilíbrio V/Q</strong></td>
      <td>Variável (baixa, normal ou alta)</td>
      <td><strong>Elevado (&gt; 20 mmHg)</strong></td>
      <td>Excelente/Boa correção</td>
      <td>DPOC descompensada, crise asmática, embolia pulmonar.</td>
    </tr>
    <tr>
      <td><strong>Shunt Direita-Esquerda</strong></td>
      <td>Baixa ou normal (precoce)</td>
      <td><strong>Profundamente Elevado</strong></td>
      <td><strong>Má resposta / Refratária</strong></td>
      <td>SARA, Edema Agudo de Pulmão, pneumonia consolidativa lobar.</td>
    </tr>
    <tr>
      <td><strong>Distúrbio de Difusão</strong></td>
      <td>Normal ou baixa</td>
      <td><strong>Elevado (piora no esforço)</strong></td>
      <td>Excelente correção</td>
      <td>Fibrose pulmonar idiopática, doenças intersticiais, asbestose.</td>
    </tr>
  </tbody>
</table>
`
    },
    {
      id: 'gradiente-alveolo-arterial-formula-calculo',
      title: '3. Gradiente Alvéolo-Arterial de Oxigênio: Equação e Aplicação Prática',
      body_html: `
<h3>A Equação do Gás Alveolar</h3>
<p>O gradiente alvéolo-arterial de oxigênio, simbolizado matematicamente por <strong>P(A-a)O2</strong>, reflete a integridade funcional da barreira de troca gasosa intrapulmonar. Para obtê-lo, compara-se a pressão calculada de oxigênio dentro do alvéolo (PAO2, com A maiúsculo) com a pressão de oxigênio mensurada diretamente na gasometria arterial periférica (PaO2, com a minúsculo): <em>P(A-a)O2 = PAO2 - PaO2</em>.</p>
<p>A determinação da PAO2 é obtida através da clássica <strong>Equação do Gás Alveolar</strong>:</p>
<p><em>PAO2 = [FiO2 &times; (PB - PH2O)] - (PaCO2 / R)</em></p>
<ul>
  <li><strong>FiO2:</strong> Fração inspirada de oxigênio (0,21 em ar ambiente ao nível do mar).</li>
  <li><strong>PB:</strong> Pressão barométrica atmosférica (760 mmHg ao nível do mar).</li>
  <li><strong>PH2O:</strong> Pressão de vapor d'água na via aérea a 37°C totalmente saturada (47 mmHg).</li>
  <li><strong>PB - PH2O:</strong> Pressão de gás seco disponível na traqueia (760 - 47 = 713 mmHg).</li>
  <li><strong>PaCO2:</strong> Pressão parcial de dióxido de carbono obtida na gasometria arterial (normalmente 40 mmHg).</li>
  <li><strong>R:</strong> Quociente respiratório metabólico tecidual normal, que expressa a razão entre a produção de CO2 e o consumo de O2 (valor médio padrão de 0,8). Dividir PaCO2 por 0,8 equivale a multiplicá-la por 1,25.</li>
</ul>
<p>Ao nível do mar, respirando ar ambiente (FiO2 0,21) com gasometria mostrando PaCO2 de 40 mmHg e PaO2 de 95 mmHg, o cálculo resulta em:</p>
<p><em>PAO2 = [0,21 &times; 713] - (40 / 0,8) = 149,7 - 50 = 99,7 mmHg (&asymp; 100 mmHg)</em></p>
<p><em>P(A-a)O2 = 100 - 95 = 5 mmHg</em> (resultado perfeitamente fisiológico).</p>

<h3>Valores de Referência e Ajuste Obrigatório pela Idade</h3>
<p>Em um indivíduo jovem sadio respirando ar ambiente, o P(A-a)O2 fisiológico varia entre <strong>5 e 15 mmHg</strong> (tolerando-se até 20 mmHg). Esse gradiente basal decorre da presença de shunts anatômicos fisiológicos que drenam sangue venoso diretamente nas câmaras esquerdas sem oxigenação prévia, a saber: as veias brônquicas que drenam nas veias pulmonares e as veias de Thebesius que drenam no ventrículo esquerdo.</p>
<p>Com o envelhecimento fisiológico, há perda progressiva da retração elástica pulmonar e fechamento precoce de pequenas vias aéreas dependentes durante a respiração corrente, elevando naturalmente o gradiente. Para predizer o valor superior da normalidade em qualquer faixa etária, utiliza-se a seguinte fórmula clínica consagrada:</p>
<p><strong>P(A-a)O2 esperado = (Idade em anos / 4) + 4</strong></p>
<p>Por exemplo: para um idoso lúcido de 80 anos, o P(A-a)O2 normal estimado é de <em>(80/4) + 4 = 24 mmHg</em>. Um gradiente de 22 mmHg nesse paciente é compatível com a senescência, enquanto o mesmo valor em um jovem de 20 anos traduz lesão inflamatória parenquimatosa ativa.</p>

<h3>Algoritmo Diagnóstico da Hipoxemia Baseado no Gradiente Alvéolo-Arterial</h3>
<table class="book-table">
  <thead>
    <tr>
      <th>Achado do Gradiente P(A-a)O2</th>
      <th>PaCO2 Arterial</th>
      <th>Interpretação e Mecanismo</th>
      <th>Conduta Propedêutica Imediata</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>Normal (&le; 15-20 mmHg)</strong></td>
      <td><strong>Normal ou Baixa (&lt; 40 mmHg)</strong></td>
      <td>Hipoxemia extrínseca por <strong>redução da FiO2/PiO2</strong> (altitude elevada, inalação de misturas asfixiantes em espaços confinados).</td>
      <td>Ofertar O2 suplementar ou descer da altitude; remoção do ambiente confinado.</td>
    </tr>
    <tr>
      <td><strong>Normal (&le; 15-20 mmHg)</strong></td>
      <td><strong>Elevada (&gt; 50 mmHg com acidose)</strong></td>
      <td><strong>Hipoventilação alveolar pura</strong> com pulmão intrinsecamente são. Causas neuromusculares ou depressão do SNC.</td>
      <td>Pesquisar sedativos, avaliar reversão (naloxona), investigar miopatias, ventilação mecânica não invasiva ou invasiva.</td>
    </tr>
    <tr>
      <td><strong>Elevado (&gt; 20 mmHg)</strong></td>
      <td><strong>Elevada (&gt; 50 mmHg)</strong></td>
      <td>Insuficiência respiratória mista (hipoventilação associada a <strong>lesão parenquimatosa intrínseca</strong>: ex: DPOC descompensada por pneumonia).</td>
      <td>Tratar infecção/broncoespasmo, VNI precoce ou intubação se exaustão.</td>
    </tr>
    <tr>
      <td><strong>Elevado (&gt; 20 mmHg)</strong></td>
      <td><strong>Normal ou Baixa</strong></td>
      <td>Lesão de troca pura: <strong>Desequilíbrio V/Q, Shunt intrapulmonar ou Alteração de Difusão</strong> (SARA, EAP, TEP, Pneumonia extensa).</td>
      <td>Radiografia/TC de tórax, ecocardiograma, angiotomografia se suspeita de TEP; oxigenoterapia escalonada e PEEP.</td>
    </tr>
  </tbody>
</table>
`
    },
    {
      id: 'suporte-oxigenoterapico-escalonado-cnaf',
      title: '4. Oxigenoterapia Escalonada e o Cateter Nasal de Alto Fluxo (CNAF)',
      body_html: `
<h3>Princípios Gerais e Risco da Hiperóxia</h3>
<p>O objetivo precípuo da oxigenoterapia é prevenir a hipóxia tecidual e a disfunção celular orgânica, mantendo a saturação arterial de oxigênio (SpO2) em metas terapêuticas individualizadas: <strong>92% a 96%</strong> na grande maioria dos pacientes adultos graves, e <strong>88% a 92%</strong> em portadores de retenção crônica de CO2 com risco de hipercapnia induzida pelo oxigênio (DPOC com fenótipo retentor, obesidade hipoventilação grave e bronquiectasias avançadas). A hiperóxia descontrolada (PaO2 &gt; 150-200 mmHg) acarreta vasoconstrição coronariana e cerebral, formação maciça de espécies reativas de oxigênio (ânion superóxido e radicais hidroxila), absorção atelectásica por lavagem de nitrogênio alveolar e piora do prognóstico na parada cardiorrespiratória e no acidente vascular encefálico.</p>

<h3>Dispositivos Tradicionais de Oxigenoterapia de Baixo e Alto Fluxo</h3>
<table class="book-table">
  <thead>
    <tr>
      <th>Dispositivo</th>
      <th>Fluxo de O2 (L/min)</th>
      <th>FiO2 Estimada</th>
      <th>Características Clínicas e Limitações</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>Cateter Nasal tipo Óculos</strong></td>
      <td>1 a 6 L/min</td>
      <td>24% a 44% (regra prática: FiO2 &asymp; 20% + 4% por L/min)</td>
      <td>Dispositivo de baixo fluxo. A FiO2 varia de acordo com o padrão ventilatório do paciente (volume corrente e frequência respiratória). Ressecamento de mucosa nasal se fluxo &gt; 4 L/min.</td>
    </tr>
    <tr>
      <td><strong>Máscara Facial Simples</strong></td>
      <td>5 a 10 L/min</td>
      <td>40% a 60%</td>
      <td>Exige fluxo mínimo de 5 L/min para evitar a reinalação de CO2 expirado acumulado dentro da cúpula da máscara. Conforto intermediário, impede alimentação oral.</td>
    </tr>
    <tr>
      <td><strong>Máscara com Reservatório Não Reinalante</strong></td>
      <td>10 a 15 L/min</td>
      <td>60% a 90% (quando adequadamente acoplada)</td>
      <td>Possui bolsa reservatória com válvulas unidirecionais. O fluxo deve ser ajustado para que o reservatório não colabe mais do que um terço durante a inspiração. Usada em emergências hipoxêmicas agudas.</td>
    </tr>
    <tr>
      <td><strong>Máscara de Venturi</strong></td>
      <td>3 a 15 L/min (conforme o adaptador colorido)</td>
      <td><strong>FiO2 Fixa e Rigorosa (24%, 28%, 31%, 35%, 40% e 50%)</strong></td>
      <td>Baseia-se no Princípio de Bernoulli: o fluxo de O2 passa por um orifício estreito e arrasta uma quantidade constante de ar ambiente. <strong>Dispositivo de escolha absoluta na exacerbação da DPOC</strong>, prevenindo a retenção hipercápnica por excesso de O2.</td>
    </tr>
  </tbody>
</table>

<h3>Cateter Nasal de Alto Fluxo (CNAF): Fisiologia e Evidências Clínicas</h3>
<p>O Cateter Nasal de Alto Fluxo (CNAF) representa uma das maiores revoluções na medicina intensiva e de emergência da última década. Trata-se de um sistema sofisticado capaz de ofertar misturas de ar e oxigênio com fluxos contínuos de até <strong>60 a 70 L/min</strong>, acoplado a um circuito térmico com câmara de água estéril que proporciona <strong>aquecimento corporal ativo a 37°C e umidificação relativa de 100%</strong> (44 mg H2O/L de gás).</p>
<p>Os quatro pilares fisiológicos do benefício clínico do CNAF incluem:</p>
<ol>
  <li><strong>Lavagem Ativa do Espaço Morto Anatômico (Washout Faríngeo):</strong> O alto fluxo constante lava o CO2 acumulado na via aérea superior nasofaríngea ao final de cada expiração, transformando a cavidade faríngea em um reservatório de gás fresco e oxigenado para a inspiração seguinte, reduzindo consideravelmente o esforço ventilatório e a frequência respiratória.</li>
  <li><strong>Geração de Pressão Positiva Expiratória Final Dinâmica (Efeito PEEP):</strong> Com a boca fechada, o fluxo turbulento contra a expiração gera uma PEEP de aproximadamente 0,7 a 1,0 cmH2O para cada 10 L/min de fluxo ofertado, alcançando níveis de 3 a 5 cmH2O com fluxos de 50-60 L/min. Essa PEEP sutil previne o colapso cíclico alveolar terminal e recruta unidades atelectásicas basais.</li>
  <li><strong>Atendimento Pleno ao Pico de Fluxo Inspiratório do Paciente:</strong> Um indivíduo em insuficiência respiratória aguda e taquipneico atinge picos de fluxo inspiratório superiores a 60-80 L/min. Dispositivos convencionais (que entregam no máximo 15 L/min) forçam o paciente a inalar ar ambiente pelas bordas da máscara, diluindo a FiO2 real. O CNAF supre a demanda instantânea total, garantindo a FiO2 programada estável.</li>
  <li><strong>Otimização do Clearance Mucociliar e Redução do Gasto Energético:</strong> O gás aquecido e saturado em umidade previne a dessecação epitelial, evita a formação de rolhas de secreção espessa e poupa o organismo de despender centenas de calorias diárias apenas para condicionar o gás inalado.</li>
</ol>

<h3>O Índice de ROX na Monitorização do Sucesso ou Falha do CNAF</h3>
<p>Na condução do paciente com IRpA hipoxêmica em uso de CNAF, o médico deve calcular rotineiramente à beira do leito o <strong>Índice de ROX</strong>, definido matematicamente pela razão entre a oximetria de pulso, a fração inspirada de oxigênio e a frequência respiratória:</p>
<p><strong>Índice de ROX = (SpO2 / FiO2) / Frequência Respiratória</strong></p>
<p>O cálculo é realizado preferencialmente após 2, 6 e 12 horas do início do tratamento. Valores de <strong>ROX &ge; 4,88</strong> predizem alto índice de sucesso terapêutico com manutenção segura do CNAF. Por outro lado, valores de <strong>ROX &lt; 3,85</strong> (em especial após 2 a 6 horas) indicam alto risco de falha e impõem a <strong>intubação orotraqueal imediata</strong>, evitando o atraso deletério da ventilação invasiva, associado a aumento drástico da mortalidade.</p>
`
    },
    {
      id: 'ventilacao-nao-invasiva-vni-indicacoes-contraindicacoes',
      title: '5. Ventilação Não Invasiva (VNI): Aplicações Precisas e Contraindicações Formais',
      body_html: `
<h3>Princípios de Funcionamento e Modos Pressóricos (CPAP vs BiPAP)</h3>
<p>A Ventilação Não Invasiva (VNI) consiste na aplicação de suporte ventilatório mecânico com pressão positiva nas vias aéreas sem a utilização de uma interface endotraqueal invasiva (tubo orotraqueal ou cânula de traqueostomia), utilizando máscaras orofaciais, faciais totais ou capacetes (helmets). Opera primordialmente em dois modos básicos:</p>
<ul>
  <li><strong>CPAP (Continuous Positive Airway Pressure):</strong> Aplicação de um único nível de pressão positiva contínua durante todo o ciclo ventilatório (inspiração e expiração). Não adiciona suporte ventilatório inspiratório à musculatura, atuando exclusivamente como uma PEEP contínua que recruta alvéolos colabados, aumenta a capacidade residual funcional e melhora a oxigenação.</li>
  <li><strong>BiPAP ou Dois Níveis de Pressão (IPAP e EPAP):</strong> Entrega dois níveis distintos de pressão positiva. A <strong>IPAP (Inspiratory Positive Airway Pressure)</strong> atua como pressão de suporte, reduzindo o trabalho da musculatura inspiratória e aumentando o volume corrente para eliminar CO2; a <strong>EPAP (Expiratory Positive Airway Pressure)</strong> funciona como PEEP, mantendo os alvéolos abertos e garantindo a oxigenação. A diferença aritmética entre IPAP e EPAP define a pressão de suporte efetiva entregue (<em>Driving Pressure da VNI = IPAP - EPAP</em>).</li>
</ul>

<h3>As Duas Grandes Indicações Padrão-Ouro (Nível 1A de Evidência)</h3>
<p>Na literatura e nas diretrizes internacionais (ERS/ATS), existem duas indicações clássicas onde a VNI demonstrou redução inequívoca de mortalidade hospitalar e das taxas de intubação endotraqueal:</p>
<ol>
  <li><strong>Exacerbação Aguda da DPOC com Acidose Respiratória:</strong> Indicada quando o paciente apresenta acidose respiratória aguda com <strong>pH entre 7,25 e 7,35 e PaCO2 &gt; 45 mmHg</strong> após terapia médica inicial com broncodilatadores e corticoides. O modo obrigatório é o <strong>BiPAP</strong>, iniciando com EPAP de 4-5 cmH2O e IPAP de 10-12 cmH2O, titulando a IPAP gradualmente para obter volume corrente de 6 a 8 mL/kg e aliviar a musculatura acessória. A VNI diminui o trabalho respiratório, combate o auto-PEEP (PEEP intrínseco) e reduz a mortalidade em mais de 50%.</li>
  <li><strong>Edema Agudo de Pulmão (EAP) Cardiogênico:</strong> Indicada na insuficiência respiratória hipoxêmica decorrente de descompensação de insuficiência cardíaca esquerda com congestão pulmonar alveolar. Pode ser realizada tanto com <strong>CPAP isolado (8 a 12 cmH2O)</strong> quanto com BiPAP. A pressão positiva intratorácica promove dois efeitos sinérgicos cruciais: <em>efeito pulmonar</em> (recrutamento de alvéolos encharcados de transudato seroso, melhorando a complacência e a troca gasosa) e <em>efeito hemodinâmico benéfico</em> (a elevação da pressão pleural diminui o retorno venoso, diminuindo a pré-carga de câmaras direitas, e reduz a pós-carga do ventrículo esquerdo por diminuir o gradiente transmural sistólico do VE).</li>
</ol>

<h3>Outras Indicações e Cenários Especiais</h3>
<p>A VNI também possui indicação formal comprovada no <strong>desmame ventilatório precoce de portadores de DPOC</strong> que falharam em testes de respiração espontânea, na <strong>profilaxia de reintubação em pacientes de alto risco</strong> (idade &gt; 65 anos, cardiopatas ou hipercápnicos aplicados imediatamente após extubação planejada) e em pacientes imunocomprometidos com infiltrado pulmonar agudo para evitar pneumonia associada à ventilação mecânica. Em contrapartida, o uso de VNI na falha de extubação não planejada já estabelecida é contraindicado, pois atrasa a reintubação necessária.</p>

<h3>Contraindicações Formais e Critérios de Falha da VNI</h3>
<p>Reconhecer as contraindicações à VNI é vital para não retardar a intubação orotraqueal e salvar a vida do paciente em risco iminente de parada:</p>
<table class="book-table">
  <thead>
    <tr>
      <th>Categoria</th>
      <th>Contraindicações Formais Absolutas e Relativas</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>Absolutas</strong></td>
      <td>
        <ul>
          <li>Necessidade imediata de intubação orotraqueal por Parada Cardiorrespiratória (PCR) iminente.</li>
          <li>Coma ou rebaixamento profundo do nível de consciência (Escala de Coma de Glasgow &lt; 8-10), com <em>exceção expressa do paciente com DPOC e encefalopatia hipercápnica</em>, no qual um teste terapêutico breve e monitorizado sob visão direta em UTI é aceito.</li>
          <li>Incapacidade absoluta de proteger a via aérea contra broncoaspiração (reflexo de tosse e deglutição abolidos).</li>
          <li>Obstrução mecânica anatômica de vias aéreas superiores (edema de glote, laringoespasmo, tumores obstrutivos laríngeos).</li>
          <li>Vômitos incoercíveis ativos ou hemorragia digestiva alta volumosa ativa.</li>
        </ul>
      </td>
    </tr>
    <tr>
      <td><strong>Relativas</strong></td>
      <td>
        <ul>
          <li>Instabilidade hemodinâmica grave refratária (choque cardiogênico ou séptico em doses crescentes de vasopressores).</li>
          <li>Trauma craniofacial grave, fratura de ossos da face ou queimaduras faciais que impeçam a perfeita vedação da máscara.</li>
          <li>Cirurgia esofágica ou gástrica recente com anastomose de alto risco (risco de rotura por insuflação gástrica).</li>
          <li>Agitação psicomotora intensa e recusa intransigente à interface, mesmo após suporte verbal.</li>
          <li>Excesso incontrolável de secreções traqueobrônquicas espessas com tosse ineficaz.</li>
        </ul>
      </td>
    </tr>
  </tbody>
</table>
<p><strong>Critérios de Falha e Hora de Ouro da VNI:</strong> A resposta à VNI deve ser avaliada criteriosamente dentro de <strong>1 a 2 horas</strong> após o início. Considera-se falha terapêutica obrigatória quando persistir ou piorar a taquipneia, houver queda da SpO2 &lt; 90%, piora da acidose metabólica ou respiratória (queda do pH) ou desenvolvimento de rebaixamento do sensório. A insistência cega em VNI além de duas horas sem melhora eleva dramaticamente a mortalidade do paciente.</p>
`
    },
    {
      id: 'sequencia-rapida-intubacao-7ps',
      title: '6. Intubação Orotraqueal e Sequência Rápida de Intubação (SRI: Os 7 Ps)',
      body_html: `
<h3>Conceito e Objetivos da Sequência Rápida de Intubação (SRI)</h3>
<p>A Sequência Rápida de Intubação (SRI) é o procedimento médico padrão-ouro para obtenção de via aérea definitiva em pacientes críticos que não se encontram em parada cardíaca imediata. Seu princípio basilar consiste na administração quase simultânea de um agente indutor anestésico hipnótico seguido imediatamente por um bloqueador neuromuscular de ação ultrarrápida, minimizando o intervalo entre a perda dos reflexos protetores da laringe e a passagem do tubo com cuff insuflado, reduzindo ao mínimo o risco catastrófico de regurgitação gástrica e broncoaspiração maciça.</p>

<h3>A Cronologia Sistemática dos Sete Ps</h3>
<ol>
  <li><strong>1. Preparação (Tempo: Menos 10 minutos):</strong> Checagem exaustiva de materiais através do mnemônico consagrado <em>SOAP ME</em>:
    <ul>
      <li><em>S (Suction):</em> Aspirador rígido tipo Yankauer montado e testado funcionando.</li>
      <li><em>O (Oxygen):</em> Fonte de oxigênio com máscara com reservatório e bolsa-válvula-máscara (BVM / Ambu) conectada.</li>
      <li><em>A (Airway):</em> Tubos orotraqueais de tamanhos variados (7,5 e 8,0 para mulheres; 8,0 e 8,5 para homens), checagem do cuff com seringa de 10 mL, fio-guia rígido lubrificado posicionado sem ultrapassar o olho de Murphy, cânulas de Guedel, lâminas de laringoscópio testadas (lâmina curva Macintosh 3 e 4) e vídeolaringoscópio se disponível.</li>
      <li><em>P (Pharmacy):</em> Drogas indutoras e relaxantes calculadas por peso, diluídas e rotuladas, com drogas vasopressoras prontas em seringa (fenilefrina, noradrenalina em bólus push-dose).</li>
      <li><em>M (Monitoring):</em> Cardioscópio, oximetria de pulso em tempo real, pressão arterial não invasiva seriada ou invasiva e capnografia com curva contínua (padrão-ouro confirmatório).</li>
      <li><em>E (Equipment):</em> Materiais de via aérea difícil de resgate (máscara laríngea, introdutor tipo Bougie elástico e kit de cricotireoidostomia cirúrgica).</li>
    </ul>
  </li>
  <li><strong>2. Pré-oxigenação (Tempo: Menos 5 minutos):</strong> Substituição do nitrogênio alveolar por oxigênio (desnitrogenização da capacidade residual funcional). Realizada idealmente com máscara com reservatório a 15 L/min por 3 a 5 minutos de respiração corrente voluntária plena, ou através de 8 incursões com capacidade vital forçada. Em pacientes criticamente hipoxêmicos, associa-se CNAF a 60 L/min com FiO2 100% ou VNI com PEEP de 5-10 cmH2O (pressão positiva previne shunt durante a apneia). Isso proporciona uma margem de segurança de apneia sem dessaturação crítica de até 6 a 8 minutos no indivíduo não obeso.</li>
  <li><strong>3. Pré-tratamento / Otimização Hemodinâmica (Tempo: Menos 3 minutos):</strong> Correção prévia de hipotensão e hipovolemia (cristaloides em bólus e início antecipado de vasopressores), pois a sedação e a perda do drive simpático endógeno, somadas à transição para pressão positiva intratorácica, causam colapso circulatório imediato pós-intubação. Fármacos históricos como lidocaína e fentanil em doses analgésicas podem ser considerados em coronariopatas graves ou aneurismas cerebrais rotos para atenuar a descarga adrenérgica da laringoscopia.</li>
  <li><strong>4. Posicionamento / Proteção (Tempo: Zero minutos):</strong> Alinhamento dos três eixos anatômicos (oral, faríngeo e laríngeo) na clássica <strong>Posição de Olfativo (Sniffing Position)</strong>, obtida pela flexão do pescoço sobre o tronco associada à extensão atlanto-occipital da cabeça (coxim occipital de 5-7 cm no adulto; no paciente obeso mórbido, adota-se a posição em rampa, alinhando o conduto auditivo externo com a fúrcula esternal). A antiga manobra de Sellick (compressão da cartilagem cricoide) caiu em desuso por dificultar a visualização laringoscópica e não impedir aspiração comprovada.</li>
  <li><strong>5. Paralisia com Indução Simultânea (Tempo: Zero minutos):</strong> Administração intravenosa rápida do hipnótico de escolha em bólus, imediatamente sucedida pela injeção do bloqueador neuromuscular em flush salino rápido. Não ventilar com ambu durante esse intervalo, exceto se houver dessaturação profunda (&lt; 85%).</li>
  <li><strong>6. Passagem do Tubo / Posicionamento (Tempo: Mais 45 a 60 segundos):</strong> Aguardar a paralisia muscular completa (geralmente 45 segundos para succinilcolina e 60 segundos para rocurônio). Realizar a laringoscopia direta ou por videolaringoscópio, avançando a ponta da lâmina na valécula para tracionar o ligamento glossoepiglótico, visualizando a fenda glótica (Classificação de Cormack-Lehane). Introduzir o tubo visualizando a passagem do balonete entre as cordas vocais, fixando o tubo na marca de 21 a 23 cm na rima labial no adulto.</li>
  <li><strong>7. Pós-intubação / Cuidados Finais (Tempo: Mais 1 minuto em diante):</strong> Insuflar o balonete imediatamente (pressão ideal de 20 a 30 cmH2O para ocluir a via aérea sem causar isquemia da mucosa traqueal). Confirmar posicionamento: o padrão-ouro absoluto é a <strong>Capnografia quantitativa com detecção contínua de onda retangular de ETCO2</strong> por pelo menos 5 a 6 ciclos respiratórios consecutivos, aliada à ausculta epigástrica negativa e ausculta pulmonar bilateral simétrica nos 4 quadrantes. Fixar o tubo, solicitar radiografia de tórax para checar a ponta do tubo (3 a 5 cm acima da carina) e acoplar ao ventilador mecânico protetor.</li>
</ol>

<h3>Arsenal Farmacológico: Hipnóticos e Bloqueadores Neuromusculares</h3>
<table class="book-table">
  <thead>
    <tr>
      <th>Fármaco</th>
      <th>Dose de Indução</th>
      <th>Início e Duração</th>
      <th>Vantagens e Perfil Clínico</th>
      <th>Desvantagens e Riscos Graves</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>Etomidato</strong></td>
      <td>0,3 mg/kg IV</td>
      <td>Início: 15-30s<br>Duração: 5-10 min</td>
      <td><strong>Excelente estabilidade hemodinâmica</strong>. Praticamente não altera a pressão arterial nem a frequência cardíaca. Droga de escolha no choque séptico e trauma.</td>
      <td>Supressão transitória da esteroidogênese adrenal por inibição reversível da 11-beta-hidroxilase. Risco de mioclonias.</td>
    </tr>
    <tr>
      <td><strong>Cetamina</strong></td>
      <td>1,5 a 2,0 mg/kg IV</td>
      <td>Início: 30-60s<br>Duração: 10-20 min</td>
      <td>Anestésico dissociativo com potente ação analgésica e <strong>broncodilatadora reflexa</strong>. Promove liberação de catecolaminas endógenas. <strong>Droga de escolha na asma grave</strong> e no choque com reserva cardíaca.</td>
      <td>Efeito inotrópico negativo direto mascarado (em pacientes com depleção crônica grave de catecolaminas pode precipitar hipotensão). Cuidado em coronariopatias isquêmicas agudas e emergências hipertensivas.</td>
    </tr>
    <tr>
      <td><strong>Propofol</strong></td>
      <td>1,5 a 2,5 mg/kg IV</td>
      <td>Início: 15-30s<br>Duração: 5-10 min</td>
      <td>Potente ação hipnótica, anticonvulsivante e redutora do metabolismo cerebral e da pressão intracraniana. Excelente em pacientes com estado de mal epiléptico e TCE hipertenso sem choque.</td>
      <td><strong>Intensa vasodilatação e depressão miocárdica direta</strong>, gerando hipotensão severa em pacientes hipovolêmicos ou cardiopatas.</td>
    </tr>
    <tr>
      <td><strong>Midazolam</strong></td>
      <td>0,2 a 0,3 mg/kg IV</td>
      <td>Início: 60-90s<br>Duração: 15-30 min</td>
      <td>Benzodiazepínico clássico com ação amnésica e sedativa. Ampla disponibilidade.</td>
      <td>Início de ação lento para SRI; acarreta hipotensão e vasodilatação; tempo de eliminação imprevisível em insuficiência renal/hepática. Reservado para quando não houver etomidato ou cetamina.</td>
    </tr>
    <tr>
      <td><strong>Succinilcolina</strong></td>
      <td>1,0 a 1,5 mg/kg IV</td>
      <td>Início: 30-45s<br>Duração: 5-10 min</td>
      <td>Bloqueador neuromuscular despolarizante de <strong>início e término de ação ultrarrápidos</strong>. Excelente quando há risco de falha em intubar/ventilar.</td>
      <td><strong>Hipercalemia com risco de arritmias fatais</strong> em queimados graves (&gt; 24-48h), politrauma, lesão medular, desnervação e miopatias. Risco de hipertermia maligna. Fasciculações musculares.</td>
    </tr>
    <tr>
      <td><strong>Rocurônio</strong></td>
      <td>1,0 a 1,2 mg/kg IV (dose plena de SRI)</td>
      <td>Início: 60s<br>Duração: 40-60 min</td>
      <td>Bloqueador neuromuscular adespolarizante. Ausência de fasciculações e sem risco de hipercalemia. Reversível instantaneamente com o agente específico <strong>Sugamadex</strong>.</td>
      <td>Duração de bloqueio prolongada (cerca de 45-60 minutos); exige atenção na via aérea difícil sem disponibilidade de sugamadex.</td>
    </tr>
  </tbody>
</table>
`
    },
    {
      id: 'ventilacao-mecanica-protetora-sara-peep',
      title: '7. Ventilação Mecânica Protetora, Driving Pressure e Manejo da SARA',
      body_html: `
<h3>Fisiopatologia da Lesão Pulmonar Induzida pelo Ventilador (VILI)</h3>
<p>A ventilação mecânica é uma terapia de suporte salvadora de vidas, contudo é inerentemente não fisiológica, pois substitui a ventilação por pressão negativa por uma insuflação pulmonar por pressão positiva. Quando prescrita de maneira inadequada, a ventilação mecânica lesa diretamente o parênquima pulmonar sadio ou inflamado através de quatro mecanismos mecânicos principais de <strong>VILI (Ventilator-Induced Lung Injury)</strong>:</p>
<ul>
  <li><strong>Barotrauma:</strong> Rotura mecânica macroscópica de alvéolos submetidos a pressões excessivas, acarretando pneumotórax, pneumomediastino e enfisema subcutâneo.</li>
  <li><strong>Volutrauma:</strong> Hiperdistensão cíclica de alvéolos funcionantes por volumes correntes excessivos, lesando a membrana basal e as junções de oclusão epiteliais.</li>
  <li><strong>Atelectrauma:</strong> Cisalhamento tecidual repetitivo decorrente do colapso e reabertura cíclica alveolar a cada respiração, causado por níveis insuficientes de PEEP.</li>
  <li><strong>Biotrauma:</strong> Liberação maciça de citocinas inflamatórias (IL-6, IL-8, TNF-alfa) estimuladas mecanicamente nos alvéolos, que caem na circulação sistêmica e deflagram a Síndrome da Disfunção de Múltiplos Órgãos (SDMO).</li>
</ul>

<h3>Os Quatro Pilares Numéricos da Ventilação Protetora</h3>
<p>O conceito moderno de ventilação mecânica protetora fundamenta-se no modelo do <em>"Baby Lung"</em> formulado por Luciano Gattinoni: no paciente com SARA ou pneumonia bilateral, a área pulmonar aerada remanescente equivale ao parênquima de uma criança saudável de 5 a 6 anos. Insuflar volumes normais de adultos nesse pulmão reduzido gera estresse mecânico catastrófico. As quatro metas protetoras obrigatórias são:</p>
<ol>
  <li><strong>Volume Corrente (Vt) Estrito de 4 a 6 mL/kg de PESO PREDITO:</strong> O peso utilizado NUNCA é o peso real ou o peso da balança do paciente (que pode estar sobrecarregado por obesidade ou anasarca). Deve-se utilizar a fórmula antropométrica internacional do Peso Predito baseada na altura e no sexo:
    <ul>
      <li><em>Homens: 50 + 0,91 &times; [Altura em cm - 152,4]</em></li>
      <li><em>Mulheres: 45,5 + 0,91 &times; [Altura em cm - 152,4]</em></li>
    </ul>
  </li>
  <li><strong>Pressão de Platô (Pplatô) &le; 30 cmH2O:</strong> A pressão de platô (obtida através de uma pausa inspiratória de 0,5 a 1,0 segundo no modo ventilatório volumétrico) reflete a pressão alveolar média ao final da inspiração sob fluxo zero. Manter a Pplatô abaixo de 30 cmH2O é mandatório para prevenir hiperdistensão elástica alveolar.</li>
  <li><strong>Driving Pressure (Pressão de Distensão Alveolar) &le; 15 cmH2O:</strong> Definida pela diferença aritmética: <em>Driving Pressure (&Delta;P) = Pressão de Platô - PEEP</em>. Ensaios clínicos consagrados (Amato et al.) demonstraram que a Driving Pressure é a variável isolada com maior correlação com a mortalidade na SARA. Manter a Driving Pressure rigorosamente <strong>menor ou igual a 15 cmH2O</strong> (idealmente &le; 13 cmH2O) é a meta prioritária. Se a &Delta;P estiver acima de 15 cmH2O, deve-se reduzir o volume corrente (podendo descer para até 4 mL/kg ou 3 mL/kg, aceitando acidose respiratória permissiva).</li>
  <li><strong>Hipercapnia Permissiva:</strong> A redução do volume corrente pode induzir retenção progressiva de dióxido de carbono. A diretriz recomenda tolerar a hipercapnia (aceitando PaCO2 de até 60-80 mmHg), desde que o <strong>pH arterial permaneça &ge; 7,20</strong> (exceto em vigência de hipertensão intracraniana grave ou coronariopatia instável).</li>
</ol>

<h3>Critérios de Berlim Atualizados para Definição da SARA</h3>
<p>A Síndrome do Desconforto Respiratório Agudo (SARA) é definida estritamente pelo Consenso de Berlim a partir de 4 critérios simultâneos:</p>
<table class="book-table">
  <thead>
    <tr>
      <th>Critério de Berlim</th>
      <th>Requisito Diagnóstico Obrigatório</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>Temporalidade (Início)</strong></td>
      <td>Quadro agudo com piora respiratória instalada dentro de <strong>7 dias</strong> após um insulto clínico conhecido (sepse, pancreatite, aspiração, pneumonia, grande trauma) ou surgimento/piora de novos sintomas pulmonares.</td>
    </tr>
    <tr>
      <td><strong>Imagem Torácica (RX ou TC)</strong></td>
      <td><strong>Opacidades parenquimatosas bilaterais</strong> não totalmente explicadas por derrames pleurais maciços, colapso lobar/atelectasia completa ou nódulos isolados.</td>
    </tr>
    <tr>
      <td><strong>Origem do Edema Pulmonar</strong></td>
      <td>Insuficiência respiratória <strong>não totalmente explicada por insuficiência cardíaca congestiva ou sobrecarga volêmica hidrostática</strong>. Necessária avaliação objetiva (ecocardiograma à beira do leito) para descartar causa cardiogênica hidrostática caso nenhum fator de risco evidente esteja presente.</td>
    </tr>
    <tr>
      <td><strong>Gravidade da Hipoxemia (com PEEP &ge; 5 cmH2O)</strong></td>
      <td>
        <ul>
          <li><strong>SARA Leve:</strong> 200 &lt; PaO2 / FiO2 &le; 300 mmHg com PEEP ou CPAP &ge; 5 cmH2O.</li>
          <li><strong>SARA Moderada:</strong> 100 &lt; PaO2 / FiO2 &le; 200 mmHg com PEEP &ge; 5 cmH2O.</li>
          <li><strong>SARA Grave:</strong> <strong>PaO2 / FiO2 &le; 100 mmHg</strong> com PEEP &ge; 5 cmH2O.</li>
        </ul>
      </td>
    </tr>
  </tbody>
</table>

<h3>Terapias Adjuvantes de Resgate na SARA Moderada a Grave</h3>
<p>Quando a relação PaO2/FiO2 cai abaixo de 150 mmHg a despeito da ventilação protetora e titulação racional da PEEP (através da tabela PEEP/FiO2 ARDSNet ou PEEP de melhor complacência), duas condutas terapêuticas salvadoras possuem evidência indiscutível:</p>
<ul>
  <li><strong>Bloqueio Neuromuscular Precoce (Cisatracúrio):</strong> A infusão contínua de bloqueador neuromuscular por 48 horas nas primeiras fases da SARA grave elimina a dissincronia paciente-ventilador, impede o esforço inspiratório excessivo (pendelluft e dano autoinfligido pelo paciente - P-SILI) e reduz o consumo sistêmico de oxigênio.</li>
  <li><strong>Posição Prona Precoce e Prolongada (Estudo PROSEVA):</strong> Indicada de forma inequívoca em pacientes com <strong>SARA e PaO2 / FiO2 &lt; 150 mmHg</strong> com PEEP &ge; 10 cmH2O e FiO2 &ge; 0,60. A manobra consiste em virar o paciente para decúbito ventral por <strong>pelo menos 16 a 24 horas consecutivas por sessão</strong>. A pronação redistribui a ventilação e a perfusão de forma muito mais homogênea ao longo do eixo dorso-ventral, alivia a compressão do coração sobre as regiões pulmonares dorsais e reduz o cisalhamento alveolar, reduzindo a mortalidade de forma expressiva (de 32,8% para 16,0% no estudo PROSEVA).</li>
</ul>
`
    },
    {
      id: 'dissincronias-paciente-ventilador-graficos',
      title: '8. Dissincronias Paciente-Ventilador e Monitorização Gráfica',
      body_html: `
<h3>Importância Clínica e Classificação das Principais Dissincronias</h3>
<p>A dissincronia paciente-ventilador é definida como a incompatibilidade temporal ou de fluxo entre a demanda respiratória gerada pelo centro respiratório do paciente e o suporte mecânico fornecido pelo ventilador. Ocorre em mais de 25% a 30% dos pacientes mecanicamente ventilados e associa-se a prolongamento da ventilação mecânica, falha de extubação, aumento do consumo miocárdico e maior mortalidade em UTI.</p>
<table class="book-table">
  <thead>
    <tr>
      <th>Tipo de Dissincronia</th>
      <th>Mecanismo Fisiopatológico Subjacente</th>
      <th>Reconhecimento na Monitorização Gráfica</th>
      <th>Intervenção Corretiva Específica</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>Disparo Ineficaz (Esforço Não Efetivo)</strong></td>
      <td>O paciente gera um esforço muscular inspiratório, mas esse esforço não atinge o limiar de sensibilidade do ventilador para disparar um novo ciclo. A causa primária mais comum é o <strong>auto-PEEP (hiperinsuflação dinâmica)</strong>, comum na DPOC, onde o paciente precisa primeiro vencer o auto-PEEP antes de deflagrar o gatilho.</td>
      <td>Na curva de fluxo-tempo, observa-se uma súbita deflexão positiva transitória durante a fase de expiração, acompanhada de uma pequena concavidade negativa simultânea na curva de pressão-tempo, sem deflagração de um ciclo subsequente.</td>
      <td>Ajustar a sensibilidade do disparo (adotar gatilho a fluxo em vez de pressão), reduzir o volume corrente ou a frequência programada para prolongar o tempo expiratório e aplicar PEEP extrínseco para contrabalançar o auto-PEEP (cerca de 80% do auto-PEEP).</td>
    </tr>
    <tr>
      <td><strong>Duplo Disparo (Double Triggering)</strong></td>
      <td>O paciente necessita de um tempo inspiratório ou volume corrente maior do que o programado no ventilador. O esforço inspiratório do paciente permanece ativo após o término do primeiro ciclo, fazendo com que o ventilador dispare um segundo ciclo consecutivo quase sem intervalo expiratório.</td>
      <td>Dois ciclos inspiratórios consecutivos encadeados na curva de fluxo e pressão, resultando na entrega de volume corrente acumulado quase dobrado (risco imediato de volutrauma severo).</td>
      <td>Aumentar o volume corrente (se compatível com proteção alveolar), elevar o tempo inspiratório, aumentar o fluxo inspiratório no modo VCV ou reduzir a sedação excessiva/ajustar a pressão de suporte no PSV.</td>
    </tr>
    <tr>
      <td><strong>Fluxo Insuficiente (Fome de Fluxo / Flow Starvation)</strong></td>
      <td>O fluxo inspiratório ofertado pela máquina é significativamente inferior à demanda inspiratória aguda do paciente em taquipneia ou sofrimento respiratório.</td>
      <td>Na curva de pressão-tempo no modo volume-controlado (VCV), a rampa ascendente típica torna-se côncava ou deprimida ("esculpida" para baixo), refletindo a contração muscular ativa vigorosa do paciente tentando puxar ar da máquina.</td>
      <td>Elevar o pico de fluxo inspiratório da máquina (para 60 a 80 L/min), mudar a onda de fluxo de retangular para desacelerada ou alterar o modo para Pressão Controlada (PCV) ou Pressão de Suporte (PSV), nos quais o fluxo é livre e variável.</td>
    </tr>
    <tr>
      <td><strong>Auto-Disparo (Autotriggering)</strong></td>
      <td>O ventilador mecânico dispara ciclos espontâneos falsos sem qualquer esforço muscular real do paciente, gerando hiperventilação e alcalose respiratória descontrolada.</td>
      <td>Frequência respiratória muito elevada sem movimentos torácicos correspondentes; ciclos ocorrendo de forma perfeitamente rítmica mesmo com paciente em apneia ou sedação profunda.</td>
      <td>Pesquisar e eliminar <strong>vazamentos volumosos no circuito</strong> ou na cânula, retirar condensado de água acumulado nas traqueias do circuito que oscila simulando fluxo e reduzir a sensibilidade do gatilho para torná-lo menos suscetível a oscilações cardíacas.</td>
    </tr>
  </tbody>
</table>
`
    },
    {
      id: 'desmame-ventilatorio-extubacao',
      title: '9. Desmame da Ventilação Mecânica e Teste de Respiração Espontânea (TRE)',
      body_html: `
<h3>Critérios de Prontidão para Início do Desmame Ventilatório</h3>
<p>O desmame da ventilação mecânica invasiva compreende todo o processo de transição do suporte artificial para a respiração espontânea. Prolongar indevidamente a intubação eleva o risco de pneumonia associada à ventilação (PAV), atrofia diafragmática por desuso e estenose traqueal. Por outro lado, a extubação precipitada culmina em falha, reintubação de urgência e aumento quadruplicado da mortalidade. O protocolo inicia-se com a checagem diária dos critérios de prontidão:</p>
<ol>
  <li>Resolução ou controle substantivo da causa básica que motivou a intubação orotraqueal.</li>
  <li>Estabilidade hemodinâmica demonstrada por ausência de choque, pressão arterial média estável sem ou com doses mínimas de vasopressores (ex: noradrenalina &lt; 0,1 mcg/kg/min) e ausência de isquemia miocárdica ativa ou arritmias ventriculares complexas.</li>
  <li>Oxigenação adequada garantida por <strong>relação PaO2 / FiO2 &gt; 150 a 200 mmHg com PEEP &le; 5 a 8 cmH2O e FiO2 &le; 0,40</strong>, com pH arterial &gt; 7,30.</li>
  <li>Drive respiratório neurológico e musculatura funcionais, estado de alerta satisfatório (capaz de abrir os olhos ao chamado ou Glasgow &ge; 9) e suspensão/redução de sedativos em infusão contínua.</li>
</ol>

<h3>O Índice de Tobin (RSBI - Rapid Shallow Breathing Index)</h3>
<p>O índice preditivo mais consagrado e amplamente cobrado em provas é o <strong>Índice de Respiração Rápida e Superficial de Tobin (RSBI)</strong>, calculado imediatamente antes do início do Teste de Respiração Espontânea (TRE) enquanto o paciente respira em tubo T ou com pressão de suporte mínima sem auxílio de volume:</p>
<p><strong>Índice de Tobin (RSBI) = Frequência Respiratória (irpm) / Volume Corrente em Litros (L)</strong></p>
<p>Interpretação clínica estrita:</p>
<ul>
  <li><strong>RSBI &lt; 105:</strong> Prediz <strong>alto sucesso no desmame</strong> ventilatório e autoriza o seguimento do TRE. O paciente possui força e padrão ventilatório para manter volumes adequados sem taquipneia extrema.</li>
  <li><strong>RSBI &gt; 105:</strong> Traduz respiração rápida e ineficaz (superficial), sendo indicativo de <strong>alto risco de falha</strong>. O paciente não deve ser extubado; o suporte ventilatório deve ser restabelecido e as causas de fraqueza investigadas.</li>
</ul>

<h3>Execução do Teste de Respiração Espontânea (TRE) e Critérios de Extubação</h3>
<p>O TRE consiste em submeter o paciente a um período de respiração espontânea de <strong>30 minutos</strong> (as diretrizes modernas demonstraram que 30 minutos é tão seguro e eficaz quanto o antigo teste de 120 minutos). Pode ser realizado conectando a cânula endotraqueal a uma peça em T com oxigênio suplementar umidificado, ou mantendo o paciente no circuito com Pressão de Suporte de 5-7 cmH2O e PEEP de 0-5 cmH2O.</p>
<p><strong>Sinais de Insucesso (Falha) no TRE:</strong> Durante os 30 minutos, o teste deve ser interrompido imediatamente se houver: frequência respiratória &gt; 35 irpm; SpO2 &lt; 90%; frequência cardíaca &gt; 140 bpm ou elevação &gt; 20% do basal; arritmias novas; pressão arterial sistólica &gt; 180 mmHg ou &lt; 90 mmHg; agitação psicomotora, sudorese profusa, tiragem intercostal e uso de musculatura acessória ou batimento de asa de nariz.</p>
<p><strong>Critérios para Sacar o Tubo (Extubação Segura):</strong> Se o paciente tolerar os 30 minutos de TRE mantendo estabilidade, avaliam-se os critérios mecânicos locais para a retirada física do tubo:</p>
<ul>
  <li><strong>Força da Tosse e Capacidade de Deglutição:</strong> Capacidade de emitir tosse vigorosa ao comando verbal ou à aspiração traqueal, e fluxo expiratório de pico na tosse (PCPF) &gt; 60 L/min.</li>
  <li><strong>Quantidade e Aspecto da Secreção:</strong> Ausência de necessidade de aspiração de secreção traqueal em frequência superior a cada 2 horas.</li>
  <li><strong>Teste de Fuga do Balonete (Cuff Leak Test):</strong> Esvazia-se o balonete do tubo orotraqueal e monitora-se se há escape aéreo audível ou mensuração de volume expirado reduzido em &gt; 110 mL ou &gt; 15% do volume inspirado. Um teste de fuga ausente ou reduzido indica a presença de <strong>edema laríngeo subglótico</strong>, com alto risco de estridor e obstrução após a extubação (indica o uso prévio de corticoterapia endovenosa - metilprednisolona - por 12 a 24 horas antes de nova tentativa).</li>
</ul>
`
    },
    {
      id: 'casos-clinicos-alta-complexidade',
      title: '10. Casos Clínicos Complexos de Terapia Intensiva com Discussão Baseada em Evidências',
      body_html: `
<h3>Caso Clínico 1: SARA Grave de Foco Pulmonar e Indicação de Decúbito Prona</h3>
<p><strong>História Clínica:</strong> Homem de 48 anos, previamente hígido, internado em UTI com quadro de sepse grave secundária a pneumonia adquirida na comunidade lobar direita extensa. Encontra-se sob intubação orotraqueal em sedoanalgesia profunda com fentanil e midazolam. A tomografia de tórax revela consolidação extensa em lobo inferior direito e opacidades bilaterais em vidro fosco difusas com broncogramas aéreos periféricos acometendo mais de 65% dos campos pulmonares. O ecocardiograma transtorácico evidencia fração de ejeção do ventrículo esquerdo de 64%, câmaras direitas de dimensões normais e veia cava inferior túrgida sem sinais de congestão hidrostática primária.</p>
<p><strong>Parâmetros Ventilatórios Admissão:</strong> Modo VCV, Vt 380 mL (peso predito calculado em 63 kg: 6,0 mL/kg), FR 28 irpm, PEEP 14 cmH2O, FiO2 0,80, Fluxo 60 L/min com onda quadrada e pausa inspiratória de 0,5 segundo. A gasometria arterial revela: pH 7,28, PaCO2 48 mmHg, PaO2 68 mmHg, HCO3 22 mEq/L, BE -3,5 mEq/L, SpO2 89%. A pressão de pico mensurada é de 34 cmH2O e a pressão de platô é de 28 cmH2O.</p>
<p><strong>Discussão Propedêutica e Raciocínio Clínico:</strong></p>
<ol>
  <li><em>Cálculo da Relação PaO2 / FiO2:</em> PaO2 68 dividido por FiO2 0,80 resulta em <strong>PaO2/FiO2 = 85 mmHg</strong>. De acordo com o Consenso de Berlim, esse achado configura <strong>SARA Grave</strong> (PaO2/FiO2 &le; 100 mmHg).</li>
  <li><em>Avaliação da Mecânica Protetora:</em> A Pplatô está em 28 cmH2O (meta &le; 30 cmH2O cumprida). A Driving Pressure é calculada como <em>&Delta;P = Pplatô - PEEP = 28 - 14 = 14 cmH2O</em> (está dentro do limiar máximo de 15 cmH2O).</li>
  <li><em>Conduta Terapêutica Imediata Obrigatória:</em> Frente a um paciente com SARA grave com relação PaO2/FiO2 &lt; 150 mmHg sob PEEP elevada e FiO2 &ge; 0,60, a conduta que comprovadamente reduz a mortalidade hospitalar (evidência Nível 1A pelo Estudo PROSEVA) é a instituição imediata de <strong>Bloqueio Neuromuscular contínuo (Cisatracúrio) associado à Manobra de Decúbito Prona</strong> por um período contínuo ininterrupto de <strong>16 a 24 horas</strong>. A pronação promove a redistribuição da ventilação alveolar dorsal, melhora a relação ventilação-perfusão e alivia a sobrecarga mecânica regional.</li>
</ol>

<h3>Caso Clínico 2: Exacerbação Aguda da DPOC e a Hora de Ouro da VNI</h3>
<p><strong>História Clínica:</strong> Homem de 66 anos, tabagista ativo de 60 maços-ano, com diagnóstico estabelecido de DPOC estádio GOLD 4 (muito grave). É trazido ao pronto-socorro por familiares com história de três dias de piora progressiva da dispneia, aumento do volume e purulência do escarro (critérios de Anthonisen tipo 1) e sonolência nas últimas 6 horas. Ao exame físico na sala vermelha: paciente sonolento, porém desperta aos estímulos verbais e responde com frases entrecortadas. Frequência respiratória de 32 irpm com uso nítido de musculatura acessória cervical (esternocleidomastóideo) e tiragem intercostal acentuada, ausência de padrão paradoxal abdominal franco. Murmúrio vesicular difusamente diminuído com sibilos expiratórios e roncos bilaterais. PA 145/88 mmHg, FC 115 bpm, SpO2 84% em ar ambiente.</p>
<p><strong>Exames Complementares Iniciais:</strong> Gasometria arterial colhida em ar ambiente: pH 7,27, PaCO2 64 mmHg, PaO2 49 mmHg, HCO3 28 mEq/L, BE +2,8 mEq/L, SpO2 83%. Radiografia de tórax em leito mostra sinais de hiperinsuflação pulmonar difusa (retificação diafragmática, aumento dos espaços intercostais) sem consolidações focais ou pneumotórax.</p>
<p><strong>Discussão Propedêutica e Raciocínio Clínico:</strong></p>
<ol>
  <li><em>Diagnóstico Fisiopatológico:</em> Insuficiência respiratória mista, predominantemente do <strong>Tipo II (Hipercápnica) com acidose respiratória aguda descompensada (pH 7,27 com PaCO2 64 mmHg)</strong> em paciente com retenção crônica de base (bicarbonato sérico elevado de 28 mEq/L refletindo compensação renal crônica).</li>
  <li><em>Indicação Terapêutica Formal:</em> O paciente preenche os critérios ideais para instituição imediata de <strong>Ventilação Não Invasiva (VNI) com dois níveis de pressão (BiPAP)</strong>: acidose respiratória aguda com pH entre 7,25 e 7,35 e PaCO2 &gt; 45 mmHg com aumento do trabalho respiratório. Embora esteja sonolento, a encefalopatia hipercápnica leve da DPOC não é contraindicação absoluta inicial; pelo contrário, a lavagem de CO2 pela VNI frequentemente restaura o nível de consciência.</li>
  <li><em>Programação e Monitorização Estrita:</em> Inicia-se BiPAP com máscara orofacial, ajustando EPAP em 5 cmH2O (para compensar auto-PEEP) e IPAP em 12 cmH2O, com FiO2 titulada rigorosamente para meta de SpO2 entre 88% e 92%. Associa-se nebulização com fenoterol e ipratrópio, corticoterapia sistêmica (prednisona 40 mg/dia) e antibioticoterapia. Realiza-se nova gasometria arterial e avaliação clínica em <strong>1 hora</strong>: se houver aumento do pH, queda da PaCO2 e redução da FR, a VNI é mantida. Caso o pH caia para &lt; 7,25, a sonolência evolua para coma ou ocorra vômito, indica-se intubação orotraqueal imediata com SRI.</li>
</ol>

<h3>Caso Clínico 3: Hipoventilação Alveolar Pura por Overdose e Uso do Gradiente P(A-a)O2</h3>
<p><strong>História Clínica:</strong> Mulher de 27 anos, com histórico de depressão e dor crônica, é encontrada desacordada em seu apartamento ao lado de frascos vazios de oxicodona e clonazepam. Dá entrada na emergência trazida pelo SAMU em parada respiratória iminente. Ao exame: comatosa, pupilas mióticas puntiformes bilaterais com reflexo fotomotor lentificado, frequência respiratória de apenas 6 incursões por minuto, respiração superficial e cianose perioral evidente. Ausculta pulmonar sem ruídos adventícios, campos pleuropulmonares limpos. PA 90/55 mmHg, FC 52 bpm, SpO2 78% em ar ambiente ao nível do mar (PB = 760 mmHg).</p>
<p><strong>Gasometria Arterial (em ar ambiente):</strong> pH 7,18, PaCO2 76 mmHg, PaO2 48 mmHg, HCO3 24 mEq/L, BE -1,0 mEq/L.</p>
<p><strong>Discussão Propedêutica e Raciocínio Clínico:</strong></p>
<ol>
  <li><em>Aplicação da Equação do Gás Alveolar:</em>
    <br><em>PAO2 = [0,21 &times; (760 - 47)] - (PaCO2 / 0,8) = [0,21 &times; 713] - (76 / 0,8) = 149,7 - 95,0 = 54,7 mmHg.</em>
  </li>
  <li><em>Cálculo do Gradiente P(A-a)O2:</em>
    <br><em>P(A-a)O2 = PAO2 - PaO2 = 54,7 - 48,0 = <strong>6,7 mmHg</strong>.</em>
  </li>
  <li><em>Interpretação e Conduta:</em> O gradiente alvéolo-arterial de oxigênio é rigorosamente <strong>NORMAL (&lt; 15 mmHg)</strong>. Isso comprova de forma inequívoca que a hipoxemia é decorrente de <strong>Hipoventilação Alveolar Pura</strong> causada por depressão direta do centro respiratório bulbar por opioides e benzodiazepínicos, sem qualquer dano anatômico intrínseco na membrana alvéolo-capilar pulmonar. A hipoxemia é corrigida com facilidade, mas a prioridade imediata é a restauração da ventilação minuto. A conduta salvadora consiste em suporte com bolsa-válvula-máscara (BVM) e administração intravenosa imediata de <strong>Naloxona (0,4 a 2,0 mg IV)</strong>, que reverte o coma e a bradipneia em minutos.</li>
</ol>

<h3>Caso Clínico 4: Edema Agudo de Pulmão Cardiogênico e o Efeito Hemodinâmico do CPAP</h3>
<p><strong>História Clínica:</strong> Mulher de 72 anos, hipertensa de longa data e coronariopata prévia com infarto antigo, comparece à unidade de pronto-atendimento trazida por familiares com quadro súbito de dispneia asfixiante e tosse produtiva com escarro rosado e espumoso, iniciado há 1 hora após abandono de medicações e consumo de refeição com alto teor de sódio. Ao exame: sentada no leito, taquipneica com FR 38 irpm, sudorese fria profusa, cianose de extremidades e turgência jugular patológica a 45 graus. Ausculta cardíaca revela ritmo regular com presença de terceira bulha (B3) e sopro sistólico mitral regurgitativo 3+/6+. Ausculta pulmonar evidencia estertores crepitantes bilaterais difusos até os ápices pulmonares em ambos os hemitórax. PA 210/115 mmHg, FC 128 bpm, SpO2 76% em ar ambiente.</p>
<p><strong>Discussão Propedêutica e Raciocínio Clínico:</strong></p>
<ol>
  <li><em>Fisiopatologia do Colapso Alveolar e Sobrecarga:</em> A elevação descontrolada da pressão arterial gera um aumento brutal da pós-carga do ventrículo esquerdo, ocasionando disfunção sistólica e diastólica aguda, elevação acentuada da pressão capilar pulmonar de oclusão (&gt; 25-30 mmHg) e extravasamento hidrostático maciço de líquido serossanguinolento para o espaço intersticial e luz alveolar, gerando <strong>efeito shunt intrapulmonar</strong> e falência respiratória hipoxêmica.</li>
  <li><em>Mecanismo de Ação do CPAP:</em> A instituição precoce de <strong>Pressão Positiva Contínua nas Vias Aéreas (CPAP) com máscara orofacial titulada a 10 cmH2O</strong> atua simultaneamente no pulmão e no sistema cardiovascular:
    <ul>
      <li><em>Pulmão:</em> Abre alvéolos colabados e preenchidos por líquido, restabelece a capacidade residual funcional e expulsa o líquido para o interstício perivascular, corrigindo a hipoxemia refratária de forma quase imediata.</li>
      <li><em>Hemodinâmica:</em> A elevação da pressão intratorácica diminui a pressão transmural do ventrículo esquerdo (reduzindo a pós-carga sistólica do VE) e reduz o retorno venoso excessivo para o átrio direito (diminuindo a pré-carga), agindo de forma idêntica a um vasodilatador intratorácico mecânico.</li>
    </ul>
  </li>
  <li><em>Associação Farmacológica e Desfecho:</em> O CPAP deve ser associado imediatamente a <strong>vasodilatadores intravenosos em infusão contínua (Nitroglicerina ou Nitroprussiato de Sódio)</strong> e Furosemida IV. Essa conduta combinada reverte o edema pulmonar em mais de 90% dos casos sem necessidade de intubação endotraqueal.</li>
</ol>
`
    },
    {
      id: 'questoes-residencia-comentadas-enamed',
      title: '11. Questões de Concursos e Residência Médica com Comentários Exaustivos',
      body_html: `
<h3>Questão 1 (USP-SP / Residência Médica)</h3>
<p>Um homem de 52 anos, internado em Unidade de Terapia Intensiva com quadro de sepse grave secundária a fasceíte necrotizante, desenvolve hipoxemia refratária no 3º dia de pós-operatório. A gasometria arterial revela: pH 7,32; PaCO2 44 mmHg; PaO2 70 mmHg com FiO2 1,0 (100%) ofertada por máscara com reservatório não reinalante. A radiografia de tórax evidencia infiltrado alveolar bilateral difuso em quatro quadrantes. O ecocardiograma exclui insuficiência cardíaca. Qual é o mecanismo fisiopatológico primário responsável pela hipoxemia observada e qual a intervenção terapêutica mandatória?</p>
<ul>
  <li><strong>A)</strong> Desequilíbrio da relação ventilação/perfusão com predomínio de áreas de alto V/Q; expansão volêmica imediata com cristaloides.</li>
  <li><strong>B)</strong> Distúrbio da difusão alvéolo-capilar por fibrose precoce; início imediato de corticoterapia em pulsoterapia.</li>
  <li><strong>C)</strong> Shunt intrapulmonar direita-esquerda verdadeiro; instituição de ventilação mecânica com aplicação de pressão positiva expiratória final (PEEP).</li>
  <li><strong>D)</strong> Hipoventilação alveolar pura com gradiente alvéolo-arterial normal; reversão com suporte de oxigênio de baixo fluxo em cateter nasal.</li>
</ul>
<p><strong>Gabarito: C</strong></p>
<p><strong>Comentário Detalhado dos Distratores:</strong></p>
<ul>
  <li><em>Alternativa A está incorreta:</em> Áreas de alto V/Q (espaço morto alveolar) geram retenção de CO2 e hipoxemia leve que corrige prontamente com O2 suplementar. Além disso, a expansão volêmica indiscriminada no paciente com aumento da permeabilidade capilar pulmonar agrava o extravasamento de líquido para o alvéolo.</li>
  <li><em>Alternativa B está incorreta:</em> O distúrbio de difusão responde muito bem à oxigenoterapia com FiO2 elevada em repouso. A fase proliferativa/fibrótica da SARA só surge após 1 a 2 semanas de evolução, e não no 3º dia de pós-operatório.</li>
  <li><em>Alternativa C está CORRETA:</em> A presença de hipoxemia arterial grave (PaO2 70 mmHg) a despeito do uso de FiO2 máxima a 100% (relação PaO2/FiO2 = 70 mmHg) associada a infiltrado bilateral difuso após sepse é o marco clássico da SARA Grave com <strong>Shunt Intrapulmonar Direita-Esquerda</strong>. O sangue perfunde alvéolos completamente colapsados ou preenchidos por exsudato inflamatório, não havendo contato com o oxigênio inalado. O tratamento exige intubação orotraqueal e <strong>aplicação de PEEP</strong> para reabrir mecanicamente as unidades alveolares fechadas.</li>
  <li><em>Alternativa D está incorreta:</em> A hipoventilação alveolar pura cursa obrigatoriamente com hipercapnia grave (PaCO2 &gt; 50-60 mmHg), gradiente P(A-a)O2 rigorosamente normal e resposta excelente a baixas concentrações de oxigênio, o que contraria totalmente a gasometria da questão.</li>
</ul>

<h3>Questão 2 (SURCE / ENARE / Residência Médica)</h3>
<p>Mulher de 64 anos, portadora de DPOC dependente de oxigenoterapia domiciliar, dá entrada no serviço de urgência com confusão mental progressiva e rebaixamento do nível de consciência. Os familiares relatam que, devido à queixa de falta de ar nas últimas 12 horas, colocaram a paciente em máscara de oxigênio a 15 L/min. Ao exame: Glasgow 11, pupilas isocóricas e fotorreagentes, taquipneica leve (FR 18 irpm) com respiração superficial, asterixis (flapping) presente nas mãos. A gasometria arterial demonstra: pH 7,16; PaCO2 88 mmHg; PaO2 145 mmHg; HCO3 31 mEq/L; SaO2 99%. A piora clínica e gasométrica decorreu prioritariamente de:</p>
<ul>
  <li><strong>A)</strong> Redução drástica do drive ventilatório hipóxico aliada à atenuação da vasoconstrição pulmonar hipóxica e ao Efeito Haldane.</li>
  <li><strong>B)</strong> Shunt intrapulmonar maciço secundário à vasodilatação capilar induzida pelo dióxido de carbono.</li>
  <li><strong>C)</strong> Isquemia miocárdica silenciosa com edema agudo pulmonar cardiogênico retrógrado.</li>
  <li><strong>D)</strong> Embolia pulmonar maciça bloqueando a artéria pulmonar principal sem alterações prévias na relação V/Q.</li>
</ul>
<p><strong>Gabarito: A</strong></p>
<p><strong>Comentário Detalhado dos Distratores:</strong></p>
<ul>
  <li><em>Alternativa A está CORRETA:</em> O fornecimento intempestivo de altas frações de O2 (FiO2 excessiva) em pacientes com DPOC avançada e retenção crônica de CO2 desencadeia hipercapnia severa potencialmente fatal por uma tríade fisiopatológica clássica: (1) <strong>Alívio da vasoconstrição pulmonar hipóxica</strong>, direcionando perfusão para alvéolos mal ventilados e piorando o desequilíbrio V/Q; (2) <strong>Efeito Haldane</strong>, no qual a oxi-hemoglobina possui menor afinidade pelo CO2, deslocando o dióxido de carbono dos eritrócitos para o plasma e elevando a PaCO2; (3) <strong>Supressão do drive respiratório central carotídeo hipoxêmico</strong>, resultando em hipoventilação e narcose por CO2 (encefalopatia hipercápnica com asterixis e acidose grave).</li>
  <li><em>Alternativa B está incorreta:</em> A PaO2 está excessivamente elevada (145 mmHg), o que exclui categoricamente a presença de shunt verdadeiro (no qual haveria hipoxemia refratária).</li>
  <li><em>Alternativas C e D estão incorretas:</em> A paciente apresenta hiperóxia (PaO2 145) com SaO2 99%, incompatível com embolia pulmonar maciça ou edema agudo descompensado agudo não tratado, e o mecanismo primário da descompensação é a toxicidade da hiperóxia na retenção crônica.</li>
</ul>

<h3>Questão 3 (UNICAMP / Residência Médica)</h3>
<p>Durante a realização da Sequência Rápida de Intubação (SRI) em um homem de 24 anos, vítima de queimadura térmica de 2º e 3º graus em 40% da superfície corporal ocorrida há 14 dias, o médico socorrista deve estar atento à contraindicação formal de determinado fármaco pelo risco iminente de parada cardíaca em assistolia por hipercalemia fulminante. Qual é o fármaco contraindicado e qual a droga bloqueadora neuromuscular de escolha substitutiva?</p>
<ul>
  <li><strong>A)</strong> Fármaco contraindicado: Rocurônio; Substitutivo: Succinilcolina.</li>
  <li><strong>B)</strong> Fármaco contraindicado: Succinilcolina; Substitutivo: Rocurônio na dose de 1,0 a 1,2 mg/kg.</li>
  <li><strong>C)</strong> Fármaco contraindicado: Etomidato; Substitutivo: Cetamina na dose de 2,0 mg/kg.</li>
  <li><strong>D)</strong> Fármaco contraindicado: Cisatracúrio; Substitutivo: Vecurônio com reversão por neostigmina.</li>
</ul>
<p><strong>Gabarito: B</strong></p>
<p><strong>Comentário Detalhado dos Distratores:</strong></p>
<ul>
  <li><em>Alternativa A está incorreta:</em> Inverte completamente os fármacos. O rocurônio é o bloqueador adespolarizante seguro no grande queimado tardio.</li>
  <li><em>Alternativa B está CORRETA:</em> A <strong>succinilcolina</strong> é um bloqueador neuromuscular despolarizante. Em pacientes com queimaduras graves (&gt; 24 a 48 horas após a lesão), politraumatizados graves, portadores de lesões medulares e doenças desmielinizantes, ocorre uma proliferação maciça e generalizada de <strong>receptores nicotínicos de acetilcolina imaturos (isoformas alfa-7) extrajuncionais</strong> por toda a membrana sarcolemar muscular. Quando a succinilcolina se liga a esses receptores despolarizando a membrana, há um efluxo descontrolado e colossal de potássio intracelular para a circulação, elevando o K+ sérico em 3 a 5 mEq/L em minutos, culminando em fibrilação ventricular ou assistolia refratária. A droga de escolha absoluta para SRI nesse cenário é o <strong>Rocurônio na dose plena de 1,0 a 1,2 mg/kg IV</strong>.</li>
  <li><em>Alternativa C está incorreta:</em> Etomidato e cetamina são agentes indutores hipnóticos, não bloqueadores neuromusculares. Além disso, o etomidato não causa hipercalemia fulminante.</li>
  <li><em>Alternativa D está incorreta:</em> O cisatracúrio é um bloqueador adespolarizante benzilisoquinolínico metabolizado pela eliminação de Hofmann, seguro em relação ao potássio, porém inadequado para SRI de emergência devido ao seu início de ação lento (cerca de 2,5 a 3 minutos).</li>
</ul>

<h3>Questão 4 (UNIFESP / Residência Médica)</h3>
<p>Um paciente do sexo masculino, com 1,75 m de altura e peso real de 105 kg (obesidade grau II), portador de SARA moderada associada a choque séptico pulmonar, encontra-se sob ventilação mecânica invasiva. O médico intensivista deve programar o volume corrente inicial (Vt) no modo volume-controlado de acordo com a estratégia de ventilação mecânica protetora. Qual deve ser o valor aproximado do volume corrente a ser prescrito?</p>
<ul>
  <li><strong>A)</strong> 630 mL (calculado com base em 6 mL/kg do peso real do paciente).</li>
  <li><strong>B)</strong> 420 mL (calculado com base em 4 mL/kg do peso real do paciente).</li>
  <li><strong>C)</strong> Entre 280 e 420 mL (calculado com base em 4 a 6 mL/kg do peso predito da altura do paciente).</li>
  <li><strong>D)</strong> 840 mL (calculado com base em 8 mL/kg do peso ideal para compensar o aumento de espaço morto da obesidade).</li>
</ul>
<p><strong>Gabarito: C</strong></p>
<p><strong>Comentário Detalhado dos Distratores:</strong></p>
<ul>
  <li><em>Alternativas A, B e D estão incorretas:</em> Prescrever o volume corrente utilizando o peso real (da balança) em pacientes obesos ou edemaciados é um dos erros mais graves e frequentes em medicina intensiva, pois o parênquima pulmonar não se hipertrofia com o tecido adiposo. Ventilar um paciente obeso com base no peso real gera <strong>volutrauma maciço e hiperdistensão alveolar imediata</strong>.</li>
  <li><em>Alternativa C está CORRETA:</em> Na ventilação protetora da SARA, o volume corrente deve ser estritamente calculado com base no <strong>PESO PREDITO (Ideal pela Altura)</strong>, utilizando a fórmula internacional: <em>Peso Predito (Homens) = 50 + 0,91 &times; (Altura em cm - 152,4)</em>. Para um homem de 175 cm: <em>Peso Predito = 50 + 0,91 &times; (175 - 152,4) = 50 + 0,91 &times; 22,6 = 50 + 20,56 &asymp; 70 kg</em>. A faixa protetora de 4 a 6 mL/kg para esse paciente equivale a <strong>4 &times; 70 = 280 mL até 6 &times; 70 = 420 mL</strong>.</li>
</ul>

<h3>Questão 5 (ENAMED / Exame Nacional)</h3>
<p>Um homem de 35 anos em pós-operatório imediato de ressecção tumoral abdominal encontra-se intubado na sala de recuperação pós-anestésica. O médico assistente avalia a indicação de início de desmame ventilatório. O paciente encontra-se lúcido, cooperativo, com relação PaO2/FiO2 de 240 mmHg, PEEP de 5 cmH2O e estabilidade hemodinâmica sem vasopressores. Ao ser colocado em tubo T para cálculo de índices preditivos de desmame, apresenta frequência respiratória de 20 incursões por minuto e volume corrente expirado médio de 400 mL. Qual é o valor do Índice de Tobin (RSBI) desse paciente e qual a conduta indicada?</p>
<ul>
  <li><strong>A)</strong> RSBI = 50; valor desfavorável (&gt; 105), indicando contraindicação formal ao desmame.</li>
  <li><strong>B)</strong> RSBI = 50; valor altamente favorável (&lt; 105), indicando prosseguimento do Teste de Respiração Espontânea.</li>
  <li><strong>C)</strong> RSBI = 120; valor desfavorável, exigindo retorno imediato à ventilação controlada.</li>
  <li><strong>D)</strong> RSBI = 0,05; valor indeterminado que impede a tomada de decisão sem dosagem seriada de lactato arterial.</li>
</ul>
<p><strong>Gabarito: B</strong></p>
<p><strong>Comentário Detalhado dos Distratores:</strong></p>
<ul>
  <li><em>Alternativas A, C e D estão incorretas:</em> Apresentam cálculos matemáticos errôneos ou interpretações invertidas dos limiares clínicos do índice de Tobin.</li>
  <li><em>Alternativa B está CORRETA:</em> O Índice de Respiração Rápida e Superficial de Tobin (RSBI) é calculado dividindo-se a frequência respiratória em irpm pelo volume corrente expresso em <strong>LITROS (L)</strong>: <em>RSBI = FR / Vt(L)</em>. No caso, FR = 20 irpm e Vt = 400 mL = 0,4 L. Logo, <em>RSBI = 20 / 0,4 = 50</em>. Como o valor obtido é substancialmente <strong>menor do que 105</strong>, o índice prediz alta probabilidade de sucesso de desmame ventilatório, autorizando a realização plena do Teste de Respiração Espontânea (TRE) de 30 minutos.</li>
</ul>

<h3>Questão 6 (USP-RP / Residência Médica)</h3>
<p>Uma mulher de 68 anos dá entrada no pronto-socorro com dispneia aguda e tosse seca. A gasometria arterial colhida em ar ambiente (FiO2 0,21) ao nível do mar (PB 760 mmHg) revela: pH 7,46; PaCO2 32 mmHg; PaO2 55 mmHg; HCO3 22 mEq/L. Considerando o quociente respiratório R = 0,8 e a pressão de vapor d'água de 47 mmHg, assinale a alternativa que apresenta o valor correto da pressão alveolar de oxigênio (PAO2), do gradiente alvéolo-arterial P(A-a)O2 e a correlação fisiopatológica correspondente:</p>
<ul>
  <li><strong>A)</strong> PAO2 = 110 mmHg; P(A-a)O2 = 55 mmHg; compatível com hipoxemia por defeito de troca intrapulmonar (V/Q ou Shunt).</li>
  <li><strong>B)</strong> PAO2 = 90 mmHg; P(A-a)O2 = 10 mmHg; compatível com hipoventilação alveolar pura.</li>
  <li><strong>C)</strong> PAO2 = 140 mmHg; P(A-a)O2 = 15 mmHg; compatível com hipoxemia extrínseca por grandes altitudes.</li>
  <li><strong>D)</strong> PAO2 = 60 mmHg; P(A-a)O2 = 5 mmHg; compatível com intoxicação exógena por opióides.</li>
</ul>
<p><strong>Gabarito: A</strong></p>
<p><strong>Comentário Detalhado dos Distratores:</strong></p>
<ul>
  <li><em>Alternativa A está CORRETA:</em> Pela Equação do Gás Alveolar: <em>PAO2 = [FiO2 &times; (PB - PH2O)] - (PaCO2 / R) = [0,21 &times; (760 - 47)] - (32 / 0,8) = [0,21 &times; 713] - 40 = 149,7 - 40 = 109,7 mmHg (&asymp; 110 mmHg)</em>. O gradiente alvéolo-arterial é: <em>P(A-a)O2 = PAO2 - PaO2 = 110 - 55 = <strong>55 mmHg</strong></em>. Como o valor esperado para a paciente é de aproximadamente <em>(68 / 4) + 4 = 21 mmHg</em>, o gradiente encontra-se <strong>acentuadamente elevado (55 mmHg)</strong> com hipocapnia (PaCO2 32 mmHg por taquipneia compensatória), confirmando lesão intrínseca de troca parenquimatosa (desigualdade V/Q ou shunt), como ocorre no TEP ou na pneumonia.</li>
  <li><em>Alternativas B, C e D estão incorretas:</em> Erram as etapas do cálculo do gás alveolar ou assumem gradientes normais para valores comprovadamente discrepantes.</li>
</ul>
`
    },
    {
      id: 'pontos-chave-enamed-diretrizes',
      title: '12. Pontos de Alto Rendimento para o ENAMED e Diretrizes Finais',
      body_html: `
<h3>Os Dez Mandamentos da Insuficiência Respiratória na Emergência e UTI</h3>
<ul>
  <li><strong>1. Distinção Tipo I vs Tipo II:</strong> Tipo I = Falência de Troca (PaO2 &lt; 60 mmHg com P(A-a)O2 elevado); Tipo II = Falência de Fole/Bomba (PaCO2 &gt; 50 mmHg com acidose pH &lt; 7,35; o P(A-a)O2 é normal na hipoventilação pura).</li>
  <li><strong>2. Teste do Oxigênio a 100%:</strong> Hipoxemia que NÃO corrige plenamente com O2 a 100% é <strong>Shunt Direita-Esquerda Verdadeiro</strong> (SARA, pneumonia lobar, EAP alveolar). O tratamento exige PEEP para recrutamento alveolar.</li>
  <li><strong>3. Dispositivo de Escolha na DPOC Descompensada:</strong> <strong>Máscara de Venturi</strong> (permite oferta de FiO2 rigorosamente fixa e controlada, prevenindo hiperóxia e retenção fatal de CO2). Meta de saturação: 88% a 92%.</li>
  <li><strong>4. Padrão-Ouro da VNI:</strong> A VNI com dois níveis (BiPAP) tem indicação mandatória com nível 1A de evidência na exacerbação de DPOC com acidose respiratória (pH 7,25 a 7,35) e no Edema Agudo de Pulmão cardiogênico.</li>
  <li><strong>5. Limite da VNI na Emergência:</strong> Se não houver melhora clínica e gasométrica em <strong>1 a 2 horas</strong> de VNI, intubar imediatamente. Insistir na VNI além de 2 horas em paciente em deterioração eleva drasticamente a mortalidade.</li>
  <li><strong>6. Segurança na Sequência Rápida de Intubação:</strong> O <strong>Etomidato (0,3 mg/kg)</strong> é a droga hipnótica mais estável hemodinamicamente no choque; a <strong>Cetamina (1,5 a 2 mg/kg)</strong> é a escolha no broncoespasmo grave da asma.</li>
  <li><strong>7. Contraindicação Mortal da Succinilcolina:</strong> NUNCA utilizar succinilcolina em queimados após 24-48 horas, politrauma extenso, lesões medulares ou desnervação crônica, devido ao risco de <strong>parada cardíaca por hipercalemia fulminante</strong>. Usar Rocurônio (1,0 a 1,2 mg/kg).</li>
  <li><strong>8. Parâmetros Numéricos da Ventilação Protetora:</strong> Volume corrente de <strong>4 a 6 mL/kg de PESO PREDITO</strong> pela altura (nunca peso real), <strong>Pressão de Platô &le; 30 cmH2O</strong> e <strong>Driving Pressure &le; 15 cmH2O</strong>.</li>
  <li><strong>9. Decúbito Prona na SARA:</strong> Indicado precocemente em pacientes com SARA grave e <strong>PaO2 / FiO2 &lt; 150 mmHg</strong>, devendo ser mantido por sessões prolongadas de <strong>16 a 24 horas consecutivas</strong>.</li>
  <li><strong>10. Desmame e Extubação:</strong> O <strong>Índice de Tobin (RSBI = FR / Vt em L) &lt; 105</strong> prediz sucesso no desmame. O Teste de Respiração Espontânea (TRE) tem duração padronizada de 30 minutos. Teste de fuga do balonete (Cuff Leak Test) negativo alerta para edema de glote.</li>
</ul>

<h3>Resumo Comparativo dos Parâmetros Ventilatórios</h3>
<table class="book-table">
  <thead>
    <tr>
      <th>Parâmetro Ventilatório</th>
      <th>Alvo na Ventilação Protetora (SARA)</th>
      <th>Alvo na DPOC Descompensada</th>
      <th>Justificativa Fisiológica</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>Volume Corrente (Vt)</strong></td>
      <td><strong>4 a 6 mL/kg</strong> de peso predito</td>
      <td><strong>6 a 8 mL/kg</strong> de peso predito</td>
      <td>Evitar volutrauma e estresse mecânico no pulmão de tamanho reduzido (Baby Lung).</td>
    </tr>
    <tr>
      <td><strong>Frequência Respiratória</strong></td>
      <td>Ajustada para pH &ge; 7,20 (20 a 35 irpm)</td>
      <td>Baixa (10 a 14 irpm) com tempo expiratório longo</td>
      <td>Na DPOC, frequência baixa com relação I:E de 1:3 a 1:4 previne o aprisionamento de ar e auto-PEEP.</td>
    </tr>
    <tr>
      <td><strong>Pressão de Platô (Pplatô)</strong></td>
      <td><strong>&le; 30 cmH2O</strong></td>
      <td><strong>&le; 30 cmH2O</strong></td>
      <td>Proteção alveolar terminal contra barotrauma e rotura macroscópica.</td>
    </tr>
    <tr>
      <td><strong>Driving Pressure (&Delta;P)</strong></td>
      <td><strong>&le; 15 cmH2O</strong> (ideal &le; 13)</td>
      <td>&le; 15 cmH2O</td>
      <td>Reduz o estresse cíclico de deformação do parênquima; maior preditor de sobrevida na SARA.</td>
    </tr>
    <tr>
      <td><strong>PEEP</strong></td>
      <td>Titulada alta (10 a 18 cmH2O)</td>
      <td>Baixa a moderada (5 a 8 cmH2O)</td>
      <td>Na SARA, PEEP recruta alvéolos colabados; na DPOC, PEEP extrínseco combate o auto-PEEP sem hiperinsuflar.</td>
    </tr>
  </tbody>
</table>
`
    }
  ],
  references: [
    {
      title: 'Diretrizes Brasileiras de Ventilação Mecânica — Associação de Medicina Intensiva Brasileira (AMIB) / Sociedade Brasileira de Pneumologia e Tisiologia (SBPT)',
      url: 'https://sbpt.org.br'
    },
    {
      title: 'The ARDS Definition Task Force. Acute Respiratory Distress Syndrome: The Berlin Definition. JAMA',
      url: 'https://jamanetwork.com/journals/jama/fullarticle/1160029'
    },
    {
      title: 'European Respiratory Society / American Thoracic Society (ERS/ATS) Clinical Practice Guideline: Noninvasive Ventilation for Acute Respiratory Failure',
      url: 'https://erj.ersjournals.com'
    },
    {
      title: 'Guérin C, et al. Prone Positioning in Severe Acute Respiratory Distress Syndrome (PROSEVA Study). N Engl J Med',
      url: 'https://www.nejm.org/doi/full/10.1056/NEJMoa1214165'
    },
    {
      title: 'Amato MBP, et al. Driving Pressure and Survival in the Acute Respiratory Distress Syndrome. N Engl J Med',
      url: 'https://www.nejm.org/doi/full/10.1056/NEJMsa1410639'
    },
    {
      title: 'Ministério da Saúde do Brasil — Protocolos de Manejo da Insuficiência Respiratória Aguda e Suporte Ventilatório',
      url: 'https://www.gov.br/saude'
    }
  ]
};

const chars = saveBook(book);
console.log(`Finished ${book.slug}: ${chars} useful characters.`);
