# Round-by-round build planning

## User requirement

A player should be able to describe what they want to build at each round/event, not just publish a final inventory. The implemented UI saves progress locally and shares self-contained links; login and account-backed storage remain future work.

This builds on the source-tracked game catalog. It does not turn evidence screenshots into public community guides or assign in-game round numbers to them.

## Reference research — 2026-10-17

- [Stadium Builds](https://stadiumbuilds.io/) presents community build browsing.
- Indexed public build pages, such as [Amp It Up](https://stadiumbuilds.io/build/a37a3a4b-a217-4ab6-9c51-62a83f59dfd8), expose a round selector, per-round player loadout, build notes, round notes, costs, and stat impacts. This is the useful UX reference for a progression guide.
- [Overwatch Stadium Build Planner](https://www.owbuildplanner.com/) is a separate project whose indexed page explicitly describes seven-round builds and sharing by link.

Evidence limitation: direct HTTP fetches returned the JavaScript application shells rather than the complete interactive planners. The round-level details above were available in search-index extracts; no browser interaction, account workflow, or save functionality on those sites was tested. They are design references, not game-rule authorities for Galactic Racer.

Do not copy Overwatch's seven-round limit, income/cost model, rarity taxonomy, powers/items, or stat calculations into this app.

## Historical UI proposal (superseded where implemented)

The implemented UI has four routes: `/` overview with a custom teal/orange responsive sidebar, `/wiki` source-backed search with mode filters and details, `/builder` stage editing (clone/add/delete, notes, Part variants, abilities, and a separate Crash Ability), and `/builds` browser-local saved plans.

Local saves use browser storage, not accounts or server-persistent builds. Copy/share uses a self-contained `/builder#plan=…` URL marked unlisted; it includes plan notes and is readable by anyone with the link. It is not encrypted or account-private. Real authentication, database storage, and account sync are not implemented. Implementation is present; parent browser checks are pending.

The following is the original design direction, not a checklist of completed features. Author identity, account-private visibility, public discovery, and any unimplemented guidance remain proposals.

1. **Build overview:** title, author, game mode, racer if known, vehicle class, Racer Style, version/context, description, visibility.
2. **Round/event timeline:** Round 1 → Round 2 → Round 3 → Add round. Number of stages is authored/configurable, not fixed to seven.
3. **Selected round:** target Parts with exact rank/variant, numbered abilities, separate Crash Ability, and strategy notes.
4. **Changes since prior round:** add, remove, or change variant. Keep unchanged choices visually quiet. Removing a part must remove its effect from that stage.
5. **Priority/fallback guidance:** explain what to target and what to do if random rewards do not offer it. This is planned UI/editor content, not a guarantee the game will offer the loadout.
6. **Read/share view:** a single guide with round tabs, a compact all-round summary, exact item text, and author notes. Readers should not need an account to view intentionally shared content.

The editor supports adding and cloning rounds using complete snapshots. Once saved, each round is independent: changing an early round should not silently mutate later rounds. A future explicit “apply to following rounds” action can handle intentional propagation.

## Implemented foundation

`src/lib/builds/plan.ts` exports:

- `buildPlanSchema` and inferred `BuildPlan`.
- `roundLoadoutSchema` and inferred `RoundLoadout`.
- `diffRoundLoadouts(previous, next)` for added, removed, and variant-changed Parts.

Each plan has a schema version, title/description, nullable mode/racer/class/style context, visibility (defaults to private), game version, and an ordered list of numbered rounds. Each round contains notes and a **complete** target snapshot:

- Parts: `{ partId, variantId }`.
- Abilities: `{ abilityId, variantId, slot }`, with null variant where rank is unknown.
- Crash Ability: separate nullable selection.

The prototype uses one selected variant per Part family and one entry per numbered ability slot. These are representation constraints, not proof of the game's duplicate-item rules. Text/array size limits are application payload guardrails, not gameplay limits.

The diff helper calls variant transitions `changedParts`, not `upgradedParts`: a changed string ID alone does not prove that one rank is stronger. It does not merge snapshots or retain removed Parts.

This schema validates shape, IDs, duplicate selections, and chronological round ordering. It **does not yet** check a plan's IDs against the catalog, verify game legality/compatibility, calculate prices/stat stacking, or enforce observed slot counts. The game catalog separately validates references inside evidence records.

## Screenshot-driven distinctions

- Screenshot 7: Skim Speeder, Stunt Runner, displayed speed 322, Vectored Shockwave, Cooling Dampers II, 1/4 installed Parts; four numbered ability positions and a separate Crash Ability position.
- Screenshot 8: a reward choice between four Parts. These are `offeredParts`, not installed selections. Displayed speed 334 is only an observation.
- Screenshot 9: speed 347; Cooling Dampers II, Heated Fuel II, Depleted Shielding, Expanding Fuel Tank; Vectored Shockwave II and Surge.
- Screenshot 10: speed 359; Afterburner Efficiency IV replaces Cooling Dampers II in the observed inventory; Impact Surge appears instead of Surge. Heated Fuel II, Depleted Shielding, and Expanding Fuel Tank remain visible.

- Screenshot 11: Skim Speeder, Stunt Runner, displayed speed 371; Vectored Shockwave II and Impact Surge II confirmed by native crop; 4/4 Parts observed but installed identities unknown because the Parts are partially obscured. Do not carry over screenshot 10’s inventory.

Screenshot 11 confirms Vectored Shockwave II and Impact Surge II from a native-resolution crop. The Vectored Shockwave tooltip reads exactly: “Blast nearby opponents away, propelling you forward and applying System Malfunction to affected opponents.” This establishes its generic description, not a numerical rank-II difference. Impact Surge II’s effect remains unknown. The general Ability tooltip describes offensive, defensive, or utility equippable technology that consumes Energy; it gives no numeric Energy cost. Parts are partially obscured: `installedParts` remains unknown despite the observed 4/4 count, with no inventory carried over from screenshot 10.

These are five evidence snapshots, **not confirmed consecutive rounds**. The screenshots do not name their mode, character, or round. Do not attach them to Griff Halloran just because his panel was supplied earlier.

Heated Fuel I (25%) and II (50%) remain separate variants. “200% longer” and “200% faster” are stored as shown, without guessing stacking formulas or converting them into a composite stat. Unlabeled dots and icons do not establish a rarity, numeric stat, or key binding.

## Account persistence and server sharing still to implement

Browser-local saves and self-contained hash-link copy/share are implemented as described above. The following requirements concern a future account/server system, not the current local-only workspace:

- Real authentication and session validation.
- Database-owned build records; assign `ownerId` from the session, never client input.
- Owner-only create/update/delete authorization and input/reference validation on every write.
- Account-private drafts, server-backed unlisted links, and public discovery; private server records must not be served just because someone knows an ID.
- Versioned plan payloads and explicit decisions about historical edits: an edited plan changes the shared guide unless immutable revisions are implemented.
- Public output must not expose email addresses, session data, private source paths, or raw screenshots/overlays.
- Stable server-backed share routes and eventual account-owned copy/fork support. Current copy-link UI serializes a snapshot into the URL hash; later edits do not change an already copied link.

The catalog, typed progression model, stage editor, browser-local saved library, and hash-link sharing are implemented. No real login, database, account sync, or server-persistent builds are implemented. Browser verification remains pending the parent’s checks.

For visible previews, run `npm run dev` and open [Overview](http://localhost:3000/), [Wiki](http://localhost:3000/wiki), [Builder](http://localhost:3000/builder), or [My builds](http://localhost:3000/builds).

## Verification

Run `npm run test:content` for catalog, screenshot, and round-plan tests, plus `npm run content:check` and `npx tsc --noEmit`.
