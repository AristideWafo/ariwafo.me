import type { Metadata } from "next";
import { Section } from "@/components/ui/Section";
import ExperienceCard from "@/components/experience/ExperienceCard";
import { work } from "@/lib/content/experience";

export const metadata: Metadata = {
  title: "My Experiences - Aristide WAFO",
  description:
    "Discover my professional journey and experiences as a Cloud & DevOps Engineer.",
};

export default function ExperiencesPage() {
  return (
    <main className="min-h-screen">
      {/* Header avec navigation */}
      <Section className="pb-0 md:pb-0">
        <div className="space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
            My Experiences
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl">
            Discover my professional journey and the projects I&apos;ve worked
            on as a Cloud & DevOps Engineer.
          </p>
        </div>
      </Section>

      {/* Expériences complètes */}
      <Section className="pb-20">
        <div className="max-w-4xl">
          <ExperienceCard items={work} />
        </div>
      </Section>
    </main>
  );
}
