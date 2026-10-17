import { z } from "zod";
import { idSchema, modeSchema, vehicleClassSchema } from "../content/schema";
export { modeSchema } from "../content/schema";

// All length limits below are application payload guardrails, not game rules.
const stableId = idSchema.max(128);
const positiveInteger = z.number().int().positive();
const partSelectionSchema = z.strictObject({ partId: stableId, variantId: stableId });
const abilitySelectionSchema = z.strictObject({
  abilityId: stableId,
  variantId: stableId.nullable(),
});

/** A complete desired snapshot, never a list of additions to an earlier round. */
export const roundLoadoutSchema = z.strictObject({
  parts: z.array(partSelectionSchema).max(1000),
  abilities: z.array(z.strictObject({
    ...abilitySelectionSchema.shape,
    slot: positiveInteger,
  })).max(1000),
  crashAbility: abilitySelectionSchema.nullable(),
}).superRefine((target, ctx) => {
  const families = new Set<string>();
  target.parts.forEach(({ partId }, index) => {
    if (families.has(partId)) {
      ctx.addIssue({ code: "custom", path: ["parts", index, "partId"], message: "Duplicate part family" });
    }
    families.add(partId);
  });
  const slots = new Set<number>();
  target.abilities.forEach(({ slot }, index) => {
    if (slots.has(slot)) {
      ctx.addIssue({ code: "custom", path: ["abilities", index, "slot"], message: "Duplicate ability slot" });
    }
    slots.add(slot);
  });
});
export type RoundLoadout = z.infer<typeof roundLoadoutSchema>;

/** User-authored intent, not a sourced observation, legality check, or ownership claim. */
export const buildPlanSchema = z.strictObject({
  schemaVersion: z.literal(1),
  title: z.string().trim().min(1).max(160),
  description: z.string().trim().max(5000),
  mode: modeSchema.nullable(),
  characterId: stableId.nullable(),
  vehicleClass: vehicleClassSchema.nullable(),
  racerStyleId: stableId.nullable(),
  visibility: z.enum(["private", "unlisted", "public"]).default("private"),
  gameVersion: z.string().trim().min(1).max(128).nullable(),
  rounds: z.array(z.strictObject({
    round: positiveInteger,
    label: z.string().trim().min(1).max(160).optional(),
    notes: z.string().trim().max(5000),
    target: roundLoadoutSchema,
  })).min(1).max(100),
}).superRefine(({ rounds }, ctx) => {
  rounds.forEach(({ round }, index) => {
    if (index > 0 && round <= rounds[index - 1].round) {
      ctx.addIssue({ code: "custom", path: ["rounds", index, "round"], message: "Round numbers must be strictly increasing" });
    }
  });
});
export type BuildPlan = z.infer<typeof buildPlanSchema>;

export interface RoundLoadoutDiff {
  addedParts: RoundLoadout["parts"];
  removedParts: RoundLoadout["parts"];
  changedParts: { partId: string; fromVariantId: string; toVariantId: string }[];
}

/** Compare validated snapshots by family and exact variant ID, with no rank ordering.
 * null represents an empty starting loadout. Results are fresh objects, not merged state.
 */
export function diffRoundLoadouts(previous: RoundLoadout | null, next: RoundLoadout): RoundLoadoutDiff {
  const before = new Map((previous?.parts ?? []).map((part) => [part.partId, part]));
  const after = new Map(next.parts.map((part) => [part.partId, part]));
  const result: RoundLoadoutDiff = { addedParts: [], removedParts: [], changedParts: [] };
  for (const part of next.parts) {
    const old = before.get(part.partId);
    if (!old) result.addedParts.push({ ...part });
    else if (old.variantId !== part.variantId) {
      result.changedParts.push({ partId: part.partId, fromVariantId: old.variantId, toVariantId: part.variantId });
    }
  }
  for (const part of previous?.parts ?? []) {
    if (!after.has(part.partId)) result.removedParts.push({ ...part });
  }
  return result;
}
