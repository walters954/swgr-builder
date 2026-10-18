#!/usr/bin/env python3
"""Extract owner-uploaded game pictograms; requires an already-installed Pillow.

Usage: python3 scripts/extract-game-icons.py --source-dir /path/to/images
Writes public/game-icons/*.png; existing derived assets require --overwrite.
Coordinates below are native pixels, top-left origin, (left, top, right, bottom),
with exclusive right/bottom edges. Sources are evidence, never modified.
The ICONS keys are the content-ID -> /game-icons/<ID>.png index.
No screenshot panels, text, card frames, or tooltip graphics are retained.
"""

import argparse
from pathlib import Path

from PIL import Image

SOURCES = {
    9: "image-9-65c5b56bdf4f0d22.bin",
    11: "image-11-cdde949a0ae7fe10.bin",
    16: "image-16-554aa64d86293ccb.bin",
}
# Rectangles visually checked at native resolution before extraction.
ICONS = {
    "overtaking-surge": (16, (954, 1050, 1092, 1213)),
    "status-scrubber": (16, (1764, 1048, 1880, 1199)),
    "ion-blast": (16, (930, 1587, 1114, 1702)),
    "optimized-fuel": (16, (2668, 756, 2716, 834)),
    "optimized-surge": (16, (2668, 986, 2738, 1068)),
    "vectored-shockwave": (11, (897, 1187, 1048, 1298)),
    "impact-surge": (11, (1693, 1177, 1832, 1332)),
    "cooling-dampers": (9, (2684, 470, 2750, 533)),
    "depleted-shielding": (9, (2686, 930, 2750, 997)),
}
EXPECTED_SIZES = {9: (3767, 2117), 11: (3771, 1757), 16: (3792, 1811)}
SIZE = 128
PADDING = 12


def extract(source, rect):
    crop = source.convert("RGB").crop(rect)
    # Teal backgrounds have low red values. Neutral white line art survives;
    # a soft threshold preserves its original antialiasing without teal RGB.
    alpha = Image.new("L", crop.size)
    alpha.putdata([round(max(0, min(1, (min(rgb) - 210) / 35)) * 255)
                   for rgb in crop.get_flattened_data()])
    bbox = alpha.getbbox()
    if bbox is None:
        raise ValueError(f"No white pictogram in {rect}")
    alpha = alpha.crop(bbox)
    scale = (SIZE - 2 * PADDING) / max(alpha.size)
    alpha = alpha.resize((max(1, round(alpha.width * scale)), max(1, round(alpha.height * scale))), Image.Resampling.LANCZOS)
    # Standardize the actual pictogram footprint so small source icons remain legible.
    mask = Image.new("L", (SIZE, SIZE))
    mask.paste(alpha, ((SIZE - alpha.width) // 2, (SIZE - alpha.height) // 2))
    output = Image.new("RGBA", (SIZE, SIZE), (255, 255, 255, 0))
    output.putalpha(mask)
    return output


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--source-dir", type=Path, required=True)
    parser.add_argument("--overwrite", action="store_true", help="Regenerate existing derived icons; originals are never modified.")
    args = parser.parse_args()
    destination = Path(__file__).resolve().parents[1] / "public" / "game-icons"
    for name in ICONS:
        if (destination / f"{name}.png").exists() and not args.overwrite:
            raise FileExistsError(f"Refusing to overwrite {name}.png")
    sources = {}
    for number, filename in SOURCES.items():
        with Image.open(args.source_dir / filename) as image:
            if image.size != EXPECTED_SIZES[number]:
                raise ValueError(f"Unexpected source dimensions: {filename}: {image.size}")
            sources[number] = image.convert("RGB")
    outputs = [(name, extract(sources[number], rect), number, rect)
               for name, (number, rect) in ICONS.items()]
    destination.mkdir(parents=True, exist_ok=True)
    for name, image, number, rect in outputs:
        path = destination / f"{name}.png"
        # Exclusive creation also protects against files added during extraction.
        with path.open("wb" if args.overwrite else "xb") as handle:
            image.save(handle, format="PNG")
        print(f"{name}: /game-icons/{name}.png <- {SOURCES[number]} {rect}")


if __name__ == "__main__":
    main()
