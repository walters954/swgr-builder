import assert from "node:assert/strict";
import { mkdtemp, readFile, readdir, mkdir, writeFile, rm } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import test from "node:test";
import { validateCatalog, readCatalog, queryCatalog } from "../src/lib/content/catalog";
import { vehicleSchema, trackSchema, planetSchema, partSchema, unknownClaim, type Source } from "../src/lib/content/schema";

const folders = { characters: "characters", abilities: "abilities", vehicleClasses: "vehicle-classes", racerStyles: "racer-styles", parts: "parts", buildObservations: "build-observations", vehicles: "vehicles", tracks: "tracks", planets: "planets" } as const;
async function json(file: string) { return JSON.parse(await readFile(file, "utf8")); }
async function input() {
  const registry: Source[] = await json("content/sources.json");
  const sources = new Map(registry.map((source) => [source.id, source]));
  // Parent-owned registry stays untouched. Include sibling manifests so this
  // focused test is usable while the independent workers integrate their facts.
  for (const file of (await readdir("content/imports")).filter((file) => file.endsWith("sources.json"))) {
    const imported: Source[] = await json(`content/imports/${file}`);
    for (const source of imported) if (!sources.has(source.id)) sources.set(source.id, source);
  }
  // Isolate this worker's records from parent-owned styles/observations/parts
  // that may be mid-import. Do not relax validation or rewrite those records.
  const entries = await Promise.all(Object.entries(folders).map(async ([key, folder]) => [key,
    ["parts", "racerStyles", "buildObservations"].includes(key) ? [] : await Promise.all((await readdir(`content/${folder}`)).filter((file) => file.endsWith(".json")).map((file) => json(`content/${folder}/${file}`))),
  ] as const));
  return { sources: [...sources.values()], characters: [], abilities: [], ...Object.fromEntries(entries) };
}

test("world families validate with the parent-merge source manifest and are searchable", async () => {
  const catalog = validateCatalog(await input());
  assert.equal(catalog.vehicles.length, 50);
  assert.equal(catalog.tracks.length, 46);
  assert.equal(catalog.planets.length, 7);
  assert.ok(catalog.characters.some((entry) => entry.id === "darius-pax"));
  assert.equal(queryCatalog(catalog, { kind: "vehicle", search: "AM-1" })[0]?.id, "am-1");
  assert.equal(queryCatalog(catalog, { kind: "track", search: "Caustic Fields" })[0]?.id, "caustic-fields");
  assert.equal(queryCatalog(catalog, { kind: "planet", search: "Sentinel" })[0]?.id, "sentinel-i");
  const defaults = validateCatalog({ sources: [], characters: [], abilities: [] });
  assert.deepEqual([defaults.vehicles, defaults.tracks, defaults.planets], [[], [], []]);
});

test("readCatalog loads all new directories without implicitly merging private manifests", async () => {
  const data = await input();
  const temp = await mkdtemp(path.join(os.tmpdir(), "world-content-"));
  try {
    await mkdir(path.join(temp, "content"));
    await writeFile(path.join(temp, "content/sources.json"), JSON.stringify(data.sources));
    for (const [key, folder] of Object.entries(folders)) {
      await mkdir(path.join(temp, "content", folder));
      for (const entry of (data as Record<string, unknown>)[key] as { id: string }[]) {
        await writeFile(path.join(temp, "content", folder, `${entry.id}.json`), JSON.stringify(entry));
      }
    }
    const catalog = await readCatalog(temp);
    assert.equal(catalog.vehicles.length, 50);
    assert.equal(catalog.tracks.length, 46);
    assert.equal(catalog.planets.length, 7);
  } finally { await rm(temp, { recursive: true, force: true }); }
});

test("new families enforce source, image and duplicate ID checks", async () => {
  const data = await input();
  const catalog = validateCatalog(data);
  const vehicle = catalog.vehicles[0];
  assert.throws(() => validateCatalog({ ...catalog, vehicles: [vehicle, vehicle] }), /Duplicate vehicle ID/);
  const track = catalog.tracks[0];
  assert.throws(() => validateCatalog({ ...catalog, tracks: [track, track] }), /Duplicate track ID/);
  const planet = catalog.planets[0];
  assert.throws(() => validateCatalog({ ...catalog, planets: [planet, planet] }), /Duplicate planet ID/);
  assert.throws(() => validateCatalog({ ...catalog, vehicles: [{ ...vehicle, manufacturer: { status: "reported", value: "Test", sourceIds: ["missing-source"] } }] }), /unknown source/);
  assert.throws(() => validateCatalog({ ...catalog, vehicles: [{ ...vehicle, image: { path: "/images/test.png", alt: "Test", permission: "approved", sourceId: "missing-source" } }] }), /image: unknown source/);
  assert.throws(() => validateCatalog({ ...catalog, vehicles: [{ ...vehicle, image: { path: "/images/test.png", alt: "Test", permission: "pending", sourceId: vehicle.name.sourceIds[0] } }] }), /image permission is still pending/);
  assert.throws(() => validateCatalog({ ...catalog, vehicleClasses: [], vehicles: [vehicle] }), /unknown vehicle class/);
  assert.equal(vehicleSchema.safeParse({ ...vehicle, manufacturer: "unsourced" }).success, false);
  assert.equal(trackSchema.safeParse({ ...track, hazards: ["unsourced"] }).success, false);
  assert.equal(planetSchema.safeParse({ ...planet, environment: "unsourced" }).success, false);
});

test("import claims stay reported, page-specific, short and free of imagery", async () => {
  const catalog = validateCatalog(await input());
  const manifest: Source[] = await json("content/imports/world-sources.json");
  assert.ok(manifest.length > 0);
  assert.equal(new Set(manifest.map((source) => source.id)).size, manifest.length);
  assert.ok(manifest.every((source) => source.kind === "secondary" && "url" in source && /^https:\/\/(galacticracer\.gameslantern\.com|swgalacticracer\.wiki)\//.test(source.url)));
  function inspect(value: unknown) {
    if (!value || typeof value !== "object") return;
    if (Array.isArray(value)) { value.forEach(inspect); return; }
    const record = value as Record<string, unknown>;
    if (Array.isArray(record.sourceIds) && record.sourceIds.some((id) => String(id).startsWith("world-"))) {
      assert.equal(record.status, "reported");
      for (const id of record.sourceIds) assert.ok(catalog.sources.some((source) => source.id === id));
    }
    Object.values(record).forEach(inspect);
  }
  for (const entry of [...catalog.characters, ...catalog.vehicleClasses, ...catalog.vehicles, ...catalog.tracks, ...catalog.planets]) inspect(entry);
  for (const entry of [...catalog.vehicles, ...catalog.tracks, ...catalog.planets]) {
    assert.equal(entry.image, null);
    assert.ok((entry.summary.value?.length ?? 0) < 180);
  }
  assert.equal(catalog.vehicles.find((entry) => entry.id === "am-1")?.availableModes.status, "unknown");
  assert.equal(catalog.tracks.some((entry) => entry.id === "sentinel-one"), false);
});

test("curated screenshot facts and NPC uncertainty survive the import", async () => {
  const catalog = validateCatalog(await input());
  for (const id of ["hibi", "darius-pax"]) {
    const character = catalog.characters.find((entry) => entry.id === id)!;
    assert.equal(character.playableModes.status, "unknown");
    assert.deepEqual(character.loadouts, []);
  }
  assert.equal(catalog.characters.find((entry) => entry.id === "hibi")?.name.status, "official");
  for (const id of ["dud-bolt", "gasgano", "teemto-pagalies", "sebulba"]) {
    const character = catalog.characters.find((entry) => entry.id === id)!;
    assert.deepEqual(character.playableModes.value, ["podrace"]);
    assert.equal(character.vehicleProfiles.length, 1);
    assert.ok(character.vehicleProfiles[0].traits.every((trait) => trait.description.status === "screenshot-verified"));
  }
  for (const id of ["fola-kanjen", "goli-02-r0", "katja-mox", "soren-zaks"]) {
    assert.equal(catalog.characters.find((entry) => entry.id === id)?.species.status, "unknown");
  }
});

test("optional part price and unlock claims remain compatible and validated", async () => {
  const original = partSchema.parse(await json("content/parts/coolant-cycler.json"));
  const variant = original.variants[0];
  const withPrice = (value: number) => ({ ...original, variants: [{ ...variant, priceCredits: { status: "reported", value, sourceIds: ["test-source"] }, unlock: unknownClaim() }] });
  assert.equal(partSchema.safeParse(original).success, true);
  assert.equal(partSchema.safeParse(withPrice(2000)).success, true);
  assert.equal(partSchema.safeParse(withPrice(-1)).success, false);
  assert.equal(partSchema.safeParse(withPrice(2.5)).success, false);
});
