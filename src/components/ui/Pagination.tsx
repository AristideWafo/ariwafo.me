import React from 'react';
import Link from 'next/link';
import { cn } from '../../../lib/utils';

interface PaginationProps {
  page: number;
  pageCount: number;
  basePath: string;
}

export function Pagination({ page, pageCount, basePath }: PaginationProps) {
  if (pageCount <= 1) return null;
  const prev = page > 1 ? page - 1 : null;
  const next = page < pageCount ? page + 1 : null;
  return (
    <nav aria-label="Pagination" className="flex items-center justify-between gap-4 pt-8">
      <div>
        {prev && (
          <Link className={cn('text-sm underline underline-offset-4 hover:text-primary')} href={`${basePath}${prev === 1 ? '' : `?page=${prev}`}`}>Previous</Link>
        )}
      </div>
      <p className="text-xs text-muted-foreground">Page {page} / {pageCount}</p>
      <div>
        {next && (
          <Link className={cn('text-sm underline underline-offset-4 hover:text-primary')} href={`${basePath}?page=${next}`}>Next</Link>
        )}
      </div>
    </nav>
  );
}
