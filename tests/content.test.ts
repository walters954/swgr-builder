import assert from "node:assert/strict";
import { mkdtemp, readFile, rm } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import test from "node:test";
import { readCatalog, queryCatalog, validateCatalog } from "../src/lib/content/catalog";
import { characterSchema, createDraft, sourceSchema } from "../src/lib/content/schema";
import { writeDraft } from "../src/lib/content/authoring";

const catalogPromise = readCatalog();

test("Podrace racers preserve their own vehicle traits, without assumed styles or ability cards", async () => {
  const catalog = await catalogPromise;
  const expected = {
    "dud-bolt": ["Vulptereen 327", "Optimized Nozzles", "Draggy Control Surfaces"],
    gasgano: ["Custom Ord Pedrovia", "Energy Surplus", "Large Cross-Section"],
    "teemto-pagalies": ["IPG-X1131 LongTail", "Bleeding-Edge Tech", "Small Thrusters"],
    sebulba: ["Plug-F Mammoth", "Built for Battle", "Old Dog, Old Tricks"],
  };
  for (const [id, [vehicle, ...traits]] of Object.entries(expected)) {
    const character = catalog.characters.find((entry) => entry.id === id);
    assert.ok(character);
    assert.deepEqual(character.playableModes.value, ["podrace"]);
    assert.deepEqual(character.loadouts, []);
    assert.equal(character.vehicleProfiles.length, 1);
    const profile = character.vehicleProfiles[0];
    assert.equal(profile.mode.value, "podrace");
    assert.equal(profile.vehicleName.value, vehicle);
    assert.deepEqual(profile.traits.map((trait) => trait.name.value), traits);
    assert.ok(profile.traits.every((trait) => trait.description.status === "screenshot-verified"));
  }
});

test("Skim Speeder is a Multiplayer Tour vehicle class, not a character", async () => {
  const catalog = await catalogPromise;
  assert.equal(catalog.characters.some((entry) => entry.id === "skim-speeder"), false);
  const skim = catalog.vehicleClasses.find((entry) => entry.id === "skim-speeder");
  assert.ok(skim);
  assert.deepEqual(skim.availableModes.value, ["multiplayer-tour"]);
  assert.deepEqual(skim.traits.map((trait) => trait.name.value), ["Streamlined Intakes", "Sweeping Airfoils", "Knife Edge"]);
  assert.ok(skim.traits[2].description.value?.includes("[input icon]"));
  assert.equal(queryCatalog(catalog, { kind: "vehicle-class", tag: "multiplayer-tour" }).length, 1);
});

test("Griff's Multiplayer Tour style traits stay separate from Podrace vehicle traits", async () => {
  const catalog = await catalogPromise;
  const griff = catalog.characters.find((entry) => entry.id === "griff-halloran");
  assert.ok(griff);
  assert.deepEqual(griff.playableModes.value, ["multiplayer-tour"]);
  assert.deepEqual(griff.vehicleProfiles, []);
  assert.equal(griff.loadouts.length, 1);
  assert.equal(griff.loadouts[0].racerStyle.value, "Afterburner");
  assert.equal(griff.loadouts[0].abilityIds.status, "unknown");
  assert.deepEqual(griff.loadouts[0].traits.map((trait) => trait.name.value), ["Afterburner Superiority", "Afterburner Fuel Tank", "Burn Bright"]);
  assert.equal(griff.loadouts[0].traits[2].description.value, "Each overtake refills Afterburner tank by 10%.");
});

test("Source URLs reject non-HTTPS URLs and embedded credentials", () => {
  const source = { id: "example-source", kind: "official", title: "Example", accessedAt: "2026-10-17" };
  assert.equal(sourceSchema.safeParse({ ...source, url: "https://example.com/source" }).success, true);
  assert.equal(sourceSchema.safeParse({ ...source, url: "http://example.com/source" }).success, false);
  assert.equal(sourceSchema.safeParse({ ...source, url: "https://user:password@example.com/source" }).success, false);
});

test("Public queries exclude unfinished ability drafts", async () => {
  const catalog = await catalogPromise;
  const visibleIds = queryCatalog(catalog, { kind: "ability" }).map((entry) => entry.id);
  assert.equal(visibleIds.includes("flame-vent"), false);
  assert.ok(catalog.abilities.filter((entry) => entry.publication === "draft").every((entry) => !visibleIds.includes(entry.id)));
  assert.ok(visibleIds.includes("vectored-shockwave"));
  assert.equal(queryCatalog(catalog, { kind: "ability", includeDrafts: true }).length, catalog.abilities.length);
});

test("Schema does not allow numeric guesses disguised as unknown facts", () => {
  const entry = createDraft("character", "example-racer");
  assert.equal(characterSchema.safeParse({ ...entry, species: { status: "unknown", value: "Human", sourceIds: [], notes: "Guess" } }).success, false);
});

test("Validation rejects broken evidence and wrongly labeled verification", async () => {
  const catalog = structuredClone(await catalogPromise);
  const dud = catalog.characters.find((entry) => entry.id === "dud-bolt")!;
  dud.name = { status: "screenshot-verified", value: "Dud Bolt", sourceIds: ["official-launch-2026"] };
  assert.throws(() => validateCatalog(catalog), /requires a screenshot source/);
  dud.name = { status: "screenshot-verified", value: "Dud Bolt", sourceIds: ["missing-source"] };
  assert.throws(() => validateCatalog(catalog), /unknown source 'missing-source'/);
});

test("Validation rejects duplicate vehicle profiles", async () => {
  const catalog = structuredClone(await catalogPromise);
  const dud = catalog.characters.find((entry) => entry.id === "dud-bolt")!;
  dud.vehicleProfiles.push(structuredClone(dud.vehicleProfiles[0]));
  assert.throws(() => validateCatalog(catalog), /duplicate vehicle profile IDs/);
});

test("Screenshot evidence stays out of the publicly served asset directory", async () => {
  const catalog = await catalogPromise;
  const screenshots = catalog.sources.filter((source) => source.kind === "screenshot");
  assert.ok(screenshots.length >= 6);
  assert.ok(screenshots.every((source) => source.path.startsWith("content/evidence/screenshots/")));
  assert.ok(catalog.characters.every((entry) => entry.image === null));
});

test("Draft authoring creates valid JSON and will not overwrite an existing entry", async () => {
  const root = await mkdtemp(path.join(os.tmpdir(), "swgr-content-test-"));
  try {
    const filename = await writeDraft(root, "character", "new-racer");
    const entry = characterSchema.parse(JSON.parse(await readFile(filename, "utf8")));
    assert.equal(entry.publication, "draft");
    assert.equal(entry.name.value, null);
    await assert.rejects(writeDraft(root, "character", "new-racer"), { code: "EEXIST" });
    await assert.rejects(writeDraft(root, "character", "../escape"));
  } finally {
    await rm(root, { recursive: true, force: true });
  }
});
