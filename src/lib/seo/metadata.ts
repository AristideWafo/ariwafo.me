import type { Metadata } from 'next';
import { siteProfile } from '@/lib/content/site';

interface BuildMetaOptions {
  title?: string;
  description?: string;
  path?: string; // path starting with /
  ogImage?: string;
  fig?: string;
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

  const isHome = !opts.path || opts.path === '/';
  const defaultOgImage = isHome
    ? '/og'
    : `/og?${new URLSearchParams({
        ...(title ? { title } : {}),
        ...(description ? { description } : {}),
        ...(opts.fig ? { fig: opts.fig } : {}),
      }).toString()}`;

  const ogUrl = opts.ogImage ?? defaultOgImage;
  const images = [
    {
      url: ogUrl,
      width: 1200,
      height: 630,
      alt: title ? `${title} · ${siteProfile.name}` : `${siteProfile.name} — Portfolio`,
    },
  ];

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
    // Large preview card on X/LinkedIn/Slack.
    twitter: { card: 'summary_large_image', images: [ogUrl] },
    robots: opts.noIndex ? { index: false, follow: false } : { index: true, follow: true },
  };
}
