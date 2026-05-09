const STORAGE_KEYS = {
  apiBase: "kartivio.api_base",
  accessToken: "kartivio.access_token",
  refreshToken: "kartivio.refresh_token",
};

const DEFAULT_PROD_API_BASE = "https://api.kartivio-ai.ru";
const DEFAULT_LOCAL_API_BASE = "http://127.0.0.1:8093";
const DEFAULT_NGROK_API_BASE = "https://sweptback-semivolcanic-reagan.ngrok-free.dev";

const MODEL_COSTS = {
  "gemini-3.1-flash-image-preview": 10,
  "gemini-3-pro-image-preview": 20,
  "gpt-image-2": 30,
};

const IMAGE_MODEL_LABELS = {
  "gemini-3.1-flash-image-preview": "Nano Banana 2",
  "gemini-3-pro-image-preview": "Nano Banana Pro",
  "gpt-image-2": "GPT Image 2",
};

const RESOLUTION_ORDER = ["auto", "1K", "2K", "4K"];
const RATIO_ORDER = ["auto", "1:1", "2:3", "3:2", "3:4", "4:3", "4:5", "5:4", "9:16", "16:9", "21:9"];

const RESOLUTION_LABELS = {
  auto: "Auto",
  "1K": "1K",
  "2K": "2K",
  "4K": "4K",
};

const RATIO_LABELS = {
  auto: "Auto",
  "1:1": "1:1",
  "2:3": "2:3",
  "3:2": "3:2",
  "3:4": "3:4",
  "4:3": "4:3",
  "4:5": "4:5",
  "5:4": "5:4",
  "9:16": "9:16",
  "16:9": "16:9",
  "21:9": "21:9",
};

const GEMINI_OUTPUT_MATRIX = Object.freeze({
  auto: Object.freeze({ auto: "auto" }),
  "1K": Object.freeze({
    "1:1": "1024x1024",
    "2:3": "848x1264",
    "3:2": "1264x848",
    "3:4": "896x1200",
    "4:3": "1200x896",
    "4:5": "928x1152",
    "5:4": "1152x928",
    "9:16": "768x1376",
    "16:9": "1376x768",
    "21:9": "1584x672",
  }),
  "2K": Object.freeze({
    "1:1": "2048x2048",
    "2:3": "1696x2528",
    "3:2": "2528x1696",
    "3:4": "1792x2400",
    "4:3": "2400x1792",
    "4:5": "1856x2304",
    "5:4": "2304x1856",
    "9:16": "1536x2752",
    "16:9": "2752x1536",
    "21:9": "3168x1344",
  }),
  "4K": Object.freeze({
    "1:1": "4096x4096",
    "2:3": "3392x5056",
    "3:2": "5056x3392",
    "3:4": "3584x4800",
    "4:3": "4800x3584",
    "4:5": "3712x4608",
    "5:4": "4608x3712",
    "9:16": "3072x5504",
    "16:9": "5504x3072",
    "21:9": "6336x2688",
  }),
});

const GPT_OUTPUT_MATRIX = Object.freeze({
  auto: Object.freeze({ auto: "auto" }),
  "1K": Object.freeze({
    "1:1": "1024x1024",
    "2:3": "1024x1536",
    "3:2": "1536x1024",
  }),
});

const MODEL_OUTPUT_MATRIX = {
  "gemini-3.1-flash-image-preview": GEMINI_OUTPUT_MATRIX,
  "gemini-3-pro-image-preview": GEMINI_OUTPUT_MATRIX,
  "gpt-image-2": GPT_OUTPUT_MATRIX,
};

const MODEL_ORDER = ["gemini-3.1-flash-image-preview", "gemini-3-pro-image-preview", "gpt-image-2"];
const DEFAULT_IMAGE_MODEL = "gemini-3.1-flash-image-preview";
const DEFAULT_RESOLUTION = "1K";
const DEFAULT_RATIO = "1:1";

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
  selectedImageModel: DEFAULT_IMAGE_MODEL,
  selectedResolution: DEFAULT_RESOLUTION,
  selectedRatio: DEFAULT_RATIO,
  activeJobId: "",
  activePollTimer: null,
  selectedTemplateId: "",
  selectedTemplate: null,
  activeImageRenderToken: 0,
  imageBlobUrlCache: new Map(),
  currentScreen: "feed",
  topups: [],
  selectedTopupCode: "",
};

const tg = window.Telegram && window.Telegram.WebApp ? window.Telegram.WebApp : null;

const apiBaseInput = document.getElementById("apiBaseInput");
const authButton = document.getElementById("authButton");
const envHint = document.getElementById("envHint");
const authNote = document.getElementById("authNote");
const userName = document.getElementById("userName");
const userTgId = document.getElementById("userTgId");
const creditsValue = document.getElementById("creditsValue");
const creditsBadge = document.getElementById("creditsBadge");
const profileAvatar = document.getElementById("profileAvatar");
const plansGrid = document.getElementById("plansGrid");
const plansActionButton = document.getElementById("plansActionButton");
const plansNote = document.getElementById("plansNote");
const templatesGrid = document.getElementById("templatesGrid");
const promptInput = document.getElementById("promptInput");
const modelChips = document.getElementById("modelChips");
const resolutionChips = document.getElementById("resolutionChips");
const ratioChips = document.getElementById("ratioChips");
const sourceImageInput = document.getElementById("sourceImageInput");
const uploadPhotoButton = document.getElementById("uploadPhotoButton");
const uploadDropzone = document.getElementById("uploadDropzone");
const dropzoneTitle = document.getElementById("dropzoneTitle");
const sourceImageMeta = document.getElementById("sourceImageMeta");
const createButton = document.getElementById("createButton");
const createNote = document.getElementById("createNote");
const selectedTemplateCard = document.getElementById("selectedTemplateCard");
const selectedTemplatePreview = document.getElementById("selectedTemplatePreview");
const selectedTemplateTitle = document.getElementById("selectedTemplateTitle");
const selectedTemplateMeta = document.getElementById("selectedTemplateMeta");
const clearTemplateButton = document.getElementById("clearTemplateButton");
const activeJobMeta = document.getElementById("activeJobMeta");
const activeResult = document.getElementById("activeResult");
const historyList = document.getElementById("historyList");
const refreshHistoryButton = document.getElementById("refreshHistoryButton");
const navButtons = Array.from(document.querySelectorAll("[data-nav]"));
const jumpButtons = Array.from(document.querySelectorAll("[data-nav-target]"));
const screens = Array.from(document.querySelectorAll("[data-screen]"));

function refreshIcons() {
  if (window.lucide && typeof window.lucide.createIcons === "function") {
    window.lucide.createIcons();
  }
}

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

function outputMatrixForModel(model) {
  if (MODEL_OUTPUT_MATRIX[model]) {
    return MODEL_OUTPUT_MATRIX[model];
  }
  return MODEL_OUTPUT_MATRIX[DEFAULT_IMAGE_MODEL];
}

function imageModelLabel(model) {
  const key = String(model || "").trim().toLowerCase();
  return IMAGE_MODEL_LABELS[key] || key || "—";
}

function selectedGenerationCost() {
  const key = String(state.selectedImageModel || DEFAULT_IMAGE_MODEL).trim().toLowerCase();
  return MODEL_COSTS[key] || MODEL_COSTS[DEFAULT_IMAGE_MODEL];
}

function setCreateButtonIdleLabel() {
  const cost = selectedGenerationCost();
  createButton.textContent = `Генерировать · ${cost} credits`;
}

function ratioLabel(ratio) {
  return RATIO_LABELS[String(ratio || "").trim()] || String(ratio || "").trim();
}

function resolutionLabel(resolution) {
  return RESOLUTION_LABELS[String(resolution || "").trim()] || String(resolution || "").trim();
}

function availableResolutionsForModel(model) {
  const matrix = outputMatrixForModel(model);
  return RESOLUTION_ORDER.filter((key) => Object.prototype.hasOwnProperty.call(matrix, key));
}

function availableRatiosFor(model, resolution) {
  const matrix = outputMatrixForModel(model);
  const byResolution = matrix[resolution] || {};
  return RATIO_ORDER.filter((key) => Object.prototype.hasOwnProperty.call(byResolution, key));
}

function ensureGenerationSelectionState() {
  const selectedModel = String(state.selectedImageModel || DEFAULT_IMAGE_MODEL).trim();
  state.selectedImageModel = MODEL_ORDER.includes(selectedModel) ? selectedModel : DEFAULT_IMAGE_MODEL;

  const availableResolutions = availableResolutionsForModel(state.selectedImageModel);
  if (!availableResolutions.length) {
    state.selectedResolution = "auto";
    state.selectedRatio = "auto";
    return;
  }

  if (!availableResolutions.includes(state.selectedResolution)) {
    if (availableResolutions.includes(DEFAULT_RESOLUTION)) {
      state.selectedResolution = DEFAULT_RESOLUTION;
    } else {
      state.selectedResolution = availableResolutions[0];
    }
  }

  const availableRatios = availableRatiosFor(state.selectedImageModel, state.selectedResolution);
  if (!availableRatios.length) {
    state.selectedRatio = "auto";
    return;
  }
  if (!availableRatios.includes(state.selectedRatio)) {
    if (availableRatios.includes(DEFAULT_RATIO)) {
      state.selectedRatio = DEFAULT_RATIO;
    } else {
      state.selectedRatio = availableRatios[0];
    }
  }
}

function currentOutputSizeSelection() {
  ensureGenerationSelectionState();
  const model = state.selectedImageModel || DEFAULT_IMAGE_MODEL;
  const resolution = String(state.selectedResolution || DEFAULT_RESOLUTION).trim();
  const ratio = String(state.selectedRatio || DEFAULT_RATIO).trim();
  const matrix = outputMatrixForModel(model);
  const byResolution = matrix[resolution] || {};
  return byResolution[ratio] || null;
}

function refreshGenerationCostNote() {
  ensureGenerationSelectionState();
  const cost = selectedGenerationCost();
  const model = imageModelLabel(state.selectedImageModel);
  const resolution = String(state.selectedResolution || DEFAULT_RESOLUTION).trim();
  const ratio = String(state.selectedRatio || DEFAULT_RATIO).trim();
  const outputSize = currentOutputSizeSelection();
  if (!outputSize) {
    setCreateNote(`Комбинация недоступна для ${model}.`, true);
    return;
  }
  setCreateNote(
    `Выбрано: ${model}, ${resolutionLabel(resolution)}, ${ratioLabel(ratio)} (${outputSize}). Списание: ${cost} credits.`
  );
  setCreateButtonIdleLabel();
}

function createChoiceChip({
  label,
  selected,
  disabled = false,
  onClick,
  lock = false,
}) {
  const button = document.createElement("button");
  button.type = "button";
  button.className = "choice-chip";
  button.setAttribute("role", "radio");
  button.setAttribute("aria-checked", selected ? "true" : "false");
  button.disabled = disabled;
  if (lock) {
    button.innerHTML = `${escapeHtml(label)}<span class="chip-lock">🔒</span>`;
  } else {
    button.textContent = label;
  }
  if (!disabled && typeof onClick === "function") {
    button.addEventListener("click", onClick);
  }
  return button;
}

function renderModelChips() {
  modelChips.innerHTML = "";
  for (const model of MODEL_ORDER) {
    const chip = createChoiceChip({
      label: imageModelLabel(model),
      selected: state.selectedImageModel === model,
      onClick: () => {
        state.selectedImageModel = model;
        ensureGenerationSelectionState();
        renderGenerationChips();
        refreshGenerationCostNote();
      },
    });
    modelChips.appendChild(chip);
  }
}

function renderResolutionChips() {
  resolutionChips.innerHTML = "";
  const available = new Set(availableResolutionsForModel(state.selectedImageModel));
  for (const resolution of RESOLUTION_ORDER) {
    const enabled = available.has(resolution);
    const chip = createChoiceChip({
      label: resolutionLabel(resolution),
      selected: enabled && state.selectedResolution === resolution,
      disabled: !enabled,
      lock: !enabled,
      onClick: () => {
        state.selectedResolution = resolution;
        ensureGenerationSelectionState();
        renderGenerationChips();
        refreshGenerationCostNote();
      },
    });
    resolutionChips.appendChild(chip);
  }
}

function renderRatioChips() {
  ratioChips.innerHTML = "";
  const available = new Set(availableRatiosFor(state.selectedImageModel, state.selectedResolution));
  for (const ratio of RATIO_ORDER) {
    const enabled = available.has(ratio);
    const chip = createChoiceChip({
      label: ratioLabel(ratio),
      selected: enabled && state.selectedRatio === ratio,
      disabled: !enabled,
      lock: !enabled,
      onClick: () => {
        state.selectedRatio = ratio;
        ensureGenerationSelectionState();
        renderGenerationChips();
        refreshGenerationCostNote();
      },
    });
    ratioChips.appendChild(chip);
  }
}

function renderGenerationChips() {
  ensureGenerationSelectionState();
  renderModelChips();
  renderResolutionChips();
  renderRatioChips();
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
  authNote.style.color = isError ? "#ff8f8f" : "#8f98b0";
}

function setCreateNote(message, isError = false) {
  createNote.textContent = message;
  createNote.style.color = isError ? "#ff8f8f" : "#8f98b0";
}

function setPlansNote(message, isError = false) {
  plansNote.textContent = message;
  plansNote.style.color = isError ? "#ff8f8f" : "#8f98b0";
}

function headersForApiBase(apiBase) {
  const headers = {};
  if (String(apiBase || "").includes(".ngrok-free.dev")) {
    headers["ngrok-skip-browser-warning"] = "1";
  }
  return headers;
}

function isNgrokUrl(rawUrl) {
  try {
    const url = new URL(String(rawUrl || ""));
    return url.hostname.endsWith(".ngrok-free.dev");
  } catch (_e) {
    return false;
  }
}

function extensionFromUrl(rawUrl) {
  try {
    const parsed = new URL(String(rawUrl || ""));
    const part = parsed.pathname.split("/").pop() || "";
    const match = part.match(/\.([a-zA-Z0-9]+)$/);
    return match ? match[1].toLowerCase() : "";
  } catch (_e) {
    return "";
  }
}

function normalizeImageUrl(rawUrl) {
  const value = String(rawUrl || "").trim();
  if (!value) {
    return "";
  }
  try {
    const parsed = new URL(value);
    if (parsed.hostname === "127.0.0.1" || parsed.hostname === "localhost") {
      const filename = parsed.pathname.split("/").pop() || "";
      if (!filename) {
        return value;
      }
      return `${trimApiBase(state.apiBase)}/generated/${filename}`;
    }
    return parsed.toString();
  } catch (_e) {
    if (value.startsWith("/generated/")) {
      return `${trimApiBase(state.apiBase)}${value}`;
    }
    return value;
  }
}

function extensionFromContentType(contentType) {
  if (!contentType) {
    return "";
  }
  const clean = String(contentType).split(";")[0].trim().toLowerCase();
  if (clean === "image/jpeg") {
    return "jpg";
  }
  if (clean === "image/png") {
    return "png";
  }
  if (clean === "image/webp") {
    return "webp";
  }
  if (clean === "image/gif") {
    return "gif";
  }
  return "";
}

async function resolveDisplayImage(rawUrl) {
  const url = normalizeImageUrl(rawUrl);
  if (!url) {
    throw new Error("Пустой URL изображения.");
  }
  if (!isNgrokUrl(url)) {
    return { src: url, contentType: "", isBlob: false };
  }

  const cached = state.imageBlobUrlCache.get(url);
  if (cached) {
    return { src: cached.src, contentType: cached.contentType, isBlob: true };
  }

  const response = await fetch(url, {
    method: "GET",
    headers: headersForApiBase(url),
  });
  if (!response.ok) {
    throw new Error(`Изображение недоступно (HTTP ${response.status}).`);
  }
  const blob = await response.blob();
  const objectUrl = URL.createObjectURL(blob);
  const contentType = blob.type || "";
  state.imageBlobUrlCache.set(url, { src: objectUrl, contentType });
  return { src: objectUrl, contentType, isBlob: true };
}

async function openImage(rawUrl) {
  const targetUrl = normalizeImageUrl(rawUrl);
  if (!targetUrl) {
    throw new Error("Пустой URL изображения.");
  }
  if (tg && typeof tg.openLink === "function") {
    tg.openLink(targetUrl);
    return;
  }
  window.open(targetUrl, "_blank", "noopener,noreferrer");
}

async function downloadImage(rawUrl, fallbackBase = "kartivio-image") {
  const targetUrl = normalizeImageUrl(rawUrl);
  if (!targetUrl) {
    throw new Error("Пустой URL изображения.");
  }

  const response = await fetch(targetUrl, {
    method: "GET",
    headers: headersForApiBase(targetUrl),
  });
  if (!response.ok) {
    throw new Error(`Изображение недоступно (HTTP ${response.status}).`);
  }

  const blob = await response.blob();
  const objectUrl = URL.createObjectURL(blob);
  const ext = extensionFromUrl(targetUrl) || extensionFromContentType(blob.type) || "png";
  const filename = `${fallbackBase}-${Date.now()}.${ext}`;

  const link = document.createElement("a");
  link.href = objectUrl;
  link.download = filename;
  link.rel = "noopener";
  document.body.appendChild(link);
  link.click();
  link.remove();
  window.setTimeout(() => URL.revokeObjectURL(objectUrl), 2500);
}

function switchScreen(nextScreen) {
  const target = String(nextScreen || "").trim();
  if (!target) {
    return;
  }
  state.currentScreen = target;
  for (const screen of screens) {
    screen.classList.toggle("screen-active", screen.dataset.screen === target);
  }
  for (const button of navButtons) {
    button.classList.toggle("is-active", button.dataset.nav === target);
  }
  if (target === "history") {
    loadHistory().catch((error) => {
      setCreateNote(`История не загрузилась: ${error.message}`, true);
    });
  }
}

function renderSelectedSourceImage() {
  const file = sourceImageInput.files && sourceImageInput.files[0] ? sourceImageInput.files[0] : null;
  if (!file) {
    dropzoneTitle.textContent = "Добавить фото";
    sourceImageMeta.textContent = "Файл не выбран";
    return;
  }
  dropzoneTitle.textContent = file.name;
  sourceImageMeta.textContent = `${Math.max(1, Math.round(file.size / 1024 / 1024))} MB`;
}

function clearSelectedTemplate({ clearPrompt } = { clearPrompt: false }) {
  state.selectedTemplateId = "";
  state.selectedTemplate = null;
  if (clearPrompt) {
    promptInput.value = "";
  }
  renderSelectedTemplateCard();
}

function selectedTemplatePromptStatus() {
  if (!state.selectedTemplate) {
    return "";
  }
  const currentPrompt = String(promptInput.value || "").trim();
  const sourcePrompt = String(state.selectedTemplate.prompt || "").trim();
  if (!currentPrompt) {
    return "Промпт очищен";
  }
  if (currentPrompt === sourcePrompt) {
    return "Шаблон вставлен без изменений";
  }
  return "Шаблон выбран, промпт изменен";
}

function renderSelectedTemplateCard() {
  if (!state.selectedTemplate) {
    selectedTemplateCard.classList.add("is-hidden");
    return;
  }
  const preview = String(state.selectedTemplate.preview_image_url || "").trim();
  selectedTemplatePreview.src = preview || "https://picsum.photos/seed/kartivio-template/320/320";
  selectedTemplateTitle.textContent = state.selectedTemplate.title || "Выбран шаблон";
  const category = String(state.selectedTemplate.category || "").trim();
  const status = selectedTemplatePromptStatus();
  selectedTemplateMeta.textContent = category ? `${category} · ${status}` : status;
  selectedTemplateCard.classList.remove("is-hidden");
}

function syncTemplateStateFromPrompt() {
  if (!state.selectedTemplate) {
    return;
  }
  const currentPrompt = String(promptInput.value || "").trim();
  if (!currentPrompt) {
    clearSelectedTemplate({ clearPrompt: false });
    return;
  }
  renderSelectedTemplateCard();
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

function extractErrorMessage(payload, fallback) {
  if (!payload || typeof payload !== "object") {
    return fallback;
  }
  if (typeof payload.message === "string" && payload.message.trim()) {
    return payload.message.trim();
  }
  if (payload.detail && typeof payload.detail === "object" && typeof payload.detail.message === "string") {
    return payload.detail.message.trim() || fallback;
  }
  if (typeof payload.detail === "string" && payload.detail.trim()) {
    return payload.detail.trim();
  }
  return fallback;
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
    const message = extractErrorMessage(payload, `HTTP ${response.status}`);
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
    const message = extractErrorMessage(payload, `HTTP ${response.status}`);
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
  const display = String(me.display_name || me.telegram_user_id || "—");
  const tgId = String(me.telegram_user_id || "—");
  const balance = Number(wallet.balance_credits || 0);

  userName.textContent = display;
  userTgId.textContent = tgId;
  creditsValue.textContent = `${balance} credits`;
  creditsBadge.textContent = String(balance);
  profileAvatar.textContent = display === "—" ? "K" : display[0].toUpperCase();
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
    setPlansNote("Сначала авторизуйся через Telegram.", true);
    switchScreen("profile");
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
      setPlansNote(`Пакет ${code} готов к оплате.`);
    } else {
      setPlansNote("Платеж создан, но ссылка оплаты не пришла.", true);
    }
  } catch (error) {
    setPlansNote(`Ошибка создания платежа: ${error.message}`, true);
  }
}

function selectTopup(code) {
  state.selectedTopupCode = String(code || "").trim();
  const cards = plansGrid.querySelectorAll(".plan-card");
  for (const card of cards) {
    const isSelected = card.dataset.code === state.selectedTopupCode;
    card.classList.toggle("is-selected", isSelected);
  }
  const selected = state.topups.find((item) => item.code === state.selectedTopupCode);
  if (!selected) {
    plansActionButton.textContent = "Выбери пакет";
    plansActionButton.disabled = true;
    return;
  }
  plansActionButton.textContent = `Оплатить ${selected.price_rub} ₽`;
  plansActionButton.disabled = false;
}

function renderPlans(payload) {
  const topups = Array.isArray(payload && payload.topups) ? payload.topups : [];
  state.topups = topups;
  plansGrid.innerHTML = "";
  if (!topups.length) {
    plansGrid.innerHTML = '<article class="plan-card">Пакеты временно недоступны.</article>';
    selectTopup("");
    return;
  }

  for (const item of topups) {
    const credits = Number(item.credits || 0);
    const nb2Count = Math.floor(credits / (MODEL_COSTS["gemini-3.1-flash-image-preview"] || 1));
    const nbproCount = Math.floor(credits / (MODEL_COSTS["gemini-3-pro-image-preview"] || 1));
    const gptCount = Math.floor(credits / (MODEL_COSTS["gpt-image-2"] || 1));
    const card = document.createElement("article");
    card.className = "plan-card";
    card.dataset.code = item.code;
    card.innerHTML = `
      <div class="plan-title-row">
        <h3>${escapeHtml(item.title)}</h3>
        <span class="chip">${escapeHtml(item.credits)} credits</span>
      </div>
      <div class="plan-price">${escapeHtml(item.price_rub)} ₽</div>
      <div class="plan-meta">~${nb2Count} NB2 · ~${nbproCount} NB Pro · ~${gptCount} GPT2</div>
    `;
    card.addEventListener("click", () => selectTopup(item.code));
    plansGrid.appendChild(card);
  }
  selectTopup(topups[0].code);
}

function selectTemplate(item) {
  state.selectedTemplateId = item.id;
  state.selectedTemplate = {
    id: item.id,
    title: item.title,
    category: item.category,
    prompt: item.prompt,
    preview_image_url: item.preview_image_url,
  };
  promptInput.value = item.prompt || "";
  renderSelectedTemplateCard();
  switchScreen("studio");
  promptInput.focus();
}

function renderTemplates(payload) {
  const items = Array.isArray(payload && payload.items) ? payload.items : [];
  templatesGrid.innerHTML = "";
  if (!items.length) {
    templatesGrid.innerHTML = '<article class="tool-card"><div class="tool-overlay"><strong>Скоро</strong></div></article>';
    return;
  }
  for (const item of items.slice(0, 8)) {
    const card = document.createElement("article");
    card.className = "tool-card";
    const imageUrl = item.preview_image_url || "https://picsum.photos/seed/kartivio-fallback/720/960";
    card.innerHTML = `
      <img src="${escapeHtml(imageUrl)}" alt="${escapeHtml(item.title)}" loading="lazy" />
      <div class="tool-overlay">
        <strong>${escapeHtml(item.title)}</strong>
        <p>${escapeHtml(item.category)}</p>
        <button class="soft-btn" type="button">Использовать</button>
      </div>
    `;
    card.querySelector("button").addEventListener("click", () => selectTemplate(item));
    templatesGrid.appendChild(card);
  }
}

function jobStatusLabel(status) {
  return STATUS_LABELS[status] || status;
}

async function renderActiveImage(job, renderToken) {
  try {
    const rendered = await resolveDisplayImage(job.result_image_url);
    if (renderToken !== state.activeImageRenderToken) {
      return;
    }
    activeResult.className = "active-result active-result-has-image";
    activeResult.innerHTML = `
      <img src="${escapeHtml(rendered.src)}" alt="Результат генерации" />
      <div class="image-actions">
        <button class="soft-btn btn-compact" data-action="open" type="button">Открыть</button>
        <button class="soft-btn btn-compact" data-action="download" type="button">Скачать</button>
      </div>
    `;
    const openBtn = activeResult.querySelector('[data-action="open"]');
    const downloadBtn = activeResult.querySelector('[data-action="download"]');
    openBtn.addEventListener("click", () => {
      openImage(job.result_image_url).catch((error) => {
        setCreateNote(`Не удалось открыть изображение: ${error.message}`, true);
      });
    });
    downloadBtn.addEventListener("click", () => {
      downloadImage(job.result_image_url, `kartivio-${job.id}`).catch((error) => {
        setCreateNote(`Не удалось скачать изображение: ${error.message}`, true);
      });
    });
  } catch (error) {
    if (renderToken !== state.activeImageRenderToken) {
      return;
    }
    activeResult.className = "active-result empty-result";
    activeResult.textContent = `Изображение недоступно: ${error.message}`;
  }
}

function renderActiveJob(job) {
  const status = jobStatusLabel(job.status);
  const mode = job.is_edit ? "редактирование" : "генерация";
  const imageModel = imageModelLabel(job.provider_model);
  activeJobMeta.textContent = `${status} · ${mode} · ${imageModel} · ${job.output_size}`;

  activeResult.className = "active-result";
  if (job.result_image_url) {
    const renderToken = ++state.activeImageRenderToken;
    activeResult.classList.add("empty-result");
    activeResult.textContent = "Загружаю изображение…";
    renderActiveImage(job, renderToken);
    return;
  }
  state.activeImageRenderToken += 1;
  activeResult.classList.add("empty-result");
  activeResult.textContent = job.status === "failed" ? `Ошибка: ${job.error_code || "unknown"}` : "Задача выполняется.";
}

function historyThumb(job) {
  if (!job.result_image_url) {
    return escapeHtml(jobStatusLabel(job.status));
  }
  return "Превью";
}

function renderHistory(payload) {
  const items = Array.isArray(payload && payload.items) ? payload.items : [];
  historyList.innerHTML = "";
  if (!items.length) {
    historyList.innerHTML = '<article class="history-item"><div class="history-body">История пока пустая.</div></article>';
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
        <div class="plan-meta">${escapeHtml(imageModelLabel(job.provider_model))} · ${escapeHtml(job.output_size)} · ${escapeHtml(String(job.requested_credits || 0))} credits</div>
        <div class="history-actions">
          <button class="soft-btn btn-compact" data-action="use-prompt" type="button">Вставить промпт</button>
          <button class="soft-btn btn-compact" data-action="open-image" type="button" ${job.result_image_url ? "" : "disabled"}>Открыть</button>
          <button class="soft-btn btn-compact" data-action="download-image" type="button" ${job.result_image_url ? "" : "disabled"}>Скачать</button>
        </div>
      </div>
    `;
    item.querySelector('[data-action="use-prompt"]').addEventListener("click", () => {
      if (job.prompt) {
        promptInput.value = job.prompt;
        clearSelectedTemplate({ clearPrompt: false });
        switchScreen("studio");
        promptInput.focus();
      }
      setCreateNote("Промпт вставлен в студию.");
    });
    item.querySelector('[data-action="open-image"]').addEventListener("click", () => {
      if (!job.result_image_url) {
        return;
      }
      openImage(job.result_image_url).catch((error) => {
        setCreateNote(`Не удалось открыть изображение: ${error.message}`, true);
      });
    });
    item.querySelector('[data-action="download-image"]').addEventListener("click", () => {
      if (!job.result_image_url) {
        return;
      }
      downloadImage(job.result_image_url, `kartivio-${job.id}`).catch((error) => {
        setCreateNote(`Не удалось скачать изображение: ${error.message}`, true);
      });
    });
    historyList.appendChild(item);

    if (job.result_image_url) {
      resolveDisplayImage(job.result_image_url)
        .then((rendered) => {
          const thumb = item.querySelector(".history-thumb");
          if (!thumb) {
            return;
          }
          let img = thumb.querySelector("img");
          if (!img) {
            img = document.createElement("img");
            img.alt = "Результат";
            img.loading = "lazy";
            thumb.textContent = "";
            thumb.appendChild(img);
          }
          img.src = rendered.src;
        })
        .catch(() => {});
    }
  }
}

async function loadHistory() {
  if (!state.accessToken) {
    historyList.innerHTML = '<article class="history-item"><div class="history-body">Войди, чтобы увидеть историю.</div></article>';
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
    creditsBadge.textContent = "0";
    profileAvatar.textContent = "K";
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

async function createTextGeneration(prompt, imageModel, outputSize, clientRequestId) {
  return authorizedFetch("/v1/generations", {
    method: "POST",
    body: {
      prompt,
      image_model: imageModel,
      output_size: outputSize,
      client_request_id: clientRequestId,
    },
    idempotencyKey: clientRequestId,
  });
}

async function createEditGeneration(prompt, imageModel, outputSize, sourceImage, clientRequestId) {
  const form = new FormData();
  form.append("prompt", prompt);
  form.append("image_model", imageModel);
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
  const imageModel = state.selectedImageModel || DEFAULT_IMAGE_MODEL;
  const outputSize = currentOutputSizeSelection();
  const sourceImage = sourceImageInput.files && sourceImageInput.files[0] ? sourceImageInput.files[0] : null;
  const cost = selectedGenerationCost();

  try {
    ensureAuthorizedForCreate();
    if (!prompt) {
      throw new Error("Добавь промпт.");
    }
    if (!outputSize) {
      throw new Error("Недоступная комбинация разрешения и соотношения.");
    }
    createButton.disabled = true;
    createButton.textContent = "Создаю...";
    setCreateNote(`Списываю ${cost} credits и ставлю задачу в очередь.`);

    const clientRequestId = buildClientRequestId();
    const job = sourceImage
      ? await createEditGeneration(prompt, imageModel, outputSize, sourceImage, clientRequestId)
      : await createTextGeneration(prompt, imageModel, outputSize, clientRequestId);

    state.activeJobId = job.id;
    renderActiveJob(job);
    setCreateNote(`Задача создана: ${job.status}.`);
    await Promise.allSettled([loadPrivateData(), loadHistory()]);
    await pollActiveJob(job.id);
  } catch (error) {
    setCreateNote(error.message, true);
  } finally {
    createButton.disabled = false;
    setCreateButtonIdleLabel();
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
  clearTemplateButton.addEventListener("click", () => {
    clearSelectedTemplate({ clearPrompt: true });
    promptInput.focus();
  });
  promptInput.addEventListener("input", syncTemplateStateFromPrompt);

  uploadPhotoButton.addEventListener("click", () => sourceImageInput.click());
  uploadDropzone.addEventListener("click", () => sourceImageInput.click());
  sourceImageInput.addEventListener("change", renderSelectedSourceImage);

  for (const button of navButtons) {
    button.addEventListener("click", () => switchScreen(button.dataset.nav));
  }
  for (const button of jumpButtons) {
    button.addEventListener("click", () => switchScreen(button.dataset.navTarget));
  }

  plansActionButton.addEventListener("click", () => {
    if (!state.selectedTopupCode) {
      setPlansNote("Сначала выбери пакет.", true);
      return;
    }
    buyPackage(state.selectedTopupCode);
  });
}

async function bootstrap() {
  loadState();
  setEnvHint();
  apiBaseInput.value = state.apiBase;
  renderGenerationChips();
  bindEvents();
  renderSelectedTemplateCard();
  renderSelectedSourceImage();
  refreshGenerationCostNote();
  refreshIcons();

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

  switchScreen("feed");
}

bootstrap();
