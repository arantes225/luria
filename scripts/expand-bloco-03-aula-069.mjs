import fs from 'fs';

const filePath = 'apostilas/assistencia-ao-parto/index.html';
let html = fs.readFileSync(filePath, 'utf8');

const deepeningSection = `
<section id="aprofundamento-clinico-parto" class="book-section">
  <div class="book-section-header">
    <div class="book-section-badge">Atualização Editorial 2026</div>
    <h2 class="book-section-title">Aprofundamento Clínico: Mecanismo de Parto, Cardiotocografia FIGO e Manejo da Distócia de Ombros</h2>
    <p class="book-section-description">Diretrizes da FEBRASGO, ACOG e FIGO 2024-2026 sobre dinâmica obstétrica intraparto, vigilância fetal eletrônica e resolução de emergências na expulsão.</p>
  </div>

  <h3>1. Mecanismo de Parto na Apresentação Cefálica Fletida e Diâmetros Pélvicos</h3>
  <p>O parto transpélvico na apresentação cefálica fletida (vértice ou occipício) representa a situação fisiológica mais comum (cerca de 95% das gestações a termo). A progressão fetal através dos planos da bacia materna exige uma sucessão coordenada de movimentos passivos que adaptam os maiores diâmetros fetais aos maiores diâmetros do canal de parto:</p>
  <ul>
    <li><strong>Insinuação e Encaixamento:</strong> Ocorre quando o maior diâmetro transverso da apresentação fetal (diâmetro biparietal - DBP, cerca de 9,5 cm) transpõe o plano do estreito superior da bacia materna. Clinicamente, corresponde ao ponto mais avançado da apresentação atingir o plano zero de De Lee (espinhas ciáticas). A atitude habitual é a flexão cefálica progressiva, que substitui o diâmetro occipitofrontal (11,0 cm) pelo menor diâmetro suboccipitobregmático (9,5 cm).</li>
    <li><strong>Descida:</strong> Movimento contínuo proporcionado pela contratilidade miometrial, pressão hidrostática do líquido amniótico e esforço expulsivo materno voluntário (puxos). Em nulíparas, o encaixamento frequentemente precede o início do trabalho de parto, enquanto em multíparas a descida e o encaixamento costumam ocorrer simultaneamente durante a fase ativa.</li>
    <li><strong>Rotação Interna da Cabeça:</strong> No estreito superior, a cabeça insinua-se habitualmente em variedade oblíqua ou transversa (como occipito-esquerda-anterior - OEA ou occipito-esquerda-transversa - OET). Ao atingir o assoalho pélvico (músculo elevador do ânus), a curvatura da pelve e a resistência muscular forçam a rotação interna da sutura sagital para o diâmetro anteroposterior (occipito-púbica - OP), que coincide com a maior abertura do estreito inferior.</li>
    <li><strong>Deflexão (Extensão):</strong> Ao ultrapassar a borda inferior da sínfise púbica, o occipício ancora sob o arco púbico (hipomóclio). A cabeça fetal realiza então um movimento de báscula e extensão em torno desse ponto de apoio, permitindo a saída sucessiva da fronte, nariz, boca e mento pela comissura vulvar posterior.</li>
    <li><strong>Rotação Externa da Cabeça (Restituição) e Rotação Interna das Espáduas:</strong> Uma vez desprendida a cabeça, o occipício gira espontaneamente de volta à variedade em que se insinuou (restituição para a esquerda ou para a direita). Esse movimento alinha externamente a cabeça com o biacromial fetal, que simultaneamente sofre rotação interna no interior do canal de parto para posicionar-se no diâmetro anteroposterior da bacia.</li>
    <li><strong>Desprendimento das Espáduas e do Tronco:</strong> O ombro anterior fixa-se sob a sínfise púbica (primeiro hipomóclio dos ombros), permitindo o desprendimento do ombro posterior por flexão lateral sobre o períneo materno, seguido imediatamente pela expulsão rápida do restante do tronco e membros inferiores.</li>
  </ul>

  <h3>2. Cardiotocografia Intraparto: Classificação Tripartite FIGO / FEBRASGO 2024</h3>
  <p>A monitorização eletrônica contínua ou intermitente da frequência cardíaca fetal (FCF) e da contratilidade uterina tem como principal finalidade a detecção precoce da hipóxia fetal antes do desenvolvimento de acidose metabólica grave (pH arterial de cordão &lt; 7,00 e déficit de bases &ge; 12 mmol/L):</p>
  <table class="book-table">
    <thead>
      <tr>
        <th>Parâmetro FCF</th>
        <th>Padrão Normal (FIGO Categoria I)</th>
        <th>Padrão Suspeito (FIGO Categoria II)</th>
        <th>Padrão Patológico (FIGO Categoria III)</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><strong>Linha de Base</strong></td>
        <td>110 a 160 bpm</td>
        <td>100 a 109 bpm ou taquicardia &gt; 160 bpm sem outros achados</td>
        <td>Bradicardia &lt; 100 bpm mantida ou taquicardia persistente com variabilidade nula</td>
      </tr>
      <tr>
        <td><strong>Variabilidade</strong></td>
        <td>Moderada (6 a 25 bpm)</td>
        <td>Mínima (&le; 5 bpm) por mais de 50 minutos ou aumentada (saltatória &gt; 25 bpm por &gt; 30 min)</td>
        <td>Ausente (nula) associada a desacelerações tardias ou variáveis, ou padrão sinusoidal</td>
      </tr>
      <tr>
        <td><strong>Desacelerações</strong></td>
        <td>Ausentes ou desacelerações precoces (DIP I - espelho)</td>
        <td>Desacelerações variáveis recorrentes sem critérios de gravidade ou desacelerações prolongadas transitórias</td>
        <td>Desacelerações tardias (DIP II) recorrentes em &gt; 50% das contrações, desacelerações variáveis com componentes desfavoráveis ou bradicardia sustentada</td>
      </tr>
      <tr>
        <td><strong>Acelerações</strong></td>
        <td>Presentes (acréscimo de &ge; 15 bpm por &ge; 15 seg)</td>
        <td>Ausência de acelerações transitórias não é patológica durante o sono fetal</td>
        <td>Habitualmente ausentes</td>
      </tr>
      <tr>
        <td><strong>Conduta Clínica</strong></td>
        <td>Manter vigilância habitual, sem intervenções desnecessárias.</td>
        <td>Medidas de ressuscitação intrauterina (decúbito lateral esquerdo, suspensão de ocitocina, hidratação materna, oxigênio se hipoxemia) e reavaliação contínua.</td>
        <td>Resolução imediata do parto pela via mais rápida (parto vaginal operatório com fórceps/vácuo se dilatação total e plano avançado, ou cesariana de emergência).</td>
      </tr>
    </tbody>
  </table>

  <h3>3. Manejo Ativo do Terceiro Período: Prevenção Padronizada de Hemorragia Pós-Parto</h3>
  <p>A dequitação placentária fisiológica ocorre nos primeiros 10 a 30 minutos após a expulsão fetal por meio de mecanismos de retração miometrial (ligaduras vivas de Pinard) e clivagem na camada basal do endométrio esponjoso. O manejo ativo do terceiro período, recomendado universalmente pela OMS, FEBRASGO e Ministério da Saúde, reduz em mais de 60% a incidência de atonia uterina e hemorragia pós-parto:</p>
  <ul>
    <li><strong>Ocitocina Profilática Imediata:</strong> Administração rotineira de 10 UI de ocitocina por via intramuscular logo após o nascimento do ombro anterior do feto ou imediatamente após a saída fetal (antes do desprendimento da placenta). Em pacientes com acesso venoso estabelecido, pode-se realizar infusão lenta de ocitocina diluída (não em bólus rápido não diluído pelo risco de hipotensão e arritmias).</li>
    <li><strong>Clampeamento Oportuno do Cordão Umbilical:</strong> Realizado entre 1 e 3 minutos após o nascimento em recém-nascidos a termo vigorosos, permitindo a transfusão de cerca de 80 a 100 mL de sangue fetal placentário adicional, prevenindo anemia ferropriva na infância sem aumentar taxas de hiperbilirrubinemia patológica. Clampeamento imediato reserva-se a mães HIV/HTLV positivas, descolamento prematuro com feto comprometido ou necessidade de reanimação imediata.</li>
    <li><strong>Tração Controlada do Cordão Umbilical (Manobra de Brandt-Andrews):</strong> Uma mão posicionada na região suprapúbica exerce contrapressão em direção cefálica sobre o corpo uterino, enquanto a outra mão realiza tração suave e contínua do cordão umbilical previamente pinçado. Essa manobra impede a inversão uterina e acelera a exteriorização da placenta sem arrancamento cotiledonar.</li>
    <li><strong>Massagem e Vigilância Uterina no 4º Período (Período de Greenberg):</strong> Na primeira hora puerperal, o útero deve ser palpado a cada 15 minutos para assegurar o tônus contraído (globo de segurança de Pinard). A bexiga deve ser mantida vazia para não inibir a contratilidade miometrial.</li>
  </ul>

  <h3>4. Distócia de Ombros: Algoritmo Emergencial HELPERR Passo a Passo</h3>
  <p>A distócia de ombros é uma emergência obstétrica imprevisível definida pela necessidade de manobras adicionais após a falha de tração suave habitual para liberar o biacromial fetal impactado contra a sínfise púbica materna. O sinal clínico diagnóstico clássico é o <em>sinal da tartaruga</em> (retração da cabeça fetal contra o períneo imediatamente após a expulsão):</p>
  <table class="book-table">
    <thead>
      <tr>
        <th>Mnemônico HELPERR</th>
        <th>Ação Clínica</th>
        <th>Mecanismo e Detalhes de Execução</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><strong>H - Help</strong></td>
        <td>Chamar ajuda imediatamente</td>
        <td>Acionar equipe multidisciplinar: obstetra adicional, anestesiologista, pediatra/neonatologista e equipe de enfermagem. Anotar o tempo de desprendimento cefálico.</td>
      </tr>
      <tr>
        <td><strong>E - Evaluate for Episiotomy</strong></td>
        <td>Avaliar episiotomia</td>
        <td>A distócia é óssea (impacto na sínfise púbica), portanto a episiotomia não libera os ombros, mas pode ser necessária para ampliar o espaço de manobras internas manuais.</td>
      </tr>
      <tr>
        <td><strong>L - Legs (McRoberts)</strong></td>
        <td>Manobra de McRoberts</td>
        <td>Hiperflexão e abdução máxima das coxas da parturiente contra o abdome. Retifica a curvatura lombossacra, roda a sínfise púbica cefalicamente e reduz o ângulo de inclinação pélvica. Resolve mais de 70% dos casos quando combinada com Rubin I.</td>
      </tr>
      <tr>
        <td><strong>P - Pressure (Rubin I)</strong></td>
        <td>Pressão Suprapúbica</td>
        <td>Pressão contínua ou ritmada realizada por assistente na região suprapúbica em sentido oblíquo sobre o dorso do feto, visando aduzir o ombro anterior fetal. <strong>Proibida a pressão de fundo uterino (Kristeller)</strong>, que agrava o impacto e eleva o risco de rotura uterina e lesão de plexo braquial.</td>
      </tr>
      <tr>
        <td><strong>E - Enter (Manobras Internas)</strong></td>
        <td>Manobras de rotação interna</td>
        <td><strong>Rubin II:</strong> Introduzir dois dedos na vagina para pressionar a face posterior do ombro anterior em direção ao tórax fetal para aduzi-lo.<br><strong>Woods:</strong> Pressionar a face anterior do ombro posterior em sentido horário/anti-horário para promover rotação de 180°.<br><strong>Woods Invertido:</strong> Rotação no sentido oposto combinando forças sobre ambos os ombros.</td>
      </tr>
      <tr>
        <td><strong>R - Remove the Posterior Arm</strong></td>
        <td>Extração do braço posterior (Jacquemier)</td>
        <td>Introduzir a mão ao longo da curvatura sacra, identificar o antebraço fetal, flexionar o cotovelo e trazer a mão fetal em varredura pela face anterior do tórax até o desprendimento do membro superior posterior. Reduz o diâmetro biacromial para axiloacromial.</td>
      </tr>
      <tr>
        <td><strong>R - Roll (Gaskin)</strong></td>
        <td>Posição de quatro apoios</td>
        <td>Posicionar a paciente de quatro apoios (joelhos e mãos). A gravidade e a mudança nos diâmetros conjugados frequentemente liberam o ombro posterior.</td>
      </tr>
      <tr>
        <td><strong>Último Recurso</strong></td>
        <td>Manobras heróicas</td>
        <td>Fratura intencional de clavícula fetal, sinfisiotomia cirúrgica ou <strong>Manobra de Zavanelli</strong> (reposicionamento cefálico com flexão e rotação inversa para a cavidade uterina sob tocolise de emergência, seguida de cesariana imediata).</td>
      </tr>
    </tbody>
  </table>
</section>
`;

// Insert right before </article>
const articleCloseIdx = html.indexOf('</article>');
if (articleCloseIdx === -1) {
  console.error('</article> not found');
  process.exit(1);
}

const newHtml = html.slice(0, articleCloseIdx) + deepeningSection + html.slice(articleCloseIdx);
fs.writeFileSync(filePath, newHtml, 'utf8');
console.log('[OK] assistencia-ao-parto expanded successfully.');
