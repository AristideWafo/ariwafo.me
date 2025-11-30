import { NextRequest, NextResponse } from "next/server";

interface MetadataResponse {
  title: string;
  description: string;
  image: string;
  url: string;
  platform: string;
}

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const url = searchParams.get("url");

  if (!url) {
    return NextResponse.json(
      { error: "URL parameter is required" },
      { status: 400 }
    );
  }

  try {
    // Fetch de la page web avec timeout
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 secondes

    const response = await fetch(url, {
      headers: {
        "User-Agent": "Mozilla/5.0 (compatible; MetadataBot/1.0)",
        Accept:
          "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
        "Accept-Language": "fr-FR,fr;q=0.8,en-US;q=0.5,en;q=0.3",
        "Accept-Encoding": "gzip, deflate",
        DNT: "1",
        Connection: "keep-alive",
        "Upgrade-Insecure-Requests": "1",
      },
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    const html = await response.text();

    // Extraire les métadonnées avec des regex améliorées
    const getMetaContent = (property: string): string => {
      // OpenGraph tags
      const ogRegex = new RegExp(
        `<meta[^>]*property=["']og:${property}["'][^>]*content=["']([^"']*?)["']`,
        "i"
      );
      const ogMatch = html.match(ogRegex);
      if (ogMatch && ogMatch[1]) return decodeHtmlEntities(ogMatch[1]);

      // Twitter tags
      const twitterRegex = new RegExp(
        `<meta[^>]*name=["']twitter:${property}["'][^>]*content=["']([^"']*?)["']`,
        "i"
      );
      const twitterMatch = html.match(twitterRegex);
      if (twitterMatch && twitterMatch[1])
        return decodeHtmlEntities(twitterMatch[1]);

      // Standard meta tags
      if (property === "title") {
        const titleRegex = /<title[^>]*>([^<]*?)<\/title>/i;
        const titleMatch = html.match(titleRegex);
        if (titleMatch && titleMatch[1])
          return decodeHtmlEntities(titleMatch[1]);
      }

      if (property === "description") {
        const descRegex =
          /<meta[^>]*name=["']description["'][^>]*content=["']([^"']*?)["']/i;
        const descMatch = html.match(descRegex);
        if (descMatch && descMatch[1]) return decodeHtmlEntities(descMatch[1]);
      }

      return "";
    };

    // Fonction pour décoder les entités HTML
    const decodeHtmlEntities = (text: string): string => {
      const entities: { [key: string]: string } = {
        "&amp;": "&",
        "&lt;": "<",
        "&gt;": ">",
        "&quot;": '"',
        "&#39;": "'",
        "&nbsp;": " ",
      };

      return text.replace(/&[#\w]+;/g, (entity) => {
        return entities[entity] || entity;
      });
    };

    const title = getMetaContent("title") || "Article sans titre";
    const description =
      getMetaContent("description") || "Aucune description disponible";
    let image = getMetaContent("image") || "";

    // Si l'image est relative, la rendre absolue
    if (image && !image.startsWith("http")) {
      const urlObj = new URL(url);
      if (image.startsWith("/")) {
        image = `${urlObj.protocol}//${urlObj.host}${image}`;
      } else {
        image = `${urlObj.protocol}//${urlObj.host}/${image}`;
      }
    }

    // Déterminer la plateforme à partir de l'URL
    const getPlatform = (url: string): string => {
      if (url.includes("medium.com")) return "Medium";
      if (url.includes("dev.to")) return "Dev.to";
      if (url.includes("linkedin.com")) return "LinkedIn";
      if (url.includes("hashnode.com")) return "Hashnode";
      if (url.includes("substack.com")) return "Substack";
      if (url.includes("epitech.eu")) return "Epitech";
      if (url.includes("github.com")) return "GitHub";
      if (url.includes("stackoverflow.com")) return "Stack Overflow";
      return "Article";
    };

    const platform = getPlatform(url);

    const metadata: MetadataResponse = {
      title: title.trim(),
      description: description.trim(),
      image: image || "",
      url,
      platform,
    };

    return NextResponse.json(metadata, {
      headers: {
        "Cache-Control": "public, max-age=3600", // Cache 1 heure
      },
    });
  } catch (error) {
    console.error("Error fetching metadata for URL:", url, error);

    // Fallback en cas d'erreur
    const getPlatform = (url: string): string => {
      if (url.includes("medium.com")) return "Medium";
      if (url.includes("dev.to")) return "Dev.to";
      if (url.includes("linkedin.com")) return "LinkedIn";
      if (url.includes("hashnode.com")) return "Hashnode";
      if (url.includes("substack.com")) return "Substack";
      if (url.includes("epitech.eu")) return "Epitech";
      if (url.includes("github.com")) return "GitHub";
      if (url.includes("stackoverflow.com")) return "Stack Overflow";
      return "Article";
    };

    const platform = getPlatform(url);

    const fallbackMetadata: MetadataResponse = {
      title: `Article sur ${platform}`,
      description:
        "Impossible de récupérer la description de cet article. Cliquez pour le lire sur la plateforme originale.",
      image: "",
      url,
      platform,
    };

    return NextResponse.json(fallbackMetadata, {
      headers: {
        "Cache-Control": "public, max-age=300", // Cache 5 minutes pour les erreurs
      },
    });
  }
}
