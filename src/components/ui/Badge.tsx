import * as React from 'react';

import { cn } from '../../../lib/utils';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'outline';
}

export function Badge({ className, variant = 'default', ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-md border px-2 py-0.5 text-xs font-medium tracking-tight',
        variant === 'default' && 'bg-secondary text-secondary-foreground border-transparent',
        variant === 'outline' && 'border-border text-foreground',
        className
      )}
      {...props}
    />
  );
}
