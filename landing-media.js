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
    const source = data && typeof data.src === "string" && data.src.trim() ? data : fallback;
    if (!source || !source.src) {
      return;
    }
    const alt = typeof source.alt === "string" && source.alt.trim() ? source.alt.trim() : imageEl.alt;
    imageEl.alt = alt;
    imageEl.onload = () => {
      imageEl.classList.remove("is-hidden");
      placeholderEl.classList.add("is-hidden");
    };
    imageEl.onerror = () => {
      if (source !== fallback && fallback && fallback.src) {
        imageEl.src = fallback.src;
        imageEl.alt = fallback.alt || imageEl.alt;
        return;
      }
      imageEl.classList.add("is-hidden");
      placeholderEl.classList.remove("is-hidden");
    };
    imageEl.src = source.src;
  }

  function initHowFlow() {
    const root = document.getElementById("howFlow");
    if (!root) {
      return;
    }

    const stepButtons = Array.from(root.querySelectorAll(".how-step[data-how-step]"));
    const scenes = Array.from(root.querySelectorAll(".how-scene[data-how-scene]"));
    if (!stepButtons.length || !scenes.length) {
      return;
    }

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let currentStep = Number(stepButtons.find((button) => button.classList.contains("is-active"))?.dataset.howStep || 1);
    let autoplayTimer = null;

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

    syncState(currentStep);
    startAutoplay();
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

    const manifest = await loadManifest();

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
  }

  document.addEventListener("DOMContentLoaded", initLandingMedia);
})();
