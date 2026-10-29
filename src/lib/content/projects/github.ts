import { siteProfile } from "@/lib/content/site";
import { normalizeTags, tagLabel } from "@/lib/tags";
import { Project, projectOverrides } from "./data";

interface Repo {
  name: string;
  description: string | null;
  html_url: string;
  topics?: string[];
  language: string | null;
  fork: boolean;
  archived: boolean;
  created_at: string;
  pushed_at: string;
}

const PORTFOLIO_TOPIC = "portfolio";

const prettify =(name: string) =>
  name.split(/[-_]+/).filter(Boolean).map(tagLabel).join(" ");

const toProject = (name: string, link: string, description: string | null, tags: string[]): Project => ({
  id: name,
  title: prettify(name),
  description: description ?? "",
  image: "",
  tags: normalizeTags(tags),
  link,
  ...projectOverrides[name],
});

async function fetchRepos(): Promise<Repo[]> {
  const token = process.env.GITHUB_TOKEN;
  const res = await fetch(
    `https://api.github.com/users/${siteProfile.githubUser}/repos?per_page=100&type=owner`,
    {
      headers: {
        Accept: "application/vnd.github+json",
        ...(token && { Authorization: `Bearer ${token}` }),
      },
      next: { revalidate: 86400 },
    }
  );
  if (!res.ok) throw new Error(`GitHub API ${res.status}`);
  return res.json();
}

export async function getProjects(): Promise<Project[]> {
  try {
    return (await fetchRepos())
      .filter(
        (r) =>
          r.name !== "ariwafo.me" &&
          // The `portfolio` topic opts a repo in regardless of age, fork or archive status.
          (r.topics?.includes(PORTFOLIO_TOPIC) || (!r.fork && !r.archived && r.created_at >= "2025-01-01"))
      )
      .sort((a, b) => b.pushed_at.localeCompare(a.pushed_at))
      .map((r) => {
        const topics = (r.topics ?? []).filter((t) => t !== PORTFOLIO_TOPIC);
        return toProject(r.name, r.html_url, r.description, topics.length ? topics : r.language ? [r.language] : []);
      });
  } catch (error) {
    console.error("Projects: GitHub fetch failed, using local overrides.", error);
    return Object.keys(projectOverrides).map((name) =>
      toProject(name, `https://github.com/${siteProfile.githubUser}/${name}`, null, [])
    );
  }
}

export async function getFeaturedProjects() {
  return (await getProjects()).filter((p) => p.featured);
}
