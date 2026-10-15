import { Metadata } from "next";
import Link from "next/link";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { siteProfile } from "@/lib/content/site";
import { buildMetadata } from "@/lib/seo/metadata";
import { LinkedinIcon } from "../../public/icons/LinkedinIcon";
import { EmailIcon } from "../../public/icons/EmailIcon";

export const metadata: Metadata = buildMetadata({
  title: "Contact",
  description:
    "Get in touch about cloud infrastructure, DevOps automation, observability work or technical collaboration.",
  path: "/contact",
});

const linkedin =
  siteProfile.socials.find((s) => s.label === "LinkedIn")?.href ?? "#";

const channels = [
  {
    Icon: EmailIcon,
    name: "Email",
    detail: siteProfile.email,
    body: "Best for project briefs, roles and anything with detail attached.",
    href: `mailto:${siteProfile.email}`,
    cta: "Write to me",
    external: false,
  },
  {
    Icon: LinkedinIcon,
    name: "LinkedIn",
    detail: "in/aristidewafo",
    body: "Best for a quick message or if you want to see the network first.",
    href: linkedin,
    cta: "Connect",
    external: true,
  },
];

export default function ContactPage() {
  return (
    <>
      <Section
        as="h1"
        label="FIG_050 · Contact"
        title="Let's talk"
        intro="Interested in cloud infrastructure, DevOps automation or observability work? Tell me what you are trying to ship and what is getting in the way."
        divider={false}
        className="pb-0 md:pb-0"
      />

      <Section divider={false}>
        <div className="grid gap-px border border-border bg-border md:grid-cols-2">
          {channels.map(({ Icon, name, detail, body, href, cta, external }) => (
            <div key={name} className="bg-background p-6">
              <div className="flex items-center gap-3">
                <Icon size={18} className="text-primary" />
                <h2 className="font-mono text-sm uppercase tracking-[0.14em]">
                  {name}
                </h2>
              </div>
              <p className="mt-3 break-all font-mono text-sm text-muted-foreground">
                {detail}
              </p>
              <p className="mt-3 leading-relaxed text-muted-foreground">{body}</p>
              <Button
                href={href}
                variant="primary"
                size="sm"
                className="mt-5"
                {...(external
                  ? { target: "_blank", rel: "noopener noreferrer" }
                  : {})}
              >
                {cta} {external ? "↗" : "→"}
              </Button>
            </div>
          ))}
        </div>

        <div className="mt-8 grid gap-px border border-border bg-border sm:grid-cols-2">
          <div className="bg-background p-6">
            <p className="label-accent">Response time</p>
            <p className="mt-3 leading-relaxed text-muted-foreground">
              Usually within 24–48 hours on working days.
            </p>
          </div>
          <div className="bg-background p-6">
            <p className="label-accent">Availability</p>
            <p className="mt-3 leading-relaxed text-muted-foreground">
              {siteProfile.availability}. Based in {siteProfile.location},
              comfortable remote.
            </p>
          </div>
        </div>

        {/* The contact form is deliberately not rendered: /api/contact only
            logs the message server-side, so submitting it would promise a
            reply that never arrives. Wire an email provider first —
            see EMAIL_SETUP.md — then render <ContactForm /> here. */}

        <p className="mt-8 text-sm leading-relaxed text-muted-foreground">
          Prefer a form?{" "}
          <Link href={`mailto:${siteProfile.email}`} className="link-underline">
            Email works better
          </Link>{" "}
          — it lands in my inbox directly.
        </p>
      </Section>
    </>
  );
}
