import type { ToolGuide } from "@/types/guide";

const guide: ToolGuide = {
  slug: "favicon-generator",
  intro: [
    "A favicon is the small icon that shows up in a browser tab, bookmarks list, and search results next to your site's name, and it's one of the few branding touches that appears everywhere a visitor sees your site outside the page itself. This favicon generator builds a full set of favicon sizes from either a short piece of text or emoji, or an image you already have, without needing any design software.",
    "There are two starting points: type one or two characters (a letter, initials, or an emoji) and pick a background color, text color, and text size to generate a simple icon on the spot, or upload an existing logo or image to turn it into a properly sized favicon set. Either way, you get a live 64x64 preview before generating, so you can see roughly how the icon will read at real browser-tab size.",
    "Everything is drawn using the HTML canvas element directly in your browser — no image is uploaded anywhere, and generation happens instantly. You get a real multi-resolution favicon.ico alongside PNGs at 16, 32, 48, 64, 180, 192, and 512 pixels, downloadable individually or as a single ZIP, plus the exact HTML link tags and a ready-made site.webmanifest to wire the files into your site.",
  ],
  sections: [
    {
      heading: "Favicon Sizes Explained: 16x16, 32x32, and Beyond",
      paragraphs: [
        "Different places a favicon appears expect different pixel sizes: 16x16 is the classic browser tab size, 32x32 is used for higher-density displays and desktop shortcuts, 180x180 is what iOS grabs when a page is added to an iPhone or iPad home screen, and 192x192 and 512x512 are what Android and PWA manifests request for home screens and splash screens. This generator produces all seven sizes in one pass — 16x16, 32x32, 48x48, 64x64, 180x180, 192x192, and 512x512 — from a single upload or text input.",
        "The files are named the way the rest of the web expects them: favicon-16x16.png and favicon-32x32.png for the browser sizes, apple-touch-icon.png for the 180, and android-chrome-192x192.png and android-chrome-512x512.png for the manifest entries. That means the generated HTML snippet and site.webmanifest work as-is once the files are in your site root, with no renaming step.",
      ],
      bullets: [
        "16x16 and 32x32 — standard browser tab and bookmark icons",
        "48x48 and 64x64 — higher-density displays and desktop shortcuts",
        "180x180 — Apple touch icon for iOS home screens",
        "192x192 — Android home screen and standard PWA manifest icon",
        "512x512 — larger PWA splash/manifest icon",
        "favicon.ico — 16, 32 and 48 bundled into the one file browsers request by default",
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
        "After generating your favicons, the tool prints the exact block to paste into your <head>: the favicon.ico link, the 16 and 32 PNG links, the apple-touch-icon link, and the manifest link. This is the step most people get wrong — declaring only one PNG, forgetting the Apple touch icon so iOS home screens show a blurry screenshot instead, or linking a manifest that doesn't exist. A second copy button gives you a matching site.webmanifest containing the 192 and 512 entries, so that link resolves to a real file.",
        "Copy both blocks, paste the link tags inside the <head> section alongside your title and meta tags, and put every downloaded file plus site.webmanifest in your site's root folder. The generated tags assume the files sit at the root of your domain (a path like /favicon-32x32.png). If your project serves static files from a different folder — a public/ or static/ directory that maps to a subpath, for example — adjust the href values in the copied tags to match where you actually place the downloaded files, or the browser won't find them.",
      ],
    },
    {
      heading: "Why You Still Want a favicon.ico Alongside the PNGs",
      paragraphs: [
        "Modern browsers fully support PNG favicons declared through individual link tags with explicit sizes attributes, and those tags are what most of your visitors' browsers will actually use. But browsers, crawlers, feed readers, chat previews, and link unfurlers still request /favicon.ico from your domain root whether or not you declare it, so a site without one logs a steady trickle of 404s and occasionally shows a blank icon where a tool didn't read your link tags.",
        "This generator builds a genuine multi-resolution favicon.ico containing the 16, 32, and 48 pixel icons in one file. The ICO container is written byte by byte in your browser — a 6-byte ICONDIR header, a 16-byte directory entry per image recording its dimensions, byte length and offset, then the image payloads — with PNG data embedded inside, which every browser in use today accepts. Download it, drop it at your site root, and the fallback request resolves correctly.",
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
    { title: "Web app manifest icons", description: "Generate the 192x192 and 512x512 icons a progressive web app manifest needs, along with a ready-to-use site.webmanifest that references them." },
    { title: "iOS home screen icons", description: "Produce the 180x180 apple-touch-icon so a page saved to an iPhone or iPad home screen shows your brand instead of a blurry page screenshot." },
    { title: "Prototyping and client demos", description: "Add a placeholder favicon to a work-in-progress site quickly, using initials or an emoji as a stand-in before final branding is ready." },
  ],
  mistakes: [
    { title: "Uploading a non-square logo", description: "A rectangular image gets stretched to fill each square favicon canvas rather than cropped, distorting the result — crop to square first." },
    { title: "Uploading a source image smaller than 512x512", description: "The 512x512 PWA icon is upscaled from whatever you provide, so a small source produces a soft, blurry manifest icon — start from at least 512 pixels square." },
    { title: "Forgetting to update the link tag paths", description: "The copied HTML assumes favicon files sit at your domain root — adjust the href paths if you place the files in a different folder." },
    { title: "Using too much detail in text mode", description: "More than two characters or a very small font size setting becomes unreadable once shrunk down to a 16x16 browser tab icon." },
    { title: "Linking a manifest you never uploaded", description: "The head snippet points at /site.webmanifest — copy the generated manifest block into that file and upload it too, or the link resolves to a 404." },
    { title: "Skipping favicon.ico because the PNG tags are declared", description: "Crawlers, link unfurlers, and older clients still request /favicon.ico from your root regardless of your link tags — download the generated .ico and put it there." },
  ],
  tips: [
    "Start from a square source image at least 512x512 pixels to avoid any stretching or blurring in the generated set.",
    "Keep text-mode favicons to one or two high-contrast characters so they stay legible at 16x16 pixels.",
    "Use the ZIP download to get the .ico, all seven PNGs, the manifest, and the head snippet in one file with the correct filenames already applied.",
    "Paste the copied link tags inside your HTML's head section, not the body, or browsers won't detect them.",
    "Hard-refresh or open a private window after deploying — browsers cache favicons aggressively and will keep showing the old icon otherwise.",
    "Adjust the href paths in the copied tags if your favicon files don't live at your site's root folder.",
  ],
  glossary: [
    { title: "Favicon", description: "The small icon a browser displays in a tab, bookmark list, or history entry to represent a website." },
    { title: "Apple touch icon", description: "A 180x180 icon iOS uses when a webpage is added to an iPhone or iPad home screen, declared with its own link tag." },
    { title: "PWA manifest icon", description: "An icon, often 192x192 or 512x512, referenced by a web app manifest file for use on home screens and splash screens." },
    { title: "ICO file", description: "A container format that bundles multiple icon resolutions into a single file, served from your site root as favicon.ico. This tool generates one containing the 16, 32, and 48 pixel icons." },
    { title: "ICONDIR / ICONDIRENTRY", description: "The two structures that make up an ICO file's header: a 6-byte directory declaring how many images it holds, followed by a 16-byte entry per image recording its size, byte length, and offset into the file." },
    { title: "Link tag", description: "An HTML element placed in a page's head section that tells the browser where to find resources like favicons and stylesheets." },
  ],
};

export default guide;
