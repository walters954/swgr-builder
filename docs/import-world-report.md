# World content import report

## Parent integration status (supersedes historical action items below)

Resolved: the parent merged the Parts, loadouts, and world source manifests with `npx tsx scripts/merge-content-sources.ts`; `content/sources.json` now contains 543 sources. Existing source records were retained. World entities are integrated into `readCatalog`, CLI counts and asset enumeration, and schema generation. The commands for the integrated workflow are:

```bash
npx tsx scripts/merge-content-sources.ts
npm run content:schemas
npm run content:check
npm run content:check:assets
```

The last command requires owner-local private evidence; the default check validates schema/references without private files. The parent reports 52 passing tests; final type/lint/build and desktop/mobile browser checks and production publication of this refresh remain pending. The 705-line worker report below is preserved verbatim as historical import evidence, including then-pending parent actions; those actions are no longer unresolved integration blockers. Reported secondary claims have not been promoted to official or screenshot verification.

## Original worker report (preserved)

Accessed: 2026-10-17. All imported claims are **reported**, supported by secondary source pages. No third-party “Official” badge is treated as official evidence.

## Method and limits

- Standard-library GET importer; at most three simultaneous requests, with persistent ignored HTML cache. No images downloaded or reused. No biographies or guides copied.
- Existing known claims, IDs, images, child arrays, official facts and screenshot evidence are preserved. Unknown fields alone are filled. Different candidate values are logged below, not substituted.
- Only named vehicle kits become vehicles. Wiki planet guides are not course records; Sentinel One on the wiki corresponds to Sentinel I on GamesLantern, not a new course.
- No statistics, lengths, unlock ranks, prices or global compatibility inferred. Explicit arcade events and racer tour participation are recorded as partial context.
- Hibi and Darius Pax remain playable-mode unknown. No Human species inferred. Unreviewed abilities remain unknown references until the parent integrates the ability manifest.
- Existing nonempty loadout/trait/profile arrays are not merged. Empty existing arrays also remain unchanged to preserve curated context.
- Parent action: merge `content/imports/world-sources.json` into `content/sources.json` before ordinary `readCatalog` validation. This worker does not edit the source registry.
- Parent action: extend CLI asset validation enumeration and schema generation for vehicles/tracks/planets; these files are outside worker ownership. Shared image source/permission checks already apply in validateCatalog.

## Coverage

Fetched/cached pages: 155. Fetch failures: 0.

| Family | Records reviewed/applied |
| --- | ---: |
| characters | 21 |
| planets | 7 |
| tracks | 46 |
| vehicle-classes | 4 |
| vehicles | 50 |

### Discovery inventory

| Source page | Disposition |
| --- | --- |
| https://galacticracer.gameslantern.com/planets | Discovery/context only; guide or index, no additional claims imported |
| https://galacticracer.gameslantern.com/planets/ando-prime | Structured facts reviewed/applied |
| https://galacticracer.gameslantern.com/planets/crait | Structured facts reviewed/applied |
| https://galacticracer.gameslantern.com/planets/derven-acos | Structured facts reviewed/applied |
| https://galacticracer.gameslantern.com/planets/jakku | Structured facts reviewed/applied |
| https://galacticracer.gameslantern.com/planets/lantaana | Structured facts reviewed/applied |
| https://galacticracer.gameslantern.com/planets/sentinel-i | Structured facts reviewed/applied |
| https://galacticracer.gameslantern.com/planets/tatooine | Structured facts reviewed/applied |
| https://galacticracer.gameslantern.com/racers | Discovery/context only; guide or index, no additional claims imported |
| https://galacticracer.gameslantern.com/racers/ary-quill | Structured facts reviewed/applied |
| https://galacticracer.gameslantern.com/racers/ben-quadinaros | Structured facts reviewed/applied |
| https://galacticracer.gameslantern.com/racers/biddy-blas | Structured facts reviewed/applied |
| https://galacticracer.gameslantern.com/racers/dud-bolt | Structured facts reviewed/applied |
| https://galacticracer.gameslantern.com/racers/fola-kanjen | Structured facts reviewed/applied |
| https://galacticracer.gameslantern.com/racers/gasgano | Structured facts reviewed/applied |
| https://galacticracer.gameslantern.com/racers/goli-02-r0 | Structured facts reviewed/applied |
| https://galacticracer.gameslantern.com/racers/griff-halloran | Structured facts reviewed/applied |
| https://galacticracer.gameslantern.com/racers/hibi | Structured facts reviewed/applied |
| https://galacticracer.gameslantern.com/racers/katja-mox | Structured facts reviewed/applied |
| https://galacticracer.gameslantern.com/racers/kestar-bool | Structured facts reviewed/applied |
| https://galacticracer.gameslantern.com/racers/lyren-shok | Structured facts reviewed/applied |
| https://galacticracer.gameslantern.com/racers/malis-vazosk | Structured facts reviewed/applied |
| https://galacticracer.gameslantern.com/racers/nik-skandaro | Structured facts reviewed/applied |
| https://galacticracer.gameslantern.com/racers/ody-mandrell | Structured facts reviewed/applied |
| https://galacticracer.gameslantern.com/racers/sebulba | Structured facts reviewed/applied |
| https://galacticracer.gameslantern.com/racers/sen-fira | Structured facts reviewed/applied |
| https://galacticracer.gameslantern.com/racers/shade | Structured facts reviewed/applied |
| https://galacticracer.gameslantern.com/racers/soren-zaks | Structured facts reviewed/applied |
| https://galacticracer.gameslantern.com/racers/teemto-pagalies | Structured facts reviewed/applied |
| https://galacticracer.gameslantern.com/tracks | Discovery/context only; guide or index, no additional claims imported |
| https://galacticracer.gameslantern.com/tracks/ahlren-jungle-speedway | Structured facts reviewed/applied |
| https://galacticracer.gameslantern.com/tracks/andobi-edge | Structured facts reviewed/applied |
| https://galacticracer.gameslantern.com/tracks/bool-river-run | Structured facts reviewed/applied |
| https://galacticracer.gameslantern.com/tracks/caustic-fields | Structured facts reviewed/applied |
| https://galacticracer.gameslantern.com/tracks/cor-loop-b-short-01 | Structured facts reviewed/applied |
| https://galacticracer.gameslantern.com/tracks/corrosion-hypersphere | Structured facts reviewed/applied |
| https://galacticracer.gameslantern.com/tracks/crimson-mines | Structured facts reviewed/applied |
| https://galacticracer.gameslantern.com/tracks/crystal-caverns | Structured facts reviewed/applied |
| https://galacticracer.gameslantern.com/tracks/dai-bendu-ascension | Structured facts reviewed/applied |
| https://galacticracer.gameslantern.com/tracks/debris-dunes | Structured facts reviewed/applied |
| https://galacticracer.gameslantern.com/tracks/dhunkri-river-circuit | Structured facts reviewed/applied |
| https://galacticracer.gameslantern.com/tracks/fallen-empire | Structured facts reviewed/applied |
| https://galacticracer.gameslantern.com/tracks/forgil-canyon | Structured facts reviewed/applied |
| https://galacticracer.gameslantern.com/tracks/geothermal-tour | Structured facts reviewed/applied |
| https://galacticracer.gameslantern.com/tracks/griffins-flight | Structured facts reviewed/applied |
| https://galacticracer.gameslantern.com/tracks/holdfasts-folly | Structured facts reviewed/applied |
| https://galacticracer.gameslantern.com/tracks/hunk-of-junk | Structured facts reviewed/applied |
| https://galacticracer.gameslantern.com/tracks/ice-field-circuit | Structured facts reviewed/applied |
| https://galacticracer.gameslantern.com/tracks/mawhonic-speedway | Structured facts reviewed/applied |
| https://galacticracer.gameslantern.com/tracks/mineral-loop | Structured facts reviewed/applied |
| https://galacticracer.gameslantern.com/tracks/monastery-mountains | Structured facts reviewed/applied |
| https://galacticracer.gameslantern.com/tracks/moro-kehn-tunnels | Structured facts reviewed/applied |
| https://galacticracer.gameslantern.com/tracks/mos-espa-speedway | Structured facts reviewed/applied |
| https://galacticracer.gameslantern.com/tracks/mountain-to-sea | Structured facts reviewed/applied |
| https://galacticracer.gameslantern.com/tracks/overflow-rally | Structured facts reviewed/applied |
| https://galacticracer.gameslantern.com/tracks/prologue-ando-prime | Structured facts reviewed/applied |
| https://galacticracer.gameslantern.com/tracks/prologue-crait | Structured facts reviewed/applied |
| https://galacticracer.gameslantern.com/tracks/prologue-jakku | Structured facts reviewed/applied |
| https://galacticracer.gameslantern.com/tracks/prologue-sentinel-i | Structured facts reviewed/applied |
| https://galacticracer.gameslantern.com/tracks/quadinaros-revenge | Structured facts reviewed/applied |
| https://galacticracer.gameslantern.com/tracks/rhodochrosite-run | Structured facts reviewed/applied |
| https://galacticracer.gameslantern.com/tracks/salt-circle | Structured facts reviewed/applied |
| https://galacticracer.gameslantern.com/tracks/scrap-spiral | Structured facts reviewed/applied |
| https://galacticracer.gameslantern.com/tracks/sebulbas-challenge | Structured facts reviewed/applied |
| https://galacticracer.gameslantern.com/tracks/sentinel-lakes | Structured facts reviewed/applied |
| https://galacticracer.gameslantern.com/tracks/skakoan-gambit | Structured facts reviewed/applied |
| https://galacticracer.gameslantern.com/tracks/stadium-showdown | Structured facts reviewed/applied |
| https://galacticracer.gameslantern.com/tracks/star-destroyer-speedway | Structured facts reviewed/applied |
| https://galacticracer.gameslantern.com/tracks/the-acid-ring | Structured facts reviewed/applied |
| https://galacticracer.gameslantern.com/tracks/the-galactic-gauntlet | Structured facts reviewed/applied |
| https://galacticracer.gameslantern.com/tracks/the-galactic-league-championship | Structured facts reviewed/applied |
| https://galacticracer.gameslantern.com/tracks/the-giants-graveyard | Structured facts reviewed/applied |
| https://galacticracer.gameslantern.com/tracks/the-pyroducts | Structured facts reviewed/applied |
| https://galacticracer.gameslantern.com/tracks/the-qualifier | Structured facts reviewed/applied |
| https://galacticracer.gameslantern.com/tracks/the-war-fields | Structured facts reviewed/applied |
| https://galacticracer.gameslantern.com/tracks/vonium-pipeline | Structured facts reviewed/applied |
| https://galacticracer.gameslantern.com/vehicle-classes | Discovery/context only; guide or index, no additional claims imported |
| https://galacticracer.gameslantern.com/vehicle-classes/landspeeder | Structured facts reviewed/applied |
| https://galacticracer.gameslantern.com/vehicle-classes/podracer | Structured facts reviewed/applied |
| https://galacticracer.gameslantern.com/vehicle-classes/skim-speeder | Structured facts reviewed/applied |
| https://galacticracer.gameslantern.com/vehicle-classes/speeder-bike | Structured facts reviewed/applied |
| https://galacticracer.gameslantern.com/vehicle-parts | Discovery/context only; guide or index, no additional claims imported |
| https://galacticracer.gameslantern.com/vehicles | Discovery/context only; guide or index, no additional claims imported |
| https://galacticracer.gameslantern.com/vehicles/am-1 | Structured facts reviewed/applied |
| https://galacticracer.gameslantern.com/vehicles/arz-41 | Structured facts reviewed/applied |
| https://galacticracer.gameslantern.com/vehicles/ben-quadinaross-podracer | Structured facts reviewed/applied |
| https://galacticracer.gameslantern.com/vehicles/ben-quadinaross-podracer-aged | Structured facts reviewed/applied |
| https://galacticracer.gameslantern.com/vehicles/cesca | Structured facts reviewed/applied |
| https://galacticracer.gameslantern.com/vehicles/ciza-t | Structured facts reviewed/applied |
| https://galacticracer.gameslantern.com/vehicles/darc-x | Structured facts reviewed/applied |
| https://galacticracer.gameslantern.com/vehicles/drd-61 | Structured facts reviewed/applied |
| https://galacticracer.gameslantern.com/vehicles/dreshi | Structured facts reviewed/applied |
| https://galacticracer.gameslantern.com/vehicles/dud-bolts-podracer | Structured facts reviewed/applied |
| https://galacticracer.gameslantern.com/vehicles/dud-bolts-podracer-aged | Structured facts reviewed/applied |
| https://galacticracer.gameslantern.com/vehicles/gasganos-podracer | Structured facts reviewed/applied |
| https://galacticracer.gameslantern.com/vehicles/gasganos-podracer-aged | Structured facts reviewed/applied |
| https://galacticracer.gameslantern.com/vehicles/hc-8 | Structured facts reviewed/applied |
| https://galacticracer.gameslantern.com/vehicles/jakobeast | Structured facts reviewed/applied |
| https://galacticracer.gameslantern.com/vehicles/kestar-bools-podracer | Structured facts reviewed/applied |
| https://galacticracer.gameslantern.com/vehicles/killion | Structured facts reviewed/applied |
| https://galacticracer.gameslantern.com/vehicles/kjc-99 | Structured facts reviewed/applied |
| https://galacticracer.gameslantern.com/vehicles/ko-5 | Structured facts reviewed/applied |
| https://galacticracer.gameslantern.com/vehicles/kreed | Structured facts reviewed/applied |
| https://galacticracer.gameslantern.com/vehicles/magus | Structured facts reviewed/applied |
| https://galacticracer.gameslantern.com/vehicles/moksi | Structured facts reviewed/applied |
| https://galacticracer.gameslantern.com/vehicles/msm-04 | Structured facts reviewed/applied |
| https://galacticracer.gameslantern.com/vehicles/napaco-d | Structured facts reviewed/applied |
| https://galacticracer.gameslantern.com/vehicles/nl-4 | Structured facts reviewed/applied |
| https://galacticracer.gameslantern.com/vehicles/novyok | Structured facts reviewed/applied |
| https://galacticracer.gameslantern.com/vehicles/ody-mandrells-podracer | Structured facts reviewed/applied |
| https://galacticracer.gameslantern.com/vehicles/ody-mandrells-podracer-aged | Structured facts reviewed/applied |
| https://galacticracer.gameslantern.com/vehicles/pelake | Structured facts reviewed/applied |
| https://galacticracer.gameslantern.com/vehicles/rak-s | Structured facts reviewed/applied |
| https://galacticracer.gameslantern.com/vehicles/rar-27 | Structured facts reviewed/applied |
| https://galacticracer.gameslantern.com/vehicles/rathtar | Structured facts reviewed/applied |
| https://galacticracer.gameslantern.com/vehicles/reek | Structured facts reviewed/applied |
| https://galacticracer.gameslantern.com/vehicles/revasi-g | Structured facts reviewed/applied |
| https://galacticracer.gameslantern.com/vehicles/ricon | Structured facts reviewed/applied |
| https://galacticracer.gameslantern.com/vehicles/sah-66 | Structured facts reviewed/applied |
| https://galacticracer.gameslantern.com/vehicles/sebulbas-podracer | Structured facts reviewed/applied |
| https://galacticracer.gameslantern.com/vehicles/shades-podracer | Structured facts reviewed/applied |
| https://galacticracer.gameslantern.com/vehicles/shades-podracer-phase-2 | Structured facts reviewed/applied |
| https://galacticracer.gameslantern.com/vehicles/shades-podracer-phase-3 | Structured facts reviewed/applied |
| https://galacticracer.gameslantern.com/vehicles/sling | Structured facts reviewed/applied |
| https://galacticracer.gameslantern.com/vehicles/starweb | Structured facts reviewed/applied |
| https://galacticracer.gameslantern.com/vehicles/su-3 | Structured facts reviewed/applied |
| https://galacticracer.gameslantern.com/vehicles/tahan | Structured facts reviewed/applied |
| https://galacticracer.gameslantern.com/vehicles/teemto-pagaliess-podracer | Structured facts reviewed/applied |
| https://galacticracer.gameslantern.com/vehicles/vornskr | Structured facts reviewed/applied |
| https://galacticracer.gameslantern.com/vehicles/wi-9 | Structured facts reviewed/applied |
| https://galacticracer.gameslantern.com/vehicles/wist-l | Structured facts reviewed/applied |
| https://galacticracer.gameslantern.com/vehicles/zaknee | Structured facts reviewed/applied |
| https://galacticracer.gameslantern.com/vehicles/zillo | Structured facts reviewed/applied |
| https://swgalacticracer.wiki/ | Discovery/context only; guide or index, no additional claims imported |
| https://swgalacticracer.wiki/characters/ | Discovery/context only; guide or index, no additional claims imported |
| https://swgalacticracer.wiki/characters/darius-pax/ | Structured facts reviewed/applied |
| https://swgalacticracer.wiki/characters/hibi/ | Discovery/context only; guide or index, no additional claims imported |
| https://swgalacticracer.wiki/characters/kestar-bool/ | Discovery/context only; guide or index, no additional claims imported |
| https://swgalacticracer.wiki/characters/sebulba/ | Discovery/context only; guide or index, no additional claims imported |
| https://swgalacticracer.wiki/characters/shade/ | Discovery/context only; guide or index, no additional claims imported |
| https://swgalacticracer.wiki/tracks/ | Discovery/context only; guide or index, no additional claims imported |
| https://swgalacticracer.wiki/tracks/all-tracks-planets/ | Discovery/context only; guide or index, no additional claims imported |
| https://swgalacticracer.wiki/tracks/ando-prime/ | Discovery/context only; guide or index, no additional claims imported |
| https://swgalacticracer.wiki/tracks/crait/ | Discovery/context only; guide or index, no additional claims imported |
| https://swgalacticracer.wiki/tracks/derven-acos/ | Discovery/context only; guide or index, no additional claims imported |
| https://swgalacticracer.wiki/tracks/jakku/ | Discovery/context only; guide or index, no additional claims imported |
| https://swgalacticracer.wiki/tracks/lantaana/ | Discovery/context only; guide or index, no additional claims imported |
| https://swgalacticracer.wiki/tracks/sentinel-one/ | Discovery/context only; guide or index, no additional claims imported |
| https://swgalacticracer.wiki/tracks/tatooine/ | Discovery/context only; guide or index, no additional claims imported |
| https://swgalacticracer.wiki/vehicles/ | Discovery/context only; guide or index, no additional claims imported |
| https://swgalacticracer.wiki/vehicles/kor-sarun/ | Discovery/context only; guide or index, no additional claims imported |
| https://swgalacticracer.wiki/vehicles/landspeeders/ | Discovery/context only; guide or index, no additional claims imported |
| https://swgalacticracer.wiki/vehicles/podracers/ | Discovery/context only; guide or index, no additional claims imported |
| https://swgalacticracer.wiki/vehicles/skim-speeders/ | Discovery/context only; guide or index, no additional claims imported |
| https://swgalacticracer.wiki/vehicles/speeder-bikes/ | Discovery/context only; guide or index, no additional claims imported |

### Fetch failures

None.

## Conflicts and retained claims

- Wiki Kestar Bool guide reports Rank 40 / Weaponised; GamesLantern reports Rank 39 / Weaponized. Neither unlock rank is imported; existing known claims remain untouched.
- GamesLantern introductory racer style may differ from its multiplayer style headings (notably pod racers). Pod summary styles are not assigned to tour loadouts.
- Wiki third-party “Official” badges do not change evidence classification.
- characters/dud-bolt.summary: retained "Dud Bolt holds no shame in doing whatever it takes to win...or earn a paycheck. The Vulptereen is a fan favorite on the track, as well as an ally of Sebulba's, who has on many occasions paid the racer to take down fellow competitors mid-race." (screenshot-verified); candidate "Dud Bolt is listed as a Galactic League racer." — https://galacticracer.gameslantern.com/racers/dud-bolt
- characters/dud-bolt.playableModes: retained ["podrace"] (screenshot-verified); candidate ["podrace-tour"] — https://galacticracer.gameslantern.com/racers/dud-bolt
- characters/gasgano.summary: retained "Unwilling to back down despite ruthless competitors, Gasgano leaves nothing behind on the track. With his four arms, he makes podracing look easy, earning the Xexto celebrity status." (screenshot-verified); candidate "Gasgano is listed as a Galactic League racer." — https://galacticracer.gameslantern.com/racers/gasgano
- characters/gasgano.playableModes: retained ["podrace"] (screenshot-verified); candidate ["podrace-tour"] — https://galacticracer.gameslantern.com/racers/gasgano
- characters/griff-halloran.summary: retained "Still sporting the armor from his days flying in the Imperial Navy, Griff Halloran struggles to fit into the changing galaxy. Flying is the one thing he knows he's good at—and the one thing he'll fight to keep." (screenshot-verified); candidate "Griff Halloran is listed as a Galactic League racer." — https://galacticracer.gameslantern.com/racers/griff-halloran
- characters/hibi.summary: retained "Shade's Ardennian mechanic, running a workshop in each planet's paddock to fit and sell parts." (official); candidate "Hibi works as Shade’s mechanic." — https://galacticracer.gameslantern.com/racers/hibi
- characters/sebulba.summary: retained "Sebulba carved out a well-deserved place in history as one of the galaxy's greatest racers. As canny as ever despite his advancing years, he's insisted on finding a role for himself in the Galactic League, unwilling to allow his legendary name to be forgotten." (screenshot-verified); candidate "Sebulba is listed as a Galactic League racer." — https://galacticracer.gameslantern.com/racers/sebulba
- characters/sebulba.playableModes: retained ["podrace"] (screenshot-verified); candidate ["podrace-tour"] — https://galacticracer.gameslantern.com/racers/sebulba
- characters/shade.summary: retained "The campaign protagonist, an up-and-coming racer seeking to unseat Galactic League champion Kestar Bool." (official); candidate "Shade is listed as a Galactic League racer." — https://galacticracer.gameslantern.com/racers/shade
- characters/shade.roles: retained ["protagonist", "racer"] (official); candidate ["racer"] — https://galacticracer.gameslantern.com/racers/shade
- characters/teemto-pagalies.summary: retained "The charming Teemto Pagalies is popular everywhere except his own homeworld, from which he was outcast. The Veknoid doesn't complain. He's got all the fans he needs cheering for him on the track." (screenshot-verified); candidate "Teemto Pagalies is listed as a Galactic League racer." — https://galacticracer.gameslantern.com/racers/teemto-pagalies
- characters/teemto-pagalies.playableModes: retained ["podrace"] (screenshot-verified); candidate ["podrace-tour"] — https://galacticracer.gameslantern.com/racers/teemto-pagalies
- vehicle-classes/skim-speeder.summary: retained "A repulsorcraft class that favors flowing racing lines and momentum, with banked turns and a Knife Edge maneuver for tighter gaps and corners." (official); candidate "Banking racing craft with a Knife Edge cornering technique." — https://galacticracer.gameslantern.com/vehicle-classes/skim-speeder
- vehicle-classes/speeder-bike.summary: retained "Speeder Bike class shown with a Clean Racer build." (screenshot-verified); candidate "Agile racing bike with rapid acceleration and Kinetic Burst." — https://galacticracer.gameslantern.com/vehicle-classes/speeder-bike

## Imported claim provenance

Each row names the retained import claim, its structured value, and its supporting public page. Unknown claims carry no source IDs.

| Record / field | Value | Source page |
| --- | --- | --- |
| planets/ando-prime:.name | "Ando Prime" | https://galacticracer.gameslantern.com/planets/ando-prime |
| planets/ando-prime:.summary | "Ando Prime is a racing destination in the Galactic League." | https://galacticracer.gameslantern.com/planets/ando-prime |
| planets/ando-prime:.environment | "Frozen tundra with steep cliffs." | https://galacticracer.gameslantern.com/planets/ando-prime |
| planets/crait:.name | "Crait" | https://galacticracer.gameslantern.com/planets/crait |
| planets/crait:.summary | "Crait is a racing destination in the Galactic League." | https://galacticracer.gameslantern.com/planets/crait |
| planets/crait:.environment | "Salt plains and crystal caves." | https://galacticracer.gameslantern.com/planets/crait |
| planets/derven-acos:.name | "Derven Acos" | https://galacticracer.gameslantern.com/planets/derven-acos |
| planets/derven-acos:.summary | "Derven Acos is a racing destination in the Galactic League." | https://galacticracer.gameslantern.com/planets/derven-acos |
| planets/derven-acos:.environment | "Debris-ringed planetoid with a racing stadium." | https://galacticracer.gameslantern.com/planets/derven-acos |
| planets/jakku:.name | "Jakku" | https://galacticracer.gameslantern.com/planets/jakku |
| planets/jakku:.summary | "Jakku is a racing destination in the Galactic League." | https://galacticracer.gameslantern.com/planets/jakku |
| planets/jakku:.environment | "Hot desert scattered with starship wreckage." | https://galacticracer.gameslantern.com/planets/jakku |
| planets/lantaana:.name | "Lantaana" | https://galacticracer.gameslantern.com/planets/lantaana |
| planets/lantaana:.summary | "Lantaana is a racing destination in the Galactic League." | https://galacticracer.gameslantern.com/planets/lantaana |
| planets/lantaana:.environment | "Jungle terrain with lava and cool waterways." | https://galacticracer.gameslantern.com/planets/lantaana |
| planets/sentinel-i:.name | "Sentinel I" | https://galacticracer.gameslantern.com/planets/sentinel-i |
| planets/sentinel-i:.summary | "Sentinel I is a racing destination in the Galactic League." | https://galacticracer.gameslantern.com/planets/sentinel-i |
| planets/sentinel-i:.environment | "Acid rivers and mineral-harvesting installations." | https://galacticracer.gameslantern.com/planets/sentinel-i |
| planets/tatooine:.name | "Tatooine" | https://galacticracer.gameslantern.com/planets/tatooine |
| planets/tatooine:.summary | "Tatooine is a racing destination in the Galactic League." | https://galacticracer.gameslantern.com/planets/tatooine |
| planets/tatooine:.environment | "Desert setting with a long podracing history." | https://galacticracer.gameslantern.com/planets/tatooine |
| characters/ary-quill:.name | "Ary Quill" | https://galacticracer.gameslantern.com/racers/ary-quill |
| characters/ary-quill:.summary | "Ary Quill is listed as a Galactic League racer." | https://galacticracer.gameslantern.com/racers/ary-quill |
| characters/ary-quill:.roles | ["racer"] | https://galacticracer.gameslantern.com/racers/ary-quill |
| characters/ary-quill:.species | "Namaran" | https://galacticracer.gameslantern.com/racers/ary-quill |
| characters/ary-quill:.playableModes | ["multiplayer-tour"] | https://galacticracer.gameslantern.com/racers/ary-quill |
| characters/ary-quill:.loadouts[0].racerStyle | "Redliner" | https://galacticracer.gameslantern.com/racers/ary-quill |
| characters/ben-quadinaros:.name | "Ben Quadinaros" | https://galacticracer.gameslantern.com/racers/ben-quadinaros |
| characters/ben-quadinaros:.summary | "Ben Quadinaros is listed as a Galactic League racer." | https://galacticracer.gameslantern.com/racers/ben-quadinaros |
| characters/ben-quadinaros:.roles | ["racer"] | https://galacticracer.gameslantern.com/racers/ben-quadinaros |
| characters/ben-quadinaros:.species | "Toong" | https://galacticracer.gameslantern.com/racers/ben-quadinaros |
| characters/ben-quadinaros:.playableModes | ["podrace-tour"] | https://galacticracer.gameslantern.com/racers/ben-quadinaros |
| characters/biddy-blas:.name | "Biddy Blas" | https://galacticracer.gameslantern.com/racers/biddy-blas |
| characters/biddy-blas:.summary | "Biddy Blas is listed as a Galactic League racer." | https://galacticracer.gameslantern.com/racers/biddy-blas |
| characters/biddy-blas:.roles | ["racer"] | https://galacticracer.gameslantern.com/racers/biddy-blas |
| characters/biddy-blas:.species | "Crocin" | https://galacticracer.gameslantern.com/racers/biddy-blas |
| characters/biddy-blas:.playableModes | ["multiplayer-tour"] | https://galacticracer.gameslantern.com/racers/biddy-blas |
| characters/biddy-blas:.loadouts[0].racerStyle | "Firebug" | https://galacticracer.gameslantern.com/racers/biddy-blas |
| characters/fola-kanjen:.name | "Fola Kanjen" | https://galacticracer.gameslantern.com/racers/fola-kanjen |
| characters/fola-kanjen:.summary | "Fola Kanjen is listed as a Galactic League racer." | https://galacticracer.gameslantern.com/racers/fola-kanjen |
| characters/fola-kanjen:.roles | ["racer"] | https://galacticracer.gameslantern.com/racers/fola-kanjen |
| characters/fola-kanjen:.playableModes | ["multiplayer-tour"] | https://galacticracer.gameslantern.com/racers/fola-kanjen |
| characters/fola-kanjen:.loadouts[0].racerStyle | "Tenacious" | https://galacticracer.gameslantern.com/racers/fola-kanjen |
| characters/goli-02-r0:.name | "Goli & 02-R0" | https://galacticracer.gameslantern.com/racers/goli-02-r0 |
| characters/goli-02-r0:.summary | "Goli & 02-R0 is listed as a Galactic League racer." | https://galacticracer.gameslantern.com/racers/goli-02-r0 |
| characters/goli-02-r0:.roles | ["racer"] | https://galacticracer.gameslantern.com/racers/goli-02-r0 |
| characters/goli-02-r0:.playableModes | ["multiplayer-tour"] | https://galacticracer.gameslantern.com/racers/goli-02-r0 |
| characters/goli-02-r0:.loadouts[0].racerStyle | "Clean Racer" | https://galacticracer.gameslantern.com/racers/goli-02-r0 |
| characters/katja-mox:.name | "Katja Mox" | https://galacticracer.gameslantern.com/racers/katja-mox |
| characters/katja-mox:.summary | "Katja Mox is listed as a Galactic League racer." | https://galacticracer.gameslantern.com/racers/katja-mox |
| characters/katja-mox:.roles | ["racer"] | https://galacticracer.gameslantern.com/racers/katja-mox |
| characters/katja-mox:.playableModes | ["multiplayer-tour"] | https://galacticracer.gameslantern.com/racers/katja-mox |
| characters/katja-mox:.loadouts[0].racerStyle | "Tech Expert" | https://galacticracer.gameslantern.com/racers/katja-mox |
| characters/kestar-bool:.name | "Kestar Bool" | https://galacticracer.gameslantern.com/racers/kestar-bool |
| characters/kestar-bool:.summary | "Kestar Bool is listed as a Galactic League racer." | https://galacticracer.gameslantern.com/racers/kestar-bool |
| characters/kestar-bool:.roles | ["racer"] | https://galacticracer.gameslantern.com/racers/kestar-bool |
| characters/lyren-shok:.name | "Lyren Shok" | https://galacticracer.gameslantern.com/racers/lyren-shok |
| characters/lyren-shok:.summary | "Lyren Shok is listed as a Galactic League racer." | https://galacticracer.gameslantern.com/racers/lyren-shok |
| characters/lyren-shok:.roles | ["racer"] | https://galacticracer.gameslantern.com/racers/lyren-shok |
| characters/lyren-shok:.species | "Nautolan" | https://galacticracer.gameslantern.com/racers/lyren-shok |
| characters/lyren-shok:.playableModes | ["multiplayer-tour"] | https://galacticracer.gameslantern.com/racers/lyren-shok |
| characters/lyren-shok:.loadouts[0].racerStyle | "Stunt Runner" | https://galacticracer.gameslantern.com/racers/lyren-shok |
| characters/malis-vazosk:.name | "Malis Vazosk" | https://galacticracer.gameslantern.com/racers/malis-vazosk |
| characters/malis-vazosk:.summary | "Malis Vazosk is listed as a Galactic League racer." | https://galacticracer.gameslantern.com/racers/malis-vazosk |
| characters/malis-vazosk:.roles | ["racer"] | https://galacticracer.gameslantern.com/racers/malis-vazosk |
| characters/malis-vazosk:.species | "Trandoshan" | https://galacticracer.gameslantern.com/racers/malis-vazosk |
| characters/malis-vazosk:.playableModes | ["multiplayer-tour"] | https://galacticracer.gameslantern.com/racers/malis-vazosk |
| characters/malis-vazosk:.loadouts[0].racerStyle | "Brawler" | https://galacticracer.gameslantern.com/racers/malis-vazosk |
| characters/nik-skandaro:.name | "Nik Skandaro" | https://galacticracer.gameslantern.com/racers/nik-skandaro |
| characters/nik-skandaro:.summary | "Nik Skandaro is listed as a Galactic League racer." | https://galacticracer.gameslantern.com/racers/nik-skandaro |
| characters/nik-skandaro:.roles | ["racer"] | https://galacticracer.gameslantern.com/racers/nik-skandaro |
| characters/nik-skandaro:.species | "Zabrak" | https://galacticracer.gameslantern.com/racers/nik-skandaro |
| characters/nik-skandaro:.playableModes | ["multiplayer-tour"] | https://galacticracer.gameslantern.com/racers/nik-skandaro |
| characters/nik-skandaro:.loadouts[0].racerStyle | "Survivor" | https://galacticracer.gameslantern.com/racers/nik-skandaro |
| characters/ody-mandrell:.name | "Ody Mandrell" | https://galacticracer.gameslantern.com/racers/ody-mandrell |
| characters/ody-mandrell:.summary | "Ody Mandrell is listed as a Galactic League racer." | https://galacticracer.gameslantern.com/racers/ody-mandrell |
| characters/ody-mandrell:.roles | ["racer"] | https://galacticracer.gameslantern.com/racers/ody-mandrell |
| characters/ody-mandrell:.species | "Er’Kit" | https://galacticracer.gameslantern.com/racers/ody-mandrell |
| characters/ody-mandrell:.playableModes | ["podrace-tour"] | https://galacticracer.gameslantern.com/racers/ody-mandrell |
| characters/sen-fira:.name | "Sen Fira" | https://galacticracer.gameslantern.com/racers/sen-fira |
| characters/sen-fira:.summary | "Sen Fira is listed as a Galactic League racer." | https://galacticracer.gameslantern.com/racers/sen-fira |
| characters/sen-fira:.roles | ["racer"] | https://galacticracer.gameslantern.com/racers/sen-fira |
| characters/sen-fira:.species | "Tognath" | https://galacticracer.gameslantern.com/racers/sen-fira |
| characters/sen-fira:.playableModes | ["multiplayer-tour"] | https://galacticracer.gameslantern.com/racers/sen-fira |
| characters/sen-fira:.loadouts[0].racerStyle | "Slipstreamer" | https://galacticracer.gameslantern.com/racers/sen-fira |
| characters/shade:.playableModes | ["multiplayer-tour"] | https://galacticracer.gameslantern.com/racers/shade |
| characters/soren-zaks:.name | "Soren Zaks" | https://galacticracer.gameslantern.com/racers/soren-zaks |
| characters/soren-zaks:.summary | "Soren Zaks is listed as a Galactic League racer." | https://galacticracer.gameslantern.com/racers/soren-zaks |
| characters/soren-zaks:.roles | ["racer"] | https://galacticracer.gameslantern.com/racers/soren-zaks |
| characters/soren-zaks:.playableModes | ["multiplayer-tour"] | https://galacticracer.gameslantern.com/racers/soren-zaks |
| characters/soren-zaks:.loadouts[0].racerStyle | "Engineer" | https://galacticracer.gameslantern.com/racers/soren-zaks |
| tracks/ahlren-jungle-speedway:.name | "Ahlren Jungle Speedway" | https://galacticracer.gameslantern.com/tracks/ahlren-jungle-speedway |
| tracks/ahlren-jungle-speedway:.summary | "Ahlren Jungle Speedway is a race course on Lantaana." | https://galacticracer.gameslantern.com/tracks/ahlren-jungle-speedway |
| tracks/ahlren-jungle-speedway:.planet | "Lantaana" | https://galacticracer.gameslantern.com/tracks/ahlren-jungle-speedway |
| tracks/ahlren-jungle-speedway:.availableModes | ["arcade"] | https://galacticracer.gameslantern.com/tracks/ahlren-jungle-speedway |
| tracks/andobi-edge:.name | "Andobi Edge" | https://galacticracer.gameslantern.com/tracks/andobi-edge |
| tracks/andobi-edge:.summary | "Andobi Edge is a race course on Ando Prime." | https://galacticracer.gameslantern.com/tracks/andobi-edge |
| tracks/andobi-edge:.planet | "Ando Prime" | https://galacticracer.gameslantern.com/tracks/andobi-edge |
| tracks/andobi-edge:.availableModes | ["arcade"] | https://galacticracer.gameslantern.com/tracks/andobi-edge |
| tracks/bool-river-run:.name | "Bool River Run" | https://galacticracer.gameslantern.com/tracks/bool-river-run |
| tracks/bool-river-run:.summary | "Bool River Run is a race course on Sentinel I." | https://galacticracer.gameslantern.com/tracks/bool-river-run |
| tracks/bool-river-run:.planet | "Sentinel I" | https://galacticracer.gameslantern.com/tracks/bool-river-run |
| tracks/bool-river-run:.hazards | ["Mines on some routes"] | https://galacticracer.gameslantern.com/tracks/bool-river-run |
| tracks/bool-river-run:.availableModes | ["arcade"] | https://galacticracer.gameslantern.com/tracks/bool-river-run |
| tracks/caustic-fields:.name | "Caustic Fields" | https://galacticracer.gameslantern.com/tracks/caustic-fields |
| tracks/caustic-fields:.summary | "Caustic Fields is a race course on Sentinel I." | https://galacticracer.gameslantern.com/tracks/caustic-fields |
| tracks/caustic-fields:.planet | "Sentinel I" | https://galacticracer.gameslantern.com/tracks/caustic-fields |
| tracks/caustic-fields:.hazards | ["Mines on some routes"] | https://galacticracer.gameslantern.com/tracks/caustic-fields |
| tracks/caustic-fields:.availableModes | ["arcade"] | https://galacticracer.gameslantern.com/tracks/caustic-fields |
| tracks/cor-loop-b-short-01:.name | "COR [LOOP B - SHORT 01]" | https://galacticracer.gameslantern.com/tracks/cor-loop-b-short-01 |
| tracks/cor-loop-b-short-01:.summary | "COR [LOOP B - SHORT 01] is a race course on Ando Prime." | https://galacticracer.gameslantern.com/tracks/cor-loop-b-short-01 |
| tracks/cor-loop-b-short-01:.planet | "Ando Prime" | https://galacticracer.gameslantern.com/tracks/cor-loop-b-short-01 |
| tracks/corrosion-hypersphere:.name | "Corrosion Hypersphere" | https://galacticracer.gameslantern.com/tracks/corrosion-hypersphere |
| tracks/corrosion-hypersphere:.summary | "Corrosion Hypersphere is a race course on Sentinel I." | https://galacticracer.gameslantern.com/tracks/corrosion-hypersphere |
| tracks/corrosion-hypersphere:.planet | "Sentinel I" | https://galacticracer.gameslantern.com/tracks/corrosion-hypersphere |
| tracks/crimson-mines:.name | "Crimson Mines" | https://galacticracer.gameslantern.com/tracks/crimson-mines |
| tracks/crimson-mines:.summary | "Crimson Mines is a race course on Crait." | https://galacticracer.gameslantern.com/tracks/crimson-mines |
| tracks/crimson-mines:.planet | "Crait" | https://galacticracer.gameslantern.com/tracks/crimson-mines |
| tracks/crimson-mines:.hazards | ["Mines on some routes"] | https://galacticracer.gameslantern.com/tracks/crimson-mines |
| tracks/crimson-mines:.availableModes | ["arcade"] | https://galacticracer.gameslantern.com/tracks/crimson-mines |
| tracks/crystal-caverns:.name | "Crystal Caverns" | https://galacticracer.gameslantern.com/tracks/crystal-caverns |
| tracks/crystal-caverns:.summary | "Crystal Caverns is a race course on Crait." | https://galacticracer.gameslantern.com/tracks/crystal-caverns |
| tracks/crystal-caverns:.planet | "Crait" | https://galacticracer.gameslantern.com/tracks/crystal-caverns |
| tracks/crystal-caverns:.hazards | ["Mines on some routes"] | https://galacticracer.gameslantern.com/tracks/crystal-caverns |
| tracks/crystal-caverns:.availableModes | ["arcade"] | https://galacticracer.gameslantern.com/tracks/crystal-caverns |
| tracks/dai-bendu-ascension:.name | "Dai Bendu Ascension" | https://galacticracer.gameslantern.com/tracks/dai-bendu-ascension |
| tracks/dai-bendu-ascension:.summary | "Dai Bendu Ascension is a race course on Ando Prime." | https://galacticracer.gameslantern.com/tracks/dai-bendu-ascension |
| tracks/dai-bendu-ascension:.planet | "Ando Prime" | https://galacticracer.gameslantern.com/tracks/dai-bendu-ascension |
| tracks/dai-bendu-ascension:.availableModes | ["arcade"] | https://galacticracer.gameslantern.com/tracks/dai-bendu-ascension |
| tracks/debris-dunes:.name | "Debris Dunes" | https://galacticracer.gameslantern.com/tracks/debris-dunes |
| tracks/debris-dunes:.summary | "Debris Dunes is a race course on Jakku." | https://galacticracer.gameslantern.com/tracks/debris-dunes |
| tracks/debris-dunes:.planet | "Jakku" | https://galacticracer.gameslantern.com/tracks/debris-dunes |
| tracks/debris-dunes:.hazards | ["Mines on some routes"] | https://galacticracer.gameslantern.com/tracks/debris-dunes |
| tracks/dhunkri-river-circuit:.name | "Dhunkri River Circuit" | https://galacticracer.gameslantern.com/tracks/dhunkri-river-circuit |
| tracks/dhunkri-river-circuit:.summary | "Dhunkri River Circuit is a race course on Lantaana." | https://galacticracer.gameslantern.com/tracks/dhunkri-river-circuit |
| tracks/dhunkri-river-circuit:.planet | "Lantaana" | https://galacticracer.gameslantern.com/tracks/dhunkri-river-circuit |
| tracks/fallen-empire:.name | "Fallen Empire" | https://galacticracer.gameslantern.com/tracks/fallen-empire |
| tracks/fallen-empire:.summary | "Fallen Empire is a race course on Jakku." | https://galacticracer.gameslantern.com/tracks/fallen-empire |
| tracks/fallen-empire:.planet | "Jakku" | https://galacticracer.gameslantern.com/tracks/fallen-empire |
| tracks/fallen-empire:.availableModes | ["arcade"] | https://galacticracer.gameslantern.com/tracks/fallen-empire |
| tracks/forgil-canyon:.name | "Forgil Canyon" | https://galacticracer.gameslantern.com/tracks/forgil-canyon |
| tracks/forgil-canyon:.summary | "Forgil Canyon is a race course on Crait." | https://galacticracer.gameslantern.com/tracks/forgil-canyon |
| tracks/forgil-canyon:.planet | "Crait" | https://galacticracer.gameslantern.com/tracks/forgil-canyon |
| tracks/forgil-canyon:.hazards | ["Mines on some routes"] | https://galacticracer.gameslantern.com/tracks/forgil-canyon |
| tracks/forgil-canyon:.availableModes | ["arcade"] | https://galacticracer.gameslantern.com/tracks/forgil-canyon |
| tracks/geothermal-tour:.name | "Geothermal Tour" | https://galacticracer.gameslantern.com/tracks/geothermal-tour |
| tracks/geothermal-tour:.summary | "Geothermal Tour is a race course on Lantaana." | https://galacticracer.gameslantern.com/tracks/geothermal-tour |
| tracks/geothermal-tour:.planet | "Lantaana" | https://galacticracer.gameslantern.com/tracks/geothermal-tour |
| tracks/geothermal-tour:.hazards | ["Mines on some routes"] | https://galacticracer.gameslantern.com/tracks/geothermal-tour |
| tracks/geothermal-tour:.availableModes | ["arcade"] | https://galacticracer.gameslantern.com/tracks/geothermal-tour |
| tracks/griffins-flight:.name | "Griffin's Flight" | https://galacticracer.gameslantern.com/tracks/griffins-flight |
| tracks/griffins-flight:.summary | "Griffin's Flight is a race course on Lantaana." | https://galacticracer.gameslantern.com/tracks/griffins-flight |
| tracks/griffins-flight:.planet | "Lantaana" | https://galacticracer.gameslantern.com/tracks/griffins-flight |
| tracks/griffins-flight:.hazards | ["Mines on some routes"] | https://galacticracer.gameslantern.com/tracks/griffins-flight |
| tracks/griffins-flight:.availableModes | ["arcade"] | https://galacticracer.gameslantern.com/tracks/griffins-flight |
| tracks/holdfasts-folly:.name | "Holdfast's Folly" | https://galacticracer.gameslantern.com/tracks/holdfasts-folly |
| tracks/holdfasts-folly:.summary | "Holdfast's Folly is a race course on Lantaana." | https://galacticracer.gameslantern.com/tracks/holdfasts-folly |
| tracks/holdfasts-folly:.planet | "Lantaana" | https://galacticracer.gameslantern.com/tracks/holdfasts-folly |
| tracks/holdfasts-folly:.availableModes | ["arcade"] | https://galacticracer.gameslantern.com/tracks/holdfasts-folly |
| tracks/hunk-of-junk:.name | "Hunk of Junk" | https://galacticracer.gameslantern.com/tracks/hunk-of-junk |
| tracks/hunk-of-junk:.summary | "Hunk of Junk is a race course on Tatooine." | https://galacticracer.gameslantern.com/tracks/hunk-of-junk |
| tracks/hunk-of-junk:.planet | "Tatooine" | https://galacticracer.gameslantern.com/tracks/hunk-of-junk |
| tracks/ice-field-circuit:.name | "Ice Field Circuit" | https://galacticracer.gameslantern.com/tracks/ice-field-circuit |
| tracks/ice-field-circuit:.summary | "Ice Field Circuit is a race course on Ando Prime." | https://galacticracer.gameslantern.com/tracks/ice-field-circuit |
| tracks/ice-field-circuit:.planet | "Ando Prime" | https://galacticracer.gameslantern.com/tracks/ice-field-circuit |
| tracks/ice-field-circuit:.hazards | ["Mines on some routes"] | https://galacticracer.gameslantern.com/tracks/ice-field-circuit |
| tracks/ice-field-circuit:.availableModes | ["arcade"] | https://galacticracer.gameslantern.com/tracks/ice-field-circuit |
| tracks/mawhonic-speedway:.name | "Mawhonic Speedway" | https://galacticracer.gameslantern.com/tracks/mawhonic-speedway |
| tracks/mawhonic-speedway:.summary | "Mawhonic Speedway is a race course on Ando Prime." | https://galacticracer.gameslantern.com/tracks/mawhonic-speedway |
| tracks/mawhonic-speedway:.planet | "Ando Prime" | https://galacticracer.gameslantern.com/tracks/mawhonic-speedway |
| tracks/mawhonic-speedway:.availableModes | ["arcade"] | https://galacticracer.gameslantern.com/tracks/mawhonic-speedway |
| tracks/mineral-loop:.name | "Mineral Loop" | https://galacticracer.gameslantern.com/tracks/mineral-loop |
| tracks/mineral-loop:.summary | "Mineral Loop is a race course on Sentinel I." | https://galacticracer.gameslantern.com/tracks/mineral-loop |
| tracks/mineral-loop:.planet | "Sentinel I" | https://galacticracer.gameslantern.com/tracks/mineral-loop |
| tracks/mineral-loop:.availableModes | ["arcade"] | https://galacticracer.gameslantern.com/tracks/mineral-loop |
| tracks/monastery-mountains:.name | "Monastery Mountains" | https://galacticracer.gameslantern.com/tracks/monastery-mountains |
| tracks/monastery-mountains:.summary | "Monastery Mountains is a race course on Ando Prime." | https://galacticracer.gameslantern.com/tracks/monastery-mountains |
| tracks/monastery-mountains:.planet | "Ando Prime" | https://galacticracer.gameslantern.com/tracks/monastery-mountains |
| tracks/monastery-mountains:.hazards | ["Mines on some routes"] | https://galacticracer.gameslantern.com/tracks/monastery-mountains |
| tracks/monastery-mountains:.availableModes | ["arcade"] | https://galacticracer.gameslantern.com/tracks/monastery-mountains |
| tracks/moro-kehn-tunnels:.name | "Moro Kehn Tunnels" | https://galacticracer.gameslantern.com/tracks/moro-kehn-tunnels |
| tracks/moro-kehn-tunnels:.summary | "Moro Kehn Tunnels is a race course on Lantaana." | https://galacticracer.gameslantern.com/tracks/moro-kehn-tunnels |
| tracks/moro-kehn-tunnels:.planet | "Lantaana" | https://galacticracer.gameslantern.com/tracks/moro-kehn-tunnels |
| tracks/moro-kehn-tunnels:.hazards | ["Mines on some routes"] | https://galacticracer.gameslantern.com/tracks/moro-kehn-tunnels |
| tracks/moro-kehn-tunnels:.availableModes | ["arcade"] | https://galacticracer.gameslantern.com/tracks/moro-kehn-tunnels |
| tracks/mos-espa-speedway:.name | "Mos Espa Speedway" | https://galacticracer.gameslantern.com/tracks/mos-espa-speedway |
| tracks/mos-espa-speedway:.summary | "Mos Espa Speedway is a race course on Tatooine." | https://galacticracer.gameslantern.com/tracks/mos-espa-speedway |
| tracks/mos-espa-speedway:.planet | "Tatooine" | https://galacticracer.gameslantern.com/tracks/mos-espa-speedway |
| tracks/mos-espa-speedway:.availableModes | ["arcade"] | https://galacticracer.gameslantern.com/tracks/mos-espa-speedway |
| tracks/mountain-to-sea:.name | "Mountain to Sea" | https://galacticracer.gameslantern.com/tracks/mountain-to-sea |
| tracks/mountain-to-sea:.summary | "Mountain to Sea is a race course on Ando Prime." | https://galacticracer.gameslantern.com/tracks/mountain-to-sea |
| tracks/mountain-to-sea:.planet | "Ando Prime" | https://galacticracer.gameslantern.com/tracks/mountain-to-sea |
| tracks/mountain-to-sea:.hazards | ["Mines on some routes"] | https://galacticracer.gameslantern.com/tracks/mountain-to-sea |
| tracks/overflow-rally:.name | "Overflow Rally" | https://galacticracer.gameslantern.com/tracks/overflow-rally |
| tracks/overflow-rally:.summary | "Overflow Rally is a race course on Lantaana." | https://galacticracer.gameslantern.com/tracks/overflow-rally |
| tracks/overflow-rally:.planet | "Lantaana" | https://galacticracer.gameslantern.com/tracks/overflow-rally |
| tracks/overflow-rally:.availableModes | ["arcade"] | https://galacticracer.gameslantern.com/tracks/overflow-rally |
| tracks/prologue-ando-prime:.name | "Prologue" | https://galacticracer.gameslantern.com/tracks/prologue-ando-prime |
| tracks/prologue-ando-prime:.summary | "Prologue is a race course on Ando Prime." | https://galacticracer.gameslantern.com/tracks/prologue-ando-prime |
| tracks/prologue-ando-prime:.planet | "Ando Prime" | https://galacticracer.gameslantern.com/tracks/prologue-ando-prime |
| tracks/prologue-crait:.name | "Prologue" | https://galacticracer.gameslantern.com/tracks/prologue-crait |
| tracks/prologue-crait:.summary | "Prologue is a race course on Crait." | https://galacticracer.gameslantern.com/tracks/prologue-crait |
| tracks/prologue-crait:.planet | "Crait" | https://galacticracer.gameslantern.com/tracks/prologue-crait |
| tracks/prologue-jakku:.name | "Prologue" | https://galacticracer.gameslantern.com/tracks/prologue-jakku |
| tracks/prologue-jakku:.summary | "Prologue is a race course on Jakku." | https://galacticracer.gameslantern.com/tracks/prologue-jakku |
| tracks/prologue-jakku:.planet | "Jakku" | https://galacticracer.gameslantern.com/tracks/prologue-jakku |
| tracks/prologue-sentinel-i:.name | "Prologue" | https://galacticracer.gameslantern.com/tracks/prologue-sentinel-i |
| tracks/prologue-sentinel-i:.summary | "Prologue is a race course on Sentinel I." | https://galacticracer.gameslantern.com/tracks/prologue-sentinel-i |
| tracks/prologue-sentinel-i:.planet | "Sentinel I" | https://galacticracer.gameslantern.com/tracks/prologue-sentinel-i |
| tracks/quadinaros-revenge:.name | "Quadinaros' Revenge" | https://galacticracer.gameslantern.com/tracks/quadinaros-revenge |
| tracks/quadinaros-revenge:.summary | "Quadinaros' Revenge is a race course on Crait." | https://galacticracer.gameslantern.com/tracks/quadinaros-revenge |
| tracks/quadinaros-revenge:.planet | "Crait" | https://galacticracer.gameslantern.com/tracks/quadinaros-revenge |
| tracks/quadinaros-revenge:.availableModes | ["arcade"] | https://galacticracer.gameslantern.com/tracks/quadinaros-revenge |
| tracks/rhodochrosite-run:.name | "Rhodochrosite Run" | https://galacticracer.gameslantern.com/tracks/rhodochrosite-run |
| tracks/rhodochrosite-run:.summary | "Rhodochrosite Run is a race course on Crait." | https://galacticracer.gameslantern.com/tracks/rhodochrosite-run |
| tracks/rhodochrosite-run:.planet | "Crait" | https://galacticracer.gameslantern.com/tracks/rhodochrosite-run |
| tracks/rhodochrosite-run:.hazards | ["Mines on some routes"] | https://galacticracer.gameslantern.com/tracks/rhodochrosite-run |
| tracks/rhodochrosite-run:.availableModes | ["arcade"] | https://galacticracer.gameslantern.com/tracks/rhodochrosite-run |
| tracks/salt-circle:.name | "Salt Circle" | https://galacticracer.gameslantern.com/tracks/salt-circle |
| tracks/salt-circle:.summary | "Salt Circle is a race course on Crait." | https://galacticracer.gameslantern.com/tracks/salt-circle |
| tracks/salt-circle:.planet | "Crait" | https://galacticracer.gameslantern.com/tracks/salt-circle |
| tracks/salt-circle:.hazards | ["Mines on some routes"] | https://galacticracer.gameslantern.com/tracks/salt-circle |
| tracks/salt-circle:.availableModes | ["arcade"] | https://galacticracer.gameslantern.com/tracks/salt-circle |
| tracks/scrap-spiral:.name | "Scrap Spiral" | https://galacticracer.gameslantern.com/tracks/scrap-spiral |
| tracks/scrap-spiral:.summary | "Scrap Spiral is a race course on Jakku." | https://galacticracer.gameslantern.com/tracks/scrap-spiral |
| tracks/scrap-spiral:.planet | "Jakku" | https://galacticracer.gameslantern.com/tracks/scrap-spiral |
| tracks/scrap-spiral:.hazards | ["Mines on some routes"] | https://galacticracer.gameslantern.com/tracks/scrap-spiral |
| tracks/scrap-spiral:.availableModes | ["arcade"] | https://galacticracer.gameslantern.com/tracks/scrap-spiral |
| tracks/sebulbas-challenge:.name | "Sebulba's Challenge" | https://galacticracer.gameslantern.com/tracks/sebulbas-challenge |
| tracks/sebulbas-challenge:.summary | "Sebulba's Challenge is a race course on Jakku." | https://galacticracer.gameslantern.com/tracks/sebulbas-challenge |
| tracks/sebulbas-challenge:.planet | "Jakku" | https://galacticracer.gameslantern.com/tracks/sebulbas-challenge |
| tracks/sebulbas-challenge:.availableModes | ["arcade"] | https://galacticracer.gameslantern.com/tracks/sebulbas-challenge |
| tracks/sentinel-lakes:.name | "Sentinel Lakes" | https://galacticracer.gameslantern.com/tracks/sentinel-lakes |
| tracks/sentinel-lakes:.summary | "Sentinel Lakes is a race course on Sentinel I." | https://galacticracer.gameslantern.com/tracks/sentinel-lakes |
| tracks/sentinel-lakes:.planet | "Sentinel I" | https://galacticracer.gameslantern.com/tracks/sentinel-lakes |
| tracks/sentinel-lakes:.hazards | ["Mines on some routes"] | https://galacticracer.gameslantern.com/tracks/sentinel-lakes |
| tracks/sentinel-lakes:.availableModes | ["arcade"] | https://galacticracer.gameslantern.com/tracks/sentinel-lakes |
| tracks/skakoan-gambit:.name | "Skakoan Gambit" | https://galacticracer.gameslantern.com/tracks/skakoan-gambit |
| tracks/skakoan-gambit:.summary | "Skakoan Gambit is a race course on Sentinel I." | https://galacticracer.gameslantern.com/tracks/skakoan-gambit |
| tracks/skakoan-gambit:.planet | "Sentinel I" | https://galacticracer.gameslantern.com/tracks/skakoan-gambit |
| tracks/stadium-showdown:.name | "Stadium Showdown" | https://galacticracer.gameslantern.com/tracks/stadium-showdown |
| tracks/stadium-showdown:.summary | "Stadium Showdown is a race course on Derven Acos." | https://galacticracer.gameslantern.com/tracks/stadium-showdown |
| tracks/stadium-showdown:.planet | "Derven Acos" | https://galacticracer.gameslantern.com/tracks/stadium-showdown |
| tracks/star-destroyer-speedway:.name | "Star Destroyer Speedway" | https://galacticracer.gameslantern.com/tracks/star-destroyer-speedway |
| tracks/star-destroyer-speedway:.summary | "Star Destroyer Speedway is a race course on Jakku." | https://galacticracer.gameslantern.com/tracks/star-destroyer-speedway |
| tracks/star-destroyer-speedway:.planet | "Jakku" | https://galacticracer.gameslantern.com/tracks/star-destroyer-speedway |
| tracks/star-destroyer-speedway:.hazards | ["Mines on some routes"] | https://galacticracer.gameslantern.com/tracks/star-destroyer-speedway |
| tracks/the-acid-ring:.name | "The Acid Ring" | https://galacticracer.gameslantern.com/tracks/the-acid-ring |
| tracks/the-acid-ring:.summary | "The Acid Ring is a race course on Sentinel I." | https://galacticracer.gameslantern.com/tracks/the-acid-ring |
| tracks/the-acid-ring:.planet | "Sentinel I" | https://galacticracer.gameslantern.com/tracks/the-acid-ring |
| tracks/the-acid-ring:.hazards | ["Mines on some routes"] | https://galacticracer.gameslantern.com/tracks/the-acid-ring |
| tracks/the-acid-ring:.availableModes | ["arcade"] | https://galacticracer.gameslantern.com/tracks/the-acid-ring |
| tracks/the-galactic-gauntlet:.name | "The Galactic Gauntlet" | https://galacticracer.gameslantern.com/tracks/the-galactic-gauntlet |
| tracks/the-galactic-gauntlet:.summary | "The Galactic Gauntlet is a race course on Derven Acos." | https://galacticracer.gameslantern.com/tracks/the-galactic-gauntlet |
| tracks/the-galactic-gauntlet:.planet | "Derven Acos" | https://galacticracer.gameslantern.com/tracks/the-galactic-gauntlet |
| tracks/the-galactic-gauntlet:.availableModes | ["arcade"] | https://galacticracer.gameslantern.com/tracks/the-galactic-gauntlet |
| tracks/the-galactic-league-championship:.name | "The Galactic League Championship" | https://galacticracer.gameslantern.com/tracks/the-galactic-league-championship |
| tracks/the-galactic-league-championship:.summary | "The Galactic League Championship is a race course on Derven Acos." | https://galacticracer.gameslantern.com/tracks/the-galactic-league-championship |
| tracks/the-galactic-league-championship:.planet | "Derven Acos" | https://galacticracer.gameslantern.com/tracks/the-galactic-league-championship |
| tracks/the-galactic-league-championship:.availableModes | ["arcade"] | https://galacticracer.gameslantern.com/tracks/the-galactic-league-championship |
| tracks/the-giants-graveyard:.name | "The Giants' Graveyard" | https://galacticracer.gameslantern.com/tracks/the-giants-graveyard |
| tracks/the-giants-graveyard:.summary | "The Giants' Graveyard is a race course on Jakku." | https://galacticracer.gameslantern.com/tracks/the-giants-graveyard |
| tracks/the-giants-graveyard:.planet | "Jakku" | https://galacticracer.gameslantern.com/tracks/the-giants-graveyard |
| tracks/the-giants-graveyard:.hazards | ["Mines on some routes"] | https://galacticracer.gameslantern.com/tracks/the-giants-graveyard |
| tracks/the-giants-graveyard:.availableModes | ["arcade"] | https://galacticracer.gameslantern.com/tracks/the-giants-graveyard |
| tracks/the-pyroducts:.name | "The Pyroducts" | https://galacticracer.gameslantern.com/tracks/the-pyroducts |
| tracks/the-pyroducts:.summary | "The Pyroducts is a race course on Lantaana." | https://galacticracer.gameslantern.com/tracks/the-pyroducts |
| tracks/the-pyroducts:.planet | "Lantaana" | https://galacticracer.gameslantern.com/tracks/the-pyroducts |
| tracks/the-pyroducts:.availableModes | ["arcade"] | https://galacticracer.gameslantern.com/tracks/the-pyroducts |
| tracks/the-qualifier:.name | "The Qualifier" | https://galacticracer.gameslantern.com/tracks/the-qualifier |
| tracks/the-qualifier:.summary | "The Qualifier is a race course on Derven Acos." | https://galacticracer.gameslantern.com/tracks/the-qualifier |
| tracks/the-qualifier:.planet | "Derven Acos" | https://galacticracer.gameslantern.com/tracks/the-qualifier |
| tracks/the-war-fields:.name | "The War Fields" | https://galacticracer.gameslantern.com/tracks/the-war-fields |
| tracks/the-war-fields:.summary | "The War Fields is a race course on Jakku." | https://galacticracer.gameslantern.com/tracks/the-war-fields |
| tracks/the-war-fields:.planet | "Jakku" | https://galacticracer.gameslantern.com/tracks/the-war-fields |
| tracks/the-war-fields:.hazards | ["Mines on some routes"] | https://galacticracer.gameslantern.com/tracks/the-war-fields |
| tracks/the-war-fields:.availableModes | ["arcade"] | https://galacticracer.gameslantern.com/tracks/the-war-fields |
| tracks/vonium-pipeline:.name | "Vonium Pipeline" | https://galacticracer.gameslantern.com/tracks/vonium-pipeline |
| tracks/vonium-pipeline:.summary | "Vonium Pipeline is a race course on Ando Prime." | https://galacticracer.gameslantern.com/tracks/vonium-pipeline |
| tracks/vonium-pipeline:.planet | "Ando Prime" | https://galacticracer.gameslantern.com/tracks/vonium-pipeline |
| tracks/vonium-pipeline:.hazards | ["Mines on some routes"] | https://galacticracer.gameslantern.com/tracks/vonium-pipeline |
| tracks/vonium-pipeline:.availableModes | ["arcade"] | https://galacticracer.gameslantern.com/tracks/vonium-pipeline |
| vehicle-classes/landspeeder:.name | "Landspeeder" | https://galacticracer.gameslantern.com/vehicle-classes/landspeeder |
| vehicle-classes/landspeeder:.summary | "Stable racing craft designed for drifting through turns." | https://galacticracer.gameslantern.com/vehicle-classes/landspeeder |
| vehicle-classes/podracer:.name | "Podracer" | https://galacticracer.gameslantern.com/vehicle-classes/podracer |
| vehicle-classes/podracer:.summary | "Racing craft that uses an air brake for tighter turns." | https://galacticracer.gameslantern.com/vehicle-classes/podracer |
| vehicles/am-1:.name | "AM-1" | https://galacticracer.gameslantern.com/vehicles/am-1 |
| vehicles/am-1:.summary | "AM-1 is a speeder bike kit from Kuat Special Vehicles." | https://galacticracer.gameslantern.com/vehicles/am-1 |
| vehicles/am-1:.vehicleClass | "speeder-bike" | https://galacticracer.gameslantern.com/vehicles/am-1 |
| vehicles/am-1:.manufacturer | "Kuat Special Vehicles" | https://galacticracer.gameslantern.com/vehicles/am-1 |
| vehicles/arz-41:.name | "ARZ 41" | https://galacticracer.gameslantern.com/vehicles/arz-41 |
| vehicles/arz-41:.summary | "ARZ 41 is a landspeeder kit from Jadrax Race Rigs." | https://galacticracer.gameslantern.com/vehicles/arz-41 |
| vehicles/arz-41:.vehicleClass | "landspeeder" | https://galacticracer.gameslantern.com/vehicles/arz-41 |
| vehicles/arz-41:.manufacturer | "Jadrax Race Rigs" | https://galacticracer.gameslantern.com/vehicles/arz-41 |
| vehicles/ben-quadinaross-podracer:.name | "Ben Quadinaros's Podracer" | https://galacticracer.gameslantern.com/vehicles/ben-quadinaross-podracer |
| vehicles/ben-quadinaross-podracer:.summary | "Ben Quadinaros's Podracer is a podracer kit." | https://galacticracer.gameslantern.com/vehicles/ben-quadinaross-podracer |
| vehicles/ben-quadinaross-podracer:.vehicleClass | "podracer" | https://galacticracer.gameslantern.com/vehicles/ben-quadinaross-podracer |
| vehicles/ben-quadinaross-podracer-aged:.name | "Ben Quadinaros's Podracer (Aged)" | https://galacticracer.gameslantern.com/vehicles/ben-quadinaross-podracer-aged |
| vehicles/ben-quadinaross-podracer-aged:.summary | "Ben Quadinaros's Podracer (Aged) is a podracer kit." | https://galacticracer.gameslantern.com/vehicles/ben-quadinaross-podracer-aged |
| vehicles/ben-quadinaross-podracer-aged:.vehicleClass | "podracer" | https://galacticracer.gameslantern.com/vehicles/ben-quadinaross-podracer-aged |
| vehicles/cesca:.name | "Cesca" | https://galacticracer.gameslantern.com/vehicles/cesca |
| vehicles/cesca:.summary | "Cesca is a skim speeder kit from Keren Resto." | https://galacticracer.gameslantern.com/vehicles/cesca |
| vehicles/cesca:.vehicleClass | "skim-speeder" | https://galacticracer.gameslantern.com/vehicles/cesca |
| vehicles/cesca:.manufacturer | "Keren Resto" | https://galacticracer.gameslantern.com/vehicles/cesca |
| vehicles/ciza-t:.name | "Ciza T" | https://galacticracer.gameslantern.com/vehicles/ciza-t |
| vehicles/ciza-t:.summary | "Ciza T is a speeder bike kit from Kor Sarun." | https://galacticracer.gameslantern.com/vehicles/ciza-t |
| vehicles/ciza-t:.vehicleClass | "speeder-bike" | https://galacticracer.gameslantern.com/vehicles/ciza-t |
| vehicles/ciza-t:.manufacturer | "Kor Sarun" | https://galacticracer.gameslantern.com/vehicles/ciza-t |
| vehicles/darc-x:.name | "Darc X" | https://galacticracer.gameslantern.com/vehicles/darc-x |
| vehicles/darc-x:.summary | "Darc X is a landspeeder kit from Kor Sarun." | https://galacticracer.gameslantern.com/vehicles/darc-x |
| vehicles/darc-x:.vehicleClass | "landspeeder" | https://galacticracer.gameslantern.com/vehicles/darc-x |
| vehicles/darc-x:.manufacturer | "Kor Sarun" | https://galacticracer.gameslantern.com/vehicles/darc-x |
| vehicles/drd-61:.name | "DRD 61" | https://galacticracer.gameslantern.com/vehicles/drd-61 |
| vehicles/drd-61:.summary | "DRD 61 is a speeder bike kit from Jadrax Race Rigs." | https://galacticracer.gameslantern.com/vehicles/drd-61 |
| vehicles/drd-61:.vehicleClass | "speeder-bike" | https://galacticracer.gameslantern.com/vehicles/drd-61 |
| vehicles/drd-61:.manufacturer | "Jadrax Race Rigs" | https://galacticracer.gameslantern.com/vehicles/drd-61 |
| vehicles/dreshi:.name | "Dre'shi" | https://galacticracer.gameslantern.com/vehicles/dreshi |
| vehicles/dreshi:.summary | "Dre'shi is a landspeeder kit from Gentes Race Customs." | https://galacticracer.gameslantern.com/vehicles/dreshi |
| vehicles/dreshi:.vehicleClass | "landspeeder" | https://galacticracer.gameslantern.com/vehicles/dreshi |
| vehicles/dreshi:.manufacturer | "Gentes Race Customs" | https://galacticracer.gameslantern.com/vehicles/dreshi |
| vehicles/dud-bolts-podracer:.name | "Dud Bolt's Podracer" | https://galacticracer.gameslantern.com/vehicles/dud-bolts-podracer |
| vehicles/dud-bolts-podracer:.summary | "Dud Bolt's Podracer is a podracer kit." | https://galacticracer.gameslantern.com/vehicles/dud-bolts-podracer |
| vehicles/dud-bolts-podracer:.vehicleClass | "podracer" | https://galacticracer.gameslantern.com/vehicles/dud-bolts-podracer |
| vehicles/dud-bolts-podracer-aged:.name | "Dud Bolt's Podracer (Aged)" | https://galacticracer.gameslantern.com/vehicles/dud-bolts-podracer-aged |
| vehicles/dud-bolts-podracer-aged:.summary | "Dud Bolt's Podracer (Aged) is a podracer kit." | https://galacticracer.gameslantern.com/vehicles/dud-bolts-podracer-aged |
| vehicles/dud-bolts-podracer-aged:.vehicleClass | "podracer" | https://galacticracer.gameslantern.com/vehicles/dud-bolts-podracer-aged |
| vehicles/gasganos-podracer:.name | "Gasgano's Podracer" | https://galacticracer.gameslantern.com/vehicles/gasganos-podracer |
| vehicles/gasganos-podracer:.summary | "Gasgano's Podracer is a podracer kit." | https://galacticracer.gameslantern.com/vehicles/gasganos-podracer |
| vehicles/gasganos-podracer:.vehicleClass | "podracer" | https://galacticracer.gameslantern.com/vehicles/gasganos-podracer |
| vehicles/gasganos-podracer-aged:.name | "Gasgano's Podracer (Aged)" | https://galacticracer.gameslantern.com/vehicles/gasganos-podracer-aged |
| vehicles/gasganos-podracer-aged:.summary | "Gasgano's Podracer (Aged) is a podracer kit." | https://galacticracer.gameslantern.com/vehicles/gasganos-podracer-aged |
| vehicles/gasganos-podracer-aged:.vehicleClass | "podracer" | https://galacticracer.gameslantern.com/vehicles/gasganos-podracer-aged |
| vehicles/hc-8:.name | "HC-8" | https://galacticracer.gameslantern.com/vehicles/hc-8 |
| vehicles/hc-8:.summary | "HC-8 is a skim speeder kit from Kuat Special Vehicles." | https://galacticracer.gameslantern.com/vehicles/hc-8 |
| vehicles/hc-8:.vehicleClass | "skim-speeder" | https://galacticracer.gameslantern.com/vehicles/hc-8 |
| vehicles/hc-8:.manufacturer | "Kuat Special Vehicles" | https://galacticracer.gameslantern.com/vehicles/hc-8 |
| vehicles/jakobeast:.name | "Jakobeast" | https://galacticracer.gameslantern.com/vehicles/jakobeast |
| vehicles/jakobeast:.summary | "Jakobeast is a landspeeder kit from Sriluur Customs." | https://galacticracer.gameslantern.com/vehicles/jakobeast |
| vehicles/jakobeast:.vehicleClass | "landspeeder" | https://galacticracer.gameslantern.com/vehicles/jakobeast |
| vehicles/jakobeast:.manufacturer | "Sriluur Customs" | https://galacticracer.gameslantern.com/vehicles/jakobeast |
| vehicles/kestar-bools-podracer:.name | "Kestar Bool's Podracer" | https://galacticracer.gameslantern.com/vehicles/kestar-bools-podracer |
| vehicles/kestar-bools-podracer:.summary | "Kestar Bool's Podracer is a podracer kit." | https://galacticracer.gameslantern.com/vehicles/kestar-bools-podracer |
| vehicles/kestar-bools-podracer:.vehicleClass | "podracer" | https://galacticracer.gameslantern.com/vehicles/kestar-bools-podracer |
| vehicles/killion:.name | "Killion" | https://galacticracer.gameslantern.com/vehicles/killion |
| vehicles/killion:.summary | "Killion is a speeder bike kit from Keren Resto." | https://galacticracer.gameslantern.com/vehicles/killion |
| vehicles/killion:.vehicleClass | "speeder-bike" | https://galacticracer.gameslantern.com/vehicles/killion |
| vehicles/killion:.manufacturer | "Keren Resto" | https://galacticracer.gameslantern.com/vehicles/killion |
| vehicles/kjc-99:.name | "KJC 99" | https://galacticracer.gameslantern.com/vehicles/kjc-99 |
| vehicles/kjc-99:.summary | "KJC 99 is a landspeeder kit from Jadrax Race Rigs." | https://galacticracer.gameslantern.com/vehicles/kjc-99 |
| vehicles/kjc-99:.vehicleClass | "landspeeder" | https://galacticracer.gameslantern.com/vehicles/kjc-99 |
| vehicles/kjc-99:.manufacturer | "Jadrax Race Rigs" | https://galacticracer.gameslantern.com/vehicles/kjc-99 |
| vehicles/ko-5:.name | "KO-5" | https://galacticracer.gameslantern.com/vehicles/ko-5 |
| vehicles/ko-5:.summary | "KO-5 is a speeder bike kit from Kuat Special Vehicles." | https://galacticracer.gameslantern.com/vehicles/ko-5 |
| vehicles/ko-5:.vehicleClass | "speeder-bike" | https://galacticracer.gameslantern.com/vehicles/ko-5 |
| vehicles/ko-5:.manufacturer | "Kuat Special Vehicles" | https://galacticracer.gameslantern.com/vehicles/ko-5 |
| vehicles/kreed:.name | "Kreed" | https://galacticracer.gameslantern.com/vehicles/kreed |
| vehicles/kreed:.summary | "Kreed is a speeder bike kit from Keren Resto." | https://galacticracer.gameslantern.com/vehicles/kreed |
| vehicles/kreed:.vehicleClass | "speeder-bike" | https://galacticracer.gameslantern.com/vehicles/kreed |
| vehicles/kreed:.manufacturer | "Keren Resto" | https://galacticracer.gameslantern.com/vehicles/kreed |
| vehicles/magus:.name | "Magus" | https://galacticracer.gameslantern.com/vehicles/magus |
| vehicles/magus:.summary | "Magus is a landspeeder kit from Keren Resto." | https://galacticracer.gameslantern.com/vehicles/magus |
| vehicles/magus:.vehicleClass | "landspeeder" | https://galacticracer.gameslantern.com/vehicles/magus |
| vehicles/magus:.manufacturer | "Keren Resto" | https://galacticracer.gameslantern.com/vehicles/magus |
| vehicles/moksi:.name | "Mok'si" | https://galacticracer.gameslantern.com/vehicles/moksi |
| vehicles/moksi:.summary | "Mok'si is a skim speeder kit from Gentes Race Customs." | https://galacticracer.gameslantern.com/vehicles/moksi |
| vehicles/moksi:.vehicleClass | "skim-speeder" | https://galacticracer.gameslantern.com/vehicles/moksi |
| vehicles/moksi:.manufacturer | "Gentes Race Customs" | https://galacticracer.gameslantern.com/vehicles/moksi |
| vehicles/msm-04:.name | "MSM 04" | https://galacticracer.gameslantern.com/vehicles/msm-04 |
| vehicles/msm-04:.summary | "MSM 04 is a skim speeder kit from Jadrax Race Rigs." | https://galacticracer.gameslantern.com/vehicles/msm-04 |
| vehicles/msm-04:.vehicleClass | "skim-speeder" | https://galacticracer.gameslantern.com/vehicles/msm-04 |
| vehicles/msm-04:.manufacturer | "Jadrax Race Rigs" | https://galacticracer.gameslantern.com/vehicles/msm-04 |
| vehicles/napaco-d:.name | "Napaco D" | https://galacticracer.gameslantern.com/vehicles/napaco-d |
| vehicles/napaco-d:.summary | "Napaco D is a landspeeder kit from Kor Sarun." | https://galacticracer.gameslantern.com/vehicles/napaco-d |
| vehicles/napaco-d:.vehicleClass | "landspeeder" | https://galacticracer.gameslantern.com/vehicles/napaco-d |
| vehicles/napaco-d:.manufacturer | "Kor Sarun" | https://galacticracer.gameslantern.com/vehicles/napaco-d |
| vehicles/nl-4:.name | "NL-4" | https://galacticracer.gameslantern.com/vehicles/nl-4 |
| vehicles/nl-4:.summary | "NL-4 is a landspeeder kit from Kuat Special Vehicles." | https://galacticracer.gameslantern.com/vehicles/nl-4 |
| vehicles/nl-4:.vehicleClass | "landspeeder" | https://galacticracer.gameslantern.com/vehicles/nl-4 |
| vehicles/nl-4:.manufacturer | "Kuat Special Vehicles" | https://galacticracer.gameslantern.com/vehicles/nl-4 |
| vehicles/novyok:.name | "Novyok" | https://galacticracer.gameslantern.com/vehicles/novyok |
| vehicles/novyok:.summary | "Novyok is a speeder bike kit from Sriluur Customs." | https://galacticracer.gameslantern.com/vehicles/novyok |
| vehicles/novyok:.vehicleClass | "speeder-bike" | https://galacticracer.gameslantern.com/vehicles/novyok |
| vehicles/novyok:.manufacturer | "Sriluur Customs" | https://galacticracer.gameslantern.com/vehicles/novyok |
| vehicles/ody-mandrells-podracer:.name | "Ody Mandrell's Podracer" | https://galacticracer.gameslantern.com/vehicles/ody-mandrells-podracer |
| vehicles/ody-mandrells-podracer:.summary | "Ody Mandrell's Podracer is a podracer kit." | https://galacticracer.gameslantern.com/vehicles/ody-mandrells-podracer |
| vehicles/ody-mandrells-podracer:.vehicleClass | "podracer" | https://galacticracer.gameslantern.com/vehicles/ody-mandrells-podracer |
| vehicles/ody-mandrells-podracer-aged:.name | "Ody Mandrell's Podracer (Aged)" | https://galacticracer.gameslantern.com/vehicles/ody-mandrells-podracer-aged |
| vehicles/ody-mandrells-podracer-aged:.summary | "Ody Mandrell's Podracer (Aged) is a podracer kit." | https://galacticracer.gameslantern.com/vehicles/ody-mandrells-podracer-aged |
| vehicles/ody-mandrells-podracer-aged:.vehicleClass | "podracer" | https://galacticracer.gameslantern.com/vehicles/ody-mandrells-podracer-aged |
| vehicles/pelake:.name | "Pel'ake" | https://galacticracer.gameslantern.com/vehicles/pelake |
| vehicles/pelake:.summary | "Pel'ake is a speeder bike kit from Gentes Race Customs." | https://galacticracer.gameslantern.com/vehicles/pelake |
| vehicles/pelake:.vehicleClass | "speeder-bike" | https://galacticracer.gameslantern.com/vehicles/pelake |
| vehicles/pelake:.manufacturer | "Gentes Race Customs" | https://galacticracer.gameslantern.com/vehicles/pelake |
| vehicles/rak-s:.name | "Rak S" | https://galacticracer.gameslantern.com/vehicles/rak-s |
| vehicles/rak-s:.summary | "Rak S is a skim speeder kit from Kor Sarun." | https://galacticracer.gameslantern.com/vehicles/rak-s |
| vehicles/rak-s:.vehicleClass | "skim-speeder" | https://galacticracer.gameslantern.com/vehicles/rak-s |
| vehicles/rak-s:.manufacturer | "Kor Sarun" | https://galacticracer.gameslantern.com/vehicles/rak-s |
| vehicles/rar-27:.name | "RAR 27" | https://galacticracer.gameslantern.com/vehicles/rar-27 |
| vehicles/rar-27:.summary | "RAR 27 is a speeder bike kit from Jadrax Race Rigs." | https://galacticracer.gameslantern.com/vehicles/rar-27 |
| vehicles/rar-27:.vehicleClass | "speeder-bike" | https://galacticracer.gameslantern.com/vehicles/rar-27 |
| vehicles/rar-27:.manufacturer | "Jadrax Race Rigs" | https://galacticracer.gameslantern.com/vehicles/rar-27 |
| vehicles/rathtar:.name | "Rathtar" | https://galacticracer.gameslantern.com/vehicles/rathtar |
| vehicles/rathtar:.summary | "Rathtar is a skim speeder kit from Sriluur Customs." | https://galacticracer.gameslantern.com/vehicles/rathtar |
| vehicles/rathtar:.vehicleClass | "skim-speeder" | https://galacticracer.gameslantern.com/vehicles/rathtar |
| vehicles/rathtar:.manufacturer | "Sriluur Customs" | https://galacticracer.gameslantern.com/vehicles/rathtar |
| vehicles/reek:.name | "Reek" | https://galacticracer.gameslantern.com/vehicles/reek |
| vehicles/reek:.summary | "Reek is a skim speeder kit from Sriluur Customs." | https://galacticracer.gameslantern.com/vehicles/reek |
| vehicles/reek:.vehicleClass | "skim-speeder" | https://galacticracer.gameslantern.com/vehicles/reek |
| vehicles/reek:.manufacturer | "Sriluur Customs" | https://galacticracer.gameslantern.com/vehicles/reek |
| vehicles/revasi-g:.name | "Revasi G" | https://galacticracer.gameslantern.com/vehicles/revasi-g |
| vehicles/revasi-g:.summary | "Revasi G is a speeder bike kit from Kor Sarun." | https://galacticracer.gameslantern.com/vehicles/revasi-g |
| vehicles/revasi-g:.vehicleClass | "speeder-bike" | https://galacticracer.gameslantern.com/vehicles/revasi-g |
| vehicles/revasi-g:.manufacturer | "Kor Sarun" | https://galacticracer.gameslantern.com/vehicles/revasi-g |
| vehicles/ricon:.name | "Ri'con" | https://galacticracer.gameslantern.com/vehicles/ricon |
| vehicles/ricon:.summary | "Ri'con is a speeder bike kit from Gentes Race Customs." | https://galacticracer.gameslantern.com/vehicles/ricon |
| vehicles/ricon:.vehicleClass | "speeder-bike" | https://galacticracer.gameslantern.com/vehicles/ricon |
| vehicles/ricon:.manufacturer | "Gentes Race Customs" | https://galacticracer.gameslantern.com/vehicles/ricon |
| vehicles/sah-66:.name | "SAH 66" | https://galacticracer.gameslantern.com/vehicles/sah-66 |
| vehicles/sah-66:.summary | "SAH 66 is a skim speeder kit from Jadrax Race Rigs." | https://galacticracer.gameslantern.com/vehicles/sah-66 |
| vehicles/sah-66:.vehicleClass | "skim-speeder" | https://galacticracer.gameslantern.com/vehicles/sah-66 |
| vehicles/sah-66:.manufacturer | "Jadrax Race Rigs" | https://galacticracer.gameslantern.com/vehicles/sah-66 |
| vehicles/sebulbas-podracer:.name | "Sebulba's Podracer" | https://galacticracer.gameslantern.com/vehicles/sebulbas-podracer |
| vehicles/sebulbas-podracer:.summary | "Sebulba's Podracer is a podracer kit." | https://galacticracer.gameslantern.com/vehicles/sebulbas-podracer |
| vehicles/sebulbas-podracer:.vehicleClass | "podracer" | https://galacticracer.gameslantern.com/vehicles/sebulbas-podracer |
| vehicles/shades-podracer:.name | "Shade's Podracer" | https://galacticracer.gameslantern.com/vehicles/shades-podracer |
| vehicles/shades-podracer:.summary | "Shade's Podracer is a podracer kit from Jadrax Race Rigs." | https://galacticracer.gameslantern.com/vehicles/shades-podracer |
| vehicles/shades-podracer:.vehicleClass | "podracer" | https://galacticracer.gameslantern.com/vehicles/shades-podracer |
| vehicles/shades-podracer:.manufacturer | "Jadrax Race Rigs" | https://galacticracer.gameslantern.com/vehicles/shades-podracer |
| vehicles/shades-podracer-phase-2:.name | "Shade's Podracer (Phase 2)" | https://galacticracer.gameslantern.com/vehicles/shades-podracer-phase-2 |
| vehicles/shades-podracer-phase-2:.summary | "Shade's Podracer (Phase 2) is a podracer kit." | https://galacticracer.gameslantern.com/vehicles/shades-podracer-phase-2 |
| vehicles/shades-podracer-phase-2:.vehicleClass | "podracer" | https://galacticracer.gameslantern.com/vehicles/shades-podracer-phase-2 |
| vehicles/shades-podracer-phase-3:.name | "Shade's Podracer (Phase 3)" | https://galacticracer.gameslantern.com/vehicles/shades-podracer-phase-3 |
| vehicles/shades-podracer-phase-3:.summary | "Shade's Podracer (Phase 3) is a podracer kit." | https://galacticracer.gameslantern.com/vehicles/shades-podracer-phase-3 |
| vehicles/shades-podracer-phase-3:.vehicleClass | "podracer" | https://galacticracer.gameslantern.com/vehicles/shades-podracer-phase-3 |
| vehicles/sling:.name | "Sling" | https://galacticracer.gameslantern.com/vehicles/sling |
| vehicles/sling:.summary | "Sling is a skim speeder kit from Keren Resto." | https://galacticracer.gameslantern.com/vehicles/sling |
| vehicles/sling:.vehicleClass | "skim-speeder" | https://galacticracer.gameslantern.com/vehicles/sling |
| vehicles/sling:.manufacturer | "Keren Resto" | https://galacticracer.gameslantern.com/vehicles/sling |
| vehicles/starweb:.name | "Starweb" | https://galacticracer.gameslantern.com/vehicles/starweb |
| vehicles/starweb:.summary | "Starweb is a landspeeder kit from Keren Resto." | https://galacticracer.gameslantern.com/vehicles/starweb |
| vehicles/starweb:.vehicleClass | "landspeeder" | https://galacticracer.gameslantern.com/vehicles/starweb |
| vehicles/starweb:.manufacturer | "Keren Resto" | https://galacticracer.gameslantern.com/vehicles/starweb |
| vehicles/su-3:.name | "SU-3" | https://galacticracer.gameslantern.com/vehicles/su-3 |
| vehicles/su-3:.summary | "SU-3 is a skim speeder kit from Kuat Special Vehicles." | https://galacticracer.gameslantern.com/vehicles/su-3 |
| vehicles/su-3:.vehicleClass | "skim-speeder" | https://galacticracer.gameslantern.com/vehicles/su-3 |
| vehicles/su-3:.manufacturer | "Kuat Special Vehicles" | https://galacticracer.gameslantern.com/vehicles/su-3 |
| vehicles/tahan:.name | "Ta'han" | https://galacticracer.gameslantern.com/vehicles/tahan |
| vehicles/tahan:.summary | "Ta'han is a skim speeder kit from Gentes Race Customs." | https://galacticracer.gameslantern.com/vehicles/tahan |
| vehicles/tahan:.vehicleClass | "skim-speeder" | https://galacticracer.gameslantern.com/vehicles/tahan |
| vehicles/tahan:.manufacturer | "Gentes Race Customs" | https://galacticracer.gameslantern.com/vehicles/tahan |
| vehicles/teemto-pagaliess-podracer:.name | "Teemto Pagalies's Podracer" | https://galacticracer.gameslantern.com/vehicles/teemto-pagaliess-podracer |
| vehicles/teemto-pagaliess-podracer:.summary | "Teemto Pagalies's Podracer is a podracer kit." | https://galacticracer.gameslantern.com/vehicles/teemto-pagaliess-podracer |
| vehicles/teemto-pagaliess-podracer:.vehicleClass | "podracer" | https://galacticracer.gameslantern.com/vehicles/teemto-pagaliess-podracer |
| vehicles/vornskr:.name | "Vornskr" | https://galacticracer.gameslantern.com/vehicles/vornskr |
| vehicles/vornskr:.summary | "Vornskr is a landspeeder kit from Sriluur Customs." | https://galacticracer.gameslantern.com/vehicles/vornskr |
| vehicles/vornskr:.vehicleClass | "landspeeder" | https://galacticracer.gameslantern.com/vehicles/vornskr |
| vehicles/vornskr:.manufacturer | "Sriluur Customs" | https://galacticracer.gameslantern.com/vehicles/vornskr |
| vehicles/wi-9:.name | "WI-9" | https://galacticracer.gameslantern.com/vehicles/wi-9 |
| vehicles/wi-9:.summary | "WI-9 is a landspeeder kit from Kuat Special Vehicles." | https://galacticracer.gameslantern.com/vehicles/wi-9 |
| vehicles/wi-9:.vehicleClass | "landspeeder" | https://galacticracer.gameslantern.com/vehicles/wi-9 |
| vehicles/wi-9:.manufacturer | "Kuat Special Vehicles" | https://galacticracer.gameslantern.com/vehicles/wi-9 |
| vehicles/wist-l:.name | "Wist L" | https://galacticracer.gameslantern.com/vehicles/wist-l |
| vehicles/wist-l:.summary | "Wist L is a skim speeder kit from Kor Sarun." | https://galacticracer.gameslantern.com/vehicles/wist-l |
| vehicles/wist-l:.vehicleClass | "skim-speeder" | https://galacticracer.gameslantern.com/vehicles/wist-l |
| vehicles/wist-l:.manufacturer | "Kor Sarun" | https://galacticracer.gameslantern.com/vehicles/wist-l |
| vehicles/zaknee:.name | "Zak'nee" | https://galacticracer.gameslantern.com/vehicles/zaknee |
| vehicles/zaknee:.summary | "Zak'nee is a landspeeder kit from Gentes Race Customs." | https://galacticracer.gameslantern.com/vehicles/zaknee |
| vehicles/zaknee:.vehicleClass | "landspeeder" | https://galacticracer.gameslantern.com/vehicles/zaknee |
| vehicles/zaknee:.manufacturer | "Gentes Race Customs" | https://galacticracer.gameslantern.com/vehicles/zaknee |
| vehicles/zillo:.name | "Zillo" | https://galacticracer.gameslantern.com/vehicles/zillo |
| vehicles/zillo:.summary | "Zillo is a speeder bike kit from Sriluur Customs." | https://galacticracer.gameslantern.com/vehicles/zillo |
| vehicles/zillo:.vehicleClass | "speeder-bike" | https://galacticracer.gameslantern.com/vehicles/zillo |
| vehicles/zillo:.manufacturer | "Sriluur Customs" | https://galacticracer.gameslantern.com/vehicles/zillo |
| characters/darius-pax:.name | "Darius Pax" | https://swgalacticracer.wiki/characters/darius-pax/ |
| characters/darius-pax:.summary | "Darius Pax founded the Galactic League and recruits Shade." | https://swgalacticracer.wiki/characters/darius-pax/ |
| characters/darius-pax:.roles | ["founder"] | https://swgalacticracer.wiki/characters/darius-pax/ |
| characters/darius-pax:.species | "Besalisk" | https://swgalacticracer.wiki/characters/darius-pax/ |

## Verification and parent handoff

- `python3 scripts/import-world.py`: PASS, exit 0; 155 cached pages, zero fetch failures, 128 new source entries pending parent registry merge.
- `npx tsx --test tests/world-content.test.ts`: PASS, exit 0; six tests. Tests use a temporary merged registry and isolate unrelated parent-owned racer styles, build observations and parts. They do not claim the entire checkout validates.
- `npx eslint src/lib/content/schema.ts src/lib/content/catalog.ts src/lib/content/public.ts src/components/wiki-catalog.tsx tests/world-content.test.ts`: PASS, exit 0.
- Python AST parse: PASS. Cached importer rerun: PASS; every character/class/vehicle/track/planet JSON remained byte-identical.
- Comparison against HEAD: PASS; all 79 known claims and existing image fields in tracked character/class records remained identical.
- `npx tsc --noEmit`: FAIL, exit 2; only `wiki-catalog.tsx` lines 87 and 130 passing the expanded kind union to parent-owned `GameCardKind`. Parent must add vehicle/track/planet support to GameCard as planned. No cast or suppression was added.
- Initial all-family merged-registry test: FAIL, exit 1; six unrelated published racer-style entries have unknown summaries: bt310-quadra, custom-ord-pedrovia, exelbrok-xl-5115, ipg-x1131-longtail, plug-f-mammoth, vulptereen-327. No changes made to these parent-owned files.
- Ordinary catalog loading remains dependent on parent merging the source manifest. Schema generator and CLI asset-family enumeration remain parent-owned integration work. Browser/build verification is not claimed while these integration blockers remain.
