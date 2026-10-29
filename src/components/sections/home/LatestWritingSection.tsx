import React from "react";
import Link from "next/link";
import { Section } from "@/components/ui/Section";
import { formatDate, getArticles } from "@/lib/content/articles/data";

export async function LatestWritingSection() {
  const latest = (await getArticles()).slice(0, 3);
  if (latest.length === 0) return null;

  return (
    <Section label="FIG_003 · Latest writing" title="Notes from the pipeline">
      <ul className="divide-y divide-border border-y border-border">
        {latest.map((article) => {
          const external = Boolean(article.platform);
          return (
            <li key={article.id}>
              <Link
                href={article.href}
                {...(external && { target: "_blank", rel: "noopener noreferrer" })}
                className="flex flex-wrap items-baseline gap-x-6 gap-y-1 py-4 hover:text-primary"
              >
                <span className="label sm:w-28">{article.date && formatDate(article.date)}</span>
                <span className="flex-1">
                  {article.title}
                  {external && <span aria-hidden> ↗</span>}
                </span>
                {article.readingTime && <span className="label">{article.readingTime} min read</span>}
              </Link>
            </li>
          );
        })}
      </ul>

      <Link
        href="/articles"
        className="mt-8 inline-block font-mono text-xs uppercase tracking-[0.14em] text-primary hover:underline"
      >
        All writing ↗
      </Link>
    </Section>
  );
}
