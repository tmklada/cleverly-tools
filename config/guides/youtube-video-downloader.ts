import type { ToolGuide } from "@/types/guide";

const guide: ToolGuide = {
  slug: "youtube-video-downloader",
  intro: [
    "A YouTube video downloader turns any public YouTube link into a video file you can keep on your own device, instead of a page that only plays while you have an internet connection. Paste the URL from the address bar or the Share button into the box above, pick a resolution, and the tool builds a direct download link to the video file itself. There is no browser extension to install, no desktop program to run, and no YouTube account required to use it.",
    "This kind of YouTube to MP4 downloader is built for very ordinary situations: saving a tutorial you want to watch again without hunting for it later, downloading a lecture before a long flight with no Wi-Fi, or keeping a personal copy of a video you made yourself before it gets taken down or age-restricted. It also works for pulling just the audio out of a music video or podcast clip as an MP3, when all you actually want is the sound.",
    "Because everything runs through your browser, the process looks the same whether you're on an iPhone, an Android phone, a Chromebook, or a full Windows or Mac desktop. You get the video file, not a shady app that asks for permissions it has no business needing, and you never have to hand over your Google or YouTube login to use it.",
  ],
  sections: [
    {
      heading: "How to Download YouTube Videos on iPhone Without an App",
      paragraphs: [
        "Open the YouTube app on your iPhone, find the video, and tap the Share icon under the video player. Choose 'Copy Link' from the row of sharing options, then switch to Safari and open this page. Paste the link into the input field and tap the download button; the tool will process the video and show you a list of available resolutions to choose from.",
        "iOS Safari does not save files the same way desktop browsers do. After you tap a quality option, the video usually opens for preview in a new tab instead of saving straight to your phone. Tap the Share icon on that preview screen and choose 'Save Video' to send it to your Camera Roll, or 'Save to Files' if you'd rather keep it in the Files app instead of your photo library.",
      ],
      bullets: [
        "Open the video in the YouTube app and tap Share > Copy Link",
        "Paste the link into the tool in Safari and choose a quality",
        "Tap Share > Save Video to add it to your Camera Roll",
      ],
    },
    {
      heading: "How to Download YouTube Videos on Android and Desktop",
      paragraphs: [
        "On Android, copy the video link the same way (tap Share under the player, then Copy Link), open Chrome, paste it into the tool, and tap Download. Android saves the file straight to internal storage with a small notification at the bottom of the screen, and you'll find it afterward in the Files by Google app or your phone maker's own file manager, usually inside the main Download folder.",
        "On a Windows PC or Mac, copy the URL straight from the browser's address bar while watching the video on youtube.com. Desktop browsers don't add the extra confirmation step mobile Safari does, so the file drops directly into your default Downloads folder — normally C:\\Users\\YourName\\Downloads on Windows or ~/Downloads on macOS — ready to drag into a video editor or media player.",
      ],
    },
    {
      heading: "YouTube Shorts vs Regular Videos: What Can Be Downloaded",
      paragraphs: [
        "Regular YouTube videos and YouTube Shorts both use the same underlying watch page, just in different aspect ratios, so both types of links work with this tool. A Shorts URL looks like youtube.com/shorts/ followed by a video ID; paste it in exactly the same way as a normal video link and pick a quality from the results.",
        "The main practical difference is the shape of the file you get back. Regular videos are typically 16:9 landscape, while Shorts are 9:16 vertical, matching how they were filmed and uploaded. If you're planning to reuse a downloaded Short in another vertical app like Instagram Reels or TikTok, no extra cropping is needed since the aspect ratio already matches.",
      ],
    },
    {
      heading: "1080p vs 720p vs 4K: Choosing Quality and File Size",
      paragraphs: [
        "The available quality options depend entirely on what resolution the uploader originally published, not on this tool. A video uploaded in 4K will offer a 2160p option alongside 1080p and 720p, while an older or lower-effort upload might cap out at 480p no matter which option you click. Always check the resolution list the tool returns before assuming a higher quality exists.",
        "Higher resolution means a noticeably larger file: a ten-minute 1080p video commonly lands somewhere between 100 and 300 MB, while the same clip in 4K can run well over a gigabyte. For anything you mainly plan to watch on a phone screen, 720p is usually indistinguishable from 1080p in practice and downloads noticeably faster, which is worth considering on a slower connection or limited mobile data plan.",
      ],
      bullets: [
        "4K/2160p: largest files, best for big screens or archiving your own work",
        "1080p: the practical sweet spot for most phones, tablets, and laptops",
        "720p: smaller files, fine for casual viewing on a small screen",
      ],
    },
    {
      heading: "Why Some YouTube Videos Won't Download (Private, Age-Restricted, Livestreams)",
      paragraphs: [
        "This tool only works on videos that are publicly viewable on YouTube without signing in. If a video is set to private or unlisted-with-restrictions, or belongs to a channel that has membership-only content, the tool cannot reach it, because it never uses a personal login and only fetches what YouTube's own servers serve publicly.",
        "Two other common failure points are age-restricted videos, which YouTube gates behind a sign-in and date-of-birth check, and content that is still live. A livestream that is currently broadcasting is not a finished file yet; wait until the stream ends and YouTube finishes processing the recorded version (usually a few minutes to a few hours later) before trying to download it.",
      ],
    },
    {
      heading: "Is It Legal to Download YouTube Videos? Copyright Basics",
      paragraphs: [
        "The person or channel that uploaded a video keeps the copyright to it after you download a copy, exactly the same as before. Saving a video you made yourself, or one you have explicit permission to keep, or one released under a Creative Commons license, is straightforward and low-risk. Downloading a music video, a movie trailer, or a copyrighted TV clip purely for private offline viewing is a legal gray area in most places and is generally tolerated, but re-uploading that same file anywhere else is not.",
        "Where this crosses a clear line is redistribution: posting a downloaded video on another platform, selling it, or using it in a monetized project without the creator's permission. If you want to reuse someone else's footage publicly, look for videos explicitly marked Creative Commons in YouTube's filters, or contact the creator directly and ask.",
      ],
    },
  ],
  useCases: [
    { title: "Offline viewing on flights and commutes", description: "Save a lecture, documentary, or tutorial before boarding a plane or heading underground where there's no signal, and watch it later without buffering." },
    { title: "Backing up your own channel", description: "Creators keep local MP4 copies of videos they've published, as insurance against an account issue, a copyright claim, or accidental deletion." },
    { title: "Extracting audio from music or podcast videos", description: "Convert a music video or interview to MP3 when you only want the audio track, for listening in the car or on a workout." },
    { title: "Saving study material", description: "Students download recorded lectures, walkthroughs, or how-to guides to review offline while studying without needing a live connection." },
    { title: "Archiving Creative Commons footage", description: "Video editors save CC-licensed clips locally so the footage is available for editing software that needs a file rather than a streaming link." },
    { title: "Reviewing content for team presentations", description: "Marketers and educators keep local copies of relevant videos to play reliably from a laptop during a meeting or class, without relying on venue Wi-Fi." },
  ],
  mistakes: [
    { title: "Pasting a playlist link instead of a video link", description: "A playlist URL points to a whole collection, not one file; open the specific video first and copy that video's own link." },
    { title: "Expecting 4K on a video that was never uploaded in 4K", description: "The available resolutions come from the original upload; this tool cannot invent detail that isn't in the source file." },
    { title: "Trying to download a video that's still live", description: "Livestreams need to finish and finish processing on YouTube's end before a downloadable file exists." },
    { title: "Downloading copyrighted music for redistribution", description: "Saving a copy for personal offline listening is one thing; re-uploading or sharing someone else's copyrighted music elsewhere is a separate issue." },
    { title: "Assuming age-restricted or members-only videos will work", description: "Content gated behind YouTube's own sign-in requirements can't be reached by a tool that never logs into an account." },
  ],
  tips: [
    "Copy the link from the individual video's Share button or the browser address bar, not from a playlist or channel page.",
    "Check the list of available resolutions before assuming 4K exists for a given video.",
    "Pick 720p instead of 1080p or 4K when you're only watching on a phone, to save time and storage.",
    "Wait until a livestream has fully ended before trying to download the recorded version.",
    "Use the MP3 option when you only need the audio, instead of downloading and converting a full video file yourself.",
    "Keep downloaded videos organized in dated folders if you're archiving your own channel regularly.",
  ],
  glossary: [
    { title: "Resolution", description: "The pixel dimensions of a video, such as 1080p or 4K (2160p); higher numbers mean sharper detail and larger file sizes." },
    { title: "MP4", description: "The most widely supported video container format, playable on virtually every phone, tablet, computer, and smart TV." },
    { title: "YouTube Shorts", description: "YouTube's short-form vertical video format, similar in shape and length to TikTok or Instagram Reels clips." },
    { title: "Creative Commons (CC BY)", description: "A license some YouTube uploaders apply that allows others to reuse and even remix their video, usually with credit required." },
    { title: "Bitrate", description: "How much data is used per second of video; a higher bitrate at the same resolution generally means better detail but a bigger file." },
    { title: "Age-restricted content", description: "Videos YouTube hides behind a sign-in and age check, which a browser-based downloader with no login cannot access." },
  ],
};

export default guide;
