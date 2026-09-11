import { ImageResponse } from "next/og";
import { SITE_NAME } from "@/lib/site";
import { allTools } from "@/config/tools";
import { loadEmojiDataUri } from "@/lib/og-emoji";
import { loadOgFonts, OG_FONT_FAMILY } from "@/lib/og-fonts";

export const alt = `${SITE_NAME} — Free Online Tools, No Sign Up`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const BADGES = ["PDF", "Video", "Images", "Calculators", "Dev Tools"];

export default async function Image() {
  const [bolt, fonts] = await Promise.all([loadEmojiDataUri("⚡"), loadOgFonts()]);
  const toolCount = allTools.length;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          background: "linear-gradient(135deg, #2563eb 0%, #1d4ed8 55%, #3730a3 100%)",
          color: "#ffffff",
          fontFamily: OG_FONT_FAMILY,
        }}
      >
        {/* Ambient glows */}
        <div
          style={{
            position: "absolute",
            top: -160,
            right: -120,
            width: 520,
            height: 520,
            borderRadius: 9999,
            background: "rgba(255,255,255,0.10)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: -220,
            left: -140,
            width: 560,
            height: 560,
            borderRadius: 9999,
            background: "rgba(99,102,241,0.35)",
          }}
        />

        {/* Logo row */}
        <div style={{ display: "flex", alignItems: "center", gap: 28 }}>
          {bolt ? (
            <img src={bolt} width={132} height={132} alt="" />
          ) : null}
          <div style={{ fontSize: 108, fontWeight: 700, letterSpacing: -4, display: "flex" }}>
            {SITE_NAME}
          </div>
        </div>

        {/* Subtitle */}
        <div
          style={{
            marginTop: 26,
            fontSize: 42,
            fontWeight: 400,
            color: "rgba(255,255,255,0.92)",
            display: "flex",
          }}
        >
          {toolCount} Free Online Tools — No Sign Up
        </div>

        {/* Badges */}
        <div style={{ display: "flex", gap: 14, marginTop: 44 }}>
          {BADGES.map((label) => (
            <div
              key={label}
              style={{
                display: "flex",
                padding: "12px 26px",
                borderRadius: 9999,
                background: "rgba(255,255,255,0.16)",
                border: "2px solid rgba(255,255,255,0.35)",
                fontSize: 26,
                fontWeight: 700,
              }}
            >
              {label}
            </div>
          ))}
        </div>
      </div>
    ),
    { ...size, fonts },
  );
}
