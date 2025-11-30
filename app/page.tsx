// import Image from "next/image";

import { Metadata } from "next";
import { buildMetadata } from "@/lib/seo/metadata";
import { HeroSection } from "@/components/sections/home/HeroSection";
import { PillarsSection } from "@/components/sections/home/PillarsSection";
import { StackSection } from "@/components/sections/home/StackSection";
import { ContactCtaSection } from "@/components/sections/home/ContactCtaSection";
import { Section } from "@/components/ui/Section";
import { Card } from "@/components/ui/Card";
import { Tag } from "@/components/ui/Tag";
// import { getLatestArticle } from "@/src/lib/content/articles/data";
import { ProofsSection } from "@/components/sections/home/ProofsSection";

export const metadata: Metadata = buildMetadata({
  title: "Home",
  description: "My home page – cloud & DevOps engineer portfolio.",
  path: "/",
});

// Placeholder data
const caseTeasers = [1, 2, 3].map((i) => ({
  id: i,
  title: `Case Study ${i} (placeholder)`,
  tag: "Cloud",
  excerpt: "Short placeholder summary of impact.",
}));

// const latestArticle = getLatestArticle();

export default function HomePage() {
  return (
    <main>
      {process.env.NEXT_PUBLIC_SHOW_HERO === "true" && <HeroSection />}
      {process.env.NEXT_PUBLIC_SHOW_PROOFS === "true" && <ProofsSection />}
      {process.env.NEXT_PUBLIC_SHOW_PILLARS === "true" && <PillarsSection />}

      {process.env.NEXT_PUBLIC_SHOW_CASE_STUDIES === "true" && (
        <Section>
          <div className="space-y-6">
            <h2 className="text-xl font-semibold tracking-tight">
              Featured Case Studies (placeholder)
            </h2>
            <div className="grid gap-6 md:grid-cols-3">
              {caseTeasers.map((c) => (
                <Card key={c.id} className="p-4 space-y-3">
                  <Tag>{c.tag}</Tag>
                  <h3 className="font-semibold tracking-tight">{c.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {c.excerpt}
                  </p>
                </Card>
              ))}
            </div>
          </div>
        </Section>
      )}

      {process.env.NEXT_PUBLIC_SHOW_STACK === "true" && <StackSection />}

      {/* {process.env.NEXT_PUBLIC_SHOW_LATEST_CONTENT === "true" && (
        <Section>
          <div className="space-y-6">
            <h2 className="text-xl font-semibold tracking-tight">
              Latest Content
            </h2>
            <div className="grid gap-6 md:grid-cols-2">
              <Card className="p-4 space-y-2">
                <Tag>{latestArticle?.tags[0] || "Article"}</Tag>
                <h3 className="font-medium">{latestArticle?.title}</h3>
                <p className="text-sm text-muted-foreground">
                  {latestArticle?.description}
                </p>
              </Card>
            </div>
          </div>
        </Section>
      )} */}

      {process.env.NEXT_PUBLIC_SHOW_CONTACT === "true" && <ContactCtaSection />}
    </main>
  );
}
