import type { Metadata, Viewport } from "next";
import { fontVariables } from "@/lib/fonts";
import { cn } from "@/lib/utils";
import { SmoothScrollProvider } from "@/components/providers/SmoothScrollProvider";
import { SideDots } from "@/components/nav/SideDots";
import { ToastProvider } from "@/components/ui/Toast";
import "@/styles/globals.css";

const siteUrl = "https://quoctran.dev";
const description =
  "Full-stack engineer and technical lead. NVIDIA Jetson edge AI, Go on Kubernetes, local-first developer tooling. Creator of mnemo.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Quoc Tran Trung — Full-Stack Engineer · Technical Lead",
    template: "%s · Quoc Tran Trung",
  },
  description,
  applicationName: "byQuoc",
  authors: [{ name: "Quoc Tran Trung", url: siteUrl }],
  creator: "Quoc Tran Trung",
  openGraph: {
    type: "website",
    url: siteUrl,
    siteName: "byQuoc",
    title: "Quoc Tran Trung — Full-Stack Engineer · Technical Lead",
    description,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Quoc Tran Trung",
    description,
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: [{ url: "/favicon.svg", type: "image/svg+xml" }],
  },
};

export const viewport: Viewport = {
  themeColor: "#0B0D12",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={cn(fontVariables, "antialiased")}>
      <body className="bg-bg text-ink">
        {/* Skip-to-content for keyboard users; appears only when focused. */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:border focus:border-accent/60 focus:bg-bg-elev focus:px-4 focus:py-2 focus:font-mono focus:text-xs focus:uppercase focus:tracking-widest focus:text-accent"
        >
          Skip to content
        </a>
        <SmoothScrollProvider>
          <ToastProvider>
            {children}
            <SideDots />
          </ToastProvider>
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
