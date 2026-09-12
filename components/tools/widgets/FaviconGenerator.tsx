"use client";
import { useState, useRef, useEffect, useCallback } from "react";

/** Every PNG size we emit. 180 = Apple touch icon, 192/512 = PWA manifest icons. */
const SIZES = [16, 32, 48, 64, 180, 192, 512];
/** Sizes bundled inside favicon.ico (browsers pick the best one). */
const ICO_SIZES = [16, 32, 48];

interface GeneratedFavicon {
  size: number;
  dataUrl: string;
}

function fileNameFor(size: number): string {
  if (size === 180) return "apple-touch-icon.png";
  if (size === 192) return "android-chrome-192x192.png";
  if (size === 512) return "android-chrome-512x512.png";
  return `favicon-${size}x${size}.png`;
}

/* ------------------------------------------------------------------ *
 * Binary helpers
 * ------------------------------------------------------------------ */

function dataUrlToBytes(dataUrl: string): Uint8Array {
  const base64 = dataUrl.slice(dataUrl.indexOf(",") + 1);
  const binary = atob(base64);
  const out = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) out[i] = binary.charCodeAt(i);
  return out;
}

/**
 * Build a real .ico file by hand — no dependency needed.
 *
 * Layout (all integers little-endian):
 *   ICONDIR      6 bytes   reserved(0) u16 | type(1=icon) u16 | imageCount u16
 *   ICONDIRENTRY 16 bytes each, one per image:
 *                width u8 (0 means 256) | height u8 (0 means 256) | paletteCount u8
 *                | reserved u8 | colorPlanes u16 | bitsPerPixel u16
 *                | byteLength u32 | byteOffset u32
 *   then the raw image payloads, in the same order.
 *
 * Every browser in use today accepts PNG payloads inside an ICO container,
 * so the PNG bytes are embedded verbatim.
 */
function buildIco(images: { size: number; bytes: Uint8Array }[]): Uint8Array {
  const headerSize = 6 + images.length * 16;
  const totalSize = headerSize + images.reduce((sum, i) => sum + i.bytes.length, 0);
  const out = new Uint8Array(totalSize);
  const view = new DataView(out.buffer);

  view.setUint16(0, 0, true); // reserved, must be 0
  view.setUint16(2, 1, true); // resource type: 1 = icon
  view.setUint16(4, images.length, true);

  let payloadOffset = headerSize;
  images.forEach((img, i) => {
    const entry = 6 + i * 16;
    // 256px is encoded as 0 in a single byte; anything larger cannot be stored.
    out[entry] = img.size >= 256 ? 0 : img.size;
    out[entry + 1] = img.size >= 256 ? 0 : img.size;
    out[entry + 2] = 0; // no colour palette
    out[entry + 3] = 0; // reserved
    view.setUint16(entry + 4, 1, true); // colour planes
    view.setUint16(entry + 6, 32, true); // bits per pixel
    view.setUint32(entry + 8, img.bytes.length, true);
    view.setUint32(entry + 12, payloadOffset, true);
    out.set(img.bytes, payloadOffset);
    payloadOffset += img.bytes.length;
  });

  return out;
}

/* ---- Minimal ZIP writer (stored / no compression) ---------------- */

let CRC_TABLE: Uint32Array | null = null;
function crc32(bytes: Uint8Array): number {
  if (!CRC_TABLE) {
    CRC_TABLE = new Uint32Array(256);
    for (let n = 0; n < 256; n++) {
      let c = n;
      for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
      CRC_TABLE[n] = c >>> 0;
    }
  }
  let crc = 0xffffffff;
  for (let i = 0; i < bytes.length; i++) crc = CRC_TABLE[(crc ^ bytes[i]) & 0xff] ^ (crc >>> 8);
  return (crc ^ 0xffffffff) >>> 0;
}

/** Build a ZIP archive with stored (uncompressed) entries — PNG/ICO are already compressed. */
function buildZip(files: { name: string; bytes: Uint8Array }[]): Uint8Array {
  const encoder = new TextEncoder();
  const now = new Date();
  const dosTime = ((now.getHours() << 11) | (now.getMinutes() << 5) | (now.getSeconds() >> 1)) & 0xffff;
  const dosDate = (((now.getFullYear() - 1980) << 9) | ((now.getMonth() + 1) << 5) | now.getDate()) & 0xffff;

  const entries = files.map((f) => ({ name: encoder.encode(f.name), bytes: f.bytes, crc: crc32(f.bytes) }));

  const localSize = entries.reduce((s, e) => s + 30 + e.name.length + e.bytes.length, 0);
  const centralSize = entries.reduce((s, e) => s + 46 + e.name.length, 0);
  const out = new Uint8Array(localSize + centralSize + 22);
  const view = new DataView(out.buffer);

  let offset = 0;
  const localOffsets: number[] = [];

  for (const e of entries) {
    localOffsets.push(offset);
    view.setUint32(offset, 0x04034b50, true); // local file header signature
    view.setUint16(offset + 4, 20, true); // version needed
    view.setUint16(offset + 6, 0, true); // flags
    view.setUint16(offset + 8, 0, true); // method 0 = stored
    view.setUint16(offset + 10, dosTime, true);
    view.setUint16(offset + 12, dosDate, true);
    view.setUint32(offset + 14, e.crc, true);
    view.setUint32(offset + 18, e.bytes.length, true); // compressed size
    view.setUint32(offset + 22, e.bytes.length, true); // uncompressed size
    view.setUint16(offset + 26, e.name.length, true);
    view.setUint16(offset + 28, 0, true); // extra field length
    out.set(e.name, offset + 30);
    out.set(e.bytes, offset + 30 + e.name.length);
    offset += 30 + e.name.length + e.bytes.length;
  }

  const centralStart = offset;
  entries.forEach((e, i) => {
    view.setUint32(offset, 0x02014b50, true); // central directory header signature
    view.setUint16(offset + 4, 20, true); // version made by
    view.setUint16(offset + 6, 20, true); // version needed
    view.setUint16(offset + 8, 0, true);
    view.setUint16(offset + 10, 0, true);
    view.setUint16(offset + 12, dosTime, true);
    view.setUint16(offset + 14, dosDate, true);
    view.setUint32(offset + 16, e.crc, true);
    view.setUint32(offset + 20, e.bytes.length, true);
    view.setUint32(offset + 24, e.bytes.length, true);
    view.setUint16(offset + 28, e.name.length, true);
    view.setUint16(offset + 30, 0, true); // extra
    view.setUint16(offset + 32, 0, true); // comment
    view.setUint16(offset + 34, 0, true); // disk number start
    view.setUint16(offset + 36, 0, true); // internal attributes
    view.setUint32(offset + 38, 0, true); // external attributes
    view.setUint32(offset + 42, localOffsets[i], true);
    out.set(e.name, offset + 46);
    offset += 46 + e.name.length;
  });

  view.setUint32(offset, 0x06054b50, true); // end of central directory
  view.setUint16(offset + 4, 0, true);
  view.setUint16(offset + 6, 0, true);
  view.setUint16(offset + 8, entries.length, true);
  view.setUint16(offset + 10, entries.length, true);
  view.setUint32(offset + 12, offset - centralStart, true);
  view.setUint32(offset + 16, centralStart, true);
  view.setUint16(offset + 20, 0, true);

  return out;
}

function saveBytes(bytes: Uint8Array, name: string, mime: string) {
  const blob = new Blob([bytes.slice().buffer as ArrayBuffer], { type: mime });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = name;
  a.click();
  setTimeout(() => URL.revokeObjectURL(url), 5000);
}

const MANIFEST_JSON = `{
  "name": "Your Site Name",
  "short_name": "Your Site",
  "icons": [
    { "src": "/android-chrome-192x192.png", "sizes": "192x192", "type": "image/png" },
    { "src": "/android-chrome-512x512.png", "sizes": "512x512", "type": "image/png" }
  ],
  "theme_color": "#ffffff",
  "background_color": "#ffffff",
  "display": "standalone"
}`;

const HTML_SNIPPET = `<link rel="icon" href="/favicon.ico" sizes="32x32">
<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png">
<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">
<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">
<link rel="manifest" href="/site.webmanifest">`;

/* ------------------------------------------------------------------ *
 * Component
 * ------------------------------------------------------------------ */

export default function FaviconGenerator() {
  const [mode, setMode] = useState<"text" | "image">("text");
  const [text, setText] = useState("");
  const [bgColor, setBgColor] = useState("#6366f1");
  const [textColor, setTextColor] = useState("#ffffff");
  const [fontSize, setFontSize] = useState(60);
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [imageEl, setImageEl] = useState<HTMLImageElement | null>(null);
  const [favicons, setFavicons] = useState<GeneratedFavicon[]>([]);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const previewCanvasRef = useRef<HTMLCanvasElement>(null);

  const drawInto = useCallback(
    (ctx: CanvasRenderingContext2D, size: number) => {
      ctx.clearRect(0, 0, size, size);
      if (mode === "text") {
        ctx.fillStyle = bgColor;
        ctx.beginPath();
        ctx.roundRect(0, 0, size, size, size * 0.15);
        ctx.fill();
        ctx.fillStyle = textColor;
        ctx.font = `bold ${Math.round((size * fontSize) / 100)}px sans-serif`;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(text.slice(0, 2) || "F", size / 2, size / 2);
      } else if (imageEl) {
        ctx.drawImage(imageEl, 0, 0, size, size);
      }
    },
    [mode, text, bgColor, textColor, fontSize, imageEl],
  );

  const generateCanvas = useCallback(
    (size: number): HTMLCanvasElement => {
      const canvas = document.createElement("canvas");
      canvas.width = size;
      canvas.height = size;
      const ctx = canvas.getContext("2d")!;
      drawInto(ctx, size);
      return canvas;
    },
    [drawInto],
  );

  // Live preview
  useEffect(() => {
    const canvas = previewCanvasRef.current;
    if (!canvas) return;
    canvas.width = 64;
    canvas.height = 64;
    const ctx = canvas.getContext("2d");
    if (ctx) drawInto(ctx, 64);
  }, [drawInto]);

  function generate() {
    if (mode === "text" && !text.trim()) return;
    if (mode === "image" && !imageEl) return;
    setFavicons(SIZES.map((size) => ({ size, dataUrl: generateCanvas(size).toDataURL("image/png") })));
  }

  function downloadFavicon(dataUrl: string, size: number) {
    saveBytes(dataUrlToBytes(dataUrl), fileNameFor(size), "image/png");
  }

  function icoBytes(): Uint8Array | null {
    const parts = ICO_SIZES.map((size) => {
      const found = favicons.find((f) => f.size === size);
      return found ? { size, bytes: dataUrlToBytes(found.dataUrl) } : null;
    }).filter((p): p is { size: number; bytes: Uint8Array } => p !== null);
    return parts.length ? buildIco(parts) : null;
  }

  function downloadIco() {
    const bytes = icoBytes();
    if (bytes) saveBytes(bytes, "favicon.ico", "image/x-icon");
  }

  function downloadZip() {
    const files: { name: string; bytes: Uint8Array }[] = favicons.map((f) => ({
      name: fileNameFor(f.size),
      bytes: dataUrlToBytes(f.dataUrl),
    }));
    const ico = icoBytes();
    if (ico) files.unshift({ name: "favicon.ico", bytes: ico });
    files.push({ name: "site.webmanifest", bytes: new TextEncoder().encode(MANIFEST_JSON) });
    files.push({ name: "head-snippet.html", bytes: new TextEncoder().encode(HTML_SNIPPET + "\n") });
    saveBytes(buildZip(files), "favicons.zip", "application/zip");
  }

  function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setImageSrc(url);
    const img = new Image();
    img.onload = () => setImageEl(img);
    img.src = url;
  }

  function copy(key: string, value: string) {
    navigator.clipboard.writeText(value);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  }

  const CopyBlock = ({ label, id, value }: { label: string; id: string; value: string }) => (
    <div>
      <div className="flex items-center justify-between mb-2">
        <p className="text-sm font-medium text-gray-700 dark:text-gray-300">{label}</p>
        <button
          onClick={() => copy(id, value)}
          className="text-xs px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
        >
          {copiedKey === id ? "Copied!" : "Copy"}
        </button>
      </div>
      <pre className="bg-gray-900 text-green-400 text-xs p-3 rounded-xl overflow-x-auto whitespace-pre-wrap">{value}</pre>
    </div>
  );

  return (
    <div className="space-y-5">
      {/* Mode toggle */}
      <div className="flex gap-2">
        {(["text", "image"] as const).map((m) => (
          <button
            key={m}
            onClick={() => setMode(m)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${mode === m ? "bg-blue-600 text-white" : "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300"}`}
          >
            {m === "text" ? "Text / Emoji" : "Upload Image"}
          </button>
        ))}
      </div>

      {mode === "text" && (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Text or Emoji (1–2 characters)
            </label>
            <input
              type="text"
              value={text}
              onChange={(e) => setText(e.target.value.slice(0, 2))}
              placeholder="A or 🚀"
              maxLength={2}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-2xl"
            />
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Background</label>
              <input
                type="color"
                value={bgColor}
                onChange={(e) => setBgColor(e.target.value)}
                className="w-full h-11 rounded-xl border border-gray-200 dark:border-gray-600 cursor-pointer p-1 bg-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Text Color</label>
              <input
                type="color"
                value={textColor}
                onChange={(e) => setTextColor(e.target.value)}
                className="w-full h-11 rounded-xl border border-gray-200 dark:border-gray-600 cursor-pointer p-1 bg-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Size: {fontSize}%</label>
              <input
                type="range"
                min={30}
                max={90}
                value={fontSize}
                onChange={(e) => setFontSize(Number(e.target.value))}
                className="w-full mt-3 accent-blue-600"
              />
            </div>
          </div>
        </div>
      )}

      {mode === "image" && (
        <label className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl p-6 cursor-pointer hover:border-blue-500 transition-colors">
          <span className="text-2xl mb-1">🖼️</span>
          <span className="text-sm text-gray-600 dark:text-gray-400">Upload image for favicon</span>
          <span className="text-xs text-gray-400 dark:text-gray-500 mt-1">
            Square, at least 512×512 px for a clean 512 output
          </span>
          {imageSrc && <img src={imageSrc} alt="Preview" className="mt-3 w-16 h-16 object-cover rounded-lg" />}
          <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
        </label>
      )}

      {/* Live preview */}
      <div className="flex items-center gap-4">
        <div>
          <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Preview (64×64)</p>
          <canvas
            ref={previewCanvasRef}
            className="rounded-lg border border-gray-200 dark:border-gray-600"
            style={{ imageRendering: "pixelated" }}
          />
        </div>
        <div className="text-sm text-gray-600 dark:text-gray-400">
          <p>This is how your favicon will look in the browser tab.</p>
          <p className="mt-1 text-xs text-gray-400">
            Outputs: favicon.ico (16/32/48) plus PNGs at {SIZES.join(", ")}px
          </p>
        </div>
      </div>

      <button
        onClick={generate}
        className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-colors"
      >
        Generate Favicons
      </button>

      {favicons.length > 0 && (
        <div className="space-y-4">
          {/* Size previews */}
          <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-4">
            <div className="flex flex-wrap gap-4 items-end">
              {favicons.map(({ size, dataUrl }) => (
                <div key={size} className="flex flex-col items-center gap-1">
                  <img
                    src={dataUrl}
                    alt={`${size}px`}
                    width={Math.min(size, 64)}
                    height={Math.min(size, 64)}
                    className="border border-gray-200 dark:border-gray-600 rounded"
                    style={{ imageRendering: "pixelated" }}
                  />
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    {size}px{size === 180 ? " (Apple)" : size === 512 ? " (PWA)" : ""}
                  </span>
                  <button
                    onClick={() => downloadFavicon(dataUrl, size)}
                    className="text-xs text-blue-600 hover:text-blue-700 dark:text-blue-400"
                  >
                    Download
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* favicon.ico */}
          <div className="flex flex-wrap items-center justify-between gap-3 bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-200 dark:border-indigo-800 rounded-xl p-4">
            <div>
              <p className="text-sm font-bold text-indigo-900 dark:text-indigo-200">favicon.ico</p>
              <p className="text-xs text-indigo-800 dark:text-indigo-300 mt-0.5">
                One file containing the 16, 32 and 48px icons — what browsers request from your site root by default.
              </p>
            </div>
            <button
              onClick={downloadIco}
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-bold rounded-lg transition-colors"
            >
              Download .ico
            </button>
          </div>

          {/* Download all */}
          <button
            onClick={downloadZip}
            className="w-full py-2.5 bg-green-600 hover:bg-green-700 text-white font-bold rounded-xl transition-colors text-sm"
          >
            Download All as ZIP (.ico + {SIZES.length} PNGs + manifest)
          </button>

          <CopyBlock label="Paste into your &lt;head&gt;" id="head" value={HTML_SNIPPET} />
          <CopyBlock label="site.webmanifest (for the 192 and 512 icons)" id="manifest" value={MANIFEST_JSON} />

          <p className="text-xs text-gray-500 dark:text-gray-400">
            Put every downloaded file in your site&apos;s root folder. If your static files are served from a subpath,
            adjust the href values above to match.
          </p>
        </div>
      )}
    </div>
  );
}
