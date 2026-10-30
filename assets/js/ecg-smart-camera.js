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

  // Fail closed for LIVE automatic captures. Looking like lines is not proof
  // of an ECG: require a valid paper, >=3 waveform cells and either a measured
  // ECG grid or multiple independently recognized lead labels.
  function hasCredibleEcgCandidates(detection, manualPaperSelection = false, photoPreviewOnly = false) {
    if (!detection) return false;
    const sheet = detection.sheet;
    if (!manualPaperSelection && (!sheet?.found || sheet.isCutOff || sheet.hasSeverePerspective)) return false;
    const n = Math.max(Number(detection.waveformCandidateCount || 0),
      Number(detection.detectedLayout?.validWaveformCells || 0));
    // Preserve independent signal evidence when simple template OCR disagrees;
    // never regard the mismatch as verified lead identity.
    const partialPhoto = photoPreviewOnly && detection.detectedLayout?.documentType &&
      detection.detectedLayout.documentType !== "full_ecg_candidate";
    const minimum = partialPhoto ? 1 : 3;
    if (n < minimum || Object.keys(detection.candidateRegions || {}).length < minimum) return false;
    const grid = detection.calibration;
    const labels = detection.recognizedLabels || {};
    const strongLabels = Object.values(labels).filter(x => x?.ocrRecognized && x?.hasValidTrace).length;
    return manualPaperSelection ||
      grid?.gridDetected === true ||
      Number(grid?.coloredGridRatio || 0) >= 0.012 ||
      strongLabels >= 2 ||
      // On user-initiated photos, uncertain calibration must NOT prevent a
      // clearly marked, non-clinical waveform preview.
      (photoPreviewOnly && n >= minimum && sheet?.found === true) ||
      // Live mode still needs stronger morphology if the grid is illegible.
      (n >= 6 && detection.detected === true && sheet?.found === true);
  }
  function isVerifiedEcgScene(detection) {
    return hasCredibleEcgCandidates(detection, false);
  }
  function isCaptureReadyScene(detection) {
    if (!detection?.sheet?.found || detection.sheet.isCutOff || detection.sheet.hasSeverePerspective) return false;
    const candidates = Math.max(Number(detection.waveformCandidateCount || 0),
      Number(detection.detectedLayout?.validWaveformCells || 0));
    // Taking a local photograph may be permissive; naming and measuring leads
    // remains protected by the stricter full-resolution extraction gate.
    return candidates >= 2 || (detection.calibration?.gridDetected === true && candidates >= 1);
  }

  // Template positions are *not* lead identities. Never publish a named
  // signal merely because an ECG-looking curve occupies an expected slot.
  // Small bitmap OCR is provisional: accept only non-conflicting, strong
  // exact matches to the expected label, with no sheet-level label ambiguity.
  function isSafeAutomaticLeadAssignment(lead, identity, box, anomalies = []) {
    const warnings = new Set(["duplicate_label", "label_conflict",
      "ambiguous_swapped_leads_without_full_ocr", "non_standard_lead_arrangement"]);
    if (anomalies.some(a => warnings.has(a.code))) return false;
    if (!identity || !box || identity.status !== "ocr_confirmed") return false;
    if (identity.recognizedLead !== lead || identity.expectedLead !== lead ||
        box.expectedInTemplate !== lead) return false;
    if (identity.method !== "glyph_template_ocr" || Number(identity.ocrConfidence) < 0.93) return false;
    if (identity.anomalies?.some(a => warnings.has(a.code))) return false;
    return true;
  }

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
    let verifiedFrameCount = 0;
    let verifiedSince = 0;
    let hudHasVerifiedPaper = false;
    let lastFrameAnalyzedAt = -Infinity;
    let cameraTrack = null;

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
      capturedLeads.clear();
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

    function setHudPaperVerified(verified) {
      const changed = hudHasVerifiedPaper !== Boolean(verified);
      hudHasVerifiedPaper = Boolean(verified);
      if (!hudContainer || !changed) return;
      for (const selector of [".ecg-hud-target-badge", ".ecg-hud-lead-badges", ".ecg-hud-counter", ".ecg-hud-progress-bar"]) {
        const element = hudContainer.querySelector(selector);
        if (element) element.hidden = !hudHasVerifiedPaper;
      }
    }

    function updateHudProgress() {
      if (!hudContainer) return;
      const countEl = hudContainer.querySelector(".ecg-hud-count");
      const targetEl = hudContainer.querySelector(".ecg-hud-target");
      const progressFill = hudContainer.querySelector(".ecg-hud-progress-fill");
      const badgeContainer = hudContainer.querySelector(".ecg-hud-lead-badges");

      const capturedCount = CANONICAL_LEADS.filter(l => capturedLeads.get(l)?.status === "captured").length;

      if (countEl) countEl.textContent = `${capturedCount} de 12`;
      if (targetEl) targetEl.textContent = currentTargetLead || "Completo";
      if (progressFill) progressFill.style.width = `${Math.round((capturedCount / 12) * 100)}%`;

      if (badgeContainer) {
        badgeContainer.innerHTML = "";
        CANONICAL_LEADS.forEach(lead => {
          const info = capturedLeads.get(lead);
          const badge = document.createElement("span");
          const stateClass = info.status === "captured"
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
      verifiedFrameCount = 0;
      verifiedSince = 0;
      lastFrameAnalyzedAt = -Infinity;
      setHudPaperVerified(false);
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
      verifiedFrameCount = 0;
      verifiedSince = 0;
      lastFrameAnalyzedAt = -Infinity;
      hudHasVerifiedPaper = true; // force the first HUD transition
      setHudPaperVerified(false);
      if (typeof onStageChange === "function") onStageChange(1);

      if (rotateController) {
        rotateController.start();
      }

      updateHudProgress();
      setHudMessage("Aponte a câmera para uma folha de ECG inteira. Nenhum traçado será reconhecido sem confirmação da folha.", true);

      try {
        const constraints = {
          audio: false, // RIGOROSAMENTE SEM ÁUDIO
          video: {
            facingMode: { ideal: "environment" },
            width: { ideal: 3840 },
            height: { ideal: 2160 },
            aspectRatio: { ideal: 16 / 9 }
          }
        };

        if (typeof navigator !== "undefined" && navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
          stream = await navigator.mediaDevices.getUserMedia(constraints);
          cameraTrack = stream.getVideoTracks?.()[0] || null;
          const capabilities = cameraTrack?.getCapabilities?.() || {};
          const advanced = [];
          if (capabilities.focusMode?.includes?.("continuous")) advanced.push({ focusMode: "continuous" });
          if (capabilities.exposureMode?.includes?.("continuous")) advanced.push({ exposureMode: "continuous" });
          if (capabilities.whiteBalanceMode?.includes?.("continuous")) advanced.push({ whiteBalanceMode: "continuous" });
          if (advanced.length) {
            try { await cameraTrack.applyConstraints({ advanced }); }
            catch (_) { /* Capability reports are inconsistent across mobile browsers. */ }
          }
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
      cameraTrack = null;
      if (rotateController) {
        rotateController.stop();
      }
    }

    function scheduleLoop(timestamp) {
      if (!isCapturingActive) return;
      // Heavy frame analysis every animation frame caused lag/stale HUD on
      // mobile PWAs. ~5 FPS is sufficient for paper verification and stability.
      const now = Number.isFinite(timestamp) ? timestamp : Date.now();
      if (now - lastFrameAnalyzedAt >= 180) {
        lastFrameAnalyzedAt = now;
        processCurrentFrame();
      }
      animationFrameId = requestAnimationFrame(scheduleLoop);
    }

    function processCurrentFrame() {
      if (!videoEl || videoEl.readyState < 2 || !cvEngine || autoCaptureLock) return;

      const result = cvEngine.processFrame(videoEl, canvasEl, {
        userCalibration: sessionCalibration.confirmedByUser ? sessionCalibration : null
      });
      if (!result || !result.ok) return;

      const { quality, isStable, motionBlur, docDetection } = result;
      const hasEcgEvidence = isVerifiedEcgScene(docDetection);
      const captureReadyEvidence = isCaptureReadyScene(docDetection);
      if (captureReadyEvidence) {
        if (!verifiedFrameCount) verifiedSince = Date.now();
        verifiedFrameCount = Math.min(10, verifiedFrameCount + 1);
      } else {
        verifiedFrameCount = 0;
        verifiedSince = 0;
      }
      const sceneReady = captureReadyEvidence && verifiedFrameCount >= 4 &&
        Date.now() - verifiedSince >= 400;
      setHudPaperVerified(hasEcgEvidence);
      if (!docDetection?.sheet?.found) {
        currentSheetMap = null;
        setReticleStatus("searching");
        setHudMessage("Procure uma superfície clara: coloque a folha inteira do ECG no quadro.");
        return;
      }
      if (docDetection.sheet.isCutOff) {
        setHudMessage("Afaste o celular até aparecerem as quatro bordas da folha.");
        setReticleStatus("adjusting");
        return;
      }
      if (docDetection.sheet.hasSeverePerspective) {
        setHudMessage("Alinhe a câmera paralela ao papel para reduzir a perspectiva.");
        setReticleStatus("adjusting");
        return;
      }
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
      if (docDetection.orientation?.isRotated90 && !docDetection.detected) {
        setHudMessage("Possível rotação do ECG. Confira a orientação da foto; não é preciso girar o celular para continuar.");
        setReticleStatus("adjusting");
        return;
      }

      // 5. Se a folha foi detectada, mas há movimento
      if (motionBlur || !isStable) {
        setHudMessage("Mantenha parado.");
        setReticleStatus("stabilizing");
        return;
      }

      // 6. Se nitidez for insuficiente
      if (quality.sharpnessScore < 22) {
        setHudMessage("Aproxime um pouco e mantenha parado até as linhas ficarem nítidas.");
        setReticleStatus("adjusting");
        return;
      }

      if (!captureReadyEvidence) {
        currentSheetMap = null;
        setReticleStatus("searching");
        setHudMessage("Folha encontrada. Aproxime devagar até a grade e pelo menos dois traçados ficarem visíveis.");
        return;
      }

      if (!sceneReady) {
        setHudMessage("ECG encontrado. Mantenha o celular parado por um instante para a foto automática.");
        setReticleStatus("stabilizing");
        return;
      }

      currentSheetMap = docDetection;
      if (mode === "ultrasensitive" && currentTargetLead && currentSheetMap) {
        const currentCenter = { x: 0.5, y: 0.5 };
        cameraSpatialTracker.lastRoiCenter = currentCenter;
        const nav = cvEngine.computeNavigationGuidance(currentSheetMap, currentTargetLead, currentCenter, cameraSpatialTracker);
        if (nav && nav.direction !== "aligned" && nav.direction !== "centered") {
          setHudMessage(nav.instruction || nav.message);
          setReticleStatus("adjusting");
          return;
        }
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
      // A selected photograph can expose ambiguous, dense regions in the
      // review screen. Automatic scanner capture retains the strict reject.
      const allowDensePreview = options.source !== "autonomous_camera";
      let boundaries = cvEngine.detectECGBoundaries(fullImageData, {
        userCalibration: sessionCalibration.confirmedByUser ? sessionCalibration : options.userCalibration,
        paperAlreadyRectified: options.manualPaperCornersApplied === true,
        layoutHint: options.layoutHint,
        allowDensePreview,
        allowTopologyFallback: allowDensePreview
      });

      // The CV engine returns a plain {width,height,data} object, not a
      // browser ImageData instance. Passing that object to putImageData()
      // throws TypeError in real browsers (normal full-photo capture crash).
      // Do not attempt a 90° rotation using this older same-size warp: it
      // clips the ECG; instead report the orientation for user correction.
      const skew = Number(boundaries.orientation?.skewAngleDeg);
      if (!options.manualPaperCornersApplied && !boundaries.orientation?.isRotated90 &&
          Number.isFinite(skew) && Math.abs(skew) > 1.5) {
        const rectified = cvEngine.rectifyImagePerspective(
          fullImageData,
          boundaries.sheet?.corners || {
            topLeft: { x: 0, y: 0 },
            topRight: { x: fullImageData.width, y: 0 },
            bottomLeft: { x: 0, y: fullImageData.height },
            bottomRight: { x: fullImageData.width, y: fullImageData.height }
          },
          -skew
        );
        if (rectified && rectified.width > 80 && rectified.height > 80 &&
            rectified.data?.length === rectified.width * rectified.height * 4) {
          const corrected = ctx.createImageData(rectified.width, rectified.height);
          corrected.data.set(rectified.data);
          snapCanvas.width = rectified.width;
          snapCanvas.height = rectified.height;
          snapCanvas.getContext("2d").putImageData(corrected, 0, 0);
          fullImageData = corrected;
          boundaries = cvEngine.detectECGBoundaries(fullImageData, {
            userCalibration: sessionCalibration.confirmedByUser ? sessionCalibration : options.userCalibration,
            layoutHint: options.layoutHint,
            allowDensePreview,
            allowTopologyFallback: allowDensePreview
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
      // Never let autonomous live capture bypass the document/grid/lead gate.
      if (options.source === "autonomous_camera" && !isVerifiedEcgScene(boundaries)) {
        return { ok: false, capturedCount: 0,
          reason: "A folha e as derivações não foram confirmadas com segurança." };
      }

      const candidateMap = boundaries.candidateRegions || {};
      const crediblePaper = hasCredibleEcgCandidates(
        boundaries,
        options.manualPaperCornersApplied === true,
        options.source !== "autonomous_camera"
      );
      const leadsMap = crediblePaper
        ? candidateMap
        : (boundaries.detected ? (boundaries.leads || boundaries.detectedLayout?.leads) : null);

      // Reject non-ECG scenes; identity conflict alone does not discard pixels
      // when independently verified waveform and paper evidence exists.
      if (!leadsMap || !Object.keys(leadsMap).length) {
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

      let quarantinedCount = 0;
      Object.entries(leadsMap).forEach(([leadName, box]) => {
        if (!box) return;
        if (!capturedLeads.has(leadName)) capturedLeads.set(leadName, {
          lead: leadName, captured: false, status: "pending", displayLabel: box.displayLabel
        });
        const proposedIdentity = contracts.normalizeLeadIdentity(boundaries.leadIdentities?.[leadName] || {});
        let provisional = !isSafeAutomaticLeadAssignment(leadName, proposedIdentity, box, anomalies);
        if (!CANONICAL_LEADS.includes(leadName) ||
            boundaries.detectedLayout?.requiresLayoutConfirmation === true) provisional = true;
        if (provisional) quarantinedCount++;

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

        // A misaligned cell can include the NEXT lead label in its middle
        // (e.g. an "aVR" crop visually containing "III" and "aVF").
        // An independent scan in the right half makes such crops ineligible
        // for any automatic lead association.
        if (typeof cvEngine.recognizeLeadLabelInRegion === "function") {
          const other = cvEngine.recognizeLeadLabelInRegion(roiImageData, {
            xMin: 0.36, yMin: 0, xMax: 1, yMax: 1
          });
          if (other.recognized && other.recognizedLead !== leadName) {
            if (!provisional) quarantinedCount++;
            provisional = true;
          }
        }

        // Verifica o rótulo específico e anomalias (troca ou duplicidade)
        const regionAnomalies = anomalies.filter(a => a.lead === leadName || a.recognizedLead === leadName || a.expectedLead === leadName);
        const leadIdentity = provisional
          ? contracts.normalizeLeadIdentity({
              lead: leadName, expectedLead: leadName, recognizedLead: null,
              method: "topology_hypothesis", evidence: "positional_hypothesis",
              region: box, anomalies: regionAnomalies
            })
          : contracts.normalizeLeadIdentity({
              ...(boundaries.leadIdentities?.[leadName] || {}),
              lead: leadName,
              expectedLead: boundaries.leadIdentities?.[leadName]?.expectedLead || box.expectedInTemplate || leadName,
              region: boundaries.leadIdentities?.[leadName]?.region || box,
              anomalies: regionAnomalies
            });

        const extractionResult = extractor.extractRealSignalFromImageData(roiImageData, {
          leadIdentity,
          regionBounds: { x: roiX, y: roiY, width: roiW, height: roiH },
          calibration: sessionCalibration,
          allowOverlappingPreview: true,
          allowDensePreview,
          maskPrintedHeader: true,
          provenance: {
            source: options.source || "smart_camera",
            layoutId: boundaries.layoutId,
            captureMode: mode,
            timestamp: new Date().toISOString()
          }
        });

        const leadInfo = capturedLeads.get(leadName);
        if (!leadInfo) return;

        // A dense preview is never a named, automatic clinical lead. It is
        // intentionally kept as a candidate even if OCR happened to match.
        if (extractionResult.denseInkPreview === true) {
          if (!provisional) quarantinedCount++;
          provisional = true;
        }

        // Só substitui se ainda não estava capturada ou se a nova extração tem melhor índice técnico
        const prevIndex = leadInfo.audit?.technicalIndex || 0;
        const newIndex = extractionResult.audit?.technicalIndex || 0;

        if (extractionResult.isValid && extractionResult.signal && (!leadInfo.captured || newIndex >= prevIndex)) {
          leadInfo.captured = true;
          leadInfo.status = provisional ? "provisional" : "captured";
          leadInfo.candidateRegion = { row: box.row, col: box.col, observedLabel: box.observedLabel || null };
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
          leadInfo.candidateRegion = { row: box.row, col: box.col, observedLabel: box.observedLabel || null };
          leadInfo.leadIdentity = leadIdentity;
          leadInfo.imageCropUrl = typeof cropCanvas.toDataURL === "function"
            ? cropCanvas.toDataURL("image/jpeg", 0.92)
            : null;
          leadInfo.cropWidth = roiW;
          leadInfo.cropHeight = roiH;
          leadInfo.regionBounds = { x: roiX, y: roiY, width: roiW, height: roiH };
          leadInfo.extractedSignal = null;
          leadInfo.extraction = extractionResult;
          leadInfo.audit = extractionResult.audit;
          leadInfo.calibration = extractionResult.calibration;
          leadInfo.confidence = extractionResult.confidence;
        }
      });

      pendingLeadQueue = CANONICAL_LEADS.filter(l => capturedLeads.get(l)?.status !== "captured");
      currentTargetLead = pendingLeadQueue[0] || null;
      updateHudProgress();
      const confirmedCount = CANONICAL_LEADS.filter(l => capturedLeads.get(l)?.status === "captured").length;
      const provisionalCount = Array.from(capturedLeads.values()).filter(l => l.status === "provisional").length;
      return {
        ok: newlyCapturedCount > 0 || provisionalCount > 0,
        capturedCount: newlyCapturedCount,
        newlyCapturedLeads,
        totalCaptured: confirmedCount,
        provisionalCount,
        quarantinedCount,
        reason: newlyCapturedCount === 0 && provisionalCount === 0
          ? "O ECG foi analisado, mas nenhum traçado pôde ser reconstruído. Confira a nitidez, a grade e o enquadramento."
          : null,
        boundaries
      };
    }

    /**
     * Captura autônoma durante o loop de vídeo da Etapa 1.
     */
    function performAutonomousCapture(isGlobalCapture, frameAnalysis = null, manual = false) {
      if (autoCaptureLock || (!manual && (!isCaptureReadyScene(frameAnalysis?.docDetection) ||
          verifiedFrameCount < 4 || Date.now() - verifiedSince < 400))) return;
      autoCaptureLock = true;

      const snapCanvas = document.createElement("canvas");
      // The live analyzer intentionally uses a 1280 px working preview, but
      // extraction must use the native video frame. Otherwise each cell in a
      // 12-lead sheet receives too few pixels to preserve P/ST/T morphology.
      snapCanvas.width = videoEl?.videoWidth || canvasEl.width || 640;
      snapCanvas.height = videoEl?.videoHeight || canvasEl.height || 360;
      const snapCtx = snapCanvas.getContext("2d");
      snapCtx.drawImage(videoEl?.videoWidth ? videoEl : canvasEl, 0, 0, snapCanvas.width, snapCanvas.height);

      triggerVisualFlash();

      const extractor = global.LuriaEcgSignalExtractor;

      // 1. Tentativa de captura múltipla (tanto no modo Rápido quanto no Ultrassensível se várias derivações estiverem visíveis!)
      const multiResult = processPhotographCanvas(snapCanvas, {
        source: manual ? "manual_camera" : "autonomous_camera"
      });

      if (multiResult.ok && multiResult.capturedCount > 0) {
        if (isGlobalCapture && multiResult.provisionalCount > 0) {
          setHudMessage("Traçados candidatos encontrados. Abrindo conferência sem atribuir nomes incertos.", true);
          setTimeout(() => { stopCamera(); transitionToStage2(); }, 800);
          return;
        }
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

    function captureCurrentFrame() {
      if (!isCapturingActive || !videoEl?.videoWidth || autoCaptureLock) {
        setHudMessage("A câmera ainda não está pronta. Aguarde a imagem aparecer.", true);
        return false;
      }
      setHudMessage("Fotografando em resolução máxima e extraindo os traçados…", true);
      performAutonomousCapture(mode === "fast", null, true);
      return true;
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

    /**
     * Confirma, uma a uma, a identidade de uma região já extraída da folha.
     * A confirmação não altera os pixels nem transforma qualidade ruim em boa.
     */
    function confirmCandidateLead(leadName) {
      if (!CANONICAL_LEADS.includes(leadName)) return { confirmed: false, reason: "Derivação inválida." };
      const leadInfo = capturedLeads.get(leadName);
      if (!leadInfo?.captured || leadInfo.status !== "provisional") {
        return { confirmed: false, reason: "Não há um traçado candidato pendente para esta derivação." };
      }
      const candidate = leadInfo.candidateRegion;
      if (!candidate || currentSheetMap?.candidateRegions?.[leadName]?.expectedInTemplate !== leadName) {
        return { confirmed: false, reason: "A posição desta região não corresponde ao layout exibido." };
      }
      const identity = contracts.normalizeLeadIdentity({
        ...(leadInfo.leadIdentity || {}),
        lead: leadName,
        expectedLead: leadName,
        recognizedLead: leadInfo.leadIdentity?.recognizedLead || null,
        method: "user_confirmed",
        confirmedByUser: true,
        humanConfirmedLead: leadName,
        region: leadInfo.leadIdentity?.region || currentSheetMap.candidateRegions[leadName]
      });
      leadInfo.leadIdentity = identity;
      leadInfo.status = "captured";
      if (leadInfo.extraction) {
        leadInfo.extraction.leadIdentity = identity;
        if (global.LuriaEcgSignalExtractor?.auditExtractedLead) {
          leadInfo.audit = global.LuriaEcgSignalExtractor.auditExtractedLead(leadInfo.extraction);
          leadInfo.extraction.audit = leadInfo.audit;
        }
      }
      pendingLeadQueue = CANONICAL_LEADS.filter(lead => capturedLeads.get(lead)?.status !== "captured");
      updateHudProgress();
      global.LuriaEcgSessionData = getSessionStructuredPackage();
      return { confirmed: true, lead: leadName };
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
        .filter(l => l.captured && l.status === "captured" && l.extraction)
        .map(l => ({ lead: l.lead, audit: l.audit, extraction: l.extraction }));

      const globalAudit = (extractor && extractor.auditFullExtraction)
        ? extractor.auditFullExtraction(extractionObjects)
        : null;

      const signalsByLead = {};
      const validMasksByLead = {};
      const durationsByLead = {};
      const limitations = [];

      leadsArray.forEach(l => {
        if (l.captured && l.status === "captured" && l.extraction) {
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
        documentLayout: currentSheetMap?.detectedLayout || null,
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
      if (currentSheetMap?.detectedLayout?.documentType &&
          currentSheetMap.detectedLayout.documentType !== "full_ecg_candidate") {
        return {allowed: false, reason: "Esta imagem contém uma tira ou um ECG parcial. A extração está disponível para conferência; o modelo de 12 derivações exige um exame completo."};
      }
      const missing = CANONICAL_LEADS.filter(l => !capturedLeads.get(l)?.captured);
      if (missing.length > 0) {
        return {
          allowed: false,
          reason: `Não é permitido prosseguir enquanto faltarem derivações essenciais (${missing.join(", ")}).`
        };
      }

      const invalidLeads = CANONICAL_LEADS.filter(l => {
        const item = capturedLeads.get(l);
        const identityStatus = item?.leadIdentity?.status;
        return item?.audit?.status !== "Adequada tecnicamente" ||
          (identityStatus !== "ocr_confirmed" && identityStatus !== "manual_confirmed") ||
          !Array.isArray(item?.extraction?.validMask) ||
          item.extraction.validMask.length !== item.extraction.signal?.length;
      });

      if (invalidLeads.length > 0) {
        return {
          allowed: false,
          reason: `As derivações (${invalidLeads.join(", ")}) não têm identidade confirmada, máscara e auditoria técnica suficientes. Revise ou recapture antes de prosseguir.`
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
      captureCurrentFrame,
      openReview: transitionToStage2,
      confirmUncertainLeadCapture,
      rejectUncertainLeadCapture,
      confirmCandidateLead,
      setUserCalibration,
      getSessionCalibration: () => ({ ...sessionCalibration }),
      getSessionStructuredPackage,
      confirmExtractionAndEnableAI,
      getCapturedLeads: () => Array.from(capturedLeads.values()),
      getCurrentStage: () => currentStage,
      getCurrentMode: () => mode,
      setMode: m => { mode = m; },
      updateHudProgress
    };
  }

  global.LuriaEcgSceneGuard = { isVerifiedEcgScene, isCaptureReadyScene, hasCredibleEcgCandidates, isSafeAutomaticLeadAssignment };

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


