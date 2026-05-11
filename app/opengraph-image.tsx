import { ImageResponse } from "next/og";

export const runtime = "edge";

export const alt =
  "Quoc Tran Trung — Full-Stack Engineer · Technical Lead. Edge AI on Jetson, Go on Kubernetes, local-first developer tooling.";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

// Token mirrors styles/globals.css @theme.
const BG = "#0B0D12";
const BG_ELEV = "#12151D";
const INK = "#ECEEF2";
const INK_MUTE = "#8A93A2";
const ACCENT = "#6CE5C7";
const RULE = "#1F2330";

export default async function Image() {
  // Next.js ImageResponse runs on the Edge and renders a constrained subset
  // of JSX as a PNG. No Tailwind — every property is inline. Serif/mono are
  // approximated with the system Georgia stack; the actual site uses
  // Instrument Serif + JetBrains Mono via next/font.
  return new ImageResponse(
    (
      <div
        style={{
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
        }}
      >
        {/* Top row — wordmark + status */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            color: INK_MUTE,
            fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
            fontSize: 18,
            letterSpacing: "0.3em",
            textTransform: "uppercase",
          }}
        >
          <span>byQuoc · portfolio</span>
          <span style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <span
              style={{
                width: 10,
                height: 10,
                borderRadius: 999,
                backgroundColor: ACCENT,
              }}
            />
            open to lead roles
          </span>
        </div>

        {/* Main title block */}
        <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
          <div
            style={{
              fontSize: 110,
              lineHeight: 1.02,
              letterSpacing: "-0.01em",
              color: INK,
              display: "flex",
              flexDirection: "column",
            }}
          >
            <span>Quoc Tran Trung</span>
            <span style={{ fontStyle: "italic", color: ACCENT }}>
              Full-Stack · Tech Lead
            </span>
          </div>
          <div
            style={{
              fontSize: 28,
              color: INK_MUTE,
              maxWidth: 880,
              lineHeight: 1.35,
            }}
          >
            Edge AI on NVIDIA Jetson · Go microservices on Kubernetes · creator
            of mnemo, a local-first knowledge memory for Claude Code.
          </div>
        </div>

        {/* Bottom row — stat tags */}
        <div
          style={{
            display: "flex",
            gap: 16,
            fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
            fontSize: 18,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: INK_MUTE,
          }}
        >
          {[
            "10+ YOLO models",
            "50+ REST endpoints",
            "mnemo v1.1 shipped",
            "Hanoi · GMT+7",
          ].map((s, i) => (
            <span
              key={s}
              style={{
                padding: "10px 18px",
                borderRadius: 999,
                border: `1px solid ${RULE}`,
                color: i === 2 ? ACCENT : INK_MUTE,
                borderColor: i === 2 ? `${ACCENT}55` : RULE,
              }}
            >
              {s}
            </span>
          ))}
        </div>
      </div>
    ),
    { ...size },
  );
}
