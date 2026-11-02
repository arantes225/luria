(() => {
  "use strict";

  const $ = (id) => document.getElementById(id);

  const ADMIN_PIN_GRACE_MS = 30 * 60 * 1000;
  const ADMIN_PIN_GRACE_KEY = "traube-admin-pin-unlocked-until";

  const state = {
    user: null,
    isAdmin: false,
    pinConfigured: false,
    pinUnlocked: false,
    currentView: "weekly", // "weekly" | "monthly" | "kanban" | "stories" | "crm" | "meta_ads" | "organic_growth"
    selectedMonth: "2026-10",
    leadsList: [],
    organicTips: [],
    postAssetsMap: {},
    activeModalPostId: null
  };

  const DRIVE_FOLDER = "https://drive.google.com/drive/folders/1gd2hhVmwGzKibBwLuvEUcXPdGa_B0FRi?usp=drive_link";
  const STORAGE_BUCKET = "marketing_videos_temp";

  // ==============================================================
  // REGRA OFICIAL PERMANENTE: MOTOR GERADOR DE PROMPTS ULTRADETALHADOS
  // ESTÉTICA @MENTORIS · ZERO ROSTOS DE IA · MOTION 3D · ALTA RETENÇÃO MÉDICA
  // ==============================================================
  const ULTRA_DETAILED_SPECS = {
    p01: {
      hook: "90% DO ESTUDO PASSIVO É ESQUECIDO EM 7 DIAS",
      uiFocus: "Gráfico interativo 3D da Curva do Esquecimento de Ebbinghaus (queda abrupta em vermelho neon #EF4444 vs curva de retenção sustentada em verde esmeralda #10B981 com picos de Active Recall no Dia 1, Dia 3, Dia 7 e Dia 21) dentro do Dashboard Analítico da TRAUBE",
      clinicalContext: "Estudante no internato lendo PDF passivamente vs resolvendo flashcard ativo de Insuficiência Cardíaca",
      keywords: ["CURVA DE EBBINGHAUS", "REPETIÇÃO ESPAÇADA", "MEMÓRIA DE LONGO PRAZO", "ACTIVE RECALL"],
      narrationText: "Você estuda 6 horas hoje, acha que dominou a matéria, e na semana seguinte erra uma questão básica sobre o mesmo tema no simulado. Sabe por quê? Curva do Esquecimento de Ebbinghaus. O cérebro humano descarta até 80% do que você lê de forma passiva em menos de 7 dias se não houver esforço ativo de recuperação. Sublinhar apostila e reler resumo pronto dá sensação de estudo, mas não consolida sinapse. Na TRAUBE, cada questão que você resolve alimenta um algoritmo de repetição espaçada que reativa o tema exatamente no ponto crítico antes de você esquecer. Pare de estudar para esquecer. Salve esse post para revisar sua rotina e ative seus 15 dias gratuitos pelo link da bio."
    },
    p02: {
      hook: "HGT vs TC DE CRÂNIO: OS 60 SEGUNDOS QUE SALVAM UM CÉREBRO",
      uiFocus: "Tela dividida 3D em vidro escuro: à esquerda um glicosímetro digital piscando '32 mg/dL' em alerta vermelho crítico; à direita uma Tomografia de Crânio sem contraste com artéria cerebral média hiperdensa e o protocolo de código AVC na TRAUBE",
      clinicalContext: "Paciente de 68 anos no Pronto-Socorro com hemiparesia direita súbita, afasia e desvio de rima labial há 40 minutos",
      keywords: ["DÉFICIT FOCAL SÚBITO", "HGT IMEDIATO", "NEUROGLICOPENIA", "CÓDIGO AVC"],
      narrationText: "Você tá no plantão do PS. Chega um paciente de 68 anos com hemiparesia súbita e desvio de rima. A primeira coisa que você pensa é correr pro tomógrafo, certo? Errado! Antes de qualquer contraste ou TC de crânio, a primeira conduta obrigatória é uma fita de HGT na ponta do dedo. Hipoglicemia severa mimetiza perfeitamente um AVC isquêmico. Se você mandar esse paciente pra tomografia com 30 de glicemia, ele entra em coma na maca. Trate a glicose primeiro. Se o déficit persistir, aí sim você abre o protocolo de AVC. Não perca questão de residência e não erre conduta no PS. Compartilhe com a sua equipe de plantão e entre no teste grátis da TRAUBE pelo link da bio."
    },
    p03: {
      hook: "A PEGADINHA QUE ELIMINA 78% DOS CANDIDATOS NA PROVA",
      uiFocus: "Interface de Resolução de Questões da TRAUBE em 3D isométrico destacando uma questão clínica do ENARE/USP, onde a alternativa B (distrator clássico) recebe um carimbo neon 'DISTRATOR DA BANCA' e a alternativa D acende em verde esmeralda com o fluxograma da diretriz",
      clinicalContext: "Dissecção cirúrgica de enunciado longo de prova de residência: identificando palavras-chave e armadilhas de conduta expectante vs imediata",
      keywords: ["DISTRATOR CLÁSSICO", "LEITURA CIRÚRGICA", "COMANDO DA QUESTÃO", "GABARITO BLINDADO"],
      narrationText: "As bancas de residência não criam alternativas erradas por acaso: elas desenham distratores milimetricamente calculados para pegar quem decorou palavra-chave sem entender fisiopatologia. Olha a anatomia dessa questão: o enunciado te dá três dados normais para esconder um único sinal de alarme no final da segunda linha. Quem lê no automático marca a conduta ambulatorial e perde o ponto. Na TRAUBE, cada alternativa incorreta é dissecada linha por linha para você enxergar a malícia da banca em menos de 10 segundos. Responda nos comentários qual alternativa você marcaria antes de ver o gabarito!"
    },
    p04: {
      hook: "DO ERRO NA QUESTÃO AO FLASHCARD EM 3 SEGUNDOS",
      uiFocus: "Transição hiper-rápida em câmera contínua: tela de erro em uma questão de Emergência na TRAUBE -> feixe de luz verde esmeralda conectando direto ao 'Caderno de Erros Automático' -> card 3D girando em 180 graus revelando pergunta ativa na frente e conduta objetiva no verso",
      clinicalContext: "Automação cognitiva: transformando uma questão errada de Cetoacidose Diabética (potássio sérico < 3,3 mEq/L antes da insulina) em flashcard instantâneo",
      keywords: ["CADERNO DE ERROS", "FLASHCARD AUTOMÁTICO", "ZERO DIGITAÇÃO MANUAL", "FIXAÇÃO IMEDIATA"],
      narrationText: "Sabe por que a maioria dos alunos desiste de manter um Caderno de Erros? Porque copiar enunciado e digitar resumo no meio da bateria de questões leva 15 minutos por erro. Você perde o ritmo e abandona no terceiro dia. Olha como o fluxo funciona dentro da TRAUBE: você errou o detalhe do potássio na Cetoacidose Diabética? Em um clique, a plataforma extrai o conceito central do seu erro e gera o flashcard de revisão ativa pronto na sua fila espaçada. Zero planilha, zero trabalho braçal, 100% retenção médica. Conheça o fluxo pelo link da bio!"
    },
    p05: {
      hook: "CHECKLIST DE PREPARAÇÃO PARA AS PROVAS DE 2027",
      uiFocus: "Painel de Cronograma Inteligente da TRAUBE em perspectiva 3D mostrando distribuição semanal de blocos (Clínica Médica, Cirurgia, Pediatria, GO e Preventiva) com barras de progresso luminosas e alerta 'ZERO SOBRECARGA COGNITIVA'",
      clinicalContext: "Planejamento estratégico de longo prazo conciliando rodízios pesados de internato e plantões com metas semanais de 150 a 250 questões comentadas",
      keywords: ["META REALISTA", "PARETO 80/20", "INTERNATO + PROVA", "CONSISTÊNCIA 2027"],
      narrationText: "Quem começa a estudar para a residência tentando cumprir 8 horas líquidas por dia logo depois do plantão do internato quebra na terceira semana. Aprovação em 2027 não é sprint desesperado, é engenharia de consistência. Passo 1: mapear os 20% de temas que concentram 80% das provas. Passo 2: metas diárias baseadas em questões ativas e não em horas de vídeo passivo. Passo 3: blindar o domingo para revisar apenas os erros da semana. Salve esse checklist para consultar o ano inteiro e estruture seu ciclo na TRAUBE!"
    },
    p06: {
      hook: "PLANTÃO RELÂMPAGO: 10 SEGUNDOS PARA DECIDIR A CONDUTA",
      uiFocus: "Monitor multiparamétrico de Sala Vermelha piscando PA 78x42 mmHg, FC 134 bpm, SpO2 88%, lactato 4,8 mmol/L, acompanhado de um cronômetro regressivo de 10 segundos em neon âmbar e 3 opções de conduta flutuando em vidro 3D",
      clinicalContext: "Desafio interativo de Choque Séptico refratário na primeira hora: expansão volêmica cristalóide 30 mL/kg + Noradrenalina precoce + hemoculturas + antibiótico na 1ª hora",
      keywords: ["SALA VERMELHA", "HORA DE OURO", "NORADRENALINA", "QUAL SUA CONDUTA?"],
      narrationText: "Plantão relâmpago na Sala Vermelha! Paciente admitido hipotenso, PA 78 por 42, frequência cardíaca de 134, lactato de 4.8 e foco pulmonar evidente. Você já iniciou o primeiro cristalóide e coletou culturas, mas a pressão arterial média continua em 52. Relógio correndo: você faz mais dois litros de soro rápido, aguarda o efeito do antibiótico ou já entra com Noradrenalina agora? Dez segundos! Comente aqui embaixo qual é a sua conduta imediata e veja a explicação fundamentada no comentário fixado!"
    },
    p07: {
      hook: "5 ERROS SILENCIOSOS QUE CUSTAM A APROVAÇÃO NA RESIDÊNCIA",
      uiFocus: "Sequência cinética de 5 cards holográficos escuros sendo estilhaçados um a um por feixes de laser esmeralda, substituídos pelas métricas reais de evolução do Dashboard TRAUBE",
      clinicalContext: "Diagnóstico dos 5 vícios fatais: 1) Assistir aula em 2x sem fazer questão; 2) Usar resumo de terceiros; 3) Ignorar Preventiva/SUS; 4) Não metrificar taxa de acerto por subespecialidade; 5) Deixar revisão para o último mês",
      keywords: ["ESTUDO PASSIVO", "FALSAFLUÊNCIA", "MÉTRICA REAL", "CADERNO DE ERROS"],
      narrationText: "Cinco erros silenciosos que tiram candidatos brilhantes da lista de aprovados todos os anos. Primeiro: achar que assistir aula em velocidade 2x equivale a aprender. Segundo: estudar por resumo alheio sem construir raciocínio próprio. Terceiro: desprezar Medicina Preventiva, que vale exatamente os mesmos 20% de Clínica Médica. Quarto: resolver questões sem catalogar por que errou. Quinto: estudar no escuro, sem saber sua taxa real de acerto em cada banca. Envie esse vídeo para o seu colega de internato não cair nessa armadilha!"
    }
  };

  function getDefaultPromptsForPost(post) {
    const custom = ULTRA_DETAILED_SPECS[post.id];
    const isVideo = post.format.toLowerCase().includes("reels") || post.format.toLowerCase().includes("motion");
    const hookText = custom ? custom.hook : post.title.toUpperCase();
    const uiFocus = custom
      ? custom.uiFocus
      : `Interface dark-mode da plataforma médica TRAUBE (#0A2342 & #059669 verde esmeralda) em perspectiva isométrica 3D, exibindo fluxogramas clínicos interativos, resolução de questões comentadas e métricas de retenção sobre "${post.title}"`;
    const clinicalContext = custom ? custom.clinicalContext : post.script;
    const keywords = custom ? custom.keywords : [post.pilar.toUpperCase(), "RACIOCÍNIO CLÍNICO", "TRAUBE MED", "ALTA RETENÇÃO"];
    const narrationBody = custom
      ? custom.narrationText
      : `Presta muita atenção nesse ponto que separa quem acerta sob pressão no plantão e na residência de quem cai em pegadinha de prova: ${post.title}. ${post.script} Quando você estrutura esse raciocínio de forma ativa dentro da TRAUBE, cada erro vira um degrau de memorização permanente no seu Caderno de Erros. ${post.cta} e acesse o link da bio para liberar 15 dias gratuitos sem cartão!`;

    const videoPrompt = `[REGRA OBRIGATÓRIA DE GERAÇÃO: Prompt Ultradetalhado · Estética @mentoris / Apple Keynote Dark · PROIBIDO rostos humanos ou avatares de IA · 100% Motion Graphics 3D, Tipografia Cinética & UI Médica Realista]

Format & Technical Specs:
- Aspect Ratio: ${isVideo ? "9:16 Vertical (1080x1920px Reels/TikTok)" : "4:5 Vertical Feed (1080x1350px High-Impact Motion/Carousel)"}
- Frame Rate: 60fps ultra-smooth kinetic motion with realistic optical motion blur (shutter angle 180°).
- Render Engine Style: Octane Render / Unreal Engine 5 UI glassmorphism, deep obsidian background (#050B14 to #0A2342), electric emerald-green (#059669 / #10B981) and medical cyan (#38BDF8) volumetric neon accents, crimson alert highlights (#EF4444).
- STRICT CONSTRAINT: ZERO human faces, ZERO synthetic AI people, ZERO stock actors. Focus 100% on futuristic medical interfaces, 3D diagnostic data, clinical monitors, and kinetic typography.

Scene-by-Scene Cinematography & Motion Choreography:
• [00:00 - 00:03 | PATTERN INTERRUPT HOOK]:
  Camera performs an aggressive Whip-Pan + rapid Dolly-In through dark volumetric hospital/studio space with subtle floating dust particles and digital scanlines.
  A bold, razor-sharp 3D kinetic typography headline snaps onto the center screen letter-by-letter with an emerald-and-amber chromatic aberration glow:
  "${hookText}".
  Subtle red/cyan emergency strobe rim-light pulses on the edges of the frame.

• [00:03 - 00:10 | 3D ISOMETRIC PLATFORM UI REVEAL]:
  Camera tilts into a 15-degree Dutch angle with shallow depth-of-field (f/1.8 bokeh on background grid).
  A sleek, frameless dark-glass tablet/desktop interface of the TRAUBE medical platform floats in 3D space with realistic specular reflections:
  ${uiFocus}.
  Clinical Context Visualized: ${clinicalContext}.

• [00:10 - 00:18 | KINETIC DATA EXPLOSION & ACTIVE RECALL]:
  High-velocity Z-axis camera push-through into the UI layer. Modular glass cards detach in 3D parallax layers.
  Neon medical keywords flash and lock into grid alignment synchronized with the narration rhythm:
  ${keywords.map(k => `"${k}"`).join("  ➔  ")}.
  Animated laser-green progress bars, ECG waveform vectors, and diagnostic decision trees draw themselves in real time.

• [00:18 - End | AUTHORITY & CTA LOCKUP]:
  Smooth orbital camera pull-back revealing the complete TRAUBE ecosystem ("Questões Comentadas + Caderno de Erros + Simulador de Plantão") glowing in emerald green.
  Final clean glass badge snaps into the lower third: "${post.cta.toUpperCase()} · 15 DIAS GRÁTIS NO LINK DA BIO".`;

    const audioPrompt = `[REGRA OBRIGATÓRIA DE ÁUDIO: Locução Humana Ultradetalhada · PT-BR Nativo · Ritmo @mentoris · Zero Voz Robótica]

Direção Vocal & Acústica (Para Gemini Audio / Studio Voice):
- Perfil de Voz: Voz masculina ou feminina jovem-adulta (26 a 32 anos), médico(a) preceptor(a) ou residente-chefe, dicção cristalina, timbre quente e firme.
- Entonação & Cadência: 155 a 165 palavras por minuto (ritmo dinâmico de Reels de alta retenção). Início nos primeiros 2 segundos com ataque incisivo de quebra de padrão; pausas respiratórias curtas e naturais de 0.25s entre frases-chave; ênfase tônica nas palavras técnicas médicas.
- Sound Design Sugerido (Submix): Sub-bass drop discreto em 00:00, cliques mecânicos suaves de interface nas transições de palavras, batida lo-fi dark synth médica instrumental em -18dB.

Texto Exato da Locução (Copiar para síntese):
"${narrationBody}"`;

    const captionPrompt = `🚨 ${post.title}\n\n${post.script}\n\n⚡ Destaques de Prova e Plantão:\n${keywords.map(k => `• ${k}`).join("\n")}\n\n💡 Na TRAUBE, você transforma cada questão resolvida e cada detalhe clínico em memória de longo prazo com repetição espaçada e Caderno de Erros automatizado.\n\n🎯 ${post.cta}!\n🔗 Acesse o link da bio e libere 15 dias gratuitos na TRAUBE (sem cartão de crédito).\n\n#medicina #residenciamedica #internato #plantao #emergenciamedica #enare #uspsp #traube`;

    return { videoPrompt, audioPrompt, captionPrompt };
  }

  // ==============================================================
  // OS 27 POSTS OFICIAIS DO DOSSIÊ COM DATAS POR EXTENSO
  // INÍCIO OFICIAL: 26 DE OUTUBRO DE 2026
  // ==============================================================
  const OFFICIAL_POSTS = [
    // OUTUBRO (Semana 1 · 26/10 a 01/11 - Enchimento de Feed Orgânico & Autoridade)
    { id: "p01", date: "Segunda-feira, 26 de Outubro de 2026", shortDate: "26/10 Seg", month: "2026-10", format: "Carrossel Técnico (7 pág)", pilar: "Educação Médica", title: "Por que você esquece o que estudou na medicina?", cta: "Salve para revisar", status: "aprovado", kanban: "aprovado", script: "Curva do esquecimento de Ebbinghaus aplicada à medicina e a necessidade de repetição ativa espaçada." },
    { id: "p02", date: "Terça-feira, 27 de Outubro de 2026", shortDate: "27/10 Ter", month: "2026-10", format: "Reels Clínico (25s)", pilar: "Educação Médica", title: "Você está no PS: AVC vs Hipoglicemia", cta: "Compartilhe com a equipe", status: "aprovado", kanban: "aprovado", script: "Dilema de emergência nos primeiros 3s: a obrigatoriedade absoluta do HGT na suspeita de déficit neurológico focal." },
    { id: "p03", date: "Quarta-feira, 28 de Outubro de 2026", shortDate: "28/10 Qua", month: "2026-10", format: "Carrossel Técnico (6 pág)", pilar: "Educação Médica", title: "Questão comentada: a pegadinha clássica da banca", cta: "Responda antes do gabarito", status: "aprovado", kanban: "aprovado", script: "Análise minuciosa de distratores de uma questão real de residência com raciocínio clínico aplicado." },
    { id: "p04", date: "Quinta-feira, 29 de Outubro de 2026", shortDate: "29/10 Qui", month: "2026-10", format: "Reels de Produto (30s)", pilar: "Produto TRAUBE", title: "Do erro na questão ao flashcard automático", cta: "Conheça o fluxo", status: "revisao", kanban: "design", script: "Demonstração sem enrolação de como a TRAUBE transforma um erro de estudo em fixação no mesmo minuto." },
    { id: "p05", date: "Sexta-feira, 30 de Outubro de 2026", shortDate: "30/10 Sex", month: "2026-10", format: "Carrossel (6 pág)", pilar: "Planejamento", title: "Checklist de preparação para as provas de 2027", cta: "Salve para o ano todo", status: "revisao", kanban: "design", script: "Como organizar os blocos de estudo sem sobrecarga cognitiva: metas realistas para internato e residência." },
    { id: "p06", date: "Sábado, 31 de Outubro de 2026", shortDate: "31/10 Sáb", month: "2026-10", format: "Reels Desafio (20s)", pilar: "Educação Médica", title: "Plantão Relâmpago: qual é a conduta imediata?", cta: "Comente sua conduta", status: "pauta", kanban: "roteiro", script: "Desafio interativo de pronto-socorro para gerar comentários e engajamento orgânico máximo." },
    { id: "p07", date: "Domingo, 01 de Novembro de 2026", shortDate: "01/11 Dom", month: "2026-11", format: "Carrossel Técnico (7 pág)", pilar: "Educação Médica", title: "Cinco erros que custam a aprovação na residência", cta: "Envie a um colega", status: "pauta", kanban: "roteiro", script: "Estudo passivo por resumos alheios, negligência do caderno de erros e falta de simulação prática." },

    // NOVEMBRO (Semana 2 em diante: Tráfego Pago R$ 20/sem para Ganhar Seguidores + Operação Black November)
    { id: "p08", date: "Segunda-feira, 02 de Novembro de 2026", shortDate: "02/11 Seg", month: "2026-11", format: "Carrossel Técnico (7 pág)", pilar: "Educação Médica", title: "Sepse: cinco erros que custam uma questão", cta: "Salve para revisar", status: "revisao", kanban: "ciencia", script: "Reconhecimento de sepse, sinais de alerta, conduta fundamentada e resumo de 30 segundos. [Candidato ao Impulsionamento R$ 20]" },
    { id: "p09", date: "Terça-feira, 03 de Novembro de 2026", shortDate: "03/11 Ter", month: "2026-11", format: "Reels Educativo (25-30s)", pilar: "Educação Médica", title: "Estudar seis horas não garante aprender mais", cta: "Envie a um amigo", status: "pauta", kanban: "roteiro", script: "Releitura passiva versus active recall com repetição espaçada. Metodologia médica comprovada." },
    { id: "p10", date: "Quinta-feira, 05 de Novembro de 2026", shortDate: "05/11 Qui", month: "2026-11", format: "Carrossel Técnico (7 pág)", pilar: "Educação Médica", title: "Questão comentada: pré-eclâmpsia grave", cta: "Responda primeiro", status: "pauta", kanban: "roteiro", script: "Caso clínico de pré-eclâmpsia grave, conduta conforme FEBRASGO/MS e distratores explicados." },
    { id: "p11", date: "Sábado, 07 de Novembro de 2026", shortDate: "07/11 Sáb", month: "2026-11", format: "Reels de Produto (30s)", pilar: "Produto TRAUBE", title: "Entrando na Sala de Emergência da TRAUBE", cta: "Conheça o simulador", status: "pauta", kanban: "roteiro", script: "Você assumiu o plantão: tomada de decisão no simulador com debriefing imediato e sem risco real." },
    { id: "p12", date: "Segunda-feira, 09 de Novembro de 2026", shortDate: "09/11 Seg", month: "2026-11", format: "Reels de Oferta (20-25s)", pilar: "Oferta VIP", title: "Pré-Lista VIP: Primeiras ativações gratuitas", cta: "Receba seu convite", status: "ideia", kanban: "ideia", script: "Liberação progressiva dos primeiros convites da pré-lista VIP por coortes individuais com 15 dias sem cartão." },
    { id: "p13", date: "Terça-feira, 10 de Novembro de 2026", shortDate: "10/11 Ter", month: "2026-11", format: "Carrossel Técnico (6 pág)", pilar: "Educação Médica", title: "ECG: três sinais que você não deve ignorar", cta: "Salve e compartilhe", status: "ideia", kanban: "ideia", script: "Sequência sistemática diante de um traçado real de eletrocardiograma no pronto-socorro." },
    { id: "p14", date: "Quinta-feira, 12 de Novembro de 2026", shortDate: "12/11 Qui", month: "2026-11", format: "Reels de Produto (20-30s)", pilar: "Produto TRAUBE", title: "Errou uma questão? O estudo não termina aqui", cta: "Experimente a TRAUBE", status: "ideia", kanban: "ideia", script: "Como transformar a frustração do erro em memorização definitiva através do Caderno de Erros TRAUBE." },
    { id: "p15", date: "Sábado, 14 de Novembro de 2026", shortDate: "14/11 Sáb", month: "2026-11", format: "Carrossel Técnico (6 pág)", pilar: "Planejamento", title: "Como organizar 30 minutos de estudo diário", cta: "Salve a rotina", status: "ideia", kanban: "ideia", script: "5 min de planejamento, 15 min de questões focadas e 10 min de revisão com foco cirúrgico." },
    { id: "p16", date: "Segunda-feira, 16 de Novembro de 2026", shortDate: "16/11 Seg", month: "2026-11", format: "Reels de Produto (25-35s)", pilar: "Produto TRAUBE", title: "Sua evolução médica sem planilhas manuais", cta: "Conheça a TRAUBE", status: "ideia", kanban: "ideia", script: "Painel analítico da TRAUBE mostrando pontos fortes e fracos sem necessidade de preencher planilhas manuais." },
    { id: "p17", date: "Terça-feira, 17 de Novembro de 2026", shortDate: "17/11 Ter", month: "2026-11", format: "Carrossel Técnico (7 pág)", pilar: "Educação Médica", title: "Desidratação pediátrica: raciocínio clínico", cta: "Teste-se", status: "ideia", kanban: "ideia", script: "Avaliação da gravidade do estado de hidratação e reposição conforme protocolo pediátrico do Ministério da Saúde." },
    { id: "p18", date: "Quinta-feira, 19 de Novembro de 2026", shortDate: "19/11 Qui", month: "2026-11", format: "Reels de Produto (20-30s)", pilar: "Produto TRAUBE", title: "O que será o Modo Trabalho?", cta: "Entre na lista beta", status: "ideia", kanban: "ideia", script: "Conceito do módulo de gestão do trabalho e plantões para médicos em fase beta." },
    { id: "p19", date: "Sábado, 21 de Novembro de 2026", shortDate: "21/11 Sáb", month: "2026-11", format: "Carrossel Técnico (6 pág)", pilar: "Planejamento", title: "Checklist de grandes temas para 2027", cta: "Salve para consultar", status: "ideia", kanban: "ideia", script: "Distribuição de matérias por peso nas grandes bancas de residência médica (ENARE, USP, SUS-SP)." },
    { id: "p20", date: "Segunda-feira, 23 de Novembro de 2026", shortDate: "23/11 Seg", month: "2026-11", format: "Motion Design (15-20s)", pilar: "Oferta Oficial", title: "Começou a Black Week TRAUBE", cta: "Conheça as condições", status: "ideia", kanban: "ideia", script: "Início oficial da Black Week. Condições transparentes liberadas no site oficial com 15 dias sem risco." },
    { id: "p21", date: "Terça-feira, 24 de Novembro de 2026", shortDate: "24/11 Ter", month: "2026-11", format: "Carrossel Comparativo (6 pág)", pilar: "Oferta Oficial", title: "Essential ou Pro: qual plano é para você?", cta: "Compare os planos", status: "ideia", kanban: "ideia", script: "Tabela comparativa direta e honesta entre os planos Essential e Pro, sem letras miúdas." },
    { id: "p22", date: "Quarta-feira, 25 de Novembro de 2026", shortDate: "25/11 Qua", month: "2026-11", format: "Reels de Produto (25-30s)", pilar: "Produto TRAUBE", title: "Do caso clínico ao aprendizado completo", cta: "Experimente o fluxo", status: "ideia", kanban: "ideia", script: "Demonstração do ciclo completo: Caso Clínico -> Decisão -> Debriefing Científico -> Flashcard de Fixação." },
    { id: "p23", date: "Quinta-feira, 26 de Novembro de 2026", shortDate: "26/11 Qui", month: "2026-11", format: "Carrossel de FAQ (8 pág)", pilar: "Oferta Oficial", title: "FAQ: 15 dias gratuitos e Black Week", cta: "Tire suas dúvidas", status: "ideia", kanban: "ideia", script: "Respostas transparentes sobre cobrança, ativação, período de teste e cancelamento em 1 clique." },
    { id: "p24", date: "Sexta-feira, 27 de Novembro de 2026", shortDate: "27/11 Sex", month: "2026-11", format: "Reels Black Friday (30-35s)", pilar: "Oferta Oficial", title: "Black Friday TRAUBE: condição principal liberada", cta: "Assine pela oferta", status: "ideia", kanban: "ideia", script: "Vídeo principal da Black Friday com demonstração ao vivo e condições exclusivas de assinatura anual." },
    { id: "p25", date: "Sábado, 28 de Novembro de 2026", shortDate: "28/11 Sáb", month: "2026-11", format: "Reels Desafio (20s)", pilar: "Educação Médica", title: "Plantão Relâmpago de Fim de Semana", cta: "Qual sua conduta?", status: "ideia", kanban: "ideia", script: "Desafio interativo com caso clínico de rápida tomada de decisão para mobilizar engajamento." },
    { id: "p26", date: "Domingo, 29 de Novembro de 2026", shortDate: "29/11 Dom", month: "2026-11", format: "Motion Design (15s)", pilar: "Oferta Oficial", title: "Últimas horas da Black Week TRAUBE", cta: "Veja o prazo final", status: "ideia", kanban: "ideia", script: "Encerramento verdadeiro no horário oficial informado no site. Sem falsas extensões de prazo." },
    { id: "p27", date: "Segunda-feira, 30 de Novembro de 2026", shortDate: "30/11 Seg", month: "2026-11", format: "Carrossel Onboarding (7 pág)", pilar: "Produto TRAUBE", title: "Seus primeiros sete dias de estudos na TRAUBE", cta: "Comece seu cronograma", status: "ideia", kanban: "ideia", script: "Guia passo a passo de onboarding para novos assinantes e membros do teste gratuito de 15 dias." }
  ];

  // ==============================================================
  // GRADE DE STORIES (30 DIAS DE NOVEMBRO - DOSSIÊ PÁGINA 17)
  // ==============================================================
  const STORIES_30_DAYS = [
    { day: "01/11", idea: "Qual área foi mais difícil nesta semana?", resource: "Enquete interativa" },
    { day: "02/11", idea: "Quiz sepse: o que chama atenção?", resource: "Quiz de múltipla escolha" },
    { day: "03/11", idea: "Você costuma testar memória sem olhar o gabarito?", resource: "Enquete Sim/Não" },
    { day: "04/11", idea: "Bastidores da revisão científica de questões", resource: "Vídeo curto" },
    { day: "05/11", idea: "Resolva a alternativa clássica de GO", resource: "Quiz de conduta" },
    { day: "06/11", idea: "Teaser da Sala de Emergência em ação", resource: "Vídeo de tela" },
    { day: "07/11", idea: "Escolha sua conduta no simulador clínico", resource: "Enquete de decisão" },
    { day: "08/11", idea: "Como começar a semana com metas claras", resource: "Checklist em carrossel" },
    { day: "09/11", idea: "Perguntas sobre a ativação gratuita de 15 dias", resource: "Caixa de perguntas" },
    { day: "10/11", idea: "ECG no PS: verdadeiro ou falso?", resource: "Quiz rápido" },
    { day: "11/11", idea: "Qual o seu maior erro na hora da revisão?", resource: "Enquete de dores" },
    { day: "12/11", idea: "Tour pelo fluxo do Caderno de Erros", resource: "Gravação de tela" },
    { day: "13/11", idea: "FAQ dos 15 dias gratuitos sem cartão", resource: "Caixa de dúvidas" },
    { day: "14/11", idea: "30 minutos: monte sua rotina diária", resource: "Checklist prático" },
    { day: "15/11", idea: "Sua meta para esta nova semana de estudos", resource: "Enquete interativa" },
    { day: "16/11", idea: "Tour pelas métricas e gráficos do Dashboard", resource: "Vídeo de produto" },
    { day: "17/11", idea: "Caso de desidratação pediátrica no PS", resource: "Quiz de caso" },
    { day: "18/11", idea: "O que você quer aprender no Modo Trabalho?", resource: "Caixa de sugestões" },
    { day: "19/11", idea: "Status real da versão beta do Modo Trabalho", resource: "Bastidores de dev" },
    { day: "20/11", idea: "Preparação para a Black Week oficial TRAUBE", resource: "Aviso de oferta" },
    { day: "21/11", idea: "Checklist 2027 interativo para salvar", resource: "Sticker de interação" },
    { day: "22/11", idea: "Últimas dúvidas antes da abertura da Black Week", resource: "Caixa de perguntas" },
    { day: "23/11", idea: "Condições abertas: acesse o link oficial", resource: "Link com CTA" },
    { day: "24/11", idea: "Comparação detalhada: Essential vs Pro", resource: "Cards de FAQ" },
    { day: "25/11", idea: "Caso clínico completo resolvido na plataforma", resource: "Tour guiado" },
    { day: "26/11", idea: "Tire dúvidas sobre pagamento, teste e cancelamento", resource: "Cards explicativos" },
    { day: "27/11", idea: "Black Friday TRAUBE: reforço com transparência", resource: "Link oficial" },
    { day: "28/11", idea: "Plantão Relâmpago: qual seria a sua conduta?", resource: "Enquete clínica" },
    { day: "29/11", idea: "Encerramento verdadeiro: contagem de horas", resource: "Aviso de término" },
    { day: "30/11", idea: "Primeiros passos após cadastro na plataforma", resource: "Tutorial de onboarding" }
  ];

  // FUNÇÕES DE SEGURANÇA E PIN
  function adminPinGraceStorageKey() {
    const userId = String(state.user?.id || window.docmapUser?.id || "admin");
    return `${ADMIN_PIN_GRACE_KEY}:${userId}`;
  }

  function rememberAdminPinUnlock() {
    try {
      localStorage.setItem(adminPinGraceStorageKey(), String(Date.now() + ADMIN_PIN_GRACE_MS));
    } catch (_) {}
  }

  function hasRecentAdminPinUnlock() {
    try {
      const key = adminPinGraceStorageKey();
      const expiresAt = Number(localStorage.getItem(key) || 0);
      return Number.isFinite(expiresAt) && expiresAt > Date.now();
    } catch (_) {
      return false;
    }
  }

  function normalizePin(value) {
    return String(value || "").replace(/\D/g, "").slice(0, 6);
  }

  function setPinMessage(text, type = "") {
    const message = $("admin-pin-message");
    if (!message) return;
    message.textContent = text;
    message.className = `admin-pin-message ${type}`.trim();
  }

  function setPinGateMode(hasPin) {
    state.pinConfigured = Boolean(hasPin);
    const fields = $("admin-pin-fields");
    const confirmWrap = $("admin-pin-confirm-wrap");
    const title = $("admin-pin-title");
    const description = $("admin-pin-description");
    const label = $("admin-pin-label");
    const submit = $("admin-pin-submit");

    if (fields) fields.hidden = false;
    if (confirmWrap) confirmWrap.hidden = state.pinConfigured;
    if (title) title.textContent = state.pinConfigured ? "Digite seu PIN" : "Cadastre seu PIN";
    if (description) description.textContent = state.pinConfigured ? "Digite os 6 dígitos do Admin para abrir o Marketing Hub." : "Crie um PIN de 6 dígitos.";
    if (label) label.textContent = state.pinConfigured ? "PIN de 6 dígitos" : "Criar PIN";
    if (submit) {
      submit.textContent = state.pinConfigured ? "Desbloquear Marketing" : "Cadastrar PIN";
      submit.disabled = false;
    }
    setPinMessage(state.pinConfigured ? "Área protegida por PIN." : "PIN protegido e sincronizado.");
  }

  async function loadPinStatus() {
    const sb = window.supabaseClient || window.sb;
    if (!sb) return false;
    const { data, error } = await sb.rpc("admin_pin_status");
    if (error) throw error;
    setPinGateMode(data?.has_pin === true);
    return data?.has_pin === true;
  }

  async function unlockEditorialPage() {
    state.pinUnlocked = true;
    const gate = $("admin-pin-gate");
    const app = $("editorial-app");
    document.body.classList.remove("admin-pin-locked");
    document.body.classList.add("admin-unlocked");
    if (gate) gate.hidden = true;
    if (app) app.hidden = false;
    await loadPostAssetsFromDb();
    renderCurrentView();
  }

  async function submitEditorialPin(event) {
    event.preventDefault();
    const pin = normalizePin($("admin-pin")?.value);
    const confirmPin = normalizePin($("admin-pin-confirm")?.value);
    const submit = $("admin-pin-submit");

    if (pin.length !== 6) {
      setPinMessage("Digite exatamente 6 números.", "error");
      return;
    }

    if (!state.pinConfigured && pin !== confirmPin) {
      setPinMessage("Os PINs digitados não coincidem.", "error");
      return;
    }

    if (submit) {
      submit.disabled = true;
      submit.textContent = "Verificando...";
    }

    const sb = window.supabaseClient || window.sb;
    try {
      if (!state.pinConfigured) {
        const { data, error } = await sb.rpc("admin_set_pin", { p_pin: pin });
        if (error || data !== true) throw error || new Error("Falha ao salvar PIN.");
        setPinMessage("PIN cadastrado.", "success");
        rememberAdminPinUnlock();
        unlockEditorialPage();
        return;
      }

      const { data, error } = await sb.rpc("admin_verify_pin", { p_pin: pin });
      if (error) throw error;

      if (data?.ok === true) {
        setPinMessage("Acesso liberado.", "success");
        rememberAdminPinUnlock();
        unlockEditorialPage();
      } else {
        setPinMessage(data?.message || "PIN incorreto.", "error");
        if (submit) { submit.disabled = false; submit.textContent = "Tentar Novamente"; }
      }
    } catch (err) {
      setPinMessage("Erro ao autenticar.", "error");
      if (submit) { submit.disabled = false; submit.textContent = "Desbloquear Marketing"; }
    }
  }

  // ==============================================================
  // GESTÃO DE PROMPTS E STAGING DE VÍDEO (FLUXO ZERO CUSTO / AUTO-LIMPEZA)
  // ==============================================================
  async function loadPostAssetsFromDb() {
    try {
      const sb = window.supabaseClient || window.sb;
      if (!sb) return;
      const { data, error } = await sb.from("marketing_post_assets").select("*");
      if (!error && Array.isArray(data)) {
        const map = {};
        data.forEach(row => { map[row.post_id] = row; });
        state.postAssetsMap = map;
      }
    } catch (_) {}
  }

  function getPostAssetState(post) {
    const dbRow = state.postAssetsMap[post.id] || {};
    let localOverride = {};
    try {
      localOverride = JSON.parse(localStorage.getItem(`traube_post_asset_${post.id}`) || "{}");
    } catch (_) {}

    const defaults = getDefaultPromptsForPost(post);
    return {
      post_id: post.id,
      title: post.title,
      scheduled_date: post.date,
      video_prompt: dbRow.video_prompt || localOverride.video_prompt || defaults.videoPrompt,
      audio_prompt: dbRow.audio_prompt || localOverride.audio_prompt || defaults.audioPrompt,
      caption_prompt: dbRow.caption_prompt || localOverride.caption_prompt || defaults.captionPrompt,
      video_storage_path: dbRow.video_storage_path || localOverride.video_storage_path || null,
      video_public_url: dbRow.video_public_url || localOverride.video_public_url || null,
      video_filename: dbRow.video_filename || localOverride.video_filename || null,
      meta_ads_status: dbRow.meta_ads_status || localOverride.meta_ads_status || "aguardando_video",
      cleaned_at: dbRow.cleaned_at || localOverride.cleaned_at || null
    };
  }

  function renderPostStagingBadge(post) {
    const asset = getPostAssetState(post);
    if (asset.meta_ads_status === "publicado_e_limpo") {
      return `<div style="font-size:0.74rem; padding:0.35rem 0.6rem; border-radius:6px; background:rgba(56,189,248,0.12); color:#38bdf8; border:1px solid rgba(56,189,248,0.3);">🧹 Postado no Meta Ads · Vídeo apagado do site (0 MB)</div>`;
    }
    if (asset.video_public_url) {
      return `<div style="font-size:0.74rem; padding:0.35rem 0.6rem; border-radius:6px; background:rgba(52,211,153,0.15); color:#34d399; border:1px solid rgba(52,211,153,0.4);">🎬 Vídeo pronto carregado (${asset.video_filename || 'MP4'}) · Aguardando dia de postar</div>`;
    }
    return `<div style="font-size:0.74rem; padding:0.35rem 0.6rem; border-radius:6px; background:rgba(255,255,255,0.05); color:#94a3b8; border:1px solid rgba(255,255,255,0.08);">✨ Prompts Gemini prontos · Sem vídeo anexado</div>`;
  }

  function openPostStudioModal(postId) {
    const post = OFFICIAL_POSTS.find(p => p.id === postId);
    if (!post) return;
    state.activeModalPostId = post.id;

    const asset = getPostAssetState(post);
    const overlay = $("post-studio-modal-overlay");
    if (!overlay) return;

    $("studio-modal-meta").textContent = `${post.date} · ${post.format}`;
    $("studio-modal-title").textContent = post.title;
    $("studio-video-prompt").value = asset.video_prompt;
    $("studio-audio-prompt").value = asset.audio_prompt;
    $("studio-caption-prompt").value = asset.caption_prompt;

    updateModalVideoUI(asset);
    overlay.hidden = false;
  }

  function updateModalVideoUI(asset) {
    const badge = $("studio-video-status-badge");
    const previewContainer = $("studio-video-preview-container");
    const player = $("studio-video-player");
    const info = $("studio-video-info");
    const downloadBtn = $("btn-download-staged-video");

    if (!badge || !previewContainer) return;

    if (asset.meta_ads_status === "publicado_e_limpo") {
      badge.className = "video-status-pill cleaned";
      badge.textContent = "Publicado no Meta Ads & Limpo (0 MB)";
      previewContainer.hidden = true;
      player.removeAttribute("src");
    } else if (asset.video_public_url) {
      badge.className = "video-status-pill ready";
      badge.textContent = "Vídeo Carregado · Pronto p/ Postar";
      previewContainer.hidden = false;
      player.src = asset.video_public_url;
      if (info) info.textContent = `Arquivo ativo no site: ${asset.video_filename || "video.mp4"}`;
      if (downloadBtn) downloadBtn.href = asset.video_public_url;
    } else {
      badge.className = "video-status-pill waiting";
      badge.textContent = "Aguardando Upload do Vídeo";
      previewContainer.hidden = true;
      player.removeAttribute("src");
    }
  }

  async function saveCurrentModalPrompts() {
    const postId = state.activeModalPostId;
    const post = OFFICIAL_POSTS.find(p => p.id === postId);
    if (!post) return;

    const current = getPostAssetState(post);
    const updated = {
      ...current,
      video_prompt: $("studio-video-prompt")?.value || "",
      audio_prompt: $("studio-audio-prompt")?.value || "",
      caption_prompt: $("studio-caption-prompt")?.value || "",
      updated_at: new Date().toISOString()
    };

    state.postAssetsMap[postId] = updated;
    try {
      localStorage.setItem(`traube_post_asset_${postId}`, JSON.stringify(updated));
    } catch (_) {}

    const btn = $("btn-save-prompts");
    if (btn) btn.textContent = "Salvando...";

    try {
      const sb = window.supabaseClient || window.sb;
      if (sb) {
        await sb.from("marketing_post_assets").upsert(updated, { onConflict: "post_id" });
      }
      if (btn) {
        btn.textContent = "✅ Prompts Salvos!";
        setTimeout(() => { btn.textContent = "💾 Salvar Edições dos Prompts"; }, 2000);
      }
    } catch (_) {
      if (btn) btn.textContent = "✅ Salvo Localmente";
    }
  }

  async function uploadVideoForActivePost() {
    const postId = state.activeModalPostId;
    const post = OFFICIAL_POSTS.find(p => p.id === postId);
    const fileInput = $("studio-video-file-input");
    const btn = $("btn-upload-video");

    if (!post || !fileInput || !fileInput.files || fileInput.files.length === 0) {
      alert("Selecione o arquivo de vídeo (.mp4 / .mov) gerado no Gemini primeiro.");
      return;
    }

    const file = fileInput.files[0];
    const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, "_");
    const storagePath = `${postId}/${Date.now()}_${safeName}`;

    if (btn) {
      btn.disabled = true;
      btn.textContent = "⏳ Enviando vídeo pro site...";
    }

    try {
      const sb = window.supabaseClient || window.sb;
      let publicUrl = "";

      if (sb && sb.storage) {
        // Se já havia um vídeo antigo para este post, remove antes para não acumular espaço
        const prev = getPostAssetState(post);
        if (prev.video_storage_path) {
          await sb.storage.from(STORAGE_BUCKET).remove([prev.video_storage_path]);
        }

        const { error: upErr } = await sb.storage.from(STORAGE_BUCKET).upload(storagePath, file, {
          cacheControl: "3600",
          upsert: true
        });
        if (upErr) throw upErr;

        const { data: pubData } = sb.storage.from(STORAGE_BUCKET).getPublicUrl(storagePath);
        publicUrl = pubData?.publicUrl || "";
      } else {
        publicUrl = URL.createObjectURL(file);
      }

      const current = getPostAssetState(post);
      const updated = {
        ...current,
        video_prompt: $("studio-video-prompt")?.value || current.video_prompt,
        audio_prompt: $("studio-audio-prompt")?.value || current.audio_prompt,
        caption_prompt: $("studio-caption-prompt")?.value || current.caption_prompt,
        video_storage_path: storagePath,
        video_public_url: publicUrl,
        video_filename: file.name,
        video_uploaded_at: new Date().toISOString(),
        meta_ads_status: "pronto_para_postar",
        updated_at: new Date().toISOString()
      };

      state.postAssetsMap[postId] = updated;
      try {
        localStorage.setItem(`traube_post_asset_${postId}`, JSON.stringify(updated));
      } catch (_) {}

      if (sb) {
        await sb.from("marketing_post_assets").upsert(updated, { onConflict: "post_id" });
      }

      updateModalVideoUI(updated);
      renderCurrentView();
      fileInput.value = "";
    } catch (err) {
      console.error("[Upload Video Error]", err);
      alert("Erro ao enviar o vídeo: " + (err.message || "Tente novamente."));
    } finally {
      if (btn) {
        btn.disabled = false;
        btn.textContent = "⬆️ Subir Vídeo para Este Post";
      }
    }
  }

  async function publishToMetaAndCleanVideo(isManualDeleteOnly = false) {
    const postId = state.activeModalPostId;
    const post = OFFICIAL_POSTS.find(p => p.id === postId);
    if (!post) return;

    const current = getPostAssetState(post);
    const btnPub = $("btn-publish-and-clean");
    const btnDel = $("btn-delete-staged-video");

    if (btnPub) btnPub.disabled = true;
    if (btnDel) btnDel.disabled = true;

    try {
      const sb = window.supabaseClient || window.sb;

      // 1. Apagar o arquivo físico do bucket do site para liberar 100% do espaço
      if (sb && sb.storage && current.video_storage_path) {
        await sb.storage.from(STORAGE_BUCKET).remove([current.video_storage_path]);
      }

      // 2. Atualizar status no banco e na interface
      const updated = {
        ...current,
        video_storage_path: null,
        video_public_url: null,
        video_filename: null,
        meta_ads_status: isManualDeleteOnly ? "aguardando_video" : "publicado_e_limpo",
        published_at: isManualDeleteOnly ? current.published_at : new Date().toISOString(),
        cleaned_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };

      if (!isManualDeleteOnly) {
        post.status = "publicado";
        post.kanban = "publicado";
      }

      state.postAssetsMap[postId] = updated;
      try {
        localStorage.setItem(`traube_post_asset_${postId}`, JSON.stringify(updated));
      } catch (_) {}

      if (sb) {
        await sb.from("marketing_post_assets").upsert(updated, { onConflict: "post_id" });
      }

      updateModalVideoUI(updated);
      renderCurrentView();
    } catch (err) {
      console.error("[Clean Video Error]", err);
    } finally {
      if (btnPub) btnPub.disabled = false;
      if (btnDel) btnDel.disabled = false;
    }
  }

  function copyTextareaWithFeedback(textareaId, buttonId) {
    const el = $(textareaId);
    const btn = $(buttonId);
    if (!el) return;
    navigator.clipboard.writeText(el.value || "");
    if (btn) {
      const original = btn.textContent;
      btn.textContent = "✅ Copiado!";
      setTimeout(() => { btn.textContent = original; }, 1800);
    }
  }

  function setupPostStudioModalListeners() {
    $("studio-modal-close")?.addEventListener("click", () => {
      const overlay = $("post-studio-modal-overlay");
      const player = $("studio-video-player");
      if (player) player.pause();
      if (overlay) overlay.hidden = true;
    });

    $("btn-copy-video-prompt")?.addEventListener("click", () => copyTextareaWithFeedback("studio-video-prompt", "btn-copy-video-prompt"));
    $("btn-copy-audio-prompt")?.addEventListener("click", () => copyTextareaWithFeedback("studio-audio-prompt", "btn-copy-audio-prompt"));
    $("btn-copy-caption-prompt")?.addEventListener("click", () => copyTextareaWithFeedback("studio-caption-prompt", "btn-copy-caption-prompt"));

    $("btn-regenerate-ultra-prompt")?.addEventListener("click", () => {
      const post = OFFICIAL_POSTS.find(p => p.id === state.activeModalPostId);
      if (!post) return;
      const ultra = getDefaultPromptsForPost(post);
      if ($("studio-video-prompt")) $("studio-video-prompt").value = ultra.videoPrompt;
      if ($("studio-audio-prompt")) $("studio-audio-prompt").value = ultra.audioPrompt;
      if ($("studio-caption-prompt")) $("studio-caption-prompt").value = ultra.captionPrompt;
      saveCurrentModalPrompts();
    });

    $("btn-save-prompts")?.addEventListener("click", saveCurrentModalPrompts);
    $("btn-upload-video")?.addEventListener("click", uploadVideoForActivePost);
    $("btn-publish-and-clean")?.addEventListener("click", () => publishToMetaAndCleanVideo(false));
    $("btn-delete-staged-video")?.addEventListener("click", () => publishToMetaAndCleanVideo(true));

    // Delegação global para botões "Prompts & Subir Vídeo" e "Copiar Prompt" direto nos cards
    document.addEventListener("click", (e) => {
      const copyDirectBtn = e.target.closest("[data-copy-prompt-post]");
      if (copyDirectBtn) {
        e.preventDefault();
        e.stopPropagation();
        const postId = copyDirectBtn.getAttribute("data-copy-prompt-post");
        const promptType = copyDirectBtn.getAttribute("data-prompt-type") || "all";
        const post = OFFICIAL_POSTS.find(p => p.id === postId);
        if (!post) return;
        const asset = getPostAssetState(post);
        let textToCopy = asset.video_prompt;
        if (promptType === "audio") textToCopy = asset.audio_prompt;
        else if (promptType === "all") {
          textToCopy = `${asset.video_prompt}\n\n========================================\n\n${asset.audio_prompt}\n\n========================================\n\nLEGENDA INSTAGRAM:\n${asset.caption_prompt}`;
        }
        navigator.clipboard.writeText(textToCopy);
        const origText = copyDirectBtn.innerHTML;
        copyDirectBtn.innerHTML = "✅ Prompt Ultradetalhado Copiado!";
        setTimeout(() => { copyDirectBtn.innerHTML = origText; }, 2000);
        return;
      }

      const copyStoryBtn = e.target.closest("[data-copy-story-prompt]");
      if (copyStoryBtn) {
        e.preventDefault();
        e.stopPropagation();
        const day = copyStoryBtn.getAttribute("data-copy-story-prompt");
        const story = STORIES_30_DAYS.find(s => s.day === day);
        if (!story) return;
        const storyUltraPrompt = `[REGRA OBRIGATÓRIA: Prompt Ultradetalhado de Story 9:16 (1080x1920px) · Estilo @mentoris · Zero Rostos de IA]\n- Dia: ${story.day} | Recurso Nativo: ${story.resource}\n- Ideia Central: "${story.idea}"\n- Visual Direction: Fundo dark-mode obsidiana (#0A2342) com iluminação volumétrica verde esmeralda (#10B981), card de vidro fosco flutuante em perspectiva 3D da plataforma TRAUBE no topo, tipografia cinética neon centralizada e espaço reservado no terço inferior para o sticker interativo de ${story.resource}.`;
        navigator.clipboard.writeText(storyUltraPrompt);
        const origText = copyStoryBtn.innerHTML;
        copyStoryBtn.innerHTML = "✅ Prompt Copiado!";
        setTimeout(() => { copyStoryBtn.innerHTML = origText; }, 1800);
        return;
      }

      const trigger = e.target.closest("[data-open-studio-post]");
      if (trigger) {
        e.preventDefault();
        e.stopPropagation();
        const postId = trigger.getAttribute("data-open-studio-post");
        openPostStudioModal(postId);
      }
    });
  }

  // ==============================================================
  // TELAS DE RENDERIZAÇÃO
  // ==============================================================

  // 1. PLANNER SEMANAL (Página 10)
  function renderWeeklyPlanner() {
    const container = $("editorial-view-container");
    if (!container) return;

    // Filtra posts da semana atual
    const currentWeekPosts = OFFICIAL_POSTS.slice(0, 7);

    container.innerHTML = `
      <div style="margin-bottom:1rem; padding:0.75rem 1rem; border-radius:10px; background:rgba(56,189,248,0.08); border:1px solid rgba(56,189,248,0.25); display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:0.5rem;">
        <span style="font-size:0.82rem; color:#e2e8f0;">⚡ <strong>Regra Ativa:</strong> Todos os posts geram automaticamente <strong>Prompts Ultradetalhados</strong> (60fps, estética @mentoris, 3D UI TRAUBE, zero rostos de IA).</span>
        <span style="font-size:0.75rem; color:#38bdf8; font-weight:700;">Clique em "📋 Copiar Prompt" em qualquer card ou abra o Estúdio do post</span>
      </div>
      <div id="editorial-planner-board" class="editorial-planner-board">
        ${currentWeekPosts.map(post => `
          <div class="editorial-day-col has-post">
            <div class="editorial-col-header">
              <div class="editorial-col-day">
                <span>${post.date}</span>
                <small>${post.pilar}</small>
              </div>
              <span class="editorial-col-count active-count">1 post</span>
            </div>
            <div class="editorial-col-body">
              <article class="planner-card">
                <div class="planner-card-top">
                  <span class="planner-time">⚡ ${post.format}</span>
                  <span class="planner-badge badge-${post.status === 'publicado' ? 'ready' : post.status === 'aprovado' ? 'progress' : 'planned'}">${post.status}</span>
                </div>
                <h4 class="planner-title">${post.title}</h4>
                <div class="planner-study">
                  <strong>🎯 CTA:</strong>
                  <p>${post.cta}</p>
                </div>
                <div class="planner-action">
                  <strong>📝 Briefing & Roteiro:</strong>
                  <p>${post.script}</p>
                </div>
                ${renderPostStagingBadge(post)}
                <div style="display:flex; flex-direction:column; gap:0.45rem; margin-top:0.25rem;">
                  <button type="button" data-copy-prompt-post="${post.id}" data-prompt-type="all" class="prompt-btn-copy" style="width:100%; padding:0.5rem; font-size:0.78rem; text-align:center;">
                    📋 Copiar Prompt Ultradetalhado
                  </button>
                  <button type="button" data-open-studio-post="${post.id}" class="button primary planner-card-btn" style="width:100%; justify-content:center;">
                    🎬 Editar Prompt & Subir Vídeo
                  </button>
                  <a href="${DRIVE_FOLDER}" target="_blank" rel="noopener noreferrer" class="button secondary planner-card-btn" style="width:100%; justify-content:center;">
                    📂 Ver no Drive
                  </a>
                </div>
              </article>
            </div>
          </div>
        `).join("")}
      </div>
    `;
  }

  // 2. CRONOGRAMA DAS 27 PEÇAS (Páginas 10 e 11)
  function renderMonthlySchedule() {
    const container = $("editorial-view-container");
    if (!container) return;

    const filtered = OFFICIAL_POSTS.filter(p => p.month === state.selectedMonth);

    container.innerHTML = `
      <div class="editorial-month-meta-bar">
        <div class="month-headline">
          <strong>${state.selectedMonth === "2026-10" ? "Outubro 2026 (Aquecimento & Pré-lista)" : state.selectedMonth === "2026-11" ? "Novembro 2026 (Black Week Oficial & 15 Dias)" : "Dezembro 2026 (Retenção 2027)"}</strong>
          <span>${filtered.length} publicações com Regra de Prompt Ultradetalhado (@mentoris 3D UI), botão de cópia rápida, upload de vídeo e auto-limpeza pós-Meta Ads.</span>
        </div>
        <div class="month-kpis">
          <div class="month-kpi-item">
            <small>Posts no Mês</small>
            <strong>${filtered.length}</strong>
          </div>
          <div class="month-kpi-item">
            <small>Fluxo de Mídia</small>
            <strong style="color: #34d399;">Auto-Clean 0 MB</strong>
          </div>
        </div>
      </div>

      <div class="editorial-month-grid">
        ${filtered.map(post => `
          <article class="month-week-card ${post.status === 'publicado' ? 'is-current' : ''}">
            <div class="month-week-header">
              <div class="month-week-badge-row">
                <span class="month-week-num">${post.date}</span>
                <span class="month-week-theme">${post.pilar} · ${post.format}</span>
              </div>
              <span class="planner-badge badge-${post.status === 'publicado' ? 'ready' : post.status === 'aprovado' ? 'progress' : 'planned'}">${post.status}</span>
            </div>

            <h4 style="color:#fff; margin:0; font-size:1.05rem;">${post.title}</h4>

            <div class="month-week-goal">
              <strong>🎯 CTA Oficial:</strong> ${post.cta}
            </div>

            <div class="planner-action">
              <strong>📝 Roteiro Base:</strong>
              <p>${post.script}</p>
            </div>

            ${renderPostStagingBadge(post)}

            <div class="month-week-footer" style="display:flex; flex-direction:column; gap:0.45rem;">
              <div style="display:flex; gap:0.4rem; width:100%;">
                <button type="button" data-copy-prompt-post="${post.id}" data-prompt-type="video" class="prompt-btn-copy" style="flex:1; padding:0.45rem; font-size:0.75rem;">
                  📋 Copiar Prompt Vídeo
                </button>
                <button type="button" data-copy-prompt-post="${post.id}" data-prompt-type="audio" class="prompt-btn-copy" style="flex:1; padding:0.45rem; font-size:0.75rem;">
                  🎙️ Copiar Áudio
                </button>
              </div>
              <div style="display:flex; gap:0.4rem; width:100%;">
                <button type="button" data-open-studio-post="${post.id}" class="button primary planner-card-btn" style="flex:1; justify-content:center;">
                  🎬 Editar Prompt & Subir Vídeo
                </button>
                <a href="${DRIVE_FOLDER}" target="_blank" rel="noopener noreferrer" class="button secondary planner-card-btn">
                  📂 Drive
                </a>
              </div>
            </div>
          </article>
        `).join("")}
      </div>
    `;
  }

  // 3. ESTÚDIO KANBAN DE APROVAÇÃO (Página 27)
  function renderKanbanStudio() {
    const container = $("editorial-view-container");
    if (!container) return;

    const columns = [
      { key: "ideia", label: "💡 Ideia / Pauta" },
      { key: "roteiro", label: "📝 Roteirização" },
      { key: "ciencia", label: "🔬 Revisão Médica" },
      { key: "design", label: "🎨 Design & Motion" },
      { key: "aprovado", label: "✅ Aprovado (QA)" },
      { key: "publicado", label: "🚀 Publicado" }
    ];

    container.innerHTML = `
      <div class="kanban-board">
        ${columns.map(col => {
          const items = OFFICIAL_POSTS.filter(p => p.kanban === col.key);
          return `
            <div class="kanban-col">
              <div class="kanban-col-head">
                <strong>${col.label}</strong>
                <span class="kanban-badge">${items.length}</span>
              </div>
              ${items.map(item => `
                <div class="kanban-card" data-open-studio-post="${item.id}">
                  <div class="kanban-card-meta">
                    <span>${item.date}</span>
                    <span style="color:#38bdf8;">${item.format}</span>
                  </div>
                  <div class="kanban-card-title">${item.title}</div>
                  <small style="color:#94a3b8; display:block; margin-bottom:0.35rem;">CTA: ${item.cta}</small>
                  ${renderPostStagingBadge(item)}
                  <div style="display:flex; gap:0.35rem; margin-top:0.45rem;">
                    <button type="button" data-copy-prompt-post="${item.id}" data-prompt-type="all" class="prompt-btn-copy" style="flex:1; font-size:0.7rem; padding:0.3rem;">
                      📋 Copiar Prompt
                    </button>
                    <button type="button" data-open-studio-post="${item.id}" class="prompt-btn-copy" style="background:rgba(16,185,129,0.18); border-color:rgba(16,185,129,0.45); color:#34d399; font-size:0.7rem; padding:0.3rem;">
                      ⬆️ Vídeo
                    </button>
                  </div>
                </div>
              `).join("")}
            </div>
          `;
        }).join("")}
      </div>
    `;
  }

  // 4. GRADE DE 30 STORIES (Página 17)
  function renderStoriesGrid() {
    const container = $("editorial-view-container");
    if (!container) return;

    container.innerHTML = `
      <div style="margin-bottom: 1.5rem;">
        <h3 style="color:#fff; margin:0 0 0.5rem 0;">Pauta Completa de Stories · Todos os 30 Dias de Novembro</h3>
        <p style="color:#94a3b8; font-size:0.92rem; margin:0;">Rotina diária de engajamento baseada no Dossiê TRAUBE com botão de cópia de Prompt Ultradetalhado em cada Story.</p>
      </div>

      <div class="stories-grid-container">
        ${STORIES_30_DAYS.map(s => `
          <div class="stories-day-card" style="display:flex; flex-direction:column; justify-content:space-between; gap:0.65rem;">
            <div>
              <div class="stories-day-top">
                <span>Dia ${s.day}</span>
                <span class="stories-tag">${s.resource}</span>
              </div>
              <p class="stories-idea" style="margin-top:0.5rem;">${s.idea}</p>
            </div>
            <button type="button" data-copy-story-prompt="${s.day}" class="prompt-btn-copy" style="width:100%; font-size:0.72rem; padding:0.35rem;">
              📋 Copiar Prompt Ultradetalhado
            </button>
          </div>
        `).join("")}
      </div>
    `;
  }

  // 5. CRM DE LEADS / PRÉ-LISTA VIP (Páginas 8 e 29)
  async function renderCrmLeads() {
    const container = $("editorial-view-container");
    if (!container) return;

    container.innerHTML = `<div style="text-align:center; padding:3rem; color:#94a3b8;">Carregando inscritos da pré-lista VIP...</div>`;

    let leads = [];
    try {
      const sb = window.supabaseClient;
      if (sb) {
        const { data } = await sb.from("marketing_leads").select("*").order("created_at", { ascending: false }).limit(50);
        leads = data || [];
      }
    } catch (_) {}

    container.innerHTML = `
      <div class="crm-leads-container">
        <div class="crm-header-summary">
          <div class="meta-ads-kpi-card">
            <span>Inscritos na Pré-Lista</span>
            <strong>${leads.length}</strong>
            <small style="color:#4ade80;">15 Dias Gratuitos</small>
          </div>
          <div class="meta-ads-kpi-card">
            <span>Página de Captura</span>
            <strong>/black-november/</strong>
            <small><a href="/black-november/" target="_blank" rel="noopener noreferrer" style="color:#38bdf8;">Abrir Landing Page ↗</a></small>
          </div>
          <div class="meta-ads-kpi-card">
            <span>Validação Médica</span>
            <strong>Sem Cartão</strong>
            <small>Proteção contra atrito</small>
          </div>
        </div>

        <div class="meta-campaigns-table-card">
          <h3>Inscrições Recentes (Pré-Lista VIP 2026)</h3>
          <table class="meta-table">
            <thead>
              <tr>
                <th>Nome</th>
                <th>E-mail</th>
                <th>Momento / Etapa</th>
                <th>Foco de Estudo</th>
                <th>Origem</th>
                <th>Data</th>
              </tr>
            </thead>
            <tbody>
              ${leads.length > 0 ? leads.map(l => `
                <tr>
                  <td><strong>${l.name}</strong></td>
                  <td>${l.email_normalized}</td>
                  <td><span class="funnel-tag funnel-mid">${l.study_stage}</span></td>
                  <td>${l.interest || 'Geral'}</td>
                  <td>${l.origin}</td>
                  <td>${new Date(l.created_at).toLocaleDateString('pt-BR')}</td>
                </tr>
              `).join("") : `
                <tr>
                  <td colspan="6" style="text-align:center; padding:2rem; color:#94a3b8;">
                    Nenhum lead registrado ainda. Divulgue o link <a href="/black-november/" target="_blank" rel="noopener noreferrer" style="color:#38bdf8;">/black-november/</a> para iniciar a captação!
                  </td>
                </tr>
              `}
            </tbody>
          </table>
        </div>
      </div>
    `;
  }

  // 6. META ADS DASHBOARD (Páginas 24 e 30) - ESTRATÉGIA MICRO-BUDGET R$ 20/SEMANA
  function renderMetaAdsHub() {
    const container = $("editorial-view-container");
    if (!container) return;

    container.innerHTML = `
      <div class="meta-ads-hub">
        <div class="meta-ads-api-banner">
          <div class="meta-ads-banner-copy">
            <strong>🌐 Meta Marketing API (Graph API v21.0) · Estratégia Micro-Budget</strong>
            <p>
              Início na semana do dia <strong>02 de Novembro de 2026</strong> com limite de <strong>R$ 20,00 por semana</strong> (~R$ 2,85/dia). Foco inicial: <strong>Ganhar Seguidores Médicos Qualificados</strong> para validação de marca, antes de transferir a verba para tráfego direto de acessos ao site.
            </p>
          </div>
          <div class="meta-ads-status-badge">
            <span class="status-dot active"></span>
            Limite: R$ 20 / semana
          </div>
        </div>

        <div class="meta-ads-kpis-grid">
          <div class="meta-ads-kpi-card">
            <span>Orçamento Semanal</span>
            <strong>R$ 20,00</strong>
            <small style="color:#4ade80;">R$ 2,85 / dia (1 post vencedor)</small>
          </div>
          <div class="meta-ads-kpi-card">
            <span>Fase 1 Prolongada (Novembro todo)</span>
            <strong>Ganhar Seguidores</strong>
            <small>Construção de Base e Marca Forte</small>
          </div>
          <div class="meta-ads-kpi-card">
            <span>Fase 2 (Black Week Final / Dezembro)</span>
            <strong>Transferir p/ Acessos</strong>
            <small>Público já aquecido e confiante</small>
          </div>
          <div class="meta-ads-kpi-card">
            <span>Critério de Escolha</span>
            <strong>Mais Salvo no Orgânico</strong>
            <small>Impulsionar apenas o comprovado</small>
          </div>
        </div>

        <div class="meta-campaigns-table-card">
          <h3>Evolução das Campanhas Meta Ads (Fase 1 Estendida & Fase 2 Futura)</h3>
          <table class="meta-table">
            <thead>
              <tr>
                <th>Campanha & Peça</th>
                <th>Fase & Objetivo</th>
                <th>Orçamento</th>
                <th>Público Alvo</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>Semana 02/11 · Impulsionamento do Post Vencedor da Semana 1</strong></td>
                <td><span class="funnel-tag funnel-top">Fase 1 · Ganhar Seguidores</span></td>
                <td>R$ 20,00 / sem</td>
                <td>Medicina, Internato e Residência (20-30 anos)</td>
                <td><span class="status-dot active"></span> Início 02/11</td>
              </tr>
              <tr>
                <td><strong>Semana 09/11 · Post Técnico Mais Salvo (Sepse / ECG)</strong></td>
                <td><span class="funnel-tag funnel-top">Fase 1 · Ganhar Seguidores</span></td>
                <td>R$ 20,00 / sem</td>
                <td>Visitas ao Perfil · Alunos de Medicina e Recém-formados</td>
                <td><span class="status-dot pending"></span> Foco em Marca</td>
              </tr>
              <tr>
                <td><strong>Semana 16/11 · Post de Produto / Caderno de Erros Mais Engajado</strong></td>
                <td><span class="funnel-tag funnel-top">Fase 1 · Ganhar Seguidores</span></td>
                <td>R$ 20,00 / sem</td>
                <td>Visitas ao Perfil · Comunidade Médica Engajada</td>
                <td><span class="status-dot pending"></span> Foco em Marca</td>
              </tr>
              <tr>
                <td><strong>Semana 23/11 · Black Week: Transição Seletiva para Acessos</strong></td>
                <td><span class="funnel-tag funnel-mid">Fase 2 · Transição p/ Acessos</span></td>
                <td>R$ 20,00 / sem</td>
                <td>Público que seguiu o perfil em novembro → /black-november/</td>
                <td><span class="status-dot pending"></span> Planejado</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    `;
  }

  // 7. NOVA PÁGINA: DICAS DE CRESCIMENTO ORGÂNICO (Alimentada Semanalmente)
  async function renderOrganicGrowthHub() {
    const container = $("editorial-view-container");
    if (!container) return;

    container.innerHTML = `<div style="text-align:center; padding:3rem; color:#94a3b8;">Carregando diretrizes de crescimento orgânico e micro-budget...</div>`;

    let tips = [];
    try {
      const res = await fetch("/assets/data/organic-growth-tips.json?t=" + Date.now());
      if (res.ok) tips = await res.json();
    } catch (_) {}

    if (!tips || tips.length === 0) {
      tips = [
        {
          semana: "Semana 1 · 26/10 a 01/11/2026",
          foco: "Enchimento de Feed Orgânico & Autoridade Clínica",
          pilares: [
            {
              titulo: "Carrossel de Alto Salvamento",
              dica: "O salvamento é a métrica mais valorizada pelo algoritmo médico. Posts com resumos rápidos geram alcance orgânico multiplicado.",
              acao: "Poste na segunda e na quarta no pico das 12h ou 20h com CTA: 'Salve para consultar no plantão'."
            },
            {
              titulo: "Reels com Gancho Clínico nos 3 Segundos Iniciais",
              dica: "Corte seco e caso interativo geram retenção acima de 50% e compartilhamentos no WhatsApp.",
              acao: "Sem saudações lentas: abra com o ECG ou o dilema de conduta direto."
            }
          ]
        }
      ];
    }

    container.innerHTML = `
      <div class="organic-growth-hub">
        <div class="organic-banner">
          <div class="organic-banner-text">
            <h2>🌱 Guia Prático de Crescimento Orgânico & Validação</h2>
            <p>
              Estratégia oficial para abastecer o feed e gerar seguidores sem queimar caixa. Atualizado semanalmente pelas rotinas automatizadas da TRAUBE.
            </p>
          </div>
          <div class="organic-badge">
            Atualização Semanal Automática
          </div>
        </div>

        <div class="organic-strategy-grid">
          <div class="organic-step-card">
            <span class="step-badge">Fase 0 · A partir de 26/10</span>
            <h4>Feed Orgânico Impecável</h4>
            <p>Construção da vitrine técnica: 1 post por dia com foco em salvamento e compartilhamento antes de colocar qualquer verba em anúncios.</p>
          </div>
          <div class="organic-step-card">
            <span class="step-badge">Fase 1 Prolongada · Todo o Mês de Novembro</span>
            <h4>Micro-Budget R$ 20 / semana (Seguidores & Marca)</h4>
            <p>Manter a verba focada exclusivamente em trazer seguidores qualificados para o perfil. Valida autoridade médica e constrói comunidade sólida.</p>
          </div>
          <div class="organic-step-card">
            <span class="step-badge">Fase 2 Futura · Transição Gradual</span>
            <h4>Transferência para Acessos ao Site</h4>
            <p>Com centenas de seguidores médicos engajados, a transição para gerar cliques na landing page /black-november/ e no teste de 15 dias fica muito mais barata e eficiente.</p>
          </div>
        </div>

        <div class="organic-weeks-list">
          ${tips.map(w => `
            <div class="organic-week-block">
              <div class="organic-week-header">
                <div>
                  <span class="organic-week-tag">${w.semana}</span>
                  <h3 class="organic-week-focus">${w.foco}</h3>
                </div>
                ${w.atualizado_em ? `<small style="color:#94a3b8;">Sincronizado: ${new Date(w.atualizado_em).toLocaleDateString('pt-BR')}</small>` : ''}
              </div>
              <div class="organic-pilares-grid">
                ${(w.pilares || []).map(p => `
                  <div class="organic-pilar-card">
                    <h4>📌 ${p.titulo}</h4>
                    <p class="organic-dica"><strong>Por que funciona:</strong> ${p.dica}</p>
                    <div class="organic-acao">
                      <strong>⚡ Ação Imediata:</strong>
                      <p>${p.acao}</p>
                    </div>
                  </div>
                `).join("")}
              </div>
            </div>
          `).join("")}
        </div>
      </div>
    `;
  }

  function renderCurrentView() {
    if (state.currentView === "weekly") renderWeeklyPlanner();
    else if (state.currentView === "monthly") renderMonthlySchedule();
    else if (state.currentView === "kanban") renderKanbanStudio();
    else if (state.currentView === "stories") renderStoriesGrid();
    else if (state.currentView === "crm") renderCrmLeads();
    else if (state.currentView === "meta_ads") renderMetaAdsHub();
    else if (state.currentView === "organic_growth") renderOrganicGrowthHub();

    $("tab-weekly")?.classList.toggle("active", state.currentView === "weekly");
    $("tab-monthly")?.classList.toggle("active", state.currentView === "monthly");
    $("tab-kanban")?.classList.toggle("active", state.currentView === "kanban");
    $("tab-stories")?.classList.toggle("active", state.currentView === "stories");
    $("tab-crm")?.classList.toggle("active", state.currentView === "crm");
    $("tab-meta-ads")?.classList.toggle("active", state.currentView === "meta_ads");
    $("tab-organic-growth")?.classList.toggle("active", state.currentView === "organic_growth");

    const monthNav = $("editorial-month-nav");
    if (monthNav) monthNav.hidden = state.currentView !== "monthly";
  }

  function setupViewToggle() {
    $("tab-weekly")?.addEventListener("click", () => { state.currentView = "weekly"; renderCurrentView(); });
    $("tab-monthly")?.addEventListener("click", () => { state.currentView = "monthly"; renderCurrentView(); });
    $("tab-kanban")?.addEventListener("click", () => { state.currentView = "kanban"; renderCurrentView(); });
    $("tab-stories")?.addEventListener("click", () => { state.currentView = "stories"; renderCurrentView(); });
    $("tab-crm")?.addEventListener("click", () => { state.currentView = "crm"; renderCurrentView(); });
    $("tab-meta-ads")?.addEventListener("click", () => { state.currentView = "meta_ads"; renderCurrentView(); });
    $("tab-organic-growth")?.addEventListener("click", () => { state.currentView = "organic_growth"; renderCurrentView(); });

    $("month-select")?.addEventListener("change", (e) => {
      state.selectedMonth = e.target.value;
      renderCurrentView();
    });
  }

  async function init() {
    setupViewToggle();
    setupPostStudioModalListeners();
    $("admin-pin-form")?.addEventListener("submit", submitEditorialPin);

    const pinInput = $("admin-pin");
    if (pinInput) {
      pinInput.addEventListener("input", () => {
        pinInput.value = normalizePin(pinInput.value);
        if (pinInput.value.length === 6 && state.pinConfigured) $("admin-pin-form")?.requestSubmit();
      });
    }

    const sb = window.supabaseClient || window.sb;
    if (!sb) { setTimeout(init, 300); return; }

    try {
      const { data: { user } } = await sb.auth.getUser();
      state.user = user;

      let isAdmin = false;
      try {
        const { data: rpcAdmin } = await sb.rpc("is_admin");
        if (rpcAdmin === true) isAdmin = true;
        else if (typeof window.verificarAcessoAdmin === "function") isAdmin = await window.verificarAcessoAdmin();
      } catch (_) {
        if (typeof window.verificarAcessoAdmin === "function") isAdmin = await window.verificarAcessoAdmin();
      }

      state.isAdmin = isAdmin;

      if (!isAdmin) {
        setPinMessage("Acesso restrito a administradores. Redirecionando...", "error");
        setTimeout(() => { window.location.replace("/dashboard/"); }, 800);
        return;
      }

      if (hasRecentAdminPinUnlock()) {
        unlockEditorialPage();
        return;
      }

      await loadPinStatus();
    } catch (err) {
      console.error("[Marketing Init Error]", err);
    }
  }

  document.addEventListener("DOMContentLoaded", init);
})();
