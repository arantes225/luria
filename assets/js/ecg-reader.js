(() => {
  const client = window.supabaseClient;
  const input = document.getElementById("ecg-image");
  const analyze = document.getElementById("ecg-analyze");
  const preview = document.getElementById("ecg-image-preview");
  const fileName = document.getElementById("ecg-file-name");
  const status = document.getElementById("ecg-status");
  const resultCard = document.getElementById("ecg-result-card");
  const result = document.getElementById("ecg-result");
  if (!input || !analyze) return;
  let selected = null;
  const setStatus = (message, kind = "") => { status.textContent = message; status.className = "ecg-status" + (kind ? " " + kind : ""); };
  input.addEventListener("change", () => {
    selected = input.files?.[0] || null; analyze.disabled = !selected; resultCard.hidden = true;
    if (!selected) { fileName.textContent = "Nenhum ECG selecionado."; preview.style.display = "none"; return; }
    fileName.textContent = selected.name; preview.src = URL.createObjectURL(selected); preview.style.display = "block"; setStatus("Imagem pronta para análise.", "ok");
  });
  analyze.addEventListener("click", async () => {
    if (!selected || !client?.functions) return;
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