import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import GoogleAnalytics from "@/components/analytics/GoogleAnalytics";
import MicrosoftClarity from "@/components/analytics/MicrosoftClarity";
import AdSenseScript from "@/components/analytics/AdSenseScript";
import EzoicScript from "@/components/analytics/EzoicScript";
import EzoicPageHandler from "@/components/analytics/EzoicPageHandler";
import { SITE_URL, SITE_NAME } from "@/lib/site";

export const metadata: Metadata = {
  title: {
    default: `${SITE_NAME} — Free Online Tools`,
    template: `%s | ${SITE_NAME}`,
  },
  description:
    "Free online tools for everyone — video downloaders, PDF tools, image editors, calculators and more. No registration required.",
  keywords: ["free online tools", "video downloader", "pdf tools", "image tools", "calculators"],
  authors: [{ name: SITE_NAME }],
  creator: SITE_NAME,
  metadataBase: new URL(SITE_URL),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: `${SITE_NAME} — Free Online Tools`,
    description: "Free online tools for everyone. No registration required.",
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} — Free Online Tools`,
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
        <EzoicScript />
        <EzoicPageHandler />
        <GoogleAnalytics />
        <MicrosoftClarity />
        <AdSenseScript />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
