import { Section } from "@/components/ui/Section";
import { GithubIcon } from "../../../../public/icons/GithubIcon";
import { LinkedinIcon } from "../../../../public/icons/LinkedinIcon";
import { XIcon } from "../../../../public/icons/XIcon";
import Link from "next/link";

const links = [
  { label: "Follow on X", href: "https://x.com/placeholder", icon: XIcon },
  {
    label: "Follow on GitHub",
    href: "https://github.com/placeholder",
    icon: GithubIcon,
  },
  {
    label: "Follow on LinkedIn",
    href: "https://www.linkedin.com/in/placeholder",
    icon: LinkedinIcon,
  },
  { label: "Email", href: "mailto:placeholder@example.com", icon: null },
];

export function SocialLinksSection() {
  return (
    <Section className="pt-0">
      <ul className="max-w-sm space-y-3" aria-label="Social links placeholder">
        {links.map((l) => (
          <li key={l.label} className="flex items-center gap-3 text-sm">
            {l.icon ? (
              <l.icon size={14} className="text-muted-foreground" />
            ) : (
              <span className="text-muted-foreground" aria-hidden>
                ✉
              </span>
            )}
            <Link className="hover:underline underline-offset-4" href={l.href}>
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </Section>
  );
}
