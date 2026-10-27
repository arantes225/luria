(() => {
  const client = window.supabaseClient;
  const input = document.getElementById("ecg-image");
  const analyze = document.getElementById("ecg-analyze");
  const preview = document.getElementById("ecg-image-preview");
  const fileName = document.getElementById("ecg-file-name");
  const status = document.getElementById("ecg-status");
  const resultCard = document.getElementById("ecg-result-card");
  const review = document.getElementById("ecg-review-confirm");
  const result = document.getElementById("ecg-result");
  const metadata = document.getElementById("ecg-capture-metadata");
  if (!input || !analyze) return;
  let selected = null;
  const canAnalyze = () => Boolean(selected && (!review || review.checked));
  const setStatus = (message, kind = "") => { status.textContent = message; status.className = "ecg-status" + (kind ? " " + kind : ""); };
  input.addEventListener("change", () => {
    selected = input.files?.[0] || null; if (review) review.checked = false; analyze.disabled = !canAnalyze(); resultCard.hidden = true;
    if (!selected) { fileName.textContent = "Nenhum ECG selecionado."; preview.style.display = "none"; return; }
    fileName.textContent = selected.name;
    preview.src = URL.createObjectURL(selected);
    preview.style.display = "block";
    if (metadata) {
      const probe = new Image();
      probe.onload = () => {
        const megapixels = (probe.naturalWidth * probe.naturalHeight / 1_000_000).toFixed(2);
        const low = probe.naturalWidth < 1200 || probe.naturalHeight < 800;
        metadata.textContent = `Captura: ${probe.naturalWidth}×${probe.naturalHeight}px · ${megapixels} MP · ${selected.type || "tipo não informado"} · ${Math.round(selected.size / 1024)} KB${low ? " · resolução baixa: recapture em maior qualidade se possível" : ""}`;
        metadata.className = "ecg-status" + (low ? " error" : " ok");
        analyze.disabled = !canAnalyze() || low;
        if (low) setStatus("A imagem está abaixo do mínimo recomendado para revisão confiável.", "error");
      };
      probe.onerror = () => { metadata.textContent = "Não foi possível ler as dimensões da imagem."; metadata.className = "ecg-status error"; };
      probe.src = preview.src;
    }
    setStatus("Imagem pronta para revisão.", "ok");
  });
  review?.addEventListener("change", () => { analyze.disabled = !canAnalyze(); });
  analyze.addEventListener("click", async () => {
    if (!canAnalyze() || !client?.functions) return;
    analyze.disabled = true; setStatus("Analisando ECG com IA...");
    try {
      const dataUrl = await new Promise((resolve, reject) => { const reader = new FileReader(); reader.onload = () => resolve(String(reader.result || "").split(",")[1] || ""); reader.onerror = reject; reader.readAsDataURL(selected); });
      const response = await client.functions.invoke("ecg-ai-reader", { body: { image: { mimeType: selected.type, data: dataUrl } } });
      if (response.error || !response.data?.ok) throw new Error(response.data?.error || "Falha na análise.");
      const value = response.data.result || {}; result.innerHTML = "";
      const quality = document.createElement("p"); quality.textContent = "Qualidade: " + (value.quality || "não determinada"); result.appendChild(quality);
      const list = document.createElement("ul");
      (value.findings || []).forEach(item => { const li = document.createElement("li"); li.textContent = (item.name || "Achado") + " — confiança " + (item.confidence || "não determinada") + (item.evidence ? ": " + item.evidence : ""); list.appendChild(li); });
      result.appendChild(list);
      const synthesis = document.createElement("p"); synthesis.textContent = "Síntese sugerida: " + (value.synthesis || "não determinada"); result.appendChild(synthesis);
      if (value.urgent_attention) { const urgent = document.createElement("p"); urgent.textContent = "Atenção: " + value.urgent_attention; result.appendChild(urgent); }
      resultCard.hidden = false; setStatus("Análise concluída. Revise o ECG e o contexto clínico.", "ok");
    } catch (error) { setStatus(error?.message || "Não foi possível analisar o ECG.", "error"); }
    finally { analyze.disabled = false; }
  });
})();