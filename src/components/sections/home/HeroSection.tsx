import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { CopyBlock } from "@/components/ui/CopyBlock";
import { Plate } from "@/components/ui/Plate";
import { DeliveryCurve } from "./DeliveryCurve";
import { siteProfile, certifications } from "@/lib/content/site";

export function HeroSection() {
  return (
    <section className="pb-16 pt-10 md:pb-24 md:pt-14">
      <Container>
        {/* Printed-plate masthead: edition on the left, licence on the right. */}
        <div className="mb-10 flex flex-wrap items-baseline justify-between gap-3 md:mb-14">
          <p className="label">
            FIG_000 · Portfolio v2 · {new Date().getFullYear()}
          </p>
          <p className="label-accent">{siteProfile.location} · Available</p>
        </div>

        <div className="grid gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
          {/* ── Left: identity ───────────────────────────────────────── */}
          <div>
            <h1 className="display text-[2.75rem] leading-[0.95] text-primary sm:text-6xl lg:text-7xl">
              Aristide
              <br />
              Wafo
            </h1>

            <p className="mt-8 max-w-prose text-lg leading-relaxed sm:text-xl">
              Cloud &amp; DevOps engineer. {siteProfile.tagline}
            </p>

            <p className="mt-4 max-w-prose italic leading-relaxed text-muted-foreground">
              Observability at Société Générale. AWS &amp; Terraform certified.
              Based in {siteProfile.location}.
            </p>

            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              <Button href="/projects" variant="primary" size="lg">
                See the work
              </Button>
              <Button href="/contact" variant="secondary" size="lg">
                Start a conversation
              </Button>
              <Button
                href={`https://github.com/${siteProfile.githubUser}`}
                target="_blank"
                rel="noopener noreferrer"
                variant="outline"
                size="lg"
              >
                GitHub ↗
              </Button>
              <Button
                href={siteProfile.socials.find((s) => s.label === "LinkedIn")!.href}
                target="_blank"
                rel="noopener noreferrer"
                variant="outline"
                size="lg"
              >
                LinkedIn ↗
              </Button>
              <Button
                href={siteProfile.resumePath}
                download
                variant="outline"
                size="lg"
                className="sm:col-span-2"
              >
                Download CV ↓
              </Button>
            </div>

            <CopyBlock
              className="mt-8"
              label="Run my infrastructure yourself"
              command={`git clone https://github.com/${siteProfile.githubUser}/bastion-host.git`}
              hint="terraform apply provisions, tests and tears down the whole stack."
            />

            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              Every project below is public: read the Terraform, the pipelines
              and the teardown scripts before you read my CV.
            </p>
          </div>

          {/* ── Right: status card + figure plate ────────────────────── */}
          <div className="space-y-10">
            <div className="border-l-2 border-primary border-y border-r border-y-border border-r-border py-5 pl-5 pr-5">
              <div className="mb-4 flex items-baseline justify-between gap-4">
                <span className="label">Currently</span>
                <span className="label-accent">2025 — now</span>
              </div>
              <div className="flex items-start gap-4">
                <div className="flex flex-wrap gap-2">
                  {certifications.map((cert) => (
                    <a
                      key={cert.code}
                      href={cert.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${cert.label} — ${cert.issuer}`}
                      className="block border border-border transition-colors hover:border-primary"
                    >
                      <Image
                        src={cert.image}
                        alt={`${cert.label} badge`}
                        width={48}
                        height={48}
                        className="h-12 w-12 object-contain"
                      />
                    </a>
                  ))}
                </div>
                <p className="font-mono text-sm leading-relaxed">
                  Observability Engineer
                  <br />
                  <span className="text-muted-foreground">Société Générale</span>
                </p>
              </div>
              <hr className="my-4 border-dashed border-border" />
              <p className="italic leading-relaxed text-muted-foreground">
                SLI/SLO frameworks and an AI-assisted SRE agent, across 50+
                microservices on Azure Kubernetes Service.
              </p>
              <Link
                href="/experiences"
                className="mt-3 inline-block font-mono text-xs uppercase tracking-[0.14em] text-primary hover:underline"
              >
                Full history ↗
              </Link>
            </div>

            <Plate
              figure="FIG_001 · Delivery frequency"
              note="deploys vs time"
              caption={
                <>
                  Plate 1 of 1. Automated pipelines compound.
                  <br />
                  Manual releases plateau.
                </>
              }
            >
              <DeliveryCurve />
            </Plate>
          </div>
        </div>
      </Container>
    </section>
  );
}
