"use client";
import { useState, useRef, useEffect } from "react";
import QRCode from "qrcode";

export default function QrCodeGenerator() {
  const [text, setText] = useState("");
  const [size, setSize] = useState<128 | 256 | 512>(256);
  const [errorLevel, setErrorLevel] = useState<"L" | "M" | "H">("M");
  const [copied, setCopied] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!text || !canvasRef.current) return;
    QRCode.toCanvas(canvasRef.current, text, {
      width: size,
      errorCorrectionLevel: errorLevel,
      margin: 2,
    }).catch(() => {});
  }, [text, size, errorLevel]);

  function download() {
    if (!canvasRef.current || !text) return;
    const link = document.createElement("a");
    link.download = "qrcode.png";
    link.href = canvasRef.current.toDataURL("image/png");
    link.click();
  }

  async function copyText() {
    if (!text) return;
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="space-y-5">
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Text or URL
        </label>
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="https://example.com"
          className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Size
          </label>
          <div className="flex gap-2">
            {([128, 256, 512] as const).map((s) => (
              <button
                key={s}
                onClick={() => setSize(s)}
                className={`flex-1 py-2 rounded-lg text-sm font-medium transition-colors ${
                  size === s
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300"
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Error Correction
          </label>
          <div className="flex gap-2">
            {(["L", "M", "H"] as const).map((l) => (
              <button
                key={l}
                onClick={() => setErrorLevel(l)}
                className={`flex-1 py-2 rounded-lg text-sm font-medium transition-colors ${
                  errorLevel === l
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300"
                }`}
              >
                {l}
              </button>
            ))}
          </div>
        </div>
      </div>

      {text && (
        <div className="flex flex-col items-center gap-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl p-6">
          <canvas ref={canvasRef} className="rounded-lg" />
          <div className="flex gap-3">
            <button
              onClick={download}
              className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-colors"
            >
              Download PNG
            </button>
            <button
              onClick={copyText}
              className="px-5 py-2 bg-gray-200 dark:bg-gray-600 hover:bg-gray-300 dark:hover:bg-gray-500 text-gray-800 dark:text-white font-semibold rounded-xl transition-colors"
            >
              {copied ? "Copied!" : "Copy Text"}
            </button>
          </div>
        </div>
      )}

      {!text && (
        <div className="flex items-center justify-center h-48 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
          <p className="text-gray-400 dark:text-gray-500">Enter text above to generate QR code</p>
        </div>
      )}
    </div>
  );
}
