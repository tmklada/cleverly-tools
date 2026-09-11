/**
 * The cleverly.tools app icon: a blue (#2563eb) rounded square with a white
 * lightning bolt. Rendered by app/icon.tsx, app/apple-icon.tsx and
 * scripts/gen-icons.mjs (which keeps an identical inline copy for plain Node).
 * Uses an inline SVG path (Heroicons "bolt") so it never depends on a network.
 */

export const APP_ICON_BG = "#2563eb";

export const BOLT_PATH =
  "M14.615 1.595a.75.75 0 0 1 .359.852L12.982 9.75h7.268a.75.75 0 0 1 .548 1.262l-10.5 11.25a.75.75 0 0 1-1.272-.71l1.992-7.302H3.75a.75.75 0 0 1-.548-1.262l10.5-11.25a.75.75 0 0 1 .913-.143Z";

interface AppIconProps {
  size: number;
  /** Corner radius in px. Defaults to ~22% of the size (iOS-like squircle). */
  radius?: number;
  /** Bolt size as a fraction of the icon. Use ~0.5 for maskable icons. */
  boltScale?: number;
}

export function AppIcon({ size, radius, boltScale = 0.62 }: AppIconProps) {
  const bolt = Math.round(size * boltScale);
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: `linear-gradient(135deg, #3b82f6 0%, ${APP_ICON_BG} 55%, #4338ca 100%)`,
        borderRadius: radius ?? Math.round(size * 0.22),
      }}
    >
      <svg width={bolt} height={bolt} viewBox="0 0 24 24" fill="#ffffff">
        <path d={BOLT_PATH} />
      </svg>
    </div>
  );
}
