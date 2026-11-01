"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface TocItem { id: string; text: string; depth: 2 | 3 }

/** Table of contents that highlights the section currently being read. */
export function Toc({ headings }: { headings: TocItem[] }) {
  const [active, setActive] = useState(headings[0]?.id);

  useEffect(() => {
    const update = () => {
      // Active = last heading that has crossed the reading line (~30% down the viewport).
      const line = window.innerHeight * 0.3;
      let current = headings[0]?.id;
      for (const h of headings) {
        const el = document.getElementById(h.id);
        if (el && el.getBoundingClientRect().top <= line) current = h.id;
      }
      setActive(current);
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [headings]);

  return (
    <nav aria-label="Table of contents" className="hidden lg:block">
      <p className="label-accent">Contents</p>
      <ol className="mt-3 border-l border-border text-sm">
        {headings.map((h) => {
          const on = h.id === active;
          return (
            <li key={h.id} className={cn("-ml-px border-l-2 py-1 transition-colors", on ? "border-primary" : "border-transparent", h.depth === 3 ? "pl-7" : "pl-3")}>
              <a
                href={`#${h.id}`}
                aria-current={on ? "location" : undefined}
                className={cn("block transition-colors", on ? "font-medium text-primary" : "text-muted-foreground hover:text-foreground")}
              >
                {h.text}
              </a>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
