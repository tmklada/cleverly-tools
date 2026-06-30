"use client";
import { useState, useEffect, useCallback } from "react";

interface IpData {
  ip: string;
  country_name?: string;
  city?: string;
  org?: string;
  timezone?: string;
  latitude?: number;
  longitude?: number;
  error?: boolean;
}

export default function IpAddressLookup() {
  const [myIp, setMyIp] = useState<string>("");
  const [data, setData] = useState<IpData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [lookupIp, setLookupIp] = useState("");
  const [copied, setCopied] = useState(false);

  const fetchGeoData = useCallback(async (ip: string) => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`https://ipapi.co/${ip}/json/`);
      if (!res.ok) throw new Error("Failed to fetch geo data");
      const json: IpData = await res.json();
      if (json.error) throw new Error("Invalid IP address");
      setData(json);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to fetch data");
      setData(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const init = async () => {
      try {
        const res = await fetch("https://api.ipify.org?format=json");
        const json = await res.json();
        setMyIp(json.ip);
        await fetchGeoData(json.ip);
      } catch {
        setError("Could not detect your IP address");
        setLoading(false);
      }
    };
    init();
  }, [fetchGeoData]);

  const handleLookup = (e: React.FormEvent) => {
    e.preventDefault();
    if (lookupIp.trim()) fetchGeoData(lookupIp.trim());
  };

  const copyIp = async () => {
    const ip = data?.ip || myIp;
    if (!ip) return;
    await navigator.clipboard.writeText(ip);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const Field = ({ label, value }: { label: string; value?: string | number }) => (
    <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
      <p className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-1">{label}</p>
      <p className="text-gray-900 dark:text-white font-semibold">{value || "—"}</p>
    </div>
  );

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Your IP Address</h2>

        {loading ? (
          <div className="flex items-center gap-3 py-8 justify-center">
            <div className="w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
            <span className="text-gray-500 dark:text-gray-400">Detecting your IP...</span>
          </div>
        ) : error ? (
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 text-red-700 dark:text-red-400">
            {error}
          </div>
        ) : data ? (
          <>
            <div className="flex items-center gap-4 mb-6 bg-blue-50 dark:bg-blue-900/20 rounded-xl p-4">
              <div className="flex-1">
                <p className="text-sm text-blue-600 dark:text-blue-400 font-medium">IP Address</p>
                <p className="text-3xl font-bold text-blue-700 dark:text-blue-300">{data.ip}</p>
              </div>
              <button
                onClick={copyIp}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors"
              >
                {copied ? "Copied!" : "Copy IP"}
              </button>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <Field label="Country" value={data.country_name} />
              <Field label="City" value={data.city} />
              <Field label="ISP / Org" value={data.org} />
              <Field label="Timezone" value={data.timezone} />
              <Field label="Latitude" value={data.latitude} />
              <Field label="Longitude" value={data.longitude} />
            </div>
            {data.latitude && data.longitude && (
              <div className="mt-4 bg-gray-100 dark:bg-gray-800 rounded-xl p-4 text-center">
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Coordinates</p>
                <p className="font-mono text-gray-900 dark:text-white">
                  {data.latitude.toFixed(4)}, {data.longitude.toFixed(4)}
                </p>
                <a
                  href={`https://www.openstreetmap.org/?mlat=${data.latitude}&mlon=${data.longitude}&zoom=12`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block mt-2 text-blue-600 dark:text-blue-400 text-sm hover:underline"
                >
                  View on map →
                </a>
              </div>
            )}
          </>
        ) : null}
      </div>

      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Lookup Any IP</h3>
        <form onSubmit={handleLookup} className="flex gap-3">
          <input
            type="text"
            value={lookupIp}
            onChange={(e) => setLookupIp(e.target.value)}
            placeholder="Enter any IP address..."
            className="flex-1 px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            disabled={loading}
            className="px-5 py-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white rounded-lg font-medium transition-colors"
          >
            Lookup
          </button>
        </form>
      </div>
    </div>
  );
}
