import type { NextConfig } from "next";

const config: NextConfig = {
  // Static HTML export — GitHub Pages is static-only hosting. All routes
  // (incl. /work/[slug] via generateStaticParams) are pre-rendered at build.
  output: "export",
  reactStrictMode: true,
  // GitHub Pages can't run the Next image optimizer; serve images as-is.
  images: { unoptimized: true },
  // Served from the user-page repo at the domain root, so no basePath.
  // Trailing slash keeps deep links like /work/aibox/ resolving as
  // directories on Pages' static file server.
  trailingSlash: true,
  experimental: {
    // Note: framer-motion uses a runtime Proxy for `motion.div` etc and gsap
    // uses plugin-registration side effects; optimizePackageImports breaks
    // both. Only lucide-react (pure tree-shake) is safe to optimize here.
    optimizePackageImports: ["lucide-react"],
  },
  poweredByHeader: false,
};

export default config;
