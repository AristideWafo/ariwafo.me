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
      <div className="plate">
        <div className="mb-4 flex items-baseline justify-between gap-4">
          <span className="label">{figure}</span>
          {note && <span className="label-accent">{note}</span>}
        </div>
        {children}
      </div>
      {caption && (
        <figcaption className="text-center font-mono text-[11px] leading-relaxed text-muted-foreground">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
