import type { ToolGuide } from "@/types/guide";

const guide: ToolGuide = {
  slug: "wifi-qr-code-generator",
  intro: [
    "A WiFi QR code generator turns your network name and password into a scannable code that phones use to join the network automatically, with no typing required. This tool builds the code entirely in your browser using the standard WIFI: text format that iPhones and Android phones already recognize through their native camera apps, so there's nothing to install on the guest's side. It supports WPA/WPA2, WEP, and open networks with no password at all.",
    "Type your network name (SSID) and password, pick the matching security type, and the QR code appears immediately, ready to download as a PNG. It's built for anyone who hands out WiFi access repeatedly: households with frequent visitors, short-term rental hosts, cafes, offices, and event spaces where re-typing a long WPA2 password for every guest wastes everyone's time.",
  ],
  sections: [
    {
      heading: "WiFi QR Code Format Explained (WIFI:T:WPA;S:...;P:...;;)",
      paragraphs: [
        "Every WiFi QR code follows the same plain-text pattern: WIFI:T:<security type>;S:<network name>;P:<password>;H:<hidden>;;. The T field is the security type (WPA, WEP, or nopass for open networks), S is your SSID exactly as broadcast, P is the password, and H is true or false depending on whether the network is hidden. The trailing double semicolon simply closes the string.",
        "This tool builds that exact string from the fields you fill in and encodes it into a QR image using medium error correction, then renders it to a canvas you can download as a PNG. Because the format is a widely-adopted convention rather than a certified official spec, a very small number of old QR scanner apps may read it as plain text instead of triggering a WiFi connection prompt, though every current iPhone and Android camera app supports it natively.",
      ],
    },
    {
      heading: "Print a WiFi QR Code for Guests, Airbnb, Cafes",
      paragraphs: [
        "A printed WiFi QR code removes the most common friction point for guests: hunting for a router sticker, misreading a password with confusing characters, or asking a host to repeat it out loud. Print it on a small card next to the router, laminate it for a cafe counter, or add it to a welcome binder for a short-term rental alongside the check-in instructions.",
        "Keep the printed code reasonably sized, at least about 1 inch (2.5 cm) square for a card held at arm's length, and larger if it will be mounted on a wall and scanned from a few feet away. If you ever change the WiFi password, remember to regenerate and reprint the code, since an old QR code will simply fail to connect rather than warn anyone that it's outdated.",
      ],
    },
    {
      heading: "Choosing the Right Security Type: WPA/WPA2 vs WEP vs Open Networks",
      paragraphs: [
        "Almost every router sold in the last decade uses WPA or WPA2, so that is the correct selection for the vast majority of home and business networks; the tool treats both the same way inside the QR format. WEP is an older, weaker encryption standard still found on some legacy routers, and selecting it tells scanning apps to use WEP's connection method instead of WPA's.",
        "Choose \"None\" only for a genuinely open network with no password, such as a public hotspot. Generating a code with a blank password field but WPA still selected as the security type will produce a QR code that fails to connect, since the phone expects a password for WPA networks. Always test a newly generated code on your own phone before handing it to a guest.",
      ],
    },
    {
      heading: "Hidden Networks and QR Codes: What Changes",
      paragraphs: [
        "A hidden network doesn't broadcast its SSID publicly, so devices scanning for nearby WiFi won't see its name in a normal list; connecting normally means typing the exact SSID and password by hand. Checking the \"Hidden Network\" option before generating the code adds the hidden flag to the QR string, telling the scanning phone to connect directly using the embedded SSID rather than searching a broadcast list first.",
        "If the hidden flag doesn't match your router's actual setting, the QR code can still fail even with a correct password, since some phones behave differently once a hidden-flagged network turns out to be discoverable after all. When in doubt, leave the box unchecked unless you have specifically configured your router to hide its SSID.",
      ],
    },
    {
      heading: "WiFi QR Code Privacy and Practical Limits",
      paragraphs: [
        "The QR code is built entirely on your device, so the SSID and password never leave your browser during generation, and nothing is sent to a server or stored anywhere. That also means the code is only as safe as the surface you print it on; anyone who can scan the physical card or screen can join the network, so treat a printed WiFi QR code the way you'd treat a written-down password.",
        "One practical limit worth knowing: a QR code has no way to signal that it's outdated. If the password changes but the printed code doesn't, guests will simply see a failed connection with no explanation. Keeping a small note of when a code was last generated, especially for a business with a public-facing sign, avoids confused customers after a routine password rotation.",
      ],
    },
    {
      heading: "Troubleshooting: When a WiFi QR Code Won't Scan",
      paragraphs: [
        "If a phone's camera recognizes the QR code but the connection fails, the most common cause is a mismatched security type or a password typed with a stray space or wrong capitalization. Regenerate the code after carefully re-typing both the SSID and password, then test it immediately on your own phone rather than assuming the fields were correct the first time.",
        "If the camera app doesn't recognize the code as a WiFi network at all and only shows the raw WIFI: text, the issue is usually an outdated camera app rather than the code itself; a dedicated third-party QR scanner app will still read the same code correctly. Very old phones, roughly pre-2017 for iPhone and pre-2019 for many Android models, may need a scanner app instead of relying on native camera support.",
      ],
    },
  ],
  useCases: [
    { title: "Guest WiFi at home", description: "Skip repeating your WiFi password out loud to every visitor by leaving a printed QR code near the router or on the fridge." },
    { title: "Airbnb and short-term rentals", description: "Add a WiFi QR code to your welcome guide so guests connect the moment they arrive, without a back-and-forth text message." },
    { title: "Cafes and small businesses", description: "Print the code on a table tent or receipt so customers connect without asking staff for the password every time." },
    { title: "Offices and coworking spaces", description: "Give visitors and contractors instant guest network access without sharing the same password used by full-time staff." },
    { title: "Events and conferences", description: "Display a WiFi QR code on a screen or signage so attendees connect in seconds instead of waiting in line for the password." },
  ],
  mistakes: [
    { title: "Wrong security type selected", description: "Choosing WPA for a WEP router, or the reverse, produces a code that looks correct but fails to connect." },
    { title: "Not testing before printing", description: "A typo in the SSID or password only shows up once someone actually scans and tries to connect, so test it first." },
    { title: "Forgetting to update after a password change", description: "An old printed QR code will simply fail silently once the WiFi password has been changed." },
    { title: "Mismatched hidden network flag", description: "Checking \"Hidden Network\" for a network that actually broadcasts its SSID, or vice versa, can cause inconsistent connection results." },
  ],
  tips: [
    "Test the generated QR code on your own phone before printing or sharing it with guests.",
    "Regenerate and reprint the code any time you change your WiFi password.",
    "Print the code at least 1 inch (2.5 cm) square for reliable scanning at close range.",
    "Double-check the SSID matches exactly, including capitalization and spacing.",
    "Use \"None\" as the security type only for a genuinely open network with no password.",
  ],
  glossary: [
    { title: "SSID", description: "The public name of a WiFi network, shown in the list of available networks on a device." },
    { title: "WPA/WPA2", description: "The current standard encryption protocols used by nearly all modern home and business routers." },
    { title: "WEP", description: "An older, weaker WiFi encryption standard still found on some legacy routers." },
    { title: "Error correction level", description: "A setting that determines how much of a QR code can be damaged or obscured and still scan correctly; this tool uses medium (M) level." },
    { title: "Hidden network", description: "A WiFi network configured not to broadcast its SSID publicly, requiring devices to connect using the exact name and password." },
  ],
};

export default guide;
