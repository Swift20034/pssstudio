/** Basenames shown first in Bridal Makeup (portfolio + hero) when those files exist in the folder. */
export const BRIDAL_MAKEUP_PRIORITY_NAMES: readonly string[] = [
  "WhatsApp Image 2026-03-26 at 11.28.31 AM.jpeg",
  "WhatsApp Image 2026-03-26 at 10.17.07 AM.jpeg",
  "WhatsApp Image 2026-03-26 at 10.17.08 AM (1).jpeg",
  "WhatsApp Image 2026-03-26 at 10.17.08 AM (2).jpeg",
  "WhatsApp Image 2026-03-26 at 10.17.08 AM.jpeg",
  "WhatsApp Image 2026-03-26 at 10.17.09 AM.jpeg",
  "WhatsApp Image 2026-03-26 at 10.22.51 AM (1).jpeg",
  "WhatsApp Image 2026-03-26 at 10.22.51 AM.jpeg",
  "WhatsApp Image 2026-03-26 at 10.22.52 AM (1).jpeg",
  "WhatsApp Image 2026-03-26 at 10.22.52 AM (2).jpeg",
  "WhatsApp Image 2026-03-26 at 10.22.52 AM (3).jpeg",
  "WhatsApp Image 2026-03-26 at 10.22.52 AM.jpeg",
  "WhatsApp Image 2026-03-26 at 10.22.53 AM (1).jpeg",
  "WhatsApp Image 2026-03-26 at 10.22.53 AM (2).jpeg",
  "WhatsApp Image 2026-03-26 at 10.22.53 AM.jpeg",
  "WhatsApp Image 2026-03-26 at 10.22.54 AM (1).jpeg",
  "WhatsApp Image 2026-03-26 at 10.22.54 AM.jpeg",
  "WhatsApp Image 2026-03-26 at 10.22.55 AM (1).jpeg",
  "WhatsApp Image 2026-03-26 at 10.22.55 AM (2).jpeg",
  "WhatsApp Image 2026-03-26 at 10.22.55 AM.jpeg",
  "WhatsApp Image 2026-03-26 at 10.22.56 AM (1).jpeg",
  "WhatsApp Image 2026-03-26 at 10.22.56 AM (2).jpeg",
  "WhatsApp Image 2026-03-26 at 10.22.56 AM.jpeg",
  "WhatsApp Image 2026-03-26 at 10.22.57 AM (1).jpeg",
  "WhatsApp Image 2026-03-26 at 10.22.57 AM.jpeg",
  "WhatsApp Image 2026-03-26 at 10.22.58 AM (1).jpeg",
  "WhatsApp Image 2026-03-26 at 10.22.58 AM.jpeg",
  "WhatsApp Image 2026-03-26 at 10.49.19 AM.jpeg",
  "WhatsApp Image 2026-03-26 at 10.49.48 AM (1).jpeg",
  "WhatsApp Image 2026-03-26 at 10.49.48 AM.jpeg",
  "WhatsApp Image 2026-03-26 at 11.28.31 AM (1).jpeg",
  "WhatsApp Image 2026-03-26 at 11.28.31 AM (2).jpeg",
  "WhatsApp Image 2026-03-26 at 11.28.32 AM (1).jpeg",
  "WhatsApp Image 2026-03-26 at 11.28.32 AM.jpeg",
  "WhatsApp Image 2026-03-26 at 11.29.47 AM (1).jpeg",
  "WhatsApp Image 2026-03-26 at 11.29.47 AM.jpeg",
];

function basename(p: string): string {
  const n = p.replace(/\\/g, "/");
  return n.slice(n.lastIndexOf("/") + 1);
}

/** Pinned names first (in list order), then remaining paths sorted by filename. */
export function orderBridalMakeupPaths(paths: string[]): string[] {
  const byBase = new Map(paths.map((p) => [basename(p), p] as const));
  const pinned: string[] = [];
  for (const name of BRIDAL_MAKEUP_PRIORITY_NAMES) {
    const hit = byBase.get(name);
    if (hit) pinned.push(hit);
  }
  const pinnedSet = new Set(pinned);
  const rest = paths
    .filter((p) => !pinnedSet.has(p))
    .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));
  return [...pinned, ...rest];
}
