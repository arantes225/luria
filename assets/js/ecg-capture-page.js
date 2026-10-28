/* assets/js/ecg-capture-page.js
   Controlador da Página Independente de Captura com Câmera (/trabalho/ecg/captura/).
   - Gerencia a inicialização e desligamento limpo dos tracks da câmera.
   - Conecta a Câmera Inteligente (Modo Rápido / Ultrassensível).
   - Controla o LuriaRotateController com a opção "Continuar na vertical".
   - Armazena a sessão capturada no sessionStorage ('luria_ecg_session') e redireciona para /trabalho/ecg/#revisao.
   - Garante que a câmera seja parada ao clicar em "Voltar ao ECG" ou descarregar a página.
*/

(function (global) {
  "use strict";

  const byId = id => document.getElementById(id);

  const videoEl = byId("ecg-video");
  const canvasEl = byId("ecg-canvas-cv");
  const hudContainer = byId("ecg-hud");
  const btnExit = byId("ecg-btn-exit");
  const btnFast = byId("ecg-mode-fast");
  const btnUltra = byId("ecg-mode-ultra");
  const btnTorch = byId("ecg-btn-torch");
  const btnSnap = byId("ecg-btn-snap");
  const uncertainModal = byId("ecg-uncertain-modal");
  const uncertainSelect = byId("ecg-uncertain-select");
  const btnConfirmUncertain = byId("ecg-btn-confirm-uncertain");
  const btnRejectUncertain = byId("ecg-btn-reject-uncertain");
  const reticleEl = byId("ecg-reticle");
  const btnDebugToggle = byId("ecg-btn-debug-toggle");
  const zoomControls = byId("ecg-zoom-controls");
  const btnZoom1 = byId("ecg-btn-zoom-1");
  const btnZoom2 = byId("ecg-btn-zoom-2");

  let activeUncertainHandler = null;
  let activeMode = "fast";
  let torchActive = false;

  // Verificação de modo de desenvolvimento/admin (ex: query param ?debug=true ou localStorage)
  const isDebugAllowed = typeof window !== "undefined" && (
    new URLSearchParams(window.location.search).get("debug") === "true" ||
    window.location.hostname === "localhost" ||
    window.location.hostname === "127.0.0.1" ||
    localStorage.getItem("luria_ecg_debug") === "true"
  );

  if (btnDebugToggle && isDebugAllowed) {
    btnDebugToggle.style.display = "inline-flex";
    btnDebugToggle.addEventListener("click", () => {
      if (cameraController?.toggleDebugOverlay) {
        const enabled = cameraController.toggleDebugOverlay();
        btnDebugToggle.style.background = enabled ? "#dc2626" : "rgba(220,38,38,0.3)";
      }
    });
  }

  // Controlador de rotação LURIA integrado
  const rotateController = (global.LuriaRotateController && global.LuriaRotateController.create)
    ? global.LuriaRotateController.create({
        brandText: "LURIA · CÂMERA INTELIGENTE DE ECG",
        headingText: "Gire o celular",
        messageText: "Para uma captura adequada das 12 derivações, posicione o aparelho na horizontal.",
        tipText: "Se a tela não virar, desative o bloqueio de orientação do aparelho.",
        buttonText: "Manter vertical",
        shouldActivate: () => true,
        onDismiss: () => {
          // Quando o usuário escolhe manter na vertical, apenas fecha a orientação
          // e adapta a proporção do retículo se necessário
          if (reticleEl) {
            reticleEl.style.aspectRatio = "4 / 3";
          }
        }
      })
    : null;

  // Criação do controlador da câmera
  const cameraController = (global.LuriaSmartCamera && global.LuriaSmartCamera.createController)
    ? global.LuriaSmartCamera.createController({
        videoEl,
        canvasEl,
        hudContainer,
        rotateController,
        onStageChange: (stage) => {
          // Quando avança para Etapa 2 (review), redireciona para a página principal
        },
        onExtractComplete: (leads, pkg) => {
          try {
            sessionStorage.setItem("luria_ecg_session", JSON.stringify(pkg));
            sessionStorage.setItem("luria_ecg_leads", JSON.stringify(leads));
          } catch (e) {
            console.warn("Falha ao salvar sessão de ECG no sessionStorage:", e);
          }
          // Para a câmera antes de navegar
          cameraController?.stopCamera();
          window.location.href = "/trabalho/ecg/#revisao";
        },
        onUncertainIdentity: (handler) => {
          activeUncertainHandler = handler;
          if (uncertainModal) {
            uncertainModal.hidden = false;
            if (uncertainSelect) uncertainSelect.value = handler.suggestedLead || "DI";
          }
        }
      })
    : null;

  // Alternar modos (Automático vs Ultrassensível)
  btnFast?.addEventListener("click", () => {
    activeMode = "fast";
    btnFast.classList.add("is-active");
    btnUltra.classList.remove("is-active");
    cameraController?.startCamera("fast");
  });

  btnUltra?.addEventListener("click", () => {
    activeMode = "ultrasensitive";
    btnUltra.classList.add("is-active");
    btnFast.classList.remove("is-active");
    cameraController?.startCamera("ultrasensitive");
  });

  // Botão de captura manual
  btnSnap?.addEventListener("click", () => {
    if (cameraController?.triggerManualCapture) {
      cameraController.triggerManualCapture();
    }
  });

  // Modal de identificação incerta
  btnConfirmUncertain?.addEventListener("click", () => {
    if (activeUncertainHandler && uncertainSelect) {
      const lead = uncertainSelect.value;
      if (uncertainModal) uncertainModal.hidden = true;
      activeUncertainHandler.confirmCallback(lead);
      activeUncertainHandler = null;
    }
  });

  btnRejectUncertain?.addEventListener("click", () => {
    if (activeUncertainHandler) {
      if (uncertainModal) uncertainModal.hidden = true;
      activeUncertainHandler.rejectCallback();
      activeUncertainHandler = null;
    }
  });

  // Lanterna
  btnTorch?.addEventListener("click", async () => {
    if (!cameraController?.toggleTorch) return;
    const res = await cameraController.toggleTorch(!torchActive);
    if (res && res.ok) {
      torchActive = Boolean(res.torch);
      btnTorch.textContent = torchActive ? "💡" : "🔦";
      btnTorch.style.background = torchActive ? "#184888" : "";
    }
  });

  function checkHardwareCapabilities() {
    if (!cameraController?.getCameraCapabilities) return;
    setTimeout(() => {
      const caps = cameraController.getCameraCapabilities();
      // Lanterna
      if (btnTorch) {
        btnTorch.style.display = (caps && caps.torch) ? "inline-flex" : "none";
      }
      // Zoom
      if (zoomControls && caps && caps.zoom && caps.zoom.max > 1) {
        zoomControls.style.display = "inline-flex";
        btnZoom1?.addEventListener("click", () => cameraController.setCameraZoom?.(1));
        btnZoom2?.addEventListener("click", () => cameraController.setCameraZoom?.(Math.min(2, caps.zoom.max)));
      } else if (zoomControls) {
        zoomControls.style.display = "none";
      }
    }, 600);
  }

  // Desligamento limpo ao sair
  btnExit?.addEventListener("click", (e) => {
    cameraController?.stopCamera();
  });

  window.addEventListener("beforeunload", () => {
    cameraController?.stopCamera();
  });

  // Inicialização automática ao carregar a página
  window.addEventListener("DOMContentLoaded", () => {
    if (cameraController) {
      cameraController.startCamera(activeMode);
      checkHardwareCapabilities();
    }
  });

  // Exportação para testes
  global.LuriaCapturePage = {
    getCameraController: () => cameraController,
    getRotateController: () => rotateController,
    stop: () => cameraController?.stopCamera()
  };

})(typeof window !== "undefined" ? window : global);
