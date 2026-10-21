import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { MailCheck } from "lucide-react";

export const metadata: Metadata = { title: "Check your email" };

export default function CheckEmailPage({ searchParams }: PageProps<"/check-email">) {
  return (
    <div>
      <span className="mb-8 grid size-14 place-items-center rounded-full bg-sage/10 ring-1 ring-sage/30">
        <MailCheck className="size-6 text-sage" aria-hidden />
      </span>
      <p className="font-mono text-[11px] tracking-[0.25em] text-gold uppercase">╱ Link sent</p>
      <h1 className="mt-4 font-display text-4xl font-light tracking-tight text-cream">
        Check your <span className="font-serif font-normal italic text-gold">inbox</span>
      </h1>
      <p className="mt-4 text-[15px] leading-7 text-mist">
        <Suspense fallback="We sent you a sign-in link.">
          <SentTo searchParams={searchParams} />
        </Suspense>{" "}
        Open it on this device to sign in. It expires in 24 hours.
      </p>
      <Link
        href="/login"
        className="mt-10 inline-flex items-center gap-2 border-b border-line-strong pb-1 text-sm text-cream transition hover:border-gold hover:text-gold-light"
      >
        Use a different email
      </Link>
    </div>
  );
}

async function SentTo({ searchParams }: Pick<PageProps<"/check-email">, "searchParams">) {
  const { email } = await searchParams;
  if (typeof email !== "string" || !email) return "We sent you a sign-in link.";
  return (
    <>
      We sent a sign-in link to <span className="font-mono text-sm text-cream">{email}</span>.
    </>
  );
}
