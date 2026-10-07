const scheduleSb = window.supabaseClient;

const scheduleState = {
  user: null,
  file: null,
  parsedRows: [],
  detected: null,
  fileType: null,
  topics: [],
  events: [],
  errorItems: [],
  existingTopicKeys: new Set(),
  existingEventKeys: new Set(),
  weekAnchor: startOfDaySchedule(new Date()),
  plannerView: "month",
  draggingTopicId: null,
  alreadyDoneTopicId: null,
  themeSearch: "",
  themeAreaFilter: "",
  themeBlockFilter: "",
  themeDateFrom: "",
  themeDateTo: "",
  themeCompletionFilter: "all",
  libraryTab: "lessons",
  eventSearch: "",
  eventTypeFilter: "all",
  eventDateFrom: "",
  eventDateTo: "",
  editingEventId: null,
  agendaScope: "today",
  agendaFilter: "all",
  agendaAreaFilter: "all",
  agendaThemeFilter: "all",
  monthFilter: "all",
  monthAreaFilter: "all",
  monthThemeFilter: "all",
  agendaSelected: new Set(),

  theoryStudyWeekdays:
    [1, 3, 5],

  maxLessonsPerDay:
    1,

  targetExams:
    [],

  addMode:
    "automatic",

  selectedThemeIds:
    new Set()
};

const HEADER_ALIASES = {
  date: [
    "data",
    "date",
    "dia",
    "data aula",
    "data da aula",
    "data de estudo",
    "data estudo"
  ],

  area: [
    "area",
    "grande area",
    "macroarea",
    "macro area",
    "especialidade"
  ],

  materia: [
    "materia",
    "disciplina",
    "subarea",
    "sub area"
  ],

  bloco: [
    "bloco",
    "block",
    "modulo",
    "módulo"
  ],

  theme: [
    "tema",
    "assunto",
    "conteudo",
    "conteudo da aula",
    "aula",
    "topico",
    "titulo",
    "titulo da aula"
  ],

  done: [
    "aula ja feita",
    "ja feita",
    "feito",
    "feita",
    "concluida",
    "concluido",
    "aula concluida",
    "aula concluido",
    "estudada",
    "estudado"
  ],

  studiedDate: [
    "data estudada",
    "data em que estudou",
    "data feita",
    "data concluida",
    "data da conclusao",
    "data de conclusao"
  ],

  type: [
    "tipo",
    "tipo de atividade",
    "atividade",
    "categoria",
    "event type"
  ]
};


const SCHEDULE_KIND_LABELS = {
  lesson: "Aula",
  simulation: "Simulado programado",
  smart_simulation: "Simulado inteligente",
  full_exam: "Prova na íntegra",
  smart_review: "Revisão inteligente",
  external_review: "Revisão teórica",
  final_review: "Reta final",
  other: "Outro evento"
};


function scheduleKindLabel(kind) {
  return SCHEDULE_KIND_LABELS[kind]
    || SCHEDULE_KIND_LABELS.other;
}


function classifyScheduleKind(title, explicitType = "") {
  const source = normalizeHeader(
    `${explicitType} ${title}`
  );

  if (
    source.includes("simulado inteligente")
  ) {
    return "smart_simulation";
  }

  if (
    source.includes("simulado programado")
    || source.includes("simulado diagnostico")
  ) {
    return "simulation";
  }

  if (
    source.includes("prova na integra")
  ) {
    return "full_exam";
  }

  if (
    source.includes("revisao inteligente")
  ) {
    return "smart_review";
  }

  if (
    source.includes("revisao teorica")
  ) {
    return "external_review";
  }

  if (
    source.includes("reta final")
  ) {
    return "final_review";
  }

  if (
    source.includes("simulado")
  ) {
    return "simulation";
  }

  if (
    source.includes("prova")
    && explicitType
  ) {
    return "full_exam";
  }

  return "lesson";
}


function normalizeHeader(value) {
  return String(value ?? "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim()
    .toLowerCase()
    .replace(/[_-]+/g, " ")
    .replace(/\s+/g, " ");
}

function escapeScheduleHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function startOfDaySchedule(date) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

function addDaysSchedule(date, amount) {
  const copy = startOfDaySchedule(date);
  copy.setDate(copy.getDate() + amount);
  return copy;
}

function startOfWeekSchedule(date) {
  const copy = startOfDaySchedule(date);
  const day = copy.getDay();
  const delta = day === 0 ? -6 : 1 - day;
  return addDaysSchedule(copy, delta);
}

function toISODateSchedule(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function sameDateSchedule(a, b) {
  return toISODateSchedule(a) === toISODateSchedule(b);
}

function formatDateLabelSchedule(
  value
) {
  if (!value) {
    return "—";
  }

  let date;

  if (
    value instanceof Date
  ) {
    date =
      value;
  } else {
    const [
      year,
      month,
      day
    ] =
      String(value)
        .slice(0, 10)
        .split("-")
        .map(Number);

    date =
      new Date(
        year,
        month - 1,
        day
      );
  }

  if (
    Number.isNaN(
      date.getTime()
    )
  ) {
    return String(value);
  }

  return new Intl.DateTimeFormat(
    "pt-BR",
    {
      day:
        "2-digit",

      month:
        "2-digit",

      year:
        "numeric"
    }
  ).format(
    date
  );
}


function formatShortSchedule(date) {
  return new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "short"
  }).format(date).replace(".", "");
}

function formatWeekRangeSchedule(start, end) {
  if (start.getMonth() === end.getMonth()) {
    const monthYear = new Intl.DateTimeFormat("pt-BR", {
      month: "long",
      year: "numeric"
    }).format(end);

    return `${start.getDate()}–${end.getDate()} de ${monthYear}`;
  }

  return `${formatShortSchedule(start)} – ${formatShortSchedule(end)} de ${end.getFullYear()}`;
}

function formatMonthLabelSchedule(date) {
  const label = new Intl.DateTimeFormat("pt-BR", {
    month: "long",
    year: "numeric"
  }).format(date);

  return (label.charAt(0).toUpperCase() + label.slice(1)).replace(" de ", " ");
}

function startOfMonthSchedule(date) {
  return new Date(date.getFullYear(), date.getMonth(), 1);
}

function addMonthsSchedule(date, amount) {
  const copy = startOfMonthSchedule(date);
  copy.setMonth(copy.getMonth() + amount);
  return copy;
}

function currentImportMode() {
  return document.querySelector('input[name="import-mode"]:checked')?.value || "dates";
}

function setImportStatus(text, type = "") {
  const el = document.getElementById("import-status");
  el.textContent = text;
  el.className = `import-status ${type}`.trim();
}

function findHeaderIndex(normalizedHeaders, aliases) {
  return normalizedHeaders.findIndex((header) => aliases.includes(header));
}

function detectHeaderRow(rows) {
  const maxScan = Math.min(rows.length, 12);

  let bestIndex = 0;
  let bestScore = -1;

  for (let i = 0; i < maxScan; i += 1) {
    const normalized = (rows[i] || []).map(normalizeHeader);

    let score = 0;

    for (const aliases of Object.values(HEADER_ALIASES)) {
      if (normalized.some((header) => aliases.includes(header))) {
        score += 1;
      }
    }

    if (score > bestScore) {
      bestScore = score;
      bestIndex = i;
    }
  }

  return bestIndex;
}

function parseExcelDate(value) {
  if (value === null || value === undefined || value === "") {
    return null;
  }

  if (value instanceof Date && !Number.isNaN(value.getTime())) {
    return toISODateSchedule(value);
  }

  if (typeof value === "number") {
    const decoded = window.XLSX?.SSF?.parse_date_code(value);

    if (decoded?.y && decoded?.m && decoded?.d) {
      return toISODateSchedule(
        new Date(decoded.y, decoded.m - 1, decoded.d)
      );
    }
  }

  const text = String(value).trim();

  let match = text.match(/^(\d{4})-(\d{1,2})-(\d{1,2})$/);

  if (match) {
    const [, y, m, d] = match;
    return `${y}-${m.padStart(2, "0")}-${d.padStart(2, "0")}`;
  }

  match = text.match(/^(\d{1,2})[\/\-.](\d{1,2})[\/\-.](\d{2,4})$/);

  if (match) {
    let [, d, m, y] = match;

    if (y.length === 2) {
      y = Number(y) >= 70 ? `19${y}` : `20${y}`;
    }

    return `${y}-${m.padStart(2, "0")}-${d.padStart(2, "0")}`;
  }

  return null;
}

function parseBooleanCell(value) {
  if (typeof value === "boolean") return value;

  if (typeof value === "number") return value === 1;

  const normalized = normalizeHeader(value);

  return [
    "sim",
    "s",
    "yes",
    "y",
    "true",
    "1",
    "feito",
    "feita",
    "concluido",
    "concluida",
    "estudado",
    "estudada"
  ].includes(normalized);
}

function getCell(row, index) {
  if (index < 0) return "";
  return row[index] ?? "";
}

function cleanText(value) {
  return String(value ?? "").trim();
}

function isOnboardingScheduleContent(value) {
  return normalizeHeader(
    value
  ).includes(
    "onboarding"
  );
}

function rowIsOnboarding(row) {
  return [
    row?.theme,
    row?.area,
    row?.materia,
    row?.bloco,
    row?.sourceLabel,
    row?.sourceBlock
  ].some(
    isOnboardingScheduleContent
  );
}

function parseWorkbookRows(matrix, sheetName) {
  if (!matrix.length) {
    throw new Error("A planilha está vazia.");
  }

  const headerRowIndex = detectHeaderRow(matrix);
  const rawHeaders = matrix[headerRowIndex] || [];
  const normalizedHeaders = rawHeaders.map(normalizeHeader);

  const indexes = {
    date: findHeaderIndex(normalizedHeaders, HEADER_ALIASES.date),
    area: findHeaderIndex(normalizedHeaders, HEADER_ALIASES.area),
    materia: findHeaderIndex(normalizedHeaders, HEADER_ALIASES.materia),
    bloco: findHeaderIndex(normalizedHeaders, HEADER_ALIASES.bloco),
    theme: findHeaderIndex(normalizedHeaders, HEADER_ALIASES.theme),
    done: findHeaderIndex(normalizedHeaders, HEADER_ALIASES.done),
    studiedDate: findHeaderIndex(normalizedHeaders, HEADER_ALIASES.studiedDate),
    type: findHeaderIndex(normalizedHeaders, HEADER_ALIASES.type)
  };

  if (indexes.theme < 0) {
    throw new Error(
      'Não encontrei uma coluna de Tema/Assunto/Conteúdo/Aula.'
    );
  }

  const mode = currentImportMode();

  const parsed = [];

  for (
    let rowIndex = headerRowIndex + 1;
    rowIndex < matrix.length;
    rowIndex += 1
  ) {
    const row = matrix[rowIndex] || [];

    const theme = cleanText(getCell(row, indexes.theme));
    const area = cleanText(getCell(row, indexes.area));
    const materia = cleanText(getCell(row, indexes.materia));
    const bloco = cleanText(getCell(row, indexes.bloco));

    const rawDate = getCell(row, indexes.date);
    const rawDone = getCell(row, indexes.done);
    const rawStudiedDate = getCell(row, indexes.studiedDate);
    const rawType = getCell(row, indexes.type);

    const date = parseExcelDate(rawDate);
    const alreadyDone = indexes.done >= 0
      ? parseBooleanCell(rawDone)
      : false;

    const studiedDate = indexes.studiedDate >= 0
      ? parseExcelDate(rawStudiedDate)
      : null;

    const fullyBlank =
      !theme &&
      !area &&
      !materia &&
      !bloco &&
      !cleanText(rawDate) &&
      !cleanText(rawDone) &&
      !cleanText(rawStudiedDate);

    if (fullyBlank) continue;

    if (
      [
        theme,
        area,
        materia,
        bloco,
        cleanText(rawType)
      ].some(
        isOnboardingScheduleContent
      )
    ) {
      continue;
    }

    const errors = [];

    if (!theme) {
      errors.push("Tema ausente");
    }

    const kind =
      classifyScheduleKind(
        theme,
        cleanText(rawType)
      );

    if (
      kind !== "lesson"
      && !alreadyDone
      && !date
    ) {
      errors.push("Data obrigatória para evento");
    }

    parsed.push({
      rowNumber: rowIndex + 1,
      sourceLabel:
        `${sheetName} · linha ${rowIndex + 1}`,
      sourcePage: null,
      date,
      area,
      materia,
      bloco,
      theme,
      kind,
      alreadyDone,
      studiedDate,
      confidence: "high",
      include: kind === "lesson",
      duplicate: false,
      errors
    });
  }

  return {
    sheetName,
    headerRowIndex,
    rawHeaders,
    indexes,
    rows: parsed
  };
}


function confidenceLabel(value) {
  const labels = {
    high: "Alta",
    medium: "Revisar",
    low: "Baixa"
  };

  return labels[value] || "Revisar";
}


function buildTopicKey(row) {
  return [
    row.date || "",
    normalizeHeader(row.theme)
  ].join("|");
}


function buildEventKey(row) {
  return [
    row.date || "",
    row.kind || "other",
    normalizeHeader(row.theme)
  ].join("|");
}


function refreshExistingKeys() {
  scheduleState.existingTopicKeys =
    new Set(
      scheduleState.topics
        .filter(
          (topic) =>
            topic.theme
            && (
              topic.scheduled_date
              || topic.original_date
            )
        )
        .map(
          (topic) =>
            [
              topic.scheduled_date
                || topic.original_date
                || "",
              normalizeHeader(
                topic.theme
              )
            ].join("|")
        )
    );

  scheduleState.existingEventKeys =
    new Set(
      scheduleState.events
        .filter(
          (event) =>
            event.title
            && event.event_date
        )
        .map(
          (event) =>
            [
              event.event_date,
              event.event_type,
              normalizeHeader(
                event.title
              )
            ].join("|")
        )
    );
}


function validateImportRow(row) {
  const errors = [];

  if (
    !cleanText(
      row.theme
    )
  ) {
    errors.push(
      "Conteúdo ausente"
    );
  }

  const mode =
    currentImportMode();

  if (
    row.kind !== "lesson"
    && !row.alreadyDone
    && !row.date
  ) {
    errors.push(
      "Data obrigatória para evento"
    );
  }

  row.errors =
    errors;

  row.duplicate =
    row.kind === "lesson"
      ? scheduleState
          .existingTopicKeys
          .has(
            buildTopicKey(
              row
            )
          )
      : scheduleState
          .existingEventKeys
          .has(
            buildEventKey(
              row
            )
          );

  if (
    row.duplicate
  ) {
    row.include =
      false;
  }
}


function applyDuplicateFlags() {
  refreshExistingKeys();

  for (
    const row
    of scheduleState.parsedRows
  ) {
    validateImportRow(
      row
    );
  }
}


function renderPreview() {
  const preview =
    document.getElementById(
      "import-preview"
    );

  const body =
    document.getElementById(
      "preview-body"
    );

  const summary =
    document.getElementById(
      "preview-summary"
    );

  const rows =
    scheduleState.parsedRows;


  if (!rows.length) {
    preview.classList.remove(
      "visible"
    );

    body.innerHTML =
      "";

    summary.textContent =
      "";

    return;
  }


  applyDuplicateFlags();


  const invalid =
    rows.filter(
      (row) =>
        row.errors.length > 0
    ).length;

  const duplicate =
    rows.filter(
      (row) =>
        row.duplicate
    ).length;

  const selected =
    rows.filter(
      (row) =>
        row.include
        && !row.duplicate
        && row.errors.length === 0
    ).length;


  summary.textContent =
    `${selected} selecionado${selected === 1 ? "" : "s"} · ${duplicate} já existente${duplicate === 1 ? "" : "s"} · ${invalid} com problema`;


  const selectAllImport =
    document.getElementById(
      "preview-select-all"
    );

  if (selectAllImport) {
    const eligible =
      rows.filter(
        (row) =>
          !row.duplicate
          && row.errors.length === 0
      );

    const selectedEligible =
      eligible.filter(
        (row) =>
          row.include
      ).length;

    selectAllImport.checked =
      eligible.length > 0
      && selectedEligible === eligible.length;

    selectAllImport.indeterminate =
      selectedEligible > 0
      && selectedEligible < eligible.length;
  }


  body.innerHTML =
    rows.map(
      (
        row,
        index
      ) => {
        const status =
          row.duplicate
            ? '<span class="duplicate-pill">Já existe</span>'
            : row.errors.length
              ? `<span class="row-error">${escapeScheduleHtml(
                  row.errors.join(
                    ", "
                  )
                )}</span>`
              : "Pronta";


        return `
          <tr data-preview-row="${index}">

            <td>
              <input
                class="preview-check"
                type="checkbox"
                data-preview-include="${index}"
                ${row.include && !row.duplicate ? "checked" : ""}
                ${row.duplicate ? "disabled" : ""}
                aria-label="Importar linha"
              >
            </td>

            <td>
              ${escapeScheduleHtml(
                row.sourceLabel
                || `Linha ${row.rowNumber || index + 1}`
              )}
            </td>

            <td>
              <input
                class="preview-input"
                type="date"
                value="${escapeScheduleHtml(
                  row.date
                  || ""
                )}"
                data-preview-field="date"
                data-preview-index="${index}"
              >
            </td>

            <td>
              <select
                class="preview-select"
                data-preview-field="kind"
                data-preview-index="${index}"
              >
                ${Object
                  .entries(
                    SCHEDULE_KIND_LABELS
                  )
                  .map(
                    (
                      [
                        value,
                        label
                      ]
                    ) => `
                      <option
                        value="${value}"
                        ${row.kind === value ? "selected" : ""}
                      >
                        ${escapeScheduleHtml(label)}
                      </option>
                    `
                  )
                  .join("")}
              </select>
            </td>

            <td>
              <input
                class="preview-input"
                type="text"
                value="${escapeScheduleHtml(
                  row.area
                  || ""
                )}"
                placeholder="Opcional"
                data-preview-field="area"
                data-preview-index="${index}"
              >
            </td>

            <td>
              <input
                class="preview-input"
                type="text"
                value="${escapeScheduleHtml(
                  row.materia
                  || ""
                )}"
                placeholder="Opcional"
                data-preview-field="materia"
                data-preview-index="${index}"
              >
            </td>

            <td>
              <input
                class="preview-input"
                type="text"
                value="${escapeScheduleHtml(
                  row.bloco
                  || ""
                )}"
                placeholder="Opcional"
                data-preview-field="bloco"
                data-preview-index="${index}"
              >
            </td>

            <td>
              <input
                class="preview-input title-input"
                type="text"
                value="${escapeScheduleHtml(
                  row.theme
                  || ""
                )}"
                data-preview-field="theme"
                data-preview-index="${index}"
              >
            </td>

            <td>
              <input
                class="preview-check"
                type="checkbox"
                data-preview-field="alreadyDone"
                data-preview-index="${index}"
                ${row.alreadyDone ? "checked" : ""}
                ${row.kind !== "lesson" ? "disabled" : ""}
                aria-label="Aula já feita"
              >
            </td>

            <td>
              <input
                class="preview-input"
                type="date"
                value="${escapeScheduleHtml(
                  row.studiedDate
                  || ""
                )}"
                data-preview-field="studiedDate"
                data-preview-index="${index}"
                ${row.kind !== "lesson" ? "disabled" : ""}
              >
            </td>

            <td>
              <span class="confidence-pill ${escapeScheduleHtml(
                row.confidence
                || "medium"
              )}">
                ${escapeScheduleHtml(
                  confidenceLabel(
                    row.confidence
                  )
                )}
              </span>
            </td>

            <td>
              ${status}
            </td>

          </tr>
        `;
      }
    )
    .join("");


  preview.classList.add(
    "visible"
  );


  const confirm =
    document.getElementById(
      "confirm-import"
    );

  confirm.disabled =
    selected === 0;


  wirePreviewEditor();
}


function wirePreviewEditor() {
  document
    .querySelectorAll(
      "[data-preview-include]"
    )
    .forEach(
      (input) => {
        input.addEventListener(
          "change",
          () => {
            const index =
              Number(
                input.dataset
                  .previewInclude
              );

            const row =
              scheduleState
                .parsedRows[index];

            if (!row) return;

            row.include =
              input.checked;

            renderPreview();
          }
        );
      }
    );


  document
    .querySelectorAll(
      "[data-preview-field]"
    )
    .forEach(
      (input) => {
        input.addEventListener(
          "change",
          () => {
            const index =
              Number(
                input.dataset
                  .previewIndex
              );

            const field =
              input.dataset
                .previewField;

            const row =
              scheduleState
                .parsedRows[index];

            if (
              !row
              || !field
            ) {
              return;
            }


            if (
              field ===
              "alreadyDone"
            ) {
              row.alreadyDone =
                input.checked;

            } else {
              row[field] =
                input.value;
            }


            if (
              field === "kind"
              && row.kind
              !== "lesson"
            ) {
              row.alreadyDone =
                false;

              row.studiedDate =
                null;
            }


            if (
              row.duplicate
            ) {
              row.include =
                true;
            }


            validateImportRow(
              row
            );

            renderPreview();
          }
        );
      }
    );
}


function setPdfModeState(
  enabled,
  preferDeck = false
) {
  const dates =
    document.querySelector(
      'input[name="import-mode"][value="dates"]'
    );

  const deck =
    document.querySelector(
      'input[name="import-mode"][value="deck"]'
    );

  if (deck) {
    // PDFs também podem vir sem datas (por exemplo, cronogramas organizados por blocos).
    // Nesses casos as aulas devem poder ir diretamente para o Deck.
    deck.disabled =
      false;
  }

  if (!enabled) {
    if (dates) {
      dates.checked =
        true;
    }

    return;
  }

  if (
    preferDeck
    && deck
  ) {
    deck.checked =
      true;
  }
}


function syncImportModeToRows(
  rows
) {
  const lessons =
    (rows || [])
      .filter(
        (row) =>
          row.kind ===
          "lesson"
      );

  if (!lessons.length) {
    return;
  }

  const hasDatedLesson =
    lessons.some(
      (row) =>
        Boolean(
          row.date
        )
    );

  setPdfModeState(
    scheduleState.fileType
      === "pdf",
    !hasDatedLesson
  );
}

function isPdfFile(
  file
) {
  return (
    file?.type ===
      "application/pdf"
    || /\.pdf$/i.test(
      file?.name
      || ""
    )
  );
}


function parseYearRangeText(
  text
) {
  const normalized =
    String(
      text
      || ""
    );

  const match =
    normalized.match(
      /(20\d{2})\D{0,12}(20\d{2})/
    );

  if (match) {
    return {
      startYear:
        Number(
          match[1]
        ),

      endYear:
        Number(
          match[2]
        )
    };
  }

  const single =
    normalized.match(
      /(20\d{2})/
    );

  const year =
    single
      ? Number(
          single[1]
        )
      : new Date()
          .getFullYear();

  return {
    startYear:
      year,

    endYear:
      year
  };
}


function pdfTokenTopY(
  item,
  viewport
) {
  return (
    viewport.height
    - Number(
        item.transform?.[5]
        || 0
      )
  );
}


function groupPdfTokensByY(
  tokens,
  tolerance = 3.8
) {
  const groups =
    [];

  const ordered =
    [...tokens]
      .sort(
        (
          a,
          b
        ) =>
          a.y - b.y
          || a.x - b.x
      );


  for (
    const token
    of ordered
  ) {
    const last =
      groups[
        groups.length - 1
      ];

    if (
      !last
      || Math.abs(
        token.y
        - last.y
      ) > tolerance
    ) {
      groups.push({
        y:
          token.y,

        tokens:
          [token]
      });

      continue;
    }


    last.tokens.push(
      token
    );

    last.y =
      last.tokens.reduce(
        (
          total,
          current
        ) =>
          total
          + current.y,
        0
      )
      / last.tokens.length;
  }


  return groups;
}


function pdfLineText(
  group
) {
  return cleanText(
    [...group.tokens]
      .sort(
        (
          a,
          b
        ) =>
          a.x - b.x
      )
      .map(
        (token) =>
          token.text
      )
      .join(" ")
  );
}


function shouldIgnorePdfLine(
  text
) {
  const normalized =
    normalizeHeader(
      text
    );

  if (!normalized) {
    return true;
  }

  if (
    normalized.startsWith(
      "se estiver em atraso"
    )
  ) {
    return true;
  }

  if (
    [
      "segunda",
      "terca",
      "quarta",
      "quinta",
      "sexta",
      "sabado",
      "domingo"
    ].includes(
      normalized
    )
  ) {
    return true;
  }

  if (
    /^(jan|fev|mar|abr|mai|jun|jul|ago|set|out|nov|dez)\/\d{2}$/
      .test(
        normalized
      )
  ) {
    return true;
  }

  return false;
}


function isoFromPlannerDate(
  shortDate,
  pageMonth,
  pageYear
) {
  const match =
    String(
      shortDate
    )
      .match(
        /^(\d{1,2})\/(\d{1,2})$/
      );

  if (!match) {
    return null;
  }

  const day =
    Number(
      match[1]
    );

  const month =
    Number(
      match[2]
    );

  let year =
    pageYear;

  if (
    month
    < pageMonth - 6
  ) {
    year += 1;

  } else if (
    month
    > pageMonth + 6
  ) {
    year -= 1;
  }


  return [
    String(year)
      .padStart(
        4,
        "0"
      ),

    String(month)
      .padStart(
        2,
        "0"
      ),

    String(day)
      .padStart(
        2,
        "0"
      )
  ].join("-");
}


function makePdfRow({
  date,
  title,
  kind,
  pageNumber,
  confidence,
  area = "",
  materia = "",
  bloco = "",
  sourceBlock = null
}) {
  const normalizedTitle =
    cleanText(
      title
    );

  return {
    rowNumber:
      pageNumber,

    sourceLabel:
      [
        `PDF · pág. ${pageNumber}`,
        sourceBlock
      ]
        .filter(Boolean)
        .join(" · "),

    sourcePage:
      pageNumber,

    sourceBlock:
      sourceBlock
      || null,

    date:
      date
      || null,

    area:
      cleanText(
        area
      ),

    materia:
      cleanText(
        materia
      ),

    bloco:
      cleanText(
        bloco
        || sourceBlock
        || ""
      ),

    theme:
      normalizedTitle,

    kind:
      kind
      || classifyScheduleKind(
        normalizedTitle
      ),

    alreadyDone:
      false,

    studiedDate:
      null,

    confidence:
      confidence
      || "medium",

    include:
      (
        kind
        || classifyScheduleKind(
          normalizedTitle
        )
      ) === "lesson",

    duplicate:
      false,

    errors:
      []
  };
}

function dedupeParsedRows(
  rows
) {
  const seen =
    new Set();

  return (
    rows || []
  )
    .filter(
      (row) => {
        if (
          !row
          || rowIsOnboarding(
            row
          )
        ) {
          return false;
        }

        const key =
          [
            row.date
              || "",
            row.kind
              || "",
            normalizeHeader(
              row.theme
            )
          ].join("|");


        if (
          seen.has(
            key
          )
        ) {
          return false;
        }


        seen.add(
          key
        );

        return Boolean(
          row.theme
        );
      }
    );
}


async function extractPdfPageTokens(
  page
) {
  const viewport =
    page.getViewport({
      scale:
        1
    });

  const content =
    await page
      .getTextContent();

  return {
    width:
      viewport.width,

    height:
      viewport.height,

    tokens:
      content.items
        .map(
          (item) => ({
            text:
              cleanText(
                item.str
              ),

            x:
              Number(
                item.transform?.[4]
                || 0
              ),

            y:
              pdfTokenTopY(
                item,
                viewport
              ),

            width:
              Number(
                item.width
                || 0
              )
          })
        )
        .filter(
          (item) =>
            item.text
        )
  };
}


function parseMonthlyPlannerPage({
  tokens,
  width,
  height,
  pageNumber,
  calendarIndex,
  startYear
}) {
  const pageMonth =
    (
      calendarIndex
      % 12
    )
    + 1;

  const pageYear =
    startYear
    + Math.floor(
        calendarIndex
        / 12
      );


  const dateTokens =
    tokens.filter(
      (token) =>
        /^\d{1,2}\/\d{1,2}$/
          .test(
            token.text
          )
        && token.y
          > height * .18
        && token.y
          < height * .94
        && token.x
          > width * .08
        && token.x
          < width * .92
    );


  const dateGroups =
    groupPdfTokensByY(
      dateTokens,
      4.2
    )
      .filter(
        (group) =>
          group.tokens.length
          >= 5
      )
      .map(
        (group) => ({
          y:
            group.y,

          tokens:
            [...group.tokens]
              .sort(
                (
                  a,
                  b
                ) =>
                  a.x - b.x
              )
        })
      )
      .sort(
        (
          a,
          b
        ) =>
          a.y - b.y
      );


  if (
    dateGroups.length
    < 3
  ) {
    return [];
  }


  const rows =
    [];

  const rightThreshold =
    width * .66;


  for (
    let index = 0;
    index < dateGroups.length;
    index += 1
  ) {
    const dateGroup =
      dateGroups[index];

    const nextY =
      index + 1
        < dateGroups.length
          ? dateGroups[
              index + 1
            ].y
          : Math.min(
              height * .94,
              dateGroup.y
              + height * .15
            );


    const dates =
      dateGroup.tokens
        .slice(
          0,
          7
        )
        .map(
          (token) =>
            isoFromPlannerDate(
              token.text,
              pageMonth,
              pageYear
            )
        );


    if (
      dates.length
      < 7
    ) {
      continue;
    }


    const bandTokens =
      tokens.filter(
        (token) =>
          token.y
            > dateGroup.y + 7
          && token.y
            < nextY - 3
          && !/^\d{1,2}\/\d{1,2}$/
              .test(
                token.text
              )
      );


    const leftGroups =
      groupPdfTokensByY(
        bandTokens.filter(
          (token) =>
            token.x
            < rightThreshold
        )
      )
        .map(
          (group) =>
            pdfLineText(
              group
            )
        )
        .filter(
          (text) =>
            !shouldIgnorePdfLine(
              text
            )
        );


    const rightGroups =
      groupPdfTokensByY(
        bandTokens.filter(
          (token) =>
            token.x
            >= rightThreshold
        )
      )
        .map(
          (group) =>
            pdfLineText(
              group
            )
        )
        .filter(
          (text) =>
            !shouldIgnorePdfLine(
              text
            )
        );


    const left =
      leftGroups
        .filter(
          (text) =>
            !normalizeHeader(
              text
            ).startsWith(
              "se estiver"
            )
        );


    const rightTitle =
      cleanText(
        rightGroups.join(
          " "
        )
      );


    const rightKind =
      rightTitle
        ? classifyScheduleKind(
            rightTitle
          )
        : null;


    if (
      rightKind ===
      "simulation"
    ) {
      const leftSlots =
        [0, 3];

      left
        .slice(
          0,
          2
        )
        .forEach(
          (
            title,
            leftIndex
          ) => {
            rows.push(
              makePdfRow({
                date:
                  dates[
                    leftSlots[
                      leftIndex
                    ]
                  ],

                title,
                kind:
                  classifyScheduleKind(
                    title
                  ),

                pageNumber,
                confidence:
                  "high"
              })
            );
          }
        );


      rows.push(
        makePdfRow({
          date:
            dates[2],

          title:
            rightTitle,

          kind:
            rightKind,

          pageNumber,
          confidence:
            "high"
        })
      );

      continue;
    }


    if (
      rightKind ===
      "smart_simulation"
    ) {
      const leftSlots =
        [0, 2];

      left
        .slice(
          0,
          2
        )
        .forEach(
          (
            title,
            leftIndex
          ) => {
            rows.push(
              makePdfRow({
                date:
                  dates[
                    leftSlots[
                      leftIndex
                    ]
                  ],

                title,
                kind:
                  classifyScheduleKind(
                    title
                  ),

                pageNumber,
                confidence:
                  "high"
              })
            );
          }
        );


      rows.push(
        makePdfRow({
          date:
            dates[1],

          title:
            rightTitle,

          kind:
            rightKind,

          pageNumber,
          confidence:
            "high"
        })
      );

      continue;
    }


    if (
      rightKind ===
      "full_exam"
    ) {
      const hasReview =
        left.some(
          (title) =>
            [
              "smart_review",
              "external_review"
            ].includes(
              classifyScheduleKind(
                title
              )
            )
        );


      if (hasReview) {
        left
          .slice(
            0,
            2
          )
          .forEach(
            (
              title,
              leftIndex
            ) => {
              rows.push(
                makePdfRow({
                  date:
                    dates[
                      2 + leftIndex
                    ],

                  title,

                  kind:
                    classifyScheduleKind(
                      title
                    ),

                  pageNumber,
                  confidence:
                    "medium"
                })
              );
            }
          );

      } else {
        left
          .slice(
            0,
            1
          )
          .forEach(
            (title) => {
              rows.push(
                makePdfRow({
                  date:
                    dates[0],

                  title,

                  kind:
                    classifyScheduleKind(
                      title
                    ),

                  pageNumber,
                  confidence:
                    "medium"
                })
              );
            }
          );
      }


      rows.push(
        makePdfRow({
          date:
            dates[5],

          title:
            rightTitle,

          kind:
            rightKind,

          pageNumber,
          confidence:
            "medium"
        })
      );

      continue;
    }


    left
      .slice(
        0,
        3
      )
      .forEach(
        (
          title,
          leftIndex
        ) => {
          rows.push(
            makePdfRow({
              date:
                dates[
                  Math.min(
                    leftIndex * 2,
                    4
                  )
                ],

              title,

              kind:
                classifyScheduleKind(
                  title
                ),

              pageNumber,
              confidence:
                "low"
            })
          );
        }
      );


    if (rightTitle) {
      rows.push(
        makePdfRow({
          date:
            dates[5],

          title:
            rightTitle,

          kind:
            rightKind
            || "other",

          pageNumber,
          confidence:
            "low"
        })
      );
    }
  }


  return rows;
}



const PDF_COURSE_PRIORITY_WORDS =
  new Set([
    "alta",
    "media",
    "baixa",
    "bonus",
    "diamante"
  ]);


function stripPdfCourseMarker(
  value
) {
  return cleanText(
    String(
      value
      || ""
    )
      .replace(
        /^[▲💎🎁◆♦︎♦\s]+/u,
        ""
      )
      .replace(
        /\s+\d{1,3}%\s*$/,
        ""
      )
  );
}


function parsePdfCourseBlock(
  value
) {
  const text =
    stripPdfCourseMarker(
      value
    );

  const match =
    text.match(
      /\bBloco\s+(\d+)(?:\s*\(\s*(\d+)\s+aulas?\s*\))?/i
    );

  if (!match) {
    return null;
  }

  return {
    number:
      Number(
        match[1]
      ),

    lessonCount:
      match[2]
        ? Number(
            match[2]
          )
        : null,

    label:
      `Bloco ${match[1]}`
  };
}


function parsePdfCourseArea(
  value
) {
  const raw =
    stripPdfCourseMarker(
      value
    );

  if (!raw) {
    return null;
  }

  let normalized =
    normalizeHeader(
      raw
    );

  const parts =
    normalized.split(
      " "
    );

  let hadPriority =
    false;

  if (
    parts.length
    && PDF_COURSE_PRIORITY_WORDS.has(
      parts[
        parts.length - 1
      ]
    )
  ) {
    hadPriority =
      true;

    parts.pop();

    normalized =
      parts.join(
        " "
      );
  }

  if (
    normalized ===
      "clinica medica"
    || (
      hadPriority
      && normalized.startsWith(
        "clinica medica "
      )
    )
  ) {
    return "Clínica Médica";
  }

  if (
    /^(?:g\.?\s*o\.?|go|ginecologia(?: e obstetricia)?)$/
      .test(
        normalized
      )
    || (
      hadPriority
      && /^(?:g\.?\s*o\.?|go|ginecologia(?: e obstetricia)?)\b/
        .test(
          normalized
        )
    )
  ) {
    return "Ginecologia e Obstetrícia";
  }

  if (
    normalized ===
      "pediatria"
    || (
      hadPriority
      && normalized.startsWith(
        "pediatria "
      )
    )
  ) {
    return "Pediatria";
  }

  if (
    normalized ===
      "preventiva"
    || (
      hadPriority
      && normalized.startsWith(
        "preventiva "
      )
    )
  ) {
    return "Medicina Preventiva";
  }

  if (
    normalized ===
      "cirurgia"
    || (
      hadPriority
      && normalized.startsWith(
        "cirurgia "
      )
    )
  ) {
    return "Cirurgia Geral";
  }

  if (
    /^(?:1\.)?onboarding$/
      .test(
        normalized
      )
    || (
      hadPriority
      && /^(?:1\.)?onboarding\b/
        .test(
          normalized
        )
    )
  ) {
    return "Onboarding";
  }

  return null;
}


function isPdfCourseNoiseLine(
  value
) {
  const text =
    stripPdfCourseMarker(
      value
    );

  const normalized =
    normalizeHeader(
      text
    );

  if (!normalized) {
    return true;
  }

  if (
    normalized.includes(
      "cronograma - extensivo programado"
    )
    || normalized ===
      "cronograma"
    || normalized.startsWith(
      "progresso:"
    )
    || normalized.startsWith(
      "extensivo programado"
    )
    || normalized ===
      "alta media baixa bonus diamante"
    || normalized.startsWith(
      "https://aulas.medcof.com.br/cronograma"
    )
  ) {
    return true;
  }

  if (
    /^\d+\/\d+$/
      .test(
        normalized
      )
    || /^\d{1,3}%$/
      .test(
        normalized
      )
    || /^\d{1,2}\/\d{1,2}\/\d{2,4}(?:,\s*\d{1,2}:\d{2})?$/
      .test(
        normalized
      )
  ) {
    return true;
  }

  return false;
}


function pdfCourseTitleFromSegment(
  segment
) {
  for (
    const line
    of segment
  ) {
    const text =
      stripPdfCourseMarker(
        line.text
      );

    if (
      isPdfCourseNoiseLine(
        text
      )
      || parsePdfCourseBlock(
        text
      )
      || parsePdfCourseArea(
        text
      )
    ) {
      continue;
    }

    // Linhas do professor neste layout quase sempre carregam 0/2, 1/2 etc.
    // Não devem virar tema quando uma página começa no meio de um card.
    if (
      /\b\d{1,2}\s*\/\s*\d{1,2}\b/
        .test(
          text
        )
    ) {
      continue;
    }

    const cleaned =
      cleanText(
        text.replace(
          /\s+\d{1,3}%\s*$/,
          ""
        )
      );

    if (
      cleaned.length
      < 3
    ) {
      continue;
    }

    return cleaned;
  }

  return "";
}


function parseBlockCoursePdfPage({
  tokens,
  pageNumber,
  currentBlock = null,
  pendingLines = []
}) {
  const pageLines =
    groupPdfTokensByY(
      tokens,
      4.5
    )
      .map(
        (group) => ({
          text:
            pdfLineText(
              group
            ),

          x:
            Math.min(
              ...group.tokens
                .map(
                  (token) =>
                    token.x
                )
            ),

          y:
            group.y
        })
      )
      .filter(
        (line) =>
          !isPdfCourseNoiseLine(
            line.text
          )
      );

  const lines =
    [
      ...(pendingLines || []),
      ...pageLines
    ];

  const rows =
    [];

  let block =
    currentBlock;

  let segmentStart =
    0;


  for (
    let index = 0;
    index < lines.length;
    index += 1
  ) {
    const line =
      lines[
        index
      ];

    const detectedBlock =
      parsePdfCourseBlock(
        line.text
      );

    if (
      detectedBlock
    ) {
      block =
        detectedBlock;

      segmentStart =
        index + 1;

      continue;
    }


    const area =
      parsePdfCourseArea(
        line.text
      );

    if (!area) {
      continue;
    }


    const segment =
      lines.slice(
        segmentStart,
        index
      );

    const title =
      pdfCourseTitleFromSegment(
        segment
      );


    if (title) {
      rows.push(
        makePdfRow({
          date:
            null,

          title,

          kind:
            classifyScheduleKind(
              title
            ),

          pageNumber,
          confidence:
            "high",

          area,

          sourceBlock:
            block?.label
            || null
        })
      );
    }


    segmentStart =
      index + 1;
  }


  const tail =
    lines.slice(
      segmentStart
    )
      .filter(
        (line) =>
          !parsePdfCourseBlock(
            line.text
          )
          && !parsePdfCourseArea(
            line.text
          )
          && !isPdfCourseNoiseLine(
            line.text
          )
      )
      .slice(
        0,
        8
      );


  return {
    rows,

    currentBlock:
      block,

    pendingLines:
      tail
  };
}


function looksLikeBlockCoursePdf(
  text
) {
  const source =
    String(
      text
      || ""
    );

  const normalized =
    normalizeHeader(
      source
    );

  return (
    /\bBloco\s+\d+(?:\s*\(\s*\d+\s+aulas?\s*\))?/i
      .test(
        source
      )
    && (
      normalized.includes(
        "clinica medica"
      )
      || normalized.includes(
        "pediatria"
      )
      || normalized.includes(
        "preventiva"
      )
      || normalized.includes(
        "cirurgia"
      )
      || normalized.includes(
        "g.o"
      )
    )
  );
}


function parseGenericPdfLines({
  tokens,
  pageNumber
}) {
  const groups =
    groupPdfTokensByY(
      tokens,
      4.5
    );

  const rows =
    [];


  for (
    const group
    of groups
  ) {
    const text =
      pdfLineText(
        group
      );

    if (
      shouldIgnorePdfLine(
        text
      )
    ) {
      continue;
    }

    const dateMatch =
      text.match(
        /(?:^|\s)((?:\d{1,2}[\/\-.]\d{1,2}[\/\-.]\d{2,4})|(?:20\d{2}-\d{1,2}-\d{1,2}))(?:\s|$)/
      );

    const date =
      dateMatch
        ? parseExcelDate(
            dateMatch[1]
          )
        : null;

    const title =
      cleanText(
        dateMatch
          ? text.replace(
              dateMatch[1],
              ""
            )
          : text
      );

    const normalizedTitle =
      normalizeHeader(
        title
      );

    const structuralLine =
      !title
      || title.length < 4
      || /^\d+$/.test(
        normalizedTitle
      )
      || /^pagina\s*\d*$/.test(
        normalizedTitle
      )
      || /^(cronograma|extensivo|programado|acesso direto|r1 acesso direto)$/
        .test(
          normalizedTitle
        )
      || /^(bloco|semana|mes)\s*\d*$/i
        .test(
          normalizedTitle
        );

    if (
      structuralLine
    ) {
      continue;
    }

    rows.push(
      makePdfRow({
        date,
        title,
        kind:
          classifyScheduleKind(
            title
          ),

        pageNumber,
        confidence:
          date
            ? "medium"
            : "low"
      })
    );
  }


  return rows;
}


async function parsePdfFile(
  file
) {
  if (
    !window.pdfjsLib
  ) {
    throw new Error(
      "O leitor de PDF não carregou. Atualize a página e tente novamente."
    );
  }


  window.pdfjsLib
    .GlobalWorkerOptions
    .workerSrc =
      "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js";


  const buffer =
    await file
      .arrayBuffer();

  const pdf =
    await window
      .pdfjsLib
      .getDocument({
        data:
          buffer
      })
      .promise;


  const firstPagesText =
    [];


  for (
    let pageNumber = 1;
    pageNumber
      <= Math.min(
        2,
        pdf.numPages
      );
    pageNumber += 1
  ) {
    const page =
      await pdf.getPage(
        pageNumber
      );

    const pageText =
      await page
        .getTextContent();

    firstPagesText.push(
      pageText.items
        .map(
          (item) =>
            item.str
        )
        .join(
          " "
        )
    );
  }


  const firstPagesCombined =
    firstPagesText.join(
      " "
    );

  const yearRange =
    parseYearRangeText(
      `${file.name} ${firstPagesCombined}`
    );

  const blockCourseDocument =
    looksLikeBlockCoursePdf(
      firstPagesCombined
    );


  const rows =
    [];

  let calendarIndex =
    0;

  let plannerPages =
    0;

  let blockCoursePages =
    0;

  let currentCourseBlock =
    null;

  let pendingCourseLines =
    [];


  for (
    let pageNumber = 1;
    pageNumber
      <= pdf.numPages;
    pageNumber += 1
  ) {
    setImportStatus(
      `Lendo PDF: página ${pageNumber} de ${pdf.numPages}...`
    );


    const page =
      await pdf.getPage(
        pageNumber
      );

    const pageData =
      await extractPdfPageTokens(
        page
      );


    if (
      blockCourseDocument
    ) {
      const parsedPage =
        parseBlockCoursePdfPage({
          ...pageData,
          pageNumber,
          currentBlock:
            currentCourseBlock,
          pendingLines:
            pendingCourseLines
        });

      rows.push(
        ...parsedPage.rows
      );

      currentCourseBlock =
        parsedPage.currentBlock;

      pendingCourseLines =
        parsedPage.pendingLines;

      blockCoursePages += 1;

      continue;
    }


    const normalizedText =
      normalizeHeader(
        pageData.tokens
          .map(
            (token) =>
              token.text
          )
          .join(
            " "
          )
      );


    const shortDateCount =
      pageData.tokens
        .filter(
          (token) =>
            /^\d{1,2}\/\d{1,2}$/
              .test(
                token.text
              )
        )
        .length;


    const looksLikePlanner =
      normalizedText.includes(
        "segunda"
      )
      && normalizedText.includes(
        "terca"
      )
      && normalizedText.includes(
        "quarta"
      )
      && shortDateCount
        >= 14;


    if (
      looksLikePlanner
    ) {
      plannerPages += 1;

      rows.push(
        ...parseMonthlyPlannerPage({
          ...pageData,
          pageNumber,
          calendarIndex,
          startYear:
            yearRange
              .startYear
        })
      );

      calendarIndex += 1;

      continue;
    }


    rows.push(
      ...parseGenericPdfLines({
        ...pageData,
        pageNumber
      })
    );
  }


  const deduped =
    dedupeParsedRows(
      rows
    );


  if (
    deduped.length
    < 2
  ) {
    throw new Error(
      blockCourseDocument
        ? "Reconheci o formato em blocos, mas não consegui extrair pelo menos duas aulas. Verifique se o PDF possui texto selecionável."
        : "Não consegui reconstruir este PDF automaticamente. Tente Excel/CSV ou outro PDF com texto selecionável."
    );
  }


  return {
    rows:
      deduped,

    detected: {
      parser:
        blockCourseDocument
          ? "block-course-pdf"
          : plannerPages
            ? "monthly-planner"
            : "generic-pdf",

      plannerPages,

      blockCoursePages,

      pageCount:
        pdf.numPages,

      hasDates:
        deduped.some(
          (row) =>
            Boolean(
              row.date
            )
        ),

      startYear:
        yearRange
          .startYear,

      endYear:
        yearRange
          .endYear
    }
  };
}

async function parseWorkbookFile(
  file
) {
  const buffer =
    await file
      .arrayBuffer();

  const workbook =
    XLSX.read(
      buffer,
      {
        type:
          "array",

        cellDates:
          true
      }
    );


  if (
    !workbook
      .SheetNames
      .length
  ) {
    throw new Error(
      "Não encontrei nenhuma aba na planilha."
    );
  }


  const accepted =
    [];

  const skipped =
    [];


  for (
    const sheetName
    of workbook
      .SheetNames
  ) {
    const worksheet =
      workbook
        .Sheets[
          sheetName
        ];

    const matrix =
      XLSX.utils
        .sheet_to_json(
          worksheet,
          {
            header:
              1,

            defval:
              "",

            raw:
              true
          }
        );


    try {
      const detected =
        parseWorkbookRows(
          matrix,
          sheetName
        );

      if (
        detected.rows.length
      ) {
        accepted.push(
          detected
        );
      }

    } catch (error) {
      skipped.push({
        sheetName,
        message:
          error.message
      });
    }
  }


  if (
    !accepted.length
  ) {
    throw new Error(
      skipped[0]
        ?.message
      || "Não encontrei uma aba com colunas reconhecíveis."
    );
  }


  return {
    rows:
      dedupeParsedRows(
        accepted.flatMap(
          (item) =>
            item.rows
        )
      ),

    detected: {
      parser:
        "spreadsheet",

      sheets:
        accepted.map(
          (item) => ({
            sheetName:
              item.sheetName,

            headerRowIndex:
              item.headerRowIndex,

            rawHeaders:
              item.rawHeaders
          })
        ),

      skippedSheets:
        skipped
    }
  };
}


async function parseSelectedFile(
  file
) {
  if (!file) {
    return;
  }


  scheduleState.file =
    file;

  scheduleState.fileType =
    isPdfFile(
      file
    )
      ? "pdf"
      : "spreadsheet";


  document
    .getElementById(
      "file-name"
    )
    .textContent =
      file.name;


  setPdfModeState(
    scheduleState.fileType
      === "pdf"
  );


  setImportStatus(
    scheduleState.fileType
      === "pdf"
        ? "Analisando estrutura do PDF..."
        : "Lendo planilha..."
  );


  try {
    const result =
      scheduleState.fileType
        === "pdf"
          ? await parsePdfFile(
              file
            )
          : await parseWorkbookFile(
              file
            );


    scheduleState.detected =
      result.detected;

    scheduleState.parsedRows =
      result.rows;


    syncImportModeToRows(
      scheduleState.parsedRows
    );


    applyDuplicateFlags();

    renderPreview();


    const counts =
      scheduleState.parsedRows
        .reduce(
          (
            acc,
            row
          ) => {
            acc[
              row.kind
            ] =
              (
                acc[
                  row.kind
                ]
                || 0
              )
              + 1;

            return acc;
          },
          {}
        );


    const lessons =
      counts.lesson
      || 0;

    const events =
      scheduleState.parsedRows.length
      - lessons;


    setImportStatus(
      `${scheduleState.parsedRows.length} itens reconhecidos · ${lessons} aulas · ${events} eventos. Confira a prévia antes de importar.`,
      "success"
    );

  } catch (error) {
    console.error(
      error
    );

    scheduleState
      .parsedRows =
        [];

    scheduleState
      .detected =
        null;

    renderPreview();

    setImportStatus(
      error.message
      || "Não foi possível ler o arquivo.",
      "error"
    );
  }
}


function resetImport() {
  scheduleState.file =
    null;

  scheduleState.fileType =
    null;

  scheduleState.parsedRows =
    [];

  scheduleState.detected =
    null;


  setPdfModeState(
    false
  );


  document
    .getElementById(
      "schedule-file"
    )
    .value =
      "";

  document
    .getElementById(
      "file-name"
    )
    .textContent =
      "Selecione um cronograma";

  document
    .getElementById(
      "import-preview"
    )
    .classList
    .remove(
      "visible"
    );

  document
    .getElementById(
      "preview-body"
    )
    .innerHTML =
      "";

  document
    .getElementById(
      "preview-summary"
    )
    .textContent =
      "";

  const confirm =
    document.getElementById(
      "confirm-import"
    );

  if (confirm) {
    confirm.disabled =
      true;
  }

  setImportStatus(
    ""
  );
}

async function createImportRecord(mode) {
  const metadata = {
    file_type:
      scheduleState.fileType,
    parser:
      scheduleState.detected?.parser
      || null,
    detected:
      scheduleState.detected
      || null
  };

  const { data, error } = await scheduleSb
    .from("schedule_imports")
    .insert({
      user_id: scheduleState.user.id,
      file_name: scheduleState.file?.name || null,
      mode,
      status: "processing",
      row_count: scheduleState.parsedRows.length,
      metadata
    })
    .select()
    .single();

  if (error) throw error;

  return data;
}

async function updateImportRecord(importId, values) {
  const { error } = await scheduleSb
    .from("schedule_imports")
    .update(values)
    .eq("id", importId);

  if (error) throw error;
}

function chunkArray(array, size) {
  const chunks = [];

  for (let index = 0; index < array.length; index += size) {
    chunks.push(array.slice(index, index + size));
  }

  return chunks;
}

async function insertAlreadyDoneRow(row, importRecord, mode) {
  const { data: topic, error: insertError } = await scheduleSb
    .from("study_topics")
    .insert({
      user_id: scheduleState.user.id,
      import_id: importRecord.id,
      area: row.area || null,
      materia: row.materia || null,
      theme: row.theme,
      original_date: row.date || null,
      scheduled_date: mode === "dates" ? row.date : null,
      status: mode === "dates" && row.date ? "scheduled" : "deck"
    })
    .select()
    .single();

  if (insertError) throw insertError;

  const { error: doneError } = await scheduleSb.rpc(
    "mark_topic_already_done",
    {
      p_topic_id: topic.id,
      p_studied_on: row.studiedDate || null
    }
  );

  if (doneError) throw doneError;
}


async function insertAlreadyDoneRow(
  row,
  importRecord,
  mode
) {
  const {
    data:
      topic,

    error:
      insertError
  } =
    await scheduleSb
      .from(
        "study_topics"
      )
      .insert({
        user_id:
          scheduleState.user.id,

        import_id:
          importRecord.id,

        area:
          row.area
          || null,

        materia:
          row.materia
          || null,

        bloco:
          row.bloco
          || null,

        theme:
          row.theme,

        original_date:
          row.date
          || null,

        scheduled_date:
          mode === "dates"
            ? row.date
            : null,

        status:
          mode === "dates"
          && row.date
            ? "scheduled"
            : "deck"
      })
      .select()
      .single();


  if (insertError) {
    throw insertError;
  }


  const {
    error:
      doneError
  } =
    await scheduleSb
      .rpc(
        "mark_topic_already_done",
        {
          p_topic_id:
            topic.id,

          p_studied_on:
            row.studiedDate
            || null
        }
      );


  if (doneError) {
    throw doneError;
  }
}


async function confirmImport() {
  const mode =
    currentImportMode();

  const rows =
    scheduleState
      .parsedRows;


  if (
    !scheduleState.file
    || !rows.length
  ) {
    setImportStatus(
      "Selecione um arquivo primeiro.",
      "error"
    );

    return;
  }


  applyDuplicateFlags();


  const selectedRows =
    rows.filter(
      (row) =>
        row.include
        && !row.duplicate
    );


  const invalid =
    selectedRows.filter(
      (row) =>
        row.errors.length
        > 0
    );


  if (
    invalid.length
  ) {
    setImportStatus(
      "Há itens selecionados com problema. Corrija a prévia ou desmarque esses itens.",
      "error"
    );

    return;
  }


  if (
    !selectedRows.length
  ) {
    setImportStatus(
      "Nenhum item novo selecionado.",
      "error"
    );

    return;
  }


  const button =
    document.getElementById(
      "confirm-import"
    );

  button.disabled =
    true;

  setImportStatus(
    "Importando cronograma..."
  );


  let importRecord =
    null;


  try {
    importRecord =
      await createImportRecord(
        mode
      );


    const lessonRows =
      selectedRows.filter(
        (row) =>
          row.kind ===
          "lesson"
      );


    const eventRows =
      selectedRows.filter(
        (row) =>
          row.kind !==
          "lesson"
      );


    const regularLessons =
      lessonRows.filter(
        (row) =>
          !row.alreadyDone
      );


    const alreadyDoneRows =
      lessonRows.filter(
        (row) =>
          row.alreadyDone
      );


    const lessonPayload =
      regularLessons.map(
        (
          row,
          index
        ) => ({
          user_id:
            scheduleState.user.id,

          import_id:
            importRecord.id,

          area:
            row.area
            || null,

          materia:
            row.materia
            || null,

          bloco:
            row.bloco
            || null,

          theme:
            row.theme,

          original_date:
            row.date
            || null,

          scheduled_date:
            mode === "dates"
            && row.date
              ? row.date
              : null,

          deck_order:
            mode === "deck"
            || !row.date
              ? index + 1
              : null,

          status:
            mode === "dates"
            && row.date
              ? "scheduled"
              : "deck"
        })
      );


    for (
      const chunk
      of chunkArray(
        lessonPayload,
        200
      )
    ) {
      if (!chunk.length) {
        continue;
      }


      const {
        error
      } =
        await scheduleSb
          .from(
            "study_topics"
          )
          .insert(
            chunk
          );


      if (error) {
        throw error;
      }
    }


    for (
      const row
      of alreadyDoneRows
    ) {
      await insertAlreadyDoneRow(
        row,
        importRecord,
        mode
      );
    }


    const eventPayload =
      eventRows.map(
        (row) => ({
          user_id:
            scheduleState.user.id,

          import_id:
            importRecord.id,

          title:
            row.theme,

          event_type:
            row.kind,

          event_date:
            row.date,

          area:
            row.area
            || null,

          materia:
            row.materia
            || null,

          bloco:
            row.bloco
            || null,

          source:
            scheduleState.file
              ?.name
            || null,

          source_page:
            row.sourcePage
            || null,

          confidence:
            row.confidence
            || "medium",

          metadata: {
            source_label:
              row.sourceLabel
              || null,

            parser:
              scheduleState
                .detected
                ?.parser
              || null
          }
        })
      );


    for (
      const chunk
      of chunkArray(
        eventPayload,
        200
      )
    ) {
      if (!chunk.length) {
        continue;
      }


      const {
        error
      } =
        await scheduleSb
          .from(
            "schedule_events"
          )
          .insert(
            chunk
          );


      if (error) {
        throw error;
      }
    }


    await updateImportRecord(
      importRecord.id,
      {
        status:
          "completed",

        row_count:
          selectedRows.length,

        metadata: {
          ...importRecord.metadata,

          imported_rows:
            selectedRows.length,

          imported_lessons:
            lessonRows.length,

          imported_events:
            eventRows.length,

          already_done_rows:
            alreadyDoneRows.length,

          skipped_existing:
            rows.filter(
              (row) =>
                row.duplicate
            ).length
        }
      }
    );


    const lessonCount =
      lessonRows.length;

    const eventCount =
      eventRows.length;


    resetImport();


    setImportStatus(
      `${lessonCount} aula${lessonCount === 1 ? "" : "s"} e ${eventCount} evento${eventCount === 1 ? "" : "s"} importado${lessonCount + eventCount === 1 ? "" : "s"} com sucesso.`,
      "success"
    );


    await loadTopics();

  } catch (error) {
    console.error(
      error
    );


    if (
      importRecord?.id
    ) {
      try {
        await updateImportRecord(
          importRecord.id,
          {
            status:
              "failed",

            error_message:
              error.message
              || "Erro desconhecido"
          }
        );

      } catch (
        secondaryError
      ) {
        console.error(
          secondaryError
        );
      }
    }


    setImportStatus(
      error.message
      || "Não foi possível importar o cronograma.",
      "error"
    );


    button.disabled =
      false;
  }
}


function renderScheduleEventCard(
  event
) {
  const meta =
    [
      event.area,
      event.materia
    ]
      .filter(
        Boolean
      )
      .join(
        " · "
      );


  return `
    <article
      class="schedule-event-card"
      data-schedule-event-id="${escapeScheduleHtml(
        event.id
      )}"
    >
      <h3>
        ${escapeScheduleHtml(
          event.title
        )}
      </h3>

      <span class="schedule-event-type">
        ${escapeScheduleHtml(
          scheduleKindLabel(
            event.event_type
          )
        )}
      </span>

      ${
        meta
          ? `
            <div class="topic-meta">
              ${escapeScheduleHtml(
                meta
              )}
            </div>
          `
          : ""
      }

      <div class="topic-actions">
        <button
          class="topic-action danger"
          type="button"
          data-delete-schedule-event="${escapeScheduleHtml(
            event.id
          )}"
        >
          Excluir
        </button>
      </div>
    </article>
  `;
}


function eventsOnDate(
  date
) {
  const iso =
    toISODateSchedule(
      date
    );

  return scheduleState.events
    .filter(
      (event) =>
        event.event_date
        === iso
    );
}


function todayScheduleISO() {
  return toISODateSchedule(
    new Date()
  );
}


function isTopicOverdue(
  topic
) {
  return (
    topic?.status ===
      "scheduled"
    && !topic?.completed_at
    && Boolean(
      topic?.scheduled_date
    )
    && topic.scheduled_date
      < todayScheduleISO()
  );
}


function setReorganizeStatus(
  text,
  type = ""
) {
  const element =
    document.getElementById(
      "reorganize-overdue-status"
    );

  if (!element) {
    return;
  }

  element.textContent =
    text;

  element.className =
    `manual-status ${type}`
      .trim();
}


function topicMeta(topic) {
  return [topic.area, topic.materia].filter(Boolean).join(" · ");
}


function renderTopicCard(
  topic,
  compact = false
) {
  const meta =
    topicMeta(
      topic
    );


  const startParams =
    new URLSearchParams({
      kind:
        "lesson",

      item_id:
        topic.id,

      title:
        topic.theme,

      date:
        topic.scheduled_date
        || ""
    });


  if (topic.area) {
    startParams.set(
      "area",
      topic.area
    );
  }


  if (topic.materia) {
    startParams.set(
      "materia",
      topic.materia
    );
  }


  const overflow =
    compact
      ? `
        <div class="topic-overflow-wrap">

          <button
            class="topic-overflow-trigger"
            type="button"
            data-topic-overflow-trigger="${escapeScheduleHtml(
              topic.id
            )}"
            aria-label="Mais opções"
            aria-expanded="false"
          >
            ⋯
          </button>

          <div
            class="topic-overflow-menu"
            data-topic-overflow="${escapeScheduleHtml(
              topic.id
            )}"
            hidden
          >

            <button
              type="button"
              data-complete-topic="${escapeScheduleHtml(
                topic.id
              )}"
            >
              Concluir
            </button>

            <button
              type="button"
              data-already-done-topic="${escapeScheduleHtml(
                topic.id
              )}"
            >
              Aula já feita
            </button>

            <button
              class="danger"
              type="button"
              data-remove-from-date="${escapeScheduleHtml(
                topic.id
              )}"
            >
              Remover para o deck
            </button>

          </div>

        </div>
      `
      : "";


  return `
    <article
      class="topic-card ${isTopicOverdue(topic) ? "is-overdue" : ""}"
      draggable="true"
      data-topic-id="${escapeScheduleHtml(topic.id)}"
    >

      ${overflow}

      <div class="topic-card-head">
        <h3>
          ${escapeScheduleHtml(topic.theme)}
        </h3>
      </div>

      ${
        meta
          ? `
            <div class="topic-meta">
              ${escapeScheduleHtml(meta)}
            </div>
          `
          : ""
      }

      ${
        isTopicOverdue(topic)
          ? '<span class="topic-overdue-label">Atrasada</span>'
          : ""
      }

      ${
        compact
          ? `
            <div class="topic-actions planner-primary-action">

              <a
                class="topic-action primary"
                data-start-study-topic="${escapeScheduleHtml(topic.id)}"
                href="/caderno/?topic_id=${escapeScheduleHtml(topic.id)}&view=editor"
              >
                Iniciar
              </a>

            </div>
          `
          : `
            <div class="topic-actions">

              <a
                class="topic-action primary"
                data-start-study-topic="${escapeScheduleHtml(topic.id)}"
                href="/caderno/?topic_id=${escapeScheduleHtml(topic.id)}&view=editor"
              >
                Iniciar
              </a>

              <button
                class="topic-action"
                type="button"
                data-complete-topic="${escapeScheduleHtml(topic.id)}"
              >
                Concluir
              </button>

              <button
                class="topic-action done"
                type="button"
                data-already-done-topic="${escapeScheduleHtml(topic.id)}"
              >
                Aula já feita
              </button>

              <button
                class="topic-action danger"
                type="button"
                data-delete-topic="${escapeScheduleHtml(topic.id)}"
              >
                Excluir
              </button>

            </div>
          `
      }

    </article>
  `;
}

function renderDeckCard(topic) {
  const meta = topicMeta(topic);

  return `
    <article
      class="deck-card"
      draggable="true"
      data-topic-id="${escapeScheduleHtml(topic.id)}"
    >
      <h3>${escapeScheduleHtml(topic.theme)}</h3>
      <p>${escapeScheduleHtml(meta || "Sem área/matéria")}</p>

      <div class="deck-schedule">
        <input
          type="date"
          data-deck-date="${escapeScheduleHtml(topic.id)}"
          aria-label="Data para ${escapeScheduleHtml(topic.theme)}"
        >

        <button
          type="button"
          data-schedule-topic="${escapeScheduleHtml(topic.id)}"
        >
          Agendar
        </button>
      </div>

      <div class="topic-actions">
        <button
          class="topic-action done"
          type="button"
          data-already-done-topic="${escapeScheduleHtml(topic.id)}"
        >
          Aula já feita
        </button>

        <button
          class="topic-action danger"
          type="button"
          data-delete-topic="${escapeScheduleHtml(topic.id)}"
        >
          Excluir
        </button>
      </div>
    </article>
  `;
}

function topicsOnDate(date) {
  const iso = toISODateSchedule(date);

  return scheduleState.topics.filter(
    (topic) =>
      topic.status === "scheduled" &&
      topic.completed_at === null &&
      topic.scheduled_date === iso
  );
}

function errorItemsOnDate(date) {
  const iso = toISODateSchedule(date);
  return (scheduleState.errorItems || []).filter(
    (item) => item.active !== false && item.due_date === iso
  );
}

function renderSummary() {
  const deck = scheduleState.topics.filter(
    (topic) =>
      topic.status === "deck" &&
      !topic.completed_at
  ).length;

  const scheduled = scheduleState.topics.filter(
    (topic) =>
      topic.status === "scheduled" &&
      !topic.completed_at
  ).length;

  const completed = scheduleState.topics.filter(
    (topic) => Boolean(topic.completed_at)
  ).length;

  const overdue =
    scheduleState.topics
      .filter(
        isTopicOverdue
      )
      .length;

  const events =
    scheduleState.events.length;

  document.getElementById("summary-deck").textContent = deck;
  document.getElementById("summary-scheduled").textContent = scheduled;

  const overdueSummary =
    document.getElementById(
      "summary-overdue"
    );

  if (overdueSummary) {
    overdueSummary.textContent =
      overdue;
  }

  document.getElementById("summary-completed").textContent = completed;

  const eventSummary =
    document.getElementById("summary-events");

  if (eventSummary) {
    eventSummary.textContent = events;
  }
}

function renderMonthTopicItem(topic) {
  return `
    <article
      class="month-topic ${isTopicOverdue(topic) ? "is-overdue" : ""}"
      draggable="true"
      data-topic-id="${escapeScheduleHtml(topic.id)}"
      title="${escapeScheduleHtml(topic.theme)}"
    >
      ${escapeScheduleHtml(topic.theme)}
    </article>
  `;
}

function renderMonthEventItem(event) {
  return `
    <div
      class="month-event"
      title="${escapeScheduleHtml(event.title)}"
    >
      ${escapeScheduleHtml(event.title)}
    </div>
  `;
}

function renderMonthErrorItem(item) {
  const title = item.theme || item.materia || item.area || "Caderno de erros";
  return `
    <a
      class="month-event month-error-review"
      href="/caderno-erros/"
      title="${escapeScheduleHtml(title)}"
    >
      ${escapeScheduleHtml(title)}
    </a>
  `;
}

function cronogramaItemKind(value) {
  const normalized=normalizeHeader(value||"");
  if(normalized.includes("quest"))return "questions";
  if(normalized.includes("flash"))return "flashcards";
  if(normalized.includes("erro"))return "errors";
  if(normalized.includes("revis"))return "review";
  if(normalized.includes("simulado")||normalized.includes("prova"))return "simulation";
  if(normalized.includes("aula")||normalized.includes("lesson"))return "lesson";
  return "other";
}
function cronogramaMatchesFilters(item, area, theme, type) {
  const itemArea=normalizeHeader(item.area||"");
  const itemTheme=normalizeHeader(item.theme||item.title||"");
  return (area==="all"||itemArea===normalizeHeader(area))
    &&(theme==="all"||itemTheme===normalizeHeader(theme))
    &&(type==="all"||item.kind===type);
}
function fillCronogramaFilter(id, values, current, allLabel) {
  const el=document.getElementById(id); if(!el)return;
  const clean=[...new Set(values.filter(Boolean).map(v=>String(v).trim()))].sort((a,b)=>a.localeCompare(b,"pt-BR"));
  el.innerHTML='<option value="all">'+allLabel+'</option>'+clean.map(v=>'<option value="'+escapeScheduleHtml(v)+'">'+escapeScheduleHtml(v)+'</option>').join("");
  el.value=clean.includes(current)?current:"all";
}

function renderMonthPlanner() {
  const planner =
    document.getElementById("month-planner");

  if (!planner) return;

  const monthStart =
    startOfMonthSchedule(scheduleState.weekAnchor);

  const gridStart =
    startOfWeekSchedule(monthStart);

  const today =
    startOfDaySchedule(new Date());

  document.getElementById("planner-range").textContent =
    formatMonthLabelSchedule(monthStart);

  const weekdayLabels =
    ["Seg", "Ter", "Qua", "Qui", "Sex", "Sáb", "Dom"];

  const days =
    Array.from(
      { length: 35 },
      (_, index) =>
        addDaysSchedule(gridStart, index)
    );

  planner.innerHTML =
    weekdayLabels
      .map(
        (label) =>
          `<div class="month-weekday">${label}</div>`
      )
      .join("")
    +
    days
      .map(
        (date) => {
          const topics = topicsOnDate(date).filter(t=>cronogramaMatchesFilters({area:t.area,theme:t.theme,kind:cronogramaItemKind(t.type||t.theme||"lesson")},scheduleState.monthAreaFilter,scheduleState.monthThemeFilter,scheduleState.monthFilter));
          const events = eventsOnDate(date).filter(e=>cronogramaMatchesFilters({area:e.area,theme:e.title,kind:cronogramaItemKind(e.event_type||e.title)},scheduleState.monthAreaFilter,scheduleState.monthThemeFilter,scheduleState.monthFilter));
          const errorItems = errorItemsOnDate(date).filter(e=>cronogramaMatchesFilters({area:e.area,theme:e.theme||e.materia,kind:"errors"},scheduleState.monthAreaFilter,scheduleState.monthThemeFilter,scheduleState.monthFilter));

          const allItems = [
            ...topics.map(renderMonthTopicItem),
            ...events.map(renderMonthEventItem),
            ...errorItems.map(renderMonthErrorItem)
          ];

          const visible = allItems;
          const extra = 0;

          const inMonth =
            date.getMonth()
            === monthStart.getMonth();

          return `
            <section
              class="month-day ${sameDateSchedule(date, today) ? "today" : ""} ${inMonth ? "" : "outside-month"}"
              data-planner-date="${toISODateSchedule(date)}"
            >
              <div class="month-day-head">
                <span class="month-day-number">${date.getDate()}</span>
                ${allItems.length ? `<span class="month-day-count">${allItems.length}</span>` : ""}
              </div>

              <div class="month-day-items">
                ${visible.join("")}
                ${extra > 0 ? `<div class="month-more">+${extra} item${extra === 1 ? "" : "s"}</div>` : ""}
              </div>
            </section>
          `;
        }
      )
      .join("");
}

function renderWeeklyOverview() {
  const planner = document.getElementById("week-planner");
  if (!planner) return;
  const start = startOfWeekSchedule(scheduleState.weekAnchor);
  const end = addDaysSchedule(start, 6);
  const today = startOfDaySchedule(new Date());
  document.getElementById("planner-range").textContent = formatWeekRangeSchedule(start, end);
  const days = Array.from({ length: 7 }, (_, index) => addDaysSchedule(start, index));
  const categories = [
    ["Aulas", "lesson", "book"],
    ["Questões", "questions", "file"],
    ["Flashcards", "flashcards", "cards"],
    ["Revisões", "review", "refresh"],
    ["Caderno de erros", "errors", "clipboard"],
    ["Simulados", "simulation", "simulation"],
    ["Outros", "other", "more"]
  ];
  const classify = (topic, event) => {
    const source = normalizeHeader(event ? (event.event_type || event.title || "") : (topic?.type || topic?.theme || ""));
    if (source.includes("caderno de erro") || source.includes("erro")) return "errors";
    if (source.includes("quest")) return "questions";
    if (source.includes("flash")) return "flashcards";
    if (source.includes("revis")) return "review";
    if (source.includes("simulado") || source.includes("prova")) return "simulation";
    return event ? "other" : "lesson";
  };
  planner.innerHTML = '<div class="week-matrix" style="grid-column:1/-1"><div class="week-matrix-grid">' +
    '<div class="week-matrix-label"><strong>Categorias</strong></div>' +
    days.map(date => '<div class="week-matrix-head '+(sameDateSchedule(date,today)?'today':'')+'"><span>'+new Intl.DateTimeFormat("pt-BR",{weekday:"short"}).format(date).replace(".","")+'</span><strong>'+date.getDate()+'</strong></div>').join("") +
    categories.map(([label,key,iconName]) => {
      const cells = days.map(date => {
        const count =
          topicsOnDate(date).filter(t => classify(t,null)===key).length
          + eventsOnDate(date).filter(e => classify(null,e)===key).length
          + (key === "errors" ? errorItemsOnDate(date).length : 0);
        return '<div class="week-matrix-cell" data-planner-date="'+toISODateSchedule(date)+'" aria-label="'+label+', '+date.toLocaleDateString("pt-BR")+': '+count+' atividade(s)">'+(count ? '<span class="week-dot kind-'+key+'" aria-hidden="true"></span><span class="week-activity-count">'+count+'</span>' : '<span class="week-activity-count empty">0</span>')+'</div>';
      }).join("");
      const categoryIcon = window.LuriaIcon ? window.LuriaIcon(iconName, "week-category-svg") : '<span class="week-legend kind-'+key+'"></span>';
      return '<div class="week-matrix-label week-category-label"><span class="week-category-icon kind-'+key+'">'+categoryIcon+'</span><strong>'+label+'</strong></div>'+cells;
    }).join("") + '</div></div>';
}

function renderAgendaSide() {
  const today = startOfDaySchedule(new Date());
  const todayTopics = topicsOnDate(today);
  const todayEvents = eventsOnDate(today);
  const todayErrors = errorItemsOnDate(today);
  const count = document.getElementById("agenda-today-count");
  const list = document.getElementById("agenda-today-list");
  const dateLabel = document.getElementById("agenda-today-date");
  if (dateLabel) {
    const formatted = new Intl.DateTimeFormat("pt-BR", {
      weekday: "long",
      day: "2-digit",
      month: "long",
      year: "numeric"
    }).format(today);
    dateLabel.textContent = formatted.charAt(0).toUpperCase() + formatted.slice(1);
  }
  if (count) count.textContent = String(todayTopics.length + todayEvents.length + todayErrors.length);

  const todayTotal = todayTopics.length + todayEvents.length + todayErrors.length;
  const todayCompleted = todayTopics.filter(topic => Boolean(topic.completed_at)).length;
  const todayPercent = todayTotal ? Math.round((todayCompleted / todayTotal) * 100) : 0;
  const todayProgressText = document.getElementById("agenda-today-progress-text");
  const todayProgressPercent = document.getElementById("agenda-today-progress-percent");
  const todayProgressBar = document.getElementById("agenda-today-progress-bar");
  if (todayProgressText) todayProgressText.textContent = todayCompleted + " de " + todayTotal + " atividades concluídas";
  if (todayProgressPercent) todayProgressPercent.textContent = todayPercent + "%";
  if (todayProgressBar) todayProgressBar.style.width = todayPercent + "%";

  const kindClass = (value) => {
    const normalized = normalizeHeader(value || "");
    if (normalized.includes("quest")) return "questions";
    if (normalized.includes("flash")) return "flashcards";
    if (normalized.includes("erro")) return "errors";
    if (normalized.includes("revis")) return "review";
    if (normalized.includes("simulado") || normalized.includes("prova")) return "simulation";
    if (normalized.includes("aula") || normalized.includes("lesson")) return "lesson";
    return "other";
  };
  const todayHref = (kind, id = "") => {
    if (kind === "lesson" || kind === "review") return "/caderno/?topic_id=" + encodeURIComponent(id) + "&view=editor";
    if (kind === "questions" || kind === "simulation") return "/questoes-simulados/";
    if (kind === "flashcards") return "/flashcards/";
    if (kind === "errors") return "/caderno-erros/";
    return "/cronograma/";
  };
  const todayMenu = (source, id, date) =>
    '<div class="agenda-today-menu">'
    + '<button class="agenda-today-more" type="button" data-today-menu-trigger="'+escapeScheduleHtml(source+":"+id)+'" aria-label="Editar atividade" aria-expanded="false">⋯</button>'
    + '<div class="agenda-today-popover" data-today-menu="'+escapeScheduleHtml(source+":"+id)+'" hidden>'
    + '<strong>Remarcar atividade</strong>'
    + '<input type="date" value="'+escapeScheduleHtml(date||toISODateSchedule(today))+'" data-today-date-input="'+escapeScheduleHtml(source+":"+id)+'">'
    + '<button type="button" data-today-date-save="'+escapeScheduleHtml(source+":"+id)+'">Salvar data</button>'
    + '</div></div>';

  if (list) {
    const sourceItems=[];
    const addDateItems=(date)=>{
      const iso=toISODateSchedule(date);
      topicsOnDate(date).forEach(topic=>sourceItems.push({source:"topic",id:topic.id,date:topic.scheduled_date||topic.original_date||iso,kind:kindClass(topic.type||"lesson"),title:topic.theme,meta:topicMeta(topic)||"Aula",completed:Boolean(topic.completed_at),href:todayHref(kindClass(topic.type||"lesson"),topic.id),time:"Hoje"}));
      eventsOnDate(date).forEach(event=>sourceItems.push({source:"event",id:event.id,date:event.event_date||iso,kind:kindClass(event.event_type||event.title),title:event.title,meta:[event.area,event.materia].filter(Boolean).join(" · ")||scheduleKindLabel(event.event_type||"other"),completed:false,href:todayHref(kindClass(event.event_type||event.title),event.id),time:event.event_time?String(event.event_time).slice(0,5):"Hoje"}));
      errorItemsOnDate(date).forEach(item=>sourceItems.push({source:"error",id:item.id,date:item.due_date||iso,kind:"errors",title:item.theme||item.materia||item.area||"Caderno de erros",meta:[item.area,item.materia].filter(Boolean).join(" · ")||"Revisão do caderno de erros",completed:false,href:"/caderno-erros/",time:"Hoje"}));
    };
    if(scheduleState.agendaScope==="today") {
      addDateItems(today);
    } else if(scheduleState.agendaScope==="overdue") {
      scheduleState.topics
        .filter(isTopicOverdue)
        .sort((a,b)=>String(a.scheduled_date||"").localeCompare(String(b.scheduled_date||"")))
        .forEach(topic=>{
          const kind=kindClass(topic.type||"lesson");
          sourceItems.push({
            source:"topic",
            id:topic.id,
            date:topic.scheduled_date||topic.original_date||todayScheduleISO(),
            kind,
            title:topic.theme,
            meta:topicMeta(topic)||"Aula",
            completed:false,
            href:todayHref(kind,topic.id),
            time:"Atrasada"
          });
        });
    }
    sourceItems.forEach(item=>{
      if(item.source==="topic"){const t=scheduleState.topics.find(x=>String(x.id)===String(item.id));item.area=t?.area||"";item.theme=t?.theme||item.title;}
      else if(item.source==="event"){const e=scheduleState.events.find(x=>String(x.id)===String(item.id));item.area=e?.area||"";item.theme=e?.title||item.title;}
      else {const e=scheduleState.errorItems.find(x=>String(x.id)===String(item.id));item.area=e?.area||"";item.theme=e?.theme||e?.materia||item.title;}
    });
    fillCronogramaFilter("agenda-filter-area",sourceItems.map(i=>i.area),scheduleState.agendaAreaFilter,"Todas as áreas");
    fillCronogramaFilter("agenda-filter-theme",sourceItems.map(i=>i.theme),scheduleState.agendaThemeFilter,"Todos os temas");
    const visible=sourceItems.filter(item=>cronogramaMatchesFilters(item,scheduleState.agendaAreaFilter,scheduleState.agendaThemeFilter,scheduleState.agendaFilter));
    const labelForKind=k=>({lesson:"Aula",questions:"Questões",review:"Revisão",flashcards:"Flashcards",errors:"Caderno de erros",simulation:"Simulado",other:"Outro"}[k]||"Atividade");
    const row=item=>{
      const key=item.source+":"+item.id, selected=scheduleState.agendaSelected.has(key);
      const check="";
      return '<div class="agenda-today-row kind-'+item.kind+'">'+check
        +'<a class="agenda-today-open" '+(item.source==="topic"?'data-start-study-topic="'+escapeScheduleHtml(item.id)+'" ':"")+'href="'+item.href+'"><span class="agenda-today-main"><span class="agenda-today-time">'+escapeScheduleHtml(item.time)+'</span><strong>'+escapeScheduleHtml(item.title)+'</strong><small>'+escapeScheduleHtml(item.meta)+'</small></span><span class="agenda-today-kind">'+escapeScheduleHtml(labelForKind(item.kind))+'</span></a>'
        +todayMenu(item.source,item.id,item.date)+'</div>';
    };
    if(scheduleState.agendaScope==="overdue"){
      list.innerHTML=visible.length?visible.map(row).join(""):'<p class="agenda-empty" style="padding:10px">Nenhuma aula atrasada.</p>';
    } else {
      list.innerHTML=visible.length?visible.map(row).join(""):'<p class="agenda-empty" style="padding:10px">Nenhuma atividade para hoje.</p>';
    }
    const bulk=document.getElementById("agenda-bulk-tools"); if(bulk) bulk.hidden=true;
    const title=document.getElementById("agenda-activities-title"), dateLabel=document.getElementById("agenda-today-date");
    if(title) title.textContent=scheduleState.agendaScope==="overdue"?"Aulas atrasadas":"Atividades de hoje";
    if(dateLabel) dateLabel.textContent=scheduleState.agendaScope==="overdue"
      ? (visible.length?visible.length+" aula"+(visible.length===1?"":"s")+" pendente"+(visible.length===1?"":"s"):"Nenhuma pendência")
      : new Intl.DateTimeFormat("pt-BR",{weekday:"long",day:"2-digit",month:"long"}).format(today);
    if(count) count.textContent=String(visible.length);
    const countEl=document.getElementById("agenda-selected-count"); if(countEl) countEl.textContent="0 selecionadas";
  }

  const weekStart = startOfWeekSchedule(today);
  const weekDays = Array.from({length:7},(_,i)=>addDaysSchedule(weekStart,i));
  const totals = weekDays.map(d=>topicsOnDate(d).length+eventsOnDate(d).length+errorItemsOnDate(d).length);
  const totalEl=document.getElementById("agenda-week-total"), daysEl=document.getElementById("agenda-week-days"), overdueEl=document.getElementById("agenda-week-overdue");
  const weekTotal = totals.reduce((a,b)=>a+b,0);
  if(totalEl) totalEl.textContent=String(weekTotal);
  if(daysEl) daysEl.textContent=String(totals.filter(Boolean).length);
  if(overdueEl) overdueEl.textContent=String(scheduleState.topics.filter(isTopicOverdue).length);

  const weekRange = document.getElementById("agenda-week-range");
  if (weekRange) {
    const weekEnd = addDaysSchedule(weekStart, 6);
    const formatShort = (date) => new Intl.DateTimeFormat("pt-BR", { day:"2-digit", month:"short" }).format(date).replace(".","");
    weekRange.textContent = formatShort(weekStart) + " – " + formatShort(weekEnd);
  }

  const weeklyItems = [];
  weekDays.forEach(date => {
    topicsOnDate(date).forEach(topic => weeklyItems.push({ type: kindClass(topic.type || topic.theme || "lesson"), completed: Boolean(topic.completed_at) }));
    eventsOnDate(date).forEach(event => weeklyItems.push({ type: kindClass(event.event_type || event.title || "other"), completed: false }));
    errorItemsOnDate(date).forEach(() => weeklyItems.push({ type: "errors", completed: false }));
  });

  const distribution = [
    { key:"lesson", label:"Aulas", color:"var(--chart-1)" },
    { key:"review", label:"Revisões", color:"var(--chart-2)" },
    { key:"errors", label:"Caderno de erros", color:"var(--chart-3)" },
    { key:"simulation", label:"Simulados", color:"var(--chart-4)" },
    { key:"other", label:"Outros", color:"var(--chart-5)" }
  ].map(item => ({ ...item, count: weeklyItems.filter(entry => entry.type === item.key).length }))
   .filter(item => item.count > 0);

  const distributionTotal = document.getElementById("agenda-distribution-total");
  if (distributionTotal) distributionTotal.textContent = weekTotal ? String(weekTotal) + " itens" : "0";

  const donut = document.getElementById("agenda-donut");
  const legend = document.getElementById("agenda-distribution-legend");
  if (donut && legend) {
    if (!weekTotal || !distribution.length) {
      donut.style.background = "conic-gradient(var(--border) 0 100%)";
      legend.innerHTML = '<span class="agenda-empty">Sem atividades nesta semana.</span>';
    } else {
      let cursor = 0;
      const segments = distribution.map(item => {
        const start = cursor;
        cursor += (item.count / weekTotal) * 100;
        return item.color + " " + start.toFixed(2) + "% " + cursor.toFixed(2) + "%";
      });
      donut.style.background = "conic-gradient(" + segments.join(",") + ")";
      legend.innerHTML = distribution.map(item => {
        const pct = Math.round((item.count / weekTotal) * 100);
        return '<div class="agenda-legend-item"><span class="agenda-legend-dot" style="background:'+item.color+'"></span><span>'+escapeScheduleHtml(item.label)+'</span><strong>'+pct+'%</strong></div>';
      }).join("");
    }
  }

  const bannerCompleted = weeklyItems.filter(item => item.completed).length;
  const bannerPct = weekTotal ? Math.round((bannerCompleted / weekTotal) * 100) : 0;
  const bannerBar=document.getElementById("agenda-goal-banner-bar"), bannerPercent=document.getElementById("agenda-goal-banner-percent"), bannerCopy=document.getElementById("agenda-goal-banner-copy");
  if(bannerBar) bannerBar.style.width=bannerPct+"%"; if(bannerPercent) bannerPercent.textContent=bannerPct+"%"; if(bannerCopy) bannerCopy.textContent=bannerCompleted+" de "+weekTotal+" atividades concluídas";
  ["lesson","review","flashcards","errors","questions-simulation"].forEach((kind)=>{
    const el=document.querySelector('[data-goal-kind="'+kind+'"]');
    if(!el)return;
    const items=weeklyItems.filter(item=>kind==="questions-simulation" ? (item.type==="questions" || item.type==="simulation") : item.type===kind);
    const total=items.length;
    const done=items.filter(item=>item.completed).length;
    const strong=el.querySelector("strong"), small=el.querySelector("small"), bar=el.querySelector("i > b");
    if(strong)strong.textContent=done+"/"+total;
    if(small)small.textContent=total ? (done===total ? "meta concluída" : (total-done)+" pendente"+(total-done===1?"":"s")) : "sem meta";
    if(bar)bar.style.width=(total?Math.round(done/total*100):0)+"%";
    el.classList.toggle("done",total>0&&done>=total);
    el.classList.toggle("has-progress",done>0);
  });

  const completedThisWeek = weeklyItems.filter(item => item.completed).length;
  const pendingThisWeek = Math.max(0, weekTotal - completedThisWeek);
  const plannedEl = document.getElementById("agenda-goal-planned");
  const completedEl = document.getElementById("agenda-goal-completed");
  const pendingEl = document.getElementById("agenda-goal-pending");
  if (plannedEl) plannedEl.textContent = String(weekTotal);
  if (completedEl) completedEl.textContent = String(completedThisWeek);
  if (pendingEl) pendingEl.textContent = String(pendingThisWeek);

  const setGoalBar = (id, value) => {
    const el = document.getElementById(id);
    if (!el) return;
    const pct = weekTotal ? Math.max(0, Math.min(100, (value / weekTotal) * 100)) : 0;
    el.style.width = pct.toFixed(1) + "%";
  };
  setGoalBar("agenda-goal-planned-bar", weekTotal ? weekTotal : 0);
  setGoalBar("agenda-goal-completed-bar", completedThisWeek);
  setGoalBar("agenda-goal-pending-bar", pendingThisWeek);

  const next=document.getElementById("agenda-next-list");
  if(next){
    const future=[];
    for(let i=1;i<=14 && future.length<5;i++){
      const d=addDaysSchedule(today,i);
      topicsOnDate(d).forEach(t=>future.push({title:t.theme,date:d,meta:topicMeta(t)||"Aula"}));
      errorItemsOnDate(d).forEach(e=>future.push({title:e.theme||e.materia||e.area||"Caderno de erros",date:d,meta:"Caderno de erros"}));
      eventsOnDate(d).forEach(e=>future.push({title:e.title,date:d,meta:scheduleKindLabel(e.event_type||"other")}));
    }
    next.innerHTML=future.length?future.slice(0,5).map(item=>'<div class="agenda-next-item"><strong>'+escapeScheduleHtml(item.title)+'</strong><span>'+new Intl.DateTimeFormat("pt-BR",{weekday:"short",day:"2-digit",month:"2-digit"}).format(item.date).replace(".","")+' · '+escapeScheduleHtml(item.meta)+'</span></div>').join(""):'<p class="agenda-empty">Sem próximas atividades nos próximos 14 dias.</p>';
  }
}

function bindReferenceCalendarControls() {
  const dayButton = document.getElementById("planner-view-day");
  const settingsButton = document.getElementById("planner-settings");
  const newActivityButton = document.getElementById("reference-new-activity");

  dayButton?.addEventListener("click", () => {
    scheduleState.plannerView = "week";
    renderPlanner();
    const today = startOfDaySchedule(new Date());
    const target = document.querySelector('[data-planner-date="' + toISODateSchedule(today) + '"]');
    target?.scrollIntoView({ behavior: "smooth", block: "center", inline: "center" });
  });

  settingsButton?.addEventListener("click", () => {
    document.querySelector('[data-schedule-add-mode="manual"]')?.click();
    document.querySelector(".schedule-add-hub")?.scrollIntoView({ behavior: "smooth", block: "start" });
  });

  newActivityButton?.addEventListener("click", () => {
    document.body.classList.add("activity-composer-open");
    switchScheduleAddMode("manual");
    requestAnimationFrame(() => {
      const section = document.querySelector('[data-schedule-add-section="manual"]');
      section?.scrollIntoView({ behavior: "smooth", block: "start" });
      document.getElementById("manual-area")?.focus({ preventScroll: true });
    });
  });
}

function updatePlannerViewControls() {
  const isMonth =
    scheduleState.plannerView === "month";

  const weekPlanner =
    document.getElementById("week-planner");

  const monthPlanner =
    document.getElementById("month-planner");

  const weekButton =
    document.getElementById("planner-view-week");

  const monthButton =
    document.getElementById("planner-view-month");

  const todayButton =
    document.getElementById("week-today");

  if (weekPlanner) {
    weekPlanner.hidden =
      isMonth;
  }

  if (monthPlanner) {
    monthPlanner.hidden =
      !isMonth;
  }

  weekButton?.classList.toggle(
    "active",
    !isMonth
  );

  monthButton?.classList.toggle(
    "active",
    isMonth
  );

  weekButton?.setAttribute(
    "aria-pressed",
    !isMonth ? "true" : "false"
  );

  monthButton?.setAttribute(
    "aria-pressed",
    isMonth ? "true" : "false"
  );

  if (todayButton) {
    todayButton.textContent = "Hoje";
  }
}

function renderPlanner() {
  updatePlannerViewControls();
  renderAgendaSide();
  renderScheduleStudyInsights();

  if (
    scheduleState.plannerView
    === "month"
  ) {
    renderMonthPlanner();
    return;
  }

  renderWeeklyOverview();
  return;

  const planner = document.getElementById("week-planner");
  const start = startOfWeekSchedule(scheduleState.weekAnchor);
  const end = addDaysSchedule(start, 6);
  const today = startOfDaySchedule(new Date());

  document.getElementById("planner-range").textContent =
    formatWeekRangeSchedule(start, end);

  const days = Array.from(
    { length: 7 },
    (_, index) => addDaysSchedule(start, index)
  );

  planner.innerHTML = days.map((date) => {
    const topics = topicsOnDate(date);
    const events = eventsOnDate(date);

    const weekday = new Intl.DateTimeFormat("pt-BR", {
      weekday: "short"
    }).format(date).replace(".", "");

    return `
      <section
        class="planner-day ${sameDateSchedule(date, today) ? "today" : ""}"
        data-planner-date="${toISODateSchedule(date)}"
      >
        <header class="planner-day-header">
          <span>${escapeScheduleHtml(weekday)}</span>
          <strong>${date.getDate()}</strong>
        </header>

        <div class="planner-day-body">
          ${
            topics.length || events.length
              ? [
                  ...topics.map(
                    (topic) =>
                      renderTopicCard(
                        topic,
                        true
                      )
                  ),

                  ...events.map(
                    renderScheduleEventCard
                  )
                ].join("")
              : '<div class="empty-planner">Solte uma aula aqui</div>'
          }
        </div>
      </section>
    `;
  }).join("");
}

function setDeckDistributeStatus(
  text,
  type = ""
) {
  const element =
    document.getElementById(
      "deck-distribute-status"
    );

  if (!element) {
    return;
  }

  element.textContent =
    text || "";

  element.className =
    `deck-distribute-status ${type}`.trim();
}


function deckTopicsInImportOrder() {
  return scheduleState.topics
    .filter(
      topic =>
        topic.status === "deck"
        && !topic.completed_at
    )
    .sort(
      (a, b) => {
        const createdCompare =
          String(
            a.created_at
            || ""
          ).localeCompare(
            String(
              b.created_at
              || ""
            )
          );

        if (
          createdCompare !== 0
        ) {
          return createdCompare;
        }

        const deckCompare =
          Number(
            a.deck_order
            ?? 999999
          )
          - Number(
              b.deck_order
              ?? 999999
            );

        if (
          deckCompare !== 0
        ) {
          return deckCompare;
        }

        return String(
          a.id
        ).localeCompare(
          String(
            b.id
          )
        );
      }
    );
}


function deckConfiguredStudyDays() {
  const days =
    Array.from(
      new Set(
        (
          scheduleState
            .theoryStudyWeekdays
          || []
        )
          .map(Number)
          .filter(
            day =>
              day >= 1
              && day <= 7
          )
      )
    )
      .sort(
        (a, b) =>
          a - b
      );

  return days.length
    ? days
    : [1, 3, 5];
}


function buildDeckDistributionPlan(
  deck
) {
  const allowedDays =
    new Set(
      deckConfiguredStudyDays()
    );

  const maxPerDay =
    Math.max(
      1,
      Number(
        scheduleState
          .maxLessonsPerDay
        || 1
      )
    );

  const counts =
    new Map();

  scheduleState.topics
    .filter(
      topic =>
        topic.status === "scheduled"
        && !topic.completed_at
        && topic.scheduled_date
    )
    .forEach(
      topic => {
        counts.set(
          topic.scheduled_date,
          (
            counts.get(
              topic.scheduled_date
            )
            || 0
          ) + 1
        );
      }
    );

  const assignments =
    [];

  let cursor =
    startOfDaySchedule(
      new Date()
    );

  let guard =
    0;

  for (
    const topic
    of deck
  ) {
    let assigned =
      false;

    while (
      !assigned
      && guard < 5000
    ) {
      guard += 1;

      const isoWeekday =
        isoWeekdayForBase(
          cursor
        );

      const isoDate =
        toISODateSchedule(
          cursor
        );

      const occupied =
        counts.get(
          isoDate
        )
        || 0;

      if (
        allowedDays.has(
          isoWeekday
        )
        && occupied
          < maxPerDay
      ) {
        assignments.push({
          topic,
          date:
            isoDate
        });

        counts.set(
          isoDate,
          occupied + 1
        );

        assigned =
          true;

        if (
          occupied + 1
          >= maxPerDay
        ) {
          cursor =
            addDaysSchedule(
              cursor,
              1
            );
        }
      } else {
        cursor =
          addDaysSchedule(
            cursor,
            1
          );
      }
    }

    if (!assigned) {
      throw new Error(
        "Não foi possível encontrar datas suficientes para distribuir o Deck."
      );
    }
  }

  return assignments;
}


async function distributeDeckTopics() {
  const deck =
    deckTopicsInImportOrder();

  if (!deck.length) {
    setDeckDistributeStatus(
      "O Deck está vazio.",
      "success"
    );

    return;
  }

  await loadSchedulePreferences();

  const days =
    deckConfiguredStudyDays();

  const maxPerDay =
    Math.max(
      1,
      Number(
        scheduleState
          .maxLessonsPerDay
        || 1
      )
    );

  const dayLabels =
    days
      .map(
        day =>
          BASE_WEEKDAY_LABELS[
            day
          ]
          || String(day)
      )
      .join(" · ");

  const confirmed =
    await window.LuriaDialog.confirm(
      `Distribuir ${deck.length} aula${deck.length === 1 ? "" : "s"} do Deck no planejador, em ordem de importação? Dias: ${dayLabels}. Limite: ${maxPerDay} aula${maxPerDay === 1 ? "" : "s"} por dia.`
    );

  if (!confirmed) {
    return;
  }

  const button =
    document.getElementById(
      "deck-distribute"
    );

  if (button) {
    button.disabled =
      true;

    button.textContent =
      "Distribuindo...";
  }

  setDeckDistributeStatus(
    "Distribuindo aulas..."
  );

  try {
    const plan =
      buildDeckDistributionPlan(
        deck
      );

    const groups =
      new Map();

    for (
      const assignment
      of plan
    ) {
      if (
        !groups.has(
          assignment.date
        )
      ) {
        groups.set(
          assignment.date,
          []
        );
      }

      groups.get(
        assignment.date
      ).push(
        assignment.topic.id
      );
    }

    for (
      const [
        date,
        ids
      ]
      of groups
    ) {
      const {
        error
      } =
        await scheduleSb
          .from(
            "study_topics"
          )
          .update({
            scheduled_date:
              date,
            status:
              "scheduled",
            updated_at:
              new Date()
                .toISOString()
          })
          .in(
            "id",
            ids
          )
          .eq(
            "user_id",
            scheduleState.user.id
          );

      if (error) {
        throw error;
      }
    }

    const lastDate =
      plan[
        plan.length - 1
      ]?.date
      || null;

    setDeckDistributeStatus(
      lastDate
        ? `${deck.length} aula${deck.length === 1 ? "" : "s"} distribuída${deck.length === 1 ? "" : "s"} até ${formatDateLabelSchedule(lastDate)}.`
        : "Deck distribuído.",
      "success"
    );

    await loadTopics();

  } catch (error) {
    console.error(
      error
    );

    setDeckDistributeStatus(
      `Não foi possível distribuir o Deck: ${error.message}`,
      "error"
    );

  } finally {
    if (button) {
      button.disabled =
        false;

      button.textContent =
        "Distribuir";
    }
  }
}


function renderDeck() {
  const deck =
    deckTopicsInImportOrder();

  const panel = document.getElementById("deck-panel");
  const count = document.getElementById("deck-count");
  const list = document.getElementById("deck-list");

  if (!panel || !count || !list) return;

  // O Deck só existe visualmente quando há aulas realmente sem data.
  // Isso acontece ao importar sem datas ou ao usar "Remover" no planejador.
  panel.hidden = deck.length === 0;

  if (!deck.length) {
    count.textContent = "0 temas";
    list.innerHTML = "";
    return;
  }

  count.textContent =
    `${deck.length} tema${deck.length === 1 ? "" : "s"}`;

  list.innerHTML =
    deck.map(renderDeckCard).join("");
}


function setManualStatus(text, type = "") {
  const element =
    document.getElementById("manual-topic-status");

  if (!element) return;

  element.textContent = text;
  element.className =
    `manual-status ${type}`.trim();
}

async function addManualTopic(event) {
  event.preventDefault();

  const area =
    document.getElementById("manual-area").value.trim();

  const materia =
    document.getElementById("manual-materia").value.trim();

  const theme =
    document.getElementById("manual-theme").value.trim();

  const date =
    document.getElementById("manual-date").value || null;

  const allowedAreas = new Set([
    "Clínica Médica",
    "Cirurgia Geral",
    "Ginecologia e Obstetrícia",
    "Medicina Preventiva",
    "Pediatria"
  ]);

  if (!allowedAreas.has(area)) {
    setManualStatus(
      "Selecione uma das cinco grandes áreas.",
      "error"
    );
    return;
  }

  if (!theme) {
    setManualStatus(
      "Informe o tema da aula.",
      "error"
    );
    return;
  }

  if (!date) {
    setManualStatus(
      "Escolha a data da aula.",
      "error"
    );
    return;
  }

  const button =
    document.getElementById("manual-add-topic");

  button.disabled = true;
  setManualStatus("Adicionando...");

  const { error } = await scheduleSb.rpc(
    "create_study_topic",
    {
      p_area: area || null,
      p_materia: materia || null,
      p_theme: theme,
      p_original_date: date,
      p_scheduled_date: date,
      p_import_id: null,
      p_deck_order: null
    }
  );

  button.disabled = false;

  if (error) {
    console.error(error);

    setManualStatus(
      `Não foi possível adicionar: ${error.message}`,
      "error"
    );

    return;
  }

  document.getElementById("manual-topic-form").reset();

  setManualStatus(
    "Aula adicionada ao cronograma.",
    "success"
  );

  await loadTopics();
}


const BASE_WEEKDAY_LABELS = { 1:"Seg", 2:"Ter", 3:"Qua", 4:"Qui", 5:"Sex", 6:"Sáb", 7:"Dom" };

function setBaseScheduleStatus(text, type = "") {
  const element = document.getElementById("base-schedule-status");
  if (!element) return;
  element.textContent = text;
  element.className = `manual-status ${type}`.trim();
}

async function loadSchedulePreferences() {
  const { data, error } = await scheduleSb
    .from("user_settings")
    .select("theory_study_weekdays,max_lessons_per_day,target_exams")
    .eq("user_id", scheduleState.user.id)
    .maybeSingle();

  if (error) console.warn("Não foi possível carregar preferências do cronograma:", error.message);
  const configuredDays = Array.isArray(data?.theory_study_weekdays)
    ? data.theory_study_weekdays.map(Number).filter((day) => day >= 1 && day <= 7)
    : [];

  scheduleState.theoryStudyWeekdays =
    configuredDays.length
      ? Array.from(
          new Set(
            configuredDays
          )
        ).sort(
          (a, b) =>
            a - b
        )
      : [1, 3, 5];

  scheduleState.maxLessonsPerDay =
    Math.max(
      1,
      Number(
        data?.max_lessons_per_day
        || 1
      )
    );

  scheduleState.targetExams =
    window.LuriaExamPriority?.sanitizeExams(
      data?.target_exams || []
    ) || [];

  window.LuriaStudyMode?.apply("medicine");
  renderBaseSchedulePreview();
}

function currentBaseScheduleRows() {
  const data = window.LURIA_BASE_SCHEDULES || {};
  const rows = data.medicine || [];

  if (!scheduleState.targetExams.length || !window.LuriaExamPriority) {
    return rows;
  }

  return window.LuriaExamPriority.sortRows(
    rows,
    scheduleState.targetExams
  );
}

function currentBaseStudyDays() {
  const configured =
    Array.from(
      new Set(
        (
          scheduleState.theoryStudyWeekdays
          || []
        )
          .map(Number)
          .filter(
            (day) =>
              day >= 1
              && day <= 7
          )
      )
    )
      .sort(
        (a, b) =>
          a - b
      );

  if (!configured.length) {
    return [1, 3, 5];
  }

  if (configured.length <= 3) {
    return configured;
  }

  const preferred =
    [1, 3, 5]
      .filter(
        (day) =>
          configured.includes(day)
      );

  if (preferred.length === 3) {
    return preferred;
  }

  const indexes = [
    0,
    Math.floor(
      (configured.length - 1)
      / 2
    ),
    configured.length - 1
  ];

  return Array.from(
    new Set(
      indexes.map(
        (index) =>
          configured[index]
      )
    )
  ).slice(0, 3);
}

function renderBaseSchedulePreview() {
  const container = document.getElementById("base-schedule-deck");
  const count = document.getElementById("base-schedule-count");
  const daysLabel = document.getElementById("base-schedule-days-label");
  const prioritySummary = document.getElementById("base-schedule-priority-summary");
  if (!container || !count) return;

  const rows = currentBaseScheduleRows();
  count.textContent = `${rows.length} aulas`;
  if (daysLabel) daysLabel.textContent = currentBaseStudyDays().map((day) => BASE_WEEKDAY_LABELS[day]).join(" · ");

  if (prioritySummary) {
    prioritySummary.textContent = scheduleState.targetExams.length
      ? "Prioridade cruzada: " + scheduleState.targetExams
          .map((exam,index) => `${index + 1}ª ${exam} (${[50,30,20][index]}%)`)
          .join(" · ")
      : "Sem provas-alvo: ordem padrão do Cronograma Base";
  }

  container.innerHTML = rows.map((row, index) => {
    const priority = row.examPriority
      || window.LuriaExamPriority?.evaluate(
        row.theme,
        row.area,
        scheduleState.targetExams
      );

    const priorityLabel =
      window.LuriaExamPriority?.label(priority) || "";

    const priorityBadge = priorityLabel
      ? `<em class="exam-priority-badge ${priority.tier}">${priorityLabel} · ${priority.coverage}/${priority.total}</em>`
      : "";

    return `
      <article class="base-schedule-card">
        <div class="base-schedule-card-top">
          <span>Prioridade ${index + 1}</span>
          ${priorityBadge}
        </div>
        <strong>${escapeScheduleHtml(row.theme)}</strong>
        <small>${escapeScheduleHtml(row.area)}</small>
      </article>
    `;
  }).join("");
}

function isoWeekdayForBase(date) {
  const day = date.getDay();
  return day === 0 ? 7 : day;
}

function baseEligibleDates(startDate, endDate) {
  const allowed = new Set(currentBaseStudyDays());
  const dates = [];
  let cursor = startOfDaySchedule(startDate);
  const end = startOfDaySchedule(endDate);

  while (cursor <= end) {
    if (allowed.has(isoWeekdayForBase(cursor))) dates.push(toISODateSchedule(cursor));
    cursor = addDaysSchedule(cursor, 1);
  }
  return dates;
}

function baseTopicKey(area, theme) {
  return normalizeSearchText(`${area || ""}|${theme || ""}`);
}

function spreadBaseRowsAcrossDates(rows, dates) {
  if (!rows.length || !dates.length) return [];
  return rows.map((row, index) => {
    const dateIndex = Math.min(dates.length - 1, Math.floor((index * dates.length) / rows.length));
    return { ...row, scheduled_date: dates[dateIndex] };
  });
}

function genericScheduleSleep(
  milliseconds
) {
  return new Promise(
    (resolve) =>
      window.setTimeout(
        resolve,
        milliseconds
      )
  );
}


async function createGenericTopicWithExistingRpc(
  row,
  index
) {
  const {
    error
  } =
    await scheduleSb.rpc(
      "create_study_topic",
      {
        p_area:
          row.area
          || null,

        p_materia:
          null,

        p_theme:
          row.theme,

        p_original_date:
          row.scheduled_date,

        p_scheduled_date:
          row.scheduled_date,

        p_import_id:
          null,

        p_deck_order:
          Number(
            row.aula
            || index + 1
          )
      }
    );

  if (error) {
    throw error;
  }
}


async function applyBaseSchedule() {
  scheduleState.user =
    scheduleState.user
    || window.docmapUser;

  if (!scheduleState.user) {
    setBaseScheduleStatus(
      "Sua sessão ainda não carregou. Atualize a página e tente novamente.",
      "error"
    );

    return;
  }


  const button =
    document.getElementById(
      "apply-base-schedule"
    );

  const endInput =
    document.getElementById(
      "base-schedule-end-date"
    );

  const endValue =
    endInput?.value
    || "";

  const today =
    todayScheduleISO();


  if (!endValue) {
    setBaseScheduleStatus(
      "Escolha a data limite antes de adicionar o cronograma.",
      "error"
    );

    endInput?.focus();

    return;
  }


  if (endValue < today) {
    setBaseScheduleStatus(
      "A data limite não pode ser anterior a hoje.",
      "error"
    );

    endInput?.focus();

    return;
  }


  try {
    await loadTopics();
  } catch (error) {
    console.warn(
      "Falha ao atualizar tópicos antes da inserção:",
      error
    );
  }


  const allRows =
    currentBaseScheduleRows();


  if (!allRows.length) {
    setBaseScheduleStatus(
      "A lista do cronograma genérico não foi carregada. Faça Ctrl + Shift + R e tente novamente.",
      "error"
    );

    return;
  }


  const existingKeys =
    new Set(
      scheduleState.topics
        .map(
          (topic) =>
            baseTopicKey(
              topic.area,
              topic.theme
            )
        )
    );


  const missingRows =
    allRows.filter(
      (row) =>
        !existingKeys.has(
          baseTopicKey(
            row.area,
            row.theme
          )
        )
    );


  if (!missingRows.length) {
    setBaseScheduleStatus(
      "Todas as aulas deste cronograma genérico já estão no seu cronograma.",
      "success"
    );

    return;
  }


  const endDate =
    parseISODateForLibrary(
      endValue
    );


  const eligibleDates =
    baseEligibleDates(
      new Date(),
      endDate
    );


  if (!eligibleDates.length) {
    setBaseScheduleStatus(
      "Não há dias de aula disponíveis até a data limite.",
      "error"
    );

    return;
  }


  const distributed =
    spreadBaseRowsAcrossDates(
      missingRows,
      eligibleDates
    );


  const modeLabel =
    "Medicina";


  const studyDaysLabel =
    currentBaseStudyDays()
      .map(
        (day) =>
          BASE_WEEKDAY_LABELS[
            day
          ]
      )
      .join(", ");


  const confirmed = await window.LuriaDialog.confirm(
      `Adicionar ${distributed.length} aula${distributed.length === 1 ? "" : "s"} do cronograma genérico de ${modeLabel}?\n\nDias de aula: ${studyDaysLabel}\nData limite: ${formatDateLabelSchedule(endValue)}`
    );


  if (!confirmed) {
    return;
  }


  if (button) {
    button.disabled =
      true;

    button.textContent =
      "Adicionando...";
  }


  let inserted =
    0;


  try {
    /*
      Usa SOMENTE create_study_topic,
      a mesma RPC usada pelo formulário manual.
    */
    for (
      let index = 0;
      index < distributed.length;
      index += 1
    ) {
      const row =
        distributed[index];


      setBaseScheduleStatus(
        `Adicionando aulas... ${inserted}/${distributed.length}`
      );


      try {
        await createGenericTopicWithExistingRpc(
          row,
          index
        );

        inserted += 1;

      } catch (error) {
        const lessonNumber =
          Number(
            row.aula
            || index + 1
          );

        throw new Error(
          `Falha na aula ${lessonNumber} — ${row.theme}: ${error.message || "erro do Supabase"}`
        );
      }


      if (
        inserted > 0
        && inserted % 20 === 0
      ) {
        await genericScheduleSleep(
          80
        );
      }
    }


    await loadTopics();


    setBaseScheduleStatus(
      `${inserted} aula${inserted === 1 ? "" : "s"} do cronograma genérico de ${modeLabel} adicionada${inserted === 1 ? "" : "s"} com sucesso.`,
      "success"
    );


    if (
      distributed[0]
        ?.scheduled_date
    ) {
      scheduleState.weekAnchor =
        parseISODateForLibrary(
          distributed[0]
            .scheduled_date
        );

      renderSchedule();
    }


    document
      .getElementById(
        "week-planner"
      )
      ?.scrollIntoView({
        behavior:
          "smooth",

        block:
          "start"
      });


  } catch (error) {
    console.error(
      "Erro ao adicionar cronograma genérico:",
      error
    );


    try {
      await loadTopics();
    } catch {}


    setBaseScheduleStatus(
      inserted > 0
        ? `${inserted} aula${inserted === 1 ? "" : "s"} foram adicionadas antes do erro. ${error.message}`
        : `Não foi possível adicionar o cronograma: ${error.message}`,
      "error"
    );


  } finally {
    if (button) {
      button.disabled =
        false;

      button.textContent =
        "Adicionar cronograma genérico";
    }
  }
}


window.applyLuriaGenericSchedule =
  async function applyLuriaGenericScheduleSafe() {
    try {
      await applyBaseSchedule();
    } catch (error) {
      console.error(
        "Falha não tratada no cronograma genérico:",
        error
      );

      setBaseScheduleStatus(
        `Erro interno ao adicionar cronograma: ${error.message || "erro desconhecido"}`,
        "error"
      );
    }
  };


function wireBaseSchedule() {
  const endInput =
    document.getElementById(
      "base-schedule-end-date"
    );

  if (endInput) {
    endInput.min =
      todayScheduleISO();

    if (!endInput.value) {
      endInput.value =
        toISODateSchedule(
          addDaysSchedule(
            new Date(),
            270
          )
        );
    }
  }
}

function getActiveTopicsForLibrary() {
  /*
    A Biblioteca/Lista de temas mostra também
    conteúdos já concluídos.
  */
  return scheduleState.topics.slice();
}

function populateAreaFilter() {
  const select =
    document.getElementById("theme-area-filter");

  if (!select) return;

  const current =
    scheduleState.themeAreaFilter;

  const areas =
    Array.from(
      new Set(
        [
          ...getActiveTopicsForLibrary()
            .map(
              (topic) =>
                topic.area?.trim()
            ),
          ...scheduleState.events
            .map(
              (event) =>
                event.area?.trim()
            )
        ]
          .filter(Boolean)
      )
    ).sort((a, b) =>
      a.localeCompare(
        b,
        "pt-BR",
        { sensitivity: "base" }
      )
    );

  select.innerHTML = `
    <option value="">Todas as áreas</option>
    ${areas.map((area) => `
      <option value="${escapeScheduleHtml(area)}">
        ${escapeScheduleHtml(area)}
      </option>
    `).join("")}
  `;

  select.value = areas.includes(current)
    ? current
    : "";
}

function populateBlockFilter() {
  const select =
    document.getElementById(
      "theme-block-filter"
    );

  if (!select) return;

  const current =
    scheduleState.themeBlockFilter;

  const blocks =
    Array.from(
      new Set(
        getActiveTopicsForLibrary()
          .map(
            (topic) =>
              String(
                topic.bloco
                || ""
              ).trim()
          )
          .filter(Boolean)
      )
    ).sort(
      (a, b) =>
        a.localeCompare(
          b,
          "pt-BR",
          {
            numeric: true,
            sensitivity: "base"
          }
        )
    );

  select.innerHTML =
    '<option value="">Todos os blocos</option>'
    + blocks.map(
        (bloco) =>
          '<option value="'
          + escapeScheduleHtml(bloco)
          + '">'
          + escapeScheduleHtml(bloco)
          + '</option>'
      ).join("");

  select.value =
    blocks.includes(current)
      ? current
      : "";
}

function normalizeSearchText(value) {
  return String(value ?? "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();
}

function formatTopicDate(topic) {
  if (
    topic.status === "deck"
    || !topic.scheduled_date
  ) {
    return "No deck";
  }

  return new Intl.DateTimeFormat(
    "pt-BR",
    {
      day: "2-digit",
      month: "2-digit",
      year: "numeric"
    }
  ).format(
    parseISODateForLibrary(
      topic.scheduled_date
    )
  );
}

function parseISODateForLibrary(value) {
  const [year, month, day] =
    String(value).split("-").map(Number);

  return new Date(
    year,
    month - 1,
    day
  );
}

function filteredLibraryTopics() {
  const search =
    normalizeSearchText(
      scheduleState.themeSearch
    );

  const areaFilter =
    scheduleState.themeAreaFilter;

  const blockFilter =
    scheduleState.themeBlockFilter;

  const dateFrom =
    scheduleState.themeDateFrom;

  const dateTo =
    scheduleState.themeDateTo;

  const completionFilter =
    scheduleState
      .themeCompletionFilter;

  return getActiveTopicsForLibrary()
    .filter((topic) => {
      if (
        areaFilter
        && topic.area !== areaFilter
      ) {
        return false;
      }

      if (
        blockFilter
        && String(
          topic.bloco
          || ""
        ) !== blockFilter
      ) {
        return false;
      }

      if (
        dateFrom
        && (
          !topic.scheduled_date
          || topic.scheduled_date < dateFrom
        )
      ) {
        return false;
      }

      if (
        dateTo
        && (
          !topic.scheduled_date
          || topic.scheduled_date > dateTo
        )
      ) {
        return false;
      }

      if (
        completionFilter
        === "completed"
        && !topic.completed_at
      ) {
        return false;
      }


      if (
        completionFilter
        === "pending"
        && topic.completed_at
      ) {
        return false;
      }


      if (!search) return true;

      const haystack =
        normalizeSearchText(
          [
            topic.theme,
            topic.materia,
            topic.area,
            topic.bloco
          ]
            .filter(Boolean)
            .join(" ")
        );

      return haystack.includes(search);
    })
    .sort((a, b) => {
      const aDeck =
        !a.scheduled_date ? 1 : 0;

      const bDeck =
        !b.scheduled_date ? 1 : 0;

      if (aDeck !== bDeck) {
        return aDeck - bDeck;
      }

      if (
        a.scheduled_date
        && b.scheduled_date
        && a.scheduled_date !== b.scheduled_date
      ) {
        return a.scheduled_date.localeCompare(
          b.scheduled_date
        );
      }

      return String(a.theme).localeCompare(
        String(b.theme),
        "pt-BR",
        { sensitivity: "base" }
      );
    });
}


function visibleThemeIds() {
  return filteredLibraryTopics()
    .map(
      (topic) =>
        topic.id
    );
}


function updateThemeBulkToolbar() {
  const visibleIds =
    visibleThemeIds();


  const selectedVisible =
    visibleIds.filter(
      (id) =>
        scheduleState
          .selectedThemeIds
          .has(
            id
          )
    ).length;


  const selectedTopics =
    scheduleState.topics
      .filter(
        (topic) =>
          scheduleState
            .selectedThemeIds
            .has(
              topic.id
            )
      );


  const selectedCount =
    selectedTopics.length;


  const canMoveToDeck =
    selectedTopics.some(
      (topic) =>
        !topic.completed_at
        && Boolean(
          topic.scheduled_date
        )
    );


  const canMarkDone =
    selectedTopics.some(
      (topic) =>
        !topic.completed_at
        && Boolean(
          topic.scheduled_date
        )
    );


  const count =
    document.getElementById(
      "theme-selected-count"
    );


  const deleteButton =
    document.getElementById(
      "theme-delete-selected"
    );


  const doneButton =
    document.getElementById(
      "theme-done-selected"
    );


  const deckButton =
    document.getElementById(
      "theme-deck-selected"
    );


  const menuToggle =
    document.getElementById(
      "theme-bulk-menu-toggle"
    );


  const selectAll =
    document.getElementById(
      "theme-select-all"
    );


  if (count) {
    count.textContent =
      `${selectedCount} selecionada${selectedCount === 1 ? "" : "s"}`;
  }


  if (deleteButton) {
    deleteButton.disabled =
      selectedCount === 0;
  }


  if (doneButton) {
    doneButton.disabled =
      !canMarkDone;
  }


  if (deckButton) {
    deckButton.disabled =
      !canMoveToDeck;
  }


  if (menuToggle) {
    menuToggle.disabled =
      selectedCount === 0;

    if (
      selectedCount === 0
    ) {
      closeThemeBulkMenu();
    }
  }


  if (selectAll) {
    selectAll.checked =
      visibleIds.length > 0
      && selectedVisible
        === visibleIds.length;


    selectAll.indeterminate =
      selectedVisible > 0
      && selectedVisible
        < visibleIds.length;
  }
}

function closeThemeBulkMenu() {
  const menu =
    document.getElementById(
      "theme-bulk-menu"
    );

  const toggle =
    document.getElementById(
      "theme-bulk-menu-toggle"
    );

  if (menu) {
    menu.hidden =
      true;
  }

  if (toggle) {
    toggle.setAttribute(
      "aria-expanded",
      "false"
    );
  }
}


function toggleThemeBulkMenu() {
  const menu =
    document.getElementById(
      "theme-bulk-menu"
    );

  const toggle =
    document.getElementById(
      "theme-bulk-menu-toggle"
    );

  if (
    !menu
    || !toggle
    || toggle.disabled
  ) {
    return;
  }

  const open =
    menu.hidden;

  menu.hidden =
    !open;

  toggle.setAttribute(
    "aria-expanded",
    open
      ? "true"
      : "false"
  );
}


async function returnSelectedThemesToDeck() {
  const eligible =
    scheduleState.topics
      .filter(
        (topic) =>
          scheduleState
            .selectedThemeIds
            .has(
              topic.id
            )
          && !topic.completed_at
          && Boolean(
            topic.scheduled_date
          )
      );

  if (!eligible.length) {
    window.LuriaDialog.alert(
      "Nenhuma das aulas selecionadas pode ser removida para o deck."
    );

    closeThemeBulkMenu();

    return;
  }


  const confirmed = await window.LuriaDialog.confirm(
      `Remover ${eligible.length} aula${eligible.length === 1 ? "" : "s"} selecionada${eligible.length === 1 ? "" : "s"} das datas atuais e enviar para o Deck não programado?`
    );


  if (!confirmed) {
    return;
  }


  const button =
    document.getElementById(
      "theme-deck-selected"
    );


  if (button) {
    button.disabled =
      true;
  }


  const {
    error
  } =
    await scheduleSb
      .from(
        "study_topics"
      )
      .update({
        scheduled_date:
          null,

        status:
          "deck"
      })
      .in(
        "id",
        eligible.map(
          (topic) =>
            topic.id
        )
      );


  if (error) {
    console.error(
      error
    );

    window.LuriaDialog.alert(
      `Não foi possível remover as aulas para o deck: ${error.message}`
    );

    if (button) {
      button.disabled =
        false;
    }

    return;
  }


  scheduleState
    .selectedThemeIds
    .clear();


  closeThemeBulkMenu();

  await loadTopics();
}


async function markSelectedThemesAlreadyDone() {
  const ids = Array.from(scheduleState.selectedThemeIds);
  if (!ids.length) return;

  const selectedTopics = scheduleState.topics.filter((topic) => scheduleState.selectedThemeIds.has(topic.id));
  const withDate = selectedTopics.filter((topic) => Boolean(topic.scheduled_date));

  if (!withDate.length) {
    window.LuriaDialog.alert("As aulas selecionadas estão no deck e não possuem data no cronograma.");
    return;
  }

  const confirmed = await window.LuriaDialog.confirm(`Marcar ${withDate.length} aula${withDate.length === 1 ? "" : "s"} como já feita${withDate.length === 1 ? "" : "s"} usando exatamente as datas em que estão agendadas no cronograma?`);
  if (!confirmed) return;

  const button = document.getElementById("theme-done-selected");
  if (button) button.disabled = true;

  try {
    const { data, error } = await scheduleSb.rpc("mark_topics_already_done_on_schedule", { p_topic_ids: ids });
    if (error) throw error;

    const marked = Number(data?.marked || 0);
    const skipped = Number(data?.skipped || 0);
    scheduleState.selectedThemeIds.clear();
    closeThemeBulkMenu();
    window.LuriaDialog.alert(`${marked} aula${marked === 1 ? "" : "s"} marcada${marked === 1 ? "" : "s"} como já feita${marked === 1 ? "" : "s"}.${skipped ? ` ${skipped} selecionada${skipped === 1 ? "" : "s"} não tinham data ou já estavam concluídas.` : ""}`);
    await loadTopics();
  } catch (error) {
    console.error(error);
    window.LuriaDialog.alert(`Não foi possível marcar as aulas: ${error.message}`);
  } finally {
    if (button) button.disabled = false;
  }
}

async function deleteSelectedThemes() {
  const ids =
    Array.from(
      scheduleState
        .selectedThemeIds
    );


  if (!ids.length) {
    return;
  }


  const confirmed = await window.LuriaDialog.confirm(
      `Excluir ${ids.length} aula${ids.length === 1 ? "" : "s"} permanentemente do cronograma?`
    );


  if (!confirmed) {
    return;
  }


  const button =
    document.getElementById(
      "theme-delete-selected"
    );


  if (button) {
    button.disabled =
      true;
  }


  const {
    error
  } =
    await scheduleSb
      .from(
        "study_topics"
      )
      .delete()
      .in(
        "id",
        ids
      );


  if (button) {
    button.disabled =
      false;
  }


  if (error) {
    console.error(
      error
    );


    window.LuriaDialog.alert(
      `Não foi possível excluir as aulas selecionadas: ${error.message}`
    );


    return;
  }


  scheduleState
    .selectedThemeIds
    .clear();


  closeThemeBulkMenu();

  await loadTopics();
}



function isSimulationEventType(type) {
  return [
    "simulation",
    "smart_simulation",
    "full_exam"
  ].includes(
    String(type || "")
  );
}

function filteredLibraryEvents() {
  const search =
    normalizeSearchText(
      scheduleState.eventSearch
    );

  return scheduleState.events
    .filter((event) => {
      if (
        scheduleState.eventTypeFilter === "simulations"
        && !isSimulationEventType(
          event.event_type
        )
      ) {
        return false;
      }

      if (
        scheduleState.eventTypeFilter === "other"
        && isSimulationEventType(
          event.event_type
        )
      ) {
        return false;
      }

      if (
        scheduleState.eventDateFrom
        && (
          !event.event_date
          || event.event_date < scheduleState.eventDateFrom
        )
      ) {
        return false;
      }

      if (
        scheduleState.eventDateTo
        && (
          !event.event_date
          || event.event_date > scheduleState.eventDateTo
        )
      ) {
        return false;
      }

      if (!search) {
        return true;
      }

      const haystack =
        normalizeSearchText(
          [
            event.title,
            event.area,
            event.materia,
            scheduleKindLabel(
              event.event_type
            )
          ]
            .filter(Boolean)
            .join(" ")
        );

      return haystack.includes(
        search
      );
    })
    .sort(
      (a, b) =>
        String(
          a.event_date || ""
        ).localeCompare(
          String(
            b.event_date || ""
          )
        )
        || String(
          a.title || ""
        ).localeCompare(
          String(
            b.title || ""
          ),
          "pt-BR",
          {
            sensitivity: "base"
          }
        )
    );
}

function renderEventLibrary() {
  const container =
    document.getElementById(
      "event-library-list"
    );

  const count =
    document.getElementById(
      "event-list-count"
    );

  if (!container || !count) {
    return;
  }

  const events =
    filteredLibraryEvents();

  count.textContent =
    `${events.length} evento${events.length === 1 ? "" : "s"}`;

  if (!events.length) {
    container.innerHTML = `
      <div class="theme-library-empty">
        Nenhum evento encontrado com esses filtros.
      </div>
    `;
    return;
  }

  container.innerHTML =
    events.map(
      (event) => `
        <article class="theme-library-row event-library-row">
          <div class="theme-library-title">
            <strong>${escapeScheduleHtml(
              event.title || "Evento"
            )}</strong>
            <small>
              ${escapeScheduleHtml(
                scheduleKindLabel(
                  event.event_type
                )
              )}
            </small>
          </div>

          <div class="theme-library-cell hide-medium">
            ${escapeScheduleHtml(
              event.area || "Sem área"
            )}
          </div>

          <div class="theme-library-cell hide-medium">
            ${escapeScheduleHtml(
              event.materia || "—"
            )}
          </div>

          <div class="theme-library-date">
            ${escapeScheduleHtml(
              formatDateLabelSchedule(
                event.event_date
              )
            )}
            ${event.event_time
              ? ` · ${escapeScheduleHtml(
                  String(
                    event.event_time
                  ).slice(0, 5)
                )}`
              : ""}
          </div>

          <div class="theme-library-actions">
            <button
              class="theme-library-action"
              type="button"
              data-library-edit-event="${escapeScheduleHtml(
                event.id
              )}"
            >
              Editar
            </button>

            <button
              class="theme-library-action danger"
              type="button"
              data-library-delete-event="${escapeScheduleHtml(
                event.id
              )}"
            >
              Apagar
            </button>
          </div>
        </article>
      `
    ).join("");

  container
    .querySelectorAll(
      "[data-library-edit-event]"
    )
    .forEach(
      (button) => {
        button.addEventListener(
          "click",
          () => {
            openEventEditDialog(
              button.dataset
                .libraryEditEvent
            );
          }
        );
      }
    );

  container
    .querySelectorAll(
      "[data-library-delete-event]"
    )
    .forEach(
      (button) => {
        button.addEventListener(
          "click",
          async () => {
            await deleteScheduleEvent(
              button.dataset
                .libraryDeleteEvent
            );
          }
        );
      }
    );
}

function switchScheduleLibraryTab(tab) {
  const normalized =
    tab === "events"
      ? "events"
      : "lessons";

  scheduleState.libraryTab =
    normalized;

  document
    .querySelectorAll(
      "[data-schedule-library-tab]"
    )
    .forEach(
      (button) => {
        const active =
          button.dataset
            .scheduleLibraryTab
          === normalized;

        button.classList.toggle(
          "active",
          active
        );

        button.setAttribute(
          "aria-selected",
          active
            ? "true"
            : "false"
        );
      }
    );

  const lessonPanel =
    document.getElementById(
      "theme-library-content"
    );

  const eventPanel =
    document.getElementById(
      "event-library-panel"
    );

  if (lessonPanel) {
    lessonPanel.hidden =
      normalized !== "lessons";
  }

  if (eventPanel) {
    eventPanel.hidden =
      normalized !== "events";
  }

  if (normalized === "events") {
    renderEventLibrary();
  } else {
    renderThemeLibrary();
  }
}

function openEventEditDialog(
  eventId
) {
  const item =
    scheduleState.events
      .find(
        (event) =>
          event.id === eventId
      );

  if (!item) {
    return;
  }

  scheduleState.editingEventId =
    eventId;

  document.getElementById(
    "event-edit-title"
  ).value =
    item.title || "";

  document.getElementById(
    "event-edit-type"
  ).value =
    item.event_type || "other";

  document.getElementById(
    "event-edit-date"
  ).value =
    item.event_date || "";

  document.getElementById(
    "event-edit-time"
  ).value =
    item.event_time
      ? String(
          item.event_time
        ).slice(0, 5)
      : "";

  document.getElementById(
    "event-edit-area"
  ).value =
    item.area || "";

  document.getElementById(
    "event-edit-materia"
  ).value =
    item.materia || "";

  const dialog =
    document.getElementById(
      "event-edit-dialog"
    );

  if (
    typeof dialog?.showModal
      === "function"
  ) {
    dialog.showModal();
  } else {
    dialog?.setAttribute(
      "open",
      ""
    );
  }
}

function closeEventEditDialog() {
  scheduleState.editingEventId =
    null;

  const dialog =
    document.getElementById(
      "event-edit-dialog"
    );

  if (
    typeof dialog?.close
      === "function"
  ) {
    dialog.close();
  } else {
    dialog?.removeAttribute(
      "open"
    );
  }
}

async function saveEditedScheduleEvent(
  event
) {
  event.preventDefault();

  const eventId =
    scheduleState.editingEventId;

  if (!eventId) {
    return;
  }

  const title =
    cleanText(
      document.getElementById(
        "event-edit-title"
      )?.value
    );

  const eventType =
    document.getElementById(
      "event-edit-type"
    )?.value
    || "other";

  const eventDate =
    document.getElementById(
      "event-edit-date"
    )?.value
    || "";

  if (!title || !eventDate) {
    window.LuriaDialog.alert(
      "Preencha o título e a data do evento."
    );
    return;
  }

  const saveButton =
    document.getElementById(
      "event-edit-save"
    );

  if (saveButton) {
    saveButton.disabled =
      true;
  }

  const {
    error
  } =
    await scheduleSb
      .from(
        "schedule_events"
      )
      .update({
        title,
        event_type:
          eventType,
        event_date:
          eventDate,
        event_time:
          document.getElementById(
            "event-edit-time"
          )?.value
          || null,
        area:
          cleanText(
            document.getElementById(
              "event-edit-area"
            )?.value
          )
          || null,
        materia:
          cleanText(
            document.getElementById(
              "event-edit-materia"
            )?.value
          )
          || null,
        updated_at:
          new Date().toISOString()
      })
      .eq(
        "id",
        eventId
      )
      .eq(
        "user_id",
        scheduleState.user.id
      );

  if (saveButton) {
    saveButton.disabled =
      false;
  }

  if (error) {
    console.error(error);

    window.LuriaDialog.alert(
      `Não foi possível salvar o evento: ${error.message}`
    );
    return;
  }

  if (window.LuriaGoogleCalendar?.pushEvent) {
    try {
      await window.LuriaGoogleCalendar.pushEvent(
        eventId
      );
    } catch (googleError) {
      console.error(googleError);
      window.LuriaDialog.alert(
        "O evento foi salvo na LURIA, mas não foi possível atualizar o Google Agenda agora. Use “Sincronizar agora” para tentar novamente."
      );
    }
  }

  closeEventEditDialog();
  await loadTopics();
  switchScheduleLibraryTab(
    "events"
  );
}

function wireEventLibrary() {
  document
    .querySelectorAll(
      "[data-schedule-library-tab]"
    )
    .forEach(
      (button) => {
        button.addEventListener(
          "click",
          () => {
            switchScheduleLibraryTab(
              button.dataset
                .scheduleLibraryTab
            );
          }
        );
      }
    );

  document
    .getElementById(
      "event-library-search"
    )
    ?.addEventListener(
      "input",
      (event) => {
        scheduleState.eventSearch =
          event.target.value || "";

        renderEventLibrary();
      }
    );

  document
    .getElementById(
      "event-library-type"
    )
    ?.addEventListener(
      "change",
      (event) => {
        scheduleState.eventTypeFilter =
          event.target.value || "all";

        renderEventLibrary();
      }
    );

  document
    .getElementById(
      "event-library-date-from"
    )
    ?.addEventListener(
      "change",
      (event) => {
        scheduleState.eventDateFrom =
          event.target.value || "";

        renderEventLibrary();
      }
    );

  document
    .getElementById(
      "event-library-date-to"
    )
    ?.addEventListener(
      "change",
      (event) => {
        scheduleState.eventDateTo =
          event.target.value || "";

        renderEventLibrary();
      }
    );

  document
    .getElementById(
      "event-edit-form"
    )
    ?.addEventListener(
      "submit",
      saveEditedScheduleEvent
    );

  [
    "event-edit-close",
    "event-edit-cancel"
  ].forEach(
    (id) => {
      document
        .getElementById(id)
        ?.addEventListener(
          "click",
          closeEventEditDialog
        );
    }
  );
}

function renderThemeLibrary() {
  const container =
    document.getElementById("theme-library-list");

  const count =
    document.getElementById("theme-list-count");

  if (!container || !count) return;

  populateAreaFilter();
  populateBlockFilter();

  const bulk =
    document.querySelector(
      ".theme-library-bulk"
    );

  if (bulk) {
    bulk.hidden =
      false;
  }

  const topics =
    filteredLibraryTopics();

  count.textContent =
    `${topics.length} ${
      topics.length === 1
        ? "aula"
        : "aulas"
    }`;

  if (!topics.length) {
    container.innerHTML = `
      <div class="theme-library-empty">
        Nenhuma aula encontrada com esse filtro.
      </div>
    `;

    updateThemeBulkToolbar();

    return;
  }

  container.innerHTML =
    topics.map((topic) => {
      const isCompleted =
        Boolean(
          topic.completed_at
        );

      const isDeck =
        !isCompleted
        && (
          topic.status === "deck"
          || !topic.scheduled_date
        );

      const dateLabel =
        isCompleted
          ? `Concluída · ${formatTopicDate(topic)}`
          : formatTopicDate(topic);

      const examPriority = window.LuriaExamPriority?.evaluate(
        topic.theme,
        topic.area,
        scheduleState.targetExams
      );

      const examPriorityLabel =
        window.LuriaExamPriority?.label(examPriority) || "";

      return `
        <article class="theme-library-row with-selection ${isCompleted ? "completed" : ""}">

          <label
            class="theme-library-select"
            aria-label="Selecionar aula"
          >
            <input
              class="theme-library-select-check"
              type="checkbox"
              data-theme-select="${escapeScheduleHtml(
                topic.id
              )}"
              ${scheduleState.selectedThemeIds.has(topic.id) ? "checked" : ""}
            >
          </label>

          <div class="theme-library-title">
            <strong>${escapeScheduleHtml(topic.theme)}</strong>
            <small>
              ${escapeScheduleHtml(
                topic.materia
                || "Sem matéria"
              )}
            </small>
            ${examPriorityLabel ? `
              <em class="exam-priority-badge ${examPriority.tier}">
                ${examPriorityLabel} · ${examPriority.coverage}/${examPriority.total}
              </em>
            ` : ""}
          </div>

          <div class="theme-library-cell hide-medium">
            ${escapeScheduleHtml(
              topic.area
              || "Sem área"
            )}
          </div>

          <div class="theme-library-cell hide-medium">
            ${escapeScheduleHtml(
              topic.materia
              || "—"
            )}
          </div>

          <div class="theme-library-date ${isDeck ? "deck" : ""} ${isCompleted ? "completed" : ""}">
            ${escapeScheduleHtml(
              dateLabel
            )}
          </div>

          <div class="theme-library-actions">

            ${
              isCompleted
                ? `
                  <span class="theme-library-completed-badge">
                    Concluída
                  </span>
                `
                : `
                  <button
                    class="theme-library-action"
                    type="button"
                    data-library-topic="${escapeScheduleHtml(topic.id)}"
                  >
                    ${isDeck ? "Ir para deck" : "Ver na semana"}
                  </button>

                  ${
                    isDeck
                      ? ""
                      : `
                        <button
                          class="theme-library-action to-deck"
                          type="button"
                          data-library-to-deck="${escapeScheduleHtml(topic.id)}"
                        >
                          Remover para o deck
                        </button>
                      `
                  }

                  <button
                    class="theme-library-action done"
                    type="button"
                    data-library-done="${escapeScheduleHtml(topic.id)}"
                  >
                    Já feita
                  </button>
                `
            }

          </div>
        </article>
      `;
    }).join("");

  container
    .querySelectorAll(
      "[data-theme-select]"
    )
    .forEach(
      (input) => {
        input.addEventListener(
          "change",
          () => {
            const id =
              input.dataset
                .themeSelect;


            if (input.checked) {
              scheduleState
                .selectedThemeIds
                .add(
                  id
                );

            } else {
              scheduleState
                .selectedThemeIds
                .delete(
                  id
                );
            }


            updateThemeBulkToolbar();
          }
        );
      }
    );


  updateThemeBulkToolbar();


  document
    .querySelectorAll("[data-library-topic]")
    .forEach((button) => {
      button.addEventListener("click", () => {
        focusLibraryTopic(
          button.dataset.libraryTopic
        );
      });
    });


  document
    .querySelectorAll("[data-library-to-deck]")
    .forEach((button) => {
      button.addEventListener(
        "click",
        async () => {
          const topicId =
            button.dataset
              .libraryToDeck;

          const topic =
            scheduleState
              .topics
              .find(
                (item) =>
                  item.id
                  === topicId
              );

          if (!topic) {
            return;
          }


          const confirmed = await window.LuriaDialog.confirm(
              `Remover "${topic.theme}" da data atual e enviar para o Deck não programado?`
            );


          if (!confirmed) {
            return;
          }


          await returnTopicToDeck(
            topicId
          );
        }
      );
    });


  document
    .querySelectorAll("[data-library-done]")
    .forEach((button) => {
      button.addEventListener(
        "click",
        () => {
          openAlreadyDoneDialog(
            button.dataset
              .libraryDone
          );
        }
      );
    });
}

function focusLibraryTopic(topicId) {
  const topic =
    scheduleState.topics.find(
      (item) => item.id === topicId
    );

  if (!topic) return;

  if (
    topic.status === "deck"
    || !topic.scheduled_date
  ) {
    document
      .getElementById("deck-dropzone")
      ?.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });

    return;
  }

  scheduleState.weekAnchor =
    parseISODateForLibrary(
      topic.scheduled_date
    );

  renderSchedule();

  document
    .getElementById("week-planner")
    ?.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });
}


function switchScheduleAddMode(
  mode
) {
  const automaticAllowed =
    window.LuriaEntitlements?.enabled(
      "automatic_schedule"
    ) === true;

  if (
    mode === "automatic"
    && !automaticAllowed
  ) {
    mode =
      "manual";
  }

  if (
    ![
      "automatic",
      "manual",
      "base"
    ].includes(
      mode
    )
  ) {
    mode =
      automaticAllowed
        ? "automatic"
        : "manual";
  }


  scheduleState.addMode =
    mode;


  document
    .querySelectorAll(
      "[data-schedule-add-mode]"
    )
    .forEach(
      (button) => {
        button.classList.toggle(
          "active",
          button.dataset
            .scheduleAddMode === mode
        );
      }
    );


  document
    .querySelectorAll(
      "[data-schedule-add-section]"
    )
    .forEach(
      (section) => {
        section.classList.toggle(
          "active",
          section.dataset
            .scheduleAddSection === mode
        );
      }
    );
}


function wireScheduleAddMode() {
  document
    .querySelectorAll(
      "[data-schedule-add-mode]"
    )
    .forEach(
      (button) => {
        button.addEventListener(
          "click",
          () => {
            switchScheduleAddMode(
              button.dataset
                .scheduleAddMode
            );
          }
        );
      }
    );
}


function wireManualTopicForm() {
  document
    .getElementById("manual-topic-form")
    ?.addEventListener(
      "submit",
      addManualTopic
    );
}


function wireThemeLibraryBulkActions() {
  document
    .getElementById(
      "theme-select-all"
    )
    ?.addEventListener(
      "change",
      (event) => {
        const ids =
          visibleThemeIds();


        for (
          const id
          of ids
        ) {
          if (
            event.target.checked
          ) {
            scheduleState
              .selectedThemeIds
              .add(
                id
              );

          } else {
            scheduleState
              .selectedThemeIds
              .delete(
                id
              );
          }
        }


        renderThemeLibrary();
      }
    );


  document
    .getElementById(
      "theme-bulk-menu-toggle"
    )
    ?.addEventListener(
      "click",
      (event) => {
        event.stopPropagation();

        toggleThemeBulkMenu();
      }
    );


  document
    .getElementById(
      "theme-deck-selected"
    )
    ?.addEventListener(
      "click",
      returnSelectedThemesToDeck
    );


  document
    .getElementById(
      "theme-done-selected"
    )
    ?.addEventListener(
      "click",
      markSelectedThemesAlreadyDone
    );


  document
    .getElementById(
      "theme-delete-selected"
    )
    ?.addEventListener(
      "click",
      deleteSelectedThemes
    );


  document.addEventListener(
    "click",
    (event) => {
      const wrap =
        document.querySelector(
          ".theme-bulk-menu-wrap"
        );

      if (
        wrap
        && !wrap.contains(
          event.target
        )
      ) {
        closeThemeBulkMenu();
      }
    }
  );


  document.addEventListener(
    "keydown",
    (event) => {
      if (
        event.key === "Escape"
      ) {
        closeThemeBulkMenu();
      }
    }
  );
}

function themeFiltersAreActive() {
  return Boolean(
    scheduleState.themeAreaFilter
    || scheduleState.themeBlockFilter
    || scheduleState.themeDateFrom
    || scheduleState.themeDateTo
    || (
      scheduleState.themeCompletionFilter
      && scheduleState.themeCompletionFilter
        !== "all"
    )
  );
}


function updateThemeFilterButtonState() {
  const button =
    document.getElementById(
      "theme-filter-menu-toggle"
    );

  if (!button) {
    return;
  }

  const active =
    themeFiltersAreActive();

  button.classList.toggle(
    "has-active-filter",
    active
  );

  button.title =
    active
      ? "Filtros ativos"
      : "Filtros";
}


function closeThemeFilterMenu() {
  const menu =
    document.getElementById(
      "theme-filter-menu"
    );

  const toggle =
    document.getElementById(
      "theme-filter-menu-toggle"
    );

  if (menu) {
    menu.hidden =
      true;
  }

  if (toggle) {
    toggle.setAttribute(
      "aria-expanded",
      "false"
    );
  }
}


function toggleThemeFilterMenu() {
  const menu =
    document.getElementById(
      "theme-filter-menu"
    );

  const toggle =
    document.getElementById(
      "theme-filter-menu-toggle"
    );

  if (
    !menu
    || !toggle
  ) {
    return;
  }

  const opening =
    menu.hidden;

  menu.hidden =
    !opening;

  toggle.setAttribute(
    "aria-expanded",
    opening
      ? "true"
      : "false"
  );
}


function wireThemeLibraryFilters() {
  const search =
    document.getElementById(
      "theme-search"
    );

  const area =
    document.getElementById(
      "theme-area-filter"
    );

  const block =
    document.getElementById(
      "theme-block-filter"
    );

  const completion =
    document.getElementById(
      "theme-completion-filter"
    );

  const dateFrom =
    document.getElementById(
      "theme-date-from"
    );

  const dateTo =
    document.getElementById(
      "theme-date-to"
    );


  search?.addEventListener(
    "input",
    () => {
      scheduleState.themeSearch =
        search.value;

      renderThemeLibrary();
    }
  );


  area?.addEventListener(
    "change",
    () => {
      scheduleState.themeAreaFilter =
        area.value;

      updateThemeFilterButtonState();
      renderThemeLibrary();
    }
  );

  block?.addEventListener(
    "change",
    () => {
      scheduleState.themeBlockFilter =
        block.value;

      updateThemeFilterButtonState();
      renderThemeLibrary();
    }
  );


  completion?.addEventListener(
    "change",
    () => {
      scheduleState.themeCompletionFilter =
        completion.value
        || "all";

      updateThemeFilterButtonState();
      renderThemeLibrary();
    }
  );


  dateFrom?.addEventListener(
    "change",
    () => {
      scheduleState.themeDateFrom =
        dateFrom.value
        || "";

      updateThemeFilterButtonState();
      renderThemeLibrary();
    }
  );


  dateTo?.addEventListener(
    "change",
    () => {
      scheduleState.themeDateTo =
        dateTo.value
        || "";

      updateThemeFilterButtonState();
      renderThemeLibrary();
    }
  );


  document
    .getElementById(
      "theme-filter-menu-toggle"
    )
    ?.addEventListener(
      "click",
      (event) => {
        event.stopPropagation();

        toggleThemeFilterMenu();
      }
    );


  document
    .getElementById(
      "theme-filter-menu-close"
    )
    ?.addEventListener(
      "click",
      closeThemeFilterMenu
    );


  document
    .getElementById(
      "theme-filter-apply"
    )
    ?.addEventListener(
      "click",
      () => {
        closeThemeFilterMenu();
        renderThemeLibrary();
      }
    );


  document
    .getElementById(
      "theme-clear-date-filter"
    )
    ?.addEventListener(
      "click",
      () => {
        scheduleState.themeAreaFilter =
          "";

        scheduleState.themeBlockFilter =
          "";

        scheduleState.themeCompletionFilter =
          "all";

        scheduleState.themeDateFrom =
          "";

        scheduleState.themeDateTo =
          "";


        if (area) {
          area.value =
            "";
        }

        if (block) {
          block.value =
            "";
        }

        if (completion) {
          completion.value =
            "all";
        }

        if (dateFrom) {
          dateFrom.value =
            "";
        }

        if (dateTo) {
          dateTo.value =
            "";
        }


        updateThemeFilterButtonState();
        renderThemeLibrary();
      }
    );


  document.addEventListener(
    "click",
    (event) => {
      const wrap =
        document.querySelector(
          ".theme-filter-menu-wrap"
        );

      if (
        wrap
        && !wrap.contains(
          event.target
        )
      ) {
        closeThemeFilterMenu();
      }
    }
  );


  document.addEventListener(
    "keydown",
    (event) => {
      if (
        event.key === "Escape"
      ) {
        closeThemeFilterMenu();
      }
    }
  );


  updateThemeFilterButtonState();
}


function renderSchedule() {
  /* Configurações > Cronograma usa somente os controles de importação/cadastro.
     Não tenta renderizar a agenda quando o planner não existe nesta página. */
  if (!document.getElementById("week-planner") && !document.getElementById("month-planner")) {
    return;
  }

  renderSummary();
  renderPlanner();
  renderDeck();
  renderThemeLibrary();
  renderEventLibrary();
  wireDynamicInteractions();
}


function closeTopicOverflowMenus(
  exceptId = null
) {
  document
    .querySelectorAll(
      "[data-topic-overflow]"
    )
    .forEach(
      (menu) => {
        const id =
          menu.dataset
            .topicOverflow;


        if (
          exceptId
          && id === exceptId
        ) {
          return;
        }


        menu.hidden =
          true;
      }
    );


  document
    .querySelectorAll(
      "[data-topic-overflow-trigger]"
    )
    .forEach(
      (button) => {
        const id =
          button.dataset
            .topicOverflowTrigger;


        if (
          exceptId
          && id === exceptId
        ) {
          return;
        }


        button.setAttribute(
          "aria-expanded",
          "false"
        );
      }
    );
}


function wireDynamicInteractions() {

  document
    .querySelectorAll(
      "[data-topic-overflow-trigger]"
    )
    .forEach(
      (button) => {
        button.addEventListener(
          "click",
          (event) => {
            event.preventDefault();
            event.stopPropagation();


            const id =
              button
                .dataset
                .topicOverflowTrigger;


            const menu =
              document.querySelector(
                `[data-topic-overflow="${CSS.escape(
                  id
                )}"]`
              );


            if (!menu) {
              return;
            }


            const willOpen =
              menu.hidden;


            closeTopicOverflowMenus();


            menu.hidden =
              !willOpen;


            button.setAttribute(
              "aria-expanded",
              willOpen
                ? "true"
                : "false"
            );
          }
        );
      }
    );


  document
    .querySelectorAll(
      "[data-topic-overflow]"
    )
    .forEach(
      (menu) => {
        menu.addEventListener(
          "click",
          (event) =>
            event.stopPropagation()
        );
      }
    );


  document
    .querySelectorAll("[data-topic-id][draggable='true']")
    .forEach((card) => {
      card.addEventListener("dragstart", (event) => {
        const topicId = card.dataset.topicId;
        scheduleState.draggingTopicId = topicId;
        event.dataTransfer.setData("text/plain", topicId);
        event.dataTransfer.effectAllowed = "move";
        card.classList.add("dragging");
      });

      card.addEventListener("dragend", () => {
        scheduleState.draggingTopicId = null;
        card.classList.remove("dragging");

        document
          .querySelectorAll(".drop-target")
          .forEach((element) => element.classList.remove("drop-target"));
      });
    });

  document.querySelectorAll("[data-planner-date]").forEach((day) => {
    day.addEventListener("dragover", (event) => {
      event.preventDefault();
      day.classList.add("drop-target");
    });

    day.addEventListener("dragleave", () => {
      day.classList.remove("drop-target");
    });

    day.addEventListener("drop", async (event) => {
      event.preventDefault();
      day.classList.remove("drop-target");

      const topicId =
        event.dataTransfer.getData("text/plain") ||
        scheduleState.draggingTopicId;

      if (!topicId) return;

      await scheduleTopic(
        topicId,
        day.dataset.plannerDate
      );
    });
  });

  document.querySelectorAll("[data-schedule-topic]").forEach((button) => {
    button.addEventListener("click", async () => {
      const topicId = button.dataset.scheduleTopic;

      const input = document.querySelector(
        `[data-deck-date="${CSS.escape(topicId)}"]`
      );

      const date = input?.value;

      if (!date) {
        window.LuriaDialog.alert("Escolha uma data.");
        return;
      }

      await scheduleTopic(topicId, date);
    });
  });

  document.querySelectorAll("[data-agenda-scope]").forEach(button=>button.addEventListener("click",()=>{
    scheduleState.agendaScope=button.dataset.agendaScope; scheduleState.agendaSelected.clear();
    const title=document.getElementById("agenda-activities-title"), dateLabel=document.getElementById("agenda-today-date");
    if(title) title.textContent=scheduleState.agendaScope==="overdue"?"Aulas atrasadas":"Atividades de hoje";
    if(dateLabel) dateLabel.textContent=scheduleState.agendaScope==="overdue"?"Aulas pendentes":new Intl.DateTimeFormat("pt-BR",{weekday:"long",day:"2-digit",month:"long"}).format(startOfDaySchedule(new Date()));
    document.querySelectorAll("[data-agenda-scope]").forEach(b=>b.classList.toggle("active",b===button)); renderAgendaSide(); wireDynamicInteractions();
  }));
  const bindStructuredFilter=(id,stateKey)=>{const el=document.getElementById(id);if(!el)return;el.value=scheduleState[stateKey]||"all";el.onchange=()=>{scheduleState[stateKey]=el.value;scheduleState.agendaSelected.clear();renderAgendaSide();wireDynamicInteractions();};};
  bindStructuredFilter("agenda-filter-area","agendaAreaFilter");
  bindStructuredFilter("agenda-filter-theme","agendaThemeFilter");
  const agendaFilter=document.getElementById("agenda-activity-filter");
  if(agendaFilter){agendaFilter.value=scheduleState.agendaFilter;agendaFilter.onchange=()=>{scheduleState.agendaFilter=agendaFilter.value;scheduleState.agendaSelected.clear();renderAgendaSide();wireDynamicInteractions();};}
  document.querySelectorAll("[data-agenda-select]").forEach(input=>input.addEventListener("change",()=>{input.checked?scheduleState.agendaSelected.add(input.dataset.agendaSelect):scheduleState.agendaSelected.delete(input.dataset.agendaSelect);const el=document.getElementById("agenda-selected-count");if(el)el.textContent=scheduleState.agendaSelected.size+" selecionadas";}));
  const selectAll=document.getElementById("agenda-select-all"); if(selectAll) selectAll.onchange=()=>{document.querySelectorAll("[data-agenda-select]").forEach(input=>{input.checked=selectAll.checked;selectAll.checked?scheduleState.agendaSelected.add(input.dataset.agendaSelect):scheduleState.agendaSelected.delete(input.dataset.agendaSelect)});const el=document.getElementById("agenda-selected-count");if(el)el.textContent=scheduleState.agendaSelected.size+" selecionadas";};
  const bulkUpdate=async(mode)=>{
    const keys=[...scheduleState.agendaSelected]; if(!keys.length){window.LuriaDialog?.alert("Selecione pelo menos uma atividade.");return;}
    const date=document.getElementById("agenda-bulk-date")?.value;
    if(mode==="date"&&!date){window.LuriaDialog?.alert("Escolha a nova data.");return;}
    for(const key of keys){const [source,id]=key.split(":");
      if(mode==="date"){
        if(source==="topic") await scheduleSb.from("study_topics").update({scheduled_date:date}).eq("id",id).eq("user_id",scheduleState.user.id);
        if(source==="event") await scheduleSb.from("schedule_events").update({event_date:date}).eq("id",id).eq("user_id",scheduleState.user.id);
        if(source==="error") await scheduleSb.from("error_notebook").update({due_date:date}).eq("id",id).eq("user_id",scheduleState.user.id);
      } else if(mode==="complete"&&source==="topic"){await scheduleSb.from("study_topics").update({completed_at:new Date().toISOString()}).eq("id",id).eq("user_id",scheduleState.user.id);}
    }
    scheduleState.agendaSelected.clear(); await loadTopics();
  };
  const bulkDate=document.getElementById("agenda-bulk-reschedule");if(bulkDate)bulkDate.onclick=()=>bulkUpdate("date");
  const bulkDeck=document.getElementById("agenda-bulk-deck");if(bulkDeck)bulkDeck.onclick=async()=>{const keys=[...scheduleState.agendaSelected].filter(k=>k.startsWith("topic:"));if(!keys.length){window.LuriaDialog?.alert("Selecione pelo menos uma aula para remover ao deck.");return;}for(const key of keys){const id=key.split(":")[1];await scheduleSb.from("study_topics").update({status:"deck",scheduled_date:null}).eq("id",id).eq("user_id",scheduleState.user.id);}scheduleState.agendaSelected.clear();await loadTopics();};
  const bulkDelete=document.getElementById("agenda-bulk-delete");if(bulkDelete)bulkDelete.onclick=async()=>{const keys=[...scheduleState.agendaSelected];if(!keys.length){window.LuriaDialog?.alert("Selecione pelo menos uma atividade.");return;}if(!confirm("Apagar "+keys.length+" atividade(s)? Esta ação não pode ser desfeita."))return;for(const key of keys){const [source,id]=key.split(":");if(source==="topic")await scheduleSb.from("study_topics").delete().eq("id",id).eq("user_id",scheduleState.user.id);if(source==="event")await scheduleSb.from("schedule_events").delete().eq("id",id).eq("user_id",scheduleState.user.id);if(source==="error")await scheduleSb.from("error_notebook").delete().eq("id",id).eq("user_id",scheduleState.user.id);}scheduleState.agendaSelected.clear();await loadTopics();};
  const bindMonthFilter=(id,key)=>{const el=document.getElementById(id);if(!el)return;el.value=scheduleState[key]||"all";el.onchange=()=>{scheduleState[key]=el.value;renderMonthPlanner();wireDynamicInteractions();};};
  const monthItems=[...scheduleState.topics.map(x=>({area:x.area,theme:x.theme})),...scheduleState.events.map(x=>({area:x.area,theme:x.title})),...scheduleState.errorItems.map(x=>({area:x.area,theme:x.theme||x.materia}))];
  fillCronogramaFilter("month-filter-area",monthItems.map(x=>x.area),scheduleState.monthAreaFilter,"Todas as áreas");
  fillCronogramaFilter("month-filter-theme",monthItems.map(x=>x.theme),scheduleState.monthThemeFilter,"Todos os temas");
  bindMonthFilter("month-filter-area","monthAreaFilter");bindMonthFilter("month-filter-theme","monthThemeFilter");bindMonthFilter("month-filter-type","monthFilter");

  // Espelha os selects funcionais em listas clicáveis no padrão visual do LURIA.
  document.querySelectorAll(".month-filter-group[data-month-filter]").forEach((group)=>{
    const select=document.getElementById(group.dataset.monthFilter);
    const trigger=group.querySelector(".month-filter-trigger");
    const list=group.querySelector(".month-filter-list");
    if(!select||!trigger||!list)return;
    const label=trigger.querySelector("strong");
    const sync=()=>{
      const selected=select.options[select.selectedIndex]||select.options[0];
      if(label)label.textContent=selected?.textContent||"Todos";
      list.innerHTML=[...select.options].map(option=>'<button type="button" data-value="'+escapeScheduleHtml(option.value)+'" class="'+(option.value===select.value?"active":"")+'">'+escapeScheduleHtml(option.textContent)+'</button>').join("");
      list.querySelectorAll("button").forEach(button=>{
        button.onclick=(event)=>{
          event.preventDefault();event.stopPropagation();
          select.value=button.dataset.value;
          select.dispatchEvent(new Event("change",{bubbles:true}));
          group.classList.remove("open");list.hidden=true;trigger.setAttribute("aria-expanded","false");
        };
      });
    };
    sync();
    trigger.onclick=(event)=>{
      event.preventDefault();event.stopPropagation();
      document.querySelectorAll(".month-filter-group.open").forEach(other=>{
        if(other===group)return;
        other.classList.remove("open");
        const otherList=other.querySelector(".month-filter-list");if(otherList)otherList.hidden=true;
        other.querySelector(".month-filter-trigger")?.setAttribute("aria-expanded","false");
      });
      const opening=list.hidden;
      list.hidden=!opening;group.classList.toggle("open",opening);trigger.setAttribute("aria-expanded",String(opening));
    };
  });

  document.querySelectorAll("[data-today-menu-trigger]").forEach((button) => {
    button.addEventListener("click", (event) => {
      event.preventDefault(); event.stopPropagation();
      const key=button.dataset.todayMenuTrigger;
      document.querySelectorAll("[data-today-menu]").forEach(menu => { if(menu.dataset.todayMenu!==key) menu.hidden=true; });
      const menu=document.querySelector('[data-today-menu="'+CSS.escape(key)+'"]');
      if(menu){ menu.hidden=!menu.hidden; button.setAttribute("aria-expanded", String(!menu.hidden)); }
    });
  });
  document.querySelectorAll("[data-today-menu]").forEach(menu => menu.addEventListener("click", e => e.stopPropagation()));
  document.querySelectorAll("[data-today-date-save]").forEach(button => {
    button.addEventListener("click", async (event) => {
      event.preventDefault(); event.stopPropagation();
      const key=button.dataset.todayDateSave;
      const [source,id]=key.split(":");
      const input=document.querySelector('[data-today-date-input="'+CSS.escape(key)+'"]');
      const date=input?.value; if(!date) return;
      button.disabled=true;
      try{
        let error=null;
        if(source==="topic"){ const result=await scheduleSb.from("study_topics").update({scheduled_date:date}).eq("id",id).eq("user_id",scheduleState.user.id); error=result.error; }
        else if(source==="event"){ const result=await scheduleSb.from("schedule_events").update({event_date:date}).eq("id",id).eq("user_id",scheduleState.user.id); error=result.error; }
        else if(source==="error"){ const result=await scheduleSb.from("error_notebook").update({due_date:date}).eq("id",id).eq("user_id",scheduleState.user.id); error=result.error; }
        if(error) throw error;
        await loadTopics();
      }catch(err){ console.error(err); window.LuriaDialog?.alert("Não foi possível alterar a data."); }
      finally{ button.disabled=false; }
    });
  });

  document.querySelectorAll("[data-complete-topic]").forEach((button) => {
    button.addEventListener("click", async () => {
      await completeTopic(button.dataset.completeTopic);
    });
  });


  document.querySelectorAll("[data-remove-from-date]").forEach((button) => {
    button.addEventListener("click", async () => {
      const topicId = button.dataset.removeFromDate;

      const topic = scheduleState.topics.find(
        (item) => item.id === topicId
      );

      if (!topic) return;

      const confirmed = await window.LuriaDialog.confirm(
        `Remover "${topic.theme}" desta data e enviar para o Deck não programado?`
      );

      if (!confirmed) return;

      await returnTopicToDeck(topicId);
    });
  });

  document.querySelectorAll("[data-already-done-topic]").forEach((button) => {
    button.addEventListener("click", () => {
      openAlreadyDoneDialog(
        button.dataset.alreadyDoneTopic
      );
    });
  });


  document.querySelectorAll("[data-start-study-topic]").forEach((link) => {
    link.addEventListener("click", () => {
      const topic = scheduleState.topics.find((item) => item.id === link.dataset.startStudyTopic);
      window.LuriaStudyTimer?.start("lesson", { sourceId: topic?.id, area: topic?.area || null, materia: topic?.materia || topic?.theme || null });
    });
  });

  document.querySelectorAll("[data-delete-topic]").forEach((button) => {
    button.addEventListener("click", async () => {
      await deleteTopic(button.dataset.deleteTopic);
    });
  });

  document
    .querySelectorAll("[data-delete-schedule-event]")
    .forEach((button) => {
      button.addEventListener("click", async () => {
        await deleteScheduleEvent(
          button.dataset.deleteScheduleEvent
        );
      });
    });
}

function formatStudyDuration(seconds=0){
  const total=Math.max(0,Math.round(Number(seconds)||0)), h=Math.floor(total/3600), m=Math.floor((total%3600)/60);
  return h ? h+"h "+String(m).padStart(2,"0")+"min" : m+"min";
}
async function renderScheduleStudyInsights(period){
  const totalEl=document.getElementById("agenda-study-total"), barsEl=document.getElementById("agenda-study-bars"), donut=document.getElementById("agenda-category-donut"), donutTotal=document.getElementById("agenda-category-total"), legend=document.getElementById("agenda-category-legend");
  if(!totalEl||!barsEl||!donut||!legend||!scheduleState.user?.id) return;
  scheduleState.insightPeriod=period||scheduleState.insightPeriod||"week";
  const mode=scheduleState.insightPeriod, today=startOfDaySchedule(new Date());
  let start, end, labels=[], bucketIndex;
  if(mode==="month"){
    start=new Date(today.getFullYear(),today.getMonth(),1); end=new Date(today.getFullYear(),today.getMonth()+1,1);
    const days=Math.round((end-start)/86400000); labels=Array.from({length:days},(_,i)=>String(i+1));
    bucketIndex=d=>Math.floor((startOfDaySchedule(d)-start)/86400000);
  }else if(mode==="year"){
    start=new Date(today.getFullYear(),0,1); end=new Date(today.getFullYear()+1,0,1);
    labels=["Jan","Fev","Mar","Abr","Mai","Jun","Jul","Ago","Set","Out","Nov","Dez"];
    bucketIndex=d=>d.getFullYear()===today.getFullYear()?d.getMonth():-1;
  }else{
    start=startOfWeekSchedule(today); end=addDaysSchedule(start,7);
    labels=["Seg","Ter","Qua","Qui","Sex","Sáb","Dom"];
    bucketIndex=d=>Math.round((startOfDaySchedule(d)-start)/86400000);
  }
  document.querySelectorAll(".agenda-insight-tabs").forEach(tabs=>tabs.querySelectorAll("[data-period]").forEach(btn=>btn.classList.toggle("active",btn.dataset.period===mode)));
  const periodLabel=mode==="month"?"Neste mês":mode==="year"?"Neste ano":"Nesta semana";
  const periodText=totalEl.parentElement?.querySelector("span"); if(periodText)periodText.textContent=periodLabel;
  const {data,error}=await scheduleSb.from("study_sessions").select("started_at,duration_seconds,activity_kind,area,materia").eq("user_id",scheduleState.user.id).gte("started_at",start.toISOString()).lt("started_at",end.toISOString());
  if(error){console.warn("LURIA: não foi possível carregar tempo do cronograma",error);return;}
  const rows=data||[], buckets=Array(labels.length).fill(0), byCategory=new Map();
  rows.forEach(row=>{
    const sec=Math.max(0,Number(row.duration_seconds)||0), d=new Date(row.started_at), idx=bucketIndex(d);
    if(idx>=0&&idx<buckets.length)buckets[idx]+=sec;
    const label=(row.area||row.materia||({lesson:"Aulas",questions:"Questões",external_questions:"Questões",flashcards:"Flashcards",simulation:"Simulados",study:"Estudo"}[row.activity_kind])||"Outros");
    byCategory.set(label,(byCategory.get(label)||0)+sec);
  });
  const total=buckets.reduce((a,b)=>a+b,0), max=Math.max(...buckets,1);
  totalEl.textContent=formatStudyDuration(total); if(donutTotal)donutTotal.textContent=formatStudyDuration(total);
  barsEl.style.gridTemplateColumns="repeat("+labels.length+",minmax(0,1fr))";
  barsEl.innerHTML=buckets.map((sec,i)=>'<div class="agenda-study-day"><span class="agenda-study-value">'+(sec?formatStudyDuration(sec):"")+'</span><span class="agenda-study-bar-track"><i class="agenda-study-bar" style="height:'+Math.max(sec?5:2,Math.round(sec/max*100))+'%"></i></span><span class="agenda-study-label">'+labels[i]+'</span></div>').join("");
  const palette=["var(--chart-1)","var(--chart-2)","var(--chart-3)","var(--chart-4)","var(--chart-5)"], cats=[...byCategory.entries()].sort((a,b)=>b[1]-a[1]).slice(0,5), catTotal=cats.reduce((a,x)=>a+x[1],0);
  if(!catTotal){donut.style.background="conic-gradient(var(--border) 0 100%)";legend.innerHTML='<span class="agenda-empty">Sem tempo registrado.</span>';}
  else{
    let cursor=0; const segs=cats.map(([label,sec],i)=>{const a=cursor,b=cursor+sec/catTotal*100;cursor=b;return palette[i]+" "+a+"% "+b+"%";});
    donut.style.background="conic-gradient("+segs.join(",")+")";
    legend.innerHTML=cats.map(([label,sec],i)=>'<div class="agenda-category-item"><i class="agenda-category-dot" style="background:'+palette[i]+'"></i><span class="agenda-category-copy"><strong>'+escapeScheduleHtml(label)+'</strong><span>'+formatStudyDuration(sec)+'</span></span><span class="agenda-category-pct">'+Math.round(sec/catTotal*100)+'%</span></div>').join("");
  }
  document.querySelectorAll(".agenda-insight-tabs [data-period]").forEach(btn=>btn.onclick=()=>renderScheduleStudyInsights(btn.dataset.period));
}
async function loadTopics() {
  const [
    topicsResult,
    eventsResult,
    errorsResult
  ] = await Promise.all([
    scheduleSb
      .from("study_topics")
      .select("*")
      .eq("user_id", scheduleState.user.id)
      .order("created_at", { ascending: true }),

    scheduleSb
      .from("schedule_events")
      .select("*")
      .eq("user_id", scheduleState.user.id)
      .order("event_date", { ascending: true })
      .order("created_at", { ascending: true }),

    scheduleSb
      .from("error_notebook")
      .select("id,area,materia,theme,due_date,active,review_count")
      .eq("user_id", scheduleState.user.id)
      .eq("active", true)
      .order("due_date", { ascending: true })
  ]);

  if (topicsResult.error) {
    console.error(topicsResult.error);
    setImportStatus(
      `Não foi possível carregar os temas: ${topicsResult.error.message}`,
      "error"
    );
    return;
  }

  if (eventsResult.error) {
    console.error(eventsResult.error);
    setImportStatus(
      `Não foi possível carregar os eventos: ${eventsResult.error.message}`,
      "error"
    );
    return;
  }

  if (errorsResult.error) {
    console.error(errorsResult.error);
    setImportStatus(
      `Não foi possível carregar o caderno de erros: ${errorsResult.error.message}`,
      "error"
    );
    return;
  }

  scheduleState.topics =
    topicsResult.data
    || [];

  scheduleState.events =
    eventsResult.data
    || [];

  scheduleState.errorItems =
    errorsResult.data
    || [];

  refreshExistingKeys();

  renderSchedule();
}

async function scheduleTopic(topicId, date) {
  const { error } = await scheduleSb.rpc("schedule_study_topic", {
    p_topic_id: topicId,
    p_date: date
  });

  if (error) {
    console.error(error);
    window.LuriaDialog.alert(`Não foi possível agendar: ${error.message}`);
    return;
  }

  await loadTopics();
}

async function returnTopicToDeck(topicId) {
  const topic = scheduleState.topics.find((item) => item.id === topicId);

  if (!topic || topic.completed_at) return;

  const { error } = await scheduleSb
    .from("study_topics")
    .update({
      scheduled_date: null,
      status: "deck"
    })
    .eq("id", topicId);

  if (error) {
    console.error(error);
    window.LuriaDialog.alert(`Não foi possível devolver ao deck: ${error.message}`);
    return;
  }

  await loadTopics();
}

async function completeTopic(topicId) {
  const topic = scheduleState.topics.find((item) => item.id === topicId);

  if (!topic) return;

  const confirmed = await window.LuriaDialog.confirm(
    `Concluir "${topic.theme}"? As revisões da matéria serão distribuídas automaticamente.`
  );

  if (!confirmed) return;

  const { error } = await scheduleSb.rpc("complete_study_topic", {
    p_topic_id: topicId
  });

  if (error) {
    console.error(error);
    window.LuriaDialog.alert(`Não foi possível concluir: ${error.message}`);
    return;
  }

  await loadTopics();
}

function openAlreadyDoneDialog(topicId) {
  const topic = scheduleState.topics.find((item) => item.id === topicId);

  if (!topic) return;

  scheduleState.alreadyDoneTopicId = topicId;

  document.getElementById("already-done-title").textContent =
    topic.theme;

  document.getElementById("already-done-date").value = "";

  document.getElementById("already-done-dialog").showModal();
}

function closeAlreadyDoneDialog() {
  scheduleState.alreadyDoneTopicId = null;

  const dialog = document.getElementById("already-done-dialog");

  if (dialog.open) {
    dialog.close();
  }
}

async function submitAlreadyDone(event) {
  event.preventDefault();

  const topicId = scheduleState.alreadyDoneTopicId;
  const studiedOn =
    document.getElementById("already-done-date").value || null;

  if (!topicId) return;

  const topic = scheduleState.topics.find((item) => item.id === topicId);

  closeAlreadyDoneDialog();

  const { error } = await scheduleSb.rpc(
    "mark_topic_already_done",
    {
      p_topic_id: topicId,
      p_studied_on: studiedOn
    }
  );

  if (error) {
    console.error(error);
    window.LuriaDialog.alert(`Não foi possível marcar como já feita: ${error.message}`);
    return;
  }

  window.LuriaDialog.alert(
    `"${topic?.theme || "Aula"}" foi marcada como já feita. As revisões foram distribuídas na agenda.`
  );

  await loadTopics();
}

async function deleteTopic(topicId) {
  const topic = scheduleState.topics.find((item) => item.id === topicId);

  if (!topic) return;

  const confirmed = await window.LuriaDialog.confirm(
    `Excluir "${topic.theme}" do cronograma?`
  );

  if (!confirmed) return;

  const { error } = await scheduleSb
    .from("study_topics")
    .delete()
    .eq("id", topicId);

  if (error) {
    console.error(error);
    window.LuriaDialog.alert(`Não foi possível excluir: ${error.message}`);
    return;
  }

  await loadTopics();
}


async function deleteScheduleEvent(
  eventId
) {
  const event =
    scheduleState.events
      .find(
        (item) =>
          item.id
          === eventId
      );

  if (!event) {
    return;
  }


  const confirmed = await window.LuriaDialog.confirm(
      `Excluir "${event.title}" do cronograma?`
    );


  if (!confirmed) {
    return;
  }


  if (
    event?.metadata?.google_event_id
    && window.LuriaGoogleCalendar?.deleteLinkedEvent
  ) {
    try {
      await window.LuriaGoogleCalendar.deleteLinkedEvent(
        event.metadata.google_event_id
      );
    } catch (googleError) {
      console.error(googleError);
      window.LuriaDialog.alert(
        "Não foi possível excluir este evento do Google Agenda. A exclusão na LURIA foi cancelada para evitar dessincronização."
      );
      return;
    }
  }

  const {
    error
  } =
    await scheduleSb
      .from(
        "schedule_events"
      )
      .delete()
      .eq(
        "id",
        eventId
      );


  if (error) {
    console.error(
      error
    );

    window.LuriaDialog.alert(
      `Não foi possível excluir: ${error.message}`
    );

    return;
  }


  await loadTopics();

  if (
    scheduleState.libraryTab
      === "events"
  ) {
    switchScheduleLibraryTab(
      "events"
    );
  }
}




function closeReorganizeOverdueDialog() {
  const dialog =
    document.getElementById(
      "reorganize-overdue-dialog"
    );


  if (!dialog) {
    return;
  }


  if (
    typeof dialog.close
      === "function"
  ) {
    dialog.close();

  } else {
    dialog.removeAttribute(
      "open"
    );
  }
}


async function openReorganizeOverdueDialog() {
  const overdue =
    scheduleState.topics
      .filter(
        isTopicOverdue
      );


  if (!overdue.length) {
    setReorganizeStatus(
      "Não há aulas atrasadas. Use “Reorganizar aulas adiantadas” se quiser puxar o conteúdo para frente.",
      "success"
    );

    return;
  }


  const endDate =
    document.getElementById(
      "reorganize-overdue-end-date"
    );


  const today =
    todayScheduleISO();


  if (endDate) {
    endDate.min =
      today;


    if (
      !endDate.value
      || endDate.value < today
    ) {
      endDate.value =
        toISODateSchedule(
          addDaysSchedule(
            new Date(),
            30
          )
        );
    }
  }


  const capacity =
    document.getElementById(
      "reorganize-overdue-capacity"
    );


  if (capacity) {
    capacity.textContent =
      "Carregando configuração...";
  }


  const {
    data,
    error
  } =
    await scheduleSb
      .from(
        "user_settings"
      )
      .select(
        "theory_study_weekdays,max_lessons_per_day"
      )
      .eq(
        "user_id",
        scheduleState.user.id
      )
      .maybeSingle();


  if (capacity) {
    const maxLessons =
      Number(
        data?.max_lessons_per_day
        || 1
      );


    const weekdays =
      Array.isArray(
        data?.theory_study_weekdays
      )
        ? data.theory_study_weekdays
            .map(Number)
            .filter(
              (day) =>
                BASE_WEEKDAY_LABELS[
                  day
                ]
            )
        : [];

    const daysLabel =
      weekdays.length
        ? weekdays
            .map(
              (day) =>
                BASE_WEEKDAY_LABELS[
                  day
                ]
            )
            .join(
              " · "
            )
        : "todos os dias";

    capacity.textContent =
      error
        ? `${overdue.length} aula${overdue.length === 1 ? "" : "s"} atrasada${overdue.length === 1 ? "" : "s"}.`
        : `${overdue.length} aula${overdue.length === 1 ? "" : "s"} atrasada${overdue.length === 1 ? "" : "s"} · dias: ${daysLabel} · máximo de ${maxLessons} aula${maxLessons === 1 ? "" : "s"} por dia.`;
  }


  const dialog =
    document.getElementById(
      "reorganize-overdue-dialog"
    );


  if (
    typeof dialog?.showModal
      === "function"
  ) {
    dialog.showModal();

  } else {
    dialog?.setAttribute(
      "open",
      ""
    );
  }
}


async function reorganizeOverdueLessons() {
  const overdue =
    scheduleState.topics
      .filter(
        isTopicOverdue
      );


  const endDate =
    document
      .getElementById(
        "reorganize-overdue-end-date"
      )
      ?.value
    || "";


  const today =
    todayScheduleISO();


  if (
    !endDate
    || endDate < today
  ) {
    setReorganizeStatus(
      "Escolha uma data final igual ou posterior a hoje.",
      "error"
    );

    return;
  }


  const button =
    document.getElementById(
      "confirm-reorganize-overdue"
    );


  if (button) {
    button.disabled =
      true;
  }


  setReorganizeStatus(
    "Reorganizando aulas atrasadas..."
  );


  const {
    data,
    error
  } =
    await scheduleSb.rpc(
      "reorganize_overdue_lessons_range",
      {
        p_end_date:
          endDate,

        p_start_date:
          today
      }
    );


  if (button) {
    button.disabled =
      false;
  }


  if (error) {
    console.error(
      error
    );

    setReorganizeStatus(
      `Não foi possível reorganizar: ${error.message}`,
      "error"
    );

    return;
  }


  closeReorganizeOverdueDialog();

  const moved =
    Number(
      data?.moved
      || 0
    );

  const remaining =
    Number(
      data?.remaining
      || 0
    );

  const maxLessons =
    Number(
      data?.max_lessons_per_day
      || 1
    );

  setReorganizeStatus(
    remaining > 0
      ? `${moved} aula${moved === 1 ? "" : "s"} atrasada${moved === 1 ? "" : "s"} reorganizada${moved === 1 ? "" : "s"}. ${remaining} não couberam até ${formatDateLabelSchedule(endDate)}.`
      : moved > 0
        ? `${moved} aula${moved === 1 ? "" : "s"} atrasada${moved === 1 ? "" : "s"} reorganizada${moved === 1 ? "" : "s"} até ${formatDateLabelSchedule(endDate)}. Limite diário: ${maxLessons}.`
        : "Não havia aulas atrasadas para mover.",
    remaining > 0
      ? "error"
      : "success"
  );

  await loadTopics();
}



async function reorganizeAdvancedLessons() {
  const button =
    document.getElementById(
      "reorganize-advanced"
    );

  const overdueCount =
    scheduleState.topics
      .filter(
        isTopicOverdue
      )
      .length;

  if (
    overdueCount > 0
  ) {
    setReorganizeStatus(
      `Existem ${overdueCount} aula${overdueCount === 1 ? "" : "s"} atrasada${overdueCount === 1 ? "" : "s"}. Reorganize as atrasadas antes de adiantar o cronograma.`,
      "error"
    );

    return;
  }

  const confirmed = await window.LuriaDialog.confirm(
      "Adiantar o cronograma agora? O LURIA compactará as aulas futuras para frente, usando no máximo 3 dias de aula por semana e respeitando o máximo diário configurado."
    );

  if (!confirmed) {
    return;
  }

  if (button) {
    button.disabled =
      true;
  }

  setReorganizeStatus(
    "Reorganizando aulas adiantadas..."
  );

  try {
    const {
      data,
      error
    } =
      await scheduleSb.rpc(
        "reorganize_advanced_lessons"
      );

    if (error) {
      throw error;
    }

    if (
      data?.blocked_by_overdue
    ) {
      setReorganizeStatus(
        `Existem ${Number(data?.overdue_count || 0)} aula(s) atrasada(s). Reorganize-as primeiro.`,
        "error"
      );

      return;
    }

    const moved =
      Number(
        data?.moved
        || 0
      );

    const daysPerWeek =
      Number(
        data?.days_per_week
        || 3
      );

    const maxPerDay =
      Number(
        data?.max_lessons_per_day
        || 1
      );

    setReorganizeStatus(
      moved > 0
        ? `${moved} aula${moved === 1 ? "" : "s"} futura${moved === 1 ? "" : "s"} reorganizada${moved === 1 ? "" : "s"} para frente. Máximo de ${daysPerWeek} dias de aula por semana e ${maxPerDay} aula${maxPerDay === 1 ? "" : "s"} por dia.`
        : "O cronograma futuro já está compacto dentro do limite de até 3 dias de aula por semana.",
      "success"
    );

    await loadTopics();

  } catch (error) {
    console.error(
      error
    );

    setReorganizeStatus(
      `Não foi possível reorganizar as aulas adiantadas: ${error.message}`,
      "error"
    );

  } finally {
    if (button) {
      button.disabled =
        false;
    }
  }
}


function wireOverdueOrganizer() {
  document
    .getElementById(
      "reorganize-overdue"
    )
    ?.addEventListener(
      "click",
      openReorganizeOverdueDialog
    );


  document
    .getElementById(
      "reorganize-advanced"
    )
    ?.addEventListener(
      "click",
      reorganizeAdvancedLessons
    );


  document
    .getElementById(
      "confirm-reorganize-overdue"
    )
    ?.addEventListener(
      "click",
      reorganizeOverdueLessons
    );


  [
    "close-reorganize-overdue",
    "cancel-reorganize-overdue"
  ].forEach(
    (id) => {
      document
        .getElementById(
          id
        )
        ?.addEventListener(
          "click",
          closeReorganizeOverdueDialog
        );
    }
  );
}

function wireImportControls() {
  const fileInput = document.getElementById("schedule-file");
  const fileDrop = document.getElementById("file-drop");

  fileInput.addEventListener("change", () => {
    parseSelectedFile(fileInput.files?.[0] || null);
  });

  fileDrop.addEventListener("dragover", (event) => {
    event.preventDefault();
    fileDrop.classList.add("dragover");
  });

  fileDrop.addEventListener("dragleave", () => {
    fileDrop.classList.remove("dragover");
  });

  fileDrop.addEventListener("drop", (event) => {
    event.preventDefault();
    fileDrop.classList.remove("dragover");

    const file = event.dataTransfer.files?.[0];

    if (file) {
      parseSelectedFile(file);
    }
  });

  document
    .querySelectorAll('input[name="import-mode"]')
    .forEach((radio) => {
      radio.addEventListener("change", async () => {
        if (scheduleState.file) {
          await parseSelectedFile(scheduleState.file);
        }
      });
    });

  document
    .getElementById("cancel-import")
    .addEventListener("click", resetImport);

  document
    .getElementById("confirm-import")
    .addEventListener("click", confirmImport);

  document
    .getElementById("preview-select-all")
    ?.addEventListener(
      "change",
      (event) => {
        const checked =
          event.target.checked;

        for (
          const row
          of scheduleState.parsedRows
        ) {
          if (
            row.duplicate
            || row.errors.length > 0
          ) {
            continue;
          }

          row.include =
            checked;
        }

        renderPreview();
      }
    );
}

function wirePlannerNavigation() {
  document.getElementById("week-prev").addEventListener("click", () => {
    scheduleState.weekAnchor =
      scheduleState.plannerView === "month"
        ? addMonthsSchedule(scheduleState.weekAnchor, -1)
        : addDaysSchedule(scheduleState.weekAnchor, -7);

    renderSchedule();
  });

  document.getElementById("week-next").addEventListener("click", () => {
    scheduleState.weekAnchor =
      scheduleState.plannerView === "month"
        ? addMonthsSchedule(scheduleState.weekAnchor, 1)
        : addDaysSchedule(scheduleState.weekAnchor, 7);

    renderSchedule();
  });

  document.getElementById("week-today").addEventListener("click", () => {
    scheduleState.weekAnchor =
      startOfDaySchedule(new Date());

    renderSchedule();
  });

  document.getElementById("planner-view-week")?.addEventListener("click", () => {
    scheduleState.plannerView = "week";
    updatePlannerViewControls();
    renderWeeklyOverview();
    wireDynamicInteractions();
  });

  document.getElementById("planner-view-month")?.addEventListener("click", () => {
    scheduleState.plannerView = "month";
    updatePlannerViewControls();
    renderMonthPlanner();
    wireDynamicInteractions();
  });
}

function wireDeckDropzone() {
  const deckZone = document.getElementById("deck-dropzone");

  deckZone.addEventListener("dragover", (event) => {
    event.preventDefault();
    deckZone.classList.add("drop-target");
  });

  deckZone.addEventListener("dragleave", () => {
    deckZone.classList.remove("drop-target");
  });

  deckZone.addEventListener("drop", async (event) => {
    event.preventDefault();
    deckZone.classList.remove("drop-target");

    const topicId =
      event.dataTransfer.getData("text/plain") ||
      scheduleState.draggingTopicId;

    if (!topicId) return;

    await returnTopicToDeck(topicId);
  });
}

function wireAlreadyDoneDialog() {
  document
    .getElementById("already-done-form")
    .addEventListener("submit", submitAlreadyDone);

  document
    .getElementById("already-done-cancel")
    .addEventListener("click", closeAlreadyDoneDialog);
}

async function initCronograma() {
  scheduleState.user = window.docmapUser;

  const nativeSettingsPage =
    document.body?.dataset?.page === "configuracoes-cronograma";

  /* Controles compartilhados entre a agenda e Configurações > Cronograma. */
  wireImportControls();
  wireManualTopicForm();
  wireScheduleAddMode();
  wireBaseSchedule();

  /* Estes controles só existem na Agenda do menu lateral. */
  if (!nativeSettingsPage) {
    wirePlannerNavigation();
    wireDeckDropzone();

    document
      .getElementById("deck-distribute")
      ?.addEventListener("click", distributeDeckTopics);

    wireAlreadyDoneDialog();
    wireThemeLibraryFilters();
    wireThemeLibraryBulkActions();
    wireEventLibrary();
    wireOverdueOrganizer();

    document.addEventListener("click", () => closeTopicOverflowMenus());

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        closeTopicOverflowMenus();
      }
    });
  }

  const initialDataPromise = Promise.all([
    loadSchedulePreferences(),
    loadTopics()
  ]);

  const automaticAllowed =
    window.LuriaEntitlements?.enabled("automatic_schedule") === true;

  const automaticButton =
    document.querySelector('[data-schedule-add-mode="automatic"]');

  if (automaticButton && !automaticAllowed) {
    automaticButton.hidden = true;
  }

  switchScheduleAddMode(
    automaticAllowed ? "automatic" : "manual"
  );

  await initialDataPromise;
}

if (window.docmapUser) {
  initCronograma();
} else {
  window.addEventListener(
    "docmap:ready",
    initCronograma,
    { once: true }
  );
}

if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", bindReferenceCalendarControls); else bindReferenceCalendarControls();
