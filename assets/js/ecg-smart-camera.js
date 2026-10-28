/* assets/js/ecg-smart-camera.js
   Controlador Autônomo da Câmera Inteligente de ECG (LURIA).

   Princípios Fundamentais:
   1. TOTALMENTE SEM VOZ/ÁUDIO: Toda a interação é puramente visual (HUD na tela, mira, setas, badges).
   2. TRÊS ETAPAS INDEPENDENTES E SEQUENCIAIS:
      - Etapa 1: Captura Inteligente Contínua (Reconhece limites reais da folha, mapa real das derivações,
        orientação, calibração, avalia foco/enquadramento/estabilidade, captura automático, valida identidade
        real da derivação e processa múltiplas derivações por fotografia quando legíveis).
      - Etapa 2: Extração, Auditoria de Fidelidade e Conferência dos Traçados (sobreposição pixel a pixel real,
        zoom/pan, confirmação de calibração, marcação de trechos ausentes/interpolados e erros de rastreamento).
      - Etapa 3: Revisão pela IA (ativada SOMENTE após conferência, validação de calibração e verificação estrita
        de compatibilidade com o protocolo do modelo autoral).
   3. REUTILIZAÇÃO EXATA da animação de girar o aparelho (LuriaRotateController) quando em modo retrato.
   4. MODO ULTRASSENSÍVEL COM VERIFICAÇÃO DE IDENTIDADE: Nunca presume silenciosamente que a imagem atual
      corresponde à próxima derivação da fila sem reconhecimento do rótulo ou confirmação manual explícita.
*/

(function (global) {
  "use strict";

  const CANONICAL_LEADS = ["DI", "DII", "DIII", "aVR", "aVL", "aVF", "V1", "V2", "V3", "V4", "V5", "V6"];
  const contracts = global.LuriaEcgContracts || (typeof require === "function" ? require("./ecg-contracts.js") : null);

  function createSmartCameraController(options = {}) {
    const {
      videoEl,
      canvasEl,
      hudContainer,
      rotateController,
      onStageChange,
      onLeadsCaptured,
      onExtractComplete,
      onIaReviewReady,
      onUncertainIdentity
    } = options;

    // Estados do Fluxo: 1 = "capture", 2 = "review_signals", 3 = "ai_ready"
    let currentStage = 1;
    let mode = "fast"; // "fast" (panorama geral) ou "ultrasensitive" (detalhado por derivação)

    let stream = null;
    let animationFrameId = null;
    let isCapturingActive = false;
    let autoCaptureLock = false;

    // Estado de calibração global da sessão (medida da grade, confirmada pelo usuário ou presumida)
    let sessionCalibration = {
      paperSpeedMmPerSec: 25,
      gainMmPerMv: 10,
      calibrationSource: "unknown", // "measured" | "user_confirmed" | "assumed" | "unknown"
      confirmedByUser: false,
      pixelsPerMmX: null,
      pixelsPerMmY: null,
      msPerPixel: null,
      mvPerPixel: null
    };

    // Mapa espacial verdadeiro das derivações construídos na Etapa 1
    let currentSheetMap = null;
    let originalImageUrl = null;
    let cameraSpatialTracker = {
      referenceCorners: null,
      lastRoiCenter: { x: 0.5, y: 0.5 },
      trackingLost: false,
      consecutiveUncertainFrames: 0
    };

    // Estado de captura pendente de confirmação manual de identidade (quando OCR é incerto)
    let pendingUncertainCapture = null;

    // Registro das 12 derivações canônicas + tira de ritmo longa opcional
    const capturedLeads = new Map();

    function resetLeadsRegistry() {
      CANONICAL_LEADS.forEach(lead => {
        capturedLeads.set(lead, {
          captured: false,
          lead,
          leadIdentity: {
            lead,
            method: "unverified",
            confidence: 0,
            confirmedByUser: false,
            status: "pending"
          },
          quality: null,
          imageCropUrl: null,
          cropWidth: 0,
          cropHeight: 0,
          regionBounds: null,
          extractedSignal: null,
          extraction: null,
          audit: null,
          calibration: null,
          samplingRateHz: null,
          durationSeconds: null,
          effectiveResolutionHz: null,
          status: "pending" // "pending" | "captured" | "uncertain_identity" | "low_quality"
        });
      });
    }

    resetLeadsRegistry();

    let pendingLeadQueue = [...CANONICAL_LEADS];
    let currentTargetLead = "DI";

    const cvEngine = (typeof global.LuriaEcgCvEngine !== "undefined")
      ? global.LuriaEcgCvEngine.createEngine()
      : null;

    // Amortecedor temporal para mensagens visuais do HUD
    let lastHudMessage = "Localizando ECG...";
    let lastMessageTimestamp = 0;
    const MESSAGE_DEBOUNCE_MS = 550;

    function setHudMessage(msg, force = false) {
      const now = Date.now();
      if (!force && now - lastMessageTimestamp < MESSAGE_DEBOUNCE_MS && lastHudMessage !== "") {
        return;
      }
      lastHudMessage = msg;
      lastMessageTimestamp = now;
      if (hudContainer) {
        const msgEl = hudContainer.querySelector(".ecg-hud-message");
        if (msgEl) msgEl.textContent = msg;
      }
    }

    function updateHudProgress() {
      if (!hudContainer) return;
      const countEl = hudContainer.querySelector(".ecg-hud-count");
      const targetEl = hudContainer.querySelector(".ecg-hud-target");
      const progressFill = hudContainer.querySelector(".ecg-hud-progress-fill");
      const badgeContainer = hudContainer.querySelector(".ecg-hud-lead-badges");

      const capturedCount = CANONICAL_LEADS.filter(l => capturedLeads.get(l)?.captured).length;

      if (countEl) countEl.textContent = `${capturedCount} de 12`;
      if (targetEl) targetEl.textContent = currentTargetLead || "Completo";
      if (progressFill) progressFill.style.width = `${Math.round((capturedCount / 12) * 100)}%`;

      if (badgeContainer) {
        badgeContainer.innerHTML = "";
        CANONICAL_LEADS.forEach(lead => {
          const info = capturedLeads.get(lead);
          const badge = document.createElement("span");
          const stateClass = info.captured
            ? "is-captured"
            : (lead === currentTargetLead ? "is-target" : "is-pending");
          badge.className = `ecg-lead-pill ${stateClass}`;
          badge.textContent = lead;
          badgeContainer.appendChild(badge);
        });
      }
    }

    // New image = new technical session. Do not mix a previous scanner attempt
    // with a later normal photo in the user's A/B comparison.
    function resetCaptureSession() {
      stopCamera();
      resetLeadsRegistry();
      pendingLeadQueue = [...CANONICAL_LEADS];
      currentTargetLead = "DI";
      currentSheetMap = null;
      originalImageUrl = null;
      pendingUncertainCapture = null;
      autoCaptureLock = false;
      currentStage = 1;
      sessionCalibration = {
        paperSpeedMmPerSec: 25,
        gainMmPerMv: 10,
        calibrationSource: "unknown",
        confirmedByUser: false,
        pixelsPerMmX: null,
        pixelsPerMmY: null,
        msPerPixel: null,
        mvPerPixel: null
      };
      global.LuriaEcgSessionData = null;
      updateHudProgress();
    }

    async function startCamera(preferredMode = "fast") {
      mode = preferredMode;
      currentStage = 1;
      autoCaptureLock = false;
      pendingUncertainCapture = null;
      if (typeof onStageChange === "function") onStageChange(1);

      if (rotateController) {
        rotateController.start();
      }

      updateHudProgress();
      if (mode === "ultrasensitive" && currentTargetLead) {
        setHudMessage(`Vá para ${currentTargetLead}.`, true);
      } else {
        setHudMessage("Aponte para o ECG...", true);
      }

      try {
        const constraints = {
          audio: false, // RIGOROSAMENTE SEM ÁUDIO
          video: {
            facingMode: { ideal: "environment" },
            width: { ideal: 1920, min: 1280 },
            height: { ideal: 1080, min: 720 }
          }
        };

        if (typeof navigator !== "undefined" && navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
          stream = await navigator.mediaDevices.getUserMedia(constraints);
          if (videoEl) {
            videoEl.srcObject = stream;
            videoEl.setAttribute("playsinline", "true");
            videoEl.muted = true;
            await videoEl.play();
          }
        }
      } catch (err) {
        console.warn("[LURIA-ECG] Erro ao acessar câmera nativa:", err);
        setHudMessage("Permissão de câmera necessária ou dispositivo incompatível.", true);
      }

      isCapturingActive = true;
      scheduleLoop();
    }

    function stopCamera() {
      isCapturingActive = false;
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
        animationFrameId = null;
      }
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
        stream = null;
      }
      if (rotateController) {
        rotateController.stop();
      }
    }

    function scheduleLoop() {
      if (!isCapturingActive) return;
      processCurrentFrame();
      animationFrameId = requestAnimationFrame(scheduleLoop);
    }

    function processCurrentFrame() {
      if (!videoEl || videoEl.readyState < 2 || !cvEngine || autoCaptureLock) return;

      const result = cvEngine.processFrame(videoEl, canvasEl, {
        userCalibration: sessionCalibration.confirmedByUser ? sessionCalibration : null
      });
      if (!result || !result.ok) return;

      const { quality, isStable, motionBlur, docDetection } = result;
      if (mode === "ultrasensitive") {
        cvEngine.updateSpatialRegistration(cameraSpatialTracker,
          docDetection?.detected ? docDetection.sheet : null,
          docDetection?.detected ? (docDetection.leads || docDetection.detectedLayout?.leads) : null);
      }

      // 1. Verificação de iluminação e reflexos severos
      if (!quality.isLightingGood) {
        if (quality.glareRatio > 0.25) {
          setHudMessage("Evite reflexos na folha.");
          setReticleStatus("adjusting");
          return;
        } else if (quality.brightness < 45) {
          setHudMessage("Melhore a iluminação.");
          setReticleStatus("adjusting");
          return;
        }
      }

      // 2. Verificação de orientação (rotação de 90°/270° ou inclinação acentuada)
      if (docDetection.orientation && docDetection.orientation.isRotated90) {
        setHudMessage("ECG rotacionado em 90°. Gire o exame ou o celular para a horizontal.");
        setReticleStatus("adjusting");
        return;
      }

      // 3. Verificação se o ECG foi identificado
      if (!docDetection.detected) {
        if (mode === "ultrasensitive") {
          // No modo ultrassensível, podemos estar muito próximos de 1 ou 2 derivações
          if (quality.sharpnessScore < 20) {
            setHudMessage("Aproxime ou afaste um pouco para focar...");
            setReticleStatus("adjusting");
            return;
          }
          if (motionBlur || !isStable) {
            setHudMessage("Mantenha parado.");
            setReticleStatus("stabilizing");
            return;
          }
          // Tenta capturar/identificar a região aproximada
          setReticleStatus("aligned");
          performAutonomousCapture(false, result);
          return;
        }

        setHudMessage(docDetection.reason || "Região não identificada. Afaste o celular para localizar novamente o ECG.");
        setReticleStatus("searching");
        return;
      }

      // Atualiza o mapa espacial verdadeiro quando detectado
      currentSheetMap = docDetection;

      // 4. Orientação direcional em tempo real quando buscando derivação específica
      if (mode === "ultrasensitive" && currentTargetLead && currentSheetMap) {
        // O centro da tela é a posição observada da câmera; a região alvo é registrada entre quadros.
        const currentCenter = { x: 0.5, y: 0.5 };
        cameraSpatialTracker.lastRoiCenter = currentCenter;

        const nav = cvEngine.computeNavigationGuidance(currentSheetMap, currentTargetLead, currentCenter, cameraSpatialTracker);
        if (nav && nav.direction !== "aligned" && nav.direction !== "centered") {
          setHudMessage(nav.instruction || nav.message);
          setReticleStatus("adjusting");
          return;
        }
      }

      // 5. Se a folha foi detectada, mas há movimento
      if (motionBlur || !isStable) {
        setHudMessage("Mantenha parado.");
        setReticleStatus("stabilizing");
        return;
      }

      // 6. Se nitidez for insuficiente
      if (quality.sharpnessScore < 22) {
        setHudMessage("Mantenha parado para focar...");
        setReticleStatus("adjusting");
        return;
      }

      // 7. Enquadramento e estabilidade alcançados -> Captura Autônoma
      setReticleStatus("aligned");

      if (mode === "fast") {
        setHudMessage("ECG identificado! Capturando e validando derivações...", true);
        performAutonomousCapture(true, result);
      } else {
        setHudMessage("Mantenha parado.", true);
        performAutonomousCapture(false, result);
      }
    }

    function setReticleStatus(status) {
      if (!hudContainer) return;
      const reticle = hudContainer.querySelector(".ecg-hud-reticle");
      if (reticle) {
        reticle.setAttribute("data-status", status);
      }
    }

    /**
     * Processa um ImageData/Canvas estático (vindo da câmera ou de upload de arquivo),
     * executando reconhecimento real do layout, OCR de rótulos, extração por programação dinâmica,
     * calibração real e auditoria técnica independente.
     * Quando uma única fotografia contém múltiplas derivações legíveis, processa TODAS individualmente.
     */
    function processPhotographCanvas(snapCanvas, options = {}) {
      const extractor = global.LuriaEcgSignalExtractor;
      if (!cvEngine || !extractor) {
        return { ok: false, capturedCount: 0, reason: "Motores de visão/extração indisponíveis." };
      }

      const ctx = snapCanvas.getContext("2d");
      let fullImageData = ctx.getImageData(0, 0, snapCanvas.width, snapCanvas.height);
      originalImageUrl = typeof snapCanvas.toDataURL === "function" ? snapCanvas.toDataURL("image/jpeg", 0.92) : null;

      // 1. Detecta limites reais, orientação, perspectiva, grade, calibração e rótulos
      let boundaries = cvEngine.detectECGBoundaries(fullImageData, {
        userCalibration: sessionCalibration.confirmedByUser ? sessionCalibration : options.userCalibration
      });

      // Se a imagem estiver rotacionada ou com perspectiva severa e os cantos foram localizados, retifica
      if (!options.manualPaperCornersApplied && boundaries.orientation && (boundaries.orientation.isRotated90 || Math.abs(boundaries.orientation.skewAngleDeg) > 1.5)) {
        const corrAngle = boundaries.orientation.isRotated90 ? 90 : -boundaries.orientation.skewAngleDeg;
        const rectified = cvEngine.rectifyImagePerspective(
          fullImageData,
          boundaries.sheet?.corners || {
            topLeft: { x: 0, y: 0 },
            topRight: { x: fullImageData.width, y: 0 },
            bottomLeft: { x: 0, y: fullImageData.height },
            bottomRight: { x: fullImageData.width, y: fullImageData.height }
          },
          corrAngle
        );
        if (rectified && rectified.width > 80 && rectified.height > 80) {
          snapCanvas.width = rectified.width;
          snapCanvas.height = rectified.height;
          ctx.putImageData(rectified, 0, 0);
          fullImageData = rectified;
          boundaries = cvEngine.detectECGBoundaries(fullImageData, {
            userCalibration: sessionCalibration.confirmedByUser ? sessionCalibration : options.userCalibration
          });
        }
      }

      // Atualiza calibração da sessão se medida na grade ou no objeto calibration
      const detectedCal = boundaries.calibration || boundaries.gridCalibration || null;
      if (detectedCal) {
        const gc = detectedCal;
        if (gc.calibrationSource === "measured" || gc.calibrationSource === "user_confirmed") {
          sessionCalibration = {
            ...sessionCalibration,
            paperSpeedMmPerSec: gc.paperSpeedMmPerSec || sessionCalibration.paperSpeedMmPerSec,
            gainMmPerMv: gc.gainMmPerMv || sessionCalibration.gainMmPerMv,
            calibrationSource: gc.calibrationSource,
            confirmedByUser: Boolean(gc.confirmedByUser || sessionCalibration.confirmedByUser),
            pixelsPerMmX: gc.pixelsPerMmX,
            pixelsPerMmY: gc.pixelsPerMmY,
            msPerPixel: gc.msPerPixel,
            mvPerPixel: gc.mvPerPixel
          };
        } else if (sessionCalibration.calibrationSource === "unknown") {
          sessionCalibration.calibrationSource = gc.calibrationSource || "assumed";
          sessionCalibration.pixelsPerMmX = gc.pixelsPerMmX;
          sessionCalibration.pixelsPerMmY = gc.pixelsPerMmY;
          sessionCalibration.msPerPixel = gc.msPerPixel;
          sessionCalibration.mvPerPixel = gc.mvPerPixel;
        }
      }

      currentSheetMap = boundaries;

      const leadsMap = boundaries.leads || boundaries.detectedLayout?.leads || null;

      // Se a imagem foi rejeitada (papel em branco, página de texto, grade vazia sem ECG, etc.)
      if (!boundaries.detected || !leadsMap) {
        return {
          ok: false,
          capturedCount: 0,
          boundaries,
          reason: boundaries.reason || boundaries.message || "Não foi possível reconhecer um exame de ECG válido na imagem."
        };
      }

      // Processa cada região candidata identificada no mapa
      let newlyCapturedCount = 0;
      const newlyCapturedLeads = [];
      const anomalies = contracts.normalizeAnomalies(boundaries.anomalies);

      CANONICAL_LEADS.forEach(leadName => {
        const box = leadsMap[leadName];
        if (!box) return;

        const roiX = Math.max(0, Math.round(box.xMin * snapCanvas.width));
        const roiY = Math.max(0, Math.round(box.yMin * snapCanvas.height));
        const roiW = Math.min(snapCanvas.width - roiX, Math.round((box.xMax - box.xMin) * snapCanvas.width));
        const roiH = Math.min(snapCanvas.height - roiY, Math.round((box.yMax - box.yMin) * snapCanvas.height));

        if (roiW < 24 || roiH < 16) return;

        const cropCanvas = document.createElement("canvas");
        cropCanvas.width = roiW;
        cropCanvas.height = roiH;
        const cropCtx = cropCanvas.getContext("2d");
        cropCtx.drawImage(snapCanvas, roiX, roiY, roiW, roiH, 0, 0, roiW, roiH);
        const roiImageData = cropCtx.getImageData(0, 0, roiW, roiH);

        // Verifica o rótulo específico e anomalias (troca ou duplicidade)
        const regionAnomalies = anomalies.filter(a => a.lead === leadName || a.recognizedLead === leadName || a.expectedLead === leadName);
        const leadIdentity = contracts.normalizeLeadIdentity({
          ...(boundaries.leadIdentities?.[leadName] || {}),
          lead: leadName,
          expectedLead: boundaries.leadIdentities?.[leadName]?.expectedLead || box.expectedInTemplate || leadName,
          region: boundaries.leadIdentities?.[leadName]?.region || box,
          anomalies: regionAnomalies,
          confirmedByUser: options.confirmedLead === leadName,
          humanConfirmedLead: options.confirmedLead === leadName ? leadName : null
        });

        const extractionResult = extractor.extractRealSignalFromImageData(roiImageData, {
          leadIdentity,
          regionBounds: { x: roiX, y: roiY, width: roiW, height: roiH },
          calibration: sessionCalibration,
          provenance: {
            source: options.source || "smart_camera",
            layoutId: boundaries.layoutId,
            captureMode: mode,
            timestamp: new Date().toISOString()
          }
        });

        const leadInfo = capturedLeads.get(leadName);
        if (!leadInfo) return;

        // Só substitui se ainda não estava capturada ou se a nova extração tem melhor índice técnico
        const prevIndex = leadInfo.audit?.technicalIndex || 0;
        const newIndex = extractionResult.audit?.technicalIndex || 0;

        if (extractionResult.isValid && extractionResult.signal && (!leadInfo.captured || newIndex >= prevIndex)) {
          leadInfo.captured = true;
          leadInfo.status = "captured";
          leadInfo.leadIdentity = leadIdentity;
          leadInfo.imageCropUrl = typeof cropCanvas.toDataURL === "function"
            ? cropCanvas.toDataURL("image/jpeg", 0.92)
            : null;
          leadInfo.cropWidth = roiW;
          leadInfo.cropHeight = roiH;
          leadInfo.regionBounds = { x: roiX, y: roiY, width: roiW, height: roiH };
          leadInfo.extractedSignal = extractionResult.signal;
          leadInfo.extraction = extractionResult;
          leadInfo.audit = extractionResult.audit;
          leadInfo.calibration = extractionResult.calibration;
          leadInfo.confidence = extractionResult.confidence;
          leadInfo.samplingRateHz = extractionResult.effectiveResolutionHz || null;
          leadInfo.durationSeconds = extractionResult.recoveredDurationSeconds || null;
          leadInfo.effectiveResolutionHz = extractionResult.effectiveResolutionHz || null;

          newlyCapturedCount++;
          newlyCapturedLeads.push(leadName);
        } else if (!leadInfo.captured) {
          leadInfo.status = "low_quality";
          leadInfo.extraction = extractionResult;
          leadInfo.audit = extractionResult.audit;
        }
      });

      pendingLeadQueue = CANONICAL_LEADS.filter(l => !capturedLeads.get(l).captured);
      currentTargetLead = pendingLeadQueue[0] || null;
      updateHudProgress();

      return {
        ok: newlyCapturedCount > 0,
        capturedCount: newlyCapturedCount,
        newlyCapturedLeads,
        totalCaptured: CANONICAL_LEADS.filter(l => capturedLeads.get(l).captured).length,
        boundaries
      };
    }

    /**
     * Captura autônoma durante o loop de vídeo da Etapa 1.
     */
    function performAutonomousCapture(isGlobalCapture, frameAnalysis = null) {
      if (autoCaptureLock) return;
      autoCaptureLock = true;

      const snapCanvas = document.createElement("canvas");
      snapCanvas.width = canvasEl.width || 640;
      snapCanvas.height = canvasEl.height || 360;
      const snapCtx = snapCanvas.getContext("2d");
      snapCtx.drawImage(canvasEl, 0, 0);

      triggerVisualFlash();

      const extractor = global.LuriaEcgSignalExtractor;

      // 1. Tentativa de captura múltipla (tanto no modo Rápido quanto no Ultrassensível se várias derivações estiverem visíveis!)
      const multiResult = processPhotographCanvas(snapCanvas, { source: "autonomous_camera" });

      if (multiResult.ok && multiResult.capturedCount > 0) {
        if (multiResult.totalCaptured === 12) {
          setHudMessage("Todas as 12 derivações capturadas e validadas! Abrindo conferência...", true);
          setTimeout(() => {
            stopCamera();
            transitionToStage2();
          }, 900);
          return;
        }

        if (isGlobalCapture && multiResult.totalCaptured >= 10) {
          setHudMessage(`${multiResult.totalCaptured} de 12 derivações identificadas! Abrindo conferência...`, true);
          setTimeout(() => {
            stopCamera();
            transitionToStage2();
          }, 1000);
          return;
        }

        const firstCaptured = multiResult.newlyCapturedLeads[0];
        const nextLead = pendingLeadQueue[0];
        if (nextLead) {
          setHudMessage(`${firstCaptured} capturada! Vá para ${nextLead}.`, true);
        }
        setTimeout(() => {
          autoCaptureLock = false;
        }, 1100);
        return;
      }

      // 2. Modo Ultrassensível em close-up (quando a câmera enquadra apenas 1 derivação isolada de perto)
      if (!isGlobalCapture && currentTargetLead && cvEngine && extractor) {
        const roiW = Math.round(snapCanvas.width * 0.84);
        const roiH = Math.round(snapCanvas.height * 0.72);
        const roiX = Math.round((snapCanvas.width - roiW) / 2);
        const roiY = Math.round((snapCanvas.height - roiH) / 2);

        const cropCanvas = document.createElement("canvas");
        cropCanvas.width = roiW;
        cropCanvas.height = roiH;
        const cropCtx = cropCanvas.getContext("2d");
        cropCtx.drawImage(snapCanvas, roiX, roiY, roiW, roiH, 0, 0, roiW, roiH);
        const roiImageData = cropCtx.getImageData(0, 0, roiW, roiH);

        // REQUISITO CRÍTICO DA AUDITORIA:
        // O modo ultrassensível NÃO pode simplesmente considerar que a imagem atual corresponde à próxima derivação da fila!
        // Precisamos reconhecer o rótulo na imagem ou exigir confirmação manual explícita se a identidade for incerta.
        const labelRecognition = cvEngine.recognizeLeadLabelInRegion(roiImageData, {
          xMin: 0,
          yMin: 0,
          xMax: 0.45,
          yMax: 0.55
        });

        const gridCal = cvEngine.detectECGGridAndCalibration(roiImageData, sessionCalibration.confirmedByUser ? sessionCalibration : null);
        const effectiveCal = gridCal.calibrationSource === "measured" ? gridCal : sessionCalibration;

        const extractionResult = extractor.extractRealSignalFromImageData(roiImageData, {
          leadIdentity: contracts.normalizeLeadIdentity({
            lead: labelRecognition.recognizedLead || currentTargetLead,
            recognizedLead: labelRecognition.recognizedLead || labelRecognition.lead,
            rawOcrText: labelRecognition.rawText,
            expectedLead: currentTargetLead,
            method: labelRecognition.recognizedLead ? labelRecognition.method : "topology_hypothesis",
            ocrConfidence: labelRecognition.confidence || 0,
            evidence: "positional_hypothesis",
            region: { x: roiX, y: roiY, width: roiW, height: roiH }
          }),
          regionBounds: { x: roiX, y: roiY, width: roiW, height: roiH },
          calibration: effectiveCal,
          provenance: { source: "ultrasensitive_closeup", timestamp: new Date().toISOString() }
        });

        if (!extractionResult.isValid || !extractionResult.signal) {
          setHudMessage("Região não identificada. Afaste o celular para localizar novamente o ECG.", true);
          setTimeout(() => {
            autoCaptureLock = false;
          }, 1200);
          return;
        }

        const detectedLead = labelRecognition.recognizedLead || labelRecognition.lead || null;

        // Verifica se o rótulo foi reconhecido com evidência suficiente
        if (detectedLead && labelRecognition.confidence >= 0.68) {
          const recognizedLead = detectedLead;
          saveCloseUpLeadCapture(recognizedLead, cropCanvas, roiW, roiH, roiX, roiY, extractionResult, contracts.normalizeLeadIdentity({
            lead: recognizedLead,
            recognizedLead,
            rawOcrText: labelRecognition.rawText,
            method: labelRecognition.method,
            ocrConfidence: labelRecognition.confidence,
            confirmedByUser: false,
            region: { x: roiX, y: roiY, width: roiW, height: roiH }
          }));

          pendingLeadQueue = CANONICAL_LEADS.filter(l => !capturedLeads.get(l).captured);
          updateHudProgress();

          if (pendingLeadQueue.length > 0) {
            currentTargetLead = pendingLeadQueue[0];
            setHudMessage(`${recognizedLead} capturada! Vá para ${currentTargetLead}.`, true);
            setTimeout(() => {
              autoCaptureLock = false;
            }, 1100);
          } else {
            currentTargetLead = null;
            setHudMessage("Todas as derivações capturadas! Abrindo conferência...", true);
            setTimeout(() => {
              stopCamera();
              transitionToStage2();
            }, 1000);
          }
          return;
        }

        // Se o traçado é válido, mas o rótulo NÃO pôde ser reconhecido com certeza:
        // Recusa atribuição silenciosa à fila e solicita reenquadramento ou confirmação manual!
        pendingUncertainCapture = {
          suggestedLead: currentTargetLead,
          cropCanvas,
          roiW,
          roiH,
          roiX,
          roiY,
          extractionResult
        };

        setHudMessage(`Identificação incerta para ${currentTargetLead}. Reenquadre o rótulo ou confirme manualmente.`, true);
        if (typeof onUncertainIdentity === "function") {
          onUncertainIdentity({
            suggestedLead: currentTargetLead,
            extractionResult,
            confirmCallback: confirmedLeadName => confirmUncertainLeadCapture(confirmedLeadName),
            rejectCallback: () => rejectUncertainLeadCapture()
          });
        } else {
          setTimeout(() => {
            autoCaptureLock = false;
          }, 1500);
        }
        return;
      }

      setHudMessage(multiResult.reason || "Região não identificada. Afaste o celular para localizar novamente o ECG.", true);
      setTimeout(() => {
        autoCaptureLock = false;
      }, 1300);
    }

    function saveCloseUpLeadCapture(leadName, cropCanvas, roiW, roiH, roiX, roiY, extractionResult, leadIdentity) {
      const leadInfo = capturedLeads.get(leadName);
      if (!leadInfo) return false;

      extractionResult.leadIdentity = contracts.normalizeLeadIdentity(leadIdentity);
      if (global.LuriaEcgSignalExtractor && global.LuriaEcgSignalExtractor.auditExtractedLead) {
        extractionResult.audit = global.LuriaEcgSignalExtractor.auditExtractedLead(extractionResult);
      }

      leadInfo.captured = true;
      leadInfo.status = "captured";
      leadInfo.leadIdentity = extractionResult.leadIdentity;
      leadInfo.imageCropUrl = typeof cropCanvas.toDataURL === "function"
        ? cropCanvas.toDataURL("image/jpeg", 0.92)
        : null;
      leadInfo.cropWidth = roiW;
      leadInfo.cropHeight = roiH;
      leadInfo.regionBounds = { x: roiX, y: roiY, width: roiW, height: roiH };
      leadInfo.extractedSignal = extractionResult.signal;
      leadInfo.extraction = extractionResult;
      leadInfo.audit = extractionResult.audit;
      leadInfo.calibration = extractionResult.calibration;
      leadInfo.confidence = extractionResult.confidence;
      leadInfo.samplingRateHz = extractionResult.effectiveResolutionHz || null;
      leadInfo.durationSeconds = extractionResult.recoveredDurationSeconds || null;
      leadInfo.effectiveResolutionHz = extractionResult.effectiveResolutionHz || null;
      return true;
    }

    /**
     * Confirmação manual explícita pelo usuário quando a câmera reporta "Identificação incerta".
     */
    function confirmUncertainLeadCapture(confirmedLeadName) {
      if (!pendingUncertainCapture) return false;
      const target = CANONICAL_LEADS.includes(confirmedLeadName)
        ? confirmedLeadName
        : pendingUncertainCapture.suggestedLead;

      const { cropCanvas, roiW, roiH, roiX, roiY, extractionResult } = pendingUncertainCapture;
      saveCloseUpLeadCapture(target, cropCanvas, roiW, roiH, roiX, roiY, extractionResult, contracts.normalizeLeadIdentity({
        lead: target,
        recognizedLead: extractionResult.leadIdentity?.recognizedLead || null,
        expectedLead: extractionResult.leadIdentity?.expectedLead || null,
        method: "user_confirmed",
        ocrConfidence: extractionResult.leadIdentity?.ocrConfidence || 0,
        confirmedByUser: true,
        humanConfirmedLead: target,
        region: { x: roiX, y: roiY, width: roiW, height: roiH },
        anomalies: extractionResult.leadIdentity?.anomalies || []
      }));

      pendingUncertainCapture = null;
      pendingLeadQueue = CANONICAL_LEADS.filter(l => !capturedLeads.get(l).captured);
      updateHudProgress();

      if (pendingLeadQueue.length > 0) {
        currentTargetLead = pendingLeadQueue[0];
        setHudMessage(`${target} confirmada! Vá para ${currentTargetLead}.`, true);
        autoCaptureLock = false;
      } else {
        currentTargetLead = null;
        setHudMessage("Todas as derivações capturadas! Abrindo conferência...", true);
        stopCamera();
        transitionToStage2();
      }
      return true;
    }

    function rejectUncertainLeadCapture() {
      pendingUncertainCapture = null;
      autoCaptureLock = false;
      setHudMessage(`Vá para ${currentTargetLead || "DI"} e inclua o rótulo da derivação no quadro.`, true);
    }

    function triggerVisualFlash() {
      if (!hudContainer) return;
      const flashEl = hudContainer.querySelector(".ecg-hud-flash");
      if (flashEl) {
        if (flashEl.classList) {
          flashEl.classList.remove("is-active");
          void flashEl.offsetWidth;
          flashEl.classList.add("is-active");
        }
      }
    }

    /**
     * Atualiza a calibração confirmada pelo médico na Etapa 2 e recalcula durações/escalas e auditoria.
     */
    function setUserCalibration(calOptions = {}) {
      const speed = Number(calOptions.paperSpeedMmPerSec);
      const gain = Number(calOptions.gainMmPerMv);
      const pxPerMmX = Number(calOptions.pixelsPerMmX || sessionCalibration.pixelsPerMmX);
      const pxPerMmY = Number(calOptions.pixelsPerMmY || sessionCalibration.pixelsPerMmY);
      if (![25, 50].includes(speed) || ![5, 10].includes(gain) || !(pxPerMmX > 0 && pxPerMmY > 0)) {
        return { ...sessionCalibration, error: "Escala inválida ou espaçamento da grade não medido. Reenquadre a grade antes de confirmar." };
      }

      sessionCalibration = {
        paperSpeedMmPerSec: speed,
        gainMmPerMv: gain,
        calibrationSource: calOptions.confirmedByUser ? "user_confirmed" : (sessionCalibration.calibrationSource || "assumed"),
        confirmedByUser: Boolean(calOptions.confirmedByUser),
        pixelsPerMmX: pxPerMmX,
        pixelsPerMmY: pxPerMmY,
        msPerPixel: 1000 / (speed * pxPerMmX),
        mvPerPixel: 1 / (gain * pxPerMmY)
      };

      const extractor = global.LuriaEcgSignalExtractor;
      capturedLeads.forEach(leadInfo => {
        if (leadInfo.captured && leadInfo.extraction) {
          const recalculated = extractor?.recalibrateExtraction?.(leadInfo.extraction, sessionCalibration);
          if (!recalculated) {
            leadInfo.audit = { status: "Indeterminada", reasons: ["Pixels originais indisponíveis para recalcular a escala."], allowsAiModelInput: false };
            return;
          }
          leadInfo.extractedSignal = recalculated.signal;
          leadInfo.calibration = recalculated.calibration;
          leadInfo.durationSeconds = recalculated.recoveredDurationSeconds;
          leadInfo.samplingRateHz = recalculated.effectiveResolutionHz;
          leadInfo.effectiveResolutionHz = recalculated.effectiveResolutionHz;
          leadInfo.audit = recalculated.audit;
        }
      });

      return sessionCalibration;
    }

    /**
     * Constrói o pacote estruturado completo da sessão para a Etapa 2 e Etapa 3.
     */
    function getSessionStructuredPackage() {
      const leadsArray = Array.from(capturedLeads.values());
      const extractor = global.LuriaEcgSignalExtractor;
      const extractionObjects = leadsArray
        .filter(l => l.captured && l.extraction)
        .map(l => ({ lead: l.lead, audit: l.audit, extraction: l.extraction }));

      const globalAudit = (extractor && extractor.auditFullExtraction)
        ? extractor.auditFullExtraction(extractionObjects)
        : null;

      const signalsByLead = {};
      const validMasksByLead = {};
      const durationsByLead = {};
      const limitations = [];

      leadsArray.forEach(l => {
        if (l.captured && l.extraction) {
          signalsByLead[l.lead] = l.extractedSignal;
          validMasksByLead[l.lead] = l.extraction.validMask;
          durationsByLead[l.lead] = l.durationSeconds;
          if (Array.isArray(l.extraction.limitations)) {
            l.extraction.limitations.forEach(lim => {
              limitations.push(`${l.lead}: ${lim}`);
            });
          }
        }
      });

      return {
        timestamp: new Date().toISOString(),
        layoutId: currentSheetMap?.layoutId || "unknown",
        originalImageUrl,
        anomalies: contracts.normalizeAnomalies(currentSheetMap?.anomalies),
        calibration: { ...sessionCalibration },
        leads: leadsArray,
        signals: signalsByLead,
        validMasks: validMasksByLead,
        samplingRateHz: null, // amostras espaciais nativas; reamostragem digital ainda não foi executada
        durationsSeconds: durationsByLead,
        globalAudit,
        limitations
      };
    }

    function transitionToStage2() {
      if (!Array.from(capturedLeads.values()).some(l => l.captured)) return false;
      currentStage = 2;
      const pkg = getSessionStructuredPackage();
      global.LuriaEcgSessionData = pkg;
      if (typeof onStageChange === "function") onStageChange(2);
      if (typeof onExtractComplete === "function") {
        onExtractComplete(Array.from(capturedLeads.values()), pkg);
      }
      return true;
    }

    function recaptureLead(lead) {
      const info = capturedLeads.get(lead);
      if (info) {
        info.captured = false;
        info.status = "pending";
      }
      pendingLeadQueue = [lead, ...CANONICAL_LEADS.filter(l => l !== lead && !capturedLeads.get(l)?.captured)];
      currentTargetLead = lead;
      currentStage = 1;
      startCamera("ultrasensitive");
    }

    /**
     * Portão de Segurança para a Etapa 3:
     * Verifica derivações ausentes, derivações inválidas/indeterminadas na auditoria técnica
     * e calibração confirmada/medida.
     */
    function confirmExtractionAndEnableAI() {
      const missing = CANONICAL_LEADS.filter(l => !capturedLeads.get(l)?.captured);
      if (missing.length > 0) {
        return {
          allowed: false,
          reason: `Não é permitido prosseguir enquanto faltarem derivações essenciais (${missing.join(", ")}).`
        };
      }

      const invalidLeads = CANONICAL_LEADS.filter(l => {
        const item = capturedLeads.get(l);
        return item?.audit?.status !== "Adequada tecnicamente" ||
          item?.leadIdentity?.status !== "ocr_confirmed" ||
          !Array.isArray(item?.extraction?.validMask) ||
          item.extraction.validMask.length !== item.extraction.signal?.length;
      });

      if (invalidLeads.length > 0) {
        return {
          allowed: false,
          reason: `As derivações (${invalidLeads.join(", ")}) não têm identidade OCR, máscara e auditoria técnica suficientes. Revise ou recapture antes de prosseguir.`
        };
      }

      if (sessionCalibration.calibrationSource !== "measured" && !sessionCalibration.confirmedByUser) {
        return {
          allowed: false,
          reason: "A calibração (velocidade de 25/50 mm/s e ganho de 10/5 mm/mV) não pôde ser medida automaticamente com segurança. Confirme a escala de calibração no painel acima antes de prosseguir."
        };
      }

      currentStage = 3;
      const pkg = getSessionStructuredPackage();
      global.LuriaEcgSessionData = pkg;

      if (typeof onStageChange === "function") onStageChange(3);
      if (typeof onIaReviewReady === "function") onIaReviewReady(pkg);

      return { allowed: true, sessionPackage: pkg };
    }

    return {
      startCamera,
      stopCamera,
      resetCaptureSession,
      recaptureLead,
      processPhotographCanvas,
      openReview: transitionToStage2,
      confirmUncertainLeadCapture,
      rejectUncertainLeadCapture,
      setUserCalibration,
      getSessionCalibration: () => ({ ...sessionCalibration }),
      getSessionStructuredPackage,
      confirmExtractionAndEnableAI,
      getCapturedLeads: () => Array.from(capturedLeads.values()),
      getCurrentStage: () => currentStage,
      setMode: m => { mode = m; },
      updateHudProgress
    };
  }

  global.LuriaSmartCamera = {
    createController: createSmartCameraController,
    CANONICAL_LEADS
  };

  if (typeof module !== "undefined" && module.exports) {
    module.exports = {
      createSmartCameraController,
      CANONICAL_LEADS
    };
  }
})(typeof window !== "undefined" ? window : globalThis);


