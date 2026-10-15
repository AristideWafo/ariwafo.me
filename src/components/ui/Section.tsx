import React, { PropsWithChildren } from "react";
import { Container } from "./Container";
import { cn } from "@/lib/utils";

interface SectionProps {
  /** Monospace eyebrow, e.g. "FIG_002 · EXPERIENCE". */
  label?: string;
  /** Display heading. Rendered as h2 unless `as` says otherwise. */
  title?: string;
  as?: "h1" | "h2";
  /** Serif lede under the title. */
  intro?: React.ReactNode;
  /** Draws the hairline that separates stacked sections. */
  divider?: boolean;
  className?: string;
  containerClassName?: string;
}

export function Section({
  label,
  title,
  as = "h2",
  intro,
  divider = true,
  className,
  containerClassName,
  children,
}: PropsWithChildren<SectionProps>) {
  const Heading = as;
  const hasHeader = Boolean(label || title || intro);

  return (
    <section
      className={cn(
        "py-14 md:py-20",
        divider && "border-t border-border",
        className
      )}
    >
      <Container className={containerClassName}>
        {hasHeader && (
          <div className="mb-10 max-w-3xl space-y-4">
            {label && <p className="label-accent">{label}</p>}
            {title && (
              <Heading
                className={cn(
                  "display",
                  as === "h1"
                    ? "text-4xl sm:text-5xl md:text-6xl"
                    : "text-2xl sm:text-3xl"
                )}
              >
                {title}
              </Heading>
            )}
            {intro && (
              <p className="max-w-prose text-base leading-relaxed text-muted-foreground sm:text-lg">
                {intro}
              </p>
            )}
          </div>
        )}
        {children}
      </Container>
    </section>
  );
}
