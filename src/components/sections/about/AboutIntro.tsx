import { siteProfile } from "@/lib/content/site";

export function AboutIntro() {
  return (
    <div className="space-y-6">
      <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight">
        I&apos;m {siteProfile.name}, I live in {siteProfile.location}.
      </h1>
      <div className="prose prose-neutral dark:prose-invert max-w-none space-y-4 text-base text-gray-500 leading-relaxed">
        <p>
          I currently work as a <span className="text-sky-500 font-semibold">DevOps engineer</span> at Société Générale. I support
          teams in delivering their products quickly and ensuring smooth
          production maintenance.
        </p>
        <p>
          I have a strong background in <span className="text-sky-500 font-semibold">cloud computing</span>, <span className="text-sky-500 font-semibold">CI/CD pipelines</span>, and
          <span className="text-sky-500 font-semibold"> infrastructure as code</span>. I believe in automating repetitive tasks to
          improve efficiency and reduce the risk of human error.
        </p>
        <p>
          I regularly share content about <span className="text-sky-500 font-semibold">cloud technologies</span>, <span className="text-sky-500 font-semibold">artificial
          intelligence</span>, and other tech topics on <span className="text-sky-500 font-semibold">LinkedIn</span> and especially on
          <span className="text-sky-500 font-semibold"> TikTok</span>.
        </p>
        <p>
          I&apos;m always looking to <span className="text-sky-500 font-semibold">learn new things</span> and improve my skills. I
          believe in the power of <span className="text-sky-500 font-semibold">continuous learning</span> and staying curious.
        </p>
      </div>
    </div>
  );
}
