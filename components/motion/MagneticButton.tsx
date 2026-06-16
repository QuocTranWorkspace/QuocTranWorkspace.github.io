"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef, type ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/utils";
import { getLenis } from "@/lib/lenis";

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

  const onClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const href = (rest.href ?? "").toString();
    if (!href.startsWith("#")) return;
    const target = document.getElementById(href.slice(1));
    if (!target) return;
    e.preventDefault();
    e.stopPropagation();
    const lenis = getLenis();
    if (lenis) {
      lenis.scrollTo(target, { duration: 1.4, lock: true });
    } else {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <motion.a
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={reset}
      onClick={onClick}
      style={{ x: sx, y: sy }}
      className={cn(
        "inline-flex items-center gap-3 rounded-full border border-accent/40 bg-bg-elev px-6 py-3",
        "font-mono text-xs uppercase tracking-widest text-accent",
        "transition-[colors,box-shadow] duration-300",
        "hover:border-accent hover:bg-accent hover:text-bg",
        // Soft cobalt aura on hover — uses --color-accent-glow so a
        // future palette change updates here too.
        "hover:shadow-[0_0_30px_rgba(var(--color-accent-glow)/0.35)]",
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
