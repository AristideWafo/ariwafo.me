import { siteProfile } from '@/lib/content/site';
import Link from 'next/link';

export function SocialLinks() {
  return (
    <nav aria-label="Social links" className="mt-10">
      <ul className="">
        {siteProfile.socials.map(s => (
          <li key={s.label}>
            <Link
              href={s.href}
              className="block px-4 py-2 text-sm hover:underline underline-offset-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring"
            >
              Follow on {s.label}
            </Link>
          </li>
        ))}
        
        <li>
          <a
            href={`mailto:${siteProfile.email}`}
            className="block px-4 py-2 text-sm hover:underline underline-offset-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring"
          >
            {siteProfile.email}
          </a>
        </li>
      </ul>
    </nav>
  );
}
