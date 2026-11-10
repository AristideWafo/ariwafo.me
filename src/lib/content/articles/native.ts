import "server-only";
import fs from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";
import { compileMDX } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import rehypeShiki from "@shikijs/rehype";
import { normalizeTags } from "@/lib/tags";
import { readingMinutes } from "./reading-time";
import { mdxComponents, upcomingAwareLink } from "@/components/articles/mdx";

const DIR = path.join(process.cwd(), "content/articles");

export interface NativeArticle {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  tags: string[];
  repo?: string;
  /** Series name and 1-based position, set together on multi-part articles. */
  series?: string;
  part?: number;
  /** One line on what this part contributes to the series. */
  seriesRole?: string;
  draft: boolean;
  readingTime: number;
  /** Stable 1-based position by date, drafts included so publishing never renumbers. */
  doc: number;
}

export interface Heading {
  id: string;
  text: string;
  depth: 2 | 3;
}

async function readAll() {
  const files = await fs.readdir(DIR).catch(() => [] as string[]); // missing dir = no articles
  const parsed = await Promise.all(
    files
      .filter((f) => f.endsWith(".mdx"))
      .map(async (f) => {
        const { data, content } = matter(await fs.readFile(path.join(DIR, f), "utf8"));
        return {
          content,
          meta: {
            id: f.replace(/\.mdx$/, ""),
            title: String(data.title ?? ""),
            excerpt: String(data.excerpt ?? ""),
            date: new Date(data.date).toISOString().slice(0, 10),
            tags: normalizeTags(data.tags ?? []),
            repo: data.repo as string | undefined,
            series: data.series as string | undefined,
            part: data.part as number | undefined,
            seriesRole: data.seriesRole as string | undefined,
            draft: data.draft === true,
            readingTime: readingMinutes(content),
          },
        };
      })
  );
  // Same-day series parts keep their reading order.
  parsed.sort((a, b) => a.meta.date.localeCompare(b.meta.date) || (a.meta.part ?? 0) - (b.meta.part ?? 0));
  return parsed.map((p, i) => ({ ...p, meta: { ...p.meta, doc: i + 1 } }));
}

/**
 * Production hides drafts and future-dated articles; a future date is a
 * scheduled publication that appears on the first build on or after that day.
 */
const isShown = (a: NativeArticle) =>
  process.env.NODE_ENV !== "production" ||
  (!a.draft && a.date <= new Date().toISOString().slice(0, 10));

/** Metadata of visible native articles, newest first. */
export async function getNativeArticles(): Promise<NativeArticle[]> {
  return (await readAll()).map((p) => p.meta).filter(isShown).reverse();
}

export async function getNativeArticle(id: string) {
  const all = await readAll();
  const found = all.find((p) => p.meta.id === id && isShown(p.meta));
  if (!found) return null;

  // Every part of the series, hidden ones flagged so the page can say "coming".
  const series = found.meta.series
    ? all
        .filter((p) => p.meta.series === found.meta.series)
        .map((p) => ({ ...p.meta, upcoming: !isShown(p.meta) }))
        .sort((a, b) => (a.part ?? 0) - (b.part ?? 0))
    : [];
  const upcoming = new Map(all.filter((p) => !isShown(p.meta)).map((p) => [p.meta.id, p.meta.date]));

  const headings: Heading[] = [];
  // Runs after rehype-slug, so headings already carry their ids.
  const collectHeadings = () => (tree: HastNode) => {
    const walk = (n: HastNode) => {
      if (n.tagName === "h2" || n.tagName === "h3")
        headings.push({
          id: String(n.properties?.id),
          text: textOf(n),
          depth: n.tagName === "h2" ? 2 : 3,
        });
      n.children?.forEach(walk);
    };
    walk(tree);
  };

  const { content } = await compileMDX({
    source: found.content,
    components: { ...mdxComponents, a: upcomingAwareLink(upcoming) },
    options: {
      mdxOptions: {
        remarkPlugins: [remarkGfm],
        rehypePlugins: [
          rehypeSlug,
          collectHeadings,
          [rehypeShiki, { themes: { light: "github-light", dark: "github-dark" }, defaultColor: false }],
        ],
      },
    },
  });
  return { meta: found.meta, content, headings, series };
}

interface HastNode {
  tagName?: string;
  value?: string;
  properties?: Record<string, unknown>;
  children?: HastNode[];
}
const textOf = (n: HastNode): string =>
  n.value ?? n.children?.map(textOf).join("") ?? "";
