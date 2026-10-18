import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { sourcesSchema, type Source } from "../src/lib/content/schema";

async function main() {
  const root = process.cwd();
  const registry = path.join(root, "content/sources.json");
  const sources = sourcesSchema.parse(JSON.parse(await readFile(registry, "utf8")));
  const byId = new Map<string, Source>(sources.map((source) => [source.id, source]));
  let added = 0;
  for (const filename of ["gameslantern-parts-sources.json", "gameslantern-loadouts-sources.json", "world-sources.json"]) {
    const incoming = sourcesSchema.parse(JSON.parse(await readFile(path.join(root, "content/imports", filename), "utf8")));
    for (const source of incoming) {
      const existing = byId.get(source.id);
      if (existing && (existing.kind !== source.kind || ("url" in existing && "url" in source && existing.url !== source.url))) {
        throw new Error(`Conflicting source identity '${source.id}' in ${filename}; existing source was not overwritten.`);
      }
      if (!existing) { byId.set(source.id, source); added++; }
    }
  }
  await writeFile(registry, `${JSON.stringify([...byId.values()], null, 2)}\n`);
  console.log(`Merged ${added} new source records; ${byId.size} total. Existing source records retained.`);
}
main().catch((error: unknown) => { console.error(error instanceof Error ? error.message : error); process.exitCode = 1; });
