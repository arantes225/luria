/*
 * LURIA / TRAUBE - Patient Workspace v3
 * Contexto clinico estruturado, foco em seguranca, IA de anotacoes soltas,
 * protocolos, bulario, exames e receituario com checagem de alergias e interacoes medicamentosas.
 */
(() => {
  const KEY = "luria:temporary-patient:v1";
  const page = document.querySelector('body[data-page="trabalho_paciente"]');
  const safe = value => String(value ?? "").replace(/[&<>\"']/g, char => ({"&":"&amp;","<":"&lt;",">":"&gt;","\"":"&quot;","'":"&#39;"}[char]));
  const normalize = value => String(value ?? "").normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().trim();
  const now = () => new Date().toISOString();
  const uid = prefix => {
    const bytes = new Uint8Array(5);
    if (window.crypto?.getRandomValues) window.crypto.getRandomValues(bytes);
    else for (let i = 0; i < bytes.length; i++) bytes[i] = Math.floor(Math.random() * 256);
    return `${prefix}-${[...bytes].map(byte => byte.toString(16).padStart(2, "0")).join("").toUpperCase()}`;
  };

  const emptyState = () => ({
    version: 3,
    sessionId: uid("SES"),
    createdAt: now(),
    updatedAt: now(),
    patient: null,
    rawNotes: "",
    aiStructured: null,
    prescription: [],
    activeTab: "protocolos",
    activeProblemId: "",
    problems: [],
    measurements: [],
    results: [],
    timeline: [],
    reasoning: { summary: "", hypotheses: "", questions: "", decisions: "" },
    plan: { monitoring: "", pending: "", draft: "", facts: "", interpretation: "", prescriptionDraft: "" }
  });

  const clone = value => JSON.parse(JSON.stringify(value));
  const migrate = input => {
    const source = input && typeof input === "object" ? input : emptyState();
    const base = emptyState();
    const state = {
      ...base,
      ...source,
      patient: source.patient ? {
        id: source.patient.id || "Paciente em atendimento",
        age: source.patient.age || "",
        sex: source.patient.sex || "",
        weight: source.patient.weight || "",
        allergies: source.patient.allergies || ""
      } : null,
      rawNotes: source.rawNotes || "",
      aiStructured: source.aiStructured || null,
      prescription: Array.isArray(source.prescription) ? source.prescription : [],
      activeTab: source.activeTab || "protocolos",
      reasoning: { ...base.reasoning, ...(source.reasoning || {}) },
      plan: { ...base.plan, ...(source.plan || {}) }
    };
    state.version = 3;
    state.problems = Array.isArray(state.problems) ? state.problems : [];
    state.measurements = Array.isArray(state.measurements) ? state.measurements : [];
    state.results = Array.isArray(state.results) ? state.results : [];
    state.timeline = Array.isArray(state.timeline) ? state.timeline : [];
    return state;
  };

  const read = () => { try { return migrate(JSON.parse(sessionStorage.getItem(KEY) || "null")); } catch { return emptyState(); } };
  const write = state => {
    state.updatedAt = now();
    try { sessionStorage.setItem(KEY, JSON.stringify(state)); } catch { return false; }
    window.dispatchEvent(new CustomEvent("luria:patient-context-changed", { detail: { state: clone(state) } }));
    return true;
  };
  const clear = () => {
    try { sessionStorage.removeItem(KEY); } catch {}
    window.dispatchEvent(new CustomEvent("luria:patient-context-changed", { detail: { state: emptyState() } }));
  };
  const update = updater => { const state = read(); updater(state); write(state); return clone(state); };
  const addEvent = (state, kind, title, detail) => state.timeline.unshift({ id: uid("EVT"), at: now(), kind, title, detail });

  // -------------------------------------------------------------
  // BASE DE CONHECIMENTO DE SEGURANCA: ALERGIAS & INTERACOES
  // -------------------------------------------------------------
  const ALLERGY_GROUPS = [
    {
      key: "penicilina",
      terms: ["penicilina", "amoxicilina", "ampicilina", "oxacilina", "piperacilina", "benzetacil", "clavulanato", "tazobactam"],
      drugs: ["amoxicilina", "ampicilina", "oxacilina", "piperacilina", "benzetacil", "penicilina"],
      crossReactive: ["cefalexina", "ceftriaxona", "cefepima", "cefazolina", "meropenem", "imipenem", "ertapenem"],
      crossMessage: "Alerta de reacao cruzada (Betalactamicos/Cefalosporinas/Carbapenemicos). Risco de anafilaxia em pacientes hipersensiveis a Penicilinas!"
    },
    {
      key: "cefalosporina",
      terms: ["cefalosporina", "cefalexina", "ceftriaxona", "cefepima", "cefazolina"],
      drugs: ["cefalexina", "ceftriaxona", "cefepima", "cefazolina"],
      crossReactive: ["amoxicilina", "ampicilina", "penicilina", "meropenem"],
      crossMessage: "Alergia relatada a Cefalosporinas com potencial reatividade cruzada com Penicilinas e Carbapenemicos."
    },
    {
      key: "dipirona",
      terms: ["dipirona", "metamizol", "novalgina", "pirazolona", "pirazolonico"],
      drugs: ["dipirona"],
      crossReactive: [],
      crossMessage: "Contraindicacao absoluta: Paciente alergico a Dipirona/Pirazolonicos (risco de anafilaxia, hipotensao grave ou agranulocitose)."
    },
    {
      key: "aines",
      terms: ["aine", "aines", "anti-inflamatorio", "ibuprofeno", "cetoprofeno", "diclofenaco", "meloxicam", "tenoxicam", "naproxeno", "aas", "aspirina"],
      drugs: ["ibuprofeno", "cetoprofeno", "diclofenaco", "meloxicam", "tenoxicam", "naproxeno", "aas", "aspirina"],
      crossReactive: [],
      crossMessage: "Alergia a AINEs / AAS (Triade de Samter/asma induzida por AAS, angioedema ou urticaria grave)."
    },
    {
      key: "sulfas",
      terms: ["sulfa", "sulfametoxazol", "bactrim", "sulfadiazina"],
      drugs: ["sulfametoxazol", "bactrim", "sulfadiazina"],
      crossReactive: [],
      crossMessage: "Alergia a Sulfas: risco de Sindrome de Stevens-Johnson (SSJ), NET ou anafilaxia."
    },
    {
      key: "iodo",
      terms: ["iodo", "contraste iodado", "amiodarona"],
      drugs: ["amiodarona"],
      crossReactive: [],
      crossMessage: "Alergia ao Iodo: Cautela com medicamentos contendo iodo (ex.: Amiodarona) ou contrastes."
    },
    {
      key: "opioides",
      terms: ["opioide", "morfina", "tramadol", "codeina", "fentanil"],
      drugs: ["morfina", "tramadol", "codeina", "fentanil"],
      crossReactive: [],
      crossMessage: "Alergia relatada a Opioides (broncoespasmo, anafilaxia ou reacao pseudoalergica grave)."
    }
  ];

  const SEVERE_INTERACTIONS = [
    {
      pair: ["varfarina", "aine"],
      drugsA: ["varfarina", "coumadin", "marevan"],
      drugsB: ["ibuprofeno", "cetoprofeno", "diclofenaco", "meloxicam", "tenoxicam", "naproxeno", "aas", "aspirina"],
      severity: "danger",
      title: "Varfarina + AINE (Risco Hemorragico Critico)",
      detail: "Associacao altamente perigosa. AINEs causam lesao da mucosa gastrica e inibem plaquetas, elevando drasticamente o risco de sangramento gastrointestinal fatal."
    },
    {
      pair: ["varfarina", "ciprofloxacino"],
      drugsA: ["varfarina", "coumadin", "marevan"],
      drugsB: ["ciprofloxacino", "cipro", "levofloxacino"],
      severity: "danger",
      title: "Varfarina + Quinolona (Aumento Acentuado do INR)",
      detail: "Quinolonas inibem intensamente o CYP2C9 e reduzem flora produtora de vitamina K, disparando o INR com alto risco hemorragico."
    },
    {
      pair: ["ieca_bra", "espironolactona"],
      drugsA: ["enalapril", "captopril", "ramipril", "losartana", "valsartana", "candesartana"],
      drugsB: ["espironolactona", "aldactone"],
      severity: "warning",
      title: "IECA/BRA + Espironolactona (Hipercalemia Grave)",
      detail: "Bloqueio duplo do SRAA retem potassio. Exige monitorizacao rigorosa de K+ serico e funcao renal para prevenir arritmias ventriculares."
    },
    {
      pair: ["tramadol", "isrs"],
      drugsA: ["tramadol", "dorless"],
      drugsB: ["sertralina", "escitalopram", "fluoxetina", "paroxetina", "citalopram", "venlafaxina", "duloxetina"],
      severity: "danger",
      title: "Tramadol + Antidepressivo (Sindrome Serotoninergica)",
      detail: "Risco iminente de Sindrome Serotoninergica potencialmente fatal (hipertermia, mioclonias, rigidez, instabilidade autonomica e confusao)."
    },
    {
      pair: ["amiodarona", "qt_prolongador"],
      drugsA: ["amiodarona", "ancoron"],
      drugsB: ["azitromicina", "claritromicina", "ciprofloxacino", "levofloxacino", "ondansetrona", "haloperidol"],
      severity: "danger",
      title: "Amiodarona + Prolongador de QT (Torsades de Pointes)",
      detail: "Efeito sinergico no prolongamento do intervalo QTc com risco de desencadeamento de Taquicardia Ventricular Polimorfica (Torsades) e morte subita."
    },
    {
      pair: ["ceftriaxona", "calcio"],
      drugsA: ["ceftriaxona", "rocefin"],
      drugsB: ["gluconato de calcio", "cloreto de calcio", "calcio"],
      severity: "danger",
      title: "Ceftriaxona + Calcio IV (Precipitacao Fatal)",
      detail: "Incompatibilidade absoluta em Y ou mesma linha venosa. Precipita cristais insoluveis de ceftriaxona-calcio em pulmoes e rins (contraindicacao formal ANVISA/FDA)."
    },
    {
      pair: ["bicarbonato", "noradrenalina"],
      drugsA: ["bicarbonato de sodio", "bicarbonato"],
      drugsB: ["noradrenalina", "adrenalina", "dopamina", "dobutamina"],
      severity: "danger",
      title: "Bicarbonato de Sodio + Catecolaminas (Inativacao Quimica)",
      detail: "Solucoes alcalinas inativam rapidamente catecolaminas por oxidacao. Nao administrar na mesma via ou equipo."
    },
    {
      pair: ["carbapenem", "valproato"],
      drugsA: ["meropenem", "imipenem", "ertapenem"],
      drugsB: ["acido valproico", "valproato", "divalproato", "depakene", "depakote"],
      severity: "danger",
      title: "Meropenem + Acido Valproico (Queda Abrupta do Nivel Serico)",
      detail: "Carbapenemicos reduzem os niveis sericos de valproato em 60-90% em poucas horas, provocando crises convulsivas refratarias."
    },
    {
      pair: ["metformina", "contraste"],
      drugsA: ["metformina", "glifage"],
      drugsB: ["contraste", "contraste iodado"],
      severity: "warning",
      title: "Metformina + Contraste Iodado (Acidose Lactica)",
      detail: "Suspender a metformina no momento do exame e reiniciar apos 48h apenas se a funcao renal permanecer preservada."
    }
  ];

  // Checagem de seguranca ativa
  const checkSafetyAlerts = (state) => {
    const alerts = [];
    const patientAllergies = normalize(state.patient?.allergies || "");
    const rxItems = state.prescription || [];

    // 1. Checar Alergias
    if (patientAllergies && patientAllergies !== "sem alergias" && patientAllergies !== "nega" && patientAllergies !== "nenhuma") {
      rxItems.forEach(item => {
        const drugNorm = normalize(item.name);
        ALLERGY_GROUPS.forEach(grp => {
          const patientHasThisAllergy = grp.terms.some(t => patientAllergies.includes(t));
          if (patientHasThisAllergy) {
            const isDirectMatch = grp.drugs.some(d => drugNorm.includes(d));
            if (isDirectMatch) {
              alerts.push({
                type: "allergy",
                severity: "danger",
                title: `ALERTA CRITICO DE ALERGIA: ${item.name.toUpperCase()}`,
                detail: `O paciente possui historico informado de alergia a "${patientAllergies}". A administracao de ${item.name} e CONTRAINDICADA.`
              });
            } else {
              const isCrossMatch = grp.crossReactive.some(c => drugNorm.includes(c));
              if (isCrossMatch) {
                alerts.push({
                  type: "allergy-cross",
                  severity: "warning",
                  title: `ALERTA DE REACAO CRUZADA: ${item.name}`,
                  detail: grp.crossMessage
                });
              }
            }
          }
        });
      });
    }

    // 2. Checar Interacoes Medicamentosas
    for (let i = 0; i < rxItems.length; i++) {
      for (let j = i + 1; j < rxItems.length; j++) {
        const d1 = normalize(rxItems[i].name);
        const d2 = normalize(rxItems[j].name);

        SEVERE_INTERACTIONS.forEach(inter => {
          const matchA1 = inter.drugsA.some(a => d1.includes(a));
          const matchB2 = inter.drugsB.some(b => d2.includes(b));
          const matchA2 = inter.drugsA.some(a => d2.includes(a));
          const matchB1 = inter.drugsB.some(b => d1.includes(b));

          if ((matchA1 && matchB2) || (matchA2 && matchB1)) {
            alerts.push({
              type: "interaction",
              severity: inter.severity,
              title: inter.title,
              detail: `${rxItems[i].name} + ${rxItems[j].name}: ${inter.detail}`
            });
          }
        });
      }
    }

    return alerts;
  };

  // -------------------------------------------------------------
  // IA PARSER DE ANOTACOES SOLTAS
  // -------------------------------------------------------------
  const parseClinicalNotesWithAI = (rawText) => {
    const text = String(rawText || "").trim();
    if (!text) return null;

    const lines = text.split(/\r?\n|;/).map(l => l.trim()).filter(Boolean);

    const result = {
      qp: "",
      hda: "",
      isda: "",
      antecedentes: "",
      medicamentos: "",
      exame_fisico: "",
      hipoteses: "",
      condutas: ""
    };

    const hdaParts = [];
    const antParts = [];
    const medParts = [];
    const svParts = [];
    const hipParts = [];
    const condParts = [];

    const svRegex = /(pa\s*[:=]?\s*\d{2,3}[\/x]\d{2,3}|fc\s*[:=]?\s*\d{2,3}|fr\s*[:=]?\s*\d{1,2}|spo2\s*[:=]?\s*\d{2,3}%?|sat\s*[:=]?\s*\d{2,3}%?|temp\s*[:=]?\s*\d{2}(?:[.,]\d)?\s*°?c?|afebril|eupneico|normocorado|glasgow|crepitan|murm[uú]rio|rha)/i;
    const medRegex = /(losartana|enalapril|hidroclorotiazida|anlodipino|metformina|insulina|glimepirida|omeprazol|pantoprazol|atorvastatina|sinvastatina|aas|aspirina|clopidogrel|dipirona|paracetamol|amoxicilina|azitromicina|ceftriaxona|levofloxacino|prednisona|salbutamol|carvedilol|atenolol|propranolol|rivaroxabana|apixabana|varfarina|sertralina|escitalopram|clonazepam|quetiapina|noradrenalina|fentanil|midazolam|mg\b|mcg\b|gotas|comp|ampola|uso de)/i;
    const antRegex = /(has\b|dm\b|dm2\b|diabetes|hipertens|tabagista|etilista|dpoc|asma|infarto|iam|avc|cirurgia|neoplasia|refluxo|gastrite)/i;
    const hipRegex = /(hd\s*[:=]|hip[oó]tese|suspeita|dx\s*[:=]|diagnostico|insuficiencia|sepse|icc|pneumonia|itu|apendicite|crise)/i;
    const condRegex = /(conduta|plano|solicito|prescrevo|encaminho|iniciar|jejum|expansao|oxigenio|intub)/i;

    lines.forEach(line => {
      const lower = line.toLowerCase();
      if (condRegex.test(lower)) {
        condParts.push(line.replace(/^(conduta|plano|iniciar)\s*[:=]?\s*/i, ""));
      } else if (hipRegex.test(lower)) {
        hipParts.push(line.replace(/^(hd|hip[oó]tese|suspeita|dx)\s*[:=]?\s*/i, ""));
      } else if (svRegex.test(lower)) {
        svParts.push(line);
      } else if (medRegex.test(lower) && !lower.includes("alergia")) {
        medParts.push(line);
      } else if (antRegex.test(lower)) {
        antParts.push(line);
      } else {
        hdaParts.push(line);
      }
    });

    if (hdaParts.length > 0) {
      result.qp = hdaParts[0].substring(0, 80);
      result.hda = hdaParts.join(". ").replace(/\.\./g, ".");
    } else {
      result.qp = "Em avaliacao clinica";
      result.hda = text;
    }

    result.antecedentes = antParts.length ? antParts.join("; ") : "Nenhum antecedente adicional explicitado nas notas.";
    result.medicamentos = medParts.length ? medParts.join(", ") : "Nenhuma medicacao previa declarada.";
    result.exame_fisico = svParts.length ? svParts.join("; ") : "Sinais vitais e exame fisico em complemento.";
    result.hipoteses = hipParts.length ? hipParts.join("; ") : "Hipoteses em investigacao diagnostica.";
    result.condutas = condParts.length ? condParts.join("; ") : "Conduta clinica estruturada abaixo no receituario.";

    return result;
  };

  // -------------------------------------------------------------
  // API DO ESTADO
  // -------------------------------------------------------------
  const stateApi = {
    key: KEY,
    read: () => clone(read()),
    clear,
    createPatient(input) {
      return update(state => {
        state.patient = {
          id: `Paciente (${input.age ? `${input.age}a` : "Idade ñ inf."}, ${input.sex || "Sexo ñ inf."})`,
          age: String(input.age || "").trim(),
          sex: String(input.sex || "").trim(),
          weight: String(input.weight || "").trim(),
          allergies: String(input.allergies || "").trim()
        };
        state.rawNotes = "";
        state.aiStructured = null;
        state.prescription = [];
        state.activeTab = "protocolos";
        state.timeline = [{
          id: uid("EVT"),
          at: now(),
          kind: "session",
          title: "Atendimento iniciado",
          detail: `Peso: ${state.patient.weight || "—"} kg | Idade: ${state.patient.age || "—"} | Sexo: ${state.patient.sex || "—"} | Alergias: ${state.patient.allergies || "Nenhuma relatada"}`
        }];
      });
    },
    endPatient() { clear(); },
    saveNotes(text) {
      return update(state => {
        state.rawNotes = text;
      });
    },
    runAI() {
      const state = read();
      const structured = parseClinicalNotesWithAI(state.rawNotes);
      return update(s => {
        s.aiStructured = structured;
        addEvent(s, "ai", "IA organizou as notas clinicas", "Frases soltas foram categorizadas em HDA, Antecedentes, Exame Fisico e Hipoteses.");
      });
    },
    setTab(tab) {
      return update(state => {
        state.activeTab = tab;
      });
    },
    addPrescriptionItem(item) {
      return update(state => {
        const newItem = {
          id: uid("RX"),
          name: item.name || "Medicamento",
          dose: item.dose || "1 comprimido / ampola",
          route: item.route || "VO",
          interval: item.interval || "24/24h",
          instructions: item.instructions || "Uso conforme orientacao",
          source: item.source || "Manual",
          addedAt: now()
        };
        state.prescription.push(newItem);
        addEvent(state, "prescription", `Medicamento adicionado: ${newItem.name}`, `${newItem.dose} · ${newItem.route} · ${newItem.interval}`);
      });
    },
    removePrescriptionItem(id) {
      return update(state => {
        const idx = state.prescription.findIndex(i => i.id === id);
        if (idx !== -1) {
          const removed = state.prescription.splice(idx, 1)[0];
          addEvent(state, "prescription", `Item removido: ${removed.name}`, "Item excluido do receituario.");
        }
      });
    }
  };

  window.LuriaPatientContext = stateApi;
  if (!page) return;
  const root = page.querySelector("#patient-app");
  if (!root) return;

  // -------------------------------------------------------------
  // TEMPLATES DE RENDERIZACAO
  // -------------------------------------------------------------

  // Tela Inicial: Apenas Peso, Idade, Sexo e Alergias
  const startMarkup = () => `
    <section class="patient-hero patient-hero-start">
      <div>
        <span class="patient-kicker">Central Clinica · Modo Paciente</span>
        <h1>Prontuario Rapido & Seguro</h1>
        <p>Informe apenas os parametros clinicos vitais. O sistema organiza notas soltas com Inteligencia Artificial e monitora ativamente alergias e interacoes medicamentosas graves.</p>
      </div>
      <span class="patient-status"><span class="patient-dot" aria-hidden="true"></span>Sem paciente ativo</span>
    </section>

    <div class="patient-start">
      <section class="patient-card patient-start-card" style="grid-column: 1 / -1; max-width: 760px; margin: 0 auto;">
        <span class="patient-kicker">Identificacao Clinica Simplificada (Sem dados nominais)</span>
        <h2>Iniciar Atendimento</h2>
        <p style="margin-bottom: 1.2rem; color: #64748b; font-size: 0.88rem;">Preencha os dados biometricos e de seguranca para abrir a central:</p>
        
        <form class="patient-form" data-form="create-simplified">
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem; margin-bottom: 1rem;">
            <label>
              <strong>Idade *</strong>
              <input name="age" type="text" inputmode="numeric" required placeholder="Ex.: 45 anos ou 8 meses" autofocus style="width: 100%; box-sizing: border-box; padding: 0.65rem; border: 1px solid #bfd5ec; border-radius: 9px; font-size: 0.9rem;">
            </label>
            <label>
              <strong>Sexo Biologico *</strong>
              <select name="sex" required style="width: 100%; box-sizing: border-box; padding: 0.65rem; border: 1px solid #bfd5ec; border-radius: 9px; font-size: 0.9rem; background: #fff;">
                <option value="">Selecione...</option>
                <option value="Feminino">Feminino</option>
                <option value="Masculino">Masculino</option>
                <option value="Outro">Outro / Nao aplicavel</option>
              </select>
            </label>
            <label>
              <strong>Peso Estimado ou Medido (kg) *</strong>
              <input name="weight" type="text" inputmode="decimal" required placeholder="Ex.: 70 kg" style="width: 100%; box-sizing: border-box; padding: 0.65rem; border: 1px solid #bfd5ec; border-radius: 9px; font-size: 0.9rem;">
            </label>
          </div>

          <label style="display: block; margin-bottom: 1.4rem;">
            <strong style="color: #b91c1c;">⚠️ Alergias Conhecidas (Atencao redobrada)</strong>
            <input name="allergies" type="text" placeholder="Ex.: Penicilina, Dipirona, AINEs, Sulfa, Frutos do mar (ou 'Nega')" style="width: 100%; box-sizing: border-box; padding: 0.75rem; border: 1.5px solid #f87171; border-radius: 9px; font-size: 0.92rem; background: #fffafa;">
            <small style="display: block; margin-top: 0.35rem; color: #7f1d1d; font-size: 0.75rem;">O sistema emitira alertas imediatos e travas de seguranca se houver prescricao incompativel.</small>
          </label>

          <div class="patient-actions" style="display: flex; gap: 0.8rem; justify-content: flex-end;">
            <a class="patient-secondary" href="/trabalho/" style="text-decoration: none; padding: 0.65rem 1.1rem; border: 1px solid #cbd5e1; border-radius: 9px; color: #475569; font-weight: 700;">Voltar</a>
            <button class="patient-primary" type="submit" style="padding: 0.65rem 1.4rem; background: #184888; color: #fff; border: 0; border-radius: 9px; font-weight: 850; cursor: pointer;">Abrir Central do Paciente →</button>
          </div>
        </form>
      </section>
    </div>
  `;

  // Tela Ativa do Paciente
  const activeMarkup = (state) => {
    const p = state.patient || {};
    const alerts = checkSafetyAlerts(state);
    const hasDangerAlert = alerts.some(a => a.severity === "danger");

    return `
      <!-- Alertas Flutuantes de Alta Gravidade -->
      ${alerts.length > 0 ? `
        <div class="patient-alerts-area" id="patient-alerts-top">
          ${alerts.map(a => `
            <div class="patient-alert-card ${a.severity === 'danger' ? 'patient-alert-danger' : 'patient-alert-warning'}">
              <span class="patient-alert-icon">${a.severity === 'danger' ? '🚨' : '⚠️'}</span>
              <div class="patient-alert-body">
                <strong>${safe(a.title)}</strong>
                <p>${safe(a.detail)}</p>
              </div>
            </div>
          `).join('')}
        </div>
      ` : ''}

      <!-- Topo do Paciente Ativo -->
      <section class="patient-hero patient-hero-active" style="border-left: 5px solid ${hasDangerAlert ? '#dc2626' : '#184888'};">
        <div>
          <span class="patient-kicker">Contexto Clinico Ativo · Sem Identificacao Nominal</span>
          <h1 style="display: flex; align-items: center; gap: 0.7rem; flex-wrap: wrap;">
            <span>Paciente: ${safe(p.age ? `${p.age} anos` : 'Idade ñ inf.')} · ${safe(p.sex || 'Sexo ñ inf.')}</span>
            <span style="font-size: 0.9rem; padding: 0.25rem 0.6rem; border-radius: 999px; background: #e0f2fe; color: #0369a1; font-weight: 800;">⚖️ ${safe(p.weight || '—')} kg</span>
            ${p.allergies ? `
              <span style="font-size: 0.85rem; padding: 0.25rem 0.65rem; border-radius: 999px; background: #fee2e2; color: #991b1b; font-weight: 850; border: 1px solid #fca5a5;">
                🚫 Alergias: ${safe(p.allergies)}
              </span>
            ` : '<span style="font-size: 0.8rem; color: #64748b;">Alergias nao relatadas</span>'}
          </h1>
        </div>
        <div class="patient-actions">
          <button class="patient-secondary" type="button" data-action="new-patient">Trocar Paciente</button>
          <button class="patient-secondary" type="button" data-action="end-patient" style="color: #dc2626;">Encerrar</button>
        </div>
      </section>

      <div class="patient-workspace" style="display: grid; grid-template-columns: 1fr; gap: 1.25rem;">
        
        <!-- 1. BLOCO DE ESCRITA COM IA (Frases ou Palavras Soltas) -->
        <section class="patient-card patient-ai-card">
          <div class="patient-ai-head">
            <div>
              <span class="patient-ai-badge">Assistente Clinico IA</span>
              <h2 style="margin: 0.35rem 0 0.2rem; font-size: 1.25rem;">Escrita Livre & Organizacao com IA</h2>
              <p style="margin: 0; color: #475569; font-size: 0.82rem;">Digite termos rapidos, abreviacoes ou jargoes medicos da consulta/plantao. A IA estrutura em anamnese formal:</p>
            </div>
            <button class="patient-btn-ai" type="button" data-action="run-ai">
              <span>✨</span>
              <span>Organizar com IA</span>
            </button>
          </div>

          <textarea class="patient-ai-textarea" id="patient-raw-notes" placeholder="Ex.: paciente 45a, dor toracica ventilatorio-dependente ha 2 dias, tosse produtiva, febre 38.5, estertores em base E. HAS usa losartana 50. Alergia a dipirona. PA 130x85, FC 98, SpO2 94%. HD: pneumonia comunitaria. Iniciar ceftriaxona + claritro...">${safe(state.rawNotes)}</textarea>

          <!-- Resultado da IA -->
          ${state.aiStructured ? `
            <div class="patient-ai-result-box">
              <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #e2edf7; padding-bottom: 0.4rem;">
                <strong style="color: #184888; font-size: 0.86rem;">📋 Estruturacao Clinica Organizada:</strong>
                <button type="button" data-action="copy-ai" class="patient-link-button">Copiar Texto Estruturado</button>
              </div>

              <div class="patient-ai-result-grid">
                <div class="patient-ai-sec">
                  <strong>💬 Queixa & Duracao (QP/HDA)</strong>
                  <p>${safe(state.aiStructured.hda || state.aiStructured.qp)}</p>
                </div>
                <div class="patient-ai-sec">
                  <strong>🩺 Sinais Vitais & Exame Fisico</strong>
                  <p>${safe(state.aiStructured.exame_fisico)}</p>
                </div>
                <div class="patient-ai-sec">
                  <strong>🧬 Antecedentes & Comorbidades</strong>
                  <p>${safe(state.aiStructured.antecedentes)}</p>
                </div>
                <div class="patient-ai-sec">
                  <strong>💊 Medicacoes em Uso</strong>
                  <p>${safe(state.aiStructured.medicamentos)}</p>
                </div>
                <div class="patient-ai-sec" style="grid-column: 1 / -1; background: #eef5fc;">
                  <strong>🎯 Hipoteses & Conduta Inicial</strong>
                  <p>${safe(state.aiStructured.hipoteses)}</p>
                  ${state.aiStructured.condutas ? `<p style="margin-top: 0.35rem; font-weight: 700; color: #184888;">Condutas: ${safe(state.aiStructured.condutas)}</p>` : ''}
                </div>
              </div>
            </div>
          ` : ''}
        </section>

        <!-- 2. FERRAMENTAS CLINICAS INTEGRADAS: PROTOCOLOS, BULARIO & EXAMES -->
        <section class="patient-card patient-tools-integrated-card">
          <div class="patient-section-head" style="margin-bottom: 0.85rem;">
            <div>
              <span class="patient-kicker">Ferramentas de Consulta & Conduta</span>
              <h2 style="font-size: 1.25rem;">Protocolos, Bulario e Exames</h2>
              <p>Consulte referencias e adicione medicamentos ao receituario com checagem de interacoes em 1 clique:</p>
            </div>
          </div>

          <div class="patient-integrated-tabs">
            <button type="button" class="patient-tab-btn ${state.activeTab === 'protocolos' ? 'is-active' : ''}" data-tab="protocolos">📖 Protocolos Clinicos</button>
            <button type="button" class="patient-tab-btn ${state.activeTab === 'bulario' ? 'is-active' : ''}" data-tab="bulario">💊 Bulario & Posologias</button>
            <button type="button" class="patient-tab-btn ${state.activeTab === 'exames' ? 'is-active' : ''}" data-tab="exames">🔬 Exames Laboratoriais</button>
          </div>

          <!-- Conteudo Aba 1: Protocolos -->
          <div class="patient-tab-content ${state.activeTab === 'protocolos' ? 'is-active' : ''}" id="tab-content-protocolos">
            <input type="search" class="patient-catalog-search" id="search-protocolos" placeholder="Buscar protocolo (ex.: sepse, dor toracica, cetoacidose, avc, icc, anafilaxia)...">
            <div class="patient-catalog-list" id="list-protocolos">
              ${renderProtocolsList()}
            </div>
          </div>

          <!-- Conteudo Aba 2: Bulario -->
          <div class="patient-tab-content ${state.activeTab === 'bulario' ? 'is-active' : ''}" id="tab-content-bulario">
            <input type="search" class="patient-catalog-search" id="search-bulario" placeholder="Buscar medicamento no bulario (ex.: noradrenalina, ceftriaxona, amoxicilina, tramadol)...">
            <div class="patient-catalog-list" id="list-bulario">
              ${renderBularioList()}
            </div>
          </div>

          <!-- Conteudo Aba 3: Exames -->
          <div class="patient-tab-content ${state.activeTab === 'exames' ? 'is-active' : ''}" id="tab-content-exames">
            <input type="search" class="patient-catalog-search" id="search-exames" placeholder="Consultar exames (ex.: troponina, lactato, creatinina, potassio, d-dimero)...">
            <div class="patient-catalog-list" id="list-exames">
              ${renderExamesList()}
            </div>
          </div>
        </section>

        <!-- 3. RECEITUARIO CLINICO COM TRAVAS DE SEGURANCA EM TEMPO REAL -->
        <section class="patient-card patient-prescription-card" id="patient-receituario">
          <div class="patient-section-head" style="margin-bottom: 0.85rem;">
            <div>
              <span class="patient-kicker" style="color: #15803d;">Prescricao & Dispensacao</span>
              <h2 style="font-size: 1.25rem;">Receituario do Paciente</h2>
              <p>Medicamentos selecionados para este contexto. O sistema valida automaticamente cada acrescimo contra alergias e interacoes medicamentosas:</p>
            </div>
            <span class="patient-count-badge" style="background: #dcfce7; color: #166534; font-size: 0.8rem;">
              ${state.prescription.length} ${state.prescription.length === 1 ? 'item' : 'itens'}
            </span>
          </div>

          <!-- Formulario Manual Rapido de Adicao -->
          <form class="patient-form" data-form="add-custom-drug" style="background: #f8fbfe; padding: 0.85rem; border-radius: 12px; border: 1px solid #d8e6f5; margin-bottom: 1rem;">
            <div style="display: grid; grid-template-columns: 2fr 1fr 1fr 1fr auto; gap: 0.6rem; align-items: end;">
              <label>
                <small style="display: block; font-weight: 700; color: #475569; margin-bottom: 0.2rem;">Medicamento / Principio Ativo</small>
                <input name="name" required placeholder="Ex.: Amoxicilina + Clavulanato" style="width: 100%; box-sizing: border-box; padding: 0.5rem; border: 1px solid #cbd5e1; border-radius: 8px; font-size: 0.82rem;">
              </label>
              <label>
                <small style="display: block; font-weight: 700; color: #475569; margin-bottom: 0.2rem;">Dose</small>
                <input name="dose" placeholder="Ex.: 875/125 mg" style="width: 100%; box-sizing: border-box; padding: 0.5rem; border: 1px solid #cbd5e1; border-radius: 8px; font-size: 0.82rem;">
              </label>
              <label>
                <small style="display: block; font-weight: 700; color: #475569; margin-bottom: 0.2rem;">Via</small>
                <select name="route" style="width: 100%; box-sizing: border-box; padding: 0.5rem; border: 1px solid #cbd5e1; border-radius: 8px; font-size: 0.82rem; background: #fff;">
                  <option value="VO">VO</option>
                  <option value="IV">IV</option>
                  <option value="IM">IM</option>
                  <option value="SC">SC</option>
                  <option value="Inalatoria">Inalatoria</option>
                  <option value="Topica">Topica</option>
                </select>
              </label>
              <label>
                <small style="display: block; font-weight: 700; color: #475569; margin-bottom: 0.2rem;">Posologia</small>
                <input name="interval" placeholder="Ex.: 12/12h por 7 dias" style="width: 100%; box-sizing: border-box; padding: 0.5rem; border: 1px solid #cbd5e1; border-radius: 8px; font-size: 0.82rem;">
              </label>
              <button class="patient-primary" type="submit" style="padding: 0.55rem 0.95rem; border-radius: 8px; font-size: 0.82rem; font-weight: 850; cursor: pointer; height: 35px;">+ Adicionar</button>
            </div>
          </form>

          <!-- Tabela de Itens Prescritos -->
          ${state.prescription.length > 0 ? `
            <div style="overflow-x: auto;">
              <table class="patient-rx-table">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Medicamento</th>
                    <th>Dose & Via</th>
                    <th>Posologia / Instrucoes</th>
                    <th>Origem</th>
                    <th style="text-align: right;">Acoes</th>
                  </tr>
                </thead>
                <tbody>
                  ${state.prescription.map((rx, idx) => `
                    <tr>
                      <td style="color: #64748b; font-weight: 800;">${idx + 1}</td>
                      <td>
                        <strong style="color: #1e293b; font-size: 0.88rem;">${safe(rx.name)}</strong>
                      </td>
                      <td>
                        <span style="display: inline-block; padding: 0.2rem 0.5rem; border-radius: 6px; background: #f1f5f9; color: #334155; font-weight: 700; font-size: 0.78rem;">
                          ${safe(rx.dose)} · ${safe(rx.route)}
                        </span>
                      </td>
                      <td style="color: #475569;">${safe(rx.interval)} ${rx.instructions ? `<small style="display:block; color:#64748b;">${safe(rx.instructions)}</small>` : ''}</td>
                      <td><small style="color: #94a3b8;">${safe(rx.source || 'Prescricao')}</small></td>
                      <td style="text-align: right;">
                        <button type="button" data-remove-rx="${safe(rx.id)}" style="background: transparent; border: 0; color: #ef4444; font-weight: 800; font-size: 0.82rem; cursor: pointer;">Excluir</button>
                      </td>
                    </tr>
                  `).join('')}
                </tbody>
              </table>
            </div>

            <div style="display: flex; justify-content: flex-end; gap: 0.8rem; margin-top: 1.25rem;">
              <button type="button" data-action="print-rx" class="patient-secondary" style="display: inline-flex; align-items: center; gap: 0.4rem;">
                <span>🖨️</span> Imprimir Receita
              </button>
            </div>
          ` : `
            <div class="patient-rx-empty">
              <span style="font-size: 1.6rem; display: block; margin-bottom: 0.35rem;">💊</span>
              Nenhum medicamento adicionado ainda. Busque acima nos <strong>Protocolos</strong> ou no <strong>Bulario</strong> e clique em <em>+ Adicionar ao Receituario</em>.
            </div>
          `}
        </section>

      </div>
    `;
  };

  // -------------------------------------------------------------
  // RENDERIZADORES DE CATALOGO (Protocolos, Bulario, Exames)
  // -------------------------------------------------------------
  const getProtocols = () => window.LURIA_PROTOCOL_SEEDS || [];
  const getBulario = () => window.LURIA_BULARIO_SEEDS || [];

  const renderProtocolsList = (filter = "") => {
    const list = getProtocols();
    const q = normalize(filter);
    const filtered = list.filter(p => !q || normalize(p.title + " " + (p.summary || "") + " " + (p.category || "")).includes(q));

    if (!filtered.length) {
      return '<div class="patient-rx-empty">Nenhum protocolo encontrado com este termo.</div>';
    }

    return filtered.slice(0, 20).map(proto => `
      <div class="patient-catalog-item">
        <div class="patient-catalog-info">
          <strong>${safe(proto.title)}</strong>
          <small>${safe(proto.summary || "Diretriz e conduta baseada em evidencia.")}</small>
        </div>
        <div style="display: flex; gap: 0.4rem;">
          <button type="button" class="patient-btn-add-rx" data-add-proto-drug="${safe(proto.id)}">
            + Prescrever Protocolo
          </button>
        </div>
      </div>
    `).join('');
  };

  const renderBularioList = (filter = "") => {
    const list = getBulario();
    const q = normalize(filter);
    const filtered = list.filter(b => !q || normalize(b.name + " " + (b.active_ingredient || "") + " " + (b.therapeutic_class || "")).includes(q));

    if (!filtered.length) {
      return '<div class="patient-rx-empty">Nenhum medicamento encontrado no bulario.</div>';
    }

    return filtered.slice(0, 25).map(drug => {
      const form = drug.data?.formulations?.[0] || {};
      return `
        <div class="patient-catalog-item">
          <div class="patient-catalog-info">
            <strong>${safe(drug.name)}</strong>
            <small>${safe(drug.pharmacological_class || drug.therapeutic_class || "")} ${form.dose_text ? `· ${safe(form.dose_text.substring(0, 95))}...` : ""}</small>
          </div>
          <button type="button" class="patient-btn-add-rx" data-add-bulario="${safe(drug.id)}">
            + Adicionar ao Receituario
          </button>
        </div>
      `;
    }).join('');
  };

  const renderExamesList = (filter = "") => {
    const catalog = window.LURIA_EXAM_CATALOG || [];
    const q = normalize(filter);
    const allTests = catalog.flatMap(g => g.tests || []);
    const filtered = allTests.filter(t => !q || normalize(t.name + " " + (t.unit || "")).includes(q));

    if (!filtered.length) {
      return '<div class="patient-rx-empty">Nenhum exame encontrado.</div>';
    }

    return filtered.slice(0, 25).map(t => `
      <div class="patient-catalog-item">
        <div class="patient-catalog-info">
          <strong>${safe(t.name)}</strong>
          <small>Referencia habitual: ${t.min !== null && t.max !== null ? `${t.min} a ${t.max} ${safe(t.unit)}` : `Unidade: ${safe(t.unit || "—")}`}</small>
        </div>
        <span style="font-size: 0.75rem; color: #184888; font-weight: 750; background: #eef6fd; padding: 0.3rem 0.6rem; border-radius: 6px;">
          ${safe(t.unit || "laboratorial")}
        </span>
      </div>
    `).join('');
  };

  // -------------------------------------------------------------
  // BINDING DE EVENTOS
  // -------------------------------------------------------------
  const bind = (state) => {
    // 1. Criar Paciente Simplificado (Apenas peso, idade, sexo, alergias)
    root.querySelector('[data-form="create-simplified"]')?.addEventListener("submit", event => {
      event.preventDefault();
      const form = event.currentTarget;
      const data = Object.fromEntries(new FormData(form).entries());
      stateApi.createPatient(data);
      render();
    });

    // 2. Encerrar ou Novo Paciente
    root.querySelector('[data-action="end-patient"]')?.addEventListener("click", () => {
      if (window.confirm("Encerrar este atendimento e limpar os dados temporarios do paciente?")) {
        stateApi.endPatient();
        render();
      }
    });
    root.querySelector('[data-action="new-patient"]')?.addEventListener("click", () => {
      if (window.confirm("Iniciar um novo paciente? Os dados do atendimento atual serao encerrados.")) {
        stateApi.endPatient();
        render();
      }
    });

    // 3. IA de Escrita Livre
    const notesTextarea = root.querySelector("#patient-raw-notes");
    notesTextarea?.addEventListener("input", (e) => {
      state.rawNotes = e.target.value;
      sessionStorage.setItem(KEY, JSON.stringify(state));
    });

    root.querySelector('[data-action="run-ai"]')?.addEventListener("click", () => {
      const btn = root.querySelector('[data-action="run-ai"]');
      if (notesTextarea) state.rawNotes = notesTextarea.value;
      if (!state.rawNotes.trim()) {
        window.alert("Por favor, digite algumas frases ou palavras soltas sobre o paciente para que a IA possa organizar.");
        notesTextarea?.focus();
        return;
      }
      if (btn) {
        btn.disabled = true;
        btn.innerHTML = '<span>⏳</span><span>Organizando...</span>';
      }
      setTimeout(() => {
        stateApi.saveNotes(state.rawNotes);
        stateApi.runAI();
        render();
      }, 350);
    });

    root.querySelector('[data-action="copy-ai"]')?.addEventListener("click", () => {
      if (!state.aiStructured) return;
      const s = state.aiStructured;
      const fullText = `ANAMNESE ESTRUTURADA (IA)\n\nQP/HDA: ${s.hda || s.qp}\nSINAIS VITAIS / EXAME FISICO: ${s.exame_fisico}\nANTECEDENTES: ${s.antecedentes}\nMEDICACOES: ${s.medicamentos}\nHIPOTESES & CONDUTA: ${s.hipoteses} | ${s.condutas}`;
      navigator.clipboard.writeText(fullText).then(() => {
        window.alert("Texto estruturado copiado para a area de transferencia!");
      }).catch(() => {
        window.alert("Nao foi possivel copiar automaticamente.");
      });
    });

    // 4. Abas das Ferramentas
    root.querySelectorAll("[data-tab]").forEach(btn => {
      btn.addEventListener("click", () => {
        const tab = btn.dataset.tab;
        stateApi.setTab(tab);
        render();
      });
    });

    // 5. Filtros em tempo real
    root.querySelector("#search-protocolos")?.addEventListener("input", (e) => {
      const listEl = root.querySelector("#list-protocolos");
      if (listEl) listEl.innerHTML = renderProtocolsList(e.target.value);
      bindCatalogButtons();
    });
    root.querySelector("#search-bulario")?.addEventListener("input", (e) => {
      const listEl = root.querySelector("#list-bulario");
      if (listEl) listEl.innerHTML = renderBularioList(e.target.value);
      bindCatalogButtons();
    });
    root.querySelector("#search-exames")?.addEventListener("input", (e) => {
      const listEl = root.querySelector("#list-exames");
      if (listEl) listEl.innerHTML = renderExamesList(e.target.value);
    });

    // 6. Adicao Manual de Medicamento
    root.querySelector('[data-form="add-custom-drug"]')?.addEventListener("submit", (e) => {
      e.preventDefault();
      const form = e.currentTarget;
      const data = Object.fromEntries(new FormData(form).entries());
      if (!data.name?.trim()) return;

      stateApi.addPrescriptionItem({
        name: data.name.trim(),
        dose: data.dose?.trim() || "1 un",
        route: data.route || "VO",
        interval: data.interval?.trim() || "Conforme prescricao",
        source: "Manual"
      });
      render();
    });

    // 7. Remocao de item do receituario
    root.querySelectorAll("[data-remove-rx]").forEach(btn => {
      btn.addEventListener("click", () => {
        stateApi.removePrescriptionItem(btn.dataset.removeRx);
        render();
      });
    });

    // 8. Impressao de Receita
    root.querySelector('[data-action="print-rx"]')?.addEventListener("click", () => {
      window.print();
    });

    bindCatalogButtons();
  };

  const bindCatalogButtons = () => {
    // Adicao a partir do Bulario
    root.querySelectorAll("[data-add-bulario]").forEach(btn => {
      btn.addEventListener("click", () => {
        const id = btn.dataset.addBulario;
        const drug = getBulario().find(d => d.id === id);
        if (!drug) return;
        const form = drug.data?.formulations?.[0] || {};
        stateApi.addPrescriptionItem({
          name: drug.active_ingredient || drug.name,
          dose: form.dose_text ? form.dose_text.split(".")[0].replace("Dose habitual: ", "") : "Conforme peso/idade",
          route: form.route ? (form.route.includes("Endovenosa") ? "IV" : form.route.includes("Oral") ? "VO" : "IV/VO") : "VO",
          interval: form.interval_text || "24/24h",
          instructions: form.cautions || "",
          source: "Bulario Oficial"
        });
        render();
        root.querySelector("#patient-receituario")?.scrollIntoView({ behavior: "smooth" });
      });
    });

    // Adicao a partir de Protocolo
    root.querySelectorAll("[data-add-proto-drug]").forEach(btn => {
      btn.addEventListener("click", () => {
        const id = btn.dataset.addProtoDrug;
        const proto = getProtocols().find(p => p.id === id);
        if (!proto) return;
        
        let medName = proto.title;
        let dose = "Dose guiada por protocolo";
        let route = "IV";

        if (id.includes("sepse")) {
          medName = "Ceftriaxona 2g IV + Ringer Lactato 30 mL/kg";
          dose = "2g + expansao rapida";
          route = "IV";
        } else if (id.includes("avc")) {
          medName = "Alteplase (rtPA) 0,9 mg/kg";
          dose = "Max 90 mg (10% em bolus + 90% em 1h)";
          route = "IV";
        } else {
          medName = `Manejo: ${proto.title}`;
        }

        stateApi.addPrescriptionItem({
          name: medName,
          dose: dose,
          route: route,
          interval: "Dose inicial de ataque / emergencia",
          instructions: `Protocolo: ${proto.title}`,
          source: "Protocolo Clinico"
        });
        render();
        root.querySelector("#patient-receituario")?.scrollIntoView({ behavior: "smooth" });
      });
    });
  };

  const render = () => {
    const state = read();
    root.innerHTML = state.patient ? activeMarkup(state) : startMarkup();
    bind(state);
  };

  window.addEventListener("luria:patient-context-changed", render);
  render();
})();
