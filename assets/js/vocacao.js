(() => {
  "use strict";

  const dimensions = {
    R: { name: "Realista", short: "Prática, procedimentos e ação", desc: "Interesse por atividades práticas, instrumentação e intervenção direta." },
    I: { name: "Investigativa", short: "Investigação e raciocínio", desc: "Interesse por investigar mecanismos, integrar evidências e resolver problemas complexos." },
    A: { name: "Artística", short: "Criação e problemas abertos", desc: "Interesse por abordagens abertas, comunicação criativa e adaptação a situações singulares." },
    S: { name: "Social", short: "Relação e cuidado contínuo", desc: "Interesse por escuta, cuidado longitudinal, ensino e colaboração próxima." },
    E: { name: "Empreendedora", short: "Liderança e coordenação", desc: "Interesse por liderar equipes, negociar prioridades e mobilizar mudanças." },
    C: { name: "Convencional", short: "Método e organização", desc: "Interesse por processos estruturados, precisão, dados e protocolos." }
  };

  const items = [
    ["R", "Realizar procedimentos manuais delicados que exigem treino e precisão."],
    ["R", "Atuar em situações clínicas que pedem uma resposta prática e imediata."],
    ["R", "Usar equipamentos e instrumentos para diagnosticar ou tratar pacientes."],
    ["R", "Acompanhar uma intervenção do preparo até a recuperação inicial."],
    ["R", "Trabalhar em ambientes nos quais movimento e ação façam parte da rotina."],
    ["R", "Executar técnicas com as mãos e aprimorá-las com prática repetida."],
    ["I", "Investigar um diagnóstico quando os achados não apontam para uma única causa."],
    ["I", "Relacionar dados clínicos, exames e mecanismos de doença para explicar um caso."],
    ["I", "Ler estudos científicos e usar evidências para rever uma conduta."],
    ["I", "Aprofundar-se em uma pergunta clínica até compreender os detalhes do problema."],
    ["I", "Interpretar imagens, lâminas ou resultados laboratoriais para responder a uma dúvida."],
    ["I", "Participar de pesquisa ou de projetos que avaliem resultados em saúde."],
    ["A", "Lidar com casos únicos que exigem adaptar a abordagem, em vez de seguir uma sequência fixa."],
    ["A", "Explicar questões complexas de maneiras diferentes para cada pessoa."],
    ["A", "Construir um plano de cuidado que combine opções e objetivos pouco padronizados."],
    ["A", "Trabalhar com problemas em que há mais de uma resposta razoável."],
    ["A", "Encontrar formas novas de melhorar a experiência de pacientes e equipes."],
    ["A", "Combinar áreas de conhecimento para responder a necessidades pouco comuns."],
    ["S", "Acompanhar uma pessoa e sua família ao longo de diferentes fases da vida."],
    ["S", "Escutar com atenção preocupações que não aparecem nos exames."],
    ["S", "Ajudar pacientes a compreender opções e participar das decisões sobre o cuidado."],
    ["S", "Ensinar pacientes, estudantes ou colegas em conversas individuais ou em grupo."],
    ["S", "Coordenar o cuidado com profissionais de diferentes áreas."],
    ["S", "Trabalhar com prevenção e promoção de saúde junto a pessoas ou comunidades."],
    ["E", "Organizar uma equipe para responder a uma demanda clínica importante."],
    ["E", "Tomar decisões e definir prioridades quando há pouco tempo ou recursos limitados."],
    ["E", "Negociar um plano de cuidado entre necessidades diferentes de pacientes e serviços."],
    ["E", "Liderar iniciativas para mudar um processo que prejudica o cuidado."],
    ["E", "Representar uma equipe ou serviço em reuniões e decisões institucionais."],
    ["E", "Assumir responsabilidade pela coordenação de um serviço ou projeto."],
    ["C", "Conferir informações clínicas e registros com atenção a detalhes."],
    ["C", "Trabalhar com protocolos e critérios definidos para reduzir erros."],
    ["C", "Organizar dados e resultados para acompanhar padrões ao longo do tempo."],
    ["C", "Manter documentação clara e consistente para apoiar a continuidade do cuidado."],
    ["C", "Revisar um processo passo a passo para encontrar falhas ou inconsistências."],
    ["C", "Usar listas, fluxos ou sistemas de classificação para orientar decisões complexas."]
  ].map(([dimension, text], index) => ({ id: index, dimension, text }));

  // Áreas de acesso direto: catálogo do ENARE 2025/2026 e atualização das normas CNRM.
  // Os pares RIASEC são hipóteses de exploração baseadas em tarefas típicas; ainda não passaram por validação com especialistas ou residentes.
  const specialties = [
    ["Acupuntura", "R I", "Intervenção terapêutica e avaliação clínica."],
    ["Anestesiologia", "R I", "Procedimentos, monitorização e decisões em tempo real."],
    ["Cirurgia Geral", "R I", "Procedimentos, resolução prática e raciocínio diagnóstico."],
    ["Clínica Médica", "I S", "Investigação diagnóstica e cuidado abrangente de adultos."],
    ["Dermatologia", "I R", "Reconhecimento de padrões e procedimentos ambulatoriais."],
    ["Genética Médica", "I S", "Investigação diagnóstica, aconselhamento e cuidado familiar."],
    ["Homeopatia", "S I", "Consulta clínica e compreensão individualizada de sintomas."],
    ["Infectologia", "I S", "Raciocínio diagnóstico, terapêutico e prevenção de infecções."],
    ["Medicina de Emergência", "R I", "Avaliação rápida e intervenções em quadros agudos."],
    ["Medicina de Família e Comunidade", "S I", "Cuidado contínuo, integral e próximo do território."],
    ["Medicina do Esporte", "R S", "Avaliação funcional, prevenção e retorno à atividade."],
    ["Medicina do Trabalho", "S C", "Cuidado, prevenção e acompanhamento de saúde ocupacional."],
    ["Medicina de Tráfego", "C I", "Avaliação clínica e aplicação de critérios de aptidão."],
    ["Medicina Física e Reabilitação", "S R", "Reabilitação, função e planos de cuidado individualizados."],
    ["Medicina Intensiva", "R I", "Monitorização, decisões complexas e cuidado de alta intensidade."],
    ["Medicina Legal e Perícia Médica", "I C", "Análise técnica, documentação e aplicação de critérios."],
    ["Medicina Nuclear", "I C", "Métodos diagnósticos e terapêuticos com tecnologia e precisão."],
    ["Medicina Preventiva e Social", "I S", "Epidemiologia, saúde coletiva e organização do cuidado."],
    ["Neurocirurgia", "R I", "Procedimentos de alta complexidade e raciocínio neuroanatômico."],
    ["Neurologia", "I S", "Localização diagnóstica e acompanhamento de condições neurológicas."],
    ["Ginecologia e Obstetrícia", "R S", "Procedimentos, saúde reprodutiva e cuidado em diferentes fases."],
    ["Oftalmologia", "R I", "Exame especializado, procedimentos e uso de equipamentos."],
    ["Ortopedia e Traumatologia", "R I", "Avaliação musculoesquelética, trauma e procedimentos."],
    ["Otorrinolaringologia", "R I", "Diagnóstico por exame direto e procedimentos especializados."],
    ["Patologia", "I C", "Análise de tecidos, investigação diagnóstica e precisão."],
    ["Patologia Clínica / Medicina Laboratorial", "I C", "Interpretação de exames, qualidade e sistemas laboratoriais."],
    ["Pediatria", "S I", "Cuidado de crianças e adolescentes, prevenção e orientação familiar."],
    ["Psiquiatria", "S I", "Escuta clínica, compreensão diagnóstica e cuidado longitudinal."],
    ["Radiologia e Diagnóstico por Imagem", "I C", "Interpretação de imagens, tecnologia e precisão diagnóstica."],
    ["Radioterapia", "I R", "Planejamento terapêutico técnico e cuidado oncológico."]
  ].map(([name, code, focus]) => ({ name, code: code.split(" "), focus }));

  const questionDimensionOrder = new Map(["R", "I", "S", "C", "A", "E"].map((key, index) => [key, index]));
  items.sort((a, b) => (a.id % 6) - (b.id % 6) || questionDimensionOrder.get(a.dimension) - questionDimensionOrder.get(b.dimension));
  const labels = ["Não me interessa", "Pouco interesse", "Ainda não sei", "Tenho interesse", "Muito interesse"];
  const answers = Array(items.length).fill(null);
  let current = 0;

  const $ = (id) => document.getElementById(id);
  const intro = $("voc-intro");
  const quiz = $("voc-quiz");
  const results = $("voc-results");
  const optionBox = $("voc-options");

  function renderQuestion() {
    const item = items[current];
    $("voc-dimension").textContent = "PREFERÊNCIAS DE TRABALHO";
    $("voc-question").textContent = item.text;
    $("voc-count").textContent = `${current + 1} de ${items.length}`;
    $("voc-progress").setAttribute("aria-valuenow", String(current + 1));
    $("voc-progress-fill").style.width = `${((current + 1) / items.length) * 100}%`;
    $("voc-back").disabled = current === 0;
    $("voc-next").textContent = current === items.length - 1 ? "Ver meu mapa →" : "Próxima →";
    $("voc-error").textContent = "";
    optionBox.innerHTML = "";
    labels.forEach((label, index) => {
      const value = index + 1;
      const button = document.createElement("button");
      button.type = "button";
      button.className = "voc-option";
      button.setAttribute("aria-pressed", String(answers[current] === value));
      button.setAttribute("aria-label", `${value}: ${label}`);
      button.innerHTML = `<strong>${value}</strong><span>${label}</span>`;
      button.addEventListener("click", () => {
        answers[current] = value;
        [...optionBox.children].forEach((node, i) => node.setAttribute("aria-pressed", String(i + 1 === value)));
        $("voc-error").textContent = "";
      });
      optionBox.append(button);
    });
  }

  function calculate() {
    const sums = Object.fromEntries(Object.keys(dimensions).map((key) => [key, { sum: 0, count: 0 }]));
    items.forEach((item, index) => {
      sums[item.dimension].sum += answers[index];
      sums[item.dimension].count += 1;
    });
    const scores = Object.fromEntries(Object.entries(sums).map(([key, value]) => [key, Math.round(((value.sum - value.count) / (value.count * 4)) * 100)]));
    return { scores, order: Object.keys(scores).sort((a, b) => scores[b] - scores[a] || a.localeCompare(b)) };
  }

  function renderResults() {
    const { scores, order } = calculate();
    const profile = order.slice(0, 3).join("");
    const matches = specialties.map((specialty) => ({
      ...specialty,
      score: Math.round(specialty.code.reduce((sum, key) => sum + scores[key], 0) / specialty.code.length)
    })).sort((a, b) => b.score - a.score || a.name.localeCompare(b.name, "pt-BR"));

    const scoreCards = order.map((key) => `<div class="voc-score"><div class="voc-score-head"><span><strong>${key}</strong> · ${dimensions[key].name}</span><strong>${scores[key]}%</strong></div><div class="voc-score-track" aria-label="${dimensions[key].name}: ${scores[key]}%"><span style="width:${scores[key]}%"></span></div><small>${dimensions[key].desc}</small></div>`).join("");
    const topMatches = matches.slice(0, 5).map((area) => `<article class="voc-match"><div class="voc-match-top"><h3>${area.name}</h3><span class="voc-match-score">${area.score}%</span></div><p>${area.focus}</p><p>Interesses relacionados: ${area.code.map((key) => dimensions[key].name).join(" + ")}</p></article>`).join("");
    const allAreas = matches.map((area) => `<li><strong>${area.name}</strong><span> · Índice ${area.score}% · RIASEC ${area.code.join("")}</span></li>`).join("");
    results.innerHTML = `
      <p class="voc-kicker">SEU MAPA DE INTERESSES</p>
      <h2 id="voc-results-title">Seu perfil combina curiosidades diferentes</h2>
      <p class="voc-code" aria-label="Código de interesses ${profile.split("").join(", ")}">${profile.split("").join(" · ")}</p>
      <p class="voc-result-intro">As três letras destacam as dimensões mais altas neste questionário. Veja abaixo as seis pontuações e áreas de acesso direto com interesses de trabalho relacionados. As áreas não são uma previsão de satisfação ou desempenho; leia os pontos de contato e use-os para escolher o que pesquisar, conversar e vivenciar.</p>
      <h2>Seu perfil RIASEC</h2><div class="voc-score-grid">${scoreCards}</div>
      <h2>Áreas para explorar primeiro</h2><div class="voc-match-list">${topMatches}</div>
      <details class="voc-all-areas"><summary>Ver as 30 áreas de acesso direto incluídas</summary><ul>${allAreas}</ul></details>
      <p class="voc-result-intro">A pontuação ao lado de cada área é a média das dimensões RIASEC associadas às atividades típicas descritas. É um índice exploratório criado para esta página, não uma medida validada de compatibilidade. Empates e diferenças pequenas não devem ser interpretados como preferência firme.</p>
      <div class="voc-actions"><button id="voc-restart" class="voc-button voc-button-primary" type="button">Refazer questionário</button><a class="voc-button voc-button-secondary" href="/dashboard/">Voltar ao dashboard</a></div>`;
    results.hidden = false;
    quiz.hidden = true;
    results.scrollIntoView({ behavior: "smooth", block: "start" });
    $("voc-restart").addEventListener("click", () => {
      answers.fill(null);
      current = 0;
      results.hidden = true;
      quiz.hidden = false;
      renderQuestion();
      $("voc-question").focus();
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  $("voc-start").addEventListener("click", () => {
    intro.hidden = true;
    quiz.hidden = false;
    renderQuestion();
    $("voc-question").focus();
  });
  $("voc-back").addEventListener("click", () => {
    if (current > 0) { current -= 1; renderQuestion(); $("voc-question").focus(); }
  });
  $("voc-next").addEventListener("click", () => {
    if (answers[current] === null) {
      $("voc-error").textContent = "Escolha uma opção para continuar.";
      optionBox.querySelector("button")?.focus();
      return;
    }
    if (current === items.length - 1) { renderResults(); return; }
    current += 1;
    renderQuestion();
    $("voc-question").focus();
  });
  document.addEventListener("keydown", (event) => {
    if (quiz.hidden || !/^[1-5]$/.test(event.key)) return;
    const value = Number(event.key);
    answers[current] = value;
    [...optionBox.children].forEach((node, i) => node.setAttribute("aria-pressed", String(i + 1 === value)));
    $("voc-error").textContent = "";
  });
})();
