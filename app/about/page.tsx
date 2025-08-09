import type { Metadata } from "next";
import { siteProfile } from "@/lib/content/site";
import { AboutIntro } from "../../src/components/sections/about/AboutIntro";
import { PortraitCard } from "../../src/components/sections/about/PortraitCard";
import { SocialLinks } from "../../src/components/sections/about/SocialLinks";

export const metadata: Metadata = {
  title: `À propos — ${siteProfile.name}`,
  description:
    "Placeholder about page: background, role, professional focus, collaboration style, interests. (≤155 chars placeholder)",
};

export default function AboutPage() {
  return (
    <main className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-16">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">
        <div>
          <AboutIntro />
          <div className="mt-12">
          </div>
        </div>
        <aside className="space-y-10" aria-label="Profile media and links">
          <PortraitCard />
          <SocialLinks />
        </aside>
      </div>
    </main>
  );
}
