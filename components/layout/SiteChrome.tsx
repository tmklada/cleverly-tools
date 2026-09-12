"use client";

import { usePathname } from "next/navigation";

// Embed pages render inside other people's sites: no site chrome, and no ad
// scripts (serving ads from a page we don't own would breach AdSense policy).
export default function SiteChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  // "/embed" itself is the public landing page and keeps the chrome;
  // only the framed widgets at "/embed/<slug>" drop it.
  if (pathname?.startsWith("/embed/")) return null;
  return <>{children}</>;
}
