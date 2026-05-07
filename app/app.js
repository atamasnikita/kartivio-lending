const STORAGE_KEYS = {
  apiBase: "kartivio.api_base",
  accessToken: "kartivio.access_token",
  refreshToken: "kartivio.refresh_token",
};

const DEFAULT_PROD_API_BASE = "https://api.kartivio-ai.ru";
const DEFAULT_LOCAL_API_BASE = "http://127.0.0.1:8093";
const DEFAULT_NGROK_API_BASE = "https://sweptback-semivolcanic-reagan.ngrok-free.dev";

const state = {
  apiBase: "",
  accessToken: "",
  refreshToken: "",
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

function headersForApiBase(apiBase) {
  const headers = {};
  if (String(apiBase || "").includes(".ngrok-free.dev")) {
    headers["ngrok-skip-browser-warning"] = "1";
  }
  return headers;
}

function setEnvHint() {
  if (!tg) {
    envHint.textContent = "Открыто в обычном браузере. Для быстрого логина открой через кнопку Web App в боте.";
    return;
  }
  tg.ready();
  tg.expand();
  envHint.textContent = "Открыто в Telegram Mini App.";
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

  let payload = null;
  try {
    payload = await response.json();
  } catch (_e) {
    payload = null;
  }

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
        <button class="btn btn-secondary" type="button">Скопировать промпт</button>
      </div>
    `;
    const button = card.querySelector("button");
    button.addEventListener("click", () => copyPrompt(item.prompt));
    templatesGrid.appendChild(card);
  }
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

async function loginViaTelegram() {
  if (!tg || !tg.initData) {
    setNote("Нет Telegram initData. Открой страницу через кнопку Web App в боте.", true);
    return;
  }
  authButton.disabled = true;
  authButton.textContent = "Проверяю…";
  try {
    const payload = await apiFetch("/v1/auth/telegram/miniapp", {
      method: "POST",
      body: { init_data: tg.initData },
    });
    state.accessToken = payload.access_token;
    state.refreshToken = payload.refresh_token;
    saveState();
    setNote("Авторизация успешна. Загружаю профиль...");
    try {
      await loadPrivateData();
      setNote("Профиль загружен.");
    } catch (profileError) {
      setNote(`Авторизация ок, но профиль не загрузился: ${profileError.message}`, true);
    }
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

  try {
    await loadPrivateData();
  } catch (error) {
    setNote(`Не удалось загрузить профиль: ${error.message}`, true);
  }
}

bootstrap();
