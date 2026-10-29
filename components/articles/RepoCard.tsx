import { siteProfile } from "@/lib/content/site";
import { getProjects } from "@/lib/content/projects/github";
import { CopyButton } from "./CopyButton";

export async function RepoCard({ repo }: { repo: string }) {
  const url = `https://github.com/${siteProfile.githubUser}/${repo}`;
  const project = (await getProjects()).find((p) => p.id === repo);
  const clone = `git clone ${url}.git`;

  return (
    <div className="plate">
      <p className="label-accent">Repository</p>
      <p className="mt-2 font-mono text-sm font-semibold">
        {siteProfile.githubUser}/{repo}
      </p>
      {project?.description && (
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{project.description}</p>
      )}
      <div className="mt-4 flex items-center gap-2 border border-border bg-surface/50 p-2">
        <code className="min-w-0 flex-1 overflow-x-auto whitespace-nowrap font-mono text-xs">{clone}</code>
        <CopyButton text={clone} />
      </div>
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-4 inline-block font-mono text-xs uppercase tracking-[0.14em] text-primary hover:underline"
      >
        View source on GitHub ↗
      </a>
    </div>
  );
}
