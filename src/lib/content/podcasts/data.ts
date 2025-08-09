export interface EpisodeMeta {
  slug: string;
  title: string;
  summary: string;
  date: string; // ISO
  duration: string;
  links: { spotify?: string; apple?: string };
  published: boolean;
}

export const episodes: EpisodeMeta[] = [
  {
    slug: 'episode-1',
    title: 'Podcast Episode 1 (placeholder)',
    summary: 'Brief placeholder summary for episode 1.',
    date: '2025-01-05',
    duration: '12:34',
    links: {},
    published: true
  }
];

export function getLatestEpisode() {
  return episodes.filter(e => e.published).sort((a,b)=> b.date.localeCompare(a.date))[0];
}
