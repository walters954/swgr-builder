#!/usr/bin/env python3
"""Import reviewed, short world facts. Standard library only; <=3 concurrent GETs.
HTML is cached in ignored content/evidence/import-cache. No images are downloaded.
Run --discover to refresh the cache inventory; default applies reviewed mappings.
"""
import argparse
import concurrent.futures
import hashlib
import json
import re
import subprocess
import urllib.request
from datetime import date
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import urljoin, urlparse

ROOT = Path(__file__).resolve().parents[1]
CACHE = ROOT / 'content/evidence/import-cache'
GL = 'https://galacticracer.gameslantern.com'
WIKI = 'https://swgalacticracer.wiki'
SEEDS = [GL + '/' + x for x in ['vehicle-parts', 'racers', 'vehicles', 'vehicle-classes', 'tracks', 'planets']] + [WIKI + '/'] + [WIKI + '/' + x + '/' for x in ['characters', 'vehicles', 'tracks']]

class Page(HTMLParser):
    def __init__(self, html):
        super().__init__()
        self.links, self.text, self.skip = [], [], 0
        self.feed(html)
    def handle_starttag(self, tag, attrs):
        if tag in ('script', 'style'): self.skip += 1
        if tag == 'a':
            href = dict(attrs).get('href')
            if href: self.links.append(href)
        if tag in ('h1', 'h2', 'h3', 'p', 'tr', 'li', 'div'): self.text.append('\n')
    def handle_endtag(self, tag):
        if tag in ('script', 'style') and self.skip: self.skip -= 1
    def handle_data(self, data):
        if not self.skip: self.text.append(data)
    def lines(self):
        return '\n'.join(' '.join(line.split()) for line in ''.join(self.text).splitlines() if line.strip())

def fetch(url):
    parsed = urlparse(url)
    if parsed.scheme != 'https' or parsed.netloc not in (urlparse(GL).netloc, urlparse(WIKI).netloc):
        raise ValueError('Not an allowed public source URL: ' + url)
    target = CACHE / (hashlib.sha256(url.encode()).hexdigest() + '.html')
    if target.exists(): return target.read_text()
    request = urllib.request.Request(url, headers={'User-Agent': 'SWGR-reference-import/1.0'})
    with urllib.request.urlopen(request, timeout=40) as response:
        if urlparse(response.url).netloc != parsed.netloc: raise ValueError('Cross-host redirect')
        data = response.read(8_000_000)
    text = data.decode('utf-8')
    target.write_text(text)
    return text

def discover():
    CACHE.mkdir(parents=True, exist_ok=True)
    ignored = subprocess.run(['git', 'check-ignore', str(CACHE / 'probe')], cwd=ROOT, capture_output=True)
    if ignored.returncode: raise RuntimeError('Cache must be git-ignored before fetching')
    pages, failures = {}, {}
    def batch(urls):
        with concurrent.futures.ThreadPoolExecutor(max_workers=3) as pool:
            futures = {pool.submit(fetch, url): url for url in urls}
            for future in concurrent.futures.as_completed(futures):
                url = futures[future]
                try: pages[url] = Page(future.result())
                except Exception as error: failures[url] = str(error)
    batch(SEEDS)
    details = set()
    for url, page in list(pages.items()):
        for href in page.links:
            target = urljoin(url, href).split('#')[0].split('?')[0]
            p = urlparse(target)
            if p.netloc != urlparse(url).netloc: continue
            segments = p.path.strip('/').split('/')
            families = ('racers', 'vehicles', 'vehicle-classes', 'tracks', 'planets') if url.startswith(GL) else ('characters', 'vehicles', 'tracks')
            if len(segments) == 2 and segments[0] in families: details.add(target)
    batch(sorted(details - pages.keys()))
    inventory = {'pages': {url: {'text': p.lines(), 'links': p.links} for url, p in sorted(pages.items())}, 'failures': failures}
    (CACHE / 'world-inventory.json').write_text(json.dumps(inventory, indent=2))
    print(f'Cached {len(pages)} pages; {len(failures)} failures. Inventory: {CACHE}/world-inventory.json')
    return inventory

def apply(inventory):
    today = date.today().isoformat()
    sources, conflicts, coverage, audit = {}, [], [], []
    existing_sources = {s['id'] for s in json.loads((ROOT / 'content/sources.json').read_text())}

    def unknown(note='No explicit, reviewed source for this field.'):
        return {'status': 'unknown', 'value': None, 'sourceIds': [], 'notes': note}

    def source(url, title):
        p = urlparse(url)
        sid = ('world-gl-' if p.netloc == urlparse(GL).netloc else 'world-wiki-') + p.path.strip('/').replace('/', '-')
        sources[sid] = {'id': sid, 'kind': 'secondary', 'title': title, 'url': url, 'accessedAt': today}
        return sid

    def claim(value, sid, notes=None):
        result = {'status': 'reported', 'value': value, 'sourceIds': [sid]}
        if notes: result['notes'] = notes
        return result

    def common(kind, ident, name, summary, sid):
        return {'schemaVersion': 1, 'kind': kind, 'id': ident, 'publication': 'published',
                'name': claim(name, sid), 'summary': claim(summary, sid), 'aliases': [], 'tags': [],
                'image': None, 'updatedAt': today, 'gameVersion': None,
                'editorialNotes': 'Third-party reported facts; recorded contexts are not universal compatibility.'}

    def merge(old, new, location):
        # Preserve all known claims, child IDs, metadata and existing arrays. Never union
        # modes: a partial list must not silently become a claim of exhaustive availability.
        if isinstance(old, dict) and isinstance(new, dict):
            if 'status' in old:
                if old['status'] == 'unknown' and new.get('status') == 'reported': return new
                if new.get('status') == 'reported' and old.get('value') != new.get('value'):
                    conflicts.append(f"{location}: retained {json.dumps(old.get('value'), ensure_ascii=False)} ({old['status']}); candidate {json.dumps(new['value'], ensure_ascii=False)} — {sources[new['sourceIds'][0]]['url']}")
                return old
            for key, value in new.items():
                if key in old: old[key] = merge(old[key], value, location + '.' + key)
                else: old[key] = value
        return old

    def save(folder, entry, url):
        directory = ROOT / 'content' / folder
        directory.mkdir(parents=True, exist_ok=True)
        path = directory / (entry['id'] + '.json')
        if path.exists(): entry = merge(json.loads(path.read_text()), entry, folder + '/' + entry['id'])
        # Capture every retained import claim, including runs where no file changes.
        def claims(value, location):
            if isinstance(value, dict):
                if value.get('status') == 'reported' and any(s in sources for s in value.get('sourceIds', [])):
                    urls = [sources[s]['url'] for s in value['sourceIds'] if s in sources]
                    audit.append((folder + '/' + entry['id'] + ':' + location, json.dumps(value['value'], ensure_ascii=False), ', '.join(urls)))
                else:
                    for key, child in value.items(): claims(child, location + '.' + key)
            elif isinstance(value, list):
                for index, child in enumerate(value): claims(child, location + '[' + str(index) + ']')
        claims(entry, '')
        rendered = json.dumps(entry, ensure_ascii=False, indent=2) + '\n'
        if not path.exists() or json.loads(path.read_text()) != entry: path.write_text(rendered)
        coverage.append((folder, entry['id'], url))

    environments = {
        'ando-prime': ('Frozen tundra with steep cliffs.', 'ice world'),
        'crait': ('Salt plains and crystal caves.', 'salt world'),
        'derven-acos': ('Debris-ringed planetoid with a racing stadium.', 'ring of space debris'),
        'jakku': ('Hot desert scattered with starship wreckage.', 'desert world'),
        'lantaana': ('Jungle terrain with lava and cool waterways.', 'jungle planet'),
        'sentinel-i': ('Acid rivers and mineral-harvesting installations.', 'acid rivers'),
        'tatooine': ('Desert setting with a long podracing history.', 'desert domain'),
    }
    class_summaries = {
        'landspeeder': 'Stable racing craft designed for drifting through turns.',
        'speeder-bike': 'Agile racing bike with rapid acceleration and Kinetic Burst.',
        'skim-speeder': 'Banking racing craft with a Knife Edge cornering technique.',
        'podracer': 'Racing craft that uses an air brake for tighter turns.',
    }
    class_names = {'Landspeeder': 'landspeeder', 'Speeder Bike': 'speeder-bike', 'Skim Speeder': 'skim-speeder', 'Podracer': 'podracer'}
    species = ['Namaran', 'Toong', 'Crocin', 'Vulptereen', 'Xexto', 'Ardennian', 'Nautolan', 'Trandoshan', 'Zabrak', 'Er’Kit', 'Tognath', 'Veknoid']
    for url, page in sorted(inventory['pages'].items()):
        p = urlparse(url)
        segments = p.path.strip('/').split('/')
        if p.netloc != urlparse(GL).netloc or len(segments) != 2: continue
        family, ident = segments
        text = page['text']
        start = text.find('Home\n/\n')
        if start < 0:
            conflicts.append(url + ': no recognized breadcrumb; skipped')
            continue
        body = text[start:].split('Community\n')[0]
        lines = body.splitlines()
        if family == 'vehicles':
            match = re.search(r'\nClass\n(Landspeeder|Speeder Bike|Skim Speeder|Podracer)\n', body)
            if not match: raise ValueError('Missing class: ' + url)
            cls = match.group(1)
            name = lines[6]
            sid = source(url, 'GamesLantern — ' + name)
            manufacturer = re.search(r'\nManufacturer\n([^\n]+)', body)
            summary = f'{name} is a {cls.lower()} kit' + (f' from {manufacturer.group(1)}.' if manufacturer else '.')
            entry = common('vehicle', ident, name, summary, sid)
            entry.update(vehicleClass=claim(class_names[cls], sid), manufacturer=claim(manufacturer.group(1), sid) if manufacturer else unknown(), availableModes=unknown('Kit listing is not evidence of global mode availability.'))
            save('vehicles', entry, url)
        elif family == 'tracks':
            name = lines[6]
            match = re.search(r'\nPlanet\n([^\n]+)', body)
            if not match: raise ValueError('Missing planet: ' + url)
            planet = match.group(1)
            sid = source(url, 'GamesLantern — ' + name)
            entry = common('track', ident, name, f'{name} is a race course on {planet}.', sid)
            # Only explicit arcade events. Standard/Shakedown/Memory are not mode enums.
            arcade = bool(re.search(r'events? races? on it, across [^\n]*arcade', body))
            entry.update(planet=claim(planet, sid), hazards=claim(['Mines on some routes'], sid, 'Route-specific; not present on every configuration.') if re.search(r'one of them mined', body) else unknown('No reviewed course-specific hazard claim; planet conditions are not propagated.'), availableModes=claim(['arcade'], sid, 'Arcade events are explicitly recorded; this is not an exhaustive compatibility list.') if arcade else unknown('Standard, Shakedown and Memory route labels are not mapped to game modes.'))
            save('tracks', entry, url)
        elif family == 'planets':
            name = lines[4]
            sid = source(url, 'GamesLantern — ' + name)
            environment, anchor = environments[ident]
            if anchor not in body: raise ValueError('Missing reviewed environment evidence: ' + url)
            entry = common('planet', ident, name, f'{name} is a racing destination in the Galactic League.', sid)
            entry['environment'] = claim(environment, sid)
            save('planets', entry, url)
        elif family == 'vehicle-classes':
            name = lines[4]
            sid = source(url, 'GamesLantern — ' + name)
            entry = common('vehicle-class', ident, name, class_summaries[ident], sid)
            entry.update(availableModes=unknown('Class listing does not establish an exhaustive mode list.'), traits=[])
            save('vehicle-classes', entry, url)
        elif family == 'racers':
            name = lines[4]
            sid = source(url, 'GamesLantern — ' + name)
            racer = re.search(re.escape(name) + r' races (.+?) with the (.+?) style\.', body)
            entry = common('character', ident, name, f'{name} is listed as a Galactic League racer.' if racer else f'{name} works as Shade’s mechanic.', sid)
            modes = ['multiplayer-tour'] if 'They race in the Multiplayer Tour.' in body else ['podrace-tour'] if 'They race in the Podracing Tour.' in body else None
            explicit_species = next((s for s in species if s in lines[8]), None)
            entry.update(roles=claim(['racer'] if racer else ['mechanic'], sid), species=claim(explicit_species, sid) if explicit_species else unknown('No unambiguous species identification reviewed; no species inferred from appearance or name.'), playableModes=claim(modes, sid, 'Explicit tour participation, not an exhaustive availability list.') if modes else unknown('Roster membership alone does not establish playable availability.'), vehicleProfiles=[], loadouts=[])
            # Prefer the expressly contextual multiplayer section, not the summary's
            # campaign style, which can disagree with the pod/multiplayer style.
            if modes == ['multiplayer-tour'] and racer:
                style_section = body.split(name + '’s multiplayer traits\nAll traits\n')
                if len(style_section) == 2:
                    style = style_section[1].splitlines()[0]
                    entry['loadouts'] = [{'id': 'reported-multiplayer-tour', 'mode': 'multiplayer-tour', 'racerStyle': claim(style, sid, 'Style heading in the multiplayer traits section.'), 'abilityIds': unknown('Ability names remain unlinked pending parent ability manifest integration.'), 'traits': []}]
            save('characters', entry, url)

    url = WIKI + '/characters/darius-pax/'
    if url in inventory['pages']:
        text = inventory['pages'][url]['text']
        if 'founded the Galactic League' not in text or 'Besalisk businessman' not in text: raise ValueError('Darius evidence changed')
        sid = source(url, 'Galactic Racer Wiki — Darius Pax')
        entry = common('character', 'darius-pax', 'Darius Pax', 'Darius Pax founded the Galactic League and recruits Shade.', sid)
        entry.update(roles=claim(['founder'], sid), species=claim('Besalisk', sid), playableModes=unknown('Story role is not evidence for or against playable availability.'), vehicleProfiles=[], loadouts=[])
        save('characters', entry, url)

    manifest = [s for sid, s in sorted(sources.items()) if sid not in existing_sources]
    out = ROOT / 'content/imports/world-sources.json'
    out.parent.mkdir(parents=True, exist_ok=True)
    out.write_text(json.dumps(manifest, ensure_ascii=False, indent=2) + '\n')
    counts = {family: sum(row[0] == family for row in coverage) for family in sorted({r[0] for r in coverage})}
    report = ['# World content import report', '', f'Accessed: {today}. All imported claims are **reported**, supported by secondary source pages. No third-party “Official” badge is treated as official evidence.', '', '## Method and limits', '', '- Standard-library GET importer; at most three simultaneous requests, with persistent ignored HTML cache. No images downloaded or reused. No biographies or guides copied.', '- Existing known claims, IDs, images, child arrays, official facts and screenshot evidence are preserved. Unknown fields alone are filled. Different candidate values are logged below, not substituted.', '- Only named vehicle kits become vehicles. Wiki planet guides are not course records; Sentinel One on the wiki corresponds to Sentinel I on GamesLantern, not a new course.', '- No statistics, lengths, unlock ranks, prices or global compatibility inferred. Explicit arcade events and racer tour participation are recorded as partial context.', '- Hibi and Darius Pax remain playable-mode unknown. No Human species inferred. Unreviewed abilities remain unknown references until the parent integrates the ability manifest.', '- Existing nonempty loadout/trait/profile arrays are not merged. Empty existing arrays also remain unchanged to preserve curated context.', '- Parent action: merge `content/imports/world-sources.json` into `content/sources.json` before ordinary `readCatalog` validation. This worker does not edit the source registry.', '- Parent action: extend CLI asset validation enumeration and schema generation for vehicles/tracks/planets; these files are outside worker ownership. Shared image source/permission checks already apply in validateCatalog.', '', '## Coverage', '', f'Fetched/cached pages: {len(inventory["pages"])}. Fetch failures: {len(inventory["failures"])}.', '', '| Family | Records reviewed/applied |', '| --- | ---: |']
    report += [f'| {family} | {count} |' for family, count in counts.items()]
    report += ['', '### Discovery inventory', '', '| Source page | Disposition |', '| --- | --- |']
    used = {row[2] for row in coverage}
    for url in sorted(inventory['pages']):
        disposition = 'Structured facts reviewed/applied' if url in used else 'Discovery/context only; guide or index, no additional claims imported'
        report.append(f'| {url} | {disposition} |')
    report += ['', '### Fetch failures', ''] + ([f'- {url}: {error}' for url, error in sorted(inventory['failures'].items())] or ['None.'])
    report += ['', '## Conflicts and retained claims', '', '- Wiki Kestar Bool guide reports Rank 40 / Weaponised; GamesLantern reports Rank 39 / Weaponized. Neither unlock rank is imported; existing known claims remain untouched.', '- GamesLantern introductory racer style may differ from its multiplayer style headings (notably pod racers). Pod summary styles are not assigned to tour loadouts.', '- Wiki third-party “Official” badges do not change evidence classification.']
    report += ['- ' + c for c in conflicts]
    report += ['', '## Imported claim provenance', '', 'Each row names the retained import claim, its structured value, and its supporting public page. Unknown claims carry no source IDs.', '', '| Record / field | Value | Source page |', '| --- | --- | --- |']
    def cell(s): return s.replace('|', '\\|').replace('\n', ' ')
    report += [f'| {cell(location)} | {cell(value)} | {url} |' for location, value, url in audit]
    (ROOT / 'docs/import-world-report.md').write_text('\n'.join(report) + '\n')
    print('Applied world facts:', counts, '; source entries awaiting parent merge:', len(manifest))


if __name__ == '__main__':
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--discover', action='store_true')
    args = parser.parse_args()
    inventory = discover()
    if not args.discover:
        apply(inventory)
