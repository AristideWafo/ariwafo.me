"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState } from "react";
import { siteProfile } from "@/lib/content/site";
import { cn } from "@/lib/utils";

const nav = [
  { href: "/about", label: "About" },
  { href: "/experiences", label: "Experience" },
  { href: "/projects", label: "Projects" },
  { href: "/articles", label: "Writing" },
  { href: "/contact", label: "Contact" },
];

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header
      role="banner"
      className="sticky top-0 z-50 w-full border-b border-border bg-background/90 backdrop-blur supports-[backdrop-filter]:bg-background/70"
    >
      <div className="mx-auto flex max-w-6xl items-center gap-6 px-4 py-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="flex items-center gap-2.5 font-mono text-sm uppercase tracking-[0.14em] text-primary"
          aria-label={`${siteProfile.name} — home`}
        >
          <span aria-hidden className="h-2.5 w-2.5 bg-primary" />
          Aristide <span className="text-muted-foreground">/</span> Wafo
        </Link>

        <nav aria-label="Primary" className="ml-auto hidden md:block">
          <ul className="flex items-center gap-6">
            {nav.map((item) => {
              const active = pathname === item.href;
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "font-mono text-xs uppercase tracking-[0.14em] transition-colors hover:text-primary",
                      active ? "text-primary" : "text-foreground"
                    )}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <a
          href={`https://github.com/${siteProfile.githubUser}`}
          target="_blank"
          rel="noopener noreferrer"
          className="ml-auto hidden border border-border px-3 py-2 font-mono text-[11px] uppercase tracking-[0.12em] transition-colors hover:border-foreground md:ml-0 md:inline-flex"
        >
          GitHub ↗
        </a>

        <button
          type="button"
          className="ml-auto border border-border p-2 md:hidden"
          onClick={() => setIsMenuOpen((open) => !open)}
          aria-expanded={isMenuOpen}
          aria-controls="mobile-nav"
          aria-label="Toggle menu"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden
          >
            <path
              strokeLinecap="square"
              strokeWidth={1.75}
              d={isMenuOpen ? "M6 6l12 12M18 6L6 18" : "M4 7h16M4 12h16M4 17h16"}
            />
          </svg>
        </button>
      </div>

      {isMenuOpen && (
        <nav
          id="mobile-nav"
          aria-label="Primary mobile"
          className="border-t border-border bg-background md:hidden"
        >
          <ul className="flex flex-col">
            {nav.map((item) => (
              <li key={item.href} className="border-b border-border last:border-b-0">
                <Link
                  href={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="block px-4 py-3 font-mono text-xs uppercase tracking-[0.14em] hover:bg-surface"
                >
                  {item.label}
                </Link>
              </li>
            ))}
            <li className="border-t border-border">
              <a
                href={`https://github.com/${siteProfile.githubUser}`}
                target="_blank"
                rel="noopener noreferrer"
                className="block px-4 py-3 font-mono text-xs uppercase tracking-[0.14em] text-primary"
              >
                GitHub ↗
              </a>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}
