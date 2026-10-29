import { cn } from "@/lib/utils";

const TYPES = {
  info: { label: "Note", box: "border-primary/60", text: "text-primary" },
  warning: { label: "Warning", box: "border-warning/70", text: "text-warning" },
  danger: { label: "Danger", box: "border-destructive/70", text: "text-destructive" },
};

export function Callout({
  type = "info",
  title,
  children,
}: React.PropsWithChildren<{ type?: keyof typeof TYPES; title?: string }>) {
  const t = TYPES[type];
  return (
    <aside className={cn("not-prose my-6 border border-l-4 bg-surface/50 p-4", t.box)}>
      <p className={cn("label", t.text)}>{title ?? t.label}</p>
      <div className="mt-2 space-y-2 leading-relaxed [&_code]:font-mono [&_code]:text-[0.9em]">{children}</div>
    </aside>
  );
}
