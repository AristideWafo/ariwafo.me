import { siteProfile } from '@/lib/content/site';

export function AboutIntro() {
  return (
    <div className="space-y-6">
      <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight">
        I&apos;m {siteProfile.name}, I live in {siteProfile.location}.
      </h1>
      <div className="prose prose-neutral dark:prose-invert max-w-none space-y-4 text-base leading-relaxed">
        <p>Placeholder paragraph 1 about professional focus and value provided (to be replaced).</p>
        <p>Placeholder paragraph 2 summarizing experience, impact areas and approach (to be replaced).</p>
        <p>Placeholder paragraph 3 referencing collaboration style, communication, knowledge sharing (to be replaced).</p>
        <p>Placeholder paragraph 4 covering interests, mindset and continuous improvement (to be replaced).</p>
      </div>
    </div>
  );
}
