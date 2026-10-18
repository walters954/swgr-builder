import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { z } from "zod";
import { readCatalog } from "../src/lib/content/catalog";
import { checkCatalogAssets } from "../src/lib/content/asset-validation";
import { writeDraft } from "../src/lib/content/authoring";
import { abilitySchema, characterSchema, createDraft, racerStyleSchema, partSchema, buildObservationSchema, sourcesSchema, vehicleClassEntrySchema, vehicleSchema, trackSchema, planetSchema } from "../src/lib/content/schema";

async function main() {
  const [command, kind, id, ...extra] = process.argv.slice(2);
  if (command === "check") {
    const catalog = await readCatalog();
    if (kind === "--assets") await checkCatalogAssets(catalog);
    const entries = [...catalog.characters, ...catalog.abilities, ...catalog.vehicleClasses, ...catalog.racerStyles, ...catalog.parts, ...catalog.buildObservations, ...catalog.vehicles, ...catalog.tracks, ...catalog.planets];
    console.log(`Content valid: ${catalog.characters.length} characters, ${catalog.abilities.length} abilities, ${catalog.vehicleClasses.length} vehicle classes, ${catalog.racerStyles.length} racer styles, ${catalog.parts.length} parts, ${catalog.buildObservations.length} build observations, ${catalog.vehicles.length} vehicles, ${catalog.tracks.length} tracks, ${catalog.planets.length} planets, ${catalog.sources.length} sources (${entries.filter((entry) => entry.publication === "draft").length} drafts).`);
  } else if (command === "new" && (kind === "character" || kind === "ability") && id && !extra.length) {
    console.log(`Created draft: ${await writeDraft(process.cwd(), kind, id)}`);
  } else if (command === "schemas") {
    const directory = path.join(process.cwd(), "content", "schemas");
    const templates = path.join(process.cwd(), "content", "templates");
    await mkdir(directory, { recursive: true });
    await mkdir(templates, { recursive: true });
    for (const [name, schema] of Object.entries({ character: characterSchema, ability: abilitySchema, "vehicle-class": vehicleClassEntrySchema, "racer-style": racerStyleSchema, part: partSchema, "build-observation": buildObservationSchema, vehicle: vehicleSchema, track: trackSchema, planet: planetSchema, sources: sourcesSchema })) {
      await writeFile(path.join(directory, `${name}.schema.json`), `${JSON.stringify(z.toJSONSchema(schema), null, 2)}\n`);
    }
    for (const entity of ["character", "ability"] as const) {
      // A fixed date keeps generated templates deterministic and reviewable.
      await writeFile(path.join(templates, `${entity}.json`), `${JSON.stringify(createDraft(entity, `new-${entity}`, "2026-10-17"), null, 2)}\n`);
    }
    console.log("Generated editor schemas and draft templates.");
  } else {
    throw new Error("Usage: content.ts check | schemas | new <character|ability> <kebab-case-id>");
  }
}

main().catch((error: unknown) => {
  console.error(error instanceof Error ? error.message : error);
  process.exitCode = 1;
});
