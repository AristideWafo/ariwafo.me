import { ImageResponse } from "next/og";
import { getNativeArticles } from "@/lib/content/articles/native";
import { work } from "@/lib/content/experience";
import { siteProfile } from "@/lib/content/site";

// Plain route handler (same pattern as app/articles/[id]/og/route.tsx) to avoid
// the Next 15.1 Turbopack opengraph-image convention bug.
const size = { width: 1200, height: 630 };

// Light-theme tokens from app/globals.css ("Paper-and-ink" palette)
const BG = "#fcfcfa";
const SURFACE = "#f3f2ec";
const INK = "#16171b";
const MUTED = "#6b6a63";
const PRIMARY = "#2f45f5";
const ACCENT_BG = "#eaedfe";
const BORDER = "#dad7c8";
const DOT = "#e5e3dc";

const CAPABILITY_PILLS = [
  "AGENTIC AI & MCP",
  "OBSERVABILITY & SLOs",
  "CLOUD & TERRAFORM",
  "FORWARD DEPLOYED ENG.",
];

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const pageTitle = searchParams.get("title");
  const pageDesc = searchParams.get("description");
  const fig = searchParams.get("fig") ?? "FIG_000 · PORTFOLIO";

  const articles = await getNativeArticles().catch(() => []);
  const latestArticle = articles[0];
  const year = new Date().getFullYear();
  const domain = siteProfile.url.replace(/^https?:\/\//, "").replace(/\/$/, "");

  const isSubpage = Boolean(pageTitle && pageTitle !== "Home");

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "52px 64px",
          background: BG,
          backgroundImage: `radial-gradient(${DOT} 2px, transparent 2px)`,
          backgroundSize: "24px 24px",
          color: INK,
          borderTop: `12px solid ${PRIMARY}`,
        }}
      >
        {/* Top Masthead */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              fontSize: 18,
              letterSpacing: 3,
              color: MUTED,
            }}
          >
            <span>{fig.toUpperCase()}</span>
            <span>·</span>
            <span>{String(year)}</span>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              fontSize: 18,
              letterSpacing: 2.5,
              color: PRIMARY,
              fontWeight: 600,
            }}
          >
            <div
              style={{
                width: 10,
                height: 10,
                borderRadius: 999,
                background: PRIMARY,
                display: "flex",
              }}
            />
            <span>{siteProfile.location.toUpperCase()} · PRODUCTION AI &amp; CLOUD</span>
          </div>
        </div>

        {/* Main Body */}
        {isSubpage ? (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              gap: 24,
              marginTop: "auto",
              marginBottom: "auto",
            }}
          >
            <div
              style={{
                display: "flex",
                fontSize: 22,
                letterSpacing: 2.5,
                color: PRIMARY,
                fontWeight: 700,
              }}
            >
              {siteProfile.name.toUpperCase()} — CLOUD, OBSERVABILITY &amp; AGENTIC AI
            </div>
            <div
              style={{
                display: "flex",
                fontSize: (pageTitle?.length ?? 0) > 36 ? 56 : 68,
                fontWeight: 800,
                lineHeight: 1.05,
                color: INK,
              }}
            >
              {pageTitle}
            </div>
            <div
              style={{
                display: "flex",
                fontSize: 26,
                lineHeight: 1.4,
                color: MUTED,
                maxWidth: 960,
              }}
            >
              {pageDesc ?? siteProfile.description}
            </div>
            <div style={{ display: "flex", gap: 12, marginTop: 8 }}>
              {CAPABILITY_PILLS.map((pill) => (
                <div
                  key={pill}
                  style={{
                    display: "flex",
                    border: `2px solid ${BORDER}`,
                    background: SURFACE,
                    padding: "7px 14px",
                    fontSize: 16,
                    letterSpacing: 1.5,
                    color: INK,
                    fontWeight: 600,
                  }}
                >
                  {pill}
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "stretch",
              gap: 44,
              width: "100%",
            }}
          >
            {/* Left column: Identity & FDE / Agentic AI + Cloud bridge */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                flex: 1.18,
              }}
            >
              <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                <div
                  style={{
                    display: "flex",
                    fontSize: 66,
                    fontWeight: 800,
                    letterSpacing: 1,
                    lineHeight: 0.98,
                    color: PRIMARY,
                  }}
                >
                  ARISTIDE WAFO
                </div>

                <div
                  style={{
                    display: "flex",
                    fontSize: 26,
                    fontWeight: 700,
                    color: INK,
                    lineHeight: 1.25,
                  }}
                >
                  Cloud, Observability &amp; Agentic AI in Production
                </div>

                <div
                  style={{
                    display: "flex",
                    fontSize: 21,
                    lineHeight: 1.42,
                    color: MUTED,
                    marginTop: 4,
                  }}
                >
                  From Terraform &amp; SLI/SLOs to MCP-powered SRE agents — building
                  and deploying reliable systems where engineering meets production.
                </div>
              </div>

              {/* Capability Tags */}
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: 10,
                  marginTop: 24,
                }}
              >
                {CAPABILITY_PILLS.map((pill, idx) => (
                  <div
                    key={pill}
                    style={{
                      display: "flex",
                      border: `2px solid ${idx === 0 ? PRIMARY : BORDER}`,
                      background: idx === 0 ? ACCENT_BG : SURFACE,
                      padding: "7px 13px",
                      fontSize: 15,
                      letterSpacing: 1.4,
                      color: idx === 0 ? PRIMARY : INK,
                      fontWeight: 700,
                    }}
                  >
                    {pill}
                  </div>
                ))}
              </div>
            </div>

            {/* Right column: Technical Plate (Live production proofs) */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                flex: 0.88,
                border: `2px solid ${BORDER}`,
                borderLeft: `5px solid ${PRIMARY}`,
                background: SURFACE,
                padding: "24px 26px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  fontSize: 15,
                  letterSpacing: 2,
                  color: MUTED,
                }}
              >
                <span>IN PRODUCTION</span>
                <span style={{ color: PRIMARY, fontWeight: 700 }}>SOCIÉTÉ GÉNÉRALE</span>
              </div>

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 14,
                  marginTop: 12,
                  marginBottom: 12,
                }}
              >
                <div style={{ display: "flex", flexDirection: "column", gap: 3 }}>
                  <div
                    style={{
                      display: "flex",
                      fontSize: 18,
                      fontWeight: 700,
                      color: INK,
                    }}
                  >
                    01 · AI-Assisted SRE Agent
                  </div>
                  <div style={{ display: "flex", fontSize: 16, color: MUTED }}>
                    MCP · Qwen3 · FastAPI · Automated RCA &amp; triage
                  </div>
                </div>

                <div
                  style={{
                    display: "flex",
                    height: 1,
                    background: BORDER,
                    width: "100%",
                  }}
                />

                <div style={{ display: "flex", flexDirection: "column", gap: 3 }}>
                  <div
                    style={{
                      display: "flex",
                      fontSize: 18,
                      fontWeight: 700,
                      color: INK,
                    }}
                  >
                    02 · Observability &amp; Cloud at Scale
                  </div>
                  <div style={{ display: "flex", fontSize: 16, color: MUTED }}>
                    50+ microservices on AKS · SLI/SLO (-40% MTTD)
                  </div>
                </div>

                <div
                  style={{
                    display: "flex",
                    height: 1,
                    background: BORDER,
                    width: "100%",
                  }}
                />

                <div style={{ display: "flex", flexDirection: "column", gap: 3 }}>
                  <div
                    style={{
                      display: "flex",
                      fontSize: 18,
                      fontWeight: 700,
                      color: INK,
                    }}
                  >
                    03 · 3× Certified &amp; Field-Tested
                  </div>
                  <div style={{ display: "flex", fontSize: 16, color: MUTED }}>
                    AWS SAA-C03 · AWS DVA-C02 · Terraform · {work.length} Teams
                  </div>
                </div>
              </div>

              <div
                style={{
                  display: "flex",
                  fontSize: 14,
                  letterSpacing: 1.2,
                  color: PRIMARY,
                  fontWeight: 600,
                }}
              >
                {latestArticle
                  ? `LATEST DOC_${String(latestArticle.doc).padStart(3, "0")} · ${
                      latestArticle.title.length > 38
                        ? `${latestArticle.title.slice(0, 38)}…`
                        : latestArticle.title
                    }`
                  : "OPEN SOURCE TERRAFORM, PIPELINES & AGENTS"}
              </div>
            </div>
          </div>
        )}

        {/* Footer */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            paddingTop: 20,
            borderTop: `2px solid ${BORDER}`,
            fontSize: 20,
            color: MUTED,
            width: "100%",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <span style={{ color: INK, fontWeight: 700 }}>{domain}</span>
            <span>·</span>
            <span>github.com/{siteProfile.githubUser}</span>
          </div>

          <div
            style={{
              display: "flex",
              fontSize: 17,
              letterSpacing: 1.5,
              color: MUTED,
            }}
          >
            SHIPPING RELIABLE SYSTEMS &amp; AI TO PRODUCTION
          </div>
        </div>
      </div>
    ),
    size
  );
}
