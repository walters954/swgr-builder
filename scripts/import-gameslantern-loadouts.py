#!/usr/bin/env python3
"""Import public loadout facts; no registry writes, inferred ranks, or artwork.
Run from any directory. Sequential requests (concurrency 1), two retries, ignored cache.
"""
import hashlib
import json
import re
import subprocess
import time
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import urljoin, urlsplit

ROOT = Path(__file__).resolve().parents[1]
CACHE = ROOT / 'content/evidence/import-cache'
DATE = '2026-10-17'
ORIGIN = 'https://galacticracer.gameslantern.com'
WIKI = 'https://swgalacticracer.wiki/'

class Node:
    def __init__(self, tag='', attrs=()):
        self.tag, self.attrs, self.children = tag, dict(attrs), []
    def text(self):
        return re.sub(r'\s+', ' ', ' '.join(c.text() if isinstance(c, Node) else c for c in self.children)).strip()
    def find(self, tag=None, cls=None):
        out = []
        for c in self.children:
            if isinstance(c, Node):
                if (tag is None or c.tag == tag) and (cls is None or cls in c.attrs.get('class','').split()): out.append(c)
                out.extend(c.find(tag, cls))
        return out

class Parser(HTMLParser):
    def __init__(self, text):
        super().__init__(convert_charrefs=True)
        self.root = Node(); self.stack = [self.root]; self.feed(text)
    def handle_starttag(self, tag, attrs):
        n = Node(tag, attrs); self.stack[-1].children.append(n)
        if tag not in {'img','input','br','hr','meta','link','source','wbr','area','base','embed','param','track','col'}: self.stack.append(n)
    def handle_endtag(self, tag):
        for i in range(len(self.stack)-1, 0, -1):
            if self.stack[i].tag == tag:
                del self.stack[i:]; break
    def handle_data(self, data): self.stack[-1].children.append(data)

def slug(s): return re.sub('[^a-z0-9]+','-',s.lower()).strip('-')
def unknown(note='Not explicitly stated on the source page.'):
    return dict(status='unknown', value=None, sourceIds=[], notes=note)
def claim(v, sid, notes=None):
    if v is None: return unknown()
    c = dict(status='reported', value=v, sourceIds=[sid])
    if notes: c['notes'] = notes
    return c

def dump(p, v):
    p.parent.mkdir(parents=True, exist_ok=True)
    p.write_text(json.dumps(v, indent=2, ensure_ascii=False)+'\n')

sources = {}; failures = []; conflicts = []; coverage = []; written = set()
def fetch(url):
    if urlsplit(url).netloc not in {urlsplit(ORIGIN).netloc, urlsplit(WIKI).netloc}: raise ValueError('Unexpected origin')
    CACHE.mkdir(parents=True, exist_ok=True)
    p = CACHE / ('loadouts-'+hashlib.sha256(url.encode()).hexdigest()+'.html')
    if not p.exists():
        r = subprocess.run(['curl','--silent','--show-error','--fail','--max-time','30','--retry','2','--retry-delay','1',url],capture_output=True)
        if r.returncode: raise RuntimeError(r.stderr.decode(errors='replace'))
        text = r.stdout.decode()
        if '<html' not in text.lower(): raise ValueError('Not HTML (redirects not followed)')
        p.write_text(text); time.sleep(.2)
    root = Parser(p.read_text()).root
    sid = 'loadouts-'+('wiki-' if url.startswith(WIKI) else 'gameslantern-')+(slug(urlsplit(url).path) or 'home')
    sources[sid] = dict(id=sid,kind='secondary',title=(root.find('h1')[0].text() if root.find('h1') else url),url=url,accessedAt=DATE)
    return root, sid

def links(root, base, pattern):
    return sorted({urljoin(base,a.attrs.get('href','')) for a in root.find('a') if urlsplit(urljoin(base,a.attrs.get('href',''))).netloc == urlsplit(base).netloc and re.fullmatch(pattern,urlsplit(urljoin(base,a.attrs.get('href',''))).path)})

def merge(old, key, incoming, context):
    if incoming['status'] == 'unknown': return
    if old.get(key, unknown())['status'] == 'unknown': old[key] = incoming
    elif old[key]['value'] != incoming['value']:
        conflicts.append(dict(record=context,field=key,preserved=old[key],reported=incoming))

def base(kind, fid, name, sid):
    p = ROOT / ('content/abilities' if kind == 'ability' else 'content/racer-styles') / (fid+'.json')
    if p.exists(): return p, json.loads(p.read_text())
    d = dict(schemaVersion=1,kind=kind,id=fid,publication='published',name=claim(name,sid),aliases=[],summary=unknown(),tags=[],image=None,updatedAt=DATE,gameVersion=None,editorialNotes=None)
    if kind == 'ability': d.update(compatibleModes=unknown('No general mode compatibility established.'),compatibleVehicleClasses=unknown('No general vehicle-class compatibility established.'),variants=[])
    else: d.update(rank=unknown(),traits=[])
    return p,d

def save(p,d):
    # Publication requires sourced identifying copy; traits alone are insufficient.
    # Apply on every save (not only creation) so cached reruns cannot republish it.
    if any(d[field]['status'] == 'unknown' for field in ('name', 'summary')):
        d['publication'] = 'draft'
    d['updatedAt']=DATE; dump(p,d); written.add(str(p.relative_to(ROOT)))

def ability(url):
    root,sid = fetch(url); title = root.find('h1')[0].text()
    match = re.fullmatch(r'(.+) (IV|III|II|I)',title)
    family,rank = (match[1],match[2]) if match else (title,None)
    fid = slug(family); p,d = base('ability',fid,family,sid)
    card = next(n for n in root.find(cls='swgr-card') if n.find('p') and n.find('p')[0].attrs.get('class') == 'text-neutral-300')
    effect = card.find('p')[0].text()
    if not effect: raise ValueError('Missing mechanic text')
    merge(d,'name',claim(family,sid),fid)
    merge(d,'summary',claim(effect,sid),fid)
    vid = slug(title) if rank else fid+'-observed'
    v = next((v for v in d['variants'] if rank and v['rank']['value']==rank),None)
    if v is None: v = next((v for v in d['variants'] if v['id']==vid),None)
    if v is not None: vid = v['id']
    if v is None:
        v = dict(id=vid,rank=unknown(),rarity=unknown(),description=unknown(),energyCost=unknown(),cooldownSeconds=unknown(),durationSeconds=unknown(),tags=[]); d['variants'].append(v)
    merge(v,'rank',claim(rank,sid),fid+'/'+vid)
    merge(v,'description',claim(effect,sid),fid+'/'+vid)
    chips=[n.text() for n in root.find(cls='swgr-chip')]
    if 'Crash ability' in chips:
        d['tags']=sorted(set(d['tags']+['crash-ability']));v['tags']=sorted(set(v['tags']+['crash-ability']))
    if any(x.lower() in {'fault','faulty'} for x in chips): d['tags']=sorted(set(d['tags']+['fault']))
    # Effects with conditional timings are not a universal activation duration.
    for dl in card.find('dl'):
        for k,val in zip(dl.find('dt'),dl.find('dd')):
            field={'energy cost':'energyCost','cooldown':'cooldownSeconds','duration':'durationSeconds'}.get(k.text().lower())
            numeric=re.fullmatch(r'(\d+(?:\.\d+)?)\s*(?:s|seconds)?',val.text(),re.I)
            if field and numeric: merge(v,field,claim(float(numeric[1]),sid),fid+'/'+vid)
    save(p,d);coverage.append(dict(url=url,record=fid,variant=vid,explicitRank=rank))

def style(url):
    root,sid=fetch(url); title=root.find('h1')[0].text();fid=slug(title)
    sections=[n for n in root.find('section', 'swgr-card') if n.find('h2') and re.fullmatch(r'Campaign rank \d+|Multiplayer',n.find('h2')[0].text())]
    if not sections: raise ValueError('No explicit loadout sections')
    summary=next((n.find('p')[0].text() for n in root.find(cls='swgr-card') if n.find('p') and n.find('p')[0].attrs.get('class')=='text-neutral-300'),None)
    seen_labels = {}
    for section in sections:
        label=section.find('h2')[0].text();rank=re.fullmatch(r'Campaign rank (\d+)',label)
        seen_labels[label] = seen_labels.get(label, 0) + 1
        occurrence = seen_labels[label]
        rid=fid+'-campaign-rank-'+rank[1] if rank else fid
        if occurrence > 1:
            rid += '-'+slug(label)+'-loadout-'+str(occurrence)
            label += ' (alternate source section '+str(occurrence)+')'
        p,d=base('racer-style',rid,title,sid)
        merge(d,'name',claim(title,sid),rid)
        # Podracer summaries are narrative lore, not short mechanic facts.
        if summary and len(summary)<220: merge(d,'summary',claim(summary,sid),rid)
        if rank: merge(d,'rank',claim(label,sid),rid)
        traits=[]
        for n in section.find(cls='swgr-card--sunken'):
            names=n.find(cls='swgr-heading');ps=n.find('p')
            if names and ps: traits.append((names[0].text(),ps[0].text()))
        for name,desc in traits:
            t=next((t for t in d['traits'] if slug(t['name']['value'] or '')==slug(name)),None)
            if t is None:
                t=dict(name=claim(name,sid,label),description=claim(desc,sid,label));d['traits'].append(t)
            else:
                merge(t,'name',claim(name,sid,label),rid+'/trait/'+slug(name))
                merge(t,'description',claim(desc,sid,label),rid+'/trait/'+slug(name))
        save(p,d);coverage.append(dict(url=url,record=rid,section=label,traits=len(traits)))

def main():
    discovered={}
    for path in ['/vehicle-parts','/abilities','/racer-styles','/traits']:
        try:
            root,sid=fetch(ORIGIN+path)
            discovered[path]=links(root,ORIGIN,r'/(?:abilities|racer-styles|traits)/[a-z0-9-]+')
        except Exception as e: failures.append(dict(url=ORIGIN+path,error=str(e)))
    for path,fn in [('/abilities',ability),('/racer-styles',style)]:
        for url in sorted(set(discovered.get(path,[]))):
            if not urlsplit(url).path.startswith(path+'/'): continue
            try: fn(url)
            except Exception as e: failures.append(dict(url=url,error=str(e)))
    wiki_reviews=[]
    try:
        root,_=fetch(WIKI)
        urls=links(root,WIKI,r'/(?:guide|tips/[^/]+|unlocks)/?')
        for url in urls:
            try:
                page,_=fetch(url)
                wiki_reviews.append(dict(url=url,note='Reviewed secondary guide; no variant-scoped structured claims imported. Guide prose and build recommendations excluded.',headings=[n.text() for n in page.find('h2')]))
            except Exception as e: failures.append(dict(url=url,error=str(e)))
    except Exception as e: failures.append(dict(url=WIKI,error=str(e)))
    dump(ROOT/'content/imports/gameslantern-loadouts-sources.json',sorted(sources.values(),key=lambda s:s['id']))
    report=['# Loadout import report', '',f'Access date: {DATE}. Run: `python3 scripts/import-gameslantern-loadouts.py`.', '',f'Successfully fetched/reused HTML pages: {len(sources)}. Ability detail pages: {sum("variant" in c for c in coverage)}. Racer-style detail pages: {len(set(c["url"] for c in coverage if "section" in c))}. Style section records: {sum("section" in c for c in coverage)}. Files written: {len(written)}. Failures: {len(failures)}.', '', '## Policy and limitations', '', '- Sequential fetching, finite timeout, two retries; URL-hashed HTML cache under ignored `content/evidence/import-cache`. No artwork downloaded.', '- Every imported claim is reported, with a page-level secondary source dated 2026-10-17. Existing supported claims, IDs, variant IDs, images, and screenshot-only metadata are preserved.', '- Roman numerals come only from explicit title suffixes, never tiers. Unnumbered titles use an observed variant with unknown rank. Timing inside an effect is not assumed to be activation duration. Numeric costs/timings require labeled per-variant fields.', '- Generic style records represent the explicit Multiplayer section; campaign ranks have separate IDs and section notes on traits. Existing generic rank remains unknown. No universal mode compatibility inferred.', '- The linked traits index was reviewed; traits are imported in their explicit style sections, not as invented standalone records (schema has no standalone trait type).', '- Short mechanic facts only; narrative podracer descriptions and guide prose excluded. Wiki guides provide review context, not invented corroboration.', '- `readCatalog` requires the parent to merge this source manifest into the registry. No registry/schema/UI/git/deploy changes made.', '', '## Wiki review', '', '```json',json.dumps(wiki_reviews,indent=2,ensure_ascii=False),'```', '', '## Page and section coverage', '', '```json',json.dumps(coverage,indent=2,ensure_ascii=False),'```', '', '## Fetch or parsing failures', '', '```json',json.dumps(failures,indent=2),'```', '', '## Preserved disagreements (not overwritten)', '', 'Different source wording is logged conservatively, even when semantically compatible.', '', '```json',json.dumps(conflicts,indent=2,ensure_ascii=False),'```', '', '## Files', '']
    draft_ids = []
    for filename in sorted(written):
        entry = json.loads((ROOT / filename).read_text())
        if any(entry[field]['status'] == 'unknown' for field in ('name', 'summary')):
            draft_ids.append(entry['id'])
    publication_report = [
        '## Publication eligibility correction', '',
        'Decision: keep records with an unknown name or summary as `draft`. No summary is fabricated from traits or narrative lore. Known traits and IDs remain unchanged. This rule runs on every save, including cached reruns.', '',
        *['- `'+entry_id+'`: `draft`; summary remains unknown.' for entry_id in draft_ids], '',
        'Verification: compare SHA-256 digests of all owned output files after two successive cached runs of `python3 scripts/import-gameslantern-loadouts.py`; validate isolated schemas, publication eligibility, and unchanged traits/IDs. Full catalog validation still requires the parent manifest merge.', '',
    ]
    report[6:6] = publication_report
    report += ['- `'+f+'`' for f in sorted(written)]
    report += ['- `scripts/import-gameslantern-loadouts.py`','- `content/imports/gameslantern-loadouts-sources.json`','- `docs/import-loadouts-report.md`']
    (ROOT/'docs/import-loadouts-report.md').write_text('\n'.join(report)+'\n')
    print(f'pages={len(sources)} records={len(written)} conflicts={len(conflicts)} failures={len(failures)}')
    return bool(failures)

if __name__=='__main__': raise SystemExit(main())
