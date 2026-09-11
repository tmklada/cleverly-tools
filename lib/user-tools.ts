const RECENT_KEY = "ct:recent";
const FAV_KEY = "ct:favorites";
const RECENT_LIMIT = 8;
export const USER_TOOLS_EVENT = "ct:user-tools-change";

function read(key: string): string[] {
  try {
    const raw = localStorage.getItem(key);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed.filter((s) => typeof s === "string") : [];
  } catch {
    return [];
  }
}

function write(key: string, slugs: string[]) {
  try {
    localStorage.setItem(key, JSON.stringify(slugs));
    window.dispatchEvent(new Event(USER_TOOLS_EVENT));
  } catch {
    // storage unavailable (private mode, quota) — silently ignore
  }
}

export function getRecentTools(): string[] {
  return read(RECENT_KEY);
}

export function recordToolVisit(slug: string) {
  const next = [slug, ...read(RECENT_KEY).filter((s) => s !== slug)].slice(0, RECENT_LIMIT);
  write(RECENT_KEY, next);
}

export function getFavoriteTools(): string[] {
  return read(FAV_KEY);
}

export function isFavorite(slug: string): boolean {
  return read(FAV_KEY).includes(slug);
}

export function toggleFavorite(slug: string): boolean {
  const current = read(FAV_KEY);
  const nowFavorite = !current.includes(slug);
  write(FAV_KEY, nowFavorite ? [slug, ...current] : current.filter((s) => s !== slug));
  return nowFavorite;
}
