import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { createDraft } from "./schema";

/** Exclusive creation protects an existing entry from accidental overwrites. */
export async function writeDraft(root: string, kind: "character" | "ability", id: string): Promise<string> {
  // Validate before using the ID as a path segment.
  const draft = createDraft(kind, id);
  const directory = path.join(root, "content", kind === "character" ? "characters" : "abilities");
  await mkdir(directory, { recursive: true });
  const filename = path.join(directory, `${draft.id}.json`);
  await writeFile(filename, `${JSON.stringify(draft, null, 2)}\n`, { flag: "wx" });
  return filename;
}
