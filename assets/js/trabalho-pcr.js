(async () => {
  const store = window.LuriaPCRStore;
  let owner;
  try { owner = await store.user(); } catch {
    location.replace("/login/?next=" + encodeURIComponent("/trabalho/pcr/executar/"));
    return;
  }
  const draft = store.readDraft(owner.id);
  const recordId = draft?.id || crypto.randomUUID();
  const patientId = draft?.patient_id || crypto.randomUUID();
  const startedAt = draft ? new Date(draft.started_at).getTime() : Date.now();
  let stoppedAt = draft?.ended_at ? new Date(draft.ended_at).getTime() : null;
  let saving = false;
  let mode = draft?.mode || "adult";
  let selectedRhythm = draft?.rhythm || null;
  let shockable = false;
  let shockCount = draft?.shock_count || 0;
  let adultAmiodaroneDoses = draft?.adult_amiodarone_doses || 0;
  let metronomeOn = !stoppedAt;
  let audioReady = false;
  let audioCtx = null;
  let audioEl = null;
  let audioUnlocked = false;
  let beatTimer = null;
  let lastCycle = 1;
  const BPM = 110;
  const timelineEntries = draft?.events ? [...draft.events] : [];
  const beatMs = Math.round(60000 / BPM);

  const $ = (id) => document.getElementById(id);
  const timerEl = $("pcr-timer");
  const cycleEl = $("pcr-cycle");
  const weightEl = $("pcr-weight");
  const drugsEl = $("pcr-drugs");
  const shockBtn = $("pcr-shock");
  const rhythmState = $("pcr-rhythm-state");
  const selectedRhythmLabel = $("pcr-selected-rhythm-label");
  const pwaWorkspace = document.querySelector(".pcr-workspace");
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
  const pwaCauseNote = $("pcr-pwa-peds-cause-note");
  document.querySelector(".pcr-pwa-causes-host").appendChild(
    causesDialog.querySelector(".pcr-causes-grid").cloneNode(true)
  );
  pwaCauseNote.textContent = pedsCauseNote.textContent;

  function elapsedSeconds() {
    const end = stoppedAt || Date.now();
    return Math.max(0, Math.floor((end - startedAt) / 1000));
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

  function renderEntry(entry) {
    logEl.querySelector(".pcr-log-empty")?.remove();
    const item = document.createElement("div");
    item.className = "pcr-log-item";
    const time = document.createElement("time"); time.textContent = entry.clock;
    const elapsed = document.createElement("small"); elapsed.textContent = entry.elapsed;
    const copy = document.createElement("div");
    const strong = document.createElement("strong"); strong.textContent = entry.action;
    copy.append(strong);
    if (entry.detail) {
      const detail = document.createElement("small"); detail.textContent = entry.detail;
      detail.style.display = "block"; copy.append(detail);
    }
    item.append(time, elapsed, copy); logEl.prepend(item);
  }

  function payload() {
    return {
      id: recordId, patient_id: patientId, user_id: owner.id,
      initials: $("pcr-patient-initials").value.trim().toUpperCase(),
      birth_date: $("pcr-patient-birth").value || null,
      care_info: $("pcr-care-info").value.trim(),
      started_at: new Date(startedAt).toISOString(),
      ended_at: stoppedAt ? new Date(stoppedAt).toISOString() : null,
      mode, weight: safeWeight(), shock_count: shockCount, rhythm: selectedRhythm,
      adult_amiodarone_doses: adultAmiodaroneDoses, events: [...timelineEntries]
    };
  }

  function persistDraft() {
    try { store.writeDraft(owner.id, payload()); return true; }
    catch (error) {
      $("pcr-save-status").textContent = "Não foi possível guardar uma cópia no aparelho. Mantenha esta página aberta e tente salvar novamente.";
      console.warn("Rascunho da PCR:", error);
      return false;
    }
  }

  function addLog(action, detail = "") {
    if (stoppedAt && action !== "RCE / ROSC" && action !== "Linha do tempo exportada") return;
    const entry = {clock:clockNow(),elapsed:"+"+mmss(elapsedSeconds()),action,detail};
    timelineEntries.unshift(entry); renderEntry(entry); persistDraft();
  }

  function freezeControls() {
    document.querySelectorAll('[data-pcr-mode],.pcr-rhythm,.team-position,[data-log-action],[data-cause],#pcr-drugs button,#pcr-shock,#pcr-log-cpr,#pcr-clear-log,#pcr-add-note').forEach(button => { button.disabled = true; });
  }

  async function saveAndOpenHistory() {
    if (saving) return;
    saving = true;
    const btn = $("pcr-rosc");
    btn.disabled = true; btn.textContent = "Salvando PCR…";
    $("pcr-save-status").textContent = "Salvando seu atendimento…";
    persistDraft();
    try {
      await store.save(payload());
      location.assign("/trabalho/pcr/historico/?record=" + encodeURIComponent(recordId));
    } catch (error) {
      $("pcr-save-status").textContent = "Não foi possível salvar: " + error.message + ". A linha do tempo continua nesta página. Tente novamente.";
      btn.disabled = false; btn.textContent = "Tentar salvar novamente";
    } finally { saving = false; }
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
        dose: adultAmiodaroneDoses >= 1 ? "150 mg IV/IO" : "300 mg IV/IO",
        note: adultAmiodaroneDoses >= 1 ? "2ª dose: 150 mg para FV/TV sem pulso refratária." : "1ª dose: 300 mg para FV/TV sem pulso refratária.",
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
        if (mode === "adult" && drug.action === "Amiodarona") {
          if (adultAmiodaroneDoses === 0) {
            adultAmiodaroneDoses = 1;
            renderDrugs(); persistDraft();
          } else if (adultAmiodaroneDoses === 1) {
            adultAmiodaroneDoses = 2;
            renderDrugs(); persistDraft();
          }
        }
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

    if (!stoppedAt && cycle !== lastCycle) {
      lastCycle = cycle;
      addLog("Reavaliar ritmo / trocar compressor", "Novo ciclo de 2 minutos");
      if (audioReady && metronomeOn) {
        beep(880, 0.08);
        setTimeout(() => beep(880, 0.08), 130);
        setTimeout(() => beep(880, 0.08), 260);
      }
    }
  }

  function makeBeepWavDataUri(freq = 880, durationMs = 55, volume = 0.45) {
    const sampleRate = 22050;
    const samples = Math.max(1, Math.floor(sampleRate * (durationMs / 1000)));
    const bytesPerSample = 2;
    const dataSize = samples * bytesPerSample;
    const buffer = new ArrayBuffer(44 + dataSize);
    const view = new DataView(buffer);
    const writeString = (offset, str) => {
      for (let i = 0; i < str.length; i++) view.setUint8(offset + i, str.charCodeAt(i));
    };
    writeString(0, "RIFF");
    view.setUint32(4, 36 + dataSize, true);
    writeString(8, "WAVE");
    writeString(12, "fmt ");
    view.setUint32(16, 16, true);
    view.setUint16(20, 1, true);
    view.setUint16(22, 1, true);
    view.setUint32(24, sampleRate, true);
    view.setUint32(28, sampleRate * bytesPerSample, true);
    view.setUint16(32, bytesPerSample, true);
    view.setUint16(34, 16, true);
    writeString(36, "data");
    view.setUint32(40, dataSize, true);
    for (let i = 0; i < samples; i++) {
      const t = i / sampleRate;
      const env = Math.max(0, 1 - i / samples);
      const sample = Math.sin(2 * Math.PI * freq * t) * env * volume;
      view.setInt16(44 + i * 2, Math.max(-1, Math.min(1, sample)) * 0x7fff, true);
    }
    let binary = "";
    const bytes = new Uint8Array(buffer);
    for (let i = 0; i < bytes.length; i++) binary += String.fromCharCode(bytes[i]);
    return "data:audio/wav;base64," + btoa(binary);
  }

  function ensureAudioElement() {
    if (audioEl) return audioEl;
    audioEl = new Audio(makeBeepWavDataUri(900, 65, 0.7));
    audioEl.preload = "auto";
    audioEl.playsInline = true;
    audioEl.setAttribute("playsinline", "");
    audioEl.setAttribute("webkit-playsinline", "");
    return audioEl;
  }

  async function playHtmlBeep() {
    const el = ensureAudioElement();
    try {
      el.currentTime = 0;
    } catch {}
    try {
      await el.play();
      audioUnlocked = true;
      return true;
    } catch (error) {
      console.warn("HTMLAudio beep bloqueado:", error);
      return false;
    }
  }

  function beep(freq = 760, duration = 0.05) {
    if (stoppedAt) return;
    if (audioUnlocked && audioEl) {
      try {
        audioEl.currentTime = 0;
        const p = audioEl.play();
        if (p?.catch) p.catch(() => {});
        return;
      } catch {}
    }

    if (!audioCtx || audioCtx.state !== "running") return;
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.type = "square";
    osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
    gain.gain.setValueAtTime(0.0001, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.25, audioCtx.currentTime + 0.004);
    gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + duration);
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    osc.start(audioCtx.currentTime);
    osc.stop(audioCtx.currentTime + duration + 0.015);
  }

  function tickMetronome() {
    if (!metronomeOn || stoppedAt) return;
    metroBtn.classList.add("tick");
    setTimeout(() => metroBtn.classList.remove("tick"), 100);
    if (audioReady) beep(620, 0.03);
  }

  function startMetronomeLoop() {
    clearInterval(beatTimer);
    beatTimer = setInterval(tickMetronome, beatMs);
  }

  async function unlockAudio() {
    if (stoppedAt) return false;
    let htmlOk = false;
    let ctxOk = false;

    // Most reliable path on iOS/PWA: explicitly play a real audio element
    // during the user's tap gesture.
    try {
      htmlOk = await playHtmlBeep();
    } catch {}

    // Keep WebAudio as secondary fallback.
    try {
      const Ctx = window.AudioContext || window.webkitAudioContext;
      if (Ctx) {
        if (!audioCtx || audioCtx.state === "closed") audioCtx = new Ctx();
        if (audioCtx.state === "suspended") await audioCtx.resume();
        ctxOk = audioCtx.state === "running";
      }
    } catch (error) {
      console.warn("WebAudio indisponível:", error);
    }

    audioReady = htmlOk || ctxOk;

    if (stoppedAt) { audioEl?.pause(); return false; }
    if (audioReady) {
      metroBtn.querySelector("small").textContent = "110 bpm · som ativo";
      if (htmlOk) {
        // second immediate audible confirmation
        setTimeout(() => {
          if (stoppedAt) return;
          try {
            audioEl.currentTime = 0;
            audioEl.play().catch(() => {});
          } catch {}
        }, 140);
      } else {
        beep(760, 0.06);
        setTimeout(() => beep(620, 0.05), 140);
      }
    }

    return audioReady;
  }

  function setMode(next) {
    mode = next;
    document.querySelectorAll("[data-pcr-mode]").forEach((btn) => {
      btn.classList.toggle("active", btn.dataset.pcrMode === next);
    });
    pedsCauseNote.hidden = next !== "pediatric";
    pwaCauseNote.hidden = next !== "pediatric";
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
    selectedRhythmLabel.textContent = selectedRhythm;
    shockBtn.disabled = !shockable;
    addLog("Ritmo", selectedRhythm + " · " + (shockable ? "chocável" : "não chocável"));
    if (document.documentElement.classList.contains("pwa-standalone")) setPwaPanel("closed");
  }

  function setPwaPanel(panel) {
    pwaWorkspace.dataset.pwaPanel = panel;
    document.querySelectorAll("[data-pcr-panel]").forEach((button) => {
      const open = button.dataset.pcrPanel === panel;
      button.classList.toggle("active", open);
      button.setAttribute("aria-expanded", String(open));
    });
  }

  document.querySelectorAll("[data-pcr-panel]").forEach((button) => {
    button.addEventListener("click", () => {
      setPwaPanel(pwaWorkspace.dataset.pwaPanel === button.dataset.pcrPanel ? "closed" : button.dataset.pcrPanel);
    });
  });

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
    if (stoppedAt) return;
    if (!audioReady) {
      metronomeOn = true;
      metroBtn.classList.add("active");
      metroBtn.setAttribute("aria-pressed", "true");
      metroBtn.querySelector("small").textContent = "Ativando áudio do iPhone…";

      const ok = await unlockAudio();

      if (ok) {
        tickMetronome();
        addLog("Metrônomo", "110 bpm · som ativado");
      } else {
        metroBtn.querySelector("small").textContent = "Toque novamente para ativar o som";
        addLog("Metrônomo", "Falha ao ativar áudio");
      }
      return;
    }

    metronomeOn = !metronomeOn;
    metroBtn.classList.toggle("active", metronomeOn);
    metroBtn.setAttribute("aria-pressed", String(metronomeOn));
    metroBtn.querySelector("small").textContent = metronomeOn
      ? "110 bpm · som ativo"
      : "Pausado";

    if (metronomeOn) {
      if (audioCtx?.state === "suspended") {
        try { await audioCtx.resume(); } catch {}
      }
      tickMetronome();
    }

    addLog("Metrônomo", metronomeOn ? "110 bpm ativado" : "Pausado");
  });

  $("pcr-log-cpr").addEventListener("click", () => addLog("Troca de compressor", "Novo compressor assumiu RCP"));
  $("pcr-rosc").addEventListener("click", async () => {
    if (!stoppedAt) {
      stoppedAt = Date.now();
      freezeControls();
      metronomeOn = false;
      clearInterval(beatTimer);
      audioEl?.pause();
      if (audioCtx?.state === "running") audioCtx.suspend().catch(() => {});
      metroBtn.classList.remove("active"); metroBtn.disabled = true;
      metroBtn.setAttribute("aria-pressed", "false");
      metroBtn.querySelector("small").textContent = "Pausado após RCE / ROSC";
      addLog("RCE / ROSC", "Retorno da circulação espontânea · cronômetro pausado");
      updateTimer();
    }
    await saveAndOpenHistory();
  });

  $("pcr-causes").addEventListener("click", () => causesDialog.showModal());
  document.querySelectorAll("[data-cause]").forEach((button) => {
    button.addEventListener("click", () => {
      const checked = !button.classList.contains("checked");
      document.querySelectorAll("[data-cause]").forEach((causeButton) => {
        if (causeButton.dataset.cause === button.dataset.cause) {
          causeButton.classList.toggle("checked", checked);
          causeButton.setAttribute("aria-pressed", String(checked));
        }
      });
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
    if (stoppedAt || !confirm("Limpar os eventos da linha do tempo?")) return;
    timelineEntries.length = 0;
    persistDraft();
    logEl.innerHTML = '<div class="pcr-log-empty">Nenhum evento registrado após a limpeza.</div>';
  });

  $("pcr-export-log").addEventListener("click", () => {
    try {
      const record = payload();
      store.pdf(record, record);
    } catch (error) { $("pcr-save-status").textContent = error.message; }
  });

  $("pcr-patient-initials").value = draft?.initials || "";
  $("pcr-patient-birth").value = draft?.birth_date || "";
  $("pcr-care-info").value = draft?.care_info || "";
  weightEl.value = draft?.weight || "";
  ["pcr-patient-initials","pcr-patient-birth","pcr-care-info","pcr-weight"].forEach(id => $(id).addEventListener("input", persistDraft));
  if (draft) [...timelineEntries].reverse().forEach(renderEntry);
  document.querySelectorAll("[data-pcr-mode]").forEach(btn => btn.classList.toggle("active", btn.dataset.pcrMode === mode));
  pedsCauseNote.hidden = mode !== "pediatric"; pwaCauseNote.hidden = mode !== "pediatric";
  ventilationEl.textContent = mode === "adult" ? "1 ventilação a cada 6 s com compressões contínuas." : "Com via aérea avançada: 1 ventilação a cada 2–3 s com compressões contínuas.";
  if (selectedRhythm) {
    const rhythm = [...document.querySelectorAll(".pcr-rhythm")].find(b => b.dataset.rhythm === selectedRhythm);
    if (rhythm) { rhythm.classList.add("selected"); shockable = rhythm.dataset.shockable === "true"; }
    selectedRhythmLabel.textContent = selectedRhythm;
    rhythmState.textContent = shockable ? "Chocável" : "Não chocável";
    rhythmState.className = "pcr-state " + (shockable ? "shock" : "no-shock");
  }
  shockBtn.disabled = stoppedAt || !shockable;
  shockCountEl.textContent = shockCount + " choques registrados";
  if (stoppedAt) {
    freezeControls();
    $("pcr-rosc").textContent = "Tentar salvar novamente";
    metroBtn.disabled = true;
    metroBtn.classList.remove("active"); metroBtn.setAttribute("aria-pressed","false");
    $("pcr-save-status").textContent = "PCR encerrada aguardando salvamento. Sua linha do tempo foi recuperada.";
  }

  renderDrugs();
  if (stoppedAt) freezeControls();
  updateEnergy();
  if (!draft || !timelineEntries.length) addLog("Início da PCR", "Cronômetro iniciado automaticamente");
  updateTimer();
  setInterval(updateTimer, 1000);
  metroBtn.querySelector("small").textContent = "110 bpm · toque para ativar som";
  if (!stoppedAt) startMetronomeLoop();
  persistDraft();
})();
