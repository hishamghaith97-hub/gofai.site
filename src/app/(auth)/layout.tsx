import { Logo } from "@/components/Logo";
import { stagger } from "@/lib/stagger";

export default function AuthLayout({ children }: LayoutProps<"/">) {
  return (
    <main className="grid min-h-screen lg:grid-cols-[1.1fr_1fr]">
      {/* Brand panel (large screens) */}
      <section className="relative hidden overflow-hidden border-r border-line bg-deep lg:flex lg:flex-col lg:justify-between lg:p-14">
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(40rem_30rem_at_20%_10%,rgb(198_161_91/0.14),transparent_60%)]"
          aria-hidden
        />
        {/* Orbit rings, bottom right */}
        <div className="pointer-events-none absolute -right-40 -bottom-40 size-[34rem]" aria-hidden>
          <span className="orbit absolute inset-0 rounded-full border border-dashed border-gold/20" />
          <span className="orbit-reverse absolute inset-16 rounded-full border border-line-strong">
            <span className="absolute top-1/2 -left-[4px] size-2 rounded-full bg-gold shadow-[0_0_16px] shadow-gold" />
          </span>
          <span className="orbit absolute inset-32 rounded-full border border-gold/10">
            <span className="absolute -top-[3px] left-1/2 size-1.5 rounded-full bg-gold-light" />
          </span>
          <span className="absolute inset-[13rem] rounded-full bg-gold/10 blur-2xl" />
        </div>

        <Logo size="lg" className="rise relative" />

        <div className="relative max-w-lg">
          <p className="rise font-mono text-[11px] tracking-[0.25em] text-gold uppercase" style={stagger(1)}>
            ╱ Automations dashboard
          </p>
          <h2
            className="rise mt-6 font-display text-6xl leading-[1.02] font-extralight tracking-tight text-cream"
            style={stagger(2)}
          >
            Your automations,{" "}
            <span className="font-serif font-normal italic text-gold">quietly at work.</span>
          </h2>
          <p className="rise mt-6 max-w-md text-[15px] leading-7 text-mist" style={stagger(3)}>
            One place for the GOF.ai team to see every automation, what it&apos;s doing, and how each run went.
          </p>
        </div>

        <p className="rise relative font-mono text-[10px] tracking-[0.25em] text-faint uppercase" style={stagger(4)}>
          Private · Team access only
        </p>
      </section>

      {/* Form side */}
      <section className="flex flex-col items-center justify-center px-5 py-14 sm:px-10">
        <Logo className="rise mb-12 lg:hidden" size="lg" />
        <div className="rise w-full max-w-sm" style={stagger(2)}>
          {children}
        </div>
      </section>
    </main>
  );
}
