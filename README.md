# ABails Shop

Portfolio e-commerce demo: browse products, use a client-side cart, explore a mock checkout flow, and manage a merged catalog (seed data + **localStorage** edits) from a small dashboard. No real payments or backend.

## Stack

- **Next.js** 16 (App Router), **React** 19, **TypeScript**
- **Tailwind CSS** 4, **next-themes** (light / dark / system)
- **Zustand** (cart), **React Hook Form** + **Zod** (forms)

## Scripts

```bash
npm install
npm run dev      # development server
npm run build    # static export → out/ (serve that folder with any static host or GitHub Pages)
npm run lint
```

To preview the export locally, serve the `out` folder with any static file server and use a URL that includes your base path (default **`/ecommerce/`**).

## Local development

By default the app is configured for a **GitHub Pages project site** at `/ecommerce`, so in development you usually open:

**http://localhost:3000/ecommerce/**

To run at the site root instead (e.g. `http://localhost:3000/`), create `.env.local`:

```env
NEXT_PUBLIC_BASE_PATH=
```

Rebuild after changing this.

## Features

- **Shop** — search, category filter, sort; product grid and detail pages (static paths from the product catalog).
- **Cart & checkout** — cart persisted in the browser; checkout is UI-only (no payment processing).
- **Dashboard** — overview and product list; create/edit products stored in **localStorage** and merged with seed data.
- **UI** — responsive layout (including a mobile nav menu), light and dark themes (toggle in the header).

## Static export & GitHub Pages

The app uses `output: "export"` and emits static files under **`out/`**. Deployment is automated via **GitHub Actions** (`.github/workflows/deploy-github-pages.yml`) when you push to `main` or `master`.

In the repository **Settings → Pages**: set the source to **GitHub Actions** (not “Deploy from a branch” unless you choose that flow). The live URL for a repo named `ecommerce` is:

`https://<username>.github.io/ecommerce/`

## Project layout (high level)

| Path | Purpose |
|------|---------|
| `src/app/` | Routes, layouts, global styles |
| `src/components/` | UI, layout, feature components |
| `src/data/products.ts` | Seed product data |
| `src/store/` | Cart store |
| `public/` | Static assets (e.g. logo) |

## License

Private / portfolio use unless otherwise specified by the author.
