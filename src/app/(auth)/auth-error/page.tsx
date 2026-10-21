import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { TriangleAlert } from "lucide-react";

export const metadata: Metadata = { title: "Sign-in problem" };

// Auth.js sends people here with ?error=<code> when sign-in fails.
const MESSAGES: Record<string, { title: string; body: string }> = {
  AccessDenied: {
    title: "This email can't sign in",
    body: "Only GOF.ai email addresses have access to this dashboard.",
  },
  Verification: {
    title: "This link no longer works",
    body: "Sign-in links work once and expire after 24 hours. Request a new one below.",
  },
};

const FALLBACK = {
  title: "Something went wrong",
  body: "We couldn't sign you in. Please try again.",
};

export default function AuthErrorPage({ searchParams }: PageProps<"/auth-error">) {
  return (
    <div>
      <span className="mb-8 grid size-14 place-items-center rounded-full bg-copper/10 ring-1 ring-copper/30">
        <TriangleAlert className="size-6 text-copper" aria-hidden />
      </span>
      <p className="font-mono text-[11px] tracking-[0.25em] text-gold uppercase">╱ Sign-in problem</p>
      <Suspense fallback={<Message {...FALLBACK} />}>
        <ErrorMessage searchParams={searchParams} />
      </Suspense>
      <Link
        href="/login"
        className="mt-10 flex w-full items-center justify-center rounded-full bg-gold px-5 py-3.5 text-sm font-semibold text-deep transition hover:bg-gold-light"
      >
        Back to sign in
      </Link>
    </div>
  );
}

async function ErrorMessage({ searchParams }: Pick<PageProps<"/auth-error">, "searchParams">) {
  const { error } = await searchParams;
  return <Message {...((typeof error === "string" && MESSAGES[error]) || FALLBACK)} />;
}

function Message({ title, body }: { title: string; body: string }) {
  return (
    <>
      <h1 className="mt-4 font-display text-4xl leading-tight font-light tracking-tight text-cream">{title}</h1>
      <p className="mt-4 text-[15px] leading-7 text-mist">{body}</p>
    </>
  );
}
