#!/usr/bin/env python3
"""Import public factual part tooltips, preserving all existing non-unknown claims.

Run from the repository root. Downloads only index-discovered same-origin HTML,
with three workers, finite timeouts/retries, and an ignored local evidence cache.
Optional price/unlock fields are emitted only when the current editor schema allows them.
"""
import concurrent.futures
import argparse
from html.parser import HTMLParser
import json
from pathlib import Path
import re
import subprocess
import time
from urllib.parse import urljoin, urlsplit

ROOT = Path(__file__).resolve().parents[1]
CACHE = ROOT / 'content/evidence/import-cache'
DATE = '2026-10-17'
INDEX = 'https://galacticracer.gameslantern.com/vehicle-parts'
WIKI = 'https://swgalacticracer.wiki/'
CACHE_ONLY = False

class Node:
    def __init__(self, tag='', attrs=()):
        self.tag, self.attrs, self.children = tag, dict(attrs), []
    def text(self):
        return re.sub(r'\s+', ' ', ''.join(c.text() if isinstance(c, Node) else c for c in self.children)).strip()
    def find(self, tag=None, cls=None):
        out = []
        for c in self.children:
            if isinstance(c, Node):
                if (tag is None or c.tag == tag) and (cls is None or cls in c.attrs.get('class', '').split()):
                    out.append(c)
                out.extend(c.find(tag, cls))
        return out

class Parser(HTMLParser):
    def __init__(self, text):
        super().__init__(convert_charrefs=True)
        self.root = Node(); self.stack = [self.root]; self.feed(text)
    def handle_starttag(self, tag, attrs):
        n = Node(tag, attrs); self.stack[-1].children.append(n)
        if tag not in {'img','input','br','hr','meta','link','source','wbr','area','base','embed','param','track','col'}:
            self.stack.append(n)
    def handle_endtag(self, tag):
        for i in range(len(self.stack)-1, 0, -1):
            if self.stack[i].tag == tag:
                del self.stack[i:]; break
    def handle_data(self, data):
        self.stack[-1].children.append(data)

def fetch(url, filename=None):
    CACHE.mkdir(parents=True, exist_ok=True)
    p = CACHE / (filename or (urlsplit(url).path.rstrip('/').split('/')[-1] + '.html'))
    if not p.exists():
        if CACHE_ONLY:
            raise RuntimeError(f'Cache-only mode: missing {p.name}; no network request made')
        # No redirects: never follow an unexpected cross-origin redirect.
        r = subprocess.run(['curl','--silent','--show-error','--fail','--max-time','30',
                            '--retry','2','--retry-delay','1',url], capture_output=True)
        if r.returncode: raise RuntimeError(r.stderr.decode(errors='replace'))
        text = r.stdout.decode('utf-8')
        if '<html' not in text.lower(): raise ValueError('Not an HTML document')
        p.write_text(text)
        time.sleep(0.15)
    return Parser(p.read_text()).root

def slug(text):
    return re.sub('[^a-z0-9]+', '-', text.lower()).strip('-')

def claim(value, sid):
    if value is None: return {'status':'unknown','value':None,'sourceIds':[], 'notes':'Not explicitly stated on the source page.'}
    return {'status':'reported','value':value,'sourceIds':[sid]}

def dump(path, data):
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(json.dumps(data, indent=2, ensure_ascii=False)+'\n')

def parse_part(url):
    root = fetch(url)
    title = root.find('h1')[0].text()
    # Only the detail header/card, never the related-family table or guide prose.
    chips = [n.text() for n in root.find(cls='swgr-chip')]
    card = next(n for n in root.find(cls='swgr-card') if n.find('p') and n.find('p')[0].attrs.get('class') == 'text-neutral-300')
    effect = card.find('p')[0].text()
    if not title or not effect: raise ValueError('Missing name/effect')
    match = re.fullmatch(r'(.+) (IV|III|II|I)', title)
    family, rank = (match[1], match[2]) if match else (title, None)
    tier = next((int(c.split()[1]) for c in chips if re.fullmatch(r'Tier [1-4]', c)), None)
    if rank is None and tier is not None: rank = ['I','II','III','IV'][tier-1]
    if match and tier is not None and ['I','II','III','IV'][tier-1] != rank:
        raise ValueError('Title/tier disagree')
    rarity = next((c for c in chips if c in {'Common','Rare','Epic','Legendary','Experimental','Fault','Faulty'}), None)
    price = next((int(c.split()[0].replace(',','')) for c in chips if re.fullmatch(r'[\d,]+ credits', c)), None)
    unlock = None
    for dl in card.find('dl'):
        terms, values = dl.find('dt'), dl.find('dd')
        for k,v in zip(terms,values):
            if k.text() == 'How to unlock': unlock = v.text() or None
    return dict(url=url,title=title,family=family,rank=rank,rarity=rarity,description=effect,priceCredits=price,unlock=unlock)

def main():
    global CACHE_ONLY
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--cache-only', action='store_true', help='Use cached parsed records and HTML only; never access the network')
    CACHE_ONLY = parser.parse_args().cache_only
    # The runtime Zod schema is authoritative; generated editor JSON may lag it.
    result = subprocess.run([str(ROOT/'node_modules/.bin/tsx'), '-e',
        'import { z } from "zod"; import { partSchema } from "./src/lib/content/schema"; console.log(JSON.stringify(z.toJSONSchema(partSchema)));'],
        cwd=ROOT, capture_output=True, text=True, check=True)
    schema = json.loads(result.stdout)
    allowed = schema['properties']['variants']['items']['properties']
    index = fetch(INDEX, 'gameslantern-index.html')
    urls = sorted({urljoin(INDEX,n.attrs.get('href','')) for n in index.find('a')
                   if urlsplit(urljoin(INDEX,n.attrs.get('href',''))).netloc == urlsplit(INDEX).netloc
                   and re.fullmatch('/vehicle-parts/[a-z0-9-]+',urlsplit(urljoin(INDEX,n.attrs.get('href',''))).path)})
    wiki = fetch(WIKI, 'wiki-index.html')
    wiki_urls = sorted({urljoin(WIKI,n.attrs.get('href','')) for n in wiki.find('a')
                        if urlsplit(urljoin(WIKI,n.attrs.get('href',''))).netloc == urlsplit(WIKI).netloc
                        and urlsplit(urljoin(WIKI,n.attrs.get('href',''))).path in {'/guide/','/tips/campaign-builds/','/unlocks/'}})
    failures, records, wiki_notes = [], [], []
    for url in wiki_urls:
        try:
            page = fetch(url, 'wiki-'+slug(urlsplit(url).path)+'.html')
            wiki_notes.append(f'- {url}: reviewed; no dedicated enumerated part detail catalog imported.')
        except Exception as e: failures.append(f'{url}: {e}')
    if CACHE_ONLY:
        records = json.loads((CACHE/'parsed-parts.json').read_text())
        assert len(records) == len(urls) and {r['url'] for r in records} == set(urls), 'Parsed cache does not match discovered catalog'
        for r in records:
            price = r['priceCredits']
            assert price is None or (type(price) is int and price >= 0), r['url']
            assert r['unlock'] is None or (isinstance(r['unlock'], str) and r['unlock'].strip()), r['url']
    else:
        with concurrent.futures.ThreadPoolExecutor(max_workers=3) as pool:
            futures = {pool.submit(parse_part,u):u for u in urls}
            for future in concurrent.futures.as_completed(futures):
                try: records.append(future.result())
                except Exception as e: failures.append(f'{futures[future]}: {e}')
    records.sort(key=lambda r:r['url'])
    existing = {p.stem:json.loads(p.read_text()) for p in (ROOT/'content/parts').glob('*.json')}
    before = json.loads(json.dumps(existing))
    manifest, conflicts, ambiguities, coverage = [], [], [], []
    used = {}
    for r in records:
        fid = slug(r['family']); page_slug = urlsplit(r['url']).path.split('/')[-1]
        sid = 'gameslantern-part-'+page_slug
        manifest.append({'id':sid,'kind':'secondary','title':'Games Lantern — '+r['title'],'url':r['url'],'accessedAt':DATE})
        d = existing.get(fid)
        if d is None:
            d = dict(schemaVersion=1,kind='part',id=fid,publication='published',name=claim(r['family'],sid),aliases=[],
                     summary=claim(('Fault drawback: ' if r['rarity'] in {'Fault','Faulty'} else '')+r['description'],sid),
                     tags=['fault'] if r['rarity'] in {'Fault','Faulty'} else [], image=None,updatedAt=DATE,gameVersion=None,editorialNotes=None,variants=[])
            existing[fid] = d
        if r['rarity'] in {'Fault','Faulty'} and 'fault' not in d['tags']:
            d['tags'].append('fault')
        key = (fid,r['rank'])
        candidates = [v for v in d['variants'] if v['rank']['value']==r['rank']]
        if key in used:
            # Duplicate page slugs are not evidence that two distinct records are interchangeable.
            previous = used[key]
            ambiguities.append(f"- {fid} / {r['rank'] or 'unranked'}: {previous['url']} vs {r['url']}; facts: `{json.dumps({k:previous[k] for k in ['rarity','description','priceCredits','unlock']})}` vs `{json.dumps({k:r[k] for k in ['rarity','description','priceCredits','unlock']})}`. Kept separate page-specific variant.")
            candidates = [v for v in d['variants'] if v['id']==page_slug]
        used[key] = r
        if candidates: v = candidates[0]
        else:
            vid = page_slug if len([x for x in records if slug(x['family'])==fid and x['rank']==r['rank']])>1 and key in used and any(x['rank']['value']==r['rank'] for x in d['variants']) else (r['rank'].lower() if r['rank'] else 'unranked')
            v = {'id':vid}; d['variants'].append(v)
        for field in ['rank','rarity','description','priceCredits','unlock']:
            incoming = r[field]
            old = v.get(field)
            if old and old['status']!='unknown':
                if incoming is not None and old['value'] != incoming:
                    conflicts.append(f"- `{fid}/{v['id']}.{field}` ({old['status']} retained): existing `{old['value']}`; source `{incoming}` — {r['url']}")
                continue
            if field not in allowed: continue
            v[field] = claim(incoming,sid)
        coverage.append('| '+ ' | '.join([r['title'],fid+'/'+v['id'],*[('reported' if r[k] is not None else 'unknown')+(' (deferred)' if k not in allowed else '') for k in ['rank','rarity','description','priceCredits','unlock']]])+' |')
    # Verify that every previously known claim and ID survived exactly.
    for fid, old in before.items():
        new = existing[fid]
        for k,value in old.items():
            if isinstance(value,dict) and value.get('status') not in {None,'unknown'}: assert new[k]==value,(fid,k)
        for ov in old['variants']:
            nv = next(v for v in new['variants'] if v['id']==ov['id'])
            for k,value in ov.items():
                if isinstance(value,dict) and value.get('status')!='unknown': assert nv[k]==value,(fid,ov['id'],k)
    for fid,d in existing.items(): dump(ROOT/'content/parts'/f'{fid}.json', d)
    dump(ROOT/'content/imports/gameslantern-parts-sources.json',manifest)
    # Factual optional-field evidence retained in ignored cache if parent schema has not landed.
    dump(CACHE/'parsed-parts.json', records)
    report = f'''# Parts import report — {DATE}

## Result

- Index: {INDEX}
- Wiki: {WIKI}
- Discovered {len(urls)} detail pages; imported {len(records)} / {len(urls)} (expected catalog: 318).
- {len(existing)} families, {sum(len(d['variants']) for d in existing.values())} variants; {sum(r['rarity'] in {'Fault','Faulty'} for r in records)} Fault pages (source label `Faulty` retained verbatim).
- {len(failures)} fetch/parse failures; {len(ambiguities)} duplicate-family/rank ambiguities; {len(conflicts)} retained field wording/value disagreements.
- Existing known claims, provenance, family IDs and variant IDs asserted unchanged. Unranked observed variants stay unranked; no dot-derived rank or rarity.
- All newly sourced claims are reported. Unknown values remain unknown. No global rarity/price/ranking assumptions.
- Optional fields supported by live runtime schema: priceCredits={str('priceCredits' in allowed).lower()}, unlock={str('unlock' in allowed).lower()}. Explicit page-local evidence: {sum(r['priceCredits'] is not None for r in records)} prices and {sum(r['unlock'] is not None for r in records)} unlock descriptions. Missing evidence remains unknown; no rarity-derived price inference.
- Cache-only execution: {str(CACHE_ONLY).lower()}. This mode uses cached parsed records and refuses all missing-HTML network requests.
- New base summaries use only the short detail-card mechanic effect (with an explicit Fault drawback prefix where applicable), never narrative guide prose. Existing known summaries are preserved.

## Sources and files

- `content/parts/*.json`: catalog families and variants.
- `scripts/import-gameslantern-parts.py`: repeatable import, max 3 fetch workers, 30-second request timeout, 2 retries, cache-first; no redirect following or image downloading.
- `content/imports/gameslantern-parts-sources.json`: {len(manifest)} per-detail secondary sources for parent merge. Does not alter `content/sources.json`.
- `docs/import-parts-report.md`: this report.
- HTML and extracted optional-field evidence only under ignored `content/evidence/import-cache/`, not published.

## Wiki review

Wiki homepage has no dedicated parts index; only discovered same-origin relevant guide links reviewed. No narrative guide prose or images copied. No independent wiki evidence used to upgrade tooltip verification status.

{chr(10).join(wiki_notes)}

## Validation

Importer preservation assertions passed. Structural validation must be run separately against the current schema. Full catalog source-reference validation is pending the parent's source-manifest merge; this report does not claim a full catalog check passes.

## Failures

{chr(10).join('- '+f for f in failures) or 'None.'}

## Duplicate-page ambiguities

{chr(10).join(ambiguities) or 'None.'}

## Retained disagreements

Exact wording differences are included even when likely semantically equivalent; existing verified/reported claims were not overwritten.

{chr(10).join(conflicts) or 'None.'}

## Per-page field coverage

Statuses below describe extracted source evidence, not an upgrade of existing screenshot/official claims. Deferred means absent from current schema.

| Source title | Target family/variant | Rank | Rarity | Effect | Price | Unlock |
| --- | --- | --- | --- | --- | --- | --- |
{chr(10).join(coverage)}

## Explicit price and unlock evidence

These are page-local values, not rarity-derived constants. Faulty page prices are displayed prices; no purchase-versus-clearing interpretation is inferred.

| Detail URL | Price credits | Unlock wording |
| --- | --- | --- |
{chr(10).join('| '+r['url']+' | '+(str(r['priceCredits']) if r['priceCredits'] is not None else 'unknown')+' | '+(r['unlock'] or 'unknown').replace('|', chr(92)+'|')+' |' for r in records)}
'''
    (ROOT/'docs/import-parts-report.md').write_text(report)
    print(f'Imported {len(records)}/{len(urls)} pages: {len(existing)} families, {sum(len(d["variants"]) for d in existing.values())} variants; failures={len(failures)}')
    if failures or len(records)!=318: raise SystemExit(1)

if __name__ == '__main__': main()
