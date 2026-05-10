"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef, type ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/utils";

type MagneticButtonProps = ComponentPropsWithoutRef<typeof motion.a> & {
  strength?: number;
};

/**
 * Anchor-flavored magnetic button. Tracks the cursor relative to its center
 * and translates content with a soft spring. Disable behavior automatically
 * via prefers-reduced-motion (Framer respects the media query through its
 * MotionConfig pipeline).
 */
export function MagneticButton({
  className,
  strength = 0.35,
  children,
  ...rest
}: MagneticButtonProps) {
  const ref = useRef<HTMLAnchorElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 200, damping: 18, mass: 0.6 });
  const sy = useSpring(y, { stiffness: 200, damping: 18, mass: 0.6 });
  const innerX = useTransform(sx, (v) => v * 0.5);
  const innerY = useTransform(sy, (v) => v * 0.5);

  const onMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const dx = e.clientX - (r.left + r.width / 2);
    const dy = e.clientY - (r.top + r.height / 2);
    x.set(dx * strength);
    y.set(dy * strength);
  };

  const reset = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.a
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={reset}
      style={{ x: sx, y: sy }}
      className={cn(
        "inline-flex items-center gap-3 rounded-full border border-accent/40 bg-bg-elev px-6 py-3",
        "font-mono text-xs uppercase tracking-widest text-accent",
        "transition-colors hover:border-accent hover:bg-accent hover:text-bg",
        className,
      )}
      {...rest}
    >
      <motion.span style={{ x: innerX, y: innerY }} className="inline-flex items-center gap-2">
        {children}
      </motion.span>
    </motion.a>
  );
}
