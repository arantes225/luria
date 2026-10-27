/* assets/js/ecg-smart-ui.js
   Orquestrador da Interface do Usuário do ECG Inteligente (LURIA).
   Conecta a Câmera Inteligente, os Modos Rápido/Ultrassensível,
   o Renderizador da Etapa 2 (Traçados Extraídos) e o Portão de Segurança da Etapa 3 (IA).
*/

(function () {
  "use strict";

  const byId = id => document.getElementById(id);

  // Elementos do DOM
  const btnStartFast = byId("ecg-btn-start-fast");
  const btnStartUltra = byId("ecg-btn-start-ultra");
  const btnCancelCamera = byId("ecg-btn-cancel-camera");
  const stage1Section = byId("ecg-stage1-capture");
  const stage2Section = byId("ecg-stage2-review");
  const stage3Section = byId("ecg-stage3-ai");
  const cameraViewport = byId("ecg-camera-viewport");
  const videoEl = byId("ecg-video");
  const canvasEl = byId("ecg-canvas-cv");
  const hudContainer = byId("ecg-hud");
  const reviewGrid = byId("ecg-review-grid");
  const btnEnableAi = byId("ecg-btn-confirm-and-ai");
  const missingAlert = byId("ecg-missing-alert");
  const viewModeRadios = document.querySelectorAll("input[name='ecg-view-mode']");

  if (!stage1Section || !stage2Section || !stage3Section) return;

  let activeViewMode = "overlay"; // "original" | "overlay" | "digital"
  let currentLeadsData = [];

  // Inicializa o controlador de rotação reutilizável da LURIA
  const rotateController = (window.LuriaRotateController && window.LuriaRotateController.create)
    ? window.LuriaRotateController.create({
        brandText: "LURIA · CÂMERA INTELIGENTE DE ECG",
        headingText: "Gire o celular",
        messageText: "Para uma captura adequada das 12 derivações, posicione o aparelho na horizontal.",
        tipText: "Se a tela não girar, desative o bloqueio de rotação do aparelho.",
        buttonText: "Continuar na vertical",
        shouldActivate: () => stage1Section && !stage1Section.hidden
      })
    : null;

  // Inicializa a Câmera Inteligente
  const cameraController = (window.LuriaSmartCamera && window.LuriaSmartCamera.createController)
    ? window.LuriaSmartCamera.createController({
        videoEl,
        canvasEl,
        hudContainer,
        rotateController,
        onStageChange: stage => {
          stage1Section.hidden = (stage !== 1);
          stage2Section.hidden = (stage !== 2);
          stage3Section.hidden = (stage !== 3);
        },
        onExtractComplete: leads => {
          currentLeadsData = leads;
          renderStage2Waveforms(leads);
        },
        onIaReviewReady: () => {
          stage3Section.hidden = false;
          stage3Section.scrollIntoView({ behavior: "smooth" });
        }
      })
    : null;

  // Botões de Inicialização
  btnStartFast?.addEventListener("click", () => {
    stage1Section.hidden = false;
    stage2Section.hidden = true;
    stage3Section.hidden = true;
    cameraViewport.hidden = false;
    cameraController?.startCamera("fast");
  });

  btnStartUltra?.addEventListener("click", () => {
    stage1Section.hidden = false;
    stage2Section.hidden = true;
    stage3Section.hidden = true;
    cameraViewport.hidden = false;
    cameraController?.startCamera("ultrasensitive");
  });

  btnCancelCamera?.addEventListener("click", () => {
    cameraController?.stopCamera();
    cameraViewport.hidden = true;
  });

  // Alternância de modo de visualização na Etapa 2
  viewModeRadios.forEach(radio => {
    radio.addEventListener("change", e => {
      activeViewMode = e.target.value;
      renderStage2Waveforms(currentLeadsData);
    });
  });

  // Confirmação para Etapa 3 (IA)
  btnEnableAi?.addEventListener("click", () => {
    if (!cameraController) return;
    const result = cameraController.confirmExtractionAndEnableAI();
    if (!result.allowed) {
      if (missingAlert) {
        missingAlert.hidden = false;
        missingAlert.textContent = result.reason;
      }
    } else {
      if (missingAlert) missingAlert.hidden = true;
    }
  });

  /**
   * Renderiza os 12 traçados extraídos e permite conferência visual
   */
  function renderStage2Waveforms(leads) {
    if (!reviewGrid) return;
    reviewGrid.innerHTML = "";

    let hasMissing = false;

    leads.forEach(leadInfo => {
      const card = document.createElement("article");
      card.className = "ecg-lead-card";

      const head = document.createElement("div");
      head.className = "ecg-lead-card-head";

      const title = document.createElement("strong");
      title.className = "ecg-lead-title";
      title.textContent = leadInfo.lead;

      const status = document.createElement("span");
      status.className = `ecg-lead-status ${leadInfo.captured ? "" : "is-missing"}`;
      status.textContent = leadInfo.captured ? "Extraído (500 Hz, 2,5s)" : "Não capturado";

      head.appendChild(title);
      head.appendChild(status);
      card.appendChild(head);

      // Canvas do traçado / imagem
      const canvas = document.createElement("canvas");
      canvas.className = "ecg-waveform-canvas";
      canvas.width = 320;
      canvas.height = 110;
      card.appendChild(canvas);

      drawLeadView(canvas, leadInfo, activeViewMode);

      // Ações da derivação (recaptura)
      const actions = document.createElement("div");
      actions.style.display = "flex";
      actions.style.justifyContent = "space-between";
      actions.style.alignItems = "center";
      actions.style.marginTop = "4px";

      const btnRecapture = document.createElement("button");
      btnRecapture.type = "button";
      btnRecapture.className = "ecg-btn secondary";
      btnRecapture.style.padding = "6px 10px";
      btnRecapture.style.fontSize = "11.5px";
      btnRecapture.textContent = "Recapturar";
      btnRecapture.addEventListener("click", () => {
        cameraController?.recaptureLead(leadInfo.lead);
      });

      actions.appendChild(btnRecapture);
      card.appendChild(actions);

      reviewGrid.appendChild(card);

      if (!leadInfo.captured) hasMissing = true;
    });

    if (missingAlert) {
      missingAlert.hidden = !hasMissing;
      if (hasMissing) {
        missingAlert.textContent = "Existem derivações pendentes ou com qualidade insuficiente. Recapture as áreas assinaladas antes de prosseguir.";
      }
    }
  }

  /**
   * Desenha o sinal digital e a grade milimetrada de ECG no Canvas
   */
  function drawLeadView(canvas, leadInfo, viewMode) {
    const ctx = canvas.getContext("2d");
    const w = canvas.width;
    const h = canvas.height;

    // Fundo milimetrado clássico de ECG (rosa claro)
    ctx.fillStyle = "#fff7f5";
    ctx.fillRect(0, 0, w, h);

    // Grade milimetrada (1 mm = ~4px; 5 mm = ~20px)
    ctx.lineWidth = 0.5;
    ctx.strokeStyle = "#fed7aa"; // Linhas finas
    for (let x = 0; x < w; x += 4) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, h);
      ctx.stroke();
    }
    for (let y = 0; y < h; y += 4) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(w, y);
      ctx.stroke();
    }

    ctx.lineWidth = 1;
    ctx.strokeStyle = "#fdba74"; // Linhas de 5mm
    for (let x = 0; x < w; x += 20) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, h);
      ctx.stroke();
    }
    for (let y = 0; y < h; y += 20) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(w, y);
      ctx.stroke();
    }

    if (!leadInfo.captured || !leadInfo.extractedSignal) {
      ctx.fillStyle = "#9ca3af";
      ctx.font = "12px sans-serif";
      ctx.textAlign = "center";
      ctx.fillText("Derivação não capturada", w / 2, h / 2);
      return;
    }

    // Desenho da curva digitalizada
    const signal = leadInfo.extractedSignal;
    const centerY = h / 2 + 5;
    const scaleY = 32; // ~32 px por 1 mV

    ctx.beginPath();
    ctx.lineWidth = 1.6;
    ctx.strokeStyle = (viewMode === "overlay") ? "#dc2626" : "#1e293b"; // Vermelho na sobreposição, preto no digital

    for (let i = 0; i < signal.length; i++) {
      const x = (i / signal.length) * w;
      const y = centerY - signal[i] * scaleY;
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.stroke();

    // Etiqueta de calibração
    ctx.fillStyle = "#64748b";
    ctx.font = "9.5px sans-serif";
    ctx.textAlign = "left";
    ctx.fillText("25 mm/s · 10 mm/mV", 6, h - 6);
  }
})();
