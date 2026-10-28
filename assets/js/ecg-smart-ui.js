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

  // Processamento real ao carregar imagem via arquivo
  const inputImage = byId("ecg-image");
  inputImage?.addEventListener("change", () => {
    const file = inputImage.files?.[0];
    if (!file) return;
    const img = new Image();
    img.onload = () => {
      canvasEl.width = img.naturalWidth || img.width;
      canvasEl.height = img.naturalHeight || img.height;
      const ctx = canvasEl.getContext("2d");
      ctx.drawImage(img, 0, 0);

      const layout = window.LuriaEcgCvEngine ? window.LuriaEcgCvEngine.STANDARD_LAYOUT_3X4 : null;
      const extractor = window.LuriaEcgSignalExtractor;

      // Executa extração pixel a pixel real para cada uma das 12 derivações
      const leads = window.LuriaSmartCamera.CANONICAL_LEADS.map(lead => {
        const box = layout?.leads?.[lead];
        if (!box || !extractor) {
          return { lead, captured: false, status: "pending", extractedSignal: null };
        }

        const roiX = Math.round(box.xMin * canvasEl.width);
        const roiY = Math.round(box.yMin * canvasEl.height);
        const roiW = Math.round((box.xMax - box.xMin) * canvasEl.width);
        const roiH = Math.round((box.yMax - box.yMin) * canvasEl.height);

        const cropCanvas = document.createElement("canvas");
        cropCanvas.width = roiW;
        cropCanvas.height = roiH;
        const cropCtx = cropCanvas.getContext("2d");
        cropCtx.drawImage(canvasEl, roiX, roiY, roiW, roiH, 0, 0, roiW, roiH);

        const roiImageData = cropCtx.getImageData(0, 0, roiW, roiH);
        const res = extractor.extractRealSignalFromImageData(roiImageData);

        return {
          lead,
          captured: res.isValid,
          status: res.isValid ? "captured" : "low_quality",
          extractedSignal: res.isValid ? res.signal : null,
          imageCropUrl: cropCanvas.toDataURL("image/jpeg", 0.9),
          confidence: res.confidence,
          samplingRateHz: 500,
          durationSeconds: 2.5
        };
      });

      // Transiciona para a Etapa 2
      stage1Section.hidden = true;
      stage2Section.hidden = false;
      stage3Section.hidden = true;

      currentLeadsData = leads;
      renderStage2Waveforms(leads);
    };
    img.src = URL.createObjectURL(file);
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
   * Desenha a visualização da derivação:
   * - "original": exibe a fotografia real recortada da derivação
   * - "digital": exibe a curva extraída sobre a grade milimetrada
   * - "overlay": exibe a curva extraída sobreposta à fotografia original
   */
  function drawLeadView(canvas, leadInfo, viewMode) {
    const ctx = canvas.getContext("2d");
    const w = canvas.width;
    const h = canvas.height;

    if (!leadInfo.captured || !leadInfo.extractedSignal) {
      ctx.fillStyle = "#fff7f5";
      ctx.fillRect(0, 0, w, h);
      ctx.fillStyle = "#9ca3af";
      ctx.font = "12px sans-serif";
      ctx.textAlign = "center";
      ctx.fillText("Derivação não capturada ou ilegível", w / 2, h / 2);
      return;
    }

    if (viewMode === "original" && leadInfo.imageCropUrl) {
      // Exibe a fotografia recortada da região
      const img = new Image();
      img.onload = () => {
        ctx.drawImage(img, 0, 0, w, h);
        drawScaleBadge(ctx, h);
      };
      img.src = leadInfo.imageCropUrl;
      return;
    }

    if (viewMode === "overlay" && leadInfo.imageCropUrl) {
      // Desenha foto original de fundo com a curva extraída sobreposta em vermelho
      const img = new Image();
      img.onload = () => {
        ctx.drawImage(img, 0, 0, w, h);
        renderCurveOnContext(ctx, leadInfo.extractedSignal, w, h, "#dc2626", 2.0);
        drawScaleBadge(ctx, h);
      };
      img.src = leadInfo.imageCropUrl;
      return;
    }

    // Modo "digital": desenha a grade milimetrada de ECG (25 mm/s, 10 mm/mV)
    ctx.fillStyle = "#fff7f5";
    ctx.fillRect(0, 0, w, h);

    // Grade milimetrada (1 mm = 4px; 5 mm = 20px)
    ctx.lineWidth = 0.5;
    ctx.strokeStyle = "#fed7aa";
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
    ctx.strokeStyle = "#fdba74";
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

    renderCurveOnContext(ctx, leadInfo.extractedSignal, w, h, "#1e293b", 1.6);
    drawScaleBadge(ctx, h);
  }

  function renderCurveOnContext(ctx, signal, w, h, strokeColor, lineWidth) {
    const centerY = h / 2 + 5;
    const scaleY = 32;

    ctx.beginPath();
    ctx.lineWidth = lineWidth;
    ctx.strokeStyle = strokeColor;

    for (let i = 0; i < signal.length; i++) {
      const x = (i / signal.length) * w;
      const y = centerY - signal[i] * scaleY;
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.stroke();
  }

  function drawScaleBadge(ctx, h) {
    ctx.fillStyle = "#64748b";
    ctx.font = "9.5px sans-serif";
    ctx.textAlign = "left";
    ctx.fillText("25 mm/s · 10 mm/mV", 6, h - 6);
  }
})();
