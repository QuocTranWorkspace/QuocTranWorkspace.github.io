"use client";

import { motion, type HTMLMotionProps } from "framer-motion";

type FadeUpProps = HTMLMotionProps<"div"> & {
  delay?: number;
  distance?: number;
};

/**
 * Single-element fade-up. Mounts at opacity 0, y=distance, settles to 0/1.
 * For multi-element cascades, stack several FadeUps with stepped delays.
 */
export function FadeUp({
  delay = 0,
  distance = 24,
  children,
  ...rest
}: FadeUpProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: distance }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay }}
      {...rest}
    >
      {children}
    </motion.div>
  );
}
