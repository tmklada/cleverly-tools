"use client";
import { useState, useRef } from "react";

interface ImageMeta {
  name: string;
  size: string;
  type: string;
  width: number;
  height: number;
  lastModified: string;
}

function formatSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}

// Basic EXIF extraction: read JPEG marker
function extractBasicExif(buffer: ArrayBuffer): Record<string, string> {
  const view = new DataView(buffer);
  const tags: Record<string, string> = {};

  // Only parse JPEG (starts with FFD8)
  if (view.getUint16(0) !== 0xffd8) return tags;

  let offset = 2;
  while (offset < view.byteLength - 2) {
    const marker = view.getUint16(offset);
    offset += 2;
    if (marker === 0xffe1) {
      // APP1 (EXIF)
      const segLen = view.getUint16(offset);
      const exifHeader = String.fromCharCode(...new Uint8Array(buffer, offset + 2, 4));
      if (exifHeader === "Exif") {
        tags["Format"] = "JPEG with EXIF data";
        // Check byte order
        const tiffOffset = offset + 8;
        const littleEndian = view.getUint16(tiffOffset) === 0x4949;
        const read16 = (o: number) => littleEndian ? view.getUint16(tiffOffset + o, true) : view.getUint16(tiffOffset + o, false);
        const read32 = (o: number) => littleEndian ? view.getUint32(tiffOffset + o, true) : view.getUint32(tiffOffset + o, false);

        const ifdOffset = read32(4);
        const numEntries = read16(ifdOffset);

        const tagNames: Record<number, string> = {
          0x010F: "Camera Make",
          0x0110: "Camera Model",
          0x0112: "Orientation",
          0x011A: "X Resolution",
          0x011B: "Y Resolution",
          0x0132: "Date/Time",
          0x013B: "Artist",
          0x8769: "EXIF IFD",
          0x8825: "GPS Data",
        };

        for (let i = 0; i < numEntries && i < 30; i++) {
          const entryOffset = ifdOffset + 2 + i * 12;
          if (entryOffset + 12 > view.byteLength - tiffOffset) break;
          const tag = read16(entryOffset);
          const type = read16(entryOffset + 2);
          const count = read32(entryOffset + 4);
          const valueOffset = entryOffset + 8;

          if (tagNames[tag]) {
            if (type === 2) {
              // ASCII string
              const strOffset = count > 4 ? read32(valueOffset) : valueOffset;
              let str = "";
              for (let j = 0; j < Math.min(count - 1, 64); j++) {
                const ch = view.getUint8(tiffOffset + strOffset + j);
                if (ch === 0) break;
                str += String.fromCharCode(ch);
              }
              if (str) tags[tagNames[tag]] = str;
            } else if (type === 3 && tagNames[tag] === "Orientation") {
              const orientations: Record<number, string> = {
                1: "Normal", 2: "Flipped H", 3: "180°", 4: "Flipped V",
                5: "90° CW + Flipped", 6: "90° CW", 7: "90° CCW + Flipped", 8: "90° CCW",
              };
              const val = read16(valueOffset);
              tags[tagNames[tag]] = orientations[val] || String(val);
            } else {
              if (tag === 0x8825) tags["GPS"] = "Present";
            }
          }
        }
      }
      offset += segLen;
    } else if ((marker & 0xff00) === 0xff00) {
      if (offset + 2 > view.byteLength) break;
      offset += view.getUint16(offset);
    } else {
      break;
    }
  }

  if (!Object.keys(tags).length) tags["Format"] = "JPEG (no EXIF data found)";
  return tags;
}

export default function ImageMetadataReader() {
  const [meta, setMeta] = useState<ImageMeta | null>(null);
  const [exif, setExif] = useState<Record<string, string>>({});
  const [previewUrl, setPreviewUrl] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const url = URL.createObjectURL(file);
    setPreviewUrl(url);

    const img = new Image();
    img.onload = () => {
      setMeta({
        name: file.name,
        size: formatSize(file.size),
        type: file.type || "Unknown",
        width: img.naturalWidth,
        height: img.naturalHeight,
        lastModified: new Date(file.lastModified).toLocaleString("en-US"),
      });
    };
    img.src = url;

    if (file.type === "image/jpeg" || file.type === "image/jpg") {
      const reader = new FileReader();
      reader.onload = (ev) => {
        const buf = ev.target?.result as ArrayBuffer;
        setExif(extractBasicExif(buf));
      };
      reader.readAsArrayBuffer(file);
    } else {
      setExif({});
    }
  };

  const Row = ({ label, value }: { label: string; value: string }) => (
    <div className="flex justify-between items-center py-2 border-b border-gray-100 dark:border-gray-800 last:border-0">
      <span className="text-sm text-gray-500 dark:text-gray-400">{label}</span>
      <span className="text-sm font-medium text-gray-900 dark:text-white">{value}</span>
    </div>
  );

  return (
    <div className="max-w-xl mx-auto space-y-6">
      <div
        onClick={() => fileInputRef.current?.click()}
        className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border-2 border-dashed border-gray-300 dark:border-gray-600 hover:border-blue-400 dark:hover:border-blue-500 p-10 text-center cursor-pointer transition-colors"
      >
        <input ref={fileInputRef} type="file" accept="image/*" onChange={handleFile} className="hidden" />
        {previewUrl ? (
          <img src={previewUrl} alt="Preview" className="max-h-48 mx-auto rounded-lg object-contain mb-3" />
        ) : (
          <div>
            <p className="text-4xl mb-2">🖼️</p>
            <p className="text-gray-500 dark:text-gray-400 font-medium">Click to upload an image</p>
            <p className="text-sm text-gray-400 dark:text-gray-500 mt-1">Supports JPEG, PNG, WebP, GIF</p>
          </div>
        )}
      </div>

      {meta && (
        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <h3 className="font-bold text-gray-900 dark:text-white mb-4">File Information</h3>
          <Row label="File Name" value={meta.name} />
          <Row label="File Size" value={meta.size} />
          <Row label="File Type" value={meta.type} />
          <Row label="Dimensions" value={`${meta.width} × ${meta.height} px`} />
          <Row label="Megapixels" value={`${((meta.width * meta.height) / 1_000_000).toFixed(2)} MP`} />
          <Row label="Last Modified" value={meta.lastModified} />
        </div>
      )}

      {Object.keys(exif).length > 0 && (
        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <h3 className="font-bold text-gray-900 dark:text-white mb-4">EXIF Data</h3>
          {Object.entries(exif).map(([k, v]) => (
            <Row key={k} label={k} value={v} />
          ))}
        </div>
      )}
    </div>
  );
}
