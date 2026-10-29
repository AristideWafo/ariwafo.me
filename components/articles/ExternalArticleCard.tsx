import Link from "next/link";
import { TagList } from "@/components/ui/TagList";
import { ExternalArticle, formatDate } from "@/lib/content/articles/data";

export function ExternalArticleCard({ article }: { article: ExternalArticle }) {
  return (
    <article className="group relative flex h-full flex-col border-b border-r border-border bg-background p-6 transition-colors hover:bg-surface/50">
      <div className="flex items-baseline justify-between gap-4">
        <span className="label-accent">{article.platform}</span>
        {article.date && <span className="label">{formatDate(article.date)}</span>}
      </div>

      <h3 className="mt-4 font-mono text-base font-semibold leading-snug tracking-tight">
        <Link
          href={article.url}
          target="_blank"
          rel="noopener noreferrer"
          className="transition-colors after:absolute after:inset-0 group-hover:text-primary"
        >
          {article.title}
        </Link>
      </h3>

      <p className="mt-3 flex-1 leading-relaxed text-muted-foreground">
        {article.description}
      </p>

      <TagList tags={article.tags} basePath="/articles" />

      <p className="mt-5 font-mono text-xs uppercase tracking-[0.14em] text-muted-foreground transition-colors group-hover:text-primary">
        Read on {article.platform} ↗
      </p>
    </article>
  );
}
