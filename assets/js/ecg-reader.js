/* assets/js/ecg-reader.js
   Orquestrador da Etapa 3 — Integração Estruturada e Interpretação por IA.

   Princípios de Segurança e Integridade:
   1. Consome os dados verdadeiramente estruturados da Etapa 2 (window.TraubeEcgSessionData):
      - leads, signals, validMask, calibration, samplingRateHz, recoveredDurationSeconds, audit, limitations.
   2. Validação Rigorosa de Pré-requisitos para o Modelo Autoral:
      - O modelo autoral deep-learning para ECG de 12 derivações exige sinal digital contínuo de 10 segundos
        a 100/500 Hz (padrão WFDB/PTB-XL).
      - Recortes tradicionais de papel 3x4 fornecem apenas 2,5 segundos por derivação (exceto a tira longa).
      - NUNCA repetir ou preencher artificialmente 2,5 s para simular 10 s!
      - Caso o sinal não atinja os requisitos de duração/formato do modelo autoral, a submissão ao classificador
        autoral DEVE ser bloqueada de forma explícita e transparente.
   3. NUNCA substituir silenciosamente o modelo autoral por IA multimodal genérica (Gemini) sem consentimento:
      - O assistente visual multimodal é mantido apenas como rota visual experimental separada e identificada.
*/

(() => {
  "use strict";

  const client = window.supabaseClient;
  const btnAnalyze = document.getElementById("ecg-analyze");
  const btnVisualAssist = document.getElementById("ecg-analyze-visual-assist");
  const statusEl = document.getElementById("ecg-status");
  const resultCard = document.getElementById("ecg-result-card");
  const resultEl = document.getElementById("ecg-result");
  const compatAlert = document.getElementById("ecg-stage3-compatibility-alert");
  const summaryPre = document.getElementById("ecg-stage3-package-summary");

  const setStatus = (message, kind = "") => {
    if (statusEl) {
      statusEl.textContent = message;
      statusEl.className = "ecg-status" + (kind ? " " + kind : "");
    }
  };

  /**
   * Avalia a compatibilidade estrita do pacote de sinais digitalizados da Etapa 2
   * com os requisitos do modelo autoral de classificação de ECG.
   */
  function evaluateAuthorialModelCompatibility(sessionPackage) {
    if (!sessionPackage || !sessionPackage.leads) {
      return {
        compatible: false,
        reasons: ["Nenhum dado estruturado de extração foi fornecido pela Etapa 2."],
        details: null
      };
    }

    const reasons = [];
    const leads = sessionPackage.leads;
    const cal = sessionPackage.calibration;

    // 1. Verificação de todas as 12 derivações canônicas
    const canonical = ["DI", "DII", "DIII", "aVR", "aVL", "aVF", "V1", "V2", "V3", "V4", "V5", "V6"];
    const missingLeads = canonical.filter(l => !sessionPackage.signals?.[l]);
    if (missingLeads.length > 0) {
      reasons.push(`Derivações faltantes no traçado digital: ${missingLeads.join(", ")}.`);
    }

    // 2. Verificação de calibração
    if (!cal || (cal.calibrationSource !== "measured" && !cal.confirmedByUser)) {
      reasons.push("A calibração do exame não foi confirmada pelo usuário nem medida da grade.");
    }

    // 3. Verificação de auditoria técnica das derivações
    const invalidLeads = leads.filter(l => l.audit?.status === "Inválida" || l.audit?.status === "Indeterminada");
    if (invalidLeads.length > 0) {
      reasons.push(`Derivações com auditoria técnica insatisfatória: ${invalidLeads.map(l => l.lead).join(", ")}.`);
    }
    for (const lead of canonical) {
      const entry = leads.find(l => l.lead === lead);
      const signal = sessionPackage.signals?.[lead];
      const mask = sessionPackage.validMasks?.[lead];
      if (entry?.leadIdentity?.status !== "ocr_confirmed" || entry?.audit?.status !== "Adequada tecnicamente") {
        reasons.push(`${lead}: identificação OCR ou auditoria insuficiente para inferência.`);
      }
      if (!Array.isArray(signal) || !Array.isArray(mask) || mask.length !== signal.length || mask.some(v => v !== 1) || signal.some(v => !Number.isFinite(v))) {
        reasons.push(`${lead}: sinal contínuo e máscara integral não comprovados.`);
      }
    }
    if (![100, 500].includes(sessionPackage.samplingRateHz)) {
      reasons.push("Taxa digital comum de 100 ou 500 Hz não comprovada após reamostragem explícita.");
    }

    // 4. Verificação de DURAÇÃO CONTÍNUA necessária pelo modelo autoral (10.0 s padrão PTB-XL)
    // No formato 3x4, cada derivação tem tipicamente ~2.5 segundos.
    const durationKeys = Object.keys(sessionPackage.durationsSeconds || {});
    if (durationKeys.length === 0) {
      reasons.push("Nenhuma duração temporal pôde ser verificada para as derivações no pacote estruturado.");
    }

    let minDuration = Infinity;
    durationKeys.forEach(k => {
      const dur = sessionPackage.durationsSeconds[k];
      if (typeof dur === "number" && !isNaN(dur)) {
        if (dur < minDuration) minDuration = dur;
      } else {
        reasons.push(`Duração indeterminada ou inválida para a derivação ${k}.`);
      }
    });

    if (!Number.isFinite(minDuration)) {
      minDuration = 0;
    }

    const is10sComplete = minDuration >= 9.8;
    if (!is10sComplete) {
      reasons.push(
        `O classificador autoral de ECG requer 10,0 segundos contínuos para as 12 derivações (requisito WFDB/PTB-XL). ` +
        `O traçado recuperado possui ${minDuration > 0 ? minDuration.toFixed(1) : "0.0"} segundos por derivação (formato de folha 3×4). ` +
        `A duplicação ou preenchimento artificial de 2,5 s para 10 s é expressamente proibida pelas diretrizes de fidelidade técnica.`
      );
    }

    // Verifica disponibilidade do backend autoral
    reasons.push(
      "A Edge Function 'ecg-signal-classifier' (classificador autoral deep-learning de sinais brutos 12x10s) " +
      "não foi verificada como disponível e autorizada neste ambiente. A inferência autoral de sinais permanece bloqueada."
    );

    return {
      compatible: false, // Bloqueio categórico
      reasons,
      minDuration,
      is10sComplete,
      calSource: cal?.calibrationSource
    };
  }

  /**
   * Inicializa o painel da Etapa 3 com o pacote de dados recebido da Etapa 2
   */
  function initStage3Package(sessionPackage) {
    if (!sessionPackage) {
      sessionPackage = window.TraubeEcgSessionData || null;
    }

    if (!sessionPackage) {
      if (summaryPre) summaryPre.textContent = "Aguardando envio do pacote estruturado pela Etapa 2...";
      if (btnAnalyze) btnAnalyze.disabled = true;
      return;
    }

    const { compatible, reasons, minDuration } = evaluateAuthorialModelCompatibility(sessionPackage);

    if (summaryPre) {
      const capturedCount = Object.keys(sessionPackage.signals || {}).length;
      summaryPre.textContent =
        `PACOTE DE SINAIS ESTRUTURADOS (ETAPA 2):\n` +
        `• Derivações digitalizadas: ${capturedCount} de 12\n` +
        `• Duração média por derivação: ${minDuration ? minDuration.toFixed(2) : "2.50"} segundos\n` +
        `• Calibração: ${sessionPackage.calibration?.paperSpeedMmPerSec || 25} mm/s · ${sessionPackage.calibration?.gainMmPerMv || 10} mm/mV (${sessionPackage.calibration?.calibrationSource})\n` +
        `• Auditoria Técnica: ${sessionPackage.globalAudit?.overallStatus || "Concluída"} (Média: ${sessionPackage.globalAudit?.meanTechnicalIndex || "--"}/100)\n` +
        `• Compatibilidade com Modelo Autoral de 10s: ${compatible ? "COMPATÍVEL" : "NÃO COMPATÍVEL (REQUISITO DE 10S NÃO ATINGIDO)"}`;
    }

    if (!compatible) {
      if (btnAnalyze) {
        btnAnalyze.disabled = true;
        btnAnalyze.title = reasons.join(" ");
      }
      if (compatAlert) {
        compatAlert.hidden = false;
        compatAlert.innerHTML =
          `<strong>Classificador Autoral Bloqueado por Requisito Técnico:</strong><br>` +
          reasons.map(r => `• ${r}`).join("<br>") +
          `<br><small style="margin-top:4px;display:block">Para laudar clinicamente o ECG, utilize o <strong>Gerador de Laudo Estruturado</strong> da TRAUBE ou revise as derivações no painel de visualização.</small>`;
      }
      setStatus("Interpretação pelo modelo autoral bloqueada: requisitos de duração e calibração não atendidos.", "error");
    } else {
      if (btnAnalyze) {
        btnAnalyze.disabled = false;
        btnAnalyze.title = "";
      }
      if (compatAlert) compatAlert.hidden = true;
      setStatus("Sinais validados e compatíveis com o classificador autoral.", "ok");
    }
  }

  // Submissão ao classificador autoral (quando 100% compatível com sinais de 10s)
  btnAnalyze?.addEventListener("click", async () => {
    const pkg = window.TraubeEcgSessionData;
    const { compatible, reasons } = evaluateAuthorialModelCompatibility(pkg);

    if (!compatible) {
      setStatus(`Submissão bloqueada: ${reasons[0]}`, "error");
      return;
    }

    btnAnalyze.disabled = true;
    setStatus("Processando sinais digitais no modelo autoral TRAUBE...", "");

    try {
      const response = await client.functions.invoke("ecg-signal-classifier", {
        body: {
          signals: pkg.signals,
          validMasks: pkg.validMasks,
          samplingRateHz: pkg.samplingRateHz,
          calibration: pkg.calibration
        }
      });

      if (response.error || !response.data?.ok) {
        throw new Error(response.data?.error || "Serviço do classificador autoral temporariamente indisponível.");
      }

      renderAnalysisResult(response.data.result, "Classificador Autoral TRAUBE (Sinais Digitais)");
      setStatus("Classificação por sinais concluída com sucesso.", "ok");
    } catch (err) {
      setStatus(`Erro no classificador autoral: ${err.message}`, "error");
    } finally {
      btnAnalyze.disabled = false;
    }
  });

  // Assistente visual experimental (via imagem capturada, sem substituir falsamente o modelo autoral)
  btnVisualAssist?.addEventListener("click", async () => {
    const input = document.getElementById("ecg-image");
    const file = input?.files?.[0];

    btnVisualAssist.disabled = true;
    setStatus("Executando revisão visual auxiliar (modelo multimodal)...", "");

    try {
      let imageDataBase64 = null;
      let mimeType = "image/jpeg";

      if (file) {
        imageDataBase64 = await new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = () => resolve(String(reader.result || "").split(",")[1] || "");
          reader.onerror = reject;
          reader.readAsDataURL(file);
        });
        mimeType = file.type;
      } else {
        const canvas = document.getElementById("ecg-canvas-cv");
        if (canvas && canvas.width > 0) {
          const dataUrl = canvas.toDataURL("image/jpeg", 0.9);
          imageDataBase64 = dataUrl.split(",")[1];
        }
      }

      if (!imageDataBase64) {
        throw new Error("Nenhuma imagem do ECG disponível para revisão visual.");
      }

      const response = await client.functions.invoke("ecg-ai-reader", {
        body: { image: { mimeType, data: imageDataBase64 } }
      });

      if (response.error || !response.data?.ok) {
        throw new Error(response.data?.error || "Falha na análise visual.");
      }

      renderAnalysisResult(response.data.result, "Assistente Visual Multimodal (Revisão da Fotografia)");
      setStatus("Revisão visual concluída. Atenção: Correlacione com o traçado e a clínica.", "ok");
    } catch (err) {
      setStatus(err.message || "Não foi possível executar a revisão visual.", "error");
    } finally {
      btnVisualAssist.disabled = false;
    }
  });

  function renderAnalysisResult(val, sourceTitle) {
    if (!resultEl || !resultCard) return;
    const value = val || {};
    resultEl.innerHTML = "";

    const header = document.createElement("p");
    header.style.fontSize = "12px";
    header.style.color = "var(--muted)";
    header.innerHTML = `<strong>Fonte:</strong> ${sourceTitle} · <strong>Qualidade:</strong> ${value.quality || "adequada"}`;
    resultEl.appendChild(header);

    const list = document.createElement("ul");
    list.style.margin = "8px 0";
    list.style.paddingLeft = "20px";
    (value.findings || []).forEach(item => {
      const li = document.createElement("li");
      li.textContent = `${item.name || "Achado"} — confiança ${item.confidence || "não determinada"}${item.evidence ? ": " + item.evidence : ""}`;
      list.appendChild(li);
    });
    resultEl.appendChild(list);

    if (value.synthesis) {
      const syn = document.createElement("p");
      syn.innerHTML = `<strong>Síntese diagnóstica sugerida:</strong> ${value.synthesis}`;
      resultEl.appendChild(syn);
    }

    if (value.urgent_attention) {
      const urgent = document.createElement("div");
      urgent.className = "ecg-alert";
      urgent.style.marginTop = "8px";
      urgent.innerHTML = `<strong>Alerta Clínico Imediato:</strong> ${value.urgent_attention}`;
      resultEl.appendChild(urgent);
    }

    resultCard.hidden = false;
  }

  window.TraubeEcgReaderInit = initStage3Package;

  // Se já houver sessão carregada ao abrir o script
  if (window.TraubeEcgSessionData) {
    initStage3Package(window.TraubeEcgSessionData);
  }
})();


