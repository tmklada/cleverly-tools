import { allTools } from "@/config/tools";
import type { ToolConfig } from "@/types/tool";

const ALIASES: Record<string, string[]> = {
  fb: ["facebook"],
  ig: ["instagram"],
  insta: ["instagram"],
  yt: ["youtube"],
  tt: ["tiktok"],
  x: ["twitter"],
  pic: ["image", "photo"],
  photo: ["image"],
  img: ["image"],
  vid: ["video"],
  calc: ["calculator"],
  pw: ["password"],
  pwd: ["password"],
  bg: ["background"],
  remove: ["remover"],
  shrink: ["compress", "resize"],
  reduce: ["compress"],
  combine: ["merge"],
  join: ["merge"],
  mp3: ["youtube to mp3", "audio"],
  weight: ["bmi", "ideal weight", "body fat"],
  money: ["finance", "loan", "interest"],
  tax: ["vat"],
  regex: ["regular expression"],
};

function normalize(s: string) {
  return s.toLowerCase().replace(/[^a-z0-9\s]/g, " ").replace(/\s+/g, " ").trim();
}

function expand(query: string): string[] {
  const words = normalize(query).split(" ").filter(Boolean);
  const extra = words.flatMap((w) => ALIASES[w] ?? []);
  return [...new Set([...words, ...extra])];
}

function scoreTool(tool: ToolConfig, q: string, words: string[]): number {
  const title = normalize(tool.title);
  const slug = tool.slug.replace(/-/g, " ");
  const short = normalize(tool.shortDescription);
  const desc = normalize(tool.description);
  const keywords = tool.keywords.map(normalize);
  const category = tool.category.replace(/-/g, " ");

  let score = 0;
  if (title === q || slug === q) score += 100;
  else if (title.startsWith(q)) score += 60;
  else if (title.includes(q)) score += 40;

  for (const w of words) {
    if (w.length < 2) continue;
    if (title.split(" ").some((t) => t === w)) score += 25;
    else if (title.includes(w)) score += 15;
    if (keywords.some((k) => k === w || k === q)) score += 14;
    else if (keywords.some((k) => k.includes(w))) score += 8;
    if (category.includes(w)) score += 6;
    if (short.includes(w)) score += 4;
    if (desc.includes(w)) score += 2;
  }

  if (score > 0) {
    if (tool.trending) score += 3;
    if (tool.featured) score += 2;
  }
  return score;
}

export function searchTools(query: string, limit = 8): ToolConfig[] {
  const q = normalize(query);
  if (!q) return [];
  const words = expand(query);
  return allTools
    .map((tool) => ({ tool, score: scoreTool(tool, q, words) }))
    .filter((r) => r.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((r) => r.tool);
}
