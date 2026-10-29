import { normalizeTags } from "@/lib/tags";
import { getNativeArticles } from "./native";
import { MEDIUM_FEED, parseMediumFeed } from "./medium";

export interface ExternalArticle {
  id: string;
  title: string;
  url: string;
  /** ISO date; optional for hand-written entries. */
  date?: string;
  description?: string;
  platform: string; // "Medium", "LinkedIn", etc.
  tags: string[];
  /** Minutes; only known when the source ships full text (Medium RSS). */
  readingTime?: number;
}

export const formatDate = (dateString: string) =>
  new Date(dateString).toLocaleDateString("en-GB", {
    year: "numeric",
    month: "short",
    day: "2-digit",
  });

/** Hand-written entries; Medium posts come from the RSS feed. */
const manualArticles: ExternalArticle[] = [
  {
    id: "thales-battle-dev-2025-epitech",
    title: "Thales Battle Dev 2025: our Paris campus answers present",
    url: "https://www.epitech.eu/2025/10/27/thales-battle-dev-2025-notre-campus-parisien-repond-present/",
    date: "2025-10-27",
    platform: "Epitech",
    description: "Analyse et retour d'expérience sur la participation d'Epitech Paris au Thales Battle Dev 2025.",
    tags: ["Competition", "Coding", "Experience"],
  },
  {
    id: "winning-competition",
    title: "Winning the Thales Battle Dev with Epitech Paris",
    url: "https://www.linkedin.com/posts/aristidewafo_epitechparis-thalesbattledev-codingbattle-ugcPost-7386055530428997633-tCQd",
    date: "2025-10-20", // decoded from the LinkedIn post id
    platform: "LinkedIn",
    tags: ["Competition", "Coding", "Experience"],
  },
];

async function getExternalArticles(): Promise<ExternalArticle[]> {
  let medium: ExternalArticle[] = [];
  try {
    const res = await fetch(MEDIUM_FEED, { next: { revalidate: 86400 } });
    if (!res.ok) throw new Error(`Medium RSS ${res.status}`);
    medium = parseMediumFeed(await res.text());
  } catch (error) {
    console.error("Articles: Medium RSS failed, using manual entries only.", error);
  }
  return [...medium, ...manualArticles];
}

/** One row of the writing list, whatever its source. */
export interface ArticleEntry {
  id: string;
  title: string;
  description?: string;
  date?: string;
  tags: string[];
  readingTime?: number;
  href: string;
  /** Set for articles hosted elsewhere; undefined for native ones. */
  platform?: string;
}

/** Native + Medium + manual entries, newest first (undated last). Never throws. */
export async function getArticles(): Promise<ArticleEntry[]> {
  const [native, external] = await Promise.all([getNativeArticles(), getExternalArticles()]);
  return [
    ...native.map((a): ArticleEntry => ({
      id: a.id,
      title: a.title,
      description: a.excerpt,
      date: a.date,
      tags: a.tags,
      readingTime: a.readingTime,
      href: `/articles/${a.id}`,
    })),
    ...external.map((a): ArticleEntry => ({
      id: a.id,
      title: a.title,
      description: a.description,
      date: a.date,
      tags: normalizeTags(a.tags),
      readingTime: a.readingTime,
      href: a.url,
      platform: a.platform,
    })),
  ].sort((a, b) => (b.date ?? "").localeCompare(a.date ?? ""));
}
