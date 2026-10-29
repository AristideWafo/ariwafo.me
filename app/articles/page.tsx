import { Section } from "@/components/ui/Section";
import { CardGrid } from "@/components/ui/CardGrid";
import { ArticleCard } from "@/components/articles/ArticleCard";
import { ExternalArticleCard } from "@/components/articles/ExternalArticleCard";
import { internalArticles, getExternalArticles } from "@/lib/content/articles/data";
import { TagFilter } from "@/components/ui/TagFilter";
import { hasTag, tagLabel } from "@/lib/tags";

export default async function ArticlesPage({
  searchParams,
}: {
  searchParams: Promise<{ tag?: string }>;
}) {
  const { tag } = await searchParams;
  const external = await getExternalArticles();
  const filteredInternal = tag ? internalArticles.filter((a) => hasTag(a, tag)) : internalArticles;
  const filteredExternal = tag ? external.filter((a) => hasTag(a, tag)) : external;
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
        <TagFilter
          items={[...internalArticles, ...external]}
          basePath="/articles"
          active={tag}
          label="Filter articles by tag"
        />
      </Section>

      {!hasResults ? (
        <Section divider={false}>
          <p className="border border-border p-10 text-center font-mono text-sm text-muted-foreground">
            No articles tagged “{tag ? tagLabel(tag) : ""}”.
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
