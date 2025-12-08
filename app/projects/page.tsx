"use client";

import { useState, useMemo } from "react";
import { Section } from "@/components/ui/Section";
import { projects } from "@/lib/content/projects/data";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { cn } from "@/lib/utils";

export default function ProjectsPage() {
  const [selectedTag, setSelectedTag] = useState<string>("All");

  // Extraire tous les tags uniques des projets
  const allTags = useMemo(() => {
    const tagsSet = new Set<string>();
    projects.forEach((project) => {
      project.tags?.forEach((tag) => tagsSet.add(tag));
    });
    return ["All", ...Array.from(tagsSet).sort()];
  }, []);

  // Filtrer les projets par tag
  const filteredProjects = useMemo(() => {
    if (selectedTag === "All") return projects;
    return projects.filter((project) => project.tags?.includes(selectedTag));
  }, [selectedTag]);

  return (
    <div className="min-h-screen">
      {/* Header Section */}
      <Section className="pb-0 md:pb-0 ">
        <div className="space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
            My Projects
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl">
            A selection of cloud infrastructure, DevOps automation, and
            technical solutions I&apos;ve developed.
          </p>
        </div>

        {/* Tags Filter */}
        <div className="flex flex-wrap gap-2 mt-8">
          {allTags.map((tag) => (
            <button
              key={tag}
              onClick={() => setSelectedTag(tag)}
              className={cn(
                "px-4 py-2 rounded-md text-sm font-medium transition-colors",
                selectedTag === tag
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted hover:bg-muted/80 text-muted-foreground"
              )}
            >
              {tag}
            </button>
          ))}
        </div>
      </Section>

      {/* Projects Grid */}
      <Section>
        <div className="space-y-6">
          {filteredProjects.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-2">
              {filteredProjects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          ) : (
            <p className="text-center text-muted-foreground py-12">
              No projects found for this tag.
            </p>
          )}
        </div>
      </Section>
    </div>
  );
}
