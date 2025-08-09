import type { Metadata } from 'next';

interface BuildMetaOptions {
  title?: string;
  description?: string;
  path?: string; // path starting with /
  ogImage?: string;
  type?: 'website' | 'article';
  noIndex?: boolean;
}

const site = {
  name: 'Portfolio',
  baseUrl: 'https://ariwafo.me', // replace on deploy
  defaultDescription: 'Minimal cloud & DevOps engineer portfolio (placeholder content).'
};

export function buildMetadata(opts: BuildMetaOptions = {}): Metadata {
  const title = opts.title ? `${opts.title} | ${site.name}` : `${site.name}`;
  const url = opts.path ? `${site.baseUrl}${opts.path}` : site.baseUrl;
  const description = opts.description ?? site.defaultDescription;
  const images = opts.ogImage ? [opts.ogImage] : [];
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: site.name,
      type: opts.type ?? 'website',
      images
    },
    robots: opts.noIndex ? { index: false, follow: false } : { index: true, follow: true }
  };
}
