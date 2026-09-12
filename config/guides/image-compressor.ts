import type { ToolGuide } from "@/types/guide";

const guide: ToolGuide = {
  slug: "image-compressor",
  intro: [
    "Image compression reduces the file size of a JPG, PNG, or WebP photo by removing redundant or less visually important data, so the picture takes up less storage space and transfers faster over a network. For most everyday photos, a large portion of the file size can be removed with no change visible to the human eye, because cameras and phones tend to save far more raw detail than a screen can actually display.",
    "This image size reducer is built for web developers optimizing page load speed, online sellers uploading product photos, and anyone tired of hitting upload limits on email, forms, or content management systems. A quality slider lets you choose exactly how much to compress, so you can trade a small amount of visual quality for a much smaller file when that tradeoff makes sense.",
    "All compression happens directly in your browser using the browser-image-compression JavaScript library, running in a background thread so the page stays responsive even on larger images. Your photo is never uploaded to a server — it is read, compressed, and handed back to you for download entirely on your own device, which keeps personal or proprietary images private.",
  ],
  sections: [
    {
      heading: "JPEG vs. PNG vs. WebP: Which Compresses Better?",
      paragraphs: [
        "JPEG uses lossy compression designed for photographs with smooth color gradients, and it typically achieves the smallest file sizes for photos, often 60-90% smaller than an uncompressed original at moderate quality settings. It is not suited to images with sharp text or flat colors, where it can introduce visible blocky artifacts around hard edges.",
        "PNG uses lossless compression and preserves transparency, which makes it the right choice for logos, icons, screenshots, and graphics with flat colors or text — but PNG files are usually much larger than JPEGs for actual photographs, since lossless compression cannot discard visual detail the way JPEG does.",
        "WebP is a newer format that generally produces smaller files than both JPEG and PNG at equivalent visual quality, often 25-35% smaller than a comparable JPEG, and it supports transparency like PNG. Its main limitation is that some older software and a small number of legacy systems still do not support it, so JPEG remains the safer default for maximum compatibility.",
      ],
    },
    {
      heading: "Image Compression for Websites: Target Sizes and Core Web Vitals",
      paragraphs: [
        "Image weight is one of the biggest factors in how fast a webpage loads, and it directly affects Largest Contentful Paint (LCP), a Core Web Vitals metric Google uses in search ranking. As a practical target, a hero image on a webpage should generally stay under 200-300 KB, and thumbnail or product-grid images should stay well under 100 KB, since a typical page loads many images at once.",
        "Beyond compression quality, image dimensions matter just as much: uploading a 4000-pixel-wide photo to display in a 400-pixel-wide box on a page wastes bandwidth regardless of compression level, because the browser still has to download the full file before scaling it down. Resizing an image to the dimensions it will actually be displayed at, before or during compression, is often more impactful than adjusting the quality slider alone.",
      ],
      bullets: [
        "Hero/banner images: aim for under 200-300 KB",
        "Thumbnails and product grid images: aim for under 100 KB",
        "Resize to actual display dimensions before compressing, not after",
      ],
    },
    {
      heading: "How the Quality Slider Affects File Size and Detail",
      paragraphs: [
        "The quality slider in this tool controls how aggressively the compression algorithm discards fine image detail, from 10% (maximum compression, most quality loss) to 100% (minimum compression, closest to the original). For most photographs, quality settings between 70% and 85% produce a file that is dramatically smaller than the original while looking nearly identical at normal viewing size, which is why that range is a reasonable starting point for most images.",
        "Pushing the slider below roughly 50% starts to introduce visible artifacts on most photos — blockiness in smooth areas like skies or skin tones, and blurring around fine detail — so that range is best reserved for cases like thumbnails or background images where the image will be displayed very small and full detail is not needed.",
      ],
    },
    {
      heading: "Compressing Multiple Images and Keeping Original Resolution",
      paragraphs: [
        "This tool keeps the original pixel dimensions of your image by default (it does not resize the photo, only re-encodes it), so a 4000x3000 photo stays 4000x3000 pixels after compression, just at a smaller file size. This is useful when you need the compressed file to still print or display at full resolution later, but it means compression alone won't help if the real problem is that an image's dimensions are far larger than needed for its use case.",
        "Compression is processed one image at a time through the quality slider and download button, which keeps the workflow simple and predictable — you can immediately compare the before-and-after file size for each image before deciding whether to adjust the quality and try again.",
      ],
    },
    {
      heading: "Lossy Compression and When to Avoid It",
      paragraphs: [
        "Lossy compression, which both JPEG and WebP use, permanently discards some image information every time it is applied, which is why repeatedly compressing an already-compressed JPEG (compress, edit, compress again) gradually degrades quality — a phenomenon known as generation loss. It's best practice to keep an uncompressed or lightly compressed master copy of any important photo and only compress a fresh copy each time you need a smaller file for a specific use.",
        "For images where perfect pixel accuracy matters — screenshots used for technical documentation, medical or scientific images, or graphics with fine text — PNG's lossless compression, even at a larger file size, is usually the safer choice over aggressive lossy compression.",
      ],
    },
  ],
  useCases: [
    { title: "Website and blog images", description: "Shrink photos before uploading to a website or CMS to improve page load speed and Core Web Vitals scores." },
    { title: "Email attachments", description: "Reduce photo file sizes so they fit within email attachment limits without needing to send a cloud storage link." },
    { title: "E-commerce product photos", description: "Compress product images for faster storefront loading while keeping enough visual quality for customers to trust the listing." },
    { title: "Social media and messaging", description: "Reduce upload times on slower connections by compressing photos before sharing them on apps with data limits." },
    { title: "App and game assets", description: "Shrink texture and UI images to reduce the download size of a web or mobile application." },
  ],
  mistakes: [
    { title: "Compressing without resizing first", description: "If an image's dimensions are much larger than where it will be displayed, compressing alone leaves unnecessary file weight — resize to the actual display size too." },
    { title: "Choosing PNG for photographs", description: "PNG's lossless compression keeps photos far larger than JPEG or WebP would for the same visual result; reserve PNG for logos, icons, and graphics with transparency." },
    { title: "Repeatedly re-compressing the same JPEG", description: "Each lossy compression pass discards a bit more detail; always compress from an original or lightly-compressed source, not from a file already compressed multiple times." },
    { title: "Setting quality too low for the use case", description: "Dropping below 50% quality is fine for a small thumbnail but often shows visible artifacts on a large, prominently displayed photo." },
  ],
  tips: [
    "Start with a quality setting around 75-80% and adjust from there based on how the compressed image looks at full size.",
    "Resize an image to its actual display dimensions before compressing for the biggest realistic file size reduction.",
    "Use WebP for websites when broad legacy browser support isn't a concern, since it typically beats JPEG at the same quality.",
    "Keep PNG for screenshots, logos, and graphics with transparency or sharp text rather than photographs.",
    "Always keep an original, uncompressed copy of important photos so you can re-compress from source instead of compressing an already-compressed file.",
  ],
  glossary: [
    { title: "Lossy compression", description: "A compression method that permanently discards some image data to achieve a smaller file size, used by JPEG and WebP." },
    { title: "Lossless compression", description: "A compression method that reduces file size without discarding any image data, used by PNG." },
    { title: "Core Web Vitals", description: "A set of metrics Google uses to measure page experience, including Largest Contentful Paint, which is directly affected by image file sizes." },
    { title: "Generation loss", description: "The gradual quality degradation that occurs when a lossy-compressed file is repeatedly re-compressed." },
    { title: "WebP", description: "A modern image format developed by Google that generally produces smaller files than JPEG or PNG at similar visual quality." },
  ],
};

export default guide;
