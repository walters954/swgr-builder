import assert from "node:assert/strict";
import { readFile, readdir } from "node:fs/promises";
import test from "node:test";
import { readCatalog, queryCatalog, validateCatalog } from "../src/lib/content/catalog";
import type { Source } from "../src/lib/content/schema";

const catalogPromise = readCatalog();
const folders = { vehicles: "vehicles", tracks: "tracks", planets: "planets", characters: "characters", abilities: "abilities", vehicleClasses: "vehicle-classes", racerStyles: "racer-styles", parts: "parts", buildObservations: "build-observations" } as const;

test("the real loader loads every family and merged manifests without a test-side source merge", async () => {
  const catalog = await catalogPromise;
  assert.ok(catalog.sources.length >= 543);
  assert.equal(new Set(catalog.sources.map((source) => source.id)).size, catalog.sources.length);
  for (const [key, folder] of Object.entries(folders) as [keyof typeof folders, string][]) {
    const files = (await readdir(`content/${folder}`)).filter((file) => file.endsWith(".json"));
    assert.ok(files.length > 0);
    assert.deepEqual(catalog[key].map((entry) => `${entry.id}.json`).sort(), files.sort());
  }
  assert.ok(catalog.parts.flatMap((entry) => entry.variants).length >= 318);
  for (const filename of ["gameslantern-parts-sources.json", "gameslantern-loadouts-sources.json", "world-sources.json"]) {
    const manifest: Source[] = JSON.parse(await readFile(`content/imports/${filename}`, "utf8"));
    assert.ok(manifest.length >= (filename === "gameslantern-parts-sources.json" ? 318 : 1));
    assert.equal(new Set(manifest.map((source) => source.id)).size, manifest.length);
    const urls = manifest.map((source) => "url" in source ? source.url : null);
    assert.equal(new Set(urls).size, manifest.length);
    for (const source of manifest) {
      assert.equal(source.kind, "secondary");
      assert.deepEqual(catalog.sources.find((entry) => entry.id === source.id), source);
    }
  }
});

test("all claims and ability/part variant references resolve in the fully merged catalog", async () => {
  const catalog = await catalogPromise;
  assert.doesNotThrow(() => validateCatalog(catalog));
  const sources = new Map(catalog.sources.map((source) => [source.id, source]));
  let importedClaims = 0;
  function inspect(value: unknown): void {
    if (!value || typeof value !== "object") return;
    if (Array.isArray(value)) { value.forEach(inspect); return; }
    const record = value as Record<string, unknown>;
    if (Array.isArray(record.sourceIds)) {
      for (const id of record.sourceIds as string[]) {
        assert.ok(sources.has(id), `Missing source ${id}`);
        if (/^(gameslantern-part-|loadouts-gameslantern-|world-)/.test(id)) {
          importedClaims++;
          assert.equal(record.status, "reported");
          assert.equal(sources.get(id)?.kind, "secondary");
        }
      }
    }
    if (typeof record.partId === "string" && typeof record.variantId === "string") {
      assert.ok(catalog.parts.find((part) => part.id === record.partId)?.variants.some((variant) => variant.id === record.variantId));
    }
    if (typeof record.abilityId === "string" && typeof record.variantId === "string") {
      assert.ok(catalog.abilities.find((ability) => ability.id === record.abilityId)?.variants.some((variant) => variant.id === record.variantId));
    }
    Object.values(record).forEach(inspect);
  }
  Object.keys(folders).forEach((key) => inspect(catalog[key as keyof typeof folders]));
  assert.ok(importedClaims >= 318);
});

test("published imported records are eligible while drafts and evidence observations are excluded by default", async () => {
  const catalog = await catalogPromise;
  const publicEntries = queryCatalog(catalog);
  const allEntries = queryCatalog(catalog, { includeDrafts: true });
  let importedPublished = 0;
  for (const entry of allEntries) {
    const visible = publicEntries.some((candidate) => candidate.kind === entry.kind && candidate.id === entry.id);
    assert.equal(visible, entry.publication === "published", `${entry.kind}/${entry.id}`);
    if (entry.publication === "published" && entry.name.status === "reported") {
      importedPublished++;
      assert.ok(entry.name.sourceIds.length > 0);
      assert.equal(entry.image, null, "Imported pages must not silently import third-party imagery");
    }
  }
  assert.ok(importedPublished >= 318);
  assert.ok(allEntries.some((entry) => entry.publication === "draft"));
  assert.ok(!publicEntries.some((entry) => entry.kind === "build-observation"));
  for (const key of ["vehicles", "tracks", "planets"] as const) {
    assert.ok(catalog[key].some((entry) => entry.publication === "published" && entry.name.status === "reported"));
  }
  // Exercise draft filtering even if future curation publishes every current draft.
  const part = catalog.parts.find((entry) => entry.publication === "published")!;
  const withDraft = { ...catalog, parts: catalog.parts.map((entry) => entry.id === part.id ? { ...entry, publication: "draft" as const } : entry) };
  assert.ok(!queryCatalog(withDraft, { kind: "part" }).some((entry) => entry.id === part.id));
  assert.ok(queryCatalog(withDraft, { kind: "part", includeDrafts: true }).some((entry) => entry.id === part.id));
});

test("screenshot-specific facts retain exact values and evidence after imports", async () => {
  const catalog = await catalogPromise;
  const heated = catalog.parts.find((entry) => entry.id === "heated-fuel")!;
  for (const [id, percentage, source] of [["i", 25, "screenshot-part-rewards"], ["ii", 50, "screenshot-stunt-runner-full-build"]] as const) {
    const description = heated.variants.find((variant) => variant.id === id)!.description;
    assert.equal(description.value, `Redlining increases power of next Afterburner by ${percentage}%.`);
    assert.equal(description.status, "screenshot-verified");
    assert.deepEqual(description.sourceIds, [source]);
  }
  const observation = catalog.buildObservations.find((entry) => entry.id === "stunt-runner-build-11")!;
  assert.equal(observation.displayedSpeed.value, 371);
  assert.equal(observation.displayedSpeed.status, "screenshot-verified");
  assert.equal(observation.installedParts.value, null);
  assert.equal(observation.installedPartCount.value, 4);
  const impact = catalog.abilities.find((entry) => entry.id === "impact-surge")!.variants.find((variant) => variant.id === "ii")!;
  assert.equal(impact.rank.value, "II");
  assert.equal(impact.rank.status, "screenshot-verified");
  assert.equal(impact.description.status, "reported");
  assert.ok(impact.description.sourceIds.every((id) => catalog.sources.find((source) => source.id === id)?.kind === "secondary"));
});
