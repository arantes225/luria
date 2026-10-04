const settingsSb = window.supabaseClient;

const WEEKDAYS = [
  { value: 1, label: "Seg" },
  { value: 2, label: "Ter" },
  { value: 3, label: "Qua" },
  { value: 4, label: "Qui" },
  { value: 5, label: "Sex" },
  { value: 6, label: "Sáb" },
  { value: 7, label: "Dom" }
];

const SETTINGS_FIELDS = [
  "flashcard_weekdays",
  "theory_study_weekdays",
  "theory_review_weekdays",
  "error_weekdays",
  "question_weekdays"
];

let settingsUser = null;

function settingsProfileCacheKey(userId) {
  return `docmap:profile:${userId}`;
}

function cacheProfile(userId, profile) {
  try {
    localStorage.setItem(
      settingsProfileCacheKey(userId),
      JSON.stringify(profile)
    );
  } catch {}
}


async function invokeSettingsNotionFunction(name, body = {}) {
  const { data, error } = await settingsSb.functions.invoke(name, { body });
  if (error) {
    const message = error?.context?.body?.message || error?.message || "Falha na integração com o Notion.";
    throw new Error(message);
  }
  if (data?.error) throw new Error(data.message || data.error);
  return data || {};
}

async function refreshSettingsNotionConnection() {
  const status = document.getElementById("settings-notion-status");
  const connect = document.getElementById("settings-notion-connect");
  const disconnect = document.getElementById("settings-notion-disconnect");

  if (!status || !connect || !disconnect) return;

  status.textContent = "Verificando conexão...";

  try {
    const state = await invokeSettingsNotionFunction("notion-api", { action:"status" });
    const connected = Boolean(state?.connected);

    connect.hidden = connected;
    disconnect.hidden = !connected;

    status.textContent = connected
      ? "Conectado" + (state?.workspace_name ? " · " + state.workspace_name : "")
      : "Nenhuma conta do Notion conectada.";
  } catch (error) {
    console.error("Notion settings:", error);
    connect.hidden = false;
    disconnect.hidden = true;
    status.textContent = error?.message || "Não foi possível verificar a conexão.";
  }
}

async function connectSettingsNotion() {
  const button = document.getElementById("settings-notion-connect");
  if (button) button.disabled = true;

  try {
    const redirectTo = window.location.origin + "/configuracoes/?section=perfil&notion=connected";
    const result = await invokeSettingsNotionFunction("notion-auth", { redirect_to: redirectTo });
    if (!result?.url) throw new Error("Não foi possível iniciar a conexão.");
    window.location.assign(result.url);
  } catch (error) {
    console.error("Connect Notion settings:", error);
    if (button) button.disabled = false;
    window.LuriaDialog?.alert?.(error?.message || "Não foi possível conectar o Notion.");
  }
}

async function disconnectSettingsNotion() {
  const ok = await window.LuriaDialog?.confirm?.("Desconectar o Notion desta conta?");
  if (ok === false) return;

  const button = document.getElementById("settings-notion-disconnect");
  if (button) button.disabled = true;

  try {
    await invokeSettingsNotionFunction("notion-api", { action:"disconnect" });
    await refreshSettingsNotionConnection();
  } catch (error) {
    console.error("Disconnect Notion settings:", error);
    window.LuriaDialog?.alert?.(error?.message || "Não foi possível desconectar o Notion.");
  } finally {
    if (button) button.disabled = false;
  }
}

function wireSettingsNotionConnection() {
  const connect = document.getElementById("settings-notion-connect");
  const disconnect = document.getElementById("settings-notion-disconnect");

  if (connect && connect.dataset.bound !== "1") {
    connect.dataset.bound = "1";
    connect.addEventListener("click", connectSettingsNotion);
  }

  if (disconnect && disconnect.dataset.bound !== "1") {
    disconnect.dataset.bound = "1";
    disconnect.addEventListener("click", disconnectSettingsNotion);
  }

  refreshSettingsNotionConnection();

  const params = new URLSearchParams(window.location.search);
  if (params.get("notion") === "connected") {
    const url = new URL(window.location.href);
    url.searchParams.delete("notion");
    window.history.replaceState({}, "", url);
  }
}


function setProfileStatus(text, type = "") {
  const element = document.getElementById("profile-status");
  if (!element) return;
  element.textContent = text;
  element.className = `profile-status ${type}`.trim();
}


function normalizeUsername(value) {
  return String(value || "")
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9._-]/g, "")
    .slice(0, 30);
}

function validUsername(value) {
  return /^[a-z0-9][a-z0-9._-]{2,29}$/.test(String(value || ""));
}

const PROFILE_GENDER_OPTIONS = [
  { value: "", label: "Selecione" },
  { value: "male", label: "Masculino" },
  { value: "female", label: "Feminino" },
  { value: "other", label: "Outro" },
  { value: "prefer_not_to_say", label: "Prefiro não informar" }
];

function buildProfilePicker(menuId, toggleId, options, onSelect) {
  const menu = document.getElementById(menuId);
  const toggle = document.getElementById(toggleId);
  if (!menu || !toggle) return;

  menu.innerHTML = options.map((item) => `
    <button
      type="button"
      class="profile-picker-option"
      data-profile-picker-value="${item.value}"
      role="option"
    >${item.label}</button>
  `).join("");

  menu.querySelectorAll("[data-profile-picker-value]").forEach((option) => {
    option.addEventListener("click", () => {
      onSelect(option.dataset.profilePickerValue || "");
      menu.hidden = true;
      toggle.setAttribute("aria-expanded", "false");
      syncProfilePickerLabels();
    });
  });

  toggle.addEventListener("click", (event) => {
    event.preventDefault();
    event.stopPropagation();
    const willOpen = menu.hidden;
    closeProfilePickers(willOpen ? menuId : null);
    menu.hidden = !willOpen;
    toggle.setAttribute("aria-expanded", willOpen ? "true" : "false");
  });
}

function wireProfilePickers() {
  buildProfilePicker(
    "profile-gender-menu",
    "profile-gender-toggle",
    PROFILE_GENDER_OPTIONS,
    (value) => {
      const input = document.getElementById("profile-gender");
      if (input) {
        input.value = value;
        input.dispatchEvent(new Event("change", { bubbles: true }));
      }
    }
  );

  document.addEventListener("click", (event) => {
    if (!event.target.closest(".profile-picker")) closeProfilePickers();
  });

  syncProfilePickerLabels();
}

function closeProfilePickers(except = null) {
  [
    ["profile-gender-menu", "profile-gender-toggle"]
  ].forEach(([menuId, toggleId]) => {
    if (except === menuId) return;
    const menu = document.getElementById(menuId);
    const toggle = document.getElementById(toggleId);
    if (menu) menu.hidden = true;
    toggle?.setAttribute("aria-expanded", "false");
  });
}

function syncProfilePickerLabels() {
  const gender = document.getElementById("profile-gender")?.value || "";
  const genderLabel = document.getElementById("profile-gender-label");
  if (genderLabel) {
    genderLabel.textContent =
      PROFILE_GENDER_OPTIONS.find((item) => item.value === gender)?.label
      || "Selecione";
  }
}

async function loadProfileSettings() {
  const { data, error } = await settingsSb
    .from("profiles")
    .select("display_name, username, gender, medical_school, is_graduated")
    .eq("user_id", settingsUser.id)
    .maybeSingle();

  if (error) {
    console.error(error);
    setProfileStatus(
      `Não foi possível carregar o perfil: ${error.message}`,
      "error"
    );
    return;
  }

  document.getElementById("profile-name").value =
    data?.display_name || "";

  const usernameInput = document.getElementById("profile-username");
  if (usernameInput) usernameInput.value = data?.username || "";

  document.getElementById("profile-gender").value =
    data?.gender || "";

  const schoolInput = document.getElementById("profile-medical-school");
  if (schoolInput) schoolInput.value = data?.medical_school || "";

  document.querySelectorAll('input[name="profile-graduated"]').forEach((input) => {
    input.checked =
      data?.is_graduated === true
        ? input.value === "true"
        : data?.is_graduated === false
          ? input.value === "false"
          : false;
  });

  syncProfilePickerLabels();
}

async function saveProfileSettings() {
  // Não dependa do timing do app.js/docmap:ready para salvar o perfil.
  // Em páginas restauradas do cache/PWA, o botão pode ser clicado antes de
  // window.docmapUser ser preenchido. Recupera a sessão diretamente do Supabase.
  if (!settingsUser?.id) {
    settingsUser = window.docmapUser || null;

    if (!settingsUser?.id) {
      const { data: authData, error: authError } = await settingsSb.auth.getUser();

      if (authError || !authData?.user?.id) {
        console.error("Não foi possível resolver o usuário para salvar o perfil:", authError);
        setProfileStatus("Sua sessão ainda não está pronta. Reabra esta página e tente novamente.", "error");
        return;
      }

      settingsUser = authData.user;
    }
  }

  const nameInput = document.getElementById("profile-name");
  if (!nameInput) {
    setProfileStatus("Não foi possível localizar os campos do perfil.", "error");
    return;
  }

  const name =
    nameInput.value.trim();

  const username =
    normalizeUsername(document.getElementById("profile-username")?.value);

  const gender =
    document.getElementById("profile-gender").value || null;

  const medicalSchool =
    document.getElementById("profile-medical-school")?.value.trim() || "";

  const graduationChoice =
    document.querySelector('input[name="profile-graduated"]:checked');

  const isGraduated =
    graduationChoice
      ? graduationChoice.value === "true"
      : null;

  if (!name) {
    setProfileStatus(
      "Informe o nome que deve aparecer no DocMap.",
      "error"
    );
    return;
  }

  if (username && !validUsername(username)) {
    setProfileStatus(
      "Nome de usuário inválido. Use 3–30 caracteres: letras minúsculas, números, ponto, hífen ou _.",
      "error"
    );
    return;
  }

  if (username) {
    const { data: duplicate, error: duplicateError } = await settingsSb
      .from("profiles")
      .select("user_id")
      .eq("username", username)
      .neq("user_id", settingsUser.id)
      .maybeSingle();

    if (duplicateError) {
      setProfileStatus("Não foi possível validar o nome de usuário.", "error");
      return;
    }

    if (duplicate) {
      setProfileStatus("Esse nome de usuário já está em uso. Escolha outro.", "error");
      return;
    }
  }

  const button = document.getElementById("save-profile");
  button.disabled = true;
  setProfileStatus("Salvando...");

  const { data, error } = await settingsSb
    .from("profiles")
    .upsert(
      {
        user_id: settingsUser.id,
        display_name: name,
        username: username || null,
        gender,
        medical_school: medicalSchool || null,
        is_graduated: isGraduated
      },
      {
        onConflict: "user_id"
      }
    )
    .select("display_name, username, gender, medical_school, is_graduated")
    .single();

  button.disabled = false;

  if (error) {
    console.error(error);
    setProfileStatus(
      error.code === "23505"
        ? "Esse nome de usuário já está em uso. Escolha outro."
        : `Não foi possível salvar o perfil: ${error.message}`,
      "error"
    );
    return;
  }

  if (!data) {
    setProfileStatus(
      "O perfil não foi gravado. Atualize a página e tente novamente.",
      "error"
    );
    return;
  }

  cacheProfile(settingsUser.id, data);

  setProfileStatus(
    "Perfil salvo. Atualizando menu lateral...",
    "success"
  );


  setTimeout(() => {
    window.location.reload();
  }, 450);
}

function wireProfileSettings() {
  wireProfilePickers();

  const button = document.getElementById("save-profile");
  if (!button || button.dataset.profileSaveBound === "1") return;

  button.dataset.profileSaveBound = "1";
  button.addEventListener("click", (event) => {
    event.preventDefault();
    saveProfileSettings().catch((error) => {
      console.error("Falha inesperada ao salvar perfil:", error);
      button.disabled = false;
      setProfileStatus("Não foi possível salvar o perfil. Tente novamente.", "error");
    });
  });
}

/*
 * Fallback resiliente: a página de Configurações possui blocos/tabs que podem ser
 * reorganizados sem recriar o script. Se a inicialização assíncrona não chegar a
 * wireProfileSettings(), o clique no botão continua funcionando por delegação.
 */
if (!document.documentElement.dataset.profileSaveDelegated) {
  document.documentElement.dataset.profileSaveDelegated = "1";

  document.addEventListener("click", (event) => {
    const button = event.target.closest?.("#save-profile");
    if (!button || button.dataset.profileSaveBound === "1") return;

    event.preventDefault();

    // saveProfileSettings resolve a sessão diretamente se app.js ainda não
    // tiver preenchido window.docmapUser.
    settingsUser = settingsUser || window.docmapUser || null;

    saveProfileSettings().catch((error) => {
      console.error("Falha inesperada ao salvar perfil:", error);
      button.disabled = false;
      setProfileStatus("Não foi possível salvar o perfil. Tente novamente.", "error");
    });
  });
}


function renderWeekdayGroups() {
  document.querySelectorAll("[data-weekday-group]").forEach((container) => {
    const field = container.dataset.weekdayGroup;

    container.innerHTML = WEEKDAYS.map((day) => `
      <label class="weekday-option">
        <input
          type="checkbox"
          value="${day.value}"
          data-weekday-field="${field}"
        >
        <span>${day.label}</span>
      </label>
    `).join("");
  });
}

function getSelectedDays(field) {
  return Array.from(
    document.querySelectorAll(
      `[data-weekday-field="${field}"]:checked`
    )
  )
    .map((input) => Number(input.value))
    .sort((a, b) => a - b);
}

function setSelectedDays(field, days) {
  const selected = new Set(
    Array.isArray(days) && days.length
      ? days.map(Number)
      : [1,2,3,4,5,6,7]
  );

  document.querySelectorAll(
    `[data-weekday-field="${field}"]`
  ).forEach((input) => {
    input.checked = selected.has(Number(input.value));
  });
}


function setFlashcardIntervalsStatus(text, type = "") {
  const element =
    document.getElementById("flashcard-intervals-status");

  if (!element) return;

  element.textContent = text;
  element.className =
    `settings-save-status ${type}`.trim();
}

function setIntervalInputs(field, values) {
  const safeValues =
    Array.isArray(values) && values.length
      ? values
      : [1, 1, 1];

  document
    .querySelectorAll(
      `[data-interval-field="${field}"]`
    )
    .forEach((input) => {
      const index =
        Number(input.dataset.intervalIndex);

      input.value =
        safeValues[
          Math.min(
            index,
            safeValues.length - 1
          )
        ] ?? 1;
    });
}

function readIntervalInputs(field) {
  const inputs =
    Array.from(
      document.querySelectorAll(
        `[data-interval-field="${field}"]`
      )
    ).sort(
      (a, b) =>
        Number(a.dataset.intervalIndex)
        - Number(b.dataset.intervalIndex)
    );

  const values =
    inputs.map(
      (input) =>
        Number(input.value)
    );

  if (
    values.some(
      (value) =>
        !Number.isInteger(value)
        || value < 1
        || value > 3650
    )
  ) {
    return null;
  }

  return values;
}

async function saveFlashcardIntervals() {
  const hard =
    readIntervalInputs(
      "flashcard_intervals_hard"
    );

  const medium =
    readIntervalInputs(
      "flashcard_intervals_medium"
    );

  const easy =
    readIntervalInputs(
      "flashcard_intervals_easy"
    );

  if (!hard || !medium || !easy) {
    setFlashcardIntervalsStatus(
      "Use apenas dias inteiros entre 1 e 3650.",
      "error"
    );

    return;
  }

  const button =
    document.getElementById(
      "save-flashcard-intervals"
    );

  button.disabled = true;

  setFlashcardIntervalsStatus(
    "Salvando..."
  );

  const {
    error
  } = await settingsSb
    .from("user_settings")
    .upsert(
      {
        user_id:
          settingsUser.id,

        flashcard_intervals_hard:
          hard,

        flashcard_intervals_medium:
          medium,

        flashcard_intervals_easy:
          easy
      },
      {
        onConflict:
          "user_id"
      }
    );

  button.disabled = false;

  if (error) {
    console.error(error);

    setFlashcardIntervalsStatus(
      `Não foi possível salvar: ${error.message}`,
      "error"
    );

    return;
  }

  setFlashcardIntervalsStatus(
    "Intervalos salvos.",
    "success"
  );
}


function setStudyDaysStatus(text, type = "") {
  const el = document.getElementById("study-days-status");
  el.textContent = text;
  el.className = `settings-save-status ${type}`.trim();
}

async function loadStudySettings() {
  const { data, error } = await settingsSb
    .from("user_settings")
    .select(`
      flashcard_weekdays,
      theory_study_weekdays,
      theory_review_weekdays,
      error_weekdays,
      question_weekdays,
      max_lessons_per_day,
      max_subject_reviews_per_day,
      flashcard_intervals_hard,
      flashcard_intervals_medium,
      flashcard_intervals_easy,
      error_review_interval_days,
      error_review_intervals,
      subject_review_intervals,
      pomodoro_focus_minutes,
      pomodoro_break_minutes
    `)
    .eq("user_id", settingsUser.id)
    .maybeSingle();

  if (error) {
    console.error(error);
    setStudyDaysStatus(
      `Não foi possível carregar as configurações: ${error.message}`,
      "error"
    );
    return;
  }

  const settings = data || {};

  SETTINGS_FIELDS.forEach((field) => {
    setSelectedDays(field, settings[field]);
  });

  document.getElementById("max-lessons-per-day").value =
    settings.max_lessons_per_day ?? 1;

  document.getElementById("max-subject-reviews").value =
    settings.max_subject_reviews_per_day ?? 3;

  setIntervalInputs(
    "flashcard_intervals_hard",
    settings.flashcard_intervals_hard || [1,3,7]
  );

  setIntervalInputs(
    "flashcard_intervals_medium",
    settings.flashcard_intervals_medium || [7,21,45]
  );

  setIntervalInputs(
    "flashcard_intervals_easy",
    settings.flashcard_intervals_easy || [15,45,70]
  );


  setIntervalInputs(
    "error_review_intervals",
    settings.error_review_intervals
      || [7,21,21,21,21,21]
  );

  setIntervalInputs(
    "subject_review_intervals",
    settings.subject_review_intervals
      || [7,14,30]
  );

  const pomodoroFocus =
    document.getElementById(
      "pomodoro-focus-minutes"
    );

  const pomodoroBreak =
    document.getElementById(
      "pomodoro-break-minutes"
    );

  if (pomodoroFocus) {
    pomodoroFocus.value =
      settings.pomodoro_focus_minutes
      ?? 25;
  }

  if (pomodoroBreak) {
    pomodoroBreak.value =
      settings.pomodoro_break_minutes
      ?? 5;
  }
}


function setPomodoroSettingsStatus(
  text,
  type = ""
) {
  const element =
    document.getElementById(
      "pomodoro-settings-status"
    );

  if (!element) return;

  element.textContent =
    text;

  element.className =
    `settings-save-status ${type}`
      .trim();
}


async function savePomodoroSettings() {
  const focus =
    Number(
      document
        .getElementById(
          "pomodoro-focus-minutes"
        )
        ?.value
    );

  const pause =
    Number(
      document
        .getElementById(
          "pomodoro-break-minutes"
        )
        ?.value
    );


  if (
    !Number.isInteger(focus)
    || focus < 1
    || focus > 240
    || !Number.isInteger(pause)
    || pause < 1
    || pause > 120
  ) {
    setPomodoroSettingsStatus(
      "Use foco entre 1 e 240 min e pausa entre 1 e 120 min.",
      "error"
    );

    return;
  }


  const button =
    document.getElementById(
      "save-pomodoro-settings"
    );

  if (button) {
    button.disabled =
      true;
  }


  setPomodoroSettingsStatus(
    "Salvando..."
  );


  const {
    error
  } =
    await settingsSb
      .from(
        "user_settings"
      )
      .upsert(
        {
          user_id:
            settingsUser.id,

          pomodoro_focus_minutes:
            focus,

          pomodoro_break_minutes:
            pause
        },
        {
          onConflict:
            "user_id"
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

    setPomodoroSettingsStatus(
      `Não foi possível salvar: ${error.message}`,
      "error"
    );

    return;
  }


  setPomodoroSettingsStatus(
    "Pomodoro salvo.",
    "success"
  );
}



function setErrorReviewSettingsStatus(
  text,
  type = ""
) {
  const element =
    document.getElementById(
      "error-review-settings-status"
    );

  if (!element) return;

  element.textContent =
    text;

  element.className =
    `settings-save-status ${type}`
      .trim();
}


async function saveErrorReviewSettings() {
  const intervals =
    readIntervalInputs(
      "error_review_intervals"
    );

  if (
    !intervals
    || intervals.length !== 6
  ) {
    setErrorReviewSettingsStatus(
      "Preencha os 6 intervalos com dias inteiros entre 1 e 3650.",
      "error"
    );

    return;
  }

  const button =
    document.getElementById(
      "save-error-review-settings"
    );

  if (button) {
    button.disabled =
      true;
  }

  setErrorReviewSettingsStatus(
    "Salvando..."
  );

  const {
    error
  } =
    await settingsSb
      .from(
        "user_settings"
      )
      .upsert(
        {
          user_id:
            settingsUser.id,

          error_review_intervals:
            intervals,

          /*
            Mantido por compatibilidade com versões antigas.
            O novo agendamento usa error_review_intervals.
          */
          error_review_interval_days:
            intervals[
              intervals.length - 1
            ]
        },
        {
          onConflict:
            "user_id"
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

    setErrorReviewSettingsStatus(
      `Não foi possível salvar: ${error.message}`,
      "error"
    );

    return;
  }

  setErrorReviewSettingsStatus(
    `Sequência salva: ${intervals.join(" + ")} dias.`,
    "success"
  );
}

function setSubjectReviewSettingsStatus(
  text,
  type = ""
) {
  const element =
    document.getElementById(
      "subject-review-settings-status"
    );

  if (!element) return;

  element.textContent =
    text;

  element.className =
    `settings-save-status ${type}`
      .trim();
}


async function saveSubjectReviewSettings() {
  const intervals =
    readIntervalInputs(
      "subject_review_intervals"
    );


  if (
    !intervals
    || intervals.length !== 3
  ) {
    setSubjectReviewSettingsStatus(
      "Use três intervalos inteiros entre 1 e 3650 dias.",
      "error"
    );

    return;
  }


  if (
    !(
      intervals[0]
      < intervals[1]
      && intervals[1]
      < intervals[2]
    )
  ) {
    setSubjectReviewSettingsStatus(
      "Os intervalos devem crescer: 1ª < 2ª < 3ª revisão.",
      "error"
    );

    return;
  }


  const button =
    document.getElementById(
      "save-subject-review-settings"
    );


  if (button) {
    button.disabled =
      true;
  }


  setSubjectReviewSettingsStatus(
    "Salvando..."
  );


  const {
    error
  } =
    await settingsSb
      .from(
        "user_settings"
      )
      .upsert(
        {
          user_id:
            settingsUser.id,

          subject_review_intervals:
            intervals
        },
        {
          onConflict:
            "user_id"
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

    setSubjectReviewSettingsStatus(
      `Não foi possível salvar: ${error.message}`,
      "error"
    );

    return;
  }


  setSubjectReviewSettingsStatus(
    "Revisões teóricas salvas.",
    "success"
  );
}


function setPasswordStatus(
  text,
  type = ""
) {
  const element =
    document.getElementById(
      "password-status"
    );

  if (!element) return;

  element.textContent =
    text;

  element.className =
    `settings-save-status ${type}`
      .trim();
}


function loadAccountSecurity() {
  const email = document.getElementById("account-email");
  const phone = document.getElementById("account-phone");

  if (email) email.value = settingsUser?.email || "";
  if (phone) phone.value = settingsUser?.phone || "";

  refreshQuickAccessAddress();
}

function currentProfileUsername() {
  return normalizeUsername(document.getElementById("profile-username")?.value);
}

function refreshQuickAccessAddress() {
  const el = document.getElementById("quick-access-address");
  if (!el) return;
  const username = currentProfileUsername();
  el.textContent = validUsername(username)
    ? `${location.origin}/${username}`
    : "Defina um nome de usuário válido no perfil.";
}

async function confirmCurrentPassword(password, statusId) {
  const email = settingsUser?.email || "";
  if (!password) {
    setAccountStatus(statusId, "Digite sua senha atual para confirmar sua identidade.", "error");
    return false;
  }
  if (!email) {
    setAccountStatus(statusId, "Não foi possível identificar o e-mail atual da conta.", "error");
    return false;
  }

  setAccountStatus(statusId, "Confirmando sua identidade...");
  const { data, error } = await settingsSb.auth.signInWithPassword({ email, password });
  if (error || data?.user?.id !== settingsUser.id) {
    setAccountStatus(statusId, "Senha atual incorreta.", "error");
    return false;
  }
  return true;
}

async function saveAccountEmail() {
  const button = document.getElementById("save-account-email");
  const email = document.getElementById("account-email")?.value.trim() || "";
  const password = document.getElementById("account-email-current-password")?.value || "";

  if (!email || !email.includes("@")) {
    setAccountStatus("account-email-status", "Digite um e-mail válido.", "error");
    return;
  }
  if (email.toLowerCase() === String(settingsUser?.email || "").toLowerCase()) {
    setAccountStatus("account-email-status", "Esse já é o e-mail atual da conta.", "error");
    return;
  }

  button.disabled = true;
  const confirmed = await confirmCurrentPassword(password, "account-email-status");
  if (!confirmed) {
    button.disabled = false;
    return;
  }

  setAccountStatus("account-email-status", "Enviando confirmação da troca...");
  const { error } = await settingsSb.auth.updateUser({ email });
  button.disabled = false;

  if (error) {
    setAccountStatus("account-email-status", `Não foi possível alterar: ${error.message}`, "error");
    return;
  }

  document.getElementById("account-email-current-password").value = "";
  setAccountStatus(
    "account-email-status",
    "Pedido enviado. A troca só entra em vigor depois da confirmação por e-mail.",
    "success"
  );
}

async function saveAccountPhone() {
  const button = document.getElementById("save-account-phone");
  const phoneInput = document.getElementById("account-phone");
  const phone = normalizePhone(phoneInput?.value);
  const password = document.getElementById("account-phone-current-password")?.value || "";

  if (!/^\+[1-9]\d{7,14}$/.test(phone)) {
    setAccountStatus("account-phone-status", "Digite o telefone com DDD; o país será +55 quando não informado.", "error");
    return;
  }
  if (phone === normalizePhone(settingsUser?.phone || "")) {
    setAccountStatus("account-phone-status", "Esse já é o telefone atual da conta.", "error");
    return;
  }

  if (phoneInput) phoneInput.value = phone;
  button.disabled = true;
  const confirmed = await confirmCurrentPassword(password, "account-phone-status");
  if (!confirmed) {
    button.disabled = false;
    return;
  }

  setAccountStatus("account-phone-status", "Enviando código de confirmação...");
  const { error } = await settingsSb.auth.updateUser({ phone });
  button.disabled = false;

  if (error) {
    setAccountStatus("account-phone-status", `Não foi possível alterar: ${error.message}`, "error");
    return;
  }

  document.getElementById("account-phone-current-password").value = "";
  setAccountStatus("account-phone-status", "Código enviado por SMS. Digite-o abaixo para confirmar.", "success");
}

async function verifyAccountPhone() {
  const button = document.getElementById("verify-account-phone");
  const phone = normalizePhone(document.getElementById("account-phone")?.value);
  const token = String(document.getElementById("account-phone-otp")?.value || "").replace(/\D/g, "");
  if (!/^\d{6}$/.test(token)) {
    setAccountStatus("account-phone-status", "Digite o código de 6 dígitos recebido por SMS.", "error");
    return;
  }
  button.disabled = true;
  setAccountStatus("account-phone-status", "Confirmando telefone...");
  const { error } = await settingsSb.auth.verifyOtp({ phone, token, type: "phone_change" });
  button.disabled = false;
  if (error) {
    setAccountStatus("account-phone-status", `Não foi possível confirmar: ${error.message}`, "error");
    return;
  }
  setAccountStatus("account-phone-status", "Telefone confirmado.", "success");
}

async function saveQuickAccessPin() {
  const button = document.getElementById("save-quick-access-pin");
  const pin = String(document.getElementById("quick-access-pin")?.value || "").replace(/\D/g, "");
  const confirmPin = String(document.getElementById("quick-access-pin-confirm")?.value || "").replace(/\D/g, "");
  const username = currentProfileUsername();

  if (!validUsername(username)) {
    setAccountStatus("quick-access-status", "Salve primeiro um nome de usuário válido no perfil.", "error");
    return;
  }
  if (!/^\d{4}$/.test(pin)) {
    setAccountStatus("quick-access-status", "O PIN precisa ter exatamente 4 dígitos.", "error");
    return;
  }
  if (pin !== confirmPin) {
    setAccountStatus("quick-access-status", "Os PINs não coincidem.", "error");
    return;
  }

  const { data: sessionData } = await settingsSb.auth.getSession();
  const token = sessionData?.session?.access_token;
  if (!token) {
    setAccountStatus("quick-access-status", "Sessão expirada. Entre novamente.", "error");
    return;
  }

  button.disabled = true;
  setAccountStatus("quick-access-status", "Salvando PIN...");
  try {
    const response = await fetch("https://sxdsfklllilhdyuamvvg.supabase.co/functions/v1/external-quick-chart", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "apikey": "sb_publishable_AQ5-Pn1knmBhSFyt5aMtjQ_XQynLJ_L",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify({ action: "set_pin", pin })
    });
    const data = await response.json().catch(() => ({}));
    if (!response.ok) throw new Error(data.error || "Não foi possível salvar o PIN.");
    document.getElementById("quick-access-pin").value = "";
    document.getElementById("quick-access-pin-confirm").value = "";
    refreshQuickAccessAddress();
    setAccountStatus("quick-access-status", "PIN salvo. Seu acesso externo está pronto.", "success");
  } catch (error) {
    setAccountStatus("quick-access-status", error?.message || "Não foi possível salvar o PIN.", "error");
  } finally {
    button.disabled = false;
  }
}


function setPasskeyStatus(text, type = "") {
  const element = document.getElementById("passkey-status");
  if (!element) return;
  element.textContent = text;
  element.className = `settings-save-status ${type}`.trim();
}

function passkeySupported() {
  return Boolean(
    window.isSecureContext
    && window.PublicKeyCredential
    && navigator.credentials
    && typeof settingsSb?.auth?.registerPasskey === "function"
  );
}

async function loadPasskeys() {
  const list = document.getElementById("passkey-list");
  const button = document.getElementById("register-passkey");
  if (!list || !button) return;

  if (!passkeySupported()) {
    button.disabled = false;
    list.textContent = "Este navegador ainda não disponibilizou o Face ID / Passkey para esta página.";
    return;
  }

  const { data, error } = await settingsSb.auth.passkey.list();

  if (error) {
    const message = String(error.message || error);
    if (message.toLowerCase().includes("passkey_disabled")) {
      list.textContent = "O servidor ainda não está aceitando Passkeys.";
    } else {
      list.textContent = "Não foi possível carregar as Passkeys cadastradas.";
    }
    return;
  }

  const passkeys = Array.isArray(data) ? data : [];
  if (!passkeys.length) {
    list.textContent = "Nenhuma Passkey cadastrada nesta conta.";
    return;
  }

  list.innerHTML = "";
  passkeys.forEach((passkey) => {
    const row = document.createElement("div");
    row.style.display = "flex";
    row.style.alignItems = "center";
    row.style.justifyContent = "space-between";
    row.style.gap = "10px";
    row.style.padding = "8px 0";
    row.style.borderBottom = "1px solid var(--border)";

    const label = document.createElement("span");
    label.textContent = passkey.friendly_name || "Passkey cadastrada";

    const remove = document.createElement("button");
    remove.type = "button";
    remove.className = "button secondary";
    remove.textContent = "Remover";
    remove.addEventListener("click", async () => {
      remove.disabled = true;
      setPasskeyStatus("Removendo Passkey...");
      const { error: deleteError } = await settingsSb.auth.passkey.delete({
        passkeyId: passkey.id
      });

      if (deleteError) {
        remove.disabled = false;
        setPasskeyStatus(
          `Não foi possível remover: ${deleteError.message}`,
          "error"
        );
        return;
      }

      setPasskeyStatus("Passkey removida.", "success");
      await loadPasskeys();
    });

    row.append(label, remove);
    list.appendChild(row);
  });
}

async function registerPasskey() {
  const button = document.getElementById("register-passkey");
  if (!button) return;

  if (!passkeySupported()) {
    setPasskeyStatus(
      "Este navegador ou dispositivo não oferece suporte a Passkeys.",
      "error"
    );
    return;
  }

  button.disabled = true;
  setPasskeyStatus("Confirme sua identidade no dispositivo...");

  try {
    const { data, error } = await settingsSb.auth.registerPasskey();

    if (error) {
      const message = String(error.message || error);
      setPasskeyStatus(
        message.toLowerCase().includes("passkey_disabled")
          ? "Passkeys ainda não estão habilitadas no servidor."
          : message,
        "error"
      );
      return;
    }

    setPasskeyStatus(
      `Passkey ativada${data?.friendly_name ? `: ${data.friendly_name}` : ""}.`,
      "success"
    );
    await loadPasskeys();
  } catch (error) {
    console.error("Falha ao cadastrar Passkey:", error);
    const name = String(error?.name || "");
    const message = String(error?.message || "");
    setPasskeyStatus(
      name === "NotAllowedError"
        ? "Cadastro cancelado, bloqueado ou não autorizado pelo dispositivo."
        : message.toLowerCase().includes("passkey_disabled")
          ? "Passkeys ainda não estão habilitadas no servidor."
          : message || "Não foi possível cadastrar a Passkey.",
      "error"
    );
  } finally {
    button.disabled = false;
  }
}

function wirePasskeySettings() {
  const button = document.getElementById("register-passkey");
  if (!button) return;

  button.disabled = false;
  button.addEventListener("click", registerPasskey);

  if (!passkeySupported()) {
    setPasskeyStatus(
      window.isSecureContext
        ? "Face ID / Passkey não está disponível neste navegador ou modo de abertura."
        : "Face ID / Passkey exige uma conexão HTTPS segura.",
      "error"
    );
  }
}

function setOtherSessionsStatus(text, type = "") {
  const element = document.getElementById("other-sessions-status");
  if (!element) return;
  element.textContent = text;
  element.className = `settings-save-status ${type}`.trim();
}

async function signOutOtherBrowsers() {
  const button = document.getElementById("signout-other-browsers");
  if (!button) return;

  const confirmed = window.confirm(
    "Encerrar as outras sessões da sua conta? Este navegador continuará conectado."
  );
  if (!confirmed) return;

  button.disabled = true;
  setOtherSessionsStatus("Encerrando outras sessões...");

  try {
    const { error } = await settingsSb.auth.signOut({ scope: "others" });

    if (error) throw error;

    setOtherSessionsStatus(
      "Outros navegadores foram desconectados.",
      "success"
    );
  } catch (error) {
    console.error(error);
    setOtherSessionsStatus(
      `Não foi possível encerrar as outras sessões: ${error?.message || error}`,
      "error"
    );
  } finally {
    button.disabled = false;
  }
}

async function savePassword() {
  const currentPassword =
    document
      .getElementById(
        "current-password"
      )
      ?.value
    || "";


  const password =
    document
      .getElementById(
        "new-password"
      )
      ?.value
    || "";


  const confirm =
    document
      .getElementById(
        "confirm-password"
      )
      ?.value
    || "";


  const email =
    settingsUser?.email
    || "";


  if (
    !currentPassword
  ) {
    setPasswordStatus(
      "Digite sua senha atual.",
      "error"
    );

    return;
  }


  if (
    password.length < 8
  ) {
    setPasswordStatus(
      "A nova senha deve ter pelo menos 8 caracteres.",
      "error"
    );

    return;
  }


  if (
    password !== confirm
  ) {
    setPasswordStatus(
      "As novas senhas não coincidem.",
      "error"
    );

    return;
  }


  if (
    currentPassword === password
  ) {
    setPasswordStatus(
      "A nova senha deve ser diferente da senha atual.",
      "error"
    );

    return;
  }


  if (!email) {
    setPasswordStatus(
      "Não foi possível identificar o e-mail da conta.",
      "error"
    );

    return;
  }


  const button =
    document.getElementById(
      "save-password"
    );


  if (button) {
    button.disabled =
      true;
  }


  setPasswordStatus(
    "Confirmando senha atual..."
  );


  /*
    O Supabase não exige a senha atual diretamente no updateUser.
    Para o DocMap exigir essa confirmação, fazemos uma nova
    autenticação com o e-mail da sessão + senha atual antes de
    permitir a troca.
  */

  const {
    data:
      reauthData,

    error:
      reauthError
  } =
    await settingsSb.auth
      .signInWithPassword({
        email,
        password:
          currentPassword
      });


  if (reauthError) {
    if (button) {
      button.disabled =
        false;
    }


    console.error(
      reauthError
    );


    setPasswordStatus(
      "Senha atual incorreta.",
      "error"
    );

    return;
  }


  if (
    reauthData?.user?.id
    !== settingsUser.id
  ) {
    if (button) {
      button.disabled =
        false;
    }


    setPasswordStatus(
      "Não foi possível confirmar esta conta.",
      "error"
    );

    return;
  }


  setPasswordStatus(
    "Alterando senha..."
  );


  const {
    error
  } =
    await settingsSb.auth
      .updateUser({
        password
      });


  if (button) {
    button.disabled =
      false;
  }


  if (error) {
    console.error(
      error
    );

    setPasswordStatus(
      `Não foi possível alterar a senha: ${error.message}`,
      "error"
    );

    return;
  }


  [
    "current-password",
    "new-password",
    "confirm-password"
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


  setPasswordStatus(
    "Senha alterada com sucesso.",
    "success"
  );
}

async function saveStudySettings() {
  const payload = {};

  for (const field of SETTINGS_FIELDS) {
    const days = getSelectedDays(field);

    if (!days.length) {
      setStudyDaysStatus(
        "Cada categoria precisa ter pelo menos um dia selecionado.",
        "error"
      );
      return;
    }

    payload[field] = days;
  }

  const maxLessons =
    Number(
      document
        .getElementById(
          "max-lessons-per-day"
        )
        .value
    );


  if (
    !Number.isInteger(maxLessons)
    || maxLessons < 1
    || maxLessons > 50
  ) {
    setStudyDaysStatus(
      "O máximo de aulas por dia deve ser um número entre 1 e 50.",
      "error"
    );

    return;
  }


  payload.max_lessons_per_day =
    maxLessons;


  const maxReviews =
    Number(document.getElementById("max-subject-reviews").value);

  if (
    !Number.isInteger(maxReviews)
    || maxReviews < 1
    || maxReviews > 50
  ) {
    setStudyDaysStatus(
      "O limite diário deve ser um número entre 1 e 50.",
      "error"
    );
    return;
  }

  payload.max_subject_reviews_per_day = maxReviews;

  const button = document.getElementById("save-study-days");
  button.disabled = true;

  setStudyDaysStatus("Salvando...");

  const { error } = await settingsSb
    .from("user_settings")
    .upsert(
      {
        user_id: settingsUser.id,
        ...payload
      },
      {
        onConflict: "user_id"
      }
    );

  button.disabled = false;

  if (error) {
    console.error(error);
    setStudyDaysStatus(
      `Não foi possível salvar: ${error.message}`,
      "error"
    );
    return;
  }

  setStudyDaysStatus(
    "Dias de estudo salvos.",
    "success"
  );
}



function setTargetExamsStatus(text, type = "") {
  const el = document.getElementById("target-exams-status");
  if (!el) return;
  el.textContent = text;
  el.className = `settings-save-status ${type}`.trim();
}

let targetExamOrder = [];
const TARGET_EXAM_WEIGHTS = [50, 30, 20];

function selectedTargetExams() {
  return [...targetExamOrder];
}

function syncTargetExamUi() {
  const grid = document.getElementById("target-exam-grid");
  if (!grid) return;

  grid.querySelectorAll('input[type="checkbox"]').forEach((input) => {
    const position = targetExamOrder.indexOf(input.value);
    input.checked = position >= 0;
    const badge = input.closest(".target-exam-option")?.querySelector(".target-exam-rank");
    if (badge) {
      badge.textContent = position >= 0
        ? `${position + 1}ª · ${TARGET_EXAM_WEIGHTS[position]}%`
        : "";
      badge.hidden = position < 0;
    }
  });

  const count = document.getElementById("target-exam-count");
  if (count) count.textContent = `${targetExamOrder.length}/3`;

  const summary = document.getElementById("target-exam-priority-summary");
  if (summary) {
    summary.innerHTML = TARGET_EXAM_WEIGHTS.map((weight,index) => {
      const exam = targetExamOrder[index] || "";
      return `
        <div class="target-exam-slot ${exam ? "filled" : ""}">
          <span>${index + 1}ª escolha · ${weight}% do peso</span>
          <strong>${exam || "Nenhuma prova selecionada"}</strong>
        </div>
      `;
    }).join("");
  }
}

function renderTargetExamOptions() {
  const grid = document.getElementById("target-exam-grid");
  const exams = [...(window.LuriaExamPriority?.exams || [])]
    .sort((a,b)=>String(a).localeCompare(String(b),"pt-BR",{sensitivity:"base"}));
  if (!grid) return;

  grid.innerHTML = exams.map((exam) => `
    <label class="target-exam-option">
      <input type="checkbox" value="${exam}">
      <span><span class="target-exam-name">${exam}</span><strong class="target-exam-rank" hidden></strong></span>
    </label>
  `).join("");

  const search = document.getElementById("target-exam-search");
  const filterOptions = () => {
    const term = String(search?.value || "").trim().normalize("NFD").replace(/[\u0300-\u036f]/g,"").toLowerCase();
    grid.querySelectorAll(".target-exam-option").forEach((label) => {
      const name = String(label.querySelector(".target-exam-name")?.textContent || "")
        .normalize("NFD").replace(/[\u0300-\u036f]/g,"").toLowerCase();
      label.hidden = Boolean(term) && !name.includes(term);
    });
    grid.scrollTop = 0;
  };
  search?.addEventListener("input", filterOptions);
  filterOptions();

  grid.addEventListener("change", (event) => {
    const input = event.target.closest('input[type="checkbox"]');
    if (!input) return;

    if (input.checked) {
      if (targetExamOrder.length >= 3) {
        input.checked = false;
        setTargetExamsStatus("Você pode escolher no máximo 3 provas.", "error");
        return;
      }
      if (!targetExamOrder.includes(input.value)) targetExamOrder.push(input.value);
    } else {
      targetExamOrder = targetExamOrder.filter((exam) => exam !== input.value);
    }

    setTargetExamsStatus("");
    syncTargetExamUi();
  });

  syncTargetExamUi();
}

async function loadTargetExams() {
  const grid = document.getElementById("target-exam-grid");
  if (!grid || !settingsUser) return;

  const { data, error } = await settingsSb
    .from("user_settings")
    .select("target_exams")
    .eq("user_id", settingsUser.id)
    .maybeSingle();

  if (error) {
    console.error(error);
    setTargetExamsStatus(`Não foi possível carregar: ${error.message}`, "error");
    return;
  }

  targetExamOrder = window.LuriaExamPriority?.sanitizeExams(data?.target_exams || []) || [];
  syncTargetExamUi();
}

async function saveTargetExams() {
  if (!settingsUser) return;

  const targetExams = window.LuriaExamPriority?.sanitizeExams(selectedTargetExams()) || [];
  const button = document.getElementById("save-target-exams");
  if (button) button.disabled = true;
  setTargetExamsStatus("Salvando...");

  const { error } = await settingsSb
    .from("user_settings")
    .upsert(
      { user_id: settingsUser.id, target_exams: targetExams },
      { onConflict: "user_id" }
    );

  if (button) button.disabled = false;

  if (error) {
    console.error(error);
    setTargetExamsStatus(`Não foi possível salvar: ${error.message}`, "error");
    return;
  }

  setTargetExamsStatus(
    targetExams.length
      ? "Provas salvas na ordem de prioridade. O Cronograma Base aplicará pesos de 50%, 30% e 20%."
      : "Seleção limpa. O Cronograma Base volta à ordem padrão.",
    "success"
  );
}

const STUDY_DEFAULTS = Object.freeze({
  pomodoro: { focus: 25, pause: 5 },
  flashcards: {
    hard: [1, 3, 7],
    medium: [7, 21, 45],
    easy: [15, 45, 70]
  },
  errorReviews: [7, 21, 21, 21, 21, 21],
  subjectReviews: [7, 14, 30]
});

function restorePomodoroDefaults() {
  document.getElementById("pomodoro-focus-minutes").value = STUDY_DEFAULTS.pomodoro.focus;
  document.getElementById("pomodoro-break-minutes").value = STUDY_DEFAULTS.pomodoro.pause;
  setPomodoroSettingsStatus("Padrão restaurado. Clique em Salvar Pomodoro para confirmar.", "success");
}

function restoreFlashcardDefaults() {
  setIntervalInputs("flashcard_intervals_hard", STUDY_DEFAULTS.flashcards.hard);
  setIntervalInputs("flashcard_intervals_medium", STUDY_DEFAULTS.flashcards.medium);
  setIntervalInputs("flashcard_intervals_easy", STUDY_DEFAULTS.flashcards.easy);
  setFlashcardIntervalsStatus("Padrão restaurado. Clique em Salvar intervalos para confirmar.", "success");
}

function restoreErrorReviewDefaults() {
  setIntervalInputs("error_review_intervals", STUDY_DEFAULTS.errorReviews);
  setErrorReviewSettingsStatus("Padrão restaurado. Clique em Salvar Caderno de Erros para confirmar.", "success");
}

function restoreSubjectReviewDefaults() {
  setIntervalInputs("subject_review_intervals", STUDY_DEFAULTS.subjectReviews);
  setSubjectReviewSettingsStatus("Padrão restaurado. Clique em Salvar revisões teóricas para confirmar.", "success");
}

async function initStudySettings() {
  settingsUser = window.docmapUser;

  renderWeekdayGroups();
  renderTargetExamOptions();
  wireProfileSettings();

  document
    .getElementById("save-study-days")
    .addEventListener("click", saveStudySettings);

  document.getElementById("restore-pomodoro-settings")
    ?.addEventListener("click", restorePomodoroDefaults);
  document.getElementById("restore-flashcard-intervals")
    ?.addEventListener("click", restoreFlashcardDefaults);
  document.getElementById("restore-error-review-settings")
    ?.addEventListener("click", restoreErrorReviewDefaults);
  document.getElementById("restore-subject-review-settings")
    ?.addEventListener("click", restoreSubjectReviewDefaults);

  document
    .getElementById("save-flashcard-intervals")
    ?.addEventListener(
      "click",
      saveFlashcardIntervals
    );

  document
    .getElementById("save-pomodoro-settings")
    ?.addEventListener(
      "click",
      savePomodoroSettings
    );

  document
    .getElementById(
      "save-error-review-settings"
    )
    ?.addEventListener(
      "click",
      saveErrorReviewSettings
    );

  document
    .getElementById(
      "save-subject-review-settings"
    )
    ?.addEventListener(
      "click",
      saveSubjectReviewSettings
    );

  document
    .getElementById(
      "save-password"
    )
    ?.addEventListener(
      "click",
      savePassword
    );

  loadAccountSecurity();
  wirePasskeySettings();

  document.getElementById("profile-username")
    ?.addEventListener("input", () => {
      const input = document.getElementById("profile-username");
      const normalized = normalizeUsername(input?.value);
      if (input && input.value !== normalized) input.value = normalized;
      refreshQuickAccessAddress();
    });

  document.getElementById("save-account-email")
    ?.addEventListener("click", saveAccountEmail);
  document.getElementById("save-account-phone")
    ?.addEventListener("click", saveAccountPhone);
  document.getElementById("verify-account-phone")
    ?.addEventListener("click", verifyAccountPhone);
  document.getElementById("save-quick-access-pin")
    ?.addEventListener("click", saveQuickAccessPin);

  document.getElementById("signout-other-browsers")
    ?.addEventListener("click", signOutOtherBrowsers);

  await Promise.all([
    loadProfileSettings(),
    loadStudySettings(),
    loadTargetExams(),
    loadPasskeys()
  ]);
}

if (window.docmapUser) {
  wireSettingsNotionConnection();
  initStudySettings();
} else {
  window.addEventListener(
    "docmap:ready",
    () => {
      wireSettingsNotionConnection();
      initStudySettings();
    },
    { once: true }
  );
}
