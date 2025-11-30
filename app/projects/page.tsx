import { Metadata } from "next";
import { Section } from "@/components/ui/Section";
import { projects, featuredProjects } from "@/lib/content/projects/data";
import { ProjectCard } from "@/components/projects/ProjectCard";

export const metadata: Metadata = {
  title: "Projets - Aristide WAFO",
  description:
    "Découvrez mes projets d'infrastructure cloud, automatisation DevOps et solutions techniques réalisés avec les dernières technologies.",
};

export default function ProjectsPage() {
  return (
    <div className="min-h-screen">
      {/* Header Section */}
      <Section className="pb-0 md:pb-0 ">
        <div className="space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
            Mes Projets
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl">
            Une sélection de projets d&apos;infrastructure cloud,
            d&apos;automatisation DevOps et de solutions techniques que
            j&apos;ai développés.
          </p>
        </div>
      </Section>

      {/* Featured Projects Section */}
      {featuredProjects.length > 0 && (
        <Section>
          <div className="space-y-6 ">
            <div className="grid gap-6 md:grid-cols-2">
            {projects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
            </div>
          </div>
        </Section>
      )}
    </div>
  );
}
