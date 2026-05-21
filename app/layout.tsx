import type { Metadata, Viewport } from "next";
import { fontVariables } from "@/lib/fonts";
import { cn } from "@/lib/utils";
import { SmoothScrollProvider } from "@/components/providers/SmoothScrollProvider";
import { RouteLoader } from "@/components/providers/RouteLoader";
import { SideDots } from "@/components/nav/SideDots";
import { ToastProvider } from "@/components/ui/Toast";
import "@/styles/globals.css";

const siteUrl = "https://quoctranworkspace.github.io";
const description =
  "Full-stack engineer and technical lead. NVIDIA Jetson edge AI, Go on Kubernetes, local-first developer tooling. Creator of mnemo.";
const ogImage = {
  url: "/og.png",
  width: 1200,
  height: 630,
  alt: "Quoc Tran Trung — Full-Stack Engineer · Technical Lead",
};

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
    images: [ogImage],
  },
  twitter: {
    card: "summary_large_image",
    title: "Quoc Tran Trung",
    description,
    images: [ogImage],
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
      <head>
        {/*
          Pre-paint hide: when the user comes back from a /work deep dive
          (sessionStorage has a saved scroll target), hide <html> SYNCHRONOUSLY
          before the browser ever paints. The full ScrollRestoration logic
          then runs in React, snaps to the right chapter after ScrollTrigger
          settles, and reveals. Without this script the user briefly sees the
          page at scrollY=0 (cold-open) before useEffect-scoped hiding kicks
          in, which produces the "flick to chapter 2" effect.

          A 1.2 s safety timeout reveals the page no matter what — even if
          React fails to hydrate, the user never gets stuck on a blank page.
        */}
        <script
          dangerouslySetInnerHTML={{
            __html:
              "try{if(sessionStorage.getItem('byquoc:home-scroll')&&location.pathname==='/'){document.documentElement.style.visibility='hidden';setTimeout(function(){document.documentElement.style.visibility=''},1200);}}catch(e){}",
          }}
        />
      </head>
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
            {/* RouteLoader is the LAST child of the layout tree so it paints
                above everything else. It persists across route changes — the
                layout doesn't unmount on navigation, only the page subtree
                does — so a loader started by a Link's onClick survives the
                tree swap and stays visible until the destination signals
                ready via hideRouteLoader(). */}
            <RouteLoader />
          </ToastProvider>
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
