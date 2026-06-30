import type { ToolConfig } from "@/types/tool";
const config: ToolConfig = {
  slug: "hash-generator",
  title: "Hash Generator",
  description: "Generate cryptographic hash values for any text using MD5, SHA-1, SHA-256, and SHA-512 algorithms. Instantly verify data integrity, check passwords, or create file checksums — all in your browser.",
  shortDescription: "Generate MD5, SHA1, SHA256 hashes online",
  category: "developer",
  keywords: ["hash generator", "md5 generator", "sha256 generator", "sha1 hash online", "checksum generator", "crypto hash tool", "text hash calculator"],
  icon: "#️⃣",
  featured: true,
  toolType: "developer",
  faq: [
    { question: "What hashing algorithms are supported?", answer: "The tool supports MD5, SHA-1, SHA-224, SHA-256, SHA-384, and SHA-512. These are the most commonly used cryptographic hash functions." },
    { question: "Is hashing the same as encryption?", answer: "No. Hashing is a one-way process — you cannot reverse a hash to get the original text. Encryption is two-way and requires a key to decrypt." },
    { question: "Can I hash a file as well as text?", answer: "Yes. You can either type or paste text to hash, or upload a file to generate its checksum for integrity verification." },
  ],
  howItWorks: [
    { step: 1, title: "Enter text or upload a file", description: "Type or paste the text you want to hash, or upload a file to generate its checksum." },
    { step: 2, title: "Select hash algorithm", description: "Choose from MD5, SHA-1, SHA-256, or SHA-512 based on your needs." },
    { step: 3, title: "Copy the hash value", description: "Click Generate and copy the resulting hash string to use in your project." },
  ],
  relatedTools: ["password-generator", "base64-encoder", "regex-tester"],
  schema: "WebApplication",
  adsPositions: ["top", "after-tool"],
};
export default config;
