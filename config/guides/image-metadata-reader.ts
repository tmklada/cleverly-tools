import type { ToolGuide } from "@/types/guide";

const guide: ToolGuide = {
  slug: "image-metadata-reader",
  intro: [
    "Every image file carries more information than just its pixels. Basic file information — name, size, file type, pixel dimensions, and the file's own last-modified timestamp — is stored by the operating system, while JPEG files can additionally carry EXIF data embedded by the camera or phone that took the photo: make and model, lens, exposure settings, orientation, resolution, timestamps, and very often the GPS coordinates of the exact spot where the shutter fired. This image metadata reader extracts and displays both layers, entirely in your browser, so you can see exactly what a photo is quietly carrying before you share, upload, or publish it.",
    "It reads a full working set of EXIF tags from the JPEG's APP1 marker: camera make and model, lens make and model, software, artist and copyright, orientation, resolution, exposure time, aperture, ISO, focal length and 35mm equivalent, exposure bias, exposure program and mode, metering mode, flash, white balance, the general file date/time, and the dedicated DateTimeOriginal capture timestamp. Rationals are formatted the way photographers read them — an exposure shows as 1/250 s, an aperture as f/2.8 — rather than as raw fractions.",
    "Crucially, it parses the GPS IFD properly. The GPS tags store latitude and longitude as three rationals (degrees, minutes, seconds) alongside a separate N/S/E/W reference tag, so the tool converts that to signed decimal degrees, applying a minus sign for south and west, and handles both little-endian (Intel, 'II') and big-endian (Motorola, 'MM') TIFF headers. You get the coordinates, altitude and GPS timestamp when present, a copyable 'lat, lng' string, and a direct link to that point on Google Maps.",
    "PNG files are parsed too, via their own chunk structure: dimensions, bit depth, color type and interlacing from the IHDR chunk, physical resolution from pHYs, a tIME timestamp, any tEXt and iTXt text chunks (which is where editors like Photoshop leave their fingerprints), and an embedded eXIf block if the file has one. WebP and GIF files show file information only. When a file genuinely has no metadata to display, the tool says so and explains why, instead of showing an empty table. Nothing you upload is sent to a server; the file is read and parsed locally using the browser's File and DataView APIs.",
  ],
  sections: [
    {
      heading: "What Metadata Is Stored in a Photo (Dimensions, Format, File Size, EXIF)",
      paragraphs: [
        "Every image carries a baseline layer of information regardless of format: its pixel width and height, its file size on disk, its MIME type (image/jpeg, image/png, and so on), and a last-modified timestamp tracked by the file system itself. This tool reads all of that directly from the uploaded file object and calculates megapixels from the dimensions automatically.",
        "JPEG files can carry a second, deeper layer: EXIF (Exchangeable Image File Format) data embedded by the device that captured the photo, stored inside a dedicated APP1 segment near the start of the file. This is where camera make and model, lens, exposure settings, shooting orientation, resolution settings, timestamps, GPS coordinates, and sometimes an artist or copyright field live — information that isn't visible anywhere in the image itself but travels with the file wherever it's shared.",
        "PNG files use a different mechanism entirely — a sequence of named chunks rather than a TIFF directory — so this tool parses them separately: IHDR for dimensions, bit depth, color type and interlacing, pHYs for physical resolution, tIME for a modification timestamp, and tEXt/iTXt for free-form text like Software, Author, Description, or a generator's watermark. A PNG can also carry a full eXIf chunk, which is decoded with the same EXIF parser used for JPEGs. WebP and GIF metadata containers aren't parsed, so those formats show file information only.",
      ],
    },
    {
      heading: "What This Tool Reads From EXIF Data",
      paragraphs: [
        "The metadata panels that appear for a JPEG are grouped into Camera & Device (make, model, lens make and model, software, artist, copyright), Camera Settings (exposure time, aperture, ISO, focal length and 35mm equivalent, exposure bias, exposure program and mode, metering mode, flash, white balance), and Image & Timestamps (description, orientation translated into plain language like 'Rotated 90° CW' rather than a raw numeric code, resolution, the general file date/time, DateTimeOriginal, and the date the file was digitized). Only rows the file actually contains are shown, so a phone snapshot and a DSLR raw export produce different-looking panels.",
        "GPS gets its own highlighted panel because it's the tag with real-world consequences. The tool decodes the GPS IFD into decimal latitude and longitude to six decimal places (roughly 10 cm of precision), reads the altitude and GPS timestamp when they're recorded, and gives you the coordinate pair to copy plus a Google Maps link so you can see the location rather than guess at it.",
      ],
      bullets: [
        "Camera & lens: make, model, lens make and model, software, artist, copyright.",
        "Settings: exposure time (1/250 s), aperture (f/2.8), ISO, focal length, 35mm equivalent, exposure bias, program, metering, flash, white balance.",
        "Timestamps: file Date/Time, DateTimeOriginal (when the shutter fired), and Date Digitized.",
        "GPS: decoded decimal latitude and longitude, altitude, GPS timestamp, copy button, and a Google Maps link.",
        "PNG: IHDR dimensions, bit depth, color type, interlacing, pHYs resolution, tIME, and tEXt/iTXt text chunks.",
        "WebP and GIF show file information only — their metadata containers aren't parsed.",
      ],
    },
    {
      heading: "Privacy Risk: Location Data Hidden in Your Photos",
      paragraphs: [
        "Most modern smartphones embed GPS coordinates in every photo taken with location services enabled, recording the exact latitude and longitude where the shot was captured directly inside the file's EXIF data. That location data travels invisibly with the image file — it isn't visible in the photo itself, but anyone who downloads the original file and opens it in EXIF-aware software can extract the precise coordinates, which has led to real privacy incidents from photos posted online with location data still attached.",
        "This reader decodes those coordinates and shows you exactly what someone else would see: the decimal latitude and longitude, the altitude, and a map link to the spot. Seeing your own home, your child's school, or a client's office drop onto a map from a photo you were about to post is the fastest way to understand why this matters. Note that a missing GPS panel means this particular file has no readable GPS tags — it isn't a guarantee about your other files, so if privacy matters, assume any unedited phone photo could carry location data and check or strip each one before sharing.",
      ],
    },
    {
      heading: "Last Modified vs Date Taken: Why Timestamps Can Be Misleading",
      paragraphs: [
        "The 'Last Modified' value in the file information panel comes from the operating system's file system record, which reflects the last time the file itself was written to disk — that can be the moment a photo was taken, but it's just as often the moment it was downloaded, copied, edited, or re-saved, all of which reset that timestamp without changing the actual content.",
        "The EXIF fields are a step closer to the camera's own record. This tool shows both the general IFD0 'File Date/Time' and the dedicated 'Date Taken (Original)' tag (DateTimeOriginal) — the one the camera writes at the moment the shutter fires — plus 'Date Digitized' where present. When an editing app re-saves a photo it often updates the IFD0 timestamp while leaving DateTimeOriginal untouched, so a mismatch between those two rows is a useful hint that a file has been through an editor. Treat all of them as informative rather than legally verified capture times.",
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
    { title: "Checking for hidden location data before posting", description: "See the exact coordinates a photo records, open them on a map, and decide whether to strip the metadata before sharing it publicly." },
    { title: "Verifying dimensions for upload requirements", description: "Check an image's exact pixel dimensions and megapixel count against a form, print service, or platform's stated size requirements." },
    { title: "Confirming file type and size before submission", description: "Check a photo's MIME type and file size to make sure it matches what an application form or upload field actually accepts." },
    { title: "Investigating why a photo displays sideways", description: "Read the EXIF Orientation tag to understand why a JPEG appears rotated in one app but not another." },
    { title: "Basic photo provenance checks", description: "Look up a photo's camera make and model, lens, software, artist field, or the PNG text chunk an editor left behind as a first step in casual verification." },
    { title: "Recovering the settings behind a shot", description: "Read the exposure time, aperture, ISO, and focal length from a photo you like so you can reproduce the look on your own camera." },
    { title: "Confirming metadata removal worked", description: "Re-check a photo after resizing or converting it elsewhere on the site to confirm the metadata panels and GPS location are gone." },
  ],
  mistakes: [
    { title: "Expecting camera settings a file never recorded", description: "Screenshots, canvas exports, and heavily processed images often carry no EXIF at all — the tool will tell you the segment is missing rather than invent values." },
    { title: "Treating a missing GPS panel as proof your photos are safe", description: "It means this one file has no readable GPS tags. Other photos from the same phone may still carry coordinates — check each one you plan to share." },
    { title: "Assuming WebP or GIF files show the same metadata depth as JPEG and PNG", description: "JPEG and PNG are parsed in full; WebP and GIF uploads show basic file information only." },
    { title: "Reading the general Date/Time field as the exact moment of capture", description: "'File Date/Time' is the IFD0 timestamp, which editors often rewrite — 'Date Taken (Original)' is the camera's own capture record and is the one to trust." },
    { title: "Assuming any re-save automatically strips metadata", description: "Metadata removal is a side effect of canvas-based tools re-encoding pixel data — a simple file copy, rename, or upload to some platforms may preserve EXIF data untouched." },
  ],
  tips: [
    "Check the GPS panel before posting a sensitive photo publicly, and open the Google Maps link to see exactly what the coordinates give away.",
    "Copy the 'lat, lng' string straight into a mapping app, a spreadsheet, or a support ticket instead of transcribing degrees and minutes by hand.",
    "Run a photo through this site's resizer or converter and re-check it here to confirm the GPS panel and EXIF sections are gone.",
    "Prefer 'Date Taken (Original)' over 'File Date/Time' when you need the moment the shutter actually fired.",
    "Use the megapixel and dimension readout to quickly confirm an image meets a platform's minimum resolution requirement.",
    "On a PNG, check the text chunks — editors and AI generators frequently leave a Software, Comment, or parameters entry behind there.",
  ],
  glossary: [
    { title: "EXIF", description: "Exchangeable Image File Format — a metadata standard, embedded mainly in JPEG files, that stores camera and shooting information alongside the image data." },
    { title: "APP1 segment", description: "The section near the start of a JPEG file where EXIF metadata is stored, identified by a specific marker this tool scans for directly." },
    { title: "GPS IFD", description: "A sub-directory of EXIF tags holding latitude, longitude, altitude and a timestamp, with separate N/S and E/W reference tags that decide the sign of each coordinate." },
    { title: "DMS to decimal degrees", description: "Converting degrees, minutes and seconds into a single decimal number (degrees + minutes/60 + seconds/3600), negated for south and west, which is the format maps and APIs expect." },
    { title: "Endianness (II / MM)", description: "The byte order declared at the start of a TIFF/EXIF block: 'II' for little-endian (Intel) or 'MM' for big-endian (Motorola). Reading it wrong turns every number into nonsense, so the parser handles both." },
    { title: "IFD0 / DateTime", description: "A general-purpose EXIF timestamp tag many cameras set to the capture time, distinct from the more specific DateTimeOriginal tag this tool also reads." },
    { title: "IHDR / tEXt chunk", description: "PNG's header chunk, holding dimensions, bit depth and color type, and its plain-text metadata chunk where software names, authors and comments are stored." },
    { title: "MIME type", description: "A label identifying a file's format, such as image/jpeg or image/png, read directly from the uploaded file object." },
    { title: "Metadata stripping", description: "Removing embedded metadata like EXIF from an image file, which happens automatically when an image is redrawn onto an HTML canvas and re-exported." },
  ],
};

export default guide;
