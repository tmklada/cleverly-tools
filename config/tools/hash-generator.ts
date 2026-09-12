import type { ToolConfig } from "@/types/tool";
const config: ToolConfig = {
  slug: "hash-generator",
  title: "Hash Generator",
  description: "Generate cryptographic hash values for any text using SHA-1, SHA-256, and SHA-512 algorithms. Instantly compare checksums or fingerprint text — all in your browser.",
  shortDescription: "Generate MD5, SHA1, SHA256 hashes online",
  category: "developer",
  keywords: ["hash generator", "md5 generator", "sha256 generator", "sha1 hash online", "checksum generator", "crypto hash tool", "text hash calculator"],
  icon: "#️⃣",
  featured: true,
  toolType: "developer",
  faq: [
    { question: "What hashing algorithms are supported?", answer: "The tool supports SHA-1, SHA-256, and SHA-512, generated together using the browser's built-in Web Crypto API. MD5 is not included because Web Crypto does not implement it." },
    { question: "Is hashing the same as encryption?", answer: "No. Hashing is a one-way process — you cannot reverse a hash to get the original text. Encryption is two-way and requires a key to decrypt." },
    { question: "Can I hash a file as well as text?", answer: "This tool hashes text you type or paste, not files directly. To check a file's integrity, generate its hash with a command-line tool (such as sha256sum or CertUtil) and paste the result here to compare it against a known-good hash." },
  ],
  howItWorks: [
    { step: 1, title: "Enter text to hash", description: "Type or paste any text — a password, a string, or a hash value copied from a file-hashing command." },
    { step: 2, title: "Generate all three hashes", description: "Click Generate to instantly produce the SHA-1, SHA-256, and SHA-512 hashes of your input side by side." },
    { step: 3, title: "Copy the hash value", description: "Click Copy next to the hash you need to use in your project." },
  ],
  relatedTools: ["password-generator", "base64-encoder", "regex-tester"],
  schema: "WebApplication",
  adsPositions: ["top", "after-tool"],
};
export default config;
