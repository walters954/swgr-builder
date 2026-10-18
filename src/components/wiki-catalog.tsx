"use client";

import Link from "next/link";
import { useEffect, useId, useRef, useState } from "react";
import { GameCard } from "@/components/game-card";
import { ArrowRight, BookOpen, Car, CircleHelp, Gauge, Globe, MapPin, Search, ShieldCheck, Sparkles, Users, Wrench, X, Zap } from "lucide-react";
import type { PublicCatalog } from "@/lib/content/public";
import type { Vehicle, Track, Planet, Ability, Character, Claim, Part, RacerStyle, VehicleClassEntry } from "@/lib/content/schema";

type RecordEntry = Vehicle | Track | Planet | Character | Ability | Part | RacerStyle | VehicleClassEntry;
type ModeFilter = "all" | "podrace" | "multiplayer-tour" | "unknown";
const categories = [
  { id: "all", label: "All", icon: BookOpen },
  { id: "character", label: "Racers", icon: Users },
  { id: "part", label: "Parts", icon: Wrench },
  { id: "ability", label: "Abilities", icon: Zap },
  { id: "racer-style", label: "Racer Styles", icon: Sparkles },
  { id: "vehicle-class", label: "Vehicle Classes", icon: Car },
  { id: "vehicle", label: "Vehicles", icon: Car },
  { id: "track", label: "Tracks", icon: MapPin },
  { id: "planet", label: "Planets", icon: Globe },
] as const;
const evidence = { official: "Official source", reported: "Reported", "screenshot-verified": "Screenshot-verified", unknown: "Unknown" };
const modeLabels: Record<string, string> = { podrace: "Podrace", "podrace-tour": "Podrace Tour", "quick-podrace": "Quick Podrace", "multiplayer-tour": "Multiplayer Tour", multiplayer: "Multiplayer", campaign: "Campaign", scenario: "Scenario", arcade: "Arcade" };
const nameOf = (entry: RecordEntry) => entry.name.value ?? entry.id;
const keyOf = (entry: RecordEntry) => `${entry.kind}:${entry.id}`;

function modeClaim(entry: RecordEntry) {
  if (entry.kind === "character") return entry.playableModes;
  if (entry.kind === "ability") return entry.compatibleModes;
  if (entry.kind === "vehicle-class" || entry.kind === "vehicle" || entry.kind === "track") return entry.availableModes;
  return null;
}
function modeMatches(entry: RecordEntry, mode: ModeFilter) {
  const claim = modeClaim(entry);
  const unknown = !claim || claim.status === "unknown";
  if (mode === "all") return true;
  if (mode === "unknown") return unknown;
  if (unknown) return true;
  return claim.value?.some((value) => mode === "podrace" ? ["podrace", "podrace-tour", "quick-podrace"].includes(value) : value === mode) ?? false;
}

// Index claim text, including variant effects and trait descriptions, not internal metadata.
function searchableText(value: unknown): string {
  if (!value || typeof value !== "object") return "";
  if (Array.isArray(value)) return value.map(searchableText).join(" ");
  const object = value as Record<string, unknown>;
  if ("status" in object && "value" in object) {
    return [Array.isArray(object.value) ? object.value.join(" ") : object.value, object.notes].filter(Boolean).join(" ");
  }
  return Object.values(object).map(searchableText).join(" ");
}

function publicHttps(value?: string) {
  if (!value) return undefined;
  try {
    const url = new URL(value);
    const host = url.hostname.toLowerCase();
    if (url.protocol !== "https:" || url.username || url.password || !host.includes(".") || host.endsWith(".local") || host.endsWith(".localhost") || host.endsWith(".internal") || /^\d+(\.\d+){3}$/.test(host) || host.startsWith("[")) return undefined;
    return url.href;
  } catch { return undefined; }
}

function Fact({ label, claim }: { label: string; claim: Claim<unknown> }) {
  const value = claim.value;
  return (
    <div className="rounded-xl border border-stone-200 bg-white/60 p-4 text-stone-900">
      <dt className="text-xs font-semibold uppercase tracking-wide text-stone-500">{label}</dt>
      <dd className="mt-2 space-y-2">
        <p className="whitespace-pre-wrap text-sm leading-relaxed">{value === null ? "Not yet documented" : Array.isArray(value) ? (value.map((item) => modeLabels[String(item)] ?? String(item)).join(", ") || "None documented in this sourced claim") : String(value)}</p>
        <span className="tag inline-flex items-center gap-1 text-xs">{claim.status === "screenshot-verified" ? <ShieldCheck size={13} aria-hidden="true" /> : null}{evidence[claim.status]}</span>
        {claim.notes && <p className="text-xs leading-relaxed text-stone-600">{claim.notes}</p>}
      </dd>
    </div>
  );
}

type Trait = { name: Claim<string>; description: Claim<string> };
function Traits({ traits, kind = "racer-style" }: { traits: Trait[]; kind?: RecordEntry["kind"] }) {
  const scope = useId();
  return traits.length ? (
    <div className="grid gap-4 sm:grid-cols-2">
      {traits.map((trait, index) => (
        <GameCard
          key={index}
          id={`${scope}-trait-${index}`}
          kind={kind}
          name={trait.name.value ?? "Trait name not documented"}
          effect={trait.description.value ?? "Not documented"}
          subtitle="Trait · exact effect wording"
          compact
        >
          <div className="space-y-2 text-xs">
            <p>Name: {evidence[trait.name.status]} · Effect: {evidence[trait.description.status]}</p>
            {trait.name.notes && <p>{trait.name.notes}</p>}
            {trait.description.notes && <p>{trait.description.notes}</p>}
          </div>
        </GameCard>
      ))}
    </div>
  ) : <p className="text-sm text-stone-500">No traits documented for this entry.</p>;
}

function CatalogCard({ entry, selected, onOpen }: {
  entry: RecordEntry;
  selected: boolean;
  onOpen: (button: HTMLButtonElement) => void;
}) {
  const [variantId, setVariantId] = useState<string | null>(null);
  const selectorId = useId();
  const variants = entry.kind === "part" || entry.kind === "ability" ? entry.variants : [];
  const variant = variants.find((item) => item.id === variantId) ?? variants[0];
  const traits = entry.kind === "racer-style" || entry.kind === "vehicle-class" ? entry.traits : [];
  const hasVariants = entry.kind === "part" || entry.kind === "ability";
  const hasTraits = entry.kind === "racer-style" || entry.kind === "vehicle-class";
  const previewClaim = hasVariants ? variant?.description : hasTraits ? traits[0]?.description : entry.summary;
  const effect = previewClaim?.value ?? "Not documented";
  const categoryInfo = categories.find((item) => item.id === entry.kind)!;
  const context = modeClaim(entry);
  const subtitle = hasVariants
    ? variant ? `Variant: ${variant.id} · exact effect wording` : "No variants documented"
    : hasTraits
      ? traits.length ? `${traits[0].name.value ?? "Trait name not documented"} · ${traits.length} documented ${traits.length === 1 ? "trait" : "traits"}` : "No traits documented"
      : `${categoryInfo.label} profile`;

  return (
    <GameCard
      id={`wiki-${entry.kind}-${entry.id}`}
      name={nameOf(entry)}
      kind={entry.kind}
      rank={hasVariants ? variant?.rank.value : entry.kind === "racer-style" ? entry.rank.value : undefined}
      effect={effect}
      subtitle={`${entry.tags.includes("fault") ? "FAULT · " : ""}${subtitle}`}
      selected={selected}
      className="h-full"
    >
      <div className="space-y-3">
        {variants.length > 1 && <div>
          <label htmlFor={selectorId} className="mb-1 block text-xs font-semibold">Preview variant for {nameOf(entry)}</label>
          <select id={selectorId} value={variant?.id ?? ""} onChange={(event) => setVariantId(event.target.value)} className="min-h-11 w-full rounded-lg border border-stone-300 bg-white px-3 text-sm text-stone-950">
            {variants.map((item, index) => <option key={item.id} value={item.id}>{index + 1}. {item.id}{item.rank.value ? ` · Rank ${item.rank.value}` : ""}</option>)}
          </select>
          <p className="sr-only">Defaults to the first documented variant, not a recommendation.</p>
        </div>}
        <div className="flex flex-wrap gap-2 text-xs">
          <span className="tag">{hasVariants || hasTraits ? "Effect" : "Summary"}: {previewClaim ? evidence[previewClaim.status] : "Unknown"}</span>
          <span className="tag inline-flex items-center gap-1"><Gauge size={12} aria-hidden="true" />{context?.value === null || !context ? "Unknown context" : context.value.length ? context.value.map((value) => modeLabels[value] ?? value).join(" · ") : "No compatible modes documented"}</span>
        </div>
        <button type="button" aria-label={`View ${categoryInfo.label.toLowerCase()} details: ${nameOf(entry)} (${entry.id})`} aria-expanded={selected} onClick={(event) => onOpen(event.currentTarget)} className="inline-flex min-h-11 w-full items-center justify-between rounded-lg bg-white px-3 py-2 text-sm font-semibold text-[#173e43] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#173e43]">
          View details<ArrowRight size={16} aria-hidden="true" />
        </button>
      </div>
    </GameCard>
  );
}

function Details({ entry, catalog }: { entry: RecordEntry; catalog: PublicCatalog }) {
  const sourceIds = new Set<string>();
  function collect(value: unknown) {
    if (!value || typeof value !== "object") return;
    if (Array.isArray(value)) { value.forEach(collect); return; }
    const object = value as Record<string, unknown>;
    if (Array.isArray(object.sourceIds)) object.sourceIds.forEach((id) => { if (typeof id === "string") sourceIds.add(id); });
    Object.values(object).forEach(collect);
  }
  collect(entry);
  const sources = catalog.sources.filter((source) => sourceIds.has(source.id));
  return <div className="space-y-6">
    <dl className="grid gap-3 sm:grid-cols-2"><Fact label="Name" claim={entry.name} /><Fact label="Summary" claim={entry.summary} /></dl>
    {entry.aliases.length > 0 && <p className="text-sm text-stone-600">Also known as: {entry.aliases.join(", ")}</p>}
    {entry.kind === "character" && <>
      <dl className="grid gap-3 sm:grid-cols-3"><Fact label="Roles" claim={entry.roles} /><Fact label="Species" claim={entry.species} /><Fact label="Playable modes" claim={entry.playableModes} /></dl>
      <h3 className="section-heading">Vehicle profiles</h3>
      {entry.vehicleProfiles.length === 0 && <p className="text-sm text-stone-500">No vehicle profiles documented.</p>}
      {entry.vehicleProfiles.map((profile) => <div key={profile.id} className="space-y-3 border-t border-stone-200 pt-4"><h4 className="font-semibold">{profile.vehicleName.value ?? profile.id}</h4><dl className="grid gap-3 sm:grid-cols-2"><Fact label="Mode" claim={profile.mode} /><Fact label="Vehicle class" claim={profile.vehicleClass} /><Fact label="Description" claim={profile.description} /></dl><Traits traits={profile.traits} kind="character" /></div>)}
      <h3 className="section-heading">Documented loadouts</h3>
      {entry.loadouts.length === 0 && <p className="text-sm text-stone-500">No loadouts documented. This does not imply no available abilities.</p>}
      {entry.loadouts.map((loadout) => <div key={loadout.id} className="space-y-3 border-t border-stone-200 pt-4"><h4 className="font-semibold">{modeLabels[loadout.mode] ?? loadout.mode}</h4><dl className="grid gap-3 sm:grid-cols-2"><Fact label="Racer style" claim={loadout.racerStyle} />{loadout.racerStyleDescription && <Fact label="Style description" claim={loadout.racerStyleDescription} />}<Fact label="Ability references" claim={{ ...loadout.abilityIds, value: loadout.abilityIds.value?.map((id) => catalog.abilities.find((ability) => ability.id === id)?.name.value ?? id) ?? null } as Claim<string[]>} /></dl><Traits traits={loadout.traits} kind="character" /></div>)}
    </>}
    {entry.kind === "ability" && <dl className="grid gap-3 sm:grid-cols-2"><Fact label="Compatible modes" claim={entry.compatibleModes} /><Fact label="Compatible vehicles" claim={entry.compatibleVehicleClasses} /></dl>}
    {(entry.kind === "ability" || entry.kind === "part") && <>
      <div><h3 className="section-heading">Documented variants</h3><p className="mt-1 text-sm text-stone-500">Effect wording is preserved from the catalog. Rank and rarity are separate claims.</p></div>
      {entry.variants.length === 0 && <p className="text-sm text-stone-500">No variants documented yet.</p>}
      {entry.variants.map((variant, index) => <div key={variant.id} className="space-y-4 border-t border-stone-200 pt-4">
        <h4 className="font-semibold">Variant {index + 1} · {variant.id}</h4>
        <GameCard id={`wiki-detail-${entry.kind}-${entry.id}-${variant.id}`} name={nameOf(entry)} kind={entry.kind} rank={variant.rank.value} effect={variant.description.value ?? "Not documented"} subtitle={`Variant: ${variant.id} · exact effect wording`}>
          <div className="space-y-2 text-xs"><p>Effect: {evidence[variant.description.status]}</p>{variant.description.notes && <p>{variant.description.notes}</p>}</div>
        </GameCard>
        <dl className="grid gap-3 sm:grid-cols-2"><Fact label="Rank" claim={variant.rank} /><Fact label="Rarity" claim={variant.rarity} />{"priceCredits" in variant && variant.priceCredits && <Fact label="Reported price (credits)" claim={variant.priceCredits} />}{"unlock" in variant && variant.unlock && <Fact label="Reported unlock requirement" claim={variant.unlock} />}{"energyCost" in variant && <><Fact label="Energy cost" claim={variant.energyCost} /><Fact label="Cooldown (seconds)" claim={variant.cooldownSeconds} /><Fact label="Duration (seconds)" claim={variant.durationSeconds} /></>}</dl>
      </div>)}
    </>}
    {entry.kind === "racer-style" && <><dl><Fact label="Rank" claim={entry.rank} /></dl><h3 className="section-heading">Style traits</h3><Traits traits={entry.traits} /></>}
    {entry.kind === "vehicle-class" && <><dl><Fact label="Available modes" claim={entry.availableModes} /></dl><h3 className="section-heading">Vehicle traits</h3><Traits traits={entry.traits} kind="vehicle-class" /></>}
    {entry.kind === "vehicle" && <dl className="grid gap-3 sm:grid-cols-2"><Fact label="Vehicle class" claim={entry.vehicleClass} /><Fact label="Manufacturer" claim={entry.manufacturer} /><Fact label="Recorded mode context" claim={entry.availableModes} /></dl>}
    {entry.kind === "track" && <dl className="grid gap-3 sm:grid-cols-2"><Fact label="Planet" claim={entry.planet} /><Fact label="Hazards" claim={entry.hazards} /><Fact label="Recorded mode context" claim={entry.availableModes} /></dl>}
    {entry.kind === "planet" && <dl><Fact label="Environment" claim={entry.environment} /></dl>}
    {!modeClaim(entry) && <p className="rounded-xl bg-amber-50 p-4 text-sm">Unknown context: this entry has no documented mode compatibility. Visibility in a mode filter is not confirmation of compatibility.</p>}
    <div className="border-t border-stone-200 pt-5"><h3 className="section-heading">Sources & evidence</h3><p className="mt-2 text-sm text-stone-500">Labels apply to individual claims, not blanket verification of this record. Screenshot evidence may not have a public link.</p><ul className="mt-3 space-y-2">{sources.map((source) => { const href = publicHttps(source.url); return <li key={source.id} className="text-sm">{href ? <a className="text-[#173e43] underline underline-offset-4" href={href} target="_blank" rel="noopener noreferrer">{source.title}<span className="sr-only"> (opens in a new tab)</span></a> : <span>{source.title}</span>} <span className="text-stone-500">· {source.kind}</span></li>; })}</ul>{sources.length === 0 && <p className="mt-3 text-sm text-stone-500">No public source references available.</p>}</div>
    <div className="flex flex-wrap items-center gap-4"><Link href="/builder" className="btn-primary inline-flex items-center gap-2">Open builder <ArrowRight size={16} aria-hidden="true" /></Link><p className="text-xs text-stone-500">Updated {entry.updatedAt}{entry.gameVersion ? ` · Game version ${entry.gameVersion}` : " · Game version unknown"}</p></div>
  </div>;
}

export function WikiCatalog({ catalog }: { catalog: PublicCatalog }) {
  const [category, setCategory] = useState<string>("all");
  const [query, setQuery] = useState("");
  const [mode, setMode] = useState<ModeFilter>("all");
  const [selected, setSelected] = useState<RecordEntry | null>(null);
  const [visibleLimit, setVisibleLimit] = useState(36);
  const detailHeading = useRef<HTMLHeadingElement>(null);
  const trigger = useRef<HTMLButtonElement | null>(null);
  useEffect(() => { if (selected) detailHeading.current?.focus(); }, [selected]);
  const entries: RecordEntry[] = [...catalog.vehicles, ...catalog.tracks, ...catalog.planets, ...catalog.characters, ...catalog.parts, ...catalog.abilities, ...catalog.racerStyles, ...catalog.vehicleClasses].sort((a, b) => nameOf(a).localeCompare(nameOf(b)));
  const terms = query.trim().toLocaleLowerCase().split(/\s+/).filter(Boolean);
  const matching = entries.filter((entry) => {
    const text = [entry.id, ...entry.aliases, ...entry.tags, searchableText(entry)].join(" ").toLocaleLowerCase();
    return terms.every((term) => text.includes(term)) && modeMatches(entry, mode);
  });
  const visible = matching.filter((entry) => category === "all" || entry.kind === category);
  function reset() { setQuery(""); setMode("all"); setCategory("all"); setVisibleLimit(36); }
  return <div className="space-y-6 text-stone-950">
    <div className="panel space-y-5 rounded-2xl border border-stone-200 bg-[#fffefb] p-5 sm:p-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end">
        <div className="flex-1"><label htmlFor="wiki-search" className="mb-2 block text-sm font-medium">Search the catalog</label><div className="relative"><Search className="pointer-events-none absolute left-3 top-3.5 text-stone-400" size={19} aria-hidden="true" /><input id="wiki-search" type="search" value={query} onChange={(event) => { setQuery(event.target.value); setVisibleLimit(36); }} placeholder="Search names, effects, or traits…" className="search-field min-h-12 w-full rounded-xl border border-stone-300 bg-white py-3 pl-10 pr-3 text-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#173e43]" /></div></div>
        <div className="lg:w-56"><label htmlFor="wiki-mode" className="mb-2 block text-sm font-medium">Mode context</label><select id="wiki-mode" value={mode} onChange={(event) => { setMode(event.target.value as ModeFilter); setVisibleLimit(36); }} className="min-h-12 w-full rounded-xl border border-stone-300 bg-white px-3 text-sm"><option value="all">All modes</option><option value="podrace">Podrace</option><option value="multiplayer-tour">Multiplayer Tour</option><option value="unknown">Unknown context</option></select></div>
      </div>
      <div className="flex flex-wrap gap-2" role="group" aria-label="Catalog categories">{categories.map(({ id, label, icon: Icon }) => <button key={id} type="button" aria-pressed={category === id} onClick={() => { setCategory(id); setVisibleLimit(36); }} className={`inline-flex min-h-11 items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#173e43] ${category === id ? "bg-[#173e43] text-white" : "bg-[#f5f4ef] text-[#173e43] hover:bg-stone-200"}`}><Icon size={16} aria-hidden="true" />{label}<span className="rounded bg-black/10 px-1.5 text-xs">{matching.filter((entry) => id === "all" || entry.kind === id).length}</span></button>)}</div>
      <p className="flex items-start gap-2 text-xs leading-relaxed text-stone-600"><CircleHelp size={15} className="shrink-0" aria-hidden="true" />Mode filters retain unknown-context records; visibility does not confirm compatibility. Podrace includes Podrace Tour and Quick Podrace.</p>
    </div>
    {selected && <section aria-labelledby="wiki-detail-heading" className="panel rounded-2xl border-2 border-[#173e43] bg-[#fffefb] p-5 sm:p-8"><div className="mb-6 flex items-start justify-between gap-4"><div><p className="eyebrow">Catalog detail</p><h2 id="wiki-detail-heading" ref={detailHeading} tabIndex={-1} className="mt-2 text-2xl font-semibold tracking-tight">{nameOf(selected)}</h2></div><button type="button" className="btn-secondary inline-flex min-h-11 items-center gap-2" aria-label={`Close details for ${nameOf(selected)}`} onClick={() => { setSelected(null); trigger.current?.focus(); }}><X size={16} aria-hidden="true" />Close</button></div><Details entry={selected} catalog={catalog} /></section>}
    <div className="flex flex-wrap items-center justify-between gap-3"><h2 className="section-heading">{categories.find((item) => item.id === category)?.label} catalog</h2><p role="status" aria-live="polite" className="text-sm text-stone-500">{visible.length} {visible.length === 1 ? "entry" : "entries"} found</p></div>
    {visible.length ? <div className="catalog-grid grid gap-4 sm:grid-cols-2 xl:grid-cols-3">{visible.slice(0, visibleLimit).map((entry) => <CatalogCard key={keyOf(entry)} entry={entry} selected={selected !== null && keyOf(selected) === keyOf(entry)} onOpen={(button) => { trigger.current = button; setSelected(entry); if (selected && keyOf(selected) === keyOf(entry)) detailHeading.current?.focus(); }} />)}</div> : <div className="empty-state rounded-2xl border border-dashed border-stone-300 bg-[#fffefb] px-6 py-16 text-center"><Search className="mx-auto mb-4 text-[#173e43]" size={32} aria-hidden="true" /><h3 className="text-xl font-semibold">{entries.length ? "No matching entries" : "The catalog is taking shape"}</h3><p className="mx-auto mt-2 max-w-md text-sm text-stone-600">{entries.length ? "Try a broader name or effect, switch categories, or clear your filters. Unknown details are never filled with guesses." : "Published records will appear here when they are available. There are no published entries to browse yet."}</p>{entries.length > 0 && <button type="button" className="btn-primary mt-6" onClick={reset}>Clear all wiki filters</button>}</div>}
    {visible.length > visibleLimit && <div className="flex justify-center"><button className="btn-secondary" onClick={() => setVisibleLimit((limit) => limit + 36)}>Load more entries ({visible.length - visibleLimit} remaining)</button></div>}
    <p className="text-xs text-stone-500">Verified game pictograms are cropped from owner-supplied screenshots. Remaining artwork uses illustrative symbols, not inferred game icons.</p>
  </div>;
}
