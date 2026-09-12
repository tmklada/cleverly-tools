"use client";
import { useState, useRef } from "react";
import SparkMD5 from "spark-md5";

type HashAlgo = "MD5" | "SHA-1" | "SHA-256" | "SHA-384" | "SHA-512";

const ALGOS: HashAlgo[] = ["MD5", "SHA-1", "SHA-256", "SHA-384", "SHA-512"];

const HEX_LENGTH: Record<HashAlgo, number> = {
  "MD5": 32,
  "SHA-1": 40,
  "SHA-256": 64,
  "SHA-384": 96,
  "SHA-512": 128,
};

const CHUNK_SIZE = 2 * 1024 * 1024; // 2 MB slices keep large files out of one giant read

function toHex(buffer: ArrayBuffer): string {
  return Array.from(new Uint8Array(buffer)).map(b => b.toString(16).padStart(2, "0")).join("");
}

function formatSize(bytes: number): string {
  if (bytes < 1024) return bytes + " B";
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
  if (bytes < 1024 * 1024 * 1024) return (bytes / (1024 * 1024)).toFixed(2) + " MB";
  return (bytes / (1024 * 1024 * 1024)).toFixed(2) + " GB";
}

// Let the browser paint between chunks so the progress bar actually moves.
function yieldToUI(): Promise<void> {
  return new Promise<void>(resolve => setTimeout(resolve, 0));
}

async function hashText(text: string, algo: HashAlgo): Promise<string> {
  const bytes = new TextEncoder().encode(text);
  if (algo === "MD5") {
    const spark = new SparkMD5.ArrayBuffer();
    spark.append(bytes.buffer as ArrayBuffer);
    return spark.end();
  }
  const hashBuffer = await crypto.subtle.digest(algo, bytes);
  return toHex(hashBuffer);
}

async function hashFile(file: File, algo: HashAlgo, onProgress: (pct: number) => void): Promise<string> {
  if (algo === "MD5") {
    // Incremental: never holds more than one 2 MB slice in memory.
    const spark = new SparkMD5.ArrayBuffer();
    let offset = 0;
    while (offset < file.size) {
      const end = Math.min(offset + CHUNK_SIZE, file.size);
      spark.append(await file.slice(offset, end).arrayBuffer());
      offset = end;
      onProgress(Math.round((offset / file.size) * 100));
      await yieldToUI();
    }
    onProgress(100);
    return spark.end();
  }

  // Web Crypto has no streaming digest, so read the bytes in slices (for progress
  // + a responsive UI) and digest the assembled buffer.
  const bytes = new Uint8Array(file.size);
  let offset = 0;
  while (offset < file.size) {
    const end = Math.min(offset + CHUNK_SIZE, file.size);
    const slice = await file.slice(offset, end).arrayBuffer();
    bytes.set(new Uint8Array(slice), offset);
    offset = end;
    onProgress(Math.round((offset / file.size) * 90));
    await yieldToUI();
  }
  onProgress(95);
  await yieldToUI();
  const hashBuffer = await crypto.subtle.digest(algo, bytes);
  onProgress(100);
  return toHex(hashBuffer);
}

export default function HashGenerator() {
  const [mode, setMode] = useState<"text" | "file">("text");
  const [algo, setAlgo] = useState<HashAlgo>("SHA-256");
  const [input, setInput] = useState<string>("");
  const [file, setFile] = useState<File | null>(null);
  const [results, setResults] = useState<Partial<Record<HashAlgo, string>>>({});
  const [expected, setExpected] = useState<string>("");
  const [progress, setProgress] = useState<number>(0);
  const [copied, setCopied] = useState<HashAlgo | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [dragging, setDragging] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  function resetResults() {
    setResults({});
    setProgress(0);
    setError("");
  }

  function pickFile(f: File | undefined | null) {
    if (!f) return;
    setFile(f);
    resetResults();
  }

  async function generate() {
    if (mode === "text" && !input) { setError("Please enter some text."); return; }
    if (mode === "file" && !file) { setError("Please choose a file first."); return; }
    setError("");
    setProgress(0);
    setLoading(true);
    try {
      const value = mode === "text"
        ? await hashText(input, algo)
        : await hashFile(file as File, algo, setProgress);
      setResults(prev => ({ ...prev, [algo]: value }));
    } catch (e) {
      setError("Hashing failed: " + (e as Error).message);
    } finally {
      setLoading(false);
    }
  }

  function clearAll() {
    setInput("");
    setFile(null);
    setExpected("");
    resetResults();
    if (fileInputRef.current) fileInputRef.current.value = "";
  }

  function copy(which: HashAlgo) {
    const value = results[which];
    if (!value) return;
    navigator.clipboard.writeText(value);
    setCopied(which);
    setTimeout(() => setCopied(null), 2000);
  }

  // Checksum files are often "<hash>  <filename>", so take the first token.
  const normalizedExpected = expected.trim().split(/\s+/)[0]?.toLowerCase() ?? "";
  const computed = ALGOS.filter(a => results[a]);
  const matchedAlgo = normalizedExpected
    ? computed.find(a => results[a]?.toLowerCase() === normalizedExpected) ?? null
    : null;
  const expectedAlgoHint = normalizedExpected
    ? ALGOS.find(a => HEX_LENGTH[a] === normalizedExpected.length) ?? null
    : null;

  return (
    <div className="space-y-5">
      {/* Mode switch */}
      <div className="flex gap-2 p-1 bg-gray-100 dark:bg-gray-700 rounded-xl">
        {(["text", "file"] as const).map(m => (
          <button
            key={m}
            onClick={() => { setMode(m); resetResults(); }}
            className={`flex-1 py-2 rounded-lg text-sm font-semibold transition-colors ${mode === m ? "bg-white dark:bg-gray-800 text-blue-600 shadow-sm" : "text-gray-600 dark:text-gray-300 hover:text-blue-600"}`}
          >
            {m === "text" ? "Hash Text" : "Hash a File"}
          </button>
        ))}
      </div>

      {/* Algorithm selector */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Algorithm</label>
        <div className="flex flex-wrap gap-2">
          {ALGOS.map(a => (
            <button
              key={a}
              onClick={() => setAlgo(a)}
              className={`px-4 py-2 rounded-xl text-sm font-semibold border transition-colors ${algo === a ? "bg-blue-600 border-blue-600 text-white" : "bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:border-blue-400"}`}
            >
              {a}
            </button>
          ))}
        </div>
        {algo === "MD5" && (
          <div className="mt-2 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 text-amber-800 dark:text-amber-300 rounded-xl px-4 py-3 text-xs">
            ⚠️ MD5 is cryptographically broken — never use it for passwords, signatures, or anything an attacker could try to fake. It is still the standard for file-integrity checksums, which is what it is here for.
          </div>
        )}
      </div>

      {mode === "text" ? (
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Input Text</label>
          <textarea
            value={input}
            onChange={e => { setInput(e.target.value); resetResults(); }}
            placeholder="Enter text to hash..."
            rows={4}
            className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
          />
        </div>
      ) : (
        <div
          onClick={() => fileInputRef.current?.click()}
          onDragOver={e => { e.preventDefault(); setDragging(true); }}
          onDragLeave={() => setDragging(false)}
          onDrop={e => { e.preventDefault(); setDragging(false); pickFile(e.dataTransfer.files?.[0]); }}
          className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-colors ${dragging ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20" : "border-blue-300 dark:border-blue-600 hover:border-blue-500"}`}
        >
          <div className="text-4xl mb-2">📄</div>
          <p className="text-gray-600 dark:text-gray-300 font-medium break-all">
            {file ? file.name : "Click to choose a file, or drop one here"}
          </p>
          <p className="text-sm text-gray-400 mt-1">
            {file ? formatSize(file.size) : "Any file type — the bytes are read in your browser, nothing is uploaded"}
          </p>
          <input
            ref={fileInputRef}
            type="file"
            onChange={e => pickFile(e.target.files?.[0])}
            className="hidden"
          />
        </div>
      )}

      <div className="flex gap-3">
        <button
          onClick={generate}
          disabled={loading || (mode === "text" ? !input : !file)}
          className="flex-1 py-3 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold rounded-xl transition-colors"
        >
          {loading ? "Hashing..." : `Generate ${algo} Hash`}
        </button>
        <button
          onClick={clearAll}
          className="px-5 py-3 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 font-semibold rounded-xl transition-colors"
        >
          Clear
        </button>
      </div>

      {loading && mode === "file" && (
        <div className="space-y-1.5">
          <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400">
            <span>Reading and hashing file...</span>
            <span>{progress}%</span>
          </div>
          <div className="h-2 w-full bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
            <div className="h-full bg-blue-600 transition-all duration-150" style={{ width: progress + "%" }} />
          </div>
        </div>
      )}

      {error && (
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 text-red-700 dark:text-red-400 rounded-xl px-4 py-3 text-sm">
          ⚠️ {error}
        </div>
      )}

      {computed.length > 0 && (
        <div className="space-y-4">
          {mode === "file" && file && (
            <p className="text-xs text-gray-500 dark:text-gray-400 break-all">
              File: <span className="font-medium text-gray-700 dark:text-gray-300">{file.name}</span> · {formatSize(file.size)}
            </p>
          )}
          {computed.map(a => (
            <div key={a} className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">{a}</label>
                <button
                  onClick={() => copy(a)}
                  className={`px-3 py-1 rounded-lg text-xs font-medium transition-colors ${copied === a ? "bg-green-600 text-white" : "bg-blue-600 hover:bg-blue-700 text-white"}`}
                >
                  {copied === a ? "✓ Copied!" : "Copy"}
                </button>
              </div>
              <div className="px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white font-mono text-xs break-all">
                {results[a]}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Compare mode */}
      <div className="space-y-1.5">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Compare with an expected checksum <span className="font-normal text-gray-400">(optional)</span>
        </label>
        <input
          type="text"
          value={expected}
          onChange={e => setExpected(e.target.value)}
          placeholder="Paste the hash published by the download page..."
          className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white font-mono text-xs focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {normalizedExpected && (
          matchedAlgo ? (
            <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 text-green-700 dark:text-green-400 rounded-xl px-4 py-3 text-sm font-semibold">
              ✓ Match — the {matchedAlgo} hash is identical to the value you pasted.
            </div>
          ) : computed.length === 0 ? (
            <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl px-4 py-3 text-xs text-gray-500 dark:text-gray-400">
              Generate a hash above to compare it{expectedAlgoHint ? ` — that value looks like ${expectedAlgoHint} (${HEX_LENGTH[expectedAlgoHint]} characters).` : "."}
            </div>
          ) : (
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-400 rounded-xl px-4 py-3 text-sm font-semibold">
              ✗ No match — the pasted value does not equal the {computed.join(", ")} hash{computed.length > 1 ? "es" : ""} above.
              {expectedAlgoHint && !computed.includes(expectedAlgoHint) && (
                <span className="block mt-1 font-normal">
                  It is {HEX_LENGTH[expectedAlgoHint]} characters long, so it is probably a {expectedAlgoHint} hash — select {expectedAlgoHint} above and generate again.
                </span>
              )}
            </div>
          )
        )}
      </div>

      <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl px-4 py-3 text-xs text-gray-500 dark:text-gray-400">
        ℹ️ MD5 (32 chars), SHA-1 (40), SHA-256 (64), SHA-384 (96), SHA-512 (128). SHA hashes use the browser&apos;s built-in Web Crypto API; MD5 uses a JavaScript implementation, computed over the file in 2 MB chunks. Everything runs locally in your browser — no text or file is ever uploaded.
      </div>
    </div>
  );
}
