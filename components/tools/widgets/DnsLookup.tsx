"use client";
import { useState } from "react";

const RECORD_TYPES = ["ALL", "A", "AAAA", "MX", "CNAME", "TXT", "NS", "SOA"] as const;
type RecordType = (typeof RECORD_TYPES)[number];
const QUERY_TYPES = RECORD_TYPES.filter((t) => t !== "ALL");

interface DnsAnswer {
  name: string;
  type: number;
  TTL: number;
  data: string;
}

interface ResultGroup {
  type: string;
  answers: DnsAnswer[];
}

const TYPE_NAMES: Record<number, string> = { 1: "A", 2: "NS", 5: "CNAME", 6: "SOA", 15: "MX", 16: "TXT", 28: "AAAA" };

async function query(domain: string, type: string): Promise<DnsAnswer[]> {
  const res = await fetch(
    `https://cloudflare-dns.com/dns-query?name=${encodeURIComponent(domain)}&type=${type}`,
    { headers: { accept: "application/dns-json" } }
  );
  if (!res.ok) throw new Error(`DNS query failed (${res.status})`);
  const json = await res.json();
  if (json.Status === 3) throw new Error("Domain not found (NXDOMAIN)");
  const answers: DnsAnswer[] = json.Answer ?? [];
  return answers.filter((a) => TYPE_NAMES[a.type] === type);
}

export default function DnsLookup() {
  const [domain, setDomain] = useState("");
  const [recordType, setRecordType] = useState<RecordType>("ALL");
  const [results, setResults] = useState<ResultGroup[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function lookup(e: React.FormEvent) {
    e.preventDefault();
    const clean = domain.trim().toLowerCase().replace(/^https?:\/\//, "").replace(/\/.*$/, "");
    if (!clean || !/^[a-z0-9.-]+\.[a-z]{2,}$/.test(clean)) {
      setError("Enter a valid domain name, e.g. example.com");
      return;
    }
    setDomain(clean);
    setLoading(true);
    setError("");
    setResults(null);
    try {
      const types = recordType === "ALL" ? QUERY_TYPES : [recordType];
      const groups = await Promise.all(
        types.map(async (type) => ({ type, answers: await query(clean, type) }))
      );
      setResults(groups.filter((g) => g.answers.length > 0));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Lookup failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-5">
      <form onSubmit={lookup} className="flex flex-col sm:flex-row gap-3">
        <input
          type="text"
          value={domain}
          onChange={(e) => setDomain(e.target.value)}
          placeholder="example.com"
          className="flex-1 px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <select
          value={recordType}
          onChange={(e) => setRecordType(e.target.value as RecordType)}
          className="px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {RECORD_TYPES.map((t) => (
            <option key={t} value={t}>{t === "ALL" ? "All records" : t}</option>
          ))}
        </select>
        <button
          type="submit"
          disabled={loading}
          className="px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-bold rounded-xl transition-colors"
        >
          {loading ? "Looking up…" : "Lookup"}
        </button>
      </form>

      {error && (
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 text-red-700 dark:text-red-400 rounded-xl px-4 py-3 text-sm">
          ⚠️ {error}
        </div>
      )}

      {results && results.length === 0 && (
        <div className="text-sm text-gray-500 bg-gray-50 dark:bg-gray-800/50 rounded-xl px-4 py-3">
          No {recordType === "ALL" ? "" : recordType + " "}records found for {domain}.
        </div>
      )}

      {results && results.length > 0 && (
        <div className="space-y-4">
          {results.map((group) => (
            <div key={group.type} className="rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
              <div className="px-4 py-2 bg-gray-50 dark:bg-gray-800 text-xs font-bold text-gray-600 dark:text-gray-300 uppercase tracking-wide flex justify-between">
                <span>{group.type} records</span>
                <span className="font-normal normal-case text-gray-400">{group.answers.length}</span>
              </div>
              <div className="divide-y divide-gray-100 dark:divide-gray-700">
                {group.answers.map((a, i) => (
                  <div key={i} className="px-4 py-3 flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4 text-sm">
                    <code className="flex-1 break-all font-mono text-gray-900 dark:text-gray-100">{a.data.replace(/^"|"$/g, "")}</code>
                    <span className="text-xs text-gray-400 whitespace-nowrap">TTL {a.TTL}s</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      <p className="text-xs text-gray-400">
        Queries are answered by Cloudflare&apos;s public resolver (1.1.1.1) over DNS-over-HTTPS. Results reflect the current
        public DNS, not your local cache.
      </p>
    </div>
  );
}
