export interface ToolVariant {
  variantSlug: string;
  title: string;
  h1: string;
  description: string;
  intro: string;
  keywords: string[];
  extraFaq?: { question: string; answer: string }[];
}

export interface ToolVariants {
  toolSlug: string;
  variants: ToolVariant[];
}

const allVariants: ToolVariants[] = [
  // ─── FACEBOOK VIDEO DOWNLOADER ──────────────────────────────────
  {
    toolSlug: "facebook-video-downloader",
    variants: [
      {
        variantSlug: "iphone",
        title: "Facebook Video Downloader for iPhone — Free, No App",
        h1: "Download Facebook Videos on iPhone — Free",
        description: "Download Facebook videos directly on your iPhone without any app. Paste the link, tap download, save to Camera Roll. Works on iOS Safari.",
        intro: "Want to save a Facebook video on your iPhone? You don't need any app. Our [Facebook Video Downloader](/tools/facebook-video-downloader) works directly in Safari — paste the link and download in seconds.",
        keywords: ["facebook video downloader iphone", "download facebook video on iphone", "save facebook video ios", "facebook video saver iphone"],
      },
      {
        variantSlug: "android",
        title: "Facebook Video Downloader for Android — Free Online",
        h1: "Download Facebook Videos on Android — No App Needed",
        description: "Save Facebook videos to your Android phone for free. Works in Chrome browser — no app installation required. Download HD videos instantly.",
        intro: "Saving Facebook videos on Android is easy with our free [Facebook Video Downloader](/tools/facebook-video-downloader). No app download needed — works directly in Chrome.",
        keywords: ["facebook video downloader android", "download facebook video android", "save facebook video to phone", "facebook downloader apk free"],
      },
      {
        variantSlug: "hd",
        title: "Facebook HD Video Downloader — Download in 1080p Free",
        h1: "Download Facebook Videos in HD Quality — Free",
        description: "Download Facebook videos in HD or Full HD quality for free. Get the highest quality available — 720p, 1080p, or native HD. No registration.",
        intro: "Our [Facebook Video Downloader](/tools/facebook-video-downloader) fetches the best available quality — including native HD from Facebook's CDN. Get crystal-clear video downloads for free.",
        keywords: ["facebook hd video downloader", "download facebook video 1080p", "facebook video download hd quality", "facebook full hd downloader"],
      },
      {
        variantSlug: "reels",
        title: "Facebook Reels Downloader — Save Reels Free (2026)",
        h1: "Download Facebook Reels for Free",
        description: "Download Facebook Reels videos for free. Works with all public Reels — just paste the link and save in HD. No login required.",
        intro: "Facebook Reels can be saved just like regular videos. Use our free [Facebook Video Downloader](/tools/facebook-video-downloader) — paste any Reel link and download it instantly.",
        keywords: ["facebook reels downloader", "download facebook reels", "save facebook reels", "facebook reels video download free"],
      },
      {
        variantSlug: "mp4",
        title: "Download Facebook Videos as MP4 — Free Online Tool",
        h1: "Download Facebook Videos in MP4 Format — Free",
        description: "Save any Facebook video as an MP4 file for free. Compatible with all devices and video players. No conversion needed — direct MP4 download.",
        intro: "All videos downloaded with our [Facebook Video Downloader](/tools/facebook-video-downloader) are in MP4 format — the most compatible format for phones, computers, and TVs.",
        keywords: ["facebook video download mp4", "facebook to mp4", "download facebook video mp4 free", "save facebook video as mp4"],
      },
      {
        variantSlug: "without-watermark",
        title: "Facebook Video Downloader Without Watermark — Free",
        h1: "Download Facebook Videos Without Watermark",
        description: "Download clean Facebook videos with no watermarks. Get the original video directly from Facebook's servers — no logos, no overlays.",
        intro: "Unlike screen recording, our [Facebook Video Downloader](/tools/facebook-video-downloader) downloads the original video file directly — completely clean, no watermark.",
        keywords: ["facebook video downloader without watermark", "download facebook video no watermark", "facebook clean video download"],
      },
      {
        variantSlug: "online",
        title: "Online Facebook Video Downloader — Works in Browser",
        h1: "Facebook Video Downloader Online — No Software",
        description: "Download Facebook videos online without installing any software. Works in any browser on any device — just paste and download.",
        intro: "No software, no extension, no app. Our online [Facebook Video Downloader](/tools/facebook-video-downloader) works directly in your browser — paste the video URL and click Download.",
        keywords: ["online facebook video downloader", "facebook video downloader no software", "download facebook video browser", "facebook downloader web"],
      },
      {
        variantSlug: "private",
        title: "Can You Download Private Facebook Videos? — Guide 2026",
        h1: "Downloading Facebook Videos — Public vs Private",
        description: "Learn which Facebook videos can be downloaded and why private videos cannot. Free tool for downloading public Facebook videos in HD.",
        intro: "Many people ask if they can download private Facebook videos. The short answer: only **public** videos can be downloaded. Our [Facebook Video Downloader](/tools/facebook-video-downloader) works with all public videos.",
        keywords: ["download private facebook video", "facebook private video downloader", "can you download private facebook videos"],
        extraFaq: [
          { question: "Can I download private Facebook videos?", answer: "No. Private Facebook videos require login credentials to access. Tools that claim to download private videos are either scams or require your Facebook login, which is a serious security risk. Only public videos can be safely downloaded." },
        ],
      },
    ],
  },

  // ─── TIKTOK VIDEO DOWNLOADER ────────────────────────────────────
  {
    toolSlug: "tiktok-video-downloader",
    variants: [
      {
        variantSlug: "without-watermark",
        title: "TikTok Video Downloader Without Watermark — Free 2026",
        h1: "Download TikTok Videos Without Watermark — Free",
        description: "Remove TikTok watermark and download videos for free. Get clean MP4 files without the TikTok logo. Works on iPhone, Android, and PC.",
        intro: "The TikTok watermark ruins otherwise great videos. Our [TikTok Video Downloader](/tools/tiktok-video-downloader) downloads the original video file — clean, no watermark, in HD quality.",
        keywords: ["tiktok downloader without watermark", "tiktok no watermark download", "remove tiktok watermark free", "tiktok video without logo"],
      },
      {
        variantSlug: "iphone",
        title: "TikTok Video Downloader for iPhone — No Watermark Free",
        h1: "Download TikTok Videos on iPhone Without Watermark",
        description: "Save TikTok videos to your iPhone without the watermark. Works in Safari — no app needed. Download in HD quality instantly.",
        intro: "Saving TikTok videos on iPhone is simple. Open our [TikTok Downloader](/tools/tiktok-video-downloader) in Safari, paste the link, and save clean HD videos to your Camera Roll.",
        keywords: ["tiktok downloader iphone no watermark", "save tiktok video iphone", "download tiktok on ios", "tiktok video saver iphone"],
      },
      {
        variantSlug: "android",
        title: "TikTok Video Downloader for Android — Free No Watermark",
        h1: "Download TikTok Videos on Android Without Watermark",
        description: "Download TikTok videos on Android without watermark for free. Works in Chrome — no app needed. Save videos in HD quality.",
        intro: "No need to download a separate app. Our [TikTok Downloader](/tools/tiktok-video-downloader) works in Chrome on Android — paste the TikTok link and save without watermark.",
        keywords: ["tiktok downloader android no watermark", "download tiktok android free", "save tiktok video android", "tiktok apk downloader"],
      },
      {
        variantSlug: "mp3",
        title: "TikTok to MP3 — Download TikTok Audio Free",
        h1: "Download TikTok Audio as MP3 — Free Online",
        description: "Extract and download the audio from any TikTok video as MP3 for free. Get the music or sound from any public TikTok.",
        intro: "Want just the audio from a TikTok? Download the video first with our [TikTok Downloader](/tools/tiktok-video-downloader), then use a free video-to-audio converter. Or check our [YouTube to MP3](/tools/youtube-to-mp3) tool.",
        keywords: ["tiktok to mp3", "tiktok audio download", "download tiktok sound mp3", "tiktok mp3 extractor free"],
      },
      {
        variantSlug: "hd",
        title: "TikTok HD Video Downloader — Download in High Quality Free",
        h1: "Download TikTok Videos in HD Quality — Free",
        description: "Download TikTok videos in the highest quality available — HD without watermark. Get the original resolution video for free.",
        intro: "Our [TikTok Video Downloader](/tools/tiktok-video-downloader) fetches the highest available quality from TikTok's servers — giving you crisp HD video without any watermark.",
        keywords: ["tiktok hd download", "tiktok video download hd", "high quality tiktok downloader", "tiktok 1080p download"],
      },
      {
        variantSlug: "online",
        title: "Online TikTok Downloader — No App, No Watermark Free",
        h1: "Online TikTok Video Downloader — No App Needed",
        description: "Download TikTok videos online without installing any app. Works in any browser. Free, fast, no watermark.",
        intro: "Skip the app stores. Our online [TikTok Downloader](/tools/tiktok-video-downloader) works directly in your browser — copy the TikTok link, paste it, and download without watermark.",
        keywords: ["tiktok downloader online free", "online tiktok video saver", "tiktok download web browser", "tiktok no app download"],
      },
    ],
  },

  // ─── INSTAGRAM VIDEO DOWNLOADER ─────────────────────────────────
  {
    toolSlug: "instagram-video-downloader",
    variants: [
      {
        variantSlug: "reels",
        title: "Instagram Reels Downloader — Save Reels Free (2026)",
        h1: "Download Instagram Reels for Free",
        description: "Download Instagram Reels videos for free. Paste any public Reel link and save in HD quality. No login, no app needed.",
        intro: "Our free [Instagram Video Downloader](/tools/instagram-video-downloader) works with Reels, regular videos, and IGTV. Just paste the link from any public Instagram account.",
        keywords: ["instagram reels downloader", "download instagram reels", "save instagram reels free", "instagram reels video download"],
      },
      {
        variantSlug: "iphone",
        title: "Instagram Video Downloader for iPhone — Save Reels Free",
        h1: "Download Instagram Videos on iPhone — Free",
        description: "Save Instagram videos and Reels to your iPhone without any app. Works in Safari — just paste the link and download to Camera Roll.",
        intro: "Our [Instagram Downloader](/tools/instagram-video-downloader) works perfectly on iPhone in Safari. Paste any public Instagram video or Reel link and save it directly.",
        keywords: ["instagram video downloader iphone", "save instagram video ios", "download instagram reels iphone", "instagram downloader ios"],
      },
      {
        variantSlug: "android",
        title: "Instagram Video Downloader for Android — Free Online",
        h1: "Download Instagram Videos on Android — No App Needed",
        description: "Save Instagram videos and Reels to your Android phone for free. Works in Chrome — no app installation required.",
        intro: "No extra app needed. Our [Instagram Video Downloader](/tools/instagram-video-downloader) works in Chrome on Android — paste the Instagram link and download instantly.",
        keywords: ["instagram video downloader android", "save instagram video android", "download instagram reels android", "instagram apk downloader"],
      },
      {
        variantSlug: "without-watermark",
        title: "Instagram Video Downloader Without Watermark — Free",
        h1: "Download Instagram Videos Without Watermark — Free",
        description: "Download clean Instagram videos without any watermarks or overlays. Get the original video file directly — free, no registration.",
        intro: "Our [Instagram Video Downloader](/tools/instagram-video-downloader) downloads directly from Instagram's servers — you get the original clean video, no watermarks added.",
        keywords: ["instagram downloader without watermark", "download instagram video no watermark", "instagram clean video download"],
      },
    ],
  },

  // ─── YOUTUBE VIDEO DOWNLOADER ───────────────────────────────────
  {
    toolSlug: "youtube-video-downloader",
    variants: [
      {
        variantSlug: "mp3",
        title: "YouTube to MP3 Downloader — Convert & Download Free",
        h1: "Download YouTube Videos as MP3 — Free",
        description: "Convert and download YouTube videos as MP3 audio files for free. Extract music, podcasts, and audio from any YouTube video.",
        intro: "Want just the audio from a YouTube video? Use our [YouTube to MP3](/tools/youtube-to-mp3) tool or download the video with our [YouTube Downloader](/tools/youtube-video-downloader) and convert locally.",
        keywords: ["youtube to mp3", "youtube mp3 downloader", "download youtube audio free", "youtube converter mp3"],
      },
      {
        variantSlug: "1080p",
        title: "YouTube 1080p Downloader — Download HD Videos Free",
        h1: "Download YouTube Videos in 1080p HD — Free",
        description: "Download YouTube videos in 1080p Full HD quality for free. Get the best quality for offline viewing. No registration required.",
        intro: "Our [YouTube Video Downloader](/tools/youtube-video-downloader) gives you access to multiple quality options including 720p and 1080p HD — download the quality you need.",
        keywords: ["youtube 1080p downloader", "download youtube 1080p free", "youtube hd downloader 1080p", "youtube full hd download"],
      },
      {
        variantSlug: "shorts",
        title: "YouTube Shorts Downloader — Save Shorts Free (2026)",
        h1: "Download YouTube Shorts for Free",
        description: "Save YouTube Shorts videos for free. Paste any YouTube Shorts URL and download in HD quality — no app, no registration.",
        intro: "YouTube Shorts URLs work just like regular videos. Paste them into our [YouTube Downloader](/tools/youtube-video-downloader) and save them instantly.",
        keywords: ["youtube shorts downloader", "download youtube shorts", "save youtube shorts video", "youtube shorts download free"],
      },
      {
        variantSlug: "iphone",
        title: "YouTube Video Downloader for iPhone — Free, No App",
        h1: "Download YouTube Videos on iPhone — Free",
        description: "Save YouTube videos on iPhone without any app. Works in Safari — paste the link and download to your Camera Roll.",
        intro: "Downloading YouTube videos on iPhone is simple with our [YouTube Downloader](/tools/youtube-video-downloader). Open it in Safari, paste the URL, and save the video.",
        keywords: ["youtube downloader iphone", "download youtube video ios", "save youtube video iphone", "youtube downloader safari"],
      },
      {
        variantSlug: "mp4",
        title: "YouTube to MP4 — Download YouTube Videos as MP4 Free",
        h1: "Download YouTube Videos as MP4 — Free Online",
        description: "Convert YouTube videos to MP4 and download for free. Compatible with all devices and media players.",
        intro: "All videos from our [YouTube Downloader](/tools/youtube-video-downloader) are in MP4 format — the most compatible format for playing on any device.",
        keywords: ["youtube to mp4", "youtube mp4 downloader", "download youtube video mp4", "youtube convert mp4 free"],
      },
    ],
  },

  // ─── MERGE PDF ──────────────────────────────────────────────────
  {
    toolSlug: "merge-pdf",
    variants: [
      {
        variantSlug: "free",
        title: "Merge PDF Files Free — No Registration, No Limit",
        h1: "Merge PDF Files for Free — Unlimited",
        description: "Combine multiple PDF files into one for free. No file size limits, no registration, no watermarks. Works in browser.",
        intro: "Our [PDF Merger](/tools/merge-pdf) is completely free with no hidden limits. Combine as many PDFs as you need — all processing happens in your browser for privacy.",
        keywords: ["merge pdf free", "combine pdf files free online", "merge pdf no sign up", "free pdf merger online"],
      },
      {
        variantSlug: "online",
        title: "Merge PDF Online — Combine PDF Files in Your Browser",
        h1: "Merge PDF Online — No Download Required",
        description: "Combine PDF files online without downloading any software. Works in any browser on Windows, Mac, iPhone, and Android.",
        intro: "No software needed. Our online [PDF Merger](/tools/merge-pdf) works directly in your browser — drag, drop, and combine PDF files in seconds.",
        keywords: ["merge pdf online", "combine pdf online free", "merge pdf browser", "online pdf combiner"],
      },
      {
        variantSlug: "iphone",
        title: "Merge PDF on iPhone — Free Online Tool",
        h1: "How to Merge PDF Files on iPhone — Free",
        description: "Combine PDF files on your iPhone for free. Works in Safari — no app installation required. Merge unlimited PDFs.",
        intro: "Need to merge PDFs on your iPhone? Our [PDF Merger](/tools/merge-pdf) works in Safari — upload your files and combine them in seconds, right from your iPhone.",
        keywords: ["merge pdf iphone", "combine pdf on iphone", "merge pdf ios", "iphone pdf merger free"],
      },
      {
        variantSlug: "without-adobe",
        title: "Merge PDF Without Adobe — Free Alternative 2026",
        h1: "Merge PDFs Without Adobe Acrobat — Free",
        description: "Combine PDF files without Adobe Acrobat or any paid software. Free online tool that works instantly in your browser.",
        intro: "You don't need Adobe Acrobat to merge PDFs. Our free [PDF Merger](/tools/merge-pdf) does the same job — instantly, in your browser, for free.",
        keywords: ["merge pdf without adobe", "combine pdf without acrobat", "free adobe alternative pdf merger", "pdf merger no adobe"],
      },
    ],
  },

  // ─── IMAGE CONVERTER ─────────────────────────────────────────────
  {
    toolSlug: "image-converter",
    variants: [
      {
        variantSlug: "jpg-to-png",
        title: "JPG to PNG Converter — Free Online, No Quality Loss",
        h1: "Convert JPG to PNG Online — Free",
        description: "Convert JPG images to PNG format for free online. No quality loss, transparent background support. Instant conversion.",
        intro: "Converting JPG to PNG takes one click with our [Image Converter](/tools/image-converter). Upload your JPG, select PNG as output, and download instantly — free.",
        keywords: ["jpg to png converter", "convert jpg to png free", "jpg to png online", "jpeg to png converter"],
      },
      {
        variantSlug: "png-to-jpg",
        title: "PNG to JPG Converter — Reduce File Size Free Online",
        h1: "Convert PNG to JPG Online — Free",
        description: "Convert PNG images to JPG format for free. Reduce file size significantly. Adjust quality and download instantly.",
        intro: "Need to convert PNG to JPG? Our [Image Converter](/tools/image-converter) handles it instantly — just upload your PNG, select JPG, and download the compressed file.",
        keywords: ["png to jpg converter", "convert png to jpg free", "png to jpeg online", "png to jpg online free"],
      },
      {
        variantSlug: "webp-to-jpg",
        title: "WebP to JPG Converter — Free Online Tool 2026",
        h1: "Convert WebP to JPG — Free Online",
        description: "Convert WebP images to JPG format for free. Compatible with all devices and apps. Instant conversion, no registration.",
        intro: "WebP files aren't always compatible with older apps. Use our [Image Converter](/tools/image-converter) to convert WebP to JPG instantly — free, in your browser.",
        keywords: ["webp to jpg converter", "convert webp to jpg free", "webp to jpeg online", "webp converter"],
      },
      {
        variantSlug: "jpg-to-webp",
        title: "JPG to WebP Converter — Reduce Image Size Free",
        h1: "Convert JPG to WebP — Free Online",
        description: "Convert JPG images to WebP format to reduce file size by up to 30%. Perfect for web optimization. Free online tool.",
        intro: "WebP images load faster on websites. Convert your JPG to WebP with our [Image Converter](/tools/image-converter) and reduce file size without losing quality.",
        keywords: ["jpg to webp converter", "convert jpg to webp free", "jpeg to webp online", "image to webp converter"],
      },
    ],
  },

  // ─── BMI CALCULATOR ─────────────────────────────────────────────
  {
    toolSlug: "bmi-calculator",
    variants: [
      {
        variantSlug: "metric",
        title: "BMI Calculator Metric — Calculate BMI in kg and cm",
        h1: "BMI Calculator — Metric (kg/cm)",
        description: "Calculate your BMI using metric units (kg and cm). Get instant results with health category classification. Free online tool.",
        intro: "Our [BMI Calculator](/tools/bmi-calculator) supports both metric (kg/cm) and imperial (lbs/inches) units. Select metric for instant, accurate results.",
        keywords: ["bmi calculator metric", "bmi calculator kg cm", "body mass index metric", "bmi in kg and cm"],
      },
      {
        variantSlug: "women",
        title: "BMI Calculator for Women — Healthy Weight Range",
        h1: "BMI Calculator for Women",
        description: "Calculate your BMI as a woman. Get your healthy weight range and BMI classification. The same formula applies to men and women.",
        intro: "BMI is calculated the same way for women and men: weight divided by height squared. Use our [BMI Calculator](/tools/bmi-calculator) to get your result and healthy weight range.",
        keywords: ["bmi calculator women", "bmi calculator female", "healthy bmi for women", "normal bmi range women"],
      },
      {
        variantSlug: "men",
        title: "BMI Calculator for Men — Check Your Healthy Weight",
        h1: "BMI Calculator for Men",
        description: "Calculate BMI for men. Find out if you're at a healthy weight, overweight, or underweight. Free, instant results.",
        intro: "Use our [BMI Calculator](/tools/bmi-calculator) to calculate your BMI as a man. Enter your height and weight to get your BMI and healthy weight range.",
        keywords: ["bmi calculator men", "bmi calculator male", "healthy bmi for men", "normal bmi range men"],
      },
    ],
  },
];

export function getAllVariants(): { toolSlug: string; variantSlug: string }[] {
  return allVariants.flatMap(tv =>
    tv.variants.map(v => ({ toolSlug: tv.toolSlug, variantSlug: v.variantSlug }))
  );
}

export function getVariant(toolSlug: string, variantSlug: string): ToolVariant | undefined {
  return allVariants
    .find(tv => tv.toolSlug === toolSlug)
    ?.variants.find(v => v.variantSlug === variantSlug);
}

export function getVariantsForTool(toolSlug: string): ToolVariant[] {
  return allVariants.find(tv => tv.toolSlug === toolSlug)?.variants ?? [];
}

export { allVariants };
