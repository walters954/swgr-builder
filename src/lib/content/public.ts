import { readCatalog } from "./catalog";
import type { Ability, Character, Part, RacerStyle, VehicleClassEntry, Source } from "./schema";

export interface PublicCatalog {
  characters: Character[];
  abilities: Ability[];
  parts: Part[];
  racerStyles: RacerStyle[];
  vehicleClasses: VehicleClassEntry[];
  sources: { id: string; title: string; kind: Source["kind"]; url?: string }[];
}

/** Cache source-controlled reference content; never serialize private evidence paths. */
export async function getPublicCatalog(): Promise<PublicCatalog> {
  "use cache";
  const catalog = await readCatalog();
  const published = <T extends { publication: string }>(entries: T[]) => entries.filter((entry) => entry.publication === "published");
  return {
    characters: published(catalog.characters),
    abilities: published(catalog.abilities),
    parts: published(catalog.parts),
    racerStyles: published(catalog.racerStyles),
    vehicleClasses: published(catalog.vehicleClasses),
    sources: catalog.sources.map((source) => ({ id: source.id, title: source.title, kind: source.kind, ...("url" in source ? { url: source.url } : {}) })),
  };
}
