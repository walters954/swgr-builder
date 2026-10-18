# Star Wars: Galactic Racer — research and product brief

Research date: 2026-10-17. This is an unofficial fan-project research document, not an official game database.

## Comprehensive import and visual refresh — current implementation

The source registry now contains 543 records after `npx tsx scripts/merge-content-sources.ts`. Imports from [Galactic Racer Wiki](https://swgalacticracer.wiki/), [GamesLantern Parts](https://galacticracer.gameslantern.com/vehicle-parts), and discovered public pages add secondary **reported** evidence only, never official verification. Screenshot claims/IDs remain intact; conflicts and ambiguities are retained in the [Parts](import-parts-report.md), [loadouts](import-loadouts-report.md), and [world](import-world-report.md) reports. Those reports preserve per-page coverage and worker-stage limitations; the parent source merge and world CLI/schema integration are now complete.

Coverage: 21 characters; 29 abilities (28 published, Flame Vent draft); 197 Part families / 319 variants covering 318 source pages including 59 Faults; 62 style loadouts (56 published, six ambiguous vehicle-named drafts); 50 vehicles; 46 tracks; seven planets; four classes; five observations. Counts describe source records, not a confirmed playable roster. Some pages may represent internal/prologue variants. Homepage style-family counts are deduplicated. Only explicit page-local evidence supplies 305 prices and 300 unlock descriptions; missing values are not inferred.

Shared visual cards now appear in wiki previews/details and builder pickers/installed Parts/selected abilities/styles. They use teal panels, Roman rank labels, self-hosted Oxanium, highlighted existing terms, nine isolated owner-upload pictograms, and clearly illustrative Lucide fallbacks—not authentic art for every record or fabricated stats. See [artwork provenance](game-card-artwork.md). Wiki loads 36 more results; builder pages 24 Part families; search covers the full catalog. Style options distinguish campaign rank, and wiki details expose sourced price/unlock claims.

The refresh from commit `1b7742c` is published under Dark Nimbus at [swgr-builder.vercel.app](https://swgr-builder.vercel.app), deployment `dpl_ADAEXwKA949gW8JneqovjJE3HjuJ`, with Ready confirmed by CLI inspect (exit 0). All 52 tests, `npx tsc --noEmit --incremental false`, full/focused lint, and build passed with exit 0. Production desktop/mobile, share-import, route/privacy, and nine-PNG hash checks passed; see [deployment.md](deployment.md) for the verification record. Local storage and unlisted self-contained sharing are unchanged; real login/account sync remain absent. The S1–S12 research and historical guide findings below remain distinct from both imports and screenshot facts.

## Project direction

The searchable wiki and local-first racer/loadout builder are now implemented in Next.js. The implemented UI has four routes: `/` overview with a custom teal/orange responsive sidebar, `/wiki` source-backed search with mode filters and details, `/builder` stage editing (clone/add/delete, notes, Part variants, abilities, and a separate Crash Ability), and `/builds` browser-local saved plans. Local saves use browser storage, not accounts or server-persistent builds. Copy/share uses a self-contained `/builder#plan=…` URL marked unlisted; it includes plan notes and is readable by anyone with the link. It is not encrypted or account-private. Real authentication, database storage, and account sync are not implemented. The import/card refresh is published and verified; see [deployment.md](deployment.md) for current production checks. The typed round progression model in `src/lib/builds/plan.ts` powers the editor; see [round-builder.md](round-builder.md) for snapshots and Stadium Builds reference research. Do not fabricate missing cards, images, numerical stats, compatibility rules, or slot limits.

The earlier idea of a custom race planner is not the best default: the official developers describe builds as combinations of **Racer Styles, Abilities, and Parts** [S3]. Campaign Favors and multiplayer character traits also matter according to secondary guides [S7–S10]. Treat campaign planning and multiplayer racer reference as separate contexts until the in-game screens establish which choices are actually editable.

## Evidence policy

- **Official:** stated in a publisher/developer or StarWars.com source.
- **Reported:** from a secondary guide; useful for discovery, not independently verified in-game.
- **Screenshot verified:** readable in an owner-provided screenshot, with platform, language, game version/date, and rank where available. The historical screenshot inventory below covers the earlier batches; later sources are recorded in the registry; owner-confirmed mode context is recorded separately from visible text, and unavailable metadata remains unknown.
- **Unknown:** leave blank/null and explain what evidence is missing. Unknown does not mean zero, unavailable, or incompatible.
- Record provenance per claim or rank variant, not just per article. Keep transcribed game wording separate from our explanation.
- A character appearing in the story is not evidence that they are playable. A named planet is not a count of circuits.
- Source counts and roster lists below describe what these pages report, not a guaranteed complete current catalog.

## Confirmed game overview

| Topic | Finding | Sources |
| --- | --- | --- |
| Title | Star Wars: Galactic Racer | S1, S2 |
| Release | October 6, 2026; official launch coverage says available worldwide | S1 |
| Platforms | PlayStation 5, Xbox Series X\|S, PC | S1, S2 |
| Developer | Fuse Games | S3, S5 |
| Setting | Post-Empire / New Republic era; unsanctioned Galactic League in the Outer Rim | S2, S6 |
| Campaign protagonist | Shade | S1, S5 |
| Modes | Campaign, Scenario, Arcade; multiplayer/PvP also confirmed | S1, S2 |
| Campaign structure | Runs/tours with event choices, upgrades, and failure; some perks/unlocks carry over | S1, S5 |
| Workshop | Hibi fits parts earned during runs or purchased from her | S1 |
| Build categories | Racer Styles, Abilities, Parts | S3 |

The official launch article describes losing a tour after too many crashes, then rebuilding for another attempt. It does not establish exact crash budgets, how those vary by difficulty, or every persistence rule [S1]. Do not infer those numbers.

## Vehicle classes

All four classes are officially confirmed [S2, S4]. These are qualitative descriptions, not measured stat values.

| Class | Official gameplay identity | Mechanic described in official vehicle guide |
| --- | --- | --- |
| Landspeeder | Stable, durable, approachable; good handling and drifting | Ramjet boost; can withstand rival contact better than lighter craft |
| Speeder bike | Fast and agile, lightly armored | Kinetic Burst increases speed with control/turning trade-offs |
| Skim speeder | Momentum-oriented; balances resilience and agility; slow acceleration | Knife Edge maneuver for sharp corners; ramjets and afterburners |
| Podracer | Extremely fast; demanding corner management | Ramjets; airbraking sheds considerable speed |

Do not assume all four classes have identical parts, modes, upgrades, or builder rules.

### Specifically named vehicles

Official Deluxe Edition announcement lists these vehicles [S11]:

- Kor Sarun: Darc X — landspeeder.
- Kor Sarun: Ciza T — speeder bike.
- Kor Sarun: Rac S — skim speeder.

These are edition/DLC examples, not the full vehicle roster. Preserve edition requirements separately from performance claims.

## Confirmed planets

Official launch coverage lists seven worlds [S1]:

1. Jakku
2. Sentinel I
3. Lantaana
4. Derven Acos
5. Ando Prime
6. Tatooine
7. Crait

Useful official environmental details:

- Jakku: racing through a Star Destroyer graveyard [S5].
- Sentinel I: Skakoan listening station, mined/toxic landscape, acid rivers; fumes interfere with engines [S5].
- Ando Prime: icy terrain in the official interview's gallery [S5].
- Lantaana: rivers and caves in the official gallery [S5].
- Derven Acos: an arena is identified in launch coverage [S1].
- Crait: red salt flats and vulptices [S1].

Use `Sentinel I` and `Lantaana` as canonical display spellings. Some official prose/captions also use `Sentinel One` and `Lantana` [S5]; these can be search aliases. Exact circuit names, layouts, counts, distances, and lap settings remain uncataloged.

## Characters: official narrative evidence

| Character | Confirmed role | Sources |
| --- | --- | --- |
| Shade | Campaign protagonist, seeking to unseat Kestar Bool; grudge against the Bool family | S1, S5 |
| Hibi | Ardennian mechanic; workshop in each planet's paddock | S1, S4 |
| Kestar Bool | Galactic League champion and rival | S1 |
| Sebulba | Veteran racer involved in Shade's campaign story | S1 |
| Darius Pax | Galactic League founder; brought skim speeders into racing | S4 |

This table is not a playable roster.

## Builder research from secondary guides

These findings are historical **reported** research, not blanket screenshot verification. Later screenshot facts are recorded separately below; overlapping names do not verify every guide claim. They are useful for choosing data categories but should not become hard-coded legality rules yet.

### Racer Styles

IGN lists these 14 styles and rank-based upgrades [S7]:

| Style | Broad focus, paraphrased |
| --- | --- |
| Survivor | Shield protection and maintaining speed without crashing |
| Tenacious | Crash allowance and recovery / comeback benefits |
| Redliner | Ramjet redlining |
| Brawler | Takedowns and energy recovery |
| Ramjet Rider | Ramjet cooling and sustained use |
| Tech Expert | Ability usage and reload interactions |
| Afterburner | Afterburner performance and fuel |
| Stunt Runner | Airtime and perfect landings |
| Engineer | Recovering from malfunctions and negative effects |
| Firebug | Burning-based boost interactions |
| Slipstreamer | Drafting and overtaking |
| Ice Cold | Frozen-based interactions |
| Clean Racer | Overtaking, Surging, and non-combat benefits |
| Weaponized | Offensive abilities and energy recovery |

The guide describes ranks 1–3. Distinguish rank from rarity and do not apply this rank range automatically to other categories. It also says styles can be preset in multiplayer, scenarios, and arcade [S7].

### Example abilities and parts to look for in screenshots

These names appear in IGN's build guide [S8]; this is not an exhaustive catalog:

- Abilities: Flame Vent, Overtaking Surge, Impact Shield, Overcharged Autopilot II.
- Parts: Extended Alarm, Heat Reduction, Optimized Radiators, Ramjet Cooling, Ramjet Power, Redlining Power, Redline Purge, Surging Alarm, Frost Protection, Calibrating Landings, Coolant Cycler, Enhanced Coolant, Faster Attachments, Scrap Recycler, Hail-Mary Reset.
- Conditions/interactions worth indexing: Redlining, Cooled, Surging, Burning, Frozen, Shielded, Overcharged, System Malfunction, Critical Malfunction, Perfect Landing, Takedown.

Do not turn a guide's recommended list of parts into a legal simultaneously equipped build. The guide explicitly offers alternatives as parts appear during a run. It reports a pool of 300 parts, but does not establish here whether rank variants count separately [S8].

There are transcription inconsistencies in the guide (for example `Scrap Rzecycler` in one list versus `Scrap Recycler` in its explanatory section). Verify spelling against screenshots before making stable catalog IDs.

### Favors

IGN reports 20 Favors with three equipped at a time, and notes that Gadgeteer can change Part capacity [S9]. This means capacity may be conditional rather than a single universal number.

Named examples in the reviewed guides: Clandestine Aid, Mad Genius, Gadgeteer, Preferred Customer, Second Chance, Feet First, Team Vranki [S8, S9]. The `Scrap Dealer` heading in S9 discusses the `Preferred Customer` Favor; do not create a separate Favor from the heading without in-game evidence.

### Multiplayer racers

IGN describes character-specific builds, traits, Racer Styles, and mode-dependent availability [S10]. Its page is explicitly work in progress, and the visible table only lists these six podracers:

| Reported racer | Reported style |
| --- | --- |
| Dud Bolt | Stunt Runner |
| Gasgano | Survivor |
| Teemto Pagalies | Engineer |
| Sebulba | Brawler |
| Ben Quadinaros | Afterburner |
| Ody Mandrell | Redliner |

The guide's visible modes are `Podrace Tour` and `Quick Podrace`. Unlock cells show `N/A`, which is not sufficient evidence of default availability. The guide mentions more than a dozen multiplayer characters but does not supply a complete table in the reviewed content. The four supplied Podrace detail panels verify vehicle traits, not equipped Racer Styles; they do not replace or independently verify the guide-reported styles above. Do not assume the owner's broad `Podrace` context means either specific guide mode. Screenshot6 shows Griff Halloran with the Afterburner Racer Style and three style traits in the same owner-confirmed `Multiplayer Tour` context as screenshot5. Keep those style traits separate from Podrace vehicle traits. More evidence is needed for the full roster and exact mode constraints.

## Implications for the app

### Wiki sections

1. Racers and their mode-specific traits.
2. Vehicle classes and named vehicles.
3. Racer Styles with rank-specific traits and unlocks.
4. Abilities with rank/variant details.
5. Parts/cards with effects, conditions, ranks, and compatibility.
6. Favors and progression.
7. Status effects and mechanics, with cross-links to related cards.
8. Planets, circuits, and hazards.
9. Builds with an evidence/version badge and notes.

### Historical builder approach (superseded where implemented)

The stage editor, local library, and hash sharing now exist. The following remains design context, not proof that every proposed campaign flow, constraint, or calculation is implemented.

- Separate **Campaign build plan** from **Multiplayer racer reference**. Do not imply fixed multiplayer traits are freely editable.
- Campaign flow: context/mode → vehicle → style and rank → Favors → ability/part selection → notes and summary.
- Label a target campaign loadout as a **plan**, not a guarantee that randomized rewards will offer it.
- Make rank variants explicit. Never silently combine values from different ranks.
- Show verified constraints, unknown constraints, and conditional effects separately.
- Start with effect summaries and condition tags. Avoid calculated speed/DPS/handling scores until baseline values and stacking rules are known.
- Shared builds should eventually carry a schema version, game version/context, stable item IDs, and selected variants.
- Saved builds are browser-local; public publishing/accounts still require separate persistence and moderation work.

### Content metadata

The JSON catalog implements source tracking and per-claim verification; see [content-editing.md](content-editing.md) for schemas, authoring, and validation. The comprehensive catalog coverage is summarized above; only Flame Vent remains draft. Five build-observation records preserve screenshots 7–11 separately and are excluded from default public catalog queries. Schema/reference checks support these types, and VS Code schemas have been regenerated. This reference data now supplies the working wiki and editor, but is not proof of game-rule legality. Cached `getPublicCatalog` filters drafts and omits private source image paths. Runtime `readCatalog` validates JSON schemas/references; CLI-only `checkCatalogAssets` under `content:check:assets` checks evidence/public file existence without runtime output tracing bundling the repository.

For each entity/variant, capture: stable ID, display name, category, rank as displayed, rarity if explicitly shown, exact description, our summary, source references, verification status, compatible modes/classes if known, unlock requirement if known, game version/date, image asset reference, and reviewer notes.

Keep numeric effect values nullable. Store displayed wording before trying to parse structured triggers, durations, percentages, or stacking. Do not assume that everything rendered as an in-game card is the same entity category.

## Screenshot intake

The historical screenshot inventory below covers the earlier batches; later sources are recorded in the registry:

| Screenshot | Owner-confirmed context | Evidence |
| --- | --- | --- |
| 1 | Podrace | Dud Bolt racer detail panel: Vulptereen 327; Optimized Nozzles; Draggy Control Surfaces |
| 2 | Podrace | Gasgano racer detail panel: Custom Ord Pedrovia; Energy Surplus; Large Cross-Section |
| 3 | Podrace | Teemto Pagalies racer detail panel: IPG-X1131 LongTail; Bleeding-Edge Tech; Small Thrusters |
| 4 | Podrace | Sebulba racer detail panel: Plug-F Mammoth; Built for Battle; Old Dog, Old Tricks |
| 5 | Multiplayer Tour | Skim Speeder vehicle class: Streamlined Intakes; Sweeping Airfoils; Knife Edge |
| 6 | Multiplayer Tour (same context as screenshot5) | Griff Halloran: Afterburner Racer Style and three style traits |
| 7 | Mode, character, round unknown | Skim Speeder; Stunt Runner; displayed speed 322; Vectored Shockwave; Cooling Dampers II; 1/4 installed Parts |
| 8 | Mode, character, round unknown | Four offered reward choices: Heated Fuel I, Extended Alarm I, Overcharging Afterburner, Coolant Cycler II; not installed selections |
| 9 | Mode, character, round unknown | Skim Speeder; Stunt Runner; speed 347; 4/4 Parts: Cooling Dampers II, Heated Fuel II, Depleted Shielding, Expanding Fuel Tank; Vectored Shockwave II and Surge |
| 10 | Mode, character, round unknown | Skim Speeder; Stunt Runner; speed 359; 4/4 Parts: Afterburner Efficiency IV, Heated Fuel II, Depleted Shielding, Expanding Fuel Tank; Vectored Shockwave II and Impact Surge |
| 11 | Mode, character, round unknown | Skim Speeder; Stunt Runner; displayed speed 371; Vectored Shockwave II and Impact Surge II confirmed by native crop; 4/4 Parts observed, installed identities unknown (partially obscured) |
| 12 | Private screenshot evidence | Part reward cards; see source `screenshot-part-rewards-12` |
| 13 | Mode and character unknown | Survivor build evidence; actual source is `screenshot-survivor-build-13`, not a reward-13 source |
| 14 | Private screenshot evidence | Backer contracts; source notes only, not a new catalog entity or build observation |

Screenshot 11 confirms Vectored Shockwave II and Impact Surge II from a native-resolution crop. The Vectored Shockwave tooltip reads exactly: “Blast nearby opponents away, propelling you forward and applying System Malfunction to affected opponents.” This establishes its generic description, not a numerical rank-II difference. Screenshot 11 alone leaves Impact Surge II’s effect unknown; later secondary import descriptions remain separately reported. The general Ability tooltip describes offensive, defensive, or utility equippable technology that consumes Energy; it gives no numeric Energy cost. Parts are partially obscured: `installedParts` remains unknown despite the observed 4/4 count, with no inventory carried over from screenshot 10.

The Podrace panels show vehicle traits, not equipped abilities or Racer Style traits. The Skim Speeder panel provides class evidence; Griff Halloran's panel provides style evidence in its observed context. Do not transfer these traits between categories or use assumed mappings to overwrite guide-reported traits. Do not extrapolate availability to other modes.

Evidence copies are kept in `content/evidence/screenshots/`, outside `public`, with source tracking in `content/sources.json`. They are research evidence, not approved public image assets. Original uploads remain in the original external session; repository copies are nonpublic evidence. See [content-editing.md](content-editing.md) for the current screenshot inventory and catalog editing workflow.

Screenshots 7–11 are separate snapshots, not confirmed consecutive rounds. They name no mode, character, or round; do not attach them to Griff Halloran. Screenshot 10 differs from screenshot 9 by showing Afterburner Efficiency IV instead of Cooling Dampers II and Impact Surge instead of Surge; this does not prove an upgrade transaction or explain the speed change. Heated Fuel I (25%) and II (50%) are separate variants. Unlabeled dots do not establish rarity.

Some loadout, Style, Ability, and Part evidence is now available; we are not awaiting all card screenshots. More readable card details, ranks, and restrictions are still needed, including the remaining Flame Vent draft and Favor evidence. Useful additional evidence:

1. Full loadout screen showing the categories and available slots.
2. Racer-selection screen and one fully expanded racer detail panel.
3. One card detail view per category (Style, Ability, Part, Favor).
4. Multiple ranks of the same card, where available.
5. Screens showing restrictions, rank-up changes, and capacity-changing effects.

For each image:

- Keep the original, uncropped file; derived crops can be generated later.
- Include the title, full effect text, rank/rarity indicators, and any restriction text.
- Include platform, language, game version, and capture date if known; otherwise mark unknown.
- Transcribe what is readable. Flag ambiguous characters/numbers; do not guess.
- Record which claim came from which image and get unclear text checked by the owner.
- Remove account identifiers or unrelated personal details before publishing assets.
- Track asset provenance and permission separately from factual transcription. A publicly visible screenshot is not automatically a reusable licensed asset.

Owner screenshot evidence has been imported for research; this does not imply that public card or racer image assets have been approved or published. Do not invent missing artwork.

## Open questions before implementing strict validation

- Which categories does the owner mean by “cards” in the actual UI?
- Base ability and Part capacity; all capacity modifiers and whether they stack.
- Duplicate restrictions and whether variants replace or coexist with lower ranks.
- Exact class/mode compatibility, especially podracing versus other vehicles.
- Complete racer roster and whether character loadouts can be changed.
- Stat allocation options, ranges, and reset rules, if applicable.
- Rank/rarity taxonomy for each item category.
- Numeric baseline values, additive versus multiplicative effects, caps, and trigger ordering.
- Current game build number; platform-specific differences if any.
- Exact circuit names and layouts.

The official patch page currently says no patch has been released [S12]. This is an observation of that page, not independent proof that every installed platform build is identical.

## Sources

All sources accessed 2026-10-17. Prefer primary sources for general facts; use secondary guides to find details to verify in-game.

| ID | Source | Published/updated | Use |
| --- | --- | --- | --- |
| S1 | [StarWars.com — launch coverage](https://www.starwars.com/news/star-wars-galactic-racer) | 2026-10-06 | Release, modes, seven planets, story, workshop, runs |
| S2 | [Official game website](https://starwarsgalacticracer.com/) | Live page | Classes, platforms, setting, PvP |
| S3 | [Official — Game Tactics](https://starwarsgalacticracer.com/news/star-wars-galactic-racer-game-tactics/) | 2026-10-13 | Racer Styles + Abilities + Parts, build archetypes |
| S4 | [StarWars.com — vehicle guide](https://www.starwars.com/news/star-wars-galactic-racer-vehicle-guide) | 2026-09-29 | Four class identities and signature mechanics |
| S5 | [StarWars.com — reveal/interview](https://www.starwars.com/news/star-wars-galactic-racer-reveal-trailer) | 2026-04-30 update shown in related links | Runs-based decisions, handling, environments |
| S6 | [StarWars.com — game overview](https://www.starwars.com/games-apps/star-wars-galactic-racer) | Live page | Setting and core features |
| S7 | [IGN — Racer Styles](https://www.ign.com/wikis/star-wars-galactic-racer/Racer_Styles_and_How_to_Unlock_Them) | Updated 2026-10-10 | Reported style list, ranks, traits |
| S8 | [IGN — Best Vehicle Builds](https://www.ign.com/wikis/star-wars-galactic-racer/Best_Vehicle_Builds) | Live guide | Reported example abilities, Parts, Favors, randomized planning |
| S9 | [IGN — Best Favors](https://www.ign.com/wikis/star-wars-galactic-racer/Best_Favors) | Updated 2026-10-13 | Reported Favor count, equipped limit, capacity modifiers |
| S10 | [IGN — Playable Characters](https://www.ign.com/wikis/star-wars-galactic-racer/Playable_Characters) | Updated 2026-10-16 | Partial multiplayer roster and mode-specific builds |
| S11 | [Official — edition announcement](https://starwarsgalacticracer.com/news/official-gameplay-trailer/) | 2026-04-30 | Named Deluxe vehicles and edition requirements |
| S12 | [Official patch notes](https://starwarsgalacticracer.com/patchnotes/) | Live page | Patch tracking |

## Technical status

- Scaffold: Next.js 16.4.2 App Router, React/React DOM 19.3.1, TypeScript, Tailwind CSS 4, ESLint, npm lockfile.
- Versions were checked against the npm registry during setup, rather than assumed from older templates.
- Source-tracked JSON catalog, schemas, validation, and catalog loading/query helpers are implemented; the editing workflow is documented in [content-editing.md](content-editing.md). Screenshot evidence stays under `content/evidence/screenshots/`, outside the public asset directory.
- The implemented UI has four routes: `/` overview with a custom teal/orange responsive sidebar, `/wiki` source-backed search with mode filters and details, `/builder` stage editing (clone/add/delete, notes, Part variants, abilities, and a separate Crash Ability), and `/builds` browser-local saved plans.
- Local saves use browser storage, not accounts or server-persistent builds. Copy/share uses a self-contained `/builder#plan=…` URL marked unlisted; it includes plan notes and is readable by anyone with the link. It is not encrypted or account-private. Real authentication, database storage, and account sync are not implemented. The import/card refresh is published and verified; see [deployment.md](deployment.md) for current production checks.
- The comprehensive import/card refresh is deployed and verified. See [deployment.md](deployment.md) for the current production record. No database, upload flow, real authentication, account sync, server-persistent builds, or live game integration is implemented.
- Do not add infrastructure just because it is available on Vercel. Start with source-controlled content; consider Vercel Blob for approved images and a database for shared builds when those features are needed.
- Initial audit reported five high-severity development dependency findings through the ESLint config → fast-glob → micromatch → braces chain. Latest registry braces was 3.0.3, which the audit still flagged. Suggested audit fix was a major Next ESLint config downgrade; it was not applied. Production dependency audit and scaffold checks are recorded separately in the task verification output.
