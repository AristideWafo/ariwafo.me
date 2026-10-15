import React from "react";
import Link from "next/link";
import { Section } from "@/components/ui/Section";
import { Kpi } from "@/components/ui/Kpi";
import ExperienceCard from "@/components/experience/ExperienceCard";
import { work } from "@/lib/content/experience";
import { projects } from "@/lib/content/projects/data";
import { externalArticles } from "@/lib/content/articles/data";

/** Years since the first role, so the figure never goes stale in the copy. */
function yearsSince(earliest: string) {
  const [year, month] = earliest.split("-").map(Number);
  const months =
    (new Date().getFullYear() - year) * 12 + (new Date().getMonth() + 1 - month);
  return Math.max(1, Math.floor(months / 12));
}

export function ProofsSection() {
  const earliest = work.map((w) => w.start).sort()[0];

  const kpis = [
    {
      value: `${yearsSince(earliest)}+`,
      label: "Years in the field",
      note: "Backend, then cloud, then the delivery and observability side of it.",
    },
    {
      value: work.length,
      label: "Engineering teams",
      note: "Banking, industrial software, humanitarian, consulting.",
    },
    {
      value: projects.length,
      label: "Public projects",
      note: "Terraform, pipelines and teardown scripts you can read on GitHub.",
    },
    {
      value: externalArticles.length,
      label: "Articles published",
      note: "Mostly on Medium, on CI/CD, DORA metrics and AWS security.",
    },
  ];

  return (
    <Section
      label="FIG_003 · Track record"
      title="Receipts"
      intro="Numbers that come from the rest of this site, not from a slide."
    >
      <div className="grid gap-8 border border-border p-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
        {kpis.map((kpi) => (
          <Kpi key={kpi.label} {...kpi} />
        ))}
      </div>

      <div className="mt-10 border border-border">
        <div className="flex items-baseline justify-between gap-4 border-b border-border bg-surface/60 px-5 py-3">
          <span className="label">Most recent</span>
          <Link
            href="/experiences"
            className="font-mono text-[11px] uppercase tracking-[0.14em] text-primary hover:underline"
          >
            All experience ↗
          </Link>
        </div>
        <div className="p-3 sm:p-5">
          <ExperienceCard items={work.slice(0, 1)} />
        </div>
      </div>
    </Section>
  );
}
