# Game-card artwork and provenance

`src/components/game-card.tsx` supplies shared `GameCard`, `GameIcon`, and effect-text formatting for wiki previews/details, world records, and builder picker/installed/selected cards. Teal panels, self-hosted Oxanium display type, Roman rank labels, and pale-yellow key-term highlighting recreate a visual language, not a screenshot or additional game evidence. Highlighting preserves existing effect wording; it does not invent stats, rank effects, or rarity.

## Actual game artwork versus illustrations

Exactly nine PNG pictograms under `public/game-icons/` are extracted from original owner uploads 16, 11, and 9. All other Lucide/fallback pictograms are illustrative UI symbols, **not game assets** or verified representations of those items. Not all game artwork is complete. Generic world/style illustrations are not imported portraits, vehicle renders, or map images.

Only isolated white pictograms are retained. No full screenshots, card frames, text, tooltip graphics, voice-chat overlays, or third-party web images are copied into these assets. Raw uploads, evidence crops, HTML caches, and browser-review artifacts stay in ignored owner-local storage. Public derived icons do not grant blanket permission to publish their source screenshots; preserve provenance and review reuse rights separately from factual verification.

Owner uploads 16 and 17 are byte-identical. Upload 16 is already imported; do not create duplicate artwork/evidence from 17. Screenshot numbering does not imply a round, mode, character, or upgrade sequence.

## Asset map and native crop coordinates

The executable metadata is in [`scripts/extract-game-icons.py`](../scripts/extract-game-icons.py): `SOURCES`, `ICONS`, and `EXPECTED_SIZES`. Content IDs map to `/game-icons/<id>.png`. Rectangles use native pixels with a top-left origin: `(left, top, right, bottom)`, with exclusive right/bottom edges.

| Asset/content ID | Owner upload | Native crop rectangle |
| --- | ---: | --- |
| `overtaking-surge` | 16 | `(954, 1050, 1092, 1213)` |
| `status-scrubber` | 16 | `(1764, 1048, 1880, 1199)` |
| `ion-blast` | 16 | `(930, 1587, 1114, 1702)` |
| `optimized-fuel` | 16 | `(2668, 756, 2716, 834)` |
| `optimized-surge` | 16 | `(2668, 986, 2738, 1068)` |
| `vectored-shockwave` | 11 | `(897, 1187, 1048, 1298)` |
| `impact-surge` | 11 | `(1693, 1177, 1832, 1332)` |
| `cooling-dampers` | 9 | `(2684, 470, 2750, 533)` |
| `depleted-shielding` | 9 | `(2686, 930, 2750, 997)` |

Expected originals: upload 9 is 3767×2117; upload 11 is 3771×1757; upload 16 is 3792×1811. The script checks dimensions before extraction. Its source filename metadata identifies the owner uploads without requiring a machine-specific home path in documentation.

## Normalization and safe regeneration

The script requires an already-installed Pillow and an explicit source directory containing the original filenames listed in `SOURCES`:

```bash
python3 scripts/extract-game-icons.py --source-dir /path/to/owner-uploads
```

Processing crops the specified rectangle, extracts a soft alpha mask from neutral-white line art, removes teal background RGB, trims empty bounds, and resizes while preserving aspect ratio. The longest pictogram dimension is normalized to 104 pixels, centered in a transparent 128×128 white-RGB PNG with 12-pixel minimum padding. This normalizes the visible footprint for legibility rather than making small native crops appear smaller than larger ones. Alpha resampling preserves antialiasing. Original uploads are never modified.

The default refuses to overwrite existing derived assets. To intentionally regenerate only the nine derived PNGs:

```bash
python3 scripts/extract-game-icons.py --source-dir /path/to/owner-uploads --overwrite
```

`--overwrite` is explicit permission to replace derived output, not originals. Do not substitute resized evidence copies: coordinates and expected dimensions refer to native uploads. Do not add a full-image fallback when extraction fails.

## Scope and verification

The icon map is separate from catalog `image` metadata. `npm run content:check` validates JSON schemas/references without requiring owner evidence; `npm run content:check:assets` additionally checks referenced evidence/display-file existence, not icon pixel correctness, legal rights, or whether an illustrative fallback matches game art. Review artwork mappings and rendered desktop/mobile cards separately; focused card/import tests are part of `npm run test:content`.

The parent reports 52 passing tests for the local refresh. Final type/lint/build and desktop/mobile browser checks remain parent-owned; this documentation update does not claim the new artwork/data are live in production. See [deployment.md](deployment.md) for historical publication evidence and current status. Local browser storage and unlisted sharing are unchanged; no real authentication or account sync has been added.
