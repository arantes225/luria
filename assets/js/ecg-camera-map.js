(() => {
  "use strict";
  const el = id => document.getElementById(id);
  const video = el("ecg-camera-video"), sample = el("ecg-camera-canvas");
  const start = el("ecg-camera-start"), stop = el("ecg-camera-stop");
  const torch = el("ecg-camera-torch"), capture = el("ecg-camera-capture");
  const status = el("ecg-camera-status"), quality = el("ecg-camera-quality");
  const guidance = el("ecg-camera-guidance"), orientation = el("ecg-camera-orientation");
  const stage = el("ecg-camera-stage"), map = el("ecg-camera-map");
  const preview = el("ecg-camera-map-preview"), layoutResult = el("ecg-camera-layout-result");
  const layoutSelect = el("ecg-camera-layout-select"), confirm = el("ecg-camera-map-confirm");
  const leadField = el("ecg-camera-lead-field"), lead = el("ecg-camera-lead");
  const captures = el("ecg-camera-captures");
  if (!video || !sample || !window.LuriaEcgLayout) return;
  const ctx = sample.getContext("2d", { willReadFrequently: true });
  let stream, track, timer, mapUrl, previous, phase = "map", stable = 0;
  const portrait = () => matchMedia("(pointer: coarse) and (orientation: portrait)").matches;
  const message = (text, type = "") => { status.textContent = text; status.className = `ecg-status ${type}`; };
  const orient = () => {
    orientation.textContent = portrait()
      ? "Vire o celular para a horizontal antes de fotografar o ECG."
      : "Celular na horizontal: enquadre toda a folha antes de aproximar cada derivação.";
  };
  function inspect() {
    if (!stream || !video.videoWidth) return;
    sample.width = 480; sample.height = Math.round(480 * video.videoHeight / video.videoWidth);
    ctx.drawImage(video, 0, 0, sample.width, sample.height);
    const pixels = ctx.getImageData(0, 0, sample.width, sample.height).data;
    const current = []; let light = 0, edges = 0, motion = 0, count = 0;
    for (let y = 2; y < sample.height - 2; y += 4) for (let x = 2; x < sample.width - 2; x += 4) {
      const i = (y * sample.width + x) * 4, j = i + 8;
      const gray = (pixels[i] * 299 + pixels[i + 1] * 587 + pixels[i + 2] * 114) / 1000;
      const neighbor = (pixels[j] * 299 + pixels[j + 1] * 587 + pixels[j + 2] * 114) / 1000;
      light += gray; edges += Math.abs(gray - neighbor);
      if (previous) motion += Math.abs(gray - previous[count]);
      current.push(gray); count++;
    }
    const brightness = light / count, texture = edges / count;
    const movement = previous ? motion / count : Infinity;
    previous = current; orient();
    const dimensions = `${video.videoWidth}×${video.videoHeight}px`;
    const resolutionOk = video.videoWidth >= 1600 && video.videoHeight >= 900;
    const usable = !portrait() && resolutionOk && brightness > 40 && brightness < 225 && texture > 3 && movement < 9;
    stable = usable ? Math.min(5, stable + 1) : 0;
    capture.disabled = stable < 5 || (phase === "detail" && !lead.value);
    quality.textContent = `Câmera ${dimensions} · luz ${Math.round(brightness)}/255 · detalhes ${texture.toFixed(1)} · movimento ${Number.isFinite(movement) ? movement.toFixed(1) : "…"}`;
    quality.className = `ecg-status${resolutionOk ? "" : " error"}`;
    if (portrait()) guidance.textContent = "Gire o celular para a horizontal.";
    else if (!resolutionOk) guidance.textContent = "Resolução insuficiente para esta captura. Tente a câmera principal do aparelho ou use uma foto de alta qualidade.";
    else if (brightness <= 40) guidance.textContent = "Aumente a iluminação.";
    else if (brightness >= 225) guidance.textContent = "Reduza o reflexo ou desligue a lanterna.";
    else if (texture <= 3) guidance.textContent = "Aguarde o foco ou ajuste a distância.";
    else if (movement >= 9) guidance.textContent = "Segure o celular firme.";
    else if (phase === "map") guidance.textContent = stable < 5 ? "Enquadre toda a folha e mantenha firme." : "Folha pronta para foto ampla.";
    else guidance.textContent = lead.value === "unknown" ? "Aproxime o traçado e mantenha o rótulo visível; a identidade ficará pendente." : lead.value ? `Aproxime ${lead.value}, mantendo o rótulo e o traçado visíveis.` : "Selecione a derivação ou marque como não identificada.";
  }
  async function frame() {
    const out = document.createElement("canvas");
    out.width = video.videoWidth; out.height = video.videoHeight;
    out.getContext("2d").drawImage(video, 0, 0);
    return new Promise(resolve => out.toBlob(resolve, "image/jpeg", .95));
  }
  start.addEventListener("click", async () => {
    if (!navigator.mediaDevices?.getUserMedia) { message("Câmera indisponível neste navegador. Use uma foto de alta qualidade.", "error"); return; }
    start.disabled = true;
    try {
      stream = await navigator.mediaDevices.getUserMedia({ video: {
        facingMode: { ideal: "environment" }, width: { ideal: 3840 }, height: { ideal: 2160 }, aspectRatio: { ideal: 16 / 9 }
      }, audio: false });
      video.srcObject = stream; await video.play();
      track = stream.getVideoTracks()[0];
      const capabilities = track.getCapabilities?.() || {};
      if (capabilities.focusMode?.includes("continuous")) {
        try { await track.applyConstraints({ advanced: [{ focusMode: "continuous" }] }); } catch (_) { /* Browser may reject focus control. */ }
      }
      torch.disabled = !capabilities.torch;
      stop.disabled = false; stable = 0; previous = null;
      orient(); message("Câmera aberta. Enquadre a folha inteira.", "ok");
      timer = setInterval(inspect, 200);
    } catch (_) {
      stream?.getTracks().forEach(t => t.stop()); stream = null; track = null;
      start.disabled = false; message("Câmera indisponível ou permissão negada. Use uma foto de alta qualidade.", "error");
    }
  });
  stop.addEventListener("click", () => {
    clearInterval(timer); timer = null; stream?.getTracks().forEach(t => t.stop());
    stream = null; track = null; video.srcObject = null; previous = null; stable = 0;
    start.disabled = false; stop.disabled = true; torch.disabled = true; capture.disabled = true;
    torch.textContent = "Ligar lanterna"; message("Câmera desligada.");
    guidance.textContent = "Abra a câmera para mapear o formato da folha.";
  });
  torch.addEventListener("click", async () => {
    if (!track?.getCapabilities?.().torch) return;
    const on = track.getSettings().torch === true;
    try { await track.applyConstraints({ advanced: [{ torch: !on }] }); torch.textContent = on ? "Ligar lanterna" : "Desligar lanterna"; }
    catch (_) { message("O aparelho não permitiu controlar a lanterna.", "error"); }
  });
  capture.addEventListener("click", async () => {
    if (capture.disabled || !video.videoWidth) return;
    capture.disabled = true;
    const blob = await frame();
    if (!blob) { message("Falha na foto. Tente novamente.", "error"); return; }
    if (phase === "map") {
      if (mapUrl) URL.revokeObjectURL(mapUrl);
      mapUrl = URL.createObjectURL(blob); preview.src = mapUrl;
      const estimate = window.LuriaEcgLayout.detect(ctx.getImageData(0, 0, sample.width, sample.height));
      layoutSelect.value = estimate.kind;
      layoutResult.textContent = estimate.kind === "stacked"
        ? `Possível formato: derivações longas empilhadas (${estimate.rows} faixas). Confirme abaixo.`
        : estimate.kind === "columns" ? `Possível formato: várias derivações por linha (${estimate.rows} faixas). Confirme abaixo.`
          : "Formato incerto. Confirme o arranjo visualmente; os rótulos ainda não são reconhecidos.";
      map.hidden = false;
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
      row.appendChild(link); captures.appendChild(row);
      message(`${lead.value} capturada no aparelho. Confira a foto e selecione a próxima derivação.`, "ok");
    }
    stable = 0; previous = null;
  });
  confirm.addEventListener("click", () => {
    phase = "detail"; stage.classList.add("is-detail"); leadField.hidden = false; confirm.hidden = true;
    capture.textContent = "Capturar derivação aproximada"; capture.disabled = true;
    message(`Formato confirmado: ${layoutSelect.selectedOptions[0].textContent}. Selecione a derivação visível.`, "ok");
  });
  lead.addEventListener("change", () => { capture.disabled = stable < 5 || !lead.value; });
  window.addEventListener("orientationchange", orient);
  orient();
})();
