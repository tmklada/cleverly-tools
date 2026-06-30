import { NextResponse } from "next/server";
import { cookies } from "next/headers";

async function checkAuth() {
  const cookieStore = await cookies();
  return cookieStore.get("admin_session")?.value === "authenticated";
}

const RAPIDAPI_KEY = process.env.RAPIDAPI_KEY ?? "";
const RAPIDAPI_HOST = "social-media-video-downloader.p.rapidapi.com";

export async function GET() {
  if (!(await checkAuth())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const results = await Promise.allSettled([
    // Test Facebook API
    fetch(
      `https://${RAPIDAPI_HOST}/facebook/v3/post/details?renderableFormats=720p&url=${encodeURIComponent("https://www.facebook.com/share/r/14GFChzicox/")}`,
      {
        headers: { "x-rapidapi-key": RAPIDAPI_KEY, "x-rapidapi-host": RAPIDAPI_HOST },
        signal: AbortSignal.timeout(10000),
      }
    ).then(async (r) => {
      const data = await r.json() as { error?: unknown; contents?: unknown[] };
      return { name: "Facebook API", ok: !data.error && (data.contents?.length ?? 0) > 0, statusCode: r.status };
    }),

    // Test TikTok API
    fetch(
      `https://${RAPIDAPI_HOST}/tiktok/v3/post/details?url=${encodeURIComponent("https://www.tiktok.com/@username/video/1234567890")}`,
      {
        headers: { "x-rapidapi-key": RAPIDAPI_KEY, "x-rapidapi-host": RAPIDAPI_HOST },
        signal: AbortSignal.timeout(10000),
      }
    ).then(async (r) => {
      const data = await r.json() as { error?: { code?: string } };
      // not_found is ok (API works, just URL doesn't exist)
      const apiWorks = !data.error || data.error?.code === "not_found";
      return { name: "TikTok API", ok: apiWorks, statusCode: r.status };
    }),
  ]);

  const apis = results.map((r, i) => {
    const names = ["Facebook API", "TikTok API"];
    if (r.status === "fulfilled") return r.value;
    return { name: names[i], ok: false, error: "Request failed" };
  });

  return NextResponse.json({ apis, timestamp: new Date().toISOString() });
}
