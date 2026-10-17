import { z } from "zod";
import { buildPlanSchema, type BuildPlan } from "./plan";

export const STORAGE_KEY = "swgr.local-builds.v1";
export const STORAGE_EVENT = "swgr-builds-changed";
const recordSchema = z.strictObject({ id: z.string().min(1).max(128), updatedAt: z.iso.datetime(), plan: buildPlanSchema });
export type SavedRecord = z.infer<typeof recordSchema>;
export type StorageResult = { records: SavedRecord[]; error: string | null };
type StorageLike = Pick<Storage, "getItem" | "setItem">;
export function readSavedBuilds(storage?: StorageLike): StorageResult {
  try {
    const raw = (storage ?? window.localStorage).getItem(STORAGE_KEY);
    if (!raw) return { records: [], error: null };
    const value: unknown = JSON.parse(raw);
    if (!Array.isArray(value)) throw new Error("Invalid collection");
    const records: SavedRecord[] = [];
    let invalid = false;
    for (const item of value) {
      const parsed = recordSchema.safeParse(item);
      if (parsed.success && !records.some((record) => record.id === parsed.data.id)) records.push(parsed.data);
      else invalid = true;
    }
    return { records, error: invalid ? "Some malformed local records were skipped. Existing browser data has not been changed." : null };
  } catch { return { records: [], error: "Local builds could not be read. Browser storage may be blocked or damaged." }; }
}
function write(records: SavedRecord[], storage?: StorageLike) {
  try { (storage ?? window.localStorage).setItem(STORAGE_KEY, JSON.stringify(records)); }
  catch { throw new Error("Could not save local builds. Browser storage may be blocked or full. Your editor changes are still here."); }
  if (!storage && typeof window !== "undefined") window.dispatchEvent(new Event(STORAGE_EVENT));
}
export function saveBuild(plan: BuildPlan, id?: string, storage?: StorageLike): SavedRecord {
  const current = readSavedBuilds(storage);
  if (current.error) throw new Error(`${current.error} Save was stopped to avoid overwriting damaged data. You can still share this plan.`);
  const record = recordSchema.parse({ id: id ?? crypto.randomUUID(), updatedAt: new Date().toISOString(), plan });
  write([record, ...current.records.filter((item) => item.id !== record.id)], storage);
  return record;
}
export function deleteSavedBuild(id: string, storage?: StorageLike): void {
  const current = readSavedBuilds(storage);
  if (current.error) throw new Error(current.error);
  write(current.records.filter((item) => item.id !== id), storage);
}
