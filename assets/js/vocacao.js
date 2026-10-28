(() => {
  "use strict";
  const engine = window.LuriaVocacaoEngine;
  if (!engine || !engine.catalogue || !engine.questions) {
    console.error("LURIA: catálogo vocacional indisponível.");
    return;
  }
  const { questions, labels, catalogue } = engine;
  const $ = (id) => document.getElementById(id);
  const intro = $("voc-intro");
  const quiz = $("voc-quiz");
  const results = $("voc-results");
  const choices = $("voc-options");
  const storageKey = "luria.vocacao.v2.session";
  const answers = Array(questions.length).fill(null);
  let current = 0;

  // Progresso apenas na aba atual, sem enviar respostas para servidores.
  function save() {
    try { sessionStorage.setItem(storageKey, JSON.stringify({ current, answers })); } catch (_) {}
  }
  function restore() {
    try {
      const saved = JSON.parse(sessionStorage.getItem(storageKey) || "null");
      if (!saved || !Array.isArray(saved.answers) || saved.answers.length !== answers.length) return false;
      if (!saved.answers.every((value) => value === null || (Number.isInteger(value) && value >= 0 && value <= 3))) return false;
      saved.answers.forEach((answer, index) => { answers[index] = answer; });
      current = Number.isInteger(saved.current) ? Math.max(0, Math.min(questions.length - 1, saved.current)) : 0;
      return true;
    } catch (_) { return false; }
  }
  const text = (value) => String(value || "").replace(/[&<>"']/g, (char) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
  }[char]));
  const name = (tag) => (labels[tag] || [tag])[0];
  const detail = (tag) => (labels[tag] || [tag, ""])[1];
  const phrase = (names) => {
    const values = names.map(name);
    if (values.length < 2) return values[0] || "";
    return values.slice(0, -1).join(", ") + " e " + values[values.length - 1];
  };
  const stage = (step) => {
    intro.hidden = step !== "intro";
    quiz.hidden = step !== "quiz";
    results.hidden = step !== "results";
  };

  function renderQuestion() {
    const question = questions[current];
    $("voc-dimension").textContent = question.section.toUpperCase();
    $("voc-question").textContent = question.text;
    $("voc-count").textContent = (current + 1) + " de " + questions.length;
    const bar = $("voc-progress");
    bar.setAttribute("aria-valuemax", String(questions.length));
    bar.setAttribute("aria-valuenow", String(current + 1));
    $("voc-progress-fill").style.width = ((current + 1) / questions.length * 100) + "%";
    choices.innerHTML = question.options.map((option, index) =>
      '<button type="button" class="voc-option" data-value="' + index + '" aria-pressed="' + (answers[current] === index) + '">' +
      '<strong class="voc-option-letter" aria-hidden="true">' + String.fromCharCode(65 + index) + '</strong>' +
      '<span>' + text(option.label) + '</span></button>'
    ).join("");
    choices.querySelectorAll("button").forEach((button) => {
      button.addEventListener("click", () => {
        answers[current] = Number(button.dataset.value);
        choices.querySelectorAll("button").forEach((b) => b.setAttribute("aria-pressed", String(b === button)));
        $("voc-error").textContent = "";
        $("voc-next").disabled = false;
        save();
      });
    });
    $("voc-error").textContent = "";
    $("voc-back").disabled = current === 0;
    $("voc-next").disabled = answers[current] === null;
    $("voc-next").textContent = current === questions.length - 1 ? "Ver meu resultado →" : "Próxima →";
  }

  function showQuiz() {
    stage("quiz");
    renderQuestion();
    $("voc-question").focus({ preventScroll: true });
    quiz.scrollIntoView({ block: "start", behavior: "smooth" });
  }

  function next() {
    if (answers[current] === null) {
      $("voc-error").textContent = "Escolha uma alternativa para continuar.";
      return;
    }
    if (current === questions.length - 1) {
      renderResults();
    } else {
      current += 1;
      save();
      showQuiz();
    }
  }

  function section(title, content) {
    return '<section class="voc-report-section"><h3>' + title + '</h3>' + content + '</section>';
  }

  function renderResults() {
    let report;
    try { report = engine.calculate(answers); }
    catch (error) {
      $("voc-error").textContent = error.message;
      return;
    }
    const preferenceTags = report.ordered.filter((tag) => report.scores[tag] > 0.09).slice(0, 5);
    const lessChosen = [...report.ordered].reverse().filter((tag) => report.scores[tag] < -0.1).slice(0, 3);
    const mainProfile = preferenceTags.length
      ? "Nas suas respostas, você se aproximou principalmente de atividades ligadas a " + phrase(preferenceTags.slice(0, 3)).toLowerCase() + "."
      : "Suas escolhas ficaram distribuídas entre diferentes estilos de trabalho. Isso também é uma informação útil: vale explorar cenários diferentes antes de decidir.";
    const why = preferenceTags.length > 1
      ? "Você selecionou repetidamente tarefas que envolvem " + phrase(preferenceTags).toLowerCase() + ". Isso descreve interesses manifestados aqui, não habilidades comprovadas."
      : "As respostas não indicaram uma preferência dominante. Use os resultados como hipóteses para explorar em estágios, ligas e conversas com especialistas.";
    const cautions = lessChosen.length
      ? "Você escolheu menos vezes alternativas relacionadas a " + phrase(lessChosen).toLowerCase() + ". Não significa incapacidade nessas atividades; pode apontar aspectos da rotina que merecem ser vivenciados antes da escolha."
      : "Não apareceu um conjunto consistente de atividades evitadas. As escolhas podem variar conforme experiência, contexto e momento de carreira.";
    const cards = report.top.map((specialty, index) => {
      const aligned = specialty.strengths.filter((tag) => report.scores[tag] > 0.03);
      const relevant = aligned.length ? aligned.slice(0, 3) : specialty.strengths.slice(0, 2);
      const low = specialty.frictions.filter((tag) => report.scores[tag] < -0.08);
      const follow = specialty.areas[0] || null;
      return '<article class="voc-match">' +
        '<div class="voc-match-top"><h3>' + (index + 1) + 'ª opção · ' + text(specialty.name) + '</h3><span class="voc-match-score">Afinidade exploratória</span></div>' +
        '<p><strong>Por que apareceu:</strong> atividades associadas a ' + text(phrase(relevant).toLowerCase()) + ' foram compatíveis com parte das suas respostas.</p>' +
        '<p><strong>Formação:</strong> ' + text(specialty.prerequisite) + ' · residência na especialidade: ' + specialty.years + ' ano' + (specialty.years > 1 ? 's' : '') + '.</p>' +
        '<p><strong>O que observar na prática:</strong> ' + (low.length
          ? 'tarefas relacionadas a ' + text(phrase(low).toLowerCase()) + ' apareceram menos nas suas escolhas. Veja como elas realmente entram na rotina.'
          : 'observe a divisão entre atendimentos, procedimentos, plantões e acompanhamento; a prática varia por serviço.') + '</p>' +
        (follow ? '<p><strong>Possível aprofundamento:</strong> ' + text(follow.name) + ' (' + follow.years + ' ano' + (follow.years > 1 ? 's' : '') + ' adicional(is)). Exige formação prévia e requisitos próprios; é uma área de atuação, não uma quarta recomendação.</p>' : '') +
        '<p><strong>Como testar:</strong> acompanhe um turno real, pergunte sobre a parte mais frequente (não só a mais interessante) do trabalho e compare com sua expectativa.</p>' +
      '</article>';
    }).join("");
    results.innerHTML =
      '<p class="voc-kicker">SEU RELATÓRIO VOCACIONAL</p>' +
      '<h2 id="voc-results-title">Seu jeito de se interessar pela Medicina</h2>' +
      '<p class="voc-result-intro">' + text(mainProfile) + ' O resultado é uma ferramenta de reflexão e não define sua identidade ou carreira.</p>' +
      section("O que suas respostas mostram", '<p>' + text(why) + '</p>' +
        '<div class="voc-report-tags">' + (preferenceTags.length ? preferenceTags.map((tag) => '<span title="' + text(detail(tag)) + '">' + text(name(tag)) + '</span>').join("") : '<span>Interesses diversos</span>') + '</div>') +
      section("Pontos de atenção para sua rotina", '<p>' + text(cautions) + '</p>') +
      '<h2 class="voc-top-title">Seus três caminhos para explorar</h2>' +
      '<p class="voc-result-intro">A ordem é relativa às respostas deste questionário, não uma probabilidade de sucesso ou satisfação.' +
      (report.close ? ' As primeiras opções têm pontuações próximas: não interprete a ordem como diferença significativa.' : '') + '</p>' +
      '<div class="voc-match-list">' + cards + '</div>' +
      section("Como validar o seu perfil", '<p>Experimente um dia típico em cada área, converse com residentes e profissionais de diferentes serviços, observe o volume de atividades repetitivas e reflita sobre o que você gostaria de fazer em uma semana comum — não apenas em um caso excepcional.</p>') +
      '<p class="voc-result-intro"><strong>Limites:</strong> estas associações foram construídas editorialmente para orientação educacional e ainda não passaram por validação psicométrica ou estudo de predição de escolha profissional. As descrições de formação seguem o catálogo CFM 2.472/2026 e podem mudar.</p>' +
      '<div class="voc-actions"><button id="voc-restart" class="voc-button voc-button-primary" type="button">Refazer teste</button>' +
      '<button id="voc-review" class="voc-button voc-button-secondary" type="button">Revisar respostas</button>' +
      '<a href="/aplicar/" class="voc-button voc-button-secondary">Voltar ao Aplicar</a></div>';
    stage("results");
    save();
    results.scrollIntoView({ block: "start", behavior: "smooth" });
    $("voc-restart").addEventListener("click", reset);
    $("voc-review").addEventListener("click", () => { current = 0; save(); showQuiz(); });
  }

  function reset() {
    answers.fill(null);
    current = 0;
    try { sessionStorage.removeItem(storageKey); } catch (_) {}
    showQuiz();
  }

  function renderCatalogue() {
    const query = ($("voc-search").value || "").normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().trim();
    const kind = $("voc-kind").value;
    const items = [...catalogue.specialties, ...catalogue.areas].filter((item) => {
      if (kind !== "all" && item.type !== kind) return false;
      const haystack = (item.name + " " + item.prerequisite).normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
      return haystack.includes(query);
    }).sort((a,b) => a.name.localeCompare(b.name, "pt-BR"));
    $("voc-catalog-count").textContent = items.length + " resultado(s) no catálogo";
    $("voc-catalog-items").innerHTML = items.length ? items.map((item) =>
      '<article class="voc-catalog-item"><strong>' + text(item.name) + '</strong><span>' +
      (item.type === "area" ? "Área de atuação" : "Especialidade") +
      ' · ' + item.years + ' ano' + (item.years > 1 ? 's' : '') +
      '</span><small>' + (item.type === "area" ? "Pré-requisitos: " : "Ingresso: ") + text(item.prerequisite) + '</small></article>'
    ).join("") : '<p>Nenhum item encontrado. Tente outra palavra.</p>';
  }

  $("voc-start").addEventListener("click", () => { current = 0; save(); showQuiz(); });
  $("voc-back").addEventListener("click", () => {
    if (current > 0) { current -= 1; save(); showQuiz(); }
  });
  $("voc-next").addEventListener("click", next);
  $("voc-search").addEventListener("input", renderCatalogue);
  $("voc-kind").addEventListener("change", renderCatalogue);
  $("voc-catalogue").addEventListener("toggle", () => {
    if ($("voc-catalogue").open) renderCatalogue();
  });
  document.addEventListener("keydown", (event) => {
    if (quiz.hidden || event.altKey || event.metaKey || event.ctrlKey ||
        ["INPUT", "TEXTAREA", "SELECT"].includes(document.activeElement?.tagName)) return;
    const option = Number(event.key) - 1;
    if (Number.isInteger(option) && option >= 0 && option < 4) {
      choices.querySelectorAll(".voc-option")[option]?.click();
    } else if (event.key === "Enter" && document.activeElement?.tagName !== "BUTTON") {
      next();
    }
  });
  if (restore() && answers.some((answer) => answer !== null)) showQuiz();
  else stage("intro");
})();
