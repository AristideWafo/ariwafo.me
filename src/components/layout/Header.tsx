"use client"
import Link from 'next/link';
import React, { useState } from 'react';

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header role="banner" className="w-full border-b border-border/60 bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
      <div className="mx-auto max-w-4xl px-4 py-4 flex items-center gap-6">
        <Link href="/" className="font-mono text-sm font-semibold tracking-tight" aria-label="Home">
          ariwafo.me
        </Link>
        
        {/* Hamburger button */}
        <button 
          className="ml-auto md:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

        {/* Desktop navigation */}
        <nav aria-label="Primary" className="hidden md:block ml-auto">
          <ul className="flex gap-4 text-sm">
            <li><Link className="hover:underline underline-offset-4" href="/about">About</Link></li>
            <li><Link className="hover:underline underline-offset-4" href="/experiences">Experiences</Link></li>
            <li><Link className="hover:underline underline-offset-4" href="/articles">Articles</Link></li>
            {/* <li><Link className="hover:underline underline-offset-4" href="/podcast">Podcast</Link></li> */}
            {/* <li><Link className="hover:underline underline-offset-4" href="/cases">Case Studies</Link></li> */}
          </ul>
        </nav>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <nav className="md:hidden border-t border-border/60">
          <ul className="flex flex-col text-sm">
            <li><Link className="block px-4 py-2 hover:bg-gray-100" href="/about">About</Link></li>
            <li><Link className="block px-4 py-2 hover:bg-gray-100" href="/articles">Articles</Link></li>
            {/* <li><Link className="block px-4 py-2 hover:bg-gray-100" href="/podcast">Podcast</Link></li> */}
            {/* <li><Link className="block px-4 py-2 hover:bg-gray-100" href="/cases">Case Studies</Link></li> */}
          </ul>
        </nav>
      )}
    </header>
  );
}
