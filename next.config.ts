import type { NextConfig } from "next";

const config: NextConfig = {
  reactStrictMode: true,
  experimental: {
    // Note: framer-motion uses a runtime Proxy for `motion.div` etc and gsap
    // uses plugin-registration side effects; optimizePackageImports breaks
    // both. Only lucide-react (pure tree-shake) is safe to optimize here.
    optimizePackageImports: ["lucide-react"],
  },
  poweredByHeader: false,
};

export default config;
