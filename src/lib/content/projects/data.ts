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
    id: "dns-failover",
    title: "Automated DNS Failover",
    description:
      "A Go daemon that watches primary and secondary HTTP endpoints and flips a Cloudflare DNS A record the moment the primary fails, then restores it once the primary is stable again. Multi-record monitoring, Discord alerting, and a dry-run mode so failover can be rehearsed without touching live DNS.",
    image: "",
    technologies: ["Go", "Cloudflare API", "DNS", "Health Checks"],
    tags: ["Go", "Automation", "Reliability", "Infrastructure"],
    link: "https://github.com/AristideWafo/dns-failover",
    featured: true,
  },
  {
    id: "vps-secure",
    title: "VPS-Secure — VPS Hardening",
    description:
      "An Ansible role and CLI that hardens Ubuntu servers: key-only SSH on a custom port with modern crypto, UFW firewall rules and Fail2ban. Read-only audits, dry-run execution, explicit confirmation and automatic SSH rollback, so hardening a box cannot lock you out of it.",
    image: "",
    technologies: ["Ansible", "Bash", "Ubuntu", "UFW", "Fail2ban"],
    tags: ["Ansible", "Security", "Automation", "Infrastructure"],
    link: "https://github.com/AristideWafo/vps-secure",
    featured: true,
  },
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
