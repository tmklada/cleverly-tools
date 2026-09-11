import type { Metadata } from "next";
import { SITE_URL, SITE_NAME } from "@/lib/site";

const PAGE_URL = `${SITE_URL}/privacy`;
const LAST_UPDATED = "September 12, 2026";

export const metadata: Metadata = {
  title: `Privacy Policy`,
  description:
    "Read the cleverly.tools privacy policy: how we use Google Analytics, Microsoft Clarity, and advertising cookies, and why most of our tools process your files entirely in your browser.",
  alternates: {
    canonical: PAGE_URL,
  },
};

export default function PrivacyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumb */}
      <nav className="text-sm text-gray-500 dark:text-gray-400 mb-6 flex gap-2">
        <a href="/" className="hover:text-blue-600">Home</a>
        <span>/</span>
        <span className="text-gray-700 dark:text-gray-300">Privacy Policy</span>
      </nav>

      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Privacy Policy
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Last updated: {LAST_UPDATED}
        </p>
      </div>

      <div className="prose prose-gray dark:prose-invert max-w-none space-y-8">
        <section>
          <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
            {SITE_NAME} (&quot;we&quot;, &quot;us&quot;, &quot;our&quot;) provides free online tools at{" "}
            {SITE_URL.replace("https://", "")}. This Privacy Policy explains what
            information we collect, how it is used, and the choices you have. By
            using this site you agree to the practices described below. If you do
            not agree, please do not use the site.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
            1. How most of our tools actually work
          </h2>
          <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-3">
            The majority of tools on {SITE_NAME} — including our PDF tools
            (merge, split, rotate, compress), image tools (resize, convert,
            compress, crop, flip, background remover), video converter, and all
            calculators and generators — run <strong>entirely inside your web
            browser</strong> using JavaScript and WebAssembly. When you upload a
            file to one of these tools, that file is processed on your own
            device. It is never uploaded, transmitted, or sent to our servers,
            and we never see, store, or have access to it. Closing the tab or
            refreshing the page permanently removes the file from memory,
            because it was never stored anywhere else to begin with.
          </p>
          <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
            The one category where this is different is our video/media
            downloader tools (for example, Facebook, TikTok, Instagram, YouTube
            and Twitter/X downloaders). For those tools, the URL you paste is
            sent to our server or a third-party API so we can look up and
            return the available download links for that media. We do not
            download, cache, or store a copy of the video or audio file itself
            on our servers — the file is streamed or linked directly from the
            source platform to you. We also do not retain the pasted URLs
            beyond what is needed to process your request and for standard,
            short-term server logging described below.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
            2. Information we collect automatically
          </h2>
          <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-3">
            Like most websites, our servers and analytics providers
            automatically collect certain technical information when you visit,
            such as your IP address, browser type, device type, operating
            system, referring page, pages visited, and timestamps. This
            information is used to operate the site, understand how it is
            used, diagnose problems, and improve our tools.
          </p>
          <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
            We use the following third-party services to collect this kind of
            data:
          </p>
          <ul className="list-disc pl-6 space-y-2 mt-3 text-gray-600 dark:text-gray-400">
            <li>
              <strong>Google Analytics 4</strong> — helps us understand traffic
              volume, popular tools, and general usage patterns through
              anonymized/aggregated statistics.
            </li>
            <li>
              <strong>Microsoft Clarity</strong> — provides session recordings
              and heatmaps of anonymized on-site behavior (clicks, scrolls,
              mouse movement) so we can see where visitors struggle and improve
              the interface. Clarity is configured to mask sensitive form
              inputs where applicable.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
            3. Advertising and cookies
          </h2>
          <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-3">
            {SITE_NAME} is a free service supported by advertising. We use, or
            intend to use, <strong>Google AdSense</strong> and/or{" "}
            <strong>Ezoic</strong> to display ads. These advertising partners,
            and the vendors they work with, may use cookies, web beacons, and
            similar technologies to serve ads based on your prior visits to
            this and other websites, and to measure ad performance.
          </p>
          <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-3">
            Google&apos;s use of advertising cookies enables it and its partners
            to serve ads based on your visits to this site and/or other sites
            on the Internet. You can opt out of personalized advertising by
            visiting{" "}
            <a
              href="https://www.google.com/settings/ads"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              Google Ads Settings
            </a>{" "}
            or, for a wider range of advertising networks, the{" "}
            <a
              href="https://www.aboutads.info/choices"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              Digital Advertising Alliance opt-out page
            </a>
            . You can also control cookies generally through your browser
            settings, including blocking or deleting them, though doing so may
            affect how some parts of the site function.
          </p>
          <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
            We do not control the cookies set by third-party ad networks and
            analytics providers, and this Privacy Policy does not cover their
            practices. We encourage you to review the privacy policies of
            Google, Microsoft Clarity, and Ezoic directly for details on how
            they handle your data.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
            4. Data retention
          </h2>
          <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
            Files processed by our browser-based tools are never stored by us
            in the first place, so there is nothing on our side to retain or
            delete. Standard server logs (IP address, request metadata) and
            analytics data are retained only for as long as reasonably
            necessary for security, debugging, and analytics purposes, and are
            subject to the retention limits of the respective third-party
            providers (for example, Google Analytics&apos; default retention
            settings).
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
            5. Children&apos;s privacy
          </h2>
          <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
            {SITE_NAME} is not directed to children under the age of 13, and we
            do not knowingly collect personal information from children under
            13. If you believe a child has provided us with personal
            information, please contact us at{" "}
            <a
              href="mailto:tawfik164@gmail.com"
              className="text-blue-600 hover:underline"
            >
              tawfik164@gmail.com
            </a>{" "}
            and we will take appropriate steps to remove it.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
            6. Your rights (GDPR, CCPA and similar laws)
          </h2>
          <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-3">
            Depending on where you live, you may have rights under laws such
            as the EU/UK General Data Protection Regulation (GDPR) or the
            California Consumer Privacy Act (CCPA), including the right to
            know what personal information is collected about you, the right
            to request access to or deletion of that information, the right to
            opt out of the sale or sharing of personal information (we do not
            sell personal information), and the right to non-discrimination
            for exercising your rights.
          </p>
          <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
            Because most of our tools never receive your files or personal
            content in the first place, there is typically very little
            personal data for us to hold. For any requests relating to
            analytics or advertising data, please also use the opt-out links
            above, or contact us directly at{" "}
            <a
              href="mailto:tawfik164@gmail.com"
              className="text-blue-600 hover:underline"
            >
              tawfik164@gmail.com
            </a>
            .
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
            7. Third-party links
          </h2>
          <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
            Our site may link to third-party websites, including the social
            media and video platforms our downloader tools reference. We are
            not responsible for the privacy practices or content of those
            external sites. We encourage you to review their privacy policies
            before providing any personal information.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
            8. Changes to this policy
          </h2>
          <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
            We may update this Privacy Policy from time to time to reflect
            changes in our practices, tools, or legal requirements. The
            &quot;Last updated&quot; date at the top of this page indicates when the
            policy was last revised. Continued use of the site after changes
            are posted constitutes acceptance of the updated policy.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
            9. Contact us
          </h2>
          <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
            If you have any questions about this Privacy Policy or how we
            handle data, please contact us at{" "}
            <a
              href="mailto:tawfik164@gmail.com"
              className="text-blue-600 hover:underline"
            >
              tawfik164@gmail.com
            </a>
            .
          </p>
        </section>
      </div>
    </div>
  );
}
