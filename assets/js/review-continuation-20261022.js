(() => {
  "use strict";

  const text = (node) => (node?.textContent || "").replace(/\s+/g, " ").trim();

  function moveBackButtons() {
    document.querySelectorAll("main .luria-page-spotlight").forEach((spotlight) => {
      if (spotlight.closest(".games-page")) return;
      const back = [...document.querySelectorAll("main .luria-back-button")]
        .find((candidate) => !spotlight.contains(candidate));
      if (!back) return;
      back.classList.add("review-back-in-spotlight");
      spotlight.classList.add("review-title-card");
      spotlight.appendChild(back);
    });
  }

  function ensureBackLinks() {
    const targets = {
      questoes: ["/consolidar/", "Voltar para Consolidar"],
      flashcards: ["/consolidar/", "Voltar para Consolidar"],
      erros: ["/consolidar/", "Voltar para Consolidar"],
    };
    const page = document.body?.dataset.page;
    const target = targets[page];
    const spotlight = document.querySelector("main .luria-page-spotlight");
    if (!target || !spotlight || spotlight.querySelector(".luria-back-button")) return;
    const back = document.createElement("a");
    back.className = "luria-back-button review-back-in-spotlight";
    back.href = target[0];
    back.setAttribute("aria-label", target[1]);
    back.textContent = `← ${target[1]}`;
    spotlight.classList.add("review-title-card");
    spotlight.appendChild(back);
  }

  function ensureDashboardApps() {
    const panel = document.getElementById("dashboard-apps");
    if (!panel) return;
    const grid = panel.querySelector("#dashboard-category-practice + .dashboard-app-grid")
      || panel.querySelector(".dashboard-app-grid");
    if (!grid) return;
    const cards = [
      ["/jogos/", "Jogos", "Treine raciocínio clínico em desafios interativos.", "purple"],
      ["/aplicar/", "Aplicar", "Planeje provas, currículo e próximos passos.", "teal"],
    ];
    cards.forEach(([href, title, description, tint]) => {
      if (panel.querySelector(`a[data-dashboard-app][href="${href}"]`)) return;
      const card = document.createElement("a");
      card.className = "dashboard-app-card";
      card.href = href;
      card.dataset.dashboardApp = "";
      card.dataset.iconTint = tint;
      card.innerHTML = `<span class="dashboard-app-icon" aria-hidden="true">↗</span><span class="dashboard-app-copy"><strong>${title}</strong><span>${description}</span><small data-dashboard-access hidden></small></span><span class="dashboard-app-arrow" aria-hidden="true">→</span>`;
      grid.appendChild(card);
    });
  }

  function removeReviewOnlyContent() {
    document.querySelectorAll(".books-page .production-lots, .books-page .library-book-link").forEach((node) => node.remove());
    document.querySelectorAll(".qs-home-action-upload small").forEach((node) => {
      if (/MEDCOF|Aristo|Medway/i.test(text(node))) node.textContent = "Envie simulados externos.";
    });
    if (document.body?.dataset.page === "erros") {
      document.querySelectorAll("*").forEach((node) => {
        if (node.children.length === 0 && /^ajhdskjashdjakdla$/i.test(text(node))) node.remove();
      });
    }
  }

  function moveEscapeHero() {
    if (document.body?.dataset.page !== "jogos") return;
    const titleCard = document.querySelector(".e-page-title-card");
    const hero = document.querySelector(".e-hero");
    const copy = hero?.querySelector(":scope > div:not(.g-hero-art)");
    const illustration = hero?.querySelector(":scope > .e-illustration");
    if (!titleCard || !hero || !copy || titleCard.querySelector(".review-escape-summary")) return;
    const summary = document.createElement("section");
    summary.className = "review-escape-summary";
    const tags = copy.querySelector(".g-tags");
    if (tags) tags.classList.add("review-escape-tags");
    summary.append(copy);
    if (illustration) summary.append(illustration);
    titleCard.classList.add("review-escape-title-card");
    titleCard.append(summary);
    hero.remove();
  }

  function clearAlexPrompt() {
    const form = document.getElementById("alex-form");
    const prompt = document.getElementById("alex-prompt");
    if (!form || !prompt || form.dataset.reviewClearBound) return;
    form.dataset.reviewClearBound = "true";
    form.addEventListener("submit", () => {
      window.setTimeout(() => {
        prompt.value = "";
        prompt.style.height = "auto";
      }, 0);
    }, true);
  }

  const relevantPages = new Set(["dashboard", "cronograma", "professor_alex", "aprender", "questoes", "flashcards", "erros", "plantao", "jogos", "consolidar", "caderno"]);

  function run() {
    moveBackButtons();
    ensureBackLinks();
    ensureDashboardApps();
    removeReviewOnlyContent();
    moveEscapeHero();
    clearAlexPrompt();
  }

  run();
  window.addEventListener("DOMContentLoaded", run, { once: true });
  window.addEventListener("docmap:ready", run);
  window.addEventListener("pageshow", run);
  if (relevantPages.has(document.body?.dataset.page)) {
    let scheduled = false;
    const observer = new MutationObserver(() => {
      if (scheduled) return;
      scheduled = true;
      queueMicrotask(() => {
        scheduled = false;
        run();
      });
    });
    observer.observe(document.body, { childList: true, subtree: true });
  }
})();
