import assert from "node:assert/strict";
import test from "node:test";
import { readCatalog, queryCatalog } from "../src/lib/content/catalog";
import { diffRoundLoadouts, roundLoadoutSchema } from "../src/lib/builds/plan";

const catalogPromise = readCatalog();

test("Screenshot 7 captures visible slots without establishing a global game limit or character", async () => {
  const catalog = await catalogPromise;
  const observation = catalog.buildObservations.find((entry) => entry.id === "stunt-runner-build-7");
  assert.ok(observation);
  assert.equal(observation.characterId.value, null);
  assert.equal(observation.mode.value, null);
  assert.equal(observation.displayedSpeed.value, 322);
  assert.equal(observation.abilitySlots.value, 4);
  assert.equal(observation.crashAbilitySlots.value, 1);
  assert.equal(observation.partSlots.value, 4);
  assert.equal(observation.installedPartCount.value, 1);
});

test("Screenshot 8 reward candidates are not treated as installed parts", async () => {
  const catalog = await catalogPromise;
  const observation = catalog.buildObservations.find((entry) => entry.id === "part-rewards-8");
  assert.ok(observation);
  assert.equal(observation.offeredParts?.value?.length, 4);
  assert.equal(observation.installedParts.value, null);
  assert.equal(observation.installedPartCount.value, 1);
});

test("Heated Fuel I and II keep different exact percentages with their own evidence", async () => {
  const catalog = await catalogPromise;
  const heated = catalog.parts.find((entry) => entry.id === "heated-fuel");
  assert.ok(heated);
  const rank1 = heated.variants.find((entry) => entry.id === "i");
  const rank2 = heated.variants.find((entry) => entry.id === "ii");
  assert.equal(rank1?.description.value, "Redlining increases power of next Afterburner by 25%.");
  assert.equal(rank2?.description.value, "Redlining increases power of next Afterburner by 50%.");
  assert.deepEqual(rank1?.description.sourceIds, ["screenshot-part-rewards"]);
  assert.deepEqual(rank2?.description.sourceIds, ["screenshot-stunt-runner-full-build"]);
});

test("Shown ranks do not fabricate unseen rarity, ability effects, or variant ranks", async () => {
  const catalog = await catalogPromise;
  const shockwave = catalog.abilities.find((entry) => entry.id === "vectored-shockwave");
  assert.ok(shockwave);
  assert.equal(shockwave.variants[0].rank.value, "II");
  assert.equal(shockwave.variants[0].description.value, "Blast nearby opponents away, propelling you forward and applying System Malfunction to affected opponents.");
  assert.deepEqual(shockwave.variants[0].description.sourceIds, ["screenshot-vectored-shockwave-tooltip"]);
  assert.equal(shockwave.variants[0].energyCost.value, null);
  const unranked = ["overcharging-afterburner", "depleted-shielding", "expanding-fuel-tank"];
  for (const id of unranked) {
    const part = catalog.parts.find((entry) => entry.id === id)!;
    assert.equal(part.variants[0].rank.value, null);
    assert.equal(part.variants[0].rank.status, "unknown");
    const rarity = part.variants[0].rarity;
    if (rarity.value !== null) {
      assert.equal(rarity.status, "reported");
      assert.ok(rarity.sourceIds.length > 0);
      for (const id of rarity.sourceIds) {
        assert.equal(catalog.sources.find((source) => source.id === id)?.kind, "secondary");
      }
    } else {
      assert.equal(rarity.status, "unknown");
    }
  }
  assert.equal(catalog.parts.find((entry) => entry.id === "afterburner-efficiency")?.variants[0].description.value, "Afterburner can burn 200% longer.");
});

test("Comparing snapshots removes replaced parts instead of accumulating them", async () => {
  const catalog = await catalogPromise;
  const before = catalog.buildObservations.find((entry) => entry.id === "stunt-runner-build-9")!;
  const after = catalog.buildObservations.find((entry) => entry.id === "stunt-runner-build-10")!;
  const target = (parts: typeof before.installedParts.value) => roundLoadoutSchema.parse({ parts, abilities: [], crashAbility: null });
  const diff = diffRoundLoadouts(target(before.installedParts.value), target(after.installedParts.value));
  assert.deepEqual(diff.removedParts, [{ partId: "cooling-dampers", variantId: "ii" }]);
  assert.deepEqual(diff.addedParts, [{ partId: "afterburner-efficiency", variantId: "iv" }]);
  assert.deepEqual(diff.changedParts, []);
  assert.deepEqual(before.equippedAbilityIds.value, ["vectored-shockwave", "surge"]);
  assert.deepEqual(after.equippedAbilityIds.value, ["vectored-shockwave", "impact-surge"]);
  assert.equal(after.characterId.value, null);
});

test("Screenshot 11 confirms both II ability labels without fabricating Impact Surge's effect or the hidden inventory", async () => {
  const catalog = await catalogPromise;
  const observation = catalog.buildObservations.find((entry) => entry.id === "stunt-runner-build-11")!;
  assert.equal(observation.displayedSpeed.value, 371);
  assert.equal(observation.installedParts.value, null);
  assert.equal(observation.installedPartCount.value, 4);
  assert.deepEqual(observation.equippedAbilityVariants?.value, [
    { abilityId: "vectored-shockwave", variantId: "ii" },
    { abilityId: "impact-surge", variantId: "ii" },
  ]);
  const impact = catalog.abilities.find((entry) => entry.id === "impact-surge")!;
  assert.equal(impact.variants[0].rank.value, "II");
  const description = impact.variants[0].description;
  assert.equal(description.status, "reported");
  assert.equal(description.value, "Gain Surging for 10s. Overtakes, Takedowns , and vehicle collisions extend the duration. Takedowns recharge Energy .");
  assert.deepEqual(description.sourceIds, ["loadouts-gameslantern-abilities-impact-surge-ii"]);
  for (const id of description.sourceIds) {
    const source = catalog.sources.find((entry) => entry.id === id);
    assert.equal(source?.kind, "secondary");
    assert.ok(source && "url" in source);
    assert.equal(source.url, "https://galacticracer.gameslantern.com/abilities/impact-surge-ii");
  }
  assert.ok(!description.sourceIds.includes("screenshot-vectored-shockwave-tooltip"));
  assert.equal(impact.variants[0].energyCost.value, null);
});

test("Evidence snapshots are not listed as user-authored shared plans", async () => {
  const catalog = await catalogPromise;
  assert.equal(queryCatalog(catalog).some((entry) => entry.kind === "build-observation"), false);
  const observedIds = queryCatalog(catalog, { kind: "build-observation" }).map((entry) => entry.id);
  assert.ok(["stunt-runner-build-7", "part-rewards-8", "stunt-runner-build-9", "stunt-runner-build-10", "stunt-runner-build-11"].every((id) => observedIds.includes(id)));
});
