import type { ToolGuide } from "@/types/guide";

const guide: ToolGuide = {
  slug: "image-metadata-reader",
  intro: [
    "Every image file carries more information than just its pixels. Basic file information — name, size, file type, pixel dimensions, and the file's own last-modified timestamp — is stored by the operating system, while JPEG files can additionally carry EXIF data embedded by the camera or phone that took the photo: make and model, orientation, resolution, a timestamp, and sometimes a flag indicating GPS coordinates were recorded. This image metadata reader extracts and displays both layers, entirely in your browser, so you can see exactly what a photo is quietly carrying before you share, upload, or publish it.",
    "It's worth being precise about what this tool actually reads, since 'EXIF reader' can sound like it exposes everything a professional photo-management tool would. This one reads a focused set of EXIF tags from JPEG files — camera make, camera model, orientation, X/Y resolution, a date/time field, artist, and whether GPS data is present — parsed directly from the JPEG's APP1 marker. It does not decode camera settings like aperture, ISO, or shutter speed, and it does not decode actual GPS coordinates, only whether a GPS tag exists in the file.",
    "For any file type other than JPEG — PNG, WebP, GIF — you'll still get the basic file information panel (dimensions, size, type, last modified), but no EXIF panel appears, since those formats don't carry EXIF data in the way this tool parses it. Nothing you upload is sent to a server; the file is read and parsed locally using the browser's File and DataView APIs.",
  ],
  sections: [
    {
      heading: "What Metadata Is Stored in a Photo (Dimensions, Format, File Size, EXIF)",
      paragraphs: [
        "Every image carries a baseline layer of information regardless of format: its pixel width and height, its file size on disk, its MIME type (image/jpeg, image/png, and so on), and a last-modified timestamp tracked by the file system itself. This tool reads all of that directly from the uploaded file object and calculates megapixels from the dimensions automatically.",
        "JPEG files can carry a second, deeper layer: EXIF (Exchangeable Image File Format) data embedded by the device that captured the photo, stored inside a dedicated APP1 segment near the start of the file. This is where camera make and model, shooting orientation, resolution settings, a timestamp, and sometimes an artist or copyright field live — information that isn't visible anywhere in the image itself but travels with the file wherever it's shared.",
        "PNG, WebP, and GIF files use their own separate metadata mechanisms (PNG text chunks, WebP EXIF/XMP chunks) that are less standardized and far less consistently populated by consumer devices than JPEG EXIF — this tool doesn't parse those formats' metadata, which is why only JPEGs produce an EXIF panel here.",
      ],
    },
    {
      heading: "What This Tool Can and Cannot Read From EXIF Data",
      paragraphs: [
        "The EXIF panel that appears for a JPEG lists whichever of these tags the file actually contains: Camera Make, Camera Model, Orientation (translated into plain language like '90° CW' rather than a raw numeric code), X and Y Resolution, a Date/Time field, Artist, and a GPS row that simply says 'Present' if the file's GPS Info tag pointer exists.",
        "What it deliberately does not extract: aperture, shutter speed, ISO, focal length, flash status, lens model, white balance, or any of the dozens of other tags a full EXIF library can surface — and, importantly, actual GPS coordinates. The GPS row is a yes/no signal, not decoded latitude and longitude, so treat 'GPS: Present' as a warning sign to investigate further with a dedicated EXIF tool, not as the full picture.",
      ],
      bullets: [
        "Reads: Camera Make, Camera Model, Orientation, X/Y Resolution, Date/Time, Artist, GPS presence (yes/no only).",
        "Does not read: aperture, shutter speed, ISO, focal length, flash, lens model, or decoded GPS coordinates.",
        "Only parses JPEG files — PNG, WebP, and GIF show file information only, with no EXIF panel.",
      ],
    },
    {
      heading: "Privacy Risk: Location Data Hidden in Your Photos",
      paragraphs: [
        "Most modern smartphones embed GPS coordinates in every photo taken with location services enabled, recording the exact latitude and longitude where the shot was captured directly inside the file's EXIF data. That location data travels invisibly with the image file — it isn't visible in the photo itself, but anyone who downloads the original file and opens it in EXIF-aware software can extract the precise coordinates, which has led to real privacy incidents from photos posted online with location data still attached.",
        "This reader flags whether that GPS tag exists in a JPEG, which is useful as a first check before sharing a sensitive photo, but since it doesn't decode the coordinates, don't treat a blank GPS row as proof there's nothing to worry about across all your files — if privacy matters, the safer default is to assume any unedited phone photo could carry location data and strip metadata before sharing rather than relying on a single check.",
      ],
    },
    {
      heading: "Last Modified vs Date Taken: Why Timestamps Can Be Misleading",
      paragraphs: [
        "The 'Last Modified' value in the file information panel comes from the operating system's file system record, which reflects the last time the file itself was written to disk — that can be the moment a photo was taken, but it's just as often the moment it was downloaded, copied, edited, or re-saved, all of which reset that timestamp without changing the actual content.",
        "The EXIF 'Date/Time' field is a step closer to the camera's own record, but it's still the general IFD0 timestamp rather than the dedicated DateTimeOriginal tag some full-featured EXIF viewers also expose — in practice most cameras set them to match, but treat both as approximate rather than legally verified capture times.",
      ],
    },
    {
      heading: "How to Remove Metadata Before Sharing a Photo",
      paragraphs: [
        "This tool only reads metadata — it doesn't strip it. But there's a practical side effect worth knowing: any of this site's other image tools that redraw a photo onto an HTML canvas and re-export it, including the image resizer, the grayscale converter, and the image flipper, discard EXIF data automatically as a byproduct, because a canvas only ever holds raw pixel color values, never the original file's metadata.",
        "So running a photo through a resize, a crop, a format conversion, or even a no-op grayscale-then-revert pass is a reliable, if indirect, way to produce a metadata-free copy before sharing it publicly — check this reader again afterward on the result to confirm the EXIF panel no longer appears.",
      ],
    },
  ],
  useCases: [
    { title: "Checking for hidden location data before posting", description: "Confirm whether a JPEG's GPS tag is present before sharing a photo publicly, as a first-pass privacy check ahead of posting online." },
    { title: "Verifying dimensions for upload requirements", description: "Check an image's exact pixel dimensions and megapixel count against a form, print service, or platform's stated size requirements." },
    { title: "Confirming file type and size before submission", description: "Check a photo's MIME type and file size to make sure it matches what an application form or upload field actually accepts." },
    { title: "Investigating why a photo displays sideways", description: "Read the EXIF Orientation tag to understand why a JPEG appears rotated in one app but not another." },
    { title: "Basic photo provenance checks", description: "Look up a JPEG's camera make and model or artist field as a first step in casual photo verification, ahead of a deeper forensic review if needed." },
    { title: "Confirming metadata removal worked", description: "Re-check a photo after resizing or converting it elsewhere on the site to confirm the EXIF panel is now empty." },
  ],
  mistakes: [
    { title: "Expecting full camera settings from any photo", description: "This tool doesn't read aperture, ISO, shutter speed, or focal length — only a focused set of tags like make, model, orientation, and timestamp." },
    { title: "Treating 'GPS: Present' or its absence as the final word on location privacy", description: "This reader only flags whether a GPS tag exists in a JPEG's EXIF, without decoding coordinates — don't rely on it alone for a sensitive privacy decision." },
    { title: "Assuming PNG or WebP files show the same metadata depth as JPEG", description: "Only JPEG files produce an EXIF panel here; PNG, WebP, and GIF uploads only show basic file information." },
    { title: "Reading the Date/Time field as the exact moment of capture", description: "This is the general IFD0 timestamp cameras set, which usually but not always matches actual capture time — treat it as approximate." },
    { title: "Assuming any re-save automatically strips metadata", description: "Metadata removal is a side effect of canvas-based tools re-encoding pixel data — a simple file copy, rename, or upload to some platforms may preserve EXIF data untouched." },
  ],
  tips: [
    "Check the GPS row on a JPEG before posting a sensitive photo publicly, and treat 'Present' as a reason to strip metadata rather than share as-is.",
    "Remember this tool only extracts EXIF from JPEG files — PNG, WebP, and GIF uploads show file information only.",
    "Run a photo through this site's resizer or grayscale tool and re-check it here to confirm EXIF data was removed.",
    "Don't rely on the Date/Time field alone for anything requiring a verified, exact capture timestamp.",
    "Use the megapixel and dimension readout to quickly confirm an image meets a platform's minimum resolution requirement.",
    "Remember a blank EXIF panel on a non-JPEG file doesn't mean the file has no metadata — it means this tool doesn't parse that format's metadata.",
  ],
  glossary: [
    { title: "EXIF", description: "Exchangeable Image File Format — a metadata standard, embedded mainly in JPEG files, that stores camera and shooting information alongside the image data." },
    { title: "APP1 segment", description: "The section near the start of a JPEG file where EXIF metadata is stored, identified by a specific marker this tool scans for directly." },
    { title: "GPS Info tag", description: "An EXIF tag that, when present, points to embedded latitude and longitude coordinates recording where a photo was taken." },
    { title: "IFD0 / DateTime", description: "A general-purpose EXIF timestamp tag many cameras set to the capture time, distinct from the more specific DateTimeOriginal tag some EXIF tools also read." },
    { title: "MIME type", description: "A label identifying a file's format, such as image/jpeg or image/png, read directly from the uploaded file object." },
    { title: "Metadata stripping", description: "Removing embedded metadata like EXIF from an image file, which happens automatically when an image is redrawn onto an HTML canvas and re-exported." },
  ],
};

export default guide;
