/* LURIA Vocação — perguntas situacionais e motor exploratório.
   Não é instrumento psicológico/psicométrico validado ou previsão de desempenho.
   Critérios editoriais: rotina, decisões e atividades; sem estereótipos de especialidade. */
(function (root, factory) {
  "use strict";
  const catalogue = (typeof module !== "undefined" && module.exports)
    ? require("./vocacao-data.js")
    : root.LuriaVocacaoData;
  const engine = factory(catalogue);
  if (typeof module !== "undefined" && module.exports) module.exports = engine;
  if (root) root.LuriaVocacaoEngine = engine;
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

  // Em cada pergunta, o estudante escolhe a atividade que preferiria repetir.
  // As opções são todas plausíveis; não existem alternativas caricatas.
  const questions = [
    ["Rotina","Se você pudesse repetir um tipo de turno toda semana, qual escolheria?",
      ["Atender pessoas que já acompanho e ajustar tratamentos","Reavaliar exames de um caso sem diagnóstico definido","Participar de procedimentos e conferir o resultado","Receber pacientes agudos e definir as primeiras condutas"],
      ["followup people clinical","diagnosis complex clinical","hands precision surgery","acute highstakes team"]],
    ["Decisão","Em um caso difícil, qual etapa mais prende sua atenção?",
      ["Reunir dados até descobrir a causa do problema","Escolher o procedimento mais adequado","Explicar as opções e construir um plano junto ao paciente","Organizar a equipe e priorizar o atendimento"],
      ["diagnosis complex clinical","hands precision surgery","people followup clinical","team acute highstakes"]],
    ["Ritmo","Qual destas situações você preferiria encontrar no trabalho?",
      ["Uma agenda planejada, com tempo para cada consulta","Casos que mudam rapidamente e exigem decisões imediatas","Um procedimento programado que exige concentração","Um serviço com diferentes problemas a organizar"],
      ["predictable followup people","acute highstakes clinical","hands precision surgery","systems team precision"]],
    ["Resultados","Que tipo de resultado do seu trabalho mais lhe motiva?",
      ["Perceber melhora após meses de cuidado","Resolver uma urgência naquele momento","Corrigir um problema com uma intervenção técnica","Encontrar o diagnóstico que explicava sintomas difíceis"],
      ["followup people clinical","acute highstakes team","hands surgery function","diagnosis complex visual"]],
    ["Populações","Com qual grupo você gostaria de trabalhar com mais frequência?",
      ["Crianças e adolescentes, incluindo suas famílias","Pessoas idosas com diferentes necessidades","Pessoas em acompanhamento ginecológico ou reprodutivo","Pessoas de idades e perfis variados"],
      ["kids people followup","elderly people complex","women people followup","clinical community diagnosis"]],
    ["Ambiente","Qual ambiente despertaria mais curiosidade em um estágio?",
      ["Consultório com retornos e acompanhamento","Sala de procedimentos ou centro cirúrgico","Sala de emergência com equipe multiprofissional","Laboratório de imagem ou diagnóstico"],
      ["people followup predictable","hands surgery precision","acute team highstakes","visual technology diagnosis"]],
    ["Problema","Qual desafio você preferiria estudar por horas?",
      ["Um quadro neurológico ou sistêmico difícil de diagnosticar","A técnica de uma intervenção complexa","Como recuperar movimento e independência depois de uma lesão","Como impedir que uma doença avance em uma comunidade"],
      ["diagnosis complex clinical","hands surgery precision","function followup team","community prevention systems"]],
    ["Tempo","Quando o atendimento é longo, o que costuma interessar mais?",
      ["Conhecer a história e as prioridades do paciente","Investigar várias hipóteses com calma","Executar uma avaliação técnica minuciosa","Planejar várias etapas do tratamento com outros profissionais"],
      ["people mental followup","diagnosis complex clinical","precision visual technology","team function followup"]],
    ["Responsabilidade","Em qual papel você gostaria de contribuir mais?",
      ["Tomar decisões rápidas para estabilizar alguém","Fazer a intervenção manual propriamente dita","Investigar o diagnóstico antes da conduta","Acompanhar resposta ao tratamento em consultas posteriores"],
      ["acute highstakes team","hands surgery precision","diagnosis clinical complex","followup clinical people"]],
    ["Tecnologia","Se você pudesse aprender apenas uma habilidade nova neste mês, qual escolheria?",
      ["Interpretar exames de imagem complexos","Dominar um instrumento ou técnica de procedimento","Conduzir entrevistas clínicas mais profundas","Analisar dados para melhorar o cuidado de uma população"],
      ["visual technology diagnosis","hands precision technology","people mental clinical","systems prevention research"]],
    ["Vínculo","Qual tipo de relação de trabalho parece mais estimulante?",
      ["Conhecer pacientes por muitos anos","Fazer contato breve e resolver uma necessidade pontual","Trabalhar principalmente com imagens, amostras ou laudos","Atender uma pessoa e dialogar de perto com sua família"],
      ["followup people clinical","acute hands clinical","visual precision technology","kids people community"]],
    ["Estilo","Em uma tarde sem urgências, o que preferiria fazer?",
      ["Uma sequência de consultas clínicas","Um conjunto de pequenos procedimentos","Revisar laudos e exames que exigem atenção","Participar de um projeto de prevenção ou gestão"],
      ["clinical followup people","hands precision technology","visual diagnosis precision","systems prevention community"]],
    ["Complexidade","Qual caso seria mais atraente para você assumir?",
      ["Uma doença crônica com várias condições associadas","Uma emergência com instabilidade clínica","Uma lesão com possibilidade de correção cirúrgica","Um sofrimento emocional que exige escuta cuidadosa"],
      ["complex clinical elderly","acute highstakes team","surgery hands function","mental people followup"]],
    ["Aprendizado","Que aula prática faria você querer permanecer até o final?",
      ["Reconhecimento de padrões em imagem ou microscopia","Técnicas cirúrgicas e instrumentação","Discussão de diagnóstico diferencial","Entrevista e comunicação em situações difíceis"],
      ["visual technology precision","hands surgery precision","diagnosis complex clinical","people mental clinical"]],
    ["Impacto","Onde você gostaria de perceber maior impacto do seu trabalho?",
      ["Na saúde de muitas pessoas por meio de prevenção","No restabelecimento de função de uma pessoa","Na resolução imediata de uma condição grave","No controle consistente de uma doença ao longo dos anos"],
      ["systems community prevention","function followup hands","acute highstakes team","clinical followup people"]],
    ["Planejamento","Quando pensa na sua semana de trabalho ideal, o que valoriza mais?",
      ["Horários relativamente estáveis e consultas programadas","Turnos intensos de atendimento agudo","Dias dedicados a intervenções técnicas","Alternar investigação, consulta e discussão de equipe"],
      ["predictable followup clinical","acute highstakes team","hands surgery precision","diagnosis clinical team"]],
    ["Especialização","Em que tipo de conhecimento você gostaria de se aprofundar?",
      ["Como funcionam doenças e tratamentos complexos","Técnicas de precisão e novos equipamentos","Desenvolvimento, ciclos de vida e prevenção","Psicologia clínica, comportamento e relações humanas"],
      ["diagnosis complex research","technology precision hands","kids women prevention","mental people followup"]],
    ["Paciente","Se pudesse ajudar uma pessoa em apenas uma destas situações, qual escolheria?",
      ["Uma criança e seus cuidadores em acompanhamento","Uma pessoa idosa com perda de autonomia","Uma gestante em uma etapa do cuidado","Um adulto com doença ainda sem explicação"],
      ["kids people prevention","elderly function followup","women people acute","diagnosis complex clinical"]],
    ["Colaboração","Que reunião de equipe mais lhe interessaria?",
      ["Discussão interdisciplinar de reabilitação","Revisão de condutas em paciente crítico","Discussão de casos complexos para definir diagnóstico","Planejamento de vacinação ou cuidado comunitário"],
      ["team function followup","team acute highstakes","diagnosis clinical complex","systems community prevention"]],
    ["Precisão","Qual tarefa você acharia mais recompensadora?",
      ["Realizar um movimento técnico delicado com precisão","Conferir pequenas alterações em imagens ou amostras","Ouvir a evolução de um paciente e ajustar a conduta","Investigar as falhas de um processo assistencial"],
      ["hands precision surgery","visual precision diagnosis","people followup clinical","systems precision research"]],
    ["Saúde mental","Durante um atendimento, o que mais gostaria de explorar?",
      ["O significado dos sintomas e o sofrimento emocional","O diagnóstico físico mais provável","A possibilidade de melhorar funcionalidade e autonomia","A necessidade de uma intervenção urgente"],
      ["mental people followup","diagnosis clinical complex","function people followup","acute hands highstakes"]],
    ["Decisões","Você prefere trabalhar com qual tipo de escolha?",
      ["Condutas que podem ser revistas em retornos futuros","Decisões imediatas com dados incompletos","Planejamento detalhado de uma intervenção","Análise técnica baseada em dados e critérios definidos"],
      ["followup clinical predictable","acute highstakes team","surgery hands precision","precision diagnosis systems"]],
    ["Investigação","Um exame tem resultado inesperado. O que você mais gostaria de fazer?",
      ["Integrar o resultado com sintomas e investigar causas","Rever a imagem ou amostra em busca de detalhes","Discutir o achado e o plano com o paciente","Avaliar se o serviço está interpretando os dados corretamente"],
      ["diagnosis complex clinical","visual precision technology","people followup clinical","systems research precision"]],
    ["Formação","Qual projeto extracurricular mais combina com seus interesses?",
      ["Treinamento prático de técnicas e simulações","Pesquisa sobre doenças e métodos diagnósticos","Ações educativas e prevenção na comunidade","Projeto de melhoria de processos de um hospital"],
      ["hands acute precision","research diagnosis complex","community prevention people","systems team research"]],
    ["Persistência","Qual situação prolongada você toleraria melhor porque acha interessante?",
      ["Acompanhar uma doença crônica por anos","Aprimorar a mesma técnica manual em muitos casos","Analisar dados e exames repetidamente com precisão","Lidar com turnos de elevada intensidade clínica"],
      ["followup people clinical","hands precision surgery","visual precision technology","acute highstakes team"]],
    ["Organização","Qual descrição do seu trabalho ideal chega mais perto do que deseja?",
      ["Conduzir consultas com autonomia e continuidade","Atuar em equipe diante de pacientes críticos","Executar intervenções técnicas planejadas","Fazer diagnósticos por imagem, laboratório ou investigação"],
      ["people followup predictable","acute highstakes team","hands surgery precision","visual diagnosis technology"]],
    ["Estudo","Ao ler um caso clínico, o que procura primeiro?",
      ["O raciocínio que conecta sinais ao diagnóstico","O momento de decidir a conduta imediata","A escolha e a execução do procedimento","Como explicar o caso e negociar objetivos com a pessoa"],
      ["diagnosis clinical complex","acute highstakes team","hands surgery precision","people mental followup"]],
    ["Experiência","Qual atividade lhe daria vontade de repetir um estágio?",
      ["Atender em atenção primária e prevenção","Participar de cirurgia com técnica especializada","Conduzir pacientes com problemas clínicos difíceis","Interagir com crianças e famílias em diferentes fases"],
      ["community prevention followup","surgery hands precision","clinical diagnosis complex","kids people followup"]],
    ["Evolução","Qual cenário seria mais gratificante seis meses depois?",
      ["A pessoa recuperou parte importante de sua função","Um paciente crônico alcançou melhor controle e qualidade de vida","Uma nova técnica aumentou a precisão dos procedimentos","Uma intervenção de saúde pública alcançou mais pessoas"],
      ["function followup people","clinical followup people","technology precision hands","community systems prevention"]],
    ["Escolha final","Qual turno você escolheria amanhã, sem pensar em prestígio ou remuneração?",
      ["Acompanhar pacientes com diferentes histórias e necessidades","Investigar um diagnóstico complicado com a equipe","Realizar um procedimento com acompanhamento supervisionado","Atender casos agudos em uma equipe de emergência"],
      ["people followup clinical","diagnosis complex team","hands precision surgery","acute team highstakes"]]
  ].map((row, i) => ({
    id: "vq" + (i + 1), section: row[0], text: row[1],
    options: row[2].map((label, index) => ({ id: index, label, tags: row[3][index].split(" ") }))
  }));

  function calculate(answers) {
    if (!Array.isArray(answers) || answers.length !== questions.length ||
        answers.some((n) => !Number.isInteger(n) || n < 0 || n > 3)) {
      throw new Error("Responda todas as perguntas para gerar o resultado.");
    }
    const observed = Object.fromEntries(Object.keys(labels).map((key) => [key, 0]));
    const expected = Object.fromEntries(Object.keys(labels).map((key) => [key, 0]));
    const ceiling = Object.fromEntries(Object.keys(labels).map((key) => [key, 0]));
    questions.forEach((question, index) => {
      const options = question.options;
      const chosen = options[answers[index]];
      Object.keys(labels).forEach((tag) => {
        const count = options.filter((option) => option.tags.includes(tag)).length;
        if (count) {
          expected[tag] += count / options.length;
          ceiling[tag] += 1;
        }
      });
      chosen.tags.forEach((tag) => { observed[tag] += 1; });
    });
    const scores = Object.fromEntries(Object.keys(labels).map((tag) => {
      const gap = observed[tag] - expected[tag];
      const denominator = gap >= 0 ? (ceiling[tag] - expected[tag]) : expected[tag];
      return [tag, denominator > 0 ? Math.max(-1, Math.min(1, gap / denominator)) : 0];
    }));
    const rank = catalogue.specialties.map((specialty) => {
      const values = specialty.tags.map((tag) => scores[tag] || 0);
      const mean = values.reduce((a, b) => a + b, 0) / Math.max(values.length, 1);
      // Leve bônus à coerência de mais de um ponto forte, sem fabricar probabilidades.
      const aligned = values.filter((v) => v > 0.15).length;
      return { ...specialty, affinity: mean + aligned * 0.015 };
    }).sort((a, b) => b.affinity - a.affinity || a.name.localeCompare(b.name, "pt-BR"));
    const top = rank.slice(0, 3).map((specialty) => {
      const strengths = [...specialty.tags].sort((a, b) => scores[b] - scores[a]).slice(0, 3);
      const frictions = [...specialty.tags].sort((a, b) => scores[a] - scores[b]).slice(0, 2);
      const areas = catalogue.areas
        .filter((area) => area.parents.includes(specialty.name))
        .map((area) => ({ ...area, affinity: area.tags.reduce((acc, tag) => acc + (scores[tag] || 0), 0) / area.tags.length }))
        .filter((area) => area.affinity > 0.08)
        .sort((a, b) => b.affinity - a.affinity || a.name.localeCompare(b.name,"pt-BR"))
        .slice(0, 2);
      return { ...specialty, strengths, frictions, areas };
    });
    const ordered = Object.keys(labels).sort((a, b) => scores[b] - scores[a] || a.localeCompare(b));
    const close = top.length > 1 && (top[0].affinity - top[1].affinity < 0.09);
    return { scores, ordered, top, close, responses: answers.length, version: "2026-10-28-v2" };
  }

  return Object.freeze({ questions, labels, catalogue, calculate });
});
