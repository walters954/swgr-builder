# Parts import report — 2026-10-17

## Result

- Index: https://galacticracer.gameslantern.com/vehicle-parts
- Wiki: https://swgalacticracer.wiki/
- Discovered 318 detail pages; imported 318 / 318 (expected catalog: 318).
- 197 families, 319 variants; 59 Fault pages (source label `Faulty` retained verbatim).
- 0 fetch/parse failures; 4 duplicate-family/rank ambiguities; 0 retained field wording/value disagreements.
- Existing known claims, provenance, family IDs and variant IDs asserted unchanged. Unranked observed variants stay unranked; no dot-derived rank or rarity.
- All newly sourced claims are reported. Unknown values remain unknown. No global rarity/price/ranking assumptions.
- Optional fields supported by live runtime schema: priceCredits=true, unlock=true. Explicit page-local evidence: 305 prices and 300 unlock descriptions. Missing evidence remains unknown; no rarity-derived price inference.
- Cache-only execution: true. This mode uses cached parsed records and refuses all missing-HTML network requests.
- New base summaries use only the short detail-card mechanic effect (with an explicit Fault drawback prefix where applicable), never narrative guide prose. Existing known summaries are preserved.

## Sources and files

- `content/parts/*.json`: catalog families and variants.
- `scripts/import-gameslantern-parts.py`: repeatable import, max 3 fetch workers, 30-second request timeout, 2 retries, cache-first; no redirect following or image downloading.
- `content/imports/gameslantern-parts-sources.json`: 318 per-detail secondary sources for parent merge. Does not alter `content/sources.json`.
- `docs/import-parts-report.md`: this report.
- HTML and extracted optional-field evidence only under ignored `content/evidence/import-cache/`, not published.

## Wiki review

Wiki homepage has no dedicated parts index; only discovered same-origin relevant guide links reviewed. No narrative guide prose or images copied. No independent wiki evidence used to upgrade tooltip verification status.

- https://swgalacticracer.wiki/guide/: reviewed; no dedicated enumerated part detail catalog imported.
- https://swgalacticracer.wiki/tips/campaign-builds/: reviewed; no dedicated enumerated part detail catalog imported.
- https://swgalacticracer.wiki/unlocks/: reviewed; no dedicated enumerated part detail catalog imported.

## Validation

- `python3 -B scripts/import-gameslantern-parts.py --cache-only`: PASS, exit 0. Imported 318/318 cached pages; 197 families, 319 variants, zero failures. All existing known claims and IDs passed preservation assertions; no network requests made.
- Isolated live Zod `partSchema.parse` for every part and `sourcesSchema.parse` for the manifest via `node_modules/.bin/tsx -e`: PASS, exit 0. Result: `{"families":197,"sources":318,"reportedPrices":305,"reportedUnlocks":300}`.
- Scoped `git diff --check`: PASS, exit 0.
- Full catalog/source-reference validation is not claimed or rerun in this update: parent is merging the source manifest separately. `content/sources.json` was not written.
- 319 variants include one preserved pre-existing observed variant beyond the 318 page entries. Missing optional evidence is unknown or omitted, never filled from another rank or a global rarity rule.

## Failures

None.

## Duplicate-page ambiguities

- afterburner-reconfiguration / unranked: https://galacticracer.gameslantern.com/vehicle-parts/afterburner-reconfiguration vs https://galacticracer.gameslantern.com/vehicle-parts/afterburner-reconfiguration-2; facts: `{"rarity": "Epic", "description": "During System Malfunction, Afterburner is 100% more powerful.", "priceCredits": 3000, "unlock": "Complete 75 events."}` vs `{"rarity": "Epic", "description": "During System Malfunction, Afterburner is 100% more powerful.", "priceCredits": 3000, "unlock": "Complete 45 events."}`. Kept separate page-specific variant.
- corrode-resistance / unranked: https://galacticracer.gameslantern.com/vehicle-parts/corrode-resistance vs https://galacticracer.gameslantern.com/vehicle-parts/corrode-resistance-2; facts: `{"rarity": "Rare", "description": "Takes 200% longer to Crash from Corroded.", "priceCredits": 2500, "unlock": "Complete 40 events."}` vs `{"rarity": "Legendary", "description": "Takes 200% longer to Crash from Corroded.", "priceCredits": 4000, "unlock": null}`. Kept separate page-specific variant.
- enriched-fuel / IV: https://galacticracer.gameslantern.com/vehicle-parts/enriched-fuel-iv vs https://galacticracer.gameslantern.com/vehicle-parts/enriched-fuel-iv-2; facts: `{"rarity": "Legendary", "description": "Afterburner speed boost increased by 100%.", "priceCredits": 4000, "unlock": "Complete 91 events."}` vs `{"rarity": "Legendary", "description": "Afterburner speed boost increased by 100%.", "priceCredits": 4000, "unlock": "Complete 91 events."}`. Kept separate page-specific variant.
- improved-regulators / II: https://galacticracer.gameslantern.com/vehicle-parts/improved-regulators-ii vs https://galacticracer.gameslantern.com/vehicle-parts/improved-regulators-ii-2; facts: `{"rarity": "Rare", "description": "Afterburner fuel refills 100% faster.", "priceCredits": 2500, "unlock": "Start the Campaign."}` vs `{"rarity": "Rare", "description": "Afterburner fuel refills 100% faster.", "priceCredits": 2500, "unlock": null}`. Kept separate page-specific variant.

## Retained disagreements

Exact wording differences are included even when likely semantically equivalent; existing verified/reported claims were not overwritten.

None.

## Per-page field coverage

Statuses below describe extracted source evidence, not an upgrade of existing screenshot/official claims. Deferred means absent from current schema.

| Source title | Target family/variant | Rank | Rarity | Effect | Price | Unlock |
| --- | --- | --- | --- | --- | --- | --- |
| Ability Catalyst | ability-catalyst/unranked | unknown | reported | reported | reported | reported |
| Acid Battery | acid-battery/unranked | unknown | reported | reported | reported | reported |
| Acidic Fuel | acidic-fuel/unranked | unknown | reported | reported | reported | reported |
| Acrid Alarm | acrid-alarm/unranked | unknown | reported | reported | reported | reported |
| Aerial Intakes | aerial-intakes/unranked | unknown | reported | reported | reported | reported |
| Aerial Surge | aerial-surge/unranked | unknown | reported | reported | reported | reported |
| Afterburner Efficiency I | afterburner-efficiency/i | reported | reported | reported | reported | reported |
| Afterburner Efficiency II | afterburner-efficiency/ii | reported | reported | reported | reported | reported |
| Afterburner Efficiency III | afterburner-efficiency/iii | reported | reported | reported | reported | reported |
| Afterburner Efficiency IV | afterburner-efficiency/iv | reported | reported | reported | reported | reported |
| Afterburner Recharger | afterburner-recharger/unranked | unknown | reported | reported | reported | reported |
| Afterburner Reconfiguration | afterburner-reconfiguration/unranked | unknown | reported | reported | reported | reported |
| Afterburner Reconfiguration | afterburner-reconfiguration/afterburner-reconfiguration-2 | unknown | reported | reported | reported | reported |
| Afterburner Thermalizer | afterburner-thermalizer/unranked | unknown | reported | reported | reported | reported |
| Amplifying Regulator | amplifying-regulator/unranked | unknown | reported | reported | reported | reported |
| Antacid Coating | antacid-coating/i | reported | reported | reported | reported | reported |
| Anti-Surge Device | anti-surge-device/unranked | unknown | reported | reported | reported | reported |
| Athermic Alarm | athermic-alarm/unranked | unknown | reported | reported | reported | reported |
| Bleeding-Edge Tech | bleeding-edge-tech/unranked | unknown | reported | reported | unknown | unknown |
| Built for Battle | built-for-battle/unranked | unknown | reported | reported | unknown | unknown |
| Burn Protection | burn-protection/unranked | unknown | reported | reported | reported | reported |
| Burning Contacts | burning-contacts/unranked | unknown | reported | reported | reported | reported |
| Burning Ramjet | burning-ramjet/unranked | unknown | reported | reported | reported | reported |
| Calibrating Landings I | calibrating-landings/i | reported | reported | reported | reported | reported |
| Calibrating Landings II | calibrating-landings/ii | reported | reported | reported | reported | reported |
| Calibrating Landings III | calibrating-landings/iii | reported | reported | reported | reported | reported |
| Charging Coils | charging-coils/unranked | unknown | reported | reported | reported | reported |
| Charging Repulsors I | charging-repulsors/i | reported | reported | reported | reported | reported |
| Charging Repulsors II | charging-repulsors/ii | reported | reported | reported | reported | reported |
| Chassis Cleansing | chassis-cleansing/unranked | unknown | reported | reported | reported | reported |
| Choking Burn | choking-burn/unranked | unknown | reported | reported | reported | reported |
| Coldstart Afterburner | coldstart-afterburner/unranked | unknown | reported | reported | reported | reported |
| Complex Interlocks | complex-interlocks/unranked | unknown | reported | reported | unknown | unknown |
| Coolant Cycler I | coolant-cycler/i | reported | reported | reported | reported | reported |
| Coolant Cycler II | coolant-cycler/ii | reported | reported | reported | reported | reported |
| Coolant Cycler III | coolant-cycler/iii | reported | reported | reported | reported | reported |
| Cooling Actuator I | cooling-actuator/i | reported | reported | reported | reported | reported |
| Cooling Actuator II | cooling-actuator/ii | reported | reported | reported | reported | reported |
| Cooling Actuator III | cooling-actuator/iii | reported | reported | reported | reported | reported |
| Cooling Actuator IV | cooling-actuator/iv | reported | reported | reported | reported | reported |
| Cooling Aerofoils | cooling-aerofoils/unranked | unknown | reported | reported | reported | reported |
| Cooling Dampers I | cooling-dampers/i | reported | reported | reported | reported | reported |
| Cooling Dampers II | cooling-dampers/ii | reported | reported | reported | reported | reported |
| Cooling Dampers III | cooling-dampers/iii | reported | reported | reported | reported | reported |
| Cooling Dampers IV | cooling-dampers/iv | reported | reported | reported | reported | reported |
| Cooling Overcharge | cooling-overcharge/unranked | unknown | reported | reported | reported | reported |
| Cooling Slipstream | cooling-slipstream/unranked | unknown | reported | reported | reported | reported |
| Cooling Surge | cooling-surge/unranked | unknown | reported | reported | reported | reported |
| Corrode Resistance | corrode-resistance/unranked | unknown | reported | reported | reported | reported |
| Corrode Resistance | corrode-resistance/corrode-resistance-2 | unknown | reported | reported | reported | unknown |
| Corrosion Shedding | corrosion-shedding/unranked | unknown | reported | reported | reported | reported |
| Corrosion Vulnerability | corrosion-vulnerability/unranked | unknown | reported | reported | reported | reported |
| Cracked Battery | cracked-battery/unranked | unknown | reported | reported | reported | reported |
| Cracked Fuelpipes | cracked-fuelpipes/unranked | unknown | reported | reported | reported | reported |
| Critical Assist | critical-assist/unranked | unknown | reported | reported | reported | reported |
| Critical Cooling | critical-cooling/unranked | unknown | reported | reported | reported | reported |
| Critical Hope | critical-hope/unranked | unknown | reported | reported | reported | reported |
| Critical Injectors I | critical-injectors/i | reported | reported | reported | reported | reported |
| Critical Injectors II | critical-injectors/ii | reported | reported | reported | reported | reported |
| Critical Shielding | critical-shielding/unranked | unknown | reported | reported | reported | reported |
| Critical Surging | critical-surging/unranked | unknown | reported | reported | reported | reported |
| Dechoking Mechanism | dechoking-mechanism/observed | unknown | reported | reported | reported | reported |
| Defective Alarm | defective-alarm/unranked | unknown | reported | reported | reported | reported |
| Defensive Start | defensive-start/unranked | unknown | reported | reported | reported | reported |
| Degraded Dampers | degraded-dampers/unranked | unknown | reported | reported | reported | reported |
| Depleted Shielding | depleted-shielding/observed | unknown | reported | reported | reported | reported |
| Disregulated Heating | disregulated-heating/unranked | unknown | reported | reported | reported | reported |
| Disrupted Fuel | disrupted-fuel/unranked | unknown | reported | reported | reported | reported |
| Disruption Protection | disruption-protection/unranked | unknown | reported | reported | reported | reported |
| Dissipative Plating I | dissipative-plating/i | reported | reported | reported | reported | reported |
| Dissipative Plating II | dissipative-plating/ii | reported | reported | reported | reported | reported |
| Dissipative Plating III | dissipative-plating/iii | reported | reported | reported | reported | reported |
| Double Control Surfaces | double-control-surfaces/unranked | unknown | reported | reported | unknown | unknown |
| Draggy Control Surfaces | draggy-control-surfaces/unranked | unknown | reported | reported | unknown | unknown |
| Dud Battery | dud-battery/unranked | unknown | reported | reported | reported | reported |
| Emergency Cooling | emergency-cooling/unranked | unknown | reported | reported | reported | reported |
| Endothermic Repulsors | endothermic-repulsors/unranked | unknown | reported | reported | reported | reported |
| Energy Surplus | energy-surplus/unranked | unknown | reported | reported | unknown | unknown |
| Enhanced Coolant I | enhanced-coolant/i | reported | reported | reported | reported | reported |
| Enhanced Coolant II | enhanced-coolant/ii | reported | reported | reported | reported | reported |
| Enhanced Coolant III | enhanced-coolant/iii | reported | reported | reported | reported | reported |
| Enhanced Coolant IV | enhanced-coolant/iv | reported | reported | reported | reported | reported |
| Enriched Fuel I | enriched-fuel/i | reported | reported | reported | reported | reported |
| Enriched Fuel II | enriched-fuel/ii | reported | reported | reported | reported | reported |
| Enriched Fuel III | enriched-fuel/iii | reported | reported | reported | reported | reported |
| Enriched Fuel IV | enriched-fuel/iv | reported | reported | reported | reported | reported |
| Enriched Fuel IV | enriched-fuel/enriched-fuel-iv-2 | reported | reported | reported | reported | reported |
| Enriching Siphon | enriching-siphon/unranked | unknown | reported | reported | reported | reported |
| Expanding Fueltank | expanding-fueltank/unranked | unknown | reported | reported | reported | reported |
| Explosive Burning | explosive-burning/unranked | unknown | reported | reported | reported | reported |
| Exposed Servos | exposed-servos/unranked | unknown | reported | reported | reported | reported |
| Extended Alarm I | extended-alarm/i | reported | reported | reported | reported | reported |
| Extended Alarm II | extended-alarm/ii | reported | reported | reported | reported | reported |
| Extended Alarm III | extended-alarm/iii | reported | reported | reported | reported | reported |
| Extended Alarm IV | extended-alarm/iv | reported | reported | reported | reported | reported |
| Extended Cooling I | extended-cooling/i | reported | reported | reported | reported | reported |
| Extended Cooling II | extended-cooling/ii | reported | reported | reported | reported | reported |
| Extended Cooling III | extended-cooling/iii | reported | reported | reported | reported | reported |
| Failsafe Coolant | failsafe-coolant/unranked | unknown | reported | reported | reported | reported |
| Faster Attachments I | faster-attachments/i | reported | reported | reported | reported | reported |
| Faster Attachments II | faster-attachments/ii | reported | reported | reported | reported | reported |
| Faster Attachments III | faster-attachments/iii | reported | reported | reported | reported | reported |
| Faster Attachments IV | faster-attachments/iv | reported | reported | reported | reported | reported |
| Faulty Abilities | faulty-abilities/i | reported | reported | reported | reported | unknown |
| Faulty Activator | faulty-activator/unranked | unknown | reported | reported | reported | reported |
| Faulty Failsafe | faulty-failsafe/unranked | unknown | reported | reported | reported | reported |
| Flammable Manifold | flammable-manifold/unranked | unknown | reported | reported | reported | reported |
| Fractured Abilities | fractured-abilities/unranked | unknown | reported | reported | reported | unknown |
| Fragile Subsystems | fragile-subsystems/unranked | unknown | reported | reported | reported | reported |
| Freeze Resistance I | freeze-resistance/i | reported | reported | reported | reported | reported |
| Freeze Resistance II | freeze-resistance/ii | reported | reported | reported | reported | reported |
| Freeze Shedding | freeze-shedding/unranked | unknown | reported | reported | reported | reported |
| Freeze Vulnerability | freeze-vulnerability/ii | reported | reported | reported | reported | reported |
| Frost Protection | frost-protection/unranked | unknown | reported | reported | reported | reported |
| Frosted Aerofoils | frosted-aerofoils/unranked | unknown | reported | reported | reported | reported |
| Frosted Injectors | frosted-injectors/unranked | unknown | reported | reported | reported | reported |
| Frozen Finesse | frozen-finesse/unranked | unknown | reported | reported | reported | reported |
| Fuel Agitator I | fuel-agitator/i | reported | reported | reported | reported | reported |
| Fuel Agitator II | fuel-agitator/ii | reported | reported | reported | reported | reported |
| Fuel Agitator III | fuel-agitator/iii | reported | reported | reported | reported | reported |
| Fuel Agitator IV | fuel-agitator/iv | reported | reported | reported | reported | reported |
| Fuel Coolant I | fuel-coolant/i | reported | reported | reported | reported | reported |
| Fuel Coolant II | fuel-coolant/ii | reported | reported | reported | reported | reported |
| Fuel Coolant III | fuel-coolant/iii | reported | reported | reported | reported | reported |
| Fuel Coolant IV | fuel-coolant/iv | reported | reported | reported | reported | reported |
| Fuel Synthesis | fuel-synthesis/unranked | unknown | reported | reported | reported | reported |
| Fuel Vortexer I | fuel-vortexer/i | reported | reported | reported | reported | reported |
| Fuel Vortexer II | fuel-vortexer/ii | reported | reported | reported | reported | reported |
| Fuel Vortexer III | fuel-vortexer/iii | reported | reported | reported | reported | reported |
| Fuel Vortexer IV | fuel-vortexer/iv | reported | reported | reported | reported | reported |
| Glitched Fuel | glitched-fuel/unranked | unknown | reported | reported | reported | reported |
| Hail-Mary Reset I | hail-mary-reset/i | reported | reported | reported | reported | reported |
| Hail-Mary Reset II | hail-mary-reset/ii | reported | reported | reported | reported | reported |
| Hail-Mary Reset III | hail-mary-reset/iii | reported | reported | reported | reported | reported |
| Heat Reduction I | heat-reduction/i | reported | reported | reported | reported | reported |
| Heat Reduction II | heat-reduction/ii | reported | reported | reported | reported | reported |
| Heat Reduction III | heat-reduction/iii | reported | reported | reported | reported | reported |
| Heat Reduction IV | heat-reduction/iv | reported | reported | reported | reported | reported |
| Heated Fuel I | heated-fuel/i | reported | reported | reported | reported | reported |
| Heated Fuel II | heated-fuel/ii | reported | reported | reported | reported | reported |
| Heated Fuel III | heated-fuel/iii | reported | reported | reported | reported | reported |
| Heated Fuel IV | heated-fuel/iv | reported | reported | reported | reported | reported |
| Iced Fuel | iced-fuel/unranked | unknown | reported | reported | reported | reported |
| Iced Ignition | iced-ignition/unranked | unknown | reported | reported | reported | reported |
| Ignited Fuel | ignited-fuel/unranked | unknown | reported | reported | reported | reported |
| Impact Regulator I | impact-regulator/i | reported | reported | reported | reported | reported |
| Impact Regulator II | impact-regulator/ii | reported | reported | reported | reported | reported |
| Impact Regulator III | impact-regulator/iii | reported | reported | reported | reported | reported |
| Imprecise Calibration | imprecise-calibration/unranked | unknown | reported | reported | reported | reported |
| Improved Drafting | improved-drafting/unranked | unknown | reported | reported | reported | reported |
| Improved Regulators I | improved-regulators/i | reported | reported | reported | reported | reported |
| Improved Regulators II | improved-regulators/ii | reported | reported | reported | reported | reported |
| Improved Regulators II | improved-regulators/improved-regulators-ii-2 | reported | reported | reported | reported | unknown |
| Improved Regulators III | improved-regulators/iii | reported | reported | reported | reported | reported |
| Improved Regulators IV | improved-regulators/iv | reported | reported | reported | reported | reported |
| Incendiary Overcharge | incendiary-overcharge/unranked | unknown | reported | reported | reported | reported |
| Inefficient Aerodynamics | inefficient-aerodynamics/unranked | unknown | reported | reported | reported | reported |
| Inertial Shield | inertial-shield/unranked | unknown | reported | reported | reported | reported |
| Insulated Servos I | insulated-servos/i | reported | reported | reported | reported | reported |
| Insulated Servos II | insulated-servos/ii | reported | reported | reported | reported | reported |
| Insulated Servos III | insulated-servos/iii | reported | reported | reported | reported | reported |
| Jolted Boost I | jolted-boost/i | reported | reported | reported | reported | reported |
| Jolted Boost II | jolted-boost/ii | reported | reported | reported | reported | reported |
| Jolted Boost III | jolted-boost/iii | reported | reported | reported | reported | reported |
| Kinetic Energizer I | kinetic-energizer/i | reported | reported | reported | reported | reported |
| Kinetic Energizer II | kinetic-energizer/ii | reported | reported | reported | reported | reported |
| Kinetic Refueler I | kinetic-refueler/i | reported | reported | reported | reported | reported |
| Kinetic Refueler II | kinetic-refueler/ii | reported | reported | reported | reported | reported |
| Kinetic Refueler III | kinetic-refueler/iii | reported | reported | reported | reported | reported |
| Large Cross-Section | large-cross-section/unranked | unknown | reported | reported | unknown | unknown |
| Leaky Tank | leaky-tank/unranked | unknown | reported | reported | reported | reported |
| Lethal Velocity I | lethal-velocity/i | reported | reported | reported | reported | reported |
| Lethal Velocity II | lethal-velocity/ii | reported | reported | reported | reported | reported |
| Lethal Velocity III | lethal-velocity/iii | reported | reported | reported | reported | reported |
| Lethal Velocity IV | lethal-velocity/iv | reported | reported | reported | reported | reported |
| Lingering Frost | lingering-frost/unranked | unknown | reported | reported | reported | reported |
| Massive Momentum | massive-momentum/unranked | unknown | reported | reported | unknown | unknown |
| Old Dog, Old Tricks | old-dog-old-tricks/unranked | unknown | reported | reported | unknown | unknown |
| Only Human | only-human/unranked | unknown | reported | reported | reported | unknown |
| Optimized Fuel I | optimized-fuel/i | reported | reported | reported | reported | reported |
| Optimized Fuel II | optimized-fuel/ii | reported | reported | reported | reported | reported |
| Optimized Fuel III | optimized-fuel/iii | reported | reported | reported | reported | reported |
| Optimized Fuel IV | optimized-fuel/iv | reported | reported | reported | reported | reported |
| Optimized Inlets I | optimized-inlets/i | reported | reported | reported | reported | reported |
| Optimized Inlets II | optimized-inlets/ii | reported | reported | reported | reported | reported |
| Optimized Inlets III | optimized-inlets/iii | reported | reported | reported | reported | reported |
| Optimized Nozzles | optimized-nozzles/unranked | unknown | reported | reported | unknown | unknown |
| Optimized Radiators I | optimized-radiators/i | reported | reported | reported | reported | reported |
| Optimized Radiators II | optimized-radiators/ii | reported | reported | reported | reported | reported |
| Optimized Radiators III | optimized-radiators/iii | reported | reported | reported | reported | reported |
| Optimized Surge I | optimized-surge/i | reported | reported | reported | reported | reported |
| Optimized Surge II | optimized-surge/ii | reported | reported | reported | reported | reported |
| Optimized Surge III | optimized-surge/iii | reported | reported | reported | reported | reported |
| Overbuilt Engines | overbuilt-engines/unranked | unknown | reported | reported | unknown | unknown |
| Overcharged Injector | overcharged-injector/unranked | unknown | reported | reported | reported | reported |
| Overcharged Supercharger | overcharged-supercharger/unranked | unknown | reported | reported | reported | reported |
| Overcharged Systems | overcharged-systems/unranked | unknown | reported | reported | reported | reported |
| Overcharging Afterburner | overcharging-afterburner/observed | unknown | reported | reported | reported | reported |
| Overcharging Propellant | overcharging-propellant/unranked | unknown | reported | reported | reported | reported |
| Overflow Shielding I | overflow-shielding/i | reported | reported | reported | reported | reported |
| Overflow Shielding II | overflow-shielding/ii | reported | reported | reported | reported | reported |
| Overflow Shielding III | overflow-shielding/iii | reported | reported | reported | reported | reported |
| Overheat Loop I | overheat-loop/i | reported | reported | reported | reported | reported |
| Overheat Loop II | overheat-loop/ii | reported | reported | reported | reported | reported |
| Overheat Loop III | overheat-loop/iii | reported | reported | reported | reported | reported |
| Overheated Motivators | overheated-motivators/unranked | unknown | reported | reported | reported | reported |
| Particulate Filter | particulate-filter/unranked | unknown | reported | reported | reported | reported |
| Phase-change Radiators I | phase-change-radiators/i | reported | reported | reported | reported | reported |
| Phase-change Radiators II | phase-change-radiators/ii | reported | reported | reported | reported | reported |
| Phase-change Radiators III | phase-change-radiators/iii | reported | reported | reported | reported | reported |
| Plug-F Power Cell | plug-f-power-cell/unranked | unknown | reported | reported | unknown | unknown |
| Polished Inlets | polished-inlets/unranked | unknown | reported | reported | reported | reported |
| Power Cascade I | power-cascade/i | reported | reported | reported | reported | reported |
| Power Cascade II | power-cascade/ii | reported | reported | reported | reported | reported |
| Power Cascade III | power-cascade/iii | reported | reported | reported | reported | reported |
| Protective Ignition I | protective-ignition/i | reported | reported | reported | reported | reported |
| Protective Ignition II | protective-ignition/ii | reported | reported | reported | reported | reported |
| Protective Ignition III | protective-ignition/iii | reported | reported | reported | reported | reported |
| Protective Overcharge | protective-overcharge/unranked | unknown | reported | reported | reported | reported |
| Purging Surge | purging-surge/unranked | unknown | reported | reported | reported | reported |
| Pyrophoric Surfaces | pyrophoric-surfaces/unranked | unknown | reported | reported | reported | reported |
| Ramjet Accelerator I | ramjet-accelerator/i | reported | reported | reported | reported | reported |
| Ramjet Accelerator II | ramjet-accelerator/ii | reported | reported | reported | reported | reported |
| Ramjet Accelerator III | ramjet-accelerator/iii | reported | reported | reported | reported | reported |
| Ramjet Accelerator IV | ramjet-accelerator/iv | reported | reported | reported | reported | reported |
| Ramjet Cooling I | ramjet-cooling/i | reported | reported | reported | reported | reported |
| Ramjet Cooling II | ramjet-cooling/ii | reported | reported | reported | reported | reported |
| Ramjet Cooling III | ramjet-cooling/iii | reported | reported | reported | reported | reported |
| Ramjet Cooling IV | ramjet-cooling/iv | reported | reported | reported | reported | reported |
| Ramjet Power I | ramjet-power/i | reported | reported | reported | reported | reported |
| Ramjet Power II | ramjet-power/ii | reported | reported | reported | reported | reported |
| Ramjet Power III | ramjet-power/iii | reported | reported | reported | reported | reported |
| Ramjet Power IV | ramjet-power/iv | reported | reported | reported | reported | reported |
| Ramjet Reconfiguration | ramjet-reconfiguration/unranked | unknown | reported | reported | reported | reported |
| Ramming Jet I | ramming-jet/i | reported | reported | reported | reported | reported |
| Ramming Jet II | ramming-jet/ii | reported | reported | reported | reported | reported |
| Ramming Jet III | ramming-jet/iii | reported | reported | reported | reported | reported |
| Reconstituted Fuel I | reconstituted-fuel/i | reported | reported | reported | reported | reported |
| Reconstituted Fuel II | reconstituted-fuel/ii | reported | reported | reported | reported | reported |
| Reconstituted Fuel III | reconstituted-fuel/iii | reported | reported | reported | reported | reported |
| Recovery Coolant | recovery-coolant/unranked | unknown | reported | reported | reported | reported |
| Recovery Shield | recovery-shield/unranked | unknown | reported | reported | reported | reported |
| Recovery Surge | recovery-surge/unranked | unknown | reported | reported | reported | reported |
| Redline Purge | redline-purge/unranked | unknown | reported | reported | reported | reported |
| Redlining Power | redlining-power/unranked | unknown | reported | reported | reported | reported |
| Refueling Abilities | refueling-abilities/unranked | unknown | reported | reported | reported | reported |
| Release Actuators | release-actuators/unranked | unknown | reported | reported | reported | reported |
| Reload Surge | reload-surge/unranked | unknown | reported | reported | reported | reported |
| Repulsor Surplus | repulsor-surplus/unranked | unknown | reported | reported | reported | reported |
| Repulsormod I | repulsormod/i | reported | reported | reported | reported | reported |
| Repulsormod II | repulsormod/ii | reported | reported | reported | reported | reported |
| Repulsormod III | repulsormod/iii | reported | reported | reported | reported | reported |
| Repulsormod IV | repulsormod/iv | reported | reported | reported | reported | reported |
| Residual Afterburner | residual-afterburner/unranked | unknown | reported | reported | reported | reported |
| Robust Surge | robust-surge/unranked | unknown | reported | reported | reported | reported |
| Scrap Reclaimer | scrap-reclaimer/unranked | unknown | reported | reported | reported | reported |
| Scrap Recycler I | scrap-recycler/i | reported | reported | reported | reported | reported |
| Scrap Recycler II | scrap-recycler/ii | reported | reported | reported | reported | reported |
| Scrap Recycler III | scrap-recycler/iii | reported | reported | reported | reported | reported |
| Scrap Recycler IV | scrap-recycler/iv | reported | reported | reported | reported | reported |
| Scrap Reloader | scrap-reloader/unranked | unknown | reported | reported | reported | reported |
| Shield Cycler I | shield-cycler/i | reported | reported | reported | reported | reported |
| Shield Cycler II | shield-cycler/ii | reported | reported | reported | reported | reported |
| Shielding Fuel | shielding-fuel/unranked | unknown | reported | reported | reported | reported |
| Shielding Lead | shielding-lead/unranked | unknown | reported | reported | reported | reported |
| Shielding Ramjet | shielding-ramjet/unranked | unknown | reported | reported | reported | reported |
| Shielding Repulsor I | shielding-repulsor/i | reported | reported | reported | reported | reported |
| Shielding Repulsor II | shielding-repulsor/ii | reported | reported | reported | reported | reported |
| Shielding Repulsor III | shielding-repulsor/iii | reported | reported | reported | reported | reported |
| Shielding Surge | shielding-surge/unranked | unknown | reported | reported | reported | reported |
| Slipstream Intakes | slipstream-intakes/unranked | unknown | reported | reported | reported | reported |
| Small Thrusters | small-thrusters/unranked | unknown | reported | reported | unknown | unknown |
| Spark Plugs I | spark-plugs/i | reported | reported | reported | reported | reported |
| Spark Plugs II | spark-plugs/ii | reported | reported | reported | reported | reported |
| Spark Plugs III | spark-plugs/iii | reported | reported | reported | reported | reported |
| Spark Plugs IV | spark-plugs/iv | reported | reported | reported | reported | reported |
| Startup Malfunction | startup-malfunction/unranked | unknown | reported | reported | reported | reported |
| Steering Malfunction | steering-malfunction/unranked | unknown | reported | reported | reported | reported |
| Strained Circuits | strained-circuits/unranked | unknown | reported | reported | reported | reported |
| Strategic Ablation | strategic-ablation/unranked | unknown | reported | reported | reported | reported |
| Subzero Cooling | subzero-cooling/unranked | unknown | reported | reported | reported | reported |
| Superconducting Ramjet | superconducting-ramjet/unranked | unknown | reported | reported | reported | reported |
| Supercooled Attachments | supercooled-attachments/unranked | unknown | reported | reported | reported | reported |
| Surging Alarm I | surging-alarm/i | reported | reported | reported | reported | reported |
| Surging Alarm II | surging-alarm/ii | reported | reported | reported | reported | reported |
| Surging Alarm III | surging-alarm/iii | reported | reported | reported | reported | reported |
| Surging Fuel | surging-fuel/unranked | unknown | reported | reported | reported | reported |
| Surging Inlets I | surging-inlets/i | reported | reported | reported | reported | reported |
| Surging Inlets II | surging-inlets/ii | reported | reported | reported | reported | reported |
| Surging Inlets III | surging-inlets/iii | reported | reported | reported | reported | reported |
| Surplus Cooling | surplus-cooling/unranked | unknown | reported | reported | reported | reported |
| Surplus Surging | surplus-surging/unranked | unknown | reported | reported | reported | reported |
| System Degausser I | system-degausser/i | reported | reported | reported | reported | reported |
| System Degausser II | system-degausser/ii | reported | reported | reported | reported | reported |
| System Fragmentation | system-fragmentation/unranked | unknown | reported | reported | reported | reported |
| System Surge | system-surge/unranked | unknown | reported | reported | reported | reported |
| Systematic Servicing | systematic-servicing/unranked | unknown | reported | reported | reported | reported |
| Thermal Inverter | thermal-inverter/unranked | unknown | reported | reported | reported | reported |
| Thermal Loop | thermal-loop/ii | reported | reported | reported | reported | reported |
| Thermoactive Fuel | thermoactive-fuel/unranked | unknown | reported | reported | reported | reported |
| Thermocycling Dampers I | thermocycling-dampers/i | reported | reported | reported | reported | reported |
| Thermocycling Dampers II | thermocycling-dampers/ii | reported | reported | reported | reported | reported |
| Thermophilic Fuel I | thermophilic-fuel/i | reported | reported | reported | reported | reported |
| Thermophilic Fuel II | thermophilic-fuel/ii | reported | reported | reported | reported | reported |
| Thermophilic Fuel III | thermophilic-fuel/iii | reported | reported | reported | reported | reported |
| Uncapped Cooling | uncapped-cooling/unranked | unknown | reported | reported | reported | reported |
| Underbody Intakes I | underbody-intakes/i | reported | reported | reported | reported | reported |
| Underbody Intakes II | underbody-intakes/ii | reported | reported | reported | reported | reported |
| Underbody Intakes III | underbody-intakes/iii | reported | reported | reported | reported | reported |
| Underclocking Device | underclocking-device/unranked | unknown | reported | reported | reported | reported |
| Unquenchable Components | unquenchable-components/unranked | unknown | reported | reported | reported | reported |
| Unreliable Afterburner | unreliable-afterburner/unranked | unknown | reported | reported | reported | reported |
| Unsettled Start | unsettled-start/unranked | unknown | reported | reported | reported | reported |
| Unstable Plating | unstable-plating/unranked | unknown | reported | reported | reported | reported |
| Volatile Battery | volatile-battery/unranked | unknown | reported | reported | reported | reported |
| Volatile Fuel | volatile-fuel/unranked | unknown | reported | reported | reported | reported |
| Weak Ramjet | weak-ramjet/ii | reported | reported | reported | reported | reported |
| Weakened Cockpit | weakened-cockpit/unranked | unknown | reported | reported | reported | reported |

## Explicit price and unlock evidence

These are page-local values, not rarity-derived constants. Faulty page prices are displayed prices; no purchase-versus-clearing interpretation is inferred.

| Detail URL | Price credits | Unlock wording |
| --- | --- | --- |
| https://galacticracer.gameslantern.com/vehicle-parts/ability-catalyst | 2500 | Complete 25 events. |
| https://galacticracer.gameslantern.com/vehicle-parts/acid-battery | 2500 | Complete 91 events. |
| https://galacticracer.gameslantern.com/vehicle-parts/acidic-fuel | 250 | Start the Campaign. |
| https://galacticracer.gameslantern.com/vehicle-parts/acrid-alarm | 250 | Start the Campaign. |
| https://galacticracer.gameslantern.com/vehicle-parts/aerial-intakes | 2000 | Start the Campaign. |
| https://galacticracer.gameslantern.com/vehicle-parts/aerial-surge | 2500 | Complete 12 events. |
| https://galacticracer.gameslantern.com/vehicle-parts/afterburner-efficiency-i | 2000 | Start the Campaign. |
| https://galacticracer.gameslantern.com/vehicle-parts/afterburner-efficiency-ii | 2500 | Start the Campaign. |
| https://galacticracer.gameslantern.com/vehicle-parts/afterburner-efficiency-iii | 3000 | Complete 16 events. |
| https://galacticracer.gameslantern.com/vehicle-parts/afterburner-efficiency-iv | 4000 | Complete 65 events. |
| https://galacticracer.gameslantern.com/vehicle-parts/afterburner-recharger | 2000 | Start the Campaign. |
| https://galacticracer.gameslantern.com/vehicle-parts/afterburner-reconfiguration | 3000 | Complete 75 events. |
| https://galacticracer.gameslantern.com/vehicle-parts/afterburner-reconfiguration-2 | 3000 | Complete 45 events. |
| https://galacticracer.gameslantern.com/vehicle-parts/afterburner-thermalizer | 2500 | Complete 97 events. |
| https://galacticracer.gameslantern.com/vehicle-parts/amplifying-regulator | 2500 | Complete 85 events. |
| https://galacticracer.gameslantern.com/vehicle-parts/antacid-coating | 2500 | Complete 103 events. |
| https://galacticracer.gameslantern.com/vehicle-parts/anti-surge-device | 250 | Start the Campaign. |
| https://galacticracer.gameslantern.com/vehicle-parts/athermic-alarm | 250 | Start the Campaign. |
| https://galacticracer.gameslantern.com/vehicle-parts/bleeding-edge-tech | unknown | unknown |
| https://galacticracer.gameslantern.com/vehicle-parts/built-for-battle | unknown | unknown |
| https://galacticracer.gameslantern.com/vehicle-parts/burn-protection | 3000 | Complete 45 events. |
| https://galacticracer.gameslantern.com/vehicle-parts/burning-contacts | 250 | Start the Campaign. |
| https://galacticracer.gameslantern.com/vehicle-parts/burning-ramjet | 3000 | Complete 80 events. |
| https://galacticracer.gameslantern.com/vehicle-parts/calibrating-landings-i | 2500 | Complete 35 events. |
| https://galacticracer.gameslantern.com/vehicle-parts/calibrating-landings-ii | 3000 | Complete 55 events. |
| https://galacticracer.gameslantern.com/vehicle-parts/calibrating-landings-iii | 4000 | Complete 75 events. |
| https://galacticracer.gameslantern.com/vehicle-parts/charging-coils | 2500 | Complete 16 events. |
| https://galacticracer.gameslantern.com/vehicle-parts/charging-repulsors-i | 2500 | Complete 55 events. |
| https://galacticracer.gameslantern.com/vehicle-parts/charging-repulsors-ii | 3000 | Complete 80 events. |
| https://galacticracer.gameslantern.com/vehicle-parts/chassis-cleansing | 4000 | Complete 109 events. |
| https://galacticracer.gameslantern.com/vehicle-parts/choking-burn | 250 | Start the Campaign. |
| https://galacticracer.gameslantern.com/vehicle-parts/coldstart-afterburner | 250 | Start the Campaign. |
| https://galacticracer.gameslantern.com/vehicle-parts/complex-interlocks | unknown | unknown |
| https://galacticracer.gameslantern.com/vehicle-parts/coolant-cycler-i | 2500 | Complete 4 events. |
| https://galacticracer.gameslantern.com/vehicle-parts/coolant-cycler-ii | 3000 | Complete 25 events. |
| https://galacticracer.gameslantern.com/vehicle-parts/coolant-cycler-iii | 4000 | Complete 70 events. |
| https://galacticracer.gameslantern.com/vehicle-parts/cooling-actuator-i | 2000 | Complete 8 events. |
| https://galacticracer.gameslantern.com/vehicle-parts/cooling-actuator-ii | 2500 | Complete 8 events. |
| https://galacticracer.gameslantern.com/vehicle-parts/cooling-actuator-iii | 3000 | Complete 35 events. |
| https://galacticracer.gameslantern.com/vehicle-parts/cooling-actuator-iv | 4000 | Complete 70 events. |
| https://galacticracer.gameslantern.com/vehicle-parts/cooling-aerofoils | 2000 | Start the Campaign. |
| https://galacticracer.gameslantern.com/vehicle-parts/cooling-dampers-i | 2000 | Complete 12 events. |
| https://galacticracer.gameslantern.com/vehicle-parts/cooling-dampers-ii | 2500 | Complete 12 events. |
| https://galacticracer.gameslantern.com/vehicle-parts/cooling-dampers-iii | 3000 | Complete 60 events. |
| https://galacticracer.gameslantern.com/vehicle-parts/cooling-dampers-iv | 4000 | Complete 103 events. |
| https://galacticracer.gameslantern.com/vehicle-parts/cooling-overcharge | 4000 | Complete 65 events. |
| https://galacticracer.gameslantern.com/vehicle-parts/cooling-slipstream | 4000 | Complete 35 events. |
| https://galacticracer.gameslantern.com/vehicle-parts/cooling-surge | 3000 | Complete 55 events. |
| https://galacticracer.gameslantern.com/vehicle-parts/corrode-resistance | 2500 | Complete 40 events. |
| https://galacticracer.gameslantern.com/vehicle-parts/corrode-resistance-2 | 4000 | unknown |
| https://galacticracer.gameslantern.com/vehicle-parts/corrosion-shedding | 2500 | Complete 65 events. |
| https://galacticracer.gameslantern.com/vehicle-parts/corrosion-vulnerability | 250 | Start the Campaign. |
| https://galacticracer.gameslantern.com/vehicle-parts/cracked-battery | 250 | Start the Campaign. |
| https://galacticracer.gameslantern.com/vehicle-parts/cracked-fuelpipes | 250 | Start the Campaign. |
| https://galacticracer.gameslantern.com/vehicle-parts/critical-assist | 2500 | Complete 30 events. |
| https://galacticracer.gameslantern.com/vehicle-parts/critical-cooling | 2500 | Complete 16 events. |
| https://galacticracer.gameslantern.com/vehicle-parts/critical-hope | 4000 | Complete 115 events. |
| https://galacticracer.gameslantern.com/vehicle-parts/critical-injectors-i | 2500 | Complete 60 events. |
| https://galacticracer.gameslantern.com/vehicle-parts/critical-injectors-ii | 3000 | Complete 85 events. |
| https://galacticracer.gameslantern.com/vehicle-parts/critical-shielding | 2500 | Complete 20 events. |
| https://galacticracer.gameslantern.com/vehicle-parts/critical-surging | 2500 | Complete 75 events. |
| https://galacticracer.gameslantern.com/vehicle-parts/dechoking-mechanism | 2000 | Complete 50 events. |
| https://galacticracer.gameslantern.com/vehicle-parts/defective-alarm | 250 | Start the Campaign. |
| https://galacticracer.gameslantern.com/vehicle-parts/defensive-start | 2000 | Start the Campaign. |
| https://galacticracer.gameslantern.com/vehicle-parts/degraded-dampers | 250 | Start the Campaign. |
| https://galacticracer.gameslantern.com/vehicle-parts/depleted-shielding | 2500 | Start the Campaign. |
| https://galacticracer.gameslantern.com/vehicle-parts/disregulated-heating | 250 | Start the Campaign. |
| https://galacticracer.gameslantern.com/vehicle-parts/disrupted-fuel | 250 | Start the Campaign. |
| https://galacticracer.gameslantern.com/vehicle-parts/disruption-protection | 4000 | Complete 8 events. |
| https://galacticracer.gameslantern.com/vehicle-parts/dissipative-plating-i | 2000 | Complete 30 events. |
| https://galacticracer.gameslantern.com/vehicle-parts/dissipative-plating-ii | 2500 | Complete 30 events. |
| https://galacticracer.gameslantern.com/vehicle-parts/dissipative-plating-iii | 3000 | Complete 75 events. |
| https://galacticracer.gameslantern.com/vehicle-parts/double-control-surfaces | unknown | unknown |
| https://galacticracer.gameslantern.com/vehicle-parts/draggy-control-surfaces | unknown | unknown |
| https://galacticracer.gameslantern.com/vehicle-parts/dud-battery | 250 | Start the Campaign. |
| https://galacticracer.gameslantern.com/vehicle-parts/emergency-cooling | 2500 | Complete 35 events. |
| https://galacticracer.gameslantern.com/vehicle-parts/endothermic-repulsors | 250 | Start the Campaign. |
| https://galacticracer.gameslantern.com/vehicle-parts/energy-surplus | unknown | unknown |
| https://galacticracer.gameslantern.com/vehicle-parts/enhanced-coolant-i | 2000 | Complete 12 events. |
| https://galacticracer.gameslantern.com/vehicle-parts/enhanced-coolant-ii | 2500 | Complete 12 events. |
| https://galacticracer.gameslantern.com/vehicle-parts/enhanced-coolant-iii | 3000 | Complete 45 events. |
| https://galacticracer.gameslantern.com/vehicle-parts/enhanced-coolant-iv | 4000 | Complete 80 events. |
| https://galacticracer.gameslantern.com/vehicle-parts/enriched-fuel-i | 2000 | Start the Campaign. |
| https://galacticracer.gameslantern.com/vehicle-parts/enriched-fuel-ii | 2500 | Start the Campaign. |
| https://galacticracer.gameslantern.com/vehicle-parts/enriched-fuel-iii | 3000 | Complete 20 events. |
| https://galacticracer.gameslantern.com/vehicle-parts/enriched-fuel-iv | 4000 | Complete 91 events. |
| https://galacticracer.gameslantern.com/vehicle-parts/enriched-fuel-iv-2 | 4000 | Complete 91 events. |
| https://galacticracer.gameslantern.com/vehicle-parts/enriching-siphon | 3000 | Complete 109 events. |
| https://galacticracer.gameslantern.com/vehicle-parts/expanding-fueltank | 3000 | Complete 8 events. |
| https://galacticracer.gameslantern.com/vehicle-parts/explosive-burning | 250 | Start the Campaign. |
| https://galacticracer.gameslantern.com/vehicle-parts/exposed-servos | 250 | Start the Campaign. |
| https://galacticracer.gameslantern.com/vehicle-parts/extended-alarm-i | 2000 | Start the Campaign. |
| https://galacticracer.gameslantern.com/vehicle-parts/extended-alarm-ii | 2500 | Start the Campaign. |
| https://galacticracer.gameslantern.com/vehicle-parts/extended-alarm-iii | 3000 | Complete 35 events. |
| https://galacticracer.gameslantern.com/vehicle-parts/extended-alarm-iv | 4000 | Complete 115 events. |
| https://galacticracer.gameslantern.com/vehicle-parts/extended-cooling-i | 2500 | Complete 12 events. |
| https://galacticracer.gameslantern.com/vehicle-parts/extended-cooling-ii | 3000 | Complete 50 events. |
| https://galacticracer.gameslantern.com/vehicle-parts/extended-cooling-iii | 4000 | Complete 97 events. |
| https://galacticracer.gameslantern.com/vehicle-parts/failsafe-coolant | 250 | Start the Campaign. |
| https://galacticracer.gameslantern.com/vehicle-parts/faster-attachments-i | 2000 | Start the Campaign. |
| https://galacticracer.gameslantern.com/vehicle-parts/faster-attachments-ii | 2500 | Start the Campaign. |
| https://galacticracer.gameslantern.com/vehicle-parts/faster-attachments-iii | 3000 | Complete 20 events. |
| https://galacticracer.gameslantern.com/vehicle-parts/faster-attachments-iv | 4000 | Complete 75 events. |
| https://galacticracer.gameslantern.com/vehicle-parts/faulty-abilities | 250 | unknown |
| https://galacticracer.gameslantern.com/vehicle-parts/faulty-activator | 250 | Start the Campaign. |
| https://galacticracer.gameslantern.com/vehicle-parts/faulty-failsafe | 250 | Start the Campaign. |
| https://galacticracer.gameslantern.com/vehicle-parts/flammable-manifold | 250 | Start the Campaign. |
| https://galacticracer.gameslantern.com/vehicle-parts/fractured-abilities | 250 | unknown |
| https://galacticracer.gameslantern.com/vehicle-parts/fragile-subsystems | 250 | Start the Campaign. |
| https://galacticracer.gameslantern.com/vehicle-parts/freeze-resistance-i | 2000 | Complete 35 events. |
| https://galacticracer.gameslantern.com/vehicle-parts/freeze-resistance-ii | 2500 | Complete 35 events. |
| https://galacticracer.gameslantern.com/vehicle-parts/freeze-shedding | 2500 | Complete 70 events. |
| https://galacticracer.gameslantern.com/vehicle-parts/freeze-vulnerability | 250 | Start the Campaign. |
| https://galacticracer.gameslantern.com/vehicle-parts/frost-protection | 2500 | Complete 65 events. |
| https://galacticracer.gameslantern.com/vehicle-parts/frosted-aerofoils | 250 | Start the Campaign. |
| https://galacticracer.gameslantern.com/vehicle-parts/frosted-injectors | 250 | Start the Campaign. |
| https://galacticracer.gameslantern.com/vehicle-parts/frozen-finesse | 3000 | Complete 70 events. |
| https://galacticracer.gameslantern.com/vehicle-parts/fuel-agitator-i | 2000 | Complete 8 events. |
| https://galacticracer.gameslantern.com/vehicle-parts/fuel-agitator-ii | 2500 | Complete 8 events. |
| https://galacticracer.gameslantern.com/vehicle-parts/fuel-agitator-iii | 3000 | Complete 25 events. |
| https://galacticracer.gameslantern.com/vehicle-parts/fuel-agitator-iv | 4000 | Complete 40 events. |
| https://galacticracer.gameslantern.com/vehicle-parts/fuel-coolant-i | 2000 | Complete 16 events. |
| https://galacticracer.gameslantern.com/vehicle-parts/fuel-coolant-ii | 2500 | Complete 16 events. |
| https://galacticracer.gameslantern.com/vehicle-parts/fuel-coolant-iii | 3000 | Complete 80 events. |
| https://galacticracer.gameslantern.com/vehicle-parts/fuel-coolant-iv | 4000 | Complete 103 events. |
| https://galacticracer.gameslantern.com/vehicle-parts/fuel-synthesis | 2500 | Complete 109 events. |
| https://galacticracer.gameslantern.com/vehicle-parts/fuel-vortexer-i | 2000 | Complete 50 events. |
| https://galacticracer.gameslantern.com/vehicle-parts/fuel-vortexer-ii | 2500 | Complete 50 events. |
| https://galacticracer.gameslantern.com/vehicle-parts/fuel-vortexer-iii | 3000 | Complete 97 events. |
| https://galacticracer.gameslantern.com/vehicle-parts/fuel-vortexer-iv | 4000 | Complete 115 events. |
| https://galacticracer.gameslantern.com/vehicle-parts/glitched-fuel | 250 | Start the Campaign. |
| https://galacticracer.gameslantern.com/vehicle-parts/hail-mary-reset-i | 2500 | Complete 65 events. |
| https://galacticracer.gameslantern.com/vehicle-parts/hail-mary-reset-ii | 3000 | Complete 85 events. |
| https://galacticracer.gameslantern.com/vehicle-parts/hail-mary-reset-iii | 4000 | Complete 109 events. |
| https://galacticracer.gameslantern.com/vehicle-parts/heat-reduction-i | 2000 | Start the Campaign. |
| https://galacticracer.gameslantern.com/vehicle-parts/heat-reduction-ii | 2500 | Start the Campaign. |
| https://galacticracer.gameslantern.com/vehicle-parts/heat-reduction-iii | 3000 | Complete 55 events. |
| https://galacticracer.gameslantern.com/vehicle-parts/heat-reduction-iv | 4000 | Complete 91 events. |
| https://galacticracer.gameslantern.com/vehicle-parts/heated-fuel-i | 2000 | Complete 12 events. |
| https://galacticracer.gameslantern.com/vehicle-parts/heated-fuel-ii | 2500 | Complete 12 events. |
| https://galacticracer.gameslantern.com/vehicle-parts/heated-fuel-iii | 3000 | Complete 91 events. |
| https://galacticracer.gameslantern.com/vehicle-parts/heated-fuel-iv | 4000 | Complete 109 events. |
| https://galacticracer.gameslantern.com/vehicle-parts/iced-fuel | 250 | Start the Campaign. |
| https://galacticracer.gameslantern.com/vehicle-parts/iced-ignition | 250 | Start the Campaign. |
| https://galacticracer.gameslantern.com/vehicle-parts/ignited-fuel | 250 | Start the Campaign. |
| https://galacticracer.gameslantern.com/vehicle-parts/impact-regulator-i | 2000 | Complete 35 events. |
| https://galacticracer.gameslantern.com/vehicle-parts/impact-regulator-ii | 2500 | Complete 35 events. |
| https://galacticracer.gameslantern.com/vehicle-parts/impact-regulator-iii | 3000 | Complete 70 events. |
| https://galacticracer.gameslantern.com/vehicle-parts/imprecise-calibration | 250 | Start the Campaign. |
| https://galacticracer.gameslantern.com/vehicle-parts/improved-drafting | 2500 | Start the Campaign. |
| https://galacticracer.gameslantern.com/vehicle-parts/improved-regulators-i | 2000 | Start the Campaign. |
| https://galacticracer.gameslantern.com/vehicle-parts/improved-regulators-ii | 2500 | Start the Campaign. |
| https://galacticracer.gameslantern.com/vehicle-parts/improved-regulators-ii-2 | 2500 | unknown |
| https://galacticracer.gameslantern.com/vehicle-parts/improved-regulators-iii | 3000 | Complete 25 events. |
| https://galacticracer.gameslantern.com/vehicle-parts/improved-regulators-iv | 4000 | Complete 60 events. |
| https://galacticracer.gameslantern.com/vehicle-parts/incendiary-overcharge | 250 | Start the Campaign. |
| https://galacticracer.gameslantern.com/vehicle-parts/inefficient-aerodynamics | 250 | Start the Campaign. |
| https://galacticracer.gameslantern.com/vehicle-parts/inertial-shield | 2500 | Complete 20 events. |
| https://galacticracer.gameslantern.com/vehicle-parts/insulated-servos-i | 2000 | Complete 30 events. |
| https://galacticracer.gameslantern.com/vehicle-parts/insulated-servos-ii | 2500 | Complete 30 events. |
| https://galacticracer.gameslantern.com/vehicle-parts/insulated-servos-iii | 3000 | Complete 65 events. |
| https://galacticracer.gameslantern.com/vehicle-parts/jolted-boost-i | 2000 | Complete 45 events. |
| https://galacticracer.gameslantern.com/vehicle-parts/jolted-boost-ii | 2500 | Complete 45 events. |
| https://galacticracer.gameslantern.com/vehicle-parts/jolted-boost-iii | 3000 | Complete 91 events. |
| https://galacticracer.gameslantern.com/vehicle-parts/kinetic-energizer-i | 3000 | Complete 55 events. |
| https://galacticracer.gameslantern.com/vehicle-parts/kinetic-energizer-ii | 4000 | Complete 103 events. |
| https://galacticracer.gameslantern.com/vehicle-parts/kinetic-refueler-i | 2500 | Complete 25 events. |
| https://galacticracer.gameslantern.com/vehicle-parts/kinetic-refueler-ii | 3000 | Complete 40 events. |
| https://galacticracer.gameslantern.com/vehicle-parts/kinetic-refueler-iii | 4000 | Complete 55 events. |
| https://galacticracer.gameslantern.com/vehicle-parts/large-cross-section | unknown | unknown |
| https://galacticracer.gameslantern.com/vehicle-parts/leaky-tank | 250 | Start the Campaign. |
| https://galacticracer.gameslantern.com/vehicle-parts/lethal-velocity-i | 2000 | Complete 4 events. |
| https://galacticracer.gameslantern.com/vehicle-parts/lethal-velocity-ii | 2500 | Complete 4 events. |
| https://galacticracer.gameslantern.com/vehicle-parts/lethal-velocity-iii | 3000 | Complete 50 events. |
| https://galacticracer.gameslantern.com/vehicle-parts/lethal-velocity-iv | 4000 | Complete 80 events. |
| https://galacticracer.gameslantern.com/vehicle-parts/lingering-frost | 250 | Start the Campaign. |
| https://galacticracer.gameslantern.com/vehicle-parts/massive-momentum | unknown | unknown |
| https://galacticracer.gameslantern.com/vehicle-parts/old-dog-old-tricks | unknown | unknown |
| https://galacticracer.gameslantern.com/vehicle-parts/only-human | 3000 | unknown |
| https://galacticracer.gameslantern.com/vehicle-parts/optimized-fuel-i | 2000 | Start the Campaign. |
| https://galacticracer.gameslantern.com/vehicle-parts/optimized-fuel-ii | 2500 | Start the Campaign. |
| https://galacticracer.gameslantern.com/vehicle-parts/optimized-fuel-iii | 3000 | Complete 8 events. |
| https://galacticracer.gameslantern.com/vehicle-parts/optimized-fuel-iv | 4000 | Complete 60 events. |
| https://galacticracer.gameslantern.com/vehicle-parts/optimized-inlets-i | 2500 | Complete 25 events. |
| https://galacticracer.gameslantern.com/vehicle-parts/optimized-inlets-ii | 3000 | Complete 45 events. |
| https://galacticracer.gameslantern.com/vehicle-parts/optimized-inlets-iii | 4000 | Complete 115 events. |
| https://galacticracer.gameslantern.com/vehicle-parts/optimized-nozzles | unknown | unknown |
| https://galacticracer.gameslantern.com/vehicle-parts/optimized-radiators-i | 2000 | Start the Campaign. |
| https://galacticracer.gameslantern.com/vehicle-parts/optimized-radiators-ii | 2500 | Start the Campaign. |
| https://galacticracer.gameslantern.com/vehicle-parts/optimized-radiators-iii | 3000 | Complete 97 events. |
| https://galacticracer.gameslantern.com/vehicle-parts/optimized-surge-i | 2500 | Complete 55 events. |
| https://galacticracer.gameslantern.com/vehicle-parts/optimized-surge-ii | 3000 | Complete 85 events. |
| https://galacticracer.gameslantern.com/vehicle-parts/optimized-surge-iii | 4000 | Complete 109 events. |
| https://galacticracer.gameslantern.com/vehicle-parts/overbuilt-engines | unknown | unknown |
| https://galacticracer.gameslantern.com/vehicle-parts/overcharged-injector | 3000 | Complete 97 events. |
| https://galacticracer.gameslantern.com/vehicle-parts/overcharged-supercharger | 2500 | Complete 80 events. |
| https://galacticracer.gameslantern.com/vehicle-parts/overcharged-systems | 2500 | Complete 25 events. |
| https://galacticracer.gameslantern.com/vehicle-parts/overcharging-afterburner | 2000 | Start the Campaign. |
| https://galacticracer.gameslantern.com/vehicle-parts/overcharging-propellant | 4000 | Complete 115 events. |
| https://galacticracer.gameslantern.com/vehicle-parts/overflow-shielding-i | 2000 | Complete 4 events. |
| https://galacticracer.gameslantern.com/vehicle-parts/overflow-shielding-ii | 2500 | Complete 4 events. |
| https://galacticracer.gameslantern.com/vehicle-parts/overflow-shielding-iii | 3000 | Complete 97 events. |
| https://galacticracer.gameslantern.com/vehicle-parts/overheat-loop-i | 2500 | Complete 40 events. |
| https://galacticracer.gameslantern.com/vehicle-parts/overheat-loop-ii | 3000 | Complete 50 events. |
| https://galacticracer.gameslantern.com/vehicle-parts/overheat-loop-iii | 4000 | Complete 75 events. |
| https://galacticracer.gameslantern.com/vehicle-parts/overheated-motivators | 250 | Start the Campaign. |
| https://galacticracer.gameslantern.com/vehicle-parts/particulate-filter | 2500 | Complete 60 events. |
| https://galacticracer.gameslantern.com/vehicle-parts/phase-change-radiators-i | 2500 | Complete 60 events. |
| https://galacticracer.gameslantern.com/vehicle-parts/phase-change-radiators-ii | 3000 | Complete 65 events. |
| https://galacticracer.gameslantern.com/vehicle-parts/phase-change-radiators-iii | 4000 | Complete 103 events. |
| https://galacticracer.gameslantern.com/vehicle-parts/plug-f-power-cell | unknown | unknown |
| https://galacticracer.gameslantern.com/vehicle-parts/polished-inlets | 4000 | Complete 40 events. |
| https://galacticracer.gameslantern.com/vehicle-parts/power-cascade-i | 2500 | Complete 60 events. |
| https://galacticracer.gameslantern.com/vehicle-parts/power-cascade-ii | 3000 | Complete 75 events. |
| https://galacticracer.gameslantern.com/vehicle-parts/power-cascade-iii | 4000 | Complete 103 events. |
| https://galacticracer.gameslantern.com/vehicle-parts/protective-ignition-i | 2500 | Start the Campaign. |
| https://galacticracer.gameslantern.com/vehicle-parts/protective-ignition-ii | 3000 | Complete 12 events. |
| https://galacticracer.gameslantern.com/vehicle-parts/protective-ignition-iii | 4000 | Complete 60 events. |
| https://galacticracer.gameslantern.com/vehicle-parts/protective-overcharge | 2500 | Complete 91 events. |
| https://galacticracer.gameslantern.com/vehicle-parts/purging-surge | 3000 | Complete 80 events. |
| https://galacticracer.gameslantern.com/vehicle-parts/pyrophoric-surfaces | 250 | Start the Campaign. |
| https://galacticracer.gameslantern.com/vehicle-parts/ramjet-accelerator-i | 2000 | Complete 16 events. |
| https://galacticracer.gameslantern.com/vehicle-parts/ramjet-accelerator-ii | 2500 | Complete 16 events. |
| https://galacticracer.gameslantern.com/vehicle-parts/ramjet-accelerator-iii | 3000 | Complete 70 events. |
| https://galacticracer.gameslantern.com/vehicle-parts/ramjet-accelerator-iv | 4000 | Complete 109 events. |
| https://galacticracer.gameslantern.com/vehicle-parts/ramjet-cooling-i | 2000 | Start the Campaign. |
| https://galacticracer.gameslantern.com/vehicle-parts/ramjet-cooling-ii | 2500 | Start the Campaign. |
| https://galacticracer.gameslantern.com/vehicle-parts/ramjet-cooling-iii | 3000 | Complete 40 events. |
| https://galacticracer.gameslantern.com/vehicle-parts/ramjet-cooling-iv | 4000 | Complete 65 events. |
| https://galacticracer.gameslantern.com/vehicle-parts/ramjet-power-i | 2000 | Complete 4 events. |
| https://galacticracer.gameslantern.com/vehicle-parts/ramjet-power-ii | 2500 | Complete 4 events. |
| https://galacticracer.gameslantern.com/vehicle-parts/ramjet-power-iii | 3000 | Complete 85 events. |
| https://galacticracer.gameslantern.com/vehicle-parts/ramjet-power-iv | 4000 | Complete 109 events. |
| https://galacticracer.gameslantern.com/vehicle-parts/ramjet-reconfiguration | 3000 | Complete 75 events. |
| https://galacticracer.gameslantern.com/vehicle-parts/ramming-jet-i | 2500 | Paddock interaction: Installed Ramming Jet I. |
| https://galacticracer.gameslantern.com/vehicle-parts/ramming-jet-ii | 3000 | Paddock interaction: Ramming Jet I upgraded to Ramming Jet II. |
| https://galacticracer.gameslantern.com/vehicle-parts/ramming-jet-iii | 4000 | Paddock interaction: Installed Ramming Jet III. |
| https://galacticracer.gameslantern.com/vehicle-parts/reconstituted-fuel-i | 2500 | Complete 50 events. |
| https://galacticracer.gameslantern.com/vehicle-parts/reconstituted-fuel-ii | 3000 | Complete 60 events. |
| https://galacticracer.gameslantern.com/vehicle-parts/reconstituted-fuel-iii | 4000 | Complete 91 events. |
| https://galacticracer.gameslantern.com/vehicle-parts/recovery-coolant | 2500 | Complete 97 events. |
| https://galacticracer.gameslantern.com/vehicle-parts/recovery-shield | 2500 | Complete 70 events. |
| https://galacticracer.gameslantern.com/vehicle-parts/recovery-surge | 2500 | Complete 103 events. |
| https://galacticracer.gameslantern.com/vehicle-parts/redline-purge | 4000 | Complete 91 events. |
| https://galacticracer.gameslantern.com/vehicle-parts/redlining-power | 3000 | Start the Campaign. |
| https://galacticracer.gameslantern.com/vehicle-parts/refueling-abilities | 2500 | Start the Campaign. |
| https://galacticracer.gameslantern.com/vehicle-parts/release-actuators | 2500 | Complete 25 events. |
| https://galacticracer.gameslantern.com/vehicle-parts/reload-surge | 2500 | Complete 75 events. |
| https://galacticracer.gameslantern.com/vehicle-parts/repulsor-surplus | 3000 | Start the Campaign. |
| https://galacticracer.gameslantern.com/vehicle-parts/repulsormod-i | 2000 | Start the Campaign. |
| https://galacticracer.gameslantern.com/vehicle-parts/repulsormod-ii | 2500 | Start the Campaign. |
| https://galacticracer.gameslantern.com/vehicle-parts/repulsormod-iii | 3000 | Complete 16 events. |
| https://galacticracer.gameslantern.com/vehicle-parts/repulsormod-iv | 4000 | Complete 40 events. |
| https://galacticracer.gameslantern.com/vehicle-parts/residual-afterburner | 2500 | Start the Campaign. |
| https://galacticracer.gameslantern.com/vehicle-parts/robust-surge | 2500 | Complete 109 events. |
| https://galacticracer.gameslantern.com/vehicle-parts/scrap-reclaimer | 2500 | Complete 85 events. |
| https://galacticracer.gameslantern.com/vehicle-parts/scrap-recycler-i | 2000 | Start the Campaign. |
| https://galacticracer.gameslantern.com/vehicle-parts/scrap-recycler-ii | 2500 | Start the Campaign. |
| https://galacticracer.gameslantern.com/vehicle-parts/scrap-recycler-iii | 3000 | Complete 85 events. |
| https://galacticracer.gameslantern.com/vehicle-parts/scrap-recycler-iv | 4000 | Complete 115 events. |
| https://galacticracer.gameslantern.com/vehicle-parts/scrap-reloader | 3000 | Complete 30 events. |
| https://galacticracer.gameslantern.com/vehicle-parts/shield-cycler-i | 3000 | Complete 50 events. |
| https://galacticracer.gameslantern.com/vehicle-parts/shield-cycler-ii | 4000 | Complete 80 events. |
| https://galacticracer.gameslantern.com/vehicle-parts/shielding-fuel | 4000 | Complete 103 events. |
| https://galacticracer.gameslantern.com/vehicle-parts/shielding-lead | 2500 | Start the Campaign. |
| https://galacticracer.gameslantern.com/vehicle-parts/shielding-ramjet | 4000 | Complete 91 events. |
| https://galacticracer.gameslantern.com/vehicle-parts/shielding-repulsor-i | 2000 | Start the Campaign. |
| https://galacticracer.gameslantern.com/vehicle-parts/shielding-repulsor-ii | 2500 | Start the Campaign. |
| https://galacticracer.gameslantern.com/vehicle-parts/shielding-repulsor-iii | 3000 | Complete 8 events. |
| https://galacticracer.gameslantern.com/vehicle-parts/shielding-surge | 3000 | Complete 97 events. |
| https://galacticracer.gameslantern.com/vehicle-parts/slipstream-intakes | 3000 | Complete 40 events. |
| https://galacticracer.gameslantern.com/vehicle-parts/small-thrusters | unknown | unknown |
| https://galacticracer.gameslantern.com/vehicle-parts/spark-plugs-i | 2000 | Complete 4 events. |
| https://galacticracer.gameslantern.com/vehicle-parts/spark-plugs-ii | 2500 | Complete 4 events. |
| https://galacticracer.gameslantern.com/vehicle-parts/spark-plugs-iii | 3000 | Complete 30 events. |
| https://galacticracer.gameslantern.com/vehicle-parts/spark-plugs-iv | 4000 | Complete 70 events. |
| https://galacticracer.gameslantern.com/vehicle-parts/startup-malfunction | 250 | Start the Campaign. |
| https://galacticracer.gameslantern.com/vehicle-parts/steering-malfunction | 250 | Start the Campaign. |
| https://galacticracer.gameslantern.com/vehicle-parts/strained-circuits | 250 | Start the Campaign. |
| https://galacticracer.gameslantern.com/vehicle-parts/strategic-ablation | 2500 | Complete 75 events. |
| https://galacticracer.gameslantern.com/vehicle-parts/subzero-cooling | 2500 | Complete 115 events. |
| https://galacticracer.gameslantern.com/vehicle-parts/superconducting-ramjet | 2500 | Complete 40 events. |
| https://galacticracer.gameslantern.com/vehicle-parts/supercooled-attachments | 3000 | Complete 85 events. |
| https://galacticracer.gameslantern.com/vehicle-parts/surging-alarm-i | 2000 | Complete 20 events. |
| https://galacticracer.gameslantern.com/vehicle-parts/surging-alarm-ii | 2500 | Complete 20 events. |
| https://galacticracer.gameslantern.com/vehicle-parts/surging-alarm-iii | 3000 | Complete 45 events. |
| https://galacticracer.gameslantern.com/vehicle-parts/surging-fuel | 2500 | Complete 80 events. |
| https://galacticracer.gameslantern.com/vehicle-parts/surging-inlets-i | 2500 | Complete 20 events. |
| https://galacticracer.gameslantern.com/vehicle-parts/surging-inlets-ii | 3000 | Complete 30 events. |
| https://galacticracer.gameslantern.com/vehicle-parts/surging-inlets-iii | 4000 | Complete 55 events. |
| https://galacticracer.gameslantern.com/vehicle-parts/surplus-cooling | 3000 | Complete 70 events. |
| https://galacticracer.gameslantern.com/vehicle-parts/surplus-surging | 3000 | Complete 45 events. |
| https://galacticracer.gameslantern.com/vehicle-parts/system-degausser-i | 2000 | Start the Campaign. |
| https://galacticracer.gameslantern.com/vehicle-parts/system-degausser-ii | 2500 | Start the Campaign. |
| https://galacticracer.gameslantern.com/vehicle-parts/system-fragmentation | 250 | Start the Campaign. |
| https://galacticracer.gameslantern.com/vehicle-parts/system-surge | 2500 | Complete 115 events. |
| https://galacticracer.gameslantern.com/vehicle-parts/systematic-servicing | 2000 | Complete 20 events. |
| https://galacticracer.gameslantern.com/vehicle-parts/thermal-inverter | 2500 | Complete 85 events. |
| https://galacticracer.gameslantern.com/vehicle-parts/thermal-loop | 250 | Start the Campaign. |
| https://galacticracer.gameslantern.com/vehicle-parts/thermoactive-fuel | 2500 | Complete 45 events. |
| https://galacticracer.gameslantern.com/vehicle-parts/thermocycling-dampers-i | 3000 | Complete 16 events. |
| https://galacticracer.gameslantern.com/vehicle-parts/thermocycling-dampers-ii | 4000 | Complete 20 events. |
| https://galacticracer.gameslantern.com/vehicle-parts/thermophilic-fuel-i | 2500 | Complete 30 events. |
| https://galacticracer.gameslantern.com/vehicle-parts/thermophilic-fuel-ii | 3000 | Complete 65 events. |
| https://galacticracer.gameslantern.com/vehicle-parts/thermophilic-fuel-iii | 4000 | Complete 97 events. |
| https://galacticracer.gameslantern.com/vehicle-parts/uncapped-cooling | 3000 | Complete 103 events. |
| https://galacticracer.gameslantern.com/vehicle-parts/underbody-intakes-i | 2000 | Start the Campaign. |
| https://galacticracer.gameslantern.com/vehicle-parts/underbody-intakes-ii | 2500 | Start the Campaign. |
| https://galacticracer.gameslantern.com/vehicle-parts/underbody-intakes-iii | 3000 | Complete 25 events. |
| https://galacticracer.gameslantern.com/vehicle-parts/underclocking-device | 250 | Start the Campaign. |
| https://galacticracer.gameslantern.com/vehicle-parts/unquenchable-components | 250 | Start the Campaign. |
| https://galacticracer.gameslantern.com/vehicle-parts/unreliable-afterburner | 250 | Start the Campaign. |
| https://galacticracer.gameslantern.com/vehicle-parts/unsettled-start | 250 | Start the Campaign. |
| https://galacticracer.gameslantern.com/vehicle-parts/unstable-plating | 250 | Start the Campaign. |
| https://galacticracer.gameslantern.com/vehicle-parts/volatile-battery | 2000 | Complete 8 events. |
| https://galacticracer.gameslantern.com/vehicle-parts/volatile-fuel | 250 | Start the Campaign. |
| https://galacticracer.gameslantern.com/vehicle-parts/weak-ramjet | 250 | Start the Campaign. |
| https://galacticracer.gameslantern.com/vehicle-parts/weakened-cockpit | 250 | Start the Campaign. |
