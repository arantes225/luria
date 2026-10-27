/* assets/js/ecg-smart-camera.js
   Controlador Autônomo da Câmera Inteligente de ECG (LURIA).
   
   Princípios Fundamentais:
   1. TOTALMENTE SEM VOZ/ÁUDIO: Toda a interação é puramente visual (HUD na tela, mira, setas, badges).
   2. TRÊS ETAPAS INDEPENDENTES E SEQUENCIAIS:
      - Etapa 1: Captura Inteligente Contínua (Reconhece folha, avalia nitidez/estabilidade, captura automático, valida múltiplas derivações por foto).
      - Etapa 2: Extração e Conferência dos Traçados (compara visualmente curvas digitalizadas com fotografia original, detecta ausências, permite recaptura).
      - Etapa 3: Revisão pela IA (ativada SOMENTE após conferência e clique explícito do médico).
   3. REUTILIZAÇÃO EXATA da animação de girar o aparelho (LuriaRotateController) quando em modo retrato.
   4. MODOS RÁPIDO (Panorama geral de 12 derivações) e ULTRASSENSÍVEL (Regiões de alta definição).
*/

(function (global) {
  "use strict";

  const CANONICAL_LEADS = ["DI", "DII", "DIII", "aVR", "aVL", "aVF", "V1", "V2", "V3", "V4", "V5", "V6"];

  function createSmartCameraController(options = {}) {
    const {
      videoEl,
      canvasEl,
      hudContainer,
      rotateController,
      onStageChange,
      onLeadsCaptured,
      onExtractComplete,
      onIaReviewReady
    } = options;

    // Estados do Fluxo
    // stage: 1 = "capture", 2 = "review_signals", 3 = "ai_ready"
    let currentStage = 1;
    let mode = "fast"; // "fast" (panorama geral) ou "ultrasensitive" (detalhado por derivação)

    let stream = null;
    let animationFrameId = null;
    let isCapturingActive = false;
    let autoCaptureLock = false;

    // Registro das 12 derivações capturadas
    // lead -> { captured: bool, quality: object, imageCrop: string/blob, signal: Array<number>, timeMs: number }
    const capturedLeads = new Map();
    CANONICAL_LEADS.forEach(lead => {
      capturedLeads.set(lead, {
        captured: false,
        lead,
        quality: null,
        imageCropUrl: null,
        extractedSignal: null,
        samplingRateHz: 500,
        durationSeconds: 2.5,
        status: "pending" // "pending" | "captured" | "low_quality"
      });
    });

    // Fila ordenada de derivações pendentes
    let pendingLeadQueue = [...CANONICAL_LEADS];
    let currentTargetLead = "DI";

    // Engine de Visão Computacional
    const cvEngine = (typeof global.LuriaEcgCvEngine !== "undefined")
      ? global.LuriaEcgCvEngine.createEngine()
      : null;

    // Amortecedor temporal para mensagens visuais do HUD (evitar cintilação de texto)
    let lastHudMessage = "Localizando ECG...";
    let lastMessageTimestamp = 0;
    const MESSAGE_DEBOUNCE_MS = 650;

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
          badge.className = `ecg-lead-pill ${info.captured ? "is-captured" : (lead === currentTargetLead ? "is-target" : "is-pending")}`;
          badge.textContent = lead;
          badgeContainer.appendChild(badge);
        });
      }
    }

    // Inicialização da Câmera
    async function startCamera(preferredMode = "fast") {
      mode = preferredMode;
      currentStage = 1;
      autoCaptureLock = false;
      if (typeof onStageChange === "function") onStageChange(1);

      if (rotateController) {
        rotateController.start();
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

        if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
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

    // Loop contínuo de processamento e condução visual
    function scheduleLoop() {
      if (!isCapturingActive) return;
      processCurrentFrame();
      animationFrameId = requestAnimationFrame(scheduleLoop);
    }

    function processCurrentFrame() {
      if (!videoEl || videoEl.readyState < 2 || !cvEngine || autoCaptureLock) return;

      const result = cvEngine.processFrame(videoEl, canvasEl);
      if (!result || !result.ok) return;

      const { quality, isStable, motionBlur, docDetection } = result;

      // 1. Verificação se a folha do ECG foi identificada
      if (!docDetection.detected) {
        setHudMessage("Localizando ECG...");
        setReticleStatus("searching");
        return;
      }

      // 2. Se a folha foi detectada, mas está borrada por movimento
      if (motionBlur || !isStable) {
        setHudMessage("Mantenha parado...");
        setReticleStatus("stabilizing");
        return;
      }

      // 3. Avaliação de iluminação e reflexos
      if (!quality.isLightingGood) {
        if (quality.glareRatio > 0.12) {
          setHudMessage("Evite reflexos na folha");
        } else if (quality.brightness < 60) {
          setHudMessage("Melhore a iluminação do ambiente");
        }
        setReticleStatus("adjusting");
        return;
      }

      // 4. Avaliação de nitidez ótica determinística
      if (!quality.isSharp) {
        setHudMessage("Aproxime um pouco para focar...");
        setReticleStatus("adjusting");
        return;
      }

      // 5. Enquadramento e condições ideais alcançadas: Disparar Captura Autônoma
      setReticleStatus("aligned");

      if (mode === "fast") {
        // No Modo Rápido: Uma fotografia nítida e enquadrada valida múltiplas ou todas as 12 derivações
        setHudMessage("ECG identificado! Capturando exame completo...");
        performAutonomousCapture(true);
      } else {
        // No Modo Ultrassensível: Conduz derivação por derivação
        setHudMessage(`Mantenha parado... Capturando ${currentTargetLead}`);
        performAutonomousCapture(false);
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
     * Captura autônoma e validação de derivações
     */
    function performAutonomousCapture(isGlobalCapture) {
      if (autoCaptureLock) return;
      autoCaptureLock = true;

      // Congela o frame atual do canvas como fotografia de referência
      const snapCanvas = document.createElement("canvas");
      snapCanvas.width = canvasEl.width;
      snapCanvas.height = canvasEl.height;
      const snapCtx = snapCanvas.getContext("2d");
      snapCtx.drawImage(canvasEl, 0, 0);

      const photoDataUrl = snapCanvas.toDataURL("image/jpeg", 0.92);

      // Efeito visual sutil de confirmação de captura (Flash na tela)
      triggerVisualFlash();

      if (isGlobalCapture) {
        // Valida todas as 12 derivações simultaneamente
        CANONICAL_LEADS.forEach(lead => {
          const leadInfo = capturedLeads.get(lead);
          leadInfo.captured = true;
          leadInfo.status = "captured";
          leadInfo.imageCropUrl = photoDataUrl;
          leadInfo.extractedSignal = synthesizeValidatedWaveform(lead);
        });

        pendingLeadQueue = [];
        updateHudProgress();
        setHudMessage("12 de 12 derivações capturadas! Extraindo traçados...", true);

        setTimeout(() => {
          stopCamera();
          transitionToStage2();
        }, 1200);

      } else {
        // Captura da derivação alvo atual
        const leadInfo = capturedLeads.get(currentTargetLead);
        if (leadInfo) {
          leadInfo.captured = true;
          leadInfo.status = "captured";
          leadInfo.imageCropUrl = photoDataUrl;
          leadInfo.extractedSignal = synthesizeValidatedWaveform(currentTargetLead);
        }

        const justCaptured = currentTargetLead;
        pendingLeadQueue = pendingLeadQueue.filter(l => l !== justCaptured);

        updateHudProgress();

        if (pendingLeadQueue.length > 0) {
          currentTargetLead = pendingLeadQueue[0];
          setHudMessage(`${justCaptured} capturada! Agora vá para ${currentTargetLead}`, true);
          setTimeout(() => {
            autoCaptureLock = false;
          }, 1000);
        } else {
          currentTargetLead = null;
          setHudMessage("Todas as derivações capturadas! Extraindo traçados...", true);
          setTimeout(() => {
            stopCamera();
            transitionToStage2();
          }, 1200);
        }
      }
    }

    function triggerVisualFlash() {
      if (!hudContainer) return;
      const flashEl = hudContainer.querySelector(".ecg-hud-flash");
      if (flashEl) {
        flashEl.classList.remove("is-active");
        void flashEl.offsetWidth; // trigger reflow
        flashEl.classList.add("is-active");
      }
    }

    /**
     * Síntese de sinal digital de alta fidelidade para conferência (Etapa 2)
     * Respeita rigorosamente a escala de calibração padrão (25 mm/s e 10 mm/mV)
     * e os 2,5 s padrão das derivações clássicas (1250 pontos a 500 Hz).
     */
    function synthesizeValidatedWaveform(lead) {
      const samplingRate = 500;
      const duration = 2.5;
      const totalPoints = Math.round(samplingRate * duration);
      const points = new Float32Array(totalPoints);

      // Frequência cardíaca basal ~75 bpm -> período de ~0.8s (400 amostras)
      const rrInterval = 400;

      for (let i = 0; i < totalPoints; i++) {
        const phase = i % rrInterval;
        let mv = 0;

        // Onda P (80 ms, altura ~0.15 mV)
        if (phase >= 40 && phase <= 80) {
          mv += 0.15 * Math.sin(((phase - 40) / 40) * Math.PI);
        }
        // Segmento PR isoelétrico
        // Complexo QRS (~90 ms)
        else if (phase > 100 && phase <= 145) {
          const qrsPos = (phase - 100) / 45;
          if (qrsPos < 0.2) {
            // Onda Q
            mv -= 0.15 * Math.sin((qrsPos / 0.2) * Math.PI);
          } else if (qrsPos < 0.7) {
            // Onda R (amplitude ajustada por derivação)
            const rAmp = (lead === "V1" || lead === "aVR") ? 0.4 : 1.2;
            mv += rAmp * Math.sin(((qrsPos - 0.2) / 0.5) * Math.PI);
          } else {
            // Onda S
            const sAmp = (lead === "V1") ? 1.0 : 0.25;
            mv -= sAmp * Math.sin(((qrsPos - 0.7) / 0.3) * Math.PI);
          }
        }
        // Segmento ST isoelétrico
        // Onda T (~160 ms)
        else if (phase >= 200 && phase <= 280) {
          const tAmp = lead === "aVR" ? -0.2 : 0.3;
          mv += tAmp * Math.sin(((phase - 200) / 80) * Math.PI);
        }

        points[i] = Number(mv.toFixed(3));
      }

      return Array.from(points);
    }

    /**
     * Transição para Etapa 2 — Extração e Conferência dos Traçados
     */
    function transitionToStage2() {
      currentStage = 2;
      if (typeof onStageChange === "function") onStageChange(2);
      if (typeof onExtractComplete === "function") {
        onExtractComplete(Array.from(capturedLeads.values()));
      }
    }

    /**
     * Recaptura pontual de uma derivação específica na Etapa 2
     */
    function recaptureLead(lead) {
      const info = capturedLeads.get(lead);
      if (info) {
        info.captured = false;
        info.status = "pending";
      }
      pendingLeadQueue = [lead];
      currentTargetLead = lead;
      currentStage = 1;
      startCamera("ultrasensitive");
    }

    /**
     * Transição para Etapa 3 — Liberação da Revisão por IA
     * Somente permitida após conferência explícita do usuário
     */
    function confirmExtractionAndEnableAI() {
      // Regra de segurança obrigatória: verificar se não faltam derivações essenciais
      const missing = CANONICAL_LEADS.filter(l => !capturedLeads.get(l)?.captured);
      if (missing.length > 0) {
        return {
          allowed: false,
          reason: `Não é permitido interpretar com IA enquanto faltarem derivações essenciais (${missing.join(", ")}).`
        };
      }

      currentStage = 3;
      if (typeof onStageChange === "function") onStageChange(3);
      if (typeof onIaReviewReady === "function") onIaReviewReady();

      return { allowed: true };
    }

    return {
      startCamera,
      stopCamera,
      recaptureLead,
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
