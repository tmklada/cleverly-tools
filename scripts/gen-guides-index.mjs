import { readdirSync, writeFileSync } from "node:fs";
const files = readdirSync("config/guides").filter(f => f.endsWith(".ts") && f !== "index.ts").map(f => f.replace(/\.ts$/, "")).sort();
const ident = s => s.replace(/-([a-z0-9])/g, (_, c) => c.toUpperCase());
const out = `import type { ToolGuide } from "@/types/guide";
${files.map(f => `import ${ident(f)} from "./${f}";`).join("\n")}

const guides: Record<string, ToolGuide> = {
${files.map(f => `  "${f}": ${ident(f)},`).join("\n")}
};

export function getToolGuide(slug: string): ToolGuide | undefined {
  return guides[slug];
}

export const guideSlugs = Object.keys(guides);
`;
writeFileSync("config/guides/index.ts", out);
console.log(`generated index for ${files.length} guides`);
