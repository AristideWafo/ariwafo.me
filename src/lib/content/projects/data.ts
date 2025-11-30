export interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  technologies: string[];
  link: string;
  featured?: boolean;
}

export const projects: Project[] = [
  {
    id: "cloud-infrastructure",
    title: "Infrastructure Cloud AWS",
    description:
      "Architecture complète d'infrastructure cloud sur AWS avec Terraform, incluant VPC, ECS, RDS et monitoring CloudWatch. Déploiement automatisé via CI/CD avec GitHub Actions.",
    image: "",
    technologies: [
      "AWS",
      "Terraform",
      "Docker",
      "GitHub Actions",
      "CloudWatch",
    ],
    link: "https://github.com/AristideWafo/aws-infrastructure",
    featured: true,
  },
  // {
  //   id: "kubernetes-monitoring",
  //   title: "Monitoring Kubernetes",
  //   description:
  //     "Stack de monitoring complète pour clusters Kubernetes avec Prometheus, Grafana et AlertManager. Dashboards personnalisés et alertes intelligentes.",
  //   image: "/projects/k8s-monitoring.jpg",
  //   technologies: [
  //     "Kubernetes",
  //     "Prometheus",
  //     "Grafana",
  //     "Helm",
  //     "AlertManager",
  //   ],
  //   link: "https://github.com/AristideWafo/k8s-monitoring",
  //   featured: true,
  // },
  // {
  //   id: "devops-pipeline",
  //   title: "Pipeline DevOps Complet",
  //   description:
  //     "Pipeline CI/CD complet avec tests automatisés, analyse de qualité de code, déploiement multi-environnements et rollback automatique.",
  //   image: "/projects/devops-pipeline.jpg",
  //   technologies: ["Jenkins", "SonarQube", "Docker", "Ansible", "Git"],
  //   link: "https://github.com/AristideWafo/devops-pipeline",
  // },
  // {
  //   id: "microservices-app",
  //   title: "Architecture Microservices",
  //   description:
  //     "Application e-commerce en microservices avec Spring Boot, déployée sur Kubernetes avec service mesh Istio et base de données distribuée.",
  //   image: "/projects/microservices.jpg",
  //   technologies: ["Spring Boot", "Kubernetes", "Istio", "PostgreSQL", "Redis"],
  //   link: "https://github.com/AristideWafo/microservices-ecommerce",
  // },
  // {
  //   id: "iac-azure",
  //   title: "Infrastructure as Code Azure",
  //   description:
  //     "Déploiement d'infrastructure Azure avec Bicep et ARM templates. Gestion des environnements dev/staging/prod avec Azure DevOps.",
  //   image: "/projects/azure-iac.jpg",
  //   technologies: [
  //     "Azure",
  //     "Bicep",
  //     "ARM Templates",
  //     "Azure DevOps",
  //     "PowerShell",
  //   ],
  //   link: "https://github.com/AristideWafo/azure-iac",
  // },
  // {
  //   id: "observability-stack",
  //   title: "Stack d'Observabilité",
  //   description:
  //     "Solution complète d'observabilité avec logs centralisés (ELK), métriques (Prometheus) et tracing distribué (Jaeger).",
  //   image: "/projects/observability.jpg",
  //   technologies: [
  //     "Elasticsearch",
  //     "Logstash",
  //     "Kibana",
  //     "Jaeger",
  //     "OpenTelemetry",
  //   ],
  //   link: "https://github.com/AristideWafo/observability-stack",
  // },
];

export const featuredProjects = projects.filter((project) => project.featured);
