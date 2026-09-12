import type { ToolGuide } from "@/types/guide";

const guide: ToolGuide = {
  slug: "video-converter",
  intro: [
    "A video converter changes a video file from one format to another — say, an MOV recorded on an iPhone into an MP4 that plays everywhere, or a full video into an animated GIF you can drop into a chat or a webpage. This free online video converter does that work entirely inside your browser using FFmpeg, the same engine that powers most professional video software, compiled to run as WebAssembly instead of a server-side program. Upload a file, pick MP4, WebM, GIF, or MP3 as the output, and download the converted result once it finishes.",
    "Because the conversion happens on your own device, this tool is a good fit for anyone who doesn't want to install desktop software just to fix one file: a MOV that a video editor won't accept, an old AVI that a phone can't play, footage from a screen recording that needs to become a lightweight GIF, or a video where you only actually need the audio track. There's no account, no watermark, and no limit on how many files you convert.",
    "The tradeoff for doing this in the browser instead of on a server is that speed depends on your own device's processor rather than a data center's, and the very first conversion downloads a roughly 30 MB converter engine that your browser then caches for next time. For everyday clips under a minute or two, this is barely noticeable; for long or very large files, expect it to take real time and, on an older or budget device, to slow the browser down while it works.",
  ],
  sections: [
    {
      heading: "MP4 vs WebM vs GIF: Which Format to Choose",
      paragraphs: [
        "MP4, encoded here with the H.264 codec, is the safest general-purpose choice — it plays on virtually every phone, computer, smart TV, and video editor without extra setup, which makes it the right pick if you're not sure what the receiving end needs. WebM, using the VP8 codec, produces smaller files at a similar quality level and is well supported by modern browsers, which makes it a solid option for videos embedded directly on a website where file size affects load time.",
        "GIF is a completely different kind of output: it's built for short, silent, looping clips rather than full-length video, and it strips out audio entirely. Reach for GIF when you need a quick reaction clip, a looping product demo, or a screen-recording snippet to paste into a chat app or a support ticket, not as a substitute for a real video file.",
      ],
      bullets: [
        "MP4 (H.264): the default choice for maximum compatibility",
        "WebM (VP8): smaller file size, ideal for web embeds",
        "GIF: short silent loops for chats, docs, and quick previews",
        "MP3: audio-only extraction when the video part isn't needed",
      ],
    },
    {
      heading: "How to Convert Video to GIF Without Losing Too Much Quality",
      paragraphs: [
        "This tool converts to GIF at 10 frames per second and scales the width down to 480 pixels, which keeps file sizes reasonable since GIF is an inherently inefficient format for anything long or highly detailed. A ten-second clip at these settings typically lands somewhere between a few hundred kilobytes and a couple of megabytes, depending on how much motion and color variation the footage has.",
        "The single biggest thing you control is the length of the source clip you feed in: GIF file size grows roughly in proportion to duration, so a 30-second source video makes a noticeably heavier GIF than a 5-second one. If a GIF comes out looking blocky or muddy, the usual cause is busy, high-motion footage rather than a setting you can adjust here — trimming the clip to the essential few seconds before converting is the most effective fix.",
      ],
    },
    {
      heading: "Converting Video to MP3: Extracting Just the Audio",
      paragraphs: [
        "Choosing MP3 as the output strips the video track entirely and keeps only the audio, encoded at 192 kbps in stereo at a 44.1 kHz sample rate — a common, widely compatible setting that sounds clean for speech and most music without producing an oversized file. This is the fastest of the four output options, since there's no video frame data to re-encode, only the audio stream to pull out.",
        "This mode is useful whenever the video part was never the point: pulling a podcast segment out of a recorded video call, saving the audio from a music video to listen to without a screen, or converting a voice memo that happened to be recorded as video. The resulting MP3 works in any music player, phone, or car stereo.",
      ],
    },
    {
      heading: "Why the First Conversion Is Slow: How Browser-Based Conversion Works",
      paragraphs: [
        "Unlike a converter that uploads your file to a server and processes it there, this tool downloads a compact version of the FFmpeg engine directly into your browser the first time you use it, roughly 30 MB, and then runs every conversion locally from that point on. This is what keeps your video private — the file never leaves your device — but it does mean the very first conversion on a new browser or device takes a bit longer while that engine loads.",
        "After that initial load, the browser caches the engine files, so subsequent conversions in the same browser start almost immediately, skipping straight to processing your video. Clearing your browser cache, switching browsers, or using a private/incognito window will trigger that one-time download again.",
      ],
    },
    {
      heading: "Handling Large Video Files and Slow Conversions",
      paragraphs: [
        "Conversion speed and reliability depend on your device's own processor and available memory, since everything runs locally rather than on a remote server with dedicated hardware. Files under roughly 20 MB usually convert in well under a minute on a typical laptop or modern phone; files approaching the tool's 100 MB limit can take several minutes and use a noticeable amount of memory while processing.",
        "If a large file fails to convert or the browser tab becomes unresponsive, closing other tabs to free up memory, trying a lower target resolution or shorter clip, or switching to a desktop browser instead of a phone are the most reliable fixes. Very long recordings, like an hour of screen capture, are generally better trimmed down first in a lightweight editor before converting, both for speed and for keeping the output file a manageable size.",
      ],
    },
  ],
  useCases: [
    { title: "Fixing iPhone videos for editing software", description: "Convert an MOV file recorded on an iPhone into MP4 so it opens cleanly in video editors or platforms that don't handle Apple's native format well." },
    { title: "Making GIFs for chats and documentation", description: "Turn a short screen recording or clip into a looping GIF to paste into a Slack message, a bug report, or a how-to guide." },
    { title: "Shrinking video files for web embeds", description: "Convert a video to WebM to get a smaller file size for a website background video or product demo without a noticeable quality drop." },
    { title: "Extracting audio for offline listening", description: "Pull the MP3 audio out of a recorded interview, lecture, or music video when only the sound is needed, not the visuals." },
    { title: "Standardizing mixed footage before editing", description: "Convert a batch of clips recorded on different phones and cameras — MOV, AVI, MKV — into one consistent MP4 format before importing them into a single editing project." },
  ],
  mistakes: [
    { title: "Expecting audio in a converted GIF", description: "GIF is a silent, looping image format by definition; any audio in the source video is dropped automatically and cannot be included." },
    { title: "Converting a very long video straight to GIF", description: "Long clips produce oversized, sluggish GIF files; trim the source down to the essential seconds before converting for a manageable result." },
    { title: "Assuming the first conversion's slowness means something is broken", description: "The initial delay is the one-time download of the ~30 MB conversion engine, not a failure; later conversions in the same browser are much faster." },
    { title: "Uploading files well over the size limit", description: "Files approaching or exceeding 100 MB can fail or stall on lower-powered devices since everything processes using your own device's memory." },
    { title: "Using a private/incognito window for repeated conversions", description: "Private browsing clears the cached engine files each session, forcing the ~30 MB download to repeat every time." },
  ],
  tips: [
    "Choose MP4 by default unless you have a specific reason to need WebM, GIF, or MP3 instead.",
    "Trim clips down to just the necessary seconds before converting to GIF to keep the file size reasonable.",
    "Use a regular (non-incognito) browser tab so the FFmpeg engine stays cached between conversions.",
    "Close other browser tabs before converting a large file to free up memory for the process.",
    "Pick MP3 output when you only need the audio, instead of downloading and converting a full video file elsewhere.",
    "Keep source files under about 50 MB for the smoothest experience, especially on phones and older laptops.",
  ],
  glossary: [
    { title: "FFmpeg", description: "The open-source multimedia engine, compiled here as WebAssembly, that this tool uses to decode and re-encode video directly in your browser." },
    { title: "Codec", description: "The specific compression method used inside a video file, such as H.264 for MP4 or VP8 for WebM, which determines quality and compatibility." },
    { title: "WebAssembly (WASM)", description: "A technology that lets code originally written in languages like C run at near-native speed inside a web browser, making in-browser video conversion possible." },
    { title: "Bitrate", description: "The amount of data used per second of audio or video; MP3 output here uses 192 kbps, a common setting for clear sound at a reasonable file size." },
    { title: "Client-side processing", description: "Running a task entirely on your own device instead of uploading the file to a remote server, which is how this converter keeps your video private." },
  ],
};

export default guide;
