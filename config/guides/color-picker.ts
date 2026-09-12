import type { ToolGuide } from "@/types/guide";

const guide: ToolGuide = {
  slug: "color-picker",
  intro: [
    "A color picker lets you select a color visually and instantly see it expressed in the different formats that CSS, design tools, and code actually use. This tool shows any color you pick in HEX, RGB, and HSL simultaneously, so instead of looking up a conversion formula or reaching for a separate converter, all three values are already there, each with its own one-click copy button.",
    "Click the color swatch to open your browser's built-in color picker (on Chrome and Edge desktop, this includes an eyedropper for sampling any color on your screen), or reuse a color from the row of recently picked swatches the tool keeps for you. Every value updates immediately as soon as a new color is selected.",
    "It's built for developers styling a component and designers translating a brand color across HEX for CSS, RGB for a design spec, and HSL for programmatically adjusting lightness or saturation.",
  ],
  sections: [
    {
      heading: "HEX vs RGB vs HSL: When to Use Each",
      paragraphs: [
        "HEX (like #3B82F6) is the most common format in CSS and design tools because it's compact, a single six-character string that fully defines a color. It's the easiest format to paste into a stylesheet or share with a teammate, but it's also the hardest to reason about visually, since there's no intuitive way to guess what color a random hex string represents.",
        "RGB (like rgb(59, 130, 246)) expresses a color as the intensity of red, green, and blue light, each from 0 to 255. It maps directly to how screens actually render color and is common in design software and when a color needs an alpha (transparency) channel added as RGBA, though this tool displays RGB without an alpha value.",
        "HSL (like hsl(217, 91%, 60%)) expresses a color as hue (position on a 360-degree color wheel), saturation (intensity), and lightness (how close to black or white). HSL is the most useful format for programmatically adjusting a color, since darkening a color is just lowering the lightness value, and creating a matching color scheme is often just rotating the hue while keeping saturation and lightness fixed.",
      ],
      bullets: [
        "HEX: compact and standard for pasting into CSS or sharing a single color value",
        "RGB: maps directly to screen color channels (0-255 each for red, green, blue)",
        "HSL: easiest format for adjusting lightness/darkness or building a color palette by rotating hue",
        "All three represent the exact same color; converting between them changes the format, not the actual color",
      ],
    },
    {
      heading: "How to Pick Accessible Color Contrast (WCAG 4.5:1)",
      paragraphs: [
        "Web accessibility guidelines (WCAG) require a contrast ratio of at least 4.5:1 between normal body text and its background, and at least 3:1 for large text (18pt or larger, or 14pt bold), so that people with low vision can read the content comfortably. This tool doesn't calculate contrast ratio directly, but it's the first step: pick your text color and background color here, copy each HEX value, and run the pair through a dedicated contrast checker to confirm they meet the ratio.",
        "As a general rule, very light text (like a pale gray) on a white background, or mid-tone colors on similarly mid-tone backgrounds, are the combinations most likely to fail contrast requirements. Pure black text on a white background produces a ratio of 21:1, far exceeding the minimum, while two similarly light colors might land below 2:1 and fail outright.",
        "Adjusting the lightness value in HSL is often the fastest way to fix a failing contrast pair: keep the hue and saturation the same to preserve the brand color's identity, and push the lightness value down (for text) or up (for background) until the pair passes.",
      ],
    },
    {
      heading: "Converting a Brand Color Across a Design System",
      paragraphs: [
        "A single brand color rarely appears in only one place: it might need to be a HEX value in a CSS variable, an RGB value in a design tool's color picker, and an HSL value for generating lighter and darker tints programmatically. Rather than manually calculating each conversion, picking the color once here and reading off all three formats keeps everything numerically consistent across a codebase and a design file.",
        "This is especially useful when a designer hands off a color as a HEX code and a developer needs the equivalent RGB values for a canvas drawing API or a design token system that stores colors as separate numeric channels instead of a hex string.",
      ],
    },
    {
      heading: "Using the Eyedropper to Match an Existing Color",
      paragraphs: [
        "On Chrome and Edge for desktop, clicking the color swatch opens a native color picker that includes an eyedropper tool, letting you click anywhere on your screen, including outside the browser window on some systems, to sample that exact pixel's color. This is the fastest way to match a color from an existing image, screenshot, or another website without guessing at a hex value.",
        "Firefox and Safari's native color pickers don't currently include this screen-sampling eyedropper, so on those browsers you're limited to the picker's built-in gradient and slider controls, or reusing one of your recently picked colors from this tool's history.",
      ],
    },
    {
      heading: "Common Color Format Mistakes to Avoid",
      paragraphs: [
        "A frequent mistake is manually retyping a color value between formats and introducing a rounding error, since RGB values are whole numbers from 0-255 while the underlying color math involves fractional values; letting a tool handle the conversion avoids this drift entirely. Another is forgetting that HEX, RGB, and HSL as shown here don't include an alpha (transparency) channel, so a design calling for a semi-transparent color needs RGBA or HSLA syntax added manually in code, using the RGB or HSL numbers from this tool as the base.",
      ],
    },
  ],
  useCases: [
    { title: "Converting a brand color for CSS", description: "Pick a brand color once and copy the HEX value for a CSS variable or Tailwind config." },
    { title: "Matching an existing color on screen", description: "Use the eyedropper (Chrome/Edge) to sample a color from an image or another site and get its exact HEX and RGB values." },
    { title: "Preparing values for a contrast check", description: "Copy the HEX codes for your text and background colors to test against WCAG contrast requirements in a dedicated checker." },
    { title: "Building a palette by adjusting HSL", description: "Note a color's HSL hue and saturation, then vary the lightness value to create a consistent set of tints and shades." },
    { title: "Handing off a color between design and code", description: "Give a designer the RGB value while keeping the HEX value for the developer, both generated from the same picked color." },
  ],
  mistakes: [
    { title: "Manually converting between HEX and RGB by hand", description: "Manual conversion introduces rounding errors; let the tool calculate all three formats from a single picked color." },
    { title: "Assuming a color automatically meets contrast requirements", description: "This tool shows color values, not contrast ratio; check the HEX values here against a dedicated WCAG contrast checker." },
    { title: "Forgetting there's no alpha channel shown", description: "HEX, RGB, and HSL here don't include transparency; add an alpha value manually as RGBA or HSLA when a design calls for it." },
    { title: "Relying on the eyedropper on an unsupported browser", description: "The screen-sampling eyedropper is only available in Chrome and Edge's native color picker, not Firefox or Safari." },
    { title: "Losing track of a color after closing the tool", description: "Copy the value you need before navigating away; the recently-picked history only persists for the current browser session." },
  ],
  tips: [
    "Copy the HEX value for CSS work, since it's the format most style sheets and frameworks expect by default.",
    "Use the HSL value when you need to programmatically lighten, darken, or generate a matching palette from one base color.",
    "Run any text-and-background color pair through a dedicated WCAG contrast checker before finalizing a design.",
    "Use the eyedropper in Chrome or Edge to match a color from a screenshot or reference image exactly.",
    "Keep brand colors consistent across a project by picking them once here rather than re-entering hex codes from memory.",
  ],
  glossary: [
    { title: "HEX", description: "A six-character code (like #3B82F6) representing red, green, and blue values in base-16, the most common color format in CSS." },
    { title: "RGB", description: "A color format expressing red, green, and blue light intensity, each on a 0-255 scale, matching how screens render color." },
    { title: "HSL", description: "A color format using hue (0-360°), saturation, and lightness percentages, making it easy to adjust a color's brightness or create variations." },
    { title: "WCAG contrast ratio", description: "A measure of the difference in brightness between two colors, required to meet a minimum threshold (4.5:1 for normal text) for accessible readability." },
    { title: "Alpha channel", description: "A transparency value added to a color format (as in RGBA or HSLA) that controls how see-through a color appears." },
    { title: "Eyedropper tool", description: "A browser feature, available in Chrome and Edge's native color picker, that lets you click any pixel on screen to sample its exact color." },
  ],
};

export default guide;
