import type { ToolGuide } from "@/types/guide";

const guide: ToolGuide = {
  slug: "facebook-video-downloader",
  intro: [
    "A Facebook video downloader lets you save any public Facebook video, from a Page, a friend's timeline, or Facebook Watch, as an MP4 file you can keep and play without needing an internet connection or the Facebook app open. Instead of trying to screen-record a video mid-scroll, you copy the video's link and let the tool pull the actual file. This facebook video downloader works for anyone who wants to download facebook video content quickly, whether that's a recipe video, a live replay, or a Reel.",
    "It's built for people who need more than a fleeting view: small business owners saving their own Page's promotional videos, family members archiving a video shared in a group before it gets buried in the feed, and researchers or journalists who need an offline copy of a public video as reference. Anyone who wants to save facebook video content for later, without depending on the News Feed algorithm to resurface it, benefits from a dedicated tool.",
    "A browser-based fb video downloader beats installing a dedicated app for one simple reason: Facebook's own app does not offer a built-in save button for most videos, so third-party apps that promise this often require excessive permissions or push ads. Pasting a link into a web tool needs no installation, no login to Facebook, and works identically on an iPhone, an Android phone, or a desktop browser.",
  ],
  sections: [
    {
      heading: "How to Download Facebook Videos on iPhone (Safari)",
      paragraphs: [
        "Open the Facebook app on your iPhone and find the video. Tap the three-dot menu (•••) in the top-right corner of the post, then tap 'Copy Link'. Open Safari, go to this page, and paste the link into the box. Tap Download and choose HD or SD depending on what's available for that particular video.",
        "Because iOS restricts direct saves from Safari, the video usually opens in a new tab first. Tap the Share icon, then choose 'Save Video' to add it to your Camera Roll, or 'Save to Files' to store the MP4 in the Files app. If the three-dot menu doesn't show 'Copy Link' for a video inside a Group, try opening the video in its own full-screen view first.",
      ],
    },
    {
      heading: "How to Save Facebook Videos on Android",
      paragraphs: [
        "On Android, tap the three dots above the video post in the Facebook app and select 'Copy Link'. Switch to Chrome, paste the link into the downloader, and tap Download. Chrome saves the MP4 straight to your device's internal storage without asking for extra confirmation.",
        "You'll find the finished file in the Download folder through the Files by Google app or your phone maker's own file manager. Samsung's Gallery app typically indexes new videos from the Download folder automatically, while Pixel and other stock Android phones may require you to move the file into a Movies folder before it appears alongside your other videos.",
      ],
    },
    {
      heading: "Downloading Facebook Videos on Windows and Mac",
      paragraphs: [
        "On a computer, open the video on facebook.com, click the three dots below the post, and choose 'Copy link'. Paste it into the downloader and click Download. Desktop browsers don't add the extra save step that mobile Safari does, so the MP4 goes directly into your default Downloads folder, C:\\Users\\YourName\\Downloads on Windows or ~/Downloads on a Mac.",
        "This is the easiest route if you're saving a video to edit later or to attach to a presentation, since you get the raw file rather than just a shareable link. No Facebook downloader extension is needed; any current version of Chrome, Edge, Firefox, or Safari on desktop works.",
      ],
    },
    {
      heading: "HD vs SD: Which Facebook Video Quality Should You Choose?",
      paragraphs: [
        "When a quality choice is offered, HD usually corresponds to 720p or 1080p, matching whatever resolution the uploader originally posted, while SD is a smaller, more compressed 480p-range file. If the original video was recorded and uploaded at a lower resolution, no downloader can produce an HD file that doesn't exist; HD only becomes available when Facebook actually stored a higher-resolution version.",
        "Pick HD when you plan to watch on a larger screen, re-edit the clip, or repost it somewhere quality matters. SD is the better pick when you're low on storage or bandwidth, or the video is short-form content like a meme clip where resolution barely matters.",
      ],
    },
    {
      heading: "Why Some Facebook Videos Can't Be Downloaded (Private, Group, Age-Restricted)",
      paragraphs: [
        "Videos posted with a Friends-only or Only Me privacy setting can only be viewed by people logged in with the right permissions, so a downloader that only reads public links cannot reach them. The same applies to most Group videos: if the Group is closed or secret, Facebook requires membership and login before the video will even load outside the app.",
        "Age-restricted videos, live streams that are still broadcasting, and videos removed for a policy violation also won't download. Live videos usually become downloadable once the broadcast ends and Facebook finishes processing the replay, so if a live video fails, wait until it shows as a normal video post.",
      ],
    },
    {
      heading: "Is It Legal to Download Facebook Videos? Copyright Basics",
      paragraphs: [
        "Downloading a public Facebook video for personal use, watching it offline, saving your own Page's content, or keeping a family video someone shared with you, is generally considered acceptable. The video itself still belongs to whoever posted it, and copying it does not transfer any rights to you.",
        "Re-uploading someone else's Facebook video to another platform, removing their name from it, or using it for commercial purposes without asking crosses into copyright infringement. If you want to reuse a video beyond personal viewing, message the original poster for permission and credit them when you share it.",
      ],
    },
  ],
  useCases: [
    { title: "Archiving your business Page's videos", description: "Save your own Facebook Page's promotional or product videos locally so you have originals to re-edit or repost even if the post is later deleted." },
    { title: "Keeping a family video shared in a group", description: "Download a video a relative shared in a family Group so it doesn't get lost once the post scrolls out of the feed." },
    { title: "Offline viewing without data", description: "Save a recipe, tutorial, or news clip to watch later on a flight or anywhere without a reliable connection." },
    { title: "Research and reference use", description: "Journalists and researchers keep an offline copy of a public video as a citation reference in case the original post is removed." },
    { title: "Saving a livestream replay", description: "Download the replay of a public Facebook Live event once it finishes broadcasting, for later review or highlight editing." },
  ],
  mistakes: [
    { title: "Copying the Page link instead of the video link", description: "Pasting a link to a Facebook Page or profile won't work; copy the link from the individual video post's three-dot menu." },
    { title: "Trying to download a Friends-only post", description: "If the poster limited visibility to friends or a private group, the video requires a logged-in session and cannot be reached by any external tool." },
    { title: "Downloading a still-live broadcast", description: "A Facebook Live video isn't a finished file until the stream ends and Facebook processes the replay; wait until it appears as a normal video." },
    { title: "Expecting HD when the original was low-resolution", description: "If the uploader posted a small file, no downloader can generate detail that was never captured in the original video." },
    { title: "Using a stale mobile share short-link", description: "Facebook's shortened m.facebook.com links can sometimes point to a removed or edited post; recopy the link if a download fails." },
  ],
  tips: [
    "Copy the link from the three-dot menu on the specific video post, not from the Page or profile.",
    "Choose HD only if you know the original video was uploaded in high resolution; otherwise SD saves storage space.",
    "Wait for a live broadcast to finish before trying to download its replay.",
    "On iPhone, use the Share sheet's 'Save Video' to move the download into your Camera Roll.",
    "Check your Android Files app's Download folder if a saved video doesn't show up in Gallery automatically.",
    "Never log into Facebook on a third-party downloader site; a legitimate tool only needs the public video link.",
  ],
  glossary: [
    { title: "HD (High Definition)", description: "A higher-resolution version of a video, typically 720p or 1080p, available only if the uploader posted it at that quality." },
    { title: "SD (Standard Definition)", description: "A lower-resolution, smaller file size version of a video, usually around 480p." },
    { title: "MP4", description: "The standard video file format Facebook videos are converted to when downloaded, playable on any device." },
    { title: "Facebook Watch", description: "Facebook's dedicated video-viewing section for longer-form and show-style public videos." },
    { title: "Group video", description: "A video posted inside a Facebook Group, which may be restricted to members only depending on the Group's privacy setting." },
  ],
};

export default guide;
