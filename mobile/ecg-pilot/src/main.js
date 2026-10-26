import "./style.css";
import { Capacitor } from "@capacitor/core";
import { Camera, CameraResultType, CameraSource } from "@capacitor/camera";

// Research-only image preview. No network API, inference, storage or patient diagnosis.
const $ = (id) => document.getElementById(id);
const capture = $("capture");
const gallery = $("gallery");
const webCamera = $("web-camera");
const webGallery = $("web-gallery");
const rotate = $("rotate");
const clear = $("clear");
const status = $("status");
const metrics = $("metrics");
const previewWrap = $("preview-wrap");
const canvas = $("preview");
const ctx = canvas.getContext("2d", { alpha: false, willReadFrequently: true });

const MAX_BYTES = 30 * 1024 * 1024;
const MAX_SIDE = 2600;
let image = null;
let originalUrl = null;
let rotation = 0;
let currentRequest = 0;

function setStatus(message, isError = false) {
  status.textContent = message;
  status.classList.toggle("error", isError);
}
function row(name, value) {
  const element = document.createElement("div");
  element.className = "row";
  const label = document.createElement("span");
  const result = document.createElement("strong");
  label.textContent = name;
  result.textContent = String(value);
  element.append(label, result);
  metrics.append(element);
}
function showPlaceholder() {
  metrics.replaceChildren();
  const placeholder = document.createElement("p");
  placeholder.className = "muted";
  placeholder.textContent = "Aguardando foto para avaliação preliminar.";
  metrics.append(placeholder);
}
function disposeUrl() {
  if (originalUrl) URL.revokeObjectURL(originalUrl);
  originalUrl = null;
}
function reset() {
  ++currentRequest;
  disposeUrl();
  image = null;
  rotation = 0;
  canvas.width = 0;
  canvas.height = 0;
  rotate.disabled = true;
  clear.disabled = true;
  previewWrap.hidden = true;
  webCamera.value = "";
  webGallery.value = "";
  showPlaceholder();
  setStatus("Imagem removida da visualização.");
}

function qualityCheck() {
  metrics.replaceChildren();
  const fmt = n => Math.round(n).toLocaleString("pt-BR");
  row("Resolução da imagem", fmt(image.naturalWidth) + " × " + fmt(image.naturalHeight) + " px");
  row("Resolução para prévia", fmt(canvas.width) + " × " + fmt(canvas.height) + " px");

  const probe = document.createElement("canvas");
  probe.width = Math.min(160, canvas.width);
  probe.height = Math.max(1, Math.round(canvas.height * probe.width / canvas.width));
  const probeCtx = probe.getContext("2d", { willReadFrequently: true });
  probeCtx.drawImage(canvas, 0, 0, probe.width, probe.height);
  const rgba = probeCtx.getImageData(0, 0, probe.width, probe.height).data;
  let sum = 0, sumSquares = 0, count = 0;
  for (let i = 0; i < rgba.length; i += 4) {
    const lum = 0.2126 * rgba[i] + 0.7152 * rgba[i + 1] + 0.0722 * rgba[i + 2];
    sum += lum;
    sumSquares += lum * lum;
    count++;
  }
  const average = count ? sum / count : 0;
  const sd = count ? Math.sqrt(Math.max(0, sumSquares / count - average * average)) : 0;
  row("Brilho médio (0–255)", average.toFixed(0));
  row("Variação tonal (estimativa)", sd.toFixed(0));

  const text = document.createElement("p");
  text.className = "muted";
  text.textContent = "Métricas simples: não comprovam nitidez, calibração, integridade das 12 derivações nem qualidade clínica.";
  metrics.append(text);
}
function drawImage() {
  if (!image || !ctx) return;
  const swap = rotation % 2 !== 0;
  const width = swap ? image.naturalHeight : image.naturalWidth;
  const height = swap ? image.naturalWidth : image.naturalHeight;
  const scale = Math.min(1, MAX_SIDE / Math.max(width, height));
  canvas.width = Math.max(1, Math.round(width * scale));
  canvas.height = Math.max(1, Math.round(height * scale));
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.save();
  ctx.translate(canvas.width / 2, canvas.height / 2);
  ctx.rotate(rotation * Math.PI / 2);
  ctx.drawImage(image,
    -image.naturalWidth * scale / 2,
    -image.naturalHeight * scale / 2,
    image.naturalWidth * scale,
    image.naturalHeight * scale
  );
  ctx.restore();
  previewWrap.hidden = false;
  qualityCheck();
}

async function loadBlob(blob) {
  if (!blob || !blob.type.startsWith("image/") || blob.size === 0) {
    setStatus("Selecione uma imagem válida.", true);
    return;
  }
  if (blob.size > MAX_BYTES) {
    setStatus("Imagem muito grande (máximo 30 MB).", true);
    return;
  }
  ++currentRequest;
  const request = currentRequest;
  disposeUrl();
  image = null;
  rotate.disabled = true;
  clear.disabled = false;
  previewWrap.hidden = true;
  showPlaceholder();
  setStatus("Carregando imagem no aparelho…");
  const url = URL.createObjectURL(blob);
  originalUrl = url;
  const candidate = new Image();
  candidate.onload = () => {
    if (request !== currentRequest) return;
    try {
      image = candidate;
      rotation = 0;
      drawImage();
      rotate.disabled = false;
      setStatus("Imagem pronta para conferência local. Nenhum diagnóstico foi gerado.");
    } catch {
      reset();
      setStatus("Não foi possível processar esta imagem.", true);
    }
  };
  candidate.onerror = () => {
    if (request !== currentRequest) return;
    reset();
    setStatus("Formato não suportado nesta instalação. Tente JPEG ou PNG.", true);
  };
  candidate.src = url;
}

async function selectNative(source) {
  try {
    setStatus("Abrindo " + (source === CameraSource.Camera ? "câmera" : "galeria") + "…");
    const result = await Camera.getPhoto({
      source,
      resultType: CameraResultType.Uri,
      quality: 90,
      correctOrientation: true,
      allowEditing: false,
      saveToGallery: false
    });
    if (!result.webPath) throw new Error("A câmera não retornou imagem.");
    // Capacitor may create an OS-managed temporary photo file. The LURIA
    // app does not persist it or upload it.
    const response = await fetch(result.webPath);
    if (!response.ok) throw new Error("Não foi possível abrir a foto.");
    await loadBlob(await response.blob());
  } catch (error) {
    const message = String(error?.message || error);
    if (/cancel|cancell|user cancelled|no image/i.test(message)) {
      setStatus("Captura cancelada.");
    } else {
      setStatus("Não foi possível abrir a imagem: " + message, true);
    }
  }
}

capture.addEventListener("click", () => {
  if (Capacitor.isNativePlatform()) void selectNative(CameraSource.Camera);
  else webCamera.click();
});
gallery.addEventListener("click", () => {
  if (Capacitor.isNativePlatform()) void selectNative(CameraSource.Photos);
  else webGallery.click();
});
webCamera.addEventListener("change", () => {
  if (webCamera.files?.[0]) void loadBlob(webCamera.files[0]);
  webCamera.value = "";
});
webGallery.addEventListener("change", () => {
  if (webGallery.files?.[0]) void loadBlob(webGallery.files[0]);
  webGallery.value = "";
});
rotate.addEventListener("click", () => {
  if (!image) return;
  rotation = (rotation + 1) % 4;
  try { drawImage(); }
  catch { setStatus("Falha ao girar a imagem.", true); }
});
clear.addEventListener("click", reset);
window.addEventListener("pagehide", disposeUrl);
showPlaceholder();
