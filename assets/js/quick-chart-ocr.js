/* OCR local para a Cola Rápida. A imagem não é enviada ao servidor. */
(() => {
  "use strict";

  const byId = id => document.getElementById(id);
  const note = byId("quick-chart-note");
  const camera = byId("quick-chart-camera");
  const gallery = byId("quick-chart-gallery");
  const clipboard = byId("quick-chart-paste");
  const cameraInput = byId("quick-chart-camera-input");
  const galleryInput = byId("quick-chart-gallery-input");
  const activity = byId("quick-chart-ocr-progress");
  const activityText = byId("quick-chart-ocr-progress-text");
  const abort = byId("quick-chart-ocr-abort");
  const preview = byId("quick-chart-ocr-preview");
  const output = byId("quick-chart-ocr-text");
  const insert = byId("quick-chart-ocr-insert");
  const send = byId("quick-chart-ocr-send");
  const discard = byId("quick-chart-ocr-discard");
  const save = byId("quick-chart-save-note");
  if (![note,camera,gallery,clipboard,cameraInput,galleryInput,activity,activityText,abort,preview,output,insert,send,discard,save].every(Boolean)) return;

  const MAX_FILE_BYTES = 12 * 1024 * 1024;
  const MAX_SIDE = 1900;
  let sequence = 0, activeWorker = null, busy = false;

  function busyState(on) {
    busy = on;
    camera.disabled = gallery.disabled = clipboard.disabled = on;
    activity.hidden = !on;
    abort.hidden = !on;
  }
  function message(value) {
    activityText.textContent = value;
    activity.hidden = false;
  }
  function reset() {
    ++sequence;
    const old = activeWorker;
    activeWorker = null;
    if (old) Promise.resolve(old.terminate()).catch(() => {});
    busyState(false);
    activity.hidden = true;
    preview.hidden = true;
    output.value = "";
    cameraInput.value = "";
    galleryInput.value = "";
  }

  async function drawSource(file) {
    let bitmap, image, url;
    try {
      if (typeof createImageBitmap === "function") {
        try { bitmap = await createImageBitmap(file, {imageOrientation:"from-image"}); } catch (_) { /* fallback */ }
      }
      if (!bitmap) {
        url = URL.createObjectURL(file);
        image = new Image();
        image.decoding = "async";
        image.src = url;
        await (image.decode ? image.decode() : new Promise((resolve, reject) => {
          image.onload = resolve;
          image.onerror = reject;
        }));
      }
      const originalWidth = bitmap ? bitmap.width : image.naturalWidth;
      const originalHeight = bitmap ? bitmap.height : image.naturalHeight;
      if (!originalWidth || !originalHeight) throw new Error("Imagem inválida.");
      const scale = Math.min(1, MAX_SIDE / Math.max(originalWidth, originalHeight));
      const canvas = document.createElement("canvas");
      canvas.width = Math.max(1, Math.round(originalWidth * scale));
      canvas.height = Math.max(1, Math.round(originalHeight * scale));
      const ctx = canvas.getContext("2d", {alpha:false});
      if (!ctx) throw new Error("Seu navegador não conseguiu preparar a imagem.");
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = "high";
      ctx.drawImage(bitmap || image, 0, 0, canvas.width, canvas.height);
      return canvas;
    } finally {
      bitmap?.close?.();
      if (url) URL.revokeObjectURL(url);
    }
  }

  async function recognize(file) {
    if (busy || !file) return;
    if (!file.type.startsWith("image/")) {
      message("Selecione uma imagem (foto ou captura de tela).");
      return;
    }
    if (file.size > MAX_FILE_BYTES) {
      message("A imagem excede 12 MB. Reduza a imagem e tente novamente.");
      return;
    }
    const ticket = ++sequence;
    preview.hidden = true;
    output.value = "";
    busyState(true);
    message("Preparando a imagem no celular…");
    let worker = null;
    try {
      const canvas = await drawSource(file);
      if (ticket !== sequence) return;
      message("Carregando o leitor de texto… (a primeira vez pode exigir internet)");
      if (!window.LuriaLazyVendors?.ensure) throw new Error("Leitor OCR indisponível. Atualize a página.");
      await window.LuriaLazyVendors.ensure("tesseract");
      if (ticket !== sequence) return;
      // Tesseract.js roda no navegador: apenas o texto confirmado entra no caderno.
      worker = await window.Tesseract.createWorker("por+eng", 1, {
        logger: event => {
          if (ticket !== sequence) return;
          if (event.status === "recognizing text") {
            const percentage = Math.round(Math.max(0, Math.min(1, Number(event.progress) || 0)) * 100);
            message("Extraindo texto… " + percentage + "%");
          }
        }
      });
      if (ticket !== sequence) return;
      activeWorker = worker;
      const result = await worker.recognize(canvas);
      if (ticket !== sequence) return;
      const text = String(result?.data?.text || "").replace(/\r\n?/g, "\n").trim();
      if (!text) throw new Error("Não foi possível reconhecer texto. Use uma foto mais nítida e bem iluminada.");
      output.value = text;
      preview.hidden = false;
      activity.hidden = true;
      output.focus({preventScroll:true});
      preview.scrollIntoView?.({behavior:"smooth",block:"nearest"});
    } catch (error) {
      if (ticket === sequence) message(error?.message || "Falha no reconhecimento. Tente outra imagem.");
    } finally {
      if (worker) {
        if (activeWorker === worker) activeWorker = null;
        try { await worker.terminate(); } catch (_) { /* already cancelled */ }
      }
      if (ticket === sequence) {
        busyState(false);
        activity.hidden = !preview.hidden;
      }
    }
  }

  function addToNote(shouldSend) {
    if (busy) return;
    const extracted = output.value.trim();
    if (!extracted) { message("Revise o texto extraído antes de adicionar."); return; }
    const previous = note.value.trimEnd();
    note.value = previous ? previous + "\n\n──────────\n" + extracted : extracted;
    note.dispatchEvent(new Event("input", {bubbles:true}));
    preview.hidden = true;
    output.value = "";
    note.focus({preventScroll:true});
    note.setSelectionRange(note.value.length, note.value.length);
    if (shouldSend) save.click();
    else message("Texto adicionado. Toque em Salvar para sincronizar.");
  }

  camera.addEventListener("click", () => cameraInput.click());
  gallery.addEventListener("click", () => galleryInput.click());
  cameraInput.addEventListener("change", () => {
    const file = cameraInput.files?.[0];
    cameraInput.value = "";
    if (file) recognize(file);
  });
  galleryInput.addEventListener("change", () => {
    const file = galleryInput.files?.[0];
    galleryInput.value = "";
    if (file) recognize(file);
  });
  clipboard.addEventListener("click", async () => {
    try {
      if (!navigator.clipboard?.readText) throw new Error("Cole o texto diretamente no caderno.");
      const text = await navigator.clipboard.readText();
      if (!text.trim()) throw new Error("A área de transferência está vazia.");
      output.value = text;
      preview.hidden = false;
      activity.hidden = true;
      output.focus({preventScroll:true});
    } catch (error) {
      message(error?.message || "Não foi possível colar. Use o campo do caderno.");
    }
  });
  insert.addEventListener("click", () => addToNote(false));
  send.addEventListener("click", () => addToNote(true));
  discard.addEventListener("click", reset);
  abort.addEventListener("click", reset);
  window.addEventListener("luria:owner-changed", reset);
  window.addEventListener("pagehide", () => {
    ++sequence;
    const old = activeWorker;
    activeWorker = null;
    if (old) Promise.resolve(old.terminate()).catch(() => {});
  });
})();
