"use client";

import { useEffect, useRef } from "react";

// Same 14px lattice as the CSS dot ground in globals.css, which stays as the no-JS fallback.
const SPACING = 14;
const RADIUS = 340; // cursor reach, px
const SPRING = 0.035;
const DAMPING = 0.88;
const DOT_ALPHA = 0.55; // base dots, kept faint so they read as paper
const ACCENT_MAX = 0.14; // blue halo near the cursor
const LINK_R = 170; // neural links reach, px
const LINK_LIFE = [0.6, 1.8]; // seconds a link lives, min-max

/**
 * Animated dot ground that scrolls with the page. Dots drift on a slow wave,
 * gather softly around the cursor, and the cursor wires itself to a random,
 * ever-changing handful of nearby dots like a small neural network.
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

    let w = 0, h = 0, n = 0, cols = 0;
    let hx = new Float32Array(0), hy = hx, ox = hx, oy = hx, vx = hx, vy = hx, pull = hx;
    // Scroll: the lattice moves by `frac` px; whole rows scrolled past shift the per-dot state.
    let row = 0, frac = 0;

    const mouse = { x: -1e4, y: -1e4, vx: 0, vy: 0 };
    let links: { i: number; born: number; die: number }[] = [];
    let target = 0, retarget = 0;

    const onScroll = () => {
      const y = window.scrollY;
      const r = Math.floor(y / SPACING);
      frac = y - r * SPACING;
      const k = (r - row) * cols; // dots that moved off one edge, in index units
      row = r;
      if (k !== 0 && n) {
        for (const a of [ox, oy, vx, vy, pull]) {
          if (Math.abs(k) >= n) a.fill(0);
          else if (k > 0) { a.copyWithin(0, k); a.fill(0, n - k); }
          else { a.copyWithin(-k, 0, n + k); a.fill(0, 0, -k); }
        }
        links = links.map((l) => ({ ...l, i: l.i - k })).filter((l) => l.i >= 0 && l.i < n);
      }
      if (still) draw(0);
    };

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      cols = Math.ceil(w / SPACING) + 1;
      const rows = Math.ceil(h / SPACING) + 2; // +1 row slides in while scrolling
      n = cols * rows;
      hx = new Float32Array(n); hy = new Float32Array(n);
      ox = new Float32Array(n); oy = new Float32Array(n);
      vx = new Float32Array(n); vy = new Float32Array(n);
      pull = new Float32Array(n);
      for (let i = 0; i < n; i++) {
        hx[i] = (i % cols) * SPACING + SPACING / 2;
        hy[i] = Math.floor(i / cols) * SPACING + SPACING / 2;
      }
      links = [];
      row = Math.floor(window.scrollY / SPACING);
      onScroll();
    };

    const px = (i: number) => hx[i] + ox[i];
    const py = (i: number) => hy[i] + oy[i] - frac;

    const step = (t: number) => {
      const r2 = RADIUS * RADIUS;
      for (let i = 0; i < n; i++) {
        // Waves are keyed on page position so they scroll with the dots.
        const pageY = hy[i] + row * SPACING;
        let fx = (Math.sin(pageY * 0.018 + t * 0.6) * 2.2 - ox[i]) * SPRING;
        let fy = (Math.cos(hx[i] * 0.018 + t * 0.5) * 2.2 - oy[i]) * SPRING;
        let f = 0;

        const dx = mouse.x - px(i), dy = mouse.y - py(i), d2 = dx * dx + dy * dy;
        if (d2 < r2) {
          f = 1 - Math.sqrt(d2) / RADIUS;
          f *= f;
          fx += dx * f * 0.03 - dy * f * 0.01 + mouse.vx * f * 0.06; // gather + swirl + wake
          fy += dy * f * 0.03 + dx * f * 0.01 + mouse.vy * f * 0.06;
        }
        vx[i] = (vx[i] + fx) * DAMPING;
        vy[i] = (vy[i] + fy) * DAMPING;
        ox[i] += vx[i];
        oy[i] += vy[i];
        pull[i] += (f - pull[i]) * 0.15; // highlight fades like ink rather than snapping off
      }
      mouse.vx *= 0.9;
      mouse.vy *= 0.9;
      stepLinks(t);
    };

    const near = (i: number) => (px(i) - mouse.x) ** 2 + (py(i) - mouse.y) ** 2 < LINK_R * LINK_R;

    const stepLinks = (t: number) => {
      if (mouse.x < -1e3) { links = []; return; }
      // Every so often the network wants a different number of connections.
      if (t > retarget) {
        target = 3 + Math.floor(Math.random() * 7);
        retarget = t + 1 + Math.random() * 2;
      }
      links = links.filter((l) => l.die > t && near(l.i));
      const c = Math.round((mouse.x - SPACING / 2) / SPACING);
      const r = Math.round((mouse.y + frac - SPACING / 2) / SPACING);
      const reach = Math.ceil(LINK_R / SPACING);
      for (let tries = 0; links.length < target && tries < 30; tries++) {
        const cc = c + Math.round((Math.random() * 2 - 1) * reach);
        const rr = r + Math.round((Math.random() * 2 - 1) * reach);
        if (cc < 0 || cc >= cols || rr < 0) continue;
        const i = rr * cols + cc;
        if (i >= n || !near(i) || links.some((l) => l.i === i)) continue;
        links.push({ i, born: t, die: t + LINK_LIFE[0] + Math.random() * (LINK_LIFE[1] - LINK_LIFE[0]) });
      }
    };

    function draw(t: number) {
      ctx!.fillStyle = bg;
      ctx!.fillRect(0, 0, w, h);
      ctx!.globalAlpha = DOT_ALPHA;
      ctx!.fillStyle = dot;
      for (let i = 0; i < n; i++) ctx!.fillRect(px(i) - 1, py(i) - 1, 2, 2);

      ctx!.fillStyle = accent;
      for (let i = 0; i < n; i++) {
        const p = pull[i];
        if (p < 0.01) continue;
        const s = 2 + p;
        ctx!.globalAlpha = Math.min(ACCENT_MAX, p * 0.3);
        ctx!.fillRect(px(i) - s / 2, py(i) - s / 2, s, s);
      }

      // Neural links: cursor -> node, plus each node to its nearest sibling.
      ctx!.strokeStyle = accent;
      ctx!.lineWidth = 0.8;
      const fade = (l: (typeof links)[number]) => Math.min(1, (t - l.born) / 0.25, (l.die - t) / 0.35);
      for (const l of links) {
        const a = fade(l);
        const x = px(l.i), y = py(l.i);
        const d = Math.hypot(x - mouse.x, y - mouse.y) / LINK_R;
        ctx!.globalAlpha = 0.35 * a * (1 - d);
        ctx!.beginPath();
        ctx!.moveTo(mouse.x, mouse.y);
        ctx!.lineTo(x, y);
        ctx!.stroke();

        let best = -1, bd = Infinity;
        for (const o of links) {
          if (o === l) continue;
          const od = (px(o.i) - x) ** 2 + (py(o.i) - y) ** 2;
          if (od < bd) { bd = od; best = o.i; }
        }
        if (best >= 0) {
          ctx!.globalAlpha = 0.15 * a;
          ctx!.beginPath();
          ctx!.moveTo(x, y);
          ctx!.lineTo(px(best), py(best));
          ctx!.stroke();
        }
        ctx!.globalAlpha = 0.6 * a;
        ctx!.fillRect(x - 1.5, y - 1.5, 3, 3);
      }
      ctx!.globalAlpha = 1;
    }

    let raf = 0;
    const loop = (ms: number) => {
      step(ms / 1000);
      draw(ms / 1000);
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
    window.addEventListener("scroll", onScroll, { passive: true });
    if (!still) {
      window.addEventListener("pointermove", onMove, { passive: true });
      document.documentElement.addEventListener("pointerleave", onLeave);
      raf = requestAnimationFrame(loop);
    }

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("scroll", onScroll);
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
