// Build-time Open Graph card generator.
//
// GitHub Pages is static-only, so we can't keep the dynamic edge route.
// Instead we render the same design to public/og.png once (committed) and
// re-run it on `prebuild` so the card stays in sync if the design changes.
//
// Uses next/og's ImageResponse, which runs fine outside a Next route. JSX
// is avoided (plain React.createElement) so this is a zero-build .mjs.

// Standalone Node can't resolve the bare "next/og" subpath (no exports
// map entry); the actual file is next/og.js.
import { ImageResponse } from "next/og.js";
import { createElement as h } from "react";
import { writeFileSync, mkdirSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT = join(__dirname, "..", "public", "og.png");

const BG = "#0B0D12";
const BG_ELEV = "#12151D";
const INK = "#ECEEF2";
const INK_MUTE = "#8A93A2";
const ACCENT = "#6CE5C7";
const RULE = "#1F2330";

const mono = "ui-monospace, SFMono-Regular, Menlo, monospace";

const tag = (text, highlight) =>
  h(
    "span",
    {
      style: {
        padding: "10px 18px",
        borderRadius: 999,
        border: `1px solid ${highlight ? `${ACCENT}55` : RULE}`,
        color: highlight ? ACCENT : INK_MUTE,
      },
    },
    text,
  );

const card = h(
  "div",
  {
    style: {
      width: "100%",
      height: "100%",
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      padding: "72px 80px",
      backgroundColor: BG,
      backgroundImage: `radial-gradient(circle at 85% 15%, ${BG_ELEV} 0%, ${BG} 60%)`,
      color: INK,
      fontFamily: "Georgia, serif",
    },
  },
  // top row
  h(
    "div",
    {
      style: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        color: INK_MUTE,
        fontFamily: mono,
        fontSize: 18,
        letterSpacing: "0.3em",
        textTransform: "uppercase",
      },
    },
    h("span", null, "byQuoc · portfolio"),
    h(
      "span",
      { style: { display: "flex", alignItems: "center", gap: 14 } },
      h("span", {
        style: {
          width: 10,
          height: 10,
          borderRadius: 999,
          backgroundColor: ACCENT,
        },
      }),
      "open to lead roles",
    ),
  ),
  // title block
  h(
    "div",
    { style: { display: "flex", flexDirection: "column", gap: 28 } },
    h(
      "div",
      {
        style: {
          fontSize: 110,
          lineHeight: 1.02,
          letterSpacing: "-0.01em",
          color: INK,
          display: "flex",
          flexDirection: "column",
        },
      },
      h("span", null, "Quoc Tran Trung"),
      h(
        "span",
        { style: { fontStyle: "italic", color: ACCENT } },
        "Full-Stack · Tech Lead",
      ),
    ),
    h(
      "div",
      {
        style: {
          fontSize: 28,
          color: INK_MUTE,
          maxWidth: 880,
          lineHeight: 1.35,
        },
      },
      "Edge AI on NVIDIA Jetson · Go microservices on Kubernetes · creator of mnemo, a local-first knowledge memory for Claude Code.",
    ),
  ),
  // bottom tags
  h(
    "div",
    {
      style: {
        display: "flex",
        gap: 16,
        fontFamily: mono,
        fontSize: 18,
        letterSpacing: "0.18em",
        textTransform: "uppercase",
        color: INK_MUTE,
      },
    },
    tag("10+ YOLO models", false),
    tag("50+ REST endpoints", false),
    tag("mnemo v1.1 shipped", true),
    tag("Hanoi · GMT+7", false),
  ),
);

const img = new ImageResponse(card, { width: 1200, height: 630 });
const buf = Buffer.from(await img.arrayBuffer());
mkdirSync(join(__dirname, "..", "public"), { recursive: true });
writeFileSync(OUT, buf);
console.log(`og.png written (${buf.length} bytes) -> ${OUT}`);
