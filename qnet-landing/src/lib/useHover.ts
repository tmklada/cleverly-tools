import { useEffect, useState } from "react";

/** true فقط على الأجهزة التي تدعم hover حقيقي (ماوس) */
export function useCanHover(): boolean {
  const [can, setCan] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(hover: hover) and (pointer: fine)");
    const update = () => setCan(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);
  return can;
}
