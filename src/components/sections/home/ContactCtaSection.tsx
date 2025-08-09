import React from 'react';
import { Section } from '@/components/ui/Section';
import { Button } from '@/components/ui/Button';

export function ContactCtaSection() {
  return (
    <Section className="pb-24">
      <div className="max-w-2xl space-y-4">
        <h2 className="text-2xl font-semibold tracking-tight">Ready to discuss your cloud reliability? (placeholder)</h2>
        <p className="text-muted-foreground">Get in touch to explore a lightweight audit or a focused implementation sprint. All placeholder copy.</p>
        <Button href="/contact" variant="primary">Start a conversation</Button>
      </div>
    </Section>
  );
}
