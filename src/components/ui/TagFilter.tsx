import Link from "next/link";
import { cn } from "@/lib/utils";
import { tagCounts } from "@/lib/tags";

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
  const options = [
    { slug: "", label: "All", count: undefined as number | undefined },
    ...tagCounts(items),
  ];
  return (
    <div className="flex flex-wrap gap-2" role="group" aria-label={label}>
      {options.map((o) => {
        const isActive = (active ?? "") === o.slug;
        return (
          <Link
            key={o.slug}
            href={o.slug ? `${basePath}?tag=${o.slug}` : basePath}
            scroll={false}
            replace
            aria-current={isActive ? "true" : undefined}
            className={cn(
              "border px-3 py-2 font-mono text-[11px] uppercase tracking-[0.12em] transition-colors",
              isActive
                ? "border-primary bg-primary text-primary-foreground"
                : "border-border text-muted-foreground hover:border-foreground hover:text-foreground"
            )}
          >
            {o.count ? `${o.label} (${o.count})` : o.label}
          </Link>
        );
      })}
    </div>
  );
}
