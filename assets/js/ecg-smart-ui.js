/* assets/js/ecg-smart-ui.js
   Orquestrador da Interface do Usuário do ECG Inteligente (LURIA).
   Conecta a Câmera Inteligente, os Modos Rápido/Ultrassensível,
   o Renderizador da Etapa 2 (Traçados Extraídos, Sobreposição Pixel a Pixel Real, Zoom/Pan,
   Calibração e Auditoria de Fidelidade) e o Portão de Segurança da Etapa 3 (IA).
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

  // Controles de calibração na Etapa 2
  const calSpeedSelect = byId("ecg-cal-speed");
  const calGainSelect = byId("ecg-cal-gain");
  const btnConfirmCal = byId("ecg-btn-confirm-calibration");
  const calSourceBadge = byId("ecg-cal-source-badge");
  const auditSummaryText = byId("ecg-audit-summary-text");

  // Modal de identificação incerta da câmera
  const uncertainModal = byId("ecg-uncertain-modal");
  const uncertainSelect = byId("ecg-uncertain-select");
  const btnConfirmUncertain = byId("ecg-btn-confirm-uncertain");
  const btnRejectUncertain = byId("ecg-btn-reject-uncertain");

  if (!stage1Section || !stage2Section || !stage3Section) return;

  let activeViewMode = "overlay"; // "overlay" | "digital" | "original"
  let currentLeadsData = [];
  let currentSessionPackage = null;
  let activeUncertainHandler = null;

  // Zoom e pan por derivação na Etapa 2
  const leadViewStates = new Map();

  function getLeadViewState(lead) {
    if (!leadViewStates.has(lead)) {
      leadViewStates.set(lead, { zoom: 1, panX: 0, panY: 0, isDragging: false, startX: 0, startY: 0 });
    }
    return leadViewStates.get(lead);
  }

  // Guided capture lives in its own full-screen body portal. Moving the SAME
  // camera viewport preserves all existing video/HUD handlers and signal logic,
  // while physically separating it from the educational ECG tabs and nav.
  const guidedPage = byId("ecg-guided-camera-page");
  const guidedMount = byId("ecg-guided-camera-mount");
  const guidedClose = byId("ecg-guided-close");
  const guidedCapture = byId("ecg-guided-capture");
  const orientationHint = byId("ecg-guided-orientation");
  const appShell = document.querySelector(".app-shell");
  let lastGuidedFocus = null;
  let wasAppInert = false;
  let oldAppAria = null;
  let guidedActive = false;
  if (guidedMount && cameraViewport && cameraViewport.parentElement !== guidedMount) {
    guidedMount.appendChild(cameraViewport);
  }

  function updateGuidedOrientation() {
    if (!orientationHint || !guidedActive) return;
    const landscape = window.matchMedia?.("(orientation: landscape)")?.matches
      ?? (window.innerWidth > window.innerHeight);
    orientationHint.textContent = landscape
      ? "Horizontal · enquadre o ECG inteiro, com as bordas visíveis."
      : "Vertical · a captura continua disponível. Gire se precisar de mais espaço.";
  }
  function setScannerTab() {
    document.querySelectorAll("[data-ecg-tab]").forEach(tab => {
      const active = tab.dataset.ecgTab === "scanner";
      tab.classList.toggle("is-active", active);
      tab.setAttribute("aria-selected", String(active));
    });
    document.querySelectorAll("[data-ecg-panel]").forEach(panel => {
      panel.classList.toggle("is-active", panel.dataset.ecgPanel === "scanner");
    });
  }
  function enterGuidedCapture(mode = "fast") {
    if (!guidedPage || !guidedMount) return;
    if (!guidedActive) {
      lastGuidedFocus = document.activeElement;
      wasAppInert = Boolean(appShell?.inert);
      oldAppAria = appShell?.getAttribute("aria-hidden");
      // Dismiss any leftover app navigation before locking the capture surface.
      document.body.classList.remove("sidebar-open");
      document.getElementById("ui-mobile-tools")?.close?.();
    }
    guidedActive = true;
    setScannerTab();
    guidedPage.hidden = false;
    // Native modal top-layer wins against PWA headers, browser fullscreen
    // layers and dynamically inserted navigation (unlike fixed z-index).
    if (typeof guidedPage.showModal === "function" && !guidedPage.open) {
      try { guidedPage.showModal(); }
      catch (error) { console.warn("[LURIA ECG] Falha ao abrir modal nativo; usando fallback.", error); }
    }
    cameraViewport.hidden = false;
    guidedPage.dataset.captureMode = mode;
    document.body.classList.add("ecg-capture-active", "ecg-guided-capture-open");
    if (appShell) {
      appShell.inert = true;
      appShell.setAttribute("aria-hidden", "true");
    }
    updateGuidedOrientation();
    guidedClose?.focus();
  }
  function exitGuidedCapture() {
    if (!guidedActive) return;
    guidedActive = false;
    if (guidedPage) {
      if (guidedPage.open && typeof guidedPage.close === "function") guidedPage.close();
      guidedPage.hidden = true;
    }
    if (cameraViewport) cameraViewport.hidden = true;
    document.body.classList.remove("ecg-guided-capture-open");
    if (!document.body.classList.contains("ecg-normal-photo-open")) {
      document.body.classList.remove("ecg-capture-active");
    }
    if (appShell) {
      appShell.inert = wasAppInert;
      if (oldAppAria === null) appShell.removeAttribute("aria-hidden");
      else appShell.setAttribute("aria-hidden", oldAppAria);
    }
    if (lastGuidedFocus?.isConnected && !lastGuidedFocus.closest("[hidden]")) {
      lastGuidedFocus.focus();
    }
  }

  // Do not use the blocking "rotate phone" dialog for ECG: portrait is a
  // supported capture orientation, and dismissing that dialog used to uncover
  // the unrelated educational page behind the in-page camera.
  const rotateController = null;
  window.addEventListener("resize", updateGuidedOrientation, { passive: true });
  window.addEventListener("orientationchange", updateGuidedOrientation, { passive: true });
  window.visualViewport?.addEventListener?.("resize", updateGuidedOrientation, { passive: true });

  // Inicializa a Câmera Inteligente
  const cameraController = (window.LuriaSmartCamera && window.LuriaSmartCamera.createController)
    ? window.LuriaSmartCamera.createController({
        videoEl,
        canvasEl,
        hudContainer,
        rotateController,
        onStageChange: stage => {
          if (stage === 1) enterGuidedCapture(cameraController?.getCurrentMode?.() || "fast");
          else exitGuidedCapture();
          stage1Section.hidden = (stage !== 1);
          stage2Section.hidden = (stage !== 2);
          stage3Section.hidden = (stage !== 3);
          updateStepIndicators(stage);
        },
        onExtractComplete: (leads, pkg) => {
          currentLeadsData = leads;
          currentSessionPackage = pkg;
          updateCalibrationUI(pkg?.calibration);
          renderStage2Waveforms(leads);
        },
        onIaReviewReady: pkg => {
          currentSessionPackage = pkg;
          stage3Section.hidden = false;
          if (typeof window.LuriaEcgReaderInit === "function") {
            window.LuriaEcgReaderInit(pkg);
          }
          stage3Section.scrollIntoView({ behavior: "smooth" });
        },
        onUncertainIdentity: handler => {
          activeUncertainHandler = handler;
          if (uncertainModal) {
            uncertainModal.hidden = false;
            if (uncertainSelect) uncertainSelect.value = handler.suggestedLead || "DI";
          }
        }
      })
    : null;

  function updateStepIndicators(stage) {
    const s1 = byId("ecg-step-indicator-1");
    const s2 = byId("ecg-step-indicator-2");
    const s3 = byId("ecg-step-indicator-3");
    if (!s1 || !s2 || !s3) return;

    [s1, s2, s3].forEach((el, idx) => {
      const stepNum = idx + 1;
      if (stepNum === stage) {
        el.style.background = "var(--accent, #184888)";
        el.style.color = "#fff";
        el.style.opacity = "1";
      } else if (stepNum < stage) {
        el.style.background = "#10b981";
        el.style.color = "#fff";
        el.style.opacity = "0.9";
      } else {
        el.style.background = "var(--surface-2)";
        el.style.color = "var(--muted)";
        el.style.opacity = "0.55";
      }
    });
  }

  // Tratamento do modal de identificação incerta
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

  function checkTorchAvailability() {
    if (!btnToggleTorch || !cameraController?.getCameraCapabilities) return;
    setTimeout(() => {
      const caps = cameraController.getCameraCapabilities();
      if (caps && caps.torch) {
        btnToggleTorch.style.display = "inline-flex";
      } else {
        btnToggleTorch.style.display = "none";
      }
    }, 500);
  }

  const captureSource = byId("ecg-capture-source");
  function stopGuidedScanner() {
    cameraController?.stopCamera();
    exitGuidedCapture();
  }
  window.LuriaEcgStopScanner = stopGuidedScanner;
  guidedClose?.addEventListener("click", stopGuidedScanner);
  guidedCapture?.addEventListener("click", () => cameraController?.captureCurrentFrame?.());
  guidedPage?.addEventListener("cancel", event => {
    event.preventDefault();
    stopGuidedScanner();
  });
  document.addEventListener("keydown", event => {
    if (event.key === "Escape" && guidedActive) stopGuidedScanner();
  });

  // Botões de Inicialização da Câmera
  btnStartFast?.addEventListener("click", () => {
    stage1Section.hidden = false;
    stage2Section.hidden = true;
    stage3Section.hidden = true;
    enterGuidedCapture("fast");
    if (captureSource) captureSource.textContent = "Origem: Scanner guiado (automático)";
    cameraController?.startCamera("fast");
  });

  btnStartUltra?.addEventListener("click", () => {
    stage1Section.hidden = false;
    stage2Section.hidden = true;
    stage3Section.hidden = true;
    enterGuidedCapture("ultrasensitive");
    if (captureSource) captureSource.textContent = "Origem: Scanner guiado (por derivação)";
    cameraController?.startCamera("ultrasensitive");
  });

  btnCancelCamera?.addEventListener("click", stopGuidedScanner);

  // Controle de lanterna integrado
  let torchActive = false;
  btnToggleTorch?.addEventListener("click", async () => {
    if (!cameraController?.toggleTorch) return;
    const res = await cameraController.toggleTorch(!torchActive);
    if (res && res.ok) {
      torchActive = Boolean(res.torch);
      btnToggleTorch.textContent = torchActive ? "💡 Desativar" : "🔦 Lanterna";
      btnToggleTorch.style.background = torchActive ? "var(--accent, #184888)" : "";
      btnToggleTorch.style.color = torchActive ? "#fff" : "";
    } else {
      btnToggleTorch.title = res?.reason || res?.error || "Lanterna indisponível";
      btnToggleTorch.style.opacity = "0.5";
    }
  });

  // Both the ordinary photograph and a file imported from the gallery use
  // exactly the SAME extraction, layout, calibration and technical audit.
  // Only the acquisition mode/provenance changes. Source stays in memory.
  function processPhotoFile(file, source = "file_upload", photoOptions = {}) {
    if (!file || !file.type?.startsWith("image/")) {
      return Promise.resolve({ ok: false, reason: "Selecione uma foto válida do ECG." });
    }
    if (!cameraController || !canvasEl) {
      return Promise.resolve({ ok: false, reason: "Motor do ECG indisponível." });
    }
    let stage = "abertura do arquivo";
    let url;
    try { url = URL.createObjectURL(file); }
    catch { return Promise.resolve({ ok: false, reason: "Não foi possível abrir esta foto no navegador. Escolha uma imagem JPEG/PNG válida." }); }
    return new Promise(resolve => {
      const img = new Image();
      let settled = false;
      const finish = result => {
        if (settled) return;
        settled = true;
        URL.revokeObjectURL(url);
        resolve(result);
      };
      img.onerror = () => finish({ ok: false, reason: "Não foi possível decodificar a imagem escolhida." });
      img.onload = () => {
        try {
          stage = "preparação da imagem";
          const originalW = img.naturalWidth || img.width;
          const originalH = img.naturalHeight || img.height;
          if (!(originalW > 0 && originalH > 0)) {
            finish({ ok: false, reason: "A imagem não possui dimensões válidas." });
            return;
          }

          // The native photo is NEVER replaced or resaved. Analyse a bounded
          // working copy to avoid out-of-memory failures on iPhone/Android.
          // No document/ECG filters, enhancement or forced paper cropping here.
          const maxSide = 2600;
          const ratio = Math.min(1, maxSide / Math.max(originalW, originalH));
          const workW = Math.max(1, Math.round(originalW * ratio));
          const workH = Math.max(1, Math.round(originalH * ratio));
          const unrectified = document.createElement("canvas");
          unrectified.width = workW;
          unrectified.height = workH;
          const ctxPhoto = unrectified.getContext("2d");
          if (!ctxPhoto) {
            finish({ok:false,reason:"O navegador não conseguiu criar uma área de imagem. Feche outras abas pesadas e tente novamente."});
            return;
          }
          ctxPhoto.drawImage(img, 0, 0, workW, workH);
          stage = "ajuste da orientação da foto";
          const rotationDeg = Number(photoOptions.rotationDeg ?? 0);
          if (![0, 90, 180, 270].includes(rotationDeg)) {
            finish({ ok: false, reason: "Rotação inválida. Escolha os botões de girar a foto novamente." });
            return;
          }
          const perspective = window.LuriaEcgPhotoPerspective;
          if (rotationDeg && !perspective?.rotateCanvasQuarter) {
            finish({ ok: false, reason: "Rotação de imagem indisponível. Reabra a página do ECG." });
            return;
          }
          const orientedCanvas = rotationDeg
            ? perspective.rotateCanvasQuarter(unrectified, rotationDeg / 90)
            : unrectified;
          stage = "correção da área do papel";
          const chosenCorners = photoOptions.corners;
          const manualSelection = Array.isArray(chosenCorners);
          if (manualSelection && !perspective) {
            finish({ ok: false, reason: "Correção de perspectiva indisponível." });
            return;
          }
          const selectedPaper = manualSelection
            ? perspective.rectifyCanvas(orientedCanvas, chosenCorners, maxSide)
            : null;
          const snapCanvas = selectedPaper?.canvas || orientedCanvas;

          stage = "reconhecimento dos traçados";
          cameraController.stopCamera();
          cameraViewport.hidden = true;
          cameraController.resetCaptureSession?.();
          cameraController.setMode(source === "normal_photo" ? "photo" : "fast");

          const result = cameraController.processPhotographCanvas(snapCanvas, {
            source: manualSelection ? "normal_photo_manual_four_corners" : source,
            layoutHint: photoOptions.layoutHint,
            manualPaperCornersApplied: manualSelection,
            userCalibration: {
              paperSpeedMmPerSec: Number(calSpeedSelect?.value) || 25,
              gainMmPerMv: Number(calGainSelect?.value) || 10,
              confirmedByUser: false
            }
          });

          if (!result.ok || !cameraController.openReview()) {
            const reason = result.reason || "Não foi possível extrair derivações com fidelidade suficiente. Verifique a foto.";
            if (missingAlert) {
              missingAlert.hidden = false;
              missingAlert.textContent = reason;
            }
            finish({ ok: false, reason, originalWidth: originalW, originalHeight: originalH, analysedWidth: workW, analysedHeight: workH });
            return;
          }
          stage = "montagem da conferência";
          if (missingAlert) missingAlert.hidden = true;
          if (captureSource) captureSource.textContent = "Origem: " + (source === "normal_photo" ? (manualSelection ? "Foto normal (4 cantos ajustados)" : "Foto normal (integral)") : "Imagem importada") + " · rotação " + rotationDeg + "° · " + originalW + " × " + originalH + " px (original) · " + snapCanvas.width + " × " + snapCanvas.height + " px (análise).";
          const leads = cameraController.getCapturedLeads();
          const layout = result.boundaries?.detectedLayout;
          if (captureSource && layout) captureSource.textContent += " Formato: " + layout.description +
            (layout.requiresLayoutConfirmation ? " — hipótese; confira linhas e colunas." : ".");
          currentLeadsData = leads;
          currentSessionPackage = cameraController.getSessionStructuredPackage();
          updateCalibrationUI(currentSessionPackage.calibration);
          renderStage2Waveforms(leads);
          finish({ ok: true, capturedCount: result.capturedCount, totalCaptured: result.totalCaptured, originalWidth: originalW, originalHeight: originalH, analysedWidth: workW, analysedHeight: workH });
        } catch (exception) {
          console.warn("[LURIA ECG] Falha técnica na etapa", stage, exception);
          const memoryError = /out.of.memory|allocation|memory|quota/i.test(String(exception?.message || ""));
          const reason = memoryError
            ? "A memória do aparelho não foi suficiente para processar a foto. Feche aplicativos pesados ou experimente outra imagem."
            : "Erro técnico na etapa de " + stage + " (" + (exception?.name || "erro inesperado") + "). A foto original foi preservada. Tente novamente ou use quatro cantos.";
          finish({ ok: false, reason, errorStage: stage });
        }
      };
      img.src = url;
    });
  }

  window.LuriaEcgProcessPhoto = processPhotoFile;

  const inputImage = byId("ecg-image");
  inputImage?.addEventListener("change", async () => {
    const file = inputImage.files?.[0];
    if (!file) return;
    const filename = byId("ecg-file-name");
    if (filename) filename.textContent = "Processando " + file.name + "...";
    const result = await processPhotoFile(file, "file_upload");
    if (filename) filename.textContent = result.ok
      ? "Foto importada — confira as derivações na etapa 2."
      : result.reason;
  });

  // Atualização e confirmação de calibração manual
  btnConfirmCal?.addEventListener("click", () => {
    if (!cameraController) return;
    const speed = Number(calSpeedSelect?.value) || 25;
    const gain = Number(calGainSelect?.value) || 10;

    const updatedCal = cameraController.setUserCalibration({
      paperSpeedMmPerSec: speed,
      gainMmPerMv: gain,
      confirmedByUser: true
    });

    if (updatedCal.error) {
      if (missingAlert) {
        missingAlert.hidden = false;
        missingAlert.textContent = updatedCal.error;
      }
      return;
    }

    updateCalibrationUI(updatedCal);
    currentLeadsData = cameraController.getCapturedLeads();
    currentSessionPackage = cameraController.getSessionStructuredPackage();
    renderStage2Waveforms(currentLeadsData);
  });

  function updateCalibrationUI(cal) {
    if (!cal) return;
    if (calSpeedSelect) calSpeedSelect.value = String(cal.paperSpeedMmPerSec || 25);
    if (calGainSelect) calGainSelect.value = String(cal.gainMmPerMv || 10);

    if (calSourceBadge) {
      calSourceBadge.className = "ecg-cal-badge";
      if (cal.confirmedByUser) {
        calSourceBadge.textContent = "Confirmada pelo Usuário";
        calSourceBadge.classList.add("is-confirmed");
      } else if (cal.calibrationSource === "measured") {
        calSourceBadge.textContent = "Medida da Grade";
        calSourceBadge.classList.add("is-measured");
      } else if (cal.calibrationSource === "assumed") {
        calSourceBadge.textContent = "Presumida (25 mm/s, 10 mm/mV) — Requer confirmação";
        calSourceBadge.classList.add("is-assumed");
      } else {
        calSourceBadge.textContent = "Desconhecida — Confirmação obrigatória";
        calSourceBadge.classList.add("is-unknown");
      }
    }
  }

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
   * Renderiza os 12 traçados extraídos e permite conferência visual minuciosa
   */
  function renderStage2Waveforms(leads) {
    if (!reviewGrid) return;
    reviewGrid.innerHTML = "";

    let hasMissing = leads.some(info => info.status !== "captured");
    let adequateCount = 0;
    let reviewCount = 0;
    let invalidCount = 0;
    let candidateCount = 0;

    leads.forEach(leadInfo => {
      if (!leadInfo.captured && !leadInfo.imageCropUrl) return; // No giant cards without evidence.
      const provisional = leadInfo.status === "provisional";
      if (provisional) candidateCount++;
      const card = document.createElement("article");
      card.className = "ecg-lead-card";

      const audit = leadInfo.audit || {
        status: leadInfo.captured ? "Revisão necessária" : "Indeterminada",
        technicalIndex: 0,
        reasons: []
      };

      if (audit.status === "Adequada tecnicamente") adequateCount++;
      else if (audit.status === "Revisão necessária") reviewCount++;
      else invalidCount++;

      // Cabeçalho do Card da Derivação
      const head = document.createElement("div");
      head.className = "ecg-lead-card-head";

      const titleWrap = document.createElement("div");
      titleWrap.style.display = "flex";
      titleWrap.style.alignItems = "center";
      titleWrap.style.gap = "8px";

      const title = document.createElement("strong");
      title.className = "ecg-lead-title";
      title.textContent = leadInfo.displayLabel || (provisional
        ? `${leadInfo.lead} — hipótese pela posição · região ` + ((leadInfo.candidateRegion?.row ?? 0) + 1) +
          "/" + ((leadInfo.candidateRegion?.col ?? 0) + 1)
        : leadInfo.lead);
      titleWrap.appendChild(title);

      // Badge de status do auditor independente
      const auditBadge = document.createElement("span");
      const badgeCls = audit.status === "Adequada tecnicamente"
        ? "status-ok"
        : (audit.status === "Revisão necessária" ? "status-warn" : "status-err");
      auditBadge.className = `ecg-audit-badge ${badgeCls}`;
      auditBadge.textContent = provisional
        ? "Derivação não identificada · revisão obrigatória"
        : `${audit.status} (${audit.technicalIndex}/100)`;
      auditBadge.title = `Fórmula: 40×Cobertura + 30×Alinhamento + 20×Continuidade + 10×Calibração. ${audit.reasons?.join("; ") || ""}`;
      titleWrap.appendChild(auditBadge);

      head.appendChild(titleWrap);

      // Controles de Zoom (1x, 2x, 4x)
      const zoomControls = document.createElement("div");
      zoomControls.className = "ecg-zoom-controls";
      const vState = getLeadViewState(leadInfo.lead);

      [1, 2, 4].forEach(level => {
        const zBtn = document.createElement("button");
        zBtn.type = "button";
        zBtn.className = `ecg-zoom-btn ${vState.zoom === level ? "is-active" : ""}`;
        zBtn.textContent = `${level}x`;
        zBtn.addEventListener("click", () => {
          vState.zoom = level;
          if (level === 1) { vState.panX = 0; vState.panY = 0; }
          renderStage2Waveforms(currentLeadsData);
        });
        zoomControls.appendChild(zBtn);
      });
      head.appendChild(zoomControls);
      card.appendChild(head);
      if (provisional && !leadInfo.displayLabel) {
        const warning = document.createElement("p");
        warning.className = "ecg-provisional-warning";
        warning.textContent = `Os pixels foram extraídos da posição esperada para ${leadInfo.lead}, mas o rótulo não foi confirmado automaticamente. Compare com a fotografia original antes de confirmar.`;
        card.appendChild(warning);
      } else if (leadInfo.status === "low_quality") {
        const warning = document.createElement("p");
        warning.className = "ecg-provisional-warning";
        warning.textContent = leadInfo.extraction?.message ||
          "A fotografia foi preservada, mas não há pixels suficientes para desenhar um traçado fiel. Recapture esta região.";
        card.appendChild(warning);
      }

      // Metadados técnicos da derivação
      const meta = document.createElement("div");
      meta.className = "ecg-lead-meta";
      const durationText = leadInfo.durationSeconds ? `${leadInfo.durationSeconds}s` : "Duração n/d";
      const hzText = leadInfo.effectiveResolutionHz ? `${leadInfo.effectiveResolutionHz} Hz ef.` : "Escala n/d";
      const calText = leadInfo.calibration ? `${leadInfo.calibration.paperSpeedMmPerSec}mm/s · ${leadInfo.calibration.gainMmPerMv}mm/mV` : "";
      meta.innerHTML = `<span>${durationText} · ${hzText}</span><span>${calText}</span>`;
      card.appendChild(meta);

      // Canvas da visualização (sobreposição / digital / foto)
      const canvas = document.createElement("canvas");
      canvas.className = "ecg-waveform-canvas";
      canvas.width = 340;
      canvas.height = 130;
      card.appendChild(canvas);

      // Suporte a Pan (arrastar com o mouse ou toque)
      setupCanvasPan(canvas, vState, () => {
        drawLeadView(canvas, leadInfo, activeViewMode, vState);
      });

      drawLeadView(canvas, leadInfo, activeViewMode, vState);

      // Rodapé da derivação (recaptura e alertas de auditoria)
      const actions = document.createElement("div");
      actions.style.display = "flex";
      actions.style.justifyContent = "space-between";
      actions.style.alignItems = "center";
      actions.style.marginTop = "4px";

      const btnRecapture = document.createElement("button");
      btnRecapture.type = "button";
      btnRecapture.className = "ecg-btn secondary";
      btnRecapture.style.padding = "5px 10px";
      btnRecapture.style.fontSize = "11.5px";
      btnRecapture.textContent = "Recapturar";
      btnRecapture.addEventListener("click", () => {
        cameraController?.recaptureLead(leadInfo.lead);
      });
      actions.appendChild(btnRecapture);

      if (provisional && !leadInfo.displayLabel) {
        const btnConfirmLead = document.createElement("button");
        btnConfirmLead.type = "button";
        btnConfirmLead.className = "ecg-btn";
        btnConfirmLead.style.padding = "5px 10px";
        btnConfirmLead.style.fontSize = "11.5px";
        btnConfirmLead.textContent = `Confirmar como ${leadInfo.lead}`;
        btnConfirmLead.addEventListener("click", () => {
          const result = cameraController?.confirmCandidateLead(leadInfo.lead);
          if (!result?.confirmed) {
            if (missingAlert) {
              missingAlert.hidden = false;
              missingAlert.textContent = result?.reason || "Não foi possível confirmar esta região.";
            }
            return;
          }
          currentLeadsData = cameraController.getCapturedLeads();
          currentSessionPackage = cameraController.getSessionStructuredPackage();
          renderStage2Waveforms(currentLeadsData);
        });
        actions.appendChild(btnConfirmLead);
      }

      if (audit.reasons && audit.reasons.length > 0) {
        const reasonSmall = document.createElement("small");
        reasonSmall.style.fontSize = "10.5px";
        reasonSmall.style.color = "#d97706";
        reasonSmall.textContent = audit.reasons[0];
        actions.appendChild(reasonSmall);
      }

      card.appendChild(actions);
      reviewGrid.appendChild(card);

      if (!leadInfo.captured || audit.status === "Inválida") hasMissing = true;
    });

    // Atualiza barra de resumo do auditor técnico
    if (auditSummaryText) {
      auditSummaryText.textContent = candidateCount > 0
        ? candidateCount + " região(ões) com traçado candidato. Identidades pendentes — nenhuma derivação não confirmada é autorizada para diagnóstico/IA. " +
          adequateCount + " identificada(s), " + reviewCount + " em revisão."
        : "Auditoria técnica: " + adequateCount + " adequada(s) · " + reviewCount +
          " revisão necessária · " + invalidCount + " inválida(s). Não equivale a validação clínica.";
    }

    if (missingAlert) {
      missingAlert.hidden = !hasMissing;
      if (hasMissing || candidateCount > 0) {
        missingAlert.hidden = false;
        missingAlert.textContent = candidateCount > 0
          ? "Foram localizados traçados, mas a identidade das derivações não foi confirmada. Confira a fotografia original; a IA permanece bloqueada."
          : "Existem derivações pendentes ou de qualidade insuficiente. Recapture antes de prosseguir.";
      }
    }
  }

  function setupCanvasPan(canvas, vState, redrawFn) {
    let isMouseDown = false;
    let startX = 0;
    let startY = 0;

    canvas.addEventListener("mousedown", e => {
      if (vState.zoom <= 1) return;
      isMouseDown = true;
      startX = e.clientX - vState.panX;
      startY = e.clientY - vState.panY;
    });

    window.addEventListener("mousemove", e => {
      if (!isMouseDown) return;
      vState.panX = e.clientX - startX;
      vState.panY = e.clientY - startY;
      redrawFn();
    });

    window.addEventListener("mouseup", () => {
      isMouseDown = false;
    });

    canvas.addEventListener("wheel", e => {
      e.preventDefault();
      if (e.deltaY < 0) {
        vState.zoom = Math.min(4, vState.zoom * 1.25);
      } else {
        vState.zoom = Math.max(1, vState.zoom / 1.25);
        if (vState.zoom === 1) { vState.panX = 0; vState.panY = 0; }
      }
      renderStage2Waveforms(currentLeadsData);
    }, { passive: false });
  }

  /**
   * Desenha a visualização da derivação:
   * - "overlay": SOBREPOSIÇÃO PIXEL A PIXEL REAL sobre a geometria da fotografia recortada
   * - "digital": traçado digital extraído sobre grade milimetrada
   * - "original": fotografia recortada pura
   */
  function drawLeadView(canvas, leadInfo, viewMode, vState) {
    const ctx = canvas.getContext("2d");
    const w = canvas.width;
    const h = canvas.height;

    ctx.clearRect(0, 0, w, h);

    if (!leadInfo.extractedSignal && leadInfo.imageCropUrl) {
      const img = new Image();
      img.onload = () => {
        ctx.drawImage(img, 0, 0, w, h);
        ctx.fillStyle = "rgba(127, 29, 29, 0.84)";
        ctx.fillRect(0, h - 32, w, 32);
        ctx.fillStyle = "#ffffff";
        ctx.font = "600 11px sans-serif";
        ctx.textAlign = "center";
        ctx.fillText("Extração bloqueada — recapture esta região", w / 2, h - 12);
      };
      img.src = leadInfo.imageCropUrl;
      return;
    }

    if (!leadInfo.captured || !leadInfo.extractedSignal) {
      ctx.fillStyle = "#fff7f5";
      ctx.fillRect(0, 0, w, h);
      ctx.fillStyle = "#9ca3af";
      ctx.font = "12px sans-serif";
      ctx.textAlign = "center";
      ctx.fillText("Derivação não capturada ou ilegível", w / 2, h / 2);
      return;
    }

    ctx.save();
    // Aplica zoom e pan
    if (vState.zoom > 1) {
      ctx.translate(w / 2 + vState.panX, h / 2 + vState.panY);
      ctx.scale(vState.zoom, vState.zoom);
      ctx.translate(-w / 2, -h / 2);
    }

    if (viewMode === "original" && leadInfo.imageCropUrl) {
      const img = new Image();
      img.onload = () => {
        ctx.drawImage(img, 0, 0, w, h);
        ctx.restore();
      };
      img.src = leadInfo.imageCropUrl;
      return;
    }

    if (viewMode === "overlay" && leadInfo.imageCropUrl) {
      const img = new Image();
      img.onload = () => {
        // 1. Desenha a fotografia original
        ctx.drawImage(img, 0, 0, w, h);

        // 2. Sobreposição Pixel a Pixel Real: plota curveCoordinatesPx exatamente na escala da imagem recortada
        const cropW = leadInfo.cropWidth || img.naturalWidth || w;
        const cropH = leadInfo.cropHeight || img.naturalHeight || h;
        const scaleX = w / cropW;
        const scaleY = h / cropH;

        const coords = leadInfo.extraction?.curveCoordinatesPx || [];
        const missing = leadInfo.extraction?.missingSegments || [];
        const errors = leadInfo.extraction?.trackingErrors || [];

        // Curva extraída em vermelho de alto contraste
        ctx.beginPath();
        ctx.lineWidth = 1.8;
        ctx.strokeStyle = "#dc2626";

        ctx.lineJoin = "round";
        ctx.lineCap = "round";
        let prevPx = null, prevPy = null;
        for (let i = 0; i < coords.length; i++) {
          const pt = coords[i];
          if (pt && pt.y !== null && !isNaN(pt.y)) {
            const px = pt.x * scaleX;
            const py = pt.y * scaleY;
            if (prevPx === null) {
              ctx.moveTo(px, py);
            } else {
              const midX = (prevPx + px) / 2;
              const midY = (prevPy + py) / 2;
              ctx.quadraticCurveTo(prevPx, prevPy, midX, midY);
            }
            prevPx = px;
            prevPy = py;
          } else {
            if (prevPx !== null) {
              ctx.lineTo(prevPx, prevPy);
              prevPx = null;
              prevPy = null;
            }
          }
        }
        if (prevPx !== null) {
          ctx.lineTo(prevPx, prevPy);
        }
        ctx.stroke();

        // Destaca trechos ausentes ou interpolados (em roxo com marcadores)
        if (missing.length > 0) {
          ctx.fillStyle = "rgba(124, 58, 237, 0.35)";
          missing.forEach(seg => {
            const segX = seg.startCol * scaleX;
            const segW = (seg.endCol - seg.startCol + 1) * scaleX;
            ctx.fillRect(segX, 0, segW, h);
          });
        }

        // Destaca erros de rastreamento / descontinuidades em amarelo/laranja
        if (errors.length > 0) {
          ctx.fillStyle = "#f59e0b";
          errors.forEach(err => {
            const errX = err.col * scaleX;
            ctx.beginPath();
            ctx.arc(errX, 10, 3.5, 0, Math.PI * 2);
            ctx.fill();
          });
        }

        ctx.restore();
      };
      img.src = leadInfo.imageCropUrl;
      return;
    }

    // Modo "digital": desenha a grade milimetrada de ECG
    ctx.fillStyle = "#fff7f5";
    ctx.fillRect(0, 0, w, h);

    // Grade fina (1 mm) e grossa (5 mm)
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

    renderCurveOnContext(ctx, leadInfo.extractedSignal, w, h, "#1e293b", 1.6, leadInfo.calibration || leadInfo.extraction?.calibration);
    ctx.restore();
  }

  function renderCurveOnContext(ctx, signal, w, h, strokeColor, lineWidth, calibration = null) {
    if (!signal || signal.length === 0) return;
    const gainMm = calibration?.gainMmPerMv || 10;
    const pxPerMm = calibration?.pixelsPerMmY || 4;
    const scaleY = gainMm * pxPerMm;
    const centerY = Math.round(h / 40) * 20 || Math.round(h / 2);

    ctx.beginPath();
    ctx.lineWidth = lineWidth || 1.6;
    ctx.strokeStyle = strokeColor || "#1e293b";
    ctx.lineJoin = "round";
    ctx.lineCap = "round";

    let prevX = null, prevY = null;
    for (let i = 0; i < signal.length; i++) {
      const val = signal[i];
      if (val === null || isNaN(val)) {
        if (prevX !== null) {
          ctx.lineTo(prevX, prevY);
          prevX = null;
          prevY = null;
        }
        continue;
      }
      const x = (i / signal.length) * w;
      const y = centerY - val * scaleY;
      if (prevX === null) {
        ctx.moveTo(x, y);
      } else {
        const midX = (prevX + x) / 2;
        const midY = (prevPy + y) / 2;
        ctx.quadraticCurveTo(prevX, prevY, midX, midY);
      }
      prevX = x;
      prevY = y;
    }
    if (prevX !== null) {
      ctx.lineTo(prevX, prevY);
    }
    ctx.stroke();
  }

  // Hidratação a partir de sessão de captura prévia (ex.: retorno de /trabalho/ecg/captura/)
  function checkSavedSession() {
    try {
      const savedSession = sessionStorage.getItem("luria_ecg_session");
      const savedLeads = sessionStorage.getItem("luria_ecg_leads");
      if (savedSession && savedLeads) {
        const pkg = JSON.parse(savedSession);
        const leads = JSON.parse(savedLeads);
        currentSessionPackage = pkg;
        currentLeadsData = leads;

        stage1Section.hidden = true;
        stage2Section.hidden = false;
        stage3Section.hidden = true;
        updateStepIndicators(2);

        updateCalibrationUI(pkg?.calibration);
        renderStage2Waveforms(leads);

        sessionStorage.removeItem("luria_ecg_session");
        sessionStorage.removeItem("luria_ecg_leads");
      }
    } catch (e) {
      console.warn("Erro ao carregar sessão salva de ECG:", e);
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", checkSavedSession);
  } else {
    checkSavedSession();
  }

})();


