(() => {
  "use strict";
  const $ = id => document.getElementById(id);
  const camera = $("camera-input");
  const gallery = $("gallery-input");
  const canvas = $("preview");
  const previewWrap = $("preview-wrap");
  const quality = $("quality");
  const status = $("status");
  const rotate = $("rotate");
  const remove = $("remove");
  const context = canvas.getContext("2d", { alpha: false, willReadFrequently: true });
  const MAX_BYTES = 30 * 1024 * 1024;
  const MAX_SIDE = 2600;
  let image = null;
  let turn = 0;
  let currentURL = null;
  let generation = 0;

  function setStatus(text, error = false) {
    status.textContent = text;
    status.classList.toggle("error", error);
  }
  function clearMetrics() {
    quality.replaceChildren();
    const text = document.createElement("p");
    text.className = "muted";
    text.textContent = "Nenhuma análise de qualidade disponível. A fotografia não será interpretada.";
    quality.append(text);
  }
  function addMetric(label, value) {
    const row = document.createElement("div");
    const left = document.createElement("span");
    const right = document.createElement("strong");
    row.className = "metric";
    left.textContent = label;
    right.textContent = String(value);
    row.append(left, right);
    quality.append(row);
  }
  function releaseUrl() {
    if (currentURL) URL.revokeObjectURL(currentURL);
    currentURL = null;
  }
  function reset() {
    generation++;
    releaseUrl();
    image = null;
    turn = 0;
    canvas.width = 0;
    canvas.height = 0;
    previewWrap.classList.remove("ready");
    rotate.disabled = true;
    remove.disabled = true;
    camera.value = "";
    gallery.value = "";
    clearMetrics();
    setStatus("Nenhuma imagem selecionada.");
  }

  function inspect(imageWidth, imageHeight) {
    quality.replaceChildren();
    const fmt = n => Math.round(n).toLocaleString("pt-BR");
    addMetric("Resolução original", fmt(imageWidth) + " × " + fmt(imageHeight) + " px");
    addMetric("Prévia local", fmt(canvas.width) + " × " + fmt(canvas.height) + " px");
    const probe = document.createElement("canvas");
    const probeWidth = Math.min(160, canvas.width);
    const probeHeight = Math.max(1, Math.round(canvas.height * probeWidth / canvas.width));
    probe.width = probeWidth;
    probe.height = probeHeight;
    const ctx = probe.getContext("2d", { willReadFrequently: true });
    ctx.drawImage(canvas, 0, 0, probeWidth, probeHeight);
    const data = ctx.getImageData(0, 0, probeWidth, probeHeight).data;
    let count = 0, sum = 0, squares = 0;
    for (let i = 0; i < data.length; i += 4) {
      const value = 0.2126 * data[i] + 0.7152 * data[i + 1] + 0.0722 * data[i + 2];
      count++;
      sum += value;
      squares += value * value;
    }
    const mean = count ? sum / count : 0;
    const deviation = count ? Math.sqrt(Math.max(0, squares / count - mean * mean)) : 0;
    addMetric("Brilho médio (0–255)", mean.toFixed(0));
    addMetric("Variação tonal (estimativa)", deviation.toFixed(0));
    const note = document.createElement("p");
    note.className = "muted";
    note.textContent = "Esses números são apenas diagnósticos da imagem. Não detectam adequadamente nitidez, derivações, calibração nem correção do traçado.";
    quality.append(note);
    if (Math.max(canvas.width, canvas.height) < 1100) {
      const warn = document.createElement("p");
      warn.className = "alert";
      warn.textContent = "A imagem tem poucos pixels para uma folha de ECG. Considere fotografar novamente com boa luz e mais perto.";
      quality.append(warn);
    }
  }

  function render() {
    if (!image || !context) return;
    const turns = turn % 4;
    const swap = turns % 2 !== 0;
    const rawWidth = swap ? image.naturalHeight : image.naturalWidth;
    const rawHeight = swap ? image.naturalWidth : image.naturalHeight;
    const scale = Math.min(1, MAX_SIDE / Math.max(rawWidth, rawHeight));
    canvas.width = Math.max(1, Math.round(rawWidth * scale));
    canvas.height = Math.max(1, Math.round(rawHeight * scale));
    context.fillStyle = "#ffffff";
    context.fillRect(0, 0, canvas.width, canvas.height);
    context.save();
    context.translate(canvas.width / 2, canvas.height / 2);
    context.rotate(turns * Math.PI / 2);
    const scaledWidth = image.naturalWidth * scale;
    const scaledHeight = image.naturalHeight * scale;
    context.drawImage(image, -scaledWidth / 2, -scaledHeight / 2, scaledWidth, scaledHeight);
    context.restore();
    previewWrap.classList.add("ready");
    inspect(image.naturalWidth, image.naturalHeight);
  }

  function selectFile(file) {
    if (!file) return;
    if (file.size > MAX_BYTES) {
      reset();
      setStatus("Arquivo acima de 30 MB. Selecione uma imagem menor.", true);
      return;
    }
    if (!file.type.startsWith("image/")) {
      reset();
      setStatus("Selecione uma fotografia ou imagem válida.", true);
      return;
    }

    generation++;
    const request = generation;
    releaseUrl();
    image = null;
    rotate.disabled = true;
    remove.disabled = false;
    previewWrap.classList.remove("ready");
    clearMetrics();
    setStatus("Abrindo a imagem no próprio aparelho…");

    const url = URL.createObjectURL(file);
    currentURL = url;
    const candidate = new Image();
    candidate.onload = () => {
      if (request !== generation) return;
      releaseUrl();
      image = candidate;
      turn = 0;
      try {
        render();
        rotate.disabled = false;
        setStatus("Foto carregada localmente. Confira o traçado completo e as informações de calibração.");
      } catch (error) {
        reset();
        setStatus("Não foi possível preparar a imagem neste aparelho.", true);
      }
    };
    candidate.onerror = () => {
      if (request !== generation) return;
      reset();
      setStatus("Formato de imagem incompatível. Tente uma foto JPEG ou PNG.", true);
    };
    candidate.src = url;
  }

  camera.addEventListener("change", () => {
    const file = camera.files && camera.files[0];
    if (file) selectFile(file);
    camera.value = "";
  });
  gallery.addEventListener("change", () => {
    const file = gallery.files && gallery.files[0];
    if (file) selectFile(file);
    gallery.value = "";
  });
  rotate.addEventListener("click", () => {
    if (!image) return;
    turn = (turn + 1) % 4;
    render();
  });
  remove.addEventListener("click", reset);
  clearMetrics();
})();