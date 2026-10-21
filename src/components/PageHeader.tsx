import type { ReactNode } from "react";
import { stagger } from "@/lib/stagger";

export function PageHeader({
  eyebrow,
  title,
  description,
  actions,
}: {
  /** Small mono label above the title, e.g. "Overview". */
  eyebrow?: ReactNode;
  title: ReactNode;
  description?: ReactNode;
  actions?: ReactNode;
}) {
  return (
    <header className="mb-12">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <div className="min-w-0">
          {eyebrow && (
            <p className="rise mb-4 font-mono text-[11px] tracking-[0.25em] text-gold uppercase">╱ {eyebrow}</p>
          )}
          <h1
            className="rise font-display text-4xl leading-[1.05] font-light tracking-tight text-cream sm:text-5xl"
            style={stagger(1)}
          >
            {title}
          </h1>
          {description && (
            <p className="rise mt-4 max-w-xl text-[15px] leading-7 text-mist" style={stagger(2)}>
              {description}
            </p>
          )}
        </div>
        {actions && (
          <div className="rise" style={stagger(2)}>
            {actions}
          </div>
        )}
      </div>
      <div className="hairline rise mt-10" style={stagger(3)} />
    </header>
  );
}

/** Mono section label with an index number, e.g. "02 — Your automations". */
export function SectionLabel({ index, children }: { index: string; children: ReactNode }) {
  return (
    <h2 className="mb-5 flex items-center gap-3 font-mono text-[11px] tracking-[0.22em] text-mist uppercase">
      <span className="text-gold">{index}</span>
      <span className="h-px w-6 bg-line-strong" aria-hidden />
      {children}
    </h2>
  );
}
