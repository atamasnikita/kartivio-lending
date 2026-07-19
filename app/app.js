const STORAGE_KEYS = {
  apiBase: "kartivio.api_base",
  accessToken: "kartivio.access_token",
  refreshToken: "kartivio.refresh_token",
  lastAuthProvider: "kartivio.last_auth_provider",
  telegramWebLoginToken: "kartivio.telegram_web_login_token",
  acquisitionAnonymousId: "kartivio.acquisition_anonymous_id",
  acquisitionFirstTouch: "kartivio.acquisition_first_touch",
  productSessionId: "kartivio.product_session_id",
  productAnalyticsDisabled: "kartivio.product_analytics_disabled",
};

const DEFAULT_PROD_API_BASE = "https://api.kartivio-ai.ru";
const DEFAULT_LOCAL_API_BASE = "http://127.0.0.1:8093";
const YANDEX_CLIENT_ID_META_NAME = "kartivio-yandex-client-id";
const YANDEX_METRIKA_ID_META_NAME = "kartivio-yandex-metrika-id";
const YANDEX_OAUTH_AUTHORIZE_URL = "https://oauth.yandex.com/authorize";
const TELEGRAM_WEB_APP_SDK_SRC = "./vendor/telegram-web-app.js?v=62";
const AUTH_BRIDGE_HASH_KEY = "auth_bridge";
const API_HEALTHCHECK_TIMEOUT_MS = 2500;
const API_FETCH_TIMEOUT_MS = 12000;
const API_MULTIPART_BASE_TIMEOUT_MS = 90000;
const API_MULTIPART_TIMEOUT_PER_MB_MS = 12000;
const API_MULTIPART_MAX_TIMEOUT_MS = 300000;
const REFERENCE_PROMPT_TIMEOUT_MS = 50000;
const YANDEX_OAUTH_STORAGE_KEYS = {
  state: "kartivio.yandex_oauth_state",
  verifier: "kartivio.yandex_oauth_verifier",
  returnTo: "kartivio.yandex_oauth_return_to",
};
const MAX_SOURCE_IMAGES = 3;
const MAX_SOURCE_IMAGE_BYTES = 10_000_000;
const PROMPT_MAX_LENGTH = 3000;
const PROMPT_COUNTER_VISIBLE_AT = Math.floor(PROMPT_MAX_LENGTH * 0.72);
const PROMPT_COUNTER_WARNING_AT = Math.floor(PROMPT_MAX_LENGTH * 0.9);
const REFERENCE_PROMPT_NOTE_DEFAULT = "Потом его можно отредактировать перед генерацией.";
const TEMPLATE_SKELETON_RATIOS = ["1 / 1", "4 / 5", "3 / 4", "5 / 4", "2 / 3", "3 / 2"];
const TEMPLATE_MODAL_ANIMATION_MS = 260;

const MODEL_COSTS = {
  "gemini-3.1-flash-image-preview": 10,
  "gemini-3.1-flash-lite-image": 5,
  "gemini-3-pro-image-preview": 20,
  "gpt-image-2": 30,
};

const TOPUP_DISPLAY_TITLES = Object.freeze({
  mini: "Старт",
  small: "Базовый",
  first_small_bonus: "Первый фотосет",
  medium: "Продвинутый",
  large: "Максимум",
});
const FIRST_PHOTOSET_TOPUP_CODE = "first_small_bonus";

const IMAGE_MODEL_LABELS = {
  "gemini-3.1-flash-image-preview": "Nano Banana 2",
  "gemini-3.1-flash-lite-image": "Nano Banana 2 Lite",
  "gemini-3-pro-image-preview": "Nano Banana Pro",
  "gpt-image-2": "Архив",
};

const RESOLUTION_ORDER = ["1K", "2K", "4K"];
const RATIO_ORDER = ["1:1", "2:3", "3:2", "3:4", "4:3", "4:5", "9:16"];

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

const GEMINI_LITE_OUTPUT_MATRIX = Object.freeze({
  "1K": GEMINI_OUTPUT_MATRIX["1K"],
});

const MODEL_OUTPUT_MATRIX = {
  "gemini-3.1-flash-image-preview": GEMINI_OUTPUT_MATRIX,
  "gemini-3.1-flash-lite-image": GEMINI_LITE_OUTPUT_MATRIX,
  "gemini-3-pro-image-preview": GEMINI_OUTPUT_MATRIX,
  "gpt-image-2": GPT_OUTPUT_MATRIX,
};

const MODEL_ORDER = ["gemini-3.1-flash-image-preview", "gemini-3-pro-image-preview"];
const ADMIN_MODEL_ORDER = [
  "gemini-3.1-flash-image-preview",
  "gemini-3.1-flash-lite-image",
  "gemini-3-pro-image-preview",
];
const DEFAULT_IMAGE_MODEL = "gemini-3.1-flash-image-preview";
const DEFAULT_RESOLUTION = "2K";
const DEFAULT_RATIO = "1:1";

const STATUS_LABELS = {
  queued: "В очереди",
  processing: "В работе",
  done: "Готово",
  failed: "Ошибка",
  cancelled: "Отменено",
};

const API_ERROR_MESSAGES = Object.freeze({
  unauthorized: "Нужно войти в аккаунт.",
  forbidden: "Недостаточно прав для этого действия.",
  invalid_token: "Сессия устарела. Войди снова.",
  token_expired: "Сессия устарела. Войди снова.",
  token_revoked: "Сессия завершена. Войди снова.",
  refresh_token_reused: "Сессия завершена. Войди снова.",
  refresh_rotation_required: "Сессия завершена. Войди снова.",
  missing_refresh_token: "Сессия завершена. Войди снова.",
  invalid_token_payload: "Ошибка сессии. Войди снова.",
  auth_rate_limit_exceeded: "Слишком много попыток входа. Подожди немного и попробуй снова.",
  rate_limit_unavailable: "Сервис временно недоступен. Попробуй еще раз.",
  request_timeout: "Сервис не ответил вовремя. Попробуй еще раз.",
  hour_limit_exceeded: "Лимит генераций на этот час исчерпан.",
  queue_unavailable: "Не удалось запустить генерацию из-за перегрузки очереди. Попробуй еще раз.",
  insufficient_credits: "Недостаточно кредитов для генерации.",
  concurrent_jobs_limit_exceeded: "Слишком много задач в работе. Дождись завершения текущих.",
  prompt_too_long: "Промпт слишком длинный.",
  unsupported_image_model: "Выбрана неподдерживаемая модель.",
  unsupported_output_size: "Это сочетание размера и соотношения пока недоступно.",
  source_image_required: "Добавь хотя бы одно фото для редактирования.",
  too_many_source_images: "Можно загрузить не более 3 фото.",
  unsupported_source_image_type: "Поддерживаются только PNG, JPG и WEBP.",
  source_image_too_large: "Одно из фото слишком большое. Используй файл до 10 MB.",
  source_image_not_found: "Не удалось найти загруженное фото. Попробуй загрузить заново.",
  reference_prompt_paid_feature_required: "Эта функция откроется после первой оплаты.",
  reference_prompt_rate_limit_exceeded: "Слишком много запросов на сборку промпта. Попробуй чуть позже.",
  reference_prompt_daily_limit_exceeded: "Лимит сборки промптов на сегодня исчерпан.",
  reference_prompt_image_required: "Сначала добавь фото-референс.",
  reference_prompt_unsupported_image_type: "Для фото-референса подходят только PNG, JPG и WEBP.",
  reference_prompt_image_too_large: "Фото-референс слишком большое. Используй файл до 10 MB.",
  reference_prompt_invalid_image: "Не удалось прочитать фото-референс. Выбери другой файл.",
  reference_prompt_timeout: "Сборка промпта заняла слишком много времени. Попробуй еще раз.",
  reference_prompt_unavailable: "Сборка промпта временно недоступна.",
  reference_prompt_provider_rate_limited: "Сервис сборки промпта перегружен. Попробуй чуть позже.",
  reference_prompt_invalid_request: "Не удалось собрать промпт по этому файлу.",
  reference_prompt_invalid_response: "Сервис вернул пустой результат. Попробуй другой референс.",
  reference_prompt_failed: "Не удалось собрать промпт по фото-референсу.",
  unsupported_campaign_media_type: "Для рассылки подходят PNG, JPG, WEBP или MP4.",
  campaign_media_too_large: "Файл для рассылки слишком большой. Используй изображение до 10 MB или MP4 до 20 MB.",
  invalid_campaign_video: "Не удалось прочитать MP4. Выбери другой файл.",
  unsupported_feed_template_media_type: "Для шаблона подходят PNG, JPG, WEBP или MP4.",
  unsupported_feed_template_image_type: "Для шаблона подходят PNG, JPG, WEBP или MP4.",
  feed_template_media_too_large: "Файл шаблона слишком большой. Используй файл до 20 MB.",
  feed_template_image_too_large: "Файл шаблона слишком большой. Используй файл до 20 MB.",
  invalid_feed_template_video: "Не удалось прочитать MP4. Выбери другой файл.",
  unsupported_campaign_kind: "Выбран неподдерживаемый тип кампании.",
  unsupported_audience_segment: "Выбран неподдерживаемый сегмент аудитории.",
  explicit_user_ids_required: "Для точечной рассылки нужен хотя бы один user_id.",
  explicit_user_ids_invalid: "В списке есть некорректный user_id.",
  explicit_user_ids_too_many: "Слишком большой список user_id. Уменьши выборку.",
  promo_discount_offer_required: "Для кампании со скидкой нужно выбрать оффер.",
  promo_offer_not_found: "Оффер не найден.",
  test_chat_id_required: "Нужен Telegram chat id для тестовой отправки.",
  promo_offer_code_taken: "Такой код оффера уже существует.",
  promo_offer_redemptions_unsupported: "Сейчас поддерживается только 1 использование на пользователя.",
  payment_not_found: "Платеж не найден.",
  unknown_package: "Пакет не найден. Выбери один из доступных.",
  first_offer_not_eligible: "Это предложение сейчас недоступно.",
  unsupported_payment_kind: "Этот тип оплаты сейчас недоступен.",
  yookassa_not_configured: "Оплата временно недоступна.",
  yookassa_create_failed: "Не удалось создать платеж. Попробуй еще раз.",
  yookassa_get_failed: "Не удалось проверить статус платежа. Попробуй еще раз.",
  webhook_rate_limit_exceeded: "Слишком много запросов. Попробуй позже.",
  invalid_webhook: "Некорректные данные запроса.",
  google_auth_not_configured: "Вход через Google временно недоступен.",
  google_verify_unavailable: "Сервис входа через Google временно недоступен.",
  google_verify_bad_response: "Сервис входа через Google временно недоступен.",
  google_invalid_token: "Не удалось подтвердить вход через Google.",
  google_invalid_issuer: "Не удалось подтвердить вход через Google.",
  google_invalid_audience: "Не удалось подтвердить вход через Google.",
  google_invalid_token_payload: "Не удалось подтвердить вход через Google.",
  google_token_expired: "Срок действия входа через Google истек. Повтори попытку.",
  google_id_token_required: "Не получен токен Google. Повтори вход.",
  google_email_not_verified: "Подтверди email в Google-аккаунте и попробуй снова.",
  google_csrf_invalid: "Сессия входа устарела. Запусти вход через Google заново.",
  yandex_auth_not_configured: "Вход через Яндекс временно недоступен.",
  yandex_verify_unavailable: "Сервис входа через Яндекс временно недоступен.",
  yandex_verify_bad_response: "Сервис входа через Яндекс временно недоступен.",
  yandex_invalid_code: "Не удалось подтвердить вход через Яндекс.",
  yandex_invalid_token_response: "Не удалось подтвердить вход через Яндекс.",
  yandex_invalid_userinfo: "Не удалось получить профиль Яндекса.",
  yandex_invalid_subject: "Не удалось определить пользователя Яндекса.",
  yandex_oauth_failed: "Не удалось завершить вход через Яндекс.",
  yandex_code_required: "Не получен код входа Яндекса. Повтори попытку.",
  yandex_code_verifier_required: "Сессия входа через Яндекс устарела. Запусти вход заново.",
  telegram_auth_not_configured: "Вход через Telegram временно недоступен.",
  telegram_init_data_missing: "Открой приложение через кнопку Web App в боте.",
  telegram_init_data_invalid: "Сессия Telegram недействительна. Открой приложение заново из бота.",
  telegram_init_data_missing_hash: "Сессия Telegram недействительна. Открой приложение заново из бота.",
  telegram_init_data_bad_hash: "Сессия Telegram недействительна. Открой приложение заново из бота.",
  telegram_init_data_missing_auth_date: "Сессия Telegram недействительна. Открой приложение заново из бота.",
  telegram_init_data_invalid_auth_date: "Сессия Telegram недействительна. Открой приложение заново из бота.",
  telegram_init_data_expired: "Сессия Telegram истекла. Открой приложение заново из бота.",
  telegram_init_data_missing_user: "Не удалось определить пользователя Telegram.",
  telegram_init_data_missing_user_id: "Не удалось определить пользователя Telegram.",
  telegram_init_data_invalid_user: "Не удалось определить пользователя Telegram.",
  telegram_init_data_invalid_user_id: "Не удалось определить пользователя Telegram.",
  telegram_link_unavailable: "Привязка Telegram временно недоступна.",
  telegram_link_token_create_failed: "Не удалось создать ссылку привязки. Попробуй еще раз.",
  telegram_link_token_invalid: "Ссылка привязки недействительна. Создай новую.",
  telegram_link_not_found: "Ссылка привязки не найдена или истекла.",
  telegram_web_login_unavailable: "Вход через Telegram временно недоступен.",
  telegram_web_login_token_create_failed: "Не удалось создать ссылку входа. Попробуй еще раз.",
  telegram_web_login_token_invalid: "Ссылка входа недействительна. Запусти вход заново.",
  telegram_web_login_failed: "Не удалось завершить вход через Telegram. Попробуй еще раз.",
  openai_org_verification_required: "Модель временно недоступна.",
  openai_not_configured: "Модель временно недоступна.",
  openai_timeout: "Генерация заняла слишком много времени. Попробуй еще раз.",
  openai_invalid_size: "Этот размер пока недоступен для выбранной модели.",
  openai_generation_failed: "Ошибка генерации в модели. Попробуй снова.",
  openai_edit_failed: "Ошибка редактирования в модели. Попробуй снова.",
  openai_empty_result: "Не удалось получить результат от модели. Попробуй снова.",
  openai_missing_b64: "Не удалось получить изображение от модели. Попробуй снова.",
  admin_model_required: "Эта модель доступна только администратору.",
  gemini_not_configured: "Модель Nano Banana временно недоступна.",
  gemini_invalid_api_key: "Модель Nano Banana временно недоступна.",
  gemini_rate_limited: "Сервис генерации перегружен. Попробуй чуть позже.",
  gemini_overloaded: "Сервис генерации перегружен. Попробуй чуть позже.",
  gemini_model_not_found: "Выбранная модель временно недоступна.",
  gemini_permission_denied: "Нет доступа к выбранной модели.",
  gemini_invalid_request: "Некорректный запрос генерации. Проверь настройки.",
  gemini_generation_failed: "Ошибка генерации в Nano Banana. Попробуй снова.",
  gemini_empty_result: "Не удалось получить изображение от Nano Banana. Попробуй снова.",
  gemini_invalid_image_data: "Не удалось обработать результат генерации. Попробуй снова.",
  provider_unexpected_error: "Сервис генерации временно недоступен. Попробуй снова.",
});

const JOB_ERROR_MESSAGES = Object.freeze({
  queue_unavailable: "Не удалось запустить генерацию из-за перегрузки очереди. Кредиты возвращены.",
  queue_orphaned: "Задача зависла в очереди. Мы остановили её автоматически и вернули кредиты.",
  provider_unexpected_error: "Ошибка генерации на стороне провайдера. Кредиты возвращены.",
  insufficient_credits: "Недостаточно кредитов.",
  concurrent_jobs_limit_exceeded: "Слишком много задач в работе.",
  openai_org_verification_required: "Модель временно недоступна.",
  openai_timeout: "Генерация заняла слишком много времени. Кредиты возвращены.",
  openai_invalid_size: "Выбранный размер не поддерживается для этой модели.",
  openai_generation_failed: "Ошибка генерации в модели. Кредиты возвращены.",
  openai_edit_failed: "Ошибка редактирования в модели. Кредиты возвращены.",
  gemini_rate_limited: "Сервис Nano Banana перегружен. Кредиты возвращены.",
  gemini_overloaded: "Сервис Nano Banana перегружен. Кредиты возвращены.",
  gemini_generation_failed: "Ошибка генерации в Nano Banana. Кредиты возвращены.",
  gemini_invalid_request: "Некорректные параметры генерации.",
  gemini_empty_result: "Провайдер не вернул изображение. Кредиты возвращены.",
  gemini_invalid_image_data: "Провайдер вернул поврежденный результат. Кредиты возвращены.",
  source_image_not_found: "Референс-фото недоступно. Загрузите его снова.",
  template_not_found: "Шаблон не найден.",
});

const ADMIN_CAMPAIGN_DEFAULTS = Object.freeze({
  new_templates: {
    title: "Новые шаблоны в ленте",
    message_text: "В ленте появились новые семейные, мужские и полезные шаблоны. Открыть Kartivio?",
    cta_text: "Посмотреть шаблоны",
  },
  promo_discount: {
    title: "Персональный оффер",
    message_text: "Для вас открыт персональный пакет. Забрать предложение можно по кнопке ниже.",
    cta_text: "Забрать пакет",
  },
});

const state = {
  apiBase: "",
  accessToken: "",
  refreshToken: "",
  isCookieSession: false,
  lastAuthProvider: "",
  me: null,
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
  publicDataLoadPromise: null,
  publicDataLoadContext: "",
  publicDataLoadedContext: "",
  publicDataRequestToken: 0,
  selectedTemplateFilter: "showcase",
  templateSearchQuery: "",
  templateVisibleCount: 0,
  templateRenderKey: "",
  activeTemplateModalId: "",
  activeTemplateModalItem: null,
  topups: [],
  allTopups: [],
  selectedTopupCode: "",
  walletBalanceCredits: 0,
  linkedProviders: new Set(),
  acquisitionTouch: null,
  telegramLinkToken: "",
  telegramLinkPollTimer: null,
  telegramWebLoginToken: "",
  telegramWebLoginPollTimer: null,
  referenceImageFile: null,
  referenceImagePreviewUrl: "",
  referencePromptBusy: false,
  referencePromptPreviousValue: "",
  referencePromptBuilt: false,
  referencePromptExpanded: false,
  promptSource: "manual",
  promptSourceValue: "",
  sourceImageFiles: [],
  sourceImagePreviewUrls: [],
  historyItems: null,
  historyLoadedAt: 0,
  historyLoadPromise: null,
  historyRequestToken: 0,
  historyNextOffset: 0,
  historyHasMore: false,
  adminTab: "analytics",
  adminAnalytics: null,
  adminAnalyticsPeriod: "30d",
  adminTemplates: [],
  adminCampaigns: [],
  adminOffers: [],
  selectedAdminTemplateId: "",
  selectedAdminCampaignId: "",
  adminCampaignPreview: null,
  adminCampaignDraftKind: "new_templates",
  adminCampaignAudienceMode: "auto",
  adminTemplateLocalPreviewUrl: "",
  adminTemplateLocalPreviewMediaType: "",
  trackedResultJobIds: new Set(),
  trackedSuccessfulGenerationJobIds: new Set(),
  trackedFirstPhotosetOfferViews: new Set(),
};

let tg = window.Telegram && window.Telegram.WebApp ? window.Telegram.WebApp : null;
const TELEGRAM_BOT_URL = "https://t.me/kartivio_ai_bot";
const HISTORY_CACHE_TTL_MS = 15_000;
const HISTORY_PAGE_SIZE = 12;
const TEMPLATE_FEED_INCREMENTAL_THRESHOLD = 24;
const TEMPLATE_FEED_INITIAL_BATCH_SIZE = 18;
const TEMPLATE_FEED_BATCH_SIZE = 18;
const TEMPLATE_FEED_PRELOAD_DISTANCE_PX = 2200;
const TEMPLATE_FEED_PRELOAD_IMAGE_COUNT = 6;
const TEMPLATE_FEED_PRELOAD_PROMPT_COUNT = 12;
const TEMPLATE_VIDEO_URL_RE = /\.mp4(?:[?#].*)?$/i;
const ADMIN_TEMPLATE_MAX_MEDIA_BYTES = 20 * 1024 * 1024;
const ADMIN_CAMPAIGN_MAX_MEDIA_BYTES = 20 * 1024 * 1024;
const ADMIN_TEMPLATE_FILE_NOTE_DEFAULT =
  "PNG/JPG/WEBP до 10 MB или MP4 до 20 MB. Файл нужен только для нового шаблона.";
const PRODUCT_EVENT_FLUSH_DELAY_MS = 350;
const PRODUCT_EVENT_BATCH_SIZE = 10;
let productEventQueue = [];
let productEventFlushTimer = null;

function isProductAnalyticsDisabled() {
  if (state.me?.is_admin) {
    return true;
  }
  try {
    return window.localStorage.getItem(STORAGE_KEYS.productAnalyticsDisabled) === "1";
  } catch (_error) {
    return false;
  }
}

function disableProductAnalyticsForAdmin() {
  try {
    window.localStorage.setItem(STORAGE_KEYS.productAnalyticsDisabled, "1");
  } catch (_error) {
    // Server-side admin filtering remains the source of truth.
  }
  productEventQueue = [];
  if (productEventFlushTimer) {
    window.clearTimeout(productEventFlushTimer);
    productEventFlushTimer = null;
  }
}

function productEventUuid() {
  if (window.crypto && typeof window.crypto.randomUUID === "function") {
    return window.crypto.randomUUID();
  }
  const bytes = new Uint8Array(16);
  window.crypto.getRandomValues(bytes);
  bytes[6] = (bytes[6] & 0x0f) | 0x40;
  bytes[8] = (bytes[8] & 0x3f) | 0x80;
  const hex = Array.from(bytes, (value) => value.toString(16).padStart(2, "0")).join("");
  return `${hex.slice(0, 8)}-${hex.slice(8, 12)}-${hex.slice(12, 16)}-${hex.slice(16, 20)}-${hex.slice(20)}`;
}

function ensureProductSessionId() {
  try {
    const existing = String(window.sessionStorage.getItem(STORAGE_KEYS.productSessionId) || "").trim();
    if (existing) {
      return existing;
    }
    const nextValue = productEventUuid();
    window.sessionStorage.setItem(STORAGE_KEYS.productSessionId, nextValue);
    return nextValue;
  } catch (_error) {
    return productEventUuid();
  }
}

function productEventPlatform() {
  if (isTelegramMiniAppRuntime()) {
    return "telegram-miniapp";
  }
  return window.matchMedia("(max-width: 760px)").matches ? "web-mobile" : "web-desktop";
}

function productEventErrorCode(error) {
  return String(error?.code || error?.name || error?.status || "request_failed").slice(0, 160);
}

function productFileSizeBucket(files) {
  const totalBytes = (Array.isArray(files) ? files : []).reduce(
    (sum, file) => sum + Number(file?.size || 0),
    0,
  );
  if (totalBytes < 1_000_000) return "under_1mb";
  if (totalBytes < 5_000_000) return "1_5mb";
  if (totalBytes < 10_000_000) return "5_10mb";
  return "over_10mb";
}

function trackProductEvent(eventName, properties = {}) {
  if (isProductAnalyticsDisabled()) {
    return;
  }
  const normalizedName = String(eventName || "").trim();
  if (!normalizedName) {
    return;
  }
  productEventQueue.push({
    client_event_id: productEventUuid(),
    event_name: normalizedName,
    anonymous_id: ensureAcquisitionAnonymousId(),
    session_id: ensureProductSessionId(),
    platform: productEventPlatform(),
    path: window.location.pathname,
    occurred_at: new Date().toISOString(),
    properties,
  });
  if (productEventQueue.length >= PRODUCT_EVENT_BATCH_SIZE) {
    flushProductEvents();
    return;
  }
  if (productEventFlushTimer) {
    return;
  }
  productEventFlushTimer = window.setTimeout(() => {
    productEventFlushTimer = null;
    flushProductEvents();
  }, PRODUCT_EVENT_FLUSH_DELAY_MS);
}

function flushProductEvents({ keepalive = false } = {}) {
  if (isProductAnalyticsDisabled()) {
    productEventQueue = [];
    return;
  }
  if (!state.apiBase || !productEventQueue.length) {
    return;
  }
  const events = productEventQueue.splice(0, 20);
  const headers = { "Content-Type": "application/json" };
  if (state.accessToken) {
    headers.Authorization = `Bearer ${state.accessToken}`;
  }
  fetch(`${state.apiBase}/v1/events/batch`, {
    method: "POST",
    credentials: "include",
    headers,
    body: JSON.stringify({ events }),
    keepalive,
  }).catch(() => {});
  if (productEventQueue.length && !keepalive) {
    productEventFlushTimer = window.setTimeout(() => {
      productEventFlushTimer = null;
      flushProductEvents();
    }, PRODUCT_EVENT_FLUSH_DELAY_MS);
  }
}

const bootSplash = document.getElementById("bootSplash");
const appShell = document.getElementById("appShell");
const appMain = document.querySelector(".app-main");
const bottomNav = document.querySelector(".bottom-nav");
const authGate = document.getElementById("authGate");
const devPanel = document.getElementById("devPanel");
const apiBaseInput = document.getElementById("apiBaseInput");
const authButton = document.getElementById("authButton");
const authCheckButton = document.getElementById("authCheckButton");
const yandexAuthButton = document.getElementById("yandexAuthButton");
const envHint = document.getElementById("envHint");
const authNote = document.getElementById("authNote");
const userName = document.getElementById("userName");
const userTgId = document.getElementById("userTgId");
const creditsValue = document.getElementById("creditsValue");
const creditsBadge = document.getElementById("creditsBadge");
const profileAvatar = document.getElementById("profileAvatar");
const identityYandex = document.getElementById("identityYandex");
const identityTelegram = document.getElementById("identityTelegram");
const linkTelegramButton = document.getElementById("linkTelegramButton");
const telegramLinkNote = document.getElementById("telegramLinkNote");
const adminAccessCard = document.getElementById("adminAccessCard");
const openMarketingAdminButton = document.getElementById("openMarketingAdminButton");
const logoutButton = document.getElementById("logoutButton");
const plansGrid = document.getElementById("plansGrid");
const plansActionButton = document.getElementById("plansActionButton");
const plansNote = document.getElementById("plansNote");
const paywallGalleryImages = document.querySelectorAll(".paywall-gallery-image[data-src]");
const marketingBackButton = document.getElementById("marketingBackButton");
const marketingAdminTabs = document.getElementById("marketingAdminTabs");
const marketingAnalyticsPanel = document.getElementById("marketingAnalyticsPanel");
const marketingTemplatesPanel = document.getElementById("marketingTemplatesPanel");
const marketingCampaignsPanel = document.getElementById("marketingCampaignsPanel");
const marketingOffersPanel = document.getElementById("marketingOffersPanel");
const adminAnalyticsPeriod = document.getElementById("adminAnalyticsPeriod");
const refreshAdminAnalyticsButton = document.getElementById("refreshAdminAnalyticsButton");
const adminAnalyticsKpis = document.getElementById("adminAnalyticsKpis");
const adminAnalyticsCohort = document.getElementById("adminAnalyticsCohort");
const adminAnalyticsEventFunnel = document.getElementById("adminAnalyticsEventFunnel");
const adminAnalyticsWelcome = document.getElementById("adminAnalyticsWelcome");
const adminAnalyticsReliability = document.getElementById("adminAnalyticsReliability");
const adminAnalyticsTemplates = document.getElementById("adminAnalyticsTemplates");
const adminAnalyticsAttribution = document.getElementById("adminAnalyticsAttribution");
const adminAnalyticsUpdated = document.getElementById("adminAnalyticsUpdated");
const adminAnalyticsNote = document.getElementById("adminAnalyticsNote");
const adminTemplateStateBadge = document.getElementById("adminTemplateStateBadge");
const adminTemplateTitleInput = document.getElementById("adminTemplateTitleInput");
const adminTemplateCategoryInput = document.getElementById("adminTemplateCategoryInput");
const adminTemplatePromptInput = document.getElementById("adminTemplatePromptInput");
const adminTemplateFileInput = document.getElementById("adminTemplateFileInput");
const adminTemplatePickFileButton = document.getElementById("adminTemplatePickFileButton");
const adminTemplateFileNote = document.getElementById("adminTemplateFileNote");
const adminTemplatePreview = document.getElementById("adminTemplatePreview");
const adminTemplateMeta = document.getElementById("adminTemplateMeta");
const adminTemplateCreateButton = document.getElementById("adminTemplateCreateButton");
const adminTemplateSaveButton = document.getElementById("adminTemplateSaveButton");
const adminTemplateToggleButton = document.getElementById("adminTemplateToggleButton");
const adminTemplateResetButton = document.getElementById("adminTemplateResetButton");
const adminTemplateFormNote = document.getElementById("adminTemplateFormNote");
const refreshAdminTemplatesButton = document.getElementById("refreshAdminTemplatesButton");
const adminTemplatesList = document.getElementById("adminTemplatesList");
const campaignKindSelect = document.getElementById("campaignKindSelect");
const campaignTitleInput = document.getElementById("campaignTitleInput");
const campaignMessageInput = document.getElementById("campaignMessageInput");
const campaignCtaTextInput = document.getElementById("campaignCtaTextInput");
const campaignAudienceModeSelect = document.getElementById("campaignAudienceModeSelect");
const campaignAudienceUserIdsField = document.getElementById("campaignAudienceUserIdsField");
const campaignAudienceUserIdsInput = document.getElementById("campaignAudienceUserIdsInput");
const campaignMediaFields = document.getElementById("campaignMediaFields");
const campaignMediaUrlInput = document.getElementById("campaignMediaUrlInput");
const campaignMediaFileInput = document.getElementById("campaignMediaFileInput");
const campaignMediaUploadButton = document.getElementById("campaignMediaUploadButton");
const campaignMediaUploadNote = document.getElementById("campaignMediaUploadNote");
const campaignMediaPreview = document.getElementById("campaignMediaPreview");
const campaignPromoOfferField = document.getElementById("campaignPromoOfferField");
const campaignPromoOfferSelect = document.getElementById("campaignPromoOfferSelect");
const campaignTestChatIdInput = document.getElementById("campaignTestChatIdInput");
const campaignSelectedSummary = document.getElementById("campaignSelectedSummary");
const campaignCreateButton = document.getElementById("campaignCreateButton");
const campaignPreviewButton = document.getElementById("campaignPreviewButton");
const campaignTestButton = document.getElementById("campaignTestButton");
const campaignLaunchButton = document.getElementById("campaignLaunchButton");
const campaignFormNote = document.getElementById("campaignFormNote");
const campaignPreviewStats = document.getElementById("campaignPreviewStats");
const campaignsList = document.getElementById("campaignsList");
const refreshCampaignsButton = document.getElementById("refreshCampaignsButton");
const offerCodeInput = document.getElementById("offerCodeInput");
const offerTitleInput = document.getElementById("offerTitleInput");
const offerPriceInput = document.getElementById("offerPriceInput");
const offerCreditsInput = document.getElementById("offerCreditsInput");
const offerExpiresAtInput = document.getElementById("offerExpiresAtInput");
const offerMaxRedemptionsInput = document.getElementById("offerMaxRedemptionsInput");
const offerActiveInput = document.getElementById("offerActiveInput");
const offerRequireGenerationInput = document.getElementById("offerRequireGenerationInput");
const offerRequireNoPaymentsInput = document.getElementById("offerRequireNoPaymentsInput");
const offerCreateButton = document.getElementById("offerCreateButton");
const offerFormNote = document.getElementById("offerFormNote");
const offersList = document.getElementById("offersList");
const refreshOffersButton = document.getElementById("refreshOffersButton");
const templateFilterShell = document.getElementById("templateFilterShell");
const templateFilterPrev = document.getElementById("templateFilterPrev");
const templateFilterNext = document.getElementById("templateFilterNext");
const templateQuickFilters = document.getElementById("templateQuickFilters");
const templateFilterChips = document.getElementById("templateFilterChips");
const templateSearchInput = document.getElementById("templateSearchInput");
const templateSearchClear = document.getElementById("templateSearchClear");
const templatesGrid = document.getElementById("templatesGrid");
const templateFeedPagination = document.getElementById("templateFeedPagination");
const templateFeedMoreButton = document.getElementById("templateFeedMoreButton");
const templateFeedMoreNote = document.getElementById("templateFeedMoreNote");
const promptInput = document.getElementById("promptInput");
const promptCard = document.querySelector(".prompt-card");
const promptSourceStatus = document.getElementById("promptSourceStatus");
const promptCounter = document.getElementById("promptCounter");
const clearPromptButton = document.getElementById("clearPromptButton");
const modelChips = document.getElementById("modelChips");
const resolutionChips = document.getElementById("resolutionChips");
const ratioChips = document.getElementById("ratioChips");
const generationSettingsSummary = document.getElementById("generationSettingsSummary");
const studioSceneBlock = document.getElementById("studioSceneBlock");
const studioSceneTitle = document.getElementById("studioSceneTitle");
const chooseTemplateButton = document.getElementById("chooseTemplateButton");
const referencePromptToggleButton = document.getElementById("referencePromptToggleButton");
const referencePromptCollapseButton = document.getElementById("referencePromptCollapseButton");
const referenceImageInput = document.getElementById("referenceImageInput");
const referencePromptCard = document.getElementById("referencePromptCard");
const referencePromptSubtitle = document.getElementById("referencePromptSubtitle");
const referencePromptBadge = document.getElementById("referencePromptBadge");
const referenceImageDropzone = document.getElementById("referenceImageDropzone");
const referenceDropzoneEmptyState = document.getElementById("referenceDropzoneEmptyState");
const referenceDropzoneTitle = document.getElementById("referenceDropzoneTitle");
const referenceDropzoneSubtitle = document.getElementById("referenceDropzoneSubtitle");
const referenceImagePreview = document.getElementById("referenceImagePreview");
const referenceDropzoneBadge = document.getElementById("referenceDropzoneBadge");
const clearReferenceImageButton = document.getElementById("clearReferenceImageButton");
const referencePromptBuildButton = document.getElementById("referencePromptBuildButton");
const referencePromptActionIcon = document.getElementById("referencePromptActionIcon");
const referencePromptRestoreButton = document.getElementById("referencePromptRestoreButton");
const referencePromptNote = document.getElementById("referencePromptNote");
const referencePromptBusyCaption = document.getElementById("referencePromptBusyCaption");
const referencePromptBusyCaptionTitle = document.getElementById("referencePromptBusyCaptionTitle");
const referencePromptBusyCaptionBody = document.getElementById("referencePromptBusyCaptionBody");
const referencePromptBusySteps = Array.from(document.querySelectorAll("[data-reference-prompt-step]"));
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
const activeResultPanel = activeResult ? activeResult.closest(".result-panel") : null;
const historyList = document.getElementById("historyList");
const refreshHistoryButton = document.getElementById("refreshHistoryButton");
const historyPagination = document.getElementById("historyPagination");
const historyMoreButton = document.getElementById("historyMoreButton");
const historyMoreNote = document.getElementById("historyMoreNote");
const templateModal = document.getElementById("templateModal");
const templateModalClose = document.getElementById("templateModalClose");
const templateModalMediaSlot = document.getElementById("templateModalMediaSlot");
const templateModalTitle = document.getElementById("templateModalTitle");
const templateModalCategory = document.getElementById("templateModalCategory");
const templateLikeButton = document.getElementById("templateLikeButton");
const templateLikeCount = document.getElementById("templateLikeCount");
const templateUsageStat = document.getElementById("templateUsageStat");
const templateUsageCountValue = document.getElementById("templateUsageCount");
const templateModalPromptScroll = document.getElementById("templateModalPromptScroll");
const templateModalPrompt = document.getElementById("templateModalPrompt");
const templatePromptToggle = document.getElementById("templatePromptToggle");
const templateCopyPromptButton = document.getElementById("templateCopyPromptButton");
const templateUseButton = document.getElementById("templateUseButton");
const templateModalNote = document.getElementById("templateModalNote");

let templateFeedAutoLoadRaf = 0;
let lastTemplateGridColumnCount = 0;
let templateFeedPreloadRaf = 0;
const templateDetailPromises = new Map();
const templateImagePreloadPromises = new Map();
const templatePreloadedImageUrls = new Set();
const navButtons = Array.from(document.querySelectorAll("[data-nav]"));
const REFERENCE_PROMPT_BUSY_INTERVAL_MS = 1300;
const REFERENCE_PROMPT_BUSY_STEPS = Object.freeze([
  Object.freeze({
    key: "scene",
    title: "Определяем сцену.",
    body: "Понимаем, что именно должно происходить в кадре.",
  }),
  Object.freeze({
    key: "light",
    title: "Оцениваем свет.",
    body: "Снимаем характер освещения и распределение теней.",
  }),
  Object.freeze({
    key: "wardrobe",
    title: "Разбираем одежду.",
    body: "Фиксируем силуэт, фактуру тканей и главные детали образа.",
  }),
  Object.freeze({
    key: "pose",
    title: "Считываем позу.",
    body: "Смотрим на положение корпуса, головы, рук и направление взгляда.",
  }),
  Object.freeze({
    key: "details",
    title: "Собираем детали.",
    body: "Подмечаем фон, аксессуары, фактуры и мелкие акценты, чтобы промпт не терял характер кадра.",
  }),
  Object.freeze({
    key: "composition",
    title: "Собираем композицию.",
    body: "Укладываем кадр в понятный финальный промпт.",
  }),
]);
let referencePromptBusyStepIndex = 0;
let referencePromptBusyIntervalId = 0;
let referencePromptBusyCaptionTimeoutId = 0;
const jumpButtons = Array.from(document.querySelectorAll("[data-nav-target]"));
const screens = Array.from(document.querySelectorAll("[data-screen]"));
let yandexAuthPending = false;
let templateModalCloseTimer = null;
let templateModalImageLoadToken = 0;
let templateModalScrollTop = 0;
let telegramViewportListenersAttached = false;
let telegramImmersiveListenersAttached = false;
let telegramImmersiveRetryTimer = 0;
let lucideRetryTimer = 0;
let mobileWebNavListenerAttached = false;
let lastAppMainScrollTop = 0;
let templatePromptExpanded = false;
let templateFilterScrollerBound = false;
let deferredStartupScheduled = false;

const TEMPLATE_FILTER_NEW = "new";
const TEMPLATE_FILTER_SHOWCASE = "showcase";
const TEMPLATE_FILTER_PRIORITY = ["Полезности", "Мужское", "Семейные"];
const TEMPLATE_SECTION_CATEGORY_PRIORITY = [
  "Фэшн",
  "Портрет",
  "Студия",
  "Цветы",
  "Город",
  "Мужское",
  "Семейные",
  "Полезности",
];
const TEMPLATE_SHOWCASE_SECTION_LIMIT = 10;
const TEMPLATE_LIST_PATH = "/v1/templates?include_prompt=false";
const TEMPLATE_SEARCH_SYNONYMS = Object.freeze({
  др: ["день рождения", "birthday", "торт", "свечи", "шары", "шарик"],
  днюха: ["день рождения", "birthday", "торт", "свечи"],
  день: ["день рождения", "др", "birthday"],
  рождение: ["день рождения", "др", "birthday"],
  birthday: ["день рождения", "др", "торт", "свечи"],
  очки: ["glasses", "sunglasses", "солнцезащитные"],
  glasses: ["очки", "sunglasses"],
  семья: ["семейные", "мама", "папа", "дети", "ребенок"],
  семейные: ["семья", "мама", "папа", "дети", "ребенок"],
  ребенок: ["дети", "семья", "семейные"],
  ребёнок: ["дети", "семья", "семейные"],
  дети: ["ребенок", "ребёнок", "семья", "семейные"],
  мужчина: ["мужское", "мужской", "парень"],
  мужское: ["мужчина", "мужской", "парень"],
  цветы: ["букет", "сад", "поле", "сирень"],
  цветок: ["цветы", "букет"],
  город: ["улица", "street", "urban"],
  деловой: ["бизнес", "офис", "костюм"],
  бизнес: ["деловой", "офис", "костюм"],
  студия: ["studio", "портрет", "фон"],
  портрет: ["portrait", "лицо", "студия"],
});
const ADMIN_CAMPAIGN_KIND_LABELS = Object.freeze({
  new_templates: "Новые шаблоны",
  promo_discount: "Персональный оффер",
});
const ADMIN_AUDIENCE_LABELS = Object.freeze({
  telegram_reachable: "Все с Telegram",
  generated_no_payments: "Генерировали, но не платили",
  explicit_user_ids: "Точечная рассылка",
});
const ADMIN_CAMPAIGN_STATUS_LABELS = Object.freeze({
  draft: "Draft",
  sending: "Отправляется",
  completed: "Завершена",
});

function refreshIcons() {
  if (window.lucide && typeof window.lucide.createIcons === "function") {
    if (lucideRetryTimer) {
      window.clearTimeout(lucideRetryTimer);
      lucideRetryTimer = 0;
    }
    window.lucide.createIcons();
    return;
  }
  if (!lucideRetryTimer) {
    lucideRetryTimer = window.setTimeout(() => {
      lucideRetryTimer = 0;
      refreshIcons();
    }, 800);
  }
}

function yandexMetrikaIdFromMeta() {
  const tag = document.querySelector(`meta[name="${YANDEX_METRIKA_ID_META_NAME}"]`);
  if (!tag) {
    return "";
  }
  return String(tag.getAttribute("content") || "").trim();
}

function shouldLoadDeferredAnalytics() {
  return !isTelegramContextHint() && !isProductAnalyticsDisabled();
}

function loadYandexMetrika() {
  if (!shouldLoadDeferredAnalytics()) {
    return;
  }
  const metrikaId = Number.parseInt(yandexMetrikaIdFromMeta(), 10);
  if (!Number.isFinite(metrikaId) || metrikaId <= 0) {
    return;
  }
  if (window.__kartivioMetrikaLoaded) {
    return;
  }
  window.__kartivioMetrikaLoaded = true;
  window.ym =
    window.ym ||
    function () {
      (window.ym.a = window.ym.a || []).push(arguments);
    };
  window.ym.l = Number(window.ym.l || Date.now());

  const existing = document.querySelector('script[data-kartivio-metrika="true"]');
  if (!existing) {
    const script = document.createElement("script");
    script.async = true;
    script.src = `https://mc.yandex.ru/metrika/tag.js?id=${metrikaId}`;
    script.dataset.kartivioMetrika = "true";
    document.head.appendChild(script);
  }

  window.ym(metrikaId, "init", {
    ssr: true,
    webvisor: true,
    clickmap: true,
    ecommerce: "dataLayer",
    referrer: document.referrer,
    url: location.href,
    accurateTrackBounce: true,
    trackLinks: true,
  });
}

function scheduleDeferredStartup() {
  if (deferredStartupScheduled) {
    return;
  }
  deferredStartupScheduled = true;
  if (!shouldLoadDeferredAnalytics()) {
    return;
  }
  const run = () => {
    loadYandexMetrika();
  };
  if (typeof window.requestIdleCallback === "function") {
    window.requestIdleCallback(run, { timeout: 2000 });
    return;
  }
  window.setTimeout(run, 1200);
}

function refreshTelegramWebAppHandle() {
  tg = window.Telegram && window.Telegram.WebApp ? window.Telegram.WebApp : null;
  return tg;
}

function isTelegramContextHint() {
  const search = window.location.search || "";
  const hash = window.location.hash || "";
  return (
    Boolean(window.TelegramWebviewProxy) ||
    Boolean(window.TelegramGameProxy) ||
    search.includes("tgWebApp") ||
    hash.includes("tgWebApp")
  );
}

function ensureTelegramSdkLoaded(timeoutMs = 5000) {
  if (refreshTelegramWebAppHandle()) {
    return Promise.resolve(true);
  }
  if (!isTelegramContextHint()) {
    return Promise.resolve(false);
  }
  return new Promise((resolve) => {
    let settled = false;
    let timeoutId = 0;
    const finish = (loaded) => {
      if (settled) {
        return;
      }
      settled = true;
      if (timeoutId) {
        window.clearTimeout(timeoutId);
      }
      resolve(Boolean(loaded));
    };

    let script = document.querySelector('script[data-telegram-sdk="true"]');
    if (!script) {
      script = document.createElement("script");
      script.src = TELEGRAM_WEB_APP_SDK_SRC;
      script.async = true;
      script.dataset.telegramSdk = "true";
      document.head.append(script);
    }

    script.addEventListener(
      "load",
      () => finish(Boolean(refreshTelegramWebAppHandle())),
      { once: true },
    );
    script.addEventListener("error", () => finish(false), { once: true });
    timeoutId = window.setTimeout(() => finish(Boolean(refreshTelegramWebAppHandle())), timeoutMs);
  });
}

function isTelegramMiniAppRuntime() {
  return Boolean(refreshTelegramWebAppHandle() && tg && tg.initData);
}

function isTelegramShellRuntime() {
  return Boolean(isTelegramMiniAppRuntime() || isTelegramContextHint());
}

function getTelegramRuntimePlatform() {
  const tgPlatform = String(tg?.platform || "").trim().toLowerCase();
  if (tgPlatform === "ios" || tgPlatform === "android") {
    return tgPlatform;
  }
  const ua = String(navigator.userAgent || "").toLowerCase();
  if (/iphone|ipad|ipod|ios/.test(ua)) {
    return "ios";
  }
  if (/android/.test(ua)) {
    return "android";
  }
  return tgPlatform || "unknown";
}

function isMobileBrowser() {
  const ua = String(navigator.userAgent || "").toLowerCase();
  return /iphone|ipad|ipod|android|mobile/i.test(ua);
}

function syncRuntimeClasses() {
  const telegramRuntime = isTelegramMiniAppRuntime();
  const mobileBrowser = isMobileBrowser();
  document.documentElement.classList.toggle("is-telegram-runtime", telegramRuntime);
  document.body.classList.toggle("is-telegram-runtime", telegramRuntime);
  document.documentElement.classList.toggle("is-web-runtime", !telegramRuntime);
  document.body.classList.toggle("is-web-runtime", !telegramRuntime);
  document.documentElement.classList.toggle("is-mobile-browser", mobileBrowser);
  document.body.classList.toggle("is-mobile-browser", mobileBrowser);
}

function setBottomNavHidden(hidden) {
  const nextHidden = Boolean(hidden);
  document.documentElement.classList.toggle("nav-hidden", nextHidden);
  document.body.classList.toggle("nav-hidden", nextHidden);
}

function getPrimaryScrollTop() {
  if (!isTelegramMiniAppRuntime() && isMobileBrowser()) {
    return Number(window.scrollY || window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0);
  }
  return Number(appMain?.scrollTop || 0);
}

function handleBottomNavAutoHide() {
  if (isTelegramShellRuntime() || !isMobileBrowser()) {
    setBottomNavHidden(false);
    lastAppMainScrollTop = getPrimaryScrollTop();
    return;
  }

  const currentScrollTop = getPrimaryScrollTop();
  const delta = currentScrollTop - lastAppMainScrollTop;

  if (currentScrollTop <= 24 || delta <= -8) {
    setBottomNavHidden(false);
  } else if (delta >= 8) {
    setBottomNavHidden(true);
  }

  lastAppMainScrollTop = currentScrollTop;
}

function initMobileWebBottomNavBehavior() {
  if (!bottomNav || mobileWebNavListenerAttached) {
    return;
  }
  mobileWebNavListenerAttached = true;
  lastAppMainScrollTop = getPrimaryScrollTop();
  if (appMain) {
    appMain.addEventListener("scroll", handleBottomNavAutoHide, { passive: true });
  }
  window.addEventListener("scroll", handleBottomNavAutoHide, { passive: true });
  window.addEventListener(
    "resize",
    () => {
      lastAppMainScrollTop = getPrimaryScrollTop();
    },
    { passive: true },
  );
}

function prefersCookieAuth() {
  return !isTelegramMiniAppRuntime();
}

function hasActiveSession() {
  return Boolean(state.accessToken || state.isCookieSession);
}

function hasSessionBootstrapHint() {
  return Boolean(
    String(state.accessToken || "").trim() ||
      String(state.refreshToken || "").trim() ||
      String(state.lastAuthProvider || "").trim()
  );
}

function currentPublicDataContext() {
  return hasActiveSession() ? "auth" : "anon";
}

function isLocalRuntime() {
  const host = String(window.location.hostname || "").trim().toLowerCase();
  return host === "localhost" || host === "127.0.0.1";
}

function isNgrokRuntime() {
  const host = String(window.location.hostname || "").trim().toLowerCase();
  return host.endsWith(".ngrok-free.dev");
}

function canOverrideApiBase() {
  return isLocalRuntime() || isNgrokRuntime();
}

function lockTemplateModalScroll() {
  templateModalScrollTop = window.scrollY || window.pageYOffset || document.documentElement.scrollTop || 0;
  document.body.style.setProperty("--template-modal-lock-top", `-${templateModalScrollTop}px`);
  document.documentElement.classList.add("template-modal-open");
  document.body.classList.add("template-modal-open");
}

function unlockTemplateModalScroll() {
  const wasLocked =
    document.body.classList.contains("template-modal-open") ||
    document.documentElement.classList.contains("template-modal-open");
  document.documentElement.classList.remove("template-modal-open");
  document.body.classList.remove("template-modal-open");
  document.body.style.removeProperty("--template-modal-lock-top");
  if (wasLocked) {
    window.scrollTo(0, templateModalScrollTop);
  }
}

function setAuthGateVisible(visible) {
  if (authGate) {
    authGate.classList.toggle("is-hidden", !visible);
  }
  if (appShell) {
    appShell.classList.toggle("is-hidden", visible);
  }
  renderAuthGateActions();
}

function setBootPending(pending) {
  if (!bootSplash) {
    return;
  }
  bootSplash.classList.toggle("is-hidden", !pending);
  if (!pending) {
    scheduleDeferredStartup();
  }
}

function hasPendingTelegramWebLogin() {
  return Boolean(state.telegramWebLoginToken) && !hasActiveSession();
}

function renderAuthGateActions() {
  if (!authCheckButton) {
    return;
  }
  const pending = hasPendingTelegramWebLogin();
  authCheckButton.classList.toggle("is-hidden", !pending);
  authCheckButton.disabled = !pending;
}

function setDevPanelVisibility() {
  if (!devPanel) {
    return;
  }
  devPanel.classList.toggle("is-hidden", !canOverrideApiBase());
}

function pickDefaultApiBase() {
  if (isLocalRuntime()) {
    return DEFAULT_LOCAL_API_BASE;
  }
  return DEFAULT_PROD_API_BASE;
}

function yandexAuthLaunchUrl() {
  const url = new URL(window.location.href);
  url.searchParams.set("yandex_auto", "1");
  return url.toString();
}

function currentReturnToUrl() {
  const url = new URL(window.location.href);
  url.searchParams.delete("yandex_auto");
  url.hash = "";
  return url.toString();
}

function normalizeAttributionValue(raw, maxLength = 255) {
  const value = String(raw || "").trim();
  if (!value) {
    return "";
  }
  return value.slice(0, maxLength);
}

function hasAcquisitionSignal(touch) {
  if (!touch || typeof touch !== "object") {
    return false;
  }
  return Boolean(
    touch.utm_source ||
      touch.utm_medium ||
      touch.utm_campaign ||
      touch.utm_content ||
      touch.utm_term ||
      touch.utm_device ||
      touch.utm_position ||
      touch.yclid
  );
}

function buildAnonymousId() {
  if (window.crypto && typeof window.crypto.randomUUID === "function") {
    return window.crypto.randomUUID();
  }
  return `anon_${Date.now()}_${randomBase64Url(12)}`;
}

function ensureAcquisitionAnonymousId() {
  try {
    const existing = normalizeAttributionValue(window.localStorage.getItem(STORAGE_KEYS.acquisitionAnonymousId), 128);
    if (existing) {
      return existing;
    }
    const nextValue = buildAnonymousId();
    window.localStorage.setItem(STORAGE_KEYS.acquisitionAnonymousId, nextValue);
    return nextValue;
  } catch (_error) {
    return buildAnonymousId();
  }
}

function readStoredAcquisitionTouch() {
  try {
    const raw = String(window.localStorage.getItem(STORAGE_KEYS.acquisitionFirstTouch) || "").trim();
    if (!raw) {
      return null;
    }
    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== "object") {
      return null;
    }
    return parsed;
  } catch (_error) {
    return null;
  }
}

function writeStoredAcquisitionTouch(touch) {
  try {
    window.localStorage.setItem(STORAGE_KEYS.acquisitionFirstTouch, JSON.stringify(touch));
  } catch (_error) {
    // noop
  }
}

function buildAcquisitionTouchFromLocation() {
  const params = new URLSearchParams(window.location.search);
  const touch = {
    anonymous_id: ensureAcquisitionAnonymousId(),
    utm_source: normalizeAttributionValue(params.get("utm_source"), 128),
    utm_medium: normalizeAttributionValue(params.get("utm_medium"), 128),
    utm_campaign: normalizeAttributionValue(params.get("utm_campaign"), 255),
    utm_content: normalizeAttributionValue(params.get("utm_content"), 255),
    utm_term: normalizeAttributionValue(params.get("utm_term"), 255),
    utm_device: normalizeAttributionValue(params.get("utm_device"), 64),
    utm_position: normalizeAttributionValue(params.get("utm_position"), 64),
    yclid: normalizeAttributionValue(params.get("yclid"), 255),
    referrer: normalizeAttributionValue(document.referrer, 1024),
    landing_path: normalizeAttributionValue(window.location.pathname, 512),
    first_seen_at: new Date().toISOString(),
  };
  return hasAcquisitionSignal(touch) ? touch : null;
}

function captureFirstAcquisitionTouch() {
  const existing = readStoredAcquisitionTouch();
  if (existing) {
    state.acquisitionTouch = existing;
    return existing;
  }
  const nextTouch = buildAcquisitionTouchFromLocation();
  if (!nextTouch) {
    state.acquisitionTouch = null;
    return null;
  }
  writeStoredAcquisitionTouch(nextTouch);
  state.acquisitionTouch = nextTouch;
  return nextTouch;
}

async function syncAcquisitionTouch({ auth = false } = {}) {
  const touch = state.acquisitionTouch || readStoredAcquisitionTouch();
  if (!touch || !touch.anonymous_id || !hasAcquisitionSignal(touch)) {
    return null;
  }
  const payload = {
    anonymous_id: normalizeAttributionValue(touch.anonymous_id, 128),
    utm_source: normalizeAttributionValue(touch.utm_source, 128) || undefined,
    utm_medium: normalizeAttributionValue(touch.utm_medium, 128) || undefined,
    utm_campaign: normalizeAttributionValue(touch.utm_campaign, 255) || undefined,
    utm_content: normalizeAttributionValue(touch.utm_content, 255) || undefined,
    utm_term: normalizeAttributionValue(touch.utm_term, 255) || undefined,
    utm_device: normalizeAttributionValue(touch.utm_device, 64) || undefined,
    utm_position: normalizeAttributionValue(touch.utm_position, 64) || undefined,
    yclid: normalizeAttributionValue(touch.yclid, 255) || undefined,
    referrer: normalizeAttributionValue(touch.referrer, 1024) || undefined,
    landing_path: normalizeAttributionValue(touch.landing_path, 512) || undefined,
    first_seen_at: touch.first_seen_at || undefined,
  };
  const request = auth ? authorizedFetch : apiFetch;
  return request("/v1/attribution/touch", {
    method: "POST",
    body: payload,
    auth,
  });
}

function oauthRedirectUri() {
  const url = new URL(window.location.href);
  url.search = "";
  url.hash = "";
  return url.toString();
}

function googleRedirectCallbackUrl() {
  return `${state.apiBase}/v1/auth/google/redirect`;
}

function readTransientValue(key) {
  const normalizedKey = String(key || "").trim();
  if (!normalizedKey) {
    return "";
  }
  try {
    const sessionValue = String(window.sessionStorage.getItem(normalizedKey) || "").trim();
    if (sessionValue) {
      return sessionValue;
    }
  } catch (_error) {
    // noop
  }
  try {
    return String(window.localStorage.getItem(normalizedKey) || "").trim();
  } catch (_error) {
    return "";
  }
}

function writeTransientValue(key, value) {
  const normalizedKey = String(key || "").trim();
  if (!normalizedKey) {
    return;
  }
  const normalizedValue = String(value || "");
  try {
    window.sessionStorage.setItem(normalizedKey, normalizedValue);
  } catch (_error) {
    // noop
  }
  try {
    window.localStorage.setItem(normalizedKey, normalizedValue);
  } catch (_error) {
    // noop
  }
}

function clearTransientValues(keys) {
  const items = Array.isArray(keys) ? keys : [keys];
  for (const key of items) {
    const normalizedKey = String(key || "").trim();
    if (!normalizedKey) {
      continue;
    }
    try {
      window.sessionStorage.removeItem(normalizedKey);
    } catch (_error) {
      // noop
    }
    try {
      window.localStorage.removeItem(normalizedKey);
    } catch (_error) {
      // noop
    }
  }
}

function clearYandexOauthSession() {
  clearTransientValues([
    YANDEX_OAUTH_STORAGE_KEYS.state,
    YANDEX_OAUTH_STORAGE_KEYS.verifier,
    YANDEX_OAUTH_STORAGE_KEYS.returnTo,
  ]);
}

function randomBase64Url(byteLength = 24) {
  const bytes = new Uint8Array(byteLength);
  window.crypto.getRandomValues(bytes);
  let binary = "";
  for (const byte of bytes) {
    binary += String.fromCharCode(byte);
  }
  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/g, "");
}

function encodeBase64UrlJson(value) {
  try {
    const json = JSON.stringify(value);
    const bytes = new TextEncoder().encode(json);
    let binary = "";
    for (const byte of bytes) {
      binary += String.fromCharCode(byte);
    }
    return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/g, "");
  } catch (_error) {
    return "";
  }
}

function decodeBase64UrlJson(raw) {
  const value = String(raw || "").trim();
  if (!value) {
    return null;
  }
  try {
    const padded = value.replace(/-/g, "+").replace(/_/g, "/").padEnd(Math.ceil(value.length / 4) * 4, "=");
    const binary = atob(padded);
    const bytes = new Uint8Array(binary.length);
    for (let index = 0; index < binary.length; index += 1) {
      bytes[index] = binary.charCodeAt(index);
    }
    return JSON.parse(new TextDecoder().decode(bytes));
  } catch (_error) {
    return null;
  }
}

function decodeJwtPayload(token) {
  const raw = String(token || "").trim();
  const parts = raw.split(".");
  if (parts.length < 2) {
    return null;
  }
  try {
    const padded = parts[1].replace(/-/g, "+").replace(/_/g, "/").padEnd(Math.ceil(parts[1].length / 4) * 4, "=");
    const json = atob(padded);
    return JSON.parse(json);
  } catch (_error) {
    return null;
  }
}

function yandexClientIdFromMeta() {
  const queryClientId = String(new URLSearchParams(window.location.search).get("yandex_client_id") || "").trim();
  if (queryClientId && canOverrideApiBase()) {
    return queryClientId;
  }
  const tag = document.querySelector(`meta[name="${YANDEX_CLIENT_ID_META_NAME}"]`);
  if (!tag) {
    return "";
  }
  return String(tag.getAttribute("content") || "").trim();
}

async function sha256Base64Url(value) {
  const digest = await window.crypto.subtle.digest("SHA-256", new TextEncoder().encode(String(value || "")));
  const bytes = new Uint8Array(digest);
  let binary = "";
  for (const byte of bytes) {
    binary += String.fromCharCode(byte);
  }
  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/g, "");
}

async function yandexOauthAuthorizeUrl() {
  const clientId = yandexClientIdFromMeta();
  if (!clientId) {
    return "";
  }
  const stateToken = randomBase64Url(24);
  const verifier = randomBase64Url(48);
  const challenge = await sha256Base64Url(verifier);
  writeTransientValue(YANDEX_OAUTH_STORAGE_KEYS.state, stateToken);
  writeTransientValue(YANDEX_OAUTH_STORAGE_KEYS.verifier, verifier);
  writeTransientValue(YANDEX_OAUTH_STORAGE_KEYS.returnTo, currentReturnToUrl());

  const url = new URL(YANDEX_OAUTH_AUTHORIZE_URL);
  url.searchParams.set("response_type", "code");
  url.searchParams.set("client_id", clientId);
  url.searchParams.set("redirect_uri", oauthRedirectUri());
  url.searchParams.set("state", stateToken);
  url.searchParams.set("scope", "login:info login:email");
  url.searchParams.set("code_challenge", challenge);
  url.searchParams.set("code_challenge_method", "S256");
  url.searchParams.set("force_confirm", "yes");
  return url.toString();
}

function stripGoogleCallbackArtifacts() {
  const url = new URL(window.location.href);
  url.hash = "";
  window.history.replaceState({}, document.title, url.toString());
}

function stripAuthBridgeArtifact() {
  const url = new URL(window.location.href);
  const hashParams = new URLSearchParams(String(url.hash || "").replace(/^#/, ""));
  if (!hashParams.has(AUTH_BRIDGE_HASH_KEY)) {
    return;
  }
  hashParams.delete(AUTH_BRIDGE_HASH_KEY);
  const nextHash = hashParams.toString();
  url.hash = nextHash ? `#${nextHash}` : "";
  window.history.replaceState({}, document.title, url.toString());
}

function consumeAuthBridgeResult() {
  const hash = String(window.location.hash || "").replace(/^#/, "").trim();
  if (!hash) {
    return { consumed: false, success: false };
  }
  const params = new URLSearchParams(hash);
  const rawBridge = String(params.get(AUTH_BRIDGE_HASH_KEY) || "").trim();
  if (!rawBridge) {
    return { consumed: false, success: false };
  }

  stripAuthBridgeArtifact();
  const payload = decodeBase64UrlJson(rawBridge);
  if (!payload || typeof payload !== "object") {
    setNote("Не удалось завершить вход через внешний сервис. Повтори попытку.", true);
    return { consumed: true, success: false };
  }

  const provider = String(payload.provider || "").trim().toLowerCase() || "google";
  if (provider === "google") {
    state.accessToken = "";
    state.refreshToken = "";
    state.isCookieSession = false;
    state.lastAuthProvider = "";
    saveState();
    setNote("Вход через Google больше не поддерживается. Используйте Яндекс или Telegram.", true);
    return { consumed: true, success: false };
  }
  const errorCode = String(payload.error_code || "").trim();
  const errorMessage = String(payload.error_message || "").trim();
  if (errorCode) {
    state.accessToken = "";
    state.refreshToken = "";
    state.isCookieSession = false;
    state.lastAuthProvider = "";
    saveState();
    setNote(
      userFacingErrorMessage(
        { code: errorCode, rawMessage: errorMessage },
        errorMessage || "Не удалось выполнить вход через внешний сервис."
      ),
      true
    );
    return { consumed: true, success: false };
  }

  const accessToken = String(payload.access_token || "").trim();
  const refreshToken = String(payload.refresh_token || "").trim();
  if (!accessToken || !refreshToken) {
    setNote("Не удалось завершить вход через внешний сервис. Повтори попытку.", true);
    return { consumed: true, success: false };
  }

  state.telegramWebLoginToken = "";
  clearTelegramWebLoginPolling();
  state.accessToken = accessToken;
  state.refreshToken = refreshToken;
  state.isCookieSession = false;
  state.lastAuthProvider = provider;
  saveState();
  return { consumed: true, success: true };
}

function stripYandexCallbackArtifacts() {
  const url = new URL(window.location.href);
  url.searchParams.delete("code");
  url.searchParams.delete("state");
  url.searchParams.delete("error");
  url.searchParams.delete("error_description");
  url.searchParams.delete("yandex_auto");
  window.history.replaceState({}, document.title, url.toString());
}

async function consumeGoogleOidcCallback() {
  const hash = String(window.location.hash || "").replace(/^#/, "").trim();
  if (!hash) {
    return false;
  }
  const params = new URLSearchParams(hash);
  const hasLegacyGooglePayload =
    params.has("state") || params.has("id_token") || params.has("error") || params.has("error_description");
  if (!hasLegacyGooglePayload) {
    return false;
  }
  stripGoogleCallbackArtifacts();
  setNote("Вход через Google больше не поддерживается. Используйте Яндекс или Telegram.", true);
  return true;
}

async function consumeYandexOauthCallback() {
  const params = new URLSearchParams(window.location.search);
  const returnedCode = String(params.get("code") || "").trim();
  const returnedState = String(params.get("state") || "").trim();
  const oauthError = String(params.get("error") || "").trim();
  const oauthErrorDescription = String(params.get("error_description") || "").trim();
  if (!returnedCode && !returnedState && !oauthError) {
    return false;
  }

  const expectedState = readTransientValue(YANDEX_OAUTH_STORAGE_KEYS.state);
  const verifier = readTransientValue(YANDEX_OAUTH_STORAGE_KEYS.verifier);
  const returnTo = readTransientValue(YANDEX_OAUTH_STORAGE_KEYS.returnTo) || currentReturnToUrl();

  if (!returnedState || !expectedState || returnedState !== expectedState) {
    stripYandexCallbackArtifacts();
    clearYandexOauthSession();
    setNote("Сессия входа через Яндекс устарела. Запусти вход заново.", true);
    return true;
  }

  stripYandexCallbackArtifacts();
  clearYandexOauthSession();

  if (oauthError) {
    const description = oauthErrorDescription ? decodeURIComponent(oauthErrorDescription.replace(/\+/g, " ")) : "";
    setNote(description || "Не удалось завершить вход через Яндекс.", true);
    return true;
  }
  if (!returnedCode || !verifier) {
    setNote("Яндекс не вернул данные для входа. Повтори попытку.", true);
    return true;
  }

  await loginViaYandexCode(returnedCode, verifier);
  const url = new URL(returnTo);
  url.hash = "";
  url.searchParams.delete("yandex_auto");
  window.history.replaceState({}, document.title, url.toString());
  return true;
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

function availableImageModelsForCurrentUser() {
  return isAdminUser() ? ADMIN_MODEL_ORDER : MODEL_ORDER;
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
  createButton.classList.remove("is-loading");
}

function setCreateButtonBusyLabel(label = "Генерация...") {
  createButton.textContent = label;
  createButton.classList.add("is-loading");
}

function prefersReducedMotion() {
  return Boolean(
    window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );
}

function blurGenerationInputs() {
  if (document.activeElement && typeof document.activeElement.blur === "function") {
    document.activeElement.blur();
  }
  if (promptInput && typeof promptInput.blur === "function") {
    promptInput.blur();
  }
}

function scrollActiveResultIntoView() {
  if (!activeResultPanel) {
    return;
  }
  const scroll = () => {
    activeResultPanel.scrollIntoView({
      behavior: prefersReducedMotion() ? "auto" : "smooth",
      block: "start",
      inline: "nearest",
    });
  };
  window.requestAnimationFrame(scroll);
  if (isMobileBrowser()) {
    window.setTimeout(scroll, 220);
  }
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
  const availableModels = availableImageModelsForCurrentUser();
  state.selectedImageModel = availableModels.includes(selectedModel) ? selectedModel : DEFAULT_IMAGE_MODEL;

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
  const visibleAvailableRatios = RATIO_ORDER.filter((key) => availableRatios.includes(key));
  if (!visibleAvailableRatios.length) {
    state.selectedRatio = "auto";
    return;
  }
  if (!visibleAvailableRatios.includes(state.selectedRatio)) {
    if (visibleAvailableRatios.includes(DEFAULT_RATIO)) {
      state.selectedRatio = DEFAULT_RATIO;
    } else {
      state.selectedRatio = visibleAvailableRatios[0];
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

function findOutputSelectionBySize(model, outputSize) {
  const normalizedModel = String(model || "").trim().toLowerCase();
  const normalizedSize = String(outputSize || "").trim();
  if (!normalizedSize || !MODEL_OUTPUT_MATRIX[normalizedModel]) {
    return null;
  }
  const matrix = outputMatrixForModel(normalizedModel);
  for (const resolution of Object.keys(matrix)) {
    const ratios = matrix[resolution] || {};
    for (const ratio of Object.keys(ratios)) {
      if (String(ratios[ratio] || "").trim() === normalizedSize) {
        return { model: normalizedModel, resolution, ratio };
      }
    }
  }
  return null;
}

function findAnyOutputSelectionBySize(outputSize) {
  for (const model of Object.keys(MODEL_OUTPUT_MATRIX)) {
    const selection = findOutputSelectionBySize(model, outputSize);
    if (selection) {
      return selection;
    }
  }
  return null;
}

function applyGenerationSettingsFromJob(job) {
  const rawModel = String(job?.provider_model || "").trim().toLowerCase();
  const availableModels = availableImageModelsForCurrentUser();
  const model = availableModels.includes(rawModel) ? rawModel : DEFAULT_IMAGE_MODEL;
  const selection =
    findOutputSelectionBySize(model, job?.output_size) ||
    findOutputSelectionBySize(DEFAULT_IMAGE_MODEL, job?.output_size);

  state.selectedImageModel = model;
  if (selection) {
    state.selectedResolution = selection.resolution;
    state.selectedRatio = selection.ratio;
  }
  ensureGenerationSelectionState();
  renderGenerationChips();
  refreshGenerationCostNote();
}

function historyOutputLabel(job) {
  const rawModel = String(job?.provider_model || "").trim().toLowerCase();
  const selection =
    findOutputSelectionBySize(rawModel, job?.output_size) ||
    findAnyOutputSelectionBySize(job?.output_size);
  if (selection) {
    const ratio = ratioLabel(selection.ratio);
    return selection.resolution === "auto" ? ratio : `${ratio} · ${resolutionLabel(selection.resolution)}`;
  }
  return String(job?.output_size || "").trim() || "формат";
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
  if (generationSettingsSummary) {
    generationSettingsSummary.textContent = `${model} · ${resolutionLabel(resolution)} · ${ratioLabel(ratio)} · ${formatCredits(cost)}`;
  }
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
    lockNode.textContent = "Недоступно";
    button.appendChild(lockNode);
  }
  if (!disabled && typeof onClick === "function") {
    button.addEventListener("click", onClick);
  }
  return button;
}

function renderModelChips() {
  modelChips.innerHTML = "";
  for (const model of availableImageModelsForCurrentUser()) {
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
  if (canOverrideApiBase()) {
    localStorage.setItem(STORAGE_KEYS.apiBase, state.apiBase);
  } else {
    localStorage.removeItem(STORAGE_KEYS.apiBase);
  }
  if (!state.isCookieSession && state.accessToken && state.refreshToken) {
    localStorage.setItem(STORAGE_KEYS.accessToken, state.accessToken);
    localStorage.setItem(STORAGE_KEYS.refreshToken, state.refreshToken);
  } else {
    localStorage.removeItem(STORAGE_KEYS.accessToken);
    localStorage.removeItem(STORAGE_KEYS.refreshToken);
  }
  localStorage.setItem(STORAGE_KEYS.lastAuthProvider, state.lastAuthProvider);
  if (state.telegramWebLoginToken && !hasActiveSession()) {
    localStorage.setItem(STORAGE_KEYS.telegramWebLoginToken, state.telegramWebLoginToken);
  } else {
    localStorage.removeItem(STORAGE_KEYS.telegramWebLoginToken);
  }
}

function loadState() {
  const queryApiBase = canOverrideApiBase()
    ? trimApiBase(new URLSearchParams(window.location.search).get("api"))
    : "";
  const storedApiBase = canOverrideApiBase() ? trimApiBase(localStorage.getItem(STORAGE_KEYS.apiBase)) : "";
  state.apiBase = queryApiBase || storedApiBase || pickDefaultApiBase();
  if (!canOverrideApiBase()) {
    localStorage.removeItem(STORAGE_KEYS.apiBase);
  }
  state.accessToken = localStorage.getItem(STORAGE_KEYS.accessToken) || "";
  state.refreshToken = localStorage.getItem(STORAGE_KEYS.refreshToken) || "";
  state.isCookieSession = false;
  state.lastAuthProvider = String(localStorage.getItem(STORAGE_KEYS.lastAuthProvider) || "").trim().toLowerCase();
  state.telegramWebLoginToken = String(localStorage.getItem(STORAGE_KEYS.telegramWebLoginToken) || "").trim();
  if (hasActiveSession()) {
    state.telegramWebLoginToken = "";
    localStorage.removeItem(STORAGE_KEYS.telegramWebLoginToken);
  }
  state.acquisitionTouch = readStoredAcquisitionTouch();
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

function setReferencePromptNote(message, isError = false) {
  if (!referencePromptNote) {
    return;
  }
  referencePromptNote.textContent = String(message || defaultReferencePromptNote());
  referencePromptNote.style.color = isError ? "#ff8f8f" : "#8f98b0";
}

function promptTextValue() {
  return String((promptInput && promptInput.value) || "");
}

function normalizePromptForComparison(raw) {
  return String(raw || "").replace(/\r\n?/g, "\n").trim();
}

function promptSourceState() {
  const prompt = normalizePromptForComparison(promptTextValue());
  if (!prompt) {
    return { label: "Напиши описание кадра", kind: "empty" };
  }

  const selectedTemplatePrompt = state.selectedTemplate
    ? normalizePromptForComparison(state.selectedTemplate.prompt)
    : "";
  if (selectedTemplatePrompt && prompt === selectedTemplatePrompt) {
    return { label: "Промпт из шаблона", kind: "template" };
  }

  const source = String(state.promptSource || "manual");
  const sourceValue = normalizePromptForComparison(state.promptSourceValue);
  const changed = Boolean(sourceValue && prompt !== sourceValue);

  if (source === "template") {
    return {
      label: changed ? "Шаблон изменен вручную" : "Промпт из шаблона",
      kind: changed ? "edited" : "template",
    };
  }
  if (source === "reference") {
    return {
      label: changed ? "Референс изменен вручную" : "Промпт по референсу",
      kind: changed ? "edited" : "reference",
    };
  }
  if (source === "history") {
    return {
      label: changed ? "История изменена вручную" : "Промпт из истории",
      kind: changed ? "edited" : "history",
    };
  }

  return { label: "Ручной промпт", kind: "manual" };
}

function renderPromptControls() {
  const value = promptTextValue();
  const length = value.length;
  const source = promptSourceState();

  if (promptSourceStatus) {
    promptSourceStatus.textContent = source.label;
    promptSourceStatus.className = `prompt-source-status is-${source.kind}`;
  }
  if (promptCounter) {
    promptCounter.textContent = `${length} / ${PROMPT_MAX_LENGTH}`;
    promptCounter.classList.toggle("is-visible", length >= PROMPT_COUNTER_VISIBLE_AT);
    promptCounter.classList.toggle("is-warning", length >= PROMPT_COUNTER_WARNING_AT && length < PROMPT_MAX_LENGTH);
    promptCounter.classList.toggle("is-danger", length >= PROMPT_MAX_LENGTH);
  }
  if (clearPromptButton) {
    clearPromptButton.classList.toggle("is-hidden", length === 0);
  }
  if (promptCard) {
    promptCard.classList.toggle("has-prompt", Boolean(value.trim()));
    promptCard.dataset.promptSource = source.kind;
  }
}

function setPromptSource(source, value = null) {
  state.promptSource = String(source || "manual");
  state.promptSourceValue = value === null ? promptTextValue() : String(value || "");
  renderPromptControls();
}

function handlePromptInput() {
  syncTemplateStateFromPrompt();
  renderPromptControls();
}

function clearPromptText() {
  if (!promptInput) {
    return;
  }
  promptInput.value = "";
  clearSelectedTemplate({ clearPrompt: false });
  setPromptSource("manual", "");
  promptInput.focus();
  setCreateNote("Промпт очищен.");
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
    if (value.startsWith("/v1/")) {
      return `${trimApiBase(state.apiBase)}${value}`;
    }
    if (value.startsWith("/generated/")) {
      return `${trimApiBase(state.apiBase)}${value}`;
    }
    return value;
  }
}

function isTemplateVideoUrl(rawUrl) {
  return TEMPLATE_VIDEO_URL_RE.test(String(rawUrl || "").trim());
}

function adminTemplateFileMediaType(file) {
  if (!(file instanceof File)) {
    return "";
  }
  const type = String(file.type || "").split(";", 1)[0].trim().toLowerCase();
  if (type === "video/mp4" || String(file.name || "").trim().toLowerCase().endsWith(".mp4")) {
    return "video";
  }
  if (["image/png", "image/jpeg", "image/webp"].includes(type)) {
    return "image";
  }
  return "";
}

function adminTemplateFileSizeLimit(file) {
  return adminTemplateFileMediaType(file) === "video"
    ? ADMIN_TEMPLATE_MAX_MEDIA_BYTES
    : MAX_SOURCE_IMAGE_BYTES;
}

function validateAdminTemplateFile(file) {
  const mediaType = adminTemplateFileMediaType(file);
  if (!mediaType) {
    throw new Error("Для шаблона подходят PNG, JPG, WEBP или MP4.");
  }
  const maxBytes = adminTemplateFileSizeLimit(file);
  if (Number(file.size || 0) > maxBytes) {
    throw new Error(
      mediaType === "video"
        ? "MP4 слишком большой. Используй файл до 20 MB."
        : "Изображение слишком большое. Используй файл до 10 MB.",
    );
  }
  return mediaType;
}

function adminCampaignFileMediaType(file) {
  if (!(file instanceof File)) {
    return "";
  }
  const type = String(file.type || "").split(";", 1)[0].trim().toLowerCase();
  if (type === "video/mp4" || String(file.name || "").trim().toLowerCase().endsWith(".mp4")) {
    return "video";
  }
  if (["image/png", "image/jpeg", "image/webp"].includes(type)) {
    return "image";
  }
  return "";
}

function adminCampaignFileSizeLimit(file) {
  return adminCampaignFileMediaType(file) === "video"
    ? ADMIN_CAMPAIGN_MAX_MEDIA_BYTES
    : MAX_SOURCE_IMAGE_BYTES;
}

function validateAdminCampaignMediaFile(file) {
  const mediaType = adminCampaignFileMediaType(file);
  if (!mediaType) {
    throw new Error("Для рассылки подходят PNG, JPG, WEBP или MP4.");
  }
  const maxBytes = adminCampaignFileSizeLimit(file);
  if (Number(file.size || 0) > maxBytes) {
    throw new Error(
      mediaType === "video"
        ? "MP4 слишком большой. Используй файл до 20 MB."
        : "Изображение слишком большое. Используй файл до 10 MB.",
    );
  }
  return mediaType;
}

function formatMegabytes(bytes) {
  const value = Number(bytes || 0);
  if (!Number.isFinite(value) || value <= 0) {
    return "0 MB";
  }
  return `${(value / (1024 * 1024)).toFixed(value >= 1024 * 1024 ? 1 : 2)} MB`;
}

function renderTemplateMediaMarkup(
  rawUrl,
  alt,
  {
    className = "tool-media-image",
    loading = "lazy",
    priority = false,
    autoplay = false,
    controls = false,
  } = {},
) {
  const url = normalizeImageUrl(rawUrl);
  if (!url) {
    return "";
  }
  const safeUrl = escapeHtml(url);
  const safeAlt = escapeHtml(alt || "Шаблон");
  const safeClass = escapeHtml(className);
  if (isTemplateVideoUrl(url)) {
    return `<video class="${safeClass}" src="${safeUrl}" muted loop playsinline preload="${autoplay ? "auto" : "metadata"}"${autoplay ? " autoplay" : ""}${controls ? " controls" : ""} aria-label="${safeAlt}"></video>`;
  }
  const imagePriority = priority ? ' fetchpriority="high"' : "";
  return `<img class="${safeClass}" src="${safeUrl}" alt="${safeAlt}" loading="${escapeHtml(loading)}" decoding="async"${imagePriority} />`;
}

function mediaElementCurrentUrl(element) {
  if (!element) {
    return "";
  }
  if (typeof element.currentSrc === "string" && element.currentSrc) {
    return element.currentSrc;
  }
  if (typeof element.src === "string" && element.src) {
    return element.src;
  }
  return "";
}

function templateCardCurrentMediaUrl(card, fallbackUrl) {
  return mediaElementCurrentUrl(card?.querySelector(".tool-media-image")) || fallbackUrl || "";
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
    throw new Error("Ссылка на изображение не найдена.");
  }
  const apiBase = trimApiBase(state.apiBase);
  const isAuthorizedGenerationMedia = Boolean(apiBase) && url.startsWith(apiBase) && url.includes("/v1/generations/");
  if (!isNgrokUrl(url) && !isAuthorizedGenerationMedia) {
    return { src: url, contentType: "", isBlob: false };
  }

  const cached = state.imageBlobUrlCache.get(url);
  if (cached) {
    return { src: cached.src, contentType: cached.contentType, isBlob: true };
  }

  let blob;
  let contentType = "";
  if (isAuthorizedGenerationMedia) {
    const parsed = new URL(url);
    const apiPath = `${parsed.pathname}${parsed.search || ""}`;
    const payload = await authorizedBlobFetch(apiPath);
    blob = payload.blob;
    contentType = payload.contentType || blob.type || "";
  } else {
    const response = await fetch(url, {
      method: "GET",
      headers: headersForApiBase(url),
    });
    if (!response.ok) {
      throw new Error("Изображение временно недоступно.");
    }
    blob = await response.blob();
    contentType = blob.type || "";
  }
  const objectUrl = URL.createObjectURL(blob);
  state.imageBlobUrlCache.set(url, { src: objectUrl, contentType });
  return { src: objectUrl, contentType, isBlob: true };
}

async function openImage(rawUrl) {
  const targetUrl = normalizeImageUrl(rawUrl);
  if (!targetUrl) {
    throw new Error("Ссылка на изображение не найдена.");
  }
  if (tg && typeof tg.openLink === "function") {
    tg.openLink(targetUrl);
    return;
  }
  window.open(targetUrl, "_blank", "noopener,noreferrer");
}

async function apiFetchBlob(path, { auth = false } = {}) {
  const headers = headersForApiBase(state.apiBase);
  if (auth && state.accessToken) {
    headers.Authorization = `Bearer ${state.accessToken}`;
  }

  const response = await fetch(`${state.apiBase}${path}`, {
    method: "GET",
    credentials: "include",
    headers,
  });

  if (!response.ok) {
    const payload = await parseJsonResponse(response);
    const rawMessage = extractErrorMessage(payload, `HTTP ${response.status}`);
    const errorCode =
      (payload && typeof payload.code === "string" && payload.code) ||
      (payload && payload.detail && typeof payload.detail.code === "string" && payload.detail.code) ||
      "";
    const message = userFacingErrorMessage(
      { code: errorCode, status: response.status, rawMessage },
      fallbackMessageByStatus(response.status)
    );
    const error = new Error(message);
    error.status = response.status;
    error.code = errorCode;
    error.rawMessage = rawMessage;
    throw error;
  }

  return {
    blob: await response.blob(),
    contentType: response.headers.get("content-type") || "",
  };
}

async function authorizedBlobFetch(path) {
  try {
    return await apiFetchBlob(path, { auth: true });
  } catch (error) {
    if (!isUnauthorizedError(error)) {
      throw error;
    }
    const refreshed = await refreshSession();
    if (!refreshed) {
      setAuthGateVisible(true);
      throw error;
    }
    return apiFetchBlob(path, { auth: true });
  }
}

function triggerGenerationDownload(url, filename = "") {
  const normalizedUrl = normalizeImageUrl(url);
  if (!normalizedUrl) {
    return false;
  }
  const link = document.createElement("a");
  link.href = normalizedUrl;
  if (filename) {
    link.download = filename;
  }
  link.rel = "noopener";
  document.body.appendChild(link);
  link.click();
  link.remove();
  return true;
}

async function downloadGenerationImage(job, fallbackBase = "kartivio-image") {
  const normalizedJobId = String(job?.id || job || "").trim();
  if (!normalizedJobId) {
    throw new Error("Идентификатор генерации не найден.");
  }

  const directUrl = normalizeImageUrl(job?.result_image_download_url || "");
  if (directUrl && triggerGenerationDownload(directUrl)) {
    return;
  }

  const { blob, contentType } = await authorizedBlobFetch(`/v1/generations/${normalizedJobId}/download`);
  const objectUrl = URL.createObjectURL(blob);
  const ext = extensionFromContentType(contentType || blob.type) || "png";
  const filename = `${fallbackBase}-${Date.now()}.${ext}`;
  triggerGenerationDownload(objectUrl, filename);
  window.setTimeout(() => URL.revokeObjectURL(objectUrl), 2500);
}

function generationViewImageUrl(job) {
  if (!job || typeof job !== "object") {
    return "";
  }
  return normalizeImageUrl(job.result_image_view_url || job.result_image_url || "");
}

function generationThumbnailUrl(job) {
  if (!job || typeof job !== "object") {
    return "";
  }
  return normalizeImageUrl(job.result_image_thumbnail_url || job.result_image_view_url || job.result_image_url || "");
}

async function openGenerationImage(job) {
  const targetUrl = generationViewImageUrl(job);
  if (!targetUrl) {
    throw new Error("Ссылка на изображение не найдена.");
  }
  await openImage(targetUrl);
}

function openFirstPhotosetPaywall() {
  switchScreen("tokens");
  window.requestAnimationFrame(() => {
    if (state.allTopups.length) {
      renderPlans({ topups: state.allTopups });
    }
    selectTopup(FIRST_PHOTOSET_TOPUP_CODE);
  });
}

function switchScreen(nextScreen) {
  const target = String(nextScreen || "").trim();
  if (!target) {
    return;
  }
  if (target === "marketing" && !isAdminUser()) {
    setNote("Недостаточно прав для этого раздела.", true);
    return;
  }
  closeTemplateModal();
  state.currentScreen = target;
  if (target === "feed") {
    trackProductEvent("feed_viewed", { screen: "feed" });
  } else if (target === "tokens") {
    trackProductEvent("paywall_viewed", { screen: "tokens", source: "navigation" });
    syncPlansAfterEligibilityChange();
  }
  appShell.classList.toggle("is-paywall-active", target === "tokens");
  for (const screen of screens) {
    screen.classList.toggle("screen-active", screen.dataset.screen === target);
  }
  for (const button of navButtons) {
    button.classList.toggle("is-active", button.dataset.nav === target);
  }
  if (target === "history") {
    loadHistory().catch((error) => {
      setCreateNote(userFacingErrorMessage(error, "Не удалось загрузить историю."), true);
    });
  } else if (target === "marketing") {
    loadAdminData().catch((error) => {
      const message = userFacingErrorMessage(
        error,
        "Не удалось загрузить админские данные.",
      );
      setCampaignFormNote(message, true);
      setAdminTemplateFormNote(message, true);
      setAdminAnalyticsNote(message, true);
      if (adminAnalyticsUpdated) {
        adminAnalyticsUpdated.textContent = "Не удалось обновить";
      }
    });
  } else if (target === "feed") {
    window.requestAnimationFrame(() => maybeAutoLoadMoreTemplates());
  } else if (target === "tokens") {
    loadPaywallGalleryImages();
  }
}

function loadPaywallGalleryImages() {
  for (const image of paywallGalleryImages) {
    const source = String(image.dataset.src || "").trim();
    if (!source) {
      continue;
    }
    image.src = source;
    image.removeAttribute("data-src");
  }
}

function resetHistoryCache() {
  state.historyItems = null;
  state.historyLoadedAt = 0;
  state.historyLoadPromise = null;
  state.historyNextOffset = 0;
  state.historyHasMore = false;
}

function markHistoryCacheStale() {
  state.historyLoadedAt = 0;
}

function referenceImageFile() {
  return state.referenceImageFile instanceof File ? state.referenceImageFile : null;
}

function revokeReferenceImagePreview() {
  if (state.referenceImagePreviewUrl) {
    URL.revokeObjectURL(state.referenceImagePreviewUrl);
  }
  state.referenceImagePreviewUrl = "";
}

function setReferenceImage(file) {
  revokeReferenceImagePreview();
  state.referenceImageFile = file instanceof File ? file : null;
  state.referencePromptBuilt = false;
  if (state.referenceImageFile) {
    state.referenceImagePreviewUrl = URL.createObjectURL(state.referenceImageFile);
  }
}

function selectedReferenceFileFromInput() {
  if (!referenceImageInput || !referenceImageInput.files) {
    return null;
  }
  const [file] = Array.from(referenceImageInput.files).filter((item) => item instanceof File);
  return file || null;
}

function renderReferencePromptRestoreButton() {
  if (!referencePromptRestoreButton) {
    return;
  }
  const shouldShow = Boolean(!referencePromptLocked() && String(state.referencePromptPreviousValue || "").length > 0);
  referencePromptRestoreButton.classList.toggle("is-hidden", !shouldShow);
  referencePromptRestoreButton.disabled = Boolean(state.referencePromptBusy);
}

function setReferencePromptActionIcon(name) {
  if (!referencePromptActionIcon || !name) {
    return;
  }
  if (referencePromptActionIcon.getAttribute("data-lucide") === name) {
    return;
  }
  referencePromptActionIcon.setAttribute("data-lucide", name);
  refreshIcons();
}

function referenceImageFormatLabel(file) {
  const mime = String(file && file.type || "").toLowerCase();
  if (mime === "image/png") {
    return "PNG";
  }
  if (mime === "image/webp") {
    return "WEBP";
  }
  if (mime === "image/jpeg" || mime === "image/jpg") {
    return "JPG";
  }
  const fileName = String(file && file.name || "");
  const ext = fileName.includes(".") ? fileName.split(".").pop() : "";
  return ext ? String(ext).toUpperCase() : "Фото";
}

function hasSuccessfulPayment() {
  return Boolean(state.me && state.me.has_successful_payment);
}

function successfulGenerationCount() {
  return Number(state.me?.successful_generation_count || 0);
}

function setSuccessfulGenerationCount(nextCount) {
  const normalized = Math.max(0, Number(nextCount || 0));
  if (!state.me) {
    return;
  }
  state.me.successful_generation_count = Math.max(successfulGenerationCount(), normalized);
}

function noteSuccessfulGeneration(job) {
  const status = String(job?.status || "").toLowerCase();
  const jobId = String(job?.id || "").trim();
  if (status !== "done" || !jobId || state.trackedSuccessfulGenerationJobIds.has(jobId)) {
    return;
  }
  state.trackedSuccessfulGenerationJobIds.add(jobId);
  setSuccessfulGenerationCount(successfulGenerationCount() + 1);
}

function syncSuccessfulGenerationCountFromJobs(items) {
  if (!Array.isArray(items) || items.length === 0) {
    return;
  }
  const doneIds = new Set(
    items
      .filter((item) => String(item?.status || "").toLowerCase() === "done")
      .map((item) => String(item?.id || "").trim())
      .filter(Boolean),
  );
  for (const id of doneIds) {
    state.trackedSuccessfulGenerationJobIds.add(id);
  }
  setSuccessfulGenerationCount(doneIds.size);
}

function walletBalanceCredits() {
  return Number(state.walletBalanceCredits || 0);
}

function firstPhotosetOfferEligible(source = "credits_screen") {
  if (!hasActiveSession() || hasSuccessfulPayment()) {
    return false;
  }
  if (walletBalanceCredits() !== 0) {
    return false;
  }
  const minimumGenerations = source === "after_second_success" ? 2 : 1;
  return successfulGenerationCount() >= minimumGenerations;
}

function trackFirstPhotosetOfferViewed(source) {
  const normalizedSource = String(source || "credits_screen").trim() || "credits_screen";
  const key = `${state.me?.id || "anonymous"}:${normalizedSource}`;
  if (state.trackedFirstPhotosetOfferViews.has(key)) {
    return;
  }
  state.trackedFirstPhotosetOfferViews.add(key);
  trackProductEvent("first_photoset_offer_viewed", {
    source: normalizedSource,
    package_code: FIRST_PHOTOSET_TOPUP_CODE,
  });
}

function hasReferencePromptAccess() {
  return Boolean(hasSuccessfulPayment() || isAdminUser());
}

function referencePromptLocked() {
  return Boolean(hasActiveSession() && !hasReferencePromptAccess());
}

function defaultReferencePromptNote() {
  return referencePromptLocked()
    ? "Фича откроется после первой оплаты."
    : REFERENCE_PROMPT_NOTE_DEFAULT;
}

function referencePromptShouldBeExpanded() {
  return Boolean(state.referencePromptExpanded || state.referencePromptBusy);
}

function setReferencePromptExpanded(expanded) {
  state.referencePromptExpanded = Boolean(expanded);
  syncReferencePromptControls();
}

function renderStudioSceneState() {
  const hasTemplate = Boolean(state.selectedTemplate);
  const referenceOpen = referencePromptShouldBeExpanded();
  if (studioSceneBlock) {
    studioSceneBlock.classList.toggle("has-template", hasTemplate);
    studioSceneBlock.classList.toggle("has-reference-open", referenceOpen);
  }
  if (studioSceneTitle) {
    studioSceneTitle.textContent = hasTemplate
      ? "Шаблон выбран"
      : referenceOpen
        ? "Промпт по референсу"
        : "Выбери основу кадра";
  }
  if (referencePromptToggleButton) {
    referencePromptToggleButton.classList.toggle(
      "is-active",
      referenceOpen || Boolean(referenceImageFile()) || Boolean(state.referencePromptBuilt),
    );
    referencePromptToggleButton.setAttribute("aria-expanded", referenceOpen ? "true" : "false");
  }
}

function renderReferencePromptBusyStep(options = {}) {
  const { immediate = false } = options;
  const step = REFERENCE_PROMPT_BUSY_STEPS[referencePromptBusyStepIndex] || REFERENCE_PROMPT_BUSY_STEPS[0];
  if (!step) {
    return;
  }
  referencePromptBusySteps.forEach((item) => {
    item.classList.toggle("is-active", String(item.dataset.referencePromptStep || "") === step.key);
  });
  if (!referencePromptBusyCaptionTitle || !referencePromptBusyCaptionBody || !referencePromptBusyCaption) {
    return;
  }
  if (referencePromptBusyCaptionTimeoutId) {
    window.clearTimeout(referencePromptBusyCaptionTimeoutId);
    referencePromptBusyCaptionTimeoutId = 0;
  }
  if (immediate) {
    referencePromptBusyCaptionTitle.textContent = step.title;
    referencePromptBusyCaptionBody.textContent = step.body;
    referencePromptBusyCaption.classList.remove("is-changing");
    return;
  }
  referencePromptBusyCaption.classList.add("is-changing");
  referencePromptBusyCaptionTimeoutId = window.setTimeout(() => {
    referencePromptBusyCaptionTitle.textContent = step.title;
    referencePromptBusyCaptionBody.textContent = step.body;
    window.requestAnimationFrame(() => {
      referencePromptBusyCaption.classList.remove("is-changing");
    });
    referencePromptBusyCaptionTimeoutId = 0;
  }, 220);
}

function stopReferencePromptBusyLoop(options = {}) {
  const { reset = false } = options;
  if (referencePromptBusyIntervalId) {
    window.clearInterval(referencePromptBusyIntervalId);
    referencePromptBusyIntervalId = 0;
  }
  if (referencePromptBusyCaptionTimeoutId) {
    window.clearTimeout(referencePromptBusyCaptionTimeoutId);
    referencePromptBusyCaptionTimeoutId = 0;
  }
  if (reset) {
    referencePromptBusyStepIndex = 0;
  }
  renderReferencePromptBusyStep({ immediate: true });
}

function startReferencePromptBusyLoop() {
  if (!referencePromptBusySteps.length) {
    return;
  }
  if (referencePromptBusyIntervalId) {
    return;
  }
  renderReferencePromptBusyStep({ immediate: true });
  referencePromptBusyIntervalId = window.setInterval(() => {
    referencePromptBusyStepIndex = (referencePromptBusyStepIndex + 1) % REFERENCE_PROMPT_BUSY_STEPS.length;
    renderReferencePromptBusyStep();
  }, REFERENCE_PROMPT_BUSY_INTERVAL_MS);
}

function syncReferencePromptAccessState() {
  const locked = referencePromptLocked();
  const busy = Boolean(state.referencePromptBusy);

  if (referencePromptCard) {
    referencePromptCard.classList.toggle("is-locked", locked);
    referencePromptCard.classList.toggle("is-busy", busy);
    referencePromptCard.classList.toggle("is-collapsed", !referencePromptShouldBeExpanded());
  }
  if (referenceImageDropzone) {
    referenceImageDropzone.classList.toggle("is-locked", locked);
  }
  if (referencePromptSubtitle) {
    referencePromptSubtitle.textContent = locked
      ? "Платная фича для генерации по кадру"
      : "Создадим новый промпт по референсу";
  }
  if (referencePromptBadge) {
    referencePromptBadge.classList.toggle("is-hidden", !locked);
  }
  if (busy) {
    startReferencePromptBusyLoop();
  } else {
    stopReferencePromptBusyLoop({ reset: true });
  }
  renderStudioSceneState();
}

function syncReferencePromptControls() {
  syncReferencePromptAccessState();
  const hasFile = Boolean(referenceImageFile());
  const locked = referencePromptLocked();
  if (hasFile && referenceDropzoneSubtitle && !locked) {
    referenceDropzoneSubtitle.textContent = state.referencePromptBusy
      ? "Анализируем сцену и детали кадра"
      : state.referencePromptBuilt
        ? "Промпт уже обновлен. Можно собрать заново."
        : "Готово к сборке промпта";
  }
  if (referencePromptBuildButton) {
    referencePromptBuildButton.disabled = Boolean(state.referencePromptBusy);
    const label = referencePromptBuildButton.querySelector("span");
    if (label) {
      label.textContent = locked
        ? "Разблокировать"
        : !hasFile
          ? "Выбрать изображение"
          : state.referencePromptBusy
            ? "Собираем..."
            : state.referencePromptBuilt
              ? "Собрать заново"
              : "Собрать промпт";
    }
    setReferencePromptActionIcon(
      locked
        ? "lock"
        : !hasFile
          ? "image-plus"
          : state.referencePromptBusy
            ? "loader-circle"
            : "sparkles",
    );
  }
  if (clearReferenceImageButton) {
    clearReferenceImageButton.disabled = Boolean(state.referencePromptBusy || locked);
  }
  renderReferencePromptRestoreButton();
}

function clearReferencePromptUndoState() {
  state.referencePromptPreviousValue = "";
  renderReferencePromptRestoreButton();
}

function renderReferenceImage() {
  const file = referenceImageFile();
  const locked = referencePromptLocked();
  if (!file) {
    if (referenceDropzoneTitle) {
      referenceDropzoneTitle.textContent = locked ? "Фото-референс" : "Добавь фото-референс";
    }
    if (referenceDropzoneSubtitle) {
      referenceDropzoneSubtitle.textContent = "Сцена, свет, одежда и композиция";
    }
    if (referenceImageDropzone) {
      referenceImageDropzone.classList.remove("has-image");
    }
    if (referenceDropzoneEmptyState) {
      referenceDropzoneEmptyState.classList.remove("is-hidden");
    }
    if (referenceImagePreview) {
      referenceImagePreview.classList.add("is-hidden");
      referenceImagePreview.removeAttribute("src");
      referenceImagePreview.alt = "";
    }
    if (referenceDropzoneBadge) {
      referenceDropzoneBadge.classList.add("is-hidden");
    }
    if (clearReferenceImageButton) {
      clearReferenceImageButton.classList.add("is-hidden");
    }
    syncReferencePromptControls();
    return;
  }

  if (referenceDropzoneTitle) {
    referenceDropzoneTitle.textContent = file.name || "Фото-референс";
  }
  if (referenceDropzoneSubtitle) {
    referenceDropzoneSubtitle.textContent = state.referencePromptBusy
      ? "Анализируем сцену и детали кадра"
      : state.referencePromptBuilt
        ? "Промпт уже обновлен. Можно собрать заново."
        : "Готово к сборке промпта";
  }
  if (referenceImagePreview) {
    referenceImagePreview.src = state.referenceImagePreviewUrl || "";
    referenceImagePreview.alt = `Фото-референс: ${file.name}`;
    referenceImagePreview.classList.remove("is-hidden");
  }
  if (referenceImageDropzone) {
    referenceImageDropzone.classList.add("has-image");
  }
  if (referenceDropzoneEmptyState) {
    referenceDropzoneEmptyState.classList.add("is-hidden");
  }
  if (referenceDropzoneBadge) {
    referenceDropzoneBadge.textContent = `${referenceImageFormatLabel(file)} · ${sourceImageSizeLabel(file.size)}`;
    referenceDropzoneBadge.classList.remove("is-hidden");
  }
  if (clearReferenceImageButton) {
    clearReferenceImageButton.classList.remove("is-hidden");
  }
  syncReferencePromptControls();
}

function openReferenceImagePicker() {
  if (!referenceImageInput) {
    return;
  }
  referenceImageInput.value = "";
  if (typeof referenceImageInput.showPicker === "function") {
    try {
      referenceImageInput.showPicker();
      return;
    } catch (_error) {
      // fallback to click()
    }
  }
  referenceImageInput.click();
}

function openReferencePromptPaywall() {
  if (!hasActiveSession()) {
    setAuthGateVisible(true);
    setReferencePromptNote("Сначала войди в аккаунт.", true);
    return;
  }
  switchScreen("tokens");
  setPlansNote("Промпт по референсу откроется после первой оплаты.");
  setReferencePromptNote("Фича откроется после первой оплаты.");
}

function handleReferenceDropzoneAction() {
  if (state.referencePromptBusy) {
    return;
  }
  if (referencePromptLocked()) {
    openReferencePromptPaywall();
    return;
  }
  openReferenceImagePicker();
}

function handleReferencePromptPrimaryAction() {
  if (state.referencePromptBusy) {
    return;
  }
  if (referencePromptLocked()) {
    openReferencePromptPaywall();
    return;
  }
  if (!referenceImageFile()) {
    openReferenceImagePicker();
    return;
  }
  handleBuildReferencePrompt().catch((error) => {
    setReferencePromptNote(userFacingErrorMessage(error, "Не удалось собрать промпт по референсу."), true);
  });
}

function clearReferenceImage({ preserveNote = false } = {}) {
  if (referenceImageInput) {
    referenceImageInput.value = "";
  }
  setReferenceImage(null);
  renderReferenceImage();
  if (!preserveNote) {
    setReferencePromptNote(defaultReferencePromptNote());
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
    dropzoneTitle.textContent = "Добавь 1–3 фото";
    sourceImageMeta.textContent = "Без своих фото получится обычная генерация, не фотосессия с вашим лицом.";
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
      img.alt = `Фото ${index + 1}: ${file.name}`;
      img.loading = "lazy";
      cell.appendChild(img);

      const removeBtn = document.createElement("button");
      removeBtn.type = "button";
      removeBtn.className = "dropzone-thumb-remove";
      removeBtn.setAttribute("aria-label", `Убрать фото ${index + 1}`);
      removeBtn.textContent = "×";
      removeBtn.addEventListener("click", (event) => {
        event.preventDefault();
        event.stopPropagation();
        removeSourceImageAt(index);
        renderSelectedSourceImage();
        renderSelectedTemplateCard();
        setCreateNote("Фото удалено.");
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
  const selected = sourceImageFiles();
  trackProductEvent("photo_upload_selected", {
    file_count: selected.length,
    total_size_bucket: productFileSizeBucket(selected),
    source: "own_photo",
  });
  if (skipped > 0) {
    setCreateNote(`Добавлено до ${MAX_SOURCE_IMAGES} уникальных фото. Лишние пропущены.`, true);
  } else {
    refreshGenerationCostNote();
  }
  renderSelectedSourceImage();
  renderSelectedTemplateCard();
}

function handleReferenceImageChange() {
  const pickedFile = selectedReferenceFileFromInput();
  if (referenceImageInput) {
    referenceImageInput.value = "";
  }
  if (!pickedFile) {
    return;
  }

  const previousTemplate = state.selectedTemplate;
  const currentPrompt = normalizePromptForComparison(promptInput.value);
  const templatePrompt = previousTemplate ? normalizePromptForComparison(previousTemplate.prompt) : "";
  const shouldClearPrompt = Boolean(templatePrompt && currentPrompt === templatePrompt);
  if (previousTemplate) {
    clearSelectedTemplate({ clearPrompt: shouldClearPrompt });
  }

  setReferenceImage(pickedFile);
  state.referencePromptExpanded = true;
  renderReferenceImage();
  if (previousTemplate) {
    setReferencePromptNote("Шаблон убран. Теперь сцена будет собрана по фото-референсу.");
  } else {
    setReferencePromptNote(defaultReferencePromptNote());
  }
}

function clearSelectedTemplate({ clearPrompt } = { clearPrompt: false }) {
  state.selectedTemplateId = "";
  state.selectedTemplate = null;
  if (clearPrompt) {
    promptInput.value = "";
    setPromptSource("manual", "");
  }
  renderSelectedTemplateCard();
}

function selectedTemplatePromptStatus() {
  if (!state.selectedTemplate) {
    return "";
  }
  const hasSourceImage = sourceImageFilesForUpload().length > 0;
  const currentPrompt = normalizePromptForComparison(promptInput.value);
  const sourcePrompt = normalizePromptForComparison(state.selectedTemplate.prompt);
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
    renderStudioSceneState();
    return;
  }
  const preview = String(state.selectedTemplate.preview_image_url || "").trim();
  selectedTemplatePreview.innerHTML = renderTemplateMediaMarkup(
    preview || "https://picsum.photos/seed/kartivio-template/320/320",
    state.selectedTemplate.title || "Выбранный шаблон",
    {
      className: "selected-template-preview-media",
      autoplay: isTemplateVideoUrl(preview),
    },
  );
  selectedTemplateTitle.textContent = state.selectedTemplate.title || "Выбран шаблон";
  const category = String(state.selectedTemplate.category || "").trim();
  const status = selectedTemplatePromptStatus();
  selectedTemplateMeta.textContent = category ? `${category} · ${status}` : status;
  selectedTemplateCard.classList.remove("is-hidden");
  renderStudioSceneState();
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
  envHint.textContent = "Открыто в Telegram Mini App.";
}

function readTelegramCssInset(name) {
  const value = window.getComputedStyle(document.documentElement).getPropertyValue(name);
  const parsed = Number.parseFloat(String(value || "").trim());
  return Number.isFinite(parsed) ? parsed : 0;
}

function requestTelegramSafeAreas() {
  if (!tg) {
    return;
  }
  try {
    if (typeof tg.requestSafeArea === "function") {
      tg.requestSafeArea();
    }
  } catch (_) {
    // noop
  }
  try {
    if (typeof tg.requestContentSafeArea === "function") {
      tg.requestContentSafeArea();
    }
  } catch (_) {
    // noop
  }
}

function applyTelegramSafeInsets() {
  if (!tg) {
    return;
  }
  const platform = getTelegramRuntimePlatform();
  const contentSafeArea = tg.contentSafeAreaInset || {};
  const safeArea = tg.safeAreaInset || {};
  const cssContentTopInset = readTelegramCssInset("--tg-content-safe-area-inset-top");
  const cssContentBottomInset = readTelegramCssInset("--tg-content-safe-area-inset-bottom");
  const cssSafeTopInset = readTelegramCssInset("--tg-safe-area-inset-top");
  const cssSafeBottomInset = readTelegramCssInset("--tg-safe-area-inset-bottom");
  const topInset = Math.max(
    0,
    Number(contentSafeArea.top || 0),
    Number(safeArea.top || 0),
    cssContentTopInset,
    cssSafeTopInset
  );
  const bottomInset = Math.max(
    0,
    Number(contentSafeArea.bottom || 0),
    Number(safeArea.bottom || 0),
    cssContentBottomInset,
    cssSafeBottomInset
  );
  const isMobile = isTelegramMobileClient();
  let controlsOffset = 0;
  if (isMobile) {
    if (platform === "ios") {
      const targetTopClearance = 104;
      controlsOffset = Math.max(0, targetTopClearance - topInset);
    } else if (topInset > 0) {
      controlsOffset = 0;
    } else {
      const isFullscreen = Boolean(tg.isFullscreen);
      controlsOffset = isFullscreen ? 18 : 40;
    }
  }
  document.documentElement.style.setProperty("--tg-safe-top", `${Math.max(0, topInset)}px`);
  document.documentElement.style.setProperty("--tg-safe-bottom", `${Math.max(0, bottomInset)}px`);
  document.documentElement.style.setProperty("--tg-controls-offset", `${controlsOffset}px`);
}

function isTelegramMobileClient() {
  if (!tg) {
    return false;
  }
  const platform = getTelegramRuntimePlatform();
  if (platform === "ios" || platform === "android") {
    return true;
  }
  const ua = String(navigator.userAgent || "").toLowerCase();
  return /iphone|ipad|ipod|android|mobile/i.test(ua);
}

function initTelegramViewport() {
  if (!tg) {
    return;
  }
  try {
    tg.ready();
  } catch (_) {
    // noop
  }
  try {
    if (typeof tg.expand === "function") {
      tg.expand();
    }
  } catch (_) {
    // noop
  }
  requestTelegramSafeAreas();
  ensureTelegramImmersiveMode();
  scheduleTelegramImmersiveRetry();
  applyTelegramSafeInsets();
  attachTelegramImmersiveListeners();
  if (telegramViewportListenersAttached || typeof tg.onEvent !== "function") {
    return;
  }
  try {
    tg.onEvent("viewportChanged", () => {
      ensureTelegramImmersiveMode();
      requestTelegramSafeAreas();
      scheduleTelegramImmersiveRetry();
      applyTelegramSafeInsets();
    });
    tg.onEvent("safeAreaChanged", applyTelegramSafeInsets);
    tg.onEvent("contentSafeAreaChanged", applyTelegramSafeInsets);
    tg.onEvent("fullscreenChanged", () => {
      ensureTelegramImmersiveMode();
      scheduleTelegramImmersiveRetry();
      requestTelegramSafeAreas();
      applyTelegramSafeInsets();
    });
    tg.onEvent("fullscreenFailed", () => {
      ensureTelegramImmersiveMode();
      scheduleTelegramImmersiveRetry();
      requestTelegramSafeAreas();
      applyTelegramSafeInsets();
    });
  } catch (_) {
    // noop
  }
  telegramViewportListenersAttached = true;
}

function ensureTelegramImmersiveMode() {
  if (!tg || !isTelegramMobileClient()) {
    return;
  }
  try {
    if (typeof tg.disableVerticalSwipes === "function") {
      tg.disableVerticalSwipes();
    }
  } catch (_) {
    // noop
  }
  try {
    if (typeof tg.expand === "function") {
      tg.expand();
    }
  } catch (_) {
    // noop
  }
  try {
    if (typeof tg.requestFullscreen === "function" && !tg.isFullscreen) {
      tg.requestFullscreen();
    }
  } catch (_) {
    // noop
  }
}

function scheduleTelegramImmersiveRetry() {
  if (!tg || !isTelegramMobileClient()) {
    return;
  }
  if (telegramImmersiveRetryTimer) {
    window.clearTimeout(telegramImmersiveRetryTimer);
    telegramImmersiveRetryTimer = 0;
  }
  const retryDelays = getTelegramRuntimePlatform() === "ios"
    ? [120, 320, 760, 1400, 2400, 3600]
    : [140, 420, 980];
  retryDelays.forEach((delay, index) => {
    const run = () => {
      ensureTelegramImmersiveMode();
      requestTelegramSafeAreas();
      applyTelegramSafeInsets();
      if (index === retryDelays.length - 1) {
        telegramImmersiveRetryTimer = 0;
      }
    };
    if (index === retryDelays.length - 1) {
      telegramImmersiveRetryTimer = window.setTimeout(run, delay);
      return;
    }
    window.setTimeout(run, delay);
  });
}

function attachTelegramImmersiveListeners() {
  if (!tg || telegramImmersiveListenersAttached || !isTelegramMobileClient()) {
    return;
  }
  const trigger = () => {
    ensureTelegramImmersiveMode();
    requestTelegramSafeAreas();
    scheduleTelegramImmersiveRetry();
    applyTelegramSafeInsets();
  };
  const options = { passive: true };
  window.addEventListener("touchstart", trigger, options);
  window.addEventListener("pointerdown", trigger, options);
  window.addEventListener("focus", trigger, options);
  window.addEventListener("pageshow", trigger, options);
  window.addEventListener("load", trigger, options);
  document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "visible") {
      trigger();
    }
  });
  telegramImmersiveListenersAttached = true;
}

function refreshAuthButtons() {
  if (yandexAuthButton) {
    yandexAuthButton.textContent = "Войти через Яндекс";
    yandexAuthButton.classList.toggle("is-hidden", !yandexClientIdFromMeta());
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

function clearTelegramWebLoginPolling() {
  if (!state.telegramWebLoginPollTimer) {
    return;
  }
  window.clearTimeout(state.telegramWebLoginPollTimer);
  state.telegramWebLoginPollTimer = null;
}

async function logoutSession() {
  try {
    const body = state.refreshToken ? { refresh_token: state.refreshToken } : undefined;
    await apiFetch("/v1/auth/logout", {
      method: "POST",
      body,
    });
  } catch (_e) {
    // noop: local cleanup below is still required
  }
  clearTelegramLinkPolling();
  clearTelegramWebLoginPolling();
  state.accessToken = "";
  state.refreshToken = "";
  state.isCookieSession = false;
  state.lastAuthProvider = "";
  state.me = null;
  state.telegramLinkToken = "";
  state.telegramWebLoginToken = "";
  clearReferenceImage({ preserveNote: true });
  clearReferencePromptUndoState();
  clearSelectedSourceImage();
  clearSelectedTemplate({ clearPrompt: true });
  releaseAdminTemplateLocalPreview();
  state.adminTemplates = [];
  state.adminCampaigns = [];
  state.adminOffers = [];
  state.selectedAdminTemplateId = "";
  state.selectedAdminCampaignId = "";
  state.adminCampaignPreview = null;
  resetHistoryCache();
  saveState();
  setAuthGateVisible(true);
  switchScreen("feed");
  await Promise.allSettled([loadPrivateData(), loadHistory(), loadTemplates()]);
  setNote("Сессия завершена. Войди снова через Яндекс или Telegram.");
}

function renderIdentityActions() {
  const linkedTelegram = state.linkedProviders.has("telegram");
  if (identityTelegram) {
    identityTelegram.textContent = linkedTelegram ? "Подключен" : "Не подключен";
  }
  if (identityYandex) {
    identityYandex.textContent = state.linkedProviders.has("yandex") ? "Подключен" : "Не подключен";
  }

  if (linkTelegramButton) {
    linkTelegramButton.disabled = linkedTelegram || !hasActiveSession();
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

function isAdminUser() {
  return Boolean(state.me && state.me.is_admin);
}

function formatAdminDateTime(raw) {
  const value = String(raw || "").trim();
  if (!value) {
    return "—";
  }
  const parsed = Date.parse(value);
  if (!Number.isFinite(parsed)) {
    return value;
  }
  return new Intl.DateTimeFormat("ru-RU", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(parsed));
}

function formatAnalyticsNumber(raw, maximumFractionDigits = 0) {
  const value = Number(raw || 0);
  return new Intl.NumberFormat("ru-RU", { maximumFractionDigits }).format(
    Number.isFinite(value) ? value : 0,
  );
}

function formatAnalyticsRub(raw) {
  return `${formatAnalyticsNumber(raw, 2)} ₽`;
}

function formatAnalyticsPercent(raw) {
  return `${formatAnalyticsNumber(raw, 1)}%`;
}

function setAdminAnalyticsNote(message, isError = false) {
  if (!adminAnalyticsNote) {
    return;
  }
  adminAnalyticsNote.textContent = String(message || "");
  adminAnalyticsNote.style.color = isError ? "#ff8080" : "";
}

function adminAnalyticsEmpty(label) {
  return `<div class="admin-analytics-row"><div class="admin-analytics-row-label"><span>${escapeHtml(label)}</span></div></div>`;
}

function renderAdminAnalytics() {
  const payload = state.adminAnalytics;
  if (adminAnalyticsPeriod) {
    for (const button of adminAnalyticsPeriod.querySelectorAll("[data-analytics-period]")) {
      button.classList.toggle(
        "is-active",
        button.dataset.analyticsPeriod === state.adminAnalyticsPeriod,
      );
    }
  }
  if (!payload) {
    if (adminAnalyticsKpis) {
      adminAnalyticsKpis.innerHTML = ["Регистрации", "Генерировали", "Покупатели", "Выручка"]
        .map(
          (label) => `<div class="admin-analytics-kpi"><span>${label}</span><strong>—</strong></div>`,
        )
        .join("");
    }
    return;
  }

  const cohort = payload.cohort || {};
  const activity = payload.activity || {};
  if (adminAnalyticsUpdated) {
    adminAnalyticsUpdated.textContent = `Обновлено ${formatAdminDateTime(payload.generated_at)}`;
  }
  if (adminAnalyticsKpis) {
    const kpis = [
      ["Регистрации", cohort.registrations, `${formatAnalyticsPercent(cohort.start_rate)} начали генерацию`],
      ["Генерировали", cohort.generation_succeeded, `${formatAnalyticsNumber(activity.successful_jobs)} успешных кадров`],
      ["Покупатели", cohort.buyers, `${formatAnalyticsNumber(activity.successful_payments)} успешных оплат`],
      ["Выручка", formatAnalyticsRub(activity.revenue_rub), `${formatAnalyticsPercent(activity.success_rate)} успешных задач`],
    ];
    adminAnalyticsKpis.innerHTML = kpis
      .map(
        ([label, value, detail]) => `
          <div class="admin-analytics-kpi">
            <span>${escapeHtml(String(label))}</span>
            <strong>${escapeHtml(String(value))}</strong>
            <small>${escapeHtml(String(detail))}</small>
          </div>
        `,
      )
      .join("");
  }

  if (adminAnalyticsCohort) {
    const stages = [
      ["Регистрации", cohort.registrations, 100],
      ["Начали генерацию", cohort.generation_started, cohort.start_rate],
      ["Получили результат", cohort.generation_succeeded, cohort.generation_rate],
      ["Создали оплату", cohort.checkout_started, cohort.checkout_rate],
      ["Оплатили", cohort.buyers, cohort.buyer_rate],
    ];
    adminAnalyticsCohort.innerHTML = stages
      .map(
        ([label, value, rate]) => `
          <div class="admin-analytics-stage">
            <span>${escapeHtml(String(label))}</span>
            <strong>${formatAnalyticsNumber(value)}</strong>
            <small>${formatAnalyticsPercent(rate)} от регистраций</small>
          </div>
        `,
      )
      .join("");
  }

  if (adminAnalyticsEventFunnel) {
    const rows = Array.isArray(payload.event_funnel) ? payload.event_funnel : [];
    adminAnalyticsEventFunnel.innerHTML = rows.length
      ? rows
          .map(
            (item) => `
              <div class="admin-analytics-row">
                <div class="admin-analytics-row-label">
                  <strong>${escapeHtml(String(item.label || item.event_name || "Событие"))}</strong>
                </div>
                <div class="admin-analytics-row-value">
                  <strong>${formatAnalyticsNumber(item.actors)}</strong>
                  <small>${formatAnalyticsNumber(item.events)} событий</small>
                </div>
              </div>
            `,
          )
          .join("")
      : adminAnalyticsEmpty("Событий пока нет.");
  }

  if (adminAnalyticsWelcome) {
    const rows = Array.isArray(payload.welcome_cohorts) ? payload.welcome_cohorts : [];
    adminAnalyticsWelcome.innerHTML = rows.length
      ? rows
          .map(
            (item) => `
              <div class="admin-analytics-row">
                <div class="admin-analytics-row-label">
                  <strong>${formatAnalyticsNumber(item.welcome_credits)} кредитов</strong>
                  <span>${formatAnalyticsNumber(item.users)} пользователей · ${formatAnalyticsNumber(item.checkout_users)} оплат начали</span>
                </div>
                <div class="admin-analytics-row-value">
                  <strong>${formatAnalyticsNumber(item.buyers)} покупок</strong>
                  <small>${formatAnalyticsPercent(item.generation_rate)} ген. · ${formatAnalyticsPercent(item.buyer_rate)} оплатили</small>
                </div>
              </div>
            `,
          )
          .join("")
      : adminAnalyticsEmpty("Нет welcome-когорт за период.");
  }

  if (adminAnalyticsReliability) {
    const rows = Array.isArray(payload.reliability) ? payload.reliability : [];
    adminAnalyticsReliability.innerHTML = rows.length
      ? rows
          .map(
            (item) => `
              <div class="admin-analytics-row">
                <div class="admin-analytics-row-label">
                  <strong>${escapeHtml(String(item.label || item.source || "Источник"))}</strong>
                  <span>${formatAnalyticsNumber(item.successful_jobs)} успешно · ${formatAnalyticsNumber(item.failed_jobs)} ошибок</span>
                </div>
                <div class="admin-analytics-row-value">
                  <strong>${formatAnalyticsPercent(item.success_rate)}</strong>
                  <small>успешность</small>
                </div>
              </div>
            `,
          )
          .join("")
      : adminAnalyticsEmpty("Нет генераций за период.");
  }

  if (adminAnalyticsTemplates) {
    const rows = Array.isArray(payload.top_templates) ? payload.top_templates : [];
    adminAnalyticsTemplates.innerHTML = rows.length
      ? rows
          .map(
            (item) => `
              <div class="admin-analytics-row">
                <div class="admin-analytics-row-label">
                  <strong>${escapeHtml(String(item.title || "Шаблон"))}</strong>
                  <span>${escapeHtml(String(item.category || "Без категории"))}</span>
                </div>
                <div class="admin-analytics-row-value">
                  <strong>${formatAnalyticsNumber(item.uses)}</strong>
                  <small>${formatAnalyticsNumber(item.users)} пользователей</small>
                </div>
              </div>
            `,
          )
          .join("")
      : adminAnalyticsEmpty("Шаблоны пока не использовались.");
  }

  if (adminAnalyticsAttribution) {
    const attribution = payload.attribution || {};
    adminAnalyticsAttribution.innerHTML = `
      <span>Атрибуция first touch</span>
      <strong>${formatAnalyticsPercent(attribution.coverage_rate)} пользователей · ${formatAnalyticsNumber(attribution.attributed_buyers)} из ${formatAnalyticsNumber(attribution.buyers)} покупателей</strong>
    `;
  }
  setAdminAnalyticsNote(
    "Событийная воронка накапливается с этой версии. Остальные блоки рассчитаны по существующим пользователям, генерациям и оплатам.",
  );
}

function formatOfferCreditsMeta(credits) {
  const numericCredits = Number(credits || 0);
  const nb2 = Math.floor(numericCredits / (MODEL_COSTS["gemini-3.1-flash-image-preview"] || 1));
  return `${formatCredits(numericCredits)} · ${nb2} фото NB2`;
}

function setCampaignFormNote(message, isError = false) {
  if (!campaignFormNote) {
    return;
  }
  campaignFormNote.textContent = String(message || "");
  campaignFormNote.style.color = isError ? "#ff8080" : "";
}

function setOfferFormNote(message, isError = false) {
  if (!offerFormNote) {
    return;
  }
  offerFormNote.textContent = String(message || "");
  offerFormNote.style.color = isError ? "#ff8080" : "";
}

function setCampaignMediaUploadStatus(message, isError = false) {
  if (!campaignMediaUploadNote) {
    return;
  }
  campaignMediaUploadNote.textContent = String(message || "");
  campaignMediaUploadNote.style.color = isError ? "#ff8080" : "";
}

function adminFormErrorMessage(error, fallback) {
  const raw = String((error && error.message) || "").trim();
  if (raw && !error?.status && !error?.code) {
    return raw;
  }
  return userFacingErrorMessage(error, fallback);
}

function renderAdminAccess() {
  if (!adminAccessCard) {
    return;
  }
  adminAccessCard.classList.toggle("is-hidden", !isAdminUser());
}

function setAdminTemplateFormNote(message, isError = false) {
  if (!adminTemplateFormNote) {
    return;
  }
  adminTemplateFormNote.textContent = String(message || "");
  adminTemplateFormNote.style.color = isError ? "#ff8080" : "";
}

function setAdminTemplateFileStatus(message, isError = false) {
  if (!adminTemplateFileNote) {
    return;
  }
  adminTemplateFileNote.textContent = String(message || ADMIN_TEMPLATE_FILE_NOTE_DEFAULT);
  adminTemplateFileNote.style.color = isError ? "#ff8080" : "";
}

function adminSelectedTemplate() {
  return state.adminTemplates.find((item) => item.id === state.selectedAdminTemplateId) || null;
}

function releaseAdminTemplateLocalPreview() {
  const current = String(state.adminTemplateLocalPreviewUrl || "").trim();
  if (current && current.startsWith("blob:")) {
    URL.revokeObjectURL(current);
  }
  state.adminTemplateLocalPreviewUrl = "";
  state.adminTemplateLocalPreviewMediaType = "";
}

function clearAdminTemplateFileSelection() {
  releaseAdminTemplateLocalPreview();
  if (adminTemplateFileInput) {
    adminTemplateFileInput.value = "";
  }
  setAdminTemplateFileStatus(ADMIN_TEMPLATE_FILE_NOTE_DEFAULT);
}

function adminTemplateCurrentFile() {
  return adminTemplateFileInput && adminTemplateFileInput.files
    ? adminTemplateFileInput.files[0] || null
    : null;
}

function setAdminTemplatePreview(url, mediaType = "") {
  if (!adminTemplatePreview) {
    return;
  }
  const normalized = normalizeImageUrl(url);
  if (!normalized) {
    adminTemplatePreview.classList.add("is-hidden");
    adminTemplatePreview.innerHTML = "";
    return;
  }
  const isVideo = mediaType === "video" || isTemplateVideoUrl(normalized);
  adminTemplatePreview.innerHTML = isVideo
    ? `<video src="${escapeHtml(normalized)}" muted loop playsinline controls preload="metadata" aria-label="Превью шаблона"></video>`
    : `<img src="${escapeHtml(normalized)}" alt="Превью шаблона" loading="lazy" />`;
  adminTemplatePreview.classList.remove("is-hidden");
}

function populateAdminTemplateDraft(item) {
  if (!item) {
    return;
  }
  if (adminTemplateTitleInput) {
    adminTemplateTitleInput.value = String(item.title || "");
  }
  if (adminTemplateCategoryInput) {
    adminTemplateCategoryInput.value = String(item.category || "");
  }
  if (adminTemplatePromptInput) {
    adminTemplatePromptInput.value = String(item.prompt || "");
  }
}

function resetAdminTemplateDraft() {
  state.selectedAdminTemplateId = "";
  clearAdminTemplateFileSelection();
  if (adminTemplateTitleInput) {
    adminTemplateTitleInput.value = "";
  }
  if (adminTemplateCategoryInput) {
    adminTemplateCategoryInput.value = "";
  }
  if (adminTemplatePromptInput) {
    adminTemplatePromptInput.value = "";
  }
  setAdminTemplatePreview("");
  setAdminTemplateFormNote("");
  renderAdminTemplateFormState();
}

function adminTemplateDraftBody() {
  const title = String((adminTemplateTitleInput && adminTemplateTitleInput.value) || "").trim();
  const category = String((adminTemplateCategoryInput && adminTemplateCategoryInput.value) || "").trim();
  const prompt = String((adminTemplatePromptInput && adminTemplatePromptInput.value) || "").trim();
  if (!title) {
    throw new Error("Укажи название шаблона.");
  }
  if (!category) {
    throw new Error("Укажи категорию шаблона.");
  }
  if (prompt.length < 10) {
    throw new Error("Промпт должен быть не короче 10 символов.");
  }
  return { title, category, prompt };
}

function adminTemplateDraftDiffers() {
  const selected = adminSelectedTemplate();
  if (!selected) {
    return false;
  }
  let draft;
  try {
    draft = adminTemplateDraftBody();
  } catch (_error) {
    return true;
  }
  return (
    String(selected.title || "").trim() !== draft.title ||
    String(selected.category || "").trim() !== draft.category ||
    String(selected.prompt || "").trim() !== draft.prompt
  );
}

function truncateAdminText(value, limit = 180) {
  const normalized = String(value || "").trim().replace(/\s+/g, " ");
  if (normalized.length <= limit) {
    return normalized;
  }
  return `${normalized.slice(0, limit - 1).trimEnd()}…`;
}

function renderAdminTemplateFormState() {
  const selected = adminSelectedTemplate();
  const selectedFile = adminTemplateCurrentFile();
  if (adminTemplateStateBadge) {
    if (!selected) {
      adminTemplateStateBadge.textContent = "Новый";
    } else {
      adminTemplateStateBadge.textContent = selected.is_active ? "Активен" : "Скрыт";
    }
  }
  if (adminTemplateSaveButton) {
    adminTemplateSaveButton.disabled = !selected;
  }
  if (adminTemplateToggleButton) {
    adminTemplateToggleButton.disabled = !selected;
    adminTemplateToggleButton.textContent = selected && !selected.is_active ? "Показать" : "Скрыть";
  }
  if (selectedFile) {
    const localPreview = String(state.adminTemplateLocalPreviewUrl || "").trim();
    if (localPreview) {
      setAdminTemplatePreview(localPreview, state.adminTemplateLocalPreviewMediaType);
    }
  } else if (selected) {
    setAdminTemplatePreview(selected.preview_image_url || selected.full_image_url || "");
  } else {
    setAdminTemplatePreview("");
  }

  if (!adminTemplateMeta) {
    return;
  }
  if (!selected) {
    adminTemplateMeta.textContent =
      "Новый шаблон. Загрузи один файл, задай название, категорию и промпт.";
    adminTemplateMeta.classList.remove("is-warning");
    return;
  }
  const metaParts = [
    selected.id,
    selected.category,
    `${selected.usage_count || 0} использований`,
    `${selected.likes_count || 0} лайков`,
    formatAdminDateTime(selected.created_at),
  ];
  let message = metaParts.join(" · ");
  if (selectedFile) {
    message += " · Загруженный файл создаст новый шаблон, текущий не заменится.";
  } else if (adminTemplateDraftDiffers()) {
    message += " · Есть несохраненные изменения.";
  }
  adminTemplateMeta.textContent = message;
  adminTemplateMeta.classList.toggle(
    "is-warning",
    Boolean(selectedFile || adminTemplateDraftDiffers()),
  );
}

function adminKindLabel(kind) {
  const normalized = String(kind || "").trim().toLowerCase();
  return ADMIN_CAMPAIGN_KIND_LABELS[normalized] || normalized || "Кампания";
}

function adminStatusLabel(status) {
  const normalized = String(status || "").trim().toLowerCase();
  return ADMIN_CAMPAIGN_STATUS_LABELS[normalized] || normalized || "—";
}

function adminAudienceLabel(segment) {
  const normalized = String(segment || "").trim().toLowerCase();
  return ADMIN_AUDIENCE_LABELS[normalized] || normalized || "Авто-сегмент";
}

function adminSelectedCampaign() {
  return state.adminCampaigns.find((item) => item.id === state.selectedAdminCampaignId) || null;
}

function normalizeDraftText(value) {
  const normalized = String(value || "").trim();
  return normalized || null;
}

function adminCampaignDefaults(kind) {
  return ADMIN_CAMPAIGN_DEFAULTS[String(kind || "").trim()] || ADMIN_CAMPAIGN_DEFAULTS.new_templates;
}

function defaultAudienceSegmentForKind(kind) {
  return String(kind || "").trim() === "promo_discount" ? "generated_no_payments" : "telegram_reachable";
}

function parseAudienceUserIds(rawValue) {
  const raw = String(rawValue || "");
  const parts = raw
    .split(/[\s,\n\r\t;]+/g)
    .map((item) => item.trim())
    .filter(Boolean);
  const seen = new Set();
  const userIds = [];
  for (const item of parts) {
    const normalized = item.toLowerCase();
    if (seen.has(normalized)) {
      continue;
    }
    seen.add(normalized);
    userIds.push(item);
  }
  return userIds;
}

function isUuidLike(value) {
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(String(value || "").trim());
}

function selectedDraftPromoOffer() {
  const offerId = normalizeDraftText(campaignPromoOfferSelect && campaignPromoOfferSelect.value);
  if (!offerId) {
    return null;
  }
  return state.adminOffers.find((item) => String(item.id) === offerId) || null;
}

function buildPromoCampaignMessage(offer) {
  if (!offer) {
    return adminCampaignDefaults("promo_discount").message_text;
  }
  return `Для вас открыт ${offer.title}: ${offer.credits} кредитов за ${offer.price_rub} ₽.\n\nЗабрать пакет можно по кнопке ниже.`;
}

function applyCampaignKindDefaults(kind, previousKind = state.adminCampaignDraftKind) {
  const nextDefaults = adminCampaignDefaults(kind);
  const prevDefaults = adminCampaignDefaults(previousKind);
  const promoOffer = kind === "promo_discount" ? selectedDraftPromoOffer() : null;
  const nextTitle = promoOffer ? String(promoOffer.title || "").trim() || nextDefaults.title : nextDefaults.title;
  const nextMessage = kind === "promo_discount" ? buildPromoCampaignMessage(promoOffer) : nextDefaults.message_text;
  const nextCta = kind === "promo_discount" ? "Забрать пакет" : nextDefaults.cta_text;

  const currentTitle = String(campaignTitleInput && campaignTitleInput.value || "").trim();
  const currentMessage = String(campaignMessageInput && campaignMessageInput.value || "").trim();
  const currentCta = String(campaignCtaTextInput && campaignCtaTextInput.value || "").trim();

  if (campaignTitleInput && (!currentTitle || currentTitle === prevDefaults.title || currentTitle === ADMIN_CAMPAIGN_DEFAULTS.promo_discount.title || currentTitle === ADMIN_CAMPAIGN_DEFAULTS.new_templates.title)) {
    campaignTitleInput.value = nextTitle;
  }
  if (campaignMessageInput && (!currentMessage || currentMessage === prevDefaults.message_text || currentMessage === ADMIN_CAMPAIGN_DEFAULTS.promo_discount.message_text || currentMessage === ADMIN_CAMPAIGN_DEFAULTS.new_templates.message_text || /Забрать пакет можно по кнопке ниже\./.test(currentMessage))) {
    campaignMessageInput.value = nextMessage;
  }
  if (campaignCtaTextInput && (!currentCta || currentCta === prevDefaults.cta_text || currentCta === ADMIN_CAMPAIGN_DEFAULTS.promo_discount.cta_text || currentCta === ADMIN_CAMPAIGN_DEFAULTS.new_templates.cta_text || currentCta === "Посмотреть шаблоны")) {
    campaignCtaTextInput.value = nextCta;
  }
}

function forceApplyPromoOfferDraft(offer) {
  if (!offer) {
    return;
  }
  if (campaignTitleInput) {
    campaignTitleInput.value = String(offer.title || "").trim() || ADMIN_CAMPAIGN_DEFAULTS.promo_discount.title;
  }
  if (campaignMessageInput) {
    campaignMessageInput.value = buildPromoCampaignMessage(offer);
  }
  if (campaignCtaTextInput) {
    campaignCtaTextInput.value = "Забрать пакет";
  }
}

function buildCampaignDraftBody() {
  const kind = String(campaignKindSelect && campaignKindSelect.value || "").trim() || "new_templates";
  const audienceMode = String(campaignAudienceModeSelect && campaignAudienceModeSelect.value || "auto").trim() || "auto";
  const audienceUserIds = parseAudienceUserIds(campaignAudienceUserIdsInput && campaignAudienceUserIdsInput.value);
  if (audienceMode === "explicit_user_ids") {
    if (!audienceUserIds.length) {
      throw new Error(API_ERROR_MESSAGES.explicit_user_ids_required);
    }
    const invalidId = audienceUserIds.find((item) => !isUuidLike(item));
    if (invalidId) {
      throw new Error(`${API_ERROR_MESSAGES.explicit_user_ids_invalid}: ${invalidId}`);
    }
  }
  const body = {
    kind,
    title: String(campaignTitleInput && campaignTitleInput.value || "").trim(),
    message_text: String(campaignMessageInput && campaignMessageInput.value || "").trim(),
    cta_text: normalizeDraftText(campaignCtaTextInput && campaignCtaTextInput.value),
    media_url: null,
    promo_offer_id: null,
    audience_segment: audienceMode === "explicit_user_ids" ? "explicit_user_ids" : defaultAudienceSegmentForKind(kind),
    audience_user_ids: audienceMode === "explicit_user_ids" ? audienceUserIds : [],
  };
  body.media_url = normalizeDraftText(campaignMediaUrlInput && campaignMediaUrlInput.value);
  if (kind === "promo_discount") {
    body.promo_offer_id = normalizeDraftText(campaignPromoOfferSelect && campaignPromoOfferSelect.value);
  }
  return body;
}

function selectedCampaignDiffersFromDraft() {
  const selected = adminSelectedCampaign();
  if (!selected) {
    return false;
  }
  let draft;
  try {
    draft = buildCampaignDraftBody();
  } catch (_error) {
    return true;
  }
  if (String(selected.kind || "") !== String(draft.kind || "")) {
    return true;
  }
  if (String(selected.title || "").trim() !== String(draft.title || "").trim()) {
    return true;
  }
  if (String(selected.message_text || "").trim() !== String(draft.message_text || "").trim()) {
    return true;
  }
  if (normalizeDraftText(selected.cta_text) !== normalizeDraftText(draft.cta_text)) {
    return true;
  }
  if (normalizeDraftText(selected.media_url) !== normalizeDraftText(draft.media_url)) {
    return true;
  }
  if (draft.kind === "promo_discount" && normalizeDraftText(selected.promo_offer_id) !== normalizeDraftText(draft.promo_offer_id)) {
    return true;
  }
  if (String(selected.audience_segment || "").trim() !== String(draft.audience_segment || "").trim()) {
    return true;
  }
  const selectedAudienceIds = Array.isArray(selected.audience_user_ids) ? selected.audience_user_ids.map((item) => String(item || "").trim()).filter(Boolean) : [];
  if (selectedAudienceIds.join(",") !== (draft.audience_user_ids || []).join(",")) {
    return true;
  }
  return false;
}

function renderSelectedCampaignSummary() {
  if (!campaignSelectedSummary) {
    return;
  }
  const selected = adminSelectedCampaign();
  if (!selected) {
    campaignSelectedSummary.textContent = "Кампания не выбрана.";
    campaignSelectedSummary.classList.remove("is-warning");
    return;
  }
  const audiencePart = adminAudienceLabel(selected.audience_segment);
  const explicitCount = Array.isArray(selected.audience_user_ids) && selected.audience_user_ids.length ? ` · ${selected.audience_user_ids.length} user_id` : "";
  const summary = `Выбрана кампания: ${selected.title} · ${adminKindLabel(selected.kind)} · ${adminStatusLabel(selected.status)} · ${audiencePart}${explicitCount}`;
  if (selectedCampaignDiffersFromDraft()) {
    campaignSelectedSummary.textContent = `${summary}. В форме есть несохраненные изменения.`;
    campaignSelectedSummary.classList.add("is-warning");
    return;
  }
  campaignSelectedSummary.textContent = summary;
  campaignSelectedSummary.classList.remove("is-warning");
}

function isPromoCampaignDraft() {
  return String(campaignKindSelect && campaignKindSelect.value || "").trim() === "promo_discount";
}

function renderCampaignDraftVisibility() {
  const isPromo = isPromoCampaignDraft();
  const explicitAudience = String(campaignAudienceModeSelect && campaignAudienceModeSelect.value || "").trim() === "explicit_user_ids";
  if (campaignMediaFields) {
    campaignMediaFields.classList.remove("is-hidden");
  }
  if (campaignPromoOfferField) {
    campaignPromoOfferField.classList.toggle("is-hidden", !isPromo);
  }
  if (campaignAudienceUserIdsField) {
    campaignAudienceUserIdsField.classList.toggle("is-hidden", !explicitAudience);
  }
  renderSelectedCampaignSummary();
}

function setCampaignMediaPreview(url) {
  const normalized = normalizeImageUrl(url);
  if (!campaignMediaPreview) {
    return;
  }
  if (!normalized) {
    campaignMediaPreview.classList.add("is-hidden");
    campaignMediaPreview.innerHTML = "";
    return;
  }
  campaignMediaPreview.innerHTML = renderTemplateMediaMarkup(normalized, "Медиа кампании", {
    className: "admin-campaign-media-preview",
    controls: isTemplateVideoUrl(normalized),
  });
  campaignMediaPreview.classList.remove("is-hidden");
}

function renderAdminTabs() {
  if (!marketingAdminTabs) {
    return;
  }
  const buttons = Array.from(marketingAdminTabs.querySelectorAll("[data-admin-tab]"));
  for (const button of buttons) {
    button.classList.toggle("is-active", button.dataset.adminTab === state.adminTab);
  }
  if (marketingAnalyticsPanel) {
    marketingAnalyticsPanel.classList.toggle("is-hidden", state.adminTab !== "analytics");
  }
  if (marketingTemplatesPanel) {
    marketingTemplatesPanel.classList.toggle("is-hidden", state.adminTab !== "templates");
  }
  if (marketingCampaignsPanel) {
    marketingCampaignsPanel.classList.toggle("is-hidden", state.adminTab !== "campaigns");
  }
  if (marketingOffersPanel) {
    marketingOffersPanel.classList.toggle("is-hidden", state.adminTab !== "offers");
  }
}

function renderCampaignPreviewStats(preview = null) {
  if (!campaignPreviewStats) {
    return;
  }
  const data = preview || state.adminCampaignPreview;
  if (!data) {
    campaignPreviewStats.classList.add("is-hidden");
    campaignPreviewStats.innerHTML = "";
    return;
  }
  campaignPreviewStats.classList.remove("is-hidden");
  campaignPreviewStats.innerHTML = `
    <article class="admin-mini-stat"><span>Доступно</span><strong>${escapeHtml(String(data.sendable_count || 0))}</strong></article>
    <article class="admin-mini-stat"><span>Reachable</span><strong>${escapeHtml(String(data.reachable_count || 0))}</strong></article>
    <article class="admin-mini-stat"><span>Muted</span><strong>${escapeHtml(String(data.muted_count || 0))}</strong></article>
    <article class="admin-mini-stat"><span>24ч лимит</span><strong>${escapeHtml(String(data.rate_limited_24h_count || 0))}</strong></article>
    <article class="admin-mini-stat"><span>7д лимит</span><strong>${escapeHtml(String(data.rate_limited_7d_count || 0))}</strong></article>
  `;
}

function renderPromoOfferOptions() {
  if (!campaignPromoOfferSelect) {
    return;
  }
  const currentValue = String(campaignPromoOfferSelect.value || "").trim();
  const options = ['<option value="">Выбери оффер</option>'];
  for (const item of state.adminOffers) {
    const activeLabel = item.active ? "активен" : "неактивен";
    const expires = item.expires_at ? ` · до ${formatAdminDateTime(item.expires_at)}` : "";
    options.push(
      `<option value="${escapeHtml(item.id)}" ${item.active ? "" : "disabled"}>${escapeHtml(item.title)} · ${escapeHtml(String(item.price_rub))} ₽ · ${escapeHtml(String(item.credits))} кр · ${escapeHtml(activeLabel)}${escapeHtml(expires)}</option>`
    );
  }
  campaignPromoOfferSelect.innerHTML = options.join("");
  if (currentValue && state.adminOffers.some((item) => item.id === currentValue && item.active)) {
    campaignPromoOfferSelect.value = currentValue;
  }
}

function renderCampaignsList() {
  if (!campaignsList) {
    return;
  }
  if (!state.adminCampaigns.length) {
    campaignsList.innerHTML = '<article class="admin-list-empty">Кампаний пока нет.</article>';
    return;
  }
  campaignsList.innerHTML = state.adminCampaigns.map((item) => {
    const isSelected = item.id === state.selectedAdminCampaignId;
    const hasMedia = Boolean(item.media_url);
    const mediaLabel = isTemplateVideoUrl(item.media_url) ? "video" : "photo";
    const audienceLabel = adminAudienceLabel(item.audience_segment);
    const explicitAudienceCount = Array.isArray(item.audience_user_ids) ? item.audience_user_ids.length : 0;
    const meta = [
      `${adminKindLabel(item.kind)}`,
      `status: ${adminStatusLabel(item.status)}`,
      `sent ${item.sent_count || 0}`,
      `failed ${item.failed_count || 0}`,
      `clicked ${item.clicks_count || 0}`,
      `checkout ${item.checkout_created_count || 0}`,
      `paid ${item.paid_count || 0}`,
    ].join(" · ");
    const preview = item.preview_sendable_count != null
      ? `Preview: ${item.preview_sendable_count}`
      : "Preview еще не считали";
    const audienceMeta = explicitAudienceCount > 0 ? `${audienceLabel} · ${explicitAudienceCount} user_id` : audienceLabel;
    return `
      <article class="admin-record-card${isSelected ? " is-selected" : ""}" data-campaign-id="${escapeHtml(item.id)}">
        <div class="admin-record-head">
          <div>
            <strong>${escapeHtml(item.title)}</strong>
            <p>${escapeHtml(meta)}</p>
          </div>
          <span class="chip">${escapeHtml(preview)}</span>
        </div>
        <p class="admin-record-text">${escapeHtml(item.message_text)}</p>
        <div class="admin-record-meta">
          <span>${escapeHtml(audienceMeta)}</span>
          <span>${escapeHtml(formatAdminDateTime(item.created_at))}</span>
          ${hasMedia ? `<span class="plan-badge plan-badge-muted">${escapeHtml(mediaLabel)}</span>` : ""}
        </div>
      </article>
    `;
  }).join("");
}

function renderOffersList() {
  if (!offersList) {
    return;
  }
  if (!state.adminOffers.length) {
    offersList.innerHTML = '<article class="admin-list-empty">Офферов пока нет.</article>';
    return;
  }
  offersList.innerHTML = state.adminOffers.map((item) => {
    const flags = [];
    if (item.active) {
      flags.push('<span class="plan-badge">Активен</span>');
    }
    if (item.require_successful_generation) {
      flags.push('<span class="plan-badge plan-badge-muted">После генерации</span>');
    }
    if (item.require_no_successful_payments) {
      flags.push('<span class="plan-badge plan-badge-muted">Без оплат</span>');
    }
    const expires = item.expires_at ? formatAdminDateTime(item.expires_at) : "без срока";
    return `
      <article class="admin-record-card admin-record-card-static">
        <div class="admin-record-head">
          <div>
            <strong>${escapeHtml(item.title)}</strong>
            <p>${escapeHtml(item.code)} · ${escapeHtml(formatOfferCreditsMeta(item.credits))}</p>
          </div>
          <span class="chip">${escapeHtml(String(item.price_rub))} ₽</span>
        </div>
        <div class="plan-badges">${flags.join("")}</div>
        <div class="admin-record-meta">
          <span>До ${escapeHtml(expires)}</span>
          <span>1 use / user</span>
        </div>
      </article>
    `;
  }).join("");
}

function renderAdminTemplatesList() {
  if (!adminTemplatesList) {
    return;
  }
  if (!state.adminTemplates.length) {
    adminTemplatesList.innerHTML =
      '<article class="admin-list-empty">Шаблонов пока нет.</article>';
    return;
  }
  adminTemplatesList.innerHTML = state.adminTemplates
    .map((item) => {
      const isSelected = item.id === state.selectedAdminTemplateId;
      const statusBadge = item.is_active
        ? '<span class="plan-badge">Активен</span>'
        : '<span class="plan-badge plan-badge-muted">Скрыт</span>';
      const previewUrl = normalizeImageUrl(item.preview_image_url || item.full_image_url || "");
      const previewMarkup = renderTemplateMediaMarkup(previewUrl, item.title || "Шаблон", {
        className: "admin-template-thumb-media",
        autoplay: false,
      });
      return `
        <article class="admin-record-card admin-template-card admin-template-card-static${isSelected ? " is-selected" : ""}" data-template-id="${escapeHtml(item.id)}">
          <div class="admin-template-thumb">
            ${previewMarkup}
          </div>
          <div class="admin-template-body">
            <div class="admin-record-head">
              <div>
                <div class="admin-template-title-row">
                  <strong>${escapeHtml(item.title || "Без названия")}</strong>
                  ${statusBadge}
                </div>
                <p>${escapeHtml(item.id)} · ${escapeHtml(item.category || "Разное")}</p>
              </div>
              <span class="chip">${escapeHtml(String(item.usage_count || 0))} исп.</span>
            </div>
            <p class="admin-record-text">${escapeHtml(truncateAdminText(item.prompt))}</p>
            <div class="admin-record-meta">
              <span>${escapeHtml(formatAdminDateTime(item.created_at))}</span>
              <span>${escapeHtml(String(item.likes_count || 0))} лайков</span>
              <span>${escapeHtml(String(item.source_type || "upload"))}</span>
            </div>
          </div>
        </article>
      `;
    })
    .join("");
}

function resetOfferDraft() {
  if (offerCodeInput) {
    offerCodeInput.value = "personal_200_299";
  }
  if (offerTitleInput) {
    offerTitleInput.value = "Персональный пакет";
  }
  if (offerPriceInput) {
    offerPriceInput.value = "299.00";
  }
  if (offerCreditsInput) {
    offerCreditsInput.value = "200";
  }
  if (offerExpiresAtInput) {
    offerExpiresAtInput.value = "";
  }
  if (offerMaxRedemptionsInput) {
    offerMaxRedemptionsInput.value = "1";
  }
  if (offerActiveInput) {
    offerActiveInput.checked = true;
  }
  if (offerRequireGenerationInput) {
    offerRequireGenerationInput.checked = true;
  }
  if (offerRequireNoPaymentsInput) {
    offerRequireNoPaymentsInput.checked = true;
  }
}

function resetCampaignDraft() {
  if (campaignKindSelect) {
    campaignKindSelect.value = "new_templates";
  }
  if (campaignTitleInput) {
    campaignTitleInput.value = "Новые шаблоны в ленте";
  }
  if (campaignMessageInput) {
    campaignMessageInput.value = "В ленте появились новые семейные, мужские и полезные шаблоны. Открыть Kartivio?";
  }
  if (campaignCtaTextInput) {
    campaignCtaTextInput.value = "Посмотреть шаблоны";
  }
  if (campaignMediaUrlInput) {
    campaignMediaUrlInput.value = "";
  }
  if (campaignPromoOfferSelect) {
    campaignPromoOfferSelect.value = "";
  }
  if (campaignAudienceModeSelect) {
    campaignAudienceModeSelect.value = "auto";
  }
  if (campaignAudienceUserIdsInput) {
    campaignAudienceUserIdsInput.value = "";
  }
  if (campaignTestChatIdInput) {
    campaignTestChatIdInput.value = "";
  }
  state.adminCampaignDraftKind = "new_templates";
  setCampaignMediaPreview("");
  renderCampaignDraftVisibility();
  renderSelectedCampaignSummary();
}

async function loadAdminCampaigns() {
  const payload = await authorizedFetch("/v1/admin/notification-campaigns?limit=100&offset=0");
  state.adminCampaigns = Array.isArray(payload.items) ? payload.items : [];
  if (!state.selectedAdminCampaignId && state.adminCampaigns.length) {
    state.selectedAdminCampaignId = state.adminCampaigns[0].id;
  }
  if (
    state.selectedAdminCampaignId &&
    !state.adminCampaigns.some((item) => item.id === state.selectedAdminCampaignId)
  ) {
    state.selectedAdminCampaignId = state.adminCampaigns[0] ? state.adminCampaigns[0].id : "";
  }
  const selected = adminSelectedCampaign();
  if (selected && selected.preview_sendable_count != null) {
    state.adminCampaignPreview = {
      campaign_id: selected.id,
      reachable_count: Number(selected.preview_reachable_count || 0),
      muted_count: Number(selected.preview_muted_count || 0),
      rate_limited_24h_count: Number(selected.preview_rate_limited_24h_count || 0),
      rate_limited_7d_count: Number(selected.preview_rate_limited_7d_count || 0),
      sendable_count: Number(selected.preview_sendable_count || 0),
    };
  } else if (!selected) {
    state.adminCampaignPreview = null;
  }
  renderCampaignsList();
  renderCampaignPreviewStats();
  renderSelectedCampaignSummary();
}

async function loadAdminAnalytics() {
  if (adminAnalyticsUpdated) {
    adminAnalyticsUpdated.textContent = "Обновляю данные...";
  }
  const payload = await authorizedFetch(
    `/v1/admin/analytics?period=${encodeURIComponent(state.adminAnalyticsPeriod)}`,
  );
  state.adminAnalytics = payload;
  renderAdminAnalytics();
}

async function loadAdminOffers() {
  const payload = await authorizedFetch("/v1/admin/promo-offers?limit=100&offset=0");
  state.adminOffers = Array.isArray(payload.items) ? payload.items : [];
  renderOffersList();
  renderPromoOfferOptions();
}

async function loadAdminTemplates() {
  const payload = await authorizedFetch("/v1/admin/feed-templates?limit=200&offset=0");
  state.adminTemplates = Array.isArray(payload.items) ? payload.items : [];
  if (
    state.selectedAdminTemplateId &&
    !state.adminTemplates.some((item) => item.id === state.selectedAdminTemplateId)
  ) {
    state.selectedAdminTemplateId = "";
  }
  const selected = adminSelectedTemplate();
  if (selected) {
    populateAdminTemplateDraft(selected);
  }
  renderAdminTemplatesList();
  renderAdminTemplateFormState();
}

async function loadAdminData() {
  if (!isAdminUser()) {
    return;
  }
  await Promise.all([
    loadAdminAnalytics(),
    loadAdminTemplates(),
    loadAdminCampaigns(),
    loadAdminOffers(),
  ]);
}

async function createAdminTemplate() {
  const file = adminTemplateCurrentFile();
  if (!(file instanceof File)) {
    throw new Error("Сначала выбери файл шаблона.");
  }
  validateAdminTemplateFile(file);
  const draft = adminTemplateDraftBody();
  const form = new FormData();
  form.append("file", file);
  form.append("title", draft.title);
  form.append("category", draft.category);
  form.append("prompt", draft.prompt);
  const payload = await authorizedMultipart("/v1/admin/feed-templates", form);
  clearAdminTemplateFileSelection();
  state.selectedAdminTemplateId = String(payload.id || "").trim();
  await loadAdminTemplates();
  return payload;
}

async function updateAdminTemplate() {
  const selected = adminSelectedTemplate();
  if (!selected) {
    throw new Error("Сначала выбери шаблон из списка.");
  }
  const payload = await authorizedFetch(`/v1/admin/feed-templates/${selected.id}`, {
    method: "PATCH",
    body: adminTemplateDraftBody(),
  });
  state.selectedAdminTemplateId = String(payload.id || selected.id).trim();
  await loadAdminTemplates();
  return payload;
}

async function toggleAdminTemplateVisibility() {
  const selected = adminSelectedTemplate();
  if (!selected) {
    throw new Error("Сначала выбери шаблон из списка.");
  }
  const action = selected.is_active ? "hide" : "show";
  const payload = await authorizedFetch(
    `/v1/admin/feed-templates/${selected.id}/${action}`,
    {
      method: "POST",
    },
  );
  state.selectedAdminTemplateId = String(payload.id || selected.id).trim();
  await loadAdminTemplates();
  return payload;
}

async function createAdminCampaign() {
  const body = buildCampaignDraftBody();
  const payload = await authorizedFetch("/v1/admin/notification-campaigns", {
    method: "POST",
    body,
  });
  state.selectedAdminCampaignId = payload.id || "";
  state.adminCampaignPreview = null;
  renderCampaignPreviewStats(null);
  await loadAdminCampaigns();
  return payload;
}

function ensureSelectedCampaignMatchesDraft() {
  const campaignId = String(state.selectedAdminCampaignId || "").trim();
  if (!campaignId) {
    throw new Error("Сначала выбери кампанию.");
  }
  if (selectedCampaignDiffersFromDraft()) {
    throw new Error("Сначала сохрани draft. Сейчас в форме и в выбранной кампании разные данные.");
  }
  return campaignId;
}

async function previewSelectedCampaign() {
  const campaignId = ensureSelectedCampaignMatchesDraft();
  const payload = await authorizedFetch(`/v1/admin/notification-campaigns/${campaignId}/preview`, {
    method: "POST",
  });
  state.adminCampaignPreview = payload;
  renderCampaignPreviewStats(payload);
  await loadAdminCampaigns();
  return payload;
}

async function testSelectedCampaign() {
  const campaignId = ensureSelectedCampaignMatchesDraft();
  const rawChatId = String(campaignTestChatIdInput && campaignTestChatIdInput.value || "").trim();
  const body = {};
  if (rawChatId) {
    body.chat_id = Number(rawChatId);
  }
  const payload = await authorizedFetch(`/v1/admin/notification-campaigns/${campaignId}/test`, {
    method: "POST",
    body,
  });
  await loadAdminCampaigns();
  return payload;
}

async function launchSelectedCampaign() {
  const campaignId = ensureSelectedCampaignMatchesDraft();
  const payload = await authorizedFetch(`/v1/admin/notification-campaigns/${campaignId}/launch`, {
    method: "POST",
  });
  await loadAdminCampaigns();
  return payload;
}

async function uploadCampaignMedia(file) {
  if (!(file instanceof File)) {
    throw new Error("Файл не выбран.");
  }
  validateAdminCampaignMediaFile(file);
  const form = new FormData();
  form.append("file", file);
  const payload = await authorizedMultipart("/v1/admin/notification-media", form);
  return payload;
}

async function createPromoOffer() {
  const rawExpiresAt = String(offerExpiresAtInput && offerExpiresAtInput.value || "").trim();
  const body = {
    code: String(offerCodeInput && offerCodeInput.value || "").trim(),
    title: String(offerTitleInput && offerTitleInput.value || "").trim(),
    price_rub: String(offerPriceInput && offerPriceInput.value || "").trim(),
    credits: Number(offerCreditsInput && offerCreditsInput.value || 0),
    active: Boolean(offerActiveInput && offerActiveInput.checked),
    expires_at: rawExpiresAt ? new Date(rawExpiresAt).toISOString() : null,
    max_redemptions_per_user: Number(offerMaxRedemptionsInput && offerMaxRedemptionsInput.value || 1),
    require_successful_generation: Boolean(offerRequireGenerationInput && offerRequireGenerationInput.checked),
    require_no_successful_payments: Boolean(offerRequireNoPaymentsInput && offerRequireNoPaymentsInput.checked),
  };
  const payload = await authorizedFetch("/v1/admin/promo-offers", {
    method: "POST",
    body,
  });
  await loadAdminOffers();
  return payload;
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

function normalizeErrorCode(value) {
  return String(value || "").trim().toLowerCase();
}

function fallbackMessageByStatus(status, fallback = "Не удалось выполнить запрос. Попробуй еще раз.") {
  const code = Number(status || 0);
  if (code === 401) {
    return "Нужно войти в аккаунт.";
  }
  if (code === 403) {
    return "Недостаточно прав для этого действия.";
  }
  if (code === 404) {
    return "Данные не найдены.";
  }
  if (code === 413) {
    return "Файл слишком большой.";
  }
  if (code === 422) {
    return "Проверь введенные данные и попробуй снова.";
  }
  if (code === 429) {
    return "Слишком много запросов. Подожди немного и попробуй снова.";
  }
  if (code >= 500) {
    return "Сервис временно недоступен. Попробуй еще раз.";
  }
  return fallback;
}

function userFacingErrorMessage(error, fallback = "Произошла ошибка. Попробуй еще раз.") {
  const code = normalizeErrorCode(error && error.code);
  if (code && API_ERROR_MESSAGES[code]) {
    return API_ERROR_MESSAGES[code];
  }

  const status = Number(error && error.status);
  if (status) {
    return fallbackMessageByStatus(status, fallback);
  }

  const raw = String((error && (error.rawMessage || error.message)) || "").trim();
  if (!raw) {
    return fallback;
  }

  if (/failed to fetch|networkerror|load failed|fetch failed/i.test(raw)) {
    return "Нет соединения с сервером. Проверь интернет и попробуй снова.";
  }
  if (/timeout|timed out/i.test(raw)) {
    return "Операция заняла слишком много времени. Попробуй еще раз.";
  }
  if (/http\s*5\d\d/i.test(raw)) {
    return "Сервис временно недоступен. Попробуй еще раз.";
  }
  if (/http\s*4\d\d/i.test(raw)) {
    return fallback;
  }
  return fallback;
}

function generationErrorMessage(errorCode) {
  const key = normalizeErrorCode(errorCode);
  if (key && JOB_ERROR_MESSAGES[key]) {
    return JOB_ERROR_MESSAGES[key];
  }
  return "Генерация не удалась. Кредиты возвращены.";
}

function isUnauthorizedError(error) {
  const status = Number(error && error.status);
  if (status === 401) {
    return true;
  }
  const code = String((error && error.code) || "").trim().toLowerCase();
  if (code.includes("unauthorized") || code.includes("token")) {
    return true;
  }
  const message = String((error && error.message) || "");
  return /401|unauthorized|token/i.test(message);
}

async function fetchWithTimeout(url, options = {}, timeoutMs = API_FETCH_TIMEOUT_MS) {
  const controller = new AbortController();
  const timeoutId = window.setTimeout(() => {
    controller.abort();
  }, timeoutMs);
  try {
    return await fetch(url, {
      ...options,
      signal: controller.signal,
    });
  } catch (error) {
    if (error && error.name === "AbortError") {
      const timeoutError = new Error("Request timed out.");
      timeoutError.code = "request_timeout";
      throw timeoutError;
    }
    throw error;
  } finally {
    window.clearTimeout(timeoutId);
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

  const response = await fetchWithTimeout(
    `${state.apiBase}${path}`,
    {
      method,
      credentials: "include",
      headers,
      body: body !== undefined ? JSON.stringify(body) : undefined,
    },
    API_FETCH_TIMEOUT_MS
  );
  const payload = await parseJsonResponse(response);
  if (!response.ok) {
    const rawMessage = extractErrorMessage(payload, `HTTP ${response.status}`);
    const errorCode =
      (payload && typeof payload.code === "string" && payload.code) ||
      (payload && payload.detail && typeof payload.detail.code === "string" && payload.detail.code) ||
      "";
    const message = userFacingErrorMessage(
      { code: errorCode, status: response.status, rawMessage },
      fallbackMessageByStatus(response.status)
    );
    const error = new Error(message);
    error.status = response.status;
    error.code = errorCode;
    error.rawMessage = rawMessage;
    throw error;
  }
  return payload;
}

function multipartFileBytes(formData) {
  let totalBytes = 0;
  if (!formData || typeof formData.forEach !== "function") {
    return totalBytes;
  }
  formData.forEach((value) => {
    if (value instanceof Blob) {
      totalBytes += Number(value.size || 0);
    }
  });
  return totalBytes;
}

function multipartRequestTimeoutMs(formData, requestedTimeoutMs = 0) {
  const megabytes = Math.ceil(multipartFileBytes(formData) / (1024 * 1024));
  const sizeAwareTimeout =
    API_MULTIPART_BASE_TIMEOUT_MS + megabytes * API_MULTIPART_TIMEOUT_PER_MB_MS;
  return Math.min(
    API_MULTIPART_MAX_TIMEOUT_MS,
    Math.max(Number(requestedTimeoutMs || 0), sizeAwareTimeout),
  );
}

function multipartRequestError(message, code, status = 0, rawMessage = "") {
  const error = new Error(message);
  error.code = code;
  error.status = status;
  error.rawMessage = rawMessage || message;
  return error;
}

async function apiMultipart(
  path,
  formData,
  { auth = false, idempotencyKey, timeoutMs, onUploadProgress } = {},
) {
  const headers = headersForApiBase(state.apiBase);
  if (auth && state.accessToken) {
    headers.Authorization = `Bearer ${state.accessToken}`;
  }
  if (idempotencyKey) {
    headers["Idempotency-Key"] = idempotencyKey;
  }

  const requestTimeoutMs = multipartRequestTimeoutMs(formData, timeoutMs);
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open("POST", `${state.apiBase}${path}`, true);
    xhr.withCredentials = true;
    xhr.timeout = requestTimeoutMs;
    for (const [name, value] of Object.entries(headers)) {
      xhr.setRequestHeader(name, value);
    }

    if (typeof onUploadProgress === "function") {
      xhr.upload.addEventListener("progress", (event) => {
        const total = Number(event.total || multipartFileBytes(formData));
        const loaded = Math.min(Number(event.loaded || 0), total || Number(event.loaded || 0));
        const percent = total > 0 ? Math.min(100, Math.round((loaded / total) * 100)) : 0;
        onUploadProgress({ loaded, total, percent });
      });
      xhr.upload.addEventListener("load", () => {
        const total = multipartFileBytes(formData);
        onUploadProgress({ loaded: total, total, percent: 100 });
      });
    }

    xhr.addEventListener("load", () => {
      let payload = null;
      try {
        payload = xhr.responseText ? JSON.parse(xhr.responseText) : null;
      } catch (_error) {
        payload = null;
      }
      if (xhr.status >= 200 && xhr.status < 300) {
        resolve(payload);
        return;
      }
      const rawMessage = extractErrorMessage(payload, xhr.responseText || `HTTP ${xhr.status}`);
      const errorCode =
        (payload && typeof payload.code === "string" && payload.code) ||
        (payload && payload.detail && typeof payload.detail.code === "string" && payload.detail.code) ||
        "";
      const message = userFacingErrorMessage(
        { code: errorCode, status: xhr.status, rawMessage },
        fallbackMessageByStatus(xhr.status),
      );
      reject(multipartRequestError(message, errorCode, xhr.status, rawMessage));
    });
    xhr.addEventListener("error", () => {
      reject(
        multipartRequestError(
          "Нет соединения с сервером. Проверь интернет и попробуй снова.",
          "network_error",
        ),
      );
    });
    xhr.addEventListener("timeout", () => {
      reject(multipartRequestError("Request timed out.", "request_timeout"));
    });
    xhr.addEventListener("abort", () => {
      reject(multipartRequestError("Upload was aborted.", "request_aborted"));
    });
    xhr.send(formData);
  });
}

async function resolveApiBase() {
  const baseCandidates = [state.apiBase, DEFAULT_PROD_API_BASE, window.location.origin];
  const candidates = uniqueApiBases(baseCandidates);

  for (const candidate of candidates) {
    try {
      const response = await fetchWithTimeout(
        `${candidate}/healthz`,
        {
          method: "GET",
          headers: headersForApiBase(candidate),
        },
        API_HEALTHCHECK_TIMEOUT_MS
      );
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
  if (!state.refreshToken && !prefersCookieAuth()) {
    return false;
  }
  try {
    const body = state.refreshToken ? { refresh_token: state.refreshToken } : undefined;
    const payload = await apiFetch("/v1/auth/refresh", {
      method: "POST",
      body,
    });
    if (prefersCookieAuth() && !state.refreshToken) {
      state.accessToken = "";
      state.refreshToken = "";
      state.isCookieSession = true;
    } else {
      state.accessToken = payload.access_token;
      state.refreshToken = payload.refresh_token;
      state.isCookieSession = false;
    }
    saveState();
    return true;
  } catch (_e) {
    state.accessToken = "";
    state.refreshToken = "";
    state.isCookieSession = false;
    state.lastAuthProvider = "";
    state.telegramWebLoginToken = "";
    saveState();
    return false;
  }
}

async function authorizedFetch(path, options = {}) {
  try {
    return await apiFetch(path, { ...options, auth: true });
  } catch (error) {
    if (!isUnauthorizedError(error)) {
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
    if (!isUnauthorizedError(error)) {
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

  state.me = me;
  if (me.is_admin) {
    disableProductAnalyticsForAdmin();
  }
  userName.textContent = display;
  userTgId.textContent = tgId;
  renderWalletBalance(wallet);
  profileAvatar.textContent = display === "—" ? "K" : display[0].toUpperCase();
  renderReferenceImage();
  setReferencePromptNote(defaultReferencePromptNote());
  renderIdentityActions();
  renderAdminAccess();
  renderGenerationChips();
  refreshGenerationCostNote();
  syncPlansAfterEligibilityChange();
}

function renderWalletBalance(wallet) {
  const balance = Number(wallet?.balance_credits || 0);
  state.walletBalanceCredits = balance;
  creditsValue.textContent = formatCredits(balance);
  creditsBadge.textContent = String(balance);
  syncPlansAfterEligibilityChange();
}

function openCheckout(url, { popupHandle = null } = {}) {
  if (!url) {
    return;
  }
  if (popupHandle && !popupHandle.closed) {
    try {
      popupHandle.location.replace(url);
      popupHandle.focus();
      return;
    } catch (_error) {
      try {
        popupHandle.close();
      } catch (_closeError) {
        // noop
      }
    }
  }
  if (tg && typeof tg.openLink === "function") {
    tg.openLink(url);
    return;
  }
  const opened = window.open(url, "_blank", "noopener,noreferrer");
  if (!opened) {
    window.location.assign(url);
  }
}

async function buyPackage(code) {
  if (!hasActiveSession()) {
    setPlansNote("Сначала войди в аккаунт.", true);
    setAuthGateVisible(true);
    return;
  }
  const idem = `webapp_buy_${code}_${Date.now()}`;
  let popupHandle = null;
  if (!isTelegramMiniAppRuntime()) {
    try {
      popupHandle = window.open("about:blank", "_blank");
    } catch (_error) {
      popupHandle = null;
    }
  }
  try {
    const result = await authorizedFetch("/v1/payments/checkout", {
      method: "POST",
      body: { kind: "topup", code },
      idempotencyKey: idem,
    });
    if (result.checkout_url) {
      const selectedPackage = state.topups.find((item) => item.code === code);
      trackProductEvent("checkout_opened", {
        package_code: code,
        credits: Number(selectedPackage?.credits || 0),
        price_rub: Number(selectedPackage?.price_rub || 0),
      });
      flushProductEvents({ keepalive: true });
      openCheckout(result.checkout_url, { popupHandle });
      setPlansNote(`Пакет ${code} готов к оплате.`);
    } else {
      if (popupHandle && !popupHandle.closed) {
        try {
          popupHandle.close();
        } catch (_error) {
          // noop
        }
      }
      setPlansNote("Платеж создан, но ссылка оплаты не пришла.", true);
    }
  } catch (error) {
    if (popupHandle && !popupHandle.closed) {
      try {
        popupHandle.close();
      } catch (_closeError) {
        // noop
      }
    }
    setPlansNote(userFacingErrorMessage(error, "Не удалось создать платеж."), true);
  }
}

function topupDisplayTitle(item) {
  const code = String(item?.code || "").trim();
  return TOPUP_DISPLAY_TITLES[code] || String(item?.title || "");
}

function topupPhotoCount(item) {
  const explicitCount = Number(item?.photo_count || 0);
  if (explicitCount > 0) {
    return explicitCount;
  }
  const credits = Number(item?.credits || 0);
  return Math.floor(credits / (MODEL_COSTS["gemini-3.1-flash-image-preview"] || 10));
}

function topupResultLabel(item) {
  const code = String(item?.code || "").trim();
  const photoCount = topupPhotoCount(item);
  if (code === FIRST_PHOTOSET_TOPUP_CODE) {
    return `${photoCount} фото · бонус +5 фото`;
  }
  return `${photoCount} фото`;
}

function topupActionLabel(item) {
  return `Получить ${topupPhotoCount(item)} фото за ${Number(item?.price_rub || 0)} ₽`;
}

function visibleTopupsForPaywall(allTopups) {
  const source = Array.isArray(allTopups) ? allTopups : [];
  const shouldShowFirstOffer = firstPhotosetOfferEligible("credits_screen");
  const order = shouldShowFirstOffer
    ? [FIRST_PHOTOSET_TOPUP_CODE, "mini", "medium", "large"]
    : ["mini", "small", "medium", "large"];
  const byCode = new Map(source.map((item) => [String(item?.code || "").trim(), item]));
  const ordered = order.map((code) => byCode.get(code)).filter(Boolean);
  const knownCodes = new Set(order);
  for (const item of source) {
    const code = String(item?.code || "").trim();
    if (!code || knownCodes.has(code) || code === FIRST_PHOTOSET_TOPUP_CODE) {
      continue;
    }
    ordered.push(item);
  }
  return ordered;
}

function syncPlansAfterEligibilityChange() {
  if (!plansGrid || !Array.isArray(state.allTopups) || state.allTopups.length === 0) {
    return;
  }
  renderPlans({ topups: state.allTopups });
}

function selectTopup(code, { updateNote = true } = {}) {
  state.selectedTopupCode = String(code || "").trim();
  const cards = plansGrid.querySelectorAll(".plan-card");
  for (const card of cards) {
    const isSelected = card.dataset.code === state.selectedTopupCode;
    card.classList.toggle("is-selected", isSelected);
    card.setAttribute("aria-checked", String(isSelected));
  }
  const selected = state.topups.find((item) => item.code === state.selectedTopupCode);
  if (!selected) {
    plansActionButton.textContent = "Выбери пакет";
    plansActionButton.disabled = true;
    return;
  }
  plansActionButton.textContent = topupActionLabel(selected);
  plansActionButton.disabled = false;
  if (updateNote && selected.code === FIRST_PHOTOSET_TOPUP_CODE) {
    setPlansNote("Первый фотосет: 27 фото за цену базового пакета.");
  }
}

function renderPlans(payload) {
  const sourceTopups = Array.isArray(payload && payload.topups) ? payload.topups : state.allTopups;
  state.allTopups = sourceTopups;
  const topups = visibleTopupsForPaywall(sourceTopups);
  const showFirstOffer = topups.some((item) => String(item?.code || "").trim() === FIRST_PHOTOSET_TOPUP_CODE);
  state.topups = topups;
  plansGrid.innerHTML = "";
  plansGrid.classList.toggle("has-first-offer", showFirstOffer);
  if (!topups.length) {
    plansGrid.innerHTML = '<article class="plan-card plan-card-unavailable">Пакеты временно недоступны.</article>';
    selectTopup("");
    return;
  }

  if (showFirstOffer && state.currentScreen === "tokens") {
    trackFirstPhotosetOfferViewed("credits_screen");
  }

  for (const item of topups) {
    const credits = Number(item.credits || 0);
    const code = String(item.code || "").trim();
    const isFirstOffer = code === FIRST_PHOTOSET_TOPUP_CODE;
    const isPopular = !showFirstOffer && Boolean(item.is_popular);
    const valueDiscountPercent = Number(item.value_discount_percent || 0);
    const displayTitle = topupDisplayTitle(item);
    const discountHtml =
      !isFirstOffer && valueDiscountPercent > 0
        ? `<span class="plan-saving">Выгода ${escapeHtml(valueDiscountPercent)}%</span>`
        : "";
    const bonusHtml = isFirstOffer ? '<span class="plan-saving plan-bonus">+5 фото</span>' : "";
    const popularHtml = !isFirstOffer && isPopular ? '<span class="plan-popular-badge">Популярный</span>' : "";
    const card = document.createElement("button");
    card.type = "button";
    card.setAttribute("role", "radio");
    card.setAttribute("aria-checked", "false");
    card.className = "plan-card";
    if (isFirstOffer) {
      card.classList.add("is-first-offer");
    }
    if (showFirstOffer && code === "mini") {
      card.classList.add("is-secondary-start");
    }
    if (isPopular) {
      card.classList.add("is-popular");
    }
    card.dataset.code = code;
    card.innerHTML = `
      ${popularHtml}
      <span class="plan-radio" aria-hidden="true"></span>
      <span class="plan-main">
        <span class="plan-name-row">
          <span class="plan-name">${escapeHtml(displayTitle)}</span>
          ${discountHtml}
          ${bonusHtml}
        </span>
        <span class="plan-result">${escapeHtml(topupResultLabel(item))}</span>
      </span>
      <span class="plan-price">
        <strong>${escapeHtml(item.price_rub)} ₽</strong>
        <span>разово</span>
      </span>
    `;
    card.addEventListener("click", () => {
      selectTopup(code);
      trackProductEvent("package_selected", {
        package_code: code,
        credits,
        price_rub: Number(item.price_rub || 0),
      });
      if (code !== FIRST_PHOTOSET_TOPUP_CODE) {
        setPlansNote("Безопасная оплата через ЮKassa");
      }
    });
    plansGrid.appendChild(card);
  }
  const currentIsVisible = topups.some((item) => String(item.code || "").trim() === state.selectedTopupCode);
  const defaultCode = showFirstOffer
    ? FIRST_PHOTOSET_TOPUP_CODE
    : topups.find((item) => item.is_popular)?.code || topups[0].code;
  selectTopup(currentIsVisible ? state.selectedTopupCode : defaultCode, { updateNote: false });
  if (showFirstOffer && (!currentIsVisible || state.selectedTopupCode === FIRST_PHOTOSET_TOPUP_CODE)) {
    setPlansNote("Первый фотосет: 27 фото за цену базового пакета.");
  } else if (!showFirstOffer) {
    setPlansNote("Безопасная оплата через ЮKassa");
  }
}

async function selectTemplate(item) {
  const resolvedItem = await ensureTemplatePrompt(item);
  trackProductEvent("template_selected", {
    template_id: resolvedItem.id,
    category: resolvedItem.category,
  });
  state.referencePromptExpanded = false;
  if (referenceImageFile()) {
    clearReferenceImage({ preserveNote: true });
    clearReferencePromptUndoState();
    setReferencePromptNote("Фото-референс убрано: выбран шаблон.");
  }
  state.selectedTemplateId = resolvedItem.id;
  state.selectedTemplate = {
    id: resolvedItem.id,
    title: resolvedItem.title,
    category: resolvedItem.category,
    prompt: resolvedItem.prompt,
    preview_image_url: resolvedItem.preview_image_url,
    full_image_url: resolvedItem.full_image_url,
    usage_count: templateUsageCount(resolvedItem),
    likes_count: templateLikesCount(resolvedItem),
    liked_by_me: templateLikedByMe(resolvedItem),
  };
  promptInput.value = resolvedItem.prompt || "";
  setPromptSource("template", resolvedItem.prompt || "");
  renderSelectedTemplateCard();
  switchScreen("studio");
  promptInput.focus();
}

function normalizeTemplateCategory(raw) {
  return String(raw || "").trim() || "Разное";
}

function normalizeTemplateCount(raw) {
  const value = Number(raw || 0);
  if (!Number.isFinite(value) || value < 0) {
    return 0;
  }
  return Math.floor(value);
}

function isFavoritesTemplateFilter(filterId) {
  return String(filterId || "").trim() === "favorites";
}

function isNewestTemplateFilter(filterId) {
  return String(filterId || "").trim() === TEMPLATE_FILTER_NEW;
}

function isShowcaseTemplateFilter(filterId) {
  return String(filterId || "").trim() === TEMPLATE_FILTER_SHOWCASE;
}

function templateCountLabel(count) {
  const normalized = Math.max(0, Math.floor(Number(count || 0)));
  const mod10 = normalized % 10;
  const mod100 = normalized % 100;
  let word = "шаблонов";
  if (mod10 === 1 && mod100 !== 11) {
    word = "шаблон";
  } else if (mod10 >= 2 && mod10 <= 4 && (mod100 < 12 || mod100 > 14)) {
    word = "шаблона";
  }
  return `${normalized} ${word}`;
}

function templateLikesCount(item) {
  return normalizeTemplateCount(item && item.likes_count);
}

function templateUsageCount(item) {
  return normalizeTemplateCount(item && item.usage_count);
}

function templateLikedByMe(item) {
  return Boolean(item && item.liked_by_me);
}

function templateFilterCount(filterId) {
  if (isNewestTemplateFilter(filterId)) {
    return state.templates.length;
  }
  if (isFavoritesTemplateFilter(filterId)) {
    return state.templates.filter((item) => templateLikedByMe(item)).length;
  }
  if (filterId === "all") {
    return state.templates.length;
  }
  return state.templates.filter((item) => normalizeTemplateCategory(item.category) === filterId).length;
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
  if (isShowcaseTemplateFilter(filterId)) {
    return "Лента шаблонов";
  }
  if (isNewestTemplateFilter(filterId)) {
    return "Новое";
  }
  if (filterId === "all") {
    return "Все темы";
  }
  if (isFavoritesTemplateFilter(filterId)) {
    return "Избранное";
  }
  return filterId;
}

function isPrimaryTemplateFilter(filterId) {
  return isNewestTemplateFilter(filterId) || filterId === "all" || isFavoritesTemplateFilter(filterId);
}

function templateFilterDisplayLabel(filterId, compact = false) {
  if (compact && filterId === "all") {
    return "Все";
  }
  return templateFilterLabel(filterId);
}

function createTemplateFilterButton(filterId, { compact = false } = {}) {
  const button = document.createElement("button");
  button.type = "button";
  button.className = "template-filter-chip";
  if (compact) {
    button.classList.add("is-quick");
  }
  if (isNewestTemplateFilter(filterId)) {
    button.classList.add("is-promoted");
  }
  button.innerHTML = isNewestTemplateFilter(filterId)
    ? `<span>${escapeHtml(templateFilterDisplayLabel(filterId, compact))}</span>`
    : `
      <span>${escapeHtml(templateFilterDisplayLabel(filterId, compact))}</span>
      <span class="template-filter-count">${templateFilterCount(filterId)}</span>
    `;
  button.setAttribute("role", "tab");
  const isActive = state.selectedTemplateFilter === filterId;
  button.classList.toggle("is-active", isActive);
  button.setAttribute("aria-selected", isActive ? "true" : "false");
  button.addEventListener("click", () => {
    state.selectedTemplateFilter = filterId;
    resetTemplateFeedPagination();
    renderTemplateFilters();
    renderTemplateCards();
  });
  return button;
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

function updateTemplateInState(templateId, patch) {
  const normalizedId = String(templateId || "").trim();
  if (!normalizedId) {
    return null;
  }
  let updatedItem = null;
  state.templates = state.templates.map((item) => {
    if (item.id !== normalizedId) {
      return item;
    }
    updatedItem = { ...item, ...patch };
    return updatedItem;
  });
  if (state.selectedTemplate && state.selectedTemplate.id === normalizedId) {
    state.selectedTemplate = { ...state.selectedTemplate, ...patch };
    renderSelectedTemplateCard();
  }
  if (state.activeTemplateModalItem && state.activeTemplateModalItem.id === normalizedId) {
    state.activeTemplateModalItem = { ...state.activeTemplateModalItem, ...patch };
  }
  return updatedItem;
}

function templateHasPrompt(item) {
  return Boolean(String((item && item.prompt) || "").trim());
}

function normalizeTemplateDetail(raw) {
  const item = raw && typeof raw === "object" ? raw : {};
  return {
    id: String(item.id || "").trim(),
    title: String(item.title || "").trim() || "Шаблон",
    category: normalizeTemplateCategory(item.category),
    prompt: String(item.prompt || "").trim(),
    sort_index: Number(item.sort_index || 0),
    created_at: String(item.created_at || "").trim(),
    preview_image_url: String(item.preview_image_url || "").trim(),
    full_image_url: String(item.full_image_url || "").trim(),
    preview_width: Number(item.preview_width || 0),
    preview_height: Number(item.preview_height || 0),
    description: String(item.description || "").trim(),
    search_keywords: flattenTemplateSearchField(item.search_keywords || item.keywords).trim(),
    tags: Array.isArray(item.tags) ? item.tags.map((tag) => String(tag || "").trim()).filter(Boolean) : [],
    usage_count: normalizeTemplateCount(item.usage_count),
    likes_count: normalizeTemplateCount(item.likes_count),
    liked_by_me: Boolean(item.liked_by_me),
  };
}

function mergeTemplateDetail(raw) {
  const detail = normalizeTemplateDetail(raw);
  if (!detail.id) {
    return null;
  }
  const patch = {
    title: detail.title,
    category: detail.category,
    prompt: detail.prompt,
    sort_index: detail.sort_index,
    created_at: detail.created_at,
    preview_image_url: detail.preview_image_url,
    full_image_url: detail.full_image_url,
    preview_width: detail.preview_width,
    preview_height: detail.preview_height,
    description: detail.description,
    search_keywords: detail.search_keywords,
    tags: detail.tags,
    usage_count: detail.usage_count,
    likes_count: detail.likes_count,
    liked_by_me: detail.liked_by_me,
  };
  const updated = updateTemplateInState(detail.id, patch);
  return updated || {
    ...detail,
    preview_ratio: templatePreviewRatio(detail),
    created_at_ts: Date.parse(detail.created_at || "") || 0,
  };
}

function preloadTemplateImage(url) {
  const normalizedUrl = String(url || "").trim();
  if (!normalizedUrl) {
    return Promise.resolve(false);
  }
  if (isTemplateVideoUrl(normalizedUrl)) {
    return Promise.resolve(false);
  }
  if (templatePreloadedImageUrls.has(normalizedUrl)) {
    return Promise.resolve(true);
  }
  if (templateImagePreloadPromises.has(normalizedUrl)) {
    return templateImagePreloadPromises.get(normalizedUrl);
  }
  const promise = new Promise((resolve) => {
    const image = new Image();
    image.decoding = "async";
    image.onload = () => {
      templatePreloadedImageUrls.add(normalizedUrl);
      resolve(true);
    };
    image.onerror = () => {
      resolve(false);
    };
    image.src = normalizedUrl;
  }).finally(() => {
    templateImagePreloadPromises.delete(normalizedUrl);
  });
  templateImagePreloadPromises.set(normalizedUrl, promise);
  return promise;
}

function preloadTemplateDetail(templateId) {
  const normalizedId = String(templateId || "").trim();
  if (!normalizedId) {
    return Promise.resolve(null);
  }
  const cached = state.templates.find((template) => template.id === normalizedId && templateHasPrompt(template));
  if (cached) {
    return Promise.resolve(cached);
  }
  if (templateDetailPromises.has(normalizedId)) {
    return templateDetailPromises.get(normalizedId);
  }
  const promise = loadTemplateDetail(normalizedId)
    .catch(() => null)
    .finally(() => {
      templateDetailPromises.delete(normalizedId);
    });
  templateDetailPromises.set(normalizedId, promise);
  return promise;
}

async function loadTemplateDetail(templateId) {
  const normalizedId = String(templateId || "").trim();
  if (!normalizedId) {
    throw new Error("Шаблон не найден.");
  }
  const payload = await apiFetch(`/v1/templates/${encodeURIComponent(normalizedId)}`, {
    auth: Boolean(state.accessToken),
  });
  const item = mergeTemplateDetail(payload);
  if (!item || !templateHasPrompt(item)) {
    throw new Error("Промпт шаблона не найден.");
  }
  return item;
}

async function ensureTemplatePrompt(item) {
  const normalizedId = String((item && item.id) || "").trim();
  if (!normalizedId) {
    throw new Error("Шаблон не найден.");
  }
  const currentItem =
    (templateHasPrompt(item) && item) ||
    state.templates.find((template) => template.id === normalizedId && templateHasPrompt(template)) ||
    null;
  if (currentItem) {
    return currentItem;
  }
  if (templateDetailPromises.has(normalizedId)) {
    const pendingItem = await templateDetailPromises.get(normalizedId);
    if (pendingItem && templateHasPrompt(pendingItem)) {
      return pendingItem;
    }
  }
  return loadTemplateDetail(normalizedId);
}

function renderTemplateModalStats(item) {
  if (!templateLikeButton || !templateLikeCount || !templateUsageStat || !templateUsageCountValue) {
    return;
  }
  const liked = templateLikedByMe(item);
  templateLikeButton.classList.toggle("is-liked", liked);
  templateLikeButton.setAttribute("aria-pressed", liked ? "true" : "false");
  templateLikeButton.setAttribute("aria-label", liked ? "Убрать лайк у шаблона" : "Лайкнуть шаблон");
  templateLikeCount.textContent = String(templateLikesCount(item));
  templateUsageCountValue.textContent = String(templateUsageCount(item));
  templateUsageStat.setAttribute("aria-label", `Использований: ${templateUsageCount(item)}`);
}

function setTemplateModalNote(message, isError = false) {
  if (!templateModalNote) {
    return;
  }
  templateModalNote.textContent = message;
  templateModalNote.style.color = isError ? "#ff8f8f" : "#8f98b0";
}

function setTemplatePromptExpanded(expanded) {
  if (!templateModalPromptScroll || !templatePromptToggle) {
    return;
  }
  templatePromptExpanded = Boolean(expanded);
  templateModalPromptScroll.classList.toggle("is-collapsed", !templatePromptExpanded);
  templateModalPromptScroll.classList.toggle("is-expanded", templatePromptExpanded);
  templatePromptToggle.setAttribute("aria-expanded", templatePromptExpanded ? "true" : "false");
  const label = templatePromptToggle.querySelector("span");
  if (label) {
    label.textContent = templatePromptExpanded ? "Свернуть промпт" : "Развернуть промпт";
  }
}

function syncTemplatePromptToggle(forceCollapse = false) {
  if (!templateModalPromptScroll || !templatePromptToggle || !templateModalPrompt) {
    return;
  }

  const collapsedLimit = isMobileBrowser() ? 124 : 168;
  const canExpand = templateModalPromptScroll.scrollHeight > collapsedLimit + 12;
  templatePromptToggle.classList.toggle("is-hidden", !canExpand);

  if (!canExpand) {
    setTemplatePromptExpanded(true);
    templateModalPromptScroll.scrollTop = 0;
    return;
  }

  if (forceCollapse) {
    setTemplatePromptExpanded(false);
    templateModalPromptScroll.scrollTop = 0;
    return;
  }

  setTemplatePromptExpanded(templatePromptExpanded);
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
  if (templateModalPromptScroll) {
    templateModalPromptScroll.scrollTop = 0;
  }
  templateModalImageLoadToken += 1;
  if (templateModalMediaSlot) {
    const video = templateModalMediaSlot.querySelector("video");
    if (video) {
      video.pause();
    }
    templateModalMediaSlot.innerHTML = "";
  }
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
  unlockTemplateModalScroll();
  setTemplateModalNote("");
}

function openTemplateModal(item, initialPreviewUrl = "") {
  const itemId = String(item?.id || "").trim();
  const cachedItem = state.templates.find((template) => template.id === itemId);
  const modalItem = {
    ...(item || {}),
    ...(cachedItem || {}),
    prompt: String((cachedItem && cachedItem.prompt) || (item && item.prompt) || "").trim(),
  };
  state.activeTemplateModalId = modalItem.id;
  state.activeTemplateModalItem = { ...modalItem };
  trackProductEvent("template_viewed", {
    template_id: modalItem.id,
    category: modalItem.category,
  });
  if (!templateModal) {
    return;
  }
  const previewUrl = String(initialPreviewUrl || "").trim() || templatePreviewUrl(modalItem) || "https://picsum.photos/seed/kartivio-template/720/960";
  const fullUrl = templateFullUrl(modalItem) || previewUrl;
  templateModalImageLoadToken += 1;
  const displayUrl =
    fullUrl !== previewUrl && templatePreloadedImageUrls.has(fullUrl) ? fullUrl : previewUrl;
  if (templateModalMediaSlot) {
    templateModalMediaSlot.classList.remove("is-loading");
    templateModalMediaSlot.innerHTML = renderTemplateMediaMarkup(displayUrl, modalItem.title || "Шаблон", {
      className: "template-modal-image",
      loading: "eager",
      priority: true,
      autoplay: isTemplateVideoUrl(displayUrl),
      controls: isTemplateVideoUrl(displayUrl),
    });
  }
  if (fullUrl && fullUrl !== displayUrl && !isTemplateVideoUrl(fullUrl)) {
    preloadTemplateImage(fullUrl);
  }
  templateModalTitle.textContent = modalItem.title || "Шаблон";
  templateModalCategory.textContent = normalizeTemplateCategory(modalItem.category);
  renderTemplateModalStats(modalItem);
  const hasCachedPrompt = templateHasPrompt(modalItem);
  templateModalPrompt.textContent = hasCachedPrompt ? modalItem.prompt : "Загружаю промпт...";
  templateModalPromptScroll?.classList.toggle("is-loading", !hasCachedPrompt);
  setTemplatePromptExpanded(false);
  setTemplateModalNote("");
  if (templateModalCloseTimer) {
    window.clearTimeout(templateModalCloseTimer);
    templateModalCloseTimer = null;
  }
  templateModal.classList.remove("is-hidden");
  window.requestAnimationFrame(() => {
    if (templateModal) {
      templateModal.classList.add("is-visible");
      refreshIcons();
      window.requestAnimationFrame(() => {
        syncTemplatePromptToggle(true);
      });
    }
  });
  lockTemplateModalScroll();
  if (!hasCachedPrompt) {
    preloadTemplateDetail(modalItem.id)
      .then((resolvedItem) => {
        if (!resolvedItem || !state.activeTemplateModalId || state.activeTemplateModalId !== resolvedItem.id) {
          if (state.activeTemplateModalId === modalItem.id) {
            setTemplateModalNote("Не удалось загрузить промпт шаблона.", true);
          }
          return;
        }
        state.activeTemplateModalItem = { ...resolvedItem };
        templateModalPrompt.textContent = resolvedItem.prompt || "";
        templateModalPromptScroll?.classList.remove("is-loading");
        renderTemplateModalStats(resolvedItem);
        window.requestAnimationFrame(() => syncTemplatePromptToggle(true));
      })
      .catch((error) => {
        if (state.activeTemplateModalId === modalItem.id) {
          templateModalPrompt.textContent = "";
          templateModalPromptScroll?.classList.remove("is-loading");
          setTemplateModalNote(userFacingErrorMessage(error, "Не удалось загрузить промпт шаблона."), true);
          window.requestAnimationFrame(() => syncTemplatePromptToggle(true));
        }
      });
  } else {
    templateModalPromptScroll?.classList.remove("is-loading");
  }
}

function updateTemplateFilterScroller() {
  if (!templateFilterShell || !templateFilterChips || !templateFilterPrev || !templateFilterNext) {
    return;
  }
  const maxScrollLeft = Math.max(0, templateFilterChips.scrollWidth - templateFilterChips.clientWidth);
  const scrollLeft = templateFilterChips.scrollLeft;
  const hasOverflow = maxScrollLeft > 8;
  const atStart = scrollLeft <= 6;
  const atEnd = scrollLeft >= maxScrollLeft - 6;

  templateFilterShell.classList.toggle("has-overflow", hasOverflow);
  templateFilterPrev.disabled = !hasOverflow || atStart;
  templateFilterNext.disabled = !hasOverflow || atEnd;
}

function scrollTemplateFilters(direction) {
  if (!templateFilterChips) {
    return;
  }
  const delta = Math.max(templateFilterChips.clientWidth * 0.72, 180) * direction;
  templateFilterChips.scrollBy({
    left: delta,
    behavior: "smooth",
  });
}

function bindTemplateFilterScroller() {
  if (
    templateFilterScrollerBound ||
    !templateFilterShell ||
    !templateFilterChips ||
    !templateFilterPrev ||
    !templateFilterNext
  ) {
    return;
  }
  templateFilterScrollerBound = true;
  templateFilterPrev.addEventListener("click", () => scrollTemplateFilters(-1));
  templateFilterNext.addEventListener("click", () => scrollTemplateFilters(1));
  templateFilterChips.addEventListener("scroll", updateTemplateFilterScroller, { passive: true });
  templateFilterChips.addEventListener(
    "wheel",
    (event) => {
      const maxScrollLeft = Math.max(0, templateFilterChips.scrollWidth - templateFilterChips.clientWidth);
      if (maxScrollLeft <= 0) {
        return;
      }
      const horizontalIntent = Math.abs(event.deltaX) > Math.abs(event.deltaY);
      if (horizontalIntent) {
        return;
      }
      event.preventDefault();
      templateFilterChips.scrollLeft += event.deltaY;
      updateTemplateFilterScroller();
    },
    { passive: false }
  );
  window.addEventListener("resize", updateTemplateFilterScroller, { passive: true });
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
  const priority = TEMPLATE_FILTER_PRIORITY.filter((category) => seen.has(category));
  const prioritySet = new Set(priority);
  const rest = categories.filter((category) => !prioritySet.has(category));
  return [TEMPLATE_FILTER_NEW, "all", "favorites", ...priority, ...rest];
}

function orderedTemplateCategories(categories) {
  const categoryList = Array.isArray(categories) ? categories.filter(Boolean) : [];
  const seen = new Set(categoryList);
  const priority = TEMPLATE_SECTION_CATEGORY_PRIORITY.filter((category) => seen.has(category));
  const prioritySet = new Set(priority);
  return [...priority, ...categoryList.filter((category) => !prioritySet.has(category))];
}

function templateShowcaseSections() {
  const sortedTemplates = [...state.templates].sort(compareTemplatesByFreshness);
  const sections = [];
  if (sortedTemplates.length) {
    sections.push({
      filterId: TEMPLATE_FILTER_NEW,
      title: templateFilterLabel(TEMPLATE_FILTER_NEW),
      items: sortedTemplates,
      isFeatured: true,
    });
  }

  const favoriteItems = sortedTemplates.filter((item) => templateLikedByMe(item));
  if (favoriteItems.length) {
    sections.push({
      filterId: "favorites",
      title: templateFilterLabel("favorites"),
      items: favoriteItems,
    });
  }

  const groupedByCategory = new Map();
  for (const item of sortedTemplates) {
    const category = normalizeTemplateCategory(item.category);
    if (!groupedByCategory.has(category)) {
      groupedByCategory.set(category, []);
    }
    groupedByCategory.get(category).push(item);
  }

  for (const category of orderedTemplateCategories([...groupedByCategory.keys()])) {
    const items = groupedByCategory.get(category) || [];
    if (!items.length) {
      continue;
    }
    sections.push({
      filterId: category,
      title: category,
      items,
    });
  }

  return sections;
}

function renderTemplateFilters() {
  if (!templateFilterChips && !templateQuickFilters) {
    return;
  }
  bindTemplateFilterScroller();
  const filters = templateFilters();
  if (!filters.includes(state.selectedTemplateFilter)) {
    state.selectedTemplateFilter = TEMPLATE_FILTER_NEW;
  }

  const primaryFilters = filters.filter((filterId) => isPrimaryTemplateFilter(filterId));
  const categoryFilters = filters.filter((filterId) => !isPrimaryTemplateFilter(filterId));

  if (templateQuickFilters) {
    templateQuickFilters.innerHTML = "";
    for (const filterId of primaryFilters) {
      templateQuickFilters.appendChild(createTemplateFilterButton(filterId, { compact: true }));
    }
  }

  if (templateFilterChips) {
    templateFilterChips.innerHTML = "";
    const filtersForCategoryRow = templateQuickFilters ? categoryFilters : filters;
    for (const filterId of filtersForCategoryRow) {
      templateFilterChips.appendChild(createTemplateFilterButton(filterId));
    }
  }

  if (templateFilterShell) {
    templateFilterShell.classList.toggle("is-empty", Boolean(templateQuickFilters && categoryFilters.length === 0));
  }
  window.requestAnimationFrame(updateTemplateFilterScroller);
  refreshIcons();
}

function syncSelectedTemplateFilter() {
  if (isShowcaseTemplateFilter(state.selectedTemplateFilter)) {
    return;
  }
  if (!templateFilters().includes(state.selectedTemplateFilter)) {
    state.selectedTemplateFilter = TEMPLATE_FILTER_SHOWCASE;
    resetTemplateFeedPagination();
  }
}

function filteredTemplateItems() {
  const sortedTemplates = [...state.templates].sort(compareTemplatesByFreshness);
  const reverseSortedTemplates = [...sortedTemplates].reverse();
  if (isShowcaseTemplateFilter(state.selectedTemplateFilter)) {
    return sortedTemplates;
  }
  if (isNewestTemplateFilter(state.selectedTemplateFilter)) {
    return sortedTemplates;
  }
  if (state.selectedTemplateFilter === "all") {
    return reverseSortedTemplates;
  }
  if (isFavoritesTemplateFilter(state.selectedTemplateFilter)) {
    return sortedTemplates.filter((item) => templateLikedByMe(item));
  }
  return sortedTemplates.filter((item) => normalizeTemplateCategory(item.category) === state.selectedTemplateFilter);
}

function normalizeTemplateSearchText(value) {
  return String(value || "")
    .toLowerCase()
    .replace(/ё/g, "е")
    .replace(/[^0-9a-zа-я]+/gi, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function normalizedTemplateSearchQuery() {
  return normalizeTemplateSearchText(state.templateSearchQuery);
}

function isTemplateSearchActive() {
  return Boolean(normalizedTemplateSearchQuery());
}

function templateSearchWords(value) {
  return normalizeTemplateSearchText(value).split(" ").filter(Boolean);
}

function templateSearchTermVariants(term) {
  const normalizedTerm = normalizeTemplateSearchText(term);
  if (!normalizedTerm) {
    return [];
  }
  const variants = new Set([normalizedTerm]);
  const synonyms = TEMPLATE_SEARCH_SYNONYMS[normalizedTerm] || [];
  for (const synonym of synonyms) {
    const normalizedSynonym = normalizeTemplateSearchText(synonym);
    if (normalizedSynonym) {
      variants.add(normalizedSynonym);
    }
  }
  return [...variants];
}

function templateSearchGroups(query) {
  return templateSearchWords(query)
    .map((word) => templateSearchTermVariants(word))
    .filter((group) => group.length);
}

function flattenTemplateSearchField(value) {
  if (Array.isArray(value)) {
    return value.map((item) => flattenTemplateSearchField(item)).join(" ");
  }
  if (value && typeof value === "object") {
    return Object.values(value).map((item) => flattenTemplateSearchField(item)).join(" ");
  }
  return String(value || "");
}

function templateSearchFields(item) {
  return {
    title: normalizeTemplateSearchText(item?.title),
    category: normalizeTemplateSearchText(normalizeTemplateCategory(item?.category)),
    keywords: normalizeTemplateSearchText(flattenTemplateSearchField([
      item?.tags,
      item?.search_keywords,
      item?.keywords,
      item?.description,
    ])),
    prompt: normalizeTemplateSearchText(item?.prompt),
    id: normalizeTemplateSearchText(item?.id),
  };
}

function templateSearchFieldMatches(field, variants) {
  return variants.some((variant) => field.includes(variant));
}

function templateSearchScore(item, rawQuery) {
  const query = normalizeTemplateSearchText(rawQuery);
  if (!query) {
    return 0;
  }
  const groups = templateSearchGroups(query);
  if (!groups.length) {
    return 0;
  }

  const fields = templateSearchFields(item);
  const haystack = normalizeTemplateSearchText(Object.values(fields).join(" "));
  if (!groups.every((group) => templateSearchFieldMatches(haystack, group))) {
    return 0;
  }

  let score = 1;
  if (fields.title.includes(query)) {
    score += 260;
  }
  if (fields.category.includes(query)) {
    score += 180;
  }
  if (fields.keywords.includes(query)) {
    score += 130;
  }
  if (fields.prompt.includes(query)) {
    score += 70;
  }

  for (const group of groups) {
    if (templateSearchFieldMatches(fields.title, group)) {
      score += 90;
    } else if (templateSearchFieldMatches(fields.category, group)) {
      score += 68;
    } else if (templateSearchFieldMatches(fields.keywords, group)) {
      score += 48;
    } else if (templateSearchFieldMatches(fields.prompt, group)) {
      score += 28;
    } else if (templateSearchFieldMatches(fields.id, group)) {
      score += 12;
    }
  }

  return score;
}

function searchedTemplateItems() {
  const query = normalizedTemplateSearchQuery();
  if (!query) {
    return [];
  }
  return state.templates
    .map((item) => ({
      item,
      score: templateSearchScore(item, query),
    }))
    .filter((entry) => entry.score > 0)
    .sort((left, right) => {
      if (left.score !== right.score) {
        return right.score - left.score;
      }
      return compareTemplatesByFreshness(left.item, right.item);
    })
    .map((entry) => entry.item);
}

function currentTemplateListItems() {
  return isTemplateSearchActive() ? searchedTemplateItems() : filteredTemplateItems();
}

function compareTemplatesByFreshness(left, right) {
  const leftSortIndex = Number(left?.sort_index || 0);
  const rightSortIndex = Number(right?.sort_index || 0);
  if (leftSortIndex > 0 || rightSortIndex > 0) {
    if (leftSortIndex !== rightSortIndex) {
      return rightSortIndex - leftSortIndex;
    }
  }
  const leftCreatedAt = templateFreshnessTimestamp(left);
  const rightCreatedAt = templateFreshnessTimestamp(right);
  if (leftCreatedAt !== rightCreatedAt) {
    return rightCreatedAt - leftCreatedAt;
  }
  return String(right?.id || "").localeCompare(String(left?.id || ""), "ru");
}

function templateFreshnessTimestamp(item) {
  const createdAtTs = Number(item?.created_at_ts || 0);
  if (createdAtTs > 0) {
    return createdAtTs;
  }
  const match = String(item?.id || "").match(/^(\d{4})(\d{2})(\d{2})(?:[-_]|$)/);
  if (!match) {
    return 0;
  }
  const [, year, month, day] = match;
  const derivedTs = Date.UTC(Number(year), Number(month) - 1, Number(day));
  return Number.isFinite(derivedTs) ? derivedTs : 0;
}

function templateRenderKey(items) {
  const list = Array.isArray(items) ? items : [];
  const firstId = String(list[0]?.id || "");
  const lastId = String(list[list.length - 1]?.id || "");
  return `${state.selectedTemplateFilter}:${normalizedTemplateSearchQuery()}:${list.length}:${firstId}:${lastId}`;
}

function shouldPaginateTemplateFeed(items) {
  return Array.isArray(items) && items.length > TEMPLATE_FEED_INCREMENTAL_THRESHOLD;
}

function resetTemplateFeedPagination() {
  state.templateVisibleCount = 0;
  state.templateRenderKey = "";
  if (templateFeedAutoLoadRaf) {
    window.cancelAnimationFrame(templateFeedAutoLoadRaf);
    templateFeedAutoLoadRaf = 0;
  }
  if (templateFeedPreloadRaf) {
    window.cancelAnimationFrame(templateFeedPreloadRaf);
    templateFeedPreloadRaf = 0;
  }
}

function syncTemplateVisibleCount(items, { reset = false } = {}) {
  const list = Array.isArray(items) ? items : [];
  const key = templateRenderKey(list);
  const paginated = shouldPaginateTemplateFeed(list);
  if (reset || state.templateRenderKey !== key) {
    state.templateRenderKey = key;
    state.templateVisibleCount = paginated ? Math.min(TEMPLATE_FEED_INITIAL_BATCH_SIZE, list.length) : list.length;
    return;
  }
  if (!paginated) {
    state.templateVisibleCount = list.length;
    return;
  }
  if (!state.templateVisibleCount) {
    state.templateVisibleCount = Math.min(TEMPLATE_FEED_INITIAL_BATCH_SIZE, list.length);
    return;
  }
  state.templateVisibleCount = Math.min(Math.max(state.templateVisibleCount, TEMPLATE_FEED_INITIAL_BATCH_SIZE), list.length);
}

function visibleTemplateItems(items) {
  const list = Array.isArray(items) ? items : [];
  syncTemplateVisibleCount(list);
  if (!shouldPaginateTemplateFeed(list)) {
    return list;
  }
  return list.slice(0, Math.min(state.templateVisibleCount, list.length));
}

function renderTemplateFeedPagination({ shownCount = 0, totalCount = 0 } = {}) {
  if (!templateFeedPagination || !templateFeedMoreButton || !templateFeedMoreNote) {
    return;
  }
  const normalizedShown = Math.max(0, Number(shownCount || 0));
  const normalizedTotal = Math.max(0, Number(totalCount || 0));
  const hasMore = normalizedShown < normalizedTotal;
  const shouldShow = normalizedTotal > TEMPLATE_FEED_INCREMENTAL_THRESHOLD;
  templateFeedPagination.classList.toggle("is-hidden", !shouldShow);
  if (!shouldShow) {
    templateFeedMoreButton.disabled = true;
    templateFeedMoreNote.textContent = "";
    return;
  }
  templateFeedMoreButton.disabled = !hasMore;
  templateFeedMoreNote.textContent = hasMore
    ? `Показано ${normalizedShown} из ${normalizedTotal} шаблонов.`
    : `Показаны все ${normalizedTotal} шаблонов.`;
}

function revealMoreTemplateItems() {
  if (!isTemplateSearchActive() && isShowcaseTemplateFilter(state.selectedTemplateFilter)) {
    return false;
  }
  const items = currentTemplateListItems();
  if (!shouldPaginateTemplateFeed(items)) {
    return false;
  }
  const nextVisibleCount = Math.min(items.length, Math.max(state.templateVisibleCount, 0) + TEMPLATE_FEED_BATCH_SIZE);
  if (nextVisibleCount <= state.templateVisibleCount) {
    return false;
  }
  state.templateVisibleCount = nextVisibleCount;
  renderTemplateCards();
  return true;
}

function uniqueTemplatesById(items) {
  const seen = new Set();
  const result = [];
  for (const item of Array.isArray(items) ? items : []) {
    const id = String((item && item.id) || "").trim();
    if (!id || seen.has(id)) {
      continue;
    }
    seen.add(id);
    result.push(item);
  }
  return result;
}

function scheduleTemplateFeedPreload(items, visibleItems) {
  if (templateFeedPreloadRaf || state.currentScreen !== "feed" || state.templatesLoading) {
    return;
  }
  const allItems = Array.isArray(items) ? items : [];
  const renderedItems = Array.isArray(visibleItems) ? visibleItems : [];
  templateFeedPreloadRaf = window.requestAnimationFrame(() => {
    templateFeedPreloadRaf = 0;
    const runPreload = () => {
      const visibleCount = renderedItems.length;
      const imageCandidates = allItems.slice(
        visibleCount,
        Math.min(allItems.length, visibleCount + TEMPLATE_FEED_PRELOAD_IMAGE_COUNT)
      );
      for (const item of imageCandidates) {
        preloadTemplateImage(templatePreviewUrl(item));
      }

      const promptCandidates = uniqueTemplatesById([
        ...renderedItems.slice(0, 6),
        ...renderedItems.slice(Math.max(0, renderedItems.length - TEMPLATE_FEED_PRELOAD_PROMPT_COUNT)),
      ]);
      for (const item of promptCandidates) {
        preloadTemplateDetail(item.id);
      }
    };
    window.setTimeout(runPreload, 40);
  });
}

function getPrimaryScrollMetrics() {
  if (!isTelegramMiniAppRuntime() && isMobileBrowser()) {
    const root = document.documentElement;
    const body = document.body;
    return {
      scrollTop: Number(window.scrollY || window.pageYOffset || root.scrollTop || body.scrollTop || 0),
      clientHeight: Number(window.innerHeight || root.clientHeight || body.clientHeight || 0),
      scrollHeight: Number(Math.max(root.scrollHeight || 0, body.scrollHeight || 0)),
    };
  }
  return {
    scrollTop: Number(appMain?.scrollTop || 0),
    clientHeight: Number(appMain?.clientHeight || window.innerHeight || 0),
    scrollHeight: Number(appMain?.scrollHeight || document.documentElement.scrollHeight || 0),
  };
}

function maybeAutoLoadMoreTemplates() {
  if (templateFeedAutoLoadRaf) {
    return;
  }
  templateFeedAutoLoadRaf = window.requestAnimationFrame(() => {
    templateFeedAutoLoadRaf = 0;
    if (
      state.currentScreen !== "feed" ||
      state.templatesLoading ||
      (!isTemplateSearchActive() && isShowcaseTemplateFilter(state.selectedTemplateFilter))
    ) {
      return;
    }
    const items = currentTemplateListItems();
    if (!shouldPaginateTemplateFeed(items) || state.templateVisibleCount >= items.length) {
      return;
    }
    const metrics = getPrimaryScrollMetrics();
    const distanceToBottom = metrics.scrollHeight - (metrics.scrollTop + metrics.clientHeight);
    if (distanceToBottom > TEMPLATE_FEED_PRELOAD_DISTANCE_PX) {
      return;
    }
    if (revealMoreTemplateItems()) {
      window.requestAnimationFrame(() => maybeAutoLoadMoreTemplates());
    }
  });
}

function handleTemplateGridLayoutChange() {
  const nextColumnCount = templateGridColumnCount();
  if (nextColumnCount === lastTemplateGridColumnCount) {
    return;
  }
  if (state.currentScreen !== "feed") {
    lastTemplateGridColumnCount = nextColumnCount;
    return;
  }
  renderTemplateCards();
}

function renderTemplateSkeleton(count = 6) {
  const total = Math.min(Math.max(Number(count || 0), 6), 18);
  templatesGrid.innerHTML = "";
  const cards = [];
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
    cards.push(card);
  }
  renderTemplateGridCards(cards);
}

function scrollTemplateFeedTop() {
  if (!isTelegramMiniAppRuntime() && isMobileBrowser()) {
    window.scrollTo({ top: 0, behavior: "smooth" });
    return;
  }
  if (appMain && typeof appMain.scrollTo === "function") {
    appMain.scrollTo({ top: 0, behavior: "smooth" });
  }
}

function showTemplateCollection(filterId, { scroll = true } = {}) {
  const normalizedFilter = String(filterId || "").trim();
  if (!normalizedFilter || isShowcaseTemplateFilter(normalizedFilter)) {
    return;
  }
  state.selectedTemplateFilter = normalizedFilter;
  resetTemplateFeedPagination();
  renderTemplateCards();
  if (scroll) {
    scrollTemplateFeedTop();
  }
}

function showTemplateShowcase({ scroll = true } = {}) {
  state.selectedTemplateFilter = TEMPLATE_FILTER_SHOWCASE;
  resetTemplateFeedPagination();
  renderTemplateCards();
  if (scroll) {
    scrollTemplateFeedTop();
  }
}

function setTemplateSearchQuery(value, { scroll = false } = {}) {
  const nextQuery = String(value || "");
  if (state.templateSearchQuery === nextQuery) {
    renderTemplateSearchControls();
    return;
  }
  state.templateSearchQuery = nextQuery;
  resetTemplateFeedPagination();
  renderTemplateCards();
  if (scroll) {
    scrollTemplateFeedTop();
  }
}

function clearTemplateSearch() {
  setTemplateSearchQuery("", { scroll: true });
  if (templateSearchInput) {
    templateSearchInput.value = "";
    templateSearchInput.focus();
  }
}

function createTemplateCard(item, { itemIndex = 0, totalItems = 0, layout = "grid", eager = false, priority = false } = {}) {
  const card = document.createElement("article");
  const imageUrl = templatePreviewUrl(item);
  const ratio = Number(item.preview_ratio || templatePreviewRatio(item) || 1);
  const isRailLayout = layout === "rail";
  card.className = isRailLayout ? "tool-card template-rail-card" : "tool-card";
  card.setAttribute("role", "button");
  card.setAttribute("tabindex", "0");
  const newestBatchStart = Math.max(0, Number(totalItems || 0) - TEMPLATE_FEED_BATCH_SIZE);
  const shouldEagerLoadImage =
    Boolean(eager) || (!isRailLayout && (itemIndex < 6 || itemIndex >= newestBatchStart));
  const imageLoading = shouldEagerLoadImage ? "eager" : "lazy";
  const displayRatio = isRailLayout ? "4 / 5" : Number.isFinite(ratio) && ratio > 0 ? String(ratio) : "1";
  card.style.setProperty("--template-ratio", displayRatio);
  const mediaMarkup = renderTemplateMediaMarkup(imageUrl, item.title, {
    className: "tool-media-image",
    loading: imageLoading,
    priority: Boolean(priority && shouldEagerLoadImage),
    autoplay: isTemplateVideoUrl(imageUrl) && shouldEagerLoadImage,
  });
  card.innerHTML = `
    <div class="tool-media">
      ${mediaMarkup}
    </div>
    <div class="tool-card-top-actions">
      <button class="template-like-btn tool-like-btn${templateLikedByMe(item) ? " is-liked" : ""}" data-action="toggle-like" type="button" aria-label="${templateLikedByMe(item) ? "Убрать лайк у шаблона" : "Лайкнуть шаблон"}" aria-pressed="${templateLikedByMe(item) ? "true" : "false"}">
        <i data-lucide="heart"></i>
        <span>${templateLikesCount(item)}</span>
      </button>
    </div>
    <div class="tool-overlay">
      <strong>${escapeHtml(item.title)}</strong>
      <p>${escapeHtml(normalizeTemplateCategory(item.category))}</p>
      <div class="template-card-stats">
        <span class="template-usage-stat">
          <i data-lucide="sparkles"></i>
          <span>${templateUsageCount(item)}</span>
        </span>
      </div>
    </div>
  `;
  const likeButton = card.querySelector('[data-action="toggle-like"]');
  const warmTemplateAssets = () => {
    preloadTemplateDetail(item.id);
    preloadTemplateImage(templatePreviewUrl(item));
    const fullUrl = templateFullUrl(item);
    if (fullUrl && fullUrl !== templatePreviewUrl(item) && !isTemplateVideoUrl(fullUrl)) {
      preloadTemplateImage(fullUrl);
    }
  };
  likeButton.addEventListener("click", async (event) => {
    event.preventDefault();
    event.stopPropagation();
    const wasLiked = templateLikedByMe(item);
    likeButton.disabled = true;
    try {
      await toggleTemplateLike(item.id, !wasLiked);
    } catch (error) {
      setNote(userFacingErrorMessage(error, "Не удалось обновить лайк шаблона."), true);
    } finally {
      likeButton.disabled = false;
    }
  });
  card.addEventListener("click", () => {
    warmTemplateAssets();
    const initialPreviewUrl = templateCardCurrentMediaUrl(card, imageUrl);
    openTemplateModal(item, initialPreviewUrl);
  });
  if (!isTelegramMiniAppRuntime()) {
    card.addEventListener("pointerenter", warmTemplateAssets, { passive: true });
  }
  card.addEventListener("pointerdown", warmTemplateAssets, { passive: true });
  card.addEventListener("focus", warmTemplateAssets);
  card.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      warmTemplateAssets();
      const initialPreviewUrl = templateCardCurrentMediaUrl(card, imageUrl);
      openTemplateModal(item, initialPreviewUrl);
    }
  });
  return card;
}

function createTemplateCollectionHeader(filterId, totalCount) {
  const header = document.createElement("div");
  header.className = "template-collection-header";
  header.innerHTML = `
    <button class="template-back-btn" type="button" aria-label="Вернуться к категориям">
      <i data-lucide="chevron-left"></i>
      <span>Назад</span>
    </button>
    <div class="template-collection-title">
      <span>${escapeHtml(isNewestTemplateFilter(filterId) ? "Свежие шаблоны" : "Категория")}</span>
      <h3>${escapeHtml(templateFilterLabel(filterId))} <small>${escapeHtml(templateCountLabel(totalCount))}</small></h3>
    </div>
  `;
  header.querySelector(".template-back-btn")?.addEventListener("click", () => showTemplateShowcase());
  return header;
}

function renderTemplateEmptyState({ title = "Нет шаблонов", text = "Попробуй другой раздел" } = {}) {
  templatesGrid.className = "template-feed-stage";
  templatesGrid.innerHTML = `
    <article class="template-empty-state">
      <strong>${escapeHtml(title)}</strong>
      <p>${escapeHtml(text)}</p>
    </article>
  `;
  renderTemplateFeedPagination({ shownCount: 0, totalCount: 0 });
}

function renderTemplateSearchControls() {
  const active = isTemplateSearchActive();
  if (templateSearchInput && templateSearchInput.value !== state.templateSearchQuery) {
    templateSearchInput.value = state.templateSearchQuery;
  }
  const searchShell = templateSearchInput?.closest(".template-search");
  searchShell?.classList.toggle("is-active", active);
  templateSearchClear?.classList.toggle("is-hidden", !active);
}

function createTemplateSearchHeader(totalCount) {
  const header = document.createElement("div");
  header.className = "template-search-results-header";
  header.innerHTML = `
    <div class="template-search-results-title">
      <span>Поиск</span>
      <h3>Результаты <small>${escapeHtml(templateCountLabel(totalCount))}</small></h3>
    </div>
    <button class="template-search-reset" type="button">
      <i data-lucide="x"></i>
      <span>Очистить</span>
    </button>
  `;
  header.querySelector(".template-search-reset")?.addEventListener("click", clearTemplateSearch);
  return header;
}

function renderTemplateSearchResults() {
  const items = searchedTemplateItems();
  const visibleItems = visibleTemplateItems(items);
  const header = createTemplateSearchHeader(items.length);

  if (!items.length) {
    templatesGrid.className = "template-collection template-search-results";
    templatesGrid.innerHTML = "";
    templatesGrid.appendChild(header);
    const emptyState = document.createElement("article");
    emptyState.className = "template-empty-state";
    emptyState.innerHTML = `
      <strong>Ничего не нашлось</strong>
      <p>Попробуй: день рождения, семья, портрет, очки, цветы.</p>
    `;
    templatesGrid.appendChild(emptyState);
    renderTemplateFeedPagination({ shownCount: 0, totalCount: 0 });
    refreshIcons();
    return;
  }

  const cards = visibleItems.map((item, itemIndex) =>
    createTemplateCard(item, {
      itemIndex,
      totalItems: visibleItems.length,
      layout: "grid",
      priority: itemIndex < 4,
    })
  );
  renderTemplateGridCards(cards, { beforeElement: header });
  templatesGrid.classList.add("template-search-results");
  renderTemplateFeedPagination({ shownCount: visibleItems.length, totalCount: items.length });
  refreshIcons();
  scheduleTemplateFeedPreload(items, visibleItems);
  maybeAutoLoadMoreTemplates();
}

function renderTemplateShowcase() {
  templatesGrid.className = "template-showcase";
  templatesGrid.innerHTML = "";
  renderTemplateFeedPagination({ shownCount: 0, totalCount: 0 });

  if (!state.templates.length) {
    renderTemplateEmptyState({ title: "Пока нет шаблонов", text: "Загляни сюда чуть позже." });
    return;
  }

  const sections = templateShowcaseSections();
  const preloadItems = [];
  for (const [sectionIndex, section] of sections.entries()) {
    const sectionElement = document.createElement("section");
    sectionElement.className = `template-showcase-section${section.isFeatured ? " is-featured" : ""}`;
    const previewItems = section.items.slice(0, TEMPLATE_SHOWCASE_SECTION_LIMIT);
    preloadItems.push(...previewItems.slice(0, 3));
    sectionElement.innerHTML = `
      <div class="template-section-header">
        <div class="template-section-title">
          <h3>${escapeHtml(section.title)} <small>${escapeHtml(templateCountLabel(section.items.length))}</small></h3>
        </div>
        <button class="template-section-open" type="button">
          <span>все</span>
          <i data-lucide="arrow-right"></i>
        </button>
      </div>
      <div class="template-section-row"></div>
    `;
    sectionElement.querySelector(".template-section-open")?.addEventListener("click", () => {
      showTemplateCollection(section.filterId);
    });
    const row = sectionElement.querySelector(".template-section-row");
    for (const [itemIndex, item] of previewItems.entries()) {
      const card = createTemplateCard(item, {
        itemIndex,
        totalItems: previewItems.length,
        layout: "rail",
        eager: sectionIndex === 0 && itemIndex < 4,
        priority: sectionIndex === 0 && itemIndex < 3,
      });
      row.appendChild(card);
    }
    templatesGrid.appendChild(sectionElement);
  }
  refreshIcons();
  const uniquePreloadItems = uniqueTemplatesById(preloadItems);
  scheduleTemplateFeedPreload(uniquePreloadItems, uniquePreloadItems.slice(0, 6));
}

function renderTemplateCollection() {
  const items = filteredTemplateItems();
  const visibleItems = visibleTemplateItems(items);
  const header = createTemplateCollectionHeader(state.selectedTemplateFilter, items.length);
  if (!items.length) {
    templatesGrid.className = "template-collection";
    templatesGrid.innerHTML = "";
    templatesGrid.appendChild(header);
    const emptyTitle = isFavoritesTemplateFilter(state.selectedTemplateFilter)
      ? "Пока нет избранных шаблонов"
      : "Нет шаблонов";
    const emptyText = isFavoritesTemplateFilter(state.selectedTemplateFilter)
      ? "Лайкни понравившиеся идеи в ленте."
      : "Попробуй другой раздел.";
    const emptyState = document.createElement("article");
    emptyState.className = "template-empty-state";
    emptyState.innerHTML = `<strong>${escapeHtml(emptyTitle)}</strong><p>${escapeHtml(emptyText)}</p>`;
    templatesGrid.appendChild(emptyState);
    renderTemplateFeedPagination({ shownCount: 0, totalCount: 0 });
    refreshIcons();
    return;
  }

  const cards = visibleItems.map((item, itemIndex) =>
    createTemplateCard(item, {
      itemIndex,
      totalItems: visibleItems.length,
      layout: "grid",
      priority: itemIndex < 4,
    })
  );
  renderTemplateGridCards(cards, { beforeElement: header });
  renderTemplateFeedPagination({ shownCount: visibleItems.length, totalCount: items.length });
  refreshIcons();
  scheduleTemplateFeedPreload(items, visibleItems);
  maybeAutoLoadMoreTemplates();
}

function renderTemplateCards() {
  if (!templatesGrid) {
    return;
  }
  renderTemplateSearchControls();
  if (state.templatesLoading) {
    renderTemplateSkeleton(6);
    renderTemplateFeedPagination({ shownCount: 0, totalCount: 0 });
    return;
  }
  if (isTemplateSearchActive()) {
    renderTemplateSearchResults();
    return;
  }
  syncSelectedTemplateFilter();
  if (isShowcaseTemplateFilter(state.selectedTemplateFilter)) {
    renderTemplateShowcase();
    return;
  }
  renderTemplateCollection();
}

function templateGridColumnCount() {
  return window.matchMedia("(max-width: 390px)").matches ? 1 : 2;
}

function renderTemplateGridCards(cards, { beforeElement = null } = {}) {
  templatesGrid.className = "tools-grid";
  templatesGrid.innerHTML = "";
  if (beforeElement) {
    templatesGrid.appendChild(beforeElement);
  }
  const items = Array.isArray(cards) ? cards : [];
  if (!items.length) {
    lastTemplateGridColumnCount = templateGridColumnCount();
    return;
  }

  const columnCount = templateGridColumnCount();
  lastTemplateGridColumnCount = columnCount;
  const columns = [];
  for (let index = 0; index < columnCount; index += 1) {
    const column = document.createElement("div");
    column.className = "tools-grid-column";
    columns.push(column);
    templatesGrid.appendChild(column);
  }

  items.forEach((card, index) => {
    columns[index % columnCount].appendChild(card);
  });
}

function renderTemplates(payload) {
  const items = Array.isArray(payload && payload.items) ? payload.items : [];
  const cachedPrompts = new Map(
    state.templates
      .filter((item) => item.id && templateHasPrompt(item))
      .map((item) => [item.id, String(item.prompt || "").trim()])
  );
  if (state.selectedTemplate && state.selectedTemplate.id && templateHasPrompt(state.selectedTemplate)) {
    cachedPrompts.set(state.selectedTemplate.id, String(state.selectedTemplate.prompt || "").trim());
  }
  if (state.activeTemplateModalItem && state.activeTemplateModalItem.id && templateHasPrompt(state.activeTemplateModalItem)) {
    cachedPrompts.set(state.activeTemplateModalItem.id, String(state.activeTemplateModalItem.prompt || "").trim());
  }
  const normalized = items.map((item) => ({
    id: String(item.id || "").trim(),
    title: String(item.title || "").trim() || "Шаблон",
    category: normalizeTemplateCategory(item.category),
    prompt: String(item.prompt || "").trim() || cachedPrompts.get(String(item.id || "").trim()) || "",
    sort_index: Number(item.sort_index || 0),
    created_at: String(item.created_at || "").trim(),
    preview_image_url: String(item.preview_image_url || "").trim(),
    full_image_url: String(item.full_image_url || "").trim(),
    preview_width: Number(item.preview_width || 0),
    preview_height: Number(item.preview_height || 0),
    description: String(item.description || "").trim(),
    search_keywords: flattenTemplateSearchField(item.search_keywords || item.keywords).trim(),
    tags: Array.isArray(item.tags) ? item.tags.map((tag) => String(tag || "").trim()).filter(Boolean) : [],
    usage_count: normalizeTemplateCount(item.usage_count),
    likes_count: normalizeTemplateCount(item.likes_count),
    liked_by_me: Boolean(item.liked_by_me),
  })).filter((item) => item.id);
  state.templates = normalized.map((item) => ({
    ...item,
    preview_ratio: templatePreviewRatio(item),
    created_at_ts: Date.parse(item.created_at || "") || 0,
  }));
  if (state.selectedTemplateId) {
    const selected = state.templates.find((item) => item.id === state.selectedTemplateId);
    if (selected) {
      state.selectedTemplate = {
        ...state.selectedTemplate,
        ...selected,
        prompt: selected.prompt || (state.selectedTemplate && state.selectedTemplate.prompt) || "",
      };
      renderSelectedTemplateCard();
    }
  }
  if (state.activeTemplateModalId) {
    const modalItem = state.templates.find((item) => item.id === state.activeTemplateModalId);
    if (modalItem) {
      state.activeTemplateModalItem = {
        ...state.activeTemplateModalItem,
        ...modalItem,
        prompt: modalItem.prompt || (state.activeTemplateModalItem && state.activeTemplateModalItem.prompt) || "",
      };
      renderTemplateModalStats(modalItem);
    }
  }
  state.templatesLoading = false;
  renderTemplateFilters();
  renderTemplateCards();
}

async function loadTemplates() {
  const payload = await apiFetch(TEMPLATE_LIST_PATH, { auth: Boolean(state.accessToken) });
  renderTemplates(payload);
}

async function toggleTemplateLike(templateId, shouldLike) {
  ensureAuthorizedForCreate();
  const method = shouldLike ? "POST" : "DELETE";
  const payload = await authorizedFetch(`/v1/templates/${encodeURIComponent(templateId)}/like`, { method });
  const patch = {
    likes_count: normalizeTemplateCount(payload.likes_count),
    liked_by_me: Boolean(payload.liked_by_me),
  };
  updateTemplateInState(templateId, patch);
  renderTemplateFilters();
  renderTemplateCards();
  const currentItem = currentTemplateModalItem();
  if (currentItem && currentItem.id === templateId) {
    renderTemplateModalStats({ ...currentItem, ...patch });
  }
  return payload;
}

function jobStatusLabel(status) {
  return STATUS_LABELS[status] || status;
}

function isGenerationDone(job) {
  return String(job?.status || "").toLowerCase() === "done" && Boolean(job?.result_image_url);
}

function repeatHistoryJob(job) {
  const prompt = String(job?.prompt || "").trim();
  if (prompt) {
    promptInput.value = prompt;
    setPromptSource("history", prompt);
  } else {
    setPromptSource("manual", "");
  }
  clearSelectedTemplate({ clearPrompt: false });
  applyGenerationSettingsFromJob(job);
  switchScreen("studio");
  promptInput.focus();
  setCreateNote(prompt ? "Промпт и параметры перенесены из истории." : "Параметры перенесены из истории.");
}

function activeJobDetailsLabel(job) {
  if (!job || typeof job !== "object") {
    return "";
  }
  const mode = job.is_edit ? "с фото" : "промпт";
  const model = imageModelLabel(job.provider_model);
  const output = historyOutputLabel(job);
  return `${mode} · ${model} · ${output}`;
}

function renderActiveResultState({
  variant = "idle",
  icon = "image",
  title = "",
  body = "",
  meta = "",
  action = null,
} = {}) {
  activeResult.className = `active-result active-result-${variant} empty-result`;
  const progress = variant === "loading"
    ? '<span class="active-result-progress" aria-hidden="true"><span></span></span>'
    : "";
  const hasAction = Boolean(action && action.label && typeof action.onClick === "function");
  const actionIcon = action && action.icon ? String(action.icon) : "";
  const actionHtml = hasAction
    ? `
      <button class="soft-btn btn-compact active-result-action" data-action="active-result" type="button">
        ${actionIcon ? `<i data-lucide="${escapeHtml(actionIcon)}"></i>` : ""}
        <span>${escapeHtml(action.label)}</span>
      </button>
    `
    : "";
  activeResult.innerHTML = `
    <div class="active-result-state" role="${variant === "loading" ? "status" : "note"}">
      <span class="active-result-icon"><i data-lucide="${escapeHtml(icon)}"></i></span>
      ${title ? `<strong>${escapeHtml(title)}</strong>` : ""}
      ${body ? `<span>${escapeHtml(body)}</span>` : ""}
      ${progress}
      ${meta ? `<small>${escapeHtml(meta)}</small>` : ""}
      ${actionHtml}
    </div>
  `;
  refreshIcons();
  if (hasAction) {
    const actionButton = activeResult.querySelector('[data-action="active-result"]');
    if (actionButton) {
      actionButton.addEventListener("click", action.onClick);
    }
  }
}

function renderActiveResultIdle() {
  activeJobMeta.textContent = "Готов к генерации";
  renderActiveResultState({
    variant: "idle",
    icon: "image",
    title: "Кадр появится здесь",
    body: "После запуска покажем статус генерации, а затем готовое изображение.",
  });
}

function renderActiveResultSubmitting(cost) {
  activeJobMeta.textContent = "Подготовка";
  renderActiveResultState({
    variant: "loading",
    icon: "sparkles",
    title: "Ставим задачу",
    body: "Списываем кредиты и отправляем кадр в очередь генерации.",
    meta: `Списание: ${formatCredits(cost)}`,
  });
}

function renderActiveResultLoading(job) {
  const status = String(job?.status || "").toLowerCase();
  const isQueued = status === "queued";
  activeResult.className = "active-result active-result-loading empty-result";
  renderActiveResultState({
    variant: "loading",
    icon: isQueued ? "timer" : "sparkles",
    title: isQueued ? "Задача в очереди" : "Готовим кадр",
    body: isQueued
      ? "Мы приняли запрос. Как только очередь дойдет до задачи, начнется генерация."
      : "Модель собирает изображение. Результат появится здесь автоматически.",
    meta: activeJobDetailsLabel(job),
  });
}

async function renderActiveImage(job, renderToken) {
  try {
    const rendered = await resolveDisplayImage(generationViewImageUrl(job));
    if (renderToken !== state.activeImageRenderToken) {
      return;
    }
    const canDownload = !isTelegramMiniAppRuntime();
    activeResult.className = "active-result active-result-has-image";
    activeResult.innerHTML = `
      <div class="active-result-image-shell">
        <img src="${escapeHtml(rendered.src)}" alt="Результат генерации" />
      </div>
      <div class="image-actions${canDownload ? "" : " image-actions-two"}">
        <button class="soft-btn btn-compact image-action-btn" data-action="open" type="button">
          <i data-lucide="external-link"></i>
          <span>Открыть</span>
        </button>
        ${canDownload ? `
          <button class="soft-btn btn-compact image-action-btn" data-action="download" type="button">
            <i data-lucide="download"></i>
            <span>Скачать</span>
          </button>
        ` : ""}
        <button class="soft-btn btn-compact image-action-btn" data-action="repeat" type="button">
          <i data-lucide="repeat-2"></i>
          <span>Повторить</span>
        </button>
      </div>
    `;
    refreshIcons();
    const openBtn = activeResult.querySelector('[data-action="open"]');
    openBtn.addEventListener("click", () => {
      openGenerationImage(job).catch((error) => {
        setCreateNote(userFacingErrorMessage(error, "Не удалось открыть изображение."), true);
      });
    });
    const downloadBtn = activeResult.querySelector('[data-action="download"]');
    if (downloadBtn) {
      downloadBtn.addEventListener("click", () => {
        downloadGenerationImage(job, `kartivio-${job.id}`).catch((error) => {
          setCreateNote(userFacingErrorMessage(error, "Не удалось скачать изображение."), true);
        });
      });
    }
    const repeatBtn = activeResult.querySelector('[data-action="repeat"]');
    if (repeatBtn) {
      repeatBtn.addEventListener("click", () => {
        repeatHistoryJob(job);
      });
    }
    renderFirstPhotosetResultOffer();
  } catch (error) {
    if (renderToken !== state.activeImageRenderToken) {
      return;
    }
    renderActiveResultState({
      variant: "error",
      icon: "circle-alert",
      title: "Изображение временно недоступно",
      body: userFacingErrorMessage(error, "Не удалось показать результат."),
      action: {
        label: "Открыть историю",
        icon: "history",
        onClick: () => switchScreen("history"),
      },
    });
  }
}

function renderFirstPhotosetResultOffer() {
  const previous = activeResult.querySelector(".first-photoset-result-offer");
  if (previous) {
    previous.remove();
  }
  activeResult.classList.remove("has-first-photoset-offer");
  if (!firstPhotosetOfferEligible("after_second_success")) {
    return;
  }

  const offer = document.createElement("article");
  offer.className = "first-photoset-result-offer";
  offer.innerHTML = `
    <div class="first-photoset-result-copy">
      <span class="first-photoset-kicker">Первый фотосет</span>
      <strong>27 фото за 399 ₽</strong>
      <p>Базовый пакет плюс 5 фото бонусом для первой покупки.</p>
    </div>
    <button class="primary-action first-photoset-result-cta" type="button">
      Получить 27 фото
    </button>
  `;
  const button = offer.querySelector("button");
  if (button) {
    button.addEventListener("click", openFirstPhotosetPaywall);
  }
  activeResult.appendChild(offer);
  activeResult.classList.add("has-first-photoset-offer");
  trackFirstPhotosetOfferViewed("after_second_success");
}

function renderActiveJob(job) {
  const status = jobStatusLabel(job.status);
  const normalizedStatus = String(job.status || "").toLowerCase();
  activeJobMeta.textContent = `${status} · ${activeJobDetailsLabel(job)}`;

  if (job.result_image_url) {
    noteSuccessfulGeneration(job);
    const jobId = String(job.id || "").trim();
    if (jobId && !state.trackedResultJobIds.has(jobId)) {
      state.trackedResultJobIds.add(jobId);
      trackProductEvent("result_viewed", {
        job_id: jobId,
        image_model: job.provider_model,
        output_size: job.output_size,
        has_photo: Boolean(job.is_edit),
        template_id: job.template_id || "",
      });
    }
    const renderToken = ++state.activeImageRenderToken;
    renderActiveResultState({
      variant: "loading",
      icon: "image",
      title: "Открываем результат",
      body: "Загружаем готовое изображение.",
      meta: activeJobDetailsLabel(job),
    });
    renderActiveImage(job, renderToken);
    return;
  }
  state.activeImageRenderToken += 1;
  if (normalizedStatus === "failed") {
    renderActiveResultState({
      variant: "error",
      icon: "circle-alert",
      title: "Не получилось сгенерировать",
      body: generationErrorMessage(job.error_code),
      meta: activeJobDetailsLabel(job),
      action: {
        label: "Повторить настройки",
        icon: "repeat-2",
        onClick: () => repeatHistoryJob(job),
      },
    });
    return;
  }
  renderActiveResultLoading(job);
}

function historyThumb(job) {
  if (job.result_image_url) {
    return "";
  }
  const status = String(job.status || "").toLowerCase();
  if (status === "failed") {
    return `<span>${escapeHtml(generationErrorMessage(job.error_code))}</span>`;
  }
  if (status === "cancelled") {
    return "<span>Задача отменена</span>";
  }
  if (status === "queued" || status === "processing") {
    return "<span>Готовим изображение</span>";
  }
  return "<span>Результат появится здесь</span>";
}

function renderHistoryPagination({ hasMore = false, loadingMore = false, itemCount = 0 } = {}) {
  if (!historyPagination || !historyMoreButton || !historyMoreNote) {
    return;
  }
  const shouldShow = itemCount > 0;
  historyPagination.classList.toggle("is-hidden", !shouldShow);
  if (!shouldShow) {
    historyMoreNote.textContent = "";
    historyMoreButton.disabled = true;
    return;
  }
  historyMoreButton.disabled = !hasMore || loadingMore;
  historyMoreButton.textContent = loadingMore ? "Загружаю…" : "Показать еще";
  historyMoreNote.textContent = hasMore ? `Показано ${itemCount} результатов.` : `Показаны все ${itemCount} результатов.`;
}

function renderHistory(payload) {
  const items = Array.isArray(payload && payload.items) ? payload.items : [];
  const hasMore = Boolean(payload && payload.hasMore);
  const loadingMore = Boolean(payload && payload.loadingMore);
  const canDownload = !isTelegramMiniAppRuntime();
  historyList.innerHTML = "";
  if (!items.length) {
    historyList.innerHTML = '<article class="history-item history-empty"><div class="history-body">История пока пустая.</div></article>';
    renderHistoryPagination({ hasMore: false, loadingMore: false, itemCount: 0 });
    return;
  }
  for (const job of items) {
    const item = document.createElement("article");
    const statusClass = `status-${String(job.status || "").toLowerCase()}`;
    const done = isGenerationDone(job);
    const modeLabel = job.is_edit ? "с фото" : "промпт";
    const meta = `${imageModelLabel(job.provider_model)} · ${historyOutputLabel(job)} · ${formatCredits(job.requested_credits || 0)}`;
    item.className = `history-item${done ? " is-done" : " is-pending"}`;
    item.innerHTML = `
      <div class="history-thumb${done ? " history-thumb-ready" : ""}">
        ${historyThumb(job)}
        ${done ? '<button class="history-thumb-open" data-action="open-image" type="button" aria-label="Открыть результат"><span class="history-open-indicator" aria-hidden="true"><i data-lucide="maximize-2"></i></span></button>' : ""}
        ${canDownload && done ? '<button class="history-icon-action history-download-overlay" data-action="download-image" type="button" aria-label="Скачать изображение"><i data-lucide="download"></i></button>' : ""}
        ${done ? "" : `<span class="status-pill history-status ${escapeHtml(statusClass)}">${escapeHtml(jobStatusLabel(job.status))}</span>`}
      </div>
      <div class="history-body">
        <div class="history-topline">
          <span class="chip">${escapeHtml(modeLabel)}</span>
        </div>
        <p class="history-prompt">${escapeHtml(job.prompt)}</p>
        <div class="plan-meta">${escapeHtml(meta)}</div>
        <div class="history-actions">
          <button class="soft-btn btn-compact history-repeat-btn" data-action="use-prompt" type="button">
            <i data-lucide="repeat-2"></i>
            <span>Повторить</span>
          </button>
        </div>
      </div>
    `;
    item.querySelector('[data-action="use-prompt"]').addEventListener("click", () => {
      repeatHistoryJob(job);
    });
    const openButton = item.querySelector('[data-action="open-image"]');
    if (openButton) {
      openButton.addEventListener("click", (event) => {
        event.preventDefault();
        openGenerationImage(job).catch((error) => {
          setCreateNote(userFacingErrorMessage(error, "Не удалось открыть изображение."), true);
        });
      });
    }
    const downloadButton = item.querySelector('[data-action="download-image"]');
    if (downloadButton) {
      downloadButton.addEventListener("click", () => {
        if (!job.result_image_url) {
          return;
        }
        downloadGenerationImage(job, `kartivio-${job.id}`).catch((error) => {
          setCreateNote(userFacingErrorMessage(error, "Не удалось скачать изображение."), true);
        });
      });
    }
    historyList.appendChild(item);

    if (done) {
      resolveDisplayImage(generationThumbnailUrl(job))
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
            img.decoding = "async";
            const existingChildren = Array.from(thumb.children);
            thumb.replaceChildren(img, ...existingChildren);
          }
          img.src = rendered.src;
        })
        .catch(() => {});
    }
  }
  renderHistoryPagination({ hasMore, loadingMore, itemCount: items.length });
  refreshIcons();
}

function mergeHistoryItems(existingItems, incomingItems) {
  const merged = Array.isArray(existingItems) ? existingItems.slice() : [];
  const knownIds = new Set(merged.map((item) => String(item && item.id ? item.id : "")));
  for (const item of incomingItems) {
    const id = String(item && item.id ? item.id : "");
    if (knownIds.has(id)) {
      continue;
    }
    knownIds.add(id);
    merged.push(item);
  }
  return merged;
}

async function loadHistory({ forceServerCheck = false, append = false } = {}) {
  if (!hasActiveSession() && !forceServerCheck) {
    resetHistoryCache();
    historyList.innerHTML = '<article class="history-item"><div class="history-body">Войди, чтобы увидеть историю.</div></article>';
    renderHistoryPagination({ hasMore: false, loadingMore: false, itemCount: 0 });
    return;
  }
  const now = Date.now();
  if (!append && Array.isArray(state.historyItems)) {
    renderHistory({ items: state.historyItems, hasMore: state.historyHasMore });
    if (!forceServerCheck && now - state.historyLoadedAt < HISTORY_CACHE_TTL_MS) {
      return;
    }
  } else if (!append && !state.historyLoadPromise) {
    historyList.innerHTML =
      '<article class="history-item"><div class="history-body">Загружаю историю…</div></article>';
  }

  if (state.historyLoadPromise) {
    return state.historyLoadPromise;
  }

  if (append && !state.historyHasMore) {
    return;
  }

  if (append && Array.isArray(state.historyItems)) {
    renderHistory({ items: state.historyItems, hasMore: state.historyHasMore, loadingMore: true });
  }

  const requestToken = ++state.historyRequestToken;
  const requestOffset = append ? state.historyNextOffset : 0;
  const requestPromise = authorizedGetWithRetry(`/v1/generations?limit=${HISTORY_PAGE_SIZE}&offset=${requestOffset}`, 1)
    .then((payload) => {
      const incomingItems = Array.isArray(payload && payload.items) ? payload.items : [];
      const nextOffset =
        payload && Number.isInteger(payload.next_offset) ? payload.next_offset : null;
      const hasMore = Boolean(payload && payload.has_more);
      if (requestToken === state.historyRequestToken) {
        state.historyItems = append ? mergeHistoryItems(state.historyItems, incomingItems) : incomingItems;
        state.historyHasMore = hasMore;
        state.historyNextOffset =
          nextOffset !== null ? nextOffset : Array.isArray(state.historyItems) ? state.historyItems.length : 0;
        state.historyLoadedAt = Date.now();
        syncSuccessfulGenerationCountFromJobs(state.historyItems);
        renderHistory({ items: state.historyItems, hasMore: state.historyHasMore });
      }
    })
    .finally(() => {
      if (state.historyLoadPromise === requestPromise) {
        state.historyLoadPromise = null;
      }
    });
  state.historyLoadPromise = requestPromise;
  return requestPromise;
}

async function loadPublicData({ requestToken = 0, auth = hasActiveSession() } = {}) {
  const [plansPayload, templatesPayload] = await Promise.all([
    apiFetch("/v1/plans"),
    apiFetch(TEMPLATE_LIST_PATH, { auth }),
  ]);
  if (requestToken && requestToken !== state.publicDataRequestToken) {
    return false;
  }
  renderPlans(plansPayload);
  renderTemplates(templatesPayload);
  state.publicDataLoadedContext = auth ? "auth" : "anon";
  setNote("");
  return true;
}

function ensurePublicDataLoaded({ notifyOnError = false, force = false } = {}) {
  const context = currentPublicDataContext();
  if (!force && state.publicDataLoadPromise && state.publicDataLoadContext === context) {
    return state.publicDataLoadPromise;
  }
  if (!force && state.publicDataLoadedContext === context) {
    return Promise.resolve(false);
  }
  if (!state.templates.length) {
    state.templatesLoading = true;
    renderTemplateCards();
  }
  const requestToken = state.publicDataRequestToken + 1;
  state.publicDataRequestToken = requestToken;
  state.publicDataLoadContext = context;
  const requestPromise = loadPublicData({ requestToken, auth: context === "auth" })
    .catch((error) => {
      if (requestToken === state.publicDataRequestToken) {
        state.templatesLoading = false;
        renderTemplateCards();
        if (notifyOnError) {
          setNote(userFacingErrorMessage(error, "Не удалось загрузить данные приложения."), true);
        } else {
          console.warn("Public data warmup failed", error);
        }
      }
      throw error;
    })
    .finally(() => {
      if (state.publicDataLoadPromise === requestPromise) {
        state.publicDataLoadPromise = null;
        state.publicDataLoadContext = "";
      }
    });
  state.publicDataLoadPromise = requestPromise;
  return requestPromise;
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
  if (payload.linked_yandex && !state.linkedProviders.has("yandex")) {
    state.linkedProviders.add("yandex");
  }
  if (!state.linkedProviders.has("telegram") && payload.telegram_user_id) {
    state.linkedProviders.add("telegram");
  }
  renderIdentityActions();
}

async function loadPrivateData({ forceServerCheck = false } = {}) {
  if (!hasActiveSession() && !forceServerCheck) {
    clearTelegramLinkPolling();
    state.telegramLinkToken = "";
    state.isCookieSession = false;
    state.linkedProviders = new Set();
    state.me = null;
    userName.textContent = "—";
    userTgId.textContent = "—";
    creditsValue.textContent = "—";
    creditsBadge.textContent = "0";
    profileAvatar.textContent = "K";
    renderReferenceImage();
    setReferencePromptNote(defaultReferencePromptNote());
    renderIdentityActions();
    renderAdminAccess();
    renderGenerationChips();
    refreshGenerationCostNote();
    return;
  }
  const mePromise = authorizedGetWithRetry("/v1/me", 1);
  const walletPromise = authorizedGetWithRetry("/v1/wallet?limit=1", 1);
  const identitiesPromise = loadIdentities();
  const [me, wallet] = await Promise.all([mePromise, walletPromise]);
  await identitiesPromise;
  state.isCookieSession = Boolean(prefersCookieAuth() && !state.accessToken);
  renderUser(me, wallet);
}

async function refreshWalletBalance() {
  if (!hasActiveSession()) {
    return null;
  }
  const wallet = await authorizedGetWithRetry("/v1/wallet?limit=1", 1);
  renderWalletBalance(wallet);
  return wallet;
}

async function finalizeAuthSession(payload, provider) {
  const accessToken = String(payload && payload.access_token ? payload.access_token : "").trim();
  const refreshToken = String(payload && payload.refresh_token ? payload.refresh_token : "").trim();

  state.telegramWebLoginToken = "";
  clearTelegramWebLoginPolling();
  state.lastAuthProvider = provider;
  state.accessToken = accessToken;
  state.refreshToken = refreshToken;
  state.isCookieSession = false;
  saveState();

  if (prefersCookieAuth()) {
    apiFetch("/v1/me")
      .then(() => {
        if (state.accessToken !== accessToken || state.refreshToken !== refreshToken) {
          return;
        }
        state.accessToken = "";
        state.refreshToken = "";
        state.isCookieSession = true;
        saveState();
      })
      .catch(() => {
        // Cookie session did not come up. Keep bearer tokens as a fallback.
      });
  }
}

function ensureAuthorizedForCreate() {
  if (!hasActiveSession()) {
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
      template_id: state.selectedTemplateId || null,
      client_request_id: clientRequestId,
    },
    idempotencyKey: clientRequestId,
  });
}

async function createEditGeneration(
  prompt,
  imageModel,
  outputSize,
  sourceImages,
  clientRequestId,
  onUploadProgress,
) {
  const form = new FormData();
  form.append("prompt", prompt);
  form.append("image_model", imageModel);
  form.append("output_size", outputSize);
  if (state.selectedTemplateId) {
    form.append("template_id", state.selectedTemplateId);
  }
  form.append("client_request_id", clientRequestId);
  for (const sourceImage of sourceImages) {
    form.append("source_image", sourceImage);
  }
  return authorizedMultipart("/v1/generations/edit", form, {
    idempotencyKey: clientRequestId,
    onUploadProgress,
  });
}

async function createReferencePromptFromImage(referenceImage) {
  const form = new FormData();
  form.append("reference_image", referenceImage);
  return authorizedMultipart("/v1/reference-prompts", form, {
    timeoutMs: REFERENCE_PROMPT_TIMEOUT_MS,
  });
}

function validateReferenceImageFile(file) {
  if (!(file instanceof File)) {
    throw new Error("Сначала добавь фото-референс.");
  }
  const maxBytes = MAX_SOURCE_IMAGE_BYTES;
  const allowedMime = new Set(["image/png", "image/jpeg", "image/webp"]);
  const mime = String(file.type || "").toLowerCase();
  if (!file.size) {
    throw new Error("Фото-референс пустое. Выбери другой файл.");
  }
  if (file.size > maxBytes) {
    throw new Error("Фото-референс больше 10 MB. Сожми изображение и повтори.");
  }
  if (mime && !allowedMime.has(mime)) {
    throw new Error("Для фото-референса подходят только PNG, JPG и WEBP.");
  }
}

async function handleBuildReferencePrompt() {
  try {
    ensureAuthorizedForCreate();
    const file = referenceImageFile();
    validateReferenceImageFile(file);
    state.referencePromptExpanded = true;
    state.referencePromptBusy = true;
    syncReferencePromptControls();
    setReferencePromptNote("Описываем референс... Обычно это занимает 3–8 секунд.");
    trackProductEvent("reference_prompt_started", {
      total_size_bucket: productFileSizeBucket([file]),
    });

    const previousPrompt = String(promptInput.value || "");
    const payload = await createReferencePromptFromImage(file);
    const nextPrompt = String((payload && payload.prompt) || "").trim();
    if (!nextPrompt) {
      throw new Error("Сервис вернул пустой промпт.");
    }
    state.referencePromptPreviousValue = previousPrompt && previousPrompt !== nextPrompt ? previousPrompt : "";
    state.referencePromptBuilt = true;
    renderReferencePromptRestoreButton();
    promptInput.value = nextPrompt;
    setPromptSource("reference", nextPrompt);
    switchScreen("studio");
    promptInput.focus();
    setReferencePromptNote("Промпт собран. Его можно отредактировать перед генерацией.");
    setCreateNote("Промпт собран по фото-референсу.");
    renderReferenceImage();
    trackProductEvent("reference_prompt_succeeded");
  } catch (error) {
    trackProductEvent("reference_prompt_failed", { error_code: productEventErrorCode(error) });
    setReferencePromptNote(userFacingErrorMessage(error, "Не удалось собрать промпт по референсу."), true);
  } finally {
    state.referencePromptBusy = false;
    syncReferencePromptControls();
  }
}

function restoreReferencePromptPreviousText() {
  const previous = String(state.referencePromptPreviousValue || "");
  if (!previous) {
    return;
  }
  promptInput.value = previous;
  setPromptSource("manual", previous);
  clearReferencePromptUndoState();
  promptInput.focus();
  setReferencePromptNote("Предыдущий текст возвращен.");
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
    await refreshWalletBalance().catch(() => null);
    if (String(job.status || "").toLowerCase() === "done" && job.result_image_url) {
      renderFirstPhotosetResultOffer();
    }
    if (state.currentScreen === "history") {
      await loadHistory({ forceServerCheck: true });
    } else {
      markHistoryCacheStale();
    }
  } catch (error) {
    setCreateNote(userFacingErrorMessage(error, "Не удалось обновить статус задачи."), true);
  }
}

async function handleCreate() {
  const prompt = promptInput.value.trim();
  const imageModel = state.selectedImageModel || DEFAULT_IMAGE_MODEL;
  const outputSize = currentOutputSizeSelection();
  const sourceImages = sourceImageFilesForUpload();
  const totalSelectedFiles = sourceImageFiles().length;
  const cost = selectedGenerationCost();
  let requestStarted = false;

  try {
    ensureAuthorizedForCreate();
    if (!prompt) {
      throw new Error("Добавь промпт.");
    }
    if (prompt.length > PROMPT_MAX_LENGTH) {
      throw new Error(`Промпт слишком длинный. Максимум ${PROMPT_MAX_LENGTH} символов.`);
    }
    if (!outputSize) {
      throw new Error("Недоступная комбинация разрешения и соотношения.");
    }
    if (totalSelectedFiles > MAX_SOURCE_IMAGES) {
      throw new Error(`Можно загрузить не более ${MAX_SOURCE_IMAGES} фото.`);
    }
    if (sourceImages.length > 0) {
      const maxBytes = MAX_SOURCE_IMAGE_BYTES;
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
    requestStarted = true;
    blurGenerationInputs();
    createButton.disabled = true;
    setCreateButtonBusyLabel();
    renderActiveResultSubmitting(cost);
    scrollActiveResultIntoView();
    setCreateNote(`Списываю ${formatCredits(cost)} и ставлю задачу в очередь.`);

    const clientRequestId = buildClientRequestId();
    const eventProperties = {
      image_model: imageModel,
      output_size: outputSize,
      has_photo: sourceImages.length > 0,
      file_count: sourceImages.length,
      prompt_source: state.promptSource,
      template_id: state.selectedTemplateId || "",
    };
    if (sourceImages.length > 0) {
      trackProductEvent("photo_upload_started", {
        file_count: sourceImages.length,
        total_size_bucket: productFileSizeBucket(sourceImages),
      });
    }
    let lastUploadPercent = -1;
    const onUploadProgress = sourceImages.length > 0
      ? ({ percent }) => {
          const normalizedPercent = Math.max(0, Math.min(100, Number(percent || 0)));
          if (normalizedPercent === lastUploadPercent) {
            return;
          }
          lastUploadPercent = normalizedPercent;
          if (normalizedPercent >= 100) {
            setCreateButtonBusyLabel("Создаю задачу...");
            setCreateNote("Фото загружено без сжатия. Создаю задачу.");
            return;
          }
          setCreateButtonBusyLabel(`Загрузка фото · ${normalizedPercent}%`);
          setCreateNote(
            `Загружаю ${sourceImageTotalSizeLabel(sourceImages)} без сжатия · ${normalizedPercent}%.`,
          );
        }
      : undefined;
    const job = sourceImages.length > 0
      ? await createEditGeneration(
          prompt,
          imageModel,
          outputSize,
          sourceImages,
          clientRequestId,
          onUploadProgress,
        )
      : await createTextGeneration(prompt, imageModel, outputSize, clientRequestId);

    state.activeJobId = job.id;
    trackProductEvent("generation_submitted", {
      ...eventProperties,
      job_id: job.id,
      status: job.status,
    });
    renderActiveJob(job);
    setCreateNote("Задача создана. Статус и результат появятся ниже.");
    refreshWalletBalance().catch(() => null);
    markHistoryCacheStale();
    await pollActiveJob(job.id);
  } catch (error) {
    const errorCode = productEventErrorCode(error);
    const hasInsufficientCredits = errorCode === "insufficient_credits";
    setCreateNote(userFacingErrorMessage(error, "Не удалось запустить генерацию."), true);
    if (requestStarted) {
      trackProductEvent("generation_submit_failed", {
        image_model: imageModel,
        output_size: outputSize || "unknown",
        has_photo: sourceImages.length > 0,
        file_count: sourceImages.length,
        prompt_source: state.promptSource,
        template_id: state.selectedTemplateId || "",
        error_code: errorCode,
      });
      if (sourceImages.length > 0) {
        trackProductEvent("photo_upload_failed", {
          file_count: sourceImages.length,
          total_size_bucket: productFileSizeBucket(sourceImages),
          error_code: errorCode,
        });
      }
      renderActiveResultState({
        variant: "error",
        icon: hasInsufficientCredits ? "wallet-cards" : "circle-alert",
        title: hasInsufficientCredits ? "Недостаточно кредитов" : "Не удалось запустить генерацию",
        body: hasInsufficientCredits
          ? `Для выбранной модели нужно ${formatCredits(cost)}.`
          : userFacingErrorMessage(error, "Попробуй еще раз."),
        action: {
          label: hasInsufficientCredits ? "Выбрать пакет" : "Попробовать снова",
          icon: hasInsufficientCredits ? "wallet-cards" : "refresh-cw",
          onClick: hasInsufficientCredits ? () => switchScreen("tokens") : () => handleCreate(),
        },
      });
      scrollActiveResultIntoView();
    }
  } finally {
    createButton.disabled = false;
    setCreateButtonIdleLabel();
  }
}

function openBotLink() {
  if (isTelegramMiniAppRuntime() && tg && typeof tg.openLink === "function") {
    tg.openLink(TELEGRAM_BOT_URL);
    return;
  }
  window.open(TELEGRAM_BOT_URL, "_blank", "noopener,noreferrer");
}

function openTelegramDeepLink(url, popupHandle = null) {
  if (popupHandle && !popupHandle.closed) {
    try {
      popupHandle.location.replace(url);
      return true;
    } catch (_e) {
      // fallback to standard path below
    }
  }
  if (isTelegramMiniAppRuntime() && tg && typeof tg.openTelegramLink === "function") {
    tg.openTelegramLink(url);
    return true;
  }
  if (isTelegramMiniAppRuntime() && tg && typeof tg.openLink === "function") {
    tg.openLink(url);
    return true;
  }
  return Boolean(window.open(url, "_blank"));
}

async function pollTelegramWebLoginStatus() {
  if (!state.telegramWebLoginToken || hasActiveSession()) {
    renderAuthGateActions();
    return;
  }
  try {
    const payload = await apiFetch(
      `/v1/auth/telegram/web/status?login_token=${encodeURIComponent(state.telegramWebLoginToken)}`,
      { method: "GET" },
    );
    const status = String(payload.status || "").trim().toLowerCase();
    if (status === "pending") {
      setNote(payload.message || "Ожидаем подтверждение в Telegram.");
      state.telegramWebLoginPollTimer = window.setTimeout(() => {
        pollTelegramWebLoginStatus().catch(() => {});
      }, 2000);
      return;
    }
    if (status === "linked") {
      if (!payload.access_token || !payload.refresh_token) {
        throw new Error("Не удалось получить токены входа.");
      }
      await finalizeAuthSession(payload, "telegram");
      ensurePublicDataLoaded().catch(() => {});
      renderAuthGateActions();
      setAuthGateVisible(false);
      setNote(payload.message || "Вход через Telegram выполнен.");
      await loadPrivateData();
      markHistoryCacheStale();
      switchScreen("feed");
      return;
    }

    state.telegramWebLoginToken = "";
    clearTelegramWebLoginPolling();
    saveState();
    renderAuthGateActions();
    setNote(payload.message || "Ссылка для входа истекла. Нажми кнопку еще раз.", true);
  } catch (error) {
    setNote(userFacingErrorMessage(error, "Не удалось проверить вход через Telegram."), true);
    state.telegramWebLoginPollTimer = window.setTimeout(() => {
      pollTelegramWebLoginStatus().catch(() => {});
    }, 3000);
  }
}

function resumePendingTelegramWebLogin({ announce = false } = {}) {
  if (!hasPendingTelegramWebLogin()) {
    renderAuthGateActions();
    return;
  }
  renderAuthGateActions();
  clearTelegramWebLoginPolling();
  if (announce) {
    setNote("Проверяю подтверждение входа в Telegram...");
  }
  state.telegramWebLoginPollTimer = window.setTimeout(() => {
    pollTelegramWebLoginStatus().catch(() => {});
  }, 120);
}

async function startTelegramWebLogin(options = {}) {
  const { popupHandle = null } = options;
  if (authButton) {
    authButton.disabled = true;
    authButton.textContent = "Готовлю ссылку...";
  }
  clearTelegramWebLoginPolling();
  try {
    const payload = await apiFetch("/v1/auth/telegram/web/start", { method: "POST" });
    state.telegramWebLoginToken = String(payload.login_token || "").trim();
    const deepLink = String(payload.deep_link_url || "").trim();
    if (!state.telegramWebLoginToken || !deepLink) {
      throw new Error("Не удалось создать ссылку входа.");
    }
    saveState();
    renderAuthGateActions();
    const openedInNewContext = openTelegramDeepLink(deepLink, popupHandle);
    if (openedInNewContext) {
      setNote(payload.message || "Открой Telegram и нажми Start. После возврата вход продолжится автоматически.");
    } else {
      setNote("Браузер заблокировал новую вкладку. Разреши pop-up и нажми «Войти через Telegram» снова.", true);
      if (popupHandle && !popupHandle.closed) {
        try {
          popupHandle.close();
        } catch (_e) {
          // noop
        }
      }
    }
    resumePendingTelegramWebLogin({ announce: false });
  } catch (error) {
    if (popupHandle && !popupHandle.closed) {
      try {
        popupHandle.close();
      } catch (_e) {
        // noop
      }
    }
    setNote(userFacingErrorMessage(error, "Не удалось начать вход через Telegram."), true);
  } finally {
    if (authButton) {
      authButton.disabled = false;
      authButton.textContent = "Войти через Telegram";
    }
  }
}

async function pollTelegramLinkStatus() {
  if (!hasActiveSession() || !state.telegramLinkToken) {
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
      if (state.currentScreen === "history") {
        await loadHistory({ forceServerCheck: true });
      } else {
        markHistoryCacheStale();
      }
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
    setTelegramLinkNote(userFacingErrorMessage(error, "Не удалось проверить привязку Telegram."), true);
    state.telegramLinkPollTimer = window.setTimeout(() => {
      pollTelegramLinkStatus().catch(() => {});
    }, 3000);
  }
}

async function startTelegramLink() {
  if (!hasActiveSession()) {
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
    setTelegramLinkNote(userFacingErrorMessage(error, "Не удалось начать привязку Telegram."), true);
  } finally {
    renderIdentityActions();
  }
}

async function hydrateAuthorizedSession() {
  if (!hasActiveSession() && !prefersCookieAuth()) {
    return false;
  }
  try {
    ensurePublicDataLoaded().catch(() => {});
    await loadPrivateData({ forceServerCheck: prefersCookieAuth() });
    state.isCookieSession = Boolean(prefersCookieAuth() && !state.accessToken);
    return true;
  } catch (_error) {
    state.accessToken = "";
    state.refreshToken = "";
    state.isCookieSession = false;
    state.lastAuthProvider = "";
    state.telegramWebLoginToken = "";
    saveState();
    return false;
  }
}

async function loginViaTelegram(options = {}) {
  const { silent = false, targetScreen = "feed", popupHandle = null } = options;
  if (!tg || !tg.initData) {
    await startTelegramWebLogin({ popupHandle });
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
    await finalizeAuthSession(payload, "telegram");
    syncAcquisitionTouch({ auth: true }).catch(() => {});
    ensurePublicDataLoaded().catch(() => {});
    setAuthGateVisible(false);
    if (!silent) {
      setNote("Авторизация успешна.");
    }
    await loadPrivateData();
    markHistoryCacheStale();
    switchScreen(targetScreen);
    return true;
  } catch (error) {
    if (!silent) {
      setNote(userFacingErrorMessage(error, "Не удалось выполнить вход."), true);
    }
    return false;
  } finally {
    if (authButton) {
      authButton.disabled = false;
      authButton.textContent = "Войти через Telegram";
    }
  }
}

function setYandexAuthButtonIdle() {
  yandexAuthPending = false;
  if (yandexAuthButton) {
    yandexAuthButton.disabled = false;
  }
  refreshAuthButtons();
}

async function loginViaYandexCode(code, codeVerifier) {
  const payload = await apiFetch("/v1/auth/yandex", {
    method: "POST",
    body: { code, code_verifier: codeVerifier },
  });
  await finalizeAuthSession(payload, "yandex");
  syncAcquisitionTouch({ auth: true }).catch(() => {});
  ensurePublicDataLoaded().catch(() => {});
  setAuthGateVisible(false);
  setNote("Авторизация через Яндекс успешна.");
  await loadPrivateData();
  markHistoryCacheStale();
  switchScreen("feed");
}

async function loginViaYandex() {
  if (!yandexAuthButton) {
    return;
  }
  if (yandexAuthPending) {
    return;
  }
  const clientId = yandexClientIdFromMeta();
  if (!clientId) {
    setNote("Yandex Client ID не задан в мета-теге kartivio-yandex-client-id.", true);
    return;
  }
  if (!(window.crypto && window.crypto.subtle)) {
    setNote("Этот браузер не поддерживает безопасный вход через Яндекс.", true);
    return;
  }
  if (isTelegramMiniAppRuntime()) {
    const url = yandexAuthLaunchUrl();
    setNote("Открываю внешний браузер для входа через Яндекс.");
    if (tg && typeof tg.openLink === "function") {
      tg.openLink(url);
      return;
    }
    window.open(url, "_blank", "noopener,noreferrer");
    return;
  }

  yandexAuthPending = true;
  yandexAuthButton.disabled = true;
  const url = await yandexOauthAuthorizeUrl();
  if (!url) {
    setYandexAuthButtonIdle();
    setNote("Yandex login недоступен для этого окружения.", true);
    return;
  }
  setNote("Открываю Яндекс...");
  window.location.assign(url);
}

function bindEvents() {
  if (apiBaseInput) {
    apiBaseInput.addEventListener("change", () => {
      if (!canOverrideApiBase()) {
        apiBaseInput.value = state.apiBase;
        return;
      }
      state.apiBase = trimApiBase(apiBaseInput.value);
      saveState();
      refreshAuthButtons();
    });
  }

  if (authButton) {
    authButton.addEventListener("click", () => {
      trackProductEvent("auth_started", { auth_provider: "telegram" });
      let popupHandle = null;
      if (!isTelegramMiniAppRuntime()) {
        popupHandle = window.open("about:blank", "_blank");
      }
      loginViaTelegram({ silent: false, targetScreen: "feed", popupHandle });
    });
  }
  if (authCheckButton) {
    authCheckButton.addEventListener("click", () => {
      resumePendingTelegramWebLogin({ announce: true });
    });
  }
  if (yandexAuthButton) {
    yandexAuthButton.addEventListener("click", () => {
      trackProductEvent("auth_started", { auth_provider: "yandex" });
      loginViaYandex().catch((error) => {
        setYandexAuthButtonIdle();
        setNote(userFacingErrorMessage(error, "Не удалось выполнить вход через Яндекс."), true);
      });
    });
  }
  if (logoutButton) {
    logoutButton.addEventListener("click", () => {
      logoutSession().catch((error) => {
        setNote(userFacingErrorMessage(error, "Не удалось завершить сессию."), true);
      });
    });
  }
  if (linkTelegramButton) {
    linkTelegramButton.addEventListener("click", () => {
      startTelegramLink().catch((error) => {
        setTelegramLinkNote(userFacingErrorMessage(error, "Не удалось начать привязку Telegram."), true);
      });
    });
  }
  createButton.addEventListener("click", handleCreate);
  refreshHistoryButton.addEventListener("click", () => loadHistory({ forceServerCheck: true }).catch((error) => {
    setCreateNote(userFacingErrorMessage(error, "Не удалось загрузить историю."), true);
  }));
  if (historyMoreButton) {
    historyMoreButton.addEventListener("click", () => loadHistory({ append: true }).catch((error) => {
      setCreateNote(userFacingErrorMessage(error, "Не удалось загрузить историю."), true);
    }));
  }
  if (templateFeedMoreButton) {
    templateFeedMoreButton.addEventListener("click", () => {
      revealMoreTemplateItems();
    });
  }
  if (templateSearchInput) {
    templateSearchInput.addEventListener("input", () => {
      setTemplateSearchQuery(templateSearchInput.value);
    });
    templateSearchInput.addEventListener("search", () => {
      setTemplateSearchQuery(templateSearchInput.value);
    });
  }
  if (templateSearchClear) {
    templateSearchClear.addEventListener("click", clearTemplateSearch);
  }
  clearTemplateButton.addEventListener("click", () => {
    clearSelectedTemplate({ clearPrompt: true });
    promptInput.focus();
  });
  promptInput.addEventListener("input", handlePromptInput);
  if (clearPromptButton) {
    clearPromptButton.addEventListener("click", clearPromptText);
  }
  if (chooseTemplateButton) {
    chooseTemplateButton.addEventListener("click", () => switchScreen("feed"));
  }
  if (templateUseButton) {
    templateUseButton.addEventListener("click", async (event) => {
      event.preventDefault();
      event.stopPropagation();
      const item = currentTemplateModalItem();
      if (!item) {
        setTemplateModalNote("Шаблон не найден.", true);
        return;
      }
      templateUseButton.disabled = true;
      setTemplateModalNote(templateHasPrompt(item) ? "" : "Загружаю промпт шаблона...");
      try {
        await selectTemplate(item);
        setCreateNote("Шаблон выбран и промпт вставлен.");
      } catch (error) {
        setTemplateModalNote(userFacingErrorMessage(error, "Не удалось выбрать шаблон."), true);
      } finally {
        templateUseButton.disabled = false;
      }
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
      templateCopyPromptButton.disabled = true;
      try {
        const resolvedItem = await ensureTemplatePrompt(item);
        await copyPromptToClipboard(resolvedItem.prompt);
        setTemplateModalNote("Промпт скопирован.");
      } catch (error) {
        setTemplateModalNote(userFacingErrorMessage(error, "Не удалось скопировать промпт."), true);
      } finally {
        templateCopyPromptButton.disabled = false;
      }
    });
  }
  if (templatePromptToggle) {
    templatePromptToggle.addEventListener("click", (event) => {
      event.preventDefault();
      event.stopPropagation();
      setTemplatePromptExpanded(!templatePromptExpanded);
    });
  }
  if (templateLikeButton) {
    templateLikeButton.addEventListener("click", async (event) => {
      event.preventDefault();
      event.stopPropagation();
      const item = currentTemplateModalItem();
      if (!item) {
        setTemplateModalNote("Шаблон не найден.", true);
        return;
      }
      templateLikeButton.disabled = true;
      try {
        const wasLiked = templateLikedByMe(item);
        await toggleTemplateLike(item.id, !wasLiked);
        setTemplateModalNote(wasLiked ? "Шаблон убран из избранного." : "Шаблон добавлен в избранное.");
      } catch (error) {
        setTemplateModalNote(userFacingErrorMessage(error, "Не удалось обновить лайк шаблона."), true);
      } finally {
        templateLikeButton.disabled = false;
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

  if (referencePromptToggleButton) {
    referencePromptToggleButton.addEventListener("click", () => {
      if (referencePromptLocked()) {
        openReferencePromptPaywall();
        return;
      }
      setReferencePromptExpanded(true);
    });
  }
  if (referencePromptCollapseButton) {
    referencePromptCollapseButton.addEventListener("click", () => {
      if (state.referencePromptBusy) {
        return;
      }
      setReferencePromptExpanded(false);
    });
  }
  if (referencePromptBuildButton) {
    referencePromptBuildButton.addEventListener("click", handleReferencePromptPrimaryAction);
  }
  if (referencePromptRestoreButton) {
    referencePromptRestoreButton.addEventListener("click", () => {
      restoreReferencePromptPreviousText();
    });
  }
  if (referenceImageDropzone) {
    referenceImageDropzone.addEventListener("click", (event) => {
      if (
        event.target instanceof Element &&
        event.target.closest("#clearReferenceImageButton")
      ) {
        return;
      }
      handleReferenceDropzoneAction();
    });
    referenceImageDropzone.addEventListener("keydown", (event) => {
      const key = event.key;
      if (key === "Enter" || key === " ") {
        event.preventDefault();
        handleReferenceDropzoneAction();
      }
    });
  }
  if (referenceImageInput) {
    referenceImageInput.addEventListener("change", handleReferenceImageChange);
  }
  if (clearReferenceImageButton) {
    clearReferenceImageButton.addEventListener("click", (event) => {
      event.preventDefault();
      event.stopPropagation();
      clearReferenceImage();
      setReferencePromptNote("Фото-референс убрано.");
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
  if (openMarketingAdminButton) {
    openMarketingAdminButton.addEventListener("click", () => switchScreen("marketing"));
  }
  if (marketingBackButton) {
    marketingBackButton.addEventListener("click", () => switchScreen("profile"));
  }
  if (marketingAdminTabs) {
    marketingAdminTabs.addEventListener("click", (event) => {
      const button = event.target instanceof Element ? event.target.closest("[data-admin-tab]") : null;
      if (!(button instanceof HTMLButtonElement)) {
        return;
      }
      state.adminTab = String(button.dataset.adminTab || "analytics").trim() || "analytics";
      renderAdminTabs();
    });
  }
  if (adminAnalyticsPeriod) {
    adminAnalyticsPeriod.addEventListener("click", (event) => {
      const button = event.target instanceof Element
        ? event.target.closest("[data-analytics-period]")
        : null;
      if (!(button instanceof HTMLButtonElement)) {
        return;
      }
      const period = String(button.dataset.analyticsPeriod || "").trim();
      if (!period || period === state.adminAnalyticsPeriod) {
        return;
      }
      state.adminAnalyticsPeriod = period;
      renderAdminAnalytics();
      loadAdminAnalytics().catch((error) => {
        setAdminAnalyticsNote(
          userFacingErrorMessage(error, "Не удалось обновить аналитику."),
          true,
        );
      });
    });
  }
  if (refreshAdminAnalyticsButton) {
    refreshAdminAnalyticsButton.addEventListener("click", () => {
      refreshAdminAnalyticsButton.disabled = true;
      loadAdminAnalytics()
        .catch((error) => {
          setAdminAnalyticsNote(
            userFacingErrorMessage(error, "Не удалось обновить аналитику."),
            true,
          );
        })
        .finally(() => {
          refreshAdminAnalyticsButton.disabled = false;
        });
    });
  }
  for (const input of [
    adminTemplateTitleInput,
    adminTemplateCategoryInput,
    adminTemplatePromptInput,
  ]) {
    if (input) {
      input.addEventListener("input", () => {
        renderAdminTemplateFormState();
      });
    }
  }
  if (adminTemplatePickFileButton && adminTemplateFileInput) {
    adminTemplatePickFileButton.addEventListener("click", () => {
      adminTemplateFileInput.click();
    });
    adminTemplateFileInput.addEventListener("change", () => {
      releaseAdminTemplateLocalPreview();
      const file = adminTemplateCurrentFile();
      if (!file) {
        setAdminTemplateFileStatus(ADMIN_TEMPLATE_FILE_NOTE_DEFAULT);
        renderAdminTemplateFormState();
        return;
      }
      let mediaType = "";
      try {
        mediaType = validateAdminTemplateFile(file);
      } catch (error) {
        clearAdminTemplateFileSelection();
        setAdminTemplateFileStatus(error?.message || "Файл не подходит для шаблона.", true);
        renderAdminTemplateFormState();
        return;
      }
      state.adminTemplateLocalPreviewUrl = URL.createObjectURL(file);
      state.adminTemplateLocalPreviewMediaType = mediaType;
      setAdminTemplateFileStatus(`Файл выбран: ${file.name} · ${formatMegabytes(file.size)}`);
      renderAdminTemplateFormState();
    });
  }
  if (adminTemplateCreateButton) {
    adminTemplateCreateButton.addEventListener("click", async () => {
      adminTemplateCreateButton.disabled = true;
      setAdminTemplateFormNote("Загружаю шаблон...");
      try {
        const payload = await createAdminTemplate();
        setAdminTemplateFormNote(`Шаблон создан: ${payload.title}`);
      } catch (error) {
        setAdminTemplateFormNote(
          adminFormErrorMessage(error, "Не удалось загрузить шаблон."),
          true,
        );
      } finally {
        adminTemplateCreateButton.disabled = false;
      }
    });
  }
  if (adminTemplateSaveButton) {
    adminTemplateSaveButton.addEventListener("click", async () => {
      adminTemplateSaveButton.disabled = true;
      setAdminTemplateFormNote("Сохраняю изменения...");
      try {
        const payload = await updateAdminTemplate();
        setAdminTemplateFormNote(`Шаблон обновлен: ${payload.title}`);
      } catch (error) {
        setAdminTemplateFormNote(
          adminFormErrorMessage(error, "Не удалось сохранить шаблон."),
          true,
        );
      } finally {
        adminTemplateSaveButton.disabled = false;
      }
    });
  }
  if (adminTemplateToggleButton) {
    adminTemplateToggleButton.addEventListener("click", async () => {
      adminTemplateToggleButton.disabled = true;
      setAdminTemplateFormNote("Обновляю статус...");
      try {
        const payload = await toggleAdminTemplateVisibility();
        setAdminTemplateFormNote(
          payload.is_active
            ? `Шаблон снова виден: ${payload.title}`
            : `Шаблон скрыт: ${payload.title}`,
        );
      } catch (error) {
        setAdminTemplateFormNote(
          adminFormErrorMessage(error, "Не удалось обновить статус шаблона."),
          true,
        );
      } finally {
        adminTemplateToggleButton.disabled = false;
      }
    });
  }
  if (adminTemplateResetButton) {
    adminTemplateResetButton.addEventListener("click", () => {
      resetAdminTemplateDraft();
    });
  }
  if (refreshAdminTemplatesButton) {
    refreshAdminTemplatesButton.addEventListener("click", () => {
      loadAdminTemplates().catch((error) => {
        setAdminTemplateFormNote(
          userFacingErrorMessage(error, "Не удалось обновить шаблоны."),
          true,
        );
      });
    });
  }
  if (adminTemplatesList) {
    adminTemplatesList.addEventListener("click", (event) => {
      const card = event.target instanceof Element ? event.target.closest("[data-template-id]") : null;
      if (!(card instanceof HTMLElement)) {
        return;
      }
      const templateId = String(card.dataset.templateId || "").trim();
      const selected = state.adminTemplates.find((item) => item.id === templateId) || null;
      if (!selected) {
        return;
      }
      state.selectedAdminTemplateId = selected.id;
      clearAdminTemplateFileSelection();
      populateAdminTemplateDraft(selected);
      renderAdminTemplatesList();
      renderAdminTemplateFormState();
      setAdminTemplateFormNote(`Шаблон выбран: ${selected.title}`);
    });
  }
  if (campaignKindSelect) {
    campaignKindSelect.addEventListener("change", () => {
      const nextKind = String(campaignKindSelect.value || "").trim() || "new_templates";
      applyCampaignKindDefaults(nextKind, state.adminCampaignDraftKind);
      state.adminCampaignDraftKind = nextKind;
      renderCampaignDraftVisibility();
    });
  }
  if (campaignAudienceModeSelect) {
    campaignAudienceModeSelect.addEventListener("change", () => {
      renderCampaignDraftVisibility();
    });
  }
  for (const input of [campaignTitleInput, campaignMessageInput, campaignCtaTextInput, campaignMediaUrlInput, campaignAudienceUserIdsInput]) {
    if (input) {
      input.addEventListener("input", () => {
        renderSelectedCampaignSummary();
      });
    }
  }
  if (campaignPromoOfferSelect) {
    campaignPromoOfferSelect.addEventListener("change", () => {
      if (isPromoCampaignDraft()) {
        forceApplyPromoOfferDraft(selectedDraftPromoOffer());
      }
      renderSelectedCampaignSummary();
    });
  }
  if (campaignMediaUrlInput) {
    campaignMediaUrlInput.addEventListener("input", () => {
      setCampaignMediaPreview(campaignMediaUrlInput.value);
    });
  }
  if (campaignMediaUploadButton && campaignMediaFileInput) {
    campaignMediaUploadButton.addEventListener("click", () => {
      campaignMediaFileInput.click();
    });
    campaignMediaFileInput.addEventListener("change", async () => {
      const file = campaignMediaFileInput.files && campaignMediaFileInput.files[0];
      if (!file) {
        return;
      }
      campaignMediaUploadButton.disabled = true;
      setCampaignMediaUploadStatus("Загружаю файл...");
      try {
        const payload = await uploadCampaignMedia(file);
        if (campaignMediaUrlInput) {
          campaignMediaUrlInput.value = payload.media_url || "";
        }
        setCampaignMediaPreview(payload.media_url);
        setCampaignMediaUploadStatus("Файл загружен.");
      } catch (error) {
        setCampaignMediaUploadStatus(adminFormErrorMessage(error, "Не удалось загрузить файл."), true);
      } finally {
        campaignMediaUploadButton.disabled = false;
        campaignMediaFileInput.value = "";
      }
    });
  }
  if (campaignCreateButton) {
    campaignCreateButton.addEventListener("click", async () => {
      campaignCreateButton.disabled = true;
      setCampaignFormNote("Сохраняю draft...");
      try {
        const payload = await createAdminCampaign();
        setCampaignFormNote(`Draft создан и выбран: ${payload.title}`);
      } catch (error) {
        setCampaignFormNote(adminFormErrorMessage(error, "Не удалось создать кампанию."), true);
      } finally {
        campaignCreateButton.disabled = false;
      }
    });
  }
  if (campaignPreviewButton) {
    campaignPreviewButton.addEventListener("click", async () => {
      campaignPreviewButton.disabled = true;
      setCampaignFormNote("Считаю preview...");
      try {
        const payload = await previewSelectedCampaign();
        setCampaignFormNote(`Preview готов: можно отправить ${payload.sendable_count}.`);
      } catch (error) {
        setCampaignFormNote(adminFormErrorMessage(error, "Не удалось построить preview."), true);
      } finally {
        campaignPreviewButton.disabled = false;
      }
    });
  }
  if (campaignTestButton) {
    campaignTestButton.addEventListener("click", async () => {
      campaignTestButton.disabled = true;
      setCampaignFormNote("Отправляю тест...");
      try {
        const payload = await testSelectedCampaign();
        setCampaignFormNote(`Тест отправлен: ${payload.title}`);
      } catch (error) {
        setCampaignFormNote(adminFormErrorMessage(error, "Не удалось отправить тест."), true);
      } finally {
        campaignTestButton.disabled = false;
      }
    });
  }
  if (campaignLaunchButton) {
    campaignLaunchButton.addEventListener("click", async () => {
      campaignLaunchButton.disabled = true;
      setCampaignFormNote("Запускаю кампанию...");
      try {
        const payload = await launchSelectedCampaign();
        setCampaignFormNote(`Кампания запущена: ${payload.title}`);
      } catch (error) {
        setCampaignFormNote(adminFormErrorMessage(error, "Не удалось запустить кампанию."), true);
      } finally {
        campaignLaunchButton.disabled = false;
      }
    });
  }
  if (refreshCampaignsButton) {
    refreshCampaignsButton.addEventListener("click", () => {
      loadAdminCampaigns().catch((error) => {
        setCampaignFormNote(userFacingErrorMessage(error, "Не удалось обновить кампании."), true);
      });
    });
  }
  if (campaignsList) {
    campaignsList.addEventListener("click", (event) => {
      const card = event.target instanceof Element ? event.target.closest("[data-campaign-id]") : null;
      if (!(card instanceof HTMLElement)) {
        return;
      }
      state.selectedAdminCampaignId = String(card.dataset.campaignId || "").trim();
      const selected = adminSelectedCampaign();
      if (selected && selected.preview_sendable_count != null) {
        state.adminCampaignPreview = {
          campaign_id: selected.id,
          reachable_count: Number(selected.preview_reachable_count || 0),
          muted_count: Number(selected.preview_muted_count || 0),
          rate_limited_24h_count: Number(selected.preview_rate_limited_24h_count || 0),
          rate_limited_7d_count: Number(selected.preview_rate_limited_7d_count || 0),
          sendable_count: Number(selected.preview_sendable_count || 0),
        };
      } else {
        state.adminCampaignPreview = null;
      }
      renderCampaignPreviewStats();
      renderCampaignsList();
      renderSelectedCampaignSummary();
      setCampaignFormNote("Кампания выбрана. Можно сделать preview, тест или запуск.");
    });
  }
  if (offerCreateButton) {
    offerCreateButton.addEventListener("click", async () => {
      offerCreateButton.disabled = true;
      setOfferFormNote("Создаю оффер...");
      try {
        const payload = await createPromoOffer();
        setOfferFormNote(`Оффер создан: ${payload.title}`);
        resetOfferDraft();
      } catch (error) {
        setOfferFormNote(userFacingErrorMessage(error, "Не удалось создать оффер."), true);
      } finally {
        offerCreateButton.disabled = false;
      }
    });
  }
  if (refreshOffersButton) {
    refreshOffersButton.addEventListener("click", () => {
      loadAdminOffers().catch((error) => {
        setOfferFormNote(userFacingErrorMessage(error, "Не удалось обновить офферы."), true);
      });
    });
  }

  plansActionButton.addEventListener("click", () => {
    if (!state.selectedTopupCode) {
      setPlansNote("Сначала выбери пакет.", true);
      return;
    }
    buyPackage(state.selectedTopupCode);
  });

  window.addEventListener("beforeunload", () => {
    flushProductEvents({ keepalive: true });
    revokeReferenceImagePreview();
    revokeSourceImagePreview();
  });
  window.addEventListener("focus", () => {
    unlockTemplateModalScroll();
    resumePendingTelegramWebLogin();
  });
  if (appMain) {
    appMain.addEventListener("scroll", maybeAutoLoadMoreTemplates, { passive: true });
  }
  window.addEventListener("scroll", maybeAutoLoadMoreTemplates, { passive: true });
  window.addEventListener("resize", maybeAutoLoadMoreTemplates, { passive: true });
  window.addEventListener("resize", handleTemplateGridLayoutChange, { passive: true });
  window.addEventListener("pageshow", () => {
    unlockTemplateModalScroll();
    resumePendingTelegramWebLogin();
  });
  document.addEventListener("visibilitychange", () => {
    if (document.visibilityState !== "visible") {
      return;
    }
    unlockTemplateModalScroll();
    resumePendingTelegramWebLogin();
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
  setBootPending(true);
  unlockTemplateModalScroll();
  loadState();
  captureFirstAcquisitionTouch();
  const telegramSdkPromise = ensureTelegramSdkLoaded();
  const apiBasePromise = (async () => {
    try {
      await resolveApiBase();
      syncAcquisitionTouch().catch(() => {});
      refreshAuthButtons();
    } catch (error) {
      setNote(userFacingErrorMessage(error, "Не удалось загрузить данные приложения."), true);
    }
  })();
  promptInput.maxLength = PROMPT_MAX_LENGTH;
  setDevPanelVisibility();
  await telegramSdkPromise;
  syncRuntimeClasses();
  initTelegramViewport();
  initMobileWebBottomNavBehavior();
  setEnvHint();
  refreshAuthButtons();
  if (apiBaseInput) {
    apiBaseInput.value = state.apiBase;
  }
  renderGenerationChips();
  bindEvents();
  setReferencePromptNote(defaultReferencePromptNote());
  renderSelectedTemplateCard();
  renderReferenceImage();
  renderSelectedSourceImage();
  renderPromptControls();
  refreshGenerationCostNote();
  refreshIcons();
  renderIdentityActions();
  renderAdminAccess();
  renderAdminTabs();
  resetAdminTemplateDraft();
  renderCampaignDraftVisibility();
  resetCampaignDraft();
  resetOfferDraft();
  renderCampaignPreviewStats(null);
  renderAuthGateActions();

  let authBridgeResult = { consumed: false, success: false };
  try {
    authBridgeResult = consumeAuthBridgeResult();
  } catch (error) {
    state.accessToken = "";
    state.refreshToken = "";
    state.isCookieSession = false;
    state.lastAuthProvider = "";
    saveState();
    setNote(userFacingErrorMessage(error, "Не удалось завершить вход через внешний сервис."), true);
  }

  if (authBridgeResult.consumed && !authBridgeResult.success) {
    await apiBasePromise;
    setAuthGateVisible(true);
    await loadPrivateData();
    await loadHistory();
    ensurePublicDataLoaded({ notifyOnError: true }).catch(() => {});
    switchScreen("feed");
    setBootPending(false);
    return;
  }

  await apiBasePromise;
  trackProductEvent("app_opened", {
    source: isTelegramMiniAppRuntime() ? "telegram" : "web",
  });

  try {
    const consumedGoogleCallback = await consumeGoogleOidcCallback();
    if (consumedGoogleCallback) {
      setAuthGateVisible(hasActiveSession() ? false : true);
      if (!hasActiveSession()) {
        await loadPrivateData();
        await loadHistory();
        ensurePublicDataLoaded({ notifyOnError: true }).catch(() => {});
        switchScreen("feed");
      }
      setBootPending(false);
      return;
    }
  } catch (error) {
    state.accessToken = "";
    state.refreshToken = "";
    state.isCookieSession = false;
    state.lastAuthProvider = "";
    saveState();
    setNote(userFacingErrorMessage(error, "Вход через Google больше не поддерживается."), true);
  }

  try {
    const consumedYandexCallback = await consumeYandexOauthCallback();
    if (consumedYandexCallback && hasActiveSession()) {
      setAuthGateVisible(false);
      setBootPending(false);
      return;
    }
  } catch (error) {
    state.accessToken = "";
    state.refreshToken = "";
    state.isCookieSession = false;
    state.lastAuthProvider = "";
    clearYandexOauthSession();
    saveState();
    setNote(userFacingErrorMessage(error, "Не удалось выполнить вход через Яндекс."), true);
  }

  let authorized = false;
  if (state.accessToken || (prefersCookieAuth() && hasSessionBootstrapHint())) {
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
    syncAcquisitionTouch({ auth: true }).catch(() => {});
    setAuthGateVisible(false);
    ensurePublicDataLoaded({ notifyOnError: true }).catch(() => {});
  } else {
    state.accessToken = "";
    state.refreshToken = "";
    state.isCookieSession = false;
    state.lastAuthProvider = "";
    saveState();
    await loadPrivateData();
    await loadHistory();
    resumePendingTelegramWebLogin();
    ensurePublicDataLoaded({ notifyOnError: true }).catch(() => {});
  }

  const autoGoogle = new URLSearchParams(window.location.search).get("google_auto");
  if (autoGoogle === "1" && !isTelegramMiniAppRuntime() && !hasActiveSession()) {
    setAuthGateVisible(true);
    setBootPending(false);
    setNote("Вход через Google больше не поддерживается. Используйте Яндекс или Telegram.", true);
    return;
  }

  const autoYandex = new URLSearchParams(window.location.search).get("yandex_auto");
  if (autoYandex === "1" && !isTelegramMiniAppRuntime() && !hasActiveSession()) {
    setAuthGateVisible(true);
    setBootPending(false);
    window.setTimeout(() => {
      loginViaYandex().catch(() => {});
    }, 150);
    return;
  }

  if (authorized) {
    switchScreen("feed");
  } else {
    setAuthGateVisible(true);
    setNote("Войди через Яндекс или Telegram, чтобы начать.");
    switchScreen("feed");
  }
  setBootPending(false);
}

bootstrap();
