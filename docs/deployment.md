# Production deployment

- App: https://swgr-builder.vercel.app
- Alternate alias: https://swgr-builder-dark-nimbus.vercel.app
- Vercel team: **Dark Nimbus** (`dark-nimbus`).
- Project: `swgr-builder`.
- GitHub: https://github.com/walters954/swgr-builder (public).
- Initial app commit: `6442198`.
- Visual/import implementation commit: `1b7742c`.
- Verified visual/import deployment: `dpl_ADAEXwKA949gW8JneqovjJE3HjuJ`.
- Deployment dashboard: https://vercel.com/dark-nimbus/swgr-builder/ADAEXwKA949gW8JneqovjJE3HjuJ
- Build URL: https://swgr-builder-oeacl936v-dark-nimbus.vercel.app

## Comprehensive import/card refresh — published and verified

The refresh contains 543 merged sources, reported catalog imports, shared visual cards, and nine derived owner-upload PNG pictograms. Implementation commit `1b7742c` was pushed to `master` and deployed under Dark Nimbus.

Verification (all commands exited 0):

- `npm run content:check` and `npm run content:check:assets`.
- `npm run test:content`: **52 passed**, 0 failed.
- `npx tsc --noEmit --incremental false`.
- `npm run lint -- src/app src/components src/lib scripts tests`; focused follow-up `npm run lint -- src/components/build-planner.tsx` after the final label adjustment.
- `npm run build`: all four product routes prerendered.
- `git diff --check`; all 10 VS Code schema associations resolve to valid JSON.
- Native-crop reproduction check: all nine 128×128 RGBA assets match the extraction script, use white pictograms and transparency, and preserve 12px minimum padding. Originals were not modified.
- `vercel --yes --prod --scope dark-nimbus`: deployed; `vercel inspect https://swgr-builder.vercel.app --scope dark-nimbus`: **Ready**.
- Production `/`, `/wiki`, `/builder`, `/builds`: HTTP **200**; private evidence, session, and review paths absent from all four HTML responses.
- All nine production PNGs match the local normalized assets by SHA-256.
- Agent-browser verified desktop cards/variant selection, Clean Racer, Optimized Fuel III, Overtaking Surge II, and Ion Blast. Changing round 2 to II preserved round 1 at III.
- An isolated production browser imported the UI-generated two-round share URL and rendered the expected selected cards. Mobile 390×844: document width 390, no horizontal overflow or browser errors observed.

Early automation attempts against off-screen controls or unsupported selectors did not change the form despite command success. They were not counted as passing interactions. Retesting used fresh accessibility refs, explicit scroll-into-view, and DOM value assertions. Detailed local evidence is in the ignored `dogfood-output/built-app/visual-import-report.md`; raw screenshots remain unpublished.

See [content editing/import reports](content-editing.md) and [artwork provenance](game-card-artwork.md). Login/account sync and server-persistent builds are still not implemented. Local saves and unlisted URL-fragment sharing remain unchanged.

## Previously published functionality

Responsive overview, searchable source-backed wiki, round-by-round build editor, browser-local saved builds, and self-contained URL-fragment sharing. No login/account sync or database-backed persistence is configured. A share URL exports an unlisted copy; anyone holding the link can read the plan and notes.

## Publication safeguards

Raw owner uploads, normalized screenshot evidence, voice-chat overlays, evidence crops, import HTML caches, and local browser-review output are excluded by `.gitignore` and `.vercelignore`. The initial deployment uploaded approximately 788 KB, not the private image collection. The current refresh intentionally includes only nine isolated derived PNG pictograms under `public/game-icons/`; no full screenshots, overlays, or copied web images are shipped. The remaining Lucide icons are illustrative, not game artwork. `getPublicCatalog` removes private evidence paths from source metadata sent to UI components. CLI-only asset checks are not imported into the application runtime, avoiding the broad filesystem-tracing warning seen in the first local build.

## Historical initial-deployment verification (not refresh verification)

- `npm run test:content`: 37 tests passed, exit 0.
- `npm run content:check`: catalog schema and references passed, exit 0.
- `npm run content:check:assets`: local evidence existence checks passed, exit 0; private files are not required in public clones or deployed runtime.
- `npx tsc --noEmit`: passed, exit 0.
- `npm run lint -- src/app src/components src/lib scripts tests`: passed, exit 0.
- `npm run build`: all four product pages prerendered; exit 0. The filesystem-tracing warning was eliminated.
- `vercel --yes --prod --scope dark-nimbus`: completed, exit 0.
- `vercel inspect https://swgr-builder.vercel.app --scope dark-nimbus`: production status Ready.
- HTTP GET `/`, `/wiki`, `/builder`, `/builds`: 200 each.
- Agent-browser confirmed the actual styled homepage, wiki search for Heated Fuel with I/II descriptions, two rounds with different target variants, browser-local saving, and a self-contained shared plan imported and saved on the production domain in a separate browser session.
- Production mobile viewport: 390 × 844; document width 390; no horizontal overflow or browser errors observed.

The initial browser automation hit an unsuccessful input-value wait and a label lookup failure. Retesting using current snapshots and the actual controls verified the flows above; these tool failures were not hidden as successful tests. Local browser screenshots and detailed review artifacts remain in the ignored `dogfood-output/built-app/` directory.

## Future deployment

The GitHub repository is connected to the Dark Nimbus project. For an intentional manual production deployment, run `vercel --prod --scope dark-nimbus` from the linked project. Do not substitute a personal or other team scope. Local `.vercel` linkage is ignored by Git.
