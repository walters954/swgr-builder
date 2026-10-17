"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowUpRight, FolderOpen, Plus, Trash2 } from "lucide-react";
import type { PublicCatalog } from "@/lib/content/public";
import { deleteSavedBuild, readSavedBuilds, STORAGE_EVENT, type StorageResult } from "@/lib/builds/browser-storage";

export default function SavedBuilds({ catalog }: { catalog: PublicCatalog }) {
  const [data, setData] = useState<StorageResult>({ records: [], error: null });
  const [ready, setReady] = useState(false);
  useEffect(() => {
    const refresh = () => { setData(readSavedBuilds()); setReady(true); };
    const timer = window.setTimeout(refresh, 0);
    window.addEventListener("storage", refresh);
    window.addEventListener(STORAGE_EVENT, refresh);
    return () => { clearTimeout(timer); window.removeEventListener("storage", refresh); window.removeEventListener(STORAGE_EVENT, refresh); };
  }, []);
  return <div className="space-y-6 text-[#173e43]">
    <p className="rounded-xl border border-stone-200 bg-white p-3 text-sm">Local workspace · account sync not configured</p>
    <header className="flex flex-wrap items-end justify-between gap-4"><div><p className="eyebrow">Your garage</p><h1 className="page-heading">Saved builds</h1><p className="mt-2 text-stone-600">Round-by-round plans, stored only in this browser. Clearing site data removes them.</p></div><Link className="btn-primary inline-flex items-center gap-2" href="/builder"><Plus size={16} />New build</Link></header>
    {data.error && <p role="alert" className="rounded-xl border border-orange-300 bg-orange-50 p-4">{data.error}</p>}
    {!ready ? <p role="status">Reading browser storage…</p> : !data.records.length ? <div className="empty-state panel p-10"><FolderOpen className="mb-4" size={32} /><h2 className="text-xl font-semibold">A clean starting grid</h2><p className="my-3">No local plans yet. Start with an empty round and make it yours.</p><Link href="/builder" className="btn-primary">Create your first build</Link></div> : <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">{data.records.map(({ id, updatedAt, plan }) => {
      const racer = catalog.characters.find((entry) => entry.id === plan.characterId);
      return <article className="panel flex flex-col gap-4 p-6" key={id}><div className="flex items-center justify-between"><span className="tag">Local only</span><span className="text-xs text-stone-500">{plan.rounds.length} rounds</span></div><h2 className="text-xl font-semibold break-words">{plan.title}</h2><p className="text-sm text-stone-600">{plan.characterId ? racer?.name.value ?? `Unavailable racer: ${plan.characterId}` : "Racer not selected"} · {plan.mode ?? "Mode not selected"}</p>{plan.description && <p className="line-clamp-3 text-sm">{plan.description}</p>}<p className="mt-auto text-xs text-stone-500">Saved {new Date(updatedAt).toLocaleString()}</p><div className="flex items-center justify-between"><Link className="btn-secondary inline-flex items-center gap-2" href={`/builder#local=${encodeURIComponent(id)}`}>Open editor<ArrowUpRight size={16} /></Link><button aria-label={`Delete ${plan.title}`} className="rounded-lg p-3 hover:bg-orange-50" onClick={() => {
        if (!window.confirm(`Delete “${plan.title}” from this browser? This cannot be undone.`)) return;
        try { deleteSavedBuild(id); } catch (error) { setData((old) => ({ ...old, error: error instanceof Error ? error.message : "Delete failed." })); }
      }}><Trash2 size={17} /></button></div></article>;
    })}</div>}
  </div>;
}
