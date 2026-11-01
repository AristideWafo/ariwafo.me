import { Metadata } from "next";
import { Toc } from "@/components/articles/Toc";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { TagList } from "@/components/ui/TagList";
import { RepoCard } from "@/components/articles/RepoCard";
import { formatDate } from "@/lib/content/articles/data";
import { getNativeArticle, getNativeArticles } from "@/lib/content/articles/native";
import { buildMetadata } from "@/lib/seo/metadata";

interface ArticlePageProps {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  return (await getNativeArticles()).filter((a) => !a.draft).map((a) => ({ id: a.id }));
}

export async function generateMetadata({ params }: ArticlePageProps): Promise<Metadata> {
  const { id } = await params;
  const article = await getNativeArticle(id);
  if (!article) return { title: "Article not found" };

  return buildMetadata({
    title: article.meta.title,
    description: article.meta.excerpt,
    path: `/articles/${id}`,
    type: "article",
    ogImage: `/articles/${id}/og`,
  });
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { id } = await params;
  const article = await getNativeArticle(id);
  if (!article) notFound();
  const { meta, content, headings } = article;

  return (
    <article className="py-14 md:py-20">
      <Container>
        <Link
          href="/articles"
          className="font-mono text-[11px] uppercase tracking-[0.14em] text-primary hover:underline"
        >
          ← All articles
        </Link>

        <header className="mt-8 max-w-3xl">
          <p className="label">
            DOC_{String(meta.doc).padStart(3, "0")} · {formatDate(meta.date)} · {meta.readingTime} MIN READ
            {meta.draft && " · DRAFT"}
          </p>
          <h1 className="display mt-4 text-3xl leading-[1.05] sm:text-4xl">{meta.title}</h1>
          <TagList tags={meta.tags} basePath="/articles" />
        </header>

        <hr className="my-10 border-border" />

        <div className="grid grid-cols-[minmax(0,1fr)] gap-12 lg:grid-cols-[minmax(0,1fr)_18rem]">
          <div className="prose prose-neutral min-w-0 max-w-3xl break-words dark:prose-invert prose-headings:scroll-mt-24 prose-headings:font-mono prose-headings:tracking-tight prose-a:text-primary prose-code:font-mono prose-code:before:content-none prose-code:after:content-none prose-pre:border prose-pre:border-border prose-pre:bg-surface prose-pre:text-sm prose-pre:rounded-none prose-table:text-sm prose-th:text-left prose-th:font-mono prose-th:text-xs prose-th:uppercase prose-th:tracking-wide prose-table:border prose-table:border-border prose-th:border prose-th:border-border prose-td:border prose-td:border-border prose-th:px-4 prose-th:py-3 prose-td:px-4 prose-td:py-3 prose-td:align-top prose-td:leading-normal [&_td]:min-w-[8rem][&_table]:block [&_table]:overflow-x-auto">
            {content}
          </div>

          <aside className="space-y-8 lg:sticky lg:top-24 lg:self-start">
            {headings.length > 0 && (
              <Toc headings={headings} />
            )}
            {meta.repo && <RepoCard repo={meta.repo} />}
          </aside>
        </div>
      </Container>
    </article>
  );
}
