import React from "react";
import Link from "next/link";
import { Section } from "@/components/ui/Section";
import { formatDate, getExternalArticles } from "@/lib/content/articles/data";

export async function LatestWritingSection() {
  const latest = (await getExternalArticles()).slice(0, 3);
  if (latest.length === 0) return null;

  return (
    <Section label="FIG_003 · Latest writing" title="Notes from the pipeline">
      <ul className="divide-y divide-border border-y border-border">
        {latest.map((article) => (
          <li key={article.id}>
            <a
              href={article.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 py-4 hover:text-primary"
            >
              <span>{article.title}</span>
              <span className="label">
                {article.date && `${formatDate(article.date)} — `}
                {article.platform} ↗
              </span>
            </a>
          </li>
        ))}
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
