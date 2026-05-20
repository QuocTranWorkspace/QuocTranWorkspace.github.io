// One-shot helper to compress the freshly-captured /work/<slug>/*.png
// screenshots into JPEGs sized for the portfolio. Run once after captures.
// Idempotent: deletes the source PNG only when the JPEG writes cleanly.

import sharp from "sharp";
import { readdirSync, statSync, unlinkSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..", "public", "work");

const MAX_WIDTH = 1600;        // plenty for the deep-dive layout
const JPEG_QUALITY = 78;       // visibly clean, big size win

const slugs = readdirSync(ROOT).filter((n) =>
  statSync(join(ROOT, n)).isDirectory(),
);

for (const slug of slugs) {
  const dir = join(ROOT, slug);
  const files = readdirSync(dir).filter((f) => f.toLowerCase().endsWith(".png"));
  for (const f of files) {
    const src = join(dir, f);
    const size = statSync(src).size;
    // Tiny PNG (< 10 KB) means the capture failed / page was blank — drop it.
    if (size < 10_000) {
      unlinkSync(src);
      console.log(`drop empty -> ${slug}/${f}`);
      continue;
    }
    const out = src.replace(/\.png$/i, ".jpg");
    await sharp(src)
      .resize({ width: MAX_WIDTH, withoutEnlargement: true })
      .jpeg({ quality: JPEG_QUALITY, progressive: true, mozjpeg: true })
      .toFile(out);
    if (existsSync(out)) {
      unlinkSync(src);
      const newSize = statSync(out).size;
      const pct = Math.round((newSize / size) * 100);
      console.log(
        `${slug}/${f} ${Math.round(size / 1024)} KB -> ${Math.round(
          newSize / 1024,
        )} KB (${pct}%)`,
      );
    }
  }
}
