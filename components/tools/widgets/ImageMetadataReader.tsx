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

interface MetaRow {
  label: string;
  value: string;
}

interface MetaSection {
  title: string;
  rows: MetaRow[];
}

interface GpsInfo {
  lat: number;
  lng: number;
  altitude: string | null;
  timestamp: string | null;
}

interface ParseResult {
  format: string;
  sections: MetaSection[];
  gps: GpsInfo | null;
}

function formatSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}

/* ------------------------------------------------------------------ *
 * TIFF / EXIF primitives
 * ------------------------------------------------------------------ */

// Byte size of each TIFF field type, indexed by the type code.
const TYPE_SIZES: Record<number, number> = {
  1: 1, // BYTE
  2: 1, // ASCII
  3: 2, // SHORT
  4: 4, // LONG
  5: 8, // RATIONAL
  6: 1, // SBYTE
  7: 1, // UNDEFINED
  8: 2, // SSHORT
  9: 4, // SLONG
  10: 8, // SRATIONAL
  11: 4, // FLOAT
  12: 8, // DOUBLE
};

interface IfdEntry {
  tag: number;
  type: number;
  count: number;
  /** Absolute buffer offset of the entry's 4-byte value field. */
  valueField: number;
}

/** Read one IFD (directory) and return its entries. `ifdOffset` is TIFF-relative. */
function readIfd(view: DataView, tiffStart: number, le: boolean, ifdOffset: number): IfdEntry[] {
  const base = tiffStart + ifdOffset;
  if (base < 0 || base + 2 > view.byteLength) return [];
  const count = view.getUint16(base, le);
  const entries: IfdEntry[] = [];
  for (let i = 0; i < count && i < 250; i++) {
    const eo = base + 2 + i * 12;
    if (eo + 12 > view.byteLength) break;
    entries.push({
      tag: view.getUint16(eo, le),
      type: view.getUint16(eo + 2, le),
      count: view.getUint32(eo + 4, le),
      valueField: eo + 8,
    });
  }
  return entries;
}

/** Absolute buffer offset where an entry's data actually lives. */
function dataOffset(view: DataView, tiffStart: number, le: boolean, e: IfdEntry): number {
  const size = (TYPE_SIZES[e.type] ?? 0) * e.count;
  // Values of 4 bytes or fewer are stored inline in the value field itself.
  if (size <= 4) return e.valueField;
  return tiffStart + view.getUint32(e.valueField, le);
}

function asString(view: DataView, tiffStart: number, le: boolean, e: IfdEntry): string {
  const off = dataOffset(view, tiffStart, le, e);
  let s = "";
  for (let i = 0; i < Math.min(e.count, 512); i++) {
    if (off + i >= view.byteLength) break;
    const c = view.getUint8(off + i);
    if (c === 0) break;
    s += String.fromCharCode(c);
  }
  return s.replace(/\0/g, "").trim();
}

function asNumbers(view: DataView, tiffStart: number, le: boolean, e: IfdEntry): number[] {
  const size = TYPE_SIZES[e.type] ?? 0;
  if (!size) return [];
  const off = dataOffset(view, tiffStart, le, e);
  const out: number[] = [];
  for (let i = 0; i < Math.min(e.count, 64); i++) {
    const o = off + i * size;
    if (o + size > view.byteLength) break;
    switch (e.type) {
      case 1:
      case 7:
        out.push(view.getUint8(o));
        break;
      case 3:
        out.push(view.getUint16(o, le));
        break;
      case 4:
        out.push(view.getUint32(o, le));
        break;
      case 6:
        out.push(view.getInt8(o));
        break;
      case 8:
        out.push(view.getInt16(o, le));
        break;
      case 9:
        out.push(view.getInt32(o, le));
        break;
      case 11:
        out.push(view.getFloat32(o, le));
        break;
      case 12:
        out.push(view.getFloat64(o, le));
        break;
      case 5: {
        const n = view.getUint32(o, le);
        const d = view.getUint32(o + 4, le);
        out.push(d === 0 ? 0 : n / d);
        break;
      }
      case 10: {
        const n = view.getInt32(o, le);
        const d = view.getInt32(o + 4, le);
        out.push(d === 0 ? 0 : n / d);
        break;
      }
      default:
        break;
    }
  }
  return out;
}

/* ------------------------------------------------------------------ *
 * Value formatting
 * ------------------------------------------------------------------ */

function trimNum(n: number, digits = 2): string {
  return parseFloat(n.toFixed(digits)).toString();
}

function formatExposure(seconds: number): string {
  if (!isFinite(seconds) || seconds <= 0) return "—";
  if (seconds >= 1) return `${trimNum(seconds)} s`;
  return `1/${Math.round(1 / seconds)} s`;
}

function formatExifDate(raw: string): string {
  // EXIF stores "YYYY:MM:DD HH:MM:SS"
  const m = raw.match(/^(\d{4}):(\d{2}):(\d{2})[ T](\d{2}):(\d{2}):(\d{2})/);
  if (!m) return raw;
  const [, y, mo, d, h, mi, s] = m;
  return `${y}-${mo}-${d} ${h}:${mi}:${s}`;
}

const ORIENTATIONS: Record<number, string> = {
  1: "Normal",
  2: "Flipped horizontally",
  3: "Rotated 180°",
  4: "Flipped vertically",
  5: "Rotated 90° CW + flipped",
  6: "Rotated 90° CW",
  7: "Rotated 90° CCW + flipped",
  8: "Rotated 90° CCW",
};

const EXPOSURE_PROGRAMS: Record<number, string> = {
  0: "Not defined",
  1: "Manual",
  2: "Program AE",
  3: "Aperture priority",
  4: "Shutter priority",
  5: "Creative (slow speed)",
  6: "Action (high speed)",
  7: "Portrait",
  8: "Landscape",
};

const METERING_MODES: Record<number, string> = {
  0: "Unknown",
  1: "Average",
  2: "Center-weighted average",
  3: "Spot",
  4: "Multi-spot",
  5: "Multi-segment",
  6: "Partial",
};

const WHITE_BALANCE: Record<number, string> = { 0: "Auto", 1: "Manual" };
const EXPOSURE_MODES: Record<number, string> = { 0: "Auto", 1: "Manual", 2: "Auto bracket" };

function describeFlash(v: number): string {
  if (!(v & 0x01)) return "Did not fire";
  const parts = ["Fired"];
  if ((v & 0x18) === 0x18) parts.push("auto");
  else if ((v & 0x18) === 0x08) parts.push("forced");
  if (v & 0x40) parts.push("red-eye reduction");
  return parts.join(", ");
}

/* ------------------------------------------------------------------ *
 * GPS IFD
 * ------------------------------------------------------------------ */

/** Convert degrees/minutes/seconds + N/S/E/W reference into signed decimal degrees. */
function dmsToDecimal(dms: number[], ref: string): number | null {
  if (dms.length < 1) return null;
  const deg = dms[0] ?? 0;
  const min = dms[1] ?? 0;
  const sec = dms[2] ?? 0;
  let dec = deg + min / 60 + sec / 3600;
  if (!isFinite(dec)) return null;
  const r = ref.trim().toUpperCase().charAt(0);
  if (r === "S" || r === "W") dec = -dec;
  return dec;
}

function parseGps(view: DataView, tiffStart: number, le: boolean, gpsIfdOffset: number): GpsInfo | null {
  const entries = readIfd(view, tiffStart, le, gpsIfdOffset);
  if (!entries.length) return null;

  let latRef = "";
  let lngRef = "";
  let latDms: number[] = [];
  let lngDms: number[] = [];
  let altRef = 0;
  let alt: number | null = null;
  let timeParts: number[] = [];
  let dateStamp = "";

  for (const e of entries) {
    switch (e.tag) {
      case 0x0001:
        latRef = asString(view, tiffStart, le, e);
        break;
      case 0x0002:
        latDms = asNumbers(view, tiffStart, le, e);
        break;
      case 0x0003:
        lngRef = asString(view, tiffStart, le, e);
        break;
      case 0x0004:
        lngDms = asNumbers(view, tiffStart, le, e);
        break;
      case 0x0005:
        altRef = asNumbers(view, tiffStart, le, e)[0] ?? 0;
        break;
      case 0x0006:
        alt = asNumbers(view, tiffStart, le, e)[0] ?? null;
        break;
      case 0x0007:
        timeParts = asNumbers(view, tiffStart, le, e);
        break;
      case 0x001d:
        dateStamp = asString(view, tiffStart, le, e);
        break;
      default:
        break;
    }
  }

  const lat = dmsToDecimal(latDms, latRef || "N");
  const lng = dmsToDecimal(lngDms, lngRef || "E");
  if (lat === null || lng === null) return null;
  if (Math.abs(lat) > 90 || Math.abs(lng) > 180) return null;
  if (lat === 0 && lng === 0) return null;

  let altitude: string | null = null;
  if (alt !== null && isFinite(alt)) {
    const signed = altRef === 1 ? -alt : alt;
    altitude = `${trimNum(signed, 1)} m ${signed < 0 ? "below" : "above"} sea level`;
  }

  let timestamp: string | null = null;
  if (timeParts.length >= 3) {
    const pad = (n: number) => String(Math.floor(n)).padStart(2, "0");
    timestamp = `${pad(timeParts[0])}:${pad(timeParts[1])}:${pad(timeParts[2])} UTC`;
    if (dateStamp) timestamp = `${dateStamp.replace(/:/g, "-")} ${timestamp}`;
  }

  return { lat, lng, altitude, timestamp };
}

/* ------------------------------------------------------------------ *
 * Full TIFF block (used by JPEG APP1 and PNG eXIf)
 * ------------------------------------------------------------------ */

function parseTiffBlock(view: DataView, tiffStart: number): { sections: MetaSection[]; gps: GpsInfo | null } {
  const empty = { sections: [] as MetaSection[], gps: null };
  if (tiffStart + 8 > view.byteLength) return empty;

  const byteOrder = view.getUint16(tiffStart);
  let le: boolean;
  if (byteOrder === 0x4949) le = true; // "II" — little-endian (Intel)
  else if (byteOrder === 0x4d4d) le = false; // "MM" — big-endian (Motorola)
  else return empty;

  if (view.getUint16(tiffStart + 2, le) !== 0x002a) return empty;
  const ifd0Offset = view.getUint32(tiffStart + 4, le);
  const ifd0 = readIfd(view, tiffStart, le, ifd0Offset);
  if (!ifd0.length) return empty;

  const camera: MetaRow[] = [];
  const image: MetaRow[] = [];
  const settings: MetaRow[] = [];
  let exifIfdOffset = 0;
  let gpsIfdOffset = 0;
  let resolutionUnit = 2;
  let xRes: number | null = null;
  let yRes: number | null = null;

  for (const e of ifd0) {
    switch (e.tag) {
      case 0x010f:
        push(camera, "Camera Make", asString(view, tiffStart, le, e));
        break;
      case 0x0110:
        push(camera, "Camera Model", asString(view, tiffStart, le, e));
        break;
      case 0x0131:
        push(camera, "Software", asString(view, tiffStart, le, e));
        break;
      case 0x013b:
        push(camera, "Artist", asString(view, tiffStart, le, e));
        break;
      case 0x8298:
        push(camera, "Copyright", asString(view, tiffStart, le, e));
        break;
      case 0x010e:
        push(image, "Description", asString(view, tiffStart, le, e));
        break;
      case 0x0112: {
        const v = asNumbers(view, tiffStart, le, e)[0];
        if (v !== undefined) push(image, "Orientation", ORIENTATIONS[v] ?? String(v));
        break;
      }
      case 0x011a:
        xRes = asNumbers(view, tiffStart, le, e)[0] ?? null;
        break;
      case 0x011b:
        yRes = asNumbers(view, tiffStart, le, e)[0] ?? null;
        break;
      case 0x0128:
        resolutionUnit = asNumbers(view, tiffStart, le, e)[0] ?? 2;
        break;
      case 0x0132:
        push(image, "File Date/Time", formatExifDate(asString(view, tiffStart, le, e)));
        break;
      case 0x8769:
        exifIfdOffset = asNumbers(view, tiffStart, le, e)[0] ?? 0;
        break;
      case 0x8825:
        gpsIfdOffset = asNumbers(view, tiffStart, le, e)[0] ?? 0;
        break;
      default:
        break;
    }
  }

  if (xRes !== null) {
    const unit = resolutionUnit === 3 ? "dpcm" : "dpi";
    const res = yRes !== null && yRes !== xRes ? `${trimNum(xRes)} × ${trimNum(yRes)} ${unit}` : `${trimNum(xRes)} ${unit}`;
    push(image, "Resolution", res);
  }

  if (exifIfdOffset > 0) {
    const sub = readIfd(view, tiffStart, le, exifIfdOffset);
    for (const e of sub) {
      switch (e.tag) {
        case 0x829a: {
          const v = asNumbers(view, tiffStart, le, e)[0];
          if (v !== undefined) push(settings, "Exposure Time", formatExposure(v));
          break;
        }
        case 0x829d: {
          const v = asNumbers(view, tiffStart, le, e)[0];
          if (v !== undefined && v > 0) push(settings, "Aperture", `f/${trimNum(v, 1)}`);
          break;
        }
        case 0x8827: {
          const v = asNumbers(view, tiffStart, le, e)[0];
          if (v !== undefined) push(settings, "ISO", `ISO ${Math.round(v)}`);
          break;
        }
        case 0x920a: {
          const v = asNumbers(view, tiffStart, le, e)[0];
          if (v !== undefined && v > 0) push(settings, "Focal Length", `${trimNum(v, 1)} mm`);
          break;
        }
        case 0xa405: {
          const v = asNumbers(view, tiffStart, le, e)[0];
          if (v) push(settings, "Focal Length (35mm eq.)", `${Math.round(v)} mm`);
          break;
        }
        case 0x9204: {
          const v = asNumbers(view, tiffStart, le, e)[0];
          if (v !== undefined) push(settings, "Exposure Bias", `${v > 0 ? "+" : ""}${trimNum(v, 2)} EV`);
          break;
        }
        case 0x8822: {
          const v = asNumbers(view, tiffStart, le, e)[0];
          if (v !== undefined) push(settings, "Exposure Program", EXPOSURE_PROGRAMS[v] ?? String(v));
          break;
        }
        case 0xa402: {
          const v = asNumbers(view, tiffStart, le, e)[0];
          if (v !== undefined) push(settings, "Exposure Mode", EXPOSURE_MODES[v] ?? String(v));
          break;
        }
        case 0x9207: {
          const v = asNumbers(view, tiffStart, le, e)[0];
          if (v !== undefined) push(settings, "Metering Mode", METERING_MODES[v] ?? String(v));
          break;
        }
        case 0x9209: {
          const v = asNumbers(view, tiffStart, le, e)[0];
          if (v !== undefined) push(settings, "Flash", describeFlash(v));
          break;
        }
        case 0xa403: {
          const v = asNumbers(view, tiffStart, le, e)[0];
          if (v !== undefined) push(settings, "White Balance", WHITE_BALANCE[v] ?? String(v));
          break;
        }
        case 0xa434:
          push(camera, "Lens Model", asString(view, tiffStart, le, e));
          break;
        case 0xa433:
          push(camera, "Lens Make", asString(view, tiffStart, le, e));
          break;
        case 0x9003:
          push(image, "Date Taken (Original)", formatExifDate(asString(view, tiffStart, le, e)));
          break;
        case 0x9004:
          push(image, "Date Digitized", formatExifDate(asString(view, tiffStart, le, e)));
          break;
        case 0xa002: {
          const v = asNumbers(view, tiffStart, le, e)[0];
          if (v) push(image, "EXIF Width", `${v} px`);
          break;
        }
        case 0xa003: {
          const v = asNumbers(view, tiffStart, le, e)[0];
          if (v) push(image, "EXIF Height", `${v} px`);
          break;
        }
        default:
          break;
      }
    }
  }

  const gps = gpsIfdOffset > 0 ? parseGps(view, tiffStart, le, gpsIfdOffset) : null;

  const sections: MetaSection[] = [];
  if (camera.length) sections.push({ title: "Camera & Device", rows: camera });
  if (settings.length) sections.push({ title: "Camera Settings", rows: settings });
  if (image.length) sections.push({ title: "Image & Timestamps", rows: image });

  return { sections, gps };
}

function push(rows: MetaRow[], label: string, value: string) {
  if (!value || value === "—") return;
  if (rows.some((r) => r.label === label)) return;
  rows.push({ label, value });
}

/* ------------------------------------------------------------------ *
 * JPEG
 * ------------------------------------------------------------------ */

/** Walk JPEG markers and return the absolute offset of the TIFF header inside APP1/Exif. */
function findJpegTiffStart(view: DataView): number | null {
  if (view.byteLength < 4 || view.getUint16(0) !== 0xffd8) return null;
  let off = 2;
  while (off + 4 <= view.byteLength) {
    if (view.getUint8(off) !== 0xff) {
      off++;
      continue;
    }
    const marker = view.getUint8(off + 1);
    if (marker === 0xff) {
      off++;
      continue;
    }
    // Standalone markers carry no length field.
    if (marker === 0x01 || (marker >= 0xd0 && marker <= 0xd9)) {
      off += 2;
      continue;
    }
    if (marker === 0xda) break; // start of scan — no more metadata segments
    const len = view.getUint16(off + 2);
    if (len < 2) break;
    if (marker === 0xe1 && off + 10 <= view.byteLength) {
      let header = "";
      for (let i = 0; i < 4; i++) header += String.fromCharCode(view.getUint8(off + 4 + i));
      if (header === "Exif") return off + 10; // skip "Exif\0\0"
    }
    off += 2 + len;
  }
  return null;
}

function parseJpeg(buffer: ArrayBuffer): ParseResult {
  const view = new DataView(buffer);
  const tiffStart = findJpegTiffStart(view);
  if (tiffStart === null) {
    return { format: "JPEG (no EXIF segment)", sections: [], gps: null };
  }
  const { sections, gps } = parseTiffBlock(view, tiffStart);
  return { format: "JPEG with EXIF", sections, gps };
}

/* ------------------------------------------------------------------ *
 * PNG
 * ------------------------------------------------------------------ */

const PNG_SIGNATURE = [0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a];

const PNG_COLOR_TYPES: Record<number, string> = {
  0: "Grayscale",
  2: "Truecolor (RGB)",
  3: "Indexed color (palette)",
  4: "Grayscale + alpha",
  6: "Truecolor + alpha (RGBA)",
};

function isPng(view: DataView): boolean {
  if (view.byteLength < 8) return false;
  return PNG_SIGNATURE.every((b, i) => view.getUint8(i) === b);
}

function latin1(view: DataView, start: number, end: number): string {
  let s = "";
  for (let i = start; i < end && i < view.byteLength; i++) s += String.fromCharCode(view.getUint8(i));
  return s;
}

function parsePng(buffer: ArrayBuffer): ParseResult {
  const view = new DataView(buffer);
  const header: MetaRow[] = [];
  const text: MetaRow[] = [];
  let gps: GpsInfo | null = null;
  let exifSections: MetaSection[] = [];

  let off = 8;
  while (off + 8 <= view.byteLength) {
    const length = view.getUint32(off);
    const type = latin1(view, off + 4, off + 8);
    const dataStart = off + 8;
    if (length > view.byteLength || dataStart + length > view.byteLength) break;

    if (type === "IHDR" && length >= 13) {
      const w = view.getUint32(dataStart);
      const h = view.getUint32(dataStart + 4);
      const bitDepth = view.getUint8(dataStart + 8);
      const colorType = view.getUint8(dataStart + 9);
      const interlace = view.getUint8(dataStart + 12);
      push(header, "Dimensions (IHDR)", `${w} × ${h} px`);
      push(header, "Bit Depth", `${bitDepth}-bit per channel`);
      push(header, "Color Type", PNG_COLOR_TYPES[colorType] ?? `Type ${colorType}`);
      push(header, "Interlaced", interlace === 1 ? "Yes (Adam7)" : "No");
    } else if (type === "pHYs" && length >= 9) {
      const px = view.getUint32(dataStart);
      const py = view.getUint32(dataStart + 4);
      const unit = view.getUint8(dataStart + 8);
      if (unit === 1) {
        push(header, "Physical Resolution", `${Math.round(px * 0.0254)} × ${Math.round(py * 0.0254)} dpi`);
      } else {
        push(header, "Pixel Aspect Ratio", `${px}:${py}`);
      }
    } else if (type === "tIME" && length >= 7) {
      const y = view.getUint16(dataStart);
      const pad = (n: number) => String(n).padStart(2, "0");
      push(
        header,
        "Last Modified (tIME)",
        `${y}-${pad(view.getUint8(dataStart + 2))}-${pad(view.getUint8(dataStart + 3))} ` +
          `${pad(view.getUint8(dataStart + 4))}:${pad(view.getUint8(dataStart + 5))}:${pad(view.getUint8(dataStart + 6))}`,
      );
    } else if (type === "tEXt") {
      const raw = latin1(view, dataStart, dataStart + length);
      const sep = raw.indexOf("\0");
      if (sep > 0) push(text, raw.slice(0, sep), raw.slice(sep + 1).slice(0, 300).trim());
    } else if (type === "iTXt") {
      // keyword \0 compressionFlag compressionMethod languageTag \0 translatedKeyword \0 text
      const bytes = new Uint8Array(buffer, dataStart, length);
      let p = 0;
      while (p < bytes.length && bytes[p] !== 0) p++;
      const keyword = latin1(view, dataStart, dataStart + p);
      const compressionFlag = bytes[p + 1] ?? 0;
      let q = p + 3;
      while (q < bytes.length && bytes[q] !== 0) q++; // language tag
      q++;
      while (q < bytes.length && bytes[q] !== 0) q++; // translated keyword
      q++;
      if (compressionFlag === 0 && q < bytes.length) {
        try {
          const value = new TextDecoder("utf-8").decode(bytes.subarray(q)).trim();
          if (value) push(text, keyword, value.slice(0, 300));
        } catch {
          /* ignore undecodable text chunk */
        }
      }
    } else if (type === "zTXt") {
      const raw = latin1(view, dataStart, dataStart + Math.min(length, 80));
      const sep = raw.indexOf("\0");
      if (sep > 0) push(text, raw.slice(0, sep), "(compressed text chunk)");
    } else if (type === "eXIf" && length > 8) {
      // Some PNGs embed a full TIFF/EXIF block — reuse the JPEG parser.
      const parsed = parseTiffBlock(view, dataStart);
      exifSections = parsed.sections;
      gps = parsed.gps;
    } else if (type === "IEND") {
      break;
    }

    off = dataStart + length + 4; // skip data + CRC
  }

  const sections: MetaSection[] = [];
  if (header.length) sections.push({ title: "PNG Header (IHDR)", rows: header });
  sections.push(...exifSections);
  if (text.length) sections.push({ title: "Embedded Text Chunks", rows: text });

  return { format: "PNG", sections, gps };
}

/* ------------------------------------------------------------------ *
 * Dispatcher
 * ------------------------------------------------------------------ */

function parseImage(buffer: ArrayBuffer): ParseResult {
  const view = new DataView(buffer);
  if (view.byteLength >= 4 && view.getUint16(0) === 0xffd8) return parseJpeg(buffer);
  if (isPng(view)) return parsePng(buffer);

  if (view.byteLength >= 12) {
    const riff = latin1(view, 0, 4);
    const webp = latin1(view, 8, 12);
    if (riff === "RIFF" && webp === "WEBP") return { format: "WebP", sections: [], gps: null };
    const gif = latin1(view, 0, 3);
    if (gif === "GIF") return { format: "GIF", sections: [], gps: null };
  }
  return { format: "Unknown format", sections: [], gps: null };
}

/* ------------------------------------------------------------------ *
 * Component
 * ------------------------------------------------------------------ */

export default function ImageMetadataReader() {
  const [meta, setMeta] = useState<ImageMeta | null>(null);
  const [parsed, setParsed] = useState<ParseResult | null>(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const [copied, setCopied] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setCopied(false);
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

    const reader = new FileReader();
    reader.onload = (ev) => {
      const buf = ev.target?.result as ArrayBuffer | null;
      if (!buf) {
        setParsed(null);
        return;
      }
      try {
        setParsed(parseImage(buf));
      } catch {
        setParsed({ format: "Unreadable", sections: [], gps: null });
      }
    };
    reader.readAsArrayBuffer(file);
  };

  const gps = parsed?.gps ?? null;
  const coordString = gps ? `${gps.lat.toFixed(6)}, ${gps.lng.toFixed(6)}` : "";

  function copyCoords() {
    if (!coordString) return;
    navigator.clipboard.writeText(coordString);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  const Row = ({ label, value }: { label: string; value: string }) => (
    <div className="flex justify-between items-start gap-4 py-2 border-b border-gray-100 dark:border-gray-800 last:border-0">
      <span className="text-sm text-gray-500 dark:text-gray-400 shrink-0">{label}</span>
      <span className="text-sm font-medium text-gray-900 dark:text-white text-right break-words">{value}</span>
    </div>
  );

  const hasMetadata = !!parsed && (parsed.sections.length > 0 || !!parsed.gps);

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
            <p className="text-sm text-gray-400 dark:text-gray-500 mt-1">
              Full EXIF + GPS for JPEG, header and text chunks for PNG
            </p>
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
          {parsed && <Row label="Detected Format" value={parsed.format} />}
        </div>
      )}

      {gps && (
        <div className="bg-amber-50 dark:bg-amber-900/20 rounded-2xl border border-amber-300 dark:border-amber-700 p-6">
          <div className="flex items-start gap-3 mb-4">
            <span className="text-2xl leading-none">📍</span>
            <div>
              <h3 className="font-bold text-amber-900 dark:text-amber-200">GPS Location Found</h3>
              <p className="text-sm text-amber-800 dark:text-amber-300 mt-1">
                This photo records exactly where it was taken. Anyone you send the original file to can read these
                coordinates — the location is not visible in the picture itself, but it travels with the file.
              </p>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-900 rounded-xl p-4 space-y-1">
            <Row label="Latitude" value={`${gps.lat.toFixed(6)}° (${gps.lat >= 0 ? "N" : "S"})`} />
            <Row label="Longitude" value={`${gps.lng.toFixed(6)}° (${gps.lng >= 0 ? "E" : "W"})`} />
            {gps.altitude && <Row label="Altitude" value={gps.altitude} />}
            {gps.timestamp && <Row label="GPS Timestamp" value={gps.timestamp} />}
          </div>

          <div className="mt-4 flex flex-wrap items-center gap-2">
            <code className="flex-1 min-w-[12rem] text-sm font-mono bg-white dark:bg-gray-900 border border-amber-200 dark:border-amber-800 rounded-lg px-3 py-2 text-gray-900 dark:text-white">
              {coordString}
            </code>
            <button
              onClick={copyCoords}
              className="px-4 py-2 text-sm font-medium bg-amber-600 hover:bg-amber-700 text-white rounded-lg transition-colors"
            >
              {copied ? "Copied!" : "Copy"}
            </button>
            <a
              href={`https://www.google.com/maps/search/?api=1&query=${gps.lat.toFixed(6)},${gps.lng.toFixed(6)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 text-sm font-medium bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
            >
              Open in Google Maps
            </a>
          </div>

          <p className="text-xs text-amber-800 dark:text-amber-300 mt-4">
            To remove it: re-save the photo through any tool that redraws the pixels (a resizer, converter, or a plain
            screenshot of the image). Canvas-based re-encoding keeps only pixel data, so the GPS tag is dropped.
          </p>
        </div>
      )}

      {parsed && parsed.sections.map((section) => (
        <div
          key={section.title}
          className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-6"
        >
          <h3 className="font-bold text-gray-900 dark:text-white mb-4">{section.title}</h3>
          {section.rows.map((r) => (
            <Row key={r.label} label={r.label} value={r.value} />
          ))}
        </div>
      ))}

      {parsed && !hasMetadata && (
        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <h3 className="font-bold text-gray-900 dark:text-white mb-2">No embedded metadata</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {parsed.format === "JPEG (no EXIF segment)" &&
              "This JPEG has no EXIF segment. It was most likely re-saved, screenshotted, or exported by an app that strips metadata — which also means no camera details or GPS location are left in it."}
            {parsed.format === "PNG" &&
              "This PNG carries no readable text chunks or EXIF block. PNGs from screenshots and canvas exports are usually metadata-free."}
            {(parsed.format === "WebP" || parsed.format === "GIF") &&
              `${parsed.format} metadata containers are not parsed by this tool — only the file information above is available for this format.`}
            {parsed.format === "Unknown format" &&
              "The file's signature didn't match JPEG, PNG, WebP, or GIF, so no metadata could be read."}
            {parsed.format === "Unreadable" && "The file could not be parsed as an image."}
            {parsed.format === "JPEG with EXIF" &&
              "An EXIF segment exists but contains no readable tags."}
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-500 mt-3">
            Nothing is uploaded — the file is parsed entirely in your browser.
          </p>
        </div>
      )}
    </div>
  );
}
