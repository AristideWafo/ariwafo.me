import React from 'react';
import { cn } from '../../../lib/utils';

export function Tag({ children, className }: React.PropsWithChildren<{ className?: string }>) {
  return (
    <span className={cn('inline-flex items-center rounded border border-border/60 bg-accent/40 px-2 py-0.5 text-[11px] uppercase tracking-wide text-muted-foreground', className)}>
      {children}
    </span>
  );
}
