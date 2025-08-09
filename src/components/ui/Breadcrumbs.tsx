import React from 'react';
import Link from 'next/link';

interface Crumb {
  label: string;
  href?: string;
}

export function Breadcrumbs({ items }: { items: Crumb[] }) {
  if (!items.length) return null;
  return (
    <nav aria-label="Breadcrumb" className="text-sm mb-6">
      <ol className="flex flex-wrap items-center gap-1 text-muted-foreground">
        {items.map((c, i) => {
          const isLast = i === items.length - 1;
          return (
            <li key={i} className="flex items-center gap-1">
              {c.href && !isLast ? (
                <Link className="hover:underline underline-offset-4" href={c.href}>{c.label}</Link>
              ) : (
                <span aria-current={isLast ? 'page' : undefined} className={isLast ? 'text-foreground font-medium' : ''}>{c.label}</span>
              )}
              {!isLast && <span className="text-muted-foreground/60">/</span>}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
