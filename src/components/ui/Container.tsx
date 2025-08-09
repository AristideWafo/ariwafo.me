import React, { PropsWithChildren } from 'react';
import { cn } from '@/lib/utils';

export function Container({ children, className }: PropsWithChildren<{ className?: string }>) {
  return (
    <div className={cn('mx-auto w-full max-w-4xl px-4', className)}>{children}</div>
  );
}
