import type { ReactNode } from "react";
import Image from "next/image";
import { ArrowUpRight, BatteryCharging, Bike, CircleDot, Cpu, Fan, Flag, Flame, Fuel, Gauge, HeartPulse, Layers3, MoveUp, Radio, Shield, ShieldCheck, Snowflake, Sparkles, Timer, Waves, Wind, Wrench, Zap, MapPin, Globe2, Car, type LucideIcon } from "lucide-react";

export type GameCardKind = "part" | "ability" | "racer-style" | "vehicle-class" | "character" | "vehicle" | "track" | "planet";

export const GAME_ICON_ASSETS: Record<string, string> = Object.fromEntries([
  "overtaking-surge", "status-scrubber", "ion-blast", "optimized-fuel", "optimized-surge",
  "vectored-shockwave", "impact-surge", "cooling-dampers", "depleted-shielding",
].map((id) => [id, `/game-icons/${id}.png`]));
export interface GameCardProps {
  id: string;
  name: string;
  kind: GameCardKind;
  rank?: string | null;
  effect: string;
  subtitle?: string;
  selected?: boolean;
  compact?: boolean;
  children?: ReactNode;
  className?: string;
}

const icons: Record<string, LucideIcon> = {
  "afterburner-efficiency": Fuel,
  "afterburner-rapid-refill": BatteryCharging,
  "cooling-dampers": Fan,
  "thermocycling-dampers": Fan,
  "coolant-cycler": Snowflake,
  "heat-reduction": Snowflake,
  "extended-cooling": Snowflake,
  "heated-fuel": Flame,
  "extended-alarm": Timer,
  "depleted-shielding": ShieldCheck,
  "expanding-fuel-tank": Fuel,
  "overcharging-afterburner": BatteryCharging,
  "optimized-fuel": Fuel,
  "optimized-surge": Zap,
  "protective-ignition": ShieldCheck,
  "lethal-velocity": Gauge,
  "dechoking-mechanism": Wind,
  "drag-reduction": Wind,
  "impact-shield": Shield,
  "impact-surge": MoveUp,
  "surge": MoveUp,
  "overtaking-surge": MoveUp,
  "status-scrubber": Waves,
  "ion-blast": Zap,
  "shockwave": Radio,
  "stunt-runner": Sparkles,
  "clean-racer": Wind,
  "survivor": ShieldCheck,
  "speeder-bike": Bike,
  "skim-speeder": Wind,
  "center-of-attention": CircleDot,
  "repulsor-fuel-link": Fuel,
  "potential-energy": MoveUp,
  "victory-charge": BatteryCharging,
  "in-the-zone": Gauge,
  "overtaker": ArrowUpRight,
};
const kindIcons: Record<GameCardKind, LucideIcon> = { part: Wrench, ability: Zap, "racer-style": Flag, "vehicle-class": Gauge, character: HeartPulse, vehicle: Car, track: MapPin, planet: Globe2 };
const labels: Record<GameCardKind, string> = { part: "REPULSORCRAFT PART", ability: "EQUIPPABLE ABILITY", "racer-style": "RACER STYLE", "vehicle-class": "VEHICLE CLASS", character: "GALACTIC LEAGUE / CHARACTER", vehicle: "NAMED REPULSORCRAFT", track: "CIRCUIT / TRACK", planet: "GALACTIC LEAGUE / WORLD" };

/** Use extracted game artwork where verified; instrumentation symbols fill remaining gaps. */
export function GameIcon({ id, kind }: { id: string; kind: GameCardKind }) {
  const asset = GAME_ICON_ASSETS[id];
  if (asset) return <Image src={asset} width={128} height={128} alt="" aria-hidden="true" unoptimized className="game-pictogram game-pictogram--asset" data-artwork="game"/>;
  if (id === "vectored-shockwave") return <svg viewBox="0 0 64 64" aria-hidden="true" className="game-pictogram"><path d="M6 29a26 26 0 0 1 52 0H44L33 54 23 29Z" fill="currentColor"/><path d="m7 45 10 8M57 45l-10 8M32 3v6" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round"/></svg>;
  const themedIcon = /fuel|afterburner|tank/.test(id) ? Fuel : /cool|heat|frost|frozen/.test(id) ? Snowflake : /alarm|redlin|tim/.test(id) ? Timer : /shield|protect|armor/.test(id) ? Shield : /surge|power|electric|energy/.test(id) ? Zap : /kinetic|impact|shock|crash/.test(id) ? Waves : /engine|system|tech|regulator/.test(id) ? Cpu : undefined;
  const Icon = icons[id] ?? themedIcon ?? kindIcons[kind];
  return <Icon className="game-pictogram" strokeWidth={2.5} aria-hidden="true"/>;
}

/** Highlight only the words already present: never reword sourced effect text. */
export function EffectText({ text }: { text: string }) {
  const parts = text.split(/(Critical Malfunction|System Malfunction|Perfect Landings?|Perfect Start|Afterburner|Slipstreaming|Redlining|Ramjet|Surging|Cooled|Shielded|Overcharged|Frozen|Burning|Choked|Energy|Takedowns?)/gi);
  return <>{parts.map((part, index) => index % 2 ? <em className={`game-keyword ${/cooled|frozen/i.test(part) ? "game-keyword-cold" : ""}`} key={index}>{part}</em> : part)}</>;
}

export function GameCard({ id, name, kind, rank, effect, subtitle, selected = false, compact = false, children, className = "" }: GameCardProps) {
  const suffix = rank && !name.toLocaleUpperCase().endsWith(` ${rank.toLocaleUpperCase()}`) ? ` ${rank}` : "";
  return <div data-game-card-id={id} data-rank={rank ?? undefined} className={`game-card game-card--${kind} ${selected ? "game-card--selected" : ""} ${compact ? "game-card--compact" : ""} ${className}`}>
    <div className="game-card-topline"><span>{subtitle ?? labels[kind]}</span><span className="game-card-trim" aria-hidden="true"/></div>
    <div className="game-card-content"><div className={`game-card-icon ${kind === "ability" || kind === "racer-style" ? "game-card-icon--round" : ""}`}><GameIcon id={name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "")} kind={kind}/></div><div className="game-card-copy"><h3 className="game-card-title">{name}{suffix}</h3><p className="game-card-effect"><EffectText text={effect}/></p></div></div>
    <div className="game-card-meta"><span>{rank === null ? "RANK UNKNOWN" : rank ? `RANK ${rank}` : kind === "part" ? "VARIANT NOT SPECIFIED" : labels[kind]}</span>{selected ? <span className="game-selected"><ShieldCheck size={11} aria-hidden="true"/>SELECTED</span> : <Layers3 size={12} aria-hidden="true"/>}</div>
    {children && <div className="game-card-controls">{children}</div>}
    <span className="game-card-watermark" aria-hidden="true"><Cpu size={100} strokeWidth={.7}/></span>
  </div>;
}
export default GameCard;
