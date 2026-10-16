import React from "react";

type Point = [number, number];
type Cubic = [Point, Point, Point, Point];

/**
 * Each line has a resting shape and a flexed shape. Endpoints are shared, only
 * the control points move, so the line bends between fixed start and end.
 */
const AUTOMATED: { rest: Cubic; flex: Cubic } = {
  rest: [[34, 162], [120, 150], [170, 96], [310, 38]],
  flex: [[34, 162], [150, 160], [185, 72], [310, 38]],
};

const MANUAL: { rest: Cubic; flex: Cubic } = {
  rest: [[34, 164], [130, 158], [220, 152], [310, 146]],
  flex: [[34, 164], [110, 167], [240, 155], [310, 146]],
};

const toD = ([p0, p1, p2, p3]: Cubic) =>
  `M${p0[0]} ${p0[1]} C ${p1[0]} ${p1[1]}, ${p2[0]} ${p2[1]}, ${p3[0]} ${p3[1]}`;

/** B(t) = (1-t)³P0 + 3(1-t)²t·P1 + 3(1-t)t²·P2 + t³P3 */
const at = ([p0, p1, p2, p3]: Cubic, t: number): Point => {
  const u = 1 - t;
  const w = [u * u * u, 3 * u * u * t, 3 * u * t * t, t * t * t];
  return [0, 1].map(
    (k) => w[0] * p0[k] + w[1] * p1[k] + w[2] * p2[k] + w[3] * p3[k],
  ) as Point;
};

const areaD = (c: Cubic) => `${toD(c)} L 310 170 L 34 170 Z`;

/** CSS custom properties consumed by the fig-flex keyframes in globals.css. */
const flexD = (d: string) =>
  ({ "--fig-d": `path("${d}")` }) as React.CSSProperties;

// B(t) is linear in the control points, so translating a marker by
// at(flex) - at(rest) with the same easing keeps it exactly on the line.
const MARKERS = [
  { label: "IaC", t: 0.3 },
  { label: "CI/CD", t: 0.6 },
  { label: "observability", t: 0.92 },
].map((m) => {
  const [x, y] = at(AUTOMATED.rest, m.t);
  const [fx, fy] = at(AUTOMATED.flex, m.t);
  return { ...m, x, y, dx: fx - x, dy: fy - y };
});

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
      {/* Fixed reference frame: grid and axes do not move. */}
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

      {/* Entrance animations sit on wrapper groups so the paths themselves
          only carry the flex animation. */}
      <g className="fig-area">
        <path
          className="fig-flex"
          style={flexD(areaD(AUTOMATED.flex))}
          d={areaD(AUTOMATED.rest)}
          fill="hsl(var(--primary))"
          fillOpacity="0.1"
        />
      </g>

      <g className="fig-draw" style={{ animationDelay: "0.25s" }}>
        <path
          className="fig-flex"
          style={flexD(toD(MANUAL.flex))}
          pathLength={1}
          d={toD(MANUAL.rest)}
          fill="none"
          stroke="hsl(var(--muted-foreground))"
          strokeWidth="1.75"
        />
      </g>

      <g className="fig-draw">
        <path
          className="fig-flex"
          style={flexD(toD(AUTOMATED.flex))}
          pathLength={1}
          d={toD(AUTOMATED.rest)}
          fill="none"
          stroke="hsl(var(--primary))"
          strokeWidth="2.25"
        />
      </g>

      {MARKERS.map((marker, i) => (
        <g
          key={marker.label}
          className="fig-flex"
          style={
            {
              "--fig-dx": `${marker.dx}px`,
              "--fig-dy": `${marker.dy}px`,
            } as React.CSSProperties
          }
        >
          <rect
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
          <text
            className="fig-area"
            style={{ animationDelay: "1.4s" }}
            x={i === 2 ? marker.x - 6 : marker.x + 9}
            y={i === 2 ? marker.y - 9 : marker.y + 3}
            textAnchor={i === 2 ? "middle" : undefined}
            fill="hsl(var(--foreground))"
            fontSize="9"
            fontFamily="var(--font-mono), monospace"
          >
            {marker.label}
          </text>
        </g>
      ))}

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
    </svg>
  );
}
