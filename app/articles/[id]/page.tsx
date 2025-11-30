import { Metadata } from "next";
import { notFound } from "next/navigation";
import { Section } from "@/components/ui/Section";
import { Badge } from "@/components/ui/Badge";
import { internalArticles } from "@/src/lib/content/articles/data";

interface ArticlePageProps {
  params: Promise<{
    id: string;
  }>;
}

export async function generateMetadata({
  params,
}: ArticlePageProps): Promise<Metadata> {
  const { id } = await params;
  const article = internalArticles.find((a) => a.id === id);

  if (!article) {
    return {
      title: "Article non trouvé",
    };
  }

  return {
    title: `${article.title} - Aristide WAFO`,
    description: article.excerpt,
  };
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { id } = await params;
  const article = internalArticles.find((a) => a.id === id);

  if (!article) {
    notFound();
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("fr-FR", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="min-h-screen">
      <Section>
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Article Header */}
          <div className="space-y-6">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
              {article.title}
            </h1>

            <div className="flex items-center gap-4 text-muted-foreground">
              <span>{formatDate(article.date)}</span>
              <span>•</span>
              <span>{article.readTime} min de lecture</span>
            </div>

            <div className="flex flex-wrap gap-2">
              {article.tags.map((tag: string) => (
                <Badge key={tag} variant="outline">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>

          {/* Article Content */}
          <div className="prose prose-gray dark:prose-invert max-w-none">
            <div
              dangerouslySetInnerHTML={{
                __html: article.content.replace(/\n/g, "<br>"),
              }}
            />
          </div>
        </div>
      </Section>
    </div>
  );
}
