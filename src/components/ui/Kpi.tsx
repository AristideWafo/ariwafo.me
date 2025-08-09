import React from 'react';
import { cn } from '@/lib/utils';

interface KpiProps {
  value: string | number;
  label: string;
  note?: string;
  className?: string;
}

export function Kpi({ value, label, note, className }: KpiProps) {
  return (
    <div className={cn('flex flex-col gap-1', className)}>
      <span className="text-2xl font-semibold tracking-tight">{value}</span>
      <span className="text-sm text-muted-foreground">{label}</span>
      {note && <span className="text-xs text-muted-foreground/70">{note}</span>}
    </div>
  );
}
