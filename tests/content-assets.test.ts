import assert from "node:assert/strict";
import { mkdir, mkdtemp, rm, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import test from "node:test";
import { checkCatalogAssets } from "../src/lib/content/asset-validation";
import { ContentValidationError, readCatalog, validateCatalog } from "../src/lib/content/catalog";
import { createDraft } from "../src/lib/content/schema";

function fixture() {
  const character = createDraft("character", "asset-racer", "2026-10-17");
  character.image = { path: "/images/racers/portrait.png", alt: "Racer portrait", sourceId: "test-evidence", permission: "pending" };
  return validateCatalog({
    sources: [{ id: "test-evidence", kind: "screenshot", title: "Private evidence", accessedAt: "2026-10-17", path: "content/evidence/screenshots/test-evidence.png", capturedAt: null, platform: null, gameVersion: null, language: null }],
    characters: [character],
    abilities: [],
  });
}

async function put(root: string, relative: string, contents = "fixture") {
  const filename = path.join(root, relative);
  await mkdir(path.dirname(filename), { recursive: true });
  await writeFile(filename, contents);
}

function missing(asset: string) {
  return (error: unknown) => {
    assert.ok(error instanceof ContentValidationError);
    assert.deepEqual(error.issues, [`Missing image asset: ${asset}`]);
    return true;
  };
}

test("asset checks require private evidence at its repository-relative path", async (t) => {
  const root = await mkdtemp(path.join(os.tmpdir(), "swgr-assets-"));
  t.after(() => rm(root, { recursive: true, force: true }));
  const catalog = fixture();
  await put(root, "public/images/racers/portrait.png");
  // A public copy must not substitute for private evidence.
  await put(root, "public/content/evidence/screenshots/test-evidence.png");
  await assert.rejects(checkCatalogAssets(catalog, root), missing("content/evidence/screenshots/test-evidence.png"));
  await put(root, "content/evidence/screenshots/test-evidence.png");
  await checkCatalogAssets(catalog, root);
});

test("asset checks resolve display images under public, not the repository root", async (t) => {
  const root = await mkdtemp(path.join(os.tmpdir(), "swgr-assets-"));
  t.after(() => rm(root, { recursive: true, force: true }));
  const catalog = fixture();
  await put(root, "content/evidence/screenshots/test-evidence.png");
  await put(root, "images/racers/portrait.png");
  await assert.rejects(checkCatalogAssets(catalog, root), missing("public/images/racers/portrait.png"));
  await put(root, "public/images/racers/portrait.png");
  await checkCatalogAssets(catalog, root);
});

test("readCatalog validates JSON and source references without accessing asset files", async (t) => {
  const root = await mkdtemp(path.join(os.tmpdir(), "swgr-assets-"));
  t.after(() => rm(root, { recursive: true, force: true }));
  const catalog = fixture();
  await put(root, "content/sources.json", JSON.stringify(catalog.sources));
  for (const directory of ["characters", "abilities", "vehicle-classes", "racer-styles", "parts", "build-observations", "vehicles", "tracks", "planets"]) {
    await mkdir(path.join(root, "content", directory), { recursive: true });
  }
  await put(root, "content/characters/asset-racer.json", JSON.stringify(catalog.characters[0]));
  assert.deepEqual(await readCatalog(root), catalog);
  await assert.rejects(checkCatalogAssets(await readCatalog(root), root), missing("content/evidence/screenshots/test-evidence.png"));

  catalog.characters[0].image!.sourceId = "missing-source";
  await put(root, "content/characters/asset-racer.json", JSON.stringify(catalog.characters[0]));
  await assert.rejects(readCatalog(root), /unknown source 'missing-source'/);

  await put(root, "content/characters/asset-racer.json", JSON.stringify({ ...catalog.characters[0], id: "INVALID" }));
  await assert.rejects(readCatalog(root), /lowercase kebab-case ID/);
});
