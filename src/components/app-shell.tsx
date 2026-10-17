"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowUpRight, BookOpen, Flag, FolderHeart, Gauge, Globe2, Radio, Route, Sparkles } from "lucide-react";

const navigation = [
  { href: "/", label: "Overview", icon: Gauge },
  { href: "/wiki", label: "The Databank", icon: BookOpen },
  { href: "/builder", label: "Build planner", icon: Route },
  { href: "/builds", label: "My builds", icon: FolderHeart },
];

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  return <div className="app-shell">
    <a className="skip-link" href="#main-content">Skip to content</a>
    <aside className="sidebar">
      <Link href="/" className="brand" aria-label="Galactic Garage home"><span className="brand-symbol"><Flag size={24} strokeWidth={2.5}/></span><span><strong>GALACTIC<span>GARAGE</span></strong><small>THE UNOFFICIAL RACER COMPANION</small></span></Link>
      <div className="sidebar-divider"/><p className="nav-caption">YOUR PADDOCK</p>
      <nav aria-label="Main navigation">{navigation.map(({href,label,icon:Icon})=><Link key={href} href={href} aria-current={pathname===href?"page":undefined} className={`nav-link ${pathname===href?"is-active":""}`}><Icon size={19}/><span>{label}</span>{href==="/builder"&&<span className="nav-new">NEW</span>}</Link>)}</nav>
      <div className="sidebar-note"><span className="status-dot"/> BUILT FOR THE LEAGUE<p>No Force. No prophecy.<br/>Just a better race plan.</p><div className="mini-track" aria-hidden="true"><Route size={86} strokeWidth={.6}/></div></div>
      <div className="sidebar-bottom"><a href="https://starwarsgalacticracer.com/" target="_blank" rel="noopener noreferrer"><Globe2 size={16}/>Official game site<ArrowUpRight size={15}/></a><span>Independent fan project.<br/>Not affiliated with Lucasfilm or Fuse Games.</span></div>
    </aside>
    <div className="workspace"><header className="topbar"><div className="breadcrumb"><span>GALACTIC RACER</span><span className="crumb-slash">/</span><strong>{navigation.find(item=>item.href===pathname)?.label??"Paddock"}</strong></div><div className="topbar-right"><span className="live-label"><Radio size={14}/> FAN-MADE. SOURCE-BACKED.</span><span className="workspace-label"><span className="avatar-dot">GG</span>Local workspace</span></div></header>
    <main id="main-content" className="main-content">{children}</main>
    <footer className="app-footer"><span>GALACTIC GARAGE <span className="footer-star">✳</span> KNOW YOUR CRAFT. FIND YOUR EDGE.</span><span><Sparkles size={12}/>A fan-built companion for Star Wars: Galactic Racer</span></footer></div>
  </div>;
}
