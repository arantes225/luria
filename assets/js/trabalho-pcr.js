(() => {
  const startedAt = Date.now();
  let mode = "adult";
  let selectedRhythm = null;
  let shockable = false;
  let shockCount = 0;
  let metronomeOn = true;
  let audioReady = false;
  let audioCtx = null;
  let beatTimer = null;
  let lastCycle = 1;
  const BPM = 110;
  const beatMs = Math.round(60000 / BPM);

  const $ = (id) => document.getElementById(id);
  const timerEl = $("pcr-timer");
  const cycleEl = $("pcr-cycle");
  const weightEl = $("pcr-weight");
  const drugsEl = $("pcr-drugs");
  const shockBtn = $("pcr-shock");
  const rhythmState = $("pcr-rhythm-state");
  const energyEl = $("pcr-energy");
  const energyNoteEl = $("pcr-energy-note");
  const shockCountEl = $("pcr-shock-count");
  const metroBtn = $("pcr-metronome");
  const doseModeEl = $("pcr-dose-mode");
  const ventilationEl = $("pcr-ventilation-copy");
  const logEl = $("pcr-log");
  const causesDialog = $("pcr-causes-dialog");
  const noteDialog = $("pcr-note-dialog");
  const pedsCauseNote = $("pcr-peds-cause-note");

  function elapsedSeconds() {
    return Math.max(0, Math.floor((Date.now() - startedAt) / 1000));
  }

  function mmss(total) {
    const m = String(Math.floor(total / 60)).padStart(2, "0");
    const s = String(total % 60).padStart(2, "0");
    return m + ":" + s;
  }

  function clockNow() {
    return new Intl.DateTimeFormat("pt-BR", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit"
    }).format(new Date());
  }

  function addLog(action, detail = "") {
    const empty = logEl.querySelector(".pcr-log-empty");
    if (empty) empty.remove();

    const item = document.createElement("div");
    item.className = "pcr-log-item";

    const time = document.createElement("time");
    time.textContent = clockNow();

    const elapsed = document.createElement("small");
    elapsed.textContent = "+" + mmss(elapsedSeconds());

    const copy = document.createElement("div");
    const strong = document.createElement("strong");
    strong.textContent = action;
    copy.appendChild(strong);
    if (detail) {
      const small = document.createElement("small");
      small.style.display = "block";
      small.style.marginTop = "2px";
      small.textContent = detail;
      copy.appendChild(small);
    }

    item.append(time, elapsed, copy);
    logEl.prepend(item);
  }

  function safeWeight() {
    const n = Number(weightEl.value);
    return Number.isFinite(n) && n > 0 ? n : null;
  }

  function doseText() {
    const w = safeWeight();

    if (mode === "pediatric") {
      const epi = w ? Math.min(w * 0.01, 1).toFixed(w * 0.01 < 1 ? 2 : 1) + " mg" : "0,01 mg/kg (máx. 1 mg)";
      const amioRaw = w ? w * 5 : null;
      const amio = w ? Math.min(amioRaw, 300).toFixed(0) + " mg" : "5 mg/kg (máx. 300 mg)";
      const lido = w ? (w * 1).toFixed(1) + " mg" : "1 mg/kg";

      return [
        {
          name: "Adrenalina",
          dose: epi + " IV/IO",
          note: "Repetir a cada 3–5 min.",
          danger: true,
          action: "Adrenalina"
        },
        {
          name: "Amiodarona",
          dose: amio + " IV/IO",
          note: "FV/TV sem pulso refratária. Pode repetir conforme algoritmo.",
          action: "Amiodarona"
        },
        {
          name: "Lidocaína",
          dose: lido + " IV/IO",
          note: "Alternativa à amiodarona em FV/TV sem pulso.",
          action: "Lidocaína"
        }
      ];
    }

    const lido1 = w ? (w * 1).toFixed(0) + "–" + (w * 1.5).toFixed(0) + " mg" : "1–1,5 mg/kg";
    const lido2 = w ? (w * 0.5).toFixed(0) + "–" + (w * 0.75).toFixed(0) + " mg" : "0,5–0,75 mg/kg";

    return [
      {
        name: "Adrenalina",
        dose: "1 mg IV/IO",
        note: "Repetir a cada 3–5 min.",
        danger: true,
        action: "Adrenalina"
      },
      {
        name: "Amiodarona",
        dose: shockCount >= 2 ? "150 mg IV/IO" : "300 mg IV/IO",
        note: shockCount >= 2 ? "Segunda dose para FV/TV sem pulso refratária." : "Primeira dose para FV/TV sem pulso refratária.",
        action: "Amiodarona"
      },
      {
        name: "Lidocaína",
        dose: lido1 + " IV/IO",
        note: "Dose inicial. Repetição: " + lido2 + ".",
        action: "Lidocaína"
      }
    ];
  }

  function renderDrugs() {
    doseModeEl.textContent = mode === "adult" ? "Adulto" : "Pediátrico";
    drugsEl.innerHTML = "";

    doseText().forEach((drug) => {
      const card = document.createElement("article");
      card.className = "pcr-drug-card" + (drug.danger ? " danger" : "");

      const header = document.createElement("header");
      const h3 = document.createElement("h3");
      h3.textContent = drug.name;
      const dose = document.createElement("strong");
      dose.textContent = drug.dose;
      header.append(h3, dose);

      const p = document.createElement("p");
      p.textContent = drug.note;

      const btn = document.createElement("button");
      btn.type = "button";
      btn.textContent = "Administrar / registrar";
      btn.addEventListener("click", () => {
        addLog(drug.action, drug.dose);
      });

      card.append(header, p, btn);
      drugsEl.appendChild(card);
    });
  }

  function updateEnergy() {
    const w = safeWeight();

    if (mode === "adult") {
      energyEl.textContent = "Bifásico: recomendação do fabricante";
      energyNoteEl.textContent = "Se desconhecida, usar a máxima disponível; monopásico: 360 J.";
      return;
    }

    const dose = shockCount === 0 ? 2 : shockCount === 1 ? 4 : 4;
    if (!w) {
      energyEl.textContent = dose + " J/kg";
      energyNoteEl.textContent = shockCount < 2 ? "Choque pediátrico." : "Subsequentes ≥4 J/kg; máx. 10 J/kg ou dose adulta.";
      return;
    }

    const joules = Math.round(w * dose);
    const cap = Math.round(w * 10);
    energyEl.textContent = joules + " J (" + dose + " J/kg)";
    energyNoteEl.textContent = shockCount < 2 ? "Calculado para " + w + " kg." : "Subsequentes ≥4 J/kg; teto " + cap + " J ou dose adulta.";
  }

  function updateTimer() {
    const elapsed = elapsedSeconds();
    timerEl.textContent = mmss(elapsed);

    const cycle = Math.floor(elapsed / 120) + 1;
    const inside = elapsed % 120;
    const remain = 120 - inside;
    cycleEl.textContent = "Ciclo " + cycle + " · " + mmss(remain === 120 ? 120 : remain);

    if (cycle !== lastCycle) {
      lastCycle = cycle;
      addLog("Reavaliar ritmo / trocar compressor", "Novo ciclo de 2 minutos");
      if (audioReady && metronomeOn) {
        beep(880, 0.08);
        setTimeout(() => beep(880, 0.08), 130);
        setTimeout(() => beep(880, 0.08), 260);
      }
    }
  }

  function beep(freq = 650, duration = 0.035) {
    if (!audioCtx) return;
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.frequency.value = freq;
    gain.gain.setValueAtTime(0.0001, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.12, audioCtx.currentTime + 0.005);
    gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + duration);
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    osc.start();
    osc.stop(audioCtx.currentTime + duration + 0.01);
  }

  function tickMetronome() {
    if (!metronomeOn) return;
    metroBtn.classList.add("tick");
    setTimeout(() => metroBtn.classList.remove("tick"), 100);
    if (audioReady) beep(620, 0.03);
  }

  function startMetronomeLoop() {
    clearInterval(beatTimer);
    beatTimer = setInterval(tickMetronome, beatMs);
  }

  async function unlockAudio() {
    if (audioReady) return;
    try {
      const Ctx = window.AudioContext || window.webkitAudioContext;
      if (!Ctx) return;
      audioCtx = audioCtx || new Ctx();
      await audioCtx.resume();
      audioReady = audioCtx.state === "running";
      if (audioReady) {
        metroBtn.querySelector("small").textContent = "110 bpm · som ativo";
        beep(620, 0.04);
      }
    } catch {}
  }

  function setMode(next) {
    mode = next;
    document.querySelectorAll("[data-pcr-mode]").forEach((btn) => {
      btn.classList.toggle("active", btn.dataset.pcrMode === next);
    });
    pedsCauseNote.hidden = next !== "pediatric";
    ventilationEl.textContent = next === "adult"
      ? "1 ventilação a cada 6 s com compressões contínuas."
      : "Com via aérea avançada: 1 ventilação a cada 2–3 s com compressões contínuas.";
    renderDrugs();
    updateEnergy();
    addLog("Modo alterado", next === "adult" ? "Adulto" : "Pediátrico");
  }

  function selectRhythm(button) {
    document.querySelectorAll(".pcr-rhythm").forEach((b) => b.classList.remove("selected"));
    button.classList.add("selected");
    selectedRhythm = button.dataset.rhythm;
    shockable = button.dataset.shockable === "true";
    rhythmState.textContent = shockable ? "Chocável" : "Não chocável";
    rhythmState.className = "pcr-state " + (shockable ? "shock" : "no-shock");
    shockBtn.disabled = !shockable;
    addLog("Ritmo", selectedRhythm + " · " + (shockable ? "chocável" : "não chocável"));
  }

  document.querySelectorAll("[data-pcr-mode]").forEach((button) => {
    button.addEventListener("click", () => setMode(button.dataset.pcrMode));
  });

  document.querySelectorAll(".pcr-rhythm").forEach((button) => {
    button.addEventListener("click", () => selectRhythm(button));
  });

  document.querySelectorAll(".team-position").forEach((button) => {
    button.addEventListener("click", () => addLog("Posição / tarefa", button.dataset.action));
  });

  document.querySelectorAll("[data-log-action]").forEach((button) => {
    button.addEventListener("click", () => addLog(button.dataset.logAction));
  });

  weightEl.addEventListener("input", () => {
    renderDrugs();
    updateEnergy();
  });

  shockBtn.disabled = true;
  shockBtn.addEventListener("click", () => {
    if (!shockable) return;
    const energy = energyEl.textContent;
    shockCount += 1;
    shockCountEl.textContent = shockCount + (shockCount === 1 ? " choque registrado" : " choques registrados");
    addLog("Choque · Desfibrilador", selectedRhythm + " · " + energy);
    updateEnergy();
    renderDrugs();
  });

  metroBtn.addEventListener("click", async () => {
    await unlockAudio();
    metronomeOn = !metronomeOn;
    metroBtn.classList.toggle("active", metronomeOn);
    metroBtn.setAttribute("aria-pressed", String(metronomeOn));
    metroBtn.querySelector("small").textContent = metronomeOn
      ? (audioReady ? "110 bpm · som ativo" : "110 bpm · toque para ativar som")
      : "Pausado";
    addLog("Metrônomo", metronomeOn ? "110 bpm ativado" : "Pausado");
  });

  $("pcr-log-cpr").addEventListener("click", () => addLog("Troca de compressor", "Novo compressor assumiu RCP"));
  $("pcr-rosc").addEventListener("click", () => addLog("RCE / ROSC", "Retorno da circulação espontânea"));

  $("pcr-causes").addEventListener("click", () => causesDialog.showModal());
  document.querySelectorAll("[data-cause]").forEach((button) => {
    button.addEventListener("click", () => {
      button.classList.toggle("checked");
      addLog("Causa reversível avaliada", button.dataset.cause);
    });
  });

  $("pcr-add-note").addEventListener("click", () => noteDialog.showModal());
  $("pcr-note-save").addEventListener("click", (event) => {
    const text = $("pcr-note-text").value.trim();
    if (!text) {
      event.preventDefault();
      return;
    }
    addLog("Observação", text);
    $("pcr-note-text").value = "";
  });

  $("pcr-clear-log").addEventListener("click", () => {
    logEl.innerHTML = '<div class="pcr-log-empty">Nenhum evento registrado após a limpeza.</div>';
  });

  document.addEventListener("pointerdown", unlockAudio, { once: true });

  renderDrugs();
  updateEnergy();
  addLog("Início da PCR", "Cronômetro iniciado automaticamente");
  updateTimer();
  setInterval(updateTimer, 1000);
  startMetronomeLoop();
})();