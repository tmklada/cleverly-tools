"use client";
import { useState } from "react";

interface Rule {
  id: number;
  userAgent: string;
  allow: string;
  disallow: string;
  sitemap: string;
}

const templates = {
  wordpress: `User-agent: *
Allow: /wp-content/uploads/
Disallow: /wp-admin/
Disallow: /wp-includes/
Disallow: /wp-login.php
Disallow: /?s=
Disallow: /search

Sitemap: https://example.com/sitemap.xml`,

  nextjs: `User-agent: *
Allow: /
Disallow: /api/
Disallow: /_next/
Disallow: /admin/

Sitemap: https://example.com/sitemap.xml`,

  shopify: `User-agent: *
Disallow: /admin/
Disallow: /cart
Disallow: /orders/
Disallow: /checkouts/
Disallow: /checkout
Disallow: /account
Disallow: /search?

Sitemap: https://example.com/sitemap.xml`,
};

export default function RobotsTxtGenerator() {
  const [mode, setMode] = useState<"allow" | "block" | "custom">("allow");
  const [rules, setRules] = useState<Rule[]>([{ id: 1, userAgent: "*", allow: "/", disallow: "", sitemap: "" }]);
  const [sitemap, setSitemap] = useState("");
  const [copied, setCopied] = useState(false);
  const [customTemplate, setCustomTemplate] = useState("");

  function addRule() {
    setRules(prev => [...prev, { id: Date.now(), userAgent: "*", allow: "", disallow: "", sitemap: "" }]);
  }

  function updateRule(id: number, field: keyof Rule, value: string) {
    setRules(prev => prev.map(r => r.id === id ? { ...r, [field]: value } : r));
  }

  function removeRule(id: number) {
    setRules(prev => prev.filter(r => r.id !== id));
  }

  function generateOutput(): string {
    if (mode === "allow") {
      return `User-agent: *\nAllow: /\n${sitemap ? `\nSitemap: ${sitemap}` : ""}`.trim();
    }
    if (mode === "block") {
      return `User-agent: *\nDisallow: /\n${sitemap ? `\nSitemap: ${sitemap}` : ""}`.trim();
    }
    if (customTemplate) return customTemplate;

    return rules.map(rule => {
      const lines = [`User-agent: ${rule.userAgent || "*"}`];
      if (rule.allow) lines.push(`Allow: ${rule.allow}`);
      if (rule.disallow) lines.push(`Disallow: ${rule.disallow}`);
      if (rule.sitemap) lines.push(`\nSitemap: ${rule.sitemap}`);
      return lines.join("\n");
    }).join("\n\n") + (sitemap ? `\n\nSitemap: ${sitemap}` : "");
  }

  const output = generateOutput();

  function copy() {
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  function download() {
    const blob = new Blob([output], { type: "text/plain" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "robots.txt";
    a.click();
  }

  function applyTemplate(key: keyof typeof templates) {
    setMode("custom");
    setCustomTemplate(templates[key]);
  }

  return (
    <div className="space-y-5">
      {/* Mode selector */}
      <div className="flex gap-2 flex-wrap">
        {[["allow", "Allow All"], ["block", "Block All"], ["custom", "Custom Rules"]] .map(([m, label]) => (
          <button key={m} onClick={() => { setMode(m as typeof mode); setCustomTemplate(""); }}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${mode === m ? "bg-blue-600 text-white" : "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300"}`}>
            {label}
          </button>
        ))}
      </div>

      {/* Templates */}
      <div>
        <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Quick Templates</p>
        <div className="flex gap-2 flex-wrap">
          {(["wordpress", "nextjs", "shopify"] as const).map(t => (
            <button key={t} onClick={() => applyTemplate(t)}
              className="px-3 py-1.5 text-xs bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-lg transition-colors capitalize">
              {t === "nextjs" ? "Next.js" : t.charAt(0).toUpperCase() + t.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {mode === "custom" && !customTemplate && (
        <div className="space-y-3">
          {rules.map((rule, i) => (
            <div key={rule.id} className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-4 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Rule {i + 1}</span>
                {rules.length > 1 && (
                  <button onClick={() => removeRule(rule.id)} className="text-red-500 hover:text-red-700 text-xs">Remove</button>
                )}
              </div>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { label: "User-agent", field: "userAgent" as const, placeholder: "*" },
                  { label: "Allow", field: "allow" as const, placeholder: "/public/" },
                  { label: "Disallow", field: "disallow" as const, placeholder: "/admin/" },
                  { label: "Sitemap", field: "sitemap" as const, placeholder: "https://..." },
                ].map(({ label, field, placeholder }) => (
                  <div key={field}>
                    <label className="text-xs text-gray-500 dark:text-gray-400">{label}</label>
                    <input type="text" value={rule[field]} onChange={e => updateRule(rule.id, field, e.target.value)} placeholder={placeholder}
                      className="w-full mt-0.5 px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                  </div>
                ))}
              </div>
            </div>
          ))}
          <button onClick={addRule} className="text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400">+ Add Rule</button>
        </div>
      )}

      {mode === "custom" && customTemplate && (
        <div>
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 block">Edit Template</label>
          <textarea value={customTemplate} onChange={e => setCustomTemplate(e.target.value)} rows={10}
            className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white font-mono text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none" />
        </div>
      )}

      {(mode === "allow" || mode === "block") && (
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Sitemap URL (optional)</label>
          <input type="url" value={sitemap} onChange={e => setSitemap(e.target.value)} placeholder="https://example.com/sitemap.xml"
            className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </div>
      )}

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <p className="text-sm font-medium text-gray-700 dark:text-gray-300">robots.txt Preview</p>
          <div className="flex gap-2">
            <button onClick={copy} className="text-xs px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors">
              {copied ? "Copied!" : "Copy"}
            </button>
            <button onClick={download} className="text-xs px-3 py-1 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors">
              Download
            </button>
          </div>
        </div>
        <pre className="bg-gray-900 text-green-400 text-xs p-4 rounded-xl overflow-x-auto whitespace-pre-wrap min-h-[100px]">{output}</pre>
      </div>
    </div>
  );
}
