export interface ArticleMeta {
  slug: string;
  title: string;
  description: string;
  date: string; // ISO
  tags: string[];
  readingTime: string;
  published: boolean;
}

export const articles: ArticleMeta[] = [
  {
    slug: 'placeholder-article-1',
    title: 'Placeholder Article 1',
    description: 'Short placeholder description for article 1.',
    date: '2025-01-10',
    tags: ['DevOps'],
    readingTime: '3 min',
    published: true
  }
];

export function getLatestArticle() {
  return articles.filter(a => a.published).sort((a,b)=> b.date.localeCompare(a.date))[0];
}
