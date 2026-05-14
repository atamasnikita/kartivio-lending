const STORAGE_KEYS = {
  apiBase: "kartivio.api_base",
  accessToken: "kartivio.access_token",
  refreshToken: "kartivio.refresh_token",
  lastAuthProvider: "kartivio.last_auth_provider",
};

const DEFAULT_PROD_API_BASE = "https://api.kartivio-ai.ru";
const DEFAULT_LOCAL_API_BASE = "http://127.0.0.1:8093";
const DEFAULT_NGROK_API_BASE = "https://sweptback-semivolcanic-reagan.ngrok-free.dev";
const GOOGLE_CLIENT_ID_META_NAME = "kartivio-google-client-id";
const MAX_SOURCE_IMAGES = 3;
const TEMPLATE_SKELETON_RATIOS = ["1 / 1", "4 / 5", "3 / 4", "5 / 4", "2 / 3", "3 / 2"];
const TEMPLATE_MODAL_ANIMATION_MS = 260;

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
  lastAuthProvider: "",
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
  templates: [],
  templatesLoading: false,
  selectedTemplateFilter: "all",
  activeTemplateModalId: "",
  activeTemplateModalItem: null,
  topups: [],
  selectedTopupCode: "",
  linkedProviders: new Set(),
  telegramLinkToken: "",
  telegramLinkPollTimer: null,
  sourceImageFiles: [],
  sourceImagePreviewUrls: [],
};

const tg = window.Telegram && window.Telegram.WebApp ? window.Telegram.WebApp : null;
const TELEGRAM_BOT_URL = "https://t.me/kartivio_ai_bot";

const appShell = document.getElementById("appShell");
const authGate = document.getElementById("authGate");
const devPanel = document.getElementById("devPanel");
const apiBaseInput = document.getElementById("apiBaseInput");
const authButton = document.getElementById("authButton");
const googleAuthButton = document.getElementById("googleAuthButton");
const googleSigninWrap = document.getElementById("googleSigninWrap");
const googleSigninButton = document.getElementById("googleSigninButton");
const envHint = document.getElementById("envHint");
const authNote = document.getElementById("authNote");
const userName = document.getElementById("userName");
const userTgId = document.getElementById("userTgId");
const creditsValue = document.getElementById("creditsValue");
const creditsBadge = document.getElementById("creditsBadge");
const profileAvatar = document.getElementById("profileAvatar");
const identityGoogle = document.getElementById("identityGoogle");
const identityTelegram = document.getElementById("identityTelegram");
const linkTelegramButton = document.getElementById("linkTelegramButton");
const telegramLinkNote = document.getElementById("telegramLinkNote");
const plansGrid = document.getElementById("plansGrid");
const plansActionButton = document.getElementById("plansActionButton");
const plansNote = document.getElementById("plansNote");
const templateFilterChips = document.getElementById("templateFilterChips");
const templatesGrid = document.getElementById("templatesGrid");
const promptInput = document.getElementById("promptInput");
const modelChips = document.getElementById("modelChips");
const resolutionChips = document.getElementById("resolutionChips");
const ratioChips = document.getElementById("ratioChips");
const sourceImageInput = document.getElementById("sourceImageInput");
const uploadPhotoButton = document.getElementById("uploadPhotoButton");
const uploadDropzone = document.getElementById("uploadDropzone");
const dropzoneEmptyState = document.getElementById("dropzoneEmptyState");
const dropzoneTitle = document.getElementById("dropzoneTitle");
const sourceImagePreviewGrid = document.getElementById("sourceImagePreviewGrid");
const dropzonePreviewBadge = document.getElementById("dropzonePreviewBadge");
const clearSourceImageButton = document.getElementById("clearSourceImageButton");
const sourceTipsButton = document.getElementById("sourceTipsButton");
const sourceTipsPanel = document.getElementById("sourceTipsPanel");
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
const templateModal = document.getElementById("templateModal");
const templateModalClose = document.getElementById("templateModalClose");
const templateModalImage = document.getElementById("templateModalImage");
const templateModalTitle = document.getElementById("templateModalTitle");
const templateModalCategory = document.getElementById("templateModalCategory");
const templateModalPrompt = document.getElementById("templateModalPrompt");
const templateCopyPromptButton = document.getElementById("templateCopyPromptButton");
const templateUseButton = document.getElementById("templateUseButton");
const templateModalNote = document.getElementById("templateModalNote");
const navButtons = Array.from(document.querySelectorAll("[data-nav]"));
const jumpButtons = Array.from(document.querySelectorAll("[data-nav-target]"));
const screens = Array.from(document.querySelectorAll("[data-screen]"));
let googleAuthPending = false;
let googleIdentitySignature = "";
let templateModalCloseTimer = null;

function refreshIcons() {
  if (window.lucide && typeof window.lucide.createIcons === "function") {
    window.lucide.createIcons();
  }
}

function isTelegramMiniAppRuntime() {
  return Boolean(tg && tg.initData);
}

function isDevMode() {
  return new URLSearchParams(window.location.search).get("dev") === "1";
}

function setAuthGateVisible(visible) {
  if (authGate) {
    authGate.classList.toggle("is-hidden", !visible);
  }
  if (appShell) {
    appShell.classList.toggle("is-hidden", visible);
  }
}

function setDevPanelVisibility() {
  if (!devPanel) {
    return;
  }
  devPanel.classList.toggle("is-hidden", !isDevMode());
}

function pickDefaultApiBase() {
  const host = window.location.hostname || "";
  if (host === "localhost" || host === "127.0.0.1") {
    return DEFAULT_LOCAL_API_BASE;
  }
  return DEFAULT_PROD_API_BASE;
}

function googleClientIdFromMeta() {
  const queryClientId = String(new URLSearchParams(window.location.search).get("google_client_id") || "").trim();
  if (queryClientId) {
    return queryClientId;
  }
  const tag = document.querySelector(`meta[name="${GOOGLE_CLIENT_ID_META_NAME}"]`);
  if (!tag) {
    return "";
  }
  return String(tag.getAttribute("content") || "").trim();
}

function googleAuthLaunchUrl() {
  const url = new URL(window.location.href);
  url.searchParams.set("google_auto", "1");
  return url.toString();
}

function hasGoogleSdk() {
  return Boolean(window.google && window.google.accounts && window.google.accounts.id);
}

function currentReturnToUrl() {
  const url = new URL(window.location.href);
  url.searchParams.delete("google_auto");
  return url.toString();
}

function googleRedirectLoginUri() {
  return `${trimApiBase(state.apiBase)}/v1/auth/google/redirect`;
}

function encodeGoogleButtonState(payload) {
  const raw = JSON.stringify(payload);
  const bytes = new TextEncoder().encode(raw);
  let binary = "";
  for (const byte of bytes) {
    binary += String.fromCharCode(byte);
  }
  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/g, "");
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

function creditsWord(amount) {
  const abs = Math.abs(Number(amount || 0));
  const mod10 = abs % 10;
  const mod100 = abs % 100;
  if (mod10 === 1 && mod100 !== 11) {
    return "кредит";
  }
  if (mod10 >= 2 && mod10 <= 4 && (mod100 < 12 || mod100 > 14)) {
    return "кредита";
  }
  return "кредитов";
}

function formatCredits(amount) {
  const value = Number(amount || 0);
  return `${value} ${creditsWord(value)}`;
}

function setCreateButtonIdleLabel() {
  const cost = selectedGenerationCost();
  createButton.textContent = `Генерировать · ${formatCredits(cost)}`;
}

function ratioLabel(ratio) {
  return RATIO_LABELS[String(ratio || "").trim()] || String(ratio || "").trim();
}

function resolutionLabel(resolution) {
  return RESOLUTION_LABELS[String(resolution || "").trim()] || String(resolution || "").trim();
}

function parseRatioDimensions(ratio) {
  const raw = String(ratio || "").trim();
  const parts = raw.split(":");
  if (parts.length !== 2) {
    return null;
  }
  const width = Number(parts[0]);
  const height = Number(parts[1]);
  if (!Number.isFinite(width) || !Number.isFinite(height) || width <= 0 || height <= 0) {
    return null;
  }
  return { width, height };
}

function createRatioPreview(ratio) {
  const dimensions = parseRatioDimensions(ratio);
  if (!dimensions) {
    return null;
  }
  const preview = document.createElement("span");
  preview.className = "ratio-chip-preview";
  preview.setAttribute("aria-hidden", "true");
  preview.style.setProperty("--ratio-width", String(dimensions.width));
  preview.style.setProperty("--ratio-height", String(dimensions.height));

  const frame = document.createElement("span");
  frame.className = "ratio-chip-preview-frame";
  preview.appendChild(frame);
  return preview;
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
    `Выбрано: ${model}, ${resolutionLabel(resolution)}, ${ratioLabel(ratio)} (${outputSize}). Списание: ${formatCredits(cost)}.`
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
  const labelNode = document.createElement("span");
  labelNode.className = "choice-chip-label";
  labelNode.textContent = label;
  button.appendChild(labelNode);
  if (lock) {
    const lockNode = document.createElement("span");
    lockNode.className = "chip-lock";
    lockNode.textContent = "🔒";
    button.appendChild(lockNode);
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
    chip.classList.add("choice-chip-ratio");
    const preview = createRatioPreview(ratio);
    if (preview) {
      const labelNode = chip.querySelector(".choice-chip-label");
      chip.insertBefore(preview, labelNode || null);
    }
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
  localStorage.setItem(STORAGE_KEYS.lastAuthProvider, state.lastAuthProvider);
}

function loadState() {
  const queryApiBase = trimApiBase(new URLSearchParams(window.location.search).get("api"));
  const storedApiBase = trimApiBase(localStorage.getItem(STORAGE_KEYS.apiBase));
  state.apiBase = queryApiBase || storedApiBase || pickDefaultApiBase();
  state.accessToken = localStorage.getItem(STORAGE_KEYS.accessToken) || "";
  state.refreshToken = localStorage.getItem(STORAGE_KEYS.refreshToken) || "";
  state.lastAuthProvider = String(localStorage.getItem(STORAGE_KEYS.lastAuthProvider) || "").trim().toLowerCase();
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
  if (!authNote) {
    return;
  }
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
  closeTemplateModal();
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

function sourceImageFiles() {
  return Array.isArray(state.sourceImageFiles) ? state.sourceImageFiles : [];
}

function sourceImageFilesForUpload() {
  return sourceImageFiles().slice(0, MAX_SOURCE_IMAGES);
}

function selectedFilesFromInput() {
  if (!sourceImageInput || !sourceImageInput.files) {
    return [];
  }
  return Array.from(sourceImageInput.files).filter((item) => item instanceof File);
}

function revokeSourceImagePreview() {
  for (const url of state.sourceImagePreviewUrls) {
    URL.revokeObjectURL(url);
  }
  state.sourceImagePreviewUrls = [];
}

function sourceImageSizeLabel(bytes) {
  const mb = Number(bytes || 0) / 1024 / 1024;
  if (mb <= 0) {
    return "0 MB";
  }
  if (mb < 1) {
    return `${mb.toFixed(2)} MB`;
  }
  return `${mb.toFixed(1)} MB`;
}

function sourceImageTotalSizeLabel(files) {
  const totalBytes = files.reduce((sum, file) => sum + Number(file.size || 0), 0);
  return sourceImageSizeLabel(totalBytes);
}

function setSourceImagePreviewFromFiles(files) {
  revokeSourceImagePreview();
  if (!files.length) {
    return;
  }
  state.sourceImagePreviewUrls = files.map((file) => URL.createObjectURL(file));
}

function fileIdentity(file) {
  return `${file.name}::${file.size}::${file.lastModified}::${file.type}`;
}

function setSourceImages(files) {
  state.sourceImageFiles = files.slice(0, MAX_SOURCE_IMAGES);
  setSourceImagePreviewFromFiles(state.sourceImageFiles);
}

function appendSourceImages(filesToAppend) {
  const next = sourceImageFiles().slice();
  const seen = new Set(next.map((item) => fileIdentity(item)));
  let skipped = 0;

  for (const file of filesToAppend) {
    if (next.length >= MAX_SOURCE_IMAGES) {
      skipped += 1;
      continue;
    }
    const key = fileIdentity(file);
    if (seen.has(key)) {
      skipped += 1;
      continue;
    }
    seen.add(key);
    next.push(file);
  }
  setSourceImages(next);
  return { skipped };
}

function removeSourceImageAt(index) {
  const current = sourceImageFiles();
  if (index < 0 || index >= current.length) {
    return;
  }
  const next = current.filter((_item, itemIndex) => itemIndex !== index);
  setSourceImages(next);
}

function openSourceImagePicker() {
  if (!sourceImageInput) {
    return;
  }
  sourceImageInput.value = "";
  if (typeof sourceImageInput.showPicker === "function") {
    try {
      sourceImageInput.showPicker();
      return;
    } catch (_error) {
      // fallback to click() for environments where showPicker is unavailable or blocked
    }
  }
  sourceImageInput.click();
}

function clearSelectedSourceImage() {
  if (sourceImageInput) {
    sourceImageInput.value = "";
  }
  setSourceImages([]);
  renderSelectedSourceImage();
}

function renderSelectedSourceImage() {
  const files = sourceImageFiles();
  const hasFiles = files.length > 0;

  if (!files.length) {
    dropzoneTitle.textContent = "Добавить фото";
    sourceImageMeta.textContent = "Файл не выбран";
    uploadDropzone.classList.remove("has-image");
    if (dropzoneEmptyState) {
      dropzoneEmptyState.classList.remove("is-hidden");
    }
    if (sourceImagePreviewGrid) {
      sourceImagePreviewGrid.classList.add("is-hidden");
      sourceImagePreviewGrid.innerHTML = "";
    }
    if (dropzonePreviewBadge) {
      dropzonePreviewBadge.classList.add("is-hidden");
    }
    if (clearSourceImageButton) {
      clearSourceImageButton.classList.add("is-hidden");
    }
    return;
  }

  const totalCount = files.length;
  dropzoneTitle.textContent = totalCount === 1 ? files[0].name : `Выбрано ${totalCount} фото`;
  sourceImageMeta.textContent = `${totalCount} фото · ${sourceImageTotalSizeLabel(files)}`;

  if (hasFiles && sourceImagePreviewGrid) {
    sourceImagePreviewGrid.innerHTML = "";
    for (const [index, file] of files.entries()) {
      const cell = document.createElement("figure");
      cell.className = "dropzone-preview-thumb";

      const img = document.createElement("img");
      img.src = state.sourceImagePreviewUrls[index] || "";
      img.alt = `Референс ${index + 1}: ${file.name}`;
      img.loading = "lazy";
      cell.appendChild(img);

      const removeBtn = document.createElement("button");
      removeBtn.type = "button";
      removeBtn.className = "dropzone-thumb-remove";
      removeBtn.setAttribute("aria-label", `Убрать референс ${index + 1}`);
      removeBtn.textContent = "×";
      removeBtn.addEventListener("click", (event) => {
        event.preventDefault();
        event.stopPropagation();
        removeSourceImageAt(index);
        renderSelectedSourceImage();
        renderSelectedTemplateCard();
        setCreateNote("Референс удален.");
      });
      cell.appendChild(removeBtn);

      sourceImagePreviewGrid.appendChild(cell);
    }
    sourceImagePreviewGrid.classList.remove("is-hidden");
    uploadDropzone.classList.add("has-image");
  } else {
    uploadDropzone.classList.remove("has-image");
    if (sourceImagePreviewGrid) {
      sourceImagePreviewGrid.classList.add("is-hidden");
      sourceImagePreviewGrid.innerHTML = "";
    }
  }
  if (dropzoneEmptyState) {
    dropzoneEmptyState.classList.toggle("is-hidden", hasFiles);
  }
  if (dropzonePreviewBadge) {
    dropzonePreviewBadge.textContent = `${files.length} фото для редактирования`;
    dropzonePreviewBadge.classList.toggle("is-hidden", !hasFiles);
  }
  if (clearSourceImageButton) {
    clearSourceImageButton.classList.remove("is-hidden");
  }
}

function handleSourceImageChange() {
  const pickedFiles = selectedFilesFromInput();
  if (sourceImageInput) {
    sourceImageInput.value = "";
  }
  if (!pickedFiles.length) {
    return;
  }

  const { skipped } = appendSourceImages(pickedFiles);
  if (skipped > 0) {
    setCreateNote(`Добавлено до ${MAX_SOURCE_IMAGES} уникальных фото. Лишние пропущены.`, true);
  } else {
    refreshGenerationCostNote();
  }
  renderSelectedSourceImage();
  renderSelectedTemplateCard();
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
  const hasSourceImage = sourceImageFilesForUpload().length > 0;
  const currentPrompt = String(promptInput.value || "").trim();
  const sourcePrompt = String(state.selectedTemplate.prompt || "").trim();
  if (!currentPrompt) {
    return hasSourceImage ? "Промпт очищен · фото добавлено" : "Промпт очищен";
  }
  if (currentPrompt === sourcePrompt) {
    return hasSourceImage ? "Шаблон вставлен · фото добавлено" : "Шаблон вставлен без изменений";
  }
  return hasSourceImage ? "Шаблон выбран · промпт изменен · фото добавлено" : "Шаблон выбран, промпт изменен";
}

function toggleSourceTips(forceVisible = null) {
  if (!sourceTipsPanel) {
    return;
  }
  const nextVisible = forceVisible === null ? sourceTipsPanel.classList.contains("is-hidden") : Boolean(forceVisible);
  sourceTipsPanel.classList.toggle("is-hidden", !nextVisible);
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
  if (!envHint) {
    return;
  }
  if (!tg) {
    envHint.textContent = "Открыто в обычном браузере.";
    return;
  }
  tg.ready();
  tg.expand();
  envHint.textContent = "Открыто в Telegram Mini App.";
}

function refreshAuthButtons() {
  if (!googleAuthButton) {
    return;
  }
  if (isTelegramMiniAppRuntime()) {
    googleAuthButton.textContent = "Войти через Google в браузере";
  } else {
    googleAuthButton.textContent = "Войти через Google";
  }
  googleAuthButton.classList.remove("is-hidden");
  if (googleSigninWrap) {
    googleSigninWrap.classList.add("is-hidden");
  }
}

function setTelegramLinkNote(message, isError = false) {
  if (!telegramLinkNote) {
    return;
  }
  telegramLinkNote.textContent = message;
  telegramLinkNote.style.color = isError ? "#ff8f8f" : "#8f98b0";
}

function clearTelegramLinkPolling() {
  if (!state.telegramLinkPollTimer) {
    return;
  }
  window.clearTimeout(state.telegramLinkPollTimer);
  state.telegramLinkPollTimer = null;
}

function renderIdentityActions() {
  const linkedTelegram = state.linkedProviders.has("telegram");
  if (identityTelegram) {
    identityTelegram.textContent = linkedTelegram ? "Подключен" : "Не подключен";
  }
  if (identityGoogle) {
    identityGoogle.textContent = state.linkedProviders.has("google") ? "Подключен" : "Не подключен";
  }

  if (linkTelegramButton) {
    linkTelegramButton.disabled = linkedTelegram || !state.accessToken;
    linkTelegramButton.textContent = linkedTelegram ? "Telegram привязан" : "Привязать Telegram";
  }

  if (linkedTelegram) {
    clearTelegramLinkPolling();
    state.telegramLinkToken = "";
    setTelegramLinkNote("Связка активна.");
  } else {
    setTelegramLinkNote("Привяжи Telegram, чтобы синхронизировать вход в боте и вебе.");
  }
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
  if (Array.isArray(payload.detail) && payload.detail.length > 0) {
    const first = payload.detail[0];
    if (first && typeof first === "object") {
      const loc = Array.isArray(first.loc) ? first.loc.join(".") : "";
      const msg = typeof first.msg === "string" ? first.msg.trim() : "";
      if (loc && msg) {
        return `${loc}: ${msg}`;
      }
      if (msg) {
        return msg;
      }
    }
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
      setAuthGateVisible(true);
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
      setAuthGateVisible(true);
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
  creditsValue.textContent = formatCredits(balance);
  creditsBadge.textContent = String(balance);
  profileAvatar.textContent = display === "—" ? "K" : display[0].toUpperCase();
  renderIdentityActions();
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
    setPlansNote("Сначала войди в аккаунт.", true);
    setAuthGateVisible(true);
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
        <span class="chip">${escapeHtml(formatCredits(item.credits))}</span>
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
    full_image_url: item.full_image_url,
  };
  promptInput.value = item.prompt || "";
  renderSelectedTemplateCard();
  switchScreen("studio");
  promptInput.focus();
}

function normalizeTemplateCategory(raw) {
  return String(raw || "").trim() || "Разное";
}

function templatePreviewUrl(item) {
  const preview = String(item.preview_image_url || "").trim();
  return preview || "https://picsum.photos/seed/kartivio-fallback/720/960";
}

function templateFullUrl(item) {
  const full = String(item.full_image_url || "").trim();
  return full || templatePreviewUrl(item);
}

function templatePreviewRatio(item) {
  const width = Number(item.preview_width || 0);
  const height = Number(item.preview_height || 0);
  if (Number.isFinite(width) && Number.isFinite(height) && width > 0 && height > 0) {
    return width / height;
  }
  return 1;
}

function templateFilterLabel(filterId) {
  return filterId === "all" ? "Все темы" : filterId;
}

function currentTemplateModalItem() {
  if (state.activeTemplateModalItem) {
    return state.activeTemplateModalItem;
  }
  if (!state.activeTemplateModalId) {
    return null;
  }
  return state.templates.find((item) => item.id === state.activeTemplateModalId) || null;
}

function setTemplateModalNote(message, isError = false) {
  if (!templateModalNote) {
    return;
  }
  templateModalNote.textContent = message;
  templateModalNote.style.color = isError ? "#ff8f8f" : "#8f98b0";
}

async function copyPromptToClipboard(prompt) {
  const value = String(prompt || "").trim();
  if (!value) {
    throw new Error("Промпт пустой.");
  }
  if (navigator.clipboard && typeof navigator.clipboard.writeText === "function") {
    await navigator.clipboard.writeText(value);
    return;
  }
  const area = document.createElement("textarea");
  area.value = value;
  area.setAttribute("readonly", "true");
  area.style.position = "absolute";
  area.style.left = "-9999px";
  document.body.appendChild(area);
  area.select();
  const copied = document.execCommand("copy");
  area.remove();
  if (!copied) {
    throw new Error("Копирование не поддерживается в этом браузере.");
  }
}

function closeTemplateModal() {
  state.activeTemplateModalId = "";
  state.activeTemplateModalItem = null;
  if (templateModalCloseTimer) {
    window.clearTimeout(templateModalCloseTimer);
    templateModalCloseTimer = null;
  }
  const shouldAnimateClose = Boolean(
    templateModal &&
    !templateModal.classList.contains("is-hidden") &&
    templateModal.classList.contains("is-visible")
  );
  if (templateModal && shouldAnimateClose) {
    templateModal.classList.remove("is-visible");
    templateModalCloseTimer = window.setTimeout(() => {
      if (templateModal && !templateModal.classList.contains("is-visible")) {
        templateModal.classList.add("is-hidden");
      }
      templateModalCloseTimer = null;
    }, TEMPLATE_MODAL_ANIMATION_MS);
  } else if (templateModal) {
    templateModal.classList.add("is-hidden");
    templateModal.classList.remove("is-visible");
  }
  document.body.classList.remove("template-modal-open");
  setTemplateModalNote("");
}

function openTemplateModal(item) {
  state.activeTemplateModalId = item.id;
  state.activeTemplateModalItem = { ...item };
  if (!templateModal) {
    return;
  }
  const imageUrl = templateFullUrl(item) || "https://picsum.photos/seed/kartivio-template/1080/1440";
  templateModalImage.src = imageUrl;
  templateModalImage.alt = item.title || "Шаблон";
  templateModalTitle.textContent = item.title || "Шаблон";
  templateModalCategory.textContent = normalizeTemplateCategory(item.category);
  templateModalPrompt.textContent = item.prompt || "";
  setTemplateModalNote("");
  if (templateModalCloseTimer) {
    window.clearTimeout(templateModalCloseTimer);
    templateModalCloseTimer = null;
  }
  templateModal.classList.remove("is-hidden");
  window.requestAnimationFrame(() => {
    if (templateModal) {
      templateModal.classList.add("is-visible");
    }
  });
  document.body.classList.add("template-modal-open");
}

function templateFilters() {
  const categories = [];
  const seen = new Set();
  for (const item of state.templates) {
    const category = normalizeTemplateCategory(item.category);
    if (seen.has(category)) {
      continue;
    }
    seen.add(category);
    categories.push(category);
  }
  return ["all", ...categories];
}

function renderTemplateFilters() {
  if (!templateFilterChips) {
    return;
  }
  const filters = templateFilters();
  if (!filters.includes(state.selectedTemplateFilter)) {
    state.selectedTemplateFilter = "all";
  }
  templateFilterChips.innerHTML = "";

  for (const filterId of filters) {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "template-filter-chip";
    button.textContent = templateFilterLabel(filterId);
    button.setAttribute("role", "tab");
    const isActive = state.selectedTemplateFilter === filterId;
    button.classList.toggle("is-active", isActive);
    button.setAttribute("aria-selected", isActive ? "true" : "false");
    button.addEventListener("click", () => {
      state.selectedTemplateFilter = filterId;
      renderTemplateFilters();
      renderTemplateCards();
    });
    templateFilterChips.appendChild(button);
  }
}

function filteredTemplateItems() {
  if (state.selectedTemplateFilter === "all") {
    return state.templates;
  }
  return state.templates.filter((item) => normalizeTemplateCategory(item.category) === state.selectedTemplateFilter);
}

function renderTemplateSkeleton(count = 6) {
  const total = Math.min(Math.max(Number(count || 0), 6), 18);
  templatesGrid.innerHTML = "";
  for (let index = 0; index < total; index += 1) {
    const ratio = TEMPLATE_SKELETON_RATIOS[index % TEMPLATE_SKELETON_RATIOS.length];
    const card = document.createElement("article");
    card.className = "tool-card tool-card-skeleton";
    card.style.setProperty("--template-ratio", ratio);
    card.innerHTML = `
      <div class="tool-media"></div>
      <div class="tool-overlay">
        <strong class="skeleton-line skeleton-line-title"></strong>
        <p class="skeleton-line skeleton-line-subtitle"></p>
      </div>
    `;
    templatesGrid.appendChild(card);
  }
}

function renderTemplateCards() {
  const items = filteredTemplateItems();
  if (state.templatesLoading) {
    renderTemplateSkeleton(items.length || 6);
    return;
  }
  templatesGrid.innerHTML = "";
  if (!items.length) {
    templatesGrid.innerHTML = '<article class="tool-card"><div class="tool-overlay"><strong>Нет шаблонов</strong><p>Попробуй другой фильтр</p></div></article>';
    return;
  }

  for (const item of items) {
    const card = document.createElement("article");
    card.className = "tool-card";
    card.setAttribute("role", "button");
    card.setAttribute("tabindex", "0");
    const imageUrl = templatePreviewUrl(item);
    const ratio = Number(item.preview_ratio || templatePreviewRatio(item) || 1);
    card.style.setProperty("--template-ratio", Number.isFinite(ratio) && ratio > 0 ? String(ratio) : "1");
    card.innerHTML = `
      <div class="tool-media">
        <img src="${escapeHtml(imageUrl)}" alt="${escapeHtml(item.title)}" loading="lazy" decoding="async" />
      </div>
      <div class="tool-overlay">
        <strong>${escapeHtml(item.title)}</strong>
        <p>${escapeHtml(normalizeTemplateCategory(item.category))}</p>
      </div>
    `;
    card.addEventListener("click", () => openTemplateModal(item));
    card.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        openTemplateModal(item);
      }
    });
    templatesGrid.appendChild(card);
  }
}

function renderTemplates(payload) {
  const items = Array.isArray(payload && payload.items) ? payload.items : [];
  const normalized = items.map((item) => ({
    id: String(item.id || "").trim(),
    title: String(item.title || "").trim() || "Шаблон",
    category: normalizeTemplateCategory(item.category),
    prompt: String(item.prompt || "").trim(),
    preview_image_url: String(item.preview_image_url || "").trim(),
    full_image_url: String(item.full_image_url || "").trim(),
    preview_width: Number(item.preview_width || 0),
    preview_height: Number(item.preview_height || 0),
  })).filter((item) => item.id && item.prompt);
  state.templates = normalized.map((item) => ({
    ...item,
    preview_ratio: templatePreviewRatio(item),
  }));
  state.templatesLoading = false;
  renderTemplateFilters();
  renderTemplateCards();
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
        <div class="plan-meta">${escapeHtml(imageModelLabel(job.provider_model))} · ${escapeHtml(job.output_size)} · ${escapeHtml(formatCredits(job.requested_credits || 0))}</div>
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

async function loadIdentities() {
  const payload = await authorizedGetWithRetry("/v1/account/identities", 1);
  const providers = Array.isArray(payload.providers) ? payload.providers : [];
  state.linkedProviders = new Set(
    providers
      .map((item) => String(item || "").trim().toLowerCase())
      .filter((item) => item.length > 0),
  );
  if (payload.linked_telegram && !state.linkedProviders.has("telegram")) {
    state.linkedProviders.add("telegram");
  }
  if (payload.linked_google && !state.linkedProviders.has("google")) {
    state.linkedProviders.add("google");
  }
  if (!state.linkedProviders.has("telegram") && payload.telegram_user_id) {
    state.linkedProviders.add("telegram");
  }
  renderIdentityActions();
}

async function loadPrivateData() {
  if (!state.accessToken) {
    clearTelegramLinkPolling();
    state.telegramLinkToken = "";
    state.linkedProviders = new Set();
    userName.textContent = "—";
    userTgId.textContent = "—";
    creditsValue.textContent = "—";
    creditsBadge.textContent = "0";
    profileAvatar.textContent = "K";
    renderIdentityActions();
    return;
  }
  const [me, wallet] = await Promise.all([
    authorizedGetWithRetry("/v1/me", 1),
    authorizedGetWithRetry("/v1/wallet?limit=1", 1),
  ]);
  await loadIdentities();
  renderUser(me, wallet);
}

function ensureAuthorizedForCreate() {
  if (!state.accessToken) {
    setAuthGateVisible(true);
    throw new Error("Сначала войди в аккаунт.");
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

async function createEditGeneration(prompt, imageModel, outputSize, sourceImages, clientRequestId) {
  const form = new FormData();
  form.append("prompt", prompt);
  form.append("image_model", imageModel);
  form.append("output_size", outputSize);
  form.append("client_request_id", clientRequestId);
  for (const sourceImage of sourceImages) {
    form.append("source_image", sourceImage);
  }
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
  const sourceImages = sourceImageFilesForUpload();
  const totalSelectedFiles = sourceImageFiles().length;
  const cost = selectedGenerationCost();

  try {
    ensureAuthorizedForCreate();
    if (!prompt) {
      throw new Error("Добавь промпт.");
    }
    if (!outputSize) {
      throw new Error("Недоступная комбинация разрешения и соотношения.");
    }
    if (totalSelectedFiles > MAX_SOURCE_IMAGES) {
      throw new Error(`Можно загрузить не более ${MAX_SOURCE_IMAGES} фото.`);
    }
    if (sourceImages.length > 0) {
      const maxBytes = 10 * 1024 * 1024;
      const allowedMime = new Set(["image/png", "image/jpeg", "image/webp"]);
      for (const sourceImage of sourceImages) {
        const mime = String(sourceImage.type || "").toLowerCase();
        if (!sourceImage.size) {
          throw new Error("Один из файлов пустой. Выбери другое фото.");
        }
        if (sourceImage.size > maxBytes) {
          throw new Error("Один из файлов больше 10 MB. Сожми изображение и повтори.");
        }
        if (mime && !allowedMime.has(mime)) {
          throw new Error("Поддерживаются только PNG, JPG и WEBP.");
        }
      }
    }
    createButton.disabled = true;
    createButton.textContent = "Создаю...";
    setCreateNote(`Списываю ${formatCredits(cost)} и ставлю задачу в очередь.`);

    const clientRequestId = buildClientRequestId();
    const job = sourceImages.length > 0
      ? await createEditGeneration(prompt, imageModel, outputSize, sourceImages, clientRequestId)
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

function openBotLink() {
  if (tg && typeof tg.openLink === "function") {
    tg.openLink(TELEGRAM_BOT_URL);
    return;
  }
  window.open(TELEGRAM_BOT_URL, "_blank", "noopener,noreferrer");
}

function openTelegramDeepLink(url) {
  if (tg && typeof tg.openTelegramLink === "function") {
    tg.openTelegramLink(url);
    return;
  }
  if (tg && typeof tg.openLink === "function") {
    tg.openLink(url);
    return;
  }
  window.open(url, "_blank", "noopener,noreferrer");
}

async function pollTelegramLinkStatus() {
  if (!state.accessToken || !state.telegramLinkToken) {
    return;
  }
  try {
    const payload = await authorizedGetWithRetry(
      `/v1/account/link/telegram/status?link_token=${encodeURIComponent(state.telegramLinkToken)}`,
      1,
    );
    const status = String(payload.status || "").trim().toLowerCase();
    if (status === "pending") {
      setTelegramLinkNote(payload.message || "Ожидаем подтверждение в Telegram.");
      state.telegramLinkPollTimer = window.setTimeout(() => {
        pollTelegramLinkStatus().catch(() => {});
      }, 2000);
      return;
    }
    if (status === "linked") {
      setTelegramLinkNote(payload.message || "Telegram успешно привязан.");
      state.telegramLinkToken = "";
      clearTelegramLinkPolling();
      await loadPrivateData();
      return;
    }
    if (status === "conflict") {
      setTelegramLinkNote(payload.message || "Этот Telegram уже привязан к другому аккаунту.", true);
      state.telegramLinkToken = "";
      clearTelegramLinkPolling();
      return;
    }
    setTelegramLinkNote(payload.message || "Ссылка истекла. Создай новую.", true);
    state.telegramLinkToken = "";
    clearTelegramLinkPolling();
  } catch (error) {
    setTelegramLinkNote(`Не удалось проверить привязку: ${error.message}`, true);
    state.telegramLinkPollTimer = window.setTimeout(() => {
      pollTelegramLinkStatus().catch(() => {});
    }, 3000);
  }
}

async function startTelegramLink() {
  if (!state.accessToken) {
    setAuthGateVisible(true);
    return;
  }
  if (state.linkedProviders.has("telegram")) {
    setTelegramLinkNote("Telegram уже привязан.");
    return;
  }

  if (linkTelegramButton) {
    linkTelegramButton.disabled = true;
    linkTelegramButton.textContent = "Готовлю ссылку...";
  }

  try {
    const payload = await authorizedFetch("/v1/account/link/telegram/start", {
      method: "POST",
    });
    state.telegramLinkToken = String(payload.link_token || "").trim();
    if (!state.telegramLinkToken) {
      throw new Error("Не пришел link_token.");
    }
    const deepLink = String(payload.deep_link_url || "").trim();
    if (!deepLink) {
      throw new Error("Не пришла deep-link ссылка.");
    }
    setTelegramLinkNote("Открываю Telegram. Нажми Start в боте, затем вернись в веб.");
    openTelegramDeepLink(deepLink);
    clearTelegramLinkPolling();
    state.telegramLinkPollTimer = window.setTimeout(() => {
      pollTelegramLinkStatus().catch(() => {});
    }, 1500);
  } catch (error) {
    setTelegramLinkNote(`Ошибка старта привязки: ${error.message}`, true);
  } finally {
    renderIdentityActions();
  }
}

async function hydrateAuthorizedSession() {
  if (!state.accessToken) {
    return false;
  }
  try {
    await Promise.all([loadPrivateData(), loadHistory()]);
    return true;
  } catch (_error) {
    state.accessToken = "";
    state.refreshToken = "";
    saveState();
    return false;
  }
}

async function loginViaTelegram(options = {}) {
  const { silent = false, targetScreen = "feed" } = options;
  if (!tg || !tg.initData) {
    openBotLink();
    if (!silent) {
      setNote("Открой Mini App из бота для входа через Telegram.");
    }
    return false;
  }
  if (authButton) {
    authButton.disabled = true;
    authButton.textContent = "Проверяю...";
  }
  try {
    const payload = await apiFetch("/v1/auth/telegram/miniapp", {
      method: "POST",
      body: { init_data: tg.initData },
    });
    state.accessToken = payload.access_token;
    state.refreshToken = payload.refresh_token;
    state.lastAuthProvider = "telegram";
    saveState();
    setAuthGateVisible(false);
    if (!silent) {
      setNote("Авторизация успешна.");
    }
    await Promise.all([loadPrivateData(), loadHistory()]);
    switchScreen(targetScreen);
    return true;
  } catch (error) {
    if (!silent) {
      setNote(`Ошибка авторизации: ${error.message}`, true);
    }
    return false;
  } finally {
    if (authButton) {
      authButton.disabled = false;
      authButton.textContent = "Войти через Telegram";
    }
  }
}

function setGoogleAuthButtonIdle() {
  googleAuthPending = false;
  if (googleAuthButton) {
    googleAuthButton.disabled = false;
  }
  refreshAuthButtons();
}

async function loginViaGoogleCredential(idToken) {
  const payload = await apiFetch("/v1/auth/google", {
    method: "POST",
    body: { id_token: idToken },
  });
  state.accessToken = payload.access_token;
  state.refreshToken = payload.refresh_token;
  state.lastAuthProvider = "google";
  saveState();
  setAuthGateVisible(false);
  setNote("Авторизация через Google успешна.");
  await Promise.all([loadPrivateData(), loadHistory()]);
  switchScreen("feed");
}

function ensureGoogleIdentityInitialized(clientId) {
  const loginUri = googleRedirectLoginUri();
  const signature = `${clientId}|redirect|${loginUri}`;
  if (googleIdentitySignature === signature) {
    return;
  }
  window.google.accounts.id.initialize({
    client_id: clientId,
    ux_mode: "redirect",
    login_uri: loginUri,
  });
  googleIdentitySignature = signature;
}

function renderGoogleSigninButtonIfPossible({ redirectFlow = false, show = false } = {}) {
  if (!googleSigninWrap || !googleSigninButton) {
    return false;
  }
  if (isTelegramMiniAppRuntime()) {
    googleSigninWrap.classList.add("is-hidden");
    return false;
  }
  const clientId = googleClientIdFromMeta();
  if (!clientId || !hasGoogleSdk()) {
    googleSigninWrap.classList.add("is-hidden");
    return false;
  }
  if (!state.apiBase) {
    googleSigninWrap.classList.add("is-hidden");
    return false;
  }
  ensureGoogleIdentityInitialized(clientId);
  const stateToken = encodeGoogleButtonState({ return_to: currentReturnToUrl() });
  googleSigninButton.innerHTML = "";
  window.google.accounts.id.renderButton(googleSigninButton, {
    type: "standard",
    theme: redirectFlow ? "filled_blue" : "outline",
    size: "large",
    text: "signin_with",
    shape: "rectangular",
    logo_alignment: "left",
    width: "380",
    state: stateToken,
  });
  googleSigninWrap.classList.toggle("is-hidden", !show);
  return true;
}

function triggerRenderedGoogleButtonClick() {
  if (!googleSigninButton) {
    return false;
  }
  const clickable =
    googleSigninButton.querySelector('div[role="button"]') ||
    googleSigninButton.querySelector('iframe[title*="Google"]') ||
    googleSigninButton.querySelector("iframe");
  if (!clickable) {
    return false;
  }
  try {
    if (typeof clickable.click === "function") {
      clickable.click();
    } else {
      clickable.dispatchEvent(new MouseEvent("click", { bubbles: true, cancelable: true, view: window }));
    }
    return true;
  } catch (_error) {
    return false;
  }
}

function loginViaGoogle() {
  if (!googleAuthButton) {
    return;
  }
  if (googleAuthPending) {
    return;
  }
  const clientId = googleClientIdFromMeta();
  if (!clientId) {
    setNote("Google Client ID не задан в мета-теге kartivio-google-client-id.", true);
    return;
  }
  if (isTelegramMiniAppRuntime()) {
    const url = googleAuthLaunchUrl();
    setNote("Открываю внешний браузер для входа через Google.");
    if (tg && typeof tg.openLink === "function") {
      tg.openLink(url);
      return;
    }
    window.open(url, "_blank", "noopener,noreferrer");
    return;
  }

  googleAuthPending = true;
  const rendered = renderGoogleSigninButtonIfPossible({ redirectFlow: true, show: false });
  if (!rendered) {
    setGoogleAuthButtonIdle();
    if (!hasGoogleSdk()) {
      setNote("Google SDK не загрузился. Обнови страницу.", true);
      return;
    }
    setNote("Google login недоступен для этого окружения.", true);
    return;
  }
  const opened = triggerRenderedGoogleButtonClick();
  googleAuthPending = false;
  if (opened) {
    setNote("Открываю Google...");
    return;
  }
  if (googleSigninWrap) {
    googleSigninWrap.classList.remove("is-hidden");
    googleSigninWrap.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }
  setNote("Нажми кнопку Google ниже.");
}

function bindEvents() {
  if (apiBaseInput) {
    apiBaseInput.addEventListener("change", () => {
      state.apiBase = trimApiBase(apiBaseInput.value);
      saveState();
      refreshAuthButtons();
    });
  }

  if (authButton) {
    authButton.addEventListener("click", () => {
      loginViaTelegram({ silent: false, targetScreen: "feed" });
    });
  }
  if (googleAuthButton) {
    googleAuthButton.addEventListener("click", loginViaGoogle);
  }
  if (linkTelegramButton) {
    linkTelegramButton.addEventListener("click", () => {
      startTelegramLink().catch((error) => {
        setTelegramLinkNote(`Ошибка: ${error.message}`, true);
      });
    });
  }
  createButton.addEventListener("click", handleCreate);
  refreshHistoryButton.addEventListener("click", () => loadHistory().catch((error) => {
    setCreateNote(`История не загрузилась: ${error.message}`, true);
  }));
  clearTemplateButton.addEventListener("click", () => {
    clearSelectedTemplate({ clearPrompt: true });
    promptInput.focus();
  });
  promptInput.addEventListener("input", syncTemplateStateFromPrompt);
  if (templateUseButton) {
    templateUseButton.addEventListener("click", (event) => {
      event.preventDefault();
      event.stopPropagation();
      const item = currentTemplateModalItem();
      if (!item) {
        setTemplateModalNote("Шаблон не найден.", true);
        return;
      }
      selectTemplate(item);
      setCreateNote("Шаблон выбран и промпт вставлен.");
    });
  }
  if (templateCopyPromptButton) {
    templateCopyPromptButton.addEventListener("click", async (event) => {
      event.preventDefault();
      event.stopPropagation();
      const item = currentTemplateModalItem();
      if (!item) {
        setTemplateModalNote("Шаблон не найден.", true);
        return;
      }
      try {
        await copyPromptToClipboard(item.prompt);
        setTemplateModalNote("Промпт скопирован.");
      } catch (error) {
        setTemplateModalNote(`Не удалось скопировать: ${error.message}`, true);
      }
    });
  }
  if (templateModalClose) {
    templateModalClose.addEventListener("click", closeTemplateModal);
  }
  if (templateModal) {
    templateModal.addEventListener("click", (event) => {
      if (event.target === templateModal) {
        closeTemplateModal();
      }
    });
  }

  uploadPhotoButton.addEventListener("click", () => openSourceImagePicker());
  uploadDropzone.addEventListener("click", (event) => {
    if (
      event.target instanceof Element &&
      (event.target.closest("#clearSourceImageButton") || event.target.closest(".dropzone-thumb-remove"))
    ) {
      return;
    }
    openSourceImagePicker();
  });
  uploadDropzone.addEventListener("keydown", (event) => {
    const key = event.key;
    if (key === "Enter" || key === " ") {
      event.preventDefault();
      openSourceImagePicker();
    }
  });
  sourceImageInput.addEventListener("change", handleSourceImageChange);
  if (clearSourceImageButton) {
    clearSourceImageButton.addEventListener("click", (event) => {
      event.preventDefault();
      event.stopPropagation();
      clearSelectedSourceImage();
      renderSelectedTemplateCard();
      setCreateNote("Фото для редактирования убрано.");
    });
  }
  if (sourceTipsButton) {
    sourceTipsButton.addEventListener("click", (event) => {
      event.preventDefault();
      event.stopPropagation();
      toggleSourceTips(null);
    });
  }

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

  window.addEventListener("beforeunload", () => {
    revokeSourceImagePreview();
  });
  document.addEventListener("click", (event) => {
    if (!sourceTipsPanel || !sourceTipsButton) {
      return;
    }
    if (
      event.target instanceof Element &&
      (sourceTipsPanel.contains(event.target) || sourceTipsButton.contains(event.target))
    ) {
      return;
    }
    toggleSourceTips(false);
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && templateModal && !templateModal.classList.contains("is-hidden")) {
      closeTemplateModal();
    }
  });
}

async function bootstrap() {
  loadState();
  setDevPanelVisibility();
  setEnvHint();
  refreshAuthButtons();
  if (apiBaseInput) {
    apiBaseInput.value = state.apiBase;
  }
  renderGenerationChips();
  bindEvents();
  renderSelectedTemplateCard();
  renderSelectedSourceImage();
  refreshGenerationCostNote();
  refreshIcons();
  renderIdentityActions();
  setAuthGateVisible(!state.accessToken);

  try {
    await resolveApiBase();
    refreshAuthButtons();
    await loadPublicData();
  } catch (error) {
    setNote(`Не удалось загрузить публичные данные: ${error.message}`, true);
  }

  let authorized = false;
  if (state.accessToken) {
    authorized = await hydrateAuthorizedSession();
  }

  if (!authorized && isTelegramMiniAppRuntime()) {
    setNote("Выполняю вход через Telegram...");
    authorized = await loginViaTelegram({ silent: true, targetScreen: "feed" });
    if (!authorized) {
      setNote("Не удалось автоматически войти через Telegram.", true);
    }
  }

  if (authorized) {
    setAuthGateVisible(false);
  } else {
    state.accessToken = "";
    state.refreshToken = "";
    saveState();
    await loadPrivateData();
    await loadHistory();
    setAuthGateVisible(true);
  }

  const autoGoogle = new URLSearchParams(window.location.search).get("google_auto");
  if (autoGoogle === "1" && !isTelegramMiniAppRuntime() && !state.accessToken) {
    window.setTimeout(() => {
      loginViaGoogle();
    }, 150);
  }

  if (authorized) {
    switchScreen("feed");
  } else {
    setNote("Войди через Google или Telegram, чтобы начать.");
    switchScreen("feed");
  }
}

bootstrap();
