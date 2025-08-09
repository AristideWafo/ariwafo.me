import React from 'react';
import { Section } from '@/components/ui/Section';
import { Button } from '@/components/ui/Button';

export function HeroSection() {
  return (
    <Section className="pt-20 md:pt-28">
      <div className="space-y-6 max-w-2xl">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight">Cloud & DevOps Engineer (placeholder)</h1>
        <p className="text-muted-foreground text-lg">Helping teams ship reliable cloud infrastructure with IaC, CI/CD and observability. All content on this page is placeholder.</p>
        <div className="flex flex-wrap gap-4">
          <Button href="/contact" variant="primary">Contact</Button>
          <Button href="/cases" variant="secondary">Case Studies</Button>
        </div>
      </div>
    </Section>
  );
}
