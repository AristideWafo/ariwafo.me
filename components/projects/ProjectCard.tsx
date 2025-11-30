import Link from "next/link";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { Project } from "@/lib/content/projects/data";

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
        <div className="h-full flex flex-col space-y-4">
          {/* Project Image */}
          <div className="relative aspect-video overflow-hidden rounded-lg bg-muted">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-600/20 flex items-center justify-center">
              <div className="text-center space-y-2">
                <div className="text-4xl">🚀</div>
                <p className="text-sm font-medium text-foreground/80">
                  {project.title}
                </p>
              </div>
            </div>
          </div>

          {/* Project Content */}
          <div className="flex-1 flex flex-col space-y-3">
            <div className="flex items-start justify-between gap-2">
              <h3 className="font-semibold text-lg group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                {project.title}
              </h3>
              {featured && (
                <Badge
                  variant="outline"
                  className="text-xs bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800 text-blue-600 dark:text-blue-400"
                >
                  Featured
                </Badge>
              )}
            </div>

            <p className="text-muted-foreground text-sm leading-relaxed line-clamp-3 flex-1">
              {project.description}
            </p>

            {/* Technologies */}
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech: string) => (
                <Badge key={tech} variant="outline" className="text-xs">
                  {tech}
                </Badge>
              ))}
            </div>

            {/* External Link Indicator - Always at bottom */}
            <div className="flex items-center gap-2 text-sm text-muted-foreground group-hover:text-foreground transition-colors mt-auto pt-2">
              <span>Voir le projet</span>
              <svg
                className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                />
              </svg>
            </div>
          </div>
        </div>
      </Link>
    </Card>
  );
}
