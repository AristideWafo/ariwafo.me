import Link from "next/link";
import { cn } from "@/lib/utils";
import type { NativeArticle } from "@/lib/content/articles/native";

const pad = (n?: number) => String(n ?? 0).padStart(2, "0");
const day = (d: string) => new Date(d).toLocaleDateString("en-GB", { day: "numeric", month: "short" });

type Part = NativeArticle & { upcoming: boolean };

/** Every part of the series, in order, with the one being read highlighted. */
export function SeriesMap({ parts, current }: { parts: Part[]; current: string }) {
  return (
    <nav aria-label={`Series: ${parts[0].series}`} className="not-prose my-10 border border-border bg-surface/50 p-5">
      <p className="label-accent">Series · {parts[0].series}</p>
      <ol className="mt-4 grid gap-3 md:grid-cols-3">
        {parts.map((p, i) => {
          const here = p.id === current;
          const body = (
            <>
              <p className={cn("label", here && "text-primary")}>
                Part {pad(p.part)}{here ? " · You are here" : p.upcoming && ` · Coming ${day(p.date)}`}
              </p>
              <p className="mt-2 font-semibold leading-snug">{p.title}</p>
              {p.seriesRole && <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{p.seriesRole}</p>}
            </>
          );
          return (
            <li key={p.id} className="relative">
              {p.upcoming ? (
                <div className="h-full border border-dashed border-border p-4 opacity-70">{body}</div>
              ) : (
                <Link
                  href={`/articles/${p.id}`}
                  aria-current={here ? "page" : undefined}
                  className={cn(
                    "block h-full border p-4 transition-colors",
                    here ? "border-primary bg-accent" : "border-border bg-card hover:border-primary/60"
                  )}
                >
                  {body}
                </Link>
              )}
              {i < parts.length - 1 && (
                <span aria-hidden className="absolute -right-3 top-1/2 z-10 hidden -translate-y-1/2 font-mono text-primary md:block">
                  →
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

/** Previous / next part links for the end of an article. */
export function SeriesPager({ parts, current }: { parts: Part[]; current: string }) {
  const i = parts.findIndex((p) => p.id === current);
  const links = [
    { p: parts[i - 1], dir: "← Previous" },
    { p: parts[i + 1], dir: "Next →" },
  ];
  return (
    <nav aria-label="Series navigation" className="not-prose mt-14 grid gap-3 border-t border-border pt-8 sm:grid-cols-2">
      {links.map(({ p, dir }, k) =>
        p?.upcoming ? (
          <div key={dir} className={cn("border border-dashed border-border p-4 opacity-70", k === 1 && "sm:col-start-2 sm:text-right")}>
            <p className="label">{dir} · Part {pad(p.part)} · Coming {day(p.date)}</p>
            <p className="mt-2 font-semibold leading-snug">{p.title}</p>
          </div>
        ) : p ? (
          <Link
            key={dir}
            href={`/articles/${p.id}`}
            className={cn("block border border-border p-4 hover:border-primary/60", k === 1 && "sm:col-start-2 sm:text-right")}
          >
            <p className="label">{dir} · Part {pad(p.part)}</p>
            <p className="mt-2 font-semibold leading-snug">{p.title}</p>
          </Link>
        ) : null
      )}
    </nav>
  );
}
