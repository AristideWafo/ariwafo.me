"use client";

import { useState, useMemo } from "react";
import { Section } from "@/components/ui/Section";
import { ArticleCard } from "@/components/articles/ArticleCard";
import { ExternalArticleCard } from "@/components/articles/ExternalArticleCard";
import {
  internalArticles,
  externalArticles,
} from "@/src/lib/content/articles/data";
import { cn } from "@/lib/utils";

export default function ArticlesPage() {
  const [selectedTag, setSelectedTag] = useState<string>("All");

  // Extraire tous les tags uniques des articles
  const allTags = useMemo(() => {
    const tagsSet = new Set<string>();

    // Tags des articles internes
    internalArticles.forEach((article) => {
      article.tags?.forEach((tag) => tagsSet.add(tag));
    });

    // Tags des articles externes
    externalArticles.forEach((article) => {
      article.tags?.forEach((tag) => tagsSet.add(tag));
    });

    return ["All", ...Array.from(tagsSet).sort()];
  }, []);

  // Filtrer les articles par tag
  const filteredInternalArticles = useMemo(() => {
    if (selectedTag === "All") return internalArticles;
    return internalArticles.filter((article) =>
      article.tags?.includes(selectedTag)
    );
  }, [selectedTag]);

  const filteredExternalArticles = useMemo(() => {
    if (selectedTag === "All") return externalArticles;
    return externalArticles.filter((article) =>
      article.tags?.includes(selectedTag)
    );
  }, [selectedTag]);

  const hasResults =
    filteredInternalArticles.length > 0 || filteredExternalArticles.length > 0;

  return (
    <div className="min-h-screen">
      {/* Header Section */}
      <Section className="pb-0 md:pb-0">
        <div className="space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
            Articles & Resources
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl">
            Technical guides, experience feedback and resources on cloud
            infrastructure, DevOps and modern technologies.
          </p>
        </div>

        {/* Tags Filter */}
        <div className="flex flex-wrap gap-2 mt-8">
          {allTags.map((tag) => (
            <button
              key={tag}
              onClick={() => setSelectedTag(tag)}
              className={cn(
                "px-4 py-2 rounded-md text-sm font-medium transition-colors",
                selectedTag === tag
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted hover:bg-muted/80 text-muted-foreground"
              )}
            >
              {tag}
            </button>
          ))}
        </div>
      </Section>

      {/* Articles Content */}
      {!hasResults ? (
        <Section>
          <p className="text-center text-muted-foreground py-12">
            No articles found for this tag.
          </p>
        </Section>
      ) : (
        <>
          {/* Internal Articles Section */}
          {filteredInternalArticles.length > 0 && (
            <Section>
              <div className="space-y-6">
                <div className="grid gap-8 md:grid-cols-2">
                  {filteredInternalArticles.map((article) => (
                    <ArticleCard key={article.id} article={article} featured />
                  ))}
                </div>
              </div>
            </Section>
          )}

          {/* External Articles Section */}
          {filteredExternalArticles.length > 0 && (
            <Section>
              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  <h2 className="text-2xl font-semibold">External Articles</h2>
                  <span className="px-2 py-1 text-xs font-medium bg-muted text-muted-foreground rounded-full">
                    {filteredExternalArticles.length}
                  </span>
                </div>
                <p className="text-muted-foreground text-sm">
                  Find my publications on Medium, Dev.to and LinkedIn
                </p>
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {filteredExternalArticles.map((article) => (
                    <ExternalArticleCard key={article.id} article={article} />
                  ))}
                </div>
              </div>
            </Section>
          )}
        </>
      )}
    </div>
  );
}
