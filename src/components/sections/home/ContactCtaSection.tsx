import React from "react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { siteProfile } from "@/lib/content/site";

export function ContactCtaSection() {
  return (
    <section className="border-t border-border py-14 md:py-20">
      <Container>
        <div className="border-l-2 border-primary bg-accent/60 p-6 md:p-10">
          <div className="grid gap-8 md:grid-cols-[1.4fr_1fr] md:items-center md:gap-12">
            <div>
              <h2 className="text-2xl font-semibold leading-tight sm:text-3xl">
                Shipping slower than you&apos;d like?
              </h2>
              <p className="mt-3 max-w-prose leading-relaxed text-muted-foreground">
                I help teams get their delivery and observability in order:
                Terraform the infrastructure, automate the pipeline, make the
                alerts mean something. Tell me where it hurts.
              </p>
            </div>

            <div className="space-y-3">
              <Button href="/contact" variant="secondary" size="lg" className="w-full">
                Start a conversation
              </Button>
              <Button
                href={`mailto:${siteProfile.email}`}
                variant="outline"
                size="lg"
                className="w-full"
              >
                {siteProfile.email}
              </Button>
              <p className="label">{siteProfile.availability}</p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
