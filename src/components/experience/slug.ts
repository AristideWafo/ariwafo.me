/**
 * Anchor id shared by the timeline bars and the experience list entries.
 * Kept in its own module so the client-side ExperienceItem does not pull the
 * whole timeline component into the browser bundle just to build an id.
 */
export const experienceSlug = (company: string) =>
  `exp-${company
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")}`;
