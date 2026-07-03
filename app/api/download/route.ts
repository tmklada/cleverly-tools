import { NextRequest, NextResponse } from "next/server";
import { logError } from "@/lib/error-store";

// Primary API
const RAPIDAPI_KEY = process.env.RAPIDAPI_KEY ?? "";
const RAPIDAPI_HOST = "social-media-video-downloader.p.rapidapi.com";
const BASE_URL = `https://${RAPIDAPI_HOST}`;

// Backup API (Auto Download All In One - different quota)
const BACKUP_RAPIDAPI_KEY = process.env.BACKUP_RAPIDAPI_KEY ?? RAPIDAPI_KEY;
const BACKUP_RAPIDAPI_HOST = "auto-download-all-in-one.p.rapidapi.com";

const HEADERS = (host: string, key: string) => ({
  "Content-Type": "application/json",
  "x-rapidapi-host": host,
  "x-rapidapi-key": key,
});

function extractInstagramShortcode(url: string): string | null {
  const match = url.match(/instagram\.com\/(?:reel|p|tv)\/([A-Za-z0-9_-]+)/);
  return match ? match[1] : null;
}

function extractYouTubeVideoId(url: string): string | null {
  const match = url.match(
    /(?:youtube\.com\/(?:watch\?v=|shorts\/)|youtu\.be\/)([A-Za-z0-9_-]{11})/
  );
  return match ? match[1] : null;
}

// Build primary API URL
function buildPrimaryApiUrl(platform: string, url: string): string | null {
  const encoded = encodeURIComponent(url);
  const formats = "720p%2Chighres";
  switch (platform) {
    case "facebook-video-downloader":
      return `${BASE_URL}/facebook/v3/post/details?renderableFormats=${formats}&url=${encoded}`;
    case "tiktok-video-downloader":
      return `${BASE_URL}/tiktok/v3/post/details?url=${encoded}`;
    case "instagram-video-downloader": {
      const shortcode = extractInstagramShortcode(url);
      if (!shortcode) return null;
      return `${BASE_URL}/instagram/v3/media/post/details?renderableFormats=${formats}&shortcode=${shortcode}`;
    }
    case "youtube-video-downloader": {
      const videoId = extractYouTubeVideoId(url);
      if (!videoId) return null;
      return `${BASE_URL}/youtube/v3/video/details?videoId=${videoId}&urlAccess=normal&renderableFormats=${formats}&getTranscript=false`;
    }
    case "twitter-video-downloader":
      return `${BASE_URL}/twitter/v3/post/details?url=${encoded}`;
    default:
      return null;
  }
}

// Build backup API URL (auto-download-all-in-one)
function buildBackupApiUrl(url: string): string {
  return `https://${BACKUP_RAPIDAPI_HOST}/v1/social/autolink?url=${encodeURIComponent(url)}`;
}

type VideoItem = {
  label?: string;
  url?: string;
  metadata?: { has_audio?: boolean; mime_type?: string };
};
type ContentItem = { videos?: VideoItem[] };

const QUALITY_LABELS: Record<string, string> = {
  native_hd: "HD Quality",
  native_sd: "SD Quality",
  "1080p": "1080p",
  "720p": "720p",
  "480p": "480p",
  "360p": "360p",
};

function normalizeLinks(data: Record<string, unknown>): { quality: string; url: string; format: string }[] {
  const links: { quality: string; url: string; format: string }[] = [];

  // Shape 1: contents[0].videos (primary API)
  if (Array.isArray(data.contents)) {
    for (const content of data.contents as ContentItem[]) {
      if (!Array.isArray(content.videos)) continue;
      for (const v of content.videos) {
        if (!v.url) continue;
        if (v.metadata?.has_audio === false) continue;
        links.push({
          quality: QUALITY_LABELS[v.label ?? ""] ?? (v.label ?? "HD Quality"),
          url: v.url,
          format: v.metadata?.mime_type?.split("/")[1] ?? "mp4",
        });
      }
    }
  }

  // Shape 2: medias array (backup API)
  if (links.length === 0 && Array.isArray(data.medias)) {
    for (const m of data.medias as { videoUrl?: string; quality?: string; extension?: string }[]) {
      if (m.videoUrl) {
        links.push({
          quality: m.quality ?? "HD Quality",
          url: m.videoUrl,
          format: m.extension ?? "mp4",
        });
      }
    }
  }

  // Shape 3: links array
  if (links.length === 0 && Array.isArray(data.links)) {
    for (const link of data.links as { quality?: string; link?: string; url?: string; type?: string }[]) {
      const href = link.link ?? link.url;
      if (href) {
        links.push({ quality: link.quality ?? "Standard", url: href, format: link.type ?? "mp4" });
      }
    }
  }

  return links.slice(0, 4);
}

function isQuotaExceeded(data: Record<string, unknown>): boolean {
  const msg = (data.message as string) ?? "";
  return msg.toLowerCase().includes("quota") || msg.toLowerCase().includes("exceeded");
}

export async function POST(req: NextRequest) {
  try {
    const { url, platform } = await req.json();

    if (!url || typeof url !== "string") {
      return NextResponse.json({ error: "Invalid URL provided." }, { status: 400 });
    }

    if (!RAPIDAPI_KEY) {
      return NextResponse.json({ error: "Service temporarily unavailable.", status: 503 });
    }

    const trimmedUrl = url.trim();
    const primaryApiUrl = buildPrimaryApiUrl(platform, trimmedUrl);

    if (!primaryApiUrl) {
      return NextResponse.json({ error: "Invalid URL format. Please check your link and try again." }, { status: 400 });
    }

    // --- Try PRIMARY API ---
    let response = await fetch(primaryApiUrl, {
      method: "GET",
      headers: HEADERS(RAPIDAPI_HOST, RAPIDAPI_KEY),
      next: { revalidate: 0 },
    });

    let data = await response.json() as Record<string, unknown>;
    let usedBackup = false;

    // If quota exceeded on primary — try backup API
    if (isQuotaExceeded(data)) {
      logError({ tool: platform, platform, url: trimmedUrl, error: "Primary API quota exceeded — trying backup" });

      const backupUrl = buildBackupApiUrl(trimmedUrl);
      const backupRes = await fetch(backupUrl, {
        method: "GET",
        headers: HEADERS(BACKUP_RAPIDAPI_HOST, BACKUP_RAPIDAPI_KEY),
        next: { revalidate: 0 },
      }).catch(() => null);

      if (backupRes && backupRes.ok) {
        data = await backupRes.json() as Record<string, unknown>;
        usedBackup = true;
      } else {
        // Both APIs exhausted
        logError({ tool: platform, platform, url: trimmedUrl, error: "Both APIs quota exceeded" });
        return NextResponse.json({
          error: "⚠️ Our download service has reached its daily limit. Please try again tomorrow, or contact support to upgrade.",
          quotaExceeded: true,
        }, { status: 429 });
      }
    } else if (!response.ok) {
      logError({ tool: platform, platform, url: trimmedUrl, error: `API ${response.status}`, statusCode: response.status });
      return NextResponse.json({
        error: "Could not fetch the video. Make sure the URL is correct and the video is public.",
      }, { status: 400 });
    }

    const links = normalizeLinks(data);

    if (links.length === 0) {
      logError({ tool: platform, platform, url: trimmedUrl, error: `No links found${usedBackup ? " (backup)" : ""}` });
      return NextResponse.json({
        error: "No downloadable video found. The video may be private or the URL is invalid.",
      }, { status: 404 });
    }

    return NextResponse.json({ links, usedBackup });
  } catch {
    return NextResponse.json({ error: "Something went wrong. Please try again." }, { status: 500 });
  }
}
