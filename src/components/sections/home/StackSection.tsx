import React from 'react';
import { Section } from '@/components/ui/Section';

const tools = ['AWS','Terraform','GitHub Actions','Docker','CloudWatch'];

export function StackSection() {
  return (
    <Section>
      <div className="space-y-4">
        <h2 className="text-xl font-semibold tracking-tight">Core Stack (placeholder)</h2>
        <ul className="flex flex-wrap gap-3 text-sm text-muted-foreground">
          {tools.map(t => <li key={t} className="rounded border border-border/50 px-2 py-1">{t}</li>)}
        </ul>
      </div>
    </Section>
  );
}
