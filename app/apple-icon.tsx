import { ImageResponse } from "next/og";
import { AppIcon } from "@/lib/app-icon";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

// iOS applies its own rounded mask, so draw the icon full-bleed (no corner radius).
export default function AppleIcon() {
  return new ImageResponse(<AppIcon size={size.width} radius={0} />, { ...size });
}
