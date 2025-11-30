"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import {
  ExternalArticle,
  ExternalArticleMetadata,
} from "@/src/lib/content/articles/data";

interface ExternalArticleCardProps {
  article: ExternalArticle;
}

export function ExternalArticleCard({ article }: ExternalArticleCardProps) {
  const [metadata, setMetadata] = useState<ExternalArticleMetadata | null>(
    null
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchMetadata = async () => {
      try {
        setLoading(true);
        setError(false);

        // Appel réel à l'API pour récupérer les métadonnées
        const response = await fetch(
          `/api/metadata?url=${encodeURIComponent(article.url)}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
            // Timeout de 15 secondes
            signal: AbortSignal.timeout(15000),
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }

        const fetchedMetadata = await response.json();

        // Vérifier que les données sont valides
        if (!fetchedMetadata || !fetchedMetadata.title) {
          throw new Error("Invalid metadata received");
        }

        setMetadata(fetchedMetadata);
      } catch (error) {
        console.error("Error fetching metadata for:", article.url, error);

        // Ne pas marquer comme erreur si c'est juste un timeout ou une erreur réseau
        // L'API retourne déjà un fallback en cas d'erreur
        if (error instanceof Error && error.name === "AbortError") {
          console.warn("Metadata fetch timeout for:", article.url);
        }

        // Fallback avec des métadonnées basiques
        setMetadata({
          title: `Article sur ${article.platform}`,
          description: `Cliquez pour lire cet article publié sur ${article.platform}.`,
          image: "",
          url: article.url,
          platform: article.platform,
        });

        // Ne marquer comme erreur que si c'est vraiment une erreur critique
        setError(false); // L'API gère déjà les fallbacks
      } finally {
        setLoading(false);
      }
    };

    // Délai avant de commencer le fetch pour éviter trop de requêtes simultanées
    const timeoutId = setTimeout(fetchMetadata, Math.random() * 1000);

    return () => clearTimeout(timeoutId);
  }, [article.url, article.platform]);

  const getPlatformColor = (platform: string) => {
    switch (platform.toLowerCase()) {
      case "medium":
        return "bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800 text-green-600 dark:text-green-400";
      case "dev.to":
        return "bg-purple-50 dark:bg-purple-900/20 border-purple-200 dark:border-purple-800 text-purple-600 dark:text-purple-400";
      case "linkedin":
        return "bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800 text-blue-600 dark:text-blue-400";
      case "hashnode":
        return "bg-indigo-50 dark:bg-indigo-900/20 border-indigo-200 dark:border-indigo-800 text-indigo-600 dark:text-indigo-400";
      case "substack":
        return "bg-orange-50 dark:bg-orange-900/20 border-orange-200 dark:border-orange-800 text-orange-600 dark:text-orange-400";
      default:
        return "bg-gray-50 dark:bg-gray-900/20 border-gray-200 dark:border-gray-800 text-gray-600 dark:text-gray-400";
    }
  };

  if (loading) {
    return (
      <Card className="group transition-all duration-300">
        <div className="h-full flex flex-col space-y-4 animate-pulse">
          <div className="aspect-[16/9] bg-muted rounded-lg"></div>
          <div className="flex-1 space-y-3">
            <div className="h-6 bg-muted rounded w-3/4"></div>
            <div className="h-4 bg-muted rounded w-full"></div>
            <div className="h-4 bg-muted rounded w-2/3"></div>
            <div className="text-xs text-muted-foreground">
              Récupération des métadonnées...
            </div>
          </div>
        </div>
      </Card>
    );
  }

  if (error || !metadata) {
    return (
      <Card className="group transition-all duration-300">
        <div className="h-full flex flex-col items-center justify-center space-y-4 text-center p-6">
          <div className="text-2xl">⚠️</div>
          <p className="text-muted-foreground text-sm">
            Impossible de récupérer les métadonnées
          </p>
          <Link
            href={article.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 dark:text-blue-400 hover:underline text-sm"
          >
            Voir l&apos;article original →
          </Link>
        </div>
      </Card>
    );
  }

  return (
    <Card className="group transition-all duration-300 hover:shadow-lg">
      <div className="h-full flex flex-col space-y-4">
        <div className="relative aspect-[16/9] overflow-hidden rounded-lg bg-gradient-to-br from-blue-500/20 to-purple-600/20 flex items-center justify-center">
          {metadata.image ? (
            <div className="relative w-full h-full">
              <Image
                src={metadata.image}
                alt={metadata.title}
                fill
                className="object-cover"
                onError={(e) => {
                  // Si l'image échoue, masquer l'élément image et afficher le fallback
                  const target = e.target as HTMLImageElement;
                  const parent = target.parentElement;
                  if (parent) {
                    parent.innerHTML = `
                      <div class="text-center space-y-2 w-full h-full flex flex-col items-center justify-center">
                        <div class="text-4xl">📄</div>
                        <p class="text-sm font-medium text-foreground/80 px-4">
                          ${metadata.platform}
                        </p>
                      </div>
                    `;
                  }
                }}
                // Ajouter des props pour une meilleure gestion
                placeholder="blur"
                blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R+Rq5TaUeLvjVpjhfvO/8AAVz89n6jl9/k38/a5/3+ifjQ"
              />
            </div>
          ) : (
            <div className="text-center space-y-2">
              <div className="text-4xl">📄</div>
              <p className="text-sm font-medium text-foreground/80 px-4">
                {metadata.platform}
              </p>
            </div>
          )}
        </div>

        {/* Article Content */}
        <div className="flex-1 flex flex-col space-y-3">
          {/* Header with title and platform badge */}
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-semibold text-lg group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2">
              {metadata.title}
            </h3>
            <Badge
              variant="outline"
              className={`text-xs shrink-0 ${getPlatformColor(
                metadata.platform
              )}`}
            >
              {metadata.platform}
            </Badge>
          </div>

          {/* Article description */}
          <p className="text-muted-foreground text-sm leading-relaxed line-clamp-3 flex-1">
            {article.description || metadata.description}
          </p>

          {/* External link button - Always at bottom */}
          <div className="mt-auto pt-2">
            <Link
              href={metadata.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-medium text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors group"
            >
              <span>Lire sur {metadata.platform}</span>
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
            </Link>
          </div>
        </div>
      </div>
    </Card>
  );
}
