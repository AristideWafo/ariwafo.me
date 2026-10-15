import type { Metadata } from "next";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import ExperienceCard from "@/components/experience/ExperienceCard";
import { CareerTimeline } from "@/components/experience/CareerTimeline";
import { work } from "@/lib/content/experience";
import { talks } from "@/lib/content/speaking";
import { siteProfile } from "@/lib/content/site";
import { buildMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = buildMetadata({
  title: "Experience",
  description:
    "Observability at Société Générale, freelance DevOps for Genuka and Moabi Voyages, plus backend work at Astree Software and SCI2M.",
  path: "/experiences",
});

const formatTalkDate = (date: string) => {
  const [year, month] = date.split("-");
  return new Date(Number(year), Number(month) - 1).toLocaleDateString("en-GB", {
    month: "long",
    year: "numeric",
  });
};

export default function ExperiencesPage() {
  return (
    <>
      <Section
        as="h1"
        label="FIG_020 · History"
        title="Experience"
        intro="Where I have worked, and what actually changed while I was there."
        divider={false}
      >
        <Button href={siteProfile.resumePath} download variant="primary">
          Download CV ↓
        </Button>

        <div className="mt-10">
          <CareerTimeline items={work} />
        </div>

        <div className="mt-10 border border-border px-5 sm:px-8">
          <ExperienceCard items={work} numbered />
        </div>
      </Section>

      <Section
        label="FIG_021 · Speaking"
        title="On stage"
        intro="Talks given to engineering and student communities."
      >
        <ul className="grid gap-px border border-border bg-border">
          {talks.map((talk) => (
            <li key={talk.id} className="bg-background p-6">
              <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                <span className="label-accent">{talk.event}</span>
                <span className="label">
                  {formatTalkDate(talk.date)}
                  {talk.language && ` · ${talk.language}`}
                </span>
              </div>

              <h3 className="mt-4 font-mono text-base font-semibold leading-snug tracking-tight sm:text-lg">
                {talk.title}
              </h3>

              <p className="mt-3 max-w-prose leading-relaxed text-muted-foreground">
                {talk.description}
              </p>

              {talk.url && (
                <a
                  href={talk.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-5 inline-block font-mono text-xs uppercase tracking-[0.14em] text-primary hover:underline"
                >
                  Talk materials ↗
                </a>
              )}
            </li>
          ))}
        </ul>
      </Section>
    </>
  );
}
