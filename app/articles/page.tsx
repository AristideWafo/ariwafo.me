import { Section } from "@/components/ui/Section";
import { CardGrid } from "@/components/ui/CardGrid";
import { ArticleCard } from "@/components/articles/ArticleCard";
import { getArticles } from "@/lib/content/articles/data";
import { TagFilter } from "@/components/ui/TagFilter";
import { hasTag, tagLabel } from "@/lib/tags";

export default async function ArticlesPage({
  searchParams,
}: {
  searchParams: Promise<{ tag?: string }>;
}) {
  const { tag } = await searchParams;
  const articles = await getArticles();
  const filtered = tag ? articles.filter((a) => hasTag(a, tag)) : articles;

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
        <TagFilter items={articles} basePath="/articles" active={tag} label="Filter articles by tag" />
      </Section>

      <Section divider={false}>
        {filtered.length === 0 ? (
          <p className="border border-border p-10 text-center font-mono text-sm text-muted-foreground">
            No articles tagged “{tag ? tagLabel(tag) : ""}”.
          </p>
        ) : (
          <CardGrid>
            {filtered.map((article) => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </CardGrid>
        )}
      </Section>
    </>
  );
}
