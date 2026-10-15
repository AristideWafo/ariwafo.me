import React from "react";
import Link from "next/link";
import { Section } from "@/components/ui/Section";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { featuredProjects } from "@/lib/content/projects/data";

export function FeaturedProjectsSection() {
  if (featuredProjects.length === 0) return null;

  return (
    <Section
      label="FIG_005 · Selected work"
      title="Things I built and shipped"
      intro="Infrastructure you can clone and run. Each one is public, with the Terraform, the pipeline and the teardown included."
    >
      <div className="grid gap-px border border-border bg-border md:grid-cols-2 lg:grid-cols-3">
        {featuredProjects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>

      <Link
        href="/projects"
        className="mt-8 inline-block font-mono text-xs uppercase tracking-[0.14em] text-primary hover:underline"
      >
        All projects ↗
      </Link>
    </Section>
  );
}
