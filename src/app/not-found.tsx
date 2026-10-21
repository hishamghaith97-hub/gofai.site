import Link from "next/link";

export default function NotFound() {
  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-5 text-center">
      <p
        className="pointer-events-none absolute font-display text-[14rem] leading-none font-extralight text-gold/[0.06] select-none sm:text-[22rem]"
        aria-hidden
      >
        404
      </p>
      <p className="rise relative font-mono text-[11px] tracking-[0.25em] text-gold uppercase">╱ 404</p>
      <h1 className="rise relative mt-4 font-display text-5xl font-light tracking-tight text-cream">
        Page <span className="font-serif font-normal italic text-gold">not found</span>
      </h1>
      <p className="rise relative mt-4 text-[15px] text-mist">This page doesn&apos;t exist or has moved.</p>
      <Link
        href="/"
        className="rise relative mt-10 rounded-full bg-gold px-6 py-3 text-sm font-semibold text-deep transition hover:bg-gold-light"
      >
        Back to dashboard
      </Link>
    </main>
  );
}
