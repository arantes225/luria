import { htmlToBlocks } from '../bloco-06-utils.mjs';

export const secPlanExpansao = [
  {
    id: 'criterios-elegibilidade-oms-febrasgo-2026-detalhado',
    title: 'Critérios Médicos de Elegibilidade da OMS e FEBRASGO 2026: Análise por Sistemas e Comorbidades',
    body_html: `
<h3>Estrutura das Categorias de Elegibilidade Médica (MEC 1 a 4)</h3>
<p>Os <strong>Critérios Médicos de Elegibilidade para Uso de Métodos Anticoncepcionais</strong>, estabelecidos pela Organização Mundial da Saúde (OMS - 6ª Edição, 2025/2026) e validados no Brasil pela Federação Brasileira das Associações de Ginecologia e Obstetrícia (FEBRASGO), constituem a espinha dorsal da segurança na prescrição contraceptiva. Seu objetivo precípuo é eliminar barreiras infundadas ao acesso a métodos eficazes, ao mesmo tempo em que protege usuárias contra riscos graves iatrogênicos (em especial eventos tromboembólicos, cardiovasculares e neoplásicos).</p>
<p>O sistema classifica a adequação de cada método frente a uma condição clínica ou comorbidade individual em quatro categorias universais:</p>
<ul>
  <li><strong>Categoria 1:</strong> Não há qualquer restrição clínica ao uso do método. O método pode ser usado livremente sem ressalvas;</li>
  <li><strong>Categoria 2:</strong> As vantagens do método superam amplamente quaisquer riscos teóricos ou comprovados. O método geralmente pode ser usado;</li>
  <li><strong>Categoria 3:</strong> Os riscos teóricos ou comprovados superam habitualmente as vantagens do método. O método <strong>NÃO É RECOMENDADO</strong>, a menos que outros métodos mais adequados não estejam disponíveis ou sejam expressamente recusados pela paciente. O uso exige rigorosa avaliação de especialistas e vigilância clínica estrita;</li>
  <li><strong>Categoria 4:</strong> A condição clínica representa um <strong>RISCO INACEITÁVEL À SAÚDE</strong> da usuária se o método for utilizado. <strong>CONTRAINDICAÇÃO ABSOLUTA E CATEGÓRICA</strong>.</li>
</ul>

<h3>Matriz Crítica de Elegibilidade: Métodos Combinados vs Progestagênios Isolados vs DIU</h3>
<table class="book-table">
  <thead>
    <tr>
      <th>Condição Clínica / Comorbidade Materna</th>
      <th>Contraceptivos Combinados (ACO, Adesivo, Anel, Injetável Mensal)</th>
      <th>Progestagênio Isolado (Minipílula, Implante, Depo-Provera)</th>
      <th>DIU de Cobre</th>
      <th>SIU de Levonorgestrel (Mirena / Kyleena)</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>Enxaqueca com Aura (em qualquer idade)</strong></td>
      <td><strong>Categoria 4</strong> (Risco de AVC isquêmico multiplicado por 4 a 8 vezes)</td>
      <td><strong>Categoria 2</strong> (Seguro)</td>
      <td><strong>Categoria 1</strong></td>
      <td><strong>Categoria 2</strong></td>
    </tr>
    <tr>
      <td><strong>Enxaqueca sem Aura (< 35 anos)</strong></td>
      <td><strong>Categoria 2</strong> (Pode usar)</td>
      <td><strong>Categoria 1</strong></td>
      <td><strong>Categoria 1</strong></td>
      <td><strong>Categoria 1</strong></td>
    </tr>
    <tr>
      <td><strong>Enxaqueca sem Aura (&ge; 35 anos)</strong></td>
      <td><strong>Categoria 3 / 4</strong></td>
      <td><strong>Categoria 1</strong></td>
      <td><strong>Categoria 1</strong></td>
      <td><strong>Categoria 1</strong></td>
    </tr>
    <tr>
      <td><strong>Tabagismo com idade &ge; 35 anos (&ge; 15 cigarros/dia)</strong></td>
      <td><strong>Categoria 4</strong> (Risco tromboembólico e infarto inaceitável)</td>
      <td><strong>Categoria 1</strong> (Implante/POP: Cat 1; DMPA: Cat 1)</td>
      <td><strong>Categoria 1</strong></td>
      <td><strong>Categoria 1</strong></td>
    </tr>
    <tr>
      <td><strong>Tabagismo com idade &ge; 35 anos (&lt; 15 cigarros/dia)</strong></td>
      <td><strong>Categoria 3</strong></td>
      <td><strong>Categoria 1</strong></td>
      <td><strong>Categoria 1</strong></td>
      <td><strong>Categoria 1</strong></td>
    </tr>
    <tr>
      <td><strong>Histórico Prévio de TVP/TEP (não anticoagulada)</strong></td>
      <td><strong>Categoria 4</strong></td>
      <td><strong>Categoria 2</strong></td>
      <td><strong>Categoria 1</strong></td>
      <td><strong>Categoria 2</strong></td>
    </tr>
    <tr>
      <td><strong>Trombofilias Hereditárias Conhecidas (Fator V Leiden, etc.)</strong></td>
      <td><strong>Categoria 4</strong></td>
      <td><strong>Categoria 2</strong></td>
      <td><strong>Categoria 1</strong></td>
      <td><strong>Categoria 2</strong></td>
    </tr>
    <tr>
      <td><strong>Hipertensão Arterial Sistêmica Grave (&ge; 160/100 mmHg)</strong></td>
      <td><strong>Categoria 4</strong></td>
      <td><strong>Categoria 2</strong> (DMPA: Cat 3)</td>
      <td><strong>Categoria 1</strong></td>
      <td><strong>Categoria 2</strong></td>
    </tr>
    <tr>
      <td><strong>Hipertensão Arterial Adequadamente Controlada</strong></td>
      <td><strong>Categoria 3</strong></td>
      <td><strong>Categoria 1</strong> (DMPA: Cat 2)</td>
      <td><strong>Categoria 1</strong></td>
      <td><strong>Categoria 1</strong></td>
    </tr>
    <tr>
      <td><strong>Câncer de Mama Atual</strong></td>
      <td><strong>Categoria 4</strong></td>
      <td><strong>Categoria 4</strong></td>
      <td><strong>Categoria 1</strong> (Método de Escolha)</td>
      <td><strong>Categoria 4</strong></td>
    </tr>
    <tr>
      <td><strong>Lúpus Eritematoso Sistêmico com Anticorpo Antifosfolípide Positivo</strong></td>
      <td><strong>Categoria 4</strong></td>
      <td><strong>Categoria 3</strong></td>
      <td><strong>Categoria 1</strong></td>
      <td><strong>Categoria 3</strong></td>
    </tr>
    <tr>
      <td><strong>Puerpério &lt; 21 dias (sem lactação e sem fatores de risco para TEV)</strong></td>
      <td><strong>Categoria 3</strong></td>
      <td><strong>Categoria 1</strong></td>
      <td><strong>Categoria 1</strong> (se inserido nas primeiras 48h)</td>
      <td><strong>Categoria 1</strong> (se inserido nas primeiras 48h)</td>
    </tr>
    <tr>
      <td><strong>Puerpério &lt; 6 semanas em Lactante Exclusiva</strong></td>
      <td><strong>Categoria 4</strong> (Inibe prolactina e produção de leite)</td>
      <td><strong>Categoria 1 / 2</strong> (Não afeta quantidade/qualidade)</td>
      <td><strong>Categoria 1</strong></td>
      <td><strong>Categoria 1</strong></td>
    </tr>
    <tr>
      <td><strong>Doença Inflamatória Pélvica (DIP) Ativa / Cervicite Purulenta</strong></td>
      <td><strong>Categoria 1</strong></td>
      <td><strong>Categoria 1</strong></td>
      <td><strong>Categoria 4 para inserção</strong> (Cat 2 para continuação se já inserido)</td>
      <td><strong>Categoria 4 para inserção</strong> (Cat 2 para continuação)</td>
    </tr>
  </tbody>
</table>
`
  },
  {
    id: 'larc-avancados-implante-diu-cobre-siu-lng',
    title: 'LARC em Foco: Implante de Etonogestrel vs DIU de Cobre vs SIU-Levonorgestrel (Mirena vs Kyleena)',
    body_html: `
<h3>O Papel Revolucionário dos LARC na Redução de Gestações Não Planejadas</h3>
<p>Os métodos contraceptivos reversíveis de longa duração (LARC - <em>Long-Acting Reversible Contraception</em>) representam o padrão-ouro de eficácia contraceptiva na atualidade. Sua superioridade em relação aos métodos dependentes de tomada diária (como a pílula) reside na <strong>independência absoluta da adesão comportamental diária ou coital da usuária</strong>. No uso típico no "mundo real", a taxa de falha dos métodos combinados orais atinge cerca de 7% a 9% no primeiro ano de uso (devido a esquecimentos, atrasos, diarreia e vômitos), enquanto para os LARC a taxa de gravidez situa-se invariavelmente <strong>abaixo de 0,1% a 0,5% por ano</strong>, equiparando-se ou superando os métodos de esterilização cirúrgica definitiva (laqueadura tubária e vasectomia).</p>

<h3>1. Implante Subdérmico de Etonogestrel (Implanon NXT - 68 mg)</h3>
<ul>
  <li><strong>Mecanismo Primário de Ação:</strong> Liberação contínua e constante de etonogestrel (o metabólito ativo do desogestrel). Atinge níveis séricos suficientes para <strong>suprimir o pico de LH e inibir a ovulação em mais de 99% dos ciclos</strong> ao longo de todo o período de uso, associada ao espessamento vigoroso do muco cervical (impedindo a ascensão espermática) e indução de atrofia endometrial;</li>
  <li><strong>Duração Aprovada e Eficácia:</strong> Registrado para <strong>3 anos</strong> (com estudos robustos demonstrando eficácia mantida até o 4º e 5º anos de uso contínuo em mulheres com peso normal). É o <strong>método contraceptivo isolado mais eficaz existente na medicina moderna</strong>, com Índice de Pearl de apenas 0,05 gestações por 100 mulheres-ano;</li>
  <li><strong>Padrão de Sangramento e Manejo de Efeitos Adversos:</strong> O efeito adverso mais frequente e principal causa de descontinuação prematura é o <strong>sangramento uterino irregular (escape ou spotting)</strong>. Cerca de 20% das mulheres evoluem com amenorreia desejada, 50% mantêm sangramentos esporádicos e infrequentes toleráveis, e cerca de 20% a 25% apresentam sangramentos prolongados ou frequentes. O manejo do sangramento incômodo nos primeiros meses inclui aconselhamento empático pré-inserção, uso de anti-inflamatórios não esteroidais (Mefenâmico ou Ibuprofeno por 5 a 7 dias) ou cursos curtos de estrogênio conjugado / ACO em pacientes elegíveis;</li>
  <li><strong>Ampliação Histórica no SUS (Portarias SECTICS/MS 2025/2026):</strong> Anteriormente restrito a populações específicas de alta vulnerabilidade, o implante de etonogestrel foi incorporado universalmente no SUS em 2025/2026 para adolescentes de 14 a 17 anos e ampliado para mulheres em idade reprodutiva (18 a 49 anos) em vulnerabilidade, representando um marco sanitário brasileiro.</li>
</ul>

<h3>2. DIU de Cobre (TCu380A): Fisiopatologia, Benefícios e Acompanhamento</h3>
<ul>
  <li><strong>Mecanismo de Ação Pré-Fecundação (Desmistificação do Abortamento):</strong> O DIU de cobre atua primariamente <strong>ANTES DA FERTILIZAÇÃO</strong>. A liberação contínua de íons de cobre (Cu2+) na cavidade endometrial gera uma reação inflamatória estéril local com afluxo de macrófagos e liberação de citocinas e prostaglandinas, que possuem efeito citotóxico e espermicida direto sobre os espermatozoides, imobilizando-os, alterando a reação acrossômica e impedindo a sua ascensão pela trompa até o óvulo. O DIU de cobre NÃO é método abortivo!;</li>
  <li><strong>Vantagens Únicas:</strong> Isenção total de hormônios (método de escolha absoluta em pacientes com câncer de mama ativo, história de TEV, cardiopatias isquêmicas ou comorbidades hepáticas graves), <strong>duração de até 10 a 12 anos</strong> com custo mínimo e retorno imediato da fertilidade após a remoção;</li>
  <li><strong>Efeitos Colaterais Esperados:</strong> Aumento do volume do sangramento menstrual e agravamento de cólicas menstruais (dismenorreia), que tendem a ser mais pronunciados nos primeiros 3 a 6 meses pós-inserção e podem ser manejados com AINEs ou ácido tranexâmico;</li>
  <li><strong>Procedimento de Inserção e Rastreio de Fios:</strong> Pode ser inserido em qualquer momento do ciclo desde que haja razoável certeza de ausência de gravidez (inclusive pós-parto imediato até 48 horas ou pós-aborto imediato). O corte do fio deve ser realizado a cerca de 2 a 3 cm do orifício externo do colo.</li>
</ul>

<h3>3. Sistemas Intrauterinos Liberadores de Levonorgestrel: Mirena (52 mg) vs Kyleena (19,5 mg)</h3>
<table class="book-table">
  <thead>
    <tr>
      <th>Característica Farmacotécnica e Clínica</th>
      <th>SIU-Levonorgestrel 52 mg (Mirena)</th>
      <th>SIU-Levonorgestrel 19,5 mg (Kyleena)</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>Carga Total de Hormônio</strong></td>
      <td>52 mg de Levonorgestrel</td>
      <td>19,5 mg de Levonorgestrel</td>
    </tr>
    <tr>
      <td><strong>Taxa de Liberação Inicial</strong></td>
      <td>~20 mcg/dia (decrescendo para ~10 mcg/dia ao fim de 5 a 8 anos)</td>
      <td>~17,5 mcg/dia (decrescendo para ~9 mcg/dia em 1 ano e ~7 mcg/dia em 5 anos)</td>
    </tr>
    <tr>
      <td><strong>Duração Registrada de Uso</strong></td>
      <td><strong>Até 8 anos</strong> para contracepção (FDA/ANVISA)</td>
      <td><strong>Até 5 anos</strong></td>
    </tr>
    <tr>
      <td><strong>Dimensões do Dispositivo e Inserção</strong></td>
      <td>Armação T medindo 32 x 32 mm; diâmetro do tubo aplicador de 4,4 mm.</td>
      <td>Armação T menor (28 x 30 mm); diâmetro do aplicador de <strong>3,8 mm</strong> (facilita inserção em nulíparas com colo estreito).</td>
    </tr>
    <tr>
      <td><strong>Anel de Prata Radiopaco</strong></td>
      <td>Não possui (visível ao USG pela haste e sombra acústica).</td>
      <td><strong>Possui anel de prata</strong> na junção em T (visibilidade ultrassonográfica e radiológica imediata).</td>
    </tr>
    <tr>
      <td><strong>Impacto no Sangramento Endometrial</strong></td>
      <td>Intensa atrofia e decidualização endometrial. Taxa de <strong>amenorreia de cerca de 20% em 1 ano e até 50% em 5 anos</strong>. Tratamento de escolha para SUA e adenomiose.</td>
      <td>Menor concentração tecidual relativa. Menor taxa de amenorreia (cerca de 12% a 20% em 5 anos); preserva mais ciclos eufuncionais escassos.</td>
    </tr>
    <tr>
      <td><strong>Indicações Clínicas Além da Contracepção</strong></td>
      <td>Aprovado para <strong>Sangramento Uterino Anormal (SUA) idiopático</strong>, hiperplasia endometrial sem atipias e proteção endometrial na Terapia Hormonal da Menopausa.</td>
      <td>Aprovado <strong>exclusivamente para Contracepção</strong> (excelente opção para adolescentes e mulheres com úteros menores que não desejam amenorreia obrigatória).</td>
    </tr>
  </tbody>
</table>
`
  },
  {
    id: 'anticoncepcao-emergencia-mecanismos-janelas-reinicio',
    title: 'Contracepção de Emergência: Levonorgestrel vs Acetato de Ulipristal vs DIU de Cobre',
    body_html: `
<h3>Janelas Temporais, Farmacologia e Mecanismos da Anticoncepção de Emergência</h3>
<p>A <strong>Contracepção de Emergência (CE)</strong> destina-se a prevenir uma gravidez não planejada após relação sexual desprotegida, falha do método habitual (rompimento ou escape de preservativo, esquecimento consecutivo de pílulas) ou em situações de violência sexual. O princípio fundamental da eficácia da CE medicamentosa oral reside na sua <strong>capacidade biológica de impedir ou adiar a ovulação por tempo suficiente para que os espermatozoides presentes no trato genital feminino percam sua viabilidade biológica (tempo de sobrevida espermática média de 3 a 5 dias)</strong>.</p>
<p><strong>Atenção Conceitual e Bioética de Prova:</strong> A contracepção de emergência oral atua estritamente <strong>ANTES DA OVULAÇÃO</strong>. Se a ovulação já tiver ocorrido e a fertilização do óvulo se completou, a medicação hormonal de emergência <strong>NÃO TEM NENHUM EFEITO SOBRE O PROCESSO DE NIDAÇÃO E NÃO PROVOCA ABORTAMENTO</strong> de uma gravidez já instalada!</p>

<h3>1. Levonorgestrel Oral (1,5 mg em Dose Única)</h3>
<ul>
  <li><strong>Mecanismo de Ação:</strong> Progestagênio sintético de alta afinidade que bloqueia ou retarda a liberação do <strong>pico ovulatório de LH</strong> se administrado antes do início da onda pré-ovulatória. Se o pico de LH já tiver se iniciado, o levonorgestrel perde drasticamente sua eficácia protetora;</li>
  <li><strong>Janela de Eficácia e Posologia:</strong> Deve ser tomado <strong>o mais rápido possível dentro de até 72 horas (3 dias)</strong> após o coito desprotegido. A eficácia é inversamente proporcional ao tempo de atraso (taxa de prevenção de 95% se usado nas primeiras 24h, caindo para 85% em 24-48h e 58% em 48-72h). Pode ser estendido até 120 horas (5 dias) com eficácia reduzida se outro método não estiver disponível;</li>
  <li><strong>Regime Posológico:</strong> Preferencialmente <strong>dose única de 1,5 mg VO</strong> (ou dois comprimidos de 0,75 mg tomados juntos). Esquemas fracionados de 12/12h estão obsoletos por induzirem mais esquecimentos;</li>
  <li><strong>Impacto do Peso Corporal / Obesidade:</strong> Em mulheres com sobrepeso (IMC &ge; 25-30 kg/m²) ou peso > 70-80 kg, a taxa de falha do levonorgestrel é até três vezes maior. Nestes casos, recomenda-se <strong>dobrar a dose de Levonorgestrel (3,0 mg VO)</strong> ou preferir o Acetato de Ulipristal ou o DIU de cobre;</li>
  <li><strong>Reinício Imediato da Contracepção Regular ("Quick-Start pós-CE"):</strong> Após o levonorgestrel, a paciente <strong>PODE E DEVE INICIAR OU REINICIAR SEU MÉTODO CONTRACEPTIVO REGULAR IMEDIATAMENTE (no mesmo dia)</strong>, utilizando preservativo de barreira adicional pelos primeiros 7 dias consecutivos.</li>
</ul>

<h3>2. Acetato de Ulipristal Oral (30 mg em Dose Única)</h3>
<ul>
  <li><strong>Mecanismo Farmacológico Superior:</strong> É um Modulador Seletivo dos Receptores de Progesterona (SPRM). Sua imensa superioridade biológica decorre do fato de que <strong>consegue impedir ou retardar a ruptura folicular e a ovulação MESMO QUANDO A ONDA DE LH JÁ SE INICIOU</strong> (desde que não tenha atingido o pico máximo pré-ovulatório), momento em que o levonorgestrel já é completamente ineficaz;</li>
  <li><strong>Janela de Uso:</strong> Mantém alta eficácia constante durante toda a janela de <strong>até 120 horas (5 dias)</strong> após a relação desprotegida;</li>
  <li><strong>Menor Perda de Eficácia na Obesidade:</strong> Mantém taxa de proteção significativamente superior ao levonorgestrel em mulheres com sobrepeso e IMC elevado;</li>
  <li><strong>Atenção Crítica no Reinício Contraceptivo (Pegadinha de Concurso):</strong>
    <p>Como o ulipristal é um antagonista/modulador do receptor de progesterona, a introdução imediata de um anticoncepcional hormonal contendo progestagênio pode <strong>competir pelos mesmos receptores, inativar o ulipristal e neutralizar a eficácia da contracepção de emergência</strong>. Portanto, as diretrizes da OMS e FEBRASGO determinam:</p>
    <div class="formula-box">
      <p><strong>Regra de Ouro Pós-Ulipristal:</strong></p>
      <p>Aguardar <strong>5 DIAS</strong> após o uso do acetato de ulipristal antes de iniciar ou retomar qualquer contraceptivo hormonal (pílula, injeção, anel, adesivo). Durante esses 5 dias e pelos 7 a 14 dias seguintes à introdução do hormonal, deve-se usar rigorosamente preservativo de barreira!</p>
    </div>
  </li>
</ul>

<h3>3. O DIU de Cobre como o Método de Emergência Mais Eficaz de Todos</h3>
<p>A inserção intrauterina de um <strong>DIU de Cobre (TCu380A) realizada em até 120 horas (5 dias) após a relação desprotegida</strong> é a opção de <strong>MÁXIMA EFICÁCIA ISOLADA de contracepção de emergência</strong>, apresentando taxa de falha inferior a <strong>0,1% (eficácia superior a 99,9%)</strong>.</p>
<p>Possui três vantagens estratégicas insuperáveis:</p>
<ol>
  <li>Funciona mesmo em mulheres que já ovularam nas últimas horas (a inflamação estéril tóxica do cobre impede fertilização tardia ou implantação anômala precoce);</li>
  <li><strong>Não perde absolutamente nenhuma eficácia em mulheres obesas</strong> com qualquer faixa de IMC;</li>
  <li>Uma vez inserido, <strong>permanece como contraceptivo LARC contínuo de altíssima eficácia por até 10 a 12 anos</strong>, resolvendo definitivamente a demanda de planejamento reprodutivo da paciente.</li>
</ol>
`
  },
  {
    id: 'casos-clinicos-questoes-aprofundo-contracepcao',
    title: 'Casos Clínicos Integradores e Questões de Concursos Comentadas — Contracepção 2026',
    body_html: `
<h3>Caso Clínico Integrador 1: Paciente Jovem com Cefaleia e Demanda Contraceptiva</h3>
<p><strong>Identificação:</strong> Mulher de 26 anos, nulípara, estudante universitária, procura a UBS desejando iniciar contraceptivo hormonal oral para evitar gestação e melhorar acne facial. Nega comorbidades prévias, não fuma, PA aferida de 118x74 mmHg, IMC de 22 kg/m².</p>
<p><strong>História Dirigida Cuidadosa:</strong> Ao ser questionada ativamente sobre cefaleia, relata que apresenta episódios recorrentes de dor de cabeça unilateral pulsátil cerca de 1 a 2 vezes por mês. Relata que, cerca de 20 a 30 minutos antes do início da dor, visualiza rotineiramente "pontos luminosos em ziguezague piscando no campo visual" e refere sensação transitória de formigamento na mão e lábio esquerdos que dura cerca de 15 minutos e desaparece completamente antes da cefaleia instalar-se.</p>
<p><strong>Raciocínio Clínico e Conduta:</strong></p>
<ol>
  <li><strong>Diagnóstico Neurológico:</strong> O quadro clínico descreve perfeitamente uma <strong>Enxaqueca com Aura Típica (escotomas visuais cintilantes e parestesias sensoriais transitórias unilaterais)</strong>;</li>
  <li><strong>Classificação MEC OMS / FEBRASGO:</strong> O uso de qualquer método contraceptivo contendo <strong>Estrogênio</strong> (ACO combinado, anel vaginal, adesivo transdérmico ou injetável mensal) é <strong>CATEGORIA 4 DA OMS (Risco Inaceitável à Saúde)</strong>, independentemente da idade ou do número de cigarros fumados! O estrogênio promove hipercoagulabilidade e reatividade vascular endotelial, que associado à vasoespasmo da aura enxaquecosa eleva em mais de 4 a 8 vezes o risco de <strong>Acidente Vascular Cerebral (AVC) Isquêmico</strong>;</li>
  <li><strong>Conduta e Prescrição Correta:</strong> Contraindicação formal e absoluta a combinados com estrogênio. Prescrição segura de métodos <strong>Livres de Estrogênio (Categoria 1 ou 2 da OMS)</strong>: Implante subdérmico de etonogestrel, DIU de cobre, SIU de levonorgestrel (Mirena/Kyleena) ou minipílula de desogestrel 75 mcg VO. A paciente optou pela inserção de SIU de levonorgestrel com excelente tolerabilidade.</li>
</ol>

<h3>Questão Comentada 1 (ENAMED / Revalidação — Inédita Autoral)</h3>
<p>Mulher de 32 anos, casada, sem filhos, procurou a Unidade Básica de Saúde após relação sexual desprotegida ocorrida há cerca de 36 horas devido ao rompimento do preservativo masculino. Refere ciclos menstruais regulares de 28 dias e calcula estar no 13º dia do ciclo (período fértil provável). A paciente apresenta peso corporal de 92 kg e Índice de Massa Corporal (IMC) de 34 kg/m² (Obesidade Grau I). Nega comorbidades ou uso de medicamentos contínuos. Deseja utilizar método de emergência e manifesta grande interesse em adotar a partir de agora um método altamente eficaz e de longa duração. Considerando as diretrizes da OMS e da FEBRASGO para contracepção de emergência e LARC, assinale a conduta que apresenta, simultaneamente, a máxima eficácia imediata e a melhor taxa de prevenção contínua:</p>
<p><strong>A)</strong> Prescrever Levonorgestrel 1,5 mg em dose única oral e agendar retorno ambulatorial em 30 dias para orientação contraceptiva.</p>
<p><strong>B)</strong> Indicar a inserção intrauterina imediata de um DIU de Cobre (TCu380A), que atua como contracepção de emergência com eficácia superior a 99,9% em até 120 horas e permanece como método LARC contínuo por até 10 a 12 anos sem perda de eficácia pela obesidade.</p>
<p><strong>C)</strong> Administrar Levonorgestrel 0,75 mg oral fracionado em 4 doses de 6/6h para compensar o elevado peso corporal da paciente e orientar abstinência sexual por 21 dias.</p>
<p><strong>D)</strong> Prescrever anticoncepcional oral combinado contendo 50 mcg de etinilestradiol em dose duplicada (Método de Yuzpe), pois os métodos progestagênicos são contraindicados em obesas.</p>
<p><strong>E)</strong> Contraindicar qualquer contracepção de emergência pelo fato de a relação ter ocorrido há mais de 24 horas e a paciente estar no 13º dia do ciclo menstrual.</p>

<p><strong>Comentário Detalhado:</strong></p>
<p><strong>Gabarito: B.</strong></p>
<p><em>Análise das Alternativas:</em></p>
<ul>
  <li><strong>Por que a alternativa B está CORRETA?</strong> O <strong>DIU de Cobre</strong> inserido em até 120 horas (5 dias) após o coito desprotegido é a forma isolada <strong>mais eficaz de contracepção de emergência existente (taxa de falha &lt; 0,1%)</strong>. Apresenta o imenso diferencial de <strong>não sofrer qualquer interferência ou perda de eficácia associada à obesidade ou peso elevado</strong> (ao contrário do levonorgestrel oral, que perde eficácia em mulheres com IMC > 25-30 kg/m²), conferindo imediatamente proteção contraceptiva de longa duração (LARC) por até 10 a 12 anos;</li>
  <li><strong>Por que as alternativas A, C, D e E estão INCORRETAS?</strong> O levonorgestrel 1,5 mg isolado tem taxa de falha aumentada na obesidade; fracionamento em 4 doses é inventado e obsoleto; o método de Yuzpe tem baixa eficácia e muitos efeitos colaterais; e a janela de emergência estende-se com segurança por 72 a 120 horas.</li>
</ul>

<h3>Questão Comentada 2 (UNICAMP / Residência Médica)</h3>
<p>Em relação às alterações trazidas pela <strong>Lei Federal nº 14.443/2022</strong> (que alterou a Lei do Planejamento Familiar nº 9.263/1996 no Brasil), analise os itens a seguir:</p>
<p>I. A idade mínima legal para a realização de esterilização cirúrgica voluntária (laqueadura tubária ou vasectomia) no Brasil foi reduzida de 25 para 21 anos de idade em pessoas com capacidade civil plena.</p>
<p>II. A exigência legal de consentimento ou autorização expressa do cônjuge ou companheiro para a realização de laqueadura ou vasectomia foi formalmente revogada e extinta.</p>
<p>III. É permitida a esterilização cirúrgica durante o período de parto ou cesariana, desde que observado o prazo mínimo de 60 dias entre a manifestação da vontade por escrito e o parto, além de condições médicas favoráveis.</p>
<p>IV. Mulheres que já possuem pelo menos 2 filhos vivos continuam precisando atingir a idade de 21 anos completos para realizar a esterilização voluntária.</p>
<p>Assinale a alternativa correta:</p>
<p><strong>A)</strong> Apenas os itens I, II e III estão corretos.</p>
<p><strong>B)</strong> Apenas os itens I e II estão corretos.</p>
<p><strong>C)</strong> Apenas os itens II e IV estão corretos.</p>
<p><strong>D)</strong> Apenas os itens I e III estão corretos.</p>
<p><strong>E)</strong> Todos os itens I, II, III e IV estão corretos.</p>

<p><strong>Comentário Detalhado:</strong></p>
<p><strong>Gabarito: A.</strong></p>
<p><em>Análise das Afirmativas:</em></p>
<ul>
  <li><strong>Item I: CORRETO.</strong> A idade mínima foi reduzida de 25 para <strong>21 anos</strong> para homens e mulheres com capacidade civil plena;</li>
  <li><strong>Item II: CORRETO.</strong> Foi expressamente revogado o dispositivo que exigia consentimento do cônjuge para a esterilização cirúrgica; a decisão agora é individual e exclusiva da pessoa;</li>
  <li><strong>Item III: CORRETO.</strong> A lei autorizou expressamente a laqueadura durante o parto (cesariana ou normal), desde que cumprido o prazo mínimo de <strong>60 dias</strong> entre a manifestação formal da vontade e o procedimento cirúrgico;</li>
  <li><strong>Item IV: INCORRETO.</strong> O critério da lei é alternativo: <strong>21 anos de idade OU pelo menos 2 filhos vivos</strong>. Uma pessoa de 19 ou 20 anos que já tenha 2 filhos vivos tem o direito legal de realizar a esterilização voluntária sem esperar os 21 anos.</li>
</ul>
`
  }
];
