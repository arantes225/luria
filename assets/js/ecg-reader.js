(() => {
  "use strict";
  const client = window.supabaseClient;
  const input = document.getElementById("ecg-image");
  const analyze = document.getElementById("ecg-analyze");
  const preview = document.getElementById("ecg-image-preview");
  const fileName = document.getElementById("ecg-file-name");
  const status = document.getElementById("ecg-status");
  const resultCard = document.getElementById("ecg-result-card");
  const result = document.getElementById("ecg-result");
  if (!input || !analyze || !preview || !fileName || !status || !resultCard || !result) return;

  const labCard = input.closest(".ecg-card");
  if (!labCard) return;
  const leads = ["DI", "DII", "DIII", "aVR", "aVL", "aVF", "V1", "V2", "V3", "V4", "V5", "V6"];
  const saved = new Map();
  let mode = "quick";
  let leadIndex = 0;
  let quick = null;
  let previewUrl = null;
  let generation = 0;
  let busy = false;

  const ui = document.createElement("div");
  ui.innerHTML = `
    <div class="ecg-capture-modes" role="group" aria-label="Tipo de captura">
      <button type="button" class="ecg-mode" data-mode="quick" aria-pressed="true">Foto completa · Rápido</button>
      <button type="button" class="ecg-mode" data-mode="detailed" aria-pressed="false">12 derivações · Ultra sensível</button>
    </div>
    <div class="ecg-capture-hint" id="ecg-capture-hint">Enquadre toda a folha, sem cortar cabeçalho, calibração ou derivações. Captura para pesquisa e testes, não uso clínico.</div>
    <div id="ecg-lead-panel" class="ecg-lead-panel" hidden>
      <p id="ecg-lead-progress">0 de 12 derivações capturadas.</p>
      <div class="ecg-lead-grid" id="ecg-lead-grid" role="group" aria-label="Derivações do ECG"></div>
      <p class="ecg-quality-sub">Escolha a derivação destacada e fotografe o traçado com a identificação visível. O aplicativo não verifica automaticamente se o nome corresponde à imagem. As 12 fotos ficam somente nesta sessão, sem envio.</p>
    </div>
    <div id="ecg-quality-box" class="ecg-quality-box" hidden aria-live="polite">
      <div class="ecg-quality-line"><span id="ecg-quality-title">Qualidade técnica da foto</span><span id="ecg-quality-value">—</span></div>
      <div class="ecg-quality-meter" aria-hidden="true"><span id="ecg-quality-meter-fill"></span></div>
      <div class="ecg-quality-sub" id="ecg-quality-details"></div>
      <div class="ecg-quality-sub" id="ecg-quality-hints"></div>
      <div class="ecg-quality-sub"><strong>Índice experimental (0–100):</strong> avalia propriedades da foto, não precisão do ECG nem segurança diagnóstica. Limites e pesos ainda não validados.</div>
    </div>
    <div class="ecg-capture-hint"><strong>Confiança clínica do modelo: não disponível.</strong> O modelo conectado ainda não possui probabilidades calibradas e validadas para ECG fotografado. Não exibiremos um percentual inventado.</div>
    <label class="ecg-consent" id="ecg-research-consent"><input type="checkbox" id="ecg-research-check"><span>Confirmo que esta imagem é fictícia ou de teste, sem identificação pessoal, e autorizo o envio ao serviço externo de IA para pesquisa. Não usar com pacientes reais nem para conduta médica.</span></label>
  `;
  labCard.querySelector("p")?.insertAdjacentElement("afterend", ui);
  input.setAttribute("capture", "environment");
  analyze.textContent = "Testar IA (pesquisa)";
  const modes = Array.from(ui.querySelectorAll("[data-mode]"));
  const hint = document.getElementById("ecg-capture-hint");
  const panel = document.getElementById("ecg-lead-panel");
  const grid = document.getElementById("ecg-lead-grid");
  const progress = document.getElementById("ecg-lead-progress");
  const qBox = document.getElementById("ecg-quality-box");
  const qTitle = document.getElementById("ecg-quality-title");
  const qValue = document.getElementById("ecg-quality-value");
  const qMeter = document.getElementById("ecg-quality-meter-fill");
  const qDetails = document.getElementById("ecg-quality-details");
  const qHints = document.getElementById("ecg-quality-hints");
  const consent = document.getElementById("ecg-research-consent");
  const checkbox = document.getElementById("ecg-research-check");
  const uploadLabel = labCard.querySelector('label[for="ecg-image"]');

  const setStatus = (message, kind = "") => {
    status.textContent = message;
    status.className = "ecg-status" + (kind ? " " + kind : "");
  };
  const hideResult = () => { resultCard.hidden = true; result.replaceChildren(); };
  const updateAnalyze = () => {
    analyze.disabled = busy || mode !== "quick" || !quick || !checkbox.checked || quick.quality.score < 40;
    input.disabled = busy;
  };
  const showPreview = (file) => {
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    previewUrl = file ? URL.createObjectURL(file) : null;
    if (previewUrl) { preview.src = previewUrl; preview.style.display = "block"; }
    else { preview.removeAttribute("src"); preview.style.display = "none"; }
  };
  const renderQuality = (entry, title) => {
    qBox.hidden = !entry;
    if (!entry) return;
    const q = entry.quality;
    qTitle.textContent = title;
    qValue.textContent = q.score + "/100 · experimental";
    qValue.className = q.score < 60 ? "ecg-quality-bad" : "ecg-quality-good";
    qMeter.style.width = q.score + "%";
    const format = v => Math.round(v * 100) + "%";
    qDetails.textContent = "Nitidez relativa: " + format(q.focus) + " · contraste: " + format(q.contrast) + " · resolução: " + format(q.resolution) + " · exposição: " + format(q.exposure) + ".";
    qHints.textContent = q.hints.length ? q.hints.join(" ") : "Não foram identificadas limitações técnicas evidentes pelas heurísticas. Confira manualmente o traçado.";
  };
  const selectedLead = () => leads[leadIndex];
  const drawLeads = () => {
    grid.replaceChildren();
    leads.forEach((lead, i) => {
      const entry = saved.get(lead);
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "ecg-lead-tile" + (leadIndex === i ? " is-current" : "");
      btn.setAttribute("aria-pressed", String(leadIndex === i));
      const name = document.createElement("span");
      name.textContent = lead;
      const info = document.createElement("small");
      info.textContent = entry ? entry.quality.score + "/100 · refazer" : "Pendente";
      btn.append(name, info);
      btn.addEventListener("click", () => {
        leadIndex = i;
        input.value = "";
        render();
        setStatus("Pronto para fotografar " + selectedLead() + ".");
      });
      grid.appendChild(btn);
    });
    progress.textContent = saved.size + " de 12 derivações capturadas. " +
      (saved.size === 12 ? "Conjunto completo para revisão manual." : "Selecione a derivação e capture individualmente.");
  };
  const render = () => {
    panel.hidden = mode !== "detailed";
    consent.hidden = mode !== "quick";
    modes.forEach(btn => btn.setAttribute("aria-pressed", String(btn.dataset.mode === mode)));
    if (mode === "quick") {
      hint.textContent = "Enquadre o ECG completo, preservando identificação das derivações, grade e calibração. Apenas imagens fictícias ou de teste, sem dados pessoais.";
      if (uploadLabel) uploadLabel.textContent = quick ? "Trocar foto completa" : "Fotografar ECG completo";
      fileName.textContent = quick ? quick.file.name : "Nenhum ECG selecionado.";
      showPreview(quick?.file ?? null);
      renderQuality(quick, "Qualidade técnica · foto completa");
    } else {
      hint.textContent = "Modo ultra sensível experimental: fotografe cada derivação, com alguns complexos completos e grade visível. Não substitui reconstrução validada do sinal.";
      drawLeads();
      const entry = saved.get(selectedLead());
      if (uploadLabel) uploadLabel.textContent = "Fotografar " + selectedLead();
      fileName.textContent = entry ? selectedLead() + ": " + entry.file.name : "Aguardando imagem de " + selectedLead() + ".";
      showPreview(entry?.file ?? null);
      renderQuality(entry, "Qualidade técnica · " + selectedLead());
    }
    updateAnalyze();
  };

  modes.forEach(btn => btn.addEventListener("click", () => {
    if (busy) return;
    mode = btn.dataset.mode;
    ++generation;
    input.value = "";
    hideResult();
    render();
    setStatus(mode === "quick"
      ? "Modo rápido: uma fotografia completa."
      : "Modo ultra sensível: capturas locais por derivação. A análise conjunta ainda não está disponível.");
  }));
  checkbox.addEventListener("change", updateAnalyze);

  input.addEventListener("change", async () => {
    const file = input.files?.[0] ?? null;
    if (!file) return;
    const token = ++generation;
    const chosenMode = mode;
    const chosenLead = selectedLead();
    hideResult();
    if (chosenMode === "quick") { quick = null; render(); }
    updateAnalyze();
    setStatus("Avaliando resolução, nitidez e contraste no próprio dispositivo...");
    try {
      const quality = await window.LuriaEcgImageQuality.evaluate(file, chosenMode);
      if (token !== generation) return;
      const entry = { file, quality };
      if (chosenMode === "quick") {
        quick = entry;
        render();
      } else {
        saved.set(chosenLead, entry);
        const next = leads.findIndex(l => !saved.has(l));
        leadIndex = next === -1 ? leads.indexOf(chosenLead) : next;
        render();
      }
      setStatus(quality.score < 60
        ? "Qualidade técnica possivelmente limitada. Considere refazer a fotografia."
        : "Avaliação técnica experimental concluída. Revise a nitidez e a integridade do traçado.", quality.score < 60 ? "" : "ok");
    } catch (err) {
      if (token !== generation) return;
      setStatus(err?.message || "Falha ao avaliar a imagem.", "error");
    } finally {
      if (token === generation) {
        input.value = "";
        updateAnalyze();
      }
    }
  });

  const imageBase64 = file => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result || "").split(",")[1] || "");
    reader.onerror = () => reject(new Error("Não foi possível ler o arquivo."));
    reader.readAsDataURL(file);
  });

  analyze.addEventListener("click", async () => {
    if (mode !== "quick" || !quick || !checkbox.checked || busy) return;
    if (quick.quality.score < 40) {
      setStatus("Imagem tecnicamente inadequada para o protótipo. Fotografe novamente.", "error");
      return;
    }
    if (!client?.functions) { setStatus("Serviço de pesquisa não configurado.", "error"); return; }
    const selected = quick.file;
    busy = true;
    updateAnalyze();
    hideResult();
    setStatus("Enviando imagem de teste para análise experimental...");
    try {
      const data = await imageBase64(selected);
      const response = await client.functions.invoke("ecg-ai-reader", {
        body: { image: { mimeType: selected.type, data } }
      });
      if (response.error || !response.data?.ok) throw new Error(response.data?.error || "Falha na análise experimental.");
      const value = response.data.result || {};
      result.replaceChildren();
      const warning = document.createElement("div");
      warning.className = "ecg-results-warning";
      warning.textContent = "Confiança clínica calibrada: indisponível. A descrição e os níveis qualitativos abaixo são saídas de IA não validadas para pacientes reais.";
      result.appendChild(warning);
      const qualityLine = document.createElement("p");
      qualityLine.textContent = "Qualidade declarada pela IA: " + (value.quality || "não informada") + ". Índice técnico local: " + quick.quality.score + "/100 (experimental).";
      result.appendChild(qualityLine);
      const list = document.createElement("ul");
      (Array.isArray(value.findings) ? value.findings : []).forEach(item => {
        const li = document.createElement("li");
        li.textContent = String(item.name || "Achado") + " — certeza textual declarada: " + String(item.confidence || "não informada")
          + (item.evidence ? " · " + String(item.evidence) : "");
        list.appendChild(li);
      });
      result.appendChild(list);
      const synthesis = document.createElement("p");
      synthesis.textContent = "Síntese experimental: " + (value.synthesis || "não informada");
      result.appendChild(synthesis);
      if (value.urgent_attention) {
        const urgent = document.createElement("p");
        urgent.textContent = "Observação da IA: " + value.urgent_attention;
        result.appendChild(urgent);
      }
      resultCard.hidden = false;
      setStatus("Análise experimental concluída. Os resultados não são adequados para decisão clínica.", "ok");
    } catch (err) {
      setStatus(err?.message || "Não foi possível concluir a análise.", "error");
    } finally {
      busy = false;
      updateAnalyze();
    }
  });

  window.addEventListener("pagehide", () => {
    if (previewUrl) URL.revokeObjectURL(previewUrl);
  });
  render();
  setStatus("Selecione o modo de captura. A análise com IA está restrita a imagens de pesquisa.");
})();
