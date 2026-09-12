import type { ToolGuide } from "@/types/guide";

const guide: ToolGuide = {
  slug: "image-flipper",
  intro: [
    "Flipping an image means mirroring it across an axis — horizontally, so left and right swap places, or vertically, so top and bottom swap places — and it's a different operation from rotating, which turns the whole image around a center point without mirroring anything. This image flipper handles both: flip horizontal, flip vertical, rotate 90 degrees clockwise or counter-clockwise, rotate a full 180 degrees, and any combination of those in sequence, all previewed live before you download.",
    "It's the tool for the handful of situations a resize or crop tool doesn't cover: fixing a selfie that looks mirrored compared to how you actually look in a normal mirror, correcting a sideways photo that a phone or scanner saved in the wrong orientation, or building a genuine mirror-image version of a logo or graphic for a design layout. Every adjustment happens on an HTML canvas in your browser, so nothing is uploaded and the preview updates instantly as you click.",
    "The interface tracks your combined transform state — rotation angle plus horizontal and vertical flip — as you stack adjustments, and a single reset button clears everything back to the original orientation if you want to start over. The final result downloads as a PNG file once you're happy with it.",
  ],
  sections: [
    {
      heading: "Mirror vs Rotate: Flipping Images Horizontally and Vertically",
      paragraphs: [
        "A horizontal flip mirrors an image left-to-right, as if you were looking at it in a mirror held up to one side — text becomes reversed and reads backward, and anything asymmetrical (a face, a logo with a directional arrow) appears reversed. A vertical flip mirrors top-to-bottom instead, turning the image upside down while also reversing which side is which vertically, distinct from simply rotating it 180 degrees.",
        "That distinction matters because a 180-degree rotation and a combined horizontal-plus-vertical flip can look identical for a symmetric image but are not the same transform — a rotated 180 image keeps left and right in their original relative positions just flipped top-to-bottom and reversed in direction, while flipping both axes produces the same visual result through mirroring instead. For most everyday fixes you only need one flip axis at a time, and this tool keeps horizontal flip, vertical flip, and rotation as separate, combinable buttons rather than forcing you to reason about the math.",
      ],
    },
    {
      heading: "Why Selfies Look Mirrored (and How to Fix It)",
      paragraphs: [
        "Phone front-cameras display a live mirrored preview while you're framing the shot, which is why your selfie on-screen looks like your reflection in a mirror rather than how other people actually see your face day to day. Some phones save the photo mirrored to match that preview, while others save it unmirrored — so the same phone can produce a selfie that either matches or doesn't match what you saw while taking it, depending on the camera app and settings.",
        "If a saved selfie looks backward compared to a normal mirror — a mole or part on the wrong side, watch on the wrong wrist — a single horizontal flip corrects it. This is a purely cosmetic fix with no effect on image quality, since flipping doesn't touch pixel color values, only their left-right position.",
      ],
    },
    {
      heading: "Combining Flip and Rotate: Correcting Sideways or Upside-Down Photos",
      paragraphs: [
        "Photos taken with a phone held sideways, or scanned documents fed into a scanner the wrong way, often come out rotated 90 degrees rather than mirrored — the fix there is Rotate 90° CW or Rotate 90° CCW, not a flip, since nothing needs to be mirrored, just turned. An upside-down photo needs Rotate 180° instead, which turns it a half-turn without mirroring either axis.",
        "Some cases need both: a scanned page that's both upside-down and was scanned with the platen orientation reversed might need a 180-degree rotation followed by a horizontal flip to read correctly. The status line beneath the preview shows the current rotation angle and flip state as you stack adjustments, so you can track exactly what's been applied before downloading.",
      ],
      bullets: [
        "Selfie looks mirrored compared to a normal mirror: use Flip Horizontal.",
        "Photo or scan is upside down: use Rotate 180°.",
        "Photo was taken with the camera turned sideways: use Rotate 90° CW or CCW depending on which way it's leaning.",
        "Scanned document is both upside-down and mirrored: combine Rotate 180° with a flip.",
      ],
    },
    {
      heading: "Does Flipping Reduce Image Quality? Lossless Canvas Transforms",
      paragraphs: [
        "Flipping and rotating are geometric transforms — they reposition existing pixels without recalculating or blending their color values, unlike resizing, which has to interpolate new pixel values when dimensions change. That makes flip and rotate operations lossless in the sense that no visual detail is lost or blurred as a direct result of the transform itself.",
        "The one place quality can be affected is in the final export step, since every download from this tool is re-encoded as a PNG regardless of the transform applied — see the note on output format below for what that means for file size.",
      ],
    },
    {
      heading: "Output Format: Why This Tool Always Downloads a PNG",
      paragraphs: [
        "Regardless of whether you upload a JPG, PNG, or WebP file, the download button always saves the flipped or rotated result as a PNG, named flipped.png. PNG is a lossless format, so no compression artifacts are introduced by the export itself, but it also means a photo uploaded as a compact JPEG will typically download as a noticeably larger PNG file, since PNG doesn't use JPEG's lossy compression.",
        "If file size matters for where the flipped image is going — a website, an email attachment, a form upload with a size limit — run the downloaded PNG through a separate image compressor or converter afterward to bring it back down or convert it to a different format.",
      ],
    },
  ],
  useCases: [
    { title: "Fixing a mirrored selfie", description: "Flip a front-camera photo horizontally so it matches how you actually appear to others rather than the mirrored preview shown while shooting." },
    { title: "Correcting sideways phone or scanner photos", description: "Rotate a photo or scanned document 90 degrees to fix an orientation issue from a phone held sideways or a scanner fed the wrong way." },
    { title: "Creating a mirror-image graphic", description: "Flip a logo, arrow, or illustration horizontally when a design layout needs it facing the opposite direction from the original file." },
    { title: "Preparing images for iron-on transfers", description: "Mirror an image horizontally before printing it for an iron-on transfer, since the transfer process itself reverses the design onto fabric." },
    { title: "Fixing upside-down scanned documents", description: "Rotate a document scanned in the wrong orientation a full 180 degrees to make it readable without rescanning." },
    { title: "Building before/after or comparison graphics", description: "Flip one version of a symmetric photo to create a visually distinct mirrored pair for design or comparison layouts." },
  ],
  mistakes: [
    { title: "Using Rotate 180° when a mirror image was actually needed", description: "Rotating 180 degrees turns an image upside down without mirroring it — for a true left-right mirror effect, use Flip Horizontal instead." },
    { title: "Assuming the download keeps the original file format", description: "This tool always exports a PNG regardless of whether you uploaded a JPG or WebP, which can noticeably increase file size compared to the original." },
    { title: "Flipping a photo that contains text", description: "Horizontally or vertically flipping an image with visible text or numbers makes that text reversed and unreadable — crop or edit around text before flipping if it needs to stay legible." },
    { title: "Losing track of stacked adjustments", description: "Clicking flip and rotate buttons repeatedly without checking the status line can leave the image in an unintended combined state — use Reset to start over if unsure." },
    { title: "Expecting flipping to fix a genuinely crooked photo", description: "Flip and rotate only work in fixed 90-degree steps and mirror axes; a photo that's slightly tilted needs a dedicated rotate-by-degree or crop tool, not this one." },
  ],
  tips: [
    "Use Flip Horizontal to fix a selfie that looks mirrored compared to a normal mirror.",
    "Use Rotate 90° CW or CCW for a sideways photo, and Rotate 180° for one that's upside down.",
    "Check the status line below the preview to see the current rotation and flip state before downloading.",
    "Click Reset if you've stacked several adjustments and want to start over from the original orientation.",
    "Run the downloaded PNG through a compressor afterward if the file size needs to come back down for web or email use.",
    "Mirror a graphic before printing it for an iron-on transfer, since the transfer process reverses the design again.",
  ],
  glossary: [
    { title: "Horizontal flip", description: "Mirroring an image left-to-right across a vertical axis, so the left and right sides swap places." },
    { title: "Vertical flip", description: "Mirroring an image top-to-bottom across a horizontal axis, so the top and bottom swap places." },
    { title: "Rotation", description: "Turning an image around its center point by a fixed angle, such as 90 or 180 degrees, without mirroring either axis." },
    { title: "Lossless transform", description: "An image operation that repositions existing pixels without altering or blending their color values, so no visual detail is lost." },
    { title: "Canvas", description: "The HTML element this tool draws images onto in the browser to apply and preview flip and rotate transforms without a server." },
  ],
};

export default guide;
