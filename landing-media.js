(function () {
  const MANIFEST_URL = "/assets/landing/manifest.json";

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
  };

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
    const accessToken = String(localStorage.getItem(AUTH_STORAGE_KEYS.accessToken) || "").trim();
    if (!accessToken) {
      return null;
    }

    const apiBase = pickLandingApiBase();
    let meResponse = await fetchJson(apiBase, "/v1/me", { accessToken });
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
      image.loading = "lazy";
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
      if (imageEl.naturalWidth > 0 && imageEl.naturalHeight > 0) {
        const ratio = imageEl.naturalWidth / imageEl.naturalHeight;
        if (imageEl.id === "howAfterImage") {
          imageEl.classList.toggle("is-portrait", ratio < 1);
          imageEl.classList.toggle("is-landscape", ratio >= 1);
        }
      }
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
    let currentStep = Number(stepButtons.find((button) => button.classList.contains("is-active"))?.dataset.howStep || 1);
    let autoplayTimer = null;
    let stageMeasureRaf = 0;
    let resizeDebounceTimer = 0;

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
    }

    function measureSceneHeight(scene) {
      const wasActive = scene.classList.contains("is-active");
      const wasHidden = scene.hasAttribute("hidden");
      const prevDisplay = scene.style.display;
      const prevPosition = scene.style.position;
      const prevInset = scene.style.inset;
      const prevVisibility = scene.style.visibility;
      const prevPointerEvents = scene.style.pointerEvents;
      const prevZIndex = scene.style.zIndex;

      scene.classList.add("is-active");
      scene.removeAttribute("hidden");
      scene.style.display = "grid";
      scene.style.position = "absolute";
      scene.style.inset = "0";
      scene.style.visibility = "hidden";
      scene.style.pointerEvents = "none";
      scene.style.zIndex = "-1";

      const measuredHeight = scene.offsetHeight;

      if (!wasActive) {
        scene.classList.remove("is-active");
      }
      if (wasHidden) {
        scene.setAttribute("hidden", "");
      }
      scene.style.display = prevDisplay;
      scene.style.position = prevPosition;
      scene.style.inset = prevInset;
      scene.style.visibility = prevVisibility;
      scene.style.pointerEvents = prevPointerEvents;
      scene.style.zIndex = prevZIndex;

      return measuredHeight;
    }

    function recalculateStageMinHeight() {
      if (!stageCard) {
        return;
      }
      const previousStep = currentStep;
      root.classList.add("is-measuring");
      let maxHeight = 0;
      for (const scene of scenes) {
        maxHeight = Math.max(maxHeight, measureSceneHeight(scene));
      }
      syncState(previousStep);
      root.classList.remove("is-measuring");
      if (maxHeight > 0) {
        stageCard.style.minHeight = `${Math.ceil(maxHeight)}px`;
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

    function startAutoplay() {
      if (reduceMotion || stepButtons.length < 2) {
        return;
      }
      if (autoplayTimer) {
        window.clearInterval(autoplayTimer);
      }
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
        syncState(step);
        scheduleStageMeasure();
        startAutoplay();
      });
    }

    document.addEventListener("visibilitychange", () => {
      if (document.hidden) {
        if (autoplayTimer) {
          window.clearInterval(autoplayTimer);
          autoplayTimer = null;
        }
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

    for (const image of root.querySelectorAll("img")) {
      image.addEventListener("load", scheduleStageMeasure);
    }

    syncState(currentStep);
    scheduleStageMeasure();
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
      const response = await fetch(MANIFEST_URL, { cache: "no-store" });
      if (!response.ok) {
        return null;
      }
      return await response.json();
    } catch (_error) {
      return null;
    }
  }

  async function initLandingMedia() {
    const heroRail = document.getElementById("heroRail");
    const howBeforeImage = document.getElementById("howBeforeImage");
    const howBeforePlaceholder = document.getElementById("howBeforePlaceholder");
    const howAfterImage = document.getElementById("howAfterImage");
    const howAfterPlaceholder = document.getElementById("howAfterPlaceholder");

    const [manifest] = await Promise.all([loadManifest(), initTopbarAuth()]);

    renderHero(heroRail, manifest && manifest.hero);
    window.addEventListener("resize", () => recalculateHeroLoop(heroRail));
    applyHowImage(
      howBeforeImage,
      howBeforePlaceholder,
      manifest && manifest.how && manifest.how.before,
      HOW_FALLBACK.before
    );
    applyHowImage(howAfterImage, howAfterPlaceholder, manifest && manifest.how && manifest.how.after, HOW_FALLBACK.after);
    initHowFlow();
    initProblemMobileToggle();
  }

  document.addEventListener("DOMContentLoaded", initLandingMedia);
})();
