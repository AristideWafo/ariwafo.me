import type { Metadata } from "next";
import { Section } from "@/components/ui/Section";
import ExperienceCard from "@/components/experience/ExperienceCard";
import { work } from "@/lib/content/experience";

export const metadata: Metadata = {
  title: "Mes Expériences - Aristide WAFO",
  description: "Découvrez mon parcours professionnel et mes expériences en tant qu'ingénieur Cloud & DevOps.",
};

export default function ExperiencesPage() {
  return (
    <main className="min-h-screen">
      {/* Header avec navigation */}
      <Section className="pb-0 md:pb-0">
        {/* <div className="flex items-center gap-4 mb-8">
          <Link 
            href="/"
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors duration-200 group"
          >
            <span className="group-hover:-translate-x-1 transition-transform duration-200">←</span>
            <span>Retour</span>
          </Link>
        </div> */}
        
        <div className="space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
            Mes Expériences
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl">
            Découvrez mon parcours professionnel et les projets sur lesquels j&apos;ai travaillé 
            en tant qu&apos;ingénieur Cloud & DevOps.
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