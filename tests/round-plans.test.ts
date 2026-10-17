import assert from "node:assert/strict";
import test from "node:test";
import { buildPlanSchema, diffRoundLoadouts, roundLoadoutSchema, type BuildPlan, type RoundLoadout } from "../src/lib/builds/plan";

const empty = (): RoundLoadout => ({ parts: [], abilities: [], crashAbility: null });
const part = (partId: string, variantId = "rank-one") => ({ partId, variantId });
function plan(count = 1) {
  return {
    schemaVersion: 1, title: "My round plan", description: "A player's desired selections, not observed facts.",
    mode: null, characterId: null, vehicleClass: null, racerStyleId: null, gameVersion: null,
    rounds: Array.from({ length: count }, (_, index) => ({ round: index + 1, notes: "", target: empty() })),
  };
}

test("plans default to private and support known modes and nullable context", () => {
  const parsed: BuildPlan = buildPlanSchema.parse(plan());
  assert.equal(parsed.visibility, "private");
  for (const visibility of ["private", "unlisted", "public"]) {
    assert.equal(buildPlanSchema.parse({ ...plan(), visibility }).visibility, visibility);
  }
  for (const mode of ["campaign", "multiplayer", "scenario", "arcade", "multiplayer-tour", "podrace", "podrace-tour", "quick-podrace"]) {
    assert.equal(buildPlanSchema.safeParse({ ...plan(), mode }).success, true);
  }
  assert.equal(buildPlanSchema.safeParse({ ...plan(), mode: "stadium" }).success, false);
  assert.equal(buildPlanSchema.safeParse({ ...plan(), characterId: "test-character", vehicleClass: "podracer", racerStyleId: "test-style", gameVersion: "1.2" }).success, true);
  assert.equal(buildPlanSchema.safeParse({ ...plan(), vehicleClass: "spaceship" }).success, false);
});

test("round count is not fixed at seven; round numbers are positive, unique and ordered", () => {
  for (const count of [1, 3, 8, 100]) assert.equal(buildPlanSchema.parse(plan(count)).rounds.length, count);
  for (const rounds of [[], [0], [-1], [1.5], [1, 1], [2, 1]]) {
    const input = { ...plan(), rounds: rounds.map((round) => ({ round, notes: "", target: empty() })) };
    assert.equal(buildPlanSchema.safeParse(input).success, false);
  }
  assert.equal(buildPlanSchema.safeParse(plan(101)).success, false);
  const input = plan(2);
  input.rounds[1].round = 200;
  assert.equal(buildPlanSchema.safeParse(input).success, true);
});

test("snapshot diffs keep, remove, add and change opaque rank IDs without claiming upgrades", () => {
  const previous = { ...empty(), parts: [part("keep"), part("remove"), part("change", "rank-z")] };
  const next = { ...empty(), parts: [part("keep"), part("change", "rank-a"), part("add")] };
  const original = structuredClone({ previous, next });
  assert.deepEqual(diffRoundLoadouts(previous, next), {
    addedParts: [part("add")], removedParts: [part("remove")],
    changedParts: [{ partId: "change", fromVariantId: "rank-z", toVariantId: "rank-a" }],
  });
  assert.deepEqual(diffRoundLoadouts(next, previous).changedParts, [{ partId: "change", fromVariantId: "rank-a", toVariantId: "rank-z" }]);
  assert.deepEqual(diffRoundLoadouts(next, next), { addedParts: [], removedParts: [], changedParts: [] });
  assert.deepEqual(diffRoundLoadouts(null, next).addedParts, next.parts);
  assert.deepEqual({ previous, next }, original);
});

test("removed selections carry no value into subsequent complete snapshots", () => {
  const previous = { ...empty(), parts: [part("engine", "rank-z")] };
  const removed = empty();
  assert.deepEqual(diffRoundLoadouts(previous, removed), { addedParts: [], removedParts: previous.parts, changedParts: [] });
  const reintroduced = { ...empty(), parts: [part("engine", "rank-a")] };
  assert.deepEqual(diffRoundLoadouts(removed, reintroduced), { addedParts: reintroduced.parts, removedParts: [], changedParts: [] });
  const input = plan(2);
  input.rounds[0].target = previous;
  assert.deepEqual(buildPlanSchema.parse(input).rounds[1].target, empty());
  const diff = diffRoundLoadouts(null, reintroduced);
  diff.addedParts[0].variantId = "different";
  assert.equal(reintroduced.parts[0].variantId, "rank-a");
});

test("rejects malformed stable IDs, duplicate families and duplicate slots", () => {
  for (const id of ["", "Upper", "bad_id", "has space", "-leading", "trailing-", "double--dash"]) {
    for (const field of ["characterId", "racerStyleId"]) {
      assert.equal(buildPlanSchema.safeParse({ ...plan(), [field]: id }).success, false);
    }
    for (const target of [
      { ...empty(), parts: [part(id)] }, { ...empty(), parts: [part("engine", id)] },
      { ...empty(), abilities: [{ abilityId: id, variantId: null, slot: 1 }] },
      { ...empty(), abilities: [{ abilityId: "boost", variantId: id, slot: 1 }] },
      { ...empty(), crashAbility: { abilityId: id, variantId: null } },
      { ...empty(), crashAbility: { abilityId: "crash", variantId: id } },
    ]) assert.equal(roundLoadoutSchema.safeParse(target).success, false);
  }
  assert.equal(roundLoadoutSchema.safeParse({ ...empty(), parts: [part("engine"), part("engine", "rank-two")] }).success, false);
  const ability = { abilityId: "boost", variantId: null, slot: 1 };
  assert.equal(roundLoadoutSchema.safeParse({ ...empty(), abilities: [ability, { ...ability, abilityId: "shield" }] }).success, false);
  for (const slot of [0, -1, 1.5]) {
    assert.equal(roundLoadoutSchema.safeParse({ ...empty(), abilities: [{ ...ability, slot }] }).success, false);
  }
  // No inferred global capacity or prohibition on the same ability in distinct slots.
  assert.equal(roundLoadoutSchema.safeParse({ ...empty(), abilities: [ability, { ...ability, slot: 200 }], crashAbility: { abilityId: "crash", variantId: "alternate" } }).success, true);
});

test("bounded text and strict payloads exclude ownership, evidence and guessed mechanics", () => {
  for (const input of [
    { ...plan(), title: "  " }, { ...plan(), title: "x".repeat(161) },
    { ...plan(), description: "x".repeat(5001) }, { ...plan(), schemaVersion: 2 },
    { ...plan(), ownerId: "someone" }, { ...plan(), sourceIds: [] },
    { ...plan(), rounds: [{ round: 1, notes: "x".repeat(5001), target: empty() }] },
    { ...plan(), rounds: [{ round: 1, label: "x".repeat(161), notes: "", target: empty() }] },
  ]) assert.equal(buildPlanSchema.safeParse(input).success, false);
  for (const field of ["cost", "currency", "speed", "partSlots"]) {
    assert.equal(roundLoadoutSchema.safeParse({ ...empty(), [field]: 10 }).success, false);
  }
  assert.equal(roundLoadoutSchema.safeParse({ parts: [] }).success, false);
  assert.equal(roundLoadoutSchema.safeParse({ ...empty(), parts: [{ ...part("engine"), value: 100 }] }).success, false);
});
