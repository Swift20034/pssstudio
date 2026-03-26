/** Basenames shown first in Mythology Makeup (portfolio + hero) when those files exist in `assets/mythology/`. */
export const MYTHOLOGY_PRIORITY_NAMES: readonly string[] = [
  "WhatsApp Image 2026-03-26 at 11.36.19 AM (2).jpeg",
  "WhatsApp Image 2026-03-26 at 11.36.19 AM (1).jpeg",
  "WhatsApp Image 2026-03-26 at 11.36.19 AM.jpeg",
];

function basename(p: string): string {
  const n = p.replace(/\\/g, "/");
  return n.slice(n.lastIndexOf("/") + 1);
}

/** Pinned names first (in list order), then remaining paths sorted by filename. */
export function orderMythologyPaths(paths: string[]): string[] {
  const byBase = new Map(paths.map((p) => [basename(p), p] as const));
  const pinned: string[] = [];
  for (const name of MYTHOLOGY_PRIORITY_NAMES) {
    const hit = byBase.get(name);
    if (hit) pinned.push(hit);
  }
  const pinnedSet = new Set(pinned);
  const rest = paths
    .filter((p) => !pinnedSet.has(p))
    .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));
  return [...pinned, ...rest];
}
