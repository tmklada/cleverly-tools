import type { ToolGuide } from "@/types/guide";

const guide: ToolGuide = {
  slug: "border-radius-generator",
  intro: [
    "The CSS border-radius property rounds an element's corners, but once you want each corner rounded by a different amount, the value quickly turns into a string of four numbers that's hard to picture without seeing it rendered. This border radius generator gives you a slider for each of the four corners — top-left, top-right, bottom-right, and bottom-left — with a live preview box that updates instantly, so you can shape anything from a subtly rounded card to a full circle without doing any mental math.",
    "You can link all four corners together to adjust them as one uniform value, unlink them to sculpt each corner independently, switch between pixel and percentage units, and jump-start a shape with one of eight built-in presets like Pill, Circle, Leaf, and Chat. Whatever you land on, the tool generates a single copy-ready border-radius: ... declaration below the preview.",
    "Everything runs in your browser with no upload step, so it's a fast way to prototype a shape before writing the CSS yourself, or to translate a design mockup's rounded corners into exact pixel or percentage values.",
  ],
  sections: [
    {
      heading: "border-radius Shorthand: 1, 2, 3 and 4 Values Explained",
      paragraphs: [
        "CSS border-radius accepts between one and four values. A single value rounds all four corners equally. Two values set the top-left/bottom-right pair with the first number and the top-right/bottom-left pair with the second. Three values set top-left, then top-right/bottom-left together, then bottom-right. Four values set each corner individually in the order top-left, top-right, bottom-right, bottom-left, which is the same order this tool's four sliders are laid out in.",
        "This tool only ever outputs two forms: a single value when all four corners are equal, or the full four-value list when they're not, even in cases where a shorter two-value or three-value shorthand would technically produce the same result. That's a deliberate simplification — the four-value form is always valid and unambiguous, it just isn't the shortest possible way to write it in every case.",
      ],
      bullets: [
        "border-radius: 16px; (all corners equal)",
        "border-radius: 16px 16px 4px 16px; (four independent corners)",
      ],
    },
    {
      heading: "Elliptical Corners With the Slash Syntax",
      paragraphs: [
        "CSS border-radius actually supports a second, less common syntax using a forward slash to set a different horizontal and vertical radius per corner, like border-radius: 50% 50% / 20% 20%, which produces elliptical rather than perfectly circular corners. This is how you'd create shapes like a flattened oval button or a leaf shape with asymmetric curvature on each axis.",
        "This tool does not generate the slash syntax — each corner here takes a single radius value that applies equally to both axes, which covers the vast majority of real UI use cases like cards, buttons, and avatars. If you specifically need elliptical corners with independent horizontal and vertical curves, you'd write that slash-syntax value by hand starting from the four-corner values this tool gives you.",
      ],
    },
    {
      heading: "px vs % Units: When 50% Actually Makes a Circle",
      paragraphs: [
        "Switching the unit toggle between px and % changes both the sliders' range and what the numbers mean. In px mode, sliders go up to 200px, giving you a fixed pixel radius regardless of the element's size — useful when you want the exact same curve on elements of different dimensions. In % mode, sliders go up to 50%, and the radius is calculated relative to the element's own width and height.",
        "This distinction matters most for the Circle shape: a percentage radius of 50% always produces a perfect circle on any square element, no matter how large or small it is, because the radius scales with the box. A fixed pixel radius only looks circular if it happens to equal half the element's width — 50px only makes a perfect circle on a 100px-wide box. If your preview box doesn't look fully round after applying the Circle preset, switching to % is the fix rather than increasing the px value further.",
      ],
    },
    {
      heading: "Linking Corners vs Editing Them Independently",
      paragraphs: [
        "The Link all corners checkbox controls whether dragging one slider moves all four together or just the one you're touching. With it checked, every corner stays equal automatically, which is the fastest way to dial in a simple uniform rounding like a card or button. Uncheck it to shape each corner on its own, which is what you need for asymmetric shapes like a chat bubble with one squared-off corner or a card that's rounded on top but flat on the bottom.",
        "One behavior worth knowing: clicking any preset automatically unchecks Link all corners, even for symmetric presets like Square, Slight, Rounded, Pill, or Circle where all four values end up equal. If you apply one of those presets and then drag a single corner slider expecting all four to move together, they won't — you'll need to re-check Link all corners first to go back to synced editing.",
      ],
    },
    {
      heading: "Using the Built-in Shape Presets",
      paragraphs: [
        "Eight presets cover the shapes people build most often: Square (0 on every corner), Slight (8px, a subtle UI rounding), Rounded (16px, a common card or button radius), Pill (an extreme 9999px value that always renders as a fully rounded stadium shape on any element height), Circle (50 on every corner, which needs % units on a square element to render as an actual circle), Leaf (0/50/0/50, rounding only two opposite corners for a curved-leaf silhouette), Blob (an uneven 60/20/60/20 mix for an organic, hand-drawn feel), and Chat (16/16/4/16, rounding three corners while leaving the bottom-right squared off like a speech bubble's tail corner).",
        "Presets are meant as starting points, not final answers — after applying one, the four sliders update to match its values and you're free to nudge any corner from there, keeping in mind that Link all corners will already be off.",
      ],
    },
    {
      heading: "Copying and Applying the Generated CSS",
      paragraphs: [
        "The Copy button grabs the exact border-radius declaration shown below the preview, already formatted with your chosen unit and a trailing semicolon, ready to paste into a class or inline style. The color swatch above the sliders only affects the preview box's fill color so you can see the shape more clearly against the background — it isn't part of the copied CSS and doesn't need to match your actual element's color.",
        "Because border-radius is a purely visual property, it works on any block-level or inline-block element with defined dimensions — divs, buttons, images, and cards all respond to it the same way. Just remember that for round or pill shapes to look right, the element's own width and height (or padding) need to cooperate with the radius you've generated here.",
      ],
    },
  ],
  useCases: [
    { title: "Rounded cards and content panels", description: "Dial in a consistent, moderate radius like the Rounded preset for cards, panels, and containers across a design." },
    { title: "Pill-shaped buttons and tags", description: "Use the Pill preset or a large px value to create fully rounded stadium-shaped buttons, badges, or filter tags." },
    { title: "Circular profile avatars", description: "Switch to % units and apply 50% to any square image container to render a perfect circular avatar at any size." },
    { title: "Chat bubble interfaces", description: "Use the Chat preset or unlink corners to leave one corner squared off, mimicking a speech bubble's tail." },
    { title: "Organic, blob-shaped hero graphics", description: "Apply the Blob or Leaf preset for an asymmetric, hand-drawn feel on decorative background shapes." },
    { title: "Matching a design mockup's exact corner values", description: "Adjust each corner slider independently to replicate specific radius values from a Figma or design file." },
  ],
  mistakes: [
    { title: "Expecting the Circle preset to look round in px mode", description: "A pixel radius only produces a perfect circle if it equals half the element's width; switch to % units for a size-independent circle instead." },
    { title: "Assuming corners stay linked after applying a preset", description: "Every preset unchecks Link all corners, even symmetric ones — re-check it if you want to keep editing corners together afterward." },
    { title: "Looking for elliptical, independently-curved corners", description: "This tool sets one radius per corner on both axes; the CSS slash syntax for separate horizontal and vertical corner radii isn't generated here." },
    { title: "Treating the preview color as part of the output", description: "The color swatch only styles the preview box for visibility — it's not included in the copied border-radius CSS." },
    { title: "Applying a circular radius to a non-square element", description: "50% radius on a rectangle produces an ellipse, not a circle — the element needs equal width and height for a true circle." },
  ],
  tips: [
    "Switch to % units and use 50% whenever you need a radius that stays a perfect circle regardless of the element's size.",
    "Uncheck Link all corners before shaping asymmetric designs like chat bubbles or organic blob shapes.",
    "Re-check Link all corners after applying a preset if you want your next adjustments to move all four corners together.",
    "Use px units when you need the exact same rounding across elements of different sizes.",
    "Start from the closest preset and fine-tune individual corners from there instead of building a custom shape from zero.",
    "Remember the element needs equal width and height for round or circular presets to actually look circular.",
  ],
  glossary: [
    { title: "border-radius", description: "The CSS property that rounds an element's corners, accepting one to four values for uniform or per-corner control." },
    { title: "Linked corners", description: "A mode in this tool where dragging any one corner slider updates all four corners to the same value." },
    { title: "Percentage radius", description: "A border-radius value relative to the element's own dimensions, which makes 50% always produce a circle on a square element." },
    { title: "Pill shape", description: "An element rounded so heavily that its ends become fully circular, typically made with a radius equal to or greater than half the element's height." },
    { title: "Elliptical corners", description: "Corners with a different horizontal and vertical radius, written with the CSS slash syntax — not supported by this tool's single-value-per-corner sliders." },
  ],
};

export default guide;
