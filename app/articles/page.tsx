"use client";

import { useState, useMemo } from "react";
import { Section } from "@/components/ui/Section";
import { CardGrid } from "@/components/ui/CardGrid";
import { ArticleCard } from "@/components/articles/ArticleCard";
import { ExternalArticleCard } from "@/components/articles/ExternalArticleCard";
import { internalArticles, externalArticles } from "@/lib/content/articles/data";
import { cn } from "@/lib/utils";

export default function ArticlesPage() {
  const [selectedTag, setSelectedTag] = useState<string>("All");

  const allTags = useMemo(() => {
    const tagsSet = new Set<string>();
    internalArticles.forEach((a) => a.tags?.forEach((t) => tagsSet.add(t)));
    externalArticles.forEach((a) => a.tags?.forEach((t) => tagsSet.add(t)));
    return ["All", ...Array.from(tagsSet).sort()];
  }, []);

  const filteredInternal = useMemo(
    () =>
      selectedTag === "All"
        ? internalArticles
        : internalArticles.filter((a) => a.tags?.includes(selectedTag)),
    [selectedTag]
  );

  const filteredExternal = useMemo(
    () =>
      selectedTag === "All"
        ? externalArticles
        : externalArticles.filter((a) => a.tags?.includes(selectedTag)),
    [selectedTag]
  );

  const hasResults = filteredInternal.length > 0 || filteredExternal.length > 0;

  return (
    <>
      <Section
        as="h1"
        label="FIG_030 · Writing"
        title="Articles"
        intro="Write-ups on CI/CD, DORA metrics, AWS security and the things that went wrong before they went right."
        divider={false}
        className="pb-0 md:pb-0"
      >
        <div
          className="flex flex-wrap gap-2"
          role="group"
          aria-label="Filter articles by tag"
        >
          {allTags.map((tag) => {
            const active = selectedTag === tag;
            return (
              <button
                key={tag}
                type="button"
                onClick={() => setSelectedTag(tag)}
                aria-pressed={active}
                className={cn(
                  "border px-3 py-2 font-mono text-[11px] uppercase tracking-[0.12em] transition-colors",
                  active
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border text-muted-foreground hover:border-foreground hover:text-foreground"
                )}
              >
                {tag}
              </button>
            );
          })}
        </div>
      </Section>

      {!hasResults ? (
        <Section divider={false}>
          <p className="border border-border p-10 text-center font-mono text-sm text-muted-foreground">
            No articles tagged “{selectedTag}”.
          </p>
        </Section>
      ) : (
        <>
          {filteredInternal.length > 0 && (
            <Section divider={false}>
              <CardGrid cols={2}>
                {filteredInternal.map((article) => (
                  <ArticleCard key={article.id} article={article} featured />
                ))}
              </CardGrid>
            </Section>
          )}

          {filteredExternal.length > 0 && (
            <Section
              label={`FIG_031 · Published elsewhere · ${filteredExternal.length}`}
              title="On Medium, LinkedIn and beyond"
              divider={filteredInternal.length > 0}
            >
              <CardGrid>
                {filteredExternal.map((article) => (
                  <ExternalArticleCard key={article.id} article={article} />
                ))}
              </CardGrid>
            </Section>
          )}
        </>
      )}
    </>
  );
}
