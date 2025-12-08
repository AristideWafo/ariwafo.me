import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import Script from "next/script";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { PageTransition } from "@/components/ui/PageTransition";
import { cn } from "../src/lib/utils";

export const metadata: Metadata = {
  title: {
    default: "Aristide WAFO – Cloud & DevOps Engineer Portfolio",
    template: "%s | Aristide WAFO Portfolio",
  },
  description:
    "Professional portfolio of Aristide WAFO, Cloud & DevOps Engineer. Discover my projects, AWS and Terraform certifications, and my experience in development, cloud and CI/CD.",
  openGraph: {
    title: "Aristide WAFO – Cloud & DevOps Engineer Portfolio",
    description:
      "Discover my projects, Cloud expertise (AWS, Terraform) and DevOps achievements. Passionate about automation, cloud architecture and innovation.",
    url: "https://aristidewafo.me",
    siteName: "Aristide WAFO – Portfolio",
    locale: "en_US",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
  metadataBase: new URL("https://aristidewafo.vercel.app/"),
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
        {/* Google Analytics */}
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

        <Header />
        <main id="main" role="main" className="relative">
          <PageTransition>{children}</PageTransition>
        </main>
        <Footer />
      </body>
    </html>
  );
}
