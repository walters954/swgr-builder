import assert from "node:assert/strict";
import test from "node:test";
import { buildPlanSchema } from "../src/lib/builds/plan";
import { buildShareUrl, decodeBuildPlan, encodeBuildPlan, MAX_ENCODED_LENGTH } from "../src/lib/builds/share";
import { deleteSavedBuild, readSavedBuilds, saveBuild, STORAGE_KEY } from "../src/lib/builds/browser-storage";

const plan = () => buildPlanSchema.parse({ schemaVersion: 1, title: "Étoile 🚀", description: "日本語 · café", mode: null, characterId: null, vehicleClass: null, racerStyleId: null, visibility: "private", gameVersion: null, rounds: [{ round: 1, notes: "Complete snapshot", target: { parts: [{ partId: "deleted-part", variantId: "unknown-rank" }], abilities: [{ abilityId: "boost", variantId: null, slot: 9 }], crashAbility: { abilityId: "crash", variantId: "rank-one" } } }] });
function memory() { const values = new Map<string, string>(); return { getItem: (key: string) => values.get(key) ?? null, setItem: (key: string, value: string) => { values.set(key, value); } }; }
test("UTF-8 base64url roundtrip exports unlisted without mutating private original", () => {
  const original = plan(); const token = encodeBuildPlan(original);
  assert.match(token, /^[A-Za-z0-9_-]+$/);
  assert.deepEqual(decodeBuildPlan(token), { ...original, visibility: "unlisted" });
  assert.equal(original.visibility, "private");
  const url = new URL(buildShareUrl(original, "https://example.com"));
  assert.equal(url.pathname, "/builder"); assert.equal(url.search, ""); assert.equal(url.hash, `#plan=${token}`);
});
test("reject malformed, wrong schema, invalid UTF-8 and oversized links", () => {
  for (const token of ["", "%bad", "a", "_w", btoa("{}"), btoa(JSON.stringify({ ...plan(), title: "ASCII", description: "", schemaVersion: 9 })), "a".repeat(MAX_ENCODED_LENGTH + 1)]) assert.throws(() => decodeBuildPlan(token));
  const big = plan(); big.rounds = Array.from({ length: 10 }, (_, index) => ({ ...structuredClone(big.rounds[0]), round: index + 1, notes: "界".repeat(5000) }));
  assert.throws(() => encodeBuildPlan(big), /too large/);
});
test("local save, replace and delete preserve validated snapshots", () => {
  const storage = memory(); const first = saveBuild(plan(), "local-one", storage);
  assert.equal(first.id, "local-one"); assert.equal(readSavedBuilds(storage).records.length, 1);
  saveBuild({ ...plan(), title: "Revised" }, first.id, storage);
  assert.equal(readSavedBuilds(storage).records[0].plan.title, "Revised");
  assert.equal(readSavedBuilds(storage).records[0].plan.rounds[0].target.parts[0].partId, "deleted-part");
  deleteSavedBuild(first.id, storage); assert.deepEqual(readSavedBuilds(storage).records, []);
});
test("malformed records and blocked storage fail safely without overwriting", () => {
  const storage = memory(); storage.setItem(STORAGE_KEY, "not json");
  assert.ok(readSavedBuilds(storage).error); assert.throws(() => saveBuild(plan(), "new", storage)); assert.equal(storage.getItem(STORAGE_KEY), "not json");
  storage.setItem(STORAGE_KEY, JSON.stringify([{ id: "bad" }])); assert.ok(readSavedBuilds(storage).error);
  const blocked = { getItem: () => { throw new Error("blocked"); }, setItem: () => { throw new Error("blocked"); } };
  assert.ok(readSavedBuilds(blocked).error); assert.throws(() => saveBuild(plan(), "new", blocked));
  const full = { getItem: () => null, setItem: () => { throw new Error("quota"); } };
  assert.throws(() => saveBuild(plan(), "new", full), /blocked or full/);
});
