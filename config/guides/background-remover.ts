import type { ToolGuide } from "@/types/guide";

const guide: ToolGuide = {
  slug: "background-remover",
  intro: [
    "An AI background remover automatically detects the main subject in a photo — a person, product, or animal — and separates it from everything behind it, producing an image with a transparent background. This replaces the old manual process of tracing an outline pixel by pixel in an image editor, which could take many minutes even for a simple photo and much longer for anything with hair, fur, or fine detail.",
    "This free background eraser is aimed at people who need transparent product photos, profile pictures, or marketing images regularly and cannot justify a paid subscription for occasional use: online sellers preparing product listings, students building presentations, and small business owners making social media graphics. There is no watermark, no sign-up, and no limit on how many images you process.",
    "What sets this tool apart technically is that the AI model runs entirely inside your browser using WebAssembly, instead of uploading your photo to a server for processing. Your image never leaves your device. This matters both for privacy (useful for photos of people, private products, or unreleased designs) and for cost — since there is no server doing the work, there is nothing to charge for, which is why the tool can remain free with no usage limits.",
  ],
  sections: [
    {
      heading: "How AI Background Removal Works (Segmentation Explained)",
      paragraphs: [
        "The AI model behind this tool performs a task called image segmentation: it analyzes every pixel in the photo and predicts, for each one, whether it belongs to the foreground subject or the background. Instead of finding a simple outline, the model produces a detailed mask — a grayscale map where each pixel's brightness represents how confident the model is that the pixel is part of the subject. That mask is then used to make background pixels transparent while keeping foreground pixels intact.",
        "This tool uses a compact segmentation model (isnet_quint8, a quantized version of the ISNet architecture) chosen specifically because it is small enough to download and run in a browser tab rather than requiring a data-center GPU. The first time you use the tool, your browser downloads this AI model, roughly 10 MB, which is why the very first image takes longer to process than every image after it, since the browser caches the model locally.",
      ],
    },
    {
      heading: "Best Image Types for Background Removal (Hair, Glass, Shadows)",
      paragraphs: [
        "AI background removal performs best on photos with a clearly defined subject and reasonable contrast against the background: product shots on a plain backdrop, portraits with good lighting, and images where the subject is not overlapping heavily with background clutter. In these conditions, the model produces a clean edge with very little manual cleanup needed afterward.",
        "The hardest cases for any background removal AI, not just this one, are fine or semi-transparent details: loose or wispy hair strands, fur, glass or other transparent objects, motion blur, and soft shadows the subject casts on the background. In these cases the model has to guess at partial transparency pixel by pixel, and results can show slightly rough edges or a faint halo around the subject that may need a quick manual touch-up in an image editor for professional use.",
      ],
      bullets: [
        "Best results: solid-color backgrounds, clear subject-background contrast, sharp focus",
        "Harder cases: flyaway hair, fur, glass, smoke, motion blur",
        "Shadows are usually removed along with the background, since they are not part of the subject",
      ],
    },
    {
      heading: "Transparent PNG vs. JPG: Why the Output Is Always PNG",
      paragraphs: [
        "This tool always outputs a PNG file, never a JPG, and that is a technical necessity rather than a choice: the JPEG format has no way to store transparency information for individual pixels, so a background-removed image can only exist as a JPG if the transparent area is filled in with a solid color first. PNG, by contrast, supports a full alpha (transparency) channel, so every pixel can be fully opaque, fully transparent, or anything in between.",
        "If you need the final image on a JPG background — for example, to place your product photo on a colored e-commerce listing background — the PNG with transparency is actually the more useful intermediate step: you can layer it over any background color or photo in any image editor or design tool afterward, which is far more flexible than baking in one specific background color at export time.",
      ],
    },
    {
      heading: "Uploading Photos with People, Products, and Animals",
      paragraphs: [
        "The isnet_quint8 model used here was trained broadly enough to handle the three most common real-world subjects: people (portraits and full-body shots), everyday objects and products, and animals. It does not need you to specify what kind of subject is in the photo — it detects the salient foreground object automatically, which is why the tool has no subject-type setting to configure.",
        "For product photography specifically, shooting on a plain white, gray, or single-color background before running it through the tool gives the model the clearest possible contrast to work with, which typically produces the cleanest edges and the least need for manual correction afterward.",
      ],
    },
    {
      heading: "File Size and Format Limits for Background Removal",
      paragraphs: [
        "This tool accepts JPG, PNG, and WebP images up to 10 MB, which covers the vast majority of photos taken on phones and cameras, as well as most images downloaded from the web. Because processing happens on your device rather than a server, very large images can take noticeably longer on older phones or laptops with less processing power, since the AI model's calculations scale with image resolution.",
        "If a very large photo is processing slowly, resizing it down to a more standard resolution (for example, 2000 pixels on the longest side) before uploading will usually speed up processing significantly with no visible loss in the quality of the final cutout, since most use cases (web, social media, product listings) do not need more resolution than that.",
      ],
    },
  ],
  useCases: [
    { title: "E-commerce product photos", description: "Remove distracting backgrounds from product photos so items look consistent across a storefront or marketplace listing." },
    { title: "Profile and headshot photos", description: "Isolate a person from a cluttered background to place them on a clean color for a resume, ID badge, or profile picture." },
    { title: "Social media graphics", description: "Cut out a subject to layer over branded backgrounds, promotional graphics, or templated social media post designs." },
    { title: "Presentation and design assets", description: "Extract objects or people from stock or personal photos to drop cleanly into slides, posters, or marketing materials." },
    { title: "Print-on-demand and merchandise mockups", description: "Prepare transparent artwork or photos that need to sit cleanly on top of a product mockup template." },
  ],
  mistakes: [
    { title: "Expecting perfect results on busy backgrounds", description: "Photos where the subject blends into a cluttered or similarly colored background give the AI less to work with and often need manual touch-up." },
    { title: "Not accounting for hair and fur detail", description: "Flyaway hair, fur, and semi-transparent edges are the hardest case for any AI segmentation model, including this one, and may need a quick manual fix." },
    { title: "Uploading a JPG when transparency is needed later", description: "The source format doesn't matter for output, but remember the result is always a PNG — flatten it onto a background color yourself if you need a JPG." },
    { title: "Skipping the first-load wait", description: "The first image you process downloads the AI model (about 10 MB) before running, which takes longer than expected; every image after that is much faster." },
  ],
  tips: [
    "Shoot or choose photos with a plain, contrasting background whenever possible for the cleanest automatic cutout.",
    "Resize very large photos to around 2000px on the longest side before uploading to speed up processing.",
    "Check edges closely on photos with hair, fur, or glass, since these are the areas most likely to need manual retouching.",
    "Keep the transparent PNG as your master file so you can place the subject on any background later without redoing the cutout.",
    "Process one test image first if you're on a slow connection, since the initial AI model download only has to happen once per browser.",
  ],
  glossary: [
    { title: "Image segmentation", description: "The AI task of classifying each pixel in an image as belonging to the foreground subject or the background." },
    { title: "Alpha channel", description: "The part of an image file that stores transparency information for each pixel, supported by PNG but not by JPEG." },
    { title: "WebAssembly (WASM)", description: "A technology that lets code, including AI models, run at near-native speed directly inside a web browser without a server." },
    { title: "Quantized model", description: "An AI model that has been shrunk in file size and computational cost by reducing the numerical precision of its internal calculations, at a small tradeoff in accuracy." },
    { title: "Mask", description: "A grayscale image the AI produces to indicate, pixel by pixel, how confident it is that each part of the image belongs to the subject versus the background." },
  ],
};

export default guide;
