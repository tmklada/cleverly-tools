/**
 * Font loading for `ImageResponse` (Satori).
 *
 * Satori ships only a regular-weight fallback font, so bold headlines would
 * otherwise render thin. We fetch Inter 700 (and 400) as TTF from Google Fonts
 * once per process. If the network is unavailable the promise resolves to an
 * empty array and Satori silently uses its built-in font instead.
 */

export interface OgFont {
  name: string;
  data: ArrayBuffer;
  weight: 400 | 700;
  style: "normal";
}

// An old Safari UA makes Google Fonts return plain TTF (Satori can't read woff2).
const TTF_USER_AGENT =
  "Mozilla/5.0 (Macintosh; U; Intel Mac OS X 10_6_8; en-us) AppleWebKit/533.21.1 (KHTML, like Gecko) Version/5.0.5 Safari/533.21.1";

async function fetchGoogleFont(family: string, weight: 400 | 700): Promise<OgFont | null> {
  try {
    const cssUrl = `https://fonts.googleapis.com/css2?family=${encodeURIComponent(family)}:wght@${weight}&display=swap`;
    const css = await fetch(cssUrl, { headers: { "User-Agent": TTF_USER_AGENT } }).then((r) =>
      r.ok ? r.text() : "",
    );
    const match = css.match(/src:\s*url\((https:[^)]+)\)\s*format\(['"](?:truetype|opentype)['"]\)/);
    if (!match) return null;

    const res = await fetch(match[1]);
    if (!res.ok) return null;
    return { name: family, data: await res.arrayBuffer(), weight, style: "normal" };
  } catch {
    return null;
  }
}

let fontsPromise: Promise<OgFont[]> | null = null;

/** Inter 400 + 700, memoised. Never rejects. */
export function loadOgFonts(): Promise<OgFont[]> {
  if (!fontsPromise) {
    fontsPromise = Promise.all([fetchGoogleFont("Inter", 400), fetchGoogleFont("Inter", 700)]).then(
      (fonts) => fonts.filter((f): f is OgFont => f !== null),
    );
  }
  return fontsPromise;
}

/** Font-family stack to use in Satori styles. */
export const OG_FONT_FAMILY = "Inter, sans-serif";
