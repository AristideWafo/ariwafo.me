export type Experience = {
  company: string;
  role: string;
  description?: string[]; // Description du rôle sous forme de liste
  techStack?: string[]; // Technologies utilisées
  start: string; // "YYYY-MM"
  end?: string; // "YYYY-MM" ou "present"
  duration?: string; // ex. "04 / 2024 — Present" (si fourni côté contenu)
  logo?: string; // chemin local ou URL distante
  url?: string;
};

export const work: Experience[] = [
  {
    company: "Societe Generale",
    role: "Observability Engineer",
    description: [
      "Implementing monitoring and observability solutions for banking infrastructure",
      "Working with metrics, logs, and distributed tracing systems",
      "Ensuring system reliability and performance monitoring",
    ],
    techStack: [
      "Prometheus",
      "Grafana",
      "ELK Stack",
      "Docker",
      "Kubernetes",
      "Python",
    ],
    start: "2025-09",
    end: "Present",
    logo: "https://media.licdn.com/dms/image/v2/C4E0BAQEGbq0lpQiZXA/company-logo_200_200/company-logo_200_200/0/1630637825727/societe_generale_logo?e=1763596800&v=beta&t=qCIOadtB_a6_gluBz7dWB3j7Mst8Mqruezr_E6UFE04",
    url: "https://www.societegenerale.com/fr",
  },
  {
    company: "Astree Software",
    role: "Backend Developer",
    description: [
      "Developed scalable backend services using modern frameworks",
      "Focused on API design and database optimization",
      "Implemented microservices architecture and system integration",
    ],
    techStack: [
      "Node.js",
      "TypeScript",
      "PostgreSQL",
      "Docker",
      "AWS",
      "Redis",
    ],
    start: "2025-02",
    end: "2025-08",
    logo: "https://media.licdn.com/dms/image/v2/D4E0BAQGGKghGT0b6HA/company-logo_100_100/company-logo_100_100/0/1722346015738/astree_software_logo?e=1757548800&v=beta&t=zXTdsQYd93tKfoRJWA2zqd6MuJ8CDqsqylhDKG3gCqs",
    url: "https://www.astree-software.fr/en/",
  },
  {
    company: "Solidarity World",
    role: "DevOps (Freelance)",
    description: [
      "Built and maintained CI/CD pipelines for automated deployments",
      "Managed cloud infrastructure for humanitarian projects",
      "Implemented monitoring and security best practices",
      "Collaborated with international development teams",
    ],
    techStack: [
      "Jenkins",
      "Docker",
      "Terraform",
      "AWS",
      "Ansible",
      "GitLab CI",
    ],
    start: "2025-01",
    end: "2025-05",
    logo: "https://media.licdn.com/dms/image/v2/D4E0BAQE-EAs9BrJYpA/company-logo_200_200/company-logo_200_200/0/1697330819330/solidarity_global_world_logo?e=1757548800&v=beta&t=cC7AoHBVDgJ5qGnQH-1UVSzgvP7YTXU6nd5mdERUpUs",
    url: "#",
  },
  {
    company: "SCI2M",
    role: "Backend Developer",
    description: [
      "Designed and implemented RESTful APIs for client applications",
      "Worked with microservices architecture and database optimization",
      "Maintained code quality through testing and code reviews",
      "Mentored junior developers on best practices",
    ],
    techStack: ["Java", "Spring Boot", "MySQL", "Docker", "Maven", "JUnit"],
    start: "2024-05",
    end: "2024-09",
    logo: "https://media.licdn.com/dms/image/v2/C4E0BAQGIkXe8HWszVg/company-logo_100_100/company-logo_100_100/0/1630566434921?e=1757548800&v=beta&t=Lac7pkhUdQmTxepjWSOktwbjQDxeey8u_isdyjlW8rE",
    url: "https://sci2m.com/",
  },
];
