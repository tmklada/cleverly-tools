import type { ToolGuide } from "@/types/guide";

const guide: ToolGuide = {
  slug: "favicon-generator",
  intro: [
    "A favicon is the small icon that shows up in a browser tab, bookmarks list, and search results next to your site's name, and it's one of the few branding touches that appears everywhere a visitor sees your site outside the page itself. This favicon generator builds a full set of favicon sizes from either a short piece of text or emoji, or an image you already have, without needing any design software.",
    "There are two starting points: type one or two characters (a letter, initials, or an emoji) and pick a background color, text color, and text size to generate a simple icon on the spot, or upload an existing logo or image to turn it into a properly sized favicon set. Either way, you get a live 64x64 preview before generating, so you can see roughly how the icon will read at real browser-tab size.",
    "Everything is drawn using the HTML canvas element directly in your browser — no image is uploaded anywhere, and generation happens instantly. Once generated, you can download each size individually, download all of them in one click, and copy the exact HTML link tags needed to wire the files into your site.",
  ],
  sections: [
    {
      heading: "Favicon Sizes Explained: 16x16, 32x32, and Beyond",
      paragraphs: [
        "Different places a favicon appears expect different pixel sizes: 16x16 is the classic browser tab size, 32x32 is used for higher-density displays and desktop shortcuts, and larger sizes like 192x192 are used for Android home screen icons and some PWA manifests. This generator produces five sizes in one pass — 16x16, 32x32, 48x48, 64x64, and 192x192 — covering standard browser tabs, bookmarks, and Android use cases from a single upload or text input.",
        "Two sizes it does not generate are the 180x180 Apple touch icon used when a page is added to an iPhone or iPad home screen, and the 512x512 icon some PWA manifests request for splash screens. If you need those specific sizes, use this site's image resizer on your original source image (not on a generated favicon, to avoid upscaling a small file) to create 180x180 and 512x512 versions separately, then add their own link tags alongside the ones this tool gives you.",
      ],
      bullets: [
        "16x16 and 32x32 — standard browser tab and bookmark icons",
        "48x48 and 64x64 — higher-density displays and desktop shortcuts",
        "192x192 — Android home screen and basic PWA manifest icon",
        "180x180 (not generated here) — Apple touch icon for iOS home screens",
        "512x512 (not generated here) — larger PWA splash/manifest icon",
      ],
    },
    {
      heading: "Text/Emoji Favicons vs Uploading a Logo Image",
      paragraphs: [
        "The text mode is the fastest path to a usable favicon when you don't have a logo ready: type one or two characters, pick a background color and text color, and adjust the font size slider until the live preview looks balanced. This produces a clean, rounded-square icon built entirely from color and type, which works well for a brand initial or a short abbreviation and reads clearly even at 16x16.",
        "Image mode is the better choice once you have an actual logo or icon graphic, since it preserves your existing branding rather than approximating it with text. For the cleanest result, start from a square image — ideally at least 192x192 pixels so it doesn't need to be enlarged — since a non-square source gets stretched to fit each square favicon canvas rather than cropped.",
      ],
    },
    {
      heading: "How to Add a Favicon to HTML (Link Tags)",
      paragraphs: [
        "After generating your favicons, the tool prints a block of HTML link tags, one per size, each pointing to a file like favicon-32x32.png. Copy that block with the provided copy button and paste it inside the <head> section of your site's HTML, alongside your title and meta tags, and download all five image files into your site's root folder (or wherever your paths are set up to serve them from).",
        "The generated tags assume the files sit at the root of your domain (a path like /favicon-32x32.png). If your project serves static files from a different folder — a public/ or static/ directory that maps to a subpath, for example — adjust the href values in the copied tags to match where you actually place the downloaded files, or the browser won't find them.",
      ],
    },
    {
      heading: "Why This Tool Generates PNG Favicons, Not a Single .ico File",
      paragraphs: [
        "Older browsers, particularly legacy versions of Internet Explorer, expected a single favicon.ico file containing multiple sizes bundled together. Modern browsers, however, fully support PNG favicons declared through individual link tags with explicit sizes attributes, which is the approach this generator takes and the approach most current sites use.",
        "If a specific legacy requirement still calls for a traditional .ico file, this tool won't produce one directly, since it generates individual PNG files rather than a multi-resolution ICO container — in that case, a dedicated PNG-to-ICO converter can combine the downloaded PNGs into a single .ico afterward.",
      ],
    },
    {
      heading: "Designing a Favicon That's Still Legible at 16x16 Pixels",
      paragraphs: [
        "A favicon has to work at an extremely small size, so anything that looks fine on a full logo can turn into an unrecognizable smudge at 16x16 pixels. Simple shapes, a single bold letter, or a recognizable silhouette hold up far better than detailed illustrations, thin lines, or small text beyond a single character or two.",
        "High contrast between the background and foreground colors matters more at this size than subtle color choices, since low-contrast combinations tend to blur together once scaled down. When using text mode, keep the character count to one or two and push the font size slider up toward 70-80% so the character fills most of the available space rather than looking small and lost in the middle.",
      ],
    },
  ],
  useCases: [
    { title: "New website launch", description: "Generate a full favicon set from a logo or brand initial before a site goes live, so the browser tab never shows a generic default icon." },
    { title: "Rebranding an existing site", description: "Quickly regenerate all favicon sizes after a logo redesign without manually resizing each file in an image editor." },
    { title: "Personal projects and side sites", description: "Create a simple text-based favicon in minutes for a personal blog, portfolio, or small project that doesn't need a full logo yet." },
    { title: "Web app manifest icons", description: "Generate the 192x192 icon needed for a basic progressive web app manifest directly from an existing logo file." },
    { title: "Prototyping and client demos", description: "Add a placeholder favicon to a work-in-progress site quickly, using initials or an emoji as a stand-in before final branding is ready." },
  ],
  mistakes: [
    { title: "Uploading a non-square logo", description: "A rectangular image gets stretched to fill each square favicon canvas rather than cropped, distorting the result — crop to square first." },
    { title: "Assuming Apple touch and PWA sizes are included", description: "This tool generates 16, 32, 48, 64, and 192px icons only; 180x180 and 512x512 need to be created separately if your project requires them." },
    { title: "Forgetting to update the link tag paths", description: "The copied HTML assumes favicon files sit at your domain root — adjust the href paths if you place the files in a different folder." },
    { title: "Using too much detail in text mode", description: "More than two characters or a very small font size setting becomes unreadable once shrunk down to a 16x16 browser tab icon." },
    { title: "Expecting a .ico file", description: "The generator produces PNG files at each size, not a bundled .ico — use a separate PNG-to-ICO converter if a legacy .ico is specifically required." },
  ],
  tips: [
    "Start from a square source image at least 192x192 pixels to avoid any stretching or blurring in the generated set.",
    "Keep text-mode favicons to one or two high-contrast characters so they stay legible at 16x16 pixels.",
    "Generate separate 180x180 and 512x512 versions with an image resizer if your project needs Apple touch or PWA manifest icons.",
    "Paste the copied link tags inside your HTML's head section, not the body, or browsers won't detect them.",
    "Adjust the href paths in the copied tags if your favicon files don't live at your site's root folder.",
  ],
  glossary: [
    { title: "Favicon", description: "The small icon a browser displays in a tab, bookmark list, or history entry to represent a website." },
    { title: "Apple touch icon", description: "A 180x180 icon iOS uses when a webpage is added to an iPhone or iPad home screen, declared with its own link tag." },
    { title: "PWA manifest icon", description: "An icon, often 192x192 or 512x512, referenced by a web app manifest file for use on home screens and splash screens." },
    { title: "ICO file", description: "A legacy single-file format that bundles multiple icon resolutions together, historically required by older versions of Internet Explorer." },
    { title: "Link tag", description: "An HTML element placed in a page's head section that tells the browser where to find resources like favicons and stylesheets." },
  ],
};

export default guide;
