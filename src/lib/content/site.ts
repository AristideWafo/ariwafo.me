export const siteProfile = {
  name: "Aristide WAFO",
  shortName: "A. WAFO",
  location: "Paris, France",
  role: "Cloud & DevOps Engineer",
  email: "wafoaristide@gmail.com",
  url: "https://ariwafo.me",
  githubUser: "AristideWafo",
  description:
    "Cloud & DevOps engineer. I build the delivery and observability plumbing that lets teams ship daily instead of weekly — Terraform, CI/CD, Prometheus and Grafana.",
  tagline:
    "I build the delivery and observability plumbing that lets teams ship daily instead of weekly.",
  availability: "Open to Cloud / DevOps / SRE roles and consulting",
  socials: [
    { label: "GitHub", href: "https://github.com/AristideWafo" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/aristidewafo/" },
    { label: "Medium", href: "https://medium.com/@wafoaristide" },
    { label: "X", href: "https://x.com/JerryWafo" },
    { label: "YouTube", href: "https://www.youtube.com/@AristideWafo" },
  ],
} as const;

export type Certification = {
  code: string;
  label: string;
  issuer: string;
  url: string;
  image: string;
  fallback: string;
};

export const certifications: Certification[] = [
  {
    code: "SAA-C03",
    label: "Solutions Architect — Associate",
    issuer: "Amazon Web Services",
    url: "https://www.credly.com/badges/52141aa9-dfb7-41d5-9061-e2eb9391d37a/public_url",
    image: "/certifications/aws.png",
    fallback: "SAA",
  },
  {
    code: "HCTA0-003",
    label: "Terraform Associate",
    issuer: "HashiCorp",
    url: "https://www.credly.com/badges/d039aa35-e434-44a4-9904-f0eb32ec4a41/public_url",
    image: "/certifications/terraform.png",
    fallback: "TA",
  },
];

/** Grouped tooling, used by the stack section. */
export const stackGroups: { group: string; items: string[] }[] = [
  {
    group: "Cloud & IaC",
    items: ["AWS", "Terraform", "Ansible", "ECS Fargate", "EC2"],
  },
  {
    group: "Delivery",
    items: ["GitHub Actions", "GitLab CI", "Jenkins", "Docker", "Kubernetes"],
  },
  {
    group: "Observability",
    items: ["Prometheus", "Grafana", "ELK Stack", "CloudWatch", "SLI / SLO"],
  },
  {
    group: "Languages",
    items: ["Java", "Spring Boot", "Python", "TypeScript", "Bash"],
  },
];
