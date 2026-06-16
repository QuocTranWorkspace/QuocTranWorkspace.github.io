"use client";

import { motion, type Variants } from "framer-motion";
import { cn } from "@/lib/utils";

const wordVariants: Variants = {
  hidden: { y: "110%" },
  visible: {
    y: "0%",
    transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] },
  },
};

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.06, delayChildren: 0.05 },
  },
};

type RevealTextProps = {
  /**
   * Plain text. `\n` becomes a line break; `*word*` renders italic.
   */
  text: string;
  className?: string;
  /** Delay before the cascade begins (seconds). */
  delay?: number;
  as?: "h1" | "h2" | "p" | "span";
};

type Token = { text: string; italic: boolean };

function parseLine(line: string): Token[] {
  // Split keeping asterisk-delimited segments.
  const parts = line.split(/(\*[^*]+\*)/g).filter(Boolean);
  return parts.flatMap((part) => {
    if (/^\*.+\*$/.test(part)) {
      // Single italic word/phrase. Re-split internal spaces so each word
      // gets its own slide-up.
      const inner = part.slice(1, -1);
      return inner.split(/(\s+)/).filter(Boolean).map((t) => ({
        text: t,
        italic: !/^\s+$/.test(t),
      }));
    }
    return part.split(/(\s+)/).filter(Boolean).map((t) => ({
      text: t,
      italic: false,
    }));
  });
}

/**
 * Word-by-word slide-up reveal. Each word sits inside an overflow-hidden
 * wrapper, then translates from 110% (below baseline) to 0%. Lines are
 * separated by `\n` in the source string; `*word*` segments render italic.
 */
export function RevealText({
  text,
  className,
  delay = 0,
  as = "span",
}: RevealTextProps) {
  const Tag = motion[as];
  const lines = text.split("\n");

  return (
    <Tag
      className={className}
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      transition={{ delayChildren: delay }}
    >
      {lines.map((line, lineIdx) => (
        <span key={lineIdx} className="block">
          {parseLine(line).map((tok, tokIdx) => {
            if (/^\s+$/.test(tok.text)) {
              return <span key={tokIdx}>{tok.text}</span>;
            }
            return (
              <span
                key={tokIdx}
                className={cn(
                  "inline-block overflow-hidden align-bottom pb-[0.12em]",
                )}
              >
                <motion.span
                  variants={wordVariants}
                  // Italic tokens carry the cobalt accent — the visual
                  // "shipping" tag in headlines like "I ship *production*
                  // systems" without resorting to color in plain copy.
                  className={cn(
                    "inline-block",
                    tok.italic && "italic text-accent",
                  )}
                >
                  {tok.text}
                </motion.span>
              </span>
            );
          })}
        </span>
      ))}
    </Tag>
  );
}
