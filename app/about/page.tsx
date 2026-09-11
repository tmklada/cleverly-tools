import type { Metadata } from "next";
import { SITE_URL, SITE_NAME } from "@/lib/site";

const PAGE_URL = `${SITE_URL}/about`;

export const metadata: Metadata = {
  title: `About Us`,
  description:
    "cleverly.tools offers 94 free online tools across 13 categories — PDF, image, video, calculators and more — processed privately in your browser with no registration required.",
  alternates: {
    canonical: PAGE_URL,
  },
};

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumb */}
      <nav className="text-sm text-gray-500 dark:text-gray-400 mb-6 flex gap-2">
        <a href="/" className="hover:text-blue-600">Home</a>
        <span>/</span>
        <span className="text-gray-700 dark:text-gray-300">About</span>
      </nav>

      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-3">
          About {SITE_NAME}
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
          {SITE_NAME} is a free collection of 94 everyday online tools,
          organized into 13 categories, built so you can get a task done in
          seconds without installing software or creating an account.
        </p>
      </div>

      <div className="space-y-8">
        <section>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
            What we offer
          </h2>
          <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-3">
            Our tools cover the tasks people run into most often: merging and
            compressing PDFs, resizing and converting images, removing image
            backgrounds, converting video files, downloading media links from
            social platforms, and a wide range of calculators, generators,
            and text utilities for finance, health, and everyday math. Every
            tool is free to use, with no sign-up and no usage limits that get
            in your way.
          </p>
          <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
            You can browse everything by category on our{" "}
            <a href="/tools" className="text-blue-600 hover:underline">
              tools directory
            </a>
            , or search for what you need directly.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
            Built privacy-first
          </h2>
          <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
            Most of our tools — PDF, image, video conversion, calculators, and
            generators — run entirely inside your own browser. When you use
            one of these tools, your files stay on your device; nothing is
            uploaded to our servers. That means faster results for you and a
            much smaller privacy footprint for your data. The only tools that
            talk to a server are our media downloaders, which need to look up
            the download link for a URL you paste — we do not store the
            videos themselves. Full details are in our{" "}
            <a href="/privacy" className="text-blue-600 hover:underline">
              Privacy Policy
            </a>
            .
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
            No registration, works everywhere
          </h2>
          <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
            There are no accounts, no passwords, and no paywalls. Open a tool,
            use it, and move on. Every tool is designed to work on both
            desktop and mobile browsers, so you can resize a photo on your
            laptop or convert a PDF from your phone with the same experience.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
            Our mission
          </h2>
          <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
            We believe simple everyday tasks shouldn&apos;t require installing
            an app, creating an account, or handing over your files to a
            stranger&apos;s server. Our goal is to keep building fast,
            no-nonsense tools that just work — and to keep them free, funded
            by unobtrusive advertising rather than subscriptions. We also
            publish practical how-to guides and tips on our{" "}
            <a href="/blog" className="text-blue-600 hover:underline">
              blog
            </a>{" "}
            to help you get more out of the tools.
          </p>
        </section>

        <section className="bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-xl p-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
            Get in touch
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Have feedback, found a bug, or want to request a new tool? Visit
            our{" "}
            <a href="/contact" className="text-blue-600 hover:underline">
              Contact page
            </a>{" "}
            — we read every message.
          </p>
        </section>
      </div>
    </div>
  );
}
