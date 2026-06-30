import { requireAuth } from "@/lib/admin-auth";
import Link from "next/link";
import MonitoringClient from "./MonitoringClient";

export const metadata = { title: "Monitoring — Admin", robots: { index: false } };

export default async function MonitoringPage() {
  await requireAuth();

  return (
    <div className="min-h-screen bg-gray-950">
      <header className="bg-gray-900 border-b border-gray-800 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link href="/admin/dashboard" className="text-gray-400 hover:text-white text-sm">← Dashboard</Link>
          <span className="text-gray-600">/</span>
          <span className="text-white font-medium">🔍 Monitoring</span>
        </div>
        <span className="text-xs text-gray-500">Auto-refreshes every 60s</span>
      </header>
      <MonitoringClient />
    </div>
  );
}
