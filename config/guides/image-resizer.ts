import type { ToolGuide } from "@/types/guide";

const guide: ToolGuide = {
  slug: "image-resizer",
  intro: [
    "Resizing an image means changing its pixel dimensions — the number of pixels wide and tall — rather than just its file size. A photo straight off a phone camera is often 3000-4000 pixels wide, which is far larger than almost any website, social media post, or online form actually needs, and uploading it at full size wastes bandwidth and can even get rejected by upload limits. This image resizer lets you type an exact target width and height in pixels, or lock the aspect ratio so one dimension follows the other automatically, then download the result immediately.",
    "It's built for anyone who needs a specific pixel size rather than just a smaller file: a seller resizing product photos to a marketplace's required dimensions, a job applicant fitting a headshot into an application's exact avatar size, or a developer preparing images at the precise width a page layout calls for. JPG, PNG, and WebP files are all supported as input, and the resized image is saved back out in that same format.",
    "Everything happens in your browser using the HTML canvas element — the image is drawn onto a canvas at the new dimensions and read back out as a file, with nothing ever uploaded to a server. That keeps the process fast, keeps private photos private, and means there's no waiting on an upload or download queue even for larger images.",
  ],
  sections: [
    {
      heading: "Image Sizes for Instagram, Facebook, LinkedIn and YouTube (2026 Cheat Sheet)",
      paragraphs: [
        "Every major platform crops or scales images to its own preferred dimensions, and uploading a photo already sized correctly avoids awkward auto-cropping that can cut off faces or text. The numbers below are the current standard dimensions most platforms use for common placements, and they're worth typing directly into this tool's width and height fields before you upload anywhere.",
        "Keep in mind this tool resizes to the exact numbers you enter — it does not crop. If your source photo has a very different aspect ratio than the target (a square product photo going into a 1200x630 landscape slot, for example), typing those dimensions with the aspect-ratio lock off will stretch rather than crop it. For a mismatched ratio, crop the photo first in an image editor, then resize it here.",
      ],
      bullets: [
        "Instagram square post: 1080 x 1080 px",
        "Instagram Story / Reel: 1080 x 1920 px",
        "Facebook shared link/post image: 1200 x 630 px",
        "Facebook cover photo: 820 x 312 px",
        "LinkedIn post image: 1200 x 627 px",
        "YouTube thumbnail: 1280 x 720 px",
      ],
    },
    {
      heading: "Resize by Pixels vs Percentage: Keeping Aspect Ratio",
      paragraphs: [
        "This tool works in exact pixel values rather than a percentage slider, which is actually more precise for most real-world needs since platforms and forms almost always specify a required pixel size rather than a percentage. When you upload an image, the width and height fields automatically fill in with the original dimensions, so you can see exactly what you're starting from before changing anything.",
        "The 'Maintain aspect ratio' checkbox is the key control for avoiding distortion: with it checked, changing the width recalculates the height automatically, and vice versa. This gives you percentage-based scaling without a dedicated percentage field — to shrink a 2000x1500 photo to 50%, type 1000 into the width box, and the height field automatically becomes 750.",
        "Unchecking the box lets you set width and height independently, which is what's needed for the platform dimensions above when your source image doesn't match that ratio, but it will stretch or squash the image rather than cropping it to fit.",
      ],
    },
    {
      heading: "Upscaling vs Downscaling: Why Enlarging Loses Quality",
      paragraphs: [
        "Downscaling — making an image smaller than its original size — almost always looks sharp, because the browser's canvas rendering has real pixel data to work with and simply averages neighboring pixels together as it shrinks the image down. A 4000-pixel photo resized down to 800 pixels wide will typically look crisp and clean at that smaller size.",
        "Upscaling — making an image larger than its original pixel dimensions — has a hard ceiling on quality. There is no extra visual information to add, so the browser can only interpolate, guessing new pixel values based on the colors around each gap. Pushed much past 120-150% of the original size, this produces visibly soft, blurry results, especially around edges and text.",
        "This resizer uses standard browser canvas smoothing rather than an AI-based upscaling model, so it suits shrinking large photos but isn't the right tool for meaningfully enlarging a small image — a dedicated AI upscaler reconstructs plausible detail that a simple resize cannot.",
      ],
    },
    {
      heading: "Which Image Format Stays After Resizing (JPG, PNG, WebP)",
      paragraphs: [
        "This tool keeps your original file format through the resize — a JPG stays a JPG, a PNG stays a PNG, and a WebP stays a WebP, since the canvas re-encodes the resized pixels back into the same format it started with. If you need to switch to a different format entirely, such as turning a large PNG screenshot into a smaller WebP, pair this resizer with the separate image converter tool rather than expecting a format change here.",
        "Format also affects what survives the resize itself: a PNG with a transparent background keeps its transparency after resizing, since the canvas preserves the alpha channel throughout, while a JPEG has no transparency to begin with and none appears. There is no quality slider on this resizer specifically for JPEG or WebP output — if file size after resizing is still too large, run the result through an image compressor afterward for finer control over the quality-versus-size tradeoff.",
      ],
    },
    {
      heading: "Resizing Images for Websites, Email and Print",
      paragraphs: [
        "For a website, the right resize width depends on how large the image will display: a full-width blog header typically needs 1200-1600 pixels, a content image inside an article usually needs 800-1000 pixels, and a product thumbnail rarely needs more than 400-600 pixels — uploading larger adds load time with no visible benefit.",
        "For email, keep inline images at 600 pixels wide or less, since that's the standard maximum content width most email clients render at, and anything wider gets scaled down by the client anyway, wasting the recipient's data. For print, dimensions need to account for resolution rather than screen pixels: a 4x6 inch print at the standard 300 DPI needs an image that's 1200x1800 pixels, so multiply the physical inches by 300 to get the pixel dimensions to enter here.",
      ],
    },
  ],
  useCases: [
    { title: "Social media image prep", description: "Resize a photo to the exact pixel dimensions Instagram, Facebook, LinkedIn, or YouTube expect before uploading, avoiding awkward automatic cropping." },
    { title: "Website and blog images", description: "Resize images down to the width they'll actually display at on a page, cutting unnecessary file weight and speeding up load times." },
    { title: "Profile pictures and avatars", description: "Fit a headshot or logo into the exact square or rectangular dimensions a platform's avatar upload requires." },
    { title: "Marketplace and e-commerce listings", description: "Resize product photos to match a specific marketplace's required image dimensions before listing an item for sale." },
    { title: "Email newsletter images", description: "Resize an image to a safe maximum width so it displays correctly inside an email without being scaled down by the recipient's client." },
    { title: "Print-ready sizing", description: "Convert physical print dimensions into the correct pixel width and height at 300 DPI before sending a photo to a printer." },
  ],
  mistakes: [
    { title: "Leaving aspect ratio locked when a fixed ratio is needed", description: "If a platform requires a specific ratio different from your source photo, keeping the lock on will crop nothing and just limit your options — turn it off and crop first instead." },
    { title: "Expecting upscaling to add real detail", description: "Enlarging a small image well beyond its original size produces soft, blurry results since the tool can only interpolate pixels, not invent missing detail." },
    { title: "Assuming resizing also compresses the file", description: "Resizing changes pixel dimensions, not compression quality — a resized image can still be larger than expected and may need a separate compression pass." },
    { title: "Resizing when a format change was actually needed", description: "This tool keeps the original file format; use the image converter tool if the goal is switching from PNG to WebP or JPG rather than changing dimensions." },
    { title: "Ignoring platform safe zones", description: "Matching a platform's overall canvas size doesn't guarantee text or logos near the edges survive UI overlays and further app-side cropping." },
  ],
  tips: [
    "Type the platform's exact required width and height before uploading to social media to avoid automatic cropping.",
    "Keep the aspect ratio lock on whenever you just want a smaller version of the same photo, not a different shape.",
    "Avoid enlarging an image more than 120-150% of its original size if you want to keep it looking sharp.",
    "Multiply your target print size in inches by 300 to get the correct pixel dimensions for print-quality output.",
    "Run a resized image through a compression tool afterward if the file size still needs to come down further.",
    "Resize to the image's actual display width on a page rather than uploading it at full camera resolution.",
  ],
  glossary: [
    { title: "Aspect ratio", description: "The proportional relationship between an image's width and height, such as 16:9 or 1:1, that determines its overall shape." },
    { title: "Upscaling", description: "Increasing an image's pixel dimensions beyond its original size, which requires interpolating new pixel values rather than adding real detail." },
    { title: "Downscaling", description: "Reducing an image's pixel dimensions below its original size, generally producing sharp results since real pixel data is simply averaged down." },
    { title: "Interpolation", description: "The process of estimating new pixel values between existing ones, used whenever an image is resized to a different pixel count." },
    { title: "DPI/PPI", description: "Dots or pixels per inch, a measure of resolution used to calculate the correct pixel dimensions needed for a given physical print size." },
    { title: "Alpha channel", description: "The part of an image file that stores transparency information, present in PNG and WebP but not in JPEG." },
  ],
};

export default guide;
