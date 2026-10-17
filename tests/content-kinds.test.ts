import assert from "node:assert/strict";
import test from "node:test";
import { queryCatalog, validateCatalog } from "../src/lib/content/catalog";
import { buildObservationSchema, createDraft, partSchema, racerStyleSchema, unknownClaim } from "../src/lib/content/schema";

const claim = <T>(value: T) => ({ status: "official" as const, value, sourceIds: ["test-source"] });
const common = {
  schemaVersion: 1,
  publication: "published",
  name: claim("Example"),
  aliases: [],
  summary: claim("Sourced example"),
  tags: [],
  image: null,
  updatedAt: "2026-10-17",
  gameVersion: null,
  editorialNotes: null,
};
const style = { ...common, id: "test-style", kind: "racer-style", rank: unknownClaim(), traits: [{ name: claim("Trait"), description: unknownClaim() }] };
const variant = { id: "test-variant", rank: unknownClaim(), rarity: claim("Rare"), description: unknownClaim() };
const part = { ...common, id: "test-part", kind: "part", variants: [variant] };
const observation = {
  ...common, id: "test-observation", kind: "build-observation",
  mode: claim("multiplayer-tour"), characterId: claim("test-character"),
  vehicleClass: claim("skim-speeder"), displayedSpeed: claim(123.5),
  racerStyleId: claim("test-style"), equippedAbilityIds: claim(["test-ability"]),
  installedParts: claim([{ partId: "test-part", variantId: "test-variant" }]),
  abilitySlots: claim(0), crashAbilitySlots: unknownClaim(), partSlots: claim(0), installedPartCount: claim(7),
};
function fixture() {
  return {
    sources: [{ id: "test-source", kind: "official", title: "Test source", accessedAt: "2026-10-17", url: "https://example.com" }],
    characters: [createDraft("character", "test-character")],
    abilities: [createDraft("ability", "test-ability")],
    racerStyles: [structuredClone(style)], parts: [structuredClone(part)],
    buildObservations: [structuredClone(observation)],
  };
}

test("New kinds retain claims and accept observed facts without inferring legality", () => {
  assert.equal(racerStyleSchema.safeParse(style).success, true);
  assert.equal(partSchema.safeParse(part).success, true);
  assert.equal(buildObservationSchema.safeParse(observation).success, true);
  assert.doesNotThrow(() => validateCatalog(fixture()));
  assert.equal(buildObservationSchema.safeParse({ ...observation, mode: unknownClaim() }).success, true);
  assert.equal(buildObservationSchema.safeParse({ ...observation, mode: claim("unrecognized-mode") }).success, false);
  assert.equal(buildObservationSchema.safeParse({ ...observation, equippedAbilityIds: claim(["same", "same"]) }).success, false);
  assert.equal(buildObservationSchema.safeParse({ ...observation, installedParts: claim([{ partId: "test-part", variantId: "test-variant", extra: true }]) }).success, false);
  for (const field of ["abilitySlots", "crashAbilitySlots", "partSlots", "installedPartCount"]) {
    for (const value of [-1, 1.5]) assert.equal(buildObservationSchema.safeParse({ ...observation, [field]: claim(value) }).success, false);
  }
  assert.equal(buildObservationSchema.safeParse({ ...observation, displayedSpeed: claim(-1) }).success, false);
});

test("Observation references must exist, and variants belong to the referenced part", () => {
  for (const [field, value, message] of [
    ["characterId", "missing", /unknown character/],
    ["racerStyleId", "missing", /unknown racer style/],
    ["equippedAbilityIds", ["missing"], /unknown ability/],
    ["installedParts", [{ partId: "missing", variantId: "test-variant" }], /unknown part/],
    ["installedParts", [{ partId: "test-part", variantId: "missing" }], /unknown variant/],
  ] as const) {
    const input = fixture();
    Object.assign(input.buildObservations[0], { [field]: claim(value) });
    assert.throws(() => validateCatalog(input), message);
  }
  const input = fixture();
  input.parts.push({ ...part, id: "other-part", variants: [{ ...variant, id: "other-variant" }] });
  input.buildObservations[0].installedParts = claim([{ partId: "test-part", variantId: "other-variant" }]);
  assert.throws(() => validateCatalog(input), /unknown variant/);
  Object.assign(input.buildObservations[0], {
    characterId: unknownClaim(), racerStyleId: unknownClaim(), equippedAbilityIds: unknownClaim(), installedParts: unknownClaim(),
  });
  assert.doesNotThrow(() => validateCatalog(input));
});

test("Offered reward candidates stay separate from installed selections and counts", () => {
  const input = fixture();
  const candidates = ["candidate-one", "candidate-two", "candidate-three", "candidate-four"];
  input.parts.push(...candidates.map((id) => ({ ...part, id })));
  const offeredParts = claim(candidates.map((partId) => ({ partId, variantId: "test-variant" })));
  const observed = {
    ...input.buildObservations[0],
    offeredParts,
    installedPartCount: claim(1),
    partSlots: claim(1),
  };
  const catalog = validateCatalog({ ...input, buildObservations: [observed] });
  const result = catalog.buildObservations[0];
  assert.deepEqual(result.offeredParts, offeredParts);
  assert.deepEqual(result.installedParts.value, [{ partId: "test-part", variantId: "test-variant" }]);
  assert.equal(result.installedPartCount.value, 1);
  assert.equal(result.partSlots.value, 1);
  assert.equal(result.abilitySlots.value, 0);
  assert.deepEqual(result.crashAbilitySlots, observation.crashAbilitySlots);
  assert.equal(buildObservationSchema.safeParse({ ...observed, offeredParts: unknownClaim() }).success, true);
  assert.equal(buildObservationSchema.safeParse({
    ...observed, offeredParts: claim([{ partId: "test-part", variantId: "test-variant", extra: true }]),
  }).success, false);
  for (const [partId, variantId, message] of [
    ["missing", "test-variant", /offeredParts: unknown part/],
    ["test-part", "missing", /offeredParts: unknown variant/],
  ] as const) {
    assert.throws(() => validateCatalog({
      ...input, buildObservations: [{ ...observed, offeredParts: claim([{ partId, variantId }]) }],
    }), message);
  }
  assert.throws(() => validateCatalog({
    ...input, buildObservations: [{ ...observed, offeredParts: { ...offeredParts, sourceIds: ["missing"] } }],
  }), /offeredParts: unknown source/);
});

test("Equipped ability variants record partial assignments and validate family, membership, and evidence", () => {
  const input = fixture();
  const ability = createDraft("ability", "vectored-shockwave");
  assert.equal(ability.kind, "ability");
  if (ability.kind !== "ability") throw new Error("Expected ability draft");
  ability.variants.push({
    ...variant, id: "ii", rank: claim("II"), energyCost: unknownClaim(),
    cooldownSeconds: unknownClaim(), durationSeconds: unknownClaim(), tags: [],
  });
  input.abilities.push(ability);
  const observed = {
    ...input.buildObservations[0],
    equippedAbilityIds: claim(["vectored-shockwave", "test-ability"]),
    equippedAbilityVariants: claim([{ abilityId: "vectored-shockwave", variantId: "ii" }]),
  };
  const validate = (entry: unknown) => validateCatalog({ ...input, buildObservations: [entry] });
  const result = validate(observed).buildObservations[0];
  assert.deepEqual(result.equippedAbilityIds.value, ["vectored-shockwave", "test-ability"]);
  assert.deepEqual(result.equippedAbilityVariants, observed.equippedAbilityVariants);
  assert.doesNotThrow(() => validate({ ...observed, equippedAbilityIds: unknownClaim() }));
  assert.doesNotThrow(() => validate({ ...observed, equippedAbilityVariants: unknownClaim() }));
  assert.doesNotThrow(() => validate({ ...observed, equippedAbilityVariants: claim([]) }));
  assert.throws(() => validate({ ...observed, equippedAbilityIds: claim([]) }), /not in equippedAbilityIds/);
  for (const [abilityId, variantId, message] of [
    ["missing", "ii", /equippedAbilityVariants: unknown ability/],
    ["vectored-shockwave", "missing", /equippedAbilityVariants: unknown variant/],
    ["test-ability", "ii", /equippedAbilityVariants: unknown variant/],
  ] as const) {
    assert.throws(() => validate({
      ...observed, equippedAbilityVariants: claim([{ abilityId, variantId }]),
    }), message);
  }
  assert.throws(() => validate({ ...observed, equippedAbilityIds: claim(["test-ability"]) }), /not in equippedAbilityIds/);
  assert.throws(() => validate({
    ...observed, equippedAbilityVariants: { ...observed.equippedAbilityVariants, sourceIds: ["missing"] },
  }), /equippedAbilityVariants: unknown source/);
  assert.throws(() => validate({
    ...observed, equippedAbilityVariants: { ...observed.equippedAbilityVariants, status: "screenshot-verified" },
  }), /equippedAbilityVariants: 'screenshot-verified' requires a screenshot source/);
  assert.equal(buildObservationSchema.safeParse({
    ...observed, equippedAbilityVariants: claim([{ abilityId: "vectored-shockwave", variantId: "ii", extra: true }]),
  }).success, false);
});

test("Public queries require an explicit observation kind even when including drafts", () => {
  const catalog = validateCatalog(fixture());
  assert.deepEqual(queryCatalog(catalog).map((entry) => entry.kind).sort(), ["part", "racer-style"]);
  assert.equal(queryCatalog(catalog, { includeDrafts: true }).some((entry) => entry.kind === "build-observation"), false);
  assert.equal(queryCatalog(catalog, { kind: "build-observation" })[0]?.id, observation.id);
  catalog.buildObservations[0].publication = "draft";
  assert.deepEqual(queryCatalog(catalog, { kind: "build-observation" }), []);
  assert.equal(queryCatalog(catalog, { kind: "build-observation", includeDrafts: true }).length, 1);
});

test("Variant IDs are unique within each part, not across parts", () => {
  const input = fixture();
  input.parts.push({ ...part, id: "other-part" });
  assert.doesNotThrow(() => validateCatalog(input));
  input.parts[0].variants.push(structuredClone(variant));
  assert.throws(() => validateCatalog(input), /part\/test-part: duplicate variant IDs/);
});

test("New arrays default to empty and new kinds receive source and ID checks", () => {
  const catalog = validateCatalog({ sources: [], characters: [], abilities: [] });
  assert.deepEqual([catalog.racerStyles, catalog.parts, catalog.buildObservations], [[], [], []]);
  for (const group of ["racerStyles", "parts", "buildObservations"] as const) {
    const input = fixture();
    input[group][0].name = { ...claim("Example"), sourceIds: ["missing"] };
    assert.throws(() => validateCatalog(input), /unknown source 'missing'/);
    const duplicate = fixture();
    duplicate[group].push(structuredClone(duplicate[group][0]) as never);
    assert.throws(() => validateCatalog(duplicate), /Duplicate .* ID/);
  }
});
