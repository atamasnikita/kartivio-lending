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

  function renderHero(heroRail, items) {
    if (!heroRail) {
      return;
    }
    const finalItems = normalizeHeroItems(items);
    const source = finalItems.length ? finalItems : HERO_FALLBACK;
    heroRail.innerHTML = "";
    for (let idx = 0; idx < source.length; idx += 1) {
      const item = source[idx];
      const image = document.createElement("img");
      const fallback = HERO_FALLBACK[idx % HERO_FALLBACK.length];
      image.src = item.src;
      image.alt = item.alt;
      image.loading = "lazy";
      image.decoding = "async";
      image.onerror = () => {
        if (image.dataset.fallbackApplied === "1") {
          return;
        }
        image.dataset.fallbackApplied = "1";
        image.src = fallback.src;
        image.alt = fallback.alt;
      };
      heroRail.appendChild(image);
    }
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
    applyHowImage(
      howBeforeImage,
      howBeforePlaceholder,
      manifest && manifest.how && manifest.how.before,
      HOW_FALLBACK.before
    );
    applyHowImage(howAfterImage, howAfterPlaceholder, manifest && manifest.how && manifest.how.after, HOW_FALLBACK.after);
  }

  document.addEventListener("DOMContentLoaded", initLandingMedia);
})();
