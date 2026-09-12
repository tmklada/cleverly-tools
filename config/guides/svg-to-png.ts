import type { ToolGuide } from "@/types/guide";

const guide: ToolGuide = {
  slug: "svg-to-png",
  intro: [
    "SVG and PNG solve different problems: SVG is a vector format built from mathematical shapes and paths, so it scales to any size without losing sharpness, while PNG is a raster format made of a fixed grid of pixels, so it displays reliably everywhere but looks blurry if stretched past its saved resolution. This tool converts an SVG into a PNG at whatever pixel dimensions you specify, which is exactly what you need when a target app, platform, or email client can't render SVG directly.",
    "You can either upload an .svg file or paste raw SVG code straight into the text box, and the tool automatically reads the width, height, or viewBox values out of the SVG to suggest starting output dimensions, which you can then override. A live preview shows the original SVG next to the converted PNG so you can check the result before downloading.",
    "The conversion happens entirely in your browser by drawing the SVG onto an HTML canvas element and reading the pixels back out as a PNG — no file is uploaded to a server, so private logos, icons, or in-progress designs never leave your device.",
  ],
  sections: [
    {
      heading: "SVG to PNG at Any Resolution for Retina Screens",
      paragraphs: [
        "A retina or high-density display shows more physical pixels per inch than a standard screen, so an image saved at a low resolution looks visibly softer on that hardware than the same image saved larger. Because this tool lets you type in any output width and height directly, you can export a PNG at double or triple the SVG's original design size — for example, entering 1600 by 1200 for an SVG whose viewBox suggests 800 by 600 — to get a sharp result on high-density screens.",
        "There's no separate scale multiplier control here; instead, you control resolution by entering the exact pixel numbers you want, which gives you more precise control than a fixed 2x or 3x toggle would, at the cost of needing to do the multiplication yourself if you're targeting a specific scale factor.",
      ],
      bullets: [
        "1x export: use the SVG's native width and height as detected",
        "2x export: double both the width and height values before converting",
        "3x export: triple both values for the highest-density displays",
        "Always keep the width-to-height ratio the same at every scale to avoid stretching",
      ],
    },
    {
      heading: "Why Your Converted PNG Is Blurry (Scale Factor Explained)",
      paragraphs: [
        "A PNG exported at too low a resolution for where it's displayed will look blurry or pixelated, because raster images can't add detail that wasn't there when they were created — stretching a small PNG larger in an app or webpage just makes existing pixels bigger, not sharper. If your converted PNG looks soft, the fix is almost always to increase the width and height fields before reconverting, not to adjust anything about the source SVG.",
        "A useful rule of thumb: export at least twice the pixel dimensions of the largest size the image will actually display at. If a logo will show at 200 by 200 pixels on a modern phone or laptop screen, converting at 400 by 400 or larger gives you headroom for high-density displays instead of a flat, exact-size export that looks fine on one screen and soft on another.",
      ],
    },
    {
      heading: "How This Tool Reads Width and Height From Your SVG",
      paragraphs: [
        "When you upload a file or paste SVG code, the tool looks first for explicit width and height attributes on the outer svg tag and uses those numbers to pre-fill the output fields. If no width attribute is present, it falls back to reading the viewBox attribute instead, pulling the third and fourth numbers (the viewBox's width and height) as a substitute.",
        "This auto-detection is a convenience, not a requirement — you can always overwrite the width and height fields with any numbers you want before converting, and doing so doesn't distort or crop the SVG's content, since the whole vector graphic is redrawn to fill whatever canvas size you specify.",
      ],
    },
    {
      heading: "Preserving Transparency When Converting SVG to PNG",
      paragraphs: [
        "If your SVG has no background shape covering its full canvas — meaning the areas outside your visible shapes are simply empty — those areas stay transparent in the converted PNG, since PNG supports a full alpha channel and this tool doesn't add a background fill during conversion. This makes it a reliable choice for converting logo or icon SVGs that need to sit on top of different colored backgrounds later.",
        "If you instead want a solid background behind the PNG, add a rectangle shape covering the full canvas as the first element inside your SVG code before converting, since this tool has no separate background color option of its own. Without that rectangle, an SVG with no explicit background will always convert to a PNG with a transparent background, not a white one.",
      ],
    },
    {
      heading: "Common SVG to PNG Conversion Problems and How to Fix Them",
      paragraphs: [
        "If the conversion fails with an \"Invalid SVG\" error, the most frequent cause is malformed or incomplete SVG code pasted into the text box — missing a closing tag, an unescaped ampersand in a URL, or copying only part of the file. Pasting the complete SVG code from the original source, opening tag through closing svg tag, usually resolves it.",
        "If the PNG preview appears blank or the wrong size, check that the SVG actually has visible content within its viewBox coordinates — an SVG with shapes positioned outside its own viewBox will convert to a technically valid but visually empty PNG. Confirming the SVG displays correctly in a browser tab first is a fast way to rule out a source-file problem before troubleshooting the conversion itself.",
      ],
    },
  ],
  useCases: [
    { title: "Adding a logo to an email signature", description: "Convert a vector logo to a PNG at a fixed pixel size, since most email clients don't render SVG reliably." },
    { title: "Uploading an icon to a platform that rejects SVG", description: "Convert an SVG icon into PNG format for platforms, forms, or CMSs that only accept raster image uploads." },
    { title: "Exporting app icons at multiple resolutions", description: "Convert the same SVG source at several width/height combinations to cover different device pixel densities." },
    { title: "Sharing a design on social media", description: "Convert an SVG graphic to PNG before posting, since most social platforms expect raster image formats." },
    { title: "Embedding a vector graphic in a document or slide", description: "Convert to PNG for pasting into tools like Word, Google Docs, or PowerPoint that handle raster images more predictably than SVG." },
  ],
  mistakes: [
    { title: "Expecting a scale multiplier instead of typing exact pixels", description: "This tool has no 2x/3x toggle — enter the exact width and height numbers you want, doubling or tripling the base size yourself." },
    { title: "Exporting at too small a resolution for a high-density screen", description: "A PNG sized only for a standard display will look soft on retina and other high-density screens; export at least 2x the display size." },
    { title: "Pasting incomplete SVG code", description: "A missing closing tag or a partial copy-paste is the most common cause of an \"Invalid SVG\" conversion error." },
    { title: "Expecting a white background by default", description: "An SVG with no background shape converts to a PNG with a transparent background, not white, since this tool adds no fill of its own." },
    { title: "Changing width without height (or vice versa)", description: "Adjusting only one dimension without scaling the other proportionally will stretch or squash the converted image." },
  ],
  tips: [
    "Export at least twice the pixel size the image will actually display at to avoid a blurry result on high-density screens.",
    "Add a full-canvas background rectangle inside your SVG code first if you need a solid-color PNG instead of a transparent one.",
    "Keep width and height in the same proportion as the original SVG unless you intentionally want a stretched result.",
    "Paste the complete SVG code, from the opening to the closing svg tag, if a file upload isn't available.",
    "Check that your SVG renders correctly in a browser tab first if the conversion produces a blank or oddly sized PNG.",
  ],
  glossary: [
    { title: "Vector format", description: "An image format like SVG built from mathematical shapes and paths, which can scale to any size without losing sharpness." },
    { title: "Raster format", description: "An image format like PNG made of a fixed grid of pixels, which loses sharpness when scaled up beyond its saved resolution." },
    { title: "viewBox", description: "An SVG attribute defining the coordinate system and default width-to-height proportions of the graphic." },
    { title: "Alpha channel", description: "The part of an image file format, including PNG, that stores transparency information for each pixel." },
    { title: "Scale factor", description: "A multiplier, like 2x or 3x, describing how much larger an image is exported relative to its base design size, commonly used to support high-density displays." },
  ],
};

export default guide;
