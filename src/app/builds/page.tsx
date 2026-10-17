import { Suspense } from "react";
import SavedBuilds from "@/components/saved-builds";
import { getPublicCatalog } from "@/lib/content/public";

async function LocalLibrary() {
  const catalog = await getPublicCatalog();
  return <SavedBuilds catalog={catalog} />;
}
export default function BuildsPage() {
  return <Suspense fallback={<div className="panel p-8" role="status">Loading local workspace…</div>}><LocalLibrary /></Suspense>;
}
