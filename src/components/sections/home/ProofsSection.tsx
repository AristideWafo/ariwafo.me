"use client"

import React, { useState, useEffect } from "react";
import { Section } from "@/components/ui/Section";
import { Kpi } from "@/components/ui/Kpi";
import ExperienceCard from "@/components/experience/ExperienceCard";
import { work } from "@/lib/content/experience";

const kpis = [
  {
    value: "1",
    label: "Years of experience",
    note: "Including apprenticeship and professional projects",
  },
  {
    value: "4",
    label: "Projects delivered",
    note: "Cloud, DevOps, and software development projects",
  },
];


export function ProofsSection() {
  const [showAllExperiences, setShowAllExperiences] = useState(false);
  const [isClient, setIsClient] = useState(false);
  
  useEffect(() => {
    setIsClient(true);
  }, []);
  
  const displayedExperiences = showAllExperiences ? work : work.slice(0, 1);
  
  return (
    <Section>
      <div className="space-y-10 p-6 rounded-lg border border-border/60 shadow-sm">
        <div className="grid gap-6 md:grid-cols-3" aria-label="Key metrics">
          {kpis.map((k) => (
            <Kpi key={k.label} value={k.value} label={k.label} note={k.note} />
          ))}
        </div>
        <div>
          <ExperienceCard items={displayedExperiences} />
          {isClient && (
            <button
              onClick={() => setShowAllExperiences(!showAllExperiences)}
              className="text-sm text-center w-full mt-2 py-2 text-muted-foreground hover:text-foreground transition-colors duration-200 cursor-pointer"
            >
              {showAllExperiences ? "Show less" : "Show more"}
            </button>
          )}
        </div>
      </div>
    </Section>
  );
}
