"use client";

import { useEffect, useRef } from "react";

// Same 14px lattice as the CSS dot ground in globals.css, which stays as the no-JS fallback.
const SPACING = 14;
const RADIUS = 200; // cursor reach, px
const SPRING = 0.035;
const DAMPING = 0.88;

/**
 * Animated dot ground: every dot drifts on a slow wave, and dots near the
 * cursor are drawn in, swirl a little, follow its motion and turn accent blue.
 */
export function FluidDots() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const css = getComputedStyle(document.documentElement);
    const color = (name: string) => `hsl(${css.getPropertyValue(name).trim()})`;
    const bg = color("--background");
    const dot = color("--dot");
    const accent = color("--primary");
    const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let w = 0, h = 0, n = 0;
    let hx = new Float32Array(0), hy = hx, ox = hx, oy = hx, vx = hx, vy = hx, pull = hx;

    const mouse = { x: -1e4, y: -1e4, vx: 0, vy: 0 };

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const cols = Math.ceil(w / SPACING) + 1;
      const rows = Math.ceil(h / SPACING) + 1;
      n = cols * rows;
      hx = new Float32Array(n); hy = new Float32Array(n);
      ox = new Float32Array(n); oy = new Float32Array(n);
      vx = new Float32Array(n); vy = new Float32Array(n);
      pull = new Float32Array(n);
      for (let i = 0; i < n; i++) {
        hx[i] = (i % cols) * SPACING + SPACING / 2;
        hy[i] = Math.floor(i / cols) * SPACING + SPACING / 2;
      }
      if (still) draw();
    };

    const step = (t: number) => {
      const r2 = RADIUS * RADIUS;
      for (let i = 0; i < n; i++) {
        const px = hx[i] + ox[i], py = hy[i] + oy[i];
        // Rest position rides a slow wave so the field never looks frozen.
        let fx = (Math.sin(hy[i] * 0.018 + t * 0.6) * 2.2 - ox[i]) * SPRING;
        let fy = (Math.cos(hx[i] * 0.018 + t * 0.5) * 2.2 - oy[i]) * SPRING;
        let f = 0;

        const dx = mouse.x - px, dy = mouse.y - py, d2 = dx * dx + dy * dy;
        if (d2 < r2) {
          f = 1 - Math.sqrt(d2) / RADIUS;
          f *= f;
          fx += dx * f * 0.05 - dy * f * 0.012 + mouse.vx * f * 0.08; // gather + swirl + wake
          fy += dy * f * 0.05 + dx * f * 0.012 + mouse.vy * f * 0.08;
        }
        vx[i] = (vx[i] + fx) * DAMPING;
        vy[i] = (vy[i] + fy) * DAMPING;
        ox[i] += vx[i];
        oy[i] += vy[i];
        // Ease the highlight so it fades like ink rather than snapping off.
        pull[i] += (f - pull[i]) * 0.15;
      }
      mouse.vx *= 0.9;
      mouse.vy *= 0.9;
    };

    function draw() {
      ctx!.fillStyle = bg;
      ctx!.fillRect(0, 0, w, h);
      ctx!.fillStyle = dot;
      for (let i = 0; i < n; i++) ctx!.fillRect(hx[i] + ox[i] - 1, hy[i] + oy[i] - 1, 2, 2);

      ctx!.fillStyle = accent;
      for (let i = 0; i < n; i++) {
        const p = pull[i];
        if (p < 0.01) continue;
        const s = 2 + p * 1.6;
        ctx!.globalAlpha = Math.min(1, p * 1.8);
        ctx!.fillRect(hx[i] + ox[i] - s / 2, hy[i] + oy[i] - s / 2, s, s);
      }
      ctx!.globalAlpha = 1;
    }

    let raf = 0;
    const loop = (ms: number) => {
      step(ms / 1000);
      draw();
      raf = requestAnimationFrame(loop);
    };

    const onMove = (e: PointerEvent) => {
      if (mouse.x > -1e3) {
        mouse.vx += (e.clientX - mouse.x) * 0.5;
        mouse.vy += (e.clientY - mouse.y) * 0.5;
      }
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };
    const onLeave = () => {
      mouse.x = mouse.y = -1e4;
    };

    resize();
    window.addEventListener("resize", resize);
    if (!still) {
      window.addEventListener("pointermove", onMove, { passive: true });
      document.documentElement.addEventListener("pointerleave", onLeave);
      raf = requestAnimationFrame(loop);
    }

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return (
    <canvas
      ref={ref}
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 h-full w-full"
    />
  );
}
