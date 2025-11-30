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
      "Deployed enterprise observability stack across Kubernetes clusters, Docker containers, and EC2 instances",
      "Established SLI/SLO framework for critical services in collaboration with product and engineering teams, reducing MTTR"
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
        "Automated the migration of 300+ customers via Spring Boot application, reducing man  ual migration time from 5 days to 6 hours per customer, generating an 80% savings in operational costs.",
        "Designed a robust multi-source architecture with JPA and Entity Managers handling 500K+ simultaneous records, eliminating data synchronization errors",
        "Optimized migration performance by using batch processing and pagination, reducing critical volumes (450+ entities) from 8 hours to 2 hours",
        "Accelerated delivery cycles by 70% by implementing full GitLab CI/CD (automated build/test/deploy, artifact publishing), moving from weekly to daily deployments"
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
      "Eliminated technical debt by 60% through comprehensive system audit and strategic refactoring of 4 critical Java modules",
      "Architected microservices migration from monolithic application to 5 independent services with RabbitMQ async messaging and Redis caching, accelerating deployment cycles by 40% ",
      "Achieved 70% code coverage by implementing comprehensive testing strategy with JUnit and Mockito, catching 90% of bugs pre-production and reducing post-release hotfixes from 8/month to <1/month",
      "Drove architectural excellence through code reviews, technical design meetings, and DevOps best practices implementation",
    ],
    techStack: ["Java", "Spring Boot", "MySQL", "Docker", "Maven", "JUnit"],
    start: "2024-05",
    end: "2024-09",
    logo: "https://media.licdn.com/dms/image/v2/C4E0BAQGIkXe8HWszVg/company-logo_100_100/company-logo_100_100/0/1630566434921?e=1757548800&v=beta&t=Lac7pkhUdQmTxepjWSOktwbjQDxeey8u_isdyjlW8rE",
    url: "https://sci2m.com/",
  },
];
