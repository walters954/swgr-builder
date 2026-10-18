// CLI-only: do not import into the runtime catalog loader or public UI helpers.
import { access } from "node:fs/promises";
import path from "node:path";
import { ContentValidationError, type Catalog } from "./catalog";

/** Check local files after readCatalog has validated asset paths and references. */
export async function checkCatalogAssets(catalog: Catalog, root = process.cwd()): Promise<void> {
  const assets = new Set<string>();
  for (const source of catalog.sources) {
    // Evidence paths are repository-relative and remain private, outside public/.
    if (source.kind === "screenshot") assets.add(source.path);
  }
  for (const entry of [...catalog.characters, ...catalog.abilities, ...catalog.vehicleClasses, ...catalog.racerStyles, ...catalog.parts, ...catalog.buildObservations, ...catalog.vehicles, ...catalog.tracks, ...catalog.planets]) {
    // Display image paths are URL-relative; their files live under public/.
    if (entry.image) assets.add(`public${entry.image.path}`);
  }
  for (const asset of assets) {
    try {
      await access(path.join(root, asset));
    } catch {
      throw new ContentValidationError([`Missing image asset: ${asset}`]);
    }
  }
}
