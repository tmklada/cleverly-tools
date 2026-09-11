"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { isFavorite, toggleFavorite } from "@/lib/user-tools";

export default function FavoriteButton({ slug }: { slug: string }) {
  const [fav, setFav] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setFav(isFavorite(slug));
    setMounted(true);
  }, [slug]);

  return (
    <motion.button
      type="button"
      whileTap={{ scale: 0.85 }}
      onClick={() => setFav(toggleFavorite(slug))}
      aria-pressed={fav}
      aria-label={fav ? "Remove from favorites" : "Save to favorites"}
      title={fav ? "Saved — shows on your home page" : "Save this tool to your favorites"}
      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium border transition-colors ${
        fav
          ? "bg-amber-50 dark:bg-amber-900/30 border-amber-300 dark:border-amber-700 text-amber-700 dark:text-amber-300"
          : "bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:border-amber-300 hover:text-amber-600"
      } ${mounted ? "" : "invisible"}`}
    >
      <span aria-hidden>{fav ? "★" : "☆"}</span>
      {fav ? "Saved" : "Save"}
    </motion.button>
  );
}
