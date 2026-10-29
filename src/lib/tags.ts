// GitHub topics and Medium categories arrive as lowercase slugs; this gives
// every source one display label and one URL slug.
const LABELS: Record<string, string> = {
  aws: "AWS", cicd: "CI/CD", "ci-cd": "CI/CD", "ci/cd": "CI/CD", ci: "CI",
  iac: "IaC", github: "GitHub", "github-actions": "GitHub Actions",
  devops: "DevOps", gitops: "GitOps", ai: "AI", llm: "LLM", gpt: "GPT",
  api: "REST API", "rest-api": "REST API", oauth2: "OAuth2",
  k8s: "Kubernetes", kubernetes: "Kubernetes", terraform: "Terraform",
  hcl: "HCL", typescript: "TypeScript", javascript: "JavaScript",
  nodejs: "Node.js", gmail: "Gmail",
};

const titleCase = (w: string) => w.charAt(0).toUpperCase() + w.slice(1);

export function tagLabel(raw: string): string {
  const key = raw.trim().toLowerCase().replace(/\s+/g, "-");
  if (LABELS[key]) return LABELS[key];
  if (key.startsWith("aws-")) return `AWS ${tagLabel(key.slice(4))}`;
  return key.split("-").filter(Boolean).map(titleCase).join(" ");
}

export const tagSlug = (raw: string) =>
  tagLabel(raw).toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

/** Labels, deduped case-insensitively. */
export function normalizeTags(tags: string[]): string[] {
  const seen = new Map<string, string>();
  for (const t of tags) {
    const label = tagLabel(t);
    if (label) seen.set(label.toLowerCase(), label);
  }
  return [...seen.values()];
}

/** Tags across items by frequency desc, then alphabetical. */
export function tagCounts(items: { tags: string[] }[]) {
  const counts = new Map<string, { slug: string; label: string; count: number }>();
  for (const item of items)
    for (const label of new Set(item.tags)) {
      const slug = tagSlug(label);
      const entry = counts.get(slug) ?? { slug, label, count: 0 };
      entry.count++;
      counts.set(slug, entry);
    }
  return [...counts.values()].sort(
    (a, b) => b.count - a.count || a.label.localeCompare(b.label)
  );
}

export const hasTag = (item: { tags: string[] }, slug: string) =>
  item.tags.some((t) => tagSlug(t) === slug);
