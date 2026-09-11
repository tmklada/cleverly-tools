"use client";

import { useEffect } from "react";
import { recordToolVisit } from "@/lib/user-tools";

export default function TrackToolVisit({ slug }: { slug: string }) {
  useEffect(() => {
    recordToolVisit(slug);
  }, [slug]);
  return null;
}
