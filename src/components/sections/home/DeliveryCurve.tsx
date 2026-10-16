import React from "react";

/** The automated-delivery curve. Marker positions are derived from it. */
const CURVE = "M34 162 C 120 150, 170 96, 310 38";

/**
 * Points sampled on CURVE with the cubic Bezier formula, not eyeballed — a
 * marker placed by hand sits visibly off the line. Recompute these if CURVE
 * changes: B(t) = (1-t)³P0 + 3(1-t)²t·P1 + 3(1-t)t²·P2 + t³P3.
 */
const MARKERS = [
  { label: "IaC", t: 0.3, x: 105.08, y: 140.89 },
  { label: "CI/CD", t: 0.6, x: 177.14, y: 103.25 },
  { label: "observability", t: 0.92, x: 278.06, y: 51.82 },
];

const MARK = 7; // marker square size

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
      {/* Fixed reference frame: grid and axes do not drift. */}
      <g stroke="hsl(var(--border))" strokeDasharray="2 4" strokeWidth="1">
        <line x1="34" y1="45" x2="320" y2="45" />
        <line x1="34" y1="95" x2="320" y2="95" />
        <line x1="34" y1="145" x2="320" y2="145" />
        <line x1="120" y1="25" x2="120" y2="170" />
        <line x1="206" y1="25" x2="206" y2="170" />
        <line x1="292" y1="25" x2="292" y2="170" />
      </g>

      <g stroke="hsl(var(--muted-foreground))" strokeWidth="1.25">
        <line x1="34" y1="22" x2="34" y2="170" />
        <line x1="34" y1="170" x2="326" y2="170" />
      </g>
      <polygon points="34,18 31,26 37,26" fill="hsl(var(--muted-foreground))" />
      <polygon points="330,170 322,167 322,173" fill="hsl(var(--muted-foreground))" />

      <g
        fill="hsl(var(--muted-foreground))"
        fontSize="9"
        fontFamily="var(--font-mono), monospace"
      >
        <text x="40" y="16">deploys</text>
        <text x="294" y="186">time</text>
      </g>

      {/* Data layer. One transform for curves and markers alike, so the
          markers stay welded to the lines while the group drifts. */}
      <g className="fig-float">
        <path
          className="fig-area"
          d={`${CURVE} L 310 170 L 34 170 Z`}
          fill="hsl(var(--primary))"
          fillOpacity="0.1"
        />

        <path
          className="fig-draw"
          style={{ animationDelay: "0.25s" }}
          pathLength={1}
          d="M34 164 C 130 158, 220 152, 310 146"
          fill="none"
          stroke="hsl(var(--muted-foreground))"
          strokeWidth="1.75"
        />

        <path
          className="fig-draw"
          pathLength={1}
          d={CURVE}
          fill="none"
          stroke="hsl(var(--primary))"
          strokeWidth="2.25"
        />

        {MARKERS.map((marker, i) => (
          <rect
            key={marker.label}
            className="fig-mark"
            style={{ animationDelay: `${1.15 + i * 0.15}s` }}
            x={marker.x - MARK / 2}
            y={marker.y - MARK / 2}
            width={MARK}
            height={MARK}
            fill="hsl(var(--background))"
            stroke="hsl(var(--primary))"
            strokeWidth="1.75"
          />
        ))}

        <g
          className="fig-area"
          style={{ animationDelay: "1.4s" }}
          fill="hsl(var(--foreground))"
          fontSize="9"
          fontFamily="var(--font-mono), monospace"
        >
          <text x={MARKERS[0].x + 9} y={MARKERS[0].y + 3}>
            {MARKERS[0].label}
          </text>
          <text x={MARKERS[1].x + 9} y={MARKERS[1].y + 3}>
            {MARKERS[1].label}
          </text>
          <text x={MARKERS[2].x - 6} y={MARKERS[2].y - 9} textAnchor="middle">
            {MARKERS[2].label}
          </text>
        </g>

        <text
          className="fig-area"
          style={{ animationDelay: "1.4s" }}
          x="190"
          y="140"
          fill="hsl(var(--muted-foreground))"
          fontSize="9"
          fontFamily="var(--font-mono), monospace"
        >
          manual releases
        </text>
      </g>
    </svg>
  );
}
