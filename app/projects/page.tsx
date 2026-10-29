import { Section } from "@/components/ui/Section";
import { CardGrid } from "@/components/ui/CardGrid";
import { TagFilter } from "@/components/ui/TagFilter";
import { getProjects } from "@/lib/content/projects/github";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { hasTag, tagLabel } from "@/lib/tags";

export default async function ProjectsPage({
  searchParams,
}: {
  searchParams: Promise<{ tag?: string }>;
}) {
  const { tag } = await searchParams;
  const projects = await getProjects();
  const filtered = tag ? projects.filter((p) => hasTag(p, tag)) : projects;

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
        <TagFilter
          items={projects}
          basePath="/projects"
          active={tag}
          label="Filter projects by tag"
        />
      </Section>

      <Section divider={false}>
        {filtered.length > 0 ? (
          <CardGrid>
            {filtered.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} />
            ))}
          </CardGrid>
        ) : (
          <p className="border border-border p-10 text-center font-mono text-sm text-muted-foreground">
            No projects tagged “{tag ? tagLabel(tag) : ""}”.
          </p>
        )}
      </Section>
    </>
  );
}
