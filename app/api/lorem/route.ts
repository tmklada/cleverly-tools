import { NextRequest, NextResponse } from "next/server";

const WORDS = [
  "lorem","ipsum","dolor","sit","amet","consectetur","adipiscing","elit","sed","do","eiusmod","tempor",
  "incididunt","ut","labore","et","dolore","magna","aliqua","enim","ad","minim","veniam","quis","nostrud",
  "exercitation","ullamco","laboris","nisi","aliquip","ex","ea","commodo","consequat","duis","aute","irure",
  "in","reprehenderit","voluptate","velit","esse","cillum","eu","fugiat","nulla","pariatur","excepteur",
  "sint","occaecat","cupidatat","non","proident","sunt","culpa","qui","officia","deserunt","mollit","anim",
  "id","est","laborum","perspiciatis","unde","omnis","iste","natus","error","voluptatem","accusantium",
  "doloremque","laudantium","totam","rem","aperiam","eaque","ipsa","quae","ab","illo","inventore","veritatis",
];

const OPENER = "Lorem ipsum dolor sit amet, consectetur adipiscing elit";

function word(i: number) {
  // Deterministic per index so the same request always returns the same text,
  // which keeps the response cacheable.
  return WORDS[(i * 7919) % WORDS.length];
}

function sentence(seed: number, length: number) {
  const words = Array.from({ length }, (_, i) => word(seed + i));
  const text = words.join(" ");
  return text.charAt(0).toUpperCase() + text.slice(1) + ".";
}

export async function GET(request: NextRequest) {
  const params = request.nextUrl.searchParams;

  const unit = (params.get("unit") ?? "paragraphs").toLowerCase();
  const countRaw = Number.parseInt(params.get("count") ?? "", 10);
  const startWithLorem = params.get("start") !== "false";

  if (!["paragraphs", "sentences", "words"].includes(unit)) {
    return NextResponse.json(
      {
        error: `Unsupported unit "${unit}".`,
        units: ["paragraphs", "sentences", "words"],
        example: "/api/lorem?unit=paragraphs&count=3",
        docs: "https://cleverly.tools/api",
      },
      { status: 400 }
    );
  }

  const max = unit === "words" ? 1000 : unit === "sentences" ? 200 : 50;
  const count = Number.isFinite(countRaw) ? Math.min(max, Math.max(1, countRaw)) : unit === "words" ? 50 : 3;

  let text: string;
  let seed = 0;

  if (unit === "words") {
    const words = Array.from({ length: count }, (_, i) => word(i));
    if (startWithLorem) words.splice(0, Math.min(5, count), ...OPENER.toLowerCase().replace(",", "").split(" ").slice(0, Math.min(5, count)));
    text = words.join(" ");
  } else if (unit === "sentences") {
    const sentences = Array.from({ length: count }, () => {
      const s = sentence(seed, 8 + (seed % 7));
      seed += 11;
      return s;
    });
    if (startWithLorem) sentences[0] = `${OPENER}.`;
    text = sentences.join(" ");
  } else {
    const paragraphs = Array.from({ length: count }, (_, p) => {
      const sentences = Array.from({ length: 4 + (p % 3) }, () => {
        const s = sentence(seed, 8 + (seed % 7));
        seed += 11;
        return s;
      });
      if (p === 0 && startWithLorem) sentences[0] = `${OPENER}.`;
      return sentences.join(" ");
    });
    text = paragraphs.join("\n\n");
  }

  return NextResponse.json(
    { unit, count, text, characters: text.length },
    { headers: { "Cache-Control": "public, max-age=86400, s-maxage=31536000, immutable" } }
  );
}
