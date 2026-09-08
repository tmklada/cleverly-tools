import { useEffect, useRef, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { EASE } from "@/lib/motion";
import { a11y } from "@/content/ar";

type Props = {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
  labelledBy: string;
};

/** نافذة Modal حديثة: Escape، نقر خارجها، قفل التمرير، وإدارة التركيز */
export default function Modal({ open, onClose, children, labelledBy }: Props) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const lastActive = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!open) return;
    lastActive.current = document.activeElement as HTMLElement | null;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    const t = window.setTimeout(() => closeRef.current?.focus(), 30);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
      window.clearTimeout(t);
      lastActive.current?.focus?.();
    };
  }, [open, onClose]);

  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[90] flex items-end justify-center p-0 sm:items-center sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          role="presentation"
        >
          <button
            aria-label={a11y.closeModal}
            onClick={onClose}
            className="absolute inset-0 bg-night/55 backdrop-blur-md cursor-default"
            tabIndex={-1}
          />
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby={labelledBy}
            initial={{ opacity: 0, y: 40, scale: 0.98, filter: "blur(8px)" }}
            animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: 24, scale: 0.98, filter: "blur(6px)" }}
            transition={{ duration: 0.45, ease: EASE }}
            className="relative w-full max-w-3xl overflow-hidden rounded-t-[28px] bg-white sm:rounded-[28px] card-shadow-lg max-h-[92dvh] overflow-y-auto"
          >
            <button
              ref={closeRef}
              onClick={onClose}
              aria-label={a11y.closeModal}
              className="absolute left-4 top-4 z-10 grid h-10 w-10 place-items-center rounded-full bg-white/90 text-ink hairline transition hover:bg-cream-2"
            >
              <X className="h-5 w-5" />
            </button>
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
}
