import { cn } from '@/lib/utils';
import React, { PropsWithChildren } from 'react';

export function Prose({ children, className }: PropsWithChildren<{ className?: string }>) {
  return (
    <div className={cn('prose prose-neutral max-w-none prose-headings:font-semibold prose-p:leading-relaxed dark:prose-invert', className)}>
      {children}
    </div>
  );
}
