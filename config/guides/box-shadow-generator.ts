import type { ToolGuide } from "@/types/guide";

const guide: ToolGuide = {
  slug: "box-shadow-generator",
  intro: [
    "CSS box-shadow adds depth to an element without an image, a filter, or extra markup, but the property itself takes four numeric values plus a color in a specific order, and getting a shadow that looks intentional rather than smudged usually takes more trial and error than it should. This box shadow generator gives you sliders for every value — horizontal offset, vertical offset, blur radius, and spread radius — plus a color picker with its own opacity control, and updates a live preview square in real time so you can see the effect before you touch any code.",
    "Beyond a single shadow, the tool supports layered shadows: you can add multiple shadow layers to the same element, each with its own offsets, blur, spread, color, and inset toggle, and it combines them into one comma-separated box-shadow declaration. This is how most realistic, soft-looking shadows are actually built in production CSS — not as one shadow with a huge blur, but as two or three smaller shadows stacked on top of each other.",
    "Every value updates the preview instantly, and the generated CSS is available to copy as a single ready-to-paste box-shadow: ... declaration at any point. Nothing you enter is sent anywhere; the whole tool runs in your browser.",
  ],
  sections: [
    {
      heading: "CSS box-shadow Syntax Explained (offset-x, offset-y, blur, spread, color)",
      paragraphs: [
        "A single box-shadow value is built from five parts in a fixed order: horizontal offset, vertical offset, blur radius, spread radius, and color, with an optional inset keyword at the start. Horizontal offset moves the shadow left (negative) or right (positive); vertical offset moves it up (negative) or down (positive). Both offset sliders here range from -50px to 50px, so you can push a shadow in any direction from directly behind the element.",
        "Blur radius controls how soft the shadow's edge is — 0 gives a hard-edged silhouette, and higher values feather it out; this tool's blur slider goes from 0 to 100px. Spread radius, ranging from -20px to 50px here, grows or shrinks the shadow's shape before blur is applied: positive spread makes the shadow larger than the element on every side, and negative spread pulls it in smaller, useful for a shadow that only peeks out along certain edges.",
      ],
      bullets: [
        "box-shadow: 0px 4px 12px 0px rgba(0, 0, 0, 0.15);",
        "Order is always: offset-x offset-y blur spread color",
        "inset (optional, first) flips the shadow to the inside of the element",
      ],
    },
    {
      heading: "How to Create a Realistic Soft Shadow (Layered Shadows)",
      paragraphs: [
        "A single shadow with a large blur radius tends to look like a gray smudge rather than a realistic drop shadow, because real shadows cast by ambient light combine a sharp contact shadow close to the object with a softer, more diffuse shadow further out. The Add Layer button lets you recreate that: start with one tight, low-opacity shadow with a small offset and blur, then add a second layer with a larger offset, more blur, and lower opacity to suggest the softer ambient light.",
        "Each layer gets its own full set of controls and its own Remove button, and the tool combines every layer into one comma-separated box-shadow value in the order added. There's no hard limit on layers, though two or three is usually enough for a convincing soft shadow — beyond that the visual difference is hard to notice while the CSS keeps growing.",
      ],
    },
    {
      heading: "Inset Shadows and Neumorphism",
      paragraphs: [
        "Checking Inset on any layer flips that shadow from outside the element's edge to inside it, reading as a pressed-in or recessed area rather than a raised one. This is the technique behind pressed button states, inward-carving focus rings, and neumorphic UI — a style where elements appear molded from the same surface as their background using paired light and dark inset shadows.",
        "To build a basic neumorphic effect, add two layers on the same element: one light-colored with a negative offset and inset checked for a highlighted edge, and one dark-colored with a positive offset and inset checked for a shadowed edge. Because offsets, blur, and color are all independent per layer, you can tune the light direction just by changing which corner the offsets point toward.",
      ],
    },
    {
      heading: "Understanding Blur vs Spread (What Each Actually Changes)",
      paragraphs: [
        "Blur and spread are easy to confuse because both make a shadow look bigger, but they change different things. Spread resizes the shadow's actual shape before any softening happens — a spread of 20px pushes a square shadow's edges 20px further out on every side, still with hard corners if blur is 0. Blur then softens whatever shape spread produced, feathering the edge into a gradient rather than changing its underlying size.",
        "A practical way to feel the difference: set blur to 0 and drag spread — you'll see a hard-edged shape grow and shrink with sharp corners. Then set spread back to 0 and drag blur instead — the shape stays the same size but its edges become increasingly soft. Most realistic shadows use a moderate amount of both rather than maxing out either one.",
      ],
    },
    {
      heading: "Shadow Color and Opacity: Why Pure Black Rarely Looks Right",
      paragraphs: [
        "Each shadow layer has its own color picker and a separate opacity slider from 0 to 100%, and the tool combines them into an rgba() color internally — so the box-shadow color you copy is always converted to red, green, blue, and alpha rather than a plain hex code. Pure black (#000000) at high opacity tends to look harsh compared to real shadows, which are rarely fully opaque and often pick up a slight tint from their surroundings.",
        "A common starting point is black or dark gray at 10-20% opacity for a subtle elevation shadow, raising opacity only for shadows meant to look dramatic, like a strong drop shadow on a hero image. Some designers use a dark version of the element's own hue instead of pure black, which reads as more cohesive than a neutral gray shadow.",
      ],
    },
    {
      heading: "Copying and Using Multiple Box-Shadow Layers",
      paragraphs: [
        "The Copy button grabs the complete box-shadow declaration, including every layer you've added, already formatted as a semicolon-terminated CSS property ready to paste into a class, an inline style, or a CSS-in-JS object. Because layers are comma-separated in the order you created them, the first layer you added renders visually in front, with later layers appearing progressively further behind it.",
        "At least one shadow layer is always required — the Remove button only appears once you have more than one layer, so you can't accidentally delete the tool down to no shadow at all. If you want to temporarily disable a shadow effect without losing your settings, the simplest approach is to drop its opacity to 0 rather than removing the layer.",
      ],
    },
  ],
  useCases: [
    { title: "Card elevation on a dashboard or product grid", description: "Add a soft, layered shadow to cards so they read as raised above the page background without a heavy, artificial-looking edge." },
    { title: "Button hover and active states", description: "Build a subtle shadow for the default state and a slightly larger one for hover, giving buttons a sense of physical depth." },
    { title: "Modal and dialog depth", description: "Use a larger offset and blur to make a modal window visually separate from the dimmed page behind it." },
    { title: "Neumorphic UI elements", description: "Combine a light inset layer and a dark inset layer on the same element to create a soft, molded, pressed-in look." },
    { title: "Floating navigation bars", description: "Add a shadow beneath a sticky header so it visually separates from page content as the user scrolls." },
    { title: "Image frames and thumbnails", description: "Apply a shadow around a photo or thumbnail to lift it off a flat background in a gallery layout." },
  ],
  mistakes: [
    { title: "Using pure black at full opacity", description: "A fully opaque black shadow tends to look harsh; try a dark gray or tinted color at 10-30% opacity for a more natural result." },
    { title: "Relying on one shadow with a huge blur for softness", description: "A single, heavily blurred shadow often looks like a gray smudge — layering two or three smaller shadows produces a more realistic soft effect." },
    { title: "Confusing spread with blur", description: "Spread resizes the shadow's shape with hard edges; blur softens the edge of whatever shape spread produced. They aren't interchangeable." },
    { title: "Forgetting inset changes what offsets mean visually", description: "With inset checked, the same offset values shift a shadow appearing on the inside of the element, which can look like the opposite direction you expect." },
    { title: "Assuming you can remove every shadow layer", description: "At least one layer is always required; the Remove button won't appear on the last remaining layer." },
  ],
  tips: [
    "Layer two or three shadows — a tight, low-opacity one and a larger, softer one — for a more realistic effect than a single shadow.",
    "Start with a low opacity like 10-20% for subtle elevation shadows, saving higher opacity for dramatic effects.",
    "Use negative spread when you want a shadow that only shows along certain edges rather than surrounding the whole element.",
    "Check Inset and use a light and dark layer together to build a basic neumorphic, pressed-in look.",
    "Toggle blur to 0 temporarily to see the exact shape spread is producing before adding softness back.",
    "Copy the CSS after each meaningful change so you have a fallback version if further tweaking doesn't look better.",
  ],
  glossary: [
    { title: "Offset-x / offset-y", description: "The horizontal and vertical distance the shadow is shifted from the element, in pixels." },
    { title: "Blur radius", description: "How soft the shadow's edge is; 0 is a hard silhouette, higher values feather the edge outward." },
    { title: "Spread radius", description: "How much larger or smaller the shadow's shape is compared to the element itself, applied before blur." },
    { title: "Inset", description: "A keyword that moves the shadow from outside the element's edge to inside it, creating a recessed appearance." },
    { title: "Layered shadows", description: "Multiple box-shadow values combined with commas on one element to build a more realistic, soft-edged effect." },
    { title: "Neumorphism", description: "A UI style using paired light and dark inset shadows to make elements look molded from their background surface." },
  ],
};

export default guide;
