import { normalizeTags } from "@/lib/tags";
import { MEDIUM_FEED, parseMediumFeed } from "./medium";

export interface InternalArticle {
  id: string;
  title: string;
  excerpt: string;
  image: string;
  content: string;
  date: string;
  readTime: number; // en minutes
  tags: string[];
  featured?: boolean;
}

export interface ExternalArticle {
  id: string;
  title: string;
  url: string;
  /** ISO date; optional for hand-written entries. */
  date?: string;
  description?: string;
  platform: string; // "Medium", "LinkedIn", etc.
  tags: string[];
}

export const formatDate = (dateString: string) =>
  new Date(dateString).toLocaleDateString("en-GB", {
    year: "numeric",
    month: "short",
    day: "2-digit",
  });

export const internalArticles: InternalArticle[] = [
//   {
//     id: "infrastructure-as-code-terraform",
//     title: "Infrastructure as Code avec Terraform : Guide Complet",
//     excerpt:
//       "Découvrez comment automatiser votre infrastructure cloud avec Terraform. Ce guide couvre les bonnes pratiques, la gestion d'état et les modules réutilisables.",
//     image: "/articles/terraform-guide.jpg",
//     content: `
// # Infrastructure as Code avec Terraform : Guide Complet

// L'Infrastructure as Code (IaC) révolutionne la façon dont nous gérons nos environnements cloud. Terraform, développé par HashiCorp, est l'un des outils les plus populaires pour cette approche.

// ## Qu'est-ce que l'Infrastructure as Code ?

// L'IaC permet de définir et gérer l'infrastructure informatique à travers du code, plutôt que par des processus manuels. Cette approche offre plusieurs avantages :

// - **Reproductibilité** : Infrastructure identique à chaque déploiement
// - **Versioning** : Suivi des changements avec Git
// - **Collaboration** : Révisions de code et travail en équipe
// - **Automatisation** : Déploiements automatisés via CI/CD

// ## Terraform : Les Fondamentaux

// Terraform utilise le langage HCL (HashiCorp Configuration Language) pour décrire l'infrastructure. Voici un exemple basique :

// \`\`\`hcl
// resource "aws_instance" "web" {
//   ami           = "ami-0c55b159cbfafe1d0"
//   instance_type = "t3.micro"
  
//   tags = {
//     Name = "WebServer"
//     Environment = "Production"
//   }
// }
// \`\`\`

// ## Bonnes Pratiques

// 1. **Structure modulaire** : Organisez votre code en modules réutilisables
// 2. **Gestion d'état** : Utilisez un backend distant (S3, Terraform Cloud)
// 3. **Variables** : Paramétrez vos configurations
// 4. **Validation** : Implémentez des tests et validations

// ## Conclusion

// Terraform simplifie la gestion d'infrastructure et améliore la fiabilité des déploiements. En suivant les bonnes pratiques, vous pouvez créer une infrastructure robuste et maintenable.
//     `,
//     date: "2024-11-01",
//     readTime: 8,
//     tags: ["Terraform", "IaC", "AWS", "DevOps"],
//     featured: true,
//   }
];

/** Hand-written entries; Medium posts come from the RSS feed. */
const manualArticles: ExternalArticle[] = [
  {
    id: "thales-battle-dev-2025-epitech",
    title: "Thales Battle Dev 2025: our Paris campus answers present",
    url: "https://www.epitech.eu/2025/10/27/thales-battle-dev-2025-notre-campus-parisien-repond-present/",
    date: "2025-10-27",
    platform: "Epitech",
    description: "Analyse et retour d'expérience sur la participation d'Epitech Paris au Thales Battle Dev 2025.",
    tags: ["Competition", "Coding", "Experience"],
  },
  {
    id: "winning-competition",
    title: "Winning the Thales Battle Dev with Epitech Paris",
    url: "https://www.linkedin.com/posts/aristidewafo_epitechparis-thalesbattledev-codingbattle-ugcPost-7386055530428997633-tCQd",
    date: "2025-10-20", // decoded from the LinkedIn post id
    platform: "LinkedIn",
    tags: ["Competition", "Coding", "Experience"],
  },
];

/** Medium + manual entries, newest first (undated last). Never throws. */
export async function getExternalArticles(): Promise<ExternalArticle[]> {
  let medium: ExternalArticle[] = [];
  try {
    const res = await fetch(MEDIUM_FEED, { next: { revalidate: 86400 } });
    if (!res.ok) throw new Error(`Medium RSS ${res.status}`);
    medium = parseMediumFeed(await res.text());
  } catch (error) {
    console.error("Articles: Medium RSS failed, using manual entries only.", error);
  }
  return [...medium, ...manualArticles]
    .map((a) => ({ ...a, tags: normalizeTags(a.tags) }))
    .sort((a, b) => (b.date ?? "").localeCompare(a.date ?? ""));
}

export const featuredInternalArticles = internalArticles.filter(
  (article) => article.featured
);

// Legacy exports for compatibility
export interface ArticleMeta {
  slug: string;
  title: string;
  description: string;
  date: string;
  tags: string[];
  readingTime: string;
  published: boolean;
}

// export const articles: ArticleMeta[] = [
//   {
//     slug: "infrastructure-as-code-terraform",
//     title: "Infrastructure as Code avec Terraform : Guide Complet",
//     description:
//       "Découvrez comment automatiser votre infrastructure cloud avec Terraform.",
//     date: "2024-11-01",
//     tags: ["Terraform", "IaC", "AWS", "DevOps"],
//     readingTime: "8 min",
//     published: true,
//   },
//   {
//     slug: "kubernetes-monitoring-prometheus",
//     title: "Monitoring Kubernetes avec Prometheus et Grafana",
//     description: "Stack de monitoring complète pour vos clusters Kubernetes.",
//     date: "2024-10-28",
//     tags: ["Kubernetes", "Prometheus", "Grafana", "Monitoring"],
//     readingTime: "12 min",
//     published: true,
//   },
//   {
//     slug: "devops-best-practices",
//     title: "DevOps : 10 Bonnes Pratiques Essentielles",
//     description: "Les pratiques DevOps qui transformeront votre workflow.",
//     date: "2024-10-25",
//     tags: ["DevOps", "Best Practices", "Automation", "Culture"],
//     readingTime: "6 min",
//     published: true,
//   },
// ];

// export function getLatestArticle() {
//   return articles
//     .filter((a) => a.published)
//     .sort((a, b) => b.date.localeCompare(a.date))[0];
// }
