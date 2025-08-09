import { Section } from '@/components/ui/Section';
import { Prose } from '@/components/ui/Prose';

export function AboutIntroSection() {
  return (
    <Section className="pt-10">
      <div className="grid gap-10 md:grid-cols-2 items-start">
        <Prose className="space-y-6">
          <h1>I&apos;m Placeholder Name, I live in Placeholder City.</h1>
          <p>I&apos;m currently working at <strong>CompanyName</strong>, where I&apos;m responsible for creating and optimizing user interfaces for web applications with a focus on performance, accessibility and maintainability. (placeholder)</p>
          <p>In July 2025, a personal open-source side project reached an adoption milestone. (placeholder detail)</p>
          <p>I share work and ideas across several platforms. I&apos;m always looking for new ways to connect with developers and designers, so feel free to reach out. (placeholder)</p>
          <p>I&apos;m passionate about capturing and documenting daily moments, exploring creative processes to refine perspective and communication. (placeholder)</p>
        </Prose>
        <div className="space-y-8">
          <div className="aspect-[4/5] w-full max-w-sm rounded-xl bg-muted border border-border/40 shadow-sm mx-auto" aria-label="Profile placeholder" />
        </div>
      </div>
    </Section>
  );
}
