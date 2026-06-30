"use client";
import { useState, useRef, useCallback, useEffect } from "react";

type AspectRatio = "free" | "1:1" | "16:9" | "4:3" | "3:2";

const aspectRatios: { label: string; value: AspectRatio; ratio: number | null }[] = [
  { label: "Free", value: "free", ratio: null },
  { label: "1:1", value: "1:1", ratio: 1 },
  { label: "16:9", value: "16:9", ratio: 16 / 9 },
  { label: "4:3", value: "4:3", ratio: 4 / 3 },
  { label: "3:2", value: "3:2", ratio: 3 / 2 },
];

interface CropBox {
  x: number;
  y: number;
  w: number;
  h: number;
}

export default function ImageCropper() {
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [imageSize, setImageSize] = useState({ w: 0, h: 0 });
  const [aspectRatio, setAspectRatio] = useState<AspectRatio>("free");
  const [cropBox, setCropBox] = useState<CropBox>({ x: 10, y: 10, w: 80, h: 80 });
  const [outputW, setOutputW] = useState("");
  const [outputH, setOutputH] = useState("");
  const [dragging, setDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0, bx: 0, by: 0 });

  const containerRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);

  function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setImageSrc(url);
    setCropBox({ x: 10, y: 10, w: 80, h: 80 });
  }

  function getContainerRect() {
    return containerRef.current?.getBoundingClientRect() ?? { left: 0, top: 0, width: 1, height: 1 };
  }

  function onMouseDown(e: React.MouseEvent) {
    e.preventDefault();
    const rect = getContainerRect();
    const mx = ((e.clientX - rect.left) / rect.width) * 100;
    const my = ((e.clientY - rect.top) / rect.height) * 100;
    setDragging(true);
    setDragStart({ x: mx, y: my, bx: cropBox.x, by: cropBox.y });
  }

  const onMouseMove = useCallback((e: MouseEvent) => {
    if (!dragging) return;
    const rect = getContainerRect();
    const mx = ((e.clientX - rect.left) / rect.width) * 100;
    const my = ((e.clientY - rect.top) / rect.height) * 100;
    const dx = mx - dragStart.x;
    const dy = my - dragStart.y;
    setCropBox(prev => ({
      ...prev,
      x: Math.max(0, Math.min(100 - prev.w, dragStart.bx + dx)),
      y: Math.max(0, Math.min(100 - prev.h, dragStart.by + dy)),
    }));
  }, [dragging, dragStart]);

  const onMouseUp = useCallback(() => setDragging(false), []);

  useEffect(() => {
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
    };
  }, [onMouseMove, onMouseUp]);

  function applyAspect(ratio: AspectRatio) {
    setAspectRatio(ratio);
    const ar = aspectRatios.find(a => a.value === ratio)?.ratio;
    if (ar !== null && ar !== undefined) {
      const w = 70;
      const h = w / ar;
      setCropBox(prev => ({ x: prev.x, y: prev.y, w, h: Math.min(h, 90) }));
    }
  }

  function cropAndDownload() {
    if (!imageSrc || !imgRef.current) return;
    const canvas = document.createElement("canvas");
    const img = imgRef.current;
    const natW = img.naturalWidth;
    const natH = img.naturalHeight;

    const cx = (cropBox.x / 100) * natW;
    const cy = (cropBox.y / 100) * natH;
    const cw = (cropBox.w / 100) * natW;
    const ch = (cropBox.h / 100) * natH;

    const outW = outputW ? parseInt(outputW) : Math.round(cw);
    const outH = outputH ? parseInt(outputH) : Math.round(ch);

    canvas.width = outW;
    canvas.height = outH;
    const ctx = canvas.getContext("2d")!;
    ctx.drawImage(img, cx, cy, cw, ch, 0, 0, outW, outH);

    canvas.toBlob(blob => {
      if (!blob) return;
      const a = document.createElement("a");
      a.href = URL.createObjectURL(blob);
      a.download = "cropped.png";
      a.click();
    }, "image/png");
  }

  return (
    <div className="space-y-5">
      {/* Upload */}
      <label className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl p-8 cursor-pointer hover:border-blue-500 transition-colors">
        <span className="text-3xl mb-2">🖼️</span>
        <span className="text-sm text-gray-600 dark:text-gray-400">Click to upload image</span>
        <input type="file" accept="image/*" onChange={handleFile} className="hidden" />
      </label>

      {imageSrc && (
        <>
          {/* Aspect ratio */}
          <div className="flex gap-2 flex-wrap">
            {aspectRatios.map(ar => (
              <button key={ar.value} onClick={() => applyAspect(ar.value)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${aspectRatio === ar.value ? "bg-blue-600 text-white" : "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300"}`}>
                {ar.label}
              </button>
            ))}
          </div>

          {/* Preview with crop overlay */}
          <div
            ref={containerRef}
            className="relative overflow-hidden rounded-xl border border-gray-200 dark:border-gray-600 select-none"
            style={{ userSelect: "none" }}
          >
            <img
              ref={imgRef}
              src={imageSrc}
              alt="Source"
              className="w-full h-auto block"
              onLoad={e => {
                const img = e.currentTarget;
                setImageSize({ w: img.naturalWidth, h: img.naturalHeight });
              }}
              draggable={false}
            />
            {/* Dark overlay */}
            <div className="absolute inset-0 bg-black/40 pointer-events-none" />
            {/* Crop area */}
            <div
              className="absolute border-2 border-white cursor-move"
              style={{
                left: `${cropBox.x}%`,
                top: `${cropBox.y}%`,
                width: `${cropBox.w}%`,
                height: `${cropBox.h}%`,
                background: "transparent",
                boxShadow: "0 0 0 9999px rgba(0,0,0,0.4)",
              }}
              onMouseDown={onMouseDown}
            >
              {/* Corner handles */}
              {["top-0 left-0", "top-0 right-0", "bottom-0 left-0", "bottom-0 right-0"].map(pos => (
                <div key={pos} className={`absolute w-3 h-3 bg-white rounded-sm ${pos} -translate-x-0.5 -translate-y-0.5`} />
              ))}
              {/* Crosshair */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-px h-full bg-white/50" />
                <div className="h-px w-full bg-white/50 absolute" />
              </div>
            </div>
          </div>

          {/* Output size */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Output Width (px)</label>
              <input type="number" value={outputW} onChange={e => setOutputW(e.target.value)} placeholder="Auto"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Output Height (px)</label>
              <input type="number" value={outputH} onChange={e => setOutputH(e.target.value)} placeholder="Auto"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
          </div>

          <div className="text-xs text-gray-500 dark:text-gray-400 text-center">
            Crop area: {Math.round(cropBox.w)}% × {Math.round(cropBox.h)}% of image |
            Original: {imageSize.w} × {imageSize.h}px
          </div>

          <button onClick={cropAndDownload}
            className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-colors">
            Crop & Download
          </button>
        </>
      )}
    </div>
  );
}
