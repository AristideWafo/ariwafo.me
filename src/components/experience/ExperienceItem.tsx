"use client";

import React, { useState } from "react";
import { Experience } from "@/lib/content/experience";
import CompanyLogo from "./CompanyLogo";
import DateRange from "./DateRange";
import { Tag } from "@/components/ui/Tag";
import { experienceSlug } from "./slug";

type ExperienceItemProps = Experience & { index?: number };

const PREVIEW_BULLETS = 2;

export default function ExperienceItem({
  company,
  role,
  type,
  location,
  description,
  techStack,
  start,
  end,
  duration,
  logo,
  url,
  index,
}: ExperienceItemProps) {
  const [expanded, setExpanded] = useState(false);

  const bullets = description ?? [];
  const canExpand = bullets.length > PREVIEW_BULLETS;
  const visible = expanded ? bullets : bullets.slice(0, PREVIEW_BULLETS);

  return (
    <li
      id={experienceSlug(company)}
      // scroll-mt clears the sticky header; the :target tint is what the
      // timeline bars above select.
      className="scroll-mt-24 border-b border-border py-6 transition-colors last:border-b-0 target:bg-surface/70"
    >
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex min-w-0 items-start gap-4">
          <CompanyLogo src={logo} alt={company} />
          <div className="min-w-0">
            {typeof index === "number" && (
              <span className="label-accent">
                {String(index + 1).padStart(2, "0")}
              </span>
            )}
            <h3 className="font-mono text-base font-semibold tracking-tight">
              {url && url !== "#" ? (
                <a
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors hover:text-primary"
                >
                  {company} ↗
                </a>
              ) : (
                company
              )}
            </h3>
            <p className="mt-0.5 text-sm text-muted-foreground">
              {role}
              {type && (
                <>
                  {" · "}
                  <span className="font-mono text-xs uppercase tracking-[0.1em]">
                    {type}
                  </span>
                </>
              )}
            </p>
            {location && (
              <p className="mt-0.5 font-mono text-xs text-muted-foreground">
                {location}
              </p>
            )}
          </div>
        </div>

        <div className="shrink-0 sm:text-right">
          <DateRange start={start} end={end} duration={duration} />
        </div>
      </div>

      {bullets.length > 0 && (
        <div className="mt-4 sm:pl-[60px]">
          <ul className="space-y-2">
            {visible.map((item, i) => (
              <li key={i} className="flex gap-3 leading-relaxed">
                <span aria-hidden className="mt-2 h-1.5 w-1.5 shrink-0 bg-primary" />
                <span className="text-muted-foreground">{item}</span>
              </li>
            ))}
          </ul>

          {canExpand && (
            <button
              type="button"
              onClick={() => setExpanded((open) => !open)}
              aria-expanded={expanded}
              className="mt-3 font-mono text-[11px] uppercase tracking-[0.14em] text-primary hover:underline"
            >
              {expanded
                ? "Show less"
                : `Show ${bullets.length - PREVIEW_BULLETS} more`}
            </button>
          )}
        </div>
      )}

      {techStack && techStack.length > 0 && (
        <ul className="mt-4 flex flex-wrap gap-2 sm:pl-[60px]">
          {techStack.map((tech) => (
            <li key={tech}>
              <Tag>{tech}</Tag>
            </li>
          ))}
        </ul>
      )}
    </li>
  );
}
