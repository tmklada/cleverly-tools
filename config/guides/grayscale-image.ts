import type { ToolGuide } from "@/types/guide";

const guide: ToolGuide = {
  slug: "grayscale-image",
  intro: [
    "Converting a color photo to grayscale means recalculating every pixel's red, green, and blue values into a single gray value while keeping the full range of tones between black and white — it's not the same as reducing a photo to pure black-and-white with no gray at all. This grayscale image converter does that conversion directly in your browser, using the standard luminance-weighted formula that most professional photo software relies on, and shows the original and converted version side by side before you download the result.",
    "Alongside grayscale, the same tool also includes two related one-click filters — sepia, for a warm vintage tone, and invert, for a photographic-negative effect — all applied through the same pixel-by-pixel canvas processing. Switching between them updates the preview instantly without needing to re-upload the image.",
    "As with the other tools on this site, everything happens locally: the image is read into an HTML canvas, its pixel data is processed in your browser using the Canvas API's ImageData interface, and the result is exported as a downloadable file with nothing ever sent to a server.",
  ],
  sections: [
    {
      heading: "How to Convert a Photo to Black and White Properly (Luminance vs Average)",
      paragraphs: [
        "There are two common ways to turn a color pixel into a gray one. The naive method averages the red, green, and blue values equally: (R + G + B) / 3. The more accurate method, and the one this tool uses, applies weighted coefficients that match how the human eye actually perceives brightness: 0.299 x red + 0.587 x green + 0.114 x blue — the ITU-R BT.601 luma formula used broadly across broadcast and photo-editing software.",
        "The difference matters visually: human vision is far more sensitive to green than to blue, so a simple average tends to make green areas look darker than they should and blue areas look lighter than they should, relative to how the human eye actually reads brightness. The weighted formula corrects for that, which is why a photo converted this way generally looks more natural — matching the tonal balance you'd expect — than one converted with a flat average.",
        "This tool applies the weighted formula at full strength to every pixel; there's no partial-desaturation slider, so the grayscale filter is an all-or-nothing conversion rather than a dial you can tune between color and full grayscale.",
      ],
    },
    {
      heading: "Grayscale, Sepia, and Invert: The Three Filters Available",
      paragraphs: [
        "Grayscale, the default filter applied the moment you upload an image, removes all color information using the luminance formula above, leaving only tonal detail. Sepia applies a different weighted transform to each channel that pushes the image toward warm brown and amber tones, producing the aged, vintage-photograph look without any grayscale step in between.",
        "Invert flips every channel to its photographic negative — each of red, green, and blue becomes 255 minus its original value — which produces the classic negative-film effect rather than anything related to grayscale or sepia. All three filters are single-click toggles in the same button row; clicking a different one re-processes the original image with that filter rather than stacking effects on top of each other.",
      ],
    },
    {
      heading: "Grayscale for Print, Accessibility Testing and Design Mockups",
      paragraphs: [
        "Converting a design mockup or screenshot to grayscale is a fast, informal way to check whether an interface still communicates clearly without relying on color alone — a common accessibility concern, since color-blind users and grayscale printouts both lose the distinction between, say, a red 'error' badge and a green 'success' badge if nothing else differentiates them. If a grayscale version of a UI still makes sense at a glance, that's a good sign color isn't carrying information it shouldn't be carrying alone.",
        "For print, previewing a photo in grayscale before sending it to a black-and-white printer or a newspaper/flyer print run shows you exactly how the contrast and tonal range will actually reproduce, since some colors that look distinct on a screen collapse into very similar gray values once desaturated — a light blue and a light orange of similar brightness, for instance, can become nearly indistinguishable in grayscale even though they look completely different in color.",
      ],
    },
    {
      heading: "Does Grayscale Reduce File Size or Quality?",
      paragraphs: [
        "Removing color information doesn't reduce an image's pixel dimensions or resolution — the output has exactly the same width and height as the source, and no detail is lost in the sense of blurring or softening. What can change is compressed file size, and the direction of that change depends on the original format: a JPEG photo with lots of color noise sometimes compresses smaller once converted to grayscale PNG, since a limited tonal range can compress efficiently, but this isn't guaranteed and depends heavily on the specific image.",
        "It's also worth noting the browser's PNG export in this tool is lossless — it doesn't introduce compression artifacts the way re-saving a JPEG repeatedly can — so any file size difference you see comes from the format change and the image's own content, not from quality loss during the grayscale conversion itself.",
      ],
    },
    {
      heading: "Output Format: Why the Download Is Always a PNG",
      paragraphs: [
        "Regardless of whether you upload a JPG, PNG, or WebP file, the download button always saves the filtered result as a PNG, named after your original file with the filter appended — a photo called beach.jpg run through the grayscale filter downloads as beach-grayscale.png. This keeps the export lossless and consistent across every input format, but it does mean a compact JPEG will typically produce a larger PNG file after conversion.",
        "If the destination for the grayscale image needs a smaller file — a web page, an email, a size-limited upload form — run the downloaded PNG through a separate image compressor or converter afterward to bring the size back down or switch it to a different format.",
      ],
    },
  ],
  useCases: [
    { title: "Print preview before black-and-white printing", description: "Preview how a color photo's contrast and tonal range will actually look before sending it to a black-and-white printer or print publication." },
    { title: "Accessibility contrast checks", description: "Convert a UI screenshot or design mockup to grayscale to check whether it still communicates clearly without relying on color alone." },
    { title: "Classic and artistic photo styling", description: "Convert a color photo to grayscale, or apply the sepia filter, for a timeless or vintage look without any photo-editing software." },
    { title: "Composition and lighting critique", description: "Remove color from a photo to focus purely on composition, contrast, and lighting balance during a photography review." },
    { title: "Design mockups and print materials", description: "Prepare grayscale versions of graphics for newspapers, flyers, or any print run where color reproduction isn't available." },
    { title: "Creating a photographic negative effect", description: "Apply the invert filter to produce a negative-film look for creative or design purposes, separate from the grayscale conversion." },
  ],
  mistakes: [
    { title: "Expecting an intensity slider between color and grayscale", description: "This tool applies grayscale, sepia, or invert at full strength with a single click — there's no dial for a partial desaturation effect." },
    { title: "Assuming grayscale means only pure black and white pixels", description: "Grayscale preserves the full range of tones between black and white; converting to strictly two-tone black-and-white needs a separate thresholding step this tool doesn't offer." },
    { title: "Assuming the download keeps the original file format", description: "The result always exports as a PNG regardless of whether you uploaded a JPG or WebP, which can produce a larger file than the original." },
    { title: "Expecting grayscale conversion to shrink file size", description: "Removing color doesn't guarantee a smaller file — the final size depends on the image's content and the lossless PNG export, not the color removal itself." },
    { title: "Judging color contrast from a grayscale conversion alone", description: "A quick grayscale check is useful for spotting obvious issues, but it isn't a substitute for a full accessibility contrast-ratio audit against WCAG guidelines." },
  ],
  tips: [
    "Use the grayscale filter, not invert or sepia, when the goal is an accurate print preview or accessibility check.",
    "Check a design mockup in grayscale to catch places where color alone is carrying information a colorblind user would miss.",
    "Remember the output is always a PNG — run it through a compressor afterward if you need a smaller file.",
    "Switch between grayscale, sepia, and invert without re-uploading, since all three re-process the same original image.",
    "Expect green tones to read brighter and blue tones darker in the result, since the conversion weights channels the way human vision perceives brightness.",
    "Use sepia instead of grayscale when the goal is a warm vintage look rather than a neutral tonal check.",
  ],
  glossary: [
    { title: "Grayscale", description: "An image containing only shades of gray between black and white, with all color (hue and saturation) information removed but tonal detail preserved." },
    { title: "Luminance / Luma", description: "A weighted measure of perceived brightness calculated from a pixel's red, green, and blue values, using coefficients that reflect human vision's greater sensitivity to green." },
    { title: "Desaturation", description: "The process of reducing or removing color intensity from an image, with full desaturation producing a grayscale result." },
    { title: "Sepia", description: "A warm brown-and-amber toning effect applied to an image, traditionally associated with aged or vintage photographs." },
    { title: "Invert (negative)", description: "A filter that flips each color channel to its opposite value, producing a photographic-negative appearance." },
    { title: "ImageData", description: "The Canvas API interface this tool uses to read and modify an image's raw pixel values directly in the browser." },
  ],
};

export default guide;
