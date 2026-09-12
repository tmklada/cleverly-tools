import type { ToolConfig } from "@/types/tool";
const config: ToolConfig = {
  slug: "ip-address-lookup",
  title: "IP Address Lookup",
  description: "Look up any IP address and get detailed information including location, ISP, organization, and geolocation data for free. Find your own IP or look up any public IP address instantly.",
  shortDescription: "Look up location and details for any IP address",
  category: "network",
  keywords: ["ip address lookup", "ip lookup", "find ip address", "ip geolocation", "ip location finder", "what is my ip", "ip address tracker"],
  icon: "🌐",
  toolType: "utility",
  featured: true,
  faq: [
    { question: "What information can I get from an IP lookup?", answer: "You get the IP address itself plus its approximate country, city, ISP or organization name, timezone, and map coordinates, with a link to view the location on a map." },
    { question: "How accurate is IP geolocation?", answer: "Country-level accuracy is very high (95%+), but city-level accuracy varies and can be off by tens of miles." },
    { question: "Can I look up my own IP address?", answer: "Yes, just leave the field blank and the tool automatically detects and shows your public IP address information." },
  ],
  howItWorks: [
    { step: 1, title: "Enter an IP address", description: "Type any public IPv4 or IPv6 address, or leave blank to look up your own IP." },
    { step: 2, title: "Run the lookup", description: "Click Lookup to retrieve all available information for that IP." },
    { step: 3, title: "View the results", description: "Review the country, city, ISP, timezone, and coordinates, with a link to open the exact point on a map." },
  ],
  relatedTools: ["dns-lookup", "hash-generator", "password-generator"],
  schema: "WebApplication",
  adsPositions: ["top", "after-tool"],
};
export default config;
