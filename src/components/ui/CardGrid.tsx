import React, { PropsWithChildren } from "react";
import { cn } from "@/lib/utils";

interface CardGridProps {
  cols?: 2 | 3;
  className?: string;
}

/**
 * Hairline card grid.
 *
 * The rules come from the container's left/top border plus each card's own
 * bottom/right border — not from `gap-px` over a coloured container. A gap-px
 * grid paints its background wherever no card covers it, so any count that is
 * not a multiple of the column count leaves a solid block in the last row.
 * Cards passed in here must carry `border-b border-r border-border`.
 */
export function CardGrid({
  cols = 3,
  className,
  children,
}: PropsWithChildren<CardGridProps>) {
  return (
    <div
      className={cn(
        "grid border-l border-t border-border",
        cols === 2 ? "sm:grid-cols-2" : "sm:grid-cols-2 lg:grid-cols-3",
        className
      )}
    >
      {children}
    </div>
  );
}
