(() => {
  "use strict";
  const el = id => document.getElementById(id);
  const video = el("ecg-camera-video"), sample = el("ecg-camera-canvas");
  const start = el("ecg-camera-start"), stop = el("ecg-camera-stop");
  const torch = el("ecg-camera-torch"), capture = el("ecg-camera-capture");
  const status = el("ecg-camera-status"), quality = el("ecg-camera-quality");
  const guidance = el("ecg-camera-guidance"), orientation = el("ecg-camera-orientation");
  const overlay = el("ecg-camera-overlay");
  const stage = el("ecg-camera-stage"), map = el("ecg-camera-map"), cameraPage = el("ecg-camera-page");
  const preview = el("ecg-camera-map-preview"), layoutResult = el("ecg-camera-layout-result");
  const layoutSelect = el("ecg-camera-layout-select"), confirm = el("ecg-camera-map-confirm");
  const retake = el("ecg-camera-map-retake");
  const leadField = el("ecg-camera-lead-field"), lead = el("ecg-camera-lead");
  const captures = el("ecg-camera-captures");
  if (!video || !sample || !cameraPage || !window.LuriaEcgLayout || !window.LuriaEcgFrameGuide) return;
  document.body.appendChild(cameraPage);
  const ctx = sample.getContext("2d", { willReadFrequently: true });
  let stream, track, timer, mapUrl, previous, phase = "map";
  let qualityWindow = [], requestId = 0;
  let autoFrames = 0, taking = false, capturedCurrent = false;
  const portrait = () => matchMedia("(pointer: coarse) and (orientation: portrait)").matches;
  const rotated = () => video.videoWidth < video.videoHeight && !portrait();
  function drawCamera(target, context, width, height) {
    target.width = width; target.height = height;
    if (rotated()) {
      context.translate(width, 0); context.rotate(Math.PI / 2);
      context.drawImage(video, 0, 0, height, width);
      context.setTransform(1, 0, 0, 1, 0, 0);
    } else context.drawImage(video, 0, 0, width, height);
  }
  const message = (text, type = "") => { status.textContent = text; status.className = `ecg-status ${type}`; };
  const tell = text => { if (guidance.textContent !== text) guidance.textContent = text; if (overlay.textContent !== text) overlay.textContent = text; };
  const orient = () => {
    orientation.textContent = portrait() ? "Gire o celular para a horizontal"
      : phase === "detail" ? "Aproxime a derivação selecionada"
        : "Enquadre toda a folha";
  };
  function inspect() {
    if (!stream || !video.videoWidth || phase === "review") return;
    const sourceWidth = rotated() ? video.videoHeight : video.videoWidth;
    const sourceHeight = rotated() ? video.videoWidth : video.videoHeight;
    drawCamera(sample, ctx, 480, Math.round(480 * sourceHeight / sourceWidth));
    stage.classList.toggle("is-rotated", rotated());
    const frameImage = ctx.getImageData(0, 0, sample.width, sample.height);
    const pixels = frameImage.data;
    const current = []; let light = 0, edges = 0, motion = 0, clipped = 0, count = 0;
    for (let y = 2; y < sample.height - 2; y += 4) for (let x = 2; x < sample.width - 2; x += 4) {
      const i = (y * sample.width + x) * 4, j = i + 8;
      const gray = (pixels[i] * 299 + pixels[i + 1] * 587 + pixels[i + 2] * 114) / 1000;
      const neighbor = (pixels[j] * 299 + pixels[j + 1] * 587 + pixels[j + 2] * 114) / 1000;
      light += gray; edges += Math.abs(gray - neighbor);
      if (gray > 251) clipped++;
      if (previous) motion += Math.abs(gray - previous[count]);
      current.push(gray); count++;
    }
    const brightness = light / count, texture = edges / count;
    const movement = previous ? motion / count : Infinity;
    previous = current; orient();
    const dimensions = `${video.videoWidth}×${video.videoHeight}px`;
    const resolutionOk = Math.max(video.videoWidth, video.videoHeight) >= 1600 && Math.min(video.videoWidth, video.videoHeight) >= 900;
    const glare = brightness >= 249 || clipped / count > .9;
    const readable = !portrait() && resolutionOk && brightness > 40 && !glare && texture > 3;
    const calm = readable && movement < 28;
    qualityWindow.push(calm);
    if (qualityWindow.length > 10) qualityWindow.shift();
    const steadyEnough = qualityWindow.filter(Boolean).length >= 6;
    capture.disabled = taking || !readable || (phase === "detail" && !lead.value);
    quality.textContent = `Câmera ${dimensions} · luz ${Math.round(brightness)}/255 · detalhes ${texture.toFixed(1)} · movimento ${Number.isFinite(movement) ? movement.toFixed(1) : "…"}`;
    quality.className = `ecg-status${resolutionOk ? "" : " error"}`;
    let direction;
    if (phase !== "review" && !portrait() && resolutionOk && brightness > 40 && !glare && texture > 3)
      direction = window.LuriaEcgFrameGuide.locate(frameImage, phase);
    if (portrait()) tell("Gire o celular para a horizontal.");
    else if (!resolutionOk) tell("Resolução insuficiente. Tente a câmera principal ou uma foto de alta qualidade.");
    else if (brightness <= 40) tell("Aumente a iluminação.");
    else if (glare) tell("Reduza o reflexo ou desligue a lanterna.");
    else if (texture <= 3) tell("Aguarde o foco ou ajuste a distância.");
    else if (movement >= 28) tell("Mova devagar · captura manual disponível.");
    else if (phase === "detail" && !lead.value) tell("Selecione a derivação ou marque como não identificada.");
    else tell(direction?.instruction || "Enquadre o ECG no centro da câmera.");
    const autoReady = calm && steadyEnough && direction?.ready &&
      (phase === "map" || Boolean(lead.value)) && !capturedCurrent && !taking;
    autoFrames = autoReady ? Math.min(5, autoFrames + 1) : Math.max(0, autoFrames - 1);
    if (autoFrames >= 5) { autoFrames = 0; capturedCurrent = true; capture.click(); }
  }
  async function frame() {
    const out = document.createElement("canvas");
    drawCamera(out, out.getContext("2d"), rotated() ? video.videoHeight : video.videoWidth,
      rotated() ? video.videoWidth : video.videoHeight);
    return new Promise(resolve => out.toBlob(resolve, "image/jpeg", .95));
  }
  async function openCamera() {
    if (!navigator.mediaDevices?.getUserMedia) { closeCamera(); message("Câmera indisponível neste navegador. Use uma foto de alta qualidade.", "error"); return; }
    const request = ++requestId;
    stage.hidden = false;
    tell("Aguardando acesso à câmera…");
    try {
      const nextStream = await navigator.mediaDevices.getUserMedia({ video: {
        facingMode: { ideal: "environment" }, width: { ideal: 3840 }, height: { ideal: 2160 }, aspectRatio: { ideal: 16 / 9 }
      }, audio: false });
      if (request !== requestId || cameraPage.hidden) { nextStream.getTracks().forEach(t => t.stop()); return; }
      stream = nextStream;
      video.srcObject = stream; await video.play();
      stage.hidden = false;
      track = stream.getVideoTracks()[0];
      const capabilities = track.getCapabilities?.() || {};
      if (capabilities.focusMode?.includes("continuous")) {
        try { await track.applyConstraints({ advanced: [{ focusMode: "continuous" }] }); } catch (_) { /* Browser may reject focus control. */ }
      }
      torch.disabled = !capabilities.torch;
      stop.disabled = false; qualityWindow = []; autoFrames = 0; capturedCurrent = false; previous = null;
      orient(); message("Câmera aberta. Enquadre a folha inteira.", "ok");
      timer = setInterval(inspect, 200);
    } catch (_) {
      if (request !== requestId) return;
      stream?.getTracks().forEach(t => t.stop()); stream = null; track = null;
      closeCamera();
      message("Câmera indisponível ou permissão negada. Use uma foto de alta qualidade.", "error");
    }
  }
  start.addEventListener("click", async () => {
    cameraPage.hidden = false; document.body.classList.add("ecg-camera-open"); stop.disabled = false;
    if (location.hash !== "#camera") history.pushState({ ecgCamera: true }, "", `${location.pathname}${location.search}#camera`);
    orient(); stop.focus();
    if (phase === "review") { map.hidden = false; stage.hidden = true; return; }
    start.disabled = true;
    await openCamera();
  });
  function closeCamera(updateUrl = true) {
    requestId++;
    clearInterval(timer); timer = null; stream?.getTracks().forEach(t => t.stop());
    stream = null; track = null; video.srcObject = null; stage.hidden = true; cameraPage.hidden = true;
    document.body.classList.remove("ecg-camera-open");
    if (updateUrl && location.hash === "#camera") history.replaceState(null, "", location.pathname + location.search);
    previous = null; qualityWindow = []; autoFrames = 0;
    start.disabled = false; stop.disabled = true; torch.disabled = true; capture.disabled = true;
    torch.textContent = "Ligar lanterna"; message("Câmera desligada.");
    guidance.textContent = "Abra a câmera para mapear o formato da folha.";
    start.focus();
  }
  stop.addEventListener("click", () => closeCamera());
  document.addEventListener("keydown", event => { if (event.key === "Escape" && !cameraPage.hidden) closeCamera(); });
  window.addEventListener("popstate", () => { if (!cameraPage.hidden && location.hash !== "#camera") closeCamera(false); });
  torch.addEventListener("click", async () => {
    if (!track?.getCapabilities?.().torch) return;
    const on = track.getSettings().torch === true;
    try { await track.applyConstraints({ advanced: [{ torch: !on }] }); torch.textContent = on ? "Ligar lanterna" : "Desligar lanterna"; }
    catch (_) { message("O aparelho não permitiu controlar a lanterna.", "error"); }
  });
  capture.addEventListener("click", async () => {
    if (capture.disabled || !video.videoWidth || taking) return;
    taking = true; capture.disabled = true; autoFrames = 0; capturedCurrent = true;
    const blob = await frame();
    if (!blob) { taking = false; capturedCurrent = false; message("Falha na foto. Tente novamente.", "error"); return; }
    if (phase === "map") {
      phase = "review";
      if (mapUrl) URL.revokeObjectURL(mapUrl);
      mapUrl = URL.createObjectURL(blob); preview.src = mapUrl;
      const estimate = window.LuriaEcgLayout.detect(ctx.getImageData(0, 0, sample.width, sample.height));
      layoutSelect.value = estimate.kind;
      layoutResult.textContent = estimate.kind === "stacked"
        ? `Possível formato: derivações longas empilhadas (${estimate.rows} faixas). Confirme abaixo.`
        : estimate.kind === "columns" ? `Possível formato: várias derivações por linha (${estimate.rows} faixas). Confirme abaixo.`
          : "Formato incerto. Confirme o arranjo visualmente; os rótulos ainda não são reconhecidos.";
      map.hidden = false;
      stage.hidden = true;
      const input = el("ecg-image");
      if (input) {
        const transfer = new DataTransfer();
        transfer.items.add(new File([blob], "ecg-folha-inteira.jpg", { type: "image/jpeg" }));
        input.files = transfer.files; input.dispatchEvent(new Event("change", { bubbles: true }));
      }
      message("Foto ampla salva no aparelho. Confirme o formato para começar as aproximações.", "ok");
    } else {
      const link = document.createElement("a"), row = document.createElement("div");
      link.href = URL.createObjectURL(blob); link.download = `ecg-${lead.value}-${Date.now()}.jpg`;
      link.textContent = `${lead.value === "unknown" ? "Derivação não identificada" : lead.value} · foto aproximada (baixar)`;
      const thumb = document.createElement("img");
      thumb.src = link.href; thumb.alt = `Prévia da derivação ${lead.value === "unknown" ? "não identificada" : lead.value}`;
      link.prepend(thumb);
      row.appendChild(link); captures.appendChild(row);
      message(`${lead.value} capturada no aparelho. Confira a foto e selecione a próxima derivação.`, "ok");
    }
    taking = false; qualityWindow = []; previous = null;
  });
  confirm.addEventListener("click", async () => {
    phase = "detail"; stage.classList.add("is-detail");
    orient();
    stage.classList.toggle("is-columns", layoutSelect.value === "columns");
    map.hidden = true; stage.hidden = false; leadField.hidden = false; confirm.hidden = true;
    capturedCurrent = false; autoFrames = 0; qualityWindow = [];
    capture.textContent = "Capturar derivação aproximada"; capture.disabled = true;
    message(`Formato confirmado: ${layoutSelect.selectedOptions[0].textContent}. Selecione a derivação visível.`, "ok");
    if (!stream) await openCamera();
  });
  retake.addEventListener("click", async () => {
    phase = "map"; capturedCurrent = false; autoFrames = 0; qualityWindow = [];
    orient();
    map.hidden = true; confirm.hidden = false; leadField.hidden = true;
    stage.hidden = false;
    stage.classList.remove("is-detail", "is-columns");
    capture.textContent = "Mapear folha inteira"; capture.disabled = true;
    message("Enquadre novamente a folha inteira.", "ok");
    if (!stream) await openCamera();
  });
  lead.addEventListener("change", () => { capturedCurrent = false; autoFrames = 0; qualityWindow = []; capture.disabled = true; });
  window.addEventListener("orientationchange", orient);
  orient();
})();
