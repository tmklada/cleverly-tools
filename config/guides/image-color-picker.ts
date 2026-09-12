import type { ToolGuide } from "@/types/guide";

const guide: ToolGuide = {
  slug: "image-color-picker",
  intro: [
    "This free online image color picker turns any photo, screenshot, or design file into a source of exact color codes. Upload an image, click on any pixel, and the tool instantly reads that exact spot and returns its HEX, RGB, and HSL values side by side, so you can grab the format your project needs without opening design software or guessing at a swatch by eye.",
    "It works entirely in the browser: the image is drawn onto a hidden canvas element, and a click reads the raw pixel data at that coordinate, which means the color returned is the literal value stored in the file, not an approximation from a screen photograph or a printed swatch. That precision matters for matching a brand color, recreating a UI from a screenshot, or figuring out exactly what shade a client sent over in a reference photo.",
    "A running history keeps your last 10 picked colors on screen as small clickable swatches, so you can compare several colors from the same image, like a logo's primary and accent shades, without re-uploading or re-clicking the original pixel each time. There's no account, no watermark, and no upload limit beyond your browser's own memory.",
  ],
  sections: [
    {
      heading: "How to Find the Exact HEX Color in a Photo or Screenshot",
      paragraphs: [
        "Upload the image, then click directly on the pixel whose color you want. The tool reads that single pixel's red, green, and blue values from the canvas and converts them into a HEX code, an RGB triplet, and an HSL value all at once, displayed with a copy button next to each format. For a screenshot of a website you like, clicking the background, a button, or a piece of text each returns that exact element's color, which is far more reliable than eyeballing a shade and typing a guess into a design tool.",
        "Because the click reads a single pixel rather than an averaged region, zoom in on the source image first if you're trying to sample a small detail, like a thin border or a one-pixel-wide icon outline, since clicking a spot that straddles two colors will only return whichever pixel is directly under the cursor. For large flat areas like a solid background or a brand color block, any click within that area returns the same consistent result.",
      ],
      bullets: [
        "HEX is best for CSS, HTML, and most design tools (e.g. #3B82F6)",
        "RGB is best for canvas, code that manipulates color channels directly, or print software that expects 0–255 values",
        "HSL is best for adjusting a color's lightness or saturation while keeping the same hue",
      ],
    },
    {
      heading: "Building a Brand Palette From a Reference Image",
      paragraphs: [
        "A common use case is extracting a small set of colors from a single reference image, like a product photo, a logo, or a mood board, to use as the foundation of a brand or UI palette. Click the dominant background color first, then click each accent color in turn; each pick gets added to the color history strip below, so after four or five clicks you have a working palette of swatches you can copy one at a time.",
        "This manual, click-by-click approach gives you control that an automatic palette extractor doesn't: you decide exactly which colors matter, rather than getting whatever an algorithm judges to be the most statistically dominant shades, which can sometimes pick a shadow or highlight over the color a brand actually considers primary.",
      ],
    },
    {
      heading: "Why Screen Colors Differ From Printed Colors (RGB vs CMYK)",
      paragraphs: [
        "Every color this tool returns is expressed in RGB-based formats (HEX, RGB, HSL) because that's how digital screens render color, by mixing red, green, and blue light. Printers use a different model, CMYK (cyan, magenta, yellow, black), which mixes ink rather than light, and the two color spaces don't map onto each other perfectly. A vivid RGB blue picked from a screen photo can look noticeably duller once converted to CMYK and printed, because some RGB colors sit outside what CMYK ink can physically reproduce.",
        "If you're picking a color from a photo of a printed piece, like a business card or a product package, treat the result as a close approximation rather than the literal ink formula, since a camera, a screen, and ambient lighting all introduce their own color shifts before the pixel ever reaches this tool. For matching printed material exactly, a physical color-matching swatch book (like a Pantone guide) is still more reliable than any digital pick.",
      ],
    },
    {
      heading: "Reading HSL Values: Hue, Saturation, and Lightness Explained",
      paragraphs: [
        "HSL describes a color in three intuitive numbers instead of raw channel mixing: hue is a position on a 0–360 degree color wheel (0 is red, 120 is green, 240 is blue), saturation is how intense or muted the color is from 0% (gray) to 100% (fully vivid), and lightness is how close it is to black (0%) or white (100%). Picking a color and reading its HSL value tells you at a glance where it sits, like a saturation of 85% and a lightness of 55% describing a bold, mid-toned color rather than a pastel or a near-black shade.",
        "HSL is especially useful once you've picked a base color and want variations of it: keeping the hue and saturation the same while lowering the lightness produces a matching darker shade for hover states or borders, and raising it produces a lighter tint for backgrounds, all without picking a second pixel from the image.",
      ],
    },
    {
      heading: "Comparing Multiple Colors From the Same Image",
      paragraphs: [
        "Every pixel you click is added to a history strip of up to 10 swatches, shown as small clickable squares below the main result. Clicking any swatch in that history brings its HEX code back up in the main display, letting you flip between several picked colors, like a header background and a call-to-action button color, to compare them side by side without re-clicking the original image each time.",
        "This history is session-only and clears when you refresh the page or leave the tool, so copy down any codes you want to keep before closing the tab, especially if you're assembling a full palette across several images in one sitting.",
      ],
    },
    {
      heading: "Common Uses: Web Design, Branding, and Digital Art",
      paragraphs: [
        "Designers use this kind of tool to pull an exact accent color from a client's logo file so a new webpage matches it precisely, developers use it to grab the HEX value of a UI element from a competitor's screenshot for a quick style comparison, and digital artists use it to sample skin tones, lighting, or shading colors from a reference photo before painting. In every case, the value is the same: getting the literal color code instead of eyeballing it in a limited color swatch panel.",
        "It also works well for accessibility checks: pick your text color and your background color from a mockup screenshot, then run both HEX codes through a contrast checker to confirm they meet readability guidelines before the design ships.",
      ],
    },
  ],
  useCases: [
    { title: "Matching a brand color exactly", description: "Click a logo or brand asset to get the precise HEX code instead of guessing a close shade by eye." },
    { title: "Recreating a design from a screenshot", description: "Sample backgrounds, buttons, and text colors from a reference screenshot to rebuild the same look in code." },
    { title: "Building a quick palette", description: "Click several key colors in a product photo or mood board and collect them in the history strip." },
    { title: "Checking color contrast for accessibility", description: "Pick a text color and background color from a mockup, then test the pair in a contrast checker." },
    { title: "Sampling reference photos for digital art", description: "Grab exact skin tone, lighting, or shading colors from a photo before painting or illustrating." },
  ],
  mistakes: [
    { title: "Expecting hover-to-preview before clicking", description: "The tool reads a pixel on click, not on hover; move to the exact spot first, then click to sample it." },
    { title: "Assuming a full palette is extracted automatically", description: "There's no auto-extract mode; build a palette by clicking each color you want one at a time." },
    { title: "Treating a screen color as an exact print match", description: "RGB and CMYK are different color spaces; a picked HEX code is only an approximation of how a color prints." },
    { title: "Clicking a blurry or compressed edge", description: "JPEG compression and anti-aliasing can shift pixel colors at edges; click the middle of a flat area for an accurate read." },
    { title: "Losing picked colors after refreshing", description: "The color history clears on page reload; copy any codes you need before navigating away." },
  ],
  tips: [
    "Zoom into the source image beforehand if you need to sample a thin line or a small detail precisely.",
    "Click the center of a flat color area rather than an edge to avoid compression artifacts.",
    "Use the HSL value to quickly create lighter or darker variations of a picked color by adjusting only the lightness.",
    "Keep the color history open to compare several picked shades from the same image side by side.",
    "Copy the HEX code for code and design tools, and the RGB value for anything that manipulates color channels directly.",
    "Treat picked colors from printed material as approximate, since RGB and CMYK don't map onto each other exactly.",
  ],
  glossary: [
    { title: "HEX code", description: "A six-digit code like #3B82F6 representing red, green, and blue values in base-16, the standard format for CSS and most design tools." },
    { title: "RGB", description: "A color model expressing red, green, and blue as three numbers from 0 to 255 each, matching how screens mix light to produce color." },
    { title: "HSL", description: "A color model using hue (0–360°), saturation (0–100%), and lightness (0–100%) to describe a color in a more human-intuitive way than RGB." },
    { title: "CMYK", description: "A print-based color model using cyan, magenta, yellow, and black ink, which covers a different range of colors than RGB screens do." },
    { title: "Pixel sampling", description: "Reading the exact color value stored at a single coordinate in an image file, as opposed to averaging colors across a region." },
    { title: "Color contrast", description: "The difference in brightness and color between two colors, such as text and its background, used to judge whether text stays readable." },
  ],
};

export default guide;
