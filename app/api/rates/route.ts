import { NextResponse } from "next/server";

/**
 * Live fiat exchange rates, proxied from open.er-api.com (free, no API key).
 *
 * Caching: the upstream call uses the fetch data cache with `next.revalidate`,
 * so at most one request per hour actually reaches open.er-api.com no matter how
 * many visitors hit this route. Rates on that endpoint refresh roughly daily,
 * so an hour is plenty fresh. The route itself stays dynamic on purpose: a failed
 * upstream response must not get baked into a static prerender.
 */
const UPSTREAM = "https://open.er-api.com/v6/latest/USD";
const REVALIDATE_SECONDS = 3600;

interface UpstreamResponse {
  result?: string;
  "error-type"?: string;
  base_code?: string;
  time_last_update_utc?: string;
  time_next_update_utc?: string;
  rates?: Record<string, number>;
}

export async function GET() {
  try {
    const res = await fetch(UPSTREAM, {
      next: { revalidate: REVALIDATE_SECONDS, tags: ["exchange-rates"] },
      headers: { Accept: "application/json" },
      signal: AbortSignal.timeout(8000),
    });

    if (!res.ok) {
      return NextResponse.json(
        { error: `Exchange rate provider responded with ${res.status}.` },
        { status: 502 }
      );
    }

    const data: UpstreamResponse = await res.json();

    if (data.result !== "success" || !data.rates || typeof data.rates !== "object") {
      return NextResponse.json(
        { error: data["error-type"] ?? "Exchange rate provider returned an unexpected response." },
        { status: 502 }
      );
    }

    return NextResponse.json({
      base: data.base_code ?? "USD",
      rates: data.rates,
      updatedAt: data.time_last_update_utc ?? null,
      nextUpdateAt: data.time_next_update_utc ?? null,
      count: Object.keys(data.rates).length,
    });
  } catch {
    return NextResponse.json(
      { error: "Could not reach the exchange rate provider. Please try again shortly." },
      { status: 503 }
    );
  }
}
