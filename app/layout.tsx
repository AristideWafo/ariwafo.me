import type { Metadata } from "next";
import { Silkscreen, Source_Serif_4, JetBrains_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { FluidDots } from "@/components/layout/FluidDots";
import { cn } from "../src/lib/utils";
import { siteProfile } from "@/lib/content/site";

// Pixel display face for headings. Swap this one import to change the whole
// display voice of the site — nothing else references the family by name.
const display = Silkscreen({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-display",
  display: "swap",
});

const serif = Source_Serif_4({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteProfile.url),
  title: {
    default: `${siteProfile.name} — Cloud & DevOps Engineer`,
    template: `%s · ${siteProfile.name}`,
  },
  description: siteProfile.description,
  openGraph: {
    title: `${siteProfile.name} — Cloud & DevOps Engineer`,
    description: siteProfile.description,
    url: siteProfile.url,
    siteName: `${siteProfile.name} — Portfolio`,
    locale: "en_US",
    type: "website",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={cn(
          display.variable,
          serif.variable,
          mono.variable,
          "min-h-dvh bg-background font-serif text-foreground antialiased"
        )}
      >
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:border focus:border-primary focus:bg-background focus:px-3 focus:py-2 focus:font-mono focus:text-xs focus:uppercase"
        >
          Skip to content
        </a>

        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-4SD9W3LE8L"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-4SD9W3LE8L');
          `}
        </Script>

        <FluidDots />

        <Header />
        <main id="main" role="main" className="animate-enter relative">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
