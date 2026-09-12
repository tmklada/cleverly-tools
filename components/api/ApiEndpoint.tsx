"use client";

import { useState } from "react";
import { trackEvent } from "@/lib/analytics";

export interface EndpointParam {
  name: string;
  required?: boolean;
  description: string;
}

export interface EndpointExample {
  label: string;
  query: string;
}

export interface EndpointSpec {
  id: string;
  title: string;
  path: string;
  returns: string;
  description: string;
  params: EndpointParam[];
  examples: EndpointExample[];
  previewImage?: boolean;
}

export default function ApiEndpoint({ endpoint, baseUrl }: { endpoint: EndpointSpec; baseUrl: string }) {
  const [active, setActive] = useState(0);
  const [copied, setCopied] = useState(false);

  const example = endpoint.examples[active] ?? endpoint.examples[0];
  const url = `${baseUrl}${endpoint.path}${example?.query ? `?${example.query}` : ""}`;

  async function copy() {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      trackEvent("api_url_copied", "growth", endpoint.id);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  }

  return (
    <section id={endpoint.id} className="scroll-mt-24 rounded-2xl border border-gray-200 dark:border-gray-700 overflow-hidden">
      <div className="p-5 border-b border-gray-100 dark:border-gray-800">
        <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 mb-2">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">{endpoint.title}</h2>
          <code className="text-sm font-mono text-blue-600 dark:text-blue-400">GET {endpoint.path}</code>
          <span className="text-xs text-gray-400">→ {endpoint.returns}</span>
        </div>
        <p className="text-sm text-gray-600 dark:text-gray-400">{endpoint.description}</p>
      </div>

      {endpoint.params.length > 0 && (
        <div className="px-5 py-4 border-b border-gray-100 dark:border-gray-800">
          <h3 className="text-xs uppercase tracking-wide text-gray-400 mb-3">Parameters</h3>
          <dl className="space-y-2">
            {endpoint.params.map((p) => (
              <div key={p.name} className="flex flex-col sm:flex-row sm:gap-4">
                <dt className="sm:w-32 flex-shrink-0">
                  <code className="text-sm font-mono text-gray-900 dark:text-gray-100">{p.name}</code>
                  {p.required && <span className="ml-1.5 text-[10px] uppercase text-red-500 font-semibold">required</span>}
                </dt>
                <dd className="text-sm text-gray-600 dark:text-gray-400">{p.description}</dd>
              </div>
            ))}
          </dl>
        </div>
      )}

      <div className="px-5 py-4">
        <h3 className="text-xs uppercase tracking-wide text-gray-400 mb-3">Try it</h3>
        {endpoint.examples.length > 1 && (
          <div className="flex flex-wrap gap-2 mb-3">
            {endpoint.examples.map((ex, i) => (
              <button
                key={ex.label}
                type="button"
                onClick={() => setActive(i)}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                  i === active
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
                }`}
              >
                {ex.label}
              </button>
            ))}
          </div>
        )}

        <div className="flex gap-2">
          <code className="flex-1 min-w-0 px-3 py-2.5 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 font-mono text-xs text-gray-800 dark:text-gray-200 break-all">
            {url}
          </code>
          <button
            type="button"
            onClick={copy}
            className="flex-shrink-0 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold transition-colors"
          >
            {copied ? "✓" : "Copy"}
          </button>
        </div>

        <div className="mt-3 flex flex-wrap items-center gap-4">
          <a
            href={url}
            target="_blank"
            rel="noopener"
            className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
          >
            Open the live response →
          </a>
          {endpoint.previewImage && (
            /* eslint-disable-next-line @next/next/no-img-element */
            <img
              src={url}
              alt={`${endpoint.title} example output`}
              width={120}
              height={120}
              className="rounded-lg border border-gray-200 dark:border-gray-700 bg-white"
            />
          )}
        </div>
      </div>
    </section>
  );
}
