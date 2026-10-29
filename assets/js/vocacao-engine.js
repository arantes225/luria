/* LURIA · orientação para residências médicas: cenários e trilha adaptativa.
   Instrumento editorial exploratório, não avaliação psicológica validada. */
(function (root, factory) {
  "use strict";
  const catalogue = typeof module !== "undefined" && module.exports
    ? require("./vocacao-data.js") : root.LuriaVocacaoData;
  const value = factory(catalogue);
  if (typeof module !== "undefined" && module.exports) module.exports = value;
  if (root) root.LuriaVocacaoEngine = value;
})(typeof globalThis !== "undefined" ? globalThis : this, function (catalogue) {
  "use strict";
  const labels = {
    hands: ["Prática manual", "Realizar intervenções e aperfeiçoar habilidades técnicas"],
    diagnosis: ["Investigação diagnóstica", "Integrar pistas, exames e hipóteses"],
    clinical: ["Cuidado clínico", "Avaliar, decidir e ajustar tratamentos"],
    surgery: ["Atividade cirúrgica", "Operar e acompanhar o resultado de intervenções"],
    acute: ["Casos agudos", "Atuar em problemas que precisam de resposta rápida"],
    highstakes: ["Alta intensidade", "Trabalhar com instabilidade e decisões de alto risco"],
    followup: ["Acompanhamento", "Rever a mesma pessoa ao longo do tempo"],
    people: ["Contato com pessoas", "Construir comunicação e vínculo terapêutico"],
    team: ["Trabalho em equipe", "Coordenar condutas com outros profissionais"],
    technology: ["Tecnologia", "Utilizar equipamentos para diagnosticar ou tratar"],
    precision: ["Precisão", "Executar tarefas técnicas que exigem grande atenção a detalhes"],
    visual: ["Análise visual", "Reconhecer padrões em exames ou imagens"],
    complex: ["Casos complexos", "Trabalhar com doenças difíceis e múltiplos problemas"],
    prevention: ["Prevenção", "Evitar agravamentos e promover saúde"],
    community: ["Cuidado comunitário", "Considerar família, território e contexto social"],
    systems: ["Organização da saúde", "Atuar em sistemas, dados e processos"],
    function: ["Recuperação funcional", "Ajudar pessoas a recuperar autonomia"],
    mental: ["Saúde mental", "Lidar com sofrimento psíquico e comportamento"],
    kids: ["Crianças e adolescentes", "Cuidar desse grupo de pacientes"],
    women: ["Saúde da mulher", "Atuar com saúde ginecológica e reprodutiva"],
    elderly: ["Pessoas idosas", "Cuidar de problemas associados ao envelhecimento"],
    predictable: ["Rotina programada", "Preferir agenda mais previsível"],
    research: ["Pesquisa e evidências", "Analisar mecanismos, estudos e resultados"]
  };
  // [ID, grupo, pergunta, contexto, [[escolha, tags, especialidades específicas?], ...]]
  // "Não sei" é sempre uma alternativa neutra separada no componente de resposta.
  // Nenhuma opção é descrita como virtuosa/superior, nem pressupõe experiência.
  const CORE_ROWS = [
    ["c01","Rotina","Uma semana comum, sem pensar em remuneração: qual tarefa você repetiria com satisfação?","Pense no que ocupa a maior parte dos dias, não no momento mais emocionante.",
      [["Reavaliar pacientes e ajustar planos de tratamento.","clinical,followup,people"],["Investigar resultados que não fecham um diagnóstico.","diagnosis,complex,clinical"],["Executar técnicas e rever resultados imediatos.","hands,precision,technology"],["Atender intercorrências e priorizar condutas.","acute,highstakes,team"]]],
    ["c02","Raciocínio","Você recebe um caso com três hipóteses plausíveis. O que mais gostaria de conduzir?","As quatro frentes são necessárias; escolha a que mais gostaria de assumir.",
      [["Construir um diagnóstico diferencial cuidadoso.","diagnosis,complex,research"],["Decidir a próxima conduta após estabilizar o paciente.","acute,clinical,highstakes"],["Interpretar uma imagem ou lâmina decisiva.","visual,precision,technology"],["Conversar para entender objetivos e contexto do paciente.","people,clinical,followup"]]],
    ["c03","Desgaste","Qual dificuldade você aceitaria encontrar repetidamente, apesar do cansaço?","Um bom caminho profissional exige tolerar o trabalho difícil, não só gostar do interessante.",
      [["Consultas de retorno e mudanças lentas.","followup,clinical,people"],["Pressão por decisões em pouco tempo.","acute,highstakes,team"],["Longas horas de procedimento com concentração.","hands,surgery,precision"],["Revisão meticulosa de achados técnicos.","visual,diagnosis,precision"]]],
    ["c04","Decisões","Quando há incerteza, qual tipo de responsabilidade lhe interessa assumir?","Não escolha pela ideia de prestígio; imagine executar a tarefa.",
      [["Decidir o que fazer agora com informações parciais.","acute,highstakes,clinical"],["Ajustar uma hipótese clínica depois de discutir evidências.","diagnosis,complex,clinical"],["Planejar a sequência segura de uma intervenção.","surgery,hands,precision"],["Negociar prioridades de cuidado com pessoa e família.","people,followup,mental"]]],
    ["c05","Procedimentos","Se o estágio tivesse uma vaga prática extra, qual você escolheria?","Considere a tarefa em si e o período de treinamento necessário.",
      [["Treinar suturas ou técnica cirúrgica supervisionada.","surgery,hands,precision"],["Treinar punções e monitorização do paciente instável.","hands,acute,technology"],["Treinar exame físico e interpretação clínica detalhada.","clinical,diagnosis,people"],["Treinar leitura de imagem e elaboração de laudos.","visual,technology,precision"]]],
    ["c06","Cuidado","Qual tipo de acompanhamento lhe parece mais significativo?","Não existe opção mais humana: os vínculos acontecem de maneiras diferentes.",
      [["Seguir um adulto por anos, inclusive em fases difíceis.","followup,clinical,people"],["Orientar uma família sobre o desenvolvimento infantil.","kids,people,prevention"],["Apoiar autonomia de alguém em reabilitação.","function,people,followup"],["Conduzir atendimento breve em situações críticas.","acute,team,highstakes"]]],
    ["c07","Vida pessoal","O que seria mais sustentável para você por vários anos?","Imagine uma agenda realista, inclusive tarefas burocráticas e dias difíceis.",
      [["Agenda previsível, aceitando casos repetidos.","predictable,followup,clinical"],["Escalas intensas, aceitando noites e mudanças inesperadas.","acute,highstakes,team"],["Dias longos em procedimentos programados.","surgery,hands,precision"],["Parte da semana dedicada a análise técnica sem muitos atendimentos diretos.","visual,technology,precision"]]],
    ["c08","Trabalho em equipe","Em uma reunião multiprofissional, onde você se vê mais à vontade?","Todas as opções têm contribuição clínica relevante.",
      [["Integrar diagnósticos e condutas de doenças simultâneas.","clinical,complex,team"],["Liderar prioridades em uma deterioração aguda.","acute,highstakes,team"],["Traçar metas de função e autonomia após lesão.","function,followup,team"],["Reorganizar processos para reduzir falhas de cuidado.","systems,prevention,team"]]],
    ["c09","Contato","Qual encontro com paciente lhe daria mais energia ao fim do dia?","Escolha o tipo de conversa, não a faixa etária de sua família.",
      [["Investigar sintomas com perguntas focadas em diagnóstico.","diagnosis,clinical,people"],["Escutar sofrimento psíquico e acompanhar mudanças.","mental,people,followup"],["Explicar um procedimento e responder dúvidas.","hands,precision,people"],["Orientar prevenção a pessoas e famílias no território.","community,prevention,people"]]],
    ["c10","Conteúdo","Qual conjunto de casos você teria mais vontade de estudar após o estágio?","Aqui queremos conhecer assuntos de interesse, não aptidão.",
      [["Arritmia, insuficiência cardíaca e circulação.","clinical,acute,technology","Cardiologia;Cirurgia Cardiovascular;Medicina de Emergência"],["Déficit neurológico, epilepsia e localização anatômica.","diagnosis,complex,visual","Neurologia;Neurocirurgia"],["Fertilidade, gestação e saúde ginecológica.","women,clinical,hands","Ginecologia e Obstetrícia;Mastologia"],["Ansiedade, humor, dependências e comportamento.","mental,people,followup","Psiquiatria"]]],
    ["c11","Conteúdo","Em qual discussão científica você ficaria depois do horário?","Mesmo que ainda conheça pouco a área.",
      [["Infecções de difícil diagnóstico e resposta ao tratamento.","diagnosis,complex,clinical","Infectologia"],["Doenças autoimunes, inflamação e uso de imunomoduladores.","clinical,followup,complex","Reumatologia;Alergia e Imunologia"],["Diagnóstico histológico ou molecular de uma lesão.","visual,diagnosis,research","Patologia;Genética Médica"],["Lesões osteomusculares, marcha e recuperação funcional.","function,hands,precision","Ortopedia e Traumatologia;Medicina Física e Reabilitação"]]],
    ["c12","Conteúdo","Qual problema clínico você aceitaria ver com frequência?","Pense na realidade repetida do consultório ou serviço.",
      [["Desenvolvimento infantil e orientação a cuidadores.","kids,people,followup","Pediatria"],["Doenças crônicas e fragilidade na pessoa idosa.","elderly,clinical,followup","Geriatria;Medicina de Família e Comunidade"],["Doenças de pele, lesões e pequenos procedimentos.","visual,hands,predictable","Dermatologia"],["Doenças digestivas, endoscopia e sintomas gastrointestinais.","clinical,diagnosis,hands","Gastroenterologia;Endoscopia"]]],
    ["c13","Precisão","Qual atividade exige um tipo de atenção que você gostaria de treinar?","Não avalie se você já é bom nisso.",
      [["Movimentos milimétricos durante intervenção.","surgery,hands,precision"],["Reconhecer achados discretos em imagens seriadas.","visual,diagnosis,precision"],["Interpretar curvas e dados fisiológicos em tempo real.","technology,highstakes,precision"],["Perceber mudanças sutis no discurso e comportamento.","mental,people,diagnosis"]]],
    ["c14","Impacto","Qual resultado de trabalho seria mais gratificante após um ano?","Todos são resultados importantes; escolha o que mais o motivaria.",
      [["Paciente recuperou independência após reabilitação.","function,followup,people"],["Pacientes com doenças crônicas alcançaram bom controle.","clinical,followup,people"],["Um serviço reduziu complicações com melhor processo.","systems,team,prevention"],["Um procedimento foi realizado com segurança e bom resultado.","hands,surgery,precision"]]],
    ["c15","Populações","Em que cenário você gostaria de adquirir experiência continuada?","Não é uma escolha definitiva de população: serve para aprofundar.",
      [["Cuidado neonatal, infantil e de adolescentes.","kids,people,highstakes","Pediatria"],["Saúde sexual, reprodutiva e assistência obstétrica.","women,people,clinical","Ginecologia e Obstetrícia"],["Adultos com múltiplas doenças complexas.","clinical,complex,diagnosis","Clínica Médica"],["Pacientes com sofrimento emocional persistente.","mental,followup,people","Psiquiatria"]]],
    ["c16","Limites","Qual compromisso difícil você aceitaria ao escolher uma residência médica?","Considere um sacrifício recorrente, não um caso excepcional.",
      [["Muita escuta e documentação antes de perceber resultados.","people,followup,mental"],["Pressão temporal e decisões potencialmente irreversíveis.","acute,highstakes,team"],["Repetir treinamento técnico até atingir grande precisão.","hands,precision,surgery"],["Longos períodos interpretando dados com poucos encontros presenciais.","visual,technology,diagnosis"]]]
  ];
  const DEEP_ROWS = [
    ["d01","conteudo","Seu interesse é maior em qual investigação especializada?","Os quatro casos são atendidos por especialidades diferentes.",
      [["Episódios de perda de consciência e alterações de ritmo cardíaco.","diagnosis,technology,acute","Cardiologia"],["Déficit motor progressivo e alterações de reflexos.","diagnosis,complex,clinical","Neurologia"],["Febre persistente em pessoa imunossuprimida.","diagnosis,complex,clinical","Infectologia;Hematologia e Hemoterapia"],["Lesão de pele de evolução lenta com achado dermatoscópico.","visual,diagnosis,predictable","Dermatologia"]]],
    ["d02","conteudo","Qual linha de tratamento ambulatorial te atrai mais?","Imagine acompanhar dezenas desses casos ao longo de meses.",
      [["Diabetes, tireoide e metabolismo.","clinical,followup,predictable","Endocrinologia e Metabologia"],["Cefaleia, epilepsia e distúrbios do movimento.","diagnosis,followup,complex","Neurologia"],["Doenças autoimunes e inflamação multissistêmica.","clinical,followup,complex","Reumatologia"],["Transtornos do humor e saúde mental.","mental,people,followup","Psiquiatria"]]],
    ["d03","conteudo","Ao escolher um procedimento para aprender, qual seria?","Cada um exige trajetória e supervisão diferentes.",
      [["Técnicas endoscópicas do aparelho digestivo.","hands,visual,technology","Gastroenterologia;Endoscopia"],["Cirurgia para reconstruir função ou forma.","surgery,hands,function","Cirurgia Plástica"],["Intervenções em vasos com imagem e cateteres.","hands,technology,precision","Cirurgia Vascular;Radiologia e Diagnóstico por Imagem"],["Procedimentos oculares com microscopia.","hands,visual,precision","Oftalmologia"]]],
    ["d04","conteudo","Qual demanda de emergência você preferiria estudar mais a fundo?","Não é uma pergunta sobre ter coragem.",
      [["Via aérea e estabilização anestésica.","hands,highstakes,technology","Anestesiologia"],["Trauma com indicação operatória.","surgery,acute,highstakes","Cirurgia Geral;Ortopedia e Traumatologia"],["Sepse, choque e suporte intensivo.","acute,complex,team","Medicina Intensiva;Medicina de Emergência"],["Complicação na gestação com necessidade de decisão rápida.","women,acute,hands","Ginecologia e Obstetrícia"]]],
    ["d05","conteudo","Qual sistema do corpo mais desperta curiosidade clínica?","Responda pela curiosidade espontânea, não pela nota nas provas.",
      [["Pulmões e troca gasosa.","clinical,technology,diagnosis","Pneumologia"],["Rim, eletrólitos e diálise.","clinical,complex,technology","Nefrologia"],["Sangue, coagulação e transplante.","clinical,complex,research","Hematologia e Hemoterapia"],["Trato digestivo e fígado.","clinical,diagnosis,followup","Gastroenterologia"]]],
    ["d06","conteudo","Qual tipo de exame você aprenderia a interpretar por prazer?","Considere também a rotina de examinar muitos casos parecidos.",
      [["Tomografia e ressonância de diferentes sistemas.","visual,technology,precision","Radiologia e Diagnóstico por Imagem"],["Lâminas de tecido e padrões celulares.","visual,diagnosis,precision","Patologia"],["Exames bioquímicos e hematológicos em contexto laboratorial.","technology,systems,diagnosis","Patologia Clínica/Medicina Laboratorial"],["Estudos de medicina nuclear e terapias com radioisótopos.","technology,precision,visual","Medicina Nuclear"]]],
    ["d07","conteudo","Qual paciente você preferiria acompanhar em um ambulatório especializado?","Há vínculo em todas as alternativas.",
      [["Criança com doença respiratória recorrente.","kids,clinical,followup","Pediatria;Pneumologia"],["Pessoa com dor crônica e perda de funcionalidade.","function,followup,people","Medicina Física e Reabilitação"],["Paciente em tratamento oncológico sistêmico.","clinical,complex,people","Oncologia Clínica"],["Pessoa com alergias persistentes e necessidade de investigação.","clinical,followup,diagnosis","Alergia e Imunologia"]]],
    ["d08","conteudo","Em um centro cirúrgico, qual área mais te atrairia?","Valorize a prática cotidiana, não somente cirurgias raras.",
      [["Cirurgia de tumores e acompanhamento oncológico.","surgery,complex,people","Cirurgia Oncológica"],["Cirurgia de ossos e articulações, com recuperação funcional.","surgery,hands,function","Ortopedia e Traumatologia"],["Cirurgia abdominal e controle perioperatório.","surgery,acute,clinical","Cirurgia Geral;Cirurgia do Aparelho Digestivo"],["Cirurgia de alta precisão no sistema nervoso.","surgery,precision,technology","Neurocirurgia"]]],
    ["d09","conteudo","Em consulta programada, qual foco você gostaria de aprofundar?","Pense em um ambulatório cheio, não em um caso isolado.",
      [["Infertilidade, anticoncepção e saúde ginecológica.","women,people,followup","Ginecologia e Obstetrícia"],["Sono, humor e sofrimento emocional.","mental,people,followup","Psiquiatria"],["Doenças cutâneas e lesões de pele.","visual,clinical,predictable","Dermatologia"],["Prevenção, manejo de condições comuns e contexto familiar.","community,prevention,followup","Medicina de Família e Comunidade"]]],
    ["d10","conteudo","Qual reabilitação você desejaria coordenar?","A recuperação depende de equipe e tempo em todas.",
      [["Paciente com sequela neurológica.","function,complex,team","Medicina Física e Reabilitação;Neurologia"],["Atleta com lesão e retorno ao esporte.","function,prevention,people","Medicina Esportiva;Ortopedia e Traumatologia"],["Pessoa idosa com perda de independência.","elderly,function,followup","Geriatria"],["Criança com alterações do desenvolvimento.","kids,function,followup","Pediatria"]]],
    ["d11","conteudo","Em um plantão hospitalar, qual responsabilidade preferiria assumir?","Todas podem envolver alta complexidade.",
      [["Estabilização inicial de pacientes graves.","acute,highstakes,team","Medicina de Emergência"],["Monitorização e suporte de órgãos em UTI.","highstakes,technology,complex","Medicina Intensiva"],["Sedação, analgesia, via aérea e perioperatório.","hands,technology,highstakes","Anestesiologia"],["Avaliação clínica de múltiplos pacientes internados.","clinical,complex,team","Clínica Médica"]]],
    ["d12","conteudo","Que cenário preventivo pareceria mais relevante para seu trabalho?","Considere uma rotina de reuniões, visitas e registros.",
      [["Acompanhamento familiar e territorial.","community,people,prevention","Medicina de Família e Comunidade"],["Organização de vigilância e indicadores populacionais.","systems,research,prevention","Medicina Preventiva e Social"],["Riscos ocupacionais em empresas e trabalhadores.","systems,prevention,predictable","Medicina do Trabalho"],["Melhoria de processos e gestão de serviços.","systems,team,precision","Medicina Preventiva e Social;Medicina Legal e Perícia Médica"]]],
    ["d13","conteudo","Qual grupo de procedimentos gostaria de aprender?","Trabalhar com uma técnica não exige gostar de toda a área.",
      [["Artroscopia ou fixação de fraturas.","hands,surgery,function","Ortopedia e Traumatologia"],["Cirurgia otológica e endoscopia nasal.","hands,visual,precision","Otorrinolaringologia"],["Abordagem cirúrgica do trato urinário.","hands,surgery,technology","Urologia"],["Cirurgia de mamas ou reconstrução.","surgery,precision,people","Mastologia;Cirurgia Plástica"]]],
    ["d14","conteudo","Qual linha de cuidado clínico você escolheria?","Compare o tipo de vínculo e problema principal.",
      [["Aconselhamento genético familiar.","diagnosis,people,research","Genética Médica"],["Cuidado geriátrico complexo e reconciliação de medicamentos.","elderly,clinical,followup","Geriatria"],["Dores e inflamação articular crônicas.","clinical,followup,complex","Reumatologia"],["Manejo de doenças infecciosas hospitalares complexas.","diagnosis,systems,complex","Infectologia"]]],
    ["d15","tradeoff","Qual desgaste você toleraria melhor em uma semana muito cheia?","Mesmo a opção escolhida pode ser desagradável.",
      [["Retornos sem melhora clara por meses.","followup,clinical,people"],["Alertas, intercorrências e imprevisibilidade.","acute,highstakes,team"],["Procedimentos demorados e minuciosos.","hands,surgery,precision"],["Volumes altos de imagens ou exames a interpretar.","visual,precision,technology"]]],
    ["d16","tradeoff","Se precisasse abrir mão de uma vantagem, qual custo faria mais sentido?","Não há resposta perfeita: escolha a troca mais aceitável.",
      [["Menos procedimentos, em troca de acompanhamento duradouro.","followup,people,clinical"],["Menos previsibilidade, em troca de decisões rápidas.","acute,highstakes,team"],["Mais treinamento repetitivo, em troca de habilidade manual refinada.","hands,surgery,precision"],["Menos encontros clínicos, em troca de interpretação técnica.","visual,technology,diagnosis"]]],
    ["d17","tradeoff","Qual retorno profissional você buscaria mesmo com uma curva de aprendizado longa?","Pense no tipo de resultado, não no reconhecimento externo.",
      [["Conseguir resolver tecnicamente um problema com intervenção.","hands,precision,surgery"],["Reunir pistas para esclarecer uma doença rara.","diagnosis,complex,research"],["Ver mudanças graduais no funcionamento e qualidade de vida.","function,people,followup"],["Reduzir falhas de uma rede de atenção inteira.","systems,community,prevention"]]],
    ["d18","tradeoff","Qual aspecto do trabalho você sentiria mais falta se ele desaparecesse?","A escolha ajuda a distinguir interesse central de atividade complementar.",
      [["Contato presencial com pacientes.","people,clinical,followup"],["Procedimentos e habilidades manuais.","hands,surgery,precision"],["Dúvidas difíceis de diagnóstico.","diagnosis,complex,visual"],["Ritmo intenso de equipe e resposta rápida.","acute,team,highstakes"]]],
    ["d19","tensao","Diante de um erro evitável em atendimento, o que gostaria de investigar primeiro?","Cada foco é válido, mas exige competências diferentes.",
      [["Onde o raciocínio diagnóstico falhou.","diagnosis,complex,clinical"],["Se a técnica do procedimento poderia ser aprimorada.","hands,precision,surgery"],["Se a comunicação com o paciente foi suficiente.","people,mental,followup"],["Se os processos da equipe favorecem repetição do erro.","systems,team,precision"]]],
    ["d20","tensao","Você tem pouco tempo para aprender algo novo. O que priorizaria?","Imagine que as quatro opções sejam igualmente acessíveis.",
      [["Uma técnica de intervenção supervisionada.","hands,precision,technology"],["Discussão aprofundada de casos clínicos.","diagnosis,complex,clinical"],["Um curso de entrevista, escuta e comunicação.","people,mental,clinical"],["Uma oficina de análise de indicadores de qualidade.","systems,research,prevention"]]],
    ["d21","tensao","Você encontra um paciente com muitos problemas simultâneos. Que parte preferiria assumir?","Não é uma prova de conduta.",
      [["Priorizar hipóteses e conduzir investigação.","clinical,complex,diagnosis"],["Estabilizar o que ameaça a vida agora.","acute,highstakes,team"],["Definir metas de autonomia e apoio de longo prazo.","function,people,followup"],["Construir decisões compartilhadas diante de sofrimento emocional.","mental,people,clinical"]]],
    ["d22","tensao","Você percebe uma discrepância pequena entre exames. Qual próximo passo mais lhe atrai?","Todas as opções podem ser seguras no contexto correto.",
      [["Conferir detalhes das imagens ou lâminas.","visual,precision,technology"],["Buscar explicações clínicas alternativas.","clinical,diagnosis,complex"],["Refazer uma avaliação manual focada.","hands,clinical,precision"],["Verificar calibração e processos do serviço.","systems,precision,technology"]]],
    ["d23","atividade","Em um estágio de oito horas, que tarefa prenderia sua atenção por mais tempo?","Imagine a sequência repetida de casos.",
      [["Procedimentos técnicos consecutivos.","hands,precision,technology"],["Consultas longas com histórias individuais.","people,mental,followup"],["Diagnósticos difíceis e discussão de exames.","diagnosis,complex,clinical"],["Atendimento contínuo de intercorrências clínicas.","acute,team,highstakes"]]],
    ["d24","atividade","Ao final de um procedimento, qual etapa te interessa mais?","Escolha mesmo que ainda não tenha realizado procedimentos.",
      [["Executar e aperfeiçoar a técnica.","hands,surgery,precision"],["Analisar o resultado por exame ou imagem.","visual,technology,precision"],["Acompanhar recuperação clínica e funcional.","clinical,function,followup"],["Explicar o resultado e alinhar próximos passos.","people,followup,clinical"]]],
    ["d25","atividade","Em uma equipe que atende a mesma comunidade, o que assumiria voluntariamente?","Considere uma semana comum do serviço.",
      [["Consultas e acompanhamento de pessoas conhecidas.","community,followup,people"],["Atendimento a eventos agudos.","acute,clinical,team"],["Procedimentos de baixa complexidade.","hands,clinical,precision"],["Planejamento de indicadores e prevenção.","systems,community,prevention"]]],
    ["d26","atividade","Qual tarefa você gostaria de praticar por cem horas?","Repetição é parte de qualquer formação.",
      [["Raciocínio de imagem e reconhecimento de padrões.","visual,diagnosis,precision"],["Técnica cirúrgica sob supervisão.","surgery,hands,precision"],["Consulta clínica com decisões compartilhadas.","clinical,people,followup"],["Avaliação do paciente instável e comunicação de equipe.","acute,team,highstakes"]]],
    ["d27","ambiente","Qual configuração de trabalho te parece mais sustentável?","Pense também em documentos, registro e volume de demandas.",
      [["Consultório com pacientes retornando ao longo de anos.","followup,predictable,people"],["Hospital com casos graves em escala por turnos.","acute,highstakes,team"],["Centro de procedimentos com agenda cirúrgica.","hands,surgery,precision"],["Serviço de laudos com interpretação técnica.","visual,technology,precision"]]],
    ["d28","ambiente","Se pudesse mudar de cenário amanhã, qual escolheria?","O foco é cotidiano real, não glamour.",
      [["Atenção primária, prevenção e comunidade.","community,clinical,prevention"],["Ambulatório de doenças complexas.","complex,diagnosis,followup"],["Serviço de reabilitação com equipe multidisciplinar.","function,team,people"],["Centro de exames com tecnologia especializada.","technology,visual,precision"]]]
  ];
  const END_ROWS = [
    ["e01","Prioridades","Ao escolher sua residência, o que você não gostaria de perder?","Escolha o elemento mais indispensável, mesmo que outros também importem.",
      [["Vínculo e continuidade com pacientes.","people,followup,clinical"],["Autonomia técnica para intervir.","hands,precision,surgery"],["Questões clínicas difíceis para resolver.","diagnosis,complex,research"],["Atuação rápida quando alguém piora.","acute,team,highstakes"]]],
    ["e02","Limite pessoal","Se tivesse que reduzir uma parte da sua semana, qual reduziria primeiro?","Essa pergunta investiga incômodos, não competência.",
      [["Procedimentos técnicos longos.","clinical,people,followup"],["Consultas com muitos retornos.","hands,technology,precision"],["Plantões com urgências frequentes.","predictable,diagnosis,visual"],["Exames e laudos repetitivos.","people,clinical,function"]]],
    ["e03","Checagem","Se seus primeiros estágios não corresponderem à expectativa, qual aspecto vale observar mais?","Busque aquilo que define o trabalho fora dos melhores momentos.",
      [["Como os profissionais lidam com sua rotina pessoal.","predictable,followup,people"],["Quais tarefas repetitivas ocupam mais tempo.","precision,systems,clinical"],["Como decisões de alto risco afetam a equipe.","acute,highstakes,team"],["Quanto raciocínio e estudo há fora da assistência direta.","diagnosis,complex,research"]]]
  ];
  const mk = (r) => ({
    id:r[0], group:r[1], text:r[2], context:r[3],
    options:r[4].map((v,i)=>({ id:i, label:v[0], tags:v[1].split(","), targets:v[2] ? v[2].split(";").filter(name => catalogue.residencies.some(s => s.name === name)) : [] }))
  });
  const core = CORE_ROWS.map(mk);
  const deep = DEEP_ROWS.map(mk);
  const end = END_ROWS.map(mk);
  const questionIndex = new Map([...core,...deep,...end].map(q=>[q.id,q]));
  const DEEP_COUNT=10;
  const total = core.length + DEEP_COUNT + end.length;

  function validResponse(answer) {
    return !!answer && Number.isInteger(answer.first) && answer.first>=-1 && answer.first<=3 &&
      (answer.second==null || (answer.first>=0 && Number.isInteger(answer.second) && answer.second>=0 && answer.second<=3 && answer.second!==answer.first)) &&
      typeof answer.unfamiliar==="boolean";
  }
  const optionsBy = (id, response) => {
    const q=questionIndex.get(id);
    if(!q || !validResponse(response)) return [];
    const scale=response.unfamiliar ? 0.72 : 1;
    return response.first===-1 ? [] : [{...q.options[response.first],weight:scale,main:true,question:q}].concat(
      response.second==null ? [] : [{...q.options[response.second],weight:scale*0.38,main:false,question:q}]);
  };
  const scoreInterests = (answers) => {
    const observed=Object.fromEntries(Object.keys(labels).map(t=>[t,0]));
    const baseline=Object.fromEntries(Object.keys(labels).map(t=>[t,0]));
    const maximum=Object.fromEntries(Object.keys(labels).map(t=>[t,0]));
    let responded=0, inexperienced=0, skipped=0;
    for(const [id,answer] of Object.entries(answers)){
      const q=questionIndex.get(id);
      if(!q||!validResponse(answer))continue;
      responded++;
      if(answer.unfamiliar) inexperienced++;
      if(answer.first===-1){skipped++;continue;}
      const chosen=optionsBy(id,answer);
      const scale=answer.unfamiliar ? 0.72:1;
      for(const tag of Object.keys(labels)){
        const frequency=q.options.filter(o=>o.tags.includes(tag)).length/4;
        const exposure=scale*(1+(answer.second!=null ? 0.38 : 0));
        baseline[tag]+=frequency*exposure;
        maximum[tag]+=scale*(1+(answer.second!=null ? 0.38 : 0));
      }
      for(const opt of chosen)for(const tag of opt.tags)observed[tag]+=opt.weight;
    }
    const scores={};
    for(const tag of Object.keys(labels)){
      const delta=observed[tag]-baseline[tag];
      const spread=delta>=0 ? maximum[tag]-baseline[tag] : baseline[tag];
      scores[tag]=spread>0 ? Math.max(-1,Math.min(1,delta/(spread+2.25))) : 0;
    }
    return {scores,observed,responded,inexperienced,skipped};
  };

  function baseRank(answers) {
    const {scores}=scoreInterests(answers);
    return catalogue.specialties.map(s=>{
      const m=s.tags.reduce((sum,tag)=>sum+(scores[tag]||0),0)/s.tags.length;
      let evidence=0;
      for(const [id,ans] of Object.entries(answers)){
        for(const o of optionsBy(id,ans))if(o.targets.includes(s.name))evidence+=o.weight*(o.main?1:0.5);
      }
      // Especificidade clínica é informação adicional, não substitui a prática.
      return {...s,affinity:m*0.85+Math.min(evidence,4)*0.065,contentEvidence:evidence};
    }).sort((a,b)=>b.affinity-a.affinity||a.name.localeCompare(b.name,"pt-BR"));
  }

  function selectAdaptive(answers) {
    if(core.some(q=>!validResponse(answers[q.id])))throw new Error("Conclua a primeira etapa antes do aprofundamento.");
    const ranking=baseRank(answers);
    const leading=ranking.slice(0,8);
    const chosen=[];
    // Repartição garante perguntas de conteúdo, custos da profissão e contextos reais.
    const quotas={conteudo:4,tradeoff:2,tensao:2,atividade:1,ambiente:1};
    for(const [group,limit] of Object.entries(quotas)){
      const pool=deep.filter(q=>q.group===group).map(q=>{
        const discrimination=leading.map(s=>{
          const optionValues=q.options.map(o=>
            o.tags.filter(t=>s.tags.includes(t)).length/(o.tags.length||1)+
            (o.targets.includes(s.name)?1.6:0));
          return Math.max(...optionValues)-Math.min(...optionValues);
        });
        const leverage=discrimination.reduce((a,b)=>a+b,0)/discrimination.length;
        const distinct=q.options.filter(o=>o.targets.some(t=>leading.some(s=>s.name===t))).length;
        return {q,weight:leverage + distinct*0.23};
      }).sort((a,b)=>b.weight-a.weight||a.q.id.localeCompare(b.q.id)).slice(0,limit);
      chosen.push(...pool.map(x=>x.q.id));
    }
    return chosen;
  }

  function createSequence(answers,adaptiveIds) {
    const adaptive=adaptiveIds || selectAdaptive(answers);
    if(adaptive.length!==DEEP_COUNT||new Set(adaptive).size!==DEEP_COUNT||adaptive.some(id=>!deep.some(q=>q.id===id)))throw Error("Trilha de aprofundamento inválida.");
    return [...core.map(q=>q.id),...adaptive,...end.map(q=>q.id)];
  }

  function calculate(answers,sequence) {
    if(!Array.isArray(sequence)||sequence.length!==total||new Set(sequence).size!==sequence.length ||
      sequence.some(id=>!questionIndex.has(id)||!validResponse(answers[id])))throw Error("Responda às etapas para gerar seu perfil.");
    const {scores,responded,inexperienced,skipped}=scoreInterests(Object.fromEntries(sequence.map(id=>[id,answers[id]])));
    const ranked=baseRank(Object.fromEntries(sequence.map(id=>[id,answers[id]])));
    const positive=Object.keys(labels).filter(t=>scores[t]>.04).sort((a,b)=>scores[b]-scores[a]);
    const caution=Object.keys(labels).filter(t=>scores[t]<-.07).sort((a,b)=>scores[a]-scores[b]);
    const top=ranked.slice(0,3).map(s=>{
      const strengths=s.tags.slice().sort((a,b)=>scores[b]-scores[a]).slice(0,3);
      const frictions=s.tags.filter(t=>scores[t]<-.07).sort((a,b)=>scores[a]-scores[b]).slice(0,3);
      const evidence=sequence.flatMap(id=>optionsBy(id,answers[id])
        .filter(o=>o.main&&(o.tags.some(t=>s.tags.includes(t))||o.targets.includes(s.name)))
        .map(o=>({id,section:o.question.group,choice:o.label,question:o.question.text,
          relevance:o.tags.filter(t=>s.tags.includes(t)).length+(o.targets.includes(s.name)?3:0)})))
        .sort((a,b)=>b.relevance-a.relevance).slice(0,3);
      return {...s,strengths,frictions,evidence};
    });
    const firstGap=top.length>1 ? top[0].affinity-top[1].affinity:0;
    return {top,scores,ordered:positive,frictions:caution,responded,inexperienced,skipped,
      close:firstGap<.095,version:"2026-10-29-residencias-v4",total,
      certainty:skipped>=7||inexperienced>=total*.55?"exploratorio":"orientativo",
      adaptations:sequence.slice(core.length,core.length+DEEP_COUNT)};
  }
  return Object.freeze({labels,core,deep,end,questions:core,questionIndex,DEEP_COUNT,total,
    validResponse,scoreInterests,selectAdaptive,createSequence,calculate,catalogue});
});
