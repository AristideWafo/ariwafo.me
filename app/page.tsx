// import Image from "next/image";

import { Metadata } from 'next';
import { buildMetadata } from '@/lib/seo/metadata';
import { HeroSection } from '@/components/sections/home/HeroSection';
import { PillarsSection } from '@/components/sections/home/PillarsSection';
import { StackSection } from '@/components/sections/home/StackSection';
import { ContactCtaSection } from '@/components/sections/home/ContactCtaSection';
import { Section } from '@/components/ui/Section';
import { Kpi } from '@/components/ui/Kpi';
import { Card } from '@/components/ui/Card';
import { Tag } from '@/components/ui/Tag';

export const metadata: Metadata = buildMetadata({
  title: 'Home',
  description: 'Placeholder home page – cloud & DevOps engineer portfolio.',
  path: '/',
});

// Placeholder data
const kpis = [
  { value: '5+', label: 'Years exp.', note: 'placeholder' },
  { value: '20+', label: 'Projects', note: 'placeholder' }
];

const caseTeasers = [1,2,3].map(i => ({ id: i, title: `Case Study ${i} (placeholder)`, tag: 'Cloud', excerpt: 'Short placeholder summary of impact.' }));

const latestContent = {
  article: { title: 'Article placeholder title', href: '/articles', tag: 'DevOps' },
  podcast: { title: 'Podcast episode placeholder', href: '/podcast', tag: 'Podcast' }
};

export default function HomePage() {
  return (
    <main> 
      <HeroSection />
      <Section>
        <div className="grid gap-6 md:grid-cols-3">
          {kpis.map(k => <Kpi key={k.label} value={k.value} label={k.label} note={k.note} />)}
        </div>
      </Section>
      <PillarsSection />
      <Section>
        <div className="space-y-6">
          <h2 className="text-xl font-semibold tracking-tight">Featured Case Studies (placeholder)</h2>
          <div className="grid gap-6 md:grid-cols-3">
            {caseTeasers.map(c => (
              <Card key={c.id} className="p-4 space-y-3">
                <Tag>{c.tag}</Tag>
                <h3 className="font-semibold tracking-tight">{c.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{c.excerpt}</p>
              </Card>
            ))}
          </div>
        </div>
      </Section>
      <StackSection />
      <Section>
        <div className="space-y-6">
          <h2 className="text-xl font-semibold tracking-tight">Latest Content (placeholder)</h2>
          <div className="grid gap-6 md:grid-cols-2">
            <Card className="p-4 space-y-2">
              <Tag>{latestContent.article.tag}</Tag>
              <h3 className="font-medium">{latestContent.article.title}</h3>
              <p className="text-sm text-muted-foreground">Placeholder article excerpt.</p>
            </Card>
            <Card className="p-4 space-y-2">
              <Tag>{latestContent.podcast.tag}</Tag>
              <h3 className="font-medium">{latestContent.podcast.title}</h3>
              <p className="text-sm text-muted-foreground">Placeholder episode summary.</p>
            </Card>
          </div>
        </div>
      </Section>
      <ContactCtaSection />
    </main>
  );
}
