import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: { root: __dirname },
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "**.fbcdn.net" },
      { protocol: "https", hostname: "**.cdninstagram.com" },
      { protocol: "https", hostname: "**.tiktokcdn.com" },
      { protocol: "https", hostname: "img.youtube.com" },
    ],
    formats: ["image/avif", "image/webp"],
  },
  // Compress responses
  compress: true,
  async redirects() {
    return [
      { source: "/stopwatch", destination: "/tools/timer-stopwatch", permanent: true },
      { source: "/jpg-to-png", destination: "/tools/image-converter", permanent: true },
    ];
  },
  async headers() {
    return [
      // Cache static pages aggressively
      {
        source: "/tools/:slug",
        headers: [
          { key: "Cache-Control", value: "public, s-maxage=3600, stale-while-revalidate=86400" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "X-XSS-Protection", value: "1; mode=block" },
        ],
      },
      {
        source: "/blog/:slug",
        headers: [
          { key: "Cache-Control", value: "public, s-maxage=3600, stale-while-revalidate=86400" },
        ],
      },
      {
        source: "/category/:cat",
        headers: [
          { key: "Cache-Control", value: "public, s-maxage=1800, stale-while-revalidate=86400" },
        ],
      },
      {
        source: "/",
        headers: [
          { key: "Cache-Control", value: "public, s-maxage=1800, stale-while-revalidate=3600" },
        ],
      },
      // Self-hosted FFmpeg core (versioned copy of @ffmpeg/core) — cache forever
      {
        source: "/ffmpeg/:path*",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
        ],
      },
      // PWA icons — long cache
      {
        source: "/:file(icon-192.png|icon-512.png|icon-maskable-512.png)",
        headers: [
          { key: "Cache-Control", value: "public, max-age=604800, stale-while-revalidate=86400" },
        ],
      },
      // API - no cache
      // Public API: open to any origin. Cache policy is set per route handler,
      // because the deterministic endpoints (qr, hash, lorem) are meant to be cached.
      {
        source: "/api/:path*",
        headers: [
          { key: "Access-Control-Allow-Origin", value: "*" },
          { key: "Access-Control-Allow-Methods", value: "GET, POST, OPTIONS" },
        ],
      },
      // Private / per-request routes must never be cached.
      {
        source: "/api/download",
        headers: [{ key: "Cache-Control", value: "no-store" }],
      },
      {
        source: "/api/admin/:path*",
        headers: [{ key: "Cache-Control", value: "no-store" }],
      },
      // Embeds are meant to run inside other people's sites.
      {
        source: "/embed/:path*",
        headers: [
          { key: "Content-Security-Policy", value: "frame-ancestors *" },
          { key: "Cache-Control", value: "public, s-maxage=3600, stale-while-revalidate=86400" },
        ],
      },
      // Security headers for all pages
      {
        source: "/:path*",
        headers: [
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
        ],
      },
    ];
  },
};

export default nextConfig;
