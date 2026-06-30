"use client";
import { useState } from "react";

type HashAlgo = "SHA-1" | "SHA-256" | "SHA-512";

async function hashText(text: string, algo: HashAlgo): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(text);
  const hashBuffer = await crypto.subtle.digest(algo, data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, "0")).join("");
}

export default function HashGenerator() {
  const [input, setInput] = useState<string>("");
  const [hashes, setHashes] = useState<Record<HashAlgo, string>>({ "SHA-1": "", "SHA-256": "", "SHA-512": "" });
  const [copied, setCopied] = useState<HashAlgo | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  async function generate() {
    if (!input.trim()) { setError("Please enter some text."); return; }
    setError("");
    setLoading(true);
    try {
      const [sha1, sha256, sha512] = await Promise.all([
        hashText(input, "SHA-1"),
        hashText(input, "SHA-256"),
        hashText(input, "SHA-512"),
      ]);
      setHashes({ "SHA-1": sha1, "SHA-256": sha256, "SHA-512": sha512 });
    } catch (e) {
      setError("Hashing failed: " + (e as Error).message);
    } finally {
      setLoading(false);
    }
  }

  function copy(algo: HashAlgo) {
    navigator.clipboard.writeText(hashes[algo]);
    setCopied(algo);
    setTimeout(() => setCopied(null), 2000);
  }

  const algos: HashAlgo[] = ["SHA-1", "SHA-256", "SHA-512"];

  return (
    <div className="space-y-5">
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Input Text</label>
        <textarea
          value={input}
          onChange={e => { setInput(e.target.value); setError(""); }}
          placeholder="Enter text to hash..."
          rows={4}
          className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
        />
      </div>

      <div className="flex gap-3">
        <button
          onClick={generate}
          disabled={loading || !input.trim()}
          className="flex-1 py-3 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold rounded-xl transition-colors"
        >
          {loading ? "Hashing..." : "Generate Hashes"}
        </button>
        <button
          onClick={() => { setInput(""); setHashes({ "SHA-1": "", "SHA-256": "", "SHA-512": "" }); }}
          className="px-5 py-3 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 font-semibold rounded-xl transition-colors"
        >
          Clear
        </button>
      </div>

      {error && (
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 text-red-700 dark:text-red-400 rounded-xl px-4 py-3 text-sm">
          ⚠️ {error}
        </div>
      )}

      {algos.map(algo => hashes[algo] && (
        <div key={algo} className="space-y-1.5">
          <div className="flex items-center justify-between">
            <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">{algo}</label>
            <button
              onClick={() => copy(algo)}
              className={`px-3 py-1 rounded-lg text-xs font-medium transition-colors ${copied === algo ? "bg-green-600 text-white" : "bg-blue-600 hover:bg-blue-700 text-white"}`}
            >
              {copied === algo ? "✓ Copied!" : "Copy"}
            </button>
          </div>
          <div className="px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white font-mono text-xs break-all">
            {hashes[algo]}
          </div>
        </div>
      ))}

      <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl px-4 py-3 text-xs text-gray-500 dark:text-gray-400">
        ℹ️ SHA-1 (40 chars), SHA-256 (64 chars), SHA-512 (128 chars). Uses the browser&apos;s built-in Web Crypto API. Note: MD5 is not supported by Web Crypto API.
      </div>
    </div>
  );
}
