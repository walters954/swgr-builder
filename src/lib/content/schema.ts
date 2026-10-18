import { z } from "zod";

export const idSchema = z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Use a lowercase kebab-case ID");
const text = z.string().trim().min(1);
const uniqueIds = z.array(idSchema).refine((ids) => new Set(ids).size === ids.length, "Duplicate references");

/** A claim is unknown until it has both a value and supporting evidence. */
export function claimSchema<T extends z.ZodType>(value: T) {
  const supported = <S extends string>(status: S) => z.strictObject({
    status: z.literal(status),
    value,
    sourceIds: uniqueIds.min(1),
    notes: text.optional(),
  });
  return z.discriminatedUnion("status", [
    supported("official"),
    supported("reported"),
    supported("screenshot-verified"),
    z.strictObject({
      status: z.literal("unknown"),
      value: z.null(),
      sourceIds: z.array(idSchema).length(0),
      notes: text,
    }),
  ]);
}

const sourceBase = {
  id: idSchema,
  title: text,
  accessedAt: z.iso.date(),
  notes: text.optional(),
};
const httpsUrl = z.url().refine((value) => {
  try {
    const url = new URL(value);
    return url.protocol === "https:" && !url.username && !url.password;
  } catch {
    return false;
  }
}, "Use an HTTPS URL without embedded credentials");
const assetPath = z.string().regex(/^\/images\/(?:[a-zA-Z0-9_-]+\/)*[a-zA-Z0-9_-]+\.(?:png|jpe?g|webp|avif)$/i, "Use a local /images/... asset path without traversal");
export const sourceSchema = z.discriminatedUnion("kind", [
  z.strictObject({ ...sourceBase, kind: z.literal("official"), url: httpsUrl }),
  z.strictObject({ ...sourceBase, kind: z.literal("secondary"), url: httpsUrl }),
  z.strictObject({
    ...sourceBase,
    kind: z.literal("screenshot"),
    // Evidence stays outside public/ until approved for public display.
    path: z.string().regex(/^content\/evidence\/screenshots\/[a-z0-9-]+\.(?:png|jpe?g|webp|avif)$/, "Use a local content/evidence/screenshots asset"),
    capturedAt: z.iso.date().nullable(),
    platform: text.nullable(),
    gameVersion: text.nullable(),
    language: text.nullable(),
  }),
]);
export const sourcesSchema = z.array(sourceSchema);

const imageSchema = z.strictObject({
  path: assetPath,
  alt: text,
  sourceId: idSchema,
  // A screenshot supporting a fact is not automatically cleared for public reuse.
  permission: z.enum(["pending", "approved"]),
});
const base = {
  schemaVersion: z.literal(1),
  id: idSchema,
  publication: z.enum(["draft", "published"]),
  name: claimSchema(text),
  aliases: z.array(text),
  summary: claimSchema(text),
  tags: uniqueIds,
  image: imageSchema.nullable(),
  updatedAt: z.iso.date(),
  gameVersion: text.nullable(),
  editorialNotes: text.nullable(),
};
export const modeSchema = z.enum(["campaign", "multiplayer", "scenario", "arcade", "multiplayer-tour", "podrace", "podrace-tour", "quick-podrace"]);
const mode = modeSchema;
export const vehicleClassSchema = z.enum(["landspeeder", "speeder-bike", "skim-speeder", "podracer"]);
const traitSchema = z.strictObject({ name: claimSchema(text), description: claimSchema(text) });

export const characterSchema = z.strictObject({
  ...base,
  kind: z.literal("character"),
  roles: claimSchema(z.array(z.enum(["protagonist", "mechanic", "rival", "mentor", "founder", "racer"])).min(1)),
  species: claimSchema(text),
  // null means unverified; [] means a sourced claim of no playable modes.
  playableModes: claimSchema(z.array(mode)),
  // Character-select vehicle traits are distinct from style traits and equipped abilities.
  vehicleProfiles: z.array(z.strictObject({
    id: idSchema,
    mode: claimSchema(mode),
    vehicleName: claimSchema(text),
    vehicleClass: claimSchema(vehicleClassSchema),
    description: claimSchema(text),
    traits: z.array(traitSchema),
  })).default([]),
  loadouts: z.array(z.strictObject({
    id: idSchema,
    mode,
    racerStyle: claimSchema(text),
    racerStyleDescription: claimSchema(text).optional(),
    abilityIds: claimSchema(uniqueIds),
    traits: z.array(traitSchema),
  })),
});

export const abilitySchema = z.strictObject({
  ...base,
  kind: z.literal("ability"),
  compatibleModes: claimSchema(z.array(mode)),
  compatibleVehicleClasses: claimSchema(z.array(vehicleClassSchema)),
  // Rank, rarity and variant are deliberately distinct; no assumed universal tiers.
  variants: z.array(z.strictObject({
    id: idSchema,
    rank: claimSchema(text),
    rarity: claimSchema(text),
    description: claimSchema(text),
    energyCost: claimSchema(z.number().nonnegative()),
    cooldownSeconds: claimSchema(z.number().nonnegative()),
    durationSeconds: claimSchema(z.number().nonnegative()),
    tags: uniqueIds,
  })),
});

export const vehicleClassEntrySchema = z.strictObject({
  ...base,
  kind: z.literal("vehicle-class"),
  id: vehicleClassSchema,
  availableModes: claimSchema(z.array(mode)),
  traits: z.array(traitSchema),
});

export const vehicleSchema = z.strictObject({
  ...base,
  kind: z.literal("vehicle"),
  vehicleClass: claimSchema(vehicleClassSchema),
  manufacturer: claimSchema(text),
  availableModes: claimSchema(z.array(mode)),
});

export const trackSchema = z.strictObject({
  ...base,
  kind: z.literal("track"),
  planet: claimSchema(text),
  hazards: claimSchema(z.array(text)),
  availableModes: claimSchema(z.array(mode)),
});

export const planetSchema = z.strictObject({
  ...base,
  kind: z.literal("planet"),
  environment: claimSchema(text),
});

export const racerStyleSchema = z.strictObject({
  ...base,
  kind: z.literal("racer-style"),
  rank: claimSchema(text),
  traits: z.array(traitSchema),
});

export const partSchema = z.strictObject({
  ...base,
  kind: z.literal("part"),
  variants: z.array(z.strictObject({
    id: idSchema,
    rank: claimSchema(text),
    rarity: claimSchema(text),
    description: claimSchema(text),
    priceCredits: claimSchema(z.number().int().nonnegative()).optional(),
    unlock: claimSchema(text).optional(),
  })),
});

const partReferencesSchema = z.array(z.strictObject({ partId: idSchema, variantId: idSchema }));

export const buildObservationSchema = z.strictObject({
  ...base,
  kind: z.literal("build-observation"),
  mode: claimSchema(mode),
  characterId: claimSchema(idSchema),
  vehicleClass: claimSchema(vehicleClassSchema),
  displayedSpeed: claimSchema(z.number().nonnegative()),
  racerStyleId: claimSchema(idSchema),
  equippedAbilityIds: claimSchema(uniqueIds),
  // Only known variant assignments; this is not a complete equipment list.
  equippedAbilityVariants: claimSchema(z.array(z.strictObject({ abilityId: idSchema, variantId: idSchema }))).optional(),
  installedParts: claimSchema(partReferencesSchema),
  // Reward candidates are not evidence of installed selections or occupied slots.
  offeredParts: claimSchema(partReferencesSchema).optional(),
  abilitySlots: claimSchema(z.number().int().nonnegative()),
  crashAbilitySlots: claimSchema(z.number().int().nonnegative()),
  partSlots: claimSchema(z.number().int().nonnegative()),
  installedPartCount: claimSchema(z.number().int().nonnegative()),
});

export type RacerStyle = z.infer<typeof racerStyleSchema>;
export type Part = z.infer<typeof partSchema>;
export type BuildObservation = z.infer<typeof buildObservationSchema>;
export type VehicleClassEntry = z.infer<typeof vehicleClassEntrySchema>;
export type Character = z.infer<typeof characterSchema>;
export type Ability = z.infer<typeof abilitySchema>;
export type Source = z.infer<typeof sourceSchema>;
export type Vehicle = z.infer<typeof vehicleSchema>;
export type Track = z.infer<typeof trackSchema>;
export type Planet = z.infer<typeof planetSchema>;
export type Entry = Vehicle | Track | Planet | Character | Ability | VehicleClassEntry | RacerStyle | Part | BuildObservation;
export type Claim<T> =
  | { status: "official" | "reported" | "screenshot-verified"; value: T; sourceIds: string[]; notes?: string }
  | { status: "unknown"; value: null; sourceIds: string[]; notes: string };

export function unknownClaim(notes = "Awaiting source or screenshot verification.") {
  return { status: "unknown" as const, value: null, sourceIds: [] as [], notes };
}

/** New entries are drafts, with no invented gameplay facts. */
export function createDraft(kind: "character" | "ability", id: string, date = new Date().toISOString().slice(0, 10)): Entry {
  const common = {
    schemaVersion: 1,
    id,
    publication: "draft",
    name: unknownClaim("Add the exact name and its supporting source."),
    aliases: [],
    summary: unknownClaim(),
    tags: [],
    image: null,
    updatedAt: date,
    gameVersion: null,
    editorialNotes: null,
  };
  return kind === "character"
    ? characterSchema.parse({ ...common, kind, roles: unknownClaim(), species: unknownClaim(), playableModes: unknownClaim(), loadouts: [] })
    : abilitySchema.parse({ ...common, kind, compatibleModes: unknownClaim(), compatibleVehicleClasses: unknownClaim(), variants: [] });
}
