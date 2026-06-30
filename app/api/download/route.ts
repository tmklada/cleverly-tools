import { NextRequest, NextResponse } from "next/server";

const RAPIDAPI_KEY = process.env.RAPIDAPI_KEY ?? "";
const RAPIDAPI_HOST = "social-media-video-downloader.p.rapidapi.com";
const BASE_URL = `https://${RAPIDAPI_HOST}`;

const HEADERS = {
  "Content-Type": "application/json",
  "x-rapidapi-host": RAPIDAPI_HOST,
  "x-rapidapi-key": RAPIDAPI_KEY,
};

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

function buildApiUrl(platform: string, url: string): string | null {
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

type VideoItem = {
  label?: string;
  url?: string;
  metadata?: { has_audio?: boolean; mime_type?: string; height?: number; width?: number };
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

// Normalize various API response shapes into our DownloadLink format
function normalizeLinks(data: Record<string, unknown>): { quality: string; url: string; format: string }[] {
  const links: { quality: string; url: string; format: string }[] = [];

  // Primary shape: data.contents[0].videos (Facebook / Instagram / TikTok)
  if (Array.isArray(data.contents)) {
    for (const content of data.contents as ContentItem[]) {
      if (!Array.isArray(content.videos)) continue;
      for (const v of content.videos) {
        if (!v.url) continue;
        // Skip DASH segments without audio
        if (v.metadata?.has_audio === false) continue;
        const label = v.label ?? "video";
        links.push({
          quality: QUALITY_LABELS[label] ?? label,
          url: v.url,
          format: v.metadata?.mime_type?.split("/")[1] ?? "mp4",
        });
      }
    }
  }

  // Fallback shape: data.links = [{ quality, link, type }]
  if (links.length === 0 && Array.isArray(data.links)) {
    for (const link of data.links as { quality?: string; link?: string; url?: string; type?: string }[]) {
      const href = link.link ?? link.url;
      if (href) {
        links.push({
          quality: link.quality ?? "Standard",
          url: href,
          format: link.type ?? "mp4",
        });
      }
    }
  }

  return links.slice(0, 4);
}

export async function POST(req: NextRequest) {
  try {
    const { url, platform } = await req.json();

    if (!url || typeof url !== "string") {
      return NextResponse.json({ error: "Invalid URL provided." }, { status: 400 });
    }

    if (!RAPIDAPI_KEY) {
      return NextResponse.json(
        { error: "Service temporarily unavailable. Please try again later." },
        { status: 503 }
      );
    }

    const apiUrl = buildApiUrl(platform, url.trim());

    if (!apiUrl) {
      return NextResponse.json(
        { error: "Invalid URL format. Please check your link and try again." },
        { status: 400 }
      );
    }

    const response = await fetch(apiUrl, {
      method: "GET",
      headers: HEADERS,
      next: { revalidate: 0 },
    });

    const data = await response.json() as Record<string, unknown>;

    if (!response.ok) {
      return NextResponse.json(
        { error: "Could not fetch the video. Make sure the URL is correct and the video is public." },
        { status: 400 }
      );
    }

    const links = normalizeLinks(data);

    if (links.length === 0) {
      return NextResponse.json(
        { error: "No downloadable video found. The video may be private or the URL is invalid." },
        { status: 404 }
      );
    }

    return NextResponse.json({ links });
  } catch {
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
