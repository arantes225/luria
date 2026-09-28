(() => {
  const sb = window.supabaseClient;
  const points = [100, 80, 60, 40, 20];
  let challenge = null;
  let progress = null;
  let user = null;
  let startedAt = Date.now();

  const els = {
    loading: document.getElementById("daily-loading"),
    unavailable: document.getElementById("daily-unavailable"),
    content: document.getElementById("daily-content"),
    area: document.getElementById("daily-area"),
    number: document.getElementById("daily-number"),
    cardDate: document.getElementById("daily-card-date"),
    clues: document.getElementById("daily-clues"),
    feedback: document.getElementById("daily-feedback"),
    form: document.getElementById("daily-form"),
    answer: document.getElementById("daily-answer"),
    submit: document.getElementById("daily-submit"),
    ring: document.getElementById("daily-ring"),
    ringValue: document.getElementById("daily-ring-value"),
    visibleCount: document.getElementById("daily-visible-count"),
    time: document.getElementById("daily-time"),
    attempts: document.getElementById("daily-attempts"),
    recent: document.getElementById("daily-recent-list"),
    totalDone: document.getElementById("daily-total-done"),
    averageClues: document.getElementById("daily-average-clues"),
    result: document.getElementById("daily-result"),
    resultIcon: document.getElementById("daily-result-icon"),
    resultKicker: document.getElementById("daily-result-kicker"),
    diagnosis: document.getElementById("daily-diagnosis"),
    explanation: document.getElementById("daily-explanation"),
    finalScore: document.getElementById("daily-final-score"),
    finalAttempts: document.getElementById("daily-final-attempts")
  };

  function saoPauloDateISO() {
    const parts = new Intl.DateTimeFormat("en-US", {
      timeZone: "America/Sao_Paulo",
      year: "numeric", month: "2-digit", day: "2-digit"
    }).formatToParts(new Date());
    const value = Object.fromEntries(parts.map(p => [p.type, p.value]));
    return value.year + "-" + value.month + "-" + value.day;
  }

  function selectedDateISO() {
    const today = saoPauloDateISO();
    const requested = new URLSearchParams(window.location.search).get("date");
    if (!requested || !/^\d{4}-\d{2}-\d{2}$/.test(requested)) return today;
    return requested <= today ? requested : today;
  }

  function formatDate(iso, withWeekday = false) {
    const [y,m,d] = iso.split("-").map(Number);
    return new Intl.DateTimeFormat("pt-BR", {
      ...(withWeekday ? { weekday: "long" } : {}),
      day: "2-digit", month: "long", year: "numeric"
    }).format(new Date(y, m - 1, d));
  }

  function esc(value) {
    return String(value ?? "").replace(/[&<>"']/g, c => ({
      "&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"
    }[c]));
  }

  function showFeedback(message, type) {
    els.feedback.textContent = message;
    els.feedback.className = "daily-feedback " + type;
    els.feedback.hidden = false;
  }

  function hideFeedback() {
    els.feedback.hidden = true;
    els.feedback.textContent = "";
  }

  function clueCount() {
    return Math.max(1, Math.min(5, Number(progress?.revealed_clues || 1)));
  }

  function renderSummary() {
    const visible = clueCount();
    const pct = Math.round((visible / 5) * 100);
    els.ring?.style.setProperty("--ring", pct + "%");
    if (els.ringValue) els.ringValue.textContent = visible + "/5";
    if (els.visibleCount) els.visibleCount.textContent = visible + " / 5";
    if (els.attempts) els.attempts.textContent = String(progress?.attempts || 0);
  }

  function renderClues() {
    const unlocked = clueCount();
    const won = progress?.status === "won";
    const lost = progress?.status === "lost";
    const visible = won || lost ? 5 : unlocked;

    els.clues.innerHTML = Array.from({length: visible}, (_, i) => {
      const n = i + 1;
      const classes = ["daily-clue"];
      const stepClasses = ["daily-track-step"];

      if (!won && !lost && n === unlocked) {
        classes.push("is-current");
        stepClasses.push("is-current");
      } else if (n < unlocked || won || lost) {
        classes.push("is-unlocked");
        stepClasses.push("is-visible");
      }
      if (won && n === unlocked) {
        classes.push("is-correct");
        stepClasses.push("is-correct");
      }

      const text = challenge["clue_" + n] || "";

      return '<div class="daily-clue-row">' +
        '<div class="' + stepClasses.join(" ") + '">' +
          '<span>' + n + '</span><small>Pista ' + n + '</small>' +
        '</div>' +
        '<div class="' + classes.join(" ") + '"><div class="daily-clue-inner">' +
          '<div class="daily-clue-copy"><p>' + esc(text) + '</p></div>' +
        '</div></div>' +
      '</div>';
    }).join("");

    renderSummary();
  }
  function renderHeader() {
    els.area.textContent = challenge.area || "Desafio clínico";
    if (els.number) els.number.textContent = "#" + String(challenge.id).padStart(3, "0");
    if (els.cardDate) els.cardDate.textContent = formatDate(challenge.challenge_date, false);
  }

  function startTimer() {
    startedAt = Date.now();
    const tick = () => {
      if (!els.time) return;
      const min = Math.max(0, Math.floor((Date.now() - startedAt) / 60000));
      els.time.textContent = min + " min";
    };
    tick();
    window.setInterval(tick, 30000);
  }

  async function loadRecent() {
    try {
      const today = saoPauloDateISO();

      const { data: challenges, error: challengeError } = await sb
        .from("daily_challenges")
        .select("id,challenge_date,area")
        .lt("challenge_date", today)
        .eq("active", true)
        .order("challenge_date", { ascending: false })
        .limit(5);

      if (challengeError) throw challengeError;
      if (!challenges?.length) {
        els.recent.innerHTML = '<div class="daily-recent-empty">Nenhum desafio anterior disponível.</div>';
        return;
      }

      const ids = challenges.map(c => c.id);
      const { data: rows, error: progressError } = await sb
        .from("daily_challenge_progress")
        .select("challenge_id,status,revealed_clues,attempts")
        .eq("user_id", user.id)
        .in("challenge_id", ids);

      if (progressError) throw progressError;
      const byId = Object.fromEntries((rows || []).map(r => [String(r.challenge_id), r]));

      els.recent.innerHTML = challenges.map(c => {
        const p = byId[String(c.id)];
        const status = p?.status || "not_started";
        const statusClass = status === "won" ? "is-won" : status === "lost" ? "is-lost" : "is-pending";
        const statusIcon = status === "won" ? "✓" : status === "lost" ? "×" : "→";
        const statusLabel = status === "won" ? "Concluído" : status === "lost" ? "Encerrado" : p ? "Continuar" : "Fazer";
        return '<button class="daily-recent-item" type="button" data-date="' + esc(c.challenge_date) + '">' +
          '<span class="daily-recent-cal">▣</span>' +
          '<div class="daily-recent-copy"><strong>' + esc(formatDate(c.challenge_date)) + '</strong><small>' + esc(c.area || "") + ' · ' + statusLabel + '</small></div>' +
          '<span class="daily-recent-status ' + statusClass + '">' + statusIcon + '</span>' +
        '</button>';
      }).join("");

      els.recent.querySelectorAll("[data-date]").forEach(button => {
        button.addEventListener("click", () => {
          const date = button.getAttribute("data-date");
          if (!date) return;
          window.location.href = "/desafio-diario/?date=" + encodeURIComponent(date);
        });
      });
    } catch (error) {
      console.warn("Histórico do desafio:", error);
      els.recent.innerHTML = '<div class="daily-recent-empty">Não foi possível carregar os desafios anteriores.</div>';
    }
  }

  async function loadGeneralSummary() {
    try {
      const { data: rows, error } = await sb
        .from("daily_challenge_progress")
        .select("status,revealed_clues")
        .eq("user_id", user.id)
        .in("status", ["won","lost"]);

      if (error) throw error;
      const completed = rows || [];
      const wins = completed.filter(r => r.status === "won");
      const avg = wins.length
        ? wins.reduce((sum, r) => sum + Number(r.revealed_clues || 1), 0) / wins.length
        : null;

      if (els.totalDone) els.totalDone.textContent = String(completed.length);
      if (els.averageClues) els.averageClues.textContent = avg == null ? "—" : avg.toFixed(1).replace(".", ",");
    } catch (error) {
      console.warn("Resumo geral do desafio:", error);
    }
  }
  async function showResult(result) {
    if (!result) return;
    els.form.hidden = true;
    els.result.hidden = false;
    els.resultIcon.textContent = result.status === "won" ? "✓" : "×";
    els.resultKicker.textContent = result.status === "won" ? "DIAGNÓSTICO CORRETO" : "FIM DO DESAFIO";
    els.diagnosis.textContent = result.diagnosis || "";
    els.explanation.textContent = result.explanation || "";
    els.finalScore.textContent = String(result.score || 0);
    els.finalAttempts.textContent = String(result.attempts || 0);
    if (result.status === "won") {
      renderClues();
      showFeedback("Acertou! Desafio concluído.", "ok");
    } else {
      renderClues();
      showFeedback("As cinco pistas foram usadas. Confira o diagnóstico abaixo.", "error");
    }
    await loadRecent();
    await loadGeneralSummary();
  }

  async function loadTerminalResult() {
    const { data, error } = await sb.rpc("get_daily_challenge_result", {
      p_challenge_id: challenge.id
    });
    if (error) throw error;
    if (data) await showResult(data);
  }

  async function load() {
    try {
      if (!sb) throw new Error("Cliente Supabase não inicializado.");
      const { data: authData, error: authError } = await sb.auth.getUser();
      if (authError || !authData?.user) {
        els.loading.hidden = true;
        els.unavailable.hidden = false;
        const title = els.unavailable.querySelector("strong");
        const p = els.unavailable.querySelector("p");
        if (title) title.textContent = "Sessão não encontrada";
        if (p) p.textContent = "Entre novamente para abrir o Desafio Diário.";
        return;
      }
      user = authData.user;

      const selectedDate = selectedDateISO();
      const { data: challengeData, error: challengeError } = await sb
        .from("daily_challenges")
        .select("id,challenge_date,area,clue_1,clue_2,clue_3,clue_4,clue_5,active")
        .eq("challenge_date", selectedDate)
        .eq("active", true)
        .maybeSingle();

      if (challengeError) throw challengeError;

      els.loading.hidden = true;
      if (!challengeData) {
        els.unavailable.hidden = false;
        return;
      }

      challenge = challengeData;

      const { data: progressData, error: progressError } = await sb
        .from("daily_challenge_progress")
        .select("attempts,revealed_clues,score,status,answers")
        .eq("user_id", user.id)
        .eq("challenge_id", challenge.id)
        .maybeSingle();

      if (progressError) throw progressError;

      progress = progressData || {
        attempts: 0,
        revealed_clues: 1,
        score: 0,
        status: "in_progress",
        answers: []
      };

      renderHeader();
      renderClues();
      els.content.hidden = false;
      startTimer();
      loadRecent();
      loadGeneralSummary();

      if (progress.status === "won" || progress.status === "lost") {
        await loadTerminalResult();
      } else {
        setTimeout(() => els.answer?.focus(), 80);
      }
    } catch (error) {
      console.error("Desafio Diário:", error);
      els.loading.hidden = true;
      els.unavailable.hidden = false;
      const p = els.unavailable.querySelector("p");
      if (p) p.textContent = "Não foi possível carregar o desafio. Tente novamente.";
    }
  }

  els.form?.addEventListener("submit", async (event) => {
    event.preventDefault();
    if (!challenge || !user || progress?.status !== "in_progress") return;

    const answer = els.answer.value.trim();
    if (!answer) return;

    els.submit.disabled = true;
    els.answer.disabled = true;
    hideFeedback();

    try {
      const { data, error } = await sb.rpc("submit_daily_challenge_answer", {
        p_challenge_id: challenge.id,
        p_answer: answer
      });
      if (error) throw error;

      progress = {
        ...progress,
        attempts: data.attempts,
        revealed_clues: data.revealed_clues,
        score: data.score,
        status: data.status
      };

      renderClues();

      if (data.status === "won" || data.status === "lost") {
        await showResult(data);
      } else {
        showFeedback("Ainda não. A próxima pista foi liberada.", "error");
        els.answer.value = "";
        els.answer.disabled = false;
        els.submit.disabled = false;
        requestAnimationFrame(() => {
          const current = els.clues.querySelector(".daily-clue.is-current");
          current?.scrollIntoView({behavior:"smooth", block:"nearest"});
          els.answer.focus();
        });
      }
    } catch (error) {
      console.error("Falha ao enviar resposta:", error);
      showFeedback("Não foi possível enviar sua resposta. Tente novamente.", "error");
      els.answer.disabled = false;
      els.submit.disabled = false;
    }
  });

  load();
})();