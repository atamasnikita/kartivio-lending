(function () {
  const MANIFEST_URL = "/assets/landing/manifest.json?v=20260704-paywall-1";

  const HERO_FALLBACK = [
    { src: "https://picsum.photos/seed/kartivio-1/420/560", alt: "Пример генерации 1" },
    { src: "https://picsum.photos/seed/kartivio-2/420/560", alt: "Пример генерации 2" },
    { src: "https://picsum.photos/seed/kartivio-3/420/560", alt: "Пример генерации 3" },
    { src: "https://picsum.photos/seed/kartivio-4/420/560", alt: "Пример генерации 4" },
    { src: "https://picsum.photos/seed/kartivio-5/420/560", alt: "Пример генерации 5" },
    { src: "https://picsum.photos/seed/kartivio-6/420/560", alt: "Пример генерации 6" },
    { src: "https://picsum.photos/seed/kartivio-7/420/560", alt: "Пример генерации 7" },
    { src: "https://picsum.photos/seed/kartivio-8/420/560", alt: "Пример генерации 8" },
  ];

  const HOW_FALLBACK = {
    before: {
      src: "https://picsum.photos/seed/kartivio-before/960/1280",
      alt: "Исходное фото",
    },
    after: {
      src: "https://picsum.photos/seed/kartivio-after/960/1280",
      alt: "Результат фотосессии",
    },
    results: [
      {
        src: "https://picsum.photos/seed/kartivio-after-a/960/1280",
        alt: "Результат фотосессии 1",
        title: "Первый результат",
      },
      {
        src: "https://picsum.photos/seed/kartivio-after-b/960/1280",
        alt: "Результат фотосессии 2",
        title: "Второй результат",
      },
      {
        src: "https://picsum.photos/seed/kartivio-after-c/960/1280",
        alt: "Результат фотосессии 3",
        title: "Третий результат",
      },
      {
        src: "https://picsum.photos/seed/kartivio-after-d/960/1280",
        alt: "Результат фотосессии 4",
        title: "Четвертый результат",
      },
    ],
    templates: [
      {
        title: "Весенний портрет",
        badge: "Весна",
        prompt:
          "Сохрани лицо и волосы, мягкий весенний свет, натуральную кожу и спокойный взгляд. Собери аккуратный портретный образ без лишней ретуши.",
      },
      {
        title: "Полевые цветы",
        badge: "Природа",
        prompt:
          "Сохрани лицо и черты, сделай теплый портрет среди полевых цветов, с мягким солнцем, естественной кожей и спокойным живым выражением.",
      },
      {
        title: "Ч/Б сцена",
        badge: "Ч/Б",
        prompt:
          "Сохрани лицо и волосы, переведи сцену в мягкий черно-белый портрет с пленочной фактурой, спокойным светом и аккуратным контрастом.",
      },
      {
        title: "Крупный портрет",
        badge: "Портрет",
        prompt:
          "Сохрани лицо, волосы и естественные черты. Сделай спокойный крупный портрет с мягким светом, чистой кожей и деликатной глубиной резкости.",
      },
    ],
    prompt:
      "Сохрани лицо и волосы, мягкий свет, натуральную кожу и спокойный взгляд. Собери аккуратный портретный образ без лишней ретуши.",
  };

  const mediaPreloadCache = new Map();
  const loadedMediaSources = new Set();

  const AUTH_STORAGE_KEYS = {
    apiBase: "kartivio.api_base",
    accessToken: "kartivio.access_token",
    refreshToken: "kartivio.refresh_token",
    lastAuthProvider: "kartivio.last_auth_provider",
    telegramWebLoginToken: "kartivio.telegram_web_login_token",
  };

  const DEFAULT_PROD_API_BASE = "https://api.kartivio-ai.ru";
  const DEFAULT_LOCAL_API_BASE = "http://127.0.0.1:8093";

  function trimApiBase(raw) {
    return String(raw || "")
      .trim()
      .replace(/\/+$/, "");
  }

  function isLocalHost() {
    const host = String(window.location.hostname || "").trim().toLowerCase();
    return host === "localhost" || host === "127.0.0.1";
  }

  function isNgrokHost() {
    const host = String(window.location.hostname || "").trim().toLowerCase();
    return host.endsWith(".ngrok-free.dev");
  }

  function pickLandingApiBase() {
    const queryApi = trimApiBase(new URLSearchParams(window.location.search).get("api"));
    if (queryApi) {
      return queryApi;
    }
    const storedApi = trimApiBase(localStorage.getItem(AUTH_STORAGE_KEYS.apiBase));
    if (isLocalHost()) {
      return storedApi || DEFAULT_LOCAL_API_BASE;
    }
    if (isNgrokHost()) {
      return storedApi || window.location.origin;
    }
    return DEFAULT_PROD_API_BASE;
  }

  function apiHeaders(apiBase, { accessToken = "", json = false } = {}) {
    const headers = {};
    if (accessToken) {
      headers.Authorization = `Bearer ${accessToken}`;
    }
    if (json) {
      headers["Content-Type"] = "application/json";
    }
    if (String(apiBase || "").includes(".ngrok-free.dev")) {
      headers["ngrok-skip-browser-warning"] = "1";
    }
    return headers;
  }

  async function fetchJson(apiBase, path, options = {}) {
    const method = options.method || "GET";
    const response = await fetch(`${apiBase}${path}`, {
      method,
      credentials: "include",
      headers: apiHeaders(apiBase, {
        accessToken: options.accessToken || "",
        json: Boolean(options.json),
      }),
      body: options.body ? JSON.stringify(options.body) : undefined,
    });
    let payload = null;
    try {
      payload = await response.json();
    } catch (_error) {
      payload = null;
    }
    return { ok: response.ok, status: response.status, payload };
  }

  function clearStoredSession() {
    localStorage.removeItem(AUTH_STORAGE_KEYS.accessToken);
    localStorage.removeItem(AUTH_STORAGE_KEYS.refreshToken);
    localStorage.removeItem(AUTH_STORAGE_KEYS.lastAuthProvider);
    localStorage.removeItem(AUTH_STORAGE_KEYS.telegramWebLoginToken);
  }

  function userInitial(displayName) {
    const label = String(displayName || "").trim();
    if (!label) {
      return "K";
    }
    return label[0].toUpperCase();
  }

  function compactDisplayName(displayName) {
    const label = String(displayName || "").trim();
    if (!label) {
      return "Профиль";
    }
    if (label.length <= 18) {
      return label;
    }
    return `${label.slice(0, 17)}…`;
  }

  function renderTopbarAuth(user) {
    const cta = document.getElementById("topbarOpenAppCta");
    const profileLink = document.getElementById("topbarProfileLink");
    const profileAvatar = document.getElementById("topbarProfileAvatar");
    const profileName = document.getElementById("topbarProfileName");
    if (!cta || !profileLink || !profileAvatar || !profileName) {
      return;
    }

    if (!user) {
      cta.classList.remove("is-hidden");
      profileLink.classList.add("is-hidden");
      return;
    }

    const displayName = String(user.display_name || user.name || user.email || "Профиль").trim();
    profileAvatar.textContent = userInitial(displayName);
    profileName.textContent = compactDisplayName(displayName);
    profileLink.classList.remove("is-hidden");
    cta.classList.add("is-hidden");
  }

  async function resolveLandingUser() {
    const apiBase = pickLandingApiBase();
    let meResponse = await fetchJson(apiBase, "/v1/me");
    if (meResponse.ok && meResponse.payload) {
      return meResponse.payload;
    }

    if (meResponse.status === 401) {
      const refreshByCookie = await fetchJson(apiBase, "/v1/auth/refresh", {
        method: "POST",
      });
      if (refreshByCookie.ok) {
        meResponse = await fetchJson(apiBase, "/v1/me");
        if (meResponse.ok && meResponse.payload) {
          return meResponse.payload;
        }
      }
    }

    // Fallback для старых сессий, где токены лежат в localStorage.
    const accessToken = String(localStorage.getItem(AUTH_STORAGE_KEYS.accessToken) || "").trim();
    if (!accessToken) {
      return null;
    }

    meResponse = await fetchJson(apiBase, "/v1/me", { accessToken });
    if (meResponse.ok && meResponse.payload) {
      return meResponse.payload;
    }

    if (meResponse.status !== 401) {
      return null;
    }

    const refreshToken = String(localStorage.getItem(AUTH_STORAGE_KEYS.refreshToken) || "").trim();
    if (!refreshToken) {
      clearStoredSession();
      return null;
    }

    const refreshResponse = await fetchJson(apiBase, "/v1/auth/refresh", {
      method: "POST",
      json: true,
      body: { refresh_token: refreshToken },
    });
    if (!refreshResponse.ok || !refreshResponse.payload) {
      clearStoredSession();
      return null;
    }

    const nextAccess = String(refreshResponse.payload.access_token || "").trim();
    const nextRefresh = String(refreshResponse.payload.refresh_token || "").trim();
    if (!nextAccess || !nextRefresh) {
      clearStoredSession();
      return null;
    }

    localStorage.setItem(AUTH_STORAGE_KEYS.accessToken, nextAccess);
    localStorage.setItem(AUTH_STORAGE_KEYS.refreshToken, nextRefresh);

    meResponse = await fetchJson(apiBase, "/v1/me", { accessToken: nextAccess });
    if (meResponse.ok && meResponse.payload) {
      return meResponse.payload;
    }
    return null;
  }

  async function initTopbarAuth() {
    renderTopbarAuth(null);
    try {
      const user = await resolveLandingUser();
      renderTopbarAuth(user);
    } catch (_error) {
      renderTopbarAuth(null);
    }
  }

  function normalizeHeroItems(items) {
    if (!Array.isArray(items)) {
      return [];
    }
    return items
      .filter((item) => item && typeof item.src === "string" && item.src.trim())
      .map((item, idx) => ({
        src: item.src.trim(),
        alt: typeof item.alt === "string" && item.alt.trim() ? item.alt.trim() : `Пример генерации ${idx + 1}`,
      }));
  }

  function normalizeMediaItems(items, { defaultAlt = "Пример изображения", defaultBadge = "" } = {}) {
    if (!Array.isArray(items)) {
      return [];
    }
    return items
      .filter((item) => item && typeof item.src === "string" && item.src.trim())
      .map((item, idx) => ({
        src: item.src.trim(),
        alt: typeof item.alt === "string" && item.alt.trim() ? item.alt.trim() : `${defaultAlt} ${idx + 1}`,
        title: typeof item.title === "string" && item.title.trim() ? item.title.trim() : "",
        badge: typeof item.badge === "string" && item.badge.trim() ? item.badge.trim() : defaultBadge,
      }));
  }

  function normalizeHowTemplates(templates) {
    if (!Array.isArray(templates)) {
      return [];
    }
    return templates
      .map((item, idx) => {
        if (typeof item === "string") {
          const title = item.trim();
          if (!title) {
            return null;
          }
          return {
            id: `template-${idx + 1}`,
            title,
            badge: "",
            src: "",
            alt: title,
            prompt: "",
          };
        }
        if (!item || typeof item !== "object") {
          return null;
        }
        const title = typeof item.title === "string" && item.title.trim() ? item.title.trim() : "";
        if (!title) {
          return null;
        }
        return {
          id: typeof item.id === "string" && item.id.trim() ? item.id.trim() : `template-${idx + 1}`,
          title,
          badge: typeof item.badge === "string" && item.badge.trim() ? item.badge.trim() : "",
          src: typeof item.src === "string" && item.src.trim() ? item.src.trim() : "",
          alt: typeof item.alt === "string" && item.alt.trim() ? item.alt.trim() : title,
          prompt: typeof item.prompt === "string" && item.prompt.trim() ? item.prompt.trim() : "",
        };
      })
      .filter(Boolean);
  }

  function preloadImageSource(src) {
    const key = String(src || "").trim();
    if (!key) {
      return Promise.resolve("");
    }
    if (mediaPreloadCache.has(key)) {
      return mediaPreloadCache.get(key);
    }

    const promise = new Promise((resolve, reject) => {
      const image = new Image();
      const finish = () => {
        loadedMediaSources.add(key);
        if (typeof image.decode === "function") {
          image.decode().catch(() => {}).finally(() => resolve(key));
          return;
        }
        resolve(key);
      };

      image.onload = finish;
      image.onerror = () => reject(new Error(`Failed to preload image: ${key}`));
      image.decoding = "async";
      image.src = key;

      if (image.complete && image.naturalWidth > 0) {
        finish();
      }
    }).catch((error) => {
      mediaPreloadCache.delete(key);
      throw error;
    });

    mediaPreloadCache.set(key, promise);
    return promise;
  }

  function normalizeShowcaseGroups(showcase) {
    const groups = Array.isArray(showcase && showcase.groups) ? showcase.groups : [];
    return groups
      .map((group, idx) => {
        const label = typeof group?.label === "string" && group.label.trim() ? group.label.trim() : `Подборка ${idx + 1}`;
        const items = normalizeMediaItems(group?.items, {
          defaultAlt: label,
          defaultBadge: label,
        });
        if (!items.length) {
          return null;
        }
        return {
          id: typeof group?.id === "string" && group.id.trim() ? group.id.trim() : `group-${idx + 1}`,
          label,
          eyebrow:
            typeof group?.eyebrow === "string" && group.eyebrow.trim() ? group.eyebrow.trim() : "Подборка",
          title: typeof group?.title === "string" && group.title.trim() ? group.title.trim() : label,
          description:
            typeof group?.description === "string" && group.description.trim()
              ? group.description.trim()
              : "Подборка актуальных кадров из сервиса.",
          items,
        };
      })
      .filter(Boolean);
  }

  function recalculateHeroLoop(heroRail) {
    if (!heroRail) {
      return;
    }
    const originalsCount = Number(heroRail.dataset.originalCount || 0);
    if (!originalsCount) {
      heroRail.classList.remove("is-loop-ready");
      return;
    }
    const images = heroRail.querySelectorAll("img");
    if (!images || images.length < originalsCount + 1) {
      heroRail.classList.remove("is-loop-ready");
      return;
    }
    const first = images[0];
    const firstClone = images[originalsCount];
    if (!first || !firstClone) {
      heroRail.classList.remove("is-loop-ready");
      return;
    }

    const loopDistance = firstClone.offsetLeft - first.offsetLeft;
    if (!Number.isFinite(loopDistance) || loopDistance <= 0) {
      heroRail.classList.remove("is-loop-ready");
      return;
    }

    // ~55 px/s: плавный скролл без ощущения рывка
    const durationSeconds = Math.max(18, Math.min(72, loopDistance / 55));
    heroRail.style.setProperty("--hero-loop-distance", `${Math.round(loopDistance)}px`);
    heroRail.style.setProperty("--hero-loop-duration", `${durationSeconds.toFixed(2)}s`);
    heroRail.classList.add("is-loop-ready");
  }

  function renderHero(heroRail, items) {
    if (!heroRail) {
      return;
    }
    const finalItems = normalizeHeroItems(items);
    const source = finalItems.length ? finalItems : HERO_FALLBACK;
    heroRail.innerHTML = "";
    heroRail.classList.remove("is-loop-ready");

    const appendImage = (item, idx, isClone) => {
      const image = document.createElement("img");
      const fallback = HERO_FALLBACK[idx % HERO_FALLBACK.length];
      image.src = item.src;
      image.alt = item.alt;
      image.loading = !isClone && idx < 2 ? "eager" : "lazy";
      image.fetchPriority = !isClone && idx < 2 ? "high" : "auto";
      image.decoding = "async";
      if (isClone) {
        image.setAttribute("aria-hidden", "true");
      }
      image.onerror = () => {
        if (image.dataset.fallbackApplied === "1") {
          return;
        }
        image.dataset.fallbackApplied = "1";
        image.src = fallback.src;
        image.alt = fallback.alt;
      };
      heroRail.appendChild(image);
    };

    for (let idx = 0; idx < source.length; idx += 1) {
      appendImage(source[idx], idx, false);
    }
    for (let idx = 0; idx < source.length; idx += 1) {
      appendImage(source[idx], idx, true);
    }

    heroRail.dataset.originalCount = String(source.length);
    requestAnimationFrame(() => recalculateHeroLoop(heroRail));
  }

  function applyHowImage(imageEl, placeholderEl, data, fallback) {
    if (!imageEl || !placeholderEl) {
      return;
    }
    const preferred = data && typeof data.src === "string" && data.src.trim() ? data : fallback;
    if (!preferred || !preferred.src) {
      return;
    }

    let currentSource = preferred;
    const fallbackUrl = fallback && typeof fallback.src === "string" && fallback.src.trim() ? fallback.src.trim() : "";

    const showImage = () => {
      imageEl.classList.remove("is-hidden");
      placeholderEl.classList.add("is-hidden");
    };

    const showPlaceholder = () => {
      imageEl.classList.add("is-hidden");
      placeholderEl.classList.remove("is-hidden");
    };

    const onError = () => {
      const nextFallback =
        currentSource !== fallback && fallbackUrl && imageEl.getAttribute("src") !== fallbackUrl ? fallback : null;
      if (nextFallback) {
        currentSource = nextFallback;
        imageEl.alt =
          typeof nextFallback.alt === "string" && nextFallback.alt.trim() ? nextFallback.alt.trim() : imageEl.alt;
        imageEl.src = fallbackUrl;
        return;
      }
      showPlaceholder();
    };

    imageEl.onload = showImage;
    imageEl.onerror = onError;

    imageEl.alt =
      typeof currentSource.alt === "string" && currentSource.alt.trim() ? currentSource.alt.trim() : imageEl.alt;
    imageEl.src = currentSource.src;

    if (imageEl.complete) {
      if (imageEl.naturalWidth > 0) {
        showImage();
      } else {
        onError();
      }
    }
  }

  function renderShowcase(showcaseSection, showcaseData) {
    const tabsRoot = document.getElementById("showcaseTabs");
    const gridRoot = document.getElementById("showcaseGrid");
    const eyebrowEl = document.getElementById("showcaseEyebrow");
    const titleEl = document.getElementById("showcaseTitle");
    const descriptionEl = document.getElementById("showcaseDescription");
    if (!showcaseSection || !tabsRoot || !gridRoot || !eyebrowEl || !titleEl || !descriptionEl) {
      return;
    }

    const groups = normalizeShowcaseGroups(showcaseData);
    if (!groups.length) {
      showcaseSection.hidden = true;
      return;
    }

    showcaseSection.hidden = false;
    let activeGroupId = groups[0].id;

    function renderGroup(group) {
      eyebrowEl.textContent = group.eyebrow;
      titleEl.textContent = group.title;
      descriptionEl.textContent = group.description;
      gridRoot.innerHTML = "";
      const visibleItems = group.items.slice(0, 6);
      for (const item of visibleItems) {
        const figure = document.createElement("figure");
        figure.className = "showcase-card";

        const image = document.createElement("img");
        image.src = item.src;
        image.alt = item.alt;
        image.loading = "lazy";
        image.decoding = "async";

        const caption = document.createElement("figcaption");
        caption.className = "showcase-card-caption";

        const title = document.createElement("span");
        title.className = "showcase-card-title";
        title.textContent = item.title || item.alt;

        caption.appendChild(title);
        figure.appendChild(image);
        figure.appendChild(caption);
        gridRoot.appendChild(figure);
      }
    }

    function syncTabs() {
      for (const button of tabsRoot.querySelectorAll(".showcase-tab")) {
        const isActive = button.dataset.groupId === activeGroupId;
        button.classList.toggle("is-active", isActive);
        button.setAttribute("aria-selected", isActive ? "true" : "false");
        button.setAttribute("tabindex", isActive ? "0" : "-1");
      }
      const activeGroup = groups.find((group) => group.id === activeGroupId) || groups[0];
      renderGroup(activeGroup);
    }

    tabsRoot.innerHTML = "";
    for (const group of groups) {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "showcase-tab";
      button.dataset.groupId = group.id;
      button.setAttribute("role", "tab");
      button.textContent = group.label;
      button.addEventListener("click", () => {
        activeGroupId = group.id;
        syncTabs();
      });
      tabsRoot.appendChild(button);
    }

    syncTabs();
  }

  function renderHowTemplates(root, promptEl, templates, fallbackPrompt) {
    if (!root) {
      return;
    }
    const normalizedTemplates = normalizeHowTemplates(templates);
    const values = normalizedTemplates.length ? normalizedTemplates : normalizeHowTemplates(HOW_FALLBACK.templates);
    const promptBox = promptEl ? promptEl.closest(".how-prompt-box") : null;
    let activeIndex = 0;

    root.innerHTML = "";
    if (!values.length) {
      if (promptEl) {
        promptEl.textContent = fallbackPrompt || HOW_FALLBACK.prompt;
      }
      return;
    }

    const buttons = [];

    function syncActive(index) {
      const item = values[index] || values[0];
      activeIndex = index;
      for (let idx = 0; idx < buttons.length; idx += 1) {
        buttons[idx].classList.toggle("is-active", idx === activeIndex);
      }
      if (promptEl) {
        if (promptBox) {
          promptBox.classList.add("is-switching");
        }
        promptEl.textContent = item.prompt || fallbackPrompt || HOW_FALLBACK.prompt;
        window.setTimeout(() => {
          promptBox?.classList.remove("is-switching");
        }, 170);
      }
    }

    for (let idx = 0; idx < values.length; idx += 1) {
      const item = values[idx];
      const button = document.createElement("button");
      button.type = "button";
      button.className = "how-template-card";
      if (!item.src) {
        button.classList.add("is-text-only");
      }

      if (item.src) {
        const image = document.createElement("img");
        image.src = item.src;
        image.alt = item.alt;
        image.loading = idx < 4 ? "eager" : "lazy";
        image.fetchPriority = idx === 0 ? "high" : "auto";
        image.decoding = "async";
        button.appendChild(image);
        preloadImageSource(item.src).catch(() => {});
      }

      const body = document.createElement("span");
      body.className = "how-template-card-body";

      if (item.badge) {
        const badge = document.createElement("span");
        badge.className = "how-template-card-badge";
        badge.textContent = item.badge;
        body.appendChild(badge);
      }

      const title = document.createElement("span");
      title.className = "how-template-card-title";
      title.textContent = item.title;
      body.appendChild(title);

      button.appendChild(body);
      button.addEventListener("click", () => syncActive(idx));
      buttons.push(button);
      root.appendChild(button);
    }

    syncActive(0);
  }

  function updateHowResultOrientation(imageEl) {
    if (!imageEl || imageEl.naturalWidth <= 0 || imageEl.naturalHeight <= 0) {
      return;
    }
    const ratio = imageEl.naturalWidth / imageEl.naturalHeight;
    imageEl.classList.toggle("is-portrait", ratio < 1);
    imageEl.classList.toggle("is-landscape", ratio >= 1);
  }

  function renderHowResults(stackRoot, placeholderEl, galleryRoot, resultItems, fallbackAfter) {
    if (!stackRoot || !placeholderEl || !galleryRoot) {
      return;
    }
    const normalized = normalizeMediaItems(resultItems, {
      defaultAlt: "Результат фотосессии",
      defaultBadge: "",
    });
    const source = normalized.length
      ? normalized.slice(0, 4)
      : normalizeMediaItems(HOW_FALLBACK.results, {
          defaultAlt: "Результат фотосессии",
          defaultBadge: "",
        }).slice(0, 4);
    const mainFallback = fallbackAfter && fallbackAfter.src ? fallbackAfter : HOW_FALLBACK.after;

    if (!source.length) {
      stackRoot.innerHTML = "";
      galleryRoot.innerHTML = "";
      return;
    }

    let activeIndex = 0;
    const mainImages = [];
    const thumbButtons = [];

    function syncActive(index) {
      const nextItem = source[index] || source[0];
      if (!nextItem) {
        return;
      }
      if (index === activeIndex) {
        return;
      }

      activeIndex = index;
      for (let idx = 0; idx < mainImages.length; idx += 1) {
        mainImages[idx].classList.toggle("is-visible", idx === activeIndex);
        mainImages[idx].setAttribute("aria-hidden", idx === activeIndex ? "false" : "true");
      }
      for (let idx = 0; idx < thumbButtons.length; idx += 1) {
        thumbButtons[idx].classList.toggle("is-active", idx === activeIndex);
      }
    }

    stackRoot.innerHTML = "";
    galleryRoot.innerHTML = "";
    for (let idx = 0; idx < source.length; idx += 1) {
      const item = source[idx];

      const mainImage = document.createElement("img");
      mainImage.className = "how-result-image";
      mainImage.alt = item.alt;
      mainImage.loading = "eager";
      mainImage.fetchPriority = idx === 0 ? "high" : "auto";
      mainImage.decoding = "async";
      mainImage.setAttribute("aria-hidden", idx === 0 ? "false" : "true");
      const handleMainImageReady = () => {
        updateHowResultOrientation(mainImage);
        loadedMediaSources.add(item.src);
        if (idx === 0) {
          placeholderEl.classList.add("is-hidden");
        }
      };
      mainImage.addEventListener("load", handleMainImageReady);
      mainImage.addEventListener("error", () => {
        if (item.src !== mainFallback.src) {
          mainImage.src = mainFallback.src;
        }
      });
      mainImage.src = item.src;
      if (idx === 0) {
        mainImage.classList.add("is-visible");
      }
      if (mainImage.complete && mainImage.naturalWidth > 0) {
        handleMainImageReady();
      }
      mainImages.push(mainImage);
      stackRoot.appendChild(mainImage);
      preloadImageSource(item.src).catch(() => {});

      const button = document.createElement("button");
      button.type = "button";
      button.className = "how-after-thumb";
      button.setAttribute("aria-label", item.title || item.alt);

      const image = document.createElement("img");
      image.src = item.src;
      image.alt = item.alt;
      image.loading = idx < 4 ? "eager" : "lazy";
      image.fetchPriority = idx === 0 ? "high" : "auto";
      image.decoding = "async";

      const label = document.createElement("span");
      label.className = "how-after-thumb-label";
      label.textContent = item.title || `Результат ${idx + 1}`;

      button.appendChild(image);
      button.appendChild(label);
      button.addEventListener("click", () => syncActive(idx));
      thumbButtons.push(button);
      galleryRoot.appendChild(button);
    }

    for (let idx = 0; idx < thumbButtons.length; idx += 1) {
      thumbButtons[idx].classList.toggle("is-active", idx === 0);
    }
  }

  function initHowFlow() {
    const root = document.getElementById("howFlow");
    if (!root) {
      return;
    }

    const stepButtons = Array.from(root.querySelectorAll(".how-step[data-how-step]"));
    const scenes = Array.from(root.querySelectorAll(".how-scene[data-how-scene]"));
    const stageCard = root.querySelector(".how-stage");
    if (!stepButtons.length || !scenes.length) {
      return;
    }

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const compactLayout = window.matchMedia("(max-width: 920px)");
    let currentStep = Number(stepButtons.find((button) => button.classList.contains("is-active"))?.dataset.howStep || 1);
    let autoplayTimer = null;
    let stageMeasureRaf = 0;
    let resizeDebounceTimer = 0;
    let autoplayStoppedByUser = false;
    let activeSceneObserver = null;

    function getActiveScene(step = currentStep) {
      return scenes.find((scene) => Number(scene.dataset.howScene) === step) || null;
    }

    function syncState(step) {
      currentStep = step;
      for (const button of stepButtons) {
        const isActive = Number(button.dataset.howStep) === step;
        button.classList.toggle("is-active", isActive);
        button.setAttribute("aria-selected", isActive ? "true" : "false");
        button.setAttribute("tabindex", isActive ? "0" : "-1");
      }
      for (const scene of scenes) {
        const isActive = Number(scene.dataset.howScene) === step;
        scene.classList.toggle("is-active", isActive);
        scene.setAttribute("aria-hidden", isActive ? "false" : "true");
        if (isActive) {
          scene.removeAttribute("hidden");
        } else {
          scene.setAttribute("hidden", "");
        }
      }
      observeActiveScene();
      scheduleStageMeasure();
    }

    function recalculateStageMinHeight() {
      if (!stageCard) {
        return;
      }
      if (compactLayout.matches) {
        stageCard.style.minHeight = "";
        return;
      }
      const activeScene = getActiveScene();
      if (!activeScene) {
        return;
      }
      const nextHeight = Math.ceil(activeScene.offsetHeight);
      if (nextHeight > 0) {
        stageCard.style.minHeight = `${nextHeight}px`;
      }
    }

    function scheduleStageMeasure() {
      if (!stageCard) {
        return;
      }
      if (stageMeasureRaf) {
        window.cancelAnimationFrame(stageMeasureRaf);
      }
      stageMeasureRaf = window.requestAnimationFrame(() => {
        stageMeasureRaf = 0;
        recalculateStageMinHeight();
      });
    }

    function observeActiveScene() {
      if (activeSceneObserver) {
        activeSceneObserver.disconnect();
        activeSceneObserver = null;
      }
      if (typeof window.ResizeObserver !== "function") {
        return;
      }
      const activeScene = getActiveScene();
      if (!activeScene) {
        return;
      }
      activeSceneObserver = new window.ResizeObserver(() => {
        scheduleStageMeasure();
      });
      activeSceneObserver.observe(activeScene);
    }

    function stopAutoplay() {
      if (autoplayTimer) {
        window.clearInterval(autoplayTimer);
        autoplayTimer = null;
      }
    }

    function startAutoplay() {
      if (reduceMotion || stepButtons.length < 2 || autoplayStoppedByUser) {
        return;
      }
      stopAutoplay();
      autoplayTimer = window.setInterval(() => {
        const activeIndex = stepButtons.findIndex((button) => Number(button.dataset.howStep) === currentStep);
        const nextIndex = activeIndex >= 0 ? (activeIndex + 1) % stepButtons.length : 0;
        const nextStep = Number(stepButtons[nextIndex].dataset.howStep);
        syncState(nextStep);
      }, 5000);
    }

    for (const button of stepButtons) {
      button.addEventListener("click", () => {
        const step = Number(button.dataset.howStep);
        if (!Number.isFinite(step)) {
          return;
        }
        autoplayStoppedByUser = true;
        stopAutoplay();
        syncState(step);
      });
    }

    document.addEventListener("visibilitychange", () => {
      if (document.hidden) {
        stopAutoplay();
        return;
      }
      startAutoplay();
    });

    const onResize = () => {
      if (resizeDebounceTimer) {
        window.clearTimeout(resizeDebounceTimer);
      }
      resizeDebounceTimer = window.setTimeout(() => {
        scheduleStageMeasure();
      }, 120);
    };
    window.addEventListener("resize", onResize, { passive: true });

    if (typeof window.ResizeObserver !== "function") {
      for (const image of root.querySelectorAll("img")) {
        image.addEventListener("load", scheduleStageMeasure);
      }
    }

    syncState(currentStep);
    startAutoplay();
  }

  function initProblemMobileToggle() {
    const section = document.getElementById("problems");
    if (!section) {
      return;
    }
    const toggles = Array.from(section.querySelectorAll(".problem-mobile-toggle button[data-problem-view]"));
    if (!toggles.length) {
      return;
    }

    function applyView(view) {
      section.setAttribute("data-mobile-view", view);
      for (const button of toggles) {
        const active = button.dataset.problemView === view;
        button.classList.toggle("is-active", active);
        button.setAttribute("aria-selected", active ? "true" : "false");
      }
    }

    for (const button of toggles) {
      button.addEventListener("click", () => {
        const view = button.dataset.problemView;
        if (!view) return;
        applyView(view);
      });
    }

    applyView("pain");
  }

  async function loadManifest() {
    try {
      const response = await fetch(MANIFEST_URL);
      if (!response.ok) {
        return null;
      }
      return await response.json();
    } catch (_error) {
      return null;
    }
  }

  async function initLandingMedia() {
    const showcaseSection = document.getElementById("showcase");
    const heroRail = document.getElementById("heroRail");
    const howBeforeImage = document.getElementById("howBeforeImage");
    const howBeforePlaceholder = document.getElementById("howBeforePlaceholder");
    const howAfterStack = document.getElementById("howAfterStack");
    const howAfterPlaceholder = document.getElementById("howAfterPlaceholder");
    const howAfterGallery = document.getElementById("howAfterGallery");
    const howTemplateList = document.getElementById("howTemplateList");
    const howPromptText = document.getElementById("howPromptText");

    const manifest = await loadManifest();
    initTopbarAuth().catch(() => {});

    renderHero(heroRail, manifest && manifest.hero);
    renderShowcase(showcaseSection, manifest && manifest.showcase);
    window.addEventListener("resize", () => recalculateHeroLoop(heroRail));
    applyHowImage(
      howBeforeImage,
      howBeforePlaceholder,
      manifest && manifest.how && manifest.how.before,
      HOW_FALLBACK.before
    );
    renderHowTemplates(
      howTemplateList,
      howPromptText,
      manifest && manifest.how && manifest.how.templates,
      (manifest && manifest.how && typeof manifest.how.prompt === "string" && manifest.how.prompt.trim()) ||
        HOW_FALLBACK.prompt
    );
    renderHowResults(
      howAfterStack,
      howAfterPlaceholder,
      howAfterGallery,
      manifest && manifest.how && manifest.how.results,
      (manifest && manifest.how && manifest.how.after) || HOW_FALLBACK.after
    );
    initHowFlow();
    initProblemMobileToggle();
  }

  document.addEventListener("DOMContentLoaded", initLandingMedia);
})();
