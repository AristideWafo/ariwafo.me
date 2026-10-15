import * as React from 'react';
import Link, { LinkProps } from 'next/link';
import { cn } from '@/lib/utils';

interface BaseProps {
  variant?: 'primary' | 'secondary' | 'ghost' | 'outline';
  href?: string; // if provided renders a Link
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  children?: React.ReactNode;
}

type ButtonElementProps = React.ButtonHTMLAttributes<HTMLButtonElement> & BaseProps;

type AnchorElementProps = LinkProps & Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, keyof LinkProps> & BaseProps;

const base =
  'inline-flex items-center justify-center gap-2 border font-mono text-xs uppercase tracking-[0.12em] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-50 disabled:pointer-events-none';

const variants: Record<string, string> = {
  // Blue on paper: the primary call to action, matching the plate accent.
  primary: 'border-primary text-primary hover:bg-primary hover:text-primary-foreground',
  // Inverted ink block, for the single strongest action on a screen.
  secondary: 'border-foreground bg-foreground text-background hover:bg-transparent hover:text-foreground',
  outline: 'border-border text-foreground hover:border-foreground',
  ghost: 'border-transparent text-muted-foreground hover:text-foreground',
};

const sizes: Record<string, string> = {
  sm: 'h-8 px-3',
  md: 'h-11 px-5',
  lg: 'h-14 px-7 text-sm',
};

export const Button = React.forwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonElementProps | AnchorElementProps>(
  function Button(props, ref) {
    const isLink = typeof (props as AnchorElementProps).href === 'string';
    if (isLink) {
      const { className, variant = 'primary', size = 'md', href, children, ...rest } = props as AnchorElementProps;
      const classes = cn(base, variants[variant], sizes[size], className);
      return (
        <Link href={href} className={classes} {...rest} ref={ref as React.Ref<HTMLAnchorElement>}>
          {children}
        </Link>
      );
    }
    const { className, variant = 'primary', size = 'md', children, ...rest } = props as ButtonElementProps;
    const classes = cn(base, variants[variant], sizes[size], className);
    return (
      <button className={classes} ref={ref as React.Ref<HTMLButtonElement>} {...rest}>
        {children}
      </button>
    );
  }
);
