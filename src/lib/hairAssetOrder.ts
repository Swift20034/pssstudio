/** Basenames shown first in Hair Styling (portfolio + hero) when those files exist under `assets/hair/` (non-party). */
export const HAIR_PRIORITY_NAMES: readonly string[] = [
  "WhatsApp Image 2026-03-26 at 11.31.55 AM (1).jpeg",
  "WhatsApp Image 2026-03-26 at 10.28.46 AM (1).jpeg",
  "WhatsApp Image 2026-03-26 at 10.28.46 AM.jpeg",
  "WhatsApp Image 2026-03-26 at 10.28.47 AM (1).jpeg",
  "WhatsApp Image 2026-03-26 at 10.28.47 AM (2).jpeg",
  "WhatsApp Image 2026-03-26 at 10.28.47 AM.jpeg",
  "WhatsApp Image 2026-03-26 at 10.42.29 AM.jpeg",
  "WhatsApp Image 2026-03-26 at 10.42.30 AM.jpeg",
  "WhatsApp Image 2026-03-26 at 10.49.49 AM (1).jpeg",
  "WhatsApp Image 2026-03-26 at 10.49.49 AM (2).jpeg",
  "WhatsApp Image 2026-03-26 at 10.49.49 AM.jpeg",
  "WhatsApp Image 2026-03-26 at 10.49.50 AM (2).jpeg",
  "WhatsApp Image 2026-03-26 at 10.49.50 AM (3).jpeg",
  "WhatsApp Image 2026-03-26 at 10.49.50 AM.jpeg",
  "WhatsApp Image 2026-03-26 at 10.49.51 AM (1).jpeg",
  "WhatsApp Image 2026-03-26 at 10.49.51 AM (2).jpeg",
  "WhatsApp Image 2026-03-26 at 10.49.51 AM.jpeg",
  "WhatsApp Image 2026-03-26 at 10.49.52 AM (1).jpeg",
  "WhatsApp Image 2026-03-26 at 10.49.52 AM (2).jpeg",
  "WhatsApp Image 2026-03-26 at 10.49.52 AM (3).jpeg",
  "WhatsApp Image 2026-03-26 at 10.49.52 AM.jpeg",
  "WhatsApp Image 2026-03-26 at 10.49.53 AM (2).jpeg",
  "WhatsApp Image 2026-03-26 at 10.49.53 AM.jpeg",
  "WhatsApp Image 2026-03-26 at 11.31.54 AM (2).jpeg",
  "WhatsApp Image 2026-03-26 at 11.31.54 AM.jpeg",
  "WhatsApp Image 2026-03-26 at 11.31.55 AM (2).jpeg",
  "WhatsApp Image 2026-03-26 at 11.31.55 AM (3).jpeg",
  "WhatsApp Image 2026-03-26 at 11.31.55 AM.jpeg",
  "WhatsApp Image 2026-03-26 at 11.31.56 AM.jpeg",
];

/** Basenames omitted from Hair Styling in the portfolio (still on disk for other use). */
export const HAIR_EXCLUDE_FROM_PORTFOLIO: readonly string[] = [
  "WhatsApp Image 2026-03-26 at 10.49.50 AM (1).jpeg",
];

function basename(p: string): string {
  const n = p.replace(/\\/g, "/");
  return n.slice(n.lastIndexOf("/") + 1);
}

/** Pinned names first (in list order), then remaining paths sorted by filename. */
export function orderHairPaths(paths: string[]): string[] {
  const byBase = new Map(paths.map((p) => [basename(p), p] as const));
  const pinned: string[] = [];
  for (const name of HAIR_PRIORITY_NAMES) {
    const hit = byBase.get(name);
    if (hit) pinned.push(hit);
  }
  const pinnedSet = new Set(pinned);
  const rest = paths
    .filter((p) => !pinnedSet.has(p))
    .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));
  return [...pinned, ...rest];
}

/** Drop excluded basenames after ordering (portfolio only). */
export function filterHairPathsForPortfolio(paths: string[]): string[] {
  const skip = new Set(HAIR_EXCLUDE_FROM_PORTFOLIO);
  return paths.filter((p) => !skip.has(basename(p)));
}
