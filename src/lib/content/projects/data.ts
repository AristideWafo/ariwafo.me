export interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  technologies: string[];
  tags: string[];
  link: string;
  featured?: boolean;
}

export const projects: Project[] = [
  {
    id: "bastion-host-aws-terraform",
    title: "Bastion Host on AWS with Terraform",
    description:
      "Automated infrastructure testing pipeline that provisions an AWS bastion host and private EC2 instance, validates connectivity, and tears down resources automatically using Terraform and GitHub Actions.",
    image: "",
    technologies: [
      "AWS",
      "Terraform",
      "Ansible",
      "GitHub Actions",
      "Script Bash",
    ],
    tags: ["Infrastructure", "AWS", "Terraform", "CI/CD", "Automation"],
    link: "https://github.com/AristideWafo/bastion-host",
    featured: true,
  },  {
    id: "ai-bot--review",
    title: "AI-Powered Code Review Bot",
    description:
      "An AI-powered code review bot that automatically analyzes GitLab Merge Requests and provides smart, contextual feedback to help teams improve code quality and speed up the review process.",
    image: "",
    technologies: [
      "Bot",
      "Code Quality",
      "GPT",
      "DevOps",
    ],
    tags: ["AI", "DevOps", "Automation", "Code Quality"],
    link: "https://github.com/AristideWafo/ai-bot--review",
    featured: true,
  },{
    id: "aws-devops-agent",
    title: "AWS DevOps Agent",
    description:
      "Production-ready infrastructure for testing AWS DevOps Agent with 6 realistic incident scenarios. Spring Boot + ECS Fargate + Terraform + Chaos Engineering. Medium article included.",
    image: "",
    technologies: [
      "AWS",
      "DevOps",
      "Agent",
      "CI/CD",
    ],
    tags: ["AWS", "DevOps", "AI", "Infrastructure", "Terraform"],
    link: "https://github.com/AristideWafo/aws-devops-agent",
    featured: true,
  },
];

export const featuredProjects = projects.filter((project) => project.featured);
