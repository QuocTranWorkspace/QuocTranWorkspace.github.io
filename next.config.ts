import type { NextConfig } from "next";

const config: NextConfig = {
  reactStrictMode: true,
  experimental: {
    optimizePackageImports: ["framer-motion", "lucide-react", "gsap"],
  },
  poweredByHeader: false,
};

export default config;
