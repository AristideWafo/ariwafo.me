import type { ExternalArticle } from "./data";
import { readingMinutes } from "./reading-time.ts";

export const MEDIUM_FEED = "https://medium.com/feed/@wafoaristide";

// Dependency-free on purpose: scripts/check-medium-rss.mjs imports this file directly.
const text = (s: string) => s.replace(/^\s*<!\[CDATA\[([\s\S]*?)\]\]>\s*$/, "$1").trim();
const tagContent = (xml: string, tag: string) =>
  xml.match(new RegExp(`<${tag}>([\\s\\S]*?)</${tag}>`))?.[1];

export function parseMediumFeed(xml: string): ExternalArticle[] {
  const articles: ExternalArticle[] = [];
  for (const [, item] of xml.matchAll(/<item>([\s\S]*?)<\/item>/g)) {
    const title = text(tagContent(item, "title") ?? "");
    const url = text(tagContent(item, "link") ?? "").split("?")[0];
    const pubDate = new Date(text(tagContent(item, "pubDate") ?? ""));
    if (!title || !url) continue;
    const html = text(tagContent(item, "content:encoded") ?? "");
    articles.push({
      id: url.split("/").pop() ?? url,
      title,
      url,
      date: isNaN(+pubDate) ? undefined : pubDate.toISOString().slice(0, 10),
      platform: "Medium",
      readingTime: html ? readingMinutes(html.replace(/<[^>]*>/g, " ")) : undefined,
      tags: [...item.matchAll(/<category>([\s\S]*?)<\/category>/g)].map((m) => text(m[1])),
    });
  }
  return articles;
}
