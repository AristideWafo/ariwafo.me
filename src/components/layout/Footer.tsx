import Link from "next/link";
import React from "react";

export function Footer() {
  return (
    <footer
      role="contentinfo"
      className="mt-24 border-t border-border/60 py-10 text-sm"
    >
      <div className="mx-auto max-w-4xl px-4 flex flex-col gap-6">
        <div className="flex flex-wrap gap-4" aria-label="Footer navigation">
          <Link className="hover:underline underline-offset-4" href="/about">
            About
          </Link>
          <Link className="hover:underline underline-offset-4" href="/contact">
            Contact
          </Link>
          <Link className="hover:underline underline-offset-4" href="/articles">
            Articles
          </Link>
          <Link className="hover:underline underline-offset-4" href="/podcast">
            Podcast
          </Link>
          <Link className="hover:underline underline-offset-4" href="/cases">
            Case Studies
          </Link>
        </div>
        {/* <p className="text-muted-foreground">
          Footer content coming soon – final version in progress.
        </p> */}
        <p className="text-muted-foreground">
          © {new Date().getFullYear()} Aristide WAFO
        </p>
      </div>
    </footer>
  );
}
