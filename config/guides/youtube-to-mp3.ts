import type { ToolGuide } from "@/types/guide";

const guide: ToolGuide = {
  slug: "youtube-to-mp3",
  intro: [
    "A YouTube to MP3 tool extracts just the audio track from a YouTube video and saves it as a standalone MP3 file, so you can listen without needing the video playing or an internet connection. Paste the video's URL, pick a quality, and the tool converts and downloads the audio in seconds. This youtube to mp3 converter works entirely in your browser, with no software to install.",
    "It's useful for anyone who wants music, a podcast-style talk, a lecture, or a spoken-word video as audio only, for listening in the car, on a workout, or anywhere video would be a distraction. A youtube mp3 downloader also helps people with limited data plans who want to download youtube audio once and replay it offline instead of re-streaming the video every time.",
    "Doing this through a browser tool instead of a dedicated app avoids the biggest complaint about YouTube-to-MP3 apps: many require installing unfamiliar software or grant broad permissions just to extract an audio file. A web-based youtube audio extractor only needs the video link, works the same on a phone or a computer, and never asks you to install anything.",
  ],
  sections: [
    {
      heading: "How to Convert YouTube to MP3 on iPhone",
      paragraphs: [
        "Open the YouTube app, find the video, tap Share, and tap 'Copy Link'. Switch to Safari, open this tool, and paste the link into the box. Choose your MP3 bitrate, 128, 192, or 320kbps, and tap Convert & Download.",
        "Safari typically opens the finished MP3 in a preview tab rather than saving it right away. Tap the Share icon and choose 'Save to Files' to keep it in the Files app, then open it later or add it to a playlist in a music player app that supports imported MP3s, since the Apple Music app itself does not accept manually added files without extra setup.",
      ],
    },
    {
      heading: "How to Download YouTube Audio on Android",
      paragraphs: [
        "On Android, tap Share under the video and choose 'Copy Link'. Open Chrome, paste the link into the tool, pick a bitrate, and tap Convert & Download. Chrome saves the MP3 straight to your device's internal storage.",
        "You'll find the file in the Download folder through the Files by Google app or your phone's built-in file manager. Most Android music players, including Google's own YouTube Music and third-party apps like VLC, automatically scan the Download and Music folders, so the track often appears in your library without any extra steps.",
      ],
    },
    {
      heading: "Converting YouTube to MP3 on Windows or Mac",
      paragraphs: [
        "On a desktop browser, copy the YouTube video's URL, paste it into the tool, choose your preferred quality, and click Convert & Download. The MP3 saves to your default Downloads folder, C:\\Users\\YourName\\Downloads on Windows or ~/Downloads on a Mac.",
        "From there, you can drag the file straight into iTunes, Windows Media Player, or any other music library app to add it to a playlist. This is the fastest way to build an offline collection of talks, lectures, or music you want to keep without depending on a streaming connection.",
      ],
    },
    {
      heading: "MP3 Bitrate Explained: 128kbps vs 192kbps vs 320kbps",
      paragraphs: [
        "Bitrate controls how much audio detail is preserved and, as a result, how large the file is. 128kbps produces a small file that sounds fine on phone speakers or earbuds but loses some clarity in complex music. 192kbps is a solid middle ground most people can't tell apart from the original in casual listening.",
        "320kbps is the highest MP3 quality available and is close to indistinguishable from the source audio, even on good headphones, but the file is roughly two and a half times larger than a 128kbps version. Choose 320kbps for music you care about, and 128kbps for spoken content like lectures or podcasts where file size matters more than audio nuance.",
      ],
    },
    {
      heading: "Why Some YouTube Videos Can't Be Converted to MP3",
      paragraphs: [
        "Live streams that are still broadcasting cannot be converted because there is no finished file yet; wait until the stream ends and YouTube processes the video-on-demand replay. Age-restricted videos that require a signed-in YouTube account to view also cannot be accessed by a tool that only works with public links.",
        "Very long videos, generally over two hours, are not supported because processing that much audio takes too long and produces an unreasonably large file. If you need audio from a long lecture or stream, look for a shorter, edited version of the same video, or convert it in segments if the option is available.",
      ],
    },
    {
      heading: "Is It Legal to Download YouTube Audio? Copyright and Fair Use Basics",
      paragraphs: [
        "The audio in a YouTube video is still owned by whoever created or licensed it, whether that's a musician, a podcaster, or a video creator narrating over their own footage. Downloading it for personal, offline listening of content you already have the right to hear is generally low-risk, but that doesn't make the underlying copyright disappear.",
        "Redistributing a downloaded MP3, uploading it to a streaming service, or using someone's music commercially without a license is where this crosses into copyright infringement. If the video is your own upload, or a podcast or lecture you have permission to save, converting it to MP3 for personal use is straightforward and safe.",
      ],
    },
  ],
  useCases: [
    { title: "Listening offline during a commute", description: "Convert a podcast-style YouTube video to MP3 once, then listen on the train or in the car without streaming data each time." },
    { title: "Saving your own uploaded content as audio", description: "Creators extract the audio from their own YouTube videos to repost as a podcast episode or keep as a standalone audio backup." },
    { title: "Building an offline lecture library", description: "Students save recorded lecture videos as MP3s to review while studying without needing video playback or a data connection." },
    { title: "Archiving a family video's audio track", description: "Pull just the audio from a family event video shared with you, useful for a voice message or spoken memory you want to keep." },
    { title: "Workout and gym playlists", description: "Convert music videos you have the rights to into MP3 files for offline playlists during a workout when data access is limited." },
  ],
  mistakes: [
    { title: "Trying to convert a video that's still live", description: "A YouTube Live stream has no finished file to extract audio from until the broadcast ends and the replay finishes processing." },
    { title: "Choosing 320kbps for a two-hour lecture", description: "Higher bitrates create much larger files with little audible benefit for spoken-word content; 128kbps is usually plenty." },
    { title: "Expecting age-restricted videos to convert", description: "Videos that require a signed-in account to view cannot be processed by a tool that only reads public video links." },
    { title: "Assuming any video length works", description: "Extremely long videos, generally over two hours, are not supported because the resulting file and processing time become impractical." },
    { title: "Redistributing downloaded music", description: "Saving a song for personal listening is different from sharing or reselling the MP3 file, which can violate the copyright owner's rights." },
  ],
  tips: [
    "Choose 320kbps for music you care about and 128kbps for spoken content like lectures or podcasts.",
    "Wait for a live stream to end before trying to convert its audio.",
    "Check that a video is under two hours long before starting the conversion.",
    "Move the finished MP3 into your phone's music app's library folder so it shows up automatically.",
    "Only convert videos you own, have permission for, or are using strictly for personal offline listening.",
  ],
  glossary: [
    { title: "Bitrate", description: "A measure of how much audio data is encoded per second, expressed in kbps; higher bitrates mean better quality and larger files." },
    { title: "MP3", description: "A widely supported compressed audio file format, playable on virtually every phone, computer, and music player." },
    { title: "kbps", description: "Kilobits per second, the unit used to measure MP3 bitrate quality; common options are 128, 192, and 320kbps." },
    { title: "VOD (Video on Demand)", description: "The recorded replay of a YouTube Live stream, available for conversion only after the live broadcast has ended." },
    { title: "Age-restricted video", description: "A YouTube video that requires a signed-in account to confirm the viewer's age before it can be viewed or processed." },
  ],
};

export default guide;
