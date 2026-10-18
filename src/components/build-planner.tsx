"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import GameCard from "@/components/game-card";
import { Copy, Plus, Save, Search, Share2, Trash2, Wrench, Zap } from "lucide-react";
import type { PublicCatalog } from "@/lib/content/public";
import { buildPlanSchema, diffRoundLoadouts, modeSchema, type BuildPlan, type RoundLoadout } from "@/lib/builds/plan";
import { readSavedBuilds, saveBuild } from "@/lib/builds/browser-storage";
import { buildShareUrl, decodeBuildPlan } from "@/lib/builds/share";

const freshPlan = (): BuildPlan => ({ schemaVersion: 1, title: "Untitled build", description: "", mode: null, characterId: null, racerStyleId: null, vehicleClass: null, visibility: "private", gameVersion: null, rounds: [{ round: 1, notes: "", target: { parts: [], abilities: [], crashAbility: null } }] });
const field = "w-full rounded-lg border border-stone-300 bg-white px-3 py-2 text-sm focus:outline-2 focus:outline-[#ee7446]";
type Named = { id: string; name: { value: string | null } };
const nameOf = (items: readonly Named[], id: string) => items.find((item) => item.id === id)?.name.value ?? id;

export default function BuildPlanner({ catalog }: { catalog: PublicCatalog }) {
  const [plan, setPlan] = useState<BuildPlan>(freshPlan);
  const [active, setActive] = useState(0);
  const [localId, setLocalId] = useState<string>();
  const [notice, setNotice] = useState("");
  const [shareLink, setShareLink] = useState("");
  const [search, setSearch] = useState("");
  const [importLink, setImportLink] = useState("");
  const [tab, setTab] = useState<"parts" | "abilities">("parts");
  const [equipmentLimit, setEquipmentLimit] = useState(24);
  useEffect(() => {
    const load = () => {
      try {
        const params = new URLSearchParams(window.location.hash.slice(1));
        const token = params.get("plan");
        const id = params.get("local");
        if (token !== null) {
          setPlan(decodeBuildPlan(token)); setLocalId(undefined); setActive(0); setShareLink("");
          setNotice("Imported shared plan. Edit freely; saving creates your own local copy.");
        } else if (id) {
          const data = readSavedBuilds();
          const record = data.records.find((item) => item.id === id);
          if (!record) throw new Error(data.error ?? "That local build is missing from this browser.");
          setPlan(record.plan); setLocalId(record.id); setActive(0); setShareLink(""); setNotice(data.error ?? "Loaded local build.");
        }
      } catch (error) { setNotice(error instanceof Error ? error.message : "Could not import plan."); }
    };
    const timer = window.setTimeout(load, 0);
    window.addEventListener("hashchange", load);
    return () => { clearTimeout(timer); window.removeEventListener("hashchange", load); };
  }, []);
  const round = plan.rounds[active];
  const target = round.target;
  const update = (patch: Partial<BuildPlan>) => { setPlan((old) => ({ ...old, ...patch })); setShareLink(""); };
  const updateRound = (patch: Partial<BuildPlan["rounds"][number]>) => update({ rounds: plan.rounds.map((item, index) => index === active ? { ...item, ...patch } : item) });
  const updateTarget = (patch: Partial<RoundLoadout>) => updateRound({ target: { ...target, ...patch } });
  const appendRound = (duplicate: boolean) => {
    if (plan.rounds.length >= 100) return;
    const rounds = [...plan.rounds];
    const index = duplicate ? active + 1 : rounds.length;
    const prior = duplicate ? round : rounds[rounds.length - 1];
    rounds.splice(index, 0, { ...structuredClone(prior), notes: duplicate ? prior.notes : "", label: undefined });
    update({ rounds: rounds.map((item, i) => ({ ...item, round: i + 1 })) }); setActive(index);
  };
  const diff = diffRoundLoadouts(active ? plan.rounds[active - 1].target : null, target);
  const missing: string[] = [];
  for (const [id, items, label] of [[plan.characterId, catalog.characters, "Racer"], [plan.racerStyleId, catalog.racerStyles, "Style"], [plan.vehicleClass, catalog.vehicleClasses, "Class"]] as const) {
    if (id && !items.some((item) => item.id === id)) missing.push(`${label}: ${id}`);
  }
  plan.rounds.forEach((stage) => {
    stage.target.parts.forEach((selection) => {
      const part = catalog.parts.find((item) => item.id === selection.partId);
      if (!part || !part.variants.some((variant) => variant.id === selection.variantId)) missing.push(`Round ${stage.round}: part ${selection.partId} / ${selection.variantId}`);
    });
    [...stage.target.abilities, ...(stage.target.crashAbility ? [stage.target.crashAbility] : [])].forEach((selection) => {
      const ability = catalog.abilities.find((item) => item.id === selection.abilityId);
      if (!ability || (selection.variantId && !ability.variants.some((variant) => variant.id === selection.variantId))) missing.push(`Round ${stage.round}: ability ${selection.abilityId} / ${selection.variantId ?? "unspecified"}`);
    });
  });
  function contextSelect(label: string, value: string | null, entries: readonly Named[], change: (id: string | null) => void) {
    return <label className="space-y-1 text-xs font-medium">{label}<select className={field} value={value ?? ""} onChange={(event) => change(event.target.value || null)}><option value="">Not selected</option>{value && !entries.some((item) => item.id === value) && <option value={value}>Unavailable: {value}</option>}{entries.map((item) => <option key={item.id} value={item.id}>{item.name.value ?? item.id}</option>)}</select></label>;
  }
  function abilityEditor(selection: RoundLoadout["crashAbility"], onChange: (value: RoundLoadout["crashAbility"]) => void, label: string) {
    const ability = catalog.abilities.find((item) => item.id === selection?.abilityId);
    const variant = ability?.variants.find((item) => item.id === selection?.variantId);
    const effectClaim = selection?.variantId ? variant?.description : ability?.summary;
    return <div className="space-y-3">{selection && <GameCard
      id={selection.abilityId}
      name={ability?.name.value ?? selection.abilityId}
      kind="ability"
      compact
      selected
      rank={variant?.rank.value ?? null}
      subtitle={`${label} · ${selection.variantId ?? "Rank unspecified"} · Effect: ${effectClaim?.status.replaceAll("-", " ") ?? "unknown"}`}
      effect={effectClaim?.value ?? "Ability effect not documented or unavailable."}
    />}<div className="grid gap-2 sm:grid-cols-2"><label className="text-xs">{label}<select className={field} value={selection?.abilityId ?? ""} onChange={(event) => onChange(event.target.value ? { abilityId: event.target.value, variantId: null } : null)}><option value="">Empty</option>{selection && !ability && <option value={selection.abilityId}>Unavailable: {selection.abilityId}</option>}{catalog.abilities.map((item) => <option key={item.id} value={item.id}>{item.name.value ?? item.id}</option>)}</select></label><label className="text-xs">Rank / exact variant<select className={field} disabled={!selection} value={selection?.variantId ?? ""} onChange={(event) => selection && onChange({ ...selection, variantId: event.target.value || null })}><option value="">Unspecified / unknown</option>{selection?.variantId && !ability?.variants.some((item) => item.id === selection.variantId) && <option value={selection.variantId}>Unavailable: {selection.variantId}</option>}{ability?.variants.map((item) => <option key={item.id} value={item.id}>{item.rank.value ?? "Rank unknown"} · {item.id}</option>)}</select></label></div></div>;
  }
  const nextSlot = () => { let slot = 1; while (target.abilities.some((item) => item.slot === slot)) slot++; return slot; };
  const selectedStyle = catalog.racerStyles.find((item) => item.id === plan.racerStyleId);
  const equipment = (tab === "parts" ? catalog.parts : catalog.abilities).filter((item) =>
    [item.name.value ?? item.id, item.summary.value ?? "", ...item.variants.map((variant) => `${variant.rank.value ?? ""} ${variant.description.value ?? ""}`)]
      .join(" ").toLowerCase().includes(search.toLowerCase()));
  return <div className="space-y-5 rounded-2xl bg-[#f5f4ef] text-[#173e43]">
    <div className="flex flex-wrap justify-between gap-2 rounded-xl border border-stone-200 bg-white p-3 text-xs"><span>Local workspace · account sync not configured</span><Link className="underline" href="/builds">View saved builds →</Link></div>
    <header className="flex flex-wrap items-end justify-between gap-4"><div><p className="eyebrow">Plan your next run</p><h1 className="page-heading">Build workspace</h1><p className="mt-2 text-sm text-stone-600">One complete target inventory per round. Your intent, not a verified game loadout.</p></div><div className="flex gap-2"><button className="btn-secondary inline-flex items-center gap-2" onClick={() => {
      try { const record = saveBuild(buildPlanSchema.parse(plan), localId); setLocalId(record.id); setNotice("Saved in this browser only."); } catch (error) { setNotice(error instanceof Error ? error.message : "Save failed."); }
    }}><Save size={16} />Save locally</button><button className="btn-primary inline-flex items-center gap-2" onClick={async () => {
      try { const link = buildShareUrl(plan, window.location.origin); setShareLink(link); try { await navigator.clipboard.writeText(link); setNotice("Unlisted link copied. Anyone with this link can see the plan."); } catch { setNotice("Clipboard unavailable. Select and copy the link below. Anyone with it can see the plan."); } } catch (error) { setNotice(error instanceof Error ? error.message : "Could not share."); }
    }}><Share2 size={16} />Share link</button></div></header>
    <p className="text-xs text-stone-500">Sharing exports an unlisted copy in the URL fragment, not a server-private build. Anyone with the link sees the plan and notes.</p>
    {notice && <p role="status" className="rounded-xl border border-orange-200 bg-orange-50 p-3 text-sm">{notice}</p>}
    {shareLink && <label className="block text-xs">Share link · select to copy<input readOnly className={`${field} mt-1`} value={shareLink} onFocus={(event) => event.target.select()} /></label>}
    {missing.length > 0 && <details className="rounded-xl border border-orange-300 bg-orange-50 p-3 text-sm"><summary>Warning: {missing.length} unavailable catalog selections (preserved in your plan)</summary><ul className="mt-2 list-inside list-disc">{missing.map((item, i) => <li key={i}>{item}</li>)}</ul></details>}
    <section className="panel space-y-4 p-5"><div className="grid gap-4 md:grid-cols-[2fr_3fr]"><label className="text-xs">Build name<input className={field} maxLength={160} value={plan.title} onChange={(event) => update({ title: event.target.value })} /></label><label className="text-xs">Plan description<input className={field} maxLength={5000} value={plan.description} onChange={(event) => update({ description: event.target.value })} /></label></div><div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4"><label className="text-xs">Mode<select className={field} value={plan.mode ?? ""} onChange={(event) => update({ mode: event.target.value as BuildPlan["mode"] || null })}><option value="">Not selected</option>{modeSchema.options.map((mode) => <option key={mode} value={mode}>{mode.replaceAll("-", " ")}</option>)}</select></label>{contextSelect("Racer", plan.characterId, catalog.characters.filter((character) => character.roles.value?.includes("racer")), (characterId) => update({ characterId }))}{contextSelect("Vehicle class", plan.vehicleClass, catalog.vehicleClasses, (vehicleClass) => update({ vehicleClass: vehicleClass as BuildPlan["vehicleClass"] }))}{contextSelect("Racer style", plan.racerStyleId, catalog.racerStyles.map((style) => ({ id: style.id, name: { value: `${style.name.value ?? style.id} · ${style.rank.value ?? (style.id.includes("-multiplayer-loadout-") ? `Multiplayer loadout ${style.id.split("-").at(-1)}` : "Rank unspecified")}` } })), (racerStyleId) => update({ racerStyleId }))}</div></section>
    {selectedStyle && <section aria-label="Selected racer style" className="max-w-2xl"><GameCard
      id={selectedStyle.id}
      name={selectedStyle.name.value ?? selectedStyle.id}
      kind="racer-style"
      rank={selectedStyle.rank.value}
      effect={selectedStyle.summary.value ?? "Style description not yet documented."}
      subtitle="Selected racer style"
      selected
      compact
    >{selectedStyle.traits.length > 0 ? <dl className="space-y-2 text-sm">{selectedStyle.traits.map((trait, index) => <div key={index}><dt className="font-semibold">{trait.name.value ?? "Trait name unknown"}</dt><dd>{trait.description.value ?? "Trait effect not yet documented."}</dd></div>)}</dl> : <p className="text-xs">No traits documented yet.</p>}</GameCard></section>}
    <section aria-label="Round timeline" className="flex items-center gap-2 overflow-x-auto pb-2">{plan.rounds.map((item, index) => <button key={index} aria-pressed={index === active} onClick={() => setActive(index)} className={`min-w-28 rounded-xl border px-4 py-3 text-left ${index === active ? "border-[#173e43] bg-[#173e43] text-white" : "border-stone-300 bg-white"}`}><span className="block text-[10px] uppercase tracking-widest">Round {item.round}</span><span className="text-xs">{item.target.parts.length} parts · {item.target.abilities.length} abilities</span></button>)}<button disabled={plan.rounds.length >= 100} className="btn-secondary shrink-0" onClick={() => appendRound(false)}><Plus size={16} className="inline" /> Add round</button></section>
    <div className="grid items-start gap-5 xl:grid-cols-[minmax(0,1fr)_340px]"><section className="panel space-y-6 p-5"><div className="flex flex-wrap items-center justify-between gap-3"><div><p className="eyebrow">Target inventory</p><h2 className="text-2xl font-semibold">Round {round.round}</h2></div><div className="flex gap-2"><button className="btn-secondary text-xs" disabled={plan.rounds.length >= 100} onClick={() => appendRound(true)}><Copy size={14} className="inline" /> Duplicate</button><button className="btn-secondary text-xs" disabled={plan.rounds.length === 1} onClick={() => { const rounds = plan.rounds.filter((_, index) => index !== active).map((item, index) => ({ ...item, round: index + 1 })); update({ rounds }); setActive(Math.min(active, rounds.length - 1)); }}><Trash2 size={14} className="inline" /> Delete round</button></div></div>
      <p className="text-xs text-stone-500">New rounds clone the previous full snapshot. Changes here do not alter any other round.</p>
      <div><h3 className="mb-3 flex items-center gap-2 font-semibold"><Wrench size={17} />Installed parts <span className="tag">{target.parts.length}</span></h3>{!target.parts.length && <p className="rounded-xl border border-dashed border-stone-300 p-6 text-sm text-stone-500">An empty starting inventory. Add an exact part variant from the catalog picker.</p>}<div className="grid gap-3 md:grid-cols-2">{target.parts.map((selection) => {
        const part = catalog.parts.find((item) => item.id === selection.partId);
        const variant = part?.variants.find((item) => item.id === selection.variantId);
        return <GameCard key={selection.partId} id={selection.partId} name={nameOf(catalog.parts, selection.partId)} kind="part" rank={variant?.rank.value} effect={variant?.description.value ?? "Exact variant effect not documented or unavailable."} subtitle={`Installed · ${selection.variantId} · Effect: ${variant?.description.status.replaceAll("-", " ") ?? "unknown"}`} selected>
          <div className="flex flex-wrap items-end gap-3"><label className="min-w-0 flex-1 text-xs">Exact variant<select className={field} value={selection.variantId} onChange={(event) => updateTarget({ parts: target.parts.map((item) => item.partId === selection.partId ? { ...item, variantId: event.target.value } : item) })}>{!part?.variants.some((item) => item.id === selection.variantId) && <option value={selection.variantId}>Unavailable: {selection.variantId}</option>}{part?.variants.map((variant) => <option key={variant.id} value={variant.id}>{variant.rank.value ?? "Rank unknown"} · {variant.id}</option>)}</select></label><button aria-label={`Remove ${nameOf(catalog.parts, selection.partId)} rank ${variant?.rank.value ?? selection.variantId}`} onClick={() => updateTarget({ parts: target.parts.filter((item) => item.partId !== selection.partId) })} className="game-card-action inline-flex items-center gap-2"><Trash2 size={16} />Remove</button></div>
        </GameCard>;
      })}</div></div>
      <div className="space-y-3"><h3 className="flex items-center gap-2 font-semibold"><Zap size={17} />Ability slots</h3><p className="text-xs text-stone-500">Four observed slots are a reference only, not an enforced global limit. This prototype editor allows up to 16 selected slots; that is not a game limit. Imported selections are preserved.</p>{target.abilities.map((selection) => <div className="rounded-xl border border-stone-200 bg-white p-3" key={selection.slot}><div className="mb-2 flex justify-between text-xs"><span>Slot {selection.slot}</span><button aria-label={`Remove slot ${selection.slot}`} onClick={() => updateTarget({ abilities: target.abilities.filter((item) => item.slot !== selection.slot) })}><Trash2 size={14} /></button></div>{abilityEditor(selection, (value) => updateTarget({ abilities: value ? target.abilities.map((item) => item.slot === selection.slot ? { ...value, slot: selection.slot } : item) : target.abilities.filter((item) => item.slot !== selection.slot) }), `Ability for slot ${selection.slot}`)}</div>)}<button className="btn-secondary text-xs" disabled={target.abilities.length >= 16 || !catalog.abilities.length} onClick={() => updateTarget({ abilities: [...target.abilities, { slot: nextSlot(), abilityId: catalog.abilities[0].id, variantId: null }] })}>+ Add ability slot</button></div>
      <div className="space-y-3 border-t border-stone-200 pt-4"><h3 className="font-semibold">Crash Ability · separate selection</h3>{abilityEditor(target.crashAbility, (crashAbility) => updateTarget({ crashAbility }), "Crash Ability")}</div>
      <label className="block text-xs">Round notes<textarea className={`${field} mt-1 min-h-24`} maxLength={5000} value={round.notes} onChange={(event) => updateRound({ notes: event.target.value })} placeholder="What changes this round, and why?" /></label>
      <div className="rounded-xl bg-[#f5f4ef] p-4 text-xs"><h3 className="mb-2 font-semibold">Part changes {active ? `from round ${plan.rounds[active - 1].round}` : "from empty inventory"}</h3>{!diff.addedParts.length && !diff.removedParts.length && !diff.changedParts.length && <p>No part changes.</p>}<ul className="space-y-1">{diff.addedParts.map((item) => <li key={`a${item.partId}`}>+ Added {nameOf(catalog.parts, item.partId)} · {item.variantId}</li>)}{diff.removedParts.map((item) => <li key={`r${item.partId}`}>− Removed {nameOf(catalog.parts, item.partId)} · {item.variantId}</li>)}{diff.changedParts.map((item) => <li key={`c${item.partId}`}>↔ Changed {nameOf(catalog.parts, item.partId)} · {item.fromVariantId} → {item.toVariantId}</li>)}</ul></div>
    </section><aside className="panel space-y-4 p-5"><div><p className="eyebrow">Source-backed catalog</p><h2 className="text-xl font-semibold">Choose your equipment</h2><p className="mt-2 text-xs text-stone-500">Published records only. Compatibility and capacity are not inferred.</p></div><div className="flex gap-2">{(["parts", "abilities"] as const).map((value) => <button key={value} aria-pressed={tab === value} className={tab === value ? "btn-primary" : "btn-secondary"} onClick={() => { setTab(value); setEquipmentLimit(24); }}>{value === "parts" ? "Parts" : "Abilities"}</button>)}</div><label className="relative block"><Search className="absolute top-3 left-3 text-stone-400" size={15} /><input aria-label="Search equipment" className={`${field} pl-9`} placeholder="Search catalog…" value={search} onChange={(event) => { setSearch(event.target.value); setEquipmentLimit(24); }} /></label><div className="max-h-[720px] space-y-5 overflow-y-auto">{equipment.slice(0, equipmentLimit).map((item) => {
        const sourceLabel = `Name: ${item.name.status.replaceAll("-", " ")} · Sources: ${item.name.sourceIds.map((id) => catalog.sources.find((source) => source.id === id)?.title ?? "Catalog evidence").join(" · ") || "Name unverified"}`;
        // Each documented rank gets its own exact-effect card; no inferred tiers.
        return <section key={item.id} aria-label={`${item.name.value ?? item.id} variants`} className="space-y-3">
          <p className="text-[10px] leading-relaxed text-stone-500">{sourceLabel}</p>
          {item.variants.map((variant) => {
            const name = item.name.value ?? item.id;
            const rankLabel = variant.rank.value ?? `unknown (${variant.id})`;
            const selected = item.kind === "part"
              ? target.parts.some((selection) => selection.partId === item.id && selection.variantId === variant.id)
              : target.abilities.some((selection) => selection.abilityId === item.id && selection.variantId === variant.id);
            return <GameCard key={variant.id} id={item.id} name={name} kind={item.kind} rank={variant.rank.value}
              effect={variant.description.value ?? "Exact variant effect not yet documented."}
              subtitle={`${item.tags.includes("fault") ? "FAULT · " : ""}${variant.id} · Effect: ${variant.description.status.replaceAll("-", " ")}`} selected={selected} compact>
              <button className="game-card-action w-full" aria-label={`${selected && item.kind === "part" ? "Selected" : "Add"} ${name} rank ${rankLabel}`}
                aria-pressed={selected} disabled={item.kind === "ability" && target.abilities.length >= 16}
                onClick={() => item.kind === "part"
                  ? updateTarget({ parts: [...target.parts.filter((selection) => selection.partId !== item.id), { partId: item.id, variantId: variant.id }] })
                  : updateTarget({ abilities: [...target.abilities, { slot: nextSlot(), abilityId: item.id, variantId: variant.id }] })}>
                {item.kind === "part" ? selected ? "Selected" : "Add exact variant" : "Add to next slot"}
              </button>
            </GameCard>;
          })}
          {!item.variants.length && <GameCard id={item.id} name={item.name.value ?? item.id} kind={item.kind} rank={null}
            effect={item.summary.value ?? "Effect not yet documented."} subtitle="Rank unspecified / unknown" compact>
            {item.kind === "part" ? <p className="text-xs">No exact variants documented yet.</p> : <button className="game-card-action w-full"
              aria-label={`Add ${item.name.value ?? item.id} with unspecified rank`}
              disabled={target.abilities.length >= 16}
              onClick={() => updateTarget({ abilities: [...target.abilities, { slot: nextSlot(), abilityId: item.id, variantId: null }] })}>Add to next slot</button>}
          </GameCard>}
        </section>;
      })}{equipment.length > equipmentLimit && <button className="btn-secondary w-full" onClick={() => setEquipmentLimit((limit) => limit + 24)}>Load more equipment ({equipment.length - equipmentLimit} families remaining)</button>}{!equipment.length && <p className="text-sm text-stone-500">No matching published equipment.</p>}</div></aside></div>
    <details className="panel p-4 text-sm"><summary>Import a shared plan link</summary><div className="mt-3 flex flex-wrap gap-2"><input aria-label="Shared plan link" className={`${field} flex-1`} value={importLink} onChange={(event) => setImportLink(event.target.value)} placeholder="Paste /builder#plan=…" /><button className="btn-secondary" onClick={() => {
      try { const url = new URL(importLink, window.location.origin); const token = new URLSearchParams(url.hash.slice(1)).get("plan"); if (!token) throw new Error("Paste a link containing #plan=…"); const imported = decodeBuildPlan(token); setPlan(imported); setActive(0); setLocalId(undefined); setShareLink(""); setNotice("Imported a copy. Saving will create a new local build."); } catch (error) { setNotice(error instanceof Error ? error.message : "Import failed."); }
    }}>Import copy</button></div></details>
  </div>;
}
