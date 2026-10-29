import Link from "next/link";
import { normalizeTags } from "@/lib/tags";
import { TagList } from "@/components/ui/TagList";
import { InternalArticle, formatDate } from "@/lib/content/articles/data";

interface ArticleCardProps {
  article: InternalArticle;
  featured?: boolean;
}

export function ArticleCard({ article, featured = false }: ArticleCardProps) {
  return (
    <article className="group relative flex h-full flex-col border-b border-r border-border bg-background p-6 transition-colors hover:bg-surface/50">
      <div className="flex items-baseline justify-between gap-4">
        <span className="label-accent">
          {formatDate(article.date)} · {article.readTime} min read
        </span>
        {featured && <span className="label">Featured</span>}
      </div>

      <h3 className="mt-4 font-mono text-lg font-semibold leading-snug tracking-tight">
        <Link
          href={`/articles/${article.id}`}
          className="transition-colors after:absolute after:inset-0 group-hover:text-primary"
        >
          {article.title}
        </Link>
      </h3>

      <p className="mt-3 flex-1 leading-relaxed text-muted-foreground">
        {article.excerpt}
      </p>

      <TagList tags={normalizeTags(article.tags).slice(0, 4)} basePath="/articles" />

      <p className="mt-5 font-mono text-xs uppercase tracking-[0.14em] text-muted-foreground transition-colors group-hover:text-primary">
        Read →
      </p>
    </article>
  );
}
