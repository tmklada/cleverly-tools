"use client";

import { useState, useEffect, useCallback } from "react";

interface HealthCheck {
  slug: string;
  title: string;
  icon: string;
  status: "ok" | "error";
  statusCode?: number;
  responseTime?: number;
  error?: string;
}

interface HealthSummary {
  total: number;
  ok: number;
  errors: number;
  timestamp: string;
}

interface ApiStatus {
  name: string;
  ok: boolean;
  statusCode?: number;
  error?: string;
}

interface ErrorEntry {
  id: string;
  timestamp: string;
  tool: string;
  platform: string;
  url: string;
  error: string;
}

export default function MonitoringClient() {
  const [health, setHealth] = useState<{ summary: HealthSummary; checks: HealthCheck[] } | null>(null);
  const [apis, setApis] = useState<ApiStatus[]>([]);
  const [errors, setErrors] = useState<ErrorEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [lastRefresh, setLastRefresh] = useState<Date | null>(null);

  const fetchAll = useCallback(async () => {
    setLoading(true);
    try {
      const [healthRes, apiRes, errorsRes] = await Promise.allSettled([
        fetch("/api/admin/health").then(r => r.json()),
        fetch("/api/admin/api-status").then(r => r.json()),
        fetch("/api/admin/errors").then(r => r.json()),
      ]);

      if (healthRes.status === "fulfilled") setHealth(healthRes.value);
      if (apiRes.status === "fulfilled") setApis(apiRes.value.apis ?? []);
      if (errorsRes.status === "fulfilled") setErrors(errorsRes.value.errors ?? []);
      setLastRefresh(new Date());
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAll();
    const interval = setInterval(fetchAll, 60000);
    return () => clearInterval(interval);
  }, [fetchAll]);

  async function clearErrors() {
    await fetch("/api/admin/errors", { method: "DELETE" });
    setErrors([]);
  }

  const okTools = health?.checks.filter(c => c.status === "ok") ?? [];
  const errorTools = health?.checks.filter(c => c.status === "error") ?? [];
  const avgResponse = health?.checks.length
    ? Math.round(health.checks.reduce((s, c) => s + (c.responseTime ?? 0), 0) / health.checks.length)
    : 0;

  return (
    <div className="max-w-6xl mx-auto px-6 py-8 space-y-6">
      {/* Refresh */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-400">
          {lastRefresh ? `Last updated: ${lastRefresh.toLocaleTimeString()}` : "Loading..."}
        </p>
        <button onClick={fetchAll} disabled={loading}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white text-sm font-medium rounded-xl transition-colors">
          {loading ? "⟳ Refreshing..." : "⟳ Refresh Now"}
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Tools Checked", value: health?.summary.total ?? "—", icon: "🛠️", color: "border-gray-700" },
          { label: "✅ Working", value: health?.summary.ok ?? "—", icon: "✅", color: "border-green-700" },
          { label: "❌ Errors", value: health?.summary.errors ?? "—", icon: "❌", color: "border-red-700" },
          { label: "Avg Response", value: avgResponse ? `${avgResponse}ms` : "—", icon: "⚡", color: "border-blue-700" },
        ].map(({ label, value, icon, color }) => (
          <div key={label} className={`bg-gray-900 border ${color} rounded-2xl p-5`}>
            <div className="text-2xl mb-1">{icon}</div>
            <div className="text-3xl font-bold text-white">{value}</div>
            <div className="text-xs text-gray-400 mt-1">{label}</div>
          </div>
        ))}
      </div>

      {/* API Status */}
      <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
        <h2 className="text-white font-bold mb-4">🔌 External APIs (RapidAPI)</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {apis.length === 0 && loading && (
            <div className="text-gray-500 text-sm col-span-2">Checking APIs...</div>
          )}
          {apis.map((api) => (
            <div key={api.name} className={`flex items-center justify-between p-4 rounded-xl border ${
              api.ok ? "bg-green-900/20 border-green-800" : "bg-red-900/20 border-red-800"
            }`}>
              <div>
                <div className="text-white font-medium text-sm">{api.name}</div>
                {api.error && <div className="text-red-400 text-xs mt-0.5">{api.error}</div>}
              </div>
              <span className={`text-sm font-bold ${api.ok ? "text-green-400" : "text-red-400"}`}>
                {api.ok ? "✅ OK" : "❌ DOWN"}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Error Tools */}
      {errorTools.length > 0 && (
        <div className="bg-red-900/20 border border-red-800 rounded-2xl p-6">
          <h2 className="text-red-400 font-bold mb-4">❌ Tools with Errors ({errorTools.length})</h2>
          <div className="space-y-2">
            {errorTools.map((tool) => (
              <div key={tool.slug} className="flex items-center justify-between bg-red-900/20 rounded-xl p-3">
                <div className="flex items-center gap-2">
                  <span>{tool.icon}</span>
                  <span className="text-white text-sm">{tool.title}</span>
                  {tool.error && <span className="text-red-400 text-xs">— {tool.error}</span>}
                </div>
                <a href={`/tools/${tool.slug}`} target="_blank"
                  className="text-xs text-red-400 hover:text-white px-2 py-1 rounded hover:bg-red-900/40">
                  View ↗
                </a>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* All Tools Status */}
      <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
        <h2 className="text-white font-bold mb-4">🛠️ Tool Health Status</h2>
        {loading && !health && <div className="text-gray-500 text-sm">Running health checks...</div>}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {health?.checks.map((tool) => (
            <div key={tool.slug} className="flex items-center justify-between py-2 px-3 rounded-lg hover:bg-gray-800/50">
              <div className="flex items-center gap-2">
                <span className={`w-2 h-2 rounded-full flex-shrink-0 ${tool.status === "ok" ? "bg-green-500" : "bg-red-500"}`} />
                <span className="text-sm text-gray-300">{tool.icon} {tool.title}</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-gray-500">
                {tool.responseTime && <span>{tool.responseTime}ms</span>}
                <a href={`/tools/${tool.slug}`} target="_blank" className="hover:text-white">↗</a>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Error Log */}
      <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-white font-bold">📋 Download API Error Log ({errors.length})</h2>
          {errors.length > 0 && (
            <button onClick={clearErrors}
              className="text-xs text-red-400 hover:text-red-300 px-3 py-1 rounded-lg hover:bg-gray-800 transition-colors">
              Clear Log
            </button>
          )}
        </div>
        {errors.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <div className="text-3xl mb-2">✅</div>
            <p className="text-sm">No errors logged. All download APIs working normally.</p>
          </div>
        ) : (
          <div className="space-y-2 max-h-80 overflow-y-auto">
            {errors.map((err) => (
              <div key={err.id} className="bg-gray-800 rounded-xl p-3 text-sm">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-red-400 font-medium">{err.tool}</span>
                  <span className="text-gray-500 text-xs">{new Date(err.timestamp).toLocaleString()}</span>
                </div>
                <div className="text-gray-300 text-xs">{err.error}</div>
                <div className="text-gray-500 text-xs mt-1 truncate">{err.url}</div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Quick Links */}
      <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
        <h2 className="text-white font-bold mb-4">🔗 Quick Links</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { label: "Live Site", href: "https://cleverly.tools", icon: "🌐" },
            { label: "Vercel Logs", href: "https://vercel.com/tawfik164-6141s-projects/cleverly-tools", icon: "▲" },
            { label: "GA4 Dashboard", href: "https://analytics.google.com", icon: "📊" },
            { label: "Search Console", href: "https://search.google.com/search-console", icon: "🔍" },
            { label: "RapidAPI", href: "https://rapidapi.com/hub", icon: "⚡" },
            { label: "Ezoic Dashboard", href: "https://pubdash.ezoic.com", icon: "💰" },
            { label: "GitHub Repo", href: "https://github.com/tmklada/cleverly-tools", icon: "🐙" },
            { label: "Sitemap", href: "https://cleverly.tools/sitemap.xml", icon: "🗺️" },
          ].map(({ label, href, icon }) => (
            <a key={label} href={href} target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-2 bg-gray-800 hover:bg-gray-700 rounded-xl p-3 text-sm text-gray-300 hover:text-white transition-colors">
              <span>{icon}</span>
              <span>{label}</span>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
