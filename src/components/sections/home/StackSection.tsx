import React from "react";
import { Section } from "@/components/ui/Section";
import { Kpi } from "@/components/ui/Kpi";
import { Tag } from "@/components/ui/Tag";
import { stackGroups } from "@/lib/content/site";

export function StackSection() {
  // Bars are proportional to the group sizes shown below them — nothing else.
  const widest = Math.max(...stackGroups.map((g) => g.items.length));

  return (
    <Section
      label="FIG_004 · Toolchain"
      title="What I reach for"
      intro="Tools I have shipped with in production, grouped by the problem they solve."
    >
      <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
        <div
          className="space-y-4"
          aria-label="Number of tools per domain"
        >
          {stackGroups.map((group) => (
            <Kpi
              key={group.group}
              label={group.group}
              value={group.items.length}
              fill={group.items.length / widest}
            />
          ))}
          <p className="pt-2 font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
            Tools per domain
          </p>
        </div>

        <div className="grid gap-px border border-border bg-border sm:grid-cols-2">
          {stackGroups.map((group) => (
            <div key={group.group} className="bg-background p-5">
              <h3 className="label-accent">{group.group}</h3>
              <ul className="mt-3 flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <li key={item}>
                    <Tag>{item}</Tag>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}
