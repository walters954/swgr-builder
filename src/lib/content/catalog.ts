// Node-only loader: import from Server Components, scripts, or tests, not client components.
import { readFile, readdir } from "node:fs/promises";
import path from "node:path";
import { vehicleSchema, trackSchema, planetSchema, type Vehicle, type Track, type Planet, abilitySchema, characterSchema, sourcesSchema, vehicleClassEntrySchema, racerStyleSchema, partSchema, buildObservationSchema, type RacerStyle, type Part, type BuildObservation, type Ability, type Character, type Entry, type Source, type VehicleClassEntry } from "./schema";

export class ContentValidationError extends Error {
  constructor(public readonly issues: string[]) {
    super(`Content validation failed:\n${issues.map((issue) => `- ${issue}`).join("\n")}`);
    this.name = "ContentValidationError";
  }
}

export interface Catalog {
  sources: Source[];
  vehicles: Vehicle[];
  tracks: Track[];
  planets: Planet[];
  characters: Character[];
  abilities: Ability[];
  vehicleClasses: VehicleClassEntry[];
  racerStyles: RacerStyle[];
  parts: Part[];
  buildObservations: BuildObservation[];
}

/** Validate relationships in addition to the per-file Zod schemas. */
export function validateCatalog(input: { sources: unknown; vehicles?: unknown[]; tracks?: unknown[]; planets?: unknown[]; characters: unknown[]; abilities: unknown[]; vehicleClasses?: unknown[]; racerStyles?: unknown[]; parts?: unknown[]; buildObservations?: unknown[] }): Catalog {
  const sources = sourcesSchema.parse(input.sources);
  const characters = input.characters.map((entry) => characterSchema.parse(entry));
  const abilities = input.abilities.map((entry) => abilitySchema.parse(entry));
  const vehicleClasses = (input.vehicleClasses ?? []).map((entry) => vehicleClassEntrySchema.parse(entry));
  const racerStyles = (input.racerStyles ?? []).map((entry) => racerStyleSchema.parse(entry));
  const parts = (input.parts ?? []).map((entry) => partSchema.parse(entry));
  const buildObservations = (input.buildObservations ?? []).map((entry) => buildObservationSchema.parse(entry));
  const vehicles = (input.vehicles ?? []).map((entry) => vehicleSchema.parse(entry));
  const tracks = (input.tracks ?? []).map((entry) => trackSchema.parse(entry));
  const planets = (input.planets ?? []).map((entry) => planetSchema.parse(entry));
  const issues: string[] = [];
  for (const [label, entries] of [["vehicle", vehicles], ["track", tracks], ["planet", planets], ["source", sources], ["character", characters], ["ability", abilities], ["vehicle class", vehicleClasses], ["racer style", racerStyles], ["part", parts], ["build observation", buildObservations]] as const) {
    const seen = new Set<string>();
    for (const entry of entries) {
      if (seen.has(entry.id)) issues.push(`Duplicate ${label} ID: ${entry.id}`);
      seen.add(entry.id);
    }
  }
  const sourceById = new Map(sources.map((source) => [source.id, source]));
  const abilityById = new Map(abilities.map((ability) => [ability.id, ability]));

  const characterById = new Map(characters.map((entry) => [entry.id, entry]));
  const racerStyleById = new Map(racerStyles.map((entry) => [entry.id, entry]));
  const partById = new Map(parts.map((entry) => [entry.id, entry]));

  function checkClaims(value: unknown, location: string): void {
    if (!value || typeof value !== "object") return;
    if (Array.isArray(value)) {
      value.forEach((item, index) => checkClaims(item, `${location}[${index}]`));
      return;
    }
    const record = value as Record<string, unknown>;
    if (typeof record.status === "string" && Array.isArray(record.sourceIds)) {
      const ids = record.sourceIds as string[];
      for (const id of ids) {
        if (!sourceById.has(id)) issues.push(`${location}: unknown source '${id}'`);
      }
      const sourceKinds: Record<string, Source["kind"]> = { official: "official", reported: "secondary", "screenshot-verified": "screenshot" };
      const requiredKind = sourceKinds[record.status];
      if (requiredKind && !ids.some((id) => sourceById.get(id)?.kind === requiredKind)) {
        issues.push(`${location}: '${record.status}' requires a ${requiredKind} source`);
      }
    }
    for (const [key, child] of Object.entries(record)) checkClaims(child, `${location}.${key}`);
  }

  function checkEntry(entry: Entry): void {
    const location = `${entry.kind}/${entry.id}`;
    checkClaims(entry, location);
    if (entry.publication === "published") {
      if (entry.name.status === "unknown" || entry.summary.status === "unknown") {
        issues.push(`${location}: published entries need sourced names and summaries`);
      }
      if (entry.image?.permission === "pending") issues.push(`${location}: image permission is still pending`);
    }
    if (entry.image && !sourceById.has(entry.image.sourceId)) issues.push(`${location}.image: unknown source '${entry.image.sourceId}'`);
    const childGroups: Record<string, { id: string }[]> = entry.kind === "character"
      ? { loadout: entry.loadouts, "vehicle profile": entry.vehicleProfiles }
      : (entry.kind === "ability" || entry.kind === "part") ? { variant: entry.variants } : {};
    for (const [label, children] of Object.entries(childGroups)) {
      if (new Set(children.map((child) => child.id)).size !== children.length) issues.push(`${location}: duplicate ${label} IDs`);
    }
    if (entry.kind === "vehicle" && entry.vehicleClass.value !== null && !vehicleClasses.some((vehicleClass) => vehicleClass.id === entry.vehicleClass.value)) {
      issues.push(`${location}.vehicleClass: unknown vehicle class '${entry.vehicleClass.value}'`);
    }
    // Track.planet is a sourced display name, not an ID reference; do not turn
    // third-party spelling differences into invented relationships.
    if (entry.kind === "build-observation") {
      if (entry.characterId.value !== null && !characterById.has(entry.characterId.value)) {
        issues.push(`${location}.characterId: unknown character '${entry.characterId.value}'`);
      }
      if (entry.racerStyleId.value !== null && !racerStyleById.has(entry.racerStyleId.value)) {
        issues.push(`${location}.racerStyleId: unknown racer style '${entry.racerStyleId.value}'`);
      }
      for (const id of entry.equippedAbilityIds.value ?? []) {
        if (!abilityById.has(id)) issues.push(`${location}.equippedAbilityIds: unknown ability '${id}'`);
      }
      for (const { abilityId, variantId } of entry.equippedAbilityVariants?.value ?? []) {
        const ability = abilityById.get(abilityId);
        if (!ability) issues.push(`${location}.equippedAbilityVariants: unknown ability '${abilityId}'`);
        else if (!ability.variants.some((variant) => variant.id === variantId)) {
          issues.push(`${location}.equippedAbilityVariants: unknown variant '${variantId}' for ability '${abilityId}'`);
        }
        if (entry.equippedAbilityIds.value !== null && !entry.equippedAbilityIds.value.includes(abilityId)) {
          issues.push(`${location}.equippedAbilityVariants: ability '${abilityId}' is not in equippedAbilityIds`);
        }
      }
      for (const field of ["installedParts", "offeredParts"] as const) {
        for (const { partId, variantId } of entry[field]?.value ?? []) {
          const part = partById.get(partId);
          if (!part) issues.push(`${location}.${field}: unknown part '${partId}'`);
          else if (!part.variants.some((variant) => variant.id === variantId)) {
            issues.push(`${location}.${field}: unknown variant '${variantId}' for part '${partId}'`);
          }
        }
      }
    }
    if (entry.kind === "character") {
      for (const loadout of entry.loadouts) {
        for (const id of loadout.abilityIds.value ?? []) {
          const ability = abilityById.get(id);
          if (!ability) issues.push(`${location}.${loadout.id}: unknown ability '${id}'`);
          else if (entry.publication === "published" && ability.publication !== "published") {
            issues.push(`${location}.${loadout.id}: published loadouts cannot reference draft ability '${id}'`);
          }
        }
      }
    }
  }
  [...vehicles, ...tracks, ...planets, ...characters, ...abilities, ...vehicleClasses, ...racerStyles, ...parts, ...buildObservations].forEach(checkEntry);
  if (issues.length) throw new ContentValidationError(issues);
  return { sources, vehicles, tracks, planets, characters, abilities, vehicleClasses, racerStyles, parts, buildObservations };
}

/** Validate JSON schemas and references only; asset existence is checked by the CLI. */
export async function readCatalog(root = process.cwd()): Promise<Catalog> {
  const contentRoot = path.join(root, "content");
  async function json(relativePath: string): Promise<unknown> {
    try {
      return JSON.parse(await readFile(path.join(contentRoot, relativePath), "utf8"));
    } catch (error) {
      throw new ContentValidationError([`${relativePath}: ${error instanceof Error ? error.message : String(error)}`]);
    }
  }
  const schemas = { vehicles: vehicleSchema, tracks: trackSchema, planets: planetSchema, characters: characterSchema, abilities: abilitySchema, "vehicle-classes": vehicleClassEntrySchema, "racer-styles": racerStyleSchema, parts: partSchema, "build-observations": buildObservationSchema };
  async function entries(directory: keyof typeof schemas) {
    const files = (await readdir(path.join(contentRoot, directory))).filter((file) => file.endsWith(".json")).sort();
    return Promise.all(files.map(async (file) => {
      const value = await json(`${directory}/${file}`);
      const schema = schemas[directory];
      const result = schema.safeParse(value);
      if (!result.success) throw new ContentValidationError([`${directory}/${file}: ${result.error.message}`]);
      if (file !== `${result.data.id}.json`) throw new ContentValidationError([`${directory}/${file}: filename must match ID '${result.data.id}'`]);
      return result.data;
    }));
  }
  const [sources, vehicles, tracks, planets, characters, abilities, vehicleClasses, racerStyles, parts, buildObservations] = await Promise.all([json("sources.json"), entries("vehicles"), entries("tracks"), entries("planets"), entries("characters"), entries("abilities"), entries("vehicle-classes"), entries("racer-styles"), entries("parts"), entries("build-observations")]);
  return validateCatalog({ sources, vehicles, tracks, planets, characters, abilities, vehicleClasses, racerStyles, parts, buildObservations });
}

/** Drafts are excluded by default; observations require an explicit kind filter. */
export function queryCatalog(catalog: Catalog, options: { kind?: Entry["kind"]; search?: string; tag?: string; includeDrafts?: boolean } = {}): Entry[] {
  const query = options.search?.trim().toLowerCase();
  return [...catalog.vehicles, ...catalog.tracks, ...catalog.planets, ...catalog.characters, ...catalog.abilities, ...catalog.vehicleClasses, ...catalog.racerStyles, ...catalog.parts, ...catalog.buildObservations]
    .filter((entry) => entry.kind !== "build-observation" || options.kind === "build-observation")
    .filter((entry) => options.includeDrafts || entry.publication === "published")
    .filter((entry) => !options.kind || entry.kind === options.kind)
    .filter((entry) => !options.tag || entry.tags.includes(options.tag))
    .filter((entry) => !query || [entry.id, entry.name.value, entry.summary.value, ...entry.aliases, ...entry.tags].filter(Boolean).join(" ").toLowerCase().includes(query))
    .sort((a, b) => (a.name.value ?? a.id).localeCompare(b.name.value ?? b.id));
}

export function findEntry(catalog: Catalog, kind: Entry["kind"], id: string, includeDrafts = false): Entry | undefined {
  return queryCatalog(catalog, { kind, includeDrafts }).find((entry) => entry.id === id);
}
