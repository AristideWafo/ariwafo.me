import React from "react";
import { Container } from "@/components/ui/Container";
import { Kpi } from "@/components/ui/Kpi";
import { work } from "@/lib/content/experience";
import { projects } from "@/lib/content/projects/data";

/** Years since the first role, so the figure never goes stale in the copy. */
function yearsSince(earliest: string) {
  const [year, month] = earliest.split("-").map(Number);
  const months =
    (new Date().getFullYear() - year) * 12 + (new Date().getMonth() + 1 - month);
  return Math.max(1, Math.floor(months / 12));
}

export function ProofsSection() {
  const earliest = work.map((w) => w.start).sort()[0];

  const kpis = [
    { value: `${yearsSince(earliest)}+`, label: "Years in the field" },
    { value: work.length, label: "Engineering teams" },
    { value: projects.length, label: "Public projects" },
  ];

  return (
    <section className="border-t border-border py-8 md:py-10">
      <Container>
        <div className="grid grid-cols-3 gap-4">
          {kpis.map((kpi) => (
            <Kpi key={kpi.label} {...kpi} />
          ))}
        </div>
      </Container>
    </section>
  );
}
