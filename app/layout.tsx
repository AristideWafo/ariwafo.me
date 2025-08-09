import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { cn } from "../src/lib/utils";

export const metadata: Metadata = {
title: {
  default: "Aristide WAFO – Cloud & DevOps Engineer Portfolio",
  template: "%s | Aristide WAFO Portfolio",
},
description: "Portfolio professionnel d'Aristide WAFO, Cloud & DevOps Engineer. Découvrez mes projets, certifications AWS et Terraform, et mes expériences en développement, cloud et CI/CD.",
openGraph: {
  title: "Aristide WAFO – Cloud & DevOps Engineer Portfolio",
  description: "Découvrez mes projets, mon expertise Cloud (AWS, Terraform) et mes réalisations DevOps. Passionné par l'automatisation, l'architecture cloud et l'innovation.",
  url: "https://aristidewafo.me",
  siteName: "Aristide WAFO – Portfolio",
  locale: "fr_FR",
  type: "website",
},
robots: {
  index: true,
  follow: true,
},
metadataBase: new URL("https://aristidewafo.me"),}


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

        <Header />
        <main id="main" role="main" className="relative">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
