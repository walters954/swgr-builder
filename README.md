# Galactic Racer Wiki & Builder

An unofficial Star Wars: Galactic Racer wiki and racer/loadout builder, with an implemented local-first UI.

## Current status

- Next.js 16 App Router, React 19, TypeScript, Tailwind CSS 4.
- The implemented UI has four routes: `/` overview with a custom teal/orange responsive sidebar, `/wiki` source-backed search with mode filters and details, `/builder` stage editing (clone/add/delete, notes, Part variants, abilities, and a separate Crash Ability), and `/builds` browser-local saved plans.
- Research and proposed content structure: [docs/game-research.md](docs/game-research.md).
- Typed JSON catalog and schema/reference validation for characters, abilities, vehicle classes, Racer Styles, Parts, and build observations. See [content editing](docs/content-editing.md) for update commands and conventions.
- The current catalog contains seven characters, six abilities (only Flame Vent remains draft), sixteen Part families, two Racer Styles, one vehicle class, five build observations, and eighteen sources including fifteen screenshots. Build observations are excluded from the public UI catalog; raw screenshots and crops remain private evidence, not approved public assets.
- Screenshot 11 shows Skim Speeder / Stunt Runner at displayed speed 371, Vectored Shockwave II and Impact Surge II (confirmed by native crop), and 4/4 Parts with identities obscured/unknown. Its Vectored Shockwave tooltip establishes the generic effect, not a numerical rank difference; Impact Surge II’s effect and numeric Energy costs remain unknown. Mode, character, and round remain unknown.
- A typed round progression model in `src/lib/builds/plan.ts` and tests provide complete per-round snapshots and Part diffs. See [round-builder design and reference research](docs/round-builder.md), including Stadium Builds. The model now powers the stage editor.
- Local saves use browser storage, not accounts or server-persistent builds. Copy/share uses a self-contained `/builder#plan=…` URL marked unlisted; it includes plan notes and is readable by anyone with the link. It is not encrypted or account-private. Real authentication, database storage, and account sync are not implemented. Browser checks confirmed wiki search, variant details, round editing, local saving, and importing a shared plan on the production domain.
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

Live app: **[swgr-builder.vercel.app](https://swgr-builder.vercel.app)**. The production project is `dark-nimbus/swgr-builder` under **Dark Nimbus**, connected to the public [walters954/swgr-builder](https://github.com/walters954/swgr-builder) repository. Vercel reports production Ready; `/`, `/wiki`, `/builder`, and `/builds` returned HTTP 200. The production mobile page was checked at 390 × 844 with no horizontal overflow or browser errors. Real login, database-backed builds, and account sync remain unimplemented.

## Content policy

The repository contains typed textual data and source references, not committed screenshots. `.gitignore` and `.vercelignore` exclude `content/evidence/` and `dogfood-output/`; raw screenshots, crops, and browser-review artifacts remain owner-local and are excluded from publication/deployment.

Separate official facts, secondary reports, and screenshot-verified details. Unknown values remain unknown; do not publish invented card text, stats, roster entries, or compatibility rules. Preserve sources and image provenance. This project is not affiliated with Lucasfilm, Fuse Games, or Secret Mode.
