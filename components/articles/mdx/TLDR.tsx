export function TLDR({ problem, solution, result }: { problem: string; solution: string; result: string }) {
  return (
    <aside aria-label="Summary" className="not-prose my-8 border border-border bg-surface/50 p-5">
      <p className="label-accent">TL;DR</p>
      <dl className="mt-3 space-y-3">
        {[
          ["Problem", problem],
          ["Solution", solution],
          ["Result", result],
        ].map(([k, v]) => (
          <div key={k} className="sm:grid sm:grid-cols-[6rem_1fr] sm:gap-4">
            <dt className="label pt-0.5">{k}</dt>
            <dd className="leading-relaxed">{v}</dd>
          </div>
        ))}
      </dl>
    </aside>
  );
}
