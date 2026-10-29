import Link from "next/link";
import { TagList } from "@/components/ui/TagList";
import { Project } from "@/lib/content/projects/data";

interface ProjectCardProps {
  project: Project;
  index?: number;
}

/**
 * Sits inside a `gap-px bg-border` grid, so the card draws no border of its
 * own — the grid gaps are the rules between entries.
 */
export function ProjectCard({ project, index }: ProjectCardProps) {
  return (
    <article className="group relative flex h-full flex-col border-b border-r border-border bg-background p-6 transition-colors hover:bg-surface/50">
      <div className="flex items-baseline justify-between gap-4">
        <span className="label-accent">
          {typeof index === "number"
            ? `PRJ_${String(index + 1).padStart(3, "0")}`
            : "PRJ"}
        </span>
        {project.featured && <span className="label">Featured</span>}
      </div>

      <h3 className="mt-4 font-mono text-lg font-semibold leading-snug tracking-tight">
        <Link
          href={project.link}
          target="_blank"
          rel="noopener noreferrer"
          className="transition-colors after:absolute after:inset-0 group-hover:text-primary"
        >
          {project.title}
        </Link>
      </h3>

      <p className="mt-3 flex-1 leading-relaxed text-muted-foreground">
        {project.description}
      </p>

      <TagList tags={project.tags.slice(0, 5)} basePath="/projects" />

      <p className="mt-5 font-mono text-xs uppercase tracking-[0.14em] text-muted-foreground transition-colors group-hover:text-primary">
        View source ↗
      </p>
    </article>
  );
}
