import React from 'react';
import { Section } from '@/components/ui/Section';

const pillars = [
  { title: 'Infrastructure as Code', body: 'Terraform-first workflows, modular design, drift-free environments. Placeholder text.' },
  { title: 'CI/CD', body: 'Automated pipelines, testable infra changes, progressive delivery. Placeholder text.' },
  { title: 'Security & Observability', body: 'Shift-left security, least privilege, metrics, logs & tracing baked in. Placeholder text.' }
];

export function PillarsSection() {
  return (
    <Section>
      <div className="grid gap-8 md:grid-cols-3">
        {pillars.map(p => (
          <div key={p.title} className="space-y-2">
            <h3 className="font-semibold tracking-tight">{p.title}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{p.body}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}
