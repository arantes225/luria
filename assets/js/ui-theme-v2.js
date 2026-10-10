/* Shared visual preferences: reuse the existing per-account Dashboard key. */
(() => {
  const body = document.body;
  if (body?.dataset.uiNav !== "v2") return;
  const preferenceKey = "luria:dashboard-ui:v2";
  let preference = null;
  const media = window.matchMedia("(prefers-color-scheme: dark)");
  const legacy = () => document.documentElement.dataset.theme || (media.matches ? "dark" : "light");
  const valid = value => value && ["light", "dark"].includes(value.appearance) && ["blue", "pink"].includes(value.identity);
  function syncTheme() {
    const theme = legacy();
    body.dataset.uiAppearance = preference?.appearance || (theme === "dark" ? "dark" : "light");
    body.dataset.uiIdentity = preference?.identity || (["leila-mood", "pink", "rosa"].includes(theme) ? "pink" : "blue");
    const logo = document.getElementById("luria-brand-logo");
    const logoName = body.dataset.uiAppearance === "dark" ? "logo-icone-azul-claro.png"
      : body.dataset.uiIdentity === "pink" ? "logo-icone-rosa-escuro.png" : "logo-icone-original.png";
    const source = `/assets/img/logos/${logoName}?v=luria11`;
    if (logo && logo.getAttribute("src") !== source) logo.setAttribute("src", source);
    document.querySelectorAll("[data-ui-theme-control]").forEach(button => {
      const dimension = button.dataset.uiThemeControl;
      button.setAttribute("aria-pressed", String(body.dataset[dimension === "appearance" ? "uiAppearance" : "uiIdentity"] === button.value));
    });
  }
  function restoreTheme() {
    preference = null;
    try {
      const saved = JSON.parse(window.LuriaLocalOwnerStore?.read(preferenceKey) || "null");
      if (valid(saved)) preference = saved;
    } catch { /* Unavailable/malformed storage keeps the account theme. */ }
    syncTheme();
  }
  syncTheme();
  new MutationObserver(syncTheme).observe(document.documentElement, {attributes: true, attributeFilter: ["data-theme"]});
  media.addEventListener("change", syncTheme);
  window.addEventListener("luria:owner-changed", restoreTheme);
  window.addEventListener("docmap:ready", restoreTheme);
  window.addEventListener("storage", event => {
    if (event.key === window.LuriaLocalOwnerStore?.key(preferenceKey)) restoreTheme();
  });
  function chooseTheme(event) {
    const button = event.target.closest("[data-ui-theme-control]");
    if (!button || !body.contains(button)) return;
    const dimension = button.dataset.uiThemeControl;
    if (!["appearance", "identity"].includes(dimension)) return;
    const next = {appearance: body.dataset.uiAppearance, identity: body.dataset.uiIdentity};
    next[dimension] = button.value;
    if (!valid(next)) return;
    preference = next;
    syncTheme();
    let saved = false;
    try { saved = window.LuriaLocalOwnerStore?.write(preferenceKey, JSON.stringify(next)) === true; } catch {}
    const status = document.getElementById("ui-theme-status");
    if (status) status.textContent = saved ? "Tema salvo neste dispositivo para sua conta." : "Tema aplicado. Não foi possível salvar neste dispositivo.";
  }
  body.addEventListener("click", chooseTheme);
  window.LuriaUITheme = Object.freeze({refresh:syncTheme});

})();
