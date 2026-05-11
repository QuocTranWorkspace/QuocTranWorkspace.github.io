import type { NextConfig } from "next";

const config: NextConfig = {
  reactStrictMode: true,
  experimental: {
    // Note: framer-motion uses a runtime Proxy for `motion.div` etc;
    // optimizePackageImports breaks that proxy. Keep it off for framer-motion.
    optimizePackageImports: ["lucide-react", "gsap"],
  },
  poweredByHeader: false,
};

export default config;
