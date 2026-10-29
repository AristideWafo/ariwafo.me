import "server-only";
import fs from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";
import { compileMDX } from "next-mdx-remote/rsc";
import rehypeSlug from "rehype-slug";
import rehypeShiki from "@shikijs/rehype";
import { normalizeTags } from "@/lib/tags";
import { readingMinutes } from "./reading-time";
import { mdxComponents } from "@/components/articles/mdx";

const DIR = path.join(process.cwd(), "content/articles");

export interface NativeArticle {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  tags: string[];
  repo?: string;
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
            draft: data.draft === true,
            readingTime: readingMinutes(content),
          },
        };
      })
  );
  parsed.sort((a, b) => a.meta.date.localeCompare(b.meta.date));
  const visible = process.env.NODE_ENV !== "production";
  return parsed
    .map((p, i) => ({ ...p, meta: { ...p.meta, doc: i + 1 } }))
    .filter((p) => visible || !p.meta.draft);
}

/** Metadata of native articles, newest first. Drafts only outside production. */
export async function getNativeArticles(): Promise<NativeArticle[]> {
  return (await readAll()).map((p) => p.meta).reverse();
}

export async function getNativeArticle(id: string) {
  const found = (await readAll()).find((p) => p.meta.id === id);
  if (!found) return null;

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
    components: mdxComponents,
    options: {
      mdxOptions: {
        rehypePlugins: [
          rehypeSlug,
          collectHeadings,
          [rehypeShiki, { themes: { light: "github-light", dark: "github-dark" }, defaultColor: false }],
        ],
      },
    },
  });
  return { meta: found.meta, content, headings };
}

interface HastNode {
  tagName?: string;
  value?: string;
  properties?: Record<string, unknown>;
  children?: HastNode[];
}
const textOf = (n: HastNode): string =>
  n.value ?? n.children?.map(textOf).join("") ?? "";
