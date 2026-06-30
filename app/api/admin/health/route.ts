import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { allTools } from "@/config/tools";
import { SITE_URL } from "@/lib/site";

async function checkAuth() {
  const cookieStore = await cookies();
  return cookieStore.get("admin_session")?.value === "authenticated";
}

export async function GET() {
  if (!(await checkAuth())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const results = await Promise.allSettled(
    allTools.slice(0, 20).map(async (tool) => {
      const start = Date.now();
      try {
        const res = await fetch(`${SITE_URL}/tools/${tool.slug}`, {
          signal: AbortSignal.timeout(8000),
          headers: { "User-Agent": "cleverly-health-check/1.0" },
        });
        return {
          slug: tool.slug,
          title: tool.title,
          icon: tool.icon,
          status: res.ok ? "ok" : "error",
          statusCode: res.status,
          responseTime: Date.now() - start,
        };
      } catch (e) {
        return {
          slug: tool.slug,
          title: tool.title,
          icon: tool.icon,
          status: "error",
          error: e instanceof Error ? e.message : "Unknown error",
          responseTime: Date.now() - start,
        };
      }
    })
  );

  const checks = results.map((r) =>
    r.status === "fulfilled" ? r.value : { status: "error", error: "Promise rejected" }
  );

  const ok = checks.filter((c) => c.status === "ok").length;
  const errors = checks.filter((c) => c.status === "error").length;

  return NextResponse.json({
    summary: { total: checks.length, ok, errors, timestamp: new Date().toISOString() },
    checks,
  });
}
