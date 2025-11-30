import { Metadata } from "next";
import { Section } from "@/components/ui/Section";
import { ArticleCard } from "@/components/articles/ArticleCard";
import { ExternalArticleCard } from "@/components/articles/ExternalArticleCard";
import {
  featuredInternalArticles,
  internalArticles,
  externalArticles,
} from "@/src/lib/content/articles/data";

export const metadata: Metadata = {
  title: "Articles - Aristide WAFO",
  description:
    "Découvrez mes articles sur l'infrastructure cloud, DevOps, Kubernetes et les dernières technologies. Guides pratiques et retours d'expérience.",
};

export default function ArticlesPage() {
  return (
    <div className="min-h-screen">
      {/* Header Section */}
      <Section className="pb-0 md:pb-0">
        <div className="space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
            Articles & Ressources
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl">
            Guides techniques, retours d&apos;expérience et ressources sur
            l&apos;infrastructure cloud, DevOps et les technologies modernes.
          </p>
        </div>
      </Section>

      {/* Featured Articles Section */}
      {featuredInternalArticles.length > 0 && (
        <Section>
          <div className="space-y-6">
            <div className="grid gap-8 md:grid-cols-2">
              {internalArticles.map((article) => (
                <ArticleCard key={article.id} article={article} featured />
              ))}
            </div>
          </div>
        </Section>
      )}

      {/* External Articles Section */}
      {externalArticles.length > 0 && (
        <Section>
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <h2 className="text-2xl font-semibold">Articles Externes</h2>
              <span className="px-2 py-1 text-xs font-medium bg-muted text-muted-foreground rounded-full">
                {externalArticles.length}
              </span>
            </div>
            <p className="text-muted-foreground text-sm">
              Retrouvez mes publications sur Medium, Dev.to et LinkedIn
            </p>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {externalArticles.map((article) => (
                <ExternalArticleCard key={article.id} article={article} />
              ))}
            </div>
          </div>
        </Section>
      )}
    </div>
  );
}
