import React from "react";
import { Experience } from "@/lib/content/experience";
import { Plate } from "@/components/ui/Plate";
import { cn } from "@/lib/utils";
import { experienceSlug } from "./slug";

const isOngoing = (value?: string) => !value || value.toLowerCase() === "present";

/** Months since year 0, so durations are simple subtraction. */
const toMonths = (ym: string) => {
  const [year, month] = ym.split("-").map(Number);
  return year * 12 + (month - 1);
};

const nowMonths = () => {
  const now = new Date();
  return now.getFullYear() * 12 + now.getMonth();
};

const barTone: Record<string, string> = {
  Permanent: "bg-primary",
  Apprenticeship: "bg-primary/55",
  Freelance: "bg-foreground/75",
};

/**
 * Career bars on a shared time axis. The list below is the full record; this
 * figure exists to show what a list cannot — how long each role ran and which
 * ones overlapped.
 *
 * Bars are plain anchors into that list, so selection needs no JavaScript and
 * the highlight is handled by the :target CSS state.
 */
export function CareerTimeline({ items }: { items: Experience[] }) {
  if (items.length === 0) return null;

  const end = nowMonths();
  const start = Math.min(...items.map((item) => toMonths(item.start)));
  const span = Math.max(end - start, 1);

  const position = (item: Experience) => {
    const from = toMonths(item.start);
    const to = isOngoing(item.end) ? end : toMonths(item.end!);
    return {
      left: ((from - start) / span) * 100,
      // Floor the width so a one-month engagement is still visible.
      width: Math.max(((to - from) / span) * 100, 2.5),
      ongoing: isOngoing(item.end),
    };
  };

  const firstYear = Math.ceil(start / 12);
  const lastYear = Math.floor(end / 12);
  const years = Array.from(
    { length: lastYear - firstYear + 1 },
    (_, i) => firstYear + i
  );

  return (
    <Plate
      figure="FIG_022 · Career timeline"
      note={`${Math.floor(start / 12)} — ${Math.floor(end / 12)}`}
      caption="Freelance engagements run alongside salaried roles. Select a bar to jump to that role."
    >
      <div className="grid grid-cols-[5.5rem_1fr] gap-x-3 sm:grid-cols-[9rem_1fr] sm:gap-x-4">
        {/* year axis */}
        <div aria-hidden />
        <div className="relative mb-3 h-5 border-b border-border">
          {years.map((year) => (
            <span
              key={year}
              className="absolute top-0 -translate-x-1/2 font-mono text-[10px] text-muted-foreground"
              style={{ left: `${((year * 12 - start) / span) * 100}%` }}
            >
              {year}
            </span>
          ))}
        </div>

        {items.map((item) => {
          const { left, width, ongoing } = position(item);
          return (
            <React.Fragment key={item.company}>
              <span className="truncate py-1.5 font-mono text-[10px] uppercase tracking-[0.08em] sm:text-[11px]">
                {item.company}
              </span>

              <div className="relative py-1.5">
                {/* track */}
                <div aria-hidden className="h-3.5 w-full bg-border/40" />
                <a
                  href={`#${experienceSlug(item.company)}`}
                  className="group absolute inset-y-1.5 block"
                  style={{ left: `${left}%`, width: `${width}%` }}
                  aria-label={`${item.role} at ${item.company} — jump to details`}
                >
                  <span
                    className={cn(
                      "block h-3.5 w-full transition-opacity group-hover:opacity-70",
                      barTone[item.type ?? "Permanent"] ?? "bg-primary"
                    )}
                  />
                  {ongoing && (
                    <span
                      aria-hidden
                      className="absolute -right-2.5 top-1/2 -translate-y-1/2 font-mono text-[10px] text-primary"
                    >
                      ▶
                    </span>
                  )}
                </a>
              </div>
            </React.Fragment>
          );
        })}
      </div>

      <ul className="mt-6 flex flex-wrap gap-x-5 gap-y-2 border-t border-border pt-4">
        {[
          { tone: "bg-primary", label: "Permanent" },
          { tone: "bg-primary/55", label: "Apprenticeship" },
          { tone: "bg-foreground/75", label: "Freelance" },
        ].map((entry) => (
          <li
            key={entry.label}
            className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.1em] text-muted-foreground"
          >
            <span aria-hidden className={cn("h-2.5 w-2.5", entry.tone)} />
            {entry.label}
          </li>
        ))}
      </ul>
    </Plate>
  );
}
