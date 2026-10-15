import React from "react";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { certifications } from "@/lib/content/site";

export function CertificationsSection() {
  return (
    <section className="border-t border-border py-14 md:py-20">
      <Container>
        <div className="border-l-2 border-primary border-y border-r border-y-border border-r-border bg-surface/40 p-6 md:p-8">
          <div className="grid gap-8 md:grid-cols-[auto_1fr_auto] md:items-center md:gap-10">
            <div className="flex flex-wrap gap-4">
              {certifications.map((cert) => (
                <a
                  key={cert.code}
                  href={cert.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Verify ${cert.label} on Credly`}
                  className="block border border-border bg-background p-2 transition-colors hover:border-primary"
                >
                  <Image
                    src={cert.image}
                    alt={`${cert.label} badge`}
                    width={72}
                    height={72}
                    className="h-16 w-16 object-contain md:h-20 md:w-20"
                  />
                </a>
              ))}
            </div>

            <div>
              <p className="label-accent">Verified credentials</p>
              <h2 className="display mt-3 text-2xl sm:text-3xl">
                Certified, and able to prove it
              </h2>
              <ul className="mt-4 space-y-1">
                {certifications.map((cert) => (
                  <li
                    key={cert.code}
                    className="font-mono text-sm text-muted-foreground"
                  >
                    <span className="text-foreground">{cert.label}</span> ·{" "}
                    {cert.issuer} · {cert.code}
                  </li>
                ))}
              </ul>
            </div>

            <Button
              href={certifications[0].url}
              target="_blank"
              rel="noopener noreferrer"
              variant="primary"
            >
              Verify on Credly ↗
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
