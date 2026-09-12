import type { ToolConfig } from "@/types/tool";
const config: ToolConfig = {
  slug: "hash-generator",
  title: "Hash Generator",
  description: "Generate MD5, SHA-1, SHA-256, SHA-384, and SHA-512 hashes for any text or file. Verify a download against its published checksum — everything runs in your browser.",
  shortDescription: "Generate MD5, SHA1, SHA256 hashes online",
  category: "developer",
  keywords: ["hash generator", "md5 generator", "sha256 generator", "sha1 hash online", "checksum generator", "file checksum", "md5 file hash", "crypto hash tool", "text hash calculator"],
  icon: "#️⃣",
  featured: true,
  toolType: "developer",
  faq: [
    { question: "What hashing algorithms are supported?", answer: "MD5, SHA-1, SHA-256, SHA-384, and SHA-512. The SHA family is computed with the browser's built-in Web Crypto API; MD5 uses a JavaScript implementation, since Web Crypto deliberately omits it." },
    { question: "Is hashing the same as encryption?", answer: "No. Hashing is a one-way process — you cannot reverse a hash to get the original text. Encryption is two-way and requires a key to decrypt." },
    { question: "Can I hash a file as well as text?", answer: "Yes. Switch to the file tab and choose or drop any file, and the tool hashes the file's actual bytes. Large files are read in 2 MB chunks with a progress bar, so even multi-gigabyte ISOs work without freezing the page." },
    { question: "Is my file uploaded anywhere?", answer: "No. The file is read and hashed entirely inside your browser using the File API — nothing is sent to a server, so it works offline and is safe for private files." },
    { question: "How do I check a download against its published checksum?", answer: "Hash the downloaded file, then paste the checksum from the publisher's page into the compare field. The tool tells you immediately whether the values match, ignoring case and surrounding whitespace." },
    { question: "Is MD5 safe to use?", answer: "MD5 is cryptographically broken and must not be used for passwords, signatures, or anything an attacker could try to forge. It is still widely published as a file-integrity checksum, which is why the tool supports it — for security use SHA-256 instead." },
  ],
  howItWorks: [
    { step: 1, title: "Choose text or file", description: "Type or paste text, or switch to the file tab and drop in any file — an installer, an ISO, a ZIP archive." },
    { step: 2, title: "Pick an algorithm", description: "Select MD5, SHA-1, SHA-256, SHA-384, or SHA-512 and click Generate. Large files show a progress bar while they are hashed." },
    { step: 3, title: "Copy or compare the hash", description: "Copy the hash with one click, or paste a published checksum into the compare field to get an instant match / no-match answer." },
  ],
  relatedTools: ["password-generator", "base64-encoder", "regex-tester"],
  schema: "WebApplication",
  adsPositions: ["top", "after-tool"],
};
export default config;
