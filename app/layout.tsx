import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { cn } from "../src/lib/utils";

export const metadata: Metadata = {
  title: {
    default: "Portfolio – Cloud & DevOps Engineer",
    template: "%s | Portfolio",
  },
  description: "Minimal portfolio (placeholder content).",
  openGraph: {
    title: "Portfolio – Cloud & DevOps Engineer",
    description: "Minimal portfolio (placeholder content).",
    url: "https://example.com",
    siteName: "Portfolio",
    locale: "en_US",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
  metadataBase: new URL("https://example.com"),
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
          GeistSans.variable,
          GeistMono.variable,
          "bg-background text-foreground font-sans min-h-dvh antialiased"
        )}
      >
        <a
          href="#main"
          className="absolute left-2 top-2 -translate-y-full focus:translate-y-0 bg-foreground text-background px-3 py-1 text-sm rounded"
        >
          Skip to content
        </a>
        <Header />
        <main id="main" role="main" className="relative">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
