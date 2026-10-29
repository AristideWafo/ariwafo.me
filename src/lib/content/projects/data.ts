export interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  tags: string[];
  link: string;
  featured?: boolean;
}

/** Hand-written overrides, keyed by GitHub repo name. Everything else comes from the API. */
export const projectOverrides: Record<
  string,
  Partial<Pick<Project, "title" | "description" | "featured">>
> = {
  "dns-failover": {
    title: "Automated DNS Failover",
    description:
      "A Go daemon that watches primary and secondary HTTP endpoints and flips a Cloudflare DNS A record the moment the primary fails, then restores it once the primary is stable again. Multi-record monitoring, Discord alerting, and a dry-run mode so failover can be rehearsed without touching live DNS.",
    featured: true,
  },
  "vps-secure": {
    title: "VPS-Secure — VPS Hardening",
    description:
      "An Ansible role and CLI that hardens Ubuntu servers: key-only SSH on a custom port with modern crypto, UFW firewall rules and Fail2ban. Read-only audits, dry-run execution, explicit confirmation and automatic SSH rollback, so hardening a box cannot lock you out of it.",
    featured: true,
  },
  "bastion-host": {
    title: "Bastion Host on AWS with Terraform",
    description:
      "Automated infrastructure testing pipeline that provisions an AWS bastion host and private EC2 instance, validates connectivity, and tears down resources automatically using Terraform and GitHub Actions.",
  },
  "ai-bot--review": {
    title: "AI-Powered Code Review Bot",
    description:
      "An AI-powered code review bot that automatically analyzes GitLab Merge Requests and provides smart, contextual feedback to help teams improve code quality and speed up the review process.",
  },
  "aws-devops-agent": {
    title: "AWS DevOps Agent",
    description:
      "Production-ready infrastructure for testing AWS DevOps Agent with 6 realistic incident scenarios. Spring Boot + ECS Fargate + Terraform + Chaos Engineering. Medium article included.",
    featured: true,
  },
};
