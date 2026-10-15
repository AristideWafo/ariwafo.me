"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";

interface CopyBlockProps {
  label: string;
  command: string;
  /** Optional blue hint line under the command. */
  hint?: string;
  className?: string;
}

/** A terminal-style block whose command can be copied in one click. */
export function CopyBlock({ label, command, hint, className }: CopyBlockProps) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(command);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard is unavailable (insecure origin, denied permission).
      // The command stays selectable, so there is nothing to recover from.
      setCopied(false);
    }
  };

  return (
    <div className={cn("border border-border", className)}>
      <div className="flex items-center justify-between gap-4 border-b border-border bg-surface/60 px-4 py-2.5">
        <span className="label">{label}</span>
        <button
          type="button"
          onClick={copy}
          className="border border-primary px-2 py-1 font-mono text-[10px] uppercase tracking-[0.12em] text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
        >
          {copied ? "Copied" : "Copy"}
        </button>
      </div>
      <div className="space-y-1 bg-surface/30 px-4 py-4">
        <code className="block break-all font-mono text-xs leading-relaxed sm:text-sm">
          {command}
        </code>
        {hint && (
          <p className="font-mono text-xs leading-relaxed text-primary">
            <span className="text-muted-foreground">&gt; </span>
            {hint}
          </p>
        )}
      </div>
    </div>
  );
}
