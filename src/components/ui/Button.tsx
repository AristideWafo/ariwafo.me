import * as React from 'react';
import Link, { LinkProps } from 'next/link';
import { cn } from '../../../lib/utils';

interface BaseProps {
  variant?: 'primary' | 'secondary' | 'ghost' | 'outline';
  href?: string; // if provided renders a Link
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  children?: React.ReactNode;
}

type ButtonElementProps = React.ButtonHTMLAttributes<HTMLButtonElement> & BaseProps;

type AnchorElementProps = LinkProps & Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, keyof LinkProps> & BaseProps;

const base = 'inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-50 disabled:pointer-events-none';
const variants: Record<string, string> = {
  primary: 'bg-foreground text-background hover:bg-foreground/90',
  secondary: 'bg-muted text-foreground hover:bg-muted/80',
  ghost: 'bg-transparent hover:bg-muted/60',
  outline: 'border border-border hover:bg-muted/60'
};
const sizes: Record<string, string> = {
  sm: 'h-8 px-3 text-xs',
  md: 'h-9 px-4 text-sm',
  lg: 'h-11 px-6 text-base'
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
