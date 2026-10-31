/* assets/js/luria-rotate-controller.js
   Controlador universal reutilizável da animação de girar o aparelho (TRAUBE).
   Utilizado pelo simulador de emergência e pelo leitor/scanner inteligente de ECG.
*/
(function (global) {
  "use strict";

  function createRotateController(options = {}) {
    const {
      brandText = "TRAUBE · ECG INTELIGENTE",
      headingText = "Gire o celular",
      messageText = "Coloque o aparelho na horizontal para uma melhor captura do traçado.",
      tipText = "Se a tela não virar, desative o bloqueio de orientação do aparelho.",
      buttonText = "Dispensar",
      onDismiss = null,
      shouldActivate = () => true
    } = options;

    let guide = null;
    let isActive = false;
    let userDismissed = false;

    function buildDOM() {
      if (guide) return guide;
      guide = document.createElement("div");
      guide.className = "luria-rotate-dialog";
      guide.setAttribute("role", "dialog");
      guide.setAttribute("aria-modal", "true");
      guide.setAttribute("aria-label", headingText);
      guide.hidden = true;

      guide.innerHTML =
        '<div class="luria-rotate-panel">' +
          '<div class="luria-rotate-brand">' + escapeHtml(brandText) + '</div>' +
          '<div class="luria-rotate-graphic" aria-hidden="true"><span class="luria-rotate-phone"></span></div>' +
          '<h2>' + escapeHtml(headingText) + '</h2>' +
          '<p>' + escapeHtml(messageText) + '</p>' +
          (tipText ? '<p class="luria-rotate-tip">' + escapeHtml(tipText) + '</p>' : '') +
          (buttonText ? '<button type="button" class="luria-rotate-action">' + escapeHtml(buttonText) + '</button>' : '') +
        '</div>';

      const btn = guide.querySelector(".luria-rotate-action");
      if (btn) {
        btn.addEventListener("click", () => {
          userDismissed = true;
          hide();
          if (typeof onDismiss === "function") onDismiss();
        });
      }

      document.body.appendChild(guide);
      return guide;
    }

    function escapeHtml(str) {
      if (!str) return "";
      return String(str)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;");
    }

    function checkOrientationPortrait() {
      if (typeof window === "undefined") return false;
      if (window.screen && window.screen.orientation && window.screen.orientation.type) {
        return window.screen.orientation.type.startsWith("portrait");
      }
      if (typeof window.matchMedia === "function") {
        const query = window.matchMedia("(orientation: portrait)");
        if (query && typeof query.matches === "boolean") return query.matches;
      }
      return window.innerHeight > window.innerWidth;
    }

    function update() {
      if (!guide) buildDOM();
      if (!isActive || userDismissed) {
        guide.hidden = true;
        return;
      }
      const isPortrait = checkOrientationPortrait();
      const condition = typeof shouldActivate === "function" ? shouldActivate() : true;
      const needRotate = condition && isPortrait;
      guide.hidden = !needRotate;
    }

    let rafScheduled = false;
    function scheduleUpdate() {
      if (rafScheduled) return;
      rafScheduled = true;
      if (typeof window !== "undefined" && typeof window.requestAnimationFrame === "function") {
        window.requestAnimationFrame(() => {
          rafScheduled = false;
          update();
        });
      } else {
        setTimeout(() => {
          rafScheduled = false;
          update();
        }, 16);
      }
    }

    function start() {
      isActive = true;
      userDismissed = false;
      if (typeof window !== "undefined") {
        window.addEventListener("resize", scheduleUpdate, { passive: true });
        window.addEventListener("orientationchange", scheduleUpdate, { passive: true });
        const portraitQuery = window.matchMedia ? window.matchMedia("(orientation: portrait)") : null;
        if (portraitQuery && portraitQuery.addEventListener) {
          portraitQuery.addEventListener("change", scheduleUpdate);
        }
      }
      update();
    }

    function stop() {
      isActive = false;
      if (guide) guide.hidden = true;
      if (typeof window !== "undefined") {
        window.removeEventListener("resize", scheduleUpdate);
        window.removeEventListener("orientationchange", scheduleUpdate);
      }
    }

    function show() {
      isActive = true;
      userDismissed = false;
      scheduleUpdate();
    }

    function hide() {
      if (guide) guide.hidden = true;
    }

    function isVisible() {
      return guide ? !guide.hidden : false;
    }

    return {
      start,
      stop,
      show,
      hide,
      update,
      scheduleUpdate,
      isVisible,
      getElement: () => guide
    };
  }

  global.TraubeRotateController = {
    create: createRotateController
  };

  if (typeof module !== "undefined" && module.exports) {
    module.exports = { createRotateController };
  }
})(typeof window !== "undefined" ? window : globalThis);
