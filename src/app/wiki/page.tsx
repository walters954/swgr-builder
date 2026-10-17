import { Suspense } from "react";
import { WikiCatalog } from "@/components/wiki-catalog";
import { getPublicCatalog } from "@/lib/content/public";

async function WikiContent() {
  const catalog = await getPublicCatalog();
  return <WikiCatalog catalog={catalog} />;
}

export default function WikiPage() {
  return (
    <div className="space-y-8">
      <header className="page-heading">
        <p className="eyebrow">The racing reference</p>
        <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">Explore the wiki</h1>
        <p className="mt-4 max-w-2xl text-base text-stone-600">Find racers, parts, and abilities. Compare the documented details, follow the evidence, and take your next idea to the builder.</p>
      </header>
      <Suspense fallback={<div className="panel p-8" role="status">Loading the published catalog…</div>}>
        <WikiContent />
      </Suspense>
    </div>
  );
}
