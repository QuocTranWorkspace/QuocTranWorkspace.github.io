"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Check } from "lucide-react";
import { createContext, useCallback, useContext, useRef, useState } from "react";
import { cn } from "@/lib/utils";

type ToastEntry = { id: number; message: string };

type ToastContextValue = {
  show: (message: string) => void;
};

const ToastContext = createContext<ToastContextValue | null>(null);

export function useToast(): ToastContextValue {
  const ctx = useContext(ToastContext);
  if (!ctx) {
    throw new Error("useToast must be used inside <ToastProvider>");
  }
  return ctx;
}

/**
 * Tiny stand-alone toast system. Single bottom-center pill, auto-dismisses
 * after 2 s, AnimatePresence handles the in/out. One outstanding toast at a
 * time — newer messages replace older ones (UX is calmer than a stack).
 */
export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toast, setToast] = useState<ToastEntry | null>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const show = useCallback((message: string) => {
    setToast({ id: Date.now(), message });
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => setToast(null), 2200);
  }, []);

  return (
    <ToastContext.Provider value={{ show }}>
      {children}
      <div className="pointer-events-none fixed inset-x-0 bottom-8 z-40 flex justify-center px-4">
        <AnimatePresence mode="wait">
          {toast ? (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, y: 16, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 16, scale: 0.96 }}
              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
              className={cn(
                "pointer-events-auto inline-flex items-center gap-2 rounded-full border rule",
                "bg-bg-elev/95 px-4 py-2.5 backdrop-blur-md shadow-lg shadow-black/40",
                "font-mono text-xs uppercase tracking-widest text-ink",
              )}
              role="status"
              aria-live="polite"
            >
              <Check className="size-3.5 text-accent" aria-hidden />
              {toast.message}
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
}
