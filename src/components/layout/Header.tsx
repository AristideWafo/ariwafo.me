import Link from 'next/link';
import React from 'react';

export function Header() {
  return (
    <header role="banner" className="w-full border-b border-border/60 bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto max-w-4xl px-4 py-4 flex items-center gap-6">
        <Link href="/" className="font-mono text-sm font-semibold tracking-tight" aria-label="Home">
          ariwafo.me
        </Link>
        <nav aria-label="Primary" className="ml-auto">
          <ul className="flex gap-4 text-sm">
            <li><Link className="hover:underline underline-offset-4" href="/about">About</Link></li>
            <li><Link className="hover:underline underline-offset-4" href="/articles">Articles</Link></li>
            <li><Link className="hover:underline underline-offset-4" href="/podcast">Podcast</Link></li>
            <li><Link className="hover:underline underline-offset-4" href="/cases">Case Studies</Link></li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
