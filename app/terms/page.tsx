import type { Metadata } from "next";
import { SITE_URL, SITE_NAME } from "@/lib/site";

const PAGE_URL = `${SITE_URL}/terms`;
const LAST_UPDATED = "September 12, 2026";

export const metadata: Metadata = {
  title: `Terms of Use`,
  description:
    "The terms and conditions for using cleverly.tools' free online tools, including rules on copyright, acceptable use, and liability.",
  alternates: {
    canonical: PAGE_URL,
  },
};

export default function TermsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumb */}
      <nav className="text-sm text-gray-500 dark:text-gray-400 mb-6 flex gap-2">
        <a href="/" className="hover:text-blue-600">Home</a>
        <span>/</span>
        <span className="text-gray-700 dark:text-gray-300">Terms of Use</span>
      </nav>

      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Terms of Use
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Last updated: {LAST_UPDATED}
        </p>
      </div>

      <div className="prose prose-gray dark:prose-invert max-w-none space-y-8">
        <section>
          <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
            These Terms of Use (&quot;Terms&quot;) govern your access to and use of{" "}
            {SITE_NAME} at {SITE_URL.replace("https://", "")} (the
            &quot;Service&quot;). By accessing or using the Service, you agree to be
            bound by these Terms. If you do not agree, please do not use the
            Service.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
            1. The service is free, provided &quot;as is&quot;
          </h2>
          <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
            {SITE_NAME} provides free online tools — including PDF, image,
            video conversion, calculators, generators, and media downloader
            tools — for personal and general use. The Service is provided on
            an &quot;as is&quot; and &quot;as available&quot; basis, without warranties of
            any kind, whether express or implied, including but not limited to
            warranties of merchantability, fitness for a particular purpose,
            accuracy, or non-infringement. We do not guarantee that any tool
            will be uninterrupted, error-free, secure, or that outputs will be
            accurate or suitable for any particular purpose. You use the
            Service at your own risk.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
            2. Your responsibility for content
          </h2>
          <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-3">
            You are solely responsible for any files, links, or content you
            submit to or process through our tools, and for how you use any
            output produced by the Service. In particular:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-gray-600 dark:text-gray-400">
            <li>
              You must own the rights to, or have proper permission to use,
              edit, convert, or download any content you process through the
              Service.
            </li>
            <li>
              Our video and media downloader tools (Facebook, TikTok,
              Instagram, YouTube, Twitter/X, and similar) are provided for
              downloading content that you already have the legal right to
              download — for example, your own content, content in the public
              domain, or content whose creator has given you permission. They
              are intended for personal, non-commercial use.
            </li>
            <li>
              You are responsible for complying with the terms of service,
              community guidelines, and copyright policies of any third-party
              platform (such as the platforms our downloader tools reference)
              when using content obtained through our Service.
            </li>
            <li>
              You must comply with all applicable copyright, trademark,
              privacy, and other laws in your jurisdiction when using any
              tool, file, or output from the Service.
            </li>
          </ul>
          <p className="text-gray-600 dark:text-gray-400 leading-relaxed mt-3">
            We do not review, endorse, or take responsibility for the content
            users choose to process through our tools, and we disclaim all
            liability for misuse of the Service by any user.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
            3. Copyright and DMCA
          </h2>
          <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
            We respect the intellectual property rights of others and expect
            users of the Service to do the same. If you believe content
            accessible through our Service infringes your copyright, please
            contact us at{" "}
            <a
              href="mailto:tawfik164@gmail.com"
              className="text-blue-600 hover:underline"
            >
              tawfik164@gmail.com
            </a>{" "}
            with details of the material and your rights, and we will review
            and respond appropriately.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
            4. Acceptable use
          </h2>
          <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-3">
            You agree not to misuse the Service. Specifically, you must not:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-gray-600 dark:text-gray-400">
            <li>
              Use automated means (bots, scripts, scrapers, or bulk
              automation tools) to access, query, or extract data from our
              tools or any underlying API at a volume or frequency beyond
              normal individual human use.
            </li>
            <li>
              Attempt to probe, scan, reverse-engineer, or test the
              vulnerability of the Service or any related system or network,
              or breach any security or authentication measures.
            </li>
            <li>
              Use the Service to upload, process, or distribute content that
              is illegal, infringing, defamatory, obscene, or otherwise
              harmful.
            </li>
            <li>
              Use the Service in any way that could disable, overburden,
              damage, or impair it, or interfere with any other party&apos;s use
              of the Service.
            </li>
            <li>
              Resell, sublicense, or repackage the Service or its outputs as
              your own commercial product without our written permission.
            </li>
          </ul>
          <p className="text-gray-600 dark:text-gray-400 leading-relaxed mt-3">
            We reserve the right to restrict, rate-limit, or block access for
            any user or IP address we reasonably believe is violating these
            Terms.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
            5. Intellectual property
          </h2>
          <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
            The Service, including its design, branding, code, and text
            (excluding user-submitted content and third-party content
            referenced by our tools), is owned by {SITE_NAME} and protected by
            applicable intellectual property laws. You may not copy,
            reproduce, or create derivative works of the Service itself
            without our permission.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
            6. Limitation of liability
          </h2>
          <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
            To the fullest extent permitted by law, {SITE_NAME} and its
            operators shall not be liable for any indirect, incidental,
            special, consequential, or punitive damages, or any loss of data,
            revenue, or profits, arising out of or related to your use of, or
            inability to use, the Service — including but not limited to
            damages resulting from file conversion errors, data loss,
            downloaded content, third-party ad content, or reliance on
            calculator or generator outputs. Because the Service is provided
            free of charge, our total liability for any claim relating to the
            Service shall not exceed the amount you paid to use it (which is
            zero).
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
            7. Third-party services and advertising
          </h2>
          <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
            The Service may display advertisements served by third parties
            (such as Google AdSense or Ezoic) and may link to third-party
            platforms. We are not responsible for the content, accuracy, or
            practices of third-party advertisers, platforms, or websites. See
            our{" "}
            <a href="/privacy" className="text-blue-600 hover:underline">
              Privacy Policy
            </a>{" "}
            for more information on advertising and cookies.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
            8. Changes to the Service and these Terms
          </h2>
          <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
            We may modify, suspend, or discontinue any part of the Service at
            any time without notice. We may also revise these Terms from time
            to time; the &quot;Last updated&quot; date above reflects the most recent
            revision. Continuing to use the Service after changes take effect
            means you accept the updated Terms.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
            9. Governing law
          </h2>
          <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
            These Terms shall be governed by and interpreted in accordance
            with applicable law, without regard to conflict-of-law
            principles. Any disputes arising from these Terms or the Service
            shall be resolved in accordance with the laws applicable to the
            operator of {SITE_NAME}.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
            10. Contact us
          </h2>
          <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
            Questions about these Terms can be sent to{" "}
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
