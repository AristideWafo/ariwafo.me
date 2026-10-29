import { ImageResponse } from "next/og";
import { formatDate } from "@/lib/content/articles/data";
import { getNativeArticles } from "@/lib/content/articles/native";
import { siteProfile } from "@/lib/content/site";

// Plain route handler, not an opengraph-image file: that convention crashes Turbopack dev on 15.1
// ("imageModule is not a function").
const size = { width: 1200, height: 630 };

// Light-theme tokens from app/globals.css; ImageResponse can't read CSS variables.
const BG = "#fcfcfa";
const INK = "#16171b";
const MUTED = "#6b6a63";
const NOTES = "#de1777";
const DOT = "#e5e3dc";

// shortcut: uses the default ImageResponse font, not JetBrains Mono; load the .ttf via fetch if the preview needs the brand font.
export async function GET(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const article = (await getNativeArticles()).find((a) => a.id === id);
  const title = article?.title ?? siteProfile.name;
  const label = article
    ? `NOTES · DOC_${String(article.doc).padStart(3, "0")} · ${formatDate(article.date)} · ${article.readingTime} MIN READ`
    : "NOTES";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          background: BG,
          backgroundImage: `radial-gradient(${DOT} 2px, transparent 2px)`,
          backgroundSize: "28px 28px",
          color: INK,
          borderTop: `12px solid ${NOTES}`,
        }}
      >
        <div style={{ display: "flex", fontSize: 24, letterSpacing: 3, color: NOTES }}>{label}</div>

        <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
          <div style={{ display: "flex", fontSize: title.length > 60 ? 56 : 68, fontWeight: 700, lineHeight: 1.1 }}>
            {title}
          </div>
          {article && article.tags.length > 0 && (
            <div style={{ display: "flex", gap: 14 }}>
              {article.tags.slice(0, 4).map((tag) => (
                <div
                  key={tag}
                  style={{ display: "flex", border: `2px solid ${DOT}`, padding: "8px 16px", fontSize: 22, color: MUTED }}
                >
                  {tag.toUpperCase()}
                </div>
              ))}
            </div>
          )}
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 24, color: MUTED }}>
          <span>{siteProfile.name} · Cloud & DevOps Engineer</span>
          <span>{siteProfile.url.replace(/^https?:\/\//, "")}</span>
        </div>
      </div>
    ),
    size
  );
}
