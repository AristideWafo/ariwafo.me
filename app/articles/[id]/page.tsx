import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { Tag } from "@/components/ui/Tag";
import { internalArticles } from "@/lib/content/articles/data";
import { buildMetadata } from "@/lib/seo/metadata";

interface ArticlePageProps {
  params: Promise<{ id: string }>;
}

const formatDate = (dateString: string) =>
  new Date(dateString).toLocaleDateString("en-GB", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

export async function generateMetadata({
  params,
}: ArticlePageProps): Promise<Metadata> {
  const { id } = await params;
  const article = internalArticles.find((a) => a.id === id);

  if (!article) return { title: "Article not found" };

  return buildMetadata({
    title: article.title,
    description: article.excerpt,
    path: `/articles/${article.id}`,
    type: "article",
  });
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { id } = await params;
  const article = internalArticles.find((a) => a.id === id);

  if (!article) notFound();

  return (
    <article className="py-14 md:py-20">
      <Container>
        <div className="mx-auto max-w-3xl">
          <Link
            href="/articles"
            className="font-mono text-[11px] uppercase tracking-[0.14em] text-primary hover:underline"
          >
            ← All articles
          </Link>

          <p className="label mt-8">
            {formatDate(article.date)} · {article.readTime} min read
          </p>

          <h1 className="display mt-4 text-3xl leading-[1.05] sm:text-4xl">
            {article.title}
          </h1>

          <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
            {article.excerpt}
          </p>

          <ul className="mt-6 flex flex-wrap gap-2">
            {article.tags.map((tag) => (
              <li key={tag}>
                <Tag>{tag}</Tag>
              </li>
            ))}
          </ul>

          <hr className="my-10 border-border" />

          {/* Content is authored in this repository, not user-submitted. */}
          <div
            className="prose prose-neutral max-w-none prose-headings:font-mono prose-headings:tracking-tight prose-a:text-primary prose-code:font-mono"
            dangerouslySetInnerHTML={{
              __html: article.content.replace(/\n/g, "<br>"),
            }}
          />
        </div>
      </Container>
    </article>
  );
}
