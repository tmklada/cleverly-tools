import type { ToolConfig } from "@/types/tool";
const config: ToolConfig = {
  slug: "regex-tester",
  title: "Regex Tester",
  description: "Test, debug, and validate regular expressions in real time with match highlighting and detailed results. Supports JavaScript regex syntax with flags — an essential tool for every developer.",
  shortDescription: "Test and debug regular expressions online",
  category: "developer",
  keywords: ["regex tester", "regular expression tester", "regex validator", "regex debugger", "test regex online", "regex match checker", "javascript regex tool"],
  icon: "🔍",
  toolType: "developer",
  faq: [
    { question: "What regex syntax does the tester support?", answer: "The tester uses JavaScript regex syntax, which covers the most common patterns used in web development, including flags like g (global), i (case-insensitive), and m (multiline)." },
    { question: "Does it show all matches or just the first one?", answer: "With the global (g) flag enabled, all matches are highlighted in the test string. Without it, only the first match is shown." },
    { question: "Can I test regex with capture groups?", answer: "Yes. The tool displays all captured groups for each match, making it easy to debug complex patterns with named and unnamed groups." },
  ],
  howItWorks: [
    { step: 1, title: "Enter your regex pattern", description: "Type your regular expression in the pattern field and set any flags (g, i, m, s)." },
    { step: 2, title: "Paste your test string", description: "Enter the text you want to test against your regex pattern." },
    { step: 3, title: "See matches highlighted", description: "All matches and capture groups are highlighted and listed below in real time." },
  ],
  relatedTools: ["json-formatter", "hash-generator", "url-encoder"],
  schema: "WebApplication",
  adsPositions: ["top", "after-tool"],
};
export default config;
