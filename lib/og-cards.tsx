/* eslint-disable @next/next/no-img-element -- Satori (ImageResponse) only understands plain <img>; next/image is not supported here. */
import { ImageResponse } from "next/og";
import { SITE_NAME } from "@/lib/site";
import { loadEmojiDataUri } from "@/lib/og-emoji";
import { loadOgFonts, OG_FONT_FAMILY } from "@/lib/og-fonts";

export const OG_SIZE = { width: 1200, height: 630 };

interface ToolCardProps {
  /** Emoji (or short text) used as the tool icon. */
  icon: string;
  title: string;
  description: string;
}

/** Trim a description so it never overflows the card. */
function clamp(text: string, max: number): string {
  if (text.length <= max) return text;
  return text.slice(0, max - 1).trimEnd() + "…";
}

/** Blue-gradient per-tool share card: big icon, title, description, footer strip. */
export async function renderToolCard({ icon, title, description }: ToolCardProps) {
  const [iconUri, bolt, fonts] = await Promise.all([
    loadEmojiDataUri(icon),
    loadEmojiDataUri("⚡"),
    loadOgFonts(),
  ]);

  // Non-emoji icons (e.g. "{ }") are rendered as plain text instead.
  const textIcon = !iconUri && !/\p{Extended_Pictographic}/u.test(icon) ? icon : null;
  const titleSize = title.length > 40 ? 52 : 64;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          position: "relative",
          background: "linear-gradient(135deg, #2563eb 0%, #1d4ed8 55%, #3730a3 100%)",
          color: "#ffffff",
          fontFamily: OG_FONT_FAMILY,
        }}
      >
        <div
          style={{
            position: "absolute",
            top: -200,
            right: -160,
            width: 600,
            height: 600,
            borderRadius: 9999,
            background: "rgba(255,255,255,0.08)",
          }}
        />

        {/* Brand row */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            padding: "40px 64px 0",
            fontSize: 30,
            fontWeight: 700,
            color: "rgba(255,255,255,0.9)",
          }}
        >
          {bolt ? (
            <img src={bolt} width={34} height={34} alt="" />
          ) : null}
          <span>{SITE_NAME}</span>
        </div>

        {/* Main content */}
        <div
          style={{
            flex: 1,
            display: "flex",
            alignItems: "center",
            gap: 52,
            padding: "0 64px",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 240,
              height: 240,
              borderRadius: 48,
              background: "rgba(255,255,255,0.16)",
              border: "3px solid rgba(255,255,255,0.35)",
              flexShrink: 0,
              fontSize: 96,
              fontWeight: 700,
            }}
          >
            {iconUri ? (
              <img src={iconUri} width={150} height={150} alt="" />
            ) : (
              textIcon
            )}
          </div>

          <div style={{ display: "flex", flexDirection: "column", flex: 1 }}>
            <div
              style={{
                fontSize: titleSize,
                fontWeight: 700,
                lineHeight: 1.1,
                letterSpacing: -1.5,
                display: "flex",
              }}
            >
              {clamp(title, 70)}
            </div>
            <div
              style={{
                marginTop: 22,
                fontSize: 30,
                lineHeight: 1.35,
                color: "rgba(255,255,255,0.88)",
                display: "flex",
              }}
            >
              {clamp(description, 130)}
            </div>
          </div>
        </div>

        {/* Footer strip */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "26px 64px",
            background: "rgba(15,23,42,0.35)",
            fontSize: 28,
            fontWeight: 700,
          }}
        >
          <div style={{ display: "flex", gap: 18, alignItems: "center" }}>
            <span>Free</span>
            <span style={{ opacity: 0.5 }}>·</span>
            <span>No Sign Up</span>
            <span style={{ opacity: 0.5 }}>·</span>
            <span>Works in your browser</span>
          </div>
          <div style={{ display: "flex", color: "rgba(255,255,255,0.85)" }}>{SITE_NAME}</div>
        </div>
      </div>
    ),
    { ...OG_SIZE, fonts },
  );
}

interface BlogCardProps {
  title: string;
  readingTime?: string;
  date?: string;
  category?: string;
}

/** Dark share card for blog posts. */
export async function renderBlogCard({ title, readingTime, date, category }: BlogCardProps) {
  const [bolt, fonts] = await Promise.all([loadEmojiDataUri("⚡"), loadOgFonts()]);

  const meta = [category ? titleCase(category.replace(/-/g, " ")) : null, readingTime, date ? formatDate(date) : null]
    .filter(Boolean)
    .join("  ·  ");
  const titleSize = title.length > 60 ? 54 : 66;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          position: "relative",
          background: "linear-gradient(135deg, #0f172a 0%, #111827 60%, #1e1b4b 100%)",
          color: "#ffffff",
          fontFamily: OG_FONT_FAMILY,
        }}
      >
        <div
          style={{
            position: "absolute",
            top: -260,
            right: -200,
            width: 700,
            height: 700,
            borderRadius: 9999,
            background: "rgba(37,99,235,0.28)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: -300,
            left: -220,
            width: 640,
            height: 640,
            borderRadius: 9999,
            background: "rgba(99,102,241,0.18)",
          }}
        />

        {/* Brand row */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            padding: "44px 72px 0",
            fontSize: 30,
            fontWeight: 700,
          }}
        >
          {bolt ? (
            <img src={bolt} width={34} height={34} alt="" />
          ) : null}
          <span>{SITE_NAME}</span>
          <span style={{ color: "#93c5fd", marginLeft: 6 }}>Blog</span>
        </div>

        {/* Title */}
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            padding: "0 72px",
          }}
        >
          <div
            style={{
              fontSize: titleSize,
              fontWeight: 700,
              lineHeight: 1.12,
              letterSpacing: -1.5,
              display: "flex",
            }}
          >
            {clamp(title, 110)}
          </div>
          {meta ? (
            <div
              style={{
                marginTop: 28,
                fontSize: 28,
                color: "#cbd5e1",
                display: "flex",
              }}
            >
              {meta}
            </div>
          ) : null}
        </div>

        {/* Footer strip */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "26px 72px",
            borderTop: "2px solid rgba(255,255,255,0.10)",
            fontSize: 26,
            color: "#cbd5e1",
          }}
        >
          <span>Free online tools, guides &amp; tips</span>
          <span style={{ fontWeight: 700, color: "#ffffff" }}>{SITE_NAME}</span>
        </div>
      </div>
    ),
    { ...OG_SIZE, fonts },
  );
}

function titleCase(text: string): string {
  return text.replace(/\b\w/g, (c) => c.toUpperCase());
}

function formatDate(iso: string): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });
}
