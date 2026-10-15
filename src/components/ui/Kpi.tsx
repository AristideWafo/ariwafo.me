import React from 'react';
import { cn } from '@/lib/utils';

interface KpiProps {
  value: string | number;
  label: string;
  note?: string;
  /** 0–1. When set, draws the measured bar next to the label. */
  fill?: number;
  className?: string;
}

/**
 * A measured row: label, bar, value — the way a spec sheet reports a number.
 * Without `fill` it degrades to a plain stacked figure.
 */
export function Kpi({ value, label, note, fill, className }: KpiProps) {
  if (fill === undefined) {
    return (
      <div className={cn('space-y-1', className)}>
        <span className="block font-display text-3xl text-primary">{value}</span>
        <span className="block font-mono text-[11px] uppercase tracking-[0.14em]">{label}</span>
        {note && <span className="block text-sm leading-relaxed text-muted-foreground">{note}</span>}
      </div>
    );
  }

  const pct = Math.round(Math.min(Math.max(fill, 0), 1) * 100);

  return (
    <div className={cn('space-y-2', className)}>
      <div className="flex items-center gap-4">
        <span className="min-w-0 flex-1 font-mono text-[11px] uppercase tracking-[0.14em]">
          {label}
        </span>
        <span aria-hidden className="hidden h-2 w-32 bg-border sm:block">
          <span className="block h-full bg-primary" style={{ width: `${pct}%` }} />
        </span>
        <span className="font-mono text-sm tabular-nums text-foreground">{value}</span>
      </div>
      {note && <p className="text-sm leading-relaxed text-muted-foreground">{note}</p>}
    </div>
  );
}
