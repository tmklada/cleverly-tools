"use client";
import { useState, useRef, useEffect, useCallback } from "react";

const SIZES = [16, 32, 48, 64, 192];

interface GeneratedFavicon {
  size: number;
  dataUrl: string;
}

export default function FaviconGenerator() {
  const [mode, setMode] = useState<"text" | "image">("text");
  const [text, setText] = useState("");
  const [bgColor, setBgColor] = useState("#6366f1");
  const [textColor, setTextColor] = useState("#ffffff");
  const [fontSize, setFontSize] = useState(60);
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [favicons, setFavicons] = useState<GeneratedFavicon[]>([]);
  const [copied, setCopied] = useState(false);

  const previewCanvasRef = useRef<HTMLCanvasElement>(null);

  const generateCanvas = useCallback((size: number): HTMLCanvasElement => {
    const canvas = document.createElement("canvas");
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext("2d")!;

    if (mode === "text") {
      // Background
      ctx.fillStyle = bgColor;
      ctx.beginPath();
      ctx.roundRect(0, 0, size, size, size * 0.15);
      ctx.fill();

      // Text
      ctx.fillStyle = textColor;
      ctx.font = `bold ${Math.round(size * fontSize / 100)}px sans-serif`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(text.slice(0, 2) || "F", size / 2, size / 2);
    } else if (imageSrc) {
      const img = new Image();
      img.src = imageSrc;
      ctx.drawImage(img, 0, 0, size, size);
    }

    return canvas;
  }, [mode, text, bgColor, textColor, fontSize, imageSrc]);

  // Update preview
  useEffect(() => {
    const canvas = previewCanvasRef.current;
    if (!canvas) return;
    canvas.width = 64;
    canvas.height = 64;
    const ctx = canvas.getContext("2d")!;

    if (mode === "text") {
      ctx.fillStyle = bgColor;
      ctx.beginPath();
      ctx.roundRect(0, 0, 64, 64, 10);
      ctx.fill();
      ctx.fillStyle = textColor;
      ctx.font = `bold ${Math.round(64 * fontSize / 100)}px sans-serif`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(text.slice(0, 2) || "F", 32, 32);
    } else if (imageSrc) {
      const img = new Image();
      img.src = imageSrc;
      img.onload = () => ctx.drawImage(img, 0, 0, 64, 64);
    }
  }, [mode, text, bgColor, textColor, fontSize, imageSrc, generateCanvas]);

  function generate() {
    if (mode === "text" && !text.trim()) return;
    if (mode === "image" && !imageSrc) return;

    // For image mode, we need to wait for the image to load
    if (mode === "image" && imageSrc) {
      const img = new Image();
      img.src = imageSrc;
      img.onload = () => {
        const result = SIZES.map(size => {
          const canvas = document.createElement("canvas");
          canvas.width = size;
          canvas.height = size;
          const ctx = canvas.getContext("2d")!;
          ctx.drawImage(img, 0, 0, size, size);
          return { size, dataUrl: canvas.toDataURL("image/png") };
        });
        setFavicons(result);
      };
      return;
    }

    const result = SIZES.map(size => {
      const canvas = generateCanvas(size);
      return { size, dataUrl: canvas.toDataURL("image/png") };
    });
    setFavicons(result);
  }

  function downloadFavicon(dataUrl: string, size: number) {
    const a = document.createElement("a");
    a.href = dataUrl;
    a.download = `favicon-${size}x${size}.png`;
    a.click();
  }

  function downloadAll() {
    favicons.forEach(({ dataUrl, size }) => {
      setTimeout(() => downloadFavicon(dataUrl, size), size * 5);
    });
  }

  function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setImageSrc(URL.createObjectURL(file));
  }

  const htmlTags = favicons.length > 0
    ? SIZES.map(size => `<link rel="icon" type="image/png" sizes="${size}x${size}" href="/favicon-${size}x${size}.png">`).join("\n")
    : "";

  function copyTags() {
    navigator.clipboard.writeText(htmlTags);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="space-y-5">
      {/* Mode toggle */}
      <div className="flex gap-2">
        {(["text", "image"] as const).map(m => (
          <button key={m} onClick={() => setMode(m)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${mode === m ? "bg-blue-600 text-white" : "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300"}`}>
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
              onChange={e => setText(e.target.value.slice(0, 2))}
              placeholder="A or 🚀"
              maxLength={2}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-2xl"
            />
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Background</label>
              <input type="color" value={bgColor} onChange={e => setBgColor(e.target.value)}
                className="w-full h-11 rounded-xl border border-gray-200 dark:border-gray-600 cursor-pointer p-1 bg-transparent" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Text Color</label>
              <input type="color" value={textColor} onChange={e => setTextColor(e.target.value)}
                className="w-full h-11 rounded-xl border border-gray-200 dark:border-gray-600 cursor-pointer p-1 bg-transparent" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Size: {fontSize}%</label>
              <input type="range" min={30} max={90} value={fontSize} onChange={e => setFontSize(Number(e.target.value))}
                className="w-full mt-3 accent-blue-600" />
            </div>
          </div>
        </div>
      )}

      {mode === "image" && (
        <label className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl p-6 cursor-pointer hover:border-blue-500 transition-colors">
          <span className="text-2xl mb-1">🖼️</span>
          <span className="text-sm text-gray-600 dark:text-gray-400">Upload image for favicon</span>
          {imageSrc && <img src={imageSrc} alt="Preview" className="mt-3 w-16 h-16 object-cover rounded-lg" />}
          <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
        </label>
      )}

      {/* Live preview */}
      <div className="flex items-center gap-4">
        <div>
          <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Preview (64×64)</p>
          <canvas ref={previewCanvasRef} className="rounded-lg border border-gray-200 dark:border-gray-600" style={{ imageRendering: "pixelated" }} />
        </div>
        <div className="text-sm text-gray-600 dark:text-gray-400">
          <p>This is how your favicon will look in the browser tab.</p>
          <p className="mt-1 text-xs text-gray-400">Supported sizes: {SIZES.join(", ")}px</p>
        </div>
      </div>

      <button onClick={generate}
        className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-colors">
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
                  <span className="text-xs text-gray-500 dark:text-gray-400">{size}px</span>
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

          {/* Download all */}
          <button onClick={downloadAll}
            className="w-full py-2.5 bg-green-600 hover:bg-green-700 text-white font-bold rounded-xl transition-colors text-sm">
            Download All Sizes
          </button>

          {/* HTML tags */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm font-medium text-gray-700 dark:text-gray-300">HTML Link Tags</p>
              <button onClick={copyTags} className="text-xs px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors">
                {copied ? "Copied!" : "Copy"}
              </button>
            </div>
            <pre className="bg-gray-900 text-green-400 text-xs p-3 rounded-xl overflow-x-auto whitespace-pre-wrap">{htmlTags}</pre>
          </div>
        </div>
      )}
    </div>
  );
}
