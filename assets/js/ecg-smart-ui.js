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

  const captureSource = byId("ecg-capture-source");
  window.LuriaEcgStopScanner = () => {
    cameraController?.stopCamera();
    if (cameraViewport) cameraViewport.hidden = true;
  };

  // Botões de Inicialização da Câmera
  btnStartFast?.addEventListener("click", () => {
    stage1Section.hidden = false;
    stage2Section.hidden = true;
    stage3Section.hidden = true;
    cameraViewport.hidden = false;
    if (captureSource) captureSource.textContent = "Origem: Scanner guiado (automático)";
    cameraController?.startCamera("fast");
  });

  btnStartUltra?.addEventListener("click", () => {
    stage1Section.hidden = false;
    stage2Section.hidden = true;
    stage3Section.hidden = true;
    cameraViewport.hidden = false;
    if (captureSource) captureSource.textContent = "Origem: Scanner guiado (por derivação)";
    cameraController?.startCamera("ultrasensitive");
  });

  btnCancelCamera?.addEventListener("click", () => {
    cameraController?.stopCamera();
    cameraViewport.hidden = true;
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
    const url = URL.createObjectURL(file);
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
          unrectified.getContext("2d").drawImage(img, 0, 0, workW, workH);
          const chosenCorners = photoOptions.corners;
          const manualSelection = Array.isArray(chosenCorners);
          if (manualSelection && !window.LuriaEcgPhotoPerspective) {
            finish({ ok: false, reason: "Correção de perspectiva indisponível." });
            return;
          }
          const selectedPaper = manualSelection
            ? window.LuriaEcgPhotoPerspective.rectifyCanvas(unrectified, chosenCorners, maxSide)
            : null;
          const snapCanvas = selectedPaper?.canvas || unrectified;

          cameraController.stopCamera();
          cameraViewport.hidden = true;
          cameraController.resetCaptureSession?.();
          cameraController.setMode(source === "normal_photo" ? "photo" : "fast");

          const result = cameraController.processPhotographCanvas(snapCanvas, {
            source: manualSelection ? "normal_photo_manual_four_corners" : source,
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
          if (missingAlert) missingAlert.hidden = true;
          if (captureSource) captureSource.textContent = "Origem: " + (source === "normal_photo" ? (manualSelection ? "Foto normal (4 cantos ajustados)" : "Foto normal (integral)") : "Imagem importada") + " · " + originalW + " × " + originalH + " px (original) · " + snapCanvas.width + " × " + snapCanvas.height + " px (análise).";
          const leads = cameraController.getCapturedLeads();
          currentLeadsData = leads;
          currentSessionPackage = cameraController.getSessionStructuredPackage();
          updateCalibrationUI(currentSessionPackage.calibration);
          renderStage2Waveforms(leads);
          finish({ ok: true, capturedCount: result.capturedCount, totalCaptured: result.totalCaptured, originalWidth: originalW, originalHeight: originalH, analysedWidth: workW, analysedHeight: workH });
        } catch (exception) {
          console.warn("[LURIA ECG] Falha no processamento da imagem:", exception);
          finish({ ok: false, reason: "Falha de processamento da fotografia. Tente outra foto." });
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

    let hasMissing = false;
    let adequateCount = 0;
    let reviewCount = 0;
    let invalidCount = 0;

    leads.forEach(leadInfo => {
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
      title.textContent = leadInfo.lead;
      titleWrap.appendChild(title);

      // Badge de status do auditor independente
      const auditBadge = document.createElement("span");
      const badgeCls = audit.status === "Adequada tecnicamente"
        ? "status-ok"
        : (audit.status === "Revisão necessária" ? "status-warn" : "status-err");
      auditBadge.className = `ecg-audit-badge ${badgeCls}`;
      auditBadge.textContent = `${audit.status} (${audit.technicalIndex}/100)`;
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
      auditSummaryText.innerHTML = `<strong>Auditor de Fidelidade Independente:</strong> ${adequateCount} Adequadas · ${reviewCount} Revisão necessária · ${invalidCount} Inválidas / Indeterminadas. (Validação técnica geométrica de continuidade e grade; não equivale a diagnóstico clínico).`;
    }

    if (missingAlert) {
      missingAlert.hidden = !hasMissing;
      if (hasMissing) {
        missingAlert.textContent = "Existem derivações pendentes, com qualidade técnica insuficiente ou rotulagem inconsistente. Recapture as derivações antes de prosseguir para a análise.";
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

        let first = true;
        for (let i = 0; i < coords.length; i++) {
          const pt = coords[i];
          if (pt && pt.y !== null && !isNaN(pt.y)) {
            const px = pt.x * scaleX;
            const py = pt.y * scaleY;
            if (first) {
              ctx.moveTo(px, py);
              first = false;
            } else {
              ctx.lineTo(px, py);
            }
          } else {
            first = true;
          }
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

    renderCurveOnContext(ctx, leadInfo.extractedSignal, w, h, "#1e293b", 1.6);
    ctx.restore();
  }

  function renderCurveOnContext(ctx, signal, w, h, strokeColor, lineWidth) {
    if (!signal || signal.length === 0) return;
    const centerY = h / 2 + 5;
    const scaleY = 32;

    ctx.beginPath();
    ctx.lineWidth = lineWidth;
    ctx.strokeStyle = strokeColor;

    let first = true;
    for (let i = 0; i < signal.length; i++) {
      const val = signal[i];
      if (val === null || isNaN(val)) {
        first = true;
        continue;
      }
      const x = (i / signal.length) * w;
      const y = centerY - val * scaleY;
      if (first) {
        ctx.moveTo(x, y);
        first = false;
      } else {
        ctx.lineTo(x, y);
      }
    }
    ctx.stroke();
  }
})();


