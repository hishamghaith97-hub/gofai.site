import type { LucideIcon } from "lucide-react";

export function EmptyState({ icon: Icon, title, body }: { icon: LucideIcon; title: string; body: string }) {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-line bg-deep/60 px-6 py-14 text-center">
      {/* Concentric orbits behind the icon */}
      <div className="relative mx-auto grid size-28 place-items-center" aria-hidden>
        <span className="orbit absolute inset-0 rounded-full border border-dashed border-gold/25" />
        <span className="orbit-reverse absolute inset-4 rounded-full border border-line-strong">
          <span className="absolute -top-[3px] left-1/2 size-1.5 -translate-x-1/2 rounded-full bg-gold" />
        </span>
        <span className="grid size-11 place-items-center rounded-full bg-panel ring-1 ring-gold/30">
          <Icon className="size-[18px] text-gold-light" />
        </span>
      </div>
      <p className="mt-6 font-display text-xl font-light text-cream">{title}</p>
      <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-mist">{body}</p>
    </div>
  );
}
