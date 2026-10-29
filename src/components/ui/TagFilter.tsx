import Link from "next/link";
import { cn } from "@/lib/utils";
import { tagCounts } from "@/lib/tags";

const CHIP = "border px-3 py-2 font-mono text-[11px] uppercase tracking-[0.12em] transition-colors";

/** URL-driven filter bar: the active tag lives in `?tag=<slug>`. */
export function TagFilter({
  items,
  basePath,
  active,
  label,
}: {
  items: { tags: string[] }[];
  basePath: string;
  active?: string;
  label: string;
}) {
  const counts = tagCounts(items);
  // Tags used once hide behind "+ N more", unless one is the active filter.
  const shown = counts.filter((o) => o.count > 1 || o.slug === active);
  const more = counts.filter((o) => !shown.includes(o));

  const chip = (o: { slug: string; label: string; count?: number }) => {
    const isActive = (active ?? "") === o.slug;
    return (
      <Link
        key={o.slug}
        href={o.slug ? `${basePath}?tag=${o.slug}` : basePath}
        scroll={false}
        replace
        aria-current={isActive ? "true" : undefined}
        className={cn(
          CHIP,
          isActive
            ? "border-primary bg-primary text-primary-foreground"
            : "border-border text-muted-foreground hover:border-foreground hover:text-foreground"
        )}
      >
        {o.count ? `${o.label} (${o.count})` : o.label}
      </Link>
    );
  };

  return (
    <div className="flex flex-wrap gap-2" role="group" aria-label={label}>
      {chip({ slug: "", label: "All" })}
      {shown.map(chip)}
      {more.length > 0 && (
        <details className="group open:w-full">
          <summary
            className={cn(
              CHIP,
              "inline-block cursor-pointer list-none border-dashed border-border text-muted-foreground hover:border-foreground hover:text-foreground [&::-webkit-details-marker]:hidden"
            )}
          >
            <span className="group-open:hidden">+ {more.length} more</span>
            <span className="hidden group-open:inline">− Less</span>
          </summary>
          <div className="mt-2 flex flex-wrap gap-2">{more.map(chip)}</div>
        </details>
      )}
    </div>
  );
}
