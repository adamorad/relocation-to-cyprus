const LS_KEY = "realcy_shortlist";

export function getShortlist(): string[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(LS_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function toggleShortlist(slug: string): boolean {
  if (typeof window === "undefined") return false;
  try {
    const list = getShortlist();
    const idx = list.indexOf(slug);
    let next: string[];
    if (idx === -1) {
      next = [...list, slug];
    } else {
      next = list.filter((s) => s !== slug);
    }
    localStorage.setItem(LS_KEY, JSON.stringify(next));
    return next.includes(slug);
  } catch {
    return false;
  }
}

export function isInShortlist(slug: string): boolean {
  return getShortlist().includes(slug);
}
