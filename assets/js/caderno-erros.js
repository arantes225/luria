let errorSb =
  window.supabaseClient
  || null;


let errorUser =
  null;

let errorQueue =
  [];

let errorIndex =
  0;

let allErrorAreas =
  [];

let errorLibraryItems =
  [];

let editingErrorId =
  null;

const selectedErrorIds =
  new Set();

let importedErrorRows =
  [];

let preparedNewErrorImage =
  null;

let preparedNewErrorOriginalSize =
  null;


const errorParams =
  new URLSearchParams(
    window.location.search
  );


const errorAgendaDate =
  errorParams.get(
    "agenda_date"
  );


const errorAgendaArea =
  errorParams.get(
    "agenda_area"
  );


/* =========================================================
   HELPERS
   ========================================================= */

function errorTodayISO() {
  const d =
    new Date();


  return `${d.getFullYear()}-${String(
    d.getMonth() + 1
  ).padStart(
    2,
    "0"
  )}-${String(
    d.getDate()
  ).padStart(
    2,
    "0"
  )}`;
}


function formatErrorDate(
  value
) {
  if (!value) {
    return "—";
  }


  const [
    year,
    month,
    day
  ] =
    value
      .split("-")
      .map(Number);


  return new Intl
    .DateTimeFormat(
      "pt-BR",
      {
        day:
          "2-digit",

        month:
          "2-digit",

        year:
          "numeric"
      }
    )
    .format(
      new Date(
        year,
        month - 1,
        day
      )
    );
}


function setErrorStatus(
  text,
  type = ""
) {
  const element =
    document.getElementById(
      "error-status"
    );


  if (!element) {
    return;
  }


  element.textContent =
    text;


  element.className =
    `error-status ${type}`
      .trim();
}


function setNewErrorStatus(
  text,
  type = ""
) {
  const element =
    document.getElementById(
      "new-error-status"
    );


  if (!element) {
    return;
  }


  element.textContent =
    text;


  element.className =
    `error-status ${type}`
      .trim();
}


function normalizeErrorAgendaArea(
  value
) {
  const normalized =
    String(
      value
      ?? ""
    )
      .trim()
      .toLowerCase()
      .normalize(
        "NFD"
      )
      .replace(
        /[\u0300-\u036f]/g,
        ""
      );

  if (
    !normalized
    || normalized === "sem area"
  ) {
    return "";
  }

  return normalized;
}


function sameErrorAgendaArea(
  first,
  second
) {
  return (
    normalizeErrorAgendaArea(
      first
    )
    ===
    normalizeErrorAgendaArea(
      second
    )
  );
}


function currentAreaFilter() {
  if (
    errorAgendaDate
  ) {
    return (
      errorAgendaArea
      || ""
    );
  }


  return (
    document
      .getElementById(
        "error-area-filter"
      )
      ?.value
    || ""
  );
}


function safeFileBase(
  name
) {
  return String(
    name
    || "imagem"
  )
    .replace(
      /\.[^.]+$/,
      ""
    )
    .replace(
      /[^a-zA-Z0-9_-]+/g,
      "-"
    )
    .replace(
      /-+/g,
      "-"
    )
    .replace(
      /^-|-$/g,
      ""
    )
    || "imagem";
}


/* =========================================================
   MÉTRICAS
   ========================================================= */

async function loadErrorMetrics() {
  const {
    data,
    error
  } =
    await errorSb
      .from(
        "error_notebook_metrics"
      )
      .select(
        "registered_errors,reviewed_errors,overdue_errors,retention_percent"
      )
      .maybeSingle();


  if (error) {
    console.warn(
      "Não foi possível carregar as métricas do Caderno de Erros:",
      error.message
    );

    return;
  }


  const metrics =
    data || {
      registered_errors:
        0,

      reviewed_errors:
        0,

      overdue_errors:
        0,

      retention_percent:
        null
    };


  const registeredMetric = document.getElementById("error-metric-registered");
  if (registeredMetric) registeredMetric.textContent = Number(metrics.registered_errors || 0);


  const reviewedMetric = document.getElementById("error-metric-reviewed");
  if (reviewedMetric) reviewedMetric.textContent = Number(metrics.reviewed_errors || 0);


  const overdueMetric = document.getElementById("error-metric-overdue");
  if (overdueMetric) overdueMetric.textContent = Number(metrics.overdue_errors || 0);


  const retention =
    metrics
      .retention_percent;


  const retentionMetric = document.getElementById("error-metric-retention");
  if (retentionMetric) {
    retentionMetric.textContent =
      retention === null || retention === undefined
        ? "—"
        : `${Number(retention).toFixed(1).replace(".", ",")}%`;
  }
}


/* =========================================================
   FILTRO POR ÁREA
   ========================================================= */

async function loadErrorAreas() {
  const mode =
    window.luriaStudyMode
    || "medicine";

  allErrorAreas =
    window.LuriaStudyMode
      ?.generalAreasFor(
        mode
      )
    || [];

  const select =
    document.getElementById(
      "error-area-filter"
    );

  if (!select) {
    return;
  }

  select.innerHTML =
    `<option value="">Todas as áreas</option>`
    + allErrorAreas
        .map(
          (area) => `
            <option value="${errorLibraryEscape(area)}">
              ${errorLibraryEscape(area)}
            </option>
          `
        )
        .join("");

  const menu =
    document.getElementById(
      "error-area-filter-menu"
    );

  const label =
    document.getElementById(
      "error-area-filter-label"
    );

  const toggle =
    document.getElementById(
      "error-area-filter-toggle"
    );

  if (menu) {
    menu.innerHTML = "";

    [
      {
        value: "",
        label: "Todas as áreas"
      },
      ...allErrorAreas.map(
        (area) => ({
          value: area,
          label: area
        })
      )
    ].forEach(
      (item) => {
        const option =
          document.createElement(
            "button"
          );

        option.type =
          "button";
        option.className =
          "error-area-filter-option";
        option.dataset.value =
          item.value;
        option.textContent =
          item.label;

        option.addEventListener(
          "click",
          (event) => {
            event.stopPropagation();

            select.value =
              item.value;

            if (label) {
              label.textContent =
                item.label;
            }

            menu.hidden =
              true;

            toggle?.setAttribute(
              "aria-expanded",
              "false"
            );

            loadErrorQueue();
          }
        );

        menu.appendChild(
          option
        );
      }
    );
  }

  if (
    errorAgendaDate
  ) {
    select.value =
      errorAgendaArea
      || "";

    select.disabled =
      true;

    if (label) {
      label.textContent =
        errorAgendaArea
        || "Todas as áreas";
    }

    if (toggle) {
      toggle.disabled =
        true;
    }
  } else {
    if (label) {
      label.textContent =
        select.options[
          select.selectedIndex
        ]?.textContent
        || "Todas as áreas";
    }

    if (toggle) {
      toggle.disabled =
        false;
    }
  }
}

/* =========================================================
   IMAGEM — VISUALIZAÇÃO
   ========================================================= */

const ERROR_IMAGE_SIGNED_URL_CACHE_MS =
  45 * 60 * 1000;

const errorImageSignedUrlCache =
  new Map();


async function signedErrorImage(
  path
) {
  if (
    !path
    || typeof path
      !== "string"
    || !path.trim()
  ) {
    return null;
  }

  const key =
    path.trim();

  const cached =
    errorImageSignedUrlCache.get(
      key
    );

  if (
    cached
    && cached.expiresAt
      > Date.now()
  ) {
    return cached.url;
  }

  const {
    data,
    error
  } =
    await window.LuriaStorage.createSignedUrl(
      "error_images",
      key,
      3600
    );

  if (
    error
    || !data?.signedUrl
  ) {
    return null;
  }

  errorImageSignedUrlCache.set(
    key,
    {
      url:
        data.signedUrl,
      expiresAt:
        Date.now()
        + ERROR_IMAGE_SIGNED_URL_CACHE_MS
    }
  );

  return data.signedUrl;
}


function prepareErrorImage(
  path
) {
  const image =
    document.getElementById(
      "error-question-image"
    );

  const button =
    document.getElementById(
      "error-question-image-load"
    );

  if (image) {
    image.hidden =
      true;

    image.style.display =
      "none";

    image.removeAttribute(
      "src"
    );

    image.onload =
      null;

    image.onerror =
      null;
  }

  if (!button) {
    return;
  }

  const hasImage =
    Boolean(
      path
      && typeof path
        === "string"
      && path.trim()
    );

  button.hidden =
    !hasImage;

  button.disabled =
    false;

  button.textContent =
    "Ver imagem";

  button.onclick =
    hasImage
      ? async () => {
          button.disabled =
            true;

          button.textContent =
            "Carregando...";

          const loaded =
            await showErrorImage(
              path
            );

          if (loaded) {
            button.hidden =
              true;
          } else {
            button.disabled =
              false;

            button.textContent =
              "Tentar novamente";
          }
        }
      : null;
}


async function showErrorImage(
  path
) {
  const image =
    document.getElementById(
      "error-question-image"
    );

  if (!image) {
    return false;
  }

  if (
    !path
    || typeof path
      !== "string"
    || !path.trim()
  ) {
    return false;
  }

  const url =
    await signedErrorImage(
      path
    );

  if (!url) {
    return false;
  }

  return new Promise(
    resolve => {
      image.hidden =
        true;

      image.style.display =
        "none";

      image.onload =
        () => {
          image.hidden =
            false;

          image.style.display =
            "block";

          resolve(
            true
          );
        };

      image.onerror =
        () => {
          image.hidden =
            true;

          image.style.display =
            "none";

          image.removeAttribute(
            "src"
          );

          resolve(
            false
          );
        };

      image.src =
        url;
    }
  );
}


/* =========================================================
   IMAGEM — COMPRESSÃO
   ========================================================= */

function readImageDataUrl(
  file
) {
  return new Promise(
    (
      resolve,
      reject
    ) => {
      const reader =
        new FileReader();


      reader.onload =
        () =>
          resolve(
            reader.result
          );


      reader.onerror =
        () =>
          reject(
            new Error(
              "Não foi possível ler a imagem."
            )
          );


      reader.readAsDataURL(
        file
      );
    }
  );
}


function loadImageElement(
  dataUrl
) {
  return new Promise(
    (
      resolve,
      reject
    ) => {
      const image =
        new Image();


      image.onload =
        () =>
          resolve(
            image
          );


      image.onerror =
        () =>
          reject(
            new Error(
              "Não foi possível abrir a imagem."
            )
          );


      image.src =
        dataUrl;
    }
  );
}



const LURIA_IMAGE_TARGET_BYTES =
  100 * 1024;

const LURIA_IMAGE_SOFT_MAX_BYTES =
  150 * 1024;

const LURIA_IMAGE_MAX_DIMENSION =
  1100;


async function compressLuriaImageBlob(
  sourceBlob
) {
  if (
    !sourceBlob
    || !sourceBlob.type
      ?.startsWith(
        "image/"
      )
  ) {
    return sourceBlob;
  }


  /*
    Se já estiver abaixo da meta, não recomprime.
    Evita perda de qualidade desnecessária.
  */
  if (
    sourceBlob.size
    <= LURIA_IMAGE_TARGET_BYTES
  ) {
    return sourceBlob;
  }


  try {
    const bitmap =
      await createImageBitmap(
        sourceBlob
      );


    const originalWidth =
      bitmap.width;

    const originalHeight =
      bitmap.height;


    const dimensionSteps =
      [
        1100,
        1000,
        900,
        820
      ];


    const qualitySteps =
      [
        0.82,
        0.76,
        0.70,
        0.64,
        0.58
      ];


    let bestReadable =
      null;

    let smallest =
      null;


    for (
      const maxDimension
      of dimensionSteps
    ) {
      const scale =
        Math.min(
          1,
          maxDimension
            / originalWidth,
          maxDimension
            / originalHeight
        );


      const width =
        Math.max(
          1,
          Math.round(
            originalWidth
            * scale
          )
        );


      const height =
        Math.max(
          1,
          Math.round(
            originalHeight
            * scale
          )
        );


      const canvas =
        document.createElement(
          "canvas"
        );


      canvas.width =
        width;

      canvas.height =
        height;


      const context =
        canvas.getContext(
          "2d",
          {
            alpha:
              false
          }
        );


      context.imageSmoothingEnabled =
        true;

      context.imageSmoothingQuality =
        "high";

      context.fillStyle =
        "#ffffff";

      context.fillRect(
        0,
        0,
        width,
        height
      );

      context.drawImage(
        bitmap,
        0,
        0,
        width,
        height
      );


      for (
        const quality
        of qualitySteps
      ) {
        const candidate =
          await new Promise(
            (
              resolve
            ) => {
              canvas.toBlob(
                resolve,
                "image/webp",
                quality
              );
            }
          );


        if (!candidate) {
          continue;
        }


        if (
          !smallest
          || candidate.size
            < smallest.size
        ) {
          smallest =
            candidate;
        }


        /*
          Preserva um candidato nítido de até 150 KB.
          Só usamos algo mais agressivo se não houver
          opção legível nessa faixa.
        */
        if (
          candidate.size
            <= LURIA_IMAGE_SOFT_MAX_BYTES
          && quality >= 0.64
          && maxDimension >= 900
        ) {
          if (
            !bestReadable
            || candidate.size
              < bestReadable.size
          ) {
            bestReadable =
              candidate;
          }
        }


        if (
          candidate.size
          <= LURIA_IMAGE_TARGET_BYTES
        ) {
          bitmap.close?.();

          return candidate;
        }
      }
    }


    bitmap.close?.();


    /*
      Se 100 KB exigir perda excessiva,
      aceita até 150 KB para manter texto/diagramas nítidos.
    */
    if (bestReadable) {
      return bestReadable;
    }


    return smallest
      || sourceBlob;


  } catch (error) {
    console.warn(
      "Não foi possível otimizar a imagem:",
      error
    );

    return sourceBlob;
  }
}


function canvasToWebp(
  canvas,
  quality
) {
  return new Promise(
    (
      resolve,
      reject
    ) => {
      canvas.toBlob(
        (blob) => {
          if (blob) {
            resolve(
              blob
            );
          } else {
            reject(
              new Error(
                "Falha na compressão."
              )
            );
          }
        },

        "image/webp",

        quality
      );
    }
  );
}


async function compressErrorImage(
  file
) {
  if (
    !file
    || !file.type
      ?.startsWith(
        "image/"
      )
  ) {
    return file;
  }


  const blob =
    await compressLuriaImageBlob(
      file
    );


  if (
    blob === file
  ) {
    return file;
  }


  return new File(
    [
      blob
    ],

    `${safeFileBase(
      file.name
    )}.webp`,

    {
      type:
        blob.type
        || "image/webp",

      lastModified:
        Date.now()
    }
  );
}


function formatErrorFileSize(
  bytes
) {
  const value =
    Number(
      bytes
      || 0
    );


  if (
    value < 1024
  ) {
    return `${value} B`;
  }


  if (
    value < 1024 * 1024
  ) {
    return `${(
      value
      / 1024
    ).toFixed(0)} KB`;
  }


  return `${(
    value
    / (
      1024
      * 1024
    )
  ).toFixed(1)} MB`;
}


function setNewErrorImageInfo(
  text,
  type = ""
) {
  const element =
    document.getElementById(
      "new-error-image-info"
    );


  if (!element) {
    return;
  }


  element.textContent =
    text;


  element.className =
    `error-image-info ${type}`
      .trim();
}


async function prepareNewErrorImage(
  file
) {
  preparedNewErrorImage =
    null;

  preparedNewErrorOriginalSize =
    null;


  const extractButton =
    document.getElementById(
      "extract-error-image-text"
    );

  const removeButton =
    document.getElementById(
      "remove-new-error-image"
    );


  if (!file) {
    setNewErrorImageInfo(
      ""
    );


    if (extractButton) {
      extractButton.disabled =
        true;
    }

    if (removeButton) {
      removeButton.disabled =
        true;
    }


    return;
  }


  if (
    !file.type
      ?.startsWith(
        "image/"
      )
  ) {
    setNewErrorImageInfo(
      "Selecione um arquivo de imagem.",
      "error"
    );


    if (extractButton) {
      extractButton.disabled =
        true;
    }

    if (removeButton) {
      removeButton.disabled =
        true;
    }


    return;
  }


  if (extractButton) {
    extractButton.disabled =
      false;
  }

  if (removeButton) {
    removeButton.disabled =
      false;
  }


  preparedNewErrorOriginalSize =
    file.size;


  setNewErrorImageInfo(
    "Preparando e comprimindo imagem..."
  );


  try {
    preparedNewErrorImage =
      await compressErrorImage(
        file
      );


    const finalFile =
      preparedNewErrorImage
      || file;


    if (
      finalFile === file
      || (
        finalFile.size
        >= file.size
      )
    ) {
      setNewErrorImageInfo(
        `Imagem já otimizada: ${formatErrorFileSize(
          file.size
        )}. O arquivo original será mantido.`,
        "success"
      );

      return;
    }


    const reduction =
      Math.max(
        0,
        (
          1
          - (
            finalFile.size
            / file.size
          )
        )
        * 100
      );


    setNewErrorImageInfo(
      `Comprimida: ${formatErrorFileSize(
        file.size
      )} → ${formatErrorFileSize(
        finalFile.size
      )} (${reduction.toFixed(0)}% menor).`,
      "success"
    );


  } catch (error) {
    console.warn(
      error
    );


    preparedNewErrorImage =
      file;


    setNewErrorImageInfo(
      "Não foi possível comprimir; o original será usado.",
      "error"
    );
  }
}


function normalizeOcrText(
  value
) {
  return String(
    value
    || ""
  )
    .replace(
      /\r/g,
      ""
    )
    .replace(
      /[ \t]+\n/g,
      "\n"
    )
    .replace(
      /\n{3,}/g,
      "\n\n"
    )
    .replace(
      /[ \t]{2,}/g,
      " "
    )
    .trim();
}


async function extractTextFromErrorImage(
  imageSource,
  onProgress
) {
  if (
    !window.Tesseract
  ) {
    throw new Error(
      "O extrator de texto não carregou. Atualize a página e tente novamente."
    );
  }


  const worker =
    await window
      .Tesseract
      .createWorker(
        "por",
        1,
        {
          logger:
            (message) => {
              if (
                typeof onProgress
                !== "function"
              ) {
                return;
              }


              if (
                message.status
                === "recognizing text"
              ) {
                onProgress(
                  Math.round(
                    Number(
                      message.progress
                      || 0
                    )
                    * 100
                  )
                );
              }
            }
        }
      );


  try {
    const {
      data
    } =
      await worker
        .recognize(
          imageSource
        );


    const text =
      normalizeOcrText(
        data?.text
        || ""
      );


    if (!text) {
      throw new Error(
        "Nenhum texto legível foi identificado na imagem."
      );
    }


    return text;

  } finally {
    await worker
      .terminate();
  }
}


function applyExtractedText(
  textarea,
  text
) {
  if (!textarea) {
    return false;
  }


  if (
    textarea.value
      .trim()
  ) {
    const replace =
      window.confirm(
        "O campo Questão já possui texto. Deseja substituir pelo texto extraído da imagem?"
      );


    if (!replace) {
      return false;
    }
  }


  textarea.value =
    text;


  textarea.focus();


  return true;
}


function clearNewErrorSelectedImage(message = "") {
  preparedNewErrorImage = null;
  preparedNewErrorOriginalSize = null;

  const input = document.getElementById("new-error-image");
  if (input) input.value = "";

  [
    "extract-error-image-text",
    "remove-new-error-image"
  ].forEach((id) => {
    const button = document.getElementById(id);
    if (button) button.disabled = true;
  });

  const keepCheckbox =
    document.getElementById(
      "keep-new-error-image"
    );

  if (keepCheckbox) {
    keepCheckbox.checked = false;
  }

  setNewErrorImageInfo(message);
}


async function extractNewErrorImageText() {
  const input = document.getElementById("new-error-image");
  const primaryButton = document.getElementById("extract-error-image-text");
  const keepCheckbox = document.getElementById("keep-new-error-image");
  const keepImage = Boolean(keepCheckbox?.checked);
  const file = input?.files?.[0] || null;

  if (!file) {
    setNewErrorImageInfo("Selecione uma imagem primeiro.", "error");
    return;
  }

  if (primaryButton) primaryButton.disabled = true;

  try {
    setNewErrorImageInfo("Extraindo texto: 0%...");

    const source = preparedNewErrorImage || file;
    const text = await extractTextFromErrorImage(source, (progress) => {
      setNewErrorImageInfo(`Extraindo texto: ${progress}%...`);
    });

    const applied = applyExtractedText(
      document.getElementById("new-error-question"),
      text
    );

    if (applied && !keepImage) {
      clearNewErrorSelectedImage(
        `Texto extraído. ${text.length} caracteres adicionados e a imagem foi removida.`
      );
      return;
    }

    setNewErrorImageInfo(
      applied
        ? `Texto extraído. ${text.length} caracteres adicionados. A imagem será mantida.`
        : "Extração concluída; o texto existente foi mantido.",
      "success"
    );
  } catch (error) {
    console.error(error);
    setNewErrorImageInfo(
      error.message || "Não foi possível extrair o texto.",
      "error"
    );
  } finally {
    if (input?.files?.[0]) {
      if (primaryButton) primaryButton.disabled = false;
    }
  }
}

async function downloadStoredErrorImage(
  path
) {
  if (!path) {
    throw new Error(
      "Este item não possui imagem salva."
    );
  }


  const {
    data,
    error
  } =
    await window.LuriaStorage.download("error_images", path);


  if (error) {
    throw error;
  }


  return data;
}


async function deleteStoredErrorImage(item, options = {}) {
  if (!item?.question_image_path) return false;

  const questionText =
    document.getElementById("error-edit-question")?.value.trim()
    || item.question_text
    || "";

  if (!questionText) {
    throw new Error("Para excluir a imagem, mantenha algum texto no campo Questão.");
  }

  const oldPath = item.question_image_path;

  const { error: updateError } = await errorSb
    .from("error_notebook")
    .update({
      question_text: questionText,
      question_image_path: null
    })
    .eq("id", item.id);

  if (updateError) throw updateError;

  const { error: storageError } = await window.LuriaStorage.remove("error_images",[oldPath]);

  if (storageError) {
    console.warn(
      "A referência da imagem foi removida, mas o arquivo não pôde ser apagado do Storage:",
      storageError.message
    );
  }

  item.question_image_path = null;
  item.question_text = questionText;

  const tools = document.getElementById("error-edit-image-tools");
  if (tools) tools.hidden = true;

  if (!options.skipReload) {
    await Promise.all([loadErrorLibrary(), loadErrorQueue()]);
  }

  return true;
}


async function extractStoredErrorImageText(keepImage = false) {
  if (!editingErrorId) return;

  const item =
    errorLibraryItems.find((entry) => entry.id === editingErrorId)
    || errorQueue.find((entry) => entry.id === editingErrorId);

  if (!item?.question_image_path) return;

  const buttons = [
    document.getElementById("error-edit-extract-image"),
    document.getElementById("error-edit-extract-image-keep"),
    document.getElementById("error-edit-delete-image")
  ].filter(Boolean);

  const status = document.getElementById("error-edit-ocr-status");
  buttons.forEach((button) => { button.disabled = true; });

  try {
    status.textContent = "Baixando imagem...";
    status.className = "error-status";

    const blob = await downloadStoredErrorImage(item.question_image_path);
    const text = await extractTextFromErrorImage(blob, (progress) => {
      status.textContent = `Extraindo texto: ${progress}%...`;
    });

    const applied = applyExtractedText(
      document.getElementById("error-edit-question"),
      text
    );

    if (applied && !keepImage) {
      status.textContent = "Texto extraído. Removendo imagem...";
      await deleteStoredErrorImage(item, { skipReload: true });
      status.textContent = "Texto extraído e imagem removida do Caderno.";
    } else {
      status.textContent = applied
        ? "Texto extraído. A imagem foi mantida."
        : "Texto extraído; conteúdo existente mantido.";
    }

    status.className = "error-status success";
  } catch (error) {
    console.error(error);
    status.textContent = error.message || "Não foi possível extrair o texto.";
    status.className = "error-status error";
  } finally {
    buttons.forEach((button) => { button.disabled = false; });
  }
}


async function deleteEditingErrorImage() {
  if (!editingErrorId) return;

  const item =
    errorLibraryItems.find((entry) => entry.id === editingErrorId)
    || errorQueue.find((entry) => entry.id === editingErrorId);

  if (!item?.question_image_path) return;

  const confirmed = await window.LuriaDialog.confirm(
    "Excluir a imagem deste item? O arquivo será apagado do Storage."
  );
  if (!confirmed) return;

  const status = document.getElementById("error-edit-ocr-status");

  try {
    status.textContent = "Excluindo imagem...";
    await deleteStoredErrorImage(item);
    status.textContent = "Imagem excluída.";
    status.className = "error-status success";
  } catch (error) {
    console.error(error);
    status.textContent = error.message || "Não foi possível excluir a imagem.";
    status.className = "error-status error";
  }
}

async function uploadErrorImage(
  file,
  preparedFile = null
) {
  if (!file) {
    return null;
  }


  const finalFile =
    preparedFile
    || await compressErrorImage(
      file
    );


  const extension =
    finalFile.name
      ?.includes(".")
      ? finalFile
          .name
          .split(".")
          .pop()
          .toLowerCase()
      : "bin";


  const path =
    `${errorUser.id}/errors/${crypto.randomUUID()}-${safeFileBase(
      finalFile.name
      || file.name
    )}.${extension}`;


  const { error, reference } = await window.LuriaStorage.upload("error_images",
        path,
        finalFile,
        {
          cacheControl:
            "3600",

          upsert:
            false,

          contentType:
            finalFile.type
            || file.type
            || undefined
        }
      );


  if (error) {
    throw error;
  }

  return reference || path;
}


/* =========================================================
   ADICIONAR NOVO ERRO
   ========================================================= */

function toggleNewErrorForm(
  forceOpen = null
) {
  const form =
    document.getElementById(
      "error-create-form"
    );


  const button =
    document.getElementById(
      "toggle-error-form"
    );


  if (!form) {
    return;
  }


  const open =
    forceOpen === null
      ? form.hidden
      : Boolean(
          forceOpen
        );


  form.hidden =
    !open;


  if (button) {
    button.textContent =
      open
        ? "Fechar"
        : "Adicionar";
  }
}


function clearNewErrorForm() {
  [
    "new-error-area",
    "new-error-materia",
    "new-error-theme",
    "new-error-ccq",
    "new-error-question",
    "new-error-answer",
    "new-error-thought"
  ].forEach(
    (id) => {
      const element =
        document.getElementById(
          id
        );


      if (element) {
        element.value =
          "";
      }
    }
  );


  const image =
    document.getElementById(
      "new-error-image"
    );


  if (image) {
    image.value =
      "";
  }


  preparedNewErrorImage =
    null;

  preparedNewErrorOriginalSize =
    null;


  const extractButton =
    document.getElementById(
      "extract-error-image-text"
    );


  if (extractButton) {
    extractButton.disabled =
      true;
  }

  const keepImage =
    document.getElementById(
      "keep-new-error-image"
    );

  if (keepImage) {
    keepImage.checked =
      false;
  }


  const areaLabel=document.getElementById("new-error-area-label");
  if(areaLabel) areaLabel.textContent="Selecione a área";
  updateNewErrorSubjectOptions();

  setNewErrorImageInfo(
    ""
  );


  setNewErrorStatus(
    ""
  );
}


async function createErrorEntryFallback({
  area,
  materia,
  theme,
  ccq,
  question,
  answer,
  thought,
  imagePath
}) {
  const {
    data:
      settings,
    error:
      settingsError
  } =
    await errorSb
      .from(
        "user_settings"
      )
      .select(
        "error_review_interval_days,error_weekdays"
      )
      .eq(
        "user_id",
        errorUser.id
      )
      .maybeSingle();

  if (
    settingsError
  ) {
    console.warn(
      "Não foi possível carregar a configuração de revisão do Caderno de Erros:",
      settingsError.message
    );
  }

  const interval =
    Math.max(
      1,
      Number(
        settings
          ?.error_review_interval_days
        || 21
      )
    );

  const weekdays =
    Array.isArray(
      settings?.error_weekdays
    )
      ? settings.error_weekdays
          .map(Number)
          .filter(
            value =>
              value >= 1
              && value <= 7
          )
      : [
          1,2,3,4,5,6,7
        ];

  const start =
    new Date();

  start.setHours(
    12,0,0,0
  );

  start.setDate(
    start.getDate()
    + interval
  );

  let due =
    new Date(
      start
    );

  for (
    let i = 0;
    i < 14;
    i += 1
  ) {
    const jsDay =
      due.getDay();

    const isoDay =
      jsDay === 0
        ? 7
        : jsDay;

    if (
      !weekdays.length
      || weekdays.includes(
        isoDay
      )
    ) {
      break;
    }

    due.setDate(
      due.getDate()
      + 1
    );
  }

  const dueDate =
    [
      due.getFullYear(),
      String(
        due.getMonth() + 1
      ).padStart(
        2,
        "0"
      ),
      String(
        due.getDate()
      ).padStart(
        2,
        "0"
      )
    ].join("-");

  const actualInterval =
    Math.max(
      1,
      Math.round(
        (
          due
          - new Date(
              new Date()
                .setHours(
                  12,0,0,0
                )
            )
        )
        / 86400000
      )
    );

  const {
    data,
    error
  } =
    await errorSb
      .from(
        "error_notebook"
      )
      .insert({
        user_id:
          errorUser.id,
        area:
          area
          || null,
        materia:
          materia
          || null,
        theme:
          theme
          || null,
        ccq,
        question_text:
          question
          || null,
        question_image_path:
          imagePath
          || null,
        correct_answer:
          answer
          || null,
        what_i_thought:
          thought
          || null,
        due_date:
          dueDate,
        current_interval_days:
          actualInterval,
        stability_days:
          actualInterval,
        active:
          true
      })
      .select(
        "id"
      )
      .single();

  if (
    error
  ) {
    throw error;
  }

  return data;
}


async function saveNewError() {
  const button =
    document.getElementById(
      "save-new-error"
    );


  const area =
    document
      .getElementById(
        "new-error-area"
      )
      .value
      .trim();


  const materia =
    document
      .getElementById(
        "new-error-materia"
      )
      .value
      .trim();


  const theme =
    document
      .getElementById(
        "new-error-theme"
      )
      .value
      .trim();


  const ccq =
    document
      .getElementById(
        "new-error-ccq"
      )
      .value
      .trim();


  const question =
    document
      .getElementById(
        "new-error-question"
      )
      .value
      .trim();


  const answer =
    document
      .getElementById(
        "new-error-answer"
      )
      .value
      .trim();


  const thought =
    document
      .getElementById(
        "new-error-thought"
      )
      .value
      .trim();


  const keepImage =
    Boolean(
      document
        .getElementById(
          "keep-new-error-image"
        )
        ?.checked
    );

  const imageFile =
    keepImage
      ? (
          document
            .getElementById(
              "new-error-image"
            )
            .files[0]
          || null
        )
      : null;


  if (!area) {
    setNewErrorStatus(
      "Selecione uma área.",
      "error"
    );

    document
      .getElementById(
        "new-error-area"
      )
      ?.focus();

    return;
  }


  if (!ccq) {
    setNewErrorStatus(
      "Preencha o Pulo do Gato.",
      "error"
    );

    return;
  }


  button.disabled =
    true;


  setNewErrorStatus(
    imageFile
      ? "Comprimindo imagem e salvando..."
      : "Salvando..."
  );


  let imagePath =
    null;


  try {
    imagePath =
      await uploadErrorImage(
        imageFile,
        preparedNewErrorImage
      );


    const rpcResult =
      await errorSb.rpc(
        "create_error_entry",
        {
          p_area:
            area
            || null,

          p_materia:
            materia
            || null,

          p_theme:
            theme
            || null,

          p_ccq:
            ccq,

          p_question_text:
            question
            || null,

          p_correct_answer:
            answer
            || null,

          p_what_i_thought:
            thought
            || null,

          p_question_image_path:
            imagePath
        }
      );


    if (
      rpcResult.error
    ) {
      console.warn(
        "RPC create_error_entry falhou; usando gravação direta segura:",
        rpcResult.error.message
      );

      await createErrorEntryFallback({
        area,
        materia,
        theme,
        ccq,
        question,
        answer,
        thought,
        imagePath
      });
    }


    clearNewErrorForm();


    setNewErrorStatus(
      "Erro adicionado ao Caderno.",
      "success"
    );


    await Promise.all([
      loadErrorMetrics(),
      loadErrorAreas(),
      loadErrorLibrary(),
      loadErrorQueue()
    ]);


  } catch (error) {
    console.error(
      error
    );


    if (imagePath) {
      await window.LuriaStorage.remove("error_images",[
          imagePath
        ]);
    }


    setNewErrorStatus(
      `Não foi possível salvar: ${error.message}`,
      "error"
    );


  } finally {
    button.disabled =
      false;
  }
}


const ERROR_AREAS = ["Clínica Médica","Pediatria","Ginecologia e Obstetrícia","Cirurgia Geral","Preventiva"];

const ERROR_SUBJECTS_BY_AREA = {
  "Clínica Médica":["Cardiologia","Pneumologia","Gastroenterologia","Hepatologia","Nefrologia","Endocrinologia e Metabologia","Hematologia e Hemoterapia","Reumatologia","Infectologia","Neurologia","Dermatologia","Geriatria","Psiquiatria","Oncologia Clínica","Alergia e Imunologia","Medicina Intensiva","Urgência e Emergência","Toxicologia","Distúrbios hidroeletrolíticos e ácido-base","Nutrologia","Cuidados Paliativos"],
  "Pediatria":["Neonatologia","Puericultura","Crescimento e Desenvolvimento","Aleitamento Materno","Nutrição Infantil","Imunizações","Infectologia Pediátrica","Pneumologia Pediátrica","Cardiologia Pediátrica","Gastroenterologia Pediátrica","Nefrologia Pediátrica","Endocrinologia Pediátrica","Neurologia Pediátrica","Hematologia Pediátrica","Oncologia Pediátrica","Emergências Pediátricas","Cirurgia Pediátrica","Diarreia e Desidratação","Desenvolvimento Neuropsicomotor"],
  "Ginecologia e Obstetrícia":["Pré-natal de baixo risco","Pré-natal de alto risco","Medicina Fetal","Trabalho de Parto","Assistência ao Parto","Puerpério","Hemorragias da Gestação","Hemorragia Pós-parto","Síndromes Hipertensivas da Gestação","Diabetes na Gestação","Prematuridade","Rotura Prematura de Membranas","Infecções na Gestação","Contracepção","Planejamento Reprodutivo","Infertilidade e Reprodução Humana","Endocrinologia Ginecológica","Sangramento Uterino Anormal","Climatério e Menopausa","Dor Pélvica e Endometriose","Infecções Ginecológicas e IST","Uroginecologia","Oncologia Ginecológica","Patologia Mamária e Mastologia","Cirurgia Ginecológica"],
  "Cirurgia Geral":["Princípios de Cirurgia","Pré-operatório e Risco Cirúrgico","Pós-operatório e Complicações","Choque e Reposição Volêmica","Nutrição em Cirurgia","Infecção e Antibioticoprofilaxia","Trauma","ATLS e Atendimento Inicial ao Politraumatizado","Trauma Cranioencefálico","Trauma Torácico","Trauma Abdominal","Trauma Pélvico","Queimaduras","Abdome Agudo","Abdome Agudo Inflamatório","Abdome Agudo Obstrutivo","Abdome Agudo Perfurativo","Abdome Agudo Hemorrágico","Abdome Agudo Vascular","Apendicite","Obstrução Intestinal","Perfuração de Víscera Oca","Hemorragia Digestiva","Doença do Refluxo e Esôfago","Cirurgia Gástrica","Cirurgia Bariátrica e Metabólica","Coloproctologia","Doença Diverticular","Doenças Anorretais","Fígado","Vias Biliares","Pâncreas","Baço","Hérnias e Parede Abdominal","Cirurgia Vascular","Cirurgia Torácica","Cirurgia de Cabeça e Pescoço","Urologia","Cirurgia Oncológica","Cirurgia Pediátrica","Cirurgia Plástica","Anestesiologia","Ortopedia e Traumatologia","Acessos, Drenos e Procedimentos","Transplantes"],
  "Preventiva":["Epidemiologia","Bioestatística","Medicina Baseada em Evidências","SUS: Princípios e Diretrizes","Legislação do SUS","Leis 8.080 e 8.142","Atenção Primária à Saúde","Estratégia Saúde da Família","Medicina de Família e Comunidade","Promoção da Saúde","Prevenção e Rastreamento","Vigilância Epidemiológica","Vigilância Sanitária","Vigilância em Saúde Ambiental","Vigilância em Saúde do Trabalhador","Imunizações e Calendário Vacinal","Doenças de Notificação Compulsória","Indicadores de Saúde","Planejamento e Gestão em Saúde","Financiamento do SUS","Redes de Atenção à Saúde","Regulação em Saúde","Saúde Coletiva","Ética Médica","Bioética","Segurança do Paciente","Epidemiologia Clínica","Testes Diagnósticos","Estudos Observacionais","Ensaios Clínicos","Revisões Sistemáticas e Metanálises"]
};

function updateNewErrorSubjectOptions() {
  const area=document.getElementById("new-error-area");
  const input=document.getElementById("new-error-materia");
  const toggle=document.getElementById("new-error-materia-toggle");
  const label=document.getElementById("new-error-materia-label");
  const menu=document.getElementById("new-error-materia-menu");
  if(!area||!input||!toggle||!label||!menu)return;
  menu.innerHTML="";
  const subjects=ERROR_SUBJECTS_BY_AREA[area.value]||[];
  input.value="";
  label.textContent=subjects.length?"Selecione a matéria":"Selecione primeiro a área";
  toggle.disabled=!subjects.length;
  menu.hidden=true;
  toggle.setAttribute("aria-expanded","false");
  [...subjects,"Outra matéria"].forEach(subject=>{
    const option=document.createElement("button");
    option.type="button"; option.className="flash-subject-option"; option.textContent=subject;
    option.addEventListener("click",event=>{event.stopPropagation();input.value=subject;label.textContent=subject;menu.hidden=true;toggle.setAttribute("aria-expanded","false");});
    menu.appendChild(option);
  });
}

function wireNewErrorAreaPicker() {
  const input=document.getElementById("new-error-area"),toggle=document.getElementById("new-error-area-toggle"),label=document.getElementById("new-error-area-label"),menu=document.getElementById("new-error-area-menu");
  const subjectToggle=document.getElementById("new-error-materia-toggle"),subjectMenu=document.getElementById("new-error-materia-menu");
  if(!input||!toggle||!label||!menu)return;
  menu.innerHTML="";
  ERROR_AREAS.forEach(area=>{
    const option=document.createElement("button"); option.type="button"; option.className="flash-area-option"; option.textContent=area;
    option.addEventListener("click",event=>{event.stopPropagation();input.value=area;label.textContent=area;menu.hidden=true;toggle.setAttribute("aria-expanded","false");updateNewErrorSubjectOptions();});
    menu.appendChild(option);
  });
  toggle.addEventListener("click",event=>{event.stopPropagation();const open=menu.hidden;menu.hidden=!open;toggle.setAttribute("aria-expanded",open?"true":"false");});
  subjectToggle?.addEventListener("click",event=>{event.stopPropagation();if(subjectToggle.disabled||!subjectMenu)return;const open=subjectMenu.hidden;subjectMenu.hidden=!open;subjectToggle.setAttribute("aria-expanded",open?"true":"false");});
  document.addEventListener("click",event=>{
    if(!event.target.closest(".flash-area-picker")){menu.hidden=true;toggle.setAttribute("aria-expanded","false");}
    if(subjectMenu&&!event.target.closest(".flash-subject-picker")){subjectMenu.hidden=true;subjectToggle?.setAttribute("aria-expanded","false");}
  });
  updateNewErrorSubjectOptions();
}

function wireNewError() {
  wireNewErrorAreaPicker();

  document
    .getElementById(
      "toggle-error-form"
    )
    ?.addEventListener(
      "click",
      () =>
        toggleNewErrorForm()
    );


  document
    .getElementById(
      "cancel-new-error"
    )
    ?.addEventListener(
      "click",
      () => {
        clearNewErrorForm();

        toggleNewErrorForm(
          false
        );
      }
    );


  document
    .getElementById(
      "new-error-image"
    )
    ?.addEventListener(
      "change",
      (event) =>
        prepareNewErrorImage(
          event.target
            .files?.[0]
          || null
        )
    );


  document
    .getElementById(
      "extract-error-image-text"
    )
    ?.addEventListener(
      "click",
      extractNewErrorImageText
    );

  document
    .getElementById(
      "remove-new-error-image"
    )
    ?.addEventListener(
      "click",
      () => clearNewErrorSelectedImage("Imagem removida.")
    );


  document
    .getElementById(
      "save-new-error"
    )
    ?.addEventListener(
      "click",
      saveNewError
    );
}


/* =========================================================
   REVISÃO
   ========================================================= */

function renderErrorMeta(
  item
) {
  const pieces =
    [
      item.area,
      item.materia,
      item.theme
    ]
      .filter(
        Boolean
      );


  const element =
    document.getElementById(
      "error-meta"
    );


  if (element) {
    element.textContent =
      pieces.length
        ? pieces.join(
            " · "
          )
        : "Sem área definida";
  }
}


async function renderReviewSidebars(){
  const upcoming=document.getElementById("error-review-queue-list"), count=document.getElementById("error-review-queue-count");
  const rest=errorQueue.slice(errorIndex+1,errorIndex+6); if(count)count.textContent=String(Math.max(0,errorQueue.length-errorIndex-1));
  if(upcoming)upcoming.innerHTML=rest.length?rest.map((x,i)=>`<button type="button" data-review-jump="${errorIndex+i+1}"><span>${i+1}</span><div><strong>${errorLibraryEscape(x.materia||x.theme||x.area||"Erro")}</strong><small>${errorLibraryEscape(x.area||"Sem área")}</small></div><b>›</b></button>`).join(""):`<div class="error-review-queue-empty">Último item da revisão.</div>`;
  upcoming?.querySelectorAll("[data-review-jump]").forEach(b=>b.addEventListener("click",()=>{errorIndex=Number(b.dataset.reviewJump);renderCurrentError()}));
  const metrics=document.getElementById("error-review-session-metrics"); if(metrics){const done=errorIndex,total=errorQueue.length,pct=total?Math.round(done/total*100):0;const areas={};errorQueue.forEach(x=>{const a=x.area||"Sem área";areas[a]=(areas[a]||0)+1});metrics.innerHTML=`<div class="review-metric-ring" style="--p:${pct}"><div><strong>${done}<small> de ${total}</small></strong><span>revisados</span></div></div><div class="review-metric-pair"><div><span>✓</span><strong>${done}</strong><small>Concluídos</small></div><div><span>↻</span><strong>${Math.max(0,total-done)}</strong><small>Pendentes</small></div></div><h3>Erros por área nesta revisão</h3><div class="review-area-bars">${Object.entries(areas).map(([a,n])=>`<div><span>${errorLibraryEscape(a)}</span><i><b style="width:${Math.round(n/Math.max(1,total)*100)}%"></b></i><strong>${n}</strong></div>`).join("")}</div>`}
}
function renderCurrentError() {
  const empty=document.getElementById("error-empty"),stage=document.getElementById("error-stage");
  if(errorIndex>=errorQueue.length){stage.hidden=true;empty.hidden=false;document.getElementById("error-position").textContent=`${errorQueue.length} / ${errorQueue.length}`;document.getElementById("error-progress-copy").textContent="revisão concluída";renderReviewSidebars();return}
  empty.hidden=true;stage.hidden=false;const item=errorQueue[errorIndex],remaining=errorQueue.length-errorIndex;
  document.getElementById("error-position").textContent=`${errorIndex+1} de ${errorQueue.length}`;document.getElementById("error-progress-copy").textContent=`${remaining} restante${remaining===1?"":"s"}`;
  stage.innerHTML=`<div class="review-focus-meta"><span>${errorLibraryEscape(item.area||"Sem área")}</span><span>${errorLibraryEscape(item.materia||item.theme||"Revisão")}</span></div><section class="review-flashcard"><div class="review-cat-badge" role="img" aria-label="Pulo do Gato"><span class="review-cat-brand"><img class="review-cat-light" src="/assets/img/pulo%20do%20gato/luria_gato_tema_claro.webp?v=20260924e" alt=""><img class="review-cat-dark" src="/assets/img/pulo%20do%20gato/luria_gato_tema_escuro.webp?v=20260924e" alt=""><img class="review-cat-pink" src="/assets/img/pulo%20do%20gato/luria_gato_tema_rosa.webp?v=20260924e" alt=""></span><span>Pulo do Gato</span></div><div id="error-ccq" class="review-ccq">${errorLibraryEscape(item.ccq||"Sem Pulo do Gato")}</div></section><section id="error-details" class="review-details" hidden><h3>Questão original</h3><p id="error-question">${errorLibraryEscape(item.question_text||"Questão não informada.")}</p><div class="review-answer"><strong>Resposta correta</strong><p id="error-correct-answer">${errorLibraryEscape(item.correct_answer||"—")}</p></div>${item.what_i_thought?`<div id="error-thought-block"><strong>O que eu pensei</strong><p id="error-thought">${errorLibraryEscape(item.what_i_thought)}</p></div>`:""}</section><div class="review-focus-actions"><button id="mark-error-read" class="button primary" type="button">✓ Entendi</button><button id="open-error" class="button secondary" type="button">Ver questão</button></div><span id="error-status" class="error-status" aria-live="polite"></span>`;
  document.getElementById("open-error")?.addEventListener("click",toggleErrorDetails);document.getElementById("mark-error-read")?.addEventListener("click",markCurrentErrorRead);renderReviewSidebars();
}

async function loadErrorQueue() {
  const selectColumns =
    "id,area,materia,theme,ccq,question_text,question_image_path,correct_answer,what_i_thought,due_date,current_interval_days,stability_days,review_count,last_reviewed_at,created_at";


  let data =
    [];

  let error =
    null;


  /*
    Pela Agenda:
    1. busca todos os Pulos do Gato da data;
    2. filtra a área no JavaScript de forma normalizada.
       Isso evita o caso "Sem área" / null / espaços / acentos
       fazer a fila ficar vazia mesmo com Pulos do Gato na data.
  */
  if (
    errorAgendaDate
  ) {
    const exactResult =
      await errorSb
        .from(
          "error_notebook"
        )
        .select(
          selectColumns
        )
        .eq(
          "active",
          true
        )
        .eq(
          "due_date",
          errorAgendaDate
        )
        .order(
          "due_date",
          {
            ascending:
              true
          }
        )
        .order(
          "created_at",
          {
            ascending:
              true
          }
        )
        .limit(
          250
        );


    error =
      exactResult.error;


    if (
      !error
    ) {
      data =
        (
          exactResult.data
          || []
        )
          .filter(
            item =>
              sameErrorAgendaArea(
                item.area,
                errorAgendaArea
              )
          );
    }


    /*
      Recuperação para atividades movidas para HOJE em versões
      anteriores, quando a agenda podia mudar visualmente sem
      atualizar corretamente due_date.

      Se a fila exata estiver vazia, mostramos os Pulos do Gato vencidos
      da mesma área. Isso evita abrir a Ambientação em branco.
    */
    if (
      !error
      &&
      !data.length
      &&
      errorAgendaDate
      === errorTodayISO()
    ) {
      const fallbackResult =
        await errorSb
          .from(
            "error_notebook"
          )
          .select(
            selectColumns
          )
          .eq(
            "active",
            true
          )
          .lte(
            "due_date",
            errorAgendaDate
          )
          .order(
            "due_date",
            {
              ascending:
                true
            }
          )
          .order(
            "created_at",
            {
              ascending:
                true
            }
          )
          .limit(
            250
          );


      if (
        fallbackResult.error
      ) {
        error =
          fallbackResult.error;

      } else {
        data =
          (
            fallbackResult.data
            || []
          )
            .filter(
              item =>
                sameErrorAgendaArea(
                  item.area,
                  errorAgendaArea
                )
            );
      }
    }


  } else {
    let query =
      errorSb
        .from(
          "error_notebook"
        )
        .select(
          selectColumns
        )
        .eq(
          "active",
          true
        )
        .lte(
          "due_date",
          errorTodayISO()
        );


    const area =
      currentAreaFilter();


    if (
      area
    ) {
      query =
        query.eq(
          "area",
          area
        );
    }


    const result =
      await query
        .order(
          "due_date",
          {
            ascending:
              true
          }
        )
        .order(
          "created_at",
          {
            ascending:
              true
          }
        )
        .limit(
          250
        );


    data =
      result.data
      || [];

    error =
      result.error;
  }


  if (
    error
  ) {
    console.error(
      error
    );


    setErrorStatus(
      `Não foi possível carregar o Caderno de Erros: ${error.message}`,
      "error"
    );


    return;
  }


  errorQueue =
    data
    || [];


  errorIndex =
    0;


  const selectedArea =
    currentAreaFilter();


  const emptyCopy =
    document.getElementById(
      "error-empty-copy"
    );


  if (
    emptyCopy
  ) {
    emptyCopy.textContent =
      selectedArea
        ? `Não há revisões pendentes em ${selectedArea}.`
        : "Não há itens programados para esta seleção.";
  }


  if (
    errorAgendaDate
  ) {
    const title =
      document.getElementById(
        "error-review-title"
      );


    const copy =
      document.getElementById(
        "error-review-copy"
      );


    if (
      title
    ) {
      title.textContent =
        "Erros agendados";
    }


    if (
      copy
    ) {
      copy.textContent =
        `Revisão de ${formatErrorDate(
          errorAgendaDate
        )}${
          errorAgendaArea
            ? ` · ${errorAgendaArea}`
            : ""
        }.`;
    }
  }


  await renderCurrentError();
}


function toggleErrorDetails() {
  const details =
    document.getElementById(
      "error-details"
    );


  const button =
    document.getElementById(
      "open-error"
    );


  if (
    !details
    || !button
  ) {
    return;
  }


  const shouldOpen =
    details.hidden;


  details.hidden =
    !shouldOpen;


  button.textContent =
    shouldOpen
      ? "Fechar"
      : "Abrir";
}


async function markCurrentErrorRead() {
  const item =
    errorQueue[
      errorIndex
    ];


  if (!item) {
    return;
  }


  const button =
    document.getElementById(
      "mark-error-read"
    );


  button.disabled =
    true;


  document
    .getElementById(
      "open-error"
    )
    .disabled =
      true;


  setErrorStatus(
    "Agendando próxima revisão..."
  );


  const {
    data,
    error
  } =
    await errorSb.rpc(
      "review_error_entry",
      {
        p_error_id:
          item.id
      }
    );


  button.disabled =
    false;


  document
    .getElementById(
      "open-error"
    )
    .disabled =
      false;


  if (error) {
    console.error(
      error
    );


    setErrorStatus(
      `Não foi possível salvar: ${error.message}`,
      "error"
    );


    return;
  }


  const reviewed =
    Array.isArray(
      data
    )
      ? data[0]
      : data;


  setErrorStatus(
    reviewed?.due_date
      ? `Lido. Próxima revisão em ${formatErrorDate(
          reviewed.due_date
        )}.`
      : "Lido. Próxima revisão agendada.",
    "success"
  );


  /*
    O item atual já foi movido
    para a próxima revisão.
    Agora entra o próximo.
  */

  errorIndex +=
    1;


  await Promise.all([
    loadErrorMetrics(),
    loadErrorLibrary(),
    renderCurrentError()
  ]);
}


function wireErrorReview() {
  document
    .getElementById(
      "open-error"
    )
    ?.addEventListener(
      "click",
      toggleErrorDetails
    );


  document
    .getElementById(
      "mark-error-read"
    )
    ?.addEventListener(
      "click",
      markCurrentErrorRead
    );


  document
    .getElementById(
      "error-area-filter"
    )
    ?.addEventListener(
      "change",
      loadErrorQueue
    );

  const toggle =
    document.getElementById(
      "error-area-filter-toggle"
    );

  const menu =
    document.getElementById(
      "error-area-filter-menu"
    );

  toggle?.addEventListener(
    "click",
    (event) => {
      event.stopPropagation();

      if (
        toggle.disabled
        || !menu
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
  );

  document.addEventListener(
    "click",
    (event) => {
      if (
        !event.target.closest(
          ".error-area-picker"
        )
      ) {
        if (menu) {
          menu.hidden =
            true;
        }

        toggle?.setAttribute(
          "aria-expanded",
          "false"
        );
      }
    }
  );
}



/* =========================================================
   BIBLIOTECA
   ========================================================= */

function errorLibraryEscape(
  value
) {
  return String(
    value ?? ""
  )
    .replaceAll(
      "&",
      "&amp;"
    )
    .replaceAll(
      "<",
      "&lt;"
    )
    .replaceAll(
      ">",
      "&gt;"
    )
    .replaceAll(
      '"',
      "&quot;"
    )
    .replaceAll(
      "'",
      "&#039;"
    );
}


function syncErrorLibraryAreaPicker() {
  const select=document.getElementById("error-library-area");
  const label=document.getElementById("error-library-area-label");
  const menu=document.getElementById("error-library-area-menu");
  if(!select)return;
  const current=select.value||"";
  const currentText=select.options[select.selectedIndex]?.textContent?.trim()||"Todas as áreas";
  if(label)label.textContent=currentText;
  if(menu){
    menu.innerHTML=[...select.options].map(option=>`<button type="button" class="error-library-area-option" role="option" data-error-library-area-value="${errorLibraryEscape(option.value)}" aria-selected="${String(option.value===current)}">${errorLibraryEscape(option.textContent.trim())}</button>`).join("");
  }
}

function populateLibraryAreas() {
  const select =
    document.getElementById(
      "error-library-area"
    );

  if (!select) {
    return;
  }

  const current =
    select.value;

  const mode =
    window.luriaStudyMode
    || "medicine";

  const areas =
    window.LuriaStudyMode
      ?.generalAreasFor(
        mode
      )
    || [];

  select.innerHTML =
    `<option value="">Todas as áreas</option>`
    + areas
        .map(
          (area) => `
            <option value="${errorLibraryEscape(area)}">
              ${errorLibraryEscape(area)}
            </option>
          `
        )
        .join("");

  if (
    current
    && areas.includes(
      current
    )
  ) {
    select.value =
      current;
  }
  syncErrorLibraryAreaPicker();
}


function filteredErrorLibrary() {
  const area =
    document
      .getElementById(
        "error-library-area"
      )
      ?.value
    || "";


  const search =
    document
      .getElementById(
        "error-library-search"
      )
      ?.value
      .trim()
      .toLowerCase()
    || "";


  return errorLibraryItems
    .filter(
      (item) => {
        const itemArea =
          item.area
          || "Sem área";


        if (
          area
          && itemArea
            !== area
        ) {
          return false;
        }


        if (!search) {
          return true;
        }


        return [
          item.area,
          item.materia,
          item.theme,
          item.ccq,
          item.question_text,
          item.correct_answer,
          item.what_i_thought
        ]
          .filter(
            Boolean
          )
          .join(" ")
          .toLowerCase()
          .includes(
            search
          );
      }
    );
}



function setErrorLibraryStatus(
  text,
  type = ""
) {
  const element =
    document.getElementById(
      "error-library-status"
    );


  if (!element) {
    return;
  }


  element.textContent =
    text;


  element.className =
    `error-status ${type}`
      .trim();
}


function closeErrorLibraryMenus(
  exceptId = null
) {
  document
    .querySelectorAll(
      "[data-error-library-menu]"
    )
    .forEach(
      (menu) => {
        const id =
          menu.dataset
            .errorLibraryMenu;


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
      "[data-error-library-menu-trigger]"
    )
    .forEach(
      (button) => {
        const id =
          button.dataset
            .errorLibraryMenuTrigger;


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


function openErrorEditDialog(
  itemId
) {
  const item =
    errorLibraryItems
      .find(
        (entry) =>
          entry.id === itemId
      )
    || errorQueue.find(
      (entry) =>
        entry.id === itemId
    );


  if (!item) {
    return;
  }


  editingErrorId =
    item.id;


  const values = {
    "error-edit-area":
      item.area
      || "",

    "error-edit-materia":
      item.materia
      || "",

    "error-edit-theme":
      item.theme
      || "",

    "error-edit-ccq":
      item.ccq
      || "",

    "error-edit-question":
      item.question_text
      || "",

    "error-edit-answer":
      item.correct_answer
      || "",

    "error-edit-thought":
      item.what_i_thought
      || ""
  };


  Object
    .entries(
      values
    )
    .forEach(
      (
        [
          id,
          value
        ]
      ) => {
        const element =
          document.getElementById(
            id
          );


        if (element) {
          element.value =
            value;
        }
      }
    );


  const imageTools =
    document.getElementById(
      "error-edit-image-tools"
    );


  const imageOcrStatus =
    document.getElementById(
      "error-edit-ocr-status"
    );


  if (imageTools) {
    imageTools.hidden =
      !item.question_image_path;
  }


  if (imageOcrStatus) {
    imageOcrStatus.textContent =
      "";

    imageOcrStatus.className =
      "error-status";
  }


  const status =
    document.getElementById(
      "error-edit-status"
    );


  if (status) {
    status.textContent =
      "";

    status.className =
      "error-status";
  }


  const dialog =
    document.getElementById(
      "error-edit-dialog"
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


function closeErrorEditDialog() {
  editingErrorId =
    null;


  const dialog =
    document.getElementById(
      "error-edit-dialog"
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


function setErrorEditStatus(
  text,
  type = ""
) {
  const element =
    document.getElementById(
      "error-edit-status"
    );


  if (!element) {
    return;
  }


  element.textContent =
    text;


  element.className =
    `error-status ${type}`
      .trim();
}


async function saveEditedError() {
  if (!editingErrorId) {
    return;
  }


  const ccq =
    document
      .getElementById(
        "error-edit-ccq"
      )
      .value
      .trim();


  if (!ccq) {
    setErrorEditStatus(
      "O Pulo do Gato é obrigatório.",
      "error"
    );

    return;
  }


  const button =
    document.getElementById(
      "error-edit-save"
    );


  button.disabled =
    true;


  setErrorEditStatus(
    "Salvando..."
  );


  const {
    error
  } =
    await errorSb
      .from(
        "error_notebook"
      )
      .update({
        area:
          document
            .getElementById(
              "error-edit-area"
            )
            .value
            .trim()
          || null,

        materia:
          document
            .getElementById(
              "error-edit-materia"
            )
            .value
            .trim()
          || null,

        theme:
          document
            .getElementById(
              "error-edit-theme"
            )
            .value
            .trim()
          || null,

        ccq:
          ccq,

        question_text:
          document
            .getElementById(
              "error-edit-question"
            )
            .value
            .trim()
          || null,

        correct_answer:
          document
            .getElementById(
              "error-edit-answer"
            )
            .value
            .trim()
          || null,

        what_i_thought:
          document
            .getElementById(
              "error-edit-thought"
            )
            .value
            .trim()
          || null
      })
      .eq(
        "id",
        editingErrorId
      );


  button.disabled =
    false;


  if (error) {
    console.error(
      error
    );


    setErrorEditStatus(
      `Não foi possível salvar: ${error.message}`,
      "error"
    );

    return;
  }


  closeErrorEditDialog();


  setErrorLibraryStatus(
    "Item atualizado.",
    "success"
  );


  await Promise.all([
    loadErrorMetrics(),
    loadErrorAreas(),
    loadErrorLibrary(),
    loadErrorQueue()
  ]);
}


async function deleteErrorFromLibrary(
  itemId
) {
  const item =
    errorLibraryItems
      .find(
        (entry) =>
          entry.id === itemId
      )
    || errorQueue.find(
      (entry) =>
        entry.id === itemId
    );


  if (!item) {
    return;
  }


  const confirmed = await window.LuriaDialog.confirm(
      "Excluir este item do Caderno de Erros permanentemente? Esta ação não pode ser desfeita."
    );


  if (!confirmed) {
    return;
  }


  setErrorLibraryStatus(
    "Excluindo item..."
  );


  const {
    error
  } =
    await errorSb
      .from(
        "error_notebook"
      )
      .delete()
      .eq(
        "id",
        itemId
      );


  if (error) {
    console.error(
      error
    );


    setErrorLibraryStatus(
      `Não foi possível excluir: ${error.message}`,
      "error"
    );

    return;
  }


  if (
    item.question_image_path
  ) {
    const {
      error:
        storageError
    } =
      await window.LuriaStorage.remove("error_images",[
          item.question_image_path
        ]);


    if (storageError) {
      console.warn(
        "Item excluído, mas a imagem antiga não pôde ser removida:",
        storageError.message
      );
    }
  }


  selectedErrorIds.delete(
    itemId
  );

  errorQueue =
    errorQueue.filter(
      (entry) =>
        entry.id !== itemId
    );

  if (
    errorIndex
    >= errorQueue.length
  ) {
    errorIndex =
      Math.max(
        0,
        errorQueue.length - 1
      );
  }


  setErrorLibraryStatus(
    "Item excluído do Caderno.",
    "success"
  );


  await Promise.all([
    loadErrorMetrics(),
    loadErrorAreas(),
    loadErrorLibrary(),
    loadErrorQueue()
  ]);
}



function switchErrorTab(
  name
) {
  document
    .querySelectorAll(
      "[data-error-tab]"
    )
    .forEach(
      (button) => {
        button.classList.toggle(
          "active",
          button.dataset
            .errorTab === name
        );
      }
    );


  document
    .querySelectorAll(
      "[data-error-section]"
    )
    .forEach(
      (section) => {
        const isActive = section.dataset.errorSection === name;
        section.classList.toggle("active", isActive);
        section.hidden = !isActive;
      }
    );


  if (name === "create") { toggleNewErrorForm(true); }
  const showHome = name === "library";
  document.querySelector(".error-home-head")?.toggleAttribute("hidden", !showHome);
  document.querySelector(".error-cat-spotlight")?.toggleAttribute("hidden", !showHome);
  document.querySelector(".error-featured")?.toggleAttribute("hidden", !showHome);
  document.querySelector(".error-home-layout")?.toggleAttribute("hidden", !showHome);

  if (name === "library") {
    loadErrorLibrary();
    queueMicrotask(()=>setErrorHomeMode(errorHomeState));
  }
}


function currentErrorReviewItem() {
  return errorQueue[
    errorIndex
  ]
  || null;
}


function closeErrorReviewMenu() {
  const menu =
    document.getElementById(
      "error-review-menu"
    );

  const trigger =
    document.getElementById(
      "error-review-menu-trigger"
    );


  if (menu) {
    menu.hidden =
      true;
  }


  trigger?.setAttribute(
    "aria-expanded",
    "false"
  );
}


function updateErrorBulkToolbar() {
  const visible =
    filteredErrorLibrary()
      .map(
        (item) =>
          item.id
      );


  const selectedVisible =
    visible.filter(
      (id) =>
        selectedErrorIds.has(
          id
        )
    ).length;


  const count =
    document.getElementById(
      "error-library-selected"
    );


  const button =
    document.getElementById(
      "error-library-delete-selected"
    );

  const exportButton =
    document.getElementById(
      "error-library-export-selected"
    );


  const selectAll =
    document.getElementById(
      "error-library-select-all"
    );


  if (count) {
    count.textContent =
      `${selectedErrorIds.size} selecionado${selectedErrorIds.size === 1 ? "" : "s"}`;
  }


  if (button) {
    button.disabled =
      selectedErrorIds.size === 0;
  }

  if (exportButton) {
    exportButton.disabled =
      selectedErrorIds.size === 0;
  }


  if (selectAll) {
    selectAll.checked =
      visible.length > 0
      && selectedVisible === visible.length;

    selectAll.indeterminate =
      selectedVisible > 0
      && selectedVisible < visible.length;
  }
}


async function errorPdfImageData(path) {
  if (!path) return null;

  try {
    const blob = await downloadStoredErrorImage(path);
    const dataUrl = await readImageDataUrl(blob);
    const image = await loadImageElement(dataUrl);

    const maxWidth = 1000;
    const scale = Math.min(1, maxWidth / image.width);
    const canvas = document.createElement("canvas");
    canvas.width = Math.max(1, Math.round(image.width * scale));
    canvas.height = Math.max(1, Math.round(image.height * scale));

    const context = canvas.getContext("2d", { alpha: false });
    context.fillStyle = "#ffffff";
    context.fillRect(0, 0, canvas.width, canvas.height);
    context.drawImage(image, 0, 0, canvas.width, canvas.height);

    return {
      dataUrl: canvas.toDataURL("image/jpeg", 0.9),
      width: canvas.width,
      height: canvas.height
    };
  } catch (error) {
    console.warn("Imagem não incluída no PDF do Caderno:", error);
    return null;
  }
}


function errorPdfNewPage(
  doc,
  state
) {
  doc.addPage();

  window.LuriaPdfBranding
    ?.decoratePage(
      doc,
      state.assets,
      {
        title:
          "Caderno de Erros",
        subtitle:
          state.headerSubtitle
          || ""
      }
    );

  state.y =
    29;

  return state;
}


function errorPdfAddImage(doc, imageData, state) {
  if (!imageData) return state;

  const margin = 16;
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const maxWidth = Math.min(110, pageWidth - margin * 2);
  const maxHeight = 78;

  const ratio = imageData.width / Math.max(1, imageData.height);
  let width = maxWidth;
  let height = width / ratio;

  if (height > maxHeight) {
    height = maxHeight;
    width = height * ratio;
  }

  if (state.y + height + 10 > pageHeight - 16) {
    state =
      errorPdfNewPage(
        doc,
        state
      );
  }

  const x =
    margin
    + Math.max(
        0,
        (
          pageWidth
          - margin * 2
          - width
        ) / 2
      );

  doc.setDrawColor(
    218,
    230,
    244
  );

  doc.setFillColor(
    248,
    250,
    252
  );

  doc.roundedRect(
    x - 2,
    state.y - 2,
    width + 4,
    height + 4,
    2.4,
    2.4,
    "FD"
  );

  doc.addImage(
    imageData.dataUrl,
    "JPEG",
    x,
    state.y,
    width,
    height,
    undefined,
    "MEDIUM"
  );

  state.y +=
    height + 8;

  return state;
}


function errorPdfAddWrappedText(doc, label, value, state) {
  if (!value) return state;

  const margin = 16;
  const pageHeight = doc.internal.pageSize.getHeight();
  const maxWidth = doc.internal.pageSize.getWidth() - margin * 2;
  const valueLines = doc.splitTextToSize(String(value), maxWidth - 4);
  const needed = 5.5 + valueLines.length * 4.8 + 4.5;

  if (state.y + needed > pageHeight - 16) {
    state =
      errorPdfNewPage(
        doc,
        state
      );
  }

  doc.setTextColor(
    24,
    72,
    136
  );

  doc.setFont(
    "helvetica",
    "bold"
  );

  doc.setFontSize(
    8.2
  );

  doc.text(
    String(label).toUpperCase(),
    margin,
    state.y
  );

  state.y +=
    4.7;

  doc.setTextColor(
    30,
    41,
    59
  );

  doc.setFont(
    "helvetica",
    "normal"
  );

  doc.setFontSize(
    9.7
  );

  doc.text(
    valueLines,
    margin,
    state.y
  );

  state.y +=
    valueLines.length * 4.8
    + 5;

  return state;
}


async function exportSelectedErrorsPdf() {
  const ids = Array.from(selectedErrorIds);
  if (!ids.length) return;

  if (!window.jspdf?.jsPDF) {
    setErrorLibraryStatus("Gerador de PDF não carregou. Atualize a página.", "error");
    return;
  }

  const items = errorLibraryItems.filter((item) => selectedErrorIds.has(item.id));
  if (!items.length) return;

  const button = document.getElementById("error-library-export-selected");
  if (button) button.disabled = true;
  setErrorLibraryStatus("Gerando PDF...");

  try {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF({
      unit: "mm",
      format: "a4",
      orientation: "portrait",
      compress: true
    });

    const assets =
      await window.LuriaPdfBranding
        ?.getAssets?.();

    const headerSubtitle =
      `${items.length} item${items.length === 1 ? "" : "s"} selecionado${items.length === 1 ? "" : "s"}`;

    window.LuriaPdfBranding
      ?.decoratePage(
        doc,
        assets,
        {
          title:
            "Caderno de Erros",
          subtitle:
            headerSubtitle
        }
      );

    const margin = 16;

    let state = {
      y: 29,
      assets,
      headerSubtitle
    };

    for (let index = 0; index < items.length; index += 1) {
      const item = items[index];

      if (state.y > 252) {
        state =
          errorPdfNewPage(
            doc,
            state
          );
      }

      doc.setFillColor(
        238,
        244,
        251
      );

      doc.setDrawColor(
        218,
        230,
        244
      );

      doc.roundedRect(
        margin,
        state.y - 4.2,
        doc.internal.pageSize.getWidth() - margin * 2,
        11,
        2.4,
        2.4,
        "FD"
      );

      doc.setTextColor(
        18,
        48,
        85
      );

      doc.setFont(
        "helvetica",
        "bold"
      );

      doc.setFontSize(
        11.2
      );

      const heading =
        `${index + 1}. ${item.area || "Sem área"}${item.materia ? ` · ${item.materia}` : ""}`;

      doc.text(
        doc.splitTextToSize(
          heading,
          doc.internal.pageSize.getWidth() - margin * 2 - 8
        )[0],
        margin + 4,
        state.y + 2.3
      );

      state.y +=
        12;

      state =
        errorPdfAddWrappedText(
          doc,
          "Tema",
          item.theme,
          state
        );

      state =
        errorPdfAddWrappedText(
          doc,
          "Pulo do Gato",
          item.ccq,
          state
        );

      state =
        errorPdfAddWrappedText(
          doc,
          "Questão",
          item.question_text,
          state
        );

      if (item.question_image_path) {
        setErrorLibraryStatus(`Preparando imagem ${index + 1} de ${items.length}...`);

        const imageData =
          await errorPdfImageData(
            item.question_image_path
          );

        state =
          errorPdfAddImage(
            doc,
            imageData,
            state
          );
      }

      state =
        errorPdfAddWrappedText(
          doc,
          "Resposta correta",
          item.correct_answer,
          state
        );

      state =
        errorPdfAddWrappedText(
          doc,
          "O que eu pensei",
          item.what_i_thought,
          state
        );

      state.y +=
        1.5;

      doc.setDrawColor(
        218,
        230,
        244
      );

      doc.setLineWidth(
        0.25
      );

      doc.line(
        margin,
        state.y,
        doc.internal.pageSize.getWidth() - margin,
        state.y
      );

      state.y +=
        7;
    }

    window.LuriaPdfBranding
      ?.finalize(
        doc
      );

    doc.save(`luria-caderno-erros-${errorTodayISO()}.pdf`);
    setErrorLibraryStatus("PDF exportado.", "success");
  } catch (error) {
    console.error(error);
    setErrorLibraryStatus(`Não foi possível gerar o PDF: ${error.message}`, "error");
  } finally {
    if (button) button.disabled = false;
  }
}


async function deleteSelectedErrors() {
  const ids =
    Array.from(
      selectedErrorIds
    );


  if (!ids.length) {
    return;
  }


  const confirmed = await window.LuriaDialog.confirm(
      `Excluir ${ids.length} item${ids.length === 1 ? "" : "s"} do Caderno permanentemente?`
    );


  if (!confirmed) {
    return;
  }


  const items =
    errorLibraryItems.filter(
      (item) =>
        selectedErrorIds.has(
          item.id
        )
    );


  setErrorLibraryStatus(
    "Excluindo selecionados..."
  );


  const {
    error
  } =
    await errorSb
      .from(
        "error_notebook"
      )
      .delete()
      .in(
        "id",
        ids
      );


  if (error) {
    console.error(
      error
    );


    setErrorLibraryStatus(
      `Não foi possível excluir: ${error.message}`,
      "error"
    );

    return;
  }


  const paths =
    items
      .map(
        (item) =>
          item.question_image_path
      )
      .filter(
        Boolean
      );


  if (paths.length) {
    const {
      error:
        storageError
    } =
      await window.LuriaStorage.remove("error_images",
          paths
        );


    if (storageError) {
      console.warn(
        storageError
      );
    }
  }


  errorQueue =
    errorQueue.filter(
      (item) =>
        !selectedErrorIds.has(
          item.id
        )
    );


  selectedErrorIds.clear();


  setErrorLibraryStatus(
    `${ids.length} item${ids.length === 1 ? "" : "s"} excluído${ids.length === 1 ? "" : "s"}.`,
    "success"
  );


  await Promise.all([
    loadErrorMetrics(),
    loadErrorAreas(),
    loadErrorLibrary(),
    loadErrorQueue()
  ]);
}


function normalizeErrorImportHeader(
  value
) {
  return String(
    value
    ?? ""
  )
    .trim()
    .toLowerCase()
    .normalize(
      "NFD"
    )
    .replace(
      /[\u0300-\u036f]/g,
      ""
    )
    .replace(
      /[^a-z0-9]+/g,
      " "
    )
    .trim();
}


function errorImportValue(
  row,
  aliases
) {
  for (
    const [
      key,
      value
    ]
    of Object.entries(
      row
    )
  ) {
    const normalized =
      normalizeErrorImportHeader(
        key
      );


    if (
      aliases.includes(
        normalized
      )
    ) {
      return String(
        value
        ?? ""
      )
        .trim();
    }
  }


  return "";
}


function parseErrorImportRows(
  workbook
) {
  const rows =
    [];


  for (
    const sheetName
    of workbook.SheetNames
  ) {
    const sheet =
      workbook.Sheets[
        sheetName
      ];


    const data =
      XLSX.utils
        .sheet_to_json(
          sheet,
          {
            defval:
              ""
          }
        );


    for (
      const source
      of data
    ) {
      const item = {
        area:
          errorImportValue(
            source,
            [
              "area",
              "grande area"
            ]
          ),

        materia:
          errorImportValue(
            source,
            [
              "materia",
              "disciplina"
            ]
          ),

        theme:
          errorImportValue(
            source,
            [
              "tema",
              "assunto"
            ]
          ),

        ccq:
          errorImportValue(
            source,
            [
              "ccq",
              "conceito",
              "conceito central"
            ]
          ),

        question_text:
          errorImportValue(
            source,
            [
              "questao",
              "pergunta"
            ]
          ),

        correct_answer:
          errorImportValue(
            source,
            [
              "resposta",
              "resposta correta",
              "gabarito"
            ]
          ),

        what_i_thought:
          errorImportValue(
            source,
            [
              "o que eu pensei",
              "meu raciocinio",
              "raciocinio"
            ]
          )
      };


      if (
        item.ccq
      ) {
        rows.push(
          item
        );
      }
    }
  }


  return rows;
}


function renderErrorImportPreview() {
  const preview =
    document.getElementById(
      "error-import-preview"
    );

  const body =
    document.getElementById(
      "error-import-body"
    );

  const summary =
    document.getElementById(
      "error-import-summary"
    );

  const button =
    document.getElementById(
      "error-import-confirm"
    );


  if (
    !importedErrorRows.length
  ) {
    preview.hidden =
      true;

    body.innerHTML =
      "";

    summary.textContent =
      "";

    button.disabled =
      true;

    return;
  }


  preview.hidden =
    false;

  button.disabled =
    false;

  summary.textContent =
    `${importedErrorRows.length} item${importedErrorRows.length === 1 ? "" : "s"} válido${importedErrorRows.length === 1 ? "" : "s"}`;


  body.innerHTML =
    importedErrorRows
      .slice(
        0,
        20
      )
      .map(
        (row) => `
          <tr>
            <td>${errorLibraryEscape(row.area || "—")}</td>
            <td>${errorLibraryEscape(row.materia || "—")}</td>
            <td>${errorLibraryEscape(row.theme || "—")}</td>
            <td>${errorLibraryEscape(row.ccq)}</td>
            <td>${errorLibraryEscape(row.question_text || "—")}</td>
            <td>${errorLibraryEscape(row.correct_answer || "—")}</td>
          </tr>
        `
      )
      .join("");
}


async function importErrorRows() {
  if (
    !importedErrorRows.length
  ) {
    return;
  }


  const button =
    document.getElementById(
      "error-import-confirm"
    );


  button.disabled =
    true;


  const status =
    document.getElementById(
      "error-import-status"
    );


  status.textContent =
    "Importando...";

  status.className =
    "error-status";


  let created =
    0;


  try {
    for (
      const row
      of importedErrorRows
    ) {
      const {
        error
      } =
        await errorSb.rpc(
          "create_error_entry",
          {
            p_area:
              row.area
              || null,

            p_materia:
              row.materia
              || null,

            p_theme:
              row.theme
              || null,

            p_ccq:
              row.ccq,

            p_question_text:
              row.question_text
              || null,

            p_correct_answer:
              row.correct_answer
              || null,

            p_what_i_thought:
              row.what_i_thought
              || null,

            p_question_image_path:
              null
          }
        );


      if (error) {
        throw error;
      }


      created +=
        1;
    }


    importedErrorRows =
      [];


    document
      .getElementById(
        "error-import-file"
      )
      .value =
        "";


    renderErrorImportPreview();


    status.textContent =
      `${created} item${created === 1 ? "" : "s"} importado${created === 1 ? "" : "s"}.`;

    status.className =
      "error-status success";


    await Promise.all([
      loadErrorMetrics(),
      loadErrorAreas(),
      loadErrorLibrary(),
      loadErrorQueue()
    ]);


  } catch (error) {
    console.error(
      error
    );


    status.textContent =
      `Não foi possível concluir: ${error.message}`;

    status.className =
      "error-status error";


    button.disabled =
      false;
  }
}


function errorAreaIcon(area){
  if(window.LuriaMedicalIcons?.svg) return window.LuriaMedicalIcons.svg(area);
  return "";
}
function errorState(item){
  const n=Number(item.review_count||0);
  const due=String(item.due_date||"");
  if(n>=5) return "mastered";
  if(n>=2) return "consolidating";
  if(!due||due<=errorTodayISO()) return "review";
  return "all";
}
let errorHomeState="review-home";
function filteredHomeItems(){
  const base=filteredErrorLibrary();
  if(errorHomeState==="all") return base;
  return base.filter(item=>errorState(item)===errorHomeState);
}
let errorSpotlightTimer=null,errorSpotlightIndex=0;
function startErrorSpotlight(){
  const text=document.getElementById("error-cat-spotlight-text"),meta=document.getElementById("error-cat-spotlight-meta"),bar=document.getElementById("error-cat-timer-bar");if(!text)return;
  const items=(Array.isArray(errorLibraryItems)?errorLibraryItems:[]).filter(x=>String(x?.ccq||"").trim());if(!items.length){text.textContent="Nenhum Pulo do Gato disponível nesta conta.";if(meta)meta.textContent="Os Pulos aparecem quando seus erros carregarem.";return}
  const paint=()=>{const item=items[errorSpotlightIndex%items.length];text.classList.add("changing");setTimeout(()=>{text.textContent=item.ccq;meta.textContent=[item.area,item.materia||item.theme].filter(Boolean).join(" · ")||"Caderno de Erros";text.classList.remove("changing")},160);if(bar){bar.style.animation="none";void bar.offsetWidth;bar.style.animation="errorCatCountdown 15s linear forwards"};errorSpotlightIndex=(errorSpotlightIndex+1)%items.length};
  if(errorSpotlightTimer)clearInterval(errorSpotlightTimer);paint();if(items.length>1)errorSpotlightTimer=setInterval(paint,15000);
}
function renderErrorHomeExtras(){
  const total=errorLibraryItems.length;
  const totalReviews=errorLibraryItems.reduce((sum,item)=>sum+Number(item.review_count||0),0);
  const retained=errorLibraryItems.filter(item=>Number(item.review_count||0)>=2).length;
  const retentionPct=total?Math.round(retained/total*100):0;

  const reviewTotal=document.getElementById("error-review-home-total");
  const reviewReviews=document.getElementById("error-review-home-reviews");
  const reviewRetention=document.getElementById("error-review-home-retention");
  if(reviewTotal)reviewTotal.textContent=String(total);
  if(reviewReviews)reviewReviews.textContent=String(totalReviews);
  if(reviewRetention)reviewRetention.textContent=`${retentionPct}%`;

  setTimeout(startErrorSpotlight,0);
  const featured=document.getElementById("error-featured-list");
  if(featured){
    featured.innerHTML=errorLibraryItems.slice().sort((a,b)=>Number(b.review_count||0)-Number(a.review_count||0)).slice(0,4).map(item=>`
      <article class="error-feature-card"><span>${errorLibraryEscape(item.area||"Sem área")}</span><strong>${errorLibraryEscape(item.theme||item.materia||"Ponto importante")}</strong><p>💡 ${errorLibraryEscape(item.ccq||"Sem Pulo do Gato")}</p></article>`).join("") || '<div class="error-home-empty">Seus Pulos do Gato aparecerão aqui.</div>';
  }
  const due=errorLibraryItems.filter(i=>!i.due_date||i.due_date<=errorTodayISO()).slice(0,5);
  const today=document.getElementById("error-review-home-today-list")||document.getElementById("error-today-list");
  const count=document.getElementById("error-review-home-today-count")||document.getElementById("error-today-count");
  if(count) count.textContent=String(due.length);
  if(today) today.innerHTML=due.map((item,i)=>`<button type="button" class="error-today-row" data-home-review-id="${errorLibraryEscape(item.id)}"><b>${i+1}</b><span><strong>${errorLibraryEscape(item.theme||item.materia||"Erro")}</strong><small>${errorLibraryEscape(item.area||"Sem área")}</small></span><i>›</i></button>`).join("") || '<div class="error-home-empty">Nenhuma revisão pendente hoje.</div>';
  const metrics=document.getElementById("error-review-home-quick-metrics")||document.getElementById("error-quick-metrics");
  if(metrics){
    const reviewed=errorLibraryItems.filter(i=>Number(i.review_count||0)>0).length;
    const dueCount=errorLibraryItems.filter(i=>!i.due_date||i.due_date<=errorTodayISO()).length;
    const recurring=errorLibraryItems.filter(i=>Number(i.review_count||0)>=2).length;
    const areaCounts=new Map(); errorLibraryItems.forEach(i=>{const k=i.area||"Sem área";areaCounts.set(k,(areaCounts.get(k)||0)+1)});
    const areas=[...areaCounts.entries()].sort((x,y)=>y[1]-x[1]).slice(0,5);
    metrics.innerHTML=`
      <div class="error-metric-progress"><div class="error-metric-ring" style="--p:${total?Math.round(reviewed/total*100):0}"><strong>${reviewed}</strong><span>de ${total}</span></div><div><strong>Revisados</strong><span>${total?Math.round(reviewed/total*100):0}% do caderno</span><div class="error-metric-track"><i style="width:${total?Math.round(reviewed/total*100):0}%"></i></div></div></div>
      <div class="error-metric-mini-grid"><div><b>↻</b><strong>${recurring}</strong><span>Erros recorrentes</span></div><div><b>△</b><strong>${dueCount}</strong><span>A revisar agora</span></div></div>
      <h4>Erros por área</h4>
      <div class="error-metric-areas">${areas.map(([name,n])=>`<div><span>${errorLibraryEscape(name)}</span><i><b style="width:${total?Math.round(n/total*100):0}%"></b></i><em>${total?Math.round(n/total*100):0}%</em></div>`).join("")}</div>`;
  }
}
async function deleteErrorNotebook(area,name){
  const rows=errorLibraryItems.filter(i=>(i.area||"Sem área")===area && (i.materia||i.theme||"Geral")===name);
  if(!rows.length)return;
  const ok=await window.LuriaDialog.confirm(`Excluir o caderno “${name}” inteiro, com ${rows.length} erro${rows.length===1?"":"s"}? Esta ação não pode ser desfeita.`);
  if(!ok)return;
  setErrorLibraryStatus("Excluindo caderno...");
  const ids=rows.map(i=>i.id);
  const {error}=await errorSb.from("error_notebook").delete().in("id",ids);
  if(error){setErrorLibraryStatus(`Não foi possível excluir: ${error.message}`,"error");return}
  const paths=rows.map(i=>i.question_image_path).filter(Boolean);
  if(paths.length) await window.LuriaStorage.remove("error_images",paths);
  setErrorLibraryStatus("Caderno excluído.","success");
  await Promise.all([loadErrorMetrics(),loadErrorAreas(),loadErrorLibrary(),loadErrorQueue()]);
}
function canonicalErrorArea(value){
  const v=String(value||"").trim().toLowerCase();
  if(v.includes("clínica")||v.includes("clinica"))return "Clínica Médica";
  if(v.includes("gine")||v==="go"||v.includes("obst"))return "GO";
  if(v.includes("cirurg"))return "Cirurgia Geral";
  if(v.includes("pedi"))return "Pediatria";
  if(v.includes("prevent"))return "Preventiva";
  return value||"Sem área";
}
function editErrorNotebook(area,name){
  const rows=errorLibraryItems.filter(i=>canonicalErrorArea(i.area)===area && (i.materia||i.theme||"Geral")===name);
  const container=document.getElementById("error-library");
  const empty=document.getElementById("error-library-empty");
  const count=document.getElementById("error-library-count");
  const layout=document.querySelector(".error-home-layout");
  const titleWrap=document.querySelector(".error-library-title");
  const title=titleWrap?.querySelector("h2");
  const subtitle=titleWrap?.querySelector("p");

  if(!container||!empty||!count)return;

  layout?.classList.add("notebook-detail-open");
  document.body.classList.add("error-notebook-detail-active");

  if(title) title.textContent=name;
  if(subtitle) subtitle.textContent=`${area} · ${rows.length} ${rows.length===1?"erro salvo":"erros salvos"} neste caderno.`;

  empty.hidden=rows.length>0;
  if(!rows.length) empty.textContent="Nenhum erro encontrado neste caderno.";
  count.textContent=`${rows.length} ${rows.length===1?"erro":"erros"}`;

  const notebookReviews=rows.reduce((sum,item)=>sum+Number(item.review_count||0),0);
  const notebookRetained=rows.filter(item=>Number(item.review_count||0)>=2).length;
  const notebookRetention=rows.length?Math.round((notebookRetained/rows.length)*100):0;

  container.innerHTML=`
    <section class="error-notebook-detail">
      <div class="error-notebook-detail-toolbar">
        <button id="error-notebook-back" class="button secondary" type="button">← Voltar aos cadernos</button>
        <div class="error-notebook-detail-actions-top">
          <button id="error-notebook-select-mode" class="button secondary" type="button" ${rows.length?"":"disabled"}>Selecionar</button>
          <button id="error-notebook-review-all" class="button primary" type="button" ${rows.length?"":"disabled"}>▶ Revisar este caderno</button>
        </div>
      </div>

      <div class="error-notebook-mini-dashboard">
        <div><span>Questões</span><strong>${rows.length}</strong></div>
        <div><span>Revisões</span><strong>${notebookReviews}</strong></div>
        <div><span>Retenção</span><strong>${notebookRetention}%</strong></div>
      </div>

      <div id="error-notebook-selection-bar" class="error-notebook-selection-bar" hidden>
        <div><strong id="error-notebook-selected-count">0</strong><span>selecionados</span></div>
        <div class="error-notebook-selection-actions">
          <button id="error-notebook-select-all" class="button secondary" type="button">Selecionar todos</button>
          <button id="error-notebook-add-selected" class="button secondary" type="button" disabled>＋ Revisão de hoje</button>
          <button id="error-notebook-export-selected" class="button secondary" type="button" disabled>Exportar PDF</button>
        </div>
      </div>

      <div class="error-notebook-detail-list">
        ${rows.map((item,index)=>`
          <article class="error-note-detail-card" data-error-note-id="${errorLibraryEscape(item.id)}">
            <label class="error-note-select-wrap" hidden>
              <input type="checkbox" class="error-note-select" data-error-note-select="${errorLibraryEscape(item.id)}">
              <span aria-hidden="true"></span>
            </label>
            <div class="error-note-detail-index">${index+1}</div>

            <div class="error-note-detail-body">
              <div class="error-note-detail-head">
                <div>
                  <span class="error-note-detail-kicker">${errorLibraryEscape(item.theme||"Erro salvo")}</span>
                  <h3>${errorLibraryEscape(item.ccq||item.question_text||`Erro ${index+1}`)}</h3>
                </div>

                <div class="error-note-detail-side">
                  <span class="error-note-detail-date">${item.due_date?errorLibraryEscape(formatErrorDate(item.due_date)):"Sem revisão agendada"}</span>
                  <button type="button" class="error-note-detail-more" aria-label="Mais ações" aria-expanded="false" data-error-note-more="${errorLibraryEscape(item.id)}">•••</button>
                  <div class="error-note-detail-menu" data-error-note-menu="${errorLibraryEscape(item.id)}" hidden>
                    <button type="button" data-error-note-review="${errorLibraryEscape(item.id)}">▶ Revisar</button>
                    <button type="button" data-error-note-edit="${errorLibraryEscape(item.id)}">Editar</button>
                    <button type="button" class="danger" data-error-note-delete="${errorLibraryEscape(item.id)}">Excluir</button>
                  </div>
                </div>
              </div>

              <div class="error-note-detail-open-row">
                <button type="button" class="button secondary error-note-detail-open" data-error-note-open="${errorLibraryEscape(item.id)}" aria-expanded="false">Abrir</button>
              </div>

              <div class="error-note-detail-expanded" data-error-note-expanded="${errorLibraryEscape(item.id)}" hidden>
                ${item.question_text?`
                  <div class="error-note-detail-question">
                    <strong>Questão</strong>
                    <p>${errorLibraryEscape(item.question_text)}</p>
                  </div>
                `:`<div class="error-note-detail-question"><strong>Questão</strong><p>Questão não informada.</p></div>`}

                <div class="error-note-detail-answer">
                  <strong>Resposta correta</strong>
                  <p>${errorLibraryEscape(item.correct_answer||"—")}</p>
                </div>

                ${item.what_i_thought?`
                  <div class="error-note-detail-thought">
                    <strong>O que eu pensei</strong>
                    <p>${errorLibraryEscape(item.what_i_thought)}</p>
                  </div>
                `:""}
              </div>
            </div>
          </article>
        `).join("")}
      </div>
    </section>`;

  const restoreNotebookLibrary=()=>{
    layout?.classList.remove("notebook-detail-open");
    document.body.classList.remove("error-notebook-detail-active");
    if(title) title.textContent="Meus cadernos";
    if(subtitle) subtitle.textContent="Abra uma área e escolha o caderno da matéria que quer revisar.";
    empty.textContent="Nenhum erro encontrado.";
    renderErrorLibrary();
    setErrorLibraryStatus("");
  };

  const closeNoteMenus=(exceptId=null)=>{
    container.querySelectorAll("[data-error-note-menu]").forEach(menu=>{
      if(String(menu.dataset.errorNoteMenu)!==String(exceptId))menu.hidden=true;
    });
    container.querySelectorAll("[data-error-note-more]").forEach(button=>{
      if(String(button.dataset.errorNoteMore)!==String(exceptId))button.setAttribute("aria-expanded","false");
    });
  };

  document.getElementById("error-notebook-back")?.addEventListener("click",restoreNotebookLibrary);
  document.getElementById("error-notebook-review-all")?.addEventListener("click",()=>reviewErrorNotebook(area,name));

  const notebookSelectMode=document.getElementById("error-notebook-select-mode");
  const notebookSelectionBar=document.getElementById("error-notebook-selection-bar");
  const notebookSelectAll=document.getElementById("error-notebook-select-all");
  const notebookAddSelected=document.getElementById("error-notebook-add-selected");
  const notebookExportSelected=document.getElementById("error-notebook-export-selected");
  const notebookSelectedCount=document.getElementById("error-notebook-selected-count");
  const notebookChecks=[...container.querySelectorAll("[data-error-note-select]")];
  let notebookSelecting=false;

  const selectedNotebookIds=()=>notebookChecks.filter(check=>check.checked).map(check=>check.dataset.errorNoteSelect);
  const syncNotebookSelection=()=>{
    const ids=selectedNotebookIds();
    if(notebookSelectedCount)notebookSelectedCount.textContent=String(ids.length);
    if(notebookAddSelected)notebookAddSelected.disabled=!ids.length;
    if(notebookExportSelected)notebookExportSelected.disabled=!ids.length;
    if(notebookSelectAll)notebookSelectAll.textContent=ids.length===notebookChecks.length&&notebookChecks.length?"Desmarcar todos":"Selecionar todos";
    container.querySelectorAll(".error-note-detail-card").forEach(card=>{
      const check=card.querySelector("[data-error-note-select]");
      card.classList.toggle("selected",Boolean(check?.checked));
    });
  };
  const setNotebookSelectionMode=(enabled)=>{
    notebookSelecting=Boolean(enabled);
    notebookSelectMode?.classList.toggle("active",notebookSelecting);
    if(notebookSelectMode)notebookSelectMode.textContent=notebookSelecting?"Cancelar seleção":"Selecionar";
    if(notebookSelectionBar)notebookSelectionBar.hidden=!notebookSelecting;
    container.querySelectorAll(".error-note-select-wrap").forEach(label=>label.hidden=!notebookSelecting);
    if(!notebookSelecting)notebookChecks.forEach(check=>check.checked=false);
    syncNotebookSelection();
  };
  notebookSelectMode?.addEventListener("click",()=>setNotebookSelectionMode(!notebookSelecting));
  notebookChecks.forEach(check=>check.addEventListener("change",syncNotebookSelection));
  notebookSelectAll?.addEventListener("click",()=>{
    const allSelected=notebookChecks.length&&notebookChecks.every(check=>check.checked);
    notebookChecks.forEach(check=>check.checked=!allSelected);
    syncNotebookSelection();
  });
  notebookAddSelected?.addEventListener("click",()=>{
    const ids=new Set(selectedNotebookIds());
    addErrorsToTodayReview(rows.filter(item=>ids.has(String(item.id))),"selecionados");
  });
  notebookExportSelected?.addEventListener("click",async()=>{
    selectedErrorIds.clear();
    selectedNotebookIds().forEach(id=>selectedErrorIds.add(id));
    await exportSelectedErrorsPdf();
    selectedErrorIds.clear();
  });

  container.querySelectorAll("[data-error-note-open]").forEach(button=>{
    button.addEventListener("click",(event)=>{
      event.stopPropagation();
      const id=button.dataset.errorNoteOpen;
      const panel=container.querySelector(`[data-error-note-expanded="${CSS.escape(id)}"]`);
      if(!panel)return;
      const open=panel.hidden;
      panel.hidden=!open;
      button.textContent=open?"Fechar":"Abrir";
      button.setAttribute("aria-expanded",open?"true":"false");
    });
  });

  container.querySelectorAll("[data-error-note-more]").forEach(button=>{
    button.addEventListener("click",(event)=>{
      event.stopPropagation();
      const id=button.dataset.errorNoteMore;
      const menu=container.querySelector(`[data-error-note-menu="${CSS.escape(id)}"]`);
      const open=!!menu?.hidden;
      closeNoteMenus(id);
      if(menu)menu.hidden=!open;
      button.setAttribute("aria-expanded",open?"true":"false");
    });
  });

  container.querySelectorAll("[data-error-note-menu]").forEach(menu=>{
    menu.addEventListener("click",(event)=>event.stopPropagation());
  });

  container.querySelectorAll("[data-error-note-edit]").forEach(button=>{
    button.addEventListener("click",(event)=>{
      event.stopPropagation();
      closeNoteMenus();
      openErrorEditDialog(button.dataset.errorNoteEdit);
    });
  });

  container.querySelectorAll("[data-error-note-review]").forEach(button=>{
    button.addEventListener("click",(event)=>{
      event.stopPropagation();
      closeNoteMenus();
      openErrorReviewPage({mode:"notebook",area,name,item:button.dataset.errorNoteReview});
    });
  });

  container.querySelectorAll("[data-error-note-delete]").forEach(button=>{
    button.addEventListener("click",async(event)=>{
      event.stopPropagation();
      closeNoteMenus();
      await deleteErrorFromLibrary(button.dataset.errorNoteDelete);
      editErrorNotebook(area,name);
    });
  });

  document.addEventListener("click",closeNoteMenus,{once:true});
  setErrorLibraryStatus("");
}
async function addErrorsToTodayReview(items,label="itens"){
  const ids=[...new Set((items||[]).map(i=>i.id).filter(Boolean))];
  if(!ids.length){setErrorLibraryStatus("Nenhum erro encontrado para adicionar.","error");return}
  setErrorLibraryStatus("Adicionando à revisão de hoje...");
  const {error}=await errorSb.from("error_notebook").update({due_date:errorTodayISO()}).in("id",ids);
  if(error){console.error(error);setErrorLibraryStatus(`Não foi possível adicionar à revisão de hoje: ${error.message}`,"error");return}
  errorLibraryItems.forEach(i=>{if(ids.includes(i.id))i.due_date=errorTodayISO()});
  setErrorLibraryStatus(`${ids.length} ${ids.length===1?"erro adicionado":"erros adicionados"} à revisão de hoje · ${label}.`,"success");
  renderErrorLibrary();
  await loadErrorQueue();
}

function openErrorReviewPage({mode="today",area="",name="",item=""}={}){
  const params=new URLSearchParams();
  params.set("mode",mode);
  if(area)params.set("area",area);
  if(name)params.set("name",name);
  if(item)params.set("item",item);
  window.location.href=`/caderno-erros/revisao/?${params.toString()}`;
}

function reviewErrorNotebook(area,name){
  openErrorReviewPage({mode:"notebook",area,name});
}
function closeNotebookMenus(except=null){
  document.querySelectorAll("[data-error-notebook-menu]").forEach(m=>{if(m.dataset.errorNotebookMenu!==except)m.hidden=true});
}
function renderErrorLibrary() {
  const container=document.getElementById("error-library"), empty=document.getElementById("error-library-empty"), count=document.getElementById("error-library-count");
  if(!container||!empty||!count)return;
  let items=filteredHomeItems();
  /* A biblioteca nunca deve desaparecer por estado de UI stale.
     Se "Todos" estiver ativo e a busca/filtro visual estiverem vazios,
     a fonte de verdade é a coleção carregada do Supabase. */
  const areaFilter=document.getElementById("error-library-area")?.value||"";
  const searchFilter=document.getElementById("error-library-search")?.value?.trim()||"";
  if(errorHomeState==="all"&&!areaFilter&&!searchFilter&&errorLibraryItems.length) items=errorLibraryItems.slice();
  count.textContent=`${items.length} ${items.length===1?"erro":"erros"}`;
  if(!items.length){container.innerHTML="";empty.hidden=false;updateErrorBulkToolbar();renderErrorHomeExtras();return}
  empty.hidden=true;
  const areas=new Map();
  items.forEach(item=>{const area=item.area||"Sem área";const notebook=item.materia||item.theme||"Geral";if(!areas.has(area))areas.set(area,new Map());const books=areas.get(area);if(!books.has(notebook))books.set(notebook,[]);books.get(notebook).push(item)});
  const canonicalArea=canonicalErrorArea;
  const normalizedAreas=new Map();items.forEach(item=>{const area=canonicalArea(item.area);const notebook=item.materia||item.theme||"Geral";if(!normalizedAreas.has(area))normalizedAreas.set(area,new Map());const books=normalizedAreas.get(area);if(!books.has(notebook))books.set(notebook,[]);books.get(notebook).push(item)});
  areas.clear();normalizedAreas.forEach((v,k)=>areas.set(k,v));
  const preferred=["Clínica Médica","GO","Cirurgia Geral","Pediatria","Preventiva"];
  const sorted=[...areas.keys()].sort((x,y)=>{const ax=preferred.indexOf(x),ay=preferred.indexOf(y);if(ax>=0||ay>=0)return (ax<0?99:ax)-(ay<0?99:ay);return x.localeCompare(y,"pt-BR")});
  try {
  container.innerHTML=sorted.map(area=>{const books=areas.get(area);return `
    <section class="error-notebook-shelf">
      <div class="error-notebook-shelf-head"><span class="error-area-mark">${errorAreaIcon(area)}</span><div><h3>${errorLibraryEscape(area)}</h3><p>${[...books.values()].reduce((n,v)=>n+v.length,0)} erros em ${books.size} cadernos</p></div><div class="error-area-actions"><button type="button" data-error-area-more="${errorLibraryEscape(area)}">•••</button><div class="error-area-menu" data-error-area-menu="${errorLibraryEscape(area)}" hidden><button type="button" data-area-add-today>＋ Adicionar à revisão de hoje</button><button type="button" data-area-review>Revisar agora</button><button type="button" data-area-edit>Editar área</button></div></div></div>
      <div class="error-notebook-grid">${[...books.entries()].map(([name,rows])=>{const reviews=rows.reduce((n,i)=>n+Number(i.review_count||0),0);const due=rows.filter(i=>!i.due_date||i.due_date<=errorTodayISO()).length;const tip=rows.find(i=>i.ccq)?.ccq||"Abra para revisar seus erros.";return `
        <article class="error-notebook-card" data-error-notebook="${errorLibraryEscape(area)}||${errorLibraryEscape(name)}">
          <div class="error-notebook-icon">${errorAreaIcon(area)}</div><button class="error-notebook-more" type="button" data-error-notebook-more="${errorLibraryEscape(area)}||${errorLibraryEscape(name)}">•••</button>
          <div class="error-notebook-menu" data-error-notebook-menu="${errorLibraryEscape(area)}||${errorLibraryEscape(name)}" hidden><button type="button" data-notebook-add-today>＋ Adicionar à revisão de hoje</button><button type="button" data-notebook-review>Revisar agora</button><button type="button" data-notebook-edit>Editar notas</button><button type="button" class="danger" data-notebook-delete>Excluir caderno</button></div>
          <strong>${errorLibraryEscape(name)}</strong><p>${errorLibraryEscape(tip)}</p>
          <div class="error-notebook-stats"><span><b>${rows.length}</b> erros</span><span><b>${reviews}</b> revisões</span><span><b>${due}</b> pendentes</span></div>
          <div class="error-notebook-progress"><i style="width:${rows.length?Math.min(100,Math.round((rows.length-due)/rows.length*100)):0}%"></i></div>
        </article>`}).join("")}</div>
    </section>`}).join("");
  } catch (renderError) {
    console.error("Falha ao renderizar cadernos:",renderError);
    container.innerHTML=items.map(item=>`<article class="error-notebook-card error-notebook-fallback"><strong>${errorLibraryEscape(item.materia||item.theme||"Geral")}</strong><p>${errorLibraryEscape(item.ccq||item.question_text||"Erro salvo")}</p><small>${errorLibraryEscape(canonicalErrorArea(item.area))}</small></article>`).join("");
    setErrorLibraryStatus("Os cadernos foram carregados em modo de recuperação.","error");
  }
  renderErrorHomeExtras();updateErrorBulkToolbar();
  container.querySelectorAll("[data-error-area-more]").forEach(button=>button.addEventListener("click",event=>{event.stopPropagation();const area=button.dataset.errorAreaMore;document.querySelectorAll("[data-error-area-menu]").forEach(m=>{if(m.dataset.errorAreaMenu!==area)m.hidden=true});const menu=container.querySelector(`[data-error-area-menu="${CSS.escape(area)}"]`);if(menu)menu.hidden=!menu.hidden}));
  container.querySelectorAll(".error-notebook-shelf").forEach(shelf=>{const more=shelf.querySelector("[data-error-area-more]");if(!more)return;const area=more.dataset.errorAreaMore;shelf.querySelector("[data-area-add-today]")?.addEventListener("click",()=>addErrorsToTodayReview(errorLibraryItems.filter(i=>canonicalErrorArea(i.area)===area),area));shelf.querySelector("[data-area-review]")?.addEventListener("click",()=>openErrorReviewPage({mode:"area",area}));shelf.querySelector("[data-area-edit]")?.addEventListener("click",()=>{const select=document.getElementById("error-library-area");if(select){const exact=[...select.options].find(o=>canonicalArea(o.value)===area);select.value=exact?.value||"";syncErrorLibraryAreaPicker()}const search=document.getElementById("error-library-search");if(search)search.value="";renderErrorLibrary();setErrorLibraryStatus(`Área “${area}” aberta para edição.`,"success")})});
  container.querySelectorAll("[data-error-notebook-more]").forEach(button=>button.addEventListener("click",event=>{event.stopPropagation();const key=button.dataset.errorNotebookMore;const menu=container.querySelector(`[data-error-notebook-menu="${CSS.escape(key)}"]`);const opening=menu?.hidden;closeNotebookMenus();if(menu)menu.hidden=!opening}));
  container.querySelectorAll("[data-error-notebook]").forEach(card=>{
    const [area,name]=card.dataset.errorNotebook.split("||");
    card.addEventListener("click",event=>{if(event.target.closest(".error-notebook-menu,.error-notebook-more"))return;editErrorNotebook(area,name)});
    card.querySelector("[data-notebook-add-today]")?.addEventListener("click",()=>addErrorsToTodayReview(errorLibraryItems.filter(i=>canonicalErrorArea(i.area)===area&&(i.materia||i.theme||"Geral")===name),name));
    card.querySelector("[data-notebook-review]")?.addEventListener("click",()=>reviewErrorNotebook(area,name));
    card.querySelector("[data-notebook-edit]")?.addEventListener("click",()=>editErrorNotebook(area,name));
    card.querySelector("[data-notebook-delete]")?.addEventListener("click",()=>deleteErrorNotebook(area,name));
  });
}

async function loadErrorLibrary() {
  const {
    data,
    error
  } =
    await errorSb
      .from(
        "error_notebook"
      )
      .select(
        "id,area,materia,theme,ccq,question_text,question_image_path,correct_answer,what_i_thought,due_date,review_count,created_at"
      )
      .eq(
        "active",
        true
      )
      .order(
        "area",
        {
          ascending:
            true,

          nullsFirst:
            false
        }
      )
      .order(
        "created_at",
        {
          ascending:
            false
        }
      )
      .limit(
        1000
      );


  if (error) {
    console.error("Não foi possível carregar a biblioteca do Caderno de Erros:",error);
    setErrorLibraryStatus("Não foi possível carregar seus cadernos. Atualize a página ou entre novamente.","error");
    const empty=document.getElementById("error-library-empty"); if(empty){empty.hidden=false;empty.textContent="Falha ao consultar seus cadernos."}
    return;
  }


  errorLibraryItems = Array.isArray(data) ? data : [];
  console.info("[Caderno de Erros] registros carregados:",errorLibraryItems.length);
  populateLibraryAreas();
  /* O Pulo do Gato não pode depender da renderização dos cadernos.
     Pinta assim que a consulta termina, mesmo que algum card da biblioteca falhe. */
  startErrorSpotlight();
  renderErrorHomeExtras();
  try {
    renderErrorLibrary();
  } catch (renderError) {
    console.error("Falha ao renderizar biblioteca; mantendo Pulo do Gato disponível:",renderError);
    setErrorLibraryStatus("Os dados foram carregados, mas houve uma falha ao montar os cadernos.","error");
  }
}




function setErrorHomeMode(mode){
  errorHomeState=mode||"review-home";
  const reviewMode=errorHomeState==="review-home";
  const layout=document.querySelector(".error-home-layout");
  const reviewContent=document.getElementById("error-review-home-content");
  const libraryPanel=document.querySelector('[data-error-section="library"]');
  layout?.classList.toggle("review-mode",reviewMode);
  if(reviewContent)reviewContent.hidden=!reviewMode;
  if(libraryPanel)libraryPanel.hidden=reviewMode;
  document.querySelectorAll("[data-error-state]").forEach(button=>{
    button.classList.toggle("active",button.dataset.errorState===errorHomeState);
  });
  if(!reviewMode)renderErrorLibrary();
}

function wireErrorLibrary() {
  document.querySelectorAll("[data-error-state]").forEach(button=>button.addEventListener("click",()=>setErrorHomeMode(button.dataset.errorState||"review-home")));
  document.querySelectorAll("[data-error-home-back]").forEach(button=>button.addEventListener("click",()=>switchErrorTab("library")));
  document.getElementById("error-start-home-review")?.addEventListener("click",()=>openErrorReviewPage({mode:"today"}));
  document.getElementById("error-review-home-now")?.addEventListener("click",()=>openErrorReviewPage({mode:"today"}));
  document.getElementById("error-review-home-create")?.addEventListener("click",()=>{
    setErrorHomeMode("all");
    setErrorLibraryStatus("Abra um caderno e use Selecionar para montar uma revisão personalizada.","success");
  });
  (document.getElementById("error-review-home-today-list")||document.getElementById("error-today-list"))?.addEventListener("click",event=>{const button=event.target.closest("[data-home-review-id]");if(!button)return;openErrorReviewPage({mode:"today",item:button.dataset.homeReviewId})});

  document
    .querySelectorAll(
      "[data-error-tab]"
    )
    .forEach(
      (button) => {
        button.addEventListener(
          "click",
          () =>
            switchErrorTab(
              button.dataset
                .errorTab
            )
        );
      }
    );


  document
    .getElementById(
      "error-library-area"
    )
    ?.addEventListener(
      "change",
      () => {
        syncErrorLibraryAreaPicker();
        renderErrorLibrary();
      }
    );

  const areaToggle=document.getElementById("error-library-area-toggle");
  const areaMenu=document.getElementById("error-library-area-menu");
  const closeAreaPicker=()=>{
    if(areaMenu)areaMenu.hidden=true;
    areaToggle?.setAttribute("aria-expanded","false");
  };
  areaToggle?.addEventListener("click",(event)=>{
    event.stopPropagation();
    if(!areaMenu)return;
    const open=areaMenu.hidden;
    areaMenu.hidden=!open;
    areaToggle.setAttribute("aria-expanded",String(open));
  });
  areaMenu?.addEventListener("click",(event)=>{
    const option=event.target.closest("[data-error-library-area-value]");
    if(!option)return;
    const select=document.getElementById("error-library-area");
    if(!select)return;
    select.value=option.dataset.errorLibraryAreaValue||"";
    select.dispatchEvent(new Event("change",{bubbles:true}));
    closeAreaPicker();
  });
  document.addEventListener("click",(event)=>{
    if(!event.target.closest(".error-library-area-picker"))closeAreaPicker();
  });


  document
    .getElementById(
      "error-library-search"
    )
    ?.addEventListener(
      "input",
      renderErrorLibrary
    );


  document
    .getElementById(
      "error-library-select-all"
    )
    ?.addEventListener(
      "change",
      (event) => {
        const ids =
          filteredErrorLibrary()
            .map(
              (item) =>
                item.id
            );


        for (
          const id
          of ids
        ) {
          if (
            event.target.checked
          ) {
            selectedErrorIds.add(
              id
            );

          } else {
            selectedErrorIds.delete(
              id
            );
          }
        }


        renderErrorLibrary();
      }
    );


  document
    .getElementById(
      "error-library-export-selected"
    )
    ?.addEventListener(
      "click",
      exportSelectedErrorsPdf
    );

  document
    .getElementById(
      "error-library-delete-selected"
    )
    ?.addEventListener(
      "click",
      deleteSelectedErrors
    );


  document
    .getElementById(
      "error-edit-save"
    )
    ?.addEventListener(
      "click",
      saveEditedError
    );


  document
    .getElementById(
      "error-edit-extract-image"
    )
    ?.addEventListener(
      "click",
      () => extractStoredErrorImageText(false)
    );

  document
    .getElementById(
      "error-edit-extract-image-keep"
    )
    ?.addEventListener(
      "click",
      () => extractStoredErrorImageText(true)
    );

  document
    .getElementById(
      "error-edit-delete-image"
    )
    ?.addEventListener(
      "click",
      deleteEditingErrorImage
    );


  [
    "error-edit-close",
    "error-edit-cancel"
  ].forEach(
    (id) => {
      document
        .getElementById(
          id
        )
        ?.addEventListener(
          "click",
          closeErrorEditDialog
        );
    }
  );


  const reviewTrigger =
    document.getElementById(
      "error-review-menu-trigger"
    );

  const reviewMenu =
    document.getElementById(
      "error-review-menu"
    );


  reviewTrigger?.addEventListener(
    "click",
    (event) => {
      event.stopPropagation();


      const open =
        reviewMenu?.hidden;


      closeErrorReviewMenu();


      if (
        reviewMenu
      ) {
        reviewMenu.hidden =
          !open;
      }


      reviewTrigger.setAttribute(
        "aria-expanded",
        open
          ? "true"
          : "false"
      );
    }
  );


  reviewMenu?.addEventListener(
    "click",
    (event) =>
      event.stopPropagation()
  );


  document
    .getElementById(
      "error-review-edit"
    )
    ?.addEventListener(
      "click",
      () => {
        const item =
          currentErrorReviewItem();


        closeErrorReviewMenu();


        if (item) {
          openErrorEditDialog(
            item.id
          );
        }
      }
    );


  document
    .getElementById(
      "error-review-delete"
    )
    ?.addEventListener(
      "click",
      async () => {
        const item =
          currentErrorReviewItem();


        closeErrorReviewMenu();


        if (item) {
          await deleteErrorFromLibrary(
            item.id
          );

          await renderCurrentError();
        }
      }
    );


  document
    .getElementById(
      "error-import-file"
    )
    ?.addEventListener(
      "change",
      async (event) => {
        const file =
          event.target
            .files?.[0]
          || null;


        importedErrorRows =
          [];


        renderErrorImportPreview();


        if (!file) {
          return;
        }


        const status =
          document.getElementById(
            "error-import-status"
          );


        try {
          status.textContent =
            "Lendo planilha...";

          status.className =
            "error-status";


          const workbook =
            XLSX.read(
              await file.arrayBuffer(),
              {
                type:
                  "array"
              }
            );


          importedErrorRows =
            parseErrorImportRows(
              workbook
            );


          if (
            !importedErrorRows.length
          ) {
            throw new Error(
              "Nenhuma linha com Pulo do Gato foi encontrada."
            );
          }


          renderErrorImportPreview();


          status.textContent =
            `${importedErrorRows.length} item${importedErrorRows.length === 1 ? "" : "s"} pronto${importedErrorRows.length === 1 ? "" : "s"} para importar.`;

          status.className =
            "error-status success";


        } catch (error) {
          console.error(
            error
          );


          status.textContent =
            error.message
            || "Não foi possível ler o arquivo.";

          status.className =
            "error-status error";
        }
      }
    );


  document
    .getElementById(
      "error-import-confirm"
    )
    ?.addEventListener(
      "click",
      importErrorRows
    );


  document.addEventListener(
    "click",
    () => {
      closeErrorLibraryMenus();
      closeErrorReviewMenu();
    }
  );


  document.addEventListener(
    "keydown",
    (event) => {
      if (
        event.key ===
        "Escape"
      ) {
        closeErrorLibraryMenus();
        closeErrorReviewMenu();
      }
    }
  );
}





function wireErrorNavigationRecovery() {
  if (document.documentElement.dataset.errorNavigationRecovery === "1") return;
  document.documentElement.dataset.errorNavigationRecovery = "1";

  document.addEventListener("click", (event) => {
    const tabButton = event.target.closest("[data-error-tab]");
    if (tabButton) {
      event.preventDefault();
      switchErrorTab(tabButton.dataset.errorTab || "library");
      return;
    }

    const backButton = event.target.closest("[data-error-home-back]");
    if (backButton) {
      event.preventDefault();
      switchErrorTab("library");
    }
  });
}

wireErrorNavigationRecovery();

/* =========================================================
   INICIALIZAÇÃO
   ========================================================= */

window.addEventListener(
  "luria:study-mode",
  () => {
    loadErrorAreas();
    populateLibraryAreas();
  }
);


async function initErrorNotebook() {
  errorUser =
    window.docmapUser;

  errorSb = window.supabaseClient || errorSb;
  if (!errorSb) {
    setErrorLibraryStatus("Conexão com o banco ainda não está pronta. Tentando novamente...","error");
    setTimeout(initErrorNotebook,250);
    return;
  }

  if (document.documentElement.dataset.errorNotebookInitialized === "1") {
    await Promise.allSettled([
      loadErrorMetrics(),
      loadErrorAreas(),
      loadErrorLibrary(),
      loadErrorQueue()
    ]);
    return;
  }
  document.documentElement.dataset.errorNotebookInitialized = "1";

  wireNewError();

  wireErrorReview();

  wireErrorLibrary();


  const initialLoads = await Promise.allSettled([
    loadErrorMetrics(),
    loadErrorAreas(),
    loadErrorLibrary()
  ]);

  initialLoads.forEach((result, index) => {
    if (result.status === "rejected") {
      console.error("[Caderno de Erros] falha parcial na inicialização", index, result.reason);
    }
  });

  try {
    await loadErrorQueue();
  } catch (error) {
    console.error("[Caderno de Erros] fila de revisão não carregou, mantendo biblioteca disponível:", error);
  }

  switchErrorTab("library");
  setErrorHomeMode("review-home");
}


if (window.docmapUser) {
  initErrorNotebook();
} else {
  window.addEventListener("docmap:ready",initErrorNotebook,{once:true});
  /* app.js pode disparar docmap:ready antes deste bundle terminar de executar.
     Recupera também desse race sem depender exclusivamente do evento. */
  let errorBootTries=0;
  const errorBootTimer=setInterval(()=>{
    errorBootTries+=1;
    if(window.docmapUser){
      clearInterval(errorBootTimer);
      initErrorNotebook();
    } else if(errorBootTries>=40){
      clearInterval(errorBootTimer);
      setErrorLibraryStatus("Não foi possível iniciar o Caderno de Erros. Reabra a página.","error");
    }
  },250);
}
