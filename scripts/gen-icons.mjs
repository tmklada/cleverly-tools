/**
 * Generate the static PWA icons referenced by app/manifest.ts.
 *
 *   node scripts/gen-icons.mjs
 *
 * Writes public/icon-192.png, public/icon-512.png and public/icon-maskable-512.png
 * using the same ImageResponse renderer Next.js uses for app/icon.tsx.
 * Plain Node (no JSX) so it runs without a TypeScript loader; the drawing is a
 * copy of lib/app-icon.tsx — keep the two in sync.
 */
import { writeFile, mkdir } from "node:fs/promises";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { createElement as h } from "react";
import { ImageResponse } from "next/og.js";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const OUT = join(ROOT, "public");

const BOLT_PATH =
  "M14.615 1.595a.75.75 0 0 1 .359.852L12.982 9.75h7.268a.75.75 0 0 1 .548 1.262l-10.5 11.25a.75.75 0 0 1-1.272-.71l1.992-7.302H3.75a.75.75 0 0 1-.548-1.262l10.5-11.25a.75.75 0 0 1 .913-.143Z";

function appIcon(size, { radius, boltScale = 0.62 } = {}) {
  const bolt = Math.round(size * boltScale);
  return h(
    "div",
    {
      style: {
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg, #3b82f6 0%, #2563eb 55%, #4338ca 100%)",
        borderRadius: radius ?? Math.round(size * 0.22),
      },
    },
    h(
      "svg",
      { width: bolt, height: bolt, viewBox: "0 0 24 24", fill: "#ffffff" },
      h("path", { d: BOLT_PATH }),
    ),
  );
}

async function render(file, size, opts) {
  const res = new ImageResponse(appIcon(size, opts), { width: size, height: size });
  const buf = Buffer.from(await res.arrayBuffer());
  await writeFile(join(OUT, file), buf);
  console.log(`wrote public/${file} (${buf.length} bytes)`);
}

await mkdir(OUT, { recursive: true });
await render("icon-192.png", 192);
await render("icon-512.png", 512);
// Maskable: full-bleed background, bolt inside the safe zone (inner 80%).
await render("icon-maskable-512.png", 512, { radius: 0, boltScale: 0.5 });
