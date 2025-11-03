import { siteProfile } from '@/lib/content/site';
import Link from 'next/link';
import { GithubIcon } from '../../../../public/icons/GithubIcon';
import { LinkedinIcon } from '../../../../public/icons/LinkedinIcon';
import { XIcon } from '../../../../public/icons/XIcon';
import { MediumIcon } from '../../../../public/icons/MediumIcon';
import { YoutubeIcon } from '../../../../public/icons/YoutubeIcon';
import { EmailIcon } from '../../../../public/icons/EmailIcon';

// Mapping des icônes par plateforme
export const iconMap = {
  'GitHub': GithubIcon,
  'LinkedIn': LinkedinIcon,
  'X': XIcon,
  'Medium': MediumIcon,
  'YouTube': YoutubeIcon,
} as const;

export function SocialLinks() {
  return (
    <nav aria-label="Social links" className="mt-10">
      <ul className="space-y-1">
        {siteProfile.socials.map(s => {
          const IconComponent = iconMap[s.label as keyof typeof iconMap];
          
          return (
            <li key={s.label}>
              <Link
                href={s.href}
                className="flex items-center gap-3 px-4 py-2 text-sm hover:bg-neutral-50 dark:hover:bg-neutral-900 rounded-lg transition-colors duration-200 group"
                target="_blank"
                rel="noopener noreferrer"
              >
                {IconComponent && (
                  <IconComponent 
                    size={20} 
                    className="text-neutral-600 dark:text-neutral-400 group-hover:text-neutral-900 dark:group-hover:text-neutral-100 transition-colors duration-200" 
                  />
                )}
                <span className="group-hover:text-neutral-900 dark:group-hover:text-neutral-100 transition-colors duration-200">
                  {s.label}
                </span>
              </Link>
            </li>
          );
        })}
        
        <li>
          <a
            href={`mailto:${siteProfile.email}`}
            className="flex items-center gap-3 px-4 py-2 text-sm hover:bg-neutral-50 dark:hover:bg-neutral-900 rounded-lg transition-colors duration-200 group"
          >
            <EmailIcon 
              size={20} 
              className="text-neutral-600 dark:text-neutral-400 group-hover:text-neutral-900 dark:group-hover:text-neutral-100 transition-colors duration-200" 
            />
            <span className="group-hover:text-neutral-900 dark:group-hover:text-neutral-100 transition-colors duration-200">
              {siteProfile.email}
            </span>
          </a>
        </li>
      </ul>
    </nav>
  );
}
