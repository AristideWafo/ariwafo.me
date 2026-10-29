"use client";

import { useRef, useState } from "react";
import { cn } from "@/lib/utils";

/** Copies `text`, or `getText()` when the text only exists in the DOM (code blocks). */
export function CopyButton({
  text,
  getText,
  className,
}: {
  text?: string;
  getText?: () => string;
  className?: string;
}) {
  const [state, setState] = useState<"idle" | "copied" | "failed">("idle");
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);

  async function copy() {
    try {
      await navigator.clipboard.writeText(text ?? getText?.() ?? "");
      setState("copied");
    } catch {
      setState("failed");
    }
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setState("idle"), 2000);
  }

  return (
    <>
      <button
        type="button"
        onClick={copy}
        aria-label="Copy to clipboard"
        className={cn(
          "border border-border bg-background px-2 py-1 font-mono text-[10px] uppercase tracking-[0.12em] text-muted-foreground transition-colors hover:border-primary hover:text-primary",
          className
        )}
      >
        {state === "copied" ? "Copied" : state === "failed" ? "Failed" : "Copy"}
      </button>
      <span role="status" className="sr-only">
        {state === "copied" ? "Copied to clipboard" : state === "failed" ? "Copy failed" : ""}
      </span>
    </>
  );
}

/** MDX `pre` override: the highlighted block plus a copy button. */
export function CodeBlock(props: React.ComponentProps<"pre">) {
  const ref = useRef<HTMLPreElement>(null);
  return (
    <div className="group relative">
      <pre ref={ref} {...props} />
      <CopyButton
        getText={() => ref.current?.textContent ?? ""}
        className="absolute right-2 top-2 opacity-0 focus-visible:opacity-100 group-hover:opacity-100 [@media(hover:none)]:opacity-100"
      />
    </div>
  );
}
