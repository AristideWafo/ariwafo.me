import Link from "next/link";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { InternalArticle } from "@/src/lib/content/articles/data";

interface ArticleCardProps {
  article: InternalArticle;
  featured?: boolean;
}

export function ArticleCard({ article, featured = false }: ArticleCardProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("fr-FR", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <Card
      className={`group transition-all duration-300 hover:shadow-lg ${
        featured ? "border-blue-200 dark:border-blue-800" : ""
      }`}
    >
      <div className="h-full flex flex-col space-y-4">
        {/* Article Image */}
        <div className="relative aspect-[16/9] overflow-hidden rounded-lg bg-gradient-to-br from-purple-500/20 to-blue-600/20 flex items-center justify-center">
          <div className="text-center space-y-2">
            <div className="text-4xl">📝</div>
            <p className="text-sm font-medium text-foreground/80 px-4">
              {article.title}
            </p>
          </div>
        </div>

        {/* Article Content */}
        <div className="flex-1 flex flex-col space-y-3">
          {/* Header with title and featured badge */}
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-semibold text-lg group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2">
              {article.title}
            </h3>
            {featured && (
              <Badge
                variant="outline"
                className="text-xs bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800 text-blue-600 dark:text-blue-400 shrink-0"
              >
                Featured
              </Badge>
            )}
          </div>

          {/* Article metadata */}
          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            <span>{formatDate(article.date)}</span>
            <span>•</span>
            <span>{article.readTime} min de lecture</span>
          </div>

          {/* Article excerpt */}
          <p className="text-muted-foreground text-sm leading-relaxed line-clamp-3 flex-1">
            {article.excerpt}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {article.tags.slice(0, 3).map((tag: string) => (
              <Badge key={tag} variant="outline" className="text-xs">
                {tag}
              </Badge>
            ))}
            {article.tags.length > 3 && (
              <Badge variant="outline" className="text-xs">
                +{article.tags.length - 3}
              </Badge>
            )}
          </div>

          {/* Read more button - Always at bottom */}
          <div className="mt-auto pt-2">
            <Link
              href={`/articles/${article.id}`}
              className="inline-flex items-center gap-2 text-sm font-medium text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors group"
            >
              <span>Lire plus</span>
              <svg
                className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </Card>
  );
}
