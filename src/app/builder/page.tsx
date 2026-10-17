import { Suspense } from "react";
import BuildPlanner from "@/components/build-planner";
import { getPublicCatalog } from "@/lib/content/public";

async function Workspace() {
  const catalog = await getPublicCatalog();
  return <BuildPlanner catalog={catalog} />;
}
export default function BuilderPage() {
  return <Suspense fallback={<div className="panel p-8" role="status">Loading your planning workspace…</div>}><Workspace /></Suspense>;
}
