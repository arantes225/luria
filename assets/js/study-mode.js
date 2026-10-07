(() => {
  "use strict";

  const AREAS = [
    "Clínica Médica",
    "Cirurgia Geral",
    "Ginecologia e Obstetrícia",
    "Pediatria",
    "Medicina Preventiva"
  ];

  const SUBJECTS_BY_AREA = {
    "Clínica Médica": [
      "Alergia e Imunologia","Cardiologia","Dermatologia","Endocrinologia e Metabologia",
      "Gastroenterologia","Genética Médica","Geriatria","Hematologia e Hemoterapia",
      "Infectologia","Medicina de Emergência","Medicina Intensiva","Nefrologia",
      "Neurologia","Nutrologia","Oncologia Clínica","Pneumologia","Psiquiatria",
      "Reumatologia","Toxicologia","Cuidados Paliativos"
    ],
    "Cirurgia Geral": [
      "Anestesiologia","Angiologia","Cirurgia Cardiovascular","Cirurgia da Mão",
      "Cirurgia de Cabeça e Pescoço","Cirurgia do Aparelho Digestivo","Cirurgia Oncológica",
      "Cirurgia Pediátrica","Cirurgia Plástica","Cirurgia Torácica","Cirurgia Vascular",
      "Coloproctologia","Endoscopia","Mastologia","Neurocirurgia","Oftalmologia",
      "Ortopedia e Traumatologia","Otorrinolaringologia","Urologia","Trauma"
    ],
    "Ginecologia e Obstetrícia": [
      "Ginecologia","Obstetrícia","Medicina Fetal","Endocrinologia Ginecológica",
      "Reprodução Humana","Oncologia Ginecológica","Uroginecologia","Patologia Mamária"
    ],
    "Pediatria": [
      "Neonatologia","Puericultura","Infectologia Pediátrica","Pneumologia Pediátrica",
      "Cardiologia Pediátrica","Gastroenterologia Pediátrica","Nefrologia Pediátrica",
      "Endocrinologia Pediátrica","Neurologia Pediátrica","Hematologia Pediátrica",
      "Oncologia Pediátrica","Emergências Pediátricas","Cirurgia Pediátrica"
    ],
    "Medicina Preventiva": [
      "Bioestatística","Epidemiologia","Medicina Baseada em Evidências",
      "Medicina de Família e Comunidade","Medicina do Trabalho","Medicina Legal e Perícia Médica",
      "Saúde Coletiva","Atenção Primária à Saúde","SUS","Vigilância em Saúde",
      "Ética Médica","Bioética","Gestão em Saúde","Políticas de Saúde"
    ]
  };

  const norm = value => String(value || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim()
    .toLowerCase()
    .replace(/\s+/g, " ");

  const AREA_ALIASES = new Map([
    ["clinica", "Clínica Médica"],["clinica medica", "Clínica Médica"],
    ["cirurgia", "Cirurgia Geral"],["cirurgia geral", "Cirurgia Geral"],
    ["go", "Ginecologia e Obstetrícia"],["g.o.", "Ginecologia e Obstetrícia"],
    ["ginecologia", "Ginecologia e Obstetrícia"],["obstetricia", "Ginecologia e Obstetrícia"],
    ["ginecologia e obstetricia", "Ginecologia e Obstetrícia"],
    ["ginecologia obstetricia", "Ginecologia e Obstetrícia"],
    ["pediatria", "Pediatria"],
    ["preventiva", "Medicina Preventiva"],["medicina preventiva", "Medicina Preventiva"],
    ["medicina preventiva e social", "Medicina Preventiva"],["saude coletiva", "Medicina Preventiva"]
  ]);

  const SUBJECT_TO_AREA = new Map();
  Object.entries(SUBJECTS_BY_AREA).forEach(([area, subjects]) => {
    subjects.forEach(subject => SUBJECT_TO_AREA.set(norm(subject), area));
  });

  const canonicalArea = value => {
    const key = norm(value);
    if (!key) return "";
    return AREA_ALIASES.get(key) || SUBJECT_TO_AREA.get(key) || "";
  };

  const isArea = value => AREAS.includes(canonicalArea(value));

  function normalizeClassification(area, materia = "") {
    const rawArea = String(area || "").trim();
    const rawMateria = String(materia || "").trim();
    const areaFromArea = canonicalArea(rawArea);

    if (areaFromArea) {
      const areaWasSubject =
        rawArea && !AREA_ALIASES.has(norm(rawArea)) && SUBJECT_TO_AREA.has(norm(rawArea));
      return {
        area: areaFromArea,
        materia: rawMateria || (areaWasSubject ? rawArea : "")
      };
    }

    const areaFromMateria = canonicalArea(rawMateria);
    return {
      area: areaFromMateria || "",
      materia: rawMateria || rawArea
    };
  }

  function escapeOption(value) {
    return String(value ?? "")
      .replaceAll("&", "&amp;")
      .replaceAll('"', "&quot;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;");
  }

  function fill(selector, tag = "option") {
    document.querySelectorAll(selector).forEach(element => {
      const previous = canonicalArea(element.value || "");
      if (element.tagName === "DATALIST") {
        element.innerHTML = AREAS.map(area => `<option value="${escapeOption(area)}"></option>`).join("");
        return;
      }
      const blankLabel = element.dataset.blankLabel || "Todas as áreas";
      element.innerHTML =
        `<option value="">${escapeOption(blankLabel)}</option>`
        + AREAS.map(area => `<option value="${escapeOption(area)}">${escapeOption(area)}</option>`).join("");
      if (previous) element.value = previous;
    });
  }

  function apply() {
    window.luriaStudyMode = "medicine";
    document.documentElement.dataset.studyMode = "medicine";

    fill("[data-luria-area-list], [data-luria-general-area-list]");
    fill("[data-luria-area-select], [data-luria-general-area-select]");

    document.querySelectorAll(
      'input[list][data-luria-area-input],input[list][data-luria-general-area-input],input[list="medical-areas"],input[list="error-medical-areas"],input[list="manual-area-options"]'
    ).forEach(input => { input.placeholder = "Ex.: Clínica Médica"; });

    document.querySelectorAll("[data-study-mode-label]")
      .forEach(element => { element.textContent = "Medicina"; });

    window.dispatchEvent(new CustomEvent("luria:study-mode", {
      detail: { mode: "medicine", areas: [...AREAS], generalAreas: [...AREAS] }
    }));

    return "medicine";
  }

  window.LuriaMedicalTaxonomy = {
    AREAS: [...AREAS],
    SUBJECTS_BY_AREA,
    canonicalArea,
    isArea,
    normalizeClassification
  };

  window.LuriaStudyMode = {
    AREAS: { medicine: [...AREAS] },
    GENERAL_AREAS: { medicine: [...AREAS] },
    normalizeMode: () => "medicine",
    modeLabel: () => "Medicina",
    areasFor: () => [...AREAS],
    generalAreasFor: () => [...AREAS],
    apply,
    load: async () => apply()
  };

  if (window.docmapUser) apply();
  else window.addEventListener("docmap:ready", apply, { once: true });
})();