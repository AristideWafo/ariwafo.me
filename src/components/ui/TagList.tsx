import Link from "next/link";
import { Tag } from "@/components/ui/Tag";
import { tagSlug } from "@/lib/tags";

/**
 * Tags that filter `basePath`. `relative z-10` lifts them above the card's
 * stretched link so they stay clickable (and no link is nested in another).
 */
export function TagList({ tags, basePath }: { tags: string[]; basePath: string }) {
  if (tags.length === 0) return null;
  return (
    <ul className="mt-5 flex flex-wrap gap-2">
      {tags.map((tag) => (
        <li key={tag}>
          <Link
            href={`${basePath}?tag=${tagSlug(tag)}`}
            className="relative z-10 block hover:text-primary"
          >
            <Tag className="transition-colors hover:border-primary hover:text-primary">
              {tag}
            </Tag>
          </Link>
        </li>
      ))}
    </ul>
  );
}
