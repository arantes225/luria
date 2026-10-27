(() => {
  "use strict";
  const video = document.getElementById("ecg-camera-video");
  const canvas = document.getElementById("ecg-camera-canvas");
  const start = document.getElementById("ecg-camera-start");
  const stop = document.getElementById("ecg-camera-stop");
  const torch = document.getElementById("ecg-camera-torch");
  const capture = document.getElementById("ecg-camera-capture");
  const status = document.getElementById("ecg-camera-status");
  const quality = document.getElementById("ecg-camera-quality");
  if (!video || !canvas || !start) return;

  let stream = null;
  let track = null;
  let timer = null;
  let stableFrames = 0;
  const ctx = canvas.getContext("2d", { willReadFrequently: true });
  const setStatus = (text, kind = "") => { status.textContent = text; status.className = "ecg-status" + (kind ? " " + kind : ""); };

  const inspectFrame = () => {
    if (!video.videoWidth || !video.videoHeight) return;
    canvas.width = 160; canvas.height = Math.max(90, Math.round(160 * video.videoHeight / video.videoWidth));
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    const data = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
    let sum = 0, variation = 0, previous = 0;
    for (let i = 0; i < data.length; i += 12) {
      const gray = (data[i] * 299 + data[i + 1] * 587 + data[i + 2] * 114) / 1000;
      sum += gray;
      variation += Math.abs(gray - previous);
      previous = gray;
    }
    const count = Math.ceil(data.length / 12);
    const brightness = sum / count;
    const texture = variation / count;
    const usable = brightness > 35 && brightness < 235 && texture > 3;
    stableFrames = usable ? stableFrames + 1 : 0;
    quality.textContent = "Luz " + Math.round(brightness) + "/255 · textura " + texture.toFixed(1) + " · " + (usable ? "quadro aproveitável" : "ajuste luz, distância ou foco");
    quality.className = "ecg-status " + (usable ? "ok" : "error");
    if (stableFrames >= 5) setStatus("Enquadramento estável. A confirmação automática de DII ainda não está habilitada.", "ok");
  };

  start.addEventListener("click", async () => {
    try {
      stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: { ideal: "environment" } }, audio: false });
      video.srcObject = stream; await video.play(); track = stream.getVideoTracks()[0];
      const caps = track.getCapabilities ? track.getCapabilities() : {};
      const settings = [];
      if (caps.focusMode) settings.push("foco");
      if (caps.zoom) settings.push("zoom");
      if (caps.torch) { settings.push("lanterna"); torch.disabled = false; }
      setStatus("Câmera local ativa. Nenhum quadro é enviado para a nuvem.", "ok");
      quality.textContent = "Recursos detectados: " + (settings.join(", ") || "básicos");
      start.disabled = true; stop.disabled = false; capture.disabled = false;
      timer = window.setInterval(inspectFrame, 200);
    } catch (error) {
      setStatus("Câmera indisponível ou permissão negada. Use o upload manual.", "error");
    }
  });
  stop.addEventListener("click", () => {
    window.clearInterval(timer); timer = null; stream?.getTracks().forEach(t => t.stop()); stream = null; track = null;
    video.srcObject = null; start.disabled = false; stop.disabled = true; capture.disabled = true; torch.disabled = true; stableFrames = 0;
    setStatus("Câmera desligada.", "");
  });
  torch.addEventListener("click", async () => {
    if (!track?.getCapabilities) return;
    const caps = track.getCapabilities(); if (!caps.torch) return;
    const current = track.getSettings().torch === true;
    try { await track.applyConstraints({ advanced: [{ torch: !current }] }); torch.textContent = current ? "Ligar lanterna" : "Desligar lanterna"; }
    catch (_) { setStatus("Este aparelho não permitiu controlar a lanterna.", "error"); }
  });
  capture.addEventListener("click", () => {
    if (!video.videoWidth) return;
    const out = document.createElement("canvas"); out.width = video.videoWidth; out.height = video.videoHeight;
    out.getContext("2d").drawImage(video, 0, 0); out.toBlob(blob => {
      if (!blob) return; const file = new File([blob], "ecg-camera-local.jpg", { type: "image/jpeg" });
      const transfer = new DataTransfer(); transfer.items.add(file);
      const input = document.getElementById("ecg-image"); if (input) { input.files = transfer.files; input.dispatchEvent(new Event("change", { bubbles: true })); }
      setStatus("Quadro capturado localmente. Revise a imagem antes de interpretar.", "ok");
    }, "image/jpeg", .92);
  });
})();