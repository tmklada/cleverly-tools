"use client";
import { useState, useRef, useEffect } from "react";

interface Transform {
  scaleX: number;
  scaleY: number;
  rotation: number;
}

export default function ImageFlipper() {
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [transform, setTransform] = useState<Transform>({ scaleX: 1, scaleY: 1, rotation: 0 });
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imgRef = useRef<HTMLImageElement | null>(null);

  useEffect(() => {
    if (!imageSrc || !canvasRef.current) return;
    const img = new Image();
    img.src = imageSrc;
    img.onload = () => {
      imgRef.current = img;
      drawCanvas(img, transform);
    };
  }, [imageSrc]);

  useEffect(() => {
    if (imgRef.current) {
      drawCanvas(imgRef.current, transform);
    }
  }, [transform]);

  function drawCanvas(img: HTMLImageElement, t: Transform) {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const isRotated90 = Math.abs(t.rotation % 180) === 90;
    const outW = isRotated90 ? img.height : img.width;
    const outH = isRotated90 ? img.width : img.height;

    // Scale for display (max 500px wide)
    const scale = Math.min(1, 500 / outW);
    canvas.width = outW * scale;
    canvas.height = outH * scale;

    const ctx = canvas.getContext("2d")!;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.save();
    ctx.translate(canvas.width / 2, canvas.height / 2);
    ctx.rotate((t.rotation * Math.PI) / 180);
    ctx.scale(t.scaleX * scale, t.scaleY * scale);
    ctx.drawImage(img, -img.width / 2, -img.height / 2);
    ctx.restore();
  }

  function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setTransform({ scaleX: 1, scaleY: 1, rotation: 0 });
    setImageSrc(URL.createObjectURL(file));
  }

  function flipH() {
    setTransform(t => ({ ...t, scaleX: t.scaleX * -1 }));
  }

  function flipV() {
    setTransform(t => ({ ...t, scaleY: t.scaleY * -1 }));
  }

  function rotateCW() {
    setTransform(t => ({ ...t, rotation: (t.rotation + 90) % 360 }));
  }

  function rotateCCW() {
    setTransform(t => ({ ...t, rotation: (t.rotation - 90 + 360) % 360 }));
  }

  function rotate180() {
    setTransform(t => ({ ...t, rotation: (t.rotation + 180) % 360 }));
  }

  function reset() {
    setTransform({ scaleX: 1, scaleY: 1, rotation: 0 });
  }

  function download() {
    if (!imgRef.current) return;
    const canvas = document.createElement("canvas");
    const img = imgRef.current;
    const t = transform;

    const isRotated90 = Math.abs(t.rotation % 180) === 90;
    canvas.width = isRotated90 ? img.height : img.width;
    canvas.height = isRotated90 ? img.width : img.height;

    const ctx = canvas.getContext("2d")!;
    ctx.save();
    ctx.translate(canvas.width / 2, canvas.height / 2);
    ctx.rotate((t.rotation * Math.PI) / 180);
    ctx.scale(t.scaleX, t.scaleY);
    ctx.drawImage(img, -img.width / 2, -img.height / 2);
    ctx.restore();

    canvas.toBlob(blob => {
      if (!blob) return;
      const a = document.createElement("a");
      a.href = URL.createObjectURL(blob);
      a.download = "flipped.png";
      a.click();
    }, "image/png");
  }

  const actions = [
    { label: "Flip Horizontal", icon: "↔️", fn: flipH },
    { label: "Flip Vertical", icon: "↕️", fn: flipV },
    { label: "Rotate 90° CW", icon: "↻", fn: rotateCW },
    { label: "Rotate 90° CCW", icon: "↺", fn: rotateCCW },
    { label: "Rotate 180°", icon: "🔃", fn: rotate180 },
    { label: "Reset", icon: "✕", fn: reset },
  ];

  return (
    <div className="space-y-5">
      <label className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl p-8 cursor-pointer hover:border-blue-500 transition-colors">
        <span className="text-3xl mb-2">🖼️</span>
        <span className="text-sm text-gray-600 dark:text-gray-400">Click to upload image</span>
        <input type="file" accept="image/*" onChange={handleFile} className="hidden" />
      </label>

      {imageSrc && (
        <>
          {/* Canvas preview */}
          <div className="flex justify-center bg-gray-100 dark:bg-gray-800 rounded-xl p-4">
            <canvas ref={canvasRef} className="max-w-full rounded-lg shadow" />
          </div>

          {/* Action buttons */}
          <div className="grid grid-cols-3 gap-2">
            {actions.map(({ label, icon, fn }) => (
              <button key={label} onClick={fn}
                className="py-2.5 px-3 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-xl text-sm font-medium transition-colors flex items-center justify-center gap-1.5">
                <span>{icon}</span>
                <span className="hidden sm:inline">{label}</span>
              </button>
            ))}
          </div>

          <div className="text-xs text-center text-gray-500 dark:text-gray-400">
            Rotation: {transform.rotation}° | Scale: {transform.scaleX < 0 ? "H-flipped" : ""} {transform.scaleY < 0 ? "V-flipped" : ""} {transform.scaleX > 0 && transform.scaleY > 0 ? "Normal" : ""}
          </div>

          <button onClick={download}
            className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-colors">
            Download Result
          </button>
        </>
      )}
    </div>
  );
}
