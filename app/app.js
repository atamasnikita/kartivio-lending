const STORAGE_KEYS = {
  apiBase: "kartivio.api_base",
  accessToken: "kartivio.access_token",
  refreshToken: "kartivio.refresh_token",
  lastAuthProvider: "kartivio.last_auth_provider",
  telegramWebLoginToken: "kartivio.telegram_web_login_token",
  acquisitionAnonymousId: "kartivio.acquisition_anonymous_id",
  acquisitionFirstTouch: "kartivio.acquisition_first_touch",
};

const DEFAULT_PROD_API_BASE = "https://api.kartivio-ai.ru";
const DEFAULT_LOCAL_API_BASE = "http://127.0.0.1:8093";
const GOOGLE_CLIENT_ID_META_NAME = "kartivio-google-client-id";
const YANDEX_CLIENT_ID_META_NAME = "kartivio-yandex-client-id";
const GOOGLE_OIDC_AUTHORIZE_URL = "https://accounts.google.com/o/oauth2/v2/auth";
const YANDEX_OAUTH_AUTHORIZE_URL = "https://oauth.yandex.com/authorize";
const GOOGLE_OIDC_STORAGE_KEYS = {
  state: "kartivio.google_oidc_state",
  nonce: "kartivio.google_oidc_nonce",
  returnTo: "kartivio.google_oidc_return_to",
};
const YANDEX_OAUTH_STORAGE_KEYS = {
  state: "kartivio.yandex_oauth_state",
  verifier: "kartivio.yandex_oauth_verifier",
  returnTo: "kartivio.yandex_oauth_return_to",
};
const MAX_SOURCE_IMAGES = 3;
const PROMPT_MAX_LENGTH = 3000;
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
  "gpt-image-2": "Архив",
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

const MODEL_ORDER = ["gemini-3.1-flash-image-preview", "gemini-3-pro-image-preview"];
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
  unsupported_campaign_media_type: "Для рассылки подходят только PNG, JPG и WEBP.",
  campaign_media_too_large: "Файл для рассылки слишком большой. Используй изображение до 10 MB.",
  unsupported_campaign_kind: "Выбран неподдерживаемый тип кампании.",
  promo_discount_offer_required: "Для кампании со скидкой нужно выбрать оффер.",
  promo_offer_not_found: "Оффер не найден.",
  test_chat_id_required: "Нужен Telegram chat id для тестовой отправки.",
  promo_offer_code_taken: "Такой код оффера уже существует.",
  promo_offer_redemptions_unsupported: "Сейчас поддерживается только 1 использование на пользователя.",
  payment_not_found: "Платеж не найден.",
  unknown_package: "Пакет не найден. Выбери один из доступных.",
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
  selectedTemplateFilter: "all",
  templateVisibleCount: 0,
  templateRenderKey: "",
  activeTemplateModalId: "",
  activeTemplateModalItem: null,
  topups: [],
  selectedTopupCode: "",
  linkedProviders: new Set(),
  acquisitionTouch: null,
  telegramLinkToken: "",
  telegramLinkPollTimer: null,
  telegramWebLoginToken: "",
  telegramWebLoginPollTimer: null,
  sourceImageFiles: [],
  sourceImagePreviewUrls: [],
  historyItems: null,
  historyLoadedAt: 0,
  historyLoadPromise: null,
  historyRequestToken: 0,
  historyNextOffset: 0,
  historyHasMore: false,
  adminTab: "campaigns",
  adminCampaigns: [],
  adminOffers: [],
  selectedAdminCampaignId: "",
  adminCampaignPreview: null,
  adminCampaignDraftKind: "new_templates",
};

let tg = window.Telegram && window.Telegram.WebApp ? window.Telegram.WebApp : null;
const TELEGRAM_BOT_URL = "https://t.me/kartivio_ai_bot";
const HISTORY_CACHE_TTL_MS = 15_000;
const HISTORY_PAGE_SIZE = 50;
const TEMPLATE_FEED_INCREMENTAL_THRESHOLD = 24;
const TEMPLATE_FEED_INITIAL_BATCH_SIZE = 18;
const TEMPLATE_FEED_BATCH_SIZE = 18;

const bootSplash = document.getElementById("bootSplash");
const appShell = document.getElementById("appShell");
const appMain = document.querySelector(".app-main");
const bottomNav = document.querySelector(".bottom-nav");
const authGate = document.getElementById("authGate");
const devPanel = document.getElementById("devPanel");
const apiBaseInput = document.getElementById("apiBaseInput");
const authButton = document.getElementById("authButton");
const authCheckButton = document.getElementById("authCheckButton");
const googleAuthButton = document.getElementById("googleAuthButton");
const yandexAuthButton = document.getElementById("yandexAuthButton");
const envHint = document.getElementById("envHint");
const authNote = document.getElementById("authNote");
const userName = document.getElementById("userName");
const userTgId = document.getElementById("userTgId");
const creditsValue = document.getElementById("creditsValue");
const creditsBadge = document.getElementById("creditsBadge");
const profileAvatar = document.getElementById("profileAvatar");
const identityGoogle = document.getElementById("identityGoogle");
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
const marketingBackButton = document.getElementById("marketingBackButton");
const marketingAdminTabs = document.getElementById("marketingAdminTabs");
const marketingCampaignsPanel = document.getElementById("marketingCampaignsPanel");
const marketingOffersPanel = document.getElementById("marketingOffersPanel");
const campaignKindSelect = document.getElementById("campaignKindSelect");
const campaignTitleInput = document.getElementById("campaignTitleInput");
const campaignMessageInput = document.getElementById("campaignMessageInput");
const campaignCtaTextInput = document.getElementById("campaignCtaTextInput");
const campaignMediaFields = document.getElementById("campaignMediaFields");
const campaignMediaUrlInput = document.getElementById("campaignMediaUrlInput");
const campaignMediaFileInput = document.getElementById("campaignMediaFileInput");
const campaignMediaUploadButton = document.getElementById("campaignMediaUploadButton");
const campaignMediaUploadNote = document.getElementById("campaignMediaUploadNote");
const campaignMediaPreview = document.getElementById("campaignMediaPreview");
const campaignMediaPreviewImage = document.getElementById("campaignMediaPreviewImage");
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
const templateFilterChips = document.getElementById("templateFilterChips");
const templatesGrid = document.getElementById("templatesGrid");
const templateFeedPagination = document.getElementById("templateFeedPagination");
const templateFeedMoreButton = document.getElementById("templateFeedMoreButton");
const templateFeedMoreNote = document.getElementById("templateFeedMoreNote");
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
const historyPagination = document.getElementById("historyPagination");
const historyMoreButton = document.getElementById("historyMoreButton");
const historyMoreNote = document.getElementById("historyMoreNote");
const templateModal = document.getElementById("templateModal");
const templateModalClose = document.getElementById("templateModalClose");
const templateModalImage = document.getElementById("templateModalImage");
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
const navButtons = Array.from(document.querySelectorAll("[data-nav]"));
const jumpButtons = Array.from(document.querySelectorAll("[data-nav-target]"));
const screens = Array.from(document.querySelectorAll("[data-screen]"));
let googleAuthPending = false;
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

const TEMPLATE_FILTER_NEW = "new";
const TEMPLATE_FILTER_PRIORITY = ["Полезности", "Мужское", "Семейные"];
const ADMIN_CAMPAIGN_KIND_LABELS = Object.freeze({
  new_templates: "Новые шаблоны",
  promo_discount: "Персональный оффер",
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
      script.src = "https://telegram.org/js/telegram-web-app.js?62";
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
  if (isTelegramMiniAppRuntime() || !isMobileBrowser()) {
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

function googleClientIdFromMeta() {
  const queryClientId = String(new URLSearchParams(window.location.search).get("google_client_id") || "").trim();
  if (queryClientId && canOverrideApiBase()) {
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

function yandexAuthLaunchUrl() {
  const url = new URL(window.location.href);
  url.searchParams.set("yandex_auto", "1");
  return url.toString();
}

function currentReturnToUrl() {
  const url = new URL(window.location.href);
  url.searchParams.delete("google_auto");
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

function readSessionValue(key) {
  try {
    return String(window.sessionStorage.getItem(key) || "").trim();
  } catch (_error) {
    return "";
  }
}

function writeSessionValue(key, value) {
  try {
    window.sessionStorage.setItem(key, String(value || ""));
  } catch (_error) {
    // noop
  }
}

function clearGoogleOidcSession() {
  try {
    window.sessionStorage.removeItem(GOOGLE_OIDC_STORAGE_KEYS.state);
    window.sessionStorage.removeItem(GOOGLE_OIDC_STORAGE_KEYS.nonce);
    window.sessionStorage.removeItem(GOOGLE_OIDC_STORAGE_KEYS.returnTo);
  } catch (_error) {
    // noop
  }
}

function clearYandexOauthSession() {
  try {
    window.sessionStorage.removeItem(YANDEX_OAUTH_STORAGE_KEYS.state);
    window.sessionStorage.removeItem(YANDEX_OAUTH_STORAGE_KEYS.verifier);
    window.sessionStorage.removeItem(YANDEX_OAUTH_STORAGE_KEYS.returnTo);
  } catch (_error) {
    // noop
  }
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

function googleOidcAuthorizeUrl() {
  const clientId = googleClientIdFromMeta();
  if (!clientId) {
    return "";
  }
  const stateToken = randomBase64Url(24);
  const nonceToken = randomBase64Url(24);
  writeSessionValue(GOOGLE_OIDC_STORAGE_KEYS.state, stateToken);
  writeSessionValue(GOOGLE_OIDC_STORAGE_KEYS.nonce, nonceToken);
  writeSessionValue(GOOGLE_OIDC_STORAGE_KEYS.returnTo, currentReturnToUrl());

  const url = new URL(GOOGLE_OIDC_AUTHORIZE_URL);
  url.searchParams.set("client_id", clientId);
  url.searchParams.set("redirect_uri", oauthRedirectUri());
  url.searchParams.set("response_type", "id_token");
  url.searchParams.set("scope", "openid email profile");
  url.searchParams.set("state", stateToken);
  url.searchParams.set("nonce", nonceToken);
  url.searchParams.set("prompt", "select_account");
  return url.toString();
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
  writeSessionValue(YANDEX_OAUTH_STORAGE_KEYS.state, stateToken);
  writeSessionValue(YANDEX_OAUTH_STORAGE_KEYS.verifier, verifier);
  writeSessionValue(YANDEX_OAUTH_STORAGE_KEYS.returnTo, currentReturnToUrl());

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
  url.searchParams.delete("google_auto");
  window.history.replaceState({}, document.title, url.toString());
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
  const returnedState = String(params.get("state") || "").trim();
  const idToken = String(params.get("id_token") || "").trim();
  const oauthError = String(params.get("error") || "").trim();
  const oauthErrorDescription = String(params.get("error_description") || "").trim();
  const expectedState = readSessionValue(GOOGLE_OIDC_STORAGE_KEYS.state);
  const expectedNonce = readSessionValue(GOOGLE_OIDC_STORAGE_KEYS.nonce);
  const returnTo = readSessionValue(GOOGLE_OIDC_STORAGE_KEYS.returnTo) || currentReturnToUrl();

  if (!returnedState || !expectedState || returnedState !== expectedState) {
    if (oauthError || idToken) {
      stripGoogleCallbackArtifacts();
      clearGoogleOidcSession();
      setNote("Сессия входа через Google устарела. Запусти вход заново.", true);
      return true;
    }
    return false;
  }

  stripGoogleCallbackArtifacts();
  clearGoogleOidcSession();

  if (oauthError) {
    const description = oauthErrorDescription ? decodeURIComponent(oauthErrorDescription.replace(/\+/g, " ")) : "";
    setNote(description || "Не удалось завершить вход через Google.", true);
    return true;
  }
  if (!idToken) {
    setNote("Google не вернул данные для входа. Повтори попытку.", true);
    return true;
  }

  const tokenPayload = decodeJwtPayload(idToken);
  if (!tokenPayload || String(tokenPayload.nonce || "").trim() !== expectedNonce) {
    setNote("Не удалось подтвердить сессию Google. Повтори попытку.", true);
    return true;
  }

  await loginViaGoogleCredential(idToken);
  const url = new URL(returnTo);
  url.hash = "";
  url.searchParams.delete("google_auto");
  window.history.replaceState({}, document.title, url.toString());
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

  const expectedState = readSessionValue(YANDEX_OAUTH_STORAGE_KEYS.state);
  const verifier = readSessionValue(YANDEX_OAUTH_STORAGE_KEYS.verifier);
  const returnTo = readSessionValue(YANDEX_OAUTH_STORAGE_KEYS.returnTo) || currentReturnToUrl();

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
  if (canOverrideApiBase()) {
    localStorage.setItem(STORAGE_KEYS.apiBase, state.apiBase);
  } else {
    localStorage.removeItem(STORAGE_KEYS.apiBase);
  }
  if (prefersCookieAuth()) {
    localStorage.removeItem(STORAGE_KEYS.accessToken);
    localStorage.removeItem(STORAGE_KEYS.refreshToken);
  } else {
    localStorage.setItem(STORAGE_KEYS.accessToken, state.accessToken);
    localStorage.setItem(STORAGE_KEYS.refreshToken, state.refreshToken);
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
  if (prefersCookieAuth()) {
    state.accessToken = "";
    state.refreshToken = "";
    localStorage.removeItem(STORAGE_KEYS.accessToken);
    localStorage.removeItem(STORAGE_KEYS.refreshToken);
  } else {
    state.accessToken = localStorage.getItem(STORAGE_KEYS.accessToken) || "";
    state.refreshToken = localStorage.getItem(STORAGE_KEYS.refreshToken) || "";
  }
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
    throw new Error("Ссылка на изображение не найдена.");
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
    throw new Error("Изображение временно недоступно.");
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

async function downloadGenerationImage(jobId, fallbackBase = "kartivio-image") {
  const normalizedJobId = String(jobId || "").trim();
  if (!normalizedJobId) {
    throw new Error("Идентификатор генерации не найден.");
  }

  const { blob, contentType } = await authorizedBlobFetch(`/v1/generations/${normalizedJobId}/download`);
  const objectUrl = URL.createObjectURL(blob);
  const ext = extensionFromContentType(contentType || blob.type) || "png";
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
  if (target === "marketing" && !isAdminUser()) {
    setNote("Недостаточно прав для этого раздела.", true);
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
      setCreateNote(userFacingErrorMessage(error, "Не удалось загрузить историю."), true);
    });
  } else if (target === "marketing") {
    loadAdminData().catch((error) => {
      setCampaignFormNote(userFacingErrorMessage(error, "Не удалось загрузить кампании."), true);
    });
  } else if (target === "feed") {
    window.requestAnimationFrame(() => maybeAutoLoadMoreTemplates());
  }
}

function resetHistoryCache() {
  state.historyItems = null;
  state.historyLoadedAt = 0;
  state.historyLoadPromise = null;
  state.historyNextOffset = 0;
  state.historyHasMore = false;
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
    dropzoneTitle.textContent = "Добавьте свои фото";
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
  const isFullscreen = Boolean(tg.isFullscreen);
  let controlsOffset = 0;
  if (isMobile) {
    if (platform === "ios") {
      if (isFullscreen) {
        controlsOffset = 0;
      } else if (topInset > 0) {
        controlsOffset = 56;
      } else {
        controlsOffset = 104;
      }
    } else if (topInset > 0) {
      controlsOffset = 0;
    } else {
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
  if (googleAuthButton) {
    googleAuthButton.textContent = "Войти через Google";
    googleAuthButton.classList.toggle("is-hidden", !googleClientIdFromMeta());
  }
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
  state.adminCampaigns = [];
  state.adminOffers = [];
  state.selectedAdminCampaignId = "";
  state.adminCampaignPreview = null;
  resetHistoryCache();
  saveState();
  setAuthGateVisible(true);
  switchScreen("feed");
  await Promise.allSettled([loadPrivateData(), loadHistory(), loadTemplates()]);
  setNote("Сессия завершена. Войди снова через Google, Яндекс или Telegram.");
}

function renderIdentityActions() {
  const linkedTelegram = state.linkedProviders.has("telegram");
  if (identityTelegram) {
    identityTelegram.textContent = linkedTelegram ? "Подключен" : "Не подключен";
  }
  if (identityGoogle) {
    identityGoogle.textContent = state.linkedProviders.has("google") ? "Подключен" : "Не подключен";
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

function renderAdminAccess() {
  if (!adminAccessCard) {
    return;
  }
  adminAccessCard.classList.toggle("is-hidden", !isAdminUser());
}

function adminKindLabel(kind) {
  const normalized = String(kind || "").trim().toLowerCase();
  return ADMIN_CAMPAIGN_KIND_LABELS[normalized] || normalized || "Кампания";
}

function adminStatusLabel(status) {
  const normalized = String(status || "").trim().toLowerCase();
  return ADMIN_CAMPAIGN_STATUS_LABELS[normalized] || normalized || "—";
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
  const body = {
    kind,
    title: String(campaignTitleInput && campaignTitleInput.value || "").trim(),
    message_text: String(campaignMessageInput && campaignMessageInput.value || "").trim(),
    cta_text: normalizeDraftText(campaignCtaTextInput && campaignCtaTextInput.value),
    media_url: null,
    promo_offer_id: null,
  };
  if (kind === "new_templates") {
    body.media_url = normalizeDraftText(campaignMediaUrlInput && campaignMediaUrlInput.value);
  }
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
  const draft = buildCampaignDraftBody();
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
  if (draft.kind === "new_templates" && normalizeDraftText(selected.media_url) !== normalizeDraftText(draft.media_url)) {
    return true;
  }
  if (draft.kind === "promo_discount" && normalizeDraftText(selected.promo_offer_id) !== normalizeDraftText(draft.promo_offer_id)) {
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
  const summary = `Выбрана кампания: ${selected.title} · ${adminKindLabel(selected.kind)} · ${adminStatusLabel(selected.status)}`;
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
  if (campaignMediaFields) {
    campaignMediaFields.classList.toggle("is-hidden", isPromo);
  }
  if (campaignPromoOfferField) {
    campaignPromoOfferField.classList.toggle("is-hidden", !isPromo);
  }
  if (campaignMediaPreview && isPromo) {
    campaignMediaPreview.classList.add("is-hidden");
  }
  renderSelectedCampaignSummary();
}

function setCampaignMediaPreview(url) {
  const normalized = normalizeImageUrl(url);
  if (!campaignMediaPreview || !campaignMediaPreviewImage) {
    return;
  }
  if (!normalized) {
    campaignMediaPreview.classList.add("is-hidden");
    campaignMediaPreviewImage.removeAttribute("src");
    return;
  }
  campaignMediaPreviewImage.src = normalized;
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
    const meta = [
      `${adminKindLabel(item.kind)}`,
      `status: ${adminStatusLabel(item.status)}`,
      `sent ${item.sent_count || 0}`,
      `failed ${item.failed_count || 0}`,
    ].join(" · ");
    const preview = item.preview_sendable_count != null
      ? `Preview: ${item.preview_sendable_count}`
      : "Preview еще не считали";
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
          <span>${escapeHtml(formatAdminDateTime(item.created_at))}</span>
          ${hasMedia ? '<span class="plan-badge plan-badge-muted">photo</span>' : ""}
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

async function loadAdminOffers() {
  const payload = await authorizedFetch("/v1/admin/promo-offers?limit=100&offset=0");
  state.adminOffers = Array.isArray(payload.items) ? payload.items : [];
  renderOffersList();
  renderPromoOfferOptions();
}

async function loadAdminData() {
  if (!isAdminUser()) {
    return;
  }
  await Promise.all([loadAdminCampaigns(), loadAdminOffers()]);
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
    credentials: "include",
    headers,
    body: body !== undefined ? JSON.stringify(body) : undefined,
  });
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
    credentials: "include",
    headers,
    body: formData,
  });
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

async function resolveApiBase() {
  const baseCandidates = [state.apiBase, DEFAULT_PROD_API_BASE, window.location.origin];
  const candidates = uniqueApiBases(baseCandidates);

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
  if (!state.refreshToken && !prefersCookieAuth()) {
    return false;
  }
  try {
    const body = state.refreshToken ? { refresh_token: state.refreshToken } : undefined;
    const payload = await apiFetch("/v1/auth/refresh", {
      method: "POST",
      body,
    });
    if (prefersCookieAuth()) {
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
  const balance = Number(wallet.balance_credits || 0);

  state.me = me;
  userName.textContent = display;
  userTgId.textContent = tgId;
  creditsValue.textContent = formatCredits(balance);
  creditsBadge.textContent = String(balance);
  profileAvatar.textContent = display === "—" ? "K" : display[0].toUpperCase();
  renderIdentityActions();
  renderAdminAccess();
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
  if (!hasActiveSession()) {
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
    setPlansNote(userFacingErrorMessage(error, "Не удалось создать платеж."), true);
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
    const nb2Count = Number(item.nb2_images || Math.floor(credits / (MODEL_COSTS["gemini-3.1-flash-image-preview"] || 1)));
    const nbproCount = Number(item.nbpro_images || Math.floor(credits / (MODEL_COSTS["gemini-3-pro-image-preview"] || 1)));
    const isPopular = Boolean(item.is_popular);
    const valueDiscountPercent = Number(item.value_discount_percent || 0);
    const badges = [];
    if (isPopular) {
      badges.push('<span class="plan-badge">Популярный</span>');
    }
    if (valueDiscountPercent > 0) {
      badges.push(`<span class="plan-badge plan-badge-muted">Выгода ${valueDiscountPercent}%</span>`);
    }
    const badgeHtml = badges.length ? `<div class="plan-badges">${badges.join("")}</div>` : "";
    const card = document.createElement("article");
    card.className = "plan-card";
    if (isPopular) {
      card.classList.add("is-popular");
    }
    card.dataset.code = item.code;
    card.innerHTML = `
      <div class="plan-title-row">
        <div class="plan-title-copy">
          ${badgeHtml}
          <h3>${escapeHtml(item.title)}</h3>
        </div>
        <span class="chip">${escapeHtml(formatCredits(item.credits))}</span>
      </div>
      <div class="plan-price">${escapeHtml(item.price_rub)} ₽</div>
      <div class="plan-stats">
        <div>${nb2Count} фото Nano Banana 2</div>
        <div>${nbproCount} фото Nano Banana Pro</div>
      </div>
    `;
    card.addEventListener("click", () => selectTopup(item.code));
    plansGrid.appendChild(card);
  }
  const defaultCode = topups.find((item) => item.is_popular)?.code || topups[0].code;
  selectTopup(defaultCode);
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
    usage_count: templateUsageCount(item),
    likes_count: templateLikesCount(item),
    liked_by_me: templateLikedByMe(item),
  };
  promptInput.value = item.prompt || "";
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
  state.activeTemplateModalId = item.id;
  state.activeTemplateModalItem = { ...item };
  if (!templateModal) {
    return;
  }
  const previewUrl = String(initialPreviewUrl || "").trim() || templatePreviewUrl(item) || "https://picsum.photos/seed/kartivio-template/720/960";
  const fullUrl = templateFullUrl(item) || previewUrl;
  const currentToken = templateModalImageLoadToken + 1;
  templateModalImageLoadToken = currentToken;
  templateModalImage.classList.add("is-loading");
  templateModalImage.src = previewUrl;
  if (fullUrl === previewUrl) {
    templateModalImage.classList.remove("is-loading");
  } else {
    const preloader = new Image();
    preloader.decoding = "async";
    preloader.onload = () => {
      if (currentToken !== templateModalImageLoadToken) {
        return;
      }
      templateModalImage.src = fullUrl;
      templateModalImage.classList.remove("is-loading");
    };
    preloader.onerror = () => {
      if (currentToken !== templateModalImageLoadToken) {
        return;
      }
      templateModalImage.classList.remove("is-loading");
    };
    preloader.src = fullUrl;
  }
  templateModalImage.alt = item.title || "Шаблон";
  templateModalTitle.textContent = item.title || "Шаблон";
  templateModalCategory.textContent = normalizeTemplateCategory(item.category);
  renderTemplateModalStats(item);
  templateModalPrompt.textContent = item.prompt || "";
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

function renderTemplateFilters() {
  if (!templateFilterChips) {
    return;
  }
  bindTemplateFilterScroller();
  const filters = templateFilters();
  if (!filters.includes(state.selectedTemplateFilter)) {
    state.selectedTemplateFilter = "all";
  }
  templateFilterChips.innerHTML = "";

  for (const filterId of filters) {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "template-filter-chip";
    if (isNewestTemplateFilter(filterId)) {
      button.classList.add("is-promoted");
    }
    button.innerHTML = isNewestTemplateFilter(filterId)
      ? `<span>${escapeHtml(templateFilterLabel(filterId))}</span>`
      : `
      <span>${escapeHtml(templateFilterLabel(filterId))}</span>
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
    templateFilterChips.appendChild(button);
  }
  window.requestAnimationFrame(updateTemplateFilterScroller);
  refreshIcons();
}

function filteredTemplateItems() {
  if (isNewestTemplateFilter(state.selectedTemplateFilter)) {
    return [...state.templates].sort((left, right) => {
      const leftCreatedAt = Number(left.created_at_ts || 0);
      const rightCreatedAt = Number(right.created_at_ts || 0);
      if (leftCreatedAt !== rightCreatedAt) {
        return rightCreatedAt - leftCreatedAt;
      }
      return String(right.id || "").localeCompare(String(left.id || ""), "ru");
    });
  }
  if (state.selectedTemplateFilter === "all") {
    return state.templates;
  }
  if (isFavoritesTemplateFilter(state.selectedTemplateFilter)) {
    return state.templates.filter((item) => templateLikedByMe(item));
  }
  return state.templates.filter((item) => normalizeTemplateCategory(item.category) === state.selectedTemplateFilter);
}

function templateRenderKey(items) {
  const list = Array.isArray(items) ? items : [];
  const firstId = String(list[0]?.id || "");
  const lastId = String(list[list.length - 1]?.id || "");
  return `${state.selectedTemplateFilter}:${list.length}:${firstId}:${lastId}`;
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
  const items = filteredTemplateItems();
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
    if (state.currentScreen !== "feed" || state.templatesLoading) {
      return;
    }
    const items = filteredTemplateItems();
    if (!shouldPaginateTemplateFeed(items) || state.templateVisibleCount >= items.length) {
      return;
    }
    const metrics = getPrimaryScrollMetrics();
    const distanceToBottom = metrics.scrollHeight - (metrics.scrollTop + metrics.clientHeight);
    if (distanceToBottom > 420) {
      return;
    }
    if (revealMoreTemplateItems()) {
      window.requestAnimationFrame(() => maybeAutoLoadMoreTemplates());
    }
  });
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
  const visibleItems = visibleTemplateItems(items);
  if (state.templatesLoading) {
    renderTemplateSkeleton(visibleItems.length || items.length || 6);
    renderTemplateFeedPagination({ shownCount: 0, totalCount: items.length });
    return;
  }
  templatesGrid.innerHTML = "";
  if (!items.length) {
    const emptyTitle = isFavoritesTemplateFilter(state.selectedTemplateFilter)
      ? "Пока нет избранных шаблонов"
      : "Нет шаблонов";
    const emptyText = isFavoritesTemplateFilter(state.selectedTemplateFilter)
      ? "Лайкни понравившиеся идеи в ленте."
      : "Попробуй другой фильтр";
    templatesGrid.innerHTML = `<article class="tool-card"><div class="tool-overlay"><strong>${escapeHtml(emptyTitle)}</strong><p>${escapeHtml(emptyText)}</p></div></article>`;
    renderTemplateFeedPagination({ shownCount: 0, totalCount: 0 });
    return;
  }

  const fragment = document.createDocumentFragment();
  for (const item of visibleItems) {
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
      const cardImage = card.querySelector("img");
      const initialPreviewUrl = cardImage && typeof cardImage.currentSrc === "string" ? cardImage.currentSrc : imageUrl;
      openTemplateModal(item, initialPreviewUrl);
    });
    card.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        const cardImage = card.querySelector("img");
        const initialPreviewUrl = cardImage && typeof cardImage.currentSrc === "string" ? cardImage.currentSrc : imageUrl;
        openTemplateModal(item, initialPreviewUrl);
      }
    });
    fragment.appendChild(card);
  }
  templatesGrid.appendChild(fragment);
  renderTemplateFeedPagination({ shownCount: visibleItems.length, totalCount: items.length });
  refreshIcons();
  maybeAutoLoadMoreTemplates();
}

function renderTemplates(payload) {
  const items = Array.isArray(payload && payload.items) ? payload.items : [];
  const normalized = items.map((item) => ({
    id: String(item.id || "").trim(),
    title: String(item.title || "").trim() || "Шаблон",
    category: normalizeTemplateCategory(item.category),
    prompt: String(item.prompt || "").trim(),
    created_at: String(item.created_at || "").trim(),
    preview_image_url: String(item.preview_image_url || "").trim(),
    full_image_url: String(item.full_image_url || "").trim(),
    preview_width: Number(item.preview_width || 0),
    preview_height: Number(item.preview_height || 0),
    usage_count: normalizeTemplateCount(item.usage_count),
    likes_count: normalizeTemplateCount(item.likes_count),
    liked_by_me: Boolean(item.liked_by_me),
  })).filter((item) => item.id && item.prompt);
  state.templates = normalized.map((item) => ({
    ...item,
    preview_ratio: templatePreviewRatio(item),
    created_at_ts: Date.parse(item.created_at || "") || 0,
  }));
  if (state.selectedTemplateId) {
    const selected = state.templates.find((item) => item.id === state.selectedTemplateId);
    if (selected) {
      state.selectedTemplate = { ...selected };
      renderSelectedTemplateCard();
    }
  }
  if (state.activeTemplateModalId) {
    const modalItem = state.templates.find((item) => item.id === state.activeTemplateModalId);
    if (modalItem) {
      state.activeTemplateModalItem = { ...modalItem };
      renderTemplateModalStats(modalItem);
    }
  }
  state.templatesLoading = false;
  renderTemplateFilters();
  renderTemplateCards();
}

async function loadTemplates() {
  const payload = await apiFetch("/v1/templates", { auth: Boolean(state.accessToken) });
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

async function renderActiveImage(job, renderToken) {
  try {
    const rendered = await resolveDisplayImage(job.result_image_url);
    if (renderToken !== state.activeImageRenderToken) {
      return;
    }
    const canDownload = !isTelegramMiniAppRuntime();
    activeResult.className = "active-result active-result-has-image";
    activeResult.innerHTML = `
      <img src="${escapeHtml(rendered.src)}" alt="Результат генерации" />
      <div class="image-actions${canDownload ? "" : " image-actions-single"}">
        <button class="soft-btn btn-compact" data-action="open" type="button">Открыть изображение</button>
        ${canDownload ? '<button class="soft-btn btn-compact" data-action="download" type="button">Скачать</button>' : ""}
      </div>
    `;
    const openBtn = activeResult.querySelector('[data-action="open"]');
    openBtn.addEventListener("click", () => {
      openImage(job.result_image_url).catch((error) => {
        setCreateNote(userFacingErrorMessage(error, "Не удалось открыть изображение."), true);
      });
    });
    const downloadBtn = activeResult.querySelector('[data-action="download"]');
    if (downloadBtn) {
      downloadBtn.addEventListener("click", () => {
        downloadGenerationImage(job.id, `kartivio-${job.id}`).catch((error) => {
          setCreateNote(userFacingErrorMessage(error, "Не удалось скачать изображение."), true);
        });
      });
    }
  } catch (error) {
    if (renderToken !== state.activeImageRenderToken) {
      return;
    }
    activeResult.className = "active-result empty-result";
    activeResult.textContent = userFacingErrorMessage(error, "Изображение временно недоступно.");
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
  activeResult.textContent =
    job.status === "failed" ? generationErrorMessage(job.error_code) : "Задача выполняется.";
}

function historyThumb(job) {
  if (!job.result_image_url) {
    return escapeHtml(jobStatusLabel(job.status));
  }
  return "Превью";
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
    historyList.innerHTML = '<article class="history-item"><div class="history-body">История пока пустая.</div></article>';
    renderHistoryPagination({ hasMore: false, loadingMore: false, itemCount: 0 });
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
          ${canDownload ? `<button class="soft-btn btn-compact" data-action="download-image" type="button" ${job.result_image_url ? "" : "disabled"}>Скачать</button>` : ""}
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
        setCreateNote(userFacingErrorMessage(error, "Не удалось открыть изображение."), true);
      });
    });
    const downloadButton = item.querySelector('[data-action="download-image"]');
    if (downloadButton) {
      downloadButton.addEventListener("click", () => {
        if (!job.result_image_url) {
          return;
        }
        downloadGenerationImage(job.id, `kartivio-${job.id}`).catch((error) => {
          setCreateNote(userFacingErrorMessage(error, "Не удалось скачать изображение."), true);
        });
      });
    }
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
  renderHistoryPagination({ hasMore, loadingMore, itemCount: items.length });
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

async function loadPublicData() {
  const [plansPayload, templatesPayload] = await Promise.all([
    apiFetch("/v1/plans"),
    apiFetch("/v1/templates", { auth: Boolean(state.accessToken) }),
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
    renderIdentityActions();
    renderAdminAccess();
    return;
  }
  const [me, wallet] = await Promise.all([
    authorizedGetWithRetry("/v1/me", 1),
    authorizedGetWithRetry("/v1/wallet?limit=1", 1),
  ]);
  if (prefersCookieAuth()) {
    state.isCookieSession = true;
  } else {
    state.isCookieSession = false;
  }
  await loadIdentities();
  renderUser(me, wallet);
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

async function createEditGeneration(prompt, imageModel, outputSize, sourceImages, clientRequestId) {
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
    await Promise.allSettled([loadPrivateData(), loadHistory({ forceServerCheck: true }), loadTemplates()]);
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
    setCreateNote(`Задача создана: ${jobStatusLabel(job.status)}.`);
    await Promise.allSettled([loadPrivateData(), loadHistory({ forceServerCheck: true }), loadTemplates()]);
    await pollActiveJob(job.id);
  } catch (error) {
    setCreateNote(userFacingErrorMessage(error, "Не удалось запустить генерацию."), true);
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
      if (prefersCookieAuth()) {
        state.accessToken = "";
        state.refreshToken = "";
        state.isCookieSession = true;
      } else if (payload.access_token && payload.refresh_token) {
        state.accessToken = payload.access_token;
        state.refreshToken = payload.refresh_token;
        state.isCookieSession = false;
      } else {
        throw new Error("Не удалось получить токены входа.");
      }
      state.lastAuthProvider = "telegram";
      state.telegramWebLoginToken = "";
      clearTelegramWebLoginPolling();
      saveState();
      renderAuthGateActions();
      setAuthGateVisible(false);
      setNote(payload.message || "Вход через Telegram выполнен.");
      await Promise.all([loadPrivateData(), loadHistory({ forceServerCheck: true }), loadTemplates()]);
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
      await loadHistory({ forceServerCheck: true });
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
    await Promise.all([
      loadPrivateData({ forceServerCheck: prefersCookieAuth() }),
      loadHistory({ forceServerCheck: true }),
      loadTemplates(),
    ]);
    if (prefersCookieAuth()) {
      state.isCookieSession = true;
    }
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
    state.telegramWebLoginToken = "";
    clearTelegramWebLoginPolling();
    if (prefersCookieAuth()) {
      state.accessToken = "";
      state.refreshToken = "";
      state.isCookieSession = true;
    } else {
      state.accessToken = payload.access_token;
      state.refreshToken = payload.refresh_token;
      state.isCookieSession = false;
    }
    state.lastAuthProvider = "telegram";
    saveState();
    try {
      await syncAcquisitionTouch({ auth: true });
    } catch (_error) {
      // noop
    }
    setAuthGateVisible(false);
    if (!silent) {
      setNote("Авторизация успешна.");
    }
    await Promise.all([loadPrivateData(), loadHistory({ forceServerCheck: true }), loadTemplates()]);
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

function setGoogleAuthButtonIdle() {
  googleAuthPending = false;
  if (googleAuthButton) {
    googleAuthButton.disabled = false;
  }
  refreshAuthButtons();
}

function setYandexAuthButtonIdle() {
  yandexAuthPending = false;
  if (yandexAuthButton) {
    yandexAuthButton.disabled = false;
  }
  refreshAuthButtons();
}

async function loginViaGoogleCredential(idToken) {
  const payload = await apiFetch("/v1/auth/google", {
    method: "POST",
    body: { id_token: idToken },
  });
  state.telegramWebLoginToken = "";
  clearTelegramWebLoginPolling();
  if (prefersCookieAuth()) {
    state.accessToken = "";
    state.refreshToken = "";
    state.isCookieSession = true;
  } else {
    state.accessToken = payload.access_token;
    state.refreshToken = payload.refresh_token;
    state.isCookieSession = false;
  }
  state.lastAuthProvider = "google";
  saveState();
  try {
    await syncAcquisitionTouch({ auth: true });
  } catch (_error) {
    // noop
  }
  setAuthGateVisible(false);
  setNote("Авторизация через Google успешна.");
  await Promise.all([loadPrivateData(), loadHistory({ forceServerCheck: true }), loadTemplates()]);
  switchScreen("feed");
}

async function loginViaYandexCode(code, codeVerifier) {
  const payload = await apiFetch("/v1/auth/yandex", {
    method: "POST",
    body: { code, code_verifier: codeVerifier },
  });
  state.telegramWebLoginToken = "";
  clearTelegramWebLoginPolling();
  if (prefersCookieAuth()) {
    state.accessToken = "";
    state.refreshToken = "";
    state.isCookieSession = true;
  } else {
    state.accessToken = payload.access_token;
    state.refreshToken = payload.refresh_token;
    state.isCookieSession = false;
  }
  state.lastAuthProvider = "yandex";
  saveState();
  try {
    await syncAcquisitionTouch({ auth: true });
  } catch (_error) {
    // noop
  }
  setAuthGateVisible(false);
  setNote("Авторизация через Яндекс успешна.");
  await Promise.all([loadPrivateData(), loadHistory({ forceServerCheck: true }), loadTemplates()]);
  switchScreen("feed");
}

async function loginViaGoogle() {
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
  googleAuthButton.disabled = true;
  const url = googleOidcAuthorizeUrl();
  if (!url) {
    setGoogleAuthButtonIdle();
    setNote("Google login недоступен для этого окружения.", true);
    return;
  }
  setNote("Открываю Google...");
  window.location.assign(url);
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
  if (googleAuthButton) {
    googleAuthButton.addEventListener("click", loginViaGoogle);
  }
  if (yandexAuthButton) {
    yandexAuthButton.addEventListener("click", () => {
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
        setTemplateModalNote(userFacingErrorMessage(error, "Не удалось скопировать промпт."), true);
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
      state.adminTab = String(button.dataset.adminTab || "campaigns").trim() || "campaigns";
      renderAdminTabs();
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
  for (const input of [campaignTitleInput, campaignMessageInput, campaignCtaTextInput, campaignMediaUrlInput]) {
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
        setCampaignMediaUploadStatus(userFacingErrorMessage(error, "Не удалось загрузить файл."), true);
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
        setCampaignFormNote(userFacingErrorMessage(error, "Не удалось создать кампанию."), true);
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
        setCampaignFormNote(userFacingErrorMessage(error, "Не удалось построить preview."), true);
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
        setCampaignFormNote(userFacingErrorMessage(error, "Не удалось отправить тест."), true);
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
        setCampaignFormNote(userFacingErrorMessage(error, "Не удалось запустить кампанию."), true);
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
  promptInput.maxLength = PROMPT_MAX_LENGTH;
  setDevPanelVisibility();
  await ensureTelegramSdkLoaded();
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
  renderSelectedTemplateCard();
  renderSelectedSourceImage();
  refreshGenerationCostNote();
  refreshIcons();
  renderIdentityActions();
  renderAdminAccess();
  renderAdminTabs();
  renderCampaignDraftVisibility();
  resetCampaignDraft();
  resetOfferDraft();
  renderCampaignPreviewStats(null);
  renderAuthGateActions();

  try {
    await resolveApiBase();
    try {
      await syncAcquisitionTouch();
    } catch (_error) {
      // noop
    }
    refreshAuthButtons();
    await loadPublicData();
  } catch (error) {
    setNote(userFacingErrorMessage(error, "Не удалось загрузить данные приложения."), true);
  }

  try {
    const consumedGoogleCallback = await consumeGoogleOidcCallback();
    if (consumedGoogleCallback && hasActiveSession()) {
      setAuthGateVisible(false);
      setBootPending(false);
      return;
    }
  } catch (error) {
    state.accessToken = "";
    state.refreshToken = "";
    state.isCookieSession = false;
    state.lastAuthProvider = "";
    clearGoogleOidcSession();
    saveState();
    setNote(userFacingErrorMessage(error, "Не удалось выполнить вход через Google."), true);
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
  if (state.accessToken || prefersCookieAuth()) {
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
    try {
      await syncAcquisitionTouch({ auth: true });
    } catch (_error) {
      // noop
    }
    setAuthGateVisible(false);
  } else {
    state.accessToken = "";
    state.refreshToken = "";
    state.isCookieSession = false;
    state.lastAuthProvider = "";
    saveState();
    await loadPrivateData();
    await loadHistory();
    resumePendingTelegramWebLogin();
  }

  const autoGoogle = new URLSearchParams(window.location.search).get("google_auto");
  if (autoGoogle === "1" && !isTelegramMiniAppRuntime() && !hasActiveSession()) {
    setAuthGateVisible(true);
    setBootPending(false);
    window.setTimeout(() => {
      loginViaGoogle().catch(() => {});
    }, 150);
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
    setNote("Войди через Google, Яндекс или Telegram, чтобы начать.");
    switchScreen("feed");
  }
  setBootPending(false);
}

bootstrap();
