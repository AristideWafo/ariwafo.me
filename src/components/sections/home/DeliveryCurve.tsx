import React from "react";

/**
 * Hand-drawn figure, not a data plot: it states the shape of the claim —
 * automated delivery compounds, manual release cadence flattens.
 */
export function DeliveryCurve() {
  return (
    <svg
      viewBox="0 0 340 200"
      className="h-auto w-full"
      role="img"
      aria-label="Automated pipelines increase deploy frequency over time, while manual releases stay flat."
    >
      {/* grid */}
      <g stroke="hsl(var(--border))" strokeDasharray="2 4" strokeWidth="1">
        <line x1="34" y1="45" x2="320" y2="45" />
        <line x1="34" y1="95" x2="320" y2="95" />
        <line x1="34" y1="145" x2="320" y2="145" />
        <line x1="120" y1="25" x2="120" y2="170" />
        <line x1="206" y1="25" x2="206" y2="170" />
        <line x1="292" y1="25" x2="292" y2="170" />
      </g>

      {/* axes */}
      <g stroke="hsl(var(--muted-foreground))" strokeWidth="1.25">
        <line x1="34" y1="22" x2="34" y2="170" />
        <line x1="34" y1="170" x2="326" y2="170" />
      </g>
      <polygon points="34,18 31,26 37,26" fill="hsl(var(--muted-foreground))" />
      <polygon points="330,170 322,167 322,173" fill="hsl(var(--muted-foreground))" />

      {/* area under the automated curve */}
      <path
        d="M34 162 C 120 150, 170 96, 310 38 L 310 170 L 34 170 Z"
        fill="hsl(var(--primary))"
        fillOpacity="0.1"
      />

      {/* manual releases: flat */}
      <path
        d="M34 164 C 130 158, 220 152, 310 146"
        fill="none"
        stroke="hsl(var(--muted-foreground))"
        strokeWidth="1.75"
      />

      {/* automated delivery: compounding */}
      <path
        d="M34 162 C 120 150, 170 96, 310 38"
        fill="none"
        stroke="hsl(var(--primary))"
        strokeWidth="2.25"
      />

      {/* markers */}
      <g fill="hsl(var(--background))" stroke="hsl(var(--primary))" strokeWidth="1.75">
        <rect x="104" y="128" width="7" height="7" />
        <rect x="186" y="86" width="7" height="7" />
        <rect x="274" y="48" width="7" height="7" />
      </g>

      <g
        fill="hsl(var(--foreground))"
        fontSize="9"
        fontFamily="var(--font-mono), monospace"
      >
        <text x="116" y="128">IaC</text>
        <text x="198" y="86">CI/CD</text>
        <text x="240" y="44">observability</text>
      </g>

      <g
        fill="hsl(var(--muted-foreground))"
        fontSize="9"
        fontFamily="var(--font-mono), monospace"
      >
        <text x="190" y="140">manual releases</text>
        <text x="40" y="16">deploys</text>
        <text x="294" y="186">time</text>
      </g>
    </svg>
  );
}
