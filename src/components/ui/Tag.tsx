import { cn } from '@/lib/utils';
import React from 'react';

export function Tag({ children, className }: React.PropsWithChildren<{ className?: string }>) {
  return (
    <span
      className={cn(
        'inline-flex items-center border border-border px-2 py-1 font-mono text-[10px] uppercase tracking-[0.12em] text-muted-foreground',
        className
      )}
    >
      {children}
    </span>
  );
}
