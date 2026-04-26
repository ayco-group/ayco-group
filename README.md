# Ayco group — landing

Сайт-візитка `ayco.group`. Vite + TypeScript + SCSS, без UI-фреймворку. Двомовний (UK/EN) з окремими URL для SEO.

## Розробка

```bash
nvm use         # Node 22 (.nvmrc)
npm ci
cp .env.example .env
npm run dev     # http://localhost:5173
```

## Скрипти

| Команда               | Що робить                                              |
| --------------------- | ------------------------------------------------------ |
| `npm run dev`         | dev-сервер з HMR                                       |
| `npm run build`       | type-check + production-білд у `dist/`                 |
| `npm run preview`     | локальний preview зібраного `dist/`                    |
| `npm run type-check`  | TS перевірка без emit                                  |
| `npm run lint`        | ESLint з autofix                                       |
| `npm run format`      | Prettier на всі вихідні                                |
| `npm run generate:og` | генерує `public/og-image.png` зі `public/og-image.svg` |
| `npm run release`     | semantic-release (виключно з CI)                       |

## Структура

```
.
├── index.html              # UK-версія (default, /)
├── en/index.html           # EN-версія (/en/)
├── public/
│   ├── favicon.svg
│   ├── og-image.svg        # source
│   ├── og-image.png        # generated (gitignored)
│   ├── robots.txt
│   └── sitemap.xml
├── src/
│   ├── data/products.ts    # перелік продуктів — єдине джерело правди
│   ├── scripts/            # TS: language, smooth-scroll, year, GA4
│   └── styles/             # SCSS partials, точка входу — main.scss
├── scripts/generate-og.mjs # SVG → PNG для OG
└── .github/workflows/      # PR, deploy-dev, release
```

## SEO

- `index.html` (UK) + `en/index.html` (EN) — **окремі сторінки** з повним контентом, не JS-перемикач. Це означає, що Google індексує обидві мови нормально.
- `<link rel="alternate" hreflang>` між мовами + `x-default` → UK.
- `<link rel="canonical">` на кожній сторінці.
- JSON-LD `Organization` + `ItemList` продуктів.
- Open Graph + Twitter Card.
- `sitemap.xml` з обома мовами та `xhtml:link rel="alternate"`.
- `robots.txt` дозволяє все, посилається на sitemap.

## Аналітика

GA4 через `VITE_GA_MEASUREMENT_ID`. Якщо змінна порожня — `gtag.js` не вантажиться, отже dev/preview не засмічуєтсья. Імпорт ID іде через build-time env у `src/scripts/analytics.ts`.

Для треку події з коду:

```ts
import { trackEvent } from '@/scripts/analytics';
trackEvent('cta_click', { location: 'hero' });
```

## Двомовність

Користувач при першому заході редіректиться на свою мову (`navigator.language`), вибір зберігається в `localStorage` і повторно не редіректить. Перемикач у хедері — звичайні `<a>` між `/` і `/en/`.

Щоб додати рядок:

1. Додаєш у `index.html` (UK) і в `en/index.html` (EN).
2. Якщо це продукт — додаєш у `src/data/products.ts`, далі дублюєш у HTML обох мов та у JSON-LD.

## Деплой

Три workflows:

- **`pull-request.yml`** — на PR в `main`: setup → lint → type-check → build.
- **`deploy-dev.yml`** — на push в `main`: build + rsync на dev-середовище.
- **`release.yml`** — `workflow_dispatch`: build → rsync на prod → semantic-release (тег + GitHub release + CHANGELOG).

### Що треба налаштувати в GitHub repo

Variables (Settings → Secrets and variables → Actions → Variables):

- `NODE_VERSION` — `22`
- `VITE_SITE_URL` — `https://ayco.group`
- `VITE_GA_MEASUREMENT_ID` — `G-XXXXXXXXXX` (можеш також задати на рівні environment `production`/`staging`)

Secrets:

- `DEV_REMOTE_HOST`, `DEV_REMOTE_USER`, `DEV_REMOTE_KEY` — SSH доступ до сервера
- `DEV_REMOTE_PATH` — шлях для staging (наприклад `/var/www/dev.ayco.group`)
- `PROD_REMOTE_PATH` — шлях для prod (`/var/www/ayco.group`)
- `GH_TOKEN` — PAT з `repo` scope для semantic-release

### Конвенційні коміти

Husky + commitlint enforces conventional commits (`feat:`, `fix:`, `chore:`, ...). semantic-release підбирає версії автоматично з історії.

## Що поправлено vs. початковий монолітний `index.html`

- Розбито на Vite-проект з окремими стилями/скриптами/даними.
- TypeScript замість inline JS.
- SCSS modules замість одного `<style>`.
- **Справжня двомовність** — окремі URL замість одного HTML з прихованими span-ами через CSS (це жахливо для SEO).
- Повна SEO-обвʼязка: OG, Twitter, JSON-LD, hreflang, canonical, sitemap, robots.
- Аналітика умовна (тільки якщо задано `VITE_GA_MEASUREMENT_ID`).
- OG-картинка генерується з SVG під час білду.
- CI/CD за такою ж схемою як в `Opodatkuvayco`.
