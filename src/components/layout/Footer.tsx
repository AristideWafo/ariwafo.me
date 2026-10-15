import Link from "next/link";
import React from "react";
import { siteProfile } from "@/lib/content/site";

const footerNav = [
  { href: "/about", label: "About" },
  { href: "/experiences", label: "Experience" },
  { href: "/projects", label: "Projects" },
  { href: "/articles", label: "Writing" },
  { href: "/contact", label: "Contact" },
];

export function Footer() {
  return (
    <footer role="contentinfo" className="border-t border-border">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <p className="label">
            © {new Date().getFullYear()} · {siteProfile.name} · {siteProfile.location}
          </p>

          <nav aria-label="Footer">
            <ul className="flex flex-wrap gap-x-6 gap-y-3">
              {footerNav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground transition-colors hover:text-primary"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
              {siteProfile.socials.map((social) => (
                <li key={social.label}>
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground transition-colors hover:text-primary"
                  >
                    {social.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </footer>
  );
}
