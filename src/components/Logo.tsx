import { Sparkle } from "lucide-react";

export function Logo({ className = "", size = "md" }: { className?: string; size?: "md" | "lg" }) {
  const large = size === "lg";
  return (
    <span className={`group flex items-center gap-2.5 ${className}`}>
      <span
        className={`relative grid place-items-center rounded-full bg-deep ${large ? "size-10" : "size-8"}`}
      >
        <Sparkle className={`text-gold ${large ? "size-[18px]" : "size-4"}`} strokeWidth={2} aria-hidden />
        <span className="absolute inset-0 rounded-full ring-1 ring-gold/40 transition group-hover:ring-gold/80" />
      </span>
      <span className={`font-display font-medium tracking-tight text-cream ${large ? "text-2xl" : "text-xl"}`}>
        GOF<span className="font-serif italic text-gold">.ai</span>
      </span>
    </span>
  );
}
