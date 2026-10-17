import { buildPlanSchema, type BuildPlan } from "./plan";

/** Application URL-size guardrail, not a game rule. */
export const MAX_ENCODED_LENGTH = 24_000;
export function encodeBuildPlan(input: BuildPlan): string {
  const plan = buildPlanSchema.parse({ ...input, visibility: "unlisted" });
  const bytes = new TextEncoder().encode(JSON.stringify(plan));
  let binary = "";
  for (const byte of bytes) binary += String.fromCharCode(byte);
  const token = btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
  if (token.length > MAX_ENCODED_LENGTH) throw new Error("This plan is too large for a share link (24,000 encoded characters maximum). Shorten notes or remove rounds.");
  return token;
}
export function decodeBuildPlan(token: string): BuildPlan {
  if (!token || token.length > MAX_ENCODED_LENGTH) throw new Error("Share link is empty or exceeds the 24,000-character application limit.");
  if (!/^[A-Za-z0-9_-]+$/.test(token) || token.length % 4 === 1) throw new Error("Share link contains invalid encoded data.");
  try {
    const binary = atob(token.replace(/-/g, "+").replace(/_/g, "/"));
    const bytes = Uint8Array.from(binary, (char) => char.charCodeAt(0));
    return buildPlanSchema.parse(JSON.parse(new TextDecoder("utf-8", { fatal: true }).decode(bytes)));
  } catch { throw new Error("This share link does not contain a valid build plan. It may be damaged or use an unsupported schema."); }
}
export function buildShareUrl(plan: BuildPlan, origin: string): string {
  return `${new URL("/builder", origin).href}#plan=${encodeBuildPlan(plan)}`;
}
