// Bloco 5 - Aula 103: Tuberculose na Infância (Parte 1: Seções 1 a 5)

export const sec1 = {
  id: 'fisiopatologia-da-primo-infeccao-e-imunologia-na-infancia',
  title: '1. Fisiopatologia da Primo-Infecção Tuberculosa e a Singularidade Imunológica Pediátrica',
  body_html: `
<h3>O Desafio Pediátrico: A Tuberculose da Infância Não é um "Mini-Adulto"</h3>
<p>A <strong>Tuberculose (TB) na infância e na adolescência</strong> constitui um dos cenários mais singulares, desafiadores e negligenciados da pneumologia e da saúde pública mundial. Ao contrário do adulto — cuja apresentação clínica clássica decorre predominantemente da <em>reativação endógena</em> de bacilos dormentes em ápices pulmonares (gerando tosse produtiva crônica com cavernas altamente bacilíferas) —, a criança adoece quase invariavelmente em decorrência da <strong>progressão direta primária de uma primo-infecção recente</strong> adquirida pelo convívio intradomiciliar íntimo com um adulto bacilífero.</p>

<p>Além disso, o sistema imunológico infantil possui características de imaturidade celular funcional que moldam radicalmente a patogenia e a apresentação clínica da afecção:</p>

<ul>
  <li><strong>Imaturidade da Imunidade Celular Mediada por Linfócitos T:</strong> Em lactentes e menores de 2 anos, a resposta de células $T \\text{ CD4}^+$ e a secreção de citocinas pró-inflamatórias essenciais (especialmente o <em>Interferon-gama - IFN-}\\gamma$</em> e o <em>Fator de Necrose Tumoral Alfa - TNF-}\\alpha$</em>) são funcionalmente deficientes. Como resultado, os macrófagos alveolares ativados são incapazes de conter com eficácia a multiplicação intracelular do <em>Mycobacterium tuberculosis</em> dentro do granuloma primário;</li>
  <li><strong>Maior Risco de Disseminação Linfoematogênica Sistêmica:</strong> Enquanto no adulto imunocompetente o risco de progressão de infecção latente para doença ativa ao longo de toda a vida é de apenas 5% a 10%, no <strong>lactente menor de 1 ano esse risco dispara para assustadores 40% a 50%</strong>, com altíssima propensão à disseminação hematogênica precoce nas primeiras semanas após o contágio, culminando nas formas mais letais da doença: a <strong>Meningoencefalite Tuberculosa (Neurotuberculose)</strong> e a <strong>Tuberculose Miliar</strong>;</li>
  <li><strong>Paucibacilaridade Absoluta:</strong> A criança raramente desenvolve cavernas pulmonares tuberculosas ricas em oxigênio (as cavitações são a marca registrada da hipersensibilidade do adulto). As lesões pediátricas são predominantemente fechadas, granulomatosas e caseosas, com baixa carga bacilar intrínseca (geralmente menor do que $10^2$ a $10^3$ bacilos por grama de tecido). Portanto, a criança tosse pouco ou tosse sem expectoração, e quando tosse <strong>deglute todo o catarro</strong>, tornando os métodos convencionais de microscopia direta (baciloscopia de escarro pelo método de Ziehl-Neelsen) sistematicamente <strong>NEGATIVOS em mais de 80% a 90% dos casos pediátricos</strong>. A criança é paucibacilar e <strong>NÃO É TRANSMISSORA (não contagia o ambiente)</strong>.</li>
</ul>

<h3>A Patogenia da Primo-Infecção: Do Nódulo de Ghon ao Complexo de Ranke</h3>
<p>A história natural da infecção pelo bacilo de Koch (BK) na criança segue etapas histopatológicas cronologicamente encadeadas:</p>

<ol>
  <li><strong>Inalação de Gotículas de Wells e Deposição Alveolar:</strong> O bacilo atinge os alvéolos das regiões médias ou basais do pulmão (zonas de maior ventilação fisiológica), onde é fagocitado por macrófagos alveolares não ativados;</li>
  <li><strong>Formação do Foco Primário de Ghon (Nódulo de Ghon):</strong> Proliferação local do bacilo com reação inflamatória inespecífica e necrose de caseificação microscópica no parênquima subpleural;</li>
  <li><strong>Drenagem Linfática e Linfadenopatia Satélite:</strong> Bacilos viáveis e células apresentadoras de antígenos migram através dos vasos linfáticos pulmonares (linfangite) em direção aos linfonodos hilares e mediastinais regionais correspondentes;</li>
  <li><strong>O Complexo Bipolar de Ghon:</strong> A associação anatômica clássica entre o <strong>Foco Parenquimatoso Primário (Nódulo de Ghon)</strong>, a <strong>Linfangite regional</strong> e a <strong>Linfadenomegalia Hilar/Mediastinal</strong> constitui o célebre <strong>Complexo Primário de Ghon</strong> (marco patognomônico da primo-infecção infantil);</li>
  <li><strong>Evolução e Cura com Calcificação (Complexo de Ranke):</strong> Com o surgimento da imunidade celular específica após 3 a 8 semanas da infecção (positivação da prova tuberculínica), a maioria das crianças imunocompetentes contém a infecção. O complexo de Ghon sofre fibrose e calcificação distrófica progressiva, recebendo na radiografia e tomografia a denominação de <strong>Complexo de Ranke</strong> (cicatriz calcificada inativa).</li>
</ol>
`
};

export const sec2 = {
  id: 'espectro-das-formas-pulmonares-e-linfonodais-na-crianca',
  title: '2. Espectro Clínico das Formas Pulmonares Pediátricas: Adenopatia Hilomediastinal, Pneumonia e Atelectasia',
  body_html: `
<h3>O Quadro Clínico Clássico: Insidioso, Arrastado e Não Responsivo a Antibióticos Comuns</h3>
<p>Diferentemente das pneumonias bacterianas comunitárias agudas (causadas por <em>Streptococcus pneumoniae</em>, que se manifestam de forma hiperaguda com febre alta repentina, prostração súbita e taquipneia em menos de 48 a 72 horas), a <strong>Tuberculose Pulmonar Primária na Criança</strong> apresenta uma instalação <strong>insidiosa, arrastada e subclínica</strong> que frequentemente confunde os profissionais de saúde:</p>

<ul>
  <li><strong>Tosse Persistente:</strong> Tosse seca ou discretamente secretiva que perdura por <strong>mais de 2 a 3 semanas (frequentemente &gt; 15 dias)</strong> sem qualquer sinal de melhora clínica;</li>
  <li><strong>Febre Vespertina Diária Moderada:</strong> Picos febris que ocorrem no final da tarde ou à noite (geralmente entre 37,8°C e 38,5°C), acompanhados de <strong>sudorese noturna</strong> profusa que chega a molhar a roupa de cama da criança;</li>
  <li><strong>Comprometimento Ponderal e do Crescimento:</strong> Emagrecimento progressivo documentado, perda de apetite (anorexia marcante), estagnação ou queda na curva de peso da caderneta de saúde da criança (curva de crescimento da OMS);</li>
  <li><strong>Falha Terapêutica Sequencial:</strong> História clínica típica de criança que já recebeu um ou dois ciclos completos de antibioticoterapia oral convencional para pneumonia comunitária (amoxicilina, azitromicina, amoxicilina-clavulanato) <strong>SEM NENHUMA RESPOSTA CLÍNICA OU RADIOLÓGICA</strong>.</li>
</ul>

<h3>Padrões Radiológicos Pulmonares Pediátricos Fundamentais</h3>
<p>O exame radiográfico do tórax (incidências póstero-anterior ou ântero-posterior e perfil estrito) é a peça-chave do diagnóstico infantil. Em pediatria, a radiografia revela quatro apresentações anatomoclínicas marcantes:</p>

<table class="book-table">
  <thead>
    <tr>
      <th>Padrão Radiológico Pediátrico</th>
      <th>Mecanismo Fisiopatológico</th>
      <th>Achado Radiográfico Específico</th>
      <th>Particularidades Clínicas</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>1. Forma Ganglionar Pura (Linfadenopatia Hilomediastinal)</strong></td>
      <td>Hipertrofia inflamatória maciça dos linfonodos hilares, paratraqueais ou subcarinais pelo complexo primário.</td>
      <td>Alargamento unilateral do hilo pulmonar ou do mediastino superior. <strong>O perfil lateral é obrigatório</strong> para visualizar linfonodos hilares retrocardíacos ocultados no PA.</td>
      <td>Acomete lactentes e pré-escolares. Pode cursar com tosse metálica coqueluchoide por compressão extrínseca traqueal.</td>
    </tr>
    <tr>
      <td><strong>2. Forma Pneumônica (Condensação / Infiltrado Parenquimatoso)</strong></td>
      <td>Extensão da necrose caseosa para o parênquima adjacente ou disseminação broncogênica segmentar.</td>
      <td>Opacidade homogênea segmentar ou lobar indistinguível da pneumonia bacteriana comum, porém <strong>associada a linfadenomegalia hilar satélite homolateral</strong>.</td>
      <td>Não melhora após 10 a 14 dias de amoxicilina. A associação com adenopatia no mesmo hemitórax é o sinal radiológico mais suspeito de TB.</td>
    </tr>
    <tr>
      <td><strong>3. Forma Atelectásica / Enfisema Obstrutivo (Epituberculose)</strong></td>
      <td>O linfonodo caseoso volumoso comprime extrinsecamente o brônquio da criança (muito flexível) ou sofre erosão com fístula linfobrônquica intraluminal.</td>
      <td><strong>Efeito de Válvula:</strong> Se a oclusão for parcial, causa aprisionamento aéreo (hiperinsuflação / enfisema lobar); se for total, colapso lobar (atelectasia triangular, mais frequente no lobo médio e lobo superior direito).</td>
      <td>Sibilos monofônicos unilaterais fixos resistentes a broncodilatadores (frequentemente diagnosticado erroneamente como "asma de difícil controle").</td>
    </tr>
    <tr>
      <td><strong>4. Tuberculose Cavitária do Tipo Adulto (Pós-Primária)</strong></td>
      <td>Reativação endógena ou reinfecção exógena em adolescentes com sistema imune maduro.</td>
      <td><strong>Cavitações de paredes espessas em ápices pulmonares</strong> e segmentos superiores dos lobos inferiores, acompanhadas de tosse produtiva franca.</td>
      <td><strong>Forma bacilífera transmissora!</strong> O adolescente adquire o perfil epidemiológico do adulto (baciloscopia e TRM-TB positivos no escarro).</td>
    </tr>
  </tbody>
</table>
`
};

export const sec3 = {
  id: 'formas-extrapulmonares-graves-neurotuberculose-e-tuberculose-miliar',
  title: '3. Formas Extrapulmonares Graves e Letais: Neurotuberculose, TB Miliar e Forma Linfonodal Periférica',
  body_html: `
<h3>1. Meningoencefalite Tuberculosa (Neurotuberculose): A Mais Temida Emergência Pediátrica</h3>
<p>A meningoencefalite por <em>M. tuberculosis</em> representa a complicação mais devastadora e letal da primo-infecção, incidindo primariamente em <strong>crianças menores de 2 anos não vacinadas com BCG</strong> (habitualmente ocorrendo entre 2 e 6 meses após a infecção inicial). Se não tratada precocemente, a taxa de mortalidade ultrapassa 50%, e praticamente 100% dos sobreviventes desenvolvem sequelas neurológicas motoras e cognitivas irreversíveis.</p>

<p><strong>Fisiopatologia Neuropatológica (Focos de Rich):</strong> A disseminação linfoematogênica primária implanta microgranulomas tuberculosos no córtex cerebral e nas meninges (denominados historicamente como <em>Focos de Rich</em>). Semanas ou meses depois, a rotura espontânea de um foco de Rich no espaço subaracnóideo libera antígenos micobacterianos maciços no líquor, deflagrando uma reação inflamatória granulomatosa intensa e espessa com predileção pelas <strong>cisternas da base do crânio (aracnoidite basal exsudativa gelatinosa)</strong>:</p>

<ul>
  <li><strong>Aprisionamento dos Pares Cranianos da Base:</strong> Paralisia de nervos oculomotores (especialmente o <strong>VI par - Abducente</strong> com estrabismo convergente, <strong>III par - Oculomotor</strong> com ptose e midríase, e <strong>VII par - Facial</strong> com paralisia facial periférica);</li>
  <li><strong>Vasculite Cerebral Necrotizante com Infartos Isquêmicos:</strong> A inflamação das artérias da base (Polígono de Willis e artérias lenticuloestriadas) induz trombose e isquemia cerebral profunda nos gânglios da base e cápsula interna, causando hemiplegia e déficits motores focais;</li>
  <li><strong>Hidrocefalia Obstrutiva / Comunicante:</strong> O exsudato caseoso espesso bloqueia a circulação liquórica nas cisternas da base e a reabsorção nas vilosidades aracnóideas, gerando hipertensão intracraniana progressiva com dilatação ventricular.</li>
</ul>

<p><strong>Evolução Clínica em Três Estágios:</strong></p>
<ol>
  <li><strong>Estágio 1 (Prodrômico / Não Focal - 1 a 2 semanas):</strong> Sintomas insidiosos inespecíficos: irritabilidade, apatia, sonolência diurna, febre baixa diária, vômitos matinais e estagnação ponderal;</li>
  <li><strong>Estágio 2 (Meningítico / Focal):</strong> Sinais meníngeos clássicos (rigidez de nuca, sinais de Kernig e Brudzinski), paralisia de pares cranianos (estrabismo súbito), convulsões e déficits focais;</li>
  <li><strong>Estágio 3 (Comatoso / Avançado):</strong> Rebaixamento profundo do nível de consciência, postura de descerebração ou decorticação, dilatação pupilar fixa e óbito por herniação cerebral.</li>
</ol>

<p><strong>Padrão Liquórico Típico da Neurotuberculose (Análise Citobioquímica):</strong></p>
<div class="formula-box">
  $$\\text{Líquor Límpido ou Xantocrômico com Formação de "Véu de Noiva" / Coágulo Fibrinoso}$$
  $$\\text{Pleocitose Moderada (50 a 500 leucócitos/mm}^3\\text{) com Predomínio Linfomonocitário (&gt; 70\\% - 80\\%)}$$
  $$\\text{Hiperproteinorraquia Maciça (&gt; 100 a 500 mg/dL ou &gt; 1 a 2 g/dL em casos graves)}$$
  $$\\text{Hipoglicorraquia Severa (Glicose liquórica &lt; 40 mg/dL ou Relação Líquor/Glicemia &lt; 0,3)}$$
</div>

<h3>2. Tuberculose Miliar (Disseminação Hematogênica Aguda)</h3>
<p>Decorre da erosão de um granuloma caseoso diretamente para o interior de um vaso sanguíneo (veia pulmonar ou ducto torácico), disseminando bilhões de micobactérias pela grande e pequena circulação para múltiplos órgãos nobres (pulmões, fígado, baço, medula óssea, rins e coroide ocular). Apresenta-se com febre prolongada de origem indeterminada, hepatoesplenomegalia maciça e linfadenopatia generalizada. À fundoscopia, a visualização de <strong>Tubérculos de Coroide (lesões retinianas esbranquiçadas arredondadas elevadas)</strong> fecha o diagnóstico em minutos. O achado radiológico patognomônico é o <strong>Padrão Miliar (micronodular fino difuso bilateral homogêneo)</strong>, com miríades de nódulos de 1 a 2 mm distribuídos simetricamente de ápices a bases pulmonares como "grãos de painço / sementes de milheto".</p>

<h3>3. Tuberculose Ganglionar Periférica (Escrófula)</h3>
<p>É a forma extrapulmonar mais comum em crianças maiores e imunocompetentes. Acomete a <strong>cadeia cervical anterior e supraclavicular unilateralmente</strong>. Manifesta-se como aumento ganglionar crônico, indolor, de consistência endurecida com confluência de múltiplos linfonodos ("em bloco" ou plastrão), aderidos aos planos profundos, sem calor nem rubor agudo, que evoluem com amolecimento central (caseificação) e <strong>fistulização espontânea crônica com drenagem de secreção purulenta caseosa esbranquiçada</b> e cicatrização estelar retrátil lenta.</p>
`
};

export const sec4 = {
  id: 'o-sistema-de-pontos-do-ministerio-da-saude-para-diagnostico',
  title: '4. O Escore de Pontos do Ministério da Saúde: Diagnóstico Clínico sem Necessidade de Escarro',
  body_html: `
<h3>O Desafio da Ausência de Confirmação Bacteriológica na Criança</h3>
<p>Como mais de 80% das crianças com tuberculose ativa pulmonar não produzem escarro espontâneo e apresentam baciloscopias negativas, aguardar a comprovação microbiológica bacteriológica tradicional acarretaria retardo inaceitável no tratamento e mortes evitáveis. Para padronizar a conduta na Atenção Primária e nos hospitais de todo o Brasil, o <strong>Ministério da Saúde (MS) desenvolveu e validou cientificamente o Sistema de Escore de Pontos para Diagnóstico de Tuberculose em Crianças e Adolescentes</strong>.</p>

<p>O escore é um instrumento clínico-epidemiológico validado que pontua quatro dimensões cardinais: <strong>Quadro Clínico, Quadro Radiológico, História Epidemiológica de Contato e Prova Tuberculínica / Estado Nutricional</strong>:</p>

<table class="book-table">
  <thead>
    <tr>
      <th>Dimensão Avaliada</th>
      <th>Critérios Clínicos e Epidemiológicos Objetivos</th>
      <th>Pontuação Atribuída</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td rowspan="3"><strong>1. Quadro Clínico-Evolutivo</strong></td>
      <td>Febre ou sintomas como tosse, adinamia, sudorese, expectoração, emagrecimento por <strong>duas ou mais semanas ($\ge 15$ dias)</strong>.</td>
      <td><strong>$+15$ Pontos</strong></td>
    </tr>
    <tr>
      <td>Assintomático ou com sintomas respiratórios durando <strong>menos de 2 semanas (&lt; 15 dias)</strong>.</td>
      <td><strong>$0$ Ponto</strong></td>
    </tr>
    <tr>
      <td>Sintomas respiratórios com <strong>melhora após uso de antibióticos comuns</strong> para pneumonia ou sem melhora de infecções respiratórias altas agudas.</td>
      <td><strong>$-10$ Pontos</strong></td>
    </tr>
    <tr>
      <td rowspan="3"><strong>2. Quadro Radiológico (Raio-X de Tórax)</strong></td>
      <td>Condensação ou infiltrado (com ou sem cavitação) <strong>persistente por $\ge 15$ dias</strong> OU Linfadenomegalia hilar/mediastinal OU Padrão Miliar.</td>
      <td><strong>$+15$ Pontos</strong></td>
    </tr>
    <tr>
      <td>Condensação ou infiltrado há <strong>menos de 15 dias</strong>.</td>
      <td><strong>$+5$ Pontos</strong></td>
    </tr>
    <tr>
      <td>Radiografia de tórax <strong>normal</strong>.</td>
      <td><strong>$-5$ Pontos</strong></td>
    </tr>
    <tr>
      <td rowspan="3"><strong>3. História Epidemiológica de Contato</strong></td>
      <td>Contato íntimo intradomiciliar com <strong>adulto bacilífero com tuberculose pulmonar ativa nos últimos 2 anos</strong>.</td>
      <td><strong>$+10$ Pontos</strong></td>
    </tr>
    <tr>
      <td>Contato domiciliar com caso de tuberculose <strong>com baciloscopia desconhecida ou negativa</strong> nos últimos 2 anos.</td>
      <td><strong>$+5$ Pontos</strong></td>
    </tr>
    <tr>
      <td><strong>Sem história</strong> conhecida de contato com tuberculose.</td>
      <td><strong>$0$ Ponto</strong></td>
    </tr>
    <tr>
      <td rowspan="3"><strong>4. Teste Tuberculínico (PPD) e Estado Nutricional</strong></td>
      <td><strong>PPD Reator:</strong> $\ge 5\\text{ mm}$ (em não vacinados com BCG ou vacinados há mais de 2 anos, ou imunodeprimidos) OU $\ge 10\\text{ mm}$ (vacinados há menos de 2 anos);<br>OU <strong>Desnutrição Grave</strong> (Peso/Idade &lt; percentil 0,1 ou Z-escore &lt; -3).</td>
      <td><strong>$+10$ Pontos</strong></td>
    </tr>
    <tr>
      <td><strong>PPD Reator Fraco:</strong> entre 5 e 9 mm em vacinados com BCG há menos de 2 anos.</td>
      <td><strong>$+5$ Pontos</strong></td>
    </tr>
    <tr>
      <td><strong>PPD Não Reator:</strong> &lt; 5 mm em indivíduos imunocompetentes.</td>
      <td><strong>$0$ Ponto</strong></td>
    </tr>
  </tbody>
</table>

<h3>Interpretação e Conduta Obrigatória Pela Pontuação Total</h3>
<table class="book-table">
  <thead>
    <tr>
      <th>Pontuação Total Acumulada</th>
      <th>Classificação Diagnóstica Oficial do Ministério da Saúde</th>
      <th>Conduta Clínica Imediata Recomendada</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>$\ge 40$ Pontos</strong></td>
      <td><strong>Diagnóstico Muito Provável de Tuberculose Ativa</strong></td>
      <td><strong>INICIAR TRATAMENTO FARMACOLÓGICO IMEDIATO PARA TUBERCULOSE!</strong> Dispensada a necessidade de exames invasivos; notificação compulsória imediata e início do esquema RHZ pediátrico.</td>
    </tr>
    <tr>
      <td><strong>$30$ a $35$ Pontos</strong></td>
      <td><strong>Diagnóstico Possível de Tuberculose</strong></td>
      <td><strong>Investigação complementar detalhada:</strong> Proceder a lavado gástrico em três manhãs consecutivas para TRM-TB e cultura, considerar tomografia de tórax e avaliar criteriosamente início empírico do tratamento pelo especialista.</td>
    </tr>
    <tr>
      <td><strong>$&le; 25$ Pontos</strong></td>
      <td><strong>Diagnóstico Pouco Provável</strong></td>
      <td>Investigar outras pneumopatias e etiologias diferenciais (pneumonias atípicas, bronquiectasias, corpo estranho, asma); manter reavaliação clínica.</td>
    </tr>
  </tbody>
</table>
`
};

export const sec5 = {
  id: 'metodos-diagnosticos-ppd-igra-lavado-gastrico-e-trm-tb',
  title: '5. Métodos Complementares: PPD, IGRA, Lavado Gástrico e o Teste Rápido Molecular (TRM-TB)',
  body_html: `
<h3>1. Prova Tuberculínica (PPD / Derivado Proteico Purificado): Princípios e Leitura</h3>
<p>O <strong>PPD (Purified Protein Derivative)</strong>, também conhecido como Teste Tuberculínico de Mantoux, avalia a resposta de <strong>hipersensibilidade tardia do tipo IV mediada por células T</strong> contra antígenos de filtrado de cultura do <em>M. tuberculosis</em>. É fundamental ressaltar: <strong>o PPD isolado diagnostica INFECÇÃO pelo bacilo (contato prévio), e NÃO necessariamente DOENÇA ATIVA</strong>.</p>

<ul>
  <li><strong>Técnica de Aplicação:</strong> Injeção estritamente <strong>intradérmica de 0,1 mL de PPD RT-23</strong> no terço médio da face anterior do antebraço esquerdo, formando uma pápula esbranquiçada de bordas nítidas de 5 a 6 mm ("casca de laranja");</li>
  <li><strong>Momento da Leitura:</strong> A leitura deve ser realizada obrigatoriamente entre <strong>48 e 72 horas</strong> após a aplicação (podendo estender-se até 96h se necessário);</li>
  <li><strong>Técnica de Medição:</strong> Mede-se com régua milimetrada plástica flexível transparente <strong>apenas a INDURAÇÃO (endurecimento palpável)</strong> no seu maior diâmetro transverso em relação ao eixo longo do antebraço. <strong>NUNCA MEDIR O ERITEMA!</strong> O eritema avermelhado ao redor reflete mera vasodilatação inespecífica;</li>
  <li><strong>Interpretação e Ponto de Corte Atualizado do Ministério da Saúde:</strong>
    <ul>
      <li><strong>$\ge 5\\text{ mm}$ (Reator):</strong> Considerado positivo para praticamente todas as crianças na prática clínica (crianças com mais de 2 anos de vacinação BCG, crianças não vacinadas, imunodeprimidos por HIV, desnutridos e contatos domiciliares de casos bacilíferos);</li>
      <li><strong>$&lt; 5\\text{ mm}$ (Não Reator):</strong> Ausência de infecção tuberculosa ativa OU estado de <em>Anergia Cutânea</em> (imunossupressão grave por HIV avançado, desnutrição proteico-calórica severa com anasarca, sarampo recente, uso prolongado de corticosteroides sistêmicos ou imunobiológicos inibidores de TNF).</li>
    </ul>
  </li>
</ul>

<h3>2. Ensaios de Liberação de Interferon-Gama (IGRA - Interferon-Gamma Release Assays)</h3>
<p>Os testes IGRA (comercialmente conhecidos como <em>QuantiFERON-TB Gold Plus</em> e <em>T-SPOT.TB</em>) representam um salto tecnológico extraordinário na investigação da infecção tuberculosa latente. O ensaio mede <em>in vitro</em> a quantidade de Interferon-gama liberada por linfócitos T sensibilizados quando expostos a antígenos recombinantes altamente específicos do <em>M. tuberculosis</em> (as proteínas <strong>ESAT-6 e CFP-10</strong>):</p>
<table class="book-table">
  <thead>
    <tr>
      <th>Característica de Comparação</th>
      <th>Prova Tuberculínica Tradicional (PPD / Mantoux)</th>
      <th>Ensaios IGRA (QuantiFERON / T-SPOT)</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>Reatividade Cruzada com a Vacina BCG</strong></td>
      <td><strong>PRESENTE!</strong> Pode resultar falso-positivo se a criança tiver recebido BCG recente (&lt; 2 anos).</td>
      <td><strong>NENHUMA REATIVIDADE CRUZADA!</strong> Os antígenos ESAT-6 e CFP-10 estão ausentes no genoma do bacilo BCG (região RD1 deletada).</td>
    </tr>
    <tr>
      <td><strong>Reatividade com Micobactérias Não Tuberculosas</strong></td>
      <td>Alta reatividade cruzada com micobactérias ambientais (<em>M. avium</em>).</td>
      <td>Virtualmente ausente (altíssima especificidade &gt; 98%).</td>
    </tr>
    <tr>
      <td><strong>Logística de Realização</strong></td>
      <td>Exige duas visitas médicas presenciais (uma para aplicar e outra entre 48-72h para ler). Leitura examinador-dependente.</td>
      <td>Exige coleta única de sangue venoso periférico com leitura laboratorial automatizada padronizada.</td>
    </tr>
    <tr>
      <td><strong>Uso em Menores de 2 Anos</strong></td>
      <td>Padronizado e amplamente validado em qualquer faixa etária infantil.</td>
      <td>Menos validado em lactentes menores de 2 anos (risco de resultados indeterminados por baixa resposta de IFN-gama).</td>
    </tr>
  </tbody>
</table>

<h3>3. O Lavado Gástrico (A Solução para a Paucibacilaridade Infantil)</h3>
<p>Como o lactente não expectora e deglute as secreções respiratórias enquanto dorme, a árvore brônquica limpa-se pelo batimento ciliar durante a noite, acumulando os bacilos no suco gástrico até a primeira hora da manhã. O <strong>Aspirado / Lavado Gástrico</strong> é o método laboratorial de escolha para coleta de espécime clínico em menores de 10 anos hospitalizados:</p>
<ul>
  <li><strong>Protocolo Rígido:</strong> Realizado em <strong>três manhãs consecutivas</b>, com a criança em jejum estrito de 8 a 12 horas, imediatamente ao despertar no leito hospitalar antes que ocorra esvaziamento gástrico espontâneo;</li>
  <li>Insere-se sonda nasogástrica, aspira-se o conteúdo gástrico basal e injeta-se 20 a 30 mL de soro fisiológico estéril, seguido de reaspiração imediata;</li>
  <li>O material deve ser imediatamente neutralizado com bicarbonato de sódio a 10% (pois a acidez clorídrica gástrica destrói os bacilos viáveis em poucas horas) e encaminhado ao laboratório.</li>
</ul>

<h3>4. O Teste Rápido Molecular para Tuberculose (TRM-TB / GeneXpert MTB/RIF)</h3>
<p>O TRM-TB revolucionou o diagnóstico no SUS através de reação em cadeia da polimerase (PCR automatizada em cartucho fechado):</p>
<ul>
  <li>Fornece o resultado em <strong>menos de 2 horas</strong> com sensibilidade superior à baciloscopia;</li>
  <li>Detecta simultaneamente o DNA do <em>Mycobacterium tuberculosis</em> e a presença de mutações no gene <em>rpoB</em>, conferindo <strong>detecção imediata de resistência à Rifampicina</strong> (marcador de tuberculose multirresistente - TB-MDR).</li>
</ul>
`
};
