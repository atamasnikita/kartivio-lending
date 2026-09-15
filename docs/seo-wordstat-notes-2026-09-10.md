# Wordstat Research Notes, 2026-09-10

Primary API used:
- `POST https://searchapi.api.cloud.yandex.net/v2/wordstat/topRequests`
- `POST https://searchapi.api.cloud.yandex.net/v2/wordstat/regions`
- `POST https://searchapi.api.cloud.yandex.net/v2/wordstat/dynamics`

Defaults used in tests:
- Region: `225` (Russia)
- Device: `DEVICE_ALL`
- API key: passed through `YANDEX_SEARCH_API_KEY`, not stored in the repo

## API Notes

The API key worked without `folderId` in the request body. `YANDEX_SEARCH_FOLDER_ID` is still supported by the local helper script if a future key requires it.

`topRequests` returns:
- `results`: top matching phrases with counts
- `associations`: related phrases, often noisy
- `totalCount`: total phrase count for the seed

`regions` works, but returns Yandex region ids rather than region names. A geobase mapping is needed before this is useful for reporting.

`dynamics` requires `period`, `fromDate`, and `toDate`. For `PERIOD_MONTHLY`, `toDate` must be the last day of a month.

## Tested Seeds

### Strong Product Cluster

Seed: `ии фотосессия`

| Count | Phrase |
| ---: | --- |
| 47,157 | фотосессия ии |
| 17,503 | ии фотосессия бесплатно |
| 9,531 | ии фотосессия по фото |
| 8,052 | промты для ии фотосессии |
| 7,984 | ии фотосессия по фото бесплатно |
| 5,631 | фотосессия ии онлайн |
| 2,554 | ии фотосессия по фото онлайн |
| 2,502 | ии фотосессия по фото бесплатно онлайн |

Dynamics for `ии фотосессия`, Russia, monthly:

| Month | Count |
| --- | ---: |
| 2026-01 | 106,715 |
| 2026-02 | 85,608 |
| 2026-03 | 76,149 |
| 2026-04 | 57,990 |
| 2026-05 | 49,676 |
| 2026-06 | 40,687 |
| 2026-07 | 40,330 |
| 2026-08 | 47,950 |

Takeaway: the current article `/blog/ii-fotosessiya-po-foto/` is in a real demand cluster. It should be treated as a main pillar page and expanded.

### Broad Photo AI Cluster

Seed: `нейросеть для фото`

| Count | Phrase |
| ---: | --- |
| 80,785 | нейросеть для фото |
| 29,499 | нейросеть для фото бесплатно |
| 22,187 | нейросеть для генерации фото |
| 13,452 | нейросеть для создания фото |
| 10,179 | нейросеть для генерации фото бесплатно |
| 5,730 | бесплатная нейросеть для создания фото |
| 5,050 | нейросеть для обработки фото |
| 4,796 | нейросеть для редактирования фото |

Seed: `нейросеть по фото`

| Count | Phrase |
| ---: | --- |
| 55,058 | нейросеть по фото |
| 25,088 | нейросеть по фото бесплатно |
| 9,937 | нейросеть по фото онлайн |
| 8,101 | нейросеть онлайн бесплатно по фото |
| 5,506 | создать по фото нейросеть |
| 5,373 | нейросеть для генерации фото по фото |
| 4,794 | нейросеть сгенерировать фото по фото |

Seed: `сделать фото нейросетью`

| Count | Phrase |
| ---: | --- |
| 28,215 | нейросеть сделать фото |
| 11,884 | нейросеть сделать фото бесплатно |
| 5,256 | сделать фото нейросеть онлайн |
| 3,974 | сделать фото через нейросеть |
| 3,277 | сделать фото с помощью нейросети |
| 2,379 | нейросеть сделать фото без регистрации |

Takeaway: the blog currently underuses broader user language. Users search for "нейросеть для фото", "нейросеть по фото", "сделать фото через нейросеть" more often than branded/product phrasing.

### Editing Cluster

Seed: `обработка фото нейросеть`

| Count | Phrase |
| ---: | --- |
| 24,892 | обработка фото нейросетью |
| 13,440 | обработка фото нейросетью онлайн |
| 11,879 | обработка фото нейросетью онлайн бесплатно |
| 2,331 | обработка фото нейросетью без |
| 2,180 | нейросеть обработка фото без регистрации |
| 2,167 | обработка фото нейросетью бесплатно без регистрации |
| 1,958 | обработка фото нейросетью онлайн без регистрации |

Takeaway: this can be a separate content or landing cluster if the product flow supports editing/retouching/re-generation from uploaded photos clearly enough.

### Current Article Seeds

Seed: `ии фотосессия по фото`

| Count | Phrase |
| ---: | --- |
| 9,531 | ии фотосессия по фото |
| 7,984 | ии фотосессия по фото бесплатно |
| 2,554 | ии фотосессия по фото онлайн |
| 2,502 | ии фотосессия по фото бесплатно онлайн |
| 1,305 | ии фотосессия по фото без регистрации |
| 1,302 | ии фотосессия по фото бесплатно без регистрации |

Seed: `какие фото загружать нейросеть`

| Count | Phrase |
| ---: | --- |
| 42 | в какую нейросеть можно загрузить фото |

Seed: `промпт по референсу`

Total count: 69.

Seed: `женская ии фотосессия`

| Count | Phrase |
| ---: | --- |
| 1,055 | женская фотосессия ии |
| 944 | промты для ии фотосессии женские |
| 165 | готовые промты для ии фотосессии женские |
| 152 | промты для ии фотосессии на русском женские |

Seed: `семейная ии фотосессия`

| Count | Phrase |
| ---: | --- |
| 1,357 | семейная фотосессия ии |
| 391 | семейная фотосессия ии бесплатно |
| 325 | промты для ии фотосессии семейные |
| 122 | ии фотосессия по фото семейная |

Seed: `парная ии фотосессия`

| Count | Phrase |
| ---: | --- |
| 1,043 | ии фотосессия парные |
| 1,043 | парная ии фотосессия |
| 454 | парные промты для ии фотосессии |
| 454 | промты для парной фотосессии ии |

Takeaway: current niche articles are useful, but they are not all equal as SEO entries. "Какие фото загружать" and "Промпт по референсу" are better as supporting pages linked from stronger articles.

## Initial Content Priorities

1. Expand `/blog/ii-fotosessiya-po-foto/` as the main pillar for "ии фотосессия по фото онлайн/бесплатно/без регистрации".
2. Add a new pillar: "Нейросеть для фото: как создать или изменить фото онлайн".
3. Add a new page: "Сделать фото через нейросеть по фото: пошагово".
4. Add a new page or section: "Обработка фото нейросетью онлайн".
5. Keep "женская", "семейная", and "парная" as long-tail pages, but optimize titles around discovered phrases: "женская фотосессия ИИ", "семейная фотосессия ИИ", "парная ИИ-фотосессия".
6. Treat `associations` as hints only. They often contain unrelated or unsafe phrases and should not be imported directly into the keyword map.

## Technical SEO Notes

Observed in `landing/`:
- Blog index and articles have canonical URLs.
- Home page currently has no canonical URL.
- Articles are static HTML with around 640-820 words by raw `wc -w`.
- No obvious Open Graph/Twitter metadata found.
- No obvious `Article` or `BreadcrumbList` JSON-LD found.

Suggested technical follow-up:
- Add canonical to the home page.
- Add reusable OG/Twitter tags for home, blog index, and articles.
- Add `Article` JSON-LD and breadcrumb JSON-LD to blog articles.
- Keep sitemap updated when new articles are added.
