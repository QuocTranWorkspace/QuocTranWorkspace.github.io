import { Inter, JetBrains_Mono, Playfair_Display } from "next/font/google";

/**
 * Font loading — every face MUST include the `vietnamese` subset.
 *
 * Vietnamese diacritics live in Latin Extended Additional (U+1EA0-U+1EFF).
 * `subsets: ["latin"]` only ships Basic Latin, so VN characters fell through
 * to the browser's default system serif/sans/mono — the inconsistent
 * appearance that motivated this change. Adding `"vietnamese"` ships the
 * full extended set as a separate woff2 chunk loaded on demand.
 *
 * Display face: Playfair Display (was Instrument Serif).
 * Instrument Serif's Vietnamese subset on Google Fonts has poor tone-mark
 * placement and is missing several composed glyphs at the time of writing.
 * Playfair Display ships clean Vietnamese, keeps the same high-contrast
 * serif drama at hero sizes, and offers extra weights if we need to push
 * a single word harder later.
 */

export const playfairDisplay = Playfair_Display({
  subsets: ["latin", "vietnamese"],
  weight: ["400", "500", "700"],
  style: ["normal", "italic"],
  variable: "--font-instrument-serif",
  display: "swap",
});

export const inter = Inter({
  subsets: ["latin", "vietnamese"],
  variable: "--font-inter",
  display: "swap",
});

export const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin", "vietnamese"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

export const fontVariables = [
  playfairDisplay.variable,
  inter.variable,
  jetbrainsMono.variable,
].join(" ");
