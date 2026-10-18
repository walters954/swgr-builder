# Loadout import report

Access date: 2026-10-17. Run: `python3 scripts/import-gameslantern-loadouts.py`.

Successfully fetched/reused HTML pages: 75. Ability detail pages: 45. Racer-style detail pages: 20. Style section records: 62. Files written: 91. Failures: 0.

## Publication eligibility correction

Decision: keep records with an unknown name or summary as `draft`. No summary is fabricated from traits or narrative lore. Known traits and IDs remain unchanged. This rule runs on every save, including cached reruns.

- `bt310-quadra`: `draft`; summary remains unknown.
- `custom-ord-pedrovia`: `draft`; summary remains unknown.
- `exelbrok-xl-5115`: `draft`; summary remains unknown.
- `ipg-x1131-longtail`: `draft`; summary remains unknown.
- `plug-f-mammoth`: `draft`; summary remains unknown.
- `vulptereen-327`: `draft`; summary remains unknown.

Verification: compare SHA-256 digests of all owned output files after two successive cached runs of `python3 scripts/import-gameslantern-loadouts.py`; validate isolated schemas, publication eligibility, and unchanged traits/IDs. Full catalog validation still requires the parent manifest merge.

## Policy and limitations

- Sequential fetching, finite timeout, two retries; URL-hashed HTML cache under ignored `content/evidence/import-cache`. No artwork downloaded.
- Every imported claim is reported, with a page-level secondary source dated 2026-10-17. Existing supported claims, IDs, variant IDs, images, and screenshot-only metadata are preserved.
- Roman numerals come only from explicit title suffixes, never tiers. Unnumbered titles use an observed variant with unknown rank. Timing inside an effect is not assumed to be activation duration. Numeric costs/timings require labeled per-variant fields.
- Generic style records represent the explicit Multiplayer section; campaign ranks have separate IDs and section notes on traits. Existing generic rank remains unknown. No universal mode compatibility inferred.
- The linked traits index was reviewed; traits are imported in their explicit style sections, not as invented standalone records (schema has no standalone trait type).
- Short mechanic facts only; narrative podracer descriptions and guide prose excluded. Wiki guides provide review context, not invented corroboration.
- `readCatalog` requires the parent to merge this source manifest into the registry. No registry/schema/UI/git/deploy changes made.

## Wiki review

```json
[
  {
    "url": "https://swgalacticracer.wiki/guide/",
    "note": "Reviewed secondary guide; no variant-scoped structured claims imported. Guide prose and build recommendations excluded.",
    "headings": [
      "After launch",
      "New and recently updated",
      "49 achievements on the live Steam listing",
      "Nominated for a Golden Joystick Award — not a score",
      "Still $59.99, ten days after launch",
      "Very Positive on October 16: 4,983 of 5,767",
      "A mid-race stutter is not a slow landspeeder",
      "Change the vehicle for the planet, not for a stutter",
      "Learn the hazard, then add contact",
      "The campaign branches. There is no numbered cup.",
      "Contact is a setup, not a panic button",
      "Guides",
      "Tips",
      "Site"
    ]
  },
  {
    "url": "https://swgalacticracer.wiki/tips/campaign-builds/",
    "note": "Reviewed secondary guide; no variant-scoped structured claims imported. Guide prose and build recommendations excluded.",
    "headings": [
      "Buy this first",
      "Class by planet",
      "Two boosts, one finger problem",
      "Guides",
      "Tips",
      "Site"
    ]
  },
  {
    "url": "https://swgalacticracer.wiki/tips/eliminator/",
    "note": "Reviewed secondary guide; no variant-scoped structured claims imported. Guide prose and build recommendations excluded.",
    "headings": [
      "How to survive one",
      "Guides",
      "Tips",
      "Site"
    ]
  },
  {
    "url": "https://swgalacticracer.wiki/tips/multiplayer-tour/",
    "note": "Reviewed secondary guide; no variant-scoped structured claims imported. Guide prose and build recommendations excluded.",
    "headings": [
      "Before you ready up",
      "What is actually missing",
      "Guides",
      "Tips",
      "Site"
    ]
  },
  {
    "url": "https://swgalacticracer.wiki/unlocks/",
    "note": "Reviewed secondary guide; no variant-scoped structured claims imported. Guide prose and build recommendations excluded.",
    "headings": [
      "Available immediately",
      "Earned",
      "Paid, not earned",
      "Not an unlock",
      "Guides",
      "Tips",
      "Site"
    ]
  }
]
```

## Page and section coverage

```json
[
  {
    "url": "https://galacticracer.gameslantern.com/abilities/auto-scrubber",
    "record": "auto-scrubber",
    "variant": "auto-scrubber-observed",
    "explicitRank": null
  },
  {
    "url": "https://galacticracer.gameslantern.com/abilities/auto-scrubber-ii",
    "record": "auto-scrubber",
    "variant": "auto-scrubber-ii",
    "explicitRank": "II"
  },
  {
    "url": "https://galacticracer.gameslantern.com/abilities/auto-vent",
    "record": "auto-vent",
    "variant": "auto-vent-observed",
    "explicitRank": null
  },
  {
    "url": "https://galacticracer.gameslantern.com/abilities/autopilot",
    "record": "autopilot",
    "variant": "autopilot-observed",
    "explicitRank": null
  },
  {
    "url": "https://galacticracer.gameslantern.com/abilities/charging-blast",
    "record": "charging-blast",
    "variant": "charging-blast-observed",
    "explicitRank": null
  },
  {
    "url": "https://galacticracer.gameslantern.com/abilities/concussion-mine",
    "record": "concussion-mine",
    "variant": "concussion-mine-observed",
    "explicitRank": null
  },
  {
    "url": "https://galacticracer.gameslantern.com/abilities/concussion-mine-ii",
    "record": "concussion-mine",
    "variant": "concussion-mine-ii",
    "explicitRank": "II"
  },
  {
    "url": "https://galacticracer.gameslantern.com/abilities/concussion-mine-iii",
    "record": "concussion-mine",
    "variant": "concussion-mine-iii",
    "explicitRank": "III"
  },
  {
    "url": "https://galacticracer.gameslantern.com/abilities/concussive-bolt",
    "record": "concussive-bolt",
    "variant": "concussive-bolt-observed",
    "explicitRank": null
  },
  {
    "url": "https://galacticracer.gameslantern.com/abilities/concussive-bolt-ii",
    "record": "concussive-bolt",
    "variant": "concussive-bolt-ii",
    "explicitRank": "II"
  },
  {
    "url": "https://galacticracer.gameslantern.com/abilities/cooling-blast",
    "record": "cooling-blast",
    "variant": "cooling-blast-observed",
    "explicitRank": null
  },
  {
    "url": "https://galacticracer.gameslantern.com/abilities/corrosive-vent",
    "record": "corrosive-vent",
    "variant": "corrosive-vent-observed",
    "explicitRank": null
  },
  {
    "url": "https://galacticracer.gameslantern.com/abilities/flame-vent",
    "record": "flame-vent",
    "variant": "flame-vent-observed",
    "explicitRank": null
  },
  {
    "url": "https://galacticracer.gameslantern.com/abilities/freezing-concussion-mine",
    "record": "freezing-concussion-mine",
    "variant": "freezing-concussion-mine-observed",
    "explicitRank": null
  },
  {
    "url": "https://galacticracer.gameslantern.com/abilities/freezing-concussion-mine-ii",
    "record": "freezing-concussion-mine",
    "variant": "freezing-concussion-mine-ii",
    "explicitRank": "II"
  },
  {
    "url": "https://galacticracer.gameslantern.com/abilities/impact-shield",
    "record": "impact-shield",
    "variant": "impact-shield-observed",
    "explicitRank": null
  },
  {
    "url": "https://galacticracer.gameslantern.com/abilities/impact-shield-ii",
    "record": "impact-shield",
    "variant": "impact-shield-ii",
    "explicitRank": "II"
  },
  {
    "url": "https://galacticracer.gameslantern.com/abilities/impact-surge",
    "record": "impact-surge",
    "variant": "impact-surge-observed",
    "explicitRank": null
  },
  {
    "url": "https://galacticracer.gameslantern.com/abilities/impact-surge-ii",
    "record": "impact-surge",
    "variant": "ii",
    "explicitRank": "II"
  },
  {
    "url": "https://galacticracer.gameslantern.com/abilities/ion-blast",
    "record": "ion-blast",
    "variant": "ion-blast-observed",
    "explicitRank": null
  },
  {
    "url": "https://galacticracer.gameslantern.com/abilities/ion-bolt",
    "record": "ion-bolt",
    "variant": "ion-bolt-observed",
    "explicitRank": null
  },
  {
    "url": "https://galacticracer.gameslantern.com/abilities/magnetic-shockwave",
    "record": "magnetic-shockwave",
    "variant": "magnetic-shockwave-observed",
    "explicitRank": null
  },
  {
    "url": "https://galacticracer.gameslantern.com/abilities/magnetic-shockwave-ii",
    "record": "magnetic-shockwave",
    "variant": "magnetic-shockwave-ii",
    "explicitRank": "II"
  },
  {
    "url": "https://galacticracer.gameslantern.com/abilities/multi-bolt",
    "record": "multi-bolt",
    "variant": "multi-bolt-observed",
    "explicitRank": null
  },
  {
    "url": "https://galacticracer.gameslantern.com/abilities/multi-bolt-ii",
    "record": "multi-bolt",
    "variant": "multi-bolt-ii",
    "explicitRank": "II"
  },
  {
    "url": "https://galacticracer.gameslantern.com/abilities/multi-scrubber",
    "record": "multi-scrubber",
    "variant": "multi-scrubber-observed",
    "explicitRank": null
  },
  {
    "url": "https://galacticracer.gameslantern.com/abilities/multi-scrubber-ii",
    "record": "multi-scrubber",
    "variant": "multi-scrubber-ii",
    "explicitRank": "II"
  },
  {
    "url": "https://galacticracer.gameslantern.com/abilities/overcharged-autopilot",
    "record": "overcharged-autopilot",
    "variant": "overcharged-autopilot-observed",
    "explicitRank": null
  },
  {
    "url": "https://galacticracer.gameslantern.com/abilities/overcharged-autopilot-ii",
    "record": "overcharged-autopilot",
    "variant": "overcharged-autopilot-ii",
    "explicitRank": "II"
  },
  {
    "url": "https://galacticracer.gameslantern.com/abilities/overtaking-surge",
    "record": "overtaking-surge",
    "variant": "overtaking-surge-observed",
    "explicitRank": null
  },
  {
    "url": "https://galacticracer.gameslantern.com/abilities/overtaking-surge-ii",
    "record": "overtaking-surge",
    "variant": "ii",
    "explicitRank": "II"
  },
  {
    "url": "https://galacticracer.gameslantern.com/abilities/shield",
    "record": "shield",
    "variant": "shield-observed",
    "explicitRank": null
  },
  {
    "url": "https://galacticracer.gameslantern.com/abilities/shielding-blast",
    "record": "shielding-blast",
    "variant": "shielding-blast-observed",
    "explicitRank": null
  },
  {
    "url": "https://galacticracer.gameslantern.com/abilities/shockwave",
    "record": "shockwave",
    "variant": "shockwave-observed",
    "explicitRank": null
  },
  {
    "url": "https://galacticracer.gameslantern.com/abilities/status-scrubber",
    "record": "status-scrubber",
    "variant": "status-scrubber-observed",
    "explicitRank": null
  },
  {
    "url": "https://galacticracer.gameslantern.com/abilities/supercooled-vent",
    "record": "supercooled-vent",
    "variant": "supercooled-vent-observed",
    "explicitRank": null
  },
  {
    "url": "https://galacticracer.gameslantern.com/abilities/surge",
    "record": "surge",
    "variant": "surge-observed",
    "explicitRank": null
  },
  {
    "url": "https://galacticracer.gameslantern.com/abilities/surging-autopilot",
    "record": "surging-autopilot",
    "variant": "surging-autopilot-observed",
    "explicitRank": null
  },
  {
    "url": "https://galacticracer.gameslantern.com/abilities/surging-autopilot-ii",
    "record": "surging-autopilot",
    "variant": "surging-autopilot-ii",
    "explicitRank": "II"
  },
  {
    "url": "https://galacticracer.gameslantern.com/abilities/surging-shield",
    "record": "surging-shield",
    "variant": "surging-shield-observed",
    "explicitRank": null
  },
  {
    "url": "https://galacticracer.gameslantern.com/abilities/surging-shield-ii",
    "record": "surging-shield",
    "variant": "surging-shield-ii",
    "explicitRank": "II"
  },
  {
    "url": "https://galacticracer.gameslantern.com/abilities/vectored-shockwave",
    "record": "vectored-shockwave",
    "variant": "vectored-shockwave-observed",
    "explicitRank": null
  },
  {
    "url": "https://galacticracer.gameslantern.com/abilities/vectored-shockwave-ii",
    "record": "vectored-shockwave",
    "variant": "ii",
    "explicitRank": "II"
  },
  {
    "url": "https://galacticracer.gameslantern.com/abilities/vent",
    "record": "vent",
    "variant": "vent-observed",
    "explicitRank": null
  },
  {
    "url": "https://galacticracer.gameslantern.com/abilities/vent-ii",
    "record": "vent",
    "variant": "vent-ii",
    "explicitRank": "II"
  },
  {
    "url": "https://galacticracer.gameslantern.com/racer-styles/afterburner",
    "record": "afterburner-campaign-rank-1",
    "section": "Campaign rank 1",
    "traits": 2
  },
  {
    "url": "https://galacticracer.gameslantern.com/racer-styles/afterburner",
    "record": "afterburner-campaign-rank-2",
    "section": "Campaign rank 2",
    "traits": 3
  },
  {
    "url": "https://galacticracer.gameslantern.com/racer-styles/afterburner",
    "record": "afterburner-campaign-rank-3",
    "section": "Campaign rank 3",
    "traits": 4
  },
  {
    "url": "https://galacticracer.gameslantern.com/racer-styles/afterburner",
    "record": "afterburner",
    "section": "Multiplayer",
    "traits": 3
  },
  {
    "url": "https://galacticracer.gameslantern.com/racer-styles/brawler",
    "record": "brawler-campaign-rank-1",
    "section": "Campaign rank 1",
    "traits": 2
  },
  {
    "url": "https://galacticracer.gameslantern.com/racer-styles/brawler",
    "record": "brawler-campaign-rank-2",
    "section": "Campaign rank 2",
    "traits": 3
  },
  {
    "url": "https://galacticracer.gameslantern.com/racer-styles/brawler",
    "record": "brawler-campaign-rank-3",
    "section": "Campaign rank 3",
    "traits": 4
  },
  {
    "url": "https://galacticracer.gameslantern.com/racer-styles/brawler",
    "record": "brawler",
    "section": "Multiplayer",
    "traits": 3
  },
  {
    "url": "https://galacticracer.gameslantern.com/racer-styles/brawler",
    "record": "brawler-multiplayer-loadout-2",
    "section": "Multiplayer (alternate source section 2)",
    "traits": 3
  },
  {
    "url": "https://galacticracer.gameslantern.com/racer-styles/bt310-quadra",
    "record": "bt310-quadra",
    "section": "Multiplayer",
    "traits": 2
  },
  {
    "url": "https://galacticracer.gameslantern.com/racer-styles/clean-racer",
    "record": "clean-racer-campaign-rank-1",
    "section": "Campaign rank 1",
    "traits": 2
  },
  {
    "url": "https://galacticracer.gameslantern.com/racer-styles/clean-racer",
    "record": "clean-racer-campaign-rank-2",
    "section": "Campaign rank 2",
    "traits": 3
  },
  {
    "url": "https://galacticracer.gameslantern.com/racer-styles/clean-racer",
    "record": "clean-racer-campaign-rank-3",
    "section": "Campaign rank 3",
    "traits": 4
  },
  {
    "url": "https://galacticracer.gameslantern.com/racer-styles/clean-racer",
    "record": "clean-racer",
    "section": "Multiplayer",
    "traits": 3
  },
  {
    "url": "https://galacticracer.gameslantern.com/racer-styles/custom-ord-pedrovia",
    "record": "custom-ord-pedrovia",
    "section": "Multiplayer",
    "traits": 2
  },
  {
    "url": "https://galacticracer.gameslantern.com/racer-styles/engineer",
    "record": "engineer-campaign-rank-1",
    "section": "Campaign rank 1",
    "traits": 2
  },
  {
    "url": "https://galacticracer.gameslantern.com/racer-styles/engineer",
    "record": "engineer-campaign-rank-2",
    "section": "Campaign rank 2",
    "traits": 3
  },
  {
    "url": "https://galacticracer.gameslantern.com/racer-styles/engineer",
    "record": "engineer-campaign-rank-3",
    "section": "Campaign rank 3",
    "traits": 4
  },
  {
    "url": "https://galacticracer.gameslantern.com/racer-styles/engineer",
    "record": "engineer",
    "section": "Multiplayer",
    "traits": 3
  },
  {
    "url": "https://galacticracer.gameslantern.com/racer-styles/exelbrok-xl-5115",
    "record": "exelbrok-xl-5115",
    "section": "Multiplayer",
    "traits": 2
  },
  {
    "url": "https://galacticracer.gameslantern.com/racer-styles/firebug",
    "record": "firebug-campaign-rank-1",
    "section": "Campaign rank 1",
    "traits": 2
  },
  {
    "url": "https://galacticracer.gameslantern.com/racer-styles/firebug",
    "record": "firebug-campaign-rank-2",
    "section": "Campaign rank 2",
    "traits": 3
  },
  {
    "url": "https://galacticracer.gameslantern.com/racer-styles/firebug",
    "record": "firebug-campaign-rank-3",
    "section": "Campaign rank 3",
    "traits": 4
  },
  {
    "url": "https://galacticracer.gameslantern.com/racer-styles/firebug",
    "record": "firebug",
    "section": "Multiplayer",
    "traits": 3
  },
  {
    "url": "https://galacticracer.gameslantern.com/racer-styles/ice-cold",
    "record": "ice-cold-campaign-rank-1",
    "section": "Campaign rank 1",
    "traits": 2
  },
  {
    "url": "https://galacticracer.gameslantern.com/racer-styles/ice-cold",
    "record": "ice-cold-campaign-rank-2",
    "section": "Campaign rank 2",
    "traits": 3
  },
  {
    "url": "https://galacticracer.gameslantern.com/racer-styles/ice-cold",
    "record": "ice-cold-campaign-rank-3",
    "section": "Campaign rank 3",
    "traits": 4
  },
  {
    "url": "https://galacticracer.gameslantern.com/racer-styles/ipg-x1131-longtail",
    "record": "ipg-x1131-longtail",
    "section": "Multiplayer",
    "traits": 2
  },
  {
    "url": "https://galacticracer.gameslantern.com/racer-styles/plug-f-mammoth",
    "record": "plug-f-mammoth",
    "section": "Multiplayer",
    "traits": 2
  },
  {
    "url": "https://galacticracer.gameslantern.com/racer-styles/ramjet-rider",
    "record": "ramjet-rider-campaign-rank-1",
    "section": "Campaign rank 1",
    "traits": 2
  },
  {
    "url": "https://galacticracer.gameslantern.com/racer-styles/ramjet-rider",
    "record": "ramjet-rider-campaign-rank-2",
    "section": "Campaign rank 2",
    "traits": 3
  },
  {
    "url": "https://galacticracer.gameslantern.com/racer-styles/ramjet-rider",
    "record": "ramjet-rider-campaign-rank-3",
    "section": "Campaign rank 3",
    "traits": 4
  },
  {
    "url": "https://galacticracer.gameslantern.com/racer-styles/ramjet-rider",
    "record": "ramjet-rider",
    "section": "Multiplayer",
    "traits": 3
  },
  {
    "url": "https://galacticracer.gameslantern.com/racer-styles/redliner",
    "record": "redliner-campaign-rank-1",
    "section": "Campaign rank 1",
    "traits": 2
  },
  {
    "url": "https://galacticracer.gameslantern.com/racer-styles/redliner",
    "record": "redliner-campaign-rank-2",
    "section": "Campaign rank 2",
    "traits": 3
  },
  {
    "url": "https://galacticracer.gameslantern.com/racer-styles/redliner",
    "record": "redliner-campaign-rank-3",
    "section": "Campaign rank 3",
    "traits": 4
  },
  {
    "url": "https://galacticracer.gameslantern.com/racer-styles/redliner",
    "record": "redliner",
    "section": "Multiplayer",
    "traits": 3
  },
  {
    "url": "https://galacticracer.gameslantern.com/racer-styles/slipstreamer",
    "record": "slipstreamer-campaign-rank-1",
    "section": "Campaign rank 1",
    "traits": 2
  },
  {
    "url": "https://galacticracer.gameslantern.com/racer-styles/slipstreamer",
    "record": "slipstreamer-campaign-rank-2",
    "section": "Campaign rank 2",
    "traits": 3
  },
  {
    "url": "https://galacticracer.gameslantern.com/racer-styles/slipstreamer",
    "record": "slipstreamer-campaign-rank-3",
    "section": "Campaign rank 3",
    "traits": 4
  },
  {
    "url": "https://galacticracer.gameslantern.com/racer-styles/slipstreamer",
    "record": "slipstreamer",
    "section": "Multiplayer",
    "traits": 3
  },
  {
    "url": "https://galacticracer.gameslantern.com/racer-styles/stunt-runner",
    "record": "stunt-runner-campaign-rank-1",
    "section": "Campaign rank 1",
    "traits": 2
  },
  {
    "url": "https://galacticracer.gameslantern.com/racer-styles/stunt-runner",
    "record": "stunt-runner-campaign-rank-2",
    "section": "Campaign rank 2",
    "traits": 3
  },
  {
    "url": "https://galacticracer.gameslantern.com/racer-styles/stunt-runner",
    "record": "stunt-runner-campaign-rank-3",
    "section": "Campaign rank 3",
    "traits": 4
  },
  {
    "url": "https://galacticracer.gameslantern.com/racer-styles/stunt-runner",
    "record": "stunt-runner",
    "section": "Multiplayer",
    "traits": 3
  },
  {
    "url": "https://galacticracer.gameslantern.com/racer-styles/survivor",
    "record": "survivor-campaign-rank-1",
    "section": "Campaign rank 1",
    "traits": 2
  },
  {
    "url": "https://galacticracer.gameslantern.com/racer-styles/survivor",
    "record": "survivor-campaign-rank-2",
    "section": "Campaign rank 2",
    "traits": 3
  },
  {
    "url": "https://galacticracer.gameslantern.com/racer-styles/survivor",
    "record": "survivor-campaign-rank-3",
    "section": "Campaign rank 3",
    "traits": 4
  },
  {
    "url": "https://galacticracer.gameslantern.com/racer-styles/survivor",
    "record": "survivor",
    "section": "Multiplayer",
    "traits": 3
  },
  {
    "url": "https://galacticracer.gameslantern.com/racer-styles/tech-expert",
    "record": "tech-expert-campaign-rank-1",
    "section": "Campaign rank 1",
    "traits": 2
  },
  {
    "url": "https://galacticracer.gameslantern.com/racer-styles/tech-expert",
    "record": "tech-expert-campaign-rank-2",
    "section": "Campaign rank 2",
    "traits": 3
  },
  {
    "url": "https://galacticracer.gameslantern.com/racer-styles/tech-expert",
    "record": "tech-expert-campaign-rank-3",
    "section": "Campaign rank 3",
    "traits": 4
  },
  {
    "url": "https://galacticracer.gameslantern.com/racer-styles/tech-expert",
    "record": "tech-expert",
    "section": "Multiplayer",
    "traits": 3
  },
  {
    "url": "https://galacticracer.gameslantern.com/racer-styles/tenacious",
    "record": "tenacious-campaign-rank-1",
    "section": "Campaign rank 1",
    "traits": 2
  },
  {
    "url": "https://galacticracer.gameslantern.com/racer-styles/tenacious",
    "record": "tenacious-campaign-rank-2",
    "section": "Campaign rank 2",
    "traits": 3
  },
  {
    "url": "https://galacticracer.gameslantern.com/racer-styles/tenacious",
    "record": "tenacious-campaign-rank-3",
    "section": "Campaign rank 3",
    "traits": 4
  },
  {
    "url": "https://galacticracer.gameslantern.com/racer-styles/tenacious",
    "record": "tenacious",
    "section": "Multiplayer",
    "traits": 3
  },
  {
    "url": "https://galacticracer.gameslantern.com/racer-styles/vulptereen-327",
    "record": "vulptereen-327",
    "section": "Multiplayer",
    "traits": 2
  },
  {
    "url": "https://galacticracer.gameslantern.com/racer-styles/weaponized",
    "record": "weaponized-campaign-rank-1",
    "section": "Campaign rank 1",
    "traits": 2
  },
  {
    "url": "https://galacticracer.gameslantern.com/racer-styles/weaponized",
    "record": "weaponized-campaign-rank-2",
    "section": "Campaign rank 2",
    "traits": 3
  },
  {
    "url": "https://galacticracer.gameslantern.com/racer-styles/weaponized",
    "record": "weaponized-campaign-rank-3",
    "section": "Campaign rank 3",
    "traits": 4
  },
  {
    "url": "https://galacticracer.gameslantern.com/racer-styles/weaponized",
    "record": "weaponized",
    "section": "Multiplayer",
    "traits": 3
  }
]
```

## Fetch or parsing failures

```json
[]
```

## Preserved disagreements (not overwritten)

Different source wording is logged conservatively, even when semantically compatible.

```json
[
  {
    "record": "auto-scrubber",
    "field": "summary",
    "preserved": {
      "status": "reported",
      "value": "Clear negative status effects. If any are cleared, recover 1 Energy . Ability activates automatically upon System Malfunction at a cost of 0 Energy .",
      "sourceIds": [
        "loadouts-gameslantern-abilities-auto-scrubber"
      ]
    },
    "reported": {
      "status": "reported",
      "value": "Clear negative status effects. If any are cleared, recover 2 Energy . Ability activates automatically upon gaining any negative status effect at a cost of 0 Energy .",
      "sourceIds": [
        "loadouts-gameslantern-abilities-auto-scrubber-ii"
      ]
    }
  },
  {
    "record": "concussion-mine",
    "field": "summary",
    "preserved": {
      "status": "reported",
      "value": "Drop a charge that explodes on proximity and applies Concussed and System Malfunction to nearby opponents.",
      "sourceIds": [
        "loadouts-gameslantern-abilities-concussion-mine"
      ]
    },
    "reported": {
      "status": "reported",
      "value": "Drop 2 charges that explode on proximity and apply Concussed and System Malfunction to nearby opponents.",
      "sourceIds": [
        "loadouts-gameslantern-abilities-concussion-mine-ii"
      ]
    }
  },
  {
    "record": "concussion-mine",
    "field": "summary",
    "preserved": {
      "status": "reported",
      "value": "Drop a charge that explodes on proximity and applies Concussed and System Malfunction to nearby opponents.",
      "sourceIds": [
        "loadouts-gameslantern-abilities-concussion-mine"
      ]
    },
    "reported": {
      "status": "reported",
      "value": "Drop 3 charges that explode on proximity and apply Concussed and System Malfunction to nearby opponents.",
      "sourceIds": [
        "loadouts-gameslantern-abilities-concussion-mine-iii"
      ]
    }
  },
  {
    "record": "concussive-bolt",
    "field": "summary",
    "preserved": {
      "status": "reported",
      "value": "Lock on to the closest nearby opponent and apply Disrupted and Concussed to target.",
      "sourceIds": [
        "loadouts-gameslantern-abilities-concussive-bolt"
      ]
    },
    "reported": {
      "status": "reported",
      "value": "Lock on to the closest nearby opponent and apply Disrupted and Concussed to target for an extended duration.",
      "sourceIds": [
        "loadouts-gameslantern-abilities-concussive-bolt-ii"
      ]
    }
  },
  {
    "record": "flame-vent",
    "field": "summary",
    "preserved": {
      "status": "reported",
      "value": "A vent ability discussed in Ramjet-focused builds for its cooling interaction.",
      "sourceIds": [
        "ign-builds-2026"
      ],
      "notes": "Paraphrased guide summary, not exact in-game card text."
    },
    "reported": {
      "status": "reported",
      "value": "Gain Cooled and reduce Ramjet heat. Applies Burning and System Malfunction to nearby opponents.",
      "sourceIds": [
        "loadouts-gameslantern-abilities-flame-vent"
      ]
    }
  },
  {
    "record": "freezing-concussion-mine",
    "field": "summary",
    "preserved": {
      "status": "reported",
      "value": "Drop a charge that applies Concussed and System Malfunction to nearby opponents and emits a lingering Frozen effect.",
      "sourceIds": [
        "loadouts-gameslantern-abilities-freezing-concussion-mine"
      ]
    },
    "reported": {
      "status": "reported",
      "value": "Drop a charge that applies Concussed and System Malfunction to nearby opponents and emits a lingering Frozen effect. Recover 1 Energy for each affected racer.",
      "sourceIds": [
        "loadouts-gameslantern-abilities-freezing-concussion-mine-ii"
      ]
    }
  },
  {
    "record": "impact-shield",
    "field": "summary",
    "preserved": {
      "status": "screenshot-verified",
      "value": "Shown equipped in Ability 1 on the Survivor build screen; its rank and effect are not shown.",
      "sourceIds": [
        "screenshot-survivor-build-13"
      ]
    },
    "reported": {
      "status": "reported",
      "value": "Gain Shielded for 10s. Collisions trigger System Malfunction on opponents.",
      "sourceIds": [
        "loadouts-gameslantern-abilities-impact-shield"
      ]
    }
  },
  {
    "record": "impact-shield",
    "field": "summary",
    "preserved": {
      "status": "screenshot-verified",
      "value": "Shown equipped in Ability 1 on the Survivor build screen; its rank and effect are not shown.",
      "sourceIds": [
        "screenshot-survivor-build-13"
      ]
    },
    "reported": {
      "status": "reported",
      "value": "Gain Shielded for 10s. Collisions extend Shielded duration and trigger System Malfunction on opponents.",
      "sourceIds": [
        "loadouts-gameslantern-abilities-impact-shield-ii"
      ]
    }
  },
  {
    "record": "impact-surge",
    "field": "summary",
    "preserved": {
      "status": "screenshot-verified",
      "value": "Shown equipped in Ability 2, with rank II now observed; its effect is not shown.",
      "sourceIds": [
        "screenshot-stunt-runner-efficiency-build",
        "screenshot-vectored-shockwave-tooltip"
      ]
    },
    "reported": {
      "status": "reported",
      "value": "Gain Surging for 10s. Overtakes, Takedowns , and vehicle collisions extend the duration​.",
      "sourceIds": [
        "loadouts-gameslantern-abilities-impact-surge"
      ]
    }
  },
  {
    "record": "impact-surge",
    "field": "summary",
    "preserved": {
      "status": "screenshot-verified",
      "value": "Shown equipped in Ability 2, with rank II now observed; its effect is not shown.",
      "sourceIds": [
        "screenshot-stunt-runner-efficiency-build",
        "screenshot-vectored-shockwave-tooltip"
      ]
    },
    "reported": {
      "status": "reported",
      "value": "Gain Surging for 10s. Overtakes, Takedowns , and vehicle collisions extend the duration. Takedowns recharge Energy .",
      "sourceIds": [
        "loadouts-gameslantern-abilities-impact-surge-ii"
      ]
    }
  },
  {
    "record": "ion-blast",
    "field": "summary",
    "preserved": {
      "status": "screenshot-verified",
      "value": "Shown as the Crash Ability, not a regular ability slot; its rank and effect are not shown.",
      "sourceIds": [
        "screenshot-clean-racer-tooltip-16"
      ]
    },
    "reported": {
      "status": "reported",
      "value": "Crash Ability . Emit a blast that applies Disrupted to nearby opponents. Upon reset, gain considerably increased Speed for each affected opponent.",
      "sourceIds": [
        "loadouts-gameslantern-abilities-ion-blast"
      ]
    }
  },
  {
    "record": "magnetic-shockwave",
    "field": "summary",
    "preserved": {
      "status": "reported",
      "value": "Pull nearby opponents into proximity before blasting them away and applying System Malfunction to affected opponents.",
      "sourceIds": [
        "loadouts-gameslantern-abilities-magnetic-shockwave"
      ]
    },
    "reported": {
      "status": "reported",
      "value": "Pull nearby opponents into proximity before blasting them away and applying System Malfunction and Concussed to affected opponents.",
      "sourceIds": [
        "loadouts-gameslantern-abilities-magnetic-shockwave-ii"
      ]
    }
  },
  {
    "record": "multi-bolt",
    "field": "summary",
    "preserved": {
      "status": "reported",
      "value": "Lock on to up to 5 nearby opponents and apply Disrupted to all targets.",
      "sourceIds": [
        "loadouts-gameslantern-abilities-multi-bolt"
      ]
    },
    "reported": {
      "status": "reported",
      "value": "Lock on to up to 5 nearby opponents and apply Disrupted to all targets. Gain Surging for 5s for each affected opponent.",
      "sourceIds": [
        "loadouts-gameslantern-abilities-multi-bolt-ii"
      ]
    }
  },
  {
    "record": "multi-scrubber",
    "field": "summary",
    "preserved": {
      "status": "reported",
      "value": "Clear negative status effects. If any are cleared, recover 3 Energy .",
      "sourceIds": [
        "loadouts-gameslantern-abilities-multi-scrubber"
      ]
    },
    "reported": {
      "status": "reported",
      "value": "Clear negative status effects. If any are cleared, recover 4 Energy .",
      "sourceIds": [
        "loadouts-gameslantern-abilities-multi-scrubber-ii"
      ]
    }
  },
  {
    "record": "overcharged-autopilot",
    "field": "summary",
    "preserved": {
      "status": "reported",
      "value": "Vehicle flies automatically for 20s. Gain Overcharged while active.",
      "sourceIds": [
        "loadouts-gameslantern-abilities-overcharged-autopilot"
      ]
    },
    "reported": {
      "status": "reported",
      "value": "Vehicle flies automatically for 20s. Gain Overcharged while active. Activating an Ability extends the duration by 5s.",
      "sourceIds": [
        "loadouts-gameslantern-abilities-overcharged-autopilot-ii"
      ]
    }
  },
  {
    "record": "overtaking-surge",
    "field": "summary",
    "preserved": {
      "status": "screenshot-verified",
      "value": "Gain Surging for 10s, lost on impact. Overtakes extend the duration and increase its potency.",
      "sourceIds": [
        "screenshot-clean-racer-tooltip-16"
      ]
    },
    "reported": {
      "status": "reported",
      "value": "Gain Surging for 20s, lost on impact. Overtakes extend the duration and increase its potency.",
      "sourceIds": [
        "loadouts-gameslantern-abilities-overtaking-surge-ii"
      ]
    }
  },
  {
    "record": "overtaking-surge/ii",
    "field": "description",
    "preserved": {
      "status": "screenshot-verified",
      "value": "Gain Surging for 10s, lost on impact. Overtakes extend the duration and increase its potency.",
      "sourceIds": [
        "screenshot-clean-racer-tooltip-16"
      ],
      "notes": "Generic tooltip while rank II is equipped; no rank-specific multiplier is established."
    },
    "reported": {
      "status": "reported",
      "value": "Gain Surging for 20s, lost on impact. Overtakes extend the duration and increase its potency.",
      "sourceIds": [
        "loadouts-gameslantern-abilities-overtaking-surge-ii"
      ]
    }
  },
  {
    "record": "shockwave",
    "field": "summary",
    "preserved": {
      "status": "screenshot-verified",
      "value": "Shown equipped in Ability 2 on the Survivor build screen; its rank and effect are not shown.",
      "sourceIds": [
        "screenshot-survivor-build-13"
      ]
    },
    "reported": {
      "status": "reported",
      "value": "Blast nearby opponents away and apply System Malfunction to affected opponents.",
      "sourceIds": [
        "loadouts-gameslantern-abilities-shockwave"
      ]
    }
  },
  {
    "record": "status-scrubber",
    "field": "summary",
    "preserved": {
      "status": "screenshot-verified",
      "value": "Shown equipped in Ability 2; its rank and effect are not shown.",
      "sourceIds": [
        "screenshot-clean-racer-tooltip-16"
      ]
    },
    "reported": {
      "status": "reported",
      "value": "Clear negative status effects. If any are cleared, recover 1 Energy .",
      "sourceIds": [
        "loadouts-gameslantern-abilities-status-scrubber"
      ]
    }
  },
  {
    "record": "surge",
    "field": "summary",
    "preserved": {
      "status": "screenshot-verified",
      "value": "Shown equipped in Ability 2; its rank and effect are not shown.",
      "sourceIds": [
        "screenshot-stunt-runner-full-build"
      ]
    },
    "reported": {
      "status": "reported",
      "value": "Gain Surging for 10s, lost on impact. Overtakes extend the duration.",
      "sourceIds": [
        "loadouts-gameslantern-abilities-surge"
      ]
    }
  },
  {
    "record": "surging-autopilot",
    "field": "summary",
    "preserved": {
      "status": "reported",
      "value": "Vehicle flies automatically for 15s. Gain Surging while active.",
      "sourceIds": [
        "loadouts-gameslantern-abilities-surging-autopilot"
      ]
    },
    "reported": {
      "status": "reported",
      "value": "Vehicle flies automatically for 15s. Gain Surging and massively increase Speed while active.",
      "sourceIds": [
        "loadouts-gameslantern-abilities-surging-autopilot-ii"
      ]
    }
  },
  {
    "record": "surging-shield",
    "field": "summary",
    "preserved": {
      "status": "reported",
      "value": "Gain Shielded for 10s. Impacts grant Surging for 5s.",
      "sourceIds": [
        "loadouts-gameslantern-abilities-surging-shield"
      ]
    },
    "reported": {
      "status": "reported",
      "value": "Gain Shielded , retained until it is broken. Impacts grant Surging for 5s.",
      "sourceIds": [
        "loadouts-gameslantern-abilities-surging-shield-ii"
      ]
    }
  },
  {
    "record": "vectored-shockwave",
    "field": "summary",
    "preserved": {
      "status": "screenshot-verified",
      "value": "Blast nearby opponents away, propelling you forward and applying System Malfunction to affected opponents.",
      "sourceIds": [
        "screenshot-vectored-shockwave-tooltip"
      ]
    },
    "reported": {
      "status": "reported",
      "value": "Blast nearby opponents away, propelling you forward with increased power and applying System Malfunction to affected opponents.",
      "sourceIds": [
        "loadouts-gameslantern-abilities-vectored-shockwave-ii"
      ]
    }
  },
  {
    "record": "vectored-shockwave/ii",
    "field": "description",
    "preserved": {
      "status": "screenshot-verified",
      "value": "Blast nearby opponents away, propelling you forward and applying System Malfunction to affected opponents.",
      "sourceIds": [
        "screenshot-vectored-shockwave-tooltip"
      ],
      "notes": "Generic tooltip shown while rank II is equipped; no evidence of rank-specific multipliers, damage, range, or cooldown."
    },
    "reported": {
      "status": "reported",
      "value": "Blast nearby opponents away, propelling you forward with increased power and applying System Malfunction to affected opponents.",
      "sourceIds": [
        "loadouts-gameslantern-abilities-vectored-shockwave-ii"
      ]
    }
  },
  {
    "record": "vent",
    "field": "summary",
    "preserved": {
      "status": "reported",
      "value": "Gain Cooled and reduce Ramjet heat.",
      "sourceIds": [
        "loadouts-gameslantern-abilities-vent"
      ]
    },
    "reported": {
      "status": "reported",
      "value": "Gain Cooled and reduce Ramjet heat for an extended duration.",
      "sourceIds": [
        "loadouts-gameslantern-abilities-vent-ii"
      ]
    }
  },
  {
    "record": "clean-racer",
    "field": "summary",
    "preserved": {
      "status": "screenshot-verified",
      "value": "A racer style that starts with Overtaking Surge, recovers Energy through overtakes, and increases speed after sustained Surging.",
      "sourceIds": [
        "screenshot-clean-racer-tooltip-16"
      ]
    },
    "reported": {
      "status": "reported",
      "value": "A deft style that rewards non-combative racing.",
      "sourceIds": [
        "loadouts-gameslantern-racer-styles-clean-racer"
      ]
    }
  },
  {
    "record": "clean-racer/trait/victory-charge",
    "field": "description",
    "preserved": {
      "status": "screenshot-verified",
      "value": "Every 5 overtakes, recover 1 Energy.",
      "sourceIds": [
        "screenshot-clean-racer-tooltip-16"
      ]
    },
    "reported": {
      "status": "reported",
      "value": "Every 5 overtakes, recover 1 Energy .",
      "sourceIds": [
        "loadouts-gameslantern-racer-styles-clean-racer"
      ],
      "notes": "Multiplayer"
    }
  },
  {
    "record": "clean-racer/trait/in-the-zone",
    "field": "name",
    "preserved": {
      "status": "screenshot-verified",
      "value": "In The Zone",
      "sourceIds": [
        "screenshot-clean-racer-tooltip-16"
      ]
    },
    "reported": {
      "status": "reported",
      "value": "In the Zone",
      "sourceIds": [
        "loadouts-gameslantern-racer-styles-clean-racer"
      ],
      "notes": "Multiplayer"
    }
  },
  {
    "record": "clean-racer/trait/in-the-zone",
    "field": "description",
    "preserved": {
      "status": "screenshot-verified",
      "value": "Upon Surging for 10s, speed is increased. Lost on System Malfunction or when Surging ends.",
      "sourceIds": [
        "screenshot-clean-racer-tooltip-16"
      ]
    },
    "reported": {
      "status": "reported",
      "value": "Upon Surging for 10s, top speed is increased. Lost on System Malfunction or when Surging ends.",
      "sourceIds": [
        "loadouts-gameslantern-racer-styles-clean-racer"
      ],
      "notes": "Multiplayer"
    }
  },
  {
    "record": "stunt-runner",
    "field": "summary",
    "preserved": {
      "status": "screenshot-verified",
      "value": "A racer style that starts with Vectored Shockwave and uses Perfect Landings and airtime to enhance Afterburner use.",
      "sourceIds": [
        "screenshot-stunt-runner-build"
      ]
    },
    "reported": {
      "status": "reported",
      "value": "A performative style that takes advantage of jumps to surprise opponents and extend Afterburner.",
      "sourceIds": [
        "loadouts-gameslantern-racer-styles-stunt-runner"
      ]
    }
  },
  {
    "record": "survivor",
    "field": "summary",
    "preserved": {
      "status": "screenshot-verified",
      "value": "A racer style with a starting Shield ability, a Speed increase lost on Crash, and Surging gained when Shielded is lost.",
      "sourceIds": [
        "screenshot-survivor-build-13"
      ]
    },
    "reported": {
      "status": "reported",
      "value": "A defensive style for those who want to race without interference.",
      "sourceIds": [
        "loadouts-gameslantern-racer-styles-survivor"
      ]
    }
  },
  {
    "record": "survivor/trait/mint-condition",
    "field": "description",
    "preserved": {
      "status": "screenshot-verified",
      "value": "Considerably increases Speed. Lost on Crash.",
      "sourceIds": [
        "screenshot-survivor-build-13"
      ]
    },
    "reported": {
      "status": "reported",
      "value": "Considerably increases Speed. Lost on Crash .",
      "sourceIds": [
        "loadouts-gameslantern-racer-styles-survivor"
      ],
      "notes": "Multiplayer"
    }
  }
]
```

## Files

- `content/abilities/auto-scrubber.json`
- `content/abilities/auto-vent.json`
- `content/abilities/autopilot.json`
- `content/abilities/charging-blast.json`
- `content/abilities/concussion-mine.json`
- `content/abilities/concussive-bolt.json`
- `content/abilities/cooling-blast.json`
- `content/abilities/corrosive-vent.json`
- `content/abilities/flame-vent.json`
- `content/abilities/freezing-concussion-mine.json`
- `content/abilities/impact-shield.json`
- `content/abilities/impact-surge.json`
- `content/abilities/ion-blast.json`
- `content/abilities/ion-bolt.json`
- `content/abilities/magnetic-shockwave.json`
- `content/abilities/multi-bolt.json`
- `content/abilities/multi-scrubber.json`
- `content/abilities/overcharged-autopilot.json`
- `content/abilities/overtaking-surge.json`
- `content/abilities/shield.json`
- `content/abilities/shielding-blast.json`
- `content/abilities/shockwave.json`
- `content/abilities/status-scrubber.json`
- `content/abilities/supercooled-vent.json`
- `content/abilities/surge.json`
- `content/abilities/surging-autopilot.json`
- `content/abilities/surging-shield.json`
- `content/abilities/vectored-shockwave.json`
- `content/abilities/vent.json`
- `content/racer-styles/afterburner-campaign-rank-1.json`
- `content/racer-styles/afterburner-campaign-rank-2.json`
- `content/racer-styles/afterburner-campaign-rank-3.json`
- `content/racer-styles/afterburner.json`
- `content/racer-styles/brawler-campaign-rank-1.json`
- `content/racer-styles/brawler-campaign-rank-2.json`
- `content/racer-styles/brawler-campaign-rank-3.json`
- `content/racer-styles/brawler-multiplayer-loadout-2.json`
- `content/racer-styles/brawler.json`
- `content/racer-styles/bt310-quadra.json`
- `content/racer-styles/clean-racer-campaign-rank-1.json`
- `content/racer-styles/clean-racer-campaign-rank-2.json`
- `content/racer-styles/clean-racer-campaign-rank-3.json`
- `content/racer-styles/clean-racer.json`
- `content/racer-styles/custom-ord-pedrovia.json`
- `content/racer-styles/engineer-campaign-rank-1.json`
- `content/racer-styles/engineer-campaign-rank-2.json`
- `content/racer-styles/engineer-campaign-rank-3.json`
- `content/racer-styles/engineer.json`
- `content/racer-styles/exelbrok-xl-5115.json`
- `content/racer-styles/firebug-campaign-rank-1.json`
- `content/racer-styles/firebug-campaign-rank-2.json`
- `content/racer-styles/firebug-campaign-rank-3.json`
- `content/racer-styles/firebug.json`
- `content/racer-styles/ice-cold-campaign-rank-1.json`
- `content/racer-styles/ice-cold-campaign-rank-2.json`
- `content/racer-styles/ice-cold-campaign-rank-3.json`
- `content/racer-styles/ipg-x1131-longtail.json`
- `content/racer-styles/plug-f-mammoth.json`
- `content/racer-styles/ramjet-rider-campaign-rank-1.json`
- `content/racer-styles/ramjet-rider-campaign-rank-2.json`
- `content/racer-styles/ramjet-rider-campaign-rank-3.json`
- `content/racer-styles/ramjet-rider.json`
- `content/racer-styles/redliner-campaign-rank-1.json`
- `content/racer-styles/redliner-campaign-rank-2.json`
- `content/racer-styles/redliner-campaign-rank-3.json`
- `content/racer-styles/redliner.json`
- `content/racer-styles/slipstreamer-campaign-rank-1.json`
- `content/racer-styles/slipstreamer-campaign-rank-2.json`
- `content/racer-styles/slipstreamer-campaign-rank-3.json`
- `content/racer-styles/slipstreamer.json`
- `content/racer-styles/stunt-runner-campaign-rank-1.json`
- `content/racer-styles/stunt-runner-campaign-rank-2.json`
- `content/racer-styles/stunt-runner-campaign-rank-3.json`
- `content/racer-styles/stunt-runner.json`
- `content/racer-styles/survivor-campaign-rank-1.json`
- `content/racer-styles/survivor-campaign-rank-2.json`
- `content/racer-styles/survivor-campaign-rank-3.json`
- `content/racer-styles/survivor.json`
- `content/racer-styles/tech-expert-campaign-rank-1.json`
- `content/racer-styles/tech-expert-campaign-rank-2.json`
- `content/racer-styles/tech-expert-campaign-rank-3.json`
- `content/racer-styles/tech-expert.json`
- `content/racer-styles/tenacious-campaign-rank-1.json`
- `content/racer-styles/tenacious-campaign-rank-2.json`
- `content/racer-styles/tenacious-campaign-rank-3.json`
- `content/racer-styles/tenacious.json`
- `content/racer-styles/vulptereen-327.json`
- `content/racer-styles/weaponized-campaign-rank-1.json`
- `content/racer-styles/weaponized-campaign-rank-2.json`
- `content/racer-styles/weaponized-campaign-rank-3.json`
- `content/racer-styles/weaponized.json`
- `scripts/import-gameslantern-loadouts.py`
- `content/imports/gameslantern-loadouts-sources.json`
- `docs/import-loadouts-report.md`
