import { saveBook } from './bloco-04-utils.mjs';

const book = {
  slug: 'insuficiencia-adrenal-e-sindrome-de-cushing',
  title: 'Insuficiência Adrenal e Síndrome de Cushing',
  area: 'Clínica Médica',
  materia: 'Endocrinologia e Emergências Clínicas',
  description: 'Tratado completo e aprofundado sobre Doenças do Córtex Adrenal para concursos médicos e residência médica. Abrange a fisiologia anatômica e hormonal das zonas adrenal glomerular, fasciculada e reticular; diagnóstico diferencial entre Insuficiência Adrenal Primária (Doença de Addison, adrenalite autoimune, paracoccidioidomicose e tuberculose com hiperpigmentação cutaneomucosa e hipercalemia) versus Secundária/Terciária (suspensão de corticoterapia crônica sem hiperpigmentação e com mineralocorticoides preservados); protocolo de resgate emergencial do Choque Adrenal com Hidrocortisona intravenosa em altas doses; investigação diagnóstica de rastreamento do Hipercortisolismo Endógeno (Síndrome de Cushing) com os 3 testes de primeira linha; diferenciação de segunda linha dependente vs independente de ACTH; cateterismo de seios petrosos inferiores (BIPSS); cirurgia transesfenoidal e adrenalectomia, enriquecido por 4 casos clínicos complexos e questões de residência comentadas.',
  sections: [
    {
      id: 'anatomia-fisiologia-zonas-adrenal',
      title: '1. Anatomia Funcional e Fisiologia das Três Zonas do Córtex Adrenal',
      body_html: `
<h3>Embriologia, Anatomia e Vascularização das Glândulas Adrenais</h3>
<p>As glândulas adrenais (ou suprarrenais) são órgãos retroperitoneais pares localizados nos polos anterossuperiores de ambos os rins, pesando individualmente entre 4 e 5 gramas no adulto saudável. Anatomicamente e funcionalmente, cada glândula é composta por duas estruturas endócrinas embriologicamente distintas: a <strong>Medula Adrenal interna</strong> (derivada da crista neural ectodérmica, responsável pela síntese de catecolaminas - adrenalina e noradrenalina) e o <strong>Córtex Adrenal externo</strong> (derivado do mesoderma celômico, correspondendo a 80% a 90% do volume glandular total, responsável pela esteroidogênese hormonal a partir do colesterol).</p>

<h3>Zoneamento Histológico e Especialização Enzimática do Córtex</h3>
<p>O córtex adrenal é dividido microscopicamente de fora para dentro em três zonas concêntricas especializadas, cuja regulação fisiológica e produtos hormonais são estritamente compartimentalizados:</p>
<table class="book-table">
  <thead>
    <tr>
      <th>Zona do Córtex Adrenal</th>
      <th>Camada Histológica e Volume</th>
      <th>Principal Hormônio Produzido</th>
      <th>Eixo de Regulação Fisiológica Primário</th>
      <th>Enzima Chave Exclusiva</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>Zona Glomerulosa (Externa)</strong></td>
      <td>Camada subcapsular fina (cerca de 15% do córtex). Células arredondadas agrupadas em cordões enovelados (glomérulos).</td>
      <td><strong>Mineralocorticoides (Aldosterona)</strong></td>
      <td><strong>Sistema Renina-Angiotensina-Aldosterona (SRAA)</strong> e concentração sérica de Potássio (K+). <em>Independente do ACTH para secreção basal crônica</em>.</td>
      <td><strong>Aldosterona Sintase (CYP11B2)</strong>, ausente nas outras duas camadas.</td>
    </tr>
    <tr>
      <td><strong>Zona Fasciculata (Média)</strong></td>
      <td>Camada intermediária mais espessa (cerca de 75% do córtex). Cordões celulares retos paralelos ricos em gotículas lipídicas (espongiócitos).</td>
      <td><strong>Glicocorticoides (Cortisol)</strong></td>
      <td><strong>Eixo Hipotálamo-Hipófise-Adrenal (CRH hipotalâmico &rarr; ACTH adeno-hipofisário)</strong>. Ritmo circadiano pulsátil e resposta ao estresse.</td>
      <td><strong>11-beta-hidroxilase (CYP11B1)</strong> e 17-alfa-hidroxilase (CYP17A1).</td>
    </tr>
    <tr>
      <td><strong>Zona Reticular (Interna)</strong></td>
      <td>Camada mais profunda justamedular (cerca de 10% do córtex). Células dispostas em rede anastomosada com lipofuscina.</td>
      <td><strong>Androgênios Adrenais (DHEA e DHEA-S)</strong> e androstenediona</td>
      <td><strong>Regulada pelo ACTH</strong> e fatores de crescimento hipofisários.</td>
      <td><strong>Sulfotransferase (SULT2A1)</strong> e 17,20-liase (atividade da CYP17A1).</td>
    </tr>
  </tbody>
</table>

<h3>Ações Fisiológicas do Cortisol e da Aldosterona</h3>
<p>O <strong>Cortisol</strong> é o principal glicocorticoide endógeno humano, exibindo secreção circadiana com pico matinal (entre 6h e 8h da manhã) e nadir noturno por volta da meia-noite. Suas ações vitais compreendem: (1) <em>Metabolismo:</em> estimulação da gliconeogênese hepática, proteólise muscular e lipólise para fornecer substratos energéticos ao encéfalo; (2) <em>Vascular:</em> manutenção do tônus vascular arterial através de ação permissiva sobre as catecolaminas (aumenta a expressão de receptores alfa-1 adrenérgicos no endotélio e miocárdio, prevenindo vasodilatação e choque); e (3) <em>Imunológica:</em> inibição da fosfolipase A2 (via lipocortina-1), supressão de citocinas pró-inflamatórias (IL-1, IL-6, TNF-alfa) e redução da migração de leucócitos.</p>
<p>A <strong>Aldosterona</strong> atua nos túbulos contorcidos distais e ductos coletores renais ligando-se ao receptor mineralocorticoide (MR). Estimula a expressão da bomba Na+/K+-ATPase basolateral e a abertura dos canais epiteliais de sódio (ENaC) luminais e canais de potássio (ROMK), promovendo <strong>reabsorção ativa de Sódio (Na+) e água para o sangue em troca da secreção e eliminação urinária de Potássio (K+) e íons Hidrogênio (H+)</strong>, mantendo a volemia e o equilíbrio ácido-básico.</p>
`
    },
    {
      id: 'insuficiencia-adrenal-etiologia-primaria-vs-secundaria',
      title: '2. Insuficiência Adrenal: Diferenciação Etiológica Primária versus Secundária/Terciária',
      body_html: `
<h3>Conceito e Classificação Etiológica</h3>
<p>A Insuficiência Adrenal (IA) é a síndrome clínica resultante da produção deficiente ou ausente de hormônios glicocorticoides pelo córtex adrenal, podendo cursar ou não com deficiência concomitante de mineralocorticoides e androgênios. A distinção anatômica e fisiopatológica divide a condição em três níveis de falência:</p>
<ul>
  <li><strong>Insuficiência Adrenal Primária (Doença de Addison):</strong> Decorre da destruição anatômica ou disfunção intrínseca de <strong>ambas as glândulas adrenais</strong>. Os níveis de cortisol caem e, por ausência de feedback negativo, a adeno-hipófise secreta quantidades torrenciais compensatórias de <strong>ACTH</strong>. Atinge todas as zonas corticais, acarretando <strong>deficiência conjunta de Cortisol E de Aldosterona</strong>.</li>
  <li><strong>Insuficiência Adrenal Secundária:</strong> Decorre de lesão ou disfunção na <strong>adeno-hipófise</strong>, com incapacidade de produzir ACTH (tumores hipofisários, apoplexia hipofisária, síndrome de Sheehan pós-parto, cirurgia ou radioterapia selar).</li>
  <li><strong>Insuficiência Adrenal Terciária:</strong> Decorre de disfunção hipotalâmica com supressão da secreção de CRH. <strong>É A CAUSA MAIS FREQUENTE DISPARADA DE TODAS AS INSUFICIÊNCIAS ADRENAIS NA PRÁTICA CLÍNICA: a suspensão abrupta ou desmame rápido de corticoterapia exógena sistêmica prolongada</strong> (doses &ge; 5 a 7,5 mg/dia de prednisona ou equivalente por mais de 3 a 4 semanas induzem atrofia por desuso de todo o eixo CRH-ACTH-adrenal).</li>
</ul>

<h3>Doença de Addison no Mundo e no Brasil: Etiologias Específicas</h3>
<p>Para o diagnóstico da Insuficiência Adrenal Primária, mais de 90% do parênquima cortical deve ser destruído:</p>
<ol>
  <li><strong>Adrenalite Autoimune:</strong> Responde por <strong>70% a 80% dos casos no mundo desenvolvido</strong> e em grandes centros urbanos. Caracterizada por infiltração linfocitária crônica e presença de autoanticorpos circulantes contra a enzima esteroidogênica <strong>Anti-21-Hidroxilase (anti-21-OH)</strong> em até 85% dos pacientes. Pode ocorrer isolada ou integrada às <em>Síndromes Poliglandulares Autoimunes</em> (SPA Tipo 1: hipoparatireoidismo + candidíase mucocutânea crônica + Addison; SPA Tipo 2 ou Síndrome de Schmidt: Addison + tireoidite de Hashimoto/Graves + DM1).</li>
  <li><strong>Causas Infecciosas (Grande Destaque Epidemiológico Brasileiro):</strong>
    <ul>
      <li><em>Tuberculose Adrenal:</em> Infiltração caseosa granulomatosa bilateral por <em>Mycobacterium tuberculosis</em>. Na fase ativa, as adrenais estão aumentadas com áreas necróticas; na fase crônica, tornam-se atróficas e exibem <strong>calcificações grosseiras visíveis na radiografia e TC de abdome</strong>.</li>
      <li><em>Paracoccidioidomicose (Blastomicose Sul-Americana):</em> Causada pelo fungo termodimórfico <em>Paracoccidioides brasiliensis</em>. O Brasil é a área endêmica mais importante do globo. O fungo tem tropismo extraordinário pelo córtex adrenal, acometendo a glândula em até 30% a 50% das necropsias de formas crônicas disseminadas, configurando <strong>uma das causas infecciosas mais frequentes de Addison no meio rural brasileiro</strong>.</li>
      <li><em>Infecções em Imunodeprimidos / HIV-AIDS:</em> Infecção por Citomegalovírus (necrose adrenal por CMV), Micobactérias atípicas (MAC), Histoplasmose disseminada e Criptococose.</li>
    </ul>
  </li>
  <li><strong>Hemorragia Adrenal Bilateral Aguda:</strong> Ocorre na <em>Síndrome de Waterhouse-Friderichsen</em> (sepse meningocócica fulminante por <em>Neisseria meningitidis</em> com púrpura fulminante e necrose hemorrágica adrenal bilateral) e em coagulopatias associadas à Síndrome do Anticorpo Antifosfolípide (SAAF) sob uso de heparina.</li>
</ol>

<h3>Quadro Comparativo Clínico e Laboratorial: Primária versus Secundária/Terciária</h3>
<p>Esta distinção é a mais explorada em provas de residência médica em todo o país:</p>
<table class="book-table">
  <thead>
    <tr>
      <th>Característica Clínica / Laboratorial</th>
      <th>Insuficiência Adrenal Primária (Doença de Addison)</th>
      <th>Insuficiência Adrenal Secundária e Terciária</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>Pigmentação Cutaneomucosa</strong></td>
      <td><strong>HIPERPIGMENTAÇÃO CUTANEOMUCOSA PATOGNOMÔNICA.</strong> Escurecimento acastanhado/bronzeado característico em áreas expostas ao sol, dobras de flexão palmares, cicatrizes cirúrgicas recentes, leito ungueal, mamilos, mucosa jugal interna e gengivas.</td>
      <td><strong>PELE PÁLIDA ("cor de cera" ou alabastro).</strong> Ausência total de hiperpigmentação.</td>
    </tr>
    <tr>
      <td><strong>Mecanismo da Pigmentação</strong></td>
      <td>A deficiência de cortisol estimula a transcrição maciça do gene da <strong>Pró-opiomelanocortina (POMC)</strong> na hipófise. A quebra proteolítica da POMC gera tanto o <strong>ACTH quanto o Hormônio Estimulador de Alfa-Melanócitos (&alpha;-MSH)</strong>, que ativam receptores MC1R nos melanócitos epidérmicos estimulando a síntese de melanina.</td>
      <td>Como a hipófise está destruída ou suprimida por corticoides exógenos, os níveis de ACTH e &alpha;-MSH encontram-se <strong>indetectáveis ou inapropriadamente baixos</strong>; os melanócitos não são estimulados.</td>
    </tr>
    <tr>
      <td><strong>Secreção de Mineralocorticoides (Aldosterona)</strong></td>
      <td><strong>DEFICIENTE.</strong> A zona glomerulosa é destruída conjuntamente. Há perda salina renal grave e desidratação hipovolêmica marcante.</td>
      <td><strong>PRESERVADA.</strong> A zona glomerulosa continua funcionando perfeitamente estimulada pelo Sistema Renina-Angiotensina (Angiotensina II) e K+, que independem do ACTH hipofisário.</td>
    </tr>
    <tr>
      <td><strong>Eletrólitos Séricos (Potássio)</strong></td>
      <td><strong>HIPERCALEMIA (K+ &gt; 5,0 a 6,5 mEq/L)</strong> associada a Acidose Metabólica com ânion-gap normal (retenção de H+ e K+ pela falta de aldosterona).</td>
      <td><strong>POTÁSSIO SÉRICO NORMAL.</strong> Não há retenção de potássio porque a secreção de aldosterona mediada pelo SRAA permanece intacta.</td>
    </tr>
    <tr>
      <td><strong>Sódio Sérico (Na+)</strong></td>
      <td><strong>HIPONATREMIA HIPOVOLÊMICA GRAVE</strong> (por perda urinária de sal decorrente de hipoaldosteronismo e desidratação).</td>
      <td><strong>HIPONATREMIA EUVOLÊMICA DILUCIONAL</strong> (o déficit isolado de cortisol estimula secreção não osmótica de ADH, retendo água livre).</td>
    </tr>
    <tr>
      <td><strong>Dose de ACTH Plasmático às 8h</strong></td>
      <td><strong>MUITO ELEVADO (frequentemente &gt; 100 a 2.000 pg/mL)</strong> por ausência de feedback negativo.</td>
      <td><strong>BAIXO OU INAPROPRIADAMENTE NORMAL (&lt; 10 a 15 pg/mL)</strong>.</td>
    </tr>
    <tr>
      <td><strong>Necessidade de Fludrocortisona</strong></td>
      <td><strong>OBRIGATÓRIA PARA A VIDA TODA</strong> (reposição de mineralocorticoide oral).</td>
      <td><strong>NÃO NECESSÁRIA</strong> (nunca prescrever mineralocorticoide na forma secundária).</td>
    </tr>
  </tbody>
</table>
`
    },
    {
      id: 'investigacao-laboratorial-teste-cortrosina',
      title: '3. Investigação Diagnóstica Laboratorial: Cortisol Basal e Teste de Estímulo Rápido com ACTH',
      body_html: `
<h3>Algoritmo Diagnóstico Estruturado da Insuficiência Adrenal</h3>
<p>O diagnóstico laboratorial da insuficiência adrenal exige confirmação objetiva da incapacidade de secretar cortisol em níveis fisiológicos, seguida da identificação do sítio anatômico primário ou secundário e da etiologia subjacente:</p>

<h4>Etapa 1: Dosagem do Cortisol Basal Matinal (às 8 horas da manhã)</h4>
<p>A dosagem é realizada no momento do pico fisiológico circadiano matinal do cortisol (entre 7h e 9h da manhã):</p>
<ul>
  <li><strong>Cortisol Basal &lt; 3 a 5 mcg/dL:</strong> <strong>CONFIRMA O DIAGNÓSTICO DE INSUFICIÊNCIA ADRENAL</strong> de forma definitiva, dispensando testes confirmatórios de estímulo. A reserva adrenal está esgotada.</li>
  <li><strong>Cortisol Basal &gt; 18 a 20 mcg/dL:</strong> <strong>EXCLUI O DIAGNÓSTICO DE INSUFICIÊNCIA ADRENAL</strong> com alta sensibilidade em indivíduos clinicamente estáveis.</li>
  <li><strong>Cortisol Basal Indeterminado (entre 5 e 18 mcg/dL):</strong> Representa uma zona cinzenta diagnóstica inconclusiva na qual o paciente pode exibir níveis normais em repouso, mas falhar em situações de estresse. Exige obrigatoriamente a realização de um <strong>Teste Dinâmico de Estímulo</strong>.</li>
</ul>

<h4>Etapa 2: Teste de Estímulo Rápido com Cortrosina (ACTH Sintético 250 mcg)</h4>
<p>É o teste provocativo padrão-ouro internacional mais utilizado para avaliar a reserva funcional adrenocortical:</p>
<ol>
  <li>Colhe-se uma amostra basal de sangue às 8h para dosagem de cortisol e ACTH.</li>
  <li>Administra-se uma ampola de <strong>250 mcg de Tetracosactida / Cortrosina (ACTH sintético 1-24)</strong> por via intravenosa ou intramuscular em bólus.</li>
  <li>Colhem-se novas amostras de cortisol plasmático exatamente aos <strong>30 minutos e 60 minutos</strong> após a injeção.</li>
  <li><strong>Interpretação e Ponto de Corte Diagnóstico:</strong>
    <ul>
      <li><em>Resposta Fisiológica Normal:</em> O pico de cortisol aos 30 ou 60 minutos deve ser <strong>&ge; 18 mcg/dL</strong> (ou &ge; 500 nmol/L).</li>
      <li><em>Insuficiência Adrenal Confirmada:</em> <strong>Pico de cortisol pós-estímulo &lt; 18 mcg/dL</strong> comprova falência secretora do córtex adrenal.</li>
    </ul>
  </li>
</ol>

<h4>Etapa 3: Diferenciação entre Primária e Secundária/Terciária</h4>
<p>Uma vez comprovada a insuficiência adrenal (cortisol não responsivo &lt; 18 mcg/dL), analisa-se a dosagem concomitante do <strong>ACTH plasmático matinal basal</strong> colhido antes da cortrosina:</p>
<ul>
  <li><strong>ACTH Muito Elevado (&gt; 100 pg/mL, frequentemente &gt; 200 a 1.000 pg/mL):</strong> Confirma <strong>Insuficiência Adrenal Primária</strong>. A conduta subsequente é a pesquisa de <strong>Anticorpo Anti-21-Hidroxilase</strong> (se positivo: adrenalite autoimune isolada ou SPA) e <strong>Tomografia Computadorizada de Adrenais</strong> (se adrenais aumentadas ou com calcificações: pesquisar tuberculose, paracoccidioidomicose, histoplasmose, hemorragia ou metástases).</li>
  <li><strong>ACTH Baixo ou Inapropriadamente Normal (&lt; 10 a 20 pg/mL):</strong> Confirma <strong>Insuficiência Adrenal Secundária ou Terciária</strong>. Avaliar histórico de corticoterapia exógena prévia (causa disparada número 1); se negativo, solicitar <strong>Ressonância Magnética da Região Selar / Hipófise</strong> com contraste e avaliar os demais eixos hipofisários (TSH, gonadotrofinas, prolactina e GH).</li>
</ul>
`
    },
    {
      id: 'crise-adrenal-aguda-choque-manejo-imediato',
      title: '4. Crise Adrenal Aguda (Choque Adrenal): Fisiopatologia e Manejo Imediato em UTI',
      body_html: `
<h3>Fisiopatologia do Choque Adrenal Agudo</h3>
<p>A Crise Adrenal Aguda (ou Crise Addisoniana) é a emergência médica máxima da insuficiência adrenal, associada a altíssima taxa de letalidade se não reconhecida e tratada em minutos. Ocorre quando a demanda tecidual de glicocorticoides e mineralocorticoides supera a capacidade de síntese glandular exausta, habitualmente deflagrada por um evento de estresse agudo grave: <strong>infecções bacterianas graves (pneumonia, sepse, pielonefrite), intervenções cirúrgicas de qualquer porte, grande trauma físico, desidratação severa por gastroenterite aguda ou suspensão abrupta da reposição crônica de corticoides</strong>.</p>
<p>O substrato fisiopatológico do choque decorre de dois mecanismos sinérgicos devastadores:</p>
<ol>
  <li><strong>Perda da Ação Permissiva Vascular das Catecolaminas:</strong> Na ausência absoluta de cortisol, os receptores alfa-1 adrenérgicos do músculo liso vascular sofrem rápida dessensibilização e internalização. Ocorre vasodilatação arteriolar periférica maciça e perda do tônus vasomotor, gerando <strong>Choque Distributivo Refratário a Grandes Volumes de Cristaloides e a Altas Doses de Drogas Vasoativas (Noradrenalina)</strong>.</li>
  <li><strong>Hipovolemia Extrema e Desidratação por Hipoaldosteronismo (na forma primária):</strong> A ausência de aldosterona perpetua a natriurese espoliativa com colapso do volume circulante efetivo e choque hipovolêmico somado ao distributivo.</li>
</ol>

<h3>Manifestações Clínicas e Eletrolíticas de Alarme</h3>
<ul>
  <li><strong>Colapso Circulatório e Hipotensão Postural Grave / Choque:</strong> Pressão arterial inaudível ou PAM &lt; 50 mmHg não responsiva a bólus de fluidos.</li>
  <li><strong>Sintomas Gastrointestinais Proeminentes (Abdome Agudo Metabólico):</strong> Vômitos incoercíveis, dor abdominal lancinante difusa simulando peritonite aguda cirúrgica e diarreia profusa.</li>
  <li><strong>Tríade Metabólica Clássica da Crise Primária:</strong> <strong>Hiponatremia + Hipercalemia + Hipoglicemia grave</strong> (a ausência de cortisol impede a gliconeogênese hepática em jejum e a falta de aldosterona retém potássio e perde sódio).</li>
  <li>Febre alta inexplicada (por liberação descontrolada de citocinas inflamatórias sem o freio anti-inflamatório do cortisol) ou hipotermia profunda se choque terminal.</li>
</ul>

<h3>Protocolo de Emergência: A Regra de Ouro da Conduta Imediata</h3>
<p><strong>ATENÇÃO EXTREMA: NUNCA ATRASAR A ADMINISTRAÇÃO DE CORTICOIDE PARA AGUARDAR RESULTADOS DE EXAMES LABORATORIAIS!</strong> Diante da suspeita clínica de choque adrenal, colher amostras rápidas de sangue para dosagem de cortisol, ACTH e eletrólitos e iniciar imediatamente o tratamento na sala vermelha:</p>
<table class="book-table">
  <thead>
    <tr>
      <th>Linha Terapêutica</th>
      <th>Droga / Solução e Posologia Exata</th>
      <th>Ação Fisiopatológica e Justificativa Clínica</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>1. Corticoterapia Intravenosa de Ataque (Padrão-Ouro)</strong></td>
      <td><strong>Hidrocortisona (Succinato Sódico de Hidrocortisona): 100 mg IV em bólus IMEDIATO</strong>, seguida por <strong>50 mg IV a cada 6 horas</strong> (ou 100 mg IV a cada 8h, ou infusão contínua de 200 mg em 24h).</td>
      <td>A Hidrocortisona é quimicamente idêntica ao cortisol bioidêntico. Em doses &ge; 100 a 200 mg/dia, ela satura os receptores glicocorticoides e <strong>exerce efeito mineralocorticoide cruzado pleno no receptor MR</strong>, dispensando completamente o uso de fludrocortisona na fase aguda. Restaura os receptores alfa-adrenérgicos, revertendo o choque em 2 a 4 horas.</td>
    </tr>
    <tr>
      <td><strong>2. Alternativa Seletiva para Permitir Teste com ACTH</strong></td>
      <td><strong>Dexametasona: 4 mg IV em bólus imediato</strong> (se a equipe desejar realizar o teste da cortrosina na urgência).</td>
      <td>A Dexametasona <strong>NÃO é detectada pelo ensaio laboratorial do cortisol plasmático</strong>, permitindo colher o teste de estímulo sem falso aumento do cortisol dosado. Contudo, <em>não possui efeito mineralocorticoide</em>; deve ser trocada por hidrocortisona assim que possível.</td>
    </tr>
    <tr>
      <td><strong>3. Ressuscitação Volêmica e Correção Glicêmica</strong></td>
      <td><strong>Soro Fisiológico a 0,9% (SF 0,9%) 1.000 mL na 1ª hora</strong>, associado a <strong>Soro Glicosado a 5% ou 10% (SG 5%)</strong>. Infundir 2 a 3 litros de fluidos nas primeiras 4 a 6 horas.</td>
      <td>O SF 0,9% restaura o volume intravascular e corrige a hiponatremia por perda salina; o SG 5% trata e previne a hipoglicemia convulsiva provocada pelo déficit de cortisol.</td>
    </tr>
    <tr>
      <td><strong>4. Manejo Eletrolítico</strong></td>
      <td><strong>NÃO INFUNDIR POTÁSSIO!</strong> O paciente com Addison já apresenta hipercalemia.</td>
      <td>A hidratação venosa vigorosa e a hidrocortisona promovem natriurese, restauração do fluxo tubular renal e excreção rápida de potássio, normalizando o K+ sérico em poucas horas.</td>
    </tr>
  </tbody>
</table>
`
    },
    {
      id: 'reposicao-cronica-insuficiencia-adrenal',
      title: '5. Tratamento de Manutenção Crônica e Educação para Situações de Estresse',
      body_html: `
<h3>Esquemas de Reposição Hormonal Crônica no Paciente Estável</h3>
<p>O tratamento crônico da Insuficiência Adrenal visa mimetizar a produção fisiológica diária de esteroides do córtex saudável (cerca de 5 a 10 mg/m²/dia de cortisol, equivalente a 15 a 25 mg/dia de hidrocortisona oral), restaurando o vigor físico e prevenindo descompensações sem induzir estigmas iatrogênicos de Síndrome de Cushing:</p>

<h4>1. Reposição Glicocorticoide</h4>
<ul>
  <li><strong>Opção Preferencial Fisiológica:</strong> <strong>Hidrocortisona oral</strong> na dose total de <strong>15 a 25 mg/dia</strong> dividida em 2 a 3 tomadas diárias para mimetizar o ritmo circadiano (ex: 10 mg às 7h da manhã ao acordar, 5 mg às 12h no almoço e 2,5 a 5 mg às 16h-17h; nunca tomar à noite para evitar insônia).</li>
  <li><strong>Opção Prática de Longa Ação (Ampla Disponibilidade no Brasil):</strong> <strong>Prednisona oral na dose de 3,0 a 5,0 mg/dia em tomada única matinal às 7h-8h</strong> (ou acetato de cortisona 20 a 35 mg/dia). Apresenta meia-vida biológica mais longa (18 a 36 horas) e excelente custo-benefício.</li>
</ul>

<h4>2. Reposição Mineralocorticoide (Exclusiva da Insuficiência Adrenal Primária)</h4>
<p>Na Doença de Addison, como a zona glomerulosa foi destruída, a reposição mineralocorticoide com <strong>Fludrocortisona (Florinefe)</strong> é mandatória para o resto da vida:</p>
<ul>
  <li><strong>Dose Habitual:</strong> <strong>0,05 a 0,1 mg/dia (50 a 100 mcg) via oral em tomada única pela manhã</strong>.</li>
  <li><strong>Parâmetros de Ajuste Clínico:</strong> O controle não é avaliado pelo ACTH nem pelo cortisol, mas sim pela <strong>aferição da pressão arterial postural (ausência de hipotensão ortostática), dosagem de Sódio e Potássio séricos normais e Atividade de Renina Plasmática (PRA)</strong> mantida na metade superior da faixa de referência normal. Não restringir sódio na dieta (permitir consumo liberal de sal).</li>
</ul>

<h3>A Regra das Doses de Estresse (Sick-Day Rules) — Educação Vital do Paciente</h3>
<p>Todo paciente com insuficiência adrenal deve carregar consigo um <strong>cartão de identificação médica ou pulseira de alerta de "Insuficiência Adrenal / Corticodependente"</strong> e possuir em seu domicílio uma ampola de Hidrocortisona injetável (100 mg) para uso intramuscular de emergência. As regras de adaptação posológica diante de estresse agudo são vitais para prevenir crises adrenais fatais:</p>
<table class="book-table">
  <thead>
    <tr>
      <th>Grau de Estresse Clínico</th>
      <th>Exemplos Típicos de Doença Intercorrente</th>
      <th>Regra Posológica de Ajuste Glicocorticoide</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>Estresse Leve a Moderado</strong></td>
      <td>Infecção viral comum com febre (&gt; 38°C), resfriado forte, gastroenterite sem vômitos, procedimentos odontológicos invasivos simples.</td>
      <td><strong>DOBRAR OU TRIPLICAR a dose oral habitual de manutenção</strong> (ex: se toma 5 mg de prednisona, passar para 10 a 15 mg/dia; se toma 20 mg de hidrocortisona, passar para 40 a 60 mg/dia) durante todo o período febril (habitualmente 3 a 5 dias), retornando à dose basal após melhora clínica.</td>
    </tr>
    <tr>
      <td><strong>Vômitos Incoercíveis ou Intolerância Oral</strong></td>
      <td>Gastroenterite aguda com incapacidade de reter comprimidos orais por mais de 30 minutos.</td>
      <td><strong>NÃO INSISTIR NA VIA ORAL!</strong> Aplicar imediatamente <strong>Hidrocortisona 100 mg por via Intramuscular (IM)</strong> profunda no domicílio e dirigir-se imediatamente ao pronto-socorro mais próximo.</td>
    </tr>
    <tr>
      <td><strong>Estresse Cirúrgico Maior / UTI</strong></td>
      <td>Cirurgias de grande porte sob anestesia geral (laparotomia, cirurgia cardíaca), politrauma, sepse grave ou choque.</td>
      <td>Administrar <strong>Hidrocortisona 100 mg IV na indução anestésica</strong>, seguida por <strong>50 mg IV a cada 6 horas (200 mg/dia)</strong> no pós-operatório imediato, desmamando 50% da dose a cada 24 horas à medida que o paciente se recupera até retornar à dose basal oral.</td>
    </tr>
  </tbody>
</table>
`
    },
    {
      id: 'sindrome-de-cushing-quadro-clinico-fisiopatologia',
      title: '6. Síndrome de Cushing: Fisiopatologia, Manifestações Clínicas e Exame Semiológico',
      body_html: `
<h3>Conceito e Classificação Etiológica: Exógena versus Endógena</h3>
<p>A Síndrome de Cushing (SC) é a constelação de manifestações clínicas e bioquímicas resultantes da exposição crônica e sustentada dos tecidos corporais a níveis excessivos e suprafisiológicos de glicocorticoides livres. Sua divisão primária compreende:</p>
<ul>
  <li><strong>Síndrome de Cushing Exógena (Iatrogênica):</strong> Responde por <strong>mais de 99% de todos os casos de hipercortisolismo na população geral</strong>. Decorre da administração terapêutica de corticosteroides exógenos em doses farmacológicas por qualquer via (oral, intravenosa, intramuscular, inalatória em altas doses, tópica extensa ou infiltrações articulares repetidas). Cursa com <strong>atrofia bilateral de ambas as glândulas adrenais e supressão profunda do ACTH hipofisário</strong>.</li>
  <li><strong>Síndrome de Cushing Endógena:</strong> Condição rara (incidência de 2 a 3 casos por milhão/ano), resultante da hipersecreção endógena autônoma de cortisol pelo próprio organismo.</li>
</ul>

<h3>Etiologias da Síndrome de Cushing Endógena</h3>
<ol>
  <li><strong>Cushing ACTH-Dependente (Responsável por 80% a 85% dos casos endógenos):</strong>
    <ul>
      <li><em>Doença de Cushing (70% do total de endógenos):</em> Decorre de um <strong>microadenoma hipofisário benigno (&lt; 10 mm em 90%)</strong> monoclonal originado nos tireotrofos/corticotrofos adeno-hipofisários hiperprodutor de ACTH. Predomina em mulheres em idade fértil (razão 4:1 a 8:1). Mantém capacidade parcial de resposta a doses muito elevadas de dexametasona e ao estímulo com CRH.</li>
      <li><em>Síndrome do ACTH Ectópico (10% a 15%):</em> Produção tumoral não hipofisária aberrante e desregulada de ACTH por neoplasias malignas ou neuroendócrinas. A causa clássica número 1 é o <strong>Carcinoma Pulmonar de Pequenas Células (Oat Cell / Small Cell Lung Cancer)</strong>, seguido por <em>Tumores Carcinoides Brônquicos brônquicos típicos/atípicos</em>, tumores neuroendócrinos pancreáticos e timomas. Apresenta início rápido e fulminante, com hipercortisolismo colossal que frequentemente cursa com hiperpigmentação cutânea, alcalose metabólica hipocalêmica severa, emagrecimento consumptivo e diabetes grave, mascarando os estigmas fenotípicos clássicos de acúmulo de gordura.</li>
      <li><em>Síndrome do CRH Ectópico (&lt; 1%):</em> Causa raríssima com hipersecreção de CRH tumoral.</li>
    </ul>
  </li>
  <li><strong>Cushing ACTH-Independente (Responsável por 15% a 20% dos casos endógenos):</strong>
    <br>A hiperprodução de cortisol localiza-se primariamente no próprio córtex adrenal, operando de forma totalmente autônoma, provocando <strong>supressão profunda e contínua do ACTH hipofisário (&lt; 5 pg/mL)</strong> por feedback negativo:
    <ul>
      <li><em>Adenoma Adrenal Unilateral Benigno (10%):</em> Nódulo adrenal único bem delimitado produtor exclusivo de cortisol, associado à atrofia do córtex adrenal contralateral por falta de ACTH. Predomina amplamente no sexo feminino.</li>
      <li><em>Carcinoma Adrenocortical (ACC - 5% a 7%):</em> Neoplasia maligna altamente agressiva, volumosa (geralmente &gt; 5 a 6 cm na TC), com invasão de veia cava e metástases hepáticas/pulmonares. Caracteriza-se por cossecreção de <strong>Cortisol associada a Androgênios Adrenais em níveis colossais (DHEA-S muito elevado)</strong>, provocando em mulheres virilização rápida exuberante (hirsutismo severo, clitoromegalia, alopecia androgenética e voz engrossada).</li>
      <li><em>Hiperplasia Adrenal Macronodular Bilateral Independente de ACTH (AIMAH / PBMAH) e Doença Nodular Pigmentada Primária (PPNAD - associada ao Complexo de Carney).</em></li>
    </ul>
  </li>
</ol>

<h3>Manifestações Clínicas Clássicas e Sinais de Alta Especificidade</h3>
<p>Embora a obesidade e a hipertensão sejam achados muito comuns, sua prevalência é universal na população geral, conferindo baixa especificidade discriminatória. Os sinais semiológicos de <strong>maior valor preditivo positivo para Síndrome de Cushing endógena</strong> são:</p>
<table class="book-table">
  <thead>
    <tr>
      <th>Manifestação Clínica</th>
      <th>Descrição Semiológica Típica</th>
      <th>Mecanismo Fisiopatológico Específico</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>Estrias Violáceas Largas</strong></td>
      <td><strong>Estrias violáceas, avermelhadas ou purpúricas com largura &gt; 1,0 cm</strong>, localizadas predominantemente no abdome inferior, flancos, coxas, nádegas e axilas.</td>
      <td>O excesso de cortisol inibe a síntese de colágeno e elastina pelos fibroblastos dérmicos. Com a distensão adiposa rápida, a derme atrofia-se e rompe-se, permitindo a visualização translúcida dos plexos vasculares venosos dérmicos subjacentes.</td>
    </tr>
    <tr>
      <td><strong>Miopatia Proximal Progressiva</strong></td>
      <td><strong>Fraqueza muscular simétrica em cinturas escapular e pélvica</strong>. O paciente relata dificuldade motora para subir escadas, levantar-se de cadeiras baixas sem o apoio das mãos e pentear os próprios cabelos.</td>
      <td>Intenso catabolismo proteico com atrofia seletiva das fibras musculares esqueléticas do tipo IIb (glicolíticas rápidas).</td>
    </tr>
    <tr>
      <td><strong>Fragilidade Capilar e Equimoses Espontâneas</strong></td>
      <td>Múltiplas equimoses, púrpuras e hematomas extensos surgindo após traumas banais mínimos ou espontaneamente em antebraços e membros inferiores.</td>
      <td>Atrofia e fragilidade extrema do tecido conjuntivo perivascular subcutâneo que sustenta os capilares dérmicos.</td>
    </tr>
    <tr>
      <td><strong>Redistribuição Adiposa Centrípeta</strong></td>
      <td><strong>Fácies em Lua Cheia ("Moon Face")</strong> com pletora facial violácea; obesidade troncular central contrastando com membros superiores e inferiores atróficos e afilados; acúmulo de gordura dorsocervical (<strong>Giba de Búfalo / Buffalo Hump</strong>) e preenchimento gorduroso das fossas supraclaviculares.</td>
      <td>A hiperinsulinemia secundária à resistência induzida pelo cortisol estimula a lipogênese preferencialmente nos depósitos adiposos viscerais e faciais mais sensíveis.</td>
    </tr>
    <tr>
      <td><strong>Osteoporose e Fraturas Patológicas</strong></td>
      <td>Fraturas de arcos costais e compressão/achatamento vertebral com perda de estatura após traumas de baixa energia em jovens.</td>
      <td>Inibição direta da replicação dos osteoblastos, estímulo aos osteoclastos e redução da absorção intestinal de cálcio.</td>
    </tr>
    <tr>
      <td><strong>Distúrbios Neuropsiquiátricos</strong></td>
      <td>Labilidade emocional, insônia severa, depressão refratária, ansiedade, euforia e episódios de <em>Psicose Franca por Corticoide</em>.</td>
      <td>Toxicidade direta do cortisol sobre os receptores neuronais do hipocampo e amígdala cerebral.</td>
    </tr>
  </tbody>
</table>
`
    },
    {
      id: 'investigacao-laboratorial-rastreamento-1a-linha',
      title: '7. Rastreamento Inicial do Hipercortisolismo: Os Três Testes de 1ª Linha',
      body_html: `
<h3>Quem Deve Ser Rastreado para Síndrome de Cushing?</h3>
<p>O rastreamento laboratorial não deve ser realizado na população geral de obesos ou hipertensos. De acordo com as diretrizes da Endocrine Society e SBEM, o rastreamento é formalmente indicado nos seguintes grupos selecionados:</p>
<ol>
  <li>Pacientes com achados clínicos múltiplos e progressivos de alta especificidade (estrias violáceas &gt; 1 cm, miopatia proximal, equimoses fáceis e pletora facial).</li>
  <li>Pacientes com manifestações clínicas incomuns para a faixa etária (hipertensão arterial resistente ou osteoporose com fraturas vertebrais em adultos jovens).</li>
  <li>Crianças com desaceleração do crescimento estatural associada a ganho de peso excessivo (cruzamento descendente de percentis de altura com elevação de IMC).</li>
  <li>Pacientes portadores de <strong>Incidentaloma Adrenal</strong> diagnosticado em tomografia computadorizada realizada por outra indicação.</li>
</ol>
<p><strong>Pré-requisito Obrigatório:</strong> O primeiro passo antes de qualquer exame é <strong>excluir formalmente o uso de qualquer corticoide exógeno</strong> (incluindo pomadas dérmicas com betametasona, colírios, inaladores nasais ou orais com beclometasona/fluticasona e infiltrações intra-articulares).</p>

<h3>Os Três Testes Diagnósticos de Primeira Linha (Rastreamento)</h3>
<p>Para confirmar a presença inequívoca de Hipercortisolismo Endógeno Patológico, <strong>são necessários pelo menos DOIS testes de primeira linha concordantemente alterados</strong> (ou um mesmo teste repetido e francamente positivo por duas vezes):</p>
<table class="book-table">
  <thead>
    <tr>
      <th>Teste de 1ª Linha</th>
      <th>Protocolo de Execução Técnica</th>
      <th>Ponto de Corte / Critério Diagnóstico de Positividade</th>
      <th>Armadilhas e Situações de Invalidação</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>1. Cortisol Salivar Noturno (às 23h)</strong></td>
      <td>O paciente mastiga um dispositivo cilíndrico estéril (Salivette) por 2 a 3 minutos às 23 horas no próprio domicílio sem escovar os dentes ou ingerir alimentos 30 min antes. <strong>Exige pelo menos 2 coletas em noites distintas</strong>.</td>
      <td><strong>Cortisol Salivar &gt; 0,25 a 0,35 mcg/dL (ou &gt; 7 nmol/L)</strong> confirma a perda patológica do ritmo circadiano normal (no qual o cortisol deveria ser indetectável à noite).</td>
      <td>Sensibilidade e especificidade &gt; 95%. Invalidado em trabalhadores noturnos de turno, fumantes crônicos ou presença de sangramento gengival ativo (contaminação da saliva com sangue).</td>
    </tr>
    <tr>
      <td><strong>2. Cortisol Livre Urinário de 24 Horas (CLU)</strong></td>
      <td>Coleta rigorosa de todo o volume urinário emitido durante 24 horas contínuas em frasco com conservante. <strong>Exige pelo menos 2 a 3 coletas em dias distintos</strong>.</td>
      <td><strong>Cortisol Livre Urinário &gt; 3 a 4 vezes o limite superior da normalidade</strong> do ensaio laboratorial específico.</td>
      <td>Avalia a produção integrada diária de cortisol livre. <strong>Invalidado se Taxa de Filtração Glomerular &lt; 30 a 50 mL/min</strong> (não filtra cortisol livre) ou se houver erro crônico de volume urinário na coleta (checar creatininúria total).</td>
    </tr>
    <tr>
      <td><strong>3. Teste de Supressão Noturna com 1 mg de Dexametasona (Overnight)</strong></td>
      <td>Administrar <strong>1 mg de Dexametasona via oral exatamente às 23 horas</strong> da noite. Na manhã seguinte, colher o Cortisol Plasmático entre 8h e 9h em jejum.</td>
      <td><strong>Cortisol Sérico às 8h &gt; 1,8 mcg/dL (50 nmol/L)</strong> confirma a ausência de supressão fisiológica normal (positivo para hipercortisolismo).</td>
      <td>A dexametasona não interfere no ensaio do cortisol plasmático e atua na hipófise suprimindo o ACTH normal; se o cortisol às 8h permanecer &gt; 1,8, a secreção é autônoma. <strong>Falsos-positivos em uso de Estrogênios orais (anticoncepcionais elevam TBG)</strong> e fármacos que induzem a CYP3A4 hepática (fenitoína, carbamazepina, rifampicina aceleram o clearance da dexametasona).</td>
    </tr>
  </tbody>
</table>

<h3>A Síndrome do Pseudo-Cushing (Hipercortisolismo Não Neoplásico)</h3>
<p>Estados de estresse metabólico ou psiquiátrico grave ativam cronicamente o eixo hipotálamo-hipófise-adrenal, resultando em testes de rastreamento levemente alterados sem haver neoplasia tumoral subjacente. As três causas mais frequentes de <strong>Pseudo-Cushing</strong> são: <strong>Depressão Maior grave e transtornos de ansiedade generalizada; Etilismo Crônico pesado em abstinência ativa; e Obesidade visceral mórbida associada a Diabetes Mellitus descompensado grave</strong>. Diante de testes limítrofes nesse perfil de pacientes, deve-se afastar o fator desencadeador (tratar a depressão ou manter abstinência alcoólica por 4 a 6 semanas) e repetir os testes, ou realizar o teste combinado de <em>Dexametasona em baixa dose (0,5 mg de 6/6h por 48h) associada ao estímulo com CRH</em>.</p>
`
    },
    {
      id: 'diagnostico-etiologico-2a-linha-acth-bipss',
      title: '8. Diagnóstico Etiológico de 2ª Linha: ACTH Plasmático, Imagem e o BIPSS',
      body_html: `
<h3>Etapa 1: A Dosagem Estratégica do ACTH Plasmático</h3>
<p>Uma vez comprovado laboratorialmente o hipercortisolismo endógeno por pelo menos dois testes concordantes de 1ª linha, <strong>o exame laboratorial mandatória de segunda linha é a dosagem de ACTH Plasmático colhido às 8h da manhã</strong> (em tubo pré-resfriado com EDTA e centrifugação imediata), permitindo a divisão etiológica em dois ramos diametralmente opostos:</p>
<table class="book-table">
  <thead>
    <tr>
      <th>Resultado do ACTH Plasmático</th>
      <th>Interpretação e Mecanismo Fisiopatológico</th>
      <th>Próximo Exame Propedêutico Obrigatório</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>ACTH Suprimido: &lt; 5 pg/mL (ou &lt; 10 pg/mL)</strong></td>
      <td><strong>Síndrome de Cushing ACTH-INDEPENDENTE.</strong> A fonte de produção é intrinsecamente adrenal. O excesso de cortisol suprime o eixo hipotálamo-hipofisário por retroalimentação negativa.</td>
      <td><strong>Tomografia Computadorizada (TC) de Adrenais com cortes finos</strong> dedicada ao abdome superior:
        <ul>
          <li><em>Nódulo unilateral hipodenso (&lt; 10 UH) bem delimitado &lt; 3 a 4 cm:</em> Adenoma Adrenal Benigno.</li>
          <li><em>Massa adrenal volumosa irregular (&gt; 4 a 6 cm) heterogênea com necrose e invasão vascular:</em> Carcinoma Adrenocortical.</li>
          <li><em>Aumento nodular bilateral:</em> Hiperplasia macronodular bilateral (PBMAH).</li>
        </ul>
      </td>
    </tr>
    <tr>
      <td><strong>ACTH Elevado ou Inapropriadamente Normal: &gt; 15 a 20 pg/mL</strong></td>
      <td><strong>Síndrome de Cushing ACTH-DEPENDENTE.</strong> A fonte secretora é hipofisária (Doença de Cushing: 80%) ou neoplásica extrasselar (Síndrome do ACTH Ectópico: 20%).</td>
      <td>Prosseguir para a diferenciação topográfica entre fonte Hipofisária e fonte Ectópica (iniciando por <strong>Ressonância Magnética de Sela Túrcica</strong>).</td>
    </tr>
  </tbody>
</table>

<h3>Etapa 2: Diferenciação entre Doença de Cushing e Síndrome do ACTH Ectópico</h3>
<p>Esta diferenciação é um dos maiores desafios da endocrinologia clínica:</p>
<ol>
  <li><strong>Ressonância Magnética (RM) de Sela Túrcica com Contraste (Gadolíneo):</strong>
    <ul>
      <li>Se a RM evidenciar claramente um <strong>adenoma hipofisário com diâmetro &ge; 6 a 10 mm (macroadenoma ou microadenoma inequívoco)</strong> no contexto de ACTH-dependência, o diagnóstico de <strong>Doença de Cushing está firmado</strong> e o paciente é encaminhado para cirurgia transesfenoidal.</li>
      <li>Contudo, em até 40% a 50% dos casos de Doença de Cushing confirmada, a RM é <strong>normal ou mostra lesões duvidosas &lt; 5 mm</strong> (devido ao tamanho diminuto dos microadenomas corticotróficos). Além disso, até 10% da população sadia normal possui incidentalomas hipofisários benignos não funcionantes. Portanto, lesões &lt; 6 mm exigem comprovação funcional adicional antes da cirurgia.</li>
    </ul>
  </li>
  <li><strong>Testes Não Invasivos Adicionais:</strong>
    <ul>
      <li><em>Teste de Supressão com Altas Doses de Dexametasona (HDDST - 8 mg overnight ou 2 mg de 6/6h por 48h):</em> Os adenomas da Doença de Cushing mantêm receptores glicocorticoides hipofisários funcionais, sofrendo <strong>supressão do cortisol sérico &gt; 50% em relação ao valor basal</strong>. Já os tumores ectópicos (carcinoma de pequenas células) são autônomos e <strong>não suprimem</strong> (queda &lt; 50%).</li>
      <li><em>Teste de Estímulo com CRH ou Desmopressina (DDAVP):</em> Na Doença de Cushing, há elevação pronunciada do ACTH (&gt; 50%) e do cortisol (&gt; 20%) após a injeção; nos tumores ectópicos, a resposta é ausente.</li>
    </ul>
  </li>
  <li><strong>Cateterismo Bilateral e Simultâneo do Seio Petroso Inferior (BIPSS): O Padrão-Ouro Absoluto:</strong>
    <br>Procedimento angiográfico intervencionista de escolha quando a RM hipofisária for normal, mostrar lesão &lt; 6 mm ou quando os testes não invasivos forem discordantes. Cateterizam-se ambas as veias femorais, avançando os cateteres até os <strong>seios petrosos inferiores direito e esquerdo</strong> (que drenam diretamente o sangue venoso da adeno-hipófise), colhendo amostras simultâneas de ACTH no seio petroso (central) e em veia periférica (periférico), em repouso e após estímulo com CRH ou desmopressina:
    <ul>
      <li><strong>Razão ACTH Central / Periférico Basal &ge; 2,0:</strong> Confirma <strong>Origem Hipofisária (Doença de Cushing)</strong>.</li>
      <li><strong>Razão ACTH Central / Periférico Estimulado (pós-CRH/DDAVP) &ge; 3,0:</strong> Confirma <strong>Origem Hipofisária (Doença de Cushing)</strong> com sensibilidade e especificidade &gt; 98%.</li>
      <li><strong>Razão Central / Periférico &lt; 2,0 (basal) e &lt; 3,0 (estimulado):</strong> Descarta a hipófise e confirma <strong>Síndrome do ACTH Ectópico</strong>. O paciente deve ser submetido a TC de tórax com cortes finos de alta resolução e TC/RM de abdome e pelve para localizar o tumor primário (pesquisar carcinoma de pequenas células de pulmão ou tumor carcinoide brônquico com cintilografia com análogos de somatostatina - OctreoScan ou PET-CT com Gálio-68 DOTA).</li>
      <li><em>Lateralização do Microadenoma:</em> O gradiente intersinusal &ge; 1,4 entre o seio petroso direito e esquerdo prediz o hemilobo hipofisário onde se localiza o microadenoma, orientando a exploração cirúrgica do neurocirurgião.</li>
    </ul>
  </li>
</ol>
`
    },
    {
      id: 'tratamento-definitivo-cirurgico-farmacologico-cushing',
      title: '9. Tratamento Definitivo Cirúrgico e Manejo Farmacológico da Síndrome de Cushing',
      body_html: `
<h3>Cirurgia como Modalidade Terapêutica Primária de Escolha</h3>
<p>O tratamento de escolha curativo definitivo para todas as formas etiológicas de Síndrome de Cushing endógena é a <strong>Ressecção Cirúrgica do Tumor Causal</strong>:</p>
<ol>
  <li><strong>Doença de Cushing: Cirurgia Transesfenoidal Hipofisária Endoscópica:</strong>
    <br>Abordagem realizada por neurocirurgião experiente através da cavidade nasal e seio esfenoidal, visando à ressecção seletiva (adenomectomia) do microadenoma preservando o tecido hipofisário sadio remanescente. Taxas de cura imediata variam de 70% a 85% em microadenomas em centros de referência.
    <br><em>Critério de Cura Pós-Operatória Imediata:</em> No pós-operatório (geralmente entre o 2º e 4º dia pós-cirurgia), como o tecido corticotrófico hipofisário normal estava profundamente atrófico pela supressão prévia, a retirada bem-sucedida do adenoma causa <strong>Hipocortisolismo Agudo Profundo transitório (Cortisol Sérico &lt; 2,0 mcg/dL)</strong>. Esse achado comprova o sucesso cirúrgico e exige a instituição temporária de reposição de <strong>Hidrocortisona oral por meses a 1-2 anos</strong> até que o eixo hipófise-adrenal acorde da atrofia e retome o funcionamento fisiológico.
  </li>
  <li><strong>Adenoma Adrenal Unilateral: Adrenalectomia Unilateral Laparoscópica:</strong>
    <br>Procedimento minimamente invasivo de escolha absoluta. Promove a cura em 100% dos casos. Como a adrenal contralateral encontra-se atrófica pela supressão crônica do ACTH, o paciente <strong>obrigatoriamente necessita de reposição perioperatória com Hidrocortisona intravenosa no intraoperatório e manutenção oral ambulatorial por 6 a 18 meses</strong> até a recuperação do córtex adrenal remanescente.
  </li>
  <li><strong>Síndrome do ACTH Ectópico: Ressecção Oncológica do Tumor Primário:</strong>
    <br>Lobectomia pulmonar para ressecção de tumores carcinoides brônquicos ou quimioterapia para carcinoma de pequenas células.</li>
</ol>

<h3>Tratamento Medicamentoso Inibidor da Esteroidogênese</h3>
<p>A terapia farmacológica é reservada para pacientes sem condições cirúrgicas imediatas, recidiva pós-cirúrgica, preparo pré-operatório em hipercortisolismo grave/sepse ou durante a investigação de tumores ectópicos ocultos:</p>
<ul>
  <li><strong>Cetoconazol:</strong> Antifúngico imidazólico utilizado off-label em doses de 400 a 1.200 mg/dia. É um potente bloqueador enzimático de múltiplos citocromos esteroidogênicos adrenais (inibe a 17-alfa-hidroxilase e a 11-beta-hidroxilase). Apresenta resposta rápida em dias. <em>Principal toxicidade: Hepatotoxicidade dose-dependente com elevação de transaminases, exigindo controle hepático periódico rigoroso</em>.</li>
  <li><strong>Metirapona:</strong> Inibidor seletivo da enzima 11-beta-hidroxilase (CYP11B1), bloqueando a conversão final de 11-desoxicortisol em cortisol. Efeito rápido e potente. Pode induzir acúmulo de precursores androgênicos, causando piora de hirsutismo e acne em mulheres, e retenção mineralocorticoide com hipertensão e hipocalemia.</li>
  <li><strong>Mitotano (o,p'-DDD):</strong> Fármaco adrenolítico citotóxico potente que induz atrofia e necrose irreversível das células do córtex adrenal. É a <strong>droga de escolha no tratamento adjuvante e paliativo do Carcinoma Adrenocortical avançado</strong>.</li>
  <li><strong>Cabergolina e Pasireotida:</strong> Atuam centralmente na hipófise ligando-se a receptores dopaminérgicos D2 e somatostatinérgicos sst5 dos corticotrofos, inibindo a secreção de ACTH na Doença de Cushing.</li>
</ul>

<h3>Complicações Pós-Operatórias e Tromboprofilaxia Mandatória</h3>
<p>O paciente com Síndrome de Cushing ativa encontra-se em um estado pró-trombótico extremo decorrente do aumento dos fatores de coagulação (Fator VIII e Fator de von Willebrand) e redução da fibrinólise endógena. O risco de <strong>Tromboembolismo Venoso e Embolia Pulmonar Fatal no pós-operatório é 10 a 20 vezes maior</strong> do que em indivíduos normais. As diretrizes estabelecem como conduta mandatória a realização de <strong>Tromboprofilaxia Farmacológica com Heparina de Baixo Peso Molecular (Enoxaparina 40 mg SC/dia) iniciada no pré-operatório e estendida por pelo menos 4 a 6 semanas após a cirurgia</strong>.</p>
`
    },
    {
      id: 'casos-clinicos-alta-complexidade-adrenal-cushing',
      title: '10. Casos Clínicos Complexos com Discussão Fisiopatológica e Baseada em Evidências',
      body_html: `
<h3>Caso Clínico 1: Choque Adrenal Refratário por Doença de Addison Inaugural</h3>
<p><strong>História Clínica:</strong> Homem de 34 anos, trabalhador rural do interior de Minas Gerais, sem comorbidades conhecidas. Apresenta história de 6 meses de astenia progressiva, fraqueza muscular, tonturas frequentes ao levantar-se, náuseas matinais e perda ponderal de 9 kg. A esposa relata que a pele do paciente vinha escurecendo progressivamente nos últimos meses, mesmo sem exposição solar excessiva. Há 48 horas iniciou quadro de diarreia aquosa profusa e vômitos incoercíveis após consumir alimento perecível, evoluindo com sonolência profunda e desmaios. É admitido na sala vermelha da emergência em estado de choque hemodinâmico. Ao exame físico: paciente torporoso (Glasgow 11), sudorese fria, extremamente desidratado 3+/4+. Apresenta <strong>hiperpigmentação cutaneomucosa difusa acastanhada intensa nas dobras de flexão palmares das mãos, cicatriz de apendicectomia antiga e manchas hiperpigmentadas enegrecidas em mucosa jugal oral interna e gengivas</strong>. Sinais vitais: <strong>PA 70/40 mmHg (choque profundo)</strong>, FC 126 bpm, FR 24 irpm, afebril. Ausculta cardiopulmonar limpa. Abdome difusamente doloroso à palpação, sem visceromegalias ou sinais de peritonite focal.</p>
<p><strong>Exames Laboratoriais de Urgência:</strong></p>
<ul>
  <li>Glicemia capilar: <strong>52 mg/dL (hipoglicemia)</strong>.</li>
  <li>Eletrólitos: <strong>Sódio: 121 mEq/L (hiponatremia grave)</strong>; <strong>Potássio: 6,8 mEq/L (hipercalemia grave)</strong>; Cloreto: 88 mEq/L.</li>
  <li>Gasometria venosa: <strong>pH 7,26; HCO3 15 mEq/L; Ânion-Gap = 121 - (88 + 15) = 18 mEq/L</strong> (acidose metabólica).</li>
  <li>Ureia: 86 mg/dL; Creatinina: 2,2 mg/dL. Eletrocardiograma revela ondas T apiculadas e simétricas em tenda ("peaked T waves") nas derivações precordiais.</li>
</ul>
<p><strong>Discussão Propedêutica e Raciocínio Clínico:</strong></p>
<ol>
  <li><em>Reconhecimento da Emergência Médica Crítica:</em> O paciente apresenta a clássica e dramática <strong>Crise Adrenal Aguda (Choque Adrenal)</strong> complicando uma <strong>Insuficiência Adrenal Primária (Doença de Addison)</strong> não diagnosticada previamente. A tríade metabólica de <strong>Hiponatremia grave (121 mEq/L) + Hipercalemia com repercussão no ECG (6,8 mEq/L) + Hipoglicemia (52 mg/dL)</strong> associada a choque refratário e hiperpigmentação cutaneomucosa patognomônica é inequívoca.</li>
  <li><em>Fisiopatologia dos Achados:</em> A destruição do córtex adrenal eliminou a produção de cortisol (causando vasodilatação refratária a catecolaminas, astenia e hipoglicemia) e de aldosterona (provocando perda renal maciça de sódio e incapacidade de excretar potássio, gerando a hipercalemia de 6,8 mEq/L). A hiperpigmentação decorre da secreção compensatória extrema de POMC/ACTH e alfa-MSH pela hipófise desinibida.</li>
  <li><em>Conduta de Emergência Imediata (Minutos Vitais):</em>
    <ul>
      <li>Colher amostra de sangue rápida para dosagem de Cortisol basal e ACTH (sem jamais aguardar os resultados!).</li>
      <li><strong>ESTABILIZAÇÃO MIOCÁRDICA:</strong> Administrar imediatamente <strong>Gluconato de Cálcio a 10% (10 mL IV em 5 a 10 minutos)</strong> para estabilizar a membrana dos cardiomiócitos contra a arritmia fatal da hipercalemia (K+ 6,8 com onda T em tenda).</li>
      <li><strong>CORTICOTERAPIA SALVADORA:</strong> Administrar imediatamente <strong>Hidrocortisona 100 mg IV em bólus direto</strong>, seguida por <strong>50 mg IV a cada 6 horas</strong>. A hidrocortisona nessa dose satura o receptor mineralocorticoide, eliminando a necessidade de fludrocortisona na fase aguda.</li>
      <li><strong>RESSUSCITAÇÃO VOLÊMICA AGRESSIVA:</strong> Infundir <strong>Soro Fisiológico a 0,9% (1.000 a 1.500 mL na primeira hora) associado a Soro Glicosado a 5% ou 10%</strong> para expansão intravascular rápida e correção da hipoglicemia. <em>É formalmente proibido infundir soluções contendo potássio!</em></li>
    </ul>
  </li>
  <li><em>Investigação Etiológica Subsequente no Brasil:</em> Após estabilização clínica na UTI, dosagens confirmarão Cortisol basal &lt; 1,0 mcg/dL e ACTH &gt; 1.500 pg/mL. Devido ao perfil epidemiológico do paciente (trabalhador rural no Brasil), solicitar <strong>Sorologia / Imunodifusão para Paracoccidioidomicose</strong> e <strong>TC de Adrenais</strong> para investigar Paracoccidioidomicose adrenal, Tuberculose adrenal e Adrenalite autoimune (Anti-21-hidroxilase).</li>
</ol>

<h3>Caso Clínico 2: Doença de Cushing por Microadenoma Hipofisário com BIPSS</h3>
<p><strong>História Clínica:</strong> Mulher de 31 anos, bancária, procura atendimento endocrinológico com queixa de ganho progressivo de 16 kg nos últimos 14 meses concentrado exclusivamente no tronco e abdome, amenorreia secundária há 8 meses e surgimento de estrias avermelhadas largas na barriga. Queixa-se de fraqueza severa para subir escadas e pentear os cabelos, além de tristeza constante, insônia e labilidade emocional. Vinha sendo tratada para hipertensão arterial recente com Enalapril 20 mg e Anlodipino 5 mg sem controle satisfatório. Nega uso de quaisquer medicamentos contendo corticosteroides. Ao exame físico: IMC 34,2 kg/m², PA 165/105 mmHg, FC 84 bpm. Apresenta <strong>fácies arredondada em lua cheia com pletora facial violácea acentuada, obesidade centrípeta evidente com giba de búfalo dorsocervical volumosa e fossas supraclaviculares preenchidas por gordura</strong>. No abdome inferior e flancos, observam-se <strong>estrias violáceas brilhantes e largas medindo de 1,5 a 2,5 cm de largura</strong>. Pele com múltiplas equimoses em antebraços e coxas. Exame neurológico evidencia nítida fraqueza muscular proximal nos membros inferiores (incapaz de levantar-se da cadeira de braços cruzados).</p>
<p><strong>Investigação Propedêutica Estruturada:</strong></p>
<ol>
  <li><em>Rastreamento de 1ª Linha (Confirmação de Hipercortisolismo):</em>
    <ul>
      <li>Cortisol livre urinário de 24h (2 coletas): <strong>420 mcg/24h e 510 mcg/24h</strong> (valor de referência: 10 a 55 mcg/24h; muito superior a 3 a 4 vezes o limite).</li>
      <li>Cortisol salivar noturno às 23h (2 coletas): <strong>0,85 mcg/dL e 1,10 mcg/dL</strong> (referência &lt; 0,25 mcg/dL; fortemente positivo com perda de ritmo circadiano).</li>
      <li>Teste de supressão noturna com 1 mg de Dexametasona: Cortisol às 8h = <strong>14,8 mcg/dL</strong> (ausência de supressão; ponto de corte &gt; 1,8 mcg/dL).</li>
      <li><em>Conclusão da 1ª Linha:</em> Hipercortisolismo Endógeno Patológico confirmado categoricamente.</li>
    </ul>
  </li>
  <li><em>Investigação Etiológica de 2ª Linha (Eixo do ACTH):</em>
    <ul>
      <li>Dosagem de ACTH plasmático matinal às 8h: <strong>68 pg/mL</strong> (elevado / inapropriadamente normal; referência 10 a 46 pg/mL).</li>
      <li><em>Interpretação:</em> Síndrome de Cushing <strong>ACTH-DEPENDENTE</strong> (exclui causa adrenal primária). Fontes possíveis: Doença de Cushing hipofisária (80%) vs Síndrome do ACTH Ectópico (20%).</li>
    </ul>
  </li>
  <li><em>Exame de Imagem Hipofisária Inicial:</em>
    <ul>
      <li>Ressonância Magnética de Sela Túrcica com contraste: Revela parênquima hipofisário homogêneo sem evidência clara de lesões focais ou microadenomas inequívocos (laudo normal / inconclusivo).</li>
    </ul>
  </li>
  <li><em>Investigação Diagnóstica Avançada (O Padrão-Ouro):</em>
    <ul>
      <li>Diante de RM hipofisária normal no Cushing ACTH-dependente, o próximo exame obrigatório é o <strong>Cateterismo Bilateral e Simultâneo do Seio Petroso Inferior (BIPSS) com estímulo com Desmopressina (DDAVP)</strong>.</li>
      <li><em>Resultados do BIPSS:</em>
        <br>- ACTH Basal: Seio Petroso Inferior Direito = 380 pg/mL; Seio Petroso Inferior Esquerdo = 45 pg/mL; Veia Periférica = 42 pg/mL. <em>Razão Central/Periférico Basal Direita = 380 / 42 = <strong>9,0</strong> (critério positivo &ge; 2,0)</em>.
        <br>- ACTH Estimulado pós-DDAVP (aos 5 minutos): Seio Petroso Direito = 1.450 pg/mL; Veia Periférica = 58 pg/mL. <em>Razão Central/Periférico Estimulada Direita = 1.450 / 58 = <strong>25,0</strong> (critério positivo &ge; 3,0)</em>.
        <br>- Razão Inter-senos (Direito / Esquerdo) = 380 / 45 = <strong>8,4</strong> (marcada lateralização para a direita; critério &ge; 1,4).
      </li>
    </ul>
  </li>
  <li><em>Conduta Terapêutica Definitiva:</em> O BIPSS confirma com 100% de especificidade o diagnóstico de <strong>Doença de Cushing por Microadenoma Hipofisário Oculto lateralizado no hemilobo direito</strong>. A paciente é encaminhada para <strong>Cirurgia Transesfenoidal Endoscópica</strong>. No pós-operatório (4º dia), o cortisol sérico cai para <strong>0,8 mcg/dL</strong>, confirmando a cura cirúrgica da lesão e justificando reposição temporária de Hidrocortisona oral por 12 meses associada a profilaxia antitrombótica com Enoxaparina.</li>
</ol>

<h3>Caso Clínico 3: Insuficiência Adrenal Secundária por Suspensão Abrupta de Corticoterapia</h3>
<p><strong>História Clínica:</strong> Mulher de 52 anos, portadora de artrite reumatoide grave deformante há 10 anos. Vinha fazendo uso contínuo de Prednisona oral na dose de 20 mg/dia há mais de 3 anos, associada a Metotrexato. Há 5 dias, por orientação de um conhecido que alertou sobre os riscos do corticoide no ganho de peso, resolveu <strong>suspender abruptamente a Prednisona por conta própria</strong>. No terceiro dia de suspensão, iniciou com astenia profunda, fraqueza intensa nas pernas, anorexia completa, mialgias generalizadas e náuseas. Dá entrada na UPA levada pelo filho sonolenta e incapaz de deambular. Ao exame físico: paciente desidratada 2+/4+, sonolenta mas responde quando chamada. <strong>Pele muito clara, descorada ("pálida em alabastro"), sem qualquer hiperpigmentação em mucosas, palmas ou cicatrizes</strong>. Sinais vitais: <strong>PA 80/50 mmHg em decúbito dorsal que cai para 60/35 mmHg ao sentar-se (hipotensão postural acentuada)</strong>, FC 104 bpm, afebril.</p>
<p><strong>Exames Laboratoriais na Admissão:</strong></p>
<ul>
  <li>Glicemia capilar: 68 mg/dL.</li>
  <li>Eletrólitos séricos: <strong>Sódio: 126 mEq/L (hiponatremia moderada)</strong>; <strong>Potássio: 4,2 mEq/L (RIGOROSAMENTE NORMAL)</strong>; Cloreto: 98 mEq/L.</li>
  <li>Creatinina: 1,1 mg/dL; Ureia: 42 mg/dL.</li>
</ul>
<p><strong>Discussão Propedêutica e Raciocínio Clínico:</strong></p>
<ol>
  <li><em>Diagnóstico Fisiopatológico:</em> O quadro representa a clássica <strong>Insuficiência Adrenal Terciária/Secundária Agudizada por Suspensão Abrupta de Corticoterapia Exógena Prolongada</strong>. O uso crônico de 20 mg de prednisona por anos promoveu atrofia profunda por feedback negativo sobre os neurônios hipotalâmicos de CRH e corticotrofos hipofisários de ACTH, além de atrofia das zonas fasciculata e reticular de ambas as adrenais.</li>
  <li><em>Diferenciação Semiológica e Laboratorial Crucial:</em>
    <ul>
      <li><em>Por que a pele é pálida e NÃO há hiperpigmentação?</em> Como a supressão é central, os níveis de ACTH e alfa-MSH estão indetectáveis; os melanócitos não são ativados.</li>
      <li><em>Por que o Potássio sérico é NORMAL (4,2 mEq/L)?</em> Na insuficiência adrenal secundária/terciária, a <strong>Zona Glomerulosa e a secreção de Aldosterona permanecem totalmente PRESERVADAS</strong>, pois dependem da renina e angiotensina II (SRAA), que funcionam normalmente. Como há aldosterona normal, o rim excreta potássio adequadamente, não havendo hipercalemia nem perda salina renal extrema. A hiponatremia presente (126 mEq/L) é euvolêmica e dilucional (por estímulo não osmótico de ADH secundário à falta de cortisol).</li>
    </ul>
  </li>
  <li><em>Conduta Terapêutica Imediata:</em>
    <ul>
      <li>Administração imediata de <strong>Hidrocortisona 100 mg IV em bólus</strong> associada a Soro Fisiológico a 0,9% com SG 5% para restabelecer a volemia e a glicemia.</li>
      <li>Após a estabilização, <strong>REINTRODUZIR a Prednisona oral na dose prévia de 20 mg/dia</strong> até a recuperação clínica completa.</li>
      <li><em>Planejamento do Desmame Lento:</em> Explicar à paciente que a suspensão abrupta é fatal. O desmame do corticoide crônico deve ser extremamente lento e gradual ao longo de 6 a 12 meses (reduzindo 2,5 mg a cada 2 a 4 semanas até atingir 5 mg/dia; depois realizar teste matinal de cortisol para verificar a recuperação do eixo antes da retirada definitiva). <strong>NUNCA prescrever fludrocortisona</strong> (o mineralocorticoide endógeno está normal).</li>
    </ul>
  </li>
</ol>

<h3>Caso Clínico 4: Síndrome do ACTH Ectópico por Carcinoma Pulmonar de Pequenas Células</h3>
<p><strong>História Clínica:</strong> Homem de 62 anos, grande tabagista de 50 maços-ano, comparece à consulta com história de emagrecimento rápido de 12 kg nos últimos 2 meses, fraqueza muscular devastadora que o impede de levantar-se da cama sozinho, tosse seca e edema em membros inferiores. Não apresenta a obesidade típica de Cushing, estando com aspecto consumptivo. Ao exame físico: paciente emagrecido, com pele globalmente hiperpigmentada e bronzeada. Edema periférico 2+/4+ em membros inferiores com cacifo. PA 180/110 mmHg (hipertensão grave de início recente). Atrofia muscular proximal maciça em quadríceps e deltoides.</p>
<p><strong>Exames Laboratoriais e Radiológicos:</strong></p>
<ul>
  <li>Glicemia plasmática: <strong>320 mg/dL (Diabetes Mellitus descompensado grave)</strong>.</li>
  <li>Gasometria arterial: <strong>pH 7,54; PaCO2 48 mmHg; HCO3 40 mEq/L (Alcalose Metabólica Grave com hipoventilação compensatória)</strong>.</li>
  <li>Eletrólitos: <strong>Sódio: 144 mEq/L; Potássio: 1,9 mEq/L (HIPOCALEMIA CRÍTICA)</strong>; Cloreto: 88 mEq/L.</li>
  <li>Cortisol Livre Urinário de 24h: <strong>4.800 mcg/24h (mais de 40 vezes o limite superior)</strong>; Cortisol às 8h: 92 mcg/dL.</li>
  <li>ACTH Plasmático matinal: <strong>480 pg/mL (profundamente elevado)</strong>.</li>
  <li>Teste de Supressão com Altas Doses de Dexametasona (8 mg overnight): Cortisol às 8h = <strong>88 mcg/dL (ausência completa de supressão)</strong>.</li>
  <li>Radiografia e TC de Tórax de Alta Resolução: Massa hilar pulmonar esquerda espiculada medindo 5,2 cm com linfonodomegalias mediastinais confluentes. Biópsia brônquica confirma <strong>Carcinoma Pulmonar de Pequenas Células (Oat Cell)</strong> neuroendócrino com imunorreatividade intensa para ACTH.</li>
</ul>
<p><strong>Discussão Propedêutica e Raciocínio Clínico:</strong></p>
<ol>
  <li><em>Diagnóstico Fisiopatológico:</em> Trata-se do quadro prototípico da <strong>Síndrome do ACTH Ectópico Paraneoplásica Grave secundária a Carcinoma Pulmonar de Pequenas Células (Small Cell Lung Cancer)</strong>.</li>
  <li><em>Mecanismo da Alcalose Metabólica Hipocalêmica Crítica:</em> O hipercortisolismo na síndrome ectópica é colossal (CLU &gt; 4.000 mcg). Em concentrações fisiológicas, a enzima renal <em>11-beta-hidroxiesteroide desidrogenase tipo 2 (11&beta;-HSD2)</em> inativa o cortisol em cortisona nos túbulos coletores renais, impedindo que o cortisol ative o receptor mineralocorticoide da aldosterona (MR). No hipercortisolismo extremo da síndrome ectópica, a enzima 11&beta;-HSD2 é <strong>completamente saturada</strong>. O cortisol livre em excesso liga-se diretamente aos receptores de aldosterona, agindo como um mineralocorticoide brutal que força a excreção renal massiva de Potássio e íons H+, provocando a clássica <strong>hipocalemia refratária severa (K+ 1,9 mEq/L) e alcalose metabólica marcante (pH 7,54 e HCO3 40)</strong>.</li>
  <li><em>Conduta de Emergência:</em>
    <ul>
      <li>Internação em UTI e <strong>reposição agressiva de Cloreto de Potássio intravenoso</strong> com monitorização eletrocardiográfica contínua associada à <strong>Espironolactona em altas doses (200 a 400 mg/dia)</strong> para antagonizar competitivamente o receptor mineralocorticoide nos túbulos renais.</li>
      <li>Controle do Hipercortisolismo Grave: Início imediato de bloqueadores enzimáticos da esteroidogênese adrenal, como <strong>Cetoconazol oral (800 a 1.200 mg/dia)</strong> ou infusão de Etomidato em dose sub-hipnótica em UTI, reduzindo o cortisol em 48 a 72 horas para prevenir sepse fulminante e sangramento gastrointestinal.</li>
      <li>Encaminhamento urgente para estadiamento e início de quimioterapia sistêmica antineoplásica com Cisplatina e Etoposídeo para o carcinoma de pequenas células.</li>
    </ul>
  </li>
</ol>
`
    },
    {
      id: 'questoes-residencia-comentadas-adrenal-cushing',
      title: '11. Questões de Concursos e Residência Médica com Comentários Exaustivos',
      body_html: `
<h3>Questão 1 (USP-SP / Residência Médica)</h3>
<p>Um homem de 38 anos dá entrada no pronto-socorro em estado de choque hemodinâmico refratário à infusão de 3.000 mL de cristaloides e com necessidade de doses crescentes de noradrenalina (PAM 52 mmHg). Apresenta história de fraqueza, náuseas e perda ponderal nos últimos 4 meses. O exame físico evidencia hiperpigmentação cutaneomucosa difusa, especialmente em dobras palmares e mucosa oral interna. A gasometria venosa e os eletrólitos revelam: Glicemia capilar de 48 mg/dL; Sódio sérico de 122 mEq/L; Potássio sérico de 6,4 mEq/L; e Bicarbonato de 16 mEq/L. Considerando a principal hipótese diagnóstica, qual das seguintes condutas é a mais adequada e prioritária?</p>
<ul>
  <li><strong>A)</strong> Realizar teste formal de estímulo com 250 mcg de Cortrosina e aguardar o resultado do cortisol de 60 minutos antes de administrar qualquer corticosteroide.</li>
  <li><strong>B)</strong> Administrar imediatamente Hidrocortisona na dose de 100 mg IV em bólus associada a Soro Fisiológico a 0,9% com Soro Glicosado a 5%, sem postergar o tratamento para aguardar dosagens hormonais.</li>
  <li><strong>C)</strong> Iniciar infusão contínua de Insulina Regular venosa para tratar a hipercalemia de 6,4 mEq/L e prescrever Fludrocortisona oral imediata.</li>
  <li><strong>D)</strong> Administrar Dexametasona 10 mg IV associada a bicarbonato de sódio para tratar a acidose metabólica.</li>
</ul>
<p><strong>Gabarito: B</strong></p>
<p><strong>Comentário Detalhado dos Distratores:</strong></p>
<ul>
  <li><em>Alternativa A está incorreta:</em> O paciente encontra-se em choque circulatório potencialmente fatal por Crise Adrenal Aguda. Atrasar o corticoide para aguardar 60 minutos de teste de cortrosina em paciente chocado é conduta reprovável associada a óbito imediato. Colhe-se uma amostra basal de sangue e inicia-se o tratamento instantaneamente.</li>
  <li><em>Alternativa B está CORRETA:</em> A associação de choque circulatório refratário a vasopressores com a tríade metabólica de <strong>Hiponatremia (122 mEq/L) + Hipercalemia (6,4 mEq/L) + Hipoglicemia (48 mg/dL)</strong> em paciente com hiperpigmentação de mucosas é diagnóstica de <strong>Crise Adrenal Aguda por Doença de Addison</strong>. A intervenção salvadora mandatória consiste na administração imediata de <strong>Hidrocortisona 100 mg IV em bólus</strong> (que restaura a resposta vascular adrenérgica e satura receptores mineralocorticoides) associada a <strong>Soro Fisiológico a 0,9% e Soro Glicosado a 5%</strong> para restaurar a volemia e normalizar a glicose.</li>
  <li><em>Alternativa C está incorreta:</em> O paciente já se encontra com hipoglicemia severa (48 mg/dL). Infundir insulina venosa sem corticoide causaria neuroglicopenia fatal imediata. Além disso, a fludrocortisona só existe em formulação oral e é ineficaz no choque agudo; a hidrocortisona IV em altas doses supre plenamente a função mineralocorticoide.</li>
  <li><em>Alternativa D está incorreta:</em> A hidrocortisona é a droga de escolha e o bicarbonato não está indicado.</li>
</ul>

<h3>Questão 2 (ENARE / Residência Médica)</h3>
<p>Mulher de 42 anos comparece à consulta médica com queixa de estrias largas avermelhadas no abdome, ganho de peso central e dificuldade para subir degraus de ônibus devido a fraqueza nas pernas. O exame físico confirma estrias violáceas de 2 cm de largura e miopatia proximal. A investigação de 1ª linha confirma hipercortisolismo endógeno patológico (dois testes de cortisol livre urinário de 24h e teste de supressão com 1 mg de dexametasona com cortisol matinal de 12 mcg/dL). O exame de 2ª linha revela <strong>ACTH Plasmático matinal &lt; 5,0 pg/mL (suprimido)</strong>. Qual é a principal hipótese etiológica e qual o próximo exame de imagem indicado?</p>
<ul>
  <li><strong>A)</strong> Microadenoma hipofisário produtor de ACTH (Doença de Cushing); solicitar Ressonância Magnética de sela túrcica.</li>
  <li><strong>B)</strong> Síndrome do ACTH Ectópico por tumor carcinoide brônquico; solicitar Tomografia Computadorizada de tórax de alta resolução.</li>
  <li><strong>C)</strong> Neoplasia Adrenal Primária Autônoma (Adenoma ou Carcinoma Adrenal); solicitar Tomografia Computadorizada de Adrenais.</li>
  <li><strong>D)</strong> Síndrome de Cushing Iatrogênica por corticoide oculto; solicitar biópsia de gordura subcutânea.</li>
</ul>
<p><strong>Gabarito: C</strong></p>
<p><strong>Comentário Detalhado dos Distratores:</strong></p>
<ul>
  <li><em>Alternativa A está incorreta:</em> Na Doença de Cushing hipofisária, a hipersecreção é de ACTH; portanto, o ACTH plasmático estaria elevado ou inapropriadamente normal (&gt; 15 a 20 pg/mL), e nunca suprimido (&lt; 5 pg/mL).</li>
  <li><em>Alternativa B está incorreta:</em> A Síndrome do ACTH Ectópico cursa com níveis maciços e extraordinariamente elevados de ACTH circulante (&gt; 100 a 500 pg/mL).</li>
  <li><em>Alternativa C está CORRETA:</em> A constatação de Hipercortisolismo Endógeno associado a <strong>ACTH Plasmático suprimido (&lt; 5 pg/mL)</strong> confirma categoricamente que a condição é <strong>ACTH-INDEPENDENTE</strong>. O excesso de cortisol é secretado autonomamente pelo córtex adrenal, exercendo feedback negativo que zera a produção hipofisária de ACTH. A etiologia mais prevalente é o <strong>Adenoma Adrenal Unilateral Benigno</strong> (ou Carcinoma Adrenocortical). O próximo exame diagnóstico obrigatório é a <strong>Tomografia Computadorizada de Adrenais com cortes finos</strong> para localizar a lesão adrenal e programar a ressecção cirúrgica por adrenalectomia laparoscópica.</li>
  <li><em>Alternativa D está incorreta:</em> O uso de corticoide exógeno é afastado na história e não se realiza biópsia de gordura para investigar Cushing.</li>
</ul>

<h3>Questão 3 (UNICAMP / Residência Médica)</h3>
<p>Paciente feminina de 28 anos com diagnóstico de Síndrome de Cushing ACTH-dependente confirmada laboratorialmente (ACTH plasmático de 55 pg/mL). A Ressonância Magnética de sela túrcica revelou glândula hipofisária de dimensões normais, sem imagens nodulares evidentes (exame normal). Os testes não invasivos de imagem corporal não identificaram tumores ectópicos torácicos ou abdominais. Para diferenciar definitivamente a Doença de Cushing por microadenoma hipofisário oculto da Síndrome do ACTH Ectópico, qual é o exame padrão-ouro formalmente indicado?</p>
<ul>
  <li><strong>A)</strong> Cintilografia de corpo inteiro com Iodo-131.</li>
  <li><strong>B)</strong> Cateterismo Bilateral e Simultâneo do Seio Petroso Inferior (BIPSS) com dosagem de ACTH basal e pós-estímulo com CRH ou desmopressina.</li>
  <li><strong>C)</strong> Laparotomia exploradora bilateral para adrenalectomia diagnóstica.</li>
  <li><strong>D)</strong> Punção liquórica lombar seriada para dosagem de cortisol no líquor.</li>
</ul>
<p><strong>Gabarito: B</strong></p>
<p><strong>Comentário Detalhado dos Distratores:</strong></p>
<ul>
  <li><em>Alternativa A está incorreta:</em> Iodo-131 avalia tecido tireoidiano e não tem papel na avaliação da hipófise ou adrenal.</li>
  <li><em>Alternativa B está CORRETA:</em> Quando o hipercortisolismo é comprovadamente ACTH-dependente, mas a RM hipofisária é normal ou revela lesão duvidosa &lt; 6 mm, o exame padrão-ouro absoluto para definir a topografia é o <strong>Cateterismo Bilateral do Seio Petroso Inferior (BIPSS)</strong>. Avalia-se o gradiente entre a concentração de ACTH drenada diretamente da hipófise (seio petroso) e o sangue venoso periférico: uma razão central/periférico &ge; 2,0 em repouso ou &ge; 3,0 pós-estímulo com CRH ou desmopressina confirma a <strong>origem hipofisária (Doença de Cushing)</strong> com sensibilidade e especificidade próximas de 100%, além de lateralizar o microadenoma para a cirurgia transesfenoidal.</li>
  <li><em>Alternativa C está incorreta:</em> Adrenalectomia bilateral exploradora sem diagnóstico topográfico é um procedimento mutilante e proscrito.</li>
  <li><em>Alternativa D está incorreta:</em> Cortisol liquórico não tem validação para diferenciação etiológica de Cushing.</li>
</ul>

<h3>Questão 4 (UNIFESP / Residência Médica)</h3>
<p>Uma mulher de 48 anos com diagnóstico de Doença de Addison autoimune encontra-se em seguimento ambulatorial regular em uso de Prednisona 5 mg pela manhã e Fludrocortisona 0,1 mg ao dia. Procura a UBS informando que viajará para uma conferência e questiona como deve proceder caso apresente infecção aguda com febre alta durante a viagem. Qual a orientação médica correta que deve ser fornecida à paciente?</p>
<ul>
  <li><strong>A)</strong> Manter a mesma dose de Prednisona inalterada e suspender a Fludrocortisona durante os dias febris para não sobrecarregar os rins.</li>
  <li><strong>B)</strong> Dobrar ou triplicar a dose diária habitual de Prednisona durante os dias com febre e doença aguda (Sick-day rules), retornando à dose basal após melhora clínica, procurando pronto-socorro se houver vômitos.</li>
  <li><strong>C)</strong> Suspender imediatamente a Prednisona e a Fludrocortisona ao primeiro sinal de febre, pois o corticoide bloqueia a ação dos antibióticos.</li>
  <li><strong>D)</strong> Iniciar imediatamente infusão diária de Dexametasona 20 mg por via oral associada a diuréticos de alça.</li>
</ul>
<p><strong>Gabarito: B</strong></p>
<p><strong>Comentário Detalhado dos Distratores:</strong></p>
<ul>
  <li><em>Alternativa A está incorreta:</em> Manter a dose basal diante de infecção febril aguda expõe o paciente ao risco iminente de descompensação e crise adrenal aguda por estresse infeccioso. Além disso, a fludrocortisona deve ser mantida.</li>
  <li><em>Alternativa B está CORRETA:</em> A educação do paciente com insuficiência adrenal crônica baseia-se nas regras de adaptação para dias de doença (<em>Sick-day rules</em>). Em condições de estresse clínico leve a moderado (febre &gt; 38°C, infecções respiratórias ou urinárias), o paciente deve ser formalmente orientado a <strong>DOBRAR OU TRIPLICAR a dose habitual de reposição glicocorticoide</strong> (ex: passar a prednisona de 5 mg para 10 a 15 mg/dia fracionada) durante os 3 a 5 dias da fase febril, prevenindo crise adrenal. Caso surjam vômitos incoercíveis que impeçam a retenção oral, deve administrar hidrocortisona intramuscular ou procurar emergência médica imediatamente.</li>
  <li><em>Alternativa C está incorreta:</em> Suspender o corticoide na vigência de infecção grave desencadeia choque adrenal fulminante e óbito em poucas horas.</li>
  <li><em>Alternativa D está incorreta:</em> Doses excessivas de dexametasona com diuréticos de alça induziriam hipovolemia e descompensação metabólica.</li>
</ul>

<h3>Questão 5 (ENAMED / Prova Nacional)</h3>
<p>Qual das seguintes características clínicas ou laboratoriais permite diferenciar de forma mais rápida e confiável a Insuficiência Adrenal Primária (Doença de Addison) da Insuficiência Adrenal Secundária provocada por suspensão de corticoterapia prolongada?</p>
<ul>
  <li><strong>A)</strong> A presença de astenia e perda ponderal, exclusivas da forma secundária.</li>
  <li><strong>B)</strong> A presença de hiperpigmentação cutaneomucosa e hipercalemia na forma primária, contrastando com pele pálida e potássio sérico normal na forma secundária.</li>
  <li><strong>C)</strong> A presença de hipoglicemia de jejum, observada unicamente na forma terciária.</li>
  <li><strong>D)</strong> A resposta do cortisol sérico ao teste da cortrosina, que é normal na Doença de Addison.</li>
</ul>
<p><strong>Gabarito: B</strong></p>
<p><strong>Comentário Detalhado dos Distratores:</strong></p>
<ul>
  <li><em>Alternativa A está incorreta:</em> Astenia, fadiga e emagrecimento são queixas universais comuns presentes em todas as formas de insuficiência adrenal decorrentes do déficit de cortisol.</li>
  <li><em>Alternativa B está CORRETA:</em> Os dois marcadores semiológicos e laboratoriais discriminadores clássicos são: (1) <strong>Hiperpigmentação cutaneomucosa:</strong> presente na forma primária (Addison) devido à superexpressão compensatória hipofisária de POMC/ACTH e alfa-MSH, enquanto na secundária o ACTH está suprimido, resultando em pele pálida ("em alabastro"); e (2) <strong>Potássio Sérico:</strong> na primária há destruição da zona glomerulosa com déficit de aldosterona, gerando <strong>hipercalemia</strong>; na secundária, o sistema renina-angiotensina está intacto e a aldosterona continua sendo secretada normalmente, mantendo o <strong>potássio sérico rigorosamente normal</strong>.</li>
  <li><em>Alternativa C está incorreta:</em> A hipoglicemia pode ocorrer em qualquer forma de insuficiência adrenal por perda do estímulo à gliconeogênese.</li>
  <li><em>Alternativa D está incorreta:</em> Na Doença de Addison, a resposta ao teste da cortrosina é <strong>patológica (cortisol &lt; 18 mcg/dL)</strong>, visto que as adrenais estão destruídas e não respondem ao estímulo exógeno.</li>
</ul>

<h3>Questão 6 (USP-RP / Residência Médica)</h3>
<p>Mulher de 35 anos é submetida a ressecção cirúrgica transesfenoidal endoscópica bem-sucedida de microadenoma hipofisário produtor de ACTH para tratamento de Doença de Cushing. No 3º dia de pós-operatório, a paciente encontra-se lúcida, queixando-se de astenia e mialgias. A dosagem sérica de Cortisol matinal de controle revela resultado de <strong>1,2 mcg/dL</strong> (muito baixo). Diante desse achado laboratorial, qual a interpretação clínica correta e a conduta pós-operatória indicada?</p>
<ul>
  <li><strong>A)</strong> O resultado comprova falha cirúrgica imediata; indicar reoperação transesfenoidal de urgência nas próximas 24 horas.</li>
  <li><strong>B)</strong> O resultado confirma a cura cirúrgica completa da Doença de Cushing; iniciar reposição temporária de Hidrocortisona oral e orientar desmame gradual ao longo dos próximos meses.</li>
  <li><strong>C)</strong> O resultado traduz apoplexia hipofisária hemorrágica maciça; indicar ressonância magnética imediata com drenagem cirúrgica.</li>
  <li><strong>D)</strong> O resultado é normal e fisiológico para o pós-operatório; suspender qualquer medicação e conceder alta hospitalar sem reposição hormonal.</li>
</ul>
<p><strong>Gabarito: B</strong></p>
<p><strong>Comentário Detalhado dos Distratores:</strong></p>
<ul>
  <li><em>Alternativa A está incorreta:</em> Se houvesse falha cirúrgica ou tumor residual ativo, o cortisol matinal permaneceria elevado (&gt; 10 a 15 mcg/dL). Níveis &lt; 2,0 mcg/dL confirmam ressecção total do adenoma.</li>
  <li><em>Alternativa B está CORRETA:</em> No pós-operatório imediato da Doença de Cushing, a constatação de <strong>Cortisol Sérico &lt; 2,0 mcg/dL (neste caso, 1,2 mcg/dL)</strong> é o marcador biológico consagrado de <strong>CURA CIRÚRGICA</strong>. Como o adenoma suprimiu os corticotrofos hipofisários normais por anos, a retirada da lesão tumoral deixa a paciente em estado de insuficiência adrenal secundária aguda transitória. A conduta indispensável consiste na instituição de <strong>reposição hormonal fisiológica com Hidrocortisona oral (15 a 20 mg/dia) ou Prednisona (5 mg/dia)</strong>, mantida por 6 a 18 meses, com monitorização periódica do eixo adrenal até a recuperação da esteroidogênese endógena normal.</li>
  <li><em>Alternativa C está incorreta:</em> A paciente está estável, sem cefaleia súbita, distúrbios visuais ou colapso que sugiram apoplexia.</li>
  <li><em>Alternativa D está incorreta:</em> Deixar a paciente sem reposição com cortisol de 1,2 mcg/dL deflagraria crise adrenal aguda fatal no domicílio.</li>
</ul>
`
    },
    {
      id: 'pontos-chave-enamed-adrenal-cushing',
      title: '12. Pontos de Alto Rendimento para o ENAMED e Diretrizes Finais',
      body_html: `
<h3>Os Dez Mandamentos das Doenças Adrenais para a Prova de Concurso</h3>
<ul>
  <li><strong>1. Zoneamento Cortical e Regulação:</strong> Glomerulosa produz Aldosterona (regulada pelo <strong>SRAA e K+</strong>); Fasciculata produz Cortisol (regulada pelo <strong>ACTH</strong>); Reticular produz Androgênios DHEA (regulada pelo <strong>ACTH</strong>).</li>
  <li><strong>2. Addison vs Insuficiência Secundária:</strong> Addison (Primária) = <strong>Hiperpigmentação cutaneomucosa patognomônica</strong> + <strong>Hipercalemia</strong> com hiponatremia (falta cortisol e aldosterona; ACTH &gt; 100). Secundária (corticoterapia prévia) = <strong>Pele pálida</strong> + <strong>Potássio normal</strong> (aldosterona preservada pelo SRAA; ACTH &lt; 10).</li>
  <li><strong>3. Diagnóstico de Insuficiência Adrenal:</strong> Cortisol matinal &lt; 3 a 5 mcg/dL confirma; &gt; 18 a 20 mcg/dL exclui. Teste de estímulo com Cortrosina (250 mcg ACTH): cortisol pós &lt; 18 mcg/dL confirma falência adrenal.</li>
  <li><strong>4. Emergência do Choque Adrenal:</strong> Colapso circulatório refratário a aminas com hiponatremia, hipercalemia e hipoglicemia. Conduta salvadora imediata: <strong>Hidrocortisona 100 mg IV em bólus + 50 mg de 6/6h</strong> + SF 0,9% com SG 5%. <em>Nunca atrasar o corticoide para aguardar dosagens!</em></li>
  <li><strong>5. Doses de Estresse (Sick-day rules):</strong> Em infecções febris ou estresse leve a moderado em paciente sob corticoterapia de manutenção, <strong>DOBRAR ou TRIPLICAR a dose oral de glicocorticoide por 3 a 5 dias</strong>. Se vômitos incoercíveis: hidrocortisona intramuscular ou pronto-socorro.</li>
  <li><strong>6. Rastreamento de Síndrome de Cushing:</strong> Excluir corticoterapia exógena. Exige <strong>DOIS testes de 1ª linha positivos</strong>: (1) Cortisol salivar noturno 23h (2 coletas); (2) Cortisol livre urinário de 24h (2 coletas); (3) Teste de supressão com 1 mg de Dexametasona (cortisol 8h &gt; 1,8 mcg/dL).</li>
  <li><strong>7. Segunda Linha no Cushing (ACTH Plasmático):</strong> ACTH &lt; 5 pg/mL = <strong>ACTH-Independente</strong> (origem adrenal &rarr; solicitar TC de adrenais). ACTH &gt; 15 a 20 pg/mL = <strong>ACTH-Dependente</strong> (Doença de Cushing hipofisária vs ACTH Ectópico).</li>
  <li><strong>8. Padrão-Ouro BIPSS:</strong> Cateterismo bilateral do seio petroso inferior indicado se RM de sela túrcica for normal ou &lt; 6 mm no Cushing ACTH-dependente. Razão central/periférico &ge; 2,0 basal ou &ge; 3,0 pós-CRH/DDAVP confirma Doença de Cushing.</li>
  <li><strong>9. Síndrome do ACTH Ectópico:</strong> Associada ao Carcinoma Pulmonar de Pequenas Células (Oat Cell) e carcinoides brônquicos. Cursa com <strong>Alcalose Metabólica Hipocalêmica Grave</strong> (cortisol massivo satura a 11&beta;-HSD2 e ativa receptor de aldosterona) e ACTH elevadíssimo sem supressão com dexametasona.</li>
  <li><strong>10. Cura Pós-Operatória da Doença de Cushing:</strong> No 2º a 4º dia pós-cirurgia transesfenoidal, <strong>Cortisol Sérico &lt; 2,0 mcg/dL confirma cura cirúrgica completa</strong>, exigindo reposição temporária de hidrocortisona e tromboprofilaxia estendida com enoxaparina por 4 a 6 semanas.</li>
</ul>

<h3>Resumo Comparativo de Diagnóstico e Tratamento das Doenças Adrenais</h3>
<table class="book-table">
  <thead>
    <tr>
      <th>Condição Clínica</th>
      <th>Mecanismo Fisiopatológico Principal</th>
      <th>Marcador Diagnóstico Chave</th>
      <th>Tratamento de Escolha Definitivo</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>Doença de Addison (IA Primária)</strong></td>
      <td>Destruição de todo o córtex adrenal (autoimune / paracoco / TB)</td>
      <td>Cortisol &lt; 5 com ACTH &gt; 100; Anti-21-OH ou TC adrenal alterada</td>
      <td>Prednisona 5 mg/dia + Fludrocortisona 0,1 mg/dia para o resto da vida.</td>
    </tr>
    <tr>
      <td><strong>Insuficiência Adrenal Secundária</strong></td>
      <td>Suspensão de corticoide crônico ou lesão hipofisária</td>
      <td>Cortisol pós-ACTH &lt; 18 com ACTH baixo (&lt; 10 pg/mL); potássio normal</td>
      <td>Prednisona oral em desmame muito lento (nunca usar fludrocortisona).</td>
    </tr>
    <tr>
      <td><strong>Crise Adrenal Aguda</strong></td>
      <td>Colapso hemodinâmico por estresse sobre adrenal falida</td>
      <td>Hipotensão refratária + Hiponatremia + Hipercalemia + Hipoglicemia</td>
      <td><strong>Hidrocortisona 100 mg IV bólus + 50 mg 6/6h + SF 0,9% com SG 5%</strong>.</td>
    </tr>
    <tr>
      <td><strong>Doença de Cushing (Hipofisária)</strong></td>
      <td>Microadenoma corticotrófico hipofisário produtor de ACTH</td>
      <td>Cushing ACTH-dependente; BIPSS com razão &ge; 3,0 pós-estímulo</td>
      <td><strong>Cirurgia Transesfenoidal Endoscópica</strong> (hipocortisolismo pós &lt; 2 mcg/dL).</td>
    </tr>
    <tr>
      <td><strong>Síndrome do ACTH Ectópico</strong></td>
      <td>Neoplasia neuroendócrina (carcinoma de pequenas células)</td>
      <td>ACTH &gt; 100-500; não suprime com dexametasona 8 mg; hipocalemia grave</td>
      <td>Ressecção tumoral ou quimioterapia + Cetoconazol / Espironolactona.</td>
    </tr>
    <tr>
      <td><strong>Adenoma Adrenal (Cushing Adrenal)</strong></td>
      <td>Neoplasia cortical unilateral autônoma produtora de cortisol</td>
      <td>Hipercortisolismo com ACTH &lt; 5 pg/mL (suprimido); nódulo na TC adrenal</td>
      <td><strong>Adrenalectomia Laparoscópica Unilateral</strong> + hidrocortisona perioperatória.</td>
    </tr>
  </tbody>
</table>
`
    }
  ],
  references: [
    {
      title: 'Diretrizes Clínicas da Sociedade Brasileira de Endocrinologia e Metabologia (SBEM) — Insuficiência Adrenal e Síndrome de Cushing',
      url: 'https://www.endocrino.org.br'
    },
    {
      title: 'The Diagnosis and Treatment of Adrenal Insufficiency: An Endocrine Society Clinical Practice Guideline. J Clin Endocrinol Metab',
      url: 'https://academic.oup.com/jcem/article/101/2/364/2804753'
    },
    {
      title: 'The Diagnosis of Cushing’s Syndrome: An Endocrine Society Clinical Practice Guideline. J Clin Endocrinol Metab',
      url: 'https://academic.oup.com/jcem/article/93/5/1526/2598698'
    },
    {
      title: 'Consensus on Diagnosis and Management of Cushing’s Disease: A Guideline Update. Lancet Diabetes Endocrinol',
      url: 'https://www.thelancet.com/journals/landia/article/PIIS2213-8587(21)00235-7/fulltext'
    },
    {
      title: 'Ministério da Saúde do Brasil — Protocolos Clínicos e Diretrizes Terapêuticas das Doenças da Adrenal',
      url: 'https://www.gov.br/saude/pt-br/assuntos/protocolos-clinicos-e-diretrizes-terapeuticas'
    }
  ]
};

const chars = saveBook(book);
console.log(`Finished ${book.slug}: ${chars} useful characters.`);
