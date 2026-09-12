import type { ToolGuide } from "@/types/guide";

const guide: ToolGuide = {
  slug: "css-gradient-generator",
  intro: [
    "A CSS gradient is a smooth transition between two or more colors, generated directly by the browser instead of being baked into an image file. That makes gradients faster to load, sharp on any screen size, and easy to tweak later since the whole thing lives in a single line of CSS. This tool builds that line for you visually, so you don't have to remember the exact syntax for linear-gradient, radial-gradient, or conic-gradient or manually calculate color stop percentages.",
    "You choose a gradient type, add and position color stops, and watch a live preview update in real time above the generated code. Every gradient you build here comes out as one ready-to-paste CSS line, styled as a background property, that you can drop straight into a stylesheet or an inline style attribute.",
    "Six built-in presets — Sunset, Ocean, Forest, Purple, Fire, and Night — give you a fast starting point if you'd rather adjust an existing combination than build one stop by stop. Everything runs in your browser; nothing is uploaded or saved, so you can experiment freely and just copy the result when you're happy with it.",
  ],
  sections: [
    {
      heading: "Linear vs Radial vs Conic Gradients in CSS",
      paragraphs: [
        "A linear gradient moves in a straight line across an angle you set, which makes it the right choice for backgrounds, buttons, and banners where you want color to flow in one clear direction, like top-left to bottom-right. This tool's angle slider goes from 0 to 360 degrees, and the live preview updates instantly as you drag it, so you can find the exact angle without doing any math.",
        "A radial gradient spreads outward from the center of the element in a circle, which suits spotlight effects, badges, or circular UI elements where you want attention drawn to the middle. This tool always renders the radial gradient as a circle rather than an ellipse, and it doesn't currently expose a control for moving the center point off of the middle of the element.",
        "A conic gradient sweeps color around a center point like a color wheel or a pie chart, rather than moving outward or in a straight line. It's the least commonly needed of the three for typical web backgrounds, but it's the right tool for pie-chart-style visualizations, loading spinners, or color-picker wheels. This tool's angle control also applies to conic gradients, setting the starting angle of the sweep.",
      ],
      bullets: [
        "Linear: background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);",
        "Radial: background: radial-gradient(circle, #6366f1 0%, #8b5cf6 100%);",
        "Conic: background: conic-gradient(from 135deg, #6366f1 0%, #8b5cf6 100%);",
      ],
    },
    {
      heading: "How to Make a Smooth Gradient Without Banding",
      paragraphs: [
        "Color banding happens when a gradient shows visible steps between shades instead of a perfectly smooth transition, and it tends to show up most on large, low-contrast gradients rendered on lower-quality displays. The single biggest factor you control in this tool is how many color stops you use and how far apart their colors are: two stops with a huge hue jump (say, a bright yellow straight into a dark purple) will band more visibly than a gradient that eases through a middle color first.",
        "Adding a third color stop roughly halfway between two very different hues, rather than jumping directly between them, gives the browser more reference points to interpolate from and produces a noticeably smoother result. This is exactly how the Sunset and Night presets in this tool are built — three stops instead of two, with the middle stop acting as a bridge between the two end colors rather than the two ends fighting for the same space.",
      ],
    },
    {
      heading: "How to Add and Position Color Stops for a Multi-Color Gradient",
      paragraphs: [
        "Every gradient here starts with two color stops, one at 0% and one at 100%, but you're not limited to two. Clicking Add Stop inserts a new stop roughly between the first two, which you can then recolor with the color picker and reposition using its slider; stops automatically re-sort by position so the gradient always renders in the correct left-to-right (or center-to-edge) order regardless of the order you added them in.",
        "You can remove any stop except when only two remain, since a gradient needs at least a start and end color to exist. Because position is set with a slider from 0 to 100, you have full control over exactly where each color transition happens rather than being locked into even spacing between stops.",
      ],
    },
    {
      heading: "Understanding the Angle Control for Linear and Conic Gradients",
      paragraphs: [
        "The angle value in CSS gradients follows compass-style degrees, where 0deg points from bottom to top, 90deg points from left to right, 180deg points from top to bottom, and 270deg points from right to left — it's easy to assume 0deg means horizontal, but that's not how the CSS spec defines it. Rather than memorizing that scale, drag the slider in this tool and watch the preview box update live, which is faster and more reliable than guessing degrees from a mental compass.",
        "A common starting point for a subtle background gradient is 135deg, which flows diagonally from the upper-left to the lower-right and reads naturally to most viewers without looking like a jarring straight line. For a conic gradient, changing the angle rotates where the sweep begins rather than the direction of the flow itself, since a conic gradient always sweeps a full 360 degrees around its center point.",
      ],
    },
    {
      heading: "Copying and Using the Generated CSS Code",
      paragraphs: [
        "The Copy button grabs the full CSS declaration, formatted as background: followed by the gradient function and a semicolon, ready to paste directly into a class in your stylesheet or into an inline style attribute on an HTML element. Because it's a standard background value, it works anywhere a solid background color would — a div, a button, a section, or a full-page body element.",
        "The generated syntax uses plain CSS with no vendor prefixes, since all current browsers (Chrome, Firefox, Safari, and Edge) support linear-gradient, radial-gradient, and conic-gradient without prefixing. If you need to support an unusually old browser that predates unprefixed gradient support, you'd need to add a prefixed fallback separately, but for any modern project this output can be used exactly as generated.",
      ],
    },
  ],
  useCases: [
    { title: "Website hero section backgrounds", description: "Build a diagonal linear gradient to use behind a homepage headline or call-to-action section instead of a flat color." },
    { title: "Button and badge styling", description: "Create a radial or linear gradient for buttons, tags, or badges that need to stand out more than a solid fill would." },
    { title: "Loading spinners and progress rings", description: "Use a conic gradient as the base for a circular loading indicator or a simple pie-chart-style visualization." },
    { title: "Card and panel accents", description: "Add a subtle two-color linear gradient to a card background or border area for visual depth without using an image." },
    { title: "Matching a brand's color palette", description: "Enter your brand's exact hex colors as stops to generate a gradient that's consistent with existing brand guidelines." },
  ],
  mistakes: [
    { title: "Expecting the radial gradient to render as an ellipse", description: "This tool always outputs a circular radial gradient; an elliptical shape isn't currently an option here." },
    { title: "Jumping between two very different hues with only two stops", description: "A large hue jump with no middle stop tends to show visible banding — add a third stop between them for a smoother blend." },
    { title: "Assuming 0 degrees means a horizontal gradient", description: "In CSS, 0deg points bottom-to-top; use the live preview instead of guessing the angle from a mental compass." },
    { title: "Trying to move a radial gradient's center point", description: "This tool doesn't expose a center-position control; the radial gradient is always centered on the element." },
    { title: "Removing stops down to fewer than two", description: "A gradient needs at least a start and end color, so the tool won't let you delete a stop once only two remain." },
  ],
  tips: [
    "Start from one of the six presets and adjust individual stop colors instead of building a gradient from scratch.",
    "Add a middle color stop when transitioning between two very different hues to avoid visible banding.",
    "Use 135deg as a reliable default angle for a natural-looking diagonal background gradient.",
    "Copy the CSS after every change to keep a version you like before continuing to experiment.",
    "Use a conic gradient specifically for pie-chart or color-wheel style visuals, not general backgrounds.",
    "Check your gradient's contrast against any text placed on top of it, since a wide color range can make some text hard to read.",
  ],
  glossary: [
    { title: "Color stop", description: "A specific color placed at a specific position (0-100%) along a gradient, marking where that color appears in the transition." },
    { title: "Linear gradient", description: "A CSS gradient that transitions colors along a straight line at a set angle." },
    { title: "Radial gradient", description: "A CSS gradient that spreads outward from a center point, rendered as a circle in this tool." },
    { title: "Conic gradient", description: "A CSS gradient that sweeps color around a center point in a full rotation, like a color wheel." },
    { title: "Color banding", description: "Visible steps or bands in what should be a smooth gradient, usually caused by too few color stops or too large a jump between hues." },
  ],
};

export default guide;
