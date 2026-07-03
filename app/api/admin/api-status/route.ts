import { NextResponse } from "next/server";
import { cookies } from "next/headers";

async function checkAuth() {
  const cookieStore = await cookies();
  return cookieStore.get("admin_session")?.value === "authenticated";
}

const RAPIDAPI_KEY = process.env.RAPIDAPI_KEY ?? "";
const RAPIDAPI_HOST = "social-media-video-downloader.p.rapidapi.com";

type ApiResult = {
  name: string;
  ok: boolean;
  status: "ok" | "quota_exceeded" | "error" | "not_subscribed";
  statusCode?: number;
  message?: string;
};

async function testEndpoint(name: string, url: string): Promise<ApiResult> {
  try {
    const r = await fetch(url, {
      headers: { "x-rapidapi-key": RAPIDAPI_KEY, "x-rapidapi-host": RAPIDAPI_HOST },
      signal: AbortSignal.timeout(10000),
    });
    const data = await r.json() as Record<string, unknown>;
    const msg = (data.message as string) ?? "";

    if (msg.toLowerCase().includes("quota") || msg.toLowerCase().includes("exceeded")) {
      return { name, ok: false, status: "quota_exceeded", message: "Monthly quota exceeded — upgrade plan at rapidapi.com", statusCode: r.status };
    }
    if (msg.toLowerCase().includes("not subscribed")) {
      return { name, ok: false, status: "not_subscribed", message: "Not subscribed to this API", statusCode: r.status };
    }

    // Check for real API errors vs "not found" (which means API works but URL doesn't exist)
    const apiError = data.error as { code?: string; message?: string } | undefined;
    const isNotFound = apiError?.code === "not_found" || apiError?.code === "unavailable";
    const hasContent = Array.isArray(data.contents) && (data.contents as unknown[]).length > 0;

    if (hasContent || isNotFound) {
      return { name, ok: true, status: "ok", statusCode: r.status };
    }

    return { name, ok: false, status: "error", message: apiError?.message ?? msg, statusCode: r.status };
  } catch (e) {
    return { name, ok: false, status: "error", message: e instanceof Error ? e.message : "Timeout" };
  }
}

export async function GET() {
  if (!(await checkAuth())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const results = await Promise.allSettled([
    testEndpoint(
      "Facebook API",
      `https://${RAPIDAPI_HOST}/facebook/v3/post/details?renderableFormats=720p&url=${encodeURIComponent("https://www.facebook.com/share/r/14GFChzicox/")}`
    ),
    testEndpoint(
      "TikTok API",
      `https://${RAPIDAPI_HOST}/tiktok/v3/post/details?url=${encodeURIComponent("https://www.tiktok.com/@username/video/1234567890")}`
    ),
    testEndpoint(
      "Instagram API",
      `https://${RAPIDAPI_HOST}/instagram/v3/media/post/details?renderableFormats=720p&shortcode=DH6N2g3R6WU`
    ),
    testEndpoint(
      "YouTube API",
      `https://${RAPIDAPI_HOST}/youtube/v3/video/details?videoId=dQw4w9WgXcQ&urlAccess=normal&renderableFormats=720p&getTranscript=false`
    ),
  ]);

  const apis = results.map((r) =>
    r.status === "fulfilled" ? r.value : { name: "Unknown", ok: false, status: "error" as const, message: "Promise rejected" }
  );

  const quotaExceeded = apis.some(a => a.status === "quota_exceeded");
  const allOk = apis.every(a => a.ok);

  return NextResponse.json({
    apis,
    quotaExceeded,
    allOk,
    summary: quotaExceeded
      ? "⚠️ RapidAPI monthly quota exceeded — go to rapidapi.com to upgrade or wait for monthly reset"
      : allOk ? "✅ All APIs working" : "⚠️ Some APIs have issues",
    timestamp: new Date().toISOString(),
  });
}
