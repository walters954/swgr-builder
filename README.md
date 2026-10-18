# Galactic Racer Wiki & Builder

An unofficial Star Wars: Galactic Racer wiki and racer/loadout builder, with an implemented local-first UI.

## Current status

- Next.js 16 App Router, React 19, TypeScript, Tailwind CSS 4.
- The implemented UI has four routes: `/` overview with a custom teal/orange responsive sidebar, `/wiki` source-backed search with mode filters and details, `/builder` stage editing (clone/add/delete, notes, Part variants, abilities, and a separate Crash Ability), and `/builds` browser-local saved plans.
- Research and proposed content structure: [docs/game-research.md](docs/game-research.md).
- Typed JSON catalog and schema/reference validation for characters, abilities, Parts, style loadouts, vehicles, tracks, planets, classes, and build observations. See [content editing](docs/content-editing.md) for update commands and conventions.
- Comprehensive imports: 21 characters; 29 abilities (28 published, Flame Vent draft); 197 Part families / 319 variants covering 318 GamesLantern Part pages, including 59 Fault pages; 62 style loadouts (56 published, six ambiguous vehicle-named drafts); 50 vehicles, 46 tracks, seven planets, four classes, five observations, and 543 registered sources. Homepage style counts deduplicate families rather than counting loadout/rank records.
- Imported claims are **reported**, backed by secondary sources—not official or confirmed playability. Existing screenshot claims/IDs are preserved and conflicts logged. See [content editing](docs/content-editing.md) and the linked import reports.
- Shared `GameCard` visuals cover wiki previews/details and builder choices/selections: teal panels, Roman rank labels, highlighted existing effect terms, and self-hosted Oxanium. Only nine pictograms are extracted game artwork; the rest are illustrative Lucide fallbacks, not game assets. See [artwork provenance](docs/game-card-artwork.md).
- Wiki loads 36 more results at a time; the builder pages 24 Part families. Search covers all records, not just visible cards. Style choices distinguish campaign rank; wiki details expose explicitly sourced prices/unlocks.
- A typed round progression model in `src/lib/builds/plan.ts` and tests provide complete per-round snapshots and Part diffs. See [round-builder design and reference research](docs/round-builder.md), including Stadium Builds. The model now powers the stage editor.
- Local saves use browser storage, not accounts or server-persistent builds. Copy/share uses a self-contained `/builder#plan=…` URL marked unlisted; it includes plan notes and is readable by anyone with the link. It is not encrypted or account-private. Real authentication, database storage, and account sync are not implemented. The visual/import refresh is published; browser checks confirmed selected game-like cards, independent per-round ranks, and a two-round share imported on production.
- The cached `getPublicCatalog` helper filters drafts and omits private source image paths before supplying UI data.

## Local development

Requires Node.js 20.9+; setup was performed with Node.js 22.18.0 and npm 10.9.3.

```bash
npm ci
npm run dev
```

After `npm run dev`, preview [Overview](http://localhost:3000/), [Wiki](http://localhost:3000/wiki), [Builder](http://localhost:3000/builder), and [My builds](http://localhost:3000/builds). The overview entry is `src/app/page.tsx`.

## Checks

```bash
npm run content:check
npm run test:content
npm run lint
npx tsc --noEmit
npm run build
npm audit --omit=dev
```

`npm run content:check` validates catalog JSON schemas and references without requiring private evidence files, so it works in public clones. For owner-local asset verification, run `npm run content:check:assets`: it performs the same validation, then checks that referenced private evidence and public display image files exist. It requires the owner’s local evidence originals/copies and does not verify image contents or reuse rights.

The app uses `next/font/google`, so a production build requires access to Google's font service unless fonts are made local.

The initial full dependency audit reported five high-severity development-only findings in the lint dependency chain. No forced downgrades or audit workarounds were applied.

## Deployment

Live: [swgr-builder.vercel.app](https://swgr-builder.vercel.app), project `dark-nimbus/swgr-builder` under Dark Nimbus, connected to [walters954/swgr-builder](https://github.com/walters954/swgr-builder). The visual/import refresh (`1b7742c`) is deployed and Ready. Catalog/asset checks, 52 tests, TypeScript, ESLint, and production build passed with exit 0. All four routes return HTTP 200; desktop/mobile cards, independent round ranks, and production shared-plan import were browser-verified. Nine production PNGs match the local assets exactly. See the [deployment record](docs/deployment.md). Real login, database-backed builds, and account sync remain unimplemented.

## Content policy

The repository contains typed textual data, source references, and nine isolated derived pictogram PNGs—not full screenshots, overlays, or copied web images. `.gitignore` and `.vercelignore` exclude `content/evidence/` and `dogfood-output/`; raw screenshots, evidence crops, import HTML caches, and browser-review artifacts remain owner-local and are excluded from publication/deployment.

Separate official facts, secondary reports, and screenshot-verified details. Unknown values remain unknown; do not publish invented card text, stats, roster entries, or compatibility rules. Preserve sources and image provenance. This project is not affiliated with Lucasfilm, Fuse Games, or Secret Mode.
