import React from "react";
import { Section } from "@/components/ui/Section";

const pillars = [
  {
    n: "01",
    title: "Infrastructure as Code",
    body: "Terraform modules that provision, verify and tear themselves down. Environments rebuilt from a commit, not from memory — no drift, no snowflake servers, no undocumented console clicks.",
  },
  {
    n: "02",
    title: "Delivery pipelines",
    body: "Build once, promote the same artifact. GitLab and GitHub Actions pipelines with automated build, test and deploy stages — the work that moved one team from weekly releases to daily ones.",
  },
  {
    n: "03",
    title: "Observability",
    body: "Prometheus, Grafana and the ELK stack wired across Kubernetes, Docker and EC2, with an SLI/SLO framework agreed with product teams so alerts mean something and MTTR actually falls.",
  },
];

export function PillarsSection() {
  return (
    <Section
      label="FIG_002 · How I work"
      title="Three things I get paid for"
      intro="Not a tool list. The three loops that decide whether a team ships safely or spends its week firefighting."
    >
      <div className="grid gap-px border border-border bg-border md:grid-cols-3">
        {pillars.map((pillar) => (
          <article key={pillar.n} className="bg-background p-6">
            <p className="label-accent">{pillar.n}</p>
            <h3 className="mt-3 font-mono text-base font-semibold uppercase tracking-[0.06em]">
              {pillar.title}
            </h3>
            <p className="mt-3 leading-relaxed text-muted-foreground">
              {pillar.body}
            </p>
          </article>
        ))}
      </div>
    </Section>
  );
}
