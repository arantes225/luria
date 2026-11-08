(() => {
  "use strict";

  // A página completa permanece inalterada; somente a cópia no Dashboard
  // usa o modo compacto, com a mesma sessão e as mesmas RPCs do jogo.
  if (window.parent === window || new URLSearchParams(location.search).get("embed") !== "dashboard") return;
  document.body.dataset.dailyEmbed = "dashboard";

  const shell = document.querySelector(".daily-shell");
  if (!shell) return;

  let pendingFrame = 0;
  const notifyParent = () => {
    pendingFrame = 0;
    const height = Math.ceil(Math.max(260, shell.getBoundingClientRect().bottom + window.scrollY + 12));
    if (Number.isFinite(height)) {
      window.parent.postMessage({ type: "traube:daily-challenge:resize", height }, window.location.origin);
    }
  };
  const schedule = () => {
    if (!pendingFrame) pendingFrame = requestAnimationFrame(notifyParent);
  };

  if (typeof ResizeObserver === "function") new ResizeObserver(schedule).observe(shell);
  if (typeof MutationObserver === "function") {
    new MutationObserver(schedule).observe(shell, {
      subtree: true,
      childList: true,
      attributes: true,
      characterData: true
    });
  }
  window.addEventListener("load", schedule);
  window.addEventListener("resize", schedule);
  document.fonts?.ready?.then(schedule);
  schedule();
})();
