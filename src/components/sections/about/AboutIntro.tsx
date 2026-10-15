import { siteProfile } from "@/lib/content/site";

export function AboutIntro() {
  return (
    <div>
      <p className="label-accent">FIG_040 · Profile</p>

      <h1 className="display mt-4 text-3xl leading-[1.05] sm:text-4xl lg:text-5xl">
        I make delivery boring
      </h1>

      <div className="mt-8 space-y-5 text-lg leading-relaxed">
        <p>
          I&apos;m {siteProfile.name}, a cloud and DevOps engineer based in{" "}
          {siteProfile.location}. I work on observability at Société Générale,
          where I deploy monitoring across Kubernetes clusters, Docker
          containers and EC2 instances, and agree SLI/SLO targets with the teams
          who own the services.
        </p>
        <p>
          I came to infrastructure from the backend side. I spent two years
          writing Java and Spring Boot — refactoring legacy modules, splitting a
          monolith into services, automating a customer migration that used to
          take five days per customer and now takes six hours. That work taught
          me the same lesson every time: the bottleneck is almost never the
          code. It&apos;s the path the code takes to production.
        </p>
        <p>
          So that&apos;s what I work on now. Terraform instead of console
          clicks. Pipelines that build once and promote the same artifact.
          Dashboards that answer a question instead of decorating a screen. The
          goal is a release that nobody has to stay late for.
        </p>
        <p>
          I write up what I learn — mostly on Medium, on CI/CD for monorepos,
          DORA metrics and securing AWS with bastion hosts. I&apos;m certified
          on AWS and Terraform, and I keep the projects public so the work can
          be checked rather than taken on trust.
        </p>
      </div>

      <p className="mt-8 border-l-2 border-primary pl-5 italic leading-relaxed text-muted-foreground">
        {siteProfile.availability}. If your deploys are scary, I&apos;d like to
        hear about it.
      </p>
    </div>
  );
}
