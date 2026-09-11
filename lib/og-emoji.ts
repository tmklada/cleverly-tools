/**
 * Helpers for rendering emoji inside `ImageResponse` (Satori).
 *
 * Satori cannot draw colour emoji from system fonts, so we fetch the matching
 * Twemoji SVG at render time (build time for statically optimised routes) and
 * hand it back as a data URI for an `<img>` element. Every network call is
 * wrapped in try/catch and returns `null` on failure so a CDN hiccup never
 * breaks a build — the caller simply renders nothing for the icon.
 */

const TWEMOJI_BASE = "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/";

const VS16 = 0xfe0f; // variation selector-16
const ZWJ = 0x200d; // zero-width joiner

/**
 * Convert an emoji string to its Twemoji file name (hyphen-joined lowercase
 * hex code points). Follows twemoji's own rule: strip U+FE0F only when the
 * sequence contains no ZWJ. Returns `null` for strings that are not emoji
 * (e.g. the "{ }" icon used by one tool).
 */
export function emojiToTwemojiCode(emoji: string): string | null {
  const codePoints = Array.from(emoji.trim()).map((ch) => ch.codePointAt(0) as number);
  if (codePoints.length === 0) return null;

  const hasZwj = codePoints.includes(ZWJ);
  const filtered = hasZwj ? codePoints : codePoints.filter((cp) => cp !== VS16);
  if (filtered.length === 0) return null;

  // Anything below U+2000 (letters, digits, punctuation) is not an emoji we
  // can look up — keycap sequences aside, which the tool icons don't use.
  if (filtered.some((cp) => cp < 0x2000 && cp !== 0x20e3)) return null;

  return filtered.map((cp) => cp.toString(16)).join("-");
}

/** Public Twemoji SVG URL for an emoji, or `null` if it isn't an emoji. */
export function twemojiUrl(emoji: string): string | null {
  const code = emojiToTwemojiCode(emoji);
  return code ? `${TWEMOJI_BASE}${code}.svg` : null;
}

const cache = new Map<string, Promise<string | null>>();

/**
 * Fetch the Twemoji SVG for `emoji` and return it as a `data:image/svg+xml`
 * URI suitable for `<img src>` in Satori. Resolves to `null` on any failure.
 * Results are memoised per process so a build only fetches each emoji once.
 */
export function loadEmojiDataUri(emoji: string): Promise<string | null> {
  const url = twemojiUrl(emoji);
  if (!url) return Promise.resolve(null);

  const cached = cache.get(url);
  if (cached) return cached;

  const promise = (async () => {
    try {
      const res = await fetch(url);
      if (!res.ok) return null;
      const svg = await res.text();
      if (!svg.includes("<svg")) return null;
      return `data:image/svg+xml;base64,${Buffer.from(svg).toString("base64")}`;
    } catch {
      return null;
    }
  })();

  cache.set(url, promise);
  return promise;
}
