const STORAGE_KEYS = {
  apiBase: "kartivio.api_base",
  accessToken: "kartivio.access_token",
  refreshToken: "kartivio.refresh_token",
};

const DEFAULT_PROD_API_BASE = "https://api.kartivio-ai.ru";
const DEFAULT_LOCAL_API_BASE = "http://127.0.0.1:8093";
const DEFAULT_NGROK_API_BASE = "https://sweptback-semivolcanic-reagan.ngrok-free.dev";

const MODEL_COSTS = {
  cheap: 4,
  standard: 10,
  premium: 35,
};

const STATUS_LABELS = {
  queued: "В очереди",
  processing: "В работе",
  done: "Готово",
  failed: "Ошибка",
  cancelled: "Отменено",
};

const state = {
  apiBase: "",
  accessToken: "",
  refreshToken: "",
  activeJobId: "",
  activePollTimer: null,
  selectedTemplateId: "",
};

const tg = window.Telegram && window.Telegram.WebApp ? window.Telegram.WebApp : null;

const apiBaseInput = document.getElementById("apiBaseInput");
const authButton = document.getElementById("authButton");
const envHint = document.getElementById("envHint");
const authNote = document.getElementById("authNote");
const userName = document.getElementById("userName");
const userTgId = document.getElementById("userTgId");
const creditsValue = document.getElementById("creditsValue");
const plansGrid = document.getElementById("plansGrid");
const templatesGrid = document.getElementById("templatesGrid");
const promptInput = document.getElementById("promptInput");
const modelTierSelect = document.getElementById("modelTierSelect");
const aspectRatioSelect = document.getElementById("aspectRatioSelect");
const sourceImageInput = document.getElementById("sourceImageInput");
const createButton = document.getElementById("createButton");
const createNote = document.getElementById("createNote");
const selectedTemplateLabel = document.getElementById("selectedTemplateLabel");
const activeJobMeta = document.getElementById("activeJobMeta");
const activeResult = document.getElementById("activeResult");
const historyList = document.getElementById("historyList");
const refreshHistoryButton = document.getElementById("refreshHistoryButton");

function pickDefaultApiBase() {
  const host = window.location.hostname || "";
  if (host === "localhost" || host === "127.0.0.1") {
    return DEFAULT_LOCAL_API_BASE;
  }
  return DEFAULT_PROD_API_BASE;
}

function trimApiBase(raw) {
  return String(raw || "").trim().replace(/\/+$/, "");
}

function uniqueApiBases(items) {
  const out = [];
  const seen = new Set();
  for (const item of items) {
    const normalized = trimApiBase(item);
    if (!normalized || seen.has(normalized)) {
      continue;
    }
    seen.add(normalized);
    out.push(normalized);
  }
  return out;
}

function saveState() {
  localStorage.setItem(STORAGE_KEYS.apiBase, state.apiBase);
  localStorage.setItem(STORAGE_KEYS.accessToken, state.accessToken);
  localStorage.setItem(STORAGE_KEYS.refreshToken, state.refreshToken);
}

function loadState() {
  const queryApiBase = trimApiBase(new URLSearchParams(window.location.search).get("api"));
  const storedApiBase = trimApiBase(localStorage.getItem(STORAGE_KEYS.apiBase));
  state.apiBase = queryApiBase || storedApiBase || pickDefaultApiBase();
  state.accessToken = localStorage.getItem(STORAGE_KEYS.accessToken) || "";
  state.refreshToken = localStorage.getItem(STORAGE_KEYS.refreshToken) || "";
}

function escapeHtml(raw) {
  return String(raw || "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function setNote(message, isError = false) {
  authNote.textContent = message;
  authNote.style.color = isError ? "#ff8f8f" : "#a5aec7";
}

function setCreateNote(message, isError = false) {
  createNote.textContent = message;
  createNote.style.color = isError ? "#ff8f8f" : "#a5aec7";
}

function headersForApiBase(apiBase) {
  const headers = {};
  if (String(apiBase || "").includes(".ngrok-free.dev")) {
    headers["ngrok-skip-browser-warning"] = "1";
  }
  return headers;
}

function setEnvHint() {
  if (!tg) {
    envHint.textContent = "Открыто в обычном браузере.";
    return;
  }
  tg.ready();
  tg.expand();
  envHint.textContent = "Открыто в Telegram Mini App.";
}

async function parseJsonResponse(response) {
  try {
    return await response.json();
  } catch (_e) {
    return null;
  }
}

async function apiFetch(path, { method = "GET", body, auth = false, idempotencyKey } = {}) {
  const headers = headersForApiBase(state.apiBase);
  if (body !== undefined) {
    headers["Content-Type"] = "application/json";
  }
  if (auth && state.accessToken) {
    headers.Authorization = `Bearer ${state.accessToken}`;
  }
  if (idempotencyKey) {
    headers["Idempotency-Key"] = idempotencyKey;
  }

  const response = await fetch(`${state.apiBase}${path}`, {
    method,
    headers,
    body: body !== undefined ? JSON.stringify(body) : undefined,
  });
  const payload = await parseJsonResponse(response);
  if (!response.ok) {
    const message = payload && payload.message ? payload.message : `HTTP ${response.status}`;
    throw new Error(message);
  }
  return payload;
}

async function apiMultipart(path, formData, { auth = false, idempotencyKey } = {}) {
  const headers = headersForApiBase(state.apiBase);
  if (auth && state.accessToken) {
    headers.Authorization = `Bearer ${state.accessToken}`;
  }
  if (idempotencyKey) {
    headers["Idempotency-Key"] = idempotencyKey;
  }

  const response = await fetch(`${state.apiBase}${path}`, {
    method: "POST",
    headers,
    body: formData,
  });
  const payload = await parseJsonResponse(response);
  if (!response.ok) {
    const message = payload && payload.message ? payload.message : `HTTP ${response.status}`;
    throw new Error(message);
  }
  return payload;
}

async function resolveApiBase() {
  const candidates = uniqueApiBases([
    state.apiBase,
    DEFAULT_PROD_API_BASE,
    DEFAULT_NGROK_API_BASE,
    window.location.origin,
  ]);

  for (const candidate of candidates) {
    try {
      const response = await fetch(`${candidate}/healthz`, {
        method: "GET",
        headers: headersForApiBase(candidate),
      });
      if (!response.ok) {
        continue;
      }
      if (candidate !== state.apiBase) {
        state.apiBase = candidate;
        apiBaseInput.value = state.apiBase;
        saveState();
      }
      return;
    } catch (_error) {
      continue;
    }
  }
  throw new Error("API endpoint недоступен");
}

async function refreshSession() {
  if (!state.refreshToken) {
    return false;
  }
  try {
    const payload = await apiFetch("/v1/auth/refresh", {
      method: "POST",
      body: { refresh_token: state.refreshToken },
    });
    state.accessToken = payload.access_token;
    state.refreshToken = payload.refresh_token;
    saveState();
    return true;
  } catch (_e) {
    state.accessToken = "";
    state.refreshToken = "";
    saveState();
    return false;
  }
}

async function authorizedFetch(path, options = {}) {
  try {
    return await apiFetch(path, { ...options, auth: true });
  } catch (error) {
    if (!/401|unauthorized|token/i.test(String(error && error.message))) {
      throw error;
    }
    const refreshed = await refreshSession();
    if (!refreshed) {
      throw error;
    }
    return apiFetch(path, { ...options, auth: true });
  }
}

async function authorizedMultipart(path, formData, options = {}) {
  try {
    return await apiMultipart(path, formData, { ...options, auth: true });
  } catch (error) {
    if (!/401|unauthorized|token/i.test(String(error && error.message))) {
      throw error;
    }
    const refreshed = await refreshSession();
    if (!refreshed) {
      throw error;
    }
    return apiMultipart(path, formData, { ...options, auth: true });
  }
}

async function authorizedGetWithRetry(path, retries = 1) {
  let lastError = null;
  for (let attempt = 0; attempt <= retries; attempt += 1) {
    try {
      return await authorizedFetch(path);
    } catch (error) {
      lastError = error;
      if (attempt >= retries) {
        throw error;
      }
      await new Promise((resolve) => setTimeout(resolve, 250));
    }
  }
  throw lastError || new Error("request_failed");
}

function renderUser(me, wallet) {
  const display = me.display_name || me.telegram_user_id || "—";
  userName.textContent = String(display);
  userTgId.textContent = String(me.telegram_user_id || "—");
  creditsValue.textContent = `${wallet.balance_credits} credits`;
}

function openCheckout(url) {
  if (!url) {
    return;
  }
  if (tg && typeof tg.openLink === "function") {
    tg.openLink(url);
    return;
  }
  window.open(url, "_blank", "noopener,noreferrer");
}

async function buyPackage(code) {
  if (!state.accessToken) {
    setNote("Сначала авторизуйся через Telegram.", true);
    return;
  }
  const idem = `webapp_buy_${code}_${Date.now()}`;
  try {
    const result = await authorizedFetch("/v1/payments/checkout", {
      method: "POST",
      body: { kind: "topup", code },
      idempotencyKey: idem,
    });
    if (result.checkout_url) {
      openCheckout(result.checkout_url);
    } else {
      setNote("Платеж создан, но ссылка оплаты не пришла.", true);
    }
  } catch (error) {
    setNote(`Ошибка создания платежа: ${error.message}`, true);
  }
}

function renderPlans(payload) {
  const topups = Array.isArray(payload && payload.topups) ? payload.topups : [];
  plansGrid.innerHTML = "";
  for (const item of topups) {
    const card = document.createElement("article");
    card.className = "plan-card";
    card.innerHTML = `
      <h3>${escapeHtml(item.title)}</h3>
      <div class="plan-meta">${escapeHtml(item.price_rub)} ₽</div>
      <div class="plan-meta">${escapeHtml(item.credits)} credits</div>
      <button class="btn btn-secondary" type="button">Купить</button>
    `;
    const button = card.querySelector("button");
    button.addEventListener("click", () => buyPackage(item.code));
    plansGrid.appendChild(card);
  }
}

function selectTemplate(item) {
  state.selectedTemplateId = item.id;
  promptInput.value = item.prompt;
  selectedTemplateLabel.textContent = `Выбран шаблон: ${item.title}`;
  promptInput.focus();
}

function copyPrompt(prompt) {
  if (!prompt) {
    return;
  }
  navigator.clipboard.writeText(prompt).then(
    () => setNote("Промпт скопирован."),
    () => setNote("Не удалось скопировать промпт.", true),
  );
}

function renderTemplates(payload) {
  const items = Array.isArray(payload && payload.items) ? payload.items : [];
  templatesGrid.innerHTML = "";
  for (const item of items) {
    const card = document.createElement("article");
    card.className = "template-card";
    const imageUrl = item.preview_image_url || "https://picsum.photos/seed/kartivio-fallback/720/960";
    const safeTitle = escapeHtml(item.title);
    const safeCategory = escapeHtml(item.category);
    const safePrompt = escapeHtml(item.prompt);
    const safeImageUrl = escapeHtml(imageUrl);
    card.innerHTML = `
      <img src="${safeImageUrl}" alt="${safeTitle}" loading="lazy" />
      <div class="template-body">
        <div class="template-head">
          <h3>${safeTitle}</h3>
          <span class="chip">${safeCategory}</span>
        </div>
        <p class="template-prompt">${safePrompt}</p>
        <div class="template-actions">
          <button class="btn btn-secondary" data-action="copy" type="button">Скопировать</button>
          <button class="btn btn-primary" data-action="select" type="button">Выбрать</button>
        </div>
      </div>
    `;
    card.querySelector('[data-action="copy"]').addEventListener("click", () => copyPrompt(item.prompt));
    card.querySelector('[data-action="select"]').addEventListener("click", () => selectTemplate(item));
    templatesGrid.appendChild(card);
  }
}

function jobStatusLabel(status) {
  return STATUS_LABELS[status] || status;
}

function renderActiveJob(job) {
  const status = jobStatusLabel(job.status);
  const mode = job.is_edit ? "редактирование" : "генерация";
  activeJobMeta.textContent = `${status} · ${mode} · ${job.model_tier} · ${job.output_size}`;

  activeResult.className = "active-result";
  if (job.result_image_url) {
    activeResult.innerHTML = `<img src="${escapeHtml(job.result_image_url)}" alt="Результат генерации" />`;
    return;
  }
  activeResult.classList.add("empty-result");
  activeResult.textContent = job.status === "failed" ? `Ошибка: ${job.error_code || "unknown"}` : "Задача выполняется.";
}

function historyThumb(job) {
  if (job.result_image_url) {
    return `<img src="${escapeHtml(job.result_image_url)}" alt="Результат" loading="lazy" />`;
  }
  return escapeHtml(jobStatusLabel(job.status));
}

function renderHistory(payload) {
  const items = Array.isArray(payload && payload.items) ? payload.items : [];
  historyList.innerHTML = "";
  if (!items.length) {
    historyList.innerHTML = '<div class="active-result empty-result">История пока пустая.</div>';
    return;
  }
  for (const job of items) {
    const item = document.createElement("article");
    const statusClass = `status-${String(job.status || "").toLowerCase()}`;
    item.className = "history-item";
    item.innerHTML = `
      <div class="history-thumb">${historyThumb(job)}</div>
      <div class="history-body">
        <div class="history-topline">
          <span class="chip">${job.is_edit ? "edit" : "text"}</span>
          <span class="status-pill ${escapeHtml(statusClass)}">${escapeHtml(jobStatusLabel(job.status))}</span>
        </div>
        <p class="history-prompt">${escapeHtml(job.prompt)}</p>
        <div class="plan-meta">${escapeHtml(job.model_tier)} · ${escapeHtml(job.output_size)} · ${escapeHtml(job.requested_credits)} credits</div>
      </div>
    `;
    item.addEventListener("click", () => {
      state.activeJobId = job.id;
      renderActiveJob(job);
      if (job.prompt) {
        promptInput.value = job.prompt;
      }
    });
    historyList.appendChild(item);
  }
}

async function loadHistory() {
  if (!state.accessToken) {
    historyList.innerHTML = '<div class="active-result empty-result">Войди, чтобы увидеть историю.</div>';
    return;
  }
  const payload = await authorizedGetWithRetry("/v1/generations?limit=20", 1);
  renderHistory(payload);
}

async function loadPublicData() {
  const [plansPayload, templatesPayload] = await Promise.all([
    apiFetch("/v1/plans"),
    apiFetch("/v1/templates"),
  ]);
  renderPlans(plansPayload);
  renderTemplates(templatesPayload);
  setNote("");
}

async function loadPrivateData() {
  if (!state.accessToken) {
    userName.textContent = "—";
    userTgId.textContent = "—";
    creditsValue.textContent = "—";
    return;
  }
  const [me, wallet] = await Promise.all([
    authorizedGetWithRetry("/v1/me", 1),
    authorizedGetWithRetry("/v1/wallet?limit=1", 1),
  ]);
  renderUser(me, wallet);
}

function ensureAuthorizedForCreate() {
  if (!state.accessToken) {
    throw new Error("Сначала войди через Telegram.");
  }
}

function buildClientRequestId() {
  return `webapp_${Date.now()}_${Math.random().toString(16).slice(2)}`;
}

async function createTextGeneration(prompt, modelTier, outputSize, clientRequestId) {
  return authorizedFetch("/v1/generations", {
    method: "POST",
    body: {
      prompt,
      model_tier: modelTier,
      output_size: outputSize,
      client_request_id: clientRequestId,
    },
    idempotencyKey: clientRequestId,
  });
}

async function createEditGeneration(prompt, modelTier, outputSize, sourceImage, clientRequestId) {
  const form = new FormData();
  form.append("prompt", prompt);
  form.append("model_tier", modelTier);
  form.append("output_size", outputSize);
  form.append("client_request_id", clientRequestId);
  form.append("source_image", sourceImage);
  return authorizedMultipart("/v1/generations/edit", form, {
    idempotencyKey: clientRequestId,
  });
}

async function pollActiveJob(jobId) {
  if (state.activePollTimer) {
    window.clearTimeout(state.activePollTimer);
    state.activePollTimer = null;
  }

  try {
    const job = await authorizedGetWithRetry(`/v1/generations/${jobId}`, 1);
    renderActiveJob(job);
    if (["queued", "processing"].includes(job.status)) {
      state.activePollTimer = window.setTimeout(() => pollActiveJob(jobId), 2500);
      return;
    }
    await Promise.allSettled([loadPrivateData(), loadHistory()]);
  } catch (error) {
    setCreateNote(`Не удалось обновить задачу: ${error.message}`, true);
  }
}

async function handleCreate() {
  const prompt = promptInput.value.trim();
  const modelTier = modelTierSelect.value;
  const outputSize = aspectRatioSelect.value;
  const sourceImage = sourceImageInput.files && sourceImageInput.files[0] ? sourceImageInput.files[0] : null;
  const cost = MODEL_COSTS[modelTier] || MODEL_COSTS.standard;

  try {
    ensureAuthorizedForCreate();
    if (!prompt) {
      throw new Error("Добавь промпт.");
    }
    createButton.disabled = true;
    createButton.textContent = "Создаю...";
    setCreateNote(`Списываю ${cost} credits и ставлю задачу в очередь.`);

    const clientRequestId = buildClientRequestId();
    const job = sourceImage
      ? await createEditGeneration(prompt, modelTier, outputSize, sourceImage, clientRequestId)
      : await createTextGeneration(prompt, modelTier, outputSize, clientRequestId);

    state.activeJobId = job.id;
    renderActiveJob(job);
    setCreateNote(`Задача создана: ${job.status}.`);
    await Promise.allSettled([loadPrivateData(), loadHistory()]);
    await pollActiveJob(job.id);
  } catch (error) {
    setCreateNote(error.message, true);
  } finally {
    createButton.disabled = false;
    createButton.textContent = "Создать";
  }
}

async function loginViaTelegram() {
  if (!tg || !tg.initData) {
    setNote("Нет Telegram initData. Открой страницу через кнопку Web App в боте.", true);
    return;
  }
  authButton.disabled = true;
  authButton.textContent = "Проверяю...";
  try {
    const payload = await apiFetch("/v1/auth/telegram/miniapp", {
      method: "POST",
      body: { init_data: tg.initData },
    });
    state.accessToken = payload.access_token;
    state.refreshToken = payload.refresh_token;
    saveState();
    setNote("Авторизация успешна.");
    await Promise.allSettled([loadPrivateData(), loadHistory()]);
  } catch (error) {
    setNote(`Ошибка авторизации: ${error.message}`, true);
  } finally {
    authButton.disabled = false;
    authButton.textContent = "Войти через Telegram";
  }
}

function bindEvents() {
  apiBaseInput.addEventListener("change", () => {
    state.apiBase = trimApiBase(apiBaseInput.value);
    saveState();
  });
  authButton.addEventListener("click", loginViaTelegram);
  createButton.addEventListener("click", handleCreate);
  refreshHistoryButton.addEventListener("click", () => loadHistory().catch((error) => {
    setCreateNote(`История не загрузилась: ${error.message}`, true);
  }));
  modelTierSelect.addEventListener("change", () => {
    const cost = MODEL_COSTS[modelTierSelect.value] || MODEL_COSTS.standard;
    setCreateNote(`Стоимость текущего режима: ${cost} credits.`);
  });
}

async function bootstrap() {
  loadState();
  setEnvHint();
  apiBaseInput.value = state.apiBase;
  bindEvents();

  try {
    await resolveApiBase();
    await loadPublicData();
  } catch (error) {
    setNote(`Не удалось загрузить публичные данные: ${error.message}`, true);
  }

  if (state.accessToken) {
    await Promise.allSettled([loadPrivateData(), loadHistory()]);
  } else {
    await loadHistory();
  }
}

bootstrap();
