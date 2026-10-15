import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { AboutIntro } from "@/components/sections/about/AboutIntro";
import { PortraitCard } from "@/components/sections/about/PortraitCard";
import { SocialLinks } from "@/components/sections/about/SocialLinks";
import { CertificationsSection } from "@/components/sections/home/CertificationsSection";
import { buildMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = buildMetadata({
  title: "About",
  description:
    "Backend engineer turned cloud and DevOps engineer. Observability at Société Générale, AWS and Terraform certified, based in Paris.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <>
      <section className="py-14 md:py-20">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[1.3fr_0.7fr] lg:gap-16">
            <AboutIntro />
            <aside className="space-y-10" aria-label="Portrait and links">
              <PortraitCard />
              <SocialLinks />
            </aside>
          </div>
        </Container>
      </section>

      <CertificationsSection />
    </>
  );
}
