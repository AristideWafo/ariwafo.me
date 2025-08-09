import React from "react";
import { Section } from "@/components/ui/Section";
import { Kpi } from "@/components/ui/Kpi";
import Link from "next/link";
import ExperienceCard from "@/components/experience/ExperienceCard";
import { work } from "@/lib/content/experience";

const kpis = [
  {
    value: "1",
    label: "Years of experience",
    note: "Including apprenticeship and professional projects",
  },
  {
    value: "4",
    label: "Projects delivered",
    note: "Cloud, DevOps, and software development projects",
  },
];

const certs = [
  {
    code: "AWS SAA-C03",
    label: "AWS Solutions Architect Associate",
    url: "https://www.credly.com/badges/52141aa9-dfb7-41d5-9061-e2eb9391d37a/public_url",
  },
  {
    code: "Terraform Associate",
    label: "HashiCorp Terraform Associate",
    url: "https://www.credly.com/badges/d039aa35-e434-44a4-9904-f0eb32ec4a41/public_url",
  },
];

export function ProofsSection() {
  return (
    <Section>
      <div className="space-y-10 p-6 rounded-lg border border-border/60 shadow-sm">
        <div className="grid gap-6 md:grid-cols-3" aria-label="Key metrics">
          {kpis.map((k) => (
            <Kpi key={k.label} value={k.value} label={k.label} note={k.note} />
          ))}
        </div>
        <div>
          <ExperienceCard items={work} />
        </div>
        <div
          className="space-y-4 p-4 rounded-md border border-border/40"
          aria-label="Certifications"
        >
          <h2 className="text-sm font-medium tracking-wide uppercase text-muted-foreground">
            Certifications
          </h2>
          <ul className="flex flex-wrap gap-3 text-sm">
            {certs.map((c) => (
              <li key={c.code}>
                <a
                  href={c.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block rounded-md border border-border/60 px-3 py-1.5 bg-muted/30 transition-colors duration-200 hover:bg-sky-100/30 hover:border-sky-200"
                >
                  <span className="font-medium">{c.code}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div className="text-sm p-4 rounded-md border border-border/40">
          <p>
            Highlight case:{" "}
            <Link
              className="underline underline-offset-4 hover:text-foreground"
              href="/cases"
            >
              View a representative case study
            </Link>
          </p>
        </div>
      </div>
    </Section>
  );
}
