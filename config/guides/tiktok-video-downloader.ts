import type { ToolGuide } from "@/types/guide";

const guide: ToolGuide = {
  slug: "tiktok-video-downloader",
  intro: [
    "A TikTok video downloader lets you save any public TikTok video as a standalone MP4 file, stripped of the spinning TikTok watermark that normally gets stamped in the corner when you share a clip through the app. Instead of screen-recording or relying on a shaky in-app save button, you paste the video's link into the tool and it fetches the original file straight from TikTok's servers. This TikTok downloader works entirely in your browser, so there is nothing to install and no account to create.",
    "This kind of tool is built for people who need the actual file, not just a link: creators repurposing their own TikToks into YouTube Shorts or Instagram Reels, marketers saving trending videos for research, and anyone who wants to keep a copy of a video before it disappears from the app. It is just as useful for casual users who simply want to save a funny clip a friend sent them for offline viewing on a flight or in an area with no signal.",
    "Using a browser-based downloader instead of a dedicated app has real advantages. There is no APK to sideload on Android, no App Store listing riddled with ads and fake reviews, and no permissions requested beyond what your browser already has. You get the same result on an iPhone, an Android phone, a Windows PC, or a Mac, using whichever browser you already have open, and you never hand over your TikTok login to a third party.",
  ],
  sections: [
    {
      heading: "How to Download TikTok Videos Without Watermark on iPhone",
      paragraphs: [
        "On an iPhone, open the TikTok app and find the video you want to save. Tap the Share arrow on the right side of the screen, then tap 'Copy Link' from the row of icons. Switch to Safari, open this page, and paste the link into the input box. Tap Download, and the tool will process the video and generate a clean MP4 version with no TikTok logo overlay.",
        "iOS handles downloads differently than Android, so after tapping the download button Safari may open the file in a new tab instead of saving it automatically. Tap the Share icon in that preview and choose 'Save Video' to add it to your Camera Roll, or 'Save to Files' to keep it in the Files app under Downloads. Either way, the watermark-free MP4 is now stored locally on your phone.",
      ],
      bullets: [
        "Open the TikTok video and tap Share > Copy Link",
        "Paste the link into the downloader and tap Download",
        "Wait for the no-watermark MP4 to generate",
        "Tap Share > Save Video to add it to your Camera Roll",
      ],
    },
    {
      heading: "Where Do Downloaded TikTok Videos Go on Android?",
      paragraphs: [
        "On Android, open Chrome, paste the copied TikTok link into the tool, and tap Download. Chrome shows a small notification at the bottom of the screen once the MP4 finishes saving. Unlike iPhones, Android saves the file directly to internal storage without an extra confirmation step, which makes the process a bit faster.",
        "The video lands in your phone's main Download folder, which you can browse through the Files by Google app or the manufacturer's own Files/My Files app. On Samsung phones running One UI, the Gallery app usually picks up new videos from the Download folder automatically; on Pixel and other stock Android phones, you may need to open Files and move the video into your Pictures or Movies folder to see it in the gallery.",
      ],
    },
    {
      heading: "How to Download TikTok Videos on Windows or Mac",
      paragraphs: [
        "On a desktop or laptop, open TikTok in your browser, click the Share icon on the video, and choose 'Copy link'. Paste that link into the downloader and click Download. Because desktop browsers do not restrict downloads the way mobile Safari does, the MP4 saves straight to your default Downloads folder, typically C:\\Users\\YourName\\Downloads on Windows or ~/Downloads on a Mac.",
        "This is the fastest route for creators who edit in tools like CapCut, Premiere Pro, or Final Cut, since you need the raw MP4 file on your computer rather than just a link. No TikTok downloader software or browser extension is required; any modern version of Chrome, Edge, Firefox, or Safari on desktop will handle the file correctly.",
      ],
    },
    {
      heading: "Why Some TikTok Videos Won't Download (Private Accounts, Removed Clips, Expired Links)",
      paragraphs: [
        "This tool only works with public TikTok videos. If an account is set to private, TikTok blocks anyone who is not an approved follower from viewing the video at all, and no downloader, including this one, can bypass that. If a video has been deleted or taken down for a policy violation, the link simply points to nothing anymore.",
        "Two other common failures are worth knowing about. Short links that start with vm.tiktok.com sometimes expire or get reused, so if a download fails, reopen the TikTok app and copy a fresh link. TikTok LIVE broadcasts and photo-mode slideshows also are not standard video files, so they will not download the same way a regular TikTok clip does.",
      ],
    },
    {
      heading: "Is It Legal to Download TikTok Videos? Copyright Basics",
      paragraphs: [
        "Every video on TikTok is still the property of the person who made it, even after you download it. Saving a copy for personal, offline use, like keeping your own posted videos as a backup, or watching a friend's clip without an internet connection, is generally fine. What is not fine is re-uploading someone else's TikTok as your own or using it commercially without permission.",
        "If you plan to reuse a clip in a video essay, react to it, or quote it for commentary, credit the original creator and keep the use limited, which is closer to how fair use is typically applied. When in doubt, message the creator and ask; most people are happy to grant permission for a shoutout.",
      ],
    },
  ],
  useCases: [
    { title: "Backing up your own TikToks", description: "Creators download their own posted videos to keep a local, watermark-free archive in case an account gets suspended, deleted, or a video gets taken down unexpectedly." },
    { title: "Repurposing content for other platforms", description: "Save a TikTok you made and re-upload it to YouTube Shorts or Instagram Reels without the spinning TikTok logo covering the corner of the frame." },
    { title: "Offline viewing while traveling", description: "Download a clip a friend or family member shared with you so you can watch it on a flight, on the subway, or anywhere without a signal." },
    { title: "Saving marketing research", description: "Marketers and social media managers keep local copies of trending TikToks for team presentations, mood boards, or campaign inspiration decks." },
    { title: "Classroom and training use", description: "Teachers save their own educational TikTok clips so they can play them from a laptop during a lesson without relying on classroom Wi-Fi." },
  ],
  mistakes: [
    { title: "Copying the profile link instead of the video link", description: "Pasting a link to someone's whole TikTok profile will not work; you need the link to the specific video, copied from that video's own Share button." },
    { title: "Using an expired short link", description: "vm.tiktok.com links can stop working after being shared around; if a download fails, go back into the app and copy a fresh link." },
    { title: "Assuming private videos will work", description: "No downloader can access a private account's videos without logging in as an approved follower; this is a TikTok restriction, not a tool limitation." },
    { title: "Installing a third-party TikTok APK", description: "Sideloaded 'no watermark' apps from outside the App Store or Play Store often bundle ads or malware; a browser-based tool needs no installation at all." },
    { title: "Expecting photo slideshows to download as MP4", description: "TikTok photo-mode posts are a slideshow of images with music, not a single video file, so they behave differently from a normal downloaded clip." },
  ],
  tips: [
    "Copy the link from the individual video's Share button, never from a TikTok profile page.",
    "If a download fails, reopen TikTok and copy a fresh link since short links can expire.",
    "On iPhone, use the Share sheet's 'Save Video' option to move the file into your Camera Roll.",
    "On Android, check your Files app's Download folder if a saved video doesn't show up in Gallery right away.",
    "Never enter your TikTok username or password into a downloader site; a legitimate tool only ever needs the public video link.",
    "Keep downloaded clips organized in a dedicated album so they don't get lost in your camera roll.",
  ],
  glossary: [
    { title: "Watermark", description: "The small TikTok logo and username that overlays a video whenever it's shared or saved through the official app." },
    { title: "MP4", description: "The standard video file format used for TikTok downloads, playable on virtually any phone, tablet, or computer." },
    { title: "Vertical video (9:16)", description: "The tall, portrait-orientation aspect ratio TikTok videos are recorded in, matching a phone screen held upright." },
    { title: "Short link", description: "A shortened vm.tiktok.com web address TikTok generates when you tap Share > Copy Link; it can expire over time." },
    { title: "Bitrate", description: "The amount of data used per second of video; a higher bitrate generally means sharper detail but a larger file size." },
  ],
};

export default guide;
