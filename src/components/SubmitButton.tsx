"use client";

import type { ReactNode } from "react";
import { useFormStatus } from "react-dom";
import { LoaderCircle } from "lucide-react";

const variants = {
  default: "border border-line-strong bg-panel text-cream hover:border-gold/50 hover:bg-raised",
  danger: "border border-rose/30 bg-transparent text-rose hover:border-rose/60 hover:bg-rose/10",
};

export function SubmitButton({
  children,
  icon,
  pendingLabel,
  variant = "default",
}: {
  children: ReactNode;
  icon?: ReactNode;
  pendingLabel?: string;
  variant?: keyof typeof variants;
}) {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className={`inline-flex shrink-0 cursor-pointer items-center gap-2 rounded-full px-4 py-2 text-sm font-medium whitespace-nowrap transition disabled:cursor-wait disabled:opacity-60 ${variants[variant]}`}
    >
      {pending ? <LoaderCircle className="size-4 animate-spin" aria-hidden /> : icon}
      {pending && pendingLabel ? pendingLabel : children}
    </button>
  );
}
