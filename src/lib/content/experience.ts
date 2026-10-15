export type Experience = {
  company: string;
  role: string;
  /** Employment type, shown as a tag next to the role. */
  type?: "Permanent" | "Freelance" | "Apprenticeship";
  location?: string;
  description?: string[];
  techStack?: string[];
  start: string; // "YYYY-MM"
  end?: string; // "YYYY-MM" or "Present"
  duration?: string;
  logo?: string;
  url?: string;
};

/**
 * Ordered most recent first. Freelance engagements overlap salaried roles by
 * design. Logos are intentionally absent: the LinkedIn CDN URLs previously
 * stored here were signed with expiry params and all returned 403, so the
 * monogram fallback is used instead.
 */
export const work: Experience[] = [
  {
    company: "Genuka",
    role: "DevOps Consultant",
    type: "Freelance",
    description: [],
    techStack: [],
    start: "2026-03",
    end: "Present",
    url: "https://genuka.com",
  },
  {
    company: "Societe Generale",
    role: "Observability Engineer",
    type: "Permanent",
    location: "Paris, France",
    description: [
      "Built an AI-powered SRE agent using Model Context Protocol (MCP), Ollama (Qwen3) and FastAPI that investigates production alerts, correlates metrics, logs and traces, and surfaces root-cause hypotheses and remediation suggestions for on-call engineers — reducing MTTR and cutting false positives",
      "Designed and deployed an observability solution on Azure Kubernetes Service covering 50+ production microservices for critical banking applications, defining SLI/SLO frameworks with product and platform teams and reducing Mean Time To Detect by 40%",
      "Architected hybrid cloud infrastructure across Azure and on-premise environments with Terraform and Ansible, implementing Cross-Cluster Search federation for unified observability plus automated health checks and RBAC policies",
      "Worked with cross-functional stakeholders to translate business needs into technical observability requirements",
    ],
    techStack: [
      "Azure",
      "AKS",
      "Prometheus",
      "Grafana",
      "ELK Stack",
      "Terraform",
      "Ansible",
      "Python",
      "FastAPI",
      "MCP",
    ],
    start: "2025-09",
    end: "Present",
    url: "https://www.societegenerale.com/fr",
  },
  {
    company: "Moabi Voyages TMC",
    role: "DevOps Engineer",
    type: "Freelance",
    description: [
      "Designed and implemented an event-driven serverless architecture on AWS processing 1,000+ daily flight quotes, orchestrating 3 microservices on ECS Fargate with SQS FIFO queues and SNS topics for asynchronous processing and independent horizontal scalability",
      "Automated AWS infrastructure provisioning with Terraform across 7 reusable modules covering ECR, ECS, S3, SQS, SNS and SES, bringing deployment down to roughly 8 minutes and making environments reproducible",
      "Built multi-stage CI/CD pipelines with GitHub Actions for 4 services, automating Docker builds, application and IaC security scanning with Bandit and Checkov, and ECS deployments with health checks",
      "Authored 7 Architecture Decision Records documenting technical trade-offs, including event-driven versus API-based integration",
    ],
    techStack: [
      "AWS",
      "ECS Fargate",
      "SQS",
      "SNS",
      "Terraform",
      "GitHub Actions",
      "Docker",
      "Checkov",
    ],
    start: "2025-05",
    end: "2026-01",
  },
  {
    company: "Astree Software",
    role: "Backend Developer",
    type: "Apprenticeship",
    description: [
      "Automated the migration of 300+ customers with a Spring Boot application, cutting manual migration time from 5 days to 6 hours per customer and saving roughly 80% in operational cost",
      "Designed a multi-source architecture with JPA and entity managers handling 500K+ concurrent records, eliminating data synchronisation errors",
      "Optimised migration performance with batch processing and pagination, bringing the heaviest volumes (450+ entities) down from 8 hours to 2",
      "Accelerated delivery cycles by 70% with a full GitLab CI/CD pipeline (automated build, test, deploy and artifact publishing), moving the team from weekly to daily deployments",
    ],
    techStack: ["Java", "Spring Boot", "JPA", "GitLab CI", "Docker", "PostgreSQL"],
    start: "2025-02",
    end: "2025-08",
    url: "https://www.astree-software.fr/en/",
  },
  {
    company: "Solidarity World",
    role: "DevOps Engineer",
    type: "Freelance",
    description: [
      "Built and maintained CI/CD pipelines for automated deployments",
      "Managed cloud infrastructure for humanitarian projects",
      "Implemented monitoring and security best practices",
      "Collaborated with international development teams",
    ],
    techStack: ["Jenkins", "Docker", "Terraform", "AWS", "Ansible", "GitLab CI"],
    start: "2025-01",
    end: "2025-05",
  },
  {
    company: "SCI2M",
    role: "Backend Developer",
    type: "Apprenticeship",
    description: [
      "Cut technical debt by 60% through a system audit and strategic refactoring of 4 critical Java modules",
      "Migrated a monolith to 5 independent services with RabbitMQ async messaging and Redis caching, accelerating deployment cycles by 40%",
      "Reached 70% code coverage with JUnit and Mockito, catching 90% of bugs pre-production and reducing post-release hotfixes from 8 per month to under 1",
      "Drove architectural standards through code reviews, technical design meetings and DevOps practices",
    ],
    techStack: ["Java", "Spring Boot", "MySQL", "RabbitMQ", "Redis", "JUnit"],
    start: "2024-05",
    end: "2024-09",
    url: "https://sci2m.com/",
  },
];
