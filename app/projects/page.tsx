"use client";

import { useState, useMemo } from "react";
import { Section } from "@/components/ui/Section";
import { projects } from "@/lib/content/projects/data";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { cn } from "@/lib/utils";

export default function ProjectsPage() {
  const [selectedTag, setSelectedTag] = useState<string>("All");

  const allTags = useMemo(() => {
    const tagsSet = new Set<string>();
    projects.forEach((project) => project.tags?.forEach((tag) => tagsSet.add(tag)));
    return ["All", ...Array.from(tagsSet).sort()];
  }, []);

  const filteredProjects = useMemo(() => {
    if (selectedTag === "All") return projects;
    return projects.filter((project) => project.tags?.includes(selectedTag));
  }, [selectedTag]);

  return (
    <>
      <Section
        as="h1"
        label="FIG_010 · Catalogue"
        title="Projects"
        intro="Infrastructure and automation I have built in the open. Clone any of them: the Terraform, the pipelines and the teardown scripts are all in the repository."
        divider={false}
        className="pb-0 md:pb-0"
      >
        <div
          className="flex flex-wrap gap-2"
          role="group"
          aria-label="Filter projects by tag"
        >
          {allTags.map((tag) => {
            const active = selectedTag === tag;
            return (
              <button
                key={tag}
                type="button"
                onClick={() => setSelectedTag(tag)}
                aria-pressed={active}
                className={cn(
                  "border px-3 py-2 font-mono text-[11px] uppercase tracking-[0.12em] transition-colors",
                  active
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border text-muted-foreground hover:border-foreground hover:text-foreground"
                )}
              >
                {tag}
              </button>
            );
          })}
        </div>
      </Section>

      <Section divider={false}>
        {filteredProjects.length > 0 ? (
          <div className="grid gap-px border border-border bg-border md:grid-cols-2 lg:grid-cols-3">
            {filteredProjects.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} />
            ))}
          </div>
        ) : (
          <p className="border border-border p-10 text-center font-mono text-sm text-muted-foreground">
            No projects tagged “{selectedTag}”.
          </p>
        )}
      </Section>
    </>
  );
}
