import type { Metadata } from "next";
import { SITE_URL, SITE_NAME } from "@/lib/site";

const PAGE_URL = `${SITE_URL}/contact`;
const CONTACT_EMAIL = "tawfik164@gmail.com";

export const metadata: Metadata = {
  title: `Contact Us`,
  description:
    "Get in touch with the cleverly.tools team — report a bug, request a new tool, send a copyright/DMCA request, or ask about advertising.",
  alternates: {
    canonical: PAGE_URL,
  },
};

export default function ContactPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumb */}
      <nav className="text-sm text-gray-500 dark:text-gray-400 mb-6 flex gap-2">
        <a href="/" className="hover:text-blue-600">Home</a>
        <span>/</span>
        <span className="text-gray-700 dark:text-gray-300">Contact</span>
      </nav>

      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-3">
          Contact Us
        </h1>
        <p className="text-gray-600 dark:text-gray-400 leading-relaxed max-w-2xl">
          {SITE_NAME} is built and maintained by a small, independent team. We
          read every message. The best way to reach us is by email.
        </p>
      </div>

      <div className="space-y-8">
        <section className="bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-xl p-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
            Email us
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-3">
            For anything at all — bugs, tool requests, copyright concerns, or
            business inquiries — write to:
          </p>
          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className="inline-flex items-center gap-2 text-lg font-medium text-blue-600 hover:underline"
          >
            {CONTACT_EMAIL}
          </a>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-3">
            We typically respond within 48 hours.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
            What you can contact us about
          </h2>
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                🐛 Bug reports
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Found a tool that isn&apos;t working as expected? Tell us which
                tool, what you tried, and what happened — screenshots help a
                lot.
              </p>
            </div>
            <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                💡 Tool requests
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Have an idea for a tool we don&apos;t have yet? We regularly add
                new tools based on what people ask for. See the &quot;Request a
                tool&quot; section below.
              </p>
            </div>
            <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                ⚖️ DMCA / copyright takedown requests
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                If you believe content accessible through one of our tools
                infringes your copyright, email us with details of the
                material, its location, and proof of your rights, and we will
                review the request promptly.
              </p>
            </div>
            <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                📈 Business &amp; advertising
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Interested in advertising, partnerships, or integrations?
                Reach out with details about your business and what you have
                in mind.
              </p>
            </div>
          </div>
        </section>

        <section className="bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900 rounded-xl p-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
            Request a tool
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            {SITE_NAME} already offers dozens of free tools across categories
            like PDF, image, video, calculators, and text utilities — and it
            keeps growing. If there&apos;s a tool you wish existed, email us at{" "}
            <a
              href={`mailto:${CONTACT_EMAIL}?subject=Tool%20Request`}
              className="text-blue-600 hover:underline font-medium"
            >
              {CONTACT_EMAIL}
            </a>{" "}
            with a short description of what it should do. Real requests from
            real users are the main way we decide what to build next.
          </p>
          <a
            href={`mailto:${CONTACT_EMAIL}?subject=Tool%20Request`}
            className="inline-flex items-center gap-2 bg-blue-600 text-white font-medium px-5 py-2.5 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Request a tool
          </a>
        </section>

        <section>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Before writing in, you may also find an answer faster by browsing
            our{" "}
            <a href="/tools" className="text-blue-600 hover:underline">
              full tools directory
            </a>{" "}
            or reading our{" "}
            <a href="/privacy" className="text-blue-600 hover:underline">
              Privacy Policy
            </a>{" "}
            and{" "}
            <a href="/terms" className="text-blue-600 hover:underline">
              Terms of Use
            </a>
            .
          </p>
        </section>
      </div>
    </div>
  );
}
