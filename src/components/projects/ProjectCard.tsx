import Link from "next/link";
import Image from "next/image";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { Project } from "@/src/lib/content/projects/data";

interface ProjectCardProps {
  project: Project;
  featured?: boolean;
}

export function ProjectCard({ project, featured = false }: ProjectCardProps) {
  return (
    <Card
      className={`group transition-all duration-300 hover:shadow-lg ${
        featured ? "border-blue-200 dark:border-blue-800" : ""
      }`}
    >
      <Link href={project.link} target="_blank" rel="noopener noreferrer">
        <div className="space-y-4">
            <div className="relative aspect-video overflow-hidden rounded-lg bg-muted">
              <Image 
                src={project.image || "/pictures/placeholder-project.jpg"} 
                alt={`Illustration du projet ${project.title}`}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </div>
          {/* Project Content */}
          <div className="space-y-3">
            <div className="flex items-start justify-between gap-2">
              <h3 className="font-semibold text-lg group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                {project.title}
              </h3>
              {featured && (
                <Badge variant="outline" className="text-xs bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800 text-blue-600 dark:text-blue-400">
                  Featured
                </Badge>
              )}
            </div>

            <p className="text-muted-foreground text-sm leading-relaxed line-clamp-3">
              {project.description}
            </p>

            {/* Technologies */}
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech) => (
                <Badge key={tech} variant="outline" className="text-xs">
                  {tech}
                </Badge>
              ))}
            </div>

            {/* External Link Indicator */}
            <div className="flex items-center gap-2 text-sm text-muted-foreground group-hover:text-foreground transition-colors">
              <span>Voir le projet</span>
              <span className="transition-transform duration-200 group-hover:translate-x-1">
                →
              </span>
            </div>
          </div>
        </div>
      </Link>
    </Card>
  );
}
