import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "./globals.css";
import { cn } from "@/lib/utils";


export const metadata: Metadata = {
  title: "Aristide WAFO | Software Engineer",
  description: "Welcome to my portfolio. I'm a passionate software engineer and System design specializing in modern web development technologies such as SpringbBoot, Next.js, and AWS.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        // className={`${GeistSans.variable} ${GeistMono.variable}`}
        className={cn( GeistSans.variable, GeistMono.variable, "bg-background text-foreground font-sans h-full")}
      >
        {children}
      </body>
    </html>
  );
}
