import type { ToolGuide } from "@/types/guide";

const guide: ToolGuide = {
  slug: "image-converter",
  intro: [
    "An image format converter takes a picture saved in one file type and re-encodes it into another, without changing what the image actually looks like beyond whatever tradeoffs that target format requires. The most common reason to convert is compatibility or efficiency: a design tool exports PNG but a web page needs a smaller WebP, or a client sends a BMP that a form only accepts as JPG. This image converter reads the file you upload, decodes it in the browser, and re-encodes it into the output format you choose.",
    "You can upload JPG, PNG, WebP, GIF, or BMP files as input, then convert any of them into JPG, PNG, or WebP as output. A quality slider appears for JPG and WebP output, since both use adjustable lossy compression, while PNG output is always full quality since PNG compression is lossless by design. Once converted, you get an instant before/after file size comparison and a one-click download.",
    "All conversion happens locally in your browser using the HTML canvas element — the source image is drawn onto a canvas and read back out in the new format, so nothing is ever uploaded to a server. That keeps the process private and fast, and it works the same way whether the source file is a phone photo, a screenshot, or a scanned graphic.",
  ],
  sections: [
    {
      heading: "Which Formats Can You Convert To and From?",
      paragraphs: [
        "This tool accepts five input formats — JPG, PNG, WebP, GIF, and BMP — covering nearly every image type you're likely to encounter day to day. Output is more focused: you can convert any of those into JPG, PNG, or WebP, the three formats that cover the overwhelming majority of real-world use cases for web, email, and general sharing.",
        "One format that is not supported as input is HEIC, the format iPhones save photos in by default. If you're starting from a HEIC file, you'll need to export or share it as JPG first (most photo apps offer this as a share option) before uploading it here for further conversion. Output is also limited to static images — there's no ICO, TIFF, or PDF export from this tool, since those require different underlying encoders than a browser canvas provides.",
      ],
    },
    {
      heading: "PNG vs JPG vs WebP: Transparency, Quality and File Size",
      paragraphs: [
        "PNG is lossless and supports transparency, which makes it the right output choice for logos, icons, and graphics with flat colors or text that need to stay pixel-perfect — but PNG files are typically much larger than JPG or WebP for the same photograph, since lossless encoding can't discard visual detail the way the other two can.",
        "JPG uses lossy compression tuned for photographs and generally produces the smallest files of the three for photo-like images, at the cost of some quality loss controlled by the quality slider. It has no transparency support at all, which matters when converting a PNG or WebP that relies on a transparent background.",
        "WebP supports both lossy compression and transparency in a single format, generally beating JPG on file size at a similar visual quality while still preserving transparency the way PNG does. Its main tradeoff is that a very small number of older applications and legacy systems still don't read WebP files, though virtually all modern browsers and operating systems support it fully.",
      ],
    },
    {
      heading: "Why Converting PNG to JPG Adds a White Background",
      paragraphs: [
        "When you convert a PNG or WebP file that has a transparent background into JPG, the transparent areas turn solid white in the output. This isn't a bug — JPG has no concept of transparency at all, so this converter fills the canvas with white before drawing the image on top, which is the standard, predictable way to handle a format that can't represent see-through pixels.",
        "If you need to preserve transparency, convert to PNG or WebP instead of JPG. If white specifically isn't the color you want behind a transparent logo (for example, you need it on a dark background), convert to PNG first to check how it looks, or edit the source image to add the exact background color you want before converting to JPG.",
      ],
    },
    {
      heading: "Losing Animation: Converting an Animated GIF to a Static Image",
      paragraphs: [
        "Converting an animated GIF through this tool produces a single static image in the output format you chose, not an animated result — none of the three output formats this tool produces (JPG, PNG, WebP) come out animated here, even though WebP as a format can technically support animation elsewhere. The frame that gets captured is whichever frame is currently loaded when the browser decodes the image, which is usually the first frame.",
        "If keeping the animation is the actual goal, converting to a static format defeats the purpose — in that case, look for a dedicated GIF-to-video or GIF-to-animated-WebP tool instead. This converter is the right choice when you specifically want to pull one frame out of a GIF and turn it into a normal still image.",
      ],
    },
    {
      heading: "How the Quality Slider Affects Conversion Results",
      paragraphs: [
        "The quality slider appears only for JPG and WebP output, since PNG's lossless compression has no adjustable quality setting — it's always the mathematically exact reproduction of the source pixels. For JPG and WebP, the slider ranges from 10% (smallest file, most visible compression artifacts) to 100% (largest file, closest to visually lossless).",
        "A starting point of 80-90% quality is reasonable for most conversions, since it keeps files noticeably smaller than the lossless PNG equivalent while avoiding visible blockiness or blurring in most photos. Pushing much below 50% starts to show artifacts on detailed images, so that range is best reserved for cases where the image will display very small, such as a thumbnail.",
      ],
    },
    {
      heading: "Choosing the Right Output Format for the Web",
      paragraphs: [
        "For a typical website image with no transparency needed, converting to WebP at 80-85% quality usually gives the best balance of visual quality and file size, since it tends to beat JPG at an equivalent quality setting. For a logo or icon that needs a transparent background, convert to WebP or PNG rather than JPG, since JPG will fill the transparent area with white as described above.",
        "For maximum compatibility with very old software or systems that specifically require JPG, converting to JPG at 85-90% quality remains a safe, universally supported choice, even though it typically won't beat WebP's file size at the same visual quality.",
      ],
    },
  ],
  useCases: [
    { title: "Preparing images for a website", description: "Convert PNG or BMP source graphics into WebP for smaller file sizes and faster page loads without a visible quality difference." },
    { title: "Fixing an unsupported format on upload", description: "Convert a BMP or GIF file into JPG or PNG when a form, app, or platform only accepts specific image formats." },
    { title: "Extracting a still frame from a GIF", description: "Pull the current frame of an animated GIF into a static JPG or PNG for use where animation isn't supported." },
    { title: "Adding transparency support to a JPG-only asset", description: "Convert a JPG into PNG or WebP as a starting point before editing in transparency for a logo or graphic." },
    { title: "Reducing file size before sharing", description: "Convert a large lossless PNG screenshot into a much smaller WebP or JPG before emailing or messaging it." },
  ],
  mistakes: [
    { title: "Converting a transparent PNG to JPG and expecting transparency to survive", description: "JPG has no transparency support, so any transparent area becomes solid white in the output — use PNG or WebP instead." },
    { title: "Expecting an animated result from a GIF conversion", description: "This tool outputs a single static frame regardless of source animation, since none of its output formats produce an animated result here." },
    { title: "Assuming HEIC files can be uploaded directly", description: "HEIC (the default iPhone photo format) isn't a supported input — export it as JPG from your phone's photo app first." },
    { title: "Setting quality too low for a detailed photo", description: "Dropping the quality slider below 50% is fine for a small thumbnail but often introduces visible artifacts on a large, detailed photo." },
    { title: "Choosing PNG output for a plain photograph", description: "PNG's lossless compression keeps ordinary photos far larger than JPG or WebP would at a visually similar result." },
  ],
  tips: [
    "Convert to WebP at 80-85% quality for the best balance of file size and visual quality on most web images.",
    "Use PNG or WebP output, never JPG, whenever the image needs to keep a transparent background.",
    "Export HEIC iPhone photos as JPG from your phone's share menu before uploading them here.",
    "Keep quality above 80% for images that will display large or prominently on a page.",
    "Remember this tool converts one still frame from an animated GIF, not the full animation.",
  ],
  glossary: [
    { title: "Lossy compression", description: "A compression method that permanently discards some image data to reduce file size, used by JPG and WebP." },
    { title: "Lossless compression", description: "A compression method that reduces file size without discarding any image data, used by PNG." },
    { title: "Alpha channel", description: "The part of an image file that stores transparency information, supported by PNG and WebP but not JPG." },
    { title: "HEIC", description: "The default photo format used by modern iPhones, not directly supported as input by most web-based converters including this one." },
    { title: "WebP", description: "A modern image format that supports both lossy and lossless compression plus transparency, generally producing smaller files than JPG or PNG." },
  ],
};

export default guide;
