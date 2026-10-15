import type { Metadata } from 'next';
import { siteProfile } from '@/lib/content/site';

interface BuildMetaOptions {
  title?: string;
  description?: string;
  path?: string; // path starting with /
  ogImage?: string;
  type?: 'website' | 'article';
  noIndex?: boolean;
}

export function buildMetadata(opts: BuildMetaOptions = {}): Metadata {
  // Bare title: the root layout's `template` adds the site name, so suffixing
  // here would print it twice.
  const title = opts.title;
  const base = siteProfile.url.replace(/\/$/, '');
  const url = opts.path ? `${base}${opts.path}` : base;
  const description = opts.description ?? siteProfile.description;
  const images = opts.ogImage ? [opts.ogImage] : [];

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title: title ? `${title} · ${siteProfile.name}` : siteProfile.name,
      description,
      url,
      siteName: `${siteProfile.name} — Portfolio`,
      type: opts.type ?? 'website',
      images,
    },
    robots: opts.noIndex ? { index: false, follow: false } : { index: true, follow: true },
  };
}
