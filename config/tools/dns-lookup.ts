import type { ToolConfig } from "@/types/tool";
const config: ToolConfig = {
  slug: "dns-lookup",
  title: "DNS Lookup Tool",
  description: "Look up DNS records for any domain online for free, including A, AAAA, MX, CNAME, TXT, and NS records. Diagnose email delivery issues, verify domain configuration, and debug DNS instantly.",
  shortDescription: "Look up all DNS records for any domain instantly",
  category: "network",
  keywords: ["dns lookup", "dns checker", "dns record lookup", "mx record lookup", "check dns records", "domain dns lookup", "ns record checker"],
  icon: "🔍",
  toolType: "utility",
  faq: [
    { question: "What DNS record types can I look up?", answer: "You can look up A, AAAA, MX, CNAME, TXT, NS, SOA, and PTR records — all from one tool." },
    { question: "Why would I need to check MX records?", answer: "MX records control where email for a domain is delivered — checking them helps diagnose email delivery problems." },
    { question: "How long do DNS changes take to show up?", answer: "DNS changes can take anywhere from a few minutes to 48 hours to propagate worldwide due to TTL caching." },
  ],
  howItWorks: [
    { step: 1, title: "Enter a domain name", description: "Type the domain you want to look up (e.g. example.com)." },
    { step: 2, title: "Select record type", description: "Choose which DNS record type you want to query, or select All." },
    { step: 3, title: "View the records", description: "All matching DNS records and their values are displayed instantly." },
  ],
  relatedTools: ["ip-address-lookup", "hash-generator", "base64-encoder"],
  schema: "WebApplication",
  adsPositions: ["top", "after-tool"],
};
export default config;
