import React, { PropsWithChildren } from "react";
import { cn } from "@/lib/utils";

interface PlateProps {
  /** Left eyebrow, e.g. "FIG_003 · THE DELIVERY CURVE". */
  figure: string;
  /** Right-aligned eyebrow, e.g. "deploys vs week". */
  note?: string;
  /** Printed caption below the frame. */
  caption?: React.ReactNode;
  className?: string;
}

/** A bracketed figure frame with a printed caption, like a plate in a manual. */
export function Plate({
  figure,
  note,
  caption,
  className,
  children,
}: PropsWithChildren<PlateProps>) {
  return (
    <figure className={cn("space-y-3", className)}>
      {/* The caption line rides above the frame, the way a plate is titled. */}
      <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
        <span className="label">{figure}</span>
        {note && <span className="label-accent">{note}</span>}
      </div>
      <div className="plate">{children}</div>
      {caption && (
        <figcaption className="text-center font-mono text-[11px] leading-relaxed text-muted-foreground">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
