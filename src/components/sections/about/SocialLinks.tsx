import { siteProfile } from '@/lib/content/site';
import { GithubIcon } from '../../../../public/icons/GithubIcon';
import { LinkedinIcon } from '../../../../public/icons/LinkedinIcon';
import { XIcon } from '../../../../public/icons/XIcon';
import { MediumIcon } from '../../../../public/icons/MediumIcon';
import { YoutubeIcon } from '../../../../public/icons/YoutubeIcon';
import { EmailIcon } from '../../../../public/icons/EmailIcon';

export const iconMap = {
  GitHub: GithubIcon,
  LinkedIn: LinkedinIcon,
  X: XIcon,
  Medium: MediumIcon,
  YouTube: YoutubeIcon,
} as const;

export function SocialLinks() {
  return (
    <nav aria-label="Elsewhere" className="border border-border">
      <p className="label border-b border-border bg-surface/60 px-4 py-2.5">
        Elsewhere
      </p>
      <ul>
        {siteProfile.socials.map((social) => {
          const Icon = iconMap[social.label as keyof typeof iconMap];
          return (
            <li key={social.label} className="border-b border-border">
              <a
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-3 px-4 py-3 transition-colors hover:bg-surface/60"
              >
                {Icon && (
                  <Icon
                    size={18}
                    className="shrink-0 text-muted-foreground transition-colors group-hover:text-primary"
                  />
                )}
                <span className="font-mono text-xs uppercase tracking-[0.12em]">
                  {social.label}
                </span>
                <span className="ml-auto font-mono text-xs text-muted-foreground transition-colors group-hover:text-primary">
                  ↗
                </span>
              </a>
            </li>
          );
        })}

        <li>
          <a
            href={`mailto:${siteProfile.email}`}
            className="group flex items-center gap-3 px-4 py-3 transition-colors hover:bg-surface/60"
          >
            <EmailIcon
              size={18}
              className="shrink-0 text-muted-foreground transition-colors group-hover:text-primary"
            />
            <span className="truncate font-mono text-xs">{siteProfile.email}</span>
          </a>
        </li>
      </ul>
    </nav>
  );
}
