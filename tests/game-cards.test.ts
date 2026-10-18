import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { EffectText, GameCard, GAME_ICON_ASSETS, type GameCardProps } from "../src/components/game-card";

// Assertion-only decoding: never use this to render sourced text.
function text(html: string) {
  return html.replace(/<[^>]*>/g, "").replace(/&(amp|lt|gt|quot|#x27|#39);/g, (_, entity: string) => ({ amp: "&", lt: "<", gt: ">", quot: '"', "#x27": "'", "#39": "'" })[entity]!);
}
const props: GameCardProps = { id: "test", name: "Heated Fuel", kind: "part", effect: "Redlining increases power of next Afterburner by 25%." };
function card(overrides: Partial<GameCardProps> = {}) { return renderToStaticMarkup(createElement(GameCard, { ...props, ...overrides })); }

test("inline highlights retain exact effect text, punctuation, spacing and surrounding words", () => {
  for (const effect of [props.effect, "Before Cooled, then Frozen & Shielded; after.", "Gain Surging for 10s. Overtakes, Takedowns , and vehicle collisions extend the duration. Takedowns recharge Energy .", "No keywords:  25% < 50%."]) {
    const html = renderToStaticMarkup(createElement(EffectText, { text: effect }));
    assert.equal(text(html), effect);
    if (/Afterburner|Frozen|Surging/.test(effect)) assert.match(html, /<em class="game-keyword/);
    const paragraph = card({ effect }).match(/<p class="game-card-effect">([\s\S]*?)<\/p>/)?.[1];
    assert.notEqual(paragraph, undefined);
    assert.equal(text(paragraph!), effect);
  }
});

test("untrusted names, subtitles and effects are escaped, not interpreted as markup", () => {
  const attack = '<script>alert("x")</script> & Afterburner <img src=x onerror=alert(1)>';
  const html = card({ name: attack, subtitle: attack, effect: attack });
  assert.doesNotMatch(html, /<script|<img src=x|<[^>]+onerror=/);
  assert.match(html, /&lt;script&gt;/);
  assert.equal(text(html.match(/<h3[^>]*>([\s\S]*?)<\/h3>/)![1]), attack);
  assert.equal(text(renderToStaticMarkup(createElement(EffectText, { text: attack }))), attack);
});

test("Roman ranks are appended once, including names already suffixed with that rank", () => {
  for (const rank of ["I", "II", "IV"]) {
    for (const name of ["Heated Fuel", `Heated Fuel ${rank}`]) {
      const html = card({ name, rank });
      assert.equal(text(html.match(/<h3[^>]*>([\s\S]*?)<\/h3>/)![1]), `Heated Fuel ${rank}`);
      assert.match(html, new RegExp(`data-rank="${rank}"`));
    }
  }
});

test("unknown rank is labeled without invented rarity or ratings; selection and child controls survive", () => {
  const plain = card({ rank: null });
  assert.match(plain, /RANK UNKNOWN/);
  assert.doesNotMatch(plain, /data-rank=|RANK (I|II|III|IV)\b|Common|Rare|Epic|Legendary|rating|SELECTED|game-card--selected|game-card-controls/i);
  const selected = card({ rank: null, selected: true, children: createElement("button", { type: "button", disabled: true }, "Remove part") });
  assert.match(selected, /game-card--selected/);
  assert.match(selected, /SELECTED/);
  assert.match(selected, /game-card-controls/);
  assert.match(selected, /<button type="button" disabled="">Remove part<\/button>/);
});

test("all nine mapped icons are real 128x128 RGBA PNG assets rendered as game artwork", async () => {
  const ids = ["overtaking-surge", "status-scrubber", "ion-blast", "optimized-fuel", "optimized-surge", "vectored-shockwave", "impact-surge", "cooling-dampers", "depleted-shielding"];
  assert.deepEqual(Object.keys(GAME_ICON_ASSETS).sort(), [...ids].sort());
  for (const id of ids) {
    const asset = GAME_ICON_ASSETS[id];
    assert.equal(asset, `/game-icons/${id}.png`);
    const png = await readFile(`public${asset}`);
    assert.deepEqual(png.subarray(0, 8), Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]));
    assert.equal(png.readUInt32BE(8), 13);
    assert.equal(png.toString("ascii", 12, 16), "IHDR");
    assert.equal(png.readUInt32BE(16), 128);
    assert.equal(png.readUInt32BE(20), 128);
    assert.equal(png[24], 8);
    assert.equal(png[25], 6); // RGBA, not RGB or indexed palette.
    const html = card({ id, name: id.replaceAll("-", " "), kind: "ability" });
    assert.match(html, /<img[^>]*data-artwork="game"/);
    assert.ok(html.includes(`src="${asset}"`));
    assert.match(html, /width="128" height="128"/);
    assert.doesNotMatch(html, /\/_next\/image/);
  }
  const fallback = card({ id: "unmapped-part", name: "Unmapped Part" });
  assert.match(fallback, /<svg/);
  assert.doesNotMatch(fallback, /<img|data-artwork="game"|\/game-icons\//);
});
