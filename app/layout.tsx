import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: {
    default: "cleverly.tools — Free Online Tools",
    template: "%s | cleverly.tools",
  },
  description:
    "Free online tools for everyone — video downloaders, PDF tools, image editors, calculators and more. No registration required.",
  keywords: ["free online tools", "video downloader", "pdf tools", "image tools", "calculators"],
  authors: [{ name: "cleverly.tools" }],
  creator: "cleverly.tools",
  metadataBase: new URL("https://cleverly.tools"),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://cleverly.tools",
    siteName: "cleverly.tools",
    title: "cleverly.tools — Free Online Tools",
    description: "Free online tools for everyone. No registration required.",
  },
  twitter: {
    card: "summary_large_image",
    title: "cleverly.tools — Free Online Tools",
    description: "Free online tools for everyone. No registration required.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-snippet": -1 },
  },
  verification: {
    google: "REPLACE_WITH_GSC_VERIFICATION_CODE",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body className="min-h-full flex flex-col bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
