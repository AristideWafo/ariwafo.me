import type { Metadata } from "next";
import { Section } from "@/components/ui/Section";
import ExperienceCard from "@/components/experience/ExperienceCard";
import { work } from "@/lib/content/experience";
import { buildMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = buildMetadata({
  title: "Experience",
  description:
    "Observability at Société Générale, backend and DevOps work at Astree Software, Solidarity World and SCI2M.",
  path: "/experiences",
});

export default function ExperiencesPage() {
  return (
    <Section
      as="h1"
      label="FIG_020 · History"
      title="Experience"
      intro="Where I have worked, and what actually changed while I was there."
      divider={false}
    >
      <div className="border border-border px-5 sm:px-8">
        <ExperienceCard items={work} numbered />
      </div>
    </Section>
  );
}
