import type { Metadata } from "next";
import { Suspense } from "react";
import SearchResults from "./SearchResults";

export const metadata: Metadata = {
  title: "Search Tools",
  description: "Search all 94 free online tools on cleverly.tools.",
  robots: { index: false, follow: true },
};

export default function SearchPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <Suspense fallback={<div className="text-gray-400">Loading…</div>}>
        <SearchResults />
      </Suspense>
    </div>
  );
}
