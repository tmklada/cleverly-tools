import { NextRequest, NextResponse } from "next/server";
import QRCode from "qrcode";

const MAX_TEXT = 1200;
const DEFAULT_SIZE = 300;
const MIN_SIZE = 64;
const MAX_SIZE = 1000;
const LEVELS = ["L", "M", "Q", "H"] as const;

type Level = (typeof LEVELS)[number];

function clampInt(raw: string | null, min: number, max: number, fallback: number): number {
  const n = Number.parseInt(raw ?? "", 10);
  if (!Number.isFinite(n)) return fallback;
  return Math.min(max, Math.max(min, n));
}

function colorOrNull(raw: string | null): string | null {
  if (!raw) return null;
  const hex = raw.startsWith("#") ? raw : `#${raw}`;
  return /^#(?:[0-9a-f]{3}|[0-9a-f]{6}|[0-9a-f]{8})$/i.test(hex) ? hex : null;
}

export async function GET(request: NextRequest) {
  const params = request.nextUrl.searchParams;
  const text = params.get("text") ?? params.get("data");

  if (!text) {
    return NextResponse.json(
      {
        error: "Missing required parameter: text",
        example: "/api/qr?text=https://example.com&size=300",
        docs: "https://cleverly.tools/api",
      },
      { status: 400 }
    );
  }

  if (text.length > MAX_TEXT) {
    return NextResponse.json(
      { error: `text is too long (${text.length} characters). The maximum is ${MAX_TEXT}.` },
      { status: 413 }
    );
  }

  const size = clampInt(params.get("size"), MIN_SIZE, MAX_SIZE, DEFAULT_SIZE);
  const margin = clampInt(params.get("margin"), 0, 10, 2);
  const levelParam = (params.get("ecc") ?? params.get("level") ?? "M").toUpperCase();
  const errorCorrectionLevel: Level = (LEVELS as readonly string[]).includes(levelParam)
    ? (levelParam as Level)
    : "M";
  const dark = colorOrNull(params.get("dark")) ?? "#000000";
  const light = colorOrNull(params.get("light")) ?? "#ffffff";
  const format = (params.get("format") ?? "png").toLowerCase();

  const options = {
    width: size,
    margin,
    errorCorrectionLevel,
    color: { dark, light },
  } as const;

  try {
    // Deterministic output, so it can sit in a CDN essentially forever.
    const cacheControl = "public, max-age=86400, s-maxage=31536000, immutable";

    if (format === "svg") {
      const svg = await QRCode.toString(text, { ...options, type: "svg" });
      return new NextResponse(svg, {
        headers: { "Content-Type": "image/svg+xml; charset=utf-8", "Cache-Control": cacheControl },
      });
    }

    const png = await QRCode.toBuffer(text, { ...options, type: "png" });
    return new NextResponse(new Uint8Array(png), {
      headers: { "Content-Type": "image/png", "Cache-Control": cacheControl },
    });
  } catch {
    return NextResponse.json(
      { error: "Could not encode that text as a QR code. Try shortening it or lowering the ecc level." },
      { status: 422 }
    );
  }
}
