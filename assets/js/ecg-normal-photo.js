/* LURIA ECG — native still photograph mode for fair A/B capture comparison.
   Never uploads, filters, crops, or persists the original in this module. */
(function (global) {
  "use strict";
  const doc = global.document;
  if (!doc) return;
  const byId = id => doc.getElementById(id);
  const openButton = byId("ecg-btn-normal-photo");
  const input = byId("ecg-normal-photo-input");
  const page = byId("ecg-normal-photo-page");
  const preview = byId("ecg-normal-photo-preview");
  const details = byId("ecg-normal-photo-details");
  const error = byId("ecg-normal-photo-error");
  const btnClose = byId("ecg-normal-photo-close");
  const btnRetake = byId("ecg-normal-photo-retake");
  const btnProcess = byId("ecg-normal-photo-process");
  if (![openButton, input, page, preview, details, error, btnClose, btnRetake, btnProcess].every(Boolean)) return;

  let sourceFile = null;
  let previewUrl = null;
  let working = false;
  let lastFocus = null;

  const LIMIT_BYTES = 30 * 1024 * 1024;
  function releasePreview() {
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    previewUrl = null;
    preview.removeAttribute("src");
  }
  function showError(message) {
    error.hidden = !message;
    error.textContent = message || "";
  }
  function close() {
    if (working) return;
    page.hidden = true;
    doc.body.classList.remove("ecg-normal-photo-open");
    releasePreview();
    preview.hidden = true;
    sourceFile = null;
    showError("");
    if (lastFocus?.focus) lastFocus.focus();
  }
  function choosePhoto() {
    if (working) return;
    input.value = "";
    // The iOS/Android camera app handles focus, exposure and full-resolution
    // capture. Desktop/browser fallback opens the standard image picker.
    input.click();
  }
  function formatDetails(file, width, height) {
    const mp = (width * height / 1e6).toFixed(1);
    const size = (file.size / (1024 * 1024)).toFixed(1);
    const warning = Math.min(width, height) < 1200
      ? " Atenção: resolução baixa para traçados finos; prefira uma foto mais nítida."
      : "";
    return "Foto original: " + width + " × " + height + " px (" + mp +
      " MP) · " + size + " MB. Sem filtros, sem cortes." + warning;
  }
  openButton.addEventListener("click", () => {
    lastFocus = doc.activeElement;
    choosePhoto();
  });
  btnRetake.addEventListener("click", choosePhoto);
  btnClose.addEventListener("click", close);
  doc.addEventListener("keydown", event => {
    if (event.key === "Escape" && !page.hidden) close();
  });

  input.addEventListener("change", () => {
    const file = input.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/") || file.size === 0 || file.size > LIMIT_BYTES) {
      if (page.hidden) {
        page.hidden = false;
        doc.body.classList.add("ecg-normal-photo-open");
      }
      showError("Escolha uma imagem válida de até 30 MB. Não foram enviados arquivos.");
      return;
    }
    releasePreview();
    sourceFile = null;
    working = false;
    btnProcess.disabled = true;
    showError("");
    details.textContent = "Conferindo resolução da foto...";
    page.hidden = false;
    doc.body.classList.add("ecg-normal-photo-open");
    preview.hidden = true;
    previewUrl = URL.createObjectURL(file);
    preview.onload = () => {
      const width = preview.naturalWidth, height = preview.naturalHeight;
      if (!(width > 0 && height > 0)) {
        showError("Imagem inválida. Tire outra foto.");
        return;
      }
      sourceFile = file;
      details.textContent = formatDetails(file, width, height);
      btnProcess.disabled = false;
      preview.hidden = false;
      btnProcess.focus();
    };
    preview.onerror = () => {
      sourceFile = null;
      showError("O navegador não conseguiu abrir esta imagem. Use JPEG, PNG ou outra foto compatível.");
      details.textContent = "";
      preview.hidden = true;
      btnProcess.disabled = true;
    };
    preview.src = previewUrl;
  });

  btnProcess.addEventListener("click", async () => {
    if (!sourceFile || working) return;
    if (typeof global.LuriaEcgProcessPhoto !== "function") {
      showError("O processamento está indisponível. Recarregue a página e tente novamente.");
      return;
    }
    working = true;
    btnProcess.disabled = true;
    btnClose.disabled = true;
    btnRetake.disabled = true;
    showError("");
    details.textContent = "Extraindo o ECG a partir da foto original…";
    try {
      // Both A/B methods share the existing extraction and audit pipeline.
      const result = await global.LuriaEcgProcessPhoto(sourceFile, "normal_photo");
      if (!result?.ok) {
        showError(result?.reason || "Não foi possível extrair o ECG. Confira a folha e tente novamente.");
        details.textContent = "Foto preservada nesta tela. Você pode tentar novamente ou tirar outra.";
      } else {
        details.textContent = "Foto encaminhada para conferência dos traçados extraídos.";
      }
      if (result?.ok) {
        working = false;
        close();
      }
    } catch (exception) {
      showError("Falha ao processar a foto. Experimente outra captura.");
      details.textContent = "A foto original não foi alterada.";
      console.warn("[LURIA ECG] Foto normal: falha local", exception);
    } finally {
      working = false;
      btnProcess.disabled = !sourceFile;
      btnClose.disabled = false;
      btnRetake.disabled = false;
    }
  });
})(typeof window !== "undefined" ? window : globalThis);
