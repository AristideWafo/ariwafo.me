import * as React from 'react';
import { cn } from '@/lib/utils';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'outline' | 'accent';
}

export function Badge({ className, variant = 'default', ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center border px-2 py-1 font-mono text-[10px] uppercase tracking-[0.12em]',
        variant === 'default' && 'border-border bg-surface text-muted-foreground',
        variant === 'outline' && 'border-border text-muted-foreground',
        variant === 'accent' && 'border-primary text-primary',
        className
      )}
      {...props}
    />
  );
}
