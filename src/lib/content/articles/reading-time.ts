// Dependency-free: scripts/check-medium-rss.mjs imports medium.ts, which imports this.
export const readingMinutes = (text: string) =>
  Math.max(1, Math.ceil(text.split(/\s+/).filter(Boolean).length / 220));
