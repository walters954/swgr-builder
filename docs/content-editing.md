# Editing the game catalog

Game content lives in JSON, independent of application components. Each character, ability, vehicle class, Racer Style, Part family, or build observation has its own file and stable ID. User-created plans now have a stage editor, browser-local saves, and hash sharing; real login, database persistence, and account sync remain unfinished; these catalog records are reference data, not player accounts or saved builds.

## Layout

```text
content/
  characters/<id>.json       Characters, mode availability, vehicle profiles, loadouts
  abilities/<id>.json        Ability summaries, compatibility, rank variants
  vehicle-classes/<id>.json  Class characteristics and observed mode availability
  racer-styles/<id>.json     Style loadouts, separated by context/campaign rank
  parts/<id>.json            197 Part families with 319 distinct variants
  build-observations/<id>.json Separate screenshot build/reward evidence
  vehicles/<id>.json         Named vehicles (50)
  tracks/<id>.json           Reported tracks/circuits (46)
  planets/<id>.json          Planets (7)
  imports/                  Textual source manifests for registry merging
  sources.json               Shared source registry (543 sources)
  evidence/screenshots/      Owner-local screenshots, ignored by Git and Vercel
  schemas/                   Generated editor JSON schemas
  templates/                 Generated empty character/ability examples
src/lib/content/
  schema.ts                  Zod schemas and inferred TypeScript types
  catalog.ts                 File loader, validation, lookup/search helpers
  authoring.ts               Exclusive draft creation (never overwrites entries)
```

The implemented UI has four routes: `/` overview with a custom teal/orange responsive sidebar, `/wiki` source-backed search with mode filters and details, `/builder` stage editing (clone/add/delete, notes, Part variants, abilities, and a separate Crash Ability), and `/builds` browser-local saved plans.

Import `readCatalog`, `queryCatalog`, or `findEntry` from `@/lib/content/catalog` in server-side code only; the loader uses Node filesystem APIs. Queries hide drafts by default. Build observations require explicit `kind: "build-observation"` and are research evidence, not public community builds. The UI uses cached `getPublicCatalog` from `@/lib/content/public`, which filters drafts, excludes observations, and omits private source image paths from source metadata. Raw screenshot/crop policy is unchanged.

Runtime `readCatalog` checks JSON schemas and references only. `npm run content:check` uses those schema/reference checks without checking file existence, so public clones work without private evidence. `npm run content:check:assets` performs the same validation and then calls CLI-only `checkCatalogAssets` in `src/lib/content/asset-validation.ts` to check referenced private evidence and public display image files on disk; this requires the owner’s local evidence originals/copies. Keeping asset filesystem checks out of runtime imports avoids output tracing pulling the entire repository into the deployment; do not add a broad repository tracing include.

Local saves use browser storage, not accounts or server-persistent builds. Copy/share uses a self-contained `/builder#plan=…` URL marked unlisted; it includes plan notes and is readable by anyone with the link. It is not encrypted or account-private. Real authentication, database storage, and account sync are not implemented. Implementation is present; parent browser checks are pending.

## Comprehensive imports

Current catalog: 21 characters, 29 abilities (28 published; only Flame Vent draft), 197 Part families / 319 variants, 62 style loadouts (56 published; six ambiguous vehicle-named drafts), 50 vehicles, 46 tracks, seven planets, four vehicle classes, and five evidence observations. Homepage style totals deduplicate family names rather than treating campaign ranks as new styles.

Sources: [Galactic Racer Wiki](https://swgalacticracer.wiki/), [GamesLantern Parts](https://galacticracer.gameslantern.com/vehicle-parts), and discovered public detail/index pages. Every newly imported claim is `reported`, using a `secondary` source—even if the external page labels itself “Official.” These pages can expose internal/prologue variants; a catalog record is not confirmed availability or playability. Known screenshot claims, IDs, and curated context are preserved; disagreements and duplicate-page ambiguities are logged, not silently overwritten.

- [Parts report](import-parts-report.md): all 318 source Part pages, including 59 Fault pages, map to 197 families / 319 variants (one preserved observed variant). Exactly 305 prices and 300 unlock descriptions have explicit page-local evidence. Missing values remain unknown; never infer price from rarity or unlocks from another rank. Wiki details expose available price/unlock claims.
- [Loadouts report](import-loadouts-report.md): 75 fetched/reused pages, including 45 ability and 20 style detail pages; multiplayer sections and campaign ranks remain distinct. Six vehicle-named ambiguous records stay draft, not invented Racer Styles.
- [World report](import-world-report.md): 155 fetched/cached pages; 21 characters, 50 named vehicles, 46 tracks, seven planets, four classes. Source names and partial participation context do not establish universal compatibility.

Repeatable helpers are `scripts/import-gameslantern-parts.py`, `scripts/import-gameslantern-loadouts.py`, and `scripts/import-world.py`; consult their reports/help before rerunning. Textual manifests under `content/imports/` retain per-page sources. Raw HTML/cache evidence stays ignored under `content/evidence/`; do not publish it. The parent merged the manifests with:

```bash
npx tsx scripts/merge-content-sources.ts
npm run content:check
```

The registry now has 543 sources. The merge retains existing source records, rejects conflicting identities, and adds missing IDs; it does not validate the truth of imported claims. World kinds are included in runtime loading, CLI counts/asset enumeration, and generated editor schemas. Source 17 is byte-identical to already imported owner upload 16, not independent evidence or a reason to duplicate claims.

## Visual cards

`GameCard` is reused for wiki previews/details and builder Part pickers, installed Parts, and selected abilities/style. Wiki Load more increments by 36; builder Part-family pages contain 24 families. Search runs over the full catalog, not just visible results. Campaign rank labels distinguish style choices. Formatting highlights existing effect terms without rewriting them or generating fake stats.

Only nine PNG pictograms under `public/game-icons/` are actual extracted game artwork; remaining Lucide illustrations are not game assets. [game-card-artwork.md](game-card-artwork.md) records IDs, native crop coordinates, normalization, and safe regeneration. Oxanium is self-hosted by `next/font`; font downloads may still be needed at build time. Full screenshots, overlays, and third-party web artwork are not published.

## Add or edit a record

```bash
npm run content:new -- character new-racer
npm run content:new -- ability new-ability
```

The `content:new` CLI still supports only `character` and `ability`; it does not automate copying every catalog type. The command creates a draft with unknown facts instead of placeholder statistics. It fails rather than replacing an existing file. Edit the resulting JSON; the filename must match `id`. Vehicle class entries can be copied from `content/vehicle-classes/skim-speeder.json` and changed to another known class ID (`landspeeder`, `speeder-bike`, `skim-speeder`, `podracer`). For Racer Styles, Parts, world entities, or build observations, use an existing JSON record in the corresponding directory as a structural example, assign a new stable ID, and validate the result. There is no full-copy automation. Remove all copied facts and evidence that do not apply.

IDs are lowercase kebab-case and should remain stable once builds reference them. Changing a display name should not require changing the ID. Add spelling alternatives to `aliases` where supported by evidence.

## Facts and sources

A sourced field looks like:

```json
{
  "status": "screenshot-verified",
  "value": "Afterburner power and tank refill rate are increased.",
  "sourceIds": ["screenshot-gasgano-character-select"]
}
```

An unknown field looks like:

```json
{
  "status": "unknown",
  "value": null,
  "sourceIds": [],
  "notes": "Awaiting a readable card screenshot."
}
```

Verification belongs to each claim, not the entire record. `official` needs an official source, `reported` needs a secondary source, and `screenshot-verified` needs screenshot evidence. Source existence and source-kind consistency are checked, but factual correctness still requires human review.

For a new screenshot, add a source in `content/sources.json` with `kind: "screenshot"`, a local path under `content/evidence/screenshots/`, `accessedAt`, and `capturedAt`, `platform`, `gameVersion`, and `language` (use null when unknown). The corresponding evidence file must be retained in the owner-local evidence set; `content:check:assets` checks its existence, while the default `content:check` allows it to be absent from public clones. Capture date and access date are different; uploading today does not prove the screenshot was captured today.

The screenshot inventory below records the earlier evidence batches; later owner uploads and import sources are recorded in the source registry/reports, not counted by that table; evidence copies and derived crops are for private inspection, with processing details recorded per source. Original uploads remain owner-local/in the original external session. Raw evidence and crops under `content/evidence/`, plus browser-review artifacts under `dogfood-output/`, are excluded by both `.gitignore` and `.vercelignore`; no screenshots are committed. The public repository contains typed textual data, source references, and the nine isolated public pictograms, not the private evidence files. Evidence copies are not website images. `image` stays null unless an approved display asset is added with provenance, alt text, and permission status; the separate pictogram map is documented in [game-card-artwork.md](game-card-artwork.md), not a blanket approval for screenshot reuse.

## Modes and kinds of traits

- `podrace` is the broad mode identified by the owner for Dud Bolt, Gasgano, Teemto Pagalies, and Sebulba.
- `multiplayer-tour` is the mode identified by the owner for the Skim Speeder selection screen.
- Do not automatically map these observations to `podrace-tour`, `quick-podrace`, campaign, or every multiplayer event.
- Availability arrays record confirmed modes, not necessarily exhaustive availability. Notes explain the scope of evidence.
- Podrace vehicle traits belong in `character.vehicleProfiles[].traits`, not in equipped abilities or Racer Style traits.
- Class-wide characteristics belong in `vehicle-classes`.
- Mode-specific starting abilities and style traits, when verified, belong in `character.loadouts`.
- Ability card ranks/variants belong in `ability.variants`; rank, rarity, cost, duration, and cooldown are distinct fields. Null means unknown, not zero.

The supplied Podrace panels do not show equipped abilities or Racer Styles. Their wording is preserved without adding numeric bonuses or importing different traits from online guides. The Skim Speeder panel displays a Knife Edge control glyph: the transcription uses `[input icon]` rather than guessing a key binding.

## Publication and validation

Set `publication` to `published` only after reviewing the name and summary evidence. Other incomplete fields remain explicitly unknown. Public query helpers exclude `draft` records, even if a draft has a known name. Published character loadouts cannot refer to draft abilities.

```bash
npm run content:check
npm run test:content
npx tsc --noEmit
npm run lint -- src/lib/content scripts tests
```

Schema and reference checks support Racer Styles, Part families/variants, world entities, and build observations, including installed versus offered Parts and ability variant references. Validation catches schema errors, unrecognized fields, duplicate IDs, mismatched filenames, missing or mismatched sources, broken ability references, duplicate child IDs, and unapproved published image metadata. The default `npm run content:check` does not check whether referenced files exist. For that additional check, use:

```bash
npm run content:check:assets
```

This runs schema/reference validation first, then checks existence/accessibility of every referenced screenshot evidence file and display image file (under `public/`). It requires owner-local evidence and will fail when referenced files are missing; it does not inspect pixels, prove factual transcription, or establish reuse rights. Neither command establishes game-rule legality, calculates conditional bonus stacking, or confirms that an image is legally reusable.

When changing `src/lib/content/schema.ts`, regenerate editor support:

```bash
npm run content:schemas
```

Editor JSON schemas have been regenerated for the expanded catalog. VS Code associations in `.vscode/settings.json` provide schema-based JSON completion. The CLI remains authoritative for relationships and Zod refinements that JSON Schema cannot fully express.

## Screenshot evidence inventory

| Screenshot | Context supplied by owner | Record | Captured details |
| --- | --- | --- | --- |
| 1 | Podrace | Dud Bolt | Vulptereen 327; Optimized Nozzles; Draggy Control Surfaces |
| 2 | Podrace | Gasgano | Custom Ord Pedrovia; Energy Surplus; Large Cross-Section |
| 3 | Podrace | Teemto Pagalies | IPG-X1131 LongTail; Bleeding-Edge Tech; Small Thrusters |
| 4 | Podrace | Sebulba | Plug-F Mammoth; Built for Battle; Old Dog, Old Tricks |
| 5 | Multiplayer Tour | Skim Speeder class | Streamlined Intakes; Sweeping Airfoils; Knife Edge |
| 6 | Multiplayer Tour sequence | Griff Halloran | Afterburner style; Afterburner Superiority; Afterburner Fuel Tank; Burn Bright (10% tank refill per overtake) |
| 7 | Mode, character, round unknown | Separate build observation | Skim Speeder; Stunt Runner; displayed speed 322; Vectored Shockwave; Cooling Dampers II; 1/4 Parts |
| 8 | Mode, character, round unknown | Separate reward observation | Four offered choices: Heated Fuel I, Extended Alarm I, Overcharging Afterburner, Coolant Cycler II; not installed selections |
| 9 | Mode, character, round unknown | Separate build observation | Skim Speeder; Stunt Runner; speed 347; 4/4 Parts: Cooling Dampers II, Heated Fuel II, Depleted Shielding, Expanding Fuel Tank; Vectored Shockwave II and Surge |
| 10 | Mode, character, round unknown | Separate build observation | Skim Speeder; Stunt Runner; speed 359; 4/4 Parts: Afterburner Efficiency IV, Heated Fuel II, Depleted Shielding, Expanding Fuel Tank; Vectored Shockwave II and Impact Surge |
| 11 | Mode, character, round unknown | Separate tooltip/build observation | Skim Speeder; Stunt Runner; displayed speed 371; Vectored Shockwave II and Impact Surge II confirmed by native crop; 4/4 Parts observed, installed identities unknown (partially obscured) |
| 12 | Private screenshot evidence | Part reward cards | Source `screenshot-part-rewards-12` |
| 13 | Mode and character unknown | Survivor build evidence | Actual source `screenshot-survivor-build-13`, not a reward-13 source |
| 14 | Private screenshot evidence | Backer contracts | Source notes only, not a new catalog entity or build observation |

Screenshot 11 confirms Vectored Shockwave II and Impact Surge II from a native-resolution crop. The Vectored Shockwave tooltip reads exactly: “Blast nearby opponents away, propelling you forward and applying System Malfunction to affected opponents.” This establishes its generic description, not a numerical rank-II difference. Impact Surge II’s effect remains unknown. The general Ability tooltip describes offensive, defensive, or utility equippable technology that consumes Energy; it gives no numeric Energy cost. Parts are partially obscured: `installedParts` remains unknown despite the observed 4/4 count, with no inventory carried over from screenshot 10.

Screenshots 7–11 are separate evidence snapshots, not confirmed consecutive rounds; do not attach them to Griff Halloran or infer a mode or character. Screenshot 10 shows Afterburner Efficiency IV instead of Cooling Dampers II and Impact Surge instead of Surge, not proof of a transaction or a speed formula. Heated Fuel I (25%) and II (50%) are preserved separately; unlabeled dots do not establish rarity. More card screenshots are still needed, but the catalog is no longer awaiting all card evidence: Vectored Shockwave, Surge, Impact Surge, Stunt Runner, and the earlier screenshot-derived Part families are recorded; the comprehensive reported import now totals 197 families. Flame Vent is the only remaining ability draft; Impact Shield is now published.

The typed progression model and tests are separate from these observations; see [round-builder.md](round-builder.md) for complete round snapshots, Stadium Builds reference research, and limitations. The round editor, browser-local saves, and hash-link sharing are implemented; real login and server persistence are not.

The original screenshots 1–4 show Ben Quadinaros and Ody Mandrell in the Podrace selection grid without their detail panels; this statement describes that historical batch only. Do not infer their vehicle traits from the other racers' panels.

## Background sources

The [official vehicle guide](https://www.starwars.com/news/star-wars-galactic-racer-vehicle-guide) corroborates the Skim Speeder's Knife Edge maneuver and class handling identity. The [official skim speeder databank](https://www.starwars.com/databank/skim-speeder) provides lore and swing-arm/banked-turn context. These do not establish exact multiplayer stat multipliers or replace screenshot text. Wider background research is in [game-research.md](game-research.md).
