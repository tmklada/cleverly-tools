import { NextRequest, NextResponse } from "next/server";
import { createHash } from "node:crypto";

const ALGORITHMS = ["md5", "sha1", "sha256", "sha384", "sha512"] as const;
const MAX_TEXT = 100_000;

export async function GET(request: NextRequest) {
  const params = request.nextUrl.searchParams;
  const text = params.get("text");

  if (text === null) {
    return NextResponse.json(
      {
        error: "Missing required parameter: text",
        example: "/api/hash?text=hello&algorithm=sha256",
        algorithms: ALGORITHMS,
        docs: "https://cleverly.tools/api",
      },
      { status: 400 }
    );
  }

  if (text.length > MAX_TEXT) {
    return NextResponse.json(
      { error: `text is too long (${text.length} characters). The maximum is ${MAX_TEXT}.` },
      { status: 413 }
    );
  }

  const requested = (params.get("algorithm") ?? params.get("algo") ?? "sha256").toLowerCase();
  if (!(ALGORITHMS as readonly string[]).includes(requested)) {
    return NextResponse.json(
      { error: `Unsupported algorithm "${requested}".`, algorithms: ALGORITHMS },
      { status: 400 }
    );
  }

  const hash = createHash(requested).update(text, "utf8").digest("hex");

  return NextResponse.json(
    { algorithm: requested, hash, length: hash.length, inputLength: text.length },
    { headers: { "Cache-Control": "public, max-age=86400, s-maxage=31536000, immutable" } }
  );
}
