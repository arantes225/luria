/* LURIA ECG — original photo + user-controlled paper boundaries.
   Keeps original file unchanged and passes optional four corners to shared
   extraction. No upload, no automatic image filters. */
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
  const frame = byId("ecg-normal-photo-frame");
  const outline = byId("ecg-normal-photo-outline");
  const dim = byId("ecg-normal-photo-dim");
  const help = byId("ecg-normal-photo-corner-help");
  const resetButton = byId("ecg-normal-photo-reset");
  const rotateLeft = byId("ecg-normal-photo-rotate-left");
  const rotateRight = byId("ecg-normal-photo-rotate-right");
  const cornersButtons = Array.from(doc.querySelectorAll("[data-ecg-corner]"));
  const selectionRadios = Array.from(doc.querySelectorAll('input[name="ecg-photo-selection"]'));
  const perspective = global.LuriaEcgPhotoPerspective;
  if (![openButton, input, page, preview, details, error, btnClose, btnRetake, btnProcess, frame,
         outline, dim, help, resetButton, rotateLeft, rotateRight, perspective].every(Boolean) ||
      cornersButtons.length !== 4 || selectionRadios.length !== 2) return;

  let sourceFile = null;
  let previewUrl = null;
  let working = false;
  let lastFocus = null;
  const appShell = doc.querySelector(".app-shell");
  let previousInert = false;
  let previousAria = null;
  let photoOpen = false;
  function activatePhotoSurface() {
    if (!photoOpen) {
      previousInert = Boolean(appShell?.inert);
      previousAria = appShell?.getAttribute("aria-hidden");
    }
    photoOpen = true;
    doc.body.classList.remove("sidebar-open");
    doc.getElementById("ui-mobile-tools")?.close?.();
    doc.body.classList.add("ecg-normal-photo-open", "ecg-capture-active");
    if (appShell) {
      appShell.inert = true;
      appShell.setAttribute("aria-hidden", "true");
    }
    page.hidden = false;
    if (typeof page.showModal === "function" && !page.open) {
      try { page.showModal(); }
      catch (exception) { console.warn("[LURIA ECG] Modal nativo indisponível, usando fallback.", exception); }
    }
  }
  function deactivatePhotoSurface() {
    if (!photoOpen) return;
    photoOpen = false;
    if (page.open && typeof page.close === "function") page.close();
    page.hidden = true;
    doc.body.classList.remove("ecg-normal-photo-open");
    if (!doc.body.classList.contains("ecg-guided-capture-open")) doc.body.classList.remove("ecg-capture-active");
    if (appShell) {
      appShell.inert = previousInert;
      if (previousAria === null) appShell.removeAttribute("aria-hidden");
      else appShell.setAttribute("aria-hidden", previousAria);
    }
  }
  let corners = perspective.cloneCorners();
  let selection = "corners";
  let photoWidth = 0;
  let photoHeight = 0;
  let rotationQuarterTurns = 0;

  function layoutPhotoFrame() {
    if (!photoWidth || !photoHeight) return;
    const sideways = rotationQuarterTurns % 2 === 1;
    const displayW = sideways ? photoHeight : photoWidth;
    const displayH = sideways ? photoWidth : photoHeight;
    const ratio = displayW / displayH;
    const availableW = Math.max(180, frame.parentElement?.clientWidth || 340);
    const availableH = Math.min(680, Math.max(170, (global.innerHeight || 680) * .56));
    const width = Math.max(1, Math.floor(Math.min(availableW, availableH * ratio)));
    const height = Math.max(1, Math.round(width / ratio));
    frame.style.width = width + "px";
    frame.style.height = height + "px";
    preview.style.position = "absolute";
    preview.style.left = "50%";
    preview.style.top = "50%";
    preview.style.width = (sideways ? height : width) + "px";
    preview.style.height = (sideways ? width : height) + "px";
    preview.style.transform = "translate(-50%, -50%) rotate(" + (rotationQuarterTurns * 90) + "deg)";
  }

  function updateCorners() {
    const scale = 1000;
    const pts = corners.map(p => Math.round(p.x * scale) + "," + Math.round(p.y * scale));
    outline.setAttribute("points", pts.join(" "));
    const pointsPath = corners.map(p => (p.x * scale).toFixed(1) + " " + (p.y * scale).toFixed(1));
    dim.setAttribute("d", "M0 0H1000V1000H0Z M" + pointsPath.join("L") + "Z");
    cornersButtons.forEach((el, i) => {
      el.style.left = (corners[i].x * 100) + "%";
      el.style.top = (corners[i].y * 100) + "%";
    });
    const check = perspective.validateCorners(corners);
    frame.classList.toggle("is-invalid", !check.valid && selection === "corners");
    help.textContent = selection === "whole"
      ? "Modo foto inteira: nenhuma delimitação manual. Útil para comparar os resultados."
      : check.valid
        ? "Papel delimitado. Arraste os quatro pontos até as quinas reais antes de extrair."
        : check.reason;
    btnProcess.disabled = !sourceFile || working || (selection === "corners" && !check.valid);
  }
  function resetCorners() {
    corners = perspective.cloneCorners();
    updateCorners();
  }
  function setSelection(value) {
    selection = value === "whole" ? "whole" : "corners";
    frame.classList.toggle("is-whole-photo", selection === "whole");
    cornersButtons.forEach(button => { button.disabled = selection === "whole"; });
    resetButton.disabled = selection === "whole";
    updateCorners();
  }
  const clamp = v => Math.max(0.005, Math.min(0.995, v));
  // Pointer coordinates are measured over the same exact photo rectangle,
  // irrespective of rotation, device pixel ratio or screen dimensions.
  cornersButtons.forEach(button => {
    const index = Number(button.dataset.ecgCorner);
    let activePointer = null;
    const move = event => {
      const rect = frame.getBoundingClientRect();
      if (!(rect.width > 0 && rect.height > 0)) return;
      const proposed = perspective.cloneCorners(corners);
      proposed[index] = {
        x: clamp((event.clientX - rect.left) / rect.width),
        y: clamp((event.clientY - rect.top) / rect.height)
      };
      // Reject crossing / invalid area rather than silently relabeling corners.
      if (!perspective.validateCorners(proposed).valid) return;
      corners = proposed;
      updateCorners();
    };
    button.addEventListener("pointerdown", event => {
      if (selection !== "corners") return;
      activePointer = event.pointerId;
      button.setPointerCapture?.(event.pointerId);
      event.preventDefault();
      move(event);
    });
    button.addEventListener("pointermove", event => {
      if (activePointer !== event.pointerId) return;
      move(event);
    });
    const end = event => {
      if (activePointer !== event.pointerId) return;
      activePointer = null;
      if (button.hasPointerCapture?.(event.pointerId)) button.releasePointerCapture(event.pointerId);
    };
    button.addEventListener("pointerup", end);
    button.addEventListener("pointercancel", end);
    button.addEventListener("keydown", event => {
      if (selection !== "corners" || !/^Arrow(Up|Down|Left|Right)$/.test(event.key)) return;
      event.preventDefault();
      const step = event.shiftKey ? 0.01 : 0.003;
      const proposed = perspective.cloneCorners(corners);
      const point = proposed[index];
      if (event.key === "ArrowLeft") point.x = clamp(point.x - step);
      if (event.key === "ArrowRight") point.x = clamp(point.x + step);
      if (event.key === "ArrowUp") point.y = clamp(point.y - step);
      if (event.key === "ArrowDown") point.y = clamp(point.y + step);
      if (!perspective.validateCorners(proposed).valid) return;
      corners = proposed;
      updateCorners();
    });
  });
  resetButton.addEventListener("click", resetCorners);
  function rotatePhoto(delta) {
    if (!sourceFile || working) return;
    rotationQuarterTurns = (rotationQuarterTurns + delta + 4) % 4;
    layoutPhotoFrame();
    resetCorners();
    showError("");
    details.textContent = formatDetails(sourceFile, photoWidth, photoHeight) +
      " · Orientação escolhida: " + (rotationQuarterTurns * 90) + "°.";
  }
  rotateLeft.addEventListener("click", () => rotatePhoto(-1));
  rotateRight.addEventListener("click", () => rotatePhoto(1));
  selectionRadios.forEach(radio => radio.addEventListener("change", () => {
    if (radio.checked) setSelection(radio.value);
  }));
  global.addEventListener?.("resize", layoutPhotoFrame);


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
    deactivatePhotoSurface();
    releasePreview();
    preview.hidden = true;
    sourceFile = null;
    frame.hidden = true;
    showError("");
    if (lastFocus?.focus) lastFocus.focus();
  }
  function choosePhoto() {
    if (working) return;
    global.LuriaEcgStopScanner?.();
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
  page.addEventListener("cancel", event => {
    event.preventDefault();
    close();
  });
  doc.addEventListener("keydown", event => {
    if (event.key === "Escape" && !page.hidden) close();
  });

  input.addEventListener("change", () => {
    const file = input.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/") || file.size === 0 || file.size > LIMIT_BYTES) {
      sourceFile = null;
      btnProcess.disabled = true;
      activatePhotoSurface();
      showError("Escolha uma imagem válida de até 30 MB. Não foram enviados arquivos.");
      return;
    }
    releasePreview();
    sourceFile = null;
    working = false;
    btnProcess.disabled = true;
    showError("");
    details.textContent = "Conferindo resolução da foto...";
    activatePhotoSurface();
    preview.hidden = true;
    frame.hidden = true;
    previewUrl = URL.createObjectURL(file);
    preview.onload = () => {
      const width = preview.naturalWidth, height = preview.naturalHeight;
      if (!(width > 0 && height > 0)) {
        showError("Imagem inválida. Tire outra foto.");
        return;
      }
      sourceFile = file;
      photoWidth = width;
      photoHeight = height;
      rotationQuarterTurns = 0;
      details.textContent = formatDetails(file, width, height);
      frame.hidden = false;
      preview.hidden = false;
      layoutPhotoFrame();
      resetCorners();
      setSelection("corners");
      selectionRadios.forEach(radio => { radio.checked = radio.value === "corners"; });
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
    rotateLeft.disabled = true;
    rotateRight.disabled = true;
    showError("");
    details.textContent = "Extraindo o ECG a partir da foto original…";
    try {
      // Both A/B methods share the existing extraction and audit pipeline.
      const selectionOptions = selection === "corners"
        ? { corners: perspective.cloneCorners(corners), paperSelection: "manual_four_corners", rotationDeg: rotationQuarterTurns * 90 }
        : { corners: null, paperSelection: "full_photo", rotationDeg: rotationQuarterTurns * 90 };
      const result = await global.LuriaEcgProcessPhoto(sourceFile, "normal_photo", selectionOptions);
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
      rotateLeft.disabled = false;
      rotateRight.disabled = false;
    }
  });
})(typeof window !== "undefined" ? window : globalThis);
