import React from 'react';
import { Section } from '@/components/ui/Section';
import { Kpi } from '@/components/ui/Kpi';
import Link from 'next/link';

const kpis = [
  { value: '5+', label: 'Years experience', note: 'placeholder' },
  { value: '20+', label: 'Projects delivered', note: 'placeholder' }
];

const certs = [
  { code: 'AWS SAA-C03', label: 'AWS Solutions Architect Associate' },
  { code: 'Terraform Associate', label: 'HashiCorp Terraform Associate' }
];

export function ProofsSection() {
  return (
    <Section>
      <div className="space-y-10">
        <div className="grid gap-6 md:grid-cols-3" aria-label="Key metrics">
          {kpis.map(k => <Kpi key={k.label} value={k.value} label={k.label} note={k.note} />)}
        </div>
        <div className="space-y-4" aria-label="Certifications">
          <h2 className="text-sm font-medium tracking-wide uppercase text-muted-foreground">Certifications (placeholders)</h2>
          <ul className="flex flex-wrap gap-3 text-sm">
            {certs.map(c => (
              <li key={c.code} className="rounded border border-border/60 px-2 py-1 bg-muted/30">
                <span className="font-medium">{c.code}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="text-sm">
          <p>
            Highlight case: <Link className="underline underline-offset-4 hover:text-foreground" href="/cases">View a representative case study (placeholder)</Link>
          </p>
        </div>
      </div>
    </Section>
  );
}
