import type { ToolGuide } from "@/types/guide";

const guide: ToolGuide = {
  slug: "image-cropper",
  intro: [
    "Cropping an image means cutting away everything outside a rectangle you choose and keeping only what's inside it, which is different from resizing the whole picture down or up. This tool lets you upload an image, position a crop box over the part you want to keep, and download just that section as a new file, all without installing software or creating an account.",
    "You can size the crop box using a free-form default or one of four fixed aspect ratio presets, then drag the whole box to the exact spot you want on the image. An optional output width and height lets you also control the exact pixel dimensions of the exported file, separately from the shape of the area you cropped.",
    "Everything happens locally in your browser using the HTML canvas element — your image is never uploaded to a server, which keeps personal photos and unpublished work private and makes the process fast regardless of file size.",
  ],
  sections: [
    {
      heading: "Crop Image to Aspect Ratio: 1:1, 16:9, 4:3, or 3:2",
      paragraphs: [
        "This tool offers five sizing options for the crop box: Free (no fixed ratio, sized to a default box you can move), 1:1 (a perfect square), 16:9 (widescreen), 4:3 (standard photo/video), and 3:2 (classic camera photo ratio). Clicking a preset immediately resizes the crop box to that ratio and centers it near its current position, and you can then drag it to a different part of the image without losing the ratio.",
        "1:1 is the common choice for profile pictures and square social posts, 16:9 suits video thumbnails and widescreen banners, and 4:3 or 3:2 fit more traditional photo framing. There's currently no field to type in a custom ratio like 4:5 or 9:16 directly — if you need a ratio outside these four presets, use Free and position the box by eye, or set a specific output width and height after cropping to force an exact pixel shape.",
      ],
      bullets: [
        "1:1 — square, for profile photos and square social posts",
        "16:9 — widescreen, for video thumbnails and wide banners",
        "4:3 — standard photo and older video framing",
        "3:2 — classic 35mm camera photo ratio",
        "Free — no fixed ratio, sized to a default box you position manually",
      ],
    },
    {
      heading: "Cropping vs Resizing: What's the Difference?",
      paragraphs: [
        "Cropping removes part of the image entirely and keeps the rest at its original detail, while resizing keeps the entire image but scales it up or down, stretching or shrinking every pixel to fit new dimensions. If a photo has an unwanted object at the edge of the frame, cropping removes it; resizing the same photo would just make the unwanted object smaller, not gone.",
        "This tool only crops — it doesn't resize the whole source image before you select an area. The output width and height fields do control the final pixel size of the cropped result, so a small crop area can still be exported larger or smaller than its original pixel size, but that scaling only applies to the cropped section, not the full original photo.",
      ],
    },
    {
      heading: "How Moving and Sizing the Crop Box Actually Works",
      paragraphs: [
        "Click and drag anywhere inside the crop box to move it around the image; the box is constrained so it can't be dragged past the image's edges. The box's size is set by whichever aspect ratio preset is selected (or the default free-form size when you first upload an image), rather than by dragging a corner handle — the small white squares at each corner mark the box visually but aren't drag targets for resizing.",
        "To change the crop box's shape or size, switch between the aspect ratio presets rather than trying to stretch the box directly. This keeps the ratio precise and avoids the fiddly, imprecise feel of manually dragging corners, at the cost of not being able to freehand an arbitrary custom rectangle beyond the default Free size.",
      ],
    },
    {
      heading: "Setting an Exact Output Width and Height",
      paragraphs: [
        "The Output Width and Output Height fields, both in pixels, let you fix the final exported size of the cropped image independently of how large the crop box appears on screen. Leaving either field blank defaults to the crop area's actual pixel size on the original image — calculated from the crop box's percentage of the image multiplied by the image's real width and height, not the size it displays at in your browser window.",
        "This matters when you need a specific pixel size for a platform requirement, like a 500 by 500 pixel profile photo or a 1280 by 720 pixel thumbnail: set the aspect ratio preset that matches the shape you need first, then enter the exact pixel dimensions before clicking Crop & Download, and the tool scales the cropped selection to match.",
      ],
    },
    {
      heading: "Why the Downloaded File Is Always a PNG",
      paragraphs: [
        "Regardless of whether you upload a JPG, PNG, WebP, or GIF, this tool always exports the cropped result as a PNG file named cropped.png. That's a side effect of how the crop is rendered — the image is drawn onto an HTML canvas and read back out using PNG encoding, which is lossless and keeps transparency intact if the source had any.",
        "The main tradeoff is file size: a cropped photo exported as PNG will typically be noticeably larger than the same crop would be as a JPG, since PNG doesn't use lossy compression. If file size matters more than lossless quality for your use case, run the downloaded PNG through a separate image converter afterward to get a smaller JPG or WebP version.",
      ],
    },
  ],
  useCases: [
    { title: "Making a square profile photo", description: "Crop a wider photo down to 1:1 for a profile picture on social media, messaging apps, or a team page." },
    { title: "Preparing a video thumbnail", description: "Crop a screenshot or photo to 16:9 to match the standard widescreen thumbnail shape most platforms expect." },
    { title: "Removing unwanted background from a photo", description: "Trim distracting edges or objects out of frame by dragging the crop box to isolate just the subject." },
    { title: "Fitting an image to an exact pixel size", description: "Set output width and height to match a platform's exact required dimensions after selecting the right crop area." },
    { title: "Standardizing photos from different cameras", description: "Crop several images with mismatched original dimensions to the same aspect ratio for a consistent gallery or grid layout." },
  ],
  mistakes: [
    { title: "Trying to drag a corner handle to resize the crop box", description: "The corner squares are visual markers only; change the box's size by selecting a different aspect ratio preset instead." },
    { title: "Expecting a custom ratio like 4:5 or 9:16 to be available", description: "Only Free, 1:1, 16:9, 4:3, and 3:2 are offered; use Free and position by eye, or fix the exact shape with output width and height." },
    { title: "Assuming the download keeps the original file format", description: "The cropped result always downloads as a PNG, regardless of whether you uploaded a JPG, WebP, or GIF." },
    { title: "Confusing cropping with resizing", description: "Cropping cuts away part of the image; it doesn't shrink or stretch the entire photo the way a resize tool would." },
    { title: "Leaving output width and height blank when an exact pixel size is required", description: "Blank fields default to the crop box's calculated size on the original image, which may not match a platform's exact requirement." },
  ],
  tips: [
    "Pick the aspect ratio preset that matches your final use case before dragging the crop box into position.",
    "Set an exact output width and height when a platform has strict pixel size requirements, like a profile photo.",
    "Remember the download is always a PNG — convert it afterward if you need a smaller JPG or WebP file.",
    "Use Free sizing when none of the four presets match what you need, and position the default box by eye.",
    "Crop first, then resize output dimensions, rather than trying to solve both at once.",
  ],
  glossary: [
    { title: "Aspect ratio", description: "The proportional relationship between an image's width and height, such as 1:1 (square) or 16:9 (widescreen)." },
    { title: "Crop box", description: "The rectangular selection area you position over an image to mark what will be kept after cropping." },
    { title: "Canvas element", description: "The HTML feature this tool uses to draw and re-encode the cropped section of an image entirely in the browser." },
    { title: "Output dimensions", description: "The exact pixel width and height of the exported cropped file, set independently of the crop box's on-screen size." },
    { title: "Lossless format", description: "A file format like PNG that preserves every pixel of image data exactly, without the size-reducing compression tradeoffs of a format like JPG." },
  ],
};

export default guide;
