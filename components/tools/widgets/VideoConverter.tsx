"use client";

import { useState, useRef } from "react";

const FORMATS = [
  { value: "mp4", label: "MP4 (H.264)", mime: "video/mp4" },
  { value: "webm", label: "WebM (VP8)", mime: "video/webm" },
  { value: "gif", label: "GIF (animated)", mime: "image/gif" },
  { value: "mp3", label: "MP3 (audio only)", mime: "audio/mpeg" },
];

export default function VideoConverter() {
  const [file, setFile] = useState<File | null>(null);
  const [outputFormat, setOutputFormat] = useState("mp4");
  const [converting, setConverting] = useState(false);
  const [progress, setProgress] = useState(0);
  const [resultUrl, setResultUrl] = useState<string | null>(null);
  const [error, setError] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);

  async function handleConvert() {
    if (!file) return;
    setConverting(true);
    setError("");
    setResultUrl(null);
    setProgress(0);

    try {
      const { FFmpeg } = await import("@ffmpeg/ffmpeg");
      const { fetchFile, toBlobURL } = await import("@ffmpeg/util");

      const ffmpeg = new FFmpeg();

      ffmpeg.on("progress", ({ progress: p }) => {
        setProgress(Math.round(p * 100));
      });

      // Load FFmpeg
      setProgress(5);
      await ffmpeg.load({
        coreURL: await toBlobURL("https://unpkg.com/@ffmpeg/core@0.12.6/dist/umd/ffmpeg-core.js", "text/javascript"),
        wasmURL: await toBlobURL("https://unpkg.com/@ffmpeg/core@0.12.6/dist/umd/ffmpeg-core.wasm", "application/wasm"),
      });

      // Write input file
      setProgress(20);
      await ffmpeg.writeFile("input", await fetchFile(file));

      // Build ffmpeg command
      const outputFile = `output.${outputFormat}`;
      let args: string[];

      switch (outputFormat) {
        case "mp4":
          args = ["-i", "input", "-c:v", "libx264", "-c:a", "aac", "-preset", "fast", outputFile];
          break;
        case "webm":
          args = ["-i", "input", "-c:v", "libvpx", "-c:a", "libvorbis", outputFile];
          break;
        case "gif":
          args = ["-i", "input", "-vf", "fps=10,scale=480:-1:flags=lanczos", "-loop", "0", outputFile];
          break;
        case "mp3":
          args = ["-i", "input", "-vn", "-ar", "44100", "-ac", "2", "-b:a", "192k", outputFile];
          break;
        default:
          args = ["-i", "input", outputFile];
      }

      await ffmpeg.exec(args);

      const data = await ffmpeg.readFile(outputFile) as Uint8Array;
      const format = FORMATS.find(f => f.value === outputFormat);
      const blob = new Blob([data as unknown as BlobPart], { type: format?.mime ?? "video/mp4" });
      setResultUrl(URL.createObjectURL(blob));
      setProgress(100);
    } catch (e) {
      console.error(e);
      setError("Conversion failed. The file may be too large or the format is not supported. Try a smaller file (under 50MB).");
    } finally {
      setConverting(false);
    }
  }

  function download() {
    if (!resultUrl || !file) return;
    const a = document.createElement("a");
    a.href = resultUrl;
    a.download = file.name.replace(/\.[^.]+$/, "") + "." + outputFormat;
    a.click();
  }

  const fileSize = file ? (file.size / (1024 * 1024)).toFixed(1) : null;

  return (
    <div className="space-y-5">
      {/* File Upload */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Video File
        </label>
        <div
          onClick={() => fileRef.current?.click()}
          className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl p-8 text-center cursor-pointer hover:border-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/10 transition-all"
        >
          {file ? (
            <div>
              <div className="text-2xl mb-2">🎬</div>
              <div className="font-semibold text-gray-800 dark:text-gray-200">{file.name}</div>
              <div className="text-sm text-gray-500 mt-1">{fileSize} MB</div>
            </div>
          ) : (
            <div>
              <div className="text-3xl mb-2">🎬</div>
              <div className="font-medium text-gray-600 dark:text-gray-400">Click to select a video file</div>
              <div className="text-sm text-gray-400 mt-1">MP4, MOV, AVI, MKV, WebM — max 100MB</div>
            </div>
          )}
        </div>
        <input
          ref={fileRef}
          type="file"
          accept="video/*,audio/*"
          className="hidden"
          onChange={(e) => {
            const f = e.target.files?.[0];
            if (f) { setFile(f); setResultUrl(null); setError(""); }
          }}
        />
      </div>

      {/* Output Format */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Convert to
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {FORMATS.map((fmt) => (
            <button
              key={fmt.value}
              onClick={() => setOutputFormat(fmt.value)}
              className={`px-3 py-2 rounded-xl border-2 text-sm font-medium transition-colors ${
                outputFormat === fmt.value
                  ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400"
                  : "border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:border-gray-300"
              }`}
            >
              {fmt.label}
            </button>
          ))}
        </div>
      </div>

      {/* Warning for large files */}
      <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-xl px-4 py-3 text-sm text-amber-700 dark:text-amber-400">
        ⚠️ Video conversion runs in your browser. First use downloads ~30MB of AI tools. Large files (50MB+) may be slow.
      </div>

      {/* Convert Button */}
      <button
        onClick={handleConvert}
        disabled={!file || converting}
        className="w-full py-3 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold rounded-xl transition-colors"
      >
        {converting ? `Converting... ${progress}%` : `Convert to ${outputFormat.toUpperCase()} ⚡`}
      </button>

      {/* Progress */}
      {converting && (
        <div className="h-2 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
          <div
            className="h-full bg-blue-500 rounded-full transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
      )}

      {/* Error */}
      {error && (
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 text-red-700 dark:text-red-400 rounded-xl px-4 py-3 text-sm">
          ⚠️ {error}
        </div>
      )}

      {/* Result */}
      {resultUrl && (
        <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl p-4 space-y-3">
          <div className="flex items-center gap-2 text-green-700 dark:text-green-400 font-semibold">
            <span>✅</span> Conversion complete!
          </div>
          <button
            onClick={download}
            className="w-full py-3 bg-green-600 hover:bg-green-700 text-white font-bold rounded-xl transition-colors"
          >
            ⬇ Download {outputFormat.toUpperCase()} File
          </button>
        </div>
      )}
    </div>
  );
}
