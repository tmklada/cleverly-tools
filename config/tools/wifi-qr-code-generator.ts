import type { ToolConfig } from "@/types/tool";
const config: ToolConfig = {
  slug: "wifi-qr-code-generator",
  title: "WiFi QR Code Generator",
  description: "Create a QR code for your WiFi network so guests can connect instantly without typing passwords. Supports WPA, WPA2, and open networks.",
  shortDescription: "Share WiFi access with a scannable QR code",
  category: "qr",
  keywords: ["wifi qr code", "wifi qr generator", "share wifi qr", "wifi password qr code", "guest wifi qr", "wifi code generator", "connect to wifi qr"],
  icon: "📶",
  isNew: true,
  toolType: "qr",
  faq: [
    { question: "Is it safe to share my WiFi via QR code?", answer: "The QR code is generated in your browser — your password is never sent to our servers. Only share the QR code with people you trust." },
    { question: "Which devices can scan WiFi QR codes?", answer: "iPhones running iOS 11+ and Android phones running Android 10+ can scan WiFi QR codes natively through the camera app." },
    { question: "What security types are supported?", answer: "We support WPA/WPA2 (most common home routers), WEP (older routers), and open networks with no password." },
  ],
  howItWorks: [
    { step: 1, title: "Enter your WiFi details", description: "Type your network name (SSID), password, and select the security type." },
    { step: 2, title: "Generate the QR code", description: "Your WiFi QR code is created instantly in your browser." },
    { step: 3, title: "Download and display", description: "Download the QR code and print it or display it on a screen for guests to scan." },
  ],
  relatedTools: ["qr-code-generator", "password-generator", "password-strength-checker"],
  schema: "WebApplication",
  adsPositions: ["top", "after-tool"],
};
export default config;
