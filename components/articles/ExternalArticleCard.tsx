"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Tag } from "@/components/ui/Tag";
import {
  ExternalArticle,
  ExternalArticleMetadata,
} from "@/lib/content/articles/data";

interface ExternalArticleCardProps {
  article: ExternalArticle;
}

export function ExternalArticleCard({ article }: ExternalArticleCardProps) {
  const [metadata, setMetadata] = useState<ExternalArticleMetadata | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    const fetchMetadata = async () => {
      try {
        const response = await fetch(
          `/api/metadata?url=${encodeURIComponent(article.url)}`,
          { signal: AbortSignal.timeout(15000) }
        );

        if (!response.ok) throw new Error(`HTTP ${response.status}`);

        const fetched = await response.json();
        if (!fetched?.title) throw new Error("Invalid metadata received");
        if (!cancelled) setMetadata(fetched);
      } catch (error) {
        console.error("Error fetching metadata for:", article.url, error);
        // The card still has to link somewhere, so fall back to what the
        // corpus already knows about this article.
        if (!cancelled) {
          setMetadata({
            title: article.description ?? `Article on ${article.platform}`,
            description: `Published on ${article.platform}.`,
            image: "",
            url: article.url,
            platform: article.platform,
          });
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    // Stagger the calls so a page of cards does not fire every request at once.
    const timeoutId = setTimeout(fetchMetadata, Math.random() * 1000);

    return () => {
      cancelled = true;
      clearTimeout(timeoutId);
    };
  }, [article.url, article.platform, article.description]);

  if (loading) {
    return (
      <article className="flex h-full animate-pulse flex-col border-b border-r border-border bg-background p-6">
        <div className="h-3 w-24 bg-border" />
        <div className="mt-4 h-5 w-3/4 bg-border" />
        <div className="mt-3 h-4 w-full bg-border" />
        <div className="mt-2 h-4 w-2/3 bg-border" />
        <p className="mt-5 label">Loading…</p>
      </article>
    );
  }

  if (!metadata) return null;

  return (
    <article className="group relative flex h-full flex-col border-b border-r border-border bg-background p-6 transition-colors hover:bg-surface/50">
      <div className="flex items-baseline justify-between gap-4">
        <span className="label-accent">{metadata.platform}</span>
        <span className="label">External</span>
      </div>

      <h3 className="mt-4 font-mono text-base font-semibold leading-snug tracking-tight">
        <Link
          href={metadata.url}
          target="_blank"
          rel="noopener noreferrer"
          className="transition-colors after:absolute after:inset-0 group-hover:text-primary"
        >
          {metadata.title}
        </Link>
      </h3>

      <p className="mt-3 flex-1 leading-relaxed text-muted-foreground">
        {article.description || metadata.description}
      </p>

      {article.tags && article.tags.length > 0 && (
        <ul className="mt-5 flex flex-wrap gap-2">
          {article.tags.map((tag) => (
            <li key={tag}>
              <Tag>{tag}</Tag>
            </li>
          ))}
        </ul>
      )}

      <p className="mt-5 font-mono text-xs uppercase tracking-[0.14em] text-muted-foreground transition-colors group-hover:text-primary">
        Read on {metadata.platform} ↗
      </p>
    </article>
  );
}
