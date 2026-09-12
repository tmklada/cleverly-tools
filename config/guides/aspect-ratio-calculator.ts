import type { ToolGuide } from "@/types/guide";

const guide: ToolGuide = {
  slug: "aspect-ratio-calculator",
  intro: [
    "An aspect ratio calculator solves two related problems: simplifying a width and height into a clean ratio like 16:9, and finding the missing dimension when you already know one side and the ratio you need to maintain. Enter a width and height and the tool reduces it to its simplest ratio and decimal form, or enter a new width or height alone and it calculates the matching dimension so the image or video keeps its correct proportions.",
    "This comes up constantly in video editing, screen and print design, and social media, where uploading an image at the wrong ratio gets it cropped or stretched by the platform. A resolution like 1920×1080 is technically just a pair of pixel dimensions, but the ratio behind it, 16:9, is what determines whether that same design will still look right scaled down to 1280×720 or up to 3840×2160.",
    "Getting a ratio wrong by even a small amount is enough to visibly distort an image, and doing the division by hand for an odd resolution like 1366×768 is easy to get wrong. This tool applies the same simplification and scaling math every time, so you can move between resolutions or check a ratio without running the numbers yourself.",
  ],
  sections: [
    {
      heading: "Aspect Ratio Explained: 16:9, 4:3, 1:1, 9:16 and Where Each Is Used",
      paragraphs: [
        "An aspect ratio describes the proportional relationship between an image or screen's width and height, written as two numbers separated by a colon. A 16:9 ratio means that for every 16 units of width, there are 9 units of height — it doesn't specify an exact size, only the shape, which is why 1280×720 and 3840×2160 are both 16:9 even though one has far more pixels than the other.",
        "16:9 is the standard for widescreen video, TV, and most modern monitors. 4:3 was the standard for older televisions and computer monitors and still appears in some presentation formats. 1:1 is a square, common for social media profile photos and grid posts. 9:16 is the vertical mirror of 16:9, and it's become the standard shape for phone screens, Stories, Reels, and TikTok video.",
      ],
      bullets: [
        "16:9 — widescreen video, YouTube, most monitors and TVs",
        "4:3 — older TVs and monitors, some presentation slides",
        "1:1 — square format, social media profile photos and grid posts",
        "21:9 — ultrawide monitors and cinematic film formats",
        "9:16 — vertical video, Stories, Reels, TikTok, phone screens",
        "3:2 — common still-photography sensor and print ratio",
      ],
    },
    {
      heading: "How to Resize Without Distortion (Calculating the Missing Dimension)",
      paragraphs: [
        "To resize an image or video without stretching or squashing it, only one of the two dimensions can be chosen freely — the other has to be calculated from the aspect ratio to keep the proportions consistent. If you know the ratio (width ÷ height) and a new width, the matching height is: new height = new width ÷ ratio. If you know the new height instead, the matching width is: new width = new height × ratio.",
        "For example, starting from a 1920×1080 image (a 16:9 ratio, or 1.778 as a decimal), resizing to a new width of 1280 gives a new height of 1280 ÷ 1.778, which is 720 — matching the familiar 1280×720 resolution exactly. Skipping this calculation and picking both dimensions manually is the most common cause of a stretched or squished image.",
      ],
      bullets: [
        "New height = new width ÷ ratio",
        "New width = new height × ratio",
        "Example: 1920×1080 (ratio 1.778) resized to width 1280 → height 720",
      ],
    },
    {
      heading: "How to Simplify a Ratio to Its Lowest Terms",
      paragraphs: [
        "Simplifying a ratio means reducing both numbers by their greatest common divisor (GCD) — the largest number that divides evenly into both — until they can't be reduced any further. For 1920×1080, the greatest common divisor is 120, so dividing both numbers by 120 gives 16:9, the simplified form that's actually meaningful to compare against other resolutions.",
        "This matters because raw pixel dimensions don't tell you the shape at a glance the way a simplified ratio does. A resolution of 2560×1440 might look unrelated to 1920×1080 on paper, but both simplify to the same 16:9 ratio, meaning content designed for one will scale cleanly to the other without cropping or letterboxing.",
      ],
    },
    {
      heading: "Aspect Ratio vs Resolution: They Are Not the Same Thing",
      paragraphs: [
        "Resolution refers to the actual pixel dimensions of an image, like 1920×1080 or 3840×2160, while aspect ratio refers only to the proportional shape those dimensions form. Two images can share the same resolution but different ratios, and, more commonly, many different resolutions can share the exact same ratio — 1280×720, 1920×1080, and 3840×2160 are all 16:9.",
        "Confusing the two leads to real mistakes: a design brief that says deliver in 16:9 doesn't specify a pixel count, and a request for 1080p is a resolution, not a ratio, that happens to correspond to 16:9. Knowing which one a project actually requires prevents delivering an asset at the correct pixel count but the wrong shape, or vice versa.",
      ],
    },
    {
      heading: "Common Aspect Ratios for Video, Photography, and Social Media",
      paragraphs: [
        "Different platforms and formats favor different ratios, and using the wrong one usually means the platform crops or adds bars to your content automatically rather than rejecting it outright. YouTube and most desktop video defaults to 16:9, while Instagram Stories, TikTok, and YouTube Shorts default to 9:16 vertical video for full-screen mobile viewing.",
        "Photography has its own common ratios independent of video: 3:2 is the classic ratio produced by most DSLR and mirrorless camera sensors, while 4:3 is common on smartphone cameras and some point-and-shoot models. Print work adds further variation, since standard photo prints and frames (4×6, 5×7, 8×10) don't all share the same ratio as the digital source they're printed from, which is why cropping is often needed before printing.",
      ],
    },
    {
      heading: "Converting Between Horizontal and Vertical (Portrait) Ratios",
      paragraphs: [
        "A vertical, or portrait, ratio is simply a horizontal ratio with the two numbers flipped — 16:9 landscape becomes 9:16 portrait, and 4:3 becomes 3:4. The relationship between width and height is preserved, just rotated 90 degrees, which is why a 9:16 phone video and a 16:9 desktop video can come from the same footage cropped or rotated differently.",
        "When converting a design from landscape to portrait, don't just swap the width and height labels on an existing asset — recalculate the actual pixel dimensions for the new orientation, since simply rotating a 16:9 frame doesn't reflow the content the way a purpose-built 9:16 layout does. Using this tool with the flipped ratio numbers gives the correct target dimensions for a portrait version of a design.",
      ],
    },
  ],
  useCases: [
    { title: "Resizing Video for Social Media", description: "Calculate the correct 9:16 dimensions for a vertical video export when your source footage was shot in 16:9 widescreen." },
    { title: "Cropping Photos for Print", description: "Find the matching dimensions to crop a photo to a standard print ratio like 4×6 or 5×7 without distorting the image." },
    { title: "Setting Up a Responsive Web Layout", description: "Calculate the height for an image container at a specific width to reserve the correct space and prevent layout shift while the image loads." },
    { title: "Choosing a Monitor or TV Resolution", description: "Compare resolutions like 1920×1080 and 2560×1440 by their simplified ratio to confirm they'll display content in the same proportions." },
    { title: "Designing Presentation Slides", description: "Determine whether a slide deck needs to be built in a 16:9 or 4:3 ratio and calculate the exact pixel dimensions for exported images." },
  ],
  mistakes: [
    { title: "Resizing both dimensions manually instead of calculating one", description: "Picking a new width and a new height independently, rather than deriving one from the ratio, almost always introduces stretching or squashing." },
    { title: "Confusing aspect ratio with resolution", description: "16:9 describes a shape, not a pixel count; assuming it means a specific resolution like 1080p can lead to the wrong file size being delivered." },
    { title: "Forgetting that flipping a ratio changes it, not just its label", description: "9:16 is not the same shape as 16:9; portrait and landscape versions of a design need dimensions calculated separately." },
    { title: "Assuming all camera or phone photos share one ratio", description: "Camera sensors vary between 4:3, 3:2, and other ratios, so an image straight from a device isn't guaranteed to match a target platform's requirement." },
  ],
  tips: [
    "Use the ratio's decimal form (like 1.778 for 16:9) for a quick sanity check when comparing two resolutions.",
    "Always calculate the missing dimension from the ratio rather than guessing a round number for both width and height.",
    "Remember that a higher resolution doesn't necessarily mean a different aspect ratio — check the simplified ratio, not just the pixel count.",
    "When converting landscape content to a vertical platform, recalculate dimensions for 9:16 rather than simply rotating the original frame.",
    "Keep a note of your project's target ratio before exporting assets, since different platforms default to different shapes.",
  ],
  glossary: [
    { title: "Aspect Ratio", description: "The proportional relationship between an image or screen's width and height, expressed as two numbers separated by a colon." },
    { title: "Resolution", description: "The actual pixel dimensions of an image or screen, such as 1920×1080, which is distinct from its aspect ratio." },
    { title: "Greatest Common Divisor (GCD)", description: "The largest number that divides evenly into both the width and height, used to reduce a ratio to its simplest form." },
    { title: "Letterboxing", description: "Black bars added above and below content when its aspect ratio doesn't match the display or player's ratio." },
    { title: "Portrait Ratio", description: "A vertical aspect ratio, such as 9:16, where the height is greater than the width, common on phone screens." },
  ],
};

export default guide;
