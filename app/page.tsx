import { Metadata } from "next";
import { buildMetadata } from "@/lib/seo/metadata";
import { HeroSection } from "@/components/sections/home/HeroSection";
import { PillarsSection } from "@/components/sections/home/PillarsSection";
import { ProofsSection } from "@/components/sections/home/ProofsSection";
import { FeaturedProjectsSection } from "@/components/sections/home/FeaturedProjectsSection";
import { LatestWritingSection } from "@/components/sections/home/LatestWritingSection";
import { ContactCtaSection } from "@/components/sections/home/ContactCtaSection";
import { siteProfile } from "@/lib/content/site";

export const metadata: Metadata = buildMetadata({
  title: "Cloud & DevOps Engineer",
  description: siteProfile.description,
  path: "/",
});

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <PillarsSection />
      <ProofsSection />
      <FeaturedProjectsSection />
      <LatestWritingSection />
      <ContactCtaSection />
    </>
  );
}
