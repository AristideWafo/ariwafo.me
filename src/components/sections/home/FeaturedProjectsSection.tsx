import React from "react";
import Link from "next/link";
import { Section } from "@/components/ui/Section";
import { CardGrid } from "@/components/ui/CardGrid";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { getProjects } from "@/lib/content/projects/github";

export async function FeaturedProjectsSection() {
  const projects = await getProjects();
  const featuredProjects = projects.filter((p) => p.featured);
  if (featuredProjects.length === 0) return null;

  return (
    <Section
      label="FIG_002 · Selected work"
      title="Things I built and shipped"
      intro="Infrastructure you can clone and run. Each one is public, with the Terraform, the pipeline and the teardown included."
    >
      <CardGrid>
        {featuredProjects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </CardGrid>

      <Link
        href="/projects"
        className="mt-8 inline-block font-mono text-xs uppercase tracking-[0.14em] text-primary hover:underline"
      >
        All projects ({projects.length}) ↗
      </Link>
    </Section>
  );
}
