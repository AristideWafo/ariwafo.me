"use client";
import React, { useState } from "react";
import { Experience } from "@/lib/content/experience";
import CompanyLogo from "./CompanyLogo";
import DateRange from "./DateRange";
import Link from "next/link";

type ExperienceItemProps = Experience;

export default function ExperienceItem({
  company,
  role,
  description,
  techStack,
  start,
  end,
  duration,
  logo,
  url,
}: ExperienceItemProps) {
  const [showFullDescription, setShowFullDescription] = useState(false);

  // Fonction pour tronquer la description à 2 éléments de liste
  const truncateDescription = (items: string[]) => {
    if (items.length <= 1) return items;
    return items.slice(0, 1);
  };

  const shouldShowToggle = description && description.length > 2;
  const content = (
    <>
      <div className="flex items-start gap-3">
        <CompanyLogo src={logo} alt={company} />
        <div className="min-w-0 flex-1">
          <h3 className="text-base font-semibold">{company}</h3>
          <p className="text-sm text-neutral-500 dark:text-neutral-400">
            {role}
          </p>
          {description && (
            <div className="mt-1">
              <ul className="text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed space-y-1">
                {(showFullDescription
                  ? description
                  : truncateDescription(description)
                ).map((item, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-neutral-400 mr-2 mt-0.5 text-xs">
                      •
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
                {!showFullDescription && shouldShowToggle && (
                  <li className="flex items-start">
                    <span className="text-neutral-400 mr-2 mt-0.5 text-xs">
                      •
                    </span>
                    <span className="text-neutral-400">...</span>
                  </li>
                )}
              </ul>
              {shouldShowToggle && (
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setShowFullDescription(!showFullDescription);
                  }}
                  className="text-xs text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 mt-2 focus:outline-none"
                >
                  {showFullDescription ? "Show less" : "Show more"}
                </button>
              )}
            </div>
          )}
          {/* badges correspondant aux tech stack */}
          {techStack && techStack.length > 0 && (
            <div className="mt-2">
              <div className="flex flex-wrap gap-1.5">
                {techStack.map((tech, index) => (
                  <span
                    key={index}
                    className="inline-block px-2 py-1 text-xs font-medium bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 rounded-md border border-neutral-200 dark:border-neutral-700"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="text-sm text-neutral-500 dark:text-neutral-400 md:text-right">
        <DateRange start={start} end={end} duration={duration} />
      </div>
    </>
  );

  // Wrap with link if URL is provided
  if (url) {
    return (
      <li>
        <Link
          href={url}
          className="group grid gap-3 md:grid-cols-[1fr,auto] items-start rounded-2xl px-2 py-3 hover:bg-neutral-50 dark:hover:bg-neutral-900 focus-within:ring-2 focus:outline-none"
        >
          {content}
        </Link>
      </li>
    );
  }

  return (
    <li className="group grid gap-3 md:grid-cols-[1fr,auto] items-start rounded-2xl px-2 py-3">
      {content}
    </li>
  );
}
