/* TRAUBE Calculadoras: visualizacao de datas independente da largura intrinseca do iOS WebKit.
 * O input date nativo continua ativo (inclusive para FormData, validacao e seletor do sistema).
 */
(() => {
  const modalBody = document.getElementById("calc-modal-body");
  if (!modalBody) return;

  const displayDate = (input, label) => {
    const raw = input.value;
    const parts = /^([0-9]{4})-([0-9]{2})-([0-9]{2})$/.exec(raw);
    label.textContent = parts ? parts[3] + "/" + parts[2] + "/" + parts[1] : "Selecionar data";
    label.parentElement.classList.toggle("has-value", !!parts);
  };

  function syncDateWidgets() {
    modalBody.querySelectorAll('input[type="date"]:not([data-calc-date-ready])').forEach(input => {
      input.dataset.calcDateReady = "1";

      const wrap = document.createElement("div");
      wrap.className = "calc-date-control";
      const visibleDate = document.createElement("span");
      visibleDate.className = "calc-date-value";
      visibleDate.setAttribute("aria-hidden", "true");

      const parent = input.parentElement;
      const fieldLabel = parent?.querySelector("label");
      if (fieldLabel) {
        input.id = "calc-date-" + input.name;
        fieldLabel.setAttribute("for", input.id);
        input.setAttribute("aria-label", fieldLabel.textContent.trim());
      }

      parent.insertBefore(wrap, input);
      wrap.append(visibleDate, input);
      const render = () => displayDate(input, visibleDate);
      input.addEventListener("input", render);
      input.addEventListener("change", render);
      render();
    });
  }

  const observer = new MutationObserver(syncDateWidgets);
  observer.observe(modalBody, { childList: true, subtree: true });
  modalBody.addEventListener("reset", () => {
    requestAnimationFrame(() => {
      modalBody.querySelectorAll(".calc-date-control input[type=date]").forEach(input => {
        const visibleDate = input.parentElement.querySelector(".calc-date-value");
        if (visibleDate) displayDate(input, visibleDate);
      });
    });
  });
  syncDateWidgets();
})();
